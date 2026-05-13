"""PVE API tokens — list (admin), create (admin), revoke (admin).

Admin operators want to manage which API tokens exist on a PVE cluster
without bouncing to the PVE web UI. Routes:

  GET    /api/clusters/{cluster_id}/tokens
        Lists every (user, token) pair on the cluster.

  GET    /api/clusters/{cluster_id}/users/{userid}/tokens
        Lists tokens for one specific user.

  POST   /api/clusters/{cluster_id}/users/{userid}/tokens
        Body: {tokenid, privsep, expire, comment}
        Creates a new token. **Response includes the secret ONCE** — the
        UI is responsible for showing it to the operator and warning that
        it can't be retrieved later. PVE itself never returns it again.

  DELETE /api/clusters/{cluster_id}/users/{userid}/tokens/{tokenid}
        Revokes the token immediately.

OWASP notes:
  A01 — every route admin-only via @role_required.
  A03 — userid / tokenid validated against strict regexes BEFORE going to
        PVE. We never let user input flow into the PVE URL path raw.
  A07 — token *secret* (PVE response `value` field) is forwarded to the
        client but NEVER logged — no logger calls touch the response body
        on the create path.
  A09 — every create/delete writes one audit row (no secret in params).
"""
from __future__ import annotations

import logging
import re
import time
import asyncio

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)

_CACHE_TTL_S = 30.0
_cache: dict[tuple, tuple[float, list]] = {}

# PVE: userid is `<user>@<realm>` where user is [A-Za-z0-9._-] and realm
# is [a-z][a-z0-9-]*. Tokenid is [A-Za-z0-9_-]+ (PVE doc:
# `pve-tokenid` pattern). Comment is free text but we cap length.
_USERID_RE = re.compile(r"^[A-Za-z0-9._\-]{1,64}@[a-z][a-z0-9\-]{0,32}$")
_TOKENID_RE = re.compile(r"^[A-Za-z][A-Za-z0-9._\-]{0,63}$")


def _audit(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


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


def _invalidate(cid: str, userid: str | None = None) -> None:
    """Drop cached token rows after a write so the UI sees the new state."""
    keys = [k for k in _cache if k[0] in ("users", "tokens") and k[1] == cid]
    if userid is not None:
        keys = [k for k in keys if (k[0] != "tokens") or (len(k) >= 3 and k[2] == userid)]
    for k in keys:
        _cache.pop(k, None)


@role_required("admin")
async def list_all_tokens_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    users = await _fetch(("users", cid), cluster.client.list_users)
    rows: list[dict] = []
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
    if not _USERID_RE.match(userid):
        return web.json_response({"error": "bad_userid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    toks = await _fetch(("tokens", cid, userid),
                        lambda: cluster.client.list_user_tokens(userid))
    return web.json_response({"tokens": toks or [], "count": len(toks or [])})


@role_required("admin")
async def create_user_token_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    userid = request.match_info["userid"]
    if not _USERID_RE.match(userid):
        return web.json_response({"error": "bad_userid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    tokenid = (body.get("tokenid") or "").strip()
    privsep = bool(body.get("privsep", True))
    expire  = body.get("expire")
    comment = (body.get("comment") or "").strip()

    if not _TOKENID_RE.match(tokenid):
        return web.json_response({"error": "bad_tokenid"}, status=400)
    if len(comment) > 256:
        return web.json_response({"error": "comment_too_long"}, status=400)
    if expire is not None and expire != "":
        try:
            expire = int(expire)
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_expire"}, status=400)
        if expire < 0 or expire > 0x7fff_ffff:
            return web.json_response({"error": "bad_expire"}, status=400)
    else:
        expire = None

    actor, ip, rid = _audit(request)
    try:
        resp = await cluster.client.create_user_token(
            userid, tokenid, privsep=privsep, expire=expire, comment=comment,
        )
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action="pve.token.create",
            target=f"{userid}!{tokenid}", result=audit.result_error(e),
            request_id=rid, cluster_id=cid,
            params={"privsep": privsep, "expire": expire},
        )
        return web.json_response(
            {"error": "create_failed", "detail": str(e)}, status=400,
        )

    await audit.write(
        user=actor, source_ip=ip, action="pve.token.create",
        target=f"{userid}!{tokenid}", result="ok",
        request_id=rid, cluster_id=cid,
        params={"privsep": privsep, "expire": expire},
    )
    _invalidate(cid, userid)

    # PVE response is `{full-tokenid, info, value}`. We pass the secret
    # straight through to the admin's browser without logging it.
    return web.json_response({
        "ok": True,
        "full_tokenid": resp.get("full-tokenid", f"{userid}!{tokenid}"),
        "value": resp.get("value", ""),
        "info": resp.get("info", {}),
    })


@role_required("admin")
async def delete_user_token_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    userid = request.match_info["userid"]
    tokenid = request.match_info["tokenid"]
    if not _USERID_RE.match(userid):
        return web.json_response({"error": "bad_userid"}, status=400)
    if not _TOKENID_RE.match(tokenid):
        return web.json_response({"error": "bad_tokenid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    actor, ip, rid = _audit(request)
    try:
        await cluster.client.delete_user_token(userid, tokenid)
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action="pve.token.delete",
            target=f"{userid}!{tokenid}", result=audit.result_error(e),
            request_id=rid, cluster_id=cid,
        )
        return web.json_response(
            {"error": "delete_failed", "detail": str(e)}, status=400,
        )

    await audit.write(
        user=actor, source_ip=ip, action="pve.token.delete",
        target=f"{userid}!{tokenid}", result="ok",
        request_id=rid, cluster_id=cid,
    )
    _invalidate(cid, userid)
    return web.json_response({"ok": True})


ROUTES = [
    ("GET",    r"/api/clusters/{cluster_id}/tokens",                            list_all_tokens_handler),
    ("GET",    r"/api/clusters/{cluster_id}/users/{userid}/tokens",             list_user_tokens_handler),
    ("POST",   r"/api/clusters/{cluster_id}/users/{userid}/tokens",             create_user_token_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/users/{userid}/tokens/{tokenid}",   delete_user_token_handler),
]
