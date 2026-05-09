# 更新記錄

> English version: [CHANGELOG.md](CHANGELOG.md)

JT-PROXENSE 所有重要變動紀錄於此。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)，
版本號採 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

---

## [0.3.33] — 2026-05-09

### 修復

- **`npm run build` 完成後自動 vendor xterm.js / xterm.css / xterm-addon-fit.js** 到 `dist/assets/xterm/`。vite 還是會清掉資料夾，但複製步驟現在直接寫在 build script 裡，不再靠每次 build 後人工記憶（v0.3.28 / v0.3.32 兩次同步都忘了，導致 github mirror 短暫缺 xterm vendor 檔）。CLAUDE.md 對應更新。

---

## [0.3.32] — 2026-05-09

### 新增

- **`/audit` 加「僅顯示錯誤」過濾** — 篩選列加 checkbox，勾選後只顯示 `result` 以 "error" 開頭或 `result == "denied"` 的列。完全 client-side（過濾已抓回的列），跟其他篩選（使用者 / 動作 / 叢集 / 起迄 / 筆數）疊加使用，不重打 API。

---

## [0.3.31] — 2026-05-09

### 新增

- **NodeServicesModal 每行多了「日誌」按鈕** — admin 點服務旁的「日誌」開 NodeSyslogModal 並預先 filter 該 unit（例如點 `pveproxy` 旁的「日誌」開 syslog viewer 自動 `unit=pveproxy`）。免去 operator 手抄 unit 名稱貼到 syslog 過濾的步驟。

### 內部

- `NodeSyslogModal` 新增 `initialService` prop；`NodeServicesModal` 新增 `onShowLogs(service)` 回呼。ClusterCore 串接，per-service 細節跟整機 syslog 共用同一個 modal。

---

## [0.3.30] — 2026-05-09

### 新增

- **PVE API token 清單** (admin) — cluster-core 操作列加上 "API tokens" 按鈕，開啟 modal 列出整個叢集的 API token：使用者、token ID、privsep 旗標、到期日（過期紅色、剩 < 30 天橘色）、備註。可文字過濾。唯讀 — token 密碼建立後 PVE 不再回傳，輪替動作 UX 太敏感保留在 PVE web UI。

### 內部

- 新模組 `server/api_tokens.py` — 對每個使用者並行 fan-out `list_user_tokens()`。30 秒快取。
- `pve_client.list_users()` / `list_user_tokens()` 新增。
- 新元件 `src/client/components/APITokensModal.tsx`。

---

## [0.3.29] — 2026-05-09

### 新增

- **命令搜尋快速導航** — ⌘K 打 "health" / "tasks" / "backup" / "matrix" / "節點" / "備份" 等關鍵字，對應 nav 目標會出現在結果列上方（比實體 entity 比對加分 +30）。不需要再記某個少用 view 的快捷鍵字母。

### 內部

- `CommandPalette.tsx` 新增 `'action'` hit 類型（搭配 chevron 圖示）；每個 nav 目標多語別名。

---

## [0.3.28] — 2026-05-09

### 修復

- **沒裝 ceph 的節點不再每輪輪詢都吐 "PVE request failed" 警告** — 每次輪詢都會對沒跑 ceph 的節點打 `/ceph/status`，固定 500 帶 "ceph-mon binary not installed" 或 "pveceph configuration not initialized"。這些是*預期*狀態而非失敗。比對錯誤訊息把這類降為 debug，真正的錯誤仍維持 warning。混合叢集環境 journal 量大概可以少 60–80%。

---

## [0.3.27] — 2026-05-09

### 新增

- **通知通道 UI** — 設定 → 警示頁加上「管理通道」按鈕，開啟 CRUD modal：可新增 webhook（Slack / Discord / Mattermost / 一般）或 email 通道，個別啟停、刪除。包既有 `notifications_handlers.py` 的 admin endpoint。關閉之前只能用 API 或 shell 建通道的可見性缺口。

### 內部

- 新元件 `src/client/components/NotificationsModal.tsx`，不新增 server route。

---

## [0.3.26] — 2026-05-09

### 新增

- **瀏覽器分頁標題顯示警示計數** — `document.title` 現在會在有節點離線、儲存 ≥95%/85%、Ceph HEALTH_ERR/WARN、CPU/記憶體 >92% 等情況時加上 `(N🔴+M🟠)` 前綴，operator 開多個分頁時不需切到 jt-proxense 也看得到狀況。完全從 WS broadcast 的 cluster 資料即時計算（不打 API）。

---

## [0.3.25] — 2026-05-09

### 新增

- **服務啟動 / 停止 / 重啟 / 重載** — admin 現在可從 NodeServicesModal 操作 PVE 主機服務。每筆服務有 4 個動作按鈕（啟動 / 重啟 / 重載 / 停止）。關鍵服務動作（pveproxy / pvedaemon / pvestatd / corosync / pve-cluster / pve-firewall / pve-lxc-syscalld）以及任何 `stop` 動作都需破壞性確認對話框。回傳 PVE task UPID 可在 `/tasks` 追蹤。新 endpoint `POST /api/clusters/{cid}/nodes/{node}/services/{name}/{start|stop|restart|reload}`（admin-scoped、有 audit）。

### 內部

- `pve_client.node_service_action()` 新增；`node_inspect` 加上四個 POST handler（共用 `_do_service_action` helper）。
- NodeServicesModal 新增動作欄（僅 admin 顯示）；每個進行中動作有獨立 spinner。

---

## [0.3.24] — 2026-05-09

### 新增

- **批次標籤操作** — 矩陣表格的批次工具列（多選 VM/CT 後出現）新增「批次設定標籤」按鈕。Modal 支援三種模式：**加入**（合併進每台 VM 既有清單）、**移除**（從每台 VM 拿掉指定標籤）、**取代**（用新清單覆蓋）。建議標籤條從同叢集其他 VM 已用過的標籤撈。每台 VM 並行 PUT；結果列顯示成功/失敗數及前 5 個錯誤。

### 內部

- 新元件 `src/client/components/BulkTagModal.tsx`。沿用現有 per-VM tag PUT（`pdm_resources.tags_set_handler`），不新增 server route。

---

## [0.3.23] — 2026-05-09

### 內部

- **CLAUDE.md 更新** — Layout 區塊加上「Server modules」分類，把每個 `server/*.py` 依責任歸類（核心 / consoles / 唯讀檢視 / mutation / server-rendered pages）。Pending TODO 大改：v0.3.18→v0.3.22 已把唯讀檢視缺口都關掉，剩下的重新整理為 mutation UI 工作（HA / FW 寫入、VM 建立精靈、硬體編輯器、通知 channel CRUD、bulk tag、services start/stop）。修正一晚 15+ 個 minor 版本之後的 doc drift。

---

## [0.3.22] — 2026-05-09

### 新增

- **VM/CT 標籤編輯器** — VM 右鍵選單新增「編輯標籤」開啟 chip 風格編輯器：打字加入、Backspace 刪除、Enter / 逗號 / 分號送出。下方建議區顯示同叢集其他 VM 用過的標籤（按一下加入）。Operator+ 可編輯，viewer 唯讀並提示。包既有 `PUT /api/clusters/{cid}/vms/{vmid}/tags`（operator 層級、有 audit）。

### 內部

- 新元件 `src/client/components/TagEditorModal.tsx`。標籤名以 `[A-Za-z0-9_\-.]+` 驗證，對齊 PVE 的字元限制。

---

## [0.3.21] — 2026-05-09

### 新增

- **節點服務查看** — 節點右鍵選單新增「服務」，列出該節點上所有 PVE 主機服務（pveproxy / pvedaemon / pvestatd / corosync / pve-cluster …）以及狀態 badge（active / failed / inactive）。目前唯讀。
- **節點系統日誌查看** — 節點右鍵選單新增「系統日誌」，開啟 modal 顯示 `/nodes/{node}/syslog` 最後 1000 行。每 5 秒自動更新，可填 unit 篩選（如 `pveproxy`）以及自由文字搜尋。

### 內部

- `pve_client.get_node_services()` / `get_node_syslog()` 新增。
- `node_inspect` 加上 `services_handler` / `syslog_handler` 路由。
- 新元件 `NodeServicesModal.tsx`、`NodeSyslogModal.tsx`。

---

## [0.3.20] — 2026-05-09

### 新增

- **儲存效能圖表** — RRDChartModal 新增 `kind="storage"` 模式，讀 PVE `/nodes/{node}/storage/{name}/rrddata` 畫使用率（%）與已用 / 總量（bytes）。從儲存頁右鍵「效能圖表」進入。新 endpoint `GET /api/clusters/{cid}/nodes/{node}/storage/{storage}/rrddata`。

### 內部

- `pve_client.get_storage_rrddata()` 新增；`rrd_proxy.storage_rrd_handler` route 新增。

---

## [0.3.19] — 2026-05-09

### 新增

- **每叢集 OPS 備註** — admin 可編輯、viewer+ 可看的自由格式備註。常見用途：「PROD 叢集 — 上班時間不可重啟 host-101」「host-104 還在用舊 SSD，EOQ3 前要遷」。從 cluster-core 操作列（單一叢集模式）進入。SQLite 儲存，16 KB 上限。新 endpoint `GET/PUT /api/clusters/{cid}/notes`（viewer / admin），有 audit。

### 內部

- Migration `006_cluster_notes.sql` 新增 `cluster_notes` table。
- 新模組 `server/cluster_notes.py`、新元件 `src/client/components/ClusterNotesModal.tsx`。

---

## [0.3.18] — 2026-05-09

### 新增

- **HA / 複寫 / 防火牆 三個唯讀檢視 modal** — 從 cluster-core header（單一叢集模式）按鈕進入：
  - **HA 狀態 modal** — 即時 quorum / master / 各節點 LRM 狀態條 + HA 資源表（sid / 狀態 / 預期狀態 / 節點 / max_relocate / max_restart）+ HA 群組清單。Quorum 用綠/紅燈標示，狀態 pill 依 started / stopped / error / fence 上色。
  - **複寫作業 modal** — 列出每個 `pvesr` job：id / 目標節點 / 排程 / 最後同步 / 耗時 / 失敗次數 / 狀態。勾「僅顯示錯誤」過濾出 fail_count > 0 或 error 非空的 job。
  - **防火牆規則 modal**（cluster 層級用 cluster-core 按鈕進入；VM 層級用右鍵選單）— pos / 方向 / 動作 / 協定 / 來源 / 目的 / 埠 / 介面 / 啟用 / 備註。動作上色：ACCEPT 綠 / REJECT 橘 / DROP 紅。
- **健康監測卡片可點擊跳轉** — 點 HA 警示卡片現在開 HAStatusModal 並指定該叢集（之前是跳到 cluster-core 但沒 HA 細節）；複寫警示也一樣 → ReplicationModal。

### 內部

- 新元件：`HAStatusModal.tsx`、`ReplicationModal.tsx`、`FirewallModal.tsx`（透過 `scope` prop 同時支援 cluster + VM 層級）。
- 三者全部沿用既有 endpoint（`pdm_cluster.fw_*_list_handler`、`ha_view`、`pve_client.list_replication_jobs`），不新增 server route。

---

## [0.3.17] — 2026-05-09

### 修復

- **「主機 Shell」項目對非 admin 角色隱藏** — cluster-core 節點右鍵選單裡的「主機 Shell」現在只在 `auth.user.role_global === 'admin'` 時顯示。之前所有角色都看得到但 prepare endpoint 會回 403。與 VM 右鍵選單依角色隱藏寫入動作的做法一致。

---

## [0.3.16] — 2026-05-09

### 新增

- **資源池瀏覽器** — 節點頁（選單只選擇單一叢集時）右上會出現「資源池」按鈕，開啟 modal 列出 PVE 所有 pool，每筆可展開看成員（VM / CT / 儲存）的類型、id、名稱、節點、狀態。唯讀檢視；建立 / 刪除 已經在 `pve_client` 內，留給之後迭代。新 endpoint `GET /api/clusters/{cid}/pools` 及 `.../pools/{poolid}`（30 秒快取）。

### 內部

- 新模組 `server/pools_view.py`、新元件 `src/client/components/PoolsModal.tsx`。
- `pve_client.get_pool()` 新增。

---

## [0.3.15] — 2026-05-09

### 新增

- **HA + 複寫作業監測** — 健康監測現在會浮出：
  - **HA 資源狀態異常**：任何 HA-managed VM/CT 不在 `started`/`stopped` 穩定狀態時都會顯示（`error` → 嚴重；`fence` / `freeze` / `migrate` → 警告）。
  - **複寫作業錯誤**：任何 replication job 有 error 或 `fail_count > 0` 都會列出。
  兩者都用 on-demand 新 endpoint 拉資料：`GET /api/clusters/{cid}/ha/status` 和 `GET /api/clusters/{cid}/replication-jobs`。

### 內部

- 新模組 `server/ha_view.py` — HA / replication 唯讀檢視。把 PVE `/cluster/ha/status/current` 的混合 row 分成 `resources / masters / lrms / quorum`。兩者都 10 秒快取。
- `pve_client.list_ha_status()` / `list_replication_jobs()` 新增。
- 更新 `CLAUDE.md` Pending TODO list 反映 v0.3.5 → v0.3.15 期間關掉的所有項目。

---

## [0.3.14] — 2026-05-09

### 新增

- **APT 更新管理 modal** — NodeDetailPanel 的「待更新套件」badge 現在可以點，開 modal 列出該節點所有待更新套件（套件名 / 舊版 / 新版 / 分類）。Admin 角色看到 `apt update`（刷索引）和 `apt dist-upgrade`（升級全部）兩個按鈕，包現有的 `pdm_cluster` endpoint 並回傳 PVE task UPID。其他角色顯示唯讀狀態 + 提示。dist-upgrade 有破壞性確認對話框。

### 內部

- 新元件 `src/client/components/AptUpdatesModal.tsx`，不新增 server route — 沿用 v0.3.x 的 `pdm_cluster.apt_*` handler。

---

## [0.3.13] — 2026-05-09

### 新增

- **VM / CT 硬體檢視** — VM 右鍵選單新增「硬體 / 設定」開啟唯讀 modal：解析後的硬體設定 — 一般（cores / sockets / 記憶體 / OS / boot / BIOS / agent…）、磁碟（匯流排、卷、大小、選項）、網卡（型號、橋接、MAC、VLAN、防火牆 flag）、掛載點（LXC）、其他 config keys。等同於 PVE web UI Hardware 頁；編輯故意不開放（範圍太大）。新 endpoint `GET /api/clusters/{cid}/nodes/{node}/qemu/{vmid}/config` 和 `.../lxc/{vmid}/config`（15 秒快取）。

### 內部

- 新模組 `server/vm_config.py`、新元件 `src/client/components/VMConfigModal.tsx`。

---

## [0.3.12] — 2026-05-09

### 新增

- **命令搜尋（⌘/Ctrl+K）** — 跨所有叢集的全域 fuzzy 搜尋：VM / CT / 節點 / 儲存都吃。token-prefix scoring + substring fallback，最多顯示 30 筆，可鍵盤操作（↑↓⏎、Esc 關閉）。選中目標自動跳到對應 view 並切到該叢集。完全 client-side（吃 WS broadcast 的 cluster 資料），不增加 server 負擔。新元件 `src/client/components/CommandPalette.tsx`。

---

## [0.3.11] — 2026-05-09

### 新增

- **PVE 主機 Shell** — admin 可在 cluster-core 節點右鍵選單點「主機 Shell」直接開啟 xterm.js 終端到 PVE 節點主機（等同於 PVE web UI 的 Shell 按鈕）。沿用 LXC console 同款認證（`stored` / `prompt` 兩種模式），底下包 PVE 主機層級的 termproxy。僅限 admin — operator 拿到主機 shell 等同於拿到整個叢集，不開放給其他角色。Audited（`console.host.prepare` / `console.host.open`）。

### 內部

- 新模組 `server/host_shell.py`，沿用 `console_proxy.py` 的結構但走無 vmid 的主機路徑（`/nodes/{node}/termproxy` + `/nodes/{node}/vncwebsocket`）。複用 `console_sessions.mint_console_token(vmid=0, kind='host_term')`。WebSocket 握手同樣經 pve_throttle。

---

## [0.3.10] — 2026-05-09

### 新增

- **節點詳細面板新增三個 badge**：訂閱狀態（Active / status / None）、待更新套件數（有嚴重度上色）、最早一張憑證到期天數（過期變紅、< 30 天變橘）。三項都在面板開啟時 on-demand 拉取（沿用 0.3.8 的 endpoint），不影響 cluster 主輪詢。

---

## [0.3.9] — 2026-05-09

### 新增

- **每 VM 備份歷史** — VM 右鍵選單新增「備份歷史」開抽屜：掃描叢集裡每個可備份的儲存，列出所有 `vzdump-*-{vmid}-*` 檔：時間、距離（依老舊程度上色 fresh/aging/stale）、儲存、節點、大小、保護/驗證標記、備註。上方統計：備份數、總容量、最新一次（含時間距 pill）。新 endpoint `GET /api/clusters/{cid}/vms/{vmid}/backups`（30 秒快取）。
- **叢集系統日誌 modal** — `/tasks` 頁工具列新「叢集日誌」按鈕，點開 modal 顯示 `/cluster/log` 最後 500 行（等同 PVE web UI 「Cluster log」面板）。每 5 秒自動更新，可按訊息 / 節點 / 使用者 / tag 篩選，依 syslog priority 上色。新 endpoint `GET /api/clusters/{cid}/log`。

### 內部

- 新模組 `server/vm_backups.py`。檔名比對用 `-{vmid}-`，避免 vmid 12 誤中 vmid 1234。
- `pve_client.get_cluster_log()` 新增；`pve_tasks.cluster_log_handler` route 加在 task 旁邊（同樣是時間軸用例）。
- 新元件 `BackupHistoryModal.tsx`、`ClusterLogModal.tsx`。

---

## [0.3.8] — 2026-05-09

### 新增

- **健康監測**（`/health`）— 跨叢集即時聚合健康指標的單頁儀表板：節點離線、儲存 ≥85/95% 使用率、ceph HEALTH_WARN/ERR、CPU/記憶體 >92%、最近 24h 作業失敗、憑證即將到期（<60 天）、節點待更新套件數量。每張卡片可點擊直接跳到對應 view（節點 / 儲存 / Ceph / 作業）。上方有總覽統計：節點在線比、VM/CT 執行中比、儲存數。
- **備份排程查看頁**（`/backups`）— 從 `/cluster/backup` 拉取叢集層級 vzdump 排程的唯讀清單：排程時間、下次執行、目標儲存、對象（全部 / 池 / vmid）、模式、啟用狀態、備註。可依啟用狀態篩選。
- **PVE 作業 CSV 匯出** — 下載目前篩選結果為 CSV（UTC ISO 時間戳、duration 秒數），檔名含叢集 ID + 時間。
- **效能歷史圖表（RRD）** — 新增 `RRDChartModal`，後端三個新 endpoint（`/api/clusters/{cid}/nodes/{node}/rrddata` 加上 qemu/lxc 變體）拉 PVE RRD ring，前端用 inline SVG 繪 CPU / 記憶體 / 網路 / 磁碟 IO 時序圖（不引入圖表 lib，bundle 保持在 500 KB 警示線下）。時間範圍 1H / 24H / 7D / 30D / 1Y。VM 右鍵選單 (`vm.perf_charts`) 和 cluster-core 節點右鍵選單都接好了。
- **server-rendered 管理頁面視覺對齊 SPA** — `/account`、`/audit`、`/sessions` 改用跟 HoloMatrix / RadarScan / UserAdmin / PveTasks 同款 header（h1 + cyan icon + drop-shadow + pulse）。導覽按鈕也同款（Orbitron 全大寫 + cyan-soft hover ring），副標 mono 字。

### 內部

- 新模組：`server/backup_jobs.py`、`server/node_inspect.py`（憑證 / apt-update / subscription，60 秒快取）、`server/rrd_proxy.py`（30 秒快取）。
- 新元件 / view：`src/client/views/HealthMonitor.tsx`、`src/client/views/BackupJobs.tsx`、`src/client/components/RRDChartModal.tsx`。

---

## [0.3.7] — 2026-05-09

### 新增

- **`console_proxy.py` 的 WebSocket bridge 接上 pve_throttle** — `/console/.../vncws`（noVNC）和 `/term/ws`（xterm.js）的 `session.ws_connect(...)` 升級握手現在用 `pve_throttle.acquire(host)` 包起來，主控台連線啟動不會在繁忙時段擠掉其他 PVE 呼叫。橋接建立後馬上釋放 slot（不然 N 個同時開的主控台會把 4-slot semaphore 鎖死）。
- **Telegraf 資料餵進 cluster_manager** — `Cluster.get_data()` 在每個 node payload 上加 `telegraf` 欄位：`{measurement: 最新一筆 fields, …}`，從 influx ring buffer 取出。PVE node hostname 要跟 Telegraf 的 `host` tag 對得起來（agent 預設就是這樣）。完整樣本歷史仍走 `/api/telegraf/{host}` 給需要時間序列的 view。

### 變更

- **`backdrop-filter: blur()` 全面審查** — 把所有 10/12/16-px blur 砍到 6/8 px（視覺幾乎沒差，macOS Chrome 合成器負擔大幅減輕）。視窗失去焦點時全域關閉 `backdrop-filter`（延伸既有的 `data-app-visible="false"` 規則）。新增 `@media (prefers-reduced-motion: reduce)` 區塊：歸零所有 backdrop-filter、把 animation / transition duration 折成 0.01ms — 慢 Mac / 開了系統「降低動態效果」的使用者自動得到精簡版 UI，不需要我們做一個專屬「省電模式」開關。

### 內部

- pve_throttle 現在透明地涵蓋所有對外 PVE 呼叫類型（HTTP 經 `pve_client._request`、vncproxy/termproxy POST 在 `console_proxy._prepare`、vncws/term WebSocket handshake、lxc_thumb termproxy）。一個天花板、一個地方調。

---

## [0.3.6] — 2026-05-08

### 新增

- **PVE 作業 / VM 操作紀錄查看頁**（`/tasks`）— 新的頂層頁面，從 PVE `/cluster/tasks` 拉真實的 PVE 端作業（qmstart / qmshutdown / qmsnapshot / qmrestore / vzdump / qmigrate / vncproxy 等），用 matrix 風格的表格顯示。可依叢集、類型、狀態（進行中 / 成功 / 錯誤）、VMID、使用者篩選。點擊列開啟側邊抽屜顯示完整作業日誌（從 `/nodes/{node}/tasks/{upid}/log` 串），作業進行中時每 2.5 秒自動更新。VM 右鍵選單新增 **「作業紀錄」** 直接帶 `/tasks?vmid=…&cluster=…` 跳轉。與 `/audit` 區別：audit 紀錄 *JT-PROXENSE 自己做了什麼*，這個顯示 *PVE 端真實發生了什麼*，包含其他人經由 PVE web UI / pvesh / API 進行的動作。
- **主控台貼上 → 模擬鍵盤輸入** — noVNC 主控台 toolbar 新「貼上」按鈕：開啟對話框，貼/輸入 ASCII 文字後，透過 `RFB.sendKey()` 重放成鍵盤事件。三檔速度（5 / 15 / 40 ms 字元間延遲），明確標註僅支援 ASCII（CJK / Emoji 無法表達為 RFB 鍵盤通道的 X11 keysym）。`Ctrl/⌘+Enter` 送出、Esc 關閉。
- **OCR 語言選單**位於主控台 toolbar：中+英 / English / 繁中 / 简+英 / 简中 / 日本語（依 host 的 `tesseract --list-langs` 動態提供），存於 `localStorage['ocr_lang']`。預設 `chi_tra+eng` 給台灣常見的中英混雜畫面。
- **OCR overlay 浮動提示** — 拖拉模式啟動時，畫面正中浮一個橘色提示「請避開進度條」約 3 秒後淡出。
- **OCR bar 雜訊過濾** — server 端前處理改成先 4× LANCZOS 放大再灰階+autocontrast（原為 3× 於 binarization 後），拿掉硬 threshold 140（Tesseract 4 內部的 Otsu 二值化在灰階上比 1-bit 圖更準），加上 `--psm 6 --oem 1 -c preserve_interword_spaces=1`。client 端則做逐行過濾：任何一行中垂直筆劃字元（`|`, `I`, `H`, `U`, `戰` 等）佔非空白字元 ≥75%（且字元數 ≥10）的整行被視為 bar-chart 雜訊丟棄；toast 黃色顯示「已過濾 N 行疑似進度條」。

### 變更

- **window blur 也算「不可見」** — App 與 ParticleBackground 現在也會在 `window.blur` 時暫停（不只 `document.visibilityState === 'hidden'`）。macOS Chrome 把瀏覽器丟到背景但未最小化時，visibility 仍是 `visible`，原本程式持續燒 CPU/GPU。粒子數從 40 → 18 顆，fps 從 30 → 20（慢漂粒子視覺差異無感）。
- **主控台 toolbar 按鈕全部加 inline icon**（CTRL-ALT-DEL / 重新連線 / 全螢幕 / 貼上 / OCR / 傳送按鍵 ▾），OCR 拖拉 overlay 改成覆蓋整個 viewport（滑鼠跑出 canvas 也收得到事件，rect 視覺自動 clamp 到 canvas 邊界；原本拖出去就卡住）。
- **StorageDetail 動作欄寬度** 從 60 px → 96 px 並加 `white-space: nowrap`，下載 + 刪除兩個 icon 不再換行。
- **UserAdmin 對比修復** — 副標題、"新增本機帳號" 標籤、上次登入欄等字色從 `--text-muted` → `--text-secondary`，深色底比較看得清。

### 修復

- **主控台 JS 未執行** — `server/console_page.py:_TEMPLATE`（Python `"""..."""` 區塊）裡的 `'\r'` / `'\n'` / `'\t'` 被 Python 解釋成實際 CR/LF/Tab 寫到輸出 HTML，造成 JS 字串字面值斷裂、整個 module 沒跑、頁面卡在「正在開啟到 PVE 的連線通道…」server 沒任何錯誤訊息。要 double-escape；CLAUDE.md 已加為新的 recurring trap。
- **OCR overlay 位置偏移** — canvas 在 `#screen` 容器內被 padding/置中時，原本 rect 用 canvas 相對座標但 overlay 位置是螢幕容器相對。改成 overlay 直接 `position: fixed` 蓋在 canvas bounding rect 上，drag clamp 到 canvas 邊界。

### 內部

- 新增 `server/pve_tasks.py` 模組，每叢集 5 秒快取避免 panel re-render 把 pveproxy 打爛。新增 `src/client/views/PveTasks.tsx` view，沿用 matrix vm-table 的視覺。
- CLAUDE.md「Recurring mistakes」加第 4 條：JS 寫進 Python 字串模板時 escape sequence 要 double-escape。

---

## [0.3.5] — 2026-05-08

### 新增

- **noVNC OCR 文字複製** — 在 QEMU 主控台拖拉矩形 → server 端 `tesseract`（系統 binary，安裝一次：`apt install tesseract-ocr tesseract-ocr-chi-tra` 即可支援繁中）→ 辨識後文字自動寫入剪貼簿。新增 endpoints：`GET /api/ocr/langs`（viewer）、`POST /api/ocr`（operator）。預設語言 `chi_tra+eng`，依 `localStorage['ocr_lang']`。8 秒硬性超時、圖片 8 MB 上限。如同其他 operator 動作均寫入 audit log。

### 為何如此設計

- 用 server 端而非 `tesseract.js`：每個瀏覽器要下載 ~10 MB wasm+JS 對偶爾用的功能不划算；系統 tesseract 用 `apt` 管理語言包；速度比 wasm 快；每次 OCR 都進 audit log（含叢集 + VM 上下文）。

---

## [0.3.4] — 2026-05-08

### 新增

- **儲存從網址下載** — `POST /api/clusters/.../download-url` 包 PVE 的 `download-url` 端點。StorageDetail 介面新增 modal，可填 URL、檔名、選填 checksum、TLS 驗證開關。operator+ 權限。
- **儲存上傳** — 瀏覽器到 PVE 的 multipart 串流代理。前端 modal 含拖拉、進度條、內容類型驗證。App 的 `client_max_size` 提到 16 GiB，handler 直接串流不落地，多 GB 的 ISO 沒問題。operator+ 權限。
- **儲存 SSH 下載** — PVE 沒有原生檔案下載 API，`GET .../storage/.../download/{volid}` 用 `asyncssh` 連到該儲存所在節點、`pvesm path` 解析路徑、`cat` 串流回 client。每個 cluster 新增 `ssh_user`（預設 `root`）/ `ssh_port`（預設 `22`）設定。Operator 需要先把 jt-proxense host 的公鑰部署到每台 PVE node 的 `authorized_keys`。
- **批次操作 UI** — 矩陣表格新增多選欄位。勾選 ≥1 列時，sticky cyber 工具列出現可批次：開機 / 關機 / 重啟 / 強制停止。混選 VM/CT OK（既有 `vm_bulk_handler` 會自動辨識）。Per-cluster 分發 + per-cluster 結果摘要。
- **使用者管理頁** `/users`（admin only）— 列出 / 建立 / 啟停 / 刪除本機使用者；重設密碼（強制下次登入變更）；清除 2FA；per-user 角色授權（cluster + VM-pattern 三元組）。對應 API 在 `/api/admin/users/...`。
- **AD / LDAP 認證後端** — 設 `auth.backend: ldap` + `auth.ldap.{server, bind_dn|user_dn_template, group_role_map, ...}` 即可委派密碼驗證給 AD/LDAP。每次登入會依據群組成員自動授權角色。本地表的 `*LDAP*` sentinel 密碼雜湊確保 local 後端永遠不會配對成功。CLI 後門永遠走 local 後端，AD 連不上時 operator 可救援。
- **矩陣子路徑路由** — `/matrix/grid` / `/matrix/table` / `/matrix/thumb` 切檢視會寫回 URL、初始載入會從 URL 解析。`/storage/tanks` / `/storage/treemap` 同樣支援。

### 變更

- **InfluxDB 接收器：僅支援 v2。**（已在 0.3.3 出貨，本版同時 fast-forward 到 main。）
- **所有頁面表格表頭對齊矩陣 `vm-table` 樣式** — Orbitron 14px、0.05em letter-spacing、secondary 字色、sticky thead、無圓角外框。Server-rendered 的 `/audit` 與 `/sessions` 也同步調整。
- **儲存詳細頁籤亮度** — 原 `text-secondary` 太暗（依使用者回報），現在改 `text-primary`，hover 變 cyan `primary`。
- **雷達 context-menu「檢視細節」不再導去 `/matrix`** — 改為高亮對應雷達點（呼叫 `handleAnomalyClick`）。
- **`pve_throttle` 套到 `lxc_thumb.py`** — LXC 縮圖路徑的 termproxy POST 現在走 per-host 並發池，避免縮圖一次大量 fetch 餓死其他 PVE 呼叫。
- **`useDialogs` 遷移收尾。** `src/client/` 內已無任何 native `alert/confirm/prompt`。

### 修正

- **`.btn-icon` class 撞名** — App.tsx 已用該名字當 header 純 icon 按鈕；矩陣工具列重複定義會把全域 pause / lang / user / settings 按鈕變成迷你版。改名為 `.tb-ico`。
- **Console-disabled 狀態 stale** — 已驗證路徑：client 不再在 `no_stored_password` 階段做客端阻擋；`/prepare` 回 412 由 dialog 顯示，stale localStorage 不再造成假象。

---

## [0.3.3] — 2026-05-08

### 變更

- **InfluxDB 接收器：v2 唯一支援。** 舊的 `/write`（v1）端點已移除。Telegraf agent 請改用 `outputs.influxdb_v2` 寫入 `/api/v2/write`。Handler 現在讀取 `precision`（ns/us/ms/s）、`org`、`bucket` query 參數；不論 agent 用什麼精度，timestamp 一律正規化成 ns 存進快取。Auth 仍然用 `Authorization: Token <t>`。誤連 v1 的舊 agent 現在會收到乾淨的 `404`，不再有偽成功。

### 備註

- 本次同時把整個 `v0.3.2` 內容 fast-forward 進 `main` 分支（先前只在 `v0.2-auth`），GitHub 公開首頁不再顯示卡很久的 `v0.1.0` README。

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
