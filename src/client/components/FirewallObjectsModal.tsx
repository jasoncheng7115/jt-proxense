/**
 * FirewallObjectsModal — admin CRUD for the supporting objects firewall
 * rules reference: ipsets, aliases, security groups. Lives next to the
 * existing FirewallModal (which handles rule rows). Three tabs share the
 * same modal frame.
 *
 * Backend: server/fw_admin.py.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

type Tab = 'ipsets' | 'aliases' | 'groups';

const NAME_RE = /^[A-Za-z][A-Za-z0-9_\-]{0,63}$/;
const CIDR_RE = /^[+A-Za-z0-9._:/\-]{1,128}$/;

interface Ipset { name: string; comment?: string; }
interface IpsetMember { cidr: string; nomatch?: number; comment?: string; }
interface Alias { name: string; cidr: string; comment?: string; }
interface FwGroup { group: string; digest?: string; }

export function FirewallObjectsModal({ open, onClose, clusterId }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [tab, setTab] = useState<Tab>('ipsets');
  const [reload, setReload] = useState(0);
  const bump = () => setReload((n) => n + 1);

  // ipsets
  const [ipsets, setIpsets] = useState<Ipset[]>([]);
  const [selectedIpset, setSelectedIpset] = useState<string | null>(null);
  const [members, setMembers] = useState<IpsetMember[]>([]);
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [groups, setGroups] = useState<FwGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // add forms
  const [addIpset, setAddIpset] = useState({ name: '', comment: '' });
  const [addMember, setAddMember] = useState({ cidr: '', comment: '', nomatch: false });
  const [addAlias, setAddAlias] = useState({ name: '', cidr: '', comment: '' });
  const [addGroup, setAddGroup] = useState({ group: '', comment: '' });

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const [r1, r2, r3] = await Promise.all([
          fetch(`/api/clusters/${cid}/firewall/ipsets`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/firewall/aliases`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/firewall/groups`, { credentials: 'same-origin' }),
        ]);
        if (!alive) return;
        if (r1.ok) setIpsets((await r1.json()).ipsets || []);
        if (r2.ok) setAliases((await r2.json()).aliases || []);
        if (r3.ok) setGroups((await r3.json()).groups || []);
      } catch (e: any) {
        if (alive) setErr(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  useEffect(() => {
    if (!open || !selectedIpset) { setMembers([]); return; }
    let alive = true;
    (async () => {
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/firewall/ipsets/${encodeURIComponent(selectedIpset)}`,
          { credentials: 'same-origin' }
        );
        if (alive && r.ok) setMembers((await r.json()).members || []);
      } catch { /* ignore */ }
    })();
    return () => { alive = false; };
  }, [open, clusterId, selectedIpset, reload]);

  if (!open) return null;

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

  return (
    <div className="fo-back" onClick={onClose}>
      <div className="fo-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fo-head">
          <div className="fo-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span>{t('fwo.title')}</span>
          </div>
          <button className="fo-close" onClick={onClose}>×</button>
        </div>
        <div className="fo-tabs">
          {(['ipsets', 'aliases', 'groups'] as const).map((k) => (
            <button key={k} className={`fo-tab ${tab === k ? 'active' : ''}`}
                    onClick={() => { setTab(k); setSelectedIpset(null); }}>
              {t(`fwo.tab.${k}`)}
            </button>
          ))}
        </div>
        <div className="fo-body">
          {err && <div className="fo-error">{err}</div>}
          {loading && <div className="fo-empty">{t('fwo.loading')}</div>}

          {tab === 'ipsets' && (
            <>
              <div className="fo-add">
                <input placeholder="name (e.g. trusted)"
                       value={addIpset.name} onChange={(e) => setAddIpset({ ...addIpset, name: e.target.value })} />
                <input placeholder="comment (optional)"
                       value={addIpset.comment} onChange={(e) => setAddIpset({ ...addIpset, comment: e.target.value })} />
                <button className="fo-primary" disabled={!NAME_RE.test(addIpset.name)}
                        onClick={() => handle(async () => {
                          await apiCall('POST', '/firewall/ipsets', addIpset);
                          setAddIpset({ name: '', comment: '' });
                        })}>+ Create</button>
              </div>
              <table className="fo-table">
                <thead><tr><th>name</th><th>comment</th><th></th></tr></thead>
                <tbody>
                  {ipsets.map((s) => (
                    <tr key={s.name} className={selectedIpset === s.name ? 'fo-selected' : ''}>
                      <td className="fo-mono"><button className="fo-link" onClick={() => setSelectedIpset(selectedIpset === s.name ? null : s.name)}>{s.name}</button></td>
                      <td className="fo-mono">{s.comment || '—'}</td>
                      <td>
                        <button className="fo-del" onClick={async () => {
                          const ok = await dialog.confirm(`Delete ipset "${s.name}"?`,
                            { title: 'Delete ipset?', destructive: true });
                          if (ok) handle(() => apiCall('DELETE', `/firewall/ipsets/${encodeURIComponent(s.name)}`));
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedIpset && (
                <div className="fo-sub">
                  <div className="fo-sub-title">Members of <code>{selectedIpset}</code></div>
                  <div className="fo-add">
                    <input placeholder="cidr / ip / +set"
                           value={addMember.cidr} onChange={(e) => setAddMember({ ...addMember, cidr: e.target.value })} />
                    <input placeholder="comment (optional)"
                           value={addMember.comment} onChange={(e) => setAddMember({ ...addMember, comment: e.target.value })} />
                    <label className="fo-check"><input type="checkbox" checked={addMember.nomatch}
                           onChange={(e) => setAddMember({ ...addMember, nomatch: e.target.checked })} />nomatch</label>
                    <button className="fo-primary" disabled={!CIDR_RE.test(addMember.cidr)}
                            onClick={() => handle(async () => {
                              await apiCall('POST', `/firewall/ipsets/${encodeURIComponent(selectedIpset)}`, addMember);
                              setAddMember({ cidr: '', comment: '', nomatch: false });
                            })}>+ Add</button>
                  </div>
                  <table className="fo-table">
                    <thead><tr><th>cidr</th><th>nomatch</th><th>comment</th><th></th></tr></thead>
                    <tbody>
                      {members.map((m) => (
                        <tr key={m.cidr}>
                          <td className="fo-mono">{m.cidr}</td>
                          <td className="fo-mono">{m.nomatch ? 'yes' : '—'}</td>
                          <td className="fo-mono">{m.comment || '—'}</td>
                          <td>
                            <button className="fo-del" onClick={() => handle(() =>
                              apiCall('DELETE', `/firewall/ipsets/${encodeURIComponent(selectedIpset)}/members/${encodeURIComponent(m.cidr)}`))}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {tab === 'aliases' && (
            <>
              <div className="fo-add">
                <input placeholder="name" value={addAlias.name}
                       onChange={(e) => setAddAlias({ ...addAlias, name: e.target.value })} />
                <input placeholder="10.0.0.0/24" value={addAlias.cidr}
                       onChange={(e) => setAddAlias({ ...addAlias, cidr: e.target.value })} />
                <input placeholder="comment" value={addAlias.comment}
                       onChange={(e) => setAddAlias({ ...addAlias, comment: e.target.value })} />
                <button className="fo-primary"
                        disabled={!NAME_RE.test(addAlias.name) || !CIDR_RE.test(addAlias.cidr)}
                        onClick={() => handle(async () => {
                          await apiCall('POST', '/firewall/aliases', addAlias);
                          setAddAlias({ name: '', cidr: '', comment: '' });
                        })}>+ Create</button>
              </div>
              <table className="fo-table">
                <thead><tr><th>name</th><th>cidr</th><th>comment</th><th></th></tr></thead>
                <tbody>
                  {aliases.map((a) => (
                    <tr key={a.name}>
                      <td className="fo-mono">{a.name}</td>
                      <td className="fo-mono">{a.cidr}</td>
                      <td className="fo-mono">{a.comment || '—'}</td>
                      <td>
                        <button className="fo-del" onClick={async () => {
                          const ok = await dialog.confirm(`Delete alias "${a.name}"?`,
                            { title: 'Delete alias?', destructive: true });
                          if (ok) handle(() => apiCall('DELETE', `/firewall/aliases/${encodeURIComponent(a.name)}`));
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
              <div className="fo-add">
                <input placeholder="group name" value={addGroup.group}
                       onChange={(e) => setAddGroup({ ...addGroup, group: e.target.value })} />
                <input placeholder="comment" value={addGroup.comment}
                       onChange={(e) => setAddGroup({ ...addGroup, comment: e.target.value })} />
                <button className="fo-primary" disabled={!NAME_RE.test(addGroup.group)}
                        onClick={() => handle(async () => {
                          await apiCall('POST', '/firewall/groups', addGroup);
                          setAddGroup({ group: '', comment: '' });
                        })}>+ Create</button>
              </div>
              <div className="fo-help">{t('fwo.groups_help')}</div>
              <table className="fo-table">
                <thead><tr><th>group</th><th></th></tr></thead>
                <tbody>
                  {groups.map((g) => (
                    <tr key={g.group}>
                      <td className="fo-mono">{g.group}</td>
                      <td>
                        <button className="fo-del" onClick={async () => {
                          const ok = await dialog.confirm(`Delete group "${g.group}"?`,
                            { title: 'Delete group?', destructive: true });
                          if (ok) handle(() => apiCall('DELETE', `/firewall/groups/${encodeURIComponent(g.group)}`));
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <style>{`
          .fo-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .fo-modal { width: min(900px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: fo-in .18s ease-out; overflow: hidden; }
          @keyframes fo-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .fo-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .fo-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .fo-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .fo-tabs { display: flex; padding: 0 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); }
          .fo-tab { padding: 10px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: none; border-bottom: 2px solid transparent; cursor: pointer; }
          .fo-tab:hover { color: var(--primary); }
          .fo-tab.active { color: var(--primary); border-bottom-color: var(--primary); }
          .fo-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .fo-empty { padding: 20px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .fo-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .fo-help { padding: 4px 0 12px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }

          .fo-add { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .fo-add input { flex: 1; min-width: 140px; padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .fo-add input:focus { border-color: var(--primary); }
          .fo-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .fo-primary { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .fo-primary:disabled { opacity: .4; cursor: not-allowed; }

          .fo-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .fo-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .fo-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .fo-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .fo-table tbody tr.fo-selected { background: rgba(0, 240, 255, 0.08); box-shadow: inset 3px 0 0 var(--primary); }
          .fo-link { background: transparent; border: none; color: var(--primary); font-family: var(--font-mono); font-size: 13px; cursor: pointer; text-decoration: underline; padding: 0; }
          .fo-mono { font-family: var(--font-mono); }
          .fo-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .fo-del:hover { background: rgba(255, 77, 109, 0.1); }

          .fo-sub { margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(0, 240, 255, 0.16); }
          .fo-sub-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; }
        `}</style>
      </div>
    </div>
  );
}
