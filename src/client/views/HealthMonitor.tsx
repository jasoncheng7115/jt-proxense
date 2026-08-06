/**
 * HealthMonitor — at-a-glance health dashboard, aggregating signals
 * already in the WS-broadcast cluster data:
 *
 *   - Critical (red):    offline nodes, storage ≥95%, ceph HEALTH_ERR
 *   - Warning  (orange): ceph HEALTH_WARN, storage 85-95%, sustained
 *                        CPU/memory >90%, recent PVE task errors
 *   - Info     (cyan):   pending updates count (Telegraf), VM/CT totals
 *
 * Each card is clickable → jumps to the relevant existing view (nodes,
 * storage, tasks, ceph) so the operator can drill down with one click.
 *
 * Distinct from /tasks (which is a *log* of past actions) and the
 * cluster-core view (which dumps every metric): this page exists to
 * answer the operator's first-of-day question — "is anything on fire?"
 */
import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from '../i18n';
import { HAStatusModal } from '../components/HAStatusModal';
import { ReplicationModal } from '../components/ReplicationModal';
import type { ClusterData } from '../types';

interface Props {
  clusters: Record<string, ClusterData>;
  onNavigate: (view: string, opts?: { cluster?: string }) => void;
}

type Sev = 'critical' | 'warning' | 'info' | 'ok';

interface Finding {
  sev: Sev;
  cluster: string;
  category: string;        // i18n key
  msg: string;             // human-readable detail (already localised)
  target: string;          // e.g. "node:host-107"
  navView?: string;        // view to jump to on click
  navParams?: Record<string, string>;
}

const SEV_RANK: Record<Sev, number> = { critical: 0, warning: 1, info: 2, ok: 3 };

// Corosync status card — quorum + ring performance for one cluster.
function CorosyncCard({ name, data, isZh }: { name: string; data: any; isZh: boolean }) {
  const quorate = data.quorate;
  const votes = data.votes || {};
  const nodes: any[] = data.nodes || [];
  const fmtLat = (us: any) => (typeof us === 'number' ? `${(us / 1000).toFixed(us < 1000 ? 2 : 1)} ms` : '—');
  const linkClass = (s: any) => {
    const v = (s || '').toLowerCase();
    if (v === 'connected' || v === 'localhost') return 'ok';
    if (!v) return 'na';
    return 'down';
  };
  return (
    <div className="panel-card coro-card">
      <div className="coro-head">
        <span className="coro-dot" />
        <span className="coro-title">COROSYNC · {name}</span>
        <span className={`coro-quorum ${quorate === false ? 'bad' : quorate ? 'ok' : 'na'}`}>
          {quorate === false ? (isZh ? '失去仲裁' : 'NO QUORUM')
            : quorate ? (isZh ? '仲裁正常' : 'QUORATE')
            : (isZh ? '未知' : 'UNKNOWN')}
        </span>
      </div>
      <div className="coro-meta">
        <span>{isZh ? '票數' : 'Votes'}: <b>{votes.total ?? '—'}</b>/{votes.expected ?? '—'}</span>
        <span>{isZh ? '仲裁門檻' : 'Quorum'}: <b>{votes.quorum ?? '—'}</b></span>
        <span>{isZh ? '傳輸' : 'Transport'}: <b>{data.transport || '—'}</b></span>
        <span>Ring ID: <b>{data.ring_id || '—'}</b></span>
      </div>
      <table className="coro-table">
        <thead>
          <tr>
            <th>{isZh ? '節點' : 'Node'}</th>
            <th>ID</th>
            <th>{isZh ? '狀態' : 'State'}</th>
            <th>{isZh ? '連結 · 延遲' : 'Links · latency'}</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((n) => (
            <tr key={n.nodeid ?? n.name}>
              <td className="coro-node">{n.name || '—'}{n.local ? <span className="coro-local"> ◆</span> : null}</td>
              <td className="coro-mono">{n.nodeid ?? '—'}</td>
              <td>
                <span className={`coro-online ${n.online === false ? 'off' : 'on'}`}>
                  {n.online === false ? (isZh ? '離線' : 'OFFLINE') : (isZh ? '在線' : 'ONLINE')}
                </span>
              </td>
              <td>
                {(n.links || []).length === 0
                  ? <span className="coro-na">—</span>
                  : (n.links || []).map((lk: any) => (
                    <span key={lk.linkid} className={`coro-link ${linkClass(lk.status)}`}
                          title={`link ${lk.linkid}: ${lk.status || 'n/a'}`}>
                      L{lk.linkid}
                      {lk.status === 'localhost' ? '' : ` · ${fmtLat(lk.latency_ave_us)}`}
                    </span>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.ssh_ok && (
        <div className="coro-sshnote">
          {isZh
            ? '連結狀態與環延遲需要本機到各 PVE 節點的 SSH 金鑰（設定 → 伺服器 → SSH 設定）。目前僅顯示 API 仲裁與成員資訊。'
            : 'Link status & ring latency need SSH from this host to each PVE node (Settings → Server → SSH setup). Showing API quorum/membership only.'}
        </div>
      )}
    </div>
  );
}

export function HealthMonitor({ clusters, onNavigate }: Props) {
  const { t, language } = useTranslation();
  const [taskFailures, setTaskFailures] = useState<Record<string, number>>({});
  const [certIssues, setCertIssues] = useState<Array<{cluster: string; clusterId: string; node: string; days: number; subject: string}>>([]);
  const [pendingUpdates, setPendingUpdates] = useState<Array<{cluster: string; clusterId: string; node: string; count: number}>>([]);
  const [haIssues, setHaIssues] = useState<Array<{cluster: string; clusterId: string; sid: string; state: string; node: string}>>([]);
  const [replIssues, setReplIssues] = useState<Array<{cluster: string; clusterId: string; sid: string; error: string}>>([]);
  const [logFindings, setLogFindings] = useState<Array<{cluster: string; clusterId: string; node: string; category: string; severity: 'critical' | 'warning'; count: number; sample: string}>>([]);
  const [corosync, setCorosync] = useState<Record<string, any>>({});
  const [haDrillCluster, setHaDrillCluster] = useState<string | null>(null);
  const [replDrillCluster, setReplDrillCluster] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState(0);

  const fetchOnDemand = useCallback(async () => {
    const failures: Record<string, number> = {};
    const certs: typeof certIssues = [];
    const updates: typeof pendingUpdates = [];
    const haAll: typeof haIssues = [];
    const replAll: typeof replIssues = [];
    const logAll: typeof logFindings = [];
    const coro: Record<string, any> = {};

    // Build the (cluster, node) work list. Capping each cluster at one
    // node would miss host-specific cert / update issues; just iterate
    // every node in parallel. The per-(cluster,node,kind) cache on the
    // server makes this cheap on revisit.
    const work: Array<Promise<void>> = [];
    for (const [cid, cluster] of Object.entries(clusters)) {
      const cname = cluster.name || cid;

      // 24h failures, one call per cluster.
      work.push((async () => {
        try {
          const r = await fetch(
            `/api/clusters/${encodeURIComponent(cid)}/tasks?status=error&limit=200`,
            { credentials: 'same-origin' }
          );
          if (r.ok) {
            const data = await r.json();
            const cutoff = Math.floor(Date.now() / 1000) - 86400;
            failures[cid] = (data.tasks || [])
              .filter((tt: any) => (tt.starttime || 0) > cutoff).length;
          }
        } catch {/* ignore */}
      })());

      // Log-derived hardware/kernel events (ECC, MCE, OOM, disk I/O,
      // fs corruption...) scanned server-side from each node's syslog
      // tail; cached 5 min on the server.
      work.push((async () => {
        try {
          const r = await fetch(
            `/api/clusters/${encodeURIComponent(cid)}/log-health`,
            { credentials: 'same-origin' }
          );
          if (r.ok) {
            const data = await r.json();
            for (const f of (data.findings || []) as any[]) {
              logAll.push({
                cluster: cname, clusterId: cid,
                node: f.node || '', category: f.category || 'kernel',
                severity: f.severity === 'critical' ? 'critical' : 'warning',
                count: Number(f.count) || 1,
                sample: String(f.sample || ''),
              });
            }
          }
        } catch {/* ignore */}
      })());

      // Corosync cluster health + ring performance (quorum, link status,
      // ring latency). Cached server-side; SSH metrics best-effort.
      work.push((async () => {
        try {
          const r = await fetch(
            `/api/clusters/${encodeURIComponent(cid)}/corosync`,
            { credentials: 'same-origin' }
          );
          if (r.ok) {
            const data = await r.json();
            if (data && data.ok) coro[cid] = data;
          }
        } catch {/* ignore */}
      })());

      // HA: surface any non-started / error-state HA-managed resource.
      work.push((async () => {
        try {
          const r = await fetch(
            `/api/clusters/${encodeURIComponent(cid)}/ha/status`,
            { credentials: 'same-origin' }
          );
          if (r.ok) {
            const data = await r.json();
            for (const res of (data.resources || []) as any[]) {
              const state = (res.state || res['request-state'] || '').toLowerCase();
              if (state && state !== 'started' && state !== 'stopped') {
                haAll.push({
                  cluster: cname, clusterId: cid,
                  sid: res.sid || '', state,
                  node: res.node || res.crm_state || '',
                });
              }
            }
          }
        } catch {/* ignore */}
      })());

      // Replication errors: any job with a recent fail_count or non-empty error.
      work.push((async () => {
        try {
          const r = await fetch(
            `/api/clusters/${encodeURIComponent(cid)}/replication-jobs`,
            { credentials: 'same-origin' }
          );
          if (r.ok) {
            const data = await r.json();
            for (const j of (data.jobs || []) as any[]) {
              if (j.error || (j.fail_count && Number(j.fail_count) > 0)) {
                replAll.push({
                  cluster: cname, clusterId: cid,
                  sid: j.id || j.guest || '',
                  error: j.error || `fail_count=${j.fail_count}`,
                });
              }
            }
          }
        } catch {/* ignore */}
      })());

      // Certs + updates, one call per node per kind. Surface only the
      // soonest cert per node (the most operational one) to avoid 10
      // identical "subscription cert" cards.
      for (const nname of Object.keys(cluster.nodes || {})) {
        work.push((async () => {
          try {
            const r = await fetch(
              `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(nname)}/certificates`,
              { credentials: 'same-origin' }
            );
            if (r.ok) {
              const data = await r.json();
              const list = (data.certificates || []) as any[];
              let soonest: any = null;
              for (const c of list) {
                const exp = c.notafter || c['notafter-formatted'];
                if (!exp) continue;
                const ts = typeof exp === 'number' ? exp : Date.parse(String(exp)) / 1000;
                if (!ts || isNaN(ts)) continue;
                if (!soonest || ts < soonest.ts) soonest = { ts, subj: c.subject || c.filename || 'cert' };
              }
              if (soonest) {
                const days = Math.floor((soonest.ts - Date.now() / 1000) / 86400);
                if (days < 90) {
                  certs.push({ cluster: cname, clusterId: cid, node: nname, days, subject: soonest.subj });
                }
              }
            }
          } catch {/* ignore */}
        })());

        work.push((async () => {
          try {
            const r = await fetch(
              `/api/clusters/${encodeURIComponent(cid)}/nodes/${encodeURIComponent(nname)}/updates`,
              { credentials: 'same-origin' }
            );
            if (r.ok) {
              const data = await r.json();
              if ((data.count ?? 0) > 0) {
                updates.push({ cluster: cname, clusterId: cid, node: nname, count: data.count });
              }
            }
          } catch {/* ignore */}
        })());
      }
    }
    await Promise.all(work);
    setTaskFailures(failures);
    setCertIssues(certs);
    setPendingUpdates(updates);
    setHaIssues(haAll);
    setReplIssues(replAll);
    setLogFindings(logAll);
    setCorosync(coro);
    setLastFetch(Date.now());
  }, [clusters]);

  useEffect(() => { fetchOnDemand(); }, [fetchOnDemand]);
  useEffect(() => {
    // Slower refresh than the WS-derived data — these endpoints hit pveproxy
    // every cycle (cached 60 s server-side, so this matches that anyway).
    const t = setInterval(fetchOnDemand, 60000);
    return () => clearInterval(t);
  }, [fetchOnDemand]);

  // Run all checks across all clusters every render — cheap, the data is
  // already in memory; feels more honest than memo-ing and risking stale
  // cards after a WS update.
  const findings: Finding[] = useMemo(() => {
    const out: Finding[] = [];
    for (const [cid, cluster] of Object.entries(clusters)) {
      const cname = cluster.name || cid;

      // Nodes
      for (const [nname, node] of Object.entries(cluster.nodes || {})) {
        const n: any = node;
        if (n.status && n.status !== 'online') {
          out.push({
            sev: 'critical', cluster: cname, target: `node:${nname}`,
            category: t('health.cat.node_down'),
            msg: language === 'zh-TW'
              ? `${nname} 狀態 ${n.status}` : `${nname} is ${n.status}`,
            navView: 'cluster-core', navParams: { cluster: cid },
          });
        }
        const cpu = n.cpu?.usage_percent || 0;
        const mem = n.memory?.usage_percent || 0;
        if (cpu > 92) {
          out.push({
            sev: 'warning', cluster: cname, target: `node:${nname}`,
            category: t('health.cat.high_cpu'),
            msg: `${nname} CPU ${cpu.toFixed(0)}%`,
            navView: 'cluster-core', navParams: { cluster: cid },
          });
        }
        if (mem > 92) {
          out.push({
            sev: 'warning', cluster: cname, target: `node:${nname}`,
            category: t('health.cat.high_mem'),
            msg: `${nname} ${language === 'zh-TW' ? '記憶體' : 'memory'} ${mem.toFixed(0)}%`,
            navView: 'cluster-core', navParams: { cluster: cid },
          });
        }
      }

      // Storages
      for (const [skey, st] of Object.entries(cluster.storages || {})) {
        const s: any = st;
        const used = (s.usage_percent ?? s.used_pct ?? 0);
        if (used >= 95) {
          out.push({
            sev: 'critical', cluster: cname, target: `storage:${skey}`,
            category: t('health.cat.storage_full'),
            msg: `${s.storage || skey} ${used.toFixed(0)}% ` +
              (language === 'zh-TW' ? '已用' : 'used'),
            navView: 'storage', navParams: { cluster: cid },
          });
        } else if (used >= 85) {
          out.push({
            sev: 'warning', cluster: cname, target: `storage:${skey}`,
            category: t('health.cat.storage_high'),
            msg: `${s.storage || skey} ${used.toFixed(0)}% ` +
              (language === 'zh-TW' ? '已用' : 'used'),
            navView: 'storage', navParams: { cluster: cid },
          });
        }
      }

      // Ceph
      const ceph: any = cluster.ceph;
      if (ceph) {
        const status = (ceph.status || ceph.health?.status || '').toUpperCase();
        if (status.includes('ERR')) {
          out.push({
            sev: 'critical', cluster: cname, target: 'ceph',
            category: t('health.cat.ceph_err'),
            msg: status,
            navView: 'ceph-constellation', navParams: { cluster: cid },
          });
        } else if (status.includes('WARN')) {
          out.push({
            sev: 'warning', cluster: cname, target: 'ceph',
            category: t('health.cat.ceph_warn'),
            msg: status,
            navView: 'ceph-constellation', navParams: { cluster: cid },
          });
        }
      }

      // Corosync ring/quorum findings (fetched on-demand).
      const coroData = corosync[cid];
      for (const cf of (coroData?.findings || []) as any[]) {
        const isZh = language === 'zh-TW';
        let category = 'Corosync';   // a proper noun; identical in both languages
        let msg = cf.code;
        let sev: Sev = cf.severity === 'critical' ? 'critical' : 'warning';
        if (cf.code === 'no_quorum') {
          category = isZh ? 'Corosync 仲裁' : 'Corosync quorum';
          msg = isZh ? '叢集失去仲裁（NO QUORUM）' : 'Cluster has lost quorum';
        } else if (cf.code === 'node_offline') {
          category = isZh ? 'Corosync 成員' : 'Corosync membership';
          msg = isZh ? `${cf.node} 不在環中（離線）` : `${cf.node} is not in the ring (offline)`;
        } else if (cf.code === 'link_down') {
          category = isZh ? 'Corosync 連結' : 'Corosync link';
          msg = isZh ? `${cf.node} link${cf.link} 斷線` : `${cf.node} link${cf.link} is down`;
        } else if (cf.code === 'high_latency') {
          category = isZh ? 'Corosync 延遲' : 'Corosync latency';
          const ms = (Number(cf.latency_us) / 1000).toFixed(1);
          msg = isZh ? `${cf.node} link${cf.link} 環延遲 ${ms} ms` : `${cf.node} link${cf.link} ring latency ${ms} ms`;
        }
        out.push({ sev, cluster: cname, target: `corosync:${cf.code}:${cf.node || ''}:${cf.link ?? ''}`, category, msg });
      }

      // Recent PVE task errors (last 24h, fetched separately).
      const fail = taskFailures[cid] || 0;
      if (fail > 0) {
        out.push({
          sev: fail >= 10 ? 'warning' : 'info',
          cluster: cname, target: 'tasks',
          category: t('health.cat.task_failures'),
          msg: language === 'zh-TW'
            ? `過去 24h 共 ${fail} 筆作業失敗`
            : `${fail} task error(s) in the last 24h`,
          navView: 'tasks', navParams: { cluster: cid },
        });
      }
    }
    // Certificates expiring soon — fetched on-demand.
    for (const c of certIssues) {
      let sev: Sev = 'info';
      if (c.days < 0)       sev = 'critical';      // expired
      else if (c.days < 14) sev = 'critical';
      else if (c.days < 30) sev = 'warning';
      else if (c.days < 60) sev = 'info';
      else                  continue;              // 60-90: don't surface
      out.push({
        sev, cluster: c.cluster, target: `cert:${c.node}`,
        category: c.days < 0 ? t('health.cat.cert_expired') : t('health.cat.cert_expiring'),
        msg: language === 'zh-TW'
          ? `${c.node}: ${c.subject} (${c.days < 0 ? `已過期 ${Math.abs(c.days)} 天` : `${c.days} 天`})`
          : `${c.node}: ${c.subject} (${c.days < 0 ? `expired ${Math.abs(c.days)}d ago` : `${c.days}d`})`,
        navView: 'cluster-core', navParams: { cluster: c.clusterId },
      });
    }
    // Pending apt updates — info-level on most nodes; bumps to warning only
    // when count is large because operators batch-patch on a schedule anyway.
    for (const u of pendingUpdates) {
      out.push({
        sev: u.count >= 50 ? 'warning' : 'info',
        cluster: u.cluster, target: `updates:${u.node}`,
        category: t('health.cat.updates'),
        msg: language === 'zh-TW'
          ? `${u.node}: ${u.count} 個套件待更新`
          : `${u.node}: ${u.count} package update(s) pending`,
        navView: 'cluster-core', navParams: { cluster: u.clusterId },
      });
    }
    // HA: any resource not in started/stopped state — usually error / fence
    // / freeze / migrate. State='error' → critical; everything else warn.
    for (const h of haIssues) {
      const sev: Sev = h.state === 'error' ? 'critical' : 'warning';
      out.push({
        sev, cluster: h.cluster, target: `ha:${h.sid}`,
        category: t('health.cat.ha'),
        msg: language === 'zh-TW'
          ? `${h.sid}: ${h.state}（節點 ${h.node || '?'}）`
          : `${h.sid}: ${h.state} (node ${h.node || '?'})`,
        // Open the HA drilldown for this cluster instead of bouncing
        // to cluster-core (which doesn't show HA detail).
        navView: '__ha__', navParams: { cluster: h.clusterId },
      });
    }
    // Log-derived hardware / kernel events. Severity comes from the
    // server-side pattern table (uncorrectable ECC / MCE / OOM / disk
    // I/O / fs corruption = critical; corrected ECC / CRC / segfault /
    // hung task = warning). Sample line shown truncated for triage.
    for (const lf of logFindings) {
      out.push({
        sev: lf.severity,
        cluster: lf.cluster, target: `log:${lf.node}:${lf.category}`,
        category: t(`health.cat.log.${lf.category}`),
        msg: `${lf.node}: ${t('health.log.times', { n: lf.count })}` +
             (lf.sample ? ` — ${lf.sample.slice(0, 160)}` : ''),
        navView: 'cluster-core', navParams: { cluster: lf.clusterId },
      });
    }
    // Replication errors.
    for (const r of replIssues) {
      out.push({
        sev: 'warning',
        cluster: r.cluster, target: `repl:${r.sid}`,
        category: t('health.cat.replication'),
        msg: `${r.sid}: ${r.error}`,
        navView: '__repl__', navParams: { cluster: r.clusterId },
      });
    }
    // Stable sort: severity first, then a deterministic composite key
    // (cluster + target + category + msg) so identical findings keep the
    // same DOM position across re-renders. Earlier code only sorted by
    // severity, leaving same-severity items in array order — which is
    // dependent on the upstream cluster cache iteration and visibly
    // reshuffled cards every poll.
    out.sort((a, b) => {
      const s = SEV_RANK[a.sev] - SEV_RANK[b.sev];
      if (s !== 0) return s;
      const ka = `${a.cluster}|${a.target}|${a.category}|${a.msg}`;
      const kb = `${b.cluster}|${b.target}|${b.category}|${b.msg}`;
      return ka.localeCompare(kb);
    });
    return out;
  }, [clusters, taskFailures, certIssues, pendingUpdates, haIssues, replIssues, logFindings, corosync, language, t]);

  // ── Differential card updates ────────────────────────────────────
  // Findings re-poll every 60 s; only the DELTA animates. Each card has
  // a stable key, so unchanged cards never re-mount (no full-page
  // flash). Removed findings linger ~0.4 s in a "leaving" list playing
  // a dissolve, new keys materialize via the mount animation.
  const keyOf = (f: Finding) => `${f.cluster}|${f.target}|${f.category}`;
  const lastByKeyRef = useRef<Map<string, Finding>>(new Map());
  const prevKeysRef = useRef<Set<string>>(new Set());
  const [leaving, setLeaving] = useState<Map<string, Finding>>(new Map());
  const exitTimerRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    const nowKeys = new Set(findings.map(keyOf));
    const removed = [...prevKeysRef.current].filter((k) => !nowKeys.has(k));
    findings.forEach((f) => lastByKeyRef.current.set(keyOf(f), f));
    if (removed.length > 0 && prevKeysRef.current.size > 0) {
      setLeaving((m) => {
        const next = new Map(m);
        for (const k of removed) {
          const f = lastByKeyRef.current.get(k);
          if (f) next.set(k, f);
        }
        return next;
      });
      // Held so a re-run can cancel it. A leftover timer only ever deletes
      // keys it added itself, so nothing reappears -- but if a finding leaves,
      // returns and leaves again inside 450ms, the first timer would cut the
      // second exit animation short.
      exitTimerRef.current = window.setTimeout(() => {
        setLeaving((m) => {
          const next = new Map(m);
          removed.forEach((k) => next.delete(k));
          return next;
        });
      }, 450);
    }
    prevKeysRef.current = nowKeys;
    return () => window.clearTimeout(exitTimerRef.current);
  }, [findings]);

  const displayFindings = useMemo(() => {
    const nowKeys = new Set(findings.map(keyOf));
    const ghosts = [...leaving.entries()]
      .filter(([k]) => !nowKeys.has(k))
      .map(([, f]) => f);
    return [...findings, ...ghosts];
  }, [findings, leaving]);

  const counts = useMemo(() => {
    const c: Record<Sev, number> = { critical: 0, warning: 0, info: 0, ok: 0 };
    for (const f of findings) c[f.sev]++;
    return c;
  }, [findings]);

  // Aggregate "all systems nominal" stats so even on a quiet day there's
  // something to look at. Numbers come from the WS broadcast directly.
  const stats = useMemo(() => {
    let nodes = 0, online = 0, vms = 0, running = 0, cts = 0, ctsRunning = 0;
    let storages = 0;
    for (const cluster of Object.values(clusters)) {
      for (const n of Object.values(cluster.nodes || {}) as any[]) {
        nodes++;
        if (n.status === 'online') online++;
      }
      for (const v of Object.values(cluster.vms || {}) as any[]) {
        if (v.type === 'lxc') {
          cts++; if (v.status === 'running') ctsRunning++;
        } else {
          vms++; if (v.status === 'running') running++;
        }
      }
      storages += Object.keys(cluster.storages || {}).length;
    }
    return { nodes, online, vms, running, cts, ctsRunning, storages };
  }, [clusters]);

  return (
    <div className="hm-page">
      <div className="hm-header">
        <div className="title-section">
          <h1 className="hm-title font-display">
            <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            {t('health.title')}
          </h1>
          <div className="hm-sub">
            {t('health.subtitle')}
            {lastFetch ? ` · ${t('health.updated')} ${new Date(lastFetch).toLocaleTimeString()}` : ''}
          </div>
        </div>
        <div className="hm-tally">
          <span className="hm-pill hm-pill-critical">{counts.critical} {t('health.sev.critical')}</span>
          <span className="hm-pill hm-pill-warning">{counts.warning} {t('health.sev.warning')}</span>
          <span className="hm-pill hm-pill-info">{counts.info} {t('health.sev.info')}</span>
        </div>
      </div>

      <div className="hm-stats">
        <div className="panel-card hm-stat" onClick={() => onNavigate('cluster-core')}>
          <div className="hm-stat-num">{stats.online}<span className="hm-stat-of">/{stats.nodes}</span></div>
          <div className="hm-stat-lbl">{t('health.stat.nodes')}</div>
        </div>
        <div className="panel-card hm-stat" onClick={() => onNavigate('holo-matrix')}>
          <div className="hm-stat-num">{stats.running}<span className="hm-stat-of">/{stats.vms}</span></div>
          <div className="hm-stat-lbl">{t('health.stat.vms')}</div>
        </div>
        <div className="panel-card hm-stat" onClick={() => onNavigate('holo-matrix')}>
          <div className="hm-stat-num">{stats.ctsRunning}<span className="hm-stat-of">/{stats.cts}</span></div>
          <div className="hm-stat-lbl">{t('health.stat.cts')}</div>
        </div>
        <div className="panel-card hm-stat" onClick={() => onNavigate('storage')}>
          <div className="hm-stat-num">{stats.storages}</div>
          <div className="hm-stat-lbl">{t('health.stat.storages')}</div>
        </div>
      </div>

      {Object.keys(corosync).length > 0 && (
        <div className="hm-corosync">
          {Object.entries(corosync).map(([cid, data]) => (
            <CorosyncCard key={cid} name={clusters[cid]?.name || cid} data={data} isZh={language === 'zh-TW'} />
          ))}
        </div>
      )}

      {lastFetch === 0 ? (
        // Initial load — don't flash "all systems nominal" before any
        // check has actually run. Wait for the first fetchOnDemand cycle.
        <div className="hm-empty hm-loading">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" opacity="0.25"/>
            <path d="M21 12a9 9 0 00-9-9"/>
          </svg>
          <div className="hm-empty-title">{t('health.loading.title')}</div>
          <div className="hm-empty-sub">{t('health.loading.sub')}</div>
        </div>
      ) : findings.length === 0 ? (
        <div className="hm-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div className="hm-empty-title">{t('health.empty.title')}</div>
          <div className="hm-empty-sub">{t('health.empty.sub')}</div>
        </div>
      ) : (
        <div className="hm-grid">
          {displayFindings.map((f) => (
            <div
              key={`${f.cluster}|${f.target}|${f.category}`}
              className={`hm-card hm-card-${f.sev}${leaving.has(`${f.cluster}|${f.target}|${f.category}`) ? ' hm-card-leaving' : ''}`}
              onClick={() => {
                if (!f.navView) return;
                if (f.navView === '__ha__')   { setHaDrillCluster(f.navParams?.cluster || null); return; }
                if (f.navView === '__repl__') { setReplDrillCluster(f.navParams?.cluster || null); return; }
                onNavigate(f.navView, { cluster: f.navParams?.cluster });
              }}
            >
              <div className="hm-card-head">
                <span className="hm-card-sev">{f.sev.toUpperCase()}</span>
                <span className="hm-card-cluster">{f.cluster}</span>
              </div>
              <div className="hm-card-cat">{f.category}</div>
              <div className="hm-card-msg">{f.msg}</div>
            </div>
          ))}
        </div>
      )}

      <HAStatusModal
        open={haDrillCluster !== null}
        clusterId={haDrillCluster || ''}
        onClose={() => setHaDrillCluster(null)}
      />
      <ReplicationModal
        open={replDrillCluster !== null}
        clusterId={replDrillCluster || ''}
        onClose={() => setReplDrillCluster(null)}
      />
      <style>{`
        .hm-page {
          padding: 24px 32px; height: 100%;
          display: flex; flex-direction: column; gap: 20px;
          color: var(--text-primary);
        }
        .hm-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
          margin-bottom: var(--spacing-md);
        }
        .title-section { display: flex; flex-direction: column; gap: 2px; }
        .hm-title {
          display: flex; align-items: center; gap: var(--spacing-sm);
          margin: 0;
          font-size: 22px; font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }
        .hm-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0,240,255,0.6));
          animation: hm-title-pulse 2s ease-in-out infinite;
        }
        @keyframes hm-title-pulse {
          0%,100% { opacity: 0.85; transform: none; }
          50%     { opacity: 1;    transform: scale(1.05); }
        }
        .hm-sub {
          font-size: 12px; color: var(--text-secondary);
          font-family: var(--font-mono); margin-top: 4px;
        }
        .hm-tally { display: flex; gap: 8px; flex-wrap: wrap; }
        /* Severity pill — tinted bg + bright readable text + saturated
           border. Earlier version used the raw severity color as both
           text and border on a transparent bg, which made the red/orange
           text nearly illegible against the dark page background. */
        .hm-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 999px;
          font-family: var(--font-mono); font-size: 13px;
          font-weight: 600;
          letter-spacing: .05em;
          border: 1px solid;
        }
        .hm-pill::before {
          content: ''; width: 7px; height: 7px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 8px currentColor;
          flex-shrink: 0;
        }
        .hm-pill-critical {
          color: #ff8aa3;
          border-color: rgba(255, 0, 64, 0.7);
          background: rgba(255, 0, 64, 0.14);
          text-shadow: 0 0 6px rgba(255, 0, 64, 0.55);
        }
        .hm-pill-critical::before {
          background: #ff3a6e;
          box-shadow: 0 0 10px #ff3a6e;
        }
        .hm-pill-warning {
          color: #ffcc7a;
          border-color: rgba(255, 107, 0, 0.7);
          background: rgba(255, 107, 0, 0.14);
          text-shadow: 0 0 6px rgba(255, 107, 0, 0.55);
        }
        .hm-pill-warning::before {
          background: #ff9540;
          box-shadow: 0 0 10px #ff9540;
        }
        .hm-pill-info {
          color: #a8efff;
          border-color: rgba(0, 240, 255, 0.6);
          background: rgba(0, 240, 255, 0.10);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.45);
        }
        .hm-pill-info::before {
          background: #00f0ff;
          box-shadow: 0 0 10px #00f0ff;
        }

        .hm-stats {
          display: grid; gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }
        /* Surface comes from panel-card; breathe disabled on small stat
           tiles (same call as the dashboard hero tiles — the animated
           shadow costs paint and adds no signal here). */
        .hm-stat {
          padding: 16px 20px;
          cursor: pointer;
          transition: all .15s;
          animation: none;
        }
        .hm-stat:hover {
          background: rgba(0, 240, 255, 0.10);
          border-color: var(--primary);
          transform: translateY(-1px);
        }
        .hm-stat-num {
          font-family: var(--font-display);
          font-size: 28px; font-weight: 600;
          color: var(--primary);
          letter-spacing: 0.05em;
        }
        .hm-stat-of {
          color: var(--text-secondary); font-size: 18px;
          margin-left: 4px; opacity: .7;
        }
        .hm-stat-lbl {
          font-family: var(--font-display);
          font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
          color: var(--text-secondary); margin-top: 4px;
        }

        /* Corosync status panel(s) */
        .hm-corosync {
          display: grid; gap: 12px;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
        }
        .coro-card { padding: 14px 16px; }
        .coro-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .coro-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 8px var(--primary); }
        .coro-title { font-family: var(--font-display); font-size: 13px; letter-spacing: 0.1em; color: var(--text-primary); }
        .coro-quorum {
          margin-left: auto; padding: 2px 10px; border-radius: 999px;
          font-family: var(--font-display); font-size: 11px; letter-spacing: 0.08em;
          border: 1px solid currentColor;
        }
        .coro-quorum.ok  { color: var(--success, #00ff88); }
        .coro-quorum.bad { color: #fff; background: var(--danger, #ff0040); border-color: var(--danger, #ff0040); box-shadow: 0 0 8px rgba(255,0,64,.5); }
        .coro-quorum.na  { color: var(--text-muted); }
        .coro-meta {
          display: flex; flex-wrap: wrap; gap: 6px 18px;
          font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);
          margin-bottom: 10px;
        }
        .coro-meta b { color: var(--text-primary); }
        .coro-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12px; }
        .coro-table th {
          text-align: left; padding: 6px 8px;
          font-family: var(--font-display); font-size: 11px; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--primary);
          border-bottom: 1px solid rgba(0,240,255,.2);
        }
        .coro-table td { padding: 6px 8px; border-bottom: 1px solid rgba(0,240,255,.06); color: var(--text-primary); }
        .coro-node { font-weight: 600; }
        .coro-local { color: var(--primary); }
        .coro-mono { color: var(--text-secondary); }
        .coro-online { font-family: var(--font-display); font-size: 10px; letter-spacing: .06em; padding: 1px 7px; border-radius: 999px; border: 1px solid currentColor; }
        .coro-online.on  { color: var(--success, #00ff88); }
        .coro-online.off { color: #fff; background: var(--danger, #ff0040); border-color: var(--danger, #ff0040); }
        .coro-link {
          display: inline-block; margin: 1px 4px 1px 0; padding: 1px 7px;
          border-radius: 3px; font-size: 11px; border: 1px solid currentColor;
        }
        .coro-link.ok   { color: var(--success, #00ff88); background: rgba(0,255,136,.08); }
        .coro-link.down { color: #fff; background: var(--danger, #ff0040); border-color: var(--danger, #ff0040); }
        .coro-link.na   { color: var(--text-muted); }
        .coro-na { color: var(--text-muted); }
        .coro-sshnote {
          margin-top: 10px; padding: 7px 10px;
          background: rgba(0,240,255,.04); border-left: 2px solid rgba(0,240,255,.4);
          border-radius: 3px; font-size: 11px; color: var(--text-secondary); line-height: 1.5;
        }

        .hm-grid {
          display: grid; gap: 10px;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
        .hm-card {
          /* Canonical panel-card surface, but keeps the severity-colored
             left rail (currentColor + 3px) since the colour conveys the
             severity at a glance — that's a deliberate exception, not
             style drift. */
          position: relative;
          padding: 12px 16px;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-left: 3px solid currentColor;
          border-radius: var(--radius-md);
          cursor: pointer;
          overflow: hidden;
          transition: transform .15s, box-shadow .15s, border-color .15s;
        }
        .hm-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.55;
          pointer-events: none;
        }
        .hm-card::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
        }
        .hm-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(0, 240, 255, 0.16),
                      0 0 0 1px rgba(0, 240, 255, 0.12);
        }
        /* Hologram materialize on mount — only NEW cards mount thanks to
           stable keys, so steady-state polls animate nothing. */
        .hm-card {
          animation: hm-card-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        @keyframes hm-card-in {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
            filter: brightness(2.2);
            clip-path: inset(0 0 92% 0);
          }
          55% { clip-path: inset(0 0 0 0); }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
            clip-path: inset(0 0 0 0);
          }
        }
        /* Dissolve-out for findings that cleared — the ghost row is
           removed from the DOM right after the animation ends. */
        .hm-card-leaving {
          animation: hm-card-out 0.4s ease-in forwards;
          pointer-events: none;
        }
        @keyframes hm-card-out {
          0%   { opacity: 1; transform: none; filter: none; }
          100% { opacity: 0; transform: translateY(-8px) scale(0.96); filter: brightness(1.8); }
        }
        .hm-card-critical { color: var(--danger, #ff4d6d); }
        .hm-card-warning  { color: var(--warning); }
        .hm-card-info     { color: var(--primary); }

        .hm-card-head {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 4px;
        }
        .hm-card-sev {
          font-family: var(--font-display);
          font-size: 10px; letter-spacing: .12em;
          font-weight: 600;
        }
        .hm-card-cluster {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary); opacity: .85;
        }
        .hm-card-cat {
          font-family: var(--font-display);
          font-size: 13px; letter-spacing: .04em;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .hm-card-msg {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary);
          word-break: break-all;
        }

        .hm-empty {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          color: var(--success); padding: 60px 20px; gap: 14px;
        }
        .hm-empty svg {
          stroke: var(--success);
          filter: drop-shadow(0 0 12px rgba(0, 255, 136, 0.5));
        }
        /* Loading variant — cyan spinner instead of success-green check. */
        .hm-empty.hm-loading { color: var(--primary); }
        .hm-empty.hm-loading svg {
          stroke: var(--primary);
          filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.5));
          animation: hm-spin 1.1s linear infinite;
        }
        @keyframes hm-spin {
          to { transform: rotate(360deg); }
        }
        .hm-empty-title {
          font-family: var(--font-display); font-size: 18px;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--success);
        }
        .hm-empty-sub {
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
