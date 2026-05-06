# JT-PROXENSE v0.2.0 (unreleased)

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

## Reverse proxy (HTTPS 443 → 8098)

Minimal nginx site:

```nginx
server {
    listen 443 ssl http2;
    server_name proxense.example.com;
    ssl_certificate     /etc/letsencrypt/live/proxense.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/proxense.example.com/privkey.pem;

    client_max_body_size 100M;

    # Add basic auth or your reverse-proxy of choice here.
    auth_basic           "JT-PROXENSE";
    auth_basic_user_file /etc/nginx/.htpasswd;

    location / {
        proxy_pass         http://127.0.0.1:8098;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection "upgrade";
        proxy_set_header   Host $host;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }
}
```

The app must be mounted at the **root path** `/` — templates use absolute paths, sub-path mounts are unsupported.

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
