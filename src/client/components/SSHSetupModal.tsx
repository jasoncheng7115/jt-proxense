/**
 * SSHSetupModal — copy-paste SOP for enabling the passwordless root SSH
 * that all node-level features (NTP, host upgrade, VM export, storage
 * download) depend on. Surfaced wherever an SSH "permission denied"
 * error appears, and from Settings.
 *
 * Fetches the jt-proxense host's own public key (GET /api/ssh/pubkey)
 * so the operator can paste it or run the prefilled ssh-copy-id.
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { CyberSelect } from './CyberSelect';

interface Props {
  open: boolean;
  onClose: () => void;
  /** Optional node host hints to prefill the example commands. */
  nodes?: string[];
  /** When set, preselect this cluster in the propagate picker. */
  clusterId?: string;
}

interface ClusterTarget { id: string; name: string; nodes: string[]; }

function CopyLine({ text }: { text: string }) {
  const { t } = useTranslation();
  const [done, setDone] = useState(false);
  return (
    <div className="ssh-code">
      <code>{text}</code>
      <button className="ssh-copy" onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          window.setTimeout(() => setDone(false), 1500);
        } catch { /* clipboard denied — text is selectable */ }
      }}>{done ? t('sshsetup.copied') : t('sshsetup.copy')}</button>
    </div>
  );
}

export function SSHSetupModal({ open, onClose, nodes, clusterId }: Props) {
  const { t } = useTranslation();
  const [pubkey, setPubkey] = useState('');
  const [loading, setLoading] = useState(false);

  // Propagation state.
  const [targets, setTargets] = useState<ClusterTarget[]>([]);
  const [propCluster, setPropCluster] = useState('');
  const [seedNode, setSeedNode] = useState('');
  const [propBusy, setPropBusy] = useState(false);
  const [propResult, setPropResult] = useState<{ host: string; ok: boolean }[] | null>(null);
  const [propErr, setPropErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/ssh/pubkey', { credentials: 'same-origin' });
      const d = await r.json();
      if (r.ok && d.ok) setPubkey(d.pubkey || '');
    } catch { /* leave blank — the manual steps still apply */ }
    finally { setLoading(false); }
    try {
      const r = await fetch('/api/ssh/targets', { credentials: 'same-origin' });
      const d = await r.json();
      if (r.ok && d.ok) {
        const cls: ClusterTarget[] = d.clusters || [];
        setTargets(cls);
        const pick = (clusterId && cls.find((c) => c.id === clusterId)) || cls[0];
        if (pick) { setPropCluster(pick.id); setSeedNode(pick.nodes[0] || ''); }
      }
    } catch { /* propagate section just won't render */ }
  }, [clusterId]);

  useEffect(() => { if (open) { setPropResult(null); setPropErr(null); load(); } }, [open, load]);

  if (!open) return null;

  const curCluster = targets.find((c) => c.id === propCluster);

  const propagate = async () => {
    setPropBusy(true); setPropErr(null); setPropResult(null);
    try {
      const r = await fetch('/api/ssh/propagate', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cluster_id: propCluster, seed_node: seedNode }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.message || d.error || `HTTP ${r.status}`);
      setPropResult(d.results || []);
    } catch (e: any) {
      setPropErr(e.message || String(e));
    } finally {
      setPropBusy(false);
    }
  };

  const hosts = (nodes && nodes.length > 0 ? nodes : ['NODE-HOST']).join(' ');
  const copyCmd = `for h in ${hosts}; do ssh-copy-id -i ~/.ssh/id_ed25519.pub root@$h; done`;
  const verifyCmd = `for h in ${hosts}; do ssh -o BatchMode=yes root@$h hostname; done`;

  return (
    <div className="ssh-back" onClick={onClose}>
      <div className="ssh-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ssh-head">
          <span>{t('sshsetup.title')}</span>
          <button className="ssh-close" onClick={onClose}>×</button>
        </div>
        <div className="ssh-body">
          <p className="ssh-intro">{t('sshsetup.intro')}</p>

          <div className="ssh-sec-h">{t('sshsetup.pubkey')}</div>
          {loading ? (
            <div className="ssh-loading">{t('sshsetup.loading')}</div>
          ) : (
            <CopyLine text={pubkey || '(no key)'} />
          )}

          <div className="ssh-sec-h">{t('sshsetup.step1')}</div>
          <CopyLine text={copyCmd} />

          <div className="ssh-sec-h">{t('sshsetup.step3')}</div>
          <CopyLine text={verifyCmd} />

          <p className="ssh-note">{t('sshsetup.step2')}</p>

          {targets.length > 0 && (
            <div className="ssh-prop">
              <div className="ssh-sec-h">{t('sshsetup.prop_title')}</div>
              <p className="ssh-intro">{t('sshsetup.prop_intro')}</p>
              <div className="ssh-prop-row">
                <label>{t('sshsetup.prop_cluster')}</label>
                <CyberSelect
                  value={propCluster}
                  options={targets.map((c) => ({ value: c.id, label: c.name }))}
                  onChange={(v) => {
                    setPropCluster(v);
                    const c = targets.find((x) => x.id === v);
                    setSeedNode(c?.nodes[0] || '');
                    setPropResult(null); setPropErr(null);
                  }}
                />
              </div>
              <div className="ssh-prop-row">
                <label>{t('sshsetup.prop_seed')}</label>
                <CyberSelect
                  value={seedNode}
                  options={(curCluster?.nodes || []).map((n) => ({ value: n, label: n }))}
                  onChange={setSeedNode}
                />
              </div>
              {curCluster && curCluster.nodes.length < 2 ? (
                <div className="ssh-note">{t('sshsetup.prop_single')}</div>
              ) : (
                <button className="ssh-copy ssh-prop-go" disabled={propBusy || !seedNode}
                        onClick={propagate}>
                  {propBusy ? t('sshsetup.prop_running') : t('sshsetup.prop_go')}
                </button>
              )}
              {propErr && <div className="ssh-prop-err">{propErr}</div>}
              {propResult && (
                <>
                  <div className="ssh-note">
                    {t('sshsetup.prop_done', {
                      ok: propResult.filter((x) => x.ok).length, n: propResult.length })}
                  </div>
                  <div className="ssh-prop-list">
                    {propResult.map((x) => (
                      <div key={x.host} className={`ssh-prop-item ${x.ok ? 'ok' : 'fail'}`}>
                        <span>{x.ok ? '✓' : '✕'}</span><span>{x.host}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <style>{`
          .ssh-back { position: fixed; inset: 0; background: rgba(2,4,10,.7); display: flex; align-items: center; justify-content: center; z-index: 10001; }
          .ssh-modal { width: min(720px, 96vw); max-height: 88vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,.25); overflow: hidden; animation: ssh-in .18s ease-out; }
          @keyframes ssh-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ssh-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.25); color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .1em; text-transform: uppercase; }
          .ssh-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .ssh-body { flex: 1; overflow: auto; padding: 16px 18px; display: flex; flex-direction: column; gap: 10px; }
          .ssh-intro { margin: 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.7; color: var(--text-secondary); }
          .ssh-note { margin: 4px 0 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.7; color: var(--text-muted); }
          .ssh-sec-h { font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; color: var(--primary); margin-top: 6px; }
          .ssh-loading { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); font-style: italic; }
          .ssh-code { display: flex; align-items: stretch; gap: 8px; background: rgba(0,0,0,.45); border: 1px solid rgba(0,240,255,.16); border-radius: 4px; padding: 10px 12px; }
          .ssh-code code { flex: 1; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; color: var(--text-primary); white-space: pre-wrap; word-break: break-all; user-select: all; }
          .ssh-copy { flex-shrink: 0; align-self: flex-start; padding: 5px 12px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); border-radius: 3px; color: var(--primary); font-family: var(--font-display); font-size: 13.5px; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; white-space: nowrap; }
          .ssh-copy:hover { background: rgba(0,240,255,.16); }
          .ssh-prop { margin-top: 8px; border-top: 1px solid rgba(0,240,255,.16); padding-top: 12px; display: flex; flex-direction: column; gap: 10px; }
          .ssh-prop-row { display: flex; align-items: center; gap: 12px; }
          .ssh-prop-row > label { flex: 0 0 130px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .06em; text-transform: uppercase; color: var(--text-secondary); }
          .ssh-prop-row > :last-child { flex: 1; min-width: 0; }
          .ssh-prop-go { align-self: flex-start; padding: 8px 16px; }
          .ssh-prop-err { padding: 8px 12px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .ssh-prop-list { display: flex; flex-wrap: wrap; gap: 6px; }
          .ssh-prop-item { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 3px; font-family: var(--font-mono); font-size: 13.5px; border: 1px solid currentColor; }
          .ssh-prop-item.ok { color: var(--success); }
          .ssh-prop-item.fail { color: var(--danger, #ff4d6d); }
        `}</style>
      </div>
    </div>
  );
}
