/**
 * PoolsModal — read-only browser for PVE resource pools.
 * Reachable from the command palette (search "pool"). Lists all pools with
 * member counts; expand a pool to see member VMs/CTs/storages with state.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

interface PoolSummary {
  poolid?: string;
  comment?: string;
  members_count?: number;
}

interface Member {
  type?: string;          // 'qemu' / 'lxc' / 'storage'
  id?: string;            // 'qemu/100' / 'storage/local'
  vmid?: number;
  name?: string;
  storage?: string;
  node?: string;
  status?: string;
}

export function PoolsModal({ open, onClose, clusterId }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';
  const [pools, setPools] = useState<PoolSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, Member[]>>({});
  const [reload, setReload] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ poolid: '', comment: '' });
  const [addForm, setAddForm] = useState({ vms: '', storage: '' });
  const [busy, setBusy] = useState(false);

  const POOL_RE = /^[A-Za-z][A-Za-z0-9_\-]{0,63}$/;

  const refresh = () => { setDetails({}); setReload((n) => n + 1); };

  const submitCreate = async () => {
    if (!POOL_RE.test(createForm.poolid)) {
      setError('Bad pool id'); return;
    }
    setBusy(true); setError(null);
    try {
      const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/pools`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setShowCreate(false); setCreateForm({ poolid: '', comment: '' });
      refresh();
    } catch (e: any) { setError(e.message || String(e)); }
    finally { setBusy(false); }
  };

  const deletePool = async (poolid: string) => {
    const ok = await dialog.confirm(
      `Delete pool "${poolid}"?\n\nMembers (VMs / storages) are NOT deleted; they're just unbound.`,
      { title: 'Delete pool?', destructive: true }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/pools/${encodeURIComponent(poolid)}`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      refresh();
    } catch (e: any) { await dialog.alert(`Delete failed: ${e.message || e}`); }
  };

  const updateMembers = async (poolid: string, deleteMembers: boolean) => {
    const body: any = { delete: deleteMembers };
    if (addForm.vms.trim()) body.vms = addForm.vms.trim();
    if (addForm.storage.trim()) body.storage = addForm.storage.trim();
    if (!body.vms && !body.storage) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/pools/${encodeURIComponent(poolid)}`,
        { method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setAddForm({ vms: '', storage: '' });
      refresh();
    } catch (e: any) { await dialog.alert(`Update failed: ${e.message || e}`); }
  };

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/pools`,
          { credentials: 'same-origin' }
        );
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (alive) setPools(data.pools || []);
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  const expand = async (poolid: string) => {
    if (expanded === poolid) {
      setExpanded(null); return;
    }
    setExpanded(poolid);
    if (details[poolid]) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/pools/${encodeURIComponent(poolid)}`,
        { credentials: 'same-origin' }
      );
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      setDetails((d) => ({ ...d, [poolid]: data.pool?.members || [] }));
    } catch {
      setDetails((d) => ({ ...d, [poolid]: [] }));
    }
  };

  if (!open) return null;

  return (
    <div className="po-back" onClick={onClose}>
      <div className="po-modal" onClick={(e) => e.stopPropagation()}>
        <div className="po-head">
          <div className="po-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/>
              <circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/>
              <line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="18" x2="16" y2="18"/>
              <line x1="6" y1="8" x2="6" y2="16"/><line x1="18" y1="8" x2="18" y2="16"/>
            </svg>
            <span>{t('pools.title')}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {isAdmin && !showCreate && (
              <button className="po-add-btn" onClick={() => { setShowCreate(true); setError(null); }}>+ Pool</button>
            )}
            <button className="po-close" onClick={onClose}>×</button>
          </div>
        </div>
        {showCreate && isAdmin && (
          <div className="po-create">
            <input placeholder="pool id (e.g. tenant1)" value={createForm.poolid}
                   onChange={(e) => setCreateForm({ ...createForm, poolid: e.target.value })} />
            <input placeholder="comment (optional)" value={createForm.comment}
                   onChange={(e) => setCreateForm({ ...createForm, comment: e.target.value })} />
            <button onClick={() => { setShowCreate(false); setError(null); }} disabled={busy}>Cancel</button>
            <button className="po-primary" onClick={submitCreate}
                    disabled={busy || !POOL_RE.test(createForm.poolid)}>
              {busy ? '…' : 'Create'}
            </button>
          </div>
        )}
        <div className="po-body">
          {error && <div className="po-error">{error}</div>}
          {loading && pools.length === 0 && <div className="po-empty">{t('pools.loading')}</div>}
          {!loading && pools.length === 0 && !error && (
            <div className="po-empty">{t('pools.empty')}</div>
          )}
          {pools.map((p) => {
            const id = p.poolid || '';
            const open = expanded === id;
            const members = details[id] || [];
            return (
              <div key={id} className="po-row">
                <div className="po-row-head" onClick={() => expand(id)}>
                  <span className="po-chevron">{open ? '▾' : '▸'}</span>
                  <span className="po-name">{id}</span>
                  {p.comment && <span className="po-comment">{p.comment}</span>}
                  <span className="po-count">{p.members_count != null ? `${p.members_count} ${t('pools.members')}` : ''}</span>
                  {isAdmin && (
                    <button className="po-del" onClick={(e) => { e.stopPropagation(); deletePool(id); }}>Delete</button>
                  )}
                </div>
                {open && (
                  <div className="po-members">
                    {isAdmin && (
                      <div className="po-mem-add">
                        <input placeholder="vmids (e.g. 100,101)" value={addForm.vms}
                               onChange={(e) => setAddForm({ ...addForm, vms: e.target.value.replace(/[^0-9,]/g, '') })} />
                        <input placeholder="storage ids (e.g. local,ceph)" value={addForm.storage}
                               onChange={(e) => setAddForm({ ...addForm, storage: e.target.value })} />
                        <button onClick={() => updateMembers(id, false)}>+ Add</button>
                        <button className="po-del" onClick={() => updateMembers(id, true)}>− Remove</button>
                      </div>
                    )}
                    {members.length === 0 ? (
                      <div className="po-empty-inline">{t('pools.no_members')}</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>{t('pools.col.type')}</th>
                            <th>{t('pools.col.id')}</th>
                            <th>{t('pools.col.name')}</th>
                            <th>{t('pools.col.node')}</th>
                            <th>{t('pools.col.status')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((m, i) => (
                            <tr key={`${m.type}-${m.id || i}`}>
                              <td className="po-mono"><span className={`po-kind po-kind-${m.type}`}>{m.type}</span></td>
                              <td className="po-mono">{m.vmid || m.storage || m.id}</td>
                              <td className="po-mono">{m.name || m.storage || ''}</td>
                              <td className="po-mono">{m.node || ''}</td>
                              <td className="po-mono">{m.status || ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <style>{`
          .po-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .po-modal { width: min(900px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); overflow: hidden; animation: po-in .18s ease-out; }
          @keyframes po-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .po-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .po-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .po-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .po-close:hover { color: var(--primary); }
          .po-body { flex: 1; overflow: auto; padding: 6px 0; }
          .po-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .po-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }

          .po-row { border-bottom: 1px solid rgba(0,240,255,.06); }
          .po-row-head { display: flex; align-items: center; gap: 12px; padding: 10px 18px; cursor: pointer; transition: background .12s; }
          .po-row-head:hover { background: rgba(0,240,255,.05); }
          .po-chevron { color: var(--primary); font-family: var(--font-mono); width: 12px; }
          .po-name { font-family: var(--font-mono); color: var(--primary); font-size: 13px; }
          .po-comment { font-family: var(--font-mono); color: var(--text-secondary); font-size: 13px; }
          .po-count { margin-left: auto; font-family: var(--font-mono); color: var(--text-secondary); font-size: 13.5px; }

          .po-members { padding: 8px 18px 18px 30px; background: rgba(0, 240, 255, 0.02); }
          .po-empty-inline { color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; padding: 8px 0; }
          .po-members table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .po-members th { padding: 4px 10px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.1); }
          .po-members td { padding: 3px 10px; color: var(--text-primary); border-bottom: 1px solid rgba(0,240,255,.04); white-space: nowrap; }
          .po-mono { font-family: var(--font-mono); }
          .po-kind { display: inline-block; padding: 1px 7px; font-size: 13.5px; border-radius: 2px; font-family: var(--font-display); letter-spacing: .04em; border: 1px solid currentColor; }
          .po-kind-qemu    { color: var(--primary); }
          .po-kind-lxc     { color: var(--accent); }
          .po-kind-storage { color: var(--warning); }
          .po-add-btn { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .po-add-btn:hover { background: rgba(0,240,255,.2); }
          .po-create { display: flex; gap: 8px; align-items: center; padding: 10px 18px; border-bottom: 1px solid rgba(0,240,255,.16); background: rgba(0, 240, 255, 0.04); }
          .po-create input { flex: 1; padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .po-create button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .po-create .po-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .po-mem-add { display: flex; gap: 6px; align-items: center; margin-bottom: 10px; padding: 8px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .po-mem-add input { flex: 1; padding: 4px 8px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .po-mem-add button { padding: 3px 10px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .po-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; margin-left: 8px; }
          .po-del:hover { background: rgba(255, 77, 109, 0.1); }
        `}</style>
      </div>
    </div>
  );
}
