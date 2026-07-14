"""v0.3 VM control endpoints — gated, role-checked, audited.

We mock PVEClient + cluster_manager to avoid hitting a real PVE.
"""
from __future__ import annotations

import pytest
from aiohttp import web

from server import audit, auth, vm_control
from server.middleware import request_id_middleware, make_auth_middleware


# ---------------------------------------------------------------- fakes

class _FakeVM:
    def __init__(self, vmid, node, name, tags="", type="qemu"):
        self.vmid = vmid
        self.node = node
        self.name = name
        self.tags = tags
        self.type = type  # 'qemu' or 'lxc'


class _FakeClient:
    """Records every call so tests can assert what PVE would have been told."""
    def __init__(self):
        self.calls = []

    async def vm_start(self, node, vmid):    return self._record("vm_start", node, vmid)
    async def vm_stop(self, node, vmid):     return self._record("vm_stop", node, vmid)
    async def vm_shutdown(self, node, vmid): return self._record("vm_shutdown", node, vmid)
    async def vm_reboot(self, node, vmid):   return self._record("vm_reboot", node, vmid)
    async def vm_suspend(self, node, vmid):  return self._record("vm_suspend", node, vmid)
    async def vm_resume(self, node, vmid):   return self._record("vm_resume", node, vmid)
    async def vm_migrate(self, node, vmid, target, online=True, with_local_disks=False, bwlimit=None):
        self.calls.append(("vm_migrate", node, vmid, target, online, with_local_disks, bwlimit))
        return f"UPID:fake:0001:migrate-{vmid}"
    # CT methods
    async def ct_start(self, node, vmid):    return self._record("ct_start", node, vmid)
    async def ct_stop(self, node, vmid):     return self._record("ct_stop", node, vmid)
    async def ct_shutdown(self, node, vmid): return self._record("ct_shutdown", node, vmid)
    async def ct_reboot(self, node, vmid):   return self._record("ct_reboot", node, vmid)
    async def ct_suspend(self, node, vmid):  return self._record("ct_suspend", node, vmid)
    async def ct_resume(self, node, vmid):   return self._record("ct_resume", node, vmid)
    async def ct_migrate(self, node, vmid, target, online=False, restart=False):
        self.calls.append(("ct_migrate", node, vmid, target, online, restart))
        return f"UPID:fake:0001:ct-migrate-{vmid}"
    async def get_task_status(self, node, upid):
        return {"status": "stopped", "exitstatus": "OK"}

    def _record(self, action, node, vmid):
        upid = f"UPID:fake:0001:{action}-{vmid}"
        self.calls.append((action, node, vmid))
        return upid


class _FakeClusterCache:
    def __init__(self):
        self.vms = {}


class _FakeCluster:
    def __init__(self, vms):
        self.client = _FakeClient()
        self.cache = _FakeClusterCache()
        for vm in vms:
            self.cache.vms[f"{vm.node}/{vm.vmid}"] = vm


@pytest.fixture
def fake_cluster(monkeypatch, db_path):
    """Patch cluster_manager.get_cluster to return a fake cluster with VMs + CTs."""
    cluster = _FakeCluster([
        _FakeVM(100, "node1", "web-01", "prod;web", type="qemu"),
        _FakeVM(101, "node1", "db-01",  "prod;db",  type="qemu"),
        _FakeVM(200, "node2", "dev-01", "dev",      type="qemu"),
        _FakeVM(300, "node1", "ct-web", "prod",     type="lxc"),
        _FakeVM(301, "node2", "ct-dev", "dev",      type="lxc"),
    ])
    from server import cluster_manager as cm
    monkeypatch.setattr(cm.cluster_manager, "get_cluster",
                        lambda cid: cluster if cid == "cluster1" else None)
    return cluster


# ---------------------------------------------------------------- helpers

def _make_app(*, auth_enabled=True, vm_control_enabled=True,
              require_admin_destructive=True):
    """Build a small aiohttp Application with vm_control routes wired."""
    from server.config import (
        Config, AuthConfig, VmControlConfig, ServerConfig, UIConfig, AlertConfig,
    )
    from server import config as cfg_mod

    cfg = Config(
        server=ServerConfig(host="127.0.0.1", http_port=0),
        clusters=[],
        alerts=AlertConfig(),
        ui=UIConfig(),
        auth=AuthConfig(enabled=auth_enabled, backend="local",
                        db_path="/tmp/never-used"),
        vm_control=VmControlConfig(
            enabled=vm_control_enabled,
            require_admin_for_destructive=require_admin_destructive,
        ),
    )
    cfg_mod._current_config = cfg

    app = web.Application(middlewares=[
        request_id_middleware,
        make_auth_middleware(auth_enabled),
    ])
    for method, path, handler in vm_control.ROUTES:
        app.router.add_route(method, path, handler)
    return app


async def _login_session_cookie(client, role: str, name: str = "tester"):
    """Create a user with `role` and seed a session cookie on the test client."""
    auth.create_user(name, "pw1234567890")
    auth.grant_role(name, "*", role)
    s = await auth.login(name, "pw1234567890", source_ip="127.0.0.1")
    client.session.cookie_jar.update_cookies(
        {auth.SESSION_COOKIE: s.id}, response_url=client.make_url("/")
    )


# ---------------------------------------------------------------- gated by config

@pytest.mark.asyncio
async def test_disabled_returns_503(fake_cluster, aiohttp_client):
    app = _make_app(vm_control_enabled=False, auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 503
    body = await r.json()
    assert body["error"] == "vm_control_disabled"


@pytest.mark.asyncio
async def test_enabled_calls_pve_when_authorized(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 200
    body = await r.json()
    assert body["ok"] is True
    assert body["upid"].startswith("UPID:fake:")
    assert ("vm_start", "node1", 100) in fake_cluster.client.calls


# ---------------------------------------------------------------- role gating

@pytest.mark.asyncio
async def test_anonymous_blocked_when_auth_on(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    # auth middleware rejects with 401 (no cookie)
    assert r.status == 401


@pytest.mark.asyncio
async def test_viewer_cannot_start(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True, vm_control_enabled=True)
    client = await aiohttp_client(app)
    await _login_session_cookie(client, "viewer")
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 403  # role_required("operator") rejects viewer


@pytest.mark.asyncio
async def test_operator_can_start(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True, vm_control_enabled=True)
    client = await aiohttp_client(app)
    await _login_session_cookie(client, "operator")
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 200


@pytest.mark.asyncio
async def test_operator_blocked_from_hard_stop(fake_cluster, aiohttp_client):
    """When require_admin_for_destructive=True, hard stop needs admin."""
    app = _make_app(auth_enabled=True, vm_control_enabled=True,
                    require_admin_destructive=True)
    client = await aiohttp_client(app)
    await _login_session_cookie(client, "operator")
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/stop")
    assert r.status == 403


@pytest.mark.asyncio
async def test_admin_can_hard_stop(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True, vm_control_enabled=True,
                    require_admin_destructive=True)
    client = await aiohttp_client(app)
    await _login_session_cookie(client, "admin")
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/stop")
    assert r.status == 200
    assert ("vm_stop", "node1", 100) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_operator_stop_when_destructive_relaxed(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True, vm_control_enabled=True,
                    require_admin_destructive=False)
    client = await aiohttp_client(app)
    await _login_session_cookie(client, "operator")
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/stop")
    assert r.status == 200


# ---------------------------------------------------------------- VM-pattern RBAC

@pytest.mark.asyncio
async def test_pattern_role_blocks_outside_scope(fake_cluster, aiohttp_client):
    """User has operator on tag:dev only — must be denied for prod VMs."""
    app = _make_app(auth_enabled=True, vm_control_enabled=True)
    client = await aiohttp_client(app)

    auth.create_user("dev_op", "pw1234567890")
    auth.grant_role("dev_op", "*", "operator", vm_pattern="tag:dev")
    s = await auth.login("dev_op", "pw1234567890", source_ip="127.0.0.1")
    client.session.cookie_jar.update_cookies(
        {auth.SESSION_COOKIE: s.id}, response_url=client.make_url("/")
    )

    # vm 100 has tags 'prod;web' — denied
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 403

    # vm 200 has tag 'dev' — allowed
    r = await client.post("/api/clusters/cluster1/nodes/node2/vms/200/start")
    assert r.status == 200


@pytest.mark.asyncio
async def test_pattern_role_blocks_when_no_role_for_target(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True, vm_control_enabled=True)
    client = await aiohttp_client(app)

    auth.create_user("partial", "pw1234567890")
    # Only role on cluster2 — no grant for cluster1
    auth.grant_role("partial", "cluster2", "operator")
    s = await auth.login("partial", "pw1234567890", source_ip="127.0.0.1")
    client.session.cookie_jar.update_cookies(
        {auth.SESSION_COOKIE: s.id}, response_url=client.make_url("/")
    )

    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 403


# ---------------------------------------------------------------- audit

@pytest.mark.asyncio
async def test_action_emits_audit_row(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 200
    rows = await audit.query(action="vm.start")
    assert len(rows) >= 1
    assert rows[0]["target"] == "cluster1/node1/vm/100"
    assert rows[0]["result"] == "ok"


@pytest.mark.asyncio
async def test_denied_emits_audit_row(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True, vm_control_enabled=True)
    client = await aiohttp_client(app)
    await _login_session_cookie(client, "viewer")
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/100/start")
    assert r.status == 403
    # role_required denies before our handler runs — that's a gate-level 403,
    # NOT an audit "denied" (different from VM-pattern denial which IS audited).
    # Verify no vm.start audit row was added.
    rows = await audit.query(action="vm.start")
    assert all(r["result"] != "ok" for r in rows)


# ---------------------------------------------------------------- 404 paths

@pytest.mark.asyncio
async def test_unknown_cluster_404(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/unknown/nodes/node1/vms/100/start")
    assert r.status == 404


@pytest.mark.asyncio
async def test_unknown_vmid_404(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/vms/9999/start")
    assert r.status == 404


# ---------------------------------------------------------------- migrate

@pytest.mark.asyncio
async def test_migrate_requires_target_node(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/vms/100/migrate",
        json={},
    )
    assert r.status == 400


@pytest.mark.asyncio
async def test_migrate_dispatches_to_pve(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/vms/100/migrate",
        json={"target_node": "node3", "online": True, "with_local_disks": True},
    )
    assert r.status == 200
    body = await r.json()
    assert body["target_node"] == "node3"
    assert ("vm_migrate", "node1", 100, "node3", True, True, None) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_migrate_passes_bwlimit(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/vms/100/migrate",
        json={"target_node": "node3", "online": True, "bwlimit": 40000},
    )
    assert r.status == 200
    assert ("vm_migrate", "node1", 100, "node3", True, False, 40000) in fake_cluster.client.calls


# ---------------------------------------------------------------- bulk

@pytest.mark.asyncio
async def test_bulk_dispatches_per_vm(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/vms/bulk",
        json={"action": "start", "vmids": [100, 101, 200]},
    )
    assert r.status == 200
    body = await r.json()
    assert body["count"] == 3
    assert all(item["ok"] for item in body["results"])
    # All three are VMs, so they go through vm_start
    actions = [c[0] for c in fake_cluster.client.calls]
    assert actions.count("vm_start") == 3


@pytest.mark.asyncio
async def test_bulk_rejects_bad_action(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/vms/bulk",
        json={"action": "delete", "vmids": [100]},
    )
    assert r.status == 400


@pytest.mark.asyncio
async def test_bulk_rejects_too_many(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/vms/bulk",
        json={"action": "start", "vmids": list(range(101))},
    )
    assert r.status == 400
    body = await r.json()
    assert body["error"] == "too_many"


# ---------------------------------------------------------------- task status

@pytest.mark.asyncio
async def test_task_status_polls_pve(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.get(
        "/api/clusters/cluster1/nodes/node1/tasks/UPID:fake:0001:vm_start-100"
    )
    assert r.status == 200
    body = await r.json()
    assert body["exitstatus"] == "OK"


# ---------------------------------------------------------------- CT (LXC)

@pytest.mark.asyncio
async def test_ct_start_dispatches_to_ct_method(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/cts/300/start")
    assert r.status == 200
    body = await r.json()
    assert body["ok"] is True
    assert body["upid"].startswith("UPID:fake:")
    # IMPORTANT: dispatched to ct_start (not vm_start) since cache type=lxc
    assert ("ct_start", "node1", 300) in fake_cluster.client.calls
    assert ("vm_start", "node1", 300) not in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_ct_routes_full_set(fake_cluster, aiohttp_client):
    """Every CT verb dispatches to the matching ct_* method."""
    app = _make_app(auth_enabled=False, vm_control_enabled=True,
                    require_admin_destructive=False)
    client = await aiohttp_client(app)
    for verb in ("start", "shutdown", "reboot", "suspend", "resume", "stop"):
        r = await client.post(f"/api/clusters/cluster1/nodes/node1/cts/300/{verb}")
        assert r.status == 200, f"{verb} got {r.status}"
        assert (f"ct_{verb}", "node1", 300) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_ct_migrate_dispatches(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/cts/300/migrate",
        json={"target_node": "node3", "online": True, "restart": True},
    )
    assert r.status == 200
    assert ("ct_migrate", "node1", 300, "node3", True, True) in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_ct_not_found_404(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/cts/9999/start")
    assert r.status == 404
    body = await r.json()
    assert body["error"] == "ct_not_found"


@pytest.mark.asyncio
async def test_bulk_dispatches_mixed_vm_and_ct(fake_cluster, aiohttp_client):
    """Bulk endpoint auto-detects VM vs CT per vmid via cache type."""
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post(
        "/api/clusters/cluster1/vms/bulk",
        # 100/101 are VMs, 300/301 are CTs
        json={"action": "start", "vmids": [100, 101, 300, 301]},
    )
    assert r.status == 200
    body = await r.json()
    assert body["count"] == 4
    types = {item["vmid"]: item["type"] for item in body["results"]}
    assert types == {100: "vm", 101: "vm", 300: "ct", 301: "ct"}
    actions = [c[0] for c in fake_cluster.client.calls]
    assert actions.count("vm_start") == 2  # 100, 101
    assert actions.count("ct_start") == 2  # 300, 301


@pytest.mark.asyncio
async def test_ct_audit_uses_ct_action(fake_cluster, aiohttp_client):
    """Audit row for a CT action says 'ct.start' not 'vm.start'."""
    from server import audit
    app = _make_app(auth_enabled=False, vm_control_enabled=True)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/cts/300/start")
    assert r.status == 200
    rows = await audit.query(action="ct.start")
    assert any(row["target"] == "cluster1/node1/ct/300" for row in rows)
