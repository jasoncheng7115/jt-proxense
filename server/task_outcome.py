"""Follow a submitted PVE task to its real outcome.

The problem this solves: PVE answers every long-running operation with HTTP 200
and a UPID immediately, then does the work asynchronously. Handlers here wrote
their audit row at that moment, so the log recorded `result=ok` for the fact
that the REQUEST was accepted — not for what actually happened. A snapshot
delete that failed, a restore that died halfway, a Ceph pool removal that was
refused: all of them read as successes forever after.

That is a bad property for an audit log specifically. The log is what you go
back to when something is missing and you are trying to work out whether anyone
touched it, and "we asked PVE to delete it and PVE said hello" is not the answer
you need at that moment.

So: submission is still recorded immediately (it happened, and it is the only
record if we crash), and a watcher appends a SECOND row carrying the outcome.
Appending rather than rewriting is deliberate — an audit trail you can edit
after the fact is not an audit trail.

In-flight tasks are also written to `pending_tasks` (migration 011) so a
daemon restart does not lose them: on startup every owed outcome is picked back
up, and anything whose deadline has already passed is recorded as a timeout
rather than forgotten. The row is deleted once the outcome has been written, so
the table's contents are exactly "outcomes we still owe".

Deliberate limits, so nobody reads more into this than is there:
  * There is a per-operation timeout. On expiry we record `timeout`, which
    means "we stopped looking", NOT "it failed".
  * A task we cannot poll (node unreachable) records `unknown`, again not
    "failed". Reporting a failure we did not observe would be its own lie.
"""
from __future__ import annotations

import asyncio
import json
import logging
import time

from . import audit, db

logger = logging.getLogger(__name__)

POLL_S = 3.0
# How long to keep watching, per kind of work. These are "how long before we
# stop looking", not "how long it should take" — expiry records `timeout`, which
# is not a failure. The first version used 900s for everything and a real vzdump
# to PBS blew straight through it, producing a timeout row for a backup that
# was progressing perfectly well. Measured, not guessed.
DEFAULT_TIMEOUT_S = 900          # 15 min: snapshots, deletes, ceph, network
LONG_TIMEOUT_S = 6 * 3600        # backups, restores, clones, disk moves
MAX_WATCHERS = 200               # backstop; a runaway would hammer pveproxy

_watchers: set[asyncio.Task] = set()


async def _remember(cluster_id: str, node: str, upid: str, *, action: str,
                    actor: str, source_ip: str, request_id: str,
                    target: str | None, params: dict | None,
                    deadline_at: int) -> None:
    try:
        async with db.connect() as c:
            await c.execute(
                "INSERT OR IGNORE INTO pending_tasks (cluster_id,node,upid,action,"
                "actor,source_ip,request_id,target,params_json,created_at,"
                "deadline_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                (cluster_id, node, upid, action, actor, source_ip, request_id,
                 target, json.dumps(params or {}), int(time.time()), deadline_at))
            await c.commit()
    except Exception as e:
        # Losing the durability is not worth failing the operation over — we
        # still have the in-memory watcher for this process's lifetime.
        logger.warning("could not persist pending task %s: %s", upid[:48], e)


async def _forget(cluster_id: str, node: str, upid: str) -> None:
    try:
        async with db.connect() as c:
            await c.execute(
                "DELETE FROM pending_tasks WHERE cluster_id=? AND node=? AND upid=?",
                (cluster_id, node, upid))
            await c.commit()
    except Exception as e:
        logger.warning("could not clear pending task %s: %s", upid[:48], e)


def _outcome(status: dict) -> tuple[str, bool]:
    """(audit result string, was it a clean success)."""
    if status.get("_timeout"):
        return "timeout: still running when we stopped watching", False
    exit_status = (status.get("exitstatus") or "").strip()
    if not exit_status:
        return "unknown: no exitstatus reported", False
    if exit_status.upper() == "OK":
        return "ok", True
    return f"error: {exit_status[:180]}", False


async def _poll(cluster, node: str, upid: str, timeout_s: int) -> dict:
    deadline = time.time() + timeout_s
    missed = 0
    while time.time() < deadline:
        try:
            st = await cluster.client.get_task_status(node, upid) or {}
            missed = 0
            if (st.get("status") or "") != "running":
                return st
        except Exception as e:
            missed += 1
            # A node that has genuinely gone away should not keep us polling
            # for the full timeout, but one dropped request should not make us
            # give up either.
            if missed >= 10:
                logger.info("task %s unpollable after %d tries: %s",
                            upid[:48], missed, e)
                return {"status": "unknown", "exitstatus": ""}
        await asyncio.sleep(POLL_S)
    return {"status": "running", "exitstatus": "", "_timeout": True}


async def _watch(cluster, node: str, upid: str, *, action: str, user: str,
                 source_ip: str, request_id: str, cluster_id: str,
                 target: str | None, params: dict | None,
                 timeout_s: int) -> None:
    logger.debug("task outcome: watching %s (%s)", upid[:40], action)
    try:
        status = await _poll(cluster, node, upid, timeout_s)
        result, ok = _outcome(status)
        detail = dict(params or {})
        detail.update({"upid": upid, "exitstatus": status.get("exitstatus")})
        await audit.write(
            user=user, source_ip=source_ip, request_id=request_id,
            # A distinct action name so the outcome row can never be mistaken
            # for a second attempt at the operation.
            action=f"{action}.outcome",
            cluster_id=cluster_id, target=target, result=result, params=detail)
        if not ok:
            logger.warning("PVE task did not succeed: %s %s -> %s",
                           action, upid[:48], result)
        # The outcome is on the record, so we no longer owe one.
        await _forget(cluster_id, node, upid)
    except asyncio.CancelledError:
        raise
    except Exception as e:                       # never take down the daemon
        logger.warning("task outcome watcher failed for %s: %s", upid[:48], e)


def track(cluster, node: str, upid: str, *, action: str, user: str,
          source_ip: str, request_id: str, cluster_id: str,
          target: str | None = None, params: dict | None = None,
          timeout_s: int = DEFAULT_TIMEOUT_S) -> None:
    """Fire-and-forget: watch `upid` and append its outcome to the audit log.

    Safe to call from a request handler — it returns immediately and never
    raises, because an operation must not fail just because we could not
    arrange to observe it.
    """
    if not upid or not node:
        return
    if len(_watchers) >= MAX_WATCHERS:
        logger.warning("task outcome: %d watchers already running, not "
                       "tracking %s", len(_watchers), upid[:48])
        return
    try:
        t = asyncio.create_task(_watch(
            cluster, node, upid, action=action, user=user, source_ip=source_ip,
            request_id=request_id, cluster_id=cluster_id, target=target,
            params=params, timeout_s=timeout_s))
    except RuntimeError:                 # no running loop (tests, CLI)
        return
    _watchers.add(t)
    t.add_done_callback(_watchers.discard)


def _spawn(coro) -> None:
    t = asyncio.create_task(coro)
    _watchers.add(t)
    t.add_done_callback(_watchers.discard)


async def resume_on_startup() -> None:
    """Pick up outcomes we still owe from before the restart.

    A task that finished while we were down still has a status in PVE, so most
    of these resolve on the first poll. Anything already past its deadline is
    recorded as a timeout right away — "we stopped looking" is the honest
    answer, and it is much better than a row that never appears.
    """
    from .cluster_manager import cluster_manager
    try:
        async with db.connect() as c:
            cur = await c.execute(
                "SELECT cluster_id,node,upid,action,actor,source_ip,request_id,"
                "target,params_json,deadline_at FROM pending_tasks")
            rows = [dict(r) for r in await cur.fetchall()]
    except Exception as e:
        logger.warning("could not read pending tasks: %s", e)
        return
    if not rows:
        return
    now = int(time.time())
    resumed = expired = 0
    for r in rows:
        cluster = cluster_manager.get_cluster(r["cluster_id"])
        try:
            params = json.loads(r["params_json"] or "{}")
        except (json.JSONDecodeError, TypeError):
            params = {}
        common = dict(action=r["action"], user=r["actor"] or "system",
                      source_ip=r["source_ip"] or "unknown",
                      request_id=r["request_id"] or "",
                      cluster_id=r["cluster_id"], target=r["target"],
                      params=params)
        remaining = int(r["deadline_at"]) - now
        if cluster is None or remaining <= 0:
            # No cluster to poll, or we are already past the point where we
            # would have stopped looking. Record that and stop owing it.
            detail = dict(params)
            detail["upid"] = r["upid"]
            await audit.write(
                user=common["user"], source_ip=common["source_ip"],
                request_id=common["request_id"],
                action=f'{r["action"]}.outcome',
                cluster_id=r["cluster_id"], target=r["target"],
                result=("timeout: daemon restarted and the watch window has "
                        "since passed" if cluster is not None else
                        "unknown: cluster no longer configured"),
                params=detail)
            await _forget(r["cluster_id"], r["node"], r["upid"])
            expired += 1
            continue
        _spawn(_watch(cluster, r["node"], r["upid"], timeout_s=remaining,
                      **common))
        resumed += 1
    logger.info("task outcome: resumed %d watcher(s), closed %d expired",
                resumed, expired)


def active_count() -> int:
    return len(_watchers)


async def warn_on_shutdown() -> None:
    """Note what is still owed. These are now recoverable, not lost.

    Before `pending_tasks` existed, a restart threw in-flight watchers away and
    the only symptom was an outcome row that never arrived — indistinguishable
    from a broken watcher, which cost real debugging time. They are persisted
    now and resume_on_startup() picks them up, so this is informational.
    """
    n = len(_watchers)
    if n:
        logger.info("shutting down with %d PVE task(s) still being watched — "
                    "they are recorded in pending_tasks and will be resumed", n)


async def submitted(cluster, node: str, upid: str, *, action: str, user: str,
                    source_ip: str, request_id: str, cluster_id: str,
                    target: str | None = None, params: dict | None = None,
                    timeout_s: int = DEFAULT_TIMEOUT_S) -> None:
    """Record that an operation was SUBMITTED, then watch for its outcome.

    Replaces the `audit.write(result="ok")` that used to sit right after a UPID
    came back. The wording matters: "ok" there claimed the operation succeeded
    when all we knew was that PVE had accepted the request. Two rows now tell
    the truth in order — one that we asked, one for what happened.
    """
    await audit.write(
        user=user, source_ip=source_ip, request_id=request_id, action=action,
        cluster_id=cluster_id, target=target,
        result="submitted",
        params={**(params or {}), "upid": upid})
    track(cluster, node, upid, action=action, user=user, source_ip=source_ip,
          request_id=request_id, cluster_id=cluster_id, target=target,
          params=params, timeout_s=timeout_s)
