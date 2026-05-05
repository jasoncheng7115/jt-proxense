"""aiohttp middleware + route decorators for jt-proxense v0.2+.

Behaviour matrix:

  config.auth.enabled = false (DEFAULT — v0.1 compat)
    middleware passes through.   request["user"] = None.
    decorators are no-ops.

  config.auth.enabled = true
    middleware resolves the `jtps` cookie -> session -> user.
    request["user"] = {"id":..., "username":..., "role_global":...} or None.
    Routes flagged @auth_required reject with 401 when user is None.
    Routes flagged @role_required("admin") reject with 403 when role insufficient.

Each request also gets a 12-char correlation id at request["request_id"], echoed
back as the X-Request-Id header. The audit module reads it from there.
"""
from __future__ import annotations

import functools
import logging
import secrets
from typing import Awaitable, Callable, Optional

from aiohttp import web

from . import auth as auth_mod

logger = logging.getLogger(__name__)

# Routes that MUST work even without a session (login itself, static assets).
# Anything else is gated when auth is enabled.
_PUBLIC_PATHS = {
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/me",          # frontend uses this to discover "am I logged in?"
    "/api/auth/totp/login",  # 2FA second factor — no session yet at this point
    "/api/health",           # liveness probe — no telemetry
}
_PUBLIC_PREFIXES = (
    "/assets/",
    "/fonts/",
    "/login",            # the login page HTML itself
)


def _is_public(path: str) -> bool:
    if path in _PUBLIC_PATHS:
        return True
    if path == "/login":
        return True
    if path == "/favicon.svg":
        return True
    return any(path.startswith(p) for p in _PUBLIC_PREFIXES)


def _role_rank(role: Optional[str]) -> int:
    return {"viewer": 1, "operator": 2, "admin": 3}.get(role or "", 0)


def _client_ip(request: web.Request) -> str:
    """Best-effort client IP. X-Forwarded-For takes precedence (we trust
    the local reverse proxy if config says so — for v0.2 just trust it)."""
    xff = request.headers.get("X-Forwarded-For")
    if xff:
        return xff.split(",")[0].strip()
    return request.remote or "unknown"


# ---------------------------------------------------------------- middleware

@web.middleware
async def request_id_middleware(request: web.Request, handler):
    request["request_id"] = secrets.token_urlsafe(9)  # 12 chars
    request["client_ip"] = _client_ip(request)
    response = await handler(request)
    response.headers["X-Request-Id"] = request["request_id"]
    return response


# Cyberpunk landing page + the SPA assets need a permissive CSP only for fonts
# (we already inline the page CSS + JS). Everything is same-origin: no external
# scripts, fonts, or images. Tighten further in v0.3+ as we add real CSPs for
# the React routes.
_SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}


@web.middleware
async def security_headers_middleware(request: web.Request, handler):
    """Stamp common security headers on every response.

    CSP is intentionally NOT set here — the React SPA uses inline styles and
    the cyberpunk pages use inline <style>+<script>. Setting a strict CSP
    would break them; loosening it would defeat the point. v0.3 will move
    inline pieces into linked assets so a proper CSP becomes feasible.
    """
    try:
        response = await handler(request)
    except web.HTTPException as e:
        for k, v in _SECURITY_HEADERS.items():
            e.headers.setdefault(k, v)
        raise
    for k, v in _SECURITY_HEADERS.items():
        response.headers.setdefault(k, v)
    return response


def make_auth_middleware(auth_enabled: bool):
    """Closes over the config flag so we can switch behaviour at startup time
    without an extra dict lookup per request."""
    @web.middleware
    async def auth_middleware(request: web.Request, handler):
        if not auth_enabled:
            request["user"] = None
            return await handler(request)

        sid = request.cookies.get(auth_mod.SESSION_COOKIE)
        session = await auth_mod.get_session(sid) if sid else None
        request["user"] = None
        if session:
            user_row = auth_mod.get_user_by_id(session.user_id)
            if user_row and user_row["enabled"]:
                request["user"] = {
                    "id": user_row["id"],
                    "username": user_row["username"],
                    "session_id": session.id,
                    "role_global": auth_mod.role_for(user_row["id"], "*"),
                }

        if request["user"] is None and not _is_public(request.path):
            # API calls get JSON 401; HTML routes get a redirect to /login.
            if request.path.startswith("/api/") or request.path == "/ws":
                return web.json_response(
                    {"error": "auth_required", "message": "login required"},
                    status=401,
                )
            raise web.HTTPFound("/login")
        return await handler(request)
    return auth_middleware


# ---------------------------------------------------------------- decorators

def auth_required(handler: Callable[..., Awaitable]):
    """Reject 401 when auth is enabled and no user. No-op when auth is disabled
    (middleware sets request["user"] = None and passes through)."""
    @functools.wraps(handler)
    async def wrapped(request: web.Request, *a, **kw):
        # If auth is disabled, request["user"] is None and we pass through.
        # If auth is enabled, the global middleware already 401'd anonymous
        # requests; if we reach here, request["user"] is set.
        return await handler(request, *a, **kw)
    return wrapped


def role_required(min_role: str):
    """Reject 403 when user's role is below `min_role`. No-op if auth disabled."""
    needed = _role_rank(min_role)
    if needed == 0:
        raise ValueError(f"unknown role: {min_role}")

    def deco(handler):
        @functools.wraps(handler)
        async def wrapped(request: web.Request, *a, **kw):
            user = request.get("user")
            if user is None:
                # auth disabled -> permit (matches v0.1 behaviour)
                return await handler(request, *a, **kw)
            if _role_rank(user.get("role_global")) >= needed:
                return await handler(request, *a, **kw)
            return web.json_response(
                {"error": "forbidden", "required_role": min_role},
                status=403,
            )
        return wrapped
    return deco
