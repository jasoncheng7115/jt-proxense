"""Data-protection overview: backup recency per guest (RPO) and snapshots.

Two read-only, cluster-wide views that PVE itself never assembles:

  GET /api/clusters/{cluster_id}/protection/backups?rpo_hours=24
      Per guest: when did it last back up successfully, did the latest attempt
      fail, and which scheduled jobs cover it. Status per guest:
        ok         last success within the RPO
        stale      last success older than the RPO
        failed     the most recent attempt failed
        no_record  covered by a job, but no success in the task history we read
        unprotected  no enabled job covers it and no backup seen
        unknown    the node it lives on could not be read
  GET /api/clusters/{cluster_id}/protection/snapshots?old_days=30
      Every snapshot of every guest, with age, so stale snapshots that pin
      storage (and slow every write on qcow2/ZFS/Ceph) can be found in one place.

WHY the backup evidence comes from TASK LOGS rather than the backup storage:
PVE's storage-content listing silently drops backup volumes the caller may not
restore — it needs VM.Backup on the guest or Datastore.Allocate on the storage.
A monitoring token has neither, so on the real cluster a PBS datastore holding
6.7 TB of backups lists as EMPTY, with HTTP 200. Built on that listing, this
view would have reported "no backup" for every guest: a confident, alarming
lie. vzdump task logs are readable with Sys.Audit and record every guest, e.g.

    INFO: Starting Backup of VM 103 (qemu)
    INFO: Finished Backup of VM 103 (00:01:33)
    INFO: Backup finished at 2026-09-28 02:31:35
    ERROR: Backup of VM 116 failed - <reason>

The task index is finite (PVE keeps roughly the last thousand tasks per node),
so "no success seen" is reported as `no_record` over the window actually read —
never as "never backed up".
"""
from __future__ import annotations

import asyncio
import logging
import re
import time
from datetime import datetime, timezone
from urllib.parse import quote

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required

logger = logging.getLogger(__name__)

CACHE_TTL_S = 300.0
# Read at most this many vzdump tasks per node — a job runs on EVERY node that
# hosts a covered guest, so this is tens of days of a daily schedule.
MAX_TASKS_PER_NODE = 40
LOG_LINE_LIMIT = 50000
_FETCH_CONCURRENCY = 4

_backups_cache: dict[str, tuple[float, dict]] = {}
_snaps_cache: dict[str, tuple[float, dict]] = {}
_inflight: dict[tuple[str, str], asyncio.Future] = {}

_RE_START = re.compile(r"Starting Backup of VM (\d+) \((qemu|lxc)\)")
_RE_DONE = re.compile(r"Finished Backup of VM (\d+) \(")
_RE_FAIL = re.compile(r"ERROR: Backup of VM (\d+) failed - (.*)")
_RE_REPO = re.compile(r"(--repository[= ]'?)[^\s']+")
_RE_STAMP = re.compile(r"Backup (started|finished) at (\d{4}-\d\d-\d\d \d\d:\d\d:\d\d)")


# ───────────────────────────────────────────────────────────── pure helpers

def _g(o, attr, default=None):
    if isinstance(o, dict):
        return o.get(attr, default)
    return getattr(o, attr, default)


def guests(cluster) -> list[dict]:
    """Non-template guests from the poll cache (VMMetrics dataclasses or dicts)."""
    vms = _g(getattr(cluster, "cache", None), "vms", {}) or {}
    items = vms.values() if isinstance(vms, dict) else vms
    out = []
    for v in items:
        if _g(v, "template"):
            continue
        st = _g(v, "status")
        out.append({
            "vmid": int(_g(v, "vmid")),
            "name": _g(v, "name") or "",
            "node": _g(v, "node") or "",
            "type": _g(v, "type") or "qemu",
            "status": str(getattr(st, "value", st) or ""),
        })
    return sorted(out, key=lambda g: g["vmid"])


def _short_error(msg: str, limit: int = 300) -> str:
    """vzdump failures often quote the whole command line first and put the
    actual cause at the END ("... failed: exit code 255"); keep both ends."""
    # The quoted proxmox-backup-client command names the PBS user, token id
    # and host (`--repository user@pbs!token@host:store`); viewers do not need
    # that to see WHY a backup failed.
    msg = _RE_REPO.sub(r"\1<redacted>", msg.strip())
    if len(msg) <= limit:
        return msg
    return msg[:90] + " … " + msg[-(limit - 95):]


def parse_vzdump_log(lines: list[str], task_start: float, task_end: float | None,
                     tz_offset_s: float | None) -> dict[int, dict]:
    """{vmid: {"ok": bool, "time": epoch, "error": str|None}} for one task.

    Per-guest "Backup started/finished at" stamps are NODE-LOCAL wall time;
    convert with the node's UTC offset when known.

    Without a stamp the fallbacks lean deliberately in opposite directions:
    a SUCCESS takes the task's end (later than the truth, so the backup reads
    OLDER — never fresher than it is), a FAILURE takes the task's start
    (earlier than the truth). Taking the end for a failure made a failure on one
    node look newer than the success the same job logged on another node, and
    the guest was reported "last run failed" when it had in fact backed up —
    seen on the real cluster for a guest HA moved mid-job.
    """
    out: dict[int, dict] = {}
    started: dict[int, float] = {}
    current: int | None = None
    end_fb = float(task_end or task_start or 0)
    start_fb = float(task_start or task_end or 0)

    def stamp(text: str) -> float | None:
        if tz_offset_s is None:
            return None
        try:
            local = datetime.strptime(text, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            return None
        return local.replace(tzinfo=timezone.utc).timestamp() - tz_offset_s

    for line in lines:
        m = _RE_START.search(line)
        if m:
            current = int(m.group(1))
            continue
        m = _RE_DONE.search(line)
        if m:
            vmid = int(m.group(1))
            out[vmid] = {"ok": True, "time": end_fb, "error": None}
            current = vmid
            continue
        m = _RE_STAMP.search(line)
        if m and current is not None:
            t = stamp(m.group(2))
            if t is not None:
                if m.group(1) == "started":
                    started[current] = t
                elif current in out and out[current]["ok"]:
                    out[current]["time"] = t
            continue
        m = _RE_FAIL.search(line)
        if m:
            vmid = int(m.group(1))
            out[vmid] = {"ok": False, "time": started.get(vmid, start_fb),
                         "error": _short_error(m.group(2))}
    return out


def _split_ids(raw) -> set[int]:
    out = set()
    for p in re.split(r"[,\s]+", str(raw or "")):
        if p.strip().isdigit():
            out.add(int(p))
    return out


def job_coverage(jobs: list[dict], guest_list: list[dict],
                 pool_members: dict[str, set[int]]) -> dict[int, list[str]]:
    """{vmid: [enabled job ids covering it]} — mirrors vzdump's selection:
    `all` (minus `exclude`), an explicit `vmid` list, or a `pool`; a `node`
    restricts any of those to guests on that node."""
    cov: dict[int, list[str]] = {g["vmid"]: [] for g in guest_list}
    for j in jobs or []:
        en = j.get("enabled", 1)
        if str(en) in ("0", "False", "false"):
            continue
        jid = str(j.get("id") or "")
        node = j.get("node")
        excl = _split_ids(j.get("exclude"))
        if str(j.get("all") or "0") in ("1", "True", "true"):
            sel = {g["vmid"] for g in guest_list} - excl
        elif j.get("pool"):
            sel = set(pool_members.get(str(j["pool"]), set()))
        else:
            sel = _split_ids(j.get("vmid"))
        for g in guest_list:
            if g["vmid"] in sel and (not node or g["node"] == node):
                cov[g["vmid"]].append(jid)
    return cov


def classify(guest_list: list[dict], evidence: dict[int, dict],
             coverage: dict[int, list[str]], unreadable_nodes: set[str],
             rpo_s: float, now: float) -> list[dict]:
    """Merge everything into one row per guest. `evidence[vmid]` carries
    last_ok / last_attempt / last_error collected across all nodes."""
    rows = []
    for g in guest_list:
        ev = evidence.get(g["vmid"], {})
        last_ok = ev.get("last_ok")
        last_attempt = ev.get("last_attempt")
        failed_last = bool(ev.get("last_attempt_failed"))
        jobs = coverage.get(g["vmid"], [])
        if failed_last:
            status = "failed"
        elif last_ok is not None:
            status = "ok" if now - last_ok <= rpo_s else "stale"
        elif unreadable_nodes:
            # Its backups may be in a node's history we could not read (it may
            # have migrated) — do not claim it has none.
            status = "unknown"
        elif jobs:
            status = "no_record"
        else:
            status = "unprotected"
        rows.append({
            **g,
            "status": status,
            "last_ok": last_ok,
            "age_s": (now - last_ok) if last_ok is not None else None,
            "last_attempt": last_attempt,
            "last_error": ev.get("last_error"),
            "jobs": jobs,
        })
    return rows


def merge_evidence(per_task: list[tuple[float, dict[int, dict]]]) -> dict[int, dict]:
    """Fold per-task results (any order) into per-guest last_ok / last attempt."""
    ev: dict[int, dict] = {}
    for _t, res in per_task:
        for vmid, r in res.items():
            e = ev.setdefault(vmid, {"last_ok": None, "last_attempt": None,
                                     "last_attempt_failed": False,
                                     "last_error": None})
            t = r["time"]
            if r["ok"] and (e["last_ok"] is None or t > e["last_ok"]):
                e["last_ok"] = t
            if e["last_attempt"] is None or t > e["last_attempt"]:
                e["last_attempt"] = t
                e["last_attempt_failed"] = not r["ok"]
                e["last_error"] = r["error"]
    return ev


# ───────────────────────────────────────────────────────────── PVE reads

def _online_nodes(cluster) -> list[str]:
    nodes = _g(getattr(cluster, "cache", None), "nodes", {}) or {}
    items = nodes.items() if isinstance(nodes, dict) else [(None, n) for n in nodes]
    out = []
    for key, n in items:
        name = _g(n, "node") or key
        st = _g(n, "status")
        if name and str(getattr(st, "value", st) or "").lower() == "online":
            out.append(str(name))
    return sorted(out)


async def _node_tz_offset(client, node: str) -> float | None:
    """Seconds east of UTC, from /nodes/{n}/time (localtime - time)."""
    try:
        t = await client._request("GET", f"/nodes/{node}/time") or {}
        return float(t["localtime"]) - float(t["time"])
    except Exception:
        return None


async def _scan_node(client, node: str, sem: asyncio.Semaphore) -> list:
    """Per-task parsed evidence for one node. RAISES if the node's task list is
    unreadable — the caller must tell "unreadable" from "no backups"."""
    tasks = await client._request(
        "GET", f"/nodes/{node}/tasks",
        params={"typefilter": "vzdump", "limit": MAX_TASKS_PER_NODE}) or []
    tz = await _node_tz_offset(client, node)
    out = []

    async def one(t):
        upid = t.get("upid")
        if not upid or not t.get("endtime"):
            return None                      # still running: no verdict yet
        async with sem:
            try:
                log = await client._request(
                    "GET", f"/nodes/{node}/tasks/{quote(upid, safe='')}/log",
                    params={"start": 0, "limit": LOG_LINE_LIMIT}) or []
            except Exception as e:
                logger.debug("protection: log %s unreadable: %s", upid, e)
                return None
        lines = [str(r.get("t", "")) for r in log if isinstance(r, dict)]
        return (float(t.get("starttime") or 0),
                parse_vzdump_log(lines, float(t.get("starttime") or 0),
                                 t.get("endtime"), tz))

    for r in await asyncio.gather(*(one(t) for t in tasks)):
        if r is not None:
            out.append(r)
    return out


async def _pool_members(client, jobs) -> dict[str, set[int]]:
    out: dict[str, set[int]] = {}
    for pool in {str(j["pool"]) for j in jobs or [] if j.get("pool")}:
        try:
            p = await client._request("GET", f"/pools/{quote(pool, safe='')}") or {}
            out[pool] = {int(m["vmid"]) for m in p.get("members", [])
                         if m.get("vmid") is not None}
        except Exception as e:
            logger.debug("protection: pool %s unreadable: %s", pool, e)
    return out


async def build_backups(cluster) -> dict:
    client = cluster.client
    guest_list = guests(cluster)
    nodes = _online_nodes(cluster)
    try:
        jobs = await client._request("GET", "/cluster/backup") or []
        jobs_error = None
    except Exception as e:
        jobs, jobs_error = [], str(e)
    pools = await _pool_members(client, jobs)

    sem = asyncio.Semaphore(_FETCH_CONCURRENCY)
    per_task: list = []
    unreadable: dict[str, str] = {}
    results = await asyncio.gather(*(_scan_node(client, n, sem) for n in nodes),
                                   return_exceptions=True)
    oldest = None
    for node, r in zip(nodes, results):
        if isinstance(r, BaseException):
            unreadable[node] = str(r)[:200]
            continue
        per_task.extend(r)
        for start, _ in r:
            oldest = start if oldest is None else min(oldest, start)
    # Guests on an offline node are equally unknowable.
    known_nodes = set(nodes)
    for g in guest_list:
        if g["node"] and g["node"] not in known_nodes and g["node"] not in unreadable:
            unreadable[g["node"]] = "node offline"
    return {
        "guests": guest_list,
        "evidence": merge_evidence(per_task),
        "coverage": job_coverage(jobs, guest_list, pools),
        "unreadable_nodes": unreadable,
        "jobs_error": jobs_error,
        "history_since": oldest,
        "tasks_read": len(per_task),
    }


async def build_snapshots(cluster) -> dict:
    client = cluster.client
    sem = asyncio.Semaphore(_FETCH_CONCURRENCY)
    rows: list[dict] = []
    errors: dict[int, str] = {}

    async def one(g):
        kind = "lxc" if g["type"] == "lxc" else "qemu"
        async with sem:
            try:
                snaps = await client._request(
                    "GET", f"/nodes/{g['node']}/{kind}/{g['vmid']}/snapshot") or []
            except Exception as e:
                errors[g["vmid"]] = str(e)[:200]
                return
        for s in snaps:
            if s.get("name") == "current":
                continue
            rows.append({
                "vmid": g["vmid"], "guest": g["name"], "node": g["node"],
                "type": g["type"], "name": s.get("name"),
                "snaptime": s.get("snaptime"), "parent": s.get("parent"),
                "description": (s.get("description") or "")[:500],
                "vmstate": bool(s.get("vmstate") or 0),
            })

    await asyncio.gather(*(one(g) for g in guests(cluster) if g["node"]))
    return {"snapshots": rows, "errors": errors}


async def _cached(kind: str, cache: dict, cid: str, builder, cluster, force: bool):
    now = time.monotonic()
    hit = cache.get(cid)
    if hit and not force and now - hit[0] < CACHE_TTL_S:
        return hit[1], now - hit[0]
    key = (kind, cid)
    fut = _inflight.get(key)
    if fut is None:
        fut = asyncio.ensure_future(builder(cluster))
        _inflight[key] = fut
        fut.add_done_callback(lambda _f: _inflight.pop(key, None))
    data = await asyncio.shield(fut)
    cache[cid] = (time.monotonic(), data)
    return data, 0.0


def _num(request, name, default, lo, hi) -> float:
    try:
        v = float(request.query.get(name, default))
    except (TypeError, ValueError):
        v = default
    return max(lo, min(hi, v))


# ───────────────────────────────────────────────────────────── handlers

@role_required("viewer")
async def backups_handler(request: web.Request) -> web.Response:
    """Per-guest backup recency against an RPO, from vzdump task history."""
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    rpo_h = _num(request, "rpo_hours", 24, 1, 24 * 90)
    force = request.query.get("force") == "1"
    try:
        data, age = await _cached("backups", _backups_cache, cid, build_backups,
                                  cluster, force)
    except Exception as e:
        logger.warning("protection backups %s failed: %s", cid, e)
        return web.json_response({"error": "pve_request_failed",
                                  "detail": str(e)}, status=502)
    now = time.time()
    rows = classify(data["guests"], data["evidence"], data["coverage"],
                    set(data["unreadable_nodes"]), rpo_h * 3600, now)
    summary: dict[str, int] = {}
    for r in rows:
        summary[r["status"]] = summary.get(r["status"], 0) + 1
    return web.json_response({
        "rpo_hours": rpo_h, "guests": rows, "summary": summary,
        "unreadable_nodes": data["unreadable_nodes"],
        "jobs_error": data["jobs_error"],
        "history_since": data["history_since"],
        "tasks_read": data["tasks_read"], "cache_age_s": round(age, 1),
    })


@role_required("viewer")
async def snapshots_handler(request: web.Request) -> web.Response:
    """Every snapshot of every guest in the cluster, with its age."""
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    old_days = _num(request, "old_days", 30, 1, 3650)
    force = request.query.get("force") == "1"
    try:
        data, age = await _cached("snapshots", _snaps_cache, cid, build_snapshots,
                                  cluster, force)
    except Exception as e:
        logger.warning("protection snapshots %s failed: %s", cid, e)
        return web.json_response({"error": "pve_request_failed",
                                  "detail": str(e)}, status=502)
    now = time.time()
    rows = []
    for s in data["snapshots"]:
        t = s.get("snaptime")
        age_s = (now - float(t)) if t else None
        rows.append({**s, "age_s": age_s,
                     "old": age_s is not None and age_s > old_days * 86400})
    rows.sort(key=lambda s: s.get("snaptime") or 0)
    return web.json_response({
        "old_days": old_days, "snapshots": rows,
        "old_count": sum(1 for r in rows if r["old"]),
        "guest_errors": {str(k): v for k, v in data["errors"].items()},
        "cache_age_s": round(age, 1),
    })


ROUTES = [
    ("GET", "/api/clusters/{cluster_id}/protection/backups",   backups_handler),
    ("GET", "/api/clusters/{cluster_id}/protection/snapshots", snapshots_handler),
]
