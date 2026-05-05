"""Migrations + DB connection behavior."""
import sqlite3

import pytest

from server import db


def test_migrations_apply_cleanly(db_path):
    """schema_version equals the number of migration files in server/migrations/."""
    from server.db import _list_migration_files, _migration_version
    expected = max((_migration_version(f) for f in _list_migration_files()), default=0)
    assert db.schema_version() == expected
    assert expected >= 1


def test_migrations_idempotent(db_path):
    """Re-running apply_migrations on an already-current DB is a no-op."""
    v1 = db.schema_version()
    db.apply_migrations()
    db.apply_migrations()
    assert db.schema_version() == v1


def test_wal_mode_set(db_path):
    with db.connect_sync() as c:
        row = c.execute("PRAGMA journal_mode").fetchone()
        assert row[0].lower() == "wal"


def test_required_tables_exist(db_path):
    with db.connect_sync() as c:
        names = {r[0] for r in c.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )}
    for required in ("users", "sessions", "roles", "audit_log",
                     "failed_logins", "schema_version"):
        assert required in names, f"missing table: {required}"


def test_audit_log_append_only_update(db_path):
    """Trigger must reject UPDATE on audit_log."""
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO audit_log (ts, user, source_ip, action, result, request_id) "
            "VALUES (?,?,?,?,?,?)",
            (1, "test", "127.0.0.1", "test.action", "ok", "abc"),
        )
    with pytest.raises(sqlite3.IntegrityError, match="append-only"):
        with db.connect_sync() as c:
            c.execute("UPDATE audit_log SET action='hacked'")


def test_audit_log_append_only_delete(db_path):
    """Trigger must reject DELETE on audit_log."""
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO audit_log (ts, user, source_ip, action, result, request_id) "
            "VALUES (?,?,?,?,?,?)",
            (1, "test", "127.0.0.1", "test.action", "ok", "abc"),
        )
    with pytest.raises(sqlite3.IntegrityError, match="append-only"):
        with db.connect_sync() as c:
            c.execute("DELETE FROM audit_log")


def test_username_unique_constraint(db_path):
    """users.username has UNIQUE — second insert must raise."""
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO users (username, password_hash, created_at) VALUES (?,?,?)",
            ("alice", "x", 1),
        )
    with pytest.raises(sqlite3.IntegrityError):
        with db.connect_sync() as c:
            c.execute(
                "INSERT INTO users (username, password_hash, created_at) VALUES (?,?,?)",
                ("alice", "x", 1),
            )


def test_username_collation_case_insensitive(db_path):
    """username should be COLLATE NOCASE — Alice == alice."""
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO users (username, password_hash, created_at) VALUES (?,?,?)",
            ("Alice", "x", 1),
        )
        row = c.execute(
            "SELECT username FROM users WHERE username='alice' COLLATE NOCASE"
        ).fetchone()
    assert row is not None
    assert row[0] == "Alice"


def test_role_check_constraint(db_path):
    """roles.role has CHECK constraint — invalid role rejected."""
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO users (username, password_hash, created_at) VALUES (?,?,?)",
            ("u1", "x", 1),
        )
        with pytest.raises(sqlite3.IntegrityError):
            c.execute(
                "INSERT INTO roles (user_id, cluster_id, role, created_at) "
                "VALUES (?,?,?,?)",
                (1, "*", "godmode", 1),
            )


def test_session_cascade_delete(db_path):
    """ON DELETE CASCADE: removing a user should drop their sessions."""
    with db.connect_sync() as c:
        c.execute(
            "INSERT INTO users (username, password_hash, created_at) VALUES (?,?,?)",
            ("u1", "x", 1),
        )
        c.execute(
            "INSERT INTO sessions (id, user_id, created_at, expires_at, last_seen_at) "
            "VALUES (?,?,?,?,?)",
            ("sid1", 1, 1, 999999, 1),
        )
        # Cascade requires foreign_keys ON, which connect_sync sets via PRAGMA
        c.execute("DELETE FROM users WHERE id=1")
        n = c.execute("SELECT COUNT(*) FROM sessions").fetchone()[0]
    assert n == 0
