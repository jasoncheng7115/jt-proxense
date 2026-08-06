/**
 * NodeSyslogModal — per-node journalctl tail (last N lines from PVE's
 * /nodes/{node}/syslog). Filter by free text + per-service unit. Auto-
 * refresh toggle. Sibling concept to ClusterLogModal but at host scope.
 */
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../i18n';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
  // Optional initial unit filter — set when opening the modal pre-filtered
  // for a specific service (e.g. clicked from NodeServicesModal).
  initialService?: string;
}

interface LogLine {
  n?: number;
  t?: string;          // raw line as PVE emitted it
}

export function NodeSyslogModal({ open, onClose, clusterId, node, initialService }: Props) {
  const { t } = useTranslation();
  const [lines, setLines] = useState<LogLine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [service, setService] = useState('');
  // Sync the unit-filter to whatever the parent passed in when opening.
  useEffect(() => {
    if (open) setService(initialService || '');
  }, [open, initialService]);
  const [auto, setAuto] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchOnce = async () => {
    if (!clusterId || !node) return;
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams();
      params.set('lines', '1000');
      if (service) params.set('service', service);
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/syslog?` + params.toString(),
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

  useEffect(() => { if (open) fetchOnce(); }, [open, clusterId, node, service]);  // eslint-disable-line
  useEffect(() => {
    if (!open || !auto) return;
    const t = setInterval(fetchOnce, 5000);
    return () => clearInterval(t);
  }, [open, auto, clusterId, node, service]);  // eslint-disable-line

  const fl = filter.trim().toLowerCase();
  const visible = fl
    ? lines.filter((l) => (l.t || '').toLowerCase().includes(fl))
    : lines;

  if (!open) return null;
  return (
    <div className="sl-back" onClick={onClose}>
      <div className="sl-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sl-head">
          <div className="sl-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
              <line x1="9" y1="17" x2="15" y2="17"/>
            </svg>
            <span>{t('nslog.title')}</span>
            <span className="sl-target">{node}</span>
          </div>
          <div className="sl-actions">
            <input
              className="sl-svc"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder={t('nslog.svc_ph')}
              size={18}
            />
            <input
              className="sl-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t('nslog.filter_ph')}
            />
            <label className="sl-auto">
              <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
              {t('tasks.auto_refresh')}
            </label>
            <button className="sl-btn" onClick={fetchOnce} disabled={loading}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>{t('tasks.refresh')}</span>
            </button>
            <button className="sl-close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="sl-meta">
          <span>{visible.length}{filter && ` / ${lines.length}`}</span>
        </div>
        <div className="sl-body">
          {error && <div className="sl-error">{error}</div>}
          {visible.length === 0 && !loading && (
            <div className="sl-empty">{filter ? t('clog.no_match') : t('clog.empty')}</div>
          )}
          {visible.map((l, i) => (
            <div key={l.n ?? i} className="sl-row">{l.t || ''}</div>
          ))}
          <div ref={bottomRef} />
        </div>
        <style>{`
          .sl-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .sl-modal { width: min(1200px, 96vw); height: 80vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: sl-in .18s ease-out; overflow: hidden; }
          @keyframes sl-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .sl-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); flex-wrap: wrap; }
          .sl-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .sl-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .sl-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
          .sl-svc, .sl-filter { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .sl-svc { width: 160px; }
          .sl-filter { width: 200px; }
          .sl-svc:focus, .sl-filter:focus { border-color: var(--primary); }
          .sl-auto { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); cursor: pointer; }
          .sl-auto input { accent-color: var(--primary); }
          .sl-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .sl-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
          .sl-btn:disabled { opacity: .5; cursor: not-allowed; }
          .sl-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .sl-close:hover { color: var(--primary); }
          .sl-meta { padding: 6px 18px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0, 240, 255, .08); }
          .sl-body { flex: 1; overflow: auto; padding: 6px 12px; font-family: var(--font-mono); font-size: 13.5px; }
          .sl-empty { padding: 32px 12px; text-align: center; color: var(--text-muted); font-style: italic; }
          .sl-error { padding: 8px 14px; margin: 6px 0; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); border-radius: 2px; }
          .sl-row { padding: 1px 8px; color: var(--text-primary); white-space: pre-wrap; word-break: break-all; font-family: var(--font-mono); }
          .sl-row:hover { background: rgba(0, 240, 255, 0.04); }
        `}</style>
      </div>
    </div>
  );
}
