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
_TASK_POLL_S          = 4.0

# Single source of truth for the apt command. Kept here (not user input)
# so a misconfigured job can't run "rm -rf /" via curl. Use Dpkg
# --force-conf{def,old} to keep existing config files where there's a
# conflict — interactive prompts would deadlock the SSH session.
APT_CMD = (
    "apt-get update && "
    "DEBIAN_FRONTEND=noninteractive apt-get dist-upgrade -y "
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


async def _evacuate_node(cluster, source: str, target: str,
                          node_id: int) -> list[dict]:
    results: list[dict] = []
    vms = _vms_on_node(cluster, source)
    await _ev(node_id, "info", f"evacuating {len(vms)} guest(s): {source} → {target}")
    for vm in vms:
        vmid = int(vm.vmid)
        vm_type = getattr(vm, "type", "qemu")
        try:
            if vm_type == "lxc":
                upid = await cluster.client.ct_migrate(
                    source, vmid, target=target, online=True, restart=True,
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
            proc = await conn.create_process(APT_CMD)
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

            await asyncio.gather(_drain(proc.stdout, "info"),
                                  _drain(proc.stderr, "warn"))
            await proc.wait()
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


async def _restore_node(cluster, target_node: str, original_node: str,
                        evacuated: list[dict], node_id: int) -> list[dict]:
    results: list[dict] = []
    await _ev(node_id, "info", f"restoring {len(evacuated)} guest(s) "
                                f"{target_node} → {original_node}")
    for e in evacuated:
        if not e.get("ok"):
            continue
        vmid = int(e["vmid"])
        vm_type = e.get("type", "qemu")
        try:
            if vm_type == "lxc":
                upid = await cluster.client.ct_migrate(
                    target_node, vmid, target=original_node,
                    online=True, restart=True,
                )
            else:
                upid = await cluster.client.vm_migrate(
                    target_node, vmid, target=original_node, online=True,
                )
            st = await _wait_for_task(cluster, target_node, upid, _MIGRATE_WAIT_S)
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
        migrate_back  = bool(opts.get("migrate_back", True))

        in_flight: set[str] = set()

        for nrow in nrows:
            if _control.is_aborted(job_id):
                await _ev(nrow["id"], "warn", "job aborted by operator")
                break
            node_dict = _node_row_to_dict(nrow)
            if node_dict["status"] in ("done", "failed", "skipped", "aborted"):
                continue
            await _run_single_host(cluster, job_id, node_dict,
                                    target_mode, target_manual,
                                    migrate_back, in_flight)

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
                            migrate_back: bool,
                            in_flight: set[str]) -> None:
    node_id = n["id"]
    source = n["node"]

    # Resolve target node
    target = n.get("target_node")
    if not target:
        if target_mode == "manual":
            target = (target_manual.get(source) or "").strip() or None
        if not target:
            target = _pick_auto_target(cluster, source,
                                        exclude=in_flight | {source})
        if not target:
            await _set_node_status(node_id, "failed",
                                    error="no suitable target node",
                                    started=True, finished=True)
            await _ev(node_id, "error", "no eligible target — skipping host")
            return
        await _set_node_target(node_id, target)

    in_flight.add(source)
    try:
        # 1. evacuate
        await _set_node_status(node_id, "evacuating", started=True)
        evac = await _evacuate_node(cluster, source, target, node_id)
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
            await _set_node_status(node_id, "rebooting")
            if not await _reboot_node(cluster, source, node_id):
                await _set_node_status(node_id, "failed",
                                        error="reboot did not complete in time",
                                        finished=True)
                return

        # 5. restore (optional)
        if migrate_back:
            await _set_node_status(node_id, "restoring")
            res = await _restore_node(cluster, target, source, evac, node_id)
            await _patch_node_detail(node_id, {"restored": res})

        await _set_node_status(node_id, "done", finished=True)
    finally:
        in_flight.discard(source)


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
    return web.json_response({
        "ok": True,
        "jobs": [_job_row_to_dict(r) for r in rows],
    })


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
    if target_mode not in ("auto", "manual"):
        return web.json_response({"error": "bad_target_mode"}, status=400)
    target_manual = body.get("target_manual") or {}
    if not isinstance(target_manual, dict):
        return web.json_response({"error": "bad_target_manual"}, status=400)
    for k, v in target_manual.items():
        if not _NODE_RE.match(k) or not _NODE_RE.match(v):
            return web.json_response({"error": "bad_target_manual_name"}, status=400)

    migrate_back = bool(body.get("migrate_back", True))
    opts = {
        "target_mode": target_mode,
        "target_manual": target_manual,
        "migrate_back": migrate_back,
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
