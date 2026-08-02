"""Pre-flight for creation, restore and disk placement.

Each check corresponds to something PVE only discovers once the task is already
running, at which point a config may be written and a disk half-allocated.
"""
from __future__ import annotations

from dataclasses import dataclass, field

import pytest

from server import create_guard as cg


@dataclass
class Storage:
    storage: str
    node: str
    content: list = field(default_factory=list)
    enabled: bool = True


@dataclass
class VM:
    vmid: int
    node: str


class Client:
    def __init__(self, ifaces=None, exc=None):
        self.ifaces, self.exc = ifaces, exc
        self.calls = 0

    async def _request(self, method, path, **kw):
        self.calls += 1
        if self.exc:
            raise self.exc
        return self.ifaces or []


class Cluster:
    _n = 0

    def __init__(self, ifaces=None, exc=None, vms=(), storages=()):
        Cluster._n += 1
        self.id = f"cl{Cluster._n}"          # unique: bridges are cached per id
        self.client = Client(ifaces, exc)

        class Cache:
            pass
        Cache.vms = {f"{v.node}/{v.vmid}": v for v in vms}
        Cache.storages = {f"{s.node}/{s.storage}": s for s in storages}
        self.cache = Cache


# Verbatim from a real node.
IFACES = [
    {"iface": "eno2no1", "type": "eth"},
    {"iface": "vmbr0", "type": "bridge"},
    {"iface": "enp23s0", "type": "eth"},
    {"iface": "vmbr10", "type": "bridge"},
]
STORAGES = [Storage("ceph1", "n1", ["images", "rootdir"]),
            Storage("iso-only", "n1", ["iso"])]


# ------------------------------------------------------------------- vmid

def test_vmid_in_use_is_refused():
    c = Cluster(vms=[VM(147, "host-114")])
    r = cg.check_vmid_free(c, 147)
    assert r is not None and r["error"] == "vmid_in_use"
    assert r["node"] == "host-114"


def test_free_vmid_is_allowed():
    c = Cluster(vms=[VM(147, "host-114")])
    assert cg.check_vmid_free(c, 999) is None


def test_vmid_is_cluster_wide_not_per_node():
    """A guest on another node still owns the id — "free here" is not free."""
    c = Cluster(vms=[VM(147, "host-114")])
    assert cg.check_vmid_free(c, 147) is not None


def test_restore_can_opt_into_overwriting():
    c = Cluster(vms=[VM(147, "host-114")])
    assert cg.check_vmid_free(c, 147, allow_existing=True) is None


# ---------------------------------------------------------------- bridges

@pytest.mark.asyncio
async def test_missing_bridge_is_refused():
    c = Cluster(ifaces=IFACES)
    r = await cg.check_nic_bridges(c, "n1", ["vmbr99"])
    assert r is not None and r["error"] == "bridge_not_on_node"
    assert r["bridges"] == ["vmbr99"]
    assert "vmbr0" in r["available"]


@pytest.mark.asyncio
async def test_existing_bridge_is_allowed():
    c = Cluster(ifaces=IFACES)
    assert await cg.check_nic_bridges(c, "n1", ["vmbr0", "vmbr10"]) is None


@pytest.mark.asyncio
async def test_physical_nics_are_not_offered_as_bridges():
    """eno2no1 is an eth, not something a NIC can attach to."""
    c = Cluster(ifaces=IFACES)
    r = await cg.check_nic_bridges(c, "n1", ["eno2no1"])
    assert r is not None


@pytest.mark.asyncio
async def test_unreadable_network_list_does_not_block():
    c = Cluster(exc=RuntimeError("boom"))
    assert await cg.check_nic_bridges(c, "n1", ["vmbr0"]) is None


@pytest.mark.asyncio
async def test_no_bridges_requested_is_not_a_lookup():
    c = Cluster(ifaces=IFACES)
    assert await cg.check_nic_bridges(c, "n1", []) is None
    assert c.client.calls == 0


@pytest.mark.asyncio
async def test_bridge_list_is_cached():
    c = Cluster(ifaces=IFACES)
    await cg.check_nic_bridges(c, "n1", ["vmbr0"])
    await cg.check_nic_bridges(c, "n1", ["vmbr10"])
    assert c.client.calls == 1


# --------------------------------------------------------------- storages

def test_vm_disk_needs_images():
    c = Cluster(storages=STORAGES)
    assert cg.check_disk_storage(c, "n1", "ceph1", "qemu") is None
    r = cg.check_disk_storage(c, "n1", "iso-only", "qemu")
    assert r is not None and r["error"] == "storage_content_unsupported"
    assert r["usable_storages"] == ["ceph1"]


def test_ct_disk_needs_rootdir():
    c = Cluster(storages=STORAGES)
    assert cg.check_disk_storage(c, "n1", "ceph1", "lxc") is None
    assert cg.check_disk_storage(c, "n1", "iso-only", "lxc") is not None


def test_unknown_storage_is_not_blocked():
    c = Cluster(storages=STORAGES)
    assert cg.check_disk_storage(c, "n1", "never-polled", "qemu") is None
