# JT-PROXENSE v0.2.0 release notes (draft)

> **Status:** draft. Not yet released. Awaiting final review before merging the `v0.2-auth` feature branch to `main`.

## Headline

**Authentication, audit, and per-VM RBAC — without losing the cyberpunk look.** v0.2 turns jt-proxense from a read-only multi-cluster monitor into a self-hosted control plane with proper auth and accountability. Default behavior is unchanged from v0.1.0 — every new feature is opt-in.

## What's new

### Authentication

- **Local backend** — Argon2id password hashes, 32-byte session ids, 12-hour sliding window, 5-failures-per-IP-per-5-minutes rate limit.
- **PAM backend** — log in with system accounts (`auth.backend: pam`).
- **TOTP 2FA** — opt-in per user, 8 single-use backup codes, QR + manual-entry secret. Self-service `/totp` page.
- **Cyberpunk-styled `/login` page** with two-step flow when 2FA is on.
- **Emergency CLI back door** at `/usr/local/bin/jt-proxense` — works without the service running. Per SOP §7.4.

### Authorization

- **Three roles**: `viewer` / `operator` / `admin`.
- **VM-pattern RBAC**: a role grant can be scoped by VM name (`web-*`, `db-?`) or by tag (`tag:prod`). Highest-rank matching role wins.
- **Per-cluster scoping**: `*` = global default, or a specific cluster id.

### Audit

- **Append-only SQLite audit log**. DB-level triggers reject UPDATE/DELETE; only the operator-driven retention CLI can purge.
- **Admin viewer at `/audit`** with date range, action LIKE filter, cluster filter, expandable rows, CSV export, optional 5-second auto-refresh.
- Every state-changing endpoint emits a row with username, source IP, action, target, params hash (NOT the body), result, and request correlation id.

### Self-service / admin tools

- `/account` — change password, link to `/totp`, role pill.
- `/sessions` — admin sees every active session, revokes individuals or all-of-a-user.
- New CLI subcommands: `user grant`, `user revoke`, `user roles`, `user reset-totp`, `audit purge`, `audit count`, `config get/set/reset`.

### Operational

- HTTP listener now binds **before** cluster polling starts. Fresh installs with unreachable PVE no longer wait ~12 seconds before the UI is reachable.
- Hardened systemd unit (`NoNewPrivileges`, `ProtectSystem=strict`, `ProtectHome`, `ReadWritePaths` confined to install + state dirs).
- Security headers on every response: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Request correlation ids stamped as `X-Request-Id` header AND audit row, so a single user action is traceable end-to-end.
- GitHub Actions CI runs pytest + bash syntax + a "no DS_Store / no PAT / no AWS key" sweep on every push.

### Frontend

- New `UserBadge` in the header with role pill (admin orange / operator cyan / viewer blue-grey) and dropdown menu (Account, TOTP, Audit (admin), Sessions (admin), Sign out).
- Settings button now hidden from non-admins when auth is enforced.
- `api.ts` includes the session cookie on every request and redirects 401s to `/login`.

### v0.3 scaffolding (writes DISABLED by default)

If you set `vm_control.enabled: true` in `config.yaml`, you can:

- start / stop / shutdown / reboot / suspend / resume any VM or LXC container
- migrate within a cluster (online or offline)
- bulk-operate up to 100 vmids in one request, auto-detecting VM vs CT

All gated by per-VM RBAC and audited per call. Ships disabled — flip the flag explicitly.

## Test posture

- 129 pytest tests, ~55 s.
- Coverage: db migrations + triggers, auth (login / TOTP / PAM / sessions), audit (write / query / append-only enforcement / purge), middleware (public path matrix, role gating, redirect-vs-401), VM control (auth gating, RBAC, CT/VM dispatch, bulk, migrate, task status), VM-pattern RBAC.

## Breaking changes

**None for default deployments.** A v0.1.0 install that simply re-runs `install.sh` continues to behave like v0.1.0.

If you opt into auth, the only behavior change is that anonymous requests are redirected to `/login` (HTML) or get `401 auth_required` (`/api/*`).

## Known limitations

- Frontend role-gating is currently visual (Settings button hidden); the React Matrix view doesn't yet have right-click power actions or bulk-select UI. Backend endpoints exist; UI is v0.3 follow-up.
- WebSocket task push isn't implemented yet — clients poll `/api/clusters/{cid}/nodes/{node}/tasks/{upid}` for now.
- WebAuthn / passkeys planned for v0.2.x follow-up.
- ESXi support, ESXi → PVE migration, and PDM-parity features (cross-cluster migrate, backups, ACME, notifications, SDN) are tracked for v0.4 / v0.5 / v0.6+.

## Migration

See [MIGRATING-v0.1-to-v0.2.md](MIGRATING-v0.1-to-v0.2.md). The TL;DR: re-run `install.sh`, optionally `jt-proxense auth set-local` + `user add admin`, restart.

## Acknowledgements

Built on the v0.1.0 foundation. Cyberpunk visual language stays Orbitron / Rajdhani / Share Tech Mono. Animations honor `prefers-reduced-motion`.
