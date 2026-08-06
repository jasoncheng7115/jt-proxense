/**
 * RRDChartModal — historical performance charts (CPU / memory / network /
 * disk IO) for a VM, CT, or node, drawn as inline SVG against the PVE
 * RRD ring data. Supports hour/day/week/month/year timeframes.
 *
 * Why inline SVG instead of a chart library: the SPA bundle is already
 * 900 KB; a chart lib (recharts ~150 KB, chart.js ~80 KB) blows past
 * the 500 KB warning. The data shape is simple enough — fixed-step time
 * series, 4 lines, ~60-200 points — that hand-rolling stays under 200 LOC
 * and matches the cyberpunk theme exactly.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../i18n';

type Kind = 'qemu' | 'lxc' | 'node' | 'storage';
type Timeframe = 'hour' | 'day' | 'week' | 'month' | 'year';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
  // For VM/CT charts. Omit for a node chart.
  vmid?: number;
  // For storage charts.
  storage?: string;
  kind: Kind;
  // Display label only — not sent to the API.
  title?: string;
}

interface Sample {
  time: number;
  cpu?: number;
  maxcpu?: number;
  mem?: number;
  maxmem?: number;
  netin?: number;
  netout?: number;
  diskread?: number;
  diskwrite?: number;
  // Storage-only fields.
  used?: number;
  total?: number;
}

const TIMEFRAMES: Timeframe[] = ['hour', 'day', 'week', 'month', 'year'];

const fmtBytes = (b: number) => {
  if (!isFinite(b) || b === 0) return '0';
  const u = ['B', 'K', 'M', 'G', 'T'];
  let i = 0; let v = b;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v >= 10 ? 0 : 1)}${u[i]}`;
};
const fmtBps = (b: number) => fmtBytes(b) + '/s';
const fmtPct = (p: number) => `${(p * 100).toFixed(0)}%`;

export function RRDChartModal({ open, onClose, clusterId, node, vmid, storage, kind, title }: Props) {
  const { t, language } = useTranslation();
  const [tf, setTf] = useState<Timeframe>('hour');
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const n = encodeURIComponent(node);
        const path = kind === 'node'
          ? `/api/clusters/${cid}/nodes/${n}/rrddata`
          : kind === 'qemu'
            ? `/api/clusters/${cid}/nodes/${n}/qemu/${vmid}/rrddata`
            : kind === 'lxc'
              ? `/api/clusters/${cid}/nodes/${n}/lxc/${vmid}/rrddata`
              : `/api/clusters/${cid}/nodes/${n}/storage/${encodeURIComponent(storage || '')}/rrddata`;
        const r = await fetch(`${path}?timeframe=${tf}`, { credentials: 'same-origin' });
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (!alive) return;
        setSamples((data.samples || []).filter((s: any) => s && s.time));
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, node, vmid, storage, kind, tf]);

  if (!open) return null;

  return (
    <div className="rrd-back" onClick={onClose}>
      <div className="rrd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rrd-head">
          <div className="rrd-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 17 9 11 13 15 21 7" />
              <polyline points="14 7 21 7 21 14" />
            </svg>
            <span>{t('rrd.title')}</span>
            {title && <span className="rrd-target">{title}</span>}
          </div>
          <div className="rrd-tfs">
            {TIMEFRAMES.map((x) => (
              <button
                key={x}
                className={`rrd-tf ${x === tf ? 'on' : ''}`}
                onClick={() => setTf(x)}
              >{t(`rrd.tf.${x}`)}</button>
            ))}
            <button className="rrd-close" onClick={onClose} aria-label="close">×</button>
          </div>
        </div>
        <div className="rrd-body">
          {error && <div className="rrd-error">{error}</div>}
          {loading && samples.length === 0 && (
            <div className="rrd-loading">{t('rrd.loading')}</div>
          )}
          {!loading && samples.length === 0 && !error && (
            <div className="rrd-loading">{t('rrd.empty')}</div>
          )}
          {/* key={tf} re-mounts the cards on timeframe change so the
              fade-in animation re-fires — gives a non-jarring transition
              instead of a snap-replace. */}
          {samples.length > 0 && kind === 'storage' && (
            <div className="rrd-grid" key={tf}>
              <ChartCard
                title={t('rrd.chart.usage_pct')}
                samples={samples}
                color="#00f0ff"
                series={[
                  {
                    key: 'pct', label: 'Used %',
                    fmt: (v: number) => `${(v * 100).toFixed(0)}%`,
                    scale: (s: Sample) => {
                      const u = s.used ?? null;
                      const t = s.total ?? null;
                      if (u == null || t == null || t === 0) return null;
                      return u / t;
                    },
                  },
                ]}
                yMax={1.0}
                yFmt={(v: number) => `${(v * 100).toFixed(0)}%`}
              />
              <ChartCard
                title={t('rrd.chart.usage_bytes')}
                samples={samples}
                color="#bf00ff"
                series={[
                  { key: 'used',  label: 'Used',  fmt: fmtBytes, scale: (s: Sample) => s.used ?? null,  color: '#00f0ff' },
                  { key: 'total', label: 'Total', fmt: fmtBytes, scale: (s: Sample) => s.total ?? null, color: '#bf00ff' },
                ]}
                yFmt={fmtBytes}
              />
            </div>
          )}
          {samples.length > 0 && kind !== 'storage' && (
            <div className="rrd-grid" key={tf}>
              <ChartCard
                title={t('rrd.chart.cpu')}
                samples={samples}
                color="#00f0ff"
                series={[
                  { key: 'cpu', label: 'CPU', fmt: fmtPct, scale: (s: Sample) => s.cpu ?? null },
                ]}
                yMax={1.0}
                yFmt={fmtPct}
              />
              <ChartCard
                title={t('rrd.chart.mem')}
                samples={samples}
                color="#00ff88"
                series={[
                  {
                    key: 'mem', label: 'Mem',
                    fmt: (b: number) => fmtBytes(b),
                    scale: (s: Sample) => s.mem ?? null,
                  },
                ]}
                yFmt={fmtBytes}
                fillTop={(s) => s.maxmem}
              />
              <ChartCard
                title={t('rrd.chart.net')}
                samples={samples}
                color="#ff8a3c"
                series={[
                  { key: 'netin',  label: 'In',  fmt: fmtBps, scale: (s: Sample) => s.netin ?? null,  color: '#ff8a3c' },
                  { key: 'netout', label: 'Out', fmt: fmtBps, scale: (s: Sample) => s.netout ?? null, color: '#bf00ff' },
                ]}
                yFmt={fmtBps}
              />
              <ChartCard
                title={t('rrd.chart.disk')}
                samples={samples}
                color="#bf00ff"
                series={[
                  { key: 'diskread',  label: 'Read',  fmt: fmtBps, scale: (s: Sample) => s.diskread ?? null,  color: '#00f0ff' },
                  { key: 'diskwrite', label: 'Write', fmt: fmtBps, scale: (s: Sample) => s.diskwrite ?? null, color: '#bf00ff' },
                ]}
                yFmt={fmtBps}
              />
            </div>
          )}
        </div>
        <style>{`
          .rrd-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; justify-content: center; align-items: center; z-index: 10000; }
          .rrd-modal { width: min(1000px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: rrd-in .18s ease-out; overflow: hidden; }
          @keyframes rrd-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .rrd-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .rrd-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .rrd-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .rrd-tfs { display: flex; gap: 4px; align-items: center; }
          .rrd-tf { padding: 4px 12px; border: 1px solid rgba(0,240,255,.2); background: rgba(0,240,255,.04); color: var(--text-secondary); font-family: var(--font-display); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .rrd-tf:hover { color: var(--primary); border-color: rgba(0,240,255,.4); }
          .rrd-tf.on { color: var(--primary); border-color: var(--primary); background: rgba(0,240,255,.12); }
          .rrd-close { margin-left: 8px; background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .rrd-close:hover { color: var(--primary); }
          .rrd-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .rrd-grid { display: grid; gap: 14px; grid-template-columns: 1fr 1fr; }
          .rrd-loading, .rrd-error { padding: 40px 12px; text-align: center; font-family: var(--font-mono); font-size: 13px; }
          .rrd-loading { color: var(--text-muted); font-style: italic; }
          .rrd-error { color: var(--danger, #ff4d6d); }
          @media (max-width: 700px) { .rrd-grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </div>
  );
}

interface Series {
  key: string;
  label: string;
  fmt: (n: number) => string;
  scale: (s: Sample) => number | null;
  color?: string;
}

interface ChartProps {
  title: string;
  samples: Sample[];
  color: string;
  series: Series[];
  yMax?: number;
  yFmt: (n: number) => string;
  fillTop?: (s: Sample) => number | undefined;
}

function ChartCard({ title, samples, series, yMax, yFmt, fillTop }: ChartProps) {
  const { width, height } = { width: 460, height: 160 };
  const padL = 48, padR = 8, padT = 10, padB = 22;

  const yTop = useMemo(() => {
    if (typeof yMax === 'number') return yMax;
    let max = 1;
    for (const s of samples) {
      const ft = fillTop?.(s);
      if (ft && ft > max) max = ft;
      for (const ser of series) {
        const v = ser.scale(s);
        if (v !== null && v !== undefined && v > max) max = v;
      }
    }
    return max * 1.1;
  }, [samples, series, fillTop, yMax]);

  const t0 = samples[0]?.time || 0;
  const t1 = samples[samples.length - 1]?.time || t0 + 1;
  const span = Math.max(1, t1 - t0);

  const X = (t: number) => padL + ((t - t0) / span) * (width - padL - padR);
  const Y = (v: number) => padT + (1 - v / yTop) * (height - padT - padB);

  const buildPath = (ser: Series) => {
    let d = '';
    let pen = false;
    for (const s of samples) {
      const v = ser.scale(s);
      if (v === null || v === undefined || !isFinite(v)) { pen = false; continue; }
      const px = X(s.time), py = Y(v);
      d += (pen ? ' L ' : ' M ') + px.toFixed(1) + ',' + py.toFixed(1);
      pen = true;
    }
    return d;
  };

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => yTop * (1 - p));

  // ─── Hover tracking ────────────────────────────────────────────────
  // Track mouse x in viewBox coordinates → nearest sample index. We map
  // client X to viewBox units via the SVG's bounding rect because the
  // SVG scales responsively (viewBox stretches to the card's width).
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || samples.length === 0) return;
    const rect = svg.getBoundingClientRect();
    const xLocal = e.clientX - rect.left;
    const xViewbox = (xLocal / rect.width) * width;
    if (xViewbox < padL || xViewbox > width - padR) { setHoverIdx(null); return; }
    // binary search the closest sample by time
    const t = t0 + ((xViewbox - padL) / (width - padL - padR)) * span;
    let lo = 0, hi = samples.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].time < t) lo = mid + 1; else hi = mid;
    }
    if (lo > 0 && Math.abs(samples[lo - 1].time - t) < Math.abs(samples[lo].time - t)) lo--;
    setHoverIdx(lo);
  };
  const onLeave = () => setHoverIdx(null);

  const hovered = hoverIdx == null ? null : samples[hoverIdx];
  const hoveredX = hovered ? X(hovered.time) : 0;
  const fmtTime = (sec: number) => {
    const d = new Date(sec * 1000);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getMonth() + 1}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  // Tooltip placement — pin opposite side when hover is past midline so
  // the tip never falls off the right edge.
  const tipRight = hovered ? hoveredX > width / 2 : false;

  return (
    <div className="rrd-card">
      <div className="rrd-card-head">
        <div className="rrd-card-title">{title}</div>
        <div className="rrd-card-legend">
          {series.map((ser) => (
            <span key={ser.key}>
              <span className="dot" style={{ background: ser.color || '#00f0ff' }} />
              {ser.label}
            </span>
          ))}
        </div>
      </div>
      <div className="rrd-svg-wrap">
        <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="rrd-svg"
             onMouseMove={onMove} onMouseLeave={onLeave}>
          {ticks.map((v, i) => {
            const y = padT + (i / 4) * (height - padT - padB);
            return (
              <g key={i}>
                <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(0,240,255,.08)" />
                <text x={padL - 4} y={y + 3} textAnchor="end" fontSize="9"
                      fill="rgba(160,180,200,.6)" fontFamily="Share Tech Mono, monospace">
                  {yFmt(v)}
                </text>
              </g>
            );
          })}
          {series.map((ser) => (
            <path
              key={ser.key}
              d={buildPath(ser)}
              fill="none"
              stroke={ser.color || '#00f0ff'}
              strokeWidth="1.3"
              opacity="0.95"
            />
          ))}
          {/* Hover crosshair + dot per series */}
          {hovered && (
            <g pointerEvents="none">
              <line x1={hoveredX} y1={padT} x2={hoveredX} y2={height - padB}
                    stroke="rgba(0, 240, 255, 0.45)" strokeWidth="1" strokeDasharray="3 3" />
              {series.map((ser) => {
                const v = ser.scale(hovered);
                if (v == null || !isFinite(v)) return null;
                return (
                  <circle key={ser.key} cx={hoveredX} cy={Y(v)} r="3.5"
                          fill={ser.color || '#00f0ff'}
                          stroke="#021018" strokeWidth="1.5"
                          style={{ filter: `drop-shadow(0 0 4px ${ser.color || '#00f0ff'})` }} />
                );
              })}
            </g>
          )}
        </svg>
        {hovered && (
          <div className="rrd-tip" style={tipRight
            ? { right: `${100 - (hoveredX / width) * 100 + 1.5}%` }
            : { left:  `${(hoveredX / width) * 100 + 1.5}%` }}>
            <div className="rrd-tip-time">{fmtTime(hovered.time)}</div>
            {series.map((ser) => {
              const v = ser.scale(hovered);
              if (v == null || !isFinite(v)) return null;
              return (
                <div key={ser.key} className="rrd-tip-row">
                  <span className="rrd-tip-dot" style={{ background: ser.color || '#00f0ff' }} />
                  <span className="rrd-tip-key">{ser.label}</span>
                  <span className="rrd-tip-val">{ser.fmt(v)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <style>{`
        .rrd-card {
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.15);
          border-radius: 4px;
          padding: 10px 12px;
          animation: rrd-card-fade 0.32s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes rrd-card-fade {
          from { opacity: 0; transform: translateY(6px) scale(0.985); }
          to   { opacity: 1; transform: none; }
        }
        .rrd-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .rrd-card-title { font-family: var(--font-display); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-primary); }
        .rrd-card-legend { display: flex; gap: 10px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); }
        .rrd-card-legend .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; box-shadow: 0 0 6px currentColor; vertical-align: 1px; }
        .rrd-svg-wrap { position: relative; }
        .rrd-svg { width: 100%; height: 160px; display: block; }
        .rrd-tip {
          position: absolute; top: 4px;
          background: linear-gradient(180deg, rgba(8, 18, 30, 0.96), rgba(2, 8, 16, 0.96));
          border: 1px solid var(--primary);
          border-radius: 4px;
          padding: 6px 10px;
          box-shadow: 0 4px 16px rgba(0, 240, 255, 0.25);
          font-family: var(--font-mono); font-size: 12.5px;
          color: var(--text-primary);
          pointer-events: none;
          z-index: 4;
          min-width: 140px;
          backdrop-filter: blur(4px);
        }
        .rrd-tip-time {
          font-family: var(--font-display); font-size: 11.5px;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--primary);
          padding-bottom: 4px; margin-bottom: 4px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.22);
        }
        .rrd-tip-row { display: flex; align-items: baseline; gap: 6px; line-height: 1.6; }
        .rrd-tip-dot { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 4px currentColor; flex-shrink: 0; }
        .rrd-tip-key { color: var(--text-secondary); flex: 1; }
        .rrd-tip-val { color: var(--text-primary); font-variant-numeric: tabular-nums; }
      `}</style>
    </div>
  );
}
