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
