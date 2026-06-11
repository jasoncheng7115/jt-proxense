"""Regression tests for the v0.7.3 security-hardening fixes."""
from __future__ import annotations

import pytest
from cryptography.fernet import InvalidToken, Fernet

from server import middleware, notifications, secret_store


# ── #1 X-Forwarded-For trusted-proxy gating ──────────────────────────────
@pytest.mark.parametrize("ip,trusted", [
    ("127.0.0.1", True), ("::1", True),
    ("10.0.0.5", True), ("192.168.1.9", True), ("172.16.4.4", True),
    ("169.254.1.1", True),                 # link-local also counts as local peer
    ("8.8.8.8", False), ("1.2.3.4", False),
    ("unknown", False), ("", False),
])
def test_is_trusted_proxy(ip, trusted):
    assert middleware._is_trusted_proxy(ip) is trusted


# ── #5 webhook SSRF validation ───────────────────────────────────────────
def test_webhook_url_rejects_loopback_and_linklocal():
    for bad in ("http://127.0.0.1/x", "http://[::1]/x",
                "http://169.254.169.254/latest/meta-data/", "ftp://host/x",
                "http:///nopath"):
        with pytest.raises(ValueError):
            notifications._validate_webhook_url(bad)


def test_webhook_url_allows_private_lan_and_public():
    # internal webhooks are a legit use of this product
    notifications._validate_webhook_url("http://192.168.1.50/hook")
    notifications._validate_webhook_url("https://hooks.example.com/x")


# ── #4 channel secret redaction ──────────────────────────────────────────
def test_redact_channel_masks_secrets():
    email = notifications.redact_channel(
        {"type": "email", "config": {"smtp_host": "h", "smtp_password": "hunter2"}})
    assert email["config"]["smtp_password"] == "***"
    assert email["config"]["smtp_host"] == "h"
    wh = notifications.redact_channel(
        {"type": "webhook", "config": {"url": "https://x/y",
         "headers": {"Authorization": "Bearer t", "X-Trace": "ok"}}})
    assert wh["config"]["headers"]["Authorization"] == "***"
    assert wh["config"]["headers"]["X-Trace"] == "ok"


# ── #7 passphrase envelope: new round-trip + legacy back-compat ───────────
def test_passphrase_envelope_roundtrip():
    blob = secret_store._encrypt_with_passphrase("correct horse", b"payload-123")
    assert blob.startswith(secret_store._KDF_MAGIC)
    assert secret_store._decrypt_with_passphrase("correct horse", blob) == b"payload-123"
    with pytest.raises(InvalidToken):
        secret_store._decrypt_with_passphrase("wrong pass", blob)


def test_passphrase_envelope_reads_legacy_fixed_salt():
    # bundles made before v0.7.3 are a raw Fernet token (no magic) — must still read
    legacy = Fernet(secret_store._passphrase_to_key("oldpass")).encrypt(b"old-data")
    assert not legacy.startswith(secret_store._KDF_MAGIC)
    assert secret_store._decrypt_with_passphrase("oldpass", legacy) == b"old-data"
