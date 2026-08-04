"""Backup-jobs read-only viewer.

Exposes PVE's cluster-level scheduled vzdump jobs (`/cluster/backup`) so
operators can answer "what's our backup posture?" without bouncing to the
PVE web UI. Read-only for now; create/edit can come later — the bulk of
operator value is "is *anything* scheduled at all and when does it run".

Routes:
  GET /api/clusters/{cluster_id}/backup-jobs
"""
from __future__ import annotations

import logging
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)

# Cache same as pve_tasks — pveproxy is the bottleneck.
_CACHE_TTL_S = 15.0
_cache: dict[str, tuple[float, list[dict]]] = {}


async def _fetch(cluster_id: str, force: bool = False) -> list[dict]:
    now = time.monotonic()
    if not force:
        hit = _cache.get(cluster_id)
        if hit and now - hit[0] < _CACHE_TTL_S:
            return hit[1]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return []
    try:
        jobs = await cluster.client.list_backup_jobs()
    except Exception as e:
        logger.warning("list_backup_jobs failed for %s: %s", cluster_id, e)
        jobs = []
    _cache[cluster_id] = (now, jobs)
    return jobs


def normalise_jobs(jobs) -> list[dict]:
    """Normalise PVE's backup-job rows for the frontend.

    Shared with pdm_backups because BOTH modules register
    GET /api/clusters/{cid}/backup-jobs and aiohttp gives the route to
    whichever registers first (pdm_backups, at server.py:614). The copy that
    used to live inline here therefore never ran -- the NEXT RUN column was
    empty in the UI while this module's tests passed, because the tests
    exercised dead code. Keep one implementation so that cannot recur.
    """
    out = []
    for j in jobs or []:
        d = dict(j)
        en = d.get("enabled")
        d["enabled"] = bool(int(en)) if isinstance(en, (str, int)) else bool(en)
        # PVE spells this "next-run"; JS cannot read a hyphenated key as
        # j.next_run, so the column silently rendered "-" for every job.
        if "next-run" in d:
            d.setdefault("next_run", d["next-run"])
        out.append(d)
    return out


@role_required("viewer")
async def list_backup_jobs_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    force = request.query.get("force") == "1"
    jobs = await _fetch(cluster_id, force=force)
    out = normalise_jobs(jobs)
    return web.json_response({"jobs": out, "count": len(out)})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/backup-jobs", list_backup_jobs_handler),
]
