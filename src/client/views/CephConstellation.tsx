/**
 * JT-PROXENSE Ceph Constellation View
 * Sci-fi movie style Ceph cluster visualization
 */

import React, { useMemo, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../i18n';
import type { ClusterData, CephMetrics, CephMon, CephMgr, CephMds, CephOSD, CephPool } from '../types';
import { formatBytes, formatPercent, getHealthColor } from '../utils/format';

interface CephConstellationProps {
  cluster: ClusterData | null;
  clusters?: Record<string, ClusterData>;
  isPaused?: boolean;
}


// Animated number counter
function AnimatedValue({ value, duration = 800, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = display;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(startRef.current + (value - startRef.current) * eased);
      if (progress < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [value, duration]);

  return <>{display.toFixed(0)}{suffix}</>;
}

// Animated bytes counter with formatBytes
function AnimatedBytes({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = display;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(startRef.current + (value - startRef.current) * eased);
      if (progress < 1) animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [value, duration]);

  return <>{formatBytes(display)}</>;
}

// Central Core Visualization - Animated rings showing health/storage
function CephCore({ ceph }: { ceph: CephMetrics }) {
  const healthColor = ceph.health === 'HEALTH_OK' ? '#00ff88' : ceph.health === 'HEALTH_WARN' ? '#ff6b00' : '#ff0040';
  const storagePercent = ceph.total_bytes > 0 ? (ceph.used_bytes / ceph.total_bytes) * 100 : 0;
  const storageColor = storagePercent >= 95 ? '#ff0040' : storagePercent >= 80 ? '#ff6b00' : '#00ff88';

  // Use storagePercent directly - CSS transition handles smooth updates

  return (
    <div className="ceph-core visible">
      <svg viewBox="0 0 200 200" className="core-svg">
        {/* Scanning effect */}
        <defs>
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={healthColor} stopOpacity="0" />
            <stop offset="50%" stopColor={healthColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={healthColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer rotating ring */}
        <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="1" />
        <circle
          cx="100" cy="100" r="95"
          fill="none"
          stroke={healthColor}
          strokeWidth="3"
          strokeDasharray="30 15"
          strokeLinecap="round"
          className="rotating-ring"
          style={{ filter: `drop-shadow(0 0 8px ${healthColor})` }}
        />

        {/* Scanning line */}
        <line x1="100" y1="5" x2="100" y2="50" stroke="url(#scanGradient)" strokeWidth="2" className="scan-line" />

        {/* Storage ring background */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(100, 100, 120, 0.2)" strokeWidth="8" />
        {/* Storage ring animated */}
        <circle
          cx="100" cy="100" r="80"
          fill="none"
          stroke={storageColor}
          strokeWidth="8"
          strokeDasharray={`${storagePercent * 5.02} 502`}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          className="storage-ring"
          style={{ filter: `drop-shadow(0 0 6px ${storageColor})` }}
        />

        {/* Inner pulsing core */}
        <circle cx="100" cy="100" r="55" fill="rgba(10, 20, 35, 0.9)" stroke={healthColor} strokeWidth="2" className="pulse-core" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="4 4" className="inner-dots" />

        {/* Data stream particles */}
        <circle r="3" fill={healthColor} className="data-particle p1">
          <animateMotion dur="2s" repeatCount="indefinite" path="M100,5 A95,95 0 0,1 195,100" />
        </circle>
        <circle r="2" fill={healthColor} className="data-particle p2">
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M195,100 A95,95 0 0,1 100,195" begin="0.5s" />
        </circle>
        <circle r="2.5" fill={healthColor} className="data-particle p3">
          <animateMotion dur="3s" repeatCount="indefinite" path="M100,195 A95,95 0 0,1 5,100" begin="1s" />
        </circle>

        {/* Health text */}
        <text x="100" y="90" textAnchor="middle" fill={healthColor} className="health-text">
          {ceph.health.replace('HEALTH_', '')}
        </text>
        <text x="100" y="115" textAnchor="middle" fill="var(--text-secondary)" className="storage-text">
          <AnimatedValue value={storagePercent} duration={1500} suffix="%" />
        </text>
      </svg>

      {/* Pulse rings */}
      <div className="pulse-ring ring-1" style={{ borderColor: healthColor }} />
      <div className="pulse-ring ring-2" style={{ borderColor: healthColor }} />
      <div className="pulse-ring ring-3" style={{ borderColor: healthColor }} />
    </div>
  );
}

// Daemon Orbital - Shows MON/MGR/MDS as orbiting nodes
function DaemonOrbital({ mons, mgrs, mds }: { mons: CephMon[]; mgrs: CephMgr[]; mds: CephMds[] }) {
  const { t } = useTranslation();
  return (
    <div className="panel-card daemon-orbital">
      <div className="panel-card-head">
        <span className="panel-card-dot" />
        <span>{t('ceph.cluster_daemons')}</span>
        <span className="panel-card-meta">{mons.length + mgrs.length + mds.length}</span>
      </div>

      {/* MON Section - Label left, nodes right */}
      <div className="daemon-row">
        <div className="daemon-label">
          <span className="daemon-type mon">MON</span>
          <span className="daemon-count">{mons.length}</span>
        </div>
        <div className="daemon-nodes">
          {mons.map(mon => (
            <div key={mon.name} className={`daemon-node mon ${mon.state}`} title={`${mon.name} - ${mon.host}`}>
              <span className="node-name">{mon.name}</span>
              <span className="node-state">{mon.state === 'leader' ? 'L' : 'P'}</span>
              {mon.state === 'leader' && <div className="leader-glow" />}
            </div>
          ))}
        </div>
      </div>

      {/* MGR Section */}
      <div className="daemon-row">
        <div className="daemon-label">
          <span className="daemon-type mgr">MGR</span>
          <span className="daemon-count">{mgrs.length}</span>
        </div>
        <div className="daemon-nodes">
          {mgrs.map(mgr => (
            <div key={mgr.name} className={`daemon-node mgr ${mgr.active ? 'active' : 'standby'}`} title={`${mgr.name} - ${mgr.host}`}>
              <span className="node-name">{mgr.name}</span>
              <span className="node-state">{mgr.active ? 'A' : 'S'}</span>
              {mgr.active && <div className="active-glow" />}
            </div>
          ))}
        </div>
      </div>

      {/* MDS Section */}
      {mds.length > 0 && (
        <div className="daemon-row">
          <div className="daemon-label">
            <span className="daemon-type mds">MDS</span>
            <span className="daemon-count">{mds.length}</span>
          </div>
          <div className="daemon-nodes">
            {mds.map(m => (
              <div key={m.name} className={`daemon-node mds ${m.state}`} title={`${m.name} rank:${m.rank}`}>
                <span className="node-name">{m.name}</span>
                <span className="node-state">{m.state === 'active' ? 'A' : 'S'}</span>
                {m.state === 'active' && <div className="mds-glow" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// OSD Hexagonal Grid
function OSDGrid({ osds, onSelect }: { osds: CephOSD[]; onSelect: (osd: CephOSD) => void }) {
  const { t } = useTranslation();
  const osdsByHost = useMemo(() => {
    const grouped: Record<string, CephOSD[]> = {};
    osds.forEach(osd => {
      const host = osd.host || 'unknown';
      if (!grouped[host]) grouped[host] = [];
      grouped[host].push(osd);
    });
    // Natural sort for host names (e.g., host1, host2, host10 instead of host1, host10, host2)
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  }, [osds]);

  const upCount = osds.filter(o => o.status === 'up').length;

  return (
    <div className="panel-card osd-grid-panel">
      <div className="panel-card-head">
        <span className="panel-card-dot" />
        <span>{t('ceph.osd_array')}</span>
        <span className={`osd-status ${upCount === osds.length ? 'all-up' : ''}`}>
          {upCount}/{osds.length} UP
        </span>
      </div>

      <div className="panel-card-body osd-hosts">
        {(() => {
          let globalIndex = 0;
          return osdsByHost.map(([host, hostOsds]) => (
            <div key={host} className="osd-host-group">
              <div className="host-label">{host}</div>
              <div className="osd-hexgrid">
                {hostOsds.sort((a, b) => a.id - b.id).map(osd => {
                  const usagePercent = osd.total_bytes > 0 ? (osd.used_bytes / osd.total_bytes) * 100 : 0;
                  const color = osd.status !== 'up' ? '#ff0040' : getHealthColor(usagePercent) === 'danger' ? '#ff0040' : getHealthColor(usagePercent) === 'warning' ? '#ff6b00' : '#00ff88';
                  const delay = globalIndex * 30;
                  globalIndex++;

                  return (
                    <div
                      key={osd.id}
                      className={`osd-hex ${osd.status === 'up' ? 'up' : 'down'}`}
                      style={{ '--osd-color': color, animationDelay: `${delay}ms` } as React.CSSProperties}
                      onClick={() => onSelect(osd)}
                      title={`OSD.${osd.id} - ${formatPercent(usagePercent, 0)}`}
                    >
                      <span className="osd-id">{osd.id}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

// Shared wave-canvas engine — the same smoothed, glowing, animated chart
// for both the byte-rate and IOPS series (the first IOPS attempt was a
// static SVG polyline that only moved when a WS push landed; it looked
// dead next to this canvas).
function WaveCanvas({ read, write, fmt, height = 100, isPaused = false }: {
  read: number; write: number;
  fmt: (v: number) => string;
  height?: number; isPaused?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<{ read: number[]; write: number[]; targetRead: number; targetWrite: number; currentRead: number; currentWrite: number }>({
    read: [], write: [], targetRead: 0, targetWrite: 0, currentRead: 0, currentWrite: 0
  });
  const animRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const maxPoints = 100;

  const formatScaleLabel = fmt;

  useEffect(() => {
    // Set new targets for smooth interpolation
    dataRef.current.targetRead = read;
    dataRef.current.targetWrite = write;
  }, [read, write]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI support - set up once
    const dpr = window.devicePixelRatio || 1;
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width: rect.width, height: rect.height };
    };
    let { width, height } = setupCanvas();

    // Left margin for scale labels
    const scaleMargin = 42;
    const chartWidth = width - scaleMargin;

    let lastTime = 0;
    const dataInterval = 50; // Add data point every 50ms
    let timeSinceLastData = 0;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      timeSinceLastData += delta;

      // Smoothly interpolate current values towards target
      const smoothing = 0.1;
      dataRef.current.currentRead += (dataRef.current.targetRead - dataRef.current.currentRead) * smoothing;
      dataRef.current.currentWrite += (dataRef.current.targetWrite - dataRef.current.currentWrite) * smoothing;

      // Add new data points at regular intervals
      if (timeSinceLastData >= dataInterval) {
        timeSinceLastData = 0;
        dataRef.current.read.push(dataRef.current.currentRead);
        dataRef.current.write.push(dataRef.current.currentWrite);
        if (dataRef.current.read.length > maxPoints) dataRef.current.read.shift();
        if (dataRef.current.write.length > maxPoints) dataRef.current.write.shift();
      }

      // Animate flow offset
      offsetRef.current = (offsetRef.current + 0.5) % 20;

      ctx.clearRect(0, 0, width, height);

      // Calculate max value for scale
      const maxVal = Math.max(...dataRef.current.read, ...dataRef.current.write, 1);
      const padding = 8;
      const scaleSteps = 4;

      // Draw scale labels on the left
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let i = 0; i <= scaleSteps; i++) {
        const y = padding + (i / scaleSteps) * (height - padding * 2);
        const val = maxVal * (1 - i / scaleSteps);
        ctx.fillText(formatScaleLabel(val), scaleMargin - 4, y);
      }

      // Draw animated grid (shifted right by scaleMargin)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= scaleSteps; i++) {
        const y = padding + (i / scaleSteps) * (height - padding * 2);
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -offsetRef.current;
        ctx.moveTo(scaleMargin, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw smooth curves with gradient
      const drawWave = (data: number[], baseColor: string, glowColor: string) => {
        if (data.length < 2) return;

        const points = data.map((val, i) => ({
          x: scaleMargin + (i / (maxPoints - 1)) * chartWidth,
          y: height - padding - (val / maxVal) * (height - padding * 2)
        }));

        // Draw glow layer
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();

        // Draw main line
        ctx.globalAlpha = 1;
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = 2;
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw flowing particles along the line
        const particleCount = 3;
        for (let p = 0; p < particleCount; p++) {
          const progress = ((offsetRef.current / 20 + p / particleCount) % 1);
          const idx = Math.floor(progress * (points.length - 1));
          if (idx < points.length) {
            ctx.fillStyle = baseColor;
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(points[idx].x, points[idx].y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      };

      // Draw waves
      drawWave(dataRef.current.write, '#ff6b00', '#ff6b00');
      drawWave(dataRef.current.read, '#00ff88', '#00ff88');

      // Only continue animation if not paused
      if (!isPaused) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    // Always draw at least once, then continue animation if not paused
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused]);

  return <canvas ref={canvasRef} className="io-canvas" style={{ width: '100%', height: `${height}px` }} />;
}

function IOWavePanel({ readBps, writeBps, readOps, writeOps, osds, isPaused = false }: { readBps: number; writeBps: number; readOps: number; writeOps: number; osds?: CephOSD[]; isPaused?: boolean }) {
  const fmtBytesScale = (bytes: number): string => {
    if (bytes === 0) return '0';
    if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)}G`;
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)}M`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}K`;
    return `${bytes.toFixed(0)}`;
  };
  const fmtOpsScale = (v: number): string =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v.toFixed(0)}`;

  return (
    <div className="panel-card io-wave-panel">
      <div className="panel-card-head">
        <span className="panel-card-dot" />
        <span>I/O ACTIVITY</span>
      </div>
      <div className="panel-card-body">
        <WaveCanvas read={readBps} write={writeBps} fmt={fmtBytesScale} isPaused={isPaused} />
        <div className="io-stats">
          <div className="io-stat read">
            <span className="io-icon">▼</span>
            <span className="io-label">READ</span>
            <span className="io-value">{formatBytes(readBps)}/s</span>
            <span className="io-ops">{readOps.toFixed(0)} IOPS</span>
          </div>
          <div className="io-stat write">
            <span className="io-icon">▲</span>
            <span className="io-label">WRITE</span>
            <span className="io-value">{formatBytes(writeBps)}/s</span>
            <span className="io-ops">{writeOps.toFixed(0)} IOPS</span>
          </div>
        </div>

        {/* IOPS trend — fills the card's lower half (the column-stretch
            used to leave this space empty). */}
        <div className="io-section-label">IOPS</div>
        <WaveCanvas read={readOps} write={writeOps} fmt={fmtOpsScale} height={72} isPaused={isPaused} />

        {/* Cluster-wide OSD latency averages from the same snapshot. */}
        {(() => {
          const up = (osds || []).filter((o) => o.status === 'up');
          if (up.length === 0) return null;
          const avg = (pick: (o: CephOSD) => number) =>
            up.reduce((s, o) => s + (pick(o) || 0), 0) / up.length;
          const apply = avg((o) => o.apply_latency_ms || 0);
          const commit = avg((o) => o.commit_latency_ms || 0);
          return (
            <>
              <div className="io-section-label">AVG OSD LATENCY</div>
              <div className="io-stats">
                <div className="io-stat read">
                  <span className="io-label">APPLY</span>
                  <span className="io-value">{apply.toFixed(1)} ms</span>
                </div>
                <div className="io-stat write">
                  <span className="io-label">COMMIT</span>
                  <span className="io-value">{commit.toFixed(1)} ms</span>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}

// Pool Energy Bar - CSS transition handles smooth updates
function PoolEnergyBar({ pool, totalBytes }: { pool: CephPool; totalBytes: number }) {
  const percent = pool.total_bytes > 0 ? (pool.used_bytes / pool.total_bytes) * 100 : (pool.used_bytes / totalBytes) * 100;
  const color = percent >= 95 ? '#ff0040' : percent >= 80 ? '#ff6b00' : '#00ff88';

  return (
    <div className="pool-energy-bar visible">
      <div className="pool-info">
        <span className="pool-name">{pool.name}</span>
        <span className="pool-size">{formatBytes(pool.used_bytes)}</span>
      </div>
      <div className="energy-track">
        <div className="energy-fill" style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 10px ${color}` }} />
        <div className="energy-glow" style={{ width: `${percent}%`, background: color }} />
      </div>
      <span className="pool-percent" style={{ color }}>{percent.toFixed(1)}%</span>
    </div>
  );
}

// OSD Detail Popup
function OSDPopup({ osd, onClose }: { osd: CephOSD; onClose: () => void }) {
  const { t } = useTranslation();
  const usagePercent = osd.total_bytes > 0 ? (osd.used_bytes / osd.total_bytes) * 100 : 0;
  const color = getHealthColor(usagePercent);

  return (
    <div className="osd-popup-overlay" onClick={onClose}>
      <div className="osd-popup" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-title">
            <span className={`status-badge ${osd.status === 'up' ? 'up' : 'down'}`}>{osd.status.toUpperCase()}</span>
            <span className="osd-name">OSD.{osd.id}</span>
          </div>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>

        <div className="popup-content">
          <div className="info-row">
            <span className="info-label">Host</span>
            <span className="info-value">{osd.host || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">{t('ceph.in_cluster')}</span>
            <span className={`info-value ${osd.in_cluster ? 'text-success' : 'text-danger'}`}>
              {osd.in_cluster ? t('ceph.yes') : t('ceph.no')}
            </span>
          </div>

          <div className="storage-section">
            <div className="storage-bar">
              <div className={`storage-fill ${color}`} style={{ width: `${usagePercent}%` }} />
            </div>
            <div className="storage-stats">
              <span>{formatBytes(osd.used_bytes)} / {formatBytes(osd.total_bytes)}</span>
              <span className={`text-${color}`}>{formatPercent(usagePercent, 1)}</span>
            </div>
          </div>

          {osd.status === 'up' && (osd.apply_latency_ms || osd.commit_latency_ms) && (
            <div className="latency-section">
              <div className="latency-title">{t('ceph.latency')}</div>
              <div className="latency-grid">
                <div className="latency-item">
                  <span className="latency-label">{t('ceph.apply')}</span>
                  <span className="latency-value">{(osd.apply_latency_ms || 0).toFixed(1)} ms</span>
                </div>
                <div className="latency-item">
                  <span className="latency-label">{t('ceph.commit')}</span>
                  <span className="latency-value">{(osd.commit_latency_ms || 0).toFixed(1)} ms</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Storage Summary Panel
function StorageSummary({ ceph }: { ceph: CephMetrics }) {
  const { t } = useTranslation();
  const usedPercent = ceph.total_bytes > 0 ? (ceph.used_bytes / ceph.total_bytes) * 100 : 0;
  const availablePercent = 100 - usedPercent;

  return (
    <div className="panel-card storage-summary">
      <div className="panel-card-head">
        <span className="panel-card-dot" />
        <span>{t('ceph.cluster_storage')}</span>
      </div>
      <div className="panel-card-body">
      <div className="summary-stats">
        <div className="stat-block used">
          <span className="stat-value">{formatBytes(ceph.used_bytes)}</span>
          <span className="stat-label">{t('ceph.used')}</span>
        </div>
        <div className="stat-divider">/</div>
        <div className="stat-block total">
          <span className="stat-value">{formatBytes(ceph.total_bytes)}</span>
          <span className="stat-label">{t('ceph.total')}</span>
        </div>
      </div>
      <div className="summary-bar">
        <div className="bar-used" style={{ width: `${usedPercent}%` }} />
        <div className="bar-available" style={{ width: `${availablePercent}%` }} />
      </div>
      <div className="summary-legend">
        <span className="legend-item used"><span className="legend-dot" /> Used {formatPercent(usedPercent, 1)}</span>
        <span className="legend-item available"><span className="legend-dot" /> Available {formatPercent(availablePercent, 1)}</span>
      </div>
      </div>
    </div>
  );
}

// Compact Core for multi-cluster view
function CompactCore({ ceph }: { ceph: CephMetrics }) {
  const healthColor = ceph.health === 'HEALTH_OK' ? '#00ff88' : ceph.health === 'HEALTH_WARN' ? '#ff6b00' : '#ff0040';
  const storagePercent = ceph.total_bytes > 0 ? (ceph.used_bytes / ceph.total_bytes) * 100 : 0;
  const storageColor = storagePercent >= 95 ? '#ff0040' : storagePercent >= 80 ? '#ff6b00' : '#00ff88';

  return (
    <div className="compact-core">
      <svg viewBox="0 0 120 120" className="compact-core-svg">
        {/* Outer ring */}
        <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="1" />
        <circle cx="60" cy="60" r="55" fill="none" stroke={healthColor} strokeWidth="2" strokeDasharray="20 10" className="rotating-ring" style={{ filter: `drop-shadow(0 0 6px ${healthColor})` }} />
        {/* Storage ring */}
        <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(100, 100, 120, 0.2)" strokeWidth="6" />
        <circle cx="60" cy="60" r="45" fill="none" stroke={storageColor} strokeWidth="6" strokeDasharray={`${storagePercent * 2.83} 283`} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ filter: `drop-shadow(0 0 4px ${storageColor})`, transition: 'stroke-dasharray 0.5s ease' }} />
        {/* Inner core */}
        <circle cx="60" cy="60" r="32" fill="rgba(10, 20, 35, 0.9)" stroke={healthColor} strokeWidth="1.5" />
        {/* Text */}
        <text x="60" y="55" textAnchor="middle" fill={healthColor} className="compact-health-text">{ceph.health.replace('HEALTH_', '')}</text>
        <text x="60" y="72" textAnchor="middle" fill="var(--text-secondary)" className="compact-storage-text">{formatPercent(storagePercent, 0)}</text>
      </svg>
    </div>
  );
}

// Compact Daemons for multi-cluster view
function CompactDaemons({ mons, mgrs, mds }: { mons: CephMon[]; mgrs: CephMgr[]; mds: CephMds[] }) {
  return (
    <div className="compact-daemons">
      <div className="daemon-row">
        <span className="daemon-badge mon">MON</span>
        <div className="daemon-dots">
          {mons.map(m => (
            <span key={m.name} className={`daemon-dot mon ${m.state}`} title={`${m.name} - ${m.state}`} />
          ))}
        </div>
        <span className="daemon-count-small">{mons.length}</span>
      </div>
      <div className="daemon-row">
        <span className="daemon-badge mgr">MGR</span>
        <div className="daemon-dots">
          {mgrs.map(m => (
            <span key={m.name} className={`daemon-dot mgr ${m.active ? 'active' : 'standby'}`} title={`${m.name} - ${m.active ? 'Active' : 'Standby'}`} />
          ))}
        </div>
        <span className="daemon-count-small">{mgrs.length}</span>
      </div>
      {mds.length > 0 && (
        <div className="daemon-row">
          <span className="daemon-badge mds">MDS</span>
          <div className="daemon-dots">
            {mds.map(m => (
              <span key={m.name} className={`daemon-dot mds ${m.state}`} title={`${m.name} - ${m.state}`} />
            ))}
          </div>
          <span className="daemon-count-small">{mds.length}</span>
        </div>
      )}
    </div>
  );
}

// Compact Storage Summary
function CompactStorage({ ceph }: { ceph: CephMetrics }) {
  const { t } = useTranslation();
  const usedPercent = ceph.total_bytes > 0 ? (ceph.used_bytes / ceph.total_bytes) * 100 : 0;

  return (
    <div className="compact-storage">
      <div className="storage-row">
        <span className="storage-label">{t('ceph.used')}</span>
        <span className="storage-value"><AnimatedBytes value={ceph.used_bytes} /></span>
      </div>
      <div className="compact-bar">
        <div className="compact-bar-fill" style={{ width: `${usedPercent}%`, transition: 'width 0.8s ease-out' }} />
      </div>
      <div className="storage-row">
        <span className="storage-label">{t('ceph.total')}</span>
        <span className="storage-value"><AnimatedBytes value={ceph.total_bytes} /></span>
      </div>
    </div>
  );
}

// Compact OSD Grid
function CompactOSDGrid({ osds, onSelect }: { osds: CephOSD[]; onSelect: (osd: CephOSD) => void }) {
  const upCount = osds.filter(o => o.status === 'up').length;

  return (
    <div className="compact-osd-panel">
      <div className="compact-osd-header">
        <span className="compact-osd-title">OSD</span>
        <span className={`compact-osd-status ${upCount === osds.length ? 'all-up' : ''}`}>{upCount}/{osds.length}</span>
      </div>
      <div className="compact-osd-grid">
        {osds.sort((a, b) => a.id - b.id).map((osd, index) => {
          const usagePercent = osd.total_bytes > 0 ? (osd.used_bytes / osd.total_bytes) * 100 : 0;
          const color = osd.status !== 'up' ? '#ff0040' : usagePercent >= 95 ? '#ff0040' : usagePercent >= 80 ? '#ff6b00' : '#00ff88';

          return (
            <div
              key={osd.id}
              className={`compact-osd ${osd.status === 'up' ? 'up' : 'down'}`}
              style={{
                '--osd-color': color,
                animationDelay: `${index * 20}ms`
              } as React.CSSProperties}
              onClick={() => onSelect(osd)}
              title={`OSD.${osd.id}`}
            >
              {osd.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Compact I/O Stats
function CompactIO({ readBps, writeBps }: { readBps: number; writeBps: number }) {
  return (
    <div className="compact-io">
      <div className="io-row read">
        <span className="io-arrow">▼</span>
        <span className="io-label">R</span>
        <span className="io-val"><AnimatedBytes value={readBps} duration={500} />/s</span>
      </div>
      <div className="io-row write">
        <span className="io-arrow">▲</span>
        <span className="io-label">W</span>
        <span className="io-val"><AnimatedBytes value={writeBps} duration={500} />/s</span>
      </div>
    </div>
  );
}

// Compact Pools
function CompactPools({ pools, totalBytes }: { pools: CephPool[]; totalBytes: number }) {
  // Filter out hidden pools and metadata pools, and rename _data pools to filesystem name
  const visiblePools = pools
    .filter(p => !p.name.startsWith('.') && !p.name.endsWith('_metadata'))
    .map(p => ({
      ...p,
      name: p.name.endsWith('_data') ? p.name.replace(/_data$/, '') : p.name
    }));
  if (visiblePools.length === 0) return null;

  return (
    <div className="compact-pools">
      {visiblePools.slice(0, 6).map(pool => {
        const percent = pool.total_bytes > 0 ? (pool.used_bytes / pool.total_bytes) * 100 : (pool.used_bytes / totalBytes) * 100;
        const color = percent >= 95 ? '#ff0040' : percent >= 80 ? '#ff6b00' : '#00ff88';
        return (
          <div key={pool.name} className="compact-pool">
            <span className="pool-label">{pool.name.substring(0, 12)}</span>
            <div className="pool-mini-bar">
              <div className="pool-mini-fill" style={{ width: `${Math.min(percent, 100)}%`, background: color }} />
            </div>
            <span className="pool-pct" style={{ color }}>{formatPercent(percent, 0)}</span>
          </div>
        );
      })}
      {visiblePools.length > 6 && <span className="pool-more">+{visiblePools.length - 6} more</span>}
    </div>
  );
}

// Single Cluster Ceph View - Compact horizontal layout
/**
 * OsdLatencyScatter — apply latency (x) vs commit latency (y) for each OSD.
 * Helps spot outliers: a healthy fleet clusters near (0, 0); a slow OSD
 * shoots far on one or both axes. Hover for the per-OSD detail.
 */
function OsdLatencyScatter({ osds }: { osds: CephOSD[] }) {
  const { t } = useTranslation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ idx: number; x: number; y: number } | null>(null);
  const [tipPos, setTipPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  const points = osds
    .filter((o) => o.status === 'up')
    .map((o) => ({
      id: o.id,
      apply: o.apply_latency_ms || 0,
      commit: o.commit_latency_ms || 0,
      host: o.host || '',
    }));

  // The tooltip is portaled to <body> and position:fixed, so hover.x/y are
  // VIEWPORT (clientX/clientY) coords. After it renders, measure it and flip
  // / clamp against the viewport so it can never run off-screen near an edge.
  // Runs sync before paint so the user never sees the unclamped position.
  useLayoutEffect(() => {
    if (!hover || !tipRef.current) return;
    const tip = tipRef.current.getBoundingClientRect();
    const margin = 8;
    const vw = window.innerWidth, vh = window.innerHeight;
    let left = hover.x + 14;
    let top = hover.y + 14;
    if (left + tip.width > vw - margin) left = hover.x - tip.width - 14;
    if (top + tip.height > vh - margin) top = hover.y - tip.height - 14;
    left = Math.min(Math.max(margin, left), Math.max(margin, vw - tip.width - margin));
    top = Math.min(Math.max(margin, top), Math.max(margin, vh - tip.height - margin));
    if (left !== tipPos.left || top !== tipPos.top) setTipPos({ left, top });
  }, [hover]);

  // Group identical-coordinate points so a stacked cluster stays clickable
  // (typical: 15 OSDs all at apply=1, commit=1 — they'd render as one dot
  // with no way to inspect each).
  const groups = useMemo(() => {
    const m = new Map<string, typeof points>();
    for (const p of points) {
      const key = `${p.apply.toFixed(2)}|${p.commit.toFixed(2)}`;
      const arr = m.get(key) || [];
      arr.push(p);
      m.set(key, arr);
    }
    return Array.from(m.entries()).map(([key, list]) => ({
      key,
      // Stable React key built from the member OSD ids (NOT the coordinate),
      // so a group keeps its element identity across polls and the dot can
      // CSS-transition cx/cy to its new spot instead of remounting (jumping).
      idKey: list.map((p) => p.id).sort((a, b) => a - b).join('-'),
      apply: list[0].apply,
      commit: list[0].commit,
      members: list,
    }));
  }, [points]);

  const niceMax = (n: number): number => {
    if (n <= 1) return 1;
    if (n <= 2) return 2;
    if (n <= 4) return 4;
    if (n <= 6) return 6;
    if (n <= 10) return 10;
    if (n <= 20) return 20;
    if (n <= 50) return 50;
    if (n <= 100) return 100;
    return Math.ceil(n / 50) * 50;
  };
  const xMax = Math.max(1, niceMax(points.reduce((m, p) => Math.max(m, p.apply), 0) * 1.1));
  const yMax = Math.max(1, niceMax(points.reduce((m, p) => Math.max(m, p.commit), 0) * 1.1));

  const WARN = (v: number, max: number) => v >= max * 0.4;
  const CRIT = (v: number, max: number) => v >= max * 0.75;

  const W = 480, H = 220;
  const PAD = { l: 44, r: 14, t: 12, b: 32 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const xScale = (v: number) => PAD.l + (v / xMax) * innerW;
  const yScale = (v: number) => PAD.t + innerH - (v / yMax) * innerH;

  const xTicks = [0, xMax / 4, xMax / 2, (xMax * 3) / 4, xMax];
  const yTicks = [0, yMax / 4, yMax / 2, (yMax * 3) / 4, yMax];

  return (
    <div className="panel-card osd-lat-card" ref={wrapRef}>
      <div className="panel-card-head">
        <span className="panel-card-dot" />
        <span>{t('ceph.osd_latency_title')}</span>
        <span className="panel-card-meta">{points.length} OSD</span>
      </div>
      {points.length === 0 ? (
        <div className="osd-lat-empty">{t('ceph.osd_latency_empty')}</div>
      ) : (
        <div className="osd-lat-svg-wrap">
          <svg viewBox={`0 0 ${W} ${H}`} className="osd-lat-svg" preserveAspectRatio="xMidYMid meet"
               onMouseLeave={() => setHover(null)}>
            <defs>
              <pattern id="osd-lat-grid" width={innerW / 4} height={innerH / 4} patternUnits="userSpaceOnUse">
                <path d={`M ${innerW / 4} 0 L 0 0 0 ${innerH / 4}`} fill="none" stroke="rgba(0,240,255,0.08)" strokeWidth="1"/>
              </pattern>
              <radialGradient id="osd-dot-ok">
                <stop offset="0%" stopColor="#a8f5ff"/>
                <stop offset="60%" stopColor="#00f0ff"/>
                <stop offset="100%" stopColor="#0080a0"/>
              </radialGradient>
              <radialGradient id="osd-dot-warn">
                <stop offset="0%" stopColor="#ffd49a"/>
                <stop offset="60%" stopColor="#ff8a3c"/>
                <stop offset="100%" stopColor="#a04a00"/>
              </radialGradient>
              <radialGradient id="osd-dot-crit">
                <stop offset="0%" stopColor="#ffb0c0"/>
                <stop offset="60%" stopColor="#ff4d6d"/>
                <stop offset="100%" stopColor="#7a0020"/>
              </radialGradient>
            </defs>

            <rect x={PAD.l} y={PAD.t} width={innerW} height={innerH} fill="url(#osd-lat-grid)" />
            <line x1={PAD.l} y1={PAD.t + innerH} x2={PAD.l + innerW} y2={PAD.t + innerH} stroke="rgba(0,240,255,0.35)" />
            <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + innerH} stroke="rgba(0,240,255,0.35)" />

            {/* Diagonal "y=x" reference (apply ≈ commit is typical / healthy) */}
            <line x1={xScale(0)} y1={yScale(0)} x2={xScale(Math.min(xMax, yMax))} y2={yScale(Math.min(xMax, yMax))}
                  stroke="rgba(0,240,255,0.18)" strokeWidth="1" strokeDasharray="3 4" />

            {xTicks.map((v) => (
              <g key={`x${v}`}>
                <line x1={xScale(v)} y1={PAD.t + innerH} x2={xScale(v)} y2={PAD.t + innerH + 3} stroke="rgba(0,240,255,0.35)" />
                <text x={xScale(v)} y={PAD.t + innerH + 14} textAnchor="middle"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-muted)' }}>
                  {v.toFixed(v < 10 ? 1 : 0)}
                </text>
              </g>
            ))}
            <text x={PAD.l + innerW / 2} y={H - 4} textAnchor="middle"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-secondary)' }}>
              {t('ceph.apply_ms')}
            </text>
            {yTicks.map((v) => (
              <g key={`y${v}`}>
                <line x1={PAD.l - 3} y1={yScale(v)} x2={PAD.l} y2={yScale(v)} stroke="rgba(0,240,255,0.35)" />
                <text x={PAD.l - 6} y={yScale(v) + 3} textAnchor="end"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-muted)' }}>
                  {v.toFixed(v < 10 ? 1 : 0)}
                </text>
              </g>
            ))}
            <text x={12} y={PAD.t + innerH / 2} textAnchor="middle"
                  transform={`rotate(-90, 12, ${PAD.t + innerH / 2})`}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-secondary)' }}>
              {t('ceph.commit_ms')}
            </text>

            {/* Points — render groups (clusters of stacked OSDs sized by member count) */}
            {groups.map((g, idx) => {
              const crit = CRIT(g.apply, xMax) || CRIT(g.commit, yMax);
              const warn = !crit && (WARN(g.apply, xMax) || WARN(g.commit, yMax));
              const fill = crit ? 'url(#osd-dot-crit)' : warn ? 'url(#osd-dot-warn)' : 'url(#osd-dot-ok)';
              const stroke = crit ? '#ff4d6d' : warn ? '#ff8a3c' : '#00f0ff';
              const r = 5 + Math.min(8, Math.log2(g.members.length + 1) * 2);
              const cx = xScale(g.apply);
              const cy = yScale(g.commit);
              const hoveredHere = hover?.idx === idx;
              // Dots glide to new positions on data update (cx/cy CSS
              // transition) instead of snapping — paired with the stable
              // idKey so the element isn't remounted each poll.
              const move = 'cx .6s cubic-bezier(.4,0,.2,1), cy .6s cubic-bezier(.4,0,.2,1)';
              return (
                <g key={g.idKey}>
                  {hoveredHere && (
                    <circle cx={cx} cy={cy} r={r + 5}
                            fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.7"
                            style={{ pointerEvents: 'none', transition: move }}/>
                  )}
                  <circle cx={cx} cy={cy} r={r}
                          fill={fill} stroke={stroke} strokeWidth="1.4"
                          style={{ filter: 'drop-shadow(0 0 4px ' + stroke + ')', cursor: 'pointer', transition: move }}
                          onMouseEnter={(e) => {
                            setHover({ idx, x: e.clientX, y: e.clientY });
                            setTipPos({ left: e.clientX + 14, top: e.clientY + 14 });
                          }}
                          onMouseMove={(e) => {
                            setHover({ idx, x: e.clientX, y: e.clientY });
                          }} />
                  {g.members.length > 1 && (
                    <text x={cx} y={cy + 3.5} textAnchor="middle"
                          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: '#021018', fontWeight: 700, pointerEvents: 'none', transition: move }}>
                      {g.members.length}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          {hover && groups[hover.idx] && createPortal(
            <div className="osd-lat-tip osd-lat-tip--fixed" ref={tipRef}
                 style={{ left: tipPos.left, top: tipPos.top }}>
              <div className="osd-lat-tip-row">
                <span className="osd-lat-tip-key">apply</span>
                <span className="osd-lat-tip-val">{groups[hover.idx].apply.toFixed(2)} ms</span>
              </div>
              <div className="osd-lat-tip-row">
                <span className="osd-lat-tip-key">commit</span>
                <span className="osd-lat-tip-val">{groups[hover.idx].commit.toFixed(2)} ms</span>
              </div>
              <div className="osd-lat-tip-sep" />
              {groups[hover.idx].members.map((m) => (
                <div key={m.id} className="osd-lat-tip-row">
                  <span className="osd-lat-tip-osd">osd.{m.id}</span>
                  {m.host && <span className="osd-lat-tip-host">{m.host}</span>}
                </div>
              ))}
            </div>,
            document.body,
          )}
        </div>
      )}
    </div>
  );
}


function CephClusterView({ ceph, clusterName, onOSDSelect, compact = false, isPaused = false }: { ceph: CephMetrics; clusterName?: string; onOSDSelect: (osd: CephOSD) => void; compact?: boolean; isPaused?: boolean }) {
  const { t } = useTranslation();
  if (compact) {
    return (
      <div className="ceph-cluster-compact">
        <div className="compact-left">
          <CompactCore ceph={ceph} />
        </div>
        <div className="compact-middle">
          <CompactDaemons mons={ceph.mons || []} mgrs={ceph.mgrs || []} mds={ceph.mds || []} />
          <CompactStorage ceph={ceph} />
          <CompactIO readBps={ceph.read_bytes_sec} writeBps={ceph.write_bytes_sec} />
        </div>
        <div className="compact-right">
          <CompactOSDGrid osds={ceph.osds} onSelect={onOSDSelect} />
        </div>
        <div className="compact-pools-section">
          <CompactPools pools={ceph.pools} totalBytes={ceph.total_bytes} />
        </div>
      </div>
    );
  }

  // Full view for single cluster - filter out hidden pools and _metadata pools
  const allPools = ceph.pools.filter(p => !p.name.startsWith('.') && !p.name.endsWith('_metadata'));
  // CephFS: only show _data pools, and rename to filesystem name (remove _data suffix)
  const cephfsPools = allPools
    .filter(p => p.name.toLowerCase().includes('cephfs') && p.name.endsWith('_data'))
    .map(p => ({ ...p, name: p.name.replace(/_data$/, '') }));
  const regularPools = allPools.filter(p => !p.name.toLowerCase().includes('cephfs'));

  return (
    <>
      {/* Main Content - 3 column layout */}
      <div className="ceph-content-full">
        {/* Column 1 - Core */}
        <div className="col-core">
          <div className="panel-card core-card">
            <div className="panel-card-head">
              <span className="panel-card-dot" />
              <span>{t('ceph.health')}</span>
              <span className="panel-card-meta">{ceph.health.replace('HEALTH_', '')}</span>
            </div>
            <div className="panel-card-body core-card-body">
              <CephCore ceph={ceph} />
            </div>
          </div>
          <StorageSummary ceph={ceph} />
        </div>

        {/* Column 2 - Daemons + Pools */}
        <div className="col-daemons">
          <DaemonOrbital
            mons={ceph.mons || []}
            mgrs={ceph.mgrs || []}
            mds={ceph.mds || []}
          />
          {/* Pools under Daemons */}
          <div className="pools-inline">
            {regularPools.length > 0 && (
              <div className="panel-card pool-group-inline">
                <div className="panel-card-head">
                  <span className="panel-card-dot" />
                  <span>{t('ceph.ceph_pools')}</span>
                  <span className="panel-card-meta">{regularPools.length}</span>
                </div>
                <div className="panel-card-body pools-list">
                  {regularPools.map((pool, idx) => (
                    <PoolEnergyBar key={pool.name} pool={pool} totalBytes={ceph.total_bytes} />
                  ))}
                </div>
              </div>
            )}
            {cephfsPools.length > 0 && (
              <div className="panel-card pool-group-inline">
                <div className="panel-card-head">
                  <span className="panel-card-dot" />
                  <span>{t('ceph.cephfs_pools')}</span>
                  <span className="panel-card-meta">{cephfsPools.length}</span>
                </div>
                <div className="panel-card-body pools-list">
                  {cephfsPools.map((pool, idx) => (
                    <PoolEnergyBar key={pool.name} pool={pool} totalBytes={ceph.total_bytes} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Column 3 - I/O Activity */}
        <div className="col-osd">
          <IOWavePanel
            readBps={ceph.read_bytes_sec}
            writeBps={ceph.write_bytes_sec}
            readOps={ceph.read_ops_sec}
            writeOps={ceph.write_ops_sec}
            osds={ceph.osds}
            isPaused={isPaused}
          />
        </div>
      </div>

      {/* OSD array gets its own full-width row: a 100-OSD estate grows
          DOWN here without stretching the summary columns above into
          empty space (which is exactly what happened when it lived in
          column 3). Internal scroll caps extreme cases. */}
      <OSDGrid osds={ceph.osds} onSelect={onOSDSelect} />

      {/* Performance charts row — latency scatter (is one OSD dragging?)
          + usage distribution (is data balanced across OSDs?). */}
      <div className="ceph-charts">
        <OsdLatencyScatter osds={ceph.osds || []} />
        <OsdUsageBars osds={ceph.osds || []} />
      </div>
    </>
  );
}

// OSD usage distribution — one bar per OSD, sorted desc, coloured by the
// same 85/95 thresholds as the rest of the app. Bars are computed from
// innerW / count so the chart scales to hundreds of OSDs.
function OsdUsageBars({ osds }: { osds: CephOSD[] }) {
  const { t } = useTranslation();
  // Instant hover tip (the native <title> tooltip takes ~1 s to appear).
  const wrapRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  // hover.x/y are VIEWPORT (clientX/clientY) coords — the tip is portaled to
  // <body> and position:fixed, then clamped against the viewport below.
  const [hover, setHover] = useState<{ x: number; y: number; osd: CephOSD } | null>(null);
  const [tipPos, setTipPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  useLayoutEffect(() => {
    if (!hover || !tipRef.current) return;
    const tip = tipRef.current.getBoundingClientRect();
    const margin = 8;
    const vw = window.innerWidth, vh = window.innerHeight;
    let left = hover.x + 14;
    let top = hover.y + 14;
    if (left + tip.width > vw - margin) left = hover.x - tip.width - 14;
    if (top + tip.height > vh - margin) top = hover.y - tip.height - 14;
    left = Math.min(Math.max(margin, left), Math.max(margin, vw - tip.width - margin));
    top = Math.min(Math.max(margin, top), Math.max(margin, vh - tip.height - margin));
    if (left !== tipPos.left || top !== tipPos.top) setTipPos({ left, top });
  }, [hover]);
  const rows = [...(osds || [])].sort((a, b) => {
    const ua = a.total_bytes ? a.used_bytes / a.total_bytes : 0;
    const ub = b.total_bytes ? b.used_bytes / b.total_bytes : 0;
    return ub - ua;
  });
  // Same aspect ratio as the latency scatter (480×220) so the two chart
  // cards render at identical heights when side by side.
  const W = 720, H = 330;
  // Bottom pad only exists for per-OSD id labels, which are hidden on
  // big estates — reclaim it there instead of leaving a dead strip.
  const showIds = (osds || []).length <= 24;
  const PAD = { l: 42, r: 10, t: 12, b: showIds ? 26 : 10 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const bw = rows.length ? innerW / rows.length : innerW;
  const colorOf = (p: number) => p >= 95 ? '#ff4d6d' : p >= 85 ? '#FFB74D' : '#00E5FF';
  const pctOf = (o: CephOSD) => o.total_bytes ? (o.used_bytes / o.total_bytes) * 100 : 0;
  const avg = rows.length ? rows.reduce((s, o) => s + pctOf(o), 0) / rows.length : 0;
  const avgY = PAD.t + innerH - (avg / 100) * innerH;

  return (
    <div className="panel-card osd-usage-card">
      <div className="panel-card-head">
        <span className="panel-card-dot" />
        <span>{t('ceph.osd_usage_title')}</span>
        <span className="panel-card-meta">avg {avg.toFixed(1)}%</span>
      </div>
      <div className="panel-card-body osd-usage-wrap" ref={wrapRef}>
        {rows.length === 0 ? (
          <div className="osd-lat-empty">—</div>
        ) : (
          <svg viewBox={`0 0 ${W} ${H}`} className="osd-usage-svg" preserveAspectRatio="xMidYMid meet"
               onMouseLeave={() => setHover(null)}>
            {[0, 25, 50, 75, 100].map((v) => {
              const y = PAD.t + innerH - (v / 100) * innerH;
              return (
                <g key={v}>
                  <line x1={PAD.l} y1={y} x2={PAD.l + innerW} y2={y} stroke="rgba(0,240,255,0.1)" />
                  <text x={PAD.l - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#6b7c93">{v}%</text>
                </g>
              );
            })}
            <line x1={PAD.l} y1={avgY} x2={PAD.l + innerW} y2={avgY}
                  stroke="rgba(224,102,255,0.55)" strokeDasharray="4 3" />
            {rows.map((o, i) => {
              const p = pctOf(o);
              const h = Math.max(1, (p / 100) * innerH);
              return (
                <rect key={o.id}
                      x={PAD.l + i * bw + bw * 0.12}
                      y={PAD.t + innerH - h}
                      width={Math.max(1, bw * 0.76)}
                      height={h}
                      rx="1"
                      fill={colorOf(p)}
                      opacity={o.status === 'up' ? 0.85 : 0.3}
                      onMouseEnter={(e) => {
                        setHover({ x: e.clientX, y: e.clientY, osd: o });
                        setTipPos({ left: e.clientX + 14, top: e.clientY + 14 });
                      }}
                      onMouseMove={(e) => {
                        setHover({ x: e.clientX, y: e.clientY, osd: o });
                      }}
                />
              );
            })}
            {showIds && rows.map((o, i) => (
              <text key={o.id} x={PAD.l + i * bw + bw / 2} y={H - 9}
                    textAnchor="middle" fontSize="8" fill="#6b7c93">{o.id}</text>
            ))}
          </svg>
        )}
        {hover && createPortal(
          <div className="osd-lat-tip osd-lat-tip--fixed" ref={tipRef}
               style={{ left: tipPos.left, top: tipPos.top }}>
            <div className="osd-lat-tip-row">
              <span className="osd-lat-tip-osd">OSD.{hover.osd.id}</span>
              <span className="osd-lat-tip-host">{hover.osd.host || '?'}</span>
            </div>
            <div className="osd-lat-tip-sep" />
            <div className="osd-lat-tip-row">
              <span className="osd-lat-tip-key">{t('ceph.used')}</span>
              <span className="osd-lat-tip-val">
                {formatBytes(hover.osd.used_bytes)} / {formatBytes(hover.osd.total_bytes)}
              </span>
            </div>
            <div className="osd-lat-tip-row">
              <span className="osd-lat-tip-key">%</span>
              <span className="osd-lat-tip-val">{pctOf(hover.osd).toFixed(1)}%</span>
            </div>
            <div className="osd-lat-tip-row">
              <span className="osd-lat-tip-key">STATUS</span>
              <span className="osd-lat-tip-val">{hover.osd.status}</span>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </div>
  );
}

// Main Component
export function CephConstellation({ cluster, clusters, isPaused = false }: CephConstellationProps) {
  const { t } = useTranslation();
  const [selectedOSD, setSelectedOSD] = useState<CephOSD | null>(null);

  const isAllClusters = !cluster && clusters && Object.keys(clusters).length > 0;

  // Collect all clusters with Ceph
  const cephClusters = useMemo(() => {
    if (isAllClusters) {
      return Object.entries(clusters!)
        .filter(([_, c]) => c.ceph)
        .map(([id, c]) => ({ id, name: c.name || id, ceph: c.ceph! }));
    }
    if (cluster?.ceph) {
      return [{ id: cluster.id, name: cluster.name || cluster.id, ceph: cluster.ceph }];
    }
    return [];
  }, [cluster, clusters, isAllClusters]);

  if (!cluster && !isAllClusters) {
    return (
      <div className="ceph-constellation empty">
        <div className="empty-message">
          <span className="loading-spinner" />
          <span>{t('cluster.select')}</span>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  if (cephClusters.length === 0) {
    return (
      <div className="ceph-constellation empty">
        <div className="empty-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          <span>{t('ceph.no_cluster')}</span>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="ceph-constellation">
      <div className="grid-floor" />

      {/* Header */}
      <div className="ceph-header">
        <h1 className="ceph-title font-display">
          <svg className="title-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          </svg>
          {t('ceph.title')}
        </h1>
      </div>

      {/* Render all Ceph clusters stacked vertically */}
      <div className="ceph-clusters-stack">
        {cephClusters.map((c, idx) => {
          const healthColor = c.ceph.health === 'HEALTH_OK' ? 'success' : c.ceph.health === 'HEALTH_WARN' ? 'warning' : 'danger';
          return (
            <div key={c.id} className="ceph-cluster-section">
              {/* Cluster section header - show when multiple clusters */}
              {cephClusters.length > 1 && (
                <div className="cluster-section-header">
                  <span className={`section-health ${healthColor}`} />
                  <span className="section-name">{c.name}</span>
                  <span className="section-osd">{c.ceph.osd_up}/{c.ceph.osd_count} OSD</span>
                  <div className="section-line" />
                </div>
              )}
              <CephClusterView
                ceph={c.ceph}
                clusterName={cephClusters.length === 1 ? c.name : undefined}
                onOSDSelect={setSelectedOSD}
                compact={cephClusters.length > 1}
                isPaused={isPaused}
              />
            </div>
          );
        })}
      </div>

      {/* OSD Popup */}
      {selectedOSD && <OSDPopup osd={selectedOSD} onClose={() => setSelectedOSD(null)} />}

      <style>{styles}</style>
    </div>
  );
}

// Styles
const styles = `
  .ceph-constellation {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: var(--spacing-lg);
  }

  .ceph-constellation.empty {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    color: var(--text-secondary);
    font-family: var(--font-display);
  }

  /* Header */
  .ceph-header {
    margin-bottom: var(--spacing-lg);
  }

  .ceph-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: 22px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.12em;
  }

  .title-icon {
    stroke: var(--primary);
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.6));
    animation: iconSpin 20s linear infinite;
  }

  @keyframes iconSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Stacked Clusters Layout */
  .ceph-clusters-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .ceph-cluster-section {
    position: relative;
  }

  .cluster-section-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
  }

  .section-health {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .section-health.success {
    background: #00ff88;
    box-shadow: 0 0 12px #00ff88;
  }

  .section-health.warning {
    background: #ff6b00;
    box-shadow: 0 0 12px #ff6b00;
  }

  .section-health.danger {
    background: #ff0040;
    box-shadow: 0 0 12px #ff0040;
  }

  .section-name {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 600;
    color: var(--primary);
    letter-spacing: 0.1em;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
  }

  .section-osd {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
    padding: 4px 10px;
    background: rgba(20, 30, 45, 0.6);
    border: 1px solid rgba(100, 100, 120, 0.3);
    border-radius: 4px;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 240, 255, 0.4) 0%, rgba(0, 240, 255, 0) 100%);
  }

  /* Compact Cluster Layout */
  .ceph-cluster-compact {
    display: grid;
    grid-template-columns: 130px 1fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--spacing-md);
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.6) 0%, rgba(15, 25, 40, 0.4) 100%);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .compact-left {
    grid-row: span 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .compact-middle {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .compact-right {
    display: flex;
    flex-direction: column;
  }

  .compact-pools-section {
    grid-column: 2 / -1;
  }

  /* Compact Core */
  .compact-core {
    width: 120px;
    height: 120px;
  }

  .compact-core-svg {
    width: 100%;
    height: 100%;
  }

  .compact-health-text {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .compact-storage-text {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 600;
  }

  /* Compact Daemons */
  .compact-daemons {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .daemon-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .daemon-badge {
    font-family: var(--font-mono);
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 600;
    min-width: 32px;
    text-align: center;
  }

  .daemon-badge.mon { background: rgba(0, 240, 255, 0.15); color: #00f0ff; }
  .daemon-badge.mgr { background: rgba(255, 149, 0, 0.15); color: #ff9500; }
  .daemon-badge.mds { background: rgba(255, 170, 0, 0.15); color: #ffaa00; }

  .daemon-dots {
    display: flex;
    gap: 4px;
    flex: 1;
  }

  .daemon-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    cursor: default;
  }

  .daemon-dot.mon.leader { background: #00f0ff; box-shadow: 0 0 6px #00f0ff; }
  .daemon-dot.mon.peon { background: rgba(0, 240, 255, 0.4); }
  .daemon-dot.mgr.active { background: #ff9500; box-shadow: 0 0 6px #ff9500; }
  .daemon-dot.mgr.standby { background: rgba(255, 149, 0, 0.4); }
  .daemon-dot.mds.active { background: #ffaa00; box-shadow: 0 0 6px #ffaa00; }
  .daemon-dot.mds.standby { background: rgba(255, 170, 0, 0.4); }

  .daemon-count-small {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    min-width: 16px;
    text-align: right;
  }

  /* Compact Storage */
  .compact-storage {
    padding: var(--spacing-xs) 0;
  }

  .storage-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .storage-label {
    font-family: var(--font-display);
    font-size: 9px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  .storage-value {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-primary);
  }

  .compact-bar {
    height: 4px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 2px;
    margin: 4px 0;
    overflow: hidden;
  }

  .compact-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #00ff88, #00cc6a);
    border-radius: 2px;
    transition: width 0.5s ease;
  }

  /* Compact I/O */
  .compact-io {
    display: flex;
    gap: var(--spacing-md);
    padding-top: var(--spacing-xs);
    border-top: 1px solid rgba(100, 100, 120, 0.2);
  }

  .io-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .io-arrow {
    font-size: 10px;
  }

  .io-row.read .io-arrow { color: #00ff88; }
  .io-row.write .io-arrow { color: #ff6b00; }

  .io-label {
    font-family: var(--font-display);
    font-size: 9px;
    color: var(--text-muted);
  }

  .io-val {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-secondary);
  }

  /* Compact OSD Panel */
  .compact-osd-panel {
    flex: 1;
  }

  .compact-osd-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
  }

  .compact-osd-title {
    font-family: var(--font-display);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  .compact-osd-status {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 3px;
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
  }

  .compact-osd-status:not(.all-up) {
    background: rgba(255, 107, 0, 0.1);
    color: #ff6b00;
  }

  .compact-osd-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .compact-osd {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(20, 30, 45, 0.8);
    border: 1.5px solid var(--osd-color);
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 600;
    color: var(--osd-color);
    cursor: pointer;
    transition: all 0.2s ease;
    animation: compact-osd-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  }

  @keyframes compact-osd-pop {
    0% { opacity: 0; transform: scale(0); }
    100% { opacity: 1; transform: none; }
  }

  .compact-osd:hover {
    transform: scale(1.15);
    box-shadow: 0 0 10px var(--osd-color);
  }

  .compact-osd.down {
    opacity: 0.5;
  }

  /* Compact Pools */
  .compact-pools {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-xs);
    border-top: 1px solid rgba(100, 100, 120, 0.2);
  }

  .compact-pool {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    background: rgba(20, 30, 45, 0.5);
    border-radius: 4px;
    min-width: 120px;
  }

  .pool-label {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
    min-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pool-mini-bar {
    flex: 1;
    height: 4px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 2px;
    min-width: 40px;
  }

  .pool-mini-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .pool-pct {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    min-width: 30px;
    text-align: right;
  }

  .pool-more {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    padding: 4px 8px;
  }

  /* Content Layout - Full 3-column */
  /* Unified three-column layout. Column widths tuned so the core ring
     column reads as a sidebar and the two data columns share the rest;
     a single gap value keeps the vertical rhythm consistent with the
     in-column gaps. */
  .ceph-content-full {
    display: grid;
    grid-template-columns: 320px 1.15fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    /* Stretch + per-column filler panels (below) keep all three column
       bottoms on the same line instead of ragged heights. */
    align-items: stretch;
  }

  .col-core .storage-summary { flex: 1; }
  .col-daemons .pools-inline { flex: 1; }
  .pools-inline > .panel-card:last-child { flex: 1; }
  .col-osd .io-wave-panel { flex: 1; }

  /* Full-width OSD array row */
  .osd-grid-panel { margin-bottom: var(--spacing-md); }

  /* Core health ring card */
  .core-card-body {
    display: flex;
    justify-content: center;
  }

  /* Performance charts grid — scatter + usage bars side by side. */
  .ceph-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    /* start, not stretch: the svgs keep their natural aspect, so
       stretching the cards only manufactures dead space below them. */
    align-items: start;
  }
  @media (max-width: 1100px) {
    .ceph-charts { grid-template-columns: 1fr; }
  }
  .ceph-charts .osd-lat-card { margin-bottom: 0; }
  .osd-usage-svg { width: 100%; }

  /* OSD apply-vs-commit latency scatter — surface comes from panel-card. */
  .osd-lat-card {
    margin-bottom: var(--spacing-md);
  }
  .osd-lat-svg-wrap {
    position: relative;
    padding: 12px 16px 14px;
  }
  /* No max-height cap: both chart svgs share the same aspect ratio, so
     letting them scale purely by width keeps the two cards EXACTLY the
     same height (the old 260px cap silently shortened this one). */
  .osd-lat-svg {
    width: 100%;
  }
  .osd-lat-empty {
    padding: 24px 12px;
    text-align: center;
    font-family: var(--font-mono); font-size: 12px;
    color: var(--text-muted); font-style: italic;
  }
  .osd-lat-tip {
    position: absolute;
    pointer-events: none;
    z-index: 10;
    background: linear-gradient(180deg, rgba(8, 18, 30, 0.96), rgba(2, 8, 16, 0.96));
    border: 1px solid var(--primary);
    border-radius: 4px;
    padding: 8px 12px;
    min-width: 180px;
    box-shadow: 0 4px 16px rgba(0, 240, 255, 0.25);
    font-family: var(--font-mono); font-size: 12px;
    color: var(--text-primary);
    backdrop-filter: blur(4px);
  }
  /* Portaled to <body>: fixed to the viewport so it clears any card edge.
     Capped to the viewport height in case a stacked cluster lists many OSDs. */
  .osd-lat-tip--fixed {
    position: fixed;
    z-index: 4000;
    max-height: calc(100vh - 16px);
    overflow-y: auto;
  }
  .osd-lat-tip-row {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: 12px;
    line-height: 1.5;
  }
  .osd-lat-tip-key {
    color: var(--primary);
    font-family: var(--font-display); font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .osd-lat-tip-val {
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
  .osd-lat-tip-sep {
    height: 1px; margin: 6px 0;
    background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.35), transparent);
  }
  .osd-lat-tip-osd {
    color: var(--accent, #e066ff);
    font-weight: 600;
  }
  .osd-lat-tip-host {
    color: var(--text-muted); font-size: 11px;
  }

  @media (max-width: 1200px) {
    .ceph-content-full {
      grid-template-columns: 1fr 1fr;
    }
    .col-core {
      grid-column: span 2;
      display: flex;
      gap: var(--spacing-lg);
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .ceph-content-full {
      grid-template-columns: 1fr;
    }
    .col-core {
      grid-column: span 1;
      flex-direction: column;
      align-items: center;
    }
  }

  .col-core {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .col-daemons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .col-osd {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  /* Inline Pools in Column 2 */
  .pools-inline {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .pools-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pools-list .pool-energy-bar {
    padding: 6px 8px;
  }

  /* Legacy 2-column layout */
  .ceph-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  @media (max-width: 1200px) {
    .ceph-content {
      grid-template-columns: 1fr;
    }
  }

  /* Left Panel */
  .left-panel {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  /* Ceph Core */
  .ceph-core {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    opacity: 1;
    transform: scale(1);
  }

  .core-svg {
    width: 100%;
    height: 100%;
  }

  .scan-line {
    animation: scanRotate 4s linear infinite;
    transform-origin: 100px 100px;
  }

  @keyframes scanRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .data-particle {
    filter: drop-shadow(0 0 4px currentColor);
  }

  .storage-ring {
    filter: drop-shadow(0 0 6px currentColor);
  }

  .rotating-ring {
    animation: rotateRing 30s linear infinite;
    transform-origin: center;
  }

  @keyframes rotateRing {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .pulse-core {
    animation: pulseCore 2s ease-in-out infinite;
  }

  @keyframes pulseCore {
    0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
    50% { filter: drop-shadow(0 0 15px currentColor); }
  }

  .inner-dots {
    animation: rotateDots 15s linear infinite reverse;
  }

  @keyframes rotateDots {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .health-text {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .storage-text {
    font-family: var(--font-mono);
    font-size: 20px;
    font-weight: 600;
  }

  .pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid;
    opacity: 0;
    pointer-events: none;
  }

  .ring-1 {
    width: 180px;
    height: 180px;
    animation: pulseRing 3s ease-out infinite;
  }

  .ring-2 {
    width: 200px;
    height: 200px;
    animation: pulseRing 3s ease-out infinite 1.5s;
  }

  .ring-3 {
    width: 220px;
    height: 220px;
    animation: pulseRing 3s ease-out infinite 0.75s;
  }

  @keyframes pulseRing {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
  }

  /* Daemon Orbital */
  /* Growth bounds: with many daemons/pools/OSD hosts the cards scroll
     INTERNALLY instead of stretching the column — keeps the three
     column bottoms aligned no matter the cluster size. */
  .daemon-orbital {
    padding-bottom: 6px;
  }
  .daemon-orbital {
    max-height: 320px;
    overflow-y: auto;
  }
  .pool-group-inline .pools-list {
    max-height: 240px;
    overflow-y: auto;
  }
  .osd-grid-panel .osd-hosts {
    max-height: 480px;
    overflow-y: auto;
  }

  .daemon-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin: 10px 16px;
  }

  .daemon-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    min-width: 70px;
    flex-shrink: 0;
  }

  .daemon-type {
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 3px 10px;
    border-radius: 3px;
    font-weight: 600;
  }

  .daemon-type.mon { background: rgba(0, 240, 255, 0.15); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3); }
  .daemon-type.mgr { background: rgba(255, 149, 0, 0.15); color: #ff9500; border: 1px solid rgba(255, 149, 0, 0.3); }
  .daemon-type.mds { background: rgba(180, 120, 255, 0.15); color: #b478ff; border: 1px solid rgba(180, 120, 255, 0.3); }

  .daemon-count {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-muted);
  }

  .daemon-nodes {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex: 1;
  }

  .daemon-node {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 12px;
    background: rgba(20, 30, 45, 0.8);
    border: 1px solid rgba(100, 100, 120, 0.3);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 13px;
    cursor: default;
    transition: all 0.2s ease;
  }

  .daemon-node:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .daemon-node.mon.leader { border-color: #00f0ff; color: #00f0ff; }
  .daemon-node.mon.peon { border-color: rgba(0, 240, 255, 0.4); color: rgba(0, 240, 255, 0.7); }
  .daemon-node.mgr.active { border-color: #ff9500; color: #ff9500; }
  .daemon-node.mgr.standby { border-color: rgba(255, 149, 0, 0.4); color: rgba(255, 149, 0, 0.7); }
  .daemon-node.mds.active { border-color: #b478ff; color: #b478ff; }
  .daemon-node.mds.standby { border-color: rgba(180, 120, 255, 0.4); color: rgba(180, 120, 255, 0.7); }

  .node-state {
    font-size: 9px;
    opacity: 0.7;
  }

  .leader-glow, .active-glow, .mds-glow {
    position: absolute;
    inset: -2px;
    border-radius: 6px;
    opacity: 0.4;
    animation: glowPulse 2s ease-in-out infinite;
  }

  .leader-glow { box-shadow: 0 0 10px #00f0ff; }
  .active-glow { box-shadow: 0 0 10px #ff9500; }
  .mds-glow { box-shadow: 0 0 10px #b478ff; }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }

  .summary-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .stat-block {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 600;
  }

  .stat-block.used .stat-value { color: #00ff88; }
  .stat-block.total .stat-value { color: var(--text-primary); }

  .stat-label {
    font-family: var(--font-display);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  .stat-divider {
    font-size: 20px;
    color: var(--text-muted);
  }

  .summary-bar {
    display: flex;
    height: 8px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
  }

  .bar-used {
    background: linear-gradient(90deg, #00ff88, #00cc6a);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    transition: width 0.5s ease;
  }

  .bar-available {
    background: rgba(100, 100, 120, 0.3);
  }

  .summary-legend {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-secondary);
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  .legend-item.used .legend-dot { background: #00ff88; }
  .legend-item.available .legend-dot { background: rgba(100, 100, 120, 0.5); }

  /* Right Panel */
  .right-panel {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  /* OSD up-count chip rides in the panel-card head. */
  .panel-card-head .osd-status { margin-left: auto; }

  .osd-status {
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 3px 10px;
    border-radius: 4px;
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
    border: 1px solid rgba(0, 255, 136, 0.3);
  }

  .osd-status:not(.all-up) {
    background: rgba(255, 107, 0, 0.1);
    color: #ff6b00;
    border-color: rgba(255, 107, 0, 0.3);
  }

  /* Tight row rhythm — the old md gap + padding made each host row eat
     ~3 rows' worth of space on big estates. */
  .osd-hosts {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .osd-host-group {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: 3px 0;
    border-bottom: 1px solid rgba(0, 240, 255, 0.08);
  }

  .osd-host-group:last-child {
    border-bottom: none;
  }

  .host-label {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.08em;
    min-width: 95px;
    padding: 5px 10px;
    background: rgba(0, 240, 255, 0.06);
    border-left: 2px solid var(--primary);
    border-radius: 0 4px 4px 0;
  }

  .osd-hexgrid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .osd-hex {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(20, 30, 45, 0.8);
    border: 1px solid var(--osd-color);
    border-radius: 3px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    animation: osd-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  }

  @keyframes osd-pop-in {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  .osd-hex::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--osd-color);
    opacity: 0.1;
    border-radius: 2px;
  }

  .osd-hex:hover {
    transform: scale(1.15);
    box-shadow: 0 0 15px var(--osd-color);
  }

  .osd-hex.down {
    opacity: 0.5;
    animation: blinkDown 1s ease-in-out infinite;
  }

  @keyframes blinkDown {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }

  .osd-id {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--osd-color);
    position: relative;
    z-index: 1;
  }

  /* I/O Wave Panel — canonical panel-card surface. */
  .io-section-label {
    margin: 14px 0 6px;
    font-family: var(--font-display);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--text-secondary);
    border-top: 1px solid rgba(0, 240, 255, 0.1);
    padding-top: 10px;
  }
  .io-iops-svg {
    width: 100%;
    height: 64px;
    background: rgba(5, 10, 20, 0.5);
    border-radius: var(--radius-sm);
  }

  .io-canvas {
    width: 100%;
    height: 100px;
    border-radius: var(--radius-sm);
    background: rgba(5, 10, 20, 0.5);
    margin-bottom: var(--spacing-md);
  }

  .io-stats {
    display: flex;
    gap: var(--spacing-lg);
  }

  .io-stat {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm);
    background: rgba(20, 30, 45, 0.5);
    border-radius: var(--radius-sm);
  }

  .io-icon {
    font-size: 13px;
  }

  .io-stat.read .io-icon { color: #00ff88; }
  .io-stat.write .io-icon { color: #ff6b00; }

  .io-label {
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    min-width: 45px;
  }

  .io-value {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 600;
  }

  .io-stat.read .io-value { color: #00ff88; }
  .io-stat.write .io-value { color: #ff6b00; }

  .io-ops {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
    width: 100%;
    text-align: right;
  }

  /* Pools Section */
  .pools-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .pool-group {
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.8) 0%, rgba(15, 25, 40, 0.6) 100%);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .pool-group-title {
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
    margin-bottom: var(--spacing-md);
  }

  .pools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-sm);
  }

  .pool-energy-bar {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(20, 30, 45, 0.5);
    border-radius: var(--radius-sm);
    opacity: 1;
    transform: translateX(0);
  }

  .pool-info {
    min-width: 120px;
  }

  .pool-name {
    display: block;
    font-family: var(--font-mono);
    font-size: 16px !important;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pool-size {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-muted);
  }

  .energy-track {
    flex: 1;
    height: 8px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .energy-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .energy-glow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    opacity: 0.3;
    filter: blur(4px);
    transition: width 0.5s ease;
  }

  .pool-percent {
    min-width: 40px;
    text-align: right;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
  }

  /* OSD Popup */
  .osd-popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .osd-popup {
    background: linear-gradient(135deg, rgba(15, 25, 40, 0.98) 0%, rgba(10, 18, 30, 0.98) 100%);
    border: 1px solid rgba(0, 240, 255, 0.4);
    border-radius: var(--radius-md);
    min-width: 280px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 240, 255, 0.2);
    animation: popupIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes popupIn {
    from { transform: scale(0.9) translateY(20px); opacity: 0; }
    to { transform: none; opacity: 1; }
  }

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  }

  .popup-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .status-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 3px;
    font-weight: 600;
  }

  .status-badge.up { background: rgba(0, 255, 136, 0.15); color: #00ff88; }
  .status-badge.down { background: rgba(255, 0, 64, 0.15); color: #ff0040; }

  .osd-name {
    font-family: var(--font-display);
    font-size: 16px;
    color: var(--primary);
  }

  .popup-close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.2s ease;
  }

  .popup-close:hover { color: var(--text-primary); }

  .popup-content {
    padding: var(--spacing-md);
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid rgba(100, 100, 120, 0.1);
  }

  .info-label {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
  }

  .info-value {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-primary);
  }

  .storage-section {
    margin-top: var(--spacing-md);
  }

  .storage-bar {
    height: 8px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: var(--spacing-xs);
  }

  .storage-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .storage-fill.success { background: linear-gradient(90deg, #00ff88, #00cc6a); }
  .storage-fill.warning { background: linear-gradient(90deg, #ffaa00, #ff6b00); }
  .storage-fill.danger { background: linear-gradient(90deg, #ff4466, #ff0040); }

  .storage-stats {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-secondary);
  }

  .latency-section {
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(100, 100, 120, 0.2);
  }

  .latency-title {
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    margin-bottom: var(--spacing-xs);
  }

  .latency-grid {
    display: flex;
    gap: var(--spacing-md);
  }

  .latency-item {
    flex: 1;
    text-align: center;
  }

  .latency-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    margin-bottom: 2px;
  }

  .latency-value {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .text-success { color: #00ff88 !important; }
  .text-warning { color: #ff6b00 !important; }
  .text-danger { color: #ff0040 !important; }
`;
