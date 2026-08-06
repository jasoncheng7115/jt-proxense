/**
 * VMContextMenu — right-click action menu for VM/CT cards.
 *
 * Shared between HoloMatrix (matrix view) and RadarScan (anomaly list).
 * Pulled out so RadarScan can reuse the exact same visual + behaviour
 * without duplicating the JSX or 150 lines of cyber-styled CSS.
 *
 * Action handlers (onPowerAction, onOpenSnapshots, …) are passed in by
 * the host view because they tend to be tightly coupled to that view's
 * own modals (snapshots dialog, backup picker, remote-migrate wizard).
 * Hosts that don't implement an action can pass a no-op or a
 * navigate-to-matrix shim.
 *
 * Render path: createPortal → document.body. Without this, the menu's
 * position:fixed coordinates resolve relative to whichever ancestor has
 * a CSS transform (the .view-container does, via its scale-in
 * animation), and the menu lands far from the cursor.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import type { VMMetrics, NodeHealth } from '../types';


export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  vm: VMMetrics | null;
  clusterId: string;
}

export interface PowerActionRequest {
  vm: VMMetrics;
  clusterId: string;
  action: 'start' | 'stop' | 'shutdown' | 'reboot' | 'suspend' | 'resume';
}

interface Props {
  state: ContextMenuState;
  onClose: () => void;
  onShowDetails: () => void;
  onPowerAction: (req: PowerActionRequest) => void;
  onOpenConsole: () => void;
  onOpenSnapshots: () => void;
  onBackupNow: () => void;
  onRemoteMigrate: () => void;
  onShowPerf?: () => void;
  onShowBackupHistory?: () => void;
  onShowConfig?: () => void;
  onShowFirewall?: () => void;
  onEditTags?: () => void;
  onClone?: () => void;
  onMigrate?: () => void;
  onDelete?: () => void;
  onConvertTemplate?: () => void;
  onOpenSerialConsole?: () => void;
  /** Export to foreign hypervisor formats (QEMU only — the converter
   *  scripts read the qemu config). Absent = host view hides the rows. */
  onExportFormat?: (format: 'ova' | 'hyperv') => void;
  getNodeHealth: (clusterId: string, node: string) => NodeHealth | null;
  userRole: 'viewer' | 'operator' | 'admin' | null;
  consoleMode: 'disabled' | 'stored' | 'prompt';
  consolePasswordSet: boolean;
  /** Console capabilities for THIS guest, derived from its PVE config.
   *  null while the config fetch is in-flight; the menu falls back to
   *  the type-default (VM=noVNC, CT=xterm) and shows alt items once
   *  the caps arrive. */
  consoleCaps?: { novnc: boolean; xterm: boolean; spice: boolean } | null;
  // Extension hooks for hosts that don't own the matching modals
  // (RadarScan): when an action is unsupported, hide its row entirely
  // instead of routing to a feature that lives elsewhere.
  hideSnapshots?: boolean;
  hideBackup?: boolean;
  hideRemoteMigrate?: boolean;
  hideConsole?: boolean;
}

export function VMContextMenu({
  state,
  onClose,
  onShowDetails,
  onPowerAction,
  onOpenConsole,
  onOpenSnapshots,
  onBackupNow,
  onRemoteMigrate,
  onShowPerf,
  onShowBackupHistory,
  onShowConfig,
  onShowFirewall,
  onEditTags,
  onClone,
  onMigrate,
  onDelete,
  onConvertTemplate,
  onOpenSerialConsole,
  onExportFormat,
  getNodeHealth,
  userRole,
  consoleMode,
  consolePasswordSet,
  consoleCaps,
  hideSnapshots,
  hideBackup,
  hideRemoteMigrate,
  hideConsole,
}: Props) {
  const { t } = useTranslation();
  const dialog = useDialogs();
  // consolePasswordSet is reserved for future stored-mode gating (kept
  // in the props so callers can stay forward-compatible with HoloMatrix)
  void consolePasswordSet;

  // Auto-flip near viewport edges. Render at click point first; after the
  // menu's actual size is known, nudge left/top so it stays on-screen.
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number; maxHeight: number }>({
    left: state.x, top: state.y, maxHeight: 0,
  });
  useLayoutEffect(() => {
    if (!state.visible) return;
    const el = menuRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = state.x;
    let top = state.y;
    let maxHeight = 0;   // 0 = unconstrained (menu fits as-is)

    // Horizontal — flip left if overflowing right edge.
    if (left + r.width > vw - margin) {
      left = Math.max(margin, state.x - r.width);
    }

    // Vertical:
    //   1. If menu fits below click point — use click position as-is.
    //   2. Else if it would fit ABOVE the click point — flip upward.
    //   3. Else (taller than viewport regardless) — pin to vertical centre
    //      with max-height + scroll. Bigger menus (e.g. with all alt-
    //      console options enabled) used to be clipped at the viewport
    //      bottom with no way to reach the lower items.
    const spaceBelow = vh - state.y - margin;
    const spaceAbove = state.y - margin;
    if (r.height <= spaceBelow) {
      // fits below
      top = state.y;
    } else if (r.height <= spaceAbove) {
      // flip upward — menu sits above the click
      top = Math.max(margin, state.y - r.height);
    } else if (r.height <= vh - 2 * margin) {
      // fits in viewport overall but not in either direction from click —
      // pin to top with full visible height
      top = margin;
    } else {
      // genuinely taller than the viewport — clamp + scroll
      top = margin;
      maxHeight = vh - 2 * margin;
    }

    if (left !== pos.left || top !== pos.top || maxHeight !== pos.maxHeight) {
      setPos({ left, top, maxHeight });
    }
  }, [state.visible, state.x, state.y]);

  useEffect(() => {
    const handleClickOutside = () => onClose();
    // Capture-phase scroll listener fires for ALL scroll events including
    // the menu's own internal scroll (when content overflows). Ignore the
    // ones whose target lives inside the menu so the user can actually
    // scroll the menu without it closing.
    const handleScroll = (e: Event) => {
      if (menuRef.current && e.target instanceof Node
          && menuRef.current.contains(e.target)) {
        return;
      }
      onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (state.visible) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.visible, onClose]);

  if (!state.visible || !state.vm) return null;

  const vm = state.vm;
  const nodeHealth = getNodeHealth(state.clusterId, vm.node);
  const pveUrl = nodeHealth
    ? `https://${nodeHealth.host}:${nodeHealth.port}/#v1:0:=${vm.type}/${vm.vmid}`
    : null;

  const handleOpenPVE = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pveUrl) {
      window.open(pveUrl, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  const handleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowDetails();
    onClose();
  };

  const menu = (
    <div
      ref={menuRef}
      className="vm-context-menu"
      style={{
        left: pos.left,
        top: pos.top,
        ...(pos.maxHeight > 0
          ? { maxHeight: pos.maxHeight, overflowY: 'auto' as const }
          : {}),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="context-menu-header">
        <span className="context-menu-name">{vm.name}</span>
        <span className="context-menu-id">#{vm.vmid}</span>
      </div>
      <div className="context-menu-divider" />
      <button className="context-menu-item" onClick={handleShowDetails}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <span>{t('vm.details')}</span>
      </button>
      {pveUrl && (
        <button className="context-menu-item" onClick={handleOpenPVE}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>{t('vm.open_pve')}</span>
        </button>
      )}

      {!hideConsole && (userRole === 'operator' || userRole === 'admin') && (() => {
        // VM default = noVNC. CT default = xterm. The default item is
        // always rendered. Alt items (xterm-serial for VM, noVNC for
        // CT, SPICE for VM) only appear when consoleCaps confirms the
        // guest config supports them.
        const isCT = vm.type === 'lxc';
        const reasonKey: string | null =
          consoleMode === 'disabled' ? 'console.disabled'
          : vm.status !== 'running' ? 'console.vm_not_running'
          : null;
        const isDisabled = !!reasonKey;
        // Default console icon (monitor + arrow).
        const defaultIcon = (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <polyline points="8 21 16 21 12 17 8 21" />
            <polyline points="6 8 9 11 6 14" />
            <line x1="11" y1="14" x2="14" y2="14" />
          </svg>
        );
        // Alt-console icon (terminal prompt).
        const altIcon = (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        );
        const handleClick = (cb: () => void) => (e: React.MouseEvent) => {
          e.stopPropagation();
          if (isDisabled) {
            onClose();
            void dialog.alert(t(reasonKey!));
            return;
          }
          cb();
          onClose();
        };
        // Show the alt entry once consoleCaps has loaded AND the cap is on.
        // CT noVNC isn't routed through our proxy yet (PVE has the endpoint
        // but our console_page assumes QEMU); the menu doesn't surface it.
        const showVmXterm = !isCT && consoleCaps?.xterm && onOpenSerialConsole;
        const showVmSpice = !isCT && consoleCaps?.spice;   // hook later
        const showCtNovnc = false;
        void showCtNovnc;
        return (
          <>
            <button
              className={`context-menu-item ${isDisabled ? 'is-disabled' : ''}`}
              title={isDisabled ? t(reasonKey!) : undefined}
              onClick={handleClick(onOpenConsole)}
            >
              {defaultIcon}
              <span>{isCT ? t('vm.console_xterm') : t('vm.console_novnc')}</span>
            </button>
            {showVmXterm && (
              <button
                className={`context-menu-item ${isDisabled ? 'is-disabled' : ''}`}
                title={isDisabled ? t(reasonKey!) : undefined}
                onClick={handleClick(onOpenSerialConsole!)}
              >
                {altIcon}
                <span>{t('vm.console_xterm_serial')}</span>
              </button>
            )}
            {showVmSpice && (
              <button
                className="context-menu-item is-disabled"
                title={t('vm.console_spice_unsupported')}
                onClick={(e) => { e.stopPropagation(); onClose();
                                   void dialog.alert(t('vm.console_spice_unsupported')); }}
              >
                {altIcon}
                <span>{t('vm.console_spice')}</span>
              </button>
            )}
          </>
        );
      })()}

      {!hideSnapshots && (userRole === 'operator' || userRole === 'admin') && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onOpenSnapshots(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
          <span>{t('vm.snapshots')}</span>
        </button>
      )}

      <button
        className="context-menu-item"
        onClick={(e) => {
          e.stopPropagation();
          // Deep-link to /tasks pre-filtered by this VM. App.tsx's
          // popstate handler picks up the path change and the view
          // reads ?vmid= from the URL on mount.
          const url = `/tasks?vmid=${encodeURIComponent(String(vm.vmid))}`
            + `&cluster=${encodeURIComponent(state.clusterId)}`;
          window.history.pushState(null, '', url);
          window.dispatchEvent(new PopStateEvent('popstate'));
          onClose();
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 7h8M9 12h8M9 17h5" />
        </svg>
        <span>{t('vm.task_history')}</span>
      </button>

      {onShowPerf && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onShowPerf(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 17 9 11 13 15 21 7" />
            <polyline points="14 7 21 7 21 14" />
          </svg>
          <span>{t('vm.perf_charts')}</span>
        </button>
      )}

      {onShowBackupHistory && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onShowBackupHistory(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="6" rx="8" ry="3" />
            <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
            <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
          </svg>
          <span>{t('vm.backup_history')}</span>
        </button>
      )}

      {onShowConfig && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onShowConfig(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <span>{t('vm.config_view')}</span>
        </button>
      )}

      {onShowFirewall && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onShowFirewall(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
          </svg>
          <span>{t('vm.firewall')}</span>
        </button>
      )}

      {onEditTags && (userRole === 'operator' || userRole === 'admin') && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onEditTags(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          <span>{t('vm.edit_tags')}</span>
        </button>
      )}

      {!hideBackup && (userRole === 'operator' || userRole === 'admin') && (
        <button
          className="context-menu-item"
          onClick={(e) => { e.stopPropagation(); onBackupNow(); onClose(); }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="6" rx="8" ry="3" />
            <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
            <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
          </svg>
          <span>{t('vm.backup_now')}</span>
        </button>
      )}

      {(userRole === 'operator' || userRole === 'admin') && (
        <>
          <div className="context-menu-divider" />
          {vm.status !== 'running' && (
            <button className="context-menu-item" onClick={(e) => { e.stopPropagation(); onPowerAction({ vm, clusterId: state.clusterId, action: 'start' }); onClose(); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20" /></svg>
              <span>{t('vm.start')}</span>
            </button>
          )}
          {vm.status === 'running' && (
            <>
              <button className="context-menu-item" onClick={(e) => { e.stopPropagation(); onPowerAction({ vm, clusterId: state.clusterId, action: 'shutdown' }); onClose(); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64A9 9 0 0 1 6.64 18.36"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                <span>{t('vm.shutdown_acpi')}</span>
              </button>
              <button className="context-menu-item" onClick={(e) => { e.stopPropagation(); onPowerAction({ vm, clusterId: state.clusterId, action: 'reboot' }); onClose(); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                <span>{t('vm.reboot')}</span>
              </button>
              <button className="context-menu-item danger" onClick={(e) => { e.stopPropagation(); onPowerAction({ vm, clusterId: state.clusterId, action: 'stop' }); onClose(); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>
                <span>{t('vm.stop_hard')}</span>
              </button>
            </>
          )}
        </>
      )}

      {(onClone || onMigrate || onDelete) && (userRole === 'operator' || userRole === 'admin') && (
        <>
          <div className="context-menu-divider" />
          {onMigrate && (
            <button
              className="context-menu-item"
              onClick={(e) => { e.stopPropagation(); onMigrate(); onClose(); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span>{t('vm.migrate')}</span>
            </button>
          )}
          {onClone && (
            <button
              className="context-menu-item"
              onClick={(e) => { e.stopPropagation(); onClone(); onClose(); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>{t('vm.clone')}</span>
            </button>
          )}
          {/* Export to foreign hypervisor formats — QEMU only; drives
              jt_pve2ova / jt_pve2hyperv on the node via the export job
              queue. The submenu is flattened into labelled rows (our
              menu has no nesting). Positive `=== 'qemu'` check (not
              `!== 'lxc'`) so a CT whose type arrives as undefined/'ct'
              in some paths is never offered export (PVE export is QEMU-only). */}
          {onExportFormat && vm.type === 'qemu' && (
            <>
              <div className="context-menu-subhead">{t('vm.export_other')}</div>
              <button
                className="context-menu-item"
                onClick={(e) => { e.stopPropagation(); onExportFormat('ova'); onClose(); }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{t('vm.export_ova')}</span>
              </button>
              <button
                className="context-menu-item"
                onClick={(e) => { e.stopPropagation(); onExportFormat('hyperv'); onClose(); }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="8" rx="1" />
                  <rect x="3" y="13" width="8" height="8" rx="1" />
                  <rect x="13" y="13" width="8" height="8" rx="1" />
                </svg>
                <span>{t('vm.export_hyperv')}</span>
              </button>
              <button className="context-menu-item is-disabled" onClick={(e) => e.stopPropagation()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                </svg>
                <span>{t('vm.export_more')}</span>
              </button>
            </>
          )}
          {/* Serial xterm console for VM moved to the top console block
              (v0.5.3+) where it appears only when consoleCaps.xterm is true
              — i.e. the VM has serialN configured. */}
          {onConvertTemplate && userRole === 'admin' && vm.type !== 'lxc' && (
            <button
              className="context-menu-item"
              onClick={(e) => { e.stopPropagation(); onConvertTemplate(); onClose(); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span>{t('vm.to_template')}</span>
            </button>
          )}
          {onDelete && userRole === 'admin' && (
            <button
              className="context-menu-item danger"
              onClick={(e) => { e.stopPropagation(); onDelete(); onClose(); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span>{t('vm.delete')}</span>
            </button>
          )}
        </>
      )}

      {!hideRemoteMigrate && userRole === 'admin' && vm.type !== 'lxc' && (
        <>
          <div className="context-menu-divider" />
          <button
            className="context-menu-item"
            onClick={(e) => { e.stopPropagation(); onRemoteMigrate(); onClose(); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h12" /><polyline points="13 6 19 12 13 18" />
              <circle cx="20" cy="6" r="2" /><circle cx="20" cy="18" r="2" />
            </svg>
            <span>{t('vm.migrate_remote')}</span>
          </button>
        </>
      )}

      {/* Component-scoped styles, injected with the component so any host
          (HoloMatrix, RadarScan, future views) gets them automatically.
          Two simultaneous instances would inject duplicate <style> tags;
          that's harmless. */}
      <style>{`
        .vm-context-menu {
          position: fixed;
          z-index: 1000;
          min-width: 220px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: var(--radius-md);
          box-shadow:
            0 0 0 1px rgba(0, 240, 255, .12),
            0 16px 60px rgba(0, 0, 0, .65),
            0 0 80px -20px rgba(0, 240, 255, .55),
            0 0 24px -6px rgba(0, 240, 255, .35);
          padding: var(--spacing-sm);
          animation: context-menu-appear 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(8px);
        }
        /* Cyberpunk-themed scrollbar — only visible when the menu has
           been clamped to fit a short viewport (maxHeight applied
           inline). Otherwise the inner content sits at natural height
           and no scrollbar shows. */
        .vm-context-menu::-webkit-scrollbar { width: 8px; }
        .vm-context-menu::-webkit-scrollbar-track {
          background: rgba(0, 240, 255, .04);
          border-radius: 4px;
        }
        .vm-context-menu::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,
            rgba(0, 240, 255, .35),
            rgba(0, 240, 255, .15));
          border-radius: 4px;
        }
        .vm-context-menu::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg,
            rgba(0, 240, 255, .55),
            rgba(0, 240, 255, .25));
        }
        @keyframes context-menu-appear {
          0%   { opacity: 0; transform: scale(0.9) translateY(-5px); }
          100% { opacity: 1; transform: none; }
        }
        .context-menu-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
        }
        .context-menu-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }
        .context-menu-id {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
        }
        .context-menu-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-xs) 0;
        }
        .context-menu-subhead {
          padding: 6px var(--spacing-sm) 2px;
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .context-menu-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          width: 100%;
          padding: var(--spacing-sm);
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 13px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: background .14s ease, color .14s ease, padding-left .14s ease, box-shadow .14s ease;
        }
        .context-menu-item:hover {
          background: linear-gradient(90deg,
            rgba(0, 240, 255, .22) 0%,
            rgba(0, 240, 255, .08) 60%,
            transparent 100%);
          color: var(--primary);
          padding-left: calc(var(--spacing-sm) + 4px);
          box-shadow:
            inset 4px 0 0 var(--primary),
            0 0 18px -6px rgba(0, 240, 255, .55);
          text-shadow: 0 0 6px rgba(0, 240, 255, .55);
        }
        .context-menu-item.danger:hover {
          background: linear-gradient(90deg,
            rgba(255, 56, 96, .22) 0%,
            rgba(255, 56, 96, .08) 60%,
            transparent 100%);
          color: var(--danger-text);
          box-shadow:
            inset 4px 0 0 var(--danger),
            0 0 18px -6px rgba(255, 56, 96, .55);
          text-shadow: 0 0 6px rgba(255, 56, 96, .55);
        }
        .context-menu-item svg {
          flex-shrink: 0;
          color: var(--text-secondary);
          transition: color var(--transition-fast), filter var(--transition-fast);
        }
        .context-menu-item:hover svg {
          color: var(--primary);
          filter: drop-shadow(0 0 4px rgba(0, 240, 255, .6));
        }
        .context-menu-item.danger:hover svg {
          color: var(--danger-text);
          filter: drop-shadow(0 0 4px rgba(255, 56, 96, .6));
        }
        .context-menu-item.is-disabled,
        .context-menu-item.is-disabled:hover {
          color: var(--text-muted);
          background: transparent;
          padding-left: var(--spacing-sm);
          box-shadow: none;
          text-shadow: none;
          cursor: help;
        }
        .context-menu-item.is-disabled svg,
        .context-menu-item.is-disabled:hover svg {
          color: var(--text-muted);
          filter: none;
          opacity: .55;
        }
      `}</style>
    </div>
  );

  return createPortal(menu, document.body);
}
