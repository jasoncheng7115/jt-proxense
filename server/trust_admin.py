"""Admin endpoints for pinned TLS / SSH fingerprints (see trust_store).

Routes:
  GET  /api/trust          every pinned endpoint, with any REFUSED fingerprint
  POST /api/trust/accept   {kind, endpoint} — make the refused one the pin
  POST /api/trust/forget   {kind, endpoint} — drop the pin (re-learn on next use)

Accepting is the one action that tells jt-proxense "this new key really is my
node", so it is admin-only and audited with both fingerprints.
"""
from __future__ import annotations

import re

from aiohttp import web

from . import audit, trust_store
from .middleware import role_required

_KINDS = ("tls", "ssh")
_EP = re.compile(r"^[A-Za-z0-9.\-:\[\]]{1,255}:\d{1,5}$")


def _actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return user, request.get("client_ip", "unknown"), request.get("request_id", "")


async def _target(request: web.Request):
    try:
        body = await request.json()
    except Exception:
        return None, web.json_response({"error": "bad_json"}, status=400)
    kind = str((body or {}).get("kind") or "")
    ep = str((body or {}).get("endpoint") or "")
    if kind not in _KINDS or not _EP.match(ep):
        return None, web.json_response({"error": "bad_target"}, status=400)
    return (kind, ep), None


@role_required("admin")
async def list_handler(request: web.Request) -> web.Response:
    """Pinned TLS/SSH fingerprints, including any refused (pending) ones."""
    rows = trust_store.entries()
    return web.json_response({
        "enabled": trust_store.enabled(),
        "entries": rows,
        "pending": sum(1 for r in rows if r.get("pending")),
    })


@role_required("admin")
async def accept_handler(request: web.Request) -> web.Response:
    """Accept the refused fingerprint of one endpoint as its new pin."""
    target, err = await _target(request)
    if err:
        return err
    kind, ep = target
    before = next((r for r in trust_store.entries()
                   if r["kind"] == kind and r["endpoint"] == ep), None)
    ok = await trust_store.accept(kind, ep)
    user, ip, rid = _actor(request)
    await audit.write(
        user=user, source_ip=ip, action="trust.accept",
        target=f"{kind}:{ep}", result="ok" if ok else "error: nothing_pending",
        request_id=rid,
        params={"old": (before or {}).get("fingerprint"),
                "new": (before or {}).get("pending")},
    )
    if not ok:
        return web.json_response({"error": "nothing_pending"}, status=409)
    return web.json_response({"ok": True})


@role_required("admin")
async def forget_handler(request: web.Request) -> web.Response:
    """Forget one endpoint's pin; the next contact is trusted on first use."""
    target, err = await _target(request)
    if err:
        return err
    kind, ep = target
    ok = await trust_store.forget(kind, ep)
    user, ip, rid = _actor(request)
    await audit.write(
        user=user, source_ip=ip, action="trust.forget",
        target=f"{kind}:{ep}", result="ok" if ok else "error: not_pinned",
        request_id=rid,
    )
    if not ok:
        return web.json_response({"error": "not_pinned"}, status=404)
    return web.json_response({"ok": True})


ROUTES = [
    ("GET", "/api/trust", list_handler),
    ("POST", "/api/trust/accept", accept_handler),
    ("POST", "/api/trust/forget", forget_handler),
]
