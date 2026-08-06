/**
 * NodeNTPModal — per-node chrony configuration (admin only).
 *
 * Reads sync state + sources via `chronyc` over SSH (server/node_ntp.py)
 * and writes a jt-proxense drop-in to /etc/chrony/conf.d — the distro's
 * own chrony.conf is never touched, so clearing the drop-in always
 * falls back to stock behaviour.
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { SSHSetupModal } from './SSHSetupModal';

// asyncssh auth failures surface as "Permission denied" / "publickey" —
// detect them so we can offer the SSH-setup SOP instead of a dead end.
const isSshAuthErr = (msg: string) =>
  /permission denied|publickey|authentication|no authentication|connection refused|host key/i.test(msg);

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  node: string;
}

export function NodeNTPModal({ open, onClose, clusterId, node }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [tracking, setTracking] = useState('');
  const [sources, setSources] = useState('');
  const [servers, setServers] = useState<string[]>([]);
  const [baseServers, setBaseServers] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [applied, setApplied] = useState<string | null>(null);
  const [sshHelp, setSshHelp] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true); setErr(null); setApplied(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/ntp`,
        { credentials: 'same-origin' });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setTracking(d.tracking || '');
      setSources(d.sources || '');
      setServers(d.servers || []);
      setBaseServers(d.base_servers || []);
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, [clusterId, node]);

  useEffect(() => { if (open) reload(); }, [open, reload]);

  if (!open) return null;

  const put = async (list: string[], confirmKey: string) => {
    const ok = await dialog.confirm(
      t(confirmKey, { n: list.length, node }),
      { destructive: false });
    if (!ok) return;
    setBusy(true); setErr(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/ntp`,
        { method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ servers: list }) });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setApplied(d.sources || '');
      await reload();
    } catch (e: any) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  const addDraft = () => {
    const s = draft.trim();
    if (!s || servers.includes(s)) return;
    setServers((prev) => [...prev, s]);
    setDraft('');
  };

  return (
    <div className="ntp-back" onClick={() => !busy && onClose()}>
      <div className="ntp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ntp-head">
          <span>{t('ntp.title')} · {node}</span>
          <button className="ntp-close" onClick={() => !busy && onClose()}>×</button>
        </div>
        <div className="ntp-body">
          {err && (
            <div className="ntp-error">
              <span>{err}</span>
              {isSshAuthErr(err) && (
                <button className="ntp-btn" style={{ marginTop: 8 }} onClick={() => setSshHelp(true)}>
                  {t('sshsetup.button')}
                </button>
              )}
            </div>
          )}
          <SSHSetupModal open={sshHelp} onClose={() => setSshHelp(false)} nodes={[node]} clusterId={clusterId} />
          {loading && <div className="ntp-loading">{t('ntp.loading')}</div>}

          {!loading && (
            <>
              <div className="ntp-section-h">{t('ntp.servers')}</div>
              {servers.length === 0 && (
                <div className="ntp-hint">{t('ntp.empty_servers')}</div>
              )}
              {servers.map((s) => (
                <div key={s} className="ntp-server-row">
                  <span className="ntp-mono">{s}</span>
                  <button className="ntp-del" disabled={busy}
                          onClick={() => setServers((prev) => prev.filter((x) => x !== s))}>
                    ×
                  </button>
                </div>
              ))}
              <div className="ntp-add-row">
                <input className="ntp-input" value={draft}
                       placeholder={t('ntp.placeholder')}
                       onChange={(e) => setDraft(e.target.value)}
                       onKeyDown={(e) => { if (e.key === 'Enter') addDraft(); }} />
                <button className="ntp-btn" onClick={addDraft} disabled={busy || !draft.trim()}>
                  {t('ntp.add')}
                </button>
              </div>
              <div className="ntp-actions">
                <button className="ntp-btn ghost" disabled={busy}
                        onClick={() => put([], 'ntp.confirm_clear')}>
                  {t('ntp.clear')}
                </button>
                <button className="ntp-btn primary" disabled={busy || servers.length === 0}
                        onClick={() => put(servers, 'ntp.confirm')}>
                  {t('ntp.apply')}
                </button>
              </div>

              {applied != null && (
                <>
                  <div className="ntp-section-h ok">{t('ntp.applied')}</div>
                  <pre className="ntp-pre">{applied}</pre>
                </>
              )}

              {baseServers.length > 0 && (
                <>
                  <div className="ntp-section-h">{t('ntp.base')}</div>
                  <pre className="ntp-pre">{baseServers.join('\n')}</pre>
                </>
              )}

              <div className="ntp-section-h">{t('ntp.tracking')}</div>
              <pre className="ntp-pre">{tracking || '—'}</pre>

              <div className="ntp-section-h">{t('ntp.sources')}</div>
              <pre className="ntp-pre">{sources || '—'}</pre>
            </>
          )}
        </div>
        <style>{`
          .ntp-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .ntp-modal { width: min(680px, 96vw); max-height: 88vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary-dim); border-radius: 6px; box-shadow: 0 0 32px rgba(0, 240, 255, 0.2); overflow: hidden; animation: ntp-in .18s ease-out; }
          @keyframes ntp-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ntp-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.25); color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .1em; text-transform: uppercase; }
          .ntp-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .ntp-body { flex: 1; overflow: auto; padding: 14px 18px; display: flex; flex-direction: column; gap: 10px; }
          .ntp-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .ntp-loading { color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; padding: 18px 0; }
          .ntp-section-h { font-family: var(--font-display); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--primary); border-bottom: 1px solid rgba(0,240,255,.16); padding-bottom: 5px; margin-top: 6px; }
          .ntp-section-h.ok { color: var(--success); border-bottom-color: rgba(0,255,136,.25); }
          .ntp-hint { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); }
          .ntp-server-row { display: flex; align-items: center; gap: 10px; padding: 7px 12px; border: 1px solid rgba(0,240,255,.16); border-radius: 4px; }
          .ntp-server-row .ntp-mono { flex: 1; }
          .ntp-mono { font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); }
          .ntp-del { background: transparent; border: 1px solid rgba(255,77,109,.4); border-radius: 3px; color: var(--danger, #ff4d6d); width: 24px; height: 24px; cursor: pointer; line-height: 1; }
          .ntp-del:hover { background: rgba(255,77,109,.12); }
          .ntp-add-row { display: flex; gap: 8px; }
          .ntp-input { flex: 1; height: 36px; box-sizing: border-box; padding: 6px 12px; background: #02050b; border: 1px solid rgba(0,240,255,.2); border-radius: 4px; color: var(--text-primary); font-family: var(--font-mono); font-size: 14px; outline: none; }
          .ntp-input:focus { border-color: var(--primary); }
          .ntp-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 4px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); color: var(--primary); font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; white-space: nowrap; }
          .ntp-btn:hover:not(:disabled) { background: rgba(0,240,255,.16); }
          .ntp-btn:disabled { opacity: .45; cursor: not-allowed; }
          .ntp-btn.primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .ntp-btn.ghost { color: var(--text-secondary); border-color: var(--border); background: transparent; }
          .ntp-actions { display: flex; justify-content: flex-end; gap: 10px; }
          .ntp-pre { margin: 0; padding: 10px 12px; background: rgba(0,0,0,.4); border: 1px solid rgba(0,240,255,.12); border-radius: 3px; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; color: var(--text-secondary); white-space: pre-wrap; word-break: break-word; max-height: 220px; overflow: auto; }
        `}</style>
      </div>
    </div>
  );
}
