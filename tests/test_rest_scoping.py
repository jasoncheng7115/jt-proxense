"""The REST mirrors of the WebSocket snapshot must be scoped the same way.

v1.1.0 filtered the WebSocket to the clusters a session holds a grant on, but
/api/clusters, /api/clusters/{id}, /api/nodes, /api/vms, /api/storages,
/api/ceph and /api/summary kept answering with EVERY cluster to any logged-in
user — the same data, one HTTP request away. Found by generating the route
permission table (scripts/gen_api_routes.py) and reading the `session` rows.
"""
from __future__ import annotations

import json

import pytest
from aiohttp.test_utils import make_mocked_request

from server import auth
from server import server as srv


class Summary:
    def __init__(self, n):
        self.node_count = n; self.nodes_online = n
        self.vm_count = n * 10; self.vms_running = n
        self.ct_count = 0; self.cts_running = 0


class Cache:
    def __init__(self, cid, n):
        self.nodes = {f"{cid}-node": {"node": f"{cid}-node"}}
        self.vms = {f"{cid}-node/{n}00": {"vmid": n * 100, "name": f"{cid}-vm"}}
        self.storages = {f"{cid}-node/{cid}-store": {"storage": f"{cid}-store"}}
        self.ceph = {"health": f"{cid}-ceph"}
        self.summary = Summary(n)


class Cluster:
    def __init__(self, cid, n):
        self.id = cid
        self.cache = Cache(cid, n)

    def get_data(self):
        return {"id": self.id, "secret_marker": f"{self.id}-data"}


@pytest.fixture
def two_clusters(monkeypatch):
    cl = {"cluster1": Cluster("cluster1", 1), "cluster2": Cluster("cluster2", 2)}
    monkeypatch.setattr(srv.cluster_manager, "clusters", cl, raising=False)
    monkeypatch.setattr(srv.cluster_manager, "adapters", {}, raising=False)
    monkeypatch.setattr(srv.cluster_manager, "get_all_data",
                        lambda: {"clusters": {k: v.get_data() for k, v in cl.items()},
                                 "timestamp": 1.0})
    monkeypatch.setattr(srv, "_to_jsonable", lambda v: v)
    # asdict() in get_global_summary needs dataclasses; count only here
    import server.cluster_manager as cm
    monkeypatch.setattr(cm, "asdict", lambda s: {"node_count": s.node_count})
    return cl


def _req(path, user, match_info=None):
    r = make_mocked_request("GET", path, match_info=match_info or {})
    r["user"] = user
    return r


def _scoped_user():
    uid = auth.create_user("only1", "Passw0rd-Test!")
    auth.grant_role("only1", "cluster1", "viewer")
    return {"id": uid, "role_global": None, "username": "only1"}


async def _body(resp):
    return json.loads(resp.body)


LIST_HANDLERS = [
    ("/api/clusters", "get_clusters_handler"),
    ("/api/nodes", "get_nodes_handler"),
    ("/api/vms", "get_vms_handler"),
    ("/api/storages", "get_storages_handler"),
    ("/api/ceph", "get_ceph_handler"),
    ("/api/summary", "get_summary_handler"),
]


@pytest.mark.parametrize("path,handler", LIST_HANDLERS)
async def test_scoped_user_sees_nothing_of_other_cluster(db_path, two_clusters, path, handler):
    resp = await getattr(srv, handler)(_req(path, _scoped_user()))
    blob = json.dumps(await _body(resp))
    assert "cluster2" not in blob
    assert "cluster1" in blob or handler == "get_summary_handler"


@pytest.mark.parametrize("path,handler", LIST_HANDLERS[1:5])
async def test_query_param_cannot_reach_out_of_scope_cluster(db_path, two_clusters, path, handler):
    resp = await getattr(srv, handler)(_req(path + "?cluster=cluster2", _scoped_user()))
    assert "cluster2" not in json.dumps(await _body(resp))


async def test_single_cluster_out_of_scope_is_404_like_missing(db_path, two_clusters):
    user = _scoped_user()
    hidden = await srv.get_cluster_handler(
        _req("/api/clusters/cluster2", user, {"cluster_id": "cluster2"}))
    missing = await srv.get_cluster_handler(
        _req("/api/clusters/nope", user, {"cluster_id": "nope"}))
    assert hidden.status == missing.status == 404
    assert hidden.body == missing.body
    ok = await srv.get_cluster_handler(
        _req("/api/clusters/cluster1", user, {"cluster_id": "cluster1"}))
    assert ok.status == 200


async def test_summary_totals_count_only_visible_clusters(db_path, two_clusters):
    d = await _body(await srv.get_summary_handler(_req("/api/summary", _scoped_user())))
    assert d["total_clusters"] == 1 and d["total_nodes"] == 1 and d["total_vms"] == 10


async def test_global_grant_and_auth_disabled_see_everything(db_path, two_clusters):
    uid = auth.create_user("glob", "Passw0rd-Test!")
    auth.grant_role("glob", "*", "viewer")
    for user in ({"id": uid, "role_global": "viewer"}, None):
        blob = json.dumps(await _body(await srv.get_vms_handler(_req("/api/vms", user))))
        assert "cluster1" in blob and "cluster2" in blob


async def test_user_without_grants_sees_nothing(db_path, two_clusters):
    uid = auth.create_user("nada", "Passw0rd-Test!")
    user = {"id": uid, "role_global": None}
    for path, handler in LIST_HANDLERS:
        blob = json.dumps(await _body(await getattr(srv, handler)(_req(path, user))))
        assert "cluster1" not in blob and "cluster2" not in blob, path
