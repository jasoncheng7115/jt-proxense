/**
 * UserBadge — header avatar + dropdown.
 *
 * Visually matches ClusterSelector / language menu: hologram-entry
 * dropdown with cyan border, scan-line + edge-pulse animations, and
 * "dropdown-option" rows (icon + label + optional check) so all three
 * popovers in the header share one visual language.
 *
 * The trigger is a 42×42 icon button (same shape as Pause / Language /
 * Settings) carrying a small role-color dot in the bottom-right corner.
 * Username is never rendered in the header — it might be arbitrarily
 * long. It surfaces inside the dropdown's "meta" header instead.
 */
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import type { CurrentUser } from '../api';
import { UserProfileModal } from './UserProfileModal';
import { AuditForwarderModal } from './AuditForwarderModal';

interface Props {
  user: CurrentUser | null;
  onLogout: () => void;
}

const ROLE_DOT_COLOR: Record<string, string> = {
  admin:    '#ff8a3c',
  operator: '#00f0ff',
  viewer:   '#95a8c4',
  guest:    '#6b7c93',
};

export function UserBadge({ user, onLogout }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<'account' | 'totp' | null>(null);
  const [showFwd, setShowFwd] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;

  const role = user.role_global || 'guest';
  const roleColor = ROLE_DOT_COLOR[role] || ROLE_DOT_COLOR.guest;
  const isAdmin = role === 'admin';

  return (
    <div className="user-badge" ref={ref} style={{ position: 'relative' }}>
      <button
        className="btn btn-icon user-badge-btn"
        onClick={() => setOpen((v) => !v)}
        title={`${user.username} · ${role}`}
        aria-label={`User menu: ${user.username} (${role})`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1.8"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
        <span
          aria-hidden
          className="user-badge-role-dot"
          style={{ background: roleColor, boxShadow: `0 0 6px ${roleColor}` }}
        />
      </button>

      {/* Visual parity with ClusterSelector: same animation, same scan-line,
          same dropdown-option rows. */}
      {open && (
        <div className="user-cluster-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-header">
            <div className="user-meta-line">
              <span className="user-meta-name">{user.username}</span>
              <span className="user-meta-role" style={{ color: roleColor, borderColor: roleColor }}>
                <span aria-hidden style={{
                  display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                  background: roleColor, boxShadow: `0 0 6px ${roleColor}`,
                  marginRight: 6,
                }} />
                {role}
              </span>
            </div>
            <div className="dropdown-line" />
          </div>

          <div className="dropdown-options">
            <button type="button" className="dropdown-option"
                    onClick={() => { setProfileTab('account'); setOpen(false); }}>
              <span className="option-icon">⚙</span>
              <span className="option-label">{t('user.account_password')}</span>
            </button>
            <button type="button" className="dropdown-option"
                    onClick={() => { setProfileTab('totp'); setOpen(false); }}>
              <span className="option-icon">⊞</span>
              <span className="option-label">{t('user.totp')}</span>
            </button>
            {isAdmin && (
              <a href="/users" className="dropdown-option">
                <span className="option-icon">⚇</span>
                <span className="option-label">{t('user.user_admin')}</span>
              </a>
            )}
            {isAdmin && (
              <a href="/audit" className="dropdown-option">
                <span className="option-icon">▤</span>
                <span className="option-label">{t('user.audit')}</span>
              </a>
            )}
            {isAdmin && (
              <a href="/sessions" className="dropdown-option">
                <span className="option-icon">⚡</span>
                <span className="option-label">{t('user.sessions')}</span>
              </a>
            )}
            {isAdmin && (
              <button type="button" className="dropdown-option"
                      onClick={() => { setShowFwd(true); setOpen(false); }}>
                <span className="option-icon">↗</span>
                <span className="option-label">{t('af.button')}</span>
              </button>
            )}
            <div className="dropdown-divider" />
            <button className="dropdown-option danger" onClick={onLogout}>
              <span className="option-icon">⏻</span>
              <span className="option-label">{t('user.sign_out')}</span>
            </button>
          </div>

          <div className="dropdown-corner tl" />
          <div className="dropdown-corner tr" />
          <div className="dropdown-corner bl" />
          <div className="dropdown-corner br" />
        </div>
      )}

      <style>{`
        .user-badge-btn {
          position: relative;
        }
        .user-badge-role-dot {
          position: absolute;
          right: 6px;
          bottom: 6px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid var(--bg-secondary, #0d1117);
          pointer-events: none;
        }

        /* ----- cluster-dropdown styling re-stated locally so this popover
           doesn't depend on the ClusterSelector component being mounted.
           Numbers + animations match its definition exactly. ----- */
        .user-cluster-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: auto;
          right: 0;
          min-width: 240px;
          max-width: calc(100vw - 20px);
          background: linear-gradient(180deg, rgba(10, 15, 25, 0.98) 0%, rgba(5, 10, 20, 0.98) 100%);
          border: 1px solid var(--primary-dim, rgba(0, 240, 255, 0.4));
          z-index: 9999;
          animation: ub-dropdown-hologram 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(6px);
          /* Earlier had overflow:hidden here (to contain the hologram
             scale-up animation) — but the box's resting height got
             clipped, producing a spurious scrollbar on the items list.
             overflow:visible lets the menu always show every row at its
             natural height; the decorative ::before/::after gradients
             are positioned via inset:0 so they can't bleed out. */
          overflow: visible;
        }
        .user-cluster-dropdown::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,240,255,.15) 2%, transparent 4%);
          animation: ub-dropdown-scan 1.5s linear infinite;
          pointer-events: none; z-index: 100;
        }
        .user-cluster-dropdown::after {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(0,240,255,.1) 0%, transparent 5%, transparent 95%, rgba(0,240,255,.1) 100%),
            linear-gradient(180deg, rgba(0,240,255,.15) 0%, transparent 10%, transparent 90%, rgba(0,240,255,.1) 100%);
          pointer-events: none; z-index: 99;
          animation: ub-dropdown-edge-pulse 2s ease-in-out infinite;
        }
        @keyframes ub-dropdown-hologram {
          0%   { opacity: 0; transform: translateY(-20px) scaleY(.3) scaleX(.8);
                 filter: blur(10px) brightness(3);
                 clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%); }
          30%  { opacity: .7; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                 filter: blur(4px) brightness(2); }
          60%  { transform: translateY(2px) scaleY(1.02) scaleX(1); filter: blur(1px) brightness(1.3); }
          80%  { transform: translateY(-1px) scaleY(.99); }
          100% { opacity: 1; transform: none; filter: none; }
        }
        @keyframes ub-dropdown-scan {
          0% { background-position: 0 -100%; } 100% { background-position: 0 200%; }
        }
        @keyframes ub-dropdown-edge-pulse {
          0%, 100% { opacity: 0.6; } 50% { opacity: 1; }
        }
        .user-cluster-dropdown .dropdown-header {
          padding: 10px 12px 8px;
          border-bottom: 1px solid var(--border, rgba(0,240,255,.16));
          position: relative; z-index: 101;
        }
        .user-cluster-dropdown .dropdown-line {
          height: 1px;
          background: linear-gradient(90deg, var(--primary-dim, rgba(0,240,255,.4)) 0%, transparent 100%);
          margin-top: 6px;
        }
        .user-cluster-dropdown .dropdown-options {
          padding: 6px 0;
          position: relative; z-index: 101;
        }
        .user-cluster-dropdown .dropdown-option {
          width: 100%;
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          background: transparent; border: none;
          color: var(--text-secondary, #95a8c4);
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px; letter-spacing: .03em;
          cursor: pointer; text-align: left;
          position: relative; overflow: hidden;
          text-decoration: none;
          transition: all 0.15s ease;
          animation: ub-option-materialize 0.3s ease-out backwards;
        }
        .user-cluster-dropdown .dropdown-option:nth-child(1) { animation-delay: 0.15s; }
        .user-cluster-dropdown .dropdown-option:nth-child(2) { animation-delay: 0.20s; }
        .user-cluster-dropdown .dropdown-option:nth-child(3) { animation-delay: 0.25s; }
        .user-cluster-dropdown .dropdown-option:nth-child(4) { animation-delay: 0.30s; }
        .user-cluster-dropdown .dropdown-option:nth-child(5) { animation-delay: 0.35s; }
        .user-cluster-dropdown .dropdown-option:nth-child(6) { animation-delay: 0.40s; }
        @keyframes ub-option-materialize {
          0%  { opacity: 0; transform: translateX(-20px); filter: blur(4px); }
          60% { filter: blur(1px); }
          100%{ opacity: 1; transform: none; filter: none; }
        }
        .user-cluster-dropdown .dropdown-option::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,.2), transparent);
          transition: left .4s ease;
        }
        .user-cluster-dropdown .dropdown-option:hover::before { left: 100%; }
        .user-cluster-dropdown .dropdown-option:hover {
          background: rgba(0, 240, 255, 0.08);
          color: #e6f6ff;
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }
        .user-cluster-dropdown .dropdown-option.danger:hover {
          background: rgba(255, 56, 96, 0.10);
          color: #ff3860;
          text-shadow: 0 0 8px rgba(255, 56, 96, 0.5);
          box-shadow: inset 2px 0 0 #ff3860;
        }
        .user-cluster-dropdown .dropdown-option .option-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px;
          color: var(--primary, #00f0ff);
          font-family: 'Share Tech Mono', monospace; font-size: 14px;
        }
        .user-cluster-dropdown .dropdown-option.danger .option-icon { color: #ff3860; }
        .user-cluster-dropdown .dropdown-option .option-label {
          flex: 1; font-size: 14px;
        }
        .user-cluster-dropdown .dropdown-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,240,255,.2) 50%, transparent 100%);
          margin: 4px 0;
        }
        /* Corner decorations — same as ClusterSelector */
        .user-cluster-dropdown .dropdown-corner {
          position: absolute; width: 8px; height: 8px;
          border: 1px solid var(--primary, #00f0ff);
          z-index: 102; pointer-events: none;
        }
        .user-cluster-dropdown .dropdown-corner.tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .user-cluster-dropdown .dropdown-corner.tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .user-cluster-dropdown .dropdown-corner.bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .user-cluster-dropdown .dropdown-corner.br { bottom: -1px; right: -1px; border-left: none; border-top: none; }
        .user-meta-line {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Share Tech Mono', monospace;
        }
        .user-meta-name {
          color: #e6f6ff; font-size: 14px; letter-spacing: 0.04em;
          flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .user-meta-role {
          display: inline-flex; align-items: center;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 2px 8px; border-radius: 999px;
          border: 1px solid currentColor;
        }
        /* Destructive option (logout) — red rail on hover instead of cyan. */
        /* danger row variant — keeps logout visually distinct */
      `}</style>

      <UserProfileModal
        open={profileTab !== null}
        onClose={() => setProfileTab(null)}
        user={user}
        initialTab={profileTab || 'account'}
      />
      <AuditForwarderModal open={showFwd} onClose={() => setShowFwd(false)} />
    </div>
  );
}
