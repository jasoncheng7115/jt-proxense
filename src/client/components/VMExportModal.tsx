/**
 * VMExportModal — export a QEMU VM to OVA (VMware/VirtualBox) or
 * Hyper-V VHDX by driving jt_pve2ova / jt_pve2hyperv on the PVE node
 * (server/vm_export.py). Flow:
 *
 *   1. Tool check — detect script + deps on the node; offer install /
 *      upgrade (latest version compared against GitHub).
 *   2. Pick temp path — file-path storages with free bytes + writability,
 *      validated against the estimated source-disk total; custom path ok.
 *   3. Run — job is server-side (export_jobs table); this window only
 *      POLLS, so it can be closed freely. ExportJobsModal is the
 *      history/download/delete surface.
 *
 * Outputs auto-purge 24 h after completion (server reaper).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { CyberSelect } from './CyberSelect';

const ESXI_VERSIONS = ['8.0u2', '8.0', '7.0u3', '7.0u1', '7.0', '6.7', '6.5'];

function fmtBytes(n: number): string {
  if (!n || n <= 0) return '0 B';
  const u = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(u.length - 1, Math.floor(Math.log(n) / Math.log(1024)));
  return `${(n / Math.pow(1024, i)).toFixed(i ? 1 : 0)} ${u[i]}`;
}

interface ToolInfo {
  installed: boolean;
  version: string;
  latest: string;
  update_available: boolean;
  deps: Record<string, boolean>;
}

interface PathRow {
  storage: string; type: string; path: string;
  exists: boolean; free_bytes: number; writable: boolean;
}

interface ExportJob {
  id: number; cluster_id: string; node: string; vmid: number; vm_name: string;
  format: string; status: string; created_by: string; created_at: number;
  started_at?: number; finished_at?: number; expires_at?: number;
  error?: string; output_files: Array<{ name: string; size: number }>;
  log_tail?: string;
}

// ──────────────────────────────────────────────── wizard modal
interface ExportProps {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
  vmid: number;
  vmName: string;
  format: 'ova' | 'hyperv';
  /** Guest power state at menu-open time. 'running' surfaces a
   *  consistency warning — the converters read disks live, no snapshot. */
  vmStatus?: string;
}

export function VMExportModal({ open, onClose, clusterId, node, vmid, vmName, format, vmStatus }: ExportProps) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();

  const [tool, setTool] = useState<ToolInfo | null>(null);
  const [toolBusy, setToolBusy] = useState(false);
  const [paths, setPaths] = useState<PathRow[]>([]);
  const [estimate, setEstimate] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [chosenPath, setChosenPath] = useState('');
  const [customPath, setCustomPath] = useState('');
  const [esxiVersion, setEsxiVersion] = useState('8.0');
  const [err, setErr] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [jobId, setJobId] = useState<number | null>(null);
  const [job, setJob] = useState<ExportJob | null>(null);

  const toolName = format === 'ova' ? 'jt_pve2ova.sh' : 'jt_pve2hyperv.sh';

  const loadTools = useCallback(async () => {
    setToolBusy(true);
    try {
      const r = await fetch(`/api/export/${encodeURIComponent(clusterId)}/${encodeURIComponent(node)}/tools`,
        { credentials: 'same-origin' });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setTool(d.tools[format]);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setToolBusy(false);
    }
  }, [clusterId, node, format]);

  const loadPaths = useCallback(async () => {
    try {
      const r = await fetch(
        `/api/export/${encodeURIComponent(clusterId)}/${encodeURIComponent(node)}/paths?vmid=${vmid}`,
        { credentials: 'same-origin' });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setPaths(d.paths || []);
      setEstimate(d.estimate_bytes || 0);
      setComfort(d.comfort_bytes || 0);
    } catch (e: any) {
      setErr(e.message || String(e));
    }
  }, [clusterId, node, vmid]);

  useEffect(() => {
    if (!open) return;
    setErr(null); setJobId(null); setJob(null); setChosenPath(''); setCustomPath('');
    loadTools();
    loadPaths();
  }, [open, loadTools, loadPaths]);

  // Poll the running job. The job is server-side; this is only a viewer.
  const pollRef = useRef<number | null>(null);
  useEffect(() => {
    if (!open || jobId == null) return;
    const poll = async () => {
      try {
        const r = await fetch(`/api/export/jobs/${jobId}`, { credentials: 'same-origin' });
        const d = await r.json();
        if (r.ok && d.ok) {
          setJob(d.job);
          if (d.job.status !== 'running' && d.job.status !== 'pending' && pollRef.current) {
            window.clearInterval(pollRef.current);
            pollRef.current = null;
          }
        }
      } catch { /* transient — next tick retries */ }
    };
    poll();
    pollRef.current = window.setInterval(poll, 3000);
    return () => { if (pollRef.current) { window.clearInterval(pollRef.current); pollRef.current = null; } };
  }, [open, jobId]);

  if (!open) return null;

  const installTool = async () => {
    setToolBusy(true); setErr(null);
    try {
      const r = await fetch(`/api/export/${encodeURIComponent(clusterId)}/${encodeURIComponent(node)}/tools/install`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tool: format }) });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      await loadTools();
    } catch (e: any) {
      setErr(e.message || String(e));
      setToolBusy(false);
    }
  };

  const effectivePath = customPath.trim() || chosenPath;

  const start = async (force = false) => {
    if (!effectivePath) return;
    setStarting(true); setErr(null);
    try {
      const body: any = {
        cluster_id: clusterId, node, vmid, format,
        base_dir: effectivePath, force,
      };
      if (format === 'ova') body.esxi_version = esxiVersion;
      else body.lang = language === 'zh-TW' ? 'zh-TW' : 'en';
      const r = await fetch('/api/export/jobs', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (r.status === 409 && d.error === 'space_tight') {
        const ok = await dialog.confirm(
          t('export.space_tight', { need: fmtBytes(d.comfort_bytes || comfort) }),
          { destructive: false });
        if (ok) { setStarting(false); return start(true); }
        setStarting(false);
        return;
      }
      if (!r.ok || !d.ok) throw new Error(d.message || d.error || `HTTP ${r.status}`);
      setJobId(d.job_id);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setStarting(false);
    }
  };

  const deps = tool?.deps || {};
  const missingDeps = Object.entries(deps).filter(([, ok]) => !ok).map(([d]) => d);
  const canStart = !!tool?.installed && missingDeps.length === 0 && !!effectivePath && jobId == null;

  return (
    <div className="ex-back" onClick={onClose}>
      <div className="ex-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ex-head">
          <span>{t('export.title')} · VM {vmid}{vmName ? ` (${vmName})` : ''} → {format === 'ova' ? 'OVA' : 'Hyper-V VHDX'}</span>
          <button className="ex-close" onClick={onClose}>×</button>
        </div>
        <div className="ex-body">
          {err && <div className="ex-error">{err}</div>}
          {vmStatus === 'running' && jobId == null && (
            <div className="ex-warn">{t('export.vm_running_warn')}</div>
          )}

          {jobId == null ? (
            <>
              {/* 1 — tool check */}
              <div className="ex-section">
                <div className="ex-section-title">1 · {t('export.tool_check')}</div>
                <div className="ex-tool-row">
                  <span className="ex-mono">{toolName}</span>
                  {toolBusy && <span className="ex-muted">…</span>}
                  {!toolBusy && tool && tool.installed && (
                    <span className="ex-pill ok">{t('export.tool_installed')} v{tool.version || '?'}</span>
                  )}
                  {!toolBusy && tool && !tool.installed && (
                    <>
                      <span className="ex-pill bad">{t('export.tool_missing')}</span>
                      <button className="ex-btn primary" onClick={installTool}>{t('export.tool_install')}</button>
                    </>
                  )}
                  {!toolBusy && tool?.update_available && (
                    <button className="ex-btn" onClick={installTool}>
                      {t('export.tool_upgrade', { v: tool.latest })}
                    </button>
                  )}
                </div>
                {missingDeps.map((d) => (
                  <div key={d} className="ex-dep-warn">{t('export.dep_missing', { dep: d })}</div>
                ))}
              </div>

              {/* 2 — temp path */}
              <div className="ex-section">
                <div className="ex-section-title">
                  2 · {t('export.pick_path')}
                  <span className="ex-estimate">
                    {t('export.estimate')}: <b>{fmtBytes(estimate)}</b>
                  </span>
                </div>
                <div className="ex-paths">
                  {paths.map((p) => {
                    const ok = p.exists && p.writable;
                    const enough = p.free_bytes >= comfort;
                    return (
                      <label key={p.path}
                             className={`ex-path-row ${!ok ? 'is-disabled' : ''} ${chosenPath === p.path && !customPath ? 'active' : ''}`}>
                        <input type="radio" name="ex-path" disabled={!ok}
                               checked={chosenPath === p.path && !customPath.trim()}
                               onChange={() => { setChosenPath(p.path); setCustomPath(''); }} />
                        <span className="ex-mono ex-path-name">{p.storage}</span>
                        <span className="ex-mono ex-path-dir">{p.path}</span>
                        <span className={`ex-mono ex-path-free ${!ok ? '' : enough ? 'good' : 'tight'}`}>
                          {!p.exists ? '—'
                            : !p.writable ? t('export.not_writable')
                            : `${fmtBytes(p.free_bytes)} ${t('export.free')}`}
                        </span>
                      </label>
                    );
                  })}
                  <label className={`ex-path-row ${customPath.trim() ? 'active' : ''}`}>
                    <input type="radio" name="ex-path" checked={!!customPath.trim()} readOnly />
                    <span className="ex-mono ex-path-name">{t('export.custom_path')}</span>
                    <input className="ex-custom" placeholder="/mnt/space"
                           value={customPath} onChange={(e) => setCustomPath(e.target.value)} />
                  </label>
                </div>
              </div>

              {/* 3 — options + go */}
              <div className="ex-section ex-opts">
                {format === 'ova' && (
                  <label className="ex-opt">
                    <span>{t('export.esxi_version')}</span>
                    <CyberSelect value={esxiVersion}
                                 options={ESXI_VERSIONS.map((v) => ({ value: v, label: v }))}
                                 onChange={setEsxiVersion} />
                  </label>
                )}
                <button className="ex-btn primary ex-start" disabled={!canStart || starting}
                        onClick={() => start(false)}>
                  {t('export.start')}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="ex-hint">{t('export.running_hint')}</div>
              <div className="ex-job-status">
                <span className={`ex-pill ${job?.status === 'done' ? 'ok' : job?.status === 'failed' ? 'bad' : 'run'}`}>
                  {job?.status || 'pending'}
                </span>
                {job?.error && <span className="ex-error-inline">{job.error}</span>}
              </div>
              {job?.status === 'done' && (job.output_files || []).map((f) => (
                <div key={f.name} className="ex-file-row">
                  <span className="ex-mono">{f.name}</span>
                  <span className="ex-mono ex-muted">{fmtBytes(f.size)}</span>
                  <a className="ex-btn primary"
                     href={`/api/export/jobs/${jobId}/download/${encodeURIComponent(f.name)}`}>
                    {t('export.download')}
                  </a>
                </div>
              ))}
              <pre className="ex-log">{job?.log_tail || '…'}</pre>
            </>
          )}
        </div>
        <ExportStyles />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────── jobs history modal
interface JobsProps {
  open: boolean;
  onClose: () => void;
  clusterId?: string;
}

export function ExportJobsModal({ open, onClose, clusterId }: JobsProps) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [jobs, setJobs] = useState<ExportJob[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const q = clusterId ? `?cluster_id=${encodeURIComponent(clusterId)}` : '';
      const r = await fetch(`/api/export/jobs${q}`, { credentials: 'same-origin' });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setJobs(d.jobs || []);
      setErr(null);
    } catch (e: any) {
      setErr(e.message || String(e));
    }
  }, [clusterId]);

  useEffect(() => {
    if (!open) return;
    reload();
    const iv = window.setInterval(reload, 5000);
    return () => window.clearInterval(iv);
  }, [open, reload]);

  if (!open) return null;

  const removeJob = async (j: ExportJob) => {
    const ok = await dialog.confirm(t('export.delete_confirm', { id: j.id }), { destructive: true });
    if (!ok) return;
    try {
      const r = await fetch(`/api/export/jobs/${j.id}`, { method: 'DELETE', credentials: 'same-origin' });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      reload();
    } catch (e: any) {
      await dialog.alert(String(e.message || e));
    }
  };

  const fmtTs = (s?: number) => s ? new Date(s * 1000).toLocaleString() : '—';

  return (
    <div className="ex-back" onClick={onClose}>
      <div className="ex-modal ex-wide" onClick={(e) => e.stopPropagation()}>
        <div className="ex-head">
          <span>{t('export.jobs_title')}</span>
          <button className="ex-btn" onClick={reload}>{t('export.refresh')}</button>
          <button className="ex-close" onClick={onClose}>×</button>
        </div>
        <div className="ex-body">
          {err && <div className="ex-error">{err}</div>}
          {jobs.length === 0 && <div className="ex-empty">{t('export.empty')}</div>}
          {jobs.map((j) => {
            const hoursLeft = j.expires_at ? Math.max(0, Math.round((j.expires_at - Date.now() / 1000) / 3600)) : null;
            return (
              <div key={j.id} className="ex-job-card">
                <div className="ex-job-head">
                  <span className="ex-mono">#{j.id}</span>
                  <span className="ex-mono">{j.cluster_id}/{j.node}</span>
                  <span className="ex-mono">VM {j.vmid}{j.vm_name ? ` (${j.vm_name})` : ''}</span>
                  <span className="ex-pill fmt">{j.format === 'ova' ? 'OVA' : 'Hyper-V'}</span>
                  <span className={`ex-pill ${j.status === 'done' ? 'ok' : j.status === 'failed' ? 'bad' : j.status === 'running' ? 'run' : ''}`}>
                    {j.status}
                  </span>
                  {j.status === 'done' && hoursLeft != null && (
                    <span className="ex-muted ex-mono">{t('export.expires_in', { h: hoursLeft })}</span>
                  )}
                  <span className="ex-spacer" />
                  <span className="ex-muted ex-mono">{j.created_by} · {fmtTs(j.created_at)}</span>
                  {(j.status === 'done' || j.status === 'failed') && (
                    <button className="ex-btn danger" onClick={() => removeJob(j)}>{t('export.delete_now')}</button>
                  )}
                </div>
                {j.error && <div className="ex-error-inline">{j.error}</div>}
                {(j.output_files || []).map((f) => (
                  <div key={f.name} className="ex-file-row">
                    <span className="ex-mono">{f.name}</span>
                    <span className="ex-mono ex-muted">{fmtBytes(f.size)}</span>
                    {j.status === 'done' && (
                      <a className="ex-btn primary"
                         href={`/api/export/jobs/${j.id}/download/${encodeURIComponent(f.name)}`}>
                        {t('export.download')}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <ExportStyles />
      </div>
    </div>
  );
}

// Shared styles for both modals (cyberpunk, panel-card adjacent).
function ExportStyles() {
  return (
    <style>{`
      .ex-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
      .ex-modal { width: min(760px, 96vw); max-height: 88vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary-dim); border-radius: 6px; box-shadow: 0 0 32px rgba(0, 240, 255, 0.2); animation: ex-in .18s ease-out; overflow: hidden; }
      .ex-modal.ex-wide { width: min(980px, 96vw); }
      @keyframes ex-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      .ex-head { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.25); color: var(--primary); font-family: var(--font-display); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; }
      .ex-head > span:first-child { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ex-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
      .ex-body { flex: 1; overflow: auto; padding: 14px 18px; display: flex; flex-direction: column; gap: 14px; }
      .ex-mono { font-family: var(--font-mono); font-size: 13.5px; }
      .ex-muted { color: var(--text-muted); }
      .ex-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
      .ex-error-inline { color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; word-break: break-all; }
      .ex-warn { padding: 10px 14px; border: 1px solid var(--warning); border-left-width: 3px; background: rgba(255, 107, 0, 0.08); color: var(--warning); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; line-height: 1.6; }
      .ex-section { display: flex; flex-direction: column; gap: 8px; }
      .ex-section-title { display: flex; align-items: baseline; gap: 14px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); border-bottom: 1px solid rgba(0,240,255,.16); padding-bottom: 6px; }
      .ex-estimate { margin-left: auto; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); text-transform: none; letter-spacing: 0; }
      .ex-tool-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
      .ex-pill { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 999px; border: 1px solid currentColor; font-family: var(--font-mono); font-size: 12.5px; }
      .ex-pill.ok  { color: var(--success); }
      .ex-pill.bad { color: var(--danger, #ff4d6d); }
      .ex-pill.run { color: var(--primary); animation: pulse 1.6s ease-in-out infinite; }
      .ex-pill.fmt { color: var(--accent, #e066ff); }
      .ex-dep-warn { font-family: var(--font-mono); font-size: 13.5px; color: var(--warning); }
      .ex-paths { display: flex; flex-direction: column; gap: 4px; }
      .ex-path-row { display: flex; align-items: center; gap: 10px; padding: 7px 10px; border: 1px solid rgba(0,240,255,.12); border-radius: 4px; cursor: pointer; transition: all .12s; }
      .ex-path-row:hover { border-color: rgba(0,240,255,.4); }
      .ex-path-row.active { border-color: var(--primary); background: rgba(0,240,255,.06); }
      .ex-path-row.is-disabled { opacity: .45; cursor: not-allowed; }
      .ex-path-row input[type=radio] { accent-color: var(--primary); }
      .ex-path-name { color: var(--primary); min-width: 110px; }
      .ex-path-dir { flex: 1; color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ex-path-free { white-space: nowrap; }
      .ex-path-free.good { color: var(--success); }
      .ex-path-free.tight { color: var(--warning); }
      .ex-custom { flex: 1; padding: 4px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0,240,255,.04); color: var(--text-primary); border: 1px solid rgba(0,240,255,.2); border-radius: 3px; outline: none; }
      .ex-opts { flex-direction: row; align-items: flex-end; gap: 18px; }
      .ex-opt { display: flex; flex-direction: column; gap: 4px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); }
      .ex-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; text-decoration: none; }
      .ex-btn:hover:not(:disabled) { background: rgba(0,240,255,.16); }
      .ex-btn:disabled { opacity: .45; cursor: not-allowed; }
      .ex-btn.primary { background: var(--primary); color: #001018; border-color: var(--primary); }
      .ex-btn.danger { color: var(--danger, #ff4d6d); border-color: rgba(255,77,109,.5); background: rgba(255,77,109,.06); }
      .ex-start { margin-left: auto; }
      .ex-hint { padding: 10px 14px; border: 1px solid rgba(0,240,255,.25); border-left-width: 3px; background: rgba(0,240,255,.05); color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
      .ex-job-status { display: flex; align-items: center; gap: 12px; }
      .ex-log { background: rgba(0,0,0,.4); border: 1px solid rgba(0,240,255,.12); border-radius: 3px; padding: 10px 12px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); max-height: 260px; overflow: auto; white-space: pre-wrap; word-break: break-word; margin: 0; }
      .ex-file-row { display: flex; align-items: center; gap: 12px; padding: 6px 10px; border: 1px solid rgba(0,240,255,.12); border-radius: 4px; }
      .ex-file-row > .ex-mono:first-child { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ex-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
      .ex-job-card { display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; border: 1px solid rgba(0,240,255,.14); border-radius: 4px; }
      .ex-job-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
      .ex-spacer { flex: 1; }
    `}</style>
  );
}
