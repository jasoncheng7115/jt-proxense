/**
 * JT-PROXENSE Command Center View
 * Global overview with cluster galaxy visualization
 */

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { useTranslation } from '../i18n';
import type { ClusterData, GlobalSummary } from '../types';
import { formatPercent, formatBytes, getHealthColor } from '../utils/format';

interface CommandCenterProps {
  clusters: Record<string, ClusterData>;
  globalSummary: GlobalSummary;
  onSelectCluster: (clusterId: string) => void;
  isPaused?: boolean;
}

// Animated counter component with count-up effect
function AnimatedValue({
  value,
  suffix = '',
  className = '',
}: {
  value: number | string;
  suffix?: string;
  className?: string;
}) {
  // Parse "X/Y" format strings
  const parseValue = (v: number | string): { left: number; right?: number; isRatio: boolean } => {
    if (typeof v === 'number') return { left: v, isRatio: false };
    const match = String(v).match(/^(\d+)\/(\d+)$/);
    if (match) {
      return { left: parseInt(match[1]), right: parseInt(match[2]), isRatio: true };
    }
    const num = parseFloat(String(v));
    if (!isNaN(num)) return { left: num, isRatio: false };
    return { left: 0, isRatio: false };
  };

  const parsed = parseValue(value);
  const [displayLeft, setDisplayLeft] = useState(0);
  const [displayRight, setDisplayRight] = useState(parsed.right || 0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const newParsed = parseValue(value);
    // Subsequent updates: snap directly. Live monitoring data refreshes
    // every 2s, and running a 60fps count-up tween across ~27 of these
    // components on the dashboard pinned ~50% browser CPU. The intro
    // animation on first mount is the only one worth paying for.
    if (!isFirstRender.current) {
      setDisplayLeft(newParsed.left);
      if (newParsed.right !== undefined) setDisplayRight(newParsed.right);
      return;
    }
    const duration = 800;
    const startLeft = 0;
    const startRight = 0;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentLeft = startLeft + (newParsed.left - startLeft) * easeOut;
      setDisplayLeft(Math.round(currentLeft));

      if (newParsed.isRatio && newParsed.right !== undefined) {
        const currentRight = startRight + (newParsed.right - startRight) * easeOut;
        setDisplayRight(Math.round(currentRight));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayLeft(newParsed.left);
        if (newParsed.right !== undefined) setDisplayRight(newParsed.right);
      }
    };

    const startId = window.setTimeout(() => {
      // Flip the flag HERE, not when the timer is scheduled. Data usually
      // arrives during the delay, so `value` changes, the effect re-runs, and
      // a flag already cleared would send it down the "snap" path -- while the
      // ORIGINAL timer, holding a closure over the old value (0), still fired
      // and animated the display back down to zero. That is what left the
      // dashboard's infrastructure card reading 0 / 0-0 next to a header that
      // said 8/8.
      isFirstRender.current = false;
      frameRef.current = requestAnimationFrame(animate);
    }, PAGE_ENTER_MS);

    return () => {
      // Cancelling only the rAF was useless: during the start delay there is
      // no rAF yet, just a pending timer.
      window.clearTimeout(startId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value]);

  const displayText = parsed.isRatio ? `${displayLeft}/${displayRight}` : displayLeft;

  return (
    <span className={`metric-value ${className}`}>
      {displayText}
      {suffix && <span style={{ fontSize: '0.6em', opacity: 0.7 }}>{suffix}</span>}
    </span>
  );
}

// Simple animated number for percentages
function AnimatedPercent({ value, decimals = 0, className = '' }: { value: number; decimals?: number; className?: string }) {
  const [display, setDisplay] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDisplay(value);
      return;
    }
    const duration = 800;
    const startValue = 0;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * easeOut;
      setDisplay(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    const startId = window.setTimeout(() => {
      // Flip the flag HERE, not when the timer is scheduled. Data usually
      // arrives during the delay, so `value` changes, the effect re-runs, and
      // a flag already cleared would send it down the "snap" path -- while the
      // ORIGINAL timer, holding a closure over the old value (0), still fired
      // and animated the display back down to zero. That is what left the
      // dashboard's infrastructure card reading 0 / 0-0 next to a header that
      // said 8/8.
      isFirstRender.current = false;
      frameRef.current = requestAnimationFrame(animate);
    }, PAGE_ENTER_MS);

    return () => {
      window.clearTimeout(startId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value]);

  return <span className={className}>{display.toFixed(decimals)}%</span>;
}

// Animated ratio display (e.g., "5/10")
function AnimatedRatio({ left, right, className = '' }: { left: number; right: number; className?: string }) {
  const [displayLeft, setDisplayLeft] = useState(0);
  const [displayRight, setDisplayRight] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      setDisplayLeft(left);
      setDisplayRight(right);
      return;
    }
    const duration = 800;
    const startL = 0;
    const startR = 0;
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

    const startId = window.setTimeout(() => {
      // Flip the flag HERE, not when the timer is scheduled. Data usually
      // arrives during the delay, so `value` changes, the effect re-runs, and
      // a flag already cleared would send it down the "snap" path -- while the
      // ORIGINAL timer, holding a closure over the old value (0), still fired
      // and animated the display back down to zero. That is what left the
      // dashboard's infrastructure card reading 0 / 0-0 next to a header that
      // said 8/8.
      isFirstRender.current = false;
      frameRef.current = requestAnimationFrame(animate);
    }, PAGE_ENTER_MS);

    return () => {
      window.clearTimeout(startId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [left, right]);

  return <span className={className}>{displayLeft}/{displayRight}</span>;
}

// Stat card component
/** True from the second paint onward.
 *
 * Bars and rings render at zero on the first frame and then transition to their
 * real value, so they draw themselves in without a per-element animation loop.
 * The CPU cost is a single CSS transition each; an rAF tween per element is
 * what once pinned this dashboard at 30-50% CPU.
 */
/** How long .view-container's page-enter animation runs (styles.css). */
const PAGE_ENTER_MS = 500;

function useGrown(): boolean {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    // Wait for the view's own entrance to finish. Starting the counters and
    // bars while the whole page is still sliding in makes both look like a
    // glitch — the numbers are already settling before the card has arrived.
    const id = window.setTimeout(() => setGrown(true), PAGE_ENTER_MS);
    return () => window.clearTimeout(id);
  }, []);
  return grown;
}

function StatCard({
  label,
  value,
  suffix,
  subValue,
  color = 'primary',
  icon,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  subValue?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={`stat-card ${color !== 'primary' ? `stat-${color}` : ''}`}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <AnimatedValue
          value={value}
          suffix={suffix}
          className={color !== 'primary' ? `text-${color}` : ''}
        />
        {subValue && <div className="stat-sub">{subValue}</div>}
      </div>
    </div>
  );
}

// Sci-fi Ring gauge component with multiple layers
function RingGauge({
  value,
  label,
  color,
  size = 100,
}: {
  value: number;
  label: string;
  color: string;
  size?: number;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  // Animate with count-up effect — only on first mount. Subsequent value
  // changes snap, otherwise the dashboard's 27 animated components × 60fps
  // burns ~50% browser CPU continuously.
  useEffect(() => {
    if (!isFirstRender.current) {
      setAnimatedValue(value);
      return;
    }
    const duration = 1000;
    const startValue = 0;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const current = startValue + (value - startValue) * easeOut;
      setAnimatedValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setAnimatedValue(value);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value]);

  const strokeWidth = 5;
  const innerRadius = (size - strokeWidth * 4) / 2 - 8;
  const outerRadius = (size - strokeWidth) / 2;
  const midRadius = innerRadius + (outerRadius - innerRadius) / 2;
  const circumference = 2 * Math.PI * midRadius;
  const offset = circumference - (animatedValue / 100) * circumference;

  // Generate tick marks around the outer ring
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const angle = (i * 10 - 90) * (Math.PI / 180);
    const isMajor = i % 3 === 0;
    const tickLength = isMajor ? 6 : 3;
    const startR = outerRadius - 2;
    const endR = startR - tickLength;
    return {
      x1: size / 2 + Math.cos(angle) * startR,
      y1: size / 2 + Math.sin(angle) * startR,
      x2: size / 2 + Math.cos(angle) * endR,
      y2: size / 2 + Math.sin(angle) * endR,
      isMajor,
    };
  });

  return (
    <div className="ring-gauge">
      <svg viewBox={`0 0 ${size} ${size}`} className="ring-svg">
        {/* Outer decoration ring */}
        <circle
          className="ring-outer-deco"
          cx={size / 2}
          cy={size / 2}
          r={outerRadius}
          strokeWidth={1}
        />

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            className={`ring-tick ${tick.isMajor ? 'major' : ''}`}
          />
        ))}

        {/* Background ring */}
        <circle
          className="ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={midRadius}
          strokeWidth={strokeWidth}
        />

        {/* Inner decoration ring */}
        <circle
          className="ring-inner-deco"
          cx={size / 2}
          cy={size / 2}
          r={innerRadius}
          strokeWidth={1}
        />

        {/* Value fill ring */}
        <circle
          className={`ring-fill ${color}`}
          cx={size / 2}
          cy={size / 2}
          r={midRadius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        {/* Needle pointing to current value */}
        <line
          className="ring-sweep"
          x1={size / 2}
          y1={size / 2}
          x2={size / 2}
          y2={size / 2 - midRadius - 4}
          transform={`rotate(${(animatedValue / 100) * 360 - 90} ${size / 2} ${size / 2})`}
        />

      </svg>
      <div className="ring-content">
        <span className={`ring-value text-${color}`}>{animatedValue.toFixed(0)}<span className="ring-percent">%</span></span>
        <span className="ring-label">{label}</span>
      </div>
    </div>
  );
}

// Cluster hexagon card
function ClusterHexCard({
  cluster,
  onClick,
}: {
  cluster: ClusterData;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  const summary = cluster.summary;

  if (!summary) {
    return null;
  }

  const cpuColor = getHealthColor(summary.total_cpu_usage);
  const memColor = getHealthColor(summary.total_memory_usage);
  const hasWarning = summary.alerts_warning > 0;
  const hasCritical = summary.alerts_critical > 0;

  return (
    <div
      className={`cluster-hex-card ${hasCritical ? 'critical' : hasWarning ? 'warning' : ''}`}
      onClick={onClick}
    >
      <div className="cluster-hex-inner">
        <div className="cluster-hex-header">
          <div className="cluster-hex-title">
            <span className="cluster-hex-name">{cluster.name || cluster.id}</span>
            {summary.is_standalone && (
              <span className="standalone-badge">{t('dashboard.standalone')}</span>
            )}
          </div>
          <span
            className={`cluster-hex-status ${summary.status === 'connected' ? 'online' : 'offline'}`}
          />
        </div>

        <div className="cluster-hex-metrics">
          <div className="cluster-hex-metric">
            <span className="metric-label">CPU</span>
            <div className="metric-bar">
              <div
                className={`metric-bar-fill ${cpuColor}`}
                style={{ width: `${summary.total_cpu_usage}%` }}
              />
            </div>
            <AnimatedPercent value={summary.total_cpu_usage} decimals={0} className={`metric-value small text-${cpuColor}`} />
          </div>

          <div className="cluster-hex-metric">
            <span className="metric-label">MEM</span>
            <div className="metric-bar">
              <div
                className={`metric-bar-fill ${memColor}`}
                style={{ width: `${summary.total_memory_usage}%` }}
              />
            </div>
            <AnimatedPercent value={summary.total_memory_usage} decimals={0} className={`metric-value small text-${memColor}`} />
          </div>
        </div>

        <div className="cluster-hex-stats">
          <div className="hex-stat">
            <AnimatedRatio left={summary.nodes_online} right={summary.node_count} className="hex-stat-value" />
            <span className="hex-stat-label">{t('cluster.nodes')}</span>
          </div>
          <div className="hex-stat">
            <AnimatedRatio left={summary.vms_running} right={summary.vm_count} className="hex-stat-value" />
            <span className="hex-stat-label">{t('cluster.vms_short')}</span>
          </div>
          <div className="hex-stat">
            <AnimatedRatio left={summary.cts_running} right={summary.ct_count} className="hex-stat-value" />
            <span className="hex-stat-label">{t('cluster.cts_short')}</span>
          </div>
        </div>

        {summary.has_ceph && (
          <div className="cluster-hex-ceph">
            <span className={`ceph-badge ${summary.ceph_health?.toLowerCase().replace('health_', '') || 'unknown'}`}>
              CEPH: {summary.ceph_health?.replace('HEALTH_', '') || 'N/A'}
            </span>
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="corner-decoration top-left" />
      <div className="corner-decoration top-right" />
      <div className="corner-decoration bottom-left" />
      <div className="corner-decoration bottom-right" />
    </div>
  );
}

export function CommandCenter({
  clusters,
  globalSummary,
  onSelectCluster,
  isPaused = false,
}: CommandCenterProps) {
  const grown = useGrown();
  const { t } = useTranslation();
  const clusterList = useMemo(() => Object.entries(clusters), [clusters]);

  // Calculate aggregated metrics from all clusters
  const aggregatedMetrics = useMemo(() => {
    let totalCpu = 0;
    let totalMem = 0;
    let totalStorage = 0;
    let clusterCount = 0;

    Object.values(clusters).forEach(cluster => {
      if (cluster.summary) {
        totalCpu += cluster.summary.total_cpu_usage || 0;
        totalMem += cluster.summary.total_memory_usage || 0;
        totalStorage += cluster.summary.total_storage_usage || 0;
        clusterCount++;
      }
    });

    return {
      avgCpu: clusterCount > 0 ? totalCpu / clusterCount : 0,
      avgMem: clusterCount > 0 ? totalMem / clusterCount : 0,
      avgStorage: clusterCount > 0 ? totalStorage / clusterCount : 0,
    };
  }, [clusters]);

  // Aggregated counters for the top stat tiles. Pulled from globalSummary
  // (authoritative across all clusters) when available, falling back to
  // a sum across cluster.summary objects.
  const heroStats = useMemo(() => {
    const totalNodes = globalSummary.total_nodes || 0;
    const onlineNodes = globalSummary.total_nodes_online || 0;
    const totalVms = globalSummary.total_vms || 0;
    const runningVms = globalSummary.total_vms_running || 0;
    const totalCts = globalSummary.total_cts || 0;
    const runningCts = globalSummary.total_cts_running || 0;
    let crit = 0, warn = 0;
    let oldestUptimeSec = 0;
    let oldestUptimeNode = '';
    for (const c of Object.values(clusters)) {
      if (c.summary) {
        crit += c.summary.alerts_critical || 0;
        warn += c.summary.alerts_warning || 0;
      }
      for (const n of Object.values(c.nodes || {})) {
        const u = (n as any).uptime_seconds ?? (n as any).uptime ?? 0;
        if (u && u > oldestUptimeSec) {
          oldestUptimeSec = u;
          oldestUptimeNode = (n as any).node || '';
        }
      }
    }
    const totalGuests = totalVms + totalCts;
    return {
      totalNodes, onlineNodes,
      totalVms, runningVms,
      totalCts, runningCts,
      totalGuests,
      crit, warn,
      avgLoad: aggregatedMetrics.avgCpu,
      oldestUptimeSec, oldestUptimeNode,
    };
  }, [globalSummary, clusters, aggregatedMetrics.avgCpu]);

  // Aggregate node / storage / running-task lists for the bottom panels.
  const allNodes = useMemo(() => {
    const out: Array<{ id: string; node: string; clusterId: string; cpu: number; memPct: number }> = [];
    for (const [cid, c] of Object.entries(clusters)) {
      for (const [k, n] of Object.entries(c.nodes || {})) {
        const memPct = (n as any).memory?.total_bytes
          ? ((n as any).memory.used_bytes / (n as any).memory.total_bytes) * 100
          : 0;
        out.push({
          id: `${cid}/${k}`, node: (n as any).node || k, clusterId: cid,
          cpu: ((n as any).cpu?.usage_percent || 0),
          memPct,
        });
      }
    }
    out.sort((a, b) => b.cpu - a.cpu);
    return out;
  }, [clusters]);

  const allStorages = useMemo(() => {
    const out: Array<{ id: string; storage: string; clusterId: string; type: string;
                       used: number; total: number; pct: number }> = [];
    for (const [cid, c] of Object.entries(clusters)) {
      const seen = new Set<string>();
      for (const [k, s] of Object.entries(c.storages || {})) {
        const sn = (s as any).storage || k;
        if (seen.has(sn)) continue;
        seen.add(sn);
        // StorageMetrics nests these under `disk` (a DiskMetrics), so reading
        // them off the top level returned undefined and every storage rendered
        // as "0 B / 0 B" — a whole panel of zeros with no error anywhere.
        // Accept both shapes so an older payload still works.
        const dm = (s as any).disk || {};
        const used = dm.used_bytes ?? (s as any).used_bytes ?? 0;
        const total = dm.total_bytes ?? (s as any).total_bytes ?? 0;
        out.push({
          id: `${cid}/${k}`, storage: sn, clusterId: cid,
          type: (s as any).type || '',
          used, total,
          pct: total > 0 ? (used / total) * 100 : 0,
        });
      }
    }
    out.sort((a, b) => b.pct - a.pct);
    return out;
  }, [clusters]);

  const activeTasks = useMemo(() => {
    const out: Array<{ upid: string; type: string; vmid: number; node: string;
                       starttime: number; user: string; clusterId: string }> = [];
    for (const [cid, c] of Object.entries(clusters)) {
      for (const t of Object.values(c.tasks || {})) {
        if ((t as any).status === 'running' || !(t as any).endtime) {
          out.push({
            upid: (t as any).upid || '',
            type: (t as any).task_type || (t as any).type || '',
            vmid: (t as any).vmid || 0,
            node: (t as any).node || '',
            starttime: (t as any).starttime || 0,
            user: (t as any).user || '',
            clusterId: cid,
          });
        }
      }
    }
    out.sort((a, b) => b.starttime - a.starttime);
    return out;
  }, [clusters]);

  // Synthetic alert feed from current cache state. Keeps it dependency-
  // light — no extra HTTP from the dashboard. Each entry has a level,
  // tag, label and optional "since" timestamp.
  const alertFeed = useMemo(() => {
    const feed: Array<{ level: 'critical'|'warning'|'info'; tag: string; label: string }> = [];
    for (const [cid, c] of Object.entries(clusters)) {
      const cname = c.name || cid;
      // Offline nodes (critical)
      for (const n of Object.values(c.nodes || {})) {
        if ((n as any).status && (n as any).status !== 'online') {
          feed.push({
            level: 'critical', tag: 'NODE_OFFLINE',
            label: `${cname} · ${(n as any).node} is ${(n as any).status}`,
          });
        }
      }
      // High CPU/MEM
      for (const n of Object.values(c.nodes || {})) {
        const cpu = (n as any).cpu?.usage_percent || 0;
        if (cpu >= 95) {
          feed.push({
            level: 'critical', tag: 'CPU_OVER_THRESHOLD',
            label: `${cname} · ${(n as any).node} CPU ${cpu.toFixed(0)}%`,
          });
        } else if (cpu >= 80) {
          feed.push({
            level: 'warning', tag: 'CPU_HIGH',
            label: `${cname} · ${(n as any).node} CPU ${cpu.toFixed(0)}%`,
          });
        }
        const memTot = (n as any).memory?.total_bytes || 0;
        const memUsed = (n as any).memory?.used_bytes || 0;
        const memPct = memTot ? (memUsed / memTot) * 100 : 0;
        if (memPct >= 95) {
          feed.push({
            level: 'critical', tag: 'MEM_OVER_THRESHOLD',
            label: `${cname} · ${(n as any).node} MEM ${memPct.toFixed(0)}%`,
          });
        } else if (memPct >= 85) {
          feed.push({
            level: 'warning', tag: 'MEM_HIGH',
            label: `${cname} · ${(n as any).node} MEM ${memPct.toFixed(0)}%`,
          });
        }
      }
      // Storage near full
      // cache.storages holds one row PER NODE for a shared storage, so a
      // single PBS on a 5-node cluster used to push five identical
      // STORAGE_FULL alerts into the feed.
      const seenStor = new Set<string>();
      for (const s of Object.values(c.storages || {})) {
        const sname = (s as any).storage;
        if (seenStor.has(sname)) continue;
        seenStor.add(sname);
        const tot = (s as any).total_bytes || 0;
        const used = (s as any).used_bytes || 0;
        const pct = tot ? (used / tot) * 100 : 0;
        if (pct >= 90) {
          feed.push({
            level: 'critical', tag: 'STORAGE_FULL',
            label: `${cname} · ${(s as any).storage} ${pct.toFixed(0)}%`,
          });
        } else if (pct >= 80) {
          feed.push({
            level: 'warning', tag: 'STORAGE_HIGH',
            label: `${cname} · ${(s as any).storage} ${pct.toFixed(0)}%`,
          });
        }
      }
      // Ceph not OK
      if (c.ceph && c.ceph.health && c.ceph.health !== 'HEALTH_OK') {
        feed.push({
          level: c.ceph.health === 'HEALTH_ERR' ? 'critical' : 'warning',
          tag: 'CEPH_' + (c.ceph.health || '').replace('HEALTH_', ''),
          label: `${cname} · ${c.ceph.health}`,
        });
      }
    }
    // Severity sort (critical first), cap.
    const order = { critical: 0, warning: 1, info: 2 };
    feed.sort((a, b) => order[a.level] - order[b.level]);
    return feed.slice(0, 10);
  }, [clusters]);

  return (
    <div className="command-center">
      {/* Grid floor effect */}
      <div className="grid-floor" />

      {/* Title Section */}
      <div className="cc-header">
        <h1 className="cc-title font-display">
          <span className="glitch-text" data-text={t('dashboard.title')}>
            {t('dashboard.title')}
          </span>
        </h1>
        <div className="cc-subtitle">
          {t('dashboard.subtitle')}
          {' · '}
          <span className="cc-live">
            <span className="cc-live-dot" /> LIVE
          </span>
          {' · '}
          {globalSummary.total_clusters} clusters · {heroStats.totalNodes} nodes · {heroStats.totalGuests} guests
        </div>
      </div>

      {/* Main Content — cc-content has a max-width: 1400px constraint
          so all sections inside (tiles, gauges, galaxy, bottom panels)
          share the same effective width on wide displays. */}
      <div className="cc-content">
        {/* Hero stat tiles row — at-a-glance health for the whole estate. */}
        <div className="cc-tiles">
          <HeroTile label={t('cluster.nodes_online')}
                    value={`${heroStats.onlineNodes} / ${heroStats.totalNodes}`}
                    sub={heroStats.onlineNodes < heroStats.totalNodes
                          ? `${heroStats.totalNodes - heroStats.onlineNodes} offline`
                          : 'all up'}
                    tone={heroStats.onlineNodes < heroStats.totalNodes ? 'warn' : 'ok'} />
          <HeroTile label={t('cluster.vms_running')}
                    value={`${heroStats.runningVms} / ${heroStats.totalVms}`}
                    sub={`${heroStats.totalVms - heroStats.runningVms} stopped`}
                    tone="ok" />
          <HeroTile label={t('cluster.cts_running')}
                    value={`${heroStats.runningCts} / ${heroStats.totalCts}`}
                    sub={`${heroStats.totalCts - heroStats.runningCts} stopped`}
                    tone="ok" />
          <HeroTile label={t('dashboard.cluster_load')}
                    value={`${heroStats.avgLoad.toFixed(0)}%`}
                    sub={t('metric.cpu') + ' avg'}
                    tone={heroStats.avgLoad >= 85 ? 'crit' : heroStats.avgLoad >= 70 ? 'warn' : 'ok'} />
          <HeroTile label={t('dashboard.active_alerts')}
                    value={`${heroStats.crit + heroStats.warn}`}
                    sub={`${heroStats.crit} critical · ${heroStats.warn} warn`}
                    tone={heroStats.crit > 0 ? 'crit' : heroStats.warn > 0 ? 'warn' : 'ok'} />
          <HeroTile label={t('dashboard.uptime_longest')}
                    value={fmtUptimeShort(heroStats.oldestUptimeSec)}
                    sub={heroStats.oldestUptimeNode ? `longest · ${heroStats.oldestUptimeNode}` : ''}
                    tone="ok" />
        </div>

        {/* Top Row - Gauges and Stats */}
        <div className="cc-top-row">
          {/* Ring Gauges */}
          <div className="cc-gauges panel-card">
            <div className="panel-card-head">
              <span className="panel-card-dot" />
              <span>{t('dashboard.resource_usage')}</span>
            </div>
            <div className="panel-card-body gauges-container">
              <RingGauge
                value={aggregatedMetrics.avgCpu}
                label={t('metric.cpu')}
                color={getHealthColor(aggregatedMetrics.avgCpu)}
                size={110}
              />
              <RingGauge
                value={aggregatedMetrics.avgMem}
                label={t('metric.memory')}
                color={getHealthColor(aggregatedMetrics.avgMem)}
                size={110}
              />
              <RingGauge
                value={aggregatedMetrics.avgStorage}
                label={t('metric.disk')}
                color={getHealthColor(aggregatedMetrics.avgStorage)}
                size={110}
              />
            </div>
          </div>

          {/* Global Stats Panel */}
          <div className="cc-stats-panel panel-card">
            <div className="panel-card-head">
              <span className="panel-card-dot" />
              <span>{t('dashboard.infrastructure')}</span>
            </div>
            <div className="panel-card-body stats-grid">
              <StatCard
                label={t('cluster.total')}
                value={globalSummary.total_clusters}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>}
              />
              <StatCard
                label={t('cluster.nodes_online')}
                value={`${globalSummary.total_nodes_online}/${globalSummary.total_nodes}`}
                color={globalSummary.total_nodes_online < globalSummary.total_nodes ? 'warning' : 'success'}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>}
              />
              <StatCard
                label={t('cluster.vms_running')}
                value={`${globalSummary.total_vms_running}/${globalSummary.total_vms}`}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>}
              />
              <StatCard
                label={t('cluster.cts_running')}
                value={`${globalSummary.total_cts_running}/${globalSummary.total_cts}`}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>}
              />
            </div>
          </div>
        </div>

        {/* Cluster Galaxy */}
        <div className="cc-galaxy panel-card">
          <div className="panel-card-head">
            <span className="panel-card-dot" />
            <span>{t('cluster.galaxy')}</span>
            <span className="panel-card-meta">{clusterList.length}</span>
          </div>
          <div className="panel-card-body galaxy-container">
            {clusterList.length === 0 ? (
              <div className="no-clusters">
                <div className="no-clusters-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="no-clusters-text">
                  {t('loading.connecting')}
                </div>
                <div className="no-clusters-hint">
                  Configure clusters in config.yaml
                </div>
              </div>
            ) : (
              <div className="cluster-grid">
                {clusterList.map(([id, cluster]) => (
                  <ClusterHexCard
                    key={id}
                    cluster={cluster}
                    onClick={() => onSelectCluster(id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom row — Nodes CPU / Storage capacity / Active tasks. */}
        <div className="cc-bottom">
          <div className="panel-card cc-panel">
            <div className="panel-card-head">
              <span className="panel-card-dot" />
              <span>{t('dashboard.nodes_cpu')}</span>
            </div>
            <div className="panel-card-body cc-list">
              {allNodes.length === 0 && (
                <div className="cc-empty">{t('loading.connecting')}</div>
              )}
              {allNodes.slice(0, 10).map((n) => (
                <div key={n.id} className="cc-row">
                  <div className="cc-row-head">
                    <span className="cc-row-name">{n.node}</span>
                    <span className="cc-row-val"
                          style={{ color: n.cpu >= 90 ? 'var(--danger, #ff4d6d)'
                                       : n.cpu >= 70 ? 'var(--warning)'
                                       : 'var(--text-primary)' }}>
                      <AnimatedPercent value={n.cpu} decimals={1} />
                    </span>
                  </div>
                  <div className="cc-row-bar">
                    <span style={{ width: grown ? `${Math.min(100, n.cpu)}%` : '0%',
                                   background: n.cpu >= 90 ? 'var(--danger, #ff4d6d)'
                                            : n.cpu >= 70 ? 'var(--warning)'
                                            : 'var(--primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card cc-panel">
            <div className="panel-card-head">
              <span className="panel-card-dot" />
              <span>{t('dashboard.storage_capacity')}</span>
            </div>
            <div className="panel-card-body cc-list">
              {allStorages.length === 0 && (
                <div className="cc-empty">—</div>
              )}
              {allStorages.slice(0, 10).map((s) => (
                <div key={s.id} className="cc-row">
                  <div className="cc-row-head">
                    <span className="cc-row-name" title={`${s.storage} (${s.type})`}>{s.storage}</span>
                    <span className="cc-row-val"
                          style={{ color: s.pct >= 90 ? 'var(--danger, #ff4d6d)'
                                       : s.pct >= 75 ? 'var(--warning)'
                                       : 'var(--text-primary)' }}>
                      <AnimatedNumber value={s.used} formatFn={formatBytes} duration={900} />
                      {' / '}
                      <AnimatedNumber value={s.total} formatFn={formatBytes} duration={900} />
                    </span>
                  </div>
                  <div className="cc-row-bar">
                    <span style={{ width: grown ? `${Math.min(100, s.pct)}%` : '0%',
                                   background: s.pct >= 90 ? 'var(--danger, #ff4d6d)'
                                            : s.pct >= 75 ? 'var(--warning)'
                                            : 'var(--primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card cc-panel">
            <div className="panel-card-head">
              <span className="panel-card-dot" />
              <span>{t('dashboard.tasks_active')}</span>
              <span className="panel-card-meta">{activeTasks.length}</span>
            </div>
            <div className="panel-card-body cc-list">
              {activeTasks.length === 0 && (
                <div className="cc-empty">{t('dashboard.no_running_tasks')}</div>
              )}
              {activeTasks.slice(0, 10).map((task) => (
                <div key={task.upid} className="cc-task">
                  <div className="cc-task-head">
                    <span className="cc-task-type">{task.type}</span>
                    <span className="cc-task-target">
                      {task.vmid > 0 ? `vm ${task.vmid}` : task.node}
                    </span>
                  </div>
                  <div className="cc-task-meta">
                    <span>{task.user || '—'}</span>
                    <span>{task.starttime
                      ? new Date(task.starttime * 1000).toLocaleTimeString()
                      : '—'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card cc-panel cc-alerts">
            <div className="panel-card-head">
              <span className="panel-card-dot" />
              <span>{t('dashboard.alerts')}</span>
              <span className="panel-card-meta">{alertFeed.length}</span>
            </div>
            <div className="panel-card-body cc-list">
              {alertFeed.length === 0 && (
                <div className="cc-empty">{t('dashboard.no_alerts')}</div>
              )}
              {alertFeed.map((a, i) => (
                <div key={i} className="cc-alert">
                  <span className={`cc-sev cc-sev-${a.level}`}>{a.level}</span>
                  <span className="cc-alert-tag">{a.tag}</span>
                  <span className="cc-alert-text">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .command-center {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-md);
        }

        .cc-header {
          text-align: center;
          margin-bottom: var(--spacing-md);
        }

        .cc-title {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
          letter-spacing: 0.12em;
        }

        /* Display face (Orbitron for Latin / Plix for CJK) instead of the
           old mono with 0.2em tracking — the mono + extreme letterspace
           combination read as cheap dot-matrix next to the new CJK face. */
        .cc-subtitle {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.14em;
        }

        .cc-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Top Row */
        .cc-top-row {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) 2fr;
          gap: var(--spacing-md);
          align-items: stretch;
        }

        .cc-top-row > .panel-card {
          min-height: 160px;
          min-width: 0;
        }

        @media (max-width: 1000px) {
          .cc-top-row {
            grid-template-columns: 1fr;
          }
        }

        /* Gauges Panel */
        .cc-gauges {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .gauges-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: var(--spacing-sm);
          flex-wrap: nowrap;
          flex: 1;
          min-height: 120px;
        }

        /* Auto-scale gauges to fill container */
        .cc-gauges .ring-gauge {
          flex: 0 1 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cc-gauges .ring-gauge svg {
          width: 110px;
          height: 110px;
        }

        /* Ring Gauge - Sci-Fi Style */
        .ring-gauge {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ring-svg {
          transform: rotate(0deg);
        }

        .ring-outer-deco {
          fill: none;
          stroke: var(--primary-dim);
          opacity: 0.3;
        }

        .ring-inner-deco {
          fill: none;
          stroke: var(--primary-dim);
          opacity: 0.4;
          stroke-dasharray: 4 2;
        }

        .ring-tick {
          stroke: var(--primary-dim);
          stroke-width: 1;
          opacity: 0.3;
        }

        .ring-tick.major {
          opacity: 0.6;
          stroke-width: 1.5;
        }

        .ring-bg {
          fill: none;
          stroke: var(--bg-primary);
        }

        .ring-fill {
          fill: none;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.6s ease-out;
        }

        .ring-fill.success { stroke: var(--success); filter: drop-shadow(0 0 8px var(--success)); }
        .ring-fill.warning { stroke: var(--warning); filter: drop-shadow(0 0 8px var(--warning)); }
        .ring-fill.danger { stroke: var(--danger); filter: drop-shadow(0 0 8px var(--danger)); }

        .ring-sweep {
          stroke: var(--text);
          stroke-width: 2;
          opacity: 0.9;
          transform-origin: center;
          filter: drop-shadow(0 0 3px var(--primary));
          transition: transform 0.5s ease-out;
        }


        .ring-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .ring-value {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
        }

        .ring-percent {
          font-size: 13px;
          opacity: 0.7;
        }

        .ring-label {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          margin-top: 2px;
          text-transform: uppercase;
        }

        /* Stats Panel */
        .cc-stats-panel {
          display: flex;
          flex-direction: column;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
          flex: 1;
          align-content: stretch;
        }

        .stats-grid .stat-card {
          height: 100%;
        }

        @media (min-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-left: 3px solid var(--primary);
          border-radius: var(--radius-sm);
          padding: var(--spacing-md) var(--spacing-sm);
          transition: all var(--transition-fast);
          min-height: 70px;
        }

        .stat-card:hover {
          border-color: var(--primary-dim);
          border-left-color: var(--primary);
          transform: translateY(-1px);
        }

        .stat-card.stat-warning { border-left-color: var(--warning); }
        .stat-card.stat-success { border-left-color: var(--success); }
        .stat-card.stat-danger { border-left-color: var(--danger-text); }

        .stat-icon {
          color: var(--primary-dim);
          opacity: 0.8;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
          min-width: 0;
        }

        .stat-label {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .stat-sub {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Galaxy */
        .cc-galaxy {
          flex: 1;
        }

        .galaxy-container {
          min-height: 200px;
          position: relative;
        }

        .galaxy-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(191, 0, 255, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .cluster-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }

        /* auto-FIT, not a ladder of fixed column counts.
           Fixed counts are wrong in both directions: capped at three, a 1900px
           display showed 4 clusters as 3 + 1 with two thirds of row two empty;
           raised to six, a 2560px display made six tracks for four cards and
           left the right third of the panel blank. auto-fit collapses the
           tracks nothing occupies, so the cards always stretch to fill the row
           whatever the width and however many clusters there are. */


        /* Cluster Hex Card */
        .cluster-hex-card {
          position: relative;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          cursor: pointer;
          transition: all var(--transition-normal);
          animation: neon-breathe 4s ease-in-out infinite;
          overflow: hidden;
        }

        .cluster-hex-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.5;
        }

        .cluster-hex-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 240, 255, 0.2), var(--primary-glow);
          border-color: var(--primary);
        }

        .cluster-hex-card.warning {
          border-color: var(--warning);
          animation: warning-pulse 2s ease-in-out infinite;
        }

        .cluster-hex-card.warning::before {
          background: linear-gradient(90deg, transparent, var(--warning), transparent);
        }

        .cluster-hex-card.critical {
          border-color: var(--danger-text);
          animation: danger-pulse 1s ease-in-out infinite;
        }

        .cluster-hex-card.critical::before {
          background: linear-gradient(90deg, transparent, var(--danger), transparent);
        }

        .cluster-hex-inner {
          position: relative;
          z-index: 1;
        }

        .cluster-hex-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border-dim);
        }

        .cluster-hex-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .cluster-hex-name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }

        .standalone-badge {
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 3px 8px;
          background: rgba(191, 0, 255, 0.15);
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cluster-hex-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--danger);
          box-shadow: 0 0 8px var(--danger);
        }

        .cluster-hex-status.online {
          background: var(--success);
          box-shadow: 0 0 12px var(--success);
          animation: status-pulse 2s ease-in-out infinite;
        }

        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 8px var(--success); }
          50% { box-shadow: 0 0 16px var(--success); }
        }

        .cluster-hex-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: var(--spacing-sm);
        }

        .cluster-hex-metric {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .cluster-hex-metric .metric-label {
          width: 36px;
          font-size: 14px;
          font-family: var(--font-display);
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        /* Segmented "gauge" bar — matches the radar anomaly-card meters.
           The notch overlay sits ON TOP of the fill (z-index) so the bar
           reads as discrete segments rather than a smooth track. */
        .metric-bar {
          flex: 1;
          height: 10px;
          background: rgba(0, 5, 15, 0.95);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .metric-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 4px,
            rgba(0, 0, 0, 0.5) 4px,
            rgba(0, 0, 0, 0.5) 5px
          );
        }

        .metric-bar-fill {
          position: relative;
          z-index: 1;
          height: 100%;
          background: var(--primary);
          border-radius: 1px;
          transition: width var(--transition-normal);
          box-shadow: 0 0 8px currentColor;
        }

        .metric-bar-fill.warning {
          background: var(--warning);
          box-shadow: 0 0 8px var(--warning);
        }

        .metric-bar-fill.danger {
          background: var(--danger);
          box-shadow: 0 0 8px var(--danger);
        }

        .metric-bar-fill.success {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .metric-value.small {
          font-size: 13px;
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }

        .cluster-hex-stats {
          display: flex;
          justify-content: space-around;
          padding: var(--spacing-sm) 0;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-xs);
        }

        .hex-stat {
          text-align: center;
          padding: 0 var(--spacing-sm);
        }

        .hex-stat-value {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          display: block;
          line-height: 1.2;
        }

        .hex-stat-label {
          font-size: 13px;
          font-family: var(--font-display);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .cluster-hex-ceph {
          text-align: center;
          margin-top: var(--spacing-xs);
        }

        .ceph-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 4px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .ceph-badge.ok {
          color: var(--success);
          border: 1px solid rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.1);
        }

        .ceph-badge.warn {
          color: var(--warning);
          border: 1px solid rgba(255, 107, 0, 0.5);
          background: rgba(255, 107, 0, 0.1);
        }

        .ceph-badge.err {
          color: var(--danger-text);
          border: 1px solid rgba(255, 0, 64, 0.5);
          background: rgba(255, 0, 64, 0.1);
        }

        /* No clusters state */
        .no-clusters {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: var(--text-secondary);
        }

        .no-clusters-icon {
          color: var(--primary-dim);
          margin-bottom: var(--spacing-md);
          animation: pulse 2s ease-in-out infinite;
        }

        .no-clusters-text {
          font-family: var(--font-display);
          font-size: 15px;
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
        }

        .no-clusters-hint {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .command-center {
            padding: var(--spacing-md);
          }

          .cc-title {
            font-size: 20px;
          }

          .cluster-hex-card {
            width: 100%;
          }

          .cc-gauges .ring-gauge svg {
            width: 90px;
            height: 90px;
          }

          .ring-value {
            font-size: 15px;
          }

          .ring-label {
            font-size: 9px;
          }
        }

        @media (max-width: 480px) {
          .command-center {
            padding: var(--spacing-sm);
          }

          .cc-title {
            font-size: 16px;
          }

          .gauges-container {
            gap: 2px;
            padding: 2px;
            min-height: 90px;
          }

          .cc-gauges .ring-gauge svg {
            width: 75px;
            height: 75px;
          }

          .ring-value {
            font-size: 12px;
          }

          .ring-percent {
            font-size: 8px;
          }

          .ring-label {
            font-size: 7px;
            letter-spacing: 0.03em;
          }

          .cc-top-row > .panel-card {
            min-height: 100px;
          }

          .stat-card {
            padding: var(--spacing-xs);
            min-height: 50px;
          }

          .stat-value {
            font-size: 16px;
          }

          .stat-label {
            font-size: 9px;
          }
        }

        @media (max-width: 360px) {
          .gauges-container {
            gap: 0;
            padding: 0;
            min-height: 70px;
          }

          .cc-gauges .ring-gauge svg {
            width: 60px;
            height: 60px;
          }

          .ring-value {
            font-size: 10px;
          }

          .ring-label {
            font-size: 6px;
          }
        }

        /* ===== Hero stat tiles + bottom panels ===== */
        .cc-live { color: var(--success); display: inline-flex; align-items: center; gap: 4px; }
        .cc-live-dot {
          display: inline-block; width: 8px; height: 8px; border-radius: 50%;
          background: var(--success); box-shadow: 0 0 6px var(--success);
          animation: pulse 1.4s ease-in-out infinite;
        }

        .cc-tiles {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 1100px) { .cc-tiles { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px)  { .cc-tiles { grid-template-columns: repeat(2, 1fr); } }

        /* Tiles share the panel-card surface. The breathe animation is
         * disabled on tiles only: six extra animated box-shadows is real
         * paint cost for no signal (the tone rail already carries state).
         * The tone rail repurposes the ::before pseudo, replacing the
         * panel-card top hairline on tiles. */
        .cc-tile {
          padding: 12px 14px;
          animation: none;
        }
        .cc-tile::before {
          top: 0; bottom: 0; left: 0; right: auto;
          width: 3px; height: auto;
          background: var(--primary); opacity: 0.6;
        }
        .cc-tile.tone-warn::before { background: var(--warning); }
        .cc-tile.tone-crit::before { background: var(--danger, #ff4d6d); }
        /* 14px + weight 600: the 600 matters with the Plix CJK split —
           it pulls Chinese labels onto the Regular file instead of the
           Light one, which read too dim at small sizes. */
        .cc-tile-label {
          font-family: var(--font-display); font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-secondary); margin-bottom: 8px;
        }
        .cc-tile-value {
          font-family: var(--font-display); font-size: 26px;
          font-weight: 600; letter-spacing: 0.04em;
          color: var(--text-primary); line-height: 1.05;
        }
        .cc-tile.tone-warn .cc-tile-value { color: var(--warning); }
        .cc-tile.tone-crit .cc-tile-value { color: var(--danger, #ff4d6d); }
        .cc-tile-sub {
          margin-top: 8px;
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary); letter-spacing: 0.04em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        /* Decorative sparkline-like hairline beneath the value. Pure
         * styling — no real data series; signals "this is a live tile"
         * without faking a chart we don't have data for. */
        .cc-tile-spark {
          margin-top: 8px; height: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.2) 30%,
            rgba(0, 240, 255, 0.55) 60%,
            rgba(0, 240, 255, 0.18) 80%,
            transparent 100%);
          border-radius: 2px;
        }
        .cc-tile.tone-warn .cc-tile-spark {
          background: linear-gradient(90deg, transparent, rgba(255, 200, 0, 0.45), transparent);
        }
        .cc-tile.tone-crit .cc-tile-spark {
          background: linear-gradient(90deg, transparent, rgba(255, 77, 109, 0.5), transparent);
        }

        .cc-bottom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
        }
        @media (min-width: 1200px) {
          .cc-bottom { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        }

        /* Bottom panels — canonical panel-card supplies the surface;
         * only sizing + scroll behaviour live here. */
        .cc-panel {
          min-height: 220px;
          max-height: 360px;
          display: flex; flex-direction: column;
        }
        .cc-list { overflow-y: auto; flex: 1; min-height: 0; }
        .cc-empty {
          padding: 20px 10px; text-align: center;
          color: var(--text-muted); font-family: var(--font-mono);
          font-size: 12px; font-style: italic;
        }

        /* Per-row bar entries (nodes / storage). */
        .cc-row { padding: 6px 4px; }
        .cc-row + .cc-row { border-top: 1px solid rgba(0, 240, 255, 0.04); }
        .cc-row-head {
          display: flex; justify-content: space-between; gap: 8px;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .cc-row-name { color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cc-row-val { font-variant-numeric: tabular-nums; white-space: nowrap; }
        .cc-row-bar {
          height: 4px; border-radius: 2px;
          background: rgba(0, 240, 255, 0.06);
          overflow: hidden;
        }
        .cc-row-bar > span {
          display: block; height: 100%;
          transition: width 0.5s ease-out;
          box-shadow: 0 0 4px currentColor;
        }

        /* Active task rows. */
        .cc-task { padding: 6px 4px; }
        .cc-task + .cc-task { border-top: 1px solid rgba(0, 240, 255, 0.04); }
        .cc-task-head {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 12px;
        }
        .cc-task-type {
          font-family: var(--font-display); font-size: 10px;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--accent, #e066ff);
          padding: 1px 6px; border-radius: 2px;
          border: 1px solid rgba(224, 102, 255, 0.4);
        }
        .cc-task-target { color: var(--text-primary); }
        .cc-task-meta {
          margin-top: 2px;
          display: flex; justify-content: space-between;
          font-family: var(--font-mono); font-size: 10px;
          color: var(--text-muted);
        }

        /* Alert feed rows. */
        .cc-alert {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 4px;
          font-family: var(--font-mono); font-size: 12px;
        }
        .cc-alert + .cc-alert { border-top: 1px solid rgba(0, 240, 255, 0.04); }
        .cc-sev {
          padding: 1px 7px; border-radius: 2px;
          font-family: var(--font-display); font-size: 9px;
          letter-spacing: 0.08em; text-transform: uppercase;
          flex-shrink: 0;
        }
        .cc-sev-critical { color: var(--danger, #ff4d6d); border: 1px solid currentColor; background: rgba(255, 77, 109, 0.08); }
        .cc-sev-warning  { color: var(--warning); border: 1px solid currentColor; background: rgba(255, 200, 0, 0.08); }
        .cc-sev-info     { color: var(--primary); border: 1px solid currentColor; background: rgba(0, 240, 255, 0.04); }
        .cc-alert-tag {
          color: var(--text-secondary);
          font-size: 10px; letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .cc-alert-text {
          color: var(--text-primary);
          flex: 1;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------
// Helpers used by the redesigned dashboard.

/**
 * HeroTile — large stat cell at the top of the dashboard. Tone tints the
 * value + side rail (cyan / amber / red) so a glance reveals the worst
 * metric on the estate.
 */
function HeroTile({
  label, value, sub, tone = 'ok',
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: 'ok' | 'warn' | 'crit';
}) {
  return (
    <div className={`panel-card cc-tile tone-${tone}`}>
      <div className="cc-tile-label">{label}</div>
      <div className="cc-tile-value">{value}</div>
      {sub && <div className="cc-tile-sub">{sub}</div>}
      <div className="cc-tile-spark" />
    </div>
  );
}

function fmtUptimeShort(seconds: number): string {
  if (!seconds || seconds <= 0) return '—';
  const d = Math.floor(seconds / 86400);
  if (d >= 1) return `${d}d`;
  const h = Math.floor(seconds / 3600);
  if (h >= 1) return `${h}h`;
  const m = Math.floor(seconds / 60);
  return `${m}m`;
}
