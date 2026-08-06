/**
 * BackupModal — kick off an ad-hoc vzdump for a single VM/CT.
 *
 * The storage list is filtered on the client from the existing cluster
 * snapshot rather than a dedicated endpoint: we look for storages whose
 * `content` array includes "backup" AND that are usable from the VM's node
 * (no allowed_nodes restriction, or this node is in the allow list).
 */
import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { useTranslation } from '../i18n';
import type { StorageMetrics } from '../types';

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
}

export function BackupModal({ open, cluster_id, vm, onClose }: Props) {
  const { t } = useTranslation();
  const [storages, setStorages] = useState<StorageMetrics[]>([]);
  const [loading, setLoading] = useState(false);
  const [storage, setStorage] = useState('');
  const [mode, setMode] = useState<'snapshot' | 'suspend' | 'stop'>('snapshot');
  const [compress, setCompress] = useState<'zstd' | 'lzo' | 'gzip' | '0'>('zstd');
  const [notesTemplate, setNotesTemplate] = useState('{{guestname}}');
  const [isProtected, setIsProtected] = useState(false);
  const [mailNotify, setMailNotify] = useState<'always' | 'failure'>('failure');
  const [mailto, setMailto] = useState('');
  const [err, setErr] = useState('');
  const [resultUpid, setResultUpid] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open || !vm) return;
    setErr(''); setResultUpid(''); setStorage('');
    setNotesTemplate('{{guestname}}'); setIsProtected(false);
    setMailNotify('failure'); setMailto('');
    setLoading(true);
    api.getCluster(cluster_id)
      .then((c) => {
        const all = Object.values(c.storages || {}) as StorageMetrics[];
        const eligible = all.filter((s) => {
          if (!s.content?.includes('backup')) return false;
          // PVE allows-nodes: empty array means "all nodes", otherwise must include vm.node.
          const allowed = s.allowed_nodes || [];
          if (allowed.length > 0 && !allowed.includes(vm.node)) return false;
          // Same-node local storages only: shared OR node matches.
          if (!s.shared && s.node !== vm.node) return false;
          return s.enabled !== false;
        });
        // Dedup by storage name: a shared storage shows up once per node
        // in the cluster cache (e.g. host-107-pbs-cluster1 on 5 nodes →
        // 5 identical rows). Keep the first occurrence per name so the
        // operator sees one entry, not "host-107-pbs-cluster1" repeated.
        const seen = new Set<string>();
        const deduped: StorageMetrics[] = [];
        for (const s of eligible) {
          if (seen.has(s.storage)) continue;
          seen.add(s.storage);
          deduped.push(s);
        }
        setStorages(deduped);
        if (deduped.length > 0) setStorage(deduped[0].storage);
      })
      .catch((e) => setErr(e.message || String(e)))
      .finally(() => setLoading(false));
  }, [open, cluster_id, vm?.vmid, vm?.node]);

  // Identify whether the selected storage is PBS — drives the UI variant
  // (no compression, expose protected + notes-template). PVE silently
  // ignores `compress` for PBS storages because PBS does chunk-level
  // dedup at the snapshot index layer, not file-level compression.
  const selectedStorageType = useMemo(() => {
    const s = storages.find((x) => x.storage === storage);
    return (s?.type || '').toLowerCase();
  }, [storage, storages]);
  const isPBS = selectedStorageType === 'pbs';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !submitting) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, submitting, onClose]);

  if (!open || !vm) return null;

  const hasStorage = storages.length > 0;

  const submit = async () => {
    if (!storage) return;
    setSubmitting(true); setErr('');
    try {
      const body: Parameters<typeof api.triggerBackup>[2] = {
        vmid: vm.vmid, storage, mode,
      };
      if (!isPBS) body.compress = compress;
      if (notesTemplate.trim()) body['notes-template'] = notesTemplate.trim();
      if (isProtected) body.protected = true;
      if (mailto.trim()) {
        body.mailto = mailto.trim();
        body.mailnotification = mailNotify;
      }
      const r = await api.triggerBackup(cluster_id, vm.node, body);
      setResultUpid(r.upid);
    } catch (e: unknown) {
      setErr((e instanceof Error) ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div onClick={() => !submitting && onClose()} style={overlay}>
      <style>{styleBlock}</style>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bm-eyebrow">// backup · {cluster_id} · {vm.node}</div>
        <h3 className="bm-title">{t('backup.title', { vmid: vm.vmid, name: vm.name })}</h3>

        {!resultUpid && (
          <>
            <label>{t('backup.storage')}</label>
            {loading ? (
              <div className="bm-empty">…</div>
            ) : !hasStorage ? (
              <div className="bm-err">{t('backup.no_backup_storage')}</div>
            ) : (
              <select value={storage} onChange={(e) => setStorage(e.target.value)}>
                {storages.map((s) => (
                  <option key={s.storage} value={s.storage}>
                    {s.storage} ({s.type}{s.shared ? ', shared' : ''})
                  </option>
                ))}
              </select>
            )}

            <label>{t('backup.mode')}</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
              <option value="snapshot">{t('backup.mode_snapshot')}</option>
              <option value="suspend">{t('backup.mode_suspend')}</option>
              <option value="stop">{t('backup.mode_stop')}</option>
            </select>

            {!isPBS && (
              <>
                <label>{t('backup.compress')}</label>
                <select value={compress} onChange={(e) => setCompress(e.target.value as typeof compress)}>
                  <option value="zstd">zstd</option>
                  <option value="lzo">lzo</option>
                  <option value="gzip">gzip</option>
                  <option value="0">none</option>
                </select>
              </>
            )}
            {isPBS && (
              <div className="bm-hint">{t('backup.pbs_no_compress')}</div>
            )}

            <label>{t('backup.notes_template')}</label>
            <input type="text" value={notesTemplate}
                   onChange={(e) => setNotesTemplate(e.target.value)}
                   placeholder="{{guestname}}" />
            <div className="bm-hint">{t('backup.notes_template_help')}</div>

            <label className="bm-check-row">
              <input type="checkbox" checked={isProtected}
                     onChange={(e) => setIsProtected(e.target.checked)} />
              <span>{t('backup.protected')}</span>
            </label>
            <div className="bm-hint bm-hint-tight">{t('backup.protected_help')}</div>

            <label>{t('backup.mailto')}</label>
            <input type="text" value={mailto}
                   onChange={(e) => setMailto(e.target.value)}
                   placeholder="ops@example.com" />
            {mailto.trim() && (
              <select value={mailNotify} onChange={(e) => setMailNotify(e.target.value as typeof mailNotify)}
                      style={{ marginTop: 6 }}>
                <option value="failure">{t('backup.mail_failure')}</option>
                <option value="always">{t('backup.mail_always')}</option>
              </select>
            )}

            {err && <div className="bm-err">{err}</div>}

            <div className="bm-actions">
              <button className="bm-btn ghost" onClick={onClose} disabled={submitting}>{t('action.cancel')}</button>
              <button className="bm-btn primary" disabled={submitting || !storage} onClick={submit}>
                {submitting ? '…' : t('backup.start')}
              </button>
            </div>
          </>
        )}

        {resultUpid && (
          <>
            <p className="bm-ok">{t('backup.started')}</p>
            <div className="bm-review">
              <div><span>{t('rmm.done.upid')}</span><code style={{ userSelect: 'all' }}>{resultUpid}</code></div>
            </div>
            <div className="bm-actions">
              <button className="bm-btn primary" onClick={onClose}>{t('action.close')}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 300,
  background: 'rgba(0,0,0,.78)', backdropFilter: 'blur(6px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 24, animation: 'bmFade .18s ease',
};

const styleBlock = `
@keyframes bmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes bmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.bm-modal {
  width: min(520px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 24px 26px; animation: bmSlide .2s ease;
  max-height: 88vh; overflow-y: auto;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.bm-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.bm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 16px; }
.bm-modal label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 14px 0 6px;
}
.bm-modal select, .bm-modal input[type=text] {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px; outline: none;
}
.bm-modal select:focus, .bm-modal input[type=text]:focus {
  border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18);
}
.bm-empty { padding: 12px; color: #6b7c93; font-family: 'Share Tech Mono', monospace; font-size: 14px; }
.bm-hint {
  margin-top: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 13.5px;
  color: #6b7c93; line-height: 1.5;
}
.bm-hint-tight { margin-top: 2px; margin-bottom: 6px; }
.bm-check-row {
  display: flex; align-items: center; gap: 10px;
  margin: 14px 0 0;
  cursor: pointer;
  text-transform: none !important;
  letter-spacing: normal !important;
  font-size: 14px !important;
  color: #e6f6ff !important;
}
.bm-check-row input { accent-color: #00f0ff; width: 16px; height: 16px; }
.bm-check-row span { font-family: 'Share Tech Mono', monospace; }
.bm-err {
  margin-top: 14px; padding: 12px 14px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 15px; color: #ffd0d8;
}
.bm-ok { color: #00ff88; font-size: 15px; margin: 8px 0 12px; }
.bm-review {
  margin: 4px 0 8px; padding: 12px 14px;
  background: #02050b; border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px;
}
.bm-review > div { display: flex; gap: 12px; margin: 6px 0; align-items: baseline; }
.bm-review > div > span:first-child {
  display: inline-block; min-width: 60px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; color: #95a8c4;
}
.bm-review code {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #00f0ff; background: rgba(0,240,255,.06); padding: 1px 6px;
  border-radius: 3px; word-break: break-all;
}
.bm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
.bm-btn {
  padding: 9px 20px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.bm-btn.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.bm-btn.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.bm-btn.primary { color: #001018; background: linear-gradient(135deg,#00f0ff,#00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.bm-btn:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
`;
