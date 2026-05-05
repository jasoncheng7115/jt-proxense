"""PAM authentication backend (Jason A1).

When `config.auth.backend = 'pam'` is set, password verification delegates to
PAM's `login` service (or whatever `pam_service` config setting names). On
success we ensure a row exists in the local `users` table — created with a
sentinel password_hash that nothing can match, so even with the row in place,
local-backend login attempts always fail.

Roles stay in our SQLite. PAM owns the password question; we own
authorization. CLI back door (`jt-proxense ...`) always uses local-backend
flows — that way an operator can always reset auth even if PAM is broken.

Why a sentinel hash instead of NULL? Because verify_password handles None
inconsistently across versions of argon2-cffi. A literal "*" is unambiguous
and never matches.
"""
from __future__ import annotations

import logging
from typing import Optional

import pam

from . import db


logger = logging.getLogger(__name__)

# Marks a user row as "this account is PAM-managed; never accept local login"
SENTINEL_PAM_HASH = "*PAM*"


def verify(username: str, password: str, *, service: str = "login") -> bool:
    """Authenticate (username, password) against PAM. Returns True on success.

    Raises nothing — PAM errors are squashed to False with a logged warning,
    so a misconfigured PAM stack can't crash the request handler.
    """
    if not username or not password:
        return False
    try:
        p = pam.pam()
        ok = p.authenticate(username, password, service=service)
        if not ok:
            logger.info("PAM rejected user %s: code=%s reason=%s",
                        username, p.code, p.reason)
        return bool(ok)
    except Exception as e:
        logger.warning("PAM exception for user %s: %s", username, e)
        return False


def ensure_local_row(username: str) -> int:
    """Idempotently make sure a `users` row exists for `username` so we can
    attach roles + sessions + audit entries to a stable user id. Returns the
    user id. Created rows have password_hash = SENTINEL_PAM_HASH so nothing
    can ever pass local auth against them."""
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT id FROM users WHERE username=? COLLATE NOCASE", (username,)
        ).fetchone()
        if row:
            return row["id"]
        cur = c.execute(
            "INSERT INTO users (username, password_hash, created_at) VALUES (?,?,?)",
            (username, SENTINEL_PAM_HASH, db.now_ms()),
        )
        return cur.lastrowid


def is_pam_managed(user_row: dict) -> bool:
    """A row is PAM-managed when its hash is the sentinel."""
    return user_row.get("password_hash") == SENTINEL_PAM_HASH
