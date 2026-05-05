# Migrating from v0.1 to v0.2

v0.2 is **fully backward compatible** with v0.1 — operators who do nothing will get a v0.1-shaped service after upgrade. New features are opt-in via config.

## What changes automatically

- A new SQLite database is initialized at `/var/lib/jt-proxense/jt-proxense.db` on first start (empty until you create users).
- The systemd unit gains `ReadWritePaths=/var/lib/jt-proxense`.
- A new CLI `/usr/local/bin/jt-proxense` is symlinked from `bin/jt-proxense`.
- HTTP server now binds **before** cluster polling starts. Fresh installs with unreachable PVE no longer wait ~12 seconds before the UI is reachable.

## What stays off until you turn it on

`auth.enabled` defaults to **`false`**. Until you flip it, the service behaves exactly like v0.1: no login, anyone reaching the port can read everything (and write to `/api/config`).

## Recommended upgrade flow

```bash
# 1. Re-run install.sh — it's idempotent
sudo bash -c "$(curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/jt-proxense/main/install.sh)"

# 2. (recommended) opt in to authentication
#    The installer's [7/7] step asks you on a fresh install. On an upgrade
#    of an existing v0.1 box it leaves auth alone. Enable manually:
sudo jt-proxense auth set-local
sudo jt-proxense user add admin --role admin
#    → prints a one-time password; copy it now.

# 3. Restart the service
sudo systemctl restart jt-proxense

# 4. Browse to https://your-host:8098/ — it now redirects to /login
```

## Optional: TOTP 2FA

Sign in once with your bootstrapped admin password, then visit `/totp` from the user menu and enroll. Save the 8 backup codes — they're each one-time-use, and the only way back in if you lose your authenticator (besides the CLI back door below).

## Optional: PAM backend (system accounts)

If you want users to log in with their existing system accounts instead of a separate password:

```bash
sudo jt-proxense config set auth.backend pam
sudo systemctl restart jt-proxense
```

The first time a system user logs in, a row is created in `users` with a sentinel hash so you can grant them roles. They never have a password in our DB; PAM owns it.

## Optional: VM-pattern roles

Roles can now scope to specific VMs by name or tag. Examples:

```bash
# Give bob full admin only on VMs tagged "dev"
sudo jt-proxense user grant bob '*' admin --vm-pattern 'tag:dev'

# Give alice operator on web-* VMs in cluster1, viewer on everything else
sudo jt-proxense user grant alice '*' viewer
sudo jt-proxense user grant alice cluster1 operator --vm-pattern 'web-*'
```

## CLI back door (lock-out recovery)

The `/usr/local/bin/jt-proxense` CLI works without the service running. If you ever lock yourself out:

```bash
sudo jt-proxense auth disable          # turn auth off; restart service
sudo jt-proxense reset-password admin  # reset to a known password
sudo jt-proxense user reset-totp admin # clear lost authenticator
```

After recovery, re-enable with `jt-proxense auth set-local` and restart.

## Audit log

Every state-changing action is now recorded in an append-only audit log. Admins can browse it at `/audit`. CSV export available. Retention is unbounded by default; purge old rows with:

```bash
sudo jt-proxense audit purge --days 90
```

## Roll back

If anything goes wrong:

1. `sudo jt-proxense auth disable` (returns to v0.1 open-access mode while keeping all your DB rows intact).
2. Or fully revert to the v0.1.0 tag:
   ```bash
   sudo systemctl stop jt-proxense
   cd /opt/jt-proxense && sudo -u jt-proxense git fetch --tags && sudo -u jt-proxense git checkout v0.1.0
   sudo systemctl start jt-proxense
   ```
   Your `config.yaml` is preserved. The `/var/lib/jt-proxense` SQLite stays put — it's harmless to v0.1.

## Things that are NOT in v0.2

The following are scaffolded behind `vm_control.enabled: false`. Leave that flag off unless you want to use them; they don't affect anything else:

- VM / CT power operations
- VM / CT migration (within a cluster)
- Bulk lifecycle ops

When you're ready, set `vm_control.enabled: true` in `config.yaml` and restart. See [API.md](API.md) for the endpoint list.

## Questions

- Where did my v0.1 setup go? Nowhere — same `/opt/jt-proxense`, same `config.yaml`, same `:8098` port.
- I'm on PAM and forgot my system password. Use the system's `passwd` tool (or `chpasswd`) — the in-app `/account` page can't change PAM passwords.
- Backup codes location? Memorize, or `Download as .txt` from the /totp page. We don't store them in plaintext.
