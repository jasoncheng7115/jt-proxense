/**
 * NodeHardwareModal — read-only hardware inventory for one node:
 *   - System: kernel / pve / cpu model / sockets-cores / boot mode
 *   - Memory + swap totals
 *   - Block devices: size / model / serial / SMART health (clickable for full)
 *   - PCI devices, USB devices
 *
 * Backed by /api/clusters/{cid}/nodes/{node}/{hardware,disks}.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
}

interface CpuInfo { model?: string; sockets?: number; cores?: number; cpus?: number; mhz?: string; user_hz?: number; }
interface MemBlk { total?: number; used?: number; free?: number; }
interface NodeStatus {
  cpuinfo?: CpuInfo;
  memory?: MemBlk;
  swap?: MemBlk;
  rootfs?: MemBlk;
  kversion?: string;
  pveversion?: string;
  current_kernel?: { version?: string; release?: string };
  bootinfo?: { mode?: string; secureboot?: number };
  loadavg?: string[];
  uptime?: number;
}
interface Disk {
  devpath?: string;
  size?: number;
  model?: string;
  serial?: string;
  type?: string;       // 'ssd' / 'hdd' / 'nvme'
  rpm?: number;
  used?: string;       // 'mounted' / 'lvm' / 'unused' / etc.
  health?: string;     // 'PASSED' / 'FAILED' / '-'
  vendor?: string;
  wearout?: number;
  rotational?: number;
}
interface PciDev { id?: string; class?: string; vendor?: string; device?: string; subsystem_vendor?: string; subsystem_device?: string; }
interface UsbDev { bus?: number; portpath?: string; vendid?: string; prodid?: string; manufacturer?: string; product?: string; class?: string; speed?: string; }

const fmtBytes = (n?: number): string => {
  if (!n || n <= 0) return '—';
  const u = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  let i = 0; let v = n;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v < 10 ? 2 : 1)} ${u[i]}`;
};

const fmtUptime = (s?: number): string => {
  if (!s) return '—';
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`;
};

export function NodeHardwareModal({ open, onClose, clusterId, node }: Props) {
  const { t } = useTranslation();
  const [hw, setHw] = useState<{ status: NodeStatus; pci: PciDev[]; usb: UsbDev[] } | null>(null);
  const [disks, setDisks] = useState<Disk[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [smartFor, setSmartFor] = useState<string | null>(null);
  const [smartData, setSmartData] = useState<any>(null);
  const [smartLoading, setSmartLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const cid = encodeURIComponent(clusterId);
        const nd  = encodeURIComponent(node);
        const [r1, r2] = await Promise.all([
          fetch(`/api/clusters/${cid}/nodes/${nd}/hardware`, { credentials: 'same-origin' }),
          fetch(`/api/clusters/${cid}/nodes/${nd}/disks`, { credentials: 'same-origin' }),
        ]);
        if (!alive) return;
        if (r1.ok) setHw(await r1.json());
        if (r2.ok) {
          const d = await r2.json();
          setDisks(d.disks || []);
        }
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, node]);

  useEffect(() => {
    if (!open) { setSmartFor(null); setSmartData(null); }
  }, [open]);

  const showSmart = async (devpath: string) => {
    // basename only — server prepends /dev/
    const name = devpath.replace(/^\/dev\//, '');
    setSmartFor(name); setSmartData(null); setSmartLoading(true);
    try {
      const cid = encodeURIComponent(clusterId);
      const nd  = encodeURIComponent(node);
      const r = await fetch(
        `/api/clusters/${cid}/nodes/${nd}/disks/${encodeURIComponent(name)}/smart`,
        { credentials: 'same-origin' }
      );
      const d = await r.json();
      if (!r.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setSmartData(d.smart);
    } catch (e: any) {
      setSmartData({ _error: e.message || String(e) });
    } finally {
      setSmartLoading(false);
    }
  };

  if (!open) return null;
  const st = hw?.status;

  return (
    <div className="nh-back" onClick={onClose}>
      <div className="nh-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nh-head">
          <div className="nh-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="8" rx="1"/>
              <rect x="2" y="14" width="20" height="8" rx="1"/>
              <line x1="6" y1="6" x2="6.01" y2="6"/>
              <line x1="6" y1="18" x2="6.01" y2="18"/>
            </svg>
            <span>{t('nhw.title')}</span>
            <span className="nh-target">{node}</span>
          </div>
          <button className="nh-close" onClick={onClose}>×</button>
        </div>

        <div className="nh-body">
          {error && <div className="nh-error">{error}</div>}
          {loading && !hw && <div className="nh-empty">{t('nhw.loading')}</div>}

          {st && (
            <Section title={t('nhw.section.system')}>
              <div className="nh-kv">
                <Cell k={t('nhw.cpu.model')} v={st.cpuinfo?.model || '—'} />
                <Cell k={t('nhw.cpu.layout')} v={`${st.cpuinfo?.sockets ?? '?'}× sockets / ${st.cpuinfo?.cores ?? '?'} cores / ${st.cpuinfo?.cpus ?? '?'} threads`} />
                <Cell k={t('nhw.cpu.mhz')} v={st.cpuinfo?.mhz ? `${st.cpuinfo.mhz} MHz` : '—'} />
                <Cell k={t('nhw.kernel')} v={st.current_kernel?.release || st.kversion || '—'} />
                <Cell k={t('nhw.pveversion')} v={st.pveversion || '—'} />
                <Cell k={t('nhw.bootmode')} v={`${st.bootinfo?.mode || '—'}${st.bootinfo?.secureboot ? ' (Secure Boot)' : ''}`} />
                <Cell k={t('nhw.uptime')} v={fmtUptime(st.uptime)} />
                <Cell k={t('nhw.loadavg')} v={(st.loadavg || []).join(' / ') || '—'} />
              </div>
            </Section>
          )}

          {st && (
            <Section title={t('nhw.section.memory')}>
              <div className="nh-kv">
                <Cell k="memory total" v={fmtBytes(st.memory?.total)} />
                <Cell k="memory used" v={fmtBytes(st.memory?.used)} />
                <Cell k="memory free" v={fmtBytes(st.memory?.free)} />
                <Cell k="swap total" v={fmtBytes(st.swap?.total)} />
                <Cell k="swap used" v={fmtBytes(st.swap?.used)} />
                <Cell k="rootfs used / total" v={`${fmtBytes(st.rootfs?.used)} / ${fmtBytes(st.rootfs?.total)}`} />
              </div>
            </Section>
          )}

          {disks.length > 0 && (
            <Section title={t('nhw.section.disks')}>
              <table className="nh-table">
                <thead>
                  <tr>
                    <th>{t('nhw.disk.dev')}</th>
                    <th>{t('nhw.disk.type')}</th>
                    <th>{t('nhw.disk.size')}</th>
                    <th>{t('nhw.disk.model')}</th>
                    <th>{t('nhw.disk.serial')}</th>
                    <th>{t('nhw.disk.used')}</th>
                    <th>{t('nhw.disk.wearout')}</th>
                    <th>{t('nhw.disk.health')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {disks.map((d) => {
                    const h = (d.health || '').toUpperCase();
                    const healthCls = h === 'PASSED' ? 'ok' : (h === 'FAILED' ? 'bad' : 'mute');
                    return (
                      <tr key={d.devpath}>
                        <td className="nh-mono">{d.devpath}</td>
                        <td>
                          <span className="nh-disk-type">{d.type || (d.rotational ? 'hdd' : 'ssd')}</span>
                        </td>
                        <td className="nh-mono">{fmtBytes(d.size)}</td>
                        <td className="nh-mono nh-trunc" title={d.model || ''}>{d.model || '—'}</td>
                        <td className="nh-mono nh-trunc" title={d.serial || ''}>{d.serial || '—'}</td>
                        <td className="nh-mono">{d.used || '—'}</td>
                        <td className="nh-mono">{d.wearout != null ? `${d.wearout}%` : '—'}</td>
                        <td><span className={`nh-h ${healthCls}`}>{h || '—'}</span></td>
                        <td>
                          <button className="nh-row-btn" onClick={() => showSmart(d.devpath || '')}>
                            SMART
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Section>
          )}

          {hw?.pci && hw.pci.length > 0 && (
            <Section title={t('nhw.section.pci')}>
              <table className="nh-table">
                <thead><tr><th>id</th><th>class</th><th>vendor</th><th>device</th></tr></thead>
                <tbody>
                  {hw.pci.map((p, i) => (
                    <tr key={i}>
                      <td className="nh-mono">{p.id || '—'}</td>
                      <td className="nh-mono">{p.class || '—'}</td>
                      <td className="nh-mono nh-trunc" title={p.vendor || ''}>{p.vendor || '—'}</td>
                      <td className="nh-mono nh-trunc" title={p.device || ''}>{p.device || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

          {hw?.usb && hw.usb.length > 0 && (
            <Section title={t('nhw.section.usb')}>
              <table className="nh-table">
                <thead><tr><th>bus:port</th><th>vid:pid</th><th>class</th><th>product</th></tr></thead>
                <tbody>
                  {hw.usb.map((u, i) => (
                    <tr key={i}>
                      <td className="nh-mono">{u.bus}:{u.portpath || '—'}</td>
                      <td className="nh-mono">{u.vendid || '—'}:{u.prodid || '—'}</td>
                      <td className="nh-mono">{u.class || '—'}</td>
                      <td className="nh-mono nh-trunc" title={u.product || ''}>{u.product || u.manufacturer || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}
        </div>

        {smartFor && (
          <div className="nh-overlay" onClick={() => setSmartFor(null)}>
            <div className="nh-overlay-card" onClick={(e) => e.stopPropagation()}>
              <div className="nh-overlay-head">
                <span>SMART · /dev/{smartFor}</span>
                <button onClick={() => setSmartFor(null)}>×</button>
              </div>
              {smartLoading && <div className="nh-empty">{t('nhw.loading')}</div>}
              {smartData?._error && <div className="nh-error">{smartData._error}</div>}
              {smartData && !smartLoading && !smartData._error && (
                <pre className="nh-smart">{JSON.stringify(smartData, null, 2)}</pre>
              )}
            </div>
          </div>
        )}

        <style>{`
          .nh-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .nh-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: nh-in .18s ease-out; overflow: hidden; }
          @keyframes nh-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .nh-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .nh-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .nh-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .nh-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .nh-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .nh-empty { padding: 20px 12px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13.5px; font-style: italic; }
          .nh-error { padding: 8px 14px; margin: 6px 0 12px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }

          .nh-section { margin-bottom: 18px; }
          .nh-section-title { font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .nh-kv { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 4px 16px; font-family: var(--font-mono); font-size: 13.5px; }
          .nh-kv-row { display: flex; justify-content: space-between; gap: 12px; padding: 5px 8px; background: rgba(0, 240, 255, 0.025); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 3px; }
          .nh-kv-row:hover { background: rgba(0, 240, 255, 0.06); }
          .nh-kv-key { color: var(--text-secondary); font-family: var(--font-display); font-size: 11.5px; letter-spacing: .05em; text-transform: uppercase; }
          .nh-kv-val { color: var(--text-primary); text-align: right; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

          .nh-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .nh-table thead { position: sticky; top: 0; background: rgba(0, 240, 255, 0.08); }
          .nh-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--primary); border-bottom: 1px solid rgba(0,240,255,.2); white-space: nowrap; }
          .nh-table td { padding: 5px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .nh-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .nh-mono { font-family: var(--font-mono); }
          .nh-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; }
          .nh-row-btn { padding: 2px 8px; font-family: var(--font-mono); font-size: 12.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .nh-row-btn:hover { background: rgba(0, 240, 255, 0.1); }

          .nh-disk-type { display: inline-block; padding: 1px 8px; font-size: 11.5px; font-family: var(--font-display); letter-spacing: .04em; text-transform: uppercase; color: var(--accent, #e066ff); border: 1px solid currentColor; border-radius: 2px; }
          .nh-h { display: inline-block; padding: 1px 8px; font-size: 12.5px; font-family: var(--font-mono); border: 1px solid currentColor; border-radius: 999px; }
          .nh-h.ok { color: var(--success); }
          .nh-h.bad { color: var(--danger, #ff4d6d); }
          .nh-h.mute { color: var(--text-muted); }

          .nh-overlay { position: absolute; inset: 0; background: rgba(2,4,10,.7); display: flex; align-items: center; justify-content: center; z-index: 5; }
          .nh-overlay-card { width: min(820px, 92%); max-height: 80vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; padding: 12px 18px; display: flex; flex-direction: column; }
          .nh-overlay-head { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid rgba(0,240,255,.2); }
          .nh-overlay-head button { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .nh-smart { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-primary); background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; padding: 10px; overflow: auto; flex: 1; margin: 0; }
        `}</style>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="nh-section">
      <div className="nh-section-title">{title}</div>
      {children}
    </div>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="nh-kv-row">
      <span className="nh-kv-key">{k}</span>
      <span className="nh-kv-val" title={v}>{v}</span>
    </div>
  );
}
