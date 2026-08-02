# Changelog

> 中文版本：[CHANGELOG_zh-tw.md](CHANGELOG_zh-tw.md)

All notable changes to JT-PROXENSE are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versioning follows [Semantic Versioning](https://semver.org/).

---

## [0.9.3] — 2026-08-02

### Added
- **Task outcomes survive a restart** (migration 011, `pending_tasks`) — the
  watcher that follows a PVE task to its real exitstatus used to live only in
  memory, so a deploy threw in-flight ones away and the outcome row simply
  never arrived (indistinguishable from a broken watcher, which cost real
  debugging time). In-flight tasks are now persisted and resumed on startup;
  anything already past its watch window is closed out as `timeout` rather than
  silently forgotten. The table's contents are exactly "outcomes still owed".
- **Creation / restore / disk-placement pre-flight** (`create_guard.py`) —
  three more things PVE accepts and then fails inside the task, each of which
  can leave a half-created guest:
  - **VMID already in use.** PVE ids are cluster-wide, so "free on this node"
    is not free. Restore additionally warns that `force` destroys the guest
    currently holding the id.
  - **Bridge missing on the target node.** Checked against the node's real
    interface list; physical NICs are not accepted as bridges.
  - **Storage will not hold this content.** Reuses the content whitelist added
    in 0.9.2, so a VM disk cannot be placed on an ISO-only storage and a disk
    move cannot target one either.
  Verified against a live cluster: creating onto VMID 147, onto `vmbr99`, and
  onto an `iso,vztmpl` storage are all refused with the reason and the
  workable alternatives.

### Fixed
- Backup, restore and clone watchers used the 15-minute default window. A real
  vzdump to PBS ran past it and was recorded as a timeout while it was still
  working; those operations now get 6 hours.

---

## [0.9.2] — 2026-08-02

### Added
- **Migration pre-flight** (`migrate_guard.py`, `ha_affinity.py`) — PVE accepts
  a migration it cannot perform and fails it minutes later inside the task, by
  which point the UI has already reported success. Two preconditions are now
  checked before anything is submitted:
  - **HA node affinity.** A *strict* node-affinity rule can forbid a guest from
    running on the target; `ha-manager` then exits 2. Handles both PVE 8
    (`/cluster/ha/groups` + `restricted`) and PVE 9 (`/cluster/ha/rules` with
    `type: node-affinity`), including the fact that on PVE 9 the groups
    endpoint *errors* rather than returning empty.
  - **Storage availability.** Subtler than it looks: `local-zfs` is
    `shared=false` yet exists on every node, so "does the target have a storage
    of this name?" answers yes while the data sits on the source. Refuses when
    a storage is absent from the target, and when an online migration would
    need to copy non-shared disks without being asked to.
  Both refuse with 409 naming the rule, the storages and the legal nodes.
  `GET .../migrate-targets` exposes the same logic so a picker can offer only
  reachable nodes. Maintenance drain re-targets per guest instead of firing
  doomed migrations, and reports guests it had to skip.
- **Backup storage pre-flight** — a storage's content whitelist is enforced by
  PVE only when vzdump runs. Backing up to a storage that carries
  `images,rootdir` is now refused up front, with the list of storages that
  would work.
- **Task outcome tracking** (`task_outcome.py`) — every long-running PVE
  operation returns a UPID immediately, and handlers used to write
  `result="ok"` at that moment. A snapshot delete that failed therefore read as
  a success in the audit log forever. Submission is now recorded as
  `submitted`, and a watcher appends a second row with the real `exitstatus`.
  Applied to 22 destructive operations across snapshots, guest deletion,
  clones, backups, restores, Ceph and network apply. A timeout records
  `timeout` and an unreachable node records `unknown` — never `error`, because
  reporting a failure that was not observed is its own kind of lie.

### Fixed
- **Migration pre-flight ran before authorisation.** Its 409 body names HA
  rules, permitted nodes and storage layout — a map of the cluster — so any
  authenticated user could read it out of refusals. Now gated first, with a
  regression test pinning the order in both migrate handlers.
- `migrate-targets` answered "no targets" while the poll cache was still
  filling after a restart, which reads as "this guest cannot be migrated". It
  now reports `unknown` until the inventory is populated.
- Node names were read as `NodeMetrics.name`, a field that does not exist
  (it is `node`), so the target list was silently empty for every guest.

### Security
- All migration and backup pre-flight endpoints are behind the existing role
  gates, and the destructive migrate path still requires the pool/target
  confirmation it always did. Refusal bodies are only reachable after
  authorisation.

---

## [0.9.1] — 2026-08-02

### Added
- **Root-pool boot mirror** (`boot_mirror.py` + `BootMirrorWizard`, admin) —
  replacing a disk in `rpool` is the riskiest operation this product performs:
  the pool holds the bootloader, the node configuration and — through
  `local-zfs` — the guests' own disks. The stock tooling gives you a wiki page
  and a shell prompt. This is a staged, checked, resumable workflow instead:
  - **Three scenarios, detected rather than assumed.** `add_mirror` (single
    disk → mirror), `replace_live` (planned swap of a healthy disk) and
    `replace_dead` (FAULTED / REMOVED / UNAVAIL). The third matters most and is
    what hand-written procedures usually miss: a disk is normally replaced
    *because it died*, and you cannot clone a partition table off a dead disk.
    The plan clones from a surviving member and uses `zpool replace`, not
    `zpool attach`. If every member is faulted there is no path and it says so.
  - **Server-side pre-flight with hard blocks** — ZFS root, target is the root
    pool, no scrub/resilver already running, a healthy clone source exists, the
    new disk is blank, is not already a member, and is at least as large as the
    source (the whole GPT is cloned, so this one cannot be forced). Sector-size
    mismatch and firmware are reported as advisories.
  - **Backup gate.** Guests on the node are checked against
    `/cluster/backup-info/not-backed-up`. Missing backups BLOCK, and the block
    can only be passed by an explicit acknowledgement that is written to the
    audit log. Unreadable backup information also blocks — a false "all clear"
    on this gate is worse than no gate.
  - **Progress survives leaving the page.** A resilver runs for hours, so the
    job, its stage and its whole command timeline live in the database
    (migration 010). Close the tab, come back on another machine, and the
    percentage has kept moving; a banner on the ZFS page links straight back
    into any run still in flight. A daemon restart re-attaches the watcher
    rather than orphaning the job, because the resilver itself never stopped.
  - **Detach is never automatic.** It is offered only after the server
    re-verifies against the LIVE pool that the resilver finished, and it runs
    `proxmox-boot-tool clean` + `refresh` afterwards so kernel updates stop
    warning about an ESP that no longer exists.
  - Every command is recorded verbatim, run one per SSH round trip so a failure
    names the exact step, and the GPT is backed up with `sgdisk --backup=`
    before the first write.
- `docs/sop-rpool-mirror.md` — the operator procedure this implements.
- `docs/sop-demo-video.md` — end-to-end procedure for producing the demo video
  (recording, captions, soundtrack, licensing obligations, verification).

### Fixed
- **Dropdowns inside modals were unclickable.** `CyberSelect` renders its
  option list through a portal at `z-index: 2000`, but modal overlays sit at
  4000–9999, so the list painted *behind* the modal: present in the DOM, fully
  opaque, and impossible to click. Raised to 12050 with a regression test that
  fails if any future overlay outranks it.
- **`lsblk -r` column shift.** Raw mode collapses empty fields, so a partition
  with no `PARTTYPE` but an `FSTYPE` (`rbd1  ext4` on a real node) parsed the
  filesystem as the partition type — which would have picked the wrong ESP.
  Boot-mirror layout detection now parses `lsblk -P` key=value output.

### Security
- The boot-mirror endpoints are admin-only on every route, device names are
  normalised to `/dev/disk/by-id/` (paths under `/dev/sdX`, by-path names and
  traversal are rejected), the destructive start requires the pool name typed
  back, and every preflight, start, detach and abort is written to the audit
  log — including whether the backup gate was acknowledged and by whom.

---

## [0.9.0] — 2026-07-25

### Added
- **ZFS pool lifecycle management** (`zfs_admin.py` + `ZFSManager` view, admin) —
  the half of ZFS the stock PVE WebUI never covers: it can *create* a pool and
  then leaves you at the CLI forever. New ZFS page (sidebar `Z`, `/zfs`):
  - **Visual topology map** — pool → vdev group → individual disk chips, with
    data / special / log / cache / spare laid out as labelled rows. Per-disk
    state LED, read/write/checksum error badges, slow-I/O flag and a `boot`
    marker for partition-backed members, so a 22-disk two-raidz2 pool is
    legible at a glance.
  - **Replace a disk**, including the **boot-disk path**: a PVE root pool lives
    on a partition beside an ESP, so a plain `zpool replace` there yields a pool
    that resilvers perfectly and a disk that cannot boot. Boot layouts are
    detected and get the partition-clone + `proxmox-boot-tool` flow instead.
  - **Add vdevs**: extra data capacity, LOG/SLOG, CACHE (L2ARC), SPECIAL
    (metadata), hot spares — plus RAIDZ online expansion (`zpool attach` onto an
    existing raidz group, not `add`, which would silently create a second vdev).
  - **Multi-vdev pool builder** — build e.g. 22 disks as two raidz2-of-11 in one
    reviewed action, with log/cache/special groups in the same pass.
  - **Safety rails.** Every ZFS handler now converts errors into a JSON
    envelope — previously any maintenance call on a node without passwordless
    SSH raised out of the coroutine and answered 500 with a traceback, which
    also silenced the SSH-setup helper that keys off `error=ssh_failed`.
    `zpool attach` joined offline/detach/remove in requiring an explicit
    second request; a scrub is refused while a resilver is already running
    (it would compete for the disks being rebuilt); and a replacement smaller
    than the member it takes over is rejected up front rather than after the
    operator has committed.
  - **Pools and disk inventory are separate tabs**, and physical media sizes
    are base-10 as the manufacturer labels them (a "256 GB" SSD now reads
    256 GB, not 238.5; a 1.92 TB drive reads 1.92 TB, not 1.7). Pool capacity
    stays base-2 to match `zpool list` but is labelled honestly as GiB/TiB.
    Type sizes follow the house scale instead of shrinking below it.
  - **Reads go through the PVE API, not SSH.** `/disks/zfs`, `/disks/zfs/{pool}`
    and `/disks/list` cover the pool list, the full vdev tree and the disk
    inventory (PVE already classifies media as hdd/ssd/nvme and supplies a
    by-id link), so the topology view works on a stock cluster with no
    passwordless SSH and performs no writes on the node. SSH is required only
    for the operations PVE exposes no API for — replace, add vdev, scrub,
    trim, raidz expansion — and asking for one of those now opens a helper
    with the key to authorise instead of failing with a raw error.
  - **Graphical, not textual** — every affordance carries a mark: class icons
    per vdev row (data / special / log / cache / spare), state glyphs instead
    of bare words, icon buttons, per-vdev allocation bars, a relative-size bar
    per disk and a stacked HDD/SSD/NVMe composition chart for the node. Fault
    tolerance is drawn as pips — filled = redundancy still available, hollow =
    already spent — so a raidz2 group that has lost one member reads as "one
    failure left" at a glance rather than as the design figure "parity 2".
  - **Media-aware disk marks** — HDD / SSD / NVMe are classified the way PVE
    itself classifies them (transport + rotational, since `rotational` alone
    cannot separate an NVMe from a SATA SSD) and shown as colour-coded icons
    in the inventory, the pickers and the topology chips, with the SATA/SAS
    transport alongside.
  - **Scrub / TRIM** with live progress, and per-disk offline/online/clear/
    attach/detach/remove.
  - **Blast radius** — pool → PVE storages → the guests whose disks live there,
    answering "what dies with this pool?" before anyone touches a disk.
- **Long ZFS operations are tracked in SQLite** (migration `009_zfs_jobs.sql`)
  so a multi-hour resilver survives a daemon restart. Rows found `running` at
  startup are marked `orphaned` for human review rather than reported as done —
  the kernel keeps resilvering, but our watcher did not.

### Fixed
- **All outbound SSH now goes through one module** (`ssh_util.py`). Nine call
  sites across eight modules had grown their own copy of resolve-node-then-
  connect, five of them byte-identical, so the connect-timeout fix had to be
  applied nine times and had been applied nowhere. Node resolution, the
  credentials policy and the bounded handshake now live in one place, and a
  test fails the build if a module calls `asyncssh.connect` directly.
  Also escaped two regexes in the console page template that Python 3.12 will
  start warning about (emitted JavaScript unchanged).
- **SSH connections are now time-bounded.** `asyncssh.connect()` has no timeout
  of its own, so a ZFS request against an unreachable node pinned an aiohttp
  handler until the OS abandoned the TCP handshake. Bounded at 12s with a
  precise error. (The other SSH modules share the pattern and are queued for
  the same treatment.)
- **The operator CLI could act on a different database than the daemon.**
  `bin/jt-proxense` took the DB path from `$JTPROXENSE_DB_PATH` or a
  compiled-in default and never consulted `auth.db_path` in config.yaml, so on
  a deployment with a non-default path `reset-password` reported success
  against a database nobody reads, `user list` came back empty, and
  `export-config` bundled the wrong DB — precisely when the CLI is the way
  back in after an auth misconfig. Precedence is now
  `$JTPROXENSE_DB_PATH` > config.yaml > default.

### Fixed (post-release review)
- **vdev add, RAIDZ expansion and pool create never worked.** `zpool` takes no
  global options, so the dry run was issued as `zpool -n add …` — "unrecognized
  command '-n'" — and all three endpoints answered "ZFS refused this" with a
  usage dump. Flags now follow the subcommand.
- **The replacement-disk pre-flight was inverted.** `zpool labelclear -n` prints
  a path for a *clean* disk and nothing for one carrying a label, so a bare `/`
  match refused every blank disk and steered the operator into `--force`, which
  also disables the too-small guard.
- **A failed `zpool status -j` was read as fact.** The exit code was ignored, so
  on a node where the command fails (no `-j` before OpenZFS 2.2) an empty parse
  became "that disk is not in the pool" and silently disabled the
  don't-scrub-during-a-resilver guard.
- **draid vdevs reported parity 1** because their names carry geometry
  (`draid2:4d:11c:1s-0`) and the parser only matched raidz-shaped names —
  understating fault tolerance on the screen read before pulling a disk.
- **A dropped SSH transport mid-replace left no audit record** and a job row
  stuck at `running`, on the most destructive endpoint in the module.
- **SSH host resolution never used the health map** (keyed `host:port`, queried
  by node name), so every connection relied on the short name resolving.
- **Frontend:** a dry run is now bound to the exact request it previewed —
  changing the disk selection or ticking force after previewing left Execute
  enabled, so the operator could confirm one command and run another; the
  blast-radius modal rendered a failed request as "nothing depends on this
  pool"; a non-JSON error enabled Execute with a blank preview; a network
  error left every action button disabled until reload; and switching cluster
  from the top bar left the page fetching the previous cluster.

### Fixed (second review pass)
- **Replacing a genuinely dead disk was broken several ways at once.** The
  blank-disk pre-flight used `zpool labelclear -n` — a flag that does not
  exist — so every replacement was refused; a FAULTED disk (shown by GUID)
  built a bad member argument and skipped the boot flow; the boot flow cloned
  the partition table from the *dying* disk and hardcoded the ESP as part2.
  Now: lsblk-based blank check, member arg from path/name, boot-ness from the
  pool, partition table cloned from a healthy sibling, ESP/ZFS partitions
  located by GPT type GUID, whole-disk size check, and too-small is a hard
  refuse.
- **`storage_download` and `ssh_setup` looked a node up in the health map**
  (keyed `host:port`) by node name, so file download 404'd and one-click SSH
  key propagation rejected every seed. Both route through ssh_util now.
- **create-pool's property filter was a character class, not an allow-list** —
  `cachefile=/path` could make zpool write a file as root. Replaced with an
  explicit key set and a no-slash value rule.
- **Scan watchers** are deduped per pool (three could poll one resilver over
  SSH every 20s), no longer attribute a previous scrub's completion to a new
  job, and record a cancelled scrub as cancelled rather than done.
- Both read parsers now emit an identical key set; the API path no longer
  guesses the root pool from a partition-backed member.
- **Frontend** (from the same review): a dry run is bound to the exact request
  it previewed; the blast-radius modal surfaces a failed request instead of
  "nothing depends on this pool"; a non-JSON error no longer enables Execute;
  a network error no longer wedges every button; switching cluster from the
  top bar no longer keeps fetching the old one.

### Fixed (remaining review items)
- Mutations on one pool are now serialised (409 `pool_busy` on a second
  concurrent one) so two admins — or a scrub and a replace — can't race the
  check-then-act pre-flights.
- A paused scrub is recorded and no longer polled for the full 14-day cap; a
  transient DB error while writing scan progress skips the tick instead of
  aborting the watch and marking a healthy scan failed.
- A ZFS read that fails on permissions or an unreachable node now reports
  `zfs_read_failed` (403/502) instead of rendering as "no ZFS on this node".
- draid minimum device counts corrected; a single-node cluster configured by
  IP now resolves SSH to that endpoint instead of a possibly-unresolvable
  node name; the "a scan is running" message no longer prints "(None% done)".

### Security
- Every ZFS mutation is admin-gated and audited (including pre-flight refusals).
  Device arguments must resolve under `/dev/disk/by-id`; `/dev/sdX`, `by-path`
  and traversal attempts are rejected outright, because kernel names reorder
  across reboots and one wrong argument means resilvering a healthy disk. All
  tokens are allow-list validated *and* shell-quoted.
- **Preview-first execution**: mutations run ZFS's own `-n` dry run and surface
  its verdict verbatim; the real command only runs after an explicit confirm
  with the pool name typed back. ZFS's refusals (mismatched replication levels,
  e.g. a 2-way mirror added to a raidz2 pool) become visible warnings with an
  opt-in force, instead of being silently forced or silently wrong.
- The disk inventory excludes ZFS zvols (`zd*`) and device-mapper / loop / MD
  / zram nodes. `lsblk` reports zvols as `type=disk`, so without this filter a
  wizard could offer a volume that lives *inside* a pool as a member of a new
  pool — a pool within a pool.
- Irreversibility is stated up front: raidz/draid top-level vdevs can never be
  removed, special/log removal is blocked once any raidz exists, added capacity
  is not rebalanced, and `ashift` is permanent.

## [0.8.13] — 2026-07-15

### Fixed
- **Regression (v0.8.12): every cluster task poll 400'd.** `/cluster/tasks` does
  not accept a `limit` query parameter — the v0.8.12 change to pass one made PVE
  reject every request ("property is not defined in schema"), emptying the Tasks
  view and the matrix task overlay. Reverted to client-side slicing; per-node
  task queries (which *do* accept `limit`) are unaffected.
- **Host upgrade job status was never marked `failed`.** A job whose every node
  failed (and any partial job with no successful node) now finishes as `failed`
  instead of `done`, so the summary no longer misreports a fully-failed run as
  successful.

### Security
- **Step-up re-auth for 2FA backup-code re-issue.** Minting new 2FA backup codes
  for another user is a 2FA-bypass primitive; the admin now re-enters their own
  password to confirm (verified server-side; federated/sentinel admins are
  exempt as they have no local password). The audit trail records failed
  confirmations.

### Changed
- **2FA backup codes are shown in a dedicated reveal modal** (copy button,
  one-shot "not shown again" note) instead of a plain alert.

## [0.8.12] — 2026-07-15

### Fixed
- **User management: last-admin / self-lockout protection.** Deleting, disabling,
  or demoting the last enabled global admin (or disabling/demoting yourself) is
  now rejected — the web UI can no longer be left manageable only via the CLI.
- **Federated (PAM/LDAP) account handling.** Local login and self-service
  change-password now recognise every `*`-sentinel (not just `*PAM*`); an admin
  password reset on a PAM/LDAP account is rejected instead of silently forking a
  local credential. Disabling a user now also revokes their sessions. New local
  usernames are validated against an allow-list.
- **Tasks: the cluster task list was silently capped at ~50.** `get_cluster_tasks`
  now passes `limit` to PVE, so filtering by an older vmid/user returns results.
  `stop_task` URL-encodes the UPID (matching the read paths); a duplicate
  `get_task_status` was removed; timestamp/offset parsing is guarded.
- **Migration line for HA-managed guests.** The matrix now resolves the correct
  source node for `hamigrate` tasks (was the CRM node), so HA migrations draw the
  source→target line and label the failure toast correctly. `bwlimit` is recorded
  in the migrate audit entry.

### Changed
- **Host upgrade robustness.** Evacuation now carries a per-target RAM tally
  across hosts in a job (no multi-host overcommit); a transient reboot-required
  probe error no longer fails a successful upgrade; post-evacuate failures (incl.
  reboot timeout) warn about guests stranded on target nodes; an aborted in-place
  run restarts the guests it had shut down.
- **UI consistency.** The Host Upgrade job table adopts the canonical `.vm-table`
  look; upgrade and task status enums are now localized (zh-TW no longer shows raw
  `awaiting_reboot` etc.); removed dead native-`<select>` CSS in Tasks.

## [0.8.11] — 2026-07-15

### Added
- **Optional `bwlimit` (KiB/s) on VM migration.** The migrate API and PVE client
  now accept a per-migration bandwidth throttle, so a live migration can be
  capped instead of saturating the migration network.

### Changed
- **Matrix draws the source→target line for HA-managed migrations too.**
  Previously only plain `qmigrate`/`vzmigrate` drew the connecting line, so an
  HA-managed guest (`hamigrate`) showed only a cell badge and no line. HA
  migrations are real moves and now draw the line (deduped by vmid so a
  hamigrate + its qmigrate subtask don't double-draw).
- **Landing page feature cards are fixed to 3-per-row on desktop** (auto-fit was
  giving 4 and squeezing the text-heavy cards); steps down to 2 then 1.

### Docs
- Demo video expanded and corrected: the matrix **migration line** is now on
  camera, plus a **Storage** view and a live **language-switch** finale; caption
  fixes (監控與控管 → 監測與控制, radar → 細節卡片).

## [0.8.10] — 2026-07-14

### Fixed
- **Anomaly radar rendered blurry for everyone.** The radar `<canvas>` was left
  at its default 300×150 backing store and CSS-stretched ~6× to fill its
  container, so the radar looked soft while the surrounding UI stayed crisp. It
  now sizes its backing store to `container × devicePixelRatio` on every draw,
  independent of ResizeObserver timing.
- **Traditional-Chinese (Taiwan) terminology.** Swept mainland usages to Taiwan
  usage across the UI: 視圖→檢視, 告警→警示, 刷新→重新整理, 點擊→點選; landing
  page 彈窗→彈出視窗.
- **Landing page: install commands overflowed on mobile.** Long
  `curl … | sudo bash` one-liners now wrap inside their box instead of running
  off the right edge of the screen.

### Changed
- **Host-upgrade evacuation now enforces absolute memory headroom.** Node
  evacuation previously balanced targets by *relative* load only (CPU%+MEM%),
  which could overcommit a target's RAM and OOM it — worst case a swapless / HA
  target self-fences. It now checks each target's *free bytes*, reserves
  per-node headroom (max 4 GiB or 5%), never places a guest a node can't fit,
  and aborts the host (without rebooting) if the pool can't hold the load —
  including the fragmentation case where aggregate free RAM is sufficient but no
  single node can fit a large guest.

### Docs
- New 60 fps demo video (with a real cursor) walking the matrix grid / table /
  thumbnail views, the right-click context menu, and radar hover-to-card;
  refreshed landing-page screenshots including a crisp radar plus new
  context-menu and noVNC-console shots.

## [0.8.9] — 2026-07-12

### Fixed

- **Radar view rendered blurry on HiDPI / Retina displays and in 2×
  screenshot capture.** The anomaly-radar `<canvas>` sized its backing store
  to the container's CSS pixels only, ignoring `devicePixelRatio`, so on a 2×
  display — or the 2× Playwright landing-page capture — the canvas bitmap was
  upscaled and smeared while the surrounding DOM stayed sharp. The backing
  store is now `width × height × devicePixelRatio` and the drawing context is
  scaled by DPR (`setTransform`), so geometry, ring/degree labels and the
  sweep keep their authored sizes but render crisp at any pixel ratio. Mouse
  hit-testing and tooltip placement are unchanged (they work in device space
  and convert to CSS coordinates downstream).

### Security

- No server-surface change — client-side canvas rendering only. The v0.8.8
  OWASP ZAP baseline (0 High / 0 Medium) and manual pentest continue to cover
  this release; ZAP baseline re-run confirmed 0 High / 0 Medium.
- Test hardening: the v0.8.8 webhook SSRF guard now has a dedicated regression
  test (literal loopback / link-local rejected, public IP allowed), and the
  webhook fan-out tests no longer depend on a loopback target resolving — so
  the guard can't silently regress and the suite is deterministic.

## [0.8.8] — 2026-07-12

### Security

- **CRITICAL — unauthenticated arbitrary file read fixed (path traversal).**
  The static-asset handlers (`/assets/{f}`, `/fonts/{f}`, and the SPA
  catch-all `/{f}`) matched on `{filename:.*}` and joined the value onto the
  dist directory. aiohttp normalises a literal `../` in the path, but a
  **URL-encoded** `..%2f..%2f` survives routing and reaches the handler
  decoded, so a request such as `GET /assets/..%2f..%2fconfig.yaml` escaped
  the served root and returned any file the daemon could read — **no auth
  required**. Confirmed to leak `config.yaml` (PVE API tokens), the Fernet
  `master.key` (decrypts the entire secret store), the SQLite DB (password
  hashes + live session tokens), server source, and `/etc/passwd`. Fixed
  with a `_resolve_within()` containment check that `.resolve()`s the joined
  path and serves it **only** if it stays inside the intended base directory
  (`Path.is_relative_to`); anything escaping now returns 404. Discovered by
  in-house penetration testing; found and closed the same day, and the
  running production instance was hot-patched before this release.
- **SSRF guard hostname-bypass fixed (notification webhooks).**
  `_validate_webhook_url` only inspected the URL when the host was a literal
  IP, so a hostname that *resolves* to a blocked address (e.g. `localhost`,
  or an attacker-controlled name pointing at `127.0.0.1` / a link-local
  address) slipped through. The guard now resolves the host via
  `getaddrinfo` and rejects the URL if **any** resolved address is loopback
  or link-local, in addition to the existing literal-IP check.
- **DAST gate wired into the release process.** Every version now runs an
  OWASP ZAP baseline scan (throwaway local target, never production) that
  must report **0 High / 0 Medium** before release — see
  `RELEASE_CHECKLIST.md` §3.6. This release additionally underwent a manual
  penetration pass (RBAC boundary probing, SSRF, path traversal, SSH command
  injection) — the two findings above are its result; SSH sinks were
  confirmed safe (`shlex.quote` + `..` rejection throughout).

## [0.8.7] — 2026-07-12

### Security

- **Content-Security-Policy added, nonce-based.** Every response now carries a
  CSP; `script-src` uses a fresh per-request nonce (`'self' 'nonce-…'`, **no
  `'unsafe-inline'`**) stamped onto every inline `<script>` (the SPA shell +
  all server-rendered pages) by the security middleware. `default-src 'self'`,
  `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`,
  `connect-src 'self'` (covers the same-origin WebSocket). `style-src` keeps
  `'unsafe-inline'` — the React components emit runtime inline `<style>` that
  can't be nonced; low risk (CSS can't execute JS).
- **Cross-origin isolation:** added `Cross-Origin-Opener-Policy: same-origin`,
  `Cross-Origin-Resource-Policy: same-origin`, `Cross-Origin-Embedder-Policy:
  require-corp` (ZAP "Insufficient Site Isolation Against Spectre" now passes).
- **Server header no longer leaks** the aiohttp/Python version (now
  `Server: jt-proxense`).
- **DAST gate added to the release process:** an OWASP ZAP baseline scan
  against a throwaway local instance is now part of `RELEASE_CHECKLIST.md`
  (must be free of High/Medium each release). This release: **0 High, 0
  Medium**; the only residual is `style-src 'unsafe-inline'` (Low, accepted).
  Manual auth/RBAC pentest confirmed: viewer→admin endpoints all 403,
  unauthenticated→API all 401, session cookie `HttpOnly` + `SameSite=Lax`
  (+ `Secure` over HTTPS), no IDOR / privilege escalation.

---

## [0.8.6] — 2026-07-12

### Fixed

- **Same-cluster migration line never drew.** In the matrix grid, a live
  migration should draw a glowing source→destination line to the incoming
  "ghost" cell on the target node. The `incomingMirror` guard — meant only
  for cross-cluster mirror migrations — also matched a VM's *own* ghost in a
  same-cluster migrate (because `targetClusterId === vm.cluster_id`), so it
  hid the SOURCE cell; with no source cell, the line could never be computed.
  Now the guard only applies when source and target clusters actually differ,
  so the migration line + travelling particles render for ordinary
  same-cluster migrations.

### Docs

- Refreshed the landing-page matrix screenshots: the grid shot now shows a
  live migration line plus several concurrent backup jobs, and the thumbnail
  shot shows content-rich guest previews (Windows desktops + terminal
  consoles). All still redacted for IPs / emails / tokens.
- **Onboarding: no config-file editing to add clusters.** A fresh install now
  writes a clean `config.yaml` (empty `clusters: []`, correct port) instead of
  copying the example — which used to leave a dummy `192.168.1.100` cluster
  that failed on first login and implied you had to hand-edit YAML. The
  installer message, closing summary, README (both langs) and landing pages
  now point at **Settings → Clusters** in the web UI (persisted + hot-reloaded).
  `config.example.yaml` stays as the annotated reference.

---

## [0.8.5] — 2026-07-11

### Added

- **Corosync health + ring-performance viewer** on the Health page: quorum
  state, expected/total votes, transport, ring id, and a per-node table with
  online state, per-link connection status and ring latency (µs). Quorum
  loss / node-offline / link-down / high-latency also feed the findings
  tally. API quorum + membership always; link status & latency need SSH to
  the nodes (`corosync_view.py`, cached + single-flight).
- **Matrix: VM / CT type tags** on every grid tile (cyan VM, violet CT) and
  a **cell-width slider** in the toolbar.
- **Snapshot modal** action icons; **alert-threshold sliders** (CPU / memory
  / disk / IO-wait) paired with the number inputs in Settings.

### Changed

- **Create flows are modals now** — User-management "new user" and
  Backup-schedule "add job" open a centered modal instead of an inline row
  of fields.
- **Dashboard CPU/MEM bars** restyled to the segmented-gauge look; **Ceph
  OSD latency dots** glide to new positions on update instead of snapping.
- **Settings polish** — enlarged add-cluster form, brighter labels, version
  hidden under the sidebar wordmark; **VM-hardware modal** text enlarged and
  brightened.
- **Landing page** — 17 fresh screenshots (IPs / emails / tokens blurred),
  feature sections extended through v0.8, logo + favicon aligned to the app
  brand mark.

### Fixed

- **Consoles now open reliably.** The console tab is opened synchronously on
  click; it was previously created *after* the `/api/console/prepare` await,
  so browsers blocked it as a popup and nothing appeared (prepare returned
  200 but no tab). Applies to noVNC and serial-xterm on Matrix and Radar; the
  xterm reconnect also keeps the `serial` kind.
- **CT console thumbnails were broken on every install** — `pyte` was never
  declared in `requirements.txt`, so LXC text thumbnails failed with
  "NO SIGNAL". Added.
- **Matrix grid performance** — warning/danger tiles ran an infinite
  multi-layer `box-shadow` pulse that forced a full repaint every frame and
  pinned the CPU with 100+ guests; replaced with a static glow plus a
  GPU-cheap opacity blink for danger (auto-paused when the tab is hidden).
- **Radar** — canvas went elliptical after collapsing the sidebar (now a
  `ResizeObserver` re-syncs the backing store); hover tooltip could render
  off-screen (materialize animation left a stale transform).
- **Ceph OSD tooltips** clipped at card edges → portaled to `<body>` and
  viewport-clamped. **Storage treemap** detail popup offset fixed the same way.
- **Export to OVA / Hyper-V** is VM-only again (was surfacing on some CTs).
- **Toolbar** active-button text glow removed (blurred the labels); control
  groups share one height.

### Security

- `pyte` added to declared dependencies (was import-at-runtime only).
- Landing-page screenshots run through in-browser redaction of IPs, emails
  and API-token UUIDs before capture.

---

## [0.8.4] — 2026-06-15

### Added

- **Login-page language switcher.** The server-rendered login page now
  carries a visible `EN / 中文` toggle (top-right of the card), its two
  labels vertically aligned in equal-height boxes. The choice is
  persisted to `localStorage` so it carries straight into the React app
  after sign-in, and a language already chosen inside the app is honoured
  on the login page even when the browser locale differs and the URL has
  no `?lang=`. The page's Chinese text now renders in the bundled Plix
  (IBM Plex Sans CJK, OFL-1.1) sci-fi face — subset to ~11 KB for the
  login glyphs — so CJK matches the app instead of the system fallback.
- **Node network-info viewer.** Right-click a node → *Network info* opens
  a styled panel showing physical NIC link state / speed / duplex / MAC
  plus bridges & bonds with their members and IPv4 — read over SSH,
  viewer-visible, with manual + 5 s auto-refresh. (`node_netinfo.py` +
  `NodeNetInfoModal`.)
- **Bundled sci-fi monospace.** Nova Mono is now vendored in-repo (woff2
  + OFL) and drives table/value text, replacing the previous web-mono
  stack.

### Changed

- **Left sidebar widened** so "DASHBOARD" no longer truncates.
- **Top-bar clock** given a simpler telemetry-pulse icon, even
  horizontal padding, and a frame matching the cluster selector; the
  logo + wordmark are vertically centered together (the version label is
  excluded from that alignment).
- **Favicon** updated to the refreshed logo mark.

### Fixed

- **Host upgrade — LXC evacuation.** Containers now evacuate and restore
  via restart-mode migration (stop → migrate → start); PVE has no LXC
  live migration, so the previous online attempt failed outright.
- **Host upgrade — load spreading.** Evacuation now distributes guests
  across multiple least-loaded targets instead of piling every guest on
  a single node, and the wizard can exclude specific nodes as
  destinations.
- **Host upgrade — job list status.** A finished job whose run had
  failed/skipped nodes now shows a red **FAILED** badge with the failed
  count instead of a misleading **DONE**.
- **Host upgrade — dialogs.** Aborting a job or confirming a reboot no
  longer blanks the screen (the confirm body was being passed an object
  instead of a string).
- **Red-label readability.** Danger text/badges use a dedicated brighter
  colour (`--danger-text`) so they're legible on the dark surface; the
  upgrade FAILED badge is a solid-red fill with white text.

---

## [0.8.3] — 2026-06-14

### Changed

- **The matrix table is now the house standard.** Tasks, Backups and
  User-management tables all inherit the canonical `.vm-table` look
  (sticky uppercase cyan header, consistent row height / cell padding,
  shared hover + selected-row treatment, no per-view zebra striping).
  The tasks table is sortable by every column; the users table reuses
  the same surface.
- **Brand refresh.** Logo mark redrawn — a single bold hexagon ring
  with an ascending core chevron and a bright core node (was three
  nested hexagons + crosshair). Wordmark switched to the Share Tech
  Mono terminal face. Top-bar clock reframed to match the cluster
  selector exactly (40px, angled clip-path corners, same cyan rim).
- **README + landing page** now carry an explicit Disclaimer / "as-is,
  no warranty" notice, a not-affiliated-with-Proxmox statement, and a
  reminder that the tool performs state-changing operations.

### Fixed

- Tasks split-pane top border looked thicker on one side (the sticky
  table header painted over the card's top hairline on the left only);
  the decorative top line is dropped on that card so all four edges are
  uniform.

---

## [0.8.2] — 2026-06-13

### Added

- **One-click SSH key propagation across a cluster.** The SSH-setup
  guide now lets you authorise just ONE node by hand (`ssh-copy-id`),
  then pick it as a "seed" and have jt-proxense fan the host public key
  out to every other member — PVE cluster nodes share root SSH, so the
  seed reaches its peers. Per-node ✓/✕ results; idempotent (re-runnable).
  New `GET /api/ssh/targets` (cluster/node list for the picker) and
  `POST /api/ssh/propagate` (admin, audited; pushes only the server's
  own validated pubkey, piped via stdin so it's never shell-interpolated
  on the peer).

### Security

- ssh.propagate is admin-gated + audited; the propagated key is read
  from the host's own file and format-validated (operator input cannot
  inject a key); inter-node command is single-quoted and the key
  travels over stdin.

---

## [0.8.1] — 2026-06-13

### Added

- **Per-node NTP / chrony configuration** (admin). Node context menu →
  "NTP": shows `chronyc` sync status + sources, lets you edit the NTP
  server list (written to a `/etc/chrony/conf.d/jt-proxense-ntp.conf`
  drop-in, never touching the distro's `chrony.conf`) and restart
  chrony — all over SSH. Server allow-list-validates every server
  entry and audits writes.
- **SSH-setup helper.** The node-level SSH features (NTP, host upgrade,
  VM export, storage download) need passwordless root SSH from the
  jt-proxense host; a new "SSH setup guide" surfaces the host's public
  key plus copy-paste `ssh-copy-id` / verify commands. Reachable from
  Settings → Server, and offered inline whenever an SSH "permission
  denied" error appears. `GET /api/ssh/pubkey` reads (and first-run
  generates) the host keypair.
- **Ceph I/O panel** gains an IOPS trend chart (shares the byte-rate
  wave engine) and an average-OSD-latency readout; the OSD usage
  distribution chart gains instant hover tooltips.

### Changed

- **Host-upgrade now steers the API endpoint off a node before
  rebooting it.** If the node being rebooted is jt-proxense's active
  PVE endpoint, the client proactively hops to another healthy node
  instead of waiting for reactive failover — no apparent outage during
  the reboot window. (Multi-node clusters only; standalone nodes still
  briefly unreachable, as expected.)
- **Plix font weight split** — Chinese now uses Plix Light for body and
  Plix Regular for headings/bold (single-weight mapping made bold CJK
  look dim next to Latin); Latin stays Orbitron / Share Tech Mono.
- **Radar view** — phosphor afterglow sweep, per-blip sonar ping
  ripples, expanding centre pulse, and a rotating outer degree-tick
  ring.
- Matrix toolbar buttons unified on the display face at a larger size;
  numerous modal font-size bumps (create wizard, cluster-admin modals,
  upgrade wizard) and the create wizard's native `<select>`s replaced
  with the cyber select.
- Cluster ops button bar re-laid-out as a uniform full-width grid.
- Tasks detail pane restyled to match the matrix; the task table is now
  sortable by every column; log text is selectable + has a copy button.
- zh-TW terminology: 任務 → 作業 (everywhere), 資源池 → 資源集區,
  「即時」→「即時心電圖」.
- Tab-title health badge uses plain-text markers instead of emoji.

### Fixed

- Cluster ops button bar collapsed to a single right-hand column.
- Storage right-click menu / tooltip rendered far from the cursor
  (portaled to body; page-transition transform no longer persists).
- VMID filter / storage-detail search heights now match their
  neighbouring controls.
- Sidebar version tag repositioned tight under the wordmark.

### Security

- node_ntp + ssh_setup are admin-gated; NTP server strings pass a
  hostname/IP allow-list and are shell-quoted; the chrony drop-in path
  is fixed (no operator-controlled path). SSH pubkey endpoint is
  read-only.

---

## [0.8.0] — 2026-06-11

### Added

- **VM export to OVA / Hyper-V VHDX** (operator+, QEMU only). VM context
  menu gains "Export to other format" driving `jt_pve2ova` /
  `jt_pve2hyperv` on the node over SSH. The wizard detects the tools
  (one-click install / upgrade with GitHub latest-version check, missing
  deps like `ovftool` surfaced), lets you pick a temp directory from the
  node's file-path storages (free space + writability validated against
  the estimated source-disk total; tight space needs explicit confirm),
  and warns when the VM is running (conversion is live-read, no
  snapshot — crash-consistent at best). Conversions run in an internal
  job queue (`export_jobs` table, migration 008) that survives closed
  browser windows; the new "Export jobs" panel (Tasks page) shows
  status/log, streams downloads over SSH, supports delete-now, and a
  server-side reaper purges outputs 24 h after completion. In-flight
  jobs orphaned by a daemon restart are marked failed for manual review.
  Every action is audited.
- **Log-derived health findings.** New `GET /api/clusters/{id}/log-health`
  scans each node's syslog tail (5-min cache, single-flight) for
  uncorrectable/corrected ECC, MCE, OOM-kill, disk I/O errors, ATA CRC,
  filesystem corruption, kernel BUG/panic, segfaults and hung tasks —
  surfaced as critical/warning cards on the Health page.
- **Add / delete connections from the WebUI.** Settings → Clusters gains
  a "new connection" form (cluster or standalone node; API-token auth)
  and per-connection delete — persisted to config.yaml with hot reload,
  no restart.
- **Users page entry points.** The user-management page (existed at
  /users since v0.4 but had no door) is now in the sidebar (admin-only,
  shortcut `A`) and the command palette.
- **Matrix table column picker.** Choose visible columns (persisted);
  six previously unavailable columns: cluster, vCPU, memory quota, disk
  usage, disk total, disk I/O.
- **Thumbnail auto-fit.** The size slider is now a target width — the
  grid picks the closest column count and stretches cards to fill the
  row exactly, live while dragging.
- **Ceph: OSD usage distribution chart** next to the latency scatter —
  one bar per OSD, usage-threshold colours, average marker.

### Changed

- **Panel-card unification sweep.** Dashboard, Ceph, Storage, Health,
  Tasks, Backups, Upgrade and Users now share the canonical panel-card
  surface (cyan rim + scan-line + dot-header); local clones removed.
- **Storage page redesign.** Tank colours now follow a cool-band
  per-type palette (teal ZFS / steel dir / azure LVM / green NFS /
  violet PBS / cyan RBD) with amber/red reserved for 85 %/95 % usage;
  section frames unified; filter tabs gained icons; view toggles and
  detail-page actions show text labels when width allows.
- **Nodes page.** Per-cluster load ring + stats sidebar merged into one
  compact strip above the node grid; standalone hosts share a single
  section instead of one full-width row each.
- **Ceph page.** Bounded card growth (internal scroll for daemons,
  pools, OSD array) keeps the three columns aligned at any cluster
  size.
- Cluster selector moved next to the pause button, widened, and is no
  longer disabled on the dashboard.
- zh-TW terminology: 「記錄」 replaces 「日誌」 everywhere; treemap is
  now 「矩形樹圖」.
- Sidebar brand shows only the version (cluster name lives in the
  selector).

### Fixed

- **Storage right-click menu / tooltip rendered far from the cursor.**
  Two root causes: the page-enter transition persisted a non-none
  transform (making `.view-container` the containing block for every
  `position: fixed` descendant), and the menu wasn't portaled. Both
  fixed; menus now render via `createPortal(document.body)`.
- **Tasks page rendered an unstyled table when deep-linked.** `.vm-table`
  base styles lived only in the matrix view's style block; moved to the
  global stylesheet.
- Matrix toolbar buttons no longer wrap CJK labels mid-character —
  labels collapse to icons when the toolbar runs out of width.
- Copy-UPID button no longer wraps to two lines; VMID filter input
  height matches the dropdowns beside it.
- "Select all VMs with tag" bar is now translated.
- Panel-head count chips readable again (contrast bump).

### Security

- vm_export: operator+ on every route; whitelist-validated formats /
  ESXi versions / node names; `shlex.quote` on all remote values;
  download filenames checked against the job's recorded output list
  (no traversal); purge path re-validated against the server-generated
  prefix; tool installs, job create/delete and downloads audited.
- log_health: viewer-gated, read-only, throttled via the global PVE
  semaphore with 5-min per-cluster cache.

---

## [0.7.3] — 2026-06-11

### Security

Hardening pass from a full defensive review (no critical holes were
found; these strengthen the auth/notification surface):

- **X-Forwarded-For is now only trusted from a trusted proxy.** Client
  IP for the per-IP login rate limit is taken from XFF only when the
  immediate peer is loopback/private (where reverse proxies sit) or
  listed in the new `auth.trusted_proxies`. A direct public client can
  no longer spoof XFF to dodge the 5-fails/5-min lockout.
- **Sessions are revoked on password change/reset.** A self password
  change drops all *other* sessions; an admin reset drops *all* of the
  target user's sessions — a stolen cookie can't outlive the credential.
- **Login is constant-time for unknown users.** The local backend now
  runs a dummy Argon2 verify when the username doesn't exist, so
  response timing no longer reveals which usernames are valid.
- **Notification channel secrets are masked in API responses** (SMTP
  password, webhook `Authorization`/token headers) and **webhook URLs
  are rejected if they target loopback/link-local** (e.g. the cloud
  metadata endpoint); private-LAN webhooks remain allowed.
- **Telegraf influx receiver: bounded gzip decompression** (64 MB cap)
  closes a decompression-bomb DoS; the read endpoints `/api/telegraf/*`
  now require the `viewer` role.
- **TOTP backup codes are now atomically single-use** (compare-and-set,
  no read-then-write race).
- **Config export bundles use a per-export random salt** (PBKDF2 200k);
  bundles made before this version still import (legacy fixed-salt path
  retained). The encrypted secret-store master-key permission failure is
  now logged loudly instead of silently ignored.
- Console PVE URLs URL-encode the node name (defensive).

---

## [0.7.2] — 2026-06-09

### Fixed

- **Host upgrade: make `apt dist-upgrade` truly unattended.** The
  command already used `DEBIAN_FRONTEND=noninteractive` +
  `--force-conf{def,old}`, but that doesn't silence **`needrestart`**
  (Ubuntu 22.04+/Debian 12), which would pop an interactive "restart
  which services?" dialog and hang the SSH session. Now the command
  also sets `NEEDRESTART_MODE=a` and `UCF_FORCE_CONFOLD=1`, the SSH
  exec runs with **stdin=/dev/null** (any stray prompt gets EOF and
  proceeds/fails fast instead of blocking), and the whole run has a
  **60-minute hard cap** — if apt ever does block, that host is killed
  and failed and the batch continues, rather than hanging forever.
- **`uninstall.sh`** now also removes the `/usr/local/bin/jt-proxense`
  CLI symlink (previously left dangling).

---

## [0.7.1] — 2026-06-09

### Fixed

- **One-line install failed on modern Debian / Ubuntu (PEP 668).** On
  systems that mark the base Python environment "externally managed"
  (Ubuntu 24.04, Debian 12+), `install.sh` died at the dependency step.
  It now detects the `EXTERNALLY-MANAGED` marker and installs with
  `--break-system-packages` (this host is a dedicated appliance); older
  systems are unaffected.
- **Missing `six` dependency.** `python-pam` 2.0.2 imports `six` at
  runtime without declaring it, so the install smoke test failed on a
  fresh box (`ModuleNotFoundError: six`). `six` is now pinned in
  `requirements.txt`.
- **Install preflight assumed `curl`.** The reachability check now
  accepts `curl` *or* `wget` and never blocks the install. (A box with
  only `wget` can install via `wget -qO- … | sudo bash`.)

---

## [0.7.0] — 2026-06-09

### Added

- **Host migration: `export-config` / `import-config` CLI.** Bundles
  everything that defines an instance — `config.yaml`, the SQLite DB
  (users / roles / audit / notes / host-upgrade state + encrypted
  cluster-secret rows), and the `/etc/jt-proxense/master.key` that
  decrypts them — into one passphrase-encrypted file, and restores it
  on another host. The DB is captured via SQLite's online-backup API
  so the snapshot is consistent even while the service is running.
  `import-config` refuses to clobber an existing instance without
  `--force` and hands the restored files back to the service user.
- **`uninstall.sh` — one-line complete removal.**
  `curl … /uninstall.sh | sudo bash` stops + disables the service and
  removes the unit, `/opt/jt-proxense`, `/var/lib/jt-proxense`,
  `/etc/jt-proxense` (master key), and the service user. Confirms via
  the controlling terminal (works through a pipe) or `--yes`.

### Changed

- **One-line update** is now documented as simply re-running the
  installer (it's idempotent: fetch latest + restart). README + landing
  page now show install / update / uninstall / migrate one-liners.
- **`main` is the canonical branch.** The install one-liner pulls from
  `main`; releases now land there so a fresh `curl … | bash` always
  gets the latest version (previously `main` lagged the dev branch, so
  one-line installs silently fetched stale code).

---

## [0.6.6] — 2026-06-09

### Fixed

- **High idle CPU from per-poll log spam + redundant Ceph probing.**
  `cluster_manager` logged a full task dump (`Running tasks count`,
  per-task `Task: type=…`), `Backup task detected`, and the Ceph fetch
  trace on *every* poll cycle at INFO — ~130 journal lines/min at idle.
  It also re-probed Ceph status on every node every cycle, which 500s
  on non-Ceph clusters. These per-poll lines are now DEBUG, and a
  cluster found to have no Ceph backs off (re-checks every 60 polls
  instead of every poll). On a 4-cluster test box this cut idle CPU
  roughly in half (~25% → ~13%, now idling between polls instead of
  constantly busy) and log volume ~99% (131 → ~1 line/min). No change
  to monitoring behaviour or poll cadence.

---

## [0.6.5] — 2026-06-08

### Added

- **Ceph-aware host upgrades — wait for OSD rebalance between hosts.**
  The batch host-upgrade orchestrator previously rebooted hosts
  back-to-back with no Ceph awareness, which on a Ceph cluster could
  reboot a second node while the first was still recovering and drop
  PGs below `min_size` (I/O stall or data loss). It now auto-detects
  Ceph and, per host: sets the cluster `noout` flag around the reboot
  (so a brief OSD-down doesn't trigger a full rebalance), unsets it
  once the node is back, and **waits until every PG is `active+clean`
  (no degraded / misplaced objects, no recovery in flight) before
  touching the next host**. The clean check intentionally relies on PG
  state, not `health.status`, because `noout` itself makes Ceph report
  `HEALTH_WARN`. If rebalance hasn't finished after a soft cap (60 min)
  the job holds and warns rather than ever proceeding into a dirty
  cluster — abort to override. `noout` is cleared on every error path
  and on daemon-restart recovery so the flag is never left pinned. A
  wizard checkbox (default on) can opt out; it's a no-op on non-Ceph
  clusters.

---

## [0.6.4] — 2026-06-03

### Changed

- **Nodes view defaults to the live ECG.** The "波形範圍 / sparkline
  range" now starts on **Live** instead of 24H. The persistence key was
  bumped (`jtp.nodes.timeframe` → `jtp.nodes.timeframe.v2`) so the new
  default actually takes effect for existing browsers that had auto-saved
  the old 24H default; subsequent choices persist again under the new key.

### Fixed

- **Subscription "Manage" and certificate "Renew" buttons had poor
  contrast.** They reused the green `ok` status-badge style with a cyan
  border (green text clashing with a cyan outline, reading as a status
  pill rather than a button). They now use a dedicated filled accent
  button style (solid cyan, dark bold text) for clear contrast and an
  obvious clickable affordance.

---

## [0.6.3] — 2026-06-03

### Added

- **Live ECG waveform back on the Nodes view.** The "波形範圍 /
  sparkline range" selector gains a **Live (即時)** option alongside
  the RRD windows (1H / 24H / 7D / 30D / 1Y). When selected, each node
  card shows the real-time animated heartbeat trace (CPU / MEM / IOW)
  fed by the live WebSocket metrics — the pre-v0.5.3 behaviour — while
  the historical RRD sparklines remain available on the other ranges.
  The choice persists in `localStorage` (`jtp.nodes.timeframe`).

### Fixed

- **Sidebar version label was hard-coded to `v0.4.0`.** It now reads
  the build-time `__APP_VERSION__` (from `package.json`), so the
  sidebar shows the actual running version instead of a stale literal
  that had never been updated through the version bumps.

---

## [0.6.2] — 2026-05-29

### Added

- **In-place (no-migration) host-upgrade mode.** The host-upgrade
  wizard's "VM evacuation target" step gains a third choice alongside
  auto and manual: **in-place**. Instead of live-migrating guests to
  another node, the running guests on the host are gracefully shut
  down (ACPI), the host runs `apt dist-upgrade` and reboots, and then
  the guests that were running are started again on the same host.
  Brief guest downtime, but no spare capacity is needed on other
  nodes — useful for single-node-tight clusters or maintenance
  windows that accept downtime. Migrate-back is hidden in this mode
  (nothing leaves the host). A guest that fails to shut down cleanly
  aborts that host; a guest that the node already auto-started on boot
  (`onboot=1`) is logged rather than treated as a failure.

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
