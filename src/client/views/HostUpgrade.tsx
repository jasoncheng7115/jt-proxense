/**
 * HostUpgrade — batch PVE host upgrade orchestrator (admin only).
 *
 * Three modes:
 *   - List: past + active jobs for the selected cluster
 *   - Wizard: create a new job (pick hosts, target mode, migrate-back)
 *   - Detail: live progress per host + reboot-confirmation prompts
 *
 * Polls /api/clusters/{cid}/upgrade-jobs/{id} every 4s while the job is
 * running. Once 'done' / 'aborted', polling stops.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { useAuth } from '../composables/useAuth';
import { useDialogs } from '../composables/useDialogs';
import { CyberSelect } from '../components/CyberSelect';
import type { ClusterData } from '../types';

// Job / node status enums → translated label (so zh-TW users don't see raw
// English like "awaiting_reboot"). Unknown values pass through verbatim.
const _UP_ST = new Set([
  'pending', 'queued', 'running', 'evacuating', 'updating', 'awaiting_reboot',
  'rebooting', 'restoring', 'done', 'failed', 'skipped', 'aborted',
]);
const stLabel = (t: (k: string) => string, s: string): string =>
  _UP_ST.has(s) ? t(`upgrade.st.${s}`) : s;


// ─── Types matching server payloads ────────────────────────────────
interface JobOptions {
  target_mode: 'auto' | 'manual' | 'in_place';
  target_manual: Record<string, string>;
  migrate_back: boolean;
  ceph_aware?: boolean;
  reboot_policy: string;
  apt_cmd: string;
}
interface JobSummary {
  id: number;
  cluster_id: string;
  created_by: string;
  created_at: number;
  started_at: number | null;
  finished_at: number | null;
  status: 'pending' | 'running' | 'done' | 'failed' | 'aborted';
  options: JobOptions;
  nodes: string[];
  node_total?: number;
  node_failed?: number;
}
type NodeStatus =
  | 'queued' | 'evacuating' | 'updating' | 'awaiting_reboot'
  | 'rebooting' | 'restoring' | 'done' | 'failed' | 'skipped';
interface NodeStep {
  id: number;
  job_id: number;
  node: string;
  ordinal: number;
  status: NodeStatus;
  target_node: string | null;
  started_at: number | null;
  finished_at: number | null;
  error: string | null;
  detail: Record<string, any>;
  events?: Array<{ ts: number; kind: string; message: string }>;
}
interface JobDetail extends JobSummary { node_steps: NodeStep[] }


// ─── Helpers ───────────────────────────────────────────────────────
function fmtTime(s: number | null): string {
  if (!s) return '—';
  const d = new Date(s * 1000);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getMonth() + 1}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}
function fmtDuration(start: number | null, end: number | null): string {
  if (!start) return '—';
  const e = end || Math.floor(Date.now() / 1000);
  const s = Math.max(0, e - start);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
}
const STATUS_TONE: Record<NodeStatus, 'queued' | 'active' | 'pause' | 'ok' | 'fail'> = {
  queued: 'queued',
  evacuating: 'active', updating: 'active', rebooting: 'active', restoring: 'active',
  awaiting_reboot: 'pause',
  done: 'ok',
  failed: 'fail', skipped: 'fail',
};


// ────────────────────────────────────────────────────── component
interface Props {
  cluster: ClusterData | null;
  clusters: Record<string, ClusterData> | null;
}

export function HostUpgrade({ cluster, clusters }: Props) {
  const { t } = useTranslation();
  const auth = useAuth();
  const dialog = useDialogs();

  // Effective cluster (single mode or all-clusters: pick first).
  const clusterId = useMemo(() => {
    if (cluster) return cluster.id;
    if (clusters) {
      const ids = Object.keys(clusters);
      return ids[0] || '';
    }
    return '';
  }, [cluster, clusters]);

  // Available cluster list for the picker dropdown.
  const clusterOptions = useMemo(() => {
    if (clusters) {
      return Object.entries(clusters).map(([id, c]) => ({
        value: id, label: c.name || id,
      }));
    }
    if (cluster) return [{ value: cluster.id, label: cluster.name || cluster.id }];
    return [];
  }, [cluster, clusters]);

  const [selectedCluster, setSelectedCluster] = useState<string>(clusterId);
  useEffect(() => { if (clusterId && !selectedCluster) setSelectedCluster(clusterId); }, [clusterId, selectedCluster]);

  const activeCluster = (clusters && clusters[selectedCluster]) || cluster;

  const [mode, setMode] = useState<'list' | 'wizard' | 'detail'>('list');
  const [activeJobId, setActiveJobId] = useState<number | null>(null);

  // Admin gate — endpoints are 403 otherwise but show a friendlier banner.
  const isAdmin = auth.user?.role_global === 'admin';

  if (!isAdmin) {
    return (
      <div className="hu-page">
        <div className="hu-no-perm">
          <div className="hu-title font-display">{t('upgrade.title')}</div>
          <p>{t('upgrade.admin_only')}</p>
        </div>
        <style>{styleBlock}</style>
      </div>
    );
  }

  return (
    <div className="hu-page">
      <div className="hu-header">
        <div>
          <h1 className="hu-title font-display">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v8m0 0l-3-3m3 3l3-3"/>
              <path d="M3 14v4a2 2 0 002 2h14a2 2 0 002-2v-4"/>
            </svg>
            {t('upgrade.title')}
          </h1>
          <div className="hu-sub">{t('upgrade.subtitle')}</div>
        </div>
        <div className="hu-cluster">
          <label className="hu-cluster-lbl">{t('upgrade.cluster')}</label>
          <CyberSelect
            value={selectedCluster}
            options={clusterOptions}
            onChange={(v) => { setSelectedCluster(v); setMode('list'); setActiveJobId(null); }}
          />
        </div>
      </div>

      {mode === 'list' && (
        <JobList
          clusterId={selectedCluster}
          onCreateNew={() => setMode('wizard')}
          onOpenJob={(id) => { setActiveJobId(id); setMode('detail'); }}
        />
      )}
      {mode === 'wizard' && (
        <Wizard
          cluster={activeCluster}
          clusterId={selectedCluster}
          onCancel={() => setMode('list')}
          onCreated={(jobId) => { setActiveJobId(jobId); setMode('detail'); }}
        />
      )}
      {mode === 'detail' && activeJobId != null && (
        <JobDetail
          clusterId={selectedCluster}
          jobId={activeJobId}
          onBack={() => { setMode('list'); setActiveJobId(null); }}
          dialog={dialog}
        />
      )}

      <style>{styleBlock}</style>
    </div>
  );
}


// ─────────────────────────────────────────────────── job list
function JobList({ clusterId, onCreateNew, onOpenJob }: {
  clusterId: string;
  onCreateNew: () => void;
  onOpenJob: (id: number) => void;
}) {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    if (!clusterId) return;
    setLoading(true); setErr(null);
    try {
      const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/upgrade-jobs`,
        { credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setJobs(d.jobs || []);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, [clusterId]);
  useEffect(() => {
    const i = setInterval(load, 10_000);
    return () => clearInterval(i);
  }, [clusterId]);

  return (
    <div className="hu-list">
      <div className="hu-toolbar">
        <button className="hu-btn hu-btn-primary" onClick={onCreateNew}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          {t('upgrade.new')}
        </button>
        <button className="hu-btn" onClick={load} disabled={loading}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 11-3-6.7"/><path d="M21 4v5h-5"/>
          </svg>
          {t('upgrade.refresh')}
        </button>
      </div>
      {err && <div className="hu-error">{err}</div>}
      <div className="hu-table-wrap panel-card">
        <table className="vm-table hu-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{t('upgrade.col.created')}</th>
              <th>{t('upgrade.col.creator')}</th>
              <th>{t('upgrade.col.nodes')}</th>
              <th>{t('upgrade.col.status')}</th>
              <th>{t('upgrade.col.duration')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr><td colSpan={7} className="hu-empty">{t('upgrade.empty')}</td></tr>
            )}
            {jobs.map((j) => (
              <tr key={j.id}>
                <td className="hu-mono">{j.id}</td>
                <td className="hu-mono">{fmtTime(j.created_at)}</td>
                <td className="hu-mono">{j.created_by}</td>
                <td className="hu-mono">{j.nodes.length}</td>
                <td>
                  {/* A finished job whose nodes failed must NOT read as a
                      clean green DONE — show the failure count in red. */}
                  {(j.node_failed || 0) > 0 ? (
                    <span className="hu-status hu-status-failed">
                      {j.status === 'done' ? t('upgrade.status.done_failed', { n: j.node_failed ?? 0 })
                                            : `${j.status} · ${j.node_failed}✕`}
                    </span>
                  ) : (
                    <span className={`hu-status hu-status-${j.status}`}>{stLabel(t, j.status)}</span>
                  )}
                </td>
                <td className="hu-mono">{fmtDuration(j.started_at, j.finished_at)}</td>
                <td>
                  <button className="hu-btn hu-btn-sm" onClick={() => onOpenJob(j.id)}>
                    {t('upgrade.open')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────── wizard
function Wizard({ cluster, clusterId, onCancel, onCreated }: {
  cluster: ClusterData | null | undefined;
  clusterId: string;
  onCancel: () => void;
  onCreated: (jobId: number) => void;
}) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [targetMode, setTargetMode] = useState<'auto' | 'manual' | 'in_place'>('auto');
  const [targetManual, setTargetManual] = useState<Record<string, string>>({});
  const [excludeTargets, setExcludeTargets] = useState<Set<string>>(new Set());
  const [migrateBack, setMigrateBack] = useState(true);
  const [cephAware, setCephAware] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const allNodes = useMemo(() => {
    if (!cluster) return [];
    return Object.entries(cluster.nodes).map(([name, n]) => ({
      name,
      online: (n.status || '').toLowerCase() === 'online',
      cpu: n.cpu?.usage_percent || 0,
      mem: (n.memory?.used_bytes || 0) / Math.max(1, n.memory?.total_bytes || 1) * 100,
    }));
  }, [cluster]);

  const toggle = (n: string) => {
    const next = new Set(selected);
    if (next.has(n)) next.delete(n); else next.add(n);
    setSelected(next);
  };

  const submit = async () => {
    if (selected.size === 0) {
      setErr(t('upgrade.err.no_nodes'));
      return;
    }
    setBusy(true); setErr(null);
    try {
      const body: any = {
        nodes: Array.from(selected),
        target_mode: targetMode,
        target_manual: targetMode === 'manual' ? targetManual : {},
        exclude_targets: targetMode === 'auto' ? Array.from(excludeTargets) : [],
        migrate_back: targetMode === 'in_place' ? false : migrateBack,
        ceph_aware: cephAware,
      };
      const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/upgrade-jobs`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      // Auto-start the job right after create.
      await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/upgrade-jobs/${d.job_id}/start`, {
        method: 'POST', credentials: 'same-origin',
      });
      onCreated(d.job_id);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="hu-wizard panel-card">
      <div className="hu-section-title">{t('upgrade.wiz.pick_nodes')}</div>
      <div className="hu-node-grid">
        {allNodes.length === 0 && <div className="hu-empty">{t('upgrade.wiz.no_nodes')}</div>}
        {allNodes.map((n) => (
          <label key={n.name} className={`hu-node-cell ${selected.has(n.name) ? 'on' : ''} ${!n.online ? 'off' : ''}`}>
            <input type="checkbox" checked={selected.has(n.name)} onChange={() => toggle(n.name)}
                   disabled={!n.online} />
            <span className="hu-node-name">{n.name}</span>
            <span className="hu-node-state">{n.online ? t('upgrade.online') : t('upgrade.offline')}</span>
            <span className="hu-node-load">CPU {n.cpu.toFixed(0)}% · MEM {n.mem.toFixed(0)}%</span>
          </label>
        ))}
      </div>

      <div className="hu-section-title">{t('upgrade.wiz.target')}</div>
      <div className="hu-radio-row">
        <label><input type="radio" checked={targetMode === 'auto'} onChange={() => setTargetMode('auto')} />{t('upgrade.wiz.target_auto')}</label>
        <label><input type="radio" checked={targetMode === 'manual'} onChange={() => setTargetMode('manual')} />{t('upgrade.wiz.target_manual')}</label>
        <label><input type="radio" checked={targetMode === 'in_place'} onChange={() => setTargetMode('in_place')} />{t('upgrade.wiz.target_in_place')}</label>
      </div>
      {targetMode === 'in_place' && (
        <div className="hu-hint">{t('upgrade.wiz.target_in_place_help')}</div>
      )}
      {targetMode === 'auto' && (
        <div className="hu-exclude">
          <div className="hu-exclude-title">{t('upgrade.wiz.exclude_title')}</div>
          <div className="hu-exclude-grid">
            {allNodes.filter((n) => !selected.has(n.name)).map((n) => (
              <label key={n.name}
                     className={`hu-exclude-cell ${excludeTargets.has(n.name) ? 'on' : ''} ${!n.online ? 'off' : ''}`}>
                <input type="checkbox" checked={excludeTargets.has(n.name)}
                       disabled={!n.online}
                       onChange={() => setExcludeTargets((prev) => {
                         const next = new Set(prev);
                         if (next.has(n.name)) next.delete(n.name); else next.add(n.name);
                         return next;
                       })} />
                <span className="hu-node-name">{n.name}</span>
              </label>
            ))}
          </div>
          <div className="hu-hint">{t('upgrade.wiz.exclude_help')}</div>
        </div>
      )}
      {targetMode === 'manual' && (
        <div className="hu-manual">
          {Array.from(selected).map((n) => (
            <div className="hu-manual-row" key={n}>
              <span className="hu-manual-from">{n}</span>
              <span className="hu-manual-arrow">→</span>
              <CyberSelect
                value={targetManual[n] || ''}
                options={[{ value: '', label: t('upgrade.wiz.pick_target') },
                  ...allNodes.filter((x) => x.name !== n && x.online)
                            .map((x) => ({ value: x.name, label: x.name }))]}
                onChange={(v) => setTargetManual({ ...targetManual, [n]: v })}
              />
            </div>
          ))}
        </div>
      )}

      <div className="hu-section-title">{t('upgrade.wiz.options')}</div>
      {targetMode === 'in_place' ? (
        <div className="hu-hint">{t('upgrade.wiz.migrate_back_na')}</div>
      ) : (
        <>
          <label className="hu-check">
            <input type="checkbox" checked={migrateBack} onChange={(e) => setMigrateBack(e.target.checked)} />
            {t('upgrade.wiz.migrate_back')}
          </label>
          <div className="hu-hint">{t('upgrade.wiz.migrate_back_help')}</div>
        </>
      )}
      <label className="hu-check">
        <input type="checkbox" checked={cephAware} onChange={(e) => setCephAware(e.target.checked)} />
        {t('upgrade.wiz.ceph_aware')}
      </label>
      <div className="hu-hint">{t('upgrade.wiz.ceph_aware_help')}</div>

      <div className="hu-warn">
        <strong>{t('upgrade.wiz.warn_title')}</strong>
        <ul>
          <li>{t('upgrade.wiz.warn_rolling')}</li>
          <li>{t('upgrade.wiz.warn_apt')}</li>
          <li>{t('upgrade.wiz.warn_pause')}</li>
        </ul>
      </div>

      {err && <div className="hu-error">{err}</div>}
      <div className="hu-actions">
        <button className="hu-btn" onClick={onCancel} disabled={busy}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          {t('upgrade.cancel')}
        </button>
        <button className="hu-btn hu-btn-primary" onClick={submit} disabled={busy || selected.size === 0}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          {busy ? t('upgrade.creating') : t('upgrade.start')}
        </button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────── job detail
function JobDetail({ clusterId, jobId, onBack, dialog }: {
  clusterId: string; jobId: number; onBack: () => void; dialog: any;
}) {
  const { t } = useTranslation();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const pollRef = useRef<number | null>(null);

  const load = async () => {
    try {
      const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/upgrade-jobs/${jobId}`,
        { credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setJob(d.job);
    } catch (e: any) {
      setErr(e.message || String(e));
    }
  };
  useEffect(() => { load(); }, [jobId]);
  useEffect(() => {
    if (pollRef.current) window.clearInterval(pollRef.current);
    pollRef.current = window.setInterval(() => {
      load();
    }, 4000);
    return () => { if (pollRef.current) window.clearInterval(pollRef.current); };
  }, [jobId]);
  useEffect(() => {
    if (job && (job.status === 'done' || job.status === 'aborted') && pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, [job?.status]);

  const confirmReboot = async (node: string, choice: 'reboot' | 'skip') => {
    const yes = await dialog.confirm(
      (choice === 'reboot' ? t('upgrade.confirm.reboot_msg') : t('upgrade.confirm.skip_msg'))
        .replace('{node}', node),
      { title: choice === 'reboot' ? t('upgrade.confirm.reboot_title') : t('upgrade.confirm.skip_title') },
    );
    if (!yes) return;
    await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/upgrade-jobs/${jobId}/nodes/${encodeURIComponent(node)}/confirm-reboot`, {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ choice }),
    });
    load();
  };

  const abortJob = async () => {
    // confirm(body, opts) — body MUST be a string. Passing an object
    // here rendered it as a React child and white-screened the page.
    const yes = await dialog.confirm(t('upgrade.abort.msg'), {
      title: t('upgrade.abort.title'),
      destructive: true,
    });
    if (!yes) return;
    await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/upgrade-jobs/${jobId}/abort`,
      { method: 'POST', credentials: 'same-origin' });
    load();
  };

  if (err) return <div className="hu-error">{err}</div>;
  if (!job) return <div className="hu-empty">{t('upgrade.loading')}</div>;

  return (
    <div className="hu-detail">
      <div className="hu-detail-head">
        <button className="hu-btn hu-btn-sm" onClick={onBack}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          {t('upgrade.back')}
        </button>
        <div className="hu-detail-title">
          {t('upgrade.job')} #{job.id} · <span className={`hu-status hu-status-${job.status}`}>{stLabel(t, job.status)}</span>
        </div>
        {(job.status === 'pending' || job.status === 'running') && (
          <button className="hu-btn hu-btn-danger hu-btn-sm" onClick={abortJob}>
            {t('upgrade.abort.btn')}
          </button>
        )}
      </div>

      <div className="hu-node-list">
        {(job.node_steps || []).map((s) => (
          <NodeStepCard key={s.id} step={s} onConfirm={confirmReboot} t={t} />
        ))}
      </div>
    </div>
  );
}


function NodeStepCard({ step, onConfirm, t }: {
  step: NodeStep;
  onConfirm: (node: string, choice: 'reboot' | 'skip') => void;
  t: (k: string) => string;
}) {
  const tone = STATUS_TONE[step.status] || 'queued';
  const [expanded, setExpanded] = useState(step.status === 'awaiting_reboot');
  useEffect(() => {
    if (step.status === 'awaiting_reboot') setExpanded(true);
  }, [step.status]);

  return (
    <div className={`hu-node-card hu-tone-${tone} panel-card`}>
      <div className="hu-node-card-head" onClick={() => setExpanded(!expanded)}>
        <span className="hu-node-card-name">#{step.ordinal} {step.node}</span>
        <span className={`hu-status hu-status-${step.status}`}>{stLabel(t, step.status)}</span>
        {step.target_node && (
          <span className="hu-node-target">→ {step.target_node}</span>
        )}
        <span className="hu-node-card-dur">{fmtDuration(step.started_at, step.finished_at)}</span>
        <span className="hu-node-card-toggle">{expanded ? '−' : '+'}</span>
      </div>
      {step.status === 'awaiting_reboot' && (
        <div className="hu-reboot-prompt">
          <div className="hu-reboot-msg">
            {step.detail.reboot_required
              ? t('upgrade.prompt.reboot_required')
              : t('upgrade.prompt.reboot_optional')}
          </div>
          <div className="hu-reboot-actions">
            <button className="hu-btn" onClick={() => onConfirm(step.node, 'skip')}>
              {t('upgrade.prompt.skip')}
            </button>
            <button className="hu-btn hu-btn-primary" onClick={() => onConfirm(step.node, 'reboot')}>
              {t('upgrade.prompt.reboot')}
            </button>
          </div>
        </div>
      )}
      {step.error && <div className="hu-error hu-node-error">{step.error}</div>}
      {expanded && (
        <div className="hu-node-detail">
          {step.detail.evacuated && (
            <div className="hu-evac">
              <div className="hu-section-title">{t('upgrade.evacuated')}</div>
              <ul>
                {step.detail.evacuated.map((e: any, i: number) => (
                  <li key={i} className={e.ok ? '' : 'fail'}>
                    {e.type}/{e.vmid} → {e.target} · {e.exitstatus || e.detail || '?'}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {step.detail.restored && (
            <div className="hu-evac">
              <div className="hu-section-title">{t('upgrade.restored')}</div>
              <ul>
                {step.detail.restored.map((e: any, i: number) => (
                  <li key={i} className={e.ok ? '' : 'fail'}>
                    {e.type}/{e.vmid} · {e.exitstatus || e.detail || '?'}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {step.events && step.events.length > 0 && (
            <div className="hu-events">
              <div className="hu-section-title">{t('upgrade.events')}</div>
              <pre className="hu-events-log">
                {step.events.map((e) =>
                  `${fmtTime(e.ts)} [${e.kind.toUpperCase()}] ${e.message}`
                ).join('\n')}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ─── Styling (no emojis, cyberpunk panel-card aesthetic) ─────────
const styleBlock = `
.hu-page {
  flex: 1; min-height: 0;
  display: flex; flex-direction: column;
  padding: 24px 32px; gap: 16px;
}
.hu-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 24px; flex-wrap: wrap;
  margin-bottom: var(--spacing-md);
}
/* Title matches the list-page canon (PveTasks / BackupJobs / Health):
   text-primary 22px h1 + pulsing cyan icon. */
.hu-title {
  display: flex; align-items: center; gap: var(--spacing-sm);
  font-size: 22px; font-weight: 600; letter-spacing: .12em;
  color: var(--text-primary);
  margin: 0;
}
.hu-title svg {
  stroke: var(--primary);
  filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
  animation: hu-title-pulse 2s ease-in-out infinite;
}
@keyframes hu-title-pulse {
  0%, 100% { opacity: 0.85; transform: none; }
  50%      { opacity: 1;    transform: scale(1.05); }
}
.hu-sub {
  font-family: var(--font-mono); font-size: 12px;
  color: var(--text-secondary); margin-top: 4px;
}
.hu-cluster { display: flex; align-items: center; gap: 10px; }
.hu-cluster-lbl {
  font-family: var(--font-display); font-size: 11px;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--text-muted);
}
.hu-no-perm {
  margin: 80px auto; text-align: center;
  font-family: var(--font-mono); font-size: 14px;
  color: var(--text-secondary); max-width: 480px;
}

.hu-toolbar {
  display: flex; gap: 10px; align-items: center;
  margin-bottom: 14px;   /* breathing room between toolbar and table */
}
.hu-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 16px;
  font-family: var(--font-display); font-size: 12px;
  letter-spacing: .08em; text-transform: uppercase;
  background: rgba(0, 240, 255, 0.06);
  color: var(--text-secondary);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 3px;
  cursor: pointer;
  transition: all .12s;
}
.hu-btn:hover:not(:disabled) {
  background: rgba(0, 240, 255, 0.12);
  color: var(--primary);
  border-color: var(--primary);
}
.hu-btn:disabled { opacity: .4; cursor: not-allowed; }
.hu-btn-primary {
  background: var(--primary); color: #001018;
  border-color: var(--primary);
}
.hu-btn-primary:hover:not(:disabled) {
  background: var(--primary); color: #001018;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.45);
}
.hu-btn-danger {
  color: var(--danger, #ff4d6d);
  border-color: var(--danger, #ff4d6d);
}
.hu-btn-danger:hover:not(:disabled) {
  background: rgba(255, 77, 109, 0.15);
}
.hu-btn-sm { padding: 4px 12px; font-size: 11px; }

.hu-error {
  padding: 9px 14px;
  border: 1px solid var(--danger, #ff4d6d);
  border-left-width: 3px;
  background: rgba(255, 77, 109, 0.08);
  color: var(--danger, #ff4d6d);
  font-family: var(--font-mono); font-size: 12px;
  border-radius: 3px;
}
.hu-empty {
  padding: 30px 12px; text-align: center;
  font-family: var(--font-mono); font-size: 13px;
  color: var(--text-muted); font-style: italic;
}

.hu-table-wrap { overflow: auto; }
/* Header/row/cell look now inherited from the canonical .vm-table (styles.css);
   the bespoke .hu-table th/td rules were removed so the job list matches the
   tasks/backups/users tables (house standard, CLAUDE.md v0.8.3). */
.hu-mono { font-family: var(--font-mono); }

.hu-status {
  display: inline-block; padding: 2px 10px;
  font-family: var(--font-display); font-size: 10px;
  letter-spacing: .1em; text-transform: uppercase;
  border-radius: 999px; border: 1px solid currentColor;
}
.hu-status-pending, .hu-status-queued { color: var(--text-muted); }
.hu-status-running, .hu-status-evacuating, .hu-status-updating,
.hu-status-rebooting, .hu-status-restoring { color: var(--primary); background: rgba(0,240,255,.08); }
.hu-status-awaiting_reboot { color: var(--warning); background: rgba(255, 107, 0, 0.10); }
.hu-status-done { color: var(--success, #00ff88); background: rgba(0, 255, 136, 0.08); }
.hu-status-failed, .hu-status-aborted, .hu-status-skipped {
  /* Was white-on-solid-#ff0040 with an 8px glow -- the only badge in the app
     painted that way, and at 10px with letter-spacing the glow bled into the
     glyphs and made the label hard to read. Match the house pattern the other
     states already use: coloured text on a translucent bed. */
  color: #ff5c7a; background: rgba(255, 0, 64, 0.12);
  border-color: rgba(255, 0, 64, 0.55);
  font-weight: 600;
}

/* ─── Wizard ─────────────────────────────────────────── */
.hu-wizard { padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; }
.hu-section-title {
  font-family: var(--font-display); font-size: 14px;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--primary);
  text-shadow: 0 0 6px rgba(0,240,255,.35);
  padding-bottom: 6px; margin-top: 8px;
  border-bottom: 1px solid rgba(0,240,255,.22);
}
.hu-node-grid {
  display: grid; gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.hu-node-cell {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 4px 10px;
  padding: 10px 14px;
  border: 1px solid rgba(0, 240, 255, 0.18);
  border-radius: 4px;
  background: rgba(0, 240, 255, 0.03);
  cursor: pointer; transition: all .12s;
  font-family: var(--font-mono); font-size: 14px;
}
.hu-node-cell:hover { border-color: var(--primary); background: rgba(0,240,255,.08); }
.hu-node-cell.on   { border-color: var(--primary); background: rgba(0,240,255,.14); }
.hu-node-cell.off  { opacity: .4; cursor: not-allowed; }
.hu-node-cell input { accent-color: var(--primary); }
.hu-node-name { color: var(--primary); font-weight: 600; }
.hu-node-state {
  justify-self: end;
  font-family: var(--font-display); font-size: 12px;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-muted);
}
.hu-node-load { grid-column: 2 / 4; color: var(--text-muted); font-size: 13px; }

.hu-exclude { display: flex; flex-direction: column; gap: 8px; }
.hu-exclude-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .06em; color: var(--text-secondary); }
.hu-exclude-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.hu-exclude-cell {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 5px 12px; border-radius: 4px;
  border: 1px solid rgba(0, 240, 255, 0.18); background: rgba(0, 240, 255, 0.03);
  font-family: var(--font-mono); font-size: 13px; cursor: pointer; transition: all .12s;
}
.hu-exclude-cell:hover { border-color: var(--primary); }
.hu-exclude-cell.on { border-color: var(--danger, #ff4d6d); background: rgba(255, 77, 109, 0.12); color: var(--danger, #ff4d6d); }
.hu-exclude-cell.off { opacity: .4; cursor: not-allowed; }
.hu-exclude-cell input { accent-color: var(--danger, #ff4d6d); }
.hu-radio-row { display: flex; gap: 24px; font-family: var(--font-mono); font-size: 14px; }
.hu-radio-row label { display: inline-flex; gap: 7px; align-items: center; cursor: pointer; }
.hu-radio-row input { accent-color: var(--primary); }

.hu-manual {
  display: flex; flex-direction: column; gap: 8px;
  padding: 10px 14px; background: rgba(0, 240, 255, 0.03);
  border: 1px dashed rgba(0, 240, 255, 0.18); border-radius: 3px;
}
.hu-manual-row { display: flex; align-items: center; gap: 12px; }
.hu-manual-from { font-family: var(--font-mono); color: var(--primary); min-width: 110px; }
.hu-manual-arrow { color: var(--text-muted); }

.hu-check {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: 14px;
  cursor: pointer;
}
.hu-check input { accent-color: var(--primary); }
.hu-hint {
  font-family: var(--font-mono); font-size: 13px;
  color: var(--text-muted); margin-left: 24px;
}

.hu-warn {
  padding: 12px 18px;
  border: 1px solid var(--warning);
  border-left-width: 3px;
  background: rgba(255, 107, 0, 0.06);
  color: var(--warning);
  font-family: var(--font-mono); font-size: 13px;
  border-radius: 3px;
}
.hu-warn strong {
  font-family: var(--font-display); font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase;
}
.hu-warn ul { margin: 6px 0 0 18px; padding: 0; }
.hu-warn li { color: #ffd9b3; line-height: 1.55; }

.hu-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }

/* ─── Detail ─────────────────────────────────────────── */
.hu-detail { display: flex; flex-direction: column; gap: 14px; }
.hu-detail-head {
  display: flex; align-items: center; gap: 14px;
  font-family: var(--font-display); font-size: 14px;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--primary);
}
.hu-detail-title { flex: 1; }

.hu-node-list { display: flex; flex-direction: column; gap: 10px; }
.hu-node-card { padding: 0; overflow: hidden; }
.hu-node-card-head {
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  gap: 14px; align-items: center;
  padding: 12px 18px; cursor: pointer;
  font-family: var(--font-mono); font-size: 13px;
}
.hu-node-card-head:hover { background: rgba(0,240,255,.04); }
.hu-node-card-name { color: var(--primary); font-weight: 600; }
.hu-node-target { color: var(--text-secondary); font-size: 12px; }
.hu-node-card-dur { color: var(--text-muted); font-size: 12px; min-width: 60px; text-align: right; }
.hu-node-card-toggle { color: var(--text-muted); font-size: 18px; width: 14px; text-align: center; }

.hu-reboot-prompt {
  padding: 14px 18px;
  background: rgba(255, 107, 0, 0.08);
  border-top: 1px solid rgba(255, 107, 0, 0.3);
  border-bottom: 1px solid rgba(255, 107, 0, 0.3);
  display: flex; flex-direction: column; gap: 10px;
}
.hu-reboot-msg {
  font-family: var(--font-mono); font-size: 13px;
  color: var(--warning);
}
.hu-reboot-actions { display: flex; gap: 10px; justify-content: flex-end; }

.hu-node-error {
  margin: 8px 18px;
}
.hu-node-detail {
  padding: 12px 18px 14px;
  border-top: 1px solid rgba(0, 240, 255, 0.08);
  display: flex; flex-direction: column; gap: 12px;
}
.hu-evac ul { margin: 4px 0 0 18px; padding: 0; font-family: var(--font-mono); font-size: 12px; }
.hu-evac li { color: var(--text-secondary); line-height: 1.6; }
.hu-evac li.fail { color: var(--danger, #ff4d6d); }
.hu-events-log {
  margin: 4px 0 0 0;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(0, 240, 255, 0.12);
  border-radius: 3px;
  font-family: var(--font-mono); font-size: 11px;
  color: var(--text-secondary);
  max-height: 240px; overflow: auto;
  white-space: pre-wrap; word-break: break-word;
}
`;
