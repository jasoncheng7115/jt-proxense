"""Audit log writer + query."""
import pytest

from server import audit


@pytest.mark.asyncio
async def test_write_basic(db_path):
    await audit.write(
        user="alice", source_ip="1.2.3.4", action="auth.login",
        result="ok", request_id="req-1",
    )
    rows = await audit.query()
    assert len(rows) == 1
    r = rows[0]
    assert r["user"] == "alice"
    assert r["action"] == "auth.login"
    assert r["result"] == "ok"
    assert r["request_id"] == "req-1"
    assert r["params_hash"] is None  # no params provided


@pytest.mark.asyncio
async def test_write_hashes_params(db_path):
    await audit.write(
        user="alice", source_ip="1.2.3.4", action="vm.config.update",
        target="cluster1/n1/vm/100", result="ok", request_id="r1",
        params={"cores": 4, "memory": 8192},
    )
    rows = await audit.query()
    assert rows[0]["params_hash"] is not None
    assert len(rows[0]["params_hash"]) == 64  # SHA-256 hex


@pytest.mark.asyncio
async def test_write_does_not_raise_on_db_error(db_path, monkeypatch):
    """audit.write must NEVER propagate exceptions to the caller — that
    would let an audit failure fail the user's actual request."""
    from server import audit as audit_mod

    class BoomConn:
        async def __aenter__(self): raise RuntimeError("simulated DB fail")
        async def __aexit__(self, *a): pass

    monkeypatch.setattr(audit_mod.db, "connect", lambda: BoomConn())
    # If this raised, the test fails.
    await audit.write(
        user="alice", source_ip="1.2.3.4", action="x", result="ok", request_id="r",
    )


@pytest.mark.asyncio
async def test_query_filter_by_user(db_path):
    await audit.write(user="alice", source_ip="1.1.1.1", action="auth.login", result="ok", request_id="r1")
    await audit.write(user="bob",   source_ip="2.2.2.2", action="auth.login", result="ok", request_id="r2")
    rows = await audit.query(user="alice")
    assert len(rows) == 1 and rows[0]["user"] == "alice"


@pytest.mark.asyncio
async def test_query_filter_by_action_pattern(db_path):
    await audit.write(user="x", source_ip="1.1.1.1", action="auth.login",  result="ok", request_id="r1")
    await audit.write(user="x", source_ip="1.1.1.1", action="auth.logout", result="ok", request_id="r2")
    await audit.write(user="x", source_ip="1.1.1.1", action="vm.start",    result="ok", request_id="r3")
    rows = await audit.query(action="auth.%")
    assert len(rows) == 2
    actions = sorted(r["action"] for r in rows)
    assert actions == ["auth.login", "auth.logout"]


@pytest.mark.asyncio
async def test_query_filter_by_cluster(db_path):
    await audit.write(user="x", source_ip="1.1.1.1", action="vm.start",
                      result="ok", request_id="r1", cluster_id="cluster1")
    await audit.write(user="x", source_ip="1.1.1.1", action="vm.start",
                      result="ok", request_id="r2", cluster_id="cluster2")
    rows = await audit.query(cluster_id="cluster1")
    assert len(rows) == 1 and rows[0]["cluster_id"] == "cluster1"


@pytest.mark.asyncio
async def test_query_pagination(db_path):
    for i in range(15):
        await audit.write(user="x", source_ip="1.1.1.1", action="t",
                          result="ok", request_id=f"r{i}")
    page1 = await audit.query(limit=5, offset=0)
    page2 = await audit.query(limit=5, offset=5)
    assert len(page1) == 5
    assert len(page2) == 5
    # Most-recent first ordering: page1 ids should all be > page2 ids
    assert min(r["id"] for r in page1) > max(r["id"] for r in page2)


@pytest.mark.asyncio
async def test_query_orders_newest_first(db_path):
    await audit.write(user="x", source_ip="1.1.1.1", action="first",  result="ok", request_id="r1")
    await audit.write(user="x", source_ip="1.1.1.1", action="second", result="ok", request_id="r2")
    rows = await audit.query()
    assert rows[0]["action"] == "second"
    assert rows[1]["action"] == "first"


@pytest.mark.asyncio
async def test_count(db_path):
    assert await audit.count() == 0
    for i in range(7):
        await audit.write(user="x", source_ip="1.1.1.1", action="t",
                          result="ok", request_id=f"r{i}")
    assert await audit.count() == 7


def test_hash_params_canonicalized():
    """Equivalent dicts should hash to the same value (key order independent)."""
    a = audit.hash_params({"a": 1, "b": 2})
    b = audit.hash_params({"b": 2, "a": 1})
    assert a == b
    assert audit.hash_params(None) is None


def test_result_error_format():
    try:
        raise ValueError("boom")
    except ValueError as e:
        assert audit.result_error(e) == "error:ValueError"
    assert audit.result_error("oops") == "error:oops"
