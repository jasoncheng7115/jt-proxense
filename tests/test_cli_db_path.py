"""The operator CLI must act on the SAME database the daemon uses.

`bin/jt-proxense` is the documented way back in when an auth misconfig locks the
operator out. It used to take the DB path from $JTPROXENSE_DB_PATH or a
compiled-in default and never looked at config.yaml's `auth.db_path` — so on a
deployment with a non-default path, `reset-password` reported success against a
database nobody reads, `user list` came back empty, and export-config bundled the
wrong DB. Found while building a throwaway pentest target (the CLI wrote users
into /var/lib while the daemon read the temp DB).

Precedence asserted here: $JTPROXENSE_DB_PATH > config.yaml auth.db_path > default.
"""
import os
import pathlib
import sqlite3
import subprocess
import sys

import pytest

ROOT = pathlib.Path(__file__).parent.parent
CLI = ROOT / "bin" / "jt-proxense"


def _run(args, cfg, extra_env=None):
    env = dict(os.environ)
    env["JTPROXENSE_CONFIG"] = str(cfg)
    env.pop("JTPROXENSE_DB_PATH", None)
    env.setdefault("JT_PROXENSE_MASTER_KEY_PATH", str(cfg.parent / "master.key"))
    env["PYTHONPATH"] = str(ROOT)
    env.update(extra_env or {})
    return subprocess.run([sys.executable, str(CLI), *args],
                          capture_output=True, text=True, env=env, cwd=str(ROOT),
                          timeout=60)


def _write_cfg(tmp_path, db_path):
    cfg = tmp_path / "config.yaml"
    cfg.write_text(
        "server:\n  host: 127.0.0.1\n  http_port: 8099\n"
        "auth:\n  enabled: true\n  backend: local\n"
        f"  db_path: \"{db_path}\"\n"
        "clusters: []\n", encoding="utf-8")
    return cfg


@pytest.mark.skipif(not CLI.exists(), reason="CLI not present")
def test_cli_uses_db_path_from_config(tmp_path):
    db = tmp_path / "custom.db"
    cfg = _write_cfg(tmp_path, db)
    r = _run(["user", "add", "cfguser", "--password", "Passw0rd-Test!"], cfg)
    assert r.returncode == 0, r.stderr or r.stdout
    assert db.exists(), "CLI ignored auth.db_path and wrote elsewhere"
    names = [row[0] for row in
             sqlite3.connect(db).execute("SELECT username FROM users")]
    assert "cfguser" in names


@pytest.mark.skipif(not CLI.exists(), reason="CLI not present")
def test_env_var_still_wins_over_config(tmp_path):
    """An explicit override must beat the config file."""
    cfg_db = tmp_path / "from-config.db"
    env_db = tmp_path / "from-env.db"
    cfg = _write_cfg(tmp_path, cfg_db)
    r = _run(["user", "add", "envuser", "--password", "Passw0rd-Test!"], cfg,
             {"JTPROXENSE_DB_PATH": str(env_db)})
    assert r.returncode == 0, r.stderr or r.stdout
    assert env_db.exists()
    assert not cfg_db.exists(), "config path was used despite the env override"


@pytest.mark.skipif(not CLI.exists(), reason="CLI not present")
def test_unreadable_config_falls_back_without_crashing(tmp_path):
    """A missing/corrupt config must not take the recovery tool down with it."""
    cfg = tmp_path / "nope.yaml"          # never created
    r = _run(["user", "list"], cfg)
    # It may find no users, but it must not traceback.
    assert "Traceback" not in (r.stderr or "")
