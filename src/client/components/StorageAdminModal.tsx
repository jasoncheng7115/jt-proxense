/**
 * StorageAdminModal — admin CRUD for cluster storages.
 *
 * List on the left; on click a row shows an editor on the right (or
 * empty placeholder). "+ New" toggles a create form with a type
 * dropdown and renders per-type fields.
 *
 * Backend: server/storage_admin.py.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

type StorageType = 'dir' | 'nfs' | 'cifs' | 'lvm' | 'lvmthin' | 'zfspool' | 'rbd' | 'pbs' | 'cephfs' | 'iscsi' | 'glusterfs' | 'zfs';

const TYPES: StorageType[] = ['dir', 'nfs', 'cifs', 'lvm', 'lvmthin', 'zfspool', 'rbd', 'pbs', 'cephfs', 'iscsi', 'glusterfs', 'zfs'];

interface Storage {
  storage: string;
  type: StorageType;
  content?: string;
  nodes?: string;
  shared?: number;
  disable?: number;
  // type-specific fields surfaced opportunistically
  path?: string;
  server?: string;
  export?: string;
  share?: string;
  vgname?: string;
  thinpool?: string;
  pool?: string;
  monhost?: string;
  datastore?: string;
  username?: string;
  fingerprint?: string;
  namespace?: string;
}

const ID_RE = /^[A-Za-z][A-Za-z0-9._\-]{0,31}$/;

// Field schema per type — keys, label, optional placeholder. Mirrors the
// server allow-list (not strict — server is authoritative).
interface FieldDef { key: string; label: string; type?: 'text'|'bool'|'password'; placeholder?: string; }
const FIELD_SCHEMAS: Record<StorageType, FieldDef[]> = {
  dir: [
    { key: 'path', label: 'path', placeholder: '/srv/storage' },
    { key: 'mkdir', label: 'mkdir', type: 'bool' },
    { key: 'shared', label: 'shared', type: 'bool' },
  ],
  nfs: [
    { key: 'server', label: 'server', placeholder: 'nas.example.com' },
    { key: 'export', label: 'export', placeholder: '/srv/export' },
    { key: 'options', label: 'options', placeholder: 'vers=4.2' },
    { key: 'shared', label: 'shared', type: 'bool' },
  ],
  cifs: [
    { key: 'server', label: 'server' },
    { key: 'share', label: 'share' },
    { key: 'username', label: 'username' },
    { key: 'password', label: 'password', type: 'password' },
    { key: 'smbversion', label: 'smb version', placeholder: '3.0' },
    { key: 'domain', label: 'domain' },
    { key: 'shared', label: 'shared', type: 'bool' },
  ],
  lvm: [
    { key: 'vgname', label: 'volume group' },
    { key: 'shared', label: 'shared', type: 'bool' },
    { key: 'saferemove', label: 'safe remove', type: 'bool' },
  ],
  lvmthin: [
    { key: 'vgname', label: 'volume group' },
    { key: 'thinpool', label: 'thin pool' },
  ],
  zfspool: [
    { key: 'pool', label: 'pool' },
    { key: 'sparse', label: 'sparse', type: 'bool' },
    { key: 'blocksize', label: 'block size', placeholder: '8k' },
  ],
  rbd: [
    { key: 'monhost', label: 'mon hosts' },
    { key: 'pool', label: 'pool' },
    { key: 'username', label: 'username', placeholder: 'admin' },
    { key: 'krbd', label: 'krbd', type: 'bool' },
    { key: 'shared', label: 'shared', type: 'bool' },
  ],
  pbs: [
    { key: 'server', label: 'server' },
    { key: 'datastore', label: 'datastore' },
    { key: 'username', label: 'username', placeholder: 'user@pbs' },
    { key: 'password', label: 'password', type: 'password' },
    { key: 'fingerprint', label: 'fingerprint (sha256)', placeholder: 'aa:bb:..' },
    { key: 'namespace', label: 'namespace' },
  ],
  cephfs: [
    { key: 'monhost', label: 'mon hosts (comma-sep)' },
    { key: 'username', label: 'username', placeholder: 'admin' },
    { key: 'fs_name', label: 'fs name' },
    { key: 'subdir', label: 'subdir' },
    { key: 'fuse', label: 'fuse', type: 'bool' },
  ],
  iscsi: [
    { key: 'portal', label: 'portal', placeholder: '10.0.0.10:3260' },
    { key: 'target', label: 'target IQN' },
  ],
  glusterfs: [
    { key: 'server', label: 'server' },
    { key: 'server2', label: 'server2 (failover)' },
    { key: 'volume', label: 'volume' },
  ],
  zfs: [
    { key: 'portal', label: 'portal' },
    { key: 'target', label: 'target IQN' },
    { key: 'pool', label: 'pool' },
    { key: 'iscsiprovider', label: 'provider', placeholder: 'comstar | istgt | iet | LIO' },
  ],
};

export function StorageAdminModal({ open, onClose, clusterId }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [items, setItems] = useState<Storage[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const bump = () => setReload((n) => n + 1);

  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createType, setCreateType] = useState<StorageType>('dir');

  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/storage-config`,
          { credentials: 'same-origin' });
        if (alive && r.ok) setItems(((await r.json()).storages || []) as Storage[]);
      } catch (e: any) {
        if (alive) setErr(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  useEffect(() => {
    if (!open) {
      setCreating(false); setEditingId(null); setForm({});
    }
  }, [open]);

  const editing = useMemo(
    () => items.find((s) => s.storage === editingId) || null,
    [items, editingId]
  );

  const startCreate = () => {
    setEditingId(null);
    setCreating(true);
    setCreateType('dir');
    setForm({ storage: '', content: 'images', nodes: '', disable: 0 });
  };

  const startEdit = (s: Storage) => {
    setCreating(false);
    setEditingId(s.storage);
    // seed editable fields from current values
    const seed: Record<string, any> = {
      content: s.content || '',
      nodes: s.nodes || '',
      shared: s.shared ? 1 : 0,
      disable: s.disable ? 1 : 0,
    };
    for (const f of FIELD_SCHEMAS[s.type] || []) {
      if ((s as any)[f.key] !== undefined) seed[f.key] = (s as any)[f.key];
    }
    setForm(seed);
  };

  const submit = async () => {
    setErr(null);
    try {
      if (creating) {
        const sid = (form.storage || '').trim();
        if (!ID_RE.test(sid)) throw new Error('Bad storage id');
        const body: any = { storage: sid, type: createType };
        for (const [k, v] of Object.entries(form)) {
          if (k === 'storage') continue;
          if (v === '' || v === undefined || v === null) continue;
          body[k] = v;
        }
        const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/storage-config`, {
          method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
        setCreating(false); setForm({});
        bump();
      } else if (editing) {
        const body: any = {};
        for (const [k, v] of Object.entries(form)) {
          if (v === '' || v === undefined || v === null) continue;
          body[k] = v;
        }
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/storage-config/${encodeURIComponent(editing.storage)}`,
          {
            method: 'PUT', credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        );
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
        setEditingId(null); setForm({});
        bump();
      }
    } catch (e: any) {
      setErr(e.message || String(e));
    }
  };

  const remove = async (s: Storage) => {
    const ok = await dialog.confirm(
      `Remove storage "${s.storage}" from cluster config?\n\nThis only deletes the entry. Underlying disk/share data is left intact.`,
      { title: 'Delete storage?', destructive: true }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/storage-config/${encodeURIComponent(s.storage)}`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      if (editingId === s.storage) setEditingId(null);
      bump();
    } catch (e: any) {
      await dialog.alert(`Delete failed: ${e.message || e}`);
    }
  };

  if (!open) return null;
  const fields: FieldDef[] = creating
    ? FIELD_SCHEMAS[createType] || []
    : (editing ? FIELD_SCHEMAS[editing.type] || [] : []);

  return (
    <div className="sa-back" onClick={onClose}>
      <div className="sa-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sa-head">
          <div className="sa-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="6" rx="8" ry="3"/>
              <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
              <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/>
            </svg>
            <span>{t('sta.title')}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="sa-add-btn" onClick={startCreate}>+ New</button>
            <button className="sa-close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="sa-split">
          <div className="sa-list">
            {err && <div className="sa-error">{err}</div>}
            {loading && items.length === 0 && <div className="sa-empty">{t('sta.loading')}</div>}
            {!loading && items.length === 0 && <div className="sa-empty">{t('sta.empty')}</div>}
            <table className="sa-table">
              <thead>
                <tr><th>id</th><th>type</th><th>content</th><th>nodes</th><th></th></tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.storage} className={editingId === s.storage ? 'sa-selected' : ''}>
                    <td className="sa-mono">
                      <button className="sa-link" onClick={() => startEdit(s)}>{s.storage}</button>
                      {s.disable ? <span className="sa-pill off">disabled</span> : null}
                    </td>
                    <td className="sa-mono">{s.type}</td>
                    <td className="sa-mono sa-trunc" title={s.content || ''}>{s.content || '—'}</td>
                    <td className="sa-mono sa-trunc" title={s.nodes || ''}>{s.nodes || 'all'}</td>
                    <td>
                      <button className="sa-del" onClick={() => remove(s)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sa-edit">
            {!creating && !editing && (
              <div className="sa-empty">{t('sta.pick_or_new')}</div>
            )}
            {(creating || editing) && (
              <>
                <div className="sa-edit-title">
                  {creating ? `+ New ${createType}` : `Edit ${editing!.storage} (${editing!.type})`}
                </div>
                {creating && (
                  <>
                    <Row label="storage id">
                      <input value={form.storage || ''}
                             onChange={(e) => setForm({ ...form, storage: e.target.value })}
                             placeholder="my-storage" />
                    </Row>
                    <Row label="type">
                      <select value={createType} onChange={(e) => setCreateType(e.target.value as StorageType)}>
                        {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Row>
                  </>
                )}
                <Row label="content">
                  <input value={form.content || ''}
                         onChange={(e) => setForm({ ...form, content: e.target.value })}
                         placeholder="images,iso,vztmpl,backup" />
                </Row>
                <Row label="nodes">
                  <input value={form.nodes || ''}
                         onChange={(e) => setForm({ ...form, nodes: e.target.value })}
                         placeholder="(empty = all)" />
                </Row>
                <Row label="disabled">
                  <input type="checkbox" checked={!!form.disable}
                         onChange={(e) => setForm({ ...form, disable: e.target.checked ? 1 : 0 })} />
                </Row>
                {fields.map((f) => (
                  <Row key={f.key} label={f.label}>
                    {f.type === 'bool' ? (
                      <input type="checkbox" checked={!!form[f.key]}
                             onChange={(e) => setForm({ ...form, [f.key]: e.target.checked ? 1 : 0 })} />
                    ) : f.type === 'password' ? (
                      <input type="password" value={form[f.key] || ''}
                             onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                             placeholder={f.placeholder} />
                    ) : (
                      <input value={form[f.key] || ''}
                             onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                             placeholder={f.placeholder} />
                    )}
                  </Row>
                ))}
                <div className="sa-actions">
                  <button onClick={() => { setCreating(false); setEditingId(null); setForm({}); }}>Cancel</button>
                  <button className="sa-primary" onClick={submit}>
                    {creating ? 'Create' : 'Save'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <style>{`
          .sa-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .sa-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: sa-in .18s ease-out; overflow: hidden; }
          @keyframes sa-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .sa-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .sa-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .sa-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .sa-add-btn { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .sa-add-btn:hover { background: rgba(0,240,255,.2); }
          .sa-split { display: grid; grid-template-columns: 1fr 360px; flex: 1; min-height: 0; }
          .sa-list { overflow: auto; padding: 12px 14px; border-right: 1px solid rgba(0,240,255,.12); }
          .sa-edit { overflow: auto; padding: 12px 14px; background: rgba(0, 240, 255, 0.02); }
          .sa-edit-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid rgba(0,240,255,.16); }
          .sa-row { display: grid; grid-template-columns: 110px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .sa-row > span { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .sa-row input, .sa-row select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .sa-row input[type="checkbox"] { justify-self: start; }
          .sa-row input:focus, .sa-row select:focus { border-color: var(--primary); }
          .sa-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
          .sa-actions button { padding: 6px 16px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .sa-actions .sa-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .sa-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .sa-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .sa-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .sa-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .sa-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .sa-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .sa-table tbody tr.sa-selected { background: rgba(0, 240, 255, 0.08); box-shadow: inset 3px 0 0 var(--primary); }
          .sa-link { background: transparent; border: none; color: var(--primary); font-family: var(--font-mono); font-size: 13px; cursor: pointer; text-decoration: underline; padding: 0; }
          .sa-mono { font-family: var(--font-mono); }
          .sa-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .sa-pill { margin-left: 8px; padding: 1px 6px; font-size: 13.5px; border-radius: 999px; border: 1px solid currentColor; }
          .sa-pill.off { color: var(--warning); }
          .sa-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .sa-del:hover { background: rgba(255, 77, 109, 0.1); }
        `}</style>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="sa-row"><span>{label}</span>{children}</label>;
}
