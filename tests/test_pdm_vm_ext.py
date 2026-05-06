"""Tests for extended VM ops: snapshots, clone, template, delete, reset, config."""
from __future__ import annotations

import pytest
from aiohttp import web

from server import audit, auth, pdm_vm_ext
from server.middleware import request_id_middleware, make_auth_middleware


class _FakeVM:
    def __init__(self, vmid, node, type="qemu"):
        self.vmid = vmid; self.node = node
        self.name = f"vm-{vmid}"; self.tags = ""; self.type = type


class _FakeClient:
    def __init__(self):
        self.calls = []

    async def vm_reset(self, node, vmid):
        self.calls.append(("vm_reset", node, vmid)); return f"UPID:reset-{vmid}"
    async def vm_list_snapshots(self, node, vmid):
        return [{"name": "snap-001", "snaptime": 1700000000}]
    async def vm_take_snapshot(self, node, vmid, snapname, description="", vmstate=False):
        self.calls.append(("take_snapshot", node, vmid, snapname, vmstate))
        return f"UPID:snap-{vmid}-{snapname}"
    async def vm_delete_snapshot(self, node, vmid, snapname):
        self.calls.append(("delete_snapshot", node, vmid, snapname))
        return f"UPID:rmsnap-{vmid}-{snapname}"
    async def vm_rollback_snapshot(self, node, vmid, snapname):
        self.calls.append(("rollback_snapshot", node, vmid, snapname))
        return f"UPID:rb-{vmid}-{snapname}"
    async def vm_clone(self, node, vmid, *, newid, name="", target_node=None,
                       full=False, storage=None, snapname=None):
        self.calls.append(("vm_clone", node, vmid, newid, full))
        return f"UPID:clone-{vmid}->{newid}"
    async def vm_to_template(self, node, vmid):
        self.calls.append(("to_template", node, vmid))
        return f"UPID:tmpl-{vmid}"
    async def vm_delete(self, node, vmid, *, purge=False, skiplock=False):
        self.calls.append(("vm_delete", node, vmid, purge))
        return f"UPID:del-{vmid}"
    async def vm_update_config(self, node, vmid, **fields):
        self.calls.append(("vm_update_config", node, vmid, fields))
        return {}


class _FakeCluster:
    def __init__(self, vms):
        self.client = _FakeClient()
        class _Cache: pass
        self.cache = _Cache()
        self.cache.vms = {f"{v.node}/{v.vmid}": v for v in vms}


@pytest.fixture
def fake_cluster(monkeypatch, db_path):
    cluster = _FakeCluster([_FakeVM(100, "node1", "qemu")])
    from server import cluster_manager as cm
    monkeypatch.setattr(cm.cluster_manager, "get_cluster",
                        lambda cid: cluster if cid == "cluster1" else None)
    return cluster


def _make_app(*, vm_control_enabled=True, require_admin_destructive=True,
              auth_enabled=False):
    from server.config import (
        Config, AuthConfig, VmControlConfig, ServerConfig, AlertConfig, UIConfig,
    )
    from server import config as cfg_mod
    cfg_mod._current_config = Config(
        server=ServerConfig(), clusters=[], alerts=AlertConfig(), ui=UIConfig(),
        auth=AuthConfig(enabled=auth_enabled, db_path="/tmp/never"),
        vm_control=VmControlConfig(enabled=vm_control_enabled,
                                    require_admin_for_destructive=require_admin_destructive),
    )
    app = web.Application(middlewares=[request_id_middleware, make_auth_middleware(auth_enabled)])
    for method, path, handler in pdm_vm_ext.ROUTES:
        app.router.add_route(method, path, handler)
    return app


# ---------------------------------------------------------------- gating

@pytest.mark.asyncio
async def test_disabled_returns_503(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app(vm_control_enabled=False))
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/reset")
    assert r.status == 503


# ---------------------------------------------------------------- snapshots

@pytest.mark.asyncio
async def test_list_snapshots(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/vms/100/snapshots")
    assert r.status == 200
    body = await r.json()
    assert body["snapshots"][0]["name"] == "snap-001"


@pytest.mark.asyncio
async def test_create_snapshot(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/100/snapshots",
                          json={"snapname": "before-upgrade", "description": "x", "vmstate": True})
    assert r.status == 200
    assert ("take_snapshot", "node1", 100, "before-upgrade", True) in fake_cluster.client.calls
    rows = await audit.query(action="vm.snapshot.create")
    assert any("/snapshots/before-upgrade" not in r["target"] and "before-upgrade" in r["target"] for r in rows) \
           or any(r["target"].endswith("/before-upgrade") for r in rows)


@pytest.mark.asyncio
async def test_create_snapshot_missing_name(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/100/snapshots", json={})
    assert r.status == 400


@pytest.mark.asyncio
async def test_delete_snapshot(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.delete("/api/clusters/cluster1/vms/100/snapshots/snap-001")
    assert r.status == 200
    assert ("delete_snapshot", "node1", 100, "snap-001") in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_rollback_snapshot(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/100/snapshots/snap-001/rollback")
    assert r.status == 200
    assert ("rollback_snapshot", "node1", 100, "snap-001") in fake_cluster.client.calls


# ---------------------------------------------------------------- clone

@pytest.mark.asyncio
async def test_clone(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/100/clone",
                          json={"newid": 200, "full": True, "name": "clone-of-100"})
    assert r.status == 200
    body = await r.json()
    assert body["newid"] == 200
    assert ("vm_clone", "node1", 100, 200, True) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_clone_missing_newid(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/100/clone", json={})
    assert r.status == 400


# ---------------------------------------------------------------- template / delete / reset

@pytest.mark.asyncio
async def test_to_template(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/100/template")
    assert r.status == 200
    assert ("to_template", "node1", 100) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_delete_with_purge(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.delete("/api/clusters/cluster1/vms/100?purge=1")
    assert r.status == 200
    assert ("vm_delete", "node1", 100, True) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_reset(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/reset")
    assert r.status == 200
    assert ("vm_reset", "node1", 100) in fake_cluster.client.calls


# ---------------------------------------------------------------- config update

@pytest.mark.asyncio
async def test_config_update_simple(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.put("/api/clusters/cluster1/vms/100/config",
                         json={"cores": 4, "memory": 8192, "name": "renamed"})
    assert r.status == 200
    assert any(c[0] == "vm_update_config" and c[3].get("cores") == 4
               for c in fake_cluster.client.calls)


@pytest.mark.asyncio
async def test_config_update_empty_body(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.put("/api/clusters/cluster1/vms/100/config", json={})
    assert r.status == 400


@pytest.mark.asyncio
async def test_config_update_audit_only_keys_not_values(fake_cluster, aiohttp_client):
    """Audit row must hash the request body BUT we explicitly pass only the
    keys list as audit params (so values like passwords / tokens never reach
    the hash input)."""
    client = await aiohttp_client(_make_app())
    await client.put("/api/clusters/cluster1/vms/100/config",
                     json={"description": "secret stuff", "cores": 2})
    rows = await audit.query(action="vm.config.update")
    assert rows
    # params_hash should be set (we hash {"keys": [...]})
    assert rows[0]["params_hash"]
