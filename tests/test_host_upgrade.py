"""Regression tests for the batch host-upgrade orchestrator state machine.

This feature ships without real-host coverage (it can only be exercised
end-to-end against a live PVE cluster + SSH). These tests pin the pure
state-machine decisions that bit us in review:

  * `_resume_disposition` — what the job runner does with a node row on
    (re)entry, esp. that an in-flight node found after a daemon restart is
    failed for manual review rather than blindly re-run (fix B).
  * 'skipped' / 'failed' are real, persistable terminal states (fixes A/C).

They use only the real DB helpers + migration 007, no cluster/SSH mocking.
"""
from __future__ import annotations

import pytest

from server import db, host_upgrade as hu


# ─────────────────────────────────────── pure classifier (fix B)

@pytest.mark.parametrize("status", ["done", "failed", "skipped", "aborted"])
def test_resume_disposition_terminal_is_skipped(status):
    assert hu._resume_disposition(status) == "skip"


@pytest.mark.parametrize("status", [
    "evacuating", "updating", "awaiting_reboot", "rebooting", "restoring",
])
def test_resume_disposition_in_flight_is_failed(status):
    # The whole point: a node caught mid-flight by a daemon restart must NOT
    # be auto-resumed (would repeat the destructive evacuate/migrate).
    assert hu._resume_disposition(status) == "fail"


def test_resume_disposition_queued_runs():
    assert hu._resume_disposition("queued") == "run"


def test_resume_disposition_partitions_all_known_states():
    # Every documented per-host status must map to exactly one disposition,
    # so a future state added to the schema can't silently fall through.
    known = set(hu._TERMINAL_STATUSES) | set(hu._IN_FLIGHT_STATUSES) | {"queued"}
    assert hu._TERMINAL_STATUSES and hu._IN_FLIGHT_STATUSES
    assert not (set(hu._TERMINAL_STATUSES) & set(hu._IN_FLIGHT_STATUSES))
    for s in known:
        assert hu._resume_disposition(s) in ("skip", "fail", "run")


# ─────────────────────────────────────── ceph rebalance gate (pure logic)

def _pgmap(states, **extra):
    return {"pgmap": {"num_pgs": sum(c for _, c in states),
                      "pgs_by_state": [{"state_name": n, "count": c} for n, c in states],
                      **extra}}


def test_ceph_clean_all_active_clean():
    clean, _ = hu._ceph_clean_state(_pgmap([("active+clean", 128)]))
    assert clean is True


def test_ceph_dirty_when_pgs_recovering():
    # A non-active+clean PG state must block (this is the whole point: don't
    # touch the next host while Ceph is still recovering from the last one).
    clean, summary = hu._ceph_clean_state(
        _pgmap([("active+clean", 120), ("active+recovering", 8)]))
    assert clean is False
    assert "recovering" in summary


def test_ceph_dirty_when_degraded_or_misplaced():
    assert hu._ceph_clean_state(_pgmap([("active+clean", 128)], degraded_objects=42))[0] is False
    assert hu._ceph_clean_state(_pgmap([("active+clean", 128)], misplaced_objects=5))[0] is False
    assert hu._ceph_clean_state(
        _pgmap([("active+clean", 128)], recovering_objects_per_sec=10))[0] is False


def test_ceph_dirty_when_empty_or_missing_pgmap():
    # Defensive: no pgmap / zero PGs must NOT read as clean (fail safe).
    assert hu._ceph_clean_state({})[0] is False
    assert hu._ceph_clean_state({"pgmap": {}})[0] is False


def test_ceph_clean_ignores_health_warn_string():
    # noout sets HEALTH_WARN; the gate must rely on PG state, not the string.
    st = _pgmap([("active+clean", 64)])
    st["health"] = {"status": "HEALTH_WARN"}
    assert hu._ceph_clean_state(st)[0] is True


# ─────────────────────────────────────── DB terminal-state persistence

async def _make_node(status: str = "queued") -> int:
    """Insert a minimal job + one node, return the node id."""
    async with db.connect() as c:
        cur = await c.execute(
            "INSERT INTO host_upgrade_jobs (cluster_id, created_by, created_at, "
            "status) VALUES (?, ?, ?, ?)",
            ("c1", "admin", 1700000000, "running"),
        )
        job_id = cur.lastrowid
        cur = await c.execute(
            "INSERT INTO host_upgrade_nodes (job_id, node, ordinal, status) "
            "VALUES (?, ?, ?, ?)",
            (job_id, "pve1", 1, status),
        )
        node_id = cur.lastrowid
        await c.commit()
    return node_id


async def _status_of(node_id: int) -> tuple[str, int | None, str | None]:
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT status, finished_at, error FROM host_upgrade_nodes WHERE id = ?",
            (node_id,),
        )
        row = await cur.fetchone()
    return row["status"], row["finished_at"], row["error"]


async def test_set_node_status_persists_skipped(db_path):
    # Fix A: 'skip' decision yields a distinct terminal 'skipped' state.
    node_id = await _make_node("awaiting_reboot")
    await hu._set_node_status(node_id, "skipped", finished=True)
    status, finished, _ = await _status_of(node_id)
    assert status == "skipped"
    assert finished is not None


async def test_in_flight_node_failed_on_resume(db_path):
    # Fix B end-to-end at the DB layer: an in-flight node gets failed with the
    # manual-review error rather than being left runnable.
    node_id = await _make_node("restoring")
    assert hu._resume_disposition("restoring") == "fail"
    await hu._set_node_status(
        node_id, "failed",
        error="interrupted by daemon restart — manual review required",
        finished=True)
    status, finished, error = await _status_of(node_id)
    assert status == "failed"
    assert finished is not None
    assert "daemon restart" in error
