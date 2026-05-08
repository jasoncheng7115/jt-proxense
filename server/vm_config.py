"""Read-only VM / CT hardware config exposure.

PVE keeps the VM/CT definition in `/etc/pve/qemu-server/{vmid}.conf` (or
`/etc/pve/lxc/{vmid}.conf`); the API mirrors it as a flat dict. We pass
it through so the SPA can render a "what's in this VM" panel — disk list,
NIC list, CPU type, memory, balloon, OS type, boot order, etc. — without
the operator bouncing to the PVE web UI's Hardware tab.

Routes:
  GET /api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/config
  GET /api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/config
"""
from __future__ import annotations

import logging
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_CACHE_TTL_S = 15.0
_cache: dict[tuple, tuple[float, dict]] = {}


async def _fetch(key: tuple, fetcher) -> dict:
    now = time.monotonic()
    hit = _cache.get(key)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return hit[1]
    try:
        data = await fetcher()
        if not isinstance(data, dict):
            data = {}
    except Exception as e:
        logger.warning("vm_config %s failed: %s", key, e)
        return {"_error": str(e)}
    _cache[key] = (now, data)
    return data


@role_required("viewer")
async def qemu_config_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("qemu", cid, node, vmid),
        lambda: cluster.client.get_vm_config(node, vmid),
    )
    return web.json_response({"kind": "qemu", "config": data})


@role_required("viewer")
async def lxc_config_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("lxc", cid, node, vmid),
        lambda: cluster.client.get_lxc_config(node, vmid),
    )
    return web.json_response({"kind": "lxc", "config": data})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/config", qemu_config_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/config",  lxc_config_handler),
]
