"""Tests for PDM-style pools + tag management."""
from __future__ import annotations

import pytest
from aiohttp import web

from server import audit, auth, pdm_resources, pools_view
from server.middleware import request_id_middleware, make_auth_middleware


class _FakeVM:
    def __init__(self, vmid, node, name, tags="", type="qemu"):
        self.vmid = vmid; self.node = node; self.name = name
        self.tags = tags; self.type = type


class _FakeClient:
    def __init__(self):
        self.calls = []
        self.pools_data = [
            {"poolid": "prod", "comment": "Production"},
            {"poolid": "dev",  "comment": "Development"},
        ]
        self.fail_next = None

    async def list_pools(self):
        if self.fail_next: e=self.fail_next; self.fail_next=None; raise e
        return list(self.pools_data)

    async def create_pool(self, poolid, comment=""):
        if self.fail_next: e=self.fail_next; self.fail_next=None; raise e
        self.calls.append(("create_pool", poolid, comment))
        self.pools_data.append({"poolid": poolid, "comment": comment})

    async def delete_pool(self, poolid):
        self.calls.append(("delete_pool", poolid))
        self.pools_data = [p for p in self.pools_data if p["poolid"] != poolid]

    async def update_pool(self, poolid, *, vms=None, storage=None, delete=False):
        self.calls.append(("update_pool", poolid, vms, storage, delete))

    async def set_vm_tags(self, node, vmid, tags):
        self.calls.append(("set_vm_tags", node, vmid, tags))

    async def set_ct_tags(self, node, vmid, tags):
        self.calls.append(("set_ct_tags", node, vmid, tags))


class _FakeCluster:
    def __init__(self, vms):
        self.client = _FakeClient()
        class _Cache: pass
        self.cache = _Cache()
        self.cache.vms = {f"{v.node}/{v.vmid}": v for v in vms}


@pytest.fixture
def fake_cluster(monkeypatch, db_path):
    cluster = _FakeCluster([
        _FakeVM(100, "node1", "web-01", "web", type="qemu"),
        _FakeVM(300, "node1", "ct-web", "web", type="lxc"),
    ])
    from server import cluster_manager as cm
    monkeypatch.setattr(cm.cluster_manager, "get_cluster",
                        lambda cid: cluster if cid == "cluster1" else None)
    return cluster


def _make_app(*, auth_enabled=True):
    from server.config import Config, AuthConfig, VmControlConfig, ServerConfig, AlertConfig, UIConfig
    from server import config as cfg_mod
    cfg_mod._current_config = Config(
        server=ServerConfig(), clusters=[], alerts=AlertConfig(), ui=UIConfig(),
        auth=AuthConfig(enabled=auth_enabled, backend="local", db_path="/tmp/never"),
        vm_control=VmControlConfig(),
    )
    app = web.Application(middlewares=[request_id_middleware, make_auth_middleware(auth_enabled)])
    # pdm_resources no longer routes the pool endpoints -- pools_view owns
    # them, because pdm_resources gated even the LIST at admin and, being
    # registered first, shadowed pools_view's viewer-level read. Register both
    # in the same order the real app does so this harness exercises the
    # handlers that actually serve these paths.
    seen = set()
    for mod in (pdm_resources, pools_view):
        for method, path, handler in mod.ROUTES:
            if (method, path) in seen:
                continue
            seen.add((method, path))
            app.router.add_route(method, path, handler)
    return app


async def _login(client, role: str, name: str = "tester"):
    auth.create_user(name, "pw1234567890")
    auth.grant_role(name, "*", role)
    s = await auth.login(name, "pw1234567890", source_ip="127.0.0.1")
    client.session.cookie_jar.update_cookies(
        {auth.SESSION_COOKIE: s.id}, response_url=client.make_url("/"))


# ---------------------------------------------------------------- pools

@pytest.mark.asyncio
async def test_pools_list_admin(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True)
    client = await aiohttp_client(app)
    await _login(client, "admin")
    r = await client.get("/api/clusters/cluster1/pools")
    assert r.status == 200
    body = await r.json()
    assert len(body["pools"]) == 2


@pytest.mark.asyncio
async def test_pools_list_viewer_allowed(fake_cluster, aiohttp_client):
    """Listing pools is a read. This asserted 403 and so pinned the bug in
    place: pdm_resources gated every pool route at admin and shadowed
    pools_view's viewer-level handler, leaving PoolsModal empty for anyone
    below admin -- while GET /pools/{poolid}, which only pools_view registers,
    answered them fine."""
    app = _make_app(auth_enabled=True)
    client = await aiohttp_client(app)
    await _login(client, "viewer")
    r = await client.get("/api/clusters/cluster1/pools")
    assert r.status == 200


@pytest.mark.asyncio
async def test_pools_unknown_cluster(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.get("/api/clusters/unknown/pools")
    assert r.status == 404


@pytest.mark.asyncio
async def test_pool_create(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/pools",
                          json={"poolid": "staging", "comment": "Pre-prod"})
    assert r.status == 200
    assert ("create_pool", "staging", "Pre-prod") in fake_cluster.client.calls
    rows = await audit.query(action="pool.create")
    assert any(r["target"] == "cluster1/staging" for r in rows)


@pytest.mark.asyncio
async def test_pool_create_missing_poolid(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/pools", json={})
    assert r.status == 400


@pytest.mark.asyncio
async def test_pool_create_pve_failure_audited(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    fake_cluster.client.fail_next = RuntimeError("PVE 500 boom")
    r = await client.post("/api/clusters/cluster1/pools",
                          json={"poolid": "x", "comment": ""})
    assert r.status == 502
    rows = await audit.query(action="pool.create")
    assert any(r["result"].startswith("error") for r in rows)


@pytest.mark.asyncio
async def test_pool_delete(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.delete("/api/clusters/cluster1/pools/dev")
    assert r.status == 200
    assert ("delete_pool", "dev") in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_pool_update_add_members(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.put("/api/clusters/cluster1/pools/prod",
                         json={"vms": "100,101", "storage": "local"})
    assert r.status == 200
    assert ("update_pool", "prod", "100,101", "local", False) in fake_cluster.client.calls
    rows = await audit.query(action="pool.add_members")
    assert any(r["target"] == "cluster1/prod" for r in rows)


@pytest.mark.asyncio
async def test_pool_update_remove_members_audits_separately(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.put("/api/clusters/cluster1/pools/prod",
                         json={"vms": "100", "delete": True})
    assert r.status == 200
    rows = await audit.query(action="pool.delete_members")
    assert any(r["target"] == "cluster1/prod" for r in rows)


@pytest.mark.asyncio
async def test_pool_update_no_changes(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.put("/api/clusters/cluster1/pools/prod", json={})
    assert r.status == 400


# ---------------------------------------------------------------- tags

@pytest.mark.asyncio
async def test_tags_set_vm(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.put("/api/clusters/cluster1/vms/100/tags",
                         json={"tags": "prod;web;updated"})
    assert r.status == 200
    body = await r.json()
    assert body["type"] == "qemu"
    assert ("set_vm_tags", "node1", 100, "prod;web;updated") in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_tags_set_ct_dispatches_to_lxc_method(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.put("/api/clusters/cluster1/vms/300/tags",
                         json={"tags": "web;dev"})
    assert r.status == 200
    body = await r.json()
    assert body["type"] == "lxc"
    assert ("set_ct_tags", "node1", 300, "web;dev") in fake_cluster.client.calls


@pytest.mark.asyncio
async def test_tags_set_unknown_vm(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.put("/api/clusters/cluster1/vms/9999/tags",
                         json={"tags": "x"})
    assert r.status == 404


@pytest.mark.asyncio
async def test_tags_audit_emitted(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    await client.put("/api/clusters/cluster1/vms/100/tags",
                     json={"tags": "newtag"})
    rows = await audit.query(action="vm.tags.set")
    assert any(r["target"] == "cluster1/node1/qemu/100" for r in rows)
