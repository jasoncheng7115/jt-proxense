"""VM export to foreign hypervisor formats — OVA (VMware/VirtualBox) and
Hyper-V VHDX — by driving Jason's converter scripts on the PVE node:

    https://github.com/jasoncheng7115/it-scripts/tree/master/jt_pve2ova
    https://github.com/jasoncheng7115/it-scripts/tree/master/jt_pve2hyperv

Script contracts (run ON the node, as root, over SSH):
    jt_pve2ova.sh    <VMID> <WORK_DIR> <ESXI_VERSION> [MODE]
    jt_pve2hyperv.sh <VMID> <WORK_DIR> <LANG> [MODE]

These conversions take minutes-to-hours and must survive the browser
window closing, so they are OUR OWN jobs (export_jobs table, migration
008), not PVE tasks: status + log tail + outputs live in SQLite, a
background reaper deletes outputs 24 h after completion, and the UI's
export-history panel reads it all back.

Endpoints (operator+ unless noted):
  GET    /api/export/{cid}/{node}/tools            detect tools + versions
                                                   (+ latest version on GitHub,
                                                   so UI can offer upgrades)
  POST   /api/export/{cid}/{node}/tools/install    {tool} install OR upgrade
  GET    /api/export/{cid}/{node}/paths?vmid=N     candidate temp dirs with
                                                   free bytes / writability /
                                                   required estimate
  POST   /api/export/jobs                          create + start job
  GET    /api/export/jobs?cluster_id=&limit=       history
  GET    /api/export/jobs/{id}                     detail + log tail
  GET    /api/export/jobs/{id}/download/{name}     stream output file
  DELETE /api/export/jobs/{id}                     purge outputs now

Security notes (OWASP):
  A01  every route operator+; download checks the filename against the
       job's recorded output list (no traversal possible).
  A03  every remote value passes shlex.quote; vmid/esxi/lang/format are
       whitelist-validated server-side; base_dir must be absolute with
       no shell metacharacters.
  A09  create / install / delete / download are audited.
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
import shlex
import time
from typing import Any, Optional

from aiohttp import web

from . import audit
from . import ssh_util
from . import db
from .cluster_manager import cluster_manager
from .middleware import role_required

logger = logging.getLogger(__name__)

RAW_BASE = "https://raw.githubusercontent.com/jasoncheng7115/it-scripts/master"

TOOLS: dict[str, dict] = {
    "ova": {
        "script": "jt_pve2ova.sh",
        "raw_url": f"{RAW_BASE}/jt_pve2ova/jt_pve2ova.sh",
        "needs": ["qemu-img", "ovftool"],
    },
    "hyperv": {
        "script": "jt_pve2hyperv.sh",
        "raw_url": f"{RAW_BASE}/jt_pve2hyperv/jt_pve2hyperv.sh",
        "needs": ["qemu-img"],
    },
}
INSTALL_DIR = "/usr/local/bin"

ESXI_VERSIONS = ("8.0u2", "8.0", "7.0u3", "7.0u1", "7.0", "6.7", "6.5")
EXPORT_LANGS = ("en", "zh-TW")

# Free-space policy against the estimated source disk total: hard-block
# below the floor; between floor and the comfortable factor the API
# returns warn=true and the UI asks the operator to confirm (thin disks
# often convert much smaller than virtual size).
SPACE_FLOOR_FACTOR = 1.2
SPACE_COMFORT_FACTOR = 2.2

RUN_TIMEOUT_S = 6 * 3600
RETENTION_S = 24 * 3600
REAPER_INTERVAL_S = 600

# Remote "latest version" lookups are cached so opening the wizard
# doesn't hit GitHub every time. 6 h is plenty — this is exactly the
# "check for tool updates when our system updates" path too, because a
# daemon restart clears it.
_latest_cache: dict[str, tuple[float, str]] = {}
_LATEST_TTL_S = 6 * 3600

_BASE_DIR_RE = re.compile(r"^/[A-Za-z0-9._/\-]+$")
_FILENAME_RE = re.compile(r"^[A-Za-z0-9._\-]+$")


# ---------------------------------------------------------------- helpers

def _actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return user, request.get("client_ip", "unknown"), request.get("request_id", "")


def _ssh_for(cluster, node: str) -> tuple[str, str, int]:
    # Single source of truth in ssh_util — this used to be five byte-identical
    # copies, which is how the missing connect timeout stayed missing.
    return ssh_util.target_for(cluster, node)


async def _ssh_connect(cluster, node: str):
    import asyncssh
    host, user, port = _ssh_for(cluster, node)
    return await ssh_util.connect(host, user, port)


def _require_cluster(cid: str):
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        raise web.HTTPNotFound(
            text=json.dumps({"error": "cluster_not_found"}),
            content_type="application/json")
    return cluster


_SIZE_RE = re.compile(r"size=(\d+(?:\.\d+)?)([KMGT]?)", re.IGNORECASE)
_DISK_KEY_RE = re.compile(r"^(scsi|sata|virtio|ide)\d+$")
_SIZE_MULT = {"": 1, "K": 1024, "M": 1024 ** 2, "G": 1024 ** 3, "T": 1024 ** 4}


async def _estimate_vm_bytes(cluster, node: str, vmid: int) -> tuple[int, str]:
    """Sum the virtual sizes of all non-cdrom disks from the VM config.
    Returns (total_bytes, vm_name)."""
    cfg = await cluster.client._request("GET", f"/nodes/{node}/qemu/{vmid}/config")
    total = 0
    for key, val in (cfg or {}).items():
        if not _DISK_KEY_RE.match(str(key)) or not isinstance(val, str):
            continue
        if "media=cdrom" in val:
            continue
        m = _SIZE_RE.search(val)
        if m:
            total += int(float(m.group(1)) * _SIZE_MULT[m.group(2).upper()])
    return total, str((cfg or {}).get("name", ""))


async def _fetch_latest_version(tool: str) -> str:
    """HEAD-ish fetch of the raw script from GitHub, parse VERSION=...
    Cached; failures return '' (UI just hides the upgrade hint)."""
    now = time.monotonic()
    hit = _latest_cache.get(tool)
    if hit and now - hit[0] < _LATEST_TTL_S:
        return hit[1]
    try:
        import aiohttp
        async with aiohttp.ClientSession() as s:
            async with s.get(TOOLS[tool]["raw_url"],
                             timeout=aiohttp.ClientTimeout(total=10)) as r:
                if r.status != 200:
                    return ""
                head = (await r.text())[:4000]
        m = re.search(r'VERSION="?([0-9][0-9.]*)"?', head)
        ver = m.group(1) if m else ""
        _latest_cache[tool] = (now, ver)
        return ver
    except Exception as e:
        logger.debug("latest-version fetch failed for %s: %s", tool, e)
        return ""


# ---------------------------------------------------------------- tools

@role_required("operator")
async def tools_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)

    out: dict[str, Any] = {}
    try:
        async with await _ssh_connect(cluster, node) as conn:
            for tool, spec in TOOLS.items():
                script = f"{INSTALL_DIR}/{spec['script']}"
                r = await conn.run(
                    f"test -x {shlex.quote(script)} && "
                    f"grep -m1 -oE 'VERSION=\"?[0-9][0-9.]*' {shlex.quote(script)} "
                    f"|| echo MISSING", check=False)
                stdout = (r.stdout or "").strip()
                installed = not stdout.endswith("MISSING")
                version = stdout.split("=")[-1].strip('"') if installed else ""
                deps = {}
                for dep in spec["needs"]:
                    dr = await conn.run(f"command -v {shlex.quote(dep)} >/dev/null && echo yes || echo no",
                                        check=False)
                    deps[dep] = (dr.stdout or "").strip() == "yes"
                latest = await _fetch_latest_version(tool)
                out[tool] = {
                    "installed": installed,
                    "version": version,
                    "latest": latest,
                    "update_available": bool(installed and latest and version and latest != version),
                    "deps": deps,
                }
    except Exception as e:
        return web.json_response({"ok": False, "error": str(e)}, status=502)
    return web.json_response({"ok": True, "tools": out})


@role_required("operator")
async def tools_install_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    user, ip, rid = _actor(request)

    body = await request.json()
    tool = str(body.get("tool", ""))
    if tool not in TOOLS:
        return web.json_response({"error": "unknown_tool"}, status=400)
    spec = TOOLS[tool]
    target = f"{INSTALL_DIR}/{spec['script']}"
    # Fixed command, only quoted constants interpolated — operator input
    # cannot reach the shell (tool name is whitelist-mapped above).
    cmd = (f"curl -fsSL {shlex.quote(spec['raw_url'])} -o {shlex.quote(target + '.tmp')} && "
           f"head -c 100 {shlex.quote(target + '.tmp')} | grep -q '^#!' && "
           f"mv {shlex.quote(target + '.tmp')} {shlex.quote(target)} && "
           f"chmod 0755 {shlex.quote(target)}")
    try:
        async with await _ssh_connect(cluster, node) as conn:
            r = await conn.run(cmd, check=False, timeout=60)
            ok = r.exit_status == 0
            detail = ((r.stderr or "") + (r.stdout or "")).strip()[:400]
    except Exception as e:
        ok, detail = False, str(e)
    await audit.write(user=user, source_ip=ip, request_id=rid,
                      action="export.tool_install",
                      target=f"{cid}/{node}/{tool}",
                      result="ok" if ok else f"error: {detail[:160]}")
    if not ok:
        return web.json_response({"ok": False, "error": detail}, status=502)
    return web.json_response({"ok": True})


# ---------------------------------------------------------------- paths

@role_required("operator")
async def paths_handler(request: web.Request) -> web.Response:
    """Candidate temp directories: every file-path storage PVE knows on
    this node, plus its free bytes and whether root can write to it.
    Includes the required-space estimate for the chosen VM."""
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    vmid = int(request.query.get("vmid", "0") or 0)

    estimate = 0
    vm_name = ""
    if vmid:
        try:
            estimate, vm_name = await _estimate_vm_bytes(cluster, node, vmid)
        except Exception as e:
            logger.debug("export estimate failed %s/%s: %s", cid, vmid, e)

    try:
        storages = await cluster.client._request("GET", "/storage")
    except Exception as e:
        return web.json_response({"ok": False, "error": str(e)}, status=502)

    candidates = []
    for s in storages or []:
        path = s.get("path")
        if not path:
            continue  # block-level (rbd/lvm/zfspool) — no plain dir to write into
        candidates.append({"storage": s.get("storage"), "type": s.get("type"), "path": path})

    try:
        async with await _ssh_connect(cluster, node) as conn:
            for c in candidates:
                q = shlex.quote(c["path"])
                r = await conn.run(
                    f"test -d {q} && df -PB1 {q} | tail -1 | awk '{{print $4}}' && "
                    f"(test -w {q} && echo W || echo RO) || echo NODIR", check=False)
                lines = [ln.strip() for ln in (r.stdout or "").splitlines() if ln.strip()]
                if not lines or lines[-1] == "NODIR":
                    c["exists"] = False
                    c["free_bytes"] = 0
                    c["writable"] = False
                    continue
                c["exists"] = True
                c["writable"] = lines[-1] == "W"
                try:
                    c["free_bytes"] = int(lines[0])
                except (ValueError, IndexError):
                    c["free_bytes"] = 0
    except Exception as e:
        return web.json_response({"ok": False, "error": str(e)}, status=502)

    return web.json_response({
        "ok": True,
        "vm_name": vm_name,
        "estimate_bytes": estimate,
        "floor_bytes": int(estimate * SPACE_FLOOR_FACTOR),
        "comfort_bytes": int(estimate * SPACE_COMFORT_FACTOR),
        "paths": candidates,
    })


# ---------------------------------------------------------------- jobs

async def _job_row(job_id: int) -> Optional[dict]:
    async with db.connect() as c:
        cur = await c.execute("SELECT * FROM export_jobs WHERE id = ?", (job_id,))
        row = await cur.fetchone()
    return dict(row) if row else None


# Columns _update_job may touch. The kwargs only ever come from our own
# code, but the whitelist makes the dynamically-assembled SET clause
# provably injection-free (and keeps the OWASP A03 scanner green).
_UPDATABLE_COLS = frozenset({
    "status", "error", "started_at", "finished_at", "expires_at",
    "output_files", "log_tail", "work_dir",
})


async def _update_job(job_id: int, **fields) -> None:
    bad = set(fields) - _UPDATABLE_COLS
    if bad:
        raise ValueError(f"non-updatable export_jobs columns: {sorted(bad)}")
    assignments = ", ".join(k + " = ?" for k in fields)
    sql = "UPDATE export_jobs SET " + assignments + " WHERE id = ?"
    async with db.connect() as c:
        await c.execute(sql, (*fields.values(), job_id))
        await c.commit()


async def _run_export_job(job_id: int) -> None:
    """The long-running conversion. Lives in an asyncio task; everything
    observable goes through the DB so the UI can poll regardless of
    which browser window started it."""
    job = await _job_row(job_id)
    if not job:
        return
    cluster = cluster_manager.get_cluster(job["cluster_id"])
    if cluster is None:
        await _update_job(job_id, status="failed", error="cluster gone",
                          finished_at=int(time.time()))
        return

    opts = json.loads(job["opts"] or "{}")
    spec = TOOLS[job["format"]]
    script = f"{INSTALL_DIR}/{spec['script']}"
    work_dir = job["work_dir"]
    if job["format"] == "ova":
        args = f"{int(job['vmid'])} {shlex.quote(work_dir)} {shlex.quote(opts.get('esxi_version', '8.0'))} clean"
    else:
        args = f"{int(job['vmid'])} {shlex.quote(work_dir)} {shlex.quote(opts.get('lang', 'zh-TW'))} all"
    cmd = f"mkdir -p {shlex.quote(work_dir)} && cd {shlex.quote(work_dir)} && {shlex.quote(script)} {args}"

    await _update_job(job_id, status="running", started_at=int(time.time()))
    tail: list[str] = []

    async def flush_tail():
        await _update_job(job_id, log_tail="\n".join(tail[-80:]))

    try:
        import asyncssh
        async with await _ssh_connect(cluster, job["node"]) as conn:
            proc = await conn.create_process(cmd, stdin=asyncssh.DEVNULL)

            async def drain(stream):
                n = 0
                async for line in stream:
                    line = (line or "").rstrip()
                    if not line:
                        continue
                    tail.append(line[:400])
                    if len(tail) > 200:
                        del tail[0:100]
                    n += 1
                    if n % 10 == 0:
                        await flush_tail()

            try:
                await asyncio.wait_for(
                    asyncio.gather(drain(proc.stdout), drain(proc.stderr)),
                    timeout=RUN_TIMEOUT_S)
                await proc.wait()
                exit_status = proc.exit_status
            except asyncio.TimeoutError:
                proc.kill()
                raise RuntimeError(f"conversion exceeded {RUN_TIMEOUT_S // 3600} h cap")

            if exit_status != 0:
                raise RuntimeError(f"script exited {exit_status}")

            # Collect outputs (top level of the work dir).
            lr = await conn.run(
                f"find {shlex.quote(work_dir)} -maxdepth 1 -type f -printf '%s\\t%f\\n'",
                check=False)
            files = []
            for ln in (lr.stdout or "").splitlines():
                try:
                    size_s, name = ln.split("\t", 1)
                    if _FILENAME_RE.match(name):
                        files.append({"name": name, "size": int(size_s)})
                except ValueError:
                    continue

        now = int(time.time())
        await flush_tail()
        await _update_job(job_id, status="done", finished_at=now,
                          expires_at=now + RETENTION_S,
                          output_files=json.dumps(files))
        logger.info("export job %s done: %s files", job_id, len(files))
    except Exception as e:
        await flush_tail()
        await _update_job(job_id, status="failed", error=str(e)[:500],
                          finished_at=int(time.time()))
        logger.warning("export job %s failed: %s", job_id, e)


@role_required("operator")
async def job_create_handler(request: web.Request) -> web.Response:
    user, ip, rid = _actor(request)
    body = await request.json()

    cid = str(body.get("cluster_id", ""))
    node = str(body.get("node", ""))
    fmt = str(body.get("format", ""))
    base_dir = str(body.get("base_dir", ""))
    force = bool(body.get("force", False))
    try:
        vmid = int(body.get("vmid", 0))
    except (TypeError, ValueError):
        vmid = 0

    cluster = _require_cluster(cid)
    if fmt not in TOOLS:
        return web.json_response({"error": "bad_format"}, status=400)
    if not (100 <= vmid <= 999_999_999):
        return web.json_response({"error": "bad_vmid"}, status=400)
    if not _BASE_DIR_RE.match(base_dir) or ".." in base_dir:
        return web.json_response({"error": "bad_base_dir"}, status=400)
    if not re.match(r"^[A-Za-z0-9_\-]+$", node):
        return web.json_response({"error": "bad_node"}, status=400)

    opts: dict[str, str] = {}
    if fmt == "ova":
        esxi = str(body.get("esxi_version", "8.0"))
        if esxi not in ESXI_VERSIONS:
            return web.json_response({"error": "bad_esxi_version"}, status=400)
        opts["esxi_version"] = esxi
    else:
        lang = str(body.get("lang", "zh-TW"))
        if lang not in EXPORT_LANGS:
            return web.json_response({"error": "bad_lang"}, status=400)
        opts["lang"] = lang

    # Pre-flight: free space + writability on the chosen dir.
    try:
        estimate, vm_name = await _estimate_vm_bytes(cluster, node, vmid)
        async with await _ssh_connect(cluster, node) as conn:
            q = shlex.quote(base_dir)
            r = await conn.run(
                f"test -d {q} && test -w {q} && df -PB1 {q} | tail -1 | awk '{{print $4}}' || echo BAD",
                check=False)
            stdout = (r.stdout or "").strip()
            if stdout.endswith("BAD") or not stdout:
                return web.json_response(
                    {"error": "dir_not_writable",
                     "message": f"{base_dir} missing or not writable"}, status=400)
            free = int(stdout.splitlines()[0])
    except web.HTTPException:
        raise
    except Exception as e:
        return web.json_response({"error": "preflight_failed", "message": str(e)}, status=502)

    floor = int(estimate * SPACE_FLOOR_FACTOR)
    comfort = int(estimate * SPACE_COMFORT_FACTOR)
    if free < floor:
        return web.json_response(
            {"error": "insufficient_space", "free_bytes": free,
             "required_bytes": floor}, status=400)
    if free < comfort and not force:
        return web.json_response(
            {"error": "space_tight", "free_bytes": free,
             "comfort_bytes": comfort,
             "message": "free space below comfortable margin; resend with force=true"},
            status=409)

    now = int(time.time())
    async with db.connect() as c:
        cur = await c.execute(
            "INSERT INTO export_jobs (cluster_id, node, vmid, vm_name, format, opts,"
            " status, work_dir, created_by, created_at)"
            " VALUES (?, ?, ?, ?, ?, ?, 'pending', '', ?, ?)",
            (cid, node, vmid, vm_name, fmt, json.dumps(opts), user, now))
        job_id = cur.lastrowid
        work_dir = f"{base_dir.rstrip('/')}/jt-export/job{job_id}-vm{vmid}-{fmt}"
        await c.execute("UPDATE export_jobs SET work_dir = ? WHERE id = ?",
                        (work_dir, job_id))
        await c.commit()

    asyncio.create_task(_run_export_job(job_id))
    await audit.write(user=user, source_ip=ip, request_id=rid,
                      action="export.job_create",
                      target=f"{cid}/{node}/vm{vmid}/{fmt}", result="ok",
                      params={"job_id": job_id, "work_dir": work_dir, **opts})
    return web.json_response({"ok": True, "job_id": job_id, "work_dir": work_dir})


@role_required("operator")
async def jobs_list_handler(request: web.Request) -> web.Response:
    cid = request.query.get("cluster_id", "")
    limit = min(int(request.query.get("limit", "100") or 100), 500)
    async with db.connect() as c:
        if cid:
            cur = await c.execute(
                "SELECT id, cluster_id, node, vmid, vm_name, format, status,"
                " created_by, created_at, started_at, finished_at, expires_at,"
                " error, output_files FROM export_jobs WHERE cluster_id = ?"
                " ORDER BY id DESC LIMIT ?", (cid, limit))
        else:
            cur = await c.execute(
                "SELECT id, cluster_id, node, vmid, vm_name, format, status,"
                " created_by, created_at, started_at, finished_at, expires_at,"
                " error, output_files FROM export_jobs ORDER BY id DESC LIMIT ?",
                (limit,))
        rows = [dict(r) for r in await cur.fetchall()]
    for r in rows:
        r["output_files"] = json.loads(r.get("output_files") or "[]")
    return web.json_response({"ok": True, "jobs": rows})


@role_required("operator")
async def job_detail_handler(request: web.Request) -> web.Response:
    job = await _job_row(int(request.match_info["id"]))
    if not job:
        return web.json_response({"error": "not_found"}, status=404)
    job["output_files"] = json.loads(job.get("output_files") or "[]")
    job["opts"] = json.loads(job.get("opts") or "{}")
    return web.json_response({"ok": True, "job": job})


@role_required("operator")
async def job_download_handler(request: web.Request) -> web.StreamResponse:
    user, ip, rid = _actor(request)
    job = await _job_row(int(request.match_info["id"]))
    name = request.match_info["name"]
    if not job or job["status"] != "done":
        return web.json_response({"error": "not_available"}, status=404)
    files = {f["name"]: f for f in json.loads(job.get("output_files") or "[]")}
    if name not in files or not _FILENAME_RE.match(name):
        return web.json_response({"error": "no_such_file"}, status=404)
    cluster = _require_cluster(job["cluster_id"])

    path = f"{job['work_dir']}/{name}"
    resp = web.StreamResponse(headers={
        "Content-Type": "application/octet-stream",
        "Content-Disposition": f'attachment; filename="{name}"',
        "Content-Length": str(files[name]["size"]),
    })
    try:
        import asyncssh
        async with await _ssh_connect(cluster, job["node"]) as conn:
            await resp.prepare(request)
            proc = await conn.create_process(
                f"cat {shlex.quote(path)}", stdin=asyncssh.DEVNULL, encoding=None)
            assert proc.stdout
            while True:
                chunk = await proc.stdout.read(1 << 16)
                if not chunk:
                    break
                await resp.write(chunk)
            await resp.write_eof()
    except Exception as e:
        logger.warning("export download failed job=%s file=%s: %s", job["id"], name, e)
        # If headers already went out we can only drop the connection.
        try:
            return web.json_response({"error": str(e)}, status=502)
        except Exception:
            return resp
    await audit.write(user=user, source_ip=ip, request_id=rid,
                      action="export.download",
                      target=f"job{job['id']}/{name}", result="ok")
    return resp


async def _purge_outputs(job: dict) -> None:
    """rm -rf the job's work dir on the node. The path is the one WE
    constructed at create time (base/jt-export/jobN-...), re-validated
    here so a tampered DB row can't nuke arbitrary paths."""
    work_dir = job["work_dir"]
    if "/jt-export/job" not in work_dir or ".." in work_dir:
        raise RuntimeError(f"refusing to purge suspicious path: {work_dir}")
    cluster = cluster_manager.get_cluster(job["cluster_id"])
    if cluster is None:
        raise RuntimeError("cluster gone")
    async with await _ssh_connect(cluster, job["node"]) as conn:
        await conn.run(f"rm -rf {shlex.quote(work_dir)}", check=True, timeout=120)


@role_required("operator")
async def job_delete_handler(request: web.Request) -> web.Response:
    user, ip, rid = _actor(request)
    job = await _job_row(int(request.match_info["id"]))
    if not job:
        return web.json_response({"error": "not_found"}, status=404)
    if job["status"] == "running":
        return web.json_response({"error": "job_running"}, status=409)
    try:
        if job["status"] in ("done", "failed"):
            await _purge_outputs(job)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, request_id=rid,
                          action="export.delete", target=f"job{job['id']}",
                          result=f"error: {e}")
        return web.json_response({"ok": False, "error": str(e)}, status=502)
    await _update_job(job["id"], status="deleted", output_files="[]")
    await audit.write(user=user, source_ip=ip, request_id=rid,
                      action="export.delete", target=f"job{job['id']}", result="ok")
    return web.json_response({"ok": True})


# ---------------------------------------------------------------- lifecycle

async def mark_orphans_on_startup() -> None:
    """A conversion that was mid-flight when the daemon restarted is
    unobservable now (the SSH session died with us) — mark it failed for
    manual review, same policy as host_upgrade."""
    try:
        async with db.connect() as c:
            await c.execute(
                "UPDATE export_jobs SET status = 'failed',"
                " error = 'daemon restarted during conversion (manual review)',"
                " finished_at = ? WHERE status IN ('pending', 'running')",
                (int(time.time()),))
            await c.commit()
    except Exception as e:
        logger.warning("export orphan sweep failed: %s", e)


async def retention_reaper() -> None:
    """Every 10 min: purge outputs of done jobs past their 24 h expiry."""
    while True:
        try:
            now = int(time.time())
            async with db.connect() as c:
                cur = await c.execute(
                    "SELECT * FROM export_jobs WHERE status = 'done'"
                    " AND expires_at IS NOT NULL AND expires_at < ?", (now,))
                rows = [dict(r) for r in await cur.fetchall()]
            for job in rows:
                try:
                    await _purge_outputs(job)
                    await _update_job(job["id"], status="expired", output_files="[]")
                    logger.info("export job %s outputs expired + purged", job["id"])
                except Exception as e:
                    logger.warning("export reaper purge failed job=%s: %s", job["id"], e)
        except Exception as e:
            logger.warning("export reaper cycle failed: %s", e)
        await asyncio.sleep(REAPER_INTERVAL_S)


ROUTES = [
    ("GET",    r"/api/export/{cluster_id}/{node}/tools",          tools_handler),
    ("POST",   r"/api/export/{cluster_id}/{node}/tools/install",  tools_install_handler),
    ("GET",    r"/api/export/{cluster_id}/{node}/paths",          paths_handler),
    ("POST",   r"/api/export/jobs",                               job_create_handler),
    ("GET",    r"/api/export/jobs",                               jobs_list_handler),
    ("GET",    r"/api/export/jobs/{id:\d+}",                      job_detail_handler),
    ("GET",    r"/api/export/jobs/{id:\d+}/download/{name}",      job_download_handler),
    ("DELETE", r"/api/export/jobs/{id:\d+}",                      job_delete_handler),
]
