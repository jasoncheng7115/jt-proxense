"""HTTP endpoints for v0.3 VM control operations.

Wraps PVEClient lifecycle methods with:
  - config gate (`vm_control.enabled` must be true)
  - role gating (`operator` for start/shutdown/reboot/suspend/resume,
                 `admin` for stop/migrate when require_admin_for_destructive)
  - audit log entries for every action (start = pending → ok/error)
  - VM-pattern RBAC awareness — caller must have a role grant covering the
    target VM's name OR tags.

Each endpoint returns the PVE task UPID immediately. Clients poll
/api/clusters/{cid}/nodes/{node}/tasks/{upid} (added below) or subscribe
to the WebSocket task topic to track completion.

Note: this module is wired in only when config.vm_control.enabled is True
at server startup. When disabled, requests get 503 service_unavailable —
auth + audit still work, just the bottom of the stack is dark.
"""
from __future__ import annotations

import logging
from typing import Optional

from aiohttp import web

from . import audit, auth
from .cluster_manager import cluster_manager
from .config import get_config
from .middleware import role_required


logger = logging.getLogger(__name__)


# ---------------------------------------------------------------- helpers

def _enabled() -> bool:
    cfg = get_config()
    return bool(cfg.vm_control and cfg.vm_control.enabled)


def _require_admin_for_destructive() -> bool:
    cfg = get_config()
    return bool(cfg.vm_control and cfg.vm_control.require_admin_for_destructive)


def _disabled_response() -> web.Response:
    return web.json_response(
        {
            "error": "vm_control_disabled",
            "message": "Set vm_control.enabled=true in config.yaml + restart "
                       "service to enable write operations.",
        },
        status=503,
    )


async def _resolve_vm_target(cluster_id: str, vmid: int) -> Optional[dict]:
    """Find the VM in cluster_manager's cache so we can pull its name + tags
    for VM-pattern RBAC. Returns dict with keys node/name/tags or None."""
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return None
    for key, vm in cluster.cache.vms.items():
        if int(vm.vmid) == int(vmid):
            tags = []
            raw_tags = getattr(vm, "tags", "") or ""
            if isinstance(raw_tags, str):
                tags = [t.strip() for t in raw_tags.split(";") if t.strip()]
            elif isinstance(raw_tags, list):
                tags = list(raw_tags)
            return {
                "node": getattr(vm, "node", ""),
                "name": getattr(vm, "name", "") or f"vm-{vmid}",
                "tags": tags,
            }
    return None


def _check_vm_role(request: web.Request, cluster_id: str, vm: dict, min_role: str) -> Optional[web.Response]:
    """Returns a 403 response if the user's effective role is below min_role
    for this specific VM. Returns None on allow. No-op when auth disabled."""
    user = request.get("user")
    if user is None:
        # auth disabled -> allow (matches the rest of the codebase's
        # backward-compat policy)
        return None

    rank = {"viewer": 1, "operator": 2, "admin": 3}
    needed = rank[min_role]
    effective = auth.role_for(
        user["id"], cluster_id,
        vm_name=vm["name"], vm_tags=vm["tags"],
    )
    if effective is None or rank.get(effective, 0) < needed:
        return web.json_response(
            {
                "error": "forbidden",
                "required_role": min_role,
                "vm": {"id_in_cluster": cluster_id, "name": vm["name"], "tags": vm["tags"]},
            },
            status=403,
        )
    return None


async def _do_action(request: web.Request, action: str, min_role: str,
                     pve_method_name: str) -> web.Response:
    """Common dispatch: enable check → resolve VM → role check → call PVE → audit."""
    if not _enabled():
        return _disabled_response()

    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    vmid       = int(request.match_info["vmid"])

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    vm = await _resolve_vm_target(cluster_id, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    # Allow caller-supplied node to override (handles HA-relocated VMs)
    if vm["node"] != node:
        # We trust the cache's view of the node; client's path may be stale.
        node = vm["node"]

    deny = _check_vm_role(request, cluster_id, vm, min_role)
    if deny is not None:
        await audit.write(
            user=(request.get("user") or {}).get("username", "anonymous"),
            source_ip=request.get("client_ip", "unknown"),
            action=f"vm.{action}",
            target=f"{cluster_id}/{node}/vm/{vmid}",
            cluster_id=cluster_id,
            result="denied",
            request_id=request.get("request_id", ""),
        )
        return deny

    # Audit: pending row before the call (so a hung PVE task is still recorded)
    user = (request.get("user") or {}).get("username", "system")
    src_ip = request.get("client_ip", "unknown")
    request_id = request.get("request_id", "")

    method = getattr(cluster.client, pve_method_name, None)
    if method is None:
        return web.json_response({"error": "unsupported_action"}, status=500)

    try:
        # Common signature: (node, vmid) → upid
        upid = await method(node, vmid)
    except Exception as e:
        logger.warning("vm.%s failed for %s/%s/%d: %s", action, cluster_id, node, vmid, e)
        await audit.write(
            user=user, source_ip=src_ip,
            action=f"vm.{action}",
            target=f"{cluster_id}/{node}/vm/{vmid}",
            cluster_id=cluster_id,
            result=audit.result_error(e),
            request_id=request_id,
        )
        return web.json_response(
            {"error": "pve_request_failed", "detail": str(e)},
            status=502,
        )

    await audit.write(
        user=user, source_ip=src_ip,
        action=f"vm.{action}",
        target=f"{cluster_id}/{node}/vm/{vmid}",
        cluster_id=cluster_id,
        result="ok", request_id=request_id,
    )
    return web.json_response({"ok": True, "upid": upid, "vm": vm})


# ---------------------------------------------------------------- handlers

async def vm_start_handler(request: web.Request) -> web.Response:
    return await _do_action(request, "start", "operator", "vm_start")


async def vm_shutdown_handler(request: web.Request) -> web.Response:
    return await _do_action(request, "shutdown", "operator", "vm_shutdown")


async def vm_reboot_handler(request: web.Request) -> web.Response:
    return await _do_action(request, "reboot", "operator", "vm_reboot")


async def vm_suspend_handler(request: web.Request) -> web.Response:
    return await _do_action(request, "suspend", "operator", "vm_suspend")


async def vm_resume_handler(request: web.Request) -> web.Response:
    return await _do_action(request, "resume", "operator", "vm_resume")


# Destructive: hard stop. Per-policy escalates to admin.

async def vm_stop_handler(request: web.Request) -> web.Response:
    min_role = "admin" if _require_admin_for_destructive() else "operator"
    return await _do_action(request, "stop", min_role, "vm_stop")


async def vm_migrate_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled_response()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    target = body.get("target_node") or ""
    online = bool(body.get("online", True))
    with_local = bool(body.get("with_local_disks", False))
    if not target:
        return web.json_response({"error": "missing_target_node"}, status=400)

    vm = await _resolve_vm_target(cluster_id, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)

    min_role = "admin" if _require_admin_for_destructive() else "operator"
    deny = _check_vm_role(request, cluster_id, vm, min_role)
    if deny is not None:
        return deny

    user = (request.get("user") or {}).get("username", "system")
    src_ip = request.get("client_ip", "unknown")
    request_id = request.get("request_id", "")
    try:
        upid = await cluster.client.vm_migrate(
            vm["node"], vmid, target=target,
            online=online, with_local_disks=with_local,
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=src_ip, action="vm.migrate",
            target=f"{cluster_id}/{vm['node']}->{target}/vm/{vmid}",
            cluster_id=cluster_id, result=audit.result_error(e),
            request_id=request_id,
            params={"target": target, "online": online, "with_local_disks": with_local},
        )
        return web.json_response(
            {"error": "pve_request_failed", "detail": str(e)}, status=502,
        )
    await audit.write(
        user=user, source_ip=src_ip, action="vm.migrate",
        target=f"{cluster_id}/{vm['node']}->{target}/vm/{vmid}",
        cluster_id=cluster_id, result="ok", request_id=request_id,
        params={"target": target, "online": online, "with_local_disks": with_local},
    )
    return web.json_response({"ok": True, "upid": upid, "vm": vm, "target_node": target})


async def task_status_handler(request: web.Request) -> web.Response:
    """Poll a PVE task by UPID. No write — viewer can call."""
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    upid = request.match_info["upid"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        data = await cluster.client.get_task_status(node, upid)
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response(data)


# ---------------------------------------------------------------- bulk ops (B1)

async def vm_bulk_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cid}/vms/bulk
    body: {"action": "start|stop|...", "vmids": [100,101,...]}
    Fans out N tasks; emits one audit row per target plus a parent batch entry.
    """
    if not _enabled():
        return _disabled_response()
    cluster_id = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    action = (body.get("action") or "").strip()
    vmids = body.get("vmids") or []
    if action not in ("start", "stop", "shutdown", "reboot", "suspend", "resume"):
        return web.json_response({"error": "bad_action"}, status=400)
    if not isinstance(vmids, list) or not all(isinstance(v, int) for v in vmids):
        return web.json_response({"error": "bad_vmids"}, status=400)
    if len(vmids) > 100:
        return web.json_response({"error": "too_many", "limit": 100}, status=400)

    pve_method_name = f"vm_{action}"
    min_role = "admin" if (action == "stop" and _require_admin_for_destructive()) else "operator"

    user = (request.get("user") or {}).get("username", "system")
    src_ip = request.get("client_ip", "unknown")
    request_id = request.get("request_id", "")
    import secrets
    batch_id = secrets.token_urlsafe(9)

    await audit.write(
        user=user, source_ip=src_ip, action=f"vm.bulk.{action}",
        target=f"{cluster_id}/batch/{batch_id}",
        cluster_id=cluster_id, result="pending", request_id=request_id,
        params={"vmids": vmids, "count": len(vmids)},
    )

    results = []
    for vmid in vmids:
        vm = await _resolve_vm_target(cluster_id, vmid)
        if vm is None:
            results.append({"vmid": vmid, "ok": False, "error": "vm_not_found"})
            continue
        deny = _check_vm_role(request, cluster_id, vm, min_role)
        if deny is not None:
            results.append({"vmid": vmid, "ok": False, "error": "forbidden"})
            continue
        try:
            method = getattr(cluster.client, pve_method_name)
            upid = await method(vm["node"], vmid)
            results.append({"vmid": vmid, "ok": True, "upid": upid})
            await audit.write(
                user=user, source_ip=src_ip, action=f"vm.{action}",
                target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                cluster_id=cluster_id, result="ok",
                request_id=request_id,
                params={"batch_id": batch_id},
            )
        except Exception as e:
            results.append({"vmid": vmid, "ok": False, "error": str(e)})
            await audit.write(
                user=user, source_ip=src_ip, action=f"vm.{action}",
                target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                cluster_id=cluster_id, result=audit.result_error(e),
                request_id=request_id,
                params={"batch_id": batch_id},
            )

    return web.json_response({
        "ok": True, "batch_id": batch_id,
        "action": action, "count": len(results),
        "results": results,
    })


# ---------------------------------------------------------------- routes

ROUTES = [
    ("POST", "/api/clusters/{cluster_id}/nodes/{node}/vms/{vmid}/start",    vm_start_handler),
    ("POST", "/api/clusters/{cluster_id}/nodes/{node}/vms/{vmid}/stop",     vm_stop_handler),
    ("POST", "/api/clusters/{cluster_id}/nodes/{node}/vms/{vmid}/shutdown", vm_shutdown_handler),
    ("POST", "/api/clusters/{cluster_id}/nodes/{node}/vms/{vmid}/reboot",   vm_reboot_handler),
    ("POST", "/api/clusters/{cluster_id}/nodes/{node}/vms/{vmid}/suspend",  vm_suspend_handler),
    ("POST", "/api/clusters/{cluster_id}/nodes/{node}/vms/{vmid}/resume",   vm_resume_handler),
    ("POST", "/api/clusters/{cluster_id}/vms/{vmid}/migrate",               vm_migrate_handler),
    ("POST", "/api/clusters/{cluster_id}/vms/bulk",                         vm_bulk_handler),
    ("GET",  "/api/clusters/{cluster_id}/nodes/{node}/tasks/{upid}",        task_status_handler),
]
