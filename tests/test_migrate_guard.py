"""Migration storage pre-flight.

Grounded in the real cluster's storage layout, which is the point: `local-zfs`
is `shared=False` and yet exists on EVERY node, because each node has its own.
A naive "does the target have a storage with this name?" check therefore says
yes and the migration still fails, because the DATA is on the source. Meanwhile
`vmimage-dir` is configured for only two nodes and does not resolve elsewhere
at all. Both shapes are exercised here.
"""
from __future__ import annotations

from dataclasses import dataclass, field

import pytest

from server import migrate_guard as mg


@dataclass
class Storage:
    storage: str
    node: str
    shared: bool = False
    enabled: bool = True
    allowed_nodes: list = field(default_factory=list)


@dataclass
class Disk:
    storage: str


@dataclass
class VM:
    vmid: int
    node: str
    disks: list


class Cache:
    def __init__(self, storages, vms):
        self.storages = {f"{s.node}/{s.storage}": s for s in storages}
        self.vms = {f"{v.node}/{v.vmid}": v for v in vms}
        self.nodes = {}


NODES = ["host-108", "host-109", "host-110", "host-111", "host-114"]

# Verbatim shape of the real cluster.
STORAGES = (
    [Storage("ceph1", n, shared=True) for n in NODES]
    + [Storage("local-zfs", n, shared=False) for n in NODES]
    + [Storage("vmimage-dir", "host-108", shared=False,
               allowed_nodes=["host-115", "host-108"])]
    + [Storage("ovatest", "host-110", shared=False, allowed_nodes=["host-110"])]
)


def cluster_with(vm):
    class C:
        id = "c1"
        cache = Cache(STORAGES, [vm])
    return C


def test_shared_storage_migrates_anywhere():
    c = cluster_with(VM(100, "host-114", [Disk("ceph1")]))
    assert mg.storage_blockers(c, 100, "host-114", "host-108",
                               online=True, with_local_disks=False) is None


def test_storage_absent_from_target_is_blocked():
    """vmimage-dir exists only on host-108/115 — nothing to migrate onto."""
    c = cluster_with(VM(101, "host-108", [Disk("vmimage-dir")]))
    r = mg.storage_blockers(c, 101, "host-108", "host-111",
                            online=True, with_local_disks=False)
    assert r is not None and r["error"] == "storage_not_on_target"
    assert r["storages"] == ["vmimage-dir"]


def test_same_named_local_storage_on_target_is_not_enough():
    """local-zfs resolves on every node, but the DATA is on the source. A
    check that only asks "does the name exist there?" would wave this through
    and the migration would fail inside the task."""
    c = cluster_with(VM(102, "host-114", [Disk("local-zfs")]))
    r = mg.storage_blockers(c, 102, "host-114", "host-108",
                            online=True, with_local_disks=False)
    assert r is not None and r["error"] == "local_disks_need_copy"


def test_local_storage_is_allowed_when_copying_disks():
    c = cluster_with(VM(103, "host-114", [Disk("local-zfs")]))
    assert mg.storage_blockers(c, 103, "host-114", "host-108",
                               online=True, with_local_disks=True) is None


def test_local_storage_offline_migration_is_allowed():
    c = cluster_with(VM(104, "host-114", [Disk("local-zfs")]))
    assert mg.storage_blockers(c, 104, "host-114", "host-108",
                               online=False, with_local_disks=False) is None


def test_allowed_nodes_restriction_is_honoured():
    """host-115 is in vmimage-dir's allowed list but has no entry of its own;
    host-110 is in neither."""
    c = cluster_with(VM(105, "host-108", [Disk("vmimage-dir")]))
    r = mg.storage_blockers(c, 105, "host-108", "host-110",
                            online=False, with_local_disks=True)
    assert r is not None and r["error"] == "storage_not_on_target"


def test_mixed_disks_report_only_the_blocking_storage():
    c = cluster_with(VM(106, "host-108", [Disk("ceph1"), Disk("vmimage-dir")]))
    r = mg.storage_blockers(c, 106, "host-108", "host-111",
                            online=True, with_local_disks=False)
    assert r["storages"] == ["vmimage-dir"]


def test_unknown_storage_is_not_blocked():
    """If we cannot see the storage at all we must not invent a refusal —
    let PVE be the authority."""
    c = cluster_with(VM(107, "host-114", [Disk("something-we-never-polled")]))
    assert mg.storage_blockers(c, 107, "host-114", "host-108",
                               online=True, with_local_disks=False) is None


def test_guest_with_no_disks_is_not_blocked():
    c = cluster_with(VM(108, "host-114", []))
    assert mg.storage_blockers(c, 108, "host-114", "host-108",
                               online=True, with_local_disks=False) is None


def test_broken_cache_fails_open():
    class C:
        id = "c1"
        cache = None
    assert mg.storage_blockers(C, 1, "a", "b",
                               online=True, with_local_disks=False) is None


@pytest.mark.asyncio
async def test_viable_targets_filters_storage_and_ha(monkeypatch):
    c = cluster_with(VM(109, "host-108", [Disk("vmimage-dir")]))

    async def no_ha(cluster, kind, vmid):
        return None
    monkeypatch.setattr(mg.ha_affinity, "allowed_nodes", no_ha)
    out = await mg.viable_targets(c, "qemu", 109, "host-108", NODES,
                                  online=True, with_local_disks=False)
    assert out == []          # vmimage-dir exists nowhere else


@pytest.mark.asyncio
async def test_viable_targets_keeps_shared_storage_nodes(monkeypatch):
    c = cluster_with(VM(110, "host-114", [Disk("ceph1")]))

    async def no_ha(cluster, kind, vmid):
        return None
    monkeypatch.setattr(mg.ha_affinity, "allowed_nodes", no_ha)
    out = await mg.viable_targets(c, "qemu", 110, "host-114", NODES,
                                  online=True, with_local_disks=False)
    assert out == ["host-108", "host-109", "host-110", "host-111"]


@pytest.mark.asyncio
async def test_viable_targets_intersects_with_ha_rules(monkeypatch):
    c = cluster_with(VM(111, "host-114", [Disk("ceph1")]))

    async def ha(cluster, kind, vmid):
        return {"host-109", "host-111", "host-114"}
    monkeypatch.setattr(mg.ha_affinity, "allowed_nodes", ha)
    out = await mg.viable_targets(c, "qemu", 111, "host-114", NODES,
                                  online=True, with_local_disks=False)
    assert out == ["host-109", "host-111"]


def test_guard_runs_after_authorisation():
    """The refusal body names HA rules, allowed nodes and storage layout — a
    map of the cluster. Running the pre-flight before the role check would let
    an unauthorised caller read all of that out of 409 responses. Authorisation
    must come first in both migrate handlers.
    """
    import pathlib
    src = (pathlib.Path(__file__).resolve().parents[1]
           / "server/vm_control.py").read_text(encoding="utf-8").split("\n")
    checked = 0
    for i, line in enumerate(src):
        if not (line.startswith("async def vm_migrate_handler")
                or line.startswith("async def ct_migrate_handler")):
            continue
        block = src[i:i + 70]
        role = next((j for j, x in enumerate(block) if "_check_vm_role" in x), None)
        guard = next((j for j, x in enumerate(block) if "migrate_guard.check" in x), None)
        assert role is not None, f"{line}: no role check at all"
        assert guard is not None, f"{line}: no migration pre-flight"
        assert role < guard, (
            f"{line.strip()}: pre-flight at +{guard} runs BEFORE the role check "
            f"at +{role} — it would leak cluster topology to unauthorised callers")
        checked += 1
    assert checked == 2, f"expected both migrate handlers, checked {checked}"
