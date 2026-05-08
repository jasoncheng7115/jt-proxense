"""PVE task / operation history viewer.

PVE itself records every action — qmstart / qmshutdown / qmsnapshot /
qmrestore / vzdump / vncproxy / migrate / clone / etc. — under the cluster
tasks API. We expose a thin pass-through (cached briefly to avoid hammering
pveproxy) so the SPA can show the operator the full PVE-side history per
cluster, filterable by VM, type, status, and user.

Distinct from `audit.py`: that one logs *what JT-PROXENSE itself did*. This
one shows *what's happening on PVE*, including actions taken via PVE web
UI / pvesh / API by other operators. Both views are useful — one for "who
clicked what in our app", one for "what's actually happening on the cluster".

Routes:
  GET /api/clusters/{cluster_id}/tasks
       ?vmid=…&type=…&status=running|ok|error|all&user=…&limit=…
  GET /api/clusters/{cluster_id}/nodes/{node}/tasks/{upid}/log?start=0&limit=500
  GET /api/clusters/{cluster_id}/nodes/{node}/tasks/{upid}/status
"""
from __future__ import annotations

import logging
import time
from typing import Any, Optional

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


# Cache the cluster-tasks list per-cluster for a short window. Each call
# is one PVE API hit; an operator opening the page and refreshing would
# otherwise spam pveproxy. 5s is short enough that "running" tasks still
# appear quickly, long enough to absorb panel re-renders.
_CACHE_TTL_S = 5.0
_cache: dict[str, tuple[float, list[dict]]] = {}


def _classify_status(task: dict) -> str:
    """Normalise PVE task status into one of: running / ok / error.

    PVE conventions:
      - status == "OK" / "TASK OK"      → ok
      - endtime missing / 0             → still running
      - anything else                   → error (most common: 'TASK ERROR: <msg>')
    """
    if not task.get("endtime"):
        return "running"
    s = (task.get("status") or "").strip()
    if s.upper() in ("OK", "TASK OK"):
        return "ok"
    return "error"


async def _fetch_cluster_tasks(cluster_id: str, force: bool = False) -> list[dict]:
    """Cached cluster tasks fetch."""
    now = time.monotonic()
    if not force:
        hit = _cache.get(cluster_id)
        if hit and now - hit[0] < _CACHE_TTL_S:
            return hit[1]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return []
    tasks = await cluster.client.get_cluster_tasks(running=False, limit=500)
    # Annotate with normalised status + millis. PVE returns UNIX seconds;
    # the SPA happens to use ms throughout (matches Date.now()).
    for t in tasks:
        t["_status"] = _classify_status(t)
        if t.get("starttime"):
            t["starttime_ms"] = int(t["starttime"]) * 1000
        if t.get("endtime"):
            t["endtime_ms"] = int(t["endtime"]) * 1000
    _cache[cluster_id] = (now, tasks)
    return tasks


@role_required("viewer")
async def list_tasks_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    q = request.query
    vmid_q = q.get("vmid", "").strip()
    type_q = q.get("type", "").strip()
    status_q = (q.get("status") or "all").strip().lower()
    user_q = q.get("user", "").strip()
    try:
        limit = max(1, min(int(q.get("limit") or "200"), 1000))
    except ValueError:
        limit = 200
    force = q.get("force") == "1"

    tasks = await _fetch_cluster_tasks(cluster_id, force=force)

    # Filter. Done after the fetch so the cache is shared across filtered
    # views — a typical operator narrows down without re-pulling.
    out = []
    for t in tasks:
        if vmid_q and str(t.get("id") or "") != vmid_q:
            continue
        if type_q and t.get("type") != type_q:
            continue
        if user_q and user_q not in (t.get("user") or ""):
            continue
        if status_q != "all" and t.get("_status") != status_q:
            continue
        out.append(t)
        if len(out) >= limit:
            break

    # Distinct types / users for the filter dropdowns. Cheap on a cached list.
    types = sorted({(t.get("type") or "") for t in tasks if t.get("type")})
    users = sorted({(t.get("user") or "") for t in tasks if t.get("user")})

    return web.json_response({
        "tasks": out,
        "total": len(tasks),
        "filtered": len(out),
        "types": types,
        "users": users,
    })


@role_required("viewer")
async def task_log_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    upid = request.match_info["upid"]
    try:
        start = int(request.query.get("start") or "0")
        limit = max(1, min(int(request.query.get("limit") or "500"), 5000))
    except ValueError:
        return web.json_response({"error": "bad_params"}, status=400)
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    lines = await cluster.client.get_task_log(node, upid, start=start, limit=limit)
    return web.json_response({"lines": lines, "start": start, "count": len(lines)})


@role_required("viewer")
async def task_status_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    upid = request.match_info["upid"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    st = await cluster.client.get_task_status(node, upid)
    return web.json_response(st or {})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/tasks", list_tasks_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/tasks/{upid}/log", task_log_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/tasks/{upid}/status", task_status_handler),
]
