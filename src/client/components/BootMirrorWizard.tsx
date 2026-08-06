/**
 * Root-pool (boot disk) mirror — staged wizard and live progress.
 *
 * The defining constraint is TIME. A resilver on a 2 TB boot pool runs for
 * hours, so the operator starts it, closes the tab, goes to lunch, and comes
 * back on a different machine. Everything here is therefore driven by server
 * state, never by component state: on mount we ask the node whether a job is
 * already in flight and, if so, drop the operator straight into the progress
 * view with the full timeline rebuilt. The wizard steps are just the path you
 * take when there ISN'T one running.
 *
 * The staging is deliberate, not ceremony. `rpool` holds the bootloader, the
 * node config and (via local-zfs) the guests' disks, so:
 *   - preflight is server-side and its fatal findings HARD BLOCK the button;
 *   - the missing-backup gate can only be passed by an explicit acknowledgement
 *     that is written to the audit log;
 *   - the operator types the pool name to confirm;
 *   - detach is never part of the automatic run — it unlocks only once the
 *     server has re-verified against the live pool that resilver finished.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { CyberSelect, type CyberOption } from './CyberSelect';

const POLL_MS = 8000;

interface Check { id: string; ok: boolean; fatal: boolean; detail: string; }
interface Preflight {
  ok: boolean; scenario: string; pool: string;
  source_disk: string | null; old_disk: string | null; new_disk: string;
  layout: { esp: string | null; zfs: string | null; bios: string | null } | null;
  uefi: boolean; checks: Check[]; blocking: string[]; plan: string[];
  post_steps: string[];
}
interface JobEvent { ts: number; kind: string; message: string; }
interface Job {
  id: number; node: string; pool: string; scenario: string;
  source_disk: string | null; old_disk: string | null; new_disk: string;
  stage: string; status: string; progress: number;
  created_by: string | null; created_at: number; updated_at: number;
  finished_at: number | null; events: JobEvent[]; detail: any;
}
interface PoolState {
  name: string; state: string; is_mirror: boolean;
  scan: any; members: { by_id: string; state: string; path: string }[];
}

const STAGE_ORDER = ['preflight', 'cloning', 'bootloader', 'attaching',
                     'resilvering', 'awaiting_detach', 'detaching', 'cleaning', 'done'];

function stageIndex(s: string): number {
  const i = STAGE_ORDER.indexOf(s);
  return i < 0 ? 0 : i;
}

function fmtTime(ts: number): string {
  return new Date(ts * 1000).toLocaleTimeString();
}

function fmtElapsed(from: number, to: number, t: (k: string) => string): string {
  const s = Math.max(0, to - from);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  if (h) return `${h} ${t('zfs.bm.hours')} ${m} ${t('zfs.bm.minutes')}`;
  return `${m} ${t('zfs.bm.minutes')}`;
}

/** Icon per check outcome — a wall of identical text hides the one that matters. */
function CheckIcon({ ok, fatal }: { ok: boolean; fatal: boolean }) {
  if (ok) {
    return (
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8.5l3.2 3.2L13 5" stroke="#38e8a0" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return fatal ? (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="#ff5c7a" strokeWidth="2"
            strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2l6.5 11.5h-13L8 2z" stroke="#ffc04d" strokeWidth="1.6"
            strokeLinejoin="round" />
      <path d="M8 6.5v3.2" stroke="#ffc04d" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** The three-disk story: source -> new, with the old one marked for removal. */
function TopologyPreview({ pre }: { pre: Preflight }) {
  const { t } = useTranslation();
  const chip = (label: string, name: string | null, tone: string) => (
    <div className={`bm-chip ${tone}`}>
      <div className="bm-chip-role">{label}</div>
      <div className="bm-chip-name" title={name || ''}>{name || '—'}</div>
    </div>
  );
  return (
    <div className="bm-topo">
      {chip(t('zfs.bm.roleSource'), pre.source_disk, 'ok')}
      <div className="bm-arrow" aria-hidden="true">
        <svg width="34" height="12" viewBox="0 0 34 12" fill="none">
          <path d="M0 6h27M22 1.5L28 6l-6 4.5" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {chip(t('zfs.bm.roleNew'), pre.new_disk, 'new')}
      {pre.old_disk && pre.scenario !== 'add_mirror' && (
        <>
          <div className="bm-sep" aria-hidden="true" />
          {chip(t('zfs.bm.roleOld'), pre.old_disk, 'gone')}
        </>
      )}
    </div>
  );
}

function StageRail({ job }: { job: Job }) {
  const { t } = useTranslation();
  const cur = stageIndex(job.stage);
  const failed = job.status === 'failed' || job.status === 'aborted';
  const shown = STAGE_ORDER.filter((s) => s !== 'detaching' && s !== 'cleaning');
  return (
    <div className="bm-rail">
      {shown.map((s) => {
        const i = stageIndex(s);
        const state = failed && i === cur ? 'fail'
          : i < cur ? 'done' : i === cur ? 'live' : 'todo';
        return (
          <div key={s} className={`bm-rail-step ${state}`}>
            <span className="bm-rail-dot" />
            <span className="bm-rail-label">{t(`zfs.bm.stage.${s}`)}</span>
          </div>
        );
      })}
    </div>
  );
}

export interface BootMirrorWizardProps {
  cid: string;
  node: string;
  freeDisks: { by_id: string; size?: number | null; model?: string | null;
               kind?: string | null }[];
  onClose: () => void;
  onChanged?: () => void;
}

export function BootMirrorWizard({ cid, node, freeDisks, onClose, onChanged }:
                                 BootMirrorWizardProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  const [pool, setPool] = useState<PoolState | null>(null);
  // Three states, not two. `undefined` means we have not been able to find
  // out — an SSH failure used to leave this null and the render then announced
  // "this node does not boot from ZFS", which is a different claim entirely and
  // was wrong: the node has an rpool, we simply could not reach it.
  const [rootPool, setRootPool] = useState<string | null | undefined>(undefined);
  const [newDisk, setNewDisk] = useState('');
  const [oldDisk, setOldDisk] = useState('');
  const [pre, setPre] = useState<Preflight | null>(null);
  const [confirmText, setConfirmText] = useState('');
  const [ackBackup, setAckBackup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [errCode, setErrCode] = useState('');
  const timer = useRef<number | null>(null);

  const base = `/api/clusters/${encodeURIComponent(cid)}`;
  const nodeBase = `${base}/nodes/${encodeURIComponent(node)}/zfs/boot-mirror`;

  /** Server is the single source of truth — this is what makes a revisit work. */
  const refresh = useCallback(async () => {
    try {
      const r = await fetch(nodeBase, { credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErr(d.detail || d.error || `HTTP ${r.status}`);
        setErrCode(d.error || '');
        setRootPool(undefined);           // unknown, NOT "no"
        return;
      }
      setRootPool(d.root_pool ?? null);
      setErrCode('');
      setPool(d.pool || null);
      setJob(d.active_job || null);
      setErr('');
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }, [nodeBase]);

  useEffect(() => { refresh(); }, [refresh]);

  // Poll while anything is in flight. A resilver outlives the page, so the
  // percentage must keep moving without the operator doing anything.
  useEffect(() => {
    const live = job && job.status === 'running';
    if (!live) {
      if (timer.current) { window.clearInterval(timer.current); timer.current = null; }
      return;
    }
    timer.current = window.setInterval(refresh, POLL_MS);
    return () => {
      if (timer.current) { window.clearInterval(timer.current); timer.current = null; }
    };
  }, [job?.status, job?.id, refresh]);

  const runPreflight = useCallback(async () => {
    if (!newDisk) return;
    setBusy(true); setErr(''); setPre(null);
    try {
      const r = await fetch(`${nodeBase}/preflight`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pool: rootPool || 'rpool',
                               new_disk: newDisk, old_disk: oldDisk || null }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok && !d.checks) { setErr(d.detail || d.error || `HTTP ${r.status}`); }
      else setPre(d);
    } catch (e: any) { setErr(String(e?.message || e)); }
    setBusy(false);
  }, [nodeBase, newDisk, oldDisk, rootPool]);

  // Changing the target invalidates a preflight — otherwise the operator could
  // review disk A's plan and execute against disk B.
  useEffect(() => { setPre(null); setConfirmText(''); setAckBackup(false); },
            [newDisk, oldDisk]);

  const start = useCallback(async () => {
    if (!pre) return;
    setBusy(true); setErr('');
    try {
      const r = await fetch(`${nodeBase}/start`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pool: pre.pool, new_disk: pre.new_disk, old_disk: oldDisk || null,
          confirm_pool: confirmText, acknowledge_backup: ackBackup,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setErr(d.detail || d.error || `HTTP ${r.status}`); }
      else { setPre(null); await refresh(); onChanged?.(); }
    } catch (e: any) { setErr(String(e?.message || e)); }
    setBusy(false);
  }, [nodeBase, pre, oldDisk, confirmText, ackBackup, refresh, onChanged]);

  const detach = useCallback(async () => {
    if (!job) return;
    setBusy(true); setErr('');
    try {
      const r = await fetch(`${base}/zfs/boot-mirror/${job.id}/detach`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm_pool: job.pool }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) setErr(d.detail || d.error || `HTTP ${r.status}`);
      await refresh(); onChanged?.();
    } catch (e: any) { setErr(String(e?.message || e)); }
    setBusy(false);
  }, [base, job, refresh, onChanged]);

  // ------------------------------------------------------------- rendering

  if (loading) return <div className="bm-wait">{t('zfs.loading')}</div>;

  // Report what we actually know, in order: could not find out > confirmed no.
  if (rootPool === undefined) {
    return (
      <div className="bm-note warn">
        <div>{t('zfs.bm.cannotDetermine')}</div>
        {err && <div className="bm-note-detail">{err}</div>}
        {errCode === 'ssh_failed' && (
          <div className="bm-note-detail">{t('zfs.bm.needsSsh')}</div>
        )}
      </div>
    );
  }
  if (!rootPool) {
    return (
      <div className="bm-note warn">
        {t('zfs.bm.notZfsRoot')}
      </div>
    );
  }

  // A job in flight always wins over the wizard — this is the revisit path.
  if (job) {
    const running = job.status === 'running';
    const resilvering = job.stage === 'resilvering';
    const ready = job.stage === 'awaiting_detach';
    const nothingToDetach = !job.old_disk;
    return (
      <div className="bm">
        <div className="bm-job-head">
          <div>
            <div className="bm-job-title">
              {t(`zfs.bm.scenario.${job.scenario}`)} · {job.pool} @ {job.node}
            </div>
            <div className="bm-job-sub">
              {t('zfs.bm.startedBy')} {job.created_by || '—'} ·{' '}
              {fmtTime(job.created_at)} ·{' '}
              {t('zfs.bm.elapsed')} {fmtElapsed(job.created_at,
                                                job.finished_at || Math.floor(Date.now() / 1000), t)}
            </div>
          </div>
          <span className={`bm-status ${job.status}`}>
            {t(`zfs.bm.status.${job.status}`)}
          </span>
        </div>

        <StageRail job={job} />

        {resilvering && (
          <div className="bm-progress">
            <div className="bm-progress-top">
              <span>{t('zfs.bm.resilverProgress')}</span>
              <span className="bm-pct">{job.progress.toFixed(1)}%</span>
            </div>
            <div className="bm-bar"><i style={{ width: `${Math.min(100, job.progress)}%` }} /></div>
            <div className="bm-note">{t('zfs.bm.safeToLeave')}</div>
          </div>
        )}

        {ready && !nothingToDetach && (
          <div className="bm-gate ok">
            <div className="bm-gate-title">{t('zfs.bm.resilverDone')}</div>
            <div className="bm-gate-body">{t('zfs.bm.detachExplain')}</div>
            <button className="bm-btn danger" disabled={busy} onClick={detach}>
              {t('zfs.bm.detachOld')} — {job.old_disk}
            </button>
          </div>
        )}
        {ready && nothingToDetach && (
          <div className="bm-gate ok">
            <div className="bm-gate-title">{t('zfs.bm.mirrorComplete')}</div>
            <div className="bm-gate-body">{t('zfs.bm.rebootAdvice')}</div>
          </div>
        )}
        {job.status === 'done' && (
          <div className="bm-gate ok">
            <div className="bm-gate-title">{t('zfs.bm.allDone')}</div>
            <div className="bm-gate-body">{t('zfs.bm.rebootAdvice')}</div>
          </div>
        )}
        {job.status === 'failed' && (
          <div className="bm-gate bad">
            <div className="bm-gate-title">{t('zfs.bm.failed')}</div>
            <div className="bm-gate-body">{t('zfs.bm.failedAdvice')}</div>
          </div>
        )}

        <div className="bm-timeline-head">{t('zfs.bm.timeline')}</div>
        <div className="bm-timeline">
          {job.events.map((e, i) => (
            <div key={i} className={`bm-ev ${e.kind}`}>
              <span className="bm-ev-ts">{fmtTime(e.ts)}</span>
              <span className="bm-ev-msg">{e.message}</span>
            </div>
          ))}
        </div>
        {err && <div className="bm-err">{err}</div>}
        {running && (
          <div className="bm-foot">
            <span className="bm-poll">{t('zfs.bm.autoRefresh')}</span>
          </div>
        )}
      </div>
    );
  }

  // ---- no job: the wizard ------------------------------------------------

  const members = pool?.members || [];
  const faulted = members.filter(
    (m) => !['ONLINE'].includes((m.state || '').toUpperCase()));
  const diskOpts: CyberOption[] = freeDisks.map((d) => ({
    value: d.by_id,
    label: `${d.by_id}${d.model ? ` · ${d.model}` : ''}`,
  }));
  const oldOpts: CyberOption[] = [
    { value: '', label: t('zfs.bm.oldNone') },
    ...members.map((m) => ({
      value: m.by_id.replace(/-part\d+$/, ''),
      label: `${m.by_id.replace(/-part\d+$/, '')} · ${m.state}`,
    })),
  ];

  const fatalUnmet = pre
    ? pre.blocking.filter((b) => !(b === 'guest_backups' && ackBackup))
    : ['preflight'];
  const canRun = !!pre && fatalUnmet.length === 0 && confirmText === pre.pool && !busy;

  return (
    <div className="bm">
      <div className="bm-intro">
        <div className="bm-intro-title">{t('zfs.bm.introTitle')}</div>
        <div className="bm-intro-body">{t('zfs.bm.introBody')}</div>
      </div>

      {pool && (
        <div className="bm-current">
          <span className="bm-current-label">{t('zfs.bm.currentLayout')}</span>
          <span className={`bm-pool-state ${pool.state.toLowerCase()}`}>{pool.state}</span>
          <span className="bm-current-kind">
            {pool.is_mirror ? t('zfs.bm.isMirror') : t('zfs.bm.isSingle')}
          </span>
          <div className="bm-members">
            {members.map((m) => (
              <span key={m.by_id}
                    className={`bm-member ${m.state.toLowerCase()}`}
                    title={m.by_id}>
                {m.by_id.replace(/-part\d+$/, '')}
              </span>
            ))}
          </div>
        </div>
      )}

      {faulted.length > 0 && (
        <div className="bm-note warn">{t('zfs.bm.faultedDetected')}</div>
      )}

      <div className="bm-field">
        <label>{t('zfs.bm.pickNew')}</label>
        <CyberSelect value={newDisk} options={diskOpts} onChange={setNewDisk}
                     placeholder={t('zfs.bm.pickNewPlaceholder')} />
        {freeDisks.length === 0 && (
          <div className="bm-hint">{t('zfs.bm.noFreeDisks')}</div>
        )}
      </div>

      {faulted.length === 0 && members.length > 1 && (
        <div className="bm-field">
          <label>{t('zfs.bm.pickOld')}</label>
          <CyberSelect value={oldDisk} options={oldOpts} onChange={setOldDisk} />
          <div className="bm-hint">{t('zfs.bm.pickOldHint')}</div>
        </div>
      )}

      <button className="bm-btn" disabled={!newDisk || busy} onClick={runPreflight}>
        {busy ? t('zfs.bm.checking') : t('zfs.bm.runPreflight')}
      </button>

      {err && <div className="bm-err">{err}</div>}

      {pre && (
        <div className="bm-pre">
          <div className="bm-pre-head">
            <span>{t('zfs.bm.preflightResult')}</span>
            <span className={`bm-scenario ${pre.scenario}`}>
              {t(`zfs.bm.scenario.${pre.scenario}`)}
            </span>
          </div>

          <TopologyPreview pre={pre} />

          <div className="bm-checks">
            {pre.checks.map((c) => (
              <div key={c.id}
                   className={`bm-check ${c.ok ? 'ok' : c.fatal ? 'bad' : 'warn'}`}>
                <CheckIcon ok={c.ok} fatal={c.fatal} />
                <span className="bm-check-name">{t(`zfs.bm.check.${c.id}`)}</span>
                <span className="bm-check-detail">{c.detail}</span>
              </div>
            ))}
          </div>

          {pre.blocking.includes('guest_backups') && (
            <label className="bm-ack">
              <input type="checkbox" checked={ackBackup}
                     onChange={(e) => setAckBackup(e.target.checked)} />
              <span>{t('zfs.bm.ackBackup')}</span>
            </label>
          )}

          <div className="bm-plan-head">{t('zfs.bm.planHead')}</div>
          <pre className="bm-plan">{pre.plan.join('\n')}</pre>
          <div className="bm-note">{t('zfs.bm.detachLater')}</div>

          {fatalUnmet.length > 0 ? (
            <div className="bm-gate bad">
              <div className="bm-gate-title">{t('zfs.bm.blocked')}</div>
              <div className="bm-gate-body">
                {fatalUnmet.map((b) => t(`zfs.bm.check.${b}`)).join(' · ')}
              </div>
            </div>
          ) : (
            <div className="bm-confirm">
              <label>{t('zfs.bm.typeToConfirm').replace('{pool}', pre.pool)}</label>
              <input value={confirmText} spellCheck={false} autoComplete="off"
                     onChange={(e) => setConfirmText(e.target.value)}
                     placeholder={pre.pool} />
              <button className="bm-btn danger" disabled={!canRun} onClick={start}>
                {t('zfs.bm.execute')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BootMirrorWizard;
