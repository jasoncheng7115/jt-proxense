/**
 * ConfirmModal — cyberpunk confirmation dialog for destructive VM/CT actions.
 *
 * Per Jason B3 tier scheme:
 *   - start / unsuspend     → no confirm (caller skips this modal)
 *   - shutdown / reboot     → single-click confirm
 *   - stop / migrate / del  → confirm + diff summary "you are about to: X"
 *
 * Cool but practical: 0.18 s entry fade, no transition on the buttons (so
 * Enter / click is instant). Esc closes. Enter confirms when focused.
 */
import React, { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  title: string;
  /** Optional rendered diff / details (e.g. "VM 154 (web-01) on node1"). */
  details?: React.ReactNode;
  /** Required when destructive=true — explicit text to type to enable confirm. */
  typeToConfirm?: string;
  destructive?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open, title, details, typeToConfirm,
  destructive = false,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm, onCancel,
}: Props) {
  const [typed, setTyped] = React.useState('');
  const confirmRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTyped('');
      // Focus the input if there is one, else the confirm button
      setTimeout(() => {
        if (typeToConfirm) inputRef.current?.focus();
        else confirmRef.current?.focus();
      }, 50);
    }
  }, [open, typeToConfirm]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
      if (e.key === 'Enter' && (!typeToConfirm || typed === typeToConfirm)) {
        e.preventDefault();
        onConfirm();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, typed, typeToConfirm, onConfirm, onCancel]);

  if (!open) return null;

  const ready = !typeToConfirm || typed === typeToConfirm;

  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(0,0,0,.78)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'cmFade .18s ease',
      }}
    >
      <style>{`
        @keyframes cmFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
        .cm-card {
          width: min(440px, 100%);
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0,240,255,.35);
          border-radius: 12px;
          box-shadow:
            0 0 0 1px rgba(0,240,255,.1),
            0 16px 60px rgba(0,0,0,.65),
            0 0 80px -20px rgba(0,240,255,.5);
          padding: 24px 26px;
          animation: cmSlide .2s ease;
        }
        .cm-card.danger {
          border-color: rgba(255,56,96,.45);
          box-shadow:
            0 0 0 1px rgba(255,56,96,.18),
            0 16px 60px rgba(0,0,0,.65),
            0 0 80px -20px rgba(255,56,96,.5);
        }
        .cm-title {
          font-family: 'Orbitron', sans-serif; font-weight: 700;
          font-size: 16px; letter-spacing: .08em; text-transform: uppercase;
          color: #e6f6ff; margin: 0 0 4px;
        }
        .cm-card.danger .cm-title { color: #ff8aa0; }
        .cm-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
          color: #00f0ff; margin-bottom: 14px;
        }
        .cm-card.danger .cm-eyebrow { color: #ff3860; }
        .cm-details {
          font-family: 'Rajdhani', sans-serif; font-size: 15px;
          color: #95a8c4; line-height: 1.5; margin-bottom: 16px;
        }
        .cm-details code, .cm-details strong {
          color: #e6f6ff; font-family: 'Share Tech Mono', monospace;
          background: rgba(0,240,255,.08); padding: 1px 6px; border-radius: 3px;
        }
        .cm-input-label {
          display: block; font-size: 13px; letter-spacing: .08em;
          text-transform: uppercase; color: #95a8c4; margin: 16px 0 6px;
        }
        .cm-input {
          width: 100%; padding: 10px 14px;
          background: #02050b; color: #e6f6ff;
          border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
          font-family: 'Share Tech Mono', monospace; font-size: 15px;
          outline: none;
        }
        .cm-input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
        .cm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
        .cm-btn {
          padding: 9px 20px;
          font-family: 'Orbitron', sans-serif; font-weight: 600;
          font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
          border-radius: 6px; cursor: pointer; border: 1px solid transparent;
        }
        .cm-btn.cancel { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
        .cm-btn.cancel:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
        .cm-btn.confirm { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
        .cm-btn.confirm.danger { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
        .cm-btn:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
      `}</style>
      <div className={`cm-card ${destructive ? 'danger' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="cm-eyebrow">{destructive ? '// destructive action' : '// confirm'}</div>
        <h3 className="cm-title">{title}</h3>
        {details && <div className="cm-details">{details}</div>}
        {typeToConfirm && (
          <>
            <label className="cm-input-label">
              Type <code style={{
                fontFamily: 'Share Tech Mono, monospace',
                color: '#ff3860', userSelect: 'all',
              }}>{typeToConfirm}</code> to confirm
            </label>
            <input
              ref={inputRef}
              className="cm-input"
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
          </>
        )}
        <div className="cm-actions">
          <button className="cm-btn cancel" onClick={onCancel}>{cancelLabel}</button>
          <button
            ref={confirmRef}
            className={`cm-btn confirm ${destructive ? 'danger' : ''}`}
            disabled={!ready}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
