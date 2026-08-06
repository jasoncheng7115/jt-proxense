/**
 * LocksModal — VMs/CTs whose `lock` field is non-empty (migrate, backup,
 * snapshot, etc.). Surfacing this saves a search through the SPA when
 * an operation gets stuck and operators need to know whether to clear
 * the lock or wait it out.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

interface LockedRow {
  vmid: number;
  name: string;
  node: string;
  type: 'qemu' | 'lxc';
  lock: string;
  status: string;
}

export function LocksModal({ open, onClose, clusterId }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';
  const [items, setItems] = useState<LockedRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/locks`,
          { credentials: 'same-origin' });
        if (alive && r.ok) setItems(((await r.json()).locks || []) as LockedRow[]);
        else if (alive) setErr(`HTTP ${r.status}`);
      } catch (e: any) {
        if (alive) setErr(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  const unlock = async (row: LockedRow) => {
    const ok = await dialog.confirm(
      language === 'zh-TW'
        ? `清除 ${row.type === 'lxc' ? 'CT' : 'VM'} ${row.vmid} (${row.name}) 的 lock=${row.lock}？\n\n清鎖等同 'qm unlock'。如果該動作仍在執行中，清鎖可能造成資料損毀。`
        : `Clear lock=${row.lock} on ${row.type === 'lxc' ? 'CT' : 'VM'} ${row.vmid} (${row.name})?\n\nEquivalent to 'qm unlock'. If the underlying operation is still running, clearing may cause data corruption.`,
      { title: 'Clear stuck lock?', destructive: true }
    );
    if (!ok) return;
    try {
      const path = row.type === 'lxc' ? 'lxc' : 'qemu';
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(row.node)}/${path}/${row.vmid}/unlock`,
        { method: 'POST', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`Unlock failed: ${e.message || e}`);
    }
  };

  if (!open) return null;
  return (
    <div className="lk-back" onClick={onClose}>
      <div className="lk-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lk-head">
          <span>{t('lk.title')}</span>
          <button className="lk-close" onClick={onClose}>×</button>
        </div>
        <div className="lk-body">
          {err && <div className="lk-error">{err}</div>}
          {loading && items.length === 0 && <div className="lk-empty">{t('lk.loading')}</div>}
          {!loading && items.length === 0 && !err && <div className="lk-empty">{t('lk.empty')}</div>}
          {items.length > 0 && (
            <table className="lk-table">
              <thead><tr><th>node</th><th>vmid</th><th>type</th><th>name</th><th>lock</th><th>status</th>{isAdmin && <th></th>}</tr></thead>
              <tbody>
                {items.map((it) => (
                  <tr key={`${it.node}/${it.vmid}`}>
                    <td className="lk-mono">{it.node}</td>
                    <td className="lk-mono">{it.vmid}</td>
                    <td className="lk-mono">{it.type}</td>
                    <td className="lk-mono lk-trunc" title={it.name}>{it.name}</td>
                    <td><span className="lk-pill warn">{it.lock}</span></td>
                    <td className="lk-mono">{it.status}</td>
                    {isAdmin && (
                      <td>
                        <button className="lk-del" onClick={() => unlock(it)}>{t('lk.unlock')}</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="lk-footer">{t('lk.footer_help')}</div>
        <style>{`
          .lk-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .lk-modal { width: min(900px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--warning); border-radius: 6px; box-shadow: 0 0 32px rgba(255, 200, 0, 0.25); animation: lk-in .18s ease-out; overflow: hidden; }
          @keyframes lk-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .lk-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(255, 200, 0, 0.3); color: var(--warning); font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
          .lk-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .lk-body { flex: 1; overflow: auto; padding: 6px 0; }
          .lk-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .lk-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .lk-footer { padding: 8px 18px; border-top: 1px solid rgba(255, 200, 0, 0.16); font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .lk-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .lk-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .lk-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .lk-mono { font-family: var(--font-mono); }
          .lk-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .lk-pill { display: inline-block; padding: 1px 8px; font-size: 13.5px; font-family: var(--font-mono); border-radius: 999px; border: 1px solid currentColor; }
          .lk-pill.warn { color: var(--warning); }
          .lk-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--warning); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .lk-del:hover { background: rgba(255, 200, 0, 0.1); }
        `}</style>
      </div>
    </div>
  );
}
