"""Slow-changing data is fetched on its own cadence, not on every poll."""
from __future__ import annotations

import pytest

from server import cluster_manager as cm
from server.config import ClusterConfig, PVENodeConfig
from server.models import VMMetrics


class Client:
    def __init__(self):
        self.rrd = 0
        self.status = 0
        self.configs: list[int] = []

    async def get_node_status(self, node):
        self.status += 1
        return {"kversion": "k", "pveversion": "p", "wait": 0.01}

    async def get_node_rrddata(self, node, timeframe, cf):
        self.rrd += 1
        return [{"netin": 100.0, "netout": 50.0}]

    async def get_vm_config(self, node, vmid):
        self.configs.append(vmid)
        return {"scsi0": f"ceph1:vm-{vmid}-disk-0,size=8G"}

    async def get_container_config(self, node, vmid):
        self.configs.append(vmid)
        return {"rootfs": f"ceph1:subvol-{vmid}-disk-0,size=8G"}


@pytest.fixture
def cluster(monkeypatch):
    c = cm.Cluster(ClusterConfig(id="t", nodes=[PVENodeConfig(host="h")]))
    c.client = Client()
    return c


NODE = {"node": "n1", "status": "online", "cpu": 0.1, "maxcpu": 4,
        "mem": 1, "maxmem": 2, "disk": 1, "maxdisk": 2}


async def test_node_rrd_is_not_refetched_every_poll(cluster, monkeypatch):
    clock = [1000.0]
    monkeypatch.setattr(cm.time, "monotonic", lambda: clock[0])
    for _ in range(10):                          # ten polls, 2 s apart
        await cluster._update_node_metrics(NODE)
        clock[0] += 2
    assert cluster.client.status == 10           # live status stays per-poll
    assert cluster.client.rrd == 1               # RRD only once in 20 s
    assert cluster.cache.nodes["n1"].network.rx_bytes_sec == 100.0
    clock[0] += cm.NODE_RRD_REFRESH_S
    await cluster._update_node_metrics(NODE)
    assert cluster.client.rrd == 2


async def test_disk_configs_are_read_when_due_not_every_refresh(cluster, monkeypatch):
    clock = [1000.0]
    monkeypatch.setattr(cm.time, "monotonic", lambda: clock[0])
    monkeypatch.setattr(cm.random, "uniform", lambda a, b: 1.0)
    for vmid in (100, 101):
        cluster.cache.vms[f"n1/{vmid}"] = VMMetrics(vmid=vmid, name="", node="n1",
                                                     cluster_id="t")
    await cluster._fetch_vm_disk_configs()
    assert sorted(cluster.client.configs) == [100, 101]
    assert cluster.cache.vms["n1/100"].disks[0].storage == "ceph1"

    clock[0] += 60                               # next static refresh
    await cluster._fetch_vm_disk_configs()
    assert len(cluster.client.configs) == 2      # nothing due

    # a migrated guest re-keys to its new node and is read on arrival
    cluster.cache.vms["n2/100"] = cluster.cache.vms.pop("n1/100")
    cluster.cache.vms["n2/100"].node = "n2"
    clock[0] += 60
    await cluster._fetch_vm_disk_configs()
    assert cluster.client.configs[-1] == 100 and len(cluster.client.configs) == 3
    assert "n1/100" not in cluster._disk_due     # stale key forgotten

    clock[0] += cm.DISK_CONFIG_MAX_AGE_S
    await cluster._fetch_vm_disk_configs()
    assert len(cluster.client.configs) == 5      # both due again
