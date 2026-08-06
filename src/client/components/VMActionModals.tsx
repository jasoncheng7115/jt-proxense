/**
 * VMActionModals — three small modals for VM/CT lifecycle actions:
 *   - VMCloneModal     (operator+) full / linked clone with optional target
 *   - VMMigrateModal   (operator+) same-cluster migrate to another node
 *   - VMDeleteModal    (admin)    typed-VMID confirmation, --purge option
 *
 * They share a small visual style block at the bottom; CSS class names use
 * the `am-` prefix so they don't collide with the cyberpunk topbar tokens.
 *
 * OWASP A04 — destructive actions (delete) require typed VMID; clone/
 * migrate offer review + cancel before submission.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import type { VMMetrics } from '../types';

interface CommonProps {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  vm: VMMetrics | null;
  /** Names of all nodes in the cluster, for migrate/clone target dropdowns. */
  nodes: string[];
  onDone?: () => void;
}

const STORAGE_RE = /^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$/;

function vmidLabel(vm: VMMetrics | null): string {
  return vm ? `${vm.type === 'lxc' ? 'CT' : 'VM'} ${vm.vmid}` : '';
}

// ============================================================ Clone

export function VMCloneModal({ open, onClose, clusterId, vm, nodes, onDone }: CommonProps) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [newid, setNewid] = useState('');
  const [name, setName] = useState('');
  const [targetNode, setTargetNode] = useState('');
  const [storage, setStorage] = useState('');
  const [full, setFull] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setNewid(''); setName(''); setTargetNode(''); setStorage('');
    setFull(true); setErr(null); setBusy(false);
    // suggest next VMID
    (async () => {
      try {
        const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/next-vmid`,
          { credentials: 'same-origin' });
        if (r.ok) {
          const d = await r.json();
          if (d.vmid) setNewid(String(d.vmid));
        }
      } catch { /* ignore */ }
    })();
  }, [open, clusterId]);

  const valid = useMemo(() => {
    const id = parseInt(newid, 10);
    if (!Number.isFinite(id) || id < 100 || id > 999_999_999) return false;
    if (storage && !STORAGE_RE.test(storage)) return false;
    return true;
  }, [newid, storage]);

  if (!open || !vm) return null;

  const submit = async () => {
    setErr(null); setBusy(true);
    try {
      const body: any = {
        newid: parseInt(newid, 10),
        full,
      };
      if (name)        body.name = name;
      if (targetNode)  body.target_node = targetNode;
      if (storage)     body.storage = storage;
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/vms/${vm.vmid}/clone`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      onDone?.();
      onClose();
    } catch (e: any) {
      setErr(`${t('clone.error')}: ${e.message || e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ModalShell title={t('clone.title').replace('{kind}', vm.type === 'lxc' ? 'CT' : 'VM').replace('{vmid}', String(vm.vmid))}
                onClose={onClose} disabled={busy}>
      {err && <div className="am-error">{err}</div>}
      <Row label={t('clone.field.newid')}>
        <input type="number" min={100} value={newid} onChange={(e) => setNewid(e.target.value)} />
      </Row>
      <Row label={t('clone.field.name')}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={vm.name} />
      </Row>
      <Row label={t('clone.field.target_node')}>
        <select value={targetNode} onChange={(e) => setTargetNode(e.target.value)}>
          <option value="">{t('clone.field.target_node_same')}</option>
          {nodes.filter((n) => n !== vm.node).map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </Row>
      <Row label={t('clone.field.storage')}>
        <input value={storage} onChange={(e) => setStorage(e.target.value)}
               placeholder={t('clone.field.storage_default')} />
      </Row>
      <Row label={t('clone.field.full')}>
        <input type="checkbox" checked={full} onChange={(e) => setFull(e.target.checked)} />
      </Row>
      <div className="am-help">{t('clone.field.full_help')}</div>
      <Actions>
        <CancelBtn onClick={onClose} disabled={busy} label={t('clone.cancel')} />
        <PrimaryBtn onClick={submit} disabled={busy || !valid} icon="copy"
                    label={busy ? t('clone.busy') : t('clone.submit')} />
      </Actions>
    </ModalShell>
  );
}

// ============================================================ Migrate

export function VMMigrateModal({ open, onClose, clusterId, vm, nodes, onDone }: CommonProps) {
  const { t } = useTranslation();
  const [target, setTarget] = useState('');
  const [online, setOnline] = useState(true);
  const [withLocalDisks, setWithLocalDisks] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const others = nodes.filter((n) => n !== vm?.node);
    setTarget(others[0] || ''); setOnline(true); setWithLocalDisks(false);
    setErr(null); setBusy(false);
  }, [open, vm, nodes]);

  if (!open || !vm) return null;

  const submit = async () => {
    setErr(null); setBusy(true);
    try {
      // Server has separate endpoints per kind (vms/{vmid}/migrate and
      // cts/{vmid}/migrate). Both accept `target` plus per-kind options.
      const path = vm.type === 'lxc'
        ? `/api/clusters/${encodeURIComponent(clusterId)}/cts/${vm.vmid}/migrate`
        : `/api/clusters/${encodeURIComponent(clusterId)}/vms/${vm.vmid}/migrate`;
      // Backend expects `target_node` for VMs and `target` for LXC (see
      // server/vm_control.py).
      const body: any = vm.type === 'lxc'
        ? { target, online }
        : { target_node: target, online };
      if (withLocalDisks && vm.type !== 'lxc') body.with_local_disks = true;
      const r = await fetch(path, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      onDone?.();
      onClose();
    } catch (e: any) {
      setErr(`${t('mig.error')}: ${e.message || e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ModalShell title={t('mig.title').replace('{kind}', vm.type === 'lxc' ? 'CT' : 'VM').replace('{vmid}', String(vm.vmid))}
                onClose={onClose} disabled={busy}>
      {err && <div className="am-error">{err}</div>}
      <Row label={t('mig.field.target')}>
        {(() => {
          const others = nodes.filter((n) => n !== vm.node);
          if (others.length === 0) {
            return (
              <select disabled value="">
                <option value="">{t('mig.field.target_none')}</option>
              </select>
            );
          }
          return (
            <select value={target} onChange={(e) => setTarget(e.target.value)}>
              {others.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          );
        })()}
      </Row>
      <Row label={t('mig.field.online')}>
        <input type="checkbox" checked={online} onChange={(e) => setOnline(e.target.checked)} />
      </Row>
      <div className="am-help">{t('mig.field.online_help')}</div>
      {vm.type !== 'lxc' && (
        <Row label={t('mig.field.local_disks')}>
          <input type="checkbox" checked={withLocalDisks} onChange={(e) => setWithLocalDisks(e.target.checked)} />
        </Row>
      )}
      <Actions>
        <CancelBtn onClick={onClose} disabled={busy} label={t('mig.cancel')} />
        <PrimaryBtn onClick={submit} disabled={busy || !target} icon="migrate"
                    label={busy ? t('mig.busy') : t('mig.submit')} />
      </Actions>
    </ModalShell>
  );
}

// ============================================================ Delete

export function VMDeleteModal({ open, onClose, clusterId, vm, onDone }: Omit<CommonProps, 'nodes'>) {
  const { t } = useTranslation();
  const [confirm, setConfirm] = useState('');
  const [purge, setPurge] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setConfirm(''); setPurge(true); setErr(null); setBusy(false);
  }, [open]);

  if (!open || !vm) return null;

  const valid = confirm.trim() === String(vm.vmid);

  const submit = async () => {
    setErr(null); setBusy(true);
    try {
      const url = `/api/clusters/${encodeURIComponent(clusterId)}/vms/${vm.vmid}${purge ? '?purge=1' : ''}`;
      const r = await fetch(url, { method: 'DELETE', credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      onDone?.();
      onClose();
    } catch (e: any) {
      setErr(`${t('del.error')}: ${e.message || e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ModalShell title={t('del.title').replace('{kind}', vm.type === 'lxc' ? 'CT' : 'VM').replace('{vmid}', String(vm.vmid))}
                danger onClose={onClose} disabled={busy}>
      {err && <div className="am-error">{err}</div>}
      <div className="am-warn">⚠ {t('del.warn')}</div>
      <Row label={t('del.type_to_confirm')}>
        <input value={confirm} onChange={(e) => setConfirm(e.target.value.replace(/\D/g, ''))}
               placeholder={String(vm.vmid)} autoFocus inputMode="numeric" />
      </Row>
      <Row label={t('del.purge')}>
        <input type="checkbox" checked={purge} onChange={(e) => setPurge(e.target.checked)} />
      </Row>
      <Actions>
        <CancelBtn onClick={onClose} disabled={busy} label={t('del.cancel')} />
        <DangerBtn onClick={submit} disabled={busy || !valid} icon="trash"
                   label={busy ? t('del.busy') : t('del.submit')} />
      </Actions>
    </ModalShell>
  );
}

// ============================================================ Shared shell

function ModalShell({ title, danger, onClose, disabled, children }: {
  title: string; danger?: boolean;
  onClose: () => void; disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="am-back" onClick={() => !disabled && onClose()}>
      <div className={`am-modal ${danger ? 'am-modal-danger' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="am-head">
          <span>{title}</span>
          <button className="am-close" onClick={onClose} disabled={disabled}>×</button>
        </div>
        <div className="am-body">{children}</div>
        <style>{`
          .am-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .am-modal { width: min(560px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: am-in .18s ease-out; overflow: hidden; }
          .am-modal-danger { border-color: var(--danger, #ff4d6d); box-shadow: 0 0 32px rgba(255,77,109,.25); }
          @keyframes am-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .am-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); color: var(--primary); font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
          .am-modal-danger .am-head { color: var(--danger, #ff4d6d); border-bottom-color: rgba(255,77,109,.3); }
          .am-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .am-close:hover { color: var(--primary); }
          .am-body { padding: 14px 18px; overflow: auto; }
          .am-row { display: grid; grid-template-columns: 160px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .am-row > span { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .am-row input, .am-row select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .am-row input[type="checkbox"] { justify-self: start; }
          .am-row input:focus, .am-row select:focus { border-color: var(--primary); }
          .am-help { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); margin: 4px 0 12px 170px; line-height: 1.4; }
          .am-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .am-warn { padding: 10px 14px; margin-bottom: 14px; border: 1px solid var(--warning); background: rgba(255, 200, 0, 0.08); color: var(--warning); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; line-height: 1.5; }
          .am-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px; }
          .am-actions button {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 7px 18px;
            font-family: var(--font-display); font-size: 13.5px;
            letter-spacing: .08em; text-transform: uppercase;
            background: transparent; color: var(--text-secondary);
            border: 1px solid rgba(255,255,255,.18);
            border-radius: 3px;
            cursor: pointer;
            transition: background .12s, border-color .12s, color .12s;
          }
          .am-actions button:hover:not(:disabled) {
            background: rgba(0, 240, 255, 0.06);
            color: var(--primary);
            border-color: rgba(0, 240, 255, 0.4);
          }
          .am-actions .am-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .am-actions .am-primary:hover:not(:disabled) { background: var(--primary); color: #001018; box-shadow: 0 0 12px rgba(0, 240, 255, 0.45); }
          .am-actions .am-danger { background: var(--danger, #ff4d6d); color: #100007; border-color: var(--danger, #ff4d6d); }
          .am-actions .am-danger:hover:not(:disabled) { background: var(--danger, #ff4d6d); color: #100007; box-shadow: 0 0 12px rgba(255, 77, 109, 0.5); }
          .am-actions button:disabled { opacity: .4; cursor: not-allowed; }
          .am-btn-ico { flex-shrink: 0; }
        `}</style>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="am-row">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Actions({ children }: { children: React.ReactNode }) {
  return <div className="am-actions">{children}</div>;
}

// ─── Button helpers — icon + label, consistent across all dialogs. ───
type IconKey = 'cancel' | 'check' | 'copy' | 'migrate' | 'trash' | 'save';
function Ico({ name }: { name: IconKey }) {
  const path = {
    cancel:  <path d="M6 6l12 12M18 6L6 18" />,
    check:   <path d="M5 12l5 5L20 7" />,
    copy:    <><rect x="9" y="9" width="11" height="11" rx="1.5" /><path d="M5 15V5a1 1 0 011-1h10" /></>,
    migrate: <><path d="M4 12h12" /><path d="M12 6l8 6-8 6" /></>,
    trash:   <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13" /></>,
    save:    <><path d="M5 4h11l3 3v13a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" /><path d="M7 4v5h8V4" /></>,
  }[name];
  return (
    <svg className="am-btn-ico" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {path}
    </svg>
  );
}
function CancelBtn({ onClick, disabled, label }: { onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      <Ico name="cancel" />{label}
    </button>
  );
}
function PrimaryBtn({ onClick, disabled, icon, label }: { onClick: () => void; disabled?: boolean; icon: IconKey; label: string }) {
  return (
    <button className="am-primary" onClick={onClick} disabled={disabled}>
      <Ico name={icon} />{label}
    </button>
  );
}
function DangerBtn({ onClick, disabled, icon, label }: { onClick: () => void; disabled?: boolean; icon: IconKey; label: string }) {
  return (
    <button className="am-danger" onClick={onClick} disabled={disabled}>
      <Ico name={icon} />{label}
    </button>
  );
}
