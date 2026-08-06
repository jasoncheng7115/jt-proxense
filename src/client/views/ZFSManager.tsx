/**
 * JT-PROXENSE ZFS Manager
 *
 * The pool lifecycle PVE's own WebUI never finishes: replace a failing disk,
 * widen a pool, bolt on log / cache / special vdevs, and build complex
 * multi-vdev topologies (e.g. 22 disks as two raidz2-of-11) in one reviewed
 * action instead of a hand-typed command.
 *
 * The centrepiece is the topology map: pool -> vdev group -> individual disk
 * chips, so the *shape* of the pool is legible at a glance and a sick member
 * is impossible to miss. Disk chips are CSS-grid divs rather than SVG so text
 * stays crisp, hover/click work natively, and 22 disks still lay out sanely.
 *
 * Every mutation is preview-first: the server runs ZFS's own dry run and we
 * render its verdict, so the operator confirms the exact command ZFS approved.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { CyberSelect, type CyberOption } from '../components/CyberSelect';
import { BootMirrorWizard } from '../components/BootMirrorWizard';
import { formatBytesIEC, formatDiskSize } from '../utils/format';
import type { ClusterData } from '../types';

// ------------------------------------------------------------------ types

interface ZVdev {
  name: string;
  type: string;
  level?: string | null;
  parity?: number | null;
  class: string;
  state: string;
  path?: string | null;
  by_id?: string | null;
  size?: number | null;
  alloc?: number | null;
  read_errors: number;
  write_errors: number;
  cksum_errors: number;
  slow_ios: number;
  note?: string | null;
  is_partition: boolean;
  children: ZVdev[];
}

interface ZScan {
  function?: string | null;
  state?: string | null;
  percent?: number | null;
  examined?: number | null;
  total?: number | null;
  errors: number;
}

interface ZPool {
  name: string;
  state: string;
  error_count: number;
  status_text?: string | null;
  action_text?: string | null;
  size?: number | null;
  alloc?: number | null;
  free?: number | null;
  frag?: string | null;
  capacity?: string | null;
  scan?: ZScan | null;
  is_root_pool: boolean;
  has_raidz: boolean;
  removable_toplevel: boolean;
  vdev_count: number;
  vdevs: Record<string, ZVdev[]>;
}

interface ZDisk {
  kernel: string;
  dev: string;
  by_id?: string | null;
  path?: string | null;
  model?: string | null;
  serial?: string | null;
  size: number;
  rotational: boolean;
  transport?: string | null;
  kind?: 'hdd' | 'ssd' | 'nvme';
  partitions: number;
  pool?: string | null;
  pool_state?: string | null;
  mounted: boolean;
  has_esp: boolean;
  free: boolean;
  /** SMART verdict from PVE (/disks/list): PASSED / FAILED / UNKNOWN. */
  health?: string | null;
  /** Remaining endurance %, counts DOWN from 100. 'N/A' on spinning disks. */
  wearout?: number | string | null;
}

interface Props {
  cluster: ClusterData | null;
  clusters?: Record<string, ClusterData>;
}

// 'expand' (raidz online expansion) is backend-only for now — no wizard yet.
type WizardKind = 'replace' | 'vdev' | 'create' | 'bootmirror' | null;

const GROUP_ORDER = ['data', 'special', 'log', 'cache', 'spare', 'dedup'] as const;

// ---------------------------------------------------------------- helpers

/** ONLINE / DEGRADED / FAULTED / AVAIL -> our palette bucket. */
function stateClass(s: string): string {
  const v = (s || '').toUpperCase();
  if (v === 'ONLINE') return 'ok';
  if (v === 'AVAIL' || v === 'INUSE') return 'idle';
  if (v === 'DEGRADED' || v === 'OFFLINE' || v === 'REMOVED') return 'warn';
  if (v === 'FAULTED' || v === 'UNAVAIL' || v === 'CORRUPT') return 'bad';
  return 'idle';
}

/** A member's display label: drop the bus prefix and keep the serial tail. */
function shortDisk(v: ZVdev): string {
  const raw = v.by_id || v.name || '';
  const noPart = raw.replace(/-part\d+$/, '');
  const trimmed = noPart.replace(/^(ata|scsi|nvme|wwn|usb)-/, '');
  // Files (lab pools) and odd names: show the basename.
  const base = trimmed.split('/').pop() || trimmed;
  // Keep the tail: serial numbers live at the end and that is what is
  // printed on the drive.
  return base.length > 26 ? base.slice(0, 11) + '…' + base.slice(-13) : base;
}

function errTotal(v: ZVdev): number {
  return (v.read_errors || 0) + (v.write_errors || 0) + (v.cksum_errors || 0);
}

/** Fault tolerance in plain terms. `parity` is computed server-side because
 *  zpool's JSON reports a flat "raidz" with no nparity — the level lives only
 *  in the vdev name, and guessing 1 would understate a raidz2/3 group. */
function redundancyNote(v: ZVdev, t: (k: string) => string): string | null {
  const ty = (v.type || '').toLowerCase();
  if (v.parity != null) return `${t('zfs.parity')} ${v.parity}`;
  if (ty === 'mirror') return `${t('zfs.tolerates')} ${Math.max(0, v.children.length - 1)}`;
  return null;
}

// ------------------------------------------------------------ media icons

/** HDD / SSD / NVMe glyphs — PVE classifies disks into exactly these three
 *  buckets, so the inventory, the pickers and the topology chips all show the
 *  matching mark instead of bare text. Line-art at 2px stroke to sit beside the
 *  existing sidebar / title icons. */
function MediaIcon({ kind, size = 13 }: { kind?: string; size?: number }) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8,
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  if (kind === 'nvme') {
    // M.2 stick: body, notch, contact pins
    return (
      <svg {...common} className="zfs-mico nvme" aria-hidden="true">
        <path d="M3 8h14a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3z" />
        <path d="M6 11v2M9 11v2M12 11v2" />
        <path d="M3 8v8" />
      </svg>
    );
  }
  if (kind === 'ssd') {
    // Flash chip: package outline + die + leads
    return (
      <svg {...common} className="zfs-mico ssd" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <rect x="8" y="10" width="8" height="4" rx="1" />
        <path d="M4 9H2M4 15H2M22 9h-2M22 15h-2" />
      </svg>
    );
  }
  // HDD (default): platter + spindle + head arm
  return (
    <svg {...common} className="zfs-mico hdd" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M17.5 17.5 13.6 13.6" />
    </svg>
  );
}

function kindLabel(kind?: string): string {
  return kind === 'nvme' ? 'NVMe' : kind === 'ssd' ? 'SSD' : 'HDD';
}


// ------------------------------------------------------------------ icons

/** One shared 24-grid line-art set so every affordance in this view has a mark
 *  rather than a bare word. Stroke-based to match the sidebar / title icons. */
const SVG = (d: React.ReactNode, size: number, cls?: string) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={1.8} strokeLinecap="round"
       strokeLinejoin="round" className={cls} aria-hidden="true">{d}</svg>
);

const Ico = {
  // actions
  scrub: (n = 13) => SVG(<><path d="M3 7h18M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
    <path d="M9 4h6M10 11v6M14 11v6" /></>, n),
  addVdev: (n = 13) => SVG(<><rect x="3" y="4" width="18" height="5" rx="1" />
    <rect x="3" y="12" width="10" height="5" rx="1" />
    <path d="M18 12v7M14.5 15.5h7" /></>, n),
  trim: (n = 13) => SVG(<><path d="M4 20 20 4M9 20 20 9" />
    <circle cx="6" cy="6" r="2.4" /><circle cx="6" cy="14" r="2.4" /></>, n),
  blast: (n = 13) => SVG(<><circle cx="12" cy="12" r="2.4" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></>, n),
  refresh: (n = 13) => SVG(<><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></>, n),
  // two platters with a shield: the boot pair, protected
  boot: (n = 13) => SVG(<><ellipse cx="8" cy="6" rx="5" ry="2.2" />
    <path d="M3 6v5c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V6" />
    <path d="M17 10.5l4 1.6v3c0 2.3-1.7 4.2-4 5-2.3-.8-4-2.7-4-5v-3l4-1.6z" /></>, n),
  plus: (n = 13) => SVG(<path d="M12 5v14M5 12h14" />, n),
  create: (n = 13) => SVG(<><ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M12 19v-2M9 18h6" /></>, n),
  // vdev classes
  data: (n = 13) => SVG(<><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
    <path d="M4.5 5.5v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-6" />
    <path d="M4.5 11.5v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-6" /></>, n),
  special: (n = 13) => SVG(<><rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M12 8.5l1.3 2.7 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4z" /></>, n),
  log: (n = 13) => SVG(<><path d="M13 3 5 14h5l-1 7 8-11h-5z" /></>, n),
  cache: (n = 13) => SVG(<><path d="M4 7a8 3 0 0 1 16 0v10a8 3 0 0 1-16 0z" />
    <path d="M4 12a8 3 0 0 0 16 0" /></>, n),
  spare: (n = 13) => SVG(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3.2" />
    <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5" /></>, n),
  dedup: (n = 13) => SVG(<><rect x="4" y="4" width="11" height="11" rx="1.5" />
    <rect x="9" y="9" width="11" height="11" rx="1.5" /></>, n),
  // states
  ok: (n = 13) => SVG(<><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.6 2.6L16 9.5" /></>, n),
  warn: (n = 13) => SVG(<><path d="M12 3.5 21.5 20H2.5z" /><path d="M12 9.5v4.5M12 17h.01" /></>, n),
  bad: (n = 13) => SVG(<><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></>, n),
  idle: (n = 13) => SVG(<><circle cx="12" cy="12" r="9" /><path d="M8 12h8" /></>, n),
};

const CLASS_ICON: Record<string, (n?: number) => React.ReactElement> = {
  data: Ico.data, special: Ico.special, log: Ico.log,
  cache: Ico.cache, spare: Ico.spare, dedup: Ico.dedup,
};

/** State as a glyph, not a word (the word stays as a label beside it). */
function StateIcon({ state, size = 13 }: { state: string; size?: number }) {
  const c = stateClass(state);
  const f = c === 'ok' ? Ico.ok : c === 'warn' ? Ico.warn : c === 'bad' ? Ico.bad : Ico.idle;
  return <span className={`zfs-sico st-${c}`}>{f(size)}</span>;
}

/** Fault tolerance drawn as pips: filled = data members, ringed = redundancy
 *  budget, hollow-red = already spent. "parity 2" as a number tells you the
 *  design; the pips tell you how much of it you have LEFT right now, which is
 *  the question you actually have when a disk is blinking amber. */
function TolerancePips({ v }: { v: ZVdev }) {
  const kids = v.children.length ? v.children : [];
  if (!kids.length) return null;
  const ty = (v.type || '').toLowerCase();
  const budget = v.parity != null ? v.parity
    : ty === 'mirror' ? Math.max(0, kids.length - 1) : 0;
  if (!budget) return null;
  const lost = kids.filter((c) => stateClass(c.state) !== 'ok').length;
  const left = Math.max(0, budget - lost);
  return (
    <span className="zfs-pips" title={`redundancy: ${left}/${budget} remaining`}>
      {Array.from({ length: budget }).map((_, i) => (
        <span key={i} className={`zfs-pip ${i < left ? 'live' : 'spent'}`} />
      ))}
    </span>
  );
}

/** Tiny horizontal fill — used for per-vdev allocation and relative disk size. */
function MiniBar({ pct, tone = 'cyan', width = 46 }: {
  pct: number; tone?: string; width?: number;
}) {
  return (
    <span className={`zfs-mini tone-${tone}`} style={{ width }}>
      <span className="zfs-mini-fill" style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </span>
  );
}

/** Stacked media composition bar: how much of this node is HDD vs SSD vs NVMe. */
/**
 * SMART verdict for one disk.
 *
 * PVE's /disks/list already carries `health` (PASSED / FAILED / UNKNOWN, or a
 * raw SMART string on some controllers) and `wearout` -- the backend has been
 * forwarding both all along, the table just never showed them, so an operator
 * picking a replacement had no way to see that a candidate was already dying.
 *
 * wearout is REMAINING life, not consumed: PVE reports 100 for a new SSD and
 * counts DOWN. It is also 'N/A' on spinning disks, which is not a number and
 * must not render as 0%.
 */
function DiskHealth({ health, wearout, t }: {
  health?: string | null; wearout?: number | string | null; t: (k: string) => string;
}) {
  const raw = (health || '').trim();
  if (!raw) return <span className="zfs-dim">—</span>;
  const up = raw.toUpperCase();
  const bad = up.includes('FAIL');
  const ok = up === 'PASSED' || up === 'OK';
  const tone = bad ? 'bad' : ok ? 'ok' : 'unknown';
  const w = typeof wearout === 'number' ? wearout
          : (typeof wearout === 'string' && /^\d+$/.test(wearout)) ? Number(wearout)
          : null;
  return (
    <span className="zfs-health">
      <span className={`zfs-tag health-${tone}`}>
        {bad ? t('zfs.smart_fail') : ok ? t('zfs.smart_pass') : raw}
      </span>
      {w !== null && (
        <span className={`zfs-wear${w <= 10 ? ' crit' : w <= 25 ? ' warn' : ''}`}
              title={t('zfs.wearout_hint')}>
          {t('zfs.life')} {w}%
        </span>
      )}
    </span>
  );
}

function MediaMix({ disks }: { disks: ZDisk[] }) {
  // Map explicitly: an unexpected `kind` used to index a missing key, giving
  // NaN and silently dropping the disk from the legend while still counting it
  // in the total, so the bar under-filled for no visible reason.
  const counts = { hdd: 0, ssd: 0, nvme: 0 };
  for (const d of disks) {
    const k = d.kind === 'nvme' ? 'nvme'
      : d.kind === 'ssd' ? 'ssd'
      : d.kind === 'hdd' ? 'hdd'
      : (d.rotational ? 'hdd' : 'ssd');
    counts[k]++;
  }
  const total = disks.length || 1;
  return (
    <span className="zfs-mix">
      <span className="zfs-mix-bar">
        {(['nvme', 'ssd', 'hdd'] as const).map((k) => counts[k] ? (
          <span key={k} className={`zfs-mix-seg ${k}`}
                style={{ width: `${(counts[k] / total) * 100}%` }}
                title={`${kindLabel(k)}: ${counts[k]}`} />
        ) : null)}
      </span>
      {(['nvme', 'ssd', 'hdd'] as const).map((k) => counts[k] ? (
        <span key={k} className="zfs-mix-n">
          <MediaIcon kind={k} size={12} />{counts[k]}
        </span>
      ) : null)}
    </span>
  );
}

// ------------------------------------------------------------- disk chip

function DiskChip({ v, onPick, dim, kind }: {
  v: ZVdev; onPick?: (v: ZVdev) => void; dim?: boolean; kind?: string;
}) {
  const { t } = useTranslation();
  const errs = errTotal(v);
  const cls = stateClass(v.state);
  return (
    <button
      type="button"
      className={`zfs-chip st-${cls}${dim ? ' dim' : ''}`}
      onClick={onPick ? () => onPick(v) : undefined}
      title={[
        v.by_id || v.name,
        `state: ${v.state}`,
        v.size ? `size: ${formatDiskSize(v.size)}` : '',
        `R:${v.read_errors} W:${v.write_errors} CKSUM:${v.cksum_errors}`,
        v.slow_ios ? `slow I/O: ${v.slow_ios}` : '',
        kind ? `media: ${kindLabel(kind)}` : '',
        v.is_partition ? 'partition-backed' : '',
        v.note || '',
      ].filter(Boolean).join('\n')}
    >
      <span className="zfs-chip-led" />
      {kind && <MediaIcon kind={kind} size={12} />}
      <span className="zfs-chip-name">{shortDisk(v)}</span>
      {v.size ? <span className="zfs-chip-size">{formatDiskSize(v.size, 0)}</span> : null}
      {/* A bare red number told nobody anything — the count needs to say WHICH
          errors, because read/write/checksum mean different things (a checksum
          error is data ZFS had to repair, not a failed I/O). */}
      {errs > 0 && (
        <span className="zfs-chip-err"
              title={[
                `${t('zfs.err_read')}: ${v.read_errors || 0}`,
                `${t('zfs.err_write')}: ${v.write_errors || 0}`,
                `${t('zfs.err_cksum')}: ${v.cksum_errors || 0}`,
                t('zfs.err_hint'),
              ].join('\n')}>
          ⚠ {errs}
        </span>
      )}
      {v.slow_ios > 0 && errs === 0 && (
        <span className="zfs-chip-slow" title={t('zfs.slow_hint')}>slow</span>
      )}
    </button>
  );
}

// ------------------------------------------------------------ vdev group

function VdevGroup({ v, group, onPick, kinds, isRootPool }: {
  v: ZVdev; group: string; onPick?: (v: ZVdev) => void;
  kinds?: Record<string, string>; isRootPool?: boolean;
}) {
  const { t } = useTranslation();
  const note = redundancyNote(v, t);
  // A leaf-only entry (cache / spare) has no children — render it as one chip.
  const members = v.children.length ? v.children : [v];
  const cls = stateClass(v.state);
  // Members are identified by by-id, possibly with a -partN suffix (boot
  // layouts); the inventory is keyed by whole-disk by-id.
  const kindOf = (m: ZVdev) =>
    kinds?.[(m.by_id || '').replace(/-part\d+$/, '')];
  // Every member partition-backed => a boot layout; mark the group, not each
  // disk. Mixed (rare) keeps the per-chip badge so the odd one stands out.
  // NOT is_partition. ZFS creates a partition when it is handed a whole disk,
  // so essentially every pool member is `-part1` and that flag marked every
  // disk in every pool — including backup pools — as a boot device. The only
  // thing we actually know is whether the pool boots the node, and we only know
  // THAT when the SSH read filled in is_root_pool; the API-only path cannot
  // tell, and silence is the honest answer there.
  const allBoot = isRootPool === true;
  return (
    <div className={`zfs-vdev grp-${group} st-${cls}`}>
      <span className="cb tl" /><span className="cb tr" />
      <span className="cb bl" /><span className="cb br" />
      <div className="zfs-vdev-head">
        <span className="zfs-vdev-type">{v.level || v.type || 'disk'}</span>
        <span className="zfs-vdev-name">{v.children.length ? v.name : ''}</span>
        <span className="zfs-vdev-meta">
          {members.length} {members.length === 1 ? t('zfs.disk') : t('zfs.disks')}
          {note ? ` · ${note}` : ''}
        </span>
        {allBoot && (
          <span className="zfs-chip-boot" title={t('zfs.boot_layout_hint')}>boot</span>
        )}
        <TolerancePips v={v} />
        {v.size ? (
          <MiniBar pct={((v.alloc || 0) / v.size) * 100}
                   tone={cls === 'ok' ? 'cyan' : cls === 'warn' ? 'amber' : 'red'} />
        ) : null}
        <span className={`zfs-vdev-state st-${cls}`}>
          <StateIcon state={v.state} size={12} />{v.state}
        </span>
      </div>
      <div className="zfs-vdev-body">
        {members.map((c) => (
          // A member with its own children is a transient nested vdev:
          // "replacing-N" during a zpool replace, "spare-N" once a hot spare
          // has stepped in. Flattening it to one chip hides WHICH disk is
          // taking over from WHICH — precisely the thing an operator needs to
          // read during the most nerve-racking operation there is. Render it
          // as a labelled sub-group with old and new side by side.
          c.children.length ? (
            <div key={c.name} className={`zfs-nest st-${stateClass(c.state)}`}>
              <span className="zfs-nest-label">
                {c.name.replace(/-\d+$/, '')}
                <span className={`zfs-nest-state st-${stateClass(c.state)}`}>{c.state}</span>
              </span>
              <div className="zfs-nest-body">
                {c.children.map((g, i) => (
                  <React.Fragment key={g.name + (g.by_id || '')}>
                    {i > 0 && <span className="zfs-nest-arrow">→</span>}
                    <DiskChip v={g} onPick={onPick} kind={kindOf(g)} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <DiskChip key={c.name + (c.by_id || '')} v={c} onPick={onPick}
                      kind={kindOf(c)}
                      dim={group === 'spare' && c.state === 'AVAIL'} />
          )
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------- pool card

function PoolCard({ pool, onPick, onAction, busy, kinds }: {
  pool: ZPool;
  kinds?: Record<string, string>;
  onPick: (v: ZVdev) => void;
  onAction: (kind: Exclude<WizardKind, null> | 'scrub' | 'trim' | 'consumers', pool: ZPool) => void;
  busy: boolean;
}) {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const { t } = useTranslation();
  const used = pool.alloc || 0;
  const total = pool.size || 0;
  const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0;
  const scan = pool.scan;
  const scanning = !!scan && (scan.state === 'SCANNING' || scan.state === 'ACTIVE');
  const cls = stateClass(pool.state);

  return (
    <div className="panel-card zfs-pool">
      <div className="panel-card-head">
        <span className="panel-card-dot" />
        <span className="zfs-pool-name">{pool.name}</span>
        {pool.is_root_pool && <span className="zfs-tag root">{t('zfs.root_pool')}</span>}
        <span className={`zfs-pool-state st-${cls}`}>
          <StateIcon state={pool.state} size={12} />{pool.state}
        </span>
        <span className="panel-card-meta">
          {pool.vdev_count} vdev{pool.vdev_count === 1 ? '' : 's'}
          {pool.frag ? ` · frag ${pool.frag}` : ''}
          {pool.error_count ? ` · ${pool.error_count} ${t('zfs.errors')}` : ''}
        </span>
        <span className="zfs-pool-actions">
          <button className="zfs-btn ico" disabled={busy}
                  onClick={() => onAction('scrub', pool)}>{Ico.scrub()}{t('zfs.scrub')}</button>
          <button className="zfs-btn ico" disabled={busy}
                  onClick={() => onAction('vdev', pool)}>{Ico.addVdev()}{t('zfs.add_vdev')}</button>
          <button className="zfs-btn ico" disabled={busy}
                  onClick={() => onAction('trim', pool)}>{Ico.trim()}{t('zfs.trim')}</button>
          <button className="zfs-btn ico" disabled={busy}
                  onClick={() => onAction('consumers', pool)}>{Ico.blast()}{t('zfs.blast_radius')}</button>
        </span>
      </div>

      <div className="panel-card-body">
        {/* capacity */}
        <div className="zfs-cap">
          <div className="zfs-cap-bar">
            <div className="zfs-cap-fill" style={{ width: `${pct}%` }} />
            <div className="zfs-cap-ticks" />
          </div>
          <div className="zfs-cap-txt">
            <span title={t('zfs.iec_hint')}>
              {formatBytesIEC(used)} / {total ? formatBytesIEC(total) : '—'}
            </span>
            <span className="zfs-cap-pct">{pct.toFixed(1)}%</span>
          </div>
        </div>

        {/* Scrub / resilver. A progress bar only earns its full-width row while
            something is actually running — a bar frozen at 100% for a scrub
            that finished three weeks ago is the single biggest source of noise
            on this page, repeated once per pool. Finished scans collapse to
            one muted line. */}
        {scan && scan.function && (scanning ? (
          <div className="zfs-scan live">
            <span className="zfs-scan-label">{scan.function}</span>
            <div className="zfs-scan-bar">
              <div className="zfs-scan-fill"
                   style={{ width: `${scan.percent ?? 0}%` }} />
            </div>
            <span className="zfs-scan-meta">
              {scan.state}
              {scan.percent != null ? ` · ${scan.percent}%` : ''}
              {scan.examined != null && scan.total
                ? ` · ${formatBytesIEC(scan.examined)} / ${formatBytesIEC(scan.total)}` : ''}
              {scan.errors ? ` · ${scan.errors} ${t('zfs.errors')}` : ''}
            </span>
          </div>
        ) : (
          <div className="zfs-scan-done">
            {scan.function} · {scan.state}
            {scan.errors ? ` · ${scan.errors} ${t('zfs.errors')}` : ''}
          </div>
        ))}

        {/* PVE hands back a paragraph of untranslated advisory text here, the
            same one on every pool. Full width it dominated the card and pushed
            the topology — the thing people came for — below the fold. One line,
            click to read it all. */}
        {pool.status_text && (
          <button type="button"
                  className={`zfs-notice${noticeOpen ? ' open' : ''}`}
                  onClick={() => setNoticeOpen((v) => !v)}
                  title={pool.status_text}>
            <span className="zfs-notice-tag">{t('zfs.zfs_says')}</span>
            <span className="zfs-notice-txt">{pool.status_text}</span>
          </button>
        )}

        {/* THE topology map */}
        <div className="zfs-topo">
          {GROUP_ORDER.map((g) => {
            const list = pool.vdevs?.[g] || [];
            if (!list.length) return null;
            return (
              <div key={g} className={`zfs-topo-row row-${g}`}>
                <div className="zfs-topo-label">
                  <span className="zfs-topo-label-txt">
                    <span className={`zfs-gico grp-${g}`}>{(CLASS_ICON[g] || Ico.data)(12)}</span>
                    {t(`zfs.group.${g}`)}
                  </span>
                  <span className="zfs-topo-rail" />
                </div>
                <div className="zfs-topo-groups">
                  {list.map((v) => (
                    <VdevGroup key={g + v.name} v={v} group={g} onPick={onPick}
                               kinds={kinds} isRootPool={pool.is_root_pool} />
                  ))}
                  {g === 'data' && pool.has_raidz && (
                    <div className="zfs-oneway" title={t('zfs.oneway_hint')}>
                      {t('zfs.oneway')}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------- modal

function Modal({ title, onClose, children, wide }: {
  title: string; onClose: () => void; children: React.ReactNode; wide?: boolean;
}) {
  return createPortal(
    <div className="zfs-ov"
         onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`zfs-modal${wide ? ' wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="zfs-modal-head">
          <span>{title}</span>
          <button className="zfs-x" onClick={onClose} aria-label="close">×</button>
        </div>
        <div className="zfs-modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

/** A dry run only means something for the exact request it was run against.
 *  Changing the disk selection or ticking "force" after previewing used to
 *  leave Execute enabled, so the operator could confirm command A and run
 *  command B — on `replace`, the most destructive action in the app. Every
 *  wizard now stamps the preview with a signature of its request body and
 *  refuses to execute once that signature drifts. */
function sig(body: any): string {
  return JSON.stringify(body, Object.keys(body).sort());
}

function canExecute(preview: any, body: any): boolean {
  return !!preview && preview.ok !== false && preview.dry_run === true
    && preview.__sig === sig(body);
}

/** Shared preview block: ZFS's own dry-run verdict + our warnings. */
function Preview({ data }: { data: any }) {
  const { t } = useTranslation();
  if (!data) return null;
  // Never assume shape: this renders arbitrary error payloads from three
  // endpoints, and `.join`/`.map` on a string is the blank-screen bug from
  // v0.5.0 all over again.
  const asLines = (v: any): string =>
    Array.isArray(v) ? v.join('\n') : v == null ? '' : String(v);
  const warns: string[] = Array.isArray(data.warnings) ? data.warnings
    : data.warnings ? [String(data.warnings)] : [];
  return (
    <div className="zfs-preview">
      {data.plan && (
        <>
          <div className="zfs-preview-label">{t('zfs.plan')}</div>
          <pre className="zfs-pre">{asLines(data.plan)}</pre>
        </>
      )}
      {data.command && (
        <>
          <div className="zfs-preview-label">{t('zfs.command')}</div>
          <pre className="zfs-pre">{asLines(data.command)}</pre>
        </>
      )}
      {data.preview && (
        <>
          <div className="zfs-preview-label">{t('zfs.zfs_dryrun')}</div>
          <pre className="zfs-pre dim">{asLines(data.preview)}</pre>
        </>
      )}
      {data.warning && <div className="zfs-warn danger">{asLines(data.warning)}</div>}
      {warns.map((w, i) => <div className="zfs-warn" key={i}>{w}</div>)}
    </div>
  );
}

// ------------------------------------------------------------------- view

export function ZFSManager({ cluster, clusters }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();

  const clusterList = useMemo(() => {
    if (clusters && Object.keys(clusters).length) return Object.values(clusters);
    return cluster ? [cluster] : [];
  }, [cluster, clusters]);

  const [cid, setCid] = useState<string>(() => clusterList[0]?.id || '');
  const [node, setNode] = useState<string>('');
  const [pools, setPools] = useState<ZPool[]>([]);
  const [disks, setDisks] = useState<ZDisk[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [source, setSource] = useState<string>('api');
  // Pools and the disk inventory are two different jobs — looking after an
  // existing pool vs. finding media to build/repair one — so they get their own
  // tabs instead of one long scroll.
  // Disk inventory sort. Six disks fit on screen, sixty do not — and the column
  // you want to sort by depends on the question (biggest free disk? all the
  // NVMe? which are claimed?).
  const [invSort, setInvSort] = useState<{ key: string; dir: 1 | -1 }>(
    { key: 'by_id', dir: 1 });
  const [tab, setTab] = useState<'pools' | 'disks'>(() => {
    try {
      const v = localStorage.getItem('jtp.zfs.tab');
      return v === 'disks' ? 'disks' : 'pools';
    } catch { return 'pools'; }
  });
  useEffect(() => {
    try { localStorage.setItem('jtp.zfs.tab', tab); } catch { /* private mode */ }
  }, [tab]);
  const [busy, setBusy] = useState(false);

  const [wizard, setWizard] = useState<WizardKind>(null);
  // A boot-mirror resilver runs for hours, so an operator who lands on this
  // page mid-run must SEE it without hunting: poll the cluster-wide job list
  // and surface anything still running as a banner.
  const [bmJobs, setBmJobs] = useState<any[]>([]);
  const [wizPool, setWizPool] = useState<ZPool | null>(null);
  const [wizTarget, setWizTarget] = useState<ZVdev | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [consumers, setConsumers] = useState<any>(null);
  const [sshHelp, setSshHelp] = useState<string | null>(null);
  const [pubkey, setPubkey] = useState<string>('');

  const activeCluster = useMemo(
    () => clusterList.find((c) => c.id === cid) || clusterList[0] || null,
    [clusterList, cid]);

  const nodeNames = useMemo(() => {
    const ns = activeCluster?.nodes;
    if (!ns) return [] as string[];
    const arr = Array.isArray(ns) ? ns : Object.values(ns);
    return arr.map((n: any) => n?.name || n?.node).filter(Boolean).sort();
  }, [activeCluster]);

  // Track the globally-selected cluster. Only seeding `cid` when it was empty
  // meant a switch via the top-bar ClusterSelector left `cid` on the OLD
  // cluster while `node` moved to the new one — the page then fetched
  // /clusters/<old>/nodes/<new-node>/zfs, and in single-cluster mode the
  // in-page picker is hidden so there was no way to correct it.
  useEffect(() => {
    const want = activeCluster?.id || clusterList[0]?.id || '';
    if (want && want !== cid) {
      setCid(want);
      setPools([]); setDisks([]); setNode('');
    }
  }, [activeCluster, clusterList, cid]);
  useEffect(() => {
    if (nodeNames.length && !nodeNames.includes(node)) setNode(nodeNames[0]);
  }, [nodeNames, node]);

  // Monotonic request id: changing cluster fires load() with (newCid, oldNode)
  // and again with (newCid, newNode); if the first — usually a 404 — lands
  // last it wipes good data and shows an error for a healthy node.
  const reqRef = useRef(0);

  const load = useCallback(async () => {
    if (!cid || !node) return;
    const myReq = ++reqRef.current;
    setLoading(true); setErr(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(node)}/zfs`,
        { credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      if (myReq !== reqRef.current) return;      // superseded
      if (!r.ok || d.ok === false) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setPools(d.pools || []);
      setDisks(d.disks || []);
      setSource(d.source || 'api');
    } catch (e: any) {
      if (myReq !== reqRef.current) return;
      setErr(String(e.message || e));
      setPools([]); setDisks([]);
    } finally {
      if (myReq === reqRef.current) setLoading(false);
    }
  }, [cid, node]);

  useEffect(() => { void load(); }, [load]);
  // Refresh while a scan is live so progress actually moves.
  useEffect(() => {
    const live = pools.some((p) => p.scan && (p.scan.state === 'SCANNING' || p.scan.state === 'ACTIVE'));
    if (!live) return;
    const iv = window.setInterval(() => { void load(); }, 15000);
    return () => window.clearInterval(iv);
  }, [pools, load]);

  const freeDisks = useMemo(() => disks.filter((d) => d.free && d.by_id), [disks]);
  const sortedDisks = useMemo(() => {
    const val = (d: ZDisk, k: string): string | number => {
      switch (k) {
        case 'size': return d.size || 0;
        // Free disks first within a usage sort — that is what you are looking
        // for when you sort by it.
        case 'usage': return d.free ? '' : (d.pool || '\uffff');
        case 'model': return (d.model || '').toLowerCase();
        case 'serial': return (d.serial || '').toLowerCase();
        case 'kind': return (d.kind || '').toLowerCase();
        // Failing disks first, then unknown, then healthy, and within each
        // band the most worn first -- sorting by health means "show me what
        // I should worry about", not "show me PASSED alphabetically".
        case 'health': {
          const up = (d.health || '').toUpperCase();
          const band = up.includes('FAIL') ? 0 : !up ? 1 : (up === 'PASSED' || up === 'OK') ? 3 : 2;
          const w = typeof d.wearout === 'number' ? d.wearout
                  : (typeof d.wearout === 'string' && /^\d+$/.test(d.wearout)) ? Number(d.wearout)
                  : 101;
          return band * 1000 + w;
        }
        default: return (d.by_id || d.dev || '').toLowerCase();
      }
    };
    return [...disks].sort((a, b) => {
      const x = val(a, invSort.key), y = val(b, invSort.key);
      if (x < y) return -invSort.dir;
      if (x > y) return invSort.dir;
      return 0;
    });
  }, [disks, invSort]);
  const maxDiskSize = useMemo(
    () => disks.reduce((m, d) => Math.max(m, d.size || 0), 1), [disks]);
  // by-id -> media kind, so topology chips can show the right HDD/SSD/NVMe mark
  const diskKinds = useMemo(() => {
    const m: Record<string, string> = {};
    for (const d of disks) if (d.by_id) m[d.by_id] = d.kind || (d.rotational ? 'hdd' : 'ssd');
    return m;
  }, [disks]);

  // Maintenance operations need passwordless root SSH (PVE exposes no API for
  // zpool replace / add / scrub). Reads do NOT — so rather than a red wall, the
  // page stays useful and only the actions explain the missing precondition.
  const isSshProblem = (d: any) =>
    d?.error === 'ssh_failed' ||
    /permission denied|publickey|host key|no route to host|connection refused/i
      .test(String(d?.detail || ''));

  const offerSshHelp = useCallback(async (detail: string) => {
    try {
      const r = await fetch('/api/ssh/pubkey', { credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      setPubkey(d.pubkey || d.key || '');
    } catch { /* helper is best-effort */ }
    setSshHelp(detail || '');
  }, []);

  const post = useCallback(async (path: string, body: any) => {
    // A rejected fetch used to escape into an onClick handler, leaving the
    // page-level `busy` true forever — every action button on every pool card
    // disabled until a reload. Always resolve.
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(node)}/zfs${path}`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body) });
      // A non-JSON body (gateway error page, auth redirect) must not become an
      // empty object that later reads as a valid preview.
      const d = await r.json().catch(() => ({
        error: `http_${r.status}`,
        detail: `server returned ${r.status} with a non-JSON body`,
      }));
      return { ok: r.ok, status: r.status, d };
    } catch (e: any) {
      return { ok: false, status: 0,
               d: { error: 'network', detail: String(e?.message || e) } };
    }
  }, [cid, node]);

  // ---- actions -----------------------------------------------------------

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(cid)}/zfs/boot-mirror/jobs`,
          { credentials: 'same-origin' });
        if (!r.ok) return;
        const d = await r.json().catch(() => ({}));
        if (alive) setBmJobs((d.jobs || []).filter((j: any) => j.status === 'running'));
      } catch { /* banner is best-effort; never break the page */ }
    };
    tick();
    const h = window.setInterval(tick, 15000);
    return () => { alive = false; window.clearInterval(h); };
  }, [cid]);

  const openWizard = useCallback((kind: Exclude<WizardKind, null>, p: ZPool, target?: ZVdev) => {
    setWizPool(p); setWizTarget(target || null); setPreview(null); setWizard(kind);
  }, []);

  const handleAction = useCallback(async (
    kind: Exclude<WizardKind, null> | 'scrub' | 'trim' | 'consumers', p: ZPool) => {
    if (kind === 'scrub') {
      const live = p.scan && (p.scan.state === 'SCANNING' || p.scan.state === 'ACTIVE');
      const ok = await dialog.confirm(
        live ? t('zfs.confirm_scrub_stop').replace('{pool}', p.name)
             : t('zfs.confirm_scrub').replace('{pool}', p.name));
      if (!ok) return;
      setBusy(true);
      const { ok: good, d } = await post(
        `/pools/${encodeURIComponent(p.name)}/scrub`, { action: live ? 'stop' : 'start' });
      setBusy(false);
      if (!good) {
        if (isSshProblem(d)) await offerSshHelp(String(d.detail || d.error || ''));
        else await dialog.alert(`${t('zfs.failed')}: ${d.detail || d.error}`);
      }
      void load();
      return;
    }
    if (kind === 'trim') {
      const ok = await dialog.confirm(t('zfs.confirm_trim').replace('{pool}', p.name));
      if (!ok) return;
      setBusy(true);
      const { ok: good, d } = await post(
        `/pools/${encodeURIComponent(p.name)}/trim`, { action: 'start' });
      setBusy(false);
      if (!good) {
        if (isSshProblem(d)) await offerSshHelp(String(d.detail || d.error || ''));
        else await dialog.alert(`${t('zfs.failed')}: ${d.detail || d.error}`);
      }
      void load();
      return;
    }
    if (kind === 'consumers') {
      setBusy(true);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(node)}` +
          `/zfs/pools/${encodeURIComponent(p.name)}/consumers`, { credentials: 'same-origin' });
        const d = await r.json().catch(() => ({ error: 'bad_response' }));
        // Rendering a failed request as an empty list would tell the operator
        // "nothing depends on this pool" moments before they pull a disk — the
        // same dangerous lie the backend guards against. Surface the failure.
        if (!r.ok || d.error) {
          if (isSshProblem(d)) await offerSshHelp(String(d.detail || d.error || ''));
          else await dialog.alert(`${t('zfs.failed')}: ${d.detail || d.error || r.status}`);
          return;
        }
        setConsumers(d);
      } catch (e: any) {
        await dialog.alert(`${t('zfs.failed')}: ${String(e?.message || e)}`);
      } finally { setBusy(false); }
      return;
    }
    openWizard(kind, p);
  }, [dialog, t, post, load, cid, node, openWizard]);

  const onPickDisk = useCallback((p: ZPool, v: ZVdev) => {
    // Clicking a member offers the operation that member needs most.
    openWizard('replace', p, v);
  }, [openWizard]);

  return (
    <div className="zfs-page view-container">
      <div className="zfs-header">
        <h1 className="zfs-title font-display">
          <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
            <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
          </svg>
          {t('zfs.title')}
        </h1>
        <div className="zfs-picker">
          {clusterList.length > 1 && (
            <CyberSelect
              value={cid}
              options={clusterList.map((c) => ({ value: c.id, label: c.name || c.id }))}
              onChange={(v) => { setCid(v); setPools([]); setDisks([]); }}
            />
          )}
          <CyberSelect
            value={node}
            options={nodeNames.map((n) => ({ value: n, label: n })) as CyberOption[]}
            onChange={setNode}
            placeholder={t('zfs.pick_node')}
          />
          <button className="zfs-btn ico" onClick={() => void load()} disabled={loading}>
            {Ico.refresh()}{loading ? t('zfs.loading') : t('zfs.refresh')}
          </button>
          <button className="zfs-btn ico" disabled={!node}
                  onClick={() => { setWizPool(null); setPreview(null); setWizard('bootmirror'); }}>
            {Ico.boot()}{t('zfs.bm.button')}
          </button>
          <button className="zfs-btn primary ico" disabled={busy || !freeDisks.length}
                  onClick={() => { setWizPool(null); setPreview(null); setWizard('create'); }}>
            {Ico.create()}{t('zfs.create_pool')}
          </button>
        </div>
      </div>

      <div className="zfs-tabs">
        <button className={`zfs-tab${tab === 'pools' ? ' active' : ''}`}
                onClick={() => setTab('pools')}>
          {Ico.create(15)}
          <span>{t('zfs.tab_pools')}</span>
          <span className="zfs-tab-n">{pools.length}</span>
        </button>
        <button className={`zfs-tab${tab === 'disks' ? ' active' : ''}`}
                onClick={() => setTab('disks')}>
          {Ico.data(15)}
          <span>{t('zfs.tab_disks')}</span>
          <span className="zfs-tab-n">{disks.length}</span>
        </button>
      </div>

      {err && <div className="zfs-err">{err}</div>}
      {!err && !!pools.length && source === 'api' && (
        <div className="zfs-info">
          {Ico.ok(12)}{t('zfs.api_read_note')}
        </div>
      )}
      {loading && !pools.length && <div className="zfs-load">{t('zfs.loading')}</div>}

      {tab === 'pools' && !loading && !err && !pools.length && (
        <div className="panel-card zfs-empty">
          <div className="panel-card-body">{t('zfs.no_pools')}</div>
        </div>
      )}

      {tab === 'pools' && pools.map((p) => (
        <PoolCard key={p.name} pool={p} busy={busy} kinds={diskKinds}
                  onPick={(v) => onPickDisk(p, v)}
                  onAction={handleAction} />
      ))}

      {/* disk inventory */}
      {tab === 'disks' && !loading && !err && !disks.length && (
        <div className="panel-card zfs-empty">
          <div className="panel-card-body">{t('zfs.no_disks')}</div>
        </div>
      )}

      {tab === 'disks' && !!disks.length && (
        <div className="panel-card zfs-inv">
          <div className="panel-card-head">
            <span className="panel-card-dot" />
            <span>{t('zfs.inventory')}</span>
            <span className="panel-card-meta">
              {disks.length} {t('zfs.disks')} · {freeDisks.length} {t('zfs.free')}
            </span>
            <span style={{ marginLeft: 'auto' }}><MediaMix disks={disks} /></span>
          </div>
          <div className="panel-card-body">
            <table className="vm-table zfs-table">
              <thead>
                <tr>
                  {([
                    ['by_id', 'zfs.device', ''],
                    ['model', 'zfs.model', ''],
                    ['serial', 'zfs.serial', ''],
                    ['size', 'zfs.size', 'num'],
                    ['kind', 'zfs.kind', ''],
                    ['health', 'zfs.health', 'nowrap'],
                    ['usage', 'zfs.usage', ''],
                  ] as const).map(([key, label, cls]) => (
                    <th key={key} className={`${cls} zfs-th-sort${invSort.key === key ? ' on' : ''}`}
                        onClick={() => setInvSort((p) => ({
                          key, dir: p.key === key ? (p.dir === 1 ? -1 : 1) : 1 }))}
                        title={t('zfs.sort_hint')}>
                      {t(label)}
                      <span className="zfs-th-arrow">
                        {invSort.key === key ? (invSort.dir === 1 ? '\u25b2' : '\u25bc') : '\u2195'}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedDisks.map((d) => (
                  <tr key={d.kernel} className={d.free ? 'free' : ''}>
                    <td><code>{d.by_id || d.dev}</code></td>
                    <td>{d.model || '—'}</td>
                    <td>{d.serial || '—'}</td>
                    <td className="num">
                      <span className="zfs-sizecell">
                        {formatDiskSize(d.size)}
                        <MiniBar pct={(d.size / maxDiskSize) * 100}
                                 tone={d.kind === 'nvme' ? 'magenta' : d.kind === 'ssd' ? 'cyan' : 'grey'}
                                 width={40} />
                      </span>
                    </td>
                    <td>
                      <span className="zfs-media">
                        <MediaIcon kind={d.kind} />
                        {kindLabel(d.kind)}
                        {d.transport && d.transport !== 'nvme' && (
                          <span className="zfs-tran">{d.transport}</span>
                        )}
                      </span>
                    </td>
                    <td><DiskHealth health={d.health} wearout={d.wearout} t={t} /></td>
                    <td>
                      {d.pool
                        ? <span className="zfs-tag pool">{Ico.data(10)}{d.pool}</span>
                        : d.mounted ? <span className="zfs-tag busy">{t('zfs.mounted')}</span>
                        : d.partitions ? <span className="zfs-tag busy">{t('zfs.partitioned')}</span>
                        : <span className="zfs-tag ok">{t('zfs.free')}</span>}
                      {d.has_esp && <span className="zfs-tag boot">ESP</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- wizards ---------------- */}
      {bmJobs.length > 0 && (
        <div className="zfs-bm-banner">
          {bmJobs.map((j) => (
            <button key={j.id} className="zfs-bm-banner-row"
                    onClick={() => { setNode(j.node); setWizard('bootmirror'); }}>
              <span className="zfs-bm-spark" aria-hidden="true" />
              <span className="zfs-bm-banner-txt">
                {t(`zfs.bm.scenario.${j.scenario}`)} · {j.pool} @ {j.node} ·{' '}
                {t(`zfs.bm.stage.${j.stage}`)}
                {j.stage === 'resilvering' ? ` ${j.progress.toFixed(1)}%` : ''}
              </span>
              <span className="zfs-bm-banner-go">{t('zfs.bm.title')} →</span>
            </button>
          ))}
        </div>
      )}

      {wizard === 'replace' && wizPool && (
        <ReplaceWizard pool={wizPool} target={wizTarget} free={freeDisks}
                       preview={preview} setPreview={setPreview}
                       post={post} onDone={() => { setWizard(null); void load(); }}
                       onClose={() => setWizard(null)} />
      )}
      {wizard === 'vdev' && wizPool && (
        <VdevWizard pool={wizPool} free={freeDisks}
                    preview={preview} setPreview={setPreview}
                    post={post} onDone={() => { setWizard(null); void load(); }}
                    onClose={() => setWizard(null)} />
      )}
      {wizard === 'bootmirror' && (
        <Modal title={`${t('zfs.bm.title')} — ${node}`} onClose={() => setWizard(null)} wide>
          <BootMirrorWizard cid={cid} node={node} freeDisks={freeDisks as any}
                            onClose={() => setWizard(null)}
                            onChanged={() => void load()} />
        </Modal>
      )}

      {wizard === 'create' && (
        <CreateWizard free={freeDisks}
                      preview={preview} setPreview={setPreview}
                      post={post} onDone={() => { setWizard(null); void load(); }}
                      onClose={() => setWizard(null)} />
      )}
      {sshHelp !== null && (
        <Modal title={t('zfs.ssh_required')} onClose={() => setSshHelp(null)} wide>
          <div className="zfs-warn">{t('zfs.ssh_why')}</div>
          {sshHelp && <pre className="zfs-pre dim">{sshHelp}</pre>}
          <div className="zfs-preview-label">{t('zfs.ssh_how')}</div>
          <pre className="zfs-pre">{`ssh-copy-id -i ~/.ssh/id_ed25519.pub root@<node>`}</pre>
          {pubkey && (
            <>
              <div className="zfs-preview-label">{t('zfs.ssh_pubkey')}</div>
              <pre className="zfs-pre">{pubkey}</pre>
            </>
          )}
          <div className="zfs-warn">{t('zfs.ssh_propagate')}</div>
          <div className="zfs-actions">
            <button className="zfs-btn" onClick={() => {
              void navigator.clipboard?.writeText(pubkey);
            }}>{t('zfs.copy_key')}</button>
            <button className="zfs-btn primary" onClick={() => setSshHelp(null)}>
              {t('zfs.close')}
            </button>
          </div>
        </Modal>
      )}

      {consumers && (
        <Modal title={t('zfs.blast_radius')} onClose={() => setConsumers(null)} wide>
          <div className="zfs-blast">
            <div className="zfs-preview-label">{t('zfs.storages')}</div>
            {(consumers.storages || []).length
              ? <ul className="zfs-list">
                  {consumers.storages.map((s: any) => (
                    <li key={s.storage}><code>{s.storage}</code> <span className="dim">({s.type})</span></li>
                  ))}
                </ul>
              : <div className="dim">{t('zfs.none')}</div>}
            <div className="zfs-preview-label">
              {t('zfs.guests')} ({consumers.guest_count || 0})
            </div>
            {(consumers.guests || []).length
              ? <div className="zfs-guests">
                  {consumers.guests.map((g: any) => (
                    <span key={g.vmid} className={`zfs-guest ${g.status === 'running' ? 'up' : ''}`}>
                      <b>{g.vmid}</b> {g.name}
                    </span>
                  ))}
                </div>
              : <div className="dim">{t('zfs.none')}</div>}
            <div className="zfs-warn">{t('zfs.blast_hint')}</div>
          </div>
        </Modal>
      )}

      <style>{`
        .zfs-page {
          padding: var(--spacing-lg);
          display: flex; flex-direction: column; gap: var(--spacing-lg);
          overflow: auto;
        }
        /* A column flex container shrinks its children by default, and
           .panel-card is overflow:hidden — together they silently guillotined
           the bottom of every pool card (the CACHE and SPARE rows of a
           6-vdev pool vanished with no scrollbar to hint at it). Cards must
           keep their natural height and let the PAGE scroll instead. */
        .zfs-page > * { flex: 0 0 auto; }
        .zfs-header {
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }
        .zfs-title {
          margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.12em;
          color: var(--text-primary);
          display: inline-flex; align-items: center; gap: var(--spacing-sm);
        }
        .zfs-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: zfs-title-pulse 2.4s ease-in-out infinite;
        }
        @keyframes zfs-title-pulse {
          0%, 100% { opacity: 0.85; transform: none; }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        .zfs-picker { margin-left: auto; display: flex; align-items: center; gap: 10px; }

        .zfs-btn {
          padding: 6px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all .15s ease;
        }
        .zfs-btn:hover:not(:disabled) {
          border-color: var(--primary); color: var(--primary);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.25);
        }
        .zfs-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .zfs-btn.primary { border-color: var(--primary); color: var(--primary); }
        .zfs-btn.danger { border-color: var(--danger); color: var(--danger); }

        .zfs-err {
          padding: 10px 14px; border-radius: var(--radius-sm);
          border: 1px solid var(--danger);
          background: rgba(255, 60, 90, 0.08);
          color: var(--danger); font-family: var(--font-mono); font-size: 13px;
        }
        .zfs-tabs {
          display: flex; gap: 8px; align-self: flex-start;
        }
        .zfs-tab {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all .15s ease;
        }
        .zfs-tab:hover { color: var(--primary); border-color: var(--primary-dim); }
        .zfs-tab.active {
          color: var(--primary); border-color: var(--primary);
          background: rgba(0, 240, 255, 0.08);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
        }
        .zfs-tab-n {
          font-family: var(--font-mono); font-size: 11px;
          padding: 1px 7px; border-radius: 9px;
          border: 1px solid currentColor; opacity: .8;
        }
        .zfs-info {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 12px; border-radius: var(--radius-sm);
          border: 1px solid var(--primary-dim);
          background: rgba(0, 240, 255, 0.05);
          color: var(--text-primary); font-size: 13px;
          align-self: flex-start;
        }
        .zfs-info svg { color: var(--success); }
        .zfs-load, .zfs-empty { color: var(--text-secondary); font-size: 13px; }

        /* ---------- pool ---------- */
        .zfs-pool-name {
          font-family: var(--font-mono); font-size: 14px;
          color: var(--text-primary); letter-spacing: 0.06em;
        }
        .zfs-pool-state, .zfs-vdev-state {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.1em; padding: 1px 7px; border-radius: 3px;
          border: 1px solid currentColor;
        }
        .zfs-page .st-ok, .zfs-modal .st-ok   { color: var(--success); }
        .zfs-page .st-warn, .zfs-modal .st-warn { color: var(--warning); }
        .zfs-page .st-bad, .zfs-modal .st-bad  { color: var(--danger); }
        .zfs-page .st-idle, .zfs-modal .st-idle { color: var(--text-secondary); }
        .zfs-pool-actions { margin-left: auto; display: flex; gap: 8px; }

        .zfs-tag {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.08em; padding: 1px 6px; border-radius: 3px;
          border: 1px solid currentColor; margin-left: 6px;
        }
        .zfs-tag.root { color: var(--primary); }
        .zfs-tag.pool { color: var(--primary); }
        .zfs-tag.ok   { color: var(--success); }
        .zfs-tag.busy { color: var(--text-secondary); }
        .zfs-tag.boot { color: var(--warning); }

        /* The verdict and the endurance figure are each a single short token;
           letting them wrap turns one row into three and misaligns the whole
           column. Keep both on one line and let the column claim the width. */
        .zfs-table th.nowrap, .zfs-table td.nowrap { white-space: nowrap; }
        .zfs-health { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
        .zfs-health .zfs-tag { white-space: nowrap; }
        .zfs-tag.health-ok      { color: var(--success); }
        .zfs-tag.health-bad     { color: #ff5c7a; border-color: rgba(255, 0, 64, .55);
                                  background: rgba(255, 0, 64, .12); }
        .zfs-tag.health-unknown { color: var(--text-muted); }
        /* Endurance is advisory next to the verdict, so it stays quiet --
           until it is low, which is the one time it should pull the eye. */
        .zfs-wear { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);
                    white-space: nowrap; }
        .zfs-wear.warn { color: var(--warning); }
        .zfs-wear.crit { color: #ff5c7a; font-weight: 600; }
        .zfs-dim { color: var(--text-muted); }

        .zfs-cap { margin-bottom: 12px; }
        .zfs-cap-bar {
          position: relative; height: 14px; border-radius: 3px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid var(--primary-dim); overflow: hidden;
        }
        .zfs-cap-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(0,240,255,.5), rgba(0,240,255,.85));
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
          transition: width .6s ease;
        }
        .zfs-cap-ticks {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(90deg,
            transparent 0 11px, rgba(5, 8, 16, 0.85) 11px 12px);
          pointer-events: none;
        }
        .zfs-cap-txt {
          display: flex; justify-content: space-between; margin-top: 4px;
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        .zfs-cap-pct { color: var(--primary); }

        .zfs-scan {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
          padding: 7px 10px; border-radius: var(--radius-sm);
          border: 1px solid var(--primary-dim);
          background: rgba(0, 240, 255, 0.04);
        }
        .zfs-scan.live { border-color: var(--warning); }
        .zfs-scan-label {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.1em; color: var(--primary);
        }
        .zfs-scan-bar {
          flex: 1; height: 6px; border-radius: 3px;
          background: rgba(255,255,255,0.06); overflow: hidden;
        }
        .zfs-scan-fill {
          height: 100%; background: var(--warning);
          box-shadow: 0 0 8px currentColor; transition: width .8s ease;
        }
        .zfs-scan-meta {
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        /* One line by default; click to read the whole advisory. It is the same
           untranslated paragraph on every pool, so at full height it repeated
           down the page and buried the topology. */
        .zfs-th-sort {
          cursor: pointer; user-select: none; white-space: nowrap;
        }
        .zfs-th-sort:hover { color: var(--primary); }
        .zfs-th-sort.on { color: var(--primary); }
        .zfs-th-arrow {
          margin-left: 5px; font-size: 10px; opacity: .45;
        }
        .zfs-th-sort.on .zfs-th-arrow { opacity: 1; }

        .zfs-notice {
          display: flex; align-items: baseline; gap: 8px; width: 100%;
          margin-bottom: 10px; padding: 6px 11px; cursor: pointer; text-align: left;
          border: 0; border-left: 2px solid var(--warning);
          background: rgba(255, 176, 32, 0.06);
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-secondary);
        }
        .zfs-notice:hover { background: rgba(255, 176, 32, 0.11); }
        .zfs-notice-tag { color: var(--warning); flex: none; }
        .zfs-notice-txt {
          flex: 1; min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .zfs-notice.open .zfs-notice-txt { white-space: pre-wrap; overflow: visible; }

        /* A finished scan does not need a progress bar — it needs one line. */
        .zfs-scan-done {
          margin-bottom: 10px; font-size: 12.5px; letter-spacing: .04em;
          color: var(--text-tertiary, var(--text-secondary)); opacity: .75;
          text-transform: uppercase; font-family: var(--font-mono);
        }

        /* ---------- topology ---------- */
        .zfs-topo { display: flex; flex-direction: column; gap: 14px; }
        .zfs-topo-row { display: flex; gap: 12px; align-items: stretch; }
        .zfs-topo-label {
          /* A flex item's min-width defaults to auto, so a basis of 74px was
             only a MINIMUM: the wider SPECIAL label grew its own column and
             pushed that row's vdev box ~23px right of the DATA row's, which is
             the misalignment you see between the group boxes. Pin the width so
             every row starts its content at the same x. */
          flex: 0 0 104px; width: 104px; min-width: 104px; max-width: 104px;
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 5px; padding-top: 3px; overflow: hidden;
        }
        .zfs-topo-label-txt {
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.14em; color: #c6c6c6;
          text-transform: uppercase;
        }
        .zfs-topo-rail {
          flex: 1; width: 2px; border-radius: 1px;
          background: linear-gradient(180deg, var(--primary-dim), transparent);
        }
        .zfs-topo-groups { flex: 1; display: flex; flex-wrap: wrap; gap: 12px; }

        .zfs-vdev {
          position: relative; padding: 10px 12px 12px;
          flex: 1 1 262px; max-width: 100%;
          border: 1px solid var(--primary-dim); border-radius: var(--radius-sm);
          background: rgba(0, 240, 255, 0.025);
          min-width: 262px;
        }
        .zfs-vdev.st-warn { border-color: var(--warning); }
        .zfs-vdev.st-bad  { border-color: var(--danger); }
        .zfs-vdev.grp-special { background: rgba(190, 120, 255, 0.05); }
        .zfs-vdev.grp-log     { background: rgba(255, 176, 32, 0.05); }
        .zfs-vdev.grp-cache   { background: rgba(80, 220, 160, 0.05); }
        .zfs-vdev.grp-spare   { background: rgba(255, 255, 255, 0.03); }
        /* corner brackets, same decorative language as the radar anomaly cards */
        .zfs-vdev .cb {
          position: absolute; width: 7px; height: 7px;
          border-color: var(--primary); opacity: .65;
        }
        .zfs-vdev .cb.tl { top: -1px; left: -1px; border-top: 1px solid; border-left: 1px solid; }
        .zfs-vdev .cb.tr { top: -1px; right: -1px; border-top: 1px solid; border-right: 1px solid; }
        .zfs-vdev .cb.bl { bottom: -1px; left: -1px; border-bottom: 1px solid; border-left: 1px solid; }
        .zfs-vdev .cb.br { bottom: -1px; right: -1px; border-bottom: 1px solid; border-right: 1px solid; }

        .zfs-vdev-head {
          display: flex; align-items: center; gap: 7px; margin-bottom: 8px;
          padding-bottom: 6px; border-bottom: 1px dashed rgba(0, 240, 255, 0.15);
        }
        .zfs-vdev-type {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.1em; color: var(--primary); text-transform: uppercase;
        }
        .zfs-vdev-name {
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        .zfs-vdev-meta {
          font-family: var(--font-mono); font-size: 13px;
          color: #c6c6c6; margin-left: auto;
        }

        .zfs-vdev-body {
          display: grid; gap: 5px;
          /* auto-FIT, not auto-fill: with auto-fill an empty trailing track is
             still reserved, so a 4-disk vdev in a 3-track container left a
             ragged gap. 210px lets four fit on a normal-width card. */
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        }
        .zfs-chip {
          position: relative; display: flex; align-items: center; gap: 5px;
          padding: 5px 7px; border-radius: 3px;
          border: 1px solid var(--border);
          background: var(--bg-tertiary);
          font-family: var(--font-mono); font-size: 13.5px;
          color: var(--text-primary); cursor: pointer; text-align: left;
          transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease;
        }
        .zfs-chip:hover {
          border-color: var(--primary); transform: translateY(-1px);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
        }
        .zfs-chip.dim { opacity: .55; }
        .zfs-chip-led {
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 5px currentColor;
          flex: 0 0 auto;
        }
        .zfs-chip.st-ok   .zfs-chip-led { color: var(--success); }
        .zfs-chip.st-warn .zfs-chip-led { color: var(--warning); }
        .zfs-chip.st-bad  .zfs-chip-led { color: var(--danger); animation: pulse 1.2s infinite; }
        .zfs-chip.st-idle .zfs-chip-led { color: var(--text-secondary); }
        /* The by-id name is the thing an operator matches against the label on
           the physical drive, so it gets the space; size and badges yield. */
        .zfs-chip-name {
          flex: 1 1 auto; min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .zfs-chip-size { margin-left: auto; color: #c6c6c6; font-size: 11px; }
        .zfs-chip-err, .zfs-chip-slow, .zfs-chip-boot {
          font-size: 11px; padding: 0 3px; border-radius: 2px;
          font-family: var(--font-display);
        }
        .zfs-chip-err  { background: var(--danger); color: #fff; }
        .zfs-chip-slow { border: 1px solid var(--warning); color: var(--warning); }
        .zfs-chip-boot { border: 1px solid var(--warning); color: var(--warning); }

        /* nested replacing-/spare- vdev: old disk -> new disk, inline */
        .zfs-nest {
          grid-column: 1 / -1;
          display: flex; flex-direction: column; gap: 4px;
          padding: 5px 7px; border-radius: 3px;
          border: 1px dashed var(--warning);
          background: rgba(255, 176, 32, 0.06);
        }
        .zfs-nest.st-bad { border-color: var(--danger); background: rgba(255,60,90,.07); }
        .zfs-nest-label {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--font-display); font-size: 11px;
          letter-spacing: 0.1em; color: var(--warning); text-transform: uppercase;
        }
        .zfs-nest-state {
          font-family: var(--font-display); font-size: 11px;
          padding: 0 5px; border-radius: 2px; border: 1px solid currentColor;
        }
        .zfs-nest-body { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
        .zfs-nest-body .zfs-chip { flex: 1 1 96px; }
        .zfs-nest-arrow { color: var(--warning); font-size: 13px; flex: 0 0 auto; }

        /* Sits in the same flex row as the vdev boxes, so as a normal inline item it
   stole horizontal space: the vdev box narrowed until a 4-disk raidz could
   only fit three columns and orphaned the fourth on its own row, and the DATA
   row ended up narrower than SPECIAL so their right edges did not line up.
   One cause, two kinds of untidiness. Giving it a full-basis puts it on its
   own line and every vdev box gets the full width. */
        .zfs-oneway {
          flex: 0 0 100%; align-self: flex-start;
          margin-top: 2px; padding: 3px 0 0;
          border: 0; border-top: 1px dashed rgba(255, 176, 32, .35);
          color: var(--warning);
          font-family: var(--font-display); font-size: 11.5px;
          letter-spacing: 0.08em; opacity: .85;
        }

        /* ---------- icon plumbing ---------- */
        /* Buttons with a leading glyph must be inline-flex on the BUTTON itself,
           otherwise icon and label do not share a baseline (house rule). */
        .zfs-btn.ico { display: inline-flex; align-items: center; gap: 6px; }
        .zfs-btn.ico svg { flex: 0 0 auto; }
        .zfs-sico { display: inline-flex; align-items: center; margin-right: 4px; }
        .zfs-gico { display: inline-flex; align-items: center; margin-right: 5px; }
        .zfs-gico.grp-data    { color: var(--primary); }
        .zfs-gico.grp-special { color: #be78ff; }
        .zfs-gico.grp-log     { color: var(--warning); }
        .zfs-gico.grp-cache   { color: #50dca0; }
        .zfs-gico.grp-spare   { color: var(--text-secondary); }
        .zfs-gico.grp-dedup   { color: #7de3ff; }
        .zfs-topo-label-txt { display: inline-flex; align-items: center; }
        .zfs-pool-state, .zfs-vdev-state { display: inline-flex; align-items: center; }
        .zfs-tag.pool { display: inline-flex; align-items: center; gap: 4px; }

        /* ---------- tolerance pips ---------- */
        .zfs-pips { display: inline-flex; align-items: center; gap: 3px; margin-left: 8px; }
        .zfs-pip {
          width: 7px; height: 7px; border-radius: 50%;
          border: 1px solid var(--success);
        }
        .zfs-pip.live { background: var(--success); box-shadow: 0 0 4px var(--success); }
        .zfs-pip.spent { border-color: var(--danger); background: transparent; }

        /* ---------- mini bars ---------- */
        .zfs-mini {
          display: inline-block; height: 5px; border-radius: 3px;
          background: rgba(255,255,255,0.08); overflow: hidden;
          margin-left: 8px; vertical-align: middle;
        }
        .zfs-mini-fill { display: block; height: 100%; border-radius: 3px; }
        .zfs-mini.tone-cyan    .zfs-mini-fill { background: var(--primary); }
        .zfs-mini.tone-amber   .zfs-mini-fill { background: var(--warning); }
        .zfs-mini.tone-red     .zfs-mini-fill { background: var(--danger); }
        .zfs-mini.tone-magenta .zfs-mini-fill { background: var(--magenta, #ff5edb); }
        .zfs-mini.tone-grey    .zfs-mini-fill { background: var(--text-secondary); }
        .zfs-sizecell { display: inline-flex; align-items: center; justify-content: flex-end; }

        /* ---------- media mix ---------- */
        .zfs-mix { display: inline-flex; align-items: center; gap: 8px; }
        .zfs-mix-bar {
          display: inline-flex; width: 90px; height: 7px; border-radius: 4px;
          overflow: hidden; border: 1px solid var(--border);
        }
        .zfs-mix-seg.nvme { background: var(--magenta, #ff5edb); }
        .zfs-mix-seg.ssd  { background: var(--primary); }
        .zfs-mix-seg.hdd  { background: var(--text-secondary); }
        .zfs-mix-n {
          display: inline-flex; align-items: center; gap: 3px;
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }

        /* ---------- media marks ---------- */
        .zfs-media {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono); font-size: 12px;
        }
        .zfs-media.tiny { gap: 3px; margin-left: 6px; font-size: 12px; }
        .zfs-mico { flex: 0 0 auto; }
        /* Colour-code the media so a mixed pool reads at a glance: spinning
           rust cool-neutral, SATA/SAS flash cyan, NVMe magenta (fastest tier). */
        .zfs-mico.hdd  { color: var(--text-secondary); }
        .zfs-mico.ssd  { color: var(--primary); }
        .zfs-mico.nvme { color: var(--magenta, #ff5edb); }
        .zfs-tran {
          font-size: 11px; padding: 0 4px; border-radius: 2px;
          border: 1px solid var(--border); color: #c6c6c6;
          text-transform: uppercase;
        }
        .zfs-chip .zfs-mico { opacity: .85; }

        /* ---------- inventory ---------- */
        .zfs-table code { font-size: 12px; color: var(--text-primary); }
        .zfs-table tr.free td { background: rgba(80, 220, 160, 0.04); }
        .zfs-table td.num, .zfs-table th.num { text-align: right; }

        /* ---------- modal ---------- */
        .zfs-ov {
          position: fixed; inset: 0; z-index: 4000;
          background: rgba(2, 5, 11, 0.78);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .zfs-modal {
          width: min(620px, 96vw); max-height: 88vh; overflow: auto;
          background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
          border: 1px solid var(--primary-dim); border-radius: var(--radius-md);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.18);
        }
        .zfs-modal.wide { width: min(900px, 96vw); }
        .zfs-modal-head {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 18px; border-bottom: 1px solid var(--primary-dim);
          font-family: var(--font-display); font-size: 15px;
          letter-spacing: 0.12em; color: var(--primary); text-transform: uppercase;
        }
        .zfs-x {
          margin-left: auto; background: none; border: none;
          color: var(--text-secondary); font-size: 20px; cursor: pointer;
          line-height: 1;
        }
        .zfs-x:hover { color: var(--danger); }
        .zfs-modal-body { padding: 18px; display: flex; flex-direction: column; gap: 13px; font-size: 14px; }
        .zfs-modal-body label {
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.1em; color: var(--text-primary);
          text-transform: uppercase;
        }
        .zfs-modal-body input[type="text"] {
          padding: 9px 12px; background: var(--bg-tertiary);
          border: 1px solid var(--border); border-radius: var(--radius-sm);
          color: var(--text-primary); font-family: var(--font-mono); font-size: 14px;
        }
        .zfs-modal-body input[type="checkbox"] { width: 15px; height: 15px; }
        .zfs-modal-body input:focus { border-color: var(--primary); outline: none; }
        .zfs-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
        .zfs-actions .zfs-btn { padding: 8px 18px; font-size: 14px; }

        .zfs-preview {
          display: flex; flex-direction: column; gap: 6px;
          padding: 10px; border-radius: var(--radius-sm);
          border: 1px solid var(--border); background: rgba(0,0,0,0.25);
        }
        .zfs-preview-label {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.12em; color: var(--primary); text-transform: uppercase;
        }
        .zfs-pre {
          margin: 0; padding: 10px 12px; border-radius: 3px;
          background: #02050b; border: 1px solid var(--border);
          font-family: var(--font-mono); font-size: 14px; line-height: 1.55;
          color: var(--text-primary);
          white-space: pre-wrap; overflow-wrap: anywhere; user-select: all;
        }
        .zfs-pre.dim { color: #c8c8c8; }
        .zfs-warn {
          padding: 9px 12px; border-left: 2px solid var(--warning);
          background: rgba(255, 176, 32, 0.08);
          font-size: 13.5px; line-height: 1.6; color: var(--text-primary);
        }
        .zfs-warn.danger {
          border-left-color: var(--danger); background: rgba(255, 60, 90, 0.09);
          color: var(--danger);
        }
        .zfs-page .dim, .zfs-modal .dim { color: #bcbcbc; font-size: 13px; }

        /* disk picker inside wizards */
        .zfs-pick {
          display: grid; gap: 6px; max-height: 240px; overflow: auto;
          grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
          padding: 8px; border: 1px solid var(--border);
          border-radius: var(--radius-sm); background: rgba(0,0,0,0.2);
        }
        .zfs-pick-item {
          display: flex; align-items: center; gap: 7px; padding: 8px 10px;
          border: 1px solid var(--border); border-radius: 3px;
          background: var(--bg-tertiary); cursor: pointer;
          font-family: var(--font-mono); font-size: 13px; text-align: left;
          color: var(--text-primary); transition: all .15s ease;
        }
        .zfs-pick-item:hover { border-color: var(--primary); }
        .zfs-pick-item.on {
          border-color: var(--primary); color: var(--primary);
          background: rgba(0, 240, 255, 0.09);
        }
        .zfs-pick-item .sz { margin-left: auto; color: #c0c0c0; font-size: 12px; }
        .zfs-groups { display: flex; flex-direction: column; gap: 10px; }
        .zfs-group-row {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          padding: 8px 10px; border: 1px solid var(--border);
          border-radius: var(--radius-sm); background: rgba(0,0,0,0.18);
        }
        .zfs-list { margin: 0; padding-left: 18px; font-family: var(--font-mono); font-size: 13px; }
        .zfs-guests { display: flex; flex-wrap: wrap; gap: 6px; }
        .zfs-guest {
          padding: 3px 8px; border-radius: 3px; border: 1px solid var(--border);
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        .zfs-guest.up { border-color: var(--success); color: var(--success); }
      `}</style>
    </div>
  );
}

// =================================================================== wizards

function DiskPicker({ free, selected, toggle, max }: {
  free: ZDisk[]; selected: string[]; toggle: (id: string) => void; max?: number;
}) {
  return (
    <div className="zfs-pick">
      {free.map((d) => {
        const id = d.by_id as string;
        const on = selected.includes(id);
        const blocked = !on && max != null && selected.length >= max;
        return (
          <button type="button" key={id}
                  className={`zfs-pick-item${on ? ' on' : ''}`}
                  disabled={blocked}
                  onClick={() => toggle(id)}>
            <span>{on ? '◉' : '○'}</span>
            <span>{id.replace(/^(ata|scsi|nvme|wwn|usb)-/, '')}</span>
            <span className="sz">
              {formatDiskSize(d.size, 0)}
              <span className="zfs-media tiny">
                <MediaIcon kind={d.kind} size={12} />{kindLabel(d.kind)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ReplaceWizard({ pool, target, free, preview, setPreview, post, onDone, onClose }: {
  pool: ZPool; target: ZVdev | null; free: ZDisk[];
  preview: any; setPreview: (v: any) => void;
  post: (p: string, b: any) => Promise<{ ok: boolean; status: number; d: any }>;
  onDone: () => void; onClose: () => void;
}) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [newDisk, setNewDisk] = useState<string>('');
  const [force, setForce] = useState(false);
  const [busy, setBusy] = useState(false);
  const old = target?.by_id || target?.name || '';
  const body = { old, new: newDisk, force };

  const dry = async () => {
    setBusy(true);
    try {
      const { ok, d } = await post(`/pools/${encodeURIComponent(pool.name)}/replace`, body);
      setPreview(ok && d.dry_run
        ? { ...d, __sig: sig(body) }
        : { ...d, ok: false, preview: d.preview || d.detail || d.error });
    } finally { setBusy(false); }
  };

  const go = async () => {
    const typed = await dialog.prompt(
      t('zfs.type_pool_to_confirm').replace('{pool}', pool.name));
    if (typed !== pool.name) return;
    setBusy(true);
    let ok = false, d: any = {};
    try {
      ({ ok, d } = await post(`/pools/${encodeURIComponent(pool.name)}/replace`,
        { ...body, confirm: true }));
    } finally { setBusy(false); }
    if (!ok) { await dialog.alert(`${t('zfs.failed')}: ${d.detail || d.error}`); return; }
    await dialog.alert(t('zfs.replace_started'));
    onDone();
  };

  return (
    <Modal title={`${t('zfs.replace_disk')} — ${pool.name}`} onClose={onClose}>
      <label>{t('zfs.failing_disk')}</label>
      <div className="zfs-pre">{old || '—'}{target ? `   [${target.state}]` : ''}</div>
      <label>{t('zfs.replacement')}</label>
      {free.length
        ? <DiskPicker free={free} selected={newDisk ? [newDisk] : []}
                      toggle={(id) => setNewDisk(id === newDisk ? '' : id)} max={1} />
        : <div className="zfs-warn">{t('zfs.no_free_disks')}</div>}
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none' }}>
        <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} />
        {t('zfs.force_hint')}
      </label>
      <Preview data={preview} />
      <div className="zfs-actions">
        <button className="zfs-btn" onClick={onClose}>{t('zfs.cancel')}</button>
        <button className="zfs-btn" disabled={!old || !newDisk || busy} onClick={dry}>
          {t('zfs.preview')}
        </button>
        <button className="zfs-btn danger"
                disabled={busy || !newDisk || !canExecute(preview, body)}
                onClick={go}>{t('zfs.execute')}</button>
      </div>
    </Modal>
  );
}

function VdevWizard({ pool, free, preview, setPreview, post, onDone, onClose }: {
  pool: ZPool; free: ZDisk[];
  preview: any; setPreview: (v: any) => void;
  post: (p: string, b: any) => Promise<{ ok: boolean; status: number; d: any }>;
  onDone: () => void; onClose: () => void;
}) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [klass, setKlass] = useState('data');
  const [layout, setLayout] = useState('mirror');
  const [sel, setSel] = useState<string[]>([]);
  const [force, setForce] = useState(false);
  const [busy, setBusy] = useState(false);

  const toggle = (id: string) =>
    setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const body = { class: klass, layout, devices: sel, force };

  const dry = async () => {
    setBusy(true);
    try {
      const { ok, d } = await post(`/pools/${encodeURIComponent(pool.name)}/vdev`, body);
      setPreview(ok && d.dry_run
        ? { ...d, __sig: sig(body) }
        : { ...d, ok: false, preview: d.preview || d.detail || d.error });
    } finally { setBusy(false); }
  };

  const go = async () => {
    const typed = await dialog.prompt(
      t('zfs.type_pool_to_confirm').replace('{pool}', pool.name));
    if (typed !== pool.name) return;
    setBusy(true);
    let ok = false, d: any = {};
    try {
      ({ ok, d } = await post(`/pools/${encodeURIComponent(pool.name)}/vdev`,
        { ...body, confirm: true }));
    } finally { setBusy(false); }
    if (!ok) { await dialog.alert(`${t('zfs.failed')}: ${d.detail || d.error}`); return; }
    onDone();
  };

  const classOpts: CyberOption[] = [
    { value: 'data', label: t('zfs.group.data') },
    { value: 'special', label: t('zfs.group.special'), hint: t('zfs.special_hint') },
    { value: 'log', label: t('zfs.group.log'), hint: t('zfs.log_hint') },
    { value: 'cache', label: t('zfs.group.cache'), hint: t('zfs.cache_hint') },
    { value: 'spare', label: t('zfs.group.spare') },
  ];
  const layoutOpts: CyberOption[] = ['stripe', 'mirror', 'raidz', 'raidz2', 'raidz3']
    .map((v) => ({ value: v, label: v }));

  return (
    <Modal title={`${t('zfs.add_vdev')} — ${pool.name}`} onClose={onClose}>
      <label>{t('zfs.vdev_class')}</label>
      <CyberSelect value={klass} options={classOpts} onChange={(v) => { setKlass(v); setPreview(null); }} />
      {(klass === 'data' || klass === 'special' || klass === 'log') && (
        <>
          <label>{t('zfs.layout')}</label>
          <CyberSelect value={layout} options={layoutOpts}
                       onChange={(v) => { setLayout(v); setPreview(null); }} />
        </>
      )}
      <label>{t('zfs.devices')} ({sel.length})</label>
      {free.length
        ? <DiskPicker free={free} selected={sel} toggle={toggle} />
        : <div className="zfs-warn">{t('zfs.no_free_disks')}</div>}
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none' }}>
        <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} />
        {t('zfs.force_hint')}
      </label>
      <Preview data={preview} />
      <div className="zfs-actions">
        <button className="zfs-btn" onClick={onClose}>{t('zfs.cancel')}</button>
        <button className="zfs-btn" disabled={!sel.length || busy} onClick={dry}>
          {t('zfs.preview')}
        </button>
        <button className="zfs-btn danger"
                disabled={busy || !canExecute(preview, body)} onClick={go}>
          {t('zfs.execute')}
        </button>
      </div>
    </Modal>
  );
}

function CreateWizard({ free, preview, setPreview, post, onDone, onClose }: {
  free: ZDisk[];
  preview: any; setPreview: (v: any) => void;
  post: (p: string, b: any) => Promise<{ ok: boolean; status: number; d: any }>;
  onDone: () => void; onClose: () => void;
}) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [name, setName] = useState('tank');
  const [groups, setGroups] = useState<{ layout: string; devices: string[] }[]>(
    [{ layout: 'raidz2', devices: [] }]);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [force, setForce] = useState(false);

  const used = useMemo(() => new Set(groups.flatMap((g) => g.devices)), [groups]);
  const avail = useMemo(
    () => free.filter((d) => !used.has(d.by_id as string) ||
                             groups[active]?.devices.includes(d.by_id as string)),
    [free, used, groups, active]);

  const toggle = (id: string) => setGroups((gs) => gs.map((g, i) =>
    i === active
      ? { ...g, devices: g.devices.includes(id)
            ? g.devices.filter((x) => x !== id) : [...g.devices, id] }
      : g));

  const layoutOpts: CyberOption[] = ['stripe', 'mirror', 'raidz', 'raidz2', 'raidz3']
    .map((v) => ({ value: v, label: v }));

  const body = () => ({
    name,
    vdevs: groups.filter((g) => g.devices.length),
    props: { ashift: '12', compression: 'lz4' },
    force,
  });

  const dry = async () => {
    setBusy(true);
    const b = body();
    try {
      const { ok, d } = await post('/pools', b);
      setPreview(ok && d.dry_run
        ? { ...d, __sig: sig(b) }
        : { ...d, ok: false, preview: d.preview || d.detail || d.error });
    } finally { setBusy(false); }
  };

  const go = async () => {
    const typed = await dialog.prompt(t('zfs.type_pool_to_confirm').replace('{pool}', name));
    if (typed !== name) return;
    setBusy(true);
    let ok = false, d: any = {};
    try {
      ({ ok, d } = await post('/pools', { ...body(), confirm: true }));
    } finally { setBusy(false); }
    if (!ok) { await dialog.alert(`${t('zfs.failed')}: ${d.detail || d.error}`); return; }
    onDone();
  };

  return (
    <Modal title={t('zfs.create_pool')} onClose={onClose} wide>
      <label>{t('zfs.pool_name')}</label>
      <input type="text" value={name} spellCheck={false}
             onChange={(e) => { setName(e.target.value); setPreview(null); }} />

      <label>{t('zfs.vdev_groups')}</label>
      <div className="zfs-groups">
        {groups.map((g, i) => (
          <div key={i} className={`zfs-group-row${i === active ? ' on' : ''}`}>
            <button className={`zfs-btn${i === active ? ' primary' : ''}`}
                    onClick={() => setActive(i)}>#{i + 1}</button>
            <div style={{ minWidth: 130 }}>
              <CyberSelect value={g.layout} options={layoutOpts}
                           onChange={(v) => { setGroups((gs) => gs.map((x, j) =>
                             j === i ? { ...x, layout: v } : x)); setPreview(null); }} />
            </div>
            <span className="dim">{g.devices.length} {t('zfs.disks')}</span>
            {groups.length > 1 && (
              <button className="zfs-btn danger"
                      onClick={() => { setGroups((gs) => gs.filter((_, j) => j !== i));
                                       setActive(0); setPreview(null); }}>×</button>
            )}
          </div>
        ))}
        <button className="zfs-btn"
                onClick={() => { setGroups((gs) => [...gs, { layout: 'raidz2', devices: [] }]);
                                 setActive(groups.length); setPreview(null); }}>
          + {t('zfs.add_group')}
        </button>
      </div>

      <label>{t('zfs.assign_to')} #{active + 1} ({groups[active]?.devices.length || 0})</label>
      {avail.length
        ? <DiskPicker free={avail} selected={groups[active]?.devices || []} toggle={toggle} />
        : <div className="zfs-warn">{t('zfs.no_free_disks')}</div>}

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none' }}>
        <input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} />
        {t('zfs.force_hint')}
      </label>
      <Preview data={preview} />
      <div className="zfs-actions">
        <button className="zfs-btn" onClick={onClose}>{t('zfs.cancel')}</button>
        <button className="zfs-btn"
                disabled={busy || !groups.some((g) => g.devices.length)} onClick={dry}>
          {t('zfs.preview')}
        </button>
        <button className="zfs-btn danger"
                disabled={busy || !canExecute(preview, body())} onClick={go}>
          {t('zfs.execute')}
        </button>
      </div>
    </Modal>
  );
}
