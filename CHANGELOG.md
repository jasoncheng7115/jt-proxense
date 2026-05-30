# Changelog

> 中文版本：[CHANGELOG_zh-tw.md](CHANGELOG_zh-tw.md)

All notable changes to JT-PROXENSE are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

---

## [0.6.1] — 2026-05-29

### Added

- **`jt-proxense unlock` CLI command.** Clears the per-IP login
  rate-limit (`failed_logins`) so an operator locked out by the
  "too many attempts, please try again later" guard can sign in
  again without waiting out the 5-minute window. `--ip <ip>` clears
  one IP, `--all` clears every IP, and no argument lists the IPs
  currently recorded. Works offline (no running service required)
  and is audited as `auth.unlock`. It only resets the rate-limit
  counter — it never touches passwords. Documented in the
  emergency lock-out recovery sections of the README and the Pages
  site.

---

## [0.6.0] — 2026-05-29

Batch host-upgrade orchestrator plus the PBS-aware backup and
guest-config-driven console work that had been staged behind it.
Ships the v0.5.3-candidate UI improvements under one release.

### Added

- **Batch host upgrade orchestrator.** Rolling, per-host sweep:
  evacuate guests → `apt dist-upgrade` over SSH → admin-confirmed
  reboot → optional migrate-back. State machine is DB-persisted
  (migration `007_host_upgrade.sql`) so a daemon restart is handled
  deterministically. apt runs noninteractive with
  `--force-confdef --force-confold` so dpkg can never hang on a
  config prompt. Admin-only on all mutations; every step audited.
- **PBS-aware backup modal.** When the selected storage is PBS the
  per-file `compress` control is hidden (PBS does chunk-level dedup)
  and PBS-relevant extras surface: `notes-template`, `protected`,
  `mailto` + `mailnotification`. Storage list is deduped by name so
  shared storages no longer repeat once per node.
- **Config-driven console menu.** VM serial xterm appears only when
  the guest config has `serialN`; SPICE only when `vga` is qxl /
  virtio-vga. Menu fetches guest config on open with a short cache.
- **Real RRD sparkline on /nodes** with a user-selectable timeframe
  (default 24h, persisted to localStorage), replacing the synthetic
  trace.
- **Disk / NIC add + delete and ISO mount / eject** in the VM config
  modal.
- **Context-menu height handling** — measure-and-flip with
  scroll-on-overflow for long VM / node menus.

### Fixed

- **Host upgrade state machine.** An operator "skip" decision now
  records the terminal state `skipped` (was incorrectly `done`); a
  failed migrate-back now marks the host `failed` instead of `done`,
  so guests left on the target node are no longer reported as a clean
  finish; a crash during migrate-back is isolated to that host
  instead of aborting the whole job.
- **Host upgrade daemon-restart safety.** A host found in an
  in-flight state after a daemon restart is now marked `failed`
  ("manual review required") rather than blindly re-run — re-running
  would repeat the destructive evacuate/migrate from scratch.
  Regression coverage added in `tests/test_host_upgrade.py`.
- **Maintenance modal target-node dropdown** now populates correctly
  in single-cluster mode (the cluster-data lookup falls back from the
  `clusters` map to the single `cluster` prop).

---

## [0.5.2] — 2026-05-20

Security hardening pass: introduces OWASP Top 10 (2025-tracking)
pre-release audit, fixes an audit-log gap on backup verify, plugs a
naked-handler access-control gap on task-status polling, and scrubs
illustrative-but-real-looking host references from docs and tests.

### Added

- **OWASP Top 10 pre-release checklist** (`RELEASE_CHECKLIST.md` §3.5)
  + automated grep regression scanner. New invocation:
  `bash scripts/security-audit.sh /path/to/repo --owasp` runs A01
  (every `*_handler` has `@role_required` or a delegated role check),
  A03 (no `execute(f"…")` SQL outside migrations + no
  `subprocess shell=True`), A05 (no `DEBUG=True`, no CORS wildcard),
  and A09 (every POST/PUT/DELETE/PATCH handler has `audit.write` or
  delegates to a known auditing helper). A01/A03/A05 are hard
  failures; A09 emits a warning list. The other six categories live
  in the checklist as manual sign-off — record any judgement calls
  in the release CHANGELOG Security section. Mandatory before every
  push.

### Fixed

- **`backup.verify` was not audited.** `verify_backup_handler` is a
  storage-touching admin-ish action (PBS chunk index walk, file
  read); previous releases bypassed the audit log entirely. Both
  success and PVE-rejection paths now record `backup.verify` with
  the volume id.
- **`task_status_handler` (PVE task polling) had no role gate.** Any
  authenticated user — including a stale-session caller with no
  granted role — could poll arbitrary PVE task UPIDs by URL. Now
  decorated with `@role_required("viewer")`; matches the rest of
  the read-only handler family.

### Security

- **Removed real lab-host references from documentation and tests.**
  CHANGELOG verification notes that named the specific PVE node /
  vmid used during E2E runs are now generic ("a real PVE 8 cluster
  node"); cluster-notes docstring examples switched from look-real
  names (`host-101` / `host-104`) to obviously-fictional `pve-prod-01`
  / `pve-edge-04`; `tests/test_pdm_remote_migrate.py` fixture cluster
  id renamed from the operator's real standalone-host name to
  `remote-cluster`; a comment in `pdm_remote_migrate.py` rewritten to
  describe the case in general terms rather than naming a specific
  host. No customer or operator credentials were ever in the public
  tree; this round is about scrubbing identifying lab-infra references.

---

## [0.5.1] — 2026-05-15

Polish patch on top of v0.5.0 — readability + perf fixes spotted in
production review.

### Fixed

- **Operation log (`/tasks`) flickered every 5s and could surface the
  same task as multiple rows.** Auto-refresh interval relaxed from 5s
  to 15s (a task log isn't a real-time gauge); responses are now
  deduped client-side by UPID and the table only re-renders when the
  upid/status signature actually changes — so most polls are no-ops.
- **Health monitor severity pills were near-illegible.** The earlier
  pill style used the raw saturated severity colour (`#ff0040` /
  `#ff6b00`) as both text and border on a transparent dark background,
  which made the text hard to read. New pills use lighter tinted text
  on a deeper colour-matched fill with a saturated border + glowing dot;
  reads cleanly at a glance for all three severities.

### Changed

- **`neon-breathe` panel pulse animation toned down significantly.**
  Previous keyframe stacked four box-shadows up to 40 px wide, making
  any card using the canonical panel-card surround visually dominate
  its neighbours (overview cluster cards / cc-bottom panels / ceph
  sub-panels all looked "too glowy" next to the thin static tiles).
  Now: a faint inner halo + small border-opacity shift. Cards still
  read as active without out-shouting their neighbours.
- **Login page tagline** changed from "Cyberpunk PVE Monitor" /
  「賽博龐克 PVE 監控」 to "Sci-fi Visual Dashboard" / 「科幻視覺看板」.

---

## [0.5.0] — 2026-05-13

A UX polish + new feature release: brand identity refresh, a new matrix
heatmap view, comprehensive style-consistency sweep across all views,
and Playwright-driven visual verification harness.

### Added

- **Matrix heatmap view** — fourth view mode (`/matrix/heatmap`) showing
  per-VM CPU history as a horizontal track of 30 colour-coded cells
  (idle → green → amber → orange → red). New WS-tick ring buffer keyed
  by `cluster/node/vmid`; pre-seeds all buckets with the current value
  on first entry so the heatmap looks "warm" instantly instead of taking
  ~2.5 min to fill. Zebra-striped rows + hover highlight + colour-scale
  legend in the footer. Available via the 4th view-toggle button next
  to grid / table / thumb; persisted to localStorage and URL sub-path.
- **Performance chart hover crosshair + tooltip** — `RRDChartModal` now
  renders a vertical guideline + per-series dot at the nearest sample
  with a cyan-rimmed tooltip showing timestamp + each series' formatted
  value. Auto-flips to the opposite side when the cursor is past the
  chart midline so the tooltip never falls off-screen.
- **Time-range transition animation** — switching between 1h / 24h / 7d /
  30d / 1y in `RRDChartModal` now does a 0.32s fade-with-rise transition
  on the four chart cards (via a `key={tf}` remount + CSS keyframe)
  instead of a hard snap.
### Changed

- **New brand logo** — replaced the wide `JT-PROXENSE` PNG wordmark with
  a paired SVG mark (hex sensor reticle) + CSS wordmark in Rajdhani.
  Mark scales cleanly from 16px favicon up to 36px sidebar icon; the
  wordmark fades out + collapses cleanly when the sidebar shrinks to
  64px so the logo no longer overflows. Favicon updated to match.
- **Overview dashboard redesign** — added 6 hero stat tiles (Nodes
  Online · VMs · CTs · Cluster Load · Active Alerts · Uptime) above
  the gauges, plus a 4-panel bottom row (Nodes CPU bars · Storage
  capacity · Active tasks · Alerts feed). Tiles + bottom row share the
  same 1400px max-width as the rest of the page so they align with
  the cluster overview cards on wide displays.
- **Comprehensive style-consistency sweep** — every view now uses the
  canonical panel-card surface (135° gradient bg, primary-dim border,
  `neon-breathe` animation, top accent + animated scan-line, uppercase
  display-font headers with primary glow). Affected: `ClusterCore`
  node-card / node-detail-panel, `HoloMatrix` vm-thumb-card,
  `HealthMonitor` hm-card (keeps severity left rail as a deliberate
  exception), `CephConstellation` osd-grid-panel / io-wave-panel,
  `/tasks` + `/backups` table area (now wrapped in `.panel-card`).
  Shared utilities `.panel-card`, `.panel-card-head`, `.panel-card-dot`,
  `.panel-card-meta`, `.panel-card-body` added to `styles.css`.
- **Native `<select>` → CyberSelect** in `PveTasks` (cluster / type /
  status / user filters) and `BackupJobs` (cluster / state filters).
  Native dropdowns no longer appear anywhere in the SPA.
- **Dialog action buttons gain leading SVG icons** — VMCloneModal,
  VMMigrateModal, VMDeleteModal (cancel × / copy / migrate-arrow /
  trash) and VMConfigModal (edit pencil / cancel × / apply check),
  with inline-flex alignment so labels and icons share the baseline.
- **VMConfigModal type + layout** — labels bumped to 11px Orbitron
  uppercase with `.08em` letter-spacing, inputs 12→13px with bigger
  padding + focus glow, table headers 10→11px primary-coloured, table
  cells 12→13px, section titles primary-coloured with cyan glow + bolder
  bottom rule. Grid spacing increased so rows breathe.
- **Sidebar wordmark switches to Rajdhani** so "JT-PROXENSE" no longer
  truncates inside the 230px sidebar (Orbitron is too wide).

### Fixed

- **Matrix table view rendered as full-black screen** — `TagSelectorBar`
  crashed with `o.split is not a function` because some VMs return
  `tags` as an array instead of a `;`-string. Now flat-maps any input
  shape (string / array / null) into a string[] before splitting.
- **Migration dialog empty target-node dropdown** — standalone clusters
  (single-node) now render a disabled placeholder option `— this
  cluster has no other nodes to migrate to —` instead of an empty
  select that misled operators into thinking the dialog was broken.
- **VM/CT context menu clipped near viewport edge** — now measures the
  menu's actual rendered rect after open and flips left / up so it
  always stays inside the viewport, regardless of menu item count.
- **OSD apply-vs-commit scatter tooltip clipped** at right / bottom of
  the chart card — flips to the opposite side after measure.
- **Stacked OSD scatter points were invisible** (15 OSDs all at
  apply=1ms, commit=1ms rendered as one dot) — points with identical
  coordinates are now grouped, sized by member count, and the tooltip
  lists every member OSD ID + host.

### Security

- **Removed hardcoded admin password from documentation and scripts**.
  CLAUDE.md and `bin/jt-proxense` no longer suggest `TestPass123!`;
  scripts that need auth now read `JT_ADMIN_PASS` from the environment
  and refuse to run without it. CLAUDE.md gained an explicit "do not
  reset admin password autonomously" note after the previous default
  caused a credential collision.

---

## [0.4.0] — 2026-05-09

A milestone release covering the full TODO pipeline plus a cross-cutting
OWASP Top 10 audit pass.

### Added

- **PVE API tokens — create / revoke** (admin). The v0.3.30 listing UI
  gains a "+ Create" form with privsep / expiry / comment, plus a per-row
  Revoke button. Newly minted secrets surface in a one-shot reveal panel
  with a Copy button and an explicit warning that PVE never re-issues
  the value. Server input validated with strict `userid` / `tokenid`
  regexes; every create/delete is audited.
- **VM hardware editor** (operator+). VMConfigModal becomes editable for
  scalar fields (cores / memory / boot / agent / tags / description /
  per-NIC bridge+vlan+firewall) plus disk grow with `+N GB` deltas only
  (server rejects absolute sizes to avoid silent shrinks). Apply step
  shows a diff modal naming exactly which fields will change before the
  PUT goes out.
- **VM / CT creation wizard** (operator+). New `+ New` button on the
  cluster ops bar opens a five-step modal: type (QEMU/LXC) → OS image
  → hardware → network → review. Every field flows through allow-list
  regexes both client- and server-side; final submit is audited with a
  non-secret param hash (passwords / SSH keys never reach the audit
  log).
- **Firewall write UI** (admin). FirewallModal gains an "+ Add rule"
  inline form (cluster + VM scopes) and per-row Delete button. Server
  now strictly validates `source` / `dest` / `proto` / `dport` / `sport`
  / `comment` with regex allow-lists before forwarding to PVE.
- **HA write UI** (admin). HAStatusModal gains "+ Add resource" with
  sid / group / state / comment and per-row Delete. Server enforces
  `sid` (`vm:<id>` or `ct:<id>`) and group regex.
- **ESXi as first-class cluster (read-only preview, v0.4)**. New
  `server/clusters/` subpackage with an abstract `ClusterAdapter`
  interface and an `ESXiAdapter` that uses the vSphere REST API.
  config.yaml gains a `type: esxi` field per cluster; ClusterManager
  polls them alongside PVE clusters and merges snapshots into
  `/api/clusters`. Mutating ESXi is the v0.5 scope.

### Security (OWASP Top 10 audit pass)

- **A02 / A07** Influx receiver token check is timing-safe
  (`hmac.compare_digest`); auth-failure bursts log at WARN.
- **A05** Influx receiver startup logs SECURITY WARNING when bound to
  a non-loopback interface with no token configured.
- **A05** Session cookies set `Secure` automatically when the request
  arrived over HTTPS (direct or via `X-Forwarded-Proto`).
- **A05** HSTS header (`max-age=31536000; includeSubDomains`) emitted
  on HTTPS requests.
- **A03 / A05** Body size (16 KiB) + field-count (≤32) caps on
  vm_config PUT and vm_create POST; allow-lists on every editable
  field with reject-by-default.
- **A10 / A09** storage download-url: scheme restricted to `http(s)`,
  filename rejected on `..` / `/` / NUL / >255 chars, embedded
  credentials stripped before audit-log params hash.
- **A03** pdm_cluster firewall + HA inputs validated against narrow
  regex allow-lists before forwarding to PVE.

### Internal

- New `server/vm_create.py` for the wizard backend.
- New `server/clusters/{__init__,base,esxi}.py` scaffolding.
- `pve_client` gains create_user_token / delete_user_token /
  vm_resize_disk / ct_resize_disk / ct_update_config /
  list_node_storages / cluster_next_vmid / create_qemu / create_lxc.

---

## [0.3.34] — 2026-05-09

### Added

- **Notification rules CRUD** — channels (v0.3.27) didn't fire anything until rules pointed events at them. Settings → Notifications modal gains a second section: add a rule (name + action_pattern + min_severity + cluster filter + channel), toggle enable, delete. Rules wrap the existing `notifications_handlers.py` admin endpoints, so this is just the UI gap that closed.

---

## [0.3.33] — 2026-05-09

### Fixed

- **`npm run build` now auto-vendors xterm.js / xterm.css / xterm-addon-fit.js** into `dist/assets/xterm/` as a post-step. vite still wipes the directory; the copy step now lives in the build script itself instead of relying on operator memory after every build (which the v0.3.28 / v0.3.32 syncs both forgot, briefly publishing a github mirror missing the xterm vendor files). CLAUDE.md updated.

---

## [0.3.32] — 2026-05-09

### Added

- **`/audit` "errors only" filter** — checkbox in the audit filter bar limits the rendered rows to `result starting with "error"` or `result == "denied"`. Client-side filter on the rows already returned, so it composes with every other filter (user / action / cluster / since / until / limit) without re-querying.

---

## [0.3.31] — 2026-05-09

### Added

- **NodeServicesModal "Logs" link per service** — admins clicking the new Logs button next to a service row open NodeSyslogModal pre-filtered to that systemd unit (e.g. clicking 「日誌」 next to `pveproxy` opens the syslog viewer with `unit=pveproxy` already applied). Saves operators from copy-pasting unit names into the syslog filter.

### Internal

- `NodeSyslogModal` accepts an `initialService` prop; `NodeServicesModal` accepts an `onShowLogs(service)` callback. ClusterCore wires them so the same syslog modal is reused for both per-service drilldown and full host syslog.

---

## [0.3.30] — 2026-05-09

### Added

- **PVE API tokens listing** (admin) — cluster-core ops bar gains an "API tokens" button that opens a modal listing every API token on the cluster: user, token ID, privsep flag, expiry (with red highlight when expired, orange when <30 days remain), comment. Free-text filter. Read-only — token secrets are not returned by PVE after creation, and rotation has destructive UX so it stays in PVE web UI.

### Internal

- New module `server/api_tokens.py` — fans out one `list_user_tokens()` call per discovered user, parallel-gathered. 30 s cache.
- `pve_client.list_users()` and `list_user_tokens()` added.
- New component `src/client/components/APITokensModal.tsx`.

---

## [0.3.29] — 2026-05-09

### Added

- **Command palette quick-nav actions** — type "health" / "tasks" / "backup" / "matrix" / "節點" / "備份" etc. into ⌘K and the matching nav target appears at the top of the result list (boosted +30 over entity matches). Operators no longer need to remember the keyboard shortcut letter for a view they visit rarely.

### Internal

- New `'action'` hit kind in `CommandPalette.tsx` with chevron icon; bilingual aliases per nav entry.

---

## [0.3.28] — 2026-05-09

### Fixed

- **Suppress noisy "PVE request failed" warnings on ceph-less nodes** — every poll cycle was logging a WARNING for each node that doesn't run ceph (`/ceph/status` 500s with "ceph-mon binary not installed" or "pveceph configuration not initialized"). These are *expected* states, not failures. Heuristic on the error message downgrades these to debug level; real errors still surface as warnings. Drops journal volume by 60–80 % on mixed-cluster setups.

---

## [0.3.27] — 2026-05-09

### Added

- **Notification channels UI** — Settings → Alerts now has a "Manage channels" button opening a CRUD modal: add webhook (Slack / Discord / Mattermost / generic) or email channel, toggle enable per-channel, delete. Wraps the existing `notifications_handlers.py` admin endpoints. Closes the visibility gap where channels could only be created via API or shell.

### Internal

- New component `src/client/components/NotificationsModal.tsx`. No new server route.

---

## [0.3.26] — 2026-05-09

### Added

- **Browser tab title shows pending alerts** — `document.title` is now prefixed with `(N🔴+M🟠)` when any node is offline, storage ≥95%/85%, ceph HEALTH_ERR/WARN, or sustained CPU/memory >92%. Lets operators eyeball the tab from across a multi-tab browser without having to switch in. Computed entirely from the WS-broadcast cluster data (no extra API hits).

---

## [0.3.25] — 2026-05-09

### Added

- **Service start / stop / restart / reload** — admin can now drive PVE host services from the NodeServicesModal. Each row gets four action buttons (start / restart / reload / stop). Critical-service actions (pveproxy / pvedaemon / pvestatd / corosync / pve-cluster / pve-firewall / pve-lxc-syscalld) and any `stop` get a destructive confirmation. Returns the PVE task UPID so admin can track on `/tasks`. New endpoints `POST /api/clusters/{cid}/nodes/{node}/services/{name}/{start|stop|restart|reload}` (admin-scoped, audited).

### Internal

- `pve_client.node_service_action()` added; `node_inspect` gains four POST handlers (with shared `_do_service_action` helper).
- NodeServicesModal extended with action column (admin only); spinner per in-flight action.

---

## [0.3.24] — 2026-05-09

### Added

- **Bulk tag operations** — matrix table bulk-toolbar (visible after multi-selecting VMs/CTs) gains a new 「批次設定標籤 / Set tags」 button. Modal supports three modes: **Add** (merge into each VM's existing list), **Remove** (strip these tags), **Replace** (overwrite). Suggestion strip pulls peer VM tags from the same cluster(s). Fans out one PUT per selected VM in parallel; result strip shows ok / fail counts and first 5 errors.

### Internal

- New component `src/client/components/BulkTagModal.tsx`. Reuses the existing per-VM tag PUT (`pdm_resources.tags_set_handler`); no new server route.

---

## [0.3.23] — 2026-05-09

### Internal

- **CLAUDE.md updated** — Layout section gains a "Server modules" breakdown grouping every `server/*.py` by responsibility (core / consoles / read-only viewers / mutation / server-rendered pages). Pending TODO refreshed: read-only viewer gaps closed in the v0.3.18→v0.3.22 sprint, remaining items reframed as mutation-UI work (HA/FW write, VM creation wizard, hardware editor, notifications channel CRUD, bulk tag, services start/stop). Closes the doc drift caused by 15+ minor versions in this session.

---

## [0.3.22] — 2026-05-09

### Added

- **VM/CT tag editor** — VM context menu → 「編輯標籤 / Edit tags」 opens a chip-style editor: type to add, Backspace to remove, Enter / comma / semicolon to commit. Suggestion strip shows tags already used by peer VMs in the same cluster (one click adds). Operator+ can edit; viewer is read-only with a banner. Wraps the existing `PUT /api/clusters/{cid}/vms/{vmid}/tags` (operator-scoped, audited).

### Internal

- New component `src/client/components/TagEditorModal.tsx`. Validates tag names against `[A-Za-z0-9_\-.]+` to match PVE's accepted character set.

---

## [0.3.21] — 2026-05-09

### Added

- **Per-node services viewer** — node context menu → 「服務 / Services」 lists every PVE host service on the node (pveproxy / pvedaemon / pvestatd / corosync / pve-cluster …) with state badges (active / failed / inactive). Read-only for now.
- **Per-node syslog viewer** — node context menu → 「系統日誌 / Syslog」 opens a modal showing the last 1000 lines from `/nodes/{node}/syslog`. Auto-refresh every 5 s, optional unit filter (e.g. `pveproxy`), free-text search.

### Internal

- `pve_client.get_node_services()` and `get_node_syslog()` added.
- `node_inspect` gains `services_handler` and `syslog_handler` routes.
- New components `NodeServicesModal.tsx` and `NodeSyslogModal.tsx`.

---

## [0.3.20] — 2026-05-09

### Added

- **Storage RRD chart** — RRDChartModal now supports a `kind="storage"` mode rendering Used % and Used / Total bytes lines from PVE's `/nodes/{node}/storage/{name}/rrddata`. Reachable from Storage view → right-click a tank → 「效能圖表 / Performance charts」. New endpoint `GET /api/clusters/{cid}/nodes/{node}/storage/{storage}/rrddata`.

### Internal

- `pve_client.get_storage_rrddata()` added; `rrd_proxy.storage_rrd_handler` route added.

---

## [0.3.19] — 2026-05-09

### Added

- **Per-cluster ops notes** — admin-editable, viewer-readable free-form text per cluster. Use cases: "PROD cluster — never reboot pve-prod-01 during business hours" / "pve-edge-04 still on legacy SSDs, plan migration before EOQ". Reachable from the cluster-core ops bar (single-cluster mode). Stored in SQLite, 16 KB cap. New endpoints `GET/PUT /api/clusters/{cid}/notes` (viewer / admin), audited.

### Internal

- Migration `006_cluster_notes.sql` adds `cluster_notes` table.
- New module `server/cluster_notes.py`. New component `src/client/components/ClusterNotesModal.tsx`.

---

## [0.3.18] — 2026-05-09

### Added

- **HA / Replication / Firewall viewers** — three new read-only modals reachable from cluster-core's header (single-cluster mode):
  - **HA status** modal — live quorum / master / per-node LRM strip + HA resources table (sid / state / request_state / node / max_relocate / max_restart) + HA groups list. Quorum lit green/red, state pills colour-coded (started/stopped/error/fence).
  - **Replication jobs** modal — every `pvesr` job with id / target / schedule / last sync / duration / fail count / state. Toggle "errors only" to filter to jobs with non-zero `fail_count` or non-empty `error`.
  - **Firewall rules** modal (works for cluster scope from cluster-core button AND VM scope from VM context menu) — pos / direction / action / proto / source / dest / port / iface / enable / comment, action colour-coded ACCEPT (green) / REJECT (orange) / DROP (red).
- **Health monitor click-throughs** — clicking an HA finding card now opens the HA status modal pre-filtered to that cluster (instead of jumping to cluster-core which doesn't show HA detail). Same for replication errors → ReplicationModal.

### Internal

- New components: `HAStatusModal.tsx`, `ReplicationModal.tsx`, `FirewallModal.tsx` (one component handles both cluster + VM scope via a `scope` prop).
- All three reuse existing endpoints (`pdm_cluster.fw_*_list_handler`, `ha_view`, `pve_client.list_replication_jobs`); no new server routes.

---

## [0.3.17] — 2026-05-09

### Fixed

- **Host shell entry hidden for non-admin** — the 「主機 Shell」 row in the cluster-core node context menu is now visible only when `auth.user.role_global === 'admin'`. Previously the row showed for everyone but the prepare endpoint would 403 the click. The fix is consistent with how the VM context menu hides write actions per role.

---

## [0.3.16] — 2026-05-09

### Added

- **Resource pools browser** — cluster-core view (when a single cluster is selected) gets a 「資源池 / Pools」 button that opens a modal listing every PVE pool, expandable per-row to show member VMs / CTs / storages with their type, id, name, node, and status. Read-only viewer; create/delete already exists in `pve_client` for future iterations. New endpoints `GET /api/clusters/{cid}/pools` and `.../pools/{poolid}` (30 s cache).

### Internal

- New module `server/pools_view.py`. New component `src/client/components/PoolsModal.tsx`.
- `pve_client.get_pool()` added.

---

## [0.3.15] — 2026-05-09

### Added

- **HA + replication monitoring** — Health monitor now surfaces:
  - **HA resource state** when any HA-managed VM/CT isn't in the steady `started`/`stopped` state (`error` → critical; `fence` / `freeze` / `migrate` → warning).
  - **Replication errors** when any replication job has a non-empty error or non-zero `fail_count`.
  Both fetched on demand via two new read-only endpoints:
  `GET /api/clusters/{cid}/ha/status` and `GET /api/clusters/{cid}/replication-jobs`.

### Internal

- New module `server/ha_view.py` — read-only viewers for HA status (splits PVE's `/cluster/ha/status/current` mixed-row response into `resources / masters / lrms / quorum`) and replication jobs. Both behind a 10 s cache.
- `pve_client.list_ha_status()` and `list_replication_jobs()` added.
- Updated `CLAUDE.md` Pending TODO list to reflect everything closed in the v0.3.5 → v0.3.15 sprint.

---

## [0.3.14] — 2026-05-09

### Added

- **Apt updates manager modal** — the "updates pending" badge in NodeDetailPanel is now clickable; opens a modal listing every pending package on the node (Package / OldVersion / NewVersion / Section), with admin actions to trigger `apt update` (refresh the index) and `apt dist-upgrade` (apply pending). Both wrap the existing `pdm_cluster` endpoints and surface the resulting PVE task UPID. Operators with admin role get the action buttons; lower roles see read-only with a banner. Confirmation dialog (destructive) on dist-upgrade.

### Internal

- New component `src/client/components/AptUpdatesModal.tsx`. No new server routes — reuses the v0.3.x `pdm_cluster.apt_*` handlers.

---

## [0.3.13] — 2026-05-09

### Added

- **VM / CT hardware viewer** — VM context menu → 「硬體 / 設定 / Hardware / config」 opens a read-only modal showing the VM's parsed hardware config: general (cores / sockets / memory / OS / boot / BIOS / agent / etc.), disks (bus, volume, size, options), NICs (model / bridge / MAC / VLAN / firewall flag), mountpoints (LXC), and any other config keys. Equivalent of the PVE web UI's Hardware tab; editing intentionally not exposed (much larger surface). New endpoints `GET /api/clusters/{cid}/nodes/{node}/qemu/{vmid}/config` and `.../lxc/{vmid}/config` (15 s cache).

### Internal

- New module `server/vm_config.py`. New component `src/client/components/VMConfigModal.tsx`.

---

## [0.3.12] — 2026-05-09

### Added

- **Command palette (⌘/Ctrl+K)** — global fuzzy search across every entity in every cluster: VMs, CTs, nodes, storages. Token-prefix scoring + substring fallback, top 30 hits, keyboard-navigable (↑↓⏎, Esc closes). Selecting a hit jumps to the right view with the cluster pre-selected. Runs entirely client-side off the WS-broadcast cluster data — zero extra server load. New `src/client/components/CommandPalette.tsx`.

---

## [0.3.11] — 2026-05-09

### Added

- **PVE host shell** — admin can now click 「主機 Shell」 on the cluster-core node context menu and get a full xterm.js terminal running directly on the PVE node host (equivalent of clicking "Shell" on a node in the PVE web UI). Goes through the same auth dance as the LXC console (`stored` / `prompt` modes), wraps PVE's host-level termproxy. Admin only — operators with shell access on a host effectively own the cluster, so we don't expose this to lower roles. Audited (`console.host.prepare`, `console.host.open`).

### Internal

- New module `server/host_shell.py` mirrors the patterns in `console_proxy.py` but for the no-vmid host case (`/nodes/{node}/termproxy` + `/nodes/{node}/vncwebsocket`). Reuses `console_sessions.mint_console_token(... vmid=0, kind='host_term')`. Throttled handshake like the other ws bridges.

---

## [0.3.10] — 2026-05-09

### Added

- **NodeDetailPanel badges**: subscription state (Active / status / None), pending apt updates count (with severity colour), earliest cert expiry (days remaining; flips to red after expiry / orange < 30d). Each fetched on-demand from the v0.3.8 endpoints when the panel opens, so cluster-wide polling stays unchanged.

---

## [0.3.9] — 2026-05-09

### Added

- **Per-VM backup history** — VM context menu → 「備份歷史 / Backup history」 opens a drawer that scans every backup-capable storage on the cluster and lists every `vzdump-*-{vmid}-*` file: timestamp, age (colour-coded fresh/aging/stale), storage, node, size, protected/verified flags, notes. Stats strip up top: count, total size, newest backup with age pill. New endpoint `GET /api/clusters/{cid}/vms/{vmid}/backups` (30 s cache).
- **Cluster syslog modal** — `/tasks` page toolbar now has 「叢集日誌」 button that opens a modal showing the last 500 lines of `/cluster/log` (PVE web UI's "Cluster log" panel equivalent). Auto-refresh every 5 s, filter by free text on msg / node / user / tag, colour-coded by syslog priority. New endpoint `GET /api/clusters/{cid}/log`.

### Internal

- New module `server/vm_backups.py`. Filename match uses `-{vmid}-` so a vmid 12 query doesn't false-match vmid 1234.
- `pve_client.get_cluster_log()` added; `pve_tasks.cluster_log_handler` route added next to the task routes since they share the same operational use case (timeline view).
- New components `BackupHistoryModal.tsx`, `ClusterLogModal.tsx`.

---

## [0.3.8] — 2026-05-09

### Added

- **Health monitor** (`/health`) — at-a-glance dashboard aggregating proactive checks across every cluster: offline nodes, storage ≥85/95% used, ceph HEALTH_WARN/ERR, sustained CPU/memory >92%, recent PVE task failures (last 24h), certificates expiring (<60 days), pending apt updates per node. Each finding is clickable → drilldown to the relevant view (cluster-core / storage / ceph / tasks). Stats strip up top: nodes online ratio, VMs/CTs running ratio, storage count.
- **Backup schedules viewer** (`/backups`) — read-only list of cluster-level vzdump cron jobs from `/cluster/backup`: schedule, next run, target storage, scope (all / pool / vmid), mode, enabled state, comment. Filter by enable state.
- **PVE task viewer CSV export** — download the currently-filtered task list as CSV (UTC ISO timestamps, duration in seconds). Filename includes cluster + timestamp.
- **Performance charts (RRD)** — new `RRDChartModal` reads PVE's RRD ring via three new endpoints (`/api/clusters/{cid}/nodes/{node}/rrddata`, plus `/qemu/{vmid}/rrddata` and `/lxc/{vmid}/rrddata`), draws CPU / memory / network / disk-IO time-series as inline SVG (no chart library — bundle stays under the 500 KB ceiling). Timeframes: 1H / 24H / 7D / 30D / 1Y. Wired into the VM context menu (`vm.perf_charts`) AND the node context menu in cluster-core.
- **Server-rendered admin pages now match the SPA visual language** — `/account`, `/audit`, `/sessions` all switched from the old "JT-PROXENSE · Title" header to the same h1 + cyan icon + drop-shadow + pulse pattern used by HoloMatrix / RadarScan / UserAdmin / PveTasks. Same nav button styling (Orbitron caps with cyan-soft hover ring), same subtitle treatment.

### Internal

- New modules: `server/backup_jobs.py`, `server/node_inspect.py` (certificates / apt-update / subscription with 60 s cache), `server/rrd_proxy.py` (30 s cache).
- New views: `src/client/views/HealthMonitor.tsx`, `src/client/views/BackupJobs.tsx`, `src/client/components/RRDChartModal.tsx`.

---

## [0.3.7] — 2026-05-09

### Added

- **`console_proxy.py` WebSocket bridges now throttle the handshake** — both `/console/.../vncws` (noVNC) and `/term/ws` (xterm.js) wrap their `session.ws_connect(...)` upgrade in `pve_throttle.acquire(host)`, so console openings never starve other PVE traffic on a busy host. The slot is released as soon as the bridge is alive (otherwise N concurrent consoles would deadlock the 4-slot semaphore).
- **Telegraf data feeds cluster_manager** — `Cluster.get_data()` now annotates each node payload with a compact `telegraf` field: `{measurement: latest_fields, …}` pulled from the influx ring buffer. PVE node hostnames must match Telegraf's `host` tag (the agent default). Full sample history is still available via `/api/telegraf/{host}` for views that need it.

### Changed

- **`backdrop-filter: blur()` audit** — dropped all 10/12/16-px blur radii to 6/8 px (perceptually identical, materially cheaper to composite on macOS Chrome). Globally killed `backdrop-filter` while the window is unfocused (extends the existing `data-app-visible="false"` rule). Added `@media (prefers-reduced-motion: reduce)` block: zero out backdrop-filters and collapse all animation/transition durations — operators on slower Macs (or the OS-level Reduce Motion preference) get a leaner UI without us shipping a custom toggle.

### Internal

- pve_throttle is now layered transparently across every outbound PVE call type (HTTP via `pve_client._request`, vncproxy/termproxy POST in `console_proxy._prepare`, vncws/term WebSocket handshakes, lxc_thumb termproxy). One ceiling, one place to tune.

---

## [0.3.6] — 2026-05-08

### Added

- **PVE task / VM operation history viewer** (`/tasks`) — new top-level page that pulls real PVE-side tasks (qmstart / qmshutdown / qmsnapshot / qmrestore / vzdump / qmigrate / vncproxy / etc.) from `/cluster/tasks` and shows them in the matrix-style table. Filter by cluster, type, status (running / ok / error), VMID, user. Click a row → drawer with full task log streamed from `/nodes/{node}/tasks/{upid}/log`; auto-refreshes every 2.5 s while a task is running. VM context menu now has **「任務紀錄」** which deep-links into `/tasks?vmid=…&cluster=…`. Distinct from `/audit`: that one logs *what JT-PROXENSE did*; this one shows *what's actually happening on PVE*, including actions taken via PVE web UI / pvesh / API outside our tool.
- **Console paste-as-keystrokes** — new toolbar button「貼上」on the noVNC console: opens a dialog, you paste / type ASCII text, it replays as keystrokes through `RFB.sendKey()`. Three speed tiers (5 / 15 / 40 ms inter-char delay), explicit ASCII-only warning (CJK / emoji can't be expressed as X11 keysyms over RFB). `Ctrl/⌘+Enter` sends, Esc closes.
- **OCR language picker** in the console toolbar — choose between 中+英 / English / 繁中 / 简+英 / 简中 / 日本語 (whatever the host's `tesseract --list-langs` advertises); persisted to `localStorage['ocr_lang']`. Defaults to `chi_tra+eng` for Taiwan operators with mixed CJK/English screens.
- **OCR overlay hint** — when the drag-rect mode is active, an orange hint floats at center for ~3 s reminding the operator to avoid bar charts / progress bars.
- **OCR bar-noise filter** — server-side preprocessing now uses 4× LANCZOS upscale before grayscale + autocontrast (was 3× after binarization), drops the hard 140 threshold (Tesseract 4's internal Otsu does better on a gray ramp than on a 1-bit image), adds `--psm 6 --oem 1 -c preserve_interword_spaces=1`. On the client side, the OCR result is now line-filtered: any line with ≥75 % vertical-stroke chars (`|`, `I`, `H`, `U`, `戰`, etc., with at least 10 non-whitespace chars) is dropped as bar-chart noise; toast tells the operator how many lines were filtered.

### Changed

- **Window-blur counts as "not visible"** — App + ParticleBackground now also pause on `window.blur` (not just `document.visibilityState === 'hidden'`). On macOS Chrome the visibility state stays `visible` while the browser is merely behind another app, so the previous code kept burning CPU/GPU when the operator was clearly elsewhere. Particle count cut from 40 → 18, fps cap from 30 → 20 (slow-drift dust reads identical perceptually).
- **Console toolbar buttons** got inline icons (CTRL-ALT-DEL / Reconnect / Fullscreen / Paste / OCR / Send keys ▾) and the OCR drag overlay now covers the full viewport (mouse can drift past canvas edges and the rect snaps to canvas bounds; previously dragging off-canvas froze the rect).
- **StorageDetail action column** widened from 60 px → 96 px with `white-space: nowrap` so download + delete icons stay on one row instead of stacking.
- **UserAdmin contrast** — subtitle counter, "新增本機帳號" label, and last-login muted text bumped from `--text-muted` → `--text-secondary` for legibility on the deep-blue background.

### Fixed

- **Console JS not running** — `'\r'` / `'\n'` / `'\t'` inside `server/console_page.py:_TEMPLATE` (a Python `"""..."""` block) were being interpreted as actual CR/LF/Tab in the rendered HTML, breaking the JS string literals and silently failing the script load — page sat stuck on "正在開啟到 PVE 的連線通道…" with no error in the server logs. Always double-escape inside the template; CLAUDE.md updated with this as a recurring trap.
- **OCR overlay positional offset** when canvas was padded / centered inside `#screen` — the rect was drawn relative to the screen container but coords were computed canvas-relative. Now the overlay is positioned exactly over the canvas (and clamps drag coords to the canvas's CSS box).

### Internal

- New module `server/pve_tasks.py` with 5-second per-cluster cache to absorb panel re-renders without spamming pveproxy. New view `src/client/views/PveTasks.tsx` styled to match the existing matrix vm-table.
- CLAUDE.md "Recurring mistakes" gained rule #4: escape sequences inside Python string templates that emit JS.

---

## [0.3.5] — 2026-05-08

### Added

- **noVNC OCR copy** — drag-rect on the QEMU console → server-side `tesseract` (host's system binary; install once: `apt install tesseract-ocr tesseract-ocr-chi-tra` for Traditional Chinese) → recognized text auto-copied to the clipboard. New endpoints: `GET /api/ocr/langs` (viewer), `POST /api/ocr` (operator). Default lang `chi_tra+eng`; honoured `localStorage['ocr_lang']`. Hard timeout 8s, image cap 8 MB. Audited like every other operator action.

### Why

- Server-side instead of `tesseract.js` because: ~10 MB JS+wasm download per browser was wasteful for an occasional feature; system tesseract handles language packs via `apt`; faster than wasm; and every OCR shows up in the audit log with cluster + VM context.

---

## [0.3.4] — 2026-05-08

### Added

- **Storage from-URL download** — `POST /api/clusters/.../download-url` wraps PVE's `download-url` endpoint. UI in StorageDetail with URL + filename + optional checksum + TLS-verify toggle. operator+ role.
- **Storage upload** — multipart streaming proxy from browser to PVE. Frontend modal with drag-drop, progress bar, content-type validation. App's `client_max_size` bumped to 16 GiB so multi-GB ISOs work; the handler streams without buffering. operator+ role.
- **Storage SSH download** — PVE has no native file-download API, so `GET .../storage/.../download/{volid}` opens an `asyncssh` connection to the storage's owning node, resolves the on-disk path via `pvesm path`, and streams the file back via `cat`. New per-cluster config fields: `ssh_user` (default `root`) and `ssh_port` (default `22`). Operator must deploy the jt-proxense host's public key into each PVE node's `authorized_keys`.
- **Bulk operation UI** — matrix table view now has a multi-select checkbox column. When ≥1 row is checked, a sticky cyber-toolbar appears with start / shutdown / reboot / hard-stop. Mixed VM/CT selection is OK (the existing `vm_bulk_handler` auto-detects). Per-cluster fan-out + per-cluster result summary.
- **User management page** at `/users` (admin-only) — list / create / disable-enable / delete local users; reset password (forces change on next login); clear 2FA; per-user role grants with cluster + VM-pattern triples. Companion API at `/api/admin/users/...`.
- **AD / LDAP authentication backend** — set `auth.backend: ldap` and configure `auth.ldap.{server, bind_dn|user_dn_template, group_role_map, ...}` to delegate password checks to AD/LDAP. Group → role auto-grant on each login. Sentinel `*LDAP*` password hash on the local row keeps local-backend logins from ever matching. CLI back door always uses local backend so operator can recover when AD is unreachable.
- **Matrix sub-path routing** — `/matrix/grid` / `/matrix/table` / `/matrix/thumb` now write back to URL on view-mode switch and resolve from URL on initial load. Same pattern for `/storage/tanks` / `/storage/treemap`.

### Changed

- **InfluxDB receiver: v2-only.** (Already shipped in 0.3.3; rolled forward into main with this release.)
- **Table headers across all pages** aligned to the matrix `vm-table` style — Orbitron 14px, 0.05em letter-spacing, secondary-text color, sticky thead, no rounded surround. Server-rendered `/audit` and `/sessions` pages updated too.
- **Storage detail tab labels brightness** — was `text-secondary` (too dim per user feedback), now `text-primary` with `primary` cyan on hover.
- **Radar context-menu "Show details"** no longer redirects to `/matrix`. Highlights the corresponding radar dot inline (calls `handleAnomalyClick`).
- **`pve_throttle` extended to `lxc_thumb.py`** — the termproxy POST in the LXC thumbnail path now goes through the per-host concurrency pool, preventing thumbnail waves from starving other PVE calls.
- **`useDialogs` migration is complete.** No native `alert/confirm/prompt` remain anywhere in `src/client/`.

### Fixed

- **`.btn-icon` class collision** — App.tsx already used the name for header icon-only buttons; the matrix toolbar's redefinition was shrinking the global pause / lang / user / settings buttons. Renamed inner class to `.tb-ico`.
- **Console-disabled stale state** — verified the path: client doesn't gate `no_stored_password` client-side anymore; `/prepare` returns 412, the dialog surfaces it. Stale localStorage no longer matters.

---

## [0.3.3] — 2026-05-08

### Changed

- **InfluxDB receiver: v2-only.** The legacy `/write` (v1) endpoint has been removed. Telegraf agents must use `outputs.influxdb_v2` writing to `/api/v2/write`. The handler now reads the `precision` (ns/us/ms/s), `org`, and `bucket` query params; timestamps are normalised to nanoseconds in the cache regardless of the agent's chosen precision. Auth still uses `Authorization: Token <t>`. Mis-pointed v1 agents now get a clean `404` instead of silently succeeding under a path we don't actually support.

### Notes

- This release also rolls forward the entire `v0.3.2` set into the `main` branch (previously only on `v0.2-auth`), so the public landing page no longer displays the long-stale `v0.1.0` README.

---

## [0.3.2] — 2026-05-07

### Added

- **Storage detail page** — click any file-level storage tank → "管理" button (or right-click → 內容) opens a per-storage page at `/storage/{cluster}/{node}/{name}`. Tabs are dynamically shown based on the storage's `content` field (備份 / ISO 映像 / CT 範本 / 程式碼片段 / 匯入 / 磁碟映像 / CT 根目錄), each with its own type-coded icon. Lists items with name / date / format / size, click any column header to sort. Phase 1 endpoints: `GET /api/clusters/{cid}/nodes/{node}/storage/{name}/content?type=...` (viewer+) and `DELETE .../content/{volume:.+}` (operator+) — both wired through the existing `pve_client.list_storage_content` / `delete_storage_content` helpers, with audit log entries on delete. Block-level storages (rbd / lvm / zfspool) get a list-only view (no upload/delete UI), since their volumes are owned by the VMs.
- **InfluxDB Telegraf line-protocol receiver** (`server/influx_receiver.py`) — accepts `/write` (v1) and `/api/v2/write` (v2) endpoints, gzip transparent, optional bearer token. Parses tags / fields / timestamp into a per-host ring buffer (60 most-recent samples) keyed by `host` tag. Read endpoints `/api/telegraf/hosts` and `/api/telegraf/{host}` expose the buffered points.
- **LXC text-mode thumbnails** — CT consoles return mostly-empty framebuffers, so the matrix thumb screenshot endpoint now routes LXC through `lxc_thumb.py`: opens a termproxy WS, sends Ctrl-L to nudge bash to redraw, captures 2s of shell output, feeds it through `pyte` (vt100 emulator), then renders the resolved screen state to a PNG with monospace font + cyber-cyan text. CT thumbnails now show actual prompts / running TUIs (htop, etc.) instead of black boxes.
- **Matrix thumbnail UX**: type filter (全部 / VM / CT), prefer-content sort (blank thumbs sink to the bottom — server detects via mean luminance for QEMU and "any non-whitespace text" for CTs, exposed via `X-Thumb-Empty` header), group-by (節點 / 類型 / 標籤) with prominent sticky group headers. FLIP reorder animation when the sort changes; suppressed during the initial fetch wave so cards don't jump around while blobs arrive piecemeal. Footer indicator showing the 30s thumbnail refresh cadence.
- **Cyber-style loaders**: per-thumb "no signal" CRT static (SVG `feTurbulence` filter + scanlines + RGB-aberration label), and click-to-zoom modal loader with rotating dual-arc rings + bouncing scan-bar + corner brackets + status text.
- **Radar anomaly cards: right-click context menu** — same actions as the matrix view (details, open in PVE, console, snapshots, backup, power on/off/reboot/shutdown, remote migrate). The shared `VMContextMenu` component was extracted to `components/VMContextMenu.tsx`. Modal shims (`useMemo`-stabilised `vm` props) keep the radar's 50ms scan-angle re-renders from continuously resetting the wizard state.
- **Matrix table sort animation** — replaced the old left-right wiggle with a top-to-bottom scan-bar sweep + per-row staggered fade/blur entry. Same animation now drives the storage detail table sort.
- **Storage detail tab transition**: cyan light bar sweeps top-to-bottom across the freshly loaded list, table content fades + blurs in.
- **Toolbar icons everywhere** — every matrix toolbar button (filter, sort, group, view, type filter), the size slider label, account-settings sections, and storage detail tab labels now lead with a 12–18px SVG icon tinted with currentColor.

### Changed

- **All native `<select>` elements in `RemoteMigrateModal` swapped for `CyberSelect`** (target endpoint, data-path IP, disk-storage map, NIC-bridge map). `CyberSelect`'s dropdown is now portaled to `document.body` with viewport-fixed positioning + flip-up when there isn't enough space below — so it can't be clipped by a parent modal's `overflow: hidden`.
- **SPA fallback Cache-Control fix**: every route returning `index.html` now sets `no-cache, no-store, must-revalidate`. Prior behaviour let Chrome's heuristic cache pin a stale `index.html` referencing a deleted `index-*.js` bundle, which surfaced as a blank app on next deploy. The HTML also includes a self-heal script that HEAD-checks its own bundle URL and force-reloads on 404.
- **Thumbnail fetch concurrency capped at 6** — fan-out to 60+ guests at once was hitting Chrome's per-origin connection limit (`ERR_INSUFFICIENT_RESOURCES`) and silently rejecting the overflow. A simple sliding-window pool inside the matrix view's effect keeps the rate to 6 in flight, and matches the server-side `pve_throttle` 4-concurrent + 50ms-gap budget per host.
- **FLIP reorder positions are now layout-relative** (`offsetTop` / `offsetLeft` cumulatively up the offsetParent chain) instead of viewport-relative (`getBoundingClientRect`). The previous viewport-relative path triggered phantom animations whenever a 2s cluster broadcast re-rendered the matrix while the user had scrolled, because every card's viewport-y had genuinely changed even though no card moved in the document.
- **VMContextMenu styles travel with the component** — moved the `.vm-context-menu` / `.context-menu-*` CSS into the component file itself so RadarScan, HoloMatrix, or any future host gets them automatically when the menu is rendered.
- **Account-settings page (`/account`)** — h2 section headers (個人資料 / 變更密碼 / 雙因素認證) and primary buttons now have icons.

### Fixed

- **Storage detail dropdown overflow**: when a long endpoint list opened inside `RemoteMigrateModal` it was clipped by the modal's overflow. Portal-rendered `CyberSelect` lists fix this everywhere they appear.
- **Right-top topbar buttons regression**: a CSS class collision (`.btn-icon` redefined in HoloMatrix) shrank the global pause / lang / user / settings buttons into broken micro-icons. Renamed the matrix-toolbar inner class to `.tb-ico` to avoid the collision.
- **Storage `<style>` template-literal break**: backticks inside a CSS comment were terminating the React component's template string and producing `TS1381 / TS1005` build errors at unrelated line numbers. Added a CLAUDE.md "Recurring mistakes" rule against this.
- **CT thumbnail line spacing** — pyte/PIL renderer now uses ~1.45× font-size for line height so terminal output is readable instead of crammed.

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
- E2E: noVNC `RFB 003.008` banner, xterm `OK` ack, screenshot 320×200 PNG (24KB) all returned successfully against a real PVE 8 cluster node.

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
