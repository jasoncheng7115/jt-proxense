"""Admin user management endpoints — companion to bin/jt-proxense user.

The CLI has been the only path for managing users since v0.2; this
module exposes the same primitives over HTTP so an admin can do it
from the web UI without SSHing to the host.

Routes (all admin-only):
  GET    /api/admin/users                       — list users + their roles + 2FA state
  POST   /api/admin/users                       — create local user
  DELETE /api/admin/users/{username}            — delete user
  POST   /api/admin/users/{username}/password   — reset password
  POST   /api/admin/users/{username}/enabled    — enable / disable
  POST   /api/admin/users/{username}/roles      — grant role
  DELETE /api/admin/users/{username}/roles      — revoke role
  POST   /api/admin/users/{username}/totp/disable — clear 2FA enrolment

Every action is audited. The role-grant payload mirrors the CLI:
{cluster_id, role, vm_pattern}.
"""
from __future__ import annotations

import logging
from typing import Any

from aiohttp import web

from . import audit
from . import auth
from . import totp as totp_mod
from .middleware import role_required


logger = logging.getLogger(__name__)


def _audit(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def _user_to_dict(u: dict[str, Any]) -> dict:
    """Hydrate one user row with their roles + 2FA state."""
    uid = u["id"]
    roles = auth.get_roles(uid)
    return {
        "id": uid,
        "username": u["username"],
        "enabled": bool(u["enabled"]),
        "must_change_pw": bool(u.get("must_change_pw", False)),
        "created_at":   u.get("created_at"),
        "last_login_at": u.get("last_login_at"),
        "totp_enabled": totp_mod.is_enabled(uid),
        "roles": roles,
    }


@role_required("admin")
async def list_users_handler(request: web.Request) -> web.Response:
    out = [_user_to_dict(u) for u in auth.list_users()]
    return web.json_response({"users": out})


@role_required("admin")
async def create_user_handler(request: web.Request) -> web.Response:
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    username = (body.get("username") or "").strip()
    password = (body.get("password") or "").strip()
    if not username or not password:
        return web.json_response({"error": "username_password_required"}, status=400)
    if len(password) < 8:
        return web.json_response({"error": "password_too_short"}, status=400)
    actor, ip, rid = _audit(request)
    try:
        uid = auth.create_user(username, password, must_change_pw=bool(body.get("must_change_pw", False)))
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action="admin.user.create",
            target=username, result=audit.result_error(e), request_id=rid,
        )
        return web.json_response({"error": "create_failed", "detail": str(e)}, status=409)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.create",
        target=username, result="ok", request_id=rid,
    )
    return web.json_response({"ok": True, "id": uid})


@role_required("admin")
async def delete_user_handler(request: web.Request) -> web.Response:
    username = request.match_info["username"]
    actor, ip, rid = _audit(request)
    if username == actor:
        return web.json_response(
            {"error": "cannot_delete_self"}, status=400,
        )
    ok = auth.delete_user(username)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.delete",
        target=username, result="ok" if ok else "not_found", request_id=rid,
    )
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def set_password_handler(request: web.Request) -> web.Response:
    username = request.match_info["username"]
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    new_pw = (body.get("password") or "").strip()
    must_change = bool(body.get("must_change_pw", True))
    if len(new_pw) < 8:
        return web.json_response({"error": "password_too_short"}, status=400)
    actor, ip, rid = _audit(request)
    ok = auth.set_password(username, new_pw, must_change_pw=must_change)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.set_password",
        target=username, result="ok" if ok else "not_found", request_id=rid,
        params={"must_change_pw": must_change},
    )
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def set_enabled_handler(request: web.Request) -> web.Response:
    username = request.match_info["username"]
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    enabled = bool(body.get("enabled", True))
    actor, ip, rid = _audit(request)
    ok = auth.set_enabled(username, enabled)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.set_enabled",
        target=username, result="ok" if ok else "not_found", request_id=rid,
        params={"enabled": enabled},
    )
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def grant_role_handler(request: web.Request) -> web.Response:
    username = request.match_info["username"]
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    cluster_id  = (body.get("cluster_id") or "*").strip()
    role        = (body.get("role") or "").strip().lower()
    vm_pattern  = (body.get("vm_pattern") or "*").strip()
    if role not in ("viewer", "operator", "admin"):
        return web.json_response({"error": "invalid_role"}, status=400)
    actor, ip, rid = _audit(request)
    try:
        auth.grant_role(username, cluster_id, role, vm_pattern=vm_pattern)
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action="admin.user.grant_role",
            target=username, result=audit.result_error(e), request_id=rid,
            params={"cluster_id": cluster_id, "role": role, "vm_pattern": vm_pattern},
        )
        return web.json_response({"error": "grant_failed", "detail": str(e)}, status=400)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.grant_role",
        target=username, result="ok", request_id=rid,
        params={"cluster_id": cluster_id, "role": role, "vm_pattern": vm_pattern},
    )
    return web.json_response({"ok": True})


@role_required("admin")
async def revoke_role_handler(request: web.Request) -> web.Response:
    username = request.match_info["username"]
    cluster_id = (request.query.get("cluster_id") or "*").strip()
    vm_pattern = (request.query.get("vm_pattern") or "*").strip()
    actor, ip, rid = _audit(request)
    ok = auth.revoke_role(username, cluster_id, vm_pattern=vm_pattern)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.revoke_role",
        target=username, result="ok" if ok else "not_found", request_id=rid,
        params={"cluster_id": cluster_id, "vm_pattern": vm_pattern},
    )
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def disable_totp_handler(request: web.Request) -> web.Response:
    username = request.match_info["username"]
    actor, ip, rid = _audit(request)
    ok = totp_mod.disable(username)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.disable_totp",
        target=username, result="ok" if ok else "not_found", request_id=rid,
    )
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def regen_totp_backup_codes_handler(request: web.Request) -> web.Response:
    """POST /api/admin/users/{username}/totp/backup-codes — re-issue
    TOTP backup codes for a user. Returns the new plaintext codes ONCE;
    admin must hand them to the user securely."""
    username = request.match_info["username"]
    actor, ip, rid = _audit(request)
    codes = totp_mod.regenerate_backup_codes(username)
    if not codes:
        await audit.write(
            user=actor, source_ip=ip, action="admin.user.totp_regen_backup",
            target=username, result="not_found_or_disabled", request_id=rid,
        )
        return web.json_response({"error": "not_found_or_totp_disabled"}, status=404)
    await audit.write(
        user=actor, source_ip=ip, action="admin.user.totp_regen_backup",
        target=username, result="ok", request_id=rid,
    )
    return web.json_response({
        "ok": True, "backup_codes": codes,
        "warning": "Hand these to the user via a secure channel. They will not be shown again.",
    })


ROUTES = [
    ("GET",    "/api/admin/users",                      list_users_handler),
    ("POST",   "/api/admin/users",                      create_user_handler),
    ("DELETE", "/api/admin/users/{username}",           delete_user_handler),
    ("POST",   "/api/admin/users/{username}/password",  set_password_handler),
    ("POST",   "/api/admin/users/{username}/enabled",   set_enabled_handler),
    ("POST",   "/api/admin/users/{username}/roles",     grant_role_handler),
    ("DELETE", "/api/admin/users/{username}/roles",     revoke_role_handler),
    ("POST",   "/api/admin/users/{username}/totp/disable",       disable_totp_handler),
    ("POST",   "/api/admin/users/{username}/totp/backup-codes",   regen_totp_backup_codes_handler),
]
