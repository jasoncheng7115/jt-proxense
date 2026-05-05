"""TOTP module tests."""
import time

import pyotp
import pytest

from server import auth, db, totp


def _user(name="alice"):
    auth.create_user(name, "pw123456789")


def test_migration_002_applied(db_path):
    """The TOTP columns + table must exist after migrations."""
    assert db.schema_version() >= 2
    with db.connect_sync() as c:
        cols = {r[1] for r in c.execute("PRAGMA table_info(users)")}
    for col in ("totp_secret", "totp_enabled", "totp_enrolled_at"):
        assert col in cols
    with db.connect_sync() as c:
        names = {r[0] for r in c.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )}
    assert "totp_backup_codes" in names


def test_generate_secret_format(db_path):
    s = totp.generate_secret()
    assert len(s) == 32
    # base32 alphabet = A-Z2-7
    import re
    assert re.fullmatch(r"[A-Z2-7]+", s)


def test_stage_secret_disables_existing_enrollment(db_path):
    _user()
    s1 = totp.generate_secret()
    totp.stage_secret("alice", s1)
    # enrollment is staged but NOT enabled until verified
    user = auth.get_user_by_username("alice")
    uid = user["id"]
    assert totp.is_enabled(uid) is False


def test_stage_secret_unknown_user(db_path):
    with pytest.raises(ValueError, match="no such user"):
        totp.stage_secret("nobody", totp.generate_secret())


def test_confirm_enrollment_happy(db_path):
    _user()
    secret = totp.generate_secret()
    totp.stage_secret("alice", secret)

    code = pyotp.TOTP(secret).now()
    ok, codes = totp.confirm_enrollment("alice", code)
    assert ok is True
    assert len(codes) == totp.BACKUP_CODE_COUNT
    assert all(len(c) == 20 for c in codes)
    assert len(set(codes)) == totp.BACKUP_CODE_COUNT  # no duplicates

    user = auth.get_user_by_username("alice")
    assert totp.is_enabled(user["id"]) is True
    assert totp.remaining_backup_codes(user["id"]) == totp.BACKUP_CODE_COUNT


def test_confirm_enrollment_bad_code(db_path):
    _user()
    secret = totp.generate_secret()
    totp.stage_secret("alice", secret)
    ok, codes = totp.confirm_enrollment("alice", "000000")
    assert ok is False
    assert codes == []
    user = auth.get_user_by_username("alice")
    assert totp.is_enabled(user["id"]) is False


def test_confirm_enrollment_unknown_user(db_path):
    ok, codes = totp.confirm_enrollment("nobody", "123456")
    assert ok is False and codes == []


def test_verify_code_totp_works(db_path):
    _user()
    secret = totp.generate_secret()
    totp.stage_secret("alice", secret)
    totp.confirm_enrollment("alice", pyotp.TOTP(secret).now())
    uid = auth.get_user_by_username("alice")["id"]

    # Current TOTP code valid
    assert totp.verify_code(uid, pyotp.TOTP(secret).now()) is True
    # Random 6 digits invalid
    assert totp.verify_code(uid, "000000") is False
    # Empty code rejected
    assert totp.verify_code(uid, "") is False
    assert totp.verify_code(uid, None) is False


def test_verify_code_backup_codes_one_use(db_path):
    _user()
    secret = totp.generate_secret()
    totp.stage_secret("alice", secret)
    ok, backup_codes = totp.confirm_enrollment("alice", pyotp.TOTP(secret).now())
    assert ok
    uid = auth.get_user_by_username("alice")["id"]

    # One backup code accepted
    code = backup_codes[0]
    assert totp.verify_code(uid, code) is True
    assert totp.remaining_backup_codes(uid) == totp.BACKUP_CODE_COUNT - 1
    # Same code is consumed — can't reuse
    assert totp.verify_code(uid, code) is False


def test_verify_code_user_without_totp_enabled(db_path):
    """If totp_enabled=0 (e.g. fresh user) verify_code always returns False."""
    _user()
    uid = auth.get_user_by_username("alice")["id"]
    assert totp.verify_code(uid, "123456") is False


def test_disable_clears_secret_and_codes(db_path):
    _user()
    secret = totp.generate_secret()
    totp.stage_secret("alice", secret)
    totp.confirm_enrollment("alice", pyotp.TOTP(secret).now())
    uid = auth.get_user_by_username("alice")["id"]
    assert totp.is_enabled(uid) is True

    assert totp.disable("alice") is True
    assert totp.is_enabled(uid) is False
    assert totp.remaining_backup_codes(uid) == 0


def test_disable_unknown_user(db_path):
    assert totp.disable("nobody") is False


def test_otpauth_url_format(db_path):
    secret = "JBSWY3DPEHPK3PXP"  # known base32
    url = totp.otpauth_url("alice", secret)
    assert url.startswith("otpauth://totp/")
    assert "JT-PROXENSE" in url
    assert secret in url


def test_qr_data_uri(db_path):
    url = totp.otpauth_url("alice", totp.generate_secret())
    uri = totp.qr_png_data_uri(url)
    assert uri.startswith("data:image/png;base64,")
    # Should be a non-trivial size
    assert len(uri) > 200


# ---------------------------------------------------------------- pending tokens

def test_pending_token_round_trip(db_path):
    tok = totp.issue_pending_token(42)
    assert isinstance(tok, str) and len(tok) > 20
    assert totp.consume_pending_token(tok) == 42
    # consumed -> can't reuse
    assert totp.consume_pending_token(tok) is None


def test_pending_token_unknown(db_path):
    assert totp.consume_pending_token("never-issued") is None


def test_pending_token_expires(db_path, monkeypatch):
    """Patch now_ms to fast-forward past TTL."""
    tok = totp.issue_pending_token(42)
    # Fast-forward 200 seconds (TTL is 120)
    real_now = db.now_ms()
    monkeypatch.setattr(totp.db, "now_ms", lambda: real_now + 200_000)
    assert totp.consume_pending_token(tok) is None
