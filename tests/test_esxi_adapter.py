"""ESXi / vCenter read-only adapter against a fake vSphere REST endpoint.

The fake speaks real TLS (the adapter hardcodes https) and mirrors the
`/rest/...` surface the adapter uses: session login with HTTP Basic at
`POST /rest/com/vmware/cis/session` answering `{"value": "<session-id>"}`,
reads authenticated by the `vmware-api-session-id` header, and 401 once a
session is invalidated. List endpoints answer with the `{"value": [...]}`
envelope (the newer `/api/...` surface answers bare lists; the adapter accepts
both, which is pinned below).
"""
from __future__ import annotations

import asyncio
import base64
import logging
import types

import pytest
from aiohttp import web

from server.clusters import ClusterType, make_adapter
from server.clusters import esxi as esxi_mod
from server.clusters.esxi import ESXiAdapter
from server.config import ClusterConfig, Config, PVEAuthConfig, PVENodeConfig
from tests._fake_tls import server_ssl_context


USER = "administrator@vsphere.local"
PASSWORD = "Vc-P@ss:with/colon"

HOSTS = [
    {"host": "host-10", "name": "esx01.example.invalid", "connection_state": "CONNECTED",
     "power_state": "POWERED_ON"},
    {"host": "host-11", "name": "esx02.example.invalid", "connection_state": "DISCONNECTED",
     "power_state": "POWERED_OFF"},
]
VMS = [
    {"vm": "vm-42", "name": "db01", "power_state": "POWERED_ON", "cpu_count": 4,
     "memory_size_MiB": 8192},
    {"vm": "vm-43", "name": "old", "power_state": "POWERED_OFF", "cpu_count": 1,
     "memory_size_MiB": 1024},
    {"vm": "vm-44", "name": "paused", "power_state": "SUSPENDED", "cpu_count": 2,
     "memory_size_MiB": 2048},
]
DATASTORES = [
    {"datastore": "datastore-11", "name": "ds-ssd", "type": "VMFS",
     "free_space": 400 * 2 ** 30, "capacity": 1000 * 2 ** 30},
    {"datastore": "datastore-12", "name": "nfs01", "type": "NFS",
     "free_space": 1, "capacity": 2},
]


class FakeVCenter:
    def __init__(self):
        self.logins: list[str | None] = []
        self.gets: list[tuple[str, str | None]] = []
        self.sessions: set[str] = set()
        self.accept_password = PASSWORD
        self.envelope = True
        self.server = None

    async def login(self, request):
        auth = request.headers.get("Authorization")
        self.logins.append(auth)
        if not auth or not auth.startswith("Basic "):
            return self._unauth()
        user, _, pw = base64.b64decode(auth[6:]).decode().partition(":")
        if pw != self.accept_password:
            return self._unauth()
        sid = f"sess-{len(self.logins)}"
        self.sessions.add(sid)
        return web.json_response({"value": sid})

    def _unauth(self):
        return web.json_response(
            {"type": "com.vmware.vapi.std.errors.unauthenticated",
             "value": {"messages": [], "error_type": "UNAUTHENTICATED"}}, status=401)

    def lister(self, rows):
        async def h(request):
            sid = request.headers.get("vmware-api-session-id")
            self.gets.append((request.path, sid))
            if sid not in self.sessions:
                return self._unauth()
            return web.json_response({"value": rows} if self.envelope else rows)
        return h

    def app(self):
        a = web.Application()
        a.router.add_post("/rest/com/vmware/cis/session", self.login)
        a.router.add_get("/rest/vcenter/host", self.lister(HOSTS))
        a.router.add_get("/rest/vcenter/vm", self.lister(VMS))
        a.router.add_get("/rest/vcenter/datastore", self.lister(DATASTORES))

        async def unavailable(_r):
            return web.json_response(
                {"type": "com.vmware.vapi.std.errors.service_unavailable"}, status=503)
        a.router.add_get("/rest/vcenter/cluster", unavailable)
        return a


@pytest.fixture
async def vc(aiohttp_server):
    f = FakeVCenter()
    f.server = await aiohttp_server(f.app(), ssl=server_ssl_context())
    return f


def cfg_for(vc, *, user=USER, password=PASSWORD, verify_ssl=False, **kw) -> ClusterConfig:
    return ClusterConfig(
        id="vc1", name=kw.pop("name", "vSphere Lab"), type="esxi",
        nodes=[PVENodeConfig(host="127.0.0.1", port=vc.server.port if vc else 443,
                             verify_ssl=verify_ssl)],
        auth=PVEAuthConfig(user=user, password=password),
        **kw,
    )


@pytest.fixture
async def adapter(vc):
    a = ESXiAdapter(cfg_for(vc))
    yield a
    await a.stop()


def basic_user(header: str) -> tuple[str, str]:
    u, _, p = base64.b64decode(header[6:]).decode().partition(":")
    return u, p


# ============================================================ factory

@pytest.mark.parametrize("t,expect", [
    ("esxi", ESXiAdapter), ("ESXi", ESXiAdapter), (" esxi ", ESXiAdapter),
    ("pve", type(None)), ("", type(None)), (None, type(None)),
])
def test_make_adapter(t, expect):
    c = ClusterConfig(id="x", type=t, nodes=[PVENodeConfig(host="203.0.113.5")])
    assert isinstance(make_adapter(c), expect)


def test_config_type_round_trips_to_adapter():
    cfg = Config.from_dict({"clusters": [
        {"id": "e", "type": "ESXi", "nodes": [{"host": "203.0.113.5", "port": 443}]}]})
    a = make_adapter(cfg.clusters[0])
    assert isinstance(a, ESXiAdapter)
    assert a.type is ClusterType.ESXI and a.type.value == "esxi"


def test_identity_and_initial_snapshot():
    a = ESXiAdapter(ClusterConfig(id="e1", type="esxi",
                                  nodes=[PVENodeConfig(host="203.0.113.5")]))
    assert (a.id, a.name) == ("e1", "e1"), "name falls back to id"
    s = a.snapshot()
    assert s["type"] == "esxi" and s["healthy"] is False
    assert s["nodes"] == {} and s["vms"] == {} and s["storages"] == {}


# ============================================================ poll

async def test_poll_once_shapes_snapshot(vc, adapter):
    got = []

    async def cb(cid, snap):
        got.append((cid, snap["summary"]["total_vms"]))
    adapter.add_callback(cb)
    await adapter._poll_once()

    assert len(vc.logins) == 1
    assert basic_user(vc.logins[0]) == (USER, PASSWORD), "password may contain ':'"
    assert [p for p, _ in vc.gets] == [
        "/rest/vcenter/host", "/rest/vcenter/vm", "/rest/vcenter/datastore"]
    assert all(sid == "sess-1" for _, sid in vc.gets)

    s = adapter.snapshot()
    assert (s["id"], s["name"], s["type"]) == ("vc1", "vSphere Lab", "esxi")
    assert s["healthy"] is True and s["error"] is None and s["last_update"] > 0
    assert s["nodes"] == {
        "host-10": {"node": "esx01.example.invalid", "status": "CONNECTED", "type": "esxi-host"},
        "host-11": {"node": "esx02.example.invalid", "status": "DISCONNECTED", "type": "esxi-host"},
    }
    assert s["vms"]["vm-42"] == {"vmid": "vm-42", "name": "db01", "status": "powered_on",
                                 "cpu": 4, "memory_mb": 8192, "type": "esxi-vm"}
    assert s["vms"]["vm-44"]["status"] == "suspended"
    assert s["storages"]["datastore-11"] == {
        "storage": "ds-ssd", "type": "VMFS", "free": 400 * 2 ** 30, "capacity": 1000 * 2 ** 30}
    assert s["summary"] == {"total_nodes": 2, "total_vms": 3, "running_vms": 1}
    assert got == [("vc1", 3)]


async def test_session_reused_across_polls(vc, adapter):
    await adapter._poll_once()
    await adapter._poll_once()
    assert len(vc.logins) == 1
    assert len(vc.gets) == 6


async def test_bare_list_responses_accepted(vc, adapter):
    vc.envelope = False
    await adapter._poll_once()
    s = adapter.snapshot()
    assert set(s["vms"]) == {"vm-42", "vm-43", "vm-44"}
    assert set(s["storages"]) == {"datastore-11", "datastore-12"}


async def test_expired_session_reauths_once(vc, adapter):
    await adapter._poll_once()
    vc.sessions.clear()                 # vCenter expired the session
    await adapter._poll_once()
    assert len(vc.logins) == 2
    # first GET after expiry is 401 with the old id, then retried with the new one
    assert vc.gets[3] == ("/rest/vcenter/host", "sess-1")
    assert vc.gets[4] == ("/rest/vcenter/host", "sess-2")
    assert adapter.snapshot()["healthy"] is True


async def test_non_401_error_raises_without_relogin(vc, adapter):
    await adapter._poll_once()
    with pytest.raises(RuntimeError, match=r"esxi GET /rest/vcenter/cluster http 503"):
        await adapter._get("/rest/vcenter/cluster")
    assert len(vc.logins) == 1, "only a 401 justifies a re-login"


async def test_callback_error_does_not_fail_poll(vc, adapter):
    async def bad(cid, snap):
        raise RuntimeError("consumer bug")
    adapter.add_callback(bad)
    await adapter._poll_once()
    assert adapter.snapshot()["healthy"] is True


# ============================================================ auth failures

async def test_wrong_password(vc, caplog):
    a = ESXiAdapter(cfg_for(vc, password="Wr0ng-S3cret-Value"))
    caplog.set_level(logging.DEBUG, logger="server.clusters.esxi")
    try:
        with pytest.raises(RuntimeError, match="esxi auth http 401"):
            await a._poll_once()
        assert a._consecutive_auth_fail == 1
        assert vc.gets == [], "no reads without a session"
    finally:
        await a.stop()
    token = base64.b64encode(f"{USER}:Wr0ng-S3cret-Value".encode()).decode()
    assert "Wr0ng-S3cret-Value" not in caplog.text
    assert token not in caplog.text


async def test_missing_password_fails_before_any_request(vc):
    a = ESXiAdapter(cfg_for(vc, password=""))
    try:
        with pytest.raises(RuntimeError, match="missing auth.password"):
            await a._poll_once()
    finally:
        await a.stop()
    assert vc.logins == [] and vc.gets == []


async def test_login_without_session_value_rejected(aiohttp_server):
    async def login(_r):
        return web.json_response({"value": None})
    app = web.Application()
    app.router.add_post("/rest/com/vmware/cis/session", login)
    srv = await aiohttp_server(app, ssl=server_ssl_context())
    a = ESXiAdapter(ClusterConfig(id="e", type="esxi",
                                  nodes=[PVENodeConfig(host="127.0.0.1", port=srv.port)],
                                  auth=PVEAuthConfig(user=USER, password="x")))
    try:
        with pytest.raises(RuntimeError, match="no session id"):
            await a._login()
    finally:
        await a.stop()


async def test_session_id_not_logged(vc, adapter, caplog):
    caplog.set_level(logging.DEBUG, logger="server.clusters.esxi")
    await adapter._poll_once()
    assert "sess-1" not in caplog.text


# ============================================================ poll loop

def _fake_asyncio(sleeps: list, adapter: ESXiAdapter, stop_after: int):
    async def sleep(interval):
        sleeps.append(interval)
        if len(sleeps) >= stop_after:
            adapter._running = False
    return types.SimpleNamespace(sleep=sleep, CancelledError=asyncio.CancelledError)


async def test_poll_loop_backs_off_after_three_auth_failures(vc, monkeypatch):
    a = ESXiAdapter(cfg_for(vc, password="nope", poll_interval=5.0))
    sleeps: list[float] = []
    monkeypatch.setattr(esxi_mod, "asyncio", _fake_asyncio(sleeps, a, 4))
    a._running = True
    try:
        await a._poll_loop()
    finally:
        await a.stop()
    assert sleeps == [10.0, 10.0, 60.0, 60.0]
    s = a.snapshot()
    assert s["healthy"] is False and "401" in s["error"]


async def test_poll_loop_normal_interval_and_recovery(vc, monkeypatch):
    a = ESXiAdapter(cfg_for(vc, poll_interval=7.0))
    sleeps: list[float] = []
    monkeypatch.setattr(esxi_mod, "asyncio", _fake_asyncio(sleeps, a, 2))
    a._running = True
    try:
        await a._poll_loop()
    finally:
        await a.stop()
    assert sleeps == [7.0, 7.0]
    assert a.snapshot()["healthy"] is True


def test_poll_interval_floor():
    a = ESXiAdapter(ClusterConfig(id="e", type="esxi", poll_interval=0.5,
                                  nodes=[PVENodeConfig(host="203.0.113.5")]))
    assert a._poll_interval == 5.0


# ============================================================ lifecycle + TLS

async def test_start_is_idempotent_and_stop_cleans_up(vc, caplog):
    a = ESXiAdapter(cfg_for(vc, verify_ssl=False))
    caplog.set_level(logging.WARNING, logger="server.clusters.esxi")
    await a.start()
    task = a._poll_task
    await a.start()
    assert a._poll_task is task
    assert "TLS verification DISABLED" in caplog.text and "vc1" in caplog.text
    for _ in range(50):
        if a.snapshot()["healthy"]:
            break
        await asyncio.sleep(0.02)
    assert a.snapshot()["healthy"] is True
    await a.stop()
    assert a._poll_task is None and a._http is None and a._session_id is None
    assert task.done()


async def test_verify_ssl_rejects_untrusted_certificate(vc):
    a = ESXiAdapter(cfg_for(vc, verify_ssl=True))
    try:
        with pytest.raises(Exception) as ei:
            await a._poll_once()
    finally:
        await a.stop()
    assert "certificate" in str(ei.value).lower()
    assert vc.logins == [], "credentials must not be sent over an unverified channel"


async def test_no_tls_warning_when_verifying(vc, caplog):
    a = ESXiAdapter(cfg_for(vc, verify_ssl=True))
    caplog.set_level(logging.WARNING, logger="server.clusters.esxi")
    await a.start()
    await a.stop()
    assert "TLS verification DISABLED" not in caplog.text


# ============================================================ known bugs

async def test_default_user_is_vsphere_administrator(vc):
    cfg = Config.from_dict({"clusters": [{
        "id": "vc1", "type": "esxi",
        "nodes": [{"host": "127.0.0.1", "port": vc.server.port}],
        "auth": {"password": PASSWORD}}]})
    a = ESXiAdapter(cfg.clusters[0])
    try:
        await a._login()
    finally:
        await a.stop()
    assert basic_user(vc.logins[0])[0] == "administrator@vsphere.local"


@pytest.fixture
def isolated_secret_store(tmp_path, db_path):
    """secret_store reads its master-key path at import time, so pointing it
    at a throwaway key means a reload — and a second reload afterwards so the
    module does not keep this test's path for whoever runs next."""
    import importlib
    from server import secret_store
    mp = pytest.MonkeyPatch()
    mp.setenv("JT_PROXENSE_MASTER_KEY_PATH", str(tmp_path / "master.key"))
    importlib.reload(secret_store)
    yield secret_store
    mp.undo()
    importlib.reload(secret_store)


async def test_password_survives_boot_migration_to_secret_store(
        vc, isolated_secret_store, tmp_path, monkeypatch):
    from server import config as cfg_mod
    secret_store = isolated_secret_store
    monkeypatch.setattr(cfg_mod, "CONFIG_FILE", str(tmp_path / "config.yaml"))
    cfg = Config(clusters=[cfg_for(vc)])
    monkeypatch.setattr(cfg_mod, "_current_config", cfg)

    secret_store.ensure_master_key()
    assert secret_store.migrate_from_yaml(actor="test") == [("vc1", "ok")]

    a = ESXiAdapter(cfg.clusters[0])
    try:
        await a._login()
    finally:
        await a.stop()
    assert len(vc.logins) == 1


# The default stays False on purpose (the shared node config defaults to it
# because PVE ships self-signed certs, and flipping it would cut off every ESXi
# connection that relies on that); the module docs now say so, and start()
# warns. This pins the behaviour the docs describe.
def test_esxi_tls_default_matches_the_documented_one():
    cfg = Config.from_dict({"clusters": [{
        "id": "vc1", "type": "esxi", "nodes": [{"host": "203.0.113.5", "port": 443}],
        "auth": {"user": USER, "password": "x"}}]})
    assert ESXiAdapter(cfg.clusters[0])._verify_ssl() is False
