/**
 * SnapshotsModal — list / create / delete / rollback VM snapshots.
 *
 * Backed by the existing /api/clusters/{cid}/vms/{vmid}/snapshots endpoints.
 * The "current" pseudo-snapshot PVE returns at the head is filtered out.
 *
 * Cyberpunk theme matches RemoteMigrateModal so the two feel like the same
 * UI family.
 */
import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface VMSummary {
  vmid: number;
  name: string;
  node: string;
  type?: string;
}

interface Props {
  open: boolean;
  cluster_id: string;
  vm: VMSummary | null;
  onClose: () => void;
}

interface Snap {
  name: string;
  description?: string;
  vmstate?: number;
  snaptime?: number;
  parent?: string;
}

function fmtTime(ts?: number): string {
  if (!ts) return '—';
  try { return new Date(ts * 1000).toLocaleString(); } catch { return String(ts); }
}

export function SnapshotsModal({ open, cluster_id, vm, onClose }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [withState, setWithState] = useState(false);
  const [err, setErr] = useState('');

  const refresh = async () => {
    if (!vm) return;
    setLoading(true); setErr('');
    try {
      const r = await api.listSnapshots(cluster_id, vm.vmid);
      // Filter the synthetic "current" entry PVE includes at the head of the list.
      setSnaps((r.snapshots || []).filter((s) => s.name !== 'current'));
    } catch (e: unknown) {
      setErr((e instanceof Error) ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    setName(''); setDesc(''); setWithState(false); setErr('');
    refresh();
  }, [open, cluster_id, vm?.vmid]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || !vm) return null;

  const create = async () => {
    if (!name) return;
    if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) {
      setErr('snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*');
      return;
    }
    setCreating(true); setErr('');
    try {
      await api.createSnapshot(cluster_id, vm.vmid, {
        snapname: name, description: desc, vmstate: withState,
      });
      setName(''); setDesc(''); setWithState(false);
      await refresh();
    } catch (e: unknown) {
      setErr((e instanceof Error) ? e.message : String(e));
    } finally {
      setCreating(false);
    }
  };

  const del = async (snap: Snap) => {
    if (!(await dialog.confirm(t('snap.confirm_delete', { name: snap.name }),
      { destructive: true }))) return;
    setErr('');
    try {
      await api.deleteSnapshot(cluster_id, vm.vmid, snap.name);
      await refresh();
    } catch (e: unknown) {
      setErr((e instanceof Error) ? e.message : String(e));
    }
  };

  const rollback = async (snap: Snap) => {
    if (!(await dialog.confirm(t('snap.confirm_rollback', { name: snap.name }),
      { destructive: true }))) return;
    setErr('');
    try {
      await api.rollbackSnapshot(cluster_id, vm.vmid, snap.name);
      await refresh();
    } catch (e: unknown) {
      setErr((e instanceof Error) ? e.message : String(e));
    }
  };

  return (
    <div onClick={onClose} style={overlay}>
      <style>{styleBlock}</style>
      <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sm-eyebrow">// snapshots · {cluster_id}</div>
        <h3 className="sm-title">{t('snap.title', { vmid: vm.vmid, name: vm.name })}</h3>

        <div className="sm-create">
          <div className="sm-row">
            <label>{t('snap.name')}</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="my-snap" spellCheck={false}
            />
          </div>
          <div className="sm-row">
            <label>{t('snap.description')}</label>
            <input
              type="text" value={desc} onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="sm-row sm-check-row">
            <label className="sm-check">
              <input type="checkbox" checked={withState} onChange={(e) => setWithState(e.target.checked)} />
              <span>{t('snap.include_state')}</span>
            </label>
            <button
              className="sm-btn primary" disabled={creating || !name}
              onClick={create}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              {creating ? '…' : t('snap.create')}
            </button>
          </div>
        </div>

        {err && <div className="sm-err">{err}</div>}

        <div className="sm-list">
          {loading && <div className="sm-empty">…</div>}
          {!loading && snaps.length === 0 && <div className="sm-empty">{t('snap.empty')}</div>}
          {!loading && snaps.map((s) => (
            <div key={s.name} className="sm-item">
              <div className="sm-item-head">
                <code className="sm-name">{s.name}</code>
                {s.parent && <span className="sm-meta">{t('snap.parent')}: <code>{s.parent}</code></span>}
                <span className="sm-meta">{t('snap.taken')}: {fmtTime(s.snaptime)}</span>
                {s.vmstate ? <span className="sm-tag">RAM</span> : null}
              </div>
              {s.description && <div className="sm-desc">{s.description}</div>}
              <div className="sm-item-actions">
                <button className="sm-btn ghost" onClick={() => rollback(s)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  {t('snap.rollback')}
                </button>
                <button className="sm-btn danger" onClick={() => del(s)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                  </svg>
                  {t('snap.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="sm-actions">
          <button className="sm-btn ghost" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            {t('action.close')}
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 300,
  background: 'rgba(0,0,0,.78)', backdropFilter: 'blur(6px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 24, animation: 'smFade .18s ease',
};

const styleBlock = `
@keyframes smFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes smSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.sm-modal {
  width: min(640px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 24px 26px; animation: smSlide .2s ease;
  max-height: 88vh; overflow-y: auto;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.sm-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.sm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 16px; }
.sm-create {
  background: #02050b; border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px; padding: 12px 14px; margin-bottom: 14px;
}
.sm-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.sm-row:last-child { margin-bottom: 0; }
.sm-row label {
  flex: 0 0 110px; font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; color: #95a8c4;
}
.sm-row input[type=text] {
  flex: 1; padding: 8px 12px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 5px;
  font-family: 'Share Tech Mono', monospace; font-size: 14px; outline: none;
}
.sm-row input[type=text]:focus { border-color: #00f0ff; box-shadow: 0 0 0 2px rgba(0,240,255,.18); }
.sm-check-row { justify-content: space-between; }
/* Override the generic .sm-row label width (110px) so the checkbox label
   can show its full Chinese text on one line instead of wrapping. */
.sm-row label.sm-check {
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  text-transform: none;
  letter-spacing: 0;
  color: #e6f6ff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  margin: 0;
}
.sm-check span {
  font-family: 'Rajdhani', sans-serif; font-size: 15px; color: #e6f6ff;
  white-space: nowrap;
}
.sm-list { margin-bottom: 14px; }
.sm-empty {
  padding: 20px; text-align: center; color: #6b7c93;
  font-family: 'Share Tech Mono', monospace; font-size: 14px; letter-spacing: .08em;
}
.sm-item {
  background: #02050b; border: 1px solid rgba(0,240,255,.10);
  border-radius: 5px; padding: 10px 12px; margin-bottom: 8px;
}
.sm-item-head {
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
}
.sm-name {
  color: #00f0ff; background: rgba(0,240,255,.06);
  padding: 2px 8px; border-radius: 3px; font-size: 14px;
}
.sm-meta { color: #95a8c4; }
.sm-meta code { color: #c8e1ff; }
.sm-tag {
  color: #00ff88; background: rgba(0,255,136,.08);
  padding: 1px 6px; border-radius: 3px; font-size: 11.5px;
}
.sm-desc {
  margin-top: 6px; font-family: 'Rajdhani', sans-serif; font-size: 15px;
  color: #c8e1ff;
}
.sm-item-actions {
  display: flex; gap: 6px; margin-top: 8px; justify-content: flex-end;
}
.sm-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .06em; text-transform: uppercase;
  border-radius: 4px; cursor: pointer; border: 1px solid transparent;
}
.sm-btn svg { flex-shrink: 0; }
.sm-btn.primary { color: #001018; background: linear-gradient(135deg,#00f0ff,#00b8d4); }
.sm-btn.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.sm-btn.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.sm-btn.danger { color: #1a0006; background: linear-gradient(135deg,#ff3860,#c41a3a); }
.sm-btn:disabled { opacity: .4; cursor: not-allowed; }
.sm-err {
  margin-bottom: 12px; padding: 10px 12px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 14px; color: #ffd0d8;
  font-family: 'Share Tech Mono', monospace;
}
.sm-actions { display: flex; justify-content: flex-end; }
`;
