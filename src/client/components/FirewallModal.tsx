/**
 * FirewallModal — viewer + admin add/delete for firewall rules at:
 *   - cluster scope (`scope='cluster'`) → /firewall/rules
 *   - VM scope (`scope='vm'` + `vmid`)  → /vms/{vmid}/firewall/rules
 *
 * OWASP A03 — every input field has a client-side regex matching server's
 * pdm_cluster.py allow-list. Server is authoritative; the client check is
 * UX-only, giving operators instant feedback on typos.
 * OWASP A04 — delete uses useDialogs().confirm with `destructive: true`.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';

type Scope = 'cluster' | 'vm';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  scope: Scope;
  vmid?: number;
  title?: string;
}

interface Rule {
  pos?: number;
  type?: string;
  action?: string;
  proto?: string;
  source?: string;
  dest?: string;
  sport?: string;
  dport?: string;
  iface?: string;
  enable?: number;
  comment?: string;
  log?: string;
  macro?: string;
}

const ACTION_COLOR: Record<string, string> = {
  ACCEPT: 'success',
  REJECT: 'warning',
  DROP: 'danger',
};

// Mirrors pdm_cluster.py regexes
const ADDR_RE = /^[+A-Za-z0-9._:/\-]{0,128}$/;
const PORT_RE = /^[0-9,:\-]{0,64}$/;
const PROTO_RE = /^[a-zA-Z]{0,16}$/;
const COMMENT_RE = /^[\x20-\x7e]{0,256}$/;

export function FirewallModal({ open, onClose, clusterId, scope, vmid, title }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const isAdmin = auth.user?.role_global === 'admin';

  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  // Per-VM firewall master switch (+ default policies). Only meaningful
  // when scope='vm'; we still fetch on mount and surface a toggle.
  const [vmFwOptions, setVmFwOptions] = useState<{ enable?: number; policy_in?: string; policy_out?: string } | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [addBusy, setAddBusy] = useState(false);
  const [addErr, setAddErr] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: 'in', action: 'ACCEPT', proto: '', source: '', dest: '',
    dport: '', sport: '', iface: '', comment: '', enable: true,
  });

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const path = scope === 'cluster'
          ? `/api/clusters/${cid}/firewall/rules`
          : `/api/clusters/${cid}/vms/${vmid}/firewall/rules`;
        const r = await fetch(path, { credentials: 'same-origin' });
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (alive) setRules(data.rules || []);
        // For VM scope, also fetch master options.
        if (scope === 'vm') {
          try {
            const r2 = await fetch(
              `/api/clusters/${cid}/vms/${vmid}/firewall/options`,
              { credentials: 'same-origin' }
            );
            if (alive && r2.ok) {
              const d2 = await r2.json();
              setVmFwOptions(d2.options || null);
            }
          } catch { /* ignore */ }
        }
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, scope, vmid, reload]);

  const toggleVmFw = async () => {
    if (scope !== 'vm') return;
    const next = vmFwOptions?.enable ? 0 : 1;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/vms/${vmid}/firewall/options`,
        { method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enable: next }) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`Toggle failed: ${e.message || e}`);
    }
  };

  useEffect(() => {
    if (!open) {
      setShowAdd(false); setAddErr(null);
      setForm({ type: 'in', action: 'ACCEPT', proto: '', source: '', dest: '',
                dport: '', sport: '', iface: '', comment: '', enable: true });
    }
  }, [open]);

  const validateForm = (): string | null => {
    if (!ADDR_RE.test(form.source))    return 'bad source';
    if (!ADDR_RE.test(form.dest))      return 'bad dest';
    if (!PROTO_RE.test(form.proto))    return 'bad proto';
    if (!PORT_RE.test(form.dport))     return 'bad dport';
    if (!PORT_RE.test(form.sport))     return 'bad sport';
    if (!COMMENT_RE.test(form.comment)) return 'bad comment';
    return null;
  };

  const submitAdd = async () => {
    setAddErr(null);
    const v = validateForm();
    if (v) { setAddErr(v); return; }
    setAddBusy(true);
    try {
      const cid = encodeURIComponent(clusterId);
      const path = scope === 'cluster'
        ? `/api/clusters/${cid}/firewall/rules`
        : `/api/clusters/${cid}/vms/${vmid}/firewall/rules`;
      const r = await fetch(path, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      setShowAdd(false);
      setReload((n) => n + 1);
    } catch (e: any) {
      setAddErr(`${t('fw.add_err')}: ${e.message || e}`);
    } finally {
      setAddBusy(false);
    }
  };

  const deleteRule = async (pos: number) => {
    const ok = await dialog.confirm(
      t('fw.delete_confirm_body').replace('{pos}', String(pos)),
      { title: t('fw.delete_confirm_title'), destructive: true }
    );
    if (!ok) return;
    try {
      const cid = encodeURIComponent(clusterId);
      const path = scope === 'cluster'
        ? `/api/clusters/${cid}/firewall/rules/${pos}`
        : `/api/clusters/${cid}/vms/${vmid}/firewall/rules/${pos}`;
      const r = await fetch(path, { method: 'DELETE', credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('fw.delete_err')}: ${e.message || e}`);
    }
  };

  if (!open) return null;
  return (
    <div className="fw-back" onClick={onClose}>
      <div className="fw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fw-head">
          <div className="fw-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span>{scope === 'cluster' ? t('fw.title_cluster') : t('fw.title_vm')}</span>
            {title && <span className="fw-target">{title}</span>}
          </div>
          <div className="fw-head-actions">
            {scope === 'vm' && isAdmin && (
              <button className={`fw-master ${vmFwOptions?.enable ? 'on' : 'off'}`}
                      onClick={toggleVmFw}
                      title={vmFwOptions?.enable
                        ? 'VM firewall ON — rules are evaluated.'
                        : 'VM firewall OFF — rules below are inert until enabled.'}>
                {vmFwOptions?.enable
                  ? <>✓ {t('fw.master_on')}</>
                  : <>○ {t('fw.master_off')}</>}
              </button>
            )}
            {isAdmin && !showAdd && (
              <button className="fw-add-btn" onClick={() => { setShowAdd(true); setAddErr(null); }}>
                {t('fw.add_btn')}
              </button>
            )}
            <button className="fw-close" onClick={onClose}>×</button>
          </div>
        </div>

        {showAdd && (
          <div className="fw-add">
            {addErr && <div className="fw-error">{addErr}</div>}
            <div className="fw-add-grid">
              <label>{t('fw.col.dir')}<select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                <option value="in">in</option><option value="out">out</option><option value="forward">forward</option>
              </select></label>
              <label>{t('fw.col.action')}<select value={form.action} onChange={(e) => setForm((f) => ({ ...f, action: e.target.value }))}>
                <option>ACCEPT</option><option>REJECT</option><option>DROP</option>
              </select></label>
              <label>{t('fw.col.proto')}<input value={form.proto} placeholder="tcp" onChange={(e) => setForm((f) => ({ ...f, proto: e.target.value }))} /></label>
              <label>{t('fw.col.source')}<input value={form.source} placeholder="0.0.0.0/0" onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))} /></label>
              <label>{t('fw.col.dest')}<input value={form.dest} placeholder="" onChange={(e) => setForm((f) => ({ ...f, dest: e.target.value }))} /></label>
              <label>{t('fw.col.dport')}<input value={form.dport} placeholder="80,443" onChange={(e) => setForm((f) => ({ ...f, dport: e.target.value }))} /></label>
              <label>{t('fw.col.comment')}<input value={form.comment} maxLength={256} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))} /></label>
            </div>
            <div className="fw-add-actions">
              <button onClick={() => setShowAdd(false)} disabled={addBusy}>{t('fw.add_cancel')}</button>
              <button className="fw-primary" onClick={submitAdd} disabled={addBusy}>{addBusy ? '…' : t('fw.add_submit')}</button>
            </div>
          </div>
        )}

        <div className="fw-body">
          {error && <div className="fw-error">{error}</div>}
          {loading && rules.length === 0 && <div className="fw-empty">{t('fw.loading')}</div>}
          {!loading && rules.length === 0 && !error && (
            <div className="fw-empty">{t('fw.empty')}</div>
          )}
          {rules.length > 0 && (
            <table className="fw-table">
              <thead>
                <tr>
                  <th className="num">#</th>
                  <th>{t('fw.col.dir')}</th>
                  <th>{t('fw.col.action')}</th>
                  <th>{t('fw.col.proto')}</th>
                  <th>{t('fw.col.source')}</th>
                  <th>{t('fw.col.dest')}</th>
                  <th>{t('fw.col.dport')}</th>
                  <th>{t('fw.col.iface')}</th>
                  <th>{t('fw.col.on')}</th>
                  <th>{t('fw.col.comment')}</th>
                  {isAdmin && <th>{t('fw.col.actions')}</th>}
                </tr>
              </thead>
              <tbody>
                {rules.map((r, i) => {
                  const action = (r.action || '').toUpperCase();
                  const pos = r.pos ?? i;
                  return (
                    <tr key={i} className={r.enable === 0 ? 'fw-row-off' : ''}>
                      <td className="fw-mono num">{pos}</td>
                      <td className="fw-mono">{r.type || ''}</td>
                      <td><span className={`fw-act fw-act-${ACTION_COLOR[action] || 'muted'}`}>{action || r.macro || ''}</span></td>
                      <td className="fw-mono">{r.proto || '—'}</td>
                      <td className="fw-mono">{r.source || '—'}</td>
                      <td className="fw-mono">{r.dest || '—'}</td>
                      <td className="fw-mono">{r.dport || r.sport || '—'}</td>
                      <td className="fw-mono">{r.iface || '—'}</td>
                      <td className="fw-mono">
                        <span className={`fw-on ${r.enable === 0 ? 'off' : 'on'}`}>
                          {r.enable === 0 ? 'off' : 'on'}
                        </span>
                      </td>
                      <td className="fw-mono fw-comment" title={r.comment || ''}>{r.comment || ''}</td>
                      {isAdmin && (
                        <td>
                          <button className="fw-del-btn" onClick={() => deleteRule(pos)}>{t('fw.delete_btn')}</button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <style>{`
          .fw-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .fw-modal { width: min(1100px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: fw-in .18s ease-out; overflow: hidden; }
          @keyframes fw-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .fw-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.16); }
          .fw-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .fw-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13px; letter-spacing: .04em; text-transform: none; }
          .fw-head-actions { display: flex; align-items: center; gap: 8px; }
          .fw-add-btn { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .fw-master { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; border-radius: 999px; border: 1px solid currentColor; background: transparent; cursor: pointer; }
          .fw-master.on { color: var(--success); background: rgba(0, 255, 136, 0.06); }
          .fw-master.off { color: var(--text-muted); }
          .fw-master.on:hover { background: rgba(0, 255, 136, 0.15); }
          .fw-master.off:hover { color: var(--warning); border-color: var(--warning); background: rgba(255, 200, 0, 0.06); }
          .fw-add-btn:hover { background: rgba(0,240,255,.2); }
          .fw-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .fw-close:hover { color: var(--primary); }
          .fw-add { padding: 12px 18px; border-bottom: 1px solid rgba(0,240,255,.16); background: rgba(0,240,255,.03); }
          .fw-add-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px 12px; margin-bottom: 10px; }
          .fw-add label { display: flex; flex-direction: column; gap: 4px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .fw-add input, .fw-add select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13px; background: rgba(0,240,255,.04); color: var(--text-primary); border: 1px solid rgba(0,240,255,.2); border-radius: 3px; outline: none; }
          .fw-add input:focus, .fw-add select:focus { border-color: var(--primary); }
          .fw-add-actions { display: flex; gap: 8px; justify-content: flex-end; }
          .fw-add-actions button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .fw-add-actions .fw-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .fw-body { flex: 1; overflow: auto; padding: 6px 0; }
          .fw-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .fw-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }

          .fw-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .fw-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .fw-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .fw-table th.num, .fw-table td.num { text-align: right; }
          .fw-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .fw-row-off { opacity: .5; }
          .fw-mono { font-family: var(--font-mono); }
          .fw-act { display: inline-block; padding: 1px 8px; border-radius: 2px; font-size: 13.5px; font-family: var(--font-display); letter-spacing: .04em; border: 1px solid currentColor; }
          .fw-act-success { color: var(--success); }
          .fw-act-warning { color: var(--warning); }
          .fw-act-danger { color: var(--danger, #ff4d6d); }
          .fw-act-muted { color: var(--text-muted); }
          .fw-on { padding: 1px 8px; border-radius: 999px; font-size: 13.5px; border: 1px solid currentColor; }
          .fw-on.on { color: var(--success); }
          .fw-on.off { color: var(--text-muted); }
          .fw-comment { max-width: 280px; overflow: hidden; text-overflow: ellipsis; }
          .fw-del-btn { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .fw-del-btn:hover { background: rgba(255, 77, 109, 0.1); }
        `}</style>
      </div>
    </div>
  );
}
