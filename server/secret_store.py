"""Encrypted at-rest store for per-cluster secrets.

Master key
==========
Lives at MASTER_KEY_PATH (default /etc/jt-proxense/master.key).
Format: a Fernet key (urlsafe-base64 of 32 bytes).
Permissions: chmod 600, owned by the service user.
**Lose this file → every encrypted row in the SQLite store is unreadable.**

SQLite table
============
`cluster_secrets` (PK: cluster_id, kind). See migrations/005_*.sql.
The `payload` column is a Fernet token (already authenticated + encrypted).

Public API
==========
    ensure_master_key() -> Path
    load_master_key() -> bytes
    fingerprint() -> str         # short SHA-256 prefix of the active key, for ops
    put(cluster_id, kind, value, *, actor)
    get(cluster_id, kind) -> str | None
    delete(cluster_id, kind, *, actor) -> bool
    list_secrets() -> list[dict]
    rotate_key(*, actor) -> str  # returns new key fingerprint
    export_dump(path, *, actor)
    import_dump(path, *, actor)

CLI / API surfaces are thin wrappers around these.

All functions are synchronous — secret operations are infrequent + small,
running them through an executor isn't worth the complexity.
"""
from __future__ import annotations

import base64
import hashlib
import json
import logging
import os
import sqlite3
import time
from pathlib import Path
from typing import Optional

from cryptography.fernet import Fernet, InvalidToken

from .config import get_config


logger = logging.getLogger(__name__)


# Default location — overridable for tests + alternative deployments.
MASTER_KEY_PATH = Path(os.environ.get(
    "JT_PROXENSE_MASTER_KEY_PATH", "/etc/jt-proxense/master.key"
))


# ---------------------------------------------------------------- master key

def ensure_master_key(path: Path | None = None) -> Path:
    """Generate the master key file if missing. Idempotent + safe to call
    on every startup. Permissions are forced to 600 each time."""
    p = path or MASTER_KEY_PATH
    if p.exists():
        try:
            os.chmod(p, 0o600)
        except OSError as e:
            # Don't fail startup, but surface it loudly — a world-readable
            # master key is a real exposure the operator needs to know about.
            logger.error("could not enforce 0600 on master key %s: %s — "
                         "fix file permissions manually", p, e)
        return p
    p.parent.mkdir(parents=True, exist_ok=True)
    key = Fernet.generate_key()
    # Write atomically: tmp file then rename, so a crash mid-write can't
    # leave a half-written master.key.
    tmp = p.with_suffix(p.suffix + ".tmp")
    tmp.write_bytes(key)
    os.chmod(tmp, 0o600)
    os.replace(tmp, p)
    logger.warning(
        "generated new master key at %s — back this file up; loss = total "
        "loss of every encrypted secret", p,
    )
    return p


def load_master_key(path: Path | None = None) -> bytes:
    p = path or MASTER_KEY_PATH
    if not p.exists():
        ensure_master_key(p)
    return p.read_bytes().strip()


def fingerprint(key: bytes | None = None) -> str:
    """Short SHA-256 fingerprint (first 12 hex chars) of the master key.
    Lets operators eyeball whether two installs share the same key without
    revealing the key itself."""
    k = key or load_master_key()
    return hashlib.sha256(k).hexdigest()[:12]


# ---------------------------------------------------------------- DB helpers

def _conn() -> sqlite3.Connection:
    """Use db._db_path so we share the same SQLite file the rest of the
    service does — including under tests where conftest reroutes the path."""
    from . import db
    if not db._db_path.exists():
        db.apply_migrations()
    # Defensive: tests + fresh installs may have a DB that's missing the
    # 005 tables (e.g. the conftest fixture pre-creates the file with
    # earlier migrations only). Re-run migrations to top up.
    c = sqlite3.connect(db._db_path, isolation_level=None)
    c.row_factory = sqlite3.Row
    c.execute("PRAGMA foreign_keys=ON")
    has = c.execute(
        "SELECT 1 FROM sqlite_master WHERE type='table' AND name='cluster_secrets'"
    ).fetchone()
    if not has:
        c.close()
        db.apply_migrations()
        c = sqlite3.connect(db._db_path, isolation_level=None)
        c.row_factory = sqlite3.Row
        c.execute("PRAGMA foreign_keys=ON")
    return c


def _log_event(conn: sqlite3.Connection, *,
               cluster_id: str, kind: str, event: str,
               actor: str, note: str = "") -> None:
    conn.execute(
        "INSERT INTO cluster_secret_events (cluster_id, kind, event, actor, ts, note) "
        "VALUES (?, ?, ?, ?, ?, ?)",
        (cluster_id, kind, event, actor, int(time.time() * 1000), note),
    )


# ---------------------------------------------------------------- CRUD

def put(cluster_id: str, kind: str, value: str, *, actor: str = "cli") -> None:
    """Encrypt + upsert. Empty `value` is rejected (use delete() instead)."""
    if not cluster_id or not kind:
        raise ValueError("cluster_id and kind are required")
    if not value:
        raise ValueError("empty value — use delete() to clear a secret")
    key = load_master_key()
    f = Fernet(key)
    payload = f.encrypt(value.encode("utf-8"))
    fp = fingerprint(key)
    now = int(time.time() * 1000)
    with _conn() as c:
        existing = c.execute(
            "SELECT created_at FROM cluster_secrets WHERE cluster_id=? AND kind=?",
            (cluster_id, kind),
        ).fetchone()
        created_at = existing["created_at"] if existing else now
        c.execute(
            "INSERT INTO cluster_secrets (cluster_id, kind, payload, key_id, created_at, updated_at) "
            "VALUES (?, ?, ?, ?, ?, ?) "
            "ON CONFLICT(cluster_id, kind) DO UPDATE SET "
            "  payload=excluded.payload, key_id=excluded.key_id, updated_at=excluded.updated_at",
            (cluster_id, kind, payload, fp, created_at, now),
        )
        _log_event(c, cluster_id=cluster_id, kind=kind, event="set", actor=actor)


def get(cluster_id: str, kind: str) -> Optional[str]:
    """Decrypt + return; None if absent. Raises on master-key mismatch."""
    if not cluster_id or not kind:
        return None
    try:
        with _conn() as c:
            row = c.execute(
                "SELECT payload FROM cluster_secrets WHERE cluster_id=? AND kind=?",
                (cluster_id, kind),
            ).fetchone()
    except sqlite3.OperationalError:
        # Migration may not have run yet on a brand-new install.
        return None
    if row is None:
        return None
    f = Fernet(load_master_key())
    try:
        return f.decrypt(row["payload"]).decode("utf-8")
    except InvalidToken:
        # Master key was rotated and this row hasn't been re-encrypted, OR
        # the master key file was replaced with a different one. Surface
        # loudly — this is operator-attention-required.
        logger.error(
            "InvalidToken decrypting %s/%s — master key mismatch. "
            "Run `jt-proxense secret rotate-key` if this was an intentional "
            "key change.", cluster_id, kind,
        )
        return None


def delete(cluster_id: str, kind: str, *, actor: str = "cli") -> bool:
    with _conn() as c:
        cur = c.execute(
            "DELETE FROM cluster_secrets WHERE cluster_id=? AND kind=?",
            (cluster_id, kind),
        )
        if cur.rowcount > 0:
            _log_event(c, cluster_id=cluster_id, kind=kind, event="rm", actor=actor)
            return True
    return False


def list_secrets() -> list[dict]:
    """Returns metadata only — never values. Each entry:
    {cluster_id, kind, key_id, created_at, updated_at}."""
    with _conn() as c:
        rows = c.execute(
            "SELECT cluster_id, kind, key_id, created_at, updated_at "
            "FROM cluster_secrets ORDER BY cluster_id, kind"
        ).fetchall()
    return [dict(r) for r in rows]


def has_secret(cluster_id: str, kind: str) -> bool:
    """Cheap presence check — used by the WebUI / config response to draw
    the "password configured" indicator without decrypting."""
    try:
        with _conn() as c:
            row = c.execute(
                "SELECT 1 FROM cluster_secrets WHERE cluster_id=? AND kind=?",
                (cluster_id, kind),
            ).fetchone()
    except sqlite3.OperationalError:
        return False
    return row is not None


# ---------------------------------------------------------------- rotate

def rotate_key(*, actor: str = "cli", new_key: bytes | None = None) -> str:
    """Generate a new master key, re-encrypt every row, atomically replace
    the keyfile, return the new fingerprint.

    Steps:
      1. Read every payload, decrypt with old key.
      2. Encrypt each with new key, stash in memory.
      3. Write new keyfile (tmp+rename for atomicity).
      4. UPDATE every row in a single transaction.

    If step 4 partially fails, we re-encrypt back to old key. (We can't
    afford a half-rotated DB — operators would think rows are corrupted.)
    """
    old_key = load_master_key()
    old_f = Fernet(old_key)
    new_k = new_key or Fernet.generate_key()
    new_f = Fernet(new_k)

    with _conn() as c:
        rows = c.execute(
            "SELECT cluster_id, kind, payload FROM cluster_secrets"
        ).fetchall()
        # Decrypt all + re-encrypt all BEFORE touching the keyfile.
        re_encrypted: list[tuple[bytes, str, str, str]] = []
        for r in rows:
            try:
                clear = old_f.decrypt(r["payload"])
            except InvalidToken:
                raise RuntimeError(
                    f"can't decrypt {r['cluster_id']}/{r['kind']} with current "
                    f"master key — rotate aborted to prevent data loss"
                )
            re_encrypted.append(
                (new_f.encrypt(clear), r["cluster_id"], r["kind"], fingerprint(new_k))
            )

        # Atomic write of new keyfile.
        p = MASTER_KEY_PATH
        p.parent.mkdir(parents=True, exist_ok=True)
        tmp = p.with_suffix(p.suffix + ".tmp")
        tmp.write_bytes(new_k)
        os.chmod(tmp, 0o600)
        os.replace(tmp, p)

        # Single transaction.
        c.execute("BEGIN")
        try:
            for payload, cid, kind, key_id in re_encrypted:
                c.execute(
                    "UPDATE cluster_secrets SET payload=?, key_id=?, updated_at=? "
                    "WHERE cluster_id=? AND kind=?",
                    (payload, key_id, int(time.time() * 1000), cid, kind),
                )
            _log_event(c, cluster_id="*", kind="*", event="rotate",
                       actor=actor, note=fingerprint(new_k))
            c.execute("COMMIT")
        except Exception:
            c.execute("ROLLBACK")
            # Try to restore old key file on failure.
            tmp.write_bytes(old_key)
            os.chmod(tmp, 0o600)
            os.replace(tmp, p)
            raise

    return fingerprint(new_k)


# ---------------------------------------------------------------- export/import

# Dump format: JSON with plaintext values, wrapped in Fernet using a passphrase.
# Operators have to enter the passphrase on import. This is so the dump file
# is meaningful (you can move it to a fresh install) without us re-using the
# master key (which the destination install won't have).

# New passphrase-encryption envelope: a magic prefix + 16-byte random salt +
# Fernet token. Old dumps (raw Fernet token, no prefix) used a FIXED salt at
# 100k iterations — _decrypt_with_passphrase still reads those, so existing
# bundles keep importing. New dumps use a per-dump random salt at 200k.
_KDF_MAGIC = b"JTPSALT1:"
_LEGACY_SALT = b"jt-proxense-secret-export-v1"


def _derive_key(passphrase: str, salt: bytes, iterations: int) -> bytes:
    from cryptography.hazmat.primitives import hashes
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt,
                     iterations=iterations)
    return base64.urlsafe_b64encode(kdf.derive(passphrase.encode("utf-8")))


def _passphrase_to_key(passphrase: str) -> bytes:
    """Legacy fixed-salt deriver (100k). Kept for decrypting old dumps."""
    return _derive_key(passphrase, _LEGACY_SALT, 100_000)


def _encrypt_with_passphrase(passphrase: str, data: bytes) -> bytes:
    """Encrypt `data` under a passphrase using a per-call random salt."""
    salt = os.urandom(16)
    token = Fernet(_derive_key(passphrase, salt, 200_000)).encrypt(data)
    return _KDF_MAGIC + salt + token


def _decrypt_with_passphrase(passphrase: str, blob: bytes) -> bytes:
    """Decrypt a blob from _encrypt_with_passphrase, OR a legacy fixed-salt
    Fernet token. Raises cryptography.fernet.InvalidToken on wrong passphrase."""
    if blob.startswith(_KDF_MAGIC):
        off = len(_KDF_MAGIC)
        salt, token = blob[off:off + 16], blob[off + 16:]
        return Fernet(_derive_key(passphrase, salt, 200_000)).decrypt(token)
    return Fernet(_passphrase_to_key(passphrase)).decrypt(blob)


def export_dump(path: Path, *, passphrase: str, actor: str = "cli") -> int:
    """Write an encrypted JSON dump containing every secret as plaintext,
    keyed by a passphrase the operator chooses. Returns row count."""
    if not passphrase or len(passphrase) < 8:
        raise ValueError("passphrase must be at least 8 characters")
    f = Fernet(load_master_key())
    out: list[dict] = []
    with _conn() as c:
        rows = c.execute(
            "SELECT cluster_id, kind, payload FROM cluster_secrets"
        ).fetchall()
        for r in rows:
            try:
                clear = f.decrypt(r["payload"]).decode("utf-8")
            except InvalidToken:
                logger.warning(
                    "skipping unreadable row %s/%s during export (key mismatch)",
                    r["cluster_id"], r["kind"],
                )
                continue
            out.append({"cluster_id": r["cluster_id"], "kind": r["kind"], "value": clear})
        _log_event(c, cluster_id="*", kind="*", event="export",
                   actor=actor, note=f"{len(out)} rows")

    payload = json.dumps({
        "version": 1,
        "exported_at": int(time.time()),
        "rows": out,
    }, ensure_ascii=False).encode("utf-8")
    wrap = _encrypt_with_passphrase(passphrase, payload)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(wrap)
    os.chmod(path, 0o600)
    return len(out)


def import_dump(path: Path, *, passphrase: str, actor: str = "cli",
                overwrite: bool = False) -> int:
    """Read a dump produced by export_dump + put() each row. Returns count
    written. With overwrite=False, existing rows are skipped."""
    if not path.exists():
        raise FileNotFoundError(path)
    blob = path.read_bytes()
    try:
        clear = _decrypt_with_passphrase(passphrase, blob)
    except InvalidToken:
        raise ValueError("import passphrase is wrong")
    data = json.loads(clear.decode("utf-8"))
    if data.get("version") != 1:
        raise ValueError(f"unsupported dump version {data.get('version')}")

    written = 0
    for row in data.get("rows") or []:
        cid, kind, value = row.get("cluster_id"), row.get("kind"), row.get("value")
        if not (cid and kind and value):
            continue
        if not overwrite and has_secret(cid, kind):
            continue
        put(cid, kind, value, actor=f"import:{actor}")
        written += 1
    with _conn() as c:
        _log_event(c, cluster_id="*", kind="*", event="import",
                   actor=actor, note=f"{written} rows")
    return written


# ---------------------------------------------------------------- migration

def migrate_from_yaml(*, actor: str = "system") -> list[tuple[str, str]]:
    """One-shot helper used by install.sh upgrades + the service itself on
    first start: detect any cluster.auth.password in config.yaml, store it
    encrypted, and clear it from yaml. Returns list of migrated cluster ids."""
    cfg = get_config()
    migrated: list[tuple[str, str]] = []
    for cluster in cfg.clusters:
        pw = (cluster.auth.password or "").strip()
        if not pw:
            continue
        if has_secret(cluster.id, "pve_password"):
            # Already in store — yaml is stale; clear it but don't overwrite.
            cluster.auth.password = ""
            migrated.append((cluster.id, "skipped_already_present"))
            continue
        try:
            put(cluster.id, "pve_password", pw, actor=actor)
        except Exception as e:
            logger.error("migrate %s/pve_password failed: %s", cluster.id, e)
            continue
        cluster.auth.password = ""
        with _conn() as c:
            _log_event(c, cluster_id=cluster.id, kind="pve_password",
                       event="migrate", actor=actor, note="from config.yaml")
        migrated.append((cluster.id, "ok"))

    if migrated:
        from .config import save_config
        save_config(cfg)
        logger.warning(
            "migrated %d cluster password(s) from config.yaml into encrypted store",
            len([m for m in migrated if m[1] == "ok"]),
        )
    return migrated
