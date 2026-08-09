/**
 * JT-PROXENSE Type Definitions
 */

// Enums
export type VMStatus = 'running' | 'stopped' | 'paused' | 'suspended' | 'unknown';
export type NodeStatus = 'online' | 'offline' | 'unknown';
export type HealthLevel = 'ok' | 'warning' | 'critical' | 'unknown';
export type VMType = 'qemu' | 'lxc';

// Metrics
export interface CPUMetrics {
  usage_percent: number;
  cores: number;
  sockets: number;
  mhz: number;
  iowait?: number;  // IO wait percentage
}

export interface MemoryMetrics {
  used_bytes: number;
  total_bytes: number;
  free_bytes: number;
  usage_percent?: number;
}

export interface DiskMetrics {
  used_bytes: number;
  total_bytes: number;
  free_bytes: number;
  read_bytes_sec: number;
  write_bytes_sec: number;
  usage_percent?: number;
}

export interface DiskConfig {
  device: string;   // scsi0, virtio0, rootfs, mp0, etc.
  storage: string;  // local-lvm, ceph-pool, etc.
  size: number;     // bytes
  format: string;   // raw, qcow2, vmdk, subvol, etc.
}

export interface NetworkMetrics {
  rx_bytes_sec: number;
  tx_bytes_sec: number;
  rx_packets_sec: number;
  tx_packets_sec: number;
}

// Resources
export interface VMMetrics {
  vmid: number;
  name: string;
  node: string;
  cluster_id: string;
  type: VMType;
  status: VMStatus;
  cpu: CPUMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics;
  network: NetworkMetrics;
  disks?: DiskConfig[];  // Individual disk configurations
  uptime: number;
  template: boolean;
  tags: string[];
  timestamp: number;
  health?: HealthLevel;  // NB: computed @property on the dataclass; asdict() drops it, so this is undefined over the wire. Use the health page / getNodeHealth, not this.
}

export interface NodeMetrics {
  node: string;
  cluster_id: string;
  status: NodeStatus;
  cpu: CPUMetrics;
  memory: MemoryMetrics;
  disk: DiskMetrics;
  network: NetworkMetrics;
  uptime: number;
  kernel_version: string;
  pve_version: string;
  vm_count: number;
  ct_count: number;
  timestamp: number;
  health?: HealthLevel;  // NB: computed @property on the dataclass; asdict() drops it, so this is undefined over the wire. Use the health page / getNodeHealth, not this.
}

export interface StorageMetrics {
  storage: string;
  node: string;
  cluster_id: string;
  type: string;
  content: string[];
  disk: DiskMetrics;
  enabled: boolean;
  shared: boolean;
  allowed_nodes: string[];  // Nodes configured in PVE settings (empty = all nodes)
  timestamp: number;
}

// Ceph
export interface CephOSD {
  id: number;
  name: string;
  status: string;
  in_cluster: boolean;
  used_bytes: number;
  total_bytes: number;
  host: string;
  apply_latency_ms: number;
  commit_latency_ms: number;
}

export interface CephPool {
  name: string;
  size: number;
  pg_num: number;
  used_bytes: number;
  total_bytes: number;
  objects: number;
}

export interface CephMon {
  name: string;
  host: string;
  addr: string;
  state: string; // "leader", "peon", "out"
}

export interface CephMgr {
  name: string;
  host: string;
  active: boolean;
}

export interface CephMds {
  name: string;
  host: string;
  state: string; // "active", "standby", "standby-replay"
  rank: number;
}

export interface CephMetrics {
  cluster_id: string;
  health: string;
  health_detail: string;
  osds: CephOSD[];
  pools: CephPool[];
  mons: CephMon[];
  mgrs: CephMgr[];
  mds: CephMds[];
  mon_count: number;
  mgr_count: number;
  mds_count: number;
  osd_count: number;
  osd_up: number;
  osd_in: number;
  total_bytes: number;
  used_bytes: number;
  available_bytes: number;
  read_bytes_sec: number;
  write_bytes_sec: number;
  read_ops_sec: number;
  write_ops_sec: number;
  timestamp: number;
}

// Cluster
export interface ClusterSummary {
  id: string;
  name: string;
  status: string;
  node_count: number;
  nodes_online: number;
  vm_count: number;
  vms_running: number;
  ct_count: number;
  cts_running: number;
  total_cpu_usage: number;
  total_memory_usage: number;
  total_storage_usage: number;
  /** PVE account this cluster authenticates as (username only). */
  pve_user?: string;
  has_ceph: boolean;
  ceph_health: string;
  alerts_critical: number;
  alerts_warning: number;
  is_standalone: boolean;
  timestamp: number;
}

export interface NodeHealth {
  host: string;
  port: number;
  healthy: boolean;
  response_time_ms: number;
  consecutive_failures: number;
  error_message: string;
  last_check: number;
}

export interface VMTask {
  upid: string;
  node: string;
  vmid: number;
  vmtype: string;
  task_type: string;
  status: string;
  user: string;
  starttime: number;
  endtime: number;
  progress: number;
  exitstatus: string;
  target_node?: string;  // For migration tasks
}

export interface ClusterData {
  id: string;
  name: string;
  summary: ClusterSummary | null;
  nodes: Record<string, NodeMetrics>;
  vms: Record<string, VMMetrics>;
  storages: Record<string, StorageMetrics>;
  ceph: CephMetrics | null;
  tasks: Record<string, VMTask>;
  last_update: number;
  client_health: Record<string, NodeHealth>;
}

export interface GlobalSummary {
  total_clusters: number;
  total_nodes: number;
  total_nodes_online: number;
  total_vms: number;
  total_vms_running: number;
  total_cts: number;
  total_cts_running: number;
  clusters: ClusterSummary[];
}

// WebSocket Messages
export interface WSMessage {
  type: 'initial' | 'update' | 'pong';
  data?: {
    clusters: Record<string, ClusterData>;
    timestamp: number;
  };
  timestamp: number;
}

// Alerts
export interface Alert {
  id: string;
  cluster_id: string;
  resource_type: 'node' | 'vm' | 'ct' | 'storage' | 'ceph';
  resource_id: string;
  resource_name: string;
  level: HealthLevel;
  metric: string;
  value: number;
  threshold: number;
  message: string;
  timestamp: number;
  acknowledged: boolean;
}

// Config
export type MatrixSortBy = 'vmid' | 'name' | 'load';
export type MatrixGroupSortBy = 'cluster' | 'node';
export type MatrixGroupBy = 'none' | 'node' | 'type' | 'tag';
export type SortOrder = 'asc' | 'desc';

export interface UIConfig {
  default_view: string;
  theme: string;
  language: string;
  animations_enabled: boolean;
  particle_count: number;
  vm_matrix_default_filter: 'all' | 'running' | 'stopped';
  matrix_card_width: number;
  matrix_sort_by: MatrixSortBy;
  matrix_group_by: MatrixGroupBy;
  matrix_group_sort_by: MatrixGroupSortBy;
  matrix_group_sort_order: SortOrder;
}

export interface Config {
  server: {
    host: string;
    http_port: number;
    influx_enabled: boolean;
    influx_port: number;
  };
  clusters: Array<{
    id: string;
    name: string;
    enabled: boolean;
    poll_interval: number;
    static_refresh_interval: number;
    nodes?: Array<{
      host: string;
      port: number;
      verify_ssl: boolean;
      priority: number;
    }>;
    auth?: {
      user: string;
      token_name: string;
      token_value: string;
      password: string;
    };
  }>;
  alerts: {
    enabled: boolean;
    cpu_warning: number;
    cpu_critical: number;
    memory_warning: number;
    memory_critical: number;
    disk_warning: number;
    disk_critical: number;
    diskio_warning: number;
    diskio_critical: number;
    iowait_warning: number;
    iowait_critical: number;
  };
  ui: UIConfig;
  console?: {
    mode: 'disabled' | 'stored' | 'prompt';
  };
}

// View types
export type ViewType =
  | 'command-center'
  | 'cluster-core'
  | 'holo-matrix'
  | 'radar-scan'
  | 'ceph-constellation'
  | 'storage'
  | 'tasks'
  | 'health'
  | 'backups'
  | 'host-upgrade'
  | 'settings'
  | 'users'
  | 'zfs-manager';

// Store types
export interface AppState {
  connected: boolean;
  connecting: boolean;
  lastUpdate: number;
  clusters: Record<string, ClusterData>;
  selectedCluster: string | null;
  currentView: ViewType;
  config: Config | null;
  alerts: Alert[];
  animationsEnabled: boolean;
}
