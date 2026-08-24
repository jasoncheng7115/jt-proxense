/**
 * AptUpdatesModal — list pending apt updates on a PVE node, plus admin
 * actions to refresh the index ("apt update") and apply pending upgrades
 * ("apt dist-upgrade"). Drives the existing pdm_cluster endpoints.
 *
 * Refresh + Upgrade return PVE task UPIDs which we surface via a toast
 * so the operator can follow up on /tasks if they want progress.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
}

interface AptPkg {
  Package?: string;
  OldVersion?: string;
  Version?: string;
  Description?: string;
  Origin?: string;
  Section?: string;
  Title?: string;
}

export function AptUpdatesModal({ open, onClose, clusterId, node }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';

  const [pkgs, setPkgs] = useState<AptPkg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<'refresh' | 'upgrade' | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const reload = async () => {
    if (!clusterId || !node) return;
    setLoading(true); setError(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/apt`,
        { credentials: 'same-origin' }
      );
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      const data = await r.json();
      setPkgs((data.updates || []) as AptPkg[]);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) reload();
  }, [open, clusterId, node]);  // eslint-disable-line

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const doRefresh = async () => {
    if (!isAdmin) return;
    setBusy('refresh');
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/apt/refresh`,
        { method: 'POST', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
      showToast(language === 'zh-TW' ? `已啟動 apt update（${d.upid?.slice(0, 24) || ''}）` : `apt update kicked off (${d.upid?.slice(0, 24) || ''})`);
      // Re-pull the package list a second after the task should have completed.
      setTimeout(reload, 8000);
    } catch (e: any) {
      dialog.alert(e.message || String(e));
    } finally {
      setBusy(null);
    }
  };

  /**
   * PVE has no API that applies pending updates: /nodes/{node}/apt offers only
   * changelog / repositories / update / versions, so the POST this used to
   * make returned "501 not implemented" on every PVE version (issue #3).
   *
   * PVE's own web UI runs a dist-upgrade by opening a terminal on
   * `pveupgrade --shell`, and that is what we do -- same termproxy the host
   * shell already uses, with cmd=upgrade. It needs no SSH key, and apt stays
   * interactive, so the operator sees the package list and answers any
   * config-file prompt themselves.
   *
   * For unattended, orchestrated upgrades across a whole cluster (evacuate ->
   * apt -> reboot -> migrate back) the host upgrade tool remains the right
   * path; it drives apt over SSH with the non-interactive dpkg flags.
   */
  const doUpgrade = async () => {
    if (!isAdmin) return;
    const ok = await dialog.confirm(
      language === 'zh-TW'
        ? `在 ${node} 上開啟升級主控台？將執行 pveupgrade --shell（等同 apt dist-upgrade），升級過程會在新分頁中互動進行，需要您親自確認。建議先在備援節點測試。`
        : `Open an upgrade console on ${node}? This runs pveupgrade --shell (apt dist-upgrade) interactively in a new tab, so you drive it yourself. Test on a spare node first.`,
      { destructive: true }
    );
    if (!ok) return;
    setBusy('upgrade');
    try {
      const r = await fetch('/api/console/host/prepare', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cluster_id: clusterId, node, cmd: 'upgrade' }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.message || d.error || `HTTP ${r.status}`);
      const url = `/console-host/${encodeURIComponent(clusterId)}/${encodeURIComponent(node)}`
        + `?ct=${encodeURIComponent(d.console_token)}&cmd=upgrade&lang=${encodeURIComponent(language)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      showToast(language === 'zh-TW' ? '已開啟升級主控台' : 'upgrade console opened');
    } catch (e: any) {
      dialog.alert(e.message || String(e));
    } finally {
      setBusy(null);
    }
  };

  if (!open) return null;
  const fl = filter.trim().toLowerCase();
  const visible = fl
    ? pkgs.filter((p) => (p.Package || '').toLowerCase().includes(fl)
        || (p.Description || '').toLowerCase().includes(fl))
    : pkgs;

  return (
    <div className="apt-back" onClick={onClose}>
      <div className="apt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="apt-head">
          <div className="apt-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>{t('apt.title')}</span>
            <span className="apt-target">{node}</span>
          </div>
          <div className="apt-actions">
            <input
              className="apt-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t('apt.filter_ph')}
            />
            <button className="apt-btn" onClick={reload} disabled={loading || busy !== null}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>{t('apt.btn_reload')}</span>
            </button>
            {isAdmin && (
              <>
                <button className="apt-btn" onClick={doRefresh} disabled={busy !== null}>
                  <span>{t('apt.btn_refresh')}</span>
                </button>
                <button className="apt-btn primary" onClick={doUpgrade} disabled={busy !== null || pkgs.length === 0}>
                  <span>{t('apt.btn_upgrade')}</span>
                </button>
              </>
            )}
            <button className="apt-close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="apt-meta">
          <span>{visible.length}{filter && ` / ${pkgs.length}`} {t('apt.pkgs')}</span>
          {!isAdmin && <span className="apt-readonly">{t('apt.readonly')}</span>}
          {toast && <span className="apt-toast">{toast}</span>}
        </div>
        <div className="apt-body">
          {error && <div className="apt-error">{error}</div>}
          {loading && pkgs.length === 0 && <div className="apt-empty">{t('apt.loading')}</div>}
          {!loading && pkgs.length === 0 && !error && (
            <div className="apt-empty">{t('apt.uptodate')}</div>
          )}
          {visible.length > 0 && (
            <table className="apt-table">
              <thead>
                <tr>
                  <th>{t('apt.col.package')}</th>
                  <th>{t('apt.col.from')}</th>
                  <th>{t('apt.col.to')}</th>
                  <th>{t('apt.col.section')}</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((p) => (
                  <tr key={p.Package} title={p.Description || ''}>
                    <td className="apt-mono apt-name">{p.Package}</td>
                    <td className="apt-mono">{p.OldVersion || '—'}</td>
                    <td className="apt-mono apt-newver">{p.Version || '—'}</td>
                    <td className="apt-mono apt-section">{p.Section || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <style>{`
          .apt-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .apt-modal { width: min(960px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: apt-in .18s ease-out; overflow: hidden; }
          @keyframes apt-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .apt-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; border-bottom: 1px solid rgba(0,240,255,.16); flex-wrap: wrap; }
          .apt-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .apt-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .apt-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
          .apt-filter { padding: 5px 10px; min-width: 200px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .apt-filter:focus { border-color: var(--primary); }
          .apt-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .apt-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
          .apt-btn:disabled { opacity: .4; cursor: not-allowed; }
          .apt-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border-color: transparent; }
          .apt-btn.primary:hover:not(:disabled) { box-shadow: 0 0 14px rgba(0, 240, 255, 0.4); }
          .apt-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .apt-close:hover { color: var(--primary); }
          .apt-meta { padding: 6px 18px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0, 240, 255, .08); display: flex; gap: 14px; align-items: center; }
          .apt-readonly { color: var(--warning); }
          .apt-toast { color: var(--success); }

          .apt-body { flex: 1; overflow: auto; padding: 6px 0; }
          .apt-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .apt-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }

          .apt-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .apt-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .apt-table th { padding: 6px 14px; text-align: left; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .apt-table td { padding: 4px 14px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .apt-table tbody tr:hover { background: rgba(0,240,255,.04); }
          .apt-name { color: var(--primary); }
          .apt-newver { color: var(--success); }
          .apt-section { color: var(--text-secondary); font-size: 12.5px; }
        `}</style>
      </div>
    </div>
  );
}
