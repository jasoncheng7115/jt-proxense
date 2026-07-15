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


_dummy_hash_cache: Optional[str] = None


def _dummy_hash() -> str:
    """A real Argon2 hash of a random secret, computed once and cached. Used to
    run a full password verification for unknown/ineligible users so login
    response time doesn't reveal which usernames exist (timing enumeration)."""
    global _dummy_hash_cache
    if _dummy_hash_cache is None:
        _dummy_hash_cache = hash_password(secrets.token_urlsafe(16))
    return _dummy_hash_cache


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


def set_enabled(username: str, enabled: bool) -> bool:
    """Enable / disable a user account. Returns True if found."""
    with db.connect_sync() as c:
        cur = c.execute(
            "UPDATE users SET enabled=? WHERE username=?",
            (1 if enabled else 0, username),
        )
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

_ROLE_RANK = {"viewer": 1, "operator": 2, "admin": 3}


def grant_role(username: str, cluster_id: str, role: str,
               *, vm_pattern: str = "*") -> None:
    """Grant `role` on `cluster_id` ('*' = global) for VMs matching `vm_pattern`
    ('*' = any VM). Replaces an existing row with the same triple."""
    if role not in _ROLE_RANK:
        raise ValueError(f"invalid role: {role}")
    user = get_user_by_username(username)
    if not user:
        raise ValueError(f"no such user: {username}")
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO roles (user_id, cluster_id, vm_pattern, role, created_at) "
            "VALUES (?,?,?,?,?) "
            "ON CONFLICT (user_id, cluster_id, vm_pattern) DO UPDATE SET role=excluded.role",
            (user["id"], cluster_id, vm_pattern, role, db.now_ms()),
        )


def revoke_role(username: str, cluster_id: str, *, vm_pattern: str = "*") -> bool:
    user = get_user_by_username(username)
    if not user:
        return False
    with db.connect_sync() as c:
        cur = c.execute(
            "DELETE FROM roles WHERE user_id=? AND cluster_id=? AND vm_pattern=?",
            (user["id"], cluster_id, vm_pattern),
        )
        return cur.rowcount > 0


def get_roles(user_id: int) -> list[dict]:
    """All role grants for a user as a list of dicts. Returns [] if none.

    Schema returned per row: {cluster_id, vm_pattern, role}.
    """
    with db.connect_sync() as c:
        rows = c.execute(
            "SELECT cluster_id, vm_pattern, role FROM roles WHERE user_id=?",
            (user_id,),
        ).fetchall()
        return [dict(r) for r in rows]


def role_for(user_id: int, cluster_id: str,
             *, vm_name: Optional[str] = None,
             vm_tags: Optional[list[str]] = None) -> Optional[str]:
    """Effective role for a user against a target.

    Precedence:
      1. Filter rows whose cluster_id matches (`==` or `==*`).
      2. Filter rows whose vm_pattern matches the target VM (or pattern is `*`).
         Tag patterns: `tag:foo` matches if 'foo' is in vm_tags.
         Name patterns: fnmatch against vm_name.
         If no vm_name supplied, only `*` and tag-only rows count
         (i.e. cluster-level role lookup ignores VM-specific grants).
      3. Among matches, return the highest-rank role.
    """
    import fnmatch
    rows = get_roles(user_id)
    if not rows:
        return None

    matches: list[str] = []
    for r in rows:
        # cluster filter
        if r["cluster_id"] != cluster_id and r["cluster_id"] != "*":
            continue
        pat = r["vm_pattern"]
        if pat == "*":
            matches.append(r["role"])
            continue
        if pat.startswith("tag:"):
            if vm_tags and pat[4:] in vm_tags:
                matches.append(r["role"])
            continue
        # name pattern
        if vm_name is not None and fnmatch.fnmatchcase(vm_name, pat):
            matches.append(r["role"])

    if not matches:
        return None
    # Highest rank wins.
    return max(matches, key=lambda r: _ROLE_RANK.get(r, 0))


def is_sentinel_hash(encoded: Optional[str]) -> bool:
    """True for the placeholder password_hash of a federated (PAM/LDAP) account.
    Sentinels ('*PAM*', '*LDAP*', or any '*'-prefixed marker) are NOT valid
    Argon2 hashes and must never authenticate locally or be treated as a real
    password. Centralised so login eligibility and self-service change-password
    agree on what counts as federated."""
    return bool(encoded) and encoded.startswith("*")


def is_global_admin(username: str) -> bool:
    """True iff `username` exists, is enabled, and holds a GLOBAL (cluster '*')
    admin role."""
    u = get_user_by_username(username)
    if not u or not u.get("enabled", 1):
        return False
    return any(r["cluster_id"] == "*" and r["role"] == "admin"
               for r in get_roles(u["id"]))


def count_enabled_global_admins() -> int:
    """How many enabled users currently hold a global admin role. Used to stop
    the last admin from being deleted / disabled / demoted through the web UI
    (which would leave the instance manageable only via the CLI back door)."""
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT COUNT(DISTINCT u.id) AS n FROM users u "
            "JOIN roles r ON r.user_id = u.id "
            "WHERE u.enabled = 1 AND r.cluster_id = '*' AND r.role = 'admin'"
        ).fetchone()
        return int(row["n"]) if row else 0


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

    Backend selection happens here:
      - config.auth.backend == 'local' (default) → password matched against
        the SQLite users table.
      - config.auth.backend == 'pam' → password verified via PAM. The local
        user row is auto-created on first login (so roles/sessions can attach).
        Local-only sentinel rows always fail local auth.

    Side effects:
      - rate-limit gate first; raises PermissionError if locked out
      - on success: clears that IP's failed_logins
      - on failure: appends to failed_logins
    """
    if is_rate_limited(source_ip):
        raise PermissionError("too many failed logins")

    backend = "local"
    try:
        from .config import get_config
        backend = (get_config().auth.backend or "local").lower()
    except Exception:
        pass

    user = get_user_by_username(username)

    if backend == "pam":
        from . import auth_pam
        if not auth_pam.verify(username, password):
            record_failed_login(source_ip, username)
            return None
        # Authentication succeeded; make sure we have a local row to attach
        # roles + sessions to.
        user_id = auth_pam.ensure_local_row(username)
        user = get_user_by_id(user_id)
        if user and not user["enabled"]:
            record_failed_login(source_ip, username)
            return None
    elif backend == "ldap":
        from . import auth_ldap
        ok, group_dns = auth_ldap.verify(username, password)
        if not ok:
            record_failed_login(source_ip, username)
            return None
        user_id = auth_ldap.ensure_local_row(username)
        user = get_user_by_id(user_id)
        if user and not user["enabled"]:
            record_failed_login(source_ip, username)
            return None
        # Auto-map AD/LDAP groups → roles per config.auth.ldap.group_role_map
        try:
            auth_ldap.apply_group_roles(username, group_dns)
        except Exception as e:
            import logging as _l
            _l.getLogger(__name__).warning("ldap role-grant failed for %s: %s", username, e)
    else:
        # local backend — ALWAYS run a password verification (against a dummy
        # hash when the user is missing/disabled/federated-sentinel) so the
        # response time is the same whether or not the username exists.
        eligible = bool(user and user["enabled"]
                        and not is_sentinel_hash(user["password_hash"]))
        stored = user["password_hash"] if eligible else _dummy_hash()
        pw_ok = verify_password(password, stored)
        if not eligible or not pw_ok:
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
