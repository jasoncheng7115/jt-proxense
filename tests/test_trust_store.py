"""Pinned TLS certificate / SSH host-key fingerprints (trust on first use).

Real TLS end to end: the fake pveproxy speaks TLS with a throwaway cert
(tests/_fake_tls.py), so what is pinned is what a real handshake presents.
"""
from __future__ import annotations

import hashlib
import ssl

import aiohttp
import pytest
from aiohttp import web

from server import pve_throttle, trust_store as ts
from server.config import PVEAuthConfig, PVENodeConfig
from server.pve_client import PVEClient
from tests._fake_tls import _cert_paths, server_ssl_context


def _real_fp() -> str:
    pem = open(_cert_paths()[0]).read()
    return hashlib.sha256(ssl.PEM_cert_to_DER_cert(pem)).hexdigest()


@pytest.fixture
def fresh_throttle(monkeypatch):
    t = pve_throttle._PVEThrottle(max_concurrent_per_host=4, min_gap_ms=0)
    monkeypatch.setattr(pve_throttle, "throttle", t)


@pytest.fixture
async def pve(aiohttp_server, fresh_throttle):
    app = web.Application()

    async def version(_):
        return web.json_response({"data": {"version": "9.2.3"}})
    app.router.add_get("/api2/json/version", version)
    return await aiohttp_server(app, ssl=server_ssl_context())


def _client(server):
    return PVEClient(nodes=[PVENodeConfig(host="127.0.0.1", port=server.port)],
                     auth=PVEAuthConfig(user="u@pve", token_name="t", token_value="v"),
                     timeout=5.0)


async def test_first_contact_pins_the_presented_certificate(pve):
    c = _client(pve)
    try:
        assert (await c._request("GET", "/version"))["version"] == "9.2.3"
    finally:
        await c.close()
    [e] = ts.entries()
    assert (e["kind"], e["endpoint"]) == ("tls", f"127.0.0.1:{pve.port}")
    assert e["fingerprint"] == _real_fp()
    assert e["pending"] is None


async def test_changed_certificate_is_refused_and_recorded(pve):
    ep = f"127.0.0.1:{pve.port}"
    ts._pins[("tls", ep)] = {"fingerprint": "ab" * 32, "first_seen": 1,
                             "last_seen": 1, "pending": None, "pending_seen": None}
    c = _client(pve)
    try:
        with pytest.raises(aiohttp.ServerFingerprintMismatch):
            await c._request("GET", "/version")
    finally:
        await c.close()
    [e] = ts.entries()
    assert e["fingerprint"] == "ab" * 32          # pin unchanged
    assert e["pending"] == _real_fp()             # refused one kept for review


async def test_accepting_the_refused_certificate_restores_access(pve):
    ep = f"127.0.0.1:{pve.port}"
    ts._pins[("tls", ep)] = {"fingerprint": "ab" * 32, "first_seen": 1,
                             "last_seen": 1, "pending": None, "pending_seen": None}
    c = _client(pve)
    try:
        with pytest.raises(aiohttp.ServerFingerprintMismatch):
            await c._request("GET", "/version")
        assert await ts.accept("tls", ep)
        assert (await c._request("GET", "/version"))["version"] == "9.2.3"
    finally:
        await c.close()
    assert ts.entries()[0]["fingerprint"] == _real_fp()


async def test_verify_ssl_uses_ca_validation_not_pinning():
    assert await ts.tls_ssl("127.0.0.1", 1, True) is None
    assert ts.entries() == []


async def test_pinning_off_restores_old_behaviour(monkeypatch):
    monkeypatch.setattr(ts, "enabled", lambda: False)
    ctx = await ts.tls_ssl("127.0.0.1", 1, False)
    assert isinstance(ctx, ssl.SSLContext) and ctx.verify_mode == ssl.CERT_NONE
    assert ts.entries() == []


async def test_unreachable_node_fails_closed_without_pinning():
    fp = await ts.tls_ssl("127.0.0.1", 1, False)       # nothing listens on :1
    assert isinstance(fp, aiohttp.Fingerprint)
    assert ts.entries() == [], "nothing may be pinned from a failed probe"


# ── SSH host keys ────────────────────────────────────────────────────────

class _Key:
    def __init__(self, fp):
        self.fp = fp

    def get_fingerprint(self, alg):
        assert alg == "sha256"
        return self.fp


class _Conn:
    def __init__(self, fp):
        self.key = _Key(fp)
        self.closed = False

    def get_server_host_key(self):
        return self.key

    def close(self):
        self.closed = True


async def test_ssh_host_key_pinned_then_enforced():
    await ts.check_ssh("n1", 22, _Conn("SHA256:aaa"))
    await ts.check_ssh("n1", 22, _Conn("SHA256:aaa"))   # same key: fine
    with pytest.raises(ts.FingerprintMismatch) as ei:
        await ts.check_ssh("n1", 22, _Conn("SHA256:bbb"))
    assert "Trusted fingerprints" in str(ei.value)
    [e] = ts.entries()
    assert (e["fingerprint"], e["pending"]) == ("SHA256:aaa", "SHA256:bbb")


async def test_ssh_util_closes_a_connection_with_a_changed_key(monkeypatch):
    from server import ssh_util
    import asyncssh
    conn = _Conn("SHA256:new")

    async def fake_connect(*a, **k):
        return conn
    monkeypatch.setattr(asyncssh, "connect", fake_connect)
    ts._pins[("ssh", "n1:22")] = {"fingerprint": "SHA256:old", "first_seen": 1,
                                  "last_seen": 1, "pending": None, "pending_seen": None}
    with pytest.raises(ts.FingerprintMismatch):
        await ssh_util.connect("n1", "root", 22)
    assert conn.closed, "nothing may run on a connection that failed the pin"


# ── persistence ──────────────────────────────────────────────────────────

async def test_pins_survive_a_restart(db_path):
    ts.enable_persistence()
    await ts.check_ssh("n1", 22, _Conn("SHA256:aaa"))
    with pytest.raises(ts.FingerprintMismatch):
        await ts.check_ssh("n1", 22, _Conn("SHA256:bbb"))
    ts.reset()                                           # "restart"
    ts.enable_persistence()
    [e] = ts.entries()
    assert (e["fingerprint"], e["pending"]) == ("SHA256:aaa", "SHA256:bbb")
    assert await ts.accept("ssh", "n1:22")
    ts.reset(); ts.enable_persistence()
    assert ts.entries()[0]["fingerprint"] == "SHA256:bbb"
    assert await ts.forget("ssh", "n1:22")
    ts.reset(); ts.enable_persistence()
    assert ts.entries() == []


async def test_nothing_is_written_without_persistence(db_path):
    from server import db
    await ts.check_ssh("n1", 22, _Conn("SHA256:aaa"))
    with db.connect_sync() as c:
        assert c.execute("SELECT COUNT(*) FROM trusted_endpoints").fetchone()[0] == 0


# ── admin API ────────────────────────────────────────────────────────────

async def test_admin_routes_are_admin_gated():
    from server import trust_admin
    from tests.test_route_uniqueness import _role_of
    for _m, _p, h in trust_admin.ROUTES:
        assert _role_of(h) == "admin", _p


async def test_accept_endpoint_audits_old_and_new(db_path, monkeypatch):
    from server import audit, trust_admin
    rows = []

    async def fake_write(**kw):
        rows.append(kw)
    monkeypatch.setattr(audit, "write", fake_write)
    ts._pins[("tls", "10.0.0.5:8006")] = {"fingerprint": "aa" * 32, "first_seen": 1,
                                          "last_seen": 1, "pending": "bb" * 32,
                                          "pending_seen": 2}

    class Req:
        def __init__(self):
            self._d = {"user": None}

        def get(self, k, d=None):
            return self._d.get(k, d)

        def __getitem__(self, k):
            return self._d[k]

        async def json(self):
            return {"kind": "tls", "endpoint": "10.0.0.5:8006"}
    resp = await trust_admin.accept_handler(Req())
    assert resp.status == 200
    assert rows[-1]["action"] == "trust.accept"
    assert rows[-1]["params"] == {"old": "aa" * 32, "new": "bb" * 32}
    assert ts.entries()[0]["fingerprint"] == "bb" * 32


# ── no connection may bypass the pin ──────────────────────────────────────

def test_no_module_builds_an_unverified_tls_context():
    """An unverified context outside trust_store is a PVE connection that is
    neither CA-validated nor pinned. (auth_ldap's CERT_NONE is the operator's
    own LDAP `tls_verify: false` switch, not a PVE connection; the ESXi
    adapter has its own documented verify_ssl.)"""
    import re
    from pathlib import Path
    root = Path(__file__).resolve().parent.parent / "server"
    allowed = {"trust_store.py", "auth_ldap.py", "esxi.py"}
    offenders = []
    for p in sorted(root.rglob("*.py")):
        if p.name in allowed:
            continue
        code = "\n".join(ln.split("#", 1)[0] for ln in p.read_text().splitlines())
        if re.search(r"_create_unverified_context|CERT_NONE", code):
            offenders.append(p.name)
    assert not offenders, f"route these through trust_store.tls_ssl(): {offenders}"


async def test_remote_migrate_uses_the_pinned_fingerprint_and_refuses_a_changed_one(pve):
    from server import pdm_remote_migrate as rm
    fp = await rm.pinned_fingerprint("127.0.0.1", pve.port)
    assert fp.replace(":", "").lower() == _real_fp()
    ts._pins[("tls", f"127.0.0.1:{pve.port}")]["pending"] = "cd" * 32
    with pytest.raises(rm.FingerprintChanged):
        await rm.pinned_fingerprint("127.0.0.1", pve.port)
