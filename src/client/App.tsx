/**
 * JT-PROXENSE Main Application
 * Sci-Fi Proxmox VE Monitoring System
 */

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { I18nProvider, useTranslation } from './i18n';
import { DialogProvider } from './composables/useDialogs';
import { useWebSocket } from './useWebSocket';
import type { ClusterData, ViewType, GlobalSummary } from './types';
import { formatRelativeTime } from './utils/format';
import { api } from './api';

// Views
import { CommandCenter } from './views/CommandCenter';
import { ClusterCore } from './views/ClusterCore';
import { HoloMatrix } from './views/HoloMatrix';
import { RadarScan } from './views/RadarScan';
import { CephConstellation } from './views/CephConstellation';
import { Storage } from './views/Storage';
import { ZFSManager } from './views/ZFSManager';
import { UserAdmin } from './views/UserAdmin';
import { PveTasks } from './views/PveTasks';
import { HealthMonitor } from './views/HealthMonitor';
import { BackupJobs } from './views/BackupJobs';
import { HostUpgrade } from './views/HostUpgrade';
import { CommandPalette } from './components/CommandPalette';
import { SettingsPanel } from './views/SettingsPanel';

// Components
import { ParticleBackground } from './components/effects/ParticleBackground';
import { SevenSegmentClock } from './components/SevenSegmentClock';
import { ClusterSelector } from './components/ClusterSelector';
import { UserBadge } from './components/UserBadge';
import { useAuth } from './composables/useAuth';

// Icons (inline SVG for consistency with jt-gelflow)
const Icons = {
  // A pool branching into its member disks. The old glyph was a stacked
  // cylinder — visually indistinguishable from Storage's cylinder two rows
  // above it in the same sidebar. Topology is also what this view is actually
  // about (pool -> vdev -> disk), so the tree says more than a drum did.
  ZFS: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8.5" y="2.5" width="7" height="5" rx="1.2" />
      <path d="M12 7.5v3.5M4.5 16v-1.8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2V16" />
      <rect x="2" y="16" width="5" height="5.5" rx="1.2" />
      <rect x="9.5" y="16" width="5" height="5.5" rx="1.2" />
      <rect x="17" y="16" width="5" height="5.5" rx="1.2" />
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Command: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  Server: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  Matrix: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
  Radar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4" />
    </svg>
  ),
  Storage: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Ceph: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Central core */}
      <circle cx="12" cy="12" r="3" />
      {/* Outer orbital ring */}
      <circle cx="12" cy="12" r="9" strokeDasharray="3 2" />
      {/* Satellite nodes (OSD-like) */}
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <circle cx="19.5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="19.5" cy="16" r="1.5" fill="currentColor" />
      <circle cx="12" cy="21" r="1.5" fill="currentColor" />
      <circle cx="4.5" cy="16" r="1.5" fill="currentColor" />
      <circle cx="4.5" cy="8" r="1.5" fill="currentColor" />
      {/* Connection lines */}
      <path d="M12 6v3M12 15v3" strokeWidth="1" />
      <path d="M14.5 10.5L17 8.5" strokeWidth="1" />
      <path d="M14.5 13.5L17 15.5" strokeWidth="1" />
      <path d="M9.5 10.5L7 8.5" strokeWidth="1" />
      <path d="M9.5 13.5L7 15.5" strokeWidth="1" />
    </svg>
  ),
  Tasks: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 7h8M9 12h8M9 17h5" />
      <circle cx="6" cy="7" r="1" fill="currentColor" />
      <circle cx="6" cy="12" r="1" fill="currentColor" />
      <circle cx="6" cy="17" r="1" fill="currentColor" />
    </svg>
  ),
  Health: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Backup: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  Upgrade: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <polyline points="7 8 12 3 17 8" />
      <path d="M5 21h14" />
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Pause: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  ),
  Play: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  ),
  Language: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  MoreHorizontal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
};

// Navigation items with keyboard shortcuts
const NAV_ITEMS: { view: ViewType; icon: React.FC; labelKey: string; shortcut: string }[] = [
  { view: 'command-center', icon: Icons.Command, labelKey: 'nav.command_center', shortcut: 'D' },
  { view: 'cluster-core', icon: Icons.Server, labelKey: 'nav.cluster_core', shortcut: 'N' },
  { view: 'holo-matrix', icon: Icons.Matrix, labelKey: 'nav.holo_matrix', shortcut: 'M' },
  { view: 'radar-scan', icon: Icons.Radar, labelKey: 'nav.radar_scan', shortcut: 'R' },
  { view: 'storage', icon: Icons.Storage, labelKey: 'nav.storage', shortcut: 'S' },
  { view: 'ceph-constellation', icon: Icons.Ceph, labelKey: 'nav.ceph', shortcut: 'C' },
  { view: 'tasks', icon: Icons.Tasks, labelKey: 'nav.tasks', shortcut: 'T' },
  { view: 'health', icon: Icons.Health, labelKey: 'nav.health', shortcut: 'H' },
  { view: 'backups', icon: Icons.Backup, labelKey: 'nav.backups', shortcut: 'B' },
  { view: 'host-upgrade', icon: Icons.Upgrade, labelKey: 'nav.upgrade', shortcut: 'U' },
  // Admin-only — filtered out for non-admin users at render time.
  { view: 'users', icon: Icons.Users, labelKey: 'nav.users', shortcut: 'A' },
  { view: 'zfs-manager', icon: Icons.ZFS, labelKey: 'nav.zfs', shortcut: 'Z' },
];

// Keyboard shortcut map
const SHORTCUT_MAP: Record<string, ViewType> = {
  'd': 'command-center',
  'n': 'cluster-core',
  'm': 'holo-matrix',
  'r': 'radar-scan',
  's': 'storage',
  'c': 'ceph-constellation',
  't': 'tasks',
  'h': 'health',
  'b': 'backups',
  'a': 'users',
  'z': 'zfs-manager',
};

// URL ↔ view mapping. Lets users bookmark / link directly to any view
// (e.g. http://host/matrix). Server-side SPA fallback already serves
// index.html for unknown paths so deep-link refreshes work.
const VIEW_TO_PATH: Record<ViewType, string> = {
  'command-center':     '/',
  'cluster-core':       '/nodes',
  'holo-matrix':        '/matrix',
  'radar-scan':         '/radar',
  'ceph-constellation': '/ceph',
  'storage':            '/storage',
  'tasks':              '/tasks',
  'health':             '/health',
  'backups':            '/backups',
  'host-upgrade':       '/upgrade',
  'settings':           '/settings',
  'users':              '/users',
  'zfs-manager':        '/zfs',
};
const PATH_TO_VIEW: Record<string, ViewType> = {
  '/':         'command-center',
  '/overview': 'command-center',
  '/nodes':    'cluster-core',
  '/matrix':   'holo-matrix',
  '/radar':    'radar-scan',
  '/ceph':     'ceph-constellation',
  '/storage':  'storage',
  '/tasks':    'tasks',
  '/health':   'health',
  '/backups':  'backups',
  '/upgrade':  'host-upgrade',
  '/settings': 'settings',
  '/users':    'users',
  '/zfs':      'zfs-manager',
};

function viewFromPath(): ViewType {
  const p = (typeof window !== 'undefined' ? window.location.pathname : '/') || '/';
  // Strip trailing slash except root
  const norm = p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p;
  if (PATH_TO_VIEW[norm]) return PATH_TO_VIEW[norm];
  // Fall back to first segment so /matrix/thumb still resolves as
  // 'holo-matrix' (the sub-segment is consumed by the view itself).
  const first = '/' + (norm.split('/').filter(Boolean)[0] || '');
  return PATH_TO_VIEW[first] || 'command-center';
}

function AppContent() {
  const { t, language, setLanguage } = useTranslation();

  // State
  const [currentView, setCurrentView] = useState<ViewType>(() => viewFromPath());

  // Sync current view ↔ browser URL. setCurrentView pushes a new history
  // entry; back/forward buttons restore the prior view via popstate.
  // Only rewrite the URL when its TOP segment doesn't match — otherwise
  // we'd clobber sub-paths like /matrix/thumb that the view itself manages.
  useEffect(() => {
    const target = VIEW_TO_PATH[currentView];
    if (!target) return;
    const cur = window.location.pathname || '/';
    const curTop = '/' + (cur.split('/').filter(Boolean)[0] || '');
    const targetTop = '/' + (target.split('/').filter(Boolean)[0] || '');
    // Compare top segments. Treat "/" specially since split() gives "".
    const sameTop = (cur === '/' && target === '/') ||
                    (cur !== '/' && target !== '/' && curTop === targetTop);
    if (!sameTop) {
      window.history.pushState(null, '', target);
    }
  }, [currentView]);
  useEffect(() => {
    const onPop = () => setCurrentView(viewFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const [clusters, setClusters] = useState<Record<string, ClusterData>>({});
  const [selectedCluster, setSelectedCluster] = useState<string>(() => {
    // Restore from localStorage
    try {
      return localStorage.getItem('jt-proxense-selected-cluster') || '__all__';
    } catch {
      return '__all__';
    }
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  // Sidebar collapse state. Persisted across reloads.
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('jtp.sidebar.collapsed') === '1'; }
    catch { return false; }
  });
  // Direction of the current collapse/expand, held only for the length of the
  // animation. One-shot: the class is removed afterwards so nothing keeps
  // animating in the background (the count-up tweens taught us what an
  // always-on rAF costs here).
  const [sbAnim, setSbAnim] = useState<'in' | 'out' | null>(null);
  const sbAnimTimer = useRef<number | undefined>(undefined);
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try { localStorage.setItem('jtp.sidebar.collapsed', next ? '1' : '0'); } catch {}
      setSbAnim(next ? 'out' : 'in');
      window.clearTimeout(sbAnimTimer.current);
      sbAnimTimer.current = window.setTimeout(() => setSbAnim(null), 900);
      return next;
    });
  }, []);
  useEffect(() => () => window.clearTimeout(sbAnimTimer.current), []);
  const auth = useAuth();
  const [lastUpdate, setLastUpdate] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseAnimation, setPauseAnimation] = useState<'pausing' | 'resuming' | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // WebSocket connection
  const { connected, connecting, send: wsSend } = useWebSocket({
    onMessage: useCallback((data: Record<string, ClusterData>) => {
      if (!isPaused) {
        setClusters(data);
        setLastUpdate(Date.now() / 1000);
      }
    }, [isPaused]),
  });

  // Page-visibility-driven CPU/GPU save mode.
  //
  // - Stamps `data-app-visible="false"` on <body> when the tab is hidden;
  //   our global stylesheet uses that to pause every CSS animation
  //   (`animation-play-state: paused`), which is what kills the bulk of
  //   Chrome's compositor + raster work.
  // - Tells the WS server to stop streaming us cluster updates while we
  //   can't render them anyway. On `visible` we ask for a fresh snapshot
  //   immediately so the UI is current the moment the operator looks at it.
  useEffect(() => {
    // Treat "tab hidden" OR "window not focused" as not-visible. On macOS
    // Chrome, switching to another app keeps document.visibilityState as
    // 'visible' if the browser window isn't fully obscured — so without
    // the blur fallback our particle canvas + every infinite CSS animation
    // keeps burning GPU/CPU when the user clearly isn't looking. Pairing
    // visibilitychange with focus/blur catches both cases.
    let lastVisible = true;
    const computeVisible = () =>
      document.visibilityState !== 'hidden' && document.hasFocus();
    const apply = () => {
      const visible = computeVisible();
      if (visible === lastVisible) return;
      lastVisible = visible;
      document.body.setAttribute('data-app-visible', visible ? 'true' : 'false');
      try {
        if (visible) {
          wsSend({ type: 'resume' });
          wsSend({ type: 'refresh' });
        } else {
          wsSend({ type: 'pause' });
        }
      } catch { /* WS not yet open — fine, server will refresh on its end */ }
    };
    document.body.setAttribute(
      'data-app-visible', computeVisible() ? 'true' : 'false'
    );
    document.addEventListener('visibilitychange', apply);
    window.addEventListener('focus', apply);
    window.addEventListener('blur', apply);
    return () => {
      document.removeEventListener('visibilitychange', apply);
      window.removeEventListener('focus', apply);
      window.removeEventListener('blur', apply);
    };
  }, [wsSend]);

  // Health badge in document.title — operators see at a glance from
  // another tab whether something needs attention. Counts are computed
  // from the WS-broadcast clusters (free; no extra API calls).
  useEffect(() => {
    let critical = 0;
    let warning = 0;
    for (const cluster of Object.values(clusters)) {
      const c: any = cluster;
      // Nodes
      for (const n of Object.values(c.nodes || {}) as any[]) {
        if (n.status && n.status !== 'online') critical++;
        const cpuPct = n.cpu?.usage_percent || 0;
        const memPct = n.memory?.usage_percent || 0;
        if (cpuPct > 92) warning++;
        if (memPct > 92) warning++;
      }
      // Storages
      for (const s of Object.values(c.storages || {}) as any[]) {
        const used = s.usage_percent ?? s.used_pct ?? 0;
        if (used >= 95) critical++;
        else if (used >= 85) warning++;
      }
      // Ceph
      const ceph: any = c.ceph;
      if (ceph) {
        const status = (ceph.status || ceph.health?.status || '').toUpperCase();
        if (status.includes('ERR'))  critical++;
        else if (status.includes('WARN')) warning++;
      }
    }
    // Plain-text badge — emoji in the tab title looked off-brand
    // (operator feedback). [3!] = 3 critical; [3!/2] = 3 crit + 2 warn;
    // [~2] = warnings only.
    let prefix = '';
    if (critical > 0) prefix = `[${critical}!${warning > 0 ? `/${warning}` : ''}] `;
    else if (warning > 0) prefix = `[~${warning}] `;
    document.title = `${prefix}JT-PROXENSE`;
  }, [clusters]);

  // Handle pause/resume with animation
  const handlePauseToggle = useCallback(() => {
    setPauseAnimation(isPaused ? 'resuming' : 'pausing');
    setTimeout(() => {
      setIsPaused((prev) => !prev);
      setTimeout(() => setPauseAnimation(null), 500);
    }, 300);
  }, [isPaused]);

  // Get current cluster data (single or all)
  // Note: Not using useMemo to ensure views update when cluster data changes via polling
  const currentClusterData = selectedCluster === '__all__' ? null : (clusters[selectedCluster] || null);

  // Calculate global summary
  const globalSummary: GlobalSummary = useMemo(() => {
    const clusterList = Object.values(clusters);
    return {
      total_clusters: clusterList.length,
      total_nodes: clusterList.reduce((sum, c) => sum + (c.summary?.node_count || 0), 0),
      total_nodes_online: clusterList.reduce((sum, c) => sum + (c.summary?.nodes_online || 0), 0),
      total_vms: clusterList.reduce((sum, c) => sum + (c.summary?.vm_count || 0), 0),
      total_vms_running: clusterList.reduce((sum, c) => sum + (c.summary?.vms_running || 0), 0),
      total_cts: clusterList.reduce((sum, c) => sum + (c.summary?.ct_count || 0), 0),
      total_cts_running: clusterList.reduce((sum, c) => sum + (c.summary?.cts_running || 0), 0),
      clusters: clusterList.map(c => c.summary!).filter(Boolean),
    };
  }, [clusters]);

  // Save selected cluster to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jt-proxense-selected-cluster', selectedCluster);
    } catch {
      // Ignore localStorage errors
    }
  }, [selectedCluster]);

  // Validate selected cluster exists (when clusters load or change)
  useEffect(() => {
    if (Object.keys(clusters).length > 0 && selectedCluster !== '__all__') {
      if (!clusters[selectedCluster]) {
        // Selected cluster no longer exists, reset to '__all__'
        setSelectedCluster('__all__');
      }
    }
  }, [clusters, selectedCluster]);

  // Force layout recalculation on mount (fixes responsive CSS on initial load)
  useEffect(() => {
    // Trigger reflow to ensure media queries are applied
    window.dispatchEvent(new Event('resize'));
  }, []);

  // Load config and sync UI settings to localStorage on app start
  useEffect(() => {
    api.getConfig().then(config => {
      if (config?.ui) {
        // Sync UI settings to localStorage for components to use
        if (config.ui.vm_matrix_default_filter) {
          localStorage.setItem('vm_matrix_default_filter', config.ui.vm_matrix_default_filter);
        }
        if (config.ui.matrix_card_width) {
          localStorage.setItem('matrix_card_width', String(config.ui.matrix_card_width));
        }
        if (config.ui.matrix_sort_by) {
          localStorage.setItem('matrix_sort_by', config.ui.matrix_sort_by);
        }
      }
    }).catch(() => {
      // Ignore errors - settings will use defaults
    });
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    if (!showLangMenu) return;
    const handleClick = () => setShowLangMenu(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showLangMenu]);

  // Close more menu when clicking outside
  useEffect(() => {
    if (!showMoreMenu) return;
    const handleClick = () => setShowMoreMenu(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showMoreMenu]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // Spacebar to toggle pause
      if (key === ' ' || e.code === 'Space') {
        e.preventDefault();
        handlePauseToggle();
        return;
      }

      // Navigation shortcuts (D, N, M, R, S, C)
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        const targetView = SHORTCUT_MAP[key];
        if (targetView) {
          e.preventDefault();
          setCurrentView(targetView);
          return;
        }
      }

      // Ctrl+S for settings
      if ((e.ctrlKey || e.metaKey) && key === 's') {
        e.preventDefault();
        setShowSettings(prev => !prev);
      }

      // ? — keyboard shortcuts cheat-sheet (no modifiers)
      if (!e.ctrlKey && !e.metaKey && !e.altKey
          && (key === '?' || (e.shiftKey && key === '/'))) {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
      }

      // Esc — close shortcuts overlay if open
      if (key === 'escape' && showShortcuts) {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePauseToggle, showShortcuts]);

  // Render current view
  const renderView = () => {
    const isAllClusters = selectedCluster === '__all__';

    switch (currentView) {
      case 'command-center':
        return (
          <CommandCenter
            clusters={clusters}
            globalSummary={globalSummary}
            isPaused={isPaused}
            onSelectCluster={(id) => {
              setSelectedCluster(id);
              setCurrentView('cluster-core');
            }}
          />
        );
      case 'cluster-core':
        return (
          <ClusterCore
            cluster={currentClusterData}
            clusters={isAllClusters ? clusters : undefined}
            onSelectVM={() => setCurrentView('holo-matrix')}
            onNavigateToVMMatrix={(clusterId) => {
              setSelectedCluster(clusterId);
              setCurrentView('holo-matrix');
            }}
            isPaused={isPaused}
          />
        );
      case 'holo-matrix':
        return (
          <HoloMatrix
            cluster={currentClusterData}
            clusters={isAllClusters ? clusters : undefined}
          />
        );
      case 'radar-scan':
        return (
          <RadarScan
            cluster={currentClusterData}
            clusters={isAllClusters ? clusters : undefined}
            isPaused={isPaused}
          />
        );
      case 'storage':
        return (
          <Storage
            cluster={currentClusterData}
            clusters={isAllClusters ? clusters : undefined}
          />
        );
      case 'ceph-constellation':
        return (
          <CephConstellation
            cluster={currentClusterData}
            clusters={isAllClusters ? clusters : undefined}
            isPaused={isPaused}
          />
        );
      case 'users':
        return <UserAdmin />;
      case 'zfs-manager':
        return <ZFSManager cluster={currentClusterData} clusters={isAllClusters ? clusters : undefined} />;
      case 'tasks':
        return <PveTasks clusters={clusters} selectedCluster={selectedCluster} />;
      case 'health':
        return <HealthMonitor
          clusters={clusters}
          onNavigate={(v, opts) => {
            if (opts?.cluster) setSelectedCluster(opts.cluster);
            setCurrentView(v as ViewType);
          }}
        />;
      case 'backups':
        return <BackupJobs clusters={clusters} selectedCluster={selectedCluster} />;
      case 'host-upgrade':
        return <HostUpgrade
          cluster={selectedCluster && selectedCluster !== '__all__' ? clusters[selectedCluster] : null}
          clusters={clusters}
        />;
      default:
        return (
          <CommandCenter
            clusters={clusters}
            globalSummary={globalSummary}
            isPaused={isPaused}
            onSelectCluster={(id) => {
              setSelectedCluster(id);
              setCurrentView('cluster-core');
            }}
          />
        );
    }
  };

  return (
    <div className={`app-container ${isPaused ? 'animations-paused' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}${sbAnim ? ` sb-anim sb-anim-${sbAnim}` : ''}`}>
      {/* Background Effects */}
      <ParticleBackground isPaused={isPaused} />
      <CommandPalette
        clusters={clusters}
        onNavigate={(v, opts) => {
          if (opts?.cluster) setSelectedCluster(opts.cluster);
          setCurrentView(v as ViewType);
        }}
      />

      {/* Left Sidebar — primary navigation */}
      <aside className="app-sidebar">
        {/* Sweep + edge charge, painted only while sb-anim is on the container. */}
        <span className="sb-sweep" aria-hidden="true" />
        <span className="sb-edge" aria-hidden="true" />
        <div className="sb-brand">
          <div className="sb-brand-row">
            <img src="/assets/logo-mark.svg" alt="" className="sb-brand-mark" aria-hidden="true" />
            {/* Wordmark + version share a column so the version hugs the
                bottom-right of "PROXENSE" exactly (operator preference).
                Cluster name lives in the top-bar selector, not here. */}
            <span className="sb-brand-col">
              <span className="sb-brand-wordmark" aria-label="JT-PROXENSE">
                <span className="sb-brand-jt">JT</span>
                <span className="sb-brand-sep">-</span>
                <span className="sb-brand-rest">PROXENSE</span>
              </span>
              {/* Version intentionally hidden here (operator preference) —
                  it still appears in the sidebar footer. */}
            </span>
          </div>
        </div>
        <nav className="sb-nav" aria-label="primary">
          {NAV_ITEMS.filter(({ view }) =>
            view !== 'users' || !auth.authEnforced || auth.user?.role_global === 'admin'
          ).map(({ view, icon: Icon, labelKey, shortcut }) => (
            <button
              key={view}
              className={`sb-link ${currentView === view ? 'active' : ''}`}
              onClick={() => setCurrentView(view)}
              title={sidebarCollapsed ? `${t(labelKey)} [${shortcut}]` : `[${shortcut}]`}
            >
              <span className="sb-link-icon"><Icon /></span>
              <span className="sb-link-label">{t(labelKey)}</span>
              <span className="sb-link-shortcut">{shortcut}</span>
            </button>
          ))}
        </nav>
        <div className="sb-foot">
          <div className="sb-status">
            <span className={`sb-dot ${connected ? 'connected' : connecting ? 'connecting' : 'disconnected'}`} />
            {!sidebarCollapsed && (
              <div className="sb-status-text">
                <div className="sb-status-line">
                  {connected ? t('status.connected') : connecting ? t('status.connecting') : t('status.disconnected')}
                </div>
                <div className="sb-status-sub">
                  {Object.keys(clusters).length} {language === 'zh-TW' ? '個叢集' : 'clusters'}
                </div>
              </div>
            )}
          </div>
          <button className="sb-collapse"
                  onClick={toggleSidebar}
                  title={sidebarCollapsed
                    ? (language === 'zh-TW' ? '展開側欄' : 'Expand sidebar')
                    : (language === 'zh-TW' ? '收起側欄' : 'Collapse sidebar')}>
            {sidebarCollapsed
              ? <span>»</span>
              : <span>«&nbsp;{language === 'zh-TW' ? '收起' : 'COLLAPSE'}</span>}
          </button>
        </div>
      </aside>

      {/* Slim top bar — clock, cluster selector, lang/pause/user/settings */}
      <header className="header-bar">
        <div className="header-logo">
          <SevenSegmentClock timestamp={lastUpdate} connected={connected} />
        </div>

        <div className="header-center" />

        {/* Right Controls — cluster selector sits here (operator request:
            next to the pause button) instead of centered. */}
        <div className="header-right">
          {/* Always enabled — it used to be disabled on the dashboard
              ("overview always shows everything"), but a greyed-out
              selector reads as broken. Selection simply carries over to
              the next view you open. */}
          {Object.keys(clusters).length > 0 && (
            <ClusterSelector
              clusters={clusters}
              value={selectedCluster}
              onChange={setSelectedCluster}
            />
          )}
          {/* Pause/Resume Button */}
          <button
            className={`btn btn-icon pause-btn ${isPaused ? 'paused' : ''} ${pauseAnimation || ''}`}
            onClick={handlePauseToggle}
            title={`${isPaused ? t('status.paused') : t('status.live')} [Space]`}
          >
            <div className="pause-btn-inner">
              {isPaused ? <Icons.Play /> : <Icons.Pause />}
            </div>
            <div className="pause-fx" />
          </button>

          {/* Language Menu */}
          <div className="lang-menu-wrapper">
            <button
              className="btn btn-icon"
              onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); }}
              title={t('settings.language')}
            >
              <Icons.Language />
            </button>
            {showLangMenu && (
              <div className="lang-dropdown" onClick={(e) => e.stopPropagation()}>
                <button
                  className={`lang-option ${language === 'en' ? 'active' : ''}`}
                  onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                >
                  <span className="lang-flag">EN</span>
                  <span>English</span>
                </button>
                <button
                  className={`lang-option ${language === 'zh-TW' ? 'active' : ''}`}
                  onClick={() => { setLanguage('zh-TW'); setShowLangMenu(false); }}
                >
                  <span className="lang-flag">繁</span>
                  <span>繁體中文</span>
                </button>
              </div>
            )}
          </div>

          {/* User badge (v0.2+) — hidden when auth is off / anonymous */}
          <UserBadge user={auth.user} onLogout={auth.logout} />

          {/* Settings — admin only when auth is enforced */}
          {(!auth.authEnforced || auth.user?.role_global === 'admin') && (
            <button
              className="btn btn-icon"
              onClick={() => setShowSettings(true)}
              title={t('settings.title')}
            >
              <Icons.Settings />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div key={currentView} className="view-container">
          {renderView()}
        </div>
      </main>


      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} clusters={clusters} />
      )}

      {/* Keyboard shortcuts cheat-sheet (press "?" to toggle). */}
      {showShortcuts && (
        <ShortcutsOverlay onClose={() => setShowShortcuts(false)} navItems={NAV_ITEMS} />
      )}

      {/* Full-screen Pause/Resume Effect */}
      {pauseAnimation && (
        <div className={`pause-overlay ${pauseAnimation}`}>
          <div className="pause-glitch-lines">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="glitch-line" style={{ animationDelay: `${i * 0.05}s` }} />
            ))}
          </div>
          <div className="pause-status-text">
            {pauseAnimation === 'pausing' ? 'FREEZING DATA STREAM' : 'RESUMING DATA STREAM'}
          </div>
          <div className="pause-scan-ring" />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <DialogProvider>
        <AppContent />
      </DialogProvider>
    </I18nProvider>
  );
}

/**
 * ShortcutsOverlay — modal listing all keyboard shortcuts. Triggered by
 * pressing "?" anywhere in the app. Esc closes (handled in App.tsx's
 * keydown handler).
 */
function ShortcutsOverlay({
  onClose, navItems,
}: {
  onClose: () => void;
  navItems: ReadonlyArray<{ view: string; labelKey: string; shortcut: string }>;
}) {
  const { t, language } = useTranslation();
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);
  return (
    <div className="ks-back" onClick={onClose}>
      <div className="ks-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ks-head">
          <span>{language === 'zh-TW' ? '鍵盤捷徑' : 'Keyboard shortcuts'}</span>
          <button className="ks-close" onClick={onClose}>×</button>
        </div>
        <div className="ks-body">
          <div className="ks-section">
            <div className="ks-section-title">
              {language === 'zh-TW' ? '導覽（無修飾鍵）' : 'Navigation (no modifier)'}
            </div>
            <div className="ks-list">
              {navItems.map((it) => (
                <div key={it.view} className="ks-row">
                  <kbd>{it.shortcut}</kbd>
                  <span>{t(it.labelKey)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ks-section">
            <div className="ks-section-title">
              {language === 'zh-TW' ? '通用' : 'Global'}
            </div>
            <div className="ks-list">
              <div className="ks-row"><kbd>Space</kbd><span>{language === 'zh-TW' ? '暫停 / 恢復即時更新' : 'Pause / resume live updates'}</span></div>
              <div className="ks-row"><kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><span>+</span><kbd>S</kbd><span>{language === 'zh-TW' ? '開啟設定' : 'Open settings'}</span></div>
              <div className="ks-row"><kbd>?</kbd><span>{language === 'zh-TW' ? '此視窗' : 'This cheat-sheet'}</span></div>
              <div className="ks-row"><kbd>Esc</kbd><span>{language === 'zh-TW' ? '關閉對話框' : 'Close dialog / overlay'}</span></div>
            </div>
          </div>
          <div className="ks-section">
            <div className="ks-section-title">
              {language === 'zh-TW' ? '矩陣 / 表格' : 'Matrix / table'}
            </div>
            <div className="ks-list">
              <div className="ks-row"><span>{language === 'zh-TW' ? '右鍵 VM' : 'Right-click VM'}</span><span>{language === 'zh-TW' ? '電源 / 主控台 / 快照 / 複製 / 遷移 / 刪除' : 'Power / console / snapshot / clone / migrate / delete'}</span></div>
              <div className="ks-row"><span>{language === 'zh-TW' ? '右鍵節點' : 'Right-click node'}</span><span>{language === 'zh-TW' ? '硬體 / 網路 / 維護 / 服務 / syslog / shell' : 'Hardware / network / maintenance / services / syslog / shell'}</span></div>
              <div className="ks-row"><span>{language === 'zh-TW' ? '勾選 + 批次列' : 'Checkbox + bulk toolbar'}</span><span>{language === 'zh-TW' ? '電源 / 遷移 / 快照 / 標籤' : 'Power / migrate / snapshot / tag'}</span></div>
            </div>
          </div>
        </div>
        <style>{`
          .ks-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: ks-fade .12s ease-out; }
          @keyframes ks-fade { from { opacity: 0; } to { opacity: 1; } }
          .ks-modal { width: min(720px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0, 240, 255, 0.25); overflow: hidden; }
          .ks-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .ks-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .ks-body { padding: 14px 18px; overflow: auto; }
          .ks-section { margin-bottom: 18px; }
          .ks-section-title { font-family: var(--font-display); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.12); }
          .ks-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 4px 18px; font-family: 'Share Tech Mono', monospace; font-size: 12px; color: var(--text-primary); }
          .ks-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
          .ks-row kbd { display: inline-block; min-width: 24px; padding: 2px 8px; text-align: center; background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 3px; font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--primary); }
          .ks-row span { color: var(--text-secondary); }
          .ks-row span:first-of-type { color: var(--text-primary); }
        `}</style>
      </div>
    </div>
  );
}
