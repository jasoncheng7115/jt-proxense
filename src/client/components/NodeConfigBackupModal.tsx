/**
 * Download a node's configuration as a compressed archive.
 *
 * Two things this dialog is careful about:
 *
 * 1. The secrets toggle is off by default and states what including it means
 *    in plain language. /etc/pve/priv holds the cluster CA private key --
 *    whoever has that file can mint a valid PVE ticket for any user on the
 *    cluster. A checkbox labelled only "include private keys" does not convey
 *    that, so the warning spells out the consequence.
 *
 * 2. The download goes through fetch + Blob rather than a plain link, because
 *    the passphrase is POSTed in the body. A URL carrying it would be written
 *    to the access log, the proxy cache and the browser's own history.
 */
import React, { useState } from 'react';
import { useTranslation } from '../i18n';

/** Same shape the other SSH-backed dialogs use to spot a missing pubkey. */
const isSshErr = (msg: string) =>
  /permission denied|publickey|authentication|host key|no route to host|connection refused/i
    .test(msg);

export function NodeConfigBackupModal({ clusterId, node, onClose }: {
  clusterId: string;
  node: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  // API by default: it needs no SSH key on the node, so it works everywhere,
  // including nodes that have never been set up for SSH.
  const [mode, setMode] = useState<'api' | 'ssh'>('api');
  const [report, setReport] = useState(false);
  const [secrets, setSecrets] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<{ name: string; skipped: string[] } | null>(null);

  const mismatch = passphrase !== '' && confirm !== '' && passphrase !== confirm;
  const canRun = !busy && !mismatch && !(passphrase !== '' && confirm === '');

  const run = async () => {
    setBusy(true); setErr(null); setDone(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/nodes/${encodeURIComponent(node)}/config-backup`,
        {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode, secrets, report, passphrase }),
        });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      const name = r.headers.get('X-Config-Filename')
        || `${node}-config.tar.gz${passphrase ? '.enc' : ''}`;
      // tar's warnings never reach the browser, so the server forwards the
      // paths it could not read. Showing them is the difference between a
      // backup you can trust and one that silently lost /etc/pve.
      // Unit-separator delimited -- the entries are API error messages and
      // contain commas, so splitting on ',' inflated the count.
      const skipped = (r.headers.get('X-Config-Skipped') || '')
        .split('\x1f').map((x) => x.trim()).filter(Boolean);

      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      setDone({ name, skipped });
    } catch (e: any) {
      setErr(String(e.message || e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ncb-back" onClick={onClose}>
      <div className="ncb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ncb-head">
          <span>{t('ncb.title')}</span>
          <button className="ncb-close" onClick={onClose}>&times;</button>
        </div>

        <div className="ncb-body">
          <p className="ncb-target">
            <span className="ncb-label">{t('ncb.node')}</span>
            <code>{node}</code>
          </p>
          <p className="ncb-desc">{t('ncb.desc')}</p>

          <div className="ncb-modes">
            {(['api', 'ssh'] as const).map((m) => (
              <button key={m} type="button"
                      className={`ncb-mode${mode === m ? ' on' : ''}`}
                      onClick={() => setMode(m)}>
                <span className="ncb-mode-t">{t(`ncb.mode.${m}`)}</span>
                <span className="ncb-mode-d">{t(`ncb.mode.${m}_d`)}</span>
              </button>
            ))}
          </div>

          {mode === 'api' && (
            <>
              <div className="ncb-note">{t('ncb.api_note')}</div>
              <label className="ncb-check">
                <input type="checkbox" checked={report}
                       onChange={(e) => setReport(e.target.checked)} />
                <span>{t('ncb.report')}</span>
              </label>
              {report && <div className="ncb-warn">{t('ncb.report_warn')}</div>}
            </>
          )}

          {mode === 'ssh' && (
            <>
              <label className="ncb-check">
                <input type="checkbox" checked={secrets}
                       onChange={(e) => setSecrets(e.target.checked)} />
                <span>{t('ncb.secrets')}</span>
              </label>
              {secrets && <div className="ncb-warn">{t('ncb.secrets_warn')}</div>}
            </>
          )}

          <div className="ncb-field">
            <label>{t('ncb.passphrase')}</label>
            <input type="password" value={passphrase} autoComplete="new-password"
                   placeholder={t('ncb.passphrase_ph')}
                   onChange={(e) => setPassphrase(e.target.value)} />
          </div>
          {passphrase !== '' && (
            <div className="ncb-field">
              <label>{t('ncb.confirm')}</label>
              <input type="password" value={confirm} autoComplete="new-password"
                     onChange={(e) => setConfirm(e.target.value)} />
              {mismatch && <div className="ncb-err">{t('ncb.mismatch')}</div>}
            </div>
          )}
          {passphrase !== '' && (
            <div className="ncb-hint">
              {t('ncb.decrypt_hint')}
              <code className="ncb-cmd">
                openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -md sha256 -in FILE.enc -out FILE
              </code>
            </div>
          )}

          {err && (
            <div className="ncb-err">
              {err}
              {isSshErr(err) && <div className="ncb-sshhint">{t('ncb.ssh_hint')}</div>}
            </div>
          )}
          {done && (
            <div className="ncb-done">
              <div>{t('ncb.done')} <code>{done.name}</code></div>
              {done.skipped.length > 0 && (
                <div className="ncb-skipped">
                  {t('ncb.skipped', { n: done.skipped.length })}
                  <ul>{done.skipped.map((p) => <li key={p}><code>{p}</code></li>)}</ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ncb-foot">
          <button className="ncb-btn" onClick={onClose}>{t('action.close')}</button>
          <button className="ncb-btn ncb-btn-go" disabled={!canRun} onClick={run}>
            {busy ? t('ncb.working') : t('ncb.download')}
          </button>
        </div>
      </div>

      <style>{`
        .ncb-back {
          position: fixed; inset: 0; background: rgba(2, 4, 10, .65);
          display: flex; align-items: center; justify-content: center; z-index: 10000;
        }
        .ncb-modal {
          width: min(560px, 94vw); max-height: 88vh; display: flex; flex-direction: column;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid var(--primary-dim); border-radius: 6px;
          box-shadow: 0 0 32px rgba(0, 240, 255, .2); overflow: hidden;
          animation: ncb-in .18s ease-out;
        }
        @keyframes ncb-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ncb-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, .25);
          color: var(--primary); font-family: var(--font-display); font-size: 14px;
          letter-spacing: .1em; text-transform: uppercase;
        }
        .ncb-close { background: transparent; border: none; color: var(--text-secondary);
                     font-size: 22px; cursor: pointer; line-height: 1; }
        .ncb-foot {
          display: flex; justify-content: flex-end; gap: 10px;
          padding: 12px 18px; border-top: 1px solid rgba(0, 240, 255, .18);
        }
        .ncb-btn {
          padding: 7px 16px; font-family: var(--font-display); font-size: 12px;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
          background: transparent; color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, .18); border-radius: 3px;
        }
        .ncb-btn:hover { color: var(--text-primary); border-color: rgba(255, 255, 255, .35); }
        .ncb-btn-go { color: var(--primary); border-color: var(--primary-dim);
                      background: rgba(0, 240, 255, .08); }
        .ncb-btn-go:disabled { opacity: .45; cursor: not-allowed; }
        .ncb-body { flex: 1; overflow: auto; padding: 14px 18px;
                    display: flex; flex-direction: column; gap: 12px; }
        .ncb-target { display: flex; align-items: center; gap: 8px; margin: 0; }
        .ncb-label { color: var(--text-muted); font-size: 12px; }
        .ncb-desc { margin: 0; color: var(--text-secondary); font-size: 12px; line-height: 1.6; }
        .ncb-modes { display: flex; gap: 8px; }
        .ncb-mode {
          flex: 1; text-align: left; cursor: pointer; padding: 9px 11px;
          background: rgba(0, 0, 0, .3); border: 1px solid rgba(255, 255, 255, .12);
          border-radius: 4px; color: var(--text-secondary);
        }
        .ncb-mode.on { border-color: var(--primary-dim); background: rgba(0, 240, 255, .08); }
        .ncb-mode-t { display: block; font-family: var(--font-display); font-size: 12px;
                      letter-spacing: .06em; text-transform: uppercase; }
        .ncb-mode.on .ncb-mode-t { color: var(--primary); }
        .ncb-mode-d { display: block; margin-top: 3px; font-size: 11px; color: var(--text-muted);
                      line-height: 1.5; }
        .ncb-note { font-size: 11px; color: var(--text-muted); line-height: 1.6;
                    border-left: 2px solid rgba(0, 240, 255, .35); padding-left: 9px; }
        .ncb-check { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; cursor: pointer; }
        .ncb-check input { margin-top: 2px; }
        .ncb-warn {
          border: 1px solid rgba(255, 107, 0, .5); background: rgba(255, 107, 0, .08);
          color: var(--warning); font-size: 12px; line-height: 1.6;
          padding: 8px 10px; border-radius: 3px;
        }
        .ncb-field { display: flex; flex-direction: column; gap: 4px; }
        .ncb-field label { font-size: 12px; color: var(--text-muted); }
        .ncb-field input {
          background: rgba(0, 0, 0, .35); border: 1px solid rgba(0, 216, 239, .25);
          color: var(--text-primary); padding: 7px 10px; border-radius: 3px;
          font-family: var(--font-mono); font-size: 13px;
        }
        .ncb-hint { font-size: 11px; color: var(--text-muted); line-height: 1.6; }
        .ncb-cmd {
          display: block; margin-top: 5px; padding: 7px 9px;
          background: rgba(0, 0, 0, .4); border: 1px solid rgba(255, 255, 255, .08);
          border-radius: 3px; font-size: 11px; overflow-x: auto; white-space: nowrap;
        }
        .ncb-err { color: #ff5c7a; font-size: 12px; line-height: 1.6; }
        .ncb-sshhint { margin-top: 5px; color: var(--warning); }
        .ncb-done { font-size: 12px; color: var(--success); line-height: 1.7; }
        .ncb-skipped { margin-top: 6px; color: var(--warning); }
        .ncb-skipped ul { margin: 4px 0 0; padding-left: 18px; }
      `}</style>
    </div>
  );
}
