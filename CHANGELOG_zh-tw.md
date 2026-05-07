# 更新記錄

> English version: [CHANGELOG.md](CHANGELOG.md)

JT-PROXENSE 所有重要變動紀錄於此。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)，
版本號採 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

---

## [0.3.2] — 2026-05-07

### 新增

- **儲存區詳細頁面** — 點任一 file-level 儲存區的 tank 卡片，按「管理」（或右鍵 → 內容）會打開 `/storage/{cluster}/{node}/{name}` 專屬頁面。頁籤依儲存區的 `content` 動態出現（備份 / ISO 映像 / CT 範本 / 程式碼片段 / 匯入 / 磁碟映像 / CT 根目錄），每個都有專屬 type-coded icon。表格欄位：名稱 / 日期 / 格式 / 大小，欄位標題可點按排序。Phase 1 端點：`GET /api/clusters/{cid}/nodes/{node}/storage/{name}/content?type=...`（viewer+）+ `DELETE .../content/{volume:.+}`（operator+），都接到既有的 `pve_client.list_storage_content` / `delete_storage_content`，刪除動作有 audit log。Block-level 儲存區（rbd / lvm / zfspool）只給瀏覽（無上傳/刪除 UI），因為 disk image 屬於 VM。
- **InfluxDB Telegraf line-protocol 接收器**（`server/influx_receiver.py`）— 接受 `/write`（v1）和 `/api/v2/write`（v2）端點、支援 gzip、可選 bearer token。把 tags / fields / timestamp 解析後塞入 per-host ring buffer（每組 60 筆最新樣本），用 `host` tag 索引。讀取端點 `/api/telegraf/hosts` 與 `/api/telegraf/{host}` 暴露 buffered points。
- **LXC 文字模式縮圖** — CT 主控台 framebuffer 幾乎是空的，矩陣縮圖端點在 LXC 改走 `lxc_thumb.py`：開 termproxy WS、送 Ctrl-L 觸發 bash 重畫、捕捉 2 秒 shell 輸出、灌進 `pyte`（vt100 emulator）解析螢幕狀態、再用 PIL + 等寬字型 + cyan 文字渲染成 PNG。CT 縮圖現在會看到 prompt 或執行中的 TUI（htop 之類），不再黑白一片。
- **矩陣縮圖 UX**：類型篩選（全部 / VM / CT）、優先有內容排序（空白縮圖排到最後 — server 端 QEMU 用平均亮度判斷、CT 用「是否有任何非空白文字」判斷，透過 `X-Thumb-Empty` header 暴露）、分組（節點 / 類型 / 標籤）配明顯 sticky 分組標題。排序變化時用 FLIP 動畫；初次資料抓取期間關掉動畫避免卡片亂跳。Footer 加 30 秒縮圖更新頻率指示。
- **科幻載入動畫**：每張縮圖的 CRT 無訊號雜訊（SVG `feTurbulence` + scanlines + RGB 色差 label），點擊放大的 modal 用旋轉雙環 + 上下彈跳 scan-bar + 角括號 + 狀態文字。
- **雷達異常卡片右鍵選單** — 跟矩陣同一套（詳細資訊、開啟 PVE、主控台、快照、立即備份、開機/關機/重啟/強制停止、跨叢集遷移）。共用 `VMContextMenu` 抽到 `components/VMContextMenu.tsx`。Modal shim（`useMemo` 穩定 `vm` 物件參考）避免雷達 50ms 重畫 reset wizard state。
- **矩陣表格排序動畫** — 拿掉舊的左右晃，改成 cyan 光棒從上掃到下 + 每列 staggered 淡入 + blur 重建。同款動畫也套到儲存詳細頁的表格排序。
- **儲存詳細頁切頁籤動畫**：cyan 光棒在剛載入的清單上由上到下掃過，表格內容 fade + blur 入場。
- **工具列全面加 icon** — 矩陣每個工具列按鈕（篩選、排序、分組、檢視、類型篩選）、尺寸 slider 標籤、帳號設定每個段落、儲存詳細頁籤都帶 12–18px 的 SVG icon（用 currentColor 上色）。

### 變更

- **`RemoteMigrateModal` 內所有原生 `<select>` 全換成 `CyberSelect`**（目標端點、資料路徑 IP、磁碟對應、NIC 對應）。`CyberSelect` 的下拉清單改用 portal 渲染到 `document.body`，座標固定、空間不足會自動翻上開 — 不會再被父層 modal 的 `overflow: hidden` 裁掉。
- **SPA fallback Cache-Control 修正**：所有回傳 `index.html` 的路由都加 `no-cache, no-store, must-revalidate`。之前 Chrome heuristic cache 會卡住舊的 `index.html`（指向已刪除的 `index-*.js` bundle），下一次部署後是空白頁。HTML 也加自我修復腳本：HEAD 檢查 bundle URL，404 就 force-reload。
- **縮圖 fetch 並發限制 6 個**：60+ 同時 fetch 撞到 Chrome per-origin 連線上限（`ERR_INSUFFICIENT_RESOURCES`）會吃掉一半請求。矩陣 effect 用 sliding-window pool 把同時間 in-flight 限 6 個，剛好對應 server `pve_throttle` 每 host 4 並發 + 50ms gap 的預算。
- **FLIP 重排位置改用 layout-relative**（沿 offsetParent 鏈累加 `offsetTop` / `offsetLeft`），不再用 viewport-relative 的 `getBoundingClientRect`。原本的做法在使用者捲動後遇到 2 秒 cluster broadcast re-render 時，會誤判每張卡都動了（其實是 viewport 位置變了）→ 觸發一波幻影動畫。
- **VMContextMenu 樣式跟著 component 走** — `.vm-context-menu` / `.context-menu-*` 的 CSS 移到 component 自己的 `<style>` 內，這樣 RadarScan、HoloMatrix、未來任何 host render 時都自動帶樣式。
- **帳號設定頁（`/account`）** — h2 區段標題（個人資料 / 變更密碼 / 雙因素認證）和主要按鈕都加 icon。

### 修正

- **儲存頁下拉超出 modal**：RemoteMigrateModal 內長 endpoint 清單會被 modal overflow 裁切。CyberSelect 改 portal 渲染後全面修好。
- **右上工具列按鈕變壞**：CSS class 撞名（HoloMatrix 又定義了 `.btn-icon`）把 App.tsx 的全域 pause / lang / user / settings 按鈕變成迷你版。把矩陣工具列內部 class 改名為 `.tb-ico` 避撞。
- **`<style>` template literal 被反引號截斷** — CSS 註解內出現 backtick 會中止 React component 的 template string，build 會在不相關的行號爆 `TS1381 / TS1005`。已在 CLAUDE.md 加「Recurring mistakes」一條警示。
- **CT 縮圖行距太擠** — pyte/PIL renderer 改用 ~1.45× 字級當作行高，終端機輸出可讀性恢復。

---

## [0.3.1] — 2026-05-07

### 新增

- **矩陣縮圖檢視** — 矩陣工具列新增第三個切換鈕。每台 VM 顯示成一張卡片，內含該 VM 即時 framebuffer 的截圖，由新增的 `GET /api/console/screenshot/{cluster}/{node}/{vmid}?max=N` endpoint 提供。後端用迷你 RFB 3.8 client（`server/vnc_screenshot.py`）跑 ProtocolVersion + VNC-Auth + ServerInit + SetPixelFormat + 一次 Raw FramebufferUpdate，再用 PIL 轉 PNG。Per-VM 10 秒快取 + single-flight dedupe，N 個分頁同時看不會 fan-out 成 N 次 vncproxy 呼叫。**為什麼：** 一眼看「每台 VM 現在到底是什麼畫面」，不再只有 CPU/MEM 直條圖。**驗證：** 矩陣工具列 → 第三個圖示 → 約 1–2 秒內出現 VM 截圖。
- **縮圖尺寸 slider**（160–640px），緊鄰檢視切換鈕，數值會 `localStorage` 持久化。slider 數值同時傳給 server 的 `?max=`，避免抓 1920px PNG 只為顯示在 200px 卡片裡。

### 變更

- **`pve_throttle` 現在也包到 `console_proxy.py` 的直接 vncproxy/termproxy POST**（不再只覆蓋走 `pve_client._request` 的呼叫）。長連線的 `vncwebsocket` upgrade 不限流 — 整個 console 工作階段佔住一個 per-host slot 會把其他所有 PVE 呼叫餓死。
- **`useDialogs` 取代殘餘的原生 `alert/confirm/prompt`** — `HoloMatrix`、`SnapshotsModal`、`SettingsPanel` 的呼叫站點全換掉。Cyberpunk 風格 modal、可 await、Chrome 不會鎖 focus。快照刪除 / 倒回 confirm 加上 `destructive: true`，dialog 渲染成警示色。
- **拿掉 console 選單「stored 模式但無密碼」的 client-side 阻擋。** 原本的客端檢查用 mount 時 fetch 的快取，在使用者於 Settings 設好密碼但沒 reload 頁面的情況下會 stale。現在改成讓 `/prepare` 回 412、由 dialog 顯示訊息，選單狀態永遠對。

### 驗證

- 後端測試：261 passed（1 個 `test_export_import_round_trip` 因 suite 隔離 race 偶發失敗，獨立跑就過，不是這次改動造成）。
- 端對端：對 host-108 vmid 171 的 noVNC 拿到 `RFB 003.008` banner、xterm 拿到 `OK` ack、screenshot 拿到 320×200 / 24KB PNG，三條都成功。

---

## [0.3.0] — 2026-05-07

### 新增

- **QEMU VM 的 noVNC 主控台** — Cyberpunk 風格頁面 `/console/{cluster}/{node}/{vmid}`、WS bridge `/api/console/.../ws`。noVNC 以 vendored 方式放在 `/assets/novnc/`，整條鏈不依賴外部 CDN（CSP 全 `'self'`）。一次性 2 分鐘 `console_token` + 110 分鐘 PVE ticket 快取。**為什麼：** 操作員不應為了開個 console 又另開 PVE web 分頁、再認證一次。**驗證：** 在 VM 右鍵選「主控台」→ 應顯示「已連線」、journal 看到 RFB banner。
- **LXC 容器的 xterm.js 主控台**（走 PVE `termproxy`，跟 PVE web UI 一致）。新頁面 `/console-term/{...}`、bridge `/api/console/.../term/ws`。xterm.js + addon-fit vendored 在 `/assets/xterm/`。Bridge 在 server 端處理 termproxy 的 `<user>:<ticket>\n` 認證 frame，瀏覽器看不到 ticket。**驗證：** 任一 LXC 右鍵主控台 → 出 shell 提示符、⌃C/scrollback 都正常。
- **noVNC 頁的「傳送按鍵」下拉** — Tab / Esc / Backspace / Super / PrintScreen，加上 Ctrl-Alt-Backspace 與 Ctrl-Alt-F1..F12（對齊 PVE noVNC 的 keyboard 選單）。
- **主控台視窗標題包含 VM/CT 名稱** — `<title>` 與 titlebar 都顯示 `VM <id> — <name>` / `CT <id> — <name>`，名稱透過 `?name=` 帶入。
- **加密密碼儲存**（Fernet AES-128-CBC + HMAC），master key 放 `/etc/jt-proxense/master.key`（chmod 600）。新增 CLI 子指令 `jt-proxense secret`：`set / get / rm / list / export / import / rotate-key / migrate-yaml`。設定 → 叢集面板新增「設定 / 更換 / 清除 PVE 密碼」按鈕。**為什麼：** stored 模式 console 用的 PVE root 密碼不應該明碼留在 `config.yaml`。
- **Per-host PVE API 限流**（`server/pve_throttle.py`）— async semaphore（每 host 預設 4 並發）+ 啟動間最小間隔 50ms，已接到 `pve_client._request`。**為什麼：** PVE 的 `pveproxy` 是單行程；無節制的 fan-out 會回 596 並把整個 cluster 卡住。
- **README 加完整 nginx HTTPS 反向代理章節** — 綁 localhost、HTTP→HTTPS 轉址、certbot、ufw，含 noVNC 專屬的 `proxy_buffering off` + `proxy_read_timeout 86400s`（缺一就會在 60 秒後凍住）。

### 變更

- **概觀頁的計數動畫只在首次掛載時跑**，後續即時資料直接 snap。原本每次 WS 更新會在 ~27 個元件上各起一條 60fps tween，瀏覽器 CPU 維持在 30–50%；改完同樣畫面待機在 1–3%。
- **`ParticleBackground` 上限 ~30fps**，粒子數 80 → 40，拿掉 canvas `shadowBlur` 雙重 fill（每 frame 最貴的一段）。
- **矩陣表格列分隔線**改用 `rgba(0,240,255,.08)` — 之前用未定義的 `--border-dim` 變數，整條 CSS 規則無效。
- **空標籤不再渲染成空 pill**（PVE 對只有分隔符的 tag 字串會回 `[""]`）。

### 修正

- **noVNC 一直以 WS code 1006 失敗。** 根因：aiohttp 的 `cookies={...}` 會把 cookie 值百分號編碼，但 PVE ticket 含 `+ / = :` 必須原樣送到 PVE — vncproxy 收到後靜默回 401。Bridge 改用 raw `Cookie:` header，vncproxy POST 與 `ws_connect` 都這樣送。另外，vncproxy 回的 ticket 同時也是 RFB 層的 VNC 密碼，原本傳空字串；現在 `/prepare` 階段就 mint 好、透過 URL fragment（`#vp=...`，不會進 server log / proxy 快取）帶到 console 頁，再餵給 noVNC `credentials.password`。
- **第一次顯示時 console 畫面太小** — noVNC 的 `scaleViewport` 要在收到 framebuffer init 後才知道遠端尺寸，所以 constructor 階段設沒效。改成 `connect` 事件內 toggle-and-reset，並在 `window.resize` 時重 fit。
- **雷達 tooltip 下緣文字被切掉**（先前全域 +1px 字級沒跟著調卡片高度）— 高度改 145 / 175。

### 安全

- **CSP**：console 頁面送出 `default-src 'self'; ... connect-src 'self' wss: ws:` — 無第三方來源、無 eval、無 inline event handler。noVNC 與 xterm.js 都 vendored。
- **PVE `vnc_password`** 走 URL fragment 進 console 頁；頁面讀完後立即用 `history.replaceState` 把 fragment 從網址列抹掉，避免 refresh / 旁觀者從網址欄取得。

### 驗證

- 後端測試：245 個全綠（132 秒）。
- 端對端：noVNC bridge 收到 PVE 的 `RFB 003.008\n`；xterm bridge 收到 termproxy 的 `OK` 認證 ack。

---

## [Unreleased] — v0.2 開發中於 `v0.2-auth` 分支

### 新增（預覽，僅在 feature branch，尚未進 `main`）

- **本機認證後端**：Argon2id 雜湊、32-byte session ID、12 小時滑動視窗、5 次/IP/5 分鐘登入失敗速率限制。預設關閉（`auth.enabled: false`），保留 v0.1 行為。
- **角色式存取控制**（RBAC）：三種角色 `viewer` / `operator` / `admin`，可逐叢集授權（`*` 表全域預設）。
- **稽核日誌**（SQLite，附加式不可改）：每個會變更狀態的 endpoint 寫一筆 — 使用者、時間戳、來源 IP、動作、參數雜湊（請求 body 本身**永不**存進來）、結果、請求關聯 ID。資料庫層 trigger 拒絕 UPDATE / DELETE。
- **緊急 CLI 後門** `/usr/local/bin/jt-proxense`（SOP §7.4 鐵則 — 任何可能鎖死操作者的功能必備）。子命令：`auth show / disable / set-local`、`user add / list / del`、`reset-password`、`config get / set / reset`。直接操作 SQLite + config.yaml，**不需要服務在跑**。
- **Cyberpunk 風格登入頁**於 `/login`（純 HTML + CSS，不用重 build React）。啟用 auth 時，匿名請求 `/` 會 302 導向 `/login`。
- **Forward-only SQL migration 機制**（`server/db.py`）：第一個 migration 建立 `users`、`sessions`、`roles`、`audit_log`、`failed_logins`、`schema_version` 等表。

### 變更

- **HTTP listener 改在 cluster polling 之前綁定**。v0.1 全新安裝若 PVE 不可達會等 ~12 秒才開始服務；現在 `/api/health` 與 `/login` 立刻可達。

### 規劃中（尚未實作）

- VM 操作端點（開機 / 關機 / 遷移 / console）— v0.3。
- ESXi 叢集支援（先唯讀）— v0.4。
- ESXi → PVE 分鐘級停機遷移（CBT 增量同步）— v0.5。

---

---

## [0.1.0] — 2026-05-05

首個公開釋出版本。

### 新增

- **六種視覺化畫面**：Dashboard 概觀、Nodes 節點（ECG 心電圖式指標）、Matrix 矩陣（VM 格）、Radar 雷達（異常偵測）、Storage 儲存（treemap）、Ceph（叢集拓撲）。
- **多叢集 polling**，每個叢集依 `priority` 順序做 API failover；單一節點異常不會拖累該叢集整體資料更新。
- **WebSocket 即時推送** — 用戶端取得叢集狀態增量，無須重新 poll。
- **一行 Linux 安裝腳本**（`install.sh`），具備：
  - 網路 preflight（github.com、pypi.org），離線時 8 秒內 fail-fast；
  - 偵測 apt / dnf / yum / pacman / zypper，自動安裝 `python3`、`pip`、`git`；
  - 建立專用 `jt-proxense` 系統使用者（無 shell、無 home）；
  - clone 到 `/opt/jt-proxense`、安裝依賴、跑一輪 runtime module 的 import smoke test，並把整棵樹 `chown` 給 service user；
  - 安裝強化的 systemd unit（`NoNewPrivileges`、`ProtectSystem=strict`、`ProtectHome` 等）；
  - 互動提示從 `/dev/tty` 讀取，因此 `curl … | sudo bash` pipe 也能正常互動。
- **強化 systemd unit**（`packaging/jt-proxense.service`），`User=jt-proxense`，限制檔案系統與 capability 範圍。
- **雙語文件** — 英文 `README.md`（預設）與 `README_zh-tw.md`，`CHANGELOG` 同樣兩份。
- **Apache 2.0** 授權；完整第三方依賴授權見 [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)。

### 安全提醒

此版本**刻意不含內建認證**。HTTP 監聽同時開放讀寫 API（`POST /api/config` 會直接覆寫執行時設定）。對外公開前請放在強制認證的反向代理後，或只綁定可信介面。詳見 README「Security」段。

### 已知限制

- 僅支援 Linux。
- 不支援子路徑反向代理掛載（如 `/proxense/`），服務必須掛在 `/` 根路徑。
- 前端 `dist/` 已 build 好放在 repo；如需重新 build 需要 Node.js 18+ 與 `npm install`。
