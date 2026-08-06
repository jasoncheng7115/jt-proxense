/**
 * NodeServicesModal — read-only listing of PVE host services on a node:
 * pveproxy / pvedaemon / pvestatd / corosync / pve-cluster / etc., with
 * their active state. No start/stop yet — that's a /nodes/{node}/services/
 * {name}/{action} POST and worth treating with care.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useAuth } from '../composables/useAuth';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
  // Optional callback — when set, each service row gets a "logs" link that
  // opens NodeSyslogModal pre-filtered to that unit.
  onShowLogs?: (service: string) => void;
}

interface Svc {
  service?: string;
  name?: string;
  desc?: string;
  state?: string;
  'active-state'?: string;
  'unit-state'?: string;
}

const STATE_COLOR: Record<string, string> = {
  active: 'success',
  running: 'success',
  inactive: 'muted',
  failed: 'danger',
  reloading: 'warning',
  activating: 'warning',
};

export function NodeServicesModal({ open, onClose, clusterId, node, onShowLogs }: Props) {
  const { t, language } = useTranslation();
  const auth = useAuth();
  const dialog = useDialogs();
  const isAdmin = auth.user?.role_global === 'admin';
  const [items, setItems] = useState<Svc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);   // "name:action" while in flight
  const [toast, setToast] = useState<string | null>(null);

  const reload = async () => {
    setLoading(true); setError(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/services`,
        { credentials: 'same-origin' }
      );
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      const data = await r.json();
      setItems(data.services || []);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (open) reload(); }, [open, clusterId, node]);  // eslint-disable-line

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const doAction = async (name: string, action: 'start' | 'stop' | 'restart' | 'reload') => {
    if (!isAdmin || busy) return;
    // Confirm destructive actions on critical PVE services. Stopping
    // pveproxy or pvedaemon takes the API offline; restarting corosync
    // can briefly drop quorum. We don't try to be exhaustive — any service
    // whose name matches the heuristic gets a confirmation.
    const isCritical = /^(pveproxy|pvedaemon|pvestatd|corosync|pve-cluster|pve-firewall|pve-lxc-syscalld)$/.test(name);
    const isStop = action === 'stop';
    if (isCritical || isStop) {
      const ok = await dialog.confirm(
        language === 'zh-TW'
          ? `確定在 ${node} 上對 ${name} 執行 ${action}？關鍵服務動作可能影響整個叢集，請確認。`
          : `Run ${action} on ${name}@${node}? Critical-service actions can affect the whole cluster.`,
        { destructive: action === 'stop' || action === 'restart' }
      );
      if (!ok) return;
    }
    setBusy(`${name}:${action}`);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/services/${encodeURIComponent(name)}/${action}`,
        { method: 'POST', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      showToast(language === 'zh-TW'
        ? `${name} ${action} 已啟動 (${(d.upid || '').slice(0, 24)})`
        : `${name} ${action} kicked off (${(d.upid || '').slice(0, 24)})`);
      // Re-pull the service list shortly — most actions complete fast.
      setTimeout(reload, 1500);
    } catch (e: any) {
      dialog.alert(e.message || String(e));
    } finally {
      setBusy(null);
    }
  };

  if (!open) return null;
  return (
    <div className="ns-back" onClick={onClose}>
      <div className="ns-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ns-head">
          <div className="ns-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"/>
            </svg>
            <span>{t('svcs.title')}</span>
            <span className="ns-target">{node}</span>
          </div>
          <button className="ns-close" onClick={onClose}>×</button>
        </div>
        <div className="ns-body">
          {error && <div className="ns-error">{error}</div>}
          {loading && items.length === 0 && <div className="ns-empty">{t('svcs.loading')}</div>}
          {toast && <div className="ns-toast">{toast}</div>}
          {items.length > 0 && (
            <table className="ns-table">
              <thead>
                <tr>
                  <th>{t('svcs.col.service')}</th>
                  <th>{t('svcs.col.state')}</th>
                  <th>{t('svcs.col.desc')}</th>
                  {isAdmin && <th>{t('svcs.col.actions')}</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((s) => {
                  const state = (s['active-state'] || s.state || s['unit-state'] || '').toLowerCase();
                  const name = s.service || s.name || '';
                  const inflight = busy?.startsWith(`${name}:`);
                  return (
                    <tr key={name}>
                      <td className="ns-mono">{name}</td>
                      <td>
                        <span className={`ns-state ns-state-${STATE_COLOR[state] || 'muted'}`}>{state || '—'}</span>
                      </td>
                      <td className="ns-mono ns-desc" title={s.desc || ''}>{s.desc || ''}</td>
                      {isAdmin && (
                        <td className="ns-actions">
                          <button className="ns-act start"   disabled={!!busy || state === 'active'} onClick={() => doAction(name, 'start')}>{t('svcs.act.start')}</button>
                          <button className="ns-act restart" disabled={!!busy} onClick={() => doAction(name, 'restart')}>{t('svcs.act.restart')}</button>
                          <button className="ns-act reload"  disabled={!!busy || state !== 'active'} onClick={() => doAction(name, 'reload')}>{t('svcs.act.reload')}</button>
                          <button className="ns-act stop"    disabled={!!busy || state !== 'active'} onClick={() => doAction(name, 'stop')}>{t('svcs.act.stop')}</button>
                          {onShowLogs && (
                            <button className="ns-act" title={t('svcs.act.logs')} onClick={() => onShowLogs(name)}>{t('svcs.act.logs')}</button>
                          )}
                          {inflight && <span className="ns-spinner" />}
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
          .ns-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .ns-modal { width: min(820px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: ns-in .18s ease-out; overflow: hidden; }
          @keyframes ns-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ns-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .ns-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .ns-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .ns-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .ns-close:hover { color: var(--primary); }
          .ns-body { flex: 1; overflow: auto; padding: 6px 0; }
          .ns-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .ns-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .ns-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .ns-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .ns-table th { padding: 6px 14px; text-align: left; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .ns-table td { padding: 4px 14px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .ns-mono { font-family: var(--font-mono); }
          .ns-state { display: inline-flex; align-items: center; gap: 6px; padding: 1px 8px; border-radius: 999px; font-size: 12.5px; border: 1px solid currentColor; }
          .ns-state::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 4px currentColor; }
          .ns-state-success { color: var(--success); }
          .ns-state-warning { color: var(--warning); }
          .ns-state-danger  { color: var(--danger, #ff4d6d); }
          .ns-state-muted   { color: var(--text-muted); }
          .ns-desc { max-width: 320px; overflow: hidden; text-overflow: ellipsis; }
          .ns-actions { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
          .ns-act { padding: 2px 8px; font-family: var(--font-display); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; background: rgba(0,240,255,.05); color: var(--text-secondary); border: 1px solid rgba(0,240,255,.2); border-radius: 2px; cursor: pointer; }
          .ns-act:hover:not(:disabled) { color: var(--primary); border-color: var(--primary); background: rgba(0,240,255,.12); }
          .ns-act:disabled { opacity: .35; cursor: not-allowed; }
          .ns-act.stop:hover:not(:disabled)    { color: var(--danger, #ff4d6d); border-color: var(--danger, #ff4d6d); background: rgba(255,77,109,.08); }
          .ns-act.restart:hover:not(:disabled) { color: var(--warning); border-color: var(--warning); background: rgba(255,107,0,.08); }
          .ns-act.start:hover:not(:disabled)   { color: var(--success); border-color: var(--success); background: rgba(0,255,136,.08); }
          .ns-spinner { display: inline-block; width: 10px; height: 10px; border: 1.5px solid rgba(0,240,255,.3); border-top-color: var(--primary); border-radius: 50%; animation: ns-spin 0.7s linear infinite; }
          @keyframes ns-spin { to { transform: rotate(360deg); } }
          .ns-toast { padding: 6px 14px; margin: 0 18px 8px; border: 1px solid var(--success); border-left-width: 3px; background: rgba(0,255,136,.06); color: var(--success); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
        `}</style>
      </div>
    </div>
  );
}
