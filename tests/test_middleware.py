"""Middleware: public-path matrix, role decorator, redirect-vs-401 logic."""
import pytest
from aiohttp import web

from server import middleware as mw
from server import auth


# ---------------------------------------------------------------- helpers

def _role_rank(role):
    return mw._role_rank(role)


# ---------------------------------------------------------------- pure utility tests

def test_role_rank_ordering():
    assert _role_rank("viewer") < _role_rank("operator") < _role_rank("admin")
    assert _role_rank(None) == 0
    assert _role_rank("godmode") == 0


def test_is_public_known_paths():
    assert mw._is_public("/api/auth/login")
    assert mw._is_public("/api/auth/logout")
    assert mw._is_public("/api/auth/me")
    assert mw._is_public("/api/health")
    assert mw._is_public("/login")
    assert mw._is_public("/favicon.svg")


def test_is_public_prefixes():
    assert mw._is_public("/assets/index-abc.js")
    assert mw._is_public("/fonts/orbitron-700.woff2")


def test_is_public_root_is_NOT_public():
    """The SPA root must require auth when auth.enabled — middleware redirects
    anonymous / to /login."""
    assert mw._is_public("/") is False


def test_is_public_api_endpoints_NOT_public():
    assert mw._is_public("/api/clusters") is False
    assert mw._is_public("/api/users") is False
    assert mw._is_public("/api/audit") is False


# ---------------------------------------------------------------- middleware integration

async def _make_app(auth_enabled, db_path):
    app = web.Application(middlewares=[
        mw.request_id_middleware,
        mw.make_auth_middleware(auth_enabled),
    ])

    async def home(req):
        u = req.get("user")
        return web.json_response({"user": u and u["username"]})

    async def health(req):
        return web.json_response({"ok": True})

    @mw.role_required("admin")
    async def admin_only(req):
        return web.json_response({"ok": True})

    app.router.add_get("/", home)
    app.router.add_get("/api/health", health)
    app.router.add_get("/api/admin", admin_only)
    return app


@pytest.mark.asyncio
async def test_auth_disabled_passes_through(db_path, aiohttp_client):
    app = await _make_app(False, db_path)
    client = await aiohttp_client(app)
    r = await client.get("/")
    assert r.status == 200
    body = await r.json()
    assert body["user"] is None  # request["user"] is None when auth disabled


@pytest.mark.asyncio
async def test_auth_disabled_admin_route_is_open(db_path, aiohttp_client):
    """When auth is off, @role_required is a no-op (v0.1 backward compat)."""
    app = await _make_app(False, db_path)
    client = await aiohttp_client(app)
    r = await client.get("/api/admin")
    assert r.status == 200


@pytest.mark.asyncio
async def test_auth_enabled_anonymous_html_redirects_to_login(db_path, aiohttp_client):
    app = await _make_app(True, db_path)
    client = await aiohttp_client(app)
    r = await client.get("/", allow_redirects=False)
    assert r.status == 302
    assert r.headers["Location"] == "/login"


@pytest.mark.asyncio
async def test_auth_enabled_anonymous_api_is_401(db_path, aiohttp_client):
    app = await _make_app(True, db_path)
    client = await aiohttp_client(app)
    r = await client.get("/api/admin")
    assert r.status == 401
    body = await r.json()
    assert body["error"] == "auth_required"


@pytest.mark.asyncio
async def test_auth_enabled_health_is_public(db_path, aiohttp_client):
    """Health probe must NOT require auth (so external monitors can poll it)."""
    app = await _make_app(True, db_path)
    client = await aiohttp_client(app)
    r = await client.get("/api/health")
    assert r.status == 200


@pytest.mark.asyncio
async def test_request_id_middleware_emits_header(db_path, aiohttp_client):
    app = await _make_app(False, db_path)
    client = await aiohttp_client(app)
    r = await client.get("/")
    assert "X-Request-Id" in r.headers
    assert len(r.headers["X-Request-Id"]) >= 8


@pytest.mark.asyncio
async def test_authenticated_admin_can_access(db_path, aiohttp_client):
    """End-to-end: log in as admin, hit admin-only route."""
    auth.create_user("alice", "good-pw-99887766")
    auth.grant_role("alice", "*", "admin")
    app = await _make_app(True, db_path)
    client = await aiohttp_client(app)

    r = await client.get("/api/admin")
    assert r.status == 401  # no session yet

    s = await auth.login("alice", "good-pw-99887766", source_ip="127.0.0.1")
    client.session.cookie_jar.update_cookies(
        {auth.SESSION_COOKIE: s.id}, response_url=client.make_url("/")
    )
    r = await client.get("/api/admin")
    assert r.status == 200


@pytest.mark.asyncio
async def test_authenticated_viewer_blocked_from_admin(db_path, aiohttp_client):
    auth.create_user("bob", "good-pw-99887766")
    auth.grant_role("bob", "*", "viewer")
    app = await _make_app(True, db_path)
    client = await aiohttp_client(app)

    s = await auth.login("bob", "good-pw-99887766", source_ip="127.0.0.1")
    client.session.cookie_jar.update_cookies(
        {auth.SESSION_COOKIE: s.id}, response_url=client.make_url("/")
    )
    r = await client.get("/api/admin")
    assert r.status == 403
    body = await r.json()
    assert body["required_role"] == "admin"
