"""Shared pytest fixtures for jt-proxense v0.2 tests.

Each test that touches the DB gets a fresh tmp SQLite file via the `db_path`
fixture, so tests don't collide and don't need teardown logic.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

# Make `server` importable when pytest runs from repo root.
_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_ROOT))


@pytest.fixture
def db_path(tmp_path):
    """Fresh SQLite path per test. Configures the global db module + applies
    migrations, so tests can call auth.* / audit.* immediately."""
    from server import db
    p = tmp_path / "jt-proxense.db"
    db.configure(p)
    db.apply_migrations()
    yield p


@pytest.fixture
def reset_failed_logins(db_path):
    """Some tests need a clean failed_logins table; the rate limiter is
    additive across tests if not reset (each test gets its own db_path now,
    but keeping this fixture for future-shared-DB scenarios)."""
    from server import db as db_mod
    with db_mod.connect_sync() as c:
        c.execute("DELETE FROM failed_logins")
    yield
