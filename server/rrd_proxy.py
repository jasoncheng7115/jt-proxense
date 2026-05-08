"""RRD time-series proxy.

PVE keeps a small RRD ring for every VM / CT / node (CPU, memory, net, disk
IO). The web UI uses these for the historical line charts. We expose the
same data so the SPA can draw matching charts.

Routes:
  GET /api/clusters/{cluster_id}/nodes/{node}/rrddata?timeframe=hour|day|week|month|year
  GET /api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/rrddata?timeframe=...
  GET /api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/rrddata?timeframe=...

Cache: 30 s per (cluster, kind, target, timeframe) — RRD steps are
60 s minimum so finer caching is wasted work.
"""
from __future__ import annotations

import logging
import time
from typing import Iterable

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_CACHE_TTL_S = 30.0
_cache: dict[tuple, tuple[float, list]] = {}

_VALID_TIMEFRAMES = {"hour", "day", "week", "month", "year"}


def _validate_timeframe(tf: str) -> str:
    return tf if tf in _VALID_TIMEFRAMES else "hour"


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
        logger.warning("rrd_proxy %s failed: %s", key, e)
        data = []
    _cache[key] = (now, data)
    return data


@role_required("viewer")
async def node_rrd_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    tf = _validate_timeframe(request.query.get("timeframe", "hour"))
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("node", cid, node, tf),
        lambda: cluster.client.get_node_rrddata(node, timeframe=tf),
    )
    return web.json_response({"timeframe": tf, "samples": data})


@role_required("viewer")
async def qemu_rrd_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    tf = _validate_timeframe(request.query.get("timeframe", "hour"))
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("qemu", cid, node, vmid, tf),
        lambda: cluster.client.get_vm_rrddata(node, vmid, timeframe=tf),
    )
    return web.json_response({"timeframe": tf, "samples": data})


@role_required("viewer")
async def lxc_rrd_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    tf = _validate_timeframe(request.query.get("timeframe", "hour"))
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("lxc", cid, node, vmid, tf),
        lambda: cluster.client.get_lxc_rrddata(node, vmid, timeframe=tf),
    )
    return web.json_response({"timeframe": tf, "samples": data})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/rrddata",                node_rrd_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/rrddata",    qemu_rrd_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/rrddata",     lxc_rrd_handler),
]
