/**
 * NodeRRDSparkline — real PVE-RRD historical sparkline for a node card.
 *
 * Replaces the synthetic ECGMonitor (which drew a heartbeat animation
 * from the instant value, not actual history). This component fetches
 * `/api/clusters/{cid}/nodes/{node}/rrddata?timeframe=X` and draws three
 * stacked SVG polylines for CPU / MEM / IOW.
 *
 * Per-(cid,node,timeframe) result cache keyed in a module-level Map so
 * a card that re-mounts (e.g. when the timeframe selector switches the
 * whole grid) doesn't immediately hammer pveproxy 8 times in a row.
 */
import { useEffect, useMemo, useState } from 'react';

// 'live' is not an RRD window — it drives the real-time ECGMonitor instead of
// this sparkline (see NodeCard). The RRD timeframes are the historical windows.
export type Timeframe = 'live' | 'hour' | 'day' | 'week' | 'month' | 'year';

interface Sample {
  time: number;
  cpu?: number;        // 0..1 fraction
  maxcpu?: number;
  memused?: number;    // bytes
  memtotal?: number;   // bytes
  // IO wait — PVE exposes either `iowait` or aggregated %; we look at both.
  iowait?: number;
  // Some PVE versions name it differently. Defensive.
  [k: string]: any;
}

interface Props {
  clusterId: string;
  node: string;
  timeframe: Timeframe;
  isOnline: boolean;
  isPaused?: boolean;
  /** Current instant values shown if RRD fetch fails or while loading,
   *  so the card never goes empty. */
  fallback?: { cpu: number; memory: number; diskIO: number };
}

// (cid|node|tf) → { samples, fetchedAt }
const _cache = new Map<string, { samples: Sample[]; ts: number }>();
const CACHE_TTL_MS = 60_000;
// Per-timeframe refresh cadence in ms. The PVE RRD endpoint itself
// has fixed buckets so polling faster than the bucket size is wasted.
const REFRESH_MS: Record<Timeframe, number> = {
  live:  60_000,        // unused — 'live' renders ECGMonitor, never this component
  hour:  60_000,        // 1 min ticks → refresh every minute
  day:   300_000,       // 5 min ticks → 5 min
  week:  600_000,       // 30 min ticks → 10 min (don't need to be exact)
  month: 1_800_000,     // hourly ticks → 30 min
  year:  3_600_000,     // daily ticks → 1 hour
};


export function NodeRRDSparkline({
  clusterId, node, timeframe, isOnline, fallback,
}: Props) {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  // Fetch + cache. Re-runs whenever timeframe / node identity changes.
  useEffect(() => {
    if (!clusterId || !node || !isOnline) {
      setSamples([]);
      return;
    }
    const key = `${clusterId}|${node}|${timeframe}`;
    const now = Date.now();
    const cached = _cache.get(key);
    if (cached && (now - cached.ts) < CACHE_TTL_MS) {
      setSamples(cached.samples);
    }
    let alive = true;
    const doFetch = async () => {
      setLoading(true); setErrored(false);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/rrddata?timeframe=${timeframe}`,
          { credentials: 'same-origin' },
        );
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (!alive) return;
        const arr: Sample[] = (data.samples || data.data || []).filter(
          (s: any) => s && (s.time || s.timestamp),
        );
        _cache.set(key, { samples: arr, ts: Date.now() });
        setSamples(arr);
      } catch {
        if (alive) setErrored(true);
      } finally {
        if (alive) setLoading(false);
      }
    };
    doFetch();
    const iv = window.setInterval(doFetch, REFRESH_MS[timeframe]);
    return () => { alive = false; window.clearInterval(iv); };
  }, [clusterId, node, timeframe, isOnline]);

  // Compute series. PVE returns cpu as 0..1; mem as bytes; iowait as %.
  const series = useMemo(() => {
    if (samples.length === 0) {
      return { cpu: [] as number[], mem: [] as number[], iow: [] as number[] };
    }
    const cpu: number[] = [];
    const mem: number[] = [];
    const iow: number[] = [];
    for (const s of samples) {
      const c = typeof s.cpu === 'number' ? s.cpu * 100 : NaN;
      const used = typeof s.memused === 'number' ? s.memused : NaN;
      const total = typeof s.memtotal === 'number' && s.memtotal > 0 ? s.memtotal : NaN;
      const m = (Number.isFinite(used) && Number.isFinite(total))
        ? (used / total) * 100 : NaN;
      // iowait may already be a percentage 0..100 OR fraction 0..1
      const rawIo = typeof s.iowait === 'number' ? s.iowait : NaN;
      const io = !Number.isFinite(rawIo) ? NaN
              : (rawIo <= 1 ? rawIo * 100 : rawIo);
      cpu.push(Number.isFinite(c) ? c : NaN);
      mem.push(Number.isFinite(m) ? m : NaN);
      iow.push(Number.isFinite(io) ? io : NaN);
    }
    return { cpu, mem, iow };
  }, [samples]);

  const hasData = samples.length >= 2;

  return (
    <div className={`nrrd-stack ${!isOnline ? 'offline' : ''}`}>
      <Trace label="CPU" data={series.cpu} color="#00f0ff"
             instant={fallback?.cpu} hasData={hasData}
             loading={loading} errored={errored} />
      <Trace label="MEM" data={series.mem} color="#00ff88"
             instant={fallback?.memory} hasData={hasData}
             loading={loading} errored={errored} />
      <Trace label="IOW" data={series.iow} color="#ffd700"
             instant={fallback?.diskIO} hasData={hasData}
             loading={loading} errored={errored} />
      <style>{styleBlock}</style>
    </div>
  );
}


function Trace({
  label, data, color, instant, hasData, loading, errored,
}: {
  label: string;
  data: number[];
  color: string;
  instant?: number;
  hasData: boolean;
  loading: boolean;
  errored: boolean;
}) {
  // Skip leading/trailing NaN runs but preserve middle gaps.
  const finite = data.filter((n) => Number.isFinite(n));
  const max = finite.length > 0 ? Math.max(100, Math.max(...finite) * 1.05) : 100;
  const min = 0;
  const W = 200; const H = 32;
  const padL = 4, padR = 4, padT = 3, padB = 3;
  const iw = W - padL - padR;
  const ih = H - padT - padB;

  const path = useMemo(() => {
    if (!hasData) return '';
    const n = data.length;
    if (n < 2) return '';
    let d = '';
    let pen = false;
    for (let i = 0; i < n; i++) {
      const v = data[i];
      if (!Number.isFinite(v)) { pen = false; continue; }
      const x = padL + (i / (n - 1)) * iw;
      const y = padT + (1 - (v - min) / (max - min)) * ih;
      d += (pen ? ' L ' : ' M ') + x.toFixed(1) + ',' + y.toFixed(1);
      pen = true;
    }
    return d;
  }, [data, hasData, max]);

  const fillPath = useMemo(() => {
    if (!path) return '';
    const n = data.length;
    return `${path} L ${(padL + iw).toFixed(1)},${(padT + ih).toFixed(1)} L ${padL},${(padT + ih).toFixed(1)} Z`;
    // first/last x for area close — using viewport extents is fine since
    // the line already goes left-to-right.
    void n;
  }, [path, ih, iw]);

  // Display the value at the right edge (most recent sample, or instant
  // fallback if no RRD data).
  const latestRrd = (() => {
    for (let i = data.length - 1; i >= 0; i--) {
      if (Number.isFinite(data[i])) return data[i];
    }
    return undefined;
  })();
  const displayVal = (latestRrd !== undefined) ? latestRrd : instant;

  return (
    <div className="nrrd-trace">
      <span className="nrrd-label" style={{ color }}>{label}</span>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
           className="nrrd-svg">
        {hasData && fillPath && (
          <path d={fillPath} fill={color} opacity="0.12" />
        )}
        {hasData && path && (
          <path d={path} fill="none" stroke={color} strokeWidth="1.4"
                style={{ filter: `drop-shadow(0 0 2px ${color})` }} />
        )}
        {!hasData && !loading && !errored && (
          <text x={W / 2} y={H / 2 + 4} textAnchor="middle"
                fontSize="9" fill="rgba(160,180,200,.5)"
                fontFamily="Share Tech Mono, monospace">
            no data
          </text>
        )}
        {loading && !hasData && (
          <text x={W / 2} y={H / 2 + 4} textAnchor="middle"
                fontSize="9" fill="rgba(160,180,200,.5)"
                fontFamily="Share Tech Mono, monospace">
            loading…
          </text>
        )}
        {errored && (
          <text x={W / 2} y={H / 2 + 4} textAnchor="middle"
                fontSize="9" fill="#ff6b80"
                fontFamily="Share Tech Mono, monospace">
            rrd err
          </text>
        )}
      </svg>
      <span className="nrrd-val" style={{ color }}>
        {displayVal !== undefined && Number.isFinite(displayVal)
          ? `${displayVal.toFixed(0)}%`
          : '—'}
      </span>
    </div>
  );
}


const styleBlock = `
.nrrd-stack {
  display: flex; flex-direction: column;
  gap: 2px;
  background: rgba(5, 10, 20, 0.9);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 4px;
  padding: 4px 6px;
  position: relative;
}
.nrrd-stack.offline { opacity: 0.5; }
.nrrd-stack::before {
  content: '';
  position: absolute; inset: 0;
  background:
    linear-gradient(0deg, transparent 50%, rgba(0,240,255,0.03) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  border-radius: inherit;
}
.nrrd-trace {
  display: grid;
  grid-template-columns: 28px 1fr 38px;
  gap: 6px;
  align-items: center;
  position: relative;
  z-index: 1;
}
.nrrd-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.05em;
  text-shadow: 0 0 4px currentColor;
}
.nrrd-svg {
  width: 100%; height: 32px;
  background: rgba(0, 5, 15, 0.6);
  border-radius: 2px;
}
.nrrd-val {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 4px currentColor;
}
`;
