"""HTTP handlers for the encrypted per-cluster secret store.

Endpoints (admin only):
    GET    /api/secrets                      — list every (cluster, kind, key_id, ts)
    GET    /api/secrets/cluster/{cid}        — list kinds for one cluster
    POST   /api/secrets/cluster/{cid}/{kind} — body {value}, upsert
    DELETE /api/secrets/cluster/{cid}/{kind} — clear

The actual secret VALUES are never returned over the wire. The UI shows
"set" / "unset" indicators only.
"""
from __future__ import annotations

import logging

from aiohttp import web

from . import audit
from . import secret_store
from .middleware import role_required


logger = logging.getLogger(__name__)


def _audit_actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return user, request.get("client_ip", "unknown"), request.get("request_id", "")


@role_required("admin")
async def list_handler(request: web.Request) -> web.Response:
    rows = secret_store.list_secrets()
    return web.json_response({
        "secrets": rows,
        "key_fingerprint": secret_store.fingerprint(),
    })


@role_required("admin")
async def list_by_cluster_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    rows = [r for r in secret_store.list_secrets() if r["cluster_id"] == cluster_id]
    return web.json_response({"cluster_id": cluster_id, "secrets": rows})


@role_required("admin")
async def put_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    kind = request.match_info["kind"]
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    value = (body.get("value") or "").strip()
    if not value:
        return web.json_response({"error": "empty_value"}, status=400)

    user, ip, rid = _audit_actor(request)
    try:
        secret_store.put(cluster_id, kind, value, actor=user)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="secret.set",
            target=f"{cluster_id}/{kind}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
        )
        return web.json_response({"error": "store_failed", "detail": str(e)}, status=500)
    await audit.write(
        user=user, source_ip=ip, action="secret.set",
        target=f"{cluster_id}/{kind}", cluster_id=cluster_id,
        result="ok", request_id=rid,
    )
    return web.json_response({"ok": True})


@role_required("admin")
async def delete_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    kind = request.match_info["kind"]
    user, ip, rid = _audit_actor(request)
    removed = secret_store.delete(cluster_id, kind, actor=user)
    await audit.write(
        user=user, source_ip=ip, action="secret.delete",
        target=f"{cluster_id}/{kind}", cluster_id=cluster_id,
        result="ok" if removed else "noop", request_id=rid,
    )
    return web.json_response({"ok": True, "removed": removed})


ROUTES = [
    ("GET",    "/api/secrets",                                list_handler),
    ("GET",    "/api/secrets/cluster/{cluster_id}",            list_by_cluster_handler),
    ("POST",   "/api/secrets/cluster/{cluster_id}/{kind}",     put_handler),
    ("DELETE", "/api/secrets/cluster/{cluster_id}/{kind}",     delete_handler),
]
