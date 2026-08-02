"""HA node-affinity pre-flight.

Modelled on the real failure: `vm:147` belongs to a strict node-affinity rule
allowing host-109/110/111/114, a migration to host-108 was accepted by PVE and
then died inside ha-manager with exit code 2.

The two behaviours that matter are opposite in direction, so both are pinned:
a strict rule MUST block, and an unreadable HA config must NOT — refusing to
evacuate a node because the HA API hiccuped would be worse than the failure
this prevents.
"""
from __future__ import annotations

import pytest

from server import ha_affinity as ha


class FakeClient:
    def __init__(self, rules=None, groups=None, resources=None,
                 rules_exc=None, groups_exc=None, resources_exc=None):
        self._rules, self._groups, self._resources = rules, groups, resources
        self._rx, self._gx, self._sx = rules_exc, groups_exc, resources_exc

    async def _request(self, method, path, **kw):
        if path == "/cluster/ha/rules":
            if self._rx:
                raise self._rx
            return self._rules or []
        raise AssertionError(f"unexpected request {path}")

    async def list_ha_groups(self):
        if self._gx:
            raise self._gx
        return self._groups or []

    async def list_ha_resources(self):
        if self._sx:
            raise self._sx
        return self._resources or []


class FakeCluster:
    _n = 0

    def __init__(self, **kw):
        FakeCluster._n += 1
        self.id = f"c{FakeCluster._n}"          # unique: the module caches per id
        self.client = FakeClient(**kw)


# The real rule set from the cluster where this was found.
REAL_RULES = [
    {"type": "node-affinity", "rule": "ha-group-Service_High_HCI", "strict": 1,
     "nodes": "host-109,host-110,host-111",
     "resources": "ct:100,ct:115,vm:102,vm:112,vm:134"},
    {"type": "node-affinity", "rule": "ha-group-Service_Low", "strict": 1,
     "nodes": "host-109,host-110,host-111,host-114",
     "resources": "ct:113,ct:118,vm:147,vm:157"},
    {"type": "node-affinity", "rule": "ha-group-host108", "strict": 1,
     "nodes": "host-108", "resources": "vm:129"},
]


@pytest.mark.asyncio
async def test_strict_rule_blocks_the_real_failure():
    """vm:147 -> host-108 is exactly what failed with ha-manager exit 2."""
    c = FakeCluster(rules=REAL_RULES)
    r = await ha.check_target(c, "qemu", 147, "host-108")
    assert r is not None
    assert r["error"] == "ha_target_not_allowed"
    assert r["allowed_nodes"] == ["host-109", "host-110", "host-111", "host-114"]
    assert "ha-group-Service_Low" in r["rules"]


@pytest.mark.asyncio
async def test_permitted_target_is_allowed():
    c = FakeCluster(rules=REAL_RULES)
    assert await ha.check_target(c, "qemu", 147, "host-111") is None


@pytest.mark.asyncio
async def test_guest_in_no_rule_is_unrestricted():
    c = FakeCluster(rules=REAL_RULES)
    assert await ha.check_target(c, "qemu", 999, "host-108") is None


@pytest.mark.asyncio
async def test_containers_use_the_ct_prefix():
    """ct:113 is in Service_Low; vm:113 is in nothing. Getting the prefix wrong
    would silently check the wrong resource."""
    c = FakeCluster(rules=REAL_RULES)
    assert await ha.check_target(c, "lxc", 113, "host-108") is not None
    c2 = FakeCluster(rules=REAL_RULES)
    assert await ha.check_target(c2, "qemu", 113, "host-108") is None


@pytest.mark.asyncio
async def test_non_strict_rule_does_not_block():
    """A non-strict rule is a preference — HA ignores it when it must, so it
    must not stop an explicit migration."""
    c = FakeCluster(rules=[{"type": "node-affinity", "rule": "soft", "strict": 0,
                            "nodes": "host-109", "resources": "vm:147"}])
    assert await ha.check_target(c, "qemu", 147, "host-108") is None


@pytest.mark.asyncio
async def test_non_affinity_rule_types_are_ignored():
    c = FakeCluster(rules=[{"type": "resource-affinity", "rule": "keep-apart",
                            "strict": 1, "nodes": "host-109",
                            "resources": "vm:147"}])
    assert await ha.check_target(c, "qemu", 147, "host-108") is None


@pytest.mark.asyncio
async def test_two_strict_rules_intersect():
    c = FakeCluster(rules=[
        {"type": "node-affinity", "rule": "a", "strict": 1,
         "nodes": "host-1,host-2,host-3", "resources": "vm:5"},
        {"type": "node-affinity", "rule": "b", "strict": 1,
         "nodes": "host-2,host-3,host-4", "resources": "vm:5"},
    ])
    r = await ha.check_target(c, "qemu", 5, "host-1")
    assert r is not None and r["allowed_nodes"] == ["host-2", "host-3"]


@pytest.mark.asyncio
async def test_node_priority_suffix_is_stripped():
    """PVE lets a node carry a priority (`host-1:2`); a naive split leaves the
    suffix attached and then nothing ever matches."""
    c = FakeCluster(rules=[{"type": "node-affinity", "rule": "p", "strict": 1,
                            "nodes": "host-109:2,host-111:1",
                            "resources": "vm:147"}])
    assert await ha.check_target(c, "qemu", 147, "host-111") is None
    c2 = FakeCluster(rules=[{"type": "node-affinity", "rule": "p", "strict": 1,
                             "nodes": "host-109:2,host-111:1",
                             "resources": "vm:147"}])
    assert await ha.check_target(c2, "qemu", 147, "host-108") is not None


# ---------------------------------------------------------------- PVE 8 shape

@pytest.mark.asyncio
async def test_pve8_restricted_group_blocks():
    c = FakeCluster(
        rules=[],
        groups=[{"group": "low", "nodes": "host-109,host-114", "restricted": 1}],
        resources=[{"sid": "vm:147", "group": "low"}])
    r = await ha.check_target(c, "qemu", 147, "host-108")
    assert r is not None and r["allowed_nodes"] == ["host-109", "host-114"]


@pytest.mark.asyncio
async def test_pve8_unrestricted_group_does_not_block():
    c = FakeCluster(
        rules=[],
        groups=[{"group": "low", "nodes": "host-109", "restricted": 0}],
        resources=[{"sid": "vm:147", "group": "low"}])
    assert await ha.check_target(c, "qemu", 147, "host-108") is None


@pytest.mark.asyncio
async def test_pve9_groups_endpoint_erroring_is_not_fatal():
    """On PVE 9 `/cluster/ha/groups` raises ('migrated to rules'). The rules
    must still be honoured — an exception there must not disable the check."""
    c = FakeCluster(rules=REAL_RULES,
                    groups_exc=RuntimeError("ha groups have been migrated to rules"))
    r = await ha.check_target(c, "qemu", 147, "host-108")
    assert r is not None and r["error"] == "ha_target_not_allowed"


# ------------------------------------------------------------- fails OPEN

@pytest.mark.asyncio
async def test_unreadable_ha_config_allows_migration():
    """Blocking every migration because the HA API is unreachable would strand
    an operator mid-evacuation. Fail open — the failure this guard prevents is
    recoverable, a false block during maintenance is not."""
    c = FakeCluster(rules_exc=RuntimeError("boom"),
                    groups_exc=RuntimeError("boom"),
                    resources_exc=RuntimeError("boom"))
    assert await ha.check_target(c, "qemu", 147, "host-108") is None


@pytest.mark.asyncio
async def test_cluster_with_no_ha_at_all_allows_everything():
    c = FakeCluster(rules=[], groups=[], resources=[])
    assert await ha.check_target(c, "qemu", 147, "host-108") is None


@pytest.mark.asyncio
async def test_allowed_nodes_reports_none_when_unrestricted():
    c = FakeCluster(rules=REAL_RULES)
    assert await ha.allowed_nodes(c, "qemu", 999) is None
    c2 = FakeCluster(rules=REAL_RULES)
    assert await ha.allowed_nodes(c2, "qemu", 147) == {
        "host-109", "host-110", "host-111", "host-114"}


def test_sid_prefixes():
    assert ha.sid_for("qemu", 1) == "vm:1"
    assert ha.sid_for("lxc", 1) == "ct:1"
    assert ha.sid_for("ct", 1) == "ct:1"


# ------------------------------------------------- node list shape (real bug)

@pytest.mark.asyncio
async def test_migrate_targets_reads_dataclass_nodes():
    """`cache.nodes` holds NodeMetrics DATACLASSES whose name field is `node`,
    not `name`, and whose status is an enum. Reading `.name` returned None for
    every node, so the endpoint answered "no targets" for everything — a silent
    wrong answer that reads in the UI as "this guest cannot be migrated".
    """
    import enum
    from dataclasses import dataclass

    from server import vm_control

    class NodeStatus(enum.Enum):
        ONLINE = "online"
        OFFLINE = "offline"

    @dataclass
    class NodeMetrics:
        node: str
        status: NodeStatus

    @dataclass
    class Storage:
        storage: str
        node: str
        shared: bool = True

    class Cache:
        # The handler now refuses to answer until the inventory is populated —
        # a partial cache used to yield a confident "no targets".
        storages = {f"{n}/ceph1": Storage("ceph1", n, True)
                    for n in ("host-108", "host-109", "host-110",
                              "host-111", "host-114")}
        vms = {}
        nodes = {
            "host-108": NodeMetrics("host-108", NodeStatus.ONLINE),
            "host-109": NodeMetrics("host-109", NodeStatus.ONLINE),
            "host-110": NodeMetrics("host-110", NodeStatus.ONLINE),
            "host-111": NodeMetrics("host-111", NodeStatus.ONLINE),
            "host-114": NodeMetrics("host-114", NodeStatus.ONLINE),
            "host-off": NodeMetrics("host-off", NodeStatus.OFFLINE),
        }

    cluster = FakeCluster(rules=REAL_RULES)
    cluster.cache = Cache()

    class Req:
        path = "/api/clusters/c/vms/147/migrate-targets"
        match_info = {"cluster_id": "c", "vmid": "147"}

        def get(self, k, d=None):
            return d

    async def _resolve(cid, vmid):
        return {"node": "host-114", "type": "qemu"}

    import server.vm_control as vc
    orig_cm = vc.cluster_manager.get_cluster
    orig_res = vc._resolve_vm_target
    try:
        vc.cluster_manager.get_cluster = lambda cid: cluster
        vc._resolve_vm_target = _resolve
        # call the undecorated function: the role gate is tested elsewhere
        fn = vc.migrate_targets_handler
        fn = getattr(fn, "__wrapped__", fn)
        resp = await fn(Req())
    finally:
        vc.cluster_manager.get_cluster = orig_cm
        vc._resolve_vm_target = orig_res

    import json as _json
    body = _json.loads(resp.body.decode())
    # host-114 is the source, host-108 is forbidden by the rule, host-off is down
    assert body["targets"] == ["host-109", "host-110", "host-111"], body
    assert body["source_node"] == "host-114"


@pytest.mark.asyncio
async def test_unpopulated_inventory_reports_unknown_not_empty():
    """Straight after a daemon restart the poll cache is empty or partial. An
    empty target list there renders as "this guest cannot be migrated" — the
    same confident-but-wrong answer this whole guard exists to prevent. It must
    say it does not know yet."""
    import json as _json

    import server.vm_control as vc

    class Cache:
        nodes = {}
        storages = {}
        vms = {}

    cluster = FakeCluster(rules=REAL_RULES)
    cluster.cache = Cache()

    class Req:
        path = "/api/clusters/c/vms/147/migrate-targets"
        match_info = {"cluster_id": "c", "vmid": "147"}

        def get(self, k, d=None):
            return d

    async def _resolve(cid, vmid):
        return {"node": "host-114", "type": "qemu"}

    orig_cm, orig_res = vc.cluster_manager.get_cluster, vc._resolve_vm_target
    try:
        vc.cluster_manager.get_cluster = lambda cid: cluster
        vc._resolve_vm_target = _resolve
        fn = getattr(vc.migrate_targets_handler, "__wrapped__",
                     vc.migrate_targets_handler)
        resp = await fn(Req())
    finally:
        vc.cluster_manager.get_cluster = orig_cm
        vc._resolve_vm_target = orig_res

    body = _json.loads(resp.body.decode())
    assert body["targets"] is None, body
    assert body["unknown"] is True
