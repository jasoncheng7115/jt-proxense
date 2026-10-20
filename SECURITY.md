# Security policy

## Supported versions

| Version | Supported |
|---|---|
| `1.1.x` | ✅ current |
| `1.0.x` | ✅ security fixes only |
| < 1.0.0 | ❌ |

Releases up to and including `0.9.9` were published under Apache-2.0; from
`1.0.0` the project is AGPL-3.0-or-later. See [LICENSE](LICENSE).

## Reporting a vulnerability

Email **<jasoncheng7115@users.noreply.github.com>** — use the **subject line `[SECURITY] jt-proxense ...`**. Please do **not** open a public GitHub issue for vulnerabilities.

Include:

1. The vulnerable version (run `jt-proxense version` if installed).
2. A minimal reproduction or proof-of-concept.
3. Your assessment of impact (what can an attacker do, what authentication is required, etc.).
4. Whether you intend to disclose publicly, and a target date.

We will:

- Acknowledge within 5 business days.
- Provide a fix or remediation plan within 30 days for high/critical issues.
- Coordinate a CVE if relevant.
- Credit you in the CHANGELOG (or anonymously, per your preference).

## Threat model

This project is **single-tenant, single-machine**. The threat model assumes:

- The host running jt-proxense is a security boundary. An attacker with root on the host has full control regardless of any in-app guard.
- The operator deploys behind a reverse proxy with TLS for any non-loopback exposure.
- The PVE API tokens stored in `config.yaml` are sensitive. It is installed mode `600`, owned by the service user, and the application forces that mode on every write. **This was not true before v1.1.0**: the installer created the file with a plain redirect, so the mode was whatever the installing shell's umask produced — `0644` under the common default. Re-running the installer repairs an existing file and its backups in `config_backups/`.
- The service account can read and write its data (`config.yaml`, `config_backups/`, `/var/lib/jt-proxense`, `/etc/jt-proxense`, and its SSH keypair) but **not** the application code, which is root-owned and read-only to it. Before v1.1.0 the whole install directory was writable by the service, so code execution inside the web process could be made to survive a restart.
- The audit log SQLite at `/var/lib/jt-proxense/jt-proxense.db` is the operator's own log; protect the host filesystem.

What we explicitly defend against:

- Brute-force login (Argon2id + per-IP rate limit + optional TOTP 2FA).
- Session theft via XSS (HttpOnly cookies, no script-readable tokens).
- CSRF for state-changing endpoints (SameSite=Lax cookies, plus: cross-origin access is closed by default from v1.1.0 — `server.cors_origins` is an explicit allow-list and a `*` entry is ignored. Before that, a wildcard origin was configured together with `allow_credentials`, which meant any site the operator visited could drive this API with their session. Explicit CSRF tokens remain planned).
- Privilege escalation between roles. RBAC is enforced server-side, and from v1.1.0 it is genuinely per-cluster: an endpoint under `/api/clusters/{cluster_id}/...` resolves the caller's role *for that cluster*, and the WebSocket snapshot is filtered to the clusters the session may see. Before v1.1.0 the role check read only the global (`*`) grant — so a cluster-scoped grant was ignored at the door, and every authenticated session received the full cross-cluster snapshot over the WebSocket regardless of role.
- Spoofed client addresses. `X-Forwarded-For` is honoured only from loopback or an address named in `auth.trusted_proxies`; it drives the per-IP login lockout and the `source_ip` in the audit log. Before v1.1.0 every RFC1918 and link-local peer was trusted implicitly, so anyone on the same LAN could walk past the lockout and choose what the audit log recorded.
- Audit-log tampering by app code (DB-level `BEFORE UPDATE/DELETE` triggers reject mutation; only the operator-driven CLI retention path can purge).
- Lock-out by misconfigured auth (CLI back door at `/usr/local/bin/jt-proxense` works without the service running).

What we do NOT defend against:

- A compromised host. (Use disk encryption / IDS / etc. — out of scope here.)
- A compromised reverse proxy.
- Resource exhaustion / DoS (out of scope; deploy behind a rate-limiting ingress).
- Side channels through PVE itself.
- **A hostile PVE endpoint at FIRST contact.** `verify_ssl` defaults to `false` (PVE ships a self-signed certificate), so since v1.2.0 each node's TLS certificate and SSH host key are pinned on first contact (trust on first use) and a changed one is refused until an admin accepts it — Settings → Server → Trusted node fingerprints, or `jt-proxense trust`. What this does NOT cover is an attacker already in the path the very first time a node is contacted; compare the recorded fingerprint with the one PVE shows under Node → System → Certificates if that matters, or set `verify_ssl: true` per node if your cluster has a CA-signed certificate. `server.tls_pinning: false` turns pinning off.

## Public security advisories

Will be filed under the project's GitHub Security tab when relevant.
