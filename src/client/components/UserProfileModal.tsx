/**
 * UserProfileModal — self-service modal for the signed-in user:
 *   - 帳號 / Account: see profile, change password.
 *   - 雙因素認證 / Two-factor: enroll TOTP, view status, disable.
 *
 * Replaces the legacy server-rendered /account and /totp pages so the
 * UX matches the rest of the SPA (cyberpunk modal, hologram entry,
 * cyan-bordered cards). The legacy pages still exist as deep-link
 * fallbacks but the dropdown now opens this modal instead.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import type { CurrentUser } from '../api';

interface Props {
  open: boolean;
  onClose: () => void;
  user: CurrentUser | null;
  initialTab?: 'account' | 'totp';
}

type TabKey = 'account' | 'totp';

export function UserProfileModal({ open, onClose, user, initialTab = 'account' }: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  const [tab, setTab] = useState<TabKey>(initialTab);

  // change-password state
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPw2, setNewPw2] = useState('');
  const [pwBusy, setPwBusy] = useState(false);
  const [pwErr, setPwErr] = useState<string | null>(null);
  const [pwOk, setPwOk] = useState(false);

  // TOTP state
  const [totpStatus, setTotpStatus] = useState<{ enabled: boolean; backup_codes_remaining: number } | null>(null);
  const [totpBusy, setTotpBusy] = useState(false);
  const [enrollData, setEnrollData] = useState<{ qr_data_uri: string; secret: string } | null>(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [enrollErr, setEnrollErr] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);

  useEffect(() => {
    if (!open) return;
    setTab(initialTab);
    setPwErr(null); setPwOk(false); setCurPw(''); setNewPw(''); setNewPw2('');
    setEnrollData(null); setVerifyCode(''); setEnrollErr(null); setBackupCodes(null);
    // fetch status
    (async () => {
      try {
        const r = await fetch('/api/auth/totp/status', { credentials: 'same-origin' });
        if (r.ok) setTotpStatus(await r.json());
      } catch { /* ignore */ }
    })();
  }, [open, initialTab]);

  const submitChangePw = async () => {
    setPwErr(null); setPwOk(false);
    if (newPw.length < 8) { setPwErr(t('userp.pw_too_short')); return; }
    if (newPw !== newPw2)  { setPwErr(t('userp.pw_mismatch')); return; }
    setPwBusy(true);
    try {
      const r = await fetch('/api/auth/change-password', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: curPw, new_password: newPw }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.message || d.error || `HTTP ${r.status}`);
      }
      setPwOk(true);
      setCurPw(''); setNewPw(''); setNewPw2('');
    } catch (e: any) {
      setPwErr(e.message || String(e));
    } finally {
      setPwBusy(false);
    }
  };

  const startEnroll = async () => {
    setEnrollErr(null); setBackupCodes(null);
    setTotpBusy(true);
    try {
      const r = await fetch('/api/auth/totp/enroll-init', {
        method: 'POST', credentials: 'same-origin',
      });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setEnrollData({ qr_data_uri: d.qr_data_uri, secret: d.secret });
    } catch (e: any) {
      setEnrollErr(e.message || String(e));
    } finally {
      setTotpBusy(false);
    }
  };

  const verifyEnroll = async () => {
    setEnrollErr(null);
    if (!/^\d{6}$/.test(verifyCode.trim())) {
      setEnrollErr(t('userp.code_format'));
      return;
    }
    setTotpBusy(true);
    try {
      const r = await fetch('/api/auth/totp/enroll-verify', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verifyCode.trim() }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setBackupCodes(d.backup_codes || []);
      setEnrollData(null);
      setVerifyCode('');
      // Refresh status
      const r2 = await fetch('/api/auth/totp/status', { credentials: 'same-origin' });
      if (r2.ok) setTotpStatus(await r2.json());
    } catch (e: any) {
      setEnrollErr(e.message || String(e));
    } finally {
      setTotpBusy(false);
    }
  };

  const disableTotp = async () => {
    const ok = await dialog.confirm(t('userp.totp_disable_confirm'),
      { title: t('userp.totp_disable_title'), destructive: true });
    if (!ok) return;
    setTotpBusy(true);
    try {
      const r = await fetch('/api/auth/totp/disable', {
        method: 'POST', credentials: 'same-origin',
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || `HTTP ${r.status}`);
      setTotpStatus({ enabled: false, backup_codes_remaining: 0 });
    } catch (e: any) {
      await dialog.alert(`${t('userp.totp_disable_err')}: ${e.message || e}`);
    } finally {
      setTotpBusy(false);
    }
  };

  if (!open) return null;
  return (
    <div className="up-back" onClick={onClose}>
      <div className="up-modal" onClick={(e) => e.stopPropagation()}>
        <div className="up-head">
          <div className="up-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
            </svg>
            <span>{t('userp.title')}</span>
            {user && <span className="up-target">{user.username}</span>}
          </div>
          <button className="up-close" onClick={onClose}>×</button>
        </div>

        <div className="up-tabs">
          <button className={`up-tab ${tab === 'account' ? 'active' : ''}`}
                  onClick={() => setTab('account')}>{t('userp.tab.account')}</button>
          <button className={`up-tab ${tab === 'totp' ? 'active' : ''}`}
                  onClick={() => setTab('totp')}>{t('userp.tab.totp')}</button>
        </div>

        <div className="up-body">
          {tab === 'account' && (
            <>
              <div className="up-section">
                <div className="up-section-title">{t('userp.profile')}</div>
                <div className="up-kv">
                  <div><span>{t('userp.username')}</span><code>{user?.username || '—'}</code></div>
                  <div><span>{t('userp.role')}</span><code>{user?.role_global || '—'}</code></div>
                </div>
              </div>

              <div className="up-section">
                <div className="up-section-title">{t('userp.change_pw')}</div>
                {pwErr && <div className="up-error">{pwErr}</div>}
                {pwOk && <div className="up-ok">✓ {t('userp.pw_ok')}</div>}
                <label className="up-row">
                  <span>{t('userp.current_pw')}</span>
                  <input type="password" value={curPw} onChange={(e) => setCurPw(e.target.value)} autoComplete="current-password" />
                </label>
                <label className="up-row">
                  <span>{t('userp.new_pw')}</span>
                  <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} autoComplete="new-password" />
                </label>
                <label className="up-row">
                  <span>{t('userp.new_pw2')}</span>
                  <input type="password" value={newPw2} onChange={(e) => setNewPw2(e.target.value)} autoComplete="new-password" />
                </label>
                <div className="up-row-actions">
                  <button className="up-primary" onClick={submitChangePw}
                          disabled={pwBusy || !curPw || !newPw}>
                    {pwBusy ? '…' : t('userp.btn_change_pw')}
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === 'totp' && (
            <div className="up-section">
              <div className="up-section-title">{t('userp.totp_title')}</div>
              {totpStatus?.enabled && !backupCodes && (
                <>
                  <div className="up-totp-on">
                    ✓ {t('userp.totp_active')}
                    {totpStatus.backup_codes_remaining > 0 && (
                      <span className="up-mute"> · {totpStatus.backup_codes_remaining} {t('userp.backup_left')}</span>
                    )}
                  </div>
                  <div className="up-row-actions">
                    <button className="up-danger" onClick={disableTotp} disabled={totpBusy}>
                      {t('userp.totp_disable')}
                    </button>
                  </div>
                </>
              )}

              {!totpStatus?.enabled && !enrollData && !backupCodes && (
                <>
                  <div className="up-mute">{t('userp.totp_intro')}</div>
                  <div className="up-row-actions">
                    <button className="up-primary" onClick={startEnroll} disabled={totpBusy}>
                      {totpBusy ? '…' : t('userp.totp_start')}
                    </button>
                  </div>
                </>
              )}

              {enrollData && (
                <>
                  {enrollErr && <div className="up-error">{enrollErr}</div>}
                  <div className="up-mute">{t('userp.totp_scan')}</div>
                  <div className="up-qr">
                    <img src={enrollData.qr_data_uri} alt="TOTP QR code" width={180} height={180} />
                    <div className="up-secret">
                      <span>{t('userp.totp_secret')}</span>
                      <code>{enrollData.secret}</code>
                    </div>
                  </div>
                  <label className="up-row">
                    <span>{t('userp.totp_code')}</span>
                    <input value={verifyCode}
                           onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                           inputMode="numeric"
                           maxLength={6}
                           placeholder="123456" />
                  </label>
                  <div className="up-row-actions">
                    <button onClick={() => { setEnrollData(null); setVerifyCode(''); }}
                            disabled={totpBusy}>{t('userp.cancel')}</button>
                    <button className="up-primary" onClick={verifyEnroll}
                            disabled={totpBusy || verifyCode.length !== 6}>
                      {totpBusy ? '…' : t('userp.totp_verify')}
                    </button>
                  </div>
                </>
              )}

              {backupCodes && (
                <>
                  <div className="up-warn">⚠ {t('userp.backup_warning')}</div>
                  <div className="up-backup-list">
                    {backupCodes.map((c, i) => (
                      <code key={i}>{c}</code>
                    ))}
                  </div>
                  <div className="up-row-actions">
                    <button className="up-primary" onClick={() => setBackupCodes(null)}>
                      {t('userp.backup_done')}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <style>{`
          .up-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .up-modal { width: min(620px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: up-in .18s ease-out; overflow: hidden; }
          @keyframes up-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .up-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .up-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .up-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .up-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .up-close:hover { color: var(--primary); }

          .up-tabs { display: flex; gap: 0; padding: 0 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); }
          .up-tab { padding: 10px 16px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: none; border-bottom: 2px solid transparent; cursor: pointer; }
          .up-tab:hover { color: var(--primary); }
          .up-tab.active { color: var(--primary); border-bottom-color: var(--primary); text-shadow: 0 0 6px rgba(0,240,255,.4); }

          .up-body { flex: 1; overflow: auto; padding: 16px 18px; }
          .up-section { margin-bottom: 18px; }
          .up-section-title { font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.12); }
          .up-mute { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); padding: 4px 0; line-height: 1.4; }

          .up-kv { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px 14px; font-family: var(--font-mono); font-size: 13.5px; }
          .up-kv > div { display: flex; justify-content: space-between; padding: 6px 10px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 3px; }
          .up-kv > div span { color: var(--text-secondary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: .04em; text-transform: uppercase; }
          .up-kv > div code { color: var(--text-primary); }

          .up-row { display: grid; grid-template-columns: 140px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .up-row > span { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .up-row input { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .up-row input:focus { border-color: var(--primary); }
          .up-row-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
          .up-row-actions button { padding: 6px 16px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .up-row-actions button:hover:not(:disabled) { background: rgba(0, 240, 255, 0.05); }
          .up-row-actions .up-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .up-row-actions .up-primary:hover:not(:disabled) { background: var(--primary); box-shadow: 0 0 12px rgba(0,240,255,.5); }
          .up-row-actions .up-danger { color: var(--danger, #ff4d6d); border-color: currentColor; }
          .up-row-actions .up-danger:hover:not(:disabled) { background: rgba(255, 77, 109, 0.1); }
          .up-row-actions button:disabled { opacity: .4; cursor: not-allowed; }

          .up-error { padding: 8px 14px; margin-bottom: 10px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .up-ok { padding: 8px 14px; margin-bottom: 10px; border: 1px solid var(--success); border-left-width: 3px; background: rgba(0, 230, 130, 0.08); color: var(--success); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .up-warn { padding: 8px 14px; margin-bottom: 10px; border: 1px solid var(--warning); border-left-width: 3px; background: rgba(255, 200, 0, 0.08); color: var(--warning); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; line-height: 1.4; }
          .up-totp-on { padding: 8px 14px; margin-bottom: 10px; border: 1px solid var(--success); border-left-width: 3px; background: rgba(0, 230, 130, 0.08); color: var(--success); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }

          .up-qr { display: flex; gap: 18px; align-items: center; padding: 12px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; margin-bottom: 12px; }
          .up-qr img { background: #fff; padding: 4px; border-radius: 3px; }
          .up-secret { display: flex; flex-direction: column; gap: 4px; font-family: var(--font-mono); font-size: 13.5px; word-break: break-all; flex: 1; }
          .up-secret span { color: var(--text-secondary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: .04em; text-transform: uppercase; }
          .up-secret code { color: var(--primary); padding: 6px 10px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; user-select: all; }

          .up-backup-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin: 10px 0; padding: 10px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; }
          .up-backup-list code { padding: 4px 10px; font-family: var(--font-mono); font-size: 13px; color: var(--primary); background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; text-align: center; user-select: all; }
        `}</style>
      </div>
    </div>
  );
}
