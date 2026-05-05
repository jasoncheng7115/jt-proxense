"""HTTP handlers for v0.2+ auth, users, audit endpoints.

Mounted under /api/auth, /api/users, /api/audit by server.py. The
@role_required decorators are no-ops when config.auth.enabled is false.
"""
from __future__ import annotations

import logging
import secrets

from aiohttp import web

from . import audit, auth
from . import db
from .middleware import role_required


logger = logging.getLogger(__name__)


# ---------------------------------------------------------------- /api/auth

async def login_handler(request: web.Request) -> web.Response:
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    username = (body.get("username") or "").strip()
    password = body.get("password") or ""
    if not username or not password:
        return web.json_response({"error": "missing_credentials"}, status=400)

    src_ip = request.get("client_ip", "unknown")
    ua = request.headers.get("User-Agent", "")[:255]
    request_id = request.get("request_id", "")

    try:
        session = await auth.login(username, password, source_ip=src_ip, user_agent=ua)
    except PermissionError:
        await audit.write(
            user=username, source_ip=src_ip, action="auth.login",
            result="denied", request_id=request_id,
        )
        return web.json_response(
            {"error": "rate_limited", "message": "too many failed attempts"},
            status=429,
        )

    if session is None:
        await audit.write(
            user=username, source_ip=src_ip, action="auth.login",
            result="denied", request_id=request_id,
        )
        return web.json_response({"error": "invalid_credentials"}, status=401)

    user_row = auth.get_user_by_id(session.user_id) or {}
    await audit.write(
        user=username, source_ip=src_ip, action="auth.login",
        result="ok", request_id=request_id,
    )
    resp = web.json_response({
        "ok": True,
        "user": {
            "id": user_row.get("id"),
            "username": user_row.get("username"),
            "must_change_pw": bool(user_row.get("must_change_pw")),
            "role_global": auth.role_for(session.user_id, "*"),
        },
    })
    resp.set_cookie(
        auth.SESSION_COOKIE, session.id,
        httponly=True, secure=False, samesite="Lax",
        max_age=auth.SESSION_TTL_S, path="/",
    )
    return resp


async def logout_handler(request: web.Request) -> web.Response:
    sid = request.cookies.get(auth.SESSION_COOKIE)
    user = (request.get("user") or {}).get("username", "anonymous")
    if sid:
        await auth.logout(sid)
    await audit.write(
        user=user, source_ip=request.get("client_ip", "unknown"),
        action="auth.logout", result="ok",
        request_id=request.get("request_id", ""),
    )
    resp = web.json_response({"ok": True})
    resp.del_cookie(auth.SESSION_COOKIE, path="/")
    return resp


async def me_handler(request: web.Request) -> web.Response:
    """GET /api/auth/me — current session info. Returns 200 even if anonymous;
    the response body says whether you're logged in."""
    user = request.get("user")
    if user is None:
        return web.json_response({"authenticated": False})
    return web.json_response({"authenticated": True, "user": user})


# ---------------------------------------------------------------- /api/users

@role_required("admin")
async def users_list_handler(request: web.Request) -> web.Response:
    return web.json_response({"users": auth.list_users()})


@role_required("admin")
async def users_create_handler(request: web.Request) -> web.Response:
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    name = (body.get("username") or "").strip()
    pw = body.get("password") or ""
    role = body.get("role", "viewer")
    if not name or not pw:
        return web.json_response({"error": "missing_fields"}, status=400)
    if role not in ("viewer", "operator", "admin"):
        return web.json_response({"error": "bad_role"}, status=400)

    actor = (request.get("user") or {}).get("username", "anonymous")
    try:
        uid = auth.create_user(name, pw)
        auth.grant_role(name, "*", role)
    except ValueError as e:
        await audit.write(
            user=actor, source_ip=request.get("client_ip", "unknown"),
            action="user.create", target=name, result="error:ValueError",
            request_id=request.get("request_id", ""),
        )
        return web.json_response({"error": str(e)}, status=400)

    await audit.write(
        user=actor, source_ip=request.get("client_ip", "unknown"),
        action="user.create", target=name, result="ok",
        request_id=request.get("request_id", ""),
        params={"role": role},
    )
    return web.json_response({"ok": True, "id": uid})


@role_required("admin")
async def users_delete_handler(request: web.Request) -> web.Response:
    name = request.match_info.get("username", "")
    actor = (request.get("user") or {}).get("username", "anonymous")
    deleted = auth.delete_user(name)
    await audit.write(
        user=actor, source_ip=request.get("client_ip", "unknown"),
        action="user.delete", target=name,
        result="ok" if deleted else "error:NotFound",
        request_id=request.get("request_id", ""),
    )
    if not deleted:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


# ---------------------------------------------------------------- /api/audit

@role_required("admin")
async def audit_query_handler(request: web.Request) -> web.Response:
    q = request.query
    rows = await audit.query(
        user=q.get("user") or None,
        action=q.get("action") or None,
        cluster_id=q.get("cluster_id") or None,
        since_ms=int(q["since_ms"]) if q.get("since_ms") else None,
        until_ms=int(q["until_ms"]) if q.get("until_ms") else None,
        limit=int(q.get("limit", "100")),
        offset=int(q.get("offset", "0")),
    )
    total = await audit.count()
    return web.json_response({"rows": rows, "total": total})
