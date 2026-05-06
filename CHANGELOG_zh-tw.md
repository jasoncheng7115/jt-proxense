# 更新記錄

> English version: [CHANGELOG.md](CHANGELOG.md)

JT-PROXENSE 所有重要變動紀錄於此。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/)，
版本號採 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

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
