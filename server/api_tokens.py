"""Read-only PVE API tokens listing.

Admin operators want to know which API tokens exist on a PVE cluster
(for audit / rotation planning) without bouncing to the PVE web UI's
Datacenter > Permissions > API Tokens panel. We expose two GET routes:

  GET /api/clusters/{cluster_id}/tokens
       Lists every (user, token) pair on the cluster.

  GET /api/clusters/{cluster_id}/users/{userid}/tokens
       Lists tokens for one specific user.

Token *secrets* are never returned by PVE after creation — only metadata
(token ID, comment, expiry, privsep flag). That's exactly what we surface.
Token CREATE/DELETE deferred — the create flow has tricky UX (secret shown
once) and write privilege is sensitive.
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
        logger.warning("api_tokens %s failed: %s", key, e)
        return []
    _cache[key] = (now, data)
    return data


@role_required("admin")
async def list_all_tokens_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    users = await _fetch(("users", cid), cluster.client.list_users)
    rows: list[dict] = []
    # Fan out tokens-per-user requests in parallel; PVE caps cluster size
    # at ~32 users so this is bounded. Failures are silently dropped per
    # _fetch contract.
    async def fetch_user(u: dict) -> tuple[str, list]:
        userid = u.get("userid", "")
        toks = await _fetch(("tokens", cid, userid),
                            lambda: cluster.client.list_user_tokens(userid))
        return userid, toks
    pairs = await asyncio.gather(
        *(fetch_user(u) for u in users), return_exceptions=False
    )
    for userid, toks in pairs:
        for tok in toks or []:
            rows.append({
                "user": userid,
                "tokenid": tok.get("tokenid", ""),
                "comment": tok.get("comment", ""),
                "expire": tok.get("expire", 0),
                "privsep": bool(tok.get("privsep", 0)),
            })
    rows.sort(key=lambda r: (r["user"], r["tokenid"]))
    return web.json_response({"tokens": rows, "count": len(rows)})


@role_required("admin")
async def list_user_tokens_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    userid = request.match_info["userid"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    toks = await _fetch(("tokens", cid, userid),
                        lambda: cluster.client.list_user_tokens(userid))
    return web.json_response({"tokens": toks or [], "count": len(toks or [])})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/tokens",                 list_all_tokens_handler),
    ("GET", r"/api/clusters/{cluster_id}/users/{userid}/tokens",  list_user_tokens_handler),
]
