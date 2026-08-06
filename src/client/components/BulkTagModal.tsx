/**
 * BulkTagModal — apply a tag set change to N selected VM/CTs at once.
 *
 * Modes:
 *   - 'add'     : merge new tags into each VM's existing list
 *   - 'remove'  : strip these tags from each VM's existing list
 *   - 'replace' : overwrite each VM's tags with the new list
 *
 * Fans out one PUT /api/clusters/{cid}/vms/{vmid}/tags per selection.
 * Existing tags are read from the latest WS-broadcast cluster data —
 * we don't re-fetch per VM to keep the UX snappy.
 */
import { useMemo, useState } from 'react';
import { useTranslation } from '../i18n';
import type { VMMetrics, ClusterData } from '../types';

interface SelectedVM {
  clusterId: string;
  vm: VMMetrics;
}

interface Props {
  open: boolean;
  onClose: () => void;
  selected: SelectedVM[];          // already-resolved selected VMs
  clusters: Record<string, ClusterData>;
  onApplied?: () => void;
}

type Mode = 'add' | 'remove' | 'replace';

const splitTags = (s: string): string[] =>
  (s || '').split(/[,;]/).map((t) => t.trim()).filter(Boolean);

export function BulkTagModal({ open, onClose, selected, clusters, onApplied }: Props) {
  const { t, language } = useTranslation();
  const [mode, setMode] = useState<Mode>('add');
  const [tags, setTags] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<{ ok: number; fail: number; errs: string[] } | null>(null);

  // Suggestion strip: union of every tag used across the selected clusters.
  const suggestions = useMemo(() => {
    const set = new Set<string>();
    for (const sel of selected) {
      const c = clusters[sel.clusterId];
      if (!c) continue;
      for (const v of Object.values((c as any).vms || {}) as any[]) {
        for (const tg of splitTags(v.tags || '')) set.add(tg);
      }
    }
    for (const tg of tags) set.delete(tg);
    return Array.from(set).sort();
  }, [selected, clusters, tags]);

  const addTag = (raw: string) => {
    const tg = raw.trim();
    if (!tg) return;
    if (!/^[A-Za-z0-9_\-.]+$/.test(tg)) return;
    if (tags.includes(tg)) return;
    setTags((c) => [...c, tg]);
  };

  const removeTag = (tg: string) =>
    setTags((c) => c.filter((t) => t !== tg));

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ';' || e.key === ' ') {
      e.preventDefault();
      addTag(draft);
      setDraft('');
    } else if (e.key === 'Backspace' && draft === '' && tags.length > 0) {
      setTags((c) => c.slice(0, -1));
    }
  };

  const apply = async () => {
    if (busy) return;
    if (tags.length === 0 && mode !== 'replace') return;
    setBusy(true);
    setResults(null);
    let ok = 0, fail = 0;
    const errs: string[] = [];
    // Per-VM compute new tag list given the chosen mode.
    const reqs = selected.map(async (sel) => {
      const cur = splitTags((sel.vm as any).tags || '');
      let next: string[];
      if (mode === 'replace')      next = [...tags];
      else if (mode === 'add')     next = Array.from(new Set([...cur, ...tags]));
      else /* remove */            next = cur.filter((t) => !tags.includes(t));
      try {
        const r = await fetch(
          `/api/clusters/${encodeURIComponent(sel.clusterId)}/vms/${sel.vm.vmid}/tags`,
          {
            method: 'PUT', credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tags: next.join(';') }),
          }
        );
        if (r.ok) ok++;
        else {
          fail++;
          const d = await r.json().catch(() => ({}));
          errs.push(`#${sel.vm.vmid}: ${d.error || `HTTP ${r.status}`}`);
        }
      } catch (e: any) {
        fail++;
        errs.push(`#${sel.vm.vmid}: ${e?.message || 'unknown'}`);
      }
    });
    await Promise.all(reqs);
    setResults({ ok, fail, errs });
    setBusy(false);
    if (fail === 0) onApplied?.();
  };

  if (!open) return null;
  return (
    <div className="bt-back" onClick={onClose}>
      <div className="bt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bt-head">
          <div className="bt-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <span>{t('bulk.tag_title')}</span>
            <span className="bt-target">
              {language === 'zh-TW' ? `${selected.length} 個目標` : `${selected.length} target(s)`}
            </span>
          </div>
          <button className="bt-close" onClick={onClose}>×</button>
        </div>
        <div className="bt-body">
          <div className="bt-modes">
            {(['add', 'remove', 'replace'] as Mode[]).map((m) => (
              <label key={m} className={`bt-mode ${mode === m ? 'on' : ''}`}>
                <input type="radio" checked={mode === m} onChange={() => setMode(m)} />
                {t(`bulk.tag_mode.${m}`)}
              </label>
            ))}
          </div>

          <div className="bt-chips">
            {tags.map((tg) => (
              <span key={tg} className="bt-chip">
                {tg}
                <button className="bt-chip-x" onClick={() => removeTag(tg)}>×</button>
              </span>
            ))}
            <input
              className="bt-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onInputKey}
              placeholder={tags.length === 0 ? t('tagedit.placeholder') : ''}
            />
          </div>

          {suggestions.length > 0 && (
            <>
              <div className="bt-sug-label">{t('tagedit.suggestions')}</div>
              <div className="bt-sug">
                {suggestions.slice(0, 30).map((s) => (
                  <button key={s} className="bt-sug-chip" onClick={() => addTag(s)}>+ {s}</button>
                ))}
              </div>
            </>
          )}

          {results && (
            <div className={`bt-results ${results.fail === 0 ? 'ok' : (results.ok === 0 ? 'fail' : 'mixed')}`}>
              <div>{language === 'zh-TW' ? `成功 ${results.ok} / 失敗 ${results.fail}` : `${results.ok} ok / ${results.fail} failed`}</div>
              {results.errs.slice(0, 5).map((e, i) => <div key={i} className="bt-err-line">{e}</div>)}
              {results.errs.length > 5 && <div className="bt-err-line">…</div>}
            </div>
          )}
        </div>
        <div className="bt-footer">
          <span className="bt-hint">{t('tagedit.hint')}</span>
          <span style={{ flex: 1 }} />
          <button className="bt-btn ghost" onClick={onClose}>{t('notes.cancel')}</button>
          <button
            className="bt-btn primary"
            onClick={apply}
            disabled={busy || (tags.length === 0 && mode !== 'replace')}
          >
            {busy ? t('notes.saving') : t('bulk.tag_apply')}
          </button>
        </div>
        <style>{`
          .bt-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .bt-modal { width: min(640px, 96vw); display: flex; flex-direction: column; max-height: 86vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: bt-in .18s ease-out; overflow: hidden; }
          @keyframes bt-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .bt-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .bt-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .bt-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .bt-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .bt-close:hover { color: var(--primary); }
          .bt-body { flex: 1; padding: 14px 18px; overflow: auto; }

          .bt-modes { display: flex; gap: 18px; margin-bottom: 12px; }
          .bt-mode { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); cursor: pointer; padding: 5px 10px; border-radius: 3px; border: 1px solid transparent; }
          .bt-mode input { accent-color: var(--primary); }
          .bt-mode.on { color: var(--primary); border-color: var(--primary); background: rgba(0,240,255,.06); }

          .bt-chips { display: flex; gap: 6px 8px; flex-wrap: wrap; padding: 10px 12px; min-height: 60px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; align-items: center; }
          .bt-chip { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px 3px 10px; border-radius: 999px; background: rgba(0, 240, 255, 0.12); border: 1px solid var(--primary); color: var(--primary); font-family: var(--font-mono); font-size: 13.5px; }
          .bt-chip-x { background: transparent; border: none; color: currentColor; cursor: pointer; padding: 0 4px; font-size: 14px; line-height: 1; opacity: .8; }
          .bt-chip-x:hover { opacity: 1; color: var(--danger, #ff4d6d); }
          .bt-input { flex: 1; min-width: 120px; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-mono); font-size: 13px; padding: 4px; }

          .bt-sug-label { margin-top: 14px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); }
          .bt-sug { margin-top: 6px; display: flex; gap: 4px 6px; flex-wrap: wrap; }
          .bt-sug-chip { padding: 2px 8px; border: 1px dashed rgba(0, 240, 255, 0.3); background: transparent; color: var(--text-secondary); font-family: var(--font-mono); font-size: 12.5px; border-radius: 999px; cursor: pointer; }
          .bt-sug-chip:hover { color: var(--primary); border-color: var(--primary); border-style: solid; }

          .bt-results { margin-top: 12px; padding: 10px 12px; border-radius: 3px; font-family: var(--font-mono); font-size: 13.5px; border-left-width: 3px; border-style: solid; }
          .bt-results.ok    { background: rgba(0,255,136,.06); border-color: var(--success); color: var(--success); }
          .bt-results.fail  { background: rgba(255,77,109,.06); border-color: var(--danger, #ff4d6d); color: var(--danger, #ff4d6d); }
          .bt-results.mixed { background: rgba(255,107,0,.06); border-color: var(--warning); color: var(--warning); }
          .bt-err-line { color: var(--danger, #ff4d6d); margin-top: 4px; }

          .bt-footer { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); }
          .bt-hint { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); }
          .bt-btn { padding: 6px 16px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .bt-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border: none; }
          .bt-btn.primary:hover:not(:disabled) { box-shadow: 0 0 16px rgba(0, 240, 255, 0.4); }
          .bt-btn.primary:disabled { opacity: .4; cursor: not-allowed; }
          .bt-btn.ghost { color: var(--text-secondary); background: transparent; border: 1px solid rgba(0, 240, 255, 0.4); }
          .bt-btn.ghost:hover { color: var(--primary); border-color: var(--primary); }
        `}</style>
      </div>
    </div>
  );
}
