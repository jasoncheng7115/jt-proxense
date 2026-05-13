"""Live config + status for the audit log forwarder.

Routes:
  GET /api/audit-forwarder         (admin) — current state + config
  PUT /api/audit-forwarder         (admin) — update config + restart
                                            forwarder if enabled

Persists changes back to config.yaml via the existing save_config()
helper. The forwarder singleton is rebuilt in-place — no service
restart required.
"""
from __future__ import annotations

import logging

from aiohttp import web

from . import audit, audit_forwarder, config as cfg_mod
from .middleware import role_required


logger = logging.getLogger(__name__)


def _audit(request: web.Request):
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


@role_required("admin")
async def get_handler(request: web.Request) -> web.Response:
    cfg = cfg_mod.get_config()
    fwd = cfg.auth.forward
    fwd_obj = audit_forwarder.get_forwarder()
    return web.json_response({
        "config": {
            "enabled": fwd.enabled,
            "format": fwd.format,
            "transport": fwd.transport,
            "host": fwd.host,
            "port": fwd.port,
            "syslog_facility": fwd.syslog_facility,
            "cef_vendor": fwd.cef_vendor,
            "cef_product": fwd.cef_product,
            "cef_version": fwd.cef_version,
        },
        "running": fwd_obj is not None,
        "stats": (
            {"dropped": getattr(fwd_obj, "_dropped", 0)}
            if fwd_obj is not None else None
        ),
    })


_ALLOWED_FORMATS = {"gelf", "syslog", "cef"}
_ALLOWED_TRANSPORTS = {"udp", "tcp"}


@role_required("admin")
async def put_handler(request: web.Request) -> web.Response:
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    cfg = cfg_mod.get_config()
    fwd = cfg.auth.forward

    # Apply incoming changes with strict validation. Anything outside
    # the allow-list is rejected to keep config.yaml clean.
    if "enabled" in body:
        fwd.enabled = bool(body["enabled"])
    if "format" in body:
        v = str(body["format"]).strip().lower()
        if v not in _ALLOWED_FORMATS:
            return web.json_response({"error": "bad_format",
                                      "allowed": sorted(_ALLOWED_FORMATS)}, status=400)
        fwd.format = v
    if "transport" in body:
        v = str(body["transport"]).strip().lower()
        if v not in _ALLOWED_TRANSPORTS:
            return web.json_response({"error": "bad_transport",
                                      "allowed": sorted(_ALLOWED_TRANSPORTS)}, status=400)
        fwd.transport = v
    if "host" in body:
        v = str(body["host"]).strip()
        # Allow empty host = disabled even if `enabled=true`. Guard charset.
        import re
        if v and not re.match(r"^[A-Za-z0-9._\-:\[\]]{1,253}$", v):
            return web.json_response({"error": "bad_host"}, status=400)
        fwd.host = v
    if "port" in body:
        try:
            n = int(body["port"])
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_port"}, status=400)
        if n < 1 or n > 65535:
            return web.json_response({"error": "bad_port"}, status=400)
        fwd.port = n
    if "syslog_facility" in body:
        try:
            n = int(body["syslog_facility"])
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_syslog_facility"}, status=400)
        if n < 0 or n > 23:
            return web.json_response({"error": "bad_syslog_facility"}, status=400)
        fwd.syslog_facility = n
    if "cef_vendor" in body:
        fwd.cef_vendor = str(body["cef_vendor"])[:64]
    if "cef_product" in body:
        fwd.cef_product = str(body["cef_product"])[:64]
    if "cef_version" in body:
        fwd.cef_version = str(body["cef_version"])[:16]

    # Persist to config.yaml.
    try:
        cfg_mod.save_config(cfg)
    except Exception as e:
        return web.json_response(
            {"error": "save_failed", "detail": str(e)},
            status=500,
        )

    # Rebuild the forwarder singleton in place. If disabled or host empty,
    # tear down any running instance.
    old = audit_forwarder.get_forwarder()
    if old is not None:
        try:
            await old.stop()
        except Exception:
            pass
        audit_forwarder.set_forwarder(None)
    if fwd.enabled and fwd.host:
        try:
            new = audit_forwarder.AuditForwarder(
                fmt=fwd.format, transport=fwd.transport,
                host=fwd.host, port=fwd.port,
                syslog_facility=fwd.syslog_facility,
                cef_vendor=fwd.cef_vendor, cef_product=fwd.cef_product,
                cef_version=fwd.cef_version,
            )
            await new.start()
            audit_forwarder.set_forwarder(new)
        except Exception as e:
            logger.warning("audit_forwarder restart failed: %s", e)

    actor, ip, rid = _audit(request)
    await audit.write(
        user=actor, source_ip=ip, action="audit_forwarder.update",
        target="(self)", result="ok", request_id=rid,
        params={"enabled": fwd.enabled, "format": fwd.format,
                "transport": fwd.transport, "host": fwd.host, "port": fwd.port},
    )
    return web.json_response({"ok": True, "running": audit_forwarder.get_forwarder() is not None})


ROUTES = [
    ("GET", r"/api/audit-forwarder", get_handler),
    ("PUT", r"/api/audit-forwarder", put_handler),
]
