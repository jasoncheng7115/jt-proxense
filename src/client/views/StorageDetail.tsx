/**
 * StorageDetail — per-storage management page.
 *
 * Mirrors PVE's "節點 / 儲存 / 內容" tab but with a few additions over the
 * native UI:
 *   - Single page that chooses tabs based on `storage.content`
 *   - Block-level storage (rbd/lvm/zfspool/...) shows list-only (no
 *     upload/delete/download — those operations don't make sense at the
 *     volume level for managed-by-VM disks)
 *   - File-level storage (dir/nfs/cifs/cephfs/pbs): full CRUD per content
 *     type — upload + download + delete
 *
 * Phase 1 + 2 (this file): list + delete. Upload + download = phase 3 + 4.
 *
 * Routing: opens at /storage/{clusterId}/{node}/{storage}. Reads cluster
 * data from the shared `clusters` map passed by App.tsx so we don't need
 * to re-poll; the cluster cache already has storage.content + node list.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';
import { useAuth } from '../composables/useAuth';
import { formatBytes, getHealthColor, formatPercent } from '../utils/format';
import type { ClusterData } from '../types';

// PVE content-type ordering as it appears in the UI. Tabs are filtered to
// only those present in `storage.content`; this list just sets the order.
const CONTENT_TYPE_ORDER = [
  'backup', 'iso', 'vztmpl', 'snippets', 'import', 'images', 'rootdir',
] as const;
type ContentType = typeof CONTENT_TYPE_ORDER[number];

// Block-level plugintypes — these only carry images/rootdir and don't
// expose individual files for upload/download/delete on the storage
// itself (those volumes are owned by VMs/CTs).
const BLOCK_LEVEL_TYPES = new Set([
  'rbd', 'lvm', 'lvmthin', 'zfspool', 'zfs', 'iscsi', 'iscsidirect',
]);

// PVE returns each content row with at minimum these fields. Different
// content types add extras (backup→notes, vztmpl→verification etc.) but
// we don't render those in phase 1.
interface ContentItem {
  volid: string;       // e.g. "local:iso/debian-12.iso"
  format?: string;     // "iso" | "raw" | "qcow2" | "vma.zst" | "tar.zst" | ...
  size?: number;       // bytes
  ctime?: number;      // unix epoch (creation time)
  vmid?: number;       // for backup / images: associated VM
  notes?: string;      // backup notes
  verification?: { state?: string; upid?: string };
  used?: number;       // for thin / sparse
}

interface StorageDetailProps {
  clusterId: string;
  node: string;
  storageName: string;
  // Provided by App.tsx so we can render header info without an extra fetch.
  clusters: Record<string, ClusterData> | null;
}

export function StorageDetail({
  clusterId, node, storageName, clusters,
}: StorageDetailProps) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const auth = useAuth();

  // Pull storage metadata from the cluster cache. Storages are keyed by
  // `{node}/{storage_name}` (or just `{storage_name}` when node is blank
  // for shared storage) — we try the node-specific key first, then fall
  // back to scanning. If the cluster isn't loaded yet we render a
  // loading skeleton.
  const meta = useMemo(() => {
    const cd = clusters?.[clusterId];
    if (!cd) return null;
    const stMap = cd.storages || {};
    let st = stMap[`${node}/${storageName}`] || stMap[storageName];
    if (!st) {
      // Fallback: any entry with matching storage name (shared storages
      // can be reachable from any node so any instance is fine for meta).
      for (const v of Object.values(stMap)) {
        if (v && (v as any).storage === storageName) { st = v; break; }
      }
    }
    if (!st) return null;
    return {
      clusterName: cd.name || clusterId,
      type: st.type || '',
      content: (st.content || []) as string[],
      total: st.disk?.total_bytes || 0,
      used: st.disk?.used_bytes || 0,
      shared: !!st.shared,
    };
  }, [clusters, clusterId, storageName, node]);

  const isBlockLevel = meta ? BLOCK_LEVEL_TYPES.has(meta.type) : false;
  const canWrite = (auth.user?.role_global === 'operator')
                || (auth.user?.role_global === 'admin')
                || !auth.authEnforced;  // open mode = anyone

  // Available tabs. For block-level storages we still let "images" show
  // (PVE webui shows it too), but we hide the upload/delete actions.
  const availableTabs = useMemo<ContentType[]>(() => {
    if (!meta) return [];
    const present = new Set(meta.content);
    return CONTENT_TYPE_ORDER.filter((c) => present.has(c));
  }, [meta]);

  const [activeTab, setActiveTab] = useState<ContentType | null>(null);
  // Pick the first available tab as default once meta resolves. Sticky
  // selection across re-renders so user doesn't get bumped around.
  useEffect(() => {
    if (activeTab && availableTabs.includes(activeTab)) return;
    if (availableTabs.length > 0) setActiveTab(availableTabs[0]);
  }, [availableTabs, activeTab]);

  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);
  // Upload modal state.
  const [showUpload, setShowUpload] = useState(false);
  const [upFile, setUpFile] = useState<File | null>(null);
  const [upProgress, setUpProgress] = useState(0);
  const [upBusy, setUpBusy] = useState(false);
  const [upError, setUpError] = useState<string | null>(null);
  // From-URL download modal state.
  const [showUrlDownload, setShowUrlDownload] = useState(false);
  const [dlUrl, setDlUrl] = useState('');
  const [dlFilename, setDlFilename] = useState('');
  const [dlChecksum, setDlChecksum] = useState('');
  const [dlAlgorithm, setDlAlgorithm] = useState<'sha256' | 'sha512' | 'md5' | ''>('');
  const [dlVerifyTLS, setDlVerifyTLS] = useState(true);
  const [dlSubmitting, setDlSubmitting] = useState(false);
  const [dlError, setDlError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Column sort. Default: by date descending (newest first — matches the
  // mental model of "what did I just upload?").
  type SortField = 'name' | 'ctime' | 'format' | 'size' | 'vmid' | 'notes';
  type SortDir   = 'asc' | 'desc';
  const [sortField, setSortField] = useState<SortField>('ctime');
  const [sortDir,   setSortDir]   = useState<SortDir>('desc');
  const toggleSort = (f: SortField) => {
    if (sortField === f) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(f);
      // Sensible default direction per column. String fields default
      // ascending (A→Z); numeric fields descending (large/recent first).
      setSortDir((f === 'name' || f === 'format' || f === 'notes') ? 'asc' : 'desc');
    }
    // Trigger the sci-fi sort animation (cyan scan-bar + per-row
    // staggered reveal). Cleared after 600ms which is long enough for
    // the scan-bar travel + the longest stagger to finish.
    setSortAnimating(true);
    setTimeout(() => setSortAnimating(false), 600);
  };
  const [sortAnimating, setSortAnimating] = useState(false);

  // Fetch list whenever the active tab or refresh tick changes.
  useEffect(() => {
    if (!activeTab) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    const url = `/api/clusters/${encodeURIComponent(clusterId)}`
      + `/nodes/${encodeURIComponent(node)}`
      + `/storage/${encodeURIComponent(storageName)}/content`
      + `?type=${activeTab}`;
    fetch(url, { credentials: 'same-origin' })
      .then(async (r) => {
        if (!r.ok) {
          const body = await r.text().catch(() => '');
          throw new Error(`HTTP ${r.status}: ${body.slice(0, 200)}`);
        }
        const data = await r.json();
        if (!cancelled) {
          setItems(Array.isArray(data.items) ? data.items : []);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(String(e?.message || e));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [activeTab, refreshTick, clusterId, node, storageName]);

  const goBack = () => {
    window.history.pushState(null, '', '/storage');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleDelete = async (item: ContentItem) => {
    if (!canWrite || isBlockLevel) return;
    const ok = await dialog.confirm(
      language === 'zh-TW'
        ? `確定要刪除「${displayName(item.volid)}」？此操作無法復原。`
        : `Delete "${displayName(item.volid)}"? This cannot be undone.`,
      {
        title: language === 'zh-TW' ? '刪除確認' : 'Delete confirmation',
        destructive: true,
      },
    );
    if (!ok) return;
    try {
      // volid format: "storage:type/file" — the volume part is what PVE
      // wants in the DELETE path. We send the full volid; the server
      // route's `{volume:.+}` matcher catches it.
      const url = `/api/clusters/${encodeURIComponent(clusterId)}`
        + `/nodes/${encodeURIComponent(node)}`
        + `/storage/${encodeURIComponent(storageName)}/content/`
        + encodeURIComponent(item.volid);
      const r = await fetch(url, { method: 'DELETE', credentials: 'same-origin' });
      if (!r.ok) {
        const body = await r.text().catch(() => '');
        throw new Error(`HTTP ${r.status}: ${body.slice(0, 200)}`);
      }
      // Optimistic local update + refetch.
      setItems((prev) => prev.filter((x) => x.volid !== item.volid));
      setRefreshTick((n) => n + 1);
    } catch (e) {
      await dialog.alert(
        language === 'zh-TW' ? `刪除失敗：${e}` : `Delete failed: ${e}`,
        { title: language === 'zh-TW' ? '錯誤' : 'Error' },
      );
    }
  };

  const filteredItems = useMemo(() => {
    // 1. Filter by search term.
    let list = items;
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      list = items.filter((it) =>
        displayName(it.volid).toLowerCase().includes(q)
        || (it.format || '').toLowerCase().includes(q)
        || (it.notes || '').toLowerCase().includes(q),
      );
    }
    // 2. Sort by the selected column. Make a shallow copy so we don't
    // mutate `items` (would clobber React's snapshot for change detection).
    const sorted = list.slice().sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name':
          cmp = displayName(a.volid).localeCompare(displayName(b.volid));
          break;
        case 'ctime':
          cmp = (a.ctime || 0) - (b.ctime || 0);
          break;
        case 'format':
          cmp = (a.format || '').localeCompare(b.format || '');
          break;
        case 'size':
          cmp = (a.size || 0) - (b.size || 0);
          break;
        case 'vmid':
          cmp = (a.vmid ?? -1) - (b.vmid ?? -1);
          break;
        case 'notes':
          cmp = (a.notes || '').localeCompare(b.notes || '');
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [items, searchTerm, sortField, sortDir]);

  // Render a sort indicator on the header that owns the current sort.
  const sortArrow = (f: SortField) => sortField === f
    ? (sortDir === 'asc' ? '▲' : '▼')
    : '';

  if (!meta) {
    return (
      <div className="storage-detail-loading">
        <div className="vm-thumb-spinner" />
        <span>{language === 'zh-TW' ? '載入中…' : 'Loading…'}</span>
      </div>
    );
  }

  const usagePercent = meta.total > 0 ? (meta.used / meta.total) * 100 : 0;

  return (
    <div className="storage-detail">
      {/* Header — back + breadcrumb + storage stats. */}
      <div className="storage-detail-header">
        <button className="back-btn" onClick={goBack} title={
          language === 'zh-TW' ? '返回儲存清單' : 'Back to storage list'
        }>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>{language === 'zh-TW' ? '返回' : 'Back'}</span>
        </button>
        <div className="storage-detail-title">
          <span className="breadcrumb">{meta.clusterName}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb">{node}</span>
          <span className="breadcrumb-sep">/</span>
          <h1 className="storage-name font-display">{storageName}</h1>
          <span className={`storage-type-badge ${isBlockLevel ? 'block' : 'file'}`}>
            {meta.type.toUpperCase()}
          </span>
          {meta.shared && (
            <span className="storage-shared-badge">
              {language === 'zh-TW' ? '共享' : 'SHARED'}
            </span>
          )}
        </div>
        <div className="storage-detail-stats">
          <div className="stat">
            <span className="stat-label">{t('metric.used')}</span>
            <span className={`stat-val text-${getHealthColor(usagePercent)}`}>
              {formatBytes(meta.used)} / {formatBytes(meta.total)}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">{t('metric.usage')}</span>
            <span className={`stat-val text-${getHealthColor(usagePercent)}`}>
              {formatPercent(usagePercent, 1)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs — only those listed in storage.content. */}
      <div className="storage-detail-tabs">
        {availableTabs.length === 0 ? (
          <span className="no-tabs">
            {language === 'zh-TW'
              ? '此儲存沒有可管理的內容類型'
              : 'No manageable content types on this storage'}
          </span>
        ) : availableTabs.map((tab) => (
          <button
            key={tab}
            className={`storage-tab tab-${tab} ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <span className="tab-icon" aria-hidden>{iconForTab(tab)}</span>
            <span>{labelForContent(tab, language)}</span>
          </button>
        ))}
      </div>

      {/* Toolbar — search + (later) upload + URL-download. Phase 1: search only.
          Block-level storage hides write actions entirely. */}
      <div className="storage-detail-toolbar">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={language === 'zh-TW' ? '搜尋名稱 / 格式 / 備註' : 'Search name / format / notes'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {!isBlockLevel && canWrite && (
          <>
            <button
              className="action-btn"
              onClick={() => setShowUpload(true)}
              title={language === 'zh-TW'
                ? '從本機上傳檔案到此儲存'
                : 'Upload a local file to this storage'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7-7 7 7" />
              </svg>
              <span>{language === 'zh-TW' ? '上傳' : 'Upload'}</span>
            </button>
            <button
              className="action-btn"
              onClick={() => setShowUrlDownload(true)}
              title={language === 'zh-TW'
                ? '伺服器端從 URL 下載到此儲存（PVE download-url）'
                : 'Server-side download to this storage (PVE download-url)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-9-9" />
                <path d="M21 3v6h-6" />
              </svg>
              <span>{language === 'zh-TW' ? '從網址下載' : 'From URL'}</span>
            </button>
          </>
        )}
        {isBlockLevel && (
          <span className="readonly-hint">
            {language === 'zh-TW'
              ? '此儲存為區塊級（VM 磁碟），僅供瀏覽'
              : 'Block-level storage (VM disks) — list only'}
          </span>
        )}
        <button
          className="action-btn ghost"
          onClick={() => setRefreshTick((n) => n + 1)}
          title={language === 'zh-TW' ? '重新整理' : 'Refresh'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
          </svg>
          <span>{language === 'zh-TW' ? '重新整理' : 'Refresh'}</span>
        </button>
      </div>

      {/* List. The `key={activeTab}` retriggers the entry animation
          (tabSwitchIn) every time the user changes tabs — a 240ms
          fade+slide+scan-line that matches the rest of the cyber UI. */}
      <div className="storage-detail-list" key={activeTab || 'none'}>
        <div className="tab-scan-line" />
        {loading && items.length === 0 && (
          <div className="storage-detail-loading">
            <div className="vm-thumb-spinner" />
            <span>{language === 'zh-TW' ? '載入中…' : 'Loading…'}</span>
          </div>
        )}
        {error && (
          <div className="storage-detail-error">
            <span>{language === 'zh-TW' ? '錯誤：' : 'Error: '}{error}</span>
          </div>
        )}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="storage-detail-empty">
            <span>{language === 'zh-TW' ? '此分類無內容' : 'No items in this category'}</span>
          </div>
        )}
        {filteredItems.length > 0 && (
          <table className="storage-content-table">
            <thead>
              <tr>
                <th
                  className={`sortable ${sortField === 'name' ? 'sorted' : ''}`}
                  onClick={() => toggleSort('name')}
                >
                  <span>{language === 'zh-TW' ? '名稱' : 'Name'}
                    {sortArrow('name') && <span className="sort-indicator">{sortArrow('name')}</span>}
                  </span>
                </th>
                <th
                  className={`sortable ${sortField === 'ctime' ? 'sorted' : ''}`}
                  onClick={() => toggleSort('ctime')}
                >
                  <span>{language === 'zh-TW' ? '日期' : 'Date'}
                    {sortArrow('ctime') && <span className="sort-indicator">{sortArrow('ctime')}</span>}
                  </span>
                </th>
                <th
                  className={`sortable ${sortField === 'format' ? 'sorted' : ''}`}
                  onClick={() => toggleSort('format')}
                >
                  <span>{language === 'zh-TW' ? '格式' : 'Format'}
                    {sortArrow('format') && <span className="sort-indicator">{sortArrow('format')}</span>}
                  </span>
                </th>
                <th
                  className={`num sortable ${sortField === 'size' ? 'sorted' : ''}`}
                  onClick={() => toggleSort('size')}
                >
                  <span>{language === 'zh-TW' ? '大小' : 'Size'}
                    {sortArrow('size') && <span className="sort-indicator">{sortArrow('size')}</span>}
                  </span>
                </th>
                {activeTab === 'backup' && (
                  <th
                    className={`num sortable ${sortField === 'vmid' ? 'sorted' : ''}`}
                    onClick={() => toggleSort('vmid')}
                  >
                    <span>VMID
                      {sortArrow('vmid') && <span className="sort-indicator">{sortArrow('vmid')}</span>}
                    </span>
                  </th>
                )}
                {activeTab === 'backup' && (
                  <th
                    className={`sortable ${sortField === 'notes' ? 'sorted' : ''}`}
                    onClick={() => toggleSort('notes')}
                  >
                    <span>{language === 'zh-TW' ? '備註' : 'Notes'}
                      {sortArrow('notes') && <span className="sort-indicator">{sortArrow('notes')}</span>}
                    </span>
                  </th>
                )}
                {!isBlockLevel && canWrite && (
                  <th className="actions">{language === 'zh-TW' ? '動作' : 'Actions'}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((it) => {
                const fmtClass = formatColorClass(it.format);
                const sizeClass = sizeColorClass(it.size);
                return (
                  <tr key={it.volid} className={sortAnimating ? 'sort-animating' : ''}>
                    <td className="name-cell" title={it.volid}>
                      <span className="file-icon" aria-hidden>
                        {iconForFormat(it.format, activeTab)}
                      </span>
                      <span className="file-name">{displayName(it.volid)}</span>
                    </td>
                    <td className="date-cell">
                      {it.ctime ? formatTime(it.ctime, language) : '—'}
                    </td>
                    <td>
                      {it.format ? (
                        <span className={`format-badge ${fmtClass}`}>{it.format}</span>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>
                    <td className={`num size-${sizeClass}`}>
                      {it.size ? formatBytes(it.size) : '—'}
                    </td>
                    {activeTab === 'backup' && (
                      <td className="num">
                        {it.vmid != null ? (
                          <span className="vmid-badge">#{it.vmid}</span>
                        ) : <span className="muted">—</span>}
                      </td>
                    )}
                    {activeTab === 'backup' && (
                      <td className="notes-cell" title={it.notes || ''}>
                        {it.notes || <span className="muted">—</span>}
                      </td>
                    )}
                    {!isBlockLevel && (
                      <td className="actions">
                        <a
                          className="action-btn-row"
                          href={`/api/clusters/${encodeURIComponent(clusterId)}`
                            + `/nodes/${encodeURIComponent(node)}`
                            + `/storage/${encodeURIComponent(storageName)}/download/`
                            + encodeURIComponent(it.volid)}
                          download
                          title={language === 'zh-TW'
                            ? '下載到本機（SSH 串流）'
                            : 'Download to local (SSH stream)'}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          <span className="act-lbl">{language === 'zh-TW' ? '下載' : 'Download'}</span>
                        </a>
                        {canWrite && (
                          <button
                            className="action-btn-row danger"
                            onClick={() => handleDelete(it)}
                            title={language === 'zh-TW' ? '刪除' : 'Delete'}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2" />
                            </svg>
                            <span className="act-lbl">{language === 'zh-TW' ? '刪除' : 'Delete'}</span>
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Upload modal — drag-drop or file picker, with XHR progress. */}
      {showUpload && (
        <div
          className="url-dl-overlay"
          onClick={() => !upBusy && setShowUpload(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (upBusy) return;
            const f = e.dataTransfer.files?.[0];
            if (f) setUpFile(f);
          }}
        >
          <div className="url-dl-frame" onClick={(e) => e.stopPropagation()}>
            <div className="url-dl-titlebar">
              <span>{language === 'zh-TW' ? '上傳到 ' : 'Upload to '}{storageName}</span>
              <button className="url-dl-close" onClick={() => !upBusy && setShowUpload(false)}>×</button>
            </div>
            <div className="url-dl-body">
              <p className="url-dl-lead">
                {language === 'zh-TW'
                  ? `將檔案上傳到此儲存區的 ${labelForContent(activeTab || 'iso', language)} 分類。可拖曳檔案到此視窗。`
                  : `Upload a file to this storage's ${labelForContent(activeTab || 'iso', language)} category. You can also drag-drop into this window.`}
              </p>
              <label>{language === 'zh-TW' ? '檔案' : 'File'}</label>
              <input
                type="file"
                disabled={upBusy}
                onChange={(e) => setUpFile(e.target.files?.[0] || null)}
                style={{
                  width: '100%', padding: '8px',
                  background: '#02050b', border: '1px solid var(--border)',
                  borderRadius: 4, color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)', fontSize: 13,
                }}
              />
              {upFile && (
                <div className="url-dl-lead" style={{ marginTop: 8 }}>
                  <code>{upFile.name}</code>
                  {' · '}
                  <span>{(upFile.size / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
              )}
              {upBusy && (
                <div style={{ marginTop: 12 }}>
                  <div style={{
                    height: 6, background: '#02050b', borderRadius: 3,
                    border: '1px solid var(--border)', overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${upProgress}%`, height: '100%',
                      background: 'linear-gradient(90deg, var(--primary), #00b4ff)',
                      transition: 'width 0.2s ease',
                      boxShadow: '0 0 8px rgba(0,240,255,0.5)',
                    }} />
                  </div>
                  <div style={{
                    marginTop: 6, fontFamily: 'var(--font-mono)',
                    fontSize: 12, color: 'var(--text-secondary)',
                  }}>
                    {upProgress.toFixed(1)}%
                    {' '}
                    {language === 'zh-TW' ? '上傳中…' : 'Uploading…'}
                  </div>
                </div>
              )}
              {upError && <div className="url-dl-err">{upError}</div>}
            </div>
            <div className="url-dl-actions">
              <button
                className="action-btn ghost"
                onClick={() => !upBusy && setShowUpload(false)}
                disabled={upBusy}
              >
                {language === 'zh-TW' ? '取消' : 'Cancel'}
              </button>
              <button
                className="action-btn primary"
                disabled={upBusy || !upFile || !activeTab}
                onClick={() => {
                  if (!upFile || !activeTab) return;
                  setUpBusy(true);
                  setUpError(null);
                  setUpProgress(0);
                  // XHR (not fetch) so we get upload progress events.
                  const fd = new FormData();
                  fd.append('content', activeTab);
                  fd.append('filename', upFile, upFile.name);
                  const xhr = new XMLHttpRequest();
                  xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                      setUpProgress((e.loaded / e.total) * 100);
                    }
                  };
                  xhr.onload = () => {
                    setUpBusy(false);
                    if (xhr.status >= 200 && xhr.status < 300) {
                      setShowUpload(false);
                      setUpFile(null);
                      setUpProgress(0);
                      setRefreshTick((n) => n + 1);
                      void dialog.alert(
                        language === 'zh-TW'
                          ? '上傳完成。檔案已派送到 PVE。'
                          : 'Upload complete. File dispatched to PVE.',
                        { title: language === 'zh-TW' ? '完成' : 'Done' },
                      );
                    } else {
                      setUpError(`HTTP ${xhr.status}: ${xhr.responseText.slice(0, 200)}`);
                    }
                  };
                  xhr.onerror = () => {
                    setUpBusy(false);
                    setUpError(language === 'zh-TW' ? '網路錯誤' : 'Network error');
                  };
                  xhr.open(
                    'POST',
                    `/api/clusters/${encodeURIComponent(clusterId)}`
                    + `/nodes/${encodeURIComponent(node)}`
                    + `/storage/${encodeURIComponent(storageName)}/upload`,
                  );
                  xhr.withCredentials = true;
                  xhr.send(fd);
                }}
              >
                {upBusy
                  ? (language === 'zh-TW' ? '上傳中…' : 'Uploading…')
                  : (language === 'zh-TW' ? '開始上傳' : 'Upload')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* From-URL download modal — server-side fetch via PVE's
          download-url endpoint. Returns a UPID; we don't track task
          progress here yet (TODO: poll /tasks/{upid}/status). */}
      {showUrlDownload && (
        <div className="url-dl-overlay" onClick={() => !dlSubmitting && setShowUrlDownload(false)}>
          <div className="url-dl-frame" onClick={(e) => e.stopPropagation()}>
            <div className="url-dl-titlebar">
              <span>{language === 'zh-TW' ? '從網址下載' : 'Download from URL'}</span>
              <button className="url-dl-close" onClick={() => !dlSubmitting && setShowUrlDownload(false)}>×</button>
            </div>
            <div className="url-dl-body">
              <p className="url-dl-lead">
                {language === 'zh-TW'
                  ? `PVE 端伺服器會直接從這個網址抓檔到 ${storageName}，你的網路頻寬不會經手。`
                  : `The PVE host will pull the file directly into ${storageName}; your bandwidth never carries it.`}
              </p>
              <label>{language === 'zh-TW' ? '網址 (URL)' : 'URL'}</label>
              <input
                type="text" value={dlUrl}
                onChange={(e) => setDlUrl(e.target.value)}
                placeholder="https://example.com/debian-12.iso"
                spellCheck={false} autoComplete="off"
              />
              <label>{language === 'zh-TW' ? '檔名（儲存後）' : 'Filename (as stored)'}</label>
              <input
                type="text" value={dlFilename}
                onChange={(e) => setDlFilename(e.target.value)}
                placeholder="debian-12.iso"
                spellCheck={false} autoComplete="off"
              />
              <label>{language === 'zh-TW' ? '校驗 (選填)' : 'Checksum (optional)'}</label>
              <div className="url-dl-row">
                <select
                  value={dlAlgorithm}
                  onChange={(e) => setDlAlgorithm(e.target.value as typeof dlAlgorithm)}
                  className="url-dl-algo"
                >
                  <option value="">{language === 'zh-TW' ? '— 演算法 —' : '— algorithm —'}</option>
                  <option value="sha256">sha256</option>
                  <option value="sha512">sha512</option>
                  <option value="md5">md5</option>
                </select>
                <input
                  type="text" value={dlChecksum}
                  onChange={(e) => setDlChecksum(e.target.value)}
                  placeholder={language === 'zh-TW' ? '十六進位摘要' : 'hex digest'}
                  spellCheck={false} autoComplete="off"
                />
              </div>
              <label className="url-dl-check">
                <input
                  type="checkbox" checked={dlVerifyTLS}
                  onChange={(e) => setDlVerifyTLS(e.target.checked)}
                />
                <span>{language === 'zh-TW' ? '驗證來源 TLS 憑證（建議開啟）' : 'Verify source TLS certificate (recommended)'}</span>
              </label>
              {dlError && <div className="url-dl-err">{dlError}</div>}
            </div>
            <div className="url-dl-actions">
              <button
                className="action-btn ghost"
                onClick={() => !dlSubmitting && setShowUrlDownload(false)}
                disabled={dlSubmitting}
              >
                {language === 'zh-TW' ? '取消' : 'Cancel'}
              </button>
              <button
                className="action-btn primary"
                disabled={dlSubmitting || !dlUrl || !dlFilename || !activeTab}
                onClick={async () => {
                  if (!activeTab) return;
                  setDlSubmitting(true);
                  setDlError(null);
                  try {
                    const r = await fetch(
                      `/api/clusters/${encodeURIComponent(clusterId)}`
                      + `/nodes/${encodeURIComponent(node)}`
                      + `/storage/${encodeURIComponent(storageName)}/download-url`,
                      {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          url: dlUrl,
                          filename: dlFilename,
                          content: activeTab,
                          checksum: dlChecksum || undefined,
                          checksum_algorithm: dlAlgorithm || undefined,
                          verify_certificates: dlVerifyTLS,
                        }),
                      },
                    );
                    if (!r.ok) {
                      const body = await r.text().catch(() => '');
                      throw new Error(`HTTP ${r.status}: ${body.slice(0, 200)}`);
                    }
                    setShowUrlDownload(false);
                    setDlUrl(''); setDlFilename(''); setDlChecksum(''); setDlAlgorithm('');
                    // Refresh list — task may take seconds/minutes; the
                    // file will appear once PVE finishes.
                    setTimeout(() => setRefreshTick((n) => n + 1), 1000);
                    await dialog.alert(
                      language === 'zh-TW'
                        ? '下載作業已派送。完成後檔案會出現在清單。'
                        : 'Download task dispatched. The file will appear in the list when finished.',
                      { title: language === 'zh-TW' ? '已派送' : 'Dispatched' },
                    );
                  } catch (e) {
                    setDlError(String(e instanceof Error ? e.message : e));
                  } finally {
                    setDlSubmitting(false);
                  }
                }}
              >
                {dlSubmitting
                  ? (language === 'zh-TW' ? '派送中…' : 'Dispatching…')
                  : (language === 'zh-TW' ? '開始下載' : 'Start download')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .storage-detail {
          padding: var(--spacing-lg);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          overflow: hidden;
        }
        .storage-detail-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .back-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }
        .storage-detail-title {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
        }
        .breadcrumb {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }
        .breadcrumb-sep {
          color: var(--text-muted);
          opacity: 0.5;
        }
        .storage-name {
          font-size: 22px;
          color: var(--primary);
          text-shadow: 0 0 8px rgba(0,240,255,0.4);
          margin: 0;
        }
        .storage-type-badge {
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          font-weight: bold;
        }
        .storage-type-badge.file {
          background: rgba(0, 240, 255, 0.15);
          color: var(--primary);
          border: 1px solid var(--primary);
        }
        .storage-type-badge.block {
          background: rgba(224, 102, 255, 0.15);
          color: #e066ff;
          border: 1px solid #e066ff;
        }
        .storage-shared-badge {
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .storage-detail-stats {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          align-items: flex-end;
        }
        .stat-label {
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .stat-val {
          font-family: var(--font-mono);
          font-size: 14px;
        }
        .storage-detail-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          align-self: flex-start;
        }
        .storage-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .storage-tab:hover {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.06);
        }
        .storage-tab.active {
          color: var(--primary);
          background: rgba(0,240,255,0.15);
          text-shadow: 0 0 6px var(--primary);
        }
        /* Tab icon — inherits the tab's text colour by default (so the
           icon dims with inactive tabs and lights up when active or
           hovered). Each content-type tab gets a TINT override so even
           inactive tabs are visually distinguishable at a glance. */
        .tab-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          flex: 0 0 14px;
          opacity: 0.85;
          transition: filter var(--transition-fast), opacity var(--transition-fast);
        }
        .storage-tab.active .tab-icon {
          opacity: 1;
          filter: drop-shadow(0 0 4px currentColor);
        }
        .storage-tab.tab-backup   .tab-icon { color: #ffa500; }
        .storage-tab.tab-iso      .tab-icon { color: #00b4ff; }
        .storage-tab.tab-vztmpl   .tab-icon { color: #b464ff; }
        .storage-tab.tab-snippets .tab-icon { color: #a0c864; }
        .storage-tab.tab-import   .tab-icon { color: #ff64b4; }
        .storage-tab.tab-images   .tab-icon { color: #00f0c8; }
        .storage-tab.tab-rootdir  .tab-icon { color: var(--text-secondary); }
        .no-tabs {
          padding: 8px 14px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 13px;
        }
        .storage-detail-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        /* One fixed control height across the toolbar — search box and
           buttons drift apart whenever either side's padding/font moves. */
        .storage-detail-toolbar .search-box,
        .storage-detail-toolbar .action-btn {
          height: 34px;
          box-sizing: border-box;
        }
        .storage-detail-toolbar .search-box {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          flex: 0 0 280px;
        }
        .storage-detail-toolbar .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          width: 100%;
        }
        /* Lighter placeholder so the hint is readable, not faded out. */
        .storage-detail-toolbar .search-box input::placeholder {
          color: var(--text-secondary);
          opacity: 1;
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .action-btn:hover:not(.disabled):not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
        }
        .action-btn.ghost {
          margin-left: auto;
        }
        .action-btn.disabled, .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .readonly-hint {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }
        .storage-detail-list {
          flex: 1;
          overflow: auto;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          position: relative;
          /* Replayed every time we re-mount with a new key=activeTab. */
          animation: tabSwitchIn 0.24s ease-out;
        }
        @keyframes tabSwitchIn {
          0% {
            opacity: 0;
            transform: translateY(6px);
            filter: blur(2px);
          }
          60% {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
        /* Scanline that sweeps top→bottom across the table when a tab
           is freshly opened. We animate the top property from above the
           visible area to past the bottom so the bar visibly traverses
           the whole list, not just shifts 2px. A taller (4px) bar with
           stronger glow + tail makes the sweep obvious without being
           garish. */
        .tab-scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.4) 20%,
            rgba(0, 240, 255, 0.95) 50%,
            rgba(0, 240, 255, 0.4) 80%,
            transparent 100%);
          box-shadow:
            0 0 12px 2px rgba(0, 240, 255, 0.6),
            0 0 24px rgba(0, 240, 255, 0.35);
          pointer-events: none;
          z-index: 5;
          animation: tabScan 0.55s cubic-bezier(0.55, 0, 0.4, 1) forwards;
          opacity: 0;
          top: -8px;
        }
        /* Soft trailing glow that follows the scan-line down. */
        .tab-scan-line::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 4px;
          height: 36px;
          background: linear-gradient(
            to bottom,
            rgba(0, 240, 255, 0.22) 0%,
            rgba(0, 240, 255, 0.04) 60%,
            transparent 100%);
        }
        @keyframes tabScan {
          0% {
            opacity: 0;
            top: -8px;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            top: calc(100% + 8px);
          }
        }
        /* Tab button itself gets a subtle pulse when becoming active. */
        .storage-tab.active {
          animation: tabActiveIn 0.24s ease-out;
        }
        @keyframes tabActiveIn {
          0%   { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.0); }
          50%  { box-shadow: 0 0 0 4px rgba(0, 240, 255, 0.35); }
          100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.0); }
        }
        /* Table — visual layering inspired by HoloMatrix's vm-table.
           Goal: each column carries its own colour signal so the eye can
           scan by category instead of reading every line. */
        .storage-content-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-mono);
          font-size: 13px;
          position: relative;
        }
        /* Sci-fi sort animation — same pattern as the matrix table:
           rows fade-up + slight blur with stagger, while a glowing
           cyan scan-bar travels down the table edge. Triggered by
           .sort-animating on the rows. */
        .storage-content-table tbody tr.sort-animating {
          animation: sortRowReveal 360ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        .storage-content-table tbody tr.sort-animating:nth-child(1)  { animation-delay:   0ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(2)  { animation-delay:  18ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(3)  { animation-delay:  36ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(4)  { animation-delay:  54ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(5)  { animation-delay:  72ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(6)  { animation-delay:  90ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(7)  { animation-delay: 108ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(8)  { animation-delay: 126ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(9)  { animation-delay: 144ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(10) { animation-delay: 162ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+11) { animation-delay: 180ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+16) { animation-delay: 200ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+22) { animation-delay: 220ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+30) { animation-delay: 240ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+40) { animation-delay: 260ms; }
        @keyframes sortRowReveal {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(2px); }
          50%  { filter: blur(0); }
          100% { opacity: 1; transform: none; filter: none; }
        }
        /* Glow scan-bar that travels down during sort. */
        .storage-content-table::before {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.4) 18%,
            rgba(0, 240, 255, 0.95) 50%,
            rgba(0, 240, 255, 0.4) 82%,
            transparent 100%);
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.7),
            0 0 28px rgba(0, 240, 255, 0.35);
          pointer-events: none;
          opacity: 0;
          z-index: 5;
        }
        .storage-content-table:has(tr.sort-animating)::before {
          animation: sortScanBar 480ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        @keyframes sortScanBar {
          0%   { opacity: 0; top: 0; }
          12%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0; top: 100%; }
        }
        .storage-content-table thead {
          position: sticky;
          top: 0;
          z-index: 10;
          background: var(--bg-secondary);
        }
        .storage-content-table th {
          padding: var(--spacing-sm) var(--spacing-md);
          text-align: left;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        /* Sortable header — same exact behaviour as the matrix table:
           plain color transition only (no background tint, no glow). */
        .storage-content-table th.sortable {
          cursor: pointer;
          user-select: none;
        }
        .storage-content-table th.sortable:hover {
          color: var(--primary);
        }
        .storage-content-table th.sorted {
          color: var(--primary);
        }
        .storage-content-table th span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .storage-content-table .sort-indicator {
          font-size: 11px;
          opacity: 0.85;
        }
        .storage-content-table th.num,
        .storage-content-table td.num {
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        /* For numeric (right-aligned) sortable headers, the inline-flex
           span shouldn't push contents to the left. */
        .storage-content-table th.num span {
          justify-content: flex-end;
          width: 100%;
        }
        /* Width 1% + nowrap = shrink-to-fit, so the column adapts when
           the buttons show text labels vs icon-only. */
        .storage-content-table th.actions,
        .storage-content-table td.actions {
          text-align: center;
          width: 1%;
          white-space: nowrap;
        }
        .storage-content-table td.actions {
          padding-left: 4px;
          padding-right: 8px;
        }
        .storage-content-table td.actions .action-btn-row + .action-btn-row {
          margin-left: 4px;
        }
        .storage-content-table td {
          padding: var(--spacing-xs) var(--spacing-md);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
          vertical-align: middle;
        }
        /* Subtle zebra. Without this every row reads the same — even a
           4% delta is enough for the eye to pick up bands. */
        .storage-content-table tbody tr:nth-child(odd) {
          background: rgba(0, 240, 255, 0.025);
        }
        .storage-content-table tbody tr:hover {
          background: var(--bg-hover);
        }

        /* File name column — primary brightness, with a leading icon
           that's tinted by file type. */
        .name-cell {
          max-width: 600px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .file-icon {
          flex: 0 0 16px;
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
        }
        .file-name {
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Date — secondary tone, smaller weight. */
        .date-cell {
          color: var(--text-secondary);
          font-size: 12px;
        }

        /* Format badge — type-coded pill. Same shape as type-badge in
           the matrix table; colours chosen so each format is instantly
           distinguishable at a glance. */
        .format-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .format-badge.fmt-iso {
          background: rgba(0, 180, 255, 0.15);
          border: 1px solid rgba(0, 180, 255, 0.4);
          color: #00b4ff;
        }
        .format-badge.fmt-backup {
          background: rgba(255, 165, 0, 0.15);
          border: 1px solid rgba(255, 165, 0, 0.45);
          color: #ffa500;
        }
        .format-badge.fmt-tmpl {
          background: rgba(180, 100, 255, 0.15);
          border: 1px solid rgba(180, 100, 255, 0.4);
          color: #b464ff;
        }
        .format-badge.fmt-disk {
          background: rgba(0, 240, 200, 0.12);
          border: 1px solid rgba(0, 240, 200, 0.4);
          color: #00f0c8;
        }
        .format-badge.fmt-snippet {
          background: rgba(160, 200, 100, 0.12);
          border: 1px solid rgba(160, 200, 100, 0.4);
          color: #a0c864;
        }
        .format-badge.fmt-import {
          background: rgba(255, 100, 180, 0.12);
          border: 1px solid rgba(255, 100, 180, 0.4);
          color: #ff64b4;
        }
        .format-badge.fmt-other {
          background: rgba(180, 180, 180, 0.08);
          border: 1px solid rgba(180, 180, 180, 0.3);
          color: var(--text-secondary);
        }

        /* Size — tinted by magnitude. Multi-GB stands out so the
           operator can spot fat files without reading every digit. */
        .num.size-tiny    { color: var(--text-muted); }
        .num.size-small   { color: var(--text-primary); }
        .num.size-medium  { color: var(--primary); }
        .num.size-large   { color: #ffa500; }
        .num.size-huge    { color: #ff6464; text-shadow: 0 0 4px rgba(255,100,100,0.3); }

        /* VMID badge in the backup tab — same shape as matrix VMID. */
        .vmid-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 3px;
          background: rgba(0, 240, 255, 0.10);
          border: 1px solid rgba(0, 240, 255, 0.35);
          color: var(--primary);
        }

        .notes-cell {
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-secondary);
          font-style: italic;
        }
        .muted {
          color: var(--text-muted);
          opacity: 0.6;
        }

        /* Icon + text label when the viewport is wide enough; collapses
           to icon-only via the media query below. */
        .action-btn-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          height: 26px;
          padding: 0 10px;
          background: transparent;
          border: 1px solid rgba(0, 240, 255, 0.22);
          border-radius: 3px;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-decoration: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .action-btn-row:hover {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0, 240, 255, 0.08);
        }
        .action-btn-row svg { flex-shrink: 0; }
        @media (max-width: 1100px) {
          .action-btn-row .act-lbl { display: none; }
          .action-btn-row { width: 26px; padding: 0; }
        }
        .action-btn-row.danger:hover {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          background: rgba(255,77,109,0.08);
        }
        .storage-detail-loading,
        .storage-detail-error,
        .storage-detail-empty {
          padding: 32px;
          text-align: center;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .storage-detail-error {
          color: var(--danger, #ff4d6d);
        }

        /* From-URL download modal — minimal cyber styling consistent
           with the rest of the modals. */
        .url-dl-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 600;
          display: flex; align-items: center; justify-content: center;
          padding: 32px;
          animation: tpFade .15s ease;
        }
        @keyframes urlDlFade { from { opacity: 0 } to { opacity: 1 } }
        .url-dl-frame {
          width: 100%; max-width: 560px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0,240,255,0.35);
          border-radius: 8px;
          box-shadow:
            0 16px 60px rgba(0,0,0,0.65),
            0 0 60px -10px rgba(0,240,255,0.4);
          display: flex; flex-direction: column;
          animation: urlDlFade .15s ease-out;
          overflow: hidden;
        }
        .url-dl-titlebar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .url-dl-close {
          background: transparent; border: none;
          color: var(--text-secondary);
          font-size: 20px; cursor: pointer;
          line-height: 1;
        }
        .url-dl-close:hover { color: var(--primary); }
        .url-dl-body {
          padding: 16px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .url-dl-lead {
          margin: 0 0 8px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.5;
        }
        .url-dl-body label {
          display: block;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin: 6px 0 2px;
        }
        .url-dl-body input[type="text"],
        .url-dl-body select {
          width: 100%;
          padding: 8px 10px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .url-dl-body input[type="text"]:focus,
        .url-dl-body select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(0,240,255,0.15);
        }
        .url-dl-row {
          display: flex; gap: 8px;
        }
        .url-dl-row .url-dl-algo { flex: 0 0 140px; }
        .url-dl-row input[type="text"] { flex: 1; }
        .url-dl-check {
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          margin-top: 10px !important;
          font-size: 13px !important;
          letter-spacing: 0 !important;
          text-transform: none !important;
          color: var(--text-primary) !important;
          font-family: var(--font-body) !important;
          cursor: pointer;
        }
        .url-dl-err {
          margin-top: 8px;
          padding: 8px 10px;
          background: rgba(255,80,80,0.08);
          border-left: 3px solid var(--danger, #ff4d6d);
          color: var(--danger, #ff4d6d);
          font-size: 13px;
          font-family: var(--font-mono);
        }
        .url-dl-actions {
          display: flex; justify-content: flex-end;
          gap: 8px;
          padding: 12px 16px;
          background: var(--bg-tertiary);
          border-top: 1px solid var(--border);
        }
        .url-dl-actions .action-btn.primary {
          background: rgba(0,240,255,0.15);
          color: var(--primary);
          border-color: var(--primary);
        }
        .url-dl-actions .action-btn.primary:hover {
          background: rgba(0,240,255,0.25);
          box-shadow: 0 0 12px rgba(0,240,255,0.4);
        }
      `}</style>
    </div>
  );
}

// "local:iso/debian-12.iso" → "debian-12.iso"
// Falls back to volid as-is if it doesn't follow the storage:type/path
// scheme (some PVE versions return just a path for certain content types).
function displayName(volid: string): string {
  const slash = volid.indexOf('/');
  if (slash >= 0) return volid.slice(slash + 1);
  const colon = volid.indexOf(':');
  if (colon >= 0) return volid.slice(colon + 1);
  return volid;
}

// Tab icons — one inline SVG per content type. Uses currentColor so the
// CSS .tab-{type} rules can tint the icon to match its content category
// (matches the format-badge colour scheme used in the body table).
function iconForTab(tab: ContentType) {
  switch (tab) {
    case 'backup':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-9-9" />
          <path d="M21 3v6h-6" />
          <circle cx="12" cy="12" r="2.2" />
        </svg>
      );
    case 'iso':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'vztmpl':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case 'snippets':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'import':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case 'images':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'rootdir':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
      );
  }
}

function labelForContent(c: ContentType, lang: string): string {
  if (lang === 'zh-TW') {
    return ({
      backup:   '備份',
      iso:      'ISO 映像',
      vztmpl:   'CT 範本',
      snippets: '程式碼片段',
      import:   '匯入',
      images:   '磁碟映像',
      rootdir:  'CT 根目錄',
    } as const)[c];
  }
  return ({
    backup:   'Backups',
    iso:      'ISO Images',
    vztmpl:   'CT Templates',
    snippets: 'Snippets',
    import:   'Import',
    images:   'Disk Images',
    rootdir:  'CT Root',
  } as const)[c];
}

// Decide which colour bucket a format string falls into. We bucket
// rather than enumerate every PVE format because there are dozens
// (vma.zst, vma.lzo, vma.gz, tar.zst, tar.gz, tar.lzo, qcow2, raw,
// subvol, ovf, vmdk, ...) — bucketing makes the visual grouping match
// "what kind of thing is it" rather than "what compression".
function formatColorClass(fmt?: string): string {
  if (!fmt) return 'fmt-other';
  const f = fmt.toLowerCase();
  if (f === 'iso' || f === 'img') return 'fmt-iso';
  if (f.startsWith('vma') || f === 'pbs-vm' || f === 'pbs-ct') return 'fmt-backup';
  if (f.startsWith('tar')) return 'fmt-tmpl';
  if (f === 'qcow2' || f === 'raw' || f === 'vmdk' || f === 'subvol') return 'fmt-disk';
  if (f === 'snippet' || f === 'yaml' || f === 'yml' || f === 'sh') return 'fmt-snippet';
  if (f === 'ovf' || f === 'ova' || f === 'vmx') return 'fmt-import';
  return 'fmt-other';
}

// Bucket size into rough magnitude classes used by the .size-* CSS.
// The cutoffs are tuned for typical PVE storage contents — most ISOs
// land in "small/medium", VM disks in "large", and bloated backups in
// "huge" so they pop out.
function sizeColorClass(size?: number): string {
  if (!size) return 'tiny';
  const mb = size / (1024 * 1024);
  if (mb < 50)        return 'tiny';
  if (mb < 1024)      return 'small';     // < 1 GB
  if (mb < 5120)      return 'medium';    // 1-5 GB
  if (mb < 20480)     return 'large';     // 5-20 GB
  return 'huge';                          // 20 GB+
}

// Tiny inline icons keyed off file-type bucket + active tab. Keeps the
// component dependency-free and SVG inline so it inherits currentColor.
function iconForFormat(fmt: string | undefined, tab: ContentType | null) {
  const cls = formatColorClass(fmt);
  // Pick a colour matching the badge so the icon and badge agree.
  const colour = (
    cls === 'fmt-iso'     ? '#00b4ff' :
    cls === 'fmt-backup'  ? '#ffa500' :
    cls === 'fmt-tmpl'    ? '#b464ff' :
    cls === 'fmt-disk'    ? '#00f0c8' :
    cls === 'fmt-snippet' ? '#a0c864' :
    cls === 'fmt-import'  ? '#ff64b4' :
    'var(--text-muted)'
  );
  // Icon shape per format bucket.
  if (cls === 'fmt-iso') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (cls === 'fmt-backup') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2">
        <path d="M21 12a9 9 0 11-9-9" /><path d="M21 3v6h-6" /><circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  if (cls === 'fmt-tmpl') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    );
  }
  if (cls === 'fmt-disk') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    );
  }
  if (cls === 'fmt-snippet') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (cls === 'fmt-import') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colour} strokeWidth="2">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    );
  }
  // Generic file icon for "other".
  void tab;
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function formatTime(ts: number, lang: string): string {
  const d = new Date(ts * 1000);
  const p = (n: number) => String(n).padStart(2, '0');
  // YYYY-MM-DD HH:MM — same compact form PVE uses
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} `
       + `${p(d.getHours())}:${p(d.getMinutes())}`;
  void lang;
}
