/**
 * CommandPalette — Ctrl/⌘+K quick search across every entity in every
 * cluster (VMs, CTs, nodes, storages). Operators with 100s of VMs need
 * to jump to a target without remembering its node / cluster, so the
 * palette is the only "global search" surface in the SPA.
 *
 * - Fuzzy-ish: case-insensitive substring + token-prefix scoring
 * - Top 30 results, keyboard-navigable (↑/↓/Enter, Esc to close)
 * - Each match has a kind icon and a quick-action route
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import type { ClusterData } from '../types';

interface Hit {
  kind: 'vm' | 'ct' | 'node' | 'storage' | 'action';
  cluster: string;
  clusterName: string;
  name: string;
  meta: string;       // "node • status" / "cluster • node" etc.
  score: number;
  go: () => void;
}

interface Props {
  clusters: Record<string, ClusterData>;
  onNavigate: (view: string, opts?: { cluster?: string }) => void;
}

export function CommandPalette({ clusters, onNavigate }: Props) {
  const { t, language } = useTranslation();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global ⌘/Ctrl + K opens; Esc closes; '/' also opens (vim-ish).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === 'Escape' && open) { setOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else { setQ(''); setActiveIdx(0); }
  }, [open]);

  // Score helper. Token-prefix match scores highest, substring next.
  const score = (hay: string, needle: string): number => {
    if (!needle) return 0;
    const h = hay.toLowerCase();
    const n = needle.toLowerCase();
    if (h === n) return 100;
    if (h.startsWith(n)) return 80;
    const tokIdx = h.indexOf(' ' + n);
    if (tokIdx >= 0) return 70;
    const idx = h.indexOf(n);
    if (idx >= 0) return 50 - Math.min(20, idx);
    return 0;
  };

  const hits: Hit[] = useMemo(() => {
    const fl = q.trim();
    if (!fl) return [];
    const out: Hit[] = [];

    // Quick navigation actions — type "go health" / "tasks" / "backup" /
    // "users" etc. to jump straight to a page without remembering the
    // shortcut letter. Match against both the action title and a couple
    // of common synonyms (the Chinese ones too).
    const actions: Array<{ name: string; aliases: string[]; view: string }> = [
      { name: t('nav.command_center'), aliases: ['dashboard', 'home', 'overview', '概觀', '首頁'], view: 'command-center' },
      { name: t('nav.cluster_core'),   aliases: ['nodes', 'node', 'host', '節點', '主機'], view: 'cluster-core' },
      { name: t('nav.holo_matrix'),    aliases: ['matrix', 'vms', 'list', '矩陣'], view: 'holo-matrix' },
      { name: t('nav.radar_scan'),     aliases: ['radar', 'anomaly', '雷達'], view: 'radar-scan' },
      { name: t('nav.storage'),        aliases: ['storage', 'tank', '儲存'], view: 'storage' },
      { name: t('nav.ceph'),           aliases: ['ceph'], view: 'ceph-constellation' },
      { name: t('nav.tasks'),          aliases: ['tasks', 'jobs', '作業', '任務'], view: 'tasks' },
      { name: t('nav.health'),         aliases: ['health', 'alerts', '健康', '警示'], view: 'health' },
      { name: t('nav.backups'),        aliases: ['backups', 'vzdump', '備份'], view: 'backups' },
      { name: t('nav.upgrade'),        aliases: ['upgrade', 'apt', '升級'], view: 'host-upgrade' },
      { name: t('nav.users'),          aliases: ['users', 'accounts', 'user admin', '使用者', '帳號'], view: 'users' },
    ];
    for (const a of actions) {
      const s = Math.max(
        score(a.name, fl),
        ...a.aliases.map((al) => score(al, fl)),
      );
      if (s > 0) {
        out.push({
          kind: 'action',
          cluster: '', clusterName: '',
          name: a.name,
          meta: `→ /${a.view.replace('command-center', '')}`,
          score: s + 30,   // boost above entity matches
          go: () => onNavigate(a.view),
        });
      }
    }
    for (const [cid, cluster] of Object.entries(clusters)) {
      const cname = cluster.name || cid;

      for (const v of Object.values((cluster as any).vms || {}) as any[]) {
        const isCT = v.type === 'lxc';
        const hay = `${v.vmid} ${v.name || ''} ${v.node || ''} ${cname}`;
        const s = Math.max(
          score(String(v.vmid), fl),
          score(v.name || '', fl),
          score(hay, fl),
        );
        if (s > 0) {
          out.push({
            kind: isCT ? 'ct' : 'vm',
            cluster: cid,
            clusterName: cname,
            name: `${isCT ? 'CT' : 'VM'} ${v.vmid} — ${v.name || '(unnamed)'}`,
            meta: `${cname} · ${v.node || '?'} · ${v.status || 'unknown'}`,
            score: s + (v.status === 'running' ? 2 : 0),
            go: () => {
              onNavigate('holo-matrix', { cluster: cid });
            },
          });
        }
      }

      for (const n of Object.values((cluster as any).nodes || {}) as any[]) {
        const s = Math.max(
          score(n.node || '', fl),
          score(`${n.node} ${cname}`, fl),
        );
        if (s > 0) {
          out.push({
            kind: 'node',
            cluster: cid,
            clusterName: cname,
            name: n.node,
            meta: `${cname} · ${n.status || '?'} · ${n.vm_count || 0}+${n.ct_count || 0}`,
            score: s,
            go: () => onNavigate('cluster-core', { cluster: cid }),
          });
        }
      }

      // Shared storages appear once per node in the cache; without this the
      // palette listed the same storage five times on a 5-node cluster.
      const seenStor = new Set<string>();
      for (const st of Object.values((cluster as any).storages || {}) as any[]) {
        if (seenStor.has(st.storage)) continue;
        seenStor.add(st.storage);
        const s = Math.max(
          score(st.storage || '', fl),
          score(`${st.storage} ${st.node || ''} ${cname}`, fl),
        );
        if (s > 0) {
          out.push({
            kind: 'storage',
            cluster: cid,
            clusterName: cname,
            name: st.storage,
            meta: `${cname} · ${st.node || '?'} · ${st.type || ''}`,
            score: s,
            go: () => onNavigate('storage', { cluster: cid }),
          });
        }
      }
    }
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, 30);
  }, [q, clusters, onNavigate]);

  // Reset selection when results change.
  useEffect(() => { setActiveIdx(0); }, [q]);

  // Keep the active hit in view.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector(`[data-idx="${activeIdx}"]`) as HTMLElement | null;
    item?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  if (!open) return null;

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(hits.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const h = hits[activeIdx];
      if (h) { h.go(); setOpen(false); }
    }
  };

  const kindIcon = (k: string) => {
    if (k === 'vm' || k === 'ct') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
    if (k === 'node') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
      </svg>
    );
    if (k === 'action') return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    );
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  };

  return (
    <div className="cp-back" onClick={() => setOpen(false)}>
      <div className="cp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cp-input-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            placeholder={t('cmdk.placeholder')}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
          />
          <span className="cp-hint">↑↓ ⏎</span>
          <button className="cp-x" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="cp-list" ref={listRef}>
          {hits.length === 0 && q && (
            <div className="cp-empty">{t('cmdk.empty')}</div>
          )}
          {hits.length === 0 && !q && (
            <div className="cp-empty">{t('cmdk.tip')}</div>
          )}
          {hits.map((h, i) => (
            <div
              key={`${h.kind}:${h.cluster}:${h.name}:${i}`}
              data-idx={i}
              className={`cp-item ${i === activeIdx ? 'cp-active' : ''}`}
              onClick={() => { h.go(); setOpen(false); }}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <span className={`cp-kind cp-kind-${h.kind}`}>{kindIcon(h.kind)}</span>
              <span className="cp-name">{h.name}</span>
              <span className="cp-meta">{h.meta}</span>
            </div>
          ))}
        </div>
        <div className="cp-foot">
          <span className="cp-foot-key">⌘K</span>
          <span>{t('cmdk.toggle')}</span>
        </div>
        <style>{`
          .cp-back { position: fixed; inset: 0; background: rgba(2,4,10,.55); display: flex; justify-content: center; align-items: flex-start; padding-top: 12vh; z-index: 12000; animation: cp-fade .12s ease-out; }
          @keyframes cp-fade { from { opacity: 0; } to { opacity: 1; } }
          .cp-modal { width: min(720px, 92vw); display: flex; flex-direction: column; max-height: 70vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 12px 48px rgba(0,240,255,0.3); animation: cp-in .15s ease-out; overflow: hidden; }
          @keyframes cp-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
          .cp-input-row { display: flex; align-items: center; gap: 12px; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.16); color: var(--primary); }
          .cp-input-row svg { stroke: var(--primary); }
          .cp-input-row input { flex: 1; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-mono); font-size: 16px; }
          .cp-input-row input::placeholder { color: var(--text-muted); }
          .cp-hint { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
          .cp-x { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; line-height: 1; cursor: pointer; padding: 0 6px; }
          .cp-x:hover { color: var(--primary); }

          .cp-list { flex: 1; overflow: auto; padding: 6px 0; }
          .cp-item { display: grid; grid-template-columns: 24px 1fr auto; gap: 10px; align-items: center; padding: 7px 18px; cursor: pointer; transition: background .08s; }
          .cp-item:hover, .cp-item.cp-active { background: rgba(0, 240, 255, 0.10); }
          .cp-active { box-shadow: inset 3px 0 0 var(--primary); }
          .cp-kind { display: inline-flex; align-items: center; justify-content: center; }
          .cp-kind-vm { color: var(--primary); }
          .cp-kind-ct { color: var(--accent); }
          .cp-kind-node { color: var(--success); }
          .cp-kind-storage { color: var(--warning); }
          .cp-kind-action { color: var(--accent); }
          .cp-name { font-family: var(--font-mono); font-size: 13px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .cp-meta { font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px; }
          .cp-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-style: italic; font-family: var(--font-mono); font-size: 13px; }

          .cp-foot { padding: 7px 14px; background: rgba(0,240,255,.04); border-top: 1px solid rgba(0,240,255,.1); font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); display: flex; gap: 8px; align-items: center; }
          .cp-foot-key { display: inline-block; padding: 1px 6px; border: 1px solid rgba(0,240,255,.4); border-radius: 3px; color: var(--primary); }
        `}</style>
      </div>
    </div>
  );
}
