"""VM-pattern RBAC (Jason A2 decision, migration 003)."""
import pytest

from server import auth, db


def _user(name="alice"):
    return auth.create_user(name, "pw123456789")


def test_migration_003_applied(db_path):
    assert db.schema_version() >= 3
    with db.connect_sync() as c:
        cols = {r[1] for r in c.execute("PRAGMA table_info(roles)")}
    assert "vm_pattern" in cols


def test_legacy_grants_default_vm_pattern_star(db_path):
    """grant_role without explicit vm_pattern should record '*' (any VM)."""
    uid = _user()
    auth.grant_role("alice", "*", "viewer")
    rows = auth.get_roles(uid)
    assert rows == [{"cluster_id": "*", "vm_pattern": "*", "role": "viewer"}]


def test_grant_with_pattern_creates_separate_row(db_path):
    uid = _user()
    auth.grant_role("alice", "cluster1", "viewer")
    auth.grant_role("alice", "cluster1", "operator", vm_pattern="web-*")
    rows = auth.get_roles(uid)
    assert len(rows) == 2
    patterns = {r["vm_pattern"]: r["role"] for r in rows}
    assert patterns == {"*": "viewer", "web-*": "operator"}


def test_role_for_no_vm_returns_global_default(db_path):
    """When no vm_name supplied, only '*' patterns count (cluster-level lookup)."""
    uid = _user()
    auth.grant_role("alice", "*", "viewer")
    auth.grant_role("alice", "cluster1", "operator", vm_pattern="web-*")
    # No vm context — should fall back to '*' grant only
    assert auth.role_for(uid, "cluster1") == "viewer"


def test_role_for_vm_name_specific_pattern_wins(db_path):
    """Highest-rank role across matching patterns wins."""
    uid = _user()
    auth.grant_role("alice", "cluster1", "viewer")  # cluster default
    auth.grant_role("alice", "cluster1", "operator", vm_pattern="web-*")
    # web-01 matches 'web-*' (operator) AND '*' (viewer). highest = operator.
    assert auth.role_for(uid, "cluster1", vm_name="web-01") == "operator"
    # api-01 matches only '*'.
    assert auth.role_for(uid, "cluster1", vm_name="api-01") == "viewer"


def test_role_for_tag_pattern(db_path):
    uid = _user()
    auth.grant_role("alice", "cluster1", "viewer")
    auth.grant_role("alice", "cluster1", "admin", vm_pattern="tag:prod")
    # VM with tag 'prod' gets admin
    assert auth.role_for(uid, "cluster1", vm_name="x",
                         vm_tags=["prod"]) == "admin"
    # VM without 'prod' tag falls back to viewer
    assert auth.role_for(uid, "cluster1", vm_name="x",
                         vm_tags=["dev"]) == "viewer"


def test_role_for_global_cluster_with_pattern(db_path):
    """A global ('*' cluster) grant with a VM pattern still applies to any cluster."""
    uid = _user()
    auth.grant_role("alice", "*", "operator", vm_pattern="db-*")
    assert auth.role_for(uid, "anywhere", vm_name="db-1") == "operator"
    assert auth.role_for(uid, "anywhere", vm_name="web-1") is None


def test_role_for_no_grants_returns_none(db_path):
    uid = _user()
    assert auth.role_for(uid, "cluster1") is None
    assert auth.role_for(uid, "cluster1", vm_name="vm-1") is None


def test_revoke_role(db_path):
    uid = _user()
    auth.grant_role("alice", "cluster1", "viewer")
    auth.grant_role("alice", "cluster1", "admin", vm_pattern="tag:prod")
    assert auth.revoke_role("alice", "cluster1", vm_pattern="tag:prod") is True
    rows = auth.get_roles(uid)
    assert len(rows) == 1 and rows[0]["vm_pattern"] == "*"
    # Revoking again is a no-op (returns False)
    assert auth.revoke_role("alice", "cluster1", vm_pattern="tag:prod") is False


def test_revoke_unknown_user(db_path):
    assert auth.revoke_role("nobody", "*", vm_pattern="*") is False


def test_grant_replaces_role_on_same_triple(db_path):
    """ON CONFLICT — granting again with same (user, cluster, vm_pattern)
    should update the role, not duplicate."""
    uid = _user()
    auth.grant_role("alice", "cluster1", "viewer")
    auth.grant_role("alice", "cluster1", "admin")  # same triple, role upgraded
    rows = auth.get_roles(uid)
    assert len(rows) == 1
    assert rows[0]["role"] == "admin"


def test_get_roles_returns_list_per_user(db_path):
    """Schema for get_roles return changed in v0.2.x: list[dict] not dict."""
    uid = _user()
    auth.grant_role("alice", "*", "viewer")
    auth.grant_role("alice", "c1", "operator", vm_pattern="web-*")
    auth.grant_role("alice", "c1", "admin", vm_pattern="tag:prod")
    rows = auth.get_roles(uid)
    assert isinstance(rows, list)
    assert len(rows) == 3
    assert {"cluster_id", "vm_pattern", "role"} <= set(rows[0].keys())


def test_role_for_cluster_specific_grant_overrides_global(db_path):
    """Cluster-specific grant + VM pattern should outrank global default."""
    uid = _user()
    auth.grant_role("alice", "*", "viewer")            # global viewer
    auth.grant_role("alice", "cluster1", "admin")      # cluster1 admin
    # On cluster1, both rows match; highest wins = admin.
    assert auth.role_for(uid, "cluster1") == "admin"
    # On other clusters, only the global row matches.
    assert auth.role_for(uid, "cluster2") == "viewer"
