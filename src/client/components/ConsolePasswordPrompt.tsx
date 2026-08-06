/**
 * ConsolePasswordPrompt — small one-shot password modal.
 *
 * Used when console.mode='prompt'. The password is sent to the server
 * once (over POST), exchanged for a console_token, and never stored on
 * the browser. The token then rides in the `?ct=...` query of the
 * /console/{...} URL we open in a new tab.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';

interface Props {
  open: boolean;
  cluster_id: string;
  pveUser: string;            // shown to the operator so they know which password
  onCancel: () => void;
  onSubmit: (password: string) => Promise<void>;
}

export function ConsolePasswordPrompt({ open, cluster_id, pveUser, onCancel, onSubmit }: Props) {
  const { t } = useTranslation();
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setPw(''); setErr(''); setBusy(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !busy) onCancel(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, busy, onCancel]);

  if (!open) return null;

  const submit = async () => {
    if (!pw) return;
    setBusy(true); setErr('');
    try { await onSubmit(pw); }
    catch (e: unknown) {
      const msg = (e instanceof Error) ? e.message : String(e);
      setErr(t('console.prepare_failed', { err: msg }));
      setBusy(false);
    }
  };

  return (
    <div onClick={() => !busy && onCancel()} style={overlay}>
      <style>{styleBlock}</style>
      <div className="cpw-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cpw-eyebrow">// console · {cluster_id}</div>
        <h3 className="cpw-title">{t('console.prompt_title')}</h3>
        <p className="cpw-body">{t('console.prompt_body', { user: pveUser, cluster: cluster_id })}</p>
        <label>{t('console.prompt_label')}</label>
        <input
          ref={inputRef}
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          autoComplete="current-password"
          spellCheck={false}
        />
        {err && <div className="cpw-err">{err}</div>}
        <div className="cpw-actions">
          <button className="ghost" onClick={onCancel} disabled={busy}>{t('action.cancel')}</button>
          <button className="primary" onClick={submit} disabled={busy || !pw}>
            {busy ? '…' : t('console.prompt_open')}
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 400,
  background: 'rgba(0,0,0,.78)', backdropFilter: 'blur(6px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 24, animation: 'cpwFade .18s ease',
};

const styleBlock = `
@keyframes cpwFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes cpwSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.cpw-modal {
  width: min(440px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 22px 24px; animation: cpwSlide .2s ease;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.cpw-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.cpw-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 10px; }
.cpw-body { color: #95a8c4; font-size: 15px; line-height: 1.5; margin: 0 0 14px; }
.cpw-modal label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 0 0 6px;
}
.cpw-modal input {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.cpw-modal input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
.cpw-err {
  margin-top: 10px; padding: 10px 12px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 14px; color: #ffd0d8;
}
.cpw-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.cpw-actions button {
  padding: 9px 18px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.cpw-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.cpw-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.cpw-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.cpw-actions button:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
`;
