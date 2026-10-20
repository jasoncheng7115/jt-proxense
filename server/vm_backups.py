"""Per-VM backup history.

Aggregates `vzdump-{type}-{vmid}-...` files across every backup-capable
storage on the cluster, sorted newest-first. Operators want to answer
"is this VM backed up, and how recently?" without bouncing through the
storage browser cluster→node→storage→type filter chain.

Routes:
  GET /api/clusters/{cluster_id}/vms/{vmid}/backups
"""
from __future__ import annotations

import logging
import re
import time
import asyncio

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_CACHE_TTL_S = 30.0
_cache: dict[tuple, tuple[float, list]] = {}


def _content_set(raw) -> set[str]:
    """StorageMetrics.content is a LIST (cluster_manager splits PVE's csv);
    dict-shaped test doubles and older callers hand over the csv string."""
    if isinstance(raw, (list, tuple, set)):
        return {str(x).strip().lower() for x in raw if str(x).strip()}
    return {p.strip().lower() for p in str(raw or "").split(",") if p.strip()}


def _row_is_for(row: dict, vmid: int) -> bool:
    """PVE tags every backup volume with its `vmid`; trust that first. The
    volid pattern is only a fallback — and it cannot match PBS at all, whose
    volids look like 'pbs:backup/vm/100/2026-09-27T18:30:02Z' (no '-100-')."""
    if row.get("vmid") is not None:
        return str(row.get("vmid")) == str(vmid)
    return _matches_vmid(row.get("volid", ""), vmid)


def _matches_vmid(volid: str, vmid: int) -> bool:
    """vzdump volid pattern: '{storage}:backup/vzdump-{kind}-{vmid}-{date}.vma.zst'.
    Accept both qemu / lxc; reject neighbouring vmids that share a prefix
    (`-vmid-1234-` would otherwise match `12`)."""
    needle = f"-{vmid}-"
    return needle in volid or volid.endswith(f"-{vmid}.tar.zst")


@role_required("viewer")
async def list_vm_backups_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)

    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    cache_key = (cid, vmid)
    now = time.monotonic()
    hit = _cache.get(cache_key)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return web.json_response(_body(hit[1]))

    # Build (node, storage) pairs that can hold backups. cluster.cache.storages
    # already has the right shape; we pull via list_storage_content per-pair.
    targets: list[tuple[str, str]] = []
    seen = set()
    for skey, st in cluster.cache.storages.items():
        node = getattr(st, "node", None)
        name = getattr(st, "storage", None)
        # `.lower()` on this used to raise AttributeError for every storage
        # with content set — it is a list — so the whole endpoint failed.
        content = _content_set(getattr(st, "content", None))
        if not node or not name:
            continue
        # If unset (e.g. unreachable), still try — the call returns empty.
        if "backup" in content or not content:
            key = (node, name)
            if key not in seen:
                seen.add(key)
                targets.append(key)

    async def fetch(node: str, storage: str) -> list[dict]:
        try:
            rows = await cluster.client.list_storage_content(
                node, storage, content="backup"
            )
            out: list[dict] = []
            for r in rows or []:
                volid = r.get("volid", "")
                if not _row_is_for(r, vmid):
                    continue
                out.append({
                    "volid":   volid,
                    "size":    r.get("size"),
                    "ctime":   r.get("ctime"),
                    "format":  r.get("format"),
                    "notes":   r.get("notes") or r.get("comment") or "",
                    "storage": storage,
                    "node":    node,
                    "verification": r.get("verification") or {},
                    "protected": bool(r.get("protected") or 0),
                })
            return out
        except Exception as e:
            logger.debug("vm_backups list %s/%s: %s", node, storage, e)
            return []

    results = await asyncio.gather(
        *(fetch(n, s) for (n, s) in targets), return_exceptions=False
    )
    # A shared storage (PBS / NFS) answers identically from every node.
    backups: list[dict] = []
    seen_vol: set[str] = set()
    for r in results:
        for b in r:
            if b["volid"] in seen_vol:
                continue
            seen_vol.add(b["volid"])
            backups.append(b)
    backups.sort(key=lambda b: b.get("ctime") or 0, reverse=True)

    _cache[cache_key] = (now, backups)
    return web.json_response(_body(backups))


# PVE drops backup volumes the caller may not restore (needs VM.Backup on the
# guest or Datastore.Allocate on the storage) and still answers 200 — so an
# empty list from a monitoring token does NOT mean "no backups".
_EMPTY_NOTE = ("no backup files are visible to this API token. PVE hides backup "
               "volumes unless the token has VM.Backup on the guest or "
               "Datastore.Allocate on the storage, so this may not mean there are "
               "none — the Backups view's protection tab reads backup task history "
               "instead, which needs only Sys.Audit.")


def _body(backups: list) -> dict:
    out = {"backups": backups, "count": len(backups)}
    if not backups:
        out["note"] = _EMPTY_NOTE
    return out


@role_required("operator")
async def verify_backup_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cid}/nodes/{node}/storage/{storage}/verify
    body: {volume: "<volid>"}

    Shallow verify: hits PVE's content metadata endpoint. For PBS storages
    the call walks the chunk index and is a moderate integrity check; for
    file-based storages (dir/nfs/cifs) it confirms the file is readable
    and metadata-parseable. Returns 200 on success with the metadata; 502
    if PVE rejects (storage corruption / file missing).
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    storage = request.match_info["storage"]
    if not re.match(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$", storage):
        return web.json_response({"error": "bad_storage"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    volume = (body.get("volume") or "").strip()
    if not re.match(r"^[A-Za-z0-9][A-Za-z0-9._/:\-]{1,512}$", volume):
        return web.json_response({"error": "bad_volume"}, status=400)
    user = (request.get("user") or {}).get("username", "anonymous")
    src_ip = request.get("client_ip", "unknown")
    rid = request.get("request_id", "")
    target = f"{cid}/{node}/{storage}/{volume}"
    try:
        meta = await cluster.client.get_storage_content(node, storage, volume)
    except Exception as e:
        await audit.write(
            user=user, source_ip=src_ip, action="backup.verify",
            target=target, cluster_id=cid,
            result=audit.result_error(e), request_id=rid,
            params={"volume": volume},
        )
        return web.json_response(
            {"ok": False, "verified": False, "detail": str(e)},
            status=502,
        )
    await audit.write(
        user=user, source_ip=src_ip, action="backup.verify",
        target=target, cluster_id=cid, result="ok", request_id=rid,
        params={"volume": volume},
    )
    return web.json_response({
        "ok": True, "verified": True, "metadata": meta,
    })


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/vms/{vmid}/backups", list_vm_backups_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/verify", verify_backup_handler),
]
