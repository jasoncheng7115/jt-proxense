/**
 * Data-protection panels for the Backups view (v1.2.0).
 *
 *   ProtectionPanel — per-guest backup recency against an RPO, built from
 *                     vzdump TASK HISTORY (server/protection.py explains why
 *                     not from the backup storage: PVE hides backup files from
 *                     a monitoring token and still answers 200).
 *   SnapshotsPanel  — every snapshot on the cluster with its age, so the
 *                     forgotten ones that pin storage can be found in one place.
 *
 * Both are read-only. Statuses that mean "we could not tell" are shown as
 * such — never folded into a reassuring or an alarming answer.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from '../i18n';
import { CyberSelect } from './CyberSelect';

type BStatus = 'ok' | 'stale' | 'failed' | 'no_record' | 'unprotected' | 'unknown';

interface GuestRow {
  vmid: number; name: string; node: string; type: string;
  status: BStatus; last_ok: number | null; age_s: number | null;
  last_attempt: number | null; last_error: string | null; jobs: string[];
}

interface BackupsResp {
  rpo_hours: number; guests: GuestRow[]; summary: Record<string, number>;
  unreadable_nodes: Record<string, string>; jobs_error: string | null;
  history_since: number | null; tasks_read: number;
}

interface SnapRow {
  vmid: number; guest: string; node: string; type: string; name: string;
  snaptime: number | null; parent: string | null; description: string;
  vmstate: boolean; age_s: number | null; old: boolean;
}

interface SnapsResp {
  old_days: number; snapshots: SnapRow[]; old_count: number;
  guest_errors: Record<string, string>;
}

const STATUS_ORDER: BStatus[] = ['failed', 'unprotected', 'no_record', 'stale', 'unknown', 'ok'];

const fmtTime = (s?: number | null) => {
  if (!s) return '—';
  const d = new Date(s * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} `
    + `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const fmtAge = (sec: number | null | undefined, zh: boolean) => {
  if (sec == null) return '—';
  const s = Math.max(0, Math.floor(sec));
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  if (zh) return d ? `${d} 天 ${h} 時` : h ? `${h} 時 ${m} 分` : `${m} 分`;
  return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m`;
};

async function getJSON<T>(url: string): Promise<T> {
  const r = await fetch(url, { credentials: 'same-origin' });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
  return d as T;
}

function useSort<K extends string>(initial: K, initialDir: 1 | -1 = 1) {
  const [key, setKey] = useState<K>(initial);
  const [dir, setDir] = useState<1 | -1>(initialDir);
  const click = (k: K) => {
    if (k === key) setDir((d) => (d === 1 ? -1 : 1));
    else { setKey(k); setDir(1); }
  };
  const mark = (k: K) => (k === key ? (dir === 1 ? ' ▲' : ' ▼') : '');
  return { key, dir, click, mark };
}

// ─────────────────────────────────────────────────────────── protection

export function ProtectionPanel({ clusterId }: { clusterId: string }) {
  const { language } = useTranslation();
  const zh = language === 'zh-TW';
  const L = (z: string, e: string) => (zh ? z : e);
  const [rpo, setRpo] = useState('24');
  const [data, setData] = useState<BackupsResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<BStatus | 'all'>('all');
  const sort = useSort<'status' | 'vmid' | 'name' | 'node' | 'age'>('status');

  const load = useCallback(async (force = false) => {
    if (!clusterId) return;
    setLoading(true); setError(null);
    try {
      setData(await getJSON<BackupsResp>(
        `/api/clusters/${encodeURIComponent(clusterId)}/protection/backups`
        + `?rpo_hours=${rpo}${force ? '&force=1' : ''}`));
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, [clusterId, rpo]);

  useEffect(() => { load(false); }, [load]);

  const label: Record<BStatus, string> = {
    ok: L('符合', 'Within RPO'),
    stale: L('逾時', 'Stale'),
    failed: L('最近一次失敗', 'Last run failed'),
    no_record: L('查無成功記錄', 'No success on record'),
    unprotected: L('無排程涵蓋', 'Not scheduled'),
    unknown: L('無法判斷', 'Unknown'),
  };
  const hint: Record<BStatus, string> = {
    ok: L('最近一次成功備份在 RPO 內', 'Last successful backup is within the RPO'),
    stale: L('最近一次成功備份早於 RPO', 'Last successful backup is older than the RPO'),
    failed: L('最近一次備份嘗試失敗', 'The most recent backup attempt failed'),
    no_record: L('有排程涵蓋，但讀到的作業記錄裡沒有成功備份', 'A job covers it, but the task history read holds no successful backup'),
    unprotected: L('沒有啟用中的排程涵蓋此虛擬機，也沒看到備份', 'No enabled job covers this guest and no backup was seen'),
    unknown: L('有節點讀不到，它的備份可能記錄在那裡', 'A node could not be read; its backups may be recorded there'),
  };

  const rows = useMemo(() => {
    const list = (data?.guests || []).filter((g) => filter === 'all' || g.status === filter);
    const rank = (s: BStatus) => STATUS_ORDER.indexOf(s);
    const val = (g: GuestRow): number | string => {
      switch (sort.key) {
        case 'vmid': return g.vmid;
        case 'name': return g.name.toLowerCase();
        case 'node': return g.node;
        case 'age': return g.age_s ?? Number.MAX_SAFE_INTEGER;
        default: return rank(g.status) * 1e9 + (g.age_s ? -g.age_s / 1e3 : 0);
      }
    };
    return [...list].sort((a, b) => {
      const x = val(a), y = val(b);
      return (x < y ? -1 : x > y ? 1 : a.vmid - b.vmid) * sort.dir;
    });
  }, [data, filter, sort.key, sort.dir]);

  const unreadable = Object.entries(data?.unreadable_nodes || {});

  return (
    <div className="pp-wrap">
      <div className="pp-bar">
        <label className="pp-f">
          <span>RPO</span>
          <CyberSelect
            value={rpo}
            options={[
              { value: '12', label: L('12 小時', '12 hours') },
              { value: '24', label: L('24 小時', '24 hours') },
              { value: '48', label: L('48 小時', '48 hours') },
              { value: '168', label: L('7 天', '7 days') },
            ]}
            onChange={(v) => setRpo(v)}
          />
        </label>
        <div className="pp-chips">
          <button className={`pp-chip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>
            {L('全部', 'All')} <b>{data?.guests.length ?? 0}</b>
          </button>
          {STATUS_ORDER.map((s) => (data?.summary?.[s] ? (
            <button key={s} className={`pp-chip st-${s} ${filter === s ? 'on' : ''}`}
                    title={hint[s]} onClick={() => setFilter(filter === s ? 'all' : s)}>
              <i className="pp-dot" />{label[s]} <b>{data.summary[s]}</b>
            </button>
          ) : null))}
        </div>
        <button className="pp-btn" onClick={() => load(true)} disabled={loading}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          <span>{loading ? L('讀取中…', 'Reading…') : L('重新整理', 'Refresh')}</span>
        </button>
      </div>

      <div className="pp-note">
        {L('依據 vzdump 備份作業記錄判斷 (不讀備份檔：PVE 會對沒有 VM.Backup 權限的 token 隱藏備份檔)。',
           'Judged from vzdump backup task history, not from the backup files (PVE hides those from tokens without VM.Backup).')}
        {data?.history_since ? (
          <> {L(`已讀取 ${data.tasks_read} 筆作業，最早 ${fmtTime(data.history_since)}；更早的備份不在此範圍內。`,
                `${data.tasks_read} tasks read, back to ${fmtTime(data.history_since)}; older backups fall outside this window.`)}</>
        ) : null}
      </div>
      {error && <div className="pp-error">{error}</div>}
      {unreadable.length > 0 && (
        <div className="pp-warn">
          {L('以下節點讀不到作業記錄，相關虛擬機標示為「無法判斷」：', 'Task history unreadable on these nodes; affected guests are marked Unknown: ')}
          {unreadable.map(([n, why]) => <span key={n} className="pp-mono" title={why}> {n}</span>)}
        </div>
      )}
      {data?.jobs_error && (
        <div className="pp-warn">{L('讀不到備份排程，排程涵蓋欄位可能不完整：', 'Backup jobs unreadable; the coverage column may be incomplete: ')}{data.jobs_error}</div>
      )}

      <div className="pp-table panel-card" key={`${clusterId}|${filter}|${rpo}`}>
        <div className="pp-scan" />
        <table className="vm-table">
          <thead>
            <tr>
              <th onClick={() => sort.click('status')}>{L('狀態', 'Status')}{sort.mark('status')}</th>
              <th onClick={() => sort.click('vmid')}>VMID{sort.mark('vmid')}</th>
              <th onClick={() => sort.click('name')}>{L('名稱', 'Name')}{sort.mark('name')}</th>
              <th onClick={() => sort.click('node')}>{L('節點', 'Node')}{sort.mark('node')}</th>
              <th onClick={() => sort.click('age')}>{L('最近成功備份', 'Last success')}{sort.mark('age')}</th>
              <th>{L('排程', 'Jobs')}</th>
              <th>{L('最近錯誤', 'Last error')}</th>
            </tr>
          </thead>
          <tbody>
            {loading && !data && (
              <tr><td colSpan={7} className="pp-empty">{L('正在讀取各節點的備份作業記錄…', 'Reading backup task history from every node…')}</td></tr>
            )}
            {data && rows.length === 0 && (
              <tr><td colSpan={7} className="pp-empty">{L('沒有符合的虛擬機', 'No matching guests')}</td></tr>
            )}
            {rows.map((g) => (
              <tr key={g.vmid}>
                <td><span className={`pp-pill st-${g.status}`} title={hint[g.status]}><i className="pp-dot" />{label[g.status]}</span></td>
                <td className="pp-mono">{g.vmid}<span className="pp-kind">{g.type === 'lxc' ? 'CT' : 'VM'}</span></td>
                <td className="pp-trunc" title={g.name}>{g.name || '—'}</td>
                <td className="pp-mono">{g.node}</td>
                <td className="pp-mono">
                  {g.last_ok ? <>{fmtTime(g.last_ok)} <span className="pp-age">({fmtAge(g.age_s, zh)})</span></> : '—'}
                </td>
                <td className="pp-mono pp-trunc" title={g.jobs.join('\n')}>
                  {g.jobs.length ? g.jobs.length : <span className="pp-muted">—</span>}
                </td>
                <td className="pp-mono pp-trunc pp-err" title={g.last_error || ''}>{g.last_error || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PanelStyles />
    </div>
  );
}

// ─────────────────────────────────────────────────────────── snapshots

export function SnapshotsPanel({ clusterId }: { clusterId: string }) {
  const { language } = useTranslation();
  const zh = language === 'zh-TW';
  const L = (z: string, e: string) => (zh ? z : e);
  const [oldDays, setOldDays] = useState('30');
  const [onlyOld, setOnlyOld] = useState(false);
  const [data, setData] = useState<SnapsResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sort = useSort<'age' | 'vmid' | 'guest' | 'node' | 'name'>('age', -1);

  const load = useCallback(async (force = false) => {
    if (!clusterId) return;
    setLoading(true); setError(null);
    try {
      setData(await getJSON<SnapsResp>(
        `/api/clusters/${encodeURIComponent(clusterId)}/protection/snapshots`
        + `?old_days=${oldDays}${force ? '&force=1' : ''}`));
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, [clusterId, oldDays]);

  useEffect(() => { load(false); }, [load]);

  const rows = useMemo(() => {
    const list = (data?.snapshots || []).filter((s) => !onlyOld || s.old);
    const val = (s: SnapRow): number | string => {
      switch (sort.key) {
        case 'vmid': return s.vmid;
        case 'guest': return s.guest.toLowerCase();
        case 'node': return s.node;
        case 'name': return s.name.toLowerCase();
        default: return s.age_s ?? -1;
      }
    };
    return [...list].sort((a, b) => {
      const x = val(a), y = val(b);
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }, [data, onlyOld, sort.key, sort.dir]);

  const guestsWith = useMemo(() => new Set((data?.snapshots || []).map((s) => s.vmid)).size, [data]);
  const errs = Object.entries(data?.guest_errors || {});

  return (
    <div className="pp-wrap">
      <div className="pp-bar">
        <label className="pp-f">
          <span>{L('視為過舊', 'Old after')}</span>
          <CyberSelect
            value={oldDays}
            options={[
              { value: '7', label: L('7 天', '7 days') },
              { value: '14', label: L('14 天', '14 days') },
              { value: '30', label: L('30 天', '30 days') },
              { value: '90', label: L('90 天', '90 days') },
            ]}
            onChange={(v) => setOldDays(v)}
          />
        </label>
        <div className="pp-chips">
          <button className={`pp-chip ${!onlyOld ? 'on' : ''}`} onClick={() => setOnlyOld(false)}>
            {L('全部快照', 'All snapshots')} <b>{data?.snapshots.length ?? 0}</b>
          </button>
          <button className={`pp-chip st-stale ${onlyOld ? 'on' : ''}`} onClick={() => setOnlyOld(!onlyOld)}>
            <i className="pp-dot" />{L('過舊', 'Old')} <b>{data?.old_count ?? 0}</b>
          </button>
          <span className="pp-stat">{L(`${guestsWith} 台虛擬機有快照`, `${guestsWith} guests have snapshots`)}</span>
        </div>
        <button className="pp-btn" onClick={() => load(true)} disabled={loading}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          <span>{loading ? L('讀取中…', 'Reading…') : L('重新整理', 'Refresh')}</span>
        </button>
      </div>
      <div className="pp-note">
        {L('快照會讓底層儲存保留舊資料區塊，留越久占用越多，也會拖慢 qcow2 / ZFS / Ceph 上的寫入。',
           'A snapshot keeps old blocks alive on the underlying storage: the longer it stays, the more space it pins, and on qcow2 / ZFS / Ceph it slows writes.')}
      </div>
      {error && <div className="pp-error">{error}</div>}
      {errs.length > 0 && (
        <div className="pp-warn">
          {L(`${errs.length} 台虛擬機的快照清單讀不到，未列入：`, `Snapshot list unreadable for ${errs.length} guests, not included: `)}
          {errs.slice(0, 12).map(([v, why]) => <span key={v} className="pp-mono" title={why}> {v}</span>)}
          {errs.length > 12 ? ' …' : ''}
        </div>
      )}
      <div className="pp-table panel-card" key={`${clusterId}|${onlyOld}|${oldDays}`}>
        <div className="pp-scan" />
        <table className="vm-table">
          <thead>
            <tr>
              <th onClick={() => sort.click('vmid')}>VMID{sort.mark('vmid')}</th>
              <th onClick={() => sort.click('guest')}>{L('虛擬機', 'Guest')}{sort.mark('guest')}</th>
              <th onClick={() => sort.click('node')}>{L('節點', 'Node')}{sort.mark('node')}</th>
              <th onClick={() => sort.click('name')}>{L('快照', 'Snapshot')}{sort.mark('name')}</th>
              <th onClick={() => sort.click('age')}>{L('建立時間', 'Taken')}{sort.mark('age')}</th>
              <th>{L('含記憶體', 'RAM')}</th>
              <th>{L('說明', 'Description')}</th>
            </tr>
          </thead>
          <tbody>
            {loading && !data && (
              <tr><td colSpan={7} className="pp-empty">{L('正在讀取每台虛擬機的快照…', 'Reading snapshots of every guest…')}</td></tr>
            )}
            {data && rows.length === 0 && (
              <tr><td colSpan={7} className="pp-empty">{onlyOld ? L('沒有過舊的快照', 'No old snapshots') : L('沒有快照', 'No snapshots')}</td></tr>
            )}
            {rows.map((s) => (
              <tr key={`${s.vmid}/${s.name}`} className={s.old ? 'pp-old' : ''}>
                <td className="pp-mono">{s.vmid}<span className="pp-kind">{s.type === 'lxc' ? 'CT' : 'VM'}</span></td>
                <td className="pp-trunc" title={s.guest}>{s.guest || '—'}</td>
                <td className="pp-mono">{s.node}</td>
                <td className="pp-mono pp-trunc" title={s.parent ? `parent: ${s.parent}` : ''}>{s.name}</td>
                <td className="pp-mono">
                  {fmtTime(s.snaptime)} <span className={`pp-age ${s.old ? 'pp-age-old' : ''}`}>({fmtAge(s.age_s, zh)})</span>
                </td>
                <td className="pp-mono">{s.vmstate ? L('是', 'yes') : ''}</td>
                <td className="pp-trunc pp-muted" title={s.description}>{s.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PanelStyles />
    </div>
  );
}

function PanelStyles() {
  return (
    <style>{`
      .pp-wrap { display: flex; flex-direction: column; gap: 12px; flex: 1; min-height: 0; }
      .pp-bar { display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap; padding: 12px 14px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; }
      .pp-f { display: flex; flex-direction: column; gap: 4px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); min-width: 130px; }
      .pp-chips { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; flex: 1; }
      .pp-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 11px; border-radius: 999px; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.18); cursor: pointer; transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease, color .15s ease; }
      .pp-chip b { color: var(--text-primary); font-weight: 600; }
      .pp-chip:hover { transform: translateY(-1px); border-color: currentColor; box-shadow: 0 4px 14px -6px currentColor; }
      .pp-chip.on { border-color: currentColor; background: rgba(0, 240, 255, 0.1); color: var(--primary); box-shadow: 0 0 10px -2px currentColor; }
      .pp-stat { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
      .pp-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 6px currentColor; display: inline-block; }
      .st-ok { color: var(--success); }
      .st-stale, .st-no_record { color: var(--warning, #ffb020); }
      .st-failed, .st-unprotected { color: var(--danger, #ff4d6d); }
      .st-unknown { color: var(--text-muted); }
      .st-failed .pp-dot, .st-unprotected .pp-dot { animation: pp-breathe 1.8s ease-in-out infinite; }
      @keyframes pp-breathe { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
      .pp-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: transform .15s ease, box-shadow .15s ease, background .15s ease; }
      .pp-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); transform: translateY(-1px); box-shadow: 0 4px 14px -6px rgba(0, 240, 255, .6); }
      .pp-btn:disabled { opacity: .5; cursor: not-allowed; }
      .pp-note { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); line-height: 1.6; }
      .pp-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 12px; border-radius: 2px; }
      .pp-warn { padding: 8px 14px; border: 1px solid var(--warning, #ffb020); border-left-width: 3px; background: rgba(255, 176, 32, 0.07); color: var(--warning, #ffb020); font-family: var(--font-mono); font-size: 12px; border-radius: 2px; }
      .pp-table { flex: 1; min-height: 0; overflow: auto; position: relative; animation: pp-in .24s ease-out; }
      @keyframes pp-in { 0% { opacity: 0; transform: translateY(6px); filter: blur(2px); } 60% { filter: blur(0); } 100% { opacity: 1; transform: none; filter: none; } }
      .pp-table .vm-table { table-layout: auto; width: 100%; }
      .pp-table th { cursor: pointer; user-select: none; white-space: nowrap; }
      .pp-table td { white-space: nowrap; }
      .pp-scan { position: absolute; left: 0; right: 0; height: 4px; top: -8px; opacity: 0; pointer-events: none; z-index: 5;
        background: linear-gradient(90deg, transparent 0%, rgba(0,240,255,.4) 20%, rgba(0,240,255,.95) 50%, rgba(0,240,255,.4) 80%, transparent 100%);
        box-shadow: 0 0 12px 2px rgba(0,240,255,.6), 0 0 24px rgba(0,240,255,.35);
        animation: pp-scan .55s cubic-bezier(0.55, 0, 0.4, 1) forwards; }
      .pp-scan::after { content: ''; position: absolute; left: 0; right: 0; top: 4px; height: 36px; background: linear-gradient(to bottom, rgba(0,240,255,.22) 0%, rgba(0,240,255,.04) 60%, transparent 100%); }
      @keyframes pp-scan { 0% { opacity: 0; top: -8px; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { opacity: 0; top: calc(100% + 8px); } }
      .pp-pill { display: inline-flex; align-items: center; gap: 6px; padding: 2px 10px; border-radius: 999px; font-size: 11.5px; font-family: var(--font-mono); border: 1px solid currentColor; }
      .pp-mono { font-family: var(--font-mono); }
      .pp-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; }
      .pp-err { color: var(--danger, #ff4d6d); max-width: 360px; }
      .pp-kind { margin-left: 6px; font-size: 10px; letter-spacing: .08em; color: var(--text-muted); }
      .pp-age { color: var(--text-muted); }
      .pp-age-old { color: var(--warning, #ffb020); }
      .pp-muted { color: var(--text-muted); }
      .pp-empty { text-align: center; padding: 32px 12px; color: var(--text-muted); font-style: italic; }
      tr.pp-old td:first-child { box-shadow: inset 3px 0 0 var(--warning, #ffb020); }
    `}</style>
  );
}
