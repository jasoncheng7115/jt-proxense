/**
 * VMConfigModal — VM/CT hardware viewer + editor.
 *
 * Display: General / Disks / NICs / Mounts / Other (read-only)
 * Edit (operator+):
 *   - General scalar fields via per-field inputs (allow-list mirrors server)
 *   - NIC bridge / vlan / firewall via inline edit row
 *   - Disk grow via "+N GB" delta only (no shrink)
 * Apply: diff modal lists exactly which fields changed; confirm posts to
 * the server which re-validates + audits.
 *
 * OWASP A04 — diff confirmation prevents mis-clicks. A03 — client-side
 * regex matches server allow-list so user gets instant feedback. A09 —
 * server emits the audit row; UI just shows success/failure.
 */
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
  vmid: number;
  kind: 'qemu' | 'lxc';
  title?: string;
  /** From auth context — gates the Edit button. Server still enforces. */
  canEdit?: boolean;
}

const DISK_KEYS = /^(scsi|virtio|sata|ide)\d+$/;
const NIC_KEYS  = /^net\d+$/;
const MP_KEYS   = /^(mp|rootfs)\d*$/;
const PT_KEYS   = /^(hostpci|usb|serial)\d+$/;

const fmtSizeFromValue = (v: string): string => {
  const m = /size=([^,]+)/.exec(v);
  return m ? m[1] : '';
};

const parseKV = (s: string): Record<string, string> => {
  const out: Record<string, string> = {};
  if (!s) return out;
  const tokens = s.split(',');
  if (tokens[0] && tokens[0].indexOf('=') < 0) {
    out._head = tokens[0];
    tokens.shift();
  }
  for (const tok of tokens) {
    const i = tok.indexOf('=');
    if (i > 0) out[tok.slice(0, i).trim()] = tok.slice(i + 1).trim();
  }
  return out;
};

const buildKV = (kv: Record<string, string>): string => {
  const head = kv._head ? [kv._head] : [];
  const tail = Object.entries(kv)
    .filter(([k]) => k !== '_head')
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `${k}=${v}`);
  return [...head, ...tail].join(',');
};

interface DiskRow { id: string; bus: string; volid: string; size: string; opts: string; raw: string; }
interface NicRow  { id: string; model: string; bridge: string; mac: string; vlan: string; firewall: string; raw: string; }

// Editable scalar fields per kind. Mirrors server's VM_EDITABLE/LXC_EDITABLE.
type FieldType = 'text' | 'int' | 'bool' | 'textarea' | 'select';
interface FieldDef { key: string; type: FieldType; options?: string[]; help?: string; }

// Common ostype values PVE accepts.
const OSTYPE_OPTIONS = [
  'l26', 'l24', 'win11', 'win10', 'win8', 'w2k19', 'w2k16', 'w2k12',
  'w2k8', 'wxp', 'w2k', 'solaris', 'other',
];
// Common cpu types — `host` is the default; `x86-64-v*` are PVE 8 baselines.
const CPU_TYPE_OPTIONS = [
  'host', 'x86-64-v4', 'x86-64-v3', 'x86-64-v2-AES', 'x86-64-v2',
  'kvm64', 'qemu64', 'EPYC', 'EPYC-Rome', 'EPYC-Milan',
  'Skylake-Server', 'Cascadelake-Server', 'Icelake-Server',
];

const VM_FIELDS: FieldDef[] = [
  { key: 'name',        type: 'text' },
  { key: 'cores',       type: 'int' },
  { key: 'sockets',     type: 'int' },
  { key: 'memory',      type: 'int' },
  { key: 'balloon',     type: 'int' },
  { key: 'agent',       type: 'bool' },
  { key: 'onboot',      type: 'bool' },
  { key: 'protection',  type: 'bool' },
  { key: 'ostype',      type: 'select', options: OSTYPE_OPTIONS },
  { key: 'cpu',         type: 'select', options: CPU_TYPE_OPTIONS,
                        help: 'host = pass-through; x86-64-v3 = stable baseline for live migrate' },
  { key: 'boot',        type: 'text', help: 'order=scsi0;net0;ide2 (semicolons separate priority)' },
  { key: 'tags',        type: 'text' },
  { key: 'description', type: 'textarea' },
  // Cloud-init scalars (only meaningful for VMs that have a cloud-init
  // drive attached, but server allow-lists them so editing is harmless
  // on non-cloud-init guests — PVE just ignores).
  { key: 'ciuser',      type: 'text' },
  { key: 'cipassword',  type: 'text' },
  { key: 'searchdomain', type: 'text' },
  { key: 'nameserver',  type: 'text' },
  { key: 'sshkeys',     type: 'textarea' },
];
const LXC_FIELDS: FieldDef[] = [
  { key: 'hostname',    type: 'text' },
  { key: 'cores',       type: 'int' },
  { key: 'cpulimit',    type: 'int' },
  { key: 'memory',      type: 'int' },
  { key: 'swap',        type: 'int' },
  { key: 'onboot',      type: 'bool' },
  { key: 'protection',  type: 'bool' },
  { key: 'tags',        type: 'text' },
  { key: 'nameserver',  type: 'text' },
  { key: 'searchdomain', type: 'text' },
  { key: 'description', type: 'textarea' },
];

export function VMConfigModal({ open, onClose, clusterId, node, vmid, kind, title, canEdit }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [config, setConfig] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState<Record<string, string>>({});
  const [showDiff, setShowDiff] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyErr, setApplyErr] = useState<string | null>(null);

  // Disk grow modal
  const [growSlot, setGrowSlot] = useState<string | null>(null);
  const [growGB, setGrowGB] = useState('');

  // Move-disk modal
  const [moveSlot, setMoveSlot] = useState<string | null>(null);
  const [moveStorage, setMoveStorage] = useState('');
  const [moveDelete, setMoveDelete] = useState(true);
  const [moveBusy, setMoveBusy] = useState(false);

  // NIC inline edit
  const [editNic, setEditNic] = useState<string | null>(null);
  const [nicForm, setNicForm] = useState<Record<string, string>>({});

  // Add-disk / add-NIC / mount-ISO inline forms (v0.6 hardware editor).
  const [addDiskOpen, setAddDiskOpen] = useState(false);
  const [addDiskForm, setAddDiskForm] = useState({ bus: 'scsi', storage: '', sizeGb: '32' });
  const [addNicOpen, setAddNicOpen] = useState(false);
  const [addNicForm, setAddNicForm] = useState({
    model: 'virtio', bridge: 'vmbr0', vlan: '', firewall: false, mac: '',
  });
  const [isoMountSlot, setIsoMountSlot] = useState<string | null>(null);
  const [isoVolume, setIsoVolume] = useState('');

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const path = kind === 'qemu' ? 'qemu' : 'lxc';
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${path}/${vmid}/config`,
          { credentials: 'same-origin' }
        );
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (alive) setConfig(data.config || {});
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, node, vmid, kind, reload]);

  useEffect(() => {
    if (!open) {
      setEditing(false); setPending({}); setShowDiff(false);
      setGrowSlot(null); setGrowGB(''); setEditNic(null); setNicForm({});
      setMoveSlot(null); setMoveStorage(''); setMoveDelete(true);
      setApplyErr(null);
    }
  }, [open]);

  const sections = useMemo(() => {
    if (!config) return null;
    const general: Array<[string, string]> = [];
    const disks: DiskRow[] = [];
    // CD/DVD slots (ideN with media=cdrom). Split out so the disks
    // section doesn't mix data disks with installer drives.
    const cdroms: DiskRow[] = [];
    const mounts: Array<[string, string]> = [];
    const nics: NicRow[] = [];
    const passthrough: Array<[string, string]> = [];
    const other: Array<[string, string]> = [];

    const generalKeys = new Set([
      'name', 'hostname', 'cores', 'sockets', 'cpu', 'cpulimit', 'cpuunits',
      'memory', 'balloon', 'shares', 'ostype', 'agent', 'boot', 'bios',
      'machine', 'numa', 'tablet', 'onboot', 'protection', 'startup',
      'arch', 'description', 'tags', 'unprivileged', 'features', 'parent',
      'lock', 'swap', 'vga', 'nameserver', 'searchdomain',
    ]);

    for (const [k, v] of Object.entries(config)) {
      const sv = String(v);
      if (k.startsWith('digest') || k === '_error') continue;
      if (generalKeys.has(k)) { general.push([k, sv]); continue; }
      if (DISK_KEYS.test(k)) {
        const kv = parseKV(sv);
        const volid = kv._head || sv.split(',')[0];
        const size = kv.size || fmtSizeFromValue(sv);
        const optEntries = Object.entries(kv).filter(([key]) => key !== '_head' && key !== 'size');
        const row: DiskRow = { id: k, bus: k, volid, size,
          opts: optEntries.map(([key, val]) => `${key}=${val}`).join(', '), raw: sv };
        // CDROM slot detection: PVE marks `media=cdrom`. Volid is either
        // an ISO ref like `local:iso/foo.iso` or the literal `none`.
        if (kv.media === 'cdrom' || sv.includes('media=cdrom')) {
          cdroms.push(row);
        } else {
          disks.push(row);
        }
        continue;
      }
      if (MP_KEYS.test(k)) {
        if (k === 'rootfs' || k.startsWith('mp')) {
          // For LXC rootfs / mpN we also offer Grow.
          const kv = parseKV(sv);
          const volid = kv._head || sv.split(',')[0];
          const size = kv.size || '';
          const optEntries = Object.entries(kv).filter(([key]) => key !== '_head' && key !== 'size');
          disks.push({ id: k, bus: k, volid, size,
            opts: optEntries.map(([key, val]) => `${key}=${val}`).join(', '), raw: sv });
        } else {
          mounts.push([k, sv]);
        }
        continue;
      }
      if (NIC_KEYS.test(k)) {
        const kv = parseKV(sv);
        const headParts = (kv._head || '').split('=');
        const model = headParts[0] || '';
        const mac   = headParts[1] || '';
        nics.push({ id: k, model: model || kv.model || '', bridge: kv.bridge || '',
          mac, vlan: kv.tag || '', firewall: kv.firewall || '', raw: sv });
        continue;
      }
      if (PT_KEYS.test(k)) { passthrough.push([k, sv]); continue; }
      other.push([k, sv]);
    }
    general.sort((a, b) => a[0].localeCompare(b[0]));
    other.sort((a, b) => a[0].localeCompare(b[0]));
    passthrough.sort((a, b) => a[0].localeCompare(b[0]));
    cdroms.sort((a, b) => a.id.localeCompare(b.id));
    return { general, disks, cdroms, mounts, nics, passthrough, other };
  }, [config]);

  const fields = kind === 'qemu' ? VM_FIELDS : LXC_FIELDS;

  const setField = (key: string, value: string) => {
    setPending((prev) => ({ ...prev, [key]: value }));
  };

  const computeDiff = (): Array<[string, string, string]> => {
    if (!config) return [];
    const out: Array<[string, string, string]> = [];
    for (const [k, v] of Object.entries(pending)) {
      const before = config[k] != null ? String(config[k]) : '';
      if (String(v) !== before) out.push([k, before, String(v)]);
    }
    return out;
  };

  const submitChanges = async () => {
    const diff = computeDiff();
    if (diff.length === 0) return;
    setApplying(true); setApplyErr(null);
    try {
      const changes: Record<string, any> = {};
      for (const [k, , after] of diff) changes[k] = after;
      const path = kind === 'qemu' ? 'qemu' : 'lxc';
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${path}/${vmid}/config`,
        {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ changes }),
        }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      setShowDiff(false); setEditing(false); setPending({});
      setReload((n) => n + 1);
    } catch (e: any) {
      setApplyErr(`${t('vmcfg.apply_err')}: ${e.message || e}`);
    } finally {
      setApplying(false);
    }
  };

  const submitGrow = async () => {
    if (!growSlot) return;
    const n = parseInt(growGB, 10);
    if (!Number.isFinite(n) || n <= 0 || n > 9999) {
      await dialog.alert(t('vmcfg.grow_help'));
      return;
    }
    try {
      const path = kind === 'qemu' ? 'qemu' : 'lxc';
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${path}/${vmid}/resize`,
        {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ disk: growSlot, size: `+${n}G` }),
        }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      setGrowSlot(null); setGrowGB('');
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('vmcfg.apply_err')}: ${e.message || e}`);
    }
  };

  const submitNicEdit = async () => {
    if (!editNic) return;
    const orig = sections?.nics.find((n) => n.id === editNic);
    if (!orig) return;
    const kv = parseKV(orig.raw);
    if (nicForm.bridge !== undefined)   kv.bridge   = nicForm.bridge;
    if (nicForm.vlan !== undefined)     kv.tag      = nicForm.vlan;
    if (nicForm.firewall !== undefined) kv.firewall = nicForm.firewall ? '1' : '';
    const value = buildKV(kv);
    try {
      const path = kind === 'qemu' ? 'qemu' : 'lxc';
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${path}/${vmid}/config`,
        {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ changes: { [editNic]: value } }),
        }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      setEditNic(null); setNicForm({});
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('vmcfg.apply_err')}: ${e.message || e}`);
    }
  };

  // Add-disk / Add-NIC / Delete-slot / ISO-mount / ISO-eject helpers.
  // All route through the same config PUT endpoint — the server accepts
  // a `delete` field plus arbitrary slot keys via _validate_dynamic_slot.
  const callConfigUpdate = async (changes: Record<string, string>): Promise<void> => {
    const path = kind === 'qemu' ? 'qemu' : 'lxc';
    const r = await fetch(
      `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${path}/${vmid}/config`,
      {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes }),
      }
    );
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.ok) {
      throw new Error(d.detail || d.error || `HTTP ${r.status}`);
    }
  };
  const nextSlot = (prefix: string, taken: Set<string>): string => {
    for (let i = 0; i < 64; i++) {
      const k = `${prefix}${i}`;
      if (!taken.has(k)) return k;
    }
    return `${prefix}0`;
  };
  const submitDeleteSlot = async (slot: string, descr: string) => {
    const ok = await dialog.confirm(
      t('vmcfg.del.msg').replace('{slot}', slot).replace('{descr}', descr),
      { title: t('vmcfg.del.title'), destructive: true }
    );
    if (!ok) return;
    try {
      await callConfigUpdate({ delete: slot });
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('vmcfg.del.error')}: ${e.message || e}`);
    }
  };
  const submitAddDisk = async () => {
    const storage = addDiskForm.storage.trim();
    if (!storage) { await dialog.alert(t('vmcfg.adddisk.need_storage')); return; }
    const sz = parseInt(addDiskForm.sizeGb || '0', 10);
    if (!Number.isFinite(sz) || sz <= 0 || sz > 65536) {
      await dialog.alert(t('vmcfg.adddisk.bad_size'));
      return;
    }
    const taken = new Set((sections?.disks || []).map((d) => d.id));
    // CD-ROM slots can also live on ide0..3 etc. so skip them too.
    (sections?.cdroms || []).forEach((c) => taken.add(c.id));
    const slot = nextSlot(addDiskForm.bus, taken);
    const value = `${storage}:${sz}`;
    try {
      await callConfigUpdate({ [slot]: value });
      setAddDiskOpen(false);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('vmcfg.adddisk.error')}: ${e.message || e}`);
    }
  };
  const submitAddNic = async () => {
    const bridge = addNicForm.bridge.trim();
    if (!bridge) { await dialog.alert(t('vmcfg.addnic.need_bridge')); return; }
    const taken = new Set((sections?.nics || []).map((n) => n.id));
    const slot = nextSlot('net', taken);
    const headParts: string[] = [addNicForm.model];
    if (addNicForm.mac) headParts[0] = `${addNicForm.model}=${addNicForm.mac}`;
    const parts: string[] = [headParts[0], `bridge=${bridge}`];
    if (addNicForm.vlan) parts.push(`tag=${addNicForm.vlan}`);
    if (addNicForm.firewall) parts.push('firewall=1');
    const value = parts.join(',');
    try {
      await callConfigUpdate({ [slot]: value });
      setAddNicOpen(false);
      setAddNicForm({ model: 'virtio', bridge: 'vmbr0', vlan: '', firewall: false, mac: '' });
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('vmcfg.addnic.error')}: ${e.message || e}`);
    }
  };
  const submitMountIso = async (slot: string) => {
    const vol = isoVolume.trim();
    if (!vol) { await dialog.alert(t('vmcfg.iso.need_vol')); return; }
    try {
      await callConfigUpdate({ [slot]: `${vol},media=cdrom` });
      setIsoMountSlot(null); setIsoVolume('');
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('vmcfg.iso.error')}: ${e.message || e}`);
    }
  };
  const submitEjectIso = async (slot: string) => {
    const ok = await dialog.confirm(
      t('vmcfg.iso.eject_msg').replace('{slot}', slot),
      { title: t('vmcfg.iso.eject_title') }
    );
    if (!ok) return;
    try {
      await callConfigUpdate({ [slot]: 'none,media=cdrom' });
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('vmcfg.iso.error')}: ${e.message || e}`);
    }
  };

  if (!open) return null;
  const diff = editing ? computeDiff() : [];

  return (
    <div className="vc-back" onClick={onClose}>
      <div className="vc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vc-head">
          <div className="vc-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <span>{t('vmcfg.title')}</span>
            {title && <span className="vc-target">{title}</span>}
          </div>
          <div className="vc-head-actions">
            {canEdit && !editing && (
              <button className="vc-edit-btn" onClick={() => {
                setEditing(true);
                const seed: Record<string, string> = {};
                for (const f of fields) {
                  const v = config?.[f.key];
                  if (v != null) seed[f.key] = String(v);
                }
                setPending(seed);
              }}>
                <svg className="vc-btn-ico" width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                {t('vmcfg.edit_btn')}
              </button>
            )}
            {editing && (
              <>
                <button className="vc-cancel-btn" onClick={() => { setEditing(false); setPending({}); }}>
                  <svg className="vc-btn-ico" width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                  {t('vmcfg.cancel_btn')}
                </button>
                <button className="vc-apply-btn"
                        disabled={diff.length === 0}
                        onClick={() => setShowDiff(true)}>
                  <svg className="vc-btn-ico" width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {t('vmcfg.apply_btn')} {diff.length > 0 && <em>({diff.length})</em>}
                </button>
              </>
            )}
            <button className="vc-close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="vc-body">
          {loading && !config && <div className="vc-loading">{t('vmcfg.loading')}</div>}
          {error && <div className="vc-error">{error}</div>}

          {sections && (
            <>
              <Section title={t('vmcfg.section.general')}>
                {editing ? (
                  <div className="vc-form">
                    {fields.map((f) => {
                      const cur = pending[f.key] ?? '';
                      if (f.type === 'bool') {
                        return (
                          <label key={f.key} className="vc-form-row vc-form-bool">
                            <span>{t(`vmcfg.field.${f.key}` as any) || f.key}</span>
                            <input type="checkbox"
                                   checked={cur === '1' || cur === 'true'}
                                   onChange={(e) => setField(f.key, e.target.checked ? '1' : '0')} />
                          </label>
                        );
                      }
                      if (f.type === 'select') {
                        return (
                          <label key={f.key} className="vc-form-row" title={f.help || ''}>
                            <span>{t(`vmcfg.field.${f.key}` as any) || f.key}</span>
                            <select value={cur}
                                    onChange={(e) => setField(f.key, e.target.value)}>
                              <option value="">— pick —</option>
                              {(f.options || []).map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                              {/* If the existing value is a custom one (e.g.
                                  "host,flags=+aes"), surface it as already-
                                  selected so we don't silently drop it. */}
                              {cur && !(f.options || []).includes(cur) && (
                                <option value={cur}>{cur}</option>
                              )}
                            </select>
                          </label>
                        );
                      }
                      if (f.type === 'textarea') {
                        return (
                          <label key={f.key} className="vc-form-row vc-form-textarea">
                            <span>{t(`vmcfg.field.${f.key}` as any) || f.key}</span>
                            <textarea value={cur} rows={3}
                                      onChange={(e) => setField(f.key, e.target.value)} />
                          </label>
                        );
                      }
                      return (
                        <label key={f.key} className="vc-form-row">
                          <span>{t(`vmcfg.field.${f.key}` as any) || f.key}</span>
                          <input type={f.type === 'int' ? 'number' : 'text'}
                                 value={cur}
                                 onChange={(e) => setField(f.key, e.target.value)} />
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  sections.general.length > 0 && (
                    <div className="vc-kv">
                      {sections.general.map(([k, v]) => (
                        <div className="vc-kv-row" key={k}>
                          <span className="vc-kv-key">{k}</span>
                          <span className="vc-kv-val">{v}</span>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </Section>

              {sections.disks.length > 0 && (
                <Section title={t('vmcfg.section.disks')}>
                  <table className="vc-table">
                    <thead>
                      <tr>
                        <th>{t('vmcfg.col.bus')}</th>
                        <th>{t('vmcfg.col.volid')}</th>
                        <th>{t('vmcfg.col.size')}</th>
                        <th>{t('vmcfg.col.opts')}</th>
                        {canEdit && <th></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {sections.disks.map((d) => (
                        <tr key={d.id}>
                          <td className="vc-mono">{d.bus}</td>
                          <td className="vc-mono">{d.volid}</td>
                          <td className="vc-mono">{d.size}</td>
                          <td className="vc-mono vc-trunc" title={d.opts}>{d.opts}</td>
                          {canEdit && (
                            <td>
                              <button className="vc-row-btn"
                                      onClick={() => { setGrowSlot(d.id); setGrowGB(''); }}>
                                {t('vmcfg.grow_btn')}
                              </button>
                              <button className="vc-row-btn"
                                      onClick={() => { setMoveSlot(d.id); setMoveStorage(''); setMoveDelete(true); }}>
                                {t('vmcfg.move_btn')}
                              </button>
                              <button className="vc-row-btn vc-row-btn-danger"
                                      onClick={() => submitDeleteSlot(d.id, d.volid)}>
                                {t('vmcfg.del.btn')}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {canEdit && (
                    addDiskOpen ? (
                      <div className="vc-add-form">
                        <span>{t('vmcfg.adddisk.title')}</span>
                        <select value={addDiskForm.bus}
                                onChange={(e) => setAddDiskForm({ ...addDiskForm, bus: e.target.value })}>
                          <option value="scsi">scsi</option>
                          <option value="virtio">virtio</option>
                          <option value="sata">sata</option>
                          {kind === 'qemu' && <option value="ide">ide</option>}
                        </select>
                        <input placeholder={t('vmcfg.adddisk.storage_ph')}
                               value={addDiskForm.storage}
                               onChange={(e) => setAddDiskForm({ ...addDiskForm, storage: e.target.value.trim() })}/>
                        <input type="number" min={1} max={65536}
                               placeholder={t('vmcfg.adddisk.size_ph')}
                               value={addDiskForm.sizeGb}
                               onChange={(e) => setAddDiskForm({ ...addDiskForm, sizeGb: e.target.value })}/>
                        <span className="vc-add-unit">GB</span>
                        <button className="vc-row-btn" onClick={submitAddDisk}>
                          {t('vmcfg.adddisk.submit')}
                        </button>
                        <button className="vc-row-btn"
                                onClick={() => setAddDiskOpen(false)}>×</button>
                      </div>
                    ) : (
                      <button className="vc-add-btn" onClick={() => setAddDiskOpen(true)}>
                        + {t('vmcfg.adddisk.open')}
                      </button>
                    )
                  )}
                </Section>
              )}

              {(sections.cdroms.length > 0 || (canEdit && kind === 'qemu')) && (
                <Section title={t('vmcfg.section.cdrom')}>
                  {sections.cdroms.length === 0 ? (
                    <div className="vc-help">{t('vmcfg.iso.none')}</div>
                  ) : (
                    <table className="vc-table">
                      <thead>
                        <tr>
                          <th>{t('vmcfg.col.bus')}</th>
                          <th>{t('vmcfg.col.volid')}</th>
                          {canEdit && <th></th>}
                        </tr>
                      </thead>
                      <tbody>
                        {sections.cdroms.map((c) => {
                          const isMounted = c.volid && c.volid !== 'none';
                          return isoMountSlot === c.id ? (
                            <tr key={c.id} className="vc-edit-row">
                              <td className="vc-mono">{c.id}</td>
                              <td colSpan={2}>
                                <input className="vc-inline-input"
                                       style={{ width: '60%' }}
                                       placeholder={t('vmcfg.iso.vol_ph')}
                                       value={isoVolume}
                                       onChange={(e) => setIsoVolume(e.target.value.trim())} />
                                <button className="vc-row-btn"
                                        onClick={() => submitMountIso(c.id)}>
                                  {t('vmcfg.iso.mount_submit')}
                                </button>
                                <button className="vc-row-btn"
                                        onClick={() => { setIsoMountSlot(null); setIsoVolume(''); }}>×</button>
                              </td>
                            </tr>
                          ) : (
                            <tr key={c.id}>
                              <td className="vc-mono">{c.id}</td>
                              <td className="vc-mono vc-trunc" title={c.volid}>
                                {isMounted ? c.volid : <em style={{ color: 'var(--text-muted)' }}>{t('vmcfg.iso.empty')}</em>}
                              </td>
                              {canEdit && (
                                <td>
                                  <button className="vc-row-btn"
                                          onClick={() => { setIsoMountSlot(c.id); setIsoVolume(''); }}>
                                    {t('vmcfg.iso.mount_btn')}
                                  </button>
                                  {isMounted && (
                                    <button className="vc-row-btn"
                                            onClick={() => submitEjectIso(c.id)}>
                                      {t('vmcfg.iso.eject_btn')}
                                    </button>
                                  )}
                                  <button className="vc-row-btn vc-row-btn-danger"
                                          onClick={() => submitDeleteSlot(c.id, c.volid)}>
                                    {t('vmcfg.del.btn')}
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </Section>
              )}

              {sections.nics.length > 0 && (
                <Section title={t('vmcfg.section.nics')}>
                  <table className="vc-table">
                    <thead>
                      <tr>
                        <th>{t('vmcfg.col.id')}</th>
                        <th>{t('vmcfg.col.model')}</th>
                        <th>{t('vmcfg.col.bridge')}</th>
                        <th>{t('vmcfg.col.mac')}</th>
                        <th>{t('vmcfg.col.vlan')}</th>
                        <th>{t('vmcfg.col.firewall')}</th>
                        {canEdit && <th></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {sections.nics.map((n) => editNic === n.id ? (
                        <tr key={n.id} className="vc-edit-row">
                          <td className="vc-mono">{n.id}</td>
                          <td className="vc-mono">{n.model}</td>
                          <td><input className="vc-inline-input"
                                     value={nicForm.bridge ?? n.bridge}
                                     onChange={(e) => setNicForm((p) => ({ ...p, bridge: e.target.value }))} /></td>
                          <td className="vc-mono">{n.mac}</td>
                          <td><input className="vc-inline-input vc-inline-narrow"
                                     value={nicForm.vlan ?? n.vlan}
                                     onChange={(e) => setNicForm((p) => ({ ...p, vlan: e.target.value }))} /></td>
                          <td>
                            <input type="checkbox"
                                   checked={(nicForm.firewall ?? n.firewall) === '1'}
                                   onChange={(e) => setNicForm((p) => ({ ...p, firewall: e.target.checked ? '1' : '' }))} />
                          </td>
                          <td>
                            <button className="vc-row-btn" onClick={submitNicEdit}>{t('vmcfg.nic_save_btn')}</button>
                            <button className="vc-row-btn" onClick={() => { setEditNic(null); setNicForm({}); }}>×</button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={n.id}>
                          <td className="vc-mono">{n.id}</td>
                          <td className="vc-mono">{n.model}</td>
                          <td className="vc-mono">{n.bridge}</td>
                          <td className="vc-mono">{n.mac}</td>
                          <td className="vc-mono">{n.vlan || '—'}</td>
                          <td className="vc-mono">{n.firewall === '1' ? 'on' : '—'}</td>
                          {canEdit && (
                            <td>
                              <button className="vc-row-btn"
                                      onClick={() => { setEditNic(n.id); setNicForm({}); }}>
                                {t('vmcfg.nic_edit_btn')}
                              </button>
                              <button className="vc-row-btn vc-row-btn-danger"
                                      onClick={() => submitDeleteSlot(n.id, `${n.model} ${n.bridge}`)}>
                                {t('vmcfg.del.btn')}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {canEdit && (
                    addNicOpen ? (
                      <div className="vc-add-form">
                        <span>{t('vmcfg.addnic.title')}</span>
                        <select value={addNicForm.model}
                                onChange={(e) => setAddNicForm({ ...addNicForm, model: e.target.value })}>
                          <option value="virtio">virtio</option>
                          <option value="e1000">e1000</option>
                          <option value="rtl8139">rtl8139</option>
                          <option value="vmxnet3">vmxnet3</option>
                        </select>
                        <input placeholder="vmbr0"
                               value={addNicForm.bridge}
                               onChange={(e) => setAddNicForm({ ...addNicForm, bridge: e.target.value.trim() })}/>
                        <input placeholder={t('vmcfg.addnic.vlan_ph')} type="number" min={1} max={4094}
                               value={addNicForm.vlan}
                               style={{ width: 80 }}
                               onChange={(e) => setAddNicForm({ ...addNicForm, vlan: e.target.value })}/>
                        <label className="vc-add-check">
                          <input type="checkbox"
                                 checked={addNicForm.firewall}
                                 onChange={(e) => setAddNicForm({ ...addNicForm, firewall: e.target.checked })}/>
                          firewall
                        </label>
                        <input placeholder={t('vmcfg.addnic.mac_ph')}
                               value={addNicForm.mac}
                               style={{ width: 150 }}
                               onChange={(e) => setAddNicForm({ ...addNicForm, mac: e.target.value.trim() })}/>
                        <button className="vc-row-btn" onClick={submitAddNic}>
                          {t('vmcfg.addnic.submit')}
                        </button>
                        <button className="vc-row-btn"
                                onClick={() => setAddNicOpen(false)}>×</button>
                      </div>
                    ) : (
                      <button className="vc-add-btn" onClick={() => setAddNicOpen(true)}>
                        + {t('vmcfg.addnic.open')}
                      </button>
                    )
                  )}
                </Section>
              )}

              {sections.mounts.length > 0 && (
                <Section title={t('vmcfg.section.mounts')}>
                  <div className="vc-kv">
                    {sections.mounts.map(([k, v]) => (
                      <div className="vc-kv-row" key={k}>
                        <span className="vc-kv-key">{k}</span>
                        <span className="vc-kv-val vc-trunc" title={v}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {(sections.passthrough.length > 0 || (canEdit && kind === 'qemu')) && (
                <Section title={t('vmcfg.section.passthrough')}>
                  {sections.passthrough.length > 0 ? (
                    <table className="vc-table">
                      <thead><tr><th>slot</th><th>{t('vmcfg.col.opts')}</th>{canEdit && <th></th>}</tr></thead>
                      <tbody>
                        {sections.passthrough.map(([k, v]) => (
                          <tr key={k}>
                            <td className="vc-mono">{k}</td>
                            <td className="vc-mono vc-trunc" title={v}>{v}</td>
                            {canEdit && (
                              <td>
                                <button className="vc-row-btn" onClick={async () => {
                                  const ok = await dialog.confirm(
                                    `Remove passthrough slot ${k}?`,
                                    { title: 'Remove passthrough?', destructive: true }
                                  );
                                  if (!ok) return;
                                  // Send empty string — server treats as removal.
                                  try {
                                    const path = kind === 'qemu' ? 'qemu' : 'lxc';
                                    const r = await fetch(
                                      `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${path}/${vmid}/config`,
                                      { method: 'PUT', credentials: 'same-origin',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ changes: { [k]: '' } }) }
                                    );
                                    const d = await r.json().catch(() => ({}));
                                    if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                                    setReload((n) => n + 1);
                                  } catch (e: any) {
                                    await dialog.alert(`Remove failed: ${e.message || e}`);
                                  }
                                }}>{t('vmcfg.pt.remove')}</button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="vc-help">{t('vmcfg.pt.none')}</div>
                  )}
                  {canEdit && kind === 'qemu' && <PassthroughAdder
                    clusterId={clusterId}
                    node={node}
                    vmid={vmid}
                    existing={sections.passthrough.map(([k]) => k)}
                    onAdded={() => setReload((n) => n + 1)}
                  />}
                </Section>
              )}

              {sections.other.length > 0 && (
                <Section title={t('vmcfg.section.other')}>
                  <div className="vc-kv">
                    {sections.other.map(([k, v]) => (
                      <div className="vc-kv-row" key={k}>
                        <span className="vc-kv-key">{k}</span>
                        <span className="vc-kv-val vc-trunc" title={v}>{v}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
            </>
          )}
        </div>

        {showDiff && (
          <div className="vc-overlay" onClick={() => !applying && setShowDiff(false)}>
            <div className="vc-overlay-card" onClick={(e) => e.stopPropagation()}>
              <div className="vc-overlay-title">{t('vmcfg.diff_title')}</div>
              <div className="vc-overlay-intro">{t('vmcfg.diff_intro')}</div>
              {applyErr && <div className="vc-error">{applyErr}</div>}
              <table className="vc-diff-table">
                <thead>
                  <tr><th>field</th><th>before</th><th>after</th></tr>
                </thead>
                <tbody>
                  {diff.map(([k, b, a]) => (
                    <tr key={k}>
                      <td className="vc-mono">{k}</td>
                      <td className="vc-mono vc-diff-before">{b || '—'}</td>
                      <td className="vc-mono vc-diff-after">{a || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="vc-overlay-actions">
                <button onClick={() => setShowDiff(false)} disabled={applying}>{t('vmcfg.diff_cancel')}</button>
                <button className="vc-primary" onClick={submitChanges} disabled={applying}>
                  {applying ? t('vmcfg.applying') : t('vmcfg.diff_apply')}
                </button>
              </div>
            </div>
          </div>
        )}

        {growSlot && (
          <div className="vc-overlay" onClick={() => setGrowSlot(null)}>
            <div className="vc-overlay-card" onClick={(e) => e.stopPropagation()}>
              <div className="vc-overlay-title">{t('vmcfg.grow_title')} — <code>{growSlot}</code></div>
              <div className="vc-overlay-intro">{t('vmcfg.grow_help')}</div>
              <label className="vc-form-row">
                <span>{t('vmcfg.grow_amount')}</span>
                <input type="number" min={1} max={9999} value={growGB}
                       onChange={(e) => setGrowGB(e.target.value)} autoFocus />
              </label>
              <div className="vc-overlay-actions">
                <button onClick={() => setGrowSlot(null)}>{t('vmcfg.diff_cancel')}</button>
                <button className="vc-primary" onClick={submitGrow}
                        disabled={!growGB || parseInt(growGB, 10) <= 0}>
                  {t('vmcfg.grow_apply')}
                </button>
              </div>
            </div>
          </div>
        )}

        {moveSlot && (
          <div className="vc-overlay" onClick={() => !moveBusy && setMoveSlot(null)}>
            <div className="vc-overlay-card" onClick={(e) => e.stopPropagation()}>
              <div className="vc-overlay-title">{t('vmcfg.move_title')} — <code>{moveSlot}</code></div>
              <div className="vc-overlay-intro">{t('vmcfg.move_help')}</div>
              <label className="vc-form-row">
                <span>{t('vmcfg.move_target')}</span>
                <input value={moveStorage} placeholder="storage id"
                       onChange={(e) => setMoveStorage(e.target.value)} autoFocus />
              </label>
              <label className="vc-form-row vc-form-bool">
                <span>{t('vmcfg.move_delete_source')}</span>
                <input type="checkbox" checked={moveDelete}
                       onChange={(e) => setMoveDelete(e.target.checked)} />
              </label>
              <div className="vc-overlay-actions">
                <button onClick={() => setMoveSlot(null)} disabled={moveBusy}>{t('vmcfg.diff_cancel')}</button>
                <button className="vc-primary"
                        onClick={async () => {
                          if (!moveSlot || !moveStorage.trim()) return;
                          setMoveBusy(true);
                          try {
                            const path = kind === 'qemu' ? 'qemu' : 'lxc';
                            const endpoint = kind === 'qemu' ? 'move_disk' : 'move_volume';
                            const body: any = { storage: moveStorage.trim(), delete: moveDelete };
                            if (kind === 'qemu') body.disk = moveSlot;
                            else body.volume = moveSlot;
                            const r = await fetch(
                              `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/${path}/${vmid}/${endpoint}`,
                              { method: 'POST', credentials: 'same-origin',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(body) }
                            );
                            const d = await r.json().catch(() => ({}));
                            if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                            setMoveSlot(null); setMoveStorage('');
                            setReload((n) => n + 1);
                          } catch (e: any) {
                            await dialog.alert(`Move failed: ${e.message || e}`);
                          } finally {
                            setMoveBusy(false);
                          }
                        }}
                        disabled={moveBusy || !moveStorage.trim()}>
                  {moveBusy ? '…' : t('vmcfg.move_apply')}
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
          .vc-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .vc-modal { width: min(960px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: vc-in .18s ease-out; overflow: hidden; }
          @keyframes vc-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .vc-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .vc-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .vc-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .vc-head-actions { display: flex; align-items: center; gap: 8px; }
          .vc-edit-btn, .vc-cancel-btn, .vc-apply-btn {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 7px 16px;
            font-family: var(--font-display); font-size: 13.5px;
            letter-spacing: .08em; text-transform: uppercase;
            border-radius: 3px;
            cursor: pointer;
            transition: background .12s, box-shadow .12s, border-color .12s;
          }
          .vc-btn-ico { flex-shrink: 0; }
          .vc-edit-btn { background: rgba(0, 240, 255, 0.1); color: var(--primary); border: 1px solid var(--primary); }
          .vc-edit-btn:hover { background: rgba(0, 240, 255, 0.2); }
          .vc-cancel-btn { background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); }
          .vc-apply-btn { background: var(--primary); color: #001018; border: 1px solid var(--primary); }
          .vc-apply-btn:disabled { opacity: .35; cursor: not-allowed; }
          .vc-apply-btn em { font-style: normal; opacity: .8; margin-left: 4px; }
          .vc-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .vc-close:hover { color: var(--primary); }
          .vc-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .vc-loading { padding: 40px 12px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .vc-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; margin-bottom: 12px; }

          /* Section — tighter cyan accent + slightly larger title so the
             modal reads as a structured form, not a wall of small text. */
          .vc-section { margin-bottom: 22px; }
          .vc-section-title {
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: .14em; text-transform: uppercase;
            color: var(--primary);
            text-shadow: 0 0 6px rgba(0, 240, 255, 0.35);
            margin-bottom: 10px;
            padding-bottom: 6px;
            border-bottom: 1px solid rgba(0, 240, 255, 0.22);
          }
          .vc-kv { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4px 20px; font-family: var(--font-mono); font-size: 13px; }
          .vc-kv-row { display: flex; justify-content: space-between; gap: 14px; padding: 6px 8px; border-bottom: 1px solid rgba(0, 240, 255, 0.06); }
          .vc-kv-row:hover { background: rgba(0, 240, 255, 0.05); }
          .vc-kv-key { color: var(--text-secondary); font-family: var(--font-display); font-size: 13.5px; letter-spacing: .06em; text-transform: uppercase; }
          .vc-kv-val { color: var(--text-primary); text-align: right; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

          /* Form — bigger labels (display uppercase 11px reads as a chip
             header), bigger inputs (13px), more breathing room. */
          .vc-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px 24px; }
          .vc-form-row { display: grid; grid-template-columns: 130px 1fr; align-items: center; gap: 10px; padding: 4px 0; }
          .vc-form-row > span {
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: .06em; text-transform: uppercase;
            /* was --text-secondary 11px — too dim & small to read on the
               modal (operator feedback). Brighter + larger. */
            color: var(--text-primary);
          }
          .vc-form-row input, .vc-form-row textarea {
            padding: 8px 11px;
            font-family: var(--font-mono); font-size: 14px;
            background: rgba(0, 240, 255, 0.04);
            color: var(--text-primary);
            border: 1px solid rgba(0, 240, 255, 0.22);
            border-radius: 3px;
            outline: none;
            transition: border-color .12s, box-shadow .12s;
          }
          .vc-form-row input:focus, .vc-form-row textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.15);
          }
          .vc-form-bool { grid-template-columns: 130px auto; }
          .vc-form-textarea { grid-template-columns: 1fr; }
          .vc-form-textarea > span { margin-bottom: 6px; }

          /* Tables — larger font, more padding, cyan-tinted header. */
          .vc-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 14px; }
          .vc-table th {
            padding: 9px 12px;
            text-align: left;
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: .08em; text-transform: uppercase;
            color: var(--primary);
            border-bottom: 1px solid rgba(0,240,255,.22);
            background: rgba(0,240,255,.06);
          }
          .vc-table td {
            padding: 8px 12px;
            border-bottom: 1px solid rgba(0,240,255,.07);
            color: var(--text-primary);
            white-space: nowrap;
          }
          .vc-table tbody tr:hover { background: rgba(0,240,255,.05); }
          .vc-mono { font-family: var(--font-mono); }
          .vc-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; }
          .vc-row-btn {
            padding: 4px 12px;
            font-family: var(--font-display); font-size: 12.5px;
            letter-spacing: .08em; text-transform: uppercase;
            background: transparent; color: var(--primary);
            border: 1px solid currentColor;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 6px;
            transition: background .12s;
          }
          .vc-row-btn:hover { background: rgba(0, 240, 255, 0.15); }
          .vc-row-btn-danger { color: var(--danger, #ff4d6d); }
          .vc-row-btn-danger:hover { background: rgba(255, 77, 109, 0.12); }
          .vc-add-btn {
            margin-top: 10px;
            padding: 6px 14px;
            font-family: var(--font-display); font-size: 12.5px;
            letter-spacing: .08em; text-transform: uppercase;
            background: rgba(0, 240, 255, 0.06);
            color: var(--primary);
            border: 1px dashed var(--primary-dim);
            border-radius: 3px;
            cursor: pointer;
            transition: background .12s, border-color .12s;
          }
          .vc-add-btn:hover {
            background: rgba(0, 240, 255, 0.14);
            border-style: solid;
          }
          .vc-add-form {
            margin-top: 10px;
            padding: 10px 14px;
            display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
            border: 1px solid var(--primary-dim);
            border-radius: 3px;
            background: rgba(0, 240, 255, 0.04);
            font-family: var(--font-mono); font-size: 13.5px;
          }
          .vc-add-form > span:first-child {
            font-family: var(--font-display); font-size: 12.5px;
            letter-spacing: .08em; text-transform: uppercase;
            color: var(--primary);
            padding-right: 4px;
            border-right: 1px solid rgba(0,240,255,.22);
            margin-right: 4px;
          }
          .vc-add-form select, .vc-add-form input {
            padding: 5px 10px;
            font-family: var(--font-mono); font-size: 13.5px;
            background: rgba(0, 240, 255, 0.04);
            color: var(--text-primary);
            border: 1px solid rgba(0, 240, 255, 0.22);
            border-radius: 3px;
            outline: none;
          }
          .vc-add-form input:focus, .vc-add-form select:focus {
            border-color: var(--primary);
          }
          .vc-add-unit {
            font-family: var(--font-mono); font-size: 13.5px;
            color: var(--text-muted); margin-left: -6px;
          }
          .vc-add-check {
            display: inline-flex; align-items: center; gap: 5px;
            font-family: var(--font-mono); font-size: 13.5px;
            color: var(--text-secondary);
          }
          .vc-add-check input { accent-color: var(--primary); }
          .vc-edit-row { background: rgba(0, 240, 255, 0.05); }
          .vc-inline-input { padding: 2px 6px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 2px; outline: none; width: 140px; }
          .vc-inline-narrow { width: 60px; }

          .vc-overlay { position: absolute; inset: 0; background: rgba(2,4,10,.7); display: flex; align-items: center; justify-content: center; z-index: 5; }
          .vc-overlay-card { width: min(640px, 92%); background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; padding: 16px 18px; box-shadow: 0 0 24px rgba(0,240,255,.3); }
          .vc-overlay-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; }
          .vc-overlay-intro { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); margin-bottom: 10px; }
          .vc-diff-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; margin-bottom: 12px; }
          .vc-diff-table th { padding: 4px 8px; text-align: left; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.12); }
          .vc-diff-table td { padding: 3px 8px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; }
          .vc-diff-before { color: var(--text-muted); text-decoration: line-through; }
          .vc-diff-after { color: var(--success); }
          .vc-overlay-actions { display: flex; justify-content: flex-end; gap: 8px; }
          .vc-overlay-actions button { padding: 6px 16px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .vc-overlay-actions button.vc-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .vc-overlay-actions button:disabled { opacity: .4; cursor: not-allowed; }
        `}</style>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="vc-section">
      <div className="vc-section-title">{title}</div>
      {children}
    </div>
  );
}

/**
 * Inline form to attach a PCI / USB passthrough device to a QEMU VM.
 * Picks the next free slot index automatically.
 *
 * value formats:
 *   hostpciN: "0000:01:00.0[,pcie=1][,x-vga=1]"
 *   usbN:     "vendor:product" (e.g. "1234:abcd") or "host=N-N.N"
 */
function PassthroughAdder({
  clusterId, node, vmid, existing, onAdded,
}: {
  clusterId: string; node: string; vmid: number;
  existing: string[]; onAdded: () => void;
}) {
  const [type, setType] = useState<'hostpci' | 'usb'>('hostpci');
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const nextSlot = (): string => {
    const usedNums = existing
      .filter((k) => k.startsWith(type))
      .map((k) => parseInt(k.slice(type.length), 10))
      .filter((n) => Number.isFinite(n));
    for (let i = 0; i < 32; i++) {
      if (!usedNums.includes(i)) return `${type}${i}`;
    }
    return `${type}0`;
  };

  const submit = async () => {
    setErr(null);
    if (!value.trim()) return;
    setBusy(true);
    try {
      const slot = nextSlot();
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/qemu/${vmid}/config`,
        { method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ changes: { [slot]: value.trim() } }) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setValue('');
      onAdded();
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="vc-pt-add">
      {err && <div className="vc-error">{err}</div>}
      <select value={type} onChange={(e) => setType(e.target.value as 'hostpci' | 'usb')}>
        <option value="hostpci">hostpci</option>
        <option value="usb">usb</option>
      </select>
      <input value={value} onChange={(e) => setValue(e.target.value)}
             placeholder={type === 'hostpci' ? '0000:01:00.0,pcie=1' : '1234:abcd'} />
      <button className="vc-row-btn" disabled={busy || !value.trim()} onClick={submit}>
        {busy ? '…' : `+ Add ${nextSlot()}`}
      </button>
      <style>{`
        .vc-pt-add { display: flex; gap: 8px; align-items: center; padding: 10px; margin-top: 10px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
        .vc-pt-add input, .vc-pt-add select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
        .vc-pt-add input { flex: 1; }
        .vc-help { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); padding: 4px 0 8px; }
      `}</style>
    </div>
  );
}
