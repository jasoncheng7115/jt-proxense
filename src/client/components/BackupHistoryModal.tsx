/**
 * BackupHistoryModal — list every vzdump file for a VM/CT across the
 * cluster's backup-capable storages, sorted newest-first.
 *
 * Shows: timestamp, age (colour-coded), storage, size, protected flag,
 * verification state, notes. Lets the operator answer "is this VM backed
 * up, and how recent is the latest backup?" without bouncing through
 * cluster→node→storage→type filters.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  vmid: number;
  vmName?: string;
  /** 'qemu' | 'lxc' — needed to pick the right restore endpoint. */
  vmType?: 'qemu' | 'lxc';
}

interface Backup {
  volid: string;
  size?: number;
  ctime?: number;
  format?: string;
  notes?: string;
  storage?: string;
  node?: string;
  verification?: { state?: string; upid?: string };
  protected?: boolean;
}

const fmtSize = (b?: number) => {
  if (!b || !isFinite(b)) return '—';
  const u = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0; let v = b;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2)} ${u[i]}`;
};

const fmtTime = (s?: number) => {
  if (!s) return '—';
  const d = new Date(s * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
    + `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fmtAge = (s: number | undefined, language: string) => {
  if (!s) return '—';
  const ageS = Math.floor(Date.now() / 1000) - s;
  const d = Math.floor(ageS / 86400);
  if (d === 0) return language === 'zh-TW' ? '今天' : 'today';
  if (d === 1) return language === 'zh-TW' ? '昨天' : 'yesterday';
  if (d < 30) return language === 'zh-TW' ? `${d} 天前` : `${d}d ago`;
  const m = Math.floor(d / 30);
  return language === 'zh-TW' ? `${m} 個月前` : `${m}mo ago`;
};

// Pick a colour based on backup age — red >30d, orange 7-30d, dim
// green-ish ≤7d. Operators eyeball this for "are we behind on backups".
const ageColor = (s?: number): 'fresh' | 'aging' | 'stale' | 'unknown' => {
  if (!s) return 'unknown';
  const days = (Date.now() / 1000 - s) / 86400;
  if (days > 30) return 'stale';
  if (days > 7) return 'aging';
  return 'fresh';
};

export function BackupHistoryModal({ open, onClose, clusterId, vmid, vmName, vmType }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';
  const [items, setItems] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<string | null>(null);

  const verifyBackup = async (b: Backup) => {
    if (!b.node || !b.storage || !b.volid) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(b.node)}/storage/${encodeURIComponent(b.storage)}/verify`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ volume: b.volid }) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.verified) {
        await dialog.alert(`Verify failed: ${d.detail || d.error || `HTTP ${r.status}`}`);
        return;
      }
      await dialog.alert('✓ Backup metadata is readable. (Shallow verify only — for full PBS verify, run a verify job in the PBS UI.)');
    } catch (e: any) {
      await dialog.alert(`Verify failed: ${e.message || e}`);
    }
  };

  const restoreBackup = async (b: Backup) => {
    const target = await dialog.prompt(
      `Restore to VMID? (default ${vmid} = overwrite original)`,
      { title: 'Restore backup', defaultValue: String(vmid), inputType: 'text' }
    );
    if (target === null) return;
    const newId = parseInt(target.trim(), 10);
    if (!Number.isFinite(newId) || newId < 100) {
      await dialog.alert('Invalid VMID');
      return;
    }
    const isOverwrite = newId === vmid;
    const proceed = await dialog.confirm(
      isOverwrite
        ? `OVERWRITE existing ${vmType === 'lxc' ? 'CT' : 'VM'} ${vmid} with this backup?\n\nThe current disks and config will be DESTROYED. This is not reversible.`
        : `Create new ${vmType === 'lxc' ? 'CT' : 'VM'} ${newId} from this backup?\n\nA fresh guest will be created using the backup's contents.`,
      { title: isOverwrite ? 'Overwrite & restore?' : 'Restore as new VMID?', destructive: isOverwrite }
    );
    if (!proceed) return;
    setRestoring(b.volid);
    try {
      const node = b.node || '';
      const kind = vmType === 'lxc' ? 'lxc' : 'qemu';
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${kind}/${newId}/restore`,
        {
          method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ archive: b.volid, force: isOverwrite }),
        }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      await dialog.alert(`Restore submitted. PVE task: ${d.task || '(no upid)'}`);
    } catch (e: any) {
      await dialog.alert(`Restore failed: ${e.message || e}`);
    } finally {
      setRestoring(null);
    }
  };

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/vms/${vmid}/backups`,
          { credentials: 'same-origin' }
        );
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (alive) setItems(data.backups || []);
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, vmid]);

  if (!open) return null;

  const totalSize = items.reduce((s, b) => s + (b.size || 0), 0);
  const newest = items[0]?.ctime;

  return (
    <div className="bh-back" onClick={onClose}>
      <div className="bh-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bh-head">
          <div className="bh-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="6" rx="8" ry="3" />
              <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
              <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
            </svg>
            <span>{t('bh.title')}</span>
            {vmName && <span className="bh-target">{vmid} — {vmName}</span>}
          </div>
          <button className="bh-close" onClick={onClose}>×</button>
        </div>
        <div className="bh-stats">
          <div><span className="lbl">{t('bh.count')}</span> {items.length}</div>
          <div><span className="lbl">{t('bh.total_size')}</span> {fmtSize(totalSize)}</div>
          <div><span className="lbl">{t('bh.newest')}</span> {newest ? fmtTime(newest) : '—'}
            {newest && <span className={`bh-age bh-age-${ageColor(newest)}`}>{fmtAge(newest, language)}</span>}
          </div>
        </div>
        <div className="bh-body">
          {error && <div className="bh-error">{error}</div>}
          {loading && items.length === 0 && (
            <div className="bh-loading">{t('bh.loading')}</div>
          )}
          {!loading && items.length === 0 && !error && (
            <div className="bh-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
              </svg>
              <div>{t('bh.empty')}</div>
            </div>
          )}
          {items.length > 0 && (
            <table className="bh-table">
              <thead>
                <tr>
                  <th>{t('bh.col.ctime')}</th>
                  <th>{t('bh.col.age')}</th>
                  <th>{t('bh.col.storage')}</th>
                  <th>{t('bh.col.node')}</th>
                  <th className="num">{t('bh.col.size')}</th>
                  <th>{t('bh.col.flags')}</th>
                  <th>{t('bh.col.notes')}</th>
                  {isAdmin && <th></th>}
                </tr>
              </thead>
              <tbody>
                {items.map((b) => (
                  <tr key={b.volid}>
                    <td>{fmtTime(b.ctime)}</td>
                    <td><span className={`bh-age bh-age-${ageColor(b.ctime)}`}>{fmtAge(b.ctime, language)}</span></td>
                    <td>{b.storage || '—'}</td>
                    <td>{b.node || '—'}</td>
                    <td className="num">{fmtSize(b.size)}</td>
                    <td>
                      {b.protected && <span className="bh-flag protected">{t('bh.protected')}</span>}
                      {b.verification?.state === 'ok' && <span className="bh-flag verified">{t('bh.verified')}</span>}
                      {b.verification?.state === 'failed' && <span className="bh-flag failed">{t('bh.verify_failed')}</span>}
                    </td>
                    <td className="bh-notes" title={b.notes}>{b.notes || ''}</td>
                    {isAdmin && (
                      <td>
                        <button className="bh-restore-btn"
                                onClick={() => verifyBackup(b)}
                                disabled={restoring !== null}
                                style={{ marginRight: 4 }}>
                          {t('bh.verify_btn')}
                        </button>
                        <button className="bh-restore-btn"
                                onClick={() => restoreBackup(b)}
                                disabled={restoring !== null}>
                          {restoring === b.volid ? '…' : t('bh.restore')}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <style>{`
          .bh-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .bh-modal { width: min(1000px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: bh-in .18s ease-out; overflow: hidden; }
          @keyframes bh-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .bh-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .bh-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .bh-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .bh-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .bh-close:hover { color: var(--primary); }
          .bh-stats { display: flex; gap: 32px; padding: 10px 20px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-primary); border-bottom: 1px solid rgba(0,240,255,.08); flex-wrap: wrap; align-items: center; }
          .bh-stats .lbl { font-family: var(--font-display); font-size: 11.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); margin-right: 6px; }
          .bh-body { flex: 1; overflow: auto; padding: 6px 0; }
          .bh-loading, .bh-empty { padding: 40px 20px; text-align: center; font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 12px; }
          .bh-empty svg { stroke: var(--text-muted); opacity: .6; }
          .bh-error { padding: 8px 14px; margin: 0 18px 8px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .bh-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .bh-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .bh-table th { padding: 8px 14px; text-align: left; font-family: var(--font-display); font-weight: 600; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .bh-table th.num, .bh-table td.num { text-align: right; }
          .bh-table td { padding: 6px 14px; border-bottom: 1px solid rgba(0,240,255,.06); white-space: nowrap; color: var(--text-primary); }
          .bh-table tbody tr:nth-child(odd) { background: rgba(0, 240, 255, 0.025); }
          .bh-table tbody tr:hover { background: rgba(0, 240, 255, 0.08); }
          .bh-notes { max-width: 240px; overflow: hidden; text-overflow: ellipsis; }

          .bh-age { display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 999px; font-size: 12.5px; font-family: var(--font-mono); border: 1px solid currentColor; margin-left: 8px; }
          .bh-age::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 4px currentColor; }
          .bh-age-fresh    { color: var(--success); }
          .bh-age-aging    { color: var(--warning); }
          .bh-age-stale    { color: var(--danger, #ff4d6d); }
          .bh-age-unknown  { color: var(--text-muted); }

          .bh-flag { display: inline-block; padding: 1px 6px; margin-right: 4px; font-size: 11.5px; font-family: var(--font-display); letter-spacing: .04em; border-radius: 2px; }
          .bh-flag.protected { color: var(--accent); border: 1px solid rgba(224,102,255,.5); }
          .bh-flag.verified { color: var(--success); border: 1px solid rgba(0,255,136,.5); }
          .bh-flag.failed { color: var(--danger, #ff4d6d); border: 1px solid rgba(255,77,109,.5); }
          .bh-restore-btn { padding: 2px 10px; font-family: var(--font-mono); font-size: 12.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .bh-restore-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.1); }
          .bh-restore-btn:disabled { opacity: .4; cursor: not-allowed; }
        `}</style>
      </div>
    </div>
  );
}
