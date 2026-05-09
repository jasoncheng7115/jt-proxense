# JT-PROXENSE v0.3.28

> English version: [README.md](README.md)

**為 Proxmox VE 打造的即時監控 + 認證控制平面，採用科幻 cyberpunk 風格介面。**

> 多叢集 · API 容錯切換 · 單機部署 · Apache 2.0

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

v0.2 提供**可選的認證機制**。預設 `auth.enabled: false`，行為與 v0.1.0 相同 — 任何能連到 HTTP port 的人都能讀取叢集指標、並透過 `POST /api/config` 修改執行時設定。對外開放前請選一條：綁定 `127.0.0.1`、開啟認證、或放在認證反向代理後。

### 啟用認證

```bash
sudo jt-proxense auth set-local            # 寫入 auth.enabled=true 到 config.yaml
sudo jt-proxense user add admin --role admin
#  → 印出一次性密碼，請立刻保存
sudo systemctl restart jt-proxense
```

之後匿名瀏覽器請求會被 302 導向 cyberpunk 風格的 `/login` 頁；`/api/*` 回 `401 auth_required`。

### 可用認證後端

- `auth.backend: local` — Argon2id 雜湊密碼存於 SQLite。預設。
- `auth.backend: pam` — 透過 PAM 認證系統帳號。角色仍由本服務管理。

### 雙因素認證（TOTP）

登入後從 header 點使用者名稱 → **Two-factor (TOTP) setup**，用任何 authenticator app 掃 QR，保存 8 組備用代碼。設備遺失時用 `jt-proxense user reset-totp <username>` 清除。

### 角色

三種：`viewer`、`operator`、`admin`。可逐叢集 + 逐 VM 範圍授權：

```bash
# Bob 全域 viewer，但 cluster1 中 web-* VM 是 operator
jt-proxense user grant bob '*' viewer
jt-proxense user grant bob cluster1 operator --vm-pattern 'web-*'

# Alice 對任何 tag 為 'prod' 的 VM 是 admin
jt-proxense user grant alice '*' admin --vm-pattern 'tag:prod'
```

### 稽核日誌

每個狀態變更（登入、角色授權、設定修改、VM 開關機/遷移等）都附加式記錄在 `/var/lib/jt-proxense/jt-proxense.db`。Admin 可在 <http://your-server:8098/audit> 瀏覽（日期區間 + LIKE 過濾 + CSV 匯出）。保留期限：`jt-proxense audit purge --days 90`。

### 緊急鎖死復原

CLI 不需要服務在跑也能用。SOP §7.4 鐵則：

```bash
sudo jt-proxense auth disable          # 關掉認證、重啟服務
sudo jt-proxense reset-password admin  # 重設成已知密碼
sudo jt-proxense user reset-totp admin # 清除遺失的 authenticator
```

威脅模型與漏洞回報請見 [SECURITY.md](SECURITY.md)。

---

## 功能特色

### 監控（v0.1.0+）

- **多叢集管理** — 從同一介面監看多個 PVE 叢集
- **即時更新** — WebSocket 推送，亞秒級指標刷新
- **API 容錯切換** — 每個叢集可指定多個節點，按 `priority` 自動切換
- **Cyberpunk UI** — 深色主題、霓虹點綴、可選粒子 / 動畫層
- **六種畫面**：
  - **Dashboard 概觀** — 全域總覽
  - **Nodes 節點** — 節點 ECG 心電圖式指標
  - **Matrix 矩陣** — VM + LXC 狀態格（可篩選 / 排序 / 分組）
  - **Radar 雷達** — 異常偵測雷達
  - **Storage 儲存** — 儲存池 treemap 視覺化
  - **Ceph** — Ceph 叢集拓撲與 IOPS

### 認證 + 可追溯性（v0.2）

- **Argon2id 密碼 + 12 小時滑動 session + per-IP 速率限制**
- **PAM 後端** — 用系統帳號登入
- **TOTP 雙因素認證**，含 8 組單次備用碼
- **三種角色**支援**逐叢集 + 逐 VM-pattern 範圍授權**（`tag:prod`、`web-*`）
- **附加式稽核日誌**，可在 `/audit` 瀏覽、CSV 匯出
- **緊急 CLI 後門** — 認證設定錯誤也能無 web 復原
- 所有 UI 統一 cyberpunk 風格、有動畫，但表格保持資訊密度

### VM + 容器控制（v0.3，預設關閉）

- 開機 / 關機 / 重啟 / 暫停 / 恢復 — VM **與** LXC 容器
- 叢集內遷移（VM 線上、CT offline 或 restart-style）
- 批次操作最多 100 個 vmid / 次，自動分辨 VM vs CT
- Tier 確認（hard stop / migrate 需 admin）
- 每個動作都進稽核日誌；改 `vm_control.enabled: true` 即啟用

### 操作層（v0.3.x）

- **矩陣縮圖預覽** — 每台運作中虛擬機的 framebuffer 即時截圖，可依節點 / 類型 / 標籤分組。QEMU 透過迷你 RFB 3.8 client；LXC 透過 termproxy + vt100 emulator，CT 卡片直接顯示 shell 輸出。點任一卡片開啟全尺寸放大，附 CRT 雜訊載入特效。
- **跨叢集遷移** — Wizard 會剖析來源 VM、選擇目標叢集端點、取得 TLS fingerprint、列出磁碟與 NIC 對應。包含驗證、預檢、online / offline 模式、頻寬限速。Admin only；僅 QEMU（PVE API 限制）。失敗時跳出 toast 顯示可複製貼上的 `qm unlock` 解鎖指令。
- **儲存內容瀏覽** — 點任一 file-level 儲存區，依 content 動態出頁籤（備份 / ISO 映像 / CT 範本 / 程式碼片段 / 匯入 / 磁碟映像 / CT 根目錄）— 只列出該儲存實際支援的類型。可排序清單、搜尋、含 audit 的刪除。Block-level（RBD / LVM / ZFSpool）只給瀏覽。
- **Telegraf 接收器** — InfluxDB v2 端點 `/api/v2/write`（token 認證、支援 gzip）。Per-host ring buffer 透過 `/api/telegraf/{hosts,host}` 讀取。在 PVE 各主機跑你自己的 Telegraf `outputs.influxdb_v2`，補強 API 輪詢之外的指標。

## 反向代理（HTTPS 443 → 8098）

### 為什麼要這樣做

內建 server 只走純 HTTP `8098`，設計上就是要放在 TLS 反向代理後面。正式環境請：

- **jt-proxense 綁 localhost**（`127.0.0.1:8098`），只有反向代理連得到。
- **nginx 端做 TLS 終結**，用 Let's Encrypt 或自家憑證。
- **用 app 自己的認證**（`auth.enabled: true`），別在 nginx 再疊一層 basic auth — app 已經有角色、稽核、MFA 一整套。

### 步驟 1 — 把服務綁回 localhost

編輯 `/opt/jt-proxense/config.yaml`：

```yaml
server:
  host: 127.0.0.1   # 原本是 0.0.0.0
  port: 8098
auth:
  enabled: true     # ← 對外開放前必開
```

然後 `systemctl restart jt-proxense`。用 `ss -tlnp | grep 8098` 確認，應該只看到 `127.0.0.1:8098`。

### 步驟 2 — 安裝 nginx + certbot

```bash
apt install nginx python3-certbot-nginx
```

### 步驟 3 — nginx site 設定

存成 `/etc/nginx/sites-available/jt-proxense` 並 `ln -s` 到 `sites-enabled/`：

```nginx
# HTTP → HTTPS 強制轉址
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

    # certbot 會在步驟 4 幫你填好憑證路徑
    ssl_certificate     /etc/letsencrypt/live/proxense.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/proxense.example.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # 備份 / 加密金鑰匯入動輒幾 MB
    client_max_body_size 100M;

    # noVNC 與儀表板的即時 WebSocket 在整個 console 連線期間都會開著 —
    # 給寬鬆 timeout、關掉 buffering，畫面更新才不會被緩衝住。
    location /api/console/ {
        proxy_pass             http://127.0.0.1:8098;
        proxy_http_version     1.1;
        proxy_set_header       Upgrade $http_upgrade;
        proxy_set_header       Connection "upgrade";
        proxy_set_header       Host $host;
        proxy_set_header       X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header       X-Forwarded-Proto $scheme;
        proxy_read_timeout     86400s;   # 24 小時，配合一般 VNC 操作時長
        proxy_send_timeout     86400s;
        proxy_buffering        off;
    }

    # 主畫面 — 同樣會用到 WebSocket（即時資料）
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

### 步驟 4 — 簽憑證 + reload

```bash
nginx -t && systemctl reload nginx
certbot --nginx -d proxense.example.com
```

certbot 會自動改寫 `ssl_certificate*` 兩行並排好續約。

### 步驟 5 — 防火牆關掉 8098

開 `443`（與 `80` 用於跳轉與 ACME 驗證），關掉 `8098`：

```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw deny 8098/tcp
```

接著用 `https://proxense.example.com/` 進入，看到登入頁就成功。

### 注意事項

- 服務必須掛在根路徑 `/`，模板使用絕對路徑，子路徑掛載（`/proxense/`）目前不支援。
- 別在 nginx 加 `auth_basic` — app 已經處理登入、session、MFA、稽核、角色，再多一層只會把操作員搞混。
- noVNC 一定要 `proxy_buffering off`、加上長 `proxy_read_timeout`，少了任一個 console 不是凍住就是 60 秒後直接斷。
- 換 upstream port（例如同機跑多份）時，只要改 `proxy_pass` 那兩行就好。
- 內網 / 沒有公開 DNS 的環境，可以用 `openssl req -x509 ...` 自簽，跳過 certbot — 操作員第一次連會被瀏覽器要求接受憑證。

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

## 補充主機指標（Telegraf / InfluxDB）

PVE API 提供的指標相對粗粒度。為了呈現 PVE 拿不到的東西 — per-process CPU、硬體感測器、SMART、IPMI、細粒度 net/disk-IO — jt-proxense 內建一個 **InfluxDB line-protocol 接收器**。每台 PVE host 上的 Telegraf agent 把指標推到 jt-proxense，dashboard 為每組 `(host, measurement)` 保留最近 60 筆樣本，並透過 REST 暴露。

### 啟用接收器

```yaml
# /opt/jt-proxense/config.yaml
server:
  influx_enabled: true
  influx_port: 8086             # 預設值;Telegraf 設定要對齊
  influx_token: "long-random"   # 選填;空 = 不檢查(內網信任)
```

重啟 `jt-proxense`。接收器跑在 `:8086`，跟主 UI 的 `:8098` 完全獨立 — 接收器掛掉不會影響 UI。

### Telegraf agent 設定 (PVE host)

每台 PVE host 安裝 telegraf（`apt install telegraf`），然後寫入 `/etc/telegraf/telegraf.conf`:

```toml
[agent]
  interval = "10s"
  flush_interval = "10s"
  hostname = ""                 # 空 = 用系統 hostname;jt-proxense 用這個欄位 index

[[outputs.influxdb_v2]]
  urls = ["http://<jt-proxense>:8086"]
  organization = "any"          # 不驗證,任意字串
  bucket = "any"                # 同上
  token = "long-random"         # 對齊 server.influx_token;若不啟用 auth 可省略

# 想要的 input plugins。標準組合:
[[inputs.cpu]]
  percpu = true
  totalcpu = true
[[inputs.mem]]
[[inputs.diskio]]
[[inputs.net]]
[[inputs.system]]
[[inputs.processes]]
[[inputs.smart]]                # 需要 `apt install smartmontools`
[[inputs.sensors]]              # 需要 `apt install lm-sensors`(先跑一次 sensors-detect)
[[inputs.ipmi_sensor]]          # 需要 `apt install freeipmi-tools`;root 或 setuid
```

重啟 telegraf：`systemctl restart telegraf`。

### 驗證

```bash
# 1. 接收器健康狀態
curl -s http://<jt-proxense>:8086/health | jq .

# 2. 已推送過指標的 host 清單(透過主 app auth, admin/operator)
curl -s -b cookie http://<jt-proxense>:8098/api/telegraf/hosts | jq .

# 3. 單一 host 的最近樣本
curl -s -b cookie http://<jt-proxense>:8098/api/telegraf/<hostname> | jq .
```

若一分鐘後 `hosts` 仍是空的，到 PVE host 上看 `journalctl -u telegraf -n 50` — 多半是 token 不對（接收器 log 會看到 401）或防火牆擋住 8086。

### 注意事項

- 接收器**不掛**主 app 的 auth middleware — 用 `influx_token` 保護或綁在私網介面。
- Ring buffer 只在記憶體裡（10 秒間隔約 10 分鐘）。歷史保存不在範圍 — 若要長期保留請把 Telegraf 直接指向真正的 InfluxDB，jt-proxense 只做即時監看。
- 不想要的 measurements 可在 telegraf 端用 `[outputs.influxdb_v2.tagdrop]` / `[inputs.<name>.tagpass]` 過濾掉 — 接收器拿到什麼就 bucket 什麼。

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
