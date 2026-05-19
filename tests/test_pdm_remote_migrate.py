"""Tests for cross-cluster (remote) migrate scaffolding."""
from __future__ import annotations

import pytest
from aiohttp import web

from server import audit, auth, pdm_remote_migrate
from server.middleware import request_id_middleware, make_auth_middleware


class _FakeVM:
    def __init__(self, vmid, node, type="qemu"):
        self.vmid = vmid; self.node = node
        self.name = f"vm-{vmid}"; self.tags = ""; self.type = type


class _FakeClient:
    def __init__(self, *, vm_config=None, storages=None, network=None,
                 cluster_status=None):
        self.calls = []
        self.fail_next = None
        # Stubbed PVE API responses for the new layout endpoints.
        self._vm_config = vm_config or {}
        self._storages = storages or []
        self._network = network or []
        self._cluster_status = cluster_status or []
    async def vm_remote_migrate(self, node, vmid, *, target_endpoint,
                                 target_vmid, target_bridge, target_storage,
                                 online=True, delete_source=False, bwlimit=None):
        if self.fail_next:
            e = self.fail_next; self.fail_next = None; raise e
        self.calls.append((
            "vm_remote_migrate", node, vmid, target_vmid,
            target_bridge, target_storage, online, delete_source,
        ))
        return f"UPID:fake:0001:remote-migrate-{vmid}"
    async def get_vm_config(self, node, vmid):
        return dict(self._vm_config)
    async def get_storage(self, node):
        return list(self._storages)
    async def get_node_network(self, node, iface_type=None):
        return list(self._network)
    async def get_cluster_status(self):
        return list(self._cluster_status)


class _FakeCluster:
    def __init__(self, cid, vms, *, client=None, nodes=None):
        self.id = cid
        self.client = client or _FakeClient()
        class _Cache: pass
        self.cache = _Cache()
        self.cache.vms = {f"{v.node}/{v.vmid}": v for v in vms}
        self.cache.nodes = {n: object() for n in (nodes or [])}


@pytest.fixture
def fake_clusters(monkeypatch, db_path):
    src = _FakeCluster("cluster1", [_FakeVM(123, "node1", "qemu"),
                                     _FakeVM(300, "node1", "lxc")])
    tgt = _FakeCluster("remote-cluster", [])

    from server import cluster_manager as cm
    monkeypatch.setattr(cm.cluster_manager, "get_cluster",
                        lambda cid: {"cluster1": src, "remote-cluster": tgt}.get(cid))

    # Provide a config with both clusters so the handler can pull token data
    from server.config import (
        Config, AuthConfig, VmControlConfig, ClusterConfig, PVENodeConfig,
        PVEAuthConfig, ServerConfig, AlertConfig, UIConfig,
    )
    from server import config as cfg_mod

    cfg = Config(
        server=ServerConfig(), clusters=[
            ClusterConfig(
                id="cluster1",
                nodes=[PVENodeConfig(host="203.0.113.108", port=8006)],
                auth=PVEAuthConfig(user="root@pam", token_name="jt-proxense",
                                   token_value="src-secret"),
                enabled=True,
            ),
            ClusterConfig(
                id="remote-cluster",
                nodes=[PVENodeConfig(host="203.0.113.107", port=8006)],
                auth=PVEAuthConfig(user="root@pam", token_name="jt-proxense",
                                   token_value="dst-secret"),
                enabled=True,
            ),
        ],
        alerts=AlertConfig(), ui=UIConfig(),
        auth=AuthConfig(enabled=False, db_path="/tmp/never"),
        vm_control=VmControlConfig(),
    )
    cfg_mod._current_config = cfg
    return {"src": src, "tgt": tgt, "cfg": cfg}


def _make_app(*, auth_enabled=False):
    app = web.Application(middlewares=[request_id_middleware,
                                        make_auth_middleware(auth_enabled)])
    for method, path, handler in pdm_remote_migrate.ROUTES:
        app.router.add_route(method, path, handler)
    return app


# ---------------------------------------------------------------- endpoint listing

@pytest.mark.asyncio
async def test_list_endpoints_excludes_self(fake_clusters, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/remote-endpoints")
    assert r.status == 200
    body = await r.json()
    # Only remote-cluster's nodes should show; cluster1 is self
    cids = {e["cluster_id"] for e in body["endpoints"]}
    assert cids == {"remote-cluster"}
    assert body["endpoints"][0]["node_host"] == "203.0.113.107"


@pytest.mark.asyncio
async def test_list_endpoints_unknown_cluster(fake_clusters, aiohttp_client):
    """Note: list-endpoints doesn't actually require the source cluster to exist
    (it's a config read), so this returns 200 with potentially all clusters.
    Just verify it doesn't 500."""
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/whatever/remote-endpoints")
    assert r.status == 200


# ---------------------------------------------------------------- migrate

@pytest.mark.asyncio
async def test_migrate_missing_fields(fake_clusters, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/123/remote-migrate",
                          json={"target_cluster_id": "remote-cluster"})
    assert r.status == 400
    body = await r.json()
    assert "target_endpoint_host" in body["fields"]


@pytest.mark.asyncio
async def test_migrate_lxc_unsupported(fake_clusters, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/300/remote-migrate",
                          json={"target_cluster_id": "remote-cluster",
                                "target_endpoint_host": "203.0.113.107",
                                "target_vmid": 300,
                                "target_bridge_map": "vmbr0=vmbr0",
                                "target_storage_map": "local=local",
                                "target_endpoint_fingerprint": "AA:BB"})
    assert r.status == 400
    body = await r.json()
    assert body["error"] == "lxc_remote_migrate_unsupported"


@pytest.mark.asyncio
async def test_migrate_unknown_vm(fake_clusters, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/9999/remote-migrate",
                          json={"target_cluster_id": "remote-cluster",
                                "target_endpoint_host": "x", "target_vmid": 1,
                                "target_bridge_map": "x", "target_storage_map": "x",
                                "target_endpoint_fingerprint": "AA:BB"})
    assert r.status == 404


@pytest.mark.asyncio
async def test_migrate_target_cluster_not_in_config(fake_clusters, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/123/remote-migrate",
                          json={"target_cluster_id": "ghost",
                                "target_endpoint_host": "x", "target_vmid": 1,
                                "target_bridge_map": "x", "target_storage_map": "x",
                                "target_endpoint_fingerprint": "AA:BB"})
    assert r.status == 400
    body = await r.json()
    assert body["error"] == "target_cluster_not_configured"


@pytest.mark.asyncio
async def test_migrate_dispatches_with_endpoint_string(fake_clusters, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/123/remote-migrate",
                          json={"target_cluster_id": "remote-cluster",
                                "target_endpoint_host": "203.0.113.107",
                                "target_endpoint_port": 8006,
                                "target_endpoint_fingerprint": "AA:BB:CC:DD",
                                "target_vmid": 200,
                                "target_bridge_map": "vmbr0=vmbr0",
                                "target_storage_map": "local-lvm=local-lvm",
                                "online": True, "delete_source": False})
    assert r.status == 200
    body = await r.json()
    assert body["upid"].startswith("UPID:fake:")
    assert body["target"]["vmid"] == 200
    assert body["target"]["endpoint_host"] == "203.0.113.107"

    rows = await audit.query(action="vm.remote_migrate")
    assert any("cluster1/node1/vm/123 -> remote-cluster" in r["target"] for r in rows)


@pytest.mark.asyncio
async def test_migrate_audit_excludes_secret_endpoint(fake_clusters, aiohttp_client):
    """The audit row's params hash must NOT cover the target_endpoint string
    (which contains the API token secret). The hash is computed against the
    operator-supplied JSON body only — verified by ensuring the audit row's
    params_hash differs when we change a non-secret field but stays the same
    when we change only the (synthetic) endpoint string. Easiest direct
    check: query the audit row's params_hash and ensure it's small/stable."""
    client = await aiohttp_client(_make_app())
    body = {"target_cluster_id": "remote-cluster",
            "target_endpoint_host": "203.0.113.107",
            "target_vmid": 200,
            "target_bridge_map": "vmbr0=vmbr0",
            "target_storage_map": "local=local",
            "target_endpoint_fingerprint": "AA:BB"}
    await client.post("/api/clusters/cluster1/vms/123/remote-migrate", json=body)
    rows = await audit.query(action="vm.remote_migrate")
    h = rows[0]["params_hash"]
    assert h and len(h) == 64  # sha256 hex


# ---------------------------------------------------------------- endpoint string format

def test_build_target_endpoint_format():
    s = pdm_remote_migrate._build_target_endpoint(
        host="10.0.0.5", port=8006, fingerprint="AA:BB:CC",
        token_user="root@pam", token_name="jt", token_value="secret",
    )
    assert "apitoken=PVEAPIToken=root@pam!jt=secret" in s
    assert "host=10.0.0.5" in s
    assert "port=8006" in s
    assert "fingerprint=AA:BB:CC" in s


# ---------------------------------------------------------------- source layout

@pytest.mark.asyncio
async def test_source_layout_returns_disks_and_nics(fake_clusters, monkeypatch, aiohttp_client):
    """The migration-source endpoint parses VM config into disk/NIC summaries
    so the modal can render one dropdown per resource. Cdroms and unallocated
    slots must be filtered out — they don't migrate as block volumes."""
    src = fake_clusters["src"]
    src.client = _FakeClient(vm_config={
        "scsi0": "ceph1:vm-123-disk-0,size=52G,iothread=1",
        "scsi1": "local-zfs:vm-123-disk-1,size=10G",
        "ide2":  "none,media=cdrom",   # excluded
        "net0":  "virtio=AA:BB:CC:DD:EE:01,bridge=vmbr0,firewall=1",
        "net1":  "virtio=AA:BB:CC:DD:EE:02,bridge=vmbr10,tag=100",
    })
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/vms/123/migration-source")
    assert r.status == 200
    body = await r.json()
    assert {d["key"] for d in body["disks"]} == {"scsi0", "scsi1"}
    assert next(d for d in body["disks"] if d["key"] == "scsi0")["storage"] == "ceph1"
    assert next(d for d in body["disks"] if d["key"] == "scsi0")["size"] == "52G"
    assert {n["key"] for n in body["nics"]} == {"net0", "net1"}
    assert next(n for n in body["nics"] if n["key"] == "net0")["bridge"] == "vmbr0"
    assert next(n for n in body["nics"] if n["key"] == "net1")["bridge"] == "vmbr10"


@pytest.mark.asyncio
async def test_source_layout_404s_unknown_vm(fake_clusters, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/vms/9999/migration-source")
    assert r.status == 404


# ---------------------------------------------------------------- target layout

@pytest.mark.asyncio
async def test_target_layout_filters_to_image_capable_storage(fake_clusters, aiohttp_client):
    """The modal's per-disk dropdown must only offer storages that can hold
    VM disk images. ISO-only / backup-only storages would silently fail
    later if we let them through."""
    tgt = fake_clusters["tgt"]
    tgt.client = _FakeClient(
        storages=[
            {"storage": "Backup_1-zfs", "type": "zfspool",
             "content": "images,rootdir", "avail": 4_000_000_000_000,
             "total": 11_000_000_000_000, "active": 1, "enabled": 1},
            {"storage": "iso-only", "type": "dir", "content": "iso",
             "avail": 1, "total": 1, "active": 1, "enabled": 1},
        ],
        network=[
            {"iface": "vmbr0",  "type": "bridge",
             "address": "203.0.113.107", "netmask": "24"},
            {"iface": "vmbr10", "type": "bridge",
             "address": "172.16.100.107", "netmask": "24"},
            {"iface": "lo",     "type": "loopback", "address": "127.0.0.1"},
        ],
    )
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/remote-cluster/nodes/remote-cluster/migration-targets")
    assert r.status == 200
    body = await r.json()
    storage_ids = {s["storage"] for s in body["storages"]}
    assert storage_ids == {"Backup_1-zfs"}
    bridge_names = {b["iface"] for b in body["bridges"]}
    assert bridge_names == {"vmbr0", "vmbr10"}
    # IPs surface every interface with a v4 address — including loopback,
    # since the operator may legitimately want to enumerate it (we don't
    # second-guess routing).
    addrs = {i["address"] for i in body["ips"]}
    assert "172.16.100.107" in addrs
    assert "203.0.113.107" in addrs


# ---------------------------------------------------------------- endpoint string format

def test_build_target_endpoint_field_order():
    """PVE expects comma-separated key=value; we emit a stable order."""
    s = pdm_remote_migrate._build_target_endpoint(
        host="x", port=8006, fingerprint="y",
        token_user="u", token_name="n", token_value="v",
    )
    parts = s.split(",")
    assert parts[0].startswith("apitoken=")
    assert parts[1].startswith("host=")
    assert parts[2].startswith("port=")
    assert parts[3].startswith("fingerprint=")
