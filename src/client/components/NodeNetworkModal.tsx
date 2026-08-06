/**
 * NodeNetworkModal — admin CRUD for one node's network interfaces.
 * Focused on Linux bridges; bonds / VLANs / OVS are listed but not
 * editable through this UI yet.
 *
 * Pending model: PVE writes changes to a "pending" state until you
 * Apply (writes /etc/network/interfaces + reloads). Revert drops them.
 *
 * Backend: server/network_admin.py.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
}

interface Iface {
  iface: string;
  type: string;
  active?: number;
  autostart?: number;
  bridge_ports?: string;
  bridge_vlan_aware?: number;
  address?: string;
  netmask?: string;
  gateway?: string;
  cidr?: string;
  exists?: number;
  comments?: string;
  pending?: number; // 1 if change is pending
}

const BRIDGE_RE = /^vmbr[0-9]{1,3}$/;

export function NodeNetworkModal({ open, onClose, clusterId, node }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [items, setItems] = useState<Iface[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    iface: '', bridge_ports: '', address: '', gateway: '',
    autostart: true, vlan_aware: false, mtu: '', comments: '',
  });

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/network`,
          { credentials: 'same-origin' }
        );
        if (alive && r.ok) setItems(((await r.json()).interfaces || []) as Iface[]);
        else if (alive) setErr(`HTTP ${r.status}`);
      } catch (e: any) {
        if (alive) setErr(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, node, reload]);

  if (!open) return null;

  const submitAdd = async () => {
    if (!BRIDGE_RE.test(form.iface)) {
      setErr('Bad bridge name (expected vmbr<N>)'); return;
    }
    try {
      const body: any = { iface: form.iface, type: 'bridge' };
      if (form.bridge_ports) body.bridge_ports = form.bridge_ports;
      if (form.address) body.address = form.address;
      if (form.gateway) body.gateway = form.gateway;
      body.autostart = form.autostart;
      body.vlan_aware = form.vlan_aware;
      if (form.mtu) body.mtu = +form.mtu;
      if (form.comments) body.comments = form.comments;
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/network`,
        { method: 'POST', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body) }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setShowAdd(false);
      setForm({ iface: '', bridge_ports: '', address: '', gateway: '', autostart: true, vlan_aware: false, mtu: '', comments: '' });
      setReload((n) => n + 1);
    } catch (e: any) { setErr(e.message || String(e)); }
  };

  const deleteIface = async (iface: string) => {
    const ok = await dialog.confirm(
      `Delete pending change to "${iface}"?\n\nThis stages a removal — you must click "Apply" for it to take effect.`,
      { title: 'Stage interface removal?', destructive: true }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/network/${encodeURIComponent(iface)}`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) { await dialog.alert(`Delete failed: ${e.message || e}`); }
  };

  const apply = async () => {
    const ok = await dialog.confirm(
      `Apply pending network changes on ${node}?\n\nThis writes /etc/network/interfaces and reloads networking. Existing VM/CT traffic should continue but the host may briefly drop a connection.`,
      { title: 'Apply network config?' }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/network`,
        { method: 'PUT', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      await dialog.alert(`Apply submitted. PVE task: ${d.upid || '(no upid)'}`);
      setReload((n) => n + 1);
    } catch (e: any) { await dialog.alert(`Apply failed: ${e.message || e}`); }
  };

  const revert = async () => {
    const ok = await dialog.confirm(`Discard all pending network changes on ${node}?`,
      { title: 'Revert pending?', destructive: true });
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/network`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReload((n) => n + 1);
    } catch (e: any) { await dialog.alert(`Revert failed: ${e.message || e}`); }
  };

  const hasPending = items.some((i) => (i as any).pending);

  return (
    <div className="nn-back" onClick={onClose}>
      <div className="nn-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nn-head">
          <div className="nn-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5v14"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
            <span>{t('nn.title')}</span>
            <span className="nn-target">{node}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {hasPending && <span className="nn-pending-pill">pending changes</span>}
            <button className="nn-btn" onClick={apply}>{t('nn.apply')}</button>
            <button className="nn-btn ghost" onClick={revert}>{t('nn.revert')}</button>
            {!showAdd && <button className="nn-btn primary" onClick={() => { setShowAdd(true); setErr(null); }}>+ Bridge</button>}
            <button className="nn-close" onClick={onClose}>×</button>
          </div>
        </div>
        {showAdd && (
          <div className="nn-add">
            <input placeholder="vmbr0" value={form.iface} onChange={(e) => setForm({ ...form, iface: e.target.value })} />
            <input placeholder="ports (e.g. eno1)" value={form.bridge_ports} onChange={(e) => setForm({ ...form, bridge_ports: e.target.value })} />
            <input placeholder="address (CIDR)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <input placeholder="gateway" value={form.gateway} onChange={(e) => setForm({ ...form, gateway: e.target.value })} />
            <input placeholder="mtu" type="number" style={{ width: 90 }} value={form.mtu} onChange={(e) => setForm({ ...form, mtu: e.target.value })} />
            <label className="nn-check"><input type="checkbox" checked={form.autostart}
                   onChange={(e) => setForm({ ...form, autostart: e.target.checked })} />autostart</label>
            <label className="nn-check"><input type="checkbox" checked={form.vlan_aware}
                   onChange={(e) => setForm({ ...form, vlan_aware: e.target.checked })} />vlan-aware</label>
            <button onClick={() => { setShowAdd(false); setErr(null); }}>Cancel</button>
            <button className="nn-primary" onClick={submitAdd}>Stage</button>
          </div>
        )}
        <div className="nn-body">
          {err && <div className="nn-error">{err}</div>}
          {loading && items.length === 0 && <div className="nn-empty">{t('nn.loading')}</div>}
          {!loading && items.length === 0 && <div className="nn-empty">{t('nn.empty')}</div>}
          {items.length > 0 && (
            <table className="nn-table">
              <thead>
                <tr>
                  <th>iface</th>
                  <th>type</th>
                  <th>address / cidr</th>
                  <th>gateway</th>
                  <th>ports / opts</th>
                  <th>flags</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.iface} className={it.pending ? 'nn-row-pending' : ''}>
                    <td className="nn-mono">{it.iface}</td>
                    <td className="nn-mono">{it.type}</td>
                    <td className="nn-mono">{it.cidr || it.address || '—'}</td>
                    <td className="nn-mono">{it.gateway || '—'}</td>
                    <td className="nn-mono nn-trunc" title={it.bridge_ports || ''}>{it.bridge_ports || '—'}</td>
                    <td className="nn-mono">
                      {it.active ? <span className="nn-pill ok">up</span> : <span className="nn-pill mute">down</span>}
                      {it.autostart ? <span className="nn-pill ok" style={{ marginLeft: 4 }}>auto</span> : null}
                      {it.bridge_vlan_aware ? <span className="nn-pill" style={{ marginLeft: 4 }}>vlan</span> : null}
                      {it.pending ? <span className="nn-pill warn" style={{ marginLeft: 4 }}>pending</span> : null}
                    </td>
                    <td>
                      <button className="nn-del" onClick={() => deleteIface(it.iface)}>Stage delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="nn-footer">{t('nn.footer_help')}</div>
        <style>{`
          .nn-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .nn-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); overflow: hidden; animation: nn-in .18s ease-out; }
          @keyframes nn-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .nn-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .nn-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .nn-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .nn-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .nn-btn { padding: 5px 12px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.06); color: var(--primary); border: 1px solid rgba(0,240,255,.4); border-radius: 3px; cursor: pointer; }
          .nn-btn:hover { background: rgba(0,240,255,.15); }
          .nn-btn.ghost { color: var(--text-secondary); border-color: rgba(255,255,255,.18); background: transparent; }
          .nn-btn.primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .nn-pending-pill { padding: 3px 10px; font-size: 12.5px; font-family: var(--font-mono); color: var(--warning); border: 1px solid currentColor; border-radius: 999px; }
          .nn-add { display: flex; gap: 6px; align-items: center; padding: 10px 18px; flex-wrap: wrap; border-bottom: 1px solid rgba(0,240,255,.16); background: rgba(0, 240, 255, 0.04); }
          .nn-add input, .nn-add select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .nn-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .nn-add button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .nn-add .nn-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .nn-body { flex: 1; overflow: auto; padding: 6px 0; }
          .nn-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13.5px; font-style: italic; }
          .nn-error { padding: 8px 12px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .nn-footer { padding: 8px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); }
          .nn-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .nn-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .nn-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .nn-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .nn-row-pending { background: rgba(255, 200, 0, 0.04); }
          .nn-mono { font-family: var(--font-mono); }
          .nn-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .nn-pill { display: inline-block; padding: 1px 6px; font-size: 11.5px; border-radius: 999px; border: 1px solid currentColor; }
          .nn-pill.ok { color: var(--success); }
          .nn-pill.mute { color: var(--text-muted); }
          .nn-pill.warn { color: var(--warning); }
          .nn-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 12.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .nn-del:hover { background: rgba(255, 77, 109, 0.1); }
        `}</style>
      </div>
    </div>
  );
}
