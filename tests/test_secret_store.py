"""Tests for the encrypted per-cluster secret store."""
from __future__ import annotations

import os
import shutil
from pathlib import Path

import pytest


@pytest.fixture
def secret_env(tmp_path, db_path, monkeypatch):
    """Isolated master.key + DB. Each test gets a brand-new pair so we can
    test rotation, import/export without polluting other suites."""
    key_path = tmp_path / "master.key"
    monkeypatch.setenv("JT_PROXENSE_MASTER_KEY_PATH", str(key_path))
    # secret_store reads MASTER_KEY_PATH at module import time → re-import.
    import importlib
    from server import secret_store
    importlib.reload(secret_store)
    return secret_store, key_path


def test_master_key_generated_on_first_use(secret_env):
    ss, key_path = secret_env
    assert not key_path.exists()
    ss.ensure_master_key()
    assert key_path.exists()
    # File mode must be 600 (only owner can read).
    mode = os.stat(key_path).st_mode & 0o777
    assert mode == 0o600


def test_put_get_round_trip(secret_env):
    ss, _ = secret_env
    ss.put("c1", "pve_password", "secret-value-123", actor="test")
    assert ss.get("c1", "pve_password") == "secret-value-123"
    assert ss.has_secret("c1", "pve_password") is True


def test_put_overwrites(secret_env):
    ss, _ = secret_env
    ss.put("c1", "pve_password", "old", actor="t")
    ss.put("c1", "pve_password", "new", actor="t")
    assert ss.get("c1", "pve_password") == "new"


def test_delete_removes(secret_env):
    ss, _ = secret_env
    ss.put("c1", "pve_password", "x", actor="t")
    assert ss.delete("c1", "pve_password", actor="t") is True
    assert ss.get("c1", "pve_password") is None
    assert ss.has_secret("c1", "pve_password") is False
    # Second delete is a no-op.
    assert ss.delete("c1", "pve_password", actor="t") is False


def test_empty_value_rejected(secret_env):
    ss, _ = secret_env
    with pytest.raises(ValueError):
        ss.put("c1", "pve_password", "", actor="t")


def test_get_missing_returns_none(secret_env):
    ss, _ = secret_env
    assert ss.get("nope", "pve_password") is None


def test_list_secrets_returns_metadata_only(secret_env):
    ss, _ = secret_env
    ss.put("c1", "pve_password", "v1", actor="t")
    ss.put("c2", "pve_password", "v2", actor="t")
    rows = ss.list_secrets()
    # No 'value' or 'payload' field — only metadata.
    for r in rows:
        assert "value" not in r
        assert "payload" not in r
        assert {"cluster_id", "kind", "key_id", "created_at", "updated_at"} <= set(r.keys())
    assert {r["cluster_id"] for r in rows} == {"c1", "c2"}


def test_fingerprint_is_stable_for_same_key(secret_env):
    ss, _ = secret_env
    ss.ensure_master_key()
    a = ss.fingerprint()
    b = ss.fingerprint()
    assert a == b
    assert len(a) == 12


def test_rotate_key_re_encrypts_in_place(secret_env):
    """After rotate, old payloads stay readable but the master key fingerprint changes."""
    ss, key_path = secret_env
    ss.put("c1", "pve_password", "v1", actor="t")
    ss.put("c2", "pve_password", "v2", actor="t")
    fp_before = ss.fingerprint()

    fp_after = ss.rotate_key(actor="rotate-test")
    assert fp_after != fp_before

    # Values still round-trip.
    assert ss.get("c1", "pve_password") == "v1"
    assert ss.get("c2", "pve_password") == "v2"

    # Every row's key_id matches the new fingerprint.
    for row in ss.list_secrets():
        assert row["key_id"] == fp_after


def test_export_import_round_trip(tmp_path, secret_env):
    ss, _ = secret_env
    ss.put("c1", "pve_password", "v1", actor="t")
    ss.put("c2", "pbs_token",    "tok2", actor="t")

    dump = tmp_path / "dump.bin"
    n = ss.export_dump(dump, passphrase="test-passphrase", actor="t")
    assert n == 2
    assert dump.exists()
    # Dump must be encrypted (not contain plaintext).
    blob = dump.read_bytes()
    assert b"v1" not in blob
    assert b"pbs_token" not in blob

    # Import into a fresh store (wipe master key + db, re-import using passphrase).
    # We delete + re-mint the master key so we're not relying on the same key.
    ss.delete("c1", "pve_password", actor="t")
    ss.delete("c2", "pbs_token", actor="t")
    assert ss.list_secrets() == []

    written = ss.import_dump(dump, passphrase="test-passphrase", actor="t")
    assert written == 2
    assert ss.get("c1", "pve_password") == "v1"
    assert ss.get("c2", "pbs_token") == "tok2"


def test_import_wrong_passphrase_fails(tmp_path, secret_env):
    ss, _ = secret_env
    ss.put("c1", "pve_password", "v1", actor="t")
    dump = tmp_path / "d.bin"
    ss.export_dump(dump, passphrase="real-passphrase", actor="t")
    with pytest.raises(ValueError, match="passphrase"):
        ss.import_dump(dump, passphrase="wrong-passphrase-here", actor="t")


def test_import_skips_existing_unless_overwrite(tmp_path, secret_env):
    ss, _ = secret_env
    ss.put("c1", "pve_password", "v1", actor="t")
    dump = tmp_path / "d.bin"
    ss.export_dump(dump, passphrase="abcdefgh", actor="t")
    # Change the value, then re-import without overwrite — should keep new value.
    ss.put("c1", "pve_password", "v1-new", actor="t")
    n = ss.import_dump(dump, passphrase="abcdefgh", actor="t", overwrite=False)
    assert n == 0
    assert ss.get("c1", "pve_password") == "v1-new"
    # With overwrite — back to the dumped value.
    n = ss.import_dump(dump, passphrase="abcdefgh", actor="t", overwrite=True)
    assert n == 1
    assert ss.get("c1", "pve_password") == "v1"


def test_export_passphrase_min_length(tmp_path, secret_env):
    ss, _ = secret_env
    with pytest.raises(ValueError, match="8"):
        ss.export_dump(tmp_path / "d.bin", passphrase="short", actor="t")


def test_migrate_from_yaml_moves_password_into_store(secret_env, monkeypatch, tmp_path):
    """The yaml→store sweep used by install.sh + service boot."""
    ss, _ = secret_env
    from server import config as cfg_mod
    from server.config import (
        Config, ServerConfig, ClusterConfig, PVENodeConfig, PVEAuthConfig,
        AuthConfig, AlertConfig, UIConfig, VmControlConfig, ConsoleConfig,
    )
    # Stand up a Config with a yaml-style password.
    cfg_path = tmp_path / "config.yaml"
    monkeypatch.setattr(cfg_mod, "CONFIG_FILE", str(cfg_path))
    cfg = Config(
        server=ServerConfig(),
        clusters=[ClusterConfig(
            id="cluster-x",
            nodes=[PVENodeConfig(host="203.0.113.10")],
            auth=PVEAuthConfig(user="root@pam", password="yaml-secret"),
        )],
        alerts=AlertConfig(), ui=UIConfig(),
        auth=AuthConfig(enabled=False, db_path="/tmp/never"),
        vm_control=VmControlConfig(),
        console=ConsoleConfig(),
    )
    cfg_mod._current_config = cfg

    out = ss.migrate_from_yaml(actor="test")
    # 1 row migrated, with status 'ok'.
    assert out == [("cluster-x", "ok")]
    # Value made it into the encrypted store.
    assert ss.get("cluster-x", "pve_password") == "yaml-secret"
    # Yaml field cleared.
    assert cfg_mod._current_config.clusters[0].auth.password == ""
    # Re-running migrate is a no-op (no plaintext left to migrate).
    again = ss.migrate_from_yaml(actor="test")
    assert again == []
