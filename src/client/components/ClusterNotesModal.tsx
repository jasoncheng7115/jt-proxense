/**
 * ClusterNotesModal — admin-editable, viewer-readable per-cluster ops notes.
 *
 * Common uses:
 *   - "PROD cluster — never reboot host-101 during business hours"
 *   - "host-104 still on legacy SSDs, plan migration before EOQ3"
 *   - "ceph-mon on host-108, monitor for OOM"
 *
 * Plain text only (no markdown rendering) — keep it simple and obvious.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useAuth } from '../composables/useAuth';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  clusterName?: string;
}

export function ClusterNotesModal({ open, onClose, clusterId, clusterName }: Props) {
  const { t, language } = useTranslation();
  const auth = useAuth();
  const dialog = useDialogs();
  const isAdmin = auth.user?.role_global === 'admin';

  const [text, setText] = useState('');
  const [origText, setOrigText] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [updatedAt, setUpdatedAt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setLoading(true); setError(null);
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(clusterId)}/notes`,
          { credentials: 'same-origin' }
        );
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          throw new Error(d.error || `HTTP ${r.status}`);
        }
        const data = await r.json();
        if (!alive) return;
        setText(data.notes || '');
        setOrigText(data.notes || '');
        setUpdatedBy(data.updated_by || '');
        setUpdatedAt(data.updated_at || 0);
      } catch (e: any) {
        if (alive) setError(e.message || String(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [open, clusterId]);

  const dirty = text !== origText;

  const save = async () => {
    if (!dirty || saving) return;
    setSaving(true); setError(null);
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/notes`,
        {
          method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: text }),
        }
      );
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      setOrigText(text);
      setUpdatedBy(auth.user?.username || '');
      setUpdatedAt(Math.floor(Date.now() / 1000));
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setSaving(false);
    }
  };

  const tryClose = async () => {
    if (dirty) {
      const ok = await dialog.confirm(
        language === 'zh-TW' ? '尚未儲存的內容會丟掉，確定關閉？' : 'Unsaved changes will be lost. Close anyway?',
        { destructive: true }
      );
      if (!ok) return;
    }
    onClose();
  };

  if (!open) return null;
  return (
    <div className="cn-back" onClick={tryClose}>
      <div className="cn-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cn-head">
          <div className="cn-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span>{t('notes.title')}</span>
            {clusterName && <span className="cn-target">{clusterName}</span>}
          </div>
          <button className="cn-close" onClick={tryClose}>×</button>
        </div>
        <div className="cn-meta">
          {updatedAt > 0
            ? <span>{t('notes.updated_by')} <b>{updatedBy || '?'}</b> · {new Date(updatedAt * 1000).toLocaleString()}</span>
            : <span>{t('notes.never_set')}</span>}
          {!isAdmin && <span className="cn-readonly">{t('notes.readonly')}</span>}
          {dirty && <span className="cn-dirty">{t('notes.dirty')}</span>}
        </div>
        <div className="cn-body">
          {error && <div className="cn-error">{error}</div>}
          <textarea
            className="cn-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!isAdmin || loading || saving}
            placeholder={t('notes.placeholder')}
          />
        </div>
        <div className="cn-footer">
          <span className="cn-charcount">{text.length} / 16384</span>
          <span style={{ flex: 1 }} />
          <button className="cn-btn ghost" onClick={tryClose}>{t('notes.cancel')}</button>
          {isAdmin && (
            <button className="cn-btn primary" onClick={save} disabled={!dirty || saving}>
              {saving ? t('notes.saving') : t('notes.save')}
            </button>
          )}
        </div>
        <style>{`
          .cn-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .cn-modal { width: min(720px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: cn-in .18s ease-out; overflow: hidden; }
          @keyframes cn-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .cn-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .cn-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .cn-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13px; letter-spacing: .04em; text-transform: none; }
          .cn-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .cn-close:hover { color: var(--primary); }
          .cn-meta { padding: 8px 18px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.08); display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
          .cn-meta b { color: var(--text-primary); font-weight: 600; }
          .cn-readonly { color: var(--warning); }
          .cn-dirty { color: var(--accent); }
          .cn-body { flex: 1; padding: 14px 18px; display: flex; flex-direction: column; }
          .cn-error { padding: 8px 14px; margin-bottom: 8px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .cn-text { flex: 1; min-height: 240px; padding: 12px 14px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; font-family: var(--font-mono); font-size: 13px; resize: none; outline: none; line-height: 1.5; }
          .cn-text:focus { border-color: var(--primary); }
          .cn-text:disabled { opacity: .85; cursor: default; }
          .cn-footer { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); }
          .cn-charcount { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .cn-btn { padding: 6px 16px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .cn-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border: none; }
          .cn-btn.primary:hover:not(:disabled) { box-shadow: 0 0 16px rgba(0, 240, 255, 0.4); }
          .cn-btn.primary:disabled { opacity: .4; cursor: not-allowed; }
          .cn-btn.ghost { color: var(--text-secondary); background: transparent; border: 1px solid rgba(0, 240, 255, 0.4); }
          .cn-btn.ghost:hover { color: var(--primary); border-color: var(--primary); }
        `}</style>
      </div>
    </div>
  );
}
