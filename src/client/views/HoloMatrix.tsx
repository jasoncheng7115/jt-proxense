/**
 * JT-PROXENSE Holo Matrix View
 * VM Grid visualization with heatmap
 */

import React, { useMemo, useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import {
  VMContextMenu,
  type ContextMenuState,
  type PowerActionRequest,
} from '../components/VMContextMenu';
import { useTranslation } from '../i18n';
import type { ClusterData, VMMetrics, NodeHealth, VMTask } from '../types';
import { formatPercent, formatBytes, formatUptime, getHealthColor, getStatusColor } from '../utils/format';
import { TaskBadge } from '../components/TaskIndicator';
import { api } from '../api';
import { ConfirmModal } from '../components/ConfirmModal';
import { RemoteMigrateModal } from '../components/RemoteMigrateModal';
import { VMCloneModal, VMMigrateModal, VMDeleteModal } from '../components/VMActionModals';
import { SnapshotsModal } from '../components/SnapshotsModal';
import { BackupModal } from '../components/BackupModal';
import { VMExportModal } from '../components/VMExportModal';
import { RRDChartModal } from '../components/RRDChartModal';
import { BackupHistoryModal } from '../components/BackupHistoryModal';
import { VMConfigModal } from '../components/VMConfigModal';
import { FirewallModal } from '../components/FirewallModal';
import { TagEditorModal } from '../components/TagEditorModal';
import { BulkTagModal } from '../components/BulkTagModal';
import { ConsolePasswordPrompt } from '../components/ConsolePasswordPrompt';
import { useAuth } from '../composables/useAuth';
import { useDialogs } from '../composables/useDialogs';

// Translate a power action verb. The matching i18n keys
// (vm.start / vm.shutdown_acpi / …) cover both EN and zh-TW so this never
// leaks an English word into the Chinese UI.
function actionTitle(a: string, t: (k: string) => string): string {
  switch (a) {
    case 'start':    return t('vm.start');
    case 'stop':     return t('vm.stop_hard');
    case 'shutdown': return t('vm.shutdown_acpi');
    case 'reboot':   return t('vm.reboot');
    case 'suspend':  return 'Suspend';
    case 'resume':   return 'Resume';
    default:         return a;
  }
}
function isDestructive(a: string): boolean {
  return a === 'stop' || a === 'shutdown' || a === 'reboot';
}

// Helper to find task for a VM - uses clusterId + vmid for unique identification
function findVMTask(
  vmid: number,
  node: string,
  clusterId: string,
  cluster?: ClusterData | null,
  clusters?: Record<string, ClusterData>
): VMTask | null {
  const searchCluster = (c: ClusterData): VMTask | null => {
    if (!c.tasks) return null;
    for (const task of Object.values(c.tasks)) {
      // Match by vmid, node (source node for migration), and running status
      if (task.vmid === vmid && task.node === node && task.status === 'running') {
        return task;
      }
    }
    return null;
  };

  // When viewing multiple clusters, only search in the specific cluster
  if (clusters && clusterId) {
    const targetCluster = clusters[clusterId];
    if (targetCluster) {
      return searchCluster(targetCluster);
    }
  } else if (cluster) {
    return searchCluster(cluster);
  }
  return null;
}

interface HoloMatrixProps {
  cluster: ClusterData | null;
  clusters?: Record<string, ClusterData>; // For "all clusters" mode
}

// Context Menu for VM actions
// Table-view column registry. `key` doubles as the localStorage token;
// labelKey resolves through t(). Columns marked extra are NOT in the
// default set — they exist only via the column picker.
const TABLE_COLUMN_DEFS: Array<{ key: string; labelKey: string }> = [
  { key: 'status',  labelKey: 'node.status' },
  { key: 'vmid',    labelKey: 'VMID' },
  { key: 'type',    labelKey: 'table.type' },
  { key: 'name',    labelKey: 'table.name' },
  { key: 'tags',    labelKey: 'table.tags' },
  { key: 'cluster', labelKey: 'table.cluster' },
  { key: 'node',    labelKey: 'table.node' },
  { key: 'cpu',     labelKey: 'metric.cpu' },
  { key: 'cores',   labelKey: 'table.cores' },
  { key: 'memory',  labelKey: 'metric.memory' },
  { key: 'maxmem',  labelKey: 'table.maxmem' },
  { key: 'disk',    labelKey: 'table.disk_usage' },
  { key: 'maxdisk', labelKey: 'table.maxdisk' },
  { key: 'diskio',  labelKey: 'table.diskio' },
  { key: 'rx',      labelKey: 'metric.rx' },
  { key: 'tx',      labelKey: 'metric.tx' },
  { key: 'uptime',  labelKey: 'table.uptime' },
  { key: 'task',    labelKey: 'table.task' },
];
const DEFAULT_TABLE_COLS = [
  'status', 'vmid', 'type', 'name', 'tags', 'node', 'cpu', 'memory',
  'rx', 'tx', 'uptime', 'task',
];

// VMContextMenu + ContextMenuState + PowerActionRequest moved to
// components/VMContextMenu.tsx so RadarScan can reuse them. Imports
// already declared at the top of this file.

// VM Cell component with animation support
const VMCell = React.forwardRef<HTMLDivElement, {
  vm: VMMetrics;
  isSelected: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  animationDelay: number;
  task?: VMTask | null;
  isGhost?: boolean;  // For migration target ghost cell
  isCompleting?: boolean;  // For completed migration fade out
}>(function VMCell({
  vm,
  isSelected,
  onClick,
  onContextMenu,
  animationDelay,
  task,
  isGhost = false,
  isCompleting = false,
}, ref) {
  const isRunning = vm.status === 'running';
  // Use max of CPU, MEM, DISK for health color (same calculation as sorting)
  const memPercent = vm.memory.total_bytes > 0 ? (vm.memory.used_bytes / vm.memory.total_bytes) * 100 : 0;
  const diskPercent = vm.disk.total_bytes > 0 ? (vm.disk.used_bytes / vm.disk.total_bytes) * 100 : 0;
  const maxLoad = Math.max(vm.cpu.usage_percent, memPercent, diskPercent);
  const healthColor = isRunning ? getHealthColor(maxLoad) : 'muted';
  const hasTask = !!task;
  const isMigrating = task?.task_type?.includes('migrate');
  const isBackup = task?.task_type?.includes('backup') || task?.task_type?.includes('vzdump');

  // Truncate name if too long
  const displayName = vm.name.length > 12 ? vm.name.substring(0, 11) + '…' : vm.name;

  // Get short task label and color
  const getTaskLabel = (taskType: string): { label: string; color: string } => {
    const type = taskType.toLowerCase();
    if (type.includes('migrate')) return { label: 'MIGRATE', color: '#00f0ff' };
    if (type.includes('backup') || type.includes('vzdump')) return { label: 'BACKUP', color: '#ff9500' };
    if (type.includes('restore')) return { label: 'RESTORE', color: '#f59e0b' };
    if (type.includes('snapshot')) return { label: 'SNAP', color: '#06b6d4' };
    if (type.includes('clone')) return { label: 'CLONE', color: '#10b981' };
    if (type.includes('start') || type.includes('qmstart')) return { label: 'START', color: '#00ff88' };
    if (type.includes('stop') || type.includes('shutdown')) return { label: 'STOP', color: '#ff6b00' };
    if (type.includes('reboot') || type.includes('reset')) return { label: 'REBOOT', color: '#ff6b00' };
    return { label: 'TASK', color: '#e066ff' };
  };

  const taskLabel = task ? getTaskLabel(task.task_type) : null;

  // Task info for display
  const taskInfo = task ? {
    type: task.task_type,
    target: task.target_node,
    isMigrating,
  } : null;

  return (
    <div
      ref={ref}
      className={`vm-cell ${vm.status} ${isSelected ? 'selected' : ''} ${hasTask ? 'has-task' : ''} ${isMigrating ? 'migrating' : ''} ${isBackup ? 'backup' : ''} ${isGhost ? 'ghost' : ''} ${isCompleting ? 'completing' : ''}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
      title={`${vm.name} (${vm.vmid})${task ? `\n[${task.task_type}]${task.target_node ? ` → ${task.target_node}` : ''}` : ''}`}
      style={{ '--anim-delay': `${animationDelay}ms`, animationDelay: `${animationDelay}ms` } as React.CSSProperties}
      data-vmid={vm.vmid}
      data-node={vm.node}
    >
      <div className={`vm-cell-inner ${healthColor}`}>
        <span className={`vm-type-tag ${vm.type === 'lxc' ? 'ct' : 'vm'}`}>
          {vm.type === 'lxc' ? 'CT' : 'VM'}
        </span>
        <span className="vm-name">{displayName}</span>
        <span className="vm-id">{vm.vmid}</span>
        {task && !isMigrating && !isBackup && <span className="vm-task-icon">⚙</span>}
        {isBackup && <span className="vm-backup-icon">◉</span>}
        {isMigrating && (
          <span className="vm-migrate-icon">
            <span className="migrate-arrow">→</span>
          </span>
        )}
      </div>
      {/* Task label badge — shows live progress for migration tasks */}
      {taskLabel && (
        <div
          className="vm-task-label"
          style={{
            borderColor: taskLabel.color,
            color: taskLabel.color,
          }}
        >
          {taskLabel.label}
          {isMigrating && task && task.progress > 0 && (
            <span className="vm-task-progress"> {Math.floor(task.progress)}%</span>
          )}
        </div>
      )}
      {hasTask && !isMigrating && !isBackup && <div className="vm-task-ring" />}
      {isBackup && (
        <>
          <div className="backup-ring" />
          <div className="backup-scanner" />
          <div className="backup-particles">
            <span className="bp bp1" />
            <span className="bp bp2" />
            <span className="bp bp3" />
            <span className="bp bp4" />
          </div>
        </>
      )}
      {isMigrating && (
        <>
          <div className="migrate-ring" />
          <div className="migrate-particles">
            <span className="particle p1" />
            <span className="particle p2" />
            <span className="particle p3" />
          </div>
          {taskInfo?.target && (
            <div className="migrate-target-label">→ {taskInfo.target}</div>
          )}
        </>
      )}
      {isGhost && (
        <div className="vm-incoming-label">
          INCOMING
          {task && task.progress > 0 && (
            <span className="vm-task-progress">{Math.floor(task.progress)}%</span>
          )}
        </div>
      )}
    </div>
  );
});

// VM Detail Panel
function VMDetailPanel({
  vm,
  onClose,
}: {
  vm: VMMetrics;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const isRunning = vm.status === 'running';

  return (
    <div className="vm-detail-panel panel">
      <div className="detail-scroll-area">
        <div className="detail-header">
          <div className="detail-title">
            <span className={`detail-status ${getStatusColor(vm.status)}`} />
            <span className="detail-name">{vm.name}</span>
            <span className="detail-id">#{vm.vmid}</span>
          </div>
          <button className="detail-close" onClick={onClose}>×</button>
        </div>

        <div className="detail-content">
        <div className="detail-info">
          <div className="info-row">
            <span className="info-label">{t('table.node')}</span>
            <span className="info-value">{vm.node}</span>
          </div>
          <div className="info-row">
            <span className="info-label">{t('table.type')}</span>
            <span className="info-value">{vm.type.toUpperCase()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">{t('node.status')}</span>
            <span className={`info-value text-${getStatusColor(vm.status)}`}>
              {vm.status.toUpperCase()}
            </span>
          </div>
          {isRunning && (
            <div className="info-row">
              <span className="info-label">{t('table.uptime')}</span>
              <span className="info-value">{formatUptime(vm.uptime)}</span>
            </div>
          )}
          {(() => {
            const tags = normaliseTags(vm.tags);
            return tags.length > 0 ? (
              <div className="info-row tags-row">
                <span className="info-label">{t('table.tags')}</span>
                <div className="vm-tags detail-tags">
                  {tags.map((tag, i) => (
                    <span key={i} className="vm-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ) : null;
          })()}
        </div>

        {isRunning && (
          <div className="detail-metrics">
            <div className="metric-row metric-row-stacked">
              <div className="metric-row-header">
                <span className="metric-label">{t('metric.cpu')}</span>
                <span className={`metric-value text-${getHealthColor(vm.cpu.usage_percent)}`}>
                  {formatPercent(vm.cpu.usage_percent, 1)}
                </span>
              </div>
              <div className="metric-bar">
                <div
                  className={`metric-fill ${getHealthColor(vm.cpu.usage_percent)}`}
                  style={{ width: `${vm.cpu.usage_percent}%` }}
                />
              </div>
            </div>

            <div className="metric-row metric-row-stacked">
              <div className="metric-row-header">
                <span className="metric-label">{t('metric.memory')}</span>
                <span className="metric-value">
                  {formatBytes(vm.memory.used_bytes)} / {formatBytes(vm.memory.total_bytes)}
                </span>
              </div>
              <div className="metric-bar">
                <div
                  className={`metric-fill ${getHealthColor((vm.memory.used_bytes / vm.memory.total_bytes) * 100)}`}
                  style={{ width: `${(vm.memory.used_bytes / vm.memory.total_bytes) * 100}%` }}
                />
              </div>
            </div>

            <div className="metric-row metric-row-network">
              <span className="metric-label">{t('metric.network')}</span>
              <div className="network-stats">
                <span className="net-rx">↓ {formatBytes(vm.network.rx_bytes_sec)}/s</span>
                <span className="net-tx">↑ {formatBytes(vm.network.tx_bytes_sec)}/s</span>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </div>
  );
}

// View mode type
// How long to keep drawing a migration that has dropped out of the task
// snapshot. Long enough to bridge the hamigrate -> qmigrate handover and a
// missed poll; short enough that a genuinely finished move clears promptly.
const MIGRATION_GRACE_MS = 12000;

type ViewMode = 'grid' | 'table' | 'thumb' | 'heatmap';
type SortField = 'name' | 'vmid' | 'type' | 'node' | 'status' | 'cpu' | 'memory' | 'uptime' | 'rx' | 'tx' | 'task';
type SortDirection = 'asc' | 'desc';
type MatrixSortBy = 'vmid' | 'name' | 'load';
type GroupByMode = 'none' | 'node' | 'type' | 'tag';

// Migration line data for SVG overlay
interface MigrationLine {
  vmid: number;
  sourceKey: string;
  targetKey: string;
  sourceNode: string;
  targetNode: string;
}

export function HoloMatrix({ cluster, clusters }: HoloMatrixProps) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [selectedVMKey, setSelectedVMKey] = useState<string | null>(null);
  // v0.3 power-action state
  const auth = useAuth();
  const [pendingAction, setPendingAction] = useState<PowerActionRequest | null>(null);
  // Cross-cluster migrate target (vm + clusterId pair the operator is acting on).
  const [remoteMigrateVm, setRemoteMigrateVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [snapshotVm, setSnapshotVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [backupVm, setBackupVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [exportReq, setExportReq] = useState<{ vm: VMMetrics; clusterId: string; format: 'ova' | 'hyperv' } | null>(null);

  // ── Table column picker ──────────────────────────────────────────
  // Visible-column set persisted per browser. DEFAULT_TABLE_COLS is the
  // pre-picker column set; the picker also offers columns that were
  // never shown before (cluster / vCPU / mem quota / disk usage+total /
  // disk I/O).
  const [colPickerOpen, setColPickerOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState<Set<string>>(() => {
    try {
      const s = localStorage.getItem('jtp.matrix.table.cols.v1');
      if (s) return new Set(JSON.parse(s) as string[]);
    } catch { /* fall through to default */ }
    return new Set(DEFAULT_TABLE_COLS);
  });
  const colVisible = useCallback((k: string) => visibleCols.has(k), [visibleCols]);
  const toggleCol = useCallback((k: string) => {
    setVisibleCols((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      try { localStorage.setItem('jtp.matrix.table.cols.v1', JSON.stringify([...next])); } catch { /* private mode */ }
      return next;
    });
  }, []);
  const resetCols = useCallback(() => {
    setVisibleCols(new Set(DEFAULT_TABLE_COLS));
    try { localStorage.setItem('jtp.matrix.table.cols.v1', JSON.stringify(DEFAULT_TABLE_COLS)); } catch { /* private mode */ }
  }, []);
  useEffect(() => {
    if (!colPickerOpen) return;
    const close = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest('.col-picker-wrap')) setColPickerOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [colPickerOpen]);
  const [perfVm, setPerfVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [bhistVm, setBhistVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [cfgVm, setCfgVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [cloneVm, setCloneVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [migrateVm, setMigrateVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [deleteVm, setDeleteVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [fwVm, setFwVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [tagEditVm, setTagEditVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [bulkTagOpen, setBulkTagOpen] = useState(false);

  // Console authentication mode + per-cluster "is password configured" map.
  // The map lets us draw the Console menu item as *visible-but-disabled*
  // (with a tooltip explaining why) instead of hiding it — the operator
  // shouldn't have to guess whether the feature is missing or just not set up.
  const [consoleMode, setConsoleMode] = useState<'disabled' | 'stored' | 'prompt'>('disabled');
  const [clusterHasPassword, setClusterHasPassword] = useState<Record<string, boolean>>({});
  useEffect(() => {
    api.getConfig()
      .then((c) => {
        setConsoleMode((c.console?.mode as 'disabled' | 'stored' | 'prompt') || 'disabled');
        const map: Record<string, boolean> = {};
        (c.clusters || []).forEach((cl) => {
          // get_config_handler masks a set password as '***' and an unset one
          // as empty string — so any non-empty value here means "configured".
          map[cl.id] = !!(cl.auth && cl.auth.password && cl.auth.password.length > 0);
        });
        setClusterHasPassword(map);
      })
      .catch(() => setConsoleMode('disabled'));
  }, []);

  // Password-prompt modal state for console.mode='prompt'.
  const [consolePromptVm, setConsolePromptVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);

  // Open a console tab once we have a console_token (mints the URL with ?ct=...).
  // QEMU → /console/ (noVNC framebuffer); LXC → /console-term/ (xterm.js
  // termproxy), matching the PVE web UI's default console types.
  // The VNC RFB password is only used for noVNC and travels via URL fragment
  // so it never hits server access logs or proxy caches.
  // `preOpened` is a tab opened SYNCHRONOUSLY in the click handler (before
  // the await on /api/console/prepare). Browsers block window.open() that
  // runs after an await because it's no longer tied to the user gesture —
  // which is exactly why consoles silently "wouldn't open" (prepare returned
  // 200 but the tab never appeared). When we have a pre-opened tab we just
  // navigate it; otherwise fall back to a fresh window.open.
  const openConsoleTab = useCallback(
    (cid: string, vm: VMMetrics, token: string, vncPassword?: string,
     kind: 'auto' | 'serial' = 'auto', preOpened?: Window | null) => {
      const lang = (typeof localStorage !== 'undefined'
        && localStorage.getItem('language')) || '';
      const isCT = vm.type === 'lxc';
      const isSerial = kind === 'serial' && !isCT;
      const base = (isCT || isSerial) ? '/console-term' : '/console';
      const url =
        `${base}/${encodeURIComponent(cid)}/${encodeURIComponent(vm.node)}/${vm.vmid}`
        + `?ct=${encodeURIComponent(token)}`
        + (vm.name ? `&name=${encodeURIComponent(vm.name)}` : '')
        + (isSerial ? `&kind=serial` : '')
        + (lang ? `&lang=${encodeURIComponent(lang)}` : '')
        + (!isCT && !isSerial && vncPassword ? `#vp=${encodeURIComponent(vncPassword)}` : '');
      if (preOpened && !preOpened.closed) {
        preOpened.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    [],
  );

  // Open a placeholder tab synchronously inside a user-gesture click, so the
  // later (post-await) navigation isn't treated as a blockable popup. Returns
  // null if the browser blocked even this synchronous open.
  const openPlaceholderTab = useCallback((): Window | null => {
    const w = window.open('', '_blank');
    if (w) {
      try {
        w.opener = null;   // sever the reference (we used no 'noopener' so we could hold the handle)
        w.document.write(
          '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Console…</title>'
          + '<style>html,body{margin:0;height:100%;background:#05070d;color:#00f0ff;'
          + 'font-family:monospace;display:flex;align-items:center;justify-content:center}</style>'
          + '</head><body>opening console…</body></html>'
        );
      } catch { /* about:blank write can throw in rare cases; ignore */ }
    }
    return w;
  }, []);

  // Failure-toast state (Plan B). When a migration we were tracking ends
  // with non-OK exitstatus, we surface a toast with a copyable `qm unlock`
  // command so the operator can clear the lock on the source node — the
  // API token can't do it (PVE: "only root can set 'lock'").
  const [migrationFailures, setMigrationFailures] = useState<Array<{
    id: string; vmid: number; sourceNode: string; targetNode: string;
    clusterLabel: string; lock: string; copied: boolean;
  }>>([]);
  const prevMigrationsInfo = useRef<Map<string, {
    upid: string; node: string; sourceNode: string; vmid: number; clusterId: string;
    clusterLabel: string; targetNode: string;
  }>>(new Map());
  const requestPowerAction = useCallback((req: PowerActionRequest) => {
    if (req.action === 'start' || req.action === 'resume') {
      // Tier 1: no-confirm — fire immediately
      runPowerAction(req);
    } else {
      // Tier 2/3: open confirm modal
      setPendingAction(req);
    }
  }, []);
  const runPowerAction = useCallback(async (req: PowerActionRequest) => {
    setPendingAction(null);
    try {
      const isCt = req.vm.type === 'lxc';
      const result = isCt
        ? await api.ctAction(req.clusterId, req.vm.node, req.vm.vmid, req.action)
        : await api.vmAction(req.clusterId, req.vm.node, req.vm.vmid, req.action);
      console.info(`[vm_control] ${req.action} ${isCt?'ct':'vm'}/${req.vm.vmid} → upid=${result.upid}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // 503 vm_control_disabled comes back as text body containing the error
      if (msg.includes('vm_control_disabled')) {
        await dialog.alert('VM control is disabled on this server.\nSet vm_control.enabled: true in config.yaml and restart the service.');
      } else {
        await dialog.alert(`${req.action} failed: ${msg.slice(0, 200)}`);
      }
    }
  }, []);
  const confirmPowerAction = useCallback(() => {
    if (pendingAction) runPowerAction(pendingAction);
  }, [pendingAction, runPowerAction]);
  const [filter, setFilter] = useState<'all' | 'running' | 'stopped'>(() => {
    // Load default from localStorage (synced with settings)
    const saved = localStorage.getItem('vm_matrix_default_filter');
    return (saved as 'all' | 'running' | 'stopped') || 'all';
  });
  const [searchTerm, setSearchTerm] = useState('');
  // viewMode resolution priority:
  //   1. URL sub-path (/matrix/grid|table|thumb) — wins so deep links land
  //      on the right view regardless of the user's last localStorage choice.
  //   2. localStorage (last selection in this browser).
  //   3. 'grid' default.
  // Bulk-select state for the table view. Keys are `${cluster_id}/${node}/${vmid}`.
  // Cleared whenever the user changes filter / search / cluster.
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);
  const toggleSelected = useCallback((key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);
  const clearSelection = useCallback(() => setSelected(new Set()), []);

  // Group selected keys by cluster_id so we can fan out per-cluster
  // bulk POSTs (the API is per-cluster). vmids include both VMs and CTs;
  // the server's vm_bulk_handler auto-detects each.
  const runBulkAction = useCallback(async (
    action: 'start' | 'stop' | 'shutdown' | 'reboot',
  ) => {
    if (selected.size === 0) return;
    setBulkBusy(true);
    try {
      const byCluster = new Map<string, number[]>();
      for (const key of selected) {
        const [cid, , vmidStr] = key.split('/');
        const vmid = parseInt(vmidStr, 10);
        if (!cid || !Number.isFinite(vmid)) continue;
        const arr = byCluster.get(cid) || [];
        arr.push(vmid);
        byCluster.set(cid, arr);
      }
      const results: Array<{ cluster: string; ok: number; fail: number; errs: string[] }> = [];
      for (const [cid, vmids] of byCluster) {
        try {
          const r = await api.bulkAction(cid, { action, vmids });
          const ok = r.results.filter((x) => x.ok).length;
          const fail = r.results.length - ok;
          const errs = r.results.filter((x) => !x.ok)
            .map((x) => `#${x.vmid}: ${x.error || 'unknown'}`);
          results.push({ cluster: cid, ok, fail, errs });
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          results.push({ cluster: cid, ok: 0, fail: vmids.length, errs: [msg] });
        }
      }
      const totalOk   = results.reduce((s, r) => s + r.ok, 0);
      const totalFail = results.reduce((s, r) => s + r.fail, 0);
      const lines: string[] = [];
      results.forEach((r) => {
        lines.push(`${r.cluster}: ${r.ok} ok / ${r.fail} fail`);
        r.errs.slice(0, 5).forEach((e) => lines.push(`  • ${e}`));
        if (r.errs.length > 5) lines.push(`  • … +${r.errs.length - 5}`);
      });
      await dialog.alert(
        `${action.toUpperCase()}: ${totalOk} ok, ${totalFail} fail\n\n${lines.join('\n')}`,
        { title: 'Bulk action result' },
      );
      if (totalFail === 0) clearSelection();
    } finally {
      setBulkBusy(false);
    }
  }, [selected, clearSelection]);

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const fromPath = (() => {
      if (typeof window === 'undefined') return null;
      const seg = window.location.pathname.split('/').filter(Boolean)[1];
      return (seg === 'grid' || seg === 'table' || seg === 'thumb' || seg === 'heatmap') ? seg : null;
    })();
    if (fromPath) return fromPath;
    const saved = localStorage.getItem('vm_matrix_view_mode');
    return (saved === 'table' || saved === 'thumb' || saved === 'grid' || saved === 'heatmap')
      ? (saved as ViewMode) : 'grid';
  });
  // Sync viewMode → URL sub-path. Only writes when actually under /matrix
  // so a user navigating away to /storage doesn't have us clobber their URL.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts[0] !== 'matrix') return;
    const desired = `/matrix/${viewMode}`;
    if (window.location.pathname !== desired) {
      window.history.replaceState(null, '', desired);
    }
  }, [viewMode]);
  // Listen for popstate (back/forward) to keep viewMode in sync with URL.
  useEffect(() => {
    const onPop = () => {
      const seg = window.location.pathname.split('/').filter(Boolean)[1];
      if (seg === 'grid' || seg === 'table' || seg === 'thumb' || seg === 'heatmap') {
        setViewMode(seg);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  // Thumbnail view sizing (px wide). Persisted across sessions.
  const [thumbSize, setThumbSize] = useState<number>(() => {
    const saved = parseInt(localStorage.getItem('vm_matrix_thumb_size') || '320', 10);
    return Number.isFinite(saved) ? Math.max(160, Math.min(640, saved)) : 320;
  });
  // Click-to-zoom: which VM's screenshot to show full-size. null = closed.
  const [thumbPreview, setThumbPreview] = useState<{
    vm: VMMetrics; clusterId: string;
  } | null>(null);
  // ESC closes the preview modal.
  useEffect(() => {
    if (!thumbPreview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setThumbPreview(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [thumbPreview]);
  // Refresh-tick used as cache-buster for thumbnail <img> URLs. Bumps on a
  // 30s interval; the server cache is 10s so this is gentle.
  const [thumbTick, setThumbTick] = useState<number>(() => Math.floor(Date.now() / 30000));
  useEffect(() => {
    if (viewMode !== 'thumb') return;
    const id = window.setInterval(
      () => setThumbTick(Math.floor(Date.now() / 30000)),
      30_000,
    );
    return () => window.clearInterval(id);
  }, [viewMode]);
  // Thumb-only type filter (independent from the global "all/running/stopped"
  // filter, which is disabled in thumb mode). 'all' = both, 'qemu' = VM only,
  // 'lxc' = CT only.
  const [thumbTypeFilter, setThumbTypeFilter] = useState<'all' | 'qemu' | 'lxc'>(() => {
    const saved = localStorage.getItem('vm_matrix_thumb_type');
    return (saved === 'qemu' || saved === 'lxc') ? saved : 'all';
  });
  useEffect(() => {
    localStorage.setItem('vm_matrix_thumb_type', thumbTypeFilter);
  }, [thumbTypeFilter]);
  // "Prefer with content" toggle — when on, blank thumbnails (all-black
  // VM consoles, CTs with no visible text) sink to the bottom so the
  // operator sees useful screens first. Persisted across sessions.
  const [thumbPreferContent, setThumbPreferContent] = useState<boolean>(() => {
    return localStorage.getItem('vm_matrix_thumb_prefer_content') !== '0';
  });
  useEffect(() => {
    localStorage.setItem(
      'vm_matrix_thumb_prefer_content', thumbPreferContent ? '1' : '0',
    );
  }, [thumbPreferContent]);
  // Per-thumbnail blob URL + emptiness flag. The screenshot endpoint
  // returns `X-Thumb-Empty: 0|1` which a plain `<img src>` can't read,
  // so for thumb view we fetch via fetch() and feed the resulting blob
  // back into the <img>. Object URLs are tracked here so we can revoke
  // them when the tick advances or the component unmounts (otherwise
  // the browser holds the bytes forever).
  type ThumbBlob = { url: string; isBlank: boolean };
  const [thumbBlobs, setThumbBlobs] = useState<Record<string, ThumbBlob>>({});
  const thumbBlobsRef = useRef<Record<string, ThumbBlob>>({});
  thumbBlobsRef.current = thumbBlobs;
  useEffect(() => () => {
    // Final unmount cleanup — release every outstanding blob URL.
    Object.values(thumbBlobsRef.current).forEach(
      (b) => { try { URL.revokeObjectURL(b.url); } catch { /* ignore */ } },
    );
  }, []);

  // FLIP-based reorder animation for thumbnail cards. When the sort
  // order changes (e.g. preferContent toggled, group-by changed, a
  // blank thumb fills in with content and slides up), cards visibly
  // glide from their old position to the new one instead of snapping.
  //
  // Algorithm (FLIP):
  //   F: capture each card's previous position from the ref
  //   L: useLayoutEffect runs AFTER React commits new DOM — read new pos
  //   I: apply translate(prev - new) with no transition — looks unchanged
  //   P: rAF, remove translate with a transition — animates to new spot
  //
  // First-load gate: when entering thumb mode, blobs arrive piecemeal
  // and trigger many tiny reorderings — animating those would look
  // chaotic. flipReadyRef is held false until the initial fetch batch
  // settles, then released ~300ms later (enough for the last blob to
  // commit). After that, every subsequent reorder animates normally.
  const cardPosRef = useRef<Map<string, { left: number; top: number }>>(new Map());
  const flipReadyRef = useRef<boolean>(false);
  useEffect(() => {
    // Reset gate whenever we enter (or re-enter) thumb mode.
    if (viewMode === 'thumb') {
      flipReadyRef.current = false;
    }
  }, [viewMode]);
  useLayoutEffect(() => {
    if (viewMode !== 'thumb') {
      cardPosRef.current.clear();
      return;
    }
    // Use offsetTop/offsetLeft (cumulative through offsetParent chain)
    // for position. These are LAYOUT positions — they do NOT include
    // CSS transforms or scroll offsets. Critical for two reasons:
    //   1. Scroll-invariant — getBoundingClientRect changes as the user
    //      scrolls; offsetTop doesn't. (Without this, every WS broadcast
    //      after a scroll triggered phantom FLIPs.)
    //   2. Transform-invariant — while a FLIP transition is mid-flight
    //      a card's bounding rect reflects the animated visual position;
    //      another re-render at that moment would mis-detect a delta and
    //      kick off a NEW FLIP from the current visual position, causing
    //      visible jitter / repeated bounces. Layout offsets ignore the
    //      transform property so the comparison stays stable.
    const docPos = (el: HTMLElement) => {
      let x = 0, y = 0;
      let cur: HTMLElement | null = el;
      while (cur) {
        x += cur.offsetLeft;
        y += cur.offsetTop;
        cur = cur.offsetParent as HTMLElement | null;
      }
      return { left: x, top: y };
    };

    const cards = document.querySelectorAll<HTMLElement>('.vm-thumb-card[data-card-key]');
    const newPos = new Map<string, { left: number; top: number }>();
    cards.forEach((el) => {
      const k = el.dataset.cardKey;
      if (!k) return;
      newPos.set(k, docPos(el));
    });

    if (flipReadyRef.current) {
      cards.forEach((el) => {
        const k = el.dataset.cardKey;
        if (!k) return;
        const prev = cardPosRef.current.get(k);
        const next = newPos.get(k);
        if (!prev || !next) return;
        const dx = prev.left - next.left;
        const dy = prev.top  - next.top;
        // Sub-pixel jitter from layout/zoom — ignore movements under 1px.
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        // Step I: park the card at its old visual position with no transition.
        el.style.transition = 'none';
        el.style.transform  = `translate(${dx}px, ${dy}px)`;
        // Step P: next frame, remove transform with an ease-out so it glides home.
        requestAnimationFrame(() => {
          el.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)';
          el.style.transform  = '';
        });
      });
    }

    cardPosRef.current = newPos;
  });
  useEffect(() => { localStorage.setItem('vm_matrix_view_mode', viewMode); }, [viewMode]);
  useEffect(() => { localStorage.setItem('vm_matrix_thumb_size', String(thumbSize)); }, [thumbSize]);
  // ResizeObserver: keep every thumbnail's image area at exactly 16:9 of
  // its column width. CSS aspect-ratio refused to apply in this grid+flex
  // context across multiple attempts; explicit pixel height set after
  // layout is the bulletproof path.
  const thumbGridRef = useRef<HTMLDivElement>(null);
  const [sortField, setSortField] = useState<SortField>('vmid');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [sortAnimating, setSortAnimating] = useState(false);
  const [cardWidth, setCardWidth] = useState(() => {
    const saved = localStorage.getItem('matrix_card_width');
    return saved ? parseInt(saved, 10) : 85;
  });
  const [matrixSortBy, setMatrixSortBy] = useState<MatrixSortBy>(() => {
    const saved = localStorage.getItem('matrix_sort_by');
    return (saved as MatrixSortBy) || 'vmid';
  });
  const [groupByMode, setGroupByMode] = useState<GroupByMode>(() => {
    const saved = localStorage.getItem('matrix_group_by');
    return (saved as GroupByMode) || 'node';
  });
  const [groupSortBy, setGroupSortBy] = useState<'cluster' | 'node'>(() => {
    const saved = localStorage.getItem('matrix_group_sort_by');
    return (saved as 'cluster' | 'node') || 'node';
  });
  const [groupSortOrder, setGroupSortOrder] = useState<'asc' | 'desc'>(() => {
    const saved = localStorage.getItem('matrix_group_sort_order');
    return (saved as 'asc' | 'desc') || 'asc';
  });
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    vm: null,
    clusterId: '',
  });
  // Console capabilities of the right-clicked guest, populated by an
  // async config fetch when the context menu opens. null = still loading
  // (the default 主控台 stays visible regardless; alt-console items
  // appear once the config arrives).
  const [consoleCaps, setConsoleCaps] = useState<{
    novnc: boolean; xterm: boolean; spice: boolean;
  } | null>(null);
  // Per-(cluster|node|vmid|kind) cache so re-opening the menu on the
  // same guest doesn't re-fetch. 60s TTL — config rarely changes.
  const consoleCapsCacheRef = useRef<Map<string, { caps: any; ts: number }>>(new Map());
  const [migrationLines, setMigrationLines] = useState<{ x1: number; y1: number; x2: number; y2: number; vmid: number; clusterId: string }[]>([]);
  const [completingLines, setCompletingLines] = useState<{ x1: number; y1: number; x2: number; y2: number; vmid: number; progress: number }[]>([]);

  // Track completed migrations for animation - uses clusterId:vmid as key for uniqueness
  const [completingMigrations, setCompletingMigrations] = useState<Map<string, { targetNode: string; sourceNode: string; startTime: number; clusterId: string; vmid: number }>>(new Map());
  const prevMigratingVMIds = useRef<Set<string>>(new Set());

  // Delay showing VMs to trigger entry animation
  const [showVMs, setShowVMs] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    // Reset on mount or group change, then show VMs after a small delay to trigger animation
    setShowVMs(false);
    setAnimKey(prev => prev + 1);
    setIsInitialLoad(true);
    const timer = setTimeout(() => {
      setShowVMs(true);
    }, 100);
    // After entry animation completes, mark as not initial load
    const finishTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 8000); // Allow up to 8 seconds for entry animation
    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [groupByMode]);

  // FLIP animation refs for load sorting
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevPositions = useRef<Map<string, DOMRect>>(new Map());
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Heatmap view — rolling per-VM CPU history. Append on every metrics
  // tick; ring-buffer trimmed to HEATMAP_BUCKETS. Stored in a ref so we
  // can mutate without provoking renders, and a counter forces a single
  // re-render after each append so the cells repaint.
  const heatmapHistoryRef = useRef<Map<string, number[]>>(new Map());
  // Wall-clock of each REAL sample, so the header can state a time span
  // instead of a bucket count. Seeded buckets deliberately get no entry.
  const heatmapTimesRef = useRef<number[]>([]);
  const [heatmapTick, setHeatmapTick] = useState(0);

  // Create a stable key for detecting VM order changes (compute from source data)
  const vmOrderKey = useMemo(() => {
    if (matrixSortBy !== 'load') return '';
    const allVMs: { key: string; load: number }[] = [];

    const processCluster = (clusterData: ClusterData) => {
      Object.values(clusterData.vms).forEach(vm => {
        if (vm.template) return;
        if (filter === 'running' && vm.status !== 'running') return;
        if (filter === 'stopped' && vm.status !== 'stopped') return;
        const memPercent = vm.memory.total_bytes > 0 ? (vm.memory.used_bytes / vm.memory.total_bytes) * 100 : 0;
        const diskPercent = vm.disk.total_bytes > 0 ? (vm.disk.used_bytes / vm.disk.total_bytes) * 100 : 0;
        const maxLoad = Math.max(vm.cpu.usage_percent, memPercent, diskPercent);
        allVMs.push({ key: `${vm.node}/${vm.vmid}`, load: Math.round(maxLoad) });
      });
    };

    if (clusters) {
      Object.values(clusters).forEach(processCluster);
    } else if (cluster) {
      processCluster(cluster);
    }

    // Sort to get deterministic order
    allVMs.sort((a, b) => b.load - a.load);
    return allVMs.map(v => `${v.key}:${v.load}`).join('|');
  }, [cluster, clusters, matrixSortBy, filter]);

  // Capture positions BEFORE order changes
  useLayoutEffect(() => {
    if (matrixSortBy !== 'load' || isAnimating.current) return;

    // Store current positions
    const positions = new Map<string, DOMRect>();
    cellRefs.current.forEach((el, key) => {
      if (el) {
        positions.set(key, el.getBoundingClientRect());
      }
    });
    prevPositions.current = positions;
  }, [vmOrderKey, matrixSortBy]);

  // Apply FLIP animation after render when order changes
  useEffect(() => {
    if (matrixSortBy !== 'load') return;
    if (prevPositions.current.size === 0) return;

    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      const animations: Animation[] = [];

      cellRefs.current.forEach((el, key) => {
        if (!el) return;
        const prevRect = prevPositions.current.get(key);
        if (!prevRect) return;

        const currRect = el.getBoundingClientRect();
        const deltaX = prevRect.left - currRect.left;
        const deltaY = prevRect.top - currRect.top;

        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          isAnimating.current = true;

          // Use Web Animations API for smoother animation
          const animation = el.animate([
            { transform: `translate(${deltaX}px, ${deltaY}px)` },
            { transform: 'translate(0, 0)' }
          ], {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'none'
          });

          animations.push(animation);
        }
      });

      // Clear animating flag when all animations complete
      if (animations.length > 0) {
        Promise.all(animations.map(a => a.finished)).then(() => {
          isAnimating.current = false;
        }).catch(() => {
          isAnimating.current = false;
        });
      } else {
        isAnimating.current = false;
      }
    });
  }, [vmOrderKey, matrixSortBy]);

  // Load default filter from config on mount - always fetch from API to ensure sync
  const [filterInitialized, setFilterInitialized] = useState(false);
  useEffect(() => {
    if (filterInitialized) return;

    // Always fetch from API to get the latest setting
    api.getConfig().then(config => {
      const defaultFilter = config?.ui?.vm_matrix_default_filter as 'all' | 'running' | 'stopped';
      if (defaultFilter) {
        setFilter(defaultFilter);
        localStorage.setItem('vm_matrix_default_filter', defaultFilter);
      }
      setFilterInitialized(true);
    }).catch(() => {
      // Fallback to localStorage if API fails
      const savedFilter = localStorage.getItem('vm_matrix_default_filter') as 'all' | 'running' | 'stopped';
      if (savedFilter) {
        setFilter(savedFilter);
      }
      setFilterInitialized(true);
    });
  }, [filterInitialized]);

  // Listen for settings changes from localStorage
  useEffect(() => {
    const handleStorage = () => {
      const savedWidth = localStorage.getItem('matrix_card_width');
      if (savedWidth) setCardWidth(parseInt(savedWidth, 10));
      const savedSort = localStorage.getItem('matrix_sort_by') as MatrixSortBy;
      if (savedSort && savedSort !== matrixSortBy) {
        setMatrixSortBy(savedSort);
      }
      const savedGroupSort = localStorage.getItem('matrix_group_sort_by') as 'cluster' | 'node';
      if (savedGroupSort && savedGroupSort !== groupSortBy) {
        setGroupSortBy(savedGroupSort);
      }
      const savedGroupOrder = localStorage.getItem('matrix_group_sort_order') as 'asc' | 'desc';
      if (savedGroupOrder && savedGroupOrder !== groupSortOrder) {
        setGroupSortOrder(savedGroupOrder);
      }
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 1000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [matrixSortBy, groupSortBy, groupSortOrder]);

  // Get node health for PVE URL
  const getNodeHealth = useCallback((clusterId: string, node: string): NodeHealth | null => {
    if (cluster && cluster.client_health) {
      return cluster.client_health[node] || null;
    }
    if (clusters && clusters[clusterId]?.client_health) {
      return clusters[clusterId].client_health[node] || null;
    }
    return null;
  }, [cluster, clusters]);

  // Handle context menu open
  const handleContextMenu = useCallback((e: React.MouseEvent, vm: VMMetrics, clusterId: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Calculate position, keeping menu in viewport
    const x = Math.min(e.clientX, window.innerWidth - 250);
    const y = Math.min(e.clientY, window.innerHeight - 300);

    setContextMenu({
      visible: true,
      x,
      y,
      vm,
      clusterId,
    });

    // Kick off config fetch to determine which console options are
    // available for this specific guest. Cache by composite key for 60s.
    // Defaults while loading: VM → noVNC only; CT → xterm only.
    const isCT = vm.type === 'lxc';
    const kind = isCT ? 'lxc' : 'qemu';
    const cacheKey = `${clusterId}|${vm.node}|${vm.vmid}|${kind}`;
    const cached = consoleCapsCacheRef.current.get(cacheKey);
    const now = Date.now();
    if (cached && (now - cached.ts) < 60_000) {
      setConsoleCaps(cached.caps);
      return;
    }
    // Optimistic default while the fetch is in-flight.
    setConsoleCaps(isCT
      ? { novnc: false, xterm: true,  spice: false }
      : { novnc: true,  xterm: false, spice: false });
    (async () => {
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(vm.node)}/${kind}/${vm.vmid}/config`,
          { credentials: 'same-origin' },
        );
        if (!r.ok) return;
        const d = await r.json();
        const cfg: Record<string, any> = (d && d.config) || {};
        let caps: { novnc: boolean; xterm: boolean; spice: boolean };
        if (isCT) {
          // CT: xterm is the default, always available unless console=0.
          // noVNC also works on LXC via /vncproxy unless console disabled.
          const consoleEnabled = cfg.console === undefined
            || String(cfg.console) === '1'
            || cfg.console === 1;
          caps = {
            xterm: consoleEnabled,
            novnc: consoleEnabled,
            spice: false,
          };
        } else {
          // VM: noVNC always. Serial xterm only if a serialN slot exists.
          // SPICE only if vga is qxl-family (PVE convention).
          const hasSerial = Object.keys(cfg).some((k) => /^serial[0-9]+$/.test(k));
          const vga = String(cfg.vga || '').toLowerCase();
          const hasSpiceVga = /qxl/.test(vga) || vga === 'virtio-vga';
          caps = {
            novnc: true,
            xterm: hasSerial,
            spice: hasSpiceVga,
          };
        }
        consoleCapsCacheRef.current.set(cacheKey, { caps, ts: now });
        // Only apply if the menu still points at the same guest — by
        // the time the fetch returns the user may have closed or
        // right-clicked a different cell.
        setContextMenu((prev) =>
          prev.vm?.vmid === vm.vmid && prev.clusterId === clusterId
            ? prev
            : prev,
        );
        setConsoleCaps(caps);
      } catch {
        // network / 403 — keep optimistic default
      }
    })();
  }, []);

  // Close context menu
  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  }, []);

  // Determine if we're in "all clusters" mode
  const isAllClusters = !cluster && clusters && Object.keys(clusters).length > 0;

  // Find all migrating VMs with their target nodes
    // Migrations we have seen but which are momentarily absent from the task
  // snapshot. Keyed cluster:vmid, carrying the last-seen timestamp.
  // One pending expiry per migration key. Without this the effect -- whose
  // deps include completingMigrations itself -- could schedule several timers
  // for the same key, and a timer left over from an EARLIER migration of the
  // same guest would delete the entry belonging to the CURRENT one, cutting
  // the overlay short. That reads as the migration failing, which is the exact
  // complaint the sticky-overlay work was meant to end.
  const completionTimersRef = useRef<Map<string, number>>(new Map());
  useEffect(() => () => {
    completionTimersRef.current.forEach((id) => window.clearTimeout(id));
    completionTimersRef.current.clear();
  }, []);
  const stickyMigrationsRef = useRef<Map<string, any>>(new Map());
const migratingVMs = useMemo(() => {
    const migrations: { vm: VMMetrics; task: VMTask; targetNode: string; clusterId: string; clusterLabel: string; isHA: boolean }[] = [];

    const findMigrations = (clusterData: ClusterData, clusterId: string, clusterLabel: string) => {
      if (!clusterData.tasks) return;

      const taskList = Object.values(clusterData.tasks);

      taskList.forEach(task => {
        const taskType = task.task_type?.toLowerCase() || '';
        const isMigrate = taskType.includes('migrate');
        const isRunning = task.status === 'running';
        const hasTarget = !!task.target_node;

        // Skip HA migration tasks (hamigrate, hamigrateall, etc.)
        // Only show animation for actual VM/CT migrations (qmigrate, vzmigrate)
        const isHATask = taskType.startsWith('ha');
        const isVMorCTMigrate = taskType.startsWith('qm') || taskType.startsWith('vz');

        // Draw the line for ANY running migration with a known target — including
        // HA-managed ones (hamigrate). An HA migration is still a real source→
        // target move; skipping it meant HA-managed guests never drew a line
        // (only the cell badge). We dedupe by vmid below so a hamigrate plus its
        // qmigrate subtask don't draw two overlapping lines.
        if (isRunning && isMigrate && hasTarget) {
          // Find the guest by vmid. For a plain qmigrate, task.node IS the source
          // node, so we also require vm.node === task.node (this cleanly drops the
          // entry once the guest has moved). For an HA (hamigrate) task, task.node
          // is the CRM/manager node — NOT the source — so we must NOT require the
          // node match; the guest's real source is simply its current node in the
          // VM list (it hasn't moved yet mid-migration).
          const vmKey = Object.keys(clusterData.vms).find(k => {
            const vm = clusterData.vms[k];
            return vm.vmid === task.vmid && (isHATask || vm.node === task.node);
          });
          if (vmKey) {
            migrations.push({
              vm: clusterData.vms[vmKey],
              task,
              targetNode: task.target_node || '',
              clusterId,
              clusterLabel,
              isHA: isHATask,
            });
          }
        }
      });
    };

    if (isAllClusters && clusters) {
      Object.entries(clusters).forEach(([id, c]) => {
        findMigrations(c, id, c.name || id);
      });
    } else if (cluster) {
      findMigrations(cluster, cluster.id, cluster.name || cluster.id);
    }

    // Dedupe by cluster+vmid: if a guest surfaces both a hamigrate and a plain
    // qmigrate task, keep the non-HA one (its node/target are the concrete move).
    const byVm = new Map<string, typeof migrations[number]>();
    for (const m of migrations) {
      const key = `${m.clusterId}:${m.vm.vmid}`;
      const existing = byVm.get(key);
      if (!existing || (existing.isHA && !m.isHA)) byVm.set(key, m);
    }

    // Hysteresis. An HA migration is TWO tasks — `hamigrate` on the CRM node and
    // the `qmigrate` that does the work — and between them there is a window
    // where neither is 'running' in the snapshot we hold. `/cluster/tasks` also
    // returns a fixed recent window we do not control. The overlay was derived
    // straight from that list, so it blinked out and back mid-migration: line
    // and badges vanish, reappear seconds later, vanish again. It reads as the
    // migration failing and restarting.
    //
    // So once a move is seen, keep drawing it until there is a REASON to stop:
    // the guest has arrived on the target, or the grace period has run out.
    // Missing from one poll is not a reason.
    const now = Date.now();
    for (const [key, m] of byVm) {
      stickyMigrationsRef.current.set(key, { ...m, lastSeen: now });
    }
    stickyMigrationsRef.current.forEach((m, key) => {
      if (byVm.has(key)) return;
      const source: ClusterData | null | undefined = isAllClusters
        ? clusters?.[m.clusterId]
        : (cluster?.id === m.clusterId ? cluster : undefined);
      const arrived = source ? Object.values(source.vms || {}).some(
        (v: any) => v.vmid === m.vm.vmid && v.node === m.targetNode) : false;
      if (arrived || now - m.lastSeen > MIGRATION_GRACE_MS) {
        stickyMigrationsRef.current.delete(key);
        return;
      }
      byVm.set(key, m);          // still in flight as far as we can tell
    });

    return Array.from(byVm.values());
  }, [cluster, clusters, isAllClusters]);

  // Detect completed migrations and trigger completion animation +
  // post-migration health check (Plan B). When a migration we were tracking
  // disappears from the running-tasks list we poll its final task status
  // and, if exitstatus is not 'OK', push a failure toast with a copyable
  // unlock command.
  useEffect(() => {
    const currentMigratingIds = new Set(migratingVMs.map(m => `${m.clusterId}:${m.vm.vmid}`));
    const prevIds = prevMigratingVMIds.current;
    const prevInfo = prevMigrationsInfo.current;

    prevIds.forEach((key) => {
      if (!currentMigratingIds.has(key) && !completingMigrations.has(key)) {
        // Migration disappeared from running-tasks list — could be success
        // or failure. Look up its final state via the cluster's task status.
        const meta = prevInfo.get(key);
        if (meta && meta.upid) {
          (async () => {
            try {
              const status = await api.taskStatus(meta.clusterId, meta.node, meta.upid) as Record<string, unknown>;
              const exit = (status?.exitstatus as string) || '';
              const stillRunning = (status?.status as string) === 'running';
              if (stillRunning) return;          // re-poll on next tick
              if (exit && exit !== 'OK') {
                // Pull the lock kind from the source VM if still visible. Use the
                // guest's real source node (meta.sourceNode) — for HA migrations
                // meta.node is the CRM node and would miss the VM (and mislabel
                // the source); meta.node stays correct for the taskStatus poll.
                const failVm = cluster?.vms?.[`${meta.sourceNode}/${meta.vmid}`]
                  || (clusters?.[meta.clusterId]?.vms?.[`${meta.sourceNode}/${meta.vmid}`]);
                const lock = (failVm && (failVm as VMMetrics & { lock?: string }).lock) || 'migrate';
                setMigrationFailures((cur) => {
                  if (cur.some((f) => f.id === key)) return cur;
                  return [...cur, {
                    id: key,
                    vmid: meta.vmid, sourceNode: meta.sourceNode,
                    targetNode: meta.targetNode, clusterLabel: meta.clusterLabel,
                    lock, copied: false,
                  }];
                });
              }
            } catch {
              // Best-effort — if status query fails we silently skip.
            }
          })();
        }
        prevInfo.delete(key);
      }
    });

    // Snapshot info for any new (or still-running) migration so we can
    // look it up after it ends.
    migratingVMs.forEach(({ vm, task, clusterId, clusterLabel, targetNode }) => {
      const key = `${clusterId}:${vm.vmid}`;
      prevInfo.set(key, {
        upid: task.upid, node: task.node, sourceNode: vm.node, vmid: vm.vmid,
        clusterId, clusterLabel, targetNode,
      });
    });

    prevMigratingVMIds.current = currentMigratingIds;
  }, [migratingVMs, completingMigrations, cluster, clusters]);

  // Store migration info for completion animation - uses clusterId:vmid as key
  const migratingVMsInfoRef = useRef<Map<string, { targetNode: string; sourceNode: string; clusterId: string; vmid: number }>>(new Map());
  useEffect(() => {
    migratingVMs.forEach(({ vm, targetNode, clusterId }) => {
      const key = `${clusterId}:${vm.vmid}`;
      migratingVMsInfoRef.current.set(key, { targetNode, sourceNode: vm.node, clusterId, vmid: vm.vmid });
    });
  }, [migratingVMs]);

  // Store last known line positions for completion animation - uses clusterId:vmid as key
  const lastLinePositionsRef = useRef<Map<string, { x1: number; y1: number; x2: number; y2: number }>>(new Map());
  useEffect(() => {
    migrationLines.forEach(line => {
      const key = `${line.clusterId}:${line.vmid}`;
      lastLinePositionsRef.current.set(key, { x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2 });
    });
  }, [migrationLines]);

  // Detect when migration completes and trigger completion animation
  useEffect(() => {
    // Use clusterId:vmid as unique key
    const currentMigratingKeys = new Set(migratingVMs.map(m => `${m.clusterId}:${m.vm.vmid}`));

    // Check for completed migrations
    migratingVMsInfoRef.current.forEach((info, key) => {
      if (!currentMigratingKeys.has(key) && !completingMigrations.has(key)) {
        // Migration just completed - add to completing state
        // Get last line position for animation
        const lastLine = lastLinePositionsRef.current.get(key);
        if (lastLine) {
          // Start completion animation
          const startTime = Date.now();
          const animationDuration = 800; // ms

          const animateCompletion = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Animate line collapsing towards target
            const currentX1 = lastLine.x1 + (lastLine.x2 - lastLine.x1) * progress;
            const currentY1 = lastLine.y1 + (lastLine.y2 - lastLine.y1) * progress;

            setCompletingLines([{
              x1: currentX1,
              y1: currentY1,
              x2: lastLine.x2,
              y2: lastLine.y2,
              vmid: info.vmid,
              progress,
            }]);

            if (progress < 1) {
              requestAnimationFrame(animateCompletion);
            } else {
              // Animation complete
              setCompletingLines([]);
            }
          };

          requestAnimationFrame(animateCompletion);
        }

        setCompletingMigrations(prev => {
          const next = new Map(prev);
          next.set(key, { ...info, startTime: Date.now() });
          return next;
        });

        // Remove from info ref
        migratingVMsInfoRef.current.delete(key);
        lastLinePositionsRef.current.delete(key);

        // Auto-remove after longer timeout (10s) as fallback.
        // The smart cleanup below will remove it sooner if server data
        // confirms the move. Replace any timer already pending for this key so
        // a stale one cannot expire the entry a newer migration just created.
        window.clearTimeout(completionTimersRef.current.get(key));
        completionTimersRef.current.set(key, window.setTimeout(() => {
          completionTimersRef.current.delete(key);
          setCompletingMigrations(prev => {
            const next = new Map(prev);
            next.delete(key);
            return next;
          });
        }, 10000));
      }
    });
  }, [migratingVMs, completingMigrations]);

  // Smart cleanup: remove from completingMigrations when server data confirms VM has moved
  useEffect(() => {
    if (completingMigrations.size === 0) return;

    const findVMNode = (vmid: number, clusterId: string): string | null => {
      const searchCluster = (c: ClusterData): string | null => {
        for (const vm of Object.values(c.vms)) {
          if (vm.vmid === vmid) return vm.node;
        }
        return null;
      };

      // Search only in the specific cluster
      if (clusters && clusterId) {
        const targetCluster = clusters[clusterId];
        if (targetCluster) {
          return searchCluster(targetCluster);
        }
      } else if (cluster) {
        return searchCluster(cluster);
      }
      return null;
    };

    completingMigrations.forEach((info, key) => {
      const currentNode = findVMNode(info.vmid, info.clusterId);
      // If VM is now on the target node (not source), safe to remove from completing
      if (currentNode && currentNode === info.targetNode && currentNode !== info.sourceNode) {
        setCompletingMigrations(prev => {
          const next = new Map(prev);
          next.delete(key);
          return next;
        });
      }
    });
  }, [cluster, clusters, completingMigrations]);

  // Helper to get group key based on groupByMode
  const getGroupKey = useCallback((vm: VMMetrics, clusterLabel: string): string => {
    const clusterPrefix = isAllClusters ? `${clusterLabel} / ` : '';

    switch (groupByMode) {
      case 'none':
        return isAllClusters ? clusterLabel : 'all';
      case 'type':
        return `${clusterPrefix}${vm.type === 'qemu' ? 'VM' : 'CT'}`;
      case 'tag':
        const vmTags = normaliseTags(vm.tags);
        if (vmTags.length > 0) {
          return `${clusterPrefix}${vmTags[0]}`;
        }
        return `${clusterPrefix}(no tag)`;
      case 'node':
      default:
        return `${clusterPrefix}${vm.node}`;
    }
  }, [groupByMode, isAllClusters]);

  // Group VMs by cluster/node (include clusterId for context menu)
  const vmsByGroup = useMemo(() => {
    const grouped: Record<string, { vms: VMMetrics[]; clusterId: string }> = {};

    const processCluster = (clusterData: ClusterData, clusterLabel: string, clusterId: string) => {
      Object.entries(clusterData.vms).forEach(([key, vm]) => {
        // Apply filters
        if (filter === 'running' && vm.status !== 'running') return;
        if (filter === 'stopped' && vm.status !== 'stopped') return;
        if (searchTerm && !vm.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !String(vm.vmid).includes(searchTerm)) return;
        if (vm.template) return; // Skip templates

        const groupKey = getGroupKey(vm, clusterLabel);
        if (!grouped[groupKey]) {
          grouped[groupKey] = { vms: [], clusterId };
        }
        grouped[groupKey].vms.push(vm);
      });
    };

    if (isAllClusters) {
      Object.entries(clusters!).forEach(([id, clusterData]) => {
        const clusterLabel = clusterData.name || id;
        processCluster(clusterData, clusterLabel, id);
      });
    } else if (cluster) {
      processCluster(cluster, '', cluster.id);
    }

    // Sort VMs within each group based on matrixSortBy setting
    Object.values(grouped).forEach((group) => {
      group.vms.sort((a, b) => {
        switch (matrixSortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'load': {
            // Sort by health color priority: danger (red) > warning (orange) > success (green) > stopped
            const aMemPercent = a.memory.total_bytes > 0 ? (a.memory.used_bytes / a.memory.total_bytes) * 100 : 0;
            const bMemPercent = b.memory.total_bytes > 0 ? (b.memory.used_bytes / b.memory.total_bytes) * 100 : 0;
            const aDiskPercent = a.disk.total_bytes > 0 ? (a.disk.used_bytes / a.disk.total_bytes) * 100 : 0;
            const bDiskPercent = b.disk.total_bytes > 0 ? (b.disk.used_bytes / b.disk.total_bytes) * 100 : 0;
            const aLoad = Math.max(a.cpu.usage_percent, aMemPercent, aDiskPercent);
            const bLoad = Math.max(b.cpu.usage_percent, bMemPercent, bDiskPercent);

            // Stopped VMs go to bottom
            if (a.status !== 'running' && b.status === 'running') return 1;
            if (a.status === 'running' && b.status !== 'running') return -1;
            if (a.status !== 'running' && b.status !== 'running') return a.vmid - b.vmid;

            // Get health priority: danger=0 (highest), warning=1, success=2
            const getHealthPriority = (load: number) => {
              if (load >= 95) return 0; // danger (red)
              if (load >= 80) return 1; // warning (orange)
              return 2; // success (green)
            };

            const aPriority = getHealthPriority(aLoad);
            const bPriority = getHealthPriority(bLoad);

            // First sort by health priority (red first, then orange, then green)
            if (aPriority !== bPriority) return aPriority - bPriority;

            // Within same health level, sort by load (highest first)
            return bLoad - aLoad;
          }
          case 'vmid':
          default:
            return a.vmid - b.vmid;
        }
      });
    });

    return grouped;
  }, [cluster, clusters, isAllClusters, filter, searchTerm, matrixSortBy, getGroupKey]);

  // Flat list for the thumbnail view. Same filter + same matrixSortBy
  // sort as vmsByGroup so the toolbar's 排序 controls (ID / 名稱 / 負載)
  // affect both views consistently.
  const thumbVms = useMemo(() => {
    const list: (VMMetrics & { clusterId: string })[] = [];
    const collect = (clusterData: ClusterData, clusterId: string) => {
      Object.values(clusterData.vms).forEach((vm) => {
        if (vm.template) return;
        // Thumb view shows running guests of either type. LXC's vncproxy
        // returns a text-console framebuffer (login prompt, dmesg, etc.)
        // which is still useful for at-a-glance "is this CT alive?".
        // Stopped guests have nothing to preview — earlier feedback:
        // "沒開機的 vm/ct 就不要顯示縮圖了".
        if (vm.status !== 'running') return;
        if (filter === 'stopped') return;
        if (thumbTypeFilter === 'qemu' && vm.type !== 'qemu') return;
        if (thumbTypeFilter === 'lxc' && vm.type !== 'lxc') return;
        if (searchTerm
            && !vm.name.toLowerCase().includes(searchTerm.toLowerCase())
            && !String(vm.vmid).includes(searchTerm)) return;
        list.push({ ...vm, clusterId });
      });
    };
    if (isAllClusters && clusters) {
      Object.entries(clusters).forEach(([id, c]) => collect(c, id));
    } else if (cluster) {
      collect(cluster, cluster.id);
    }
    list.sort((a, b) => {
      switch (matrixSortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'load': {
          const aMem = a.memory.total_bytes > 0
            ? (a.memory.used_bytes / a.memory.total_bytes) * 100 : 0;
          const bMem = b.memory.total_bytes > 0
            ? (b.memory.used_bytes / b.memory.total_bytes) * 100 : 0;
          const aDisk = a.disk.total_bytes > 0
            ? (a.disk.used_bytes / a.disk.total_bytes) * 100 : 0;
          const bDisk = b.disk.total_bytes > 0
            ? (b.disk.used_bytes / b.disk.total_bytes) * 100 : 0;
          const aLoad = Math.max(a.cpu.usage_percent, aMem, aDisk);
          const bLoad = Math.max(b.cpu.usage_percent, bMem, bDisk);
          const aPriority = aLoad >= 95 ? 0 : aLoad >= 80 ? 1 : 2;
          const bPriority = bLoad >= 95 ? 0 : bLoad >= 80 ? 1 : 2;
          if (aPriority !== bPriority) return aPriority - bPriority;
          return bLoad - aLoad;
        }
        case 'vmid':
        default:
          return a.vmid - b.vmid;
      }
    });
    return list;
  }, [cluster, clusters, isAllClusters, filter, searchTerm, matrixSortBy, thumbTypeFilter]);

  // Group thumbVms by the toolbar's group-by setting so the thumbnail
  // view honours 分組 like the grid view does. When groupByMode==='none',
  // a single bucket holds everything (rendered without a group header).
  const thumbGroups = useMemo(() => {
    const groups = new Map<string, (VMMetrics & { clusterId: string })[]>();
    const clusterLabelOf = (cid: string): string => {
      if (clusters && clusters[cid]) return clusters[cid].name || cid;
      if (cluster && cluster.id === cid) return cluster.name || cid;
      return cid;
    };
    thumbVms.forEach((vm) => {
      const label = clusterLabelOf(vm.clusterId);
      const k = getGroupKey(vm, label);
      const arr = groups.get(k) || [];
      arr.push(vm);
      groups.set(k, arr);
    });
    // Sort group names for stable display. Reuse the group-sort settings
    // the user already chose for grid view (cluster vs node, asc/desc).
    return Array.from(groups.entries()).sort(([a], [b]) => {
      const cmp = a.localeCompare(b);
      return groupSortOrder === 'desc' ? -cmp : cmp;
    });
  }, [thumbVms, getGroupKey, clusters, cluster, groupSortOrder]);

  // Fetch thumbnail PNGs via fetch() so we can read X-Thumb-Empty header
  // (plain <img src> hides response headers). Result fed back into the
  // <img> as a blob URL. Refetched when the tick advances (~30s) or the
  // visible VM list changes. Always requests max=640 so the same blob
  // can serve any slider size — server cache is keyed on max, so this
  // also stops the slider from triggering a refetch storm.
  useEffect(() => {
    if (viewMode !== 'thumb') return;
    let cancelled = false;
    const FETCH_MAX = 640;

    // On REFRESH (gate already open) we collect all blobs into a buffer
    // and commit them in a single setState at the end — that way every
    // card whose order changes animates on the same frame, instead of
    // each blob arrival re-rendering and triggering its own FLIP wave.
    // On FIRST LOAD (gate closed) we publish incrementally so cards
    // appear as they arrive (FLIP is suppressed at the time anyway).
    const isRefresh = flipReadyRef.current;
    const buffer: Record<string, ThumbBlob> = {};

    const fetchOne = async (vm: (typeof thumbVms)[number]) => {
      const cidForVm = vm.clusterId || cluster?.id || '';
      const key = `${cidForVm}/${vm.node}/${vm.vmid}`;
      const url = `/api/console/screenshot/${encodeURIComponent(cidForVm)}`
        + `/${encodeURIComponent(vm.node)}/${vm.vmid}`
        + `?max=${FETCH_MAX}&t=${thumbTick}`;
      try {
        const res = await fetch(url, { credentials: 'same-origin' });
        if (!res.ok || cancelled) return;
        const blob = await res.blob();
        if (cancelled) return;
        const objectUrl = URL.createObjectURL(blob);
        const isBlank = res.headers.get('X-Thumb-Empty') === '1';
        if (isRefresh) {
          // Defer until Promise.all resolves — single batched commit.
          buffer[key] = { url: objectUrl, isBlank };
        } else {
          // First load: publish each blob as it arrives.
          setThumbBlobs((prev) => {
            const prior = prev[key];
            if (prior) { try { URL.revokeObjectURL(prior.url); } catch { /* */ } }
            return { ...prev, [key]: { url: objectUrl, isBlank } };
          });
        }
      } catch { /* network/abort — ignored, will retry on next tick */ }
    };
    // Concurrency-limited fan-out. Without this we fire one fetch per
    // visible guest at the same time — with 60+ thumbnails Chrome runs
    // out of socket-pool slots (ERR_INSUFFICIENT_RESOURCES) and silently
    // rejects the overflow, leaving cards stuck on the loader. 6 matches
    // Chrome's per-origin concurrent-connection limit; the server's PVE
    // throttle (4 concurrent + 50ms gap per host) downstream is fine
    // with this rate.
    const POOL_LIMIT = 6;
    const pool = async (items: typeof thumbVms) => {
      const inFlight = new Set<Promise<void>>();
      for (const it of items) {
        const p = fetchOne(it).finally(() => { inFlight.delete(p); });
        inFlight.add(p);
        if (inFlight.size >= POOL_LIMIT) {
          await Promise.race(inFlight);
        }
      }
      await Promise.all(inFlight);
    };
    pool(thumbVms).finally(() => {
      if (cancelled) {
        // Discard any buffered blobs we never committed.
        Object.values(buffer).forEach(
          (b) => { try { URL.revokeObjectURL(b.url); } catch { /* */ } },
        );
        return;
      }
      const liveKeys = new Set(thumbVms.map(
        (v) => `${v.clusterId || cluster?.id || ''}/${v.node}/${v.vmid}`,
      ));
      setThumbBlobs((prev) => {
        let changed = false;
        const out: Record<string, ThumbBlob> = {};
        // Carry forward live keys, dropping (and revoking) the rest.
        Object.entries(prev).forEach(([k, v]) => {
          if (liveKeys.has(k)) {
            out[k] = v;
          } else {
            try { URL.revokeObjectURL(v.url); } catch { /* */ }
            changed = true;
          }
        });
        // Apply the buffered refresh atomically — every card transitions
        // on the same React commit, so FLIP animates them together.
        if (isRefresh) {
          Object.entries(buffer).forEach(([k, v]) => {
            const prior = out[k];
            if (prior) { try { URL.revokeObjectURL(prior.url); } catch { /* */ } }
            out[k] = v;
            changed = true;
          });
        }
        return changed ? out : prev;
      });
      // First-load gate: open FLIP animation only after the initial
      // batch of blobs has finished arriving. The 300ms delay lets the
      // last setState flush + paint before we start animating, so the
      // very first stable layout doesn't trigger a wave of motion.
      if (!flipReadyRef.current) {
        setTimeout(() => {
          if (!cancelled) flipReadyRef.current = true;
        }, 300);
      }
    });
    return () => { cancelled = true; };
    // Intentionally exclude `thumbBlobs` from deps — we mutate it inside.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, thumbVms, thumbTick, cluster?.id]);

  // Ghost cells data: create ghost VM entries for migration targets.
  //
  // Cross-cluster nuance: when target_node is itself a separately managed cluster
  // (e.g. host-107 imported as its own cluster while host-108 lives in cluster1),
  // attribute the ghost to the target's own cluster group — so we don't end up
  // with both "cluster1 / host-107" (wrong, host-107 isn't a cluster1 node) and
  // "host-107 / host-107" (the real owner).
  const ghostCells = useMemo(() => {
    const ghosts: {
      vm: VMMetrics;
      targetGroupKey: string;
      sourceGroupKey: string;
      clusterId: string;
      targetClusterId: string;
    }[] = [];

    // Build node-name → owning-managed-cluster lookup.
    const nodeOwner = new Map<string, { id: string; label: string }>();
    if (isAllClusters && clusters) {
      Object.entries(clusters).forEach(([id, c]) => {
        const label = c.name || id;
        Object.values(c.nodes || {}).forEach((n) => {
          if (n && n.node) nodeOwner.set(n.node, { id, label });
        });
      });
    }

    migratingVMs.forEach(({ vm, targetNode, clusterId, clusterLabel }) => {
      const owner = nodeOwner.get(targetNode);
      // Only redirect when the target node belongs to a *different* managed cluster.
      const targetCluster =
        owner && owner.id !== clusterId
          ? owner
          : { id: clusterId, label: clusterLabel };
      const targetGroupKey = isAllClusters
        ? `${targetCluster.label} / ${targetNode}`
        : targetNode;
      const sourceGroupKey = isAllClusters
        ? `${clusterLabel} / ${vm.node}`
        : vm.node;
      ghosts.push({
        vm,
        targetGroupKey,
        sourceGroupKey,
        clusterId,
        targetClusterId: targetCluster.id,
      });
    });

    return ghosts;
  }, [migratingVMs, isAllClusters, clusters]);

  // Update migration lines based on cell positions
  useEffect(() => {
    if (viewMode !== 'grid' || ghostCells.length === 0) {
      setMigrationLines([]);
      return;
    }

    const updateLines = () => {
      const container = gridContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      // Account for scroll offset - SVG is positioned at container's top-left,
      // but getBoundingClientRect returns viewport-relative positions
      const scrollLeft = container.scrollLeft;
      const scrollTop = container.scrollTop;
      const lines: { x1: number; y1: number; x2: number; y2: number; vmid: number; clusterId: string }[] = [];

      ghostCells.forEach(({ vm }) => {
        // Include cluster_id in keys to handle multiple clusters with same vmid
        const sourceKey = `${vm.cluster_id}/${vm.node}/${vm.vmid}`;
        const ghostKey = `ghost-${vm.cluster_id}-${vm.vmid}`;

        const sourceEl = cellRefs.current.get(sourceKey);
        const ghostEl = cellRefs.current.get(ghostKey);

        if (sourceEl && ghostEl) {
          const sourceRect = sourceEl.getBoundingClientRect();
          const ghostRect = ghostEl.getBoundingClientRect();

          lines.push({
            x1: sourceRect.left + sourceRect.width / 2 - containerRect.left + scrollLeft,
            y1: sourceRect.top + sourceRect.height / 2 - containerRect.top + scrollTop,
            x2: ghostRect.left + ghostRect.width / 2 - containerRect.left + scrollLeft,
            y2: ghostRect.top + ghostRect.height / 2 - containerRect.top + scrollTop,
            vmid: vm.vmid,
            clusterId: vm.cluster_id,
          });
        }
      });

      setMigrationLines(lines);
    };

    // Update after render
    const timer = setTimeout(updateLines, 100);
    const interval = setInterval(updateLines, 500); // Keep updating for animation sync

    // Update on scroll
    const container = gridContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateLines);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      if (container) {
        container.removeEventListener('scroll', updateLines);
      }
    };
  }, [ghostCells, viewMode]);

  // Flat list of all VMs for table view with sorting
  const sortedVMs = useMemo(() => {
    const allVMs: (VMMetrics & { clusterName: string; clusterId: string })[] = [];

    const processCluster = (clusterData: ClusterData, clusterLabel: string, clusterId: string) => {
      Object.values(clusterData.vms).forEach((vm) => {
        // Apply filters
        if (filter === 'running' && vm.status !== 'running') return;
        if (filter === 'stopped' && vm.status !== 'stopped') return;
        if (searchTerm && !vm.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !String(vm.vmid).includes(searchTerm)) return;
        if (vm.template) return;

        allVMs.push({ ...vm, clusterName: clusterLabel, clusterId });
      });
    };

    if (isAllClusters) {
      Object.entries(clusters!).forEach(([id, clusterData]) => {
        const clusterLabel = clusterData.name || id;
        processCluster(clusterData, clusterLabel, id);
      });
    } else if (cluster) {
      processCluster(cluster, cluster.name || 'Cluster', cluster.id);
    }

    // Sort
    allVMs.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'vmid':
          cmp = a.vmid - b.vmid;
          break;
        case 'type':
          cmp = a.type.localeCompare(b.type);
          break;
        case 'node':
          cmp = a.node.localeCompare(b.node);
          break;
        case 'status':
          cmp = a.status.localeCompare(b.status);
          break;
        case 'cpu':
          cmp = a.cpu.usage_percent - b.cpu.usage_percent;
          break;
        case 'memory':
          cmp = (a.memory.used_bytes / a.memory.total_bytes) - (b.memory.used_bytes / b.memory.total_bytes);
          break;
        case 'uptime':
          cmp = a.uptime - b.uptime;
          break;
        case 'rx':
          cmp = (a.network?.rx_bytes_sec || 0) - (b.network?.rx_bytes_sec || 0);
          break;
        case 'tx':
          cmp = (a.network?.tx_bytes_sec || 0) - (b.network?.tx_bytes_sec || 0);
          break;
        case 'task': {
          const taskA = findVMTask(a.vmid, a.node, a.cluster_id, cluster, clusters);
          const taskB = findVMTask(b.vmid, b.node, b.cluster_id, cluster, clusters);
          // VMs with tasks come first, then sort by task type
          if (taskA && !taskB) cmp = -1;
          else if (!taskA && taskB) cmp = 1;
          else if (taskA && taskB) cmp = taskA.task_type.localeCompare(taskB.task_type);
          else cmp = 0;
          break;
        }
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return allVMs;
  }, [cluster, clusters, isAllClusters, filter, searchTerm, sortField, sortDirection]);

  // Heatmap history maintenance — append the current CPU% per VM into
  // its ring buffer on every metrics tick, then bump heatmapTick so the
  // heatmap repaints. Skipped entirely outside the heatmap view.
  //
  // First-time seed: on a fresh buffer we pre-fill ALL buckets with the
  // current reading so the heatmap looks "warm" the instant you land on
  // the view, instead of taking 30 polling cycles (~2-3 min) to fully
  // light up. Subsequent ticks shift the buffer normally so genuine
  // history takes over within one cycle's worth of data.
  useEffect(() => {
    if (viewMode !== 'heatmap') { heatmapTimesRef.current = []; return; }
    const HEATMAP_BUCKETS = 30;

    const seen = new Set<string>();
    for (const vm of sortedVMs) {
      const key = `${vm.cluster_id}|${vm.node}|${vm.vmid}`;
      seen.add(key);
      const buf = heatmapHistoryRef.current.get(key) || [];
      const cpu = typeof vm.cpu?.usage_percent === 'number' ? vm.cpu.usage_percent : 0;
      if (buf.length === 0) {
        for (let i = 0; i < HEATMAP_BUCKETS; i++) buf.push(cpu);
      } else {
        buf.push(cpu);
        if (buf.length > HEATMAP_BUCKETS) buf.shift();
      }
      heatmapHistoryRef.current.set(key, buf);
    }
    // Stamp this tick. The seed pass copies one reading into all 30 buckets so
    // the view is not blank on arrival -- but that is NOT a minute of history,
    // and the header must not claim it is. Only ticks recorded here count.
    {
      const ts = heatmapTimesRef.current;
      ts.push(Date.now());
      if (ts.length > HEATMAP_BUCKETS) ts.shift();
    }

    // Drop history for VMs that disappeared (deleted / migrated away).
    for (const key of Array.from(heatmapHistoryRef.current.keys())) {
      if (!seen.has(key)) heatmapHistoryRef.current.delete(key);
    }
    setHeatmapTick((t) => t + 1);
  }, [sortedVMs, viewMode]);

  // ── Thumb auto-fit ────────────────────────────────────────────────
  // The slider value is a TARGET width, not an exact one: we measure the
  // grid, pick the column count whose card width lands CLOSEST to the
  // target (round, not floor), and stretch cards to fill the row exactly.
  // Leftover space near a full card → cards shrink to fit one more;
  // small leftover → cards grow to swallow it. Live-updates on both
  // slider drags and container resizes.
  const [thumbGridW, setThumbGridW] = useState(0);
  useEffect(() => {
    if (viewMode !== 'thumb') return;
    const el = thumbGridRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || 0;
      if (w > 0) setThumbGridW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewMode]);

  const THUMB_GAP = 14;  // must match .thumb-group-cards gap
  const thumbCardW = useMemo(() => {
    if (!thumbGridW) return thumbSize;
    const cols = Math.max(1, Math.round((thumbGridW + THUMB_GAP) / (thumbSize + THUMB_GAP)));
    return Math.floor((thumbGridW - THUMB_GAP * (cols - 1)) / cols);
  }, [thumbGridW, thumbSize]);

  const thumbImgHeight = Math.round(thumbCardW * 9 / 16);

  // Handle sort column click
  const handleSort = (field: SortField) => {
    // Trigger sort animation
    setSortAnimating(true);
    setTimeout(() => setSortAnimating(false), 300);

    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Find selected VM across all clusters
  const selectedVM = useMemo(() => {
    if (!selectedVMKey) return null;
    if (cluster) return cluster.vms[selectedVMKey] || null;
    if (clusters) {
      for (const c of Object.values(clusters)) {
        if (c.vms[selectedVMKey]) return c.vms[selectedVMKey];
      }
    }
    return null;
  }, [selectedVMKey, cluster, clusters]);

  // CRITICAL: this useMemo must be called BEFORE any early return below.
  // React's rules-of-hooks require every hook to run on every render, in
  // the same order. Originally there was an `if (!cluster) return` above
  // this hook — direct navigation to /matrix (where cluster is null on
  // the first render before WS data arrives) blew up with React error
  // #310 because the second render had one more hook than the first.
  const { totalVMs, runningVMs } = useMemo(() => {
    let total = 0;
    let running = 0;

    const countVMs = (c: ClusterData) => {
      Object.values(c.vms).forEach(vm => {
        if (vm.template) return;
        total++;
        if (vm.status === 'running') running++;
      });
    };

    if (isAllClusters) {
      if (clusters) Object.values(clusters).forEach(countVMs);
    } else if (cluster) {
      countVMs(cluster);
    }

    return { totalVMs: total, runningVMs: running };
  }, [cluster, clusters, isAllClusters]);

  if (!cluster && !isAllClusters) {
    return (
      <div className="holo-matrix empty">
        <div className="empty-message">
          <span className="loading-spinner" />
          <span>{t('cluster.select')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="holo-matrix">
      {/* Grid floor effect */}
      <div className="grid-floor" />

      {/* Header */}
      <div className="matrix-header">
        <div className="matrix-title-section">
          <h1 className="matrix-title font-display">
            <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="5" height="5" rx="1" />
              <rect x="10" y="3" width="5" height="5" rx="1" />
              <rect x="17" y="3" width="5" height="5" rx="1" />
              <rect x="3" y="10" width="5" height="5" rx="1" />
              <rect x="10" y="10" width="5" height="5" rx="1" />
              <rect x="17" y="10" width="5" height="5" rx="1" />
              <rect x="3" y="17" width="5" height="5" rx="1" />
              <rect x="10" y="17" width="5" height="5" rx="1" />
              <rect x="17" y="17" width="5" height="5" rx="1" />
            </svg>
            {t('nav.holo_matrix').toUpperCase()}
          </h1>
          <div className="matrix-stats">
            <span className="stat-running">{runningVMs} {t('matrix.running')}</span>
            <span className="stat-divider">/</span>
            <span className="stat-total">{totalVMs} {t('matrix.total')}</span>
          </div>
        </div>

        <div className="matrix-controls">
          {/* Search */}
          <div className="search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={t('matrix.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter tabs — disabled in thumb view because the thumbnail
              list always shows running guests only (stopped/all has no
              meaning when the framebuffer source isn't available). */}
          <div className={`filter-tabs ${viewMode === 'thumb' ? 'is-disabled' : ''}`}>
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              disabled={viewMode === 'thumb'}
              title={viewMode === 'thumb'
                ? (language === 'zh-TW' ? '縮圖檢視只顯示運作中' : 'Thumbnail view shows running only')
                : undefined}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('matrix.filter_all')}</span>
            </button>
            <button
              className={`filter-tab ${filter === 'running' ? 'active' : ''}`}
              onClick={() => setFilter('running')}
              disabled={viewMode === 'thumb'}
              title={viewMode === 'thumb'
                ? (language === 'zh-TW' ? '縮圖檢視只顯示運作中' : 'Thumbnail view shows running only')
                : undefined}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="6 4 20 12 6 20 6 4"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('matrix.filter_running')}</span>
            </button>
            <button
              className={`filter-tab ${filter === 'stopped' ? 'active' : ''}`}
              onClick={() => setFilter('stopped')}
              disabled={viewMode === 'thumb'}
              title={viewMode === 'thumb'
                ? (language === 'zh-TW' ? '縮圖檢視只顯示運作中' : 'Thumbnail view shows running only')
                : undefined}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <rect x="6" y="6" width="12" height="12" rx="1"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('matrix.filter_stopped')}</span>
            </button>
          </div>

          {/* Sort selector */}
          <div className="sort-selector">
            <span className="sort-label">
              <span className="label-icon" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h13M3 12h9M3 18h6"/>
                  <path d="M19 4l2 2-6 6-2-2 6-6z" opacity="0.7"/>
                </svg>
              </span>
              {t('settings.sort_by')}:
            </span>
            <button
              className={`sort-btn ${matrixSortBy === 'vmid' ? 'active' : ''}`}
              onClick={() => { setMatrixSortBy('vmid'); localStorage.setItem('matrix_sort_by', 'vmid'); }}
              title={t('settings.sort_vmid')}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h3v10H4zM10 7h2v10h-2zM15 7h5v3h-3v4h3v3h-5z"/>
                </svg>
              </span>
              <span className="tb-lbl">ID</span>
            </button>
            <button
              className={`sort-btn ${matrixSortBy === 'name' ? 'active' : ''}`}
              onClick={() => { setMatrixSortBy('name'); localStorage.setItem('matrix_sort_by', 'name'); }}
              title={t('settings.sort_name')}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h10"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('settings.sort_name')}</span>
            </button>
            <button
              className={`sort-btn ${matrixSortBy === 'load' ? 'active' : ''}`}
              onClick={() => { setMatrixSortBy('load'); localStorage.setItem('matrix_sort_by', 'load'); }}
              title={t('settings.sort_load')}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 17 9 11 13 15 21 7"/>
                  <polyline points="15 7 21 7 21 13"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('settings.sort_load')}</span>
            </button>
          </div>

          {/* Group by selector */}
          <div className="sort-selector">
            <span className="sort-label">
              <span className="label-icon" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                </svg>
              </span>
              {t('matrix.group_by')}:
            </span>
            <button
              className={`sort-btn ${groupByMode === 'none' ? 'active' : ''}`}
              onClick={() => { setGroupByMode('none'); localStorage.setItem('matrix_group_by', 'none'); }}
              title={t('matrix.group_none')}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('matrix.group_none')}</span>
            </button>
            <button
              className={`sort-btn ${groupByMode === 'node' ? 'active' : ''}`}
              onClick={() => { setGroupByMode('node'); localStorage.setItem('matrix_group_by', 'node'); }}
              title={t('matrix.group_node')}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="6" rx="1"/>
                  <rect x="2" y="15" width="20" height="6" rx="1"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('matrix.group_node')}</span>
            </button>
            <button
              className={`sort-btn ${groupByMode === 'type' ? 'active' : ''}`}
              onClick={() => { setGroupByMode('type'); localStorage.setItem('matrix_group_by', 'type'); }}
              title={t('matrix.group_type')}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="8" height="8" rx="1"/>
                  <rect x="13" y="3" width="8" height="8" rx="1"/>
                  <rect x="3" y="13" width="8" height="8" rx="4"/>
                  <rect x="13" y="13" width="8" height="8" rx="4"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('matrix.group_type')}</span>
            </button>
            <button
              className={`sort-btn ${groupByMode === 'tag' ? 'active' : ''}`}
              onClick={() => { setGroupByMode('tag'); localStorage.setItem('matrix_group_by', 'tag'); }}
              title={t('matrix.group_tag')}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </span>
              <span className="tb-lbl">{t('matrix.group_tag')}</span>
            </button>
          </div>

          {/* View mode toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title={language === 'zh-TW' ? '方格檢視' : 'Grid view'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              <span className="view-btn-lbl">{language === 'zh-TW' ? '方格' : 'Grid'}</span>
            </button>
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title={language === 'zh-TW' ? '表格檢視' : 'Table view'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
              <span className="view-btn-lbl">{language === 'zh-TW' ? '表格' : 'Table'}</span>
            </button>
            <button
              className={`view-btn ${viewMode === 'thumb' ? 'active' : ''}`}
              onClick={() => setViewMode('thumb')}
              title={language === 'zh-TW' ? '縮圖檢視' : 'Thumbnail view'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="view-btn-lbl">{language === 'zh-TW' ? '縮圖' : 'Thumbs'}</span>
            </button>
            <button
              className={`view-btn ${viewMode === 'heatmap' ? 'active' : ''}`}
              onClick={() => setViewMode('heatmap')}
              title={language === 'zh-TW' ? '熱度檢視' : 'Heatmap view'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="3" height="3" />
                <rect x="8" y="4" width="3" height="3" />
                <rect x="13" y="4" width="3" height="3" />
                <rect x="18" y="4" width="3" height="3" />
                <rect x="3" y="10.5" width="3" height="3" />
                <rect x="8" y="10.5" width="3" height="3" />
                <rect x="13" y="10.5" width="3" height="3" />
                <rect x="18" y="10.5" width="3" height="3" />
                <rect x="3" y="17" width="3" height="3" />
                <rect x="8" y="17" width="3" height="3" />
                <rect x="13" y="17" width="3" height="3" />
                <rect x="18" y="17" width="3" height="3" />
              </svg>
              <span className="view-btn-lbl">{language === 'zh-TW' ? '熱度' : 'Heat'}</span>
            </button>
          </div>

          {/* Column picker — table view only */}
          {viewMode === 'table' && (
            <div className="col-picker-wrap">
              <button
                className={`view-btn ${colPickerOpen ? 'active' : ''}`}
                onClick={() => setColPickerOpen((o) => !o)}
                title={t('table.columns')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <path d="M9 3v18M15 3v18" />
                </svg>
                <span className="view-btn-lbl">{t('table.columns')}</span>
              </button>
              {colPickerOpen && (
                <div className="col-picker">
                  {TABLE_COLUMN_DEFS.map((c) => (
                    <label key={c.key} className="col-picker-row">
                      <input
                        type="checkbox"
                        checked={visibleCols.has(c.key)}
                        onChange={() => toggleCol(c.key)}
                      />
                      <span>{c.labelKey === 'VMID' ? 'VMID' : t(c.labelKey)}</span>
                    </label>
                  ))}
                  <button className="col-picker-reset" onClick={resetCols}>
                    {t('table.columns_reset')}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Grid cell-width slider — lives in the toolbar (right side) as a
              grid display option, not a lonely row above the cells. Drives
              the .vm-grid minmax() width live (persisted). */}
          {viewMode === 'grid' && (
            <div className="grid-width-ctl">
              <span className="gw-icon" aria-hidden>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"/>
                  <polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </span>
              <input
                type="range" min={60} max={200} step={5}
                value={cardWidth}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setCardWidth(v);
                  localStorage.setItem('matrix_card_width', String(v));
                }}
                className="thumb-size-slider gw-slider"
                title={`${language === 'zh-TW' ? '方格寬度' : 'Cell width'}: ${cardWidth}px`}
              />
              <span className="gw-val">{cardWidth}</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumb-size slider — separate row below the toolbar so it doesn't
          shove the filter/sort/view-toggle buttons leftward when thumb
          mode is enabled (operator habit point: those buttons must not
          move between view modes). */}
      {viewMode === 'thumb' && (
        <div className="thumb-size-row">
          <div className="thumb-size">
            <span className="thumb-size-label">
              <span className="label-icon" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"/>
                  <polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </span>
              {language === 'zh-TW' ? '尺寸' : 'Size'}
            </span>
            <input
              type="range" min={160} max={640} step={20}
              value={thumbSize}
              onChange={(e) => setThumbSize(parseInt(e.target.value, 10))}
              className="thumb-size-slider"
            />
            <span className="thumb-size-val">{thumbSize}px</span>
            <span
              className="thumb-build-stamp"
              title={`build ${__BUILD_TIME__}`}
            >
              {(() => {
                try {
                  const d = new Date(__BUILD_TIME__);
                  return `b${d.toISOString().slice(11, 16).replace(':', '')}`;
                } catch { return 'b—'; }
              })()}
            </span>
          </div>

          {/* Type filter — applies only to thumb view; keeps the global
              all/running/stopped filter (disabled here) untouched. */}
          <div className="thumb-type-filter" role="group">
            <button
              className={`thumb-type-btn ${thumbTypeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setThumbTypeFilter('all')}
              title={language === 'zh-TW' ? '顯示 VM + CT' : 'Show VMs and CTs'}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                </svg>
              </span>
              <span className="tb-lbl">{language === 'zh-TW' ? '全部' : 'ALL'}</span>
            </button>
            <button
              className={`thumb-type-btn ${thumbTypeFilter === 'qemu' ? 'active' : ''}`}
              onClick={() => setThumbTypeFilter('qemu')}
              title={language === 'zh-TW' ? '只顯示 VM (QEMU)' : 'Show VMs (QEMU) only'}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="14" rx="2"/>
                  <line x1="8" y1="20" x2="16" y2="20"/>
                  <line x1="12" y1="18" x2="12" y2="20"/>
                </svg>
              </span>
              <span className="tb-lbl">VM</span>
            </button>
            <button
              className={`thumb-type-btn ${thumbTypeFilter === 'lxc' ? 'active' : ''}`}
              onClick={() => setThumbTypeFilter('lxc')}
              title={language === 'zh-TW' ? '只顯示 CT (LXC)' : 'Show CTs (LXC) only'}
            >
              <span className="tb-ico" aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </span>
              <span className="tb-lbl">CT</span>
            </button>
          </div>

          {/* Prefer with content toggle — sinks blank thumbnails (all-black
              VM consoles, CTs with no visible text) to the bottom. Driven
              by X-Thumb-Empty header from the screenshot endpoint. */}
          <button
            className={`thumb-prefer-btn ${thumbPreferContent ? 'active' : ''}`}
            onClick={() => setThumbPreferContent((v) => !v)}
            title={language === 'zh-TW'
              ? '優先顯示有畫面/有文字的縮圖；全黑 VM 與空白 CT 排到最後'
              : 'Prefer thumbnails with content; blank VMs and empty CTs go to the end'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M3 6h13M3 12h9M3 18h6" />
              <path d="M19 4l2 2-6 6-2-2 6-6z" opacity="0.7" />
            </svg>
            {language === 'zh-TW' ? '優先有內容' : 'Prefer content'}
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="matrix-content">
        {viewMode === 'grid' ? (
          /* VM Grid View */
          <div className="matrix-grid" ref={gridContainerRef}>
            {/* Migration lines SVG overlay */}
            {migrationLines.length > 0 && (
              <svg className="migration-lines-overlay">
                <defs>
                  <linearGradient id="migrationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e066ff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#e066ff" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="migrationGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {migrationLines.map((line, i) => (
                  <g key={`line-${line.vmid}-${i}`}>
                    {/* Main line */}
                    <line
                      className="migration-line"
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="url(#migrationGradient)"
                      strokeWidth="2"
                      filter="url(#migrationGlow)"
                    />
                    {/* Animated particles */}
                    <circle className="migration-particle" r="4" fill="#00f0ff">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
                      />
                    </circle>
                    <circle className="migration-particle" r="3" fill="#e066ff">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="0.5s"
                        path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
                      />
                    </circle>
                    <circle className="migration-particle" r="2" fill="#00f0ff">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="1s"
                        path={`M${line.x1},${line.y1} L${line.x2},${line.y2}`}
                      />
                    </circle>
                  </g>
                ))}
              </svg>
            )}

            {/* Completing migration lines - collapsing animation */}
            {completingLines.length > 0 && (
              <svg className="migration-lines-overlay completing">
                <defs>
                  <linearGradient id="completingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="completingGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {completingLines.map((line, i) => (
                  <g key={`completing-${line.vmid}-${i}`}>
                    {/* Collapsing line */}
                    <line
                      className="completing-line"
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke="url(#completingGradient)"
                      strokeWidth={3 * (1 - line.progress) + 1}
                      filter="url(#completingGlow)"
                      opacity={1 - line.progress * 0.5}
                    />
                    {/* Final burst at target */}
                    {line.progress > 0.8 && (
                      <circle
                        cx={line.x2}
                        cy={line.y2}
                        r={20 * (line.progress - 0.8) * 5}
                        fill="none"
                        stroke="#00ff88"
                        strokeWidth="2"
                        opacity={1 - (line.progress - 0.8) * 5}
                      />
                    )}
                  </g>
                ))}
              </svg>
            )}

            {/* Render all groups including ghost-only groups */}
            {(() => {
              // Combine existing groups with ghost-only groups
              const allGroups = new Map<string, { vms: VMMetrics[]; clusterId: string }>();

              // Add existing groups
              Object.entries(vmsByGroup).forEach(([key, group]) => {
                allGroups.set(key, group);
              });

              // Add ghost-only groups (target nodes without existing VMs)
              ghostCells.forEach(ghost => {
                if (!allGroups.has(ghost.targetGroupKey)) {
                  allGroups.set(ghost.targetGroupKey, { vms: [], clusterId: ghost.clusterId });
                }
              });

              // Sort groups based on settings
              // Where each guest currently sits according to the data we have.
              // Used to guarantee a migrated guest is drawn EXACTLY once: the
              // source cell may only be hidden once the guest has actually
              // appeared on the target, otherwise it belongs to neither and
              // vanishes from the grid entirely (see below).
              const presentAt = new Set<string>();
              allGroups.forEach((g) => {
                g.vms.forEach((v: any) => {
                  presentAt.add(`${v.cluster_id}/${v.node}/${v.vmid}`);
                });
              });

              const sortedGroups = Array.from(allGroups.entries()).sort((a, b) => {
                const [keyA] = a;
                const [keyB] = b;

                // Parse group key format: "ClusterName / NodeName" or just "NodeName"
                const parseKey = (key: string) => {
                  if (key.includes(' / ')) {
                    const [cluster, node] = key.split(' / ');
                    return { cluster, node };
                  }
                  return { cluster: '', node: key };
                };

                const parsedA = parseKey(keyA);
                const parsedB = parseKey(keyB);

                let comparison = 0;
                if (groupSortBy === 'cluster') {
                  comparison = parsedA.cluster.localeCompare(parsedB.cluster);
                  if (comparison === 0) {
                    comparison = parsedA.node.localeCompare(parsedB.node);
                  }
                } else {
                  comparison = parsedA.node.localeCompare(parsedB.node);
                  if (comparison === 0) {
                    comparison = parsedA.cluster.localeCompare(parsedB.cluster);
                  }
                }

                return groupSortOrder === 'desc' ? -comparison : comparison;
              });

              // Global index counter for staggered animation across all VMs
              let globalVMIndex = 0;

              return sortedGroups.map(([groupName, group]) => {
                // Find ghost cells that belong to this group (target node)
                const ghostsForGroup = ghostCells.filter(g => g.targetGroupKey === groupName);

                return (
                  <div key={groupName} className={`node-section ${group.vms.length === 0 && ghostsForGroup.length > 0 ? 'ghost-only' : ''}`}>
                  <div className="node-section-header">
                    <span className="node-section-name">{groupName}</span>
                    <span className="node-section-count">
                      {group.vms.length}
                      {ghostsForGroup.length > 0 && (
                        <span className="incoming-count"> +{ghostsForGroup.length}</span>
                      )}
                    </span>
                  </div>
                  <div className={`vm-grid ${matrixSortBy === 'load' && !isInitialLoad ? 'sort-by-load' : ''} ${isInitialLoad ? 'initial-load' : ''}`} key={`grid-${filter}-${searchTerm}-${matrixSortBy}-${animKey}`}>
                    {/* Regular VMs - only render when showVMs is true for entry animation */}
                    {showVMs && group.vms.map((vm) => {
                      // Include cluster_id in key to handle multiple clusters with same vmid
                      const key = `${vm.cluster_id}/${vm.node}/${vm.vmid}`;
                      const vmTask = findVMTask(vm.vmid, vm.node, vm.cluster_id, cluster, clusters);
                      const completingKey = `${vm.cluster_id}:${vm.vmid}`;
                      const completingInfo = completingMigrations.get(completingKey);

                      // A finished migration hides the guest on its SOURCE node so it
                      // is not drawn twice once the poll moves it. But the ghost that
                      // owned the target cell disappears the moment the task ends, and
                      // the cache can lag by a poll — so hiding unconditionally left the
                      // guest rendered NOWHERE for up to 10s. It showed up in a demo
                      // recording as a VM that simply evaporated after migrating.
                      // Hide it only once it has actually arrived on the target.
                      if (completingInfo && completingInfo.sourceNode === vm.node) {
                        const arrived = presentAt.has(
                          `${vm.cluster_id}/${completingInfo.targetNode}/${vm.vmid}`);
                        if (arrived) return null;
                      }

                      // Cross-cluster mirror target: the destination VM is created and
                      // already running on the target before mirror finishes. Don't draw it
                      // twice — let the INCOMING ghost own the cell until migration ends.
                      // ONLY for genuine cross-cluster migrations (source cluster !=
                      // target cluster). For a same-cluster migrate the VM's own ghost
                      // has targetClusterId === vm.cluster_id, which used to match here and
                      // hide the SOURCE cell — killing the source→target migration line.
                      const incomingMirror = ghostCells.find(
                        (g) => g.targetClusterId === vm.cluster_id && g.vm.vmid === vm.vmid
                               && g.clusterId !== g.targetClusterId,
                      );
                      if (incomingMirror) {
                        return null;
                      }

                      const currentIndex = globalVMIndex++;

                      return (
                        <VMCell
                          key={key}
                          ref={(el) => {
                            if (el) cellRefs.current.set(key, el);
                            else cellRefs.current.delete(key);
                          }}
                          vm={vm}
                          isSelected={selectedVMKey === key}
                          onClick={() => setSelectedVMKey(selectedVMKey === key ? null : key)}
                          onContextMenu={(e) => handleContextMenu(e, vm, group.clusterId)}
                          animationDelay={isInitialLoad ? currentIndex * 50 : 0}
                          task={vmTask}
                          isCompleting={!!completingInfo}
                        />
                      );
                    }).filter(Boolean)}
                    {/* Ghost cells for incoming migrations */}
                    {showVMs && ghostsForGroup.map((ghost) => {
                      // Include cluster_id in key to handle multiple clusters with same vmid
                      const ghostKey = `ghost-${ghost.vm.cluster_id}-${ghost.vm.vmid}`;
                      const task = migratingVMs.find(m => m.vm.vmid === ghost.vm.vmid && m.clusterId === ghost.vm.cluster_id)?.task;
                      return (
                        <VMCell
                          key={ghostKey}
                          ref={(el) => {
                            if (el) cellRefs.current.set(ghostKey, el);
                            else cellRefs.current.delete(ghostKey);
                          }}
                          vm={ghost.vm}
                          isSelected={false}
                          onClick={() => {}}
                          onContextMenu={(e) => e.preventDefault()}
                          animationDelay={0}
                          task={task}
                          isGhost={true}
                        />
                      );
                    })}
                  </div>
                </div>
                );
              });
            })()}

            {Object.keys(vmsByGroup).length === 0 && ghostCells.length === 0 && (
              <div className="no-vms">
                <span>{t('error.no_data')}</span>
              </div>
            )}
          </div>
        ) : viewMode === 'thumb' ? (
          /* VM Thumbnail View. Group-by + prefer-content rules:
             - thumbVms is base-sorted by ID/name/load (toolbar setting)
             - thumbGroups buckets by node/type/tag (toolbar group-by)
             - within each group, blank thumbs sink when prefer-content is on. */
          <div
            ref={thumbGridRef}
            className="matrix-thumb-grid"
          >
            {/* Global SVG noise filter — referenced by every thumbnail
                loader via url(#jt-noise). Animated seed makes it feel
                like real TV static instead of a frozen pattern. One
                instance for the whole grid means N thumbnails cost the
                same as 1 for the noise generation. */}
            <svg
              aria-hidden
              style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
            >
              <defs>
                <filter id="jt-noise" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch">
                    <animate attributeName="seed" values="1;7;3;9;5;11" dur="0.4s" repeatCount="indefinite" />
                  </feTurbulence>
                  {/* Tint the grayscale noise toward cyan + boost contrast
                      so it reads as "scrambled signal" instead of just
                      grainy. Output alpha capped so it doesn't fully
                      obscure the bg colour underneath. */}
                  <feColorMatrix values="
                    0.10 0.10 0.10 0  0
                    0.45 0.55 0.55 0  0
                    0.65 0.85 0.95 0  0
                    0    0    0    1.6 -0.4" />
                </filter>
              </defs>
            </svg>
            {thumbVms.length === 0 ? (
              <div className="no-vms"><span>{t('error.no_data')}</span></div>
            ) : thumbGroups.map(([groupName, vmsInGroup]) => {
              const orderedVms = thumbPreferContent
                ? [...vmsInGroup].sort((a, b) => {
                    const aKey = `${a.clusterId || cluster?.id || ''}/${a.node}/${a.vmid}`;
                    const bKey = `${b.clusterId || cluster?.id || ''}/${b.node}/${b.vmid}`;
                    const aBlank = thumbBlobs[aKey]?.isBlank ? 1 : 0;
                    const bBlank = thumbBlobs[bKey]?.isBlank ? 1 : 0;
                    return aBlank - bBlank;  // 0 (has content) before 1 (blank)
                  })
                : vmsInGroup;
              return (
                <div key={groupName} className="thumb-group">
                  {groupByMode !== 'none' && (
                    <div className="thumb-group-header">
                      <span className="thumb-group-bracket left" aria-hidden />
                      <span className="thumb-group-name">{groupName}</span>
                      <span className="thumb-group-count">{orderedVms.length}</span>
                      <span className="thumb-group-rule" aria-hidden />
                      <span className="thumb-group-bracket right" aria-hidden />
                    </div>
                  )}
                  <div className="thumb-group-cards">
                    {orderedVms.map((vm) => {
                      const isCT = vm.type === 'lxc';
                      const isRunning = vm.status === 'running';
                      const cpuPercent = vm.cpu?.usage_percent ?? 0;
                      const memPercent = vm.memory && vm.memory.total_bytes > 0
                        ? (vm.memory.used_bytes / vm.memory.total_bytes) * 100 : 0;
                      const cidForVm = vm.clusterId || cluster?.id || '';
                      const key = `${cidForVm}/${vm.node}/${vm.vmid}`;
                      const blob = thumbBlobs[key];
                      return (
                        <div
                          key={key}
                          data-card-key={key}
                          className={`vm-thumb-card status-${vm.status}${blob?.isBlank ? ' is-blank' : ''}`}
                          style={{ width: `${thumbCardW}px`, flex: '0 0 auto' }}
                          onClick={() => setThumbPreview({ vm, clusterId: cidForVm })}
                          onContextMenu={(e) => handleContextMenu(e, vm, cidForVm)}
                        >
                          <div
                            className="vm-thumb-image"
                            style={{ height: `${thumbImgHeight}px` }}
                          >
                            {/* "No-signal" CRT loader — TV-static noise +
                                horizontal scanlines + a flickering label.
                                The noise is a global SVG filter referenced
                                via url() so we don't pay per-thumb cost. */}
                            <div className="vm-thumb-loading" aria-hidden>
                              <svg className="vtl-fill" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" fill="#02050b"/>
                                <rect width="100%" height="100%" filter="url(#jt-noise)"/>
                              </svg>
                              <div className="vtl-scanlines" />
                              <div className="vtl-vignette" />
                              <span className="vtl-text">
                                {language === 'zh-TW' ? '訊號接收中' : 'NO SIGNAL'}
                              </span>
                            </div>
                            {blob && (
                              <img
                                src={blob.url}
                                alt={`VM ${vm.vmid} screenshot`}
                                loading="lazy"
                                onLoad={(e) => {
                                  e.currentTarget.parentElement!.dataset.loaded = '1';
                                }}
                                onError={(e) => {
                                  (e.currentTarget.parentElement as HTMLElement).dataset.error = '1';
                                }}
                              />
                            )}
                          </div>
                          <div className="vm-thumb-meta">
                            <div className="vm-thumb-title">
                              <span className={`type-badge ${vm.type}`}>{isCT ? 'CT' : 'VM'}</span>
                              <code className="vm-thumb-id">#{vm.vmid}</code>
                              <span className="vm-thumb-name">{vm.name}</span>
                            </div>
                            {isRunning && (
                              <div className="vm-thumb-bars">
                                <div className="vm-thumb-bar">
                                  <span className="vm-thumb-bar-label">CPU</span>
                                  <div className="mini-bar">
                                    <div
                                      className={`mini-bar-fill ${getHealthColor(cpuPercent)}`}
                                      style={{ width: `${Math.min(cpuPercent, 100)}%` }}
                                    />
                                  </div>
                                  <span className={`vm-thumb-bar-val text-${getHealthColor(cpuPercent)}`}>
                                    {formatPercent(cpuPercent, 1)}
                                  </span>
                                </div>
                                <div className="vm-thumb-bar">
                                  <span className="vm-thumb-bar-label">MEM</span>
                                  <div className="mini-bar">
                                    <div
                                      className={`mini-bar-fill ${getHealthColor(memPercent)}`}
                                      style={{ width: `${Math.min(memPercent, 100)}%` }}
                                    />
                                  </div>
                                  <span className={`vm-thumb-bar-val text-${getHealthColor(memPercent)}`}>
                                    {formatPercent(memPercent, 0)}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : viewMode === 'heatmap' ? (
          /* CPU Heatmap View — per-VM rolling history of CPU% rendered
             as colored cells. Uses heatmapHistoryRef which is appended
             to in the dedicated useEffect above. heatmapTick is read so
             this branch re-renders after each append. */
          <HeatmapView
            vms={sortedVMs}
            history={heatmapHistoryRef.current}
            times={heatmapTimesRef.current}
            tick={heatmapTick}
            language={language}
          />
        ) : (
          /* VM Table View */
          <div className="matrix-table-container">
            <TagSelectorBar
              vms={sortedVMs}
              onSelectByTag={(tag) => {
                const ids = new Set(selected);
                for (const v of sortedVMs) {
                  const raw = (v as any).tags;
                  const tags: string[] = (Array.isArray(raw)
                    ? raw.flatMap((s: any) => String(s).split(/[;,\s]+/))
                    : typeof raw === 'string' ? raw.split(/[;,\s]+/)
                    : []).filter(Boolean);
                  if (tags.includes(tag)) {
                    ids.add(`${v.cluster_id}/${v.node}/${v.vmid}`);
                  }
                }
                setSelected(ids);
              }}
            />
            {/* Bulk-action toolbar — appears when ≥1 VM is checked.
                Pinned to top of table area. Mixed VM/CT selection is OK
                (server's vm_bulk_handler auto-detects each vmid). */}
            {selected.size > 0 && (
              <div className="bulk-toolbar">
                <span className="bulk-count">
                  {language === 'zh-TW'
                    ? `已選 ${selected.size}`
                    : `${selected.size} selected`}
                </span>
                <button
                  className="bulk-btn"
                  disabled={bulkBusy}
                  onClick={async () => {
                    const ok = await dialog.confirm(
                      language === 'zh-TW'
                        ? `對選取的 ${selected.size} 台 VM/CT 執行開機？`
                        : `Start ${selected.size} selected VM/CTs?`,
                      { title: language === 'zh-TW' ? '批次開機' : 'Bulk start' },
                    );
                    if (!ok) return;
                    await runBulkAction('start');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
                  <span>{t('vm.start')}</span>
                </button>
                <button
                  className="bulk-btn"
                  disabled={bulkBusy}
                  onClick={async () => {
                    const ok = await dialog.confirm(
                      language === 'zh-TW'
                        ? `對選取的 ${selected.size} 台 VM/CT 執行關機（ACPI）？`
                        : `Shutdown (ACPI) ${selected.size} selected VM/CTs?`,
                      { title: language === 'zh-TW' ? '批次關機' : 'Bulk shutdown', destructive: true },
                    );
                    if (!ok) return;
                    await runBulkAction('shutdown');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64A9 9 0 0 1 6.64 18.36"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                  <span>{t('vm.shutdown_acpi')}</span>
                </button>
                <button
                  className="bulk-btn"
                  disabled={bulkBusy}
                  onClick={async () => {
                    const ok = await dialog.confirm(
                      language === 'zh-TW'
                        ? `對選取的 ${selected.size} 台 VM/CT 重新啟動？`
                        : `Reboot ${selected.size} selected VM/CTs?`,
                      { title: language === 'zh-TW' ? '批次重啟' : 'Bulk reboot', destructive: true },
                    );
                    if (!ok) return;
                    await runBulkAction('reboot');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                  <span>{t('vm.reboot')}</span>
                </button>
                <button
                  className="bulk-btn danger"
                  disabled={bulkBusy}
                  onClick={async () => {
                    const ok = await dialog.confirm(
                      language === 'zh-TW'
                        ? `強制停止 ${selected.size} 台 VM/CT？此動作不會通知 guest OS。`
                        : `Hard-stop ${selected.size} selected VM/CTs? Guest OS will not be notified.`,
                      { title: language === 'zh-TW' ? '批次強制停止' : 'Bulk hard stop', destructive: true },
                    );
                    if (!ok) return;
                    await runBulkAction('stop');
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
                  <span>{t('vm.stop_hard')}</span>
                </button>
                <span className="bulk-sep" />
                <button
                  className="bulk-btn ghost"
                  disabled={bulkBusy}
                  onClick={async () => {
                    // Bulk-migrate flow: pick a target node, then fan out
                    // per-VM migrate calls with online=true. Mixed VM/CT
                    // is fine — the per-kind endpoint dispatches.
                    const allNodes = new Set<string>();
                    for (const v of sortedVMs) {
                      const cd = clusters?.[v.cluster_id];
                      if (cd) for (const n of Object.keys(cd.nodes)) allNodes.add(n);
                    }
                    const selVms = sortedVMs.filter((v) =>
                      selected.has(`${v.cluster_id}/${v.node}/${v.vmid}`));
                    const sourceNodes = new Set(selVms.map((v) => v.node));
                    const targets = [...allNodes].filter((n) => !sourceNodes.has(n) || sourceNodes.size > 1).sort();
                    if (targets.length === 0) {
                      await dialog.alert('No other node available for migration.');
                      return;
                    }
                    const target = await dialog.prompt(
                      language === 'zh-TW'
                        ? `將 ${selected.size} 台 VM/CT 遷移到下列節點之一（輸入節點名稱）：\n${targets.join(', ')}`
                        : `Migrate ${selected.size} VM/CT(s) to which node?\nAvailable: ${targets.join(', ')}`,
                      { title: language === 'zh-TW' ? '批次遷移' : 'Bulk migrate', defaultValue: targets[0] }
                    );
                    if (target === null) return;
                    if (!targets.includes(target.trim())) {
                      await dialog.alert(`Unknown target node: ${target}`);
                      return;
                    }
                    setBulkBusy(true);
                    let okCount = 0, failCount = 0;
                    for (const v of selVms) {
                      try {
                        const path = v.type === 'lxc'
                          ? `/api/clusters/${encodeURIComponent(v.cluster_id)}/cts/${v.vmid}/migrate`
                          : `/api/clusters/${encodeURIComponent(v.cluster_id)}/vms/${v.vmid}/migrate`;
                        const body = v.type === 'lxc'
                          ? { target: target.trim(), online: true }
                          : { target_node: target.trim(), online: true };
                        const r = await fetch(path, {
                          method: 'POST', credentials: 'same-origin',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(body),
                        });
                        if (r.ok) okCount++; else failCount++;
                      } catch { failCount++; }
                    }
                    setBulkBusy(false);
                    await dialog.alert(
                      `Bulk migrate to ${target}: ${okCount} ok, ${failCount} failed.`
                    );
                  }}
                  title={language === 'zh-TW' ? '批次遷移' : 'Bulk migrate'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="17 1 21 5 17 9" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <polyline points="7 23 3 19 7 15" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                  <span>{language === 'zh-TW' ? '批次遷移' : 'Bulk migrate'}</span>
                </button>
                <button
                  className="bulk-btn ghost"
                  disabled={bulkBusy}
                  onClick={async () => {
                    const selVms = sortedVMs.filter((v) =>
                      selected.has(`${v.cluster_id}/${v.node}/${v.vmid}`));
                    const name = await dialog.prompt(
                      language === 'zh-TW'
                        ? `為 ${selVms.length} 台 VM/CT 建立快照。輸入快照名稱（英數 / -_ 開頭）：`
                        : `Take snapshot on ${selVms.length} VM/CT(s). Snapshot name (alnum / -_ start):`,
                      { title: language === 'zh-TW' ? '批次快照' : 'Bulk snapshot', defaultValue: `bulk-${new Date().toISOString().slice(0, 10)}` }
                    );
                    if (name === null) return;
                    if (!/^[A-Za-z][A-Za-z0-9_\-]{0,39}$/.test(name.trim())) {
                      await dialog.alert('Bad snapshot name');
                      return;
                    }
                    setBulkBusy(true);
                    let okCount = 0, failCount = 0;
                    for (const v of selVms) {
                      try {
                        const r = await fetch(
                          `/api/clusters/${encodeURIComponent(v.cluster_id)}/vms/${v.vmid}/snapshots`,
                          { method: 'POST', credentials: 'same-origin',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ snapname: name.trim() }) }
                        );
                        if (r.ok) okCount++; else failCount++;
                      } catch { failCount++; }
                    }
                    setBulkBusy(false);
                    await dialog.alert(`Bulk snapshot "${name}": ${okCount} ok, ${failCount} failed.`);
                  }}
                  title={language === 'zh-TW' ? '批次快照' : 'Bulk snapshot'}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"/>
                  </svg>
                  <span>{language === 'zh-TW' ? '批次快照' : 'Bulk snapshot'}</span>
                </button>
                <button
                  className="bulk-btn ghost"
                  disabled={bulkBusy}
                  onClick={() => setBulkTagOpen(true)}
                  title={t('bulk.tag_action')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  <span>{t('bulk.tag_action')}</span>
                </button>
                <button className="bulk-btn ghost" onClick={clearSelection} disabled={bulkBusy}>
                  {language === 'zh-TW' ? '取消選取' : 'Clear'}
                </button>
              </div>
            )}
            <table className="vm-table">
              <thead>
                <tr>
                  <th className="select-col">
                    <input
                      type="checkbox"
                      className="bulk-check"
                      checked={selected.size > 0 && sortedVMs.every(v => selected.has(`${v.cluster_id}/${v.node}/${v.vmid}`))}
                      ref={(el) => {
                        if (!el) return;
                        const someSelected = sortedVMs.some(v => selected.has(`${v.cluster_id}/${v.node}/${v.vmid}`));
                        const allSelected  = sortedVMs.length > 0 && sortedVMs.every(v => selected.has(`${v.cluster_id}/${v.node}/${v.vmid}`));
                        el.indeterminate = someSelected && !allSelected;
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected(new Set(sortedVMs.map(v => `${v.cluster_id}/${v.node}/${v.vmid}`)));
                        } else {
                          clearSelection();
                        }
                      }}
                      title={t('matrix.bulk.select_all')}
                    />
                  </th>
                  {colVisible('status') && (
                    <th className={`sortable ${sortField === 'status' ? 'sorted' : ''}`} onClick={() => handleSort('status')}>
                      <span>{t('node.status')}</span>
                      {sortField === 'status' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('vmid') && (
                    <th className={`sortable ${sortField === 'vmid' ? 'sorted' : ''}`} onClick={() => handleSort('vmid')}>
                      <span>VMID</span>
                      {sortField === 'vmid' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('type') && (
                    <th className={`sortable ${sortField === 'type' ? 'sorted' : ''}`} onClick={() => handleSort('type')}>
                      <span>{t('table.type')}</span>
                      {sortField === 'type' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('name') && (
                    <th className={`sortable ${sortField === 'name' ? 'sorted' : ''}`} onClick={() => handleSort('name')}>
                      <span>{t('table.name')}</span>
                      {sortField === 'name' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('tags') && <th className="tags-header">{t('table.tags')}</th>}
                  {colVisible('cluster') && <th>{t('table.cluster')}</th>}
                  {colVisible('node') && (
                    <th className={`sortable ${sortField === 'node' ? 'sorted' : ''}`} onClick={() => handleSort('node')}>
                      <span>{t('table.node')}</span>
                      {sortField === 'node' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('cpu') && (
                    <th className={`sortable ${sortField === 'cpu' ? 'sorted' : ''}`} onClick={() => handleSort('cpu')}>
                      <span>{t('metric.cpu')}</span>
                      {sortField === 'cpu' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('cores') && <th className="num-header">{t('table.cores')}</th>}
                  {colVisible('memory') && (
                    <th className={`sortable ${sortField === 'memory' ? 'sorted' : ''}`} onClick={() => handleSort('memory')}>
                      <span>{t('metric.memory')}</span>
                      {sortField === 'memory' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('maxmem') && <th className="num-header">{t('table.maxmem')}</th>}
                  {colVisible('disk') && <th>{t('table.disk_usage')}</th>}
                  {colVisible('maxdisk') && <th className="num-header">{t('table.maxdisk')}</th>}
                  {colVisible('diskio') && <th className="net-header">{t('table.diskio')}</th>}
                  {colVisible('rx') && (
                    <th className={`sortable net-header ${sortField === 'rx' ? 'sorted' : ''}`} onClick={() => handleSort('rx')}>
                      <span>↓ {t('metric.rx')}</span>
                      {sortField === 'rx' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('tx') && (
                    <th className={`sortable net-header ${sortField === 'tx' ? 'sorted' : ''}`} onClick={() => handleSort('tx')}>
                      <span>↑ {t('metric.tx')}</span>
                      {sortField === 'tx' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('uptime') && (
                    <th className={`sortable ${sortField === 'uptime' ? 'sorted' : ''}`} onClick={() => handleSort('uptime')}>
                      <span>{t('table.uptime')}</span>
                      {sortField === 'uptime' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                  {colVisible('task') && (
                    <th className={`sortable task-header ${sortField === 'task' ? 'sorted' : ''}`} onClick={() => handleSort('task')}>
                      <span>{t('table.task')}</span>
                      {sortField === 'task' && <span className="sort-indicator">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedVMs.map((vm) => {
                  // Include cluster_id in key to handle multiple clusters with same vmid
                  const key = `${vm.cluster_id}/${vm.node}/${vm.vmid}`;
                  const isRunning = vm.status === 'running';
                  const cpuPercent = vm.cpu.usage_percent;
                  const memPercent = (vm.memory.used_bytes / vm.memory.total_bytes) * 100;
                  const vmTask = findVMTask(vm.vmid, vm.node, vm.cluster_id, cluster, clusters);
                  const isChecked = selected.has(key);

                  return (
                    <tr
                      key={key}
                      className={`${selectedVMKey === key ? 'selected' : ''} ${isChecked ? 'multi-selected' : ''} ${vm.status} ${sortAnimating ? 'sort-animating' : ''}`}
                      onClick={() => setSelectedVMKey(selectedVMKey === key ? null : key)}
                      onContextMenu={(e) => handleContextMenu(e, vm, vm.clusterId)}
                    >
                      <td className="select-col" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="bulk-check"
                          checked={isChecked}
                          onChange={() => toggleSelected(key)}
                        />
                      </td>
                      {colVisible('status') && (
                        <td>
                          <span className={`status-badge ${getStatusColor(vm.status)}`}>
                            {vm.status.toUpperCase()}
                          </span>
                        </td>
                      )}
                      {colVisible('vmid') && <td className="vmid-cell">{vm.vmid}</td>}
                      {colVisible('type') && (
                        <td className="type-cell">
                          <span className={`type-badge ${vm.type}`}>
                            {vm.type === 'qemu' ? 'VM' : 'CT'}
                          </span>
                        </td>
                      )}
                      {colVisible('name') && <td className="name-cell">{vm.name}</td>}
                      {colVisible('tags') && (
                        <td className="tags-cell">
                          {(() => {
                            const tags = normaliseTags(vm.tags);
                            return tags.length > 0 ? (
                              <div className="vm-tags">
                                {tags.map((tag, i) => (
                                  <span key={i} className="vm-tag">{tag}</span>
                                ))}
                              </div>
                            ) : null;
                          })()}
                        </td>
                      )}
                      {colVisible('cluster') && (
                        <td className="node-cell">
                          {(clusters?.[vm.cluster_id]?.name) || vm.cluster_id}
                        </td>
                      )}
                      {colVisible('node') && <td className="node-cell">{vm.node}</td>}
                      {colVisible('cpu') && (
                        <td>
                          {isRunning ? (
                            <div className="cpu-cell">
                              <div className="mini-bar">
                                <div className={`mini-bar-fill ${getHealthColor(cpuPercent)}`} style={{ width: `${cpuPercent}%` }} />
                              </div>
                              <span className={`text-${getHealthColor(cpuPercent)}`}>{formatPercent(cpuPercent, 1)}</span>
                            </div>
                          ) : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {colVisible('cores') && (
                        <td className="num-cell">{vm.cpu.cores || '—'}</td>
                      )}
                      {colVisible('memory') && (
                        <td>
                          {isRunning ? (
                            <div className="mem-cell">
                              <div className="mini-bar">
                                <div className={`mini-bar-fill ${getHealthColor(memPercent)}`} style={{ width: `${memPercent}%` }} />
                              </div>
                              <span>{formatPercent(memPercent, 1)}</span>
                            </div>
                          ) : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {colVisible('maxmem') && (
                        <td className="num-cell">{vm.memory.total_bytes ? formatBytes(vm.memory.total_bytes) : '—'}</td>
                      )}
                      {colVisible('disk') && (
                        <td>
                          {vm.disk.total_bytes > 0 && vm.disk.used_bytes > 0 ? (
                            <div className="mem-cell">
                              <div className="mini-bar">
                                <div className={`mini-bar-fill ${getHealthColor((vm.disk.used_bytes / vm.disk.total_bytes) * 100)}`}
                                     style={{ width: `${(vm.disk.used_bytes / vm.disk.total_bytes) * 100}%` }} />
                              </div>
                              <span>{formatPercent((vm.disk.used_bytes / vm.disk.total_bytes) * 100, 1)}</span>
                            </div>
                          ) : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {colVisible('maxdisk') && (
                        <td className="num-cell">{vm.disk.total_bytes ? formatBytes(vm.disk.total_bytes) : '—'}</td>
                      )}
                      {colVisible('diskio') && (
                        <td className="net-rx-cell">
                          {isRunning ? (
                            <span className="net-rx">
                              R {formatBytes(vm.disk.read_bytes_sec)}/s · W {formatBytes(vm.disk.write_bytes_sec)}/s
                            </span>
                          ) : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {colVisible('rx') && (
                        <td className="net-rx-cell">
                          {isRunning ? (
                            <span className="net-rx">{formatBytes(vm.network.rx_bytes_sec)}/s</span>
                          ) : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {colVisible('tx') && (
                        <td className="net-tx-cell">
                          {isRunning ? (
                            <span className="net-tx">{formatBytes(vm.network.tx_bytes_sec)}/s</span>
                          ) : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {colVisible('uptime') && (
                        <td>
                          {isRunning ? (
                            <span className="uptime-cell">{formatUptime(vm.uptime)}</span>
                          ) : <span className="text-muted">—</span>}
                        </td>
                      )}
                      {colVisible('task') && (
                        <td className="task-cell">
                          {vmTask && <TaskBadge task={vmTask} />}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {sortedVMs.length === 0 && (
              <div className="no-vms">
                <span>{t('error.no_data')}</span>
              </div>
            )}
          </div>
        )}

        {/* Detail Panel */}
        {selectedVM && (
          <VMDetailPanel
            key={`${selectedVM.node}/${selectedVM.vmid}`}
            vm={selectedVM}
            onClose={() => setSelectedVMKey(null)}
          />
        )}
      </div>

      {/* Thumbnail click-to-zoom preview modal */}
      {thumbPreview && (
        <div
          className="thumb-preview-overlay"
          onClick={() => setThumbPreview(null)}
        >
          <div
            className="thumb-preview-frame"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="thumb-preview-titlebar">
              <span className="thumb-preview-name">
                <span className={`type-badge ${thumbPreview.vm.type}`}>
                  {thumbPreview.vm.type === 'lxc' ? 'CT' : 'VM'}
                </span>
                <code className="thumb-preview-id">#{thumbPreview.vm.vmid}</code>
                <span>{thumbPreview.vm.name}</span>
                <span className="thumb-preview-node">{thumbPreview.vm.node}</span>
              </span>
              <button
                className="thumb-preview-close"
                onClick={() => setThumbPreview(null)}
              >×</button>
            </div>
            <div className="thumb-preview-body">
              {/* Cool loading effect — visible until <img> fires onLoad.
                  Layers: rotating ring + cyan vertical scan-bar + status
                  text. The <img> sets data-loaded='1' on its parent,
                  which CSS uses to hide the loader. */}
              <div className="thumb-preview-loader" aria-hidden>
                <div className="tpl-grid" />
                <div className="tpl-scan" />
                <div className="tpl-ring" />
                <div className="tpl-corner tl" />
                <div className="tpl-corner tr" />
                <div className="tpl-corner bl" />
                <div className="tpl-corner br" />
                <div className="tpl-status">
                  <span className="tpl-dots"><i></i><i></i><i></i></span>
                  <span className="tpl-text">{language === 'zh-TW' ? '取得高解析畫面' : 'FETCHING FRAMEBUFFER'}</span>
                </div>
              </div>
              <img
                src={`/api/console/screenshot/${encodeURIComponent(thumbPreview.clusterId)}`
                  + `/${encodeURIComponent(thumbPreview.vm.node)}/${thumbPreview.vm.vmid}`
                  + `?max=1600&t=${thumbTick}`}
                alt={`VM ${thumbPreview.vm.vmid} full screenshot`}
                onLoad={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).dataset.loaded = '1';
                }}
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).dataset.error = '1';
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      <VMContextMenu
        state={contextMenu}
        onClose={closeContextMenu}
        onShowDetails={() => {
          if (contextMenu.vm) {
            setSelectedVMKey(`${contextMenu.vm.node}/${contextMenu.vm.vmid}`);
          }
        }}
        onPowerAction={requestPowerAction}
        onOpenConsole={async () => {
          if (!contextMenu.vm) return;
          const vm = contextMenu.vm;
          const cid = contextMenu.clusterId;
          // 'disabled' should already have hidden the menu item, but guard.
          if (consoleMode === 'disabled') {
            await dialog.alert(t('console.disabled'));
            return;
          }
          if (consoleMode === 'prompt') {
            setConsolePromptVm({ vm, clusterId: cid });
            return;
          }
          // Stored mode — POST prepare with no password. The server returns
          // 412 with no_stored_password if console.mode='stored' but no
          // password is set; surface that as a dialog rather than gating the
          // menu client-side (the gating goes stale when a password is set
          // after the page loads).
          // Open the tab synchronously FIRST (dodges the popup blocker), then
          // navigate it once prepare returns.
          const win = openPlaceholderTab();
          try {
            const r = await api.consolePrepare({
              cluster_id: cid, node: vm.node, vmid: vm.vmid,
            });
            openConsoleTab(cid, vm, r.console_token, r.vnc_password, 'auto', win);
          } catch (e: unknown) {
            if (win && !win.closed) win.close();
            const msg = (e instanceof Error) ? e.message : String(e);
            await dialog.alert(t('console.prepare_failed', { err: msg }));
          }
        }}
        onRemoteMigrate={() => {
          if (!contextMenu.vm) return;
          setRemoteMigrateVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onOpenSnapshots={() => {
          if (!contextMenu.vm) return;
          setSnapshotVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onBackupNow={() => {
          if (!contextMenu.vm) return;
          setBackupVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onShowPerf={() => {
          if (!contextMenu.vm) return;
          setPerfVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onShowBackupHistory={() => {
          if (!contextMenu.vm) return;
          setBhistVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onShowConfig={() => {
          if (!contextMenu.vm) return;
          setCfgVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onShowFirewall={() => {
          if (!contextMenu.vm) return;
          setFwVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onEditTags={() => {
          if (!contextMenu.vm) return;
          setTagEditVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onClone={() => {
          if (!contextMenu.vm) return;
          setCloneVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onMigrate={() => {
          if (!contextMenu.vm) return;
          setMigrateVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onDelete={() => {
          if (!contextMenu.vm) return;
          setDeleteVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onExportFormat={(format) => {
          if (!contextMenu.vm) return;
          setExportReq({
            vm: contextMenu.vm,
            clusterId: contextMenu.clusterId,
            format,
          });
        }}
        onOpenSerialConsole={async () => {
          if (!contextMenu.vm) return;
          const vm = contextMenu.vm;
          const cid = contextMenu.clusterId;
          if (consoleMode === 'disabled') {
            await dialog.alert(t('console.disabled'));
            return;
          }
          // Open the tab synchronously FIRST (dodges the popup blocker).
          const win = openPlaceholderTab();
          try {
            const r = await api.consolePrepare({
              cluster_id: cid, node: vm.node, vmid: vm.vmid, kind: 'serial',
            });
            openConsoleTab(cid, vm, r.console_token, r.vnc_password, 'serial', win);
          } catch (e: unknown) {
            if (win && !win.closed) win.close();
            const msg = (e instanceof Error) ? e.message : String(e);
            await dialog.alert(t('console.prepare_failed', { err: msg }));
          }
        }}
        onConvertTemplate={async () => {
          const vm = contextMenu.vm;
          if (!vm) return;
          const ok = await dialog.confirm(
            t('vm.to_template_confirm_body')
              .replace('{kind}', vm.type === 'lxc' ? 'CT' : 'VM')
              .replace('{vmid}', String(vm.vmid)),
            { title: t('vm.to_template_confirm_title'), destructive: true }
          );
          if (!ok) return;
          try {
            const r = await fetch(
              `/api/clusters/${encodeURIComponent(contextMenu.clusterId)}/vms/${vm.vmid}/template`,
              { method: 'POST', credentials: 'same-origin' }
            );
            const d = await r.json().catch(() => ({}));
            if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
            await dialog.alert(`Template conversion submitted. PVE task: ${d.upid || '(no upid)'}`);
          } catch (e: any) {
            await dialog.alert(`Convert failed: ${e.message || e}`);
          }
        }}
        getNodeHealth={getNodeHealth}
        userRole={auth.user?.role_global ?? null}
        consoleMode={consoleMode}
        consolePasswordSet={!!clusterHasPassword[contextMenu.clusterId]}
        consoleCaps={consoleCaps}
      />

      {/* B3 confirmation modal for destructive power actions. Body is split
          into a leading template + an optional warning suffix, both i18n'd
          via interpolated keys so the modal reads correctly in zh-TW. */}
      <ConfirmModal
        open={pendingAction !== null}
        title={pendingAction ? actionTitle(pendingAction.action, t) : ''}
        destructive={pendingAction ? isDestructive(pendingAction.action) : false}
        details={pendingAction ? (
          <>
            {t(
              pendingAction.vm.type === 'lxc' ? 'confirm.about_to_ct' : 'confirm.about_to_vm',
              {
                action: actionTitle(pendingAction.action, t),
                vmid: String(pendingAction.vm.vmid),
                name: pendingAction.vm.name,
                node: pendingAction.vm.node,
                cluster: pendingAction.clusterId,
              },
            )}
            {pendingAction.action === 'stop' && (
              <><br /><br /><strong style={{ color: '#ff8a3c' }}>{t('confirm.hard_stop_warning')}</strong></>
            )}
          </>
        ) : null}
        confirmLabel={pendingAction ? actionTitle(pendingAction.action, t) : t('action.cancel')}
        onConfirm={confirmPowerAction}
        onCancel={() => setPendingAction(null)}
      />

      {/* Cross-cluster (remote) migrate wizard. Renders only when an operator
          has explicitly chosen a VM to migrate; we keep it mounted otherwise
          to avoid losing wizard state on re-renders. */}
      <RemoteMigrateModal
        open={remoteMigrateVm !== null}
        cluster_id={remoteMigrateVm?.clusterId || ''}
        vm={remoteMigrateVm ? {
          vmid: remoteMigrateVm.vm.vmid,
          name: remoteMigrateVm.vm.name,
          node: remoteMigrateVm.vm.node,
          type: remoteMigrateVm.vm.type,
        } : null}
        onClose={() => setRemoteMigrateVm(null)}
      />

      <VMCloneModal
        open={cloneVm !== null}
        clusterId={cloneVm?.clusterId || ''}
        vm={cloneVm?.vm || null}
        nodes={cloneVm && clusters ? Object.keys(clusters[cloneVm.clusterId]?.nodes || {}) : []}
        onClose={() => setCloneVm(null)}
      />
      <VMMigrateModal
        open={migrateVm !== null}
        clusterId={migrateVm?.clusterId || ''}
        vm={migrateVm?.vm || null}
        nodes={migrateVm && clusters ? Object.keys(clusters[migrateVm.clusterId]?.nodes || {}) : []}
        onClose={() => setMigrateVm(null)}
      />
      <VMDeleteModal
        open={deleteVm !== null}
        clusterId={deleteVm?.clusterId || ''}
        vm={deleteVm?.vm || null}
        onClose={() => setDeleteVm(null)}
      />

      {/* Snapshots modal — list, create, rollback, delete. */}
      <SnapshotsModal
        open={snapshotVm !== null}
        cluster_id={snapshotVm?.clusterId || ''}
        vm={snapshotVm ? {
          vmid: snapshotVm.vm.vmid,
          name: snapshotVm.vm.name,
          node: snapshotVm.vm.node,
          type: snapshotVm.vm.type,
        } : null}
        onClose={() => setSnapshotVm(null)}
      />

      {/* Ad-hoc backup modal — picks a backup-capable storage, then triggers vzdump. */}
      <BackupModal
        open={backupVm !== null}
        cluster_id={backupVm?.clusterId || ''}
        vm={backupVm ? {
          vmid: backupVm.vm.vmid,
          name: backupVm.vm.name,
          node: backupVm.vm.node,
          type: backupVm.vm.type,
        } : null}
        onClose={() => setBackupVm(null)}
      />

      <VMExportModal
        open={exportReq !== null}
        clusterId={exportReq?.clusterId || ''}
        node={exportReq?.vm.node || ''}
        vmid={exportReq?.vm.vmid || 0}
        vmName={exportReq?.vm.name || ''}
        format={exportReq?.format || 'ova'}
        vmStatus={exportReq?.vm.status}
        onClose={() => setExportReq(null)}
      />

      <RRDChartModal
        open={perfVm !== null}
        clusterId={perfVm?.clusterId || ''}
        node={perfVm?.vm.node || ''}
        vmid={perfVm?.vm.vmid}
        kind={perfVm?.vm.type === 'lxc' ? 'lxc' : 'qemu'}
        title={perfVm ? `${perfVm.vm.type === 'lxc' ? 'CT' : 'VM'} ${perfVm.vm.vmid} — ${perfVm.vm.name}` : ''}
        onClose={() => setPerfVm(null)}
      />

      <BackupHistoryModal
        open={bhistVm !== null}
        clusterId={bhistVm?.clusterId || ''}
        vmid={bhistVm?.vm.vmid || 0}
        vmName={bhistVm?.vm.name || ''}
        vmType={bhistVm?.vm.type === 'lxc' ? 'lxc' : 'qemu'}
        onClose={() => setBhistVm(null)}
      />

      <VMConfigModal
        open={cfgVm !== null}
        clusterId={cfgVm?.clusterId || ''}
        node={cfgVm?.vm.node || ''}
        vmid={cfgVm?.vm.vmid || 0}
        kind={cfgVm?.vm.type === 'lxc' ? 'lxc' : 'qemu'}
        title={cfgVm ? `${cfgVm.vm.type === 'lxc' ? 'CT' : 'VM'} ${cfgVm.vm.vmid} — ${cfgVm.vm.name}` : ''}
        canEdit={auth.user?.role_global === 'operator' || auth.user?.role_global === 'admin'}
        onClose={() => setCfgVm(null)}
      />

      <FirewallModal
        open={fwVm !== null}
        clusterId={fwVm?.clusterId || ''}
        scope="vm"
        vmid={fwVm?.vm.vmid}
        title={fwVm ? `${fwVm.vm.type === 'lxc' ? 'CT' : 'VM'} ${fwVm.vm.vmid} — ${fwVm.vm.name}` : ''}
        onClose={() => setFwVm(null)}
      />

      <TagEditorModal
        open={tagEditVm !== null}
        clusterId={tagEditVm?.clusterId || ''}
        vmid={tagEditVm?.vm.vmid || 0}
        currentTags={(tagEditVm?.vm as any)?.tags || ''}
        vmName={tagEditVm?.vm.name || ''}
        clusters={clusters || (cluster ? { [cluster.id]: cluster } : {})}
        onClose={() => setTagEditVm(null)}
      />

      {bulkTagOpen && (
        <BulkTagModal
          open={bulkTagOpen}
          onClose={() => setBulkTagOpen(false)}
          selected={(() => {
            const out: Array<{ clusterId: string; vm: VMMetrics }> = [];
            for (const key of selected) {
              const [cid, , vmidStr] = key.split('/');
              const vmid = parseInt(vmidStr, 10);
              if (!cid || !Number.isFinite(vmid)) continue;
              const vm = thumbVms.find((v) => (v.clusterId || cluster?.id) === cid && v.vmid === vmid);
              if (vm) out.push({ clusterId: cid, vm });
            }
            return out;
          })()}
          clusters={clusters || (cluster ? { [cluster.id]: cluster } : {})}
        />
      )}

      {/* Console password prompt (mode='prompt'). Posts the password to
          /api/console/prepare to mint a single-use console_token, then opens
          the cyberpunk noVNC frame in a new tab. Password is never persisted. */}
      <ConsolePasswordPrompt
        open={consolePromptVm !== null}
        cluster_id={consolePromptVm?.clusterId || ''}
        pveUser={(() => {
          const cid = consolePromptVm?.clusterId;
          if (!cid) return 'root@pam';
          const c = (clusters && clusters[cid]) || (cluster?.id === cid ? cluster : null);
          // Both branches used to return 'root@pam', so this read as if it
          // varied by cluster while telling every operator to type root's
          // password -- wrong instruction for any cluster configured with a
          // different PVE account. The summary now carries the real one.
          return c?.summary?.pve_user || 'root@pam';
        })()}
        onCancel={() => setConsolePromptVm(null)}
        onSubmit={async (password) => {
          if (!consolePromptVm) return;
          const { vm, clusterId } = consolePromptVm;
          // Open the tab synchronously before the await (popup-blocker dodge).
          const win = openPlaceholderTab();
          try {
            const r = await api.consolePrepare({
              cluster_id: clusterId, node: vm.node, vmid: vm.vmid, password,
            });
            openConsoleTab(clusterId, vm, r.console_token, r.vnc_password, 'auto', win);
          } catch (e: unknown) {
            if (win && !win.closed) win.close();
            const msg = (e instanceof Error) ? e.message : String(e);
            await dialog.alert(t('console.prepare_failed', { err: msg }));
          }
          setConsolePromptVm(null);
        }}
      />

      {/* Migration-failure toasts (Plan B). Stack bottom-right; each toast
          shows the source/target nodes and a one-click `qm unlock` copy
          since the lock can only be cleared as root@pam on the source. */}
      {migrationFailures.length > 0 && (
        <div className="mig-fail-stack">
          {migrationFailures.map((f) => {
            const cmd = `qm unlock ${f.vmid}`;
            return (
              <div key={f.id} className="mig-fail-toast">
                <div className="mig-fail-head">⚠ {t('mig.failed.title')}</div>
                <div className="mig-fail-body">
                  {t('mig.failed.body', {
                    vmid: f.vmid,
                    target: f.targetNode || '?',
                    lock: f.lock,
                  })}
                </div>
                <div className="mig-fail-cmd-line">
                  <span className="mig-fail-cmd-hint">{t('mig.failed.cmd_hint')} <code>{f.sourceNode}</code></span>
                </div>
                <div className="mig-fail-cmd-row">
                  <code className="mig-fail-cmd">{cmd}</code>
                  <button
                    className="mig-fail-btn"
                    onClick={() => {
                      navigator.clipboard?.writeText(cmd).then(() => {
                        setMigrationFailures((cur) =>
                          cur.map((x) => x.id === f.id ? { ...x, copied: true } : x));
                      });
                    }}
                  >
                    {f.copied ? t('mig.failed.copied') : t('mig.failed.copy')}
                  </button>
                </div>
                <button
                  className="mig-fail-dismiss"
                  onClick={() => setMigrationFailures((cur) => cur.filter((x) => x.id !== f.id))}
                  aria-label={t('mig.failed.dismiss')}
                >×</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      <div className="matrix-legend">
        <span className="legend-title">BORDER COLOR:</span>
        <div className="legend-item">
          <span className="legend-color success" />
          <span className="legend-label">&lt;80%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color warning" />
          <span className="legend-label">80-95%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color danger" />
          <span className="legend-label">&gt;95%</span>
        </div>
        <div className="legend-item">
          <span className="legend-color muted" />
          <span className="legend-label">Stopped</span>
        </div>
        <span className="legend-note">(max of CPU/MEM/DISK)</span>
        {viewMode === 'thumb' && (
          <span className="legend-thumb-refresh" title={
            language === 'zh-TW'
              ? '縮圖每 30 秒重新抓取一次（CPU / MEM 條跟著叢集 polling 即時更新）'
              : 'Thumbnails refresh every 30s (CPU / MEM bars update with cluster polling)'
          }>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6"/>
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
            </svg>
            {language === 'zh-TW' ? '縮圖更新：每 30 秒' : 'Thumb refresh: every 30s'}
          </span>
        )}
      </div>

      <style>{`
        .holo-matrix {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-xs) var(--spacing-lg);
          display: flex;
          flex-direction: column;
        }

        .holo-matrix.empty {
          align-items: center;
          justify-content: center;
        }

        .empty-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--text-secondary);
          font-family: var(--font-display);
        }

        /* Header */
        .matrix-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-lg);
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .matrix-title-section {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md);
        }

        .matrix-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .matrix-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }

        .matrix-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: matrixIconPulse 2s ease-in-out infinite;
        }

        @keyframes matrixIconPulse {
          0%, 100% { opacity: 0.8; transform: none; }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .matrix-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        .matrix-stats {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .stat-running {
          color: var(--success);
        }

        .stat-divider {
          margin: 0 var(--spacing-xs);
          color: var(--text-muted);
        }

        .matrix-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex-wrap: wrap;
          row-gap: 8px;
        }

        /* Inline grid cell-width slider (lives in the toolbar). */
        .grid-width-ctl {
          display: inline-flex; align-items: center; gap: 8px;
          height: 34px; box-sizing: border-box;
          padding: 0 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .grid-width-ctl .gw-icon svg { color: var(--text-muted); display: block; }
        .grid-width-ctl .gw-slider { width: 110px; }
        .grid-width-ctl .gw-val {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary); min-width: 26px; text-align: right;
        }

        /* All toolbar control GROUPS share one height so the search box,
           filter/sort/group strips and the view-mode toggle line up exactly
           (operator: the middle buttons must be the same height as the grid
           view buttons on the right). box-sizing so borders don't add up. */
        .matrix-controls > .search-box,
        .matrix-controls > .filter-tabs,
        .matrix-controls > .sort-selector,
        .matrix-controls > .view-toggle {
          height: 34px;
          box-sizing: border-box;
        }

        /* Vertical padding matches the filter-tabs strip (2px container
           + 4px button) so the search box sits at the same height as
           its toolbar neighbours. */
        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px var(--spacing-sm);
        }

        .search-box svg {
          color: var(--text-muted);
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          width: 75px;
        }

        .search-box input::placeholder {
          color: var(--text-muted);
        }

        .filter-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .filter-tab {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        /* Toolbar buttons NEVER wrap mid-label (CJK breaks per character
           otherwise). When the toolbar runs short of width the tb-lbl
           text collapses and icons carry the meaning — every button
           keeps its title attr for hover. */
        .filter-tab, .sort-btn, .sort-label, .thumb-type-btn {
          white-space: nowrap;
        }
        @media (max-width: 1560px) {
          .tb-lbl { display: none; }
          .sort-label { display: none; }
        }

        /* Inline icon used inside toolbar buttons (filter-tab / sort-btn /
           thumb-type-btn) and label spans. Inherits currentColor so it
           tints with the parent's hover/active state.
           NOTE: named .tb-ico (not .btn-icon) because App.tsx already
           uses a btn-icon class for icon-only header buttons; reusing
           that name here clobbered them. */
        .tb-ico, .label-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 12px; height: 12px;
          flex: 0 0 12px;
          opacity: 0.8;
          transition: opacity var(--transition-fast), filter var(--transition-fast);
        }
        .filter-tab.active .tb-ico,
        .sort-btn.active .tb-ico,
        .thumb-type-btn.active .tb-ico {
          opacity: 1;
          filter: drop-shadow(0 0 3px currentColor);
        }
        .label-icon {
          opacity: 0.7;
          color: var(--text-muted);
        }

        .filter-tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .filter-tab.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: none;
        }

        /* Disabled state — applied to whole group when the current view
           mode forces a fixed filter (e.g. thumbnail mode = running only). */
        .filter-tabs.is-disabled {
          opacity: 0.4;
          filter: grayscale(0.6);
        }
        .filter-tab:disabled {
          cursor: not-allowed;
          color: var(--text-muted);
          background: transparent;
          text-shadow: none;
        }
        .filter-tab:disabled:hover {
          background: transparent;
          color: var(--text-muted);
        }

        /* Sort Selector */
        .sort-selector {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .sort-label {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-right: 2px;
        }

        .sort-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        .sort-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .sort-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: none;
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          gap: 2px;
          background: var(--bg-tertiary);
          padding: 2px;
          border-radius: var(--radius-sm);
        }

        /* Thumbnail-size slider — sits in its own row below the toolbar
           (see JSX). Anchored to the LEFT so it never pushes existing
           toolbar buttons around when thumb mode is toggled on. */
        .thumb-size-row {
          padding: 6px var(--spacing-md) 0;
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        /* Type filter — segmented buttons (All | VM | CT) sitting between
           the size slider and prefer-content toggle. Same cyberpunk pill
           styling as filter-tabs. */
        .thumb-type-filter {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 2px 4px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
        }
        .thumb-type-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .thumb-type-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .thumb-type-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: none;
        }

        /* "Prefer with content" toggle, sits to the right of the slider. */
        .thumb-prefer-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .thumb-prefer-btn:hover {
          color: var(--text-primary);
          border-color: rgba(0, 240, 255, 0.4);
        }
        .thumb-prefer-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.12);
          border-color: var(--primary);
          text-shadow: none;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.18);
        }
        .thumb-size {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
        }
        .thumb-size-label {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .thumb-size-val {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--primary);
          min-width: 48px;
          text-align: right;
        }
        .thumb-build-stamp {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          opacity: .55;
          margin-left: 6px;
          letter-spacing: 0.04em;
        }
        .thumb-size-slider {
          width: 130px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: var(--bg-primary);
          border-radius: 2px;
          outline: none;
        }
        .thumb-size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px; height: 14px;
          background: var(--primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
        }
        .thumb-size-slider::-moz-range-thumb {
          width: 14px; height: 14px;
          background: var(--primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
          border: none;
        }

        /* Thumbnail grid view. Outer container handles scroll; cards
           are inside .thumb-group-cards which is the actual flex-wrap
           row. Group headers (.thumb-group-header) appear above each
           row when group-by != none. */
        .matrix-thumb-grid {
          flex: 1;
          overflow: auto;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .thumb-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        /* Group header — designed to be unmistakable at a glance.
           Corner brackets + thick gradient bar + uppercase title with
           glow + count chip. Sticky-positioned so the label stays
           visible while the cards under it scroll. */
        .thumb-group-header {
          position: sticky;
          top: 0;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: linear-gradient(90deg,
            rgba(0,240,255,0.18) 0%,
            rgba(0,240,255,0.08) 35%,
            rgba(0,240,255,0.02) 100%);
          border-top: 1px solid rgba(0,240,255,0.45);
          border-bottom: 1px solid rgba(0,240,255,0.45);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        /* Cyber corner brackets — small angled accent at each end of
           the header bar. */
        .thumb-group-bracket {
          position: relative;
          width: 14px;
          height: 16px;
          flex: 0 0 14px;
        }
        .thumb-group-bracket.left::before,
        .thumb-group-bracket.left::after,
        .thumb-group-bracket.right::before,
        .thumb-group-bracket.right::after {
          content: '';
          position: absolute;
          background: var(--primary);
          box-shadow: 0 0 6px rgba(0,240,255,0.7);
        }
        .thumb-group-bracket.left::before  { top: 0; left: 0; width: 8px; height: 2px; }
        .thumb-group-bracket.left::after   { top: 0; left: 0; width: 2px; height: 10px; }
        .thumb-group-bracket.right::before { bottom: 0; right: 0; width: 8px; height: 2px; }
        .thumb-group-bracket.right::after  { bottom: 0; right: 0; width: 2px; height: 10px; }

        .thumb-group-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow:
            0 0 8px rgba(0,240,255,0.7),
            0 0 16px rgba(0,240,255,0.35);
          white-space: nowrap;
        }
        .thumb-group-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          height: 22px;
          padding: 0 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          background: rgba(0,240,255,0.10);
          border: 1px solid rgba(0,240,255,0.5);
          border-radius: 11px;
          box-shadow: inset 0 0 4px rgba(0,240,255,0.2);
        }
        /* The thin double rule that fills the rest of the header — gives
           the title a "label on a separator" feel rather than floating. */
        .thumb-group-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg,
            rgba(0,240,255,0.6) 0%,
            rgba(0,240,255,0.2) 60%,
            transparent 100%);
          box-shadow: 0 2px 0 rgba(0,240,255,0.15);
        }
        .thumb-group-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-content: flex-start;
          justify-content: flex-start;
        }
        /* Visual de-emphasis for blank thumbs when prefer-content is on
           (they're already last in DOM order from the sort). */
        .vm-thumb-card.is-blank {
          opacity: 0.78;
        }
        .vm-thumb-card.is-blank:hover {
          opacity: 1;
        }
        .vm-thumb-card {
          /* Plain block layout. Earlier flex-column attempt interacted
             badly with grid auto-row sizing at larger thumb widths.
             Uses canonical gradient + radius to match the rest of the
             cyberpunk panel cards across the app. */
          position: relative;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: border-color .15s, transform .15s, box-shadow .15s;
        }
        .vm-thumb-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.5;
          pointer-events: none;
          z-index: 2;
        }
        .vm-thumb-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(0, 240, 255, 0.22),
                      0 0 0 1px rgba(0, 240, 255, 0.18);
        }
        .vm-thumb-card.status-stopped { opacity: .65; }
        .vm-thumb-card.status-stopped .vm-thumb-image { background: #02050b; }
        .vm-thumb-image {
          /* Height is set inline by React: style={{height: thumbSize*9/16}}.
             We deliberately don't set any CSS height — that way inline
             style is the single source of truth and there's nothing to
             override. */
          position: relative;
          width: 100%;
          background: #000;
          border-bottom: 1px solid rgba(0, 240, 255, 0.12);
          overflow: hidden;
        }
        .vm-thumb-image > .vm-thumb-loading,
        .vm-thumb-image > img {
          position: absolute;
          inset: 0;
        }
        .vm-thumb-image img {
          width: 100%; height: 100%;
          object-fit: contain;
          background: #000;
          opacity: 0;
          transition: opacity .25s ease;
        }
        .vm-thumb-image[data-loaded="1"] img { opacity: 1; }
        .vm-thumb-image[data-error="1"] img { opacity: 0; }
        .vm-thumb-image[data-loaded="1"] .vm-thumb-loading { display: none; }
        .vm-thumb-image[data-error="1"] .vm-thumb-loading { display: none; }
        /* Per-thumb "no signal" loader. Look-and-feel: a CRT showing
           static — animated noise (SVG feTurbulence), faint horizontal
           scanlines on top, dark vignette around the edges, plus a
           flickering "NO SIGNAL / 訊號接收中" label. Three layers, no
           keyframe-heavy elements per thumb (the noise is a single
           global filter referenced via url()). */
        .vm-thumb-loading {
          position: absolute; inset: 0;
          background: #02050b;
          overflow: hidden;
          z-index: 1;
        }
        .vtl-fill {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          display: block;
        }
        /* Horizontal scanlines on top of the noise — gives the static
           a CRT character instead of generic film grain. */
        .vtl-scanlines {
          position: absolute; inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0)        0px,
            rgba(0, 0, 0, 0)        2px,
            rgba(0, 0, 0, 0.45)     3px,
            rgba(0, 0, 0, 0.45)     4px);
          mix-blend-mode: multiply;
        }
        /* Edge vignette — old monitor / signal-loss look. */
        .vtl-vignette {
          position: absolute; inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(0, 0, 0, 0.55) 100%);
        }
        /* Flicker label centered. The animation jiggles opacity + tiny
           horizontal shift to mimic VHS tracking error. */
        .vtl-text {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          color: rgba(0, 240, 255, 0.95);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-shadow:
            -1px 0 rgba(255, 60, 60, 0.55),
             1px 0 rgba(60, 255, 200, 0.55),
             0 0 8px rgba(0, 240, 255, 0.6);
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(0, 240, 255, 0.4);
          white-space: nowrap;
          animation: vtlFlicker 2.4s steps(1) infinite;
        }
        @keyframes vtlFlicker {
          0%, 12%, 14%, 38%, 42%, 60%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          13% { opacity: 0.4; transform: translate(calc(-50% + 1px), -50%); }
          40% { opacity: 0.2; transform: translate(calc(-50% - 1px), -50%); }
          61% { opacity: 0.6; transform: translate(-50%, calc(-50% + 1px)); }
        }
        .vm-thumb-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.05em;
        }
        .vm-thumb-meta {
          padding: 8px 10px;
          background: #0d1320;
          border-top: 1px solid rgba(0, 240, 255, 0.18);
          /* Min-height so meta is always visible even before bars compute */
          min-height: 56px;
          display: block;
        }
        /* Click-to-zoom preview modal — cyberpunk hologram entrance:
           backdrop fades in, frame scales up with cyan glow, scan-line
           sweeps across once, corner brackets fade in. Same visual
           language as the cluster-selector / lang-menu / context-menu. */
        .thumb-preview-overlay {
          /* Leave room for the app's topbar (~64px) at the top so the
             preview frame never sits behind it, and a small gutter at the
             bottom so its border stays visible. The frame's max-w/max-h
             below are 100% of THIS padded box, never exceeding it. */
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, .82);
          backdrop-filter: blur(6px);
          z-index: 500;
          display: flex; align-items: center; justify-content: center;
          padding: 80px 24px 32px;
          animation: tpFade .2s ease;
        }
        @keyframes tpFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tpHologramIn {
          0%   { opacity: 0; transform: scale(.92); filter: brightness(1.6); }
          60%  { opacity: 1; transform: scale(1.005); filter: brightness(1.15); }
          100% { opacity: 1; transform: none; filter: none; }
        }
        @keyframes tpScanLine {
          0%   { transform: translateY(-110%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes tpEdgePulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(0, 240, 255, .12),
              0 16px 60px rgba(0, 0, 0, .65),
              0 0 80px -20px rgba(0, 240, 255, .55),
              0 0 24px -6px rgba(0, 240, 255, .35);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(0, 240, 255, .25),
              0 16px 60px rgba(0, 0, 0, .65),
              0 0 100px -10px rgba(0, 240, 255, .75),
              0 0 36px -4px rgba(0, 240, 255, .55);
          }
        }
        .thumb-preview-frame {
          position: relative;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: 8px;
          /* Sized relative to the OVERLAY's content area (which has top
             padding of 80px = below topbar, bottom 32px = above edge).
             100% of that box = never overlaps topbar, never bleeds off
             the bottom of the viewport. */
          max-width: 100%;
          max-height: 100%;
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: tpHologramIn .35s cubic-bezier(.2, .9, .3, 1.1) both,
                     tpEdgePulse 3s ease-in-out 0.4s infinite;
        }
        /* Scan-line sweep over the modal once on entry */
        .thumb-preview-frame::before {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 30%;
          top: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 240, 255, 0) 30%,
            rgba(0, 240, 255, .18) 50%,
            rgba(0, 240, 255, 0) 70%,
            transparent 100%);
          pointer-events: none;
          animation: tpScanLine 1.2s ease-out .15s 1 both;
          z-index: 2;
        }
        /* Corner brackets — pure CSS, fade in after frame */
        .thumb-preview-frame::after {
          content: '';
          position: absolute; inset: 6px;
          pointer-events: none;
          border: 1px solid transparent;
          border-image: linear-gradient(135deg,
            rgba(0, 240, 255, .55) 0%, rgba(0, 240, 255, .55) 8%,
            transparent 8%, transparent 92%,
            rgba(0, 240, 255, .55) 92%, rgba(0, 240, 255, .55) 100%) 1;
          opacity: 0;
          animation: tpFade .4s ease .35s forwards;
          z-index: 3;
        }
        .thumb-preview-titlebar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(0, 240, 255, .25);
          font-family: var(--font-display);
          background: rgba(0, 240, 255, .06);
          position: relative; z-index: 4;
        }
        .thumb-preview-name {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; letter-spacing: .04em;
          color: var(--text-primary);
        }
        .thumb-preview-id {
          font-family: var(--font-mono);
          color: var(--text-muted);
          font-size: 12px;
        }
        .thumb-preview-node {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-left: 8px;
        }
        .thumb-preview-close {
          background: transparent;
          border: 1px solid rgba(0, 240, 255, .3);
          color: var(--text-muted);
          font-size: 20px; line-height: 1;
          width: 28px; height: 28px;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all .12s ease;
        }
        .thumb-preview-close:hover {
          color: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 8px rgba(0, 240, 255, .4);
        }
        /* Image container — keeps the framebuffer letterboxed inside
           the modal regardless of the source's native aspect (text
           terminals 720x40, full HD 1920x1080, etc.) */
        .thumb-preview-body {
          flex: 1 1 auto;
          min-height: 0; min-width: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 12px;
          background: #000;
          position: relative; z-index: 1;
          overflow: hidden;
        }
        /* While the image is loading, the <img> has no intrinsic size
           and the absolutely-positioned loader has nothing to fill.
           Give the body a sensible 16:9 viewport so the loader is the
           full size of where the framebuffer will land. The min() caps
           prevent overflow on narrow viewports. */
        .thumb-preview-body:not([data-loaded="1"]) {
          min-width: min(960px, calc(100vw - 80px));
          min-height: min(540px, calc(100vh - 192px));
        }
        .thumb-preview-body img {
          /* Constrain to the BODY (= the flex container's actual size)
             rather than viewport units. The previous viewport-units
             approach over-estimated padding + titlebar height and let
             the image render slightly taller than the body, which the
             frame's overflow:hidden then cropped at top + bottom.
             100% of the body is always exact regardless of titlebar
             height variation or scrollbar reservation. */
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0;
          transition: opacity 280ms ease-out;
          position: relative;
          z-index: 2;
        }
        /* When the parent has data-loaded=1 (set by img onLoad), fade
           the image in and hide the loader. Pre-load the loader covers
           the whole body so there's no flash of empty modal. */
        .thumb-preview-body[data-loaded="1"] img {
          opacity: 1;
        }
        .thumb-preview-body[data-loaded="1"] .thumb-preview-loader {
          opacity: 0;
          pointer-events: none;
        }
        /* ----- thumb preview loader ---------------------------------- */
        .thumb-preview-loader {
          position: absolute;
          inset: 12px;
          z-index: 1;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 30, 50, 0.4) 0%,
            #000 70%);
          overflow: hidden;
          border-radius: 4px;
          opacity: 1;
          transition: opacity 220ms ease-out;
        }
        /* Faint cyber grid backdrop. Pure CSS — no images. */
        .tpl-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0, 240, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
          animation: tplGrid 6s linear infinite;
        }
        @keyframes tplGrid {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(32px, 32px); }
        }
        /* Vertical scan bar that bounces top-to-bottom. */
        .tpl-scan {
          position: absolute;
          left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.5) 20%,
            rgba(0, 240, 255, 1) 50%,
            rgba(0, 240, 255, 0.5) 80%,
            transparent 100%);
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.7),
            0 0 32px rgba(0, 240, 255, 0.4);
          top: 0;
          animation: tplScan 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite alternate;
        }
        @keyframes tplScan {
          0%   { top: -3px; }
          100% { top: calc(100% - 3px); }
        }
        /* Pulsing rotating ring at center. Two rings rotating in
           opposite directions for a "scanning radar" feel. */
        .tpl-ring {
          position: absolute;
          left: 50%; top: 50%;
          width: 92px; height: 92px;
          margin-left: -46px; margin-top: -46px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: rgba(0, 240, 255, 0.95);
          border-right-color: rgba(0, 240, 255, 0.45);
          box-shadow:
            0 0 16px rgba(0, 240, 255, 0.5),
            inset 0 0 16px rgba(0, 240, 255, 0.18);
          animation: tplSpin 1.2s linear infinite;
        }
        .tpl-ring::before,
        .tpl-ring::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .tpl-ring::before {
          inset: 8px;
          border-bottom-color: rgba(0, 240, 255, 0.7);
          border-left-color:  rgba(0, 240, 255, 0.3);
          animation: tplSpin 0.9s linear reverse infinite;
        }
        .tpl-ring::after {
          inset: 18px;
          border-top-color:   rgba(0, 240, 255, 0.6);
          animation: tplPulse 1.4s ease-in-out infinite;
        }
        @keyframes tplSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes tplPulse {
          0%, 100% { transform: none;   opacity: 0.6; }
          50%      { transform: scale(1.2); opacity: 1;   }
        }
        /* Cyber corner brackets at each corner. */
        .tpl-corner {
          position: absolute;
          width: 22px; height: 22px;
          border: 2px solid rgba(0, 240, 255, 0.85);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }
        .tpl-corner.tl { top: 8px;    left: 8px;    border-right: 0; border-bottom: 0; }
        .tpl-corner.tr { top: 8px;    right: 8px;   border-left: 0;  border-bottom: 0; }
        .tpl-corner.bl { bottom: 8px; left: 8px;    border-right: 0; border-top: 0;    }
        .tpl-corner.br { bottom: 8px; right: 8px;   border-left: 0;  border-top: 0;    }
        /* Status text + animated dots. Sits CLEAR of the ring (92px
           tall, so we offset by half-height + a comfortable 24px gap
           = 70px below the parent's 50% line). */
        .tpl-status {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, 70px);
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow:
            0 0 8px rgba(0, 240, 255, 0.7),
            0 0 16px rgba(0, 240, 255, 0.3);
          white-space: nowrap;
        }
        .tpl-dots {
          display: inline-flex;
          gap: 4px;
        }
        .tpl-dots i {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.4);
          box-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
          animation: tplDot 1.2s ease-in-out infinite;
        }
        .tpl-dots i:nth-child(2) { animation-delay: 0.2s; }
        .tpl-dots i:nth-child(3) { animation-delay: 0.4s; }
        @keyframes tplDot {
          0%, 100% { opacity: 0.3; transform: none;   }
          50%      { opacity: 1;   transform: scale(1.4); }
        }
        /* Error path. */
        .thumb-preview-body[data-error="1"] .thumb-preview-loader {
          background: radial-gradient(ellipse at center,
            rgba(80, 0, 0, 0.5) 0%, #000 70%);
        }
        .thumb-preview-body[data-error="1"] .tpl-status::after {
          content: ' — FAILED';
          color: #ff6464;
        }
        .vm-thumb-title {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 6px;
        }
        .vm-thumb-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        .vm-thumb-name {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-primary);
          letter-spacing: 0.05em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 0;
        }
        .vm-thumb-bars {
          display: flex; flex-direction: column; gap: 4px;
        }
        .vm-thumb-bar {
          display: flex; align-items: center; gap: 6px;
        }
        .vm-thumb-bar-label {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-secondary);
          width: 28px;
          letter-spacing: 0.05em;
        }
        .vm-thumb-bar-val {
          font-family: var(--font-mono);
          font-size: 11px;
          min-width: 40px;
          text-align: right;
        }

        .view-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: var(--spacing-xs) 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .view-btn-lbl {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        /* Icon-only when the toolbar gets cramped. */
        @media (max-width: 1280px) {
          .view-btn-lbl { display: none; }
          .view-btn { padding: var(--spacing-xs); }
        }

        /* Column picker popover (table view) */
        .col-picker-wrap { position: relative; }
        .col-picker {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          z-index: 500;
          min-width: 180px;
          padding: 6px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid var(--primary);
          border-radius: var(--radius-sm);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 240, 255, 0.2);
          display: flex;
          flex-direction: column;
          animation: ctx-menu-in 0.12s ease-out;
        }
        @keyframes ctx-menu-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: none; }
        }
        .col-picker-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
          cursor: pointer;
          border-radius: 3px;
        }
        .col-picker-row:hover { background: rgba(0, 240, 255, 0.08); }
        .col-picker-row input { accent-color: var(--primary); }
        .col-picker-reset {
          margin-top: 4px;
          padding: 5px 10px;
          background: transparent;
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: 3px;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .col-picker-reset:hover { color: var(--primary); border-color: var(--primary); }
        .num-cell { font-variant-numeric: tabular-nums; white-space: nowrap; }

        .view-btn:hover {
          color: var(--text-primary);
        }

        .view-btn.active {
          background: var(--bg-card);
          color: var(--primary);
        }

        /* Content */
        .matrix-content {
          flex: 1;
          display: flex;
          gap: var(--spacing-lg);
          min-height: 0;
        }

        .matrix-grid {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          position: relative;
        }

        /* Migration lines SVG overlay */
        .migration-lines-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          overflow: visible;
        }

        .migration-line {
          stroke-dasharray: 8 4;
          animation: migrationLineDash 0.5s linear infinite;
        }

        @keyframes migrationLineDash {
          to {
            stroke-dashoffset: -12;
          }
        }

        .migration-particle {
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* Incoming migration count badge */
        .incoming-count {
          color: var(--accent);
          font-size: 12px;
          animation: incomingPulse 1.5s ease-in-out infinite;
        }

        @keyframes incomingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Node Section */
        .node-section {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm) var(--spacing-md);
        }

        .node-section.ghost-only {
          border-color: var(--accent);
          border-style: dashed;
          background: rgba(224, 102, 255, 0.05);
          animation: ghostSectionPulse 2s ease-in-out infinite;
        }

        @keyframes ghostSectionPulse {
          0%, 100% { border-color: var(--accent); }
          50% { border-color: var(--primary); }
        }

        .node-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-xs);
          border-bottom: 1px solid var(--border);
        }

        .node-section-name {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .node-section-count {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #ffffff;
        }

        /* VM Grid */
        .vm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(${cardWidth}px, 1fr));
          gap: var(--spacing-xs);
        }

        .vm-cell {
          cursor: pointer;
          opacity: 0;
          animation-name: vm-materialize;
          animation-duration: 0.4s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }

        @keyframes vm-materialize {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(15px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Sort by load animations - disable entry animation, show immediately */
        .vm-grid.sort-by-load .vm-cell {
          animation: none !important;
          opacity: 1 !important;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        @keyframes load-reorder {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: none;
            opacity: 1;
          }
        }

        .vm-grid.sort-by-load .vm-cell {
          animation: load-reorder 0.3s ease-out;
        }

        .vm-cell-inner {
          width: 100%;
          height: 100%;
          min-height: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: var(--spacing-xs);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        /* VM vs CT marker — small corner tag so guest kind is distinguishable
           at a glance (cyan = VM/QEMU, violet = CT/LXC). */
        .vm-type-tag {
          position: absolute;
          top: 2px; left: 3px;
          font-family: var(--font-display);
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.06em;
          line-height: 1;
          padding: 1px 2px;
          border-radius: 2px;
          z-index: 2;
          pointer-events: none;
          opacity: 0.85;
        }
        .vm-type-tag.vm { color: #00f0ff; background: rgba(0, 240, 255, 0.12); }
        .vm-type-tag.ct { color: #c08bff; background: rgba(180, 100, 255, 0.14); }
        .vm-cell.stopped .vm-type-tag { opacity: 0.4; }

        /* Holographic scan line effect on entry */
        .vm-cell-inner::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.8), transparent);
          animation: vm-scan-line 0.6s ease-out var(--anim-delay) forwards;
          opacity: 0;
        }

        @keyframes vm-scan-line {
          0% {
            top: -10%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }

        .vm-cell:hover .vm-cell-inner {
          transform: scale(1.05);
          z-index: 1;
        }

        .vm-cell.selected .vm-cell-inner {
          border-color: var(--primary);
          box-shadow: var(--primary-glow);
        }

        .vm-cell.running .vm-cell-inner.success {
          border-color: var(--success);
          background: rgba(0, 255, 136, 0.1);
        }

        /* PERF: warning/danger cells previously ran an INFINITE box-shadow
           pulse (warning-pulse / danger-pulse). Animating a multi-layer
           box-shadow forces a full repaint every frame; with 100+ VMs and
           many in warning/danger that pinned the CPU/GPU and made the whole
           machine sluggish. Use a STATIC glow instead — painted once, zero
           per-frame cost — colour still distinguishes the state. */
        .vm-cell.running .vm-cell-inner.warning {
          border-color: var(--warning);
          background: rgba(255, 107, 0, 0.1);
          box-shadow: 0 0 6px rgba(255, 149, 0, 0.35);
        }

        .vm-cell.running .vm-cell-inner.danger {
          border-color: var(--danger-text);
          background: rgba(255, 0, 64, 0.1);
          box-shadow: 0 0 7px rgba(255, 0, 64, 0.45);
        }

        /* Danger cells blink red again — but the GPU-cheap way: a static
           inset-glow overlay whose OPACITY animates. Opacity is composited
           (no per-frame repaint), so this stays smooth with 100+ cells,
           unlike the old box-shadow keyframes that pinned the CPU. */
        .vm-cell.running .vm-cell-inner.danger::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 14px rgba(255, 0, 64, 0.85), inset 0 0 4px rgba(255, 0, 64, 0.9);
          pointer-events: none;
          animation: dangerBlinkCheap 1s ease-in-out infinite;
          will-change: opacity;
        }
        @keyframes dangerBlinkCheap {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 1; }
        }
        body[data-app-visible="false"] .vm-cell-inner.danger::after { animation: none; }

        .vm-cell.stopped .vm-cell-inner {
          opacity: 0.4;
        }

        .vm-name {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.2;
          word-break: break-all;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .vm-cell.running .vm-name {
          color: var(--text-primary);
        }

        .vm-id {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--primary-dim);
        }

        .vm-cell.running .vm-id {
          color: var(--primary);
        }

        /* Task indicator on grid cells */
        .vm-cell.has-task {
          position: relative;
        }

        .vm-cell.has-task .vm-cell-inner {
          border-color: var(--accent);
          background: rgba(224, 102, 255, 0.1);
        }

        .vm-task-icon {
          position: absolute;
          top: 2px;
          right: 4px;
          font-size: 13px;
          color: var(--accent);
          animation: taskSpin 2s linear infinite;
        }

        @keyframes taskSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .vm-task-label {
          position: absolute;
          top: -8px;
          left: -4px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border: 1px solid;
          border-radius: 3px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          z-index: 15;
          background: #0a1520;
        }

        @keyframes taskLabelPulse {
          0%, 100% {
            opacity: 0.9;
            transform: none;
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .vm-task-ring {
          position: absolute;
          inset: -3px;
          border: 2px solid var(--accent);
          border-radius: var(--radius-sm);
          opacity: 0.6;
          animation: taskPulse 1.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes taskPulse {
          0%, 100% {
            transform: none;
            opacity: 0.6;
            box-shadow: 0 0 8px var(--accent);
          }
          50% {
            transform: scale(1.03);
            opacity: 0.9;
            box-shadow: 0 0 15px var(--accent), 0 0 25px rgba(224, 102, 255, 0.3);
          }
        }

        /* Backup specific styles - Orange color */
        .vm-cell.backup {
          position: relative;
          z-index: 10;
        }

        .vm-cell.backup .vm-cell-inner {
          border-color: #ff9500;
          border-width: 2px;
          background: linear-gradient(135deg, rgba(255, 149, 0, 0.2) 0%, rgba(255, 120, 0, 0.15) 100%);
          animation: backupPulse 1.5s ease-in-out infinite;
        }

        @keyframes backupPulse {
          0%, 100% {
            box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.4), inset 0 0 15px rgba(255, 149, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 20px #ff9500, 0 0 40px rgba(255, 149, 0, 0.5), inset 0 0 25px rgba(255, 149, 0, 0.2);
          }
        }

        .vm-cell.backup .vm-name,
        .vm-cell.backup .vm-id {
          color: #ff9500;
          text-shadow: 0 0 8px rgba(255, 149, 0, 0.6);
        }

        .vm-backup-icon {
          position: absolute;
          top: 2px;
          right: 4px;
          font-size: 15px;
          color: #ff9500;
          text-shadow: 0 0 10px #ff9500;
          animation: backupIconPulse 0.8s ease-in-out infinite;
        }

        @keyframes backupIconPulse {
          0%, 100% {
            opacity: 1;
            transform: none;
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        .backup-ring {
          position: absolute;
          inset: -4px;
          border: 2px solid #ff9500;
          border-radius: var(--radius-sm);
          animation: backupRingPulse 1.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes backupRingPulse {
          0%, 100% {
            transform: none;
            opacity: 0.8;
            box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.3);
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
            box-shadow: 0 0 20px #ff9500, 0 0 40px rgba(255, 149, 0, 0.5);
          }
        }

        .backup-scanner {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: var(--radius-sm);
          pointer-events: none;
        }

        .backup-scanner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #ff9500, #ffb740, #ff9500, transparent);
          animation: backupScan 1.5s linear infinite;
          box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.8);
        }

        @keyframes backupScan {
          0% {
            top: 0;
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0.3;
          }
        }

        .backup-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
        }

        .backup-particles .bp {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ff9500;
          border-radius: 50%;
          box-shadow: 0 0 6px #ff9500, 0 0 12px rgba(255, 149, 0, 0.8);
        }

        .backup-particles .bp1 {
          top: 20%;
          right: -8px;
          animation: backupParticle 1.2s ease-out infinite;
        }

        .backup-particles .bp2 {
          top: 50%;
          right: -8px;
          animation: backupParticle 1.2s ease-out 0.3s infinite;
        }

        .backup-particles .bp3 {
          top: 80%;
          right: -8px;
          animation: backupParticle 1.2s ease-out 0.6s infinite;
        }

        .backup-particles .bp4 {
          top: 50%;
          left: -8px;
          animation: backupParticleLeft 1.2s ease-out 0.4s infinite;
        }

        @keyframes backupParticle {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(20px) scale(0);
            opacity: 0;
          }
        }

        @keyframes backupParticleLeft {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-20px) scale(0);
            opacity: 0;
          }
        }

        /* Migration specific styles - Source VM */
        .vm-cell.migrating {
          position: relative;
          z-index: 10;
        }

        .vm-cell.migrating .vm-cell-inner {
          border-color: #00f0ff;
          border-width: 2px;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 180, 220, 0.25) 100%);
          animation: migrateSourcePulse 1.2s ease-in-out infinite;
        }

        @keyframes migrateSourcePulse {
          0%, 100% {
            box-shadow: 0 0 8px #00f0ff, 0 0 16px rgba(0, 240, 255, 0.4), inset 0 0 12px rgba(0, 240, 255, 0.15);
          }
          50% {
            box-shadow: 0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.25);
          }
        }

        .vm-cell.migrating .vm-name,
        .vm-cell.migrating .vm-id {
          color: #00f0ff;
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
        }

        .vm-migrate-icon {
          position: absolute;
          top: 50%;
          right: -10px;
          transform: translateY(-50%);
          z-index: 5;
        }

        .migrate-arrow {
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
          color: #00f0ff;
          text-shadow: 0 0 12px #00f0ff, 0 0 24px #00f0ff;
          animation: arrowPulse 0.6s ease-in-out infinite;
        }

        @keyframes arrowPulse {
          0%, 100% { transform: none; opacity: 1; }
          50% { transform: translateX(5px) scale(1.1); opacity: 0.8; }
        }

        .migrate-ring {
          position: absolute;
          inset: -5px;
          border: 2px solid #00f0ff;
          border-radius: var(--radius-sm);
          animation: migrateRingSpin 3s linear infinite;
          pointer-events: none;
          background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg 30deg,
            rgba(0, 240, 255, 0.15) 30deg 60deg
          );
        }

        @keyframes migrateRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .migrate-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00f0ff;
          border-radius: 50%;
          box-shadow: 0 0 6px #00f0ff, 0 0 12px #00f0ff;
        }

        .particle.p1 {
          top: 15%;
          animation: particleFlow 1.2s linear infinite;
        }

        .particle.p2 {
          top: 50%;
          animation: particleFlow 1.2s linear infinite 0.4s;
        }

        .particle.p3 {
          top: 85%;
          animation: particleFlow 1.2s linear infinite 0.8s;
        }

        @keyframes particleFlow {
          0% {
            left: -5px;
            opacity: 0;
            transform: scale(0.3);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            left: calc(100% + 15px);
            opacity: 0;
            transform: scale(0.3);
          }
        }

        .migrate-target-label {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: #00f0ff;
          white-space: nowrap;
          text-shadow: 0 0 8px #00f0ff;
          padding: 2px 6px;
          background: rgba(0, 20, 40, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 3px;
        }

        /* Ghost cell for migration target */
        .vm-cell.ghost {
          opacity: 1;
          pointer-events: none;
        }

        .vm-cell.ghost .vm-cell-inner {
          border: 2px dashed #00ff88;
          background: rgba(0, 255, 136, 0.08);
          animation: ghostMaterialize 1.5s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.3), inset 0 0 15px rgba(0, 255, 136, 0.1);
        }

        .vm-cell.ghost .vm-name,
        .vm-cell.ghost .vm-id {
          color: #00ff88;
          opacity: 0.7;
        }

        @keyframes ghostMaterialize {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.97);
            border-color: rgba(0, 255, 136, 0.5);
          }
          50% {
            opacity: 0.9;
            transform: scale(1);
            border-color: rgba(0, 255, 136, 1);
          }
        }

        /* Incoming badge on ghost — rendered as a real DOM node so we can
           append a live progress percentage. Styling matches the MIGRATE
           source-side label so the two badges sit symmetrically across
           source and destination cells. */
        .vm-incoming-label {
          position: absolute;
          top: -8px;
          right: -4px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          color: #00ff88;
          background: #0a1520;
          padding: 2px 5px;
          border: 1px solid #00ff88;
          border-radius: 3px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          z-index: 15;
          text-shadow: 0 0 4px #00ff88;
          animation: incomingPulse 1s ease-in-out infinite;
        }
        .vm-incoming-label .vm-task-progress {
          margin-left: 3px;
          color: #c8ffe1;
          text-shadow: 0 0 3px rgba(0, 255, 136, 0.7);
        }
        .vm-task-label .vm-task-progress {
          margin-left: 3px;
          opacity: 0.9;
        }

        @keyframes incomingPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Completing migration - source fading out */
        .vm-cell.completing {
          pointer-events: none;
          animation: completingFadeOut 1.5s ease-out forwards;
        }

        .vm-cell.completing .vm-cell-inner {
          border-color: rgba(0, 240, 255, 0.3);
          background: rgba(0, 240, 255, 0.05);
        }

        .vm-cell.completing .vm-name,
        .vm-cell.completing .vm-id {
          color: rgba(0, 240, 255, 0.4);
        }

        @keyframes completingFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          30% {
            opacity: 0.8;
            transform: scale(0.98);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        /* Completing line animation */
        .completing-line {
          stroke-linecap: round;
        }

        .vm-cell.stopped .vm-id {
          color: var(--text-muted);
        }

        /* Detail Panel */
        .vm-detail-panel {
          /* Width bumped from 320 → 360 so the larger font size doesn't
             overflow the row labels ("MEMORY", "DISKIO") into the values. */
          width: 360px;
          flex-shrink: 0;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          position: relative;
          animation: panel-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     neon-breathe 4s ease-in-out 0.4s infinite;
          transform-origin: right center;
          max-height: calc(100vh - 160px);
          display: flex;
          flex-direction: column;
        }

        .vm-detail-panel .detail-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-md);
        }

        @keyframes panel-slide-in {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        .vm-detail-panel .detail-header {
          animation: content-fade-in 0.3s ease-out 0.15s backwards;
        }

        .vm-detail-panel .detail-content {
          animation: content-fade-in 0.3s ease-out 0.25s backwards;
        }

        @keyframes content-fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Holographic scan line effect */
        .vm-detail-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 2s linear infinite;
          opacity: 0.5;
        }

        @keyframes scan-line {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(400px);
          }
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }

        .detail-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .detail-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .detail-status.success {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .detail-status.danger {
          background: var(--danger);
        }

        .detail-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .detail-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .detail-close:hover {
          color: var(--text-primary);
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .detail-info {
          display: flex;
          flex-direction: column;
          /* spacing-xs was too tight for the bumped font size — rows
             collided. spacing-sm gives the larger labels breathing room. */
          gap: var(--spacing-sm);
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--spacing-sm);
          line-height: 1.5;
        }

        .info-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .info-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
        }

        .detail-metrics {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .metric-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .metric-row-network {
          margin-top: var(--spacing-xs);
        }

        .metric-row-stacked {
          flex-direction: column;
          align-items: stretch;
          gap: 4px;
        }

        .metric-row-stacked .metric-bar {
          flex: none;
          width: 100%;
        }

        .metric-row-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-row .metric-label {
          font-size: 13px;
          color: var(--text-secondary);
          width: 50px;
          flex-shrink: 0;
        }

        .metric-row-stacked .metric-label {
          width: auto;
        }

        .metric-row .metric-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
        }

        .metric-row .metric-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
          animation: bar-fill-in 0.8s ease-out forwards;
          transform-origin: left;
        }

        @keyframes bar-fill-in {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: none;
            opacity: 1;
          }
        }

        .metric-fill.success { background: var(--success); box-shadow: 0 0 8px var(--success); }
        .metric-fill.warning { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
        .metric-fill.danger { background: var(--danger); box-shadow: 0 0 8px var(--danger); }

        .metric-row .metric-value {
          font-family: var(--font-mono);
          font-size: 13px;
          min-width: 120px;
          text-align: right;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .network-stats {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
          font-family: var(--font-mono);
          font-size: 14px;
        }

        .net-rx { color: var(--success); }
        .net-tx { color: var(--warning); }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }

        .tag {
          padding: 2px 8px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Table View */
        .matrix-table-container {
          flex: 1;
          overflow: auto;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          position: relative;
        }

        /* Bulk-select column + checkbox styling. */
        .vm-table th.select-col,
        .vm-table td.select-col {
          width: 32px;
          text-align: center;
          padding: 4px 6px;
        }
        .bulk-check {
          width: 14px; height: 14px;
          accent-color: var(--primary);
          cursor: pointer;
          margin: 0;
        }
        .vm-table tbody tr.multi-selected {
          background: rgba(0, 240, 255, 0.06);
        }
        .vm-table tbody tr.multi-selected:hover {
          background: rgba(0, 240, 255, 0.12);
        }

        /* Bulk action toolbar — pinned above the table when ≥1 row is
           checked. Same cyber-style as the matrix top toolbar. */
        .bulk-toolbar {
          position: sticky; top: 0; z-index: 11;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px;
          background: linear-gradient(180deg,
            rgba(0, 240, 255, 0.10),
            rgba(0, 240, 255, 0.04));
          border-bottom: 1px solid var(--primary);
          backdrop-filter: blur(6px);
          animation: bulkBarIn 0.2s ease-out;
        }
        @keyframes bulkBarIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: none; }
        }
        .bulk-count {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
          margin-right: 8px;
        }
        .bulk-sep { width: 1px; height: 18px; background: rgba(0,240,255,.2); margin: 0 4px; }
        .bulk-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .bulk-btn:hover:not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.25);
        }
        .bulk-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .bulk-btn.danger:hover:not(:disabled) {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.3);
        }
        .bulk-btn.ghost {
          margin-left: auto;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .bulk-btn.ghost:hover:not(:disabled) {
          color: var(--text-primary);
          border-color: var(--text-secondary);
        }

        .vm-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .vm-table thead {
          position: sticky;
          top: 0;
          z-index: 10;
          background: var(--bg-secondary);
        }

        .vm-table th {
          padding: var(--spacing-sm) var(--spacing-md);
          text-align: left;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }

        .vm-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: color var(--transition-fast);
        }

        .vm-table th.sortable:hover {
          color: var(--primary);
        }

        .vm-table th.sorted {
          color: var(--primary);
        }

        .vm-table th span {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .sort-indicator {
          font-size: 13px;
          opacity: 0.8;
        }

        /* Sort animation */
        .vm-table tbody tr {
          transition: transform 0.3s ease-out, opacity 0.3s ease-out, background-color var(--transition-fast);
        }

        /* Cyber sort animation. The old horizontal wiggle was too generic.
           New behaviour: rows are "scanned in" top→bottom — each row
           fades up + slides up by 6px with a stagger, while a cyan
           glow-bar travels down the table edge to mimic a CRT/holo
           re-render. The stagger uses nth-child up to 60 rows; rows
           past that just snap (extremely long lists wouldn't benefit
           from staggering anyway). */
        .vm-table tbody tr.sort-animating {
          animation: sortRowReveal 360ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        @keyframes sortRowReveal {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(2px); }
          50%  { filter: blur(0); }
          100% { opacity: 1; transform: none; filter: none; }
        }
        /* Stagger via nth-child — pure CSS, no per-row inline styles. */
        .vm-table tbody tr.sort-animating:nth-child(1)  { animation-delay:   0ms; }
        .vm-table tbody tr.sort-animating:nth-child(2)  { animation-delay:  18ms; }
        .vm-table tbody tr.sort-animating:nth-child(3)  { animation-delay:  36ms; }
        .vm-table tbody tr.sort-animating:nth-child(4)  { animation-delay:  54ms; }
        .vm-table tbody tr.sort-animating:nth-child(5)  { animation-delay:  72ms; }
        .vm-table tbody tr.sort-animating:nth-child(6)  { animation-delay:  90ms; }
        .vm-table tbody tr.sort-animating:nth-child(7)  { animation-delay: 108ms; }
        .vm-table tbody tr.sort-animating:nth-child(8)  { animation-delay: 126ms; }
        .vm-table tbody tr.sort-animating:nth-child(9)  { animation-delay: 144ms; }
        .vm-table tbody tr.sort-animating:nth-child(10) { animation-delay: 162ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+11) { animation-delay: 180ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+16) { animation-delay: 200ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+22) { animation-delay: 220ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+30) { animation-delay: 240ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+40) { animation-delay: 260ms; }
        /* Glowing scan-bar that travels down the table during the sort.
           Anchored to .vm-table (positioned via the table's own bounding
           box). Triggered the same way as row animation: appears on
           tbody when any tr has .sort-animating. */
        .vm-table {
          position: relative;
        }
        .vm-table::before {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.4) 18%,
            rgba(0, 240, 255, 0.95) 50%,
            rgba(0, 240, 255, 0.4) 82%,
            transparent 100%);
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.7),
            0 0 28px rgba(0, 240, 255, 0.35);
          pointer-events: none;
          opacity: 0;
          z-index: 5;
        }
        .vm-table:has(tr.sort-animating)::before {
          animation: sortScanBar 480ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        @keyframes sortScanBar {
          0%   { opacity: 0; top: 0; }
          12%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0; top: 100%; }
        }

        .vm-table td {
          padding: var(--spacing-xs) var(--spacing-md);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
          vertical-align: middle;
        }

        .vm-table tbody tr {
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .vm-table tbody tr:hover {
          background: var(--bg-hover);
        }

        .vm-table tbody tr.selected {
          background: rgba(0, 240, 255, 0.1);
        }

        .vm-table tbody tr.stopped {
          opacity: 0.5;
        }

        .status-badge {
          display: inline-block;
          padding: 2px 6px;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .status-badge.success {
          background: rgba(0, 255, 136, 0.2);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .status-badge.danger {
          background: rgba(255, 0, 64, 0.18);
          color: var(--danger-text);
          border: 1px solid var(--danger);
        }

        .vmid-cell {
          font-weight: 600;
          color: var(--primary);
        }

        .type-cell {
          text-align: center;
        }

        .type-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .type-badge.qemu {
          background: rgba(0, 180, 255, 0.15);
          border: 1px solid rgba(0, 180, 255, 0.4);
          color: #00b4ff;
        }

        .type-badge.lxc {
          background: rgba(180, 100, 255, 0.15);
          border: 1px solid rgba(180, 100, 255, 0.4);
          color: #b464ff;
        }

        .name-cell {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .node-cell {
          color: var(--text-secondary);
        }

        .cpu-cell, .mem-cell {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          min-width: 100px;
        }

        .mini-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
          min-width: 50px;
        }

        .mini-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
        }

        .mini-bar-fill.success { background: var(--success); }
        .mini-bar-fill.warning { background: var(--warning); }
        .mini-bar-fill.danger { background: var(--danger); }

        .net-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 14px;
        }

        .net-cell .net-rx { color: var(--success); }
        .net-cell .net-tx { color: var(--warning); }

        .uptime-cell {
          color: var(--text-secondary);
        }

        .task-header {
          color: var(--accent);
          font-size: 13px;
        }

        .task-cell {
          min-width: 100px;
        }

        .tags-header {
          color: var(--primary);
          font-size: 13px;
        }

        .tags-cell {
          max-width: 150px;
        }

        .vm-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
        }

        .vm-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 1px 4px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid var(--primary-dim);
          border-radius: 3px;
          color: var(--primary);
          white-space: nowrap;
        }

        .tags-row {
          flex-wrap: wrap;
        }

        .detail-tags {
          justify-content: flex-end;
        }

        /* Legend */
        .matrix-legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          margin: var(--spacing-sm) 0 0 0;
          padding: var(--spacing-xs) 0 0 0;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }
        /* Thumb-refresh indicator pinned to the FAR right of the legend
           row (only visible in thumb mode). margin-left:auto pushes it
           past the centered legend items. */
        .legend-thumb-refresh {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--primary);
          opacity: 0.85;
          padding: 2px 10px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: var(--radius-sm);
          letter-spacing: 0.04em;
          cursor: help;
        }
        .legend-thumb-refresh svg {
          opacity: 0.7;
        }

        .legend-title {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .legend-color {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          border: 1px solid var(--border);
        }

        .legend-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .legend-note {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .legend-color.success {
          background: rgba(0, 255, 136, 0.3);
          border-color: var(--success);
        }

        .legend-color.warning {
          background: rgba(255, 107, 0, 0.3);
          border-color: var(--warning);
        }

        .legend-color.danger {
          background: rgba(255, 0, 64, 0.3);
          border-color: var(--danger-text);
        }

        .legend-color.muted {
          background: var(--bg-card);
          opacity: 0.4;
        }

        .no-vms {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          color: var(--text-secondary);
          font-family: var(--font-display);
        }

        @media (max-width: 1024px) {
          .matrix-content {
            flex-direction: column;
          }

          .vm-detail-panel {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .holo-matrix {
            padding: var(--spacing-md);
          }

          .matrix-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .matrix-controls {
            width: 100%;
            flex-wrap: wrap;
          }

          .search-box {
            flex: 1;
          }

          .search-box input {
            width: 100%;
          }
        }

        /* Context Menu */
        .vm-context-menu {
          position: fixed;
          z-index: 1000;
          min-width: 220px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: var(--radius-md);
          /* Layered glow so the cyan rim reads as luminous, not flat:
             - inner highlight ring at 0 1px
             - mid-distance soft cyan halo
             - far drop shadow for depth */
          box-shadow:
            0 0 0 1px rgba(0, 240, 255, .12),
            0 16px 60px rgba(0, 0, 0, .65),
            0 0 80px -20px rgba(0, 240, 255, .55),
            0 0 24px -6px rgba(0, 240, 255, .35);
          padding: var(--spacing-sm);
          animation: context-menu-appear 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(8px);
        }

        @keyframes context-menu-appear {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        .context-menu-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
        }

        .context-menu-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .context-menu-id {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
        }

        .context-menu-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-xs) 0;
        }

        .context-menu-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          width: 100%;
          padding: var(--spacing-sm);
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 13px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: background .14s ease, color .14s ease, padding-left .14s ease, box-shadow .14s ease;
        }

        /* Full-row light bar on hover — matches CyberSelect: left vertical
           cyan rail + cyan band gradient across the row + soft outer glow.
           The 2px padding-left bump gives a "snap to" tactility. */
        .context-menu-item:hover {
          background: linear-gradient(90deg,
            rgba(0, 240, 255, .22) 0%,
            rgba(0, 240, 255, .08) 60%,
            transparent 100%);
          color: var(--primary);
          padding-left: calc(var(--spacing-sm) + 4px);
          box-shadow:
            inset 4px 0 0 var(--primary),
            0 0 18px -6px rgba(0, 240, 255, .55);
          text-shadow: 0 0 6px rgba(0, 240, 255, .55);
        }

        /* Destructive row variant — red rail + red glow instead of cyan,
           so "Stop (hard)" reads as dangerous on hover. */
        .context-menu-item.danger:hover {
          background: linear-gradient(90deg,
            rgba(255, 56, 96, .22) 0%,
            rgba(255, 56, 96, .08) 60%,
            transparent 100%);
          color: var(--danger-text);
          box-shadow:
            inset 4px 0 0 var(--danger),
            0 0 18px -6px rgba(255, 56, 96, .55);
          text-shadow: 0 0 6px rgba(255, 56, 96, .55);
        }

        .context-menu-item svg {
          flex-shrink: 0;
          color: var(--text-secondary);
          transition: color var(--transition-fast), filter var(--transition-fast);
        }

        .context-menu-item:hover svg {
          color: var(--primary);
          filter: drop-shadow(0 0 4px rgba(0, 240, 255, .6));
        }
        .context-menu-item.danger:hover svg {
          color: var(--danger-text);
          filter: drop-shadow(0 0 4px rgba(255, 56, 96, .6));
        }

        /* Visible-but-disabled — operator can see the feature exists but
           clicking surfaces an explanation toast. No light bar on hover, no
           glow; just a muted tint and a not-allowed cursor. */
        .context-menu-item.is-disabled,
        .context-menu-item.is-disabled:hover {
          color: var(--text-muted);
          background: transparent;
          padding-left: var(--spacing-sm);
          box-shadow: none;
          text-shadow: none;
          cursor: help;
        }
        .context-menu-item.is-disabled svg,
        .context-menu-item.is-disabled:hover svg {
          color: var(--text-muted);
          filter: none;
          opacity: .55;
        }

        .context-menu-info {
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-top: var(--spacing-xs);
        }

        .context-menu-info .info-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 2px 0;
        }

        .context-menu-info .info-row span:first-child {
          color: var(--text-muted);
        }

        .context-menu-info .info-row span:last-child {
          color: var(--text-secondary);
        }

        /* Migration-failure toast stack — bottom-right of viewport */
        .mig-fail-stack {
          position: fixed;
          right: 16px; bottom: 16px;
          display: flex; flex-direction: column-reverse; gap: 10px;
          z-index: 500;
          max-width: 420px;
        }
        .mig-fail-toast {
          position: relative;
          padding: 14px 16px 14px 16px;
          background: linear-gradient(180deg, #1a0610, #0d0408);
          border: 1px solid #ff3860;
          border-left-width: 4px;
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .55), 0 0 32px -10px rgba(255, 56, 96, .6);
          color: #ffd0d8;
          font-family: 'Rajdhani', sans-serif;
          animation: migFailIn .25s ease;
        }
        @keyframes migFailIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: none; }
        }
        .mig-fail-head {
          font-family: 'Orbitron', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
          color: #ff3860; margin-bottom: 6px;
        }
        .mig-fail-body { font-size: 14px; line-height: 1.5; margin-bottom: 8px; }
        .mig-fail-cmd-line { font-size: 12px; color: #95a8c4; margin-bottom: 4px; }
        .mig-fail-cmd-hint code {
          font-family: 'Share Tech Mono', monospace; font-size: 12px;
          background: rgba(0, 240, 255, .06); color: #00f0ff;
          padding: 1px 6px; border-radius: 3px;
        }
        .mig-fail-cmd-row { display: flex; gap: 8px; align-items: center; }
        .mig-fail-cmd {
          flex: 1; font-family: 'Share Tech Mono', monospace; font-size: 13px;
          background: #02050b; color: #00f0ff;
          padding: 6px 10px; border-radius: 4px;
          border: 1px solid rgba(0, 240, 255, .16);
          user-select: all;
        }
        .mig-fail-btn {
          padding: 6px 12px;
          font-family: 'Share Tech Mono', monospace; font-size: 10px;
          letter-spacing: .06em; text-transform: uppercase;
          color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4);
          border: none; border-radius: 4px; cursor: pointer;
          white-space: nowrap;
        }
        .mig-fail-btn:hover { box-shadow: 0 0 12px rgba(0, 240, 255, .5); }
        .mig-fail-dismiss {
          position: absolute; top: 6px; right: 8px;
          width: 22px; height: 22px;
          background: transparent; border: none;
          color: #95a8c4; font-size: 18px; line-height: 1; cursor: pointer;
          padding: 0;
        }
        .mig-fail-dismiss:hover { color: #ffd0d8; }
      `}</style>
    </div>
  );
}

function TagSelectorBar({ vms, onSelectByTag }: { vms: any[]; onSelectByTag: (tag: string) => void }) {
  const { language } = useTranslation();
  const tags = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of vms) {
      // tags can arrive as a semicolon-string from PVE OR as an array
      // of strings (some recent payloads). Coerce to a flat list.
      const raw = v.tags;
      const list: string[] = Array.isArray(raw)
        ? raw.flatMap((s) => String(s).split(/[;,\s]+/))
        : typeof raw === 'string' ? raw.split(/[;,\s]+/)
        : [];
      for (const t of list.filter(Boolean)) {
        counts.set(t, (counts.get(t) || 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 32);
  }, [vms]);
  if (tags.length === 0) return null;
  return (
    <div className="tag-selector-bar">
      <span className="tsb-label">
        {language === 'zh-TW' ? '依標籤全選 VM：' : 'Select all VMs with tag:'}
      </span>
      {tags.map(([tag, count]) => (
        <button
          key={tag}
          className="tsb-tag"
          onClick={() => onSelectByTag(tag)}
          title={language === 'zh-TW'
            ? `將 ${count} 台標籤為「${tag}」的 VM/CT 加入選取`
            : `Add ${count} VM/CT(s) tagged "${tag}" to selection`}
        >
          <span className="tsb-tag-name">{tag}</span>
          <span className="tsb-tag-count">{count}</span>
        </button>
      ))}
      <style>{`
        .tag-selector-bar { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px; margin-bottom: 8px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; align-items: center; }
        .tsb-label { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--text-secondary); margin-right: 4px; letter-spacing: .04em; }
        .tsb-tag { display: inline-flex; gap: 4px; align-items: center; padding: 2px 8px; background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 999px; cursor: pointer; font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--text-primary); }
        .tsb-tag:hover { background: rgba(0, 240, 255, 0.15); border-color: var(--primary); }
        .tsb-tag-name { color: var(--primary); }
        .tsb-tag-count { color: var(--text-muted); font-size: 10px; }
      `}</style>
    </div>
  );
}

// ============================================================ HeatmapView
// CPU-per-VM heat-map: each row is one VM; each cell one polling tick.
// Colour scale: empty (no data) → dark green (idle) → green → amber →
// orange → red (critical). Self-contained — no external CSS.

const HEATMAP_BUCKETS = 30;

/**
 * Header label for the heat map.
 *
 * The old label read "last 30 samples", which was true of the array and false
 * of the picture: on arrival all 30 buckets hold ONE copied reading, so every
 * row is flat and looks like half a minute of steady CPU. It also never said
 * how long 30 samples IS -- that depends on each cluster's poll_interval (2s
 * here, 10s on another cluster), so the same figure meant 1 minute or 5.
 *
 * So report the measured wall-clock span of the samples actually collected,
 * and say plainly while the buffer is still mostly seed.
 */
function heatSpanLabel(times: number[], language: string): string {
  const zh = language === 'zh-TW';
  if (times.length < 2) return zh ? '取樣中…' : 'SAMPLING…';
  const secs = Math.round((times[times.length - 1] - times[0]) / 1000);
  const span = secs < 90
    ? (zh ? `${secs} 秒` : `${secs}s`)
    : (zh ? `${Math.round(secs / 60)} 分鐘` : `${Math.round(secs / 60)}m`);
  const partial = times.length < HEATMAP_BUCKETS;
  if (partial) {
    return zh ? `近 ${span} · 累積中 ${times.length}/${HEATMAP_BUCKETS}`
              : `LAST ${span} · FILLING ${times.length}/${HEATMAP_BUCKETS}`;
  }
  return zh ? `近 ${span}` : `LAST ${span}`;
}

/** PVE sends a guest's `tags` as a semicolon/comma string on some payloads
 * and as an array on others, while the TypeScript type says `string[]`. A cast
 * does not coerce: `.map()` over a string iterates CHARACTERS, and `tags[0]`
 * on a string returns the first letter -- so a VM tagged "alpha" grouped under
 * "a". TagSelectorBar handled both shapes; three other call sites did not.
 */
export function normaliseTags(raw: unknown): string[] {
  const list: string[] = Array.isArray(raw)
    ? raw.flatMap((x) => String(x).split(/[;,\s]+/))
    : typeof raw === 'string' ? raw.split(/[;,\s]+/)
    : [];
  return list.map((t) => t.trim()).filter(Boolean);
}

function heatmapColor(v: number | null | undefined): string {
  if (v == null) return 'rgba(0, 60, 80, 0.35)';
  if (v < 5)   return '#1d4d3d';
  if (v < 25)  return '#2e7d4f';
  if (v < 50)  return '#a07a2e';
  if (v < 75)  return '#d97a2e';
  if (v < 90)  return '#e84d3d';
  return '#ff3a6e';
}

function HeatmapView({
  vms, history, times, tick, language,
}: {
  vms: Array<VMMetrics & { clusterName: string; clusterId: string }>;
  history: Map<string, number[]>;
  times: number[];
  tick: number;
  language: string;
}) {
  // tick is read solely so React re-renders this branch when the parent
  // appends to the buffer. Without this dependency, an outer parent
  // re-render would still paint stale cells from the previous snapshot.
  void tick;

  return (
    <div className="hm-wrap">
      <div className="hm-head">
        <span className="hm-dot" />
        <span className="hm-title">{language === 'zh-TW' ? '熱度圖 · 各 VM CPU' : 'HEAT MAP · CPU PER VM'}</span>
        <span className="hm-meta">{heatSpanLabel(times, language)}</span>
      </div>
      <div className="hm-rows">
        {vms.length === 0 ? (
          <div className="hm-empty">{language === 'zh-TW' ? '無資料' : 'No data'}</div>
        ) : vms.map((vm) => {
          const key = `${vm.cluster_id}|${vm.node}|${vm.vmid}`;
          const buf = history.get(key) || [];
          const cells: (number | null)[] = [
            ...new Array(Math.max(0, HEATMAP_BUCKETS - buf.length)).fill(null),
            ...buf,
          ];
          const latest = buf[buf.length - 1];
          const dim = vm.status !== 'running';
          return (
            <div key={key} className={`hm-row ${dim ? 'hm-row-dim' : ''}`}>
              <span className="hm-name" title={`${vm.name} #${vm.vmid} · ${vm.node}`}>
                {vm.name || `vm-${vm.vmid}`}
              </span>
              <div className="hm-cells">
                {cells.map((v, i) => (
                  <span
                    key={i}
                    className="hm-cell"
                    style={{ background: heatmapColor(v) }}
                    title={v == null
                      ? `${vm.name} · t-${HEATMAP_BUCKETS - i} · —`
                      : `${vm.name} · t-${HEATMAP_BUCKETS - i} · ${v.toFixed(1)}%`}
                  />
                ))}
              </div>
              <span className="hm-cur" style={{ color: heatmapColor(latest) }}>
                {latest == null ? '—' : `${latest.toFixed(0)}%`}
              </span>
            </div>
          );
        })}
      </div>

      <div className="hm-scale">
        <span className="hm-scale-label">SCALE:</span>
        {/* The end labels belong at the ends they describe. Both used to sit
            after the swatches, so "IDLE → 危險" read as if the whole strip meant
            danger and the leftmost (idle) colour was unlabelled. */}
        <span className="hm-scale-label hm-scale-end">
          {language === 'zh-TW' ? 'IDLE' : 'LOW'}
        </span>
        {[0, 20, 50, 80, 100].map((v) => (
          <span key={v} className="hm-scale-cell" style={{ background: heatmapColor(v) }} />
        ))}
        <span className="hm-scale-label hm-scale-end">
          {language === 'zh-TW' ? '危險' : 'CRITICAL'}
        </span>
      </div>

      <style>{`
        .hm-wrap {
          position: relative;
          flex: 1;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          padding: 14px 18px;
          overflow: hidden;
          animation: neon-breathe 4s ease-in-out infinite;
          display: flex; flex-direction: column;
          min-height: 0;
        }
        .hm-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.55; pointer-events: none;
        }
        .hm-wrap::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
        }
        .hm-head {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--primary);
          text-shadow: none;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.18);
          margin-bottom: 10px;
        }
        .hm-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--primary); box-shadow: 0 0 6px var(--primary);
          animation: pulse 2.4s ease-in-out infinite;
        }
        .hm-title { white-space: nowrap; }
        .hm-meta {
          margin-left: auto;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-muted);
          padding: 2px 10px; border-radius: 999px;
          border: 1px solid rgba(0, 240, 255, 0.22);
          background: rgba(0, 240, 255, 0.04);
        }
        .hm-rows {
          flex: 1;
          overflow-y: auto; overflow-x: hidden;
          display: flex; flex-direction: column;
          gap: 0;
          padding: 4px 0;
          min-height: 0;
        }
        .hm-empty {
          padding: 24px;
          text-align: center;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-muted); font-style: italic;
        }
        .hm-row {
          display: grid;
          grid-template-columns: 140px 1fr 50px;
          gap: 10px;
          align-items: center;
          padding: 3px 0;
          border-bottom: 1px solid rgba(0, 240, 255, 0.06);
          transition: background 0.12s;
        }
        /* Subtle zebra so the eye can track a row across the 30 cells
           even when the cells themselves are tightly packed. */
        .hm-row:nth-child(odd)  { background: rgba(0, 240, 255, 0.018); }
        .hm-row:hover           { background: rgba(0, 240, 255, 0.07); }
        .hm-row-dim { opacity: 0.4; }
        .hm-name {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          padding-right: 4px;
        }
        .hm-cells {
          display: grid;
          grid-template-columns: repeat(${HEATMAP_BUCKETS}, 1fr);
          gap: 2px;
          min-width: 0;
        }
        .hm-cell {
          aspect-ratio: 1 / 1;
          min-height: 14px; max-height: 18px;
          border-radius: 2px;
          transition: background 0.4s ease-out;
        }
        .hm-cur {
          font-family: var(--font-mono); font-size: 11px;
          font-variant-numeric: tabular-nums;
          text-align: right;
          text-shadow: 0 0 4px currentColor;
        }
        .hm-scale {
          display: flex; align-items: center; gap: 6px;
          padding-top: 10px;
          margin-top: 8px;
          border-top: 1px solid rgba(0, 240, 255, 0.15);
          font-family: var(--font-display); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-muted);
        }
        .hm-scale-end { opacity: .8; letter-spacing: .06em; }
        .hm-scale-cell {
          width: 18px; height: 14px;
          border-radius: 2px;
        }
        .hm-scale-tail { margin-left: 6px; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}
