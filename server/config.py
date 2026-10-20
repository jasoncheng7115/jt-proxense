"""
JT-PROXENSE Configuration Management
Supports multi-cluster PVE monitoring with failover
"""

import glob
import logging
import os
import shutil
import stat
import tempfile
from dataclasses import dataclass, field, asdict, fields as dataclass_fields
from datetime import datetime
from typing import Optional
import yaml

logger = logging.getLogger(__name__)

CONFIG_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "config.yaml")
CONFIG_BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "config_backups")
MAX_BACKUPS = 10

# config.yaml holds PVE API tokens (and, on legacy installs, PVE passwords), so
# it must never be group- or world-readable. Historically the mode was whatever
# the umask of whoever created it happened to be: install.sh writes it with a
# plain `cat >`, so a root umask of 022 produced 0644 -- verified in the wild.
SECRET_FILE_MODE = 0o600


def _ensure_secure_mode(path: str) -> None:
    """Force 0600 on a file that holds secrets. Best-effort and never fatal:
    on a read-only mount, or a file owned by another user, we would rather run
    and log than refuse to start -- but we say so loudly, because the operator
    is the only one who can fix it."""
    try:
        current = stat.S_IMODE(os.stat(path).st_mode)
        if current != SECRET_FILE_MODE:
            os.chmod(path, SECRET_FILE_MODE)
            logger.warning(
                "tightened %s from %o to %o (it holds PVE API tokens)",
                path, current, SECRET_FILE_MODE)
    except OSError as e:
        logger.error(
            "could not secure %s (%s) -- it may hold PVE API tokens readable "
            "by other users on this host; fix with: chmod 600 %s",
            path, e, path)


def _from_fields(cls, data: dict, *, where: str):
    """Build a dataclass from `data`, ignoring keys it does not declare.

    An unknown key is NOT a corrupt file -- it is a config written by another
    version, or hand-edited, or a typo. Passing it straight to the constructor
    raises TypeError, and load_config() is fail-closed, so a single stale line
    would stop the service from starting at all. That is a worse failure than
    the one fail-closed exists to prevent: the operator upgrades, the daemon
    will not come up, and the message is about a keyword argument.

    So: drop what we do not know, say so once per key, and carry on. Genuinely
    unparseable YAML and a wrong top-level shape still refuse to start.
    """
    known = {f.name for f in dataclass_fields(cls)}
    unknown = [k for k in data if k not in known]
    if unknown:
        logger.warning("%s: ignoring unrecognised setting(s): %s",
                       where, ", ".join(sorted(unknown)))
    return cls(**{k: v for k, v in data.items() if k in known})


@dataclass
class PVENodeConfig:
    """Single PVE node configuration"""
    host: str
    port: int = 8006
    verify_ssl: bool = False
    priority: int = 0  # Lower = higher priority for failover


@dataclass
class PVEAuthConfig:
    """PVE authentication configuration"""
    user: str = "root@pam"
    token_name: str = ""
    token_value: str = ""
    # Alternative: password auth (not recommended)
    password: str = ""


@dataclass
class ClusterConfig:
    """Single cluster configuration"""
    id: str
    name: str = ""  # Display name override (if empty, use PVE cluster name)
    # `pve` (default) or `esxi` (v0.4 read-only preview). Drives which
    # adapter cluster_manager instantiates. ESXi support is read-only and
    # uses the vSphere REST API — see server/clusters/esxi.py.
    type: str = "pve"
    nodes: list[PVENodeConfig] = field(default_factory=list)
    auth: PVEAuthConfig = field(default_factory=PVEAuthConfig)
    enabled: bool = True
    poll_interval: float = 2.0  # seconds
    static_refresh_interval: float = 60.0  # seconds for VM/storage list refresh
    # SSH access for file-level operations PVE doesn't expose via API
    # (currently: storage download). Key auth only — operator must deploy
    # the jt-proxense host's public key to each PVE node's authorized_keys.
    ssh_user: str = "root"
    ssh_port: int = 22


@dataclass
class ServerConfig:
    """HTTP/WebSocket server configuration"""
    host: str = "0.0.0.0"
    http_port: int = 8099
    # InfluxDB-line-protocol receiver. Telegraf agents on each PVE host
    # POST host metrics to /api/v2/write — see server/influx_receiver.py.
    influx_enabled: bool = False
    influx_port: int = 8086
    # Origins allowed to make credentialed cross-origin calls. Empty (the
    # default) means none: the SPA is served from this same process, so it
    # needs no grant. Only set this when the UI is hosted elsewhere, and name
    # the origins explicitly -- "*" is ignored, because a wildcard combined
    # with credentials lets any site the operator visits drive this API.
    cors_origins: list = field(default_factory=list)
    # Optional bearer token. Telegraf sends `Authorization: Token <t>`.
    # Empty = no auth (LAN-trust mode); the receiver should be bound to a
    # private interface in that case.
    influx_token: str = ""
    # Pin each PVE node's TLS certificate and SSH host key on first contact and
    # refuse a different one until an admin accepts it (server/trust_store.py).
    # Off = the pre-v1.2.0 behaviour of accepting whatever answers.
    tls_pinning: bool = True


@dataclass
class AlertConfig:
    """Alert system configuration"""
    enabled: bool = True
    cpu_warning: float = 80.0
    cpu_critical: float = 95.0
    memory_warning: float = 85.0
    memory_critical: float = 95.0
    disk_warning: float = 80.0
    disk_critical: float = 95.0
    diskio_warning: float = 50.0   # MB/s
    diskio_critical: float = 100.0  # MB/s
    iowait_warning: float = 5.0    # %
    iowait_critical: float = 10.0  # %


@dataclass
class UIConfig:
    """UI configuration"""
    default_view: str = "command-center"
    theme: str = "cyberpunk"
    language: str = "zh-TW"
    animations_enabled: bool = True
    particle_count: int = 100
    vm_matrix_default_filter: str = "all"  # all, running, stopped
    matrix_card_width: int = 85  # px, min width for VM/CT cards in matrix view
    matrix_sort_by: str = "vmid"  # vmid, name, load
    matrix_group_by: str = "node"  # none, node, type, tag
    matrix_group_sort_by: str = "node"  # cluster, node
    matrix_group_sort_order: str = "asc"  # asc, desc


@dataclass
class AuditForwardConfig:
    """v0.2.x: ship audit rows to an external collector (Graylog, ArcSight,
    rsyslog, etc.). Disabled by default — operator opts in.

    `format` selects the wire format:
      - 'gelf'   — Graylog Extended Log Format (JSON, one message per row)
      - 'syslog' — RFC 5424 (PRI / structured-data / message)
      - 'cef'    — ArcSight Common Event Format (pipe-delimited)
    `transport` is 'udp' (fire-and-forget) or 'tcp' (reconnecting + buffered).
    """
    enabled: bool = False
    format: str = "gelf"               # 'gelf' | 'syslog' | 'cef'
    transport: str = "udp"             # 'udp' | 'tcp'
    host: str = ""
    port: int = 12201                  # GELF default; syslog 514; CEF often 514
    # syslog only — facility in RFC 5424 numeric range 0-23
    syslog_facility: int = 16          # 16 = local0
    # CEF identification
    cef_vendor: str = "JasonTools"
    cef_product: str = "jt-proxense"
    cef_version: str = "0.2"


@dataclass
class AuthConfig:
    """v0.2+ authentication configuration. Disabled by default for v0.1
    backward compatibility — operator opts in by setting enabled: true."""
    enabled: bool = False
    backend: str = "local"           # 'local' | 'pam' | 'ldap'
    db_path: str = "/var/lib/jt-proxense/jt-proxense.db"
    # When set, used to sign session cookies. If empty, server generates a
    # random one at first start and writes it back here.
    session_secret: str = ""
    # Audit log forwarding (optional)
    forward: AuditForwardConfig = field(default_factory=AuditForwardConfig)
    # LDAP / Active Directory backend config. Only consulted when
    # backend == 'ldap'. Schema documented in server/auth_ldap.py.
    # Stored as a dict so users can extend without touching the dataclass.
    ldap: dict = field(default_factory=dict)
    # Reverse proxies allowed to set X-Forwarded-For (IPs or CIDRs). Loopback
    # and private ranges are trusted implicitly; add public proxy IPs here.
    # If the immediate peer is not trusted, XFF is ignored and the real socket
    # IP is used — so a direct public client can't spoof XFF to dodge the
    # per-IP login rate limit.
    trusted_proxies: list = field(default_factory=list)


@dataclass
class ConsoleConfig:
    """Console (noVNC) authentication mode.

    PVE's vncwebsocket endpoint refuses API tokens at the WS Upgrade step
    (a long-standing PVE limitation; see PVE forum). Three modes:

      - 'disabled' — console buttons are hidden / WS upgrade rejected.
      - 'stored'   — server uses each cluster's `auth.password` (config.yaml)
                     to mint a PVEAuthCookie on demand. Convenient but the
                     password sits on disk; chmod 600 the config.
      - 'prompt'   — operator types the PVE password into a modal each time;
                     server uses it once to mint a console_token (5-minute
                     TTL) and never persists it.
    """
    mode: str = "disabled"


@dataclass
class VmControlConfig:
    """v0.3+ VM control (write operations against PVE). Disabled by default
    so the binary remains read-only until the operator explicitly opts in."""
    enabled: bool = False
    # When False, even an authenticated operator cannot trigger writes —
    # the endpoint returns 503. Lets us ship the scaffolding safely.
    require_admin_for_destructive: bool = True
    # If True, stop / migrate / delete need admin; start / shutdown / reboot
    # are operator-tier (matches Jason's B3 confirmation tiers).


@dataclass
class Config:
    """Root configuration"""
    server: ServerConfig = field(default_factory=ServerConfig)
    clusters: list[ClusterConfig] = field(default_factory=list)
    alerts: AlertConfig = field(default_factory=AlertConfig)
    ui: UIConfig = field(default_factory=UIConfig)
    auth: AuthConfig = field(default_factory=AuthConfig)
    vm_control: VmControlConfig = field(default_factory=VmControlConfig)
    console: ConsoleConfig = field(default_factory=ConsoleConfig)

    def to_dict(self) -> dict:
        """Convert config to dictionary"""
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict) -> "Config":
        """Create config from dictionary"""
        server = _from_fields(ServerConfig, data.get("server") or {}, where="server")

        clusters = []
        for c in data.get("clusters", []):
            cid_for_log = c.get("id", "?")
            nodes = [_from_fields(PVENodeConfig, n or {},
                                  where=f"clusters[{cid_for_log}].nodes")
                     for n in c.get("nodes", [])]
            auth = _from_fields(PVEAuthConfig, c.get("auth") or {},
                                where=f"clusters[{cid_for_log}].auth")
            cluster = ClusterConfig(
                id=c.get("id", ""),
                name=c.get("name", ""),
                # Without this the field round-trips to "pve" no matter what
                # the file says, so `type: esxi` could never select the ESXi
                # adapter and re-saving the config silently rewrote it.
                type=str(c.get("type", "pve") or "pve").lower(),
                nodes=nodes,
                auth=auth,
                enabled=c.get("enabled", True),
                poll_interval=c.get("poll_interval", 2.0),
                static_refresh_interval=c.get("static_refresh_interval", 60.0),
                ssh_user=c.get("ssh_user", "root"),
                ssh_port=int(c.get("ssh_port", 22)),
            )
            clusters.append(cluster)

        alerts = _from_fields(AlertConfig, data.get("alerts") or {}, where="alerts")
        ui = _from_fields(UIConfig, data.get("ui") or {}, where="ui")
        auth_data = dict(data.get("auth") or {})
        forward_data = auth_data.pop("forward", {}) or {}
        auth_cfg = _from_fields(
            AuthConfig, {**auth_data,
                         "forward": _from_fields(AuditForwardConfig, forward_data,
                                                 where="auth.forward")},
            where="auth")
        vm_control_cfg = _from_fields(VmControlConfig, data.get("vm_control") or {},
                                      where="vm_control")
        console_cfg = _from_fields(ConsoleConfig, data.get("console") or {},
                                   where="console")

        return cls(server=server, clusters=clusters, alerts=alerts, ui=ui,
                   auth=auth_cfg, vm_control=vm_control_cfg, console=console_cfg)


# Global config instance
_current_config: Optional[Config] = None


def get_config() -> Config:
    """Get current configuration"""
    global _current_config
    if _current_config is None:
        _current_config = load_config()
    return _current_config


class ConfigError(RuntimeError):
    """The config file exists but could not be understood. Never swallowed:
    see load_config() for why."""


def load_config() -> Config:
    """Load configuration from file.

    FAIL-CLOSED. A config file that exists but cannot be parsed raises rather
    than falling back to Config(), because those defaults are
    `auth.enabled=False` + `host=0.0.0.0` -- so a truncated or hand-edited YAML
    used to turn an authenticated instance into an open one on the next
    restart, silently, with only a line in the journal. A missing file is a
    different thing entirely (first install) and still yields defaults.
    """
    global _current_config

    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                data = yaml.safe_load(f) or {}
            if not isinstance(data, dict):
                raise ValueError(
                    f"top level must be a mapping, got {type(data).__name__}")
            _current_config = Config.from_dict(data)
            logger.info(f"Configuration loaded from {CONFIG_FILE}")
        except Exception as e:
            logger.error(
                "REFUSING TO START: %s could not be parsed (%s). The previous "
                "settings -- including whether authentication is on -- cannot "
                "be recovered from a broken file, and starting with defaults "
                "would disable auth and bind 0.0.0.0. Restore a copy from %s, "
                "or move the file aside to start fresh.",
                CONFIG_FILE, e, CONFIG_BACKUP_DIR)
            raise ConfigError(f"{CONFIG_FILE}: {e}") from e
    else:
        logger.info("No config file found, using defaults")
        _current_config = Config()

    return _current_config


def backup_config():
    """Create a backup of the current config file"""
    if not os.path.exists(CONFIG_FILE):
        return

    # Create backup directory if needed
    os.makedirs(CONFIG_BACKUP_DIR, exist_ok=True)

    # Create backup with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(CONFIG_BACKUP_DIR, f"config_{timestamp}.yaml")
    shutil.copy2(CONFIG_FILE, backup_file)
    # copy2 preserves the SOURCE mode, so a 0644 config.yaml used to spray
    # world-readable copies of the same tokens into config_backups/.
    _ensure_secure_mode(backup_file)
    logger.info(f"Config backup created: {backup_file}")

    # Remove old backups if exceeding MAX_BACKUPS
    backups = sorted(glob.glob(os.path.join(CONFIG_BACKUP_DIR, "config_*.yaml")))
    while len(backups) > MAX_BACKUPS:
        old_backup = backups.pop(0)
        os.remove(old_backup)
        logger.info(f"Removed old backup: {old_backup}")


def save_config(config: Config) -> Config:
    """Save configuration to file, atomically, at mode 0600.

    Three things this must not do, all of which it used to:

      - Truncate the live file. `open(path, "w")` empties it before the first
        byte is written, so a crash mid-dump left a half-written config -- and
        load_config() now refuses to start on one of those.
      - Leave the mode to chance. This file holds PVE API tokens; whether it
        landed 0600 or 0644 depended on the umask of whoever wrote it last.
      - Report success it did not achieve. The old body caught every exception,
        logged it, and returned the config anyway, so `POST /api/config` told
        the operator their change was saved when the disk write had failed.
    """
    global _current_config

    # Create backup before saving. A failure here must not be fatal -- the
    # backup is a convenience, the write is the job -- but it IS logged.
    try:
        backup_config()
    except Exception as e:
        logger.warning(f"config backup failed (continuing with save): {e}")

    data = config.to_dict()
    directory = os.path.dirname(CONFIG_FILE) or "."
    fd, tmp = tempfile.mkstemp(prefix=".config.yaml.", dir=directory)
    try:
        os.fchmod(fd, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            yaml.dump(data, f, default_flow_style=False,
                      allow_unicode=True, sort_keys=False)
            f.flush()
            os.fsync(f.fileno())
        # Read it back before it replaces anything: a dump that cannot be
        # parsed is exactly what load_config() will refuse to start on.
        with open(tmp, "r", encoding="utf-8") as f:
            if not isinstance(yaml.safe_load(f), dict):
                raise ValueError("serialised config did not read back as a mapping")
        os.replace(tmp, CONFIG_FILE)
        tmp = None
    except Exception:
        logger.exception(f"Failed to save config to {CONFIG_FILE}")
        raise
    finally:
        if tmp is not None and os.path.exists(tmp):
            try:
                os.unlink(tmp)
            except OSError:
                pass

    # fsync the directory so the rename itself survives a power loss.
    try:
        dfd = os.open(directory, os.O_RDONLY)
        try:
            os.fsync(dfd)
        finally:
            os.close(dfd)
    except OSError as e:            # not fatal; the data is already in place
        logger.debug(f"directory fsync skipped: {e}")

    _ensure_secure_mode(CONFIG_FILE)
    _current_config = config
    logger.info(f"Configuration saved to {CONFIG_FILE}")
    return config


def update_config(updates: dict) -> Config:
    """Partially update configuration"""
    current = get_config().to_dict()

    # Special handling for clusters - preserve masked auth tokens
    if "clusters" in updates:
        current_clusters = {c["id"]: c for c in current.get("clusters", [])}
        for updated_cluster in updates["clusters"]:
            cluster_id = updated_cluster.get("id")
            if cluster_id and cluster_id in current_clusters:
                # Preserve token_value and password if they are masked ('***')
                if "auth" in updated_cluster:
                    orig_auth = current_clusters[cluster_id].get("auth", {})
                    if updated_cluster["auth"].get("token_value") == "***":
                        updated_cluster["auth"]["token_value"] = orig_auth.get("token_value", "")
                    if updated_cluster["auth"].get("password") == "***":
                        updated_cluster["auth"]["password"] = orig_auth.get("password", "")

    # Deep merge
    for key, value in updates.items():
        if key in current and isinstance(current[key], dict) and isinstance(value, dict):
            current[key].update(value)
        else:
            current[key] = value

    return save_config(Config.from_dict(current))
