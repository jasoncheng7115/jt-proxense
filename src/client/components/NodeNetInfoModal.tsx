/**
 * NodeNetInfoModal — per-node NIC / bridge / bond status (the data from
 * jt_nicmon.sh), rendered in the house style. Read-only; gathered over
 * SSH from sysfs + ethtool by server/node_netinfo.py.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';

interface Phy { iface: string; state: string; link: string; speed: string; duplex: string; mac: string; }
interface Net { iface: string; type: string; ipv4: string; members: string[]; }

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
}

export function NodeNetInfoModal({ open, onClose, clusterId, node }: Props) {
  const { t } = useTranslation();
  const [phys, setPhys] = useState<Phy[]>([]);
  const [nets, setNets] = useState<Net[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [auto, setAuto] = useState(false);
  const timer = useRef<number | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setErr(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/netinfo`,
        { credentials: 'same-origin' });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setPhys(d.phys || []);
      setNets(d.nets || []);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      if (!silent) setLoading(false);
    }
  }, [clusterId, node]);

  useEffect(() => { if (open) load(); }, [open, load]);

  useEffect(() => {
    if (timer.current) { window.clearInterval(timer.current); timer.current = null; }
    if (open && auto) timer.current = window.setInterval(() => load(true), 5000);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [open, auto, load]);

  if (!open) return null;

  const stateCls = (s: string) => s === 'up' ? 'nic-up' : s === 'down' ? 'nic-down' : 'nic-na';
  const linkCls = (l: string) => l === 'yes' ? 'nic-up' : l === 'no' ? 'nic-down' : 'nic-na';

  return (
    <div className="nic-back" onClick={onClose}>
      <div className="nic-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nic-head">
          <span>{t('nic.title')} · {node}</span>
          <div className="nic-head-actions">
            <label className="nic-auto">
              <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
              <span>{t('nic.auto')}</span>
            </label>
            <button className="nic-btn" onClick={() => load()}>{t('nic.refresh')}</button>
            <button className="nic-close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="nic-body">
          {err && <div className="nic-error">{err}</div>}
          {loading && phys.length === 0 && nets.length === 0 && (
            <div className="nic-loading">{t('nic.loading')}</div>
          )}

          {(phys.length > 0 || nets.length > 0) && (
            <>
              <div className="nic-sec-h">{t('nic.phys')}</div>
              <table className="vm-table nic-table">
                <thead><tr>
                  <th>{t('nic.iface')}</th><th>{t('nic.state')}</th><th>{t('nic.link')}</th>
                  <th>{t('nic.speed')}</th><th>{t('nic.duplex')}</th><th>{t('nic.mac')}</th>
                </tr></thead>
                <tbody>
                  {phys.map((p) => (
                    <tr key={p.iface}>
                      <td className="nic-name">{p.iface}</td>
                      <td><span className={stateCls(p.state)}>{p.state}</span></td>
                      <td><span className={linkCls(p.link)}>{p.link}</span></td>
                      <td>{p.speed}</td>
                      <td>{p.duplex}</td>
                      <td className="nic-mac">{p.mac}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="nic-sec-h">{t('nic.nets')}</div>
              <table className="vm-table nic-table">
                <thead><tr>
                  <th>{t('nic.iface')}</th><th>{t('nic.type')}</th>
                  <th>{t('nic.ipv4')}</th><th>{t('nic.members')}</th>
                </tr></thead>
                <tbody>
                  {nets.map((n) => (
                    <tr key={n.iface}>
                      <td className="nic-name">{n.iface}</td>
                      <td><span className="nic-type">{n.type}</span></td>
                      <td className="nic-ip">{n.ipv4}</td>
                      <td className="nic-members">
                        {n.members.length === 0 ? '—' : n.members.map((m) => (
                          <span key={m} className="nic-member">{m}</span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {!loading && !err && phys.length === 0 && nets.length === 0 && (
            <div className="nic-loading">{t('nic.empty')}</div>
          )}
        </div>
        <style>{`
          .nic-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .nic-modal { width: min(820px, 96vw); max-height: 88vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary-dim); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,.2); overflow: hidden; animation: nic-in .18s ease-out; }
          @keyframes nic-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .nic-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.25); color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .1em; text-transform: uppercase; }
          .nic-head-actions { display: flex; align-items: center; gap: 12px; }
          .nic-auto { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); text-transform: none; letter-spacing: 0; cursor: pointer; }
          .nic-auto input { accent-color: var(--primary); }
          .nic-btn { padding: 6px 14px; border-radius: 4px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
          .nic-btn:hover { background: rgba(0,240,255,.16); }
          .nic-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .nic-body { flex: 1; overflow: auto; padding: 14px 18px; display: flex; flex-direction: column; gap: 8px; }
          .nic-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .nic-loading { padding: 20px 0; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .nic-sec-h { font-family: var(--font-display); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--primary); border-bottom: 1px solid rgba(0,240,255,.16); padding-bottom: 5px; margin-top: 8px; }
          .nic-table td { white-space: nowrap; }
          .nic-table tbody tr { cursor: default; }
          .nic-name { color: var(--primary); }
          .nic-mac, .nic-ip { color: var(--text-secondary); }
          .nic-up { color: var(--success); }
          .nic-down { color: var(--warning); }
          .nic-na { color: var(--text-muted); }
          .nic-type { display: inline-block; padding: 1px 8px; border-radius: 2px; font-size: 12.5px; font-family: var(--font-display); letter-spacing: .06em; border: 1px solid rgba(0,240,255,.4); color: var(--primary); }
          .nic-members { display: flex; flex-wrap: wrap; gap: 4px; white-space: normal; }
          .nic-member { display: inline-block; padding: 1px 8px; border-radius: 999px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border: 1px solid rgba(0,240,255,.2); background: rgba(0,240,255,.04); }
        `}</style>
      </div>
    </div>
  );
}
