/**
 * JT-PROXENSE Radar Scan View
 * Circular radar visualization for anomaly detection
 */

import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useTranslation } from '../i18n';
import type { ClusterData, VMMetrics, VMTask, NodeHealth } from '../types';
import { formatPercent, getHealthColor } from '../utils/format';
import { VMContextMenu, type ContextMenuState, type PowerActionRequest } from '../components/VMContextMenu';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';
import { api } from '../api';
import { RemoteMigrateModal } from '../components/RemoteMigrateModal';
import { SnapshotsModal } from '../components/SnapshotsModal';
import { BackupModal } from '../components/BackupModal';
import { ConsolePasswordPrompt } from '../components/ConsolePasswordPrompt';

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

// Get task type display info
function getTaskInfo(task: VMTask | null): { label: string; color: string } | null {
  if (!task) return null;
  const type = task.task_type.toLowerCase();
  if (type.includes('migrate')) {
    return { label: task.target_node ? `→${task.target_node}` : 'MIGRATE', color: '#00f0ff' };
  }
  if (type.includes('start')) return { label: 'START', color: '#00ff88' };
  if (type.includes('stop') || type.includes('shutdown')) return { label: 'STOP', color: '#ff6b00' };
  if (type.includes('backup') || type.includes('vzdump')) return { label: 'BACKUP', color: '#a855f7' };
  if (type.includes('restore')) return { label: 'RESTORE', color: '#f59e0b' };
  if (type.includes('snapshot')) return { label: 'SNAP', color: '#06b6d4' };
  if (type.includes('clone')) return { label: 'CLONE', color: '#10b981' };
  return { label: 'TASK', color: '#00f0ff' };
}

// Animated anomaly item component with compact horizontal bars
function AnomalyItem({
  vm,
  index,
  previousIndex,
  onClick,
  onContextMenu,
  isSelected,
  task,
}: {
  vm: VMMetrics;
  index: number;
  previousIndex: number | undefined;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent, vm: VMMetrics) => void;
  isSelected?: boolean;
  task?: VMTask | null;
}) {
  const memPercent = (vm.memory.used_bytes / vm.memory.total_bytes) * 100;
  const diskPercent = vm.disk?.usage_percent || 0;
  const cpuColor = getHealthColor(vm.cpu.usage_percent);
  const memColor = getHealthColor(memPercent);
  const diskColor = getHealthColor(diskPercent);
  const itemRef = useRef<HTMLDivElement>(null);
  const [isNew, setIsNew] = useState(previousIndex === undefined);
  const taskInfo = getTaskInfo(task || null);

  // Handle entry animation
  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsNew(false), 50);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  // Truncate VM name if too long
  const displayName = vm.name.length > 10 ? vm.name.substring(0, 9) + '…' : vm.name;

  // Determine the highest metric for overall severity
  const maxMetric = Math.max(vm.cpu.usage_percent, memPercent, diskPercent);
  const severityClass = maxMetric > 95 ? 'critical' : 'warning';

  return (
    <div
      ref={itemRef}
      className={`anomaly-item ${severityClass} ${isNew ? 'entering' : ''} ${isSelected ? 'selected' : ''} ${task ? 'has-task' : ''}`}
      style={{
        animationDelay: `${index * 80}ms`,
        cursor: onClick ? 'pointer' : 'default',
      }}
      title={`${vm.name} (#${vm.vmid})\nCPU: ${formatPercent(vm.cpu.usage_percent, 1)}\nMEM: ${formatPercent(memPercent, 1)}\nDISK: ${formatPercent(diskPercent, 1)}${task ? `\nTask: ${task.task_type}` : ''}`}
      onClick={onClick}
      onContextMenu={(e) => onContextMenu?.(e, vm)}
    >
      {/* Sci-fi corner brackets */}
      <div className="corner-bracket tl" />
      <div className="corner-bracket tr" />
      <div className="corner-bracket bl" />
      <div className="corner-bracket br" />

      <div className="anomaly-header">
        <span className={`anomaly-indicator ${cpuColor}`} />
        <span className="anomaly-name">{displayName}</span>
        <span className="anomaly-vmid">#{vm.vmid}</span>
        {taskInfo && (
          <span className="anomaly-task-badge" style={{ backgroundColor: `${taskInfo.color}30`, borderColor: taskInfo.color, color: taskInfo.color }}>
            {taskInfo.label}
          </span>
        )}
      </div>
      <div className="anomaly-bars-row">
        <div className={`metric-gauge ${cpuColor}`}>
          <span className="gauge-label">C</span>
          <div className="gauge-track">
            <div className="gauge-segments" />
            <div
              className="gauge-fill"
              style={{
                width: `${Math.max(vm.cpu.usage_percent, 3)}%`,
              }}
            />
            <div className="gauge-glow" style={{ left: `${Math.max(vm.cpu.usage_percent, 3)}%` }} />
          </div>
          <span className="gauge-value">{Math.round(vm.cpu.usage_percent)}</span>
        </div>
        <div className={`metric-gauge ${memColor}`}>
          <span className="gauge-label">M</span>
          <div className="gauge-track">
            <div className="gauge-segments" />
            <div
              className="gauge-fill"
              style={{
                width: `${Math.max(memPercent, 3)}%`,
              }}
            />
            <div className="gauge-glow" style={{ left: `${Math.max(memPercent, 3)}%` }} />
          </div>
          <span className="gauge-value">{Math.round(memPercent)}</span>
        </div>
        <div className={`metric-gauge ${diskColor}`}>
          <span className="gauge-label">D</span>
          <div className="gauge-track">
            <div className="gauge-segments" />
            <div
              className="gauge-fill"
              style={{
                width: `${Math.max(diskPercent, 3)}%`,
              }}
            />
            <div className="gauge-glow" style={{ left: `${Math.max(diskPercent, 3)}%` }} />
          </div>
          <span className="gauge-value">{Math.round(diskPercent)}</span>
        </div>
      </div>
    </div>
  );
}

// Modal shims. Each one freezes its `sel` prop into a useMemo-stabilised
// vm object so the modal's `useEffect([..., vm])` doesn't fire on every
// parent re-render. Splitting into separate shims (one per modal) means
// only the relevant shim re-renders when the matching state changes,
// while the others stay completely inert. Without these shims, the
// radar's 50ms scan-angle update reset the wizard state continuously.
type Sel = { vm: VMMetrics; clusterId: string } | null;
function shimVm(sel: Sel) {
  return sel ? {
    vmid: sel.vm.vmid,
    name: sel.vm.name,
    node: sel.vm.node,
    type: sel.vm.type,
  } : null;
}
function RadarSnapshotShim({ sel, onClose }: { sel: Sel; onClose: () => void }) {
  const vmStable = useMemo(() => shimVm(sel), [sel]);
  return (
    <SnapshotsModal
      open={sel !== null}
      cluster_id={sel?.clusterId || ''}
      vm={vmStable}
      onClose={onClose}
    />
  );
}
function RadarBackupShim({ sel, onClose }: { sel: Sel; onClose: () => void }) {
  const vmStable = useMemo(() => shimVm(sel), [sel]);
  return (
    <BackupModal
      open={sel !== null}
      cluster_id={sel?.clusterId || ''}
      vm={vmStable}
      onClose={onClose}
    />
  );
}
function RadarRemoteMigrateShim({ sel, onClose }: { sel: Sel; onClose: () => void }) {
  const vmStable = useMemo(() => shimVm(sel), [sel]);
  return (
    <RemoteMigrateModal
      open={sel !== null}
      cluster_id={sel?.clusterId || ''}
      vm={vmStable}
      onClose={onClose}
    />
  );
}

interface RadarScanProps {
  cluster: ClusterData | null;
  clusters?: Record<string, ClusterData>; // For "all clusters" mode
  isPaused?: boolean;
}

interface RadarPoint {
  vm: VMMetrics;
  angle: number;
  distance: number;
  color: string;
  task: VMTask | null;
}

// Cached point state - only updates when scan passes
interface ScannedPoint {
  vm: VMMetrics;
  angle: number;
  distance: number;
  color: string;
  lastScanAngle: number;
}

export function RadarScan({ cluster, clusters, isPaused = false }: RadarScanProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scanAngle, setScanAngle] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<{ vm: VMMetrics; x: number; y: number; pointX: number; pointY: number } | null>(null);
  const [previousAnomalyMap, setPreviousAnomalyMap] = useState<Map<string, number>>(new Map());
  // Track scanned state of each VM - only updates when scan line passes
  const [scannedPoints, setScannedPoints] = useState<Map<string, ScannedPoint>>(new Map());

  // Entry animation state
  const [entryPhase, setEntryPhase] = useState<'grid' | 'line' | 'flip' | 'done'>('grid');
  // Opacity for radar elements fade-in (0 to 1)
  const [radarOpacity, setRadarOpacity] = useState(0);

  useEffect(() => {
    // Phase 0: Grid draws first (0.6s) - radar grid visible, no overlay
    // Phase 1: Line expands (0.5s)
    // Phase 2: Flip to circle (2.0s)
    // Phase 3: Done - cleanup
    const timer0 = setTimeout(() => setEntryPhase('line'), 600);
    const timer1 = setTimeout(() => setEntryPhase('flip'), 1100);
    const timer2 = setTimeout(() => setEntryPhase('done'), 3300);
    return () => {
      clearTimeout(timer0);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Animate radar opacity. Start fading IN during the 'line' phase so by
  // the time 'flip' kicks in the radar is already partly visible — that
  // crossfade replaces the previous "go to opacity 0 → wait 300ms → fade"
  // sequence which made the radar visibly disappear between phases.
  useEffect(() => {
    if (entryPhase === 'grid') {
      setRadarOpacity(0);
      return;
    }
    // For 'line' / 'flip' / 'done': fade up continuously.
    // 'line' starts the fade so the radar is never blank before flip.
    const duration = entryPhase === 'line' ? 1500 : 1200;
    let animFrame: number;
    let startTime: number | null = null;
    // Pick up from current opacity instead of resetting to 0 when phase
    // changes — that's what avoided the flash.
    const startOpacity = radarOpacity;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const next = startOpacity + (1 - startOpacity) * easedProgress;
      setRadarOpacity(next);
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
    // Intentionally exclude radarOpacity from deps — we only want to
    // restart the animation on phase transitions, using the current
    // opacity as the starting point each time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryPhase]);

  // Determine if we're in "all clusters" mode
  const isAllClusters = !cluster && clusters && Object.keys(clusters).length > 0;

  // Collect all running VMs first (for dependency tracking)
  const allRunningVMs = useMemo(() => {
    if (!cluster && !isAllClusters) return [];

    const vms: VMMetrics[] = [];
    if (isAllClusters) {
      Object.values(clusters!).forEach((c) => {
        Object.values(c.vms).forEach((vm) => {
          if (vm.status === 'running' && !vm.template) vms.push(vm);
        });
      });
    } else if (cluster) {
      Object.values(cluster.vms).forEach((vm) => {
        if (vm.status === 'running' && !vm.template) vms.push(vm);
      });
    }
    return vms;
  }, [cluster, clusters, isAllClusters]);

  // Calculate radar points from VMs - recalculates when VM metrics change
  const radarPoints: RadarPoint[] = useMemo(() => {
    return allRunningVMs.map((vm, index) => {
      // Distribute VMs in a spiral pattern
      const angle = (index / allRunningVMs.length) * Math.PI * 2;

      // Calculate individual metrics
      const cpuPercent = vm.cpu.usage_percent;
      const memPercent = vm.memory.total_bytes > 0
        ? (vm.memory.used_bytes / vm.memory.total_bytes) * 100
        : 0;
      const diskPercent = vm.disk?.usage_percent || 0;

      // Use MAX metric for both distance and color - consistent visualization
      // Higher max value = further from center = more dangerous
      const maxLoad = Math.max(cpuPercent, memPercent, diskPercent);

      // Distance = load (higher → further out), but a fleet is mostly idle, so
      // without help every idle guest lands on the SAME low-load ring and dozens
      // of blips crush into an unreadable glow-blob at the centre. Two fixes:
      //   * base bumped 0.2 → 0.30 so even the idle ring has real circumference;
      //   * a golden-ratio radial offset (well-distributed, deterministic per
      //     index) fans same-load guests across a ~0.14 band instead of one thin
      //     circle. Colour still encodes health exactly; hover shows real values.
      const spread = ((index * 0.61803) % 1) * 0.24;
      const distance = 0.26 + (maxLoad / 100) * 0.48 + spread;

      // Color based on max metric - if ANY is high, show warning/danger
      const color = getHealthColor(maxLoad);

      // Find any running task for this VM - use cluster_id and node for proper identification
      const task = findVMTask(vm.vmid, vm.node, vm.cluster_id, cluster, clusters);

      return { vm, angle, distance, color, task };
    });
  }, [allRunningVMs, cluster, clusters]);

  // Anomalies (high CPU/Memory VMs) with position tracking
  const anomalies = useMemo(() => {
    if (!cluster && !isAllClusters) return [];

    const allVms: VMMetrics[] = [];
    if (isAllClusters) {
      Object.values(clusters!).forEach((c) => {
        Object.values(c.vms).forEach((vm) => allVms.push(vm));
      });
    } else if (cluster) {
      Object.values(cluster.vms).forEach((vm) => allVms.push(vm));
    }

    const list = allVms
      .filter((vm) => {
        if (vm.status !== 'running' || vm.template) return false;
        const memPercent = (vm.memory.used_bytes / vm.memory.total_bytes) * 100;
        const diskPercent = vm.disk.total_bytes > 0 ? (vm.disk.used_bytes / vm.disk.total_bytes) * 100 : 0;
        return vm.cpu.usage_percent > 80 || memPercent > 85 || diskPercent > 85;
      })
      .sort((a, b) => {
        // Sort by max of CPU, Memory, or Disk percentage (higher load = higher rank)
        const aMemPercent = (a.memory.used_bytes / a.memory.total_bytes) * 100;
        const bMemPercent = (b.memory.used_bytes / b.memory.total_bytes) * 100;
        const aDiskPercent = a.disk.total_bytes > 0 ? (a.disk.used_bytes / a.disk.total_bytes) * 100 : 0;
        const bDiskPercent = b.disk.total_bytes > 0 ? (b.disk.used_bytes / b.disk.total_bytes) * 100 : 0;
        const aMaxLoad = Math.max(a.cpu.usage_percent, aMemPercent, aDiskPercent);
        const bMaxLoad = Math.max(b.cpu.usage_percent, bMemPercent, bDiskPercent);
        return bMaxLoad - aMaxLoad;
      });

    return list;
  }, [cluster, clusters, isAllClusters]);

  // Update previous anomaly positions after render
  useEffect(() => {
    const newMap = new Map<string, number>();
    anomalies.forEach((vm, idx) => {
      newMap.set(`${vm.cluster_id}/${vm.node}/${vm.vmid}`, idx);
    });
    setPreviousAnomalyMap(newMap);
  }, [anomalies]);

  // Handle canvas mouse move for tooltip
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    // Convert mouse CSS coordinates to canvas internal coordinates
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const size = Math.min(canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = size * 0.4;

    // Check if mouse is near any point (both in canvas coordinates now)
    let found: { vm: VMMetrics; x: number; y: number; pointX: number; pointY: number } | null = null;
    for (const point of radarPoints) {
      const px = centerX + Math.cos(point.angle) * radius * point.distance;
      const py = centerY + Math.sin(point.angle) * radius * point.distance;
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);

      // Scale hit area based on canvas/CSS ratio
      const hitRadius = 15 * Math.max(scaleX, scaleY);
      if (dist < hitRadius) {
        found = {
          vm: point.vm,
          x: e.clientX,
          y: e.clientY,
          pointX: px,
          pointY: py,
        };
        break;
      }
    }

    setHoveredPoint(found);
  }, [radarPoints]);

  const handleCanvasMouseLeave = useCallback(() => {
    setHoveredPoint(null);
  }, []);

  // Handle anomaly item click - show tooltip for the corresponding radar point
  const handleAnomalyClick = useCallback((vm: VMMetrics) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Find the radar point for this VM
    const point = radarPoints.find(p => p.vm.node === vm.node && p.vm.vmid === vm.vmid);
    if (!point) return;

    const size = Math.min(canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = size * 0.4;

    // Calculate point position
    const px = centerX + Math.cos(point.angle) * radius * point.distance;
    const py = centerY + Math.sin(point.angle) * radius * point.distance;

    setHoveredPoint({
      vm: point.vm,
      x: px,
      y: py,
      pointX: px,
      pointY: py,
    });
  }, [radarPoints]);

  // ----- Context menu (right-click on anomaly card) ------------------
  // Reuses the same VMContextMenu component the matrix view uses, plus
  // the underlying modal components (snapshots / backup / migrate /
  // console-prompt). Functionally identical to the matrix-view menu so
  // operators don't have to switch views for full control.
  const dialog = useDialogs();
  const auth = useAuth();
  const userRole = auth.user?.role_global ?? null;
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false, x: 0, y: 0, vm: null, clusterId: '',
  });
  const closeContextMenu = useCallback(
    () => setContextMenu((m) => ({ ...m, visible: false })),
    [],
  );
  const handleAnomalyContextMenu = useCallback((e: React.MouseEvent, vm: VMMetrics) => {
    e.preventDefault();
    e.stopPropagation();
    // Resolve which cluster owns this VM. In single-cluster mode it's just
    // the prop; in all-clusters mode use the VM's own cluster_id.
    const cid = (vm as any).cluster_id || cluster?.id || '';
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, vm, clusterId: cid });
  }, [cluster]);

  const getNodeHealth = useCallback(
    (clusterId: string, node: string): NodeHealth | null => {
      const cd = clusters?.[clusterId] || (cluster?.id === clusterId ? cluster : null);
      return cd?.client_health?.[node] || null;
    },
    [cluster, clusters],
  );

  // Power action dispatcher. Uses the same /api/clusters/.../action
  // endpoints HoloMatrix uses; destructive actions are gated by a
  // useDialogs confirm (radar doesn't own a tier-3 confirm modal).
  const requestPowerAction = useCallback(async (req: PowerActionRequest) => {
    const { vm, action, clusterId } = req;
    const isCt = vm.type === 'lxc';
    const destructive = action === 'stop' || action === 'shutdown' || action === 'reboot';
    if (destructive) {
      const ok = await dialog.confirm(
        `${action.toUpperCase()} ${vm.name} (#${vm.vmid})?`,
        { title: 'Confirm', destructive: true },
      );
      if (!ok) return;
    }
    try {
      const r = isCt
        ? await api.ctAction(clusterId, vm.node, vm.vmid, action)
        : await api.vmAction(clusterId, vm.node, vm.vmid, action);
      console.info(`[radar] ${action} ${isCt ? 'ct' : 'vm'}/${vm.vmid} → upid=${r.upid}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('vm_control_disabled')) {
        await dialog.alert('VM control is disabled on this server.\nSet vm_control.enabled: true in config.yaml and restart the service.');
      } else {
        await dialog.alert(`${action} failed: ${msg.slice(0, 200)}`);
      }
    }
  }, [dialog]);

  // Modal state for the actions the menu can trigger. Same shape as in
  // HoloMatrix so the modal components see exactly what they expect.
  const [snapshotVm, setSnapshotVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [backupVm, setBackupVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [remoteMigrateVm, setRemoteMigrateVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [consolePromptVm, setConsolePromptVm] = useState<{ vm: VMMetrics; clusterId: string } | null>(null);
  const [consoleMode, setConsoleMode] = useState<'disabled' | 'stored' | 'prompt'>('disabled');
  useEffect(() => {
    api.getConfig()
      .then((c) => setConsoleMode(
        (c.console?.mode as 'disabled' | 'stored' | 'prompt') || 'disabled',
      ))
      .catch(() => setConsoleMode('disabled'));
  }, []);

  // Open a console tab once we have a console_token. Same URL shape as
  // HoloMatrix.openConsoleTab — duplicated here rather than extracted to
  // keep the coupling visible.
  const openConsoleTab = useCallback(
    (cid: string, vm: VMMetrics, token: string, vncPassword?: string,
     preOpened?: Window | null) => {
      const lang = (typeof localStorage !== 'undefined'
        && localStorage.getItem('language')) || '';
      const isCT = vm.type === 'lxc';
      const base = isCT ? '/console-term' : '/console';
      const url =
        `${base}/${encodeURIComponent(cid)}/${encodeURIComponent(vm.node)}/${vm.vmid}`
        + `?ct=${encodeURIComponent(token)}`
        + (vm.name ? `&name=${encodeURIComponent(vm.name)}` : '')
        + (lang ? `&lang=${encodeURIComponent(lang)}` : '')
        + (!isCT && vncPassword ? `#vp=${encodeURIComponent(vncPassword)}` : '');
      if (preOpened && !preOpened.closed) {
        preOpened.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    [],
  );

  // Synchronously open a placeholder tab within the user-gesture click so the
  // post-await navigation isn't blocked as a popup (see HoloMatrix note).
  const openPlaceholderTab = useCallback((): Window | null => {
    const w = window.open('', '_blank');
    if (w) { try { w.opener = null; } catch { /* ignore */ } }
    return w;
  }, []);

  const handleOpenConsole = useCallback(async () => {
    if (!contextMenu.vm) return;
    const vm = contextMenu.vm;
    const cid = contextMenu.clusterId;
    if (consoleMode === 'disabled') {
      await dialog.alert(t('console.disabled'));
      return;
    }
    if (consoleMode === 'prompt') {
      setConsolePromptVm({ vm, clusterId: cid });
      return;
    }
    // Stored mode — let server return 412 / no_stored_password if needed.
    // Open the tab synchronously first (popup-blocker dodge).
    const win = openPlaceholderTab();
    try {
      const r = await api.consolePrepare({
        cluster_id: cid, node: vm.node, vmid: vm.vmid,
      });
      openConsoleTab(cid, vm, r.console_token, r.vnc_password, win);
    } catch (e: unknown) {
      if (win && !win.closed) win.close();
      const msg = (e instanceof Error) ? e.message : String(e);
      await dialog.alert(t('console.prepare_failed', { err: msg }));
    }
  }, [contextMenu, consoleMode, dialog, t, openConsoleTab, openPlaceholderTab]);

  // Radar animation - pauses when isPaused is true, only starts after entry animation
  useEffect(() => {
    if (isPaused || entryPhase !== 'done') return;

    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, entryPhase]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // Backing-store sync — DON'T rely on the ResizeObserver/mount handler alone.
    // In some load orders (and reliably under headless capture) neither fires
    // after layout settles, so the canvas keeps its default 300×150 bitmap and
    // gets CSS-stretched to fill the container — the radar renders at ~1/6 res
    // and looks blurry while the surrounding DOM stays crisp. Sizing here, on
    // every draw, guarantees the bitmap always matches container × dpr (the
    // guard makes it a no-op once correct, so it only pays a resize when the box
    // actually changes).
    const box = canvas.parentElement;
    if (box) {
      const bw = Math.round(box.clientWidth * dpr);
      const bh = Math.round(box.clientHeight * dpr);
      if (bw > 0 && bh > 0 && (canvas.width !== bw || canvas.height !== bh)) {
        canvas.width = bw;
        canvas.height = bh;
        canvas.style.width = box.clientWidth + 'px';
        canvas.style.height = box.clientHeight + 'px';
      }
    }

    // Draw in CSS-pixel space: setTransform(dpr) maps logical coordinates onto
    // the hi-res bitmap so geometry/fonts keep their authored sizes but render
    // sharp on HiDPI / 2× capture.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    const size = Math.min(cw, ch);
    const centerX = cw / 2;
    const centerY = ch / 2;
    const radius = size * 0.4;

    // Clear
    ctx.clearRect(0, 0, cw, ch);

    // Draw fine grid overlay FIRST (always visible, including during animation)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 0.8;
    const gridSize = 20;
    for (let x = centerX % gridSize; x < cw; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ch);
      ctx.stroke();
    }
    for (let y = centerY % gridSize; y < ch; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cw, y);
      ctx.stroke();
    }

    // Only draw radar circles, labels, scan line during flip or done phase
    if (entryPhase !== 'flip' && entryPhase !== 'done') {
      return;
    }

    // Apply fade-in opacity for all radar elements
    ctx.globalAlpha = radarOpacity;

    // Draw concentric circles with scale labels
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.font = '10px "Share Tech Mono", monospace';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.textAlign = 'left';

    // Ring positions: 0.25, 0.5, 0.75, 1.0 of radius. Only the 50% and 100%
    // rings are LABELLED — at typical panel sizes the ring gap ≈ the label
    // width, so labelling all four crushed them into a "2550751 00%" smear
    // right of centre. Two labels leave a clean gap; the unlabelled rings still
    // read as the halfway grid lines.
    const ringLabels = ['25%', '50%', '75%', '100%'];

    for (let i = 1; i <= 4; i++) {
      const ringRadius = radius * (i / 4);
      ctx.beginPath();
      ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
      if (i !== 2 && i !== 4) continue;

      // Scale label along the right horizontal spoke, one per ring (spaced by
      // the ring gap). Reads cleanly now that blips are crisp dots, not glow-
      // blobs bleeding over the text.
      ctx.fillText(ringLabels[i - 1], centerX + ringRadius + 4, centerY + 4);
    }

    // Add center label
    ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
    ctx.textAlign = 'center';
    ctx.font = '14px "Share Tech Mono", monospace';
    ctx.fillText('0%', centerX, centerY - 8);
    ctx.font = '11px "Share Tech Mono", monospace';
    ctx.fillText('LOW', centerX, centerY + 8);

    // Reset for other text
    ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.textAlign = 'left';
    ctx.font = '10px "Share Tech Mono", monospace';

    // Draw cross lines
    ctx.beginPath();
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.stroke();

    // ── Outer instrumentation ring: degree ticks + labels + two
    //    counter-rotating dashed deco arcs. All plain strokes — the
    //    rotation is just lineDashOffset driven by scanAngle, so it
    //    costs nothing extra and freezes naturally when paused. ──
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1;
    for (let d = 0; d < 360; d += 5) {
      const a = (d * Math.PI) / 180;
      const major = d % 30 === 0;
      const r1 = radius * 1.02;
      const r2 = radius * (major ? 1.065 : 1.04);
      ctx.globalAlpha = radarOpacity * (major ? 0.65 : 0.3);
      ctx.beginPath();
      ctx.moveTo(centerX + Math.cos(a) * r1, centerY + Math.sin(a) * r1);
      ctx.lineTo(centerX + Math.cos(a) * r2, centerY + Math.sin(a) * r2);
      ctx.stroke();
    }
    ctx.globalAlpha = radarOpacity * 0.55;
    ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
    ctx.font = '9px "Share Tech Mono", monospace';
    ctx.textAlign = 'center';
    for (let d = 0; d < 360; d += 30) {
      const a = (d * Math.PI) / 180;
      ctx.fillText(String(d).padStart(3, '0'),
        centerX + Math.cos(a) * radius * 1.12,
        centerY + Math.sin(a) * radius * 1.12 + 3);
    }
    ctx.globalAlpha = radarOpacity;
    ctx.setLineDash([46, 26]);
    ctx.lineDashOffset = -scanAngle * 1.6;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.085, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([10, 34]);
    ctx.lineDashOffset = scanAngle * 2.4;
    ctx.strokeStyle = 'rgba(191, 0, 255, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.105, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // ── Sonar pulse: one soft ring expanding from the centre per sweep. ──
    const pulseT = (scanAngle % 360) / 360;
    ctx.save();
    ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - pulseT) * 0.22 * radarOpacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, Math.max(2, pulseT * radius), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Draw scan line with enhanced glow
    const scanRad = (scanAngle * Math.PI) / 180;

    // Long phosphor afterglow — many cheap wedge fills with exponential
    // falloff read as a real CRT trail instead of a hard-edged fan.
    for (let i = 0; i < 12; i++) {
      const trailAngle = 0.1 * (i + 1);
      const opacity = 0.09 * Math.pow(0.82, i);
      ctx.fillStyle = `rgba(0, 240, 255, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, scanRad - trailAngle, scanRad - trailAngle + 0.1);
      ctx.closePath();
      ctx.fill();
    }

    // Main bright scan line — modest glow (was 20; the fat glow bloomed the
    // whole beam and smeared under video). Keep it a thin bright line.
    ctx.save();
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#00f0ff';

    const gradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + Math.cos(scanRad) * radius,
      centerY + Math.sin(scanRad) * radius
    );
    gradient.addColorStop(0, 'rgba(0, 255, 200, 1)');
    gradient.addColorStop(0.3, 'rgba(0, 240, 255, 0.9)');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(scanRad) * radius,
      centerY + Math.sin(scanRad) * radius
    );
    ctx.stroke();

    // Second brighter line on top
    ctx.lineWidth = 1.5;
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    ctx.stroke();
    ctx.restore();

    // Scan tip glow
    const tipX = centerX + Math.cos(scanRad) * radius * 0.95;
    const tipY = centerY + Math.sin(scanRad) * radius * 0.95;
    const tipGlow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 8);
    tipGlow.addColorStop(0, 'rgba(0, 255, 200, 0.7)');
    tipGlow.addColorStop(1, 'rgba(0, 240, 255, 0)');
    ctx.fillStyle = tipGlow;
    ctx.beginPath();
    ctx.arc(tipX, tipY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Track points that need to be updated (scan just passed them)
    const pointsToUpdate: Array<{ key: string; point: ScannedPoint }> = [];

    // Check each live radar point to see if scan just passed it
    radarPoints.forEach((point) => {
      const vmKey = `${point.vm.cluster_id}/${point.vm.node}/${point.vm.vmid}`;
      const pointAngleDeg = ((point.angle * 180) / Math.PI + 360) % 360;
      const angleFromScan = (scanAngle - pointAngleDeg + 360) % 360;

      // If scan line just passed this point (within 5°), update its cached state
      if (angleFromScan <= 5) {
        pointsToUpdate.push({
          key: vmKey,
          point: {
            vm: point.vm,
            angle: point.angle,
            distance: point.distance,
            color: point.color,
            lastScanAngle: scanAngle,
          },
        });
      }
    });

    // Update scanned points state if there are changes
    if (pointsToUpdate.length > 0) {
      setScannedPoints(prev => {
        const next = new Map(prev);
        pointsToUpdate.forEach(({ key, point }) => {
          next.set(key, point);
        });
        // Clean up points for VMs that no longer exist
        const currentVMKeys = new Set(radarPoints.map(p => `${p.vm.cluster_id}/${p.vm.node}/${p.vm.vmid}`));
        for (const key of next.keys()) {
          if (!currentVMKeys.has(key)) {
            next.delete(key);
          }
        }
        return next;
      });
    }

    // Draw VM points using LIVE data (not cached) for correct colors
    radarPoints.forEach((point) => {
      const x = centerX + Math.cos(point.angle) * radius * point.distance;
      const y = centerY + Math.sin(point.angle) * radius * point.distance;

      // Calculate point angle in degrees (0-360)
      const pointAngleDeg = ((point.angle * 180) / Math.PI + 360) % 360;

      // Calculate how long ago the scan line passed this point
      const angleSinceScan = (scanAngle - pointAngleDeg + 360) % 360;

      // Brightness based on time since scan passed:
      // - Just scanned (0-20°): brightest
      // - Recently scanned (20-60°): quick initial fade
      // - Long ago (60-360°): gradual fade to dim
      let brightness;
      if (angleSinceScan < 20) {
        brightness = 1.0; // Peak brightness - scan just passed
      } else if (angleSinceScan < 60) {
        brightness = 1.0 - ((angleSinceScan - 20) / 40) * 0.4; // 1.0 → 0.6
      } else {
        brightness = 0.6 - ((angleSinceScan - 60) / 300) * 0.45; // 0.6 → 0.15
      }

      // Point color based on LIVE health state
      let color = '#00ff88';
      if (point.color === 'warning') color = '#ff6b00';
      if (point.color === 'danger') color = '#ff0040';

      const hasTask = !!point.task;
      const isMigrating = point.task?.task_type?.includes('migrate');

      // Draw task indicator rings for VMs with running tasks
      if (hasTask) {
        const taskColor = isMigrating ? '#00f0ff' : '#a855f7';
        const pulsePhase = (Date.now() / 500) % 1; // 0.5s pulse cycle

        // Outer pulsing ring
        ctx.beginPath();
        ctx.arc(x, y, 12 + pulsePhase * 8, 0, Math.PI * 2);
        ctx.strokeStyle = taskColor;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = (1 - pulsePhase) * 0.6 * radarOpacity;
        ctx.stroke();

        // Inner ring (static)
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = taskColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.8 * radarOpacity;
        ctx.stroke();

        // For migration tasks, draw additional rotating arc
        if (isMigrating) {
          const rotateAngle = (Date.now() / 200) % (Math.PI * 2);
          ctx.beginPath();
          ctx.arc(x, y, 15, rotateAngle, rotateAngle + Math.PI / 2);
          ctx.strokeStyle = taskColor;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.9 * radarOpacity;
          ctx.stroke();

          // Draw data particles spiraling outward for migration
          for (let i = 0; i < 3; i++) {
            const particleAngle = rotateAngle + (i * Math.PI * 2 / 3);
            const particleDist = 8 + ((Date.now() / 100 + i * 50) % 100) / 100 * 10;
            const px = x + Math.cos(particleAngle) * particleDist;
            const py = y + Math.sin(particleAngle) * particleDist;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = taskColor;
            ctx.globalAlpha = (0.8 - ((Date.now() / 100 + i * 50) % 100) / 100 * 0.6) * radarOpacity;
            ctx.fill();
          }
        }

        ctx.globalAlpha = radarOpacity;
      }

      // Sonar ping: right after the sweep passes a blip, an expanding
      // ring ripples out and fades. Purely a function of angleSinceScan
      // — no extra state, freezes with the sweep when paused.
      if (angleSinceScan < 28) {
        const k = angleSinceScan / 28;
        ctx.beginPath();
        ctx.arc(x, y, 4 + k * 10, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = (1 - k) * 0.3 * radarOpacity;
        ctx.stroke();
      }

      // Draw point using live CPU value for size (3–6px; smaller than before so
      // a dense idle ring reads as separate dots, not a merged mass)
      ctx.beginPath();
      ctx.arc(x, y, 3 + (point.vm.cpu.usage_percent / 100) * 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = brightness * radarOpacity;
      ctx.fill();

      // Crisp bright core, NO shadowBlur halo. The blur-glow bloomed every dot
      // into a fuzzy orb that merged into a mush and smeared badly on video —
      // the original crisp radar just drew solid dots. A 1px lighter inner core
      // gives a little depth without any halo.
      ctx.beginPath();
      ctx.arc(x, y, Math.max(1, (3 + (point.vm.cpu.usage_percent / 100) * 3) - 2), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.globalAlpha = brightness * radarOpacity;
      ctx.fill();

      ctx.globalAlpha = radarOpacity;
    });

    // Draw center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#00f0ff';
    ctx.fill();
  }, [scanAngle, radarPoints, entryPhase, radarOpacity]);

  // Handle canvas resize. A plain window 'resize' listener is NOT enough:
  // collapsing/expanding the left sidebar changes the radar container's width
  // WITHOUT firing a window resize, so the canvas bitmap kept its old width
  // while CSS stretched it to fill — drawing a circle as an ellipse. Observe
  // the container directly so any layout-driven size change re-syncs the
  // canvas backing store (the continuous scan animation redraws next frame).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      // Backing store at device resolution; CSS box stays at logical size.
      // The draw effect applies setTransform(dpr) so geometry/fonts keep their
      // authored CSS-pixel sizes but render sharp on HiDPI / 2× capture.
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    window.addEventListener('resize', handleResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!cluster && !isAllClusters) {
    return (
      <div className="radar-scan empty">
        <div className="empty-message">
          <span className="loading-spinner" />
          <span>{t('cluster.select')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="radar-scan">
      <div className="grid-floor" />

      {/* Header */}
      <div className="radar-header">
        <h1 className="radar-title font-display">
          <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2v4M12 12l7 7" strokeLinecap="round" />
          </svg>
          {t('nav.radar_scan').toUpperCase()}
        </h1>
      </div>

      {/* Main Layout */}
      <div className="radar-layout">
        {/* Radar Canvas */}
        <div className={`radar-container ${entryPhase !== 'done' ? 'entering' : ''} ${entryPhase === 'grid' ? 'grid-phase' : ''}`} ref={containerRef} style={{ position: 'relative' }}>
          {/* Radar Entry Animation - shows after grid phase */}
          {(entryPhase === 'line' || entryPhase === 'flip') && (
            <div className={`radar-entry-overlay ${entryPhase}`}>
              <div className="entry-line" />
              <div className="entry-circle" />
              <div className="entry-glow" />
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="radar-canvas"
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              cursor: hoveredPoint ? 'pointer' : 'default',
            }}
          />
          <div className="radar-overlay" style={{ opacity: radarOpacity }}>
            <div className="scan-indicator">
              SCANNING... {scanAngle.toFixed(0)}°
            </div>
          </div>

          {/* Hover Tooltip with Connecting Line */}
          {hoveredPoint && (() => {
            // Get canvas for dimensions
            const canvas = canvasRef.current;
            if (!canvas) return null;

            // Canvas internal dimensions (coordinate system for points)
            const canvasW = canvas.width;
            const canvasH = canvas.height;

            // Canvas CSS dimensions (for overlay positioning)
            const rect = canvas.getBoundingClientRect();
            const cssW = rect.width;
            const cssH = rect.height;

            // Scale factors: canvas coords -> CSS coords
            const scaleX = cssW / canvasW;
            const scaleY = cssH / canvasH;

            // Point position from mouse handler (in canvas coordinates)
            // Convert to CSS coordinates for positioning
            const pointX = hoveredPoint.pointX * scaleX;
            const pointY = hoveredPoint.pointY * scaleY;

            // Use CSS dimensions for layout
            const W = cssW;
            const H = cssH;

            // Tooltip dimensions - increase height if VM has a task.
            // Heights bumped after global +1px font-size change pushed all
            // rows taller — the previous 120/145 cut the last row off.
            const tooltipWidth = 180;
            const vmTask = findVMTask(hoveredPoint.vm.vmid, hoveredPoint.vm.node, hoveredPoint.vm.cluster_id, cluster, clusters);
            const tooltipHeight = vmTask ? 175 : 145;
            const halfW = tooltipWidth / 2;
            const halfH = tooltipHeight / 2;
            const minGap = 50; // Minimum gap between tooltip edge and point (for pentagon frame)
            const preferredOffset = 120; // Preferred distance from point to tooltip center

            // Calculate tooltip position: offset from point, away from center
            const centerX = W / 2;
            const centerY = H / 2;
            const dx = pointX - centerX;
            const dy = pointY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const normDx = dx / dist;
            const normDy = dy / dist;

            // Helper: calculate distance from point to nearest edge of tooltip
            const distToEdge = (cx: number, cy: number): number => {
              const left = cx - halfW;
              const right = cx + halfW;
              const top = cy - halfH;
              const bottom = cy + halfH;

              // If point is inside tooltip, return negative
              if (pointX >= left && pointX <= right && pointY >= top && pointY <= bottom) {
                return -1;
              }

              // Find closest point on tooltip rectangle to the point
              const closestX = Math.max(left, Math.min(right, pointX));
              const closestY = Math.max(top, Math.min(bottom, pointY));
              return Math.sqrt((pointX - closestX) ** 2 + (pointY - closestY) ** 2);
            };

            // Helper: clamp position to stay within bounds
            const boundaryMargin = 20;
            const clamp = (cx: number, cy: number): { x: number; y: number } => ({
              x: Math.max(halfW + boundaryMargin, Math.min(W - halfW - boundaryMargin, cx)),
              y: Math.max(halfH + boundaryMargin, Math.min(H - halfH - boundaryMargin, cy)),
            });

            // Line must connect at exactly 45°, 135°, 225°, or 315°
            // These are the four diagonal directions
            const diagonals = [
              { dx: 0.707, dy: -0.707, name: '45° (top-right)' },
              { dx: -0.707, dy: -0.707, name: '135° (top-left)' },
              { dx: -0.707, dy: 0.707, name: '225° (bottom-left)' },
              { dx: 0.707, dy: 0.707, name: '315° (bottom-right)' },
            ];

            // Sort diagonals by how aligned they are with the outward direction from center
            const sortedDiagonals = [...diagonals].sort((a, b) => {
              const dotA = a.dx * normDx + a.dy * normDy;
              const dotB = b.dx * normDx + b.dy * normDy;
              return dotB - dotA; // Higher dot product = more aligned with outward
            });

            let bestPos = { x: pointX + normDx * preferredOffset, y: pointY + normDy * preferredOffset };
            let foundValid = false;

            // Try each diagonal direction in priority order
            for (const diag of sortedDiagonals) {
              const raw = {
                x: pointX + diag.dx * preferredOffset,
                y: pointY + diag.dy * preferredOffset,
              };
              const clamped = clamp(raw.x, raw.y);

              // Check if clamping changed the position significantly (would break the 45° angle)
              const clampedDx = clamped.x - pointX;
              const clampedDy = clamped.y - pointY;
              const clampedDist = Math.sqrt(clampedDx * clampedDx + clampedDy * clampedDy);

              // Verify the angle is still ~45° (check if dx ≈ dy in absolute terms)
              const anglePreserved = clampedDist > 30 &&
                Math.abs(Math.abs(clampedDx) - Math.abs(clampedDy)) < 20;

              const edgeDist = distToEdge(clamped.x, clamped.y);

              if (anglePreserved && edgeDist >= minGap) {
                bestPos = clamped;
                foundValid = true;
                break;
              }
            }

            // Second pass: try with larger offset
            if (!foundValid) {
              for (const diag of sortedDiagonals) {
                const raw = {
                  x: pointX + diag.dx * (preferredOffset + 60),
                  y: pointY + diag.dy * (preferredOffset + 60),
                };
                const clamped = clamp(raw.x, raw.y);

                const clampedDx = clamped.x - pointX;
                const clampedDy = clamped.y - pointY;
                const clampedDist = Math.sqrt(clampedDx * clampedDx + clampedDy * clampedDy);
                const anglePreserved = clampedDist > 30 &&
                  Math.abs(Math.abs(clampedDx) - Math.abs(clampedDy)) < 20;

                const edgeDist = distToEdge(clamped.x, clamped.y);

                if (anglePreserved && edgeDist >= minGap) {
                  bestPos = clamped;
                  foundValid = true;
                  break;
                }
              }
            }

            // Final fallback: use best diagonal, adjust to maintain 45° angle
            if (!foundValid) {
              const diag = sortedDiagonals[0];
              // Calculate max offset that keeps tooltip in bounds while maintaining angle
              const maxOffsetX = diag.dx > 0
                ? (W - halfW - 10 - pointX) / diag.dx
                : (halfW + 10 - pointX) / diag.dx;
              const maxOffsetY = diag.dy > 0
                ? (H - halfH - 10 - pointY) / diag.dy
                : (halfH + 10 - pointY) / diag.dy;
              const maxOffset = Math.min(Math.abs(maxOffsetX), Math.abs(maxOffsetY), preferredOffset);
              const finalOffset = Math.max(minGap + 20, maxOffset);

              bestPos = {
                x: pointX + diag.dx * finalOffset,
                y: pointY + diag.dy * finalOffset,
              };
            }

            // Final clamp to ensure tooltip stays within visible bounds
            // Use larger margin to ensure tooltip stays fully inside radar area
            const margin = 20;
            const tooltipCenterX = Math.max(halfW + margin, Math.min(W - halfW - margin, bestPos.x));
            const tooltipCenterY = Math.max(halfH + margin, Math.min(H - halfH - margin, bestPos.y));

            // Point position (already in canvas coords = CSS coords)
            const safePointX = pointX;
            const safePointY = pointY;

            // Pentagon frame geometry
            const frameSize = 20;
            const outerFrameSize = 28;
            const frameSides = 5;
            const frameRotation = -Math.PI / 2;

            // Tooltip position - tooltipCenterX/Y is the CENTER of the tooltip
            // So we offset by half dimensions for actual left/top
            const tooltipLeft = tooltipCenterX - halfW;
            const tooltipTop = tooltipCenterY - halfH;

            // Line connects from point to tooltip center
            const edgeX = tooltipCenterX;
            const edgeY = tooltipCenterY;

            // Get color based on MAX(CPU, MEM, DISK) - same as radar point
            const memPct = hoveredPoint.vm.memory.total_bytes > 0
              ? (hoveredPoint.vm.memory.used_bytes / hoveredPoint.vm.memory.total_bytes) * 100
              : 0;
            const diskPct = hoveredPoint.vm.disk?.usage_percent || 0;
            const maxMetric = Math.max(hoveredPoint.vm.cpu.usage_percent, memPct, diskPct);
            const healthColorClass = getHealthColor(maxMetric);
            const colorMap: Record<string, string> = {
              'success': '#00ff88',
              'warning': '#ff6b00',
              'danger': '#ff0040'
            };
            const tooltipColor = colorMap[healthColorClass] || '#00f0ff';

            // Don't render if dimensions are invalid
            if (W <= 0 || H <= 0) return null;

            return (
              <>
                {/* Connecting Line using CSS div */}
                {(() => {
                  // Calculate line geometry
                  const lineLength = Math.sqrt((edgeX - safePointX) ** 2 + (edgeY - safePointY) ** 2);
                  const angle = Math.atan2(edgeY - safePointY, edgeX - safePointX) * 180 / Math.PI;

                  return (
                    <div
                      className="tooltip-connection-line"
                      style={{
                        position: 'absolute',
                        left: safePointX,
                        top: safePointY,
                        width: lineLength,
                        height: 2,
                        background: `linear-gradient(90deg, ${tooltipColor}, ${tooltipColor}80)`,
                        transformOrigin: '0 50%',
                        transform: `rotate(${angle}deg)`,
                        boxShadow: `0 0 8px ${tooltipColor}, 0 0 16px ${tooltipColor}60`,
                        pointerEvents: 'none',
                        zIndex: 99,
                      }}
                    />
                  );
                })()}

                {/* Pentagon targeting frame */}
                <svg
                  className="target-frame-svg"
                  style={{
                    position: 'absolute',
                    left: safePointX - outerFrameSize - 5,
                    top: safePointY - outerFrameSize - 5,
                    width: (outerFrameSize + 5) * 2,
                    height: (outerFrameSize + 5) * 2,
                    pointerEvents: 'none',
                    zIndex: 100,
                    overflow: 'visible',
                  }}
                >
                  <defs>
                    <filter id="frameGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {(() => {
                    const cx = outerFrameSize + 5;
                    const cy = outerFrameSize + 5;
                    const points = [];
                    for (let i = 0; i < frameSides; i++) {
                      const angle = frameRotation + (i * 2 * Math.PI) / frameSides;
                      points.push(`${cx + frameSize * Math.cos(angle)},${cy + frameSize * Math.sin(angle)}`);
                    }
                    const pentagonPath = points.join(' ');

                    const outerPoints = [];
                    for (let i = 0; i < frameSides; i++) {
                      const angle = frameRotation + (i * 2 * Math.PI) / frameSides;
                      outerPoints.push(`${cx + outerFrameSize * Math.cos(angle)},${cy + outerFrameSize * Math.sin(angle)}`);
                    }
                    const outerPentagonPath = outerPoints.join(' ');

                    return (
                      <>
                        {/* Outer rotating pentagon */}
                        <polygon
                          points={outerPentagonPath}
                          fill="none"
                          stroke={tooltipColor}
                          strokeWidth="1"
                          strokeDasharray="8 4"
                          className="target-frame-outer"
                          style={{ transformOrigin: `${cx}px ${cy}px` }}
                        />
                        {/* Inner pentagon frame */}
                        <polygon
                          points={pentagonPath}
                          fill="none"
                          stroke={tooltipColor}
                          strokeWidth="1.5"
                          className="target-frame"
                          filter="url(#frameGlow)"
                        />
                        {/* Corner brackets */}
                        {[0, 1, 2, 3, 4].map(i => {
                          const angle = frameRotation + (i * 2 * Math.PI) / frameSides;
                          const cornerX = cx + frameSize * Math.cos(angle);
                          const cornerY = cy + frameSize * Math.sin(angle);
                          const bracketSize = 6;
                          const prevAngle = frameRotation + ((i - 1 + frameSides) % frameSides * 2 * Math.PI) / frameSides;
                          const nextAngle = frameRotation + ((i + 1) % frameSides * 2 * Math.PI) / frameSides;
                          const toPrevX = cornerX + bracketSize * Math.cos(prevAngle + Math.PI);
                          const toPrevY = cornerY + bracketSize * Math.sin(prevAngle + Math.PI);
                          const toNextX = cornerX + bracketSize * Math.cos(nextAngle + Math.PI);
                          const toNextY = cornerY + bracketSize * Math.sin(nextAngle + Math.PI);
                          return (
                            <g key={i}>
                              <line x1={cornerX} y1={cornerY} x2={toPrevX} y2={toPrevY} stroke={tooltipColor} strokeWidth="2" />
                              <line x1={cornerX} y1={cornerY} x2={toNextX} y2={toNextY} stroke={tooltipColor} strokeWidth="2" />
                            </g>
                          );
                        })}
                        {/* Center crosshair */}
                        <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} stroke={tooltipColor} strokeWidth="1" />
                        <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 5} stroke={tooltipColor} strokeWidth="1" />
                      </>
                    );
                  })()}
                </svg>

                {/* Tooltip Card */}
                <div
                  className={`radar-tooltip tooltip-${healthColorClass}`}
                  style={{
                    position: 'absolute',
                    left: tooltipLeft,
                    top: tooltipTop,
                    width: tooltipWidth,
                    height: tooltipHeight,
                    borderColor: tooltipColor,
                    boxShadow: `0 0 15px ${tooltipColor}40, 0 0 30px ${tooltipColor}20`,
                    pointerEvents: 'none',
                    zIndex: 101,
                    transform: 'none', // Override CSS transform
                  }}
                >
                  <div className="tooltip-corner tl" style={{ borderColor: tooltipColor }} />
                  <div className="tooltip-corner tr" style={{ borderColor: tooltipColor }} />
                  <div className="tooltip-corner bl" style={{ borderColor: tooltipColor }} />
                  <div className="tooltip-corner br" style={{ borderColor: tooltipColor }} />
                  <div className="tooltip-header">
                    <span className="tooltip-name">{hoveredPoint.vm.name}</span>
                    <span className="tooltip-id">#{hoveredPoint.vm.vmid}</span>
                  </div>
                  <div className="tooltip-row">
                    <span className="tooltip-label">NODE</span>
                    <span className="tooltip-value">{hoveredPoint.vm.node}</span>
                  </div>
                  <div className="tooltip-row">
                    <span className="tooltip-label">CPU</span>
                    <span className={`tooltip-value text-${getHealthColor(hoveredPoint.vm.cpu.usage_percent)}`}>
                      {formatPercent(hoveredPoint.vm.cpu.usage_percent, 1)}
                    </span>
                  </div>
                  <div className="tooltip-row">
                    <span className="tooltip-label">MEMORY</span>
                    <span className={`tooltip-value text-${getHealthColor((hoveredPoint.vm.memory.used_bytes / hoveredPoint.vm.memory.total_bytes) * 100)}`}>
                      {formatPercent((hoveredPoint.vm.memory.used_bytes / hoveredPoint.vm.memory.total_bytes) * 100, 1)}
                    </span>
                  </div>
                  <div className="tooltip-row">
                    <span className="tooltip-label">DISKIO</span>
                    <span className={`tooltip-value text-${getHealthColor(hoveredPoint.vm.disk?.usage_percent || 0)}`}>
                      {formatPercent(hoveredPoint.vm.disk?.usage_percent || 0, 1)}
                    </span>
                  </div>
                  {(() => {
                    const task = findVMTask(hoveredPoint.vm.vmid, hoveredPoint.vm.node, hoveredPoint.vm.cluster_id, cluster, clusters);
                    const taskInfo = getTaskInfo(task);
                    if (taskInfo) {
                      return (
                        <div className="tooltip-row tooltip-task-row" style={{ borderTop: `1px solid ${taskInfo.color}40`, marginTop: 4, paddingTop: 4 }}>
                          <span className="tooltip-label">TASK</span>
                          <span className="tooltip-value" style={{ color: taskInfo.color }}>
                            {taskInfo.label}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                  <div className="tooltip-scanline" />
                </div>
              </>
            );
          })()}

          {/* Radar Legend */}
          <div className="radar-legend" style={{ opacity: radarOpacity }}>
            <span className="legend-dot" style={{ background: '#00ff88' }} />
            <span>&lt;80%</span>
            <span className="legend-dot" style={{ background: '#ff6b00' }} />
            <span>80-95%</span>
            <span className="legend-dot" style={{ background: '#ff0040' }} />
            <span>&gt;95%</span>
            <span className="legend-note">(max CPU/MEM/DISK)</span>
          </div>
        </div>

        {/* Anomaly List */}
        <div className="anomaly-panel panel panel-scan">
          <div className="panel-header">
            <h2 className="panel-title font-display">{t('radar.anomalies')}</h2>
            <span className="anomaly-count">{anomalies.length}</span>
          </div>

          <div className="anomaly-list">
            {anomalies.length === 0 ? (
              <div className="no-anomalies">
                <span className="status-indicator" />
                <span>{t('radar.all_normal')}</span>
              </div>
            ) : (
              anomalies.map((vm, index) => {
                const key = `${vm.cluster_id}/${vm.node}/${vm.vmid}`;
                const prevIndex = previousAnomalyMap.get(key);
                const isSelected = hoveredPoint?.vm.node === vm.node && hoveredPoint?.vm.vmid === vm.vmid && hoveredPoint?.vm.cluster_id === vm.cluster_id;
                const task = findVMTask(vm.vmid, vm.node, vm.cluster_id, cluster, clusters);
                return (
                  <AnomalyItem
                    key={key}
                    vm={vm}
                    index={index}
                    previousIndex={prevIndex}
                    onClick={() => handleAnomalyClick(vm)}
                    onContextMenu={handleAnomalyContextMenu}
                    isSelected={isSelected}
                    task={task}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Right-click context menu — same component HoloMatrix uses; full
          set of actions (console / snapshots / backup / remote-migrate)
          works in radar too via the modals below. */}
      <VMContextMenu
        state={contextMenu}
        onClose={closeContextMenu}
        onShowDetails={() => {
          // Radar's "details" = highlight + info card on the
          // corresponding radar point (same as clicking the anomaly
          // card directly). Closes the menu and shows the tooltip
          // overlay where the dot lives, so the operator stays on the
          // radar instead of being thrown to /matrix.
          if (contextMenu.vm) handleAnomalyClick(contextMenu.vm);
        }}
        onPowerAction={requestPowerAction}
        onOpenConsole={handleOpenConsole}
        onOpenSnapshots={() => {
          if (!contextMenu.vm) return;
          setSnapshotVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onBackupNow={() => {
          if (!contextMenu.vm) return;
          setBackupVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        onRemoteMigrate={() => {
          if (!contextMenu.vm) return;
          setRemoteMigrateVm({ vm: contextMenu.vm, clusterId: contextMenu.clusterId });
        }}
        getNodeHealth={getNodeHealth}
        userRole={userRole}
        consoleMode={consoleMode}
        consolePasswordSet={false}
      />

      {/* Snapshots / backup / remote-migrate / console-prompt modals.
          Same components used in HoloMatrix; rendering them here means
          right-clicking from radar gets identical functionality.
          IMPORTANT: vm props are wrapped in <ModalShim/> below so the vm
          object reference is stable. Without this, the radar's 50ms
          scan-angle re-render passes a NEW vm object every frame, which
          re-triggers the modal's `useEffect([open, cluster_id, vm])` —
          resetting wizard state + re-fetching endpoints continuously
          (visible as the dropdown popping in/out). */}
      <RadarSnapshotShim sel={snapshotVm} onClose={() => setSnapshotVm(null)} />
      <RadarBackupShim sel={backupVm} onClose={() => setBackupVm(null)} />
      <RadarRemoteMigrateShim sel={remoteMigrateVm} onClose={() => setRemoteMigrateVm(null)} />
      <ConsolePasswordPrompt
        open={consolePromptVm !== null}
        cluster_id={consolePromptVm?.clusterId || ''}
        pveUser="root@pam"
        onCancel={() => setConsolePromptVm(null)}
        onSubmit={async (password) => {
          if (!consolePromptVm) return;
          const { vm, clusterId } = consolePromptVm;
          const win = openPlaceholderTab();
          try {
            const r = await api.consolePrepare({
              cluster_id: clusterId, node: vm.node, vmid: vm.vmid, password,
            });
            openConsoleTab(clusterId, vm, r.console_token, r.vnc_password, win);
          } catch (e: unknown) {
            if (win && !win.closed) win.close();
            const msg = (e instanceof Error) ? e.message : String(e);
            await dialog.alert(t('console.prepare_failed', { err: msg }));
          }
          setConsolePromptVm(null);
        }}
      />

      <style>{`
        .radar-scan {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
        }

        .radar-scan.empty {
          align-items: center;
          justify-content: center;
        }

        /* Canvas always visible - grid is continuously drawn */
        .radar-canvas {
          opacity: 1;
        }

        /* Hide scan indicator during entry animation */
        .radar-container.entering .radar-overlay {
          opacity: 0;
        }

        /* Radar Entry Animation - inside radar container only */
        .radar-entry-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border-radius: 50%;
          pointer-events: none;
        }

        .radar-entry-overlay.flip {
          animation: radar-overlay-fade 2.0s ease-out 0.2s forwards;
        }

        @keyframes radar-overlay-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Horizontal line that expands from center */
        .entry-line {
          position: absolute;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--primary) 20%, var(--primary) 80%, transparent 100%);
          box-shadow: 0 0 15px var(--primary), 0 0 30px var(--primary), 0 0 45px rgba(0, 240, 255, 0.5);
          animation: radar-line-expand 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes radar-line-expand {
          0% {
            width: 0;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            width: 70vmin;
            opacity: 1;
          }
        }

        .radar-entry-overlay.flip .entry-line {
          animation: radar-line-to-circle 2.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes radar-line-to-circle {
          0% {
            width: 70vmin;
            height: 3px;
            border-radius: 2px;
            background: linear-gradient(90deg, transparent 0%, var(--primary) 20%, var(--primary) 80%, transparent 100%);
          }
          50% {
            width: 35vmin;
            height: 35vmin;
            border-radius: 50%;
            background: transparent;
            border: 2px solid var(--primary);
            box-shadow: 0 0 20px var(--primary), inset 0 0 30px rgba(0, 240, 255, 0.1);
          }
          100% {
            width: 65vmin;
            height: 65vmin;
            border-radius: 50%;
            background: transparent;
            border: 1.5px solid rgba(0, 240, 255, 0.25);
            opacity: 0;
            box-shadow: 0 0 15px var(--primary);
          }
        }

        /* Circle rings that pulse outward */
        .entry-circle {
          position: absolute;
          width: 0;
          height: 0;
          border: 1px solid var(--primary);
          border-radius: 50%;
          opacity: 0;
        }

        .radar-entry-overlay.flip .entry-circle {
          animation: radar-circle-pulse 2.0s ease-out 0.2s forwards;
        }

        @keyframes radar-circle-pulse {
          0% {
            width: 15vmin;
            height: 15vmin;
            opacity: 0;
            border-width: 2px;
          }
          30% {
            opacity: 0.8;
            box-shadow: 0 0 20px var(--primary);
          }
          100% {
            width: 65vmin;
            height: 65vmin;
            opacity: 0;
            border-width: 1.5px;
          }
        }

        /* Center glow effect */
        .entry-glow {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 20px 10px var(--primary), 0 0 40px 20px rgba(0, 240, 255, 0.5);
          animation: radar-glow-pulse 0.35s ease-out forwards;
        }

        @keyframes radar-glow-pulse {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: none;
            opacity: 0.8;
          }
        }

        .radar-entry-overlay.flip .entry-glow {
          animation: radar-glow-expand 0.5s ease-out forwards;
        }

        @keyframes radar-glow-expand {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(2.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }


        .empty-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--text-secondary);
        }

        .radar-header {
          margin-bottom: var(--spacing-lg);
        }

        .radar-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }

        .radar-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: radarIconSpin 8s linear infinite;
        }

        @keyframes radarIconSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .radar-subtitle {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        .radar-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--spacing-lg);
          min-height: 0;
        }

        .radar-container {
          position: relative;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: visible;
        }

        /* Radar Tooltip */
        .radar-tooltip {
          position: absolute;
          /* Positioned by left/top (the computed top-left corner, already
             edge-clamped in JS). NO translate — a -50% shift here (and in the
             materialize keyframes below) was overriding the inline transform
             via animation fill-mode:forwards and pushing the card off-screen. */
          transform: none;
          background: linear-gradient(135deg, rgba(0, 20, 40, 0.95), rgba(0, 10, 30, 0.98));
          border: 1px solid var(--primary);
          border-radius: var(--radius-sm);
          padding: var(--spacing-sm);
          min-width: 180px;
          z-index: 100;
          pointer-events: none;
          animation: tooltip-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          overflow: hidden;
        }

        .radar-tooltip::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 240, 255, 0.1) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0, 240, 255, 0.05) 100%
          );
          pointer-events: none;
          animation: tooltip-hologram 2s ease-in-out infinite;
        }

        .radar-tooltip::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 240, 255, 0.15),
            transparent
          );
          animation: tooltip-shine 1.5s ease-in-out 0.3s;
        }

        @keyframes tooltip-hologram {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes tooltip-shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        @keyframes tooltip-materialize {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateX(20deg);
            filter: blur(8px) brightness(3);
            clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
          }
          30% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: blur(4px) brightness(2);
          }
          60% {
            transform: scale(1.02);
            filter: blur(1px) brightness(1.3);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }

        /* Tooltip corner decorations */
        .tooltip-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: var(--primary);
          animation: corner-appear 0.3s ease-out forwards;
          opacity: 0;
        }

        .tooltip-corner.tl {
          top: -1px;
          left: -1px;
          border-top: 2px solid;
          border-left: 2px solid;
          animation-delay: 0.2s;
        }

        .tooltip-corner.tr {
          top: -1px;
          right: -1px;
          border-top: 2px solid;
          border-right: 2px solid;
          animation-delay: 0.25s;
        }

        .tooltip-corner.bl {
          bottom: -1px;
          left: -1px;
          border-bottom: 2px solid;
          border-left: 2px solid;
          animation-delay: 0.3s;
        }

        .tooltip-corner.br {
          bottom: -1px;
          right: -1px;
          border-bottom: 2px solid;
          border-right: 2px solid;
          animation-delay: 0.35s;
        }

        @keyframes corner-appear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Tooltip scanline effect */
        .tooltip-scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: tooltip-scan 1.5s linear infinite;
        }

        @keyframes tooltip-scan {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(80px);
            opacity: 0;
          }
        }

        /* Connecting line animation - solid line with draw effect */
        .tooltip-line {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: line-draw 0.4s ease-out forwards;
        }

        @keyframes line-draw {
          0% {
            stroke-dashoffset: 2000;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: none;
            opacity: 1;
          }
        }

        /* Secondary glow line */
        .tooltip-line-glow {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: line-draw-glow 0.4s ease-out forwards, line-pulse 1.5s ease-in-out 0.4s infinite;
        }

        @keyframes line-draw-glow {
          0% {
            stroke-dashoffset: 2000;
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: none;
            opacity: 0.3;
          }
        }

        @keyframes line-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Pentagon targeting frame */
        .target-frame {
          animation: frame-pulse 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 4px currentColor);
        }

        .target-frame-outer {
          animation: frame-rotate 8s linear infinite, frame-pulse 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 2px currentColor);
        }

        @keyframes frame-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes frame-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Legacy - keeping for compatibility */
        .point-ring {
          animation: ring-pulse 1s ease-out infinite;
        }

        .point-ring-outer {
          animation: ring-pulse 1s ease-out 0.3s infinite;
        }

        @keyframes ring-pulse {
          0% {
            opacity: 0.8;
            transform-origin: center;
          }
          100% {
            opacity: 0;
            r: 25;
          }
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
          padding-bottom: var(--spacing-xs);
          border-bottom: 1px solid var(--border);
        }

        .tooltip-name {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--primary);
          flex: 1;
        }

        .tooltip-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .tooltip-row {
          display: flex;
          justify-content: space-between;
          margin-top: 2px;
        }

        .tooltip-label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .tooltip-value {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        .radar-canvas {
          width: 100%;
          height: 100%;
        }

        .radar-overlay {
          position: absolute;
          top: var(--spacing-md);
          left: var(--spacing-md);
        }

        .scan-indicator {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--primary);
          text-shadow: 0 0 10px var(--primary);
          animation: pulse 1s ease-in-out infinite;
        }

        .radar-legend {
          position: absolute;
          bottom: var(--spacing-md);
          left: var(--spacing-md);
          display: flex;
          background: rgba(0, 10, 20, 0.8);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px 10px;
          font-size: 12px;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          z-index: 10;
        }

        /* Mobile/tablet: hide legend */
        @media (max-width: 1200px) {
          .radar-legend {
            display: none;
          }
        }

        .radar-legend .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 4px currentColor;
        }

        .radar-legend .legend-note {
          color: var(--text-muted);
          margin-left: 4px;
        }

        .anomaly-panel {
          padding: var(--spacing-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
        }

        .anomaly-count {
          font-family: var(--font-mono);
          font-size: 15px;
          color: var(--warning);
          padding: 2px 8px;
          background: rgba(255, 107, 0, 0.2);
          border: 1px solid var(--warning);
          border-radius: var(--radius-sm);
        }

        .anomaly-list {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: 4px;
          margin: -4px;
        }

        .no-anomalies {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xl);
          color: var(--success);
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .no-anomalies .status-indicator {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .anomaly-item {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: linear-gradient(135deg, rgba(0, 20, 35, 0.9) 0%, rgba(5, 15, 30, 0.95) 100%);
          border: none;
          padding: 10px 12px;
          min-height: 52px;
          transition: all 0.3s ease-out;
          animation: anomaly-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
          clip-path: polygon(
            0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
            100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)
          );
        }

        .anomaly-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 240, 255, 0.15) 0%,
            transparent 40%,
            transparent 60%,
            rgba(0, 240, 255, 0.08) 100%
          );
          pointer-events: none;
        }

        .anomaly-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: anomaly-scan 2s linear infinite;
          transform: translateY(0);
        }

        @keyframes anomaly-scan {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(60px); opacity: 0; }
        }

        @keyframes anomaly-materialize {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.9);
            filter: blur(4px) brightness(2);
            clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
          }
          40% {
            clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        /* Sci-fi corner brackets */
        .anomaly-item .corner-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          pointer-events: none;
        }

        .anomaly-item .corner-bracket.tl { top: 2px; left: 2px; border-top: 2px solid var(--primary); border-left: 2px solid var(--primary); }
        .anomaly-item .corner-bracket.tr { top: 2px; right: 2px; border-top: 2px solid var(--primary); border-right: 2px solid var(--primary); }
        .anomaly-item .corner-bracket.bl { bottom: 2px; left: 2px; border-bottom: 2px solid var(--primary); border-left: 2px solid var(--primary); }
        .anomaly-item .corner-bracket.br { bottom: 2px; right: 2px; border-bottom: 2px solid var(--primary); border-right: 2px solid var(--primary); }

        .anomaly-header {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .anomaly-task-badge {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          padding: 2px 5px;
          border: 1px solid;
          border-radius: 3px;
          letter-spacing: 0.05em;
          animation: task-badge-pulse 1.5s ease-in-out infinite;
          white-space: nowrap;
        }

        @keyframes task-badge-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; filter: brightness(1.2); }
        }

        .anomaly-item.has-task {
          border-color: var(--primary);
        }

        .anomaly-item.has-task::after {
          content: '';
          position: absolute;
          inset: -2px;
          border: 1px solid var(--primary);
          border-radius: inherit;
          animation: task-pulse-border 1s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes task-pulse-border {
          0%, 100% { box-shadow: 0 0 2px var(--primary), 0 0 4px var(--primary); opacity: 0.5; }
          50% { box-shadow: 0 0 6px var(--primary), 0 0 10px var(--primary); opacity: 0.8; }
        }

        /* Compact horizontal metrics row */
        .anomaly-bars-row {
          display: flex;
          gap: 6px;
          margin-top: -5px;
        }

        .metric-mini {
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 2px 5px;
          background: rgba(0, 20, 30, 0.6);
          border: 1px solid currentColor;
          border-radius: 3px;
          opacity: 0.9;
        }

        .metric-mini.success {
          color: var(--success);
          border-color: rgba(0, 255, 136, 0.4);
          box-shadow: 0 0 4px rgba(0, 255, 136, 0.2);
        }
        .metric-mini.warning {
          color: var(--warning);
          border-color: rgba(255, 107, 0, 0.4);
          box-shadow: 0 0 4px rgba(255, 107, 0, 0.2);
        }
        .metric-mini.danger {
          color: var(--danger-text);
          border-color: rgba(255, 0, 64, 0.5);
          box-shadow: 0 0 6px rgba(255, 0, 64, 0.3);
          animation: metric-danger-pulse 1s ease-in-out infinite;
        }

        @keyframes metric-danger-pulse {
          0%, 100% { box-shadow: 0 0 4px rgba(255, 0, 64, 0.3); }
          50% { box-shadow: 0 0 8px rgba(255, 0, 64, 0.5); }
        }

        .metric-mini .metric-label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          opacity: 0.8;
        }

        .metric-mini .metric-value {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          text-shadow: 0 0 4px currentColor;
        }

        /* VMID styling */
        .anomaly-vmid {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          opacity: 0.7;
        }

        /* Gauge indicator styles - enhanced visibility */
        .metric-gauge {
          display: flex;
          align-items: center;
          gap: 3px;
          flex: 1;
          min-width: 55px;
          background: rgba(0, 30, 50, 0.8);
          padding: 2px 4px;
          border-radius: 3px;
          border: 1px solid rgba(0, 200, 255, 0.25);
        }

        .metric-gauge .gauge-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
          width: auto;
          margin-right: 1px;
          text-shadow: 0 0 4px currentColor;
        }

        .metric-gauge .gauge-track {
          flex: 1;
          height: 10px;
          background: rgba(0, 5, 15, 0.95);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 2px;
          overflow: visible;
          position: relative;
        }

        .metric-gauge .gauge-segments {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 4px,
            rgba(0, 0, 0, 0.5) 4px,
            rgba(0, 0, 0, 0.5) 5px
          );
          z-index: 2;
          pointer-events: none;
        }

        .metric-gauge .gauge-fill {
          position: absolute;
          top: 1px;
          left: 1px;
          bottom: 1px;
          min-width: 3px;
          border-radius: 1px;
          transition: width 0.3s ease;
          animation: gauge-fill-in 0.6s ease-out forwards;
          transform-origin: left;
          z-index: 1;
        }

        .metric-gauge .gauge-glow {
          position: absolute;
          top: -2px;
          bottom: -2px;
          width: 6px;
          transform: translateX(-50%);
          border-radius: 50%;
          filter: blur(3px);
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          animation: gauge-glow-appear 0.6s ease-out 0.3s forwards;
        }

        @keyframes gauge-glow-appear {
          to { opacity: 0.8; }
        }

        @keyframes gauge-fill-in {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: none;
            opacity: 1;
          }
        }

        .metric-gauge .gauge-value {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          min-width: 22px;
          text-align: right;
          flex-shrink: 0;
          text-shadow: 0 0 4px currentColor;
        }

        /* Success state (green) */
        .metric-gauge.success .gauge-label,
        .metric-gauge.success .gauge-value {
          color: #00ff88;
        }
        .metric-gauge.success .gauge-track {
          border-color: rgba(0, 255, 136, 0.5);
          box-shadow: 0 0 4px rgba(0, 255, 136, 0.2);
        }
        .metric-gauge.success .gauge-fill {
          background: linear-gradient(180deg, #00ff88 0%, #00cc66 50%, #00ff88 100%);
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.9), inset 0 1px 0 rgba(255,255,255,0.4);
        }
        .metric-gauge.success .gauge-glow {
          background: #00ff88;
        }

        /* Warning state (orange) */
        .metric-gauge.warning .gauge-label,
        .metric-gauge.warning .gauge-value {
          color: #ff8800;
        }
        .metric-gauge.warning .gauge-track {
          border-color: rgba(255, 136, 0, 0.5);
          box-shadow: 0 0 4px rgba(255, 136, 0, 0.2);
        }
        .metric-gauge.warning .gauge-fill {
          background: linear-gradient(180deg, #ffaa00 0%, #ff6b00 50%, #ffaa00 100%);
          box-shadow: 0 0 8px rgba(255, 107, 0, 0.9), inset 0 1px 0 rgba(255,255,255,0.4);
        }
        .metric-gauge.warning .gauge-glow {
          background: #ff8800;
        }

        /* Danger state (red) */
        .metric-gauge.danger .gauge-label,
        .metric-gauge.danger .gauge-value {
          color: #ff3366;
          text-shadow: 0 0 6px rgba(255, 0, 64, 0.8);
        }
        .metric-gauge.danger .gauge-track {
          border-color: rgba(255, 0, 64, 0.6);
          box-shadow: 0 0 6px rgba(255, 0, 64, 0.3);
        }
        .metric-gauge.danger .gauge-fill {
          background: linear-gradient(180deg, #ff4466 0%, #ff0040 50%, #ff4466 100%);
          box-shadow: 0 0 10px rgba(255, 0, 64, 1), inset 0 1px 0 rgba(255,255,255,0.4);
          animation: gauge-fill-in 0.6s ease-out forwards, gauge-fill-danger-pulse 1s ease-in-out 0.6s infinite;
        }
        .metric-gauge.danger .gauge-glow {
          background: #ff0040;
          animation: gauge-glow-appear 0.6s ease-out 0.3s forwards, gauge-glow-pulse 0.8s ease-in-out 0.6s infinite;
        }

        @keyframes gauge-fill-danger-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(255, 0, 64, 1); }
          50% { opacity: 0.85; box-shadow: 0 0 15px rgba(255, 0, 64, 1); }
        }

        @keyframes gauge-glow-pulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.3); }
        }

        .track-segments {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 4px,
            rgba(0, 0, 0, 0.4) 4px,
            rgba(0, 0, 0, 0.4) 5px
          );
          z-index: 2;
          pointer-events: none;
        }

        .inline-fill {
          height: 100%;
          border-radius: 1px;
          transition: width 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .inline-fill.success {
          background: linear-gradient(180deg, #00ff88 0%, #00cc66 50%, #00ff88 100%);
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .inline-fill.warning {
          background: linear-gradient(180deg, #ffaa00 0%, #ff6b00 50%, #ffaa00 100%);
          box-shadow: 0 0 8px rgba(255, 107, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .inline-fill.danger {
          background: linear-gradient(180deg, #ff4466 0%, #ff0040 50%, #ff4466 100%);
          box-shadow: 0 0 8px rgba(255, 0, 64, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
          animation: danger-bar-pulse 1s ease-in-out infinite;
        }

        @keyframes danger-bar-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .fill-glow {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8));
          animation: glow-scan 1.5s ease-in-out infinite;
        }

        @keyframes glow-scan {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .track-value {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 4px rgba(0, 0, 0, 1), 0 0 2px rgba(0, 0, 0, 1);
          z-index: 3;
          letter-spacing: 0.5px;
        }

        .anomaly-item.entering {
          animation: anomaly-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .anomaly-item.warning {
          background: linear-gradient(135deg, rgba(40, 25, 0, 0.9) 0%, rgba(30, 15, 5, 0.95) 100%);
          box-shadow: 0 0 15px rgba(255, 107, 0, 0.2), inset 0 0 30px rgba(255, 107, 0, 0.05);
        }

        .anomaly-item.warning::before {
          background: linear-gradient(
            135deg,
            rgba(255, 107, 0, 0.2) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 107, 0, 0.1) 100%
          );
        }

        .anomaly-item.warning::after {
          background: linear-gradient(90deg, transparent, var(--warning), transparent);
        }

        .anomaly-item.warning .corner-bracket { border-color: var(--warning) !important; }

        .anomaly-item.critical {
          background: linear-gradient(135deg, rgba(50, 10, 15, 0.9) 0%, rgba(35, 5, 10, 0.95) 100%);
          box-shadow: 0 0 20px rgba(255, 0, 64, 0.3), inset 0 0 30px rgba(255, 0, 64, 0.08);
          animation: anomaly-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards, critical-pulse 1.5s ease-in-out infinite;
        }

        .anomaly-item.critical::before {
          background: linear-gradient(
            135deg,
            rgba(255, 0, 64, 0.25) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 0, 64, 0.15) 100%
          );
        }

        .anomaly-item.critical::after {
          background: linear-gradient(90deg, transparent, var(--danger), transparent);
        }

        .anomaly-item.critical .corner-bracket { border-color: var(--danger) !important; }

        @keyframes critical-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 64, 0.3), inset 0 0 30px rgba(255, 0, 64, 0.08); }
          50% { box-shadow: 0 0 30px rgba(255, 0, 64, 0.5), inset 0 0 40px rgba(255, 0, 64, 0.15); }
        }

        .anomaly-item.selected {
          transform: scale(1.02);
        }

        .anomaly-item.selected.warning {
          box-shadow: 0 0 15px var(--warning), 0 0 30px rgba(255, 107, 0, 0.3);
          border-color: var(--warning);
        }

        .anomaly-item.selected.critical {
          box-shadow: 0 0 15px var(--danger), 0 0 30px rgba(255, 0, 64, 0.3);
          border-color: var(--danger-text);
        }

        @keyframes warning-pulse-border {
          0%, 100% { box-shadow: 0 0 2px var(--warning), 0 0 4px var(--warning); }
          50% { box-shadow: 0 0 8px var(--warning), 0 0 12px var(--warning); }
        }

        @keyframes danger-pulse-border {
          0%, 100% { box-shadow: 0 0 2px var(--danger), 0 0 4px var(--danger); }
          50% { box-shadow: 0 0 10px var(--danger), 0 0 15px var(--danger); }
        }

        .anomaly-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--text-muted);
        }

        .anomaly-indicator.warning {
          background: var(--warning);
          box-shadow: 0 0 6px var(--warning);
        }

        .anomaly-indicator.danger {
          background: var(--danger);
          box-shadow: 0 0 6px var(--danger);
        }

        .anomaly-name {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .anomaly-stats {
          display: flex;
          gap: var(--spacing-sm);
          flex-shrink: 0;
        }

        .anomaly-stats .stat-cpu,
        .anomaly-stats .stat-mem {
          font-family: var(--font-mono);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .anomaly-stats .stat-label {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .radar-layout {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
          }

          .radar-container {
            min-height: 300px;
          }
        }

      `}</style>
    </div>
  );
}
