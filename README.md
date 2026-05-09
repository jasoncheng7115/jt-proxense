# JT-PROXENSE v0.3.18

> 中文版本：[README_zh-tw.md](README_zh-tw.md)

**Real-time Proxmox VE monitoring + authenticated control plane, with a sci-fi cyberpunk UI.**

> Multi-cluster · API failover · Single Linux box · Apache 2.0

![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-green.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

Landing page: <https://jasoncheng7115.github.io/jt-proxense/>

---

## Three-second install

> Linux only.

```bash
curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/jt-proxense/main/install.sh | sudo bash
```

The installer creates a `jt-proxense` system user, installs Python deps, drops a systemd unit, and starts the service. Default URL: `http://<your-server>:8098/`.

Edit clusters before exposing it:

```bash
sudo -u jt-proxense $EDITOR /opt/jt-proxense/config.yaml
sudo systemctl restart jt-proxense
```

## Upgrade

```bash
cd /opt/jt-proxense
sudo -u jt-proxense git pull
sudo systemctl restart jt-proxense
```

## Uninstall

```bash
sudo systemctl disable --now jt-proxense
sudo rm /etc/systemd/system/jt-proxense.service
sudo systemctl daemon-reload
sudo rm -rf /opt/jt-proxense          # add this only if you also want to drop config + data
sudo userdel jt-proxense              # optional
```

---

## Security

v0.2 ships **opt-in authentication**. By default `auth.enabled: false` and the service behaves exactly like v0.1.0 — anyone reaching the port can read everything and write `/api/config`. Always either bind to `127.0.0.1` only **or** turn auth on **or** put a reverse proxy with auth in front.

### Turning on authentication

```bash
sudo jt-proxense auth set-local            # writes auth.enabled=true to config.yaml
sudo jt-proxense user add admin --role admin
#  → prints a one-time password, copy it now
sudo systemctl restart jt-proxense
```

Anonymous browser requests are now 302-redirected to a cyberpunk `/login` page; `/api/*` responds with `401 auth_required`.

### Available auth backends

- `auth.backend: local` — Argon2id passwords stored in SQLite. Default.
- `auth.backend: pam` — system accounts via PAM. Roles still live in our DB.

### Two-factor (TOTP)

Sign in once, click your username in the header → **Two-factor (TOTP) setup**, scan the QR with any authenticator app, save the 8 backup codes. Disable any time with `jt-proxense user reset-totp <username>` if a device is lost.

### Roles

Three: `viewer`, `operator`, `admin`. Per-cluster + per-VM scoping:

```bash
# Bob is viewer everywhere, but operator on web-* VMs in cluster1
jt-proxense user grant bob '*' viewer
jt-proxense user grant bob cluster1 operator --vm-pattern 'web-*'

# Alice is admin on every VM tagged 'prod'
jt-proxense user grant alice '*' admin --vm-pattern 'tag:prod'
```

### Audit log

Every state change (login, role grant, config change, VM start/stop/migrate, etc.) is recorded append-only at `/var/lib/jt-proxense/jt-proxense.db`. Admins browse it at <http://your-server:8098/audit> (date range + LIKE filter + CSV export). Retention: `jt-proxense audit purge --days 90`.

### Emergency lock-out recovery

The CLI works without the service running. Per SOP §7.4:

```bash
sudo jt-proxense auth disable          # flip auth off, restart service
sudo jt-proxense reset-password admin  # reset to a known password
sudo jt-proxense user reset-totp admin # clear lost authenticator
```

See also [SECURITY.md](SECURITY.md) for the threat model and disclosure policy.

---

## Features

### Monitoring (v0.1.0 +)

- **Multi-cluster management** — monitor any number of PVE clusters from one pane
- **Real-time updates** — WebSocket push, sub-second metric refresh
- **API failover** — each cluster takes a list of nodes, falls over by `priority`
- **Cyberpunk UI** — dark theme, neon accents, optional particle / animation layer
- **Six views**:
  - **Dashboard** — global overview
  - **Nodes** — per-node ECG-style metric monitors
  - **Matrix** — VM + LXC status grid (filterable, sortable, groupable)
  - **Radar** — anomaly-detection radar
  - **Storage** — treemap visualization of pool usage
  - **Ceph** — Ceph cluster topology + IOPS

### Auth + accountability (v0.2)

- **Argon2id passwords + 12 h sliding sessions + per-IP rate limit**
- **PAM backend** — log in with system accounts
- **TOTP 2FA** with 8 backup codes
- **Three roles** with **per-cluster + per-VM-pattern scoping** (`tag:prod`, `web-*`)
- **Append-only audit log**, viewable at `/audit`, exportable as CSV
- **Emergency CLI back door** — recover from any auth misconfig without web access
- All UIs styled to match the rest of the app (cyberpunk, animated, but information-dense)

### VM + container control (v0.3, ships disabled by default)

- start / stop / shutdown / reboot / suspend / resume — VMs **and** LXC containers
- migrate within cluster (online for VMs, offline + restart-style for CTs)
- bulk operations on up to 100 vmids per request, auto-detecting VM vs CT
- tier confirmations (admin required for hard stop / migrate)
- every action audited; flip `vm_control.enabled: true` in config to enable

### Operations layer (v0.3.x)

- **Matrix thumbnail preview** — live framebuffer screenshot for every running guest, group-able by node / type / tag. QEMU via a minimal RFB 3.8 client; LXC via termproxy + a vt100 emulator so CT cards show real shell output. Click any card for a full-size view with a CRT-static loading effect.
- **Cross-cluster migration** — wizard that introspects the source VM, picks a target endpoint, fetches the TLS fingerprint, and lays out disk + NIC mappings. Validation, dry-run pre-checks, online / offline modes, bandwidth limits. Admin-only; QEMU-only (PVE API limit). Lock-recovery toast with copy-paste `qm unlock` hint when migration fails.
- **Storage content browse** — click any file-level storage → tabs by content type (Backups / ISO / CT templates / Snippets / Import / Disk images / CT root) — only the tabs the storage actually carries. Sortable list, search, delete with audit. Block-level storages (RBD / LVM / ZFSpool) get a list-only view.
- **Telegraf receiver** — InfluxDB v2 endpoint at `/api/v2/write` (token auth, gzip-tolerant). Per-host ring buffer surfaced via `/api/telegraf/{hosts,host}`. Bring your own Telegraf `outputs.influxdb_v2` on each PVE host for supplemental metrics alongside the API-polled ones.

## Reverse proxy (HTTPS 443 → 8098)

### Why

The built-in server speaks plain HTTP on `8098` and is designed to sit behind a TLS-terminating reverse proxy. In production:

- **Bind jt-proxense to localhost** (`127.0.0.1:8098`) so only the proxy can reach it.
- **Terminate TLS at nginx** with a real cert (Let's Encrypt or your CA).
- **Use the app's own auth** (`auth.enabled: true`) — don't layer nginx basic-auth on top, the app already has roles, audit, MFA.

### Step 1 — bind the app to localhost

Edit `/opt/jt-proxense/config.yaml`:

```yaml
server:
  host: 127.0.0.1   # was 0.0.0.0
  port: 8098
auth:
  enabled: true     # ← required when exposing the proxy publicly
```

Then `systemctl restart jt-proxense`. Verify with `ss -tlnp | grep 8098` — it should show `127.0.0.1:8098` only.

### Step 2 — install nginx + certbot

```bash
apt install nginx python3-certbot-nginx
```

### Step 3 — nginx site config

Save as `/etc/nginx/sites-available/jt-proxense` and `ln -s` into `sites-enabled/`:

```nginx
# Redirect bare HTTP to HTTPS.
server {
    listen 80;
    listen [::]:80;
    server_name proxense.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name proxense.example.com;

    # certbot fills these in for you in step 4.
    ssl_certificate     /etc/letsencrypt/live/proxense.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/proxense.example.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # Backups + secret-store imports can be a few MB.
    client_max_body_size 100M;

    # noVNC + the dashboard's live WebSocket stay open for the lifetime
    # of the console session — give them generous timeouts and disable
    # buffering so screen updates aren't held back.
    location /api/console/ {
        proxy_pass             http://127.0.0.1:8098;
        proxy_http_version     1.1;
        proxy_set_header       Upgrade $http_upgrade;
        proxy_set_header       Connection "upgrade";
        proxy_set_header       Host $host;
        proxy_set_header       X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header       X-Forwarded-Proto $scheme;
        proxy_read_timeout     86400s;   # 24h — match a working VNC session
        proxy_send_timeout     86400s;
        proxy_buffering        off;
    }

    # Main dashboard — also uses WebSockets (the live state feed).
    location / {
        proxy_pass             http://127.0.0.1:8098;
        proxy_http_version     1.1;
        proxy_set_header       Upgrade $http_upgrade;
        proxy_set_header       Connection "upgrade";
        proxy_set_header       Host $host;
        proxy_set_header       X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header       X-Forwarded-Proto $scheme;
        proxy_read_timeout     3600s;
        proxy_send_timeout     3600s;
        proxy_buffering        off;
    }
}
```

### Step 4 — issue the cert and reload

```bash
nginx -t && systemctl reload nginx
certbot --nginx -d proxense.example.com
```

certbot rewrites the `ssl_certificate*` lines and adds a renewal cron entry.

### Step 5 — close port 8098 at the firewall

Open `443` (and `80` for redirect + ACME), close `8098`:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw deny 8098/tcp
```

Now visit `https://proxense.example.com/` — the app login page should appear.

### Notes / gotchas

- The app must be mounted at the **root path** `/` — templates use absolute paths, sub-path mounts (`/proxense/`) are unsupported.
- Don't add `auth_basic` at the nginx layer. The app's auth handles login, sessions, MFA, audit, and roles; double-auth just confuses operators.
- noVNC needs `proxy_buffering off` *and* the long `proxy_read_timeout`. Without either, the console either freezes or dies after ~60s of idle.
- If you change the upstream port (e.g. run multiple instances), only `proxy_pass` lines need updating.
- For internal/intranet deployments without public DNS, generate a self-signed cert (`openssl req -x509 ...`) and skip certbot — operators will have to accept the cert once.

---

## Configure your PVE clusters

On each PVE node, create a read-only API token:

```bash
pveum user add monitoring@pve
pveum user token add monitoring@pve mon --privsep=0
pveum aclmod / -user monitoring@pve -role PVEAuditor
```

Paste the token value into `/opt/jt-proxense/config.yaml`. See [`config.example.yaml`](config.example.yaml) for the full schema; the most-edited fields:

| Field | Purpose | Default |
|---|---|---|
| `server.http_port` | HTTP listen port | `8098` |
| `clusters[].nodes[].host` | PVE node hostname or IP | — |
| `clusters[].nodes[].priority` | Failover order, lower wins | `0` |
| `clusters[].auth.token_value` | Read-only PVE API token | — |
| `clusters[].poll_interval` | Live-data poll seconds | `2` |
| `alerts.cpu_warning` / `_critical` | CPU thresholds (%) | `80` / `95` |
| `ui.language` | `en` / `zh-TW` | `en` |

---

## Supplemental host metrics (Telegraf / InfluxDB)

PVE's API exposes coarse per-VM and per-node metrics. To surface things PVE doesn't — per-process CPU, hardware sensors, SMART, IPMI, fine-grained net/disk-IO — jt-proxense ships an **InfluxDB-line-protocol receiver**. Telegraf agents on each PVE host push host metrics directly to jt-proxense; the dashboard ring-buffers the last 60 samples per `(host, measurement)` and exposes them via REST.

### Enable the receiver

```yaml
# /opt/jt-proxense/config.yaml
server:
  influx_enabled: true
  influx_port: 8086             # default — match this in Telegraf
  influx_token: "long-random"   # optional; empty = no auth (LAN trust)
```

Restart `jt-proxense`. The receiver listens on `:8086` independently of the main `:8098` UI; crashing the receiver doesn't take the UI down.

### Telegraf agent config (PVE host)

Install `telegraf` on each PVE host (`apt install telegraf`), then drop this into `/etc/telegraf/telegraf.conf`:

```toml
[agent]
  interval = "10s"
  flush_interval = "10s"
  hostname = ""                 # empty = use system hostname; jt-proxense indexes by this

[[outputs.influxdb_v2]]
  urls = ["http://<jt-proxense>:8086"]
  organization = "any"          # not validated, leave any string
  bucket = "any"                # ditto
  token = "long-random"         # match server.influx_token; or omit if no auth

# Pick whichever input plugins you want surfaced. Standard set:
[[inputs.cpu]]
  percpu = true
  totalcpu = true
[[inputs.mem]]
[[inputs.diskio]]
[[inputs.net]]
[[inputs.system]]
[[inputs.processes]]
[[inputs.smart]]                # needs `apt install smartmontools`
[[inputs.sensors]]              # needs `apt install lm-sensors` (run sensors-detect once)
[[inputs.ipmi_sensor]]          # needs `apt install freeipmi-tools`; root or setuid required
```

Restart telegraf: `systemctl restart telegraf`.

### Verify

```bash
# 1. Receiver health
curl -s http://<jt-proxense>:8086/health | jq .

# 2. Hosts that have pushed metrics (auth via main app, admin/operator)
curl -s -b cookie http://<jt-proxense>:8098/api/telegraf/hosts | jq .

# 3. Recent samples for one host
curl -s -b cookie http://<jt-proxense>:8098/api/telegraf/<hostname> | jq .
```

If `hosts` is empty after a minute, check the host's `journalctl -u telegraf -n 50` — most issues are token mismatch (401 in receiver logs) or firewall blocking port 8086.

### Caveats

- The receiver runs **without** the main app's auth middleware — protect with `influx_token` OR bind to a private interface.
- Ring buffer is in-memory only (last ~10 minutes at 10s interval). Persistent storage is out of scope; if you need historical retention, point Telegraf at a real InfluxDB instead and use jt-proxense for live monitoring only.
- Drop telegraf measurements you don't care about with `[outputs.influxdb_v2.tagdrop]` / `[inputs.<name>.tagpass]` — the receiver buckets everything it gets.

---

## Project layout

```
jt-proxense/
├── server/                 Python backend (aiohttp + WebSocket)
│   ├── server.py            HTTP / WS server
│   ├── cluster_manager.py   Polling, failover, state aggregation
│   ├── pve_client.py        PVE API client
│   ├── config.py            YAML config loader
│   └── models.py            Data models
├── dist/                   Pre-built React frontend
├── packaging/
│   └── jt-proxense.service  systemd unit
├── docs/                   GitHub Pages landing site
├── run.py                  Entry point
├── requirements.txt        Python runtime deps
├── config.example.yaml     Configuration template
├── install.sh              One-liner installer (Linux)
├── LICENSE                 Apache 2.0
├── README.md / README_zh-tw.md
└── CHANGELOG.md / CHANGELOG_zh-tw.md
```

## API endpoints

| Method | Path | Purpose |
|---|---|---|
| GET  | `/api/config` | Get current configuration |
| POST | `/api/config` | Replace configuration |
| GET  | `/api/clusters` | All cluster states |
| GET  | `/api/clusters/{id}` | Single cluster state |
| GET  | `/api/summary` | Global summary |
| GET  | `/api/nodes` | Node list |
| GET  | `/api/vms` | VM list |
| GET  | `/api/storages` | Storage list |
| GET  | `/api/ceph` | Ceph data |
| GET  | `/api/health` | Connection health |
| WS   | `/ws` | Real-time push |

## Keyboard shortcuts

| Key | Action |
|---|---|
| `D` | Dashboard |
| `N` | Nodes |
| `M` | Matrix |
| `R` | Radar |
| `S` | Storage |
| `C` | Ceph |
| `Space` | Pause / resume animations |
| `Ctrl+S` | Toggle settings panel |

## Internationalization

`en`, `zh-TW`. Switch via `ui.language` in config or the in-app settings panel.

---

## Development

```bash
git clone https://github.com/jasoncheng7115/jt-proxense.git
cd jt-proxense
pip install -r requirements.txt
npm install
npm run build           # rebuilds dist/
python3 run.py
```

Frontend dev server with HMR:

```bash
npm run dev             # starts Vite, proxies API to backend
```

## Troubleshooting

**Cannot connect to PVE.** Verify the API token works directly:
```bash
curl -k -H "Authorization: PVEAPIToken=monitoring@pve!mon=<TOKEN>" \
    https://<PVE_HOST>:8006/api2/json/version
```

**WebSocket disconnects through reverse proxy.** Check `proxy_set_header Upgrade / Connection`, mount at `/` (not a sub-path), and bump `proxy_read_timeout`.

**High CPU.** Raise `clusters[].poll_interval` from `2` to `5` or higher; turn off `ui.animations_enabled`.

---

## Contributing

This is a privately maintained project. **Pull requests are not accepted.** Open an issue if you find a bug or want to suggest a change.

## License

Apache License 2.0 — see [LICENSE](LICENSE).
Third-party dependency licenses: [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

---

**JT-PROXENSE** — built for Proxmox VE administrators who want their racks to *feel* alive.
