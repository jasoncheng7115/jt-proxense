/**
 * APITokensModal — admin-only PVE API tokens management:
 *   - list every token across the cluster (read-only fan-out)
 *   - create a new token (secret returned ONCE; UI shows + warns)
 *   - revoke a token (immediate, audited, confirmation required)
 *
 * Security UX notes (OWASP A04 — secure design):
 *   * The newly minted secret is shown in a dedicated reveal panel that
 *     replaces the create form. The operator must explicitly acknowledge
 *     ("I have copied the secret") before the panel closes.
 *   * The secret is never auto-copied to clipboard; the operator clicks
 *     the Copy button so the action is intentional.
 *   * The secret is held only in component state; once the panel closes
 *     the React state is dropped and the value is gone.
 *   * Revoke is destructive and uses useDialogs().confirm with `destructive`.
 */
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
}

interface Token {
  user: string;
  tokenid: string;
  comment?: string;
  expire?: number;
  privsep?: boolean;
}

// Mirrors server-side _USERID_RE / _TOKENID_RE so the client gives instant
// feedback. Server is authoritative; this is just UX.
const USERID_RE = /^[A-Za-z0-9._\-]{1,64}@[a-z][a-z0-9\-]{0,32}$/;
const TOKENID_RE = /^[A-Za-z][A-Za-z0-9._\-]{0,63}$/;

const fmtExpire = (s?: number, lang?: string) => {
  if (!s) return lang === 'zh-TW' ? '無到期' : 'never';
  const d = new Date(s * 1000);
  const left = Math.floor((s - Date.now() / 1000) / 86400);
  const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (left < 0) return `${stamp} (${lang === 'zh-TW' ? '已過期' : 'expired'})`;
  if (left < 30) return `${stamp} (${left}d)`;
  return stamp;
};

export function APITokensModal({ open, onClose, clusterId }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [reload, setReload] = useState(0);

  // Create-form state
  const [showCreate, setShowCreate] = useState(false);
  const [cUser, setCUser] = useState('');
  const [cTokenid, setCTokenid] = useState('');
  const [cPrivsep, setCPrivsep] = useState(true);
  const [cExpire, setCExpire] = useState('');
  const [cComment, setCComment] = useState('');
  const [cBusy, setCBusy] = useState(false);
  const [cError, setCError] = useState<string | null>(null);

  // Reveal-secret state (post-create)
  const [revealed, setRevealed] = useState<{ full: string; value: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/tokens`,
          { credentials: 'same-origin' }
        );
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (alive) setTokens(data.tokens || []);
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId, reload]);

  // When the modal closes, scrub all secret-bearing state so re-opening
  // is a clean slate (defense in depth — secrets shouldn't outlive a session).
  useEffect(() => {
    if (open) return;
    setShowCreate(false);
    setCUser(''); setCTokenid(''); setCPrivsep(true);
    setCExpire(''); setCComment('');
    setCError(null); setCBusy(false);
    setRevealed(null); setCopied(false);
  }, [open]);

  const visible = useMemo(() => {
    const fl = filter.trim().toLowerCase();
    if (!fl) return tokens;
    return tokens.filter((t) =>
      t.user.toLowerCase().includes(fl) ||
      t.tokenid.toLowerCase().includes(fl) ||
      (t.comment || '').toLowerCase().includes(fl)
    );
  }, [tokens, filter]);

  const submitCreate = async () => {
    setCError(null);
    if (!USERID_RE.test(cUser.trim())) {
      setCError(t('apitok.error.bad_userid')); return;
    }
    if (!TOKENID_RE.test(cTokenid.trim())) {
      setCError(t('apitok.error.bad_tokenid')); return;
    }
    let expireEpoch: number | null = null;
    if (cExpire.trim()) {
      const ts = Math.floor(new Date(cExpire).getTime() / 1000);
      if (!Number.isFinite(ts) || ts <= 0) {
        setCError(t('apitok.error.create_failed')); return;
      }
      expireEpoch = ts;
    }
    setCBusy(true);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/users/${encodeURIComponent(cUser.trim())}/tokens`,
        {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tokenid: cTokenid.trim(),
            privsep: cPrivsep,
            expire: expireEpoch,
            comment: cComment.trim(),
          }),
        }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      setRevealed({ full: d.full_tokenid || `${cUser}!${cTokenid}`, value: d.value || '' });
      setShowCreate(false);
      setReload((n) => n + 1);
    } catch (e: any) {
      setCError(`${t('apitok.error.create_failed')}: ${e.message || e}`);
    } finally {
      setCBusy(false);
    }
  };

  const revoke = async (tk: Token) => {
    const ok = await dialog.confirm(
      t('apitok.revoke_confirm_body').replace('{tok}', `${tk.user}!${tk.tokenid}`),
      { title: t('apitok.revoke_confirm_title'), destructive: true }
    );
    if (!ok) return;
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/users/${encodeURIComponent(tk.user)}/tokens/${encodeURIComponent(tk.tokenid)}`,
        { method: 'DELETE', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      }
      setReload((n) => n + 1);
    } catch (e: any) {
      await dialog.alert(`${t('apitok.error.delete_failed')}: ${e.message || e}`);
    }
  };

  const copyValue = async () => {
    if (!revealed) return;
    try {
      await navigator.clipboard.writeText(revealed.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. http origin without permission).
      // Surface a fallback by selecting the text in the input.
      const el = document.getElementById('apitok-secret-input') as HTMLInputElement | null;
      if (el) { el.focus(); el.select(); }
    }
  };

  if (!open) return null;
  return (
    <div className="at-back" onClick={onClose}>
      <div className="at-modal" onClick={(e) => e.stopPropagation()}>
        <div className="at-head">
          <div className="at-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
            <span>{t('apitok.title')}</span>
          </div>
          <div className="at-actions">
            {!showCreate && !revealed && (
              <button className="at-create-btn" onClick={() => setShowCreate(true)}>
                {t('apitok.create_btn')}
              </button>
            )}
            <input
              className="at-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t('apitok.filter_ph')}
            />
            <button className="at-close" onClick={onClose}>×</button>
          </div>
        </div>

        {revealed && (
          <div className="at-reveal">
            <div className="at-reveal-title">{t('apitok.created_title')}</div>
            <div className="at-reveal-warn">⚠ {t('apitok.created_warning')}</div>
            <div className="at-reveal-row">
              <label>{t('apitok.created_full')}</label>
              <code className="at-reveal-full">{revealed.full}</code>
            </div>
            <div className="at-reveal-row">
              <label>{t('apitok.created_value')}</label>
              <input
                id="apitok-secret-input"
                className="at-reveal-secret"
                readOnly
                value={revealed.value}
                onFocus={(e) => e.currentTarget.select()}
              />
              <button className="at-copy-btn" onClick={copyValue}>
                {copied ? t('apitok.copied') : t('apitok.copy')}
              </button>
            </div>
            <div className="at-reveal-actions">
              <button className="at-create-submit" onClick={() => { setRevealed(null); setCopied(false); }}>
                {t('apitok.created_done')}
              </button>
            </div>
          </div>
        )}

        {showCreate && (
          <div className="at-create">
            <div className="at-create-title">{t('apitok.create_title')}</div>
            {cError && <div className="at-error">{cError}</div>}
            <div className="at-form-row">
              <label>{t('apitok.field.user')}</label>
              <input
                value={cUser}
                onChange={(e) => setCUser(e.target.value)}
                placeholder="user@pam"
                spellCheck={false}
              />
            </div>
            <div className="at-form-row">
              <label>{t('apitok.field.tokenid')}</label>
              <input
                value={cTokenid}
                onChange={(e) => setCTokenid(e.target.value)}
                placeholder="my-token"
                spellCheck={false}
              />
              <small>{t('apitok.field.tokenid_help')}</small>
            </div>
            <div className="at-form-row at-form-row-check">
              <label>
                <input
                  type="checkbox"
                  checked={cPrivsep}
                  onChange={(e) => setCPrivsep(e.target.checked)}
                />
                <span>{t('apitok.field.privsep')}</span>
              </label>
              <small>{t('apitok.field.privsep_help')}</small>
            </div>
            <div className="at-form-row">
              <label>{t('apitok.field.expire')}</label>
              <input
                type="datetime-local"
                value={cExpire}
                onChange={(e) => setCExpire(e.target.value)}
              />
              <small>{t('apitok.field.expire_help')}</small>
            </div>
            <div className="at-form-row">
              <label>{t('apitok.field.comment')}</label>
              <input
                value={cComment}
                onChange={(e) => setCComment(e.target.value)}
                maxLength={256}
              />
            </div>
            <div className="at-form-actions">
              <button
                className="at-create-cancel"
                onClick={() => { setShowCreate(false); setCError(null); }}
                disabled={cBusy}
              >
                {t('apitok.create_cancel')}
              </button>
              <button
                className="at-create-submit"
                onClick={submitCreate}
                disabled={cBusy || !cUser.trim() || !cTokenid.trim()}
              >
                {cBusy ? '…' : t('apitok.create_submit')}
              </button>
            </div>
          </div>
        )}

        <div className="at-body">
          {error && <div className="at-error">{error}</div>}
          {loading && tokens.length === 0 && <div className="at-empty">{t('apitok.loading')}</div>}
          {!loading && tokens.length === 0 && !error && (
            <div className="at-empty">{t('apitok.empty')}</div>
          )}
          {visible.length > 0 && (
            <table className="at-table">
              <thead>
                <tr>
                  <th>{t('apitok.col.user')}</th>
                  <th>{t('apitok.col.token')}</th>
                  <th>{t('apitok.col.privsep')}</th>
                  <th>{t('apitok.col.expire')}</th>
                  <th>{t('apitok.col.comment')}</th>
                  <th>{t('apitok.col.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((tk) => {
                  const expSoon = tk.expire && tk.expire > 0
                                  && tk.expire - Date.now() / 1000 < 30 * 86400;
                  const expired = tk.expire && tk.expire > 0
                                  && tk.expire - Date.now() / 1000 < 0;
                  return (
                    <tr key={`${tk.user}!${tk.tokenid}`}>
                      <td className="at-mono">{tk.user}</td>
                      <td className="at-mono at-tok">{tk.tokenid}</td>
                      <td>
                        <span className={`at-bool ${tk.privsep ? 'on' : 'off'}`}>
                          {tk.privsep ? 'yes' : 'no'}
                        </span>
                      </td>
                      <td className={`at-mono ${expired ? 'at-bad' : (expSoon ? 'at-warn' : '')}`}>
                        {fmtExpire(tk.expire, language)}
                      </td>
                      <td className="at-mono at-comment" title={tk.comment || ''}>{tk.comment || ''}</td>
                      <td>
                        <button className="at-revoke-btn" onClick={() => revoke(tk)}>
                          {t('apitok.revoke')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="at-footer">{t('apitok.note')}</div>
        <style>{`
          .at-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .at-modal { width: min(960px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: at-in .18s ease-out; overflow: hidden; }
          @keyframes at-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .at-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .at-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .at-actions { display: flex; align-items: center; gap: 8px; }
          .at-filter { padding: 5px 10px; min-width: 200px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .at-filter:focus { border-color: var(--primary); }
          .at-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .at-close:hover { color: var(--primary); }
          .at-create-btn { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0, 240, 255, 0.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .at-create-btn:hover { background: rgba(0, 240, 255, 0.2); box-shadow: 0 0 8px rgba(0,240,255,.4); }
          .at-revoke-btn { padding: 2px 10px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .at-revoke-btn:hover { background: rgba(255, 77, 109, 0.1); }
          .at-create { padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); background: rgba(0, 240, 255, 0.03); }
          .at-create-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; }
          .at-form-row { display: grid; grid-template-columns: 140px 1fr; column-gap: 10px; row-gap: 2px; align-items: center; margin-bottom: 8px; }
          .at-form-row label { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .at-form-row input[type="text"], .at-form-row input:not([type]), .at-form-row input[type="datetime-local"] { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .at-form-row input:focus { border-color: var(--primary); }
          .at-form-row small { grid-column: 2; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .at-form-row-check label { display: flex; align-items: center; gap: 8px; color: var(--text-primary); }
          .at-form-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
          .at-create-cancel { padding: 6px 16px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .at-create-submit { padding: 6px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .at-create-submit:disabled, .at-create-cancel:disabled { opacity: .4; cursor: not-allowed; }
          .at-reveal { padding: 14px 18px; border-bottom: 1px solid rgba(255, 200, 0, 0.4); background: linear-gradient(180deg, rgba(255, 200, 0, 0.08), rgba(255, 200, 0, 0.02)); }
          .at-reveal-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--warning); margin-bottom: 6px; }
          .at-reveal-warn { font-family: var(--font-mono); font-size: 13px; color: var(--warning); margin-bottom: 12px; line-height: 1.4; }
          .at-reveal-row { display: grid; grid-template-columns: 140px 1fr auto; column-gap: 10px; align-items: center; margin-bottom: 8px; }
          .at-reveal-row label { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .at-reveal-full { font-family: var(--font-mono); font-size: 13px; color: var(--primary); padding: 5px 10px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; }
          .at-reveal-secret { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(255, 200, 0, 0.04); color: var(--warning); border: 1px solid rgba(255, 200, 0, 0.4); border-radius: 3px; outline: none; }
          .at-copy-btn { padding: 5px 12px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--warning); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .at-copy-btn:hover { background: rgba(255, 200, 0, 0.1); }
          .at-reveal-actions { display: flex; justify-content: flex-end; margin-top: 8px; }
          .at-body { flex: 1; overflow: auto; padding: 6px 0; }
          .at-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .at-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .at-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .at-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .at-table th { padding: 6px 14px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .at-table td { padding: 4px 14px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .at-mono { font-family: var(--font-mono); }
          .at-tok { color: var(--primary); }
          .at-bad { color: var(--danger, #ff4d6d); }
          .at-warn { color: var(--warning); }
          .at-comment { max-width: 320px; overflow: hidden; text-overflow: ellipsis; }
          .at-bool { display: inline-block; padding: 1px 8px; border-radius: 999px; border: 1px solid currentColor; font-size: 13.5px; font-family: var(--font-mono); }
          .at-bool.on { color: var(--success); }
          .at-bool.off { color: var(--text-muted); }
          .at-footer { padding: 8px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
        `}</style>
      </div>
    </div>
  );
}
