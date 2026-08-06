/**
 * JT-PROXENSE Cluster Core View
 * Reactor-style cluster dashboard
 */

import React, { useMemo, useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../i18n';
import type { ClusterData, NodeMetrics, StorageMetrics, NodeHealth } from '../types';
import { formatPercent, formatBytes, formatUptime, getHealthColor } from '../utils/format';
import { ECGMonitor } from '../components/ECGMonitor';
import { NodeRRDSparkline, type Timeframe } from '../components/NodeRRDSparkline';
import { useAuth } from '../composables/useAuth';
import { NodeConfigBackupModal } from '../components/NodeConfigBackupModal';
import { useDialogs } from '../composables/useDialogs';
import { RRDChartModal } from '../components/RRDChartModal';
import { AptUpdatesModal } from '../components/AptUpdatesModal';
import { PoolsModal } from '../components/PoolsModal';
import { FirewallModal } from '../components/FirewallModal';
import { HAStatusModal } from '../components/HAStatusModal';
import { ReplicationModal } from '../components/ReplicationModal';
import { ClusterNotesModal } from '../components/ClusterNotesModal';
import { NodeServicesModal } from '../components/NodeServicesModal';
import { NodeSyslogModal } from '../components/NodeSyslogModal';
import { NodeHardwareModal } from '../components/NodeHardwareModal';
import { NodeNetworkModal } from '../components/NodeNetworkModal';
import { NodeNTPModal } from '../components/NodeNTPModal';
import { NodeNetInfoModal } from '../components/NodeNetInfoModal';
import { NodeMaintenanceModal } from '../components/NodeMaintenanceModal';
import { PVEAccessModal } from '../components/PVEAccessModal';
import { LocksModal } from '../components/LocksModal';
import { FirewallObjectsModal } from '../components/FirewallObjectsModal';
import { SDNAdminModal } from '../components/SDNAdminModal';
import { StorageAdminModal } from '../components/StorageAdminModal';
import { CephAdminModal } from '../components/CephAdminModal';
import { APITokensModal } from '../components/APITokensModal';
import { VMCreateWizard } from '../components/VMCreateWizard';

// Helper to get IO wait color based on thresholds from settings
function getIowaitColor(iowait: number): string {
  const warning = parseFloat(localStorage.getItem('iowait_warning') || '5');
  const critical = parseFloat(localStorage.getItem('iowait_critical') || '10');
  if (iowait >= critical) return 'danger';
  if (iowait >= warning) return 'warning';
  return 'success';
}

// Animated number component with count-up effect
function AnimatedNumber({
  value,
  decimals = 0,
  suffix = '',
  duration = 800,
  className = '',
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const startValue = isFirstRender.current ? 0 : displayValue;
    isFirstRender.current = false;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = startValue + (value - startValue) * easeOut;
      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {displayValue.toFixed(decimals)}{suffix}
    </span>
  );
}

// Animated ratio display (e.g., "5/10")
function AnimatedRatio({ left, right, className = '' }: { left: number; right: number; className?: string }) {
  const [displayLeft, setDisplayLeft] = useState(0);
  const [displayRight, setDisplayRight] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const duration = 800;
    const startL = isFirstRender.current ? 0 : displayLeft;
    const startR = isFirstRender.current ? 0 : displayRight;
    isFirstRender.current = false;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayLeft(Math.round(startL + (left - startL) * easeOut));
      setDisplayRight(Math.round(startR + (right - startR) * easeOut));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayLeft(left);
        setDisplayRight(right);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [left, right]);

  return <span className={className}>{displayLeft}/{displayRight}</span>;
}

// Extract PVE version number from full string like "pve-manager/9.1.1/42db4a6cf33dac83"
function formatPveVersion(version: string): string {
  if (!version) return 'N/A';
  const match = version.match(/pve-manager\/([^\/]+)/);
  return match ? match[1] : version;
}

// Extract kernel version from full string like "Linux 6.14.8-2-pve #1 SMP PREEMPT_DYNAMIC..."
function formatKernelVersion(kernel: string): string {
  if (!kernel) return 'N/A';
  const match = kernel.match(/Linux\s+(\S+)/);
  return match ? match[1] : kernel;
}

interface ClusterCoreProps {
  cluster: ClusterData | null;
  clusters?: Record<string, ClusterData>; // For "all clusters" mode
  onSelectVM: () => void;
  onNavigateToVMMatrix?: (clusterId: string) => void;
  isPaused?: boolean;
}

// Context Menu for Node actions
interface NodeContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  node: NodeMetrics | null;
  clusterId: string;
}

function NodeContextMenu({
  state,
  onClose,
  onShowDetails,
  onShowPerf,
  onOpenShell,
  onShowServices,
  onShowSyslog,
  onShowHardware,
  onShowNetwork,
  onShowNetInfo,
  onShowNTP,
  onConfigBackup,
  onMaintenance,
  getNodeHealth,
}: {
  state: NodeContextMenuState;
  onClose: () => void;
  onShowDetails: () => void;
  onShowPerf: () => void;
  onOpenShell: () => void;
  onShowServices: () => void;
  onShowSyslog: () => void;
  onShowHardware: () => void;
  onShowNetwork: () => void;
  onShowNetInfo: () => void;
  onShowNTP: () => void;
  onConfigBackup: () => void;
  onMaintenance: () => void;
  getNodeHealth: (clusterId: string, node: string) => NodeHealth | null;
}) {
  const { t } = useTranslation();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';

  // Measure-and-flip positioning — keeps the menu close to the cursor
  // and inside the viewport. Earlier the menu was rendered raw at
  // (state.x, state.y) which on right-clicks near the right edge ended
  // up far from the actual node card.
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number; maxHeight: number }>({
    left: state.x, top: state.y, maxHeight: 0,
  });
  useLayoutEffect(() => {
    if (!state.visible) return;
    const el = menuRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = state.x;
    let top = state.y;
    let maxHeight = 0;
    if (left + r.width > vw - margin) {
      left = Math.max(margin, state.x - r.width);
    }
    const spaceBelow = vh - state.y - margin;
    const spaceAbove = state.y - margin;
    // The menu has grown to ten entries plus a stats footer (~600px), so on a
    // 1050px viewport it usually fits NEITHER below nor above a click in the
    // middle of the page. The old order then jumped to "pin to top", which is
    // why it kept appearing nowhere near the cursor. Staying anchored to the
    // click and scrolling is far less disorienting than teleporting to y=8;
    // only give up on the anchor when the remaining strip is too small to be
    // a usable menu.
    const FIT_MIN = 260;
    if (r.height <= spaceBelow) {
      top = state.y;
    } else if (r.height <= spaceAbove) {
      top = Math.max(margin, state.y - r.height);
    } else if (spaceBelow >= FIT_MIN) {
      top = state.y;                       // anchored, scrolls downward
      maxHeight = spaceBelow;
    } else if (spaceAbove >= FIT_MIN) {
      top = margin;                        // anchored upward, scrolls
      maxHeight = spaceAbove;
    } else {
      top = margin;
      maxHeight = vh - 2 * margin;
    }
    if (left !== pos.left || top !== pos.top || maxHeight !== pos.maxHeight) {
      setPos({ left, top, maxHeight });
    }
  }, [state.visible, state.x, state.y]);

  useEffect(() => {
    const handleClickOutside = () => onClose();
    const handleScroll = (e: Event) => {
      if (menuRef.current && e.target instanceof Node
          && menuRef.current.contains(e.target)) {
        return;
      }
      onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (state.visible) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.visible, onClose]);

  if (!state.visible || !state.node) return null;

  const node = state.node;
  const isOnline = node.status === 'online';
  const nodeHealth = getNodeHealth(state.clusterId, node.node);
  const pveUrl = nodeHealth
    ? `https://${nodeHealth.host}:${nodeHealth.port}/#v1:0:=node/${node.node}`
    : null;

  const handleOpenPVE = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pveUrl) {
      window.open(pveUrl, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  const handleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowDetails();
    onClose();
  };

  // Rendered through a portal to document.body. `position: fixed` resolves
  // against the nearest ancestor carrying a transform/filter, and
  // .view-container's page-enter animation leaves one behind (CLAUDE.md #7) --
  // in-tree, every coordinate came out shifted right by the sidebar width.
  return createPortal(
    <div
      ref={menuRef}
      className="node-context-menu"
      style={{
        left: pos.left,
        top: pos.top,
        ...(pos.maxHeight > 0
          ? { maxHeight: pos.maxHeight, overflowY: 'auto' as const }
          : {}),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="context-menu-header">
        <span className={`context-status ${isOnline ? 'online' : 'offline'}`} />
        <span className="context-menu-name">{node.node}</span>
      </div>
      <div className="context-menu-divider" />
      <button className="context-menu-item" onClick={handleShowDetails}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <span>{t('vm.details')}</span>
      </button>
      <button
        className="context-menu-item"
        onClick={(e) => { e.stopPropagation(); onShowPerf(); onClose(); }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 17 9 11 13 15 21 7" />
          <polyline points="14 7 21 7 21 14" />
        </svg>
        <span>{t('vm.perf_charts')}</span>
      </button>
      {isAdmin && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onOpenShell(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span>{t('node.host_shell')}</span>
        </button>
      )}
      <button
        className="context-menu-item"
        onClick={(e) => { e.stopPropagation(); onShowServices(); onClose(); }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"/>
        </svg>
        <span>{t('node.services')}</span>
      </button>
      <button
        className="context-menu-item"
        onClick={(e) => { e.stopPropagation(); onShowSyslog(); onClose(); }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/>
          <line x1="9" y1="17" x2="15" y2="17"/>
        </svg>
        <span>{t('node.syslog')}</span>
      </button>
      <button
        className="context-menu-item"
        onClick={(e) => { e.stopPropagation(); onShowHardware(); onClose(); }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="1"/>
          <rect x="2" y="14" width="20" height="8" rx="1"/>
          <line x1="6" y1="6" x2="6.01" y2="6"/>
          <line x1="6" y1="18" x2="6.01" y2="18"/>
        </svg>
        <span>{t('nhw.button')}</span>
      </button>
      <button
        className="context-menu-item"
        onClick={(e) => { e.stopPropagation(); onShowNetInfo(); onClose(); }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
          <path d="M6 8h.01M10 8h.01M14 8h4"/>
        </svg>
        <span>{t('nic.button')}</span>
      </button>
      {isAdmin && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onShowNetwork(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9"/>
            <path d="M5 12h14M12 5v14"/>
          </svg>
          <span>{t('nn.button')}</span>
        </button>
      )}
      {isAdmin && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onShowNTP(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 3"/>
          </svg>
          <span>{t('ntp.button')}</span>
        </button>
      )}
      {isAdmin && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onConfigBackup(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <path d="M7 10l5 5 5-5"/>
            <path d="M12 15V3"/>
          </svg>
          <span>{t('ncb.button')}</span>
        </button>
      )}
      {isAdmin && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onMaintenance(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
          <span>{t('mm.button')}</span>
        </button>
      )}
      {pveUrl && (
        <button className="context-menu-item" onClick={handleOpenPVE}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>{t('node.open_pve')}</span>
        </button>
      )}
      <div className="context-menu-divider" />
      <div className="context-menu-info">
        <div className="info-row">
          <span>{t('node.status')}:</span>
          <span className={isOnline ? 'text-success' : 'text-danger'}>{isOnline ? t('node.online').toUpperCase() : t('node.offline').toUpperCase()}</span>
        </div>
        <div className="info-row">
          <span>{t('metric.cpu')}:</span>
          <span>{node.cpu.cores} {t('node.cores')}</span>
        </div>
        <div className="info-row">
          <span>{t('metric.memory')}:</span>
          <span>{formatBytes(node.memory.total_bytes)}</span>
        </div>
        <div className="info-row">
          <span>{t('cluster.vms_short')}:</span>
          <span>{node.vm_count}</span>
        </div>
        <div className="info-row">
          <span>{t('cluster.cts_short')}:</span>
          <span>{node.ct_count}</span>
        </div>
      </div>
    </div>
  , document.body);
}

// Reactor Core visualization
function ReactorCore({ cpuUsage, memUsage, compact, label = 'AVG LOAD' }: { cpuUsage: number; memUsage: number; compact?: boolean; label?: string }) {
  const avgUsage = (cpuUsage + memUsage) / 2;
  const color = getHealthColor(avgUsage);
  const glowIntensity = 0.3 + (avgUsage / 100) * 0.7;

  // Animated value state
  const [animatedAvg, setAnimatedAvg] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const duration = 1000;
    const startValue = isFirstRender.current ? 0 : animatedAvg;
    isFirstRender.current = false;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = startValue + (avgUsage - startValue) * easeOut;
      setAnimatedAvg(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedAvg(avgUsage);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [avgUsage]);

  return (
    <div className={`reactor-core ${compact ? 'compact' : ''}`}>
      <svg viewBox="0 0 200 200" className="reactor-svg">
        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={`var(--${color})`}
          strokeWidth="2"
          strokeDasharray={`${avgUsage * 5.65} 565`}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          style={{
            filter: `drop-shadow(0 0 ${glowIntensity * 10}px var(--${color}))`,
            transition: 'all 0.5s ease',
          }}
        />

        {/* Middle ring */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Inner core */}
        <circle
          cx="100"
          cy="100"
          r="50"
          fill={`var(--bg-card)`}
          stroke={`var(--${color})`}
          strokeWidth="2"
          style={{
            filter: `drop-shadow(0 0 ${glowIntensity * 15}px var(--${color}))`,
          }}
        />

        {/* Core value */}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          className="reactor-value"
          fill={`var(--${color})`}
          style={{ textShadow: `0 0 10px var(--${color})` }}
        >
          {animatedAvg.toFixed(0)}%
        </text>
        <text
          x="100"
          y="120"
          textAnchor="middle"
          dominantBaseline="middle"
          className="reactor-label"
          fill="var(--text-secondary)"
          fontSize="8"
        >
          {label}
        </text>
      </svg>

      {/* Pulsing rings animation */}
      <div className="reactor-pulse" style={{ opacity: glowIntensity * 0.3 }} />
    </div>
  );
}

// Node card component
function NodeCard({
  node,
  onClick,
  onContextMenu,
  clusterName,
  clusterId,
  timeframe,
  isPaused = false,
}: {
  node: NodeMetrics;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  clusterName?: string;
  clusterId: string;
  timeframe: Timeframe;
  isPaused?: boolean;
}) {
  const cpuColor = getHealthColor(node.cpu.usage_percent);
  const memColor = getHealthColor(node.memory.used_bytes / node.memory.total_bytes * 100);
  const isOnline = node.status === 'online';
  // Instant metrics — feed both the live ECG and the RRD fallback display.
  const liveCpu = node.cpu.usage_percent;
  const liveMem = (node.memory.used_bytes / node.memory.total_bytes) * 100;
  const liveIO = node.cpu.iowait !== undefined ? Math.min(node.cpu.iowait * 5, 100) : 0;

  return (
    <div
      className={`node-card ${isOnline ? '' : 'offline'}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <div className="node-header">
        <span className={`node-status ${isOnline ? 'online' : 'offline'}`} />
        <span className="node-name">{node.node}</span>
        {clusterName && <span className="node-cluster-tag">{clusterName}</span>}
      </div>

      {/* 'live' = the real-time ECG (animated heartbeat fed by the instant WS
          metrics); every other timeframe = historical RRD sparkline. */}
      <div className="node-ecg-container">
        {timeframe === 'live' ? (
          <ECGMonitor
            cpu={liveCpu}
            memory={liveMem}
            diskIO={liveIO}
            isOnline={isOnline}
            isPaused={isPaused}
          />
        ) : (
          <NodeRRDSparkline
            clusterId={clusterId}
            node={node.node}
            timeframe={timeframe}
            isOnline={isOnline}
            fallback={{ cpu: liveCpu, memory: liveMem, diskIO: liveIO }}
          />
        )}
      </div>

      <div className="node-info">
        <span className="node-info-item">
          {node.vm_count} VMs | {node.ct_count} CTs
        </span>
        <span className="node-info-item">
          {formatUptime(node.uptime)}
        </span>
      </div>

      {/* Corner decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </div>
  );
}

// Live telemetry chart placeholder
function TelemetryChart({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  // Simple bar visualization
  const segments = 20;
  const filled = Math.round((value / 100) * segments);

  return (
    <div className="telemetry-row">
      <span className="telemetry-label">{label}</span>
      <div className="telemetry-bar">
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            className={`telemetry-segment ${i < filled ? `filled ${color}` : ''}`}
          />
        ))}
      </div>
      <span className={`telemetry-value text-${color}`}>
        {value.toFixed(1)}{unit}
      </span>
    </div>
  );
}

// Node Detail Panel
function NodeDetailPanel({
  node,
  storages,
  onClose,
}: {
  node: NodeMetrics;
  storages: StorageMetrics[];
  onClose: () => void;
}) {
  const { t, language } = useTranslation();
  const auth = useAuth();
  const dialog = useDialogs();
  const isAdmin = auth.user?.role_global === 'admin';
  const isOnline = node.status === 'online';
  const cpuPercent = node.cpu.usage_percent;
  const memPercent = (node.memory.used_bytes / node.memory.total_bytes) * 100;
  const diskPercent = (node.disk.used_bytes / node.disk.total_bytes) * 100;

  // Subscription + pending updates fetched on demand. Both are slow-changing
  // so 60s server-side cache is plenty fresh; the panel is short-lived.
  const cid = (node as any).cluster_id || '';
  const [updateCount, setUpdateCount] = useState<number | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [certEarliest, setCertEarliest] = useState<{days: number; subj: string} | null>(null);
  const [aptOpen, setAptOpen] = useState(false);
  useEffect(() => {
    if (!cid) return;
    let alive = true;
    const cidEnc = encodeURIComponent(cid);
    const nameEnc = encodeURIComponent(node.node);
    (async () => {
      try {
        const r = await fetch(`/api/clusters/${cidEnc}/nodes/${nameEnc}/updates`,
          { credentials: 'same-origin' });
        if (r.ok && alive) setUpdateCount((await r.json()).count ?? 0);
      } catch {/* ignore */}
    })();
    (async () => {
      try {
        const r = await fetch(`/api/clusters/${cidEnc}/nodes/${nameEnc}/subscription`,
          { credentials: 'same-origin' });
        if (r.ok && alive) setSubscription((await r.json()).subscription || {});
      } catch {/* ignore */}
    })();
    (async () => {
      try {
        const r = await fetch(`/api/clusters/${cidEnc}/nodes/${nameEnc}/certificates`,
          { credentials: 'same-origin' });
        if (r.ok && alive) {
          const list = ((await r.json()).certificates || []) as any[];
          let soonest: any = null;
          for (const c of list) {
            const exp = c.notafter || c['notafter-formatted'];
            if (!exp) continue;
            const ts = typeof exp === 'number' ? exp : Date.parse(String(exp)) / 1000;
            if (!ts || isNaN(ts)) continue;
            if (!soonest || ts < soonest.ts) soonest = { ts, subj: c.subject || c.filename || 'cert' };
          }
          if (soonest) {
            const days = Math.floor((soonest.ts - Date.now() / 1000) / 86400);
            setCertEarliest({ days, subj: soonest.subj });
          }
        }
      } catch {/* ignore */}
    })();
    return () => { alive = false; };
  }, [cid, node.node]);

  return (
    <div className="node-detail-overlay" onClick={onClose}>
      <AptUpdatesModal
        open={aptOpen}
        clusterId={cid}
        node={node.node}
        onClose={() => setAptOpen(false)}
      />
      <div className="node-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-title">
            <span className={`detail-status ${isOnline ? 'online' : 'offline'}`} />
            <h2>{node.node}</h2>
            <span className="detail-tag">{isOnline ? t('node.online').toUpperCase() : t('node.offline').toUpperCase()}</span>
          </div>
          <button className="detail-close" onClick={onClose}>×</button>
        </div>

        <div className="detail-body">
          {/* System Info */}
          <div className="detail-section">
            <h3 className="section-title">{t('node.system_info')}</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">{t('node.kernel')}</span>
                <span className="info-value">{formatKernelVersion(node.kernel_version)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('node.pve_version')}</span>
                <span className="info-value">{formatPveVersion(node.pve_version)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('node.uptime')}</span>
                <span className="info-value">{formatUptime(node.uptime)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('node.workloads')}</span>
                <span className="info-value">{node.vm_count} VMs, {node.ct_count} CTs</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('node.subscription')}</span>
                <span className="info-value">
                  {subscription === null ? '…'
                    : subscription.status === 'active' ? (
                        <span className="ndp-badge ok">{subscription.level || 'Active'}</span>
                      )
                    : subscription.status ? (
                        <span className="ndp-badge warn">{subscription.status}</span>
                      )
                    : <span className="ndp-badge muted">{t('node.no_sub')}</span>}
                  {isAdmin && (
                    <button className="ndp-act" style={{ marginLeft: 6 }}
                      onClick={async () => {
                        const action = await dialog.prompt(
                          language === 'zh-TW'
                            ? '輸入訂閱碼（PVE-...）以註冊；留空 + recheck 重新查驗；輸入 DELETE 清除：'
                            : 'Subscription key (PVE-...) to register; empty = re-check upstream; type DELETE to remove:',
                          { title: 'Subscription', defaultValue: '' }
                        );
                        if (action === null) return;
                        try {
                          if (action.trim().toUpperCase() === 'DELETE') {
                            const r = await fetch(
                              `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(node.node)}/subscription`,
                              { method: 'DELETE', credentials: 'same-origin' }
                            );
                            const d = await r.json().catch(() => ({}));
                            if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                          } else {
                            const body: any = {};
                            if (action.trim()) body.key = action.trim();
                            const r = await fetch(
                              `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(node.node)}/subscription`,
                              { method: 'PUT', credentials: 'same-origin',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(body) }
                            );
                            const d = await r.json().catch(() => ({}));
                            if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                          }
                          await dialog.alert(language === 'zh-TW' ? '訂閱動作已送出，請重新整理。' : 'Subscription action submitted, refresh to see new state.');
                        } catch (e: any) {
                          await dialog.alert(`Failed: ${e.message || e}`);
                        }
                      }}>{language === 'zh-TW' ? '管理' : 'Manage'}</button>
                  )}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('node.updates_pending')}</span>
                <span className="info-value">
                  {updateCount === null ? '…'
                    : updateCount === 0
                      ? <span className="ndp-badge ok" onClick={() => setAptOpen(true)} style={{cursor:'pointer'}}>0</span>
                      : <span className={`ndp-badge ${updateCount >= 50 ? 'warn' : 'info'}`}
                          onClick={() => setAptOpen(true)} style={{cursor:'pointer'}}
                          title={t('node.click_to_manage')}>{updateCount}</span>}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('node.cert_expires')}</span>
                <span className="info-value">
                  {certEarliest === null ? '…'
                    : certEarliest.days < 0
                      ? <span className="ndp-badge crit" title={certEarliest.subj}>
                          {language === 'zh-TW' ? `已過期 ${Math.abs(certEarliest.days)} 天` : `expired ${Math.abs(certEarliest.days)}d ago`}
                        </span>
                    : certEarliest.days < 30
                      ? <span className="ndp-badge warn" title={certEarliest.subj}>
                          {language === 'zh-TW' ? `${certEarliest.days} 天` : `${certEarliest.days}d`}
                        </span>
                    : <span className="ndp-badge ok" title={certEarliest.subj}>
                          {language === 'zh-TW' ? `${certEarliest.days} 天` : `${certEarliest.days}d`}
                      </span>}
                  {isAdmin && certEarliest !== null && (
                    <button className="ndp-act" style={{ marginLeft: 6 }}
                      onClick={async () => {
                        const ok = await dialog.confirm(
                          `Trigger ACME renewal for ${node.node}? Requires ACME-managed cert; otherwise PVE will reject.`,
                          { title: 'ACME renew?' }
                        );
                        if (!ok) return;
                        try {
                          const r = await fetch(
                            `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(node.node)}/acme/cert`,
                            { method: 'POST', credentials: 'same-origin',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ force: false }) }
                          );
                          const d = await r.json().catch(() => ({}));
                          if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                          await dialog.alert(`ACME task submitted: ${d.upid || '(no upid)'}`);
                        } catch (e: any) {
                          await dialog.alert(`Renew failed: ${e.message || e}`);
                        }
                      }}>{language === 'zh-TW' ? '立即更新' : 'Renew'}</button>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Resource Usage */}
          <div className="detail-section">
            <h3 className="section-title">{t('node.resource_usage')}</h3>
            <div className="resource-bars">
              <div className="resource-bar-item">
                <div className="resource-header">
                  <span className="resource-label">{t('metric.cpu')}</span>
                  <span className={`resource-value text-${getHealthColor(cpuPercent)}`}>
                    {formatPercent(cpuPercent, 1)}
                  </span>
                </div>
                <div className="resource-track">
                  <div className={`resource-fill ${getHealthColor(cpuPercent)}`} style={{ width: `${cpuPercent}%` }} />
                </div>
                <span className="resource-detail">{node.cpu.cores} {t('node.cores')}</span>
              </div>

              {/* IO Wait - important performance metric */}
              {node.cpu.iowait !== undefined && node.cpu.iowait > 0 && (
                <div className="resource-bar-item">
                  <div className="resource-header">
                    <span className="resource-label">{t('node.io_wait')}</span>
                    <span className={`resource-value text-${getIowaitColor(node.cpu.iowait)}`}>
                      {formatPercent(node.cpu.iowait, 1)}
                    </span>
                  </div>
                  <div className="resource-track">
                    <div className={`resource-fill ${getIowaitColor(node.cpu.iowait)}`} style={{ width: `${Math.min(node.cpu.iowait * 5, 100)}%` }} />
                  </div>
                  <span className="resource-detail">{t('node.io_wait_desc')}</span>
                </div>
              )}

              <div className="resource-bar-item">
                <div className="resource-header">
                  <span className="resource-label">{t('metric.memory')}</span>
                  <span className={`resource-value text-${getHealthColor(memPercent)}`}>
                    {formatPercent(memPercent, 1)}
                  </span>
                </div>
                <div className="resource-track">
                  <div className={`resource-fill ${getHealthColor(memPercent)}`} style={{ width: `${memPercent}%` }} />
                </div>
                <span className="resource-detail">{formatBytes(node.memory.used_bytes)} / {formatBytes(node.memory.total_bytes)}</span>
              </div>

              <div className="resource-bar-item">
                <div className="resource-header">
                  <span className="resource-label">{t('node.root_disk')}</span>
                  <span className={`resource-value text-${getHealthColor(diskPercent)}`}>
                    {formatPercent(diskPercent, 1)}
                  </span>
                </div>
                <div className="resource-track">
                  <div className={`resource-fill ${getHealthColor(diskPercent)}`} style={{ width: `${diskPercent}%` }} />
                </div>
                <span className="resource-detail">{formatBytes(node.disk.used_bytes)} / {formatBytes(node.disk.total_bytes)}</span>
              </div>
            </div>
          </div>

          {/* Network */}
          <div className="detail-section">
            <h3 className="section-title">{t('node.network_io')}</h3>
            <div className="network-stats">
              <div className="net-stat">
                <span className="net-direction">↓ {t('metric.rx')}</span>
                <span className="net-value">{formatBytes(node.network.rx_bytes_sec)}/s</span>
              </div>
              <div className="net-stat">
                <span className="net-direction">↑ {t('metric.tx')}</span>
                <span className="net-value">{formatBytes(node.network.tx_bytes_sec)}/s</span>
              </div>
            </div>
          </div>

          {/* Storage */}
          <div className="detail-section">
            <h3 className="section-title">{t('node.storage')} ({storages.length})</h3>
            {storages.length > 0 ? (
              <div className="storage-list">
                {storages.map((storage) => {
                  const usedPercent = (storage.disk.used_bytes / storage.disk.total_bytes) * 100;
                  return (
                    <div key={storage.storage} className={`storage-item ${storage.shared ? 'shared' : 'local'}`}>
                      <div className="storage-header">
                        <span className="storage-name">{storage.storage}</span>
                        <span className="storage-type">{storage.type}</span>
                        {storage.shared && <span className="storage-shared-badge">{t('node.shared')}</span>}
                      </div>
                      <div className="storage-bar">
                        <div className={`storage-fill ${getHealthColor(usedPercent)}`} style={{ width: `${usedPercent}%` }} />
                      </div>
                      <div className="storage-info">
                        <span>{formatBytes(storage.disk.used_bytes)} / {formatBytes(storage.disk.total_bytes)}</span>
                        <span className={`text-${getHealthColor(usedPercent)}`}>{formatPercent(usedPercent, 1)}</span>
                      </div>
                      <div className="storage-content-labels">
                        {[...storage.content].sort().map((c) => (
                          <span key={c} className="content-label">{c}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-storage">{t('node.no_storage')}</div>
            )}
          </div>
        </div>

        {/* Corner decorations */}
        <div className="corner-decoration top-left" />
        <div className="corner-decoration top-right" />
        <div className="corner-decoration bottom-left" />
        <div className="corner-decoration bottom-right" />
      </div>
    </div>
  );
}

export function ClusterCore({ cluster, clusters, onSelectVM, onNavigateToVMMatrix, isPaused = false }: ClusterCoreProps) {
  const { t } = useTranslation();
  const auth = useAuth();
  const dialog = useDialogs();
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [perfNode, setPerfNode] = useState<{ clusterId: string; node: string } | null>(null);
  const [svcNode, setSvcNode] = useState<{ clusterId: string; node: string } | null>(null);
  const [syslogNode, setSyslogNode] = useState<{ clusterId: string; node: string; service?: string } | null>(null);
  const [hwNode, setHwNode] = useState<{ clusterId: string; node: string } | null>(null);
  const [netNode, setNetNode] = useState<{ clusterId: string; node: string } | null>(null);
  const [ntpNode, setNtpNode] = useState<{ clusterId: string; node: string } | null>(null);
  const [netInfoNode, setNetInfoNode] = useState<{ clusterId: string; node: string } | null>(null);
  const [maintNode, setMaintNode] = useState<{ clusterId: string; node: string; candidates: string[] } | null>(null);

  // RRD sparkline timeframe (drives the per-node historical chart).
  // Persisted to localStorage; default 24h.
  const [timeframe, setTimeframe] = useState<Timeframe>(() => {
    try {
      // '.v2' key: default is now 'live'. Bumping the key from the old
      // 'jtp.nodes.timeframe' resets the stale 'day' that pre-v0.6.4 builds
      // auto-persisted on mount, so the new live default actually takes effect
      // once for existing users; their later choices persist again under v2.
      const v = localStorage.getItem('jtp.nodes.timeframe.v2');
      if (v === 'live' || v === 'hour' || v === 'day' || v === 'week' || v === 'month' || v === 'year') return v;
    } catch { /* ignore */ }
    return 'live';
  });
  useEffect(() => {
    try { localStorage.setItem('jtp.nodes.timeframe.v2', timeframe); } catch { /* ignore */ }
  }, [timeframe]);
  const [pveAccessCluster, setPveAccessCluster] = useState<string | null>(null);
  const [locksCluster, setLocksCluster] = useState<string | null>(null);
  const [poolsCluster, setPoolsCluster] = useState<string | null>(null);
  const [fwCluster, setFwCluster] = useState<string | null>(null);
  const [haCluster, setHaCluster] = useState<string | null>(null);
  const [replCluster, setReplCluster] = useState<string | null>(null);
  const [notesCluster, setNotesCluster] = useState<{ id: string; name: string } | null>(null);
  const [tokensCluster, setTokensCluster] = useState<string | null>(null);
  const [createCluster, setCreateCluster] = useState<string | null>(null);
  const [fwObjCluster, setFwObjCluster] = useState<string | null>(null);
  const [sdnCluster, setSdnCluster] = useState<string | null>(null);
  const [staCluster, setStaCluster] = useState<string | null>(null);
  const [cephCluster, setCephCluster] = useState<{ id: string; node: string } | null>(null);
  const isAdminTop = auth.user?.role_global === 'admin';
  const isOperator = isAdminTop || auth.user?.role_global === 'operator';
  const [cfgBackupNode, setCfgBackupNode] =
    useState<{ clusterId: string; node: string } | null>(null);
  const [contextMenu, setContextMenu] = useState<NodeContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    node: null,
    clusterId: '',
  });

  // Determine if we're in "all clusters" mode
  const isAllClusters = !cluster && clusters && Object.keys(clusters).length > 0;

  // Get node health for PVE URL
  const getNodeHealth = useCallback((clusterId: string, nodeName: string): NodeHealth | null => {
    if (cluster && cluster.client_health) {
      return cluster.client_health[nodeName] || null;
    }
    if (clusters && clusters[clusterId]?.client_health) {
      return clusters[clusterId].client_health[nodeName] || null;
    }
    return null;
  }, [cluster, clusters]);

  // Handle context menu open
  const handleContextMenu = useCallback((e: React.MouseEvent, node: NodeMetrics, clusterId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const x = Math.min(e.clientX, window.innerWidth - 250);
    const y = Math.min(e.clientY, window.innerHeight - 280);

    setContextMenu({
      visible: true,
      x,
      y,
      node,
      clusterId,
    });
  }, []);

  // Close context menu
  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  }, []);

  // Group nodes by cluster with computed averages
  const nodesByCluster = useMemo(() => {
    const groups: Array<{
      clusterId: string;
      clusterName: string;
      clusterNodes: NodeMetrics[];
      /* For the merged standalone group: source cluster id per node,
         aligned with clusterNodes by index. */
      nodeCids?: string[];
      isStandalone: boolean;
      avgCpu: number;
      avgMem: number;
      vmsRunning: number;
      ctsRunning: number;
      vmCount: number;
      ctCount: number;
    }> = [];

    if (isAllClusters) {
      Object.entries(clusters!).forEach(([id, c]) => {
        const clusterNodes = Object.values(c.nodes);
        if (clusterNodes.length > 0) {
          const avgCpu = clusterNodes.reduce((sum, n) => sum + n.cpu.usage_percent, 0) / clusterNodes.length;
          const avgMem = clusterNodes.reduce((sum, n) => {
            if (n.memory.total_bytes === 0) return sum;
            return sum + (n.memory.used_bytes / n.memory.total_bytes) * 100;
          }, 0) / clusterNodes.length;

          groups.push({
            clusterId: id,
            clusterName: c.name || id,
            clusterNodes,
            isStandalone: c.summary?.is_standalone || false,
            avgCpu,
            avgMem,
            vmsRunning: c.summary?.vms_running || 0,
            ctsRunning: c.summary?.cts_running || 0,
            vmCount: c.summary?.vm_count || 0,
            ctCount: c.summary?.ct_count || 0,
          });
        }
      });
    } else if (cluster) {
      const clusterNodes = Object.values(cluster.nodes);
      const avgCpu = clusterNodes.length > 0
        ? clusterNodes.reduce((sum, n) => sum + n.cpu.usage_percent, 0) / clusterNodes.length
        : 0;
      const avgMem = clusterNodes.length > 0
        ? clusterNodes.reduce((sum, n) => {
            if (n.memory.total_bytes === 0) return sum;
            return sum + (n.memory.used_bytes / n.memory.total_bytes) * 100;
          }, 0) / clusterNodes.length
        : 0;

      groups.push({
        clusterId: cluster.id,
        clusterName: cluster.name || cluster.id,
        clusterNodes,
        isStandalone: cluster.summary?.is_standalone || false,
        avgCpu,
        avgMem,
        vmsRunning: cluster.summary?.vms_running || 0,
        ctsRunning: cluster.summary?.cts_running || 0,
        vmCount: cluster.summary?.vm_count || 0,
        ctCount: cluster.summary?.ct_count || 0,
      });
    }
    // Standalone nodes each came in as their own one-node "cluster",
    // which used to render one full-width section PER HOST — a huge
    // waste of vertical space. Merge them into a single shared section.
    const standalone = groups.filter(g => g.isStandalone);
    if (standalone.length > 1) {
      const clustered = groups.filter(g => !g.isStandalone);
      const allNodes = standalone.flatMap(g => g.clusterNodes);
      const nodeCids = standalone.flatMap(g => g.clusterNodes.map(() => g.clusterId));
      const totalNodes = allNodes.length || 1;
      const sum = (f: (g: typeof groups[number]) => number) =>
        standalone.reduce((acc, g) => acc + f(g), 0);
      clustered.push({
        clusterId: '__standalone__',
        clusterName: 'Standalone',   // rendered via t('dashboard.standalone')
        clusterNodes: allNodes,
        nodeCids,
        isStandalone: true,
        avgCpu: sum(g => g.avgCpu * g.clusterNodes.length) / totalNodes,
        avgMem: sum(g => g.avgMem * g.clusterNodes.length) / totalNodes,
        vmsRunning: sum(g => g.vmsRunning),
        ctsRunning: sum(g => g.ctsRunning),
        vmCount: sum(g => g.vmCount),
        ctCount: sum(g => g.ctCount),
      });
      return clustered;
    }
    return groups;
  }, [cluster, clusters, isAllClusters]);

  // Flatten for total counts
  const nodes = nodesByCluster.flatMap(g => g.clusterNodes);

  const avgCpu = useMemo(() => {
    if (nodes.length === 0) return 0;
    return nodes.reduce((sum, n) => sum + n.cpu.usage_percent, 0) / nodes.length;
  }, [nodes]);

  const avgMem = useMemo(() => {
    if (nodes.length === 0) return 0;
    return nodes.reduce((sum, n) => {
      if (n.memory.total_bytes === 0) return sum;
      return sum + (n.memory.used_bytes / n.memory.total_bytes) * 100;
    }, 0) / nodes.length;
  }, [nodes]);

  // Find selected node and its storages
  // Note: Not using useMemo here to ensure the panel updates when node data changes via polling
  let selectedNode: NodeMetrics | null = null;
  let nodeStorages: StorageMetrics[] = [];

  if (selectedNodeKey) {
    // Parse the key (format: clusterId/nodeName)
    const [clusterId, nodeName] = selectedNodeKey.split('/');

    if (isAllClusters && clusters) {
      const clusterData = clusters[clusterId];
      if (clusterData) {
        selectedNode = clusterData.nodes[nodeName] || null;
        nodeStorages = Object.values(clusterData.storages).filter(s => s.node === nodeName);
      }
    } else if (cluster) {
      selectedNode = cluster.nodes[nodeName] || null;
      nodeStorages = Object.values(cluster.storages).filter(s => s.node === nodeName);
    }
  }

  if (!cluster && !isAllClusters) {
    return (
      <div className="cluster-core empty">
        <div className="empty-message">
          <span className="loading-spinner" />
          <span>{t('cluster.select')}</span>
        </div>
      </div>
    );
  }

  const clusterTitle = isAllClusters
    ? t('cluster.clusters_count', { n: Object.keys(clusters!).length })
    : cluster?.name || cluster?.id || t('cluster.nodes');

  return (
    <div className="cluster-core">
      {/* Grid floor effect */}
      <div className="grid-floor" />

      {/* Header */}
      <div className="core-header">
        <h1 className="core-title font-display">
          <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="6" rx="1" />
            <rect x="2" y="11" width="20" height="6" rx="1" />
            <circle cx="6" cy="6" r="1" fill="currentColor" />
            <circle cx="6" cy="14" r="1" fill="currentColor" />
            <path d="M10 6h8M10 14h8" strokeLinecap="round" />
          </svg>
          {clusterTitle}
        </h1>
        {nodesByCluster.length === 1 && (
          <div className="cc-ops-bar">
            <button className="cc-pools-btn" onClick={() => setPoolsCluster(nodesByCluster[0].clusterId)} title={t('pools.title')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/>
                <circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/>
                <line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="18" x2="16" y2="18"/>
                <line x1="6" y1="8" x2="6" y2="16"/><line x1="18" y1="8" x2="18" y2="16"/>
              </svg>
              <span>{t('pools.button')}</span>
            </button>
            <button className="cc-pools-btn" onClick={() => setHaCluster(nodesByCluster[0].clusterId)} title={t('ha.title')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <span>{t('ha.button')}</span>
            </button>
            <button className="cc-pools-btn" onClick={() => setReplCluster(nodesByCluster[0].clusterId)} title={t('repl.title')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              <span>{t('repl.button')}</span>
            </button>
            <button className="cc-pools-btn" onClick={() => setFwCluster(nodesByCluster[0].clusterId)} title={t('fw.title_cluster')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              <span>{t('fw.button')}</span>
            </button>
            <button className="cc-pools-btn" onClick={() => setNotesCluster({ id: nodesByCluster[0].clusterId, name: nodesByCluster[0].clusterName })} title={t('notes.title')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span>{t('notes.button')}</span>
            </button>
            {isAdminTop && (
              <button className="cc-pools-btn" onClick={() => setFwObjCluster(nodesByCluster[0].clusterId)} title={t('fwo.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span>{t('fwo.button')}</span>
              </button>
            )}
            {isAdminTop && (
              <button className="cc-pools-btn" onClick={() => {
                const grp = nodesByCluster[0];
                const firstNode = grp?.clusterNodes?.[0]?.node || '';
                setCephCluster({ id: grp.clusterId, node: firstNode });
              }} title={t('ca.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <span>{t('ca.button')}</span>
              </button>
            )}
            {isAdminTop && (
              <button className="cc-pools-btn" onClick={() => setStaCluster(nodesByCluster[0].clusterId)} title={t('sta.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="6" rx="8" ry="3"/>
                  <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
                  <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
                </svg>
                <span>{t('sta.button')}</span>
              </button>
            )}
            {isAdminTop && (
              <button className="cc-pools-btn" onClick={() => setSdnCluster(nodesByCluster[0].clusterId)} title={t('sdn.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>{t('sdn.button')}</span>
              </button>
            )}
            {isAdminTop && (
              <button className="cc-pools-btn" onClick={() => setPveAccessCluster(nodesByCluster[0].clusterId)} title={t('pa.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>{t('pa.button')}</span>
              </button>
            )}
            {isAdminTop && (
              <button className="cc-pools-btn" onClick={() => setTokensCluster(nodesByCluster[0].clusterId)} title={t('apitok.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                <span>{t('apitok.button')}</span>
              </button>
            )}
            {isOperator && (
              <button className="cc-pools-btn" onClick={() => setLocksCluster(nodesByCluster[0].clusterId)} title={t('lk.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>{t('lk.button')}</span>
              </button>
            )}
            {isOperator && (
              <button className="cc-pools-btn" onClick={() => setCreateCluster(nodesByCluster[0].clusterId)} title={t('vmcw.title')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>{t('vmcw.btn')}</span>
              </button>
            )}
          </div>
        )}
      </div>

      <PoolsModal
        open={poolsCluster !== null}
        clusterId={poolsCluster || ''}
        onClose={() => setPoolsCluster(null)}
      />
      <HAStatusModal
        open={haCluster !== null}
        clusterId={haCluster || ''}
        onClose={() => setHaCluster(null)}
      />
      <ReplicationModal
        open={replCluster !== null}
        clusterId={replCluster || ''}
        onClose={() => setReplCluster(null)}
      />
      <FirewallModal
        open={fwCluster !== null}
        clusterId={fwCluster || ''}
        scope="cluster"
        onClose={() => setFwCluster(null)}
      />
      <ClusterNotesModal
        open={notesCluster !== null}
        clusterId={notesCluster?.id || ''}
        clusterName={notesCluster?.name}
        onClose={() => setNotesCluster(null)}
      />
      <APITokensModal
        open={tokensCluster !== null}
        clusterId={tokensCluster || ''}
        onClose={() => setTokensCluster(null)}
      />
      <VMCreateWizard
        open={createCluster !== null}
        clusterId={createCluster || ''}
        onClose={() => setCreateCluster(null)}
      />
      <FirewallObjectsModal
        open={fwObjCluster !== null}
        clusterId={fwObjCluster || ''}
        onClose={() => setFwObjCluster(null)}
      />
      <SDNAdminModal
        open={sdnCluster !== null}
        clusterId={sdnCluster || ''}
        onClose={() => setSdnCluster(null)}
      />
      <StorageAdminModal
        open={staCluster !== null}
        clusterId={staCluster || ''}
        onClose={() => setStaCluster(null)}
      />
      <CephAdminModal
        open={cephCluster !== null}
        clusterId={cephCluster?.id || ''}
        cephNode={cephCluster?.node || ''}
        onClose={() => setCephCluster(null)}
      />

      {/* Timeframe selector — drives the per-node RRD sparklines. Default
          24h, persisted in localStorage as jtp.nodes.timeframe. */}
      <div className="nodes-toolbar">
        <span className="nodes-toolbar-label">{t('nodes.tf.label')}</span>
        <div className="nodes-toolbar-tabs">
          {(['live', 'hour', 'day', 'week', 'month', 'year'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              className={`nodes-toolbar-tab ${timeframe === tf ? 'on' : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {t(`nodes.tf.${tf}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Cluster Sections */}
      <div className="cluster-sections">
        {nodesByCluster.map((group) => (
          <div key={group.clusterId} className="cluster-section">
            {/* Section Header - Clickable to navigate to VM Matrix */}
            <div
              className={`cluster-section-header ${onNavigateToVMMatrix && group.clusterId !== '__standalone__' ? 'clickable' : ''}`}
              onClick={() => { if (group.clusterId !== '__standalone__') onNavigateToVMMatrix?.(group.clusterId); }}
              title={onNavigateToVMMatrix && group.clusterId !== '__standalone__' ? t('cluster.view_vms_in', { name: group.clusterName }) : undefined}
            >
              <div className="section-title-group">
                <span className="cluster-section-name">
                  {group.clusterId === '__standalone__' ? t('dashboard.standalone') : group.clusterName}
                </span>
                {group.isStandalone && group.clusterId !== '__standalone__' && (
                  <span className="standalone-tag">{t('dashboard.standalone')}</span>
                )}
                {onNavigateToVMMatrix && group.clusterId !== '__standalone__' && <span className="nav-arrow">→</span>}
              </div>
              <span className="cluster-section-count">
                {group.clusterNodes.filter(n => n.status === 'online').length}/{group.clusterNodes.length} {t('cluster.nodes')}
              </span>
            </div>

            {/* Section Layout: one compact stats strip + full-width node
                grid. (The old 3-column layout flanked the grid with a big
                load ring on the left and a stats sidebar on the right —
                both burned vertical space on rows with few nodes.) */}
            <div className="cluster-section-content">
              <div className="section-statsbar">
                <div className="statsbar-reactor">
                  <ReactorCore cpuUsage={group.avgCpu} memUsage={group.avgMem} compact label={t('node.avg_load')} />
                </div>
                <div className="mini-telemetry">
                  <div className="mini-chart">
                    <span className="mini-label">CPU</span>
                    <div className="mini-bar">
                      <div className={`mini-fill ${getHealthColor(group.avgCpu)}`} style={{ width: `${group.avgCpu}%` }} />
                    </div>
                    <AnimatedNumber value={group.avgCpu} decimals={0} suffix="%" className={`mini-value text-${getHealthColor(group.avgCpu)}`} />
                  </div>
                  <div className="mini-chart">
                    <span className="mini-label">MEM</span>
                    <div className="mini-bar">
                      <div className={`mini-fill ${getHealthColor(group.avgMem)}`} style={{ width: `${group.avgMem}%` }} />
                    </div>
                    <AnimatedNumber value={group.avgMem} decimals={0} suffix="%" className={`mini-value text-${getHealthColor(group.avgMem)}`} />
                  </div>
                </div>
                <div className="mini-stats">
                  <div className="mini-stat">
                    <AnimatedRatio left={group.vmsRunning} right={group.vmCount} className="mini-stat-value" />
                    <span className="mini-stat-label">VMs</span>
                  </div>
                  <div className="mini-stat">
                    <AnimatedRatio left={group.ctsRunning} right={group.ctCount} className="mini-stat-value" />
                    <span className="mini-stat-label">CTs</span>
                  </div>
                </div>
              </div>

              <div className="section-nodes">
                <div className="nodes-grid">
                  {group.clusterNodes.map((node, ni) => {
                    const cid = group.nodeCids?.[ni] ?? group.clusterId;
                    return (
                      <NodeCard
                        key={`${cid}-${node.node}`}
                        node={node}
                        onClick={() => setSelectedNodeKey(`${cid}/${node.node}`)}
                        onContextMenu={(e) => handleContextMenu(e, node, cid)}
                        clusterId={cid}
                        timeframe={timeframe}
                        isPaused={isPaused}
                      />
                    );
                  })}
                </div>
                {/* ECG Legend */}
                <div className="ecg-legend">
                  <span className="ecg-legend-item">
                    <span className="ecg-legend-line cpu" />
                    <span>{t('metric.cpu')}</span>
                  </span>
                  <span className="ecg-legend-item">
                    <span className="ecg-legend-line mem" />
                    <span>{t('metric.memory')}</span>
                  </span>
                  <span className="ecg-legend-item">
                    <span className="ecg-legend-line io" />
                    <span>{t('node.io_wait')}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All VMs Button */}
      <div className="core-footer">
        <button className="btn-view-vms" onClick={onSelectVM}>
          {t('cluster.view_all_vms')} →
        </button>
      </div>

      {/* Node Detail Panel */}
      {selectedNode && (
        <NodeDetailPanel
          node={selectedNode}
          storages={nodeStorages}
          onClose={() => setSelectedNodeKey(null)}
        />
      )}

      {/* Node Context Menu */}
      <NodeContextMenu
        state={contextMenu}
        onClose={closeContextMenu}
        onShowDetails={() => {
          if (contextMenu.node) {
            setSelectedNodeKey(`${contextMenu.clusterId}/${contextMenu.node.node}`);
          }
        }}
        onShowPerf={() => {
          if (contextMenu.node) {
            setPerfNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
          }
        }}
        onShowServices={() => {
          if (contextMenu.node) setSvcNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
        }}
        onShowSyslog={() => {
          if (contextMenu.node) setSyslogNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
        }}
        onShowHardware={() => {
          if (contextMenu.node) setHwNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
        }}
        onShowNetwork={() => {
          if (contextMenu.node) setNetNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
        }}
        onShowNTP={() => {
          if (contextMenu.node) setNtpNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
        }}
        onConfigBackup={() => {
          if (contextMenu.node) {
            setCfgBackupNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
          }
        }}
        onShowNetInfo={() => {
          if (contextMenu.node) setNetInfoNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node });
        }}
        onMaintenance={() => {
          if (!contextMenu.node) return;
          // In single-cluster mode `clusters` prop isn't passed — fall
          // back to the `cluster` prop whose id matches. Without this
          // the target-node dropdown was empty even for multi-node
          // clusters because the lookup returned undefined.
          const cd = clusters?.[contextMenu.clusterId]
            ?? (cluster?.id === contextMenu.clusterId ? cluster : undefined);
          const others = cd ? Object.keys(cd.nodes).filter((n) => n !== contextMenu.node!.node) : [];
          setMaintNode({ clusterId: contextMenu.clusterId, node: contextMenu.node.node, candidates: others });
        }}
        onOpenShell={async () => {
          if (!contextMenu.node) return;
          const cid = contextMenu.clusterId;
          const node = contextMenu.node.node;
          // Pre-fetch the console_token so the operator never sees the
          // page render before auth is ready (and so an auth failure shows
          // here instead of inside the shell tab).
          try {
            const r = await fetch('/api/console/host/prepare', {
              method: 'POST', credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cluster_id: cid, node }),
            });
            const d = await r.json().catch(() => ({}));
            if (!r.ok) {
              // useDialogs, not the native alert -- the house rule the rest of
              // the app already follows. These two survived the migration.
              await dialog.alert(d.message || d.error || ('HTTP ' + r.status));
              return;
            }
            const url = `/console-host/${encodeURIComponent(cid)}/${encodeURIComponent(node)}?ct=${encodeURIComponent(d.console_token)}&lang=zh-TW`;
            window.open(url, '_blank', 'noopener,noreferrer');
          } catch (e: any) {
            await dialog.alert(e?.message || String(e));
          }
        }}
        getNodeHealth={getNodeHealth}
      />

      <RRDChartModal
        open={perfNode !== null}
        clusterId={perfNode?.clusterId || ''}
        node={perfNode?.node || ''}
        kind="node"
        title={perfNode ? perfNode.node : ''}
        onClose={() => setPerfNode(null)}
      />
      <NodeHardwareModal
        open={hwNode !== null}
        clusterId={hwNode?.clusterId || ''}
        node={hwNode?.node || ''}
        onClose={() => setHwNode(null)}
      />
      <NodeNetworkModal
        open={netNode !== null}
        clusterId={netNode?.clusterId || ''}
        node={netNode?.node || ''}
        onClose={() => setNetNode(null)}
      />
      {cfgBackupNode && (
        <NodeConfigBackupModal
          clusterId={cfgBackupNode.clusterId}
          node={cfgBackupNode.node}
          onClose={() => setCfgBackupNode(null)}
        />
      )}
      <NodeNTPModal
        open={ntpNode !== null}
        clusterId={ntpNode?.clusterId || ''}
        node={ntpNode?.node || ''}
        onClose={() => setNtpNode(null)}
      />
      <NodeNetInfoModal
        open={netInfoNode !== null}
        clusterId={netInfoNode?.clusterId || ''}
        node={netInfoNode?.node || ''}
        onClose={() => setNetInfoNode(null)}
      />
      <NodeMaintenanceModal
        open={maintNode !== null}
        clusterId={maintNode?.clusterId || ''}
        node={maintNode?.node || ''}
        candidates={maintNode?.candidates || []}
        onClose={() => setMaintNode(null)}
      />
      <PVEAccessModal
        open={pveAccessCluster !== null}
        clusterId={pveAccessCluster || ''}
        onClose={() => setPveAccessCluster(null)}
      />
      <LocksModal
        open={locksCluster !== null}
        clusterId={locksCluster || ''}
        onClose={() => setLocksCluster(null)}
      />
      <NodeServicesModal
        open={svcNode !== null}
        clusterId={svcNode?.clusterId || ''}
        node={svcNode?.node || ''}
        onClose={() => setSvcNode(null)}
        onShowLogs={(service) => {
          if (svcNode) {
            setSyslogNode({ clusterId: svcNode.clusterId, node: svcNode.node, service });
          }
        }}
      />
      <NodeSyslogModal
        open={syslogNode !== null}
        clusterId={syslogNode?.clusterId || ''}
        node={syslogNode?.node || ''}
        initialService={syslogNode?.service}
        onClose={() => setSyslogNode(null)}
      />

      <style>{`
        .cluster-core {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-lg);
        }

        .cluster-core.empty {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--text-secondary);
          font-family: var(--font-display);
          letter-spacing: 0.1em;
        }

        .core-header {
          margin-bottom: var(--spacing-xl);
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
        }
        /* Uniform grid instead of a ragged pill row — every button the
           same width, second row aligns in columns under the first.
           flex-basis:100% forces the bar onto its OWN full-width row
           below the title: as a plain child of the space-between flex
           header it collapsed to a single right-hand column. */
        .cc-ops-bar {
          flex: 1 0 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 8px;
          margin-top: 12px;
        }
        .cc-pools-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: 7px 10px; border-radius: 4px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.4);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
          white-space: nowrap;
          cursor: pointer; transition: background var(--transition-fast);
        }
        .cc-pools-btn:hover { background: rgba(0, 240, 255, 0.16); }

        .core-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
          margin-bottom: var(--spacing-xs);
        }

        .core-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: nodeIconBlink 3s ease-in-out infinite;
        }

        @keyframes nodeIconBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .core-subtitle {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        /* Nodes toolbar — sparkline timeframe selector */
        .nodes-toolbar {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: var(--spacing-md);
          padding: 8px 14px;
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: 4px;
        }
        .nodes-toolbar-label {
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .nodes-toolbar-tabs { display: flex; gap: 4px; }
        .nodes-toolbar-tab {
          padding: 5px 14px;
          background: rgba(0, 240, 255, 0.04);
          color: var(--text-secondary);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 3px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .12s;
        }
        .nodes-toolbar-tab:hover {
          color: var(--primary);
          border-color: rgba(0, 240, 255, 0.4);
        }
        .nodes-toolbar-tab.on {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0, 240, 255, 0.12);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
        }

        /* Cluster Sections */
        .cluster-sections {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .cluster-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .cluster-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          transition: all var(--transition-fast);
        }

        .cluster-section-header.clickable {
          cursor: pointer;
        }

        .cluster-section-header.clickable:hover {
          background: var(--bg-hover);
        }

        .cluster-section-header.clickable:hover .cluster-section-name {
          color: var(--primary);
          text-shadow: 0 0 10px var(--primary);
        }

        .cluster-section-header.clickable:hover .nav-arrow {
          transform: translateX(4px);
          opacity: 1;
        }

        .nav-arrow {
          font-size: 15px;
          color: var(--primary-dim);
          opacity: 0.5;
          transition: all var(--transition-fast);
        }

        .section-title-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .cluster-section-name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: var(--primary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .cluster-section-count {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .cluster-section-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
        }

        /* Compact stats strip — load ring + CPU/MEM bars + VM/CT counts
           in one row above the node grid. */
        .section-statsbar {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
          padding: 0 var(--spacing-sm) var(--spacing-sm);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
        }

        .statsbar-reactor {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .statsbar-reactor .reactor-core.compact {
          max-width: 92px;
          width: 92px;
        }

        .reactor-core {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reactor-core.compact {
          max-width: 160px;
        }

        .reactor-svg {
          width: 100%;
          height: 100%;
        }

        .reactor-value {
          font-family: var(--font-mono);
          font-size: 36px;
          font-weight: bold;
        }

        .reactor-core.compact .reactor-value {
          font-size: 32px;
        }

        .reactor-label {
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        .reactor-core.compact .reactor-label {
          font-size: 9px;
        }

        .reactor-pulse {
          position: absolute;
          inset: 10%;
          border: 2px solid var(--primary);
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite;
        }

        /* Section Nodes */
        .section-nodes {
          min-width: 0;
          width: 100%;
        }

        /* Section Telemetry */
        .mini-telemetry {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          flex: 1;
          min-width: 220px;
          max-width: 420px;
        }

        .mini-chart {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .mini-label {
          font-family: var(--font-mono);
          font-size: 15px;
          color: var(--text-secondary);
          width: 36px;
        }

        .mini-bar {
          flex: 1;
          height: 10px;
          background: var(--bg-primary);
          border-radius: 5px;
          overflow: hidden;
        }

        .mini-fill {
          height: 100%;
          border-radius: 5px;
          transition: width var(--transition-normal);
        }

        .mini-fill.success { background: var(--success); }
        .mini-fill.warning { background: var(--warning); }
        .mini-fill.danger { background: var(--danger); }

        .mini-value {
          font-family: var(--font-mono);
          font-size: 15px;
          width: 42px;
          text-align: right;
        }

        .mini-stats {
          display: flex;
          gap: var(--spacing-lg);
          padding-left: var(--spacing-lg);
          border-left: 1px solid var(--border);
        }

        .mini-stat {
          text-align: center;
        }

        .mini-stat-value {
          display: block;
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 600;
          color: var(--primary);
        }

        .mini-stat-label {
          font-size: 14px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* Footer */
        .core-footer {
          display: flex;
          justify-content: center;
          padding: var(--spacing-md) 0;
        }

        /* Legacy styles for backward compatibility */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
        }

        .section-title {
          font-size: 15px;
          color: var(--primary);
          letter-spacing: 0.15em;
        }

        .section-count {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .cluster-group-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }

        .cluster-group-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px var(--primary);
        }

        .standalone-tag {
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 2px 6px;
          background: rgba(191, 0, 255, 0.2);
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cluster-group-count {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .nodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--spacing-md);
        }

        /* Node card — canonical panel-card surface (gradient bg, neon-breathe,
           top accent + scan-line) so it matches the rest of the cyberpunk
           cards in the app. */
        .node-card {
          position: relative;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm);
          cursor: pointer;
          overflow: hidden;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
          animation: neon-breathe 4s ease-in-out infinite;
        }
        .node-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.55;
          pointer-events: none;
        }
        .node-card::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
        }

        .node-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary);
          box-shadow: 0 8px 32px rgba(0, 240, 255, 0.22), var(--primary-glow);
        }

        .node-card.offline {
          opacity: 0.55;
          border-color: var(--danger-dim);
          animation: none;
        }
        .node-card.offline::after {
          animation: none;
          background: linear-gradient(90deg, transparent, var(--danger, #ff4d6d), transparent);
        }

        .node-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-xs);
        }

        .node-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--danger);
        }

        .node-status.online {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .node-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .node-cluster-tag {
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 2px 6px;
          background: rgba(191, 0, 255, 0.2);
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-left: auto;
        }

        .node-metrics {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
        }

        /* ECG Monitor Container */
        .node-ecg-container {
          margin: var(--spacing-xs) 0;
        }

        .node-ecg-container .ecg-monitor-stack {
          width: 100%;
        }

        /* ECG Legend */
        .ecg-legend {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
          margin-top: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-md);
          background: rgba(10, 20, 30, 0.5);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 240, 255, 0.1);
        }

        .ecg-legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .ecg-legend-line {
          width: 20px;
          height: 2px;
          border-radius: 1px;
        }

        .ecg-legend-line.cpu {
          background: #00f0ff;
          box-shadow: 0 0 6px #00f0ff;
        }

        .ecg-legend-line.mem {
          background: #00ff88;
          box-shadow: 0 0 6px #00ff88;
        }

        .ecg-legend-line.io {
          background: #ffd700;
          box-shadow: 0 0 6px #ffd700;
        }

        .node-metric {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .node-metric-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          width: 28px;
        }

        .node-metric-bar {
          flex: 1;
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          overflow: hidden;
        }

        .node-metric-fill {
          height: 100%;
          border-radius: 2px;
          transition: width var(--transition-normal);
          animation: metric-bar-fill 0.8s ease-out forwards;
          transform-origin: left;
        }

        @keyframes metric-bar-fill {
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

        .node-metric-fill.success { background: var(--success); box-shadow: 0 0 6px var(--success); }
        .node-metric-fill.warning { background: var(--warning); box-shadow: 0 0 6px var(--warning); }
        .node-metric-fill.danger { background: var(--danger); box-shadow: 0 0 6px var(--danger); }

        .node-metric-value {
          font-family: var(--font-mono);
          font-size: 13px;
          min-width: 32px;
          text-align: right;
        }

        .node-info {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          padding-top: var(--spacing-xs);
        }

        /* Telemetry */
        .core-telemetry {
          padding: var(--spacing-md);
        }

        .telemetry-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .telemetry-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .telemetry-label {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          width: 36px;
          letter-spacing: 0.05em;
        }

        .telemetry-bar {
          flex: 1;
          display: flex;
          gap: 2px;
        }

        .telemetry-segment {
          flex: 1;
          height: 16px;
          background: var(--bg-primary);
          border-radius: 1px;
        }

        .telemetry-segment.filled {
          background: var(--primary);
          box-shadow: 0 0 4px var(--primary);
        }

        .telemetry-segment.filled.warning {
          background: var(--warning);
          box-shadow: 0 0 4px var(--warning);
        }

        .telemetry-segment.filled.danger {
          background: var(--danger);
          box-shadow: 0 0 4px var(--danger);
        }

        .telemetry-segment.filled.success {
          background: var(--success);
          box-shadow: 0 0 4px var(--success);
        }

        .telemetry-value {
          font-family: var(--font-mono);
          font-size: 13px;
          min-width: 48px;
          text-align: right;
        }

        .telemetry-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-sm) 0;
        }

        .telemetry-stats {
          display: flex;
          justify-content: space-around;
        }

        .telemetry-stat {
          text-align: center;
        }

        .telemetry-stat .stat-value {
          font-family: var(--font-mono);
          font-size: 20px;
          color: var(--text-primary);
          display: block;
        }

        .telemetry-stat .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-view-vms {
          margin-top: var(--spacing-md);
          padding: var(--spacing-sm) var(--spacing-md);
          background: transparent;
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-sm);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-view-vms:hover {
          background: var(--primary);
          color: var(--bg-primary);
          box-shadow: var(--primary-glow);
        }

        @media (max-width: 1200px) {
          .core-layout {
            grid-template-columns: 1fr;
          }

          .core-reactor {
            max-width: 300px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .cluster-core {
            padding: var(--spacing-md);
          }

          .core-title {
            font-size: 20px;
          }
        }

        /* Node Detail Panel */
        .node-detail-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 5, 15, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .node-detail-panel {
          position: relative;
          width: 90%;
          max-width: 600px;
          max-height: 85vh;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.22);
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .node-detail-panel::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.6;
          pointer-events: none;
          z-index: 1;
        }
        .node-detail-panel::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .node-detail-panel .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }

        .node-detail-panel .detail-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .node-detail-panel .detail-title h2 {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--primary);
          letter-spacing: 0.1em;
        }

        .node-detail-panel .detail-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .node-detail-panel .detail-status.online {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .node-detail-panel .detail-status.offline {
          background: var(--danger);
          box-shadow: 0 0 8px var(--danger);
        }

        .node-detail-panel .detail-tag {
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          background: rgba(0, 255, 136, 0.1);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .node-detail-panel .detail-close {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .node-detail-panel .detail-close:hover {
          color: var(--danger-text);
        }

        .node-detail-panel .detail-body {
          padding: var(--spacing-md);
          overflow-y: auto;
          max-height: calc(85vh - 60px);
        }

        .detail-section {
          margin-bottom: var(--spacing-md);
        }

        .detail-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-xs);
          border-bottom: 1px solid var(--border);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
        }

        .info-item {
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
        }

        .info-label {
          display: block;
          font-size: 13px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .info-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
        }

        .ndp-badge {
          display: inline-block;
          padding: 1px 8px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono);
          border: 1px solid currentColor;
        }
        .ndp-badge.ok    { color: var(--success); }
        .ndp-badge.info  { color: var(--primary); }
        .ndp-badge.warn  { color: var(--warning); }
        .ndp-badge.crit  { color: var(--danger-text); }
        .ndp-badge.muted { color: var(--text-muted); }
        /* Actionable pill (Manage / Renew) — filled accent + dark text for
           clear contrast and a button affordance, vs the outlined status
           badges it sits next to. */
        .ndp-act {
          display: inline-flex; align-items: center;
          padding: 1px 9px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono); font-weight: 700;
          letter-spacing: 0.3px;
          background: var(--primary); color: #05121b;
          border: 1px solid var(--primary); cursor: pointer;
          transition: filter 0.15s ease, box-shadow 0.15s ease;
        }
        .ndp-act:hover { filter: brightness(1.12); box-shadow: 0 0 8px var(--primary); }

        .resource-bars {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .resource-bar-item {
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
        }

        .resource-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-xs);
        }

        .resource-label {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .resource-value {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
        }

        .resource-track {
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: var(--spacing-xs);
        }

        .resource-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
          animation: resource-bar-fill 0.8s ease-out forwards;
          transform-origin: left;
        }

        @keyframes resource-bar-fill {
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

        .resource-fill.success { background: var(--success); box-shadow: 0 0 8px var(--success); }
        .resource-fill.warning { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
        .resource-fill.danger { background: var(--danger); box-shadow: 0 0 8px var(--danger); }

        .resource-detail {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .network-stats {
          display: flex;
          gap: var(--spacing-md);
        }

        .net-stat {
          flex: 1;
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          text-align: center;
        }

        .net-direction {
          display: block;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .net-value {
          font-family: var(--font-mono);
          font-size: 15px;
          color: var(--primary);
        }

        .storage-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .storage-item {
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--primary-dim);
        }

        .storage-item.shared {
          border-left-color: var(--accent);
        }

        .storage-item .storage-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
        }

        .storage-name {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .storage-type {
          font-size: 13px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .storage-shared-badge {
          font-size: 14px;
          padding: 1px 4px;
          background: rgba(191, 0, 255, 0.2);
          color: var(--accent);
          border-radius: 2px;
        }

        .storage-item .storage-bar {
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: var(--spacing-xs);
        }

        .storage-item .storage-fill {
          height: 100%;
          border-radius: 2px;
        }

        .storage-item .storage-fill.success { background: var(--success); }
        .storage-item .storage-fill.warning { background: var(--warning); }
        .storage-item .storage-fill.danger { background: var(--danger); }

        .storage-item .storage-info {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .storage-content-labels {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 6px;
        }

        .content-label {
          font-size: 10px;
          padding: 2px 6px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 3px;
          color: var(--primary);
        }

        .no-storage {
          color: var(--text-muted);
          text-align: center;
          padding: var(--spacing-md);
          font-size: 13px;
        }

        /* Node Context Menu */
        .node-context-menu {
          position: fixed;
          z-index: 1000;
          min-width: 220px;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.15);
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

        .node-context-menu .context-menu-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
        }

        .node-context-menu .context-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--danger);
        }

        .node-context-menu .context-status.online {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .node-context-menu .context-menu-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
        }

        .node-context-menu .context-menu-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-xs) 0;
        }

        .node-context-menu .context-menu-item {
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
          transition: all var(--transition-fast);
        }

        .node-context-menu .context-menu-item:hover {
          background: rgba(0, 240, 255, 0.1);
          color: var(--primary);
        }

        .node-context-menu .context-menu-item svg {
          flex-shrink: 0;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .node-context-menu .context-menu-item:hover svg {
          color: var(--primary);
        }

        .node-context-menu .context-menu-info {
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-top: var(--spacing-xs);
        }

        .node-context-menu .context-menu-info .info-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 2px 0;
        }

        .node-context-menu .context-menu-info .info-row span:first-child {
          color: var(--text-muted);
        }

        .node-context-menu .context-menu-info .info-row span:last-child {
          color: var(--text-secondary);
        }

        .text-success {
          color: var(--success);
        }

        .text-warning {
          color: var(--warning);
        }

        .text-danger {
          color: var(--danger-text);
        }

        .text-white {
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
