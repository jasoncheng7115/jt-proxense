"""LDAP / Active Directory authentication backend.

Set `auth.backend: ldap` in `config.yaml` to delegate password checks to an
external LDAP / AD server. On successful bind, the operator's group
memberships drive role auto-grant via `auth.ldap.group_role_map`.

Config schema (config.yaml):

    auth:
      backend: ldap
      ldap:
        # Required
        server:        "ldap://dc01.corp.example:389"     # or ldaps://...
        # User search — pick ONE strategy:
        # (A) Direct DN template (works for AD if your usernames map cleanly):
        user_dn_template: "{user}@corp.example"
        # (B) Bind+search (more flexible, recommended for non-AD):
        bind_dn:        "CN=svc-jt-proxense,OU=Services,DC=corp,DC=example"
        bind_password:  "..."  # store via secret_store, not plaintext
        user_base:      "OU=Users,DC=corp,DC=example"
        user_filter:    "(&(objectClass=user)(sAMAccountName={user}))"
        # Group lookup
        group_attribute: "memberOf"   # AD default; some directories use 'member' inverted
        # Group → role mapping. First match wins (admin > operator > viewer).
        group_role_map:
          "CN=jt-proxense-admins,OU=Groups,DC=corp,DC=example":   admin
          "CN=jt-proxense-ops,OU=Groups,DC=corp,DC=example":      operator
          "CN=jt-proxense-viewers,OU=Groups,DC=corp,DC=example":  viewer
        # TLS
        validate_cert:   true        # set false for self-signed test setups
        start_tls:       false       # use ldaps:// or START_TLS

The CLI back door (`bin/jt-proxense ...`) always uses local-backend flows so
operators can recover even if AD is unreachable.
"""
from __future__ import annotations

import logging
from typing import Optional

from . import db


logger = logging.getLogger(__name__)


SENTINEL_LDAP_HASH = "*LDAP*"


def _cfg() -> Optional[dict]:
    """Return the parsed `auth.ldap` block as a plain dict, or None."""
    try:
        from .config import get_config
        ac = get_config().auth
        ldap = getattr(ac, "ldap", None)
        if not ldap:
            return None
        # ldap may be a dataclass or dict — normalise.
        if isinstance(ldap, dict):
            return ldap
        return {k: getattr(ldap, k) for k in dir(ldap) if not k.startswith("_") and not callable(getattr(ldap, k))}
    except Exception as e:
        logger.warning("ldap config unreadable: %s", e)
        return None


def verify(username: str, password: str) -> tuple[bool, list[str]]:
    """Authenticate `(username, password)` against the configured LDAP server.

    Returns `(ok, group_dns)`. `group_dns` is the operator's group memberships
    used by the caller for role auto-grant. Empty list on failure or when the
    directory doesn't expose `memberOf`-style attributes.
    """
    if not username or not password:
        return False, []
    cfg = _cfg() or {}
    if not cfg:
        logger.warning("ldap backend selected but auth.ldap is not configured")
        return False, []

    try:
        import ldap3
    except ImportError:
        logger.error("ldap3 not installed; pip install ldap3>=2.9.0")
        return False, []

    server_uri = (cfg.get("server") or "").strip()
    if not server_uri:
        logger.warning("auth.ldap.server is required")
        return False, []
    validate_cert = bool(cfg.get("validate_cert", True))
    use_ssl = server_uri.lower().startswith("ldaps://")

    tls = ldap3.Tls(validate=ldap3.core.tls.ssl.CERT_REQUIRED if validate_cert
                    else ldap3.core.tls.ssl.CERT_NONE) if use_ssl else None
    server = ldap3.Server(server_uri, use_ssl=use_ssl, tls=tls, get_info=ldap3.NONE)

    user_dn: Optional[str] = None
    user_dn_template = (cfg.get("user_dn_template") or "").strip()
    if user_dn_template:
        try:
            user_dn = user_dn_template.format(user=username)
        except KeyError:
            logger.warning("user_dn_template missing {user}: %r", user_dn_template)
            return False, []
    else:
        # Bind+search strategy
        bind_dn  = (cfg.get("bind_dn") or "").strip()
        bind_pw  = (cfg.get("bind_password") or "")
        base     = (cfg.get("user_base") or "").strip()
        ufilter  = (cfg.get("user_filter") or "(uid={user})").strip()
        if not bind_dn or not base:
            logger.warning("auth.ldap requires either user_dn_template, or "
                           "bind_dn + user_base + user_filter")
            return False, []
        try:
            with ldap3.Connection(server, user=bind_dn, password=bind_pw,
                                   auto_bind=True) as svc:
                if cfg.get("start_tls"):
                    svc.start_tls()
                try:
                    safe_user = username.replace("\\", "\\\\").replace("*", "\\*").replace("(", "\\(").replace(")", "\\)").replace("\0", "\\0")
                except Exception:
                    safe_user = username
                svc.search(
                    base,
                    ufilter.replace("{user}", safe_user),
                    attributes=["distinguishedName"],
                )
                if not svc.entries:
                    logger.info("ldap search no hits for %s", username)
                    return False, []
                user_dn = svc.entries[0].entry_dn
        except Exception as e:
            logger.warning("ldap service-bind / search failed: %s", e)
            return False, []

    # Phase 2: rebind as the user with their password — that's the actual
    # authentication step. Then read memberOf for role mapping.
    group_attr = (cfg.get("group_attribute") or "memberOf")
    try:
        conn = ldap3.Connection(server, user=user_dn, password=password,
                                auto_bind=True)
        if cfg.get("start_tls"):
            conn.start_tls()
        # Pull memberOf (or whatever group_attribute is) on the user.
        conn.search(
            user_dn, "(objectClass=*)",
            search_scope=ldap3.BASE,
            attributes=[group_attr],
        )
        groups: list[str] = []
        if conn.entries:
            attr = conn.entries[0][group_attr] if group_attr in conn.entries[0] else None
            if attr:
                groups = [str(g) for g in attr.values]
        conn.unbind()
        return True, groups
    except ldap3.core.exceptions.LDAPBindError:
        return False, []
    except Exception as e:
        logger.warning("ldap user-bind failed for %s: %s", username, e)
        return False, []


def ensure_local_row(username: str) -> int:
    """Idempotently create a `users` row for an LDAP-authenticated user.
    Same pattern as auth_pam.ensure_local_row — sentinel password_hash so
    the local backend can never accept a password against this row."""
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT id FROM users WHERE username=? COLLATE NOCASE", (username,)
        ).fetchone()
        if row:
            return row["id"]
        cur = c.execute(
            "INSERT INTO users (username, password_hash, created_at) VALUES (?,?,?)",
            (username, SENTINEL_LDAP_HASH, db.now_ms()),
        )
        return cur.lastrowid


def apply_group_roles(username: str, group_dns: list[str]) -> None:
    """Map LDAP group memberships → roles per `auth.ldap.group_role_map`.

    The map is a dict `{group_dn: role}`. A user's effective set is computed
    as the union of all matching groups; we grant a global role for each
    matched role tier (admin > operator > viewer wins). Existing local roles
    are left intact — operator can override per-cluster manually via the user
    admin UI.

    Idempotent: re-runs on every login. If the operator's AD groups change,
    next login picks up the new role; nothing rewrites the local DB on the
    fly outside of login.
    """
    if not group_dns:
        return
    cfg = _cfg() or {}
    grm = cfg.get("group_role_map") or {}
    if not grm:
        return
    # Rank for "highest role wins"
    rank = {"viewer": 1, "operator": 2, "admin": 3}
    best: Optional[str] = None
    norm = lambda s: (s or "").strip().lower()
    user_groups_lc = {norm(g) for g in group_dns}
    for group_dn, role in grm.items():
        if norm(group_dn) in user_groups_lc and role in rank:
            if best is None or rank[role] > rank[best]:
                best = role
    if not best:
        return
    try:
        from . import auth as _auth
        # Global grant ('*' cluster, '*' VM pattern) — operator can override
        # per-cluster after the fact.
        _auth.grant_role(username, "*", best, vm_pattern="*")
        logger.info("ldap → granted %s to %s based on group membership", best, username)
    except Exception as e:
        logger.warning("ldap auto-grant failed for %s: %s", username, e)


def is_ldap_managed(user_row: dict) -> bool:
    return user_row.get("password_hash") == SENTINEL_LDAP_HASH
