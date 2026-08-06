/**
 * NodeMaintenanceModal — single-shot dialog for entering / exiting node
 * maintenance mode. On enter: optionally sets ceph noout + drains VMs to
 * a target node. On exit: clears noout.
 *
 * Backend: server/maintenance.py.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
  /** Other nodes in the same cluster — populates the target dropdown. */
  candidates: string[];
}

export function NodeMaintenanceModal({ open, onClose, clusterId, node, candidates }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [setNoout, setSetNoout] = useState(true);
  const [migrate, setMigrate] = useState(true);
  const [target, setTarget] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!open) return;
    setErr(null); setResult(null); setBusy(false);
    setSetNoout(true); setMigrate(true);
    setTarget(candidates[0] || '');
  }, [open, candidates]);

  if (!open) return null;

  const submit = async (enable: boolean) => {
    setErr(null); setBusy(true);
    try {
      const body: any = { enable, set_ceph_noout: setNoout };
      if (enable && migrate) {
        body.migrate_vms = true;
        body.target_node = target;
      }
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/maintenance`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setResult(d);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mm-back" onClick={() => !busy && onClose()}>
      <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mm-head">
          <span>{t('mm.title').replace('{node}', node)}</span>
          <button className="mm-close" onClick={onClose} disabled={busy}>×</button>
        </div>
        {!result && (
          <div className="mm-body">
            {err && <div className="mm-error">{err}</div>}
            <label className="mm-row">
              <input type="checkbox" checked={setNoout}
                     onChange={(e) => setSetNoout(e.target.checked)} />
              <span>{t('mm.set_noout')}</span>
            </label>
            <div className="mm-help">{t('mm.set_noout_help')}</div>
            <label className="mm-row">
              <input type="checkbox" checked={migrate}
                     onChange={(e) => setMigrate(e.target.checked)} />
              <span>{t('mm.migrate_vms')}</span>
            </label>
            {migrate && (
              <div className="mm-target">
                <label>
                  <span>{t('mm.target_node')}</span>
                  <select value={target} onChange={(e) => setTarget(e.target.value)}>
                    {candidates.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
              </div>
            )}
            <div className="mm-help">{t('mm.help')}</div>
            <div className="mm-actions">
              <button onClick={onClose} disabled={busy}>{t('mm.cancel')}</button>
              <button className="mm-warn-btn" disabled={busy} onClick={() => submit(false)}>
                {t('mm.exit')}
              </button>
              <button className="mm-primary"
                      disabled={busy || (migrate && !target)}
                      onClick={() => submit(true)}>
                {busy ? t('mm.busy') : t('mm.enter')}
              </button>
            </div>
          </div>
        )}
        {result && (
          <div className="mm-body">
            <div className="mm-result-title">{t('mm.result_title')}</div>
            {result.noout_set && <div className="mm-result-line"><span className="ok">✓</span> noout flag set</div>}
            {result.noout_cleared && <div className="mm-result-line"><span className="ok">✓</span> noout flag cleared</div>}
            {result.noout_error && <div className="mm-result-line"><span className="bad">✗</span> noout: {result.noout_error}</div>}
            {Array.isArray(result.migrations) && result.migrations.length > 0 && (
              <table className="mm-table">
                <thead><tr><th>vmid</th><th>type</th><th>result</th><th>upid / detail</th></tr></thead>
                <tbody>
                  {result.migrations.map((m: any) => (
                    <tr key={m.vmid}>
                      <td className="mm-mono">{m.vmid}</td>
                      <td className="mm-mono">{m.type}</td>
                      <td><span className={m.ok ? 'ok' : 'bad'}>{m.ok ? '✓' : '✗'}</span></td>
                      <td className="mm-mono mm-trunc" title={m.upid || m.detail || ''}>{m.upid || m.detail || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mm-actions">
              <button className="mm-primary" onClick={onClose}>{t('mm.close')}</button>
            </div>
          </div>
        )}
        <style>{`
          .mm-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .mm-modal { width: min(640px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--warning); border-radius: 6px; box-shadow: 0 0 32px rgba(255, 200, 0, 0.25); animation: mm-in .18s ease-out; overflow: hidden; }
          @keyframes mm-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .mm-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(255, 200, 0, 0.3); color: var(--warning); font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
          .mm-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .mm-body { padding: 14px 18px; overflow: auto; }
          .mm-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-primary); cursor: pointer; }
          .mm-help { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); padding: 0 0 8px 24px; line-height: 1.4; }
          .mm-target { padding: 6px 0 6px 24px; }
          .mm-target label { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .mm-target select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; }
          .mm-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .mm-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 14px; }
          .mm-actions button { padding: 6px 14px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .mm-actions .mm-primary { background: var(--warning); color: #100b00; border-color: var(--warning); }
          .mm-actions .mm-warn-btn { color: var(--text-secondary); border-color: rgba(255,255,255,.25); }
          .mm-result-title { font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid rgba(0,240,255,.16); }
          .mm-result-line { padding: 4px 0; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-primary); }
          .mm-result-line .ok { color: var(--success); margin-right: 8px; }
          .mm-result-line .bad { color: var(--danger, #ff4d6d); margin-right: 8px; }
          .mm-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; margin-top: 8px; }
          .mm-table th { padding: 4px 8px; text-align: left; color: var(--text-secondary); font-size: 12.5px; text-transform: uppercase; border-bottom: 1px solid rgba(0,240,255,.12); }
          .mm-table td { padding: 4px 8px; border-bottom: 1px solid rgba(0,240,255,.05); }
          .mm-mono { font-family: var(--font-mono); }
          .mm-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .ok { color: var(--success); }
          .bad { color: var(--danger, #ff4d6d); }
        `}</style>
      </div>
    </div>
  );
}
