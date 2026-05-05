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
from . import totp as totp_mod
from .middleware import role_required, auth_required


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

    # If user has TOTP enabled, do NOT issue a real session yet — return a
    # short-lived pending token. Frontend submits /api/auth/totp/login with
    # the code to complete authentication.
    if totp_mod.is_enabled(session.user_id):
        # Roll back the session we just created — it shouldn't exist until 2FA passes.
        await auth.logout(session.id)
        pending = totp_mod.issue_pending_token(session.user_id)
        await audit.write(
            user=username, source_ip=src_ip, action="auth.login",
            result="ok", request_id=request_id,
            params={"totp_required": True},
        )
        return web.json_response({
            "ok": True, "totp_required": True,
            "pending_token": pending,
            "ttl_seconds": totp_mod.PENDING_TOKEN_TTL_S,
        })

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


# ---------------------------------------------------------------- TOTP handlers

async def totp_login_handler(request: web.Request) -> web.Response:
    """Step 2 of login when user has TOTP enabled. Trades pending_token + code
    for a real session cookie."""
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    pending = body.get("pending_token") or ""
    code = body.get("code") or ""
    src_ip = request.get("client_ip", "unknown")
    request_id = request.get("request_id", "")

    # Same rate limiter as /api/auth/login — repeated bad TOTP submissions
    # from the same IP eventually get cooled off.
    if auth.is_rate_limited(src_ip):
        return web.json_response(
            {"error": "rate_limited"}, status=429,
        )

    user_id = totp_mod.consume_pending_token(pending)
    if user_id is None:
        auth.record_failed_login(src_ip, "<totp:pending_expired>")
        return web.json_response({"error": "pending_expired"}, status=401)

    if not totp_mod.verify_code(user_id, code):
        auth.record_failed_login(src_ip, f"<totp:user_id={user_id}>")
        await audit.write(
            user=str(user_id), source_ip=src_ip, action="auth.totp.verify",
            result="denied", request_id=request_id,
        )
        return web.json_response({"error": "invalid_totp"}, status=401)
    # success clears the per-IP counter (matches login())
    auth.clear_failed_logins(src_ip)

    # Mint a real session now.
    user_row = auth.get_user_by_id(user_id)
    if not user_row or not user_row["enabled"]:
        return web.json_response({"error": "user_disabled"}, status=401)

    import secrets
    sid = secrets.token_urlsafe(32)
    now = db.now_ms()
    expires = now + auth.SESSION_TTL_S * 1000
    async with db.connect() as c:
        await c.execute(
            "INSERT INTO sessions (id, user_id, created_at, expires_at, last_seen_at, source_ip, user_agent) "
            "VALUES (?,?,?,?,?,?,?)",
            (sid, user_id, now, expires, now, src_ip,
             request.headers.get("User-Agent", "")[:255]),
        )
        await c.execute("UPDATE users SET last_login_at=? WHERE id=?", (now, user_id))
        await c.commit()

    await audit.write(
        user=user_row["username"], source_ip=src_ip,
        action="auth.totp.verify", result="ok", request_id=request_id,
    )
    resp = web.json_response({
        "ok": True,
        "user": {
            "id": user_row["id"],
            "username": user_row["username"],
            "must_change_pw": bool(user_row["must_change_pw"]),
            "role_global": auth.role_for(user_id, "*"),
        },
    })
    resp.set_cookie(
        auth.SESSION_COOKIE, sid,
        httponly=True, secure=False, samesite="Lax",
        max_age=auth.SESSION_TTL_S, path="/",
    )
    return resp


@auth_required
async def totp_enroll_init_handler(request: web.Request) -> web.Response:
    user = request.get("user")
    if not user:
        return web.json_response({"error": "auth_required"}, status=401)
    secret = totp_mod.generate_secret()
    totp_mod.stage_secret(user["username"], secret)
    url = totp_mod.otpauth_url(user["username"], secret)
    qr = totp_mod.qr_png_data_uri(url)
    await audit.write(
        user=user["username"], source_ip=request.get("client_ip", "unknown"),
        action="auth.totp.enroll-init", result="ok",
        request_id=request.get("request_id", ""),
    )
    return web.json_response({
        "ok": True,
        "otpauth_url": url,
        "qr_data_uri": qr,
        "secret": secret,  # plain — for manual entry into authenticator
    })


@auth_required
async def totp_enroll_verify_handler(request: web.Request) -> web.Response:
    user = request.get("user")
    if not user:
        return web.json_response({"error": "auth_required"}, status=401)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    code = (body.get("code") or "").strip()
    ok, backup_codes = totp_mod.confirm_enrollment(user["username"], code)
    await audit.write(
        user=user["username"], source_ip=request.get("client_ip", "unknown"),
        action="auth.totp.enroll-verify",
        result="ok" if ok else "denied",
        request_id=request.get("request_id", ""),
    )
    if not ok:
        return web.json_response({"error": "invalid_totp"}, status=400)
    return web.json_response({
        "ok": True,
        "backup_codes": backup_codes,
        "warning": "Save these codes now. They will not be shown again.",
    })


@auth_required
async def change_password_handler(request: web.Request) -> web.Response:
    """Self-service password change. Requires the user's current password
    in the body so a stolen session alone can't change the password.

    PAM-managed accounts (sentinel hash) cannot change their password here;
    the system password tooling handles that.
    """
    user = request.get("user")
    if not user:
        return web.json_response({"error": "auth_required"}, status=401)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    current = body.get("current_password") or ""
    new = body.get("new_password") or ""
    if not current or not new:
        return web.json_response({"error": "missing_fields"}, status=400)
    if len(new) < 8:
        return web.json_response({"error": "new_too_short", "min_length": 8}, status=400)

    user_row = auth.get_user_by_username(user["username"])
    if not user_row:
        return web.json_response({"error": "user_not_found"}, status=404)

    # PAM-managed: reject — they should change their system password instead
    if user_row["password_hash"] == "*PAM*":
        return web.json_response({
            "error": "pam_managed",
            "message": "Use your system's passwd tool — this account is PAM-managed.",
        }, status=400)

    if not auth.verify_password(current, user_row["password_hash"]):
        await audit.write(
            user=user["username"],
            source_ip=request.get("client_ip", "unknown"),
            action="auth.change_password", result="denied",
            request_id=request.get("request_id", ""),
        )
        return web.json_response({"error": "current_password_invalid"}, status=401)

    auth.set_password(user["username"], new, must_change_pw=False)
    await audit.write(
        user=user["username"],
        source_ip=request.get("client_ip", "unknown"),
        action="auth.change_password", result="ok",
        request_id=request.get("request_id", ""),
    )
    return web.json_response({"ok": True})


# ---------------------------------------------------------------- /api/sessions

@role_required("admin")
async def sessions_list_handler(request: web.Request) -> web.Response:
    """List all active sessions across users. Admin only."""
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT s.id, s.user_id, s.created_at, s.expires_at, s.last_seen_at, "
            "       s.source_ip, s.user_agent, u.username "
            "FROM sessions s JOIN users u ON u.id = s.user_id "
            "WHERE s.expires_at > ? ORDER BY s.last_seen_at DESC",
            (db.now_ms(),),
        )
        rows = [dict(r) for r in await cur.fetchall()]
    # Truncate cookie ids in the response so even an admin can't lift them
    # to impersonate the user — they can revoke by id but not steal.
    for r in rows:
        r["id_preview"] = r["id"][:8] + "..." + r["id"][-4:] if r["id"] else ""
        del r["id"]
    return web.json_response({"sessions": rows})


@role_required("admin")
async def sessions_revoke_handler(request: web.Request) -> web.Response:
    """Revoke a session by its FULL id (admin must look it up via /api/sessions
    list first; we only accept full ids here so an attacker can't enumerate)."""
    sid = request.match_info.get("session_id", "")
    actor = (request.get("user") or {}).get("username", "anonymous")
    async with db.connect() as c:
        cur = await c.execute("DELETE FROM sessions WHERE id=?", (sid,))
        await c.commit()
        n = cur.rowcount or 0
    await audit.write(
        user=actor, source_ip=request.get("client_ip", "unknown"),
        action="session.revoke",
        target=f"session/{sid[:8]}...",
        result="ok" if n > 0 else "error:NotFound",
        request_id=request.get("request_id", ""),
    )
    if n == 0:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def sessions_revoke_user_handler(request: web.Request) -> web.Response:
    """Revoke ALL active sessions for a given user. Useful when an account is
    suspected compromised. Admin only."""
    username = request.match_info.get("username", "")
    actor = (request.get("user") or {}).get("username", "anonymous")
    user_row = auth.get_user_by_username(username)
    if not user_row:
        return web.json_response({"error": "user_not_found"}, status=404)
    async with db.connect() as c:
        cur = await c.execute("DELETE FROM sessions WHERE user_id=?", (user_row["id"],))
        await c.commit()
        n = cur.rowcount or 0
    await audit.write(
        user=actor, source_ip=request.get("client_ip", "unknown"),
        action="session.revoke_all",
        target=f"user/{username}",
        result="ok",
        request_id=request.get("request_id", ""),
        params={"revoked_count": n},
    )
    return web.json_response({"ok": True, "revoked": n})


# ---------------------------------------------------------------- TOTP disable

@auth_required
async def totp_disable_handler(request: web.Request) -> web.Response:
    """Self-service: a user disables their own TOTP. Requires a confirmation
    of the current TOTP code (so an attacker who steals a session can't bypass
    the second factor for future logins)."""
    user = request.get("user")
    if not user:
        return web.json_response({"error": "auth_required"}, status=401)
    if not totp_mod.is_enabled(user["id"]):
        return web.json_response({"ok": True, "already_disabled": True})
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    code = body.get("code") or ""
    if not totp_mod.verify_code(user["id"], code):
        return web.json_response({"error": "invalid_totp"}, status=401)
    totp_mod.disable(user["username"])
    await audit.write(
        user=user["username"], source_ip=request.get("client_ip", "unknown"),
        action="auth.totp.disable", result="ok",
        request_id=request.get("request_id", ""),
    )
    return web.json_response({"ok": True})


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
