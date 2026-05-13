"""
JT-PROXENSE Configuration Management
Supports multi-cluster PVE monitoring with failover
"""

import glob
import logging
import os
import shutil
from dataclasses import dataclass, field, asdict
from datetime import datetime
from typing import Optional
import yaml

logger = logging.getLogger(__name__)

CONFIG_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "config.yaml")
CONFIG_BACKUP_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "config_backups")
MAX_BACKUPS = 10


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
    # Optional bearer token. Telegraf sends `Authorization: Token <t>`.
    # Empty = no auth (LAN-trust mode); the receiver should be bound to a
    # private interface in that case.
    influx_token: str = ""


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
        server = ServerConfig(**data.get("server", {}))

        clusters = []
        for c in data.get("clusters", []):
            nodes = [PVENodeConfig(**n) for n in c.get("nodes", [])]
            auth = PVEAuthConfig(**c.get("auth", {}))
            cluster = ClusterConfig(
                id=c.get("id", ""),
                name=c.get("name", ""),
                nodes=nodes,
                auth=auth,
                enabled=c.get("enabled", True),
                poll_interval=c.get("poll_interval", 2.0),
                static_refresh_interval=c.get("static_refresh_interval", 60.0),
                ssh_user=c.get("ssh_user", "root"),
                ssh_port=int(c.get("ssh_port", 22)),
            )
            clusters.append(cluster)

        alerts = AlertConfig(**data.get("alerts", {}))
        ui = UIConfig(**data.get("ui", {}))
        auth_data = dict(data.get("auth", {}))
        forward_data = auth_data.pop("forward", {}) or {}
        auth_cfg = AuthConfig(**auth_data, forward=AuditForwardConfig(**forward_data))
        vm_control_cfg = VmControlConfig(**data.get("vm_control", {}))
        console_cfg = ConsoleConfig(**data.get("console", {}))

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


def load_config() -> Config:
    """Load configuration from file"""
    global _current_config

    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                data = yaml.safe_load(f) or {}
            _current_config = Config.from_dict(data)
            logger.info(f"Configuration loaded from {CONFIG_FILE}")
        except Exception as e:
            logger.error(f"Failed to load config: {e}")
            _current_config = Config()
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
    logger.info(f"Config backup created: {backup_file}")

    # Remove old backups if exceeding MAX_BACKUPS
    backups = sorted(glob.glob(os.path.join(CONFIG_BACKUP_DIR, "config_*.yaml")))
    while len(backups) > MAX_BACKUPS:
        old_backup = backups.pop(0)
        os.remove(old_backup)
        logger.info(f"Removed old backup: {old_backup}")


def save_config(config: Config) -> Config:
    """Save configuration to file"""
    global _current_config

    try:
        # Create backup before saving
        backup_config()

        data = config.to_dict()
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            yaml.dump(data, f, default_flow_style=False, allow_unicode=True, sort_keys=False)
        _current_config = config
        logger.info(f"Configuration saved to {CONFIG_FILE}")
    except Exception as e:
        logger.error(f"Failed to save config: {e}")

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
