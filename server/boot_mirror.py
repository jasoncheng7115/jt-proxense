"""Root-pool (boot disk) mirror operations — attach, resilver, detach.

This is the most dangerous thing the product does. `rpool` is not just the boot
disk: PVE puts `local` (/var/lib/vz) and `local-zfs` (VM/CT disks) on it, so the
pool holds the bootloader, the node configuration AND the guests' data. Three
specific mistakes destroy a node:

  * `sgdisk --replicate` with the arguments the wrong way round writes a blank
    partition table over the SOURCE disk;
  * detaching the old member before the resilver finishes leaves one copy of
    nothing;
  * operating on /dev/sdX instead of by-id, after the kernel has renumbered.

So the flow is staged and each stage is recorded (migration 010): a resilver
runs for hours and the operator WILL close the tab. Coming back must show
exactly where it got to, including a daemon restart in between.

Scenarios — the SOP this replaces only covered the second one, but a disk is
usually replaced BECAUSE it died, and then you cannot read a partition table
off it:

  add_mirror    single-disk rpool -> mirror. Clone the layout from the live
                member, attach. Nothing is removed, so this is the safe one.
  replace_live  old disk still healthy: clone from it, attach the new one,
                resilver, and only then detach the old.
  replace_dead  old disk FAULTED/REMOVED/UNAVAIL: clone from a SURVIVING
                mirror member and `zpool replace` (not attach). If the pool is
                a single disk and that disk is dead there is no path here at
                all — restore from backup.

Routes (all admin):
  GET  /api/clusters/{cid}/nodes/{node}/zfs/boot-mirror            current state
  POST /api/clusters/{cid}/nodes/{node}/zfs/boot-mirror/preflight  checks + plan
  POST /api/clusters/{cid}/nodes/{node}/zfs/boot-mirror/start      run the plan
  POST /api/clusters/{cid}/zfs/boot-mirror/{job_id}/detach         after resilver
  POST /api/clusters/{cid}/zfs/boot-mirror/{job_id}/abort
  GET  /api/clusters/{cid}/zfs/boot-mirror/jobs                    history/revisit
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
import shlex
import time

from aiohttp import web

from . import audit, db
from .cluster_manager import cluster_manager
from .middleware import role_required
from .zfs_admin import (_BYID_DIR, _ESP_GUID, _ZFS_GUIDS, ZfsError, _actor,
                        parse_boot_layout,
                        _body, _norm_device, _norm_pool, _require_cluster,
                        _run, _status_pools, pool_serialized, zfs_errors)

logger = logging.getLogger(__name__)

POLL_SECS = 20
STAGES = ("preflight", "cloning", "bootloader", "attaching", "resilvering",
          "awaiting_detach", "detaching", "cleaning", "done", "failed", "aborted")

_TASKS: set = set()
_WATCHERS: dict[int, "asyncio.Task"] = {}


def _now() -> int:
    return int(time.time())


# --------------------------------------------------------------- job storage

async def _job_create(cid, node, pool, scenario, source, old, new, actor, detail) -> int:
    async with db.connect() as c:
        cur = await c.execute(
            "INSERT INTO boot_mirror_jobs (cluster_id,node,pool,scenario,"
            "source_disk,old_disk,new_disk,stage,status,created_by,created_at,"
            "updated_at,detail_json) VALUES (?,?,?,?,?,?,?,'preflight','running',?,?,?,?)",
            (cid, node, pool, scenario, source, old, new, actor, _now(), _now(),
             json.dumps(detail)))
        await c.commit()
        return int(cur.lastrowid)


async def _ev(job_id: int, kind: str, message: str) -> None:
    """Append to the job's timeline. Best-effort: a logging failure must never
    take down the operation it is describing."""
    try:
        async with db.connect() as c:
            await c.execute(
                "INSERT INTO boot_mirror_events (job_id,ts,kind,message) VALUES (?,?,?,?)",
                (job_id, _now(), kind, message[:2000]))
            await c.commit()
    except Exception as e:
        logger.warning("boot_mirror event write failed (job %s): %s", job_id, e)


async def _set_stage(job_id: int, stage: str, *, status: str | None = None,
                     progress: float | None = None, detail: dict | None = None,
                     finished: bool = False) -> None:
    sets, args = ["stage = ?", "updated_at = ?"], [stage, _now()]
    if status is not None:
        sets.append("status = ?"); args.append(status)
    if progress is not None:
        sets.append("progress = ?"); args.append(progress)
    if detail is not None:
        sets.append("detail_json = ?"); args.append(json.dumps(detail))
    if finished:
        sets.append("finished_at = ?"); args.append(_now())
    args.append(job_id)
    async with db.connect() as c:
        await c.execute(
            f"UPDATE boot_mirror_jobs SET {', '.join(sets)} WHERE id = ?", tuple(args))
        await c.commit()
    await _ev(job_id, "stage", f"→ {stage}")


async def _job_row(job_id: int) -> dict | None:
    async with db.connect() as c:
        cur = await c.execute("SELECT * FROM boot_mirror_jobs WHERE id = ?", (job_id,))
        row = await cur.fetchone()
    return dict(row) if row else None


async def _job_full(job_id: int) -> dict | None:
    row = await _job_row(job_id)
    if not row:
        return None
    try:
        row["detail"] = json.loads(row.pop("detail_json") or "{}")
    except (json.JSONDecodeError, TypeError):
        row["detail"] = {}
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT ts,kind,message FROM boot_mirror_events WHERE job_id=? ORDER BY id",
            (job_id,))
        row["events"] = [dict(r) for r in await cur.fetchall()]
    return row


async def _active_job(cid: str, node: str) -> dict | None:
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT id FROM boot_mirror_jobs WHERE cluster_id=? AND node=? "
            "AND status='running' ORDER BY id DESC LIMIT 1", (cid, node))
        row = await cur.fetchone()
    return await _job_full(int(row["id"])) if row else None


# ------------------------------------------------------------------ helpers

async def _boot_layout(cluster, node: str, disk: str) -> dict | None:
    """Partition roles on a disk, by GPT type GUID rather than by index.

    PVE's default is ESP=part2 / ZFS=part3 with a 1M BIOS-boot part1, but that
    must not be assumed: formatting the wrong partition as vfat would destroy
    it.
    """
    # -P (key="value") rather than -r: in raw mode an empty column simply
    # collapses, so a partition with no PARTTYPE but an FSTYPE (real example
    # from a live node: `rbd1  ext4`) shifts FSTYPE into the PARTTYPE slot and
    # the partition roles come out wrong. Getting the ESP wrong here means
    # formatting the wrong partition as vfat.
    _, out, _ = await _run(
        cluster, node,
        f"lsblk -Pno NAME,PARTTYPE,FSTYPE,TYPE {shlex.quote(_BYID_DIR + disk)} 2>/dev/null")
    roles = parse_boot_layout(out)
    return roles if roles["zfs"] else None


async def _disk_bytes(cluster, node: str, dev: str) -> int:
    _, out, _ = await _run(
        cluster, node, f"blockdev --getsize64 {shlex.quote(dev)} 2>/dev/null || echo 0")
    try:
        return int((out or "0").strip().splitlines()[0])
    except (ValueError, IndexError):
        return 0


def _leaves(vdev: dict) -> list[dict]:
    out = []
    if not vdev.get("children"):
        out.append(vdev)
    for c in vdev.get("children") or []:
        out.extend(_leaves(c))
    return out


def _root_pool_members(pool_obj: dict) -> list[dict]:
    out: list[dict] = []
    for v in (pool_obj.get("vdevs") or {}).get("data", []):
        out.extend(_leaves(v))
    return out


# ---------------------------------------------------------------- preflight

async def _preflight(cluster, cid: str, node: str, pool: str, new_disk: str,
                     old_disk: str | None) -> dict:
    """Everything that must be true before we touch anything.

    Returns {ok, scenario, checks:[{id,ok,fatal,detail}], plan:[...], ...}.
    Nothing here writes to the node.
    """
    checks: list[dict] = []

    def add(cid_, ok, fatal, detail):
        checks.append({"id": cid_, "ok": bool(ok), "fatal": bool(fatal),
                       "detail": detail})

    # -- root really on ZFS, and this pool really is it -----------------------
    _, root_src, _ = await _run(cluster, node, "findmnt -no SOURCE / 2>/dev/null")
    root_src = (root_src or "").strip().splitlines()[0] if root_src.strip() else ""
    is_zfs_root = bool(root_src) and not root_src.startswith("/")
    root_pool = root_src.split("/")[0] if is_zfs_root else None
    add("zfs_root", is_zfs_root, True,
        f"/ is on {root_src or 'unknown'}" if is_zfs_root
        else f"/ is on {root_src or 'unknown'} — not a ZFS root, this flow does not apply")
    add("pool_is_root", root_pool == pool, False,
        f"target pool {pool}, root pool {root_pool}"
        + ("" if root_pool == pool else " — the boot steps only matter for the root pool"))

    # -- pool state ----------------------------------------------------------
    pools = await _status_pools(cluster, node, pool)
    pobj = next((p for p in pools if p["name"] == pool), None)
    if not pobj:
        raise ZfsError("pool_not_found", f"{pool} not found on {node}", status=404)
    members = _root_pool_members(pobj)
    healthy = [m for m in members if (m.get("state") or "").upper() == "ONLINE"]
    dead = [m for m in members
            if (m.get("state") or "").upper() in ("FAULTED", "REMOVED", "UNAVAIL", "OFFLINE")]
    add("pool_readable", True, True, f"{len(members)} member(s), {len(healthy)} ONLINE")

    scan = pobj.get("scan") or {}
    scanning = (scan.get("state") or "").upper() in ("SCANNING", "ACTIVE")
    add("no_scan_running", not scanning, True,
        "no scrub/resilver in flight" if not scanning
        else f"{scan.get('function')} at {scan.get('percent')}% — wait for it to finish")

    # -- which scenario are we in? ------------------------------------------
    if dead:
        scenario = "replace_dead"
    elif old_disk:
        scenario = "replace_live"
    else:
        scenario = "add_mirror"
    if scenario == "replace_dead" and not healthy:
        add("survivor_exists", False, True,
            "every member is faulted — there is no source to clone from and no "
            "redundancy to rebuild from; restore from backup instead")
    else:
        add("survivor_exists", True, True, f"{len(healthy)} healthy member(s)")

    # source of the partition table: never the dying disk
    source = None
    for m in healthy:
        by = m.get("by_id")
        if by:
            source = re.sub(r"-part\d+$", "", by)
            break
    add("clone_source", bool(source), True,
        f"partition table will be cloned from {source}" if source
        else "no healthy partition-backed member to clone the layout from")

    # -- the new disk --------------------------------------------------------
    new_path = _BYID_DIR + new_disk
    _, blk, _ = await _run(
        cluster, node, f"lsblk -rno FSTYPE,MOUNTPOINT {shlex.quote(new_path)} 2>/dev/null")
    busy = [ln.strip() for ln in (blk or "").splitlines() if ln.strip()]
    add("new_disk_blank", not busy, True,
        "blank" if not busy else "carries data: " + "; ".join(busy[:4]))

    in_pool = any(re.sub(r"-part\d+$", "", (m.get("by_id") or "")) == new_disk
                  for m in members)
    add("new_disk_not_member", not in_pool, True,
        "not already in this pool" if not in_pool else "already a member of this pool")

    src_sz = await _disk_bytes(cluster, node, _BYID_DIR + source) if source else 0
    new_sz = await _disk_bytes(cluster, node, new_path)
    big_enough = bool(new_sz) and bool(src_sz) and new_sz >= src_sz
    add("new_disk_size", big_enough, True,
        f"new {new_sz} B vs source {src_sz} B"
        + ("" if big_enough else " — the whole partition table is cloned, so the "
                                 "new disk must be at least as large; this cannot be forced"))

    # sector size mismatch is not fatal but changes performance/ashift fit
    _, sec, _ = await _run(
        cluster, node,
        f"lsblk -dno PHY-SEC,LOG-SEC {shlex.quote(new_path)} 2>/dev/null; echo ---; "
        + (f"lsblk -dno PHY-SEC,LOG-SEC {shlex.quote(_BYID_DIR + source)} 2>/dev/null"
           if source else "echo"))
    a, _, b = (sec or "").partition("---")
    add("sector_match", a.split() == b.split(), False,
        f"new {a.split()} vs source {b.split()}")

    # -- firmware / boot -----------------------------------------------------
    _, fw, _ = await _run(
        cluster, node, "[ -d /sys/firmware/efi ] && echo uefi || echo bios")
    uefi = "uefi" in (fw or "").lower()
    _, pbt, _ = await _run(cluster, node, "proxmox-boot-tool status 2>&1 | tail -6")
    add("firmware", True, False, ("UEFI" if uefi else "BIOS/legacy")
        + " — " + " / ".join(l.strip() for l in (pbt or "").splitlines()
                             if "configured with" in l)[:160])

    layout = await _boot_layout(cluster, node, source) if source else None
    add("boot_layout", bool(layout), True,
        (f"ESP=part{layout['esp']}, ZFS=part{layout['zfs']}"
         + (f", BIOS-boot=part{layout['bios']}" if layout and layout.get("bios") else ""))
        if layout else "could not read the source disk's partition roles")

    # -- backups: HARD GATE --------------------------------------------------
    # rpool carries local-zfs, i.e. the guests themselves. Operating without a
    # recent backup is how a bad night becomes a lost node.
    guests = []
    try:
        cache = getattr(cluster, "cache", None)
        vms = (getattr(cache, "vms", None) or {}) if cache else {}
        for v in (vms.values() if isinstance(vms, dict) else (vms or [])):
            g = (lambda o, a: o.get(a) if isinstance(o, dict) else getattr(o, a, None))
            if g(v, "node") == node:
                guests.append(g(v, "vmid"))
    except Exception:
        pass
    try:
        _, bl, _ = await _run(
            cluster, node,
            "pvesh get /cluster/backup-info/not-backed-up --output-format json 2>/dev/null || echo '[]'")
        not_backed = json.loads((bl or "[]").strip() or "[]")
        missing = [x.get("vmid") for x in not_backed if x.get("vmid") in guests]
    except Exception:
        missing = []
        not_backed = None
    if not_backed is None:
        add("guest_backups", False, True,
            "could not determine backup coverage for this node's guests — "
            "verify manually, then re-run with acknowledge_backup")
    else:
        add("guest_backups", not missing, True,
            f"all {len(guests)} guest(s) on this node have a backup job"
            if not missing else
            f"{len(missing)} guest(s) have NO backup: {missing[:10]} — rpool holds "
            "local-zfs, so these disks live on the pool you are about to modify")

    # -- assemble the plan ---------------------------------------------------
    plan: list[str] = []
    esp = (layout or {}).get("esp")
    zfs_part = (layout or {}).get("zfs") or "3"
    bios_part = (layout or {}).get("bios")
    if source:
        src_path = _BYID_DIR + source
        plan.append(f"sgdisk --backup={shlex.quote('/root/gpt-backup-' + source + '.bin')} "
                    f"{shlex.quote(src_path)}")
        plan.append(f"sgdisk --replicate={shlex.quote(new_path)} {shlex.quote(src_path)}")
        plan.append(f"sgdisk --randomize-guids {shlex.quote(new_path)}")
        plan.append(f"partprobe {shlex.quote(new_path)} 2>/dev/null; udevadm settle")
        if esp:
            plan.append(f"proxmox-boot-tool format {shlex.quote(new_path)}-part{esp} --force")
            plan.append(f"proxmox-boot-tool init {shlex.quote(new_path)}-part{esp}")
        if bios_part:
            plan.append(f"grub-install {shlex.quote(new_path)} || true")
        if scenario == "replace_dead":
            target = old_disk or (dead[0].get("path") or dead[0].get("name") if dead else "")
            plan.append(f"zpool replace {shlex.quote(pool)} {shlex.quote(target)} "
                        f"{shlex.quote(new_path)}-part{zfs_part}")
        else:
            anchor = f"{_BYID_DIR}{source}-part{zfs_part}"
            plan.append(f"zpool attach {shlex.quote(pool)} {shlex.quote(anchor)} "
                        f"{shlex.quote(new_path)}-part{zfs_part}")

    fatal_fail = [c for c in checks if c["fatal"] and not c["ok"]]
    return {
        "ok": not fatal_fail,
        "scenario": scenario,
        "pool": pool,
        "source_disk": source,
        "old_disk": old_disk or (re.sub(r"-part\d+$", "", dead[0].get("by_id") or "")
                                 if dead and dead[0].get("by_id") else None),
        "new_disk": new_disk,
        "layout": layout,
        "uefi": uefi,
        "checks": checks,
        "blocking": [c["id"] for c in fatal_fail],
        "plan": plan,
        "post_steps": [
            "zpool status " + pool + "   # wait for resilver to reach 100%",
            "(then) zpool detach — offered by this tool once resilver completes",
            "proxmox-boot-tool clean && proxmox-boot-tool refresh",
        ],
    }


# ------------------------------------------------------------------ handlers

@role_required("admin")
@zfs_errors
async def boot_mirror_state_handler(request: web.Request) -> web.Response:
    """Current boot-mirror picture for a node, plus any job still in flight.

    This is what a returning operator hits: the resilver may have been running
    for hours across a page close and a daemon restart.
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    job = await _active_job(cid, node)
    _, root_src, _ = await _run(cluster, node, "findmnt -no SOURCE / 2>/dev/null")
    root_src = (root_src or "").strip().splitlines()[0] if root_src.strip() else ""
    root_pool = root_src.split("/")[0] if root_src and not root_src.startswith("/") else None
    out = {"ok": True, "root_pool": root_pool, "active_job": job}
    if root_pool:
        pools = await _status_pools(cluster, node, root_pool)
        p = next((x for x in pools if x["name"] == root_pool), None)
        if p:
            members = _root_pool_members(p)
            out["pool"] = {
                "name": p["name"], "state": p["state"], "scan": p.get("scan"),
                "is_mirror": any((v.get("type") or "").lower() == "mirror"
                                 for v in (p.get("vdevs") or {}).get("data", [])),
                "members": [{"by_id": m.get("by_id"), "state": m.get("state"),
                             "path": m.get("path")} for m in members],
            }
    return web.json_response(out)


@role_required("admin")
@zfs_errors
@pool_serialized
async def boot_mirror_preflight_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(body.get("pool") or "rpool")
        new_disk = _norm_device(body.get("new_disk") or "")[len(_BYID_DIR):]
        old_raw = body.get("old_disk")
        old_disk = _norm_device(old_raw)[len(_BYID_DIR):] if old_raw else None
    except ZfsError as e:
        return web.json_response({"ok": False, "error": e.code, "detail": e.detail},
                                 status=400)
    result = await _preflight(cluster, cid, node, pool, new_disk, old_disk)
    await _audit(request, "zfs.boot_mirror.preflight", cid, f"{node}/{pool}",
                 "ok" if result["ok"] else "blocked",
                 {"new_disk": new_disk, "scenario": result["scenario"],
                  "blocking": result["blocking"]})
    return web.json_response(result)


async def _audit(request, action, cid, target, result, params):
    user, ip, rid = _actor(request)
    await audit.write(user=user, source_ip=ip, request_id=rid, action=action,
                      cluster_id=cid, target=target, result=result, params=params)


@role_required("admin")
@zfs_errors
@pool_serialized
async def boot_mirror_start_handler(request: web.Request) -> web.Response:
    """Run the plan up to and including `zpool attach/replace`, then watch.

    Deliberately does NOT detach the old disk — that is a separate, explicit
    action offered only once the resilver has completed.
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(body.get("pool") or "rpool")
        new_disk = _norm_device(body.get("new_disk") or "")[len(_BYID_DIR):]
        old_raw = body.get("old_disk")
        old_disk = _norm_device(old_raw)[len(_BYID_DIR):] if old_raw else None
    except ZfsError as e:
        return web.json_response({"ok": False, "error": e.code, "detail": e.detail},
                                 status=400)

    if await _active_job(cid, node):
        return web.json_response(
            {"ok": False, "error": "job_in_progress",
             "detail": "a boot-mirror operation is already running on this node"},
            status=409)

    pre = await _preflight(cluster, cid, node, pool, new_disk, old_disk)
    # The backup gate can only be bypassed by an explicit, audited acknowledgement.
    ack = bool(body.get("acknowledge_backup"))
    blocking = [b for b in pre["blocking"]
                if not (b == "guest_backups" and ack)]
    if blocking:
        await _audit(request, "zfs.boot_mirror.start", cid, f"{node}/{pool}",
                     "refused: " + ",".join(blocking), {"new_disk": new_disk})
        return web.json_response(
            {"ok": False, "error": "preflight_failed", "blocking": blocking,
             "checks": pre["checks"]}, status=409)
    if str(body.get("confirm_pool") or "") != pool:
        return web.json_response(
            {"ok": False, "error": "confirmation_required",
             "detail": f"type the pool name ({pool}) to confirm"}, status=400)

    user, _, _ = _actor(request)
    job_id = await _job_create(cid, node, pool, pre["scenario"], pre["source_disk"],
                               pre["old_disk"], new_disk, user,
                               {"preflight": pre, "plan": pre["plan"],
                                "backup_acknowledged": ack})
    await _ev(job_id, "info", f"scenario={pre['scenario']} source={pre['source_disk']} "
                              f"new={new_disk}")
    if ack:
        await _ev(job_id, "warn", "operator acknowledged missing guest backups")
    await _audit(request, "zfs.boot_mirror.start", cid, f"{node}/{pool}", "ok",
                 {"job_id": job_id, "scenario": pre["scenario"],
                  "new_disk": new_disk, "backup_acknowledged": ack})
    _spawn(_run_job(cluster, cid, node, pool, job_id, pre["plan"]))
    return web.json_response({"ok": True, "job_id": job_id,
                              "scenario": pre["scenario"]})


def _spawn(coro) -> None:
    t = asyncio.create_task(coro)
    _TASKS.add(t)
    t.add_done_callback(_TASKS.discard)


async def _run_job(cluster, cid: str, node: str, pool: str, job_id: int,
                   plan: list[str]) -> None:
    """Execute the plan one command at a time, recording each.

    One command per SSH round trip (not `&&`-chained) so a failure names the
    exact step, and so the timeline a returning operator sees is truthful.
    """
    stage_for = {"sgdisk --backup": "preflight", "sgdisk --replicate": "cloning",
                 "sgdisk --randomize": "cloning", "partprobe": "cloning",
                 "proxmox-boot-tool": "bootloader", "grub-install": "bootloader",
                 "zpool attach": "attaching", "zpool replace": "attaching"}
    try:
        for cmd in plan:
            stage = next((v for k, v in stage_for.items() if cmd.startswith(k)), "cloning")
            await _set_stage(job_id, stage)
            await _ev(job_id, "command", cmd)
            rc, out, err = await _run(cluster, node, cmd, timeout=180)
            detail = ((out or "") + ("\n" + err if err else "")).strip()
            if detail:
                await _ev(job_id, "info", detail[:1500])
            if rc != 0:
                await _ev(job_id, "error", f"exit {rc} — stopping here")
                await _set_stage(job_id, "failed", status="failed", finished=True)
                return
        await _set_stage(job_id, "resilvering")
        await _ev(job_id, "info", "attach done; resilver started")
        _WATCHERS[job_id] = asyncio.create_task(
            _watch(cluster, cid, node, pool, job_id))
        _TASKS.add(_WATCHERS[job_id])
    except ZfsError as e:
        await _ev(job_id, "error", f"{e.code}: {e.detail[:400]}")
        await _set_stage(job_id, "failed", status="failed", finished=True)
    except Exception as e:                      # never lose the job silently
        logger.exception("boot_mirror job %s crashed", job_id)
        await _ev(job_id, "error", str(e)[:400])
        await _set_stage(job_id, "failed", status="failed", finished=True)


async def _watch(cluster, cid: str, node: str, pool: str, job_id: int) -> None:
    """Follow the resilver to completion, persisting progress.

    Progress lives in the DB, not in the browser: the operator closes the tab,
    goes home, and comes back to a percentage that kept moving.
    """
    started = False
    misses = 0
    deadline = _now() + 14 * 24 * 3600
    try:
        while _now() < deadline:
            await asyncio.sleep(POLL_SECS)
            try:
                pools = await _status_pools(cluster, node, pool)
            except ZfsError:
                misses += 1
                if misses >= 30:
                    await _ev(job_id, "warn", "pool unreadable for ~10 min")
                    await _set_stage(job_id, "failed", status="failed", finished=True)
                    return
                continue
            misses = 0
            p = next((x for x in pools if x["name"] == pool), None)
            if not p:
                await _ev(job_id, "error", "pool disappeared")
                await _set_stage(job_id, "failed", status="failed", finished=True)
                return
            scan = p.get("scan") or {}
            state = (scan.get("state") or "").upper()
            if state in ("SCANNING", "ACTIVE"):
                started = True
                if scan.get("paused"):
                    await _ev(job_id, "warn", "resilver paused")
                await _set_stage(job_id, "resilvering",
                                 progress=float(scan.get("percent") or 0))
                continue
            if state == "FINISHED" and started:
                await _ev(job_id, "info",
                          f"resilver finished; pool {p['state']}, "
                          f"{p['error_count']} error(s)")
                await _set_stage(job_id, "awaiting_detach", progress=100.0)
                return
            if not scan and started:
                await _set_stage(job_id, "awaiting_detach", progress=100.0)
                return
        await _ev(job_id, "warn", "watch timed out after 14 days")
        await _set_stage(job_id, "failed", status="failed", finished=True)
    except asyncio.CancelledError:
        raise
    except Exception as e:
        logger.exception("boot_mirror watch %s failed", job_id)
        try:
            await _ev(job_id, "error", str(e)[:300])
            await _set_stage(job_id, "failed", status="failed", finished=True)
        except Exception:
            pass


@role_required("admin")
@zfs_errors
async def boot_mirror_detach_handler(request: web.Request) -> web.Response:
    """Detach the old member — only after the resilver really finished.

    Re-checks the live pool rather than trusting the job row: this is the step
    that, done early, leaves a single copy of nothing.
    """
    cid = request.match_info["cluster_id"]
    job_id = int(request.match_info["job_id"])
    job = await _job_full(job_id)
    if not job or job["cluster_id"] != cid:
        return web.json_response({"ok": False, "error": "job_not_found"}, status=404)
    if job["stage"] != "awaiting_detach":
        return web.json_response(
            {"ok": False, "error": "not_ready",
             "detail": f"job is at stage '{job['stage']}'"}, status=409)
    if not job["old_disk"]:
        return web.json_response(
            {"ok": False, "error": "nothing_to_detach",
             "detail": "this was an add-mirror operation; there is no old member"},
            status=400)

    cluster = _require_cluster(cid)
    node, pool = job["node"], job["pool"]
    body = await _body(request)
    if str(body.get("confirm_pool") or "") != pool:
        return web.json_response({"ok": False, "error": "confirmation_required"},
                                 status=400)

    # Verify against the LIVE pool, not the job row.
    pools = await _status_pools(cluster, node, pool)
    p = next((x for x in pools if x["name"] == pool), None)
    scan = (p or {}).get("scan") or {}
    if (scan.get("state") or "").upper() in ("SCANNING", "ACTIVE"):
        return web.json_response(
            {"ok": False, "error": "resilver_running",
             "detail": "the resilver is still running — detaching now would leave "
                       "the pool with a single incomplete copy"}, status=409)
    members = _root_pool_members(p or {})
    unhealthy = [m for m in members if (m.get("state") or "").upper() != "ONLINE"]
    if unhealthy and not body.get("force"):
        return web.json_response(
            {"ok": False, "error": "pool_not_healthy",
             "detail": "not every member is ONLINE: "
                       + ", ".join(f"{m.get('by_id')}={m.get('state')}" for m in unhealthy),
             "forceable": True}, status=409)

    await _set_stage(job_id, "detaching")
    old_member = next(
        (m.get("path") or m.get("name") for m in members
         if re.sub(r"-part\d+$", "", m.get("by_id") or "") == job["old_disk"]), None)
    if not old_member:
        old_member = f"{_BYID_DIR}{job['old_disk']}-part3"
    cmds = [f"zpool detach {shlex.quote(pool)} {shlex.quote(old_member)}"]
    # Drop the removed disk's ESP registration, or every kernel update warns
    # about a boot device that is no longer there.
    cmds += ["proxmox-boot-tool clean || true", "proxmox-boot-tool refresh || true"]
    for cmd in cmds:
        await _ev(job_id, "command", cmd)
        rc, out, err = await _run(cluster, node, cmd, timeout=180)
        detail = ((out or "") + ("\n" + err if err else "")).strip()
        if detail:
            await _ev(job_id, "info", detail[:1200])
        if rc != 0 and cmd.startswith("zpool detach"):
            await _ev(job_id, "error", f"detach failed (exit {rc})")
            await _set_stage(job_id, "awaiting_detach", status="running")
            await _audit(request, "zfs.boot_mirror.detach", cid, f"{node}/{pool}",
                         f"error: {detail[:120]}", {"job_id": job_id})
            return web.json_response({"ok": False, "error": "detach_failed",
                                      "detail": detail}, status=502)
        if cmd.startswith("proxmox-boot-tool"):
            await _set_stage(job_id, "cleaning")
    await _set_stage(job_id, "done", status="done", finished=True)
    await _ev(job_id, "info", "old member detached and boot entries cleaned")
    await _audit(request, "zfs.boot_mirror.detach", cid, f"{node}/{pool}", "ok",
                 {"job_id": job_id, "old_disk": job["old_disk"]})
    return web.json_response({"ok": True, "job_id": job_id,
                              "note": "reboot at a maintenance window to prove the "
                                      "new disk boots; keep the old disk in the "
                                      "machine until then"})


@role_required("admin")
@zfs_errors
async def boot_mirror_abort_handler(request: web.Request) -> web.Response:
    """Stop tracking a job. Does NOT undo anything already applied — an attach
    in progress keeps resilvering, which is the safe direction."""
    cid = request.match_info["cluster_id"]
    job_id = int(request.match_info["job_id"])
    job = await _job_row(job_id)
    if not job or job["cluster_id"] != cid:
        return web.json_response({"ok": False, "error": "job_not_found"}, status=404)
    t = _WATCHERS.pop(job_id, None)
    if t and not t.done():
        t.cancel()
    await _ev(job_id, "warn", "operator aborted tracking; any resilver continues")
    await _set_stage(job_id, "aborted", status="aborted", finished=True)
    await _audit(request, "zfs.boot_mirror.abort", cid,
                 f"{job['node']}/{job['pool']}", "ok", {"job_id": job_id})
    return web.json_response({"ok": True})


@role_required("viewer")
@zfs_errors
async def boot_mirror_jobs_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT id FROM boot_mirror_jobs WHERE cluster_id=? ORDER BY id DESC LIMIT 25",
            (cid,))
        ids = [int(r["id"]) for r in await cur.fetchall()]
    return web.json_response({"ok": True,
                              "jobs": [await _job_full(i) for i in ids]})


async def resume_on_startup() -> None:
    """Re-attach watchers to jobs that were mid-resilver when we stopped.

    Unlike a one-shot command, a resilver keeps going inside the kernel — so
    here we CAN legitimately pick the thread back up rather than marking the
    job orphaned. Jobs caught mid-command are marked failed for human review,
    because we cannot know whether that command completed.
    """
    try:
        async with db.connect() as c:
            cur = await c.execute(
                "SELECT id,cluster_id,node,pool,stage FROM boot_mirror_jobs "
                "WHERE status='running'")
            rows = [dict(r) for r in await cur.fetchall()]
        for r in rows:
            cluster = cluster_manager.get_cluster(r["cluster_id"])
            if r["stage"] == "resilvering" and cluster:
                await _ev(int(r["id"]), "info", "daemon restarted — resuming watch")
                t = asyncio.create_task(
                    _watch(cluster, r["cluster_id"], r["node"], r["pool"], int(r["id"])))
                _WATCHERS[int(r["id"])] = t
                _TASKS.add(t)
            elif r["stage"] in ("awaiting_detach",):
                continue                     # nothing running; UI will offer detach
            else:
                await _ev(int(r["id"]),
                          "warn", f"daemon restarted during '{r['stage']}' — "
                                  "marked for manual review")
                await _set_stage(int(r["id"]), "failed", status="failed", finished=True)
        if rows:
            logger.info("boot_mirror: reconciled %d in-flight job(s)", len(rows))
    except Exception as e:
        logger.warning("boot_mirror resume failed: %s", e)


ROUTES = [
    ("GET",  r"/api/clusters/{cluster_id}/nodes/{node}/zfs/boot-mirror",
             boot_mirror_state_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/boot-mirror/preflight",
             boot_mirror_preflight_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/boot-mirror/start",
             boot_mirror_start_handler),
    ("POST", r"/api/clusters/{cluster_id}/zfs/boot-mirror/{job_id}/detach",
             boot_mirror_detach_handler),
    ("POST", r"/api/clusters/{cluster_id}/zfs/boot-mirror/{job_id}/abort",
             boot_mirror_abort_handler),
    ("GET",  r"/api/clusters/{cluster_id}/zfs/boot-mirror/jobs",
             boot_mirror_jobs_handler),
]
