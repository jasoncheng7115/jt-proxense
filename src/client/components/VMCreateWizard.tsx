/**
 * VMCreateWizard — operator-only multi-step modal that creates a QEMU VM
 * or LXC container. Wraps server endpoints in `server/vm_create.py`.
 *
 * OWASP A04 (secure design):
 *   - Each step gates the Next button until the step's required fields
 *     parse client-side (mirrors server allow-list regexes).
 *   - Final step is a Review showing exactly what will be sent. Operator
 *     must click "Create" — no auto-submit.
 *   - On submit, server re-validates everything.
 *
 * The CLAUDE.md notes this is a 1000+ LOC surface; this implementation
 * keeps a single-disk + single-NIC happy path. Multi-disk / multi-NIC
 * "advanced" mode is left for a future iteration — the operator can add
 * extras via the existing VMConfigModal NIC editor / Grow disk dialogs.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { CyberSelect } from './CyberSelect';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  /** Pre-selected node (optional) — wizard still lets the operator change. */
  defaultNode?: string;
  /** Fired with new VMID after success so callers can refresh their lists. */
  onCreated?: (vmid: number, kind: 'qemu'|'lxc', node: string) => void;
}

type Kind = 'qemu' | 'lxc';

const NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._\-]{0,127}$/;
const HOSTNAME_RE = /^[A-Za-z0-9][A-Za-z0-9.\-]{0,63}$/;
const STORAGE_RE = /^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$/;
const BRIDGE_RE = /^vmbr[0-9]{1,3}$/;
const VOLID_RE = /^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}:[A-Za-z0-9./_\-]{1,256}$/;

interface Storage { storage: string; type?: string; content?: string; active?: number; }
interface ContentRow { volid: string; size?: number; format?: string; }
interface NodeOpt { node: string; }

export function VMCreateWizard({ open, onClose, clusterId, defaultNode, onCreated }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();

  const [step, setStep] = useState(0);
  const [kind, setKind] = useState<Kind>('qemu');
  const [node, setNode] = useState(defaultNode || '');
  const [vmid, setVmid] = useState<string>('');
  const [name, setName] = useState('');
  const [hostname, setHostname] = useState('');
  const [ostype, setOstype] = useState('l26');

  // OS image
  const [isoStorages, setIsoStorages] = useState<Storage[]>([]);
  const [isoStorage, setIsoStorage] = useState('');
  const [isos, setIsos] = useState<ContentRow[]>([]);
  const [isoVolid, setIsoVolid] = useState('');

  const [tmplStorages, setTmplStorages] = useState<Storage[]>([]);
  const [tmplStorage, setTmplStorage] = useState('');
  const [tmpls, setTmpls] = useState<ContentRow[]>([]);
  const [ostemplate, setOstemplate] = useState('');

  // Hardware
  const [cores, setCores] = useState('2');
  const [memory, setMemory] = useState('2048');
  const [swap, setSwap] = useState('512');
  const [diskStorages, setDiskStorages] = useState<Storage[]>([]);
  const [diskStorage, setDiskStorage] = useState('');
  const [diskGB, setDiskGB] = useState('20');

  // Network
  const [bridge, setBridge] = useState('vmbr0');
  const [vlan, setVlan] = useState('');
  const [firewall, setFirewall] = useState(true);
  const [ip, setIp] = useState('dhcp');
  const [gw, setGw] = useState('');
  const [password, setPassword] = useState('');
  const [sshKeys, setSshKeys] = useState('');

  const [nodes, setNodes] = useState<NodeOpt[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  // Reset every time the modal opens.
  useEffect(() => {
    if (!open) return;
    setStep(0);
    setKind('qemu'); setNode(defaultNode || ''); setVmid('');
    setName(''); setHostname(''); setOstype('l26');
    setIsoStorage(''); setIsoVolid(''); setTmplStorage(''); setOstemplate('');
    setCores('2'); setMemory('2048'); setSwap('512');
    setDiskStorage(''); setDiskGB('20');
    setBridge('vmbr0'); setVlan(''); setFirewall(true);
    setIp('dhcp'); setGw(''); setPassword(''); setSshKeys('');
    setSubmitErr(null);
    // Fetch initial helpers
    (async () => {
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/next-vmid`,
          { credentials: 'same-origin' }
        );
        const d = await r.json();
        if (d.vmid) setVmid(String(d.vmid));
      } catch { /* ignore */ }
      try {
        const r2 = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}`,
          { credentials: 'same-origin' }
        );
        if (r2.ok) {
          const d2 = await r2.json();
          const ns = Object.keys(d2.nodes || {}).map((k) => ({ node: k }));
          setNodes(ns);
          if (!defaultNode && ns.length > 0) setNode(ns[0].node);
        }
      } catch { /* ignore */ }
    })();
  }, [open, clusterId, defaultNode]);

  // Fetch storages whenever node or kind changes.
  useEffect(() => {
    if (!open || !node) return;
    (async () => {
      const fetchSt = async (content: string): Promise<Storage[]> => {
        try {
          const r = await fetch(
            `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/storages?content=${content}`,
            { credentials: 'same-origin' }
          );
          if (!r.ok) return [];
          const d = await r.json();
          return (d.storages || []).filter((s: Storage) => s.active !== 0);
        } catch { return []; }
      };
      if (kind === 'qemu') {
        const iso = await fetchSt('iso');
        setIsoStorages(iso);
        if (iso.length && !isoStorage) setIsoStorage(iso[0].storage);
        const img = await fetchSt('images');
        setDiskStorages(img);
        if (img.length && !diskStorage) setDiskStorage(img[0].storage);
      } else {
        const tm = await fetchSt('vztmpl');
        setTmplStorages(tm);
        if (tm.length && !tmplStorage) setTmplStorage(tm[0].storage);
        const root = await fetchSt('rootdir');
        setDiskStorages(root);
        if (root.length && !diskStorage) setDiskStorage(root[0].storage);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, node, kind]);

  // Fetch ISOs / templates when storage changes.
  useEffect(() => {
    if (!open || !node || kind !== 'qemu' || !isoStorage) return;
    (async () => {
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/storages/${encodeURIComponent(isoStorage)}/iso`,
          { credentials: 'same-origin' }
        );
        if (r.ok) {
          const d = await r.json();
          setIsos(d.content || []);
        }
      } catch { /* ignore */ }
    })();
  }, [open, clusterId, node, kind, isoStorage]);

  useEffect(() => {
    if (!open || !node || kind !== 'lxc' || !tmplStorage) return;
    (async () => {
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/storages/${encodeURIComponent(tmplStorage)}/vztmpl`,
          { credentials: 'same-origin' }
        );
        if (r.ok) {
          const d = await r.json();
          setTmpls(d.content || []);
        }
      } catch { /* ignore */ }
    })();
  }, [open, clusterId, node, kind, tmplStorage]);

  // Step validity (mirrors server allow-list regexes).
  const stepValid = useMemo(() => {
    if (step === 0) {
      const idOk = /^\d+$/.test(vmid) && +vmid >= 100 && +vmid <= 999999999;
      if (!idOk || !node) return false;
      if (kind === 'qemu') return name === '' || NAME_RE.test(name);
      return HOSTNAME_RE.test(hostname);
    }
    if (step === 1) {
      if (kind === 'qemu') return isoVolid === '' || VOLID_RE.test(isoVolid);
      return VOLID_RE.test(ostemplate);
    }
    if (step === 2) {
      const c = parseInt(cores, 10), m = parseInt(memory, 10);
      if (!Number.isFinite(c) || c < 1 || c > 1024) return false;
      if (!Number.isFinite(m) || m < 16) return false;
      if (kind === 'lxc') {
        const sw = parseInt(swap, 10);
        if (!Number.isFinite(sw) || sw < 0) return false;
      }
      const dg = parseInt(diskGB, 10);
      if (!Number.isFinite(dg) || dg < 1 || dg > 65536) return false;
      if (!STORAGE_RE.test(diskStorage)) return false;
      return true;
    }
    if (step === 3) {
      if (!BRIDGE_RE.test(bridge)) return false;
      if (vlan && !/^\d{1,4}$/.test(vlan)) return false;
      if (kind === 'lxc') {
        if (ip !== 'dhcp' && !/^[0-9.]{7,18}\/[0-9]{1,2}$/.test(ip)) return false;
        if (gw && !/^[0-9.]{7,18}$/.test(gw)) return false;
        if (!password && !sshKeys.trim()) return false;
      }
      return true;
    }
    return true;
  }, [step, kind, node, vmid, name, hostname, isoVolid, ostemplate,
      cores, memory, swap, diskGB, diskStorage, bridge, vlan, ip, gw, password, sshKeys]);

  const submit = async () => {
    setSubmitting(true); setSubmitErr(null);
    try {
      let body: any;
      let url: string;
      if (kind === 'qemu') {
        body = {
          vmid: +vmid,
          name: name || `vm${vmid}`,
          cores: +cores,
          memory: +memory,
          ostype,
          iso_volid: isoVolid || undefined,
          disks: [{ slot: 'scsi0', storage: diskStorage, size_gb: +diskGB }],
          nics: [{
            slot: 'net0', model: 'virtio', bridge,
            vlan: vlan || undefined, firewall,
          }],
        };
        url = `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/qemu`;
      } else {
        body = {
          vmid: +vmid,
          hostname,
          cores: +cores,
          memory: +memory,
          swap: +swap,
          ostemplate,
          storage: diskStorage,
          size_gb: +diskGB,
          password: password || undefined,
          ssh_public_keys: sshKeys.trim() || undefined,
          nic: { bridge, vlan: vlan || undefined, firewall, ip, gw: gw || undefined },
        };
        url = `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/lxc`;
      }
      const r = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      onCreated?.(+vmid, kind, node);
      onClose();
    } catch (e: any) {
      setSubmitErr(`${t('vmcw.create_err')}: ${e.message || e}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;
  const steps = [
    t('vmcw.step.kind'),
    t('vmcw.step.os'),
    t('vmcw.step.hw'),
    t('vmcw.step.net'),
    t('vmcw.step.review'),
  ];

  return (
    <div className="cw-back" onClick={() => !submitting && onClose()}>
      <div className="cw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cw-head">
          <div className="cw-title">{t('vmcw.title')}</div>
          <button className="cw-close" onClick={onClose} disabled={submitting}>×</button>
        </div>

        <div className="cw-stepper">
          {steps.map((s, i) => (
            <div key={s} className={`cw-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <span className="cw-step-num">{i + 1}</span>
              <span className="cw-step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="cw-body">
          {submitErr && <div className="cw-error">{submitErr}</div>}

          {step === 0 && (
            <>
              <div className="cw-row">
                <label>{t('vmcw.kind.vm')}</label>
                <input type="radio" checked={kind === 'qemu'} onChange={() => setKind('qemu')} />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.kind.lxc')}</label>
                <input type="radio" checked={kind === 'lxc'} onChange={() => setKind('lxc')} />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.node')}</label>
                <CyberSelect
                  value={node}
                  options={(nodes.length > 0 ? nodes.map((n) => n.node) : node ? [node] : [])
                    .map((v) => ({ value: v, label: v }))}
                  onChange={(v) => setNode(v)}
                />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.vmid')}</label>
                <input value={vmid} onChange={(e) => setVmid(e.target.value)} type="number" min={100} />
              </div>
              {kind === 'qemu' ? (
                <div className="cw-row">
                  <label>{t('vmcw.field.name')}</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={`vm${vmid}`} />
                </div>
              ) : (
                <div className="cw-row">
                  <label>{t('vmcw.field.hostname')}</label>
                  <input value={hostname} onChange={(e) => setHostname(e.target.value)} placeholder="ct1" />
                </div>
              )}
            </>
          )}

          {step === 1 && kind === 'qemu' && (
            <>
              <div className="cw-row">
                <label>{t('vmcw.field.iso_storage')}</label>
                <CyberSelect
                  value={isoStorage}
                  options={isoStorages.map((st) => ({ value: st.storage, label: st.storage }))}
                  onChange={(v) => { setIsoStorage(v); setIsoVolid(''); }}
                />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.iso')}</label>
                <CyberSelect
                  value={isoVolid}
                  options={[{ value: '', label: '— none —' },
                            ...isos.map((c) => ({ value: c.volid, label: c.volid.split('/').pop() || c.volid }))]}
                  onChange={(v) => setIsoVolid(v)}
                />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.ostype')}</label>
                <CyberSelect
                  value={ostype}
                  options={[
                    { value: 'l26', label: 'Linux (l26)' },
                    { value: 'win11', label: 'Windows 11' },
                    { value: 'win10', label: 'Windows 10' },
                    { value: 'win8', label: 'Windows 8/2012' },
                    { value: 'other', label: 'Other' },
                  ]}
                  onChange={(v) => setOstype(v)}
                />
              </div>
            </>
          )}

          {step === 1 && kind === 'lxc' && (
            <>
              <div className="cw-row">
                <label>{t('vmcw.field.tmpl_storage')}</label>
                <CyberSelect
                  value={tmplStorage}
                  options={tmplStorages.map((st) => ({ value: st.storage, label: st.storage }))}
                  onChange={(v) => { setTmplStorage(v); setOstemplate(''); }}
                />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.tmpl')}</label>
                <CyberSelect
                  value={ostemplate}
                  options={[{ value: '', label: '— pick —' },
                            ...tmpls.map((c) => ({ value: c.volid, label: c.volid.split('/').pop() || c.volid }))]}
                  onChange={(v) => setOstemplate(v)}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="cw-row">
                <label>{t('vmcw.field.cores')}</label>
                <input type="number" min={1} value={cores} onChange={(e) => setCores(e.target.value)} />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.memory')}</label>
                <input type="number" min={16} value={memory} onChange={(e) => setMemory(e.target.value)} />
              </div>
              {kind === 'lxc' && (
                <div className="cw-row">
                  <label>{t('vmcw.field.swap')}</label>
                  <input type="number" min={0} value={swap} onChange={(e) => setSwap(e.target.value)} />
                </div>
              )}
              <div className="cw-row">
                <label>{t('vmcw.field.disk_storage')}</label>
                <CyberSelect
                  value={diskStorage}
                  options={diskStorages.map((st) => ({ value: st.storage, label: st.storage }))}
                  onChange={(v) => setDiskStorage(v)}
                />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.disk_size')}</label>
                <input type="number" min={1} max={65536} value={diskGB} onChange={(e) => setDiskGB(e.target.value)} />
              </div>
              <div className="cw-help">{t('vmcw.help.disk_grow_only')}</div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="cw-row">
                <label>{t('vmcw.field.bridge')}</label>
                <input value={bridge} onChange={(e) => setBridge(e.target.value)} placeholder="vmbr0" />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.vlan')}</label>
                <input value={vlan} onChange={(e) => setVlan(e.target.value)} type="number" min={0} max={4094} />
              </div>
              <div className="cw-row">
                <label>{t('vmcw.field.firewall')}</label>
                <input type="checkbox" checked={firewall} onChange={(e) => setFirewall(e.target.checked)} />
              </div>
              {kind === 'lxc' && (
                <>
                  <div className="cw-row">
                    <label>{t('vmcw.field.ip')}</label>
                    <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="dhcp or 10.0.0.5/24" />
                  </div>
                  <div className="cw-row">
                    <label>{t('vmcw.field.gw')}</label>
                    <input value={gw} onChange={(e) => setGw(e.target.value)} placeholder="10.0.0.1" />
                  </div>
                  <div className="cw-row">
                    <label>{t('vmcw.field.password')}</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="cw-row cw-row-tall">
                    <label>{t('vmcw.field.ssh_keys')}</label>
                    <textarea value={sshKeys} onChange={(e) => setSshKeys(e.target.value)} rows={3} />
                  </div>
                  <div className="cw-help">{t('vmcw.help.password_or_keys')}</div>
                </>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <div className="cw-help">{t('vmcw.review_intro')}</div>
              <pre className="cw-preview">{JSON.stringify({
                kind, node, vmid: +vmid,
                ...(kind === 'qemu'
                  ? { name: name || `vm${vmid}`, ostype, iso: isoVolid || null,
                      cores: +cores, memory: +memory,
                      disk: `${diskStorage}:${diskGB}G`,
                      net: `virtio,bridge=${bridge}${vlan ? `,tag=${vlan}` : ''}${firewall ? ',firewall=1' : ''}` }
                  : { hostname, template: ostemplate, cores: +cores,
                      memory: +memory, swap: +swap,
                      rootfs: `${diskStorage}:${diskGB}G`,
                      net: `bridge=${bridge}${vlan ? `,tag=${vlan}` : ''}${firewall ? ',firewall=1' : ''},ip=${ip}${gw ? `,gw=${gw}` : ''}`,
                      password: password ? '••••••' : undefined,
                      ssh_keys: sshKeys ? `${sshKeys.split('\n').filter((l) => l.trim()).length} key(s)` : undefined }),
              }, null, 2)}</pre>
            </>
          )}
        </div>

        <div className="cw-footer">
          <button onClick={onClose} disabled={submitting}>{t('vmcw.cancel')}</button>
          <div style={{ flex: 1 }} />
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} disabled={submitting}>{t('vmcw.prev')}</button>
          )}
          {step < 4 && (
            <button className="cw-primary" disabled={!stepValid} onClick={() => setStep((s) => s + 1)}>
              {t('vmcw.next')}
            </button>
          )}
          {step === 4 && (
            <button className="cw-primary" disabled={submitting} onClick={submit}>
              {submitting ? t('vmcw.creating') : t('vmcw.create')}
            </button>
          )}
        </div>

        <style>{`
          .cw-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .cw-modal { width: min(720px, 96vw); max-height: 92vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: cw-in .18s ease-out; overflow: hidden; }
          @keyframes cw-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .cw-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .cw-title { color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .cw-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .cw-stepper { display: flex; gap: 0; padding: 10px 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); overflow-x: auto; }
          .cw-step { display: flex; align-items: center; gap: 6px; padding: 4px 10px; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); border-right: 1px solid rgba(0,240,255,.05); white-space: nowrap; }
          .cw-step.active { color: var(--primary); }
          .cw-step.done { color: var(--success); }
          .cw-step-num { display: inline-block; width: 18px; height: 18px; border-radius: 50%; border: 1px solid currentColor; text-align: center; line-height: 16px; font-size: 12px; }
          .cw-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .cw-row { display: grid; grid-template-columns: 160px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .cw-row-tall { align-items: start; }
          .cw-row label { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .cw-row input, .cw-row select, .cw-row textarea { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .cw-row input:focus, .cw-row select:focus, .cw-row textarea:focus { border-color: var(--primary); }
          .cw-row input[type="checkbox"], .cw-row input[type="radio"] { justify-self: start; }
          .cw-help { padding: 6px 0; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
          .cw-error { padding: 8px 14px; margin-bottom: 10px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .cw-preview { font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; padding: 10px; overflow: auto; max-height: 360px; }
          .cw-footer { display: flex; gap: 8px; align-items: center; padding: 12px 18px; border-top: 1px solid rgba(0, 240, 255, 0.12); background: rgba(0, 240, 255, 0.03); }
          .cw-footer button { padding: 6px 16px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 3px; cursor: pointer; }
          .cw-footer button:hover { background: rgba(0, 240, 255, 0.05); }
          .cw-footer .cw-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .cw-footer .cw-primary:disabled { opacity: .4; cursor: not-allowed; }
          .cw-footer button:disabled { opacity: .4; cursor: not-allowed; }
        `}</style>
      </div>
    </div>
  );
}
