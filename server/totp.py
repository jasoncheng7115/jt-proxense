"""TOTP 2FA + backup codes for jt-proxense v0.2.x.

Design:
- TOTP secret is RFC 4226 base32, stored plain (see migration 002 comment).
- Enrollment is a 2-step flow:
    1. /enroll-init  → generates secret, returns otpauth:// URL + QR PNG.
       Secret is staged on the user row but `totp_enabled=0`.
    2. /enroll-verify → user submits a code from their authenticator;
       if valid, we flip `totp_enabled=1` and emit 8 single-use backup codes.
- Login flow integration:
    - auth.login() succeeds → if user has totp_enabled, login_handler
      returns 200 with `{totp_required: true, pending_token: <short-lived>}`.
      Frontend then submits /api/auth/totp/login with code + pending_token.
    - Backup codes work as one-time alternates; consumed on use.
- CLI back door: `jt-proxense user reset-totp <user>` clears the user's
  TOTP secret and disables 2FA, no other recovery needed.
"""
from __future__ import annotations

import base64
import io
import logging
import secrets
from typing import Optional

import pyotp
import qrcode

from . import db
from .auth import hash_password, verify_password


logger = logging.getLogger(__name__)

ISSUER = "JT-PROXENSE"
BACKUP_CODE_COUNT = 8
PENDING_TOKEN_TTL_S = 120          # 2 minutes to enter the TOTP code


# ---------------------------------------------------------------- secret API

def generate_secret() -> str:
    """20-byte base32 (RFC 4226 recommended length)."""
    return pyotp.random_base32(length=32)


def stage_secret(username: str, secret: str) -> None:
    """Save the secret on the user row but DO NOT enable TOTP yet.

    Called at enroll-init. Disabling-then-restaging clears any prior
    enrollment in progress.
    """
    with db.connect_sync() as c:
        cur = c.execute(
            "UPDATE users SET totp_secret=?, totp_enabled=0, totp_enrolled_at=NULL WHERE username=? COLLATE NOCASE",
            (secret, username),
        )
        if cur.rowcount == 0:
            raise ValueError(f"no such user: {username}")


def confirm_enrollment(username: str, code: str) -> tuple[bool, list[str]]:
    """Verify the supplied code against the staged secret. On success,
    flip totp_enabled=1 and generate backup codes (returned plaintext to
    the caller — they must show them once and not persist them anywhere).

    Returns (success, backup_codes_plaintext). On failure backup_codes is [].
    """
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT id, totp_secret FROM users WHERE username=? COLLATE NOCASE",
            (username,),
        ).fetchone()
        if not row or not row["totp_secret"]:
            return False, []
        if not pyotp.TOTP(row["totp_secret"]).verify(code, valid_window=1):
            return False, []

        # Lock in TOTP + generate backup codes.
        c.execute(
            "UPDATE users SET totp_enabled=1, totp_enrolled_at=? WHERE id=?",
            (db.now_ms(), row["id"]),
        )
        # Wipe any leftover backup codes from previous enrollments.
        c.execute("DELETE FROM totp_backup_codes WHERE user_id=?", (row["id"],))

        codes = [_random_backup_code() for _ in range(BACKUP_CODE_COUNT)]
        for code_plain in codes:
            c.execute(
                "INSERT INTO totp_backup_codes (user_id, code_hash, created_at) VALUES (?,?,?)",
                (row["id"], hash_password(code_plain), db.now_ms()),
            )
        return True, codes


def disable(username: str) -> bool:
    """Operator-initiated disable (used by /api/auth/totp/disable and CLI).

    Clears the secret + enabled flag + backup codes. Returns True if user
    existed.
    """
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT id FROM users WHERE username=? COLLATE NOCASE", (username,)
        ).fetchone()
        if not row:
            return False
        c.execute(
            "UPDATE users SET totp_secret=NULL, totp_enabled=0, totp_enrolled_at=NULL WHERE id=?",
            (row["id"],),
        )
        c.execute("DELETE FROM totp_backup_codes WHERE user_id=?", (row["id"],))
    return True


# ---------------------------------------------------------------- verification

def is_enabled(user_id: int) -> bool:
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT totp_enabled FROM users WHERE id=?", (user_id,)
        ).fetchone()
        return bool(row and row["totp_enabled"])


def verify_code(user_id: int, code: str) -> bool:
    """Try TOTP first; on failure, try backup codes. Backup codes are
    single-use — consumed on success.

    `code` may be a 6-digit TOTP code, or a backup code (longer, plaintext).
    """
    # Trim whitespace; users sometimes copy "123 456" from authenticator apps.
    # Do NOT strip hyphens — backup codes (token_urlsafe) may contain them.
    code = (code or "").strip().replace(" ", "")
    if not code:
        return False

    with db.connect_sync() as c:
        row = c.execute(
            "SELECT totp_secret, totp_enabled FROM users WHERE id=?", (user_id,)
        ).fetchone()
        if not row or not row["totp_enabled"] or not row["totp_secret"]:
            return False

        # Try TOTP first if the code looks like 6 digits.
        if len(code) == 6 and code.isdigit():
            if pyotp.TOTP(row["totp_secret"]).verify(code, valid_window=1):
                return True

        # Fall through to backup codes.
        rows = c.execute(
            "SELECT id, code_hash FROM totp_backup_codes WHERE user_id=? AND used_at IS NULL",
            (user_id,),
        ).fetchall()
        for r in rows:
            if verify_password(code, r["code_hash"]):
                c.execute(
                    "UPDATE totp_backup_codes SET used_at=? WHERE id=?",
                    (db.now_ms(), r["id"]),
                )
                return True
    return False


def remaining_backup_codes(user_id: int) -> int:
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT COUNT(*) AS n FROM totp_backup_codes WHERE user_id=? AND used_at IS NULL",
            (user_id,),
        ).fetchone()
        return int(row["n"] or 0)


# ---------------------------------------------------------------- presentation

def otpauth_url(username: str, secret: str) -> str:
    """RFC 6238 otpauth URL — what authenticator apps consume."""
    return pyotp.totp.TOTP(secret).provisioning_uri(
        name=username, issuer_name=ISSUER,
    )


def qr_png_data_uri(otpauth: str) -> str:
    """Return a `data:image/png;base64,...` URI for the QR. Frontends
    can stuff this directly into <img src=...>."""
    img = qrcode.make(otpauth, box_size=6, border=2)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


# ---------------------------------------------------------------- pending tokens

# When primary auth (password) succeeds but TOTP is required, we issue a
# short-lived "pending token" that the client trades for a real session
# after submitting the second factor. This avoids leaving a half-authenticated
# session in the sessions table.
#
# Implementation: in-memory map (process-local). For multi-process deploys
# in the future, move to a Redis-style external store. v0.2 single process is fine.

_pending_tokens: dict[str, tuple[int, int]] = {}  # token -> (user_id, expires_at_ms)


def issue_pending_token(user_id: int) -> str:
    tok = secrets.token_urlsafe(32)
    _pending_tokens[tok] = (user_id, db.now_ms() + PENDING_TOKEN_TTL_S * 1000)
    _gc_pending()
    return tok


def consume_pending_token(token: str) -> Optional[int]:
    _gc_pending()
    entry = _pending_tokens.pop(token, None)
    if not entry:
        return None
    user_id, exp = entry
    if db.now_ms() > exp:
        return None
    return user_id


def _gc_pending() -> None:
    now = db.now_ms()
    expired = [t for t, (_, exp) in _pending_tokens.items() if exp < now]
    for t in expired:
        _pending_tokens.pop(t, None)


# ---------------------------------------------------------------- backup codes

def _random_backup_code() -> str:
    """20-char URL-safe random — easy to type, hard to guess."""
    return secrets.token_urlsafe(15)[:20]
