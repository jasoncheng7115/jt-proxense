"""SQLite layer for jt-proxense v0.2+.

Single-file SQLite at $JTPROXENSE_DB_PATH (default /var/lib/jt-proxense/jt-proxense.db).
WAL mode. aiosqlite for async access from the aiohttp event loop. Synchronous
helpers also exposed for the CLI back door, which must work without a running
event loop.

Migrations are forward-only SQL files in `server/migrations/NNN_*.sql`. On
startup we read `schema_version` and apply anything newer.
"""
from __future__ import annotations

import logging
import sqlite3
import time
from contextlib import asynccontextmanager, contextmanager
from pathlib import Path
from typing import Optional

import aiosqlite

logger = logging.getLogger(__name__)

# Default DB path lives on a writable system path (created by install.sh).
DEFAULT_DB_PATH = Path("/var/lib/jt-proxense/jt-proxense.db")
MIGRATIONS_DIR = Path(__file__).parent / "migrations"

_db_path: Path = DEFAULT_DB_PATH


def now_ms() -> int:
    """Monotonic-ish unix epoch ms for timestamping."""
    return int(time.time() * 1000)


def configure(db_path: Path | str) -> None:
    """Set the global DB path. Call once at startup before any open()."""
    global _db_path
    _db_path = Path(db_path)
    _db_path.parent.mkdir(parents=True, exist_ok=True)


def get_path() -> Path:
    return _db_path


# ---------------------------------------------------------------- migrations

def _list_migration_files() -> list[Path]:
    """Sorted list of migration SQL files."""
    if not MIGRATIONS_DIR.is_dir():
        return []
    return sorted(MIGRATIONS_DIR.glob("[0-9][0-9][0-9]_*.sql"))


def _migration_version(p: Path) -> int:
    return int(p.name.split("_", 1)[0])


def apply_migrations() -> None:
    """Apply any pending migrations. Synchronous, called once at startup
    AND by the CLI (which needs DB access without an event loop)."""
    _db_path.parent.mkdir(parents=True, exist_ok=True)
    files = _list_migration_files()
    if not files:
        logger.warning("no migration files found at %s", MIGRATIONS_DIR)
        return

    with sqlite3.connect(_db_path, isolation_level=None) as conn:
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")

        # Bootstrap: schema_version table may not exist yet.
        cur = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='schema_version'"
        )
        has_version_table = cur.fetchone() is not None
        current = 0
        if has_version_table:
            cur = conn.execute("SELECT MAX(version) FROM schema_version")
            row = cur.fetchone()
            current = (row and row[0]) or 0

        for f in files:
            v = _migration_version(f)
            if v <= current:
                continue
            logger.info("applying migration %s", f.name)
            sql = f.read_text(encoding="utf-8")
            # SQLite executes multi-statement scripts via executescript; this
            # commits implicitly. Each migration file is its own atomic unit.
            conn.executescript(sql)


# ---------------------------------------------------------------- async API

@asynccontextmanager
async def connect():
    """Acquire an aiosqlite connection with sane pragmas. Caller owns commits.

    Use as: `async with db.connect() as c: ...`
    """
    db = await aiosqlite.connect(_db_path)
    try:
        await db.execute("PRAGMA foreign_keys=ON")
        await db.execute("PRAGMA journal_mode=WAL")
        await db.execute("PRAGMA busy_timeout=5000")
        db.row_factory = aiosqlite.Row
        yield db
    finally:
        await db.close()


# ---------------------------------------------------------------- sync API (CLI)

@contextmanager
def connect_sync():
    """Synchronous SQLite connection for the CLI back door.

    The CLI MUST work without the service running, so it uses sqlite3 directly.
    """
    conn = sqlite3.connect(_db_path)
    conn.row_factory = sqlite3.Row
    try:
        conn.execute("PRAGMA foreign_keys=ON")
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA busy_timeout=5000")
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


# ---------------------------------------------------------------- introspection

def schema_version() -> int:
    """Current applied version number."""
    try:
        with connect_sync() as c:
            cur = c.execute("SELECT MAX(version) FROM schema_version")
            row = cur.fetchone()
            return (row and row[0]) or 0
    except sqlite3.OperationalError:
        # DB doesn't exist or migrations not yet applied
        return 0
