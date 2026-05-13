"""Node hardware + disks/SMART endpoints (read-only, viewer+).

Routes:
  GET /api/clusters/{cid}/nodes/{node}/hardware
       Bundle: status (cpuinfo / memory / kernel / pve version / boot mode)
       + pci device list + usb device list. One JSON for the modal so the
       SPA can paint everything in a single roundtrip.

  GET /api/clusters/{cid}/nodes/{node}/disks
       Block-device inventory: size, rotational flag, used-by, model,
       serial, smart health summary (if PVE returned one).

  GET /api/clusters/{cid}/nodes/{node}/disks/{disk:.+}/smart
       Full SMART attribute table for one disk. `disk` is the basename
       (e.g. 'sda', 'nvme0n1') — we forward it as `/dev/<disk>`.

OWASP design:
  A01 — viewer (read-only).
  A03 — `disk` matchinfo restricted to [A-Za-z0-9_:-/]{1,32}; we never
        let arbitrary path strings flow into the PVE API.
  A05 — short cache (15 s) on hardware bundle so repeated panel opens
        don't hammer pveproxy.
  A09 — no audit row for read-only access (consistent with other viewers).
"""
from __future__ import annotations

import asyncio
import logging
import re
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_CACHE_TTL_S = 15.0
_cache: dict[tuple, tuple[float, dict | list]] = {}

_DISK_NAME_RE = re.compile(r"^[A-Za-z0-9_:\-]{1,32}$")


async def _fetch(key: tuple, fetcher):
    now = time.monotonic()
    hit = _cache.get(key)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return hit[1]
    data = await fetcher()
    _cache[key] = (now, data)
    return data


@role_required("viewer")
async def hardware_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    async def _do():
        # Run the three sub-fetches in parallel — pveproxy throttles
        # at the lower layer so this is safe; we only hold one per-node
        # slot at a time per request anyway.
        st_t  = cluster.client.get_node_status(node)
        pci_t = cluster.client.get_hardware_pci(node)
        usb_t = cluster.client.get_hardware_usb(node)
        status, pci, usb = await asyncio.gather(
            st_t, pci_t, usb_t, return_exceptions=True,
        )
        # _gather can return Exceptions; only `status` is required.
        if isinstance(status, Exception):
            return {"_error": str(status)}
        return {
            "status": status if isinstance(status, dict) else {},
            "pci":    pci if isinstance(pci, list) else [],
            "usb":    usb if isinstance(usb, list) else [],
        }

    try:
        data = await _fetch(("hw", cid, node), _do)
    except Exception as e:
        return web.json_response({"error": "fetch_failed", "detail": str(e)}, status=502)
    return web.json_response(data)


@role_required("viewer")
async def disks_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        disks = await _fetch(("disks", cid, node),
                             lambda: cluster.client.list_node_disks(node))
    except Exception as e:
        return web.json_response({"error": "fetch_failed", "detail": str(e)}, status=502)
    return web.json_response({"disks": disks or []})


@role_required("viewer")
async def smart_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    disk = request.match_info["disk"]
    if not _DISK_NAME_RE.match(disk):
        return web.json_response({"error": "bad_disk"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    # PVE expects the full /dev/<name> path. Accept callers passing either.
    dev = disk if disk.startswith("/dev/") else f"/dev/{disk}"
    try:
        data = await cluster.client.disk_smart(node, dev)
    except Exception as e:
        return web.json_response({"error": "smart_failed", "detail": str(e)}, status=502)
    return web.json_response({"smart": data})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/hardware",        hardware_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/disks",           disks_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/disks/{disk}/smart", smart_handler),
]
