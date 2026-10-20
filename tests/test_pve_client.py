"""PVEClient against a fake pveproxy speaking real TLS.

Everything here asserts on what reaches the wire (method, path, query, headers,
form body) or on what the client returns — never on the client's source text
(CLAUDE.md #15). The fake answers with PVE's `{"data": ...}` envelope and
PVE-shaped error bodies.
"""
from __future__ import annotations

import asyncio
import logging
import time
from contextlib import asynccontextmanager

import aiohttp
import pytest
from aiohttp import web

from server import pve_throttle
from server.config import PVEAuthConfig, PVENodeConfig
from server.pve_client import PVEClient
from tests._fake_tls import server_ssl_context


TOKEN_UUID = "0b1c2d3e-4f50-6172-8394-a5b6c7d8e9f0"   # synthetic, not a real token


def pve_error(status: int, message: str) -> web.Response:
    """pveproxy's error shape for /api2/json: the message is the HTTP reason
    phrase AND is echoed in the body as `message` (with a trailing newline),
    `data` is null."""
    return web.json_response({"data": None, "message": message + "\n"},
                             status=status, reason=message)


class FakePVE:
    """Minimal pveproxy stand-in. `routes[(METHOD, path)]` is either a JSON-able
    payload (wrapped as {"data": payload}) or a coroutine fn(request) that
    returns a web.Response. Unrouted paths answer 501 like pveproxy does for a
    method that does not exist."""

    def __init__(self):
        self.routes: dict = {}
        self.requests: list[dict] = []
        self.in_flight = 0
        self.max_in_flight = 0
        self.delay = 0.0
        self.server = None

    async def handler(self, request: web.Request) -> web.StreamResponse:
        body = {}
        if request.method in ("POST", "PUT", "DELETE") and request.can_read_body:
            body = dict(await request.post())
        rec = {
            "method": request.method,
            "path": request.path,
            "raw_path": request.raw_path,
            "query": {k: request.query.getall(k) for k in request.query.keys()},
            "headers": dict(request.headers),
            "body": body,
        }
        self.requests.append(rec)
        self.in_flight += 1
        self.max_in_flight = max(self.max_in_flight, self.in_flight)
        try:
            if self.delay:
                await asyncio.sleep(self.delay)
            key = (request.method, request.path)
            if key not in self.routes:
                return pve_error(
                    501, f"Method '{request.method} {request.path}' not implemented")
            spec = self.routes[key]
            if callable(spec):
                return await spec(request)
            return web.json_response({"data": spec})
        finally:
            self.in_flight -= 1

    def app(self) -> web.Application:
        a = web.Application()
        a.router.add_route("*", "/{tail:.*}", self.handler)
        return a

    def api(self, path: str) -> str:
        return "/api2/json" + path


@pytest.fixture
def fresh_throttle(monkeypatch):
    """A private limiter per test: the module singleton's semaphores would
    otherwise bind to one test's event loop and poison the next. min_gap 0
    keeps the suite fast; tests that care about limits build their own."""
    t = pve_throttle._PVEThrottle(max_concurrent_per_host=4, min_gap_ms=0)
    monkeypatch.setattr(pve_throttle, "throttle", t)
    return t


@pytest.fixture
async def pve(aiohttp_server, fresh_throttle):
    fake = FakePVE()
    fake.server = await aiohttp_server(fake.app(), ssl=server_ssl_context())
    return fake


def _client(fake: FakePVE, *, token=True, extra_nodes=(), **kw) -> PVEClient:
    auth = PVEAuthConfig(user="root@pam",
                         token_name="jtp" if token else "",
                         token_value=TOKEN_UUID if token else "")
    nodes = [PVENodeConfig(host="127.0.0.1", port=fake.server.port, priority=0)]
    nodes += list(extra_nodes)
    return PVEClient(nodes=nodes, auth=auth, timeout=5.0, **kw)


@pytest.fixture
async def client(pve):
    c = _client(pve)
    yield c
    await c.close()


# ------------------------------------------------------------ auth + envelope

async def test_api_token_header_is_exact_pve_format(pve, client):
    pve.routes[("GET", pve.api("/version"))] = {"version": "9.0.10", "release": "9.0"}
    out = await client.get_version()
    assert out == {"version": "9.0.10", "release": "9.0"}, "must unwrap {data: ...}"
    hdr = pve.requests[-1]["headers"].get("Authorization")
    assert hdr == f"PVEAPIToken=root@pam!jtp={TOKEN_UUID}"


async def test_no_token_sends_no_authorization_header(pve):
    c = _client(pve, token=False)
    try:
        pve.routes[("GET", pve.api("/nodes"))] = []
        await c.get_nodes()
        assert "Authorization" not in pve.requests[-1]["headers"]
    finally:
        await c.close()


async def test_response_without_data_key_returned_whole(pve, client):
    async def raw(_req):
        return web.json_response({"errors": None, "success": 1})
    pve.routes[("GET", pve.api("/cluster/status"))] = raw
    assert await client.get_cluster_status() == {"errors": None, "success": 1}


# ------------------------------------------------------------ request building

async def test_node_and_guest_paths(pve, client):
    pve.routes[("GET", pve.api("/nodes/pve1/qemu/100/status/current"))] = {"status": "running"}
    pve.routes[("GET", pve.api("/nodes/pve1/lxc/200/config"))] = {"hostname": "ct"}
    assert (await client.get_vm_status("pve1", 100))["status"] == "running"
    assert (await client.get_container_config("pve1", 200))["hostname"] == "ct"
    assert [r["path"] for r in pve.requests] == [
        "/api2/json/nodes/pve1/qemu/100/status/current",
        "/api2/json/nodes/pve1/lxc/200/config",
    ]
    assert all(r["method"] == "GET" for r in pve.requests)


async def test_cluster_resources_type_filter_only_when_given(pve, client):
    pve.routes[("GET", pve.api("/cluster/resources"))] = []
    await client.get_cluster_resources()
    await client.get_cluster_resources("vm")
    assert pve.requests[0]["query"] == {}
    assert pve.requests[1]["query"] == {"type": ["vm"]}


async def test_rrddata_params(pve, client):
    pve.routes[("GET", pve.api("/nodes/pve1/rrddata"))] = [{"time": 1}]
    await client.get_node_rrddata("pve1", "day", "MAX")
    assert pve.requests[-1]["query"] == {"timeframe": ["day"], "cf": ["MAX"]}


# /cluster/tasks rejects ANY query parameter with 400 (v0.8.12 regression).
async def _strict_cluster_tasks(request):
    if request.query:
        return web.json_response(
            {"data": None, "errors": {k: "property is not defined in schema and "
                                         "the schema does not allow additional properties"
                                      for k in request.query}},
            status=400)
    return web.json_response({"data": [
        {"upid": "UPID:pve1:1:1:1:qmigrate:100:root@pam:", "type": "qmigrate",
         "id": "100", "node": "pve1", "starttime": 30},
        {"upid": "UPID:pve1:2:2:2:vzdump::root@pam:", "type": "vzdump", "id": "",
         "node": "pve1", "starttime": 20, "endtime": 25, "status": "OK"},
        {"upid": "UPID:pve2:3:3:3:qmstart:101:root@pam:", "type": "qmstart",
         "id": "101", "node": "pve2", "starttime": 10},
        {"upid": "UPID:pve2:4:4:4:aptupdate::root@pam:", "type": "aptupdate",
         "id": "", "node": "pve2", "starttime": 5, "endtime": 6, "status": "stopped"},
    ]})


async def test_cluster_tasks_sends_no_query_params_and_slices_client_side(pve, client):
    pve.routes[("GET", pve.api("/cluster/tasks"))] = _strict_cluster_tasks
    tasks = await client.get_cluster_tasks(running=False, limit=2)
    assert pve.requests[-1]["query"] == {}
    assert [t["type"] for t in tasks] == ["qmigrate", "vzdump"]


async def test_cluster_tasks_running_filter(pve, client):
    pve.routes[("GET", pve.api("/cluster/tasks"))] = _strict_cluster_tasks
    tasks = await client.get_cluster_tasks(running=True, limit=100)
    assert pve.requests[-1]["query"] == {}
    assert [t["type"] for t in tasks] == ["qmigrate", "qmstart"]


async def test_cluster_tasks_error_degrades_to_empty(pve, client):
    async def boom(_r):
        return web.json_response({"data": None}, status=500)
    pve.routes[("GET", pve.api("/cluster/tasks"))] = boom
    assert await client.get_cluster_tasks() == []


async def test_node_tasks_limit_zero_means_all(pve, client):
    pve.routes[("GET", pve.api("/nodes/pve1/tasks"))] = [{"upid": str(i)} for i in range(5)]
    assert len(await client.get_node_tasks("pve1", limit=0)) == 5
    assert len(await client.get_node_tasks("pve1", limit=3)) == 3


async def test_task_status_upid_is_one_path_segment(pve, client):
    upid = "UPID:pve1:0000ABCD:0011EF22:66F1A2B3:qmigrate:100:root@pam:"
    path = pve.api(f"/nodes/pve1/tasks/{upid}/status")
    pve.routes[("GET", path)] = {"status": "running", "upid": upid}
    out = await client.get_task_status("pve1", upid)
    assert out["upid"] == upid
    assert pve.requests[-1]["path"] == path


async def test_task_status_failure_is_empty_dict(pve, client):
    assert await client.get_task_status("pve1", "UPID:x:") == {}


async def test_task_log_params_and_non_list_guard(pve, client):
    upid = "UPID:pve1:1:1:1:qmigrate:100:root@pam:"
    path = pve.api(f"/nodes/pve1/tasks/{upid}/log")
    pve.routes[("GET", path)] = [{"n": 1, "t": "line"}]
    assert await client.get_task_log("pve1", upid, start=5, limit=7) == [{"n": 1, "t": "line"}]
    assert pve.requests[-1]["query"] == {"start": ["5"], "limit": ["7"]}
    pve.routes[("GET", path)] = {"unexpected": "shape"}
    assert await client.get_task_log("pve1", upid) == []


async def test_stop_task_is_delete_on_encoded_upid(pve, client):
    upid = "UPID:pve1:1:1:1:vzdump::root@pam:"
    path = pve.api(f"/nodes/pve1/tasks/{upid}")
    pve.routes[("DELETE", path)] = None
    await client.stop_task("pve1", upid)
    assert pve.requests[-1]["method"] == "DELETE"
    assert pve.requests[-1]["path"] == path


async def test_vm_migrate_form_body(pve, client):
    path = pve.api("/nodes/pve1/qemu/100/migrate")
    pve.routes[("POST", path)] = "UPID:pve1:1:1:1:qmigrate:100:root@pam:"
    upid = await client.vm_migrate("pve1", 100, "pve2", online=True,
                                   with_local_disks=True,
                                   migration_network="203.0.113.0/24", bwlimit=5000)
    assert upid.startswith("UPID:")
    assert pve.requests[-1]["body"] == {
        "target": "pve2", "online": "1", "with-local-disks": "1",
        "migration_network": "203.0.113.0/24", "bwlimit": "5000",
    }
    await client.vm_migrate("pve1", 100, "pve2", online=False)
    assert pve.requests[-1]["body"] == {"target": "pve2", "online": "0"}


async def test_trigger_backup_omits_compress_when_none(pve, client):
    path = pve.api("/nodes/pve1/vzdump")
    pve.routes[("POST", path)] = "UPID:pve1:1:1:1:vzdump::root@pam:"
    await client.trigger_backup("pve1", vmid=100, storage="pbs1", compress=None,
                                protected=1)
    assert pve.requests[-1]["body"] == {"vmid": "100", "storage": "pbs1",
                                        "mode": "snapshot", "protected": "1"}
    await client.trigger_backup("pve1", vmid="100,101", storage="nfs", compress="zstd")
    assert pve.requests[-1]["body"]["compress"] == "zstd"
    assert pve.requests[-1]["body"]["vmid"] == "100,101"


async def test_vm_delete_params_only_when_set(pve, client):
    path = pve.api("/nodes/pve1/qemu/100")
    pve.routes[("DELETE", path)] = "UPID:x"
    await client.vm_delete("pve1", 100)
    assert pve.requests[-1]["query"] == {}
    await client.vm_delete("pve1", 100, purge=True, skiplock=True)
    assert pve.requests[-1]["query"] == {"purge": ["1"], "skiplock": ["1"]}


async def test_vncproxy_form(pve, client):
    path = pve.api("/nodes/pve1/qemu/100/vncproxy")
    pve.routes[("POST", path)] = {"ticket": "PVEVNC:x", "port": "5900"}
    await client.vm_vncproxy("pve1", 100)
    assert pve.requests[-1]["body"] == {"websocket": "1", "generate-password": "0"}


# ------------------------------------------------------------ ceph pool delete

async def test_ceph_pool_delete_uses_singular_path(pve, client):
    path = pve.api("/nodes/pve1/ceph/pool/rbd")
    pve.routes[("DELETE", path)] = "UPID:pve1:1:1:1:cephdestroypool:rbd:root@pam:"
    out = await client.delete_ceph_pool("pve1", "rbd", remove_storages=True)
    assert out.startswith("UPID:")
    assert [r["path"] for r in pve.requests] == [path]
    assert pve.requests[0]["query"] == {"remove_storages": ["1"]}


async def test_ceph_pool_delete_falls_back_to_plural_on_missing_path(pve, client):
    plural = pve.api("/nodes/pve1/ceph/pools/rbd")
    pve.routes[("DELETE", plural)] = "UPID:old"
    # singular is unrouted -> 501 "not implemented" (what an old PVE says)
    assert await client.delete_ceph_pool("pve1", "rbd") == "UPID:old"
    assert [r["path"] for r in pve.requests] == [
        pve.api("/nodes/pve1/ceph/pool/rbd"), plural]


async def test_ceph_pool_delete_real_failure_does_not_retry(pve, client):
    async def busy(_r):
        return pve_error(500, "pool 'rbd' is in use by storage")
    pve.routes[("DELETE", pve.api("/nodes/pve1/ceph/pool/rbd"))] = busy
    with pytest.raises(aiohttp.ClientResponseError) as ei:
        await client.delete_ceph_pool("pve1", "rbd")
    assert ei.value.status == 500
    assert len(pve.requests) == 1, "must not retry the plural path on a real failure"


async def test_ceph_reads_swallow_errors(pve, client):
    assert await client.get_ceph_status("pve1") == {}
    assert await client.get_ceph_osd("pve1") == []
    assert await client.get_ceph_pools("pve1") == []


# ------------------------------------------------------------ errors + health

async def test_http_error_raises_and_marks_node_unhealthy(pve, client):
    async def denied(_r):
        return pve_error(403, "Permission check failed (/nodes, Sys.Audit)")
    pve.routes[("GET", pve.api("/nodes"))] = denied
    with pytest.raises(aiohttp.ClientResponseError) as ei:
        await client.get_nodes()
    assert ei.value.status == 403
    h = client.get_health_status()[f"127.0.0.1:{pve.server.port}"]
    assert h["healthy"] is False
    assert h["consecutive_failures"] == 1
    assert "403" in h["error_message"]


async def test_success_resets_failure_count(pve, client):
    calls = {"n": 0}

    async def flaky(_r):
        calls["n"] += 1
        if calls["n"] == 1:
            return web.json_response({"data": None}, status=500)
        return web.json_response({"data": {"version": "9"}})
    pve.routes[("GET", pve.api("/version"))] = flaky
    with pytest.raises(aiohttp.ClientResponseError):
        await client.get_version()
    await client.get_version()
    h = client.get_health_status()[f"127.0.0.1:{pve.server.port}"]
    assert h["healthy"] is True and h["consecutive_failures"] == 0
    assert h["last_check"] > 0


@pytest.mark.parametrize("reason,benign", [
    ("binary not installed: /usr/bin/ceph-mon", True),
    ("pveceph configuration not initialized", True),
    ("Ceph not installed on this node", True),
    ("got timeout", False),
])
async def test_benign_500_downgraded_to_debug(pve, client, caplog, reason, benign):
    async def fail(_r):
        return pve_error(500, reason)
    pve.routes[("GET", pve.api("/nodes/pve1/ceph/status"))] = fail
    caplog.set_level(logging.DEBUG, logger="server.pve_client")
    with pytest.raises(aiohttp.ClientResponseError):
        await client._request("GET", "/nodes/pve1/ceph/status")
    recs = [r for r in caplog.records
            if r.name == "server.pve_client" and "PVE request failed" in r.getMessage()]
    assert len(recs) == 1
    assert recs[0].levelno == (logging.DEBUG if benign else logging.WARNING)


async def test_no_nodes_configured_raises():
    c = PVEClient(nodes=[], auth=PVEAuthConfig())
    with pytest.raises(RuntimeError):
        await c._request("GET", "/version")
    assert c.current_node is None


# ------------------------------------------------------------ failover

@pytest.fixture
async def pve2(aiohttp_server):
    fake = FakePVE()
    fake.server = await aiohttp_server(fake.app(), ssl=server_ssl_context())
    return fake


async def test_failover_after_max_consecutive_failures(pve, pve2):
    # pve (primary) is broken; pve2 is fine. Both run on 127.0.0.1 with
    # different ports, which is exactly how node_health is keyed.
    async def down(_r):
        return web.json_response({"data": None}, status=500)
    pve.routes[("GET", pve.api("/version"))] = down
    pve2.routes[("GET", pve2.api("/version"))] = {"version": "from-2"}
    secondary = PVENodeConfig(host="127.0.0.1", port=pve2.server.port, priority=5)
    c = _client(pve, extra_nodes=[secondary], max_consecutive_failures=3)
    try:
        for i in range(3):
            assert c.current_node.port == pve.server.port, f"switched too early ({i})"
            with pytest.raises(aiohttp.ClientResponseError):
                await c.get_version()
        assert c.current_node.port == pve2.server.port
        assert (await c.get_version()) == {"version": "from-2"}
    finally:
        await c.close()


async def test_nodes_sorted_by_priority(pve, pve2):
    low = PVENodeConfig(host="127.0.0.1", port=pve2.server.port, priority=-1)
    c = _client(pve, extra_nodes=[low])
    try:
        assert c.current_node.port == pve2.server.port
    finally:
        await c.close()


async def test_failover_stays_put_when_all_unhealthy():
    a = PVENodeConfig(host="203.0.113.1", port=8006)
    b = PVENodeConfig(host="203.0.113.2", port=8006)
    c = PVEClient(nodes=[a, b], auth=PVEAuthConfig(), max_consecutive_failures=3)
    for h in c.node_health.values():
        h.consecutive_failures = 5
        h.healthy = False
    await c._failover()
    assert c.current_node.host == "203.0.113.1"


def test_steer_away_from():
    a = PVENodeConfig(host="203.0.113.1", port=8006, priority=0)
    b = PVENodeConfig(host="203.0.113.2", port=8006, priority=1)
    c = PVEClient(nodes=[a, b], auth=PVEAuthConfig(), max_consecutive_failures=3)
    assert c.steer_away_from("203.0.113.9") is False, "not the active node"
    assert c.steer_away_from("203.0.113.1") is True
    assert c.current_node.host == "203.0.113.2"
    # nowhere healthy to go
    c.node_health["203.0.113.1:8006"].consecutive_failures = 9
    assert c.steer_away_from("203.0.113.2") is False
    assert c.current_node.host == "203.0.113.2"
    single = PVEClient(nodes=[a], auth=PVEAuthConfig())
    assert single.steer_away_from("203.0.113.1") is False


# ------------------------------------------------------------ throttle

async def test_every_request_goes_through_throttle_for_its_host(pve, monkeypatch):
    seen: list[str] = []
    real = pve_throttle._PVEThrottle(min_gap_ms=0)

    class Recording:
        @asynccontextmanager
        async def acquire(self, host):
            seen.append(host)
            async with real.acquire(host):
                yield
    monkeypatch.setattr(pve_throttle, "throttle", Recording())
    pve.routes[("GET", pve.api("/version"))] = {}
    c = _client(pve)
    try:
        await c.get_version()
        with pytest.raises(aiohttp.ClientResponseError):
            await c._request("GET", "/nope")
    finally:
        await c.close()
    assert seen == ["127.0.0.1", "127.0.0.1"]


@pytest.mark.parametrize("limit", [1, 2])
async def test_throttle_caps_in_flight_requests(pve, monkeypatch, limit):
    monkeypatch.setattr(pve_throttle, "throttle",
                        pve_throttle._PVEThrottle(max_concurrent_per_host=limit, min_gap_ms=0))
    pve.routes[("GET", pve.api("/version"))] = {}
    pve.delay = 0.03
    c = _client(pve)
    try:
        await asyncio.gather(*(c.get_version() for _ in range(6)))
    finally:
        await c.close()
    assert pve.max_in_flight == limit


async def test_throttle_min_gap_staggers_starts():
    t = pve_throttle._PVEThrottle(max_concurrent_per_host=8, min_gap_ms=20)
    starts: list[float] = []

    async def one():
        async with t.acquire("h"):
            starts.append(time.monotonic())
    await asyncio.gather(*(one() for _ in range(4)))
    gaps = [b - a for a, b in zip(starts, starts[1:])]
    assert all(g >= 0.018 for g in gaps), gaps


async def test_throttle_empty_host_is_passthrough():
    t = pve_throttle._PVEThrottle(max_concurrent_per_host=1, min_gap_ms=0)
    async with t.acquire(""):
        async with t.acquire(""):
            pass
    assert t.stats()["tracked_hosts"] == []


def test_throttle_configure_clamps():
    t = pve_throttle._PVEThrottle()
    t.configure(max_concurrent_per_host=0, min_gap_ms=-5)
    assert t.stats()["max_concurrent_per_host"] == 1
    assert t.stats()["min_gap_ms"] == 0


# ------------------------------------------------------------ ticket exchange

async def test_acquire_ticket_posts_credentials_without_api_token(pve, client):
    async def ticket(request):
        form = await request.post()
        if form.get("password") != "s3cret":
            return pve_error(401, "authentication failure")
        return web.json_response({"data": {
            "ticket": "PVE:root@pam:66F1A2B3::aB+c/d=e==",
            "CSRFPreventionToken": "66F1A2B3:Zm9v",
            "username": "root@pam",
        }})
    pve.routes[("POST", pve.api("/access/ticket"))] = ticket
    before = int(time.time())
    out = await client.acquire_ticket("root@pam", "s3cret")
    assert out["ticket"] == "PVE:root@pam:66F1A2B3::aB+c/d=e=="
    assert out["csrf"] == "66F1A2B3:Zm9v"
    assert before + 110 * 60 <= out["expires_at"] <= int(time.time()) + 110 * 60
    req = pve.requests[-1]
    assert req["body"] == {"username": "root@pam", "password": "s3cret"}
    assert "Authorization" not in req["headers"], "API token must not ride along"

    with pytest.raises(RuntimeError, match="HTTP 401"):
        await client.acquire_ticket("root@pam", "wrong")


async def test_acquire_ticket_without_ticket_in_reply_raises(pve, client):
    pve.routes[("POST", pve.api("/access/ticket"))] = {"username": "root@pam"}
    with pytest.raises(RuntimeError, match="no ticket"):
        await client.acquire_ticket("root@pam", "x")


async def test_acquire_ticket_verify_ssl_rejects_self_signed(pve):
    node = PVENodeConfig(host="127.0.0.1", port=pve.server.port, verify_ssl=True)
    c = PVEClient(nodes=[node], auth=PVEAuthConfig())
    with pytest.raises(aiohttp.ClientConnectorCertificateError):
        await c.acquire_ticket("root@pam", "x")
    assert pve.requests == []
