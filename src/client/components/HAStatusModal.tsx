/**
 * HAStatusModal — full read-only viewer for cluster HA state.
 *
 * Three sections:
 *   - Quorum + master + per-node LRM status (top strip)
 *   - HA-managed resources table (sid / state / node / max_relocate / …)
 *   - HA groups list (for context — restrict / failback / nodes)
 *
 * Reachable from Health Monitor card click and from a future ops nav entry.
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

interface Resource {
  sid?: string;
  state?: string;
  request_state?: string;
  node?: string;
  crm_state?: string;
  max_relocate?: number;
  max_restart?: number;
  type?: string;
}

interface Master {
  node?: string;
  status?: string;
}

interface Lrm {
  node?: string;
  status?: string;
}

interface Quorum {
  quorate?: number;
  node?: string;
  status?: string;
}

interface HaGroup {
  group?: string;
  nodes?: string;
  restricted?: number;
  nofailback?: number;
  comment?: string;
  type?: string;
}

const STATE_COLOR: Record<string, string> = {
  started: 'success',
  stopped: 'muted',
  error: 'danger',
  fence: 'danger',
  freeze: 'warning',
  migrate: 'warning',
  relocate: 'warning',
  request_stop: 'muted',
  request_start: 'muted',
};

export function HAStatusModal({ open, onClose, clusterId }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';
  const [resources, setResources] = useState<Resource[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const [lrms, setLrms] = useState<Lrm[]>([]);
  const [quorum, setQuorum] = useState<Quorum | null>(null);
  const [groups, setGroups] = useState<HaGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [addMode, setAddMode] = useState<'none' | 'resource' | 'group'>('none');
  const [addForm, setAddForm] = useState({
    sid: '', group: '', state: 'started', comment: '',
  });
  const [groupForm, setGroupForm] = useState({
    name: '', nodes: '', restricted: false, nofailback: false, comment: '',
  });
  const [addBusy, setAddBusy] = useState(false);
  const [addErr, setAddErr] = useState<string | null>(null);

  // mirrors server _HA_SID_RE / _HA_GROUP_RE
  const SID_RE = /^(vm|ct):[0-9]{2,9}$/;
  const GROUP_RE = /^[A-Za-z][A-Za-z0-9_\-]{0,63}$/;
  const COMMENT_RE = /^[\x20-\x7e]{0,256}$/;
  // PVE accepts comma-separated node names with optional priorities, e.g.
  // "pve01:2,pve02:1". Same regex as server-side check.
  const NODES_RE = /^[A-Za-z0-9._\-:,]{1,512}$/;

  const submitAddResource = async () => {
    setAddErr(null);
    if (!SID_RE.test(addForm.sid)) { setAddErr('Bad sid (vm:<id> or ct:<id>)'); return; }
    if (addForm.group && !GROUP_RE.test(addForm.group)) { setAddErr('Bad group'); return; }
    if (!COMMENT_RE.test(addForm.comment)) { setAddErr('Bad comment'); return; }
    setAddBusy(true);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/ha/resources`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(addForm) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setAddMode('none');
      setAddForm({ sid: '', group: '', state: 'started', comment: '' });
      setReload((n) => n + 1);
    } catch (e: any) {
      setAddErr(`Add failed: ${e.message || e}`);
    } finally {
      setAddBusy(false);
    }
  };

  const submitAddGroup = async () => {
    setAddErr(null);
    if (!GROUP_RE.test(groupForm.name)) { setAddErr('Bad group name'); return; }
    if (!NODES_RE.test(groupForm.nodes) || !groupForm.nodes.trim()) {
      setAddErr('Bad nodes (e.g. "pve01,pve02" or "pve01:2,pve02:1")'); return;
    }
    if (!COMMENT_RE.test(groupForm.comment)) { setAddErr('Bad comment'); return; }
    setAddBusy(true);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/ha/groups`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            group: groupForm.name,
            nodes: groupForm.nodes,
            restricted: groupForm.restricted,
            nofailback: groupForm.nofailback,
            comment: groupForm.comment,
          }) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setAddMode('none');
      setGroupForm({ name: '', nodes: '', restricted: false, nofailback: false, comment: '' });
      setReload((n) => n + 1);
    } catch (e: any) {
      setAddErr(`Add failed: ${e.message || e}`);
    } finally {
      setAddBusy(false);
    }
  };

  const deleteGroup = async (name: string) => {
    const ok = await dialog.confirm(
      `Delete HA group ${name}? Resources currently assigned to this group will be unbound.`,
      { title: 'Delete HA group?', destructive: true }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/ha/groups/${encodeURIComponent(name)}`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`Delete failed: ${e.message || e}`);
    }
  };

  const deleteResource = async (sid: string) => {
    const ok = await dialog.confirm(
      `Remove HA management for ${sid}? Guest is NOT deleted; only HA tracking is removed.`,
      { title: 'Delete HA resource?', destructive: true }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/ha/resources/${encodeURIComponent(sid)}`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`Delete failed: ${e.message || e}`);
    }
  };

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const [r1, r2] = await Promise.all([
          fetch(`/api/clusters/${cid}/ha/status`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/ha/groups`, { credentials: 'same-origin' }),
        ]);
        if (!alive) return;
        if (r1.ok) {
          const d = await r1.json();
          setResources(d.resources || []);
          setMasters(d.masters || []);
          setLrms(d.lrms || []);
          setQuorum(d.quorum || null);
        } else {
          throw new Error(`status HTTP ${r1.status}`);
        }
        if (r2.ok) {
          const d = await r2.json();
          setGroups(d.groups || d || []);
        }
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  if (!open) return null;
  return (
    <div className="ha-back" onClick={onClose}>
      <div className="ha-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ha-head">
          <div className="ha-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>{t('ha.title')}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {isAdmin && addMode === 'none' && (
              <>
                <button className="ha-add-btn" onClick={() => { setAddMode('resource'); setAddErr(null); }}>+ Resource</button>
                <button className="ha-add-btn" onClick={() => { setAddMode('group'); setAddErr(null); }}>+ Group</button>
              </>
            )}
            <button className="ha-close" onClick={onClose}>×</button>
          </div>
        </div>
        {addMode === 'resource' && (
          <div className="ha-add">
            {addErr && <div className="ha-error">{addErr}</div>}
            <div className="ha-add-grid">
              <label>SID
                <input value={addForm.sid} placeholder="vm:101"
                       onChange={(e) => setAddForm((f) => ({ ...f, sid: e.target.value }))} />
              </label>
              <label>Group
                <input value={addForm.group} placeholder="(optional)"
                       onChange={(e) => setAddForm((f) => ({ ...f, group: e.target.value }))} />
              </label>
              <label>State
                <select value={addForm.state}
                        onChange={(e) => setAddForm((f) => ({ ...f, state: e.target.value }))}>
                  <option value="started">started</option>
                  <option value="stopped">stopped</option>
                  <option value="enabled">enabled</option>
                  <option value="disabled">disabled</option>
                  <option value="ignored">ignored</option>
                </select>
              </label>
              <label>Comment
                <input value={addForm.comment} maxLength={256}
                       onChange={(e) => setAddForm((f) => ({ ...f, comment: e.target.value }))} />
              </label>
            </div>
            <div className="ha-add-actions">
              <button onClick={() => { setAddMode('none'); setAddErr(null); }} disabled={addBusy}>Cancel</button>
              <button className="ha-primary" onClick={submitAddResource} disabled={addBusy}>{addBusy ? '…' : 'Add'}</button>
            </div>
          </div>
        )}
        {addMode === 'group' && (
          <div className="ha-add">
            {addErr && <div className="ha-error">{addErr}</div>}
            <div className="ha-add-grid">
              <label>Group name
                <input value={groupForm.name} placeholder="prod"
                       onChange={(e) => setGroupForm((f) => ({ ...f, name: e.target.value }))} />
              </label>
              <label>Nodes (comma-separated, optional :priority)
                <input value={groupForm.nodes} placeholder="pve01:2,pve02:1"
                       onChange={(e) => setGroupForm((f) => ({ ...f, nodes: e.target.value }))} />
              </label>
              <label>
                <input type="checkbox" checked={groupForm.restricted}
                       onChange={(e) => setGroupForm((f) => ({ ...f, restricted: e.target.checked }))} />
                <span>Restricted (only listed nodes)</span>
              </label>
              <label>
                <input type="checkbox" checked={groupForm.nofailback}
                       onChange={(e) => setGroupForm((f) => ({ ...f, nofailback: e.target.checked }))} />
                <span>No failback</span>
              </label>
              <label>Comment
                <input value={groupForm.comment} maxLength={256}
                       onChange={(e) => setGroupForm((f) => ({ ...f, comment: e.target.value }))} />
              </label>
            </div>
            <div className="ha-add-actions">
              <button onClick={() => { setAddMode('none'); setAddErr(null); }} disabled={addBusy}>Cancel</button>
              <button className="ha-primary" onClick={submitAddGroup} disabled={addBusy}>{addBusy ? '…' : 'Add'}</button>
            </div>
          </div>
        )}
        <div className="ha-strip">
          <div className="ha-pill">
            <span className="lbl">{t('ha.quorum')}</span>
            <span className={`val ${quorum?.quorate ? 'success' : 'danger'}`}>
              {quorum ? (quorum.quorate ? 'OK' : 'LOST') : '—'}
            </span>
          </div>
          <div className="ha-pill">
            <span className="lbl">{t('ha.master')}</span>
            <span className="val">{masters.length > 0 ? masters[0].node : '—'}</span>
          </div>
          <div className="ha-pill">
            <span className="lbl">{t('ha.lrm_count')}</span>
            <span className="val">{lrms.length}</span>
          </div>
          <div className="ha-pill">
            <span className="lbl">{t('ha.resource_count')}</span>
            <span className="val">{resources.length}</span>
          </div>
        </div>
        <div className="ha-body">
          {error && <div className="ha-error">{error}</div>}
          {loading && resources.length === 0 && <div className="ha-empty">{t('ha.loading')}</div>}

          {lrms.length > 0 && (
            <Section title={t('ha.section.lrms')}>
              <div className="ha-grid">
                {lrms.map((l, i) => (
                  <div key={i} className="ha-grid-cell">
                    <span className="lbl">{l.node}</span>
                    <span className={`val ${l.status === 'active' ? 'success' : (l.status === 'idle' ? 'muted' : 'warning')}`}>
                      {l.status || '—'}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {resources.length > 0 && (
            <Section title={t('ha.section.resources')}>
              <table className="ha-table">
                <thead>
                  <tr>
                    <th>{t('ha.col.sid')}</th>
                    <th>{t('ha.col.state')}</th>
                    <th>{t('ha.col.request_state')}</th>
                    <th>{t('ha.col.node')}</th>
                    <th>{t('ha.col.max_relocate')}</th>
                    <th>{t('ha.col.max_restart')}</th>
                    {isAdmin && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {resources.map((r) => (
                    <tr key={r.sid}>
                      <td className="ha-mono">{r.sid}</td>
                      <td><span className={`ha-state ha-state-${STATE_COLOR[(r.state || '').toLowerCase()] || 'muted'}`}>{r.state || '—'}</span></td>
                      <td className="ha-mono">{r.request_state || '—'}</td>
                      <td className="ha-mono">{r.node || '—'}</td>
                      <td className="ha-mono num">{r.max_relocate ?? '—'}</td>
                      <td className="ha-mono num">{r.max_restart ?? '—'}</td>
                      {isAdmin && (
                        <td>
                          <button className="ha-del-btn" onClick={() => deleteResource(r.sid || '')}>Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {groups.length > 0 && (
            <Section title={t('ha.section.groups')}>
              <table className="ha-table">
                <thead>
                  <tr>
                    <th>{t('ha.col.group')}</th>
                    <th>{t('ha.col.nodes')}</th>
                    <th>{t('ha.col.restricted')}</th>
                    <th>{t('ha.col.nofailback')}</th>
                    <th>{t('ha.col.comment')}</th>
                    {isAdmin && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g) => (
                    <tr key={g.group}>
                      <td className="ha-mono">{g.group}</td>
                      <td className="ha-mono">{g.nodes || ''}</td>
                      <td className="ha-mono">{g.restricted ? 'yes' : 'no'}</td>
                      <td className="ha-mono">{g.nofailback ? 'yes' : 'no'}</td>
                      <td className="ha-mono">{g.comment || ''}</td>
                      {isAdmin && (
                        <td>
                          <button className="ha-del-btn" onClick={() => deleteGroup(g.group || '')}>Delete</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {!loading && resources.length === 0 && groups.length === 0 && !error && (
            <div className="ha-empty">{t('ha.no_ha')}</div>
          )}
        </div>
        <style>{`
          .ha-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .ha-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: ha-in .18s ease-out; overflow: hidden; }
          @keyframes ha-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ha-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.16); }
          .ha-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .ha-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .ha-close:hover { color: var(--primary); }
          .ha-strip { display: flex; gap: 14px; flex-wrap: wrap; padding: 12px 18px; border-bottom: 1px solid rgba(0,240,255,.08); background: rgba(0,240,255,.02); }
          .ha-pill { display: flex; flex-direction: column; gap: 2px; padding: 6px 14px; border-radius: 4px; background: rgba(0,240,255,.04); border: 1px solid rgba(0,240,255,.15); min-width: 110px; }
          .ha-pill .lbl { font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); }
          .ha-pill .val { font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); }
          .ha-pill .val.success { color: var(--success); }
          .ha-pill .val.danger { color: var(--danger, #ff4d6d); }
          .ha-pill .val.warning { color: var(--warning); }
          .ha-pill .val.muted { color: var(--text-muted); }
          .ha-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .ha-loading, .ha-empty { padding: 40px 12px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .ha-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; margin-bottom: 12px; }
          .ha-add-btn { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .ha-add-btn:hover { background: rgba(0,240,255,.2); }
          .ha-add { padding: 12px 18px; border-bottom: 1px solid rgba(0,240,255,.16); background: rgba(0,240,255,.03); }
          .ha-add-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px 12px; margin-bottom: 10px; }
          .ha-add label { display: flex; flex-direction: column; gap: 4px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .ha-add input, .ha-add select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13px; background: rgba(0,240,255,.04); color: var(--text-primary); border: 1px solid rgba(0,240,255,.2); border-radius: 3px; outline: none; }
          .ha-add-actions { display: flex; gap: 8px; justify-content: flex-end; }
          .ha-add-actions button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .ha-add-actions .ha-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .ha-del-btn { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .ha-del-btn:hover { background: rgba(255, 77, 109, 0.1); }

          .ha-section { margin-bottom: 18px; }
          .ha-section-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid rgba(0,240,255,.12); }
          .ha-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px; }
          .ha-grid-cell { display: flex; justify-content: space-between; padding: 6px 10px; background: rgba(0,240,255,.04); border: 1px solid rgba(0,240,255,.12); border-radius: 3px; font-family: var(--font-mono); font-size: 13px; }
          .ha-grid-cell .lbl { color: var(--text-secondary); }
          .ha-grid-cell .val { color: var(--text-primary); }
          .ha-grid-cell .val.success { color: var(--success); }
          .ha-grid-cell .val.muted { color: var(--text-muted); }
          .ha-grid-cell .val.warning { color: var(--warning); }

          .ha-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .ha-table th { padding: 5px 10px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.04); }
          .ha-table td { padding: 4px 10px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .ha-table td.num, .ha-table th.num { text-align: right; }
          .ha-table tbody tr:hover { background: rgba(0,240,255,.04); }
          .ha-mono { font-family: var(--font-mono); }
          .ha-state { display: inline-flex; align-items: center; gap: 6px; padding: 1px 8px; border-radius: 999px; font-size: 13.5px; border: 1px solid currentColor; }
          .ha-state::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 4px currentColor; }
          .ha-state-success { color: var(--success); }
          .ha-state-danger  { color: var(--danger, #ff4d6d); }
          .ha-state-warning { color: var(--warning); }
          .ha-state-muted   { color: var(--text-muted); }
        `}</style>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ha-section">
      <div className="ha-section-title">{title}</div>
      {children}
    </div>
  );
}
