/**
 * ReplicationModal — read-only viewer for storage replication jobs.
 * Shows job id, target node, schedule, last sync, fail count, error
 * (if any). PVE writes the failure into `error` field; surface it in red.
 */
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

interface Job {
  id?: string;
  guest?: number;
  type?: string;
  source?: string;
  target?: string;
  schedule?: string;
  rate?: number;
  comment?: string;
  disable?: number;
  fail_count?: number | string;
  error?: string;
  last_sync?: number;
  last_try?: number;
  next_run?: number;
  duration?: number;
  pid?: number;
  state?: string;
}

const fmtTime = (s?: number) => {
  if (!s) return '—';
  const d = new Date(s * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
    + `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fmtDur = (s?: number) => {
  if (!s) return '—';
  if (s < 60) return `${s.toFixed(1)}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${Math.floor(s % 60)}s`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
};

export function ReplicationModal({ open, onClose, clusterId }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterErrors, setFilterErrors] = useState(false);
  const [reload, setReload] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({
    vmid: '', index: '0', target: '', schedule: '*/15', rate: '', comment: '',
  });
  const [busy, setBusy] = useState(false);

  const ID_RE = /^[0-9]+-[0-9]+$/;

  const submitAdd = async () => {
    setError(null);
    const id = `${addForm.vmid.trim()}-${addForm.index.trim()}`;
    if (!ID_RE.test(id)) { setError('Bad job id (need <vmid>-<index>)'); return; }
    if (!addForm.target.trim()) { setError('Target node required'); return; }
    if (!addForm.schedule.trim()) { setError('Schedule required'); return; }
    setBusy(true);
    try {
      const body: any = {
        id, target: addForm.target.trim(), schedule: addForm.schedule.trim(),
      };
      if (addForm.rate) body.rate = +addForm.rate;
      if (addForm.comment) body.comment = addForm.comment;
      const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/replication`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setShowAdd(false);
      setAddForm({ vmid: '', index: '0', target: '', schedule: '*/15', rate: '', comment: '' });
      setReload((n) => n + 1);
    } catch (e: any) { setError(e.message || String(e)); }
    finally { setBusy(false); }
  };

  const deleteJob = async (id: string) => {
    const ok = await dialog.confirm(`Delete replication job "${id}"?`,
      { title: 'Delete replication job?', destructive: true });
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/replication/${encodeURIComponent(id)}`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) { await dialog.alert(`Delete failed: ${e.message || e}`); }
  };

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/replication-jobs`,
          { credentials: 'same-origin' }
        );
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (alive) setJobs(data.jobs || []);
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  const visible = useMemo(() => {
    if (!filterErrors) return jobs;
    return jobs.filter((j) =>
      j.error || (j.fail_count != null && Number(j.fail_count) > 0)
    );
  }, [jobs, filterErrors]);

  const errCount = useMemo(
    () => jobs.filter((j) =>
      j.error || (j.fail_count != null && Number(j.fail_count) > 0)
    ).length,
    [jobs]
  );

  if (!open) return null;
  return (
    <div className="rp-back" onClick={onClose}>
      <div className="rp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rp-head">
          <div className="rp-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10"/>
              <polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            <span>{t('repl.title')}</span>
          </div>
          <div className="rp-actions">
            <label className="rp-toggle">
              <input type="checkbox" checked={filterErrors} onChange={(e) => setFilterErrors(e.target.checked)} />
              {t('repl.errors_only')}
              {errCount > 0 && <span className="rp-bad">({errCount})</span>}
            </label>
            {isAdmin && !showAdd && (
              <button className="rp-add" onClick={() => { setShowAdd(true); setError(null); }}>+ Job</button>
            )}
            <button className="rp-close" onClick={onClose}>×</button>
          </div>
        </div>
        {showAdd && isAdmin && (
          <div className="rp-add-form">
            <input placeholder="vmid" value={addForm.vmid}
                   onChange={(e) => setAddForm({ ...addForm, vmid: e.target.value.replace(/\D/g, '') })} />
            <input placeholder="idx" value={addForm.index} style={{ width: 60 }}
                   onChange={(e) => setAddForm({ ...addForm, index: e.target.value.replace(/\D/g, '') })} />
            <input placeholder="target node" value={addForm.target}
                   onChange={(e) => setAddForm({ ...addForm, target: e.target.value })} />
            <input placeholder="schedule (e.g. */15)" value={addForm.schedule}
                   onChange={(e) => setAddForm({ ...addForm, schedule: e.target.value })} />
            <input placeholder="rate KB/s (optional)" value={addForm.rate} style={{ width: 130 }}
                   onChange={(e) => setAddForm({ ...addForm, rate: e.target.value.replace(/\D/g, '') })} />
            <input placeholder="comment" value={addForm.comment}
                   onChange={(e) => setAddForm({ ...addForm, comment: e.target.value })} />
            <button onClick={() => { setShowAdd(false); setError(null); }} disabled={busy}>Cancel</button>
            <button className="rp-primary" onClick={submitAdd} disabled={busy}>{busy ? '…' : 'Create'}</button>
          </div>
        )}
        <div className="rp-body">
          {error && <div className="rp-error">{error}</div>}
          {loading && jobs.length === 0 && <div className="rp-empty">{t('repl.loading')}</div>}
          {!loading && jobs.length === 0 && !error && (
            <div className="rp-empty">{t('repl.empty')}</div>
          )}
          {visible.length > 0 && (
            <table className="rp-table">
              <thead>
                <tr>
                  <th>{t('repl.col.id')}</th>
                  <th>{t('repl.col.guest')}</th>
                  <th>{t('repl.col.target')}</th>
                  <th>{t('repl.col.schedule')}</th>
                  <th>{t('repl.col.last_sync')}</th>
                  <th>{t('repl.col.duration')}</th>
                  <th>{t('repl.col.fail')}</th>
                  <th>{t('repl.col.state')}</th>
                  {isAdmin && <th></th>}
                </tr>
              </thead>
              <tbody>
                {visible.map((j) => {
                  const failN = Number(j.fail_count || 0);
                  const hasErr = !!j.error || failN > 0;
                  const stateLabel = j.disable
                    ? 'disabled'
                    : (j.state || (hasErr ? 'error' : 'ok'));
                  return (
                    <tr key={j.id} title={j.error || j.comment || ''}>
                      <td className="rp-mono">{j.id}</td>
                      <td className="rp-mono">{j.guest || '—'}</td>
                      <td className="rp-mono">{j.target || '—'}</td>
                      <td className="rp-mono">{j.schedule || '—'}</td>
                      <td className="rp-mono">{fmtTime(j.last_sync)}</td>
                      <td className="rp-mono">{fmtDur(j.duration)}</td>
                      <td className={`rp-mono num ${failN > 0 ? 'rp-bad' : ''}`}>{failN || 0}</td>
                      <td>
                        <span className={`rp-state rp-state-${
                          stateLabel === 'disabled' ? 'muted' :
                          stateLabel === 'error' ? 'danger' :
                          stateLabel === 'ok' ? 'success' : 'warning'
                        }`}>{stateLabel}</span>
                      </td>
                      {isAdmin && (
                        <td>
                          <button className="rp-act" onClick={async () => {
                            try {
                              const r = await fetch(
                                `/api/clusters/${encodeURIComponent(clusterId)}/replication/${encodeURIComponent(j.id || '')}/run-now`,
                                { method: 'POST', credentials: 'same-origin' }
                              );
                              const d = await r.json().catch(() => ({}));
                              if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                              await dialog.alert(`Submitted: ${d.upid || '(no upid)'}`);
                              setReload((n) => n + 1);
                            } catch (e: any) { await dialog.alert(`Run failed: ${e.message || e}`); }
                          }}>Run</button>
                          <button className="rp-act" onClick={async () => {
                            try {
                              const r = await fetch(
                                `/api/clusters/${encodeURIComponent(clusterId)}/replication/${encodeURIComponent(j.id || '')}/disabled`,
                                { method: 'PUT', credentials: 'same-origin',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ disabled: !j.disable }) }
                              );
                              const d = await r.json().catch(() => ({}));
                              if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                              setReload((n) => n + 1);
                            } catch (e: any) { await dialog.alert(`Toggle failed: ${e.message || e}`); }
                          }}>{j.disable ? 'Enable' : 'Disable'}</button>
                          <button className="rp-del" onClick={() => deleteJob(j.id || '')}>Delete</button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <style>{`
          .rp-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .rp-modal { width: min(1100px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: rp-in .18s ease-out; overflow: hidden; }
          @keyframes rp-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .rp-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.16); gap: 14px; }
          .rp-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .rp-actions { display: flex; align-items: center; gap: 12px; }
          .rp-toggle { display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); cursor: pointer; }
          .rp-toggle input { accent-color: var(--primary); }
          .rp-bad { color: var(--danger, #ff4d6d); }
          .rp-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .rp-close:hover { color: var(--primary); }
          .rp-body { flex: 1; overflow: auto; padding: 6px 0; }
          .rp-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .rp-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .rp-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .rp-table thead { position: sticky; top: 0; background: rgba(13,19,32,.95); }
          .rp-table th { padding: 6px 14px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .rp-table th.num, .rp-table td.num { text-align: right; }
          .rp-table td { padding: 4px 14px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .rp-table tbody tr:hover { background: rgba(0,240,255,.04); }
          .rp-mono { font-family: var(--font-mono); }
          .rp-state { display: inline-flex; align-items: center; gap: 6px; padding: 1px 8px; border-radius: 999px; font-size: 13.5px; border: 1px solid currentColor; }
          .rp-state::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 4px currentColor; }
          .rp-state-success { color: var(--success); }
          .rp-state-danger  { color: var(--danger, #ff4d6d); }
          .rp-state-warning { color: var(--warning); }
          .rp-state-muted   { color: var(--text-muted); }
          .rp-add { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .rp-add:hover { background: rgba(0,240,255,.2); }
          .rp-add-form { display: flex; gap: 6px; align-items: center; padding: 10px 18px; flex-wrap: wrap; border-bottom: 1px solid rgba(0,240,255,.16); background: rgba(0, 240, 255, 0.04); }
          .rp-add-form input { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; flex: 1; min-width: 100px; }
          .rp-add-form button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .rp-add-form .rp-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .rp-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .rp-del:hover { background: rgba(255, 77, 109, 0.1); }
          .rp-act { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; margin-right: 4px; }
          .rp-act:hover { background: rgba(0, 240, 255, 0.08); }
        `}</style>
      </div>
    </div>
  );
}
