"""cluster_manager.Cluster / ClusterManager cache shaping.

The PVE transport is replaced at `PVEClient._request` ONLY — every client
method (get_cluster_tasks' client-side slicing, get_ceph_* error swallowing,
UPID quoting, ...) is the real one. So the router below can only answer calls
the real client actually makes; a path the client does not use simply never
gets asked for (the inverse of CLAUDE.md #37, where a fake invented a method).

Fixture payloads in tests/fixtures/pve/ are hand-written in PVE's documented
shapes (/cluster/resources, /storage, /cluster/status, ceph status/mon/mgr/
osd/pool). They were NOT captured from a live cluster — if one of these tests
disagrees with a real payload, trust the payload and fix the fixture.
"""
from __future__ import annotations

import copy
import json
import types
from pathlib import Path
from urllib.parse import quote

import pytest

from server import cluster_manager as cm
from server.cluster_manager import Cluster, ClusterManager
from server.config import ClusterConfig, Config, PVEAuthConfig, PVENodeConfig
from server.models import (
    CephMetrics, NodeStatus, StorageMetrics, VMMetrics, VMStatus, DiskConfig,
)


FIX = Path(__file__).resolve().parent / "fixtures" / "pve"


def load(name: str):
    return json.loads((FIX / name).read_text())


class NotImplemented501(Exception):
    """What PVEClient._request raises for an endpoint pveproxy does not have."""


class Router:
    def __init__(self):
        self.routes: dict[tuple[str, str], object] = {}
        self.calls: list[tuple[str, str, dict]] = []

    async def __call__(self, method, path, node=None, **kwargs):
        self.calls.append((method, path, kwargs))
        key = (method, path)
        if key not in self.routes:
            raise NotImplemented501(f"501 Method '{method} {path}' not implemented")
        v = self.routes[key]
        if isinstance(v, Exception):
            raise v
        if callable(v):
            v = v(kwargs)
        return copy.deepcopy(v)

    def paths(self, prefix=""):
        return [p for _, p, _ in self.calls if p.startswith(prefix)]


def make_cluster(monkeypatch, *, name="", nodes=1) -> tuple[Cluster, Router]:
    cfg = ClusterConfig(
        id="c1", name=name,
        nodes=[PVENodeConfig(host=f"203.0.113.{i + 1}") for i in range(nodes)],
        auth=PVEAuthConfig(user="monitor@pve", token_name="t", token_value="v"),
    )
    cl = Cluster(cfg)
    r = Router()
    monkeypatch.setattr(cl.client, "_request", r)
    return cl, r


def base_routes(r: Router):
    r.routes[("GET", "/cluster/status")] = load("cluster_status.json")
    r.routes[("GET", "/storage")] = load("storage_config.json")
    r.routes[("GET", "/cluster/resources")] = load("cluster_resources.json")
    r.routes[("GET", "/cluster/tasks")] = []
    r.routes[("GET", "/nodes/pve1/qemu/100/config")] = {
        "scsi0": "local-zfs:vm-100-disk-0,iothread=1,size=32G",
        "scsihw": "virtio-scsi-single",
        "ide2": "local:iso/debian-12.iso,media=cdrom,size=600M",
        "efidisk0": "local-zfs:vm-100-disk-1,efitype=4m,pre-enrolled-keys=1,size=1M",
        "virtio1": "ceph-rbd:vm-100-disk-2,size=1T",
        "unused0": "local-zfs:vm-100-disk-9",
        "net0": "virtio=BC:24:11:00:00:01,bridge=vmbr0",
    }
    r.routes[("GET", "/nodes/pve1/qemu/9000/config")] = {"scsi0": "local-zfs:base-9000-disk-0,size=10G"}
    r.routes[("GET", "/nodes/pve2/lxc/200/config")] = {
        "rootfs": "local-zfs:subvol-200-disk-0,size=8G",
        "mp0": "ceph-rbd:vm-200-disk-1,mp=/data,size=512M",
        "hostname": "ct-dns",
    }
    r.routes[("GET", "/nodes/pve2/lxc/9001/config")] = {"rootfs": "local-zfs:basevol-9001-disk-0,size=4G"}
    for n, kv in (("pve1", "6.8.12-4-pve"), ("pve2", "6.8.12-5-pve")):
        r.routes[("GET", f"/nodes/{n}/status")] = {
            "kversion": f"Linux {kv} #1 SMP PREEMPT_DYNAMIC", "pveversion": "pve-manager/9.0.10/abc",
            "wait": 0.02, "cpu": 0.05,
        }
        r.routes[("GET", f"/nodes/{n}/rrddata")] = [
            {"time": 1, "netin": 111.0, "netout": 222.0},
            {"time": 2},   # newest sample not yet populated
        ]


@pytest.fixture
def clock(monkeypatch):
    """Drive cluster_manager's time.time() explicitly (rate maths)."""
    import time as real_time
    now = [1_000_000.0]

    class FakeTime:
        """Both wall and monotonic clocks follow `now`; anything else is real."""
        def time(self):
            return now[0]

        def monotonic(self):
            return now[0]

        def __getattr__(self, name):
            return getattr(real_time, name)
    monkeypatch.setattr(cm, "time", FakeTime())
    return now


async def full_poll(cl: Cluster):
    await cl._fetch_static_data()
    await cl._fetch_metrics()


# ============================================================ cache shape

async def test_cache_holds_dataclasses_keyed_node_slash_vmid(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    assert set(cl.cache.vms) == {"pve1/100", "pve1/9000", "pve2/200", "pve2/9001"}
    for v in cl.cache.vms.values():
        assert isinstance(v, VMMetrics), "consumers must not expect dicts (CLAUDE.md ZFS note)"
        assert isinstance(v.status, VMStatus)
    web = cl.cache.vms["pve1/100"]
    assert web.type == "qemu" and web.name == "web01" and web.cluster_id == "c1"
    assert web.tags == ["prod", "web"]
    assert web.status is VMStatus.RUNNING
    assert web.cpu.usage_percent == pytest.approx(25.0)
    assert web.memory.used_bytes == 2147483648 and web.memory.free_bytes == 2147483648
    assert cl.cache.vms["pve1/9000"].template is True
    assert cl.cache.vms["pve2/200"].type == "lxc"
    assert cl.cache.vms["pve2/200"].tags == []


async def test_storages_one_row_per_node_with_allowed_nodes(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    assert set(cl.cache.storages) == {
        "pve1/local-zfs", "pve2/local-zfs", "pve1/ceph-rbd", "pve2/ceph-rbd",
        "pve1/pbs1", "pve2/pbs1",
    }
    rbd = [s for s in cl.cache.storages.values() if s.storage == "ceph-rbd"]
    assert len(rbd) == 2, "shared storage is one entry PER NODE — UI must dedup"
    assert all(isinstance(s, StorageMetrics) and s.shared for s in rbd)
    lz = cl.cache.storages["pve1/local-zfs"]
    assert lz.shared is False and lz.type == "zfspool"
    assert lz.content == ["images", "rootdir"]
    assert lz.allowed_nodes == [], "empty = every node, not no node"
    # pbs1 is restricted to pve1 by nodes= yet still has a pve2 row (#32).
    assert cl.cache.storages["pve2/pbs1"].allowed_nodes == ["pve1"]
    assert cl.cache.storages["pve1/pbs1"].enabled is True
    assert cl.cache.storages["pve2/pbs1"].enabled is False


async def test_non_guest_resource_types_ignored(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    assert "localnetwork" not in json.dumps(cl.get_data())


async def test_unknown_guest_status_maps_to_unknown(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    res = load("cluster_resources.json")
    res[2]["status"] = "prelaunch"
    r.routes[("GET", "/cluster/resources")] = res
    await cl._fetch_metrics()
    assert cl.cache.vms["pve1/100"].status is VMStatus.UNKNOWN


async def test_node_vm_counts_skip_templates(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    cl._update_node_vm_counts()
    assert (cl.cache.nodes["pve1"].vm_count, cl.cache.nodes["pve1"].ct_count) == (1, 0)
    assert (cl.cache.nodes["pve2"].vm_count, cl.cache.nodes["pve2"].ct_count) == (0, 1)


async def test_node_metrics_and_rrd_fallback(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await cl._fetch_metrics()
    n = cl.cache.nodes["pve1"]
    assert n.status is NodeStatus.ONLINE
    assert n.kernel_version.startswith("Linux 6.8.12-4-pve")
    assert n.pve_version == "pve-manager/9.0.10/abc"
    assert n.cpu.iowait == pytest.approx(2.0)
    assert n.cpu.usage_percent == pytest.approx(5.0) and n.cpu.cores == 16
    # newest RRD point empty -> previous point used
    assert (n.network.rx_bytes_sec, n.network.tx_bytes_sec) == (111.0, 222.0)
    assert n.memory.free_bytes == 68719476736 - 8589934592


async def test_offline_node_not_queried_for_status(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    res = load("cluster_resources.json")
    res[1]["status"] = "offline"
    r.routes[("GET", "/cluster/resources")] = res
    await cl._fetch_metrics()
    assert cl.cache.nodes["pve2"].status is NodeStatus.OFFLINE
    assert "/nodes/pve2/status" not in r.paths()
    assert "/nodes/pve2/rrddata" not in r.paths()


async def test_summary(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    s = cl.cache.summary
    assert s.name == "prod", "empty config name falls back to PVE cluster name"
    assert s.pve_user == "monitor@pve"
    assert (s.node_count, s.nodes_online) == (2, 2)
    assert (s.vm_count, s.vms_running) == (1, 1), "qemu template excluded"
    assert s.cts_running == 1
    assert s.is_standalone is False
    assert s.has_ceph is False
    assert s.total_cpu_usage == pytest.approx((5.0 + 15.0) / 2)


async def test_summary_ct_count_excludes_templates_like_vm_count(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    cl._update_node_vm_counts()
    per_node = sum(n.ct_count for n in cl.cache.nodes.values())
    assert cl.cache.summary.ct_count == per_node == 1


async def test_config_name_wins_over_pve_name(monkeypatch):
    cl, r = make_cluster(monkeypatch, name="Lab")
    base_routes(r)
    await full_poll(cl)
    assert cl.name == "Lab" and cl.cache.summary.name == "Lab"


@pytest.mark.parametrize("status,nodes,expect", [
    ([{"type": "node", "name": "solo", "online": 1, "local": 1}], 1, True),
    (load("cluster_status.json"), 1, False),
    (NotImplemented501("boom"), 1, True),      # unreadable + 1 node configured
    (NotImplemented501("boom"), 2, False),     # unreadable + 2 nodes configured
])
async def test_is_standalone(monkeypatch, status, nodes, expect):
    cl, r = make_cluster(monkeypatch, nodes=nodes)
    r.routes[("GET", "/cluster/status")] = status
    await cl._fetch_cluster_name()
    assert cl.is_standalone is expect


# ============================================================ poll dynamics

async def test_migrated_guest_old_key_removed(monkeypatch, clock):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    clock[0] += 5
    await cl._fetch_metrics()          # 2nd sample creates a tracker entry
    assert "pve1/100" in cl.cache.vm_network_trackers
    res = load("cluster_resources.json")
    res[2]["node"] = "pve2"
    r.routes[("GET", "/cluster/resources")] = res
    await cl._fetch_metrics()
    assert "pve1/100" not in cl.cache.vms
    assert "pve2/100" in cl.cache.vms
    assert "pve1/100" not in cl.cache.vm_network_trackers


async def test_failed_poll_keeps_previous_cache(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    before = set(cl.cache.vms)
    stamp = cl.cache.last_update
    r.routes[("GET", "/cluster/resources")] = NotImplemented501("596 Connection timed out")
    await cl._fetch_metrics()          # must not raise
    assert set(cl.cache.vms) == before, "a failed poll is not evidence the guests vanished"
    assert cl.cache.last_update == stamp


async def test_vm_network_rate(monkeypatch, clock):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    res = load("cluster_resources.json")
    r.routes[("GET", "/cluster/resources")] = res
    await cl._fetch_metrics()
    vm = cl.cache.vms["pve1/100"]
    assert vm.network.rx_bytes_sec == 0.0, "first sample only seeds the tracker"
    clock[0] += 2.0
    res[2]["netin"], res[2]["netout"] = 1000 + 4000, 2000 + 2000
    await cl._fetch_metrics()
    assert vm.network.rx_bytes_sec == pytest.approx(2000.0)
    assert vm.network.tx_bytes_sec == pytest.approx(1000.0)
    # counter reset (guest rebooted): delta < 0 -> treat current as delta
    clock[0] += 2.0
    res[2]["netin"], res[2]["netout"] = 600, 400
    await cl._fetch_metrics()
    assert vm.network.rx_bytes_sec == pytest.approx(300.0)
    assert vm.network.tx_bytes_sec == pytest.approx(200.0)


async def test_callbacks_isolated_from_each_other(monkeypatch):
    cl, _ = make_cluster(monkeypatch)
    got = []

    async def bad(cid, cache):
        raise RuntimeError("x")

    async def good(cid, cache):
        got.append(cid)
    cl.add_callback(bad)
    cl.add_callback(good)
    await cl._notify_callbacks()
    assert got == ["c1"]


# ============================================================ disk configs

async def test_disk_configs_from_guest_config(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    disks = cl.cache.vms["pve1/100"].disks
    assert all(isinstance(d, DiskConfig) for d in disks)
    assert [(d.device, d.storage, d.size) for d in disks] == [
        ("efidisk0", "local-zfs", 1024 ** 2),
        ("scsi0", "local-zfs", 32 * 1024 ** 3),
        ("virtio1", "ceph-rbd", 1024 ** 4),
    ], "cdrom, scsihw, unused0 and net0 are not disks"
    ct = cl.cache.vms["pve2/200"].disks
    assert [(d.device, d.storage, d.size, d.format) for d in ct] == [
        ("mp0", "ceph-rbd", 512 * 1024 ** 2, "raw"),
        ("rootfs", "local-zfs", 8 * 1024 ** 3, "subvol"),
    ]


def test_qemu_disk_format_detection(monkeypatch):
    cl, _ = make_cluster(monkeypatch)
    assert cl._parse_qemu_disk("scsi0", "nfs:100/vm-100-disk-0.qcow2,size=10G").format == "qcow2"
    assert cl._parse_qemu_disk("sata0", "nfs:100/x.vmdk,size=1G").format == "vmdk"
    assert cl._parse_qemu_disk("scsi1", "nfs:100/x.raw,format=qcow2").format == "qcow2"
    assert cl._parse_qemu_disk("scsi2", "/dev/disk/by-id/ata-X") is None


@pytest.mark.parametrize("s,n", [
    ("32G", 32 * 1024 ** 3), ("1T", 1024 ** 4), ("512M", 512 * 1024 ** 2),
    ("4K", 4096), ("1.5G", int(1.5 * 1024 ** 3)), ("123", 123), ("32g", 32 * 1024 ** 3),
    ("garbage", 0),
])
def test_parse_size(monkeypatch, s, n):
    cl, _ = make_cluster(monkeypatch)
    assert cl._parse_size(s) == n


# ============================================================ tasks

def _upid(node, typ, vid, n=1):
    return f"UPID:{node}:0000{n:04X}:00AB{n:04X}:66F1A2B{n}:{typ}:{vid}:root@pam:"


async def test_running_tasks_parsing(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    mig = _upid("pve1", "qmigrate", "100", 1)
    mig5 = _upid("pve1", "qmigrate", "101", 2)
    start101 = _upid("pve2", "qmstart", "101", 3)
    dump = _upid("pve2", "vzdump", "", 4)
    apt = _upid("pve1", "aptupdate", "", 5)
    done = _upid("pve1", "qmstart", "102", 6)
    r.routes[("GET", "/cluster/tasks")] = [
        {"upid": mig, "type": "qmigrate", "id": "100", "node": "pve1", "user": "root@pam", "starttime": 10},
        {"upid": mig5, "type": "qmigrate", "id": "101", "node": "pve1", "user": "root@pam", "starttime": 11},
        {"upid": start101, "type": "qmstart", "id": "101", "node": "pve2", "user": "root@pam", "starttime": 12},
        {"upid": dump, "type": "vzdump", "id": "", "node": "pve2", "user": "root@pam", "starttime": 13},
        {"upid": apt, "type": "aptupdate", "id": "", "node": "pve1", "user": "root@pam", "starttime": 14},
        {"upid": done, "type": "qmstart", "id": "102", "node": "pve1", "user": "root@pam",
         "starttime": 1, "endtime": 2, "status": "OK"},
    ]
    q = lambda u: quote(u, safe="")
    r.routes[("GET", f"/nodes/pve1/tasks/{q(mig)}/status")] = {"status": "running", "type": "qmigrate"}
    r.routes[("GET", f"/nodes/pve1/tasks/{q(mig)}/log")] = [
        {"n": 1, "t": "2026-09-28 10:00:00 use dedicated network address for sending migration traffic (203.0.113.2)"},
        {"n": 2, "t": "2026-09-28 10:00:00 starting migration of VM 100 to node 'pve-2b' (203.0.113.2)"},
        {"n": 3, "t": "drive-scsi0: transferred 10.0 GiB of 52.0 GiB (19.23%) in 1m"},
        {"n": 4, "t": "drive-scsi0: transferred 50.3 GiB of 52.0 GiB (96.61%) in 12m 3s"},
    ]
    r.routes[("GET", f"/nodes/pve1/tasks/{q(mig5)}/log")] = [{"n": 1, "t": "drive-scsi0: (40%)"}]
    r.routes[("GET", f"/nodes/pve2/tasks/{q(dump)}/log")] = [
        {"n": 1, "t": "INFO: starting new backup job: vzdump 100 200 --storage pbs1"},
        {"n": 2, "t": "INFO: Starting Backup of VM 100 (qemu)"},
        {"n": 3, "t": "INFO: Finished Backup of VM 100 (00:01:02)"},
        {"n": 4, "t": "INFO: Starting Backup of VM 200 (lxc)"},
    ]
    await cl._fetch_running_tasks()

    # /cluster/tasks must be called with no params at all
    assert [kw for m, p, kw in r.calls if p == "/cluster/tasks"] == [{}]
    t = cl.cache.tasks
    assert set(t) == {mig, mig5, start101, dump}, "non-guest + finished tasks dropped"
    assert t[mig].target_node == "pve-2b"
    assert t[mig].progress == pytest.approx(96.61)
    assert t[mig].vmid == 100 and t[mig].vmtype == "qemu" and t[mig].status == "running"
    # qmstart for the same vmid on another node reveals the target
    assert t[mig5].target_node == "pve2"
    assert f"/nodes/pve1/tasks/{q(mig5)}/status" not in r.paths(), \
        "qmstart match must short-circuit the per-task status lookup"
    assert t[mig5].progress == pytest.approx(40.0)
    # vzdump: the guest currently being backed up is the last started, unfinished one
    assert (t[dump].vmid, t[dump].vmtype, t[dump].task_type) == (200, "lxc", "vzdump")


async def test_vzdump_with_everything_finished_is_not_tracked(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    dump = _upid("pve2", "vzdump", "", 4)
    r.routes[("GET", "/cluster/tasks")] = [
        {"upid": dump, "type": "vzdump", "id": "", "node": "pve2", "starttime": 13}]
    r.routes[("GET", f"/nodes/pve2/tasks/{quote(dump, safe='')}/log")] = [
        {"n": 1, "t": "INFO: Starting Backup of VM 100 (qemu)"},
        {"n": 2, "t": "INFO: Finished Backup of VM 100 (00:01:02)"},
    ]
    await cl._fetch_running_tasks()
    assert cl.cache.tasks == {}


async def test_ct_migrate_is_lxc_and_target_from_log(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    up = _upid("pve1", "vzmigrate", "200", 7)
    r.routes[("GET", "/cluster/tasks")] = [
        {"upid": up, "type": "vzmigrate", "id": "200", "node": "pve1", "starttime": 1}]
    r.routes[("GET", f"/nodes/pve1/tasks/{quote(up, safe='')}/log")] = [
        {"n": 1, "t": "2026-09-28 10:00:00 starting migration of CT 200 to node 'host-107' (203.0.113.7)"}]
    await cl._fetch_running_tasks()
    t = cl.cache.tasks[up]
    assert (t.vmtype, t.target_node) == ("lxc", "host-107")


# ============================================================ ceph

def ceph_routes(r: Router, status_file: str):
    r.routes[("GET", "/nodes/pve1/ceph/status")] = load(status_file)
    r.routes[("GET", "/nodes/pve1/ceph/mon")] = load("ceph_mon.json")
    r.routes[("GET", "/nodes/pve1/ceph/mgr")] = load("ceph_mgr.json")
    r.routes[("GET", "/nodes/pve1/ceph/mds")] = []
    r.routes[("GET", "/nodes/pve1/ceph/osd")] = load("ceph_osd_tree.json")
    r.routes[("GET", "/nodes/pve1/ceph/pool")] = load("ceph_pools.json")


async def test_ceph_legacy_status_shape(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    ceph_routes(r, "ceph_status_legacy.json")
    await full_poll(cl)
    c = cl.cache.ceph
    assert isinstance(c, CephMetrics)
    assert c.health == "HEALTH_WARN"
    assert [(m.name, m.state) for m in c.mons] == [
        ("pve1", "leader"), ("pve2", "peon"), ("pve3", "out")]
    assert c.mons[2].addr == "203.0.113.3:6789/0", "falls back to public_addr"
    assert [(m.name, m.host, m.active) for m in c.mgrs] == [
        ("pve1", "203.0.113.1", True), ("pve2", "203.0.113.2", False)]
    assert (c.mon_count, c.mgr_count) == (3, 2)
    # nested osdmap.osdmap unwrapped
    assert (c.osd_count, c.osd_up, c.osd_in) == (2, 1, 2)
    assert (c.total_bytes, c.used_bytes, c.available_bytes) == (1000, 100, 900)
    assert "/nodes/pve1/ceph/mon" not in r.paths(), "mons came from status"
    assert cl.cache.summary is not None


async def test_ceph_osds_and_pools(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    ceph_routes(r, "ceph_status_modern.json")
    await full_poll(cl)
    c = cl.cache.ceph
    assert [(o.id, o.name, o.status, o.in_cluster, o.host, o.total_bytes) for o in c.osds] == [
        (0, "osd.0", "up", True, "pve1", 1000), (1, "osd.1", "down", False, "pve2", 2000)]
    assert [(p.name, p.pool_id, p.min_size, p.application, p.crush_rule) for p in c.pools] == [
        (".mgr", 1, 2, "mgr", "replicated_rule"), ("rbd", 2, 2, "rbd", "replicated_rule")]
    assert (c.osd_count, c.osd_up, c.osd_in) == (3, 3, 3), "status counts win over tree"


async def test_ceph_modern_status_falls_back_to_mon_and_mgr_lists(monkeypatch):
    """Ceph >= Octopus trims monmap to {epoch, num_mons} and mgrmap to
    {available, num_standbys, ...}: names only exist in /ceph/mon + /ceph/mgr."""
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    ceph_routes(r, "ceph_status_modern.json")
    await full_poll(cl)
    c = cl.cache.ceph
    assert [m.name for m in c.mons] == ["pve1", "pve2", "pve3"]
    assert c.mon_count == 3
    assert [(m.name, m.active) for m in c.mgrs] == [
        ("pve1", True), ("pve2", False), ("pve3", False)]
    assert c.mgr_count == 3


async def test_ceph_modern_status_reports_exactly_one_leader(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    ceph_routes(r, "ceph_status_modern.json")
    await full_poll(cl)
    states = [m.state for m in cl.cache.ceph.mons]
    assert states.count("leader") == 1


async def test_no_ceph_backs_off(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)                     # no ceph routes -> every probe 501s
    await full_poll(cl)
    assert cl.cache.ceph is None
    probes = len(r.paths("/nodes/pve1/ceph")) + len(r.paths("/nodes/pve2/ceph"))
    assert probes == 2, "one status probe per online node"
    assert cl._ceph_skip_cycles == cm._CEPH_RECHECK_CYCLES
    r.calls.clear()
    await cl._fetch_ceph_data()
    assert r.paths("/nodes/") == [], "backed-off cycle must not probe"
    assert cl._ceph_skip_cycles == cm._CEPH_RECHECK_CYCLES - 1


async def test_ceph_io_refresh_updates_only_io(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    ceph_routes(r, "ceph_status_legacy.json")
    await full_poll(cl)
    mons_before = list(cl.cache.ceph.mons)
    st = load("ceph_status_legacy.json")
    st["pgmap"].update(read_bytes_sec=9, write_op_per_sec=99, bytes_used=500)
    st["health"]["status"] = "HEALTH_ERR"
    r.routes[("GET", "/nodes/pve1/ceph/status")] = st
    await cl._fetch_ceph_io()
    c = cl.cache.ceph
    assert (c.read_bytes_sec, c.write_ops_sec, c.used_bytes) == (9, 99, 500)
    assert c.health == "HEALTH_WARN", "io refresh does not touch health"
    assert c.mons == mons_before


# ============================================================ get_data

async def test_get_data_is_json_serialisable(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    ceph_routes(r, "ceph_status_legacy.json")
    await full_poll(cl)
    d = json.loads(json.dumps(cl.get_data()))
    assert d["id"] == "c1" and d["name"] == "prod"
    assert set(d) >= {"summary", "nodes", "vms", "storages", "ceph", "tasks",
                      "last_update", "client_health"}
    assert d["vms"]["pve1/100"]["status"] == "running"
    assert d["storages"]["pve2/pbs1"]["allowed_nodes"] == ["pve1"]
    assert d["nodes"]["pve1"]["node"] == "pve1"
    assert d["ceph"]["health"] == "HEALTH_WARN"
    assert list(d["client_health"]) == ["203.0.113.1:8006"]


async def test_get_data_merges_latest_telegraf_sample(monkeypatch):
    from server import influx_receiver
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    sample = types.SimpleNamespace(fields={"temp": 41.5})
    monkeypatch.setattr(influx_receiver, "get_all_hosts", lambda: ["pve1"])
    monkeypatch.setattr(influx_receiver, "get_host_metrics",
                        lambda h: {"sensors": [types.SimpleNamespace(fields={"temp": 1}), sample],
                                   "empty": []})
    d = cl.get_data()
    assert d["nodes"]["pve1"]["telegraf"] == {"sensors": {"temp": 41.5}}
    assert "telegraf" not in d["nodes"]["pve2"]


# ============================================================ ClusterManager

@pytest.fixture
def cfg_three(monkeypatch):
    from server import config as cfg_mod
    cfg = Config(clusters=[
        ClusterConfig(id="pveA", nodes=[PVENodeConfig(host="203.0.113.10")]),
        ClusterConfig(id="esx", type="esxi", nodes=[PVENodeConfig(host="203.0.113.20", port=443)],
                      auth=PVEAuthConfig(user="administrator@vsphere.local", password="x")),
        ClusterConfig(id="off", enabled=False, nodes=[PVENodeConfig(host="203.0.113.30")]),
    ])
    monkeypatch.setattr(cfg_mod, "_current_config", cfg)
    # never start real polling here
    from server.clusters.esxi import ESXiAdapter
    started = []

    async def fake_start(self):
        started.append(self.id)

    async def fake_stop(self):
        started.append("-" + self.id)
    monkeypatch.setattr(Cluster, "start", fake_start)
    monkeypatch.setattr(Cluster, "stop", fake_stop)
    monkeypatch.setattr(ESXiAdapter, "start", fake_start)
    monkeypatch.setattr(ESXiAdapter, "stop", fake_stop)
    return cfg, started


async def test_manager_splits_pve_and_adapters(cfg_three):
    m = ClusterManager()
    await m.load_clusters()
    assert set(m.clusters) == {"pveA"}
    assert set(m.adapters) == {"esx"}
    assert m.get_cluster("esx") is None, "adapters have no .client; never hand them to PVE handlers"
    assert m.get_cluster("off") is None
    assert isinstance(m.get_cluster("pveA"), Cluster)
    data = m.get_all_data()
    assert set(data["clusters"]) == {"pveA", "esx"}
    assert data["clusters"]["esx"]["type"] == "esxi"


async def test_manager_skips_broken_adapter_snapshot(cfg_three):
    m = ClusterManager()
    await m.load_clusters()

    def boom():
        raise RuntimeError("x")
    m.adapters["esx"].snapshot = boom
    assert set(m.get_all_data()["clusters"]) == {"pveA"}


async def test_sync_clusters_starts_and_stops(cfg_three):
    cfg, started = cfg_three
    m = ClusterManager()
    got = []

    async def cb(data):
        got.append(sorted(data["clusters"]))
    m.add_callback(cb)
    await m.sync_clusters()
    assert sorted(started) == ["esx", "pveA"]
    assert got == [["esx", "pveA"]]
    cfg.clusters[0].enabled = False
    cfg.clusters[1].enabled = False
    started.clear()
    await m.sync_clusters()
    assert sorted(started) == ["-esx", "-pveA"]
    assert m.clusters == {} and m.adapters == {}
    got.clear()
    await m.sync_clusters()            # nothing changed -> no broadcast
    assert got == []


async def test_global_summary(monkeypatch):
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    await full_poll(cl)
    m = ClusterManager()
    m.clusters = {"c1": cl}
    g = m.get_global_summary()
    assert g["total_clusters"] == 1
    assert (g["total_nodes"], g["total_vms"], g["total_vms_running"]) == (2, 1, 1)
    assert g["clusters"][0]["id"] == "c1"


async def test_manager_update_fanout_survives_bad_callback(monkeypatch):
    m = ClusterManager()
    got = []

    async def bad(_):
        raise RuntimeError("x")

    async def good(d):
        got.append(d)
    m.add_callback(bad)
    m.add_callback(good)
    await m._on_cluster_update("c1", None)
    await m._on_adapter_update("e", {})
    assert len(got) == 2 and all("clusters" in d for d in got)



async def test_ceph_mon_fallback_leader_is_lowest_rank_not_first_row(monkeypatch):
    """Real PVE 9.2.3 /ceph/mon order: the rank-0 mon (the leader, and
    quorum_names[0] in the status payload) came back as the LAST row, and every
    row carried quorum=1."""
    cl, r = make_cluster(monkeypatch)
    base_routes(r)
    ceph_routes(r, "ceph_status_modern.json")
    r.routes[("GET", "/nodes/pve1/ceph/mon")] = [
        {"name": "b", "host": "b", "rank": 1, "quorum": 1, "state": "running"},
        {"name": "c", "host": "c", "rank": 2, "quorum": 1, "state": "running"},
        {"name": "d", "host": "d", "rank": 3, "quorum": 0, "state": "stopped"},
        {"name": "a", "host": "a", "rank": 0, "quorum": 1, "state": "running"},
    ]
    await full_poll(cl)
    got = {m.name: m.state for m in cl.cache.ceph.mons}
    assert got == {"a": "leader", "b": "peon", "c": "peon", "d": "out"}
