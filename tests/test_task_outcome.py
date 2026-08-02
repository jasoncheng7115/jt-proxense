"""Following a PVE task to its real outcome.

The property under test is honesty. It is easy to write this so that anything
we did not observe becomes "failed" (alarming) or stays "ok" (the bug we are
fixing). Neither is acceptable: an audit row must say what we actually know.
"""
from __future__ import annotations

import asyncio

import pytest

from server import task_outcome as to


class FakeClient:
    def __init__(self, sequence):
        self.sequence = list(sequence)
        self.calls = 0

    async def get_task_status(self, node, upid):
        self.calls += 1
        if not self.sequence:
            return {"status": "stopped", "exitstatus": "OK"}
        item = self.sequence.pop(0)
        if isinstance(item, Exception):
            raise item
        return item


class FakeCluster:
    def __init__(self, sequence):
        self.id = "c1"
        self.client = FakeClient(sequence)


@pytest.fixture
def rows(monkeypatch):
    captured = []

    async def fake_write(**kw):
        captured.append(kw)
    monkeypatch.setattr(to.audit, "write", fake_write)
    monkeypatch.setattr(to, "POLL_S", 0.001)
    return captured


async def _run(cluster, rows, **over):
    kw = dict(action="vm.snapshot.delete", user="alice", source_ip="10.0.0.1",
              request_id="r1", cluster_id="c1", target="c1/n1/vm/100",
              params={"snapname": "before-upgrade"}, timeout_s=2)
    kw.update(over)
    await to._watch(cluster, "n1", "UPID:x", **kw)


@pytest.mark.asyncio
async def test_success_records_ok(rows):
    await _run(FakeCluster([{"status": "stopped", "exitstatus": "OK"}]), rows)
    assert len(rows) == 1
    assert rows[0]["result"] == "ok"
    assert rows[0]["action"] == "vm.snapshot.delete.outcome"


@pytest.mark.asyncio
async def test_failure_is_recorded_with_the_reason(rows):
    await _run(FakeCluster([
        {"status": "stopped", "exitstatus": "command 'qm delsnapshot' failed: exit code 2"}
    ]), rows)
    assert rows[0]["result"].startswith("error: ")
    assert "exit code 2" in rows[0]["result"]


@pytest.mark.asyncio
async def test_still_running_is_recorded_as_timeout_not_failure(rows):
    """"We stopped watching" is not "it failed" — saying so would send an
    operator chasing an incident that never happened."""
    cluster = FakeCluster([{"status": "running", "exitstatus": ""}] * 400)
    await _run(cluster, rows, timeout_s=0.05)
    assert rows[0]["result"].startswith("timeout")
    assert "error" not in rows[0]["result"]


@pytest.mark.asyncio
async def test_unpollable_node_is_recorded_as_unknown_not_failure(rows):
    cluster = FakeCluster([RuntimeError("connection refused")] * 40)
    await _run(cluster, rows, timeout_s=2)
    assert rows[0]["result"].startswith("unknown")


@pytest.mark.asyncio
async def test_transient_poll_error_does_not_abort_the_watch(rows):
    """One dropped request must not make us give up and report unknown."""
    cluster = FakeCluster([
        RuntimeError("blip"), RuntimeError("blip"),
        {"status": "stopped", "exitstatus": "OK"},
    ])
    await _run(cluster, rows, timeout_s=2)
    assert rows[0]["result"] == "ok"


@pytest.mark.asyncio
async def test_missing_exitstatus_is_unknown(rows):
    await _run(FakeCluster([{"status": "stopped"}]), rows)
    assert rows[0]["result"].startswith("unknown")


@pytest.mark.asyncio
async def test_outcome_row_carries_the_upid_and_original_params(rows):
    await _run(FakeCluster([{"status": "stopped", "exitstatus": "OK"}]), rows)
    p = rows[0]["params"]
    assert p["upid"] == "UPID:x"
    assert p["snapname"] == "before-upgrade"


@pytest.mark.asyncio
async def test_watcher_never_raises_into_the_caller(rows, monkeypatch):
    async def boom(**kw):
        raise RuntimeError("audit table is gone")
    monkeypatch.setattr(to.audit, "write", boom)
    await _run(FakeCluster([{"status": "stopped", "exitstatus": "OK"}]), rows)


@pytest.mark.asyncio
async def test_submitted_writes_submitted_not_ok(rows):
    """The whole point: the first row must not claim success. It records that
    we asked, and the watcher appends what happened."""
    cluster = FakeCluster([{"status": "stopped", "exitstatus": "OK"}])
    await to.submitted(cluster, "n1", "UPID:y", action="vm.delete",
                       user="alice", source_ip="10.0.0.1", request_id="r1",
                       cluster_id="c1", target="c1/n1/vm/100", timeout_s=2)
    assert rows[0]["result"] == "submitted"
    assert rows[0]["action"] == "vm.delete"
    assert rows[0]["params"]["upid"] == "UPID:y"
    for _ in range(200):                      # let the watcher finish
        await asyncio.sleep(0.005)
        if len(rows) > 1:
            break
    assert rows[1]["action"] == "vm.delete.outcome"
    assert rows[1]["result"] == "ok"


def test_track_without_a_running_loop_is_a_no_op():
    """Called from a sync context (CLI, tests) it must not explode."""
    to.track(FakeCluster([]), "n1", "UPID:z", action="a", user="u",
             source_ip="i", request_id="r", cluster_id="c")


def test_track_ignores_empty_upid():
    to.track(FakeCluster([]), "n1", "", action="a", user="u",
             source_ip="i", request_id="r", cluster_id="c")
    assert to.active_count() == 0


def test_long_timeout_is_used_for_operations_that_actually_run_long():
    """A real vzdump to PBS ran past the 900s default and produced a `timeout`
    row for a backup that was progressing fine. Backups, restores and clones
    get the long window; the constant must stay comfortably above the default.
    """
    assert to.LONG_TIMEOUT_S >= 6 * to.DEFAULT_TIMEOUT_S

    import pathlib
    import re
    root = pathlib.Path(__file__).resolve().parents[1] / "server"
    src = (root / "pdm_backups.py").read_text(encoding="utf-8")
    # Look only inside submitted(...) blocks. An earlier version of this test
    # matched on `action="..."` anywhere, and the first hit was the ERROR path's
    # audit.write — so it checked a block that has no timeout at all.
    blocks = re.findall(r"await task_outcome\.submitted\((.*?)\n\s*return ",
                        src, re.S)
    assert blocks, "no submissions found in pdm_backups.py"
    seen = set()
    for b in blocks:
        m = re.search(r'action="([\w.]+)"', b)
        if not m:
            continue
        seen.add(m.group(1))
        assert "LONG_TIMEOUT_S" in b, (
            f"{m.group(1)} still uses the short default — a long-running task "
            f"would be recorded as a timeout while it was still working")
    assert "backup.trigger" in seen and "backup.restore" in seen, seen


# ------------------------------------------------- durability across restarts

@pytest.mark.asyncio
async def test_pending_row_is_written_and_cleared(db_path, rows):
    """The table's contents must mean exactly "outcomes we still owe": a row
    appears when we start watching and disappears once the outcome is on the
    record. Otherwise startup either misses work or repeats it."""
    import server.db as dbmod
    from server import task_outcome as t

    async def count():
        async with dbmod.connect() as c:
            cur = await c.execute("SELECT COUNT(*) FROM pending_tasks")
            return (await cur.fetchone())[0]

    await t._remember("c1", "n1", "UPID:a", action="vm.delete", actor="alice",
                      source_ip="ip", request_id="r", target="tgt",
                      params={"x": 1}, deadline_at=2 ** 31)
    assert await count() == 1
    await t._forget("c1", "n1", "UPID:a")
    assert await count() == 0


@pytest.mark.asyncio
async def test_watch_clears_its_pending_row(db_path, rows):
    import server.db as dbmod
    from server import task_outcome as t

    await t._remember("c1", "n1", "UPID:b", action="vm.delete", actor="a",
                      source_ip="i", request_id="r", target=None, params={},
                      deadline_at=2 ** 31)
    await t._watch(FakeCluster([{"status": "stopped", "exitstatus": "OK"}]),
                   "n1", "UPID:b", action="vm.delete", user="a", source_ip="i",
                   request_id="r", cluster_id="c1", target=None, params={},
                   timeout_s=2)
    async with dbmod.connect() as c:
        cur = await c.execute("SELECT COUNT(*) FROM pending_tasks")
        assert (await cur.fetchone())[0] == 0


@pytest.mark.asyncio
async def test_resume_records_timeout_for_expired_rows(db_path, monkeypatch, rows):
    """A task whose watch window elapsed while we were down must be closed out
    honestly, not left owed forever."""
    import server.db as dbmod
    from server import task_outcome as t
    from server.cluster_manager import cluster_manager

    await t._remember("c1", "n1", "UPID:c", action="backup.trigger", actor="a",
                      source_ip="i", request_id="r", target="t", params={},
                      deadline_at=1)                 # long past
    monkeypatch.setattr(cluster_manager, "get_cluster",
                        lambda cid: FakeCluster([]), raising=False)
    await t.resume_on_startup()
    assert rows, "no outcome row written for the expired task"
    assert rows[-1]["action"] == "backup.trigger.outcome"
    assert rows[-1]["result"].startswith("timeout")
    async with dbmod.connect() as c:
        cur = await c.execute("SELECT COUNT(*) FROM pending_tasks")
        assert (await cur.fetchone())[0] == 0


@pytest.mark.asyncio
async def test_resume_records_unknown_when_cluster_is_gone(db_path, monkeypatch, rows):
    import server.db as dbmod
    from server import task_outcome as t
    from server.cluster_manager import cluster_manager

    await t._remember("gone", "n1", "UPID:d", action="vm.delete", actor="a",
                      source_ip="i", request_id="r", target="t", params={},
                      deadline_at=2 ** 31)
    monkeypatch.setattr(cluster_manager, "get_cluster",
                        lambda cid: None, raising=False)
    await t.resume_on_startup()
    assert rows[-1]["result"].startswith("unknown")
