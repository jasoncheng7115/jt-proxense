# JT-PROXENSE v0.1.0

> 中文版本：[README_zh-tw.md](README_zh-tw.md)

**Real-time Proxmox VE monitoring with a sci-fi cyberpunk UI.**

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

**This release ships with no built-in authentication.** Anyone who can reach the HTTP port can read cluster metrics and modify the runtime configuration via `POST /api/config`.

Before exposing it beyond `127.0.0.1`:

- Bind only to a trusted interface, **or**
- Put it behind a reverse proxy that enforces authentication (nginx + HTTP basic / OAuth proxy / Tailscale ACL / etc.)

Local-host authentication is on the roadmap — see [CHANGELOG.md](CHANGELOG.md) "Unreleased".

---

## Features

- **Multi-cluster management** — monitor any number of PVE clusters from one pane
- **Real-time updates** — WebSocket push, sub-second metric refresh
- **API failover** — each cluster takes a list of nodes, falls over by `priority`
- **Cyberpunk UI** — dark theme, neon accents, optional particle / animation layer
- **Six views**:
  - **Dashboard** — global overview
  - **Nodes** — per-node ECG-style metric monitors
  - **Matrix** — VM status grid (filterable, sortable, groupable)
  - **Radar** — anomaly-detection radar
  - **Storage** — treemap visualization of pool usage
  - **Ceph** — Ceph cluster topology + IOPS

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
