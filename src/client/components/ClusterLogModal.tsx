/**
 * ClusterLogModal — last N lines of /cluster/log for the selected cluster.
 * Refresh + filter by free text. Sibling concept to PveTasks (timeline of
 * what's happening) but at the syslog layer instead of the task layer.
 */
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../i18n';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

interface LogLine {
  n?: number;
  time?: number;
  node?: string;
  user?: string;
  pri?: number;
  msg?: string;
  tag?: string;
  pid?: number;
}

const PRI_COLOR: Record<number, string> = {
  0: 'crit', 1: 'crit', 2: 'crit',
  3: 'err',
  4: 'warn',
  5: 'notice', 6: 'info', 7: 'debug',
};

const fmtTime = (s?: number) => {
  if (!s) return '—';
  const d = new Date(s * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
    + `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export function ClusterLogModal({ open, onClose, clusterId }: Props) {
  const { t } = useTranslation();
  const [lines, setLines] = useState<LogLine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [auto, setAuto] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchOnce = async () => {
    if (!clusterId) return;
    setLoading(true); setError(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/log?max=500`,
        { credentials: 'same-origin' }
      );
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      const data = await r.json();
      setLines(data.lines || []);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (open) fetchOnce(); }, [open, clusterId]);  // eslint-disable-line
  useEffect(() => {
    if (!open || !auto) return;
    const t = setInterval(fetchOnce, 5000);
    return () => clearInterval(t);
  }, [open, auto, clusterId]);  // eslint-disable-line

  const fl = filter.trim().toLowerCase();
  const visible = fl
    ? lines.filter((l) => (
        (l.msg || '').toLowerCase().includes(fl) ||
        (l.node || '').toLowerCase().includes(fl) ||
        (l.user || '').toLowerCase().includes(fl) ||
        (l.tag || '').toLowerCase().includes(fl)
      ))
    : lines;

  if (!open) return null;

  return (
    <div className="cl-back" onClick={onClose}>
      <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cl-head">
          <div className="cl-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            <span>{t('clog.title')}</span>
          </div>
          <div className="cl-actions">
            <input
              className="cl-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t('clog.filter_ph')}
            />
            <label className="cl-auto">
              <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
              {t('tasks.auto_refresh')}
            </label>
            <button className="cl-btn" onClick={fetchOnce} disabled={loading}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>{t('tasks.refresh')}</span>
            </button>
            <button className="cl-close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="cl-meta">
          <span>{visible.length}{filter && ` / ${lines.length}`}</span>
        </div>
        <div className="cl-body" ref={scrollRef}>
          {error && <div className="cl-error">{error}</div>}
          {visible.length === 0 && !loading && (
            <div className="cl-empty">{filter ? t('clog.no_match') : t('clog.empty')}</div>
          )}
          {visible.map((l, i) => (
            <div key={l.n ?? i} className={`cl-row cl-pri-${PRI_COLOR[l.pri ?? 6] || 'info'}`}>
              <span className="cl-time">{fmtTime(l.time)}</span>
              <span className="cl-node">{l.node || '—'}</span>
              <span className="cl-user">{l.user || ''}</span>
              <span className="cl-tag">{l.tag || ''}</span>
              <span className="cl-msg">{l.msg || ''}</span>
            </div>
          ))}
        </div>
        <style>{`
          .cl-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .cl-modal { width: min(1200px, 96vw); height: 80vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: cl-in .18s ease-out; overflow: hidden; }
          @keyframes cl-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .cl-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .cl-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .cl-actions { display: flex; align-items: center; gap: 8px; }
          .cl-filter { padding: 5px 10px; min-width: 220px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .cl-filter:focus { border-color: var(--primary); }
          .cl-auto { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); cursor: pointer; }
          .cl-auto input { accent-color: var(--primary); }
          .cl-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .cl-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
          .cl-btn:disabled { opacity: .5; cursor: not-allowed; }
          .cl-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .cl-close:hover { color: var(--primary); }
          .cl-meta { padding: 6px 18px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.08); }

          .cl-body { flex: 1; overflow: auto; padding: 6px 12px; font-family: var(--font-mono); font-size: 13.5px; }
          .cl-empty { padding: 40px 12px; text-align: center; color: var(--text-muted); font-style: italic; }
          .cl-error { padding: 8px 14px; margin: 6px 0; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); border-radius: 2px; }

          .cl-row { display: grid; grid-template-columns: 90px 90px 130px 130px 1fr; gap: 10px; padding: 3px 8px; border-bottom: 1px solid rgba(0,240,255,.04); white-space: pre; }
          .cl-row:hover { background: rgba(0, 240, 255, 0.05); }
          .cl-time { color: var(--text-secondary); }
          .cl-node { color: var(--accent); }
          .cl-user { color: var(--primary); }
          .cl-tag  { color: var(--text-secondary); opacity: .85; }
          .cl-msg  { color: var(--text-primary); white-space: pre-wrap; word-break: break-all; }
          .cl-pri-crit  .cl-msg { color: var(--danger, #ff4d6d); }
          .cl-pri-err   .cl-msg { color: var(--danger, #ff4d6d); }
          .cl-pri-warn  .cl-msg { color: var(--warning); }
          .cl-pri-notice .cl-msg, .cl-pri-info .cl-msg { color: var(--text-primary); }
          .cl-pri-debug .cl-msg { color: var(--text-muted); }
        `}</style>
      </div>
    </div>
  );
}
