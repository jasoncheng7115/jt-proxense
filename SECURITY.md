# Security policy

## Supported versions

| Version | Supported |
|---|---|
| `0.2.x` | ✅ when released |
| `0.1.x` | ✅ for security fixes only |
| < 0.1.0 | ❌ |

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
- The PVE API tokens stored in `config.yaml` are sensitive — protect the file (it's installed mode 600 owned by the service user).
- The audit log SQLite at `/var/lib/jt-proxense/jt-proxense.db` is the operator's own log; protect the host filesystem.

What we explicitly defend against:

- Brute-force login (Argon2id + per-IP rate limit + optional TOTP 2FA).
- Session theft via XSS (HttpOnly cookies, no script-readable tokens).
- CSRF for state-changing endpoints (SameSite=Lax cookies; planned: explicit CSRF tokens for v0.2.x).
- Privilege escalation between roles (RBAC enforced server-side on every endpoint, including VM-pattern scope).
- Audit-log tampering by app code (DB-level `BEFORE UPDATE/DELETE` triggers reject mutation; only the operator-driven CLI retention path can purge).
- Lock-out by misconfigured auth (CLI back door at `/usr/local/bin/jt-proxense` works without the service running).

What we do NOT defend against:

- A compromised host. (Use disk encryption / IDS / etc. — out of scope here.)
- A compromised reverse proxy.
- Resource exhaustion / DoS (out of scope; deploy behind a rate-limiting ingress).
- Side channels through PVE itself.

## Public security advisories

Will be filed under the project's GitHub Security tab when relevant.
