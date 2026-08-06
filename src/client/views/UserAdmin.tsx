/**
 * UserAdmin — admin-only page for managing local users, role grants,
 * and 2FA enrolment. Wraps the same primitives the bin/jt-proxense
 * CLI uses (now exposed as /api/admin/users/*).
 *
 * Layout:
 *  - Top: "新增使用者" form (compact)
 *  - Main: table of users with username, role badges, 2FA dot,
 *    enabled state, last login, actions (reset password, disable 2FA,
 *    enable/disable, delete, manage roles)
 *  - Right-side drawer: per-user role editor (cluster_id, role,
 *    vm_pattern triples)
 */
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';
import { CyberSelect } from '../components/CyberSelect';

interface UserRole {
  cluster_id: string;
  role: 'viewer' | 'operator' | 'admin';
  vm_pattern: string;
}

interface UserRow {
  id: number;
  username: string;
  enabled: boolean;
  must_change_pw: boolean;
  created_at?: number;
  last_login_at?: number;
  totp_enabled: boolean;
  roles: UserRole[];
}

export function UserAdmin() {
  const { language } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<UserRow | null>(null);
  // New-user modal + form
  const [showCreate, setShowCreate] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newSubmitting, setNewSubmitting] = useState(false);
  // One-shot secret reveal (2FA backup codes) — a purpose-built modal with a
  // copy button, not a newline-joined alert() whose line breaks depend on CSS.
  const [reveal, setReveal] = useState<{ title: string; note: string; codes: string[] } | null>(null);

  const openCreate = () => { setNewUsername(''); setNewPassword(''); setShowCreate(true); };
  const closeCreate = () => { if (!newSubmitting) { setShowCreate(false); setNewUsername(''); setNewPassword(''); } };

  const reload = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const r = await fetch('/api/admin/users', { credentials: 'same-origin' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      setUsers(data.users || []);
    } catch (e) {
      setError(String(e instanceof Error ? e.message : e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void reload(); }, [reload]);

  const isAdminViewer = auth.user?.role_global === 'admin' || !auth.authEnforced;

  const createUser = async () => {
    if (!newUsername.trim() || newPassword.length < 8) {
      await dialog.alert(language === 'zh-TW'
        ? '使用者名稱必填，密碼至少 8 字元'
        : 'Username required, password ≥ 8 chars');
      return;
    }
    setNewSubmitting(true);
    try {
      const r = await fetch('/api/admin/users', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);
      setNewUsername(''); setNewPassword('');
      setShowCreate(false);
      await reload();
    } catch (e) {
      await dialog.alert(`${e}`);
    } finally {
      setNewSubmitting(false);
    }
  };

  const resetPassword = async (u: UserRow) => {
    const pw = await dialog.prompt(
      language === 'zh-TW' ? `為 ${u.username} 設定新密碼（至少 8 字元）：` : `New password for ${u.username} (≥8 chars):`,
      { inputType: 'password' },
    );
    if (!pw || pw.length < 8) return;
    const r = await fetch(`/api/admin/users/${encodeURIComponent(u.username)}/password`, {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw, must_change_pw: true }),
    });
    if (!r.ok) await dialog.alert(`HTTP ${r.status}: ${await r.text()}`);
    else await dialog.alert(language === 'zh-TW' ? '已重設並要求下次登入時變更' : 'Reset; user must change on next login');
    void reload();
  };

  const disableTotp = async (u: UserRow) => {
    if (!u.totp_enabled) return;
    const ok = await dialog.confirm(
      language === 'zh-TW' ? `清除 ${u.username} 的 2FA 註冊？` : `Clear 2FA enrolment for ${u.username}?`,
      { destructive: true },
    );
    if (!ok) return;
    const r = await fetch(`/api/admin/users/${encodeURIComponent(u.username)}/totp/disable`, {
      method: 'POST', credentials: 'same-origin',
    });
    if (!r.ok) await dialog.alert(`HTTP ${r.status}`);
    void reload();
  };

  const regenBackupCodes = async (u: UserRow) => {
    if (!u.totp_enabled) return;
    // Step-up re-auth: minting 2FA backup codes is a 2FA-bypass primitive, so the
    // admin confirms by re-entering THEIR OWN password (also serves as the "are
    // you sure"). The server verifies it.
    const adminPw = await dialog.prompt(
      language === 'zh-TW'
        ? `重新發行 ${u.username} 的 2FA 備援代碼會讓舊代碼立即失效。請輸入「你自己」的密碼確認：`
        : `Re-issuing ${u.username}'s 2FA backup codes invalidates the old ones. Enter YOUR OWN password to confirm:`,
      { inputType: 'password' },
    );
    if (!adminPw) return;
    try {
      const r = await fetch(`/api/admin/users/${encodeURIComponent(u.username)}/totp/backup-codes`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_password: adminPw }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.status === 403 && d.error === 'admin_reauth_required') {
        await dialog.alert(language === 'zh-TW' ? '密碼確認失敗。' : 'Password confirmation failed.');
        return;
      }
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setReveal({
        title: language === 'zh-TW' ? `${u.username} 的新 2FA 備援代碼` : `New 2FA backup codes for ${u.username}`,
        note: language === 'zh-TW'
          ? '請以安全方式交付給使用者，此畫面關閉後不再顯示。'
          : 'Deliver securely to the user — not shown again after this closes.',
        codes: (d.backup_codes || []) as string[],
      });
    } catch (e: any) {
      await dialog.alert(`Regen failed: ${e.message || e}`);
    }
  };

  const toggleEnabled = async (u: UserRow) => {
    const r = await fetch(`/api/admin/users/${encodeURIComponent(u.username)}/enabled`, {
      method: 'POST', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !u.enabled }),
    });
    if (!r.ok) await dialog.alert(`HTTP ${r.status}`);
    void reload();
  };

  const deleteUser = async (u: UserRow) => {
    const ok = await dialog.confirm(
      language === 'zh-TW' ? `永久刪除使用者 ${u.username}？` : `Permanently delete user ${u.username}?`,
      { destructive: true },
    );
    if (!ok) return;
    const r = await fetch(`/api/admin/users/${encodeURIComponent(u.username)}`, {
      method: 'DELETE', credentials: 'same-origin',
    });
    if (!r.ok) await dialog.alert(`HTTP ${r.status}`);
    void reload();
  };

  const fmtTs = (ts?: number) => {
    if (!ts) return '—';
    const d = new Date(ts);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  };

  if (!isAdminViewer) {
    return (
      <div className="user-admin-noauth">
        <h2>{language === 'zh-TW' ? '需要管理員權限' : 'Admin role required'}</h2>
        <p>{language === 'zh-TW'
          ? '此頁僅限 admin 角色檢視。'
          : 'Only users with the admin role can access this page.'}</p>
      </div>
    );
  }

  const usersSorted = useMemo(
    () => [...users].sort((a, b) => a.username.localeCompare(b.username)),
    [users],
  );

  return (
    <div className="user-admin">
      <div className="ua-header">
        <h1 className="ua-title font-display">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87"/>
            <path d="M16 3.13a4 4 0 010 7.75"/>
          </svg>
          {language === 'zh-TW' ? '使用者管理' : 'User management'}
        </h1>
        <span className="ua-count">{users.length} {language === 'zh-TW' ? '位使用者' : 'users'}</span>
        <button className="ua-btn primary ua-create-btn" onClick={openCreate}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
          {language === 'zh-TW' ? '新增使用者' : 'New user'}
        </button>
      </div>

      {loading && <div className="ua-loading">{language === 'zh-TW' ? '載入中…' : 'Loading…'}</div>}
      {error && <div className="ua-err">{error}</div>}

      {!loading && !error && (
        <div className="ua-table-wrap panel-card">
          <table className="vm-table ua-table">
            <thead>
              <tr>
                <th>{language === 'zh-TW' ? '帳號' : 'Username'}</th>
                <th>{language === 'zh-TW' ? '狀態' : 'Status'}</th>
                <th>2FA</th>
                <th>{language === 'zh-TW' ? '角色' : 'Roles'}</th>
                <th>{language === 'zh-TW' ? '上次登入' : 'Last login'}</th>
                <th className="actions">{language === 'zh-TW' ? '動作' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {usersSorted.map((u) => (
                <tr key={u.id} className={!u.enabled ? 'dim' : ''}>
                  <td>
                    <code className="ua-username">{u.username}</code>
                    {u.must_change_pw && (
                      <span className="ua-badge warn" title={language === 'zh-TW' ? '下次登入需變更密碼' : 'Must change password'}>!</span>
                    )}
                  </td>
                  <td>
                    <span className={`ua-state-pill ${u.enabled ? 'on' : 'off'}`}>
                      {u.enabled
                        ? (language === 'zh-TW' ? '啟用' : 'Enabled')
                        : (language === 'zh-TW' ? '停用' : 'Disabled')}
                    </span>
                  </td>
                  <td>
                    {u.totp_enabled ? (
                      <span className="ua-totp on" title="2FA enrolled">●</span>
                    ) : (
                      <span className="ua-totp off" title="No 2FA">○</span>
                    )}
                  </td>
                  <td>
                    <div className="ua-roles">
                      {u.roles.length === 0
                        ? <span className="muted">—</span>
                        : u.roles.map((r, i) => (
                          <span key={i} className={`ua-role role-${r.role}`}>
                            {r.role}
                            <span className="ua-role-scope">
                              @{r.cluster_id === '*' ? 'all' : r.cluster_id}
                              {r.vm_pattern !== '*' && ` :${r.vm_pattern}`}
                            </span>
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="muted">{fmtTs(u.last_login_at)}</td>
                  <td className="actions">
                    <button
                      className="ua-icon-btn"
                      onClick={() => setEditing(u)}
                      title={language === 'zh-TW' ? '管理角色' : 'Manage roles'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z"/>
                      </svg>
                    </button>
                    <button
                      className="ua-icon-btn"
                      onClick={() => resetPassword(u)}
                      title={language === 'zh-TW' ? '重設密碼' : 'Reset password'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                      </svg>
                    </button>
                    <button
                      className={`ua-icon-btn ${u.totp_enabled ? '' : 'is-faded'}`}
                      onClick={() => disableTotp(u)}
                      disabled={!u.totp_enabled}
                      title={language === 'zh-TW' ? '清除 2FA' : 'Clear 2FA'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    </button>
                    <button
                      className={`ua-icon-btn ${u.totp_enabled ? '' : 'is-faded'}`}
                      onClick={() => regenBackupCodes(u)}
                      disabled={!u.totp_enabled}
                      title={language === 'zh-TW' ? '重發 2FA 備援代碼' : 'Re-issue 2FA backup codes'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                    </button>
                    <button
                      className="ua-icon-btn"
                      onClick={() => toggleEnabled(u)}
                      title={u.enabled
                        ? (language === 'zh-TW' ? '停用' : 'Disable')
                        : (language === 'zh-TW' ? '啟用' : 'Enable')}
                    >
                      {u.enabled ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
                        </svg>
                      )}
                    </button>
                    <button
                      className="ua-icon-btn danger"
                      onClick={() => deleteUser(u)}
                      title={language === 'zh-TW' ? '刪除' : 'Delete'}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreate && (
        <div className="ua-modal-overlay" onClick={closeCreate}>
          <div className="ua-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ua-modal-head">
              <span>{language === 'zh-TW' ? '新增本機帳號' : 'Create local user'}</span>
              <button className="ua-icon-btn" onClick={closeCreate} aria-label="close">×</button>
            </div>
            <div className="ua-modal-body">
              <label>{language === 'zh-TW' ? '使用者名稱' : 'Username'}</label>
              <input
                type="text" value={newUsername} autoFocus
                onChange={(e) => setNewUsername(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && newUsername && newPassword.length >= 8) void createUser(); }}
                placeholder={language === 'zh-TW' ? '使用者名稱' : 'username'}
                spellCheck={false} autoComplete="off"
              />
              <label>{language === 'zh-TW' ? '密碼（≥8 字元）' : 'Password (≥8 chars)'}</label>
              <input
                type="password" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && newUsername && newPassword.length >= 8) void createUser(); }}
                placeholder={language === 'zh-TW' ? '密碼（≥8 字元）' : 'password (≥8 chars)'}
                autoComplete="new-password"
              />
              <div className="ua-modal-actions">
                <button className="ua-btn" onClick={closeCreate} disabled={newSubmitting}>
                  {language === 'zh-TW' ? '取消' : 'Cancel'}
                </button>
                <button
                  className="ua-btn primary"
                  disabled={newSubmitting || !newUsername || newPassword.length < 8}
                  onClick={createUser}
                >
                  {newSubmitting
                    ? (language === 'zh-TW' ? '建立中…' : 'Creating…')
                    : (language === 'zh-TW' ? '建立' : 'Create')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {reveal && (
        <div className="ua-modal-overlay" onClick={() => setReveal(null)}>
          <div className="ua-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ua-modal-head">
              <span>{reveal.title}</span>
              <button className="ua-icon-btn" onClick={() => setReveal(null)} aria-label="close">×</button>
            </div>
            <div className="ua-modal-body">
              <div className="ua-reveal-note">{reveal.note}</div>
              <pre className="ua-reveal-codes">{reveal.codes.join('\n')}</pre>
              <div className="ua-modal-actions">
                <button
                  className="ua-btn"
                  onClick={() => { void navigator.clipboard?.writeText(reveal.codes.join('\n')); }}
                >
                  {language === 'zh-TW' ? '複製' : 'Copy'}
                </button>
                <button className="ua-btn primary" onClick={() => setReveal(null)}>
                  {language === 'zh-TW' ? '我已保存' : 'Done'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <RoleEditor
          user={editing}
          onClose={() => { setEditing(null); void reload(); }}
        />
      )}

      <style>{`
        .user-admin {
          padding: var(--spacing-lg);
          height: 100%;
          overflow: auto;
          display: flex; flex-direction: column;
          gap: var(--spacing-md);
        }
        .ua-header {
          display: flex; align-items: center; gap: 16px;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }
        .ua-create-btn {
          margin-left: auto;
          display: inline-flex; align-items: center; gap: 7px;
        }
        /* Title matches the page canon (white h1 + pulsing cyan icon),
           same as PveTasks / BackupJobs / HealthMonitor. */
        .ua-title {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--text-primary);
          display: inline-flex; align-items: center; gap: var(--spacing-sm);
        }
        .ua-title svg {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: ua-title-pulse 2s ease-in-out infinite;
        }
        @keyframes ua-title-pulse {
          0%, 100% { opacity: 0.85; transform: none; }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        .ua-count {
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 13px;
        }
        /* Create-user modal */
        .ua-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 600;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .ua-modal {
          width: 100%; max-width: 420px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid var(--primary);
          border-radius: var(--radius-md, 8px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 60px -20px rgba(0,240,255,0.4);
          animation: uaModalIn .16s ease-out;
        }
        @keyframes uaModalIn { from { transform: translateY(12px); opacity: 0 } to { transform: none; opacity: 1 } }
        .ua-modal-head {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          border-radius: var(--radius-md, 8px) var(--radius-md, 8px) 0 0;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .ua-modal-head span { margin-right: auto; }
        .ua-modal-body { padding: 18px 16px; display: flex; flex-direction: column; gap: 6px; }
        .ua-modal-body label {
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 8px;
        }
        .ua-modal-body input {
          padding: 9px 11px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
        }
        .ua-modal-body input:focus { border-color: var(--primary); }
        .ua-modal-body input::placeholder { color: var(--text-secondary); opacity: 1; }
        .ua-modal-actions {
          display: flex; justify-content: flex-end; gap: 10px;
          margin-top: 18px;
        }
        .ua-reveal-note {
          font-size: 12px; color: var(--text-secondary);
          line-height: 1.5; margin-bottom: 4px;
        }
        .ua-reveal-codes {
          margin: 0; padding: 12px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 14px; letter-spacing: 0.08em;
          color: var(--text-primary);
          white-space: pre-wrap; overflow-wrap: anywhere;
          user-select: all;
        }

        .ua-btn {
          padding: 6px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .ua-btn.primary {
          background: rgba(0,240,255,0.12);
          border-color: var(--primary);
          color: var(--primary);
        }
        .ua-btn.primary:hover:not(:disabled) {
          background: rgba(0,240,255,0.22);
          box-shadow: 0 0 12px rgba(0,240,255,0.3);
        }
        .ua-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .ua-loading, .ua-err {
          padding: 24px;
          text-align: center;
          color: var(--text-muted);
        }
        .ua-err { color: var(--danger, #ff4d6d); }

        /* Table look inherited from the global .vm-table standard
           (matrix); only the wrapper + right-aligned actions column are
           local. The rows aren't clickable here, so reset the cursor. */
        .ua-table-wrap { overflow: auto; }
        .ua-table tbody tr { cursor: default; }
        .ua-table th.actions, .ua-table td.actions { text-align: right; }
        .ua-table .muted, .ua-table td.muted { color: var(--text-secondary); }

        .ua-username { color: var(--primary); font-weight: 600; }
        .ua-badge.warn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px; height: 16px;
          margin-left: 6px;
          background: rgba(255,165,0,0.2);
          border: 1px solid #ffa500;
          color: #ffa500;
          border-radius: 50%;
          font-weight: 700;
          font-size: 11px;
        }

        .ua-state-pill {
          display: inline-block;
          padding: 1px 8px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 999px;
          border: 1px solid currentColor;
        }
        .ua-state-pill.on  { color: var(--success, #00ff88); }
        .ua-state-pill.off { color: var(--text-muted); }

        .ua-totp { font-size: 16px; }
        .ua-totp.on  { color: #00ff88; text-shadow: 0 0 6px rgba(0,255,136,0.5); }
        .ua-totp.off { color: var(--text-muted); }

        .ua-roles { display: flex; flex-wrap: wrap; gap: 4px; }
        .ua-role {
          display: inline-flex; align-items: baseline; gap: 4px;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ua-role.role-admin    { color: #ffa500; background: rgba(255,165,0,0.12); border: 1px solid rgba(255,165,0,0.4); }
        .ua-role.role-operator { color: var(--primary); background: rgba(0,240,255,0.12); border: 1px solid rgba(0,240,255,0.4); }
        .ua-role.role-viewer   { color: #b464ff; background: rgba(180,100,255,0.12); border: 1px solid rgba(180,100,255,0.4); }
        .ua-role-scope { font-weight: 400; opacity: 0.75; font-size: 10px; }

        .ua-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          margin-left: 4px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .ua-icon-btn:hover:not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0,240,255,0.08);
        }
        .ua-icon-btn.danger:hover:not(:disabled) {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          background: rgba(255,77,109,0.08);
        }
        .ua-icon-btn:disabled, .ua-icon-btn.is-faded { opacity: 0.35; cursor: not-allowed; }

        .user-admin-noauth {
          padding: 80px 24px;
          text-align: center;
          color: var(--text-secondary);
        }
        .user-admin-noauth h2 {
          color: var(--danger, #ff4d6d);
          font-family: var(--font-display);
          letter-spacing: 0.08em;
        }
      `}</style>
    </div>
  );
}


// ----- Role editor drawer ---------------------------------------------------

function RoleEditor({ user, onClose }: { user: UserRow; onClose: () => void }) {
  const { language } = useTranslation();
  const dialog = useDialogs();
  const [busy, setBusy] = useState(false);
  // Add-row form
  const [clusterId, setClusterId] = useState('*');
  const [role, setRole] = useState<UserRole['role']>('viewer');
  const [vmPattern, setVmPattern] = useState('*');

  const grant = async () => {
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/users/${encodeURIComponent(user.username)}/roles`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cluster_id: clusterId, role, vm_pattern: vmPattern }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);
      onClose();
    } catch (e) {
      await dialog.alert(`${e}`);
    } finally {
      setBusy(false);
    }
  };

  const revoke = async (rrole: UserRole) => {
    setBusy(true);
    try {
      const qs = new URLSearchParams({
        cluster_id: rrole.cluster_id, vm_pattern: rrole.vm_pattern,
      }).toString();
      const r = await fetch(
        `/api/admin/users/${encodeURIComponent(user.username)}/roles?${qs}`,
        { method: 'DELETE', credentials: 'same-origin' },
      );
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      onClose();
    } catch (e) {
      await dialog.alert(`${e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ua-drawer-overlay" onClick={() => !busy && onClose()}>
      <div className="ua-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="ua-drawer-head">
          <span>{language === 'zh-TW' ? '管理角色' : 'Manage roles'}: </span>
          <code>{user.username}</code>
          <button className="ua-icon-btn" onClick={() => !busy && onClose()}>×</button>
        </div>
        <div className="ua-drawer-body">
          <div className="ua-existing">
            <div className="ua-section-h">{language === 'zh-TW' ? '現有授權' : 'Current grants'}</div>
            {user.roles.length === 0
              ? <div className="muted">{language === 'zh-TW' ? '無' : 'None'}</div>
              : user.roles.map((r, i) => (
                <div className="ua-grant-row" key={i}>
                  <span className={`ua-role role-${r.role}`}>{r.role}</span>
                  <code className="ua-grant-scope">@{r.cluster_id}{r.vm_pattern !== '*' && ` :${r.vm_pattern}`}</code>
                  <button className="ua-icon-btn danger" onClick={() => revoke(r)} disabled={busy} title="Revoke">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"/>
                    </svg>
                  </button>
                </div>
              ))}
          </div>
          <div className="ua-section-h">{language === 'zh-TW' ? '新增授權' : 'Add grant'}</div>
          <div className="ua-grant-form">
            <label>{language === 'zh-TW' ? '叢集 ID（* = 全部）' : 'Cluster ID (* = all)'}</label>
            <input type="text" value={clusterId} onChange={(e) => setClusterId(e.target.value)} />
            <label>{language === 'zh-TW' ? '角色' : 'Role'}</label>
            <CyberSelect<UserRole['role']>
              value={role}
              options={[
                { value: 'viewer', label: 'viewer' },
                { value: 'operator', label: 'operator' },
                { value: 'admin', label: 'admin' },
              ]}
              onChange={(v) => setRole(v)}
            />
            <label>{language === 'zh-TW' ? 'VM pattern（* = 任何 VM、prod-* = 名稱比對、tag:prod = 標籤比對）' : 'VM pattern (* = any VM, prod-* = name glob, tag:prod = tag match)'}</label>
            <input type="text" value={vmPattern} onChange={(e) => setVmPattern(e.target.value)} />
            <button className="ua-btn primary" disabled={busy} onClick={grant}>
              {busy ? '…' : (language === 'zh-TW' ? '授權' : 'Grant')}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .ua-drawer-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 600;
          display: flex; justify-content: flex-end;
        }
        .ua-drawer {
          width: 100%;
          max-width: 480px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border-left: 1px solid var(--primary);
          box-shadow: -16px 0 60px rgba(0,0,0,0.6), -16px 0 80px -20px rgba(0,240,255,0.3);
          display: flex; flex-direction: column;
          animation: uaDrawerIn .18s ease-out;
        }
        @keyframes uaDrawerIn { from { transform: translateX(40px); opacity: 0 } to { transform: none; opacity: 1 } }
        .ua-drawer-head {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .ua-drawer-head code { color: var(--text-primary); margin-right: auto; }
        .ua-drawer-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; overflow: auto; }
        .ua-section-h {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 4px;
          padding-bottom: 5px;
          border-bottom: 1px solid var(--border);
        }
        .ua-existing { display: flex; flex-direction: column; gap: 6px; }
        .ua-grant-row {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 8px;
          background: rgba(0,240,255,0.04);
          border-radius: 4px;
        }
        .ua-grant-scope { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); flex: 1; }
        .ua-grant-form { display: flex; flex-direction: column; gap: 6px; }
        /* 12px floor on drawer labels — the earlier 10px caps were
           borderline unreadable on the dark backdrop (operator feedback). */
        .ua-grant-form label {
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .ua-grant-form input {
          padding: 8px 10px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
        }
        .ua-grant-form input:focus { border-color: var(--primary); }
      `}</style>
    </div>
  );
}
