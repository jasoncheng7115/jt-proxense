"""Auth module: password hashing, login flow, sessions, rate limit, RBAC."""
import asyncio
import pytest

from server import auth


# ---------------------------------------------------------------- hashing

def test_hash_round_trip(db_path):
    h = auth.hash_password("hello-world-1234")
    assert h.startswith("$argon2id$")
    assert auth.verify_password("hello-world-1234", h) is True
    assert auth.verify_password("wrong", h) is False


def test_hash_unique_per_call(db_path):
    """Argon2 generates a fresh salt every call — same password, different hash."""
    a = auth.hash_password("abc12345")
    b = auth.hash_password("abc12345")
    assert a != b
    assert auth.verify_password("abc12345", a)
    assert auth.verify_password("abc12345", b)


# ---------------------------------------------------------------- user CRUD

def test_create_and_get_user(db_path):
    uid = auth.create_user("alice", "passw0rd-strong")
    assert isinstance(uid, int) and uid > 0
    u = auth.get_user_by_username("alice")
    assert u is not None
    assert u["username"] == "alice"
    assert u["enabled"] == 1


def test_create_user_duplicate_raises(db_path):
    auth.create_user("alice", "p1234567")
    with pytest.raises(ValueError, match="already exists"):
        auth.create_user("alice", "p7654321")


def test_username_lookup_case_insensitive(db_path):
    auth.create_user("Alice", "p1234567")
    assert auth.get_user_by_username("alice") is not None
    assert auth.get_user_by_username("ALICE") is not None


def test_set_password(db_path):
    auth.create_user("alice", "p1234567")
    assert auth.set_password("alice", "newpass99887766") is True
    assert auth.get_user_by_username("alice") is not None
    h = auth.get_user_by_username("alice")["password_hash"]
    assert auth.verify_password("newpass99887766", h)
    assert not auth.verify_password("p1234567", h)


def test_set_password_unknown_user(db_path):
    assert auth.set_password("nobody", "x12345678") is False


def test_delete_user(db_path):
    auth.create_user("alice", "p1234567")
    assert auth.delete_user("alice") is True
    assert auth.get_user_by_username("alice") is None
    assert auth.delete_user("alice") is False  # idempotent / not-found


def test_list_users_returns_sorted(db_path):
    auth.create_user("zed", "p1234567")
    auth.create_user("alice", "p1234567")
    auth.create_user("mike", "p1234567")
    names = [u["username"] for u in auth.list_users()]
    assert names == sorted(names)


# ---------------------------------------------------------------- roles

def test_grant_and_resolve_role(db_path):
    uid = auth.create_user("bob", "p1234567")
    auth.grant_role("bob", "*", "operator")
    assert auth.role_for(uid, "anything") == "operator"


def test_grant_role_overrides_global(db_path):
    uid = auth.create_user("bob", "p1234567")
    auth.grant_role("bob", "*", "viewer")
    auth.grant_role("bob", "cluster1", "admin")
    assert auth.role_for(uid, "cluster1") == "admin"
    assert auth.role_for(uid, "cluster_other") == "viewer"


def test_grant_role_invalid(db_path):
    auth.create_user("bob", "p1234567")
    with pytest.raises(ValueError, match="invalid role"):
        auth.grant_role("bob", "*", "godmode")


def test_grant_role_unknown_user(db_path):
    with pytest.raises(ValueError, match="no such user"):
        auth.grant_role("nobody", "*", "viewer")


def test_grant_role_replaces_existing(db_path):
    uid = auth.create_user("bob", "p1234567")
    auth.grant_role("bob", "*", "viewer")
    auth.grant_role("bob", "*", "admin")
    assert auth.role_for(uid, "x") == "admin"


# ---------------------------------------------------------------- login flow

@pytest.mark.asyncio
async def test_login_happy_path(db_path):
    auth.create_user("alice", "great-password-99")
    s = await auth.login("alice", "great-password-99", source_ip="10.0.0.1")
    assert s is not None
    assert s.user_id > 0
    assert s.expires_at > s.last_seen_at


@pytest.mark.asyncio
async def test_login_bad_password_returns_none(db_path):
    auth.create_user("alice", "great-password-99")
    s = await auth.login("alice", "WRONG-pw", source_ip="10.0.0.1")
    assert s is None


@pytest.mark.asyncio
async def test_login_disabled_user(db_path):
    uid = auth.create_user("alice", "great-password-99")
    from server import db as db_mod
    with db_mod.connect_sync() as c:
        c.execute("UPDATE users SET enabled=0 WHERE id=?", (uid,))
    s = await auth.login("alice", "great-password-99", source_ip="10.0.0.1")
    assert s is None


@pytest.mark.asyncio
async def test_login_nonexistent_user(db_path):
    s = await auth.login("nobody", "p1234567", source_ip="10.0.0.1")
    assert s is None


@pytest.mark.asyncio
async def test_rate_limit_after_max_failures(db_path):
    auth.create_user("alice", "great-password-99")
    # 5 failed attempts allowed; 6th raises
    for _ in range(auth.LOGIN_RATE_MAX):
        r = await auth.login("alice", "WRONG", source_ip="10.0.0.99")
        assert r is None
    with pytest.raises(PermissionError):
        await auth.login("alice", "great-password-99", source_ip="10.0.0.99")


@pytest.mark.asyncio
async def test_successful_login_clears_failed_logins(db_path):
    """Per design: on successful login, the IP's failed_logins are cleared."""
    auth.create_user("alice", "great-password-99")
    for _ in range(3):
        await auth.login("alice", "WRONG", source_ip="10.0.0.42")
    assert auth.is_rate_limited("10.0.0.42") is False  # 3 < 5
    s = await auth.login("alice", "great-password-99", source_ip="10.0.0.42")
    assert s is not None
    assert auth.is_rate_limited("10.0.0.42") is False
    # Try again with bad pw — counter has been reset, so we get 5 fresh tries
    for _ in range(auth.LOGIN_RATE_MAX):
        await auth.login("alice", "WRONG", source_ip="10.0.0.42")
    with pytest.raises(PermissionError):
        await auth.login("alice", "WRONG", source_ip="10.0.0.42")


# ---------------------------------------------------------------- sessions

@pytest.mark.asyncio
async def test_get_session_active(db_path):
    auth.create_user("alice", "p123456789")
    s = await auth.login("alice", "p123456789", source_ip="1.2.3.4")
    s2 = await auth.get_session(s.id)
    assert s2 is not None
    assert s2.user_id == s.user_id


@pytest.mark.asyncio
async def test_get_session_unknown(db_path):
    assert await auth.get_session("nope-fake-sid") is None


@pytest.mark.asyncio
async def test_get_session_empty_returns_none(db_path):
    assert await auth.get_session("") is None
    assert await auth.get_session(None) is None


@pytest.mark.asyncio
async def test_logout_invalidates(db_path):
    auth.create_user("alice", "p123456789")
    s = await auth.login("alice", "p123456789", source_ip="1.2.3.4")
    await auth.logout(s.id)
    assert await auth.get_session(s.id) is None


@pytest.mark.asyncio
async def test_session_sliding_window_extends(db_path):
    """get_session bumps expires_at; the new value should be >= old expires_at."""
    auth.create_user("alice", "p123456789")
    s1 = await auth.login("alice", "p123456789", source_ip="1.2.3.4")
    await asyncio.sleep(0.05)  # ensure clock advanced
    s2 = await auth.get_session(s1.id)
    assert s2.expires_at >= s1.expires_at
