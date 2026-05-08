"""Read-only HA / replication viewer.

`/cluster/ha/status/current` returns the live state of HA-managed VMs/CTs;
`/cluster/replication` lists configured storage-replication jobs. Both
are useful at-a-glance for "is my failover healthy" without bouncing to
the PVE web UI.

Mutating endpoints already exist in `pdm_cluster.py` (admin-only); this
module is just the read path so a UI panel can render the picture.

Routes:
  GET /api/clusters/{cluster_id}/ha/status
  GET /api/clusters/{cluster_id}/replication-jobs
"""
from __future__ import annotations

import logging
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_CACHE_TTL_S = 10.0
_cache: dict[tuple, tuple[float, list]] = {}


async def _fetch(key: tuple, fetcher) -> list:
    now = time.monotonic()
    hit = _cache.get(key)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return hit[1]
    try:
        data = await fetcher()
        if not isinstance(data, list):
            data = []
    except Exception as e:
        logger.warning("ha_view %s failed: %s", key, e)
        data = []
    _cache[key] = (now, data)
    return data


@role_required("viewer")
async def ha_status_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    rows = await _fetch(
        ("ha", cid),
        cluster.client.list_ha_status,
    )
    # PVE HA status mixes meta rows (type=quorum, type=master, type=lrm) with
    # per-resource service rows (type=service). Split for the UI.
    resources, masters, lrms, quorum = [], [], [], None
    for r in rows:
        t = (r.get("type") or "").lower()
        if t == "service":
            resources.append(r)
        elif t == "master":
            masters.append(r)
        elif t == "lrm":
            lrms.append(r)
        elif t == "quorum":
            quorum = r
    return web.json_response({
        "resources": resources,
        "masters": masters,
        "lrms": lrms,
        "quorum": quorum,
    })


@role_required("viewer")
async def replication_jobs_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    rows = await _fetch(
        ("repl", cid),
        cluster.client.list_replication_jobs,
    )
    return web.json_response({"jobs": rows, "count": len(rows)})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/ha/status",         ha_status_handler),
    ("GET", r"/api/clusters/{cluster_id}/replication-jobs",  replication_jobs_handler),
]
