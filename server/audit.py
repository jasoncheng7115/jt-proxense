"""Append-only audit log for jt-proxense v0.2+.

Every state-changing endpoint emits one row. Read-only endpoints emit a row
only when explicitly requested (e.g. /audit, /api/users) — too many otherwise.

DB-level triggers prevent UPDATE / DELETE on this table. Retention purge is a
separate operator-only CLI command that drops/recreates the trigger around
its DELETE.
"""
from __future__ import annotations

import hashlib
import json
import logging
from typing import Any, Optional

from . import db

logger = logging.getLogger(__name__)

# Result codes — keep this short list; downstream tools filter on it.
RESULT_OK      = "ok"
RESULT_DENIED  = "denied"
RESULT_PENDING = "pending"
def result_error(exc: BaseException | str) -> str:
    """Format an error result code from an exception class name."""
    if isinstance(exc, BaseException):
        return f"error:{exc.__class__.__name__}"
    return f"error:{exc}"


def hash_params(params: Any) -> Optional[str]:
    """SHA-256 of canonical JSON. None if params is None/empty.

    We HASH not STORE the params so the audit table never carries secrets that
    happened to be in a request body.
    """
    if params is None:
        return None
    try:
        canon = json.dumps(params, sort_keys=True, separators=(",", ":"), default=str)
    except Exception:
        canon = str(params)
    if not canon:
        return None
    return hashlib.sha256(canon.encode("utf-8")).hexdigest()


async def write(
    *,
    user: str,
    source_ip: str,
    action: str,
    result: str,
    request_id: str,
    cluster_id: Optional[str] = None,
    target: Optional[str] = None,
    params: Any = None,
) -> None:
    """Append one audit row. NEVER raises into the caller — audit failure
    is an operational issue, not a request failure (logged at WARNING)."""
    try:
        async with db.connect() as c:
            await c.execute(
                "INSERT INTO audit_log "
                "(ts, user, source_ip, cluster_id, action, target, params_hash, result, request_id) "
                "VALUES (?,?,?,?,?,?,?,?,?)",
                (
                    db.now_ms(), user, source_ip,
                    cluster_id, action, target,
                    hash_params(params), result, request_id,
                ),
            )
            await c.commit()
    except Exception as e:
        logger.warning("audit write failed: action=%s user=%s err=%s", action, user, e)


async def query(
    *,
    user: Optional[str] = None,
    action: Optional[str] = None,
    cluster_id: Optional[str] = None,
    since_ms: Optional[int] = None,
    until_ms: Optional[int] = None,
    limit: int = 100,
    offset: int = 0,
) -> list[dict]:
    """Filtered read for /audit endpoint."""
    where = []
    args: list[Any] = []
    if user:
        where.append("user = ?"); args.append(user)
    if action:
        where.append("action LIKE ?"); args.append(action)
    if cluster_id:
        where.append("cluster_id = ?"); args.append(cluster_id)
    if since_ms:
        where.append("ts >= ?"); args.append(since_ms)
    if until_ms:
        where.append("ts <= ?"); args.append(until_ms)

    sql = "SELECT id, ts, user, source_ip, cluster_id, action, target, params_hash, result, request_id FROM audit_log"
    if where:
        sql += " WHERE " + " AND ".join(where)
    sql += " ORDER BY ts DESC LIMIT ? OFFSET ?"
    args += [int(limit), int(offset)]

    async with db.connect() as c:
        cur = await c.execute(sql, args)
        rows = await cur.fetchall()
        return [dict(r) for r in rows]


async def count() -> int:
    async with db.connect() as c:
        row = await (await c.execute("SELECT COUNT(*) AS n FROM audit_log")).fetchone()
        return int(row["n"] or 0)
