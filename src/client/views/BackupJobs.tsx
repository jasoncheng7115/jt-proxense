/**
 * BackupJobs — read-only view of cluster-level scheduled vzdump jobs.
 * Read from PVE's /cluster/backup. Lets operators verify backup posture
 * without bouncing to the PVE web UI.
 */
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';
import { CyberSelect } from '../components/CyberSelect';
import type { ClusterData } from '../types';

interface Job {
  id: string;
  schedule?: string;
  storage?: string;
  vmid?: string;
  all?: number | string;
  node?: string;
  pool?: string;
  mode?: string;
  enabled?: boolean;
  comment?: string;
  next_run?: number;
  starttime?: string;     // older PVE returns "HH:MM" in this
  dow?: string;            // dow + starttime are the legacy fields
}

interface Props {
  clusters: Record<string, ClusterData>;
  selectedCluster: string | null;
}

// PVE keeps computing next-run for DISABLED jobs too, so print it only when
// the job would actually fire — otherwise the table promises a run that the
// "enabled" column in the same row says will never happen.
const fmtNext = (s?: number, enabled?: boolean) => {
  if (!s || enabled === false) return '—';
  const d = new Date(s * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
    + `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export function BackupJobs({ clusters, selectedCluster }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';
  const clusterIds = useMemo(() => Object.keys(clusters), [clusters]);
  const [clusterId, setClusterId] = useState<string>(() => {
    if (selectedCluster && selectedCluster !== '__all__' && clusters[selectedCluster]) {
      return selectedCluster;
    }
    return clusterIds[0] || '';
  });

  useEffect(() => {
    if (!selectedCluster || selectedCluster === '__all__') return;
    if (clusters[selectedCluster] && selectedCluster !== clusterId) {
      setClusterId(selectedCluster);
    }
  }, [selectedCluster]);  // eslint-disable-line react-hooks/exhaustive-deps

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterEnabled, setFilterEnabled] = useState<'all' | 'enabled' | 'disabled'>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    schedule: '*/30', storage: '', vmid: '', all_vms: false,
    mode: 'snapshot', mailto: '', comment: '',
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const reload = useCallback(async (force: boolean = false) => {
    if (!clusterId) return;
    setLoading(true); setError(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/backup-jobs${force ? '?force=1' : ''}`,
        { credentials: 'same-origin' }
      );
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      const data = await r.json();
      setJobs(data.jobs || []);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, [clusterId]);

  useEffect(() => { reload(false); }, [reload]);

  const visibleJobs = useMemo(() => {
    if (filterEnabled === 'all') return jobs;
    return jobs.filter((j) =>
      filterEnabled === 'enabled' ? j.enabled : !j.enabled
    );
  }, [jobs, filterEnabled]);

  return (
    <div className="bj-page">
      <div className="bj-header">
        <div className="title-section">
          <h1 className="bj-title font-display">
            <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="6" rx="8" ry="3" />
              <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
              <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
            </svg>
            {t('bjobs.title')}
          </h1>
          <div className="bj-sub">{t('bjobs.subtitle')}</div>
        </div>
        <div className="bj-actions">
          {isAdmin && (
            <button className="bj-btn" onClick={() => { setShowAdd(true); setError(null); }}>+ {t('bjobs.add')}</button>
          )}
          <button className="bj-btn" onClick={() => reload(true)} disabled={loading}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span>{t('tasks.refresh')}</span>
          </button>
        </div>
      </div>
      {showAdd && isAdmin && (
        <div className="bj-modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="bj-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bj-modal-head">
              <span>+ {t('bjobs.add')}</span>
              <button className="bj-modal-x" onClick={() => setShowAdd(false)} aria-label="close">×</button>
            </div>
            <div className="bj-modal-body">
              {error && <div className="bj-error">{error}</div>}
              <label className="bj-field">
                <span>{language === 'zh-TW' ? '排程（cron）' : 'Schedule (cron)'}</span>
                <input placeholder="*/30 or daily or 02:00" value={form.schedule}
                       onChange={(e) => setForm({ ...form, schedule: e.target.value })} />
              </label>
              <label className="bj-field">
                <span>{language === 'zh-TW' ? '儲存目標' : 'Storage (target)'}</span>
                <input placeholder="storage" value={form.storage}
                       onChange={(e) => setForm({ ...form, storage: e.target.value })} />
              </label>
              <label className="bj-field">
                <span>{language === 'zh-TW' ? 'VMID（留空＝全部）' : 'VMID (empty = all)'}</span>
                <input placeholder="116,134,151…" value={form.vmid} disabled={form.all_vms}
                       onChange={(e) => setForm({ ...form, vmid: e.target.value })} />
              </label>
              <label className="bj-check">
                <input type="checkbox" checked={form.all_vms}
                       onChange={(e) => setForm({ ...form, all_vms: e.target.checked })} />
                <span>{language === 'zh-TW' ? '備份全部 VM' : 'All VMs'}</span>
              </label>
              <label className="bj-field">
                <span>{language === 'zh-TW' ? '模式' : 'Mode'}</span>
                <CyberSelect
                  value={form.mode}
                  options={[
                    { value: 'snapshot', label: 'snapshot' },
                    { value: 'suspend', label: 'suspend' },
                    { value: 'stop', label: 'stop' },
                  ]}
                  onChange={(v) => setForm({ ...form, mode: v })}
                />
              </label>
              <label className="bj-field">
                <span>{language === 'zh-TW' ? '通知信箱' : 'Mailto'}</span>
                <input placeholder="ops@example.com" value={form.mailto}
                       onChange={(e) => setForm({ ...form, mailto: e.target.value })} />
              </label>
              <label className="bj-field">
                <span>{language === 'zh-TW' ? '註解' : 'Comment'}</span>
                <input placeholder={language === 'zh-TW' ? '選填' : 'optional'} value={form.comment}
                       onChange={(e) => setForm({ ...form, comment: e.target.value })} />
              </label>
            </div>
            <div className="bj-modal-actions">
              <button className="bj-btn" onClick={() => setShowAdd(false)}>{t('bjobs.cancel')}</button>
              <button className="bj-btn bj-primary" onClick={async () => {
                try {
                  const body: any = {
                    schedule: form.schedule, storage: form.storage,
                    mode: form.mode,
                  };
                  if (form.all_vms) body.all_vms = true;
                  else if (form.vmid) body.vmid = form.vmid;
                  if (form.mailto) body.mailto = form.mailto;
                  if (form.comment) body.comment = form.comment;
                  const r = await fetch(
                    `/api/clusters/${encodeURIComponent(clusterId)}/backup-jobs`,
                    { method: 'POST', credentials: 'same-origin',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(body) }
                  );
                  const d = await r.json().catch(() => ({}));
                  if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                  setShowAdd(false);
                  setForm({ schedule: '*/30', storage: '', vmid: '', all_vms: false,
                            mode: 'snapshot', mailto: '', comment: '' });
                  reload(true);
                } catch (e: any) { setError(e.message || String(e)); }
              }}>{t('bjobs.create')}</button>
            </div>
          </div>
        </div>
      )}

      <div className="bj-filters">
        <label className="bj-f">
          <span>{t('tasks.filter.cluster')}</span>
          <CyberSelect
            value={clusterId}
            options={clusterIds.map((id) => ({ value: id, label: clusters[id]?.name || id }))}
            onChange={(v) => setClusterId(v)}
          />
        </label>
        <label className="bj-f">
          <span>{t('bjobs.filter.enabled')}</span>
          <CyberSelect<'all' | 'enabled' | 'disabled'>
            value={filterEnabled}
            options={[
              { value: 'all', label: t('tasks.filter.all') },
              { value: 'enabled', label: t('bjobs.enabled_yes') },
              { value: 'disabled', label: t('bjobs.enabled_no') },
            ]}
            onChange={(v) => setFilterEnabled(v)}
          />
        </label>
        <span className="bj-count">{visibleJobs.length} / {jobs.length}</span>
      </div>

      {error && <div className="bj-error">{error}</div>}

      <div className="bj-tablewrap panel-card">
        <table className="vm-table bj-table">
          <colgroup>
            <col className="bj-col-id" />
            <col className="bj-col-sched" />
            <col className="bj-col-next" />
            <col className="bj-col-store" />
            <col className="bj-col-scope" />
            <col className="bj-col-mode" />
            <col className="bj-col-on" />
            <col className="bj-col-comment" />
          </colgroup>
          <thead>
            <tr>
              <th>{t('bjobs.col.id')}</th>
              <th>{t('bjobs.col.schedule')}</th>
              <th>{t('bjobs.col.next_run')}</th>
              <th>{t('bjobs.col.storage')}</th>
              <th>{t('bjobs.col.scope')}</th>
              <th>{t('bjobs.col.mode')}</th>
              <th>{t('bjobs.col.enabled')}</th>
              <th>{t('bjobs.col.comment')}</th>
              {isAdmin && <th></th>}
            </tr>
          </thead>
          <tbody>
            {visibleJobs.length === 0 && !loading && (
              <tr><td colSpan={8} className="bj-empty">{t('bjobs.empty')}</td></tr>
            )}
            {visibleJobs.map((j) => {
              const scope = j.all
                ? t('bjobs.scope_all')
                : j.pool
                  ? `${language === 'zh-TW' ? '集區' : 'pool'}: ${j.pool}`
                  : j.vmid
                    ? `vmid: ${j.vmid}`
                    : '—';
              const sched = j.schedule
                || (j.dow && j.starttime ? `${j.dow} ${j.starttime}` : '—');
              return (
                <tr key={j.id} className={j.enabled ? '' : 'dim'}>
                  <td className="bj-mono bj-trunc" title={j.id}>{j.id}</td>
                  <td className="bj-mono">{sched}</td>
                  <td className="bj-mono">{fmtNext(j.next_run, j.enabled)}</td>
                  <td className="bj-mono">{j.storage || '—'}</td>
                  <td className="bj-mono bj-trunc bj-scope" title={scope}>{scope}</td>
                  <td><span className="bj-mode">{j.mode || 'snapshot'}</span></td>
                  <td>
                    <span className={`bj-state ${j.enabled ? 'on' : 'off'}`}>
                      {j.enabled ? t('bjobs.enabled_yes') : t('bjobs.enabled_no')}
                    </span>
                  </td>
                  <td className="bj-mono bj-trunc bj-comment" title={j.comment || ''}>{j.comment || '—'}</td>
                  {isAdmin && (
                    <td>
                      <button className="bj-row-btn" onClick={async () => {
                        // Toggle enabled in-place via PUT.
                        try {
                          const r = await fetch(
                            `/api/clusters/${encodeURIComponent(clusterId)}/backup-jobs/${encodeURIComponent(j.id)}`,
                            { method: 'PUT', credentials: 'same-origin',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ enabled: j.enabled ? 0 : 1 }) }
                          );
                          const d = await r.json().catch(() => ({}));
                          if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                          reload(true);
                        } catch (e: any) {
                          await dialog.alert(`Update failed: ${e.message || e}`);
                        }
                      }}>{j.enabled ? t('bjobs.disable') : t('bjobs.enable')}</button>
                      <button className="bj-row-btn bj-row-del" onClick={async () => {
                        const ok = await dialog.confirm(
                          `Delete backup job ${j.id}? Future runs are cancelled; existing backups remain.`,
                          { title: 'Delete backup job?', destructive: true }
                        );
                        if (!ok) return;
                        try {
                          const r = await fetch(
                            `/api/clusters/${encodeURIComponent(clusterId)}/backup-jobs/${encodeURIComponent(j.id)}`,
                            { method: 'DELETE', credentials: 'same-origin' }
                          );
                          const d = await r.json().catch(() => ({}));
                          if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                          reload(true);
                        } catch (e: any) {
                          await dialog.alert(`Delete failed: ${e.message || e}`);
                        }
                      }}>{t('bjobs.delete')}</button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>{`
        .bj-page { padding: 24px 32px; height: 100%; display: flex; flex-direction: column; gap: 16px; color: var(--text-primary); }
        .bj-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: var(--spacing-md); }
        .title-section { display: flex; flex-direction: column; gap: 2px; }
        .bj-title { display: flex; align-items: center; gap: var(--spacing-sm); margin: 0; font-size: 22px; font-weight: 600; color: var(--text-primary); letter-spacing: 0.12em; }
        .bj-title .title-icon { stroke: var(--primary); filter: drop-shadow(0 0 6px rgba(0,240,255,0.6)); animation: bj-pulse 2s ease-in-out infinite; }
        @keyframes bj-pulse { 0%,100% { opacity: 0.85; transform: none; } 50% { opacity: 1; transform: scale(1.05); } }
        .bj-sub { font-size: 12px; color: var(--text-secondary); font-family: var(--font-mono); margin-top: 4px; }

        .bj-actions { display: flex; gap: 8px; }
        .bj-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
        .bj-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
        .bj-btn:disabled { opacity: .5; cursor: not-allowed; }

        .bj-filters { display: flex; gap: 16px; align-items: flex-end; padding: 12px 14px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; flex-wrap: wrap; }
        .bj-f { display: flex; flex-direction: column; gap: 4px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); }
        .bj-f select { padding: 5px 8px; min-width: 140px; font-family: var(--font-mono); font-size: 12px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; cursor: pointer; }
        .bj-f select option { background: var(--bg-secondary); color: var(--text-primary); }
        .bj-count { margin-left: auto; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); }

        .bj-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 12px; border-radius: 2px; }

        /* Border / radius / bg now provided by .panel-card on the same
         * element — keep only the sizing + scroll behaviour here. */
        .bj-tablewrap { flex: 1; overflow: auto; }
        /* Header / row / cell look inherited from the global .vm-table
           standard (matrix). Only the fixed table-layout (for clean
           truncation via colgroup) and per-cell ellipsis are kept. */
        .bj-table { table-layout: fixed; }
        .bj-table td { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bj-mono { font-family: var(--font-mono); }
        .bj-trunc { overflow: hidden; text-overflow: ellipsis; }
        .bj-empty { text-align: center; padding: 32px 12px; color: var(--text-muted); font-style: italic; }
        .bj-mode { display: inline-block; padding: 2px 10px; border-radius: 2px; font-size: 11px; font-family: var(--font-display); letter-spacing: 0.06em; text-transform: uppercase; background: rgba(224, 102, 255, 0.1); border: 1px solid rgba(224, 102, 255, 0.5); color: var(--accent); }
        .bj-state { display: inline-flex; align-items: center; gap: 6px; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-family: var(--font-mono); border: 1px solid currentColor; }
        .bj-state::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 6px currentColor; }
        .bj-state.on { color: var(--success); }
        .bj-state.off { color: var(--text-muted); }
        /* Create-schedule modal */
        .bj-modal-overlay { position: fixed; inset: 0; z-index: 600; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); }
        .bj-modal { width: 100%; max-width: 440px; max-height: calc(100vh - 48px); display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 8px; box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 60px -20px rgba(0,240,255,0.4); animation: bjModalIn .16s ease-out; }
        @keyframes bjModalIn { from { transform: translateY(12px); opacity: 0 } to { transform: none; opacity: 1 } }
        .bj-modal-head { display: flex; align-items: center; gap: 8px; padding: 14px 16px; background: var(--bg-tertiary); border-bottom: 1px solid var(--border); border-radius: 8px 8px 0 0; font-family: var(--font-display); font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--primary); }
        .bj-modal-head span { margin-right: auto; }
        .bj-modal-x { width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; border-radius: 4px; color: var(--text-secondary); font-size: 18px; line-height: 1; cursor: pointer; }
        .bj-modal-x:hover { color: var(--primary); border-color: var(--primary); background: rgba(0,240,255,0.08); }
        .bj-modal-body { padding: 16px; display: flex; flex-direction: column; gap: 4px; overflow-y: auto; }
        .bj-field { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; }
        .bj-field > span { font-family: var(--font-display); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); }
        .bj-field input { padding: 8px 11px; font-family: var(--font-mono); font-size: 13px; background: #02050b; color: var(--text-primary); border: 1px solid var(--border); border-radius: 4px; outline: none; }
        .bj-field input:focus { border-color: var(--primary); }
        .bj-field input:disabled { opacity: 0.45; cursor: not-allowed; }
        .bj-modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding: 14px 16px; border-top: 1px solid var(--border); }
        .bj-check { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); cursor: pointer; }
        .bj-btn.bj-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
        .bj-btn.bj-primary:hover:not(:disabled) { background: var(--primary); box-shadow: 0 0 10px rgba(0, 240, 255, 0.45); }
        .bj-row-btn { padding: 2px 8px; font-family: var(--font-mono); font-size: 11px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; margin-right: 4px; }
        .bj-row-btn:hover { background: rgba(0, 240, 255, 0.08); }
        .bj-row-btn.bj-row-del { color: var(--danger, #ff4d6d); }
        .bj-row-btn.bj-row-del:hover { background: rgba(255, 77, 109, 0.1); }
        .bj-scope { color: var(--text-secondary); }
        .bj-comment { color: var(--text-secondary); }
        /* Column widths — keep table layout fixed so long values truncate
         * cleanly instead of forcing horizontal scroll. */
        /* Width re-balanced: ID is a truncated UUID so smaller column is
         * fine; storage names + scope (vmid list) often the longest, give
         * them room; mode badge needs ~110px clear so it doesn't bleed
         * into the on/off pill. */
        .bj-col-id      { width: 14%; }
        .bj-col-sched   { width: 10%; }
        .bj-col-next    { width: 10%; }
        .bj-col-store   { width: 16%; }
        .bj-col-scope   { width: 22%; }
        .bj-col-mode    { width: 12%; }
        .bj-col-on      { width: 7%; }
        .bj-col-comment { width: 9%; }
      `}</style>
    </div>
  );
}
