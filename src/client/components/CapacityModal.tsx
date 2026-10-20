/**
 * Capacity forecast + idle guests for one cluster (server/capacity.py).
 * Read-only. A projected date is only shown for a storage whose growth fits a
 * straight line well (r² ≥ 0.5); everything else says how it is trending
 * instead of inventing a date.
 */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { formatBytesIEC } from '../utils/format';

export interface CapStorage {
  storage: string; node: string; shared: boolean; type?: string;
  trend: 'growing' | 'flat' | 'shrinking' | 'irregular' | 'insufficient_data';
  used_pct?: number; used?: number; total?: number; growth_per_day?: number;
  r2?: number; days_to_80?: number; days_to_full?: number; span_days?: number;
}
export interface CapIdle {
  vmid: number; name: string; node: string; type: string; days: number;
  cpu_avg_pct: number; cpu_p95_pct: number; net_avg_bps: number;
}
export interface CapacityResp {
  storages: CapStorage[]; idle: CapIdle[]; guests_checked: number;
  errors: Array<{ what: string; error: string }>; generated_at: number;
}

export function CapacityModal({ clusterId, clusterName, onClose }: {
  clusterId: string; clusterName: string; onClose: () => void;
}) {
  const { language } = useTranslation();
  const zh = language === 'zh-TW';
  const L = (z: string, e: string) => (zh ? z : e);
  const [data, setData] = useState<CapacityResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (force = false) => {
    setLoading(true); setError(null);
    try {
      const r = await fetch(`/api/clusters/${encodeURIComponent(clusterId)}/capacity${force ? '?force=1' : ''}`,
        { credentials: 'same-origin' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setData(d);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, [clusterId]);
  useEffect(() => { load(false); }, [load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const trendLabel: Record<CapStorage['trend'], string> = {
    growing: L('成長中', 'Growing'),
    flat: L('持平', 'Flat'),
    shrinking: L('減少中', 'Shrinking'),
    irregular: L('變化不規則', 'Irregular'),
    insufficient_data: L('資料不足', 'Not enough data'),
  };
  const days = (d?: number) => (d == null ? '—' : d <= 0 ? L('已達到', 'reached') : zh ? `${Math.round(d)} 天` : `${Math.round(d)} d`);

  return (
    <div className="cap-overlay" onClick={onClose}>
      <div className="cap-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cap-head">
          <span className="cap-title">{L('容量預測', 'Capacity forecast')} · {clusterName}</span>
          <button className="cap-btn" onClick={() => load(true)} disabled={loading}>
            {loading ? L('讀取中…', 'Reading…') : L('重新整理', 'Refresh')}
          </button>
          <button className="cap-x" onClick={onClose} aria-label="close">×</button>
        </div>
        <div className="cap-body">
          <div className="cap-scan" />
          <p className="cap-note">
            {L('依 PVE 自己的 RRD：儲存看過去 30 天的成長趨勢，虛擬機看過去一週的負載。只有成長趨勢穩定 (r² ≥ 0.5) 的儲存才會推算日期。',
               'From PVE\'s own RRDs: 30 days of storage growth, one week of guest load. A date is only projected for a storage whose growth is steady (r² ≥ 0.5).')}
          </p>
          {error && <div className="cap-error">{error}</div>}
          {!data && loading && <div className="cap-empty">{L('正在讀取 RRD…', 'Reading RRD data…')}</div>}
          {data && (
            <>
              <h4 className="cap-h">{L('儲存', 'Storage')}</h4>
              <table className="vm-table cap-table">
                <thead>
                  <tr>
                    <th>{L('儲存', 'Storage')}</th><th>{L('節點', 'Node')}</th><th>{L('已用', 'Used')}</th>
                    <th>{L('趨勢', 'Trend')}</th><th>{L('每日變化', 'Per day')}</th>
                    <th>{L('到 80%', 'To 80%')}</th><th>{L('到滿', 'To full')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.storages.map((s) => (
                    <tr key={`${s.storage}|${s.shared ? '*' : s.node}`}>
                      <td className="cap-mono">{s.storage}</td>
                      <td className="cap-mono">{s.shared ? L('共用', 'shared') : s.node}</td>
                      <td className="cap-mono">
                        <span className="cap-bar"><span style={{ width: `${Math.min(100, s.used_pct || 0)}%` }}
                          className={(s.used_pct || 0) >= 90 ? 'hot' : (s.used_pct || 0) >= 80 ? 'warm' : ''} /></span>
                        {s.used_pct != null ? `${s.used_pct}%` : '—'}
                      </td>
                      <td><span className={`cap-trend t-${s.trend}`}>{trendLabel[s.trend]}</span>
                        {s.r2 != null && <span className="cap-r2">r² {s.r2}</span>}</td>
                      <td className="cap-mono">{s.growth_per_day != null
                        ? `${s.growth_per_day >= 0 ? '+' : '−'}${formatBytesIEC(Math.abs(s.growth_per_day))}` : '—'}</td>
                      <td className="cap-mono">{days(s.days_to_80)}</td>
                      <td className="cap-mono">{days(s.days_to_full)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4 className="cap-h">
                {L('閒置的虛擬機', 'Idle guests')}
                <span className="cap-sub">{L(`一週內 CPU 平均 < 2%、p95 < 5%、網路 < 2 KB/s；共檢查 ${data.guests_checked} 台運作中的虛擬機`,
                  `a week under 2 % CPU on average and 5 % at p95, network under 2 KB/s; ${data.guests_checked} running guests checked`)}</span>
              </h4>
              {data.idle.length === 0 ? (
                <div className="cap-empty">{L('沒有閒置的虛擬機', 'No idle guests')}</div>
              ) : (
                <table className="vm-table cap-table">
                  <thead>
                    <tr><th>VMID</th><th>{L('名稱', 'Name')}</th><th>{L('節點', 'Node')}</th>
                      <th>CPU {L('平均', 'avg')}</th><th>CPU p95</th><th>{L('網路', 'Network')}</th><th>{L('資料天數', 'Days')}</th></tr>
                  </thead>
                  <tbody>
                    {data.idle.map((g) => (
                      <tr key={g.vmid}>
                        <td className="cap-mono">{g.vmid}<span className="cap-kind">{g.type === 'lxc' ? 'CT' : 'VM'}</span></td>
                        <td>{g.name}</td><td className="cap-mono">{g.node}</td>
                        <td className="cap-mono">{g.cpu_avg_pct}%</td><td className="cap-mono">{g.cpu_p95_pct}%</td>
                        <td className="cap-mono">{formatBytesIEC(g.net_avg_bps)}/s</td>
                        <td className="cap-mono">{g.days}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {data.errors.length > 0 && (
                <div className="cap-error">
                  {L(`${data.errors.length} 項讀不到，未列入：`, `${data.errors.length} item(s) could not be read and are not included: `)}
                  {data.errors.slice(0, 8).map((e) => e.what).join(', ')}{data.errors.length > 8 ? ' …' : ''}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style>{`
        .cap-overlay { position: fixed; inset: 0; z-index: 4000; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(0,0,0,.65); backdrop-filter: blur(4px); }
        .cap-modal { width: 100%; max-width: 1040px; max-height: calc(100vh - 48px); display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 8px; box-shadow: 0 24px 80px rgba(0,0,0,.6), 0 0 60px -20px rgba(0,240,255,.4); animation: cap-in .18s ease-out; }
        @keyframes cap-in { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }
        .cap-head { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: var(--bg-tertiary); border-bottom: 1px solid var(--border); border-radius: 8px 8px 0 0; }
        .cap-title { margin-right: auto; font-family: var(--font-display); font-size: 13px; letter-spacing: .06em; text-transform: uppercase; color: var(--primary); }
        .cap-btn { padding: 5px 12px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); border-radius: 4px; color: var(--primary); font-family: var(--font-display); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; transition: background .15s ease, transform .15s ease; }
        .cap-btn:hover:not(:disabled) { background: rgba(0,240,255,.16); transform: translateY(-1px); }
        .cap-btn:disabled { opacity: .5; cursor: not-allowed; }
        .cap-x { width: 26px; height: 26px; background: transparent; border: 1px solid transparent; border-radius: 4px; color: var(--text-secondary); font-size: 18px; cursor: pointer; }
        .cap-x:hover { color: var(--primary); border-color: var(--primary); }
        .cap-body { position: relative; padding: 14px 16px 18px; overflow: auto; }
        .cap-scan { position: absolute; left: 0; right: 0; top: -8px; height: 4px; opacity: 0; pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,.95), transparent); box-shadow: 0 0 12px 2px rgba(0,240,255,.6);
          animation: cap-scan .55s cubic-bezier(0.55, 0, 0.4, 1) forwards; }
        @keyframes cap-scan { 0% { opacity: 0; top: -8px; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { opacity: 0; top: calc(100% + 8px); } }
        .cap-note { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); line-height: 1.6; margin: 0 0 10px; }
        .cap-h { margin: 16px 0 8px; font-family: var(--font-display); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-secondary); display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; }
        .cap-sub { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0; text-transform: none; color: var(--text-muted); }
        .cap-table td { white-space: nowrap; }
        .cap-mono { font-family: var(--font-mono); }
        .cap-kind { margin-left: 6px; font-size: 10px; color: var(--text-muted); }
        .cap-bar { display: inline-block; width: 60px; height: 5px; margin-right: 8px; vertical-align: middle; background: rgba(0,240,255,.08); border-radius: 3px; overflow: hidden; }
        .cap-bar span { display: block; height: 100%; background: var(--primary); }
        .cap-bar span.warm { background: var(--warning, #ffb020); }
        .cap-bar span.hot { background: var(--danger, #ff4d6d); }
        .cap-trend { padding: 1px 8px; border-radius: 999px; font-family: var(--font-mono); font-size: 11.5px; border: 1px solid currentColor; }
        .t-growing { color: var(--warning, #ffb020); }
        .t-flat, .t-shrinking { color: var(--success); }
        .t-irregular, .t-insufficient_data { color: var(--text-muted); }
        .cap-r2 { margin-left: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
        .cap-empty { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); padding: 8px 0; }
        .cap-error { margin-top: 12px; padding: 8px 12px; border-left: 3px solid var(--warning, #ffb020); background: rgba(255,176,32,.07); color: var(--warning, #ffb020); font-family: var(--font-mono); font-size: 12px; }
      `}</style>
    </div>
  );
}
