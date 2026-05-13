"""Backup orchestration endpoints — list / schedule / trigger / restore.

Wraps PVE /cluster/backup (cluster-level scheduled jobs) and the per-node
/nodes/{node}/vzdump (ad-hoc backup) + storage content listing.

All write paths require admin role (destructive: storage cost + VM IO load).
Read paths (list jobs, list backups on storage) require operator+.
"""
from __future__ import annotations

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


def _audit_actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


# ---------------------------------------------------------------- scheduled jobs

@role_required("operator")
async def list_jobs_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        jobs = await cluster.client.list_backup_jobs()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"jobs": jobs})


@role_required("admin")
async def create_job_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    schedule = body.get("schedule")
    storage = body.get("storage")
    if not schedule or not storage:
        return web.json_response({"error": "missing_fields",
                                  "required": ["schedule", "storage"]},
                                 status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.create_backup_job(
            schedule=schedule, storage=storage,
            vmid=body.get("vmid"),
            all_vms=bool(body.get("all_vms", False)),
            node=body.get("node"),
            mode=body.get("mode", "snapshot"),
            mailto=body.get("mailto", ""),
            mailnotification=body.get("mailnotification", "always"),
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="backup.job.create",
            target=cluster_id, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid, params=body,
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="backup.job.create",
        target=cluster_id, cluster_id=cluster_id,
        result="ok", request_id=rid, params=body,
    )
    return web.json_response({"ok": True})


@role_required("admin")
async def update_job_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    job_id = request.match_info["job_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    # Allow-list editable fields: schedule / storage / vmid / all_vms /
    # node / mode / mailto / mailnotification / enabled / comment.
    allowed = {"schedule", "storage", "vmid", "all", "node", "mode",
               "mailto", "mailnotification", "enabled", "comment",
               "prune-backups", "compress", "starttime", "dow"}
    fields: dict = {}
    for k, v in body.items():
        if k in allowed and v is not None:
            fields[k] = v
    if not fields:
        return web.json_response({"error": "no_changes"}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.update_backup_job(job_id, **fields)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="backup.job.update",
            target=f"{cluster_id}/{job_id}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"keys": sorted(fields.keys())},
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="backup.job.update",
        target=f"{cluster_id}/{job_id}", cluster_id=cluster_id,
        result="ok", request_id=rid,
        params={"keys": sorted(fields.keys())},
    )
    return web.json_response({"ok": True})


@role_required("admin")
async def delete_job_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    job_id = request.match_info["job_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.delete_backup_job(job_id)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="backup.job.delete",
            target=f"{cluster_id}/{job_id}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="backup.job.delete",
        target=f"{cluster_id}/{job_id}", cluster_id=cluster_id,
        result="ok", request_id=rid,
    )
    return web.json_response({"ok": True})


# ---------------------------------------------------------------- ad-hoc vzdump

@role_required("operator")
async def trigger_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cid}/nodes/{node}/backup
    body: {"vmid": "100" or "100,101", "storage": "backup-pbs", ...}
    Runs an immediate vzdump. Returns task UPID."""
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    vmid = body.get("vmid")
    storage = body.get("storage")
    if not vmid or not storage:
        return web.json_response({"error": "missing_fields",
                                  "required": ["vmid", "storage"]},
                                 status=400)
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.trigger_backup(
            node, vmid=vmid, storage=storage,
            mode=body.get("mode", "snapshot"),
            compress=body.get("compress", "zstd"),
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="backup.trigger",
            target=f"{cluster_id}/{node}/vmid={vmid}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid, params=body,
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="backup.trigger",
        target=f"{cluster_id}/{node}/vmid={vmid}", cluster_id=cluster_id,
        result="ok", request_id=rid, params=body,
    )
    return web.json_response({"ok": True, "upid": upid})


# ---------------------------------------------------------------- listing

@role_required("operator")
async def list_storage_handler(request: web.Request) -> web.Response:
    """GET /api/clusters/{cid}/nodes/{node}/storage/{storage}/backups
    Lists backup files currently on a given storage. Useful for the
    "available backups" picker and for retention-related decisions."""
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    storage = request.match_info["storage"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        rows = await cluster.client.list_storage_content(node, storage, content="backup")
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"backups": rows})


# ---------------------------------------------------------------- destructive

@role_required("admin")
async def delete_backup_file_handler(request: web.Request) -> web.Response:
    """DELETE /api/clusters/{cid}/nodes/{node}/storage/{storage}/backups/{volume}
    `volume` is the filename returned by the listing — e.g.
    `backup-pbs:backup/vzdump-qemu-100-2026_01_01-00_00_00.vma.zst`.
    """
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    storage = request.match_info["storage"]
    volume = request.match_info["volume"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.delete_storage_content(node, storage, volume)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="backup.file.delete",
            target=f"{cluster_id}/{storage}/{volume}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="backup.file.delete",
        target=f"{cluster_id}/{storage}/{volume}", cluster_id=cluster_id,
        result="ok", request_id=rid,
    )
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def restore_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cid}/nodes/{node}/restore
    body: {"vmid": 200, "storage": "backup-pbs",
           "archive": "backup/vzdump-qemu-100-...vma.zst",
           "type": "qemu" | "lxc", "force": false}
    Returns the PVE task UPID."""
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    try:
        vmid = int(body["vmid"])
        storage = body["storage"]
        archive = body["archive"]
    except (KeyError, TypeError, ValueError):
        return web.json_response({"error": "missing_fields",
                                  "required": ["vmid", "storage", "archive"]},
                                 status=400)
    vm_type = body.get("type", "qemu")
    if vm_type not in ("qemu", "lxc"):
        return web.json_response({"error": "bad_type"}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.restore_backup(
            node, vmid=vmid, storage=storage, archive=archive,
            vm_type=vm_type, force=bool(body.get("force", False)),
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="backup.restore",
            target=f"{cluster_id}/{node}/{vm_type}/{vmid}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid, params=body,
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="backup.restore",
        target=f"{cluster_id}/{node}/{vm_type}/{vmid}", cluster_id=cluster_id,
        result="ok", request_id=rid, params=body,
    )
    return web.json_response({"ok": True, "upid": upid})


# ---------------------------------------------------------------- routes

ROUTES = [
    ("GET",    "/api/clusters/{cluster_id}/backup-jobs",                 list_jobs_handler),
    ("POST",   "/api/clusters/{cluster_id}/backup-jobs",                 create_job_handler),
    ("PUT",    "/api/clusters/{cluster_id}/backup-jobs/{job_id}",        update_job_handler),
    ("DELETE", "/api/clusters/{cluster_id}/backup-jobs/{job_id}",        delete_job_handler),
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/backup",         trigger_handler),
    ("GET",    "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/backups", list_storage_handler),
    ("DELETE", "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/backups/{volume:.+}",
                                                                          delete_backup_file_handler),
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/restore",        restore_handler),
]
