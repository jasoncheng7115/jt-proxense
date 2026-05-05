"""Authentication module for jt-proxense v0.2+.

Local backend: Argon2id password hashes stored in SQLite users table.
Sessions: 32-byte url-safe random IDs, 12 h sliding expiry, stored server-side.
Cookie carries the session ID only (HttpOnly, Secure, SameSite=Lax).

This module is *backend-agnostic* in interface — when `pam` and `oidc` backends
land later, they implement the same login() / logout() / current_user() shape.
"""
from __future__ import annotations

import logging
import secrets
import time
from dataclasses import dataclass
from typing import Optional

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from . import db

logger = logging.getLogger(__name__)

# Argon2id params: m=64 MB, t=3 iters, p=4 lanes. Tunable later via config.
_hasher = PasswordHasher(
    time_cost=3,
    memory_cost=64 * 1024,  # KiB
    parallelism=4,
    hash_len=32,
    salt_len=16,
)

SESSION_COOKIE = "jtps"          # short for jt-proxense session
SESSION_TTL_S = 12 * 3600        # 12 h sliding window
LOGIN_RATE_WINDOW_S = 300        # 5 min
LOGIN_RATE_MAX = 5               # max failed logins per IP per window
LOGIN_LOCKOUT_S = 900            # 15 min cool-down after exceeding


@dataclass
class User:
    id: int
    username: str
    enabled: bool
    must_change_pw: bool


@dataclass
class Session:
    id: str
    user_id: int
    expires_at: int
    last_seen_at: int


# ---------------------------------------------------------------- hashing

def hash_password(plain: str) -> str:
    """Return an Argon2id-encoded hash."""
    return _hasher.hash(plain)


def verify_password(plain: str, encoded: str) -> bool:
    try:
        return _hasher.verify(encoded, plain)
    except VerifyMismatchError:
        return False
    except Exception as e:
        logger.warning("verify_password unexpected error: %s", e)
        return False


def needs_rehash(encoded: str) -> bool:
    """True if stored hash uses outdated parameters."""
    try:
        return _hasher.check_needs_rehash(encoded)
    except Exception:
        return False


# ---------------------------------------------------------------- user CRUD

def create_user(username: str, password: str, *, must_change_pw: bool = False) -> int:
    """Create a user. Returns new user id. Raises ValueError on duplicate."""
    pw_hash = hash_password(password)
    with db.connect_sync() as c:
        try:
            cur = c.execute(
                "INSERT INTO users (username, password_hash, created_at, must_change_pw) "
                "VALUES (?, ?, ?, ?)",
                (username, pw_hash, db.now_ms(), 1 if must_change_pw else 0),
            )
            return cur.lastrowid
        except Exception as e:
            if "UNIQUE constraint failed" in str(e):
                raise ValueError(f"user already exists: {username}") from e
            raise


def set_password(username: str, new_password: str, *, must_change_pw: bool = False) -> bool:
    """Returns True if updated, False if user not found."""
    pw_hash = hash_password(new_password)
    with db.connect_sync() as c:
        cur = c.execute(
            "UPDATE users SET password_hash=?, must_change_pw=? WHERE username=?",
            (pw_hash, 1 if must_change_pw else 0, username),
        )
        return cur.rowcount > 0


def list_users() -> list[dict]:
    with db.connect_sync() as c:
        rows = c.execute(
            "SELECT id, username, enabled, must_change_pw, created_at, last_login_at "
            "FROM users ORDER BY username"
        ).fetchall()
        return [dict(r) for r in rows]


def delete_user(username: str) -> bool:
    with db.connect_sync() as c:
        cur = c.execute("DELETE FROM users WHERE username=?", (username,))
        return cur.rowcount > 0


def get_user_by_username(username: str) -> Optional[dict]:
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT id, username, password_hash, enabled, must_change_pw "
            "FROM users WHERE username=? COLLATE NOCASE",
            (username,),
        ).fetchone()
        return dict(row) if row else None


def get_user_by_id(user_id: int) -> Optional[dict]:
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT id, username, enabled, must_change_pw FROM users WHERE id=?",
            (user_id,),
        ).fetchone()
        return dict(row) if row else None


# ---------------------------------------------------------------- roles

def grant_role(username: str, cluster_id: str, role: str) -> None:
    """Grant `role` on `cluster_id` ('*' = global) to user. Replaces existing."""
    if role not in ("viewer", "operator", "admin"):
        raise ValueError(f"invalid role: {role}")
    user = get_user_by_username(username)
    if not user:
        raise ValueError(f"no such user: {username}")
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO roles (user_id, cluster_id, role, created_at) VALUES (?,?,?,?) "
            "ON CONFLICT (user_id, cluster_id) DO UPDATE SET role=excluded.role",
            (user["id"], cluster_id, role, db.now_ms()),
        )


def get_roles(user_id: int) -> dict[str, str]:
    """Return {cluster_id: role} mapping. '*' is the global default."""
    with db.connect_sync() as c:
        rows = c.execute(
            "SELECT cluster_id, role FROM roles WHERE user_id=?", (user_id,)
        ).fetchall()
        return {r["cluster_id"]: r["role"] for r in rows}


def role_for(user_id: int, cluster_id: str) -> Optional[str]:
    """Effective role on cluster_id: explicit → global default → None."""
    roles = get_roles(user_id)
    return roles.get(cluster_id) or roles.get("*")


# ---------------------------------------------------------------- rate limit

def is_rate_limited(source_ip: str) -> bool:
    """True if too many failed logins recently from this IP."""
    cutoff = db.now_ms() - LOGIN_RATE_WINDOW_S * 1000
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT COUNT(*) AS n FROM failed_logins WHERE source_ip=? AND ts >= ?",
            (source_ip, cutoff),
        ).fetchone()
        return (row["n"] or 0) >= LOGIN_RATE_MAX


def record_failed_login(source_ip: str, username: str) -> None:
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO failed_logins (source_ip, username, ts) VALUES (?,?,?)",
            (source_ip, username, db.now_ms()),
        )


def clear_failed_logins(source_ip: str) -> None:
    with db.connect_sync() as c:
        c.execute("DELETE FROM failed_logins WHERE source_ip=?", (source_ip,))


# ---------------------------------------------------------------- sessions

async def login(username: str, password: str, *, source_ip: str, user_agent: str = "") -> Optional[Session]:
    """Verify password + mint a session. Returns None on failure.

    Side effects:
      - rate-limit gate first; raises PermissionError if locked out
      - on success: clears that IP's failed_logins
      - on failure: appends to failed_logins
    """
    if is_rate_limited(source_ip):
        raise PermissionError("too many failed logins")

    user = get_user_by_username(username)
    if not user or not user["enabled"] or not verify_password(password, user["password_hash"]):
        record_failed_login(source_ip, username)
        return None

    # Optionally upgrade hash if argon2 params changed
    if needs_rehash(user["password_hash"]):
        try:
            with db.connect_sync() as c:
                c.execute(
                    "UPDATE users SET password_hash=? WHERE id=?",
                    (hash_password(password), user["id"]),
                )
        except Exception as e:
            logger.warning("hash upgrade failed for %s: %s", username, e)

    sid = secrets.token_urlsafe(32)
    now = db.now_ms()
    expires = now + SESSION_TTL_S * 1000

    async with db.connect() as c:
        await c.execute(
            "INSERT INTO sessions (id, user_id, created_at, expires_at, last_seen_at, source_ip, user_agent) "
            "VALUES (?,?,?,?,?,?,?)",
            (sid, user["id"], now, expires, now, source_ip, user_agent),
        )
        await c.execute("UPDATE users SET last_login_at=? WHERE id=?", (now, user["id"]))
        await c.commit()

    clear_failed_logins(source_ip)
    return Session(id=sid, user_id=user["id"], expires_at=expires, last_seen_at=now)


async def get_session(session_id: str) -> Optional[Session]:
    """Return active session or None. Sliding window — bumps last_seen_at."""
    if not session_id:
        return None
    now = db.now_ms()
    async with db.connect() as c:
        row = await (await c.execute(
            "SELECT id, user_id, expires_at, last_seen_at FROM sessions WHERE id=? AND expires_at > ?",
            (session_id, now),
        )).fetchone()
        if not row:
            return None
        # Sliding window: extend expires_at by full TTL on each access.
        new_expires = now + SESSION_TTL_S * 1000
        await c.execute(
            "UPDATE sessions SET last_seen_at=?, expires_at=? WHERE id=?",
            (now, new_expires, session_id),
        )
        await c.commit()
        return Session(
            id=row["id"], user_id=row["user_id"],
            expires_at=new_expires, last_seen_at=now,
        )


async def logout(session_id: str) -> None:
    if not session_id:
        return
    async with db.connect() as c:
        await c.execute("DELETE FROM sessions WHERE id=?", (session_id,))
        await c.commit()


async def purge_expired_sessions() -> int:
    """Background-job target. Returns count purged."""
    async with db.connect() as c:
        cur = await c.execute(
            "DELETE FROM sessions WHERE expires_at <= ?", (db.now_ms(),)
        )
        await c.commit()
        return cur.rowcount or 0
