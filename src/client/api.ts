/**
 * JT-PROXENSE REST API Client
 */

import type { Config, ClusterData, GlobalSummary } from './types';

const API_BASE = '/api';

export interface CurrentUser {
  id: number;
  username: string;
  role_global: 'viewer' | 'operator' | 'admin' | null;
  must_change_pw?: boolean;
  session_id?: string;
}

export interface LoginResponse {
  ok: boolean;
  user?: CurrentUser;
  totp_required?: boolean;
  pending_token?: string;
  ttl_seconds?: number;
}

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'same-origin',           // v0.2+: include the session cookie
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  // v0.2+: redirect to the cyberpunk /login page on 401 (except when the
  // failing call is itself an auth endpoint — /auth/me is allowed to 401
  // and the caller decides what to do).
  if (response.status === 401 && !path.startsWith('/auth/')) {
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.replace('/login');
    }
    throw new Error('auth_required');
  }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // ----- v0.2 auth (session cookies are httponly so JS just calls these) -----
  authMe: () =>
    fetchJson<{ authenticated: boolean; user?: CurrentUser }>('/auth/me'),

  authLogin: (username: string, password: string) =>
    fetchJson<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  authLogout: () =>
    fetchJson<{ ok: boolean }>('/auth/logout', { method: 'POST' }),

  // TOTP enrollment (self-service)
  totpEnrollInit: () =>
    fetchJson<{
      ok: boolean;
      otpauth_url: string;
      qr_data_uri: string;
      secret: string;
    }>('/auth/totp/enroll-init', { method: 'POST' }),

  totpEnrollVerify: (code: string) =>
    fetchJson<{ ok: boolean; backup_codes: string[]; warning: string }>(
      '/auth/totp/enroll-verify',
      { method: 'POST', body: JSON.stringify({ code }) }
    ),

  totpDisable: (code: string) =>
    fetchJson<{ ok: boolean }>('/auth/totp/disable', {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),

  // ----- existing read endpoints -----

  // Config
  getConfig: () => fetchJson<Config>('/config'),

  updateConfig: (updates: Partial<Config>) =>
    fetchJson<{ status: string; message: string }>('/config', {
      method: 'POST',
      body: JSON.stringify(updates),
    }),

  // Clusters
  getClusters: () =>
    fetchJson<{ clusters: Record<string, ClusterData>; timestamp: number }>('/clusters'),

  getCluster: (clusterId: string) => fetchJson<ClusterData>(`/clusters/${clusterId}`),

  // Summary
  getSummary: () => fetchJson<GlobalSummary>('/summary'),

  // Resources
  getNodes: (clusterId?: string) =>
    fetchJson<Record<string, unknown>>(
      `/nodes${clusterId ? `?cluster=${clusterId}` : ''}`
    ),

  getVMs: (clusterId?: string) =>
    fetchJson<Record<string, unknown>>(
      `/vms${clusterId ? `?cluster=${clusterId}` : ''}`
    ),

  getStorages: (clusterId?: string) =>
    fetchJson<Record<string, unknown>>(
      `/storages${clusterId ? `?cluster=${clusterId}` : ''}`
    ),

  getCeph: (clusterId?: string) =>
    fetchJson<Record<string, unknown>>(
      `/ceph${clusterId ? `?cluster=${clusterId}` : ''}`
    ),

  // Health
  getHealth: () => fetchJson<Record<string, unknown>>('/health'),

  // ----- v0.3 VM / CT lifecycle (returns 503 when vm_control.enabled=false) -----

  vmAction: (
    cluster_id: string, node: string, vmid: number,
    action: 'start' | 'stop' | 'shutdown' | 'reboot' | 'suspend' | 'resume',
  ) =>
    fetchJson<{ ok: boolean; upid: string; vm: unknown }>(
      `/clusters/${encodeURIComponent(cluster_id)}/nodes/${encodeURIComponent(node)}/vms/${vmid}/${action}`,
      { method: 'POST' },
    ),

  ctAction: (
    cluster_id: string, node: string, vmid: number,
    action: 'start' | 'stop' | 'shutdown' | 'reboot' | 'suspend' | 'resume',
  ) =>
    fetchJson<{ ok: boolean; upid: string; ct: unknown }>(
      `/clusters/${encodeURIComponent(cluster_id)}/nodes/${encodeURIComponent(node)}/cts/${vmid}/${action}`,
      { method: 'POST' },
    ),

  /** Auto-detects VM vs CT based on the supplied `type` field. */
  guestAction: (
    cluster_id: string, node: string, vmid: number, type: 'qemu' | 'lxc',
    action: 'start' | 'stop' | 'shutdown' | 'reboot' | 'suspend' | 'resume',
  ) => (type === 'lxc'
    ? api.ctAction(cluster_id, node, vmid, action)
    : api.vmAction(cluster_id, node, vmid, action)),

  vmMigrate: (
    cluster_id: string, vmid: number,
    body: { target_node: string; online?: boolean; with_local_disks?: boolean },
  ) =>
    fetchJson<{ ok: boolean; upid: string; target_node: string }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/migrate`,
      { method: 'POST', body: JSON.stringify(body) },
    ),

  ctMigrate: (
    cluster_id: string, vmid: number,
    body: { target_node: string; online?: boolean; restart?: boolean },
  ) =>
    fetchJson<{ ok: boolean; upid: string; target_node: string }>(
      `/clusters/${encodeURIComponent(cluster_id)}/cts/${vmid}/migrate`,
      { method: 'POST', body: JSON.stringify(body) },
    ),

  bulkAction: (
    cluster_id: string,
    body: { action: string; vmids: number[] },
  ) =>
    // `ok` is true only when EVERY item succeeded, and the server answers 403
    // when every item was refused for authorisation — it used to return
    // 200 {ok: true} regardless, so a refused batch read as a submitted one.
    fetchJson<{
      ok: boolean; batch_id: string; action: string; count: number;
      succeeded: number; failed: number;
      results: Array<{ vmid: number; type?: 'vm' | 'ct'; ok: boolean; upid?: string; error?: string }>;
    }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/bulk`,
      { method: 'POST', body: JSON.stringify(body) },
    ),

  taskStatus: (cluster_id: string, node: string, upid: string) =>
    fetchJson<Record<string, unknown>>(
      `/clusters/${encodeURIComponent(cluster_id)}/nodes/${encodeURIComponent(node)}/tasks/${encodeURIComponent(upid)}`,
    ),

  // ----- snapshots / clone / template / delete (v0.3.x) -----
  listSnapshots: (cluster_id: string, vmid: number) =>
    fetchJson<{ snapshots: Array<{ name: string; description?: string; vmstate?: number; snaptime?: number; parent?: string }> }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/snapshots`,
    ),

  createSnapshot: (cluster_id: string, vmid: number,
                   body: { snapname: string; description?: string; vmstate?: boolean }) =>
    fetchJson<{ ok: boolean; upid: string }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/snapshots`,
      { method: 'POST', body: JSON.stringify(body) },
    ),

  deleteSnapshot: (cluster_id: string, vmid: number, snapname: string) =>
    fetchJson<{ ok: boolean; upid: string }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/snapshots/${encodeURIComponent(snapname)}`,
      { method: 'DELETE' },
    ),

  rollbackSnapshot: (cluster_id: string, vmid: number, snapname: string) =>
    fetchJson<{ ok: boolean; upid: string }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/snapshots/${encodeURIComponent(snapname)}/rollback`,
      { method: 'POST' },
    ),

  vmReset: (cluster_id: string, node: string, vmid: number) =>
    fetchJson<{ ok: boolean; upid: string }>(
      `/clusters/${encodeURIComponent(cluster_id)}/nodes/${encodeURIComponent(node)}/vms/${vmid}/reset`,
      { method: 'POST' },
    ),

  cloneVm: (cluster_id: string, vmid: number,
            body: { newid: number; full?: boolean; name?: string; target_node?: string; storage?: string; snapname?: string }) =>
    fetchJson<{ ok: boolean; upid: string; newid: number }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/clone`,
      { method: 'POST', body: JSON.stringify(body) },
    ),

  // ----- cross-cluster (remote) migrate -----
  listRemoteEndpoints: (cluster_id: string) =>
    fetchJson<{ endpoints: Array<{
      cluster_id: string;
      cluster_name: string;
      node_host: string;
      node_port: number;
      node_name: string;
    }> }>(
      `/clusters/${encodeURIComponent(cluster_id)}/remote-endpoints`,
    ),

  fetchRemoteFingerprint: (host: string, port: number = 8006) =>
    fetchJson<{ host: string; port: number; fingerprint: string }>(
      `/remote-fingerprint?host=${encodeURIComponent(host)}&port=${port}`,
    ),

  // ----- Ad-hoc backup (vzdump) -----
  // Lists backup-capable storages on a node by reusing the migration-targets
  // endpoint and filtering for content="backup". Avoids a new dedicated endpoint.
  triggerBackup: (cluster_id: string, node: string,
                  body: { vmid: number | string; storage: string; mode?: string;
                          compress?: string;
                          // PVE PBS / vzdump extras (v0.5.3+):
                          'notes-template'?: string;
                          protected?: boolean;
                          mailto?: string;
                          mailnotification?: 'always' | 'failure' }) =>
    fetchJson<{ ok: boolean; upid: string }>(
      `/clusters/${encodeURIComponent(cluster_id)}/nodes/${encodeURIComponent(node)}/backup`,
      { method: 'POST', body: JSON.stringify(body) },
    ),

  // ----- Encrypted per-cluster secret store (admin only) -----
  // Values never travel back over the wire — only set/unset metadata.
  setClusterSecret: (cluster_id: string, kind: string, value: string) =>
    fetchJson<{ ok: boolean }>(
      `/secrets/cluster/${encodeURIComponent(cluster_id)}/${encodeURIComponent(kind)}`,
      { method: 'POST', body: JSON.stringify({ value }) },
    ),
  deleteClusterSecret: (cluster_id: string, kind: string) =>
    fetchJson<{ ok: boolean; removed: boolean }>(
      `/secrets/cluster/${encodeURIComponent(cluster_id)}/${encodeURIComponent(kind)}`,
      { method: 'DELETE' },
    ),

  // Console: mint a single-use token. PVE's vncwebsocket refuses API
  // tokens at the WS Upgrade step, so the server first uses a PVE
  // username + password to mint a PVEAuthCookie and binds it to a
  // short-lived console_token returned here.
  consolePrepare: (body: { cluster_id: string; node: string; vmid: number; password?: string; kind?: 'auto'|'novnc'|'term'|'serial' }) =>
    fetchJson<{ ok: boolean; console_token: string; vnc_password: string; ttl_seconds: number }>(
      `/console/prepare`,
      { method: 'POST', body: JSON.stringify(body) },
    ),

  // Pre-flight check before cross-cluster migrate. Surfaces blockers
  // (snapshots, hostpci, lock) so the operator never ends up with a half-
  // migrated VM stuck in `lock=migrate` (which only root@pam can clear).
  migrationPrecheck: (cluster_id: string, vmid: number, target_cluster_id: string, target_node: string) =>
    fetchJson<{
      ok: boolean;
      blockers: string[];
      warnings: string[];
      info: { source: Record<string, unknown>; target: Record<string, unknown> };
    }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/migration-precheck`
        + `?target_cluster_id=${encodeURIComponent(target_cluster_id)}`
        + `&target_node=${encodeURIComponent(target_node)}`,
    ),

  // Source-side introspection: which disks/NICs does this VM have?
  getMigrationSource: (cluster_id: string, vmid: number) =>
    fetchJson<{
      vmid: number; node: string; name: string;
      disks: Array<{ key: string; storage: string; volid: string; size: string }>;
      nics:  Array<{ key: string; bridge: string; model: string }>;
    }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/migration-source`,
    ),

  // Target-side enumeration: which storages/bridges/IPs does the target node
  // expose? `node_or_host` accepts either a configured node name or the IP/host
  // (we let the backend resolve). The handler accepts the {node} URL param
  // matching the configured node identifier in PVE.
  getMigrationTargets: (cluster_id: string, node_or_host: string) =>
    fetchJson<{
      cluster_id: string; node: string;
      storages: Array<{ storage: string; type: string; content: string; avail: number; total: number; shared: boolean }>;
      bridges:  Array<{ iface: string; type: string; address: string }>;
      ips:      Array<{ iface: string; type: string; address: string; netmask: string }>;
    }>(
      `/clusters/${encodeURIComponent(cluster_id)}/nodes/${encodeURIComponent(node_or_host)}/migration-targets`,
    ),

  remoteMigrate: (cluster_id: string, vmid: number,
                  body: {
                    target_cluster_id: string;
                    target_endpoint_host: string;
                    target_endpoint_port?: number;
                    target_endpoint_fingerprint?: string;
                    target_vmid: number;
                    target_bridge_map: string;
                    target_storage_map: string;
                    online?: boolean;
                    delete_source?: boolean;
                    bwlimit?: number;
                  }) =>
    fetchJson<{ ok: boolean; upid: string; target: { cluster: string; vmid: number; endpoint_host: string } }>(
      `/clusters/${encodeURIComponent(cluster_id)}/vms/${vmid}/remote-migrate`,
      { method: 'POST', body: JSON.stringify(body) },
    ),
};
