/**
 * Pinned TLS certificate / SSH host-key fingerprints of PVE nodes (v1.2.0).
 * Backend: server/trust_store.py + trust_admin.py (admin only).
 *
 *   TrustedFingerprints — the Settings → Server section: every pin, with a
 *                         refused (changed) fingerprint shown beside it and an
 *                         Accept button.
 *   FingerprintAlert    — a fixed card (bottom right), for admins, while any
 *                         fingerprint is refused: a refused node is a node we
 *                         are no longer talking to, which otherwise just looks
 *                         like it went offline.
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Entry {
  kind: 'tls' | 'ssh';
  endpoint: string;
  fingerprint: string;
  first_seen: number;
  pending: string | null;
  pending_seen: number | null;
}

interface TrustResp { enabled: boolean; entries: Entry[]; pending: number }

async function fetchTrust(): Promise<TrustResp | null> {
  const r = await fetch('/api/trust', { credentials: 'same-origin' });
  if (r.status === 401 || r.status === 403) return null;   // not an admin
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

const fmtTs = (s?: number | null) => {
  if (!s) return '—';
  const d = new Date(s * 1000);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

// sha256 hex → colon pairs, the way PVE's certificate panel prints it.
const fmtFp = (fp: string, kind: string) =>
  kind === 'tls' ? (fp.toUpperCase().match(/.{2}/g) || []).join(':') : fp;

export function TrustedFingerprints() {
  const { language } = useTranslation();
  const zh = language === 'zh-TW';
  const L = (z: string, e: string) => (zh ? z : e);
  const dialog = useDialogs();
  const [data, setData] = useState<TrustResp | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try { setData(await fetchTrust()); setError(null); }
    catch (e: any) { setError(e.message || String(e)); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const act = async (action: 'accept' | 'forget', e: Entry) => {
    const ok = await dialog.confirm(
      action === 'accept'
        ? L(`接受 ${e.endpoint} 的新${e.kind === 'tls' ? '憑證' : '主機金鑰'}指紋？\n\n只有在確定這台節點重新安裝過或更換過憑證時才接受。來路不明的指紋變更，也可能是連線被攔截。\n\n新指紋：${fmtFp(e.pending || '', e.kind)}`,
            `Accept the new ${e.kind === 'tls' ? 'certificate' : 'host key'} fingerprint of ${e.endpoint}?\n\nOnly accept it if you know this node was re-installed or its certificate renewed. An unexplained change can also mean the connection is being intercepted.\n\nNew fingerprint: ${fmtFp(e.pending || '', e.kind)}`)
        : L(`忘記 ${e.endpoint} 的指紋？下一次連線時會直接信任它出示的指紋。`,
            `Forget the fingerprint of ${e.endpoint}? The next connection will trust whatever it presents.`),
      { title: action === 'accept' ? L('接受新指紋', 'Accept new fingerprint') : L('忘記指紋', 'Forget fingerprint'),
        destructive: action === 'forget' },
    );
    if (!ok) return;
    setBusy(`${e.kind}|${e.endpoint}`);
    try {
      const r = await fetch(`/api/trust/${action}`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: e.kind, endpoint: e.endpoint }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
      await load();
    } catch (err: any) {
      await dialog.alert(`${L('失敗', 'Failed')}: ${err.message || err}`);
    } finally {
      setBusy(null);
    }
  };

  if (data === null && !error) return null;       // not an admin (or loading)

  return (
    <div className="settings-section tf-wrap">
      <h3 className="section-title">{L('受信任的節點指紋', 'Trusted node fingerprints')}</h3>
      <p className="section-hint">
        {L('第一次連到每個節點時，會記下它的 TLS 憑證與 SSH 主機金鑰指紋；之後只接受同一個指紋。指紋改變 (重新安裝、更換憑證，或連線被攔截) 時連線會被拒絕，直到你在這裡確認。',
           'The first connection to each node records its TLS certificate and SSH host-key fingerprint; afterwards only that fingerprint is accepted. When it changes (re-install, renewed certificate — or interception) the connection is refused until you confirm it here.')}
      </p>
      {data && !data.enabled && (
        <div className="tf-warn">{L('已停用 (server.tls_pinning: false)，目前接受任何憑證與主機金鑰。', 'Disabled (server.tls_pinning: false): any certificate and host key is accepted.')}</div>
      )}
      {error && <div className="tf-warn">{error}</div>}
      {data && data.entries.length === 0 && (
        <div className="tf-empty">{L('還沒有記錄任何指紋 (第一次連線時才會記錄)。', 'No fingerprints recorded yet (they are recorded on first contact).')}</div>
      )}
      {data && data.entries.length > 0 && (
        <div className="tf-list">
          {data.entries.map((e) => {
            const key = `${e.kind}|${e.endpoint}`;
            return (
              <div key={key} className={`tf-row ${e.pending ? 'tf-refused' : ''}`}>
                <div className="tf-head">
                  <span className="tf-kind">{e.kind.toUpperCase()}</span>
                  <span className="tf-ep">{e.endpoint}</span>
                  <span className="tf-since">{L('記錄於', 'since')} {fmtTs(e.first_seen)}</span>
                  <span className="tf-actions">
                    {e.pending && (
                      <button className="tf-btn tf-accept" disabled={busy === key} onClick={() => act('accept', e)}>
                        {L('接受新指紋', 'Accept new')}
                      </button>
                    )}
                    <button className="tf-btn" disabled={busy === key} onClick={() => act('forget', e)}>
                      {L('忘記', 'Forget')}
                    </button>
                  </span>
                </div>
                <div className="tf-fp" title={e.fingerprint}>{fmtFp(e.fingerprint, e.kind)}</div>
                {e.pending && (
                  <div className="tf-pending">
                    <span className="tf-dot" />
                    {L('已拒絕的新指紋', 'Refused new fingerprint')} ({fmtTs(e.pending_seen)})
                    <div className="tf-fp">{fmtFp(e.pending, e.kind)}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <style>{`
        .tf-list { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
        .tf-row { padding: 10px 12px; border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 4px; background: rgba(0, 240, 255, 0.03); animation: tf-in .24s ease-out; transition: border-color .15s ease, box-shadow .15s ease; }
        .tf-row:hover { border-color: rgba(0, 240, 255, 0.35); box-shadow: 0 4px 14px -8px rgba(0, 240, 255, .5); }
        @keyframes tf-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .tf-refused { border-color: var(--danger, #ff4d6d); background: rgba(255, 77, 109, 0.06); }
        .tf-head { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 12.5px; flex-wrap: wrap; }
        .tf-kind { padding: 1px 8px; border-radius: 2px; font-size: 11px; letter-spacing: .08em; border: 1px solid rgba(224, 102, 255, .5); color: var(--accent); background: rgba(224, 102, 255, .08); }
        .tf-ep { color: var(--text-primary); }
        .tf-since { color: var(--text-muted); font-size: 12px; }
        .tf-actions { margin-left: auto; display: inline-flex; gap: 6px; }
        .tf-btn { padding: 3px 10px; font-family: var(--font-mono); font-size: 11.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; transition: background .15s ease, transform .15s ease; }
        .tf-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.1); transform: translateY(-1px); }
        .tf-btn:disabled { opacity: .5; cursor: not-allowed; }
        .tf-accept { color: var(--warning, #ffb020); }
        .tf-fp { margin-top: 6px; font-family: var(--font-mono); font-size: 11.5px; color: var(--text-secondary); word-break: break-all; }
        .tf-pending { margin-top: 8px; font-family: var(--font-mono); font-size: 12px; color: var(--danger, #ff4d6d); }
        .tf-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 6px currentColor; margin-right: 6px; animation: tf-breathe 1.6s ease-in-out infinite; }
        @keyframes tf-breathe { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
        .tf-warn { margin-top: 8px; padding: 8px 12px; border-left: 3px solid var(--warning, #ffb020); background: rgba(255, 176, 32, .07); color: var(--warning, #ffb020); font-family: var(--font-mono); font-size: 12px; }
        .tf-empty { margin-top: 8px; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
      `}</style>
    </div>
  );
}

export function FingerprintAlert({ onReview }: { onReview: () => void }) {
  const { language } = useTranslation();
  const zh = language === 'zh-TW';
  const [pending, setPending] = useState<Entry[]>([]);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const d = await fetchTrust();
        if (alive) setPending(d ? d.entries.filter((e) => e.pending) : []);
      } catch { /* transient: keep the last answer */ }
    };
    tick();
    const id = window.setInterval(tick, 60000);
    return () => { alive = false; window.clearInterval(id); };
  }, []);

  if (pending.length === 0) return null;
  const names = pending.map((e) => e.endpoint).join(', ');
  return (
    <button className="fp-alert" onClick={onReview}>
      <span className="fp-alert-dot" />
      {zh
        ? `${pending.length} 個節點的指紋已改變，連線已被拒絕：${names}。點此檢查。`
        : `Fingerprint changed on ${pending.length} node endpoint(s), connection refused: ${names}. Review.`}
      <style>{`
        /* z-index 1500: above the settings panel (1000), below confirm dialogs
           (5000) so it never covers the Accept confirmation. Fixed, outside the
           app grid: an out-of-flow child takes no grid cell, and
           it is not inside .view-container (whose animation would otherwise
           become the containing block, recurring mistake #7). */
        .fp-alert { position: fixed; right: 18px; bottom: 18px; z-index: 1500; max-width: 440px; display: flex; align-items: flex-start; gap: 10px; padding: 12px 16px; border: 1px solid var(--danger, #ff4d6d); border-radius: 6px; background: linear-gradient(180deg, #1a0a12, #0d0509); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 12.5px; line-height: 1.55; text-align: left; cursor: pointer; box-shadow: 0 16px 40px rgba(0,0,0,.55), 0 0 30px -10px rgba(255, 77, 109, .6); animation: fp-alert-in .3s ease-out; transition: transform .15s ease, box-shadow .15s ease; }
        .fp-alert:hover { transform: translateY(-2px); box-shadow: 0 20px 44px rgba(0,0,0,.6), 0 0 34px -8px rgba(255, 77, 109, .8); }
        @keyframes fp-alert-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .fp-alert-dot { flex: 0 0 8px; width: 8px; height: 8px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; animation: fp-alert-pulse 1.4s ease-in-out infinite; }
        @keyframes fp-alert-pulse { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
      `}</style>
    </button>
  );
}
