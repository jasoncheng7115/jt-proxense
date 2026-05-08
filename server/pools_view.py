"""Read-only pool browser.

PVE resource pools group VMs / CTs / storages for tenancy or organisational
purposes. We expose `/pools` and `/pools/{poolid}` so the SPA can render
a quick "what's in pool X" panel without bouncing to the PVE web UI.

Mutating endpoints already exist in `pve_client` (create / delete / update);
this module is the read path.

Routes:
  GET /api/clusters/{cluster_id}/pools
  GET /api/clusters/{cluster_id}/pools/{poolid}
"""
from __future__ import annotations

import logging
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)

_CACHE_TTL_S = 30.0
_cache: dict[tuple, tuple[float, object]] = {}


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


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/pools",          pools_list_handler),
    ("GET", r"/api/clusters/{cluster_id}/pools/{poolid}", pool_detail_handler),
]
