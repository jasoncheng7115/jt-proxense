"""PAM auth backend tests (Jason A1).

We can't authenticate against real system users in CI, so all tests mock the
`pam.pam()` class with a fake that records authenticate() calls.
"""
import pytest

from server import auth, auth_pam


# ---------------------------------------------------------------- mock

class _FakePam:
    """Stand-in for pam.pam(). Set valid_creds at class level to control
    which (user, password) pairs authenticate."""
    valid_creds: dict[tuple[str, str], bool] = {}
    raise_on_authenticate: bool = False

    def __init__(self):
        self.code = 0
        self.reason = ""

    def authenticate(self, user, password, service="login"):
        if _FakePam.raise_on_authenticate:
            raise RuntimeError("simulated PAM crash")
        ok = _FakePam.valid_creds.get((user, password), False)
        if not ok:
            self.code = 7
            self.reason = "auth failed (mock)"
        return ok


@pytest.fixture
def fake_pam(monkeypatch):
    """Replace `pam.pam` with our fake. Reset state between tests."""
    import pam
    _FakePam.valid_creds = {}
    _FakePam.raise_on_authenticate = False
    monkeypatch.setattr(pam, "pam", _FakePam)
    return _FakePam


@pytest.fixture
def use_pam_backend(monkeypatch, db_path):
    """Make config.auth.backend = 'pam' for the duration of the test, then
    clear it so the next test gets a clean default."""
    from server.config import (
        Config, AuthConfig, ServerConfig, AlertConfig, UIConfig, VmControlConfig,
    )
    from server import config as cfg_mod
    saved = cfg_mod._current_config
    cfg = Config(
        server=ServerConfig(),
        clusters=[],
        alerts=AlertConfig(),
        ui=UIConfig(),
        auth=AuthConfig(enabled=True, backend="pam", db_path=str(db_path)),
        vm_control=VmControlConfig(),
    )
    cfg_mod._current_config = cfg
    yield
    cfg_mod._current_config = saved


# ---------------------------------------------------------------- low-level

def test_verify_happy(db_path, fake_pam):
    fake_pam.valid_creds[("alice", "good-pw")] = True
    assert auth_pam.verify("alice", "good-pw") is True


def test_verify_bad_credentials(db_path, fake_pam):
    fake_pam.valid_creds[("alice", "good-pw")] = True
    assert auth_pam.verify("alice", "WRONG") is False


def test_verify_empty_inputs(db_path, fake_pam):
    assert auth_pam.verify("", "x") is False
    assert auth_pam.verify("alice", "") is False
    assert auth_pam.verify(None, None) is False


def test_verify_pam_exception_returns_false(db_path, fake_pam):
    """A misconfigured PAM stack must NOT crash the request — squash to False."""
    fake_pam.raise_on_authenticate = True
    assert auth_pam.verify("alice", "x") is False


def test_ensure_local_row_creates_with_sentinel(db_path, fake_pam):
    uid = auth_pam.ensure_local_row("alice")
    assert isinstance(uid, int) and uid > 0
    user = auth.get_user_by_username("alice")
    assert user is not None
    assert user["password_hash"] == auth_pam.SENTINEL_PAM_HASH
    assert auth_pam.is_pam_managed(user) is True


def test_ensure_local_row_idempotent(db_path, fake_pam):
    uid1 = auth_pam.ensure_local_row("alice")
    uid2 = auth_pam.ensure_local_row("alice")
    assert uid1 == uid2


def test_ensure_local_row_case_insensitive(db_path, fake_pam):
    uid1 = auth_pam.ensure_local_row("Alice")
    uid2 = auth_pam.ensure_local_row("ALICE")
    assert uid1 == uid2


# ---------------------------------------------------------------- end-to-end via auth.login

@pytest.mark.asyncio
async def test_login_pam_happy_creates_session(db_path, fake_pam, use_pam_backend):
    fake_pam.valid_creds[("system_user", "real-system-pw")] = True
    s = await auth.login("system_user", "real-system-pw", source_ip="10.0.0.1")
    assert s is not None
    # Local row should now exist with the sentinel hash
    user = auth.get_user_by_username("system_user")
    assert user is not None
    assert auth_pam.is_pam_managed(user) is True


@pytest.mark.asyncio
async def test_login_pam_bad_password(db_path, fake_pam, use_pam_backend):
    fake_pam.valid_creds[("system_user", "real-pw")] = True
    s = await auth.login("system_user", "WRONG", source_ip="10.0.0.1")
    assert s is None


@pytest.mark.asyncio
async def test_local_login_blocked_when_user_is_pam_managed(db_path, fake_pam):
    """A PAM-managed local row must NEVER pass local auth, even if backend
    is currently set to local. Defends against a misconfigured re-switch."""
    auth_pam.ensure_local_row("system_user")
    # backend is local (default fixture)
    s = await auth.login("system_user", "anything", source_ip="10.0.0.1")
    assert s is None


@pytest.mark.asyncio
async def test_local_user_not_findable_in_pam_backend(db_path, fake_pam, use_pam_backend):
    """A locally-created user (with real argon2 hash) must NOT be authenticatable
    via PAM unless they also exist as a system account."""
    auth.create_user("local_only", "local-pw")
    # PAM backend is on; PAM mock has NO valid creds for local_only
    s = await auth.login("local_only", "local-pw", source_ip="10.0.0.1")
    assert s is None


@pytest.mark.asyncio
async def test_login_pam_attaches_roles(db_path, fake_pam, use_pam_backend):
    """After PAM auth, role lookups via grant_role + role_for should work."""
    fake_pam.valid_creds[("alice", "pw")] = True
    s = await auth.login("alice", "pw", source_ip="10.0.0.1")
    assert s is not None
    # Now the row exists — grant a role on it
    auth.grant_role("alice", "*", "operator")
    assert auth.role_for(s.user_id, "anything") == "operator"


@pytest.mark.asyncio
async def test_pam_disabled_user_blocked(db_path, fake_pam, use_pam_backend):
    """If the local row has enabled=0, even a successful PAM auth returns no session."""
    fake_pam.valid_creds[("alice", "pw")] = True
    uid = auth_pam.ensure_local_row("alice")
    # Disable the user
    with __import__("sqlite3").connect(str(db_path)) as c:
        c.execute("UPDATE users SET enabled=0 WHERE id=?", (uid,))
        c.commit()
    s = await auth.login("alice", "pw", source_ip="10.0.0.1")
    assert s is None


@pytest.mark.asyncio
async def test_pam_rate_limit_still_applies(db_path, fake_pam, use_pam_backend):
    """The shared rate limiter is per-IP regardless of backend."""
    fake_pam.valid_creds[("alice", "right")] = True
    for _ in range(auth.LOGIN_RATE_MAX):
        await auth.login("alice", "wrong", source_ip="10.0.0.99")
    with pytest.raises(PermissionError):
        await auth.login("alice", "right", source_ip="10.0.0.99")
