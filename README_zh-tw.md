# JT-PROXENSE v0.1.0

> English version: [README.md](README.md)

**為 Proxmox VE 打造的即時監控系統，採用科幻 cyberpunk 風格介面。**

> 多叢集 · WebSocket 即時推送 · API 容錯切換 · 單機部署 · 不上雲 · Apache 2.0

![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-green.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

介紹網站：<https://jasoncheng7115.github.io/jt-proxense/>

---

## 三秒安裝

> 僅支援 Linux。

```bash
curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/jt-proxense/main/install.sh | sudo bash
```

安裝程式會建立 `jt-proxense` 系統使用者、安裝 Python 依賴、佈署 systemd unit 並啟動服務。預設網址：`http://<your-server>:8098/`。

對外開放前先編輯叢集設定：

```bash
sudo -u jt-proxense $EDITOR /opt/jt-proxense/config.yaml
sudo systemctl restart jt-proxense
```

## 升級

```bash
cd /opt/jt-proxense
sudo -u jt-proxense git pull
sudo systemctl restart jt-proxense
```

## 解除安裝

```bash
sudo systemctl disable --now jt-proxense
sudo rm /etc/systemd/system/jt-proxense.service
sudo systemctl daemon-reload
sudo rm -rf /opt/jt-proxense          # 連設定 / 資料一起清掉才需要這行
sudo userdel jt-proxense              # 可選
```

---

## 安全性

**此版本不含內建認證機制。** 任何能連到 HTTP port 的人都能讀取叢集指標、並透過 `POST /api/config` 修改執行時設定。

對外曝光前請：

- 只綁定可信介面，**或**
- 放在強制認證的反向代理後（nginx + HTTP basic / OAuth proxy / Tailscale ACL 等）

本機認證（local-only auth）已列入 roadmap，請見 [CHANGELOG.md](CHANGELOG.md) 的 "Unreleased" 段落。

---

## 功能特色

- **多叢集管理** — 從同一介面監看多個 PVE 叢集
- **即時更新** — WebSocket 推送，亞秒級指標刷新
- **API 容錯切換** — 每個叢集可指定多個節點，按 `priority` 自動切換
- **Cyberpunk UI** — 深色主題、霓虹點綴、可選粒子 / 動畫層
- **六種視圖**：
  - **Dashboard 概觀** — 全域總覽
  - **Nodes 節點** — 節點 ECG 心電圖式指標
  - **Matrix 矩陣** — VM 狀態格（可篩選 / 排序 / 分組）
  - **Radar 雷達** — 異常偵測雷達
  - **Storage 儲存** — 儲存池 treemap 視覺化
  - **Ceph** — Ceph 叢集拓撲與 IOPS

## 反向代理（HTTPS 443 → 8098）

最小 nginx 設定：

```nginx
server {
    listen 443 ssl http2;
    server_name proxense.example.com;
    ssl_certificate     /etc/letsencrypt/live/proxense.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/proxense.example.com/privkey.pem;

    client_max_body_size 100M;

    # 在這裡接上你想用的認證機制
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

服務必須掛在根路徑 `/`，模板使用絕對路徑，子路徑掛載目前不支援。

---

## 設定 PVE 叢集

在每台 PVE 節點上建立唯讀 API Token：

```bash
pveum user add monitoring@pve
pveum user token add monitoring@pve mon --privsep=0
pveum aclmod / -user monitoring@pve -role PVEAuditor
```

把 Token 值貼到 `/opt/jt-proxense/config.yaml`。完整 schema 見 [`config.example.yaml`](config.example.yaml)，最常編輯的欄位：

| 欄位 | 說明 | 預設 |
|---|---|---|
| `server.http_port` | HTTP 監聽 port | `8098` |
| `clusters[].nodes[].host` | PVE 節點 hostname 或 IP | — |
| `clusters[].nodes[].priority` | Failover 優先序，數字越小越優先 | `0` |
| `clusters[].auth.token_value` | 唯讀 PVE API Token | — |
| `clusters[].poll_interval` | 即時資料 polling 秒數 | `2` |
| `alerts.cpu_warning` / `_critical` | CPU 門檻（%） | `80` / `95` |
| `ui.language` | `en` / `zh-TW` | `en` |

---

## 專案結構

```
jt-proxense/
├── server/                 Python 後端 (aiohttp + WebSocket)
│   ├── server.py            HTTP / WS 伺服器
│   ├── cluster_manager.py   Polling、Failover、狀態彙整
│   ├── pve_client.py        PVE API 客戶端
│   ├── config.py            YAML 設定載入
│   └── models.py            資料模型
├── dist/                   預先 build 好的 React 前端
├── packaging/
│   └── jt-proxense.service  systemd unit
├── docs/                   GitHub Pages 介紹網站
├── run.py                  入口點
├── requirements.txt        Python runtime 依賴
├── config.example.yaml     設定範本
├── install.sh              一行安裝腳本（Linux）
├── LICENSE                 Apache 2.0
├── README.md / README_zh-tw.md
└── CHANGELOG.md / CHANGELOG_zh-tw.md
```

## API 端點

| Method | 路徑 | 用途 |
|---|---|---|
| GET  | `/api/config` | 取得目前設定 |
| POST | `/api/config` | 取代設定 |
| GET  | `/api/clusters` | 所有叢集狀態 |
| GET  | `/api/clusters/{id}` | 單一叢集狀態 |
| GET  | `/api/summary` | 全域摘要 |
| GET  | `/api/nodes` | 節點列表 |
| GET  | `/api/vms` | VM 列表 |
| GET  | `/api/storages` | 儲存列表 |
| GET  | `/api/ceph` | Ceph 資料 |
| GET  | `/api/health` | 連線健康狀態 |
| WS   | `/ws` | 即時推送 |

## 快捷鍵

| 按鍵 | 功能 |
|---|---|
| `D` | Dashboard |
| `N` | Nodes |
| `M` | Matrix |
| `R` | Radar |
| `S` | Storage |
| `C` | Ceph |
| `Space` | 暫停 / 繼續動畫 |
| `Ctrl+S` | 開啟 / 關閉設定面板 |

## 多語系

`en`、`zh-TW`。透過設定檔的 `ui.language` 或 app 內設定面板切換。

---

## 開發

```bash
git clone https://github.com/jasoncheng7115/jt-proxense.git
cd jt-proxense
pip install -r requirements.txt
npm install
npm run build           # 重新 build dist/
python3 run.py
```

前端開發伺服器（HMR）：

```bash
npm run dev             # 啟動 Vite，會 proxy API 到後端
```

## 疑難排解

**無法連接 PVE。** 直接驗證 Token 是否可用：
```bash
curl -k -H "Authorization: PVEAPIToken=monitoring@pve!mon=<TOKEN>" \
    https://<PVE_HOST>:8006/api2/json/version
```

**經反向代理時 WebSocket 斷線。** 檢查 `proxy_set_header Upgrade / Connection`、確認掛在根路徑 `/`、把 `proxy_read_timeout` 拉長。

**CPU 偏高。** 把 `clusters[].poll_interval` 從 `2` 拉到 `5` 以上；關掉 `ui.animations_enabled`。

---

## 貢獻

此為自行維護專案，**不接受 Pull Request**。發現 bug 或想提建議請開 Issue。

## 授權

Apache License 2.0 — 見 [LICENSE](LICENSE)。
第三方依賴授權清單：[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。

---

**JT-PROXENSE** — 為想讓機房「活起來」的 Proxmox VE 管理員打造。
