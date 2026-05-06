"""Tests for PDM backup orchestration."""
from __future__ import annotations

import pytest
from aiohttp import web

from server import audit, auth, pdm_backups
from server.middleware import request_id_middleware, make_auth_middleware


class _FakeClient:
    def __init__(self):
        self.calls = []
        self.fail_next = None
        self.jobs = [{"id": "backup-001", "schedule": "Sun 02:00", "storage": "pbs"}]
        self.backups_on_storage = [
            {"volid": "pbs:backup/vzdump-qemu-100-2026_01_01.vma.zst", "size": 1234567},
        ]

    async def list_backup_jobs(self):
        if self.fail_next: e=self.fail_next; self.fail_next=None; raise e
        return list(self.jobs)

    async def create_backup_job(self, **kw):
        if self.fail_next: e=self.fail_next; self.fail_next=None; raise e
        self.calls.append(("create_backup_job", kw))

    async def delete_backup_job(self, job_id):
        self.calls.append(("delete_backup_job", job_id))

    async def trigger_backup(self, node, *, vmid, storage, mode="snapshot", compress="zstd", **kw):
        if self.fail_next: e=self.fail_next; self.fail_next=None; raise e
        self.calls.append(("trigger_backup", node, vmid, storage, mode, compress))
        return f"UPID:fake:0001:vzdump-{vmid}"

    async def list_storage_content(self, node, storage, content="backup"):
        return list(self.backups_on_storage)

    async def delete_storage_content(self, node, storage, volume):
        self.calls.append(("delete_storage_content", node, storage, volume))
        return f"UPID:fake:0001:rm-{volume}"

    async def restore_backup(self, node, *, vmid, storage, archive, vm_type="qemu", force=False, **kw):
        self.calls.append(("restore_backup", node, vmid, storage, archive, vm_type, force))
        return f"UPID:fake:0001:restore-{vmid}"


class _FakeCluster:
    def __init__(self):
        self.client = _FakeClient()
        class _Cache: pass
        self.cache = _Cache(); self.cache.vms = {}


@pytest.fixture
def fake_cluster(monkeypatch, db_path):
    cluster = _FakeCluster()
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
    for method, path, handler in pdm_backups.ROUTES:
        app.router.add_route(method, path, handler)
    return app


async def _login(client, role, name="tester"):
    auth.create_user(name, "pw1234567890")
    auth.grant_role(name, "*", role)
    s = await auth.login(name, "pw1234567890", source_ip="127.0.0.1")
    client.session.cookie_jar.update_cookies(
        {auth.SESSION_COOKIE: s.id}, response_url=client.make_url("/"))


# ---------------------------------------------------------------- jobs

@pytest.mark.asyncio
async def test_list_jobs_operator(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True)
    client = await aiohttp_client(app)
    await _login(client, "operator")
    r = await client.get("/api/clusters/cluster1/backup-jobs")
    assert r.status == 200
    body = await r.json()
    assert len(body["jobs"]) == 1


@pytest.mark.asyncio
async def test_list_jobs_viewer_blocked(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True)
    client = await aiohttp_client(app)
    await _login(client, "viewer")
    r = await client.get("/api/clusters/cluster1/backup-jobs")
    assert r.status == 403


@pytest.mark.asyncio
async def test_create_job_admin(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True)
    client = await aiohttp_client(app)
    await _login(client, "admin")
    r = await client.post("/api/clusters/cluster1/backup-jobs",
                          json={"schedule": "Sun 02:00", "storage": "pbs",
                                "all_vms": True, "mode": "snapshot"})
    assert r.status == 200
    rows = await audit.query(action="backup.job.create")
    assert any(r["target"] == "cluster1" for r in rows)
    # Operator (lower) is rejected for write
    cli2 = await aiohttp_client(app)
    auth.create_user("op", "pw1234567890")
    auth.grant_role("op", "*", "operator")
    s = await auth.login("op", "pw1234567890", source_ip="127.0.0.1")
    cli2.session.cookie_jar.update_cookies({auth.SESSION_COOKIE: s.id}, response_url=cli2.make_url("/"))
    r2 = await cli2.post("/api/clusters/cluster1/backup-jobs",
                         json={"schedule": "*-*-* 03:00", "storage": "pbs"})
    assert r2.status == 403


@pytest.mark.asyncio
async def test_create_job_missing_fields(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/backup-jobs",
                          json={"schedule": "Sun"})  # missing storage
    assert r.status == 400


@pytest.mark.asyncio
async def test_create_job_pve_failure_audited(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    fake_cluster.client.fail_next = RuntimeError("storage missing")
    r = await client.post("/api/clusters/cluster1/backup-jobs",
                          json={"schedule": "Sun 02:00", "storage": "pbs"})
    assert r.status == 502
    rows = await audit.query(action="backup.job.create")
    assert any(r["result"].startswith("error") for r in rows)


@pytest.mark.asyncio
async def test_delete_job(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.delete("/api/clusters/cluster1/backup-jobs/backup-001")
    assert r.status == 200
    assert ("delete_backup_job", "backup-001") in fake_cluster.client.calls


# ---------------------------------------------------------------- ad-hoc

@pytest.mark.asyncio
async def test_trigger_returns_upid(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/backup",
                          json={"vmid": "100", "storage": "pbs"})
    assert r.status == 200
    body = await r.json()
    assert body["upid"].startswith("UPID:fake:")
    assert any(c[0] == "trigger_backup" and c[2] == "100" for c in fake_cluster.client.calls)


@pytest.mark.asyncio
async def test_trigger_missing_storage(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/backup",
                          json={"vmid": "100"})
    assert r.status == 400


@pytest.mark.asyncio
async def test_trigger_audited(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    await client.post("/api/clusters/cluster1/nodes/node1/backup",
                      json={"vmid": "100,101", "storage": "pbs"})
    rows = await audit.query(action="backup.trigger")
    assert any("vmid=100,101" in r["target"] for r in rows)


# ---------------------------------------------------------------- listing

@pytest.mark.asyncio
async def test_list_storage_backups(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.get("/api/clusters/cluster1/nodes/node1/storage/pbs/backups")
    assert r.status == 200
    body = await r.json()
    assert len(body["backups"]) == 1


# ---------------------------------------------------------------- destructive

@pytest.mark.asyncio
async def test_delete_backup_file_admin_only(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=True)
    client = await aiohttp_client(app)
    await _login(client, "operator")
    r = await client.delete("/api/clusters/cluster1/nodes/node1/storage/pbs/backups/backup/vzdump-qemu-100.vma.zst")
    assert r.status == 403


@pytest.mark.asyncio
async def test_delete_backup_file_admin_succeeds(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.delete("/api/clusters/cluster1/nodes/node1/storage/pbs/backups/backup/vzdump-qemu-100.vma.zst")
    assert r.status == 200
    assert any(c[0] == "delete_storage_content" for c in fake_cluster.client.calls)


@pytest.mark.asyncio
async def test_restore_dispatches(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/restore",
                          json={"vmid": 200, "storage": "pbs",
                                "archive": "backup/vzdump-qemu-100.vma.zst",
                                "type": "qemu"})
    assert r.status == 200
    body = await r.json()
    assert body["upid"].startswith("UPID:fake:")
    rows = await audit.query(action="backup.restore")
    assert any(r["target"].endswith("/qemu/200") for r in rows)


@pytest.mark.asyncio
async def test_restore_bad_type(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/restore",
                          json={"vmid": 200, "storage": "pbs",
                                "archive": "x", "type": "docker"})
    assert r.status == 400


@pytest.mark.asyncio
async def test_restore_missing_fields(fake_cluster, aiohttp_client):
    app = _make_app(auth_enabled=False)
    client = await aiohttp_client(app)
    r = await client.post("/api/clusters/cluster1/nodes/node1/restore",
                          json={"vmid": 200})
    assert r.status == 400
