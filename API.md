# API Reference

Concise REST + WebSocket reference. All paths are relative to the service base URL (default `http://127.0.0.1:8098`).

When `auth.enabled: true` (v0.2+), every request that isn't in the public list below requires a valid `jtps` session cookie. Anonymous requests get **`401 auth_required`** for `/api/*` and **`302 → /login`** for HTML routes.

## Public paths (no session required)

| Path | Purpose |
|---|---|
| `GET /login` | Cyberpunk login page |
| `GET /favicon.svg` | Favicon |
| `GET /assets/*`, `/fonts/*` | Static frontend assets |
| `GET /api/health` | Per-cluster connection health (no telemetry leak) |
| `GET /api/auth/me` | "Am I logged in?" — returns `{authenticated, user?}` |
| `POST /api/auth/login` | First step of login (password) |
| `POST /api/auth/logout` | Clears session cookie |
| `POST /api/auth/totp/login` | Second step of login (TOTP code, with `pending_token`) |

## Auth (v0.2+)

All require an authenticated session unless marked otherwise.

| Method | Path | Role | Notes |
|---|---|---|---|
| `POST` | `/api/auth/login` | public | `{username, password}` → session cookie OR `{totp_required, pending_token, ttl_seconds}` |
| `POST` | `/api/auth/logout` | public | Idempotent |
| `GET` | `/api/auth/me` | public | `{authenticated, user?}` |
| `POST` | `/api/auth/totp/login` | public | `{pending_token, code}` — code is 6-digit TOTP or backup code |
| `GET` | `/api/auth/totp/status` | any | `{enabled, backup_codes_remaining}` |
| `POST` | `/api/auth/totp/enroll-init` | any | Stages a fresh secret. Returns `{otpauth_url, qr_data_uri, secret}` |
| `POST` | `/api/auth/totp/enroll-verify` | any | `{code}` — confirms staged secret + returns 8 backup codes |
| `POST` | `/api/auth/totp/disable` | any | `{code}` — current TOTP code required |
| `POST` | `/api/auth/change-password` | any | `{current_password, new_password}` |

## Users (admin only)

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/users` | List all |
| `POST` | `/api/users` | `{username, password, role?}` |
| `DELETE` | `/api/users/{username}` | |

## Sessions (admin only)

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/sessions` | Active sessions, ids returned as preview-only |
| `DELETE` | `/api/sessions/{session_id}` | Revoke by full id |
| `POST` | `/api/sessions/user/{username}/revoke-all` | Kill all sessions for a user |

## Audit (admin only)

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/audit` | Query params: `user`, `action` (LIKE pattern), `cluster_id`, `since_ms`, `until_ms`, `limit`, `offset`. Returns `{rows, total}` |

## Clusters / read endpoints

Any authenticated user (effective role ≥ viewer):

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/clusters` | All cluster state |
| `GET` | `/api/clusters/{cluster_id}` | Single cluster |
| `GET` | `/api/summary` | Global aggregated summary |
| `GET` | `/api/nodes[?cluster=cid]` | All nodes / one cluster's |
| `GET` | `/api/vms[?cluster=cid]` | All VMs + CTs (the cache is unified) |
| `GET` | `/api/storages[?cluster=cid]` | |
| `GET` | `/api/ceph[?cluster=cid]` | |
| `GET` | `/api/health` | Per-cluster connection state |
| `GET` | `/api/config` | Current configuration |
| `POST` | `/api/config` | **Admin only.** Replace configuration. |

## VM lifecycle (v0.3+, gated by `vm_control.enabled: true`)

When `vm_control.enabled: false` (default): every endpoint below returns **`503 vm_control_disabled`**.

Roles enforced per request:
- `start / shutdown / reboot / suspend / resume` → effective role ≥ **operator** for that VM (see VM-pattern RBAC).
- `stop` (hard power-off) → **admin** when `vm_control.require_admin_for_destructive: true` (default), else operator.
- `migrate` → **admin** when `require_admin_for_destructive: true`.

| Method | Path | Body |
|---|---|---|
| `POST` | `/api/clusters/{cid}/nodes/{node}/vms/{vmid}/start` | — |
| `POST` | `/api/clusters/{cid}/nodes/{node}/vms/{vmid}/stop` | — |
| `POST` | `/api/clusters/{cid}/nodes/{node}/vms/{vmid}/shutdown` | — |
| `POST` | `/api/clusters/{cid}/nodes/{node}/vms/{vmid}/reboot` | — |
| `POST` | `/api/clusters/{cid}/nodes/{node}/vms/{vmid}/suspend` | — |
| `POST` | `/api/clusters/{cid}/nodes/{node}/vms/{vmid}/resume` | — |
| `POST` | `/api/clusters/{cid}/vms/{vmid}/migrate` | `{target_node, online?, with_local_disks?}` |

Each successful call returns `{ok: true, upid: "<PVE task UPID>", vm: {node, name, tags}}`.

## CT (LXC container) lifecycle

Same path scheme as VMs but with `cts` instead of `vms`. Same RBAC + audit.

| Method | Path | Body |
|---|---|---|
| `POST` | `/api/clusters/{cid}/nodes/{node}/cts/{vmid}/{action}` | — |
| `POST` | `/api/clusters/{cid}/cts/{vmid}/migrate` | `{target_node, online?, restart?}` |

## Bulk lifecycle

```
POST /api/clusters/{cid}/vms/bulk
{ "action": "start" | "stop" | "shutdown" | "reboot" | "suspend" | "resume",
  "vmids": [100, 101, 300, 301] }
```

Auto-detects each vmid as VM or CT via the cluster cache and dispatches accordingly. Per-target results come back in `results[]`. Limit: 100 vmids per request.

## Tasks

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/clusters/{cid}/nodes/{node}/tasks/{upid}` | Poll PVE task status by UPID. Read-only — viewer role suffices. |

## WebSocket

```
GET /ws    (Upgrade)
```

Sends `{type: "initial", data: {...}, timestamp}` on connect, then `{type: "update", data: {...}, timestamp}` whenever cluster state changes. Heartbeat every 30 s. WebSocket inherits the session cookie when auth is enabled — anonymous WS upgrades are rejected.

## Headers

Every response carries:

- `X-Request-Id` — 12-char correlation id; appears in audit and operational logs.
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Error shape

```json
{ "error": "<short_machine_code>", "message": "...", "...": "..." }
```

Stable error codes you can switch on:

- `auth_required` (401)
- `forbidden` (403, with `required_role`)
- `rate_limited` (429)
- `pending_expired` (401, TOTP login)
- `invalid_credentials` (401)
- `invalid_totp` (401)
- `pam_managed` (400, change-password against a PAM-managed account)
- `vm_control_disabled` (503)
- `cluster_not_found` (404)
- `vm_not_found` / `ct_not_found` (404)
- `pve_request_failed` (502, with `detail`)
- `bad_action`, `bad_vmids`, `too_many` (400, bulk validation)
