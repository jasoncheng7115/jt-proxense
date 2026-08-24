"""Applying pending updates goes through termproxy, not a fictional API.

Issue #3: the APT dialog's dist-upgrade button POSTed to
`/nodes/{node}/apt/upgrade`. That endpoint has never existed -- PVE's APT
module registers only changelog / repositories / update / versions -- so PVE
answered `501 Method 'POST /nodes/{node}/apt/upgrade' not implemented` for
every operator on every version. Confirmed against the operator's own PVE
9.0.10 and 9.2.3 nodes (the apt index lists exactly those four children) and
against Proxmox's API source.

PVE's own web UI applies updates by opening termproxy with `cmd=upgrade`,
which runs `/usr/bin/pveupgrade --shell`. host_shell.py now does the same, so
this needs no SSH key and leaves apt interactive.

The positive path here talks to a FAKE termproxy: nothing in this file touches
a real node.
"""
from __future__ import annotations

import re
from pathlib import Path

import pytest
from aiohttp import web

from server import host_shell
from server.middleware import request_id_middleware, make_auth_middleware

ROOT = Path(__file__).resolve().parent.parent


# ---------------------------------------------------------------- fakes

class _FakeAuth:
    user = "root@pam"
    password = "pw"


class _FakeNodeCfg:
    host = "10.0.0.1"
    port = 8006
    verify_ssl = False


class _FakeClient:
    auth = _FakeAuth()
    nodes = [_FakeNodeCfg()]
    current_node = _FakeNodeCfg()


class _FakeCluster:
    client = _FakeClient()


class _FakeResp:
    status = 200

    def __init__(self, sink):
        self._sink = sink

    async def json(self):
        return {"data": {"ticket": "PVEVNC:fake", "port": 5900}}

    async def text(self):
        return ""

    async def __aenter__(self):
        return self

    async def __aexit__(self, *a):
        return False


class _FakeSession:
    """Captures the body posted to termproxy -- the whole point of the test."""

    def __init__(self, sink, **kw):
        self._sink = sink

    def post(self, url, headers=None, data=None):
        self._sink.append({"url": url, "data": data})
        return _FakeResp(self._sink)

    async def __aenter__(self):
        return self

    async def __aexit__(self, *a):
        return False


@pytest.fixture
def termproxy_calls(monkeypatch, db_path):
    """Wire host_shell to a fake PVE and return the list of termproxy posts."""
    from server import cluster_manager as cm
    from server import console_sessions
    from server.config import Config, AuthConfig, ConsoleConfig, ServerConfig
    from server import config as cfg_mod

    cfg_mod._current_config = Config(
        server=ServerConfig(host="127.0.0.1", http_port=0),
        auth=AuthConfig(enabled=False, backend="local", db_path="/tmp/never-used"),
        console=ConsoleConfig(mode="stored"),
    )

    monkeypatch.setattr(cm.cluster_manager, "get_cluster",
                        lambda cid: _FakeCluster() if cid == "cluster1" else None)

    async def _ticket(cluster_id, client, *, username, password, force_fresh):
        return ("PVE:ticket", "csrf")

    async def _mint(**kw):
        return "console-token-abc"

    monkeypatch.setattr(console_sessions, "get_or_mint_pve_ticket", _ticket)
    monkeypatch.setattr(console_sessions, "mint_console_token", _mint)

    sink: list[dict] = []

    class _Aiohttp:
        ClientSession = staticmethod(lambda **kw: _FakeSession(sink, **kw))
        TCPConnector = staticmethod(lambda **kw: None)

    monkeypatch.setattr(host_shell, "aiohttp", _Aiohttp)
    return sink


def _app():
    app = web.Application(middlewares=[
        request_id_middleware,
        make_auth_middleware(False),
    ])
    for method, path, handler in host_shell.ROUTES:
        app.router.add_route(method, path, handler)
    return app


# ---------------------------------------------------------------- the guard

@pytest.mark.asyncio
async def test_unknown_cmd_is_refused(termproxy_calls, aiohttp_client):
    """Test the REFUSAL, not just the success (CLAUDE.md #26).

    `cmd` is forwarded to PVE, and PVE's own enum includes `ceph_install`,
    which installs packages. Reject-by-default keeps the surface to the one
    command this feature is for.
    """
    client = await aiohttp_client(_app())
    r = await client.post("/api/console/host/prepare", json={
        "cluster_id": "cluster1", "node": "n1", "cmd": "ceph_install"})
    assert r.status == 400
    assert (await r.json())["error"] == "bad_cmd"
    assert termproxy_calls == [], "refused request still reached PVE"


@pytest.mark.asyncio
@pytest.mark.parametrize("cmd", ["login", "", "rm -rf /", "upgrade;reboot"])
async def test_only_upgrade_is_accepted(termproxy_calls, aiohttp_client, cmd):
    client = await aiohttp_client(_app())
    r = await client.post("/api/console/host/prepare", json={
        "cluster_id": "cluster1", "node": "n1", "cmd": cmd})
    if cmd == "":
        assert r.status == 200          # empty means "plain login shell"
    else:
        assert r.status == 400, f"{cmd!r} was accepted"


# ---------------------------------------------------------------- the fix

@pytest.mark.asyncio
async def test_upgrade_reaches_termproxy_as_cmd(termproxy_calls, aiohttp_client):
    client = await aiohttp_client(_app())
    r = await client.post("/api/console/host/prepare", json={
        "cluster_id": "cluster1", "node": "n1", "cmd": "upgrade"})
    assert r.status == 200, await r.text()
    assert len(termproxy_calls) == 1
    call = termproxy_calls[0]
    assert call["url"].endswith("/nodes/n1/termproxy"), call["url"]
    assert call["data"] == {"cmd": "upgrade"}


@pytest.mark.asyncio
async def test_plain_shell_still_sends_no_cmd(termproxy_calls, aiohttp_client):
    """The ordinary host shell must keep opening a login shell. Sending
    cmd='' or cmd='login' would change what the existing button does."""
    client = await aiohttp_client(_app())
    r = await client.post("/api/console/host/prepare", json={
        "cluster_id": "cluster1", "node": "n1"})
    assert r.status == 200, await r.text()
    assert termproxy_calls[0]["data"] == {}


@pytest.mark.asyncio
async def test_upgrade_is_audited_under_its_own_action(termproxy_calls, aiohttp_client):
    """"Who upgraded this node" has to stay answerable now that the apt.upgrade
    endpoint is gone."""
    from server import audit
    client = await aiohttp_client(_app())
    await client.post("/api/console/host/prepare", json={
        "cluster_id": "cluster1", "node": "n1", "cmd": "upgrade"})
    rows = await audit.query(limit=50)
    actions = [r["action"] for r in rows]
    assert "apt.upgrade_shell" in actions, actions
    assert "console.host.prepare" not in actions, (
        "an upgrade was logged as an ordinary shell open")


# ---------------------------------------------------------------- regression

def test_nothing_calls_the_endpoint_pve_does_not_have():
    """The 501 came from a single dead call path; make sure it stays dead."""
    offenders = []
    for pat in ("server/**/*.py", "src/client/**/*.ts", "src/client/**/*.tsx"):
        for p in ROOT.glob(pat):
            for i, line in enumerate(p.read_text().splitlines(), 1):
                if re.search(r"apt/upgrade", line) and not line.lstrip().startswith(("#", "*", "//")):
                    offenders.append(f"{p.relative_to(ROOT)}:{i}: {line.strip()[:90]}")
    assert not offenders, (
        "PVE has no /apt/upgrade endpoint; these call sites return 501:\n  "
        + "\n  ".join(offenders))
