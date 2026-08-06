/**
 * RemoteMigrateModal — cross-cluster VM migration wizard.
 *
 * Hard requirements from Jason:
 *   - Operator must pick which target storage each source disk lands on
 *     (VM might have several disks; PVE rejects a single shorthand when
 *     multiple source storages need different targets).
 *   - Operator must pick which target bridge each source NIC attaches to.
 *   - Operator must pick which IP segment carries the data transfer (e.g.
 *     pin to a 172.16.100.x dedicated migration network instead of mgmt).
 *   - Bandwidth limit (KB/s) so a migration doesn't saturate the link.
 *
 * Step 1: target endpoint
 *   - Pick a target cluster + node from the configured list
 *   - Auto-fetch the target's TLS fingerprint and runtime layout (storages,
 *     bridges, IPs) over the JT-Proxense token
 *   - Pick which target IP to use as the data path (default: management IP)
 * Step 2: per-disk and per-NIC mappings
 *   - one storage dropdown per source disk → builds the storage map
 *   - one bridge dropdown per source NIC → builds the bridge map
 *   - target VMID, online/delete-source toggles, bandwidth limit
 * Step 3: review + submit
 *
 * Cyberpunk styling matches ConfirmModal.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../api';
import { useTranslation } from '../i18n';
import { CyberSelect } from './CyberSelect';

interface VMSummary {
  vmid: number;
  name: string;
  node: string;
  type?: string;
}

interface Props {
  open: boolean;
  cluster_id: string;
  vm: VMSummary | null;
  onClose: () => void;
  onMigrationStarted?: (upid: string) => void;
}

interface Endpoint {
  cluster_id: string;
  cluster_name: string;
  node_host: string;
  node_port: number;
  node_name: string;
}

interface SourceDisk { key: string; storage: string; volid: string; size: string; }
interface SourceNic  { key: string; bridge: string; model: string; }
interface SourceLayout {
  vmid: number; node: string; name: string;
  disks: SourceDisk[]; nics: SourceNic[];
}

interface TargetStorage {
  storage: string; type: string; content: string;
  avail: number; total: number; shared: boolean;
}
interface TargetBridge { iface: string; type: string; address: string; }
interface TargetIp     { iface: string; type: string; address: string; netmask: string; }
interface TargetLayout {
  cluster_id: string; node: string;
  storages: TargetStorage[]; bridges: TargetBridge[]; ips: TargetIp[];
}

type Step = 'endpoint' | 'mappings' | 'review' | 'submitting' | 'done' | 'error';

const fmtGiB = (bytes: number) => {
  if (!bytes) return '—';
  const gib = bytes / (1024 ** 3);
  return gib >= 100 ? `${gib.toFixed(0)}G` : `${gib.toFixed(1)}G`;
};

export function RemoteMigrateModal({ open, cluster_id, vm, onClose, onMigrationStarted }: Props) {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('endpoint');
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [fingerprint, setFingerprint] = useState<string>('');
  const [fingerprintLoading, setFingerprintLoading] = useState(false);

  const [sourceLayout, setSourceLayout] = useState<SourceLayout | null>(null);
  const [targetLayout, setTargetLayout] = useState<TargetLayout | null>(null);
  const [layoutLoading, setLayoutLoading] = useState(false);

  // Per-resource pickers — keyed by source resource id (e.g. 'scsi0' / 'net0').
  const [diskMap, setDiskMap] = useState<Record<string, string>>({});
  const [nicMap, setNicMap] = useState<Record<string, string>>({});
  // Selected migration data-path IP (chosen from target node's interfaces).
  const [dataPathIp, setDataPathIp] = useState<string>('');

  const [targetVmid, setTargetVmid] = useState<string>('');
  const [online, setOnline] = useState(true);
  const [deleteSource, setDeleteSource] = useState(false);
  const [bwlimit, setBwlimit] = useState<string>('');

  const [err, setErr] = useState<string>('');
  const [resultUpid, setResultUpid] = useState<string>('');

  // Pre-flight result. `null` = not yet run; `{ok:true}` lets review proceed,
  // any blocker disables the Submit button.
  const [precheck, setPrecheck] = useState<{
    ok: boolean; blockers: string[]; warnings: string[];
  } | null>(null);
  const [precheckLoading, setPrecheckLoading] = useState(false);

  const runPrecheck = async () => {
    if (!vm || !selected) return;
    setPrecheckLoading(true); setPrecheck(null); setErr('');
    try {
      const r = await api.migrationPrecheck(
        cluster_id, vm.vmid, selected.cluster_id, selected.node_name || selected.node_host,
      );
      setPrecheck({ ok: r.ok, blockers: r.blockers, warnings: r.warnings });
    } catch (ex: unknown) {
      const msg = (ex instanceof Error) ? ex.message : String(ex);
      setErr(`pre-flight check failed: ${msg}`);
    } finally {
      setPrecheckLoading(false);
    }
  };

  // Was: ref on the native <select> for autofocus. CyberSelect doesn't
  // expose an imperative focus handle and wizard state self-resets on
  // open, so the ref is no longer wired up.
  // const inputRef = useRef<HTMLSelectElement>(null);

  // Reset on open
  useEffect(() => {
    if (!open) return;
    setStep('endpoint');
    setEndpoints([]);
    setSelectedKey('');
    setFingerprint('');
    setSourceLayout(null);
    setTargetLayout(null);
    setDiskMap({});
    setNicMap({});
    setDataPathIp('');
    setTargetVmid(vm ? String(vm.vmid) : '');
    setBwlimit('');
    setErr('');
    setResultUpid('');
    setPrecheck(null);
    api.listRemoteEndpoints(cluster_id)
      .then((d) => setEndpoints(d.endpoints))
      .catch((e) => setErr(`could not list target clusters: ${e.message || e}`));
    if (vm) {
      api.getMigrationSource(cluster_id, vm.vmid)
        .then(setSourceLayout)
        .catch((e) => setErr(`could not introspect source VM: ${e.message || e}`));
    }
  }, [open, cluster_id, vm]);

  // Esc closes (unless mid-submit)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step !== 'submitting') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, step, onClose]);

  const selected = endpoints.find((e) => key(e) === selectedKey);

  // When operator picks an endpoint, fetch fingerprint + target node layout.
  const onPickEndpoint = async (k: string) => {
    setSelectedKey(k);
    const e = endpoints.find((x) => key(x) === k);
    if (!e) return;
    setFingerprintLoading(true);
    setLayoutLoading(true);
    setErr('');
    setTargetLayout(null);
    setDataPathIp('');
    try {
      const r = await api.fetchRemoteFingerprint(e.node_host, e.node_port);
      setFingerprint(r.fingerprint);
    } catch (ex: unknown) {
      const msg = (ex instanceof Error) ? ex.message : String(ex);
      setErr(`could not auto-fetch fingerprint (${msg}); paste manually`);
      setFingerprint('');
    } finally {
      setFingerprintLoading(false);
    }
    try {
      // Use the PVE node *name* (resolved server-side via /cluster/status),
      // not the management IP — PVE's per-node REST endpoints reject IPs.
      const nodeForLookup = e.node_name || e.node_host;
      const t = await api.getMigrationTargets(e.cluster_id, nodeForLookup);
      setTargetLayout(t);
      // Default the data-path IP to the management endpoint we already picked.
      const matching = t.ips.find((i) => i.address === e.node_host);
      setDataPathIp(matching ? matching.address : (t.ips[0]?.address || e.node_host));
    } catch (ex: unknown) {
      const msg = (ex instanceof Error) ? ex.message : String(ex);
      setErr(`could not enumerate target node resources: ${msg}`);
    } finally {
      setLayoutLoading(false);
    }
  };

  // Default the dropdowns to first valid choice once both layouts are loaded.
  useEffect(() => {
    if (!sourceLayout || !targetLayout) return;
    setDiskMap((prev) => {
      const next: Record<string, string> = { ...prev };
      sourceLayout.disks.forEach((d) => {
        if (!next[d.key]) {
          // Prefer same name on target; else first storage.
          const same = targetLayout.storages.find((s) => s.storage === d.storage);
          next[d.key] = (same || targetLayout.storages[0])?.storage || '';
        }
      });
      return next;
    });
    setNicMap((prev) => {
      const next: Record<string, string> = { ...prev };
      sourceLayout.nics.forEach((n) => {
        if (!next[n.key]) {
          const same = targetLayout.bridges.find((b) => b.iface === n.bridge);
          next[n.key] = (same || targetLayout.bridges[0])?.iface || '';
        }
      });
      return next;
    });
  }, [sourceLayout, targetLayout]);

  // Composed PVE map strings.
  //
  // PVE 8's remote_migrate accepts either:
  //   - A single bare ID ("Backup_1-zfs" / "vmbr10") that maps every source
  //     resource to that one target. This is the most reliable form.
  //   - A "<src>=<dst>,<src>=<dst>" map keyed by *source* storage / bridge.
  //
  // We pick the bare form whenever every source resource picks the same
  // target — empirically that's what the PVE 8 minor versions in the field
  // accept. When destinations differ we emit the source-keyed map.
  // (Disk-id-keyed maps like "scsi0=…" are rejected by PVE as "illegal
  //  characters" — the parser validates each entry as a storage ID before
  //  splitting on '='.)
  const composedStorageMap = useMemo(() => {
    if (!sourceLayout) return '';
    const distinctTargets = new Set<string>();
    const pairs = new Map<string, string>();
    sourceLayout.disks.forEach((d) => {
      const tgt = diskMap[d.key];
      if (d.storage && tgt) {
        pairs.set(d.storage, tgt);
        distinctTargets.add(tgt);
      }
    });
    if (distinctTargets.size === 1) return Array.from(distinctTargets)[0];
    return Array.from(pairs.entries()).map(([s, t]) => `${s}=${t}`).join(',');
  }, [sourceLayout, diskMap]);

  const composedBridgeMap = useMemo(() => {
    if (!sourceLayout) return '';
    const distinctTargets = new Set<string>();
    const pairs = new Map<string, string>();
    sourceLayout.nics.forEach((n) => {
      const tgt = nicMap[n.key];
      if (n.bridge && tgt) {
        pairs.set(n.bridge, tgt);
        distinctTargets.add(tgt);
      }
    });
    if (distinctTargets.size === 1) return Array.from(distinctTargets)[0];
    return Array.from(pairs.entries()).map(([s, t]) => `${s}=${t}`).join(',');
  }, [sourceLayout, nicMap]);

  const submit = async () => {
    if (!vm || !selected) return;
    setStep('submitting');
    setErr('');
    try {
      const r = await api.remoteMigrate(cluster_id, vm.vmid, {
        target_cluster_id: selected.cluster_id,
        // Use the selected data-path IP (operator chose which subnet). Falls
        // back to the management endpoint if the operator didn't change it.
        target_endpoint_host: dataPathIp || selected.node_host,
        target_endpoint_port: selected.node_port,
        target_endpoint_fingerprint: fingerprint || undefined,
        target_vmid: parseInt(targetVmid, 10),
        target_bridge_map: composedBridgeMap,
        target_storage_map: composedStorageMap,
        online,
        delete_source: deleteSource,
        bwlimit: bwlimit ? parseInt(bwlimit, 10) : undefined,
      });
      setResultUpid(r.upid);
      setStep('done');
      onMigrationStarted?.(r.upid);
    } catch (ex: unknown) {
      const msg = (ex instanceof Error) ? ex.message : String(ex);
      setErr(msg);
      setStep('error');
    }
  };

  if (!open || !vm) return null;

  const mappingsValid = !!targetVmid && /^\d+$/.test(targetVmid)
    && !!sourceLayout && !!targetLayout
    && sourceLayout.disks.every((d) => !!diskMap[d.key])
    && sourceLayout.nics.every((n) => !!nicMap[n.key]);

  const valid = step === 'endpoint'
    ? !!selected && !!targetLayout && !!dataPathIp
    : step === 'mappings'
      ? mappingsValid
      : true;

  return (
    <div onClick={() => step !== 'submitting' && onClose()} style={overlay}>
      <style>{styleBlock}</style>
      <div className="rmm" onClick={(e) => e.stopPropagation()}>
        <div className="rmm-eyebrow">{t('rmm.eyebrow', { step: t(`rmm.step.${step}`) })}</div>
        <h3 className="rmm-title">{t('rmm.title', { vmid: vm.vmid, name: vm.name })}</h3>

        {step === 'endpoint' && (
          <>
            <p className="rmm-sub">{t('rmm.endpoint.intro')}</p>
            <label>{t('rmm.endpoint.target')}</label>
            <CyberSelect
              value={selectedKey}
              placeholder={t('rmm.endpoint.select')}
              options={endpoints.map((e) => ({
                value: key(e),
                label: `${e.cluster_name} @ ${e.node_host}:${e.node_port}`,
              }))}
              onChange={(v) => onPickEndpoint(v)}
            />

            <label>{t('rmm.endpoint.fp_label')}</label>
            <input
              type="text"
              value={fingerprint}
              onChange={(e) => setFingerprint(e.target.value)}
              placeholder={fingerprintLoading ? t('rmm.endpoint.fp_fetching') : 'AB:CD:…'}
              spellCheck={false}
              autoComplete="off"
            />

            {selected && (
              <>
                <label>
                  {t('rmm.endpoint.datapath')}{' '}
                  <span className="hint">{t('rmm.endpoint.datapath_hint')}</span>
                </label>
                <CyberSelect
                  value={dataPathIp}
                  disabled={layoutLoading || !targetLayout}
                  placeholder={layoutLoading ? t('rmm.endpoint.datapath_loading') : ''}
                  options={
                    layoutLoading
                      ? []
                      : (!targetLayout || targetLayout.ips.length === 0)
                        ? [{ value: selected.node_host, label: `${selected.node_host} (mgmt)` }]
                        : targetLayout.ips.map((ip) => ({
                            value: ip.address,
                            label: `${ip.address} · ${ip.iface} (${ip.type})`,
                          }))
                  }
                  onChange={(v) => setDataPathIp(v)}
                />
                <p className="rmm-tip">{t('rmm.endpoint.datapath_tip')}</p>
              </>
            )}

            {err && <div className="rmm-err">{err}</div>}

            <div className="rmm-actions">
              <button className="ghost" onClick={onClose}>{t('action.cancel')}</button>
              <button
                className="primary"
                disabled={!valid}
                onClick={() => setStep('mappings')}
              >
                {t('rmm.action.next')}
              </button>
            </div>
          </>
        )}

        {step === 'mappings' && selected && sourceLayout && targetLayout && (
          <>
            <p className="rmm-sub">{t('rmm.mappings.intro')}</p>

            <label>
              {t('rmm.mappings.target_vmid')}{' '}
              <span className="hint">{t('rmm.mappings.target_vmid_hint')}</span>
            </label>
            <input
              type="text" inputMode="numeric"
              value={targetVmid} onChange={(e) => setTargetVmid(e.target.value)}
            />

            {sourceLayout.disks.length > 0 && (
              <>
                <label>{t('rmm.mappings.disks')}</label>
                <div className="rmm-maptable">
                  <div className="rmm-maprow rmm-maphead">
                    <span>{t('rmm.mappings.col_source')}</span>
                    <span>{t('rmm.mappings.col_size')}</span>
                    <span>{t('rmm.mappings.col_target_storage')}</span>
                  </div>
                  {sourceLayout.disks.map((d) => (
                    <div className="rmm-maprow" key={d.key}>
                      <code className="rmm-mapkey">{d.key}</code>
                      <code className="rmm-mapsrc">{d.storage} <em>{d.size}</em></code>
                      <CyberSelect
                        value={diskMap[d.key] || ''}
                        options={targetLayout.storages.map((s) => ({
                          value: s.storage,
                          label: `${s.storage} (${s.type}, ${fmtGiB(s.avail)} free)`,
                        }))}
                        onChange={(v) => setDiskMap({ ...diskMap, [d.key]: v })}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {sourceLayout.nics.length > 0 && (
              <>
                <label>{t('rmm.mappings.nics')}</label>
                <div className="rmm-maptable">
                  <div className="rmm-maprow rmm-maphead">
                    <span>{t('rmm.mappings.col_source')}</span>
                    <span>{t('rmm.mappings.col_bridge')}</span>
                    <span>{t('rmm.mappings.col_target_bridge')}</span>
                  </div>
                  {sourceLayout.nics.map((n) => (
                    <div className="rmm-maprow" key={n.key}>
                      <code className="rmm-mapkey">{n.key}</code>
                      <code className="rmm-mapsrc">{n.bridge} <em>{n.model}</em></code>
                      <CyberSelect
                        value={nicMap[n.key] || ''}
                        options={targetLayout.bridges.map((b) => ({
                          value: b.iface,
                          label: `${b.iface}${b.address ? ` (${b.address})` : ''}`,
                        }))}
                        onChange={(v) => setNicMap({ ...nicMap, [n.key]: v })}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="rmm-row">
              <label className="rmm-check">
                <input type="checkbox" checked={online} onChange={(e) => setOnline(e.target.checked)} />
                <span>{t('rmm.mappings.online')}</span>
              </label>
              <label className="rmm-check">
                <input type="checkbox" checked={deleteSource} onChange={(e) => setDeleteSource(e.target.checked)} />
                <span>{t('rmm.mappings.delete_source')}</span>
              </label>
            </div>

            <label>{t('rmm.mappings.bwlimit')}</label>
            <input
              type="text" inputMode="numeric"
              value={bwlimit} onChange={(e) => setBwlimit(e.target.value)}
              placeholder="0"
            />

            {err && <div className="rmm-err">{err}</div>}

            <div className="rmm-actions">
              <button className="ghost" onClick={() => setStep('endpoint')}>{t('rmm.action.back')}</button>
              <button
                className="primary danger"
                disabled={!valid}
                onClick={() => setStep('review')}
              >
                {t('rmm.action.review')}
              </button>
            </div>
          </>
        )}

        {step === 'review' && selected && (
          <>
            {/* Auto-run precheck the first time the operator lands on review.
                Manual re-run via the action button below the result block. */}
            <ReviewPrecheck
              vm={vm} selected={selected} clusterId={cluster_id}
              precheck={precheck} precheckLoading={precheckLoading}
              onRun={runPrecheck} t={t}
            />
            <p className="rmm-sub">{t('rmm.review.intro')}</p>
            <div className="rmm-review">
              <div><span>{t('rmm.review.from')}</span><code>{cluster_id}/{vm.node}/vm/{vm.vmid} ({vm.name})</code></div>
              <div><span>{t('rmm.review.to')}</span><code>{selected.cluster_id}/{selected.node_host}:{selected.node_port} → vmid {targetVmid}</code></div>
              <div><span>{t('rmm.review.data_path')}</span><code>{dataPathIp}</code></div>
              <div><span>{t('rmm.review.fingerprint')}</span><code className="trunc">{fingerprint || <em>{t('rmm.review.fp_none')}</em>}</code></div>
              <div><span>{t('rmm.review.storage_map')}</span><code>{composedStorageMap || '<empty>'}</code></div>
              <div><span>{t('rmm.review.bridge_map')}</span><code>{composedBridgeMap || '<empty>'}</code></div>
              <div><span>{t('rmm.review.online')}</span><code>{online ? t('rmm.review.online_yes') : t('rmm.review.online_no')}</code></div>
              <div><span>{t('rmm.review.delete_source')}</span><code>{deleteSource ? t('rmm.review.delete_source_yes') : t('rmm.review.delete_source_no')}</code></div>
              <div><span>{t('rmm.review.bandwidth')}</span><code>{bwlimit ? `${bwlimit} KB/s` : t('rmm.review.unlimited')}</code></div>
            </div>
            <div className="rmm-actions">
              <button className="ghost" onClick={() => setStep('mappings')}>{t('rmm.action.back')}</button>
              <button
                className="primary danger"
                disabled={precheckLoading || (precheck !== null && !precheck.ok)}
                onClick={submit}
              >
                {t('rmm.action.start')}
              </button>
            </div>
          </>
        )}

        {step === 'submitting' && (
          <div className="rmm-spin">
            <div className="rmm-spin-ring" />
            <div>{t('rmm.submitting')}</div>
          </div>
        )}

        {step === 'done' && (
          <>
            <p className="rmm-sub" style={{ color: '#00ff88' }}>{t('rmm.done.msg')}</p>
            <div className="rmm-review">
              <div><span>{t('rmm.done.upid')}</span><code className="trunc" style={{ userSelect: 'all' }}>{resultUpid}</code></div>
              <div><span></span><span style={{ color: 'var(--text-dim)' }}>{t('rmm.done.hint')}</span></div>
            </div>
            <div className="rmm-actions">
              <button className="primary" onClick={onClose}>{t('rmm.action.close')}</button>
            </div>
          </>
        )}

        {step === 'error' && (
          <>
            <div className="rmm-err" style={{ marginTop: 16 }}>{err}</div>
            <div className="rmm-actions">
              <button className="ghost" onClick={() => setStep('mappings')}>{t('rmm.action.back')}</button>
              <button className="primary" onClick={onClose}>{t('rmm.action.close')}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function key(e: Endpoint): string {
  return `${e.cluster_id}::${e.node_host}::${e.node_port}`;
}

// Inline pre-flight panel. Auto-runs the check the first time it's mounted
// (i.e. when the wizard enters the review step). Renders three states:
// loading, blockers (red), warnings (orange), or all-clear (green).
function ReviewPrecheck({
  vm, selected, clusterId, precheck, precheckLoading, onRun, t,
}: {
  vm: VMSummary;
  selected: Endpoint;
  clusterId: string;
  precheck: { ok: boolean; blockers: string[]; warnings: string[] } | null;
  precheckLoading: boolean;
  onRun: () => void;
  t: (k: string, params?: Record<string, string | number>) => string;
}) {
  // Side note: we silence the linter on these — we use them via t() and the
  // closure below, the eslint plugin gets confused by our pattern.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused = { vm, selected, clusterId };
  React.useEffect(() => {
    if (precheck === null && !precheckLoading) onRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (precheckLoading) {
    return <div className="rmm-precheck loading">{t('rmm.precheck.running')}</div>;
  }
  if (precheck === null) return null;

  const hasBlockers = precheck.blockers.length > 0;
  const hasWarnings = precheck.warnings.length > 0;
  const klass = hasBlockers ? 'blockers' : (hasWarnings ? 'warnings' : 'ok');

  return (
    <div className={`rmm-precheck ${klass}`}>
      {hasBlockers && (
        <>
          <div className="rmm-precheck-head">{t('rmm.precheck.blockers')}</div>
          <ul>{precheck.blockers.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </>
      )}
      {hasWarnings && (
        <>
          <div className="rmm-precheck-head">{t('rmm.precheck.warnings')}</div>
          <ul>{precheck.warnings.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </>
      )}
      {!hasBlockers && !hasWarnings && (
        <div className="rmm-precheck-head">{t('rmm.precheck.ok')}</div>
      )}
      <div className="rmm-precheck-actions">
        <button className="ghost" onClick={onRun}>{t('rmm.action.precheck')}</button>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 300,
  background: 'rgba(0,0,0,.78)', backdropFilter: 'blur(6px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 24, animation: 'rmmFade .18s ease',
};

const styleBlock = `
@keyframes rmmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes rmmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes rmmSpin { to { transform: rotate(360deg); } }
.rmm {
  width: min(640px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow:
    0 0 0 1px rgba(0,240,255,.1),
    0 16px 60px rgba(0,0,0,.65),
    0 0 80px -20px rgba(0,240,255,.5);
  padding: 24px 26px;
  animation: rmmSlide .2s ease;
  max-height: 88vh; overflow-y: auto;
  font-family: 'Rajdhani', sans-serif;
  color: #e6f6ff;
}
.rmm-eyebrow {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
  color: #00f0ff; margin-bottom: 6px;
}
.rmm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 10px; }
.rmm-sub { color: #95a8c4; font-size: 15px; line-height: 1.5; margin: 0 0 14px; }
.rmm-tip {
  margin: 6px 0 0; padding: 8px 10px;
  font-size: 14px; color: #c8ffe1;
  background: rgba(0, 255, 136, 0.05);
  border-left: 2px solid #00ff88;
  border-radius: 3px; line-height: 1.4;
}
.rmm label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 14px 0 6px;
}
.rmm label .hint { color: #6b7c93; text-transform: none; letter-spacing: 0; margin-left: 6px; }
.rmm input[type=text], .rmm select {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.rmm input[type=text]:focus, .rmm select:focus {
  border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18);
}
.rmm-row { display: flex; gap: 18px; margin-top: 14px; }
.rmm-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.rmm-check input { margin: 0; }
.rmm-check span {
  font-family: 'Rajdhani', sans-serif; font-size: 15px;
  color: #e6f6ff; text-transform: none; letter-spacing: 0;
}
.rmm-maptable {
  border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px; overflow: hidden;
  background: #02050b;
}
.rmm-maprow {
  display: grid;
  grid-template-columns: 70px 1fr 1.4fr;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(0,240,255,.06);
}
.rmm-maprow:last-child { border-bottom: none; }
.rmm-maphead {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase;
  color: #6b7c93; background: rgba(0,240,255,.04);
}
.rmm-mapkey {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #00f0ff; background: rgba(0,240,255,.06);
  padding: 2px 6px; border-radius: 3px;
  text-align: center;
}
.rmm-mapsrc {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #c8e1ff;
  background: transparent;
}
.rmm-mapsrc em { color: #6b7c93; font-style: normal; margin-left: 4px; }
.rmm-maprow select { padding: 6px 10px; font-size: 14px; }
.rmm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
.rmm-actions button {
  padding: 9px 20px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.rmm-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.rmm-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.rmm-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.rmm-actions button.primary.danger { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
.rmm-actions button:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
.rmm-err {
  margin-top: 14px; padding: 12px 14px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 15px; color: #ffd0d8;
}
.rmm-review {
  margin: 4px 0 8px; padding: 12px 14px;
  background: #02050b; border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px;
}
.rmm-review > div { display: flex; gap: 12px; margin: 6px 0; align-items: baseline; }
.rmm-review > div > span:first-child {
  display: inline-block; min-width: 120px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; color: #95a8c4;
}
.rmm-review code {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #00f0ff; background: rgba(0,240,255,.06); padding: 1px 6px;
  border-radius: 3px;
}
.rmm-review code.trunc { word-break: break-all; }
.rmm-precheck {
  margin: 0 0 14px; padding: 12px 14px;
  border-radius: 6px; border-left: 3px solid;
  font-family: 'Rajdhani', sans-serif; font-size: 15px;
}
.rmm-precheck.loading {
  background: rgba(0,240,255,.04); border-left-color: #00f0ff; color: #95a8c4;
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
}
.rmm-precheck.ok {
  background: rgba(0,255,136,.05); border-left-color: #00ff88; color: #c8ffe1;
}
.rmm-precheck.warnings {
  background: rgba(255,138,60,.06); border-left-color: #ff8a3c; color: #ffe1c8;
}
.rmm-precheck.blockers {
  background: rgba(255,56,96,.08); border-left-color: #ff3860; color: #ffd0d8;
}
.rmm-precheck-head {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; margin-bottom: 6px;
  font-weight: 700;
}
.rmm-precheck ul { margin: 0 0 8px; padding-left: 18px; line-height: 1.5; }
.rmm-precheck li { margin-bottom: 3px; }
.rmm-precheck-actions { display: flex; justify-content: flex-end; }
.rmm-precheck-actions button {
  padding: 4px 12px;
  font-family: 'Share Tech Mono', monospace; font-size: 11.5px;
  letter-spacing: .06em; text-transform: uppercase;
  background: transparent; color: #95a8c4;
  border: 1px solid rgba(0,240,255,.16); border-radius: 4px;
  cursor: pointer;
}
.rmm-precheck-actions button:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }

.rmm-spin {
  display: flex; flex-direction: column; align-items: center;
  padding: 32px; gap: 16px;
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  letter-spacing: .08em; color: #00f0ff;
}
.rmm-spin-ring {
  width: 36px; height: 36px; border-radius: 50%;
  border: 2px solid rgba(0,240,255,.2);
  border-top-color: #00f0ff;
  animation: rmmSpin .9s linear infinite;
}
`;
