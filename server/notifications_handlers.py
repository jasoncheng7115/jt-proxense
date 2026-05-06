"""HTTP handlers for /api/notifications/{channels,rules}. Admin only.

Mirrors the in-memory CRUD in server/notifications.py. All writes audited.
"""
from __future__ import annotations

from aiohttp import web

from . import audit, notifications
from .middleware import role_required


def _audit(request, action, target, result, params=None):
    user = (request.get("user") or {}).get("username", "anonymous")
    return audit.write(
        user=user, source_ip=request.get("client_ip", "unknown"),
        action=action, target=target, result=result,
        request_id=request.get("request_id", ""),
        params=params,
    )


# ---------------------------------------------------------------- channels

@role_required("admin")
async def channels_list_handler(request):
    return web.json_response({"channels": notifications.list_channels()})


@role_required("admin")
async def channels_create_handler(request):
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    name = body.get("name")
    type_ = body.get("type")
    config = body.get("config") or {}
    if not name or type_ not in ("webhook", "email"):
        return web.json_response({"error": "bad_request"}, status=400)
    try:
        cid = notifications.create_channel(name, type_, config,
                                           enabled=bool(body.get("enabled", True)))
    except ValueError as e:
        await _audit(request, "notification.channel.create",
                     target=name, result=audit.result_error(e), params={"type": type_})
        return web.json_response({"error": str(e)}, status=400)
    await _audit(request, "notification.channel.create",
                 target=name, result="ok", params={"type": type_})
    return web.json_response({"ok": True, "id": cid})


@role_required("admin")
async def channels_update_handler(request):
    name = request.match_info["name"]
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    ok = notifications.update_channel(
        name,
        enabled=body.get("enabled"),
        config=body.get("config"),
    )
    await _audit(request, "notification.channel.update",
                 target=name, result="ok" if ok else "error:NotFound")
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def channels_delete_handler(request):
    name = request.match_info["name"]
    ok = notifications.delete_channel(name)
    await _audit(request, "notification.channel.delete",
                 target=name, result="ok" if ok else "error:NotFound")
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


# ---------------------------------------------------------------- rules

@role_required("admin")
async def rules_list_handler(request):
    return web.json_response({"rules": notifications.list_rules()})


@role_required("admin")
async def rules_create_handler(request):
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    name = body.get("name")
    if not name:
        return web.json_response({"error": "missing_name"}, status=400)
    try:
        rid = notifications.create_rule(
            name,
            action_pattern=body.get("action_pattern"),
            min_severity=body.get("min_severity", "ok"),
            cluster_filter=body.get("cluster_filter"),
            channel_ids=body.get("channel_ids") or [],
            enabled=bool(body.get("enabled", True)),
        )
    except ValueError as e:
        await _audit(request, "notification.rule.create",
                     target=name, result=audit.result_error(e), params=body)
        return web.json_response({"error": str(e)}, status=400)
    await _audit(request, "notification.rule.create",
                 target=name, result="ok", params=body)
    return web.json_response({"ok": True, "id": rid})


@role_required("admin")
async def rules_update_handler(request):
    name = request.match_info["name"]
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    ok = notifications.update_rule(name, **body)
    await _audit(request, "notification.rule.update",
                 target=name, result="ok" if ok else "error:NotFound", params=body)
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


@role_required("admin")
async def rules_delete_handler(request):
    name = request.match_info["name"]
    ok = notifications.delete_rule(name)
    await _audit(request, "notification.rule.delete",
                 target=name, result="ok" if ok else "error:NotFound")
    if not ok:
        return web.json_response({"error": "not_found"}, status=404)
    return web.json_response({"ok": True})


ROUTES = [
    ("GET",    "/api/notifications/channels",        channels_list_handler),
    ("POST",   "/api/notifications/channels",        channels_create_handler),
    ("PUT",    "/api/notifications/channels/{name}", channels_update_handler),
    ("DELETE", "/api/notifications/channels/{name}", channels_delete_handler),
    ("GET",    "/api/notifications/rules",           rules_list_handler),
    ("POST",   "/api/notifications/rules",           rules_create_handler),
    ("PUT",    "/api/notifications/rules/{name}",    rules_update_handler),
    ("DELETE", "/api/notifications/rules/{name}",    rules_delete_handler),
]
