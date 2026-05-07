# Changelog

> 中文版本：[CHANGELOG_zh-tw.md](CHANGELOG_zh-tw.md)

All notable changes to JT-PROXENSE are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

---

## [0.3.1] — 2026-05-07

### Added

- **Matrix thumbnail view** — third toggle in the matrix toolbar. Renders each VM as a card with a live framebuffer screenshot pulled from a new `GET /api/console/screenshot/{cluster}/{node}/{vmid}?max=N` endpoint. Backed by a minimal RFB 3.8 client (`server/vnc_screenshot.py`) that does the version + VNC-Auth + ServerInit + SetPixelFormat + one Raw FramebufferUpdate, then PNG-encodes via PIL. Per-VM cache (10s) with single-flight dedupe so N tabs viewing the same matrix don't fan-out into N×vncproxy calls. **Why:** at-a-glance view of "what is each VM actually showing right now" — not just CPU/MEM bars. **Verification:** matrix toolbar → thumbnail icon (third in the row) → expect VM screenshots within ~1-2s.
- **Thumbnail size slider** (160-640px) next to the view toggle. Persists across sessions in `localStorage`. The slider value is also passed to the server as `?max=` so we don't waste bandwidth fetching a 1920px PNG to display it at 200px.

### Changed

- **`pve_throttle` now wraps `console_proxy.py`'s direct vncproxy/termproxy POSTs** (not just the calls going through `pve_client._request`). The long-lived `vncwebsocket` upgrade itself stays unthrottled — holding a per-host slot for the entire console session would starve every other PVE call.
- **`useDialogs` replaces remaining native `alert/confirm/prompt`** in `HoloMatrix`, `SnapshotsModal`, `SettingsPanel`. Cyberpunk-themed modals, async-friendly, no Chrome focus-lock. Snapshot delete + rollback confirms are now flagged `destructive: true` so the dialog renders the danger color.
- **Console menu's "stored mode + no password" gating removed** from the client. The previous client-side check used a fetch-on-mount cache that went stale when the operator set a password from Settings without refreshing the page. Now `/prepare` returns 412 if no password is set and the dialog surfaces the message, so the menu state is always correct.

### Verification

- Backend tests: 261 passed (1 isolation-related flake on `test_export_import_round_trip` that passes when run in isolation, pre-existed).
- E2E: noVNC `RFB 003.008` banner, xterm `OK` ack, screenshot 320×200 PNG (24KB) all returned successfully against host-108 vmid 171.

---

## [0.3.0] — 2026-05-07

### Added

- **noVNC console** for QEMU VMs — cyberpunk-themed page at `/console/{cluster}/{node}/{vmid}`, WS bridge at `/api/console/.../ws`. noVNC vendored under `/assets/novnc/` so the whole stack is air-gapped (no CDN, CSP all `'self'`). Single-use 2-min `console_token` plus a 110-min PVE ticket cache. **Why:** ops shouldn't have to open a separate PVE web tab and re-auth per host. **Verification:** click 主控台 in the VM context menu → expect `已連線`, RFB banner in journal.
- **xterm.js console** for LXC containers via PVE `termproxy` (matches PVE web UI default for CTs). Page at `/console-term/{...}`, bridge at `/api/console/.../term/ws`. xterm.js + addon-fit vendored under `/assets/xterm/`. The bridge handles termproxy's `<user>:<ticket>\n` auth handshake server-side so the ticket never reaches the browser. **Verification:** right-click any LXC → 主控台 → working ⌃C, scrollback.
- **Send-keys dropdown** on the noVNC page — Tab / Esc / Backspace / Super / PrintScreen, plus Ctrl-Alt-Backspace and Ctrl-Alt-F1..F12 (mirrors PVE noVNC's keyboard menu).
- **VM/CT name in console window title** — `<title>` and titlebar both show `VM <id> — <name>` / `CT <id> — <name>`, passed via `?name=` query string.
- **Encrypted password store** (Fernet AES-128-CBC + HMAC) with master key at `/etc/jt-proxense/master.key` (chmod 600). New CLI subcommand `jt-proxense secret` with `set / get / rm / list / export / import / rotate-key / migrate-yaml`. Settings → Clusters gains "Set / Replace / Clear PVE password" buttons. **Why:** the PVE root password used by stored-mode console can't sit in `config.yaml` plaintext.
- **Per-host PVE API throttle** (`server/pve_throttle.py`) — async semaphore (default 4 concurrent per host) plus 50ms minimum gap between starts, wired into `pve_client._request`. **Why:** PVE's `pveproxy` is single-process; unrestrained fan-out returns 596s and starves other clients.
- **Comprehensive nginx HTTPS reverse-proxy section** in both READMEs — bind to localhost, HTTP→HTTPS redirect, certbot, ufw, plus the noVNC-specific `proxy_buffering off` + `proxy_read_timeout 86400s` snippet (without it the console freezes after 60s).

### Changed

- **Animated counters on the overview page only animate on first mount.** Subsequent live-data updates snap. Previously every WS refresh kicked off a 60fps tween across ~27 components, pinning the browser at 30–50% CPU continuously. Now the same dashboard idles around 1–3%.
- **`ParticleBackground` capped at ~30fps**, particle count 80 → 40, removed canvas `shadowBlur` double-fill (the most expensive op per frame).
- **Matrix table rows** now render a subtle cyan separator (1px `rgba(0,240,255,.08)`) — previous CSS used an undefined `--border-dim` variable, so the rule was a no-op.
- **Empty VM tags** no longer render as empty pills (PVE returns `[""]` for tag strings containing only separators).

### Fixed

- **noVNC console kept failing with WS code 1006.** Root cause: aiohttp's `cookies={...}` percent-encodes cookie values, but PVE tickets contain `+ / = :` which must reach PVE unescaped — vncproxy returned silent 401s. The bridge now uses a raw `Cookie:` header for both vncproxy POST and `ws_connect`. Additionally, the `vncproxy` ticket doubles as the RFB-level VNC password and was being passed as empty string; it's now minted in `/prepare` and forwarded through the URL fragment (`#vp=...` never hits server logs or proxy caches), then read by the page and handed to noVNC's `credentials.password`.
- **Console screen too small on first paint** — noVNC's `scaleViewport` only knows the remote dimensions after the framebuffer-init message, so the constructor-time setting was a no-op. We now toggle-and-reset `scaleViewport` inside the `connect` event and re-fit on `window.resize`.
- **Radar tooltip cut off the bottom row** after the global +1px font bump (heights raised to 145 / 175).

### Security

- **CSP**: console pages emit `default-src 'self'; ... connect-src 'self' wss: ws:` — no third-party domains, no eval, no inline-event handlers. noVNC and xterm.js are both vendored.
- **PVE `vnc_password`** travels through the URL fragment to the console page; the page reads it and immediately scrubs the fragment via `history.replaceState` so a refresh / shoulder-surf doesn't recover it from the address bar.

### Verification

- Backend test suite: 245 passed in 132s.
- End-to-end: noVNC bridge receives `RFB 003.008\n` from PVE; xterm bridge receives `OK` auth ack from PVE termproxy.

---

## [Unreleased] — v0.2 in progress on `v0.2-auth` branch

### Added (preview, on feature branch — not yet on `main`)

- **Local authentication backend** with Argon2id hashing, 32-byte session IDs, 12-hour sliding window, 5-attempt-per-IP-per-5-minutes login rate limit. Disabled by default for v0.1 backward compatibility (`auth.enabled: false`).
- **Role-based access control** with three roles (`viewer` / `operator` / `admin`) and per-cluster scope (`*` = global default).
- **Append-only audit log** in SQLite. Each state-changing endpoint emits a row with user, timestamp, source IP, action, params hash (the request body itself is NEVER stored), result, and request correlation ID. DB-level triggers reject UPDATE / DELETE on the audit table.
- **Emergency CLI back door** at `/usr/local/bin/jt-proxense` (SOP §7.4 — non-negotiable for any feature that could lock the operator out). Subcommands: `auth show / disable / set-local`, `user add / list / del`, `reset-password`, `config get / set / reset`. Operates directly against SQLite + config.yaml; does NOT require the service running.
- **Cyberpunk-styled login page** at `/login` (vanilla HTML + CSS, no React rebuild needed). Anonymous requests to `/` are 302-redirected to `/login` when auth is enabled.
- **Forward-only SQL migrations runner** in `server/db.py`. First migration creates `users`, `sessions`, `roles`, `audit_log`, `failed_logins`, `schema_version` tables.

### Changed

- **HTTP listener now binds before cluster polling.** Fresh installs with unreachable PVE clusters used to wait ~12 seconds before serving the UI; now `/api/health` and `/login` respond instantly.

### Planned (not yet implemented)

- VM control endpoints (start / stop / migrate / console) — v0.3.
- ESXi cluster support (read-only first) — v0.4.
- ESXi → PVE minute-scale-downtime migration via CBT — v0.5.

---

---

## [0.1.0] — 2026-05-05

First public release.

### Added

- **Six visualization views**: Dashboard, Nodes (ECG-style metric monitors), Matrix (VM grid), Radar (anomaly detection), Storage (treemap), Ceph (cluster topology).
- **Multi-cluster polling** with per-cluster `priority`-ordered API failover; one unhealthy node does not stall the whole cluster's data refresh.
- **WebSocket live push** — clients receive incremental cluster state without re-polling.
- **One-line Linux installer** (`install.sh`) that:
  - runs a network preflight (github.com, pypi.org) to fail fast when offline;
  - detects apt / dnf / yum / pacman / zypper and installs `python3`, `pip`, `git`;
  - creates a dedicated `jt-proxense` system user (no shell, no home);
  - clones into `/opt/jt-proxense`, installs deps, runs an import smoke test of every runtime module, and `chown`s the tree to the service user;
  - installs a hardened systemd unit (`NoNewPrivileges`, `ProtectSystem=strict`, `ProtectHome`, etc.);
  - reads interactive prompts from `/dev/tty` so it works under `curl … | sudo bash`.
- **Hardened systemd unit** at `packaging/jt-proxense.service` with `User=jt-proxense`, restricted filesystem and capability surface.
- **Bilingual documentation** — English `README.md` (default) plus `README_zh-tw.md`; same for `CHANGELOG`.
- **Apache 2.0** license; full third-party dependency notice in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

### Security note

This release intentionally **does not include built-in authentication.** The HTTP listener exposes both read and write API endpoints (`POST /api/config` mutates runtime configuration). Operators must put the service behind a reverse proxy with auth, or bind it to a trusted interface only, before exposing it to a network. See the README "Security" section.

### Known limitations

- Linux only.
- Sub-path reverse-proxy mounts (e.g. `/proxense/`) are not supported — the app must be mounted at `/`.
- The frontend `dist/` is committed to the repository; rebuilding requires Node.js 18+ and `npm install`.
