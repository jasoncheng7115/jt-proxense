"""Pool browser + admin CRUD.

PVE resource pools group VMs / CTs / storages for tenancy or organisational
purposes. We expose:
  - read /pools and /pools/{poolid} (viewer)
  - admin write: create / delete pools, add/remove members (admin)

Routes:
  GET    /api/clusters/{cluster_id}/pools                 (viewer)
  GET    /api/clusters/{cluster_id}/pools/{poolid}        (viewer)
  POST   /api/clusters/{cluster_id}/pools                 (admin)  body: {poolid, comment?}
  DELETE /api/clusters/{cluster_id}/pools/{poolid}        (admin)
  PUT    /api/clusters/{cluster_id}/pools/{poolid}        (admin)  body: {vms?, storage?, delete?}
"""
from __future__ import annotations

import logging
import re
import time

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)

_POOL_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_\-]{0,63}$")
_VMID_LIST_RE = re.compile(r"^[0-9]+(?:,[0-9]+){0,127}$")
_STORAGE_LIST_RE = re.compile(r"^[A-Za-z][A-Za-z0-9._\-]{0,63}(?:,[A-Za-z][A-Za-z0-9._\-]{0,63}){0,127}$")
_COMMENT_RE = re.compile(r"^[\x20-\x7e]{0,256}$")

_CACHE_TTL_S = 30.0
_cache: dict[tuple, tuple[float, object]] = {}


def _audit(request: web.Request):
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def _invalidate(cid: str, poolid: str | None = None):
    keys = [k for k in _cache if (k[0] in ("pools_list", "pool")) and (len(k) > 1 and k[1] == cid)]
    if poolid is not None:
        keys = [k for k in keys if (k[0] != "pool") or (len(k) >= 3 and k[2] == poolid)]
    for k in keys:
        _cache.pop(k, None)


async def _fetch(key: tuple, fetcher):
    now = time.monotonic()
    hit = _cache.get(key)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return hit[1]
    try:
        data = await fetcher()
    except Exception as e:
        logger.warning("pools_view %s failed: %s", key, e)
        return {"error": str(e)} if isinstance(key[0], str) else []
    _cache[key] = (now, data)
    return data


@role_required("viewer")
async def pools_list_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    rows = await _fetch(
        ("pools_list", cid),
        cluster.client.list_pools,
    )
    if not isinstance(rows, list):
        rows = []
    return web.json_response({"pools": rows, "count": len(rows)})


@role_required("viewer")
async def pool_detail_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    poolid = request.match_info["poolid"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("pool", cid, poolid),
        lambda: cluster.client.get_pool(poolid),
    )
    if not isinstance(data, dict):
        data = {}
    return web.json_response({"pool": data})


@role_required("admin")
async def pool_create_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    pid = (body.get("poolid") or "").strip()
    comment = (body.get("comment") or "").strip()
    if not _POOL_RE.match(pid):
        return web.json_response({"error": "bad_poolid"}, status=400)
    if not _COMMENT_RE.match(comment):
        return web.json_response({"error": "bad_comment"}, status=400)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.create_pool(pid, comment=comment)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="pool.create",
                          target=f"{cid}/{pid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="pool.create",
                      target=f"{cid}/{pid}", cluster_id=cid,
                      result="ok", request_id=rid)
    _invalidate(cid)
    return web.json_response({"ok": True})


@role_required("admin")
async def pool_delete_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    pid = request.match_info["poolid"]
    if not _POOL_RE.match(pid):
        return web.json_response({"error": "bad_poolid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.delete_pool(pid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="pool.delete",
                          target=f"{cid}/{pid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="pool.delete",
                      target=f"{cid}/{pid}", cluster_id=cid,
                      result="ok", request_id=rid)
    _invalidate(cid, pid)
    return web.json_response({"ok": True})


@role_required("admin")
async def pool_update_handler(request: web.Request) -> web.Response:
    """Add or remove VMs / storages from a pool. Body shape:
        { vms?: "100,101,102", storage?: "local,ceph", delete?: true }
    Setting `delete=true` removes the listed members; otherwise adds them.
    """
    cid = request.match_info["cluster_id"]
    pid = request.match_info["poolid"]
    if not _POOL_RE.match(pid):
        return web.json_response({"error": "bad_poolid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    vms = (body.get("vms") or "").strip()
    storage = (body.get("storage") or "").strip()
    delete = bool(body.get("delete", False))
    if vms and not _VMID_LIST_RE.match(vms):
        return web.json_response({"error": "bad_vms"}, status=400)
    if storage and not _STORAGE_LIST_RE.match(storage):
        return web.json_response({"error": "bad_storage"}, status=400)
    if not vms and not storage:
        return web.json_response({"error": "no_members"}, status=400)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.update_pool(pid,
                                         vms=vms or None,
                                         storage=storage or None,
                                         delete=delete)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip,
                          action=f"pool.{'remove' if delete else 'add'}",
                          target=f"{cid}/{pid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"vms": vms, "storage": storage})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip,
                      action=f"pool.{'remove' if delete else 'add'}",
                      target=f"{cid}/{pid}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"vms": vms, "storage": storage})
    _invalidate(cid, pid)
    return web.json_response({"ok": True})


ROUTES = [
    ("GET",    r"/api/clusters/{cluster_id}/pools",          pools_list_handler),
    ("GET",    r"/api/clusters/{cluster_id}/pools/{poolid}", pool_detail_handler),
    ("POST",   r"/api/clusters/{cluster_id}/pools",          pool_create_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/pools/{poolid}", pool_delete_handler),
    ("PUT",    r"/api/clusters/{cluster_id}/pools/{poolid}", pool_update_handler),
]
