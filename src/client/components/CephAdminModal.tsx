/**
 * CephAdminModal — admin actions for a Ceph cluster.
 *
 * Two sections:
 *   - Cluster flags (noout / nobackfill / etc.) — toggle each
 *   - OSDs — mark in/out, reweight (0..1)
 *
 * Backend: server/ceph_admin.py.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  /** Any node from the cluster — Ceph endpoints are per-node addressable
   *  but operate cluster-wide. */
  cephNode?: string;
}

interface Osd {
  id: number;
  in?: number;
  up?: number;
  weight?: number;
  reweight?: number;
  host?: string;
  device_class?: string;
  status?: string;
}

/** Mirrors server/models.py CephPool as serialised by asdict().
 *
 * This used to be written against PVE's own shape (`pool_name`, `pool`), but
 * the backend maps PVE into CephPool before sending, so every one of those
 * fields was undefined at runtime: the name column rendered "(pool
 * undefined)", all rows shared the React key `undefined`, and the destroy
 * confirmation asked the operator to approve destroying pool "undefined". */
interface Pool {
  name?: string;
  pool_id?: number;
  size?: number;
  min_size?: number;
  pg_num?: number;
  pool_type?: string;
  application?: string;
  crush_rule?: string;
}

interface CephDaemon {
  name?: string;
  host?: string;
  state?: string;
  addr?: string;
  rank?: number;
  standby?: number;
}

const ALLOWED_FLAGS = [
  'noout', 'nobackfill', 'norebalance', 'norecover',
  'noscrub', 'nodeep-scrub', 'pause', 'noup', 'nodown',
];

export function CephAdminModal({ open, onClose, clusterId, cephNode }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [osds, setOsds] = useState<Osd[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [reweightOpen, setReweightOpen] = useState<number | null>(null);
  const [reweightVal, setReweightVal] = useState('1.00');
  const [pools, setPools] = useState<Pool[]>([]);
  const [mons, setMons] = useState<CephDaemon[]>([]);
  const [mgrs, setMgrs] = useState<CephDaemon[]>([]);
  const [mdss, setMdss] = useState<CephDaemon[]>([]);
  const [poolForm, setPoolForm] = useState({
    name: '', pg_num: '128', size: '3', min_size: '2', application: 'rbd', add_storages: false,
  });
  const POOL_NAME_RE = /^[A-Za-z][A-Za-z0-9._\-]{0,63}$/;

  useEffect(() => {
    if (!open || !cephNode) return;
    let alive = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const node = encodeURIComponent(cephNode);
        // OSDs come from the cluster cache further down -- there is no
        // GET .../ceph/osd route at all (only the in/out/reweight mutations).
        // A second fetch used to sit here whose path repeated
        // `/clusters/{cid}/`, so it 404'd on every open and its result was
        // never read; the .catch(() => null) meant nobody ever noticed.
        void node;
        const [r1] = await Promise.all([
          fetch(`/api/clusters/${cid}/ceph/flags`, { credentials: 'same-origin' }),
        ]);
        // Flags
        if (alive && r1.ok) {
          const d = await r1.json();
          // PVE returns flags in various shapes depending on PVE version.
          // Try a few normalisations.
          const out: Record<string, boolean> = {};
          for (const f of ALLOWED_FLAGS) out[f] = false;
          const raw = d.flags;
          if (Array.isArray(raw)) {
            for (const it of raw) {
              const name = (it && (it.name || it)) as string | undefined;
              const val = (it && (it.value !== undefined ? it.value : 1));
              if (name && ALLOWED_FLAGS.includes(name)) {
                out[name] = !!val;
              }
            }
          } else if (raw && typeof raw === 'object') {
            for (const k of Object.keys(raw)) {
              if (ALLOWED_FLAGS.includes(k)) out[k] = !!(raw as any)[k];
            }
          }
          setFlags(out);
        }
        // OSDs — we hit the cluster snapshot which has them. Fall back to
        // fetching ceph.osds via the cluster cache. The frontend already
        // surfaces these via /api/clusters/{cid} payload.
        try {
          const r3 = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}`,
            { credentials: 'same-origin' });
          if (alive && r3.ok) {
            const cd = await r3.json();
            const ceph = (cd.ceph) || {};
            const list = (ceph.osds || []) as Osd[];
            setOsds(list);
            setPools((ceph.pools || []) as Pool[]);
            setMons((ceph.monitors || ceph.mons || []) as CephDaemon[]);
            setMgrs((ceph.managers || ceph.mgrs || []) as CephDaemon[]);
            setMdss((ceph.mdss || []) as CephDaemon[]);
          }
        } catch { /* ignore */ }
      } catch (e: any) {
        if (alive) setErr(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, clusterId, cephNode, reload]);

  const toggleFlag = async (flag: string, value: boolean) => {
    setErr(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/ceph/flags/${encodeURIComponent(flag)}`,
        { method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value }) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setFlags((f) => ({ ...f, [flag]: value }));
      setReload((n) => n + 1);
    } catch (e: any) { setErr(`${flag}: ${e.message || e}`); }
  };

  const osdAction = async (osdid: number, action: 'in' | 'out') => {
    if (!cephNode) return;
    const ok = await dialog.confirm(
      action === 'out'
        ? `Mark osd.${osdid} OUT? Data will be re-balanced off this OSD.`
        : `Mark osd.${osdid} IN?`,
      { title: `osd ${action}`, destructive: action === 'out' }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(cephNode)}/ceph/osd/${osdid}/${action}`,
        { method: 'POST', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`Action failed: ${e.message || e}`);
    }
  };

  const submitReweight = async () => {
    if (reweightOpen === null || !cephNode) return;
    const w = parseFloat(reweightVal);
    if (!Number.isFinite(w) || w < 0 || w > 1) {
      await dialog.alert('Weight must be between 0.0 and 1.0');
      return;
    }
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(cephNode)}/ceph/osd/${reweightOpen}/reweight`,
        { method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ weight: w }) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReweightOpen(null);
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`Reweight failed: ${e.message || e}`);
    }
  };

  const sortedOsds = useMemo(() => {
    return [...osds].sort((a, b) => (a.id || 0) - (b.id || 0));
  }, [osds]);

  if (!open) return null;
  return (
    <div className="ca-back" onClick={onClose}>
      <div className="ca-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ca-head">
          <div className="ca-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>{t('ca.title')}</span>
          </div>
          <button className="ca-close" onClick={onClose}>×</button>
        </div>
        <div className="ca-body">
          {err && <div className="ca-error">{err}</div>}
          {loading && <div className="ca-empty">{t('ca.loading')}</div>}
          {!cephNode && <div className="ca-empty">{t('ca.no_ceph')}</div>}

          {cephNode && (
            <>
              <div className="ca-section">
                <div className="ca-section-title">{t('ca.section.flags')}</div>
                <div className="ca-flags">
                  {ALLOWED_FLAGS.map((f) => (
                    <label key={f} className={`ca-flag ${flags[f] ? 'on' : ''}`}>
                      <input type="checkbox" checked={!!flags[f]}
                             onChange={(e) => toggleFlag(f, e.target.checked)} />
                      <span>{f}</span>
                    </label>
                  ))}
                </div>
                <div className="ca-help">{t('ca.flags_help')}</div>
              </div>

              <div className="ca-section">
                <div className="ca-section-title">{t('ca.section.osds')}</div>
                {sortedOsds.length === 0 ? (
                  <div className="ca-empty">{t('ca.no_osds')}</div>
                ) : (
                  <table className="ca-table">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>host</th>
                        <th>class</th>
                        <th>weight</th>
                        <th>reweight</th>
                        <th>up/in</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedOsds.map((o) => (
                        <tr key={o.id}>
                          <td className="ca-mono">osd.{o.id}</td>
                          <td className="ca-mono">{o.host || '—'}</td>
                          <td className="ca-mono">{o.device_class || '—'}</td>
                          <td className="ca-mono">{o.weight?.toFixed(3) ?? '—'}</td>
                          <td className="ca-mono">{o.reweight?.toFixed(2) ?? '—'}</td>
                          <td>
                            <span className={`ca-pill ${o.up ? 'ok' : 'bad'}`}>{o.up ? 'up' : 'down'}</span>
                            <span className={`ca-pill ${o.in ? 'ok' : 'bad'}`} style={{ marginLeft: 4 }}>{o.in ? 'in' : 'out'}</span>
                          </td>
                          <td>
                            <button className="ca-btn" onClick={() => { setReweightOpen(o.id); setReweightVal((o.reweight ?? 1).toFixed(2)); }}>
                              reweight
                            </button>
                            {o.in
                              ? <button className="ca-btn ca-bad" onClick={() => osdAction(o.id, 'out')}>out</button>
                              : <button className="ca-btn ca-ok" onClick={() => osdAction(o.id, 'in')}>in</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {cephNode && (
            <div className="ca-section">
              <div className="ca-section-title">{t('ca.section.pools')}</div>
              <div className="ca-pool-add">
                <input placeholder="pool name" value={poolForm.name}
                       onChange={(e) => setPoolForm({ ...poolForm, name: e.target.value })} />
                <input placeholder="pg_num" type="number" value={poolForm.pg_num} style={{ width: 90 }}
                       onChange={(e) => setPoolForm({ ...poolForm, pg_num: e.target.value })} />
                <input placeholder="size" type="number" value={poolForm.size} style={{ width: 60 }}
                       onChange={(e) => setPoolForm({ ...poolForm, size: e.target.value })} />
                <input placeholder="min_size" type="number" value={poolForm.min_size} style={{ width: 80 }}
                       onChange={(e) => setPoolForm({ ...poolForm, min_size: e.target.value })} />
                <select value={poolForm.application}
                        onChange={(e) => setPoolForm({ ...poolForm, application: e.target.value })}>
                  <option value="rbd">rbd</option>
                  <option value="cephfs">cephfs</option>
                  <option value="rgw">rgw</option>
                </select>
                <label className="ca-check"><input type="checkbox"
                  checked={poolForm.add_storages}
                  onChange={(e) => setPoolForm({ ...poolForm, add_storages: e.target.checked })} />add PVE storage</label>
                <button className="ca-primary"
                        disabled={!POOL_NAME_RE.test(poolForm.name)}
                        onClick={async () => {
                          try {
                            const body: any = {
                              name: poolForm.name,
                              pg_num: +poolForm.pg_num, size: +poolForm.size,
                              min_size: +poolForm.min_size,
                              application: poolForm.application,
                              add_storages: poolForm.add_storages,
                            };
                            const r = await fetch(
                              `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(cephNode)}/ceph/pool`,
                              { method: 'POST', credentials: 'same-origin',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(body) }
                            );
                            const d = await r.json().catch(() => ({}));
                            if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                            setPoolForm({ ...poolForm, name: '' });
                            setReload((n) => n + 1);
                          } catch (e: any) {
                            await dialog.alert(`Create pool failed: ${e.message || e}`);
                          }
                        }}>+ Create pool</button>
              </div>
              {pools.length === 0 ? (
                <div className="ca-empty">{t('ca.no_pools')}</div>
              ) : (
                <table className="ca-table">
                  <thead><tr><th>name</th><th>size/min</th><th>pg_num</th><th>app</th><th></th></tr></thead>
                  <tbody>
                    {pools.map((p) => (
                      <tr key={p.name || p.pool_id}>
                        <td className="ca-mono">{p.name || `(pool ${p.pool_id ?? '?'})`}</td>
                        <td className="ca-mono">{p.size ?? '—'}/{p.min_size || '—'}</td>
                        <td className="ca-mono">{p.pg_num ?? '—'}</td>
                        <td className="ca-mono">{p.application || '—'}</td>
                        <td>
                          <button className="ca-btn ca-bad" onClick={async () => {
                            const ok = await dialog.confirm(
                              `Destroy Ceph pool "${p.name}"?\n\nALL DATA in this pool is irrecoverably lost.`,
                              { title: 'Destroy Ceph pool?', destructive: true }
                            );
                            if (!ok) return;
                            try {
                              const r = await fetch(
                                `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(cephNode)}/ceph/pool/${encodeURIComponent(p.name || '')}?remove_storages=1`,
                                { method: 'DELETE', credentials: 'same-origin' }
                              );
                              const d = await r.json().catch(() => ({}));
                              if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                              setReload((n) => n + 1);
                            } catch (e: any) {
                              await dialog.alert(`Destroy failed: ${e.message || e}`);
                            }
                          }}>Destroy</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {cephNode && (
            <div className="ca-section">
              <div className="ca-section-title">{t('ca.section.daemons')}</div>
              <div className="ca-help">{t('ca.daemons_help').replace('{node}', cephNode)}</div>
              <div className="ca-daemon-actions">
                <button className="ca-btn" onClick={async () => {
                  try {
                    const r = await fetch(
                      `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(cephNode)}/ceph/mon`,
                      { method: 'POST', credentials: 'same-origin' }
                    );
                    const d = await r.json().catch(() => ({}));
                    if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                    setReload((n) => n + 1);
                  } catch (e: any) { await dialog.alert(`MON create failed: ${e.message || e}`); }
                }}>+ MON on {cephNode}</button>
                <button className="ca-btn" onClick={async () => {
                  try {
                    const r = await fetch(
                      `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(cephNode)}/ceph/mgr`,
                      { method: 'POST', credentials: 'same-origin' }
                    );
                    const d = await r.json().catch(() => ({}));
                    if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                    setReload((n) => n + 1);
                  } catch (e: any) { await dialog.alert(`MGR create failed: ${e.message || e}`); }
                }}>+ MGR on {cephNode}</button>
                <button className="ca-btn" onClick={async () => {
                  try {
                    const r = await fetch(
                      `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(cephNode)}/ceph/mds`,
                      { method: 'POST', credentials: 'same-origin' }
                    );
                    const d = await r.json().catch(() => ({}));
                    if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
                    setReload((n) => n + 1);
                  } catch (e: any) { await dialog.alert(`MDS create failed: ${e.message || e}`); }
                }}>+ MDS on {cephNode}</button>
              </div>
              {[
                { label: 'MONs', list: mons, kind: 'mon' as const },
                { label: 'MGRs', list: mgrs, kind: 'mgr' as const },
                { label: 'MDSs', list: mdss, kind: 'mds' as const },
              ].map((sec) => sec.list.length > 0 && (
                <div key={sec.kind} style={{ marginTop: 10 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>{sec.label}</div>
                  <table className="ca-table">
                    <thead><tr><th>name</th><th>host</th><th>state</th><th></th></tr></thead>
                    <tbody>
                      {sec.list.map((d) => (
                        <tr key={d.name}>
                          <td className="ca-mono">{d.name}</td>
                          <td className="ca-mono">{d.host || '—'}</td>
                          <td className="ca-mono">{d.state || (d.standby ? 'standby' : '—')}</td>
                          <td>
                            <button className="ca-btn ca-bad" onClick={async () => {
                              const ok = await dialog.confirm(`Destroy ceph ${sec.kind} "${d.name}"?`,
                                { title: `Destroy ${sec.kind}?`, destructive: true });
                              if (!ok) return;
                              const host = d.host || cephNode;
                              try {
                                const r = await fetch(
                                  `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(host)}/ceph/${sec.kind}/${encodeURIComponent(d.name || '')}`,
                                  { method: 'DELETE', credentials: 'same-origin' }
                                );
                                const dd = await r.json().catch(() => ({}));
                                if (!r.ok || !dd.ok) throw new Error(dd.detail || dd.error || `HTTP ${r.status}`);
                                setReload((n) => n + 1);
                              } catch (e: any) { await dialog.alert(`Destroy failed: ${e.message || e}`); }
                            }}>Destroy</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {reweightOpen !== null && (
            <div className="ca-overlay" onClick={() => setReweightOpen(null)}>
              <div className="ca-overlay-card" onClick={(e) => e.stopPropagation()}>
                <div className="ca-section-title">Reweight osd.{reweightOpen}</div>
                <div className="ca-help">Range 0.0 – 1.0. Setting 0 effectively drains the OSD without marking it out.</div>
                <input type="range" min={0} max={1} step={0.01}
                       value={reweightVal}
                       onChange={(e) => setReweightVal(e.target.value)}
                       style={{ width: '100%', accentColor: 'var(--primary)' }} />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                  <input type="number" min={0} max={1} step={0.01}
                         value={reweightVal}
                         onChange={(e) => setReweightVal(e.target.value)}
                         style={{ width: 100, padding: '4px 8px', fontFamily: 'var(--font-mono)', background: 'rgba(0,240,255,.05)', border: '1px solid rgba(0,240,255,.2)', borderRadius: 3, color: 'var(--text-primary)' }} />
                  <div style={{ flex: 1 }} />
                  <button onClick={() => setReweightOpen(null)}>Cancel</button>
                  <button className="ca-primary" onClick={submitReweight}>Apply</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <style>{`
          .ca-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .ca-modal { width: min(900px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: ca-in .18s ease-out; overflow: hidden; }
          @keyframes ca-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ca-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .ca-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .ca-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .ca-body { flex: 1; overflow: auto; padding: 14px 18px; position: relative; }
          .ca-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .ca-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .ca-help { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); padding: 4px 0; }
          .ca-section { margin-bottom: 18px; }
          .ca-section-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .ca-flags { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 6px; }
          .ca-flag { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); cursor: pointer; }
          .ca-flag.on { color: var(--warning); border-color: rgba(255, 200, 0, 0.5); background: rgba(255, 200, 0, 0.05); }
          .ca-flag input { accent-color: var(--warning); }
          .ca-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .ca-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .ca-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .ca-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .ca-mono { font-family: var(--font-mono); }
          .ca-pill { display: inline-block; padding: 1px 6px; font-size: 13.5px; border-radius: 999px; border: 1px solid currentColor; }
          .ca-pill.ok { color: var(--success); }
          .ca-pill.bad { color: var(--danger, #ff4d6d); }
          .ca-btn { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; margin-right: 4px; }
          .ca-btn:hover { background: rgba(0, 240, 255, 0.08); }
          .ca-btn.ca-bad { color: var(--danger, #ff4d6d); }
          .ca-btn.ca-ok  { color: var(--success); }
          .ca-overlay { position: absolute; inset: 0; background: rgba(2,4,10,.7); display: flex; align-items: center; justify-content: center; z-index: 5; }
          .ca-overlay-card { width: min(420px, 92%); background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; padding: 16px 18px; }
          .ca-overlay-card button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .ca-overlay-card .ca-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .ca-pool-add { display: flex; gap: 6px; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; flex-wrap: wrap; }
          .ca-pool-add input, .ca-pool-add select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .ca-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .ca-primary { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .ca-primary:disabled { opacity: .4; cursor: not-allowed; }
          .ca-daemon-actions { display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 0 8px; }
        `}</style>
      </div>
    </div>
  );
}
