/**
 * PVEAccessModal — admin CRUD for PVE-side users / groups / ACL.
 *
 * Distinct from jt-proxense's own user table (UserAdmin view): this
 * lives in the PVE cluster's /etc/pve/user.cfg and gates PVE API + web
 * UI access for the cluster.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

type Tab = 'users' | 'groups' | 'acl';

interface PveUser {
  userid: string;
  enable?: number;
  comment?: string;
  email?: string;
  groups?: string;
  expire?: number;
}
interface PveGroup { groupid: string; comment?: string; users?: string; }
interface PveAcl { path: string; type?: string; ugid?: string; roleid?: string; propagate?: number; }
interface PveRole { roleid: string; privs?: string; special?: number; }

const USERID_RE = /^[A-Za-z0-9._\-]{1,64}@[a-z][a-z0-9\-]{0,32}$/;
const GROUP_RE = /^[A-Za-z][A-Za-z0-9._\-]{0,63}$/;
const PATH_RE = /^\/$|^\/[A-Za-z0-9._/\-]{0,256}$/;

export function PVEAccessModal({ open, onClose, clusterId }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [tab, setTab] = useState<Tab>('users');
  const [reload, setReload] = useState(0);
  const bump = () => setReload((n) => n + 1);

  const [users, setUsers] = useState<PveUser[]>([]);
  const [groups, setGroups] = useState<PveGroup[]>([]);
  const [acl, setAcl] = useState<PveAcl[]>([]);
  const [roles, setRoles] = useState<PveRole[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Add forms
  const [addUser, setAddUser] = useState({ userid: '', password: '', comment: '', email: '', groups: '', enable: true });
  const [addGroup, setAddGroup] = useState({ groupid: '', comment: '' });
  const [addAcl, setAddAcl] = useState({
    path: '/', roles: '', users: '', groups: '', tokens: '', propagate: true, delete: false,
  });

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const [r1, r2, r3, r4] = await Promise.all([
          fetch(`/api/clusters/${cid}/pve-access/users`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/pve-access/groups`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/pve-access/acl`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/pve-access/roles`, { credentials: 'same-origin' }),
        ]);
        if (!alive) return;
        if (r1.ok) setUsers((await r1.json()).users || []);
        if (r2.ok) setGroups((await r2.json()).groups || []);
        if (r3.ok) setAcl((await r3.json()).acl || []);
        if (r4.ok) setRoles((await r4.json()).roles || []);
      } catch (e: any) {
        if (alive) setErr(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  const apiCall = async (method: string, path: string, body?: any) => {
    const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}${path}`, {
      method, credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
  };

  const handle = async (fn: () => Promise<void>) => {
    setErr(null);
    try { await fn(); bump(); }
    catch (e: any) { setErr(e.message || String(e)); }
  };

  if (!open) return null;
  return (
    <div className="pa-back" onClick={onClose}>
      <div className="pa-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pa-head">
          <div className="pa-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>{t('pa.title')}</span>
          </div>
          <button className="pa-close" onClick={onClose}>×</button>
        </div>
        <div className="pa-tabs">
          {(['users', 'groups', 'acl'] as const).map((k) => (
            <button key={k} className={`pa-tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>
              {t(`pa.tab.${k}`)}
            </button>
          ))}
        </div>
        <div className="pa-body">
          {err && <div className="pa-error">{err}</div>}
          {loading && !users.length && <div className="pa-empty">{t('pa.loading')}</div>}

          {tab === 'users' && (
            <>
              <div className="pa-add">
                <input placeholder="user@realm" value={addUser.userid}
                       onChange={(e) => setAddUser({ ...addUser, userid: e.target.value })} />
                <input placeholder="password (optional)" type="password" value={addUser.password}
                       onChange={(e) => setAddUser({ ...addUser, password: e.target.value })} />
                <input placeholder="email" value={addUser.email}
                       onChange={(e) => setAddUser({ ...addUser, email: e.target.value })} />
                <input placeholder="groups (csv)" value={addUser.groups}
                       onChange={(e) => setAddUser({ ...addUser, groups: e.target.value })} />
                <input placeholder="comment" value={addUser.comment}
                       onChange={(e) => setAddUser({ ...addUser, comment: e.target.value })} />
                <button className="pa-primary"
                        disabled={!USERID_RE.test(addUser.userid)}
                        onClick={() => handle(async () => {
                          const body: any = { userid: addUser.userid, enable: addUser.enable };
                          if (addUser.password) body.password = addUser.password;
                          if (addUser.email) body.email = addUser.email;
                          if (addUser.groups) body.groups = addUser.groups;
                          if (addUser.comment) body.comment = addUser.comment;
                          await apiCall('POST', '/pve-access/users', body);
                          setAddUser({ userid: '', password: '', comment: '', email: '', groups: '', enable: true });
                        })}>+ Create</button>
              </div>
              <table className="pa-table">
                <thead><tr><th>userid</th><th>enable</th><th>email</th><th>groups</th><th>comment</th><th></th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.userid}>
                      <td className="pa-mono">{u.userid}</td>
                      <td>
                        <button className={`pa-tog ${u.enable ? 'on' : 'off'}`}
                                onClick={() => handle(() =>
                                  apiCall('PUT', `/pve-access/users/${encodeURIComponent(u.userid)}`,
                                          { enable: !u.enable }))}>
                          {u.enable ? 'on' : 'off'}
                        </button>
                      </td>
                      <td className="pa-mono pa-trunc">{u.email || '—'}</td>
                      <td className="pa-mono pa-trunc">{u.groups || '—'}</td>
                      <td className="pa-mono pa-trunc" title={u.comment || ''}>{u.comment || '—'}</td>
                      <td>
                        <button className="pa-del" onClick={async () => {
                          const ok = await dialog.confirm(`Delete PVE user "${u.userid}"?`,
                            { title: 'Delete PVE user?', destructive: true });
                          if (ok) handle(() => apiCall('DELETE', `/pve-access/users/${encodeURIComponent(u.userid)}`));
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'groups' && (
            <>
              <div className="pa-add">
                <input placeholder="group id" value={addGroup.groupid}
                       onChange={(e) => setAddGroup({ ...addGroup, groupid: e.target.value })} />
                <input placeholder="comment" value={addGroup.comment}
                       onChange={(e) => setAddGroup({ ...addGroup, comment: e.target.value })} />
                <button className="pa-primary"
                        disabled={!GROUP_RE.test(addGroup.groupid)}
                        onClick={() => handle(async () => {
                          await apiCall('POST', '/pve-access/groups', addGroup);
                          setAddGroup({ groupid: '', comment: '' });
                        })}>+ Create</button>
              </div>
              <table className="pa-table">
                <thead><tr><th>group</th><th>members</th><th>comment</th><th></th></tr></thead>
                <tbody>
                  {groups.map((g) => (
                    <tr key={g.groupid}>
                      <td className="pa-mono">{g.groupid}</td>
                      <td className="pa-mono pa-trunc" title={g.users || ''}>{g.users || '—'}</td>
                      <td className="pa-mono pa-trunc">{g.comment || '—'}</td>
                      <td>
                        <button className="pa-del" onClick={async () => {
                          const ok = await dialog.confirm(`Delete group "${g.groupid}"?`,
                            { title: 'Delete PVE group?', destructive: true });
                          if (ok) handle(() => apiCall('DELETE', `/pve-access/groups/${encodeURIComponent(g.groupid)}`));
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'acl' && (
            <>
              <div className="pa-add">
                <input placeholder="path (e.g. / or /vms/100)" value={addAcl.path}
                       onChange={(e) => setAddAcl({ ...addAcl, path: e.target.value })} />
                <select value={addAcl.roles} onChange={(e) => setAddAcl({ ...addAcl, roles: e.target.value })}>
                  <option value="">— pick role —</option>
                  {roles.map((r) => <option key={r.roleid} value={r.roleid}>{r.roleid}</option>)}
                </select>
                <input placeholder="users (csv)" value={addAcl.users}
                       onChange={(e) => setAddAcl({ ...addAcl, users: e.target.value })} />
                <input placeholder="groups (csv)" value={addAcl.groups}
                       onChange={(e) => setAddAcl({ ...addAcl, groups: e.target.value })} />
                <label className="pa-check"><input type="checkbox" checked={addAcl.propagate}
                       onChange={(e) => setAddAcl({ ...addAcl, propagate: e.target.checked })} />propagate</label>
                <button className="pa-primary"
                        disabled={!PATH_RE.test(addAcl.path) || !addAcl.roles ||
                                  (!addAcl.users && !addAcl.groups)}
                        onClick={() => handle(async () => {
                          const body: any = {
                            path: addAcl.path, roles: addAcl.roles,
                            propagate: addAcl.propagate, delete: false,
                          };
                          if (addAcl.users) body.users = addAcl.users;
                          if (addAcl.groups) body.groups = addAcl.groups;
                          await apiCall('PUT', '/pve-access/acl', body);
                          setAddAcl({ ...addAcl, path: '/', roles: '', users: '', groups: '', tokens: '' });
                        })}>+ Grant</button>
              </div>
              <table className="pa-table">
                <thead><tr><th>path</th><th>type</th><th>ugid</th><th>role</th><th>propagate</th><th></th></tr></thead>
                <tbody>
                  {acl.map((a, i) => (
                    <tr key={`${a.path}-${a.ugid}-${a.roleid}-${i}`}>
                      <td className="pa-mono pa-trunc">{a.path}</td>
                      <td className="pa-mono">{a.type || '—'}</td>
                      <td className="pa-mono pa-trunc">{a.ugid || '—'}</td>
                      <td className="pa-mono">{a.roleid || '—'}</td>
                      <td className="pa-mono">{a.propagate ? 'yes' : 'no'}</td>
                      <td>
                        <button className="pa-del" onClick={async () => {
                          const ok = await dialog.confirm(
                            `Remove ACL: path=${a.path}, role=${a.roleid}, ugid=${a.ugid}?`,
                            { title: 'Revoke ACL?', destructive: true }
                          );
                          if (!ok) return;
                          const body: any = { path: a.path, roles: a.roleid, propagate: !!a.propagate, delete: true };
                          if (a.type === 'user' || a.type === 'token') body.users = a.ugid;
                          else if (a.type === 'group') body.groups = a.ugid;
                          else body.users = a.ugid;
                          handle(() => apiCall('PUT', '/pve-access/acl', body));
                        }}>Revoke</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <style>{`
          .pa-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .pa-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: pa-in .18s ease-out; overflow: hidden; }
          @keyframes pa-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .pa-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .pa-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .pa-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .pa-tabs { display: flex; padding: 0 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); }
          .pa-tab { padding: 10px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: none; border-bottom: 2px solid transparent; cursor: pointer; }
          .pa-tab:hover { color: var(--primary); }
          .pa-tab.active { color: var(--primary); border-bottom-color: var(--primary); }
          .pa-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .pa-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .pa-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .pa-add { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .pa-add input, .pa-add select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; min-width: 140px; flex: 1; }
          .pa-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .pa-primary { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .pa-primary:disabled { opacity: .4; cursor: not-allowed; }
          .pa-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .pa-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .pa-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .pa-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .pa-mono { font-family: var(--font-mono); }
          .pa-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .pa-tog { padding: 2px 10px; font-size: 13.5px; font-family: var(--font-mono); border-radius: 999px; border: 1px solid currentColor; background: transparent; cursor: pointer; }
          .pa-tog.on { color: var(--success); }
          .pa-tog.off { color: var(--text-muted); }
          .pa-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .pa-del:hover { background: rgba(255, 77, 109, 0.1); }
        `}</style>
      </div>
    </div>
  );
}
