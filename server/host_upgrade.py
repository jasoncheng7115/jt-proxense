"""Batch PVE host upgrade orchestrator (admin only).

One job = rolling sweep across N selected hosts within a single PVE cluster.
Per-host flow:

    1. evacuate    — migrate every running VM/CT off the host
    2. updating    — `apt update && DEBIAN_FRONTEND=noninteractive apt
                     dist-upgrade -y -o Dpkg::Options::="--force-confdef"
                                       -o Dpkg::Options::="--force-confold"`
                     via SSH (asyncssh). Output captured for the audit log.
    3. awaiting_reboot — paused; admin clicks "reboot" or "skip reboot"
    4. rebooting   — issued `reboot` over SSH; poll PVE `/nodes/{n}/status`
                     until it answers OK (or timeout)
    5. restoring   — (optional, per job options) migrate the evacuated
                     VMs/CTs back to the original host
    6. done        — finished cleanly
    7. failed      — any step errored; the job records the error and moves
                     on to the next host. Operator-decided skip becomes
                     status='skipped' instead.

Job-level resume: every state transition is committed to SQLite, so a
daemon restart in the middle of an upgrade picks up where it left off
(via `resume_running_jobs_on_startup()` called from server.py startup).

OWASP design notes:
    A01 — admin role required on every endpoint.
    A03 — node names validated against PVE's allowed-name regex; SSH user
          + port read from per-cluster config; the apt command is built
          server-side (not from user input).
    A04 — Each step that mutates cluster state (migrate, reboot, …) is
          wrapped in try/except and surfaces a structured error to the
          events log. The job continues with the next host instead of
          cascading.
    A09 — Each step writes to `host_upgrade_events`. The audit log gets
          one entry per job-start, job-finish, and per-host
          state-change-of-interest (started, paused, rebooted, failed).
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
import time
from typing import Optional

from aiohttp import web

from . import audit, db
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)

_NODE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$")

_LOOP_TICK_S          = 2.0
_REBOOT_TIMEOUT_S     = 600      # 10 min for slow ZFS/initramfs boots
_MIGRATE_WAIT_S       = 1800     # 30 min per VM migrate (safety cap)
_APT_WAIT_S           = 3600     # hard cap on apt dist-upgrade; kill if exceeded
_SHUTDOWN_WAIT_S      = 300      # 5 min for an ACPI graceful guest shutdown
_START_WAIT_S         = 180      # 3 min for a guest to come back up
_TASK_POLL_S          = 4.0
_CEPH_CLEAN_WAIT_S    = 3600     # 1h soft cap, then hold + warn (never proceed dirty)
_CEPH_POLL_S          = 10.0     # how often to poll ceph status while waiting
_CEPH_EV_EVERY_S      = 60.0     # throttle "still rebalancing…" progress events

# Single source of truth for the apt command. Kept here (not user input)
# so a misconfigured job can't run "rm -rf /" via curl. Everything here exists
# to make the upgrade FULLY non-interactive — an interactive prompt would
# deadlock the SSH session (no TTY to answer it):
#   DEBIAN_FRONTEND=noninteractive  → debconf uses defaults, never asks
#   NEEDRESTART_MODE=a              → needrestart (Ubuntu 22.04+/Debian 12)
#                                     auto-restarts services instead of popping
#                                     its interactive whiptail "restart which?"
#   UCF_FORCE_CONFOLD=1             → ucf-managed conffiles keep the old version
#   Dpkg --force-conf{def,old}      → dpkg conffile conflicts keep existing
APT_CMD = (
    "apt-get update && "
    "DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a UCF_FORCE_CONFOLD=1 "
    "apt-get dist-upgrade -y "
    "-o Dpkg::Options::=--force-confdef "
    "-o Dpkg::Options::=--force-confold"
)


# ─────────────────────────────────────────────────────── persistence

def _now() -> int:
    return int(time.time())


def _job_row_to_dict(row) -> dict:
    return {
        "id":          row["id"],
        "cluster_id":  row["cluster_id"],
        "created_by":  row["created_by"],
        "created_at":  row["created_at"],
        "started_at":  row["started_at"],
        "finished_at": row["finished_at"],
        "status":      row["status"],
        "options":     json.loads(row["options_json"] or "{}"),
        "nodes":       json.loads(row["nodes_json"] or "[]"),
    }


# Terminal node states — never re-processed by the job runner.
_TERMINAL_STATUSES = ("done", "failed", "skipped", "aborted")
# In-flight states — only reachable on re-entry after a daemon restart (a
# fresh job starts every node 'queued'). These cannot be safely auto-resumed.
_IN_FLIGHT_STATUSES = ("evacuating", "updating", "awaiting_reboot",
                       "rebooting", "restoring")


def _resume_disposition(status: str) -> str:
    """How the job runner should treat a node row when (re)entering the loop:

      'skip' — already in a terminal state, leave it alone.
      'fail' — was in-flight when the daemon restarted; re-running would repeat
               the destructive evacuate/migrate from scratch (worst case a node
               that was 'restoring' has its guests yanked off source again), so
               fail it for manual review instead of blindly resuming.
      'run'  — fresh ('queued' or anything else): process normally.
    """
    if status in _TERMINAL_STATUSES:
        return "skip"
    if status in _IN_FLIGHT_STATUSES:
        return "fail"
    return "run"


def _node_row_to_dict(row) -> dict:
    return {
        "id":          row["id"],
        "job_id":      row["job_id"],
        "node":        row["node"],
        "ordinal":     row["ordinal"],
        "status":      row["status"],
        "target_node": row["target_node"],
        "started_at":  row["started_at"],
        "finished_at": row["finished_at"],
        "error":       row["error"],
        "detail":      json.loads(row["detail_json"] or "{}"),
    }


async def _ev(node_id: int, kind: str, message: str) -> None:
    msg = (message or "")[:2000]
    async with db.connect() as c:
        await c.execute(
            "INSERT INTO host_upgrade_events (node_id, ts, kind, message) "
            "VALUES (?, ?, ?, ?)",
            (node_id, _now(), kind, msg),
        )
        await c.commit()


async def _set_node_status(node_id: int, status: str, *,
                            error: Optional[str] = None,
                            started: bool = False,
                            finished: bool = False) -> None:
    sets = ["status = ?"]
    args: list = [status]
    if error is not None:
        sets.append("error = ?"); args.append(error)
    if started:
        sets.append("started_at = COALESCE(started_at, ?)"); args.append(_now())
    if finished:
        sets.append("finished_at = ?"); args.append(_now())
    args.append(node_id)
    async with db.connect() as c:
        await c.execute(
            f"UPDATE host_upgrade_nodes SET {', '.join(sets)} WHERE id = ?",
            tuple(args),
        )
        await c.commit()


async def _patch_node_detail(node_id: int, patch: dict) -> None:
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT detail_json FROM host_upgrade_nodes WHERE id = ?",
            (node_id,),
        )
        row = await cur.fetchone()
        if not row:
            return
        cur_detail = json.loads(row["detail_json"] or "{}")
        cur_detail.update(patch)
        await c.execute(
            "UPDATE host_upgrade_nodes SET detail_json = ? WHERE id = ?",
            (json.dumps(cur_detail), node_id),
        )
        await c.commit()


async def _set_node_target(node_id: int, target_node: str) -> None:
    async with db.connect() as c:
        await c.execute(
            "UPDATE host_upgrade_nodes SET target_node = ? WHERE id = ?",
            (target_node, node_id),
        )
        await c.commit()


async def _set_job_status(job_id: int, status: str, *,
                           started: bool = False,
                           finished: bool = False) -> None:
    sets = ["status = ?"]
    args: list = [status]
    if started:
        sets.append("started_at = COALESCE(started_at, ?)"); args.append(_now())
    if finished:
        sets.append("finished_at = ?"); args.append(_now())
    args.append(job_id)
    async with db.connect() as c:
        await c.execute(
            f"UPDATE host_upgrade_jobs SET {', '.join(sets)} WHERE id = ?",
            tuple(args),
        )
        await c.commit()


# ─────────────────────────────────────────────────────── ceph safety

def _any_online_node(cluster) -> Optional[str]:
    for n, info in cluster.cache.nodes.items():
        if (getattr(info, "status", "") or "").lower() == "online":
            return n
    return None


async def _ceph_present(cluster) -> bool:
    """True if this cluster runs Ceph (the status endpoint returns a health
    block). Used to auto-enable the rebalance gate; a non-Ceph cluster just
    skips it."""
    node = _any_online_node(cluster)
    if not node:
        return False
    try:
        st = await cluster.client.get_ceph_status(node)
    except Exception:
        return False
    return bool(st) and bool(st.get("health") or st.get("pgmap"))


def _ceph_clean_state(st: dict) -> tuple[bool, str]:
    """Is Ceph fully balanced? Clean = every PG active+clean, zero degraded /
    misplaced objects, no recovery in flight.

    We deliberately do NOT gate on health.status == HEALTH_OK: setting the
    `noout` flag (which we do around each reboot) makes Ceph report
    HEALTH_WARN on its own, so the health string would never clear. PG state
    is the real signal."""
    pgmap = st.get("pgmap") or {}
    num_pgs = pgmap.get("num_pgs")
    states = pgmap.get("pgs_by_state") or []
    clean_pgs = sum(int(s.get("count", 0) or 0) for s in states
                    if s.get("state_name") == "active+clean")
    dirty = [f"{s.get('state_name')}×{s.get('count')}" for s in states
             if s.get("state_name") != "active+clean"]
    degraded = float(pgmap.get("degraded_objects", 0) or 0)
    misplaced = float(pgmap.get("misplaced_objects", 0) or 0)
    recovering = float(pgmap.get("recovering_objects_per_sec", 0) or 0)
    clean = (
        isinstance(num_pgs, int) and num_pgs > 0
        and clean_pgs == num_pgs and not dirty
        and degraded == 0 and misplaced == 0 and recovering == 0
    )
    if clean:
        return True, f"all {num_pgs} PGs active+clean"
    parts = []
    if isinstance(num_pgs, int) and num_pgs:
        parts.append(f"{clean_pgs}/{num_pgs} PGs clean")
    if dirty:
        parts.append(", ".join(dirty[:4]))
    if degraded:
        parts.append(f"degraded={int(degraded)}")
    if misplaced:
        parts.append(f"misplaced={int(misplaced)}")
    return False, "; ".join(parts) or "not active+clean"


async def _ceph_set_noout(cluster, on: bool, node_id: int) -> None:
    """Set/unset the cluster-wide `noout` flag. Best-effort + logged: while
    noout is set, a briefly-down OSD (host reboot) is not marked out, so Ceph
    doesn't kick off a full rebalance for a short maintenance window."""
    try:
        if on:
            await cluster.client.ceph_set_flag("noout")
        else:
            await cluster.client.ceph_unset_flag("noout")
        await _ev(node_id, "info", f"ceph: noout {'set' if on else 'unset'}")
    except Exception as e:
        await _ev(node_id, "warn",
                   f"ceph: failed to {'set' if on else 'unset'} noout: {e}")


async def _wait_ceph_clean(cluster, job_id: int, node_id: int) -> bool:
    """Block until Ceph is fully balanced before the next host is touched.

    Returns False only if the job is aborted while waiting. After a soft cap
    it keeps holding (never proceeds while dirty) and warns the operator to
    abort if it's genuinely stuck — this is the 'pause for admin' behaviour."""
    start = time.time()
    last_ev = 0.0
    warned = False
    await _ev(node_id, "info",
               "ceph: waiting for rebalance to finish (active+clean) before next host")
    while True:
        if _control.is_aborted(job_id):
            return False
        node = _any_online_node(cluster)
        try:
            st = await cluster.client.get_ceph_status(node) if node else {}
        except Exception:
            st = {}
        clean, summary = _ceph_clean_state(st or {})
        if clean:
            await _ev(node_id, "info", f"ceph: {summary} — proceeding to next host")
            return True
        now = time.time()
        elapsed = now - start
        if elapsed > _CEPH_CLEAN_WAIT_S and not warned:
            warned = True
            await _ev(node_id, "warn",
                       f"ceph: still rebalancing after {int(elapsed // 60)} min "
                       f"({summary}) — holding; abort the job to override")
        elif now - last_ev >= _CEPH_EV_EVERY_S:
            last_ev = now
            await _ev(node_id, "info", f"ceph: rebalancing… {summary}")
        await asyncio.sleep(_CEPH_POLL_S)


# ─────────────────────────────────────────────────────── helpers

def _ssh_for(cluster, node: str) -> tuple[str, str, int]:
    health = cluster.client.get_health_status() or {}
    info = health.get(node) or {}
    host = info.get("host") or node
    user = getattr(cluster.config, "ssh_user", None) or "root"
    port = int(getattr(cluster.config, "ssh_port", None) or 22)
    return host, user, port


def _vms_on_node(cluster, node: str) -> list:
    out = []
    for vm in cluster.cache.vms.values():
        if getattr(vm, "node", "") != node:
            continue
        if (getattr(vm, "status", "") or "").lower() != "running":
            continue
        out.append(vm)
    return out


def _pick_auto_target(cluster, source: str, exclude: set[str]) -> Optional[str]:
    """Least-loaded online sibling node. CPU% × 100 + MEM% as score."""
    best: Optional[tuple[float, str]] = None
    for n, info in cluster.cache.nodes.items():
        if n == source or n in exclude:
            continue
        if (getattr(info, "status", "") or "").lower() != "online":
            continue
        cpu = float(getattr(info.cpu, "usage_percent", 0) or 0)
        mem_total = float(getattr(info.memory, "total_bytes", 0) or 0)
        mem_used  = float(getattr(info.memory, "used_bytes", 0) or 0)
        mem_pct = (mem_used / mem_total * 100.0) if mem_total > 0 else 0
        score = cpu * 100 + mem_pct
        if best is None or score < best[0]:
            best = (score, n)
    return best[1] if best else None


def _node_score(cluster, name: str) -> float:
    """CPU% × 100 + MEM% — the same load metric _pick_auto_target uses."""
    info = cluster.cache.nodes.get(name)
    if info is None:
        return 0.0
    cpu = float(getattr(getattr(info, "cpu", None), "usage_percent", 0) or 0)
    mt = float(getattr(getattr(info, "memory", None), "total_bytes", 0) or 0)
    mu = float(getattr(getattr(info, "memory", None), "used_bytes", 0) or 0)
    return cpu * 100 + (mu / mt * 100.0 if mt > 0 else 0)


def _eligible_targets(cluster, source: str, exclude: set[str]) -> list[str]:
    """All online sibling nodes that may receive guests, least-loaded
    first. Used to SPREAD a host's guests across the cluster instead of
    dumping them all on one node."""
    out = []
    for n, info in cluster.cache.nodes.items():
        if n == source or n in exclude:
            continue
        if (getattr(info, "status", "") or "").lower() != "online":
            continue
        out.append(n)
    out.sort(key=lambda n: _node_score(cluster, n))
    return out


# ─────────────────────────────────────────────────────── core orchestrator

async def _wait_for_task(cluster, node: str, upid: str, max_s: int) -> dict:
    deadline = time.time() + max_s
    while time.time() < deadline:
        try:
            st = await cluster.client.get_task_status(node, upid)
            if (st.get("status") or "") != "running":
                return st
        except Exception as e:
            logger.warning("task_status %s failed: %s", upid, e)
        await asyncio.sleep(_TASK_POLL_S)
    return {"status": "running", "exitstatus": "timeout", "_timeout": True}


async def _evacuate_node(cluster, source: str, targets: list[str],
                          node_id: int) -> list[dict]:
    """Migrate every guest off `source`, SPREADING them across the
    `targets` pool instead of piling them all onto one node. Each guest
    goes to the currently-lowest projected-load target; we bump that
    target's projected load after each assignment so the next guest
    lands elsewhere. (Manual mode passes a single-element pool, so this
    collapses to the operator's explicit choice.)"""
    results: list[dict] = []
    vms = _vms_on_node(cluster, source)
    # Seed projected load with each target's real current load.
    projected = {t: _node_score(cluster, t) for t in targets}
    await _ev(node_id, "info",
              f"evacuating {len(vms)} guest(s) off {source} across "
              f"{len(targets)} target(s): {', '.join(targets)}")
    for vm in vms:
        vmid = int(vm.vmid)
        vm_type = getattr(vm, "type", "qemu")
        # Pick the least-loaded eligible target for THIS guest.
        target = min(projected, key=projected.get) if projected else (targets[0] if targets else None)
        try:
            if vm_type == "lxc":
                # PVE has NO live migration for LXC — a running CT must use
                # restart-mode (shut down → migrate → start on target).
                # Passing online=1 triggers the live path and PVE rejects
                # it ("lxc live migration is currently not implemented").
                running = (getattr(vm, "status", "") or "").lower() == "running"
                upid = await cluster.client.ct_migrate(
                    source, vmid, target=target, online=False, restart=running,
                )
            else:
                upid = await cluster.client.vm_migrate(
                    source, vmid, target=target, online=True,
                )
            st = await _wait_for_task(cluster, source, upid, _MIGRATE_WAIT_S)
            ok = (st.get("exitstatus") or "") == "OK"
            results.append({
                "vmid": vmid, "type": vm_type, "ok": ok,
                "upid": upid, "exitstatus": st.get("exitstatus"),
                "target": target,
            })
            await _ev(node_id, "info" if ok else "warn",
                       f"{vm_type}/{vmid} migrate → {target}: {st.get('exitstatus')}")
        except Exception as e:
            results.append({
                "vmid": vmid, "type": vm_type, "ok": False, "detail": str(e),
                "target": target,
            })
            await _ev(node_id, "warn", f"{vm_type}/{vmid} migrate failed: {e}")
        # Bump the chosen target's projected load so guests spread out.
        # ~15 points/guest ≈ a moderate VM's CPU+MEM footprint; enough to
        # round-robin while still favouring genuinely idle nodes.
        if target in projected:
            projected[target] += 15
    return results


async def _run_apt_upgrade(cluster, node: str, node_id: int) -> tuple[bool, str, bool]:
    """SSH into `node`, run apt update + dist-upgrade.
    Returns (success, last_tail, reboot_required)."""
    try:
        import asyncssh
    except ImportError:
        await _ev(node_id, "error", "asyncssh not installed on jt-proxense host")
        return False, "asyncssh missing", False

    host, user, port = _ssh_for(cluster, node)
    await _ev(node_id, "info", f"ssh {user}@{host}:{port}  $ {APT_CMD}")
    tail: list[str] = []
    try:
        async with asyncssh.connect(
            host, port=port, username=user, known_hosts=None,
        ) as conn:
            # stdin=DEVNULL: any process that still tries to read a prompt gets
            # immediate EOF and proceeds/fails fast, instead of blocking on an
            # open pipe with no TTY to answer.
            proc = await conn.create_process(APT_CMD, stdin=asyncssh.DEVNULL)
            assert proc.stdout and proc.stderr

            async def _drain(stream, kind):
                async for line in stream:
                    line = (line or "").rstrip()
                    if not line:
                        continue
                    tail.append(line[:400])
                    if len(tail) > 200:
                        del tail[0:50]
                    await _ev(node_id, kind, line[:400])

            # Hard cap the whole run. If apt ever does block on a prompt (e.g. a
            # package whose postinst reads /dev/tty directly, bypassing debconf),
            # we kill it and fail just this host rather than hang the job forever.
            try:
                await asyncio.wait_for(
                    asyncio.gather(_drain(proc.stdout, "info"),
                                   _drain(proc.stderr, "warn"),
                                   proc.wait()),
                    timeout=_APT_WAIT_S,
                )
            except asyncio.TimeoutError:
                try:
                    proc.kill()
                except Exception:
                    pass
                await _ev(node_id, "error",
                           f"apt exceeded {_APT_WAIT_S // 60} min and was killed "
                           f"(likely an interactive prompt) — failing this host")
                return False, "apt timed out (possible interactive prompt)", False
            rc = proc.returncode or 0
            rr = await conn.run("test -e /var/run/reboot-required", check=False)
            reboot_req = rr.exit_status == 0
        last_tail = "\n".join(tail[-30:])
        await _patch_node_detail(node_id, {
            "apt_out_tail": last_tail,
            "apt_exit_code": rc,
            "reboot_required": reboot_req,
        })
        return rc == 0, last_tail, reboot_req
    except Exception as e:
        await _ev(node_id, "error", f"ssh/apt failed: {e}")
        return False, str(e), False


async def _reboot_node(cluster, node: str, node_id: int) -> bool:
    try:
        import asyncssh
    except ImportError:
        await _ev(node_id, "error", "asyncssh not installed")
        return False
    host, user, port = _ssh_for(cluster, node)
    # If this host happens to be jt-proxense's ACTIVE API endpoint, hop
    # off it now — reactive failover would otherwise burn a few failed
    # polls (and look like an outage) while the host reboots.
    try:
        if cluster.client.steer_away_from(host):
            await _ev(node_id, "info",
                      f"API endpoint steered away from {host} before reboot")
    except Exception:
        pass
    await _ev(node_id, "info", f"reboot requested on {host}")
    try:
        async with asyncssh.connect(
            host, port=port, username=user, known_hosts=None,
        ) as conn:
            try:
                await conn.run("systemctl reboot --no-wall", check=False)
            except Exception:
                pass   # SSH dies mid-command — that IS the reboot signal.
    except Exception as e:
        await _ev(node_id, "warn", f"reboot SSH closed: {e}")

    deadline = time.time() + _REBOOT_TIMEOUT_S
    last_err = ""
    while time.time() < deadline:
        await asyncio.sleep(5)
        try:
            st = await cluster.client.get_node_status(node)
            if (st.get("uptime") or 0) > 0:
                await _ev(node_id, "info",
                           f"{node} back online (uptime {st.get('uptime')}s)")
                return True
        except Exception as e:
            last_err = str(e)
    await _ev(node_id, "error",
               f"reboot timed out after {_REBOOT_TIMEOUT_S}s: {last_err}")
    return False


async def _restore_node(cluster, original_node: str,
                        evacuated: list[dict], node_id: int) -> list[dict]:
    """Migrate each evacuated guest BACK to `original_node`. Guests were
    spread across several targets, so each one's source-for-restore is
    its own recorded `target` (not one shared node)."""
    results: list[dict] = []
    await _ev(node_id, "info", f"restoring {len(evacuated)} guest(s) → {original_node}")
    for e in evacuated:
        if not e.get("ok"):
            continue
        vmid = int(e["vmid"])
        vm_type = e.get("type", "qemu")
        from_node = e.get("target")
        if not from_node:
            continue
        try:
            if vm_type == "lxc":
                # No LXC live migration — running CTs restore via restart-mode.
                upid = await cluster.client.ct_migrate(
                    from_node, vmid, target=original_node,
                    online=False, restart=True,
                )
            else:
                upid = await cluster.client.vm_migrate(
                    from_node, vmid, target=original_node, online=True,
                )
            st = await _wait_for_task(cluster, from_node, upid, _MIGRATE_WAIT_S)
            ok = (st.get("exitstatus") or "") == "OK"
            results.append({
                "vmid": vmid, "type": vm_type, "ok": ok,
                "upid": upid, "exitstatus": st.get("exitstatus"),
            })
            await _ev(node_id, "info" if ok else "warn",
                       f"{vm_type}/{vmid} restore → {original_node}: {st.get('exitstatus')}")
        except Exception as exc:
            results.append({
                "vmid": vmid, "type": vm_type, "ok": False, "detail": str(exc),
            })
            await _ev(node_id, "warn", f"{vm_type}/{vmid} restore failed: {exc}")
    return results


async def _shutdown_node_guests(cluster, node: str, node_id: int) -> list[dict]:
    """in_place mode step 1: ACPI-shutdown every running guest on `node`.

    Returns [{vmid, type, ok, upid, exitstatus}] — the ok=True entries are the
    guests we later start back up via _start_node_guests after the reboot.
    """
    results: list[dict] = []
    vms = _vms_on_node(cluster, node)
    await _ev(node_id, "info",
               f"in-place: shutting down {len(vms)} running guest(s) on {node}")
    for vm in vms:
        vmid = int(vm.vmid)
        vm_type = getattr(vm, "type", "qemu")
        try:
            if vm_type == "lxc":
                upid = await cluster.client.ct_shutdown(node, vmid)
            else:
                upid = await cluster.client.vm_shutdown(node, vmid)
            st = await _wait_for_task(cluster, node, upid, _SHUTDOWN_WAIT_S)
            ok = (st.get("exitstatus") or "") == "OK"
            results.append({"vmid": vmid, "type": vm_type, "ok": ok,
                            "upid": upid, "exitstatus": st.get("exitstatus")})
            await _ev(node_id, "info" if ok else "warn",
                       f"{vm_type}/{vmid} shutdown: {st.get('exitstatus')}")
        except Exception as e:
            results.append({"vmid": vmid, "type": vm_type, "ok": False,
                            "detail": str(e)})
            await _ev(node_id, "warn", f"{vm_type}/{vmid} shutdown failed: {e}")
    return results


async def _start_node_guests(cluster, node: str, guests: list[dict],
                             node_id: int) -> list[dict]:
    """in_place mode final step: start the guests we shut down (ok=True ones).

    Best-effort: a guest that the node already auto-started on boot (onboot=1)
    will fail here with "already running" — that's logged as a warning, not a
    host failure, since the upgrade itself already succeeded.
    """
    results: list[dict] = []
    to_start = [g for g in guests if g.get("ok")]
    await _ev(node_id, "info",
               f"in-place: starting {len(to_start)} guest(s) back up on {node}")
    for g in to_start:
        vmid = int(g["vmid"])
        vm_type = g.get("type", "qemu")
        try:
            if vm_type == "lxc":
                upid = await cluster.client.ct_start(node, vmid)
            else:
                upid = await cluster.client.vm_start(node, vmid)
            st = await _wait_for_task(cluster, node, upid, _START_WAIT_S)
            ok = (st.get("exitstatus") or "") == "OK"
            results.append({"vmid": vmid, "type": vm_type, "ok": ok,
                            "upid": upid, "exitstatus": st.get("exitstatus")})
            await _ev(node_id, "info" if ok else "warn",
                       f"{vm_type}/{vmid} start: {st.get('exitstatus')}")
        except Exception as e:
            results.append({"vmid": vmid, "type": vm_type, "ok": False,
                            "detail": str(e)})
            await _ev(node_id, "warn",
                       f"{vm_type}/{vmid} start failed (already running after "
                       f"boot?): {e}")
    return results


# ─────────────────────────────────────────────────────── job runner

class _JobControl:
    """In-memory job-control flags (abort + reboot decision). Lost on
    process restart — but the runner re-derives state from the DB on
    resume, so a missed signal just means the resume will sit in
    awaiting_reboot again until the admin re-clicks."""
    def __init__(self) -> None:
        self.aborts: set[int] = set()
        self.reboot_decisions: dict[int, str] = {}

    def request_abort(self, job_id: int) -> None:
        self.aborts.add(job_id)

    def is_aborted(self, job_id: int) -> bool:
        return job_id in self.aborts

    def confirm_reboot(self, node_id: int, choice: str) -> None:
        self.reboot_decisions[node_id] = choice

    def pop_decision(self, node_id: int) -> Optional[str]:
        return self.reboot_decisions.pop(node_id, None)


_control = _JobControl()


async def _run_job(job_id: int) -> None:
    try:
        async with db.connect() as c:
            cur = await c.execute(
                "SELECT * FROM host_upgrade_jobs WHERE id = ?", (job_id,)
            )
            jrow = await cur.fetchone()
            if not jrow:
                logger.warning("upgrade job %d gone", job_id); return
            job = _job_row_to_dict(jrow)
            cur = await c.execute(
                "SELECT * FROM host_upgrade_nodes WHERE job_id = ? ORDER BY ordinal",
                (job_id,),
            )
            nrows = await cur.fetchall()

        if job["status"] not in ("pending", "running"):
            return
        await _set_job_status(job_id, "running", started=True)

        cid = job["cluster_id"]
        cluster = cluster_manager.get_cluster(cid)
        if cluster is None:
            await _set_job_status(job_id, "aborted", finished=True)
            logger.warning("upgrade job %d: cluster %s missing", job_id, cid)
            return

        opts = job["options"] or {}
        target_mode   = opts.get("target_mode")   or "auto"
        target_manual = opts.get("target_manual") or {}
        # Nodes the operator marked as "do not migrate guests here" — only
        # affects auto target selection (manual mode trusts the explicit map).
        exclude_targets = set(opts.get("exclude_targets") or [])
        migrate_back  = bool(opts.get("migrate_back", True))
        # Ceph safety gate: auto-detect Ceph and (unless the operator opted out)
        # set noout around each reboot + wait for active+clean before the next
        # host, so we never reboot a second node while the first is still
        # rebalancing (which could drop PGs below min_size → I/O stall / loss).
        ceph_aware = bool(opts.get("ceph_aware", True))
        ceph_gate = ceph_aware and await _ceph_present(cluster)
        if ceph_gate:
            logger.info("upgrade job %d: Ceph detected — rebalance gate ON", job_id)

        in_flight: set[str] = set()

        for nrow in nrows:
            if _control.is_aborted(job_id):
                await _ev(nrow["id"], "warn", "job aborted by operator")
                break
            node_dict = _node_row_to_dict(nrow)
            disp = _resume_disposition(node_dict["status"])
            if disp == "skip":
                continue
            if disp == "fail":
                await _set_node_status(
                    node_dict["id"], "failed",
                    error="interrupted by daemon restart — manual review required",
                    finished=True)
                await _ev(node_dict["id"], "error",
                           "daemon restarted mid-upgrade; marked failed for "
                           "manual review (no auto-resume of in-flight host)")
                # The crash may have left `noout` set (in-memory flag lost on
                # restart). Clear it defensively — unset is idempotent.
                if ceph_gate:
                    await _ceph_set_noout(cluster, False, node_dict["id"])
                continue
            await _run_single_host(cluster, job_id, node_dict,
                                    target_mode, target_manual,
                                    migrate_back, ceph_gate, in_flight,
                                    exclude_targets)

        async with db.connect() as c:
            cur = await c.execute(
                "SELECT COUNT(*) AS c FROM host_upgrade_nodes "
                "WHERE job_id = ? AND status IN ('queued','evacuating','updating',"
                "'awaiting_reboot','rebooting','restoring')",
                (job_id,),
            )
            still = await cur.fetchone()
        if (still and still["c"]) and _control.is_aborted(job_id):
            await _set_job_status(job_id, "aborted", finished=True)
        else:
            await _set_job_status(job_id, "done", finished=True)
        _control.aborts.discard(job_id)
        logger.info("upgrade job %d finished", job_id)
    except Exception as e:
        logger.exception("upgrade job %d crashed: %s", job_id, e)
        await _set_job_status(job_id, "aborted", finished=True)


async def _run_single_host(cluster, job_id: int, n: dict,
                            target_mode: str, target_manual: dict,
                            migrate_back: bool, ceph_gate: bool,
                            in_flight: set[str],
                            exclude_targets: set[str] | None = None) -> None:
    node_id = n["id"]
    source = n["node"]
    in_place = (target_mode == "in_place")
    noout_active = False    # did we set ceph noout for this host's reboot?

    # Resolve target POOL (in_place migrates nothing, so it needs none).
    # Auto mode spreads guests across every eligible sibling; manual mode
    # uses the single operator-chosen target for this source host.
    targets: list[str] = []
    if not in_place:
        if target_mode == "manual":
            t = (target_manual.get(source) or "").strip()
            if t:
                targets = [t]
        else:
            targets = _eligible_targets(
                cluster, source,
                exclude=in_flight | {source} | (exclude_targets or set()))
        if not targets:
            await _set_node_status(node_id, "failed",
                                    error="no suitable target node",
                                    started=True, finished=True)
            await _ev(node_id, "error", "no eligible target — skipping host")
            return
        # Display: single target verbatim, multiple shown as a summary.
        await _set_node_target(
            node_id, targets[0] if len(targets) == 1 else f"{len(targets)} nodes")

    in_flight.add(source)
    stopped: list[dict] = []
    try:
        # 1. evacuate guests — or, in_place, gracefully shut them down
        await _set_node_status(node_id, "evacuating", started=True)
        if in_place:
            stopped = await _shutdown_node_guests(cluster, source, node_id)
            await _patch_node_detail(node_id, {"stopped": stopped})
            if any(not g.get("ok") for g in stopped):
                await _set_node_status(node_id, "failed",
                                        error="one or more guests failed to shut down",
                                        finished=True)
                await _ev(node_id, "warn",
                           "in-place: a guest did not shut down cleanly — aborting host")
                return
        else:
            evac = await _evacuate_node(cluster, source, targets, node_id)
            await _patch_node_detail(node_id, {"evacuated": evac})
            if any(not e.get("ok") for e in evac):
                await _set_node_status(node_id, "failed",
                                        error="one or more guests failed to migrate",
                                        finished=True)
                return

        # 2. apt dist-upgrade
        await _set_node_status(node_id, "updating")
        ok, _tail, reboot_req = await _run_apt_upgrade(cluster, source, node_id)
        if not ok:
            await _set_node_status(node_id, "failed",
                                    error="apt dist-upgrade failed",
                                    finished=True)
            return

        # 3. await reboot decision
        await _set_node_status(node_id, "awaiting_reboot")
        await _ev(node_id, "info",
                   f"awaiting admin reboot decision (reboot-required={reboot_req})")
        decision: Optional[str] = None
        deadline = time.time() + 7 * 24 * 3600  # 1-week pause cap
        while time.time() < deadline:
            if _control.is_aborted(job_id):
                await _set_node_status(node_id, "failed",
                                        error="aborted while awaiting reboot",
                                        finished=True)
                return
            decision = _control.pop_decision(node_id)
            if decision:
                break
            await asyncio.sleep(_LOOP_TICK_S)
        if not decision:
            await _set_node_status(node_id, "failed",
                                    error="reboot decision timed out",
                                    finished=True)
            return
        await _ev(node_id, "info", f"admin decision: {decision}")

        # 4. reboot (if confirmed)
        if decision == "reboot":
            # Ceph: hold OSDs `in` across the reboot so a brief down doesn't
            # trigger a full rebalance.
            if ceph_gate:
                await _ceph_set_noout(cluster, True, node_id)
                noout_active = True
            await _set_node_status(node_id, "rebooting")
            if not await _reboot_node(cluster, source, node_id):
                await _set_node_status(node_id, "failed",
                                        error="reboot did not complete in time",
                                        finished=True)
                return
            # Node + OSDs are back up — release noout so recovery of any writes
            # made during downtime can proceed, then we wait for it below.
            if ceph_gate and noout_active:
                await _ceph_set_noout(cluster, False, node_id)
                noout_active = False

        # 5. bring guests back: restart in place, or migrate back (migrate mode)
        if in_place:
            # Always restart the guests we stopped, whether the admin rebooted
            # or skipped — they were shut down, so they must come back up.
            await _set_node_status(node_id, "restoring")
            started = await _start_node_guests(cluster, source, stopped, node_id)
            await _patch_node_detail(node_id, {"started": started})
        elif migrate_back:
            await _set_node_status(node_id, "restoring")
            try:
                res = await _restore_node(cluster, source, evac, node_id)
            except Exception as e:
                # A restore crash must not bubble up and abort the whole job —
                # fail just this host and let the remaining hosts proceed.
                await _patch_node_detail(node_id, {"restore_error": str(e)})
                await _set_node_status(node_id, "failed",
                                        error=f"migrate-back crashed: {e}",
                                        finished=True)
                await _ev(node_id, "error", f"migrate-back crashed: {e}")
                return
            await _patch_node_detail(node_id, {"restored": res})
            if any(not r.get("ok") for r in res):
                await _set_node_status(node_id, "failed",
                                        error="one or more guests failed to migrate back",
                                        finished=True)
                await _ev(node_id, "warn",
                           "migrate-back incomplete — guest(s) left on target node")
                return

        # 6. Ceph gate: don't release the next host until the cluster is fully
        # rebalanced (active+clean). Only relevant if we actually rebooted.
        if ceph_gate and decision == "reboot":
            if not await _wait_ceph_clean(cluster, job_id, node_id):
                await _set_node_status(node_id, "failed",
                                        error="aborted while waiting for ceph rebalance",
                                        finished=True)
                return

        # 'skip' = operator declined the reboot; the host was still upgraded and
        # (if requested) restored, so it's a distinct terminal state from 'done'.
        await _set_node_status(
            node_id, "skipped" if decision == "skip" else "done",
            finished=True)
    finally:
        in_flight.discard(source)
        # Safety net: if an error path left noout set (e.g. reboot failed while
        # the node was down), clear it so we never leave the cluster pinned.
        if noout_active:
            await _ceph_set_noout(cluster, False, node_id)


# ─────────────────────────────────────────────────────── REST endpoints

def _audit_meta(request: web.Request) -> tuple[str, str, str]:
    u = (request.get("user") or {}).get("username", "anonymous")
    return u, request.get("client_ip", "unknown"), request.get("request_id", "")


async def _job_with_nodes(job_id: int) -> Optional[dict]:
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT * FROM host_upgrade_jobs WHERE id = ?", (job_id,)
        )
        j = await cur.fetchone()
        if not j:
            return None
        out = _job_row_to_dict(j)
        cur = await c.execute(
            "SELECT * FROM host_upgrade_nodes WHERE job_id = ? ORDER BY ordinal",
            (job_id,),
        )
        nodes = await cur.fetchall()
        out["node_steps"] = [_node_row_to_dict(r) for r in nodes]
    return out


@role_required("admin")
async def list_jobs(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT * FROM host_upgrade_jobs WHERE cluster_id = ? "
            "ORDER BY created_at DESC LIMIT 50",
            (cid,),
        )
        rows = await cur.fetchall()
        jobs = [_job_row_to_dict(r) for r in rows]
        # Annotate each job with how many of its node steps failed/skipped
        # vs total, so the list can show "done but N failed" instead of a
        # misleading green DONE when guests didn't actually migrate.
        for j in jobs:
            cnt = await c.execute(
                "SELECT COUNT(*) AS total,"
                " SUM(CASE WHEN status IN ('failed','skipped') THEN 1 ELSE 0 END) AS failed"
                " FROM host_upgrade_nodes WHERE job_id = ?", (j["id"],))
            cr = await cnt.fetchone()
            j["node_total"] = (cr["total"] if cr else 0) or 0
            j["node_failed"] = (cr["failed"] if cr else 0) or 0
    return web.json_response({"ok": True, "jobs": jobs})


@role_required("admin")
async def get_job(request: web.Request) -> web.Response:
    job_id = int(request.match_info["job_id"])
    out = await _job_with_nodes(job_id)
    if not out:
        return web.json_response({"error": "not_found"}, status=404)
    async with db.connect() as c:
        for nd in out["node_steps"]:
            cur = await c.execute(
                "SELECT ts, kind, message FROM host_upgrade_events "
                "WHERE node_id = ? ORDER BY id DESC LIMIT 200",
                (nd["id"],),
            )
            ev = await cur.fetchall()
            nd["events"] = [dict(r) for r in reversed(ev)]
    return web.json_response({"ok": True, "job": out})


@role_required("admin")
async def create_job(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    nodes = body.get("nodes") or []
    if not isinstance(nodes, list) or not nodes:
        return web.json_response({"error": "no_nodes"}, status=400)
    seen: set[str] = set()
    for n in nodes:
        if not isinstance(n, str) or not _NODE_RE.match(n):
            return web.json_response({"error": "bad_node", "node": n}, status=400)
        if n in seen:
            return web.json_response({"error": "duplicate_node",
                                       "node": n}, status=400)
        seen.add(n)
        if n not in cluster.cache.nodes:
            return web.json_response({"error": "unknown_node",
                                       "node": n}, status=400)

    target_mode = body.get("target_mode") or "auto"
    if target_mode not in ("auto", "manual", "in_place"):
        return web.json_response({"error": "bad_target_mode"}, status=400)
    target_manual = body.get("target_manual") or {}
    if not isinstance(target_manual, dict):
        return web.json_response({"error": "bad_target_manual"}, status=400)
    for k, v in target_manual.items():
        if not _NODE_RE.match(k) or not _NODE_RE.match(v):
            return web.json_response({"error": "bad_target_manual_name"}, status=400)

    # Nodes to keep guests OFF of during auto target selection.
    exclude_targets = body.get("exclude_targets") or []
    if not isinstance(exclude_targets, list) or \
       any(not _NODE_RE.match(str(n)) for n in exclude_targets):
        return web.json_response({"error": "bad_exclude_targets"}, status=400)

    # in_place = no migration; guests are shut down, the host reboots, then the
    # guests that were running are started again. Migrate-back is meaningless
    # there (nothing left the host), so force it off.
    migrate_back = False if target_mode == "in_place" else bool(body.get("migrate_back", True))
    opts = {
        "target_mode": target_mode,
        "target_manual": target_manual,
        "exclude_targets": [str(n) for n in exclude_targets],
        "migrate_back": migrate_back,
        # Auto-detected at run time; the operator can opt out here. When on AND
        # the cluster runs Ceph, the runner sets noout around each reboot and
        # waits for active+clean before the next host.
        "ceph_aware": bool(body.get("ceph_aware", True)),
        "reboot_policy": "ask",
        "apt_cmd": APT_CMD,
    }

    actor, ip, rid = _audit_meta(request)
    async with db.connect() as c:
        cur = await c.execute(
            "INSERT INTO host_upgrade_jobs "
            "(cluster_id, created_by, created_at, status, options_json, nodes_json) "
            "VALUES (?, ?, ?, 'pending', ?, ?)",
            (cid, actor, _now(), json.dumps(opts), json.dumps(nodes)),
        )
        job_id = cur.lastrowid
        for i, n in enumerate(nodes, start=1):
            await c.execute(
                "INSERT INTO host_upgrade_nodes "
                "(job_id, node, ordinal, status) "
                "VALUES (?, ?, ?, 'queued')",
                (job_id, n, i),
            )
        await c.commit()

    await audit.write(
        user=actor, source_ip=ip, action="host_upgrade.create",
        target=f"{cid}/{len(nodes)} nodes", cluster_id=cid,
        result="ok", request_id=rid,
        params={"job_id": job_id, "nodes": nodes, "options": opts},
    )
    return web.json_response({"ok": True, "job_id": job_id})


@role_required("admin")
async def start_job(request: web.Request) -> web.Response:
    job_id = int(request.match_info["job_id"])
    out = await _job_with_nodes(job_id)
    if not out:
        return web.json_response({"error": "not_found"}, status=404)
    if out["status"] != "pending":
        return web.json_response({"error": "wrong_state",
                                   "status": out["status"]}, status=409)
    actor, ip, rid = _audit_meta(request)
    await audit.write(
        user=actor, source_ip=ip, action="host_upgrade.start",
        target=f"{out['cluster_id']}/job-{job_id}", cluster_id=out["cluster_id"],
        result="ok", request_id=rid,
    )
    asyncio.create_task(_run_job(job_id))
    return web.json_response({"ok": True})


@role_required("admin")
async def abort_job(request: web.Request) -> web.Response:
    job_id = int(request.match_info["job_id"])
    out = await _job_with_nodes(job_id)
    if not out:
        return web.json_response({"error": "not_found"}, status=404)
    _control.request_abort(job_id)
    actor, ip, rid = _audit_meta(request)
    await audit.write(
        user=actor, source_ip=ip, action="host_upgrade.abort",
        target=f"{out['cluster_id']}/job-{job_id}", cluster_id=out["cluster_id"],
        result="ok", request_id=rid,
    )
    return web.json_response({"ok": True})


@role_required("admin")
async def confirm_reboot(request: web.Request) -> web.Response:
    job_id = int(request.match_info["job_id"])
    node_param = request.match_info["node"]
    try:
        body = await request.json()
    except Exception:
        body = {}
    choice = (body.get("choice") or "").strip()
    if choice not in ("reboot", "skip"):
        return web.json_response({"error": "bad_choice"}, status=400)
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT * FROM host_upgrade_nodes WHERE job_id = ? AND node = ?",
            (job_id, node_param),
        )
        nrow = await cur.fetchone()
    if not nrow:
        return web.json_response({"error": "not_found"}, status=404)
    if nrow["status"] != "awaiting_reboot":
        return web.json_response({"error": "wrong_state",
                                   "status": nrow["status"]}, status=409)
    _control.confirm_reboot(nrow["id"], choice)
    actor, ip, rid = _audit_meta(request)
    job = await _job_with_nodes(job_id)
    await audit.write(
        user=actor, source_ip=ip, action="host_upgrade.confirm_reboot",
        target=f"{job['cluster_id']}/{node_param}", cluster_id=job["cluster_id"],
        result="ok", request_id=rid, params={"choice": choice},
    )
    return web.json_response({"ok": True})


async def resume_running_jobs_on_startup() -> None:
    """Called once at aiohttp on_startup. Re-launches any job that was
    marked `running` in the DB so a daemon restart mid-sweep doesn't
    leave the queue stuck."""
    try:
        async with db.connect() as c:
            cur = await c.execute(
                "SELECT id FROM host_upgrade_jobs WHERE status = 'running'"
            )
            rows = await cur.fetchall()
    except Exception as e:
        logger.warning("host_upgrade: cannot scan for resumable jobs: %s", e)
        return
    for r in rows:
        logger.info("resuming host_upgrade job %d", r["id"])
        asyncio.create_task(_run_job(r["id"]))


ROUTES = [
    ("GET",  r"/api/clusters/{cluster_id}/upgrade-jobs",                        list_jobs),
    ("POST", r"/api/clusters/{cluster_id}/upgrade-jobs",                        create_job),
    ("GET",  r"/api/clusters/{cluster_id}/upgrade-jobs/{job_id}",               get_job),
    ("POST", r"/api/clusters/{cluster_id}/upgrade-jobs/{job_id}/start",         start_job),
    ("POST", r"/api/clusters/{cluster_id}/upgrade-jobs/{job_id}/abort",         abort_job),
    ("POST", r"/api/clusters/{cluster_id}/upgrade-jobs/{job_id}/nodes/{node}/confirm-reboot",
                                                                                 confirm_reboot),
]
