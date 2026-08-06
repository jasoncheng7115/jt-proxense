/**
 * SDNAdminModal — admin CRUD for SDN zones, vnets, subnets, plus a
 * "Reload SDN" button that applies pending config (PVE keeps a pending /
 * running split until you reload).
 *
 * Backend: server/pdm_cluster.py SDN routes.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

type Tab = 'zones' | 'vnets';

const NAME_RE = /^[A-Za-z][A-Za-z0-9_\-]{0,15}$/;
const BRIDGE_RE = /^[A-Za-z0-9._\-]{1,32}$/;
const CIDR_RE = /^[0-9.]{7,18}\/[0-9]{1,2}$/;
const IP_RE = /^[0-9.]{7,18}$/;
const ZTYPES = ['simple', 'vlan', 'qinq', 'vxlan', 'evpn'] as const;

interface Zone { zone: string; type?: string; bridge?: string; tag?: number; mtu?: number; }
interface Vnet { vnet: string; zone: string; tag?: number; alias?: string; }
interface Subnet { subnet: string; vnet?: string; gateway?: string; snat?: number; }

export function SDNAdminModal({ open, onClose, clusterId }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [tab, setTab] = useState<Tab>('zones');
  const [reload, setReload] = useState(0);
  const bump = () => setReload((n) => n + 1);

  const [zones, setZones] = useState<Zone[]>([]);
  const [vnets, setVnets] = useState<Vnet[]>([]);
  const [selectedVnet, setSelectedVnet] = useState<string | null>(null);
  const [subnets, setSubnets] = useState<Subnet[]>([]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [zoneForm, setZoneForm] = useState({ zone: '', type: 'simple', bridge: '', tag: '', mtu: '' });
  const [vnetForm, setVnetForm] = useState({ vnet: '', zone: '', tag: '', alias: '' });
  const [subnetForm, setSubnetForm] = useState({ subnet: '', gateway: '', snat: false });

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const [r1, r2] = await Promise.all([
          fetch(`/api/clusters/${cid}/sdn/zones`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/sdn/vnets`, { credentials: 'same-origin' }),
        ]);
        if (!alive) return;
        if (r1.ok) {
          const d = await r1.json();
          setZones(d.zones || d || []);
        }
        if (r2.ok) {
          const d = await r2.json();
          setVnets(d.vnets || d || []);
        }
      } catch (e: any) {
        if (alive) setErr(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  useEffect(() => {
    if (!open || !selectedVnet) { setSubnets([]); return; }
    let alive = true;
    (async () => {
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/sdn/vnets/${encodeURIComponent(selectedVnet)}/subnets`,
          { credentials: 'same-origin' }
        );
        if (alive && r.ok) {
          const d = await r.json();
          setSubnets(d.subnets || []);
        }
      } catch { /* ignore */ }
    })();
    return () => { alive = false; };
  }, [open, clusterId, selectedVnet, reload]);

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

  const reloadSdn = () => handle(async () => {
    await apiCall('POST', '/sdn/reload');
    await dialog.alert('SDN reload submitted. Check tasks for status.');
  });

  return (
    <div className="sd-back" onClick={onClose}>
      <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sd-head">
          <div className="sd-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>{t('sdn.title')}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="sd-reload" onClick={reloadSdn}>{t('sdn.reload')}</button>
            <button className="sd-close" onClick={onClose}>×</button>
          </div>
        </div>
        <div className="sd-tabs">
          {(['zones', 'vnets'] as const).map((k) => (
            <button key={k} className={`sd-tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>
              {t(`sdn.tab.${k}`)}
            </button>
          ))}
        </div>
        <div className="sd-body">
          {err && <div className="sd-error">{err}</div>}
          {loading && <div className="sd-empty">{t('sdn.loading')}</div>}

          {tab === 'zones' && (
            <>
              <div className="sd-add">
                <input placeholder="zone (e.g. zone1)" value={zoneForm.zone}
                       onChange={(e) => setZoneForm({ ...zoneForm, zone: e.target.value })} />
                <select value={zoneForm.type} onChange={(e) => setZoneForm({ ...zoneForm, type: e.target.value })}>
                  {ZTYPES.map((z) => <option key={z} value={z}>{z}</option>)}
                </select>
                <input placeholder="bridge (vlan/qinq)" value={zoneForm.bridge}
                       onChange={(e) => setZoneForm({ ...zoneForm, bridge: e.target.value })} />
                <input placeholder="tag (qinq)" type="number" min={1} max={4094}
                       value={zoneForm.tag} onChange={(e) => setZoneForm({ ...zoneForm, tag: e.target.value })} />
                <input placeholder="mtu" type="number" value={zoneForm.mtu}
                       onChange={(e) => setZoneForm({ ...zoneForm, mtu: e.target.value })} />
                <button className="sd-primary"
                        disabled={!NAME_RE.test(zoneForm.zone) || (zoneForm.bridge !== '' && !BRIDGE_RE.test(zoneForm.bridge))}
                        onClick={() => handle(async () => {
                          const body: any = { zone: zoneForm.zone, type: zoneForm.type };
                          if (zoneForm.bridge) body.bridge = zoneForm.bridge;
                          if (zoneForm.tag) body.tag = +zoneForm.tag;
                          if (zoneForm.mtu) body.mtu = +zoneForm.mtu;
                          await apiCall('POST', '/sdn/zones', body);
                          setZoneForm({ zone: '', type: 'simple', bridge: '', tag: '', mtu: '' });
                        })}>+ Create</button>
              </div>
              <table className="sd-table">
                <thead><tr><th>zone</th><th>type</th><th>bridge</th><th>tag</th><th>mtu</th><th></th></tr></thead>
                <tbody>
                  {zones.map((z) => (
                    <tr key={z.zone}>
                      <td className="sd-mono">{z.zone}</td>
                      <td className="sd-mono">{z.type || '—'}</td>
                      <td className="sd-mono">{z.bridge || '—'}</td>
                      <td className="sd-mono">{z.tag ?? '—'}</td>
                      <td className="sd-mono">{z.mtu ?? '—'}</td>
                      <td>
                        <button className="sd-del" onClick={async () => {
                          const ok = await dialog.confirm(`Delete zone "${z.zone}"?`,
                            { title: 'Delete SDN zone?', destructive: true });
                          if (ok) handle(() => apiCall('DELETE', `/sdn/zones/${encodeURIComponent(z.zone)}`));
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tab === 'vnets' && (
            <>
              <div className="sd-add">
                <input placeholder="vnet" value={vnetForm.vnet}
                       onChange={(e) => setVnetForm({ ...vnetForm, vnet: e.target.value })} />
                <select value={vnetForm.zone} onChange={(e) => setVnetForm({ ...vnetForm, zone: e.target.value })}>
                  <option value="">— pick zone —</option>
                  {zones.map((z) => <option key={z.zone} value={z.zone}>{z.zone}</option>)}
                </select>
                <input placeholder="vlan tag (optional)" type="number" min={1} max={4094}
                       value={vnetForm.tag} onChange={(e) => setVnetForm({ ...vnetForm, tag: e.target.value })} />
                <input placeholder="alias (optional)" value={vnetForm.alias}
                       onChange={(e) => setVnetForm({ ...vnetForm, alias: e.target.value })} />
                <button className="sd-primary"
                        disabled={!NAME_RE.test(vnetForm.vnet) || !NAME_RE.test(vnetForm.zone)}
                        onClick={() => handle(async () => {
                          const body: any = { vnet: vnetForm.vnet, zone: vnetForm.zone };
                          if (vnetForm.tag) body.tag = +vnetForm.tag;
                          if (vnetForm.alias) body.alias = vnetForm.alias;
                          await apiCall('POST', '/sdn/vnets', body);
                          setVnetForm({ vnet: '', zone: '', tag: '', alias: '' });
                        })}>+ Create</button>
              </div>
              <table className="sd-table">
                <thead><tr><th>vnet</th><th>zone</th><th>tag</th><th>alias</th><th></th></tr></thead>
                <tbody>
                  {vnets.map((v) => (
                    <tr key={v.vnet} className={selectedVnet === v.vnet ? 'sd-selected' : ''}>
                      <td className="sd-mono"><button className="sd-link" onClick={() => setSelectedVnet(selectedVnet === v.vnet ? null : v.vnet)}>{v.vnet}</button></td>
                      <td className="sd-mono">{v.zone}</td>
                      <td className="sd-mono">{v.tag ?? '—'}</td>
                      <td className="sd-mono">{v.alias || '—'}</td>
                      <td>
                        <button className="sd-del" onClick={async () => {
                          const ok = await dialog.confirm(`Delete vnet "${v.vnet}"?`,
                            { title: 'Delete vnet?', destructive: true });
                          if (ok) handle(() => apiCall('DELETE', `/sdn/vnets/${encodeURIComponent(v.vnet)}`));
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedVnet && (
                <div className="sd-sub">
                  <div className="sd-sub-title">Subnets in <code>{selectedVnet}</code></div>
                  <div className="sd-add">
                    <input placeholder="10.0.0.0/24" value={subnetForm.subnet}
                           onChange={(e) => setSubnetForm({ ...subnetForm, subnet: e.target.value })} />
                    <input placeholder="gateway (optional)" value={subnetForm.gateway}
                           onChange={(e) => setSubnetForm({ ...subnetForm, gateway: e.target.value })} />
                    <label className="sd-check"><input type="checkbox" checked={subnetForm.snat}
                           onChange={(e) => setSubnetForm({ ...subnetForm, snat: e.target.checked })} />SNAT</label>
                    <button className="sd-primary"
                            disabled={!CIDR_RE.test(subnetForm.subnet) ||
                                      (subnetForm.gateway !== '' && !IP_RE.test(subnetForm.gateway))}
                            onClick={() => handle(async () => {
                              await apiCall('POST', `/sdn/vnets/${encodeURIComponent(selectedVnet)}/subnets`, subnetForm);
                              setSubnetForm({ subnet: '', gateway: '', snat: false });
                            })}>+ Add</button>
                  </div>
                  <table className="sd-table">
                    <thead><tr><th>subnet</th><th>gateway</th><th>snat</th><th></th></tr></thead>
                    <tbody>
                      {subnets.map((s) => (
                        <tr key={s.subnet}>
                          <td className="sd-mono">{s.subnet}</td>
                          <td className="sd-mono">{s.gateway || '—'}</td>
                          <td className="sd-mono">{s.snat ? 'yes' : '—'}</td>
                          <td>
                            <button className="sd-del" onClick={() => handle(() =>
                              apiCall('DELETE', `/sdn/vnets/${encodeURIComponent(selectedVnet)}/subnets/${encodeURIComponent(s.subnet)}`))}>
                              Delete
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
        </div>
        <div className="sd-footer">{t('sdn.footer_help')}</div>
        <style>{`
          .sd-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .sd-modal { width: min(960px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: sd-in .18s ease-out; overflow: hidden; }
          @keyframes sd-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .sd-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .sd-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .sd-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .sd-reload { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .sd-reload:hover { background: rgba(0,240,255,.2); }
          .sd-tabs { display: flex; padding: 0 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); }
          .sd-tab { padding: 10px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: none; border-bottom: 2px solid transparent; cursor: pointer; }
          .sd-tab:hover { color: var(--primary); }
          .sd-tab.active { color: var(--primary); border-bottom-color: var(--primary); }
          .sd-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .sd-empty { padding: 20px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .sd-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .sd-footer { padding: 8px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .sd-add { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .sd-add input, .sd-add select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; min-width: 120px; }
          .sd-add input:focus, .sd-add select:focus { border-color: var(--primary); }
          .sd-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .sd-primary { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .sd-primary:disabled { opacity: .4; cursor: not-allowed; }
          .sd-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .sd-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .sd-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .sd-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .sd-table tbody tr.sd-selected { background: rgba(0, 240, 255, 0.08); box-shadow: inset 3px 0 0 var(--primary); }
          .sd-link { background: transparent; border: none; color: var(--primary); font-family: var(--font-mono); font-size: 13px; cursor: pointer; text-decoration: underline; padding: 0; }
          .sd-mono { font-family: var(--font-mono); }
          .sd-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .sd-del:hover { background: rgba(255, 77, 109, 0.1); }
          .sd-sub { margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(0, 240, 255, 0.16); }
          .sd-sub-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; }
        `}</style>
      </div>
    </div>
  );
}
