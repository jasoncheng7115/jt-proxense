/**
 * SetSecretModal — collect a secret value from the operator and POST it
 * to /api/secrets. Used by Settings → Clusters to set a per-cluster PVE
 * password without writing it to config.yaml.
 *
 * The value is sent over the wire once (HTTPS recommended) and never
 * displayed back. The server encrypts it with the master key and stores
 * it in SQLite.
 */
import React, { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { useTranslation } from '../i18n';

interface Props {
  open: boolean;
  cluster_id: string;
  kind: string;             // e.g. 'pve_password'
  title: string;
  body: string;
  label: string;
  onClose: () => void;
  onSaved: () => void;
}

export function SetSecretModal({
  open, cluster_id, kind, title, body, label, onClose, onSaved,
}: Props) {
  const { t } = useTranslation();
  const [val, setVal] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setVal(''); setErr(''); setBusy(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !busy) onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, busy, onClose]);

  if (!open) return null;

  const submit = async () => {
    if (!val) return;
    setBusy(true); setErr('');
    try {
      await api.setClusterSecret(cluster_id, kind, val);
      onSaved();
    } catch (e: unknown) {
      setErr((e instanceof Error) ? e.message : String(e));
      setBusy(false);
    }
  };

  return (
    <div onClick={() => !busy && onClose()} style={overlay}>
      <style>{styleBlock}</style>
      <div className="ssm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ssm-eyebrow">// secret · {cluster_id}</div>
        <h3 className="ssm-title">{title}</h3>
        <p className="ssm-body">{body}</p>
        <label>{label}</label>
        <input
          ref={inputRef}
          type="password"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          autoComplete="new-password"
          spellCheck={false}
        />
        {err && <div className="ssm-err">{err}</div>}
        <div className="ssm-actions">
          <button className="ghost" onClick={onClose} disabled={busy}>{t('action.cancel')}</button>
          <button className="primary" onClick={submit} disabled={busy || !val}>
            {busy ? '…' : t('action.save')}
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
  padding: 24, animation: 'ssmFade .18s ease',
};

const styleBlock = `
@keyframes ssmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ssmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.ssm-modal {
  width: min(440px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 22px 24px; animation: ssmSlide .2s ease;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.ssm-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.ssm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 10px; }
.ssm-body { color: #95a8c4; font-size: 15px; line-height: 1.5; margin: 0 0 14px; }
.ssm-modal label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 0 0 6px;
}
.ssm-modal input {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.ssm-modal input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
.ssm-err {
  margin-top: 10px; padding: 10px 12px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 14px; color: #ffd0d8;
}
.ssm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.ssm-actions button {
  padding: 9px 18px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.ssm-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.ssm-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.ssm-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.ssm-actions button:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
`;
