/**
 * PveTasks — view of PVE-side task / VM operation history.
 *
 * Layout:
 *  - Top: filter bar (cluster, type, status, vmid, user, refresh + auto-toggle)
 *  - Main: table styled identically to matrix vm-table (Orbitron header,
 *          sticky thead, mono body) with starttime / type / target / user /
 *          status badges
 *  - Right: drawer with task log when a row is clicked
 *
 * Distinct from /audit (which logs JT-PROXENSE-side actions) — this is the
 * authoritative PVE-side view, including actions taken via PVE web UI /
 * pvesh / API outside our tool. Useful when investigating "why did this VM
 * reboot at 03:14" or "who triggered the migrate of vm 102".
 */
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { ClusterLogModal } from '../components/ClusterLogModal';
import { ExportJobsModal } from '../components/VMExportModal';
import { CyberSelect } from '../components/CyberSelect';
import type { ClusterData } from '../types';

interface PveTask {
  upid: string;
  node: string;
  type: string;
  id?: string;          // typically the VMID for vm-related tasks
  user?: string;
  starttime?: number;
  endtime?: number;
  starttime_ms?: number;
  endtime_ms?: number;
  status?: string;
  _status: 'running' | 'ok' | 'error';
  pid?: number;
}

interface TasksResponse {
  tasks: PveTask[];
  total: number;
  filtered: number;
  types: string[];
  users: string[];
}

interface Props {
  clusters: Record<string, ClusterData>;
  selectedCluster: string | null;
}

const STATUS_LABEL: Record<string, string> = {
  running: 'tasks.filter.running',
  ok: 'tasks.filter.ok',
  error: 'tasks.filter.error',
};

const fmtDuration = (start?: number, end?: number) => {
  if (!start) return '—';
  const e = end ?? Math.floor(Date.now() / 1000);
  const d = e - start;
  if (d < 0) return '—';
  if (d < 60) return `${d}s`;
  if (d < 3600) return `${Math.floor(d / 60)}m ${d % 60}s`;
  const h = Math.floor(d / 3600), m = Math.floor((d % 3600) / 60);
  return `${h}h ${m}m`;
};

const fmtTime = (s?: number) => {
  if (!s) return '—';
  const d = new Date(s * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
    + `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

// Pull initial filter values from URL ?vmid=… so other views can deep-link
// (e.g. VM context menu → "操作紀錄" navigates to /tasks?vmid=102).
const readQuery = (): { vmid: string; cluster: string | null } => {
  if (typeof window === 'undefined') return { vmid: '', cluster: null };
  const p = new URLSearchParams(window.location.search);
  return {
    vmid: p.get('vmid') || '',
    cluster: p.get('cluster'),
  };
};

export function PveTasks({ clusters, selectedCluster }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const initial = useRef(readQuery());

  const clusterIds = useMemo(() => Object.keys(clusters), [clusters]);
  const [clusterId, setClusterId] = useState<string>(() => {
    if (initial.current.cluster && clusters[initial.current.cluster]) {
      return initial.current.cluster;
    }
    if (selectedCluster && selectedCluster !== '__all__' && clusters[selectedCluster]) {
      return selectedCluster;
    }
    return clusterIds[0] || '';
  });

  // Bridge: when global cluster selector changes we follow it (unless user
  // explicitly picked one in this view's local dropdown).
  useEffect(() => {
    if (!selectedCluster || selectedCluster === '__all__') return;
    if (clusters[selectedCluster] && selectedCluster !== clusterId) {
      setClusterId(selectedCluster);
    }
  }, [selectedCluster]);  // eslint-disable-line react-hooks/exhaustive-deps

  const [filterType, setFilterType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'running' | 'ok' | 'error'>('all');
  const [filterVmid, setFilterVmid] = useState<string>(initial.current.vmid);
  const [filterUser, setFilterUser] = useState<string>('');

  const [tasks, setTasks] = useState<PveTask[]>([]);

  // ── Column sorting (same affordance as the matrix table) ─────────
  type TSortField = 'starttime' | 'duration' | 'type' | 'id' | 'node' | 'user' | 'status';
  const [sortField, setSortField] = useState<TSortField>('starttime');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const handleSort = (f: TSortField) => {
    if (sortField === f) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(f);
      // Time-ish columns default to newest/longest first.
      setSortDir(f === 'starttime' || f === 'duration' ? 'desc' : 'asc');
    }
  };
  const sortedTasks = useMemo(() => {
    const dur = (x: PveTask) =>
      ((x.endtime || Math.floor(Date.now() / 1000)) - (x.starttime || 0));
    const cmp: Record<TSortField, (a: PveTask, b: PveTask) => number> = {
      starttime: (a, b) => (a.starttime || 0) - (b.starttime || 0),
      duration: (a, b) => dur(a) - dur(b),
      type: (a, b) => (a.type || '').localeCompare(b.type || ''),
      id: (a, b) => String(a.id || '').localeCompare(String(b.id || '')),
      node: (a, b) => (a.node || '').localeCompare(b.node || ''),
      user: (a, b) => (a.user || '').localeCompare(b.user || ''),
      status: (a, b) => (a._status || '').localeCompare(b._status || ''),
    };
    const arr = [...tasks];
    arr.sort((x, y) => (sortDir === 'asc' ? cmp[sortField](x, y) : cmp[sortField](y, x)));
    return arr;
  }, [tasks, sortField, sortDir]);
  const [types, setTypes] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const [activeTask, setActiveTask] = useState<PveTask | null>(null);
  const [showSyslog, setShowSyslog] = useState(false);
  const [showExportJobs, setShowExportJobs] = useState(false);

  // Resizable split between table (left) and detail panel (right).
  // Persisted to localStorage so the operator's preferred width sticks.
  const [rightPaneWidth, setRightPaneWidth] = useState<number>(() => {
    try {
      const v = localStorage.getItem('jtp.tasks.rightPaneW');
      const n = v ? parseInt(v, 10) : 0;
      if (Number.isFinite(n) && n >= 280 && n <= 1600) return n;
    } catch { /* ignore */ }
    return 480;
  });
  const rightPaneWidthRef = useRef(rightPaneWidth);
  useEffect(() => { rightPaneWidthRef.current = rightPaneWidth; }, [rightPaneWidth]);

  // Diff-based animation state. Tracking by UPID ensures:
  //   - newly-seen UPIDs slide in (rows the user hasn't looked at yet),
  //   - existing UPIDs whose status changed (running → ok/error) get an
  //     in-place status pulse instead of being re-animated as "new",
  //   - filter changes don't reset anything (seen is a true history set).
  const seenUpidsRef = useRef<Set<string>>(new Set());
  const prevStatusRef = useRef<Map<string, string>>(new Map());
  const isFirstLoadRef = useRef(true);
  // Signature of the last setTasks payload. We compare new responses
  // against this and skip the state update if nothing meaningful changed
  // — kills the every-5s re-render churn operators complained about.
  const lastSignatureRef = useRef<string>('');
  const [newUpids, setNewUpids] = useState<Set<string>>(new Set());
  const [changedUpids, setChangedUpids] = useState<Set<string>>(new Set());

  const reload = useCallback(async (force: boolean = false) => {
    if (!clusterId) return;
    setLoading(true); setError(null);
    const params = new URLSearchParams();
    if (filterType) params.set('type', filterType);
    if (filterStatus !== 'all') params.set('status', filterStatus);
    if (filterVmid) params.set('vmid', filterVmid);
    if (filterUser) params.set('user', filterUser);
    params.set('limit', '300');
    if (force) params.set('force', '1');
    try {
      const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/tasks?` + params.toString(),
        { credentials: 'same-origin' });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      const data: TasksResponse = await r.json();
      const rawArr = data.tasks || [];

      // Defensive client-side dedup by UPID. PVE's /cluster/tasks should
      // already return unique UPIDs, but operators have reported "same
      // task showing as multiple rows" — guard the rendering path so a
      // server-side hiccup can't churn the table. Last-wins per UPID
      // (the most recent record for that task identity).
      const byUpid = new Map<string, PveTask>();
      for (const t of rawArr) {
        if (!t.upid) continue;
        byUpid.set(t.upid, t);
      }
      const arr = Array.from(byUpid.values()).sort((a, b) =>
        (b.starttime || 0) - (a.starttime || 0)
      );

      // Compute "new" and "status-changed" UPIDs vs prior state. Skip the
      // initial render — otherwise every row would slide in at once.
      const justArrived = new Set<string>();
      const justChanged = new Set<string>();
      if (!isFirstLoadRef.current) {
        for (const t of arr) {
          if (!seenUpidsRef.current.has(t.upid)) {
            justArrived.add(t.upid);
          } else {
            const prev = prevStatusRef.current.get(t.upid);
            if (prev && prev !== t._status) {
              justChanged.add(t.upid);
            }
          }
        }
      }
      // Refresh tracking maps. Must do after diffing.
      for (const t of arr) {
        seenUpidsRef.current.add(t.upid);
        prevStatusRef.current.set(t.upid, t._status);
      }
      if (seenUpidsRef.current.size > 5000) {
        seenUpidsRef.current = new Set(arr.map((t) => t.upid));
        prevStatusRef.current = new Map(arr.map((t) => [t.upid, t._status]));
      }
      isFirstLoadRef.current = false;

      // Skip the state update if nothing actually changed — avoids the
      // 5s re-render churn the operator was seeing. Compares the upid +
      // status signature; equal signature means React would just diff to
      // the same DOM anyway, so don't even pay the reconciliation cost.
      const signature = arr.map((t) => `${t.upid}|${t._status}|${t.endtime || ''}`).join(';');
      if (signature !== lastSignatureRef.current) {
        lastSignatureRef.current = signature;
        setTasks(arr);
      }
      setTypes(data.types || []);
      setUsers(data.users || []);
      if (justArrived.size > 0) {
        setNewUpids(justArrived);
        setTimeout(() => setNewUpids(new Set()), 900);
      }
      if (justChanged.size > 0) {
        setChangedUpids(justChanged);
        setTimeout(() => setChangedUpids(new Set()), 900);
      }
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, [clusterId, filterType, filterStatus, filterVmid, filterUser]);

  // Reset diff tracking when filters change — otherwise rows that were
  // already-seen but newly visible (because filter widened) would not animate.
  // Keeping seen across filter changes is fine; it just means widening a
  // filter won't trigger arrival animations, which is the right call: the
  // tasks were already in-flight, they're just now matching the filter.

  // Initial + on filter change.
  useEffect(() => { reload(false); }, [reload]);

  // Auto-refresh: keep the view fresh while the user is looking. Polled
  // at 15s — a task log isn't a real-time gauge; the previous 5s rate
  // caused visible flicker on the 125-row table. The setTasks call is
  // signature-guarded above so most polls are no-ops anyway.
  useEffect(() => {
    if (!autoRefresh) return;
    const t = setInterval(() => reload(true), 15000);
    return () => clearInterval(t);
  }, [autoRefresh, reload]);

  const totalRunning = useMemo(
    () => tasks.filter((t) => t._status === 'running').length, [tasks]
  );

  return (
    <div className="pt-page">
      <div className="pt-header">
        <div className="pt-title-section">
          <h1 className="pt-title font-display">
            <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 7h8M9 12h8M9 17h5" />
              <circle cx="6" cy="7" r="1" fill="currentColor" />
              <circle cx="6" cy="12" r="1" fill="currentColor" />
              <circle cx="6" cy="17" r="1" fill="currentColor" />
            </svg>
            {t('tasks.title')}
          </h1>
          <div className="pt-sub">{t('tasks.subtitle')}</div>
        </div>
        <div className="pt-actions">
          <label className="pt-auto">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            {t('tasks.auto_refresh')}
          </label>
          <button className="pt-btn" onClick={() => {
            // CSV export of the currently-filtered task list. Downloads
            // locally so operators can hand the audit trail to compliance
            // / Slack without screenshot gymnastics.
            const cols = ['starttime', 'endtime', 'duration_s', 'type', 'id',
                          'node', 'user', 'status', 'upid'];
            const rows = tasks.map((t) => [
              t.starttime ? new Date(t.starttime * 1000).toISOString() : '',
              t.endtime ? new Date(t.endtime * 1000).toISOString() : '',
              t.starttime && t.endtime ? String(t.endtime - t.starttime) : '',
              t.type || '',
              t.id || '',
              t.node || '',
              t.user || '',
              t._status,
              t.upid,
            ]);
            const esc = (v: string) => /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
            const csv = [cols.join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            a.download = `pve-tasks-${clusterId}-${ts}.csv`;
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(a.href), 1000);
          }} disabled={tasks.length === 0}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>CSV</span>
          </button>
          <button className="pt-btn" onClick={() => setShowExportJobs(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>{t('export.jobs_title')}</span>
          </button>
          <button className="pt-btn" onClick={() => setShowSyslog(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
              <line x1="9" y1="17" x2="15" y2="17"/>
            </svg>
            <span>{t('clog.button')}</span>
          </button>
          <button className="pt-btn" onClick={() => reload(true)} disabled={loading}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span>{t('tasks.refresh')}</span>
          </button>
        </div>
      </div>
      <ClusterLogModal
        open={showSyslog}
        clusterId={clusterId}
        onClose={() => setShowSyslog(false)}
      />
      <ExportJobsModal
        open={showExportJobs}
        clusterId={clusterId}
        onClose={() => setShowExportJobs(false)}
      />

      <div className="pt-filters">
        <label className="pt-f">
          <span>{t('tasks.filter.cluster')}</span>
          <CyberSelect
            value={clusterId}
            options={clusterIds.map((id) => ({ value: id, label: clusters[id]?.name || id }))}
            onChange={(v) => setClusterId(v)}
          />
        </label>
        <label className="pt-f">
          <span>{t('tasks.filter.type')}</span>
          <CyberSelect
            value={filterType}
            options={[
              { value: '', label: t('tasks.filter.all') },
              ...types.map((tp) => ({ value: tp, label: tp })),
            ]}
            onChange={(v) => setFilterType(v)}
          />
        </label>
        <label className="pt-f">
          <span>{t('tasks.filter.status')}</span>
          <CyberSelect<'all' | 'running' | 'ok' | 'error'>
            value={filterStatus}
            options={[
              { value: 'all', label: t('tasks.filter.all') },
              { value: 'running', label: t('tasks.filter.running') },
              { value: 'ok', label: t('tasks.filter.ok') },
              { value: 'error', label: t('tasks.filter.error') },
            ]}
            onChange={(v) => setFilterStatus(v)}
          />
        </label>
        <label className="pt-f">
          <span>{t('tasks.filter.vmid')}</span>
          <input
            type="text"
            inputMode="numeric"
            value={filterVmid}
            onChange={(e) => setFilterVmid(e.target.value.replace(/[^\d]/g, ''))}
            placeholder="e.g. 102"
          />
        </label>
        <label className="pt-f">
          <span>{t('tasks.filter.user')}</span>
          <CyberSelect
            value={filterUser}
            options={[
              { value: '', label: t('tasks.filter.all') },
              ...users.map((u) => ({ value: u, label: u })),
            ]}
            onChange={(v) => setFilterUser(v)}
          />
        </label>
        <span className="pt-count">
          {tasks.length}
          {totalRunning > 0 && ` · ${totalRunning} ${t('tasks.filter.running').toLowerCase()}`}
        </span>
      </div>

      {error && (
        <div className="pt-error">{error}</div>
      )}

      <div className="pt-split panel-card"
           style={{ gridTemplateColumns: `1fr 6px ${rightPaneWidth}px` }}>
        <div className="pt-tablewrap">
          <table className="vm-table pt-table">
            <thead>
              <tr>
                {([
                  ['starttime', t('tasks.col.starttime')],
                  ['duration', t('tasks.col.duration')],
                  ['type', t('tasks.col.type')],
                  ['id', t('tasks.col.target')],
                  ['node', t('tasks.col.node')],
                  ['user', t('tasks.col.user')],
                  ['status', t('tasks.col.status')],
                ] as Array<[TSortField, string]>).map(([f, label]) => (
                  <th key={f}
                      className={`sortable ${sortField === f ? 'sorted' : ''}`}
                      onClick={() => handleSort(f)}>
                    <span>{label}</span>
                    {sortField === f && (
                      <span className="sort-indicator">{sortDir === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="pt-empty">{t('tasks.empty')}</td>
                </tr>
              )}
              {sortedTasks.map((task) => {
                const cls = [
                  task === activeTask ? 'active' : '',
                  newUpids.has(task.upid) ? 'pt-new' : '',
                ].filter(Boolean).join(' ');
                const stCls = [
                  'pt-st',
                  `pt-st-${task._status}`,
                  changedUpids.has(task.upid) ? 'pt-st-pulse' : '',
                ].join(' ');
                return (
                  <tr key={task.upid} className={cls} onClick={() => setActiveTask(task)}>
                    <td className="pt-mono">{fmtTime(task.starttime)}</td>
                    <td className="pt-mono">{fmtDuration(task.starttime, task.endtime)}</td>
                    <td><span className={`pt-type pt-type-${task.type}`}>{task.type}</span></td>
                    <td className="pt-mono">{task.id || '—'}</td>
                    <td className="pt-mono">{task.node}</td>
                    <td className="pt-mono">{task.user || '—'}</td>
                    <td>
                      <span className={stCls}>
                        {t(STATUS_LABEL[task._status] || 'tasks.filter.all')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Drag handle between table and detail pane. Hidden by media
            query at small widths (where the layout stacks vertically). */}
        <div
          className="pt-split-handle"
          role="separator"
          aria-orientation="vertical"
          title={language === 'zh-TW' ? '拖曳調整左右寬度' : 'Drag to resize'}
          onMouseDown={(e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startW = rightPaneWidth;
            // Bound the right pane to a usable range. The container's
            // scrollWidth gives us a sane upper bound (don't let the
            // detail eat the whole row).
            const containerW = (e.currentTarget.parentElement?.clientWidth || 1200);
            const minRight = 280;
            const maxRight = Math.max(minRight, containerW - 360);
            const onMove = (ev: MouseEvent) => {
              const delta = startX - ev.clientX;   // dragging left grows right pane
              const next = Math.max(minRight, Math.min(maxRight, startW + delta));
              setRightPaneWidth(next);
            };
            const onUp = () => {
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
              try { localStorage.setItem('jtp.tasks.rightPaneW', String(rightPaneWidthRef.current)); } catch {}
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }}
        />

        {/* Always-visible detail pane on the right. Empty placeholder until
            a row is clicked; afterwards renders the live task log. */}
        <aside className="pt-detail">
          {activeTask ? (
            <TaskLogPanel
              key={activeTask.upid}
              clusterId={clusterId}
              task={activeTask}
              onClose={() => setActiveTask(null)}
              onCopyUpid={async () => {
                try {
                  await navigator.clipboard.writeText(activeTask.upid);
                  dialog.alert(language === 'zh-TW' ? 'UPID 已複製' : 'UPID copied');
                } catch {/* ignore */}
              }}
            />
          ) : (
            <div className="pt-detail-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6M9 13h6M9 17h4" />
              </svg>
              <div className="pt-detail-empty-title">{t('tasks.detail.empty_title')}</div>
              <div className="pt-detail-empty-sub">{t('tasks.detail.empty_sub')}</div>
            </div>
          )}
        </aside>
      </div>

      <style>{`
        .pt-page {
          padding: 24px 32px;
          height: 100%;
          display: flex; flex-direction: column;
          gap: 16px;
          color: var(--text-primary);
        }
        .pt-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px;
          margin-bottom: var(--spacing-lg);
          flex-wrap: wrap;
        }
        .pt-title-section {
          display: flex; flex-direction: column; gap: 2px;
        }
        /* Title visual matches HoloMatrix / RadarScan / Storage etc. —
           font-display 22 px, primary text colour, big letter-spacing,
           inline cyan icon with drop-shadow glow + pulse. */
        .pt-title {
          display: flex; align-items: center; gap: var(--spacing-sm);
          margin: 0;
          font-size: 22px; font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }
        .pt-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: pt-title-pulse 2s ease-in-out infinite;
        }
        @keyframes pt-title-pulse {
          0%, 100% { opacity: 0.85; transform: none; }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        .pt-sub {
          font-size: 12px; color: var(--text-secondary);
          font-family: var(--font-mono);
          margin-top: 4px;
        }
        .pt-actions { display: flex; gap: 12px; align-items: center; }
        .pt-auto {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); font-family: var(--font-display);
          cursor: pointer;
        }
        .pt-auto input { accent-color: var(--primary); }
        .pt-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 4px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.4);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: background var(--transition-fast);
        }
        .pt-btn.pt-btn-nowrap { white-space: nowrap; flex-shrink: 0; }
        .pt-btn.pt-btn-danger { color: var(--danger, #ff4d6d); border-color: rgba(255, 77, 109, .5); background: rgba(255, 77, 109, .08); }
        .pt-btn.pt-btn-danger:hover { background: rgba(255, 77, 109, .15); }
        .pt-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
        .pt-btn:disabled { opacity: .5; cursor: not-allowed; }

        .pt-filters {
          display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: flex-end;
          padding: 12px 14px;
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.12);
          border-radius: 4px;
        }
        .pt-f {
          display: flex; flex-direction: column; gap: 4px;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); font-family: var(--font-display);
        }
        /* Same FIXED height on the dropdown trigger and the free-text
           input — padding/font mirroring alone kept drifting because the
           CJK line box inside the trigger is taller than the latin
           placeholder's. One explicit height ends the argument. */
        .pt-filters .cyber-select-trigger,
        .pt-f input {
          height: 40px;
          box-sizing: border-box;
        }
        /* Filters are all CyberSelect now; the native <select> rules that used
           to live here were dead and carried a duplicate border-radius. */
        .pt-f input {
          padding: 9px 12px; min-width: 140px;
          font-family: var(--font-mono); font-size: 15px;
          letter-spacing: .03em;
          background: rgba(0, 240, 255, 0.04);
          color: var(--text-primary);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 3px;
          outline: none;
        }
        .pt-f input:focus {
          border-color: var(--primary);
        }
        .pt-count {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary); margin-left: auto;
        }
        .pt-error {
          padding: 8px 14px;
          border: 1px solid var(--danger, #ff4d6d);
          border-left-width: 3px;
          background: rgba(255, 77, 109, 0.08);
          color: var(--danger, #ff4d6d);
          font-family: var(--font-mono); font-size: 12px;
          border-radius: 2px;
        }

        .pt-split {
          flex: 1; min-height: 0;
          display: grid;
          /* Inline style sets gridTemplateColumns: 1fr 6px <Npx>. The
           * media queries below override on narrow viewports. */
          gap: 0;
        }
        /* Drop the panel-card top hairline + scan-line on THIS card: the
         * table's sticky thead (opaque bg) paints over them on the left
         * half but not over the detail pane on the right, so the top
         * edge looked thicker on one side. The plain 1px card border is
         * uniform on all four sides. */
        .pt-split::before, .pt-split::after { display: none; }
        .pt-split-handle {
          width: 6px;
          cursor: col-resize;
          background: linear-gradient(180deg,
            rgba(0, 240, 255, 0.06) 0%,
            rgba(0, 240, 255, 0.18) 50%,
            rgba(0, 240, 255, 0.06) 100%);
          border-left: 1px solid rgba(0, 240, 255, 0.12);
          border-right: 1px solid rgba(0, 240, 255, 0.12);
          transition: background .12s;
          flex-shrink: 0;
        }
        .pt-split-handle:hover,
        .pt-split-handle:active {
          background: linear-gradient(180deg,
            rgba(0, 240, 255, 0.12) 0%,
            rgba(0, 240, 255, 0.45) 50%,
            rgba(0, 240, 255, 0.12) 100%);
        }
        @media (max-width: 850px) {
          /* On narrow viewports stack: table on top, detail below.
           * Detail still always visible; drag handle is hidden because
           * a vertical handle would conflict with vertical scroll. */
          .pt-split { grid-template-columns: 1fr !important; grid-auto-rows: minmax(220px, auto); gap: 14px; }
          .pt-split-handle { display: none; }
        }
        /* Inner panes — no border/background of their own; the parent
         * .pt-split.panel-card supplies the cyan-rim surround so the
         * whole table+detail area reads as one unified card. */
        .pt-tablewrap {
          flex: 1; overflow: auto;
          background: transparent;
          min-height: 0;
        }
        .pt-detail {
          background: transparent;
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .pt-detail-empty {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; padding: 24px;
          color: var(--text-muted);
          text-align: center;
        }
        .pt-detail-empty svg { stroke: var(--primary-dim, #00c0cc); opacity: .55; }
        .pt-detail-empty-title {
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-secondary);
        }
        .pt-detail-empty-sub {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-muted); max-width: 280px; line-height: 1.5;
        }
        /* Row + cell look inherited from the global .vm-table standard
           (matrix). Only the cell whitespace rule is task-specific. */
        .pt-table td { white-space: nowrap; }
        .pt-mono { font-family: var(--font-mono); }
        .pt-empty {
          text-align: center; padding: 24px;
          color: var(--text-muted); font-style: italic;
        }
        .pt-type {
          display: inline-block; padding: 2px 8px; border-radius: 2px;
          font-size: 11px; font-family: var(--font-display);
          letter-spacing: 0.05em; text-transform: uppercase;
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.3);
          color: var(--primary);
        }
        /* Tint per-type so the eye picks them out at a glance. */
        .pt-type-qmstart, .pt-type-vzstart {
          color: var(--success); border-color: rgba(0, 255, 136, 0.4);
          background: rgba(0, 255, 136, 0.06);
        }
        .pt-type-qmshutdown, .pt-type-qmstop, .pt-type-vzstop {
          color: var(--warning); border-color: rgba(255, 107, 0, 0.4);
          background: rgba(255, 107, 0, 0.06);
        }
        .pt-type-vzdump, .pt-type-qmsnapshot {
          color: var(--accent); border-color: rgba(224, 102, 255, 0.4);
          background: rgba(224, 102, 255, 0.06);
        }
        .pt-type-qmigrate, .pt-type-relocate {
          color: #ffe066; border-color: rgba(255, 224, 102, 0.4);
          background: rgba(255, 224, 102, 0.06);
        }
        .pt-st {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 2px 8px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono);
          border: 1px solid currentColor;
        }
        .pt-st::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 6px currentColor;
        }
        .pt-st-running { color: var(--warning); }
        .pt-st-ok { color: var(--success); }
        .pt-st-error { color: var(--danger, #ff4d6d); }

        /* Arrival animation for newly-seen UPIDs only — diffed in reload().
           Slide down from -8px while a cyan wash fades from inset 0 12px to
           transparent so the eye picks up the row entering, then settles. */
        @keyframes pt-row-in {
          0%   { opacity: 0; transform: translateY(-8px);
                 box-shadow: inset 0 0 0 1px rgba(0, 240, 255, 0.7),
                             inset 4px 0 0 var(--primary); }
          60%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: none;
                 box-shadow: inset 0 0 0 1px transparent; }
        }
        .pt-table tbody tr.pt-new {
          animation: pt-row-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .pt-table tbody tr.pt-new td:first-child {
          /* Subtle cyan wash on the timestamp cell so the row's "newness"
             reads even after the slide settles. Decays via animation. */
          animation: pt-cell-flash 0.8s ease-out both;
        }
        @keyframes pt-cell-flash {
          0%   { background: rgba(0, 240, 255, 0.22); }
          100% { background: transparent; }
        }

        /* Status-pill pulse — fires when the SAME UPID's status changes
           (running → ok / error). Brief glow ring so the operator's eye
           catches the in-place transition without the row re-arriving. */
        @keyframes pt-st-pulse {
          0%   { box-shadow: 0 0 0 0 currentColor, 0 0 12px currentColor; transform: scale(1); }
          50%  { box-shadow: 0 0 0 6px transparent, 0 0 20px currentColor; transform: scale(1.1); }
          100% { box-shadow: 0 0 0 0 transparent, 0 0 0 transparent; transform: none; }
        }
        .pt-st.pt-st-pulse {
          animation: pt-st-pulse 0.7s ease-out both;
        }
      `}</style>
    </div>
  );
}

interface DrawerProps {
  clusterId: string;
  task: PveTask;
  onClose: () => void;
  onCopyUpid: () => void;
}

// Inline panel (was TaskLogDrawer — overlay drawer). Now lives inside the
// permanent right-side detail column of the operations log page; the
// outer .pt-detail provides the framing, this component just renders
// the task log + meta.
function TaskLogPanel({ clusterId, task, onClose, onCopyUpid }: DrawerProps) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [lines, setLines] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusBlob, setStatusBlob] = useState<any>(null);

  // Poll log + status every 2s if task is still running.
  const isRunning = task._status === 'running';

  useEffect(() => {
    let alive = true;
    const fetchAll = async () => {
      try {
        setLoading(true);
        const upid = encodeURIComponent(task.upid);
        const node = encodeURIComponent(task.node);
        const cid = encodeURIComponent(clusterId);
        const [r1, r2] = await Promise.all([
          fetch(`/api/clusters/${cid}/nodes/${node}/tasks/${upid}/log?limit=2000`,
                { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/nodes/${node}/tasks/${upid}/status`,
                { credentials: 'same-origin' }),
        ]);
        if (!alive) return;
        if (r1.ok) {
          const data = await r1.json();
          // PVE returns [{n:1,t:"…line…"}, …]
          const txt = (data.lines || []).map((l: any) => l.t || '').filter(Boolean);
          // Don't clobber an active text selection inside the log: the
          // 2.5 s poll used to re-render the <pre> mid-drag, wiping the
          // selection before the operator could hit copy. The skipped
          // lines arrive on the next poll once the selection is gone.
          const sel = window.getSelection();
          const selInLog = !!(sel && !sel.isCollapsed &&
            logRef.current && sel.anchorNode && logRef.current.contains(sel.anchorNode));
          if (!selInLog) setLines(txt);
        } else {
          const d = await r1.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r1.status}`);
        }
        if (r2.ok) setStatusBlob(await r2.json());
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchAll();
    const tm = isRunning ? setInterval(fetchAll, 2500) : null;
    return () => { alive = false; if (tm) clearInterval(tm); };
  }, [task.upid, task.node, clusterId, isRunning]);

  return (
    <div className="pt-panel">
      <div className="pt-panel-head">
        <div>
          <div className="pt-panel-title">
            <span className={`pt-type pt-type-${task.type}`}>{task.type}</span>
            <span className="pt-mono">{task.id || ''}</span>
            <span className={`pt-st pt-st-${task._status}`}>{t(STATUS_LABEL[task._status] || 'tasks.filter.all')}</span>
          </div>
          <div className="pt-panel-sub">
            <code className="pt-upid">{task.upid}</code>
          </div>
          <div className="pt-panel-actions">
            {task._status === 'running' && (
              <button className="pt-btn pt-btn-danger pt-btn-nowrap" onClick={async () => {
                const ok = await dialog.confirm(
                  language === 'zh-TW'
                    ? `中止此 PVE 作業？作業可能會以中斷狀態結束。`
                    : `Stop this PVE task? It may end in an aborted state.`,
                  { title: language === 'zh-TW' ? '中止作業？' : 'Stop task?', destructive: true }
                );
                if (!ok) return;
                try {
                  const r = await fetch(
                    `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(task.node)}/tasks/${encodeURIComponent(task.upid)}`,
                    { method: 'DELETE', credentials: 'same-origin' }
                  );
                  const d = await r.json().catch(() => ({}));
                  if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                } catch (e: any) {
                  await dialog.alert(`Stop failed: ${e.message || e}`);
                }
              }}>
                <span>{language === 'zh-TW' ? '中止' : 'Stop'}</span>
              </button>
            )}
            <button className="pt-btn pt-btn-nowrap" onClick={onCopyUpid}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{t('tasks.copy_upid')}</span>
            </button>
            <button className="pt-btn pt-btn-nowrap" onClick={async () => {
              try {
                await navigator.clipboard.writeText(lines.join('\n'));
                dialog.alert(language === 'zh-TW' ? '記錄已複製' : 'Log copied');
              } catch { /* clipboard denied — text is still selectable */ }
            }} disabled={lines.length === 0}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="15" y2="17" />
              </svg>
              <span>{language === 'zh-TW' ? '複製記錄' : 'Copy log'}</span>
            </button>
          </div>
        </div>
        <button className="pt-panel-close" onClick={onClose} aria-label="clear selection" title="clear">×</button>
      </div>
      <div className="pt-panel-meta">
        <span><span className="lbl">{t('tasks.col.node')}</span> {task.node}</span>
        <span><span className="lbl">{t('tasks.col.user')}</span> {task.user || '—'}</span>
        <span><span className="lbl">{t('tasks.col.starttime')}</span> {fmtTime(task.starttime)}</span>
        <span><span className="lbl">{t('tasks.col.duration')}</span> {fmtDuration(task.starttime, task.endtime)}</span>
      </div>
      <MigrationProgress task={task} lines={lines} />
      <div className="pt-panel-log" ref={logRef}>
        {loading && lines.length === 0 && (
          <div className="pt-loading">{t('tasks.log_loading')}</div>
        )}
        {error && <div className="pt-error">{error}</div>}
        {lines.length === 0 && !loading && !error && (
          <div className="pt-loading">{t('tasks.log_empty')}</div>
        )}
        {lines.length > 0 && (
          <pre>{lines.join('\n')}</pre>
        )}
      </div>
      <style>{`
        .pt-panel {
          height: 100%;
          display: flex; flex-direction: column;
          animation: ptFade .12s ease-out;
        }
        @keyframes ptFade { from { opacity: 0; } to { opacity: 1; } }
        /* Head visual matches the vm-table thead treatment (cyan gradient
           strip) so the detail pane reads as part of the same family as
           the matrix. */
        .pt-panel-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 14px 16px; gap: 14px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.16);
          background: linear-gradient(180deg, rgba(0, 240, 255, 0.08), rgba(0, 240, 255, 0.0));
        }
        .pt-panel-head > div:first-child { flex: 1; min-width: 0; }
        .pt-panel-title {
          display: flex; gap: 10px; align-items: center;
          font-size: 14px;
          font-family: var(--font-mono);
          color: var(--text-primary);
        }
        .pt-panel-sub {
          margin-top: 10px;
          display: flex; gap: 8px; align-items: center;
        }
        /* Actions on their own row — the buttons NEVER share a line with
           the (long) UPID, so they can't get squeezed into two-line text. */
        .pt-panel-actions {
          margin-top: 8px;
          display: flex; gap: 8px; align-items: center;
        }
        .pt-upid {
          flex: 1; min-width: 0;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary);
          padding: 5px 10px; border: 1px solid rgba(0, 240, 255, 0.18);
          border-radius: 2px;
          background: rgba(0, 240, 255, 0.03);
          overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .pt-panel-close {
          background: transparent; border: none; color: var(--text-secondary);
          font-size: 24px; cursor: pointer; padding: 0 8px; line-height: 1;
        }
        .pt-panel-close:hover { color: var(--primary); }
        .pt-panel-meta {
          display: flex; flex-wrap: wrap; gap: 8px 18px;
          padding: 10px 16px;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-primary);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
        }
        .pt-panel-meta .lbl {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); margin-right: 4px;
        }
        .pt-panel-log {
          flex: 1; overflow: auto;
          padding: 12px 16px;
          font-family: var(--font-mono); font-size: 13px;
          line-height: 1.6;
        }
        .pt-panel-log pre {
          margin: 0; white-space: pre-wrap; word-break: break-all;
          color: var(--text-primary);
        }
        .pt-loading {
          color: var(--text-muted); font-style: italic;
          font-family: var(--font-mono); font-size: 12px;
        }
      `}</style>
    </div>
  );
}

/**
 * MigrationProgress — for `qmigrate` / `pct migrate` tasks, parse the
 * tail of the log for "transferred X / total Y" lines and render a
 * progress bar + speed estimate. For non-migrate tasks renders nothing.
 */
function MigrationProgress({ task, lines }: { task: PveTask; lines: string[] }) {
  // Type strings from PVE: "qmigrate" (qemu) and "vzmigrate" / "ctmigrate"
  // (lxc — varies by PVE version). Be liberal in what we match.
  const isMigrate = /migr/i.test(task.type || '');
  const stats = useMemo(() => {
    if (!isMigrate || lines.length === 0) return null;
    let pct: number | null = null;
    let speed: string | null = null;
    let downtime: string | null = null;
    let phase: string | null = null;
    let bytesNow: string | null = null;
    let bytesTotal: string | null = null;
    // Walk from end; the most recent state wins.
    for (let i = lines.length - 1; i >= 0 && i > lines.length - 60; i--) {
      const l = lines[i];
      if (pct === null) {
        const m = l.match(/transferred ([\d.]+ ?\w+) of ([\d.]+ ?\w+)/i);
        if (m) {
          bytesNow = m[1].trim();
          bytesTotal = m[2].trim();
          // Parse to bytes for percent calc.
          const a = parseSize(m[1]);
          const b = parseSize(m[2]);
          if (a !== null && b !== null && b > 0) {
            pct = Math.min(100, Math.max(0, (a / b) * 100));
          }
        }
      }
      if (speed === null) {
        const m = l.match(/migration speed: ([\d.]+ ?\w+\/s)/i);
        if (m) speed = m[1];
      }
      if (downtime === null) {
        const m = l.match(/downtime ?: ?([\d.]+ ?\w+)/i);
        if (m) downtime = m[1];
      }
      if (phase === null) {
        if (/migration completed/i.test(l)) phase = 'completed';
        else if (/migration aborted|migration failed/i.test(l)) phase = 'failed';
      }
    }
    if (pct === null && phase === null && speed === null) return null;
    return { pct, speed, downtime, phase, bytesNow, bytesTotal };
  }, [isMigrate, lines]);
  if (!stats) return null;
  const phaseClass = stats.phase === 'completed' ? 'ok'
                  : stats.phase === 'failed' ? 'bad' : 'live';
  return (
    <div className="mig-prog">
      <div className="mig-prog-bar">
        <div className="mig-prog-fill" style={{ width: `${stats.pct ?? (stats.phase === 'completed' ? 100 : 0)}%` }} />
        <span className="mig-prog-pct">{stats.pct !== null ? `${stats.pct.toFixed(1)}%` : (stats.phase || '…')}</span>
      </div>
      <div className="mig-prog-meta">
        {stats.bytesNow && <span><span className="lbl">transferred</span> {stats.bytesNow} / {stats.bytesTotal}</span>}
        {stats.speed && <span><span className="lbl">speed</span> {stats.speed}</span>}
        {stats.downtime && <span><span className="lbl">downtime</span> {stats.downtime}</span>}
        {stats.phase && <span className={`mig-phase ${phaseClass}`}>{stats.phase}</span>}
      </div>
      <style>{`
        .mig-prog { padding: 10px 16px; border-bottom: 1px solid rgba(0,240,255,.08); background: rgba(0,240,255,.04); }
        .mig-prog-bar { position: relative; height: 14px; background: rgba(0,240,255,.08); border: 1px solid rgba(0,240,255,.2); border-radius: 2px; overflow: hidden; }
        .mig-prog-fill { height: 100%; background: linear-gradient(90deg, rgba(0,240,255,.4), var(--primary)); transition: width .3s ease-out; box-shadow: 0 0 6px rgba(0,240,255,.5) inset; }
        .mig-prog-pct { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 11px; color: var(--text-primary); text-shadow: 0 0 2px rgba(0,0,0,.8); }
        .mig-prog-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; padding-top: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--text-primary); }
        .mig-prog-meta .lbl { font-family: var(--font-display); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); margin-right: 4px; }
        .mig-phase { padding: 1px 8px; border-radius: 999px; border: 1px solid currentColor; font-size: 10px; }
        .mig-phase.ok { color: var(--success); }
        .mig-phase.bad { color: var(--danger, #ff4d6d); }
        .mig-phase.live { color: var(--warning); }
      `}</style>
    </div>
  );
}

function parseSize(s: string): number | null {
  const m = s.trim().match(/^([\d.]+) ?(\w+)?/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (!Number.isFinite(n)) return null;
  const unit = (m[2] || 'B').toLowerCase();
  const mul: Record<string, number> = {
    'b': 1, 'kb': 1e3, 'kib': 1024,
    'mb': 1e6, 'mib': 1024 ** 2,
    'gb': 1e9, 'gib': 1024 ** 3,
    'tb': 1e12, 'tib': 1024 ** 4,
  };
  return n * (mul[unit] ?? 1);
}
