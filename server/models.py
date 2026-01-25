"""
JT-PROXENSE Unified Data Models
Dataclasses for PVE metrics and status
"""

from dataclasses import dataclass, field
from typing import Optional, Literal
from enum import Enum
import time


class VMStatus(str, Enum):
    RUNNING = "running"
    STOPPED = "stopped"
    PAUSED = "paused"
    SUSPENDED = "suspended"
    UNKNOWN = "unknown"


class NodeStatus(str, Enum):
    ONLINE = "online"
    OFFLINE = "offline"
    UNKNOWN = "unknown"


class HealthLevel(str, Enum):
    OK = "ok"
    WARNING = "warning"
    CRITICAL = "critical"
    UNKNOWN = "unknown"


@dataclass
class CPUMetrics:
    """CPU metrics"""
    usage_percent: float = 0.0
    cores: int = 0
    sockets: int = 0
    mhz: float = 0.0
    iowait: float = 0.0  # IO wait percentage


@dataclass
class MemoryMetrics:
    """Memory metrics"""
    used_bytes: int = 0
    total_bytes: int = 0
    free_bytes: int = 0

    @property
    def usage_percent(self) -> float:
        if self.total_bytes == 0:
            return 0.0
        return (self.used_bytes / self.total_bytes) * 100


@dataclass
class DiskMetrics:
    """Disk/Storage metrics"""
    used_bytes: int = 0
    total_bytes: int = 0
    free_bytes: int = 0
    read_bytes_sec: float = 0.0
    write_bytes_sec: float = 0.0

    @property
    def usage_percent(self) -> float:
        if self.total_bytes == 0:
            return 0.0
        return (self.used_bytes / self.total_bytes) * 100


@dataclass
class NetworkMetrics:
    """Network metrics"""
    rx_bytes_sec: float = 0.0
    tx_bytes_sec: float = 0.0
    rx_packets_sec: float = 0.0
    tx_packets_sec: float = 0.0


@dataclass
class VMMetrics:
    """Virtual Machine metrics"""
    vmid: int
    name: str
    node: str
    cluster_id: str
    type: Literal["qemu", "lxc"] = "qemu"
    status: VMStatus = VMStatus.UNKNOWN
    cpu: CPUMetrics = field(default_factory=CPUMetrics)
    memory: MemoryMetrics = field(default_factory=MemoryMetrics)
    disk: DiskMetrics = field(default_factory=DiskMetrics)
    network: NetworkMetrics = field(default_factory=NetworkMetrics)
    uptime: int = 0
    template: bool = False
    tags: list[str] = field(default_factory=list)
    timestamp: float = field(default_factory=time.time)

    @property
    def health(self) -> HealthLevel:
        """Determine health level based on metrics"""
        if self.status != VMStatus.RUNNING:
            return HealthLevel.UNKNOWN
        if self.cpu.usage_percent > 95 or self.memory.usage_percent > 95:
            return HealthLevel.CRITICAL
        if self.cpu.usage_percent > 80 or self.memory.usage_percent > 85:
            return HealthLevel.WARNING
        return HealthLevel.OK


@dataclass
class NodeMetrics:
    """PVE Node metrics"""
    node: str
    cluster_id: str
    status: NodeStatus = NodeStatus.UNKNOWN
    cpu: CPUMetrics = field(default_factory=CPUMetrics)
    memory: MemoryMetrics = field(default_factory=MemoryMetrics)
    disk: DiskMetrics = field(default_factory=DiskMetrics)
    network: NetworkMetrics = field(default_factory=NetworkMetrics)
    uptime: int = 0
    kernel_version: str = ""
    pve_version: str = ""
    vm_count: int = 0
    ct_count: int = 0
    timestamp: float = field(default_factory=time.time)

    @property
    def health(self) -> HealthLevel:
        """Determine health level"""
        if self.status != NodeStatus.ONLINE:
            return HealthLevel.CRITICAL
        if self.cpu.usage_percent > 95 or self.memory.usage_percent > 95:
            return HealthLevel.CRITICAL
        if self.cpu.usage_percent > 80 or self.memory.usage_percent > 85:
            return HealthLevel.WARNING
        return HealthLevel.OK


@dataclass
class StorageMetrics:
    """Storage metrics"""
    storage: str
    node: str
    cluster_id: str
    type: str = ""  # dir, lvm, ceph, nfs, etc.
    content: list[str] = field(default_factory=list)  # images, rootdir, iso, etc.
    disk: DiskMetrics = field(default_factory=DiskMetrics)
    enabled: bool = True
    shared: bool = False
    allowed_nodes: list[str] = field(default_factory=list)  # Nodes configured in PVE settings (empty = all nodes)
    timestamp: float = field(default_factory=time.time)


@dataclass
class CephOSD:
    """Ceph OSD info"""
    id: int
    name: str
    status: str = "up"
    in_cluster: bool = True
    used_bytes: int = 0
    total_bytes: int = 0
    host: str = ""
    apply_latency_ms: float = 0  # OSD apply latency in milliseconds
    commit_latency_ms: float = 0  # OSD commit latency in milliseconds


@dataclass
class CephPool:
    """Ceph pool info"""
    name: str
    size: int = 3  # replication factor
    pg_num: int = 0
    used_bytes: int = 0
    total_bytes: int = 0
    objects: int = 0


@dataclass
class CephMon:
    """Ceph monitor info"""
    name: str
    host: str = ""
    addr: str = ""
    state: str = "unknown"  # leader, peon, etc.


@dataclass
class CephMgr:
    """Ceph manager info"""
    name: str
    host: str = ""
    active: bool = False


@dataclass
class CephMds:
    """Ceph metadata server info"""
    name: str
    host: str = ""
    state: str = "standby"  # active, standby, standby-replay
    rank: int = -1


@dataclass
class CephMetrics:
    """Ceph cluster metrics"""
    cluster_id: str
    health: str = "HEALTH_OK"
    health_detail: str = ""
    osds: list[CephOSD] = field(default_factory=list)
    pools: list[CephPool] = field(default_factory=list)
    mons: list[CephMon] = field(default_factory=list)
    mgrs: list[CephMgr] = field(default_factory=list)
    mds: list[CephMds] = field(default_factory=list)
    mon_count: int = 0
    mgr_count: int = 0
    mds_count: int = 0
    osd_count: int = 0
    osd_up: int = 0
    osd_in: int = 0
    total_bytes: int = 0
    used_bytes: int = 0
    available_bytes: int = 0
    read_bytes_sec: float = 0.0
    write_bytes_sec: float = 0.0
    read_ops_sec: float = 0.0
    write_ops_sec: float = 0.0
    timestamp: float = field(default_factory=time.time)


@dataclass
class ClusterSummary:
    """Cluster summary for overview"""
    id: str
    name: str
    status: str = "connected"
    node_count: int = 0
    nodes_online: int = 0
    vm_count: int = 0
    vms_running: int = 0
    ct_count: int = 0
    cts_running: int = 0
    total_cpu_usage: float = 0.0
    total_memory_usage: float = 0.0
    total_storage_usage: float = 0.0
    has_ceph: bool = False
    ceph_health: str = ""
    alerts_critical: int = 0
    alerts_warning: int = 0
    is_standalone: bool = False  # True if single-node PVE (not a cluster)
    timestamp: float = field(default_factory=time.time)


@dataclass
class Alert:
    """Alert/Notification"""
    id: str
    cluster_id: str
    resource_type: Literal["node", "vm", "ct", "storage", "ceph"]
    resource_id: str
    resource_name: str
    level: HealthLevel
    metric: str  # cpu, memory, disk, status
    value: float
    threshold: float
    message: str
    timestamp: float = field(default_factory=time.time)
    acknowledged: bool = False


@dataclass
class VMTask:
    """Running VM task/operation"""
    upid: str  # Unique process ID
    node: str
    vmid: int
    vmtype: str  # qemu or lxc
    task_type: str  # qmstart, qmstop, qmshutdown, qmmigrate, vzdump, qmrestore, qmsnapshot, qmrollback, etc.
    status: str  # running, stopped, OK, error
    user: str
    starttime: float
    endtime: float = 0.0
    progress: float = 0.0  # 0-100 if available
    exitstatus: str = ""
    target_node: str = ""  # Target node for migration tasks
