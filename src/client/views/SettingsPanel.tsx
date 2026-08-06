/**
 * JT-PROXENSE Settings Panel
 * Full configuration management with tabs
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { api } from '../api';
import type { Config, ClusterData } from '../types';
import { CyberSelect } from '../components/CyberSelect';
import { SetSecretModal } from '../components/SetSecretModal';
import { NotificationsModal } from '../components/NotificationsModal';
import { SSHSetupModal } from '../components/SSHSetupModal';
import { useDialogs } from '../composables/useDialogs';

interface SettingsPanelProps {
  onClose: () => void;
  clusters?: Record<string, ClusterData>;
}

type TabType = 'ui' | 'clusters' | 'alerts' | 'server';

export function SettingsPanel({ onClose, clusters }: SettingsPanelProps) {
  const { t, language, setLanguage } = useTranslation();
  const dialog = useDialogs();
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('ui');
  const [notifOpen, setNotifOpen] = useState(false);

  // UI Settings
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [theme, setTheme] = useState('cyberpunk');
  const [defaultView, setDefaultView] = useState('command-center');
  const [particleCount, setParticleCount] = useState(100);
  const [vmMatrixDefaultFilter, setVmMatrixDefaultFilter] = useState<'all' | 'running' | 'stopped'>('all');
  const [matrixCardWidth, setMatrixCardWidth] = useState(85);
  const [matrixSortBy, setMatrixSortBy] = useState<'vmid' | 'name' | 'load'>('vmid');
  const [matrixGroupBy, setMatrixGroupBy] = useState<'none' | 'node' | 'type' | 'tag'>('node');
  const [matrixGroupSortBy, setMatrixGroupSortBy] = useState<'cluster' | 'node'>('node');
  const [matrixGroupSortOrder, setMatrixGroupSortOrder] = useState<'asc' | 'desc'>('asc');

  // Cluster states
  const [clusterStates, setClusterStates] = useState<Record<string, { enabled: boolean; poll_interval: number; static_refresh_interval: number }>>({});

  // Alert settings
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [cpuWarning, setCpuWarning] = useState(80);
  const [cpuCritical, setCpuCritical] = useState(95);
  const [memoryWarning, setMemoryWarning] = useState(85);
  const [memoryCritical, setMemoryCritical] = useState(95);
  const [diskWarning, setDiskWarning] = useState(80);
  const [diskCritical, setDiskCritical] = useState(95);
  const [diskioWarning, setDiskioWarning] = useState(50);
  const [diskioCritical, setDiskioCritical] = useState(100);
  const [iowaitWarning, setIowaitWarning] = useState(5);
  const [iowaitCritical, setIowaitCritical] = useState(10);

  // Server settings
  const [serverHost, setServerHost] = useState('0.0.0.0');
  const [httpPort, setHttpPort] = useState(8098);
  const [influxEnabled, setInfluxEnabled] = useState(false);
  const [influxPort, setInfluxPort] = useState(8086);
  const [consoleMode, setConsoleMode] = useState<'disabled' | 'stored' | 'prompt'>('disabled');
  // Track which cluster's password modal is open (null = none).
  const [secretModal, setSecretModal] = useState<string | null>(null);
  // Local "set/unset" map mirrors the server's 'auth.password' === '***' marker
  // so we can flip the indicator immediately after a save without a full reload.
  const [pwSet, setPwSet] = useState<Record<string, boolean>>({});

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(), 400);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await api.getConfig();
      setConfig(data);

      // UI
      setAnimationsEnabled(data.ui?.animations_enabled ?? true);
      setTheme(data.ui?.theme ?? 'cyberpunk');
      setDefaultView(data.ui?.default_view ?? 'command-center');
      setParticleCount(data.ui?.particle_count ?? 100);
      setVmMatrixDefaultFilter(data.ui?.vm_matrix_default_filter ?? 'all');
      setMatrixCardWidth(data.ui?.matrix_card_width ?? 85);
      setMatrixSortBy(data.ui?.matrix_sort_by ?? 'vmid');
      setMatrixGroupBy(data.ui?.matrix_group_by ?? 'node');

      setMatrixGroupSortBy(data.ui?.matrix_group_sort_by ?? 'node');
      setMatrixGroupSortOrder(data.ui?.matrix_group_sort_order ?? 'asc');

      // Sync UI settings to localStorage for other components to use
      localStorage.setItem('vm_matrix_default_filter', data.ui?.vm_matrix_default_filter ?? 'all');
      localStorage.setItem('matrix_card_width', String(data.ui?.matrix_card_width ?? 85));
      localStorage.setItem('matrix_sort_by', data.ui?.matrix_sort_by ?? 'vmid');
      localStorage.setItem('matrix_group_by', data.ui?.matrix_group_by ?? 'node');
      localStorage.setItem('matrix_group_sort_by', data.ui?.matrix_group_sort_by ?? 'node');
      localStorage.setItem('matrix_group_sort_order', data.ui?.matrix_group_sort_order ?? 'asc');

      // Clusters
      const states: Record<string, { enabled: boolean; poll_interval: number; static_refresh_interval: number }> = {};
      data.clusters?.forEach(cluster => {
        states[cluster.id] = {
          enabled: cluster.enabled !== false,
          poll_interval: cluster.poll_interval || 5,
          static_refresh_interval: cluster.static_refresh_interval || 60,
        };
      });
      setClusterStates(states);

      // Alerts
      setAlertsEnabled(data.alerts?.enabled ?? true);
      setCpuWarning(data.alerts?.cpu_warning ?? 80);
      setCpuCritical(data.alerts?.cpu_critical ?? 95);
      setMemoryWarning(data.alerts?.memory_warning ?? 85);
      setMemoryCritical(data.alerts?.memory_critical ?? 95);
      setDiskWarning(data.alerts?.disk_warning ?? 80);
      setDiskCritical(data.alerts?.disk_critical ?? 95);
      setDiskioWarning(data.alerts?.diskio_warning ?? 50);
      setDiskioCritical(data.alerts?.diskio_critical ?? 100);
      setIowaitWarning(data.alerts?.iowait_warning ?? 5);
      setIowaitCritical(data.alerts?.iowait_critical ?? 10);

      // Sync iowait thresholds to localStorage for ClusterCore to use
      localStorage.setItem('iowait_warning', String(data.alerts?.iowait_warning ?? 5));
      localStorage.setItem('iowait_critical', String(data.alerts?.iowait_critical ?? 10));

      // Server
      setServerHost(data.server?.host ?? '0.0.0.0');
      setHttpPort(data.server?.http_port ?? 8098);
      setInfluxEnabled(data.server?.influx_enabled ?? false);
      setInfluxPort(data.server?.influx_port ?? 8086);
      setConsoleMode((data.console?.mode as 'disabled' | 'stored' | 'prompt') || 'disabled');
      // Build "is password set?" map from the masked auth.password we get back.
      const m: Record<string, boolean> = {};
      (data.clusters || []).forEach((cl) => {
        m[cl.id] = !!(cl.auth && cl.auth.password && cl.auth.password.length > 0);
      });
      setPwSet(m);

    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);

      // Save UI settings to localStorage for immediate use
      localStorage.setItem('matrix_card_width', String(matrixCardWidth));
      localStorage.setItem('matrix_sort_by', matrixSortBy);
      localStorage.setItem('matrix_group_by', matrixGroupBy);
      localStorage.setItem('vm_matrix_default_filter', vmMatrixDefaultFilter);
      localStorage.setItem('matrix_group_sort_by', matrixGroupSortBy);
      localStorage.setItem('matrix_group_sort_order', matrixGroupSortOrder);
      localStorage.setItem('iowait_warning', String(iowaitWarning));
      localStorage.setItem('iowait_critical', String(iowaitCritical));

      const updatedClusters = config?.clusters?.map(cluster => ({
        ...cluster,
        enabled: clusterStates[cluster.id]?.enabled !== false,
        poll_interval: clusterStates[cluster.id]?.poll_interval || cluster.poll_interval,
        static_refresh_interval: clusterStates[cluster.id]?.static_refresh_interval || cluster.static_refresh_interval,
      }));

      await api.updateConfig({
        server: {
          host: serverHost,
          http_port: httpPort,
          influx_enabled: influxEnabled,
          influx_port: influxPort,
        },
        console: { mode: consoleMode },
        ui: {
          default_view: defaultView,
          theme,
          language,
          animations_enabled: animationsEnabled,
          particle_count: particleCount,
          vm_matrix_default_filter: vmMatrixDefaultFilter,
          matrix_card_width: matrixCardWidth,
          matrix_sort_by: matrixSortBy,
          matrix_group_by: matrixGroupBy,
          matrix_group_sort_by: matrixGroupSortBy,
          matrix_group_sort_order: matrixGroupSortOrder,
        },
        alerts: {
          enabled: alertsEnabled,
          cpu_warning: cpuWarning,
          cpu_critical: cpuCritical,
          memory_warning: memoryWarning,
          memory_critical: memoryCritical,
          disk_warning: diskWarning,
          disk_critical: diskCritical,
          diskio_warning: diskioWarning,
          diskio_critical: diskioCritical,
          iowait_warning: iowaitWarning,
          iowait_critical: iowaitCritical,
        },
        clusters: updatedClusters,
      });
      onClose();
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  };

  const toggleCluster = (clusterId: string) => {
    setClusterStates(prev => ({
      ...prev,
      [clusterId]: {
        ...prev[clusterId],
        enabled: !prev[clusterId]?.enabled,
      },
    }));
  };

  const updateClusterInterval = (clusterId: string, field: 'poll_interval' | 'static_refresh_interval', value: number) => {
    setClusterStates(prev => ({
      ...prev,
      [clusterId]: {
        ...prev[clusterId],
        [field]: value,
      },
    }));
  };

  // ── Add / delete connections ────────────────────────────────────
  // Both apply IMMEDIATELY via POST /api/config (full clusters[] replace;
  // backend preserves masked '***' secrets for existing ids, persists to
  // config.yaml and hot-reloads polling — no daemon restart needed).
  const emptyConnForm = {
    id: '', name: '', host: '', port: 8006, verify_ssl: false,
    user: 'root@pam', token_name: '', token_value: '',
  };
  const [showAddConn, setShowAddConn] = useState(false);
  const [showSshHelp, setShowSshHelp] = useState(false);
  const [connForm, setConnForm] = useState(emptyConnForm);
  const [connBusy, setConnBusy] = useState(false);

  const addConnection = async () => {
    const id = connForm.id.trim();
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(id)) { await dialog.alert(t('settings.conn_id_invalid')); return; }
    if (config?.clusters?.some(c => c.id === id)) { await dialog.alert(t('settings.conn_id_taken')); return; }
    if (!connForm.host.trim() || !connForm.user.trim()) { await dialog.alert(t('settings.conn_required')); return; }
    setConnBusy(true);
    try {
      const entry = {
        id,
        name: connForm.name.trim() || id,
        enabled: true,
        poll_interval: 5,
        static_refresh_interval: 60,
        nodes: [{
          host: connForm.host.trim(),
          port: Number(connForm.port) || 8006,
          verify_ssl: connForm.verify_ssl,
          priority: 1,
        }],
        auth: {
          user: connForm.user.trim(),
          token_name: connForm.token_name.trim(),
          token_value: connForm.token_value,
          password: '',
        },
      };
      await api.updateConfig({ clusters: [...(config?.clusters || []), entry] });
      setShowAddConn(false);
      setConnForm(emptyConnForm);
      await loadConfig();
    } catch (e) {
      await dialog.alert(String(e));
    } finally {
      setConnBusy(false);
    }
  };

  const deleteConnection = async (id: string) => {
    const ok = await dialog.confirm(
      t('settings.conn_delete_confirm', { id }),
      { destructive: true },
    );
    if (!ok) return;
    try {
      await api.updateConfig({ clusters: (config?.clusters || []).filter(c => c.id !== id) });
      await loadConfig();
    } catch (e) {
      await dialog.alert(String(e));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isExiting) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExiting]);

  const tabs: { id: TabType; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'ui', labelKey: 'settings.tab_ui', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg> },
    { id: 'clusters', labelKey: 'settings.tab_clusters', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
    { id: 'alerts', labelKey: 'settings.tab_alerts', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
    { id: 'server', labelKey: 'settings.tab_server', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg> },
  ];

  return (
    <div className={`settings-overlay ${isExiting ? 'exiting' : ''}`} onClick={(e) => e.target === e.currentTarget && !isExiting && handleClose()}>
      <div className={`settings-panel panel ${isExiting ? 'exiting' : ''}`}>
        <div className="settings-scanline" />

        {/* Busy shield — while a save is in flight the whole panel is
            masked so nothing can be double-clicked mid-write. */}
        {saving && (
          <div className="settings-busy" aria-busy="true">
            <span className="settings-busy-spin" />
            <span className="settings-busy-text">
              {language === 'zh-TW' ? '儲存中…' : 'Saving…'}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="settings-header">
          <h2 className="settings-title font-display">{t('settings.title')}</h2>
          <button className="settings-close" onClick={handleClose}>×</button>
        </div>

        {/* Tabs */}
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{t(tab.labelKey)}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings-content">
          {loading ? (
            <div className="settings-loading">
              <span className="loading-spinner" />
              <span>{t('loading.data')}</span>
            </div>
          ) : error ? (
            <div className="settings-error">
              <span>{error}</span>
            </div>
          ) : (
            <>
              {/* UI Tab */}
              {activeTab === 'ui' && (
                <div className="tab-content">
                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.default_view')}</h3>
                    <div className="radio-group">
                      {[
                        { id: 'command-center', labelKey: 'nav.command_center' },
                        { id: 'cluster-core', labelKey: 'nav.cluster_core' },
                        { id: 'holo-matrix', labelKey: 'nav.holo_matrix' },
                        { id: 'radar-scan', labelKey: 'nav.radar_scan' },
                        { id: 'storage', labelKey: 'nav.storage' },
                        { id: 'ceph-constellation', labelKey: 'nav.ceph' },
                      ].map(v => (
                        <label key={v.id} className={`radio-option ${defaultView === v.id ? 'active' : ''}`}>
                          <input type="radio" name="defaultView" value={v.id} checked={defaultView === v.id} onChange={() => setDefaultView(v.id)} />
                          <span className="radio-label">{t(v.labelKey)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Animations hidden - not user configurable
                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.animations')}</h3>
                    <label className="toggle-option">
                      <input type="checkbox" checked={animationsEnabled} onChange={(e) => setAnimationsEnabled(e.target.checked)} />
                      <span className="toggle-switch" />
                      <span className="toggle-label">{animationsEnabled ? t('settings.enabled') : t('settings.disabled')}</span>
                    </label>
                  </div>
                  */}

                  {/* Particle count hidden - not user configurable
                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.particle_count')}</h3>
                    <div className="input-row">
                      <input type="number" className="input-field" value={particleCount} onChange={(e) => setParticleCount(Number(e.target.value))} min={0} max={500} />
                      <span className="input-hint">{t('settings.particle_hint')}</span>
                    </div>
                  </div>
                  */}

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.vm_matrix_filter')}</h3>
                    <div className="radio-group">
                      {(['all', 'running', 'stopped'] as const).map(f => (
                        <label key={f} className={`radio-option ${vmMatrixDefaultFilter === f ? 'active' : ''}`}>
                          <input type="radio" name="vmFilter" value={f} checked={vmMatrixDefaultFilter === f} onChange={() => setVmMatrixDefaultFilter(f)} />
                          <span className="radio-label">{t(`settings.filter_${f}`)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.matrix_card_width')}</h3>
                    <div className="input-row">
                      <input type="number" className="input-field" value={matrixCardWidth} onChange={(e) => setMatrixCardWidth(Number(e.target.value))} min={60} max={200} />
                      <span className="input-hint">60-200 px</span>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.matrix_sort_by')}</h3>
                    <div className="radio-group">
                      {(['vmid', 'name', 'load'] as const).map(s => (
                        <label key={s} className={`radio-option ${matrixSortBy === s ? 'active' : ''}`}>
                          <input type="radio" name="matrixSortBy" value={s} checked={matrixSortBy === s} onChange={() => setMatrixSortBy(s)} />
                          <span className="radio-label">{t(`settings.sort_${s}`)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.matrix_group_by')}</h3>
                    <div className="radio-group">
                      {(['none', 'node', 'type', 'tag'] as const).map(g => (
                        <label key={g} className={`radio-option ${matrixGroupBy === g ? 'active' : ''}`}>
                          <input type="radio" name="matrixGroupBy" value={g} checked={matrixGroupBy === g} onChange={() => setMatrixGroupBy(g)} />
                          <span className="radio-label">{t(`matrix.group_${g}`)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.matrix_group_sort')}</h3>
                    <div className="settings-row">
                      <div className="settings-item">
                        <label>{t('settings.sort_by')}</label>
                        <div className="radio-group inline">
                          <label className={`radio-option ${matrixGroupSortBy === 'node' ? 'active' : ''}`}>
                            <input type="radio" name="matrixGroupSortBy" value="node" checked={matrixGroupSortBy === 'node'} onChange={() => setMatrixGroupSortBy('node')} />
                            <span className="radio-label">{t('settings.sort_node')}</span>
                          </label>
                          <label className={`radio-option ${matrixGroupSortBy === 'cluster' ? 'active' : ''}`}>
                            <input type="radio" name="matrixGroupSortBy" value="cluster" checked={matrixGroupSortBy === 'cluster'} onChange={() => setMatrixGroupSortBy('cluster')} />
                            <span className="radio-label">{t('settings.sort_cluster')}</span>
                          </label>
                        </div>
                      </div>
                      <div className="settings-item">
                        <label>{t('settings.sort_order')}</label>
                        <div className="radio-group inline">
                          <label className={`radio-option ${matrixGroupSortOrder === 'asc' ? 'active' : ''}`}>
                            <input type="radio" name="matrixGroupSortOrder" value="asc" checked={matrixGroupSortOrder === 'asc'} onChange={() => setMatrixGroupSortOrder('asc')} />
                            <span className="radio-label">{t('settings.sort_asc')}</span>
                          </label>
                          <label className={`radio-option ${matrixGroupSortOrder === 'desc' ? 'active' : ''}`}>
                            <input type="radio" name="matrixGroupSortOrder" value="desc" checked={matrixGroupSortOrder === 'desc'} onChange={() => setMatrixGroupSortOrder('desc')} />
                            <span className="radio-label">{t('settings.sort_desc')}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Clusters Tab */}
              {activeTab === 'clusters' && config && (
                <div className="tab-content">
                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.cluster_management')}</h3>
                    <p className="section-hint">{t('settings.cluster_hint')}</p>

                    {!showAddConn && (
                      <button className="conn-add-btn" onClick={() => setShowAddConn(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        <span>{t('settings.conn_add')}</span>
                      </button>
                    )}

                    {showAddConn && (
                      <div className="conn-add-form">
                        <div className="conn-add-title">{t('settings.conn_add_title')}</div>
                        <p className="section-hint">{t('settings.conn_hint')}</p>
                        <div className="conn-add-grid">
                          <label>
                            <span>{t('settings.conn_id')} *</span>
                            <input className="input-field-sm" value={connForm.id}
                                   placeholder="cluster2"
                                   onChange={(e) => setConnForm({ ...connForm, id: e.target.value })} />
                          </label>
                          <label>
                            <span>{t('settings.conn_name')}</span>
                            <input className="input-field-sm" value={connForm.name}
                                   placeholder="Cluster 2"
                                   onChange={(e) => setConnForm({ ...connForm, name: e.target.value })} />
                          </label>
                          <label>
                            <span>{t('settings.conn_host')} *</span>
                            <input className="input-field-sm" value={connForm.host}
                                   placeholder="10.0.0.10"
                                   onChange={(e) => setConnForm({ ...connForm, host: e.target.value })} />
                          </label>
                          <label>
                            <span>{t('settings.conn_port')}</span>
                            <input className="input-field-sm" type="number" min={1} max={65535} value={connForm.port}
                                   onChange={(e) => setConnForm({ ...connForm, port: Number(e.target.value) })} />
                          </label>
                          <label>
                            <span>{t('settings.conn_user')} *</span>
                            <input className="input-field-sm" value={connForm.user}
                                   onChange={(e) => setConnForm({ ...connForm, user: e.target.value })} />
                          </label>
                          <label>
                            <span>{t('settings.conn_token_name')}</span>
                            <input className="input-field-sm" value={connForm.token_name}
                                   placeholder="jt-proxense"
                                   onChange={(e) => setConnForm({ ...connForm, token_name: e.target.value })} />
                          </label>
                          <label>
                            <span>{t('settings.conn_token_value')}</span>
                            <input className="input-field-sm" type="password" value={connForm.token_value}
                                   autoComplete="new-password"
                                   onChange={(e) => setConnForm({ ...connForm, token_value: e.target.value })} />
                          </label>
                          <label className="conn-ssl-check">
                            <input type="checkbox" checked={connForm.verify_ssl}
                                   onChange={(e) => setConnForm({ ...connForm, verify_ssl: e.target.checked })} />
                            <span>{t('settings.conn_verify_ssl')}</span>
                          </label>
                        </div>
                        <div className="conn-add-actions">
                          <button className="secret-btn ghost" disabled={connBusy}
                                  onClick={() => { setShowAddConn(false); setConnForm(emptyConnForm); }}>
                            {t('settings.conn_cancel')}
                          </button>
                          <button className="secret-btn primary" disabled={connBusy} onClick={addConnection}>
                            {t('settings.conn_create')}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="cluster-list-full">
                      {config.clusters.map((cluster) => {
                        const liveCluster = clusters?.[cluster.id];
                        const displayName = liveCluster?.name || cluster.name || cluster.id;
                        const state = clusterStates[cluster.id] || { enabled: true, poll_interval: 5, static_refresh_interval: 60 };
                        return (
                          <div key={cluster.id} className={`cluster-card ${!state.enabled ? 'disabled-cluster' : ''}`}>
                            <div className="cluster-card-header">
                              <label className="cluster-toggle" onClick={(e) => e.stopPropagation()}>
                                <input type="checkbox" checked={state.enabled} onChange={() => toggleCluster(cluster.id)} />
                                <span className="cluster-toggle-switch" />
                              </label>
                              <span className={`cluster-status ${state.enabled ? 'enabled' : 'disabled'}`} />
                              <span className="cluster-name">{displayName}</span>
                              <span className="cluster-id">({cluster.id})</span>
                              <button
                                type="button"
                                className="conn-del-btn"
                                title={t('settings.conn_delete')}
                                onClick={(e) => { e.stopPropagation(); deleteConnection(cluster.id); }}
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
                                  <path d="M10 11v6M14 11v6" />
                                  <path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2" />
                                </svg>
                                <span>{t('settings.conn_delete')}</span>
                              </button>
                            </div>
                            <div className="cluster-card-body">
                              <div className="cluster-setting">
                                <label>{t('settings.poll_interval')}</label>
                                <input
                                  type="number"
                                  className="input-field-sm"
                                  value={state.poll_interval}
                                  onChange={(e) => updateClusterInterval(cluster.id, 'poll_interval', Number(e.target.value))}
                                  min={1}
                                  max={60}
                                />
                              </div>
                              <div className="cluster-setting">
                                <label>{t('settings.static_refresh')}</label>
                                <input
                                  type="number"
                                  className="input-field-sm"
                                  value={state.static_refresh_interval}
                                  onChange={(e) => updateClusterInterval(cluster.id, 'static_refresh_interval', Number(e.target.value))}
                                  min={30}
                                  max={600}
                                />
                              </div>
                            </div>
                            <div className="cluster-card-info">
                              <span>{t('settings.nodes_count', { n: cluster.nodes?.length || 0 })}</span>
                              <span>{t('settings.auth')}: {cluster.auth?.user || 'N/A'}</span>
                            </div>
                            {/* PVE password (encrypted store) — needed by the
                                noVNC console proxy; never written to yaml. */}
                            <div className="cluster-secret-row">
                              <span className="secret-label">{t('settings.cluster_pve_password')}</span>
                              <span className={`secret-status ${pwSet[cluster.id] ? 'set' : 'unset'}`}>
                                {pwSet[cluster.id] ? t('settings.secret_set') : t('settings.secret_unset')}
                              </span>
                              <button
                                type="button"
                                className="secret-btn primary"
                                onClick={() => setSecretModal(cluster.id)}
                              >
                                {pwSet[cluster.id] ? t('settings.secret_replace') : t('settings.secret_set_btn')}
                              </button>
                              {pwSet[cluster.id] && (
                                <button
                                  type="button"
                                  className="secret-btn ghost"
                                  onClick={async () => {
                                    if (!(await dialog.confirm(
                                      t('settings.secret_confirm_clear', { id: cluster.id }),
                                      { destructive: true },
                                    ))) return;
                                    try {
                                      await api.deleteClusterSecret(cluster.id, 'pve_password');
                                      setPwSet((prev) => ({ ...prev, [cluster.id]: false }));
                                    } catch (e) {
                                      await dialog.alert(String(e));
                                    }
                                  }}
                                >{t('settings.secret_clear')}</button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Alerts Tab */}
              {activeTab === 'alerts' && (
                <div className="tab-content">
                  <div className="settings-section">
                    <h3 className="section-title">{t('notif.title')}</h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                      {t('settings.notif_lead')}
                    </p>
                    <button className="action-btn" onClick={() => setNotifOpen(true)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                      <span>{t('settings.notif_manage')}</span>
                    </button>
                  </div>

                  {/* Enable toggle hidden - feature not yet implemented
                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.alert_system')}</h3>
                    <label className="toggle-option">
                      <input type="checkbox" checked={alertsEnabled} onChange={(e) => setAlertsEnabled(e.target.checked)} />
                      <span className="toggle-switch" />
                      <span className="toggle-label">{alertsEnabled ? t('settings.enabled') : t('settings.disabled')}</span>
                    </label>
                  </div>
                  */}

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.cpu_threshold')}</h3>
                    <div className="threshold-row">
                      <div className="threshold-item warning">
                        <label>{t('settings.warning')} (%)</label>
                        <input type="number" className="input-field-sm" value={cpuWarning} onChange={(e) => setCpuWarning(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider warning" value={cpuWarning} onChange={(e) => setCpuWarning(Number(e.target.value))} min={0} max={100} />
                      </div>
                      <div className="threshold-item danger">
                        <label>{t('settings.critical')} (%)</label>
                        <input type="number" className="input-field-sm" value={cpuCritical} onChange={(e) => setCpuCritical(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider danger" value={cpuCritical} onChange={(e) => setCpuCritical(Number(e.target.value))} min={0} max={100} />
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.memory_threshold')}</h3>
                    <div className="threshold-row">
                      <div className="threshold-item warning">
                        <label>{t('settings.warning')} (%)</label>
                        <input type="number" className="input-field-sm" value={memoryWarning} onChange={(e) => setMemoryWarning(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider warning" value={memoryWarning} onChange={(e) => setMemoryWarning(Number(e.target.value))} min={0} max={100} />
                      </div>
                      <div className="threshold-item danger">
                        <label>{t('settings.critical')} (%)</label>
                        <input type="number" className="input-field-sm" value={memoryCritical} onChange={(e) => setMemoryCritical(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider danger" value={memoryCritical} onChange={(e) => setMemoryCritical(Number(e.target.value))} min={0} max={100} />
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.disk_threshold')}</h3>
                    <div className="threshold-row">
                      <div className="threshold-item warning">
                        <label>{t('settings.warning')} (%)</label>
                        <input type="number" className="input-field-sm" value={diskWarning} onChange={(e) => setDiskWarning(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider warning" value={diskWarning} onChange={(e) => setDiskWarning(Number(e.target.value))} min={0} max={100} />
                      </div>
                      <div className="threshold-item danger">
                        <label>{t('settings.critical')} (%)</label>
                        <input type="number" className="input-field-sm" value={diskCritical} onChange={(e) => setDiskCritical(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider danger" value={diskCritical} onChange={(e) => setDiskCritical(Number(e.target.value))} min={0} max={100} />
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.diskio_threshold')}</h3>
                    <div className="threshold-row">
                      <div className="threshold-item warning">
                        <label>{t('settings.warning')}</label>
                        <input type="number" className="input-field-sm" value={diskioWarning} onChange={(e) => setDiskioWarning(Number(e.target.value))} min={0} max={10000} />
                      </div>
                      <div className="threshold-item danger">
                        <label>{t('settings.critical')}</label>
                        <input type="number" className="input-field-sm" value={diskioCritical} onChange={(e) => setDiskioCritical(Number(e.target.value))} min={0} max={10000} />
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.iowait_threshold')}</h3>
                    <div className="threshold-row">
                      <div className="threshold-item warning">
                        <label>{t('settings.warning')} (%)</label>
                        <input type="number" className="input-field-sm" value={iowaitWarning} onChange={(e) => setIowaitWarning(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider warning" value={iowaitWarning} onChange={(e) => setIowaitWarning(Number(e.target.value))} min={0} max={100} />
                      </div>
                      <div className="threshold-item danger">
                        <label>{t('settings.critical')} (%)</label>
                        <input type="number" className="input-field-sm" value={iowaitCritical} onChange={(e) => setIowaitCritical(Number(e.target.value))} min={0} max={100} />
                        <input type="range" className="threshold-slider danger" value={iowaitCritical} onChange={(e) => setIowaitCritical(Number(e.target.value))} min={0} max={100} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Server Tab */}
              {activeTab === 'server' && (
                <div className="tab-content">
                  <div className="settings-section">
                    <h3 className="section-title">{t('sshsetup.title')}</h3>
                    <p className="section-hint">{t('sshsetup.intro')}</p>
                    <button className="conn-add-btn" onClick={() => setShowSshHelp(true)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <span>{t('sshsetup.button')}</span>
                    </button>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.http_server')}</h3>
                    <div className="input-group">
                      <div className="input-row">
                        <label>{t('settings.host')}</label>
                        <input type="text" className="input-field" value={serverHost} onChange={(e) => setServerHost(e.target.value)} />
                      </div>
                      <div className="input-row">
                        <label>{t('settings.port')}</label>
                        <input type="number" className="input-field" value={httpPort} onChange={(e) => setHttpPort(Number(e.target.value))} min={1} max={65535} />
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.influx_integration')}</h3>
                    <label className="toggle-option">
                      <input type="checkbox" checked={influxEnabled} onChange={(e) => setInfluxEnabled(e.target.checked)} />
                      <span className="toggle-switch" />
                      <span className="toggle-label">{influxEnabled ? t('settings.enabled') : t('settings.disabled')}</span>
                    </label>
                    {influxEnabled && (
                      <div className="input-row" style={{ marginTop: 'var(--spacing-sm)' }}>
                        <label>{t('settings.influx_port')}</label>
                        <input type="number" className="input-field" value={influxPort} onChange={(e) => setInfluxPort(Number(e.target.value))} min={1} max={65535} />
                      </div>
                    )}
                  </div>

                  <div className="settings-section">
                    <h3 className="section-title">{t('settings.console_section')}</h3>
                    <div className="input-row">
                      <label>{t('settings.console_mode')}</label>
                      <CyberSelect<'disabled' | 'stored' | 'prompt'>
                        className="full"
                        value={consoleMode}
                        onChange={setConsoleMode}
                        options={[
                          { value: 'disabled', label: t('settings.console_mode_disabled') },
                          { value: 'stored',   label: t('settings.console_mode_stored') },
                          { value: 'prompt',   label: t('settings.console_mode_prompt') },
                        ]}
                      />
                    </div>
                    <div className="server-note" style={{ marginTop: 'var(--spacing-sm)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4M12 8h.01"/>
                      </svg>
                      <span>{t('settings.console_mode_hint')}</span>
                    </div>
                  </div>

                  <div className="settings-section">
                    <div className="server-note">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4M12 8h.01"/>
                      </svg>
                      <span>{t('settings.server_restart_note')}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <div className="settings-footer-left">
            <div className="settings-version">
              <span className="version-label">{t('settings.version')}</span>
              <span className="version-number">v{__APP_VERSION__}</span>
            </div>
            <div className="settings-author">
              <span className="author-label">by</span>
              <span className="author-name">Jason Cheng</span>
              <span className="author-org">(Jason Tools)</span>
            </div>
          </div>
          <div className="settings-actions">
            <button className="btn" onClick={handleClose}>{t('action.cancel')}</button>
            <button className="btn btn-primary" onClick={saveSettings} disabled={saving || isExiting}>
              {saving ? t('action.saving') : t('action.save')}
            </button>
          </div>
        </div>

        <div className="corner-decoration top-left" />
        <div className="corner-decoration top-right" />
        <div className="corner-decoration bottom-left" />
        <div className="corner-decoration bottom-right" />
      </div>

      {/* Encrypted secret entry — used to set PVE passwords without writing
          them to config.yaml. Modal closes on save by setting secretModal=null. */}
      <SetSecretModal
        open={secretModal !== null}
        cluster_id={secretModal || ''}
        kind="pve_password"
        title={t('settings.secret_pw_title', { id: secretModal || '' })}
        body={t('settings.secret_pw_body')}
        label={t('settings.secret_pw_label')}
        onClose={() => setSecretModal(null)}
        onSaved={() => {
          if (secretModal) {
            setPwSet((prev) => ({ ...prev, [secretModal]: true }));
          }
          setSecretModal(null);
        }}
      />

      <NotificationsModal
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
      <SSHSetupModal
        open={showSshHelp}
        onClose={() => setShowSshHelp(false)}
        nodes={Object.keys(clusters || {}).length ? undefined : undefined}
      />

      <style>{`
        .settings-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          animation: overlay-enter 0.3s ease-out;
        }

        .settings-overlay.exiting {
          animation: overlay-exit 0.4s ease-in forwards;
        }

        @keyframes overlay-enter {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }

        @keyframes overlay-exit {
          to { opacity: 0; backdrop-filter: none; }
        }

        .settings-busy {
          position: absolute;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: rgba(2, 4, 10, 0.6);
          cursor: wait;
        }
        .settings-busy-spin {
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 2px solid rgba(0, 240, 255, 0.25);
          border-top-color: var(--primary);
          animation: settings-busy-rot 0.8s linear infinite;
        }
        @keyframes settings-busy-rot { to { transform: rotate(360deg); } }
        .settings-busy-text {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow: none;
        }

        .settings-panel {
          width: 600px;
          max-width: 95vw;
          max-height: 85vh;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          animation: panel-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 240, 255, 0.1);
        }

        .settings-panel.exiting {
          animation: panel-exit 0.4s ease-in forwards;
        }

        @keyframes panel-enter {
          0% { opacity: 0; transform: scale(0.9) translateY(30px); filter: brightness(2) blur(10px); }
          50% { filter: brightness(1.3) blur(2px); }
          100% { opacity: 1; transform: none; filter: none; }
        }

        @keyframes panel-exit {
          0% { opacity: 1; transform: scale(1); filter: brightness(1); }
          30% { filter: brightness(1.5); }
          100% { opacity: 0; transform: scale(0.85) translateY(-20px); filter: brightness(2) blur(10px); }
        }

        .settings-scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scanline-sweep 2s linear infinite;
          z-index: 10;
          pointer-events: none;
          opacity: 0.6;
        }

        @keyframes scanline-sweep {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(calc(85vh)); opacity: 0; }
        }

        .settings-panel.exiting .settings-scanline {
          animation: none;
          opacity: 0;
        }

        .settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border);
        }

        .settings-title {
          font-size: 18px;
          color: var(--primary);
          letter-spacing: 0.15em;
        }

        .settings-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .settings-close:hover { color: var(--text-primary); }

        /* Tabs */
        .settings-tabs {
          display: flex;
          gap: 2px;
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--primary-dim) transparent;
          min-height: 48px;
          align-items: center;
        }

        .settings-tabs::-webkit-scrollbar {
          height: 4px;
        }

        .settings-tabs::-webkit-scrollbar-track {
          background: transparent;
        }

        .settings-tabs::-webkit-scrollbar-thumb {
          background: var(--primary-dim);
          border-radius: 2px;
        }

        .settings-tab {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
          white-space: nowrap;
        }

        .settings-tab:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
        }

        .settings-tab.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.1);
          border-color: var(--primary-dim);
        }

        .settings-tab svg {
          flex-shrink: 0;
        }

        .settings-content {
          flex: 1;
          overflow: auto;
          padding: var(--spacing-lg);
        }

        .settings-content::-webkit-scrollbar {
          width: 10px;
        }

        .settings-content::-webkit-scrollbar-track {
          background: var(--bg-secondary);
          border-radius: 5px;
        }

        .settings-content::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.35);
          border-radius: 5px;
          border: 2px solid var(--bg-secondary);
        }

        .settings-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.55);
        }

        .settings-loading, .settings-error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          padding: var(--spacing-xl);
          color: var(--text-secondary);
        }

        .settings-error { color: var(--danger-text); }

        .tab-content {
          animation: tab-fade-in 0.2s ease-out;
        }

        @keyframes tab-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }

        .settings-section {
          margin-bottom: var(--spacing-lg);
        }

        .settings-section:last-child { margin-bottom: 0; }

        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
        }

        .section-hint {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: var(--spacing-sm);
        }

        .radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }

        .radio-group.inline {
          flex-wrap: nowrap;
        }

        .settings-row {
          display: flex;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .settings-row .settings-item {
          flex: 1;
          min-width: 150px;
        }

        .settings-row .settings-item label {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: var(--spacing-xs);
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .radio-option:hover { border-color: var(--primary-dim); }
        .radio-option.active { border-color: var(--primary); background: rgba(0, 240, 255, 0.1); }
        .radio-option input { display: none; }

        .radio-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        .toggle-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          cursor: pointer;
        }

        .toggle-option input { display: none; }

        .toggle-switch {
          position: relative;
          width: 52px;
          height: 26px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: all var(--transition-fast);
          overflow: hidden;
        }

        .toggle-switch::before {
          content: 'OFF';
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          transition: all var(--transition-fast);
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 18px;
          background: linear-gradient(180deg, var(--text-secondary) 0%, rgba(100, 100, 120, 0.8) 100%);
          border-radius: 2px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .toggle-option:hover .toggle-switch {
          border-color: var(--primary-dim);
        }

        .toggle-option input:checked + .toggle-switch {
          background: rgba(0, 240, 255, 0.15);
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1);
        }

        .toggle-option input:checked + .toggle-switch::before {
          content: 'ON';
          right: auto;
          left: 8px;
          color: var(--primary);
          text-shadow: 0 0 6px var(--primary);
        }

        .toggle-option input:checked + .toggle-switch::after {
          left: 27px;
          background: linear-gradient(180deg, var(--primary) 0%, rgba(0, 180, 200, 1) 100%);
          box-shadow: 0 0 10px var(--primary), 0 0 20px rgba(0, 240, 255, 0.5);
        }

        .toggle-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        /* Input fields */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .input-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .input-row label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          min-width: 100px;
        }

        .input-field {
          flex: 1;
          max-width: 200px;
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .input-field:focus { border-color: var(--primary); }

        .input-field-sm {
          width: 80px;
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
          text-align: center;
        }

        .input-field-sm:focus { border-color: var(--primary); }

        .input-hint {
          font-size: 13px;
          color: var(--text-muted);
          margin-left: var(--spacing-sm);
        }

        /* Cluster cards */
        .cluster-list-full {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .cluster-card {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-md);
          transition: all var(--transition-fast);
        }

        .cluster-card:hover { border-color: var(--primary-dim); }
        .cluster-card.disabled-cluster { opacity: 0.6; }

        .cluster-card-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }

        .cluster-toggle {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .cluster-toggle input { display: none; }

        .cluster-toggle-switch {
          position: relative;
          width: 36px;
          height: 20px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: all var(--transition-fast);
        }

        .cluster-toggle-switch::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: var(--text-muted);
          border-radius: 50%;
          transition: all var(--transition-fast);
        }

        .cluster-toggle input:checked + .cluster-toggle-switch {
          background: rgba(0, 240, 255, 0.2);
          border-color: var(--primary);
        }

        .cluster-toggle input:checked + .cluster-toggle-switch::after {
          left: 18px;
          background: var(--primary);
          box-shadow: 0 0 6px var(--primary);
        }

        .cluster-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .cluster-status.enabled {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .cluster-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
        }

        .cluster-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .cluster-card-body {
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-sm) 0;
        }

        .cluster-setting {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .cluster-setting label {
          font-size: 13px;
          /* was --text-muted (#707070) — too dim to read on the modal
             (operator feedback). Match the other settings labels. */
          color: var(--text-secondary);
        }

        .cluster-card-info {
          display: flex;
          gap: var(--spacing-md);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
        }

        /* Per-cluster encrypted-secret row (PVE password). Shows status +
           Set / Replace / Clear buttons. The status pill colour mirrors the
           "configured / not set" state. */
        .cluster-secret-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 13px;
          flex-wrap: wrap;
        }
        .cluster-secret-row .secret-label {
          color: var(--text-secondary);
          min-width: 110px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 12px;
        }
        .cluster-secret-row .secret-status {
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.04em;
          border: 1px solid currentColor;
        }
        .cluster-secret-row .secret-status.set {
          color: var(--success);
        }
        .cluster-secret-row .secret-status.unset {
          color: var(--text-muted);
        }
        .cluster-secret-row .secret-btn {
          margin-left: auto;
          padding: 5px 12px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .cluster-secret-row .secret-btn + .secret-btn {
          margin-left: 0;
        }
        .cluster-secret-row .secret-btn.primary {
          color: #001018;
          background: linear-gradient(135deg, var(--primary), #00b8d4);
        }
        .cluster-secret-row .secret-btn.ghost {
          background: transparent;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .cluster-secret-row .secret-btn.ghost:hover {
          color: var(--danger-text);
          border-color: var(--danger-text);
        }

        /* Add / delete connection */
        .conn-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: var(--spacing-md);
          padding: 7px 16px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 4px;
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .conn-add-btn:hover {
          background: rgba(0, 240, 255, 0.16);
        }
        .conn-add-form {
          background: rgba(0, 240, 255, 0.03);
          border: 1px dashed rgba(0, 240, 255, 0.3);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        .conn-add-title {
          font-family: var(--font-display);
          font-size: 15px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow: none;
          margin-bottom: 6px;
        }
        /* This form read cramped — bump label/input/hint sizes (operator
           feedback: "東西都太小了"). Scoped to .conn-add-form so the small
           .input-field-sm used elsewhere is untouched. */
        .conn-add-form .section-hint { font-size: 13px; line-height: 1.5; }
        .conn-add-form .input-field-sm {
          font-size: 14px;
          padding: 9px 12px;
        }
        .conn-add-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px 18px;
          margin: 14px 0 18px;
        }
        .conn-add-grid label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .conn-add-grid label.conn-ssl-check {
          flex-direction: row;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          text-transform: none;
          letter-spacing: 0;
          font-size: 12px;
          align-self: end;
          padding-bottom: 6px;
          cursor: pointer;
        }
        .conn-ssl-check input { accent-color: var(--primary); }
        .conn-add-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .conn-add-actions .secret-btn {
          padding: 5px 14px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .conn-add-actions .secret-btn:disabled { opacity: .5; cursor: not-allowed; }
        .conn-add-actions .secret-btn.primary {
          color: #001018;
          background: linear-gradient(135deg, var(--primary), #00b8d4);
        }
        .conn-add-actions .secret-btn.ghost {
          background: transparent;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .conn-del-btn {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          background: transparent;
          border: 1px solid rgba(255, 77, 109, 0.35);
          border-radius: 3px;
          color: var(--danger, #ff4d6d);
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .conn-del-btn:hover {
          background: rgba(255, 77, 109, 0.12);
          border-color: var(--danger, #ff4d6d);
        }

        /* Threshold settings */
        .threshold-row {
          display: flex;
          gap: var(--spacing-lg);
        }

        .threshold-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--text-muted);
        }

        .threshold-item.warning { border-left-color: var(--warning); }
        .threshold-item.danger { border-left-color: var(--danger-text); }

        .threshold-item label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Horizontal slider paired with the number box (operator request).
           Colour-matched to the warning / critical accent. */
        .threshold-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          margin-top: 2px;
          border-radius: 999px;
          background: var(--bg-primary);
          outline: none;
          cursor: pointer;
        }
        .threshold-slider.warning { accent-color: var(--warning); }
        .threshold-slider.danger { accent-color: var(--danger-text); }
        .threshold-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          border: 2px solid var(--bg-base, #000);
          cursor: pointer;
        }
        .threshold-slider.warning::-webkit-slider-thumb { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
        .threshold-slider.danger::-webkit-slider-thumb { background: var(--danger-text); box-shadow: 0 0 8px var(--danger-text); }
        .threshold-slider.warning::-moz-range-thumb { background: var(--warning); border: 2px solid var(--bg-base, #000); }
        .threshold-slider.danger::-moz-range-thumb { background: var(--danger-text); border: 2px solid var(--bg-base, #000); }

        /* Server note */
        .server-note {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid var(--warning-dim);
          border-radius: var(--radius-sm);
          color: var(--warning);
          font-size: 13px;
        }

        .server-note svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .settings-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          border-top: 1px solid var(--border);
        }

        .settings-footer-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .settings-version {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .version-label {
          color: var(--text-muted);
        }

        .settings-author {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .author-label {
          color: var(--text-muted);
        }

        .author-name {
          color: var(--primary);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.4);
        }

        .author-org {
          color: var(--text-secondary);
        }

        .version-number {
          color: var(--primary-dim);
        }

        .settings-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
      `}</style>
    </div>
  );
}
