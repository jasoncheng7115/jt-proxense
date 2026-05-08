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
import time
import asyncio

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_CACHE_TTL_S = 30.0
_cache: dict[tuple, tuple[float, list]] = {}


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
        return web.json_response({"backups": hit[1], "count": len(hit[1])})

    # Build (node, storage) pairs that can hold backups. cluster.cache.storages
    # already has the right shape; we pull via list_storage_content per-pair.
    targets: list[tuple[str, str]] = []
    seen = set()
    for skey, st in cluster.cache.storages.items():
        node = getattr(st, "node", None)
        name = getattr(st, "storage", None)
        content = (getattr(st, "content", "") or "").lower()
        if not node or not name:
            continue
        # PVE storages have a 'content' csv: 'rootdir,images,iso,vztmpl,backup'.
        # If unset (e.g. unreachable), still try — the call returns empty.
        if "backup" in content or content == "":
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
                if not _matches_vmid(volid, vmid):
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
    backups: list[dict] = []
    for r in results:
        backups.extend(r)
    backups.sort(key=lambda b: b.get("ctime") or 0, reverse=True)

    _cache[cache_key] = (now, backups)
    return web.json_response({"backups": backups, "count": len(backups)})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/vms/{vmid}/backups", list_vm_backups_handler),
]
