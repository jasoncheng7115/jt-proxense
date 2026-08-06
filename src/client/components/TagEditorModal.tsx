/**
 * TagEditorModal — read + edit VM/CT tags. PVE stores tags as a
 * `;`-separated list in the config. We surface them as chips with
 * add/remove + a suggestion strip pulled from peer VMs in the cluster.
 *
 * Server endpoint: PUT /api/clusters/{cid}/vms/{vmid}/tags  body: {tags: "a;b;c"}
 * Operator+ can edit, viewer is read-only with a banner.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { useAuth } from '../composables/useAuth';
import type { ClusterData } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  clusterId: string;
  vmid: number;
  currentTags: string;        // raw "a;b;c"
  vmName?: string;
  // Used to compute peer-tag suggestions.
  clusters: Record<string, ClusterData>;
  // Caller refresh hook (e.g. WS broadcast picks up new tags within a sec
  // anyway; this lets the menu refresh immediately on save without waiting).
  onSaved?: (newTags: string) => void;
}

const splitTags = (s: string): string[] =>
  (s || '').split(/[,;]/).map((t) => t.trim()).filter(Boolean);

export function TagEditorModal({
  open, onClose, clusterId, vmid, currentTags, vmName, clusters, onSaved,
}: Props) {
  const { t, language } = useTranslation();
  const auth = useAuth();
  const isWritable = auth.user?.role_global === 'admin'
                  || auth.user?.role_global === 'operator';

  const [tags, setTags] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTags(splitTags(currentTags));
      setDraft('');
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open, currentTags]);

  // Peer suggestions: every distinct tag used by VMs in the same cluster,
  // minus tags already on this VM.
  const suggestions = useMemo(() => {
    const cluster = clusters[clusterId];
    if (!cluster) return [];
    const set = new Set<string>();
    for (const v of Object.values((cluster as any).vms || {}) as any[]) {
      for (const t of splitTags(v.tags || '')) set.add(t);
    }
    for (const tg of tags) set.delete(tg);
    return Array.from(set).sort();
  }, [clusters, clusterId, tags]);

  const addTag = (raw: string) => {
    const tg = raw.trim();
    if (!tg) return;
    if (tags.includes(tg)) return;
    if (!/^[A-Za-z0-9_\-.]+$/.test(tg)) {
      setError(language === 'zh-TW'
        ? '標籤只能含字母 / 數字 / 連字號 / 底線 / 句點'
        : 'Tags must be alphanumeric (plus - _ .)');
      return;
    }
    setTags((cur) => [...cur, tg]);
    setError(null);
  };

  const removeTag = (tg: string) => setTags((cur) => cur.filter((t) => t !== tg));

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ';' || e.key === ' ') {
      e.preventDefault();
      addTag(draft);
      setDraft('');
    } else if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
      // backspace into empty input pops the last chip (Slack-style)
      setTags((cur) => cur.slice(0, -1));
    }
  };

  const dirty = useMemo(() => {
    const orig = splitTags(currentTags).sort().join(';');
    const cur  = [...tags].sort().join(';');
    return orig !== cur;
  }, [currentTags, tags]);

  const save = async () => {
    if (!dirty || saving || !isWritable) return;
    setSaving(true); setError(null);
    const newTags = tags.join(';');
    try {
      const r = await fetch(
        `/api/clusters/${encodeURIComponent(clusterId)}/vms/${vmid}/tags`,
        {
          method: 'PUT', credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tags: newTags }),
        }
      );
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      onSaved?.(newTags);
      onClose();
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;
  return (
    <div className="te-back" onClick={onClose}>
      <div className="te-modal" onClick={(e) => e.stopPropagation()}>
        <div className="te-head">
          <div className="te-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span>{t('tagedit.title')}</span>
            {vmName && <span className="te-target">{vmid} — {vmName}</span>}
          </div>
          <button className="te-close" onClick={onClose}>×</button>
        </div>
        <div className="te-body">
          {error && <div className="te-error">{error}</div>}
          {!isWritable && <div className="te-readonly">{t('tagedit.readonly')}</div>}

          <div className="te-chips">
            {tags.map((tg) => (
              <span key={tg} className="te-chip">
                {tg}
                {isWritable && (
                  <button className="te-chip-x" onClick={() => removeTag(tg)} aria-label="remove">×</button>
                )}
              </span>
            ))}
            {isWritable && (
              <input
                ref={inputRef}
                className="te-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={tags.length === 0 ? t('tagedit.placeholder') : ''}
              />
            )}
          </div>

          {isWritable && suggestions.length > 0 && (
            <>
              <div className="te-sug-label">{t('tagedit.suggestions')}</div>
              <div className="te-sug">
                {suggestions.slice(0, 30).map((s) => (
                  <button key={s} className="te-sug-chip" onClick={() => addTag(s)}>+ {s}</button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="te-footer">
          <span className="te-hint">{t('tagedit.hint')}</span>
          <span style={{ flex: 1 }} />
          <button className="te-btn ghost" onClick={onClose}>{t('notes.cancel')}</button>
          {isWritable && (
            <button className="te-btn primary" onClick={save} disabled={!dirty || saving}>
              {saving ? t('notes.saving') : t('notes.save')}
            </button>
          )}
        </div>
        <style>{`
          .te-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .te-modal { width: min(640px, 96vw); display: flex; flex-direction: column; max-height: 86vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: te-in .18s ease-out; overflow: hidden; }
          @keyframes te-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .te-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .te-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .te-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .te-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .te-close:hover { color: var(--primary); }
          .te-body { flex: 1; padding: 14px 18px; overflow: auto; }
          .te-error { padding: 8px 14px; margin-bottom: 8px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .te-readonly { padding: 8px 14px; margin-bottom: 8px; border: 1px solid var(--warning); border-left-width: 3px; background: rgba(255, 107, 0, 0.08); color: var(--warning); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }

          .te-chips { display: flex; gap: 6px 8px; flex-wrap: wrap; padding: 10px 12px; min-height: 60px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; align-items: center; }
          .te-chip { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px 3px 10px; border-radius: 999px; background: rgba(0, 240, 255, 0.12); border: 1px solid var(--primary); color: var(--primary); font-family: var(--font-mono); font-size: 13.5px; }
          .te-chip-x { background: transparent; border: none; color: currentColor; cursor: pointer; padding: 0 4px; font-size: 14px; line-height: 1; opacity: .8; }
          .te-chip-x:hover { opacity: 1; color: var(--danger, #ff4d6d); }
          .te-input { flex: 1; min-width: 120px; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-mono); font-size: 13px; padding: 4px; }

          .te-sug-label { margin-top: 14px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); }
          .te-sug { margin-top: 6px; display: flex; gap: 4px 6px; flex-wrap: wrap; }
          .te-sug-chip { padding: 2px 8px; border: 1px dashed rgba(0, 240, 255, 0.3); background: transparent; color: var(--text-secondary); font-family: var(--font-mono); font-size: 12.5px; border-radius: 999px; cursor: pointer; }
          .te-sug-chip:hover { color: var(--primary); border-color: var(--primary); border-style: solid; }

          .te-footer { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); }
          .te-hint { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); }
          .te-btn { padding: 6px 16px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .te-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border: none; }
          .te-btn.primary:hover:not(:disabled) { box-shadow: 0 0 16px rgba(0, 240, 255, 0.4); }
          .te-btn.primary:disabled { opacity: .4; cursor: not-allowed; }
          .te-btn.ghost { color: var(--text-secondary); background: transparent; border: 1px solid rgba(0, 240, 255, 0.4); }
          .te-btn.ghost:hover { color: var(--primary); border-color: var(--primary); }
        `}</style>
      </div>
    </div>
  );
}
