"""HA awareness and pre-flight for the batch host upgrade orchestrator.

The orchestrator was the ONE path that moved guests without asking
migrate_guard whether the move was legal. PVE accepts a migration forbidden by
a STRICT HA node-affinity rule and fails it later inside ha-manager
(CLAUDE.md #22), so an unfiltered plan strands half a node's workload on the
way out and then correctly refuses to reboot -- leaving the operator to migrate
it back by hand.

It also had no concept of an HA-managed guest. PVE has a mechanism built for
this exact window (`ha-manager crm-command node-maintenance enable`), which
moves managed services off, remembers where they came from, and returns them.
Migrating them ourselves fights the HA manager.

Everything here is exercised against fakes; nothing touches a node.
"""
from __future__ import annotations

import types

import pytest

from server import host_upgrade as hu

GIB = 1024 ** 3


# ─────────────────────────────────────────────────── sid parsing

@pytest.mark.parametrize("sid,expect", [
    ("vm:147", ("qemu", 147)),
    ("ct:100", ("lxc", 100)),
    ("VM:1", None),          # PVE writes lower case; be strict rather than guess
    ("qemu:147", None),      # our vocabulary, not PVE's -- must not round-trip
    ("vm:", None),
    ("", None),
    ("garbage", None),
])
def test_split_sid(sid, expect):
    """PVE's HA ids use vm:/ct:; our cache uses qemu/lxc. Getting this mapping
    wrong would silently classify every guest as non-HA and put us straight
    back into fighting the HA manager."""
    assert hu._split_sid(sid) == expect


# ─────────────────────────────────────────────── legality in the planner

def test_plan_respects_legal_targets():
    """The roomiest target is not always a permitted one."""
    free = {"a": 100 * GIB, "b": 10 * GIB}
    plan, shortfall = hu._plan_evacuation(
        free, [(1, 4 * GIB)], allowed={1: {"b"}})
    assert shortfall is None
    assert plan == [(1, "b")], "planner ignored the allowed-target set"


def test_plan_reports_a_guest_with_no_legal_target():
    """Better to refuse the host than to fire a migration ha-manager will
    reject after the fact."""
    free = {"a": 100 * GIB}
    plan, shortfall = hu._plan_evacuation(
        free, [(7, 1 * GIB)], allowed={7: set()})
    assert plan == []
    assert shortfall is not None
    assert "no legal target" in shortfall
    assert "7" in shortfall


def test_plan_distinguishes_no_room_from_no_permission():
    """Two different operator actions: add capacity vs. fix an HA rule. The
    message has to say which."""
    free = {"a": 1 * GIB}
    _p, room = hu._plan_evacuation(free, [(1, 8 * GIB)], allowed={1: {"a"}})
    _p, perm = hu._plan_evacuation(free, [(1, 8 * GIB)], allowed={1: set()})
    # Both mention "legal target"; what separates them is what the operator
    # must go and change.
    assert "only has" in room and "GiB free" in room
    assert "has no legal target" in perm
    assert "HA rules" in perm and "storage" in perm
    assert "only has" not in perm


def test_plan_without_allowed_map_is_unchanged():
    """`allowed=None` must behave exactly as before -- the parameter is
    additive, and the existing planner tests still describe the contract."""
    free = {"a": 10 * GIB, "b": 10 * GIB}
    guests = [(1, 6 * GIB), (2, 6 * GIB)]
    assert hu._plan_evacuation(free, guests) == \
        hu._plan_evacuation(free, guests, None)


def test_legal_but_full_target_falls_through_to_shortfall():
    """A guest allowed only onto a node that cannot hold it is a shortfall, not
    a silent placement somewhere else."""
    free = {"a": 1 * GIB, "b": 100 * GIB}
    plan, shortfall = hu._plan_evacuation(
        free, [(1, 8 * GIB)], allowed={1: {"a"}})
    assert plan == []
    assert shortfall and "roomiest legal target" in shortfall


# ─────────────────────────────────────────────── HA service discovery

class _FakeClient:
    def __init__(self, rows=None, raise_on_status=False):
        self._rows = rows or []
        self._raise = raise_on_status

    async def list_ha_status(self):
        if self._raise:
            raise RuntimeError("403 no Sys.Audit")
        return self._rows


def _cluster_with(rows=None, **kw):
    return types.SimpleNamespace(
        client=_FakeClient(rows, **kw),
        cache=types.SimpleNamespace(nodes={}, vms={}))


@pytest.mark.asyncio
async def test_ha_services_on_filters_by_node_and_type():
    """The payload mixes quorum / master / fencing / lrm / service rows; only
    `service` rows name a guest."""
    rows = [
        {"type": "quorum", "id": "quorum", "node": "host-108", "quorate": 1},
        {"type": "master", "id": "master", "node": "host-111"},
        {"type": "fencing", "id": "fencing", "node": "host-111"},
        {"type": "lrm", "id": "lrm:host-110", "node": "host-110"},
        {"type": "service", "id": "service:ct:100", "sid": "ct:100",
         "node": "host-110", "state": "started"},
        {"type": "service", "id": "service:vm:147", "sid": "vm:147",
         "node": "host-111", "state": "started"},
    ]
    got = await hu._ha_services_on(_cluster_with(rows), "host-110")
    assert [(s["kind"], s["vmid"]) for s in got] == [("lxc", 100)]


@pytest.mark.asyncio
async def test_only_service_rows_count_even_if_another_row_carries_a_sid():
    """Guard the `type == "service"` filter specifically.

    Today's payload happens to put `sid` only on service rows, so filtering by
    node + a parseable sid gives the same answer and a realistic fixture cannot
    tell the two apart -- an earlier version of this test passed with the type
    filter deleted, which is the false-pass this project keeps rediscovering.
    This row is therefore deliberately synthetic: it is what a future PVE that
    attaches `sid` to some other row type would send, and it is exactly the
    case where "is this a placed service?" and "does it mention a guest?"
    diverge. Waiting for a non-service row to migrate would hang the drain
    until its timeout and then refuse to reboot a node that was ready.
    """
    rows = [{"type": "lrm", "id": "lrm:host-110", "node": "host-110",
             "sid": "vm:999", "status": "host-110 (active, watchdog active)"}]
    assert await hu._ha_services_on(_cluster_with(rows), "host-110") == []


@pytest.mark.asyncio
async def test_real_lrm_row_is_not_mistaken_for_a_service():
    """The shape actually observed on a live cluster: `lrm:<node>` carries
    node == that node, and no sid."""
    rows = [{"type": "lrm", "id": "lrm:host-110", "node": "host-110",
             "status": "host-110 (active, watchdog active)"}]
    assert await hu._ha_services_on(_cluster_with(rows), "host-110") == []


@pytest.mark.asyncio
async def test_no_ha_configured_yields_no_services():
    assert await hu._ha_services_on(_cluster_with([]), "n1") == []


@pytest.mark.asyncio
async def test_unreadable_ha_status_is_None_not_empty():
    """"We could not read it" must not be reported as "there is none".

    A token without Sys.Audit makes the endpoint raise. Returning [] would tell
    the orchestrator this node hosts no HA guests, so it would migrate them by
    hand -- the exact bug this module now exists to prevent, happening silently
    (CLAUDE.md #9, #28). An earlier version of this file asserted [] here and
    was therefore pinning the bug in place (CLAUDE.md #15).
    """
    cl = _cluster_with(raise_on_status=True)
    assert await hu._ha_services_on(cl, "n1") is None


@pytest.mark.asyncio
async def test_readable_but_empty_is_still_empty():
    """The other half of the contract: [] and None must stay distinguishable."""
    assert await hu._ha_services_on(_cluster_with([]), "n1") == []


# ─────────────────────────────────────────────── maintenance-mode command

@pytest.mark.asyncio
async def test_maintenance_runs_from_a_different_online_node(monkeypatch):
    """On the way OUT we may have to disable maintenance for a node that never
    came back, so the command must not be issued from the node itself when a
    healthy sibling exists."""
    seen = {}

    def _target_for(cluster, node):
        seen["via"] = node
        return (f"{node}.local", "root", 22)

    class _Res:
        exit_status = 0
        stderr = ""

    class _Conn:
        async def run(self, cmd, check=False):
            seen["cmd"] = cmd
            return _Res()

        async def __aenter__(self):
            return self

        async def __aexit__(self, *a):
            return False

    async def _connect(host, user, port):
        return _Conn()

    monkeypatch.setattr(hu.ssh_util, "target_for", _target_for)
    monkeypatch.setattr(hu.ssh_util, "connect", _connect)
    monkeypatch.setattr(hu, "_ev", _noop_ev)

    cl = _cluster_with([])
    cl.cache.nodes = {
        "dead": types.SimpleNamespace(status="online"),
        "alive": types.SimpleNamespace(status="online"),
    }
    ok = await hu._ha_maintenance(cl, "dead", True, node_id=1)
    assert ok
    assert seen["via"] == "alive", "command was issued from the node itself"
    assert seen["cmd"] == "ha-manager crm-command node-maintenance enable dead"


@pytest.mark.asyncio
async def test_maintenance_disable_uses_the_disable_verb(monkeypatch):
    seen = {}

    class _Res:
        exit_status = 0
        stderr = ""

    class _Conn:
        async def run(self, cmd, check=False):
            seen["cmd"] = cmd
            return _Res()

        async def __aenter__(self):
            return self

        async def __aexit__(self, *a):
            return False

    monkeypatch.setattr(hu.ssh_util, "target_for",
                        lambda c, n: ("h", "root", 22))
    monkeypatch.setattr(hu.ssh_util, "connect",
                        lambda h, u, p: _awaitable(_Conn()))
    monkeypatch.setattr(hu, "_ev", _noop_ev)

    cl = _cluster_with([])
    cl.cache.nodes = {"n1": types.SimpleNamespace(status="online")}
    await hu._ha_maintenance(cl, "n1", False, node_id=1)
    assert seen["cmd"] == "ha-manager crm-command node-maintenance disable n1"


@pytest.mark.asyncio
async def test_maintenance_reports_failure_rather_than_assuming_success(monkeypatch):
    """A non-zero exit must return False: the caller refuses to reboot on it,
    and treating a failed enable as success is how a node gets rebooted with
    its HA services still running on it."""
    class _Res:
        exit_status = 2
        stderr = "no quorum"

    class _Conn:
        async def run(self, cmd, check=False):
            return _Res()

        async def __aenter__(self):
            return self

        async def __aexit__(self, *a):
            return False

    monkeypatch.setattr(hu.ssh_util, "target_for",
                        lambda c, n: ("h", "root", 22))
    monkeypatch.setattr(hu.ssh_util, "connect",
                        lambda h, u, p: _awaitable(_Conn()))
    monkeypatch.setattr(hu, "_ev", _noop_ev)

    cl = _cluster_with([])
    cl.cache.nodes = {"n1": types.SimpleNamespace(status="online")}
    assert await hu._ha_maintenance(cl, "n1", True, node_id=1) is False


# ─────────────────────────────────────────────── drain wait

@pytest.mark.asyncio
async def test_wait_ha_drained_returns_when_services_leave(monkeypatch):
    """`enable` only QUEUES a CRM command, so its exit code says nothing about
    whether anything moved. The wait is what makes the reboot safe."""
    calls = {"n": 0}

    async def _services(cluster, node):
        calls["n"] += 1
        return [{"sid": "vm:1", "kind": "qemu", "vmid": 1}] if calls["n"] < 3 else []

    monkeypatch.setattr(hu, "_ha_services_on", _services)
    monkeypatch.setattr(hu, "_ev", _noop_ev)
    monkeypatch.setattr(hu, "_HA_POLL_S", 0)
    assert await hu._wait_ha_drained(_cluster_with([]), "n1", 1) is True
    assert calls["n"] == 3


@pytest.mark.asyncio
async def test_wait_ha_drained_times_out_rather_than_proceeding(monkeypatch):
    """Never return True on a timeout: the caller reboots on True."""
    async def _services(cluster, node):
        return [{"sid": "vm:1", "kind": "qemu", "vmid": 1}]

    monkeypatch.setattr(hu, "_ha_services_on", _services)
    monkeypatch.setattr(hu, "_ev", _noop_ev)
    monkeypatch.setattr(hu, "_HA_POLL_S", 0)
    monkeypatch.setattr(hu, "_HA_DRAIN_WAIT_S", 0.05)
    assert await hu._wait_ha_drained(_cluster_with([]), "n1", 1) is False


# ─────────────────────────────────────────────── pre-flight

@pytest.mark.asyncio
@pytest.mark.parametrize("avail,should_pass", [
    (1 * GIB, False),        # under the 2 GiB block threshold
    (3 * GIB, True),         # between block and warn -- proceeds, warns
    (50 * GIB, True),
])
async def test_preflight_blocks_on_a_full_root_filesystem(monkeypatch, avail, should_pass):
    """A dist-upgrade that fills / leaves dpkg half-configured, which is far
    worse than a host we declined to touch."""
    class _Res:
        def __init__(self, out="", rc=0):
            self.stdout, self.stderr, self.exit_status = out, "", rc

    class _Conn:
        async def run(self, cmd, check=False):
            if cmd.startswith("df"):
                return _Res(str(avail))
            if cmd.startswith("apt-get update"):
                return _Res("", 0)
            return _Res("5")

        async def __aenter__(self):
            return self

        async def __aexit__(self, *a):
            return False

    monkeypatch.setattr(hu.ssh_util, "target_for", lambda c, n: ("h", "root", 22))
    monkeypatch.setattr(hu.ssh_util, "connect", lambda h, u, p: _awaitable(_Conn()))
    monkeypatch.setattr(hu, "_ev", _noop_ev)
    monkeypatch.setattr(hu, "_patch_node_detail", _noop_patch)

    ok, why = await hu._preflight_host(_cluster_with([]), "n1", 1)
    assert ok is should_pass
    if not should_pass:
        assert "free on /" in why


@pytest.mark.asyncio
async def test_preflight_fails_when_repos_are_unreachable(monkeypatch):
    """Discovering a dead mirror after the node has been evacuated means the
    workload moved for nothing."""
    class _Res:
        def __init__(self, out="", err="", rc=0):
            self.stdout, self.stderr, self.exit_status = out, err, rc

    class _Conn:
        async def run(self, cmd, check=False):
            if cmd.startswith("df"):
                return _Res(str(50 * GIB))
            if cmd.startswith("apt-get") and " update" in cmd:
                return _Res("", "Could not resolve 'deb.debian.org'", 100)
            return _Res("0")

        async def __aenter__(self):
            return self

        async def __aexit__(self, *a):
            return False

    monkeypatch.setattr(hu.ssh_util, "target_for", lambda c, n: ("h", "root", 22))
    monkeypatch.setattr(hu.ssh_util, "connect", lambda h, u, p: _awaitable(_Conn()))
    monkeypatch.setattr(hu, "_ev", _noop_ev)
    monkeypatch.setattr(hu, "_patch_node_detail", _noop_patch)

    ok, why = await hu._preflight_host(_cluster_with([]), "n1", 1)
    assert ok is False
    assert "apt-get update failed" in why
    assert "deb.debian.org" in why


@pytest.mark.asyncio
async def test_preflight_fails_closed_when_ssh_is_unavailable(monkeypatch):
    """The whole feature runs over SSH. If we cannot reach the host we must not
    start evacuating it."""
    async def _boom(h, u, p):
        raise OSError("Connection refused")

    monkeypatch.setattr(hu.ssh_util, "target_for", lambda c, n: ("h", "root", 22))
    monkeypatch.setattr(hu.ssh_util, "connect", _boom)
    monkeypatch.setattr(hu, "_ev", _noop_ev)

    ok, why = await hu._preflight_host(_cluster_with([]), "n1", 1)
    assert ok is False
    assert "SSH" in why


# ─────────────────────────────────────────────── shared stubs

async def _noop_ev(node_id, kind, message):
    return None


async def _noop_patch(node_id, patch):
    return None


def _awaitable(value):
    async def _inner():
        return value
    return _inner()


# ─────────────────────────────────────────── one sweep per cluster

async def _mk_job(cluster_id: str, status: str) -> int:
    from server import db
    import json as _json
    async with db.connect() as c:
        cur = await c.execute(
            "INSERT INTO host_upgrade_jobs "
            "(cluster_id, created_by, created_at, status, options_json, nodes_json) "
            "VALUES (?, 'tester', 0, ?, '{}', '[]')",
            (cluster_id, status),
        )
        jid = cur.lastrowid
        await c.execute(
            "INSERT INTO host_upgrade_nodes (job_id, node, ordinal) VALUES (?, 'n1', 1)",
            (jid,),
        )
        await c.commit()
    return jid


def _hu_app():
    from aiohttp import web
    from server.middleware import request_id_middleware, make_auth_middleware
    app = web.Application(middlewares=[request_id_middleware,
                                       make_auth_middleware(False)])
    for method, path, handler in hu.ROUTES:
        app.router.add_route(method, path, handler)
    return app


@pytest.mark.asyncio
async def test_second_sweep_on_the_same_cluster_is_refused(
        db_path, aiohttp_client, monkeypatch):
    """Each job keeps its OWN in_flight set, so nothing stopped two jobs from
    evacuating two nodes of one cluster at once — each planning against a
    memory pool the other is also spending, and on a small cluster putting
    quorum at risk."""
    monkeypatch.setattr(hu, "_spawn_job", lambda job_id: None)
    await _mk_job("c1", "running")
    victim = await _mk_job("c1", "pending")

    client = await aiohttp_client(_hu_app())
    r = await client.post(f"/api/clusters/c1/upgrade-jobs/{victim}/start")
    assert r.status == 409
    body = await r.json()
    assert body["error"] == "cluster_busy"
    assert "running_job_id" in body


@pytest.mark.asyncio
async def test_a_sweep_on_a_different_cluster_is_allowed(
        db_path, aiohttp_client, monkeypatch):
    """The lock is per cluster, not global — two clusters can roll at once."""
    spawned = []
    monkeypatch.setattr(hu, "_spawn_job", lambda job_id: spawned.append(job_id))
    await _mk_job("c1", "running")
    other = await _mk_job("c2", "pending")

    client = await aiohttp_client(_hu_app())
    r = await client.post(f"/api/clusters/c2/upgrade-jobs/{other}/start")
    assert r.status == 200, await r.text()
    assert spawned == [other]


@pytest.mark.asyncio
async def test_a_finished_job_does_not_block_the_next_sweep(
        db_path, aiohttp_client, monkeypatch):
    """Only 'running' holds the lock; a done/aborted job must not wedge the
    cluster forever."""
    spawned = []
    monkeypatch.setattr(hu, "_spawn_job", lambda job_id: spawned.append(job_id))
    for st in ("done", "aborted", "failed", "pending"):
        await _mk_job("c1", st)
    nxt = await _mk_job("c1", "pending")

    client = await aiohttp_client(_hu_app())
    r = await client.post(f"/api/clusters/c1/upgrade-jobs/{nxt}/start")
    assert r.status == 200, await r.text()
    assert spawned == [nxt]


# ─────────────────────────────────────────── in-place vs HA

def test_in_place_is_refused_when_the_node_hosts_ha_guests():
    svcs = [{"sid": "vm:1"}, {"sid": "ct:2"}]
    why = hu._inplace_ha_conflict(svcs, in_place=True, source="host-110")
    assert why is not None
    assert "host-110" in why and "2 HA-managed" in why
    # The operator needs to know what to do instead, not just that it failed.
    assert "auto" in why and "manual" in why


def test_in_place_is_fine_when_no_guest_is_ha_managed():
    assert hu._inplace_ha_conflict([], in_place=True, source="n1") is None


def test_ha_guests_do_not_block_the_migrating_modes():
    """auto/manual evacuation handles HA guests properly (maintenance mode), so
    only in_place conflicts."""
    svcs = [{"sid": "vm:1"}]
    assert hu._inplace_ha_conflict(svcs, in_place=False, source="n1") is None


# ─────────────────────────── HA guests are excluded from OUR evacuation

@pytest.mark.asyncio
async def test_evacuation_skips_the_guests_maintenance_mode_already_moved(monkeypatch):
    """The HA set must come from the CALLER, captured before the drain.

    Re-querying inside the evacuation would return nothing (the services have
    already left), while cluster.cache.vms can still show them on the source
    for another poll cycle — so we would fire migrations for guests that are
    not there any more.
    """
    migrated = []

    class _Client:
        async def vm_migrate(self, node, vmid, target=None, online=True):
            migrated.append(vmid)
            return f"UPID:{vmid}"

    def _vm(vmid):
        return types.SimpleNamespace(
            vmid=vmid, node="src", status="running", type="qemu",
            memory=types.SimpleNamespace(total_bytes=1 * GIB, used_bytes=0))

    cl = types.SimpleNamespace(
        client=_Client(),
        cache=types.SimpleNamespace(
            # The cache still lists BOTH guests on the source node.
            vms={"src/1": _vm(1), "src/2": _vm(2)},
            nodes={"tgt": types.SimpleNamespace(
                status="online",
                memory=types.SimpleNamespace(total_bytes=100 * GIB,
                                             used_bytes=0))}))

    monkeypatch.setattr(hu, "_ev", _noop_ev)
    async def _viable(cluster, kind, vmid, source, candidates, **kw):
        return list(candidates)
    monkeypatch.setattr(hu.migrate_guard, "viable_targets", _viable)
    async def _wait(cluster, node, upid, max_s):
        return {"exitstatus": "OK"}
    monkeypatch.setattr(hu, "_wait_for_task", _wait)

    res = await hu._evacuate_node(cl, "src", ["tgt"], node_id=1,
                                  exclude_vmids={1})
    assert migrated == [2], "an HA-managed guest was migrated by hand"
    assert [r["vmid"] for r in res] == [2]


def test_preflight_is_resumable_because_nothing_was_mutated():
    """Every other non-terminal state means work is half-done and a restart
    must fail the host for manual review. Pre-flight is read-only, so the
    correct disposition is to simply run it again."""
    assert hu._resume_disposition("preflight") == "run"
    assert "preflight" not in hu._IN_FLIGHT_STATUSES
    assert "preflight" not in hu._TERMINAL_STATUSES
    # …and the states that DO mutate still fail.
    for s in ("evacuating", "updating", "rebooting", "restoring"):
        assert hu._resume_disposition(s) == "fail"


@pytest.mark.asyncio
@pytest.mark.parametrize("bad", [
    "n1; rm -rf /", "n1 && reboot", "$(id)", "`id`", "n1|sh", "../etc", "",
])
async def test_maintenance_refuses_an_unsafe_node_name(monkeypatch, bad):
    """Both names are interpolated into a shell command line. Test the
    REFUSAL, not the happy path (CLAUDE.md #26): if the guard is ever removed,
    these must stop being rejected and the test fails."""
    ran = []

    class _Conn:
        async def run(self, cmd, check=False):
            ran.append(cmd)
            return types.SimpleNamespace(exit_status=0, stderr="")

        async def __aenter__(self):
            return self

        async def __aexit__(self, *a):
            return False

    monkeypatch.setattr(hu.ssh_util, "target_for", lambda c, n: ("h", "root", 22))
    monkeypatch.setattr(hu.ssh_util, "connect", lambda h, u, p: _awaitable(_Conn()))
    monkeypatch.setattr(hu, "_ev", _noop_ev)

    cl = _cluster_with([])
    cl.cache.nodes = {bad: types.SimpleNamespace(status="online")}
    assert await hu._ha_maintenance(cl, bad, True, node_id=1) is False
    assert ran == [], f"a command was built from {bad!r}"


@pytest.mark.asyncio
async def test_drain_never_reports_drained_while_ha_state_is_unreadable(monkeypatch):
    """`True` from this function is what authorises the reboot. An unreadable
    HA state is not evidence the services left, so it must time out instead."""
    async def _unknown(cluster, node):
        return None

    monkeypatch.setattr(hu, "_ha_services_on", _unknown)
    monkeypatch.setattr(hu, "_ev", _noop_ev)
    monkeypatch.setattr(hu, "_HA_POLL_S", 0)
    monkeypatch.setattr(hu, "_HA_DRAIN_WAIT_S", 0.05)
    assert await hu._wait_ha_drained(_cluster_with([]), "n1", 1) is False


@pytest.mark.asyncio
async def test_drain_recovers_when_ha_status_becomes_readable_again(monkeypatch):
    """A momentary read failure must not fail the host outright — it keeps
    waiting, and a later successful read decides."""
    seq = [None, None, []]

    async def _flaky(cluster, node):
        return seq.pop(0) if seq else []

    monkeypatch.setattr(hu, "_ha_services_on", _flaky)
    monkeypatch.setattr(hu, "_ev", _noop_ev)
    monkeypatch.setattr(hu, "_HA_POLL_S", 0)
    assert await hu._wait_ha_drained(_cluster_with([]), "n1", 1) is True


@pytest.mark.asyncio
async def test_drain_can_be_aborted(monkeypatch):
    """Without this the operator waits out a 30-minute timeout they cannot
    interrupt; every other long wait in this module honours abort."""
    async def _never(cluster, node):
        return [{"sid": "vm:1", "kind": "qemu", "vmid": 1}]

    monkeypatch.setattr(hu, "_ha_services_on", _never)
    monkeypatch.setattr(hu, "_ev", _noop_ev)
    monkeypatch.setattr(hu, "_HA_POLL_S", 0)
    hu._control.aborts.add(4242)
    try:
        assert await hu._wait_ha_drained(_cluster_with([]), "n1", 1, 4242) is False
    finally:
        hu._control.aborts.discard(4242)
