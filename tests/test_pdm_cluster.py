"""Tests for PDM cluster ops: apt / ACME / HA / firewall / SDN / replication."""
from __future__ import annotations

import pytest
from aiohttp import web

from server import audit, auth, pdm_cluster
from server.middleware import request_id_middleware, make_auth_middleware


class _FakeVM:
    def __init__(self, vmid, node, type="qemu"):
        self.vmid = vmid; self.node = node
        self.name = f"vm-{vmid}"; self.tags = ""; self.type = type


class _FakeClient:
    def __init__(self):
        self.calls = []
        self.fail_next = None

    def _record(self, *args):
        self.calls.append(args)

    # apt
    async def list_apt_updates(self, node):
        return [{"Package": "openssl", "OldVersion": "1.1.1", "Version": "1.1.2"}]
    async def apt_refresh(self, node):
        self._record("apt_refresh", node); return f"UPID:apt-refresh-{node}"
    # No apt_upgrade(): PVE has no /nodes/{node}/apt/upgrade endpoint, and this
    # fake having one is why the dead handler was fully covered by tests while
    # returning 501 to every real operator (issue #3). A fake that implements a
    # method the real service lacks tests nothing. The live path now goes
    # through termproxy -- see tests/test_apt_upgrade_path.py.

    # ACME
    async def list_acme_accounts(self): return [{"name": "default"}]
    async def create_acme_account(self, *, name, contact, directory, tos_url=""):
        self._record("acme_create", name, contact); return "UPID:acme-create"
    async def request_acme_cert(self, node, *, force=False):
        self._record("acme_cert", node, force); return f"UPID:acme-cert-{node}"

    # HA
    async def list_ha_groups(self): return [{"group": "g1", "nodes": "node1,node2"}]
    async def create_ha_group(self, group, nodes, *, restricted=False, nofailback=False, comment=""):
        self._record("ha_group_create", group, nodes)
    async def delete_ha_group(self, group):
        self._record("ha_group_delete", group)
    async def list_ha_resources(self): return [{"sid": "vm:100", "state": "started"}]
    async def add_ha_resource(self, sid, *, group=None, state="started", comment=""):
        self._record("ha_resource_add", sid, group, state)
    async def delete_ha_resource(self, sid):
        self._record("ha_resource_delete", sid)

    # firewall
    async def list_cluster_firewall_rules(self): return [{"pos": 0, "action": "ACCEPT"}]
    async def add_cluster_firewall_rule(self, **kw):
        self._record("fw_cluster_add", kw)
    async def delete_cluster_firewall_rule(self, pos):
        self._record("fw_cluster_delete", pos)
    async def list_vm_firewall_rules(self, node, vmid, vm_type="qemu"):
        return [{"pos": 0, "action": "ACCEPT"}]
    async def add_vm_firewall_rule(self, node, vmid, vm_type, **kw):
        self._record("fw_vm_add", node, vmid, vm_type, kw)
    async def delete_vm_firewall_rule(self, node, vmid, vm_type, pos):
        self._record("fw_vm_delete", node, vmid, vm_type, pos)

    # SDN
    async def list_sdn_zones(self): return [{"zone": "evpn-1", "type": "evpn"}]
    async def list_sdn_vnets(self): return [{"vnet": "vnet-prod", "zone": "evpn-1"}]
    async def list_sdn_subnets(self, vnet): return [{"subnet": "10.10.0.0/24"}]
    async def reload_sdn(self):
        self._record("sdn_reload"); return "UPID:sdn-reload"

    # replication
    async def list_replication_jobs(self): return [{"id": "100-0", "target": "node2"}]
    async def create_replication_job(self, *, id, target, schedule, rate=None, comment=""):
        self._record("repl_create", id, target, schedule)
    async def delete_replication_job(self, job_id):
        self._record("repl_delete", job_id)


class _FakeCluster:
    def __init__(self):
        self.client = _FakeClient()
        class _Cache: pass
        self.cache = _Cache()
        self.cache.vms = {
            "node1/100": _FakeVM(100, "node1", "qemu"),
            "node1/300": _FakeVM(300, "node1", "lxc"),
        }


@pytest.fixture
def fake_cluster(monkeypatch, db_path):
    cluster = _FakeCluster()
    from server import cluster_manager as cm
    monkeypatch.setattr(cm.cluster_manager, "get_cluster",
                        lambda cid: cluster if cid == "cluster1" else None)
    return cluster


def _make_app(*, auth_enabled=False):
    from server.config import Config, AuthConfig, VmControlConfig, ServerConfig, AlertConfig, UIConfig
    from server import config as cfg_mod
    cfg_mod._current_config = Config(
        server=ServerConfig(), clusters=[], alerts=AlertConfig(), ui=UIConfig(),
        auth=AuthConfig(enabled=auth_enabled, backend="local", db_path="/tmp/never"),
        vm_control=VmControlConfig(),
    )
    app = web.Application(middlewares=[request_id_middleware, make_auth_middleware(auth_enabled)])
    for method, path, handler in pdm_cluster.ROUTES:
        app.router.add_route(method, path, handler)
    return app


# ---------------------------------------------------------------- apt

@pytest.mark.asyncio
async def test_apt_list(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/nodes/node1/apt")
    assert r.status == 200
    body = await r.json()
    assert body["updates"][0]["Package"] == "openssl"


@pytest.mark.asyncio
async def test_apt_refresh_audited(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/nodes/node1/apt/refresh")
    assert r.status == 200
    rows = await audit.query(action="apt.refresh")
    assert any(r["target"] == "cluster1/node1" for r in rows)


# ---------------------------------------------------------------- ACME

@pytest.mark.asyncio
async def test_acme_accounts_list(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/acme/accounts")
    assert r.status == 200


@pytest.mark.asyncio
async def test_acme_account_create_missing_fields(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/acme/accounts", json={"name": "x"})
    assert r.status == 400


@pytest.mark.asyncio
async def test_acme_account_create_audited(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/acme/accounts",
                          json={"name": "default", "contact": "ops@example.com"})
    assert r.status == 200
    rows = await audit.query(action="acme.account.create")
    assert rows


@pytest.mark.asyncio
async def test_acme_cert_request(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/nodes/node1/acme/cert",
                          json={"force": True})
    assert r.status == 200
    body = await r.json()
    assert body["upid"]


# ---------------------------------------------------------------- HA

@pytest.mark.asyncio
async def test_ha_groups_list(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/ha/groups")
    assert r.status == 200
    body = await r.json()
    assert body["groups"][0]["group"] == "g1"


@pytest.mark.asyncio
async def test_ha_group_create_then_delete(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/ha/groups",
                          json={"group": "g2", "nodes": "node1,node2"})
    assert r.status == 200
    r = await client.delete("/api/clusters/cluster1/ha/groups/g2")
    assert r.status == 200
    actions = [c[0] for c in fake_cluster.client.calls]
    assert "ha_group_create" in actions and "ha_group_delete" in actions


@pytest.mark.asyncio
async def test_ha_resource_add(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/ha/resources",
                          json={"sid": "vm:200", "group": "g1"})
    assert r.status == 200
    rows = await audit.query(action="ha.resource.add")
    assert any(r["target"] == "cluster1/vm:200" for r in rows)


@pytest.mark.asyncio
async def test_ha_resource_add_missing_sid(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/ha/resources", json={})
    assert r.status == 400


# ---------------------------------------------------------------- firewall

@pytest.mark.asyncio
async def test_fw_cluster_add_validates_action(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/firewall/rules",
                          json={"action": "ALLOW"})  # invalid
    assert r.status == 400


@pytest.mark.asyncio
async def test_fw_cluster_add_audited(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/firewall/rules",
                          json={"action": "ACCEPT", "type": "in", "source": "10.0.0.0/8"})
    assert r.status == 200
    rows = await audit.query(action="firewall.cluster.add")
    assert rows


@pytest.mark.asyncio
async def test_fw_cluster_delete(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.delete("/api/clusters/cluster1/firewall/rules/3")
    assert r.status == 200
    assert ("fw_cluster_delete", 3) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_fw_vm_add_dispatches_to_correct_type(fake_cluster, aiohttp_client):
    """vmid 300 is LXC — audit should say firewall.lxc.add, not vm."""
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/vms/300/firewall/rules",
                          json={"action": "ACCEPT"})
    assert r.status == 200
    rows = await audit.query(action="firewall.lxc.add")
    assert rows


@pytest.mark.asyncio
async def test_fw_vm_unknown_vm_404(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/vms/9999/firewall/rules")
    assert r.status == 404


# ---------------------------------------------------------------- SDN

@pytest.mark.asyncio
async def test_sdn_zones_list(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/sdn/zones")
    assert r.status == 200
    body = await r.json()
    assert body["zones"][0]["zone"] == "evpn-1"


@pytest.mark.asyncio
async def test_sdn_subnets_list(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/sdn/vnets/vnet-prod/subnets")
    assert r.status == 200


@pytest.mark.asyncio
async def test_sdn_reload_audited(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/sdn/reload")
    assert r.status == 200
    rows = await audit.query(action="sdn.reload")
    assert rows


# ---------------------------------------------------------------- replication

@pytest.mark.asyncio
async def test_repl_list(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.get("/api/clusters/cluster1/replication")
    assert r.status == 200


@pytest.mark.asyncio
async def test_repl_create_missing_fields(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/replication", json={"id": "x"})
    assert r.status == 400


@pytest.mark.asyncio
async def test_repl_create_then_delete(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    r = await client.post("/api/clusters/cluster1/replication",
                          json={"id": "100-0", "target": "node2", "schedule": "*/15"})
    assert r.status == 200
    r = await client.delete("/api/clusters/cluster1/replication/100-0")
    assert r.status == 200
    rows = await audit.query(action="replication.delete")
    assert rows


# ---------------------------------------------------------------- 404

@pytest.mark.asyncio
async def test_unknown_cluster_404(fake_cluster, aiohttp_client):
    client = await aiohttp_client(_make_app())
    for path in [
        "/api/clusters/unknown/nodes/n/apt",
        "/api/clusters/unknown/acme/accounts",
        "/api/clusters/unknown/ha/groups",
        "/api/clusters/unknown/firewall/rules",
        "/api/clusters/unknown/sdn/zones",
        "/api/clusters/unknown/replication",
    ]:
        r = await client.get(path)
        assert r.status == 404, f"{path} returned {r.status}"
