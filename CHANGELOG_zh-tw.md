# 更新記錄

> English version: [CHANGELOG.md](CHANGELOG.md)

JT-PROXENSE 所有重要變動紀錄於此。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)，
版本號採 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

---

## [0.6.4] — 2026-06-03

### 變更

- **節點畫面預設改為即時心電圖。**「波形範圍」現在預設停在 **即時**
  而非 24 小時。持久化 key 一併升版(`jtp.nodes.timeframe` →
  `jtp.nodes.timeframe.v2`),讓既有瀏覽器(先前自動存了舊的 24 小時
  預設)真的吃到新預設;之後的選擇會在新 key 下照常記住。

### 修正

- **訂閱「管理」與憑證「立即更新」按鈕對比不佳。** 兩者沿用了綠色
  `ok` 狀態徽章樣式又加上青色外框(綠字配青框,看起來像狀態標籤而非
  按鈕)。現在改用專屬的填色動作按鈕樣式(實心青底、深色粗體字),
  對比清楚、明顯是可點的按鈕。

---

## [0.6.3] — 2026-06-03

### 新增

- **節點畫面找回即時心電圖。**「波形範圍」選擇器在 RRD 時間窗
  (1 小時 / 24 小時 / 7 天 / 30 天 / 1 年)之外新增 **即時** 選項。
  選取後,每張節點卡會顯示由即時 WebSocket 指標餵入的動態心電圖
  (CPU / MEM / IOW)—— 即 v0.5.3 之前的行為;其餘時間窗仍維持歷史
  RRD 走勢圖。選擇會記在 `localStorage`(`jtp.nodes.timeframe`)。

### 修正

- **側邊欄版本號被寫死成 `v0.4.0`。** 現在改讀建置時注入的
  `__APP_VERSION__`(來自 `package.json`),側邊欄會顯示實際執行的
  版本,而非歷次版號 bump 都沒更新到的舊字面值。

---

## [0.6.2] — 2026-05-29

### 新增

- **不疏散（in-place）主機升級模式。** 主機升級精靈的「VM 疏散
  目標節點」步驟,在自動 / 手動之外新增第三種:**不疏散**。不再把
  客體線上遷移到其他節點,而是把該主機上執行中的客體正常關機
  (ACPI),主機跑 `apt dist-upgrade` 並重開機,完成後再把原本在跑
  的客體在原機上重新開機。會有短暫停機,但不需要其他節點有餘裕
  容量 —— 適合節點容量吃緊的叢集,或可接受停機的維護時段。此模式
  下「遷回原節點」會隱藏(沒有客體離開主機)。客體若無法正常關機
  會中止該主機;若客體在重開機時已被 `onboot=1` 自動啟動,則記錄
  事件而不視為失敗。

---

## [0.6.1] — 2026-05-29

### 新增

- **`jt-proxense unlock` CLI 指令。** 清除單一 IP 的登入限流
  (`failed_logins`),讓被「嘗試次數過多，請稍後再試」鎖住的
  operator 不必等滿 5 分鐘視窗就能再次登入。`--ip <ip>` 解除單一
  IP、`--all` 解除全部、不帶參數則列出目前被記錄的 IP。不需服務在
  跑即可使用(離線可用),並寫入稽核 `auth.unlock`。此指令只重置
  限流計數,**絕不更動密碼**。已在 README 與 Pages 網站的緊急
  鎖死復原段落補上說明。

---

## [0.6.0] — 2026-05-29

批次主機升級協調器,連同先前卡在它後面的 PBS 感知備份與依客體
設定驅動的主控台功能。將 v0.5.3 候選的 UI 改進一併以此版發布。

### 新增

- **批次主機升級協調器。** 滾動式逐主機作業:疏散客體 → SSH
  執行 `apt dist-upgrade` → 管理者確認重開機 → 選擇性遷回。狀態機
  持久化於資料庫(migration `007_host_upgrade.sql`),daemon 重啟可
  確定性處理。apt 以非互動模式搭配 `--force-confdef --force-confold`
  執行,dpkg 不會卡在設定檔提示。所有變動僅限管理者;每一步皆稽核。
- **PBS 感知備份視窗。** 選取的儲存為 PBS 時,隱藏每檔
  `compress`(PBS 為區塊級去重),並顯示 PBS 相關選項:
  `notes-template`、`protected`、`mailto` + `mailnotification`。
  儲存清單依名稱去重,共享儲存不再每節點重複一列。
- **依設定驅動的主控台選單。** 客體設定有 `serialN` 才出現 VM
  序列埠 xterm;`vga` 為 qxl / virtio-vga 才出現 SPICE。選單開啟時
  抓取客體設定並短暫快取。
- **/nodes 真實 RRD 走勢圖**,時間範圍可選(預設 24 小時,存於
  localStorage),取代原本的合成波形。
- **VM 設定視窗的磁碟/網卡新增+刪除、ISO 掛載/退出。**
- **右鍵選單高度處理** —— 長選單量測後翻轉、超出時可捲動。

### 修正

- **主機升級狀態機。** operator 選「skip」現在記錄終態 `skipped`
  (原本錯記為 `done`);遷回失敗現在將主機標為 `failed` 而非
  `done`,留在目標節點的客體不再被當成乾淨完成回報;遷回過程崩潰
  只隔離該主機,不再中止整個作業。
- **主機升級 daemon 重啟安全性。** daemon 重啟後發現處於進行中
  狀態的主機,現在標為 `failed`(需人工檢視)而非盲目重跑——重跑
  會從頭重複具破壞性的疏散/遷移。已於 `tests/test_host_upgrade.py`
  補上回歸測試。
- **維護視窗目標節點下拉**在單叢集模式下正確帶出(叢集資料查找
  會從 `clusters` map 退回單一 `cluster` prop)。

---

## [0.5.2] — 2026-05-20

安全強化版本：導入 OWASP Top 10（追蹤 2025 修訂）的發版前審查機制、
補上一個被遺漏的 backup verify audit、修一個 task-status polling 的
未授權漏洞、把文件與測試中看起來像真實設備名稱的字眼清洗乾淨。

### 新增

- **OWASP Top 10 發版前檢查清單**（`RELEASE_CHECKLIST.md` §3.5）+
  自動 grep regression scanner。新指令：
  `bash scripts/security-audit.sh /path/to/repo --owasp`
  跑 A01（每個 `*_handler` 都有 `@role_required` 或 delegated role
  check）、A03（migrations 以外無 `execute(f"…")` SQL、無 `subprocess
  shell=True`）、A05（沒有 `DEBUG=True`、沒有 CORS wildcard）、
  A09（每個 POST/PUT/DELETE/PATCH handler 都有 `audit.write` 或
  delegate 到已知的 auditing helper）。A01/A03/A05 為硬失敗；A09
  輸出警告清單。其他六項在清單中由人工逐條簽核 — 任何判斷請記在
  該版本 CHANGELOG Security 段。每次 push 前**強制**跑一輪。

### 修正

- **`backup.verify` 沒有寫 audit。** `verify_backup_handler` 是會觸碰
  儲存的近似管理動作（PBS chunk index 走訪、檔案讀取），先前版本
  完全沒進 audit log。現在成功 / PVE 失敗兩條路徑都會以 `backup.verify`
  + volume id 寫入 audit。
- **`task_status_handler`（PVE 任務輪詢）沒有角色檢查。** 任何已登入
  使用者 — 包含 session 過期但仍持 cookie 的、沒有任何角色授權的
  人 — 都可以直接打 URL 輪詢 PVE 任務 UPID。已加上
  `@role_required("viewer")`，與其他唯讀 handler 一致。

### 安全性

- **移除文件與測試中真實實驗室節點 / VM 的識別字串。** CHANGELOG
  裡寫過 E2E 驗證跑在哪台節點哪個 vmid 的描述改為「a real PVE 8
  cluster node」；cluster-notes docstring 範例從看起來像真實的
  `host-101` / `host-104` 換成明顯虛構的 `pve-prod-01` / `pve-edge-04`；
  `tests/test_pdm_remote_migrate.py` 的 fixture cluster id 從操作者
  實際的單節點主機名改為 `remote-cluster`；`pdm_remote_migrate.py`
  一行註解改為描述通則而不點名特定主機。**從來沒有客戶或操作者
  憑證**進過公開 repo；這次清洗是把識別性的實驗室設備名一併移除。

---

## [0.5.1] — 2026-05-15

v0.5.0 上線後的視覺＋效能修正補丁。

### 修正

- **作業記錄（`/tasks`）每 5 秒刷一次造成畫面閃爍，同一個 task 偶有
  重複列出。** 自動更新從 5 秒拉到 15 秒（操作記錄本來就不是秒級即時
  儀表）；伺服器回應在前端依 upid 去重，並只在 upid/狀態 signature
  真的有變動才 setState — 大多數 poll 都是 no-op，不再造成 125 列
  反覆 re-render。
- **健康監測徽章紅／橘文字看不清。** 原本徽章直接拿飽和色（`#ff0040`
  / `#ff6b00`）當文字色，配上深底色背景時對比太差。改為「淡色文字 +
  深色 tinted 背景 + 飽和邊框 + 發光小圓點」配色，三種等級都清楚可讀。

### 變更

- **`neon-breathe` 卡片脈動動畫力道大幅調弱。** 原本 keyframe 疊了四
  層 box-shadow 寬到 40px，套用 panel-card 的卡片（概觀叢集卡 / 底部
  四面板 / Ceph 子面板）看起來像在發強光，跟上方靜態薄框 stat tiles
  視覺重量差太多。改為「微弱的內側光暈 + 邊框 opacity 小幅變化」，
  卡片仍然有「活著」的感覺但不再壓過鄰居。
- **登入頁標語** 從「Cyberpunk PVE Monitor」／「賽博龐克 PVE 監控」
  改為「Sci-fi Visual Dashboard」／「科幻視覺看板」。

---

## [0.5.0] — 2026-05-13

UX 打磨 + 新功能版本：品牌識別更新、新增矩陣熱度檢視、跨頁面樣式一致性
全面整理，並導入 Playwright 視覺驗證流程。

### 新增

- **矩陣熱度檢視**：第四種檢視模式（`/matrix/heatmap`），每個 VM 一橫列、
  30 個依 CPU 負載著色的小方格（idle → 綠 → 黃 → 橙 → 紅）。WS tick
  累積環狀緩衝，鍵以 `叢集/節點/vmid`；**首次進入時用當下值預填全部
  buckets**，避免要等 2.5 分鐘才能看到完整資料。橫列加微弱條紋與 hover
  反白，底部附色階圖例。靠最右側的第四顆 view-toggle 按鈕切換；位置存
  localStorage 與 URL sub-path（`/matrix/heatmap`）。
- **效能圖 hover 十字線 + 提示卡**：`RRDChartModal` 滑鼠停在圖上會出現
  垂直引導線 + 每條 series 一個小點，搭配青邊提示卡顯示時間戳記與各
  series 的格式化數值。提示卡到中線右側會自動翻到左側顯示，不會被裁切。
- **時間範圍切換動畫**：在 1h / 24h / 7d / 30d / 1y 之間切換時，四張
  圖卡會做 0.32s 帶位移的淡入動畫（透過 `key={tf}` 重新掛載 + CSS
  keyframe），不再是硬切。
### 變更

- **品牌 Logo 換新**：移除原本的寬幅 PNG 文字標，改為 SVG 圖示（六角形
  感測器標靶）＋ CSS 文字標（Rajdhani 字型）成對結構。圖示從 16px
  favicon 縮放到 36px 側欄圖示都清晰；側欄收合到 64px 時，文字標會
  淡出折疊，不再溢出。Favicon 同步更新。
- **概觀儀表板改版**：新增六顆 hero stat tiles（線上節點 · 運作中虛擬機
  · 運作中容器 · 叢集負載 · 進行中告警 · 運行時間），擺在原有的儀表
  上方；底部新增四面板區（節點 CPU 條 · 儲存容量 · 進行中工作 · 告警）。
  Tiles 與底部區塊跟頁面其他段落共用 1400px max-width，在寬螢幕也對齊。
- **跨頁面樣式一致性整理**：所有 view 改用標準 panel-card 容器樣式
  （135° 漸層背景、primary-dim 框線、`neon-breathe` 動畫、頂端強光條
  與動態 scan-line、Orbitron 大寫字頭青色發光）。受影響：`ClusterCore`
  節點卡與節點詳細彈窗、`HoloMatrix` 縮圖卡、`HealthMonitor` 告警卡
  （保留事故等級色左側 3px 軌道為刻意例外）、`CephConstellation`
  OSD 矩陣與 I/O 波形面板，以及 `/tasks` 與 `/backups` 的表格區
  （新加上 `.panel-card` 外殼）。`.panel-card` 等 utility class 加進
  `styles.css` 給後續沿用。
- **原生 `<select>` 全部換成 CyberSelect**：`/tasks` 篩選列（叢集 /
  類型 / 狀態 / 使用者）與 `/backups`（叢集 / 狀態）。SPA 不再有
  瀏覽器原生下拉外觀的元件。
- **對話框按鈕加 leading SVG icons**：VMCloneModal / VMMigrateModal /
  VMDeleteModal（取消 × / 複製 / 遷移箭頭 / 垃圾桶）以及 VMConfigModal
  （編輯鉛筆 / 取消 × / 套用打勾），按鈕本身改用 inline-flex 對齊。
- **VMConfigModal 字體與排版**：欄位標題改為 11px Orbitron 大寫＋
  `.08em` letter-spacing，inputs 12→13px、加大 padding 與 focus 光暈；
  表格 header 10→11px 青色、cell 12→13px；section title 青色＋發光
  並加粗下緣線。Grid 間距加大讓欄位舒展。
- **側欄 wordmark 改用 Rajdhani** 字型（Orbitron 太寬會被截斷），現在
  「JT-PROXENSE」可以乾淨地放進 230px 側欄。

### 修正

- **矩陣表格檢視全黑畫面** — `TagSelectorBar` 因為某些 VM 的 `tags`
  欄位回傳的是陣列而不是分號字串，`o.split is not a function` 在 React
  渲染時直接炸掉整個 table view。現在依輸入型態先 flat-map 成 string[]
  再 split。
- **遷移對話框目標節點下拉空白** — 獨立節點型叢集（單節點）現在顯示
  停用的 placeholder 「— 此叢集沒有其他節點可遷移 —」，不再讓操作者
  以為對話框壞了。
- **VM/CT 右鍵選單在視窗邊緣被裁切** — 開啟後實際量測 menu 的 bounding
  rect，靠右靠下都會自動翻轉位置，無論項目多少都會留在視窗內。
- **OSD apply-vs-commit scatter 的 tooltip 被裁切**（圖卡右側/底部）
  — 量測後翻到相反方向顯示。
- **重疊在同一座標的 OSD 點看不到** —（例：15 顆 OSD 都在 apply=1ms,
  commit=1ms 渲染成一顆）— 同座標的點現在會被分組，半徑依數量遞增，
  提示卡會列出每一顆 OSD ID 與所在 host。

### 安全性

- **移除文件與腳本中寫死的 admin 密碼**：CLAUDE.md 與 `bin/jt-proxense`
  不再建議 `TestPass123!`；需要 admin 認證的腳本改從環境變數
  `JT_ADMIN_PASS` 讀取，沒設就拒跑。CLAUDE.md 補上「不要自動 reset
  admin 密碼」明確規則，避免文件預設值與實際營運密碼撞號鎖死帳號。

---

## [0.4.0] — 2026-05-09

里程碑版本：一次清掉全部 TODO 並完成 OWASP Top 10 全面安全檢核。

### 新增

- **PVE API token 建立 / 撤銷**（admin）。v0.3.30 的列表 UI 加上「+ 建立」
  表單（privsep / 到期 / 備註）與每列「撤銷」按鈕。新建 token 的 secret
  以單次顯示面板呈現，內含複製按鈕與「PVE 不會再回傳此密碼」警告。
  Server 端以 `userid` / `tokenid` 嚴格 regex 驗證輸入，每次建立/刪除
  都寫稽核。
- **VM 硬體編輯器**（operator+）。VMConfigModal 可編輯純量欄位（核心數
  / 記憶體 / 開機順序 / agent / 標籤 / 描述 / 每張網卡 bridge+vlan+
  firewall）並支援磁碟擴容（僅接受 `+N GB`，server 拒絕絕對大小避免
  靜默縮容）。套用前顯示 diff modal，明確列出將變更的欄位。
- **VM / CT 建立精靈**（operator+）。叢集核心操作列新增「+ 新建」按鈕，
  五步驟對話框：類型（QEMU/LXC）→ OS 映像 → 硬體 → 網路 → 檢視。所有
  欄位以 allow-list regex 在前後端雙重驗證；最終送出時稽核僅紀錄非機密
  欄位的 hash（密碼 / SSH 公鑰永遠不進稽核紀錄）。
- **防火牆寫入 UI**（admin）。FirewallModal 加入「+ 新增規則」inline
  表單（叢集與 VM 兩種範圍）與每列刪除按鈕。Server 端嚴格驗證 source /
  dest / proto / dport / sport / comment。
- **HA 寫入 UI**（admin）。HAStatusModal 新增「+ 新增資源」（sid / 群組
  / 狀態 / 備註）與每列刪除。Server 端強制 sid 必須是 `vm:<id>` 或
  `ct:<id>`。
- **ESXi 一等叢集（v0.4 唯讀預覽）**。新 `server/clusters/` 子模組，
  抽象 `ClusterAdapter` 介面，`ESXiAdapter` 透過 vSphere REST API
  運作。config.yaml 每個叢集多了 `type: esxi`；ClusterManager 與 PVE
  叢集並列輪詢，快照合併進 `/api/clusters`。可變更操作為 v0.5 範圍。

### 安全（OWASP Top 10 檢核）

- **A02 / A07** Influx receiver 的 token 比對改為時間恆定
  （`hmac.compare_digest`）；同來源 IP 連續 auth 失敗會在 WARN 等級
  曝光。
- **A05** Influx receiver 啟動時若綁在非 loopback 介面又沒設定 token，
  會印出 SECURITY 警告。
- **A05** session cookie 在 HTTPS（含 `X-Forwarded-Proto`）下自動
  加 `Secure` 旗標。
- **A05** HSTS（`max-age=31536000; includeSubDomains`）只在 HTTPS
  請求下發出。
- **A03 / A05** vm_config PUT 與 vm_create POST 都加上 16 KiB 與
  ≤32 欄位的硬上限；可編輯欄位採 reject-by-default 的 allow-list。
- **A10 / A09** storage download-url 限定 http(s)，檔名拒絕 `..`/`/`/
  NUL/>255；URL 內嵌 credentials 在進稽核 hash 前先剝除。
- **A03** pdm_cluster 防火牆 + HA 寫入欄位皆以嚴格 regex allow-list
  在送 PVE 前驗證。

### 內部

- 新增 `server/vm_create.py`（精靈後端）。
- 新增 `server/clusters/{__init__,base,esxi}.py` 多 hypervisor 抽象
  scaffolding。
- `pve_client` 補上 create_user_token / delete_user_token /
  vm_resize_disk / ct_resize_disk / ct_update_config /
  list_node_storages / cluster_next_vmid / create_qemu / create_lxc。

---

## [0.3.34] — 2026-05-09

### 新增

- **通知規則 CRUD** — v0.3.27 的通道單獨存在沒人引發。設定 → 通知 modal 多了一段：新增規則（名稱 + 動作 pattern + 最低嚴重度 + 叢集過濾 + 對應通道）、啟停切換、刪除。包既有 `notifications_handlers.py` admin endpoint，這次是把 UI 缺口補上。

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

- **每叢集 OPS 備註** — admin 可編輯、viewer+ 可看的自由格式備註。常見用途：「PROD 叢集 — 上班時間不可重啟 pve-prod-01」「pve-edge-04 還在用舊 SSD，EOQ 前要遷」。從 cluster-core 操作列（單一叢集模式）進入。SQLite 儲存，16 KB 上限。新 endpoint `GET/PUT /api/clusters/{cid}/notes`（viewer / admin），有 audit。

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
- 端對端：對一台真實 PVE 8 cluster 節點的 noVNC 拿到 `RFB 003.008` banner、xterm 拿到 `OK` ack、screenshot 拿到 320×200 / 24KB PNG，三條都成功。

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
