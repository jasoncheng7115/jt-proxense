"""Per-node introspection endpoints — certs, pending updates, subscription.

Not part of the main cluster_manager polling loop because: (a) hitting these
across every node every 2 s would be 3-5× the API budget, (b) the data is
slow-changing (cert expiry: months; pending updates: hourly via apt-update).
We expose them as on-demand endpoints so the health monitor can fetch in
parallel when the operator opens the page, and panels that drill in can
hit them directly.

Routes:
  GET /api/clusters/{cluster_id}/nodes/{node}/certificates
  GET /api/clusters/{cluster_id}/nodes/{node}/updates       (pending apt)
  GET /api/clusters/{cluster_id}/nodes/{node}/subscription
"""
from __future__ import annotations

import logging
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)

# 60-second per-(cluster,node,kind) cache. Plenty fresh for slow-changing data;
# absorbs panel re-render bursts without extra PVE calls.
_CACHE_TTL_S = 60.0
_cache: dict[tuple[str, str, str], tuple[float, object]] = {}


async def _cached_get(cluster_id: str, node: str, kind: str, path: str) -> object:
    key = (cluster_id, node, kind)
    now = time.monotonic()
    hit = _cache.get(key)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return hit[1]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return {"error": "cluster_not_found"}
    try:
        result = await cluster.client._request("GET", path)
        _cache[key] = (now, result)
        return result
    except Exception as e:
        logger.warning("node_inspect %s %s/%s failed: %s", kind, cluster_id, node, e)
        # Don't cache errors — let the next call retry promptly.
        return {"error": str(e)}


@role_required("viewer")
async def certificates_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    data = await _cached_get(cid, node, "cert", f"/nodes/{node}/certificates/info")
    return web.json_response({"certificates": data if isinstance(data, list) else [],
                              "raw": data if not isinstance(data, list) else None})


@role_required("viewer")
async def updates_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    # /nodes/{node}/apt/update returns the list of pending packages. Empty
    # list is a healthy node; PVE refreshes this on its own schedule, we
    # don't trigger an apt-update here (would require write privilege).
    data = await _cached_get(cid, node, "updates", f"/nodes/{node}/apt/update")
    pkgs = data if isinstance(data, list) else []
    return web.json_response({"pending": pkgs, "count": len(pkgs)})


@role_required("viewer")
async def subscription_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    data = await _cached_get(cid, node, "sub", f"/nodes/{node}/subscription")
    return web.json_response({"subscription": data if isinstance(data, dict) else {}})


@role_required("viewer")
async def services_handler(request: web.Request) -> web.Response:
    """List PVE services on a node (pveproxy / pvedaemon / corosync / …).
    No cache — operators want fresh state when staring at this view."""
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        rows = await cluster.client.get_node_services(node)
    except Exception as e:
        logger.warning("services list failed for %s/%s: %s", cid, node, e)
        return web.json_response({"services": [], "error": str(e)})
    return web.json_response({"services": rows or []})


@role_required("viewer")
async def syslog_handler(request: web.Request) -> web.Response:
    """Per-node syslog tail. Backed by PVE's `/nodes/{node}/syslog`.
    Lines are returned as [{n, t}] where t is the raw line."""
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        lines = max(1, min(int(request.query.get("lines") or "500"), 5000))
    except ValueError:
        lines = 500
    service = (request.query.get("service") or "").strip()
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        rows = await cluster.client.get_node_syslog(node, lines=lines, service=service)
    except Exception as e:
        logger.warning("syslog fetch failed for %s/%s: %s", cid, node, e)
        return web.json_response({"lines": [], "error": str(e)})
    return web.json_response({"lines": rows or [], "count": len(rows or [])})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/certificates",  certificates_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/updates",       updates_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/subscription",  subscription_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/services",      services_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/syslog",        syslog_handler),
]
