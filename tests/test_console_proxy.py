"""console_proxy: /prepare + the noVNC and termproxy WebSocket bridges.

Upstream is a fake pveproxy speaking real TLS (the proxy hardcodes https/wss),
so every assertion is about what actually crossed the wire:

  * PVEAuthCookie arrives as a raw `Cookie:` header, byte-identical — PVE
    tickets carry `+ / = :` and a percent-encoded cookie is a silent 401.
  * vncproxy form = websocket=1 / generate-password=0; termproxy form is empty
    for LXC and `serial=serial0` for a QEMU serial console.
  * termproxy: the bridge's FIRST frame upstream is `<user>:<ticket>\\n`, PVE
    answers 'O', and after that `0:<len>:<data>` / `1:<cols>:<rows>:` pass
    through verbatim. The browser never sees the ticket.
  * the per-host throttle slot is held for the handshake only.
"""
from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager

import aiohttp
import pytest
from aiohttp import web

from server import console_proxy, console_sessions, pve_throttle
from server import config as cfg_mod
from server.cluster_manager import Cluster, cluster_manager
from server.config import ClusterConfig, Config, ConsoleConfig, PVEAuthConfig, PVENodeConfig
from server.models import VMMetrics
from tests._fake_tls import server_ssl_context


PVE_TICKET = "PVE:root@pam:66F1A2B3::aB+c/d=e/Fg+H==:x"
CSRF = "66F1A2B3:Q3NyZlRva2Vu"
VNC_TICKET = "PVEVNC:66F1A2B3::vnc+Tk/t=Zz=="
TERM_TICKET = "PVEVNC:66F1A2B4::term+Tk/q=="
PASSWORD = "correct horse"


class FakePVE:
    def __init__(self):
        self.ticket_posts: list[dict] = []
        self.proxy_posts: list[dict] = []
        self.ws_conns: list[dict] = []
        self.ws_closed = asyncio.Event()
        self.reject_ws = False
        self.proxy_status = 200
        self.server = None

    async def ticket(self, request):
        form = dict(await request.post())
        self.ticket_posts.append(form)
        if form.get("password") != PASSWORD:
            return web.json_response({"data": None, "message": "authentication failure\n"},
                                     status=401, reason="authentication failure")
        return web.json_response({"data": {
            "ticket": PVE_TICKET, "CSRFPreventionToken": CSRF, "username": form["username"]}})

    async def proxy(self, request):
        form = dict(await request.post())
        self.proxy_posts.append({
            "path": request.path,
            "cookie": request.headers.get("Cookie"),
            "csrf": request.headers.get("CSRFPreventionToken"),
            "form": form,
        })
        if self.proxy_status != 200:
            return web.json_response({"data": None, "message": "VM 100 not running\n"},
                                     status=self.proxy_status, reason="VM 100 not running")
        if request.match_info["ep"] == "vncproxy":
            return web.json_response({"data": {
                "ticket": VNC_TICKET, "port": "5900", "user": "root@pam",
                "cert": "-", "upid": "UPID:pve1:1:1:1:vncproxy:100:root@pam:"}})
        return web.json_response({"data": {
            "ticket": TERM_TICKET, "port": 5901, "user": "root@pam",
            "upid": "UPID:pve2:1:1:1:vncshell::root@pam:"}})

    async def vncws(self, request):
        conn = {
            "path": request.path,
            "query": dict(request.query),
            "cookie": request.headers.get("Cookie"),
            "frames": [],
        }
        self.ws_conns.append(conn)
        if self.reject_ws or request.headers.get("Cookie") != f"PVEAuthCookie={PVE_TICKET}":
            return web.Response(status=401, reason="invalid ticket")
        ws = web.WebSocketResponse(protocols=("binary",))
        await ws.prepare(request)
        is_term = request.query.get("vncticket") == TERM_TICKET
        try:
            if not is_term:
                await ws.send_bytes(b"RFB 003.008\n")
            authed = False
            async for msg in ws:
                data = msg.data
                conn["frames"].append((msg.type, data))
                if is_term and not authed:
                    if msg.type == aiohttp.WSMsgType.TEXT and \
                            data == f"root@pam:{TERM_TICKET}\n":
                        authed = True
                        await ws.send_bytes(b"O")
                        continue
                    await ws.close()
                    break
                if is_term:
                    if isinstance(data, str) and data.startswith("0:"):
                        _, n, payload = data.split(":", 2)
                        await ws.send_bytes(payload[: int(n)].encode())
                elif msg.type == aiohttp.WSMsgType.BINARY:
                    await ws.send_bytes(b"echo:" + data)
                else:
                    await ws.send_str("echo:" + data)
        finally:
            self.ws_closed.set()
        return ws

    def app(self):
        a = web.Application()
        a.router.add_post("/api2/json/access/ticket", self.ticket)
        a.router.add_post("/api2/json/nodes/{node}/{kind}/{vmid}/{ep:(vncproxy|termproxy)}",
                          self.proxy)
        a.router.add_get("/api2/json/nodes/{node}/{kind}/{vmid}/vncwebsocket", self.vncws)
        return a


class RecordingThrottle:
    """Real limiter underneath, plus a live count of held slots."""

    def __init__(self):
        self.inner = pve_throttle._PVEThrottle(max_concurrent_per_host=1, min_gap_ms=0)
        self.hosts: list[str] = []
        self.held = 0

    @asynccontextmanager
    async def acquire(self, host):
        self.hosts.append(host)
        async with self.inner.acquire(host):
            self.held += 1
            try:
                yield
            finally:
                self.held -= 1


@pytest.fixture
async def env(aiohttp_server, aiohttp_client, monkeypatch):
    fake = FakePVE()
    fake.server = await aiohttp_server(fake.app(), ssl=server_ssl_context())

    cfg = Config(console=ConsoleConfig(mode="prompt"))
    monkeypatch.setattr(cfg_mod, "_current_config", cfg)

    cl = Cluster(ClusterConfig(
        id="c1",
        nodes=[PVENodeConfig(host="127.0.0.1", port=fake.server.port, verify_ssl=False)],
        auth=PVEAuthConfig(user="root@pam"),
    ))
    cl.cache.vms = {
        "pve1/100": VMMetrics(vmid=100, name="web01", node="pve1", cluster_id="c1",
                              type="qemu", tags=["prod", "web"]),
        "pve2/200": VMMetrics(vmid=200, name="ct-dns", node="pve2", cluster_id="c1",
                              type="lxc"),
    }
    monkeypatch.setattr(cluster_manager, "clusters", {"c1": cl})

    monkeypatch.setattr(console_sessions, "_tokens", {})
    monkeypatch.setattr(console_sessions, "_pve_ticket_cache", {})
    monkeypatch.setattr(console_sessions, "_lock", asyncio.Lock())
    audit_log: list[dict] = []

    async def record_audit(**kw):
        audit_log.append(kw)
    monkeypatch.setattr(console_proxy.audit, "write", record_audit)
    thr = RecordingThrottle()
    monkeypatch.setattr(console_proxy, "throttle", thr)

    holder = {"user": None}

    @web.middleware
    async def inject_user(request, handler):
        if holder["user"] is not None:
            request["user"] = holder["user"]
        request["client_ip"] = "203.0.113.99"
        request["request_id"] = "rid-1"
        return await handler(request)

    app = web.Application(middlewares=[inject_user])
    app.router.add_post("/api/console/prepare", console_proxy.console_prepare_handler)
    app.router.add_get("/api/console/{cluster_id}/{node}/{vmid}/ws",
                       console_proxy.console_ws_handler)
    app.router.add_get("/api/console/{cluster_id}/{node}/{vmid}/term/ws",
                       console_proxy.console_term_ws_handler)
    client = await aiohttp_client(app)

    class E:
        pass
    e = E()
    e.fake, e.client, e.cfg, e.cluster, e.throttle, e.user = fake, client, cfg, cl, thr, holder
    e.audit = audit_log
    yield e
    await cl.client.close()


def audit_rows(e):
    return [(a["action"], a["result"], a["target"]) for a in e.audit]


async def prepare(e, **body):
    b = {"cluster_id": "c1", "node": "pve1", "vmid": 100, "password": PASSWORD}
    b.update(body)
    r = await e.client.post("/api/console/prepare", json=b)
    return r.status, await r.json()


async def recv(ws, timeout=2.0):
    return await asyncio.wait_for(ws.receive(), timeout)


# ============================================================ /prepare

async def test_prepare_disabled_mode(env):
    env.cfg.console.mode = "disabled"
    st, body = await prepare(env)
    assert (st, body["error"]) == (403, "console_disabled")
    assert env.fake.ticket_posts == []


@pytest.mark.parametrize("body,status,err", [
    ({"kind": "rdp"}, 400, "bad_kind"),
    ({"vmid": None}, 400, "missing_fields"),
    ({"vmid": "abc"}, 400, "bad_vmid"),
    ({"cluster_id": "nope"}, 404, "cluster_not_found"),
    ({"vmid": 999}, 404, "vm_not_found"),
    ({"password": ""}, 400, "password_required"),
])
async def test_prepare_rejections(env, body, status, err):
    st, out = await prepare(env, **body)
    assert (st, out["error"]) == (status, err)
    assert env.fake.proxy_posts == []


async def test_prepare_qemu_vnc(env):
    st, out = await prepare(env)
    assert st == 200, out
    assert out["kind"] == "vnc"
    assert out["vnc_password"] == VNC_TICKET
    assert out["ttl_seconds"] == console_sessions.CONSOLE_TOKEN_TTL_S
    assert PVE_TICKET not in str(out), "the PVE auth ticket must never reach the browser"
    assert env.fake.ticket_posts == [{"username": "root@pam", "password": PASSWORD}]
    p = env.fake.proxy_posts[-1]
    assert p["path"] == "/api2/json/nodes/pve1/qemu/100/vncproxy"
    assert p["cookie"] == f"PVEAuthCookie={PVE_TICKET}", "raw, not percent-encoded"
    assert p["csrf"] == CSRF
    assert p["form"] == {"websocket": "1", "generate-password": "0"}
    assert env.throttle.hosts == ["127.0.0.1"] and env.throttle.held == 0
    assert audit_rows(env) == [("console.prepare", "ok", "c1/pve1/qemu/100")]


async def test_prepare_uses_the_node_the_guest_is_really_on(env):
    st, _ = await prepare(env, node="stale-node")
    assert st == 200
    assert env.fake.proxy_posts[-1]["path"] == "/api2/json/nodes/pve1/qemu/100/vncproxy"


async def test_prepare_lxc_uses_termproxy_and_hides_ticket(env):
    st, out = await prepare(env, node="pve2", vmid=200)
    assert st == 200, out
    assert out["kind"] == "term"
    assert "vnc_password" not in out
    assert TERM_TICKET not in str(out) and PVE_TICKET not in str(out)
    p = env.fake.proxy_posts[-1]
    assert p["path"] == "/api2/json/nodes/pve2/lxc/200/termproxy"
    assert p["form"] == {}


async def test_prepare_qemu_serial_attaches_serial0(env):
    st, out = await prepare(env, kind="serial")
    assert st == 200 and out["kind"] == "term"
    p = env.fake.proxy_posts[-1]
    assert p["path"] == "/api2/json/nodes/pve1/qemu/100/termproxy"
    assert p["form"] == {"serial": "serial0"}


async def test_prepare_wrong_password_is_502_and_audited(env):
    st, out = await prepare(env, password="nope")
    assert (st, out["error"]) == (502, "ticket_exchange_failed")
    assert env.fake.proxy_posts == []
    assert audit_rows(env) == [("console.prepare", "error:RuntimeError", "c1/pve1/qemu/100")]


async def test_prepare_upstream_proxy_failure_is_502_and_audited(env):
    env.fake.proxy_status = 500
    st, out = await prepare(env)
    assert (st, out["error"]) == (502, "vncproxy_failed")
    assert env.throttle.held == 0, "slot released even on failure"
    assert audit_rows(env)[-1][:2] == ("console.prepare", "error:RuntimeError")
    assert console_sessions._tokens == {}


async def test_prompt_mode_never_reuses_cached_ticket(env):
    await prepare(env)
    await prepare(env)
    assert len(env.fake.ticket_posts) == 2


async def test_stored_mode_uses_store_and_caches_ticket(env, monkeypatch):
    env.cfg.console.mode = "stored"
    seen = []
    monkeypatch.setattr(console_proxy.secret_store, "get",
                        lambda cid, kind: seen.append((cid, kind)) or PASSWORD)
    st1, _ = await prepare(env, password="ignored-in-stored-mode")
    st2, _ = await prepare(env)
    assert (st1, st2) == (200, 200)
    assert ("c1", "pve_password") in seen
    assert env.fake.ticket_posts == [{"username": "root@pam", "password": PASSWORD}], \
        "second open must reuse the cached PVE ticket"


async def test_stored_mode_without_password_is_412(env, monkeypatch):
    env.cfg.console.mode = "stored"
    monkeypatch.setattr(console_proxy.secret_store, "get", lambda cid, kind: None)
    st, out = await prepare(env)
    assert (st, out["error"]) == (412, "no_stored_password")
    assert env.fake.ticket_posts == []


# ------------------------------------------------------------ RBAC

async def _user(role, *, cluster="c1", pattern="*"):
    from server import auth
    uid = auth.create_user(f"u-{role}-{pattern.replace(':', '_')}", "Passw0rd-Test!")
    if role:
        auth.grant_role(f"u-{role}-{pattern.replace(':', '_')}", cluster, role,
                        vm_pattern=pattern)
    return {"id": uid, "username": f"u-{role}", "role_global": None}


async def test_viewer_cannot_open_console(env, db_path):
    env.user["user"] = await _user("viewer")
    st, out = await prepare(env)
    assert (st, out) == (403, {"error": "forbidden", "required_role": "operator"})
    assert env.fake.ticket_posts == []


async def test_other_cluster_grant_does_not_count(env, db_path):
    env.user["user"] = await _user("admin", cluster="c2")
    st, _ = await prepare(env)
    assert st == 403


async def test_operator_via_tag_grant(env, db_path):
    env.user["user"] = await _user("operator", pattern="tag:web")
    st, _ = await prepare(env)
    assert st == 200
    st2, _ = await prepare(env, node="pve2", vmid=200)   # untagged CT
    assert st2 == 403


# ============================================================ noVNC bridge

async def test_vnc_bridge_end_to_end(env):
    st, out = await prepare(env)
    assert st == 200
    ws = await env.client.ws_connect(
        f"/api/console/c1/pve1/100/ws?ct={out['console_token']}", protocols=("binary",))
    try:
        first = await recv(ws)
        assert first.type == aiohttp.WSMsgType.BINARY and first.data == b"RFB 003.008\n"

        conn = env.fake.ws_conns[-1]
        assert conn["path"] == "/api2/json/nodes/pve1/qemu/100/vncwebsocket"
        assert conn["query"] == {"port": "5900", "vncticket": VNC_TICKET}, \
            "ticket must survive the query string with + / = intact"
        assert conn["cookie"] == f"PVEAuthCookie={PVE_TICKET}"

        # Bridge is up: the handshake slot must already be free, or N open
        # consoles would starve a 4-slot per-host limiter.
        assert env.throttle.hosts == ["127.0.0.1", "127.0.0.1"], \
            "both the vncproxy POST and the WS upgrade go through the limiter"
        assert env.throttle.held == 0
        async def grab():
            async with env.throttle.inner.acquire("127.0.0.1"):
                pass
        await asyncio.wait_for(grab(), 0.5)

        await ws.send_bytes(b"\x03\x00\x01")
        m = await recv(ws)
        assert m.data == b"echo:\x03\x00\x01"
        await ws.send_str("hello")
        m = await recv(ws)
        assert (m.type, m.data) == (aiohttp.WSMsgType.TEXT, "echo:hello")
    finally:
        await ws.close()
    await asyncio.wait_for(env.fake.ws_closed.wait(), 2)
    assert ("console.open", "ok", "c1/pve1/qemu/100") in audit_rows(env)


async def test_console_token_is_single_use(env):
    _, out = await prepare(env)
    ws = await env.client.ws_connect(f"/api/console/c1/pve1/100/ws?ct={out['console_token']}")
    await recv(ws)
    await ws.close()
    r = await env.client.get(f"/api/console/c1/pve1/100/ws?ct={out['console_token']}")
    assert r.status == 403
    assert (await r.json())["error"] == "invalid_or_expired_token"
    assert len(env.fake.ws_conns) == 1


async def test_console_token_bound_to_its_vm(env):
    _, out = await prepare(env)
    r = await env.client.get(f"/api/console/c1/pve2/200/ws?ct={out['console_token']}")
    assert r.status == 403
    assert env.fake.ws_conns == []


@pytest.mark.parametrize("url,status,err", [
    ("/api/console/c1/pve1/100/ws", 400, "missing_console_token"),
    ("/api/console/zz/pve1/100/ws?ct=x", 404, "cluster_not_found"),
    ("/api/console/c1/pve1/555/ws?ct=x", 404, "vm_not_found"),
    ("/api/console/c1/pve1/100/ws?ct=forged", 403, "invalid_or_expired_token"),
])
async def test_ws_rejections(env, url, status, err):
    r = await env.client.get(url)
    assert r.status == status
    assert (await r.json())["error"] == err


async def test_ws_disabled_mode(env):
    _, out = await prepare(env)
    env.cfg.console.mode = "disabled"
    r = await env.client.get(f"/api/console/c1/pve1/100/ws?ct={out['console_token']}")
    assert r.status == 403


async def test_ws_requires_upgrade(env):
    _, out = await prepare(env)
    r = await env.client.get(f"/api/console/c1/pve1/100/ws?ct={out['console_token']}")
    assert (r.status, (await r.json())["error"]) == (400, "expected_ws_upgrade")


async def test_upstream_rejection_closes_browser_and_frees_slot(env):
    _, out = await prepare(env)
    env.fake.reject_ws = True
    ws = await env.client.ws_connect(f"/api/console/c1/pve1/100/ws?ct={out['console_token']}")
    m = await recv(ws)
    assert m.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED)
    await ws.close()
    assert env.throttle.held == 0
    # A console PVE refused must not be recorded as a successful open.
    opens = [r for r in audit_rows(env) if r[0] == "console.open"]
    assert opens and all(res != "ok" for _, res, _ in opens), opens


async def test_term_upstream_rejection_is_audited_as_failure(env):
    _, out = await prepare(env, node="pve2", vmid=200)
    env.fake.reject_ws = True
    ws = await env.client.ws_connect(
        f"/api/console/c1/pve2/200/term/ws?ct={out['console_token']}")
    m = await recv(ws)
    assert m.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED)
    await ws.close()
    opens = [r for r in audit_rows(env) if r[0] == "console.open"]
    assert opens and all(res != "ok" for _, res, _ in opens), opens


# ============================================================ termproxy bridge

async def test_term_bridge_auth_frame_and_passthrough(env):
    st, out = await prepare(env, node="pve2", vmid=200)
    assert st == 200
    ws = await env.client.ws_connect(
        f"/api/console/c1/pve2/200/term/ws?ct={out['console_token']}")
    try:
        ack = await recv(ws)
        assert (ack.type, ack.data) == (aiohttp.WSMsgType.BINARY, b"O"), \
            "the browser's first frame is PVE's ack, never the ticket"
        await ws.send_str("0:5:hello")
        out_frame = await recv(ws)
        assert out_frame.data == b"hello"
        await ws.send_str("1:120:40:")
        await ws.send_str("0:1:x")
        assert (await recv(ws)).data == b"x"

        conn = env.fake.ws_conns[-1]
        assert conn["path"] == "/api2/json/nodes/pve2/lxc/200/vncwebsocket"
        assert conn["query"] == {"port": "5901", "vncticket": TERM_TICKET}
        assert conn["cookie"] == f"PVEAuthCookie={PVE_TICKET}"
        assert conn["frames"][:4] == [
            (aiohttp.WSMsgType.TEXT, f"root@pam:{TERM_TICKET}\n"),
            (aiohttp.WSMsgType.TEXT, "0:5:hello"),
            (aiohttp.WSMsgType.TEXT, "1:120:40:"),
            (aiohttp.WSMsgType.TEXT, "0:1:x"),
        ]
        assert env.throttle.hosts == ["127.0.0.1", "127.0.0.1"]
        assert env.throttle.held == 0
    finally:
        await ws.close()
    await asyncio.wait_for(env.fake.ws_closed.wait(), 2)


async def test_term_bridge_uses_configured_pve_user(env):
    env.cluster.client.auth.user = "console@pve"
    _, out = await prepare(env, node="pve2", vmid=200)
    assert env.fake.ticket_posts[-1]["username"] == "console@pve"
    ws = await env.client.ws_connect(
        f"/api/console/c1/pve2/200/term/ws?ct={out['console_token']}")
    try:
        # fake only acks root@pam, so it closes on us — check what we sent
        await recv(ws)
    finally:
        await ws.close()
    await asyncio.wait_for(env.fake.ws_closed.wait(), 2)
    assert env.fake.ws_conns[-1]["frames"][0] == (
        aiohttp.WSMsgType.TEXT, f"console@pve:{TERM_TICKET}\n")


async def test_term_ws_refuses_a_vnc_token(env):
    _, out = await prepare(env)            # QEMU -> kind "vnc"
    r = await env.client.get(f"/api/console/c1/pve1/100/term/ws?ct={out['console_token']}")
    assert r.status == 403
    assert env.fake.ws_conns == []


async def test_serial_console_bridges_to_qemu_path(env):
    _, out = await prepare(env, kind="serial")
    # fake only acks TERM_TICKET logins; serial also gets TERM_TICKET from termproxy
    ws = await env.client.ws_connect(
        f"/api/console/c1/pve1/100/term/ws?ct={out['console_token']}")
    try:
        assert (await recv(ws)).data == b"O"
    finally:
        await ws.close()
    assert env.fake.ws_conns[-1]["path"] == "/api2/json/nodes/pve1/qemu/100/vncwebsocket"


# ============================================================ console_sessions

async def test_console_token_expiry(monkeypatch):
    monkeypatch.setattr(console_sessions, "_tokens", {})
    monkeypatch.setattr(console_sessions, "_lock", asyncio.Lock())
    now = [1000.0]
    monkeypatch.setattr(console_sessions, "_now", lambda: now[0])
    tok = await console_sessions.mint_console_token(
        cluster_id="c1", node="pve1", vmid=100, ticket="t")
    now[0] += console_sessions.CONSOLE_TOKEN_TTL_S + 1
    assert await console_sessions.consume_console_token(
        tok, cluster_id="c1", node="pve1", vmid=100) is None


async def test_cached_ticket_refreshed_within_a_minute_of_expiry(monkeypatch):
    monkeypatch.setattr(console_sessions, "_pve_ticket_cache", {})
    monkeypatch.setattr(console_sessions, "_tokens", {})
    monkeypatch.setattr(console_sessions, "_lock", asyncio.Lock())
    now = [1000.0]
    monkeypatch.setattr(console_sessions, "_now", lambda: now[0])
    calls = []

    class C:
        async def acquire_ticket(self, u, p):
            calls.append(u)
            return {"ticket": f"T{len(calls)}", "csrf": "c", "expires_at": now[0] + 600}
    c = C()
    assert await console_sessions.get_or_mint_pve_ticket("c1", c, username="u", password="p") == ("T1", "c")
    now[0] += 500
    assert (await console_sessions.get_or_mint_pve_ticket("c1", c, username="u", password="p"))[0] == "T1"
    now[0] += 50                          # 50 s left < 60 s safety margin
    assert (await console_sessions.get_or_mint_pve_ticket("c1", c, username="u", password="p"))[0] == "T2"
    console_sessions.clear_cache_for_cluster("c1")
    assert (await console_sessions.get_or_mint_pve_ticket("c1", c, username="u", password="p"))[0] == "T3"
