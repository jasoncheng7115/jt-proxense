"""Extended VM lifecycle operations: snapshots, clone, template, delete,
reset. Mirrors PVE's full VM CRUD surface beyond simple power actions.

All write paths follow the same RBAC + audit pattern as v0.3 vm_control.
Tier mapping (Jason B3):
  - reset (hard power-cycle)               → admin when require_admin_destructive
  - snapshot list                          → operator
  - take snapshot                          → operator
  - delete snapshot                        → admin (destructive)
  - rollback to snapshot                   → admin (loses post-snapshot state)
  - clone (full / linked)                  → operator
  - convert to template                    → admin (irreversible)
  - delete VM                              → admin (always; typed-confirm in UI)
"""
from __future__ import annotations

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .config import get_config


def _audit_actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def _enabled() -> bool:
    cfg = get_config()
    return bool(cfg.vm_control and cfg.vm_control.enabled)


def _require_admin_for_destructive() -> bool:
    cfg = get_config()
    return bool(cfg.vm_control and cfg.vm_control.require_admin_for_destructive)


def _disabled() -> web.Response:
    return web.json_response(
        {"error": "vm_control_disabled",
         "message": "Set vm_control.enabled=true in config.yaml + restart."},
        status=503,
    )


def _resolve_vm(cluster, vmid: int):
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == int(vmid):
            tags = []
            raw = getattr(vm, "tags", "") or ""
            if isinstance(raw, str):
                tags = [t.strip() for t in raw.split(";") if t.strip()]
            return {
                "node": getattr(vm, "node", ""),
                "name": getattr(vm, "name", "") or f"vm-{vmid}",
                "tags": tags,
                "type": getattr(vm, "type", "qemu"),
            }
    return None


def _check_role(request, cluster_id, vm, min_role):
    user = request.get("user")
    if user is None:
        return None
    from . import auth as auth_mod
    rank = {"viewer": 1, "operator": 2, "admin": 3}
    needed = rank[min_role]
    effective = auth_mod.role_for(
        user["id"], cluster_id, vm_name=vm["name"], vm_tags=vm["tags"],
    )
    if not effective or rank.get(effective, 0) < needed:
        return web.json_response(
            {"error": "forbidden", "required_role": min_role},
            status=403,
        )
    return None


# ---------------------------------------------------------------- reset

async def vm_reset_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)

    min_role = "admin" if _require_admin_for_destructive() else "operator"
    deny = _check_role(request, cluster_id, vm, min_role)
    if deny: return deny

    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.vm_reset(vm["node"], vmid)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="vm.reset",
                          target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="vm.reset",
                      target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                      cluster_id=cluster_id, result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


# ---------------------------------------------------------------- snapshots

async def snapshots_list_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    deny = _check_role(request, cluster_id, vm, "viewer")
    if deny: return deny
    is_lxc = vm["type"] == "lxc"
    try:
        if is_lxc:
            snaps = await cluster.client.ct_list_snapshots(vm["node"], vmid)
        else:
            snaps = await cluster.client.vm_list_snapshots(vm["node"], vmid)
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"snapshots": snaps})


async def snapshot_create_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    deny = _check_role(request, cluster_id, vm, "operator")
    if deny: return deny

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    snapname = body.get("snapname", "").strip()
    if not snapname:
        return web.json_response({"error": "missing_snapname"}, status=400)

    user, ip, rid = _audit_actor(request)
    is_lxc = vm["type"] == "lxc"
    try:
        if is_lxc:
            upid = await cluster.client.ct_take_snapshot(
                vm["node"], vmid, snapname,
                description=body.get("description", ""),
            )
        else:
            upid = await cluster.client.vm_take_snapshot(
                vm["node"], vmid, snapname,
                description=body.get("description", ""),
                vmstate=bool(body.get("vmstate", False)),
            )
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"{'ct' if is_lxc else 'vm'}.snapshot.create",
                          target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}/{snapname}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"{'ct' if is_lxc else 'vm'}.snapshot.create",
                      target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}/{snapname}",
                      cluster_id=cluster_id, result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True, "upid": upid})


async def snapshot_delete_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    snapname = request.match_info["snapname"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    deny = _check_role(request, cluster_id, vm, "admin")
    if deny: return deny

    user, ip, rid = _audit_actor(request)
    is_lxc = vm["type"] == "lxc"
    try:
        if is_lxc:
            upid = await cluster.client.ct_delete_snapshot(vm["node"], vmid, snapname)
        else:
            upid = await cluster.client.vm_delete_snapshot(vm["node"], vmid, snapname)
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"{'ct' if is_lxc else 'vm'}.snapshot.delete",
                          target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}/{snapname}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"{'ct' if is_lxc else 'vm'}.snapshot.delete",
                      target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}/{snapname}",
                      cluster_id=cluster_id, result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


async def snapshot_rollback_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    snapname = request.match_info["snapname"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    deny = _check_role(request, cluster_id, vm, "admin")
    if deny: return deny

    user, ip, rid = _audit_actor(request)
    is_lxc = vm["type"] == "lxc"
    try:
        if is_lxc:
            upid = await cluster.client.ct_rollback_snapshot(vm["node"], vmid, snapname)
        else:
            upid = await cluster.client.vm_rollback_snapshot(vm["node"], vmid, snapname)
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"{'ct' if is_lxc else 'vm'}.snapshot.rollback",
                          target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}/{snapname}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"{'ct' if is_lxc else 'vm'}.snapshot.rollback",
                      target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}/{snapname}",
                      cluster_id=cluster_id, result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


# ---------------------------------------------------------------- clone / template / delete

async def clone_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    deny = _check_role(request, cluster_id, vm, "operator")
    if deny: return deny

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    try:
        newid = int(body["newid"])
    except (KeyError, ValueError):
        return web.json_response({"error": "missing_newid"}, status=400)

    user, ip, rid = _audit_actor(request)
    is_lxc = vm["type"] == "lxc"
    try:
        if is_lxc:
            upid = await cluster.client.ct_clone(
                vm["node"], vmid, newid=newid,
                hostname=body.get("name", "") or body.get("hostname", ""),
                target_node=body.get("target_node"),
                full=bool(body.get("full", False)),
                storage=body.get("storage"),
                snapname=body.get("snapname"),
            )
        else:
            upid = await cluster.client.vm_clone(
                vm["node"], vmid, newid=newid,
                name=body.get("name", ""),
                target_node=body.get("target_node"),
                full=bool(body.get("full", False)),
                storage=body.get("storage"),
                snapname=body.get("snapname"),
            )
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"{'ct' if is_lxc else 'vm'}.clone",
                          target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid} -> {newid}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"{'ct' if is_lxc else 'vm'}.clone",
                      target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid} -> {newid}",
                      cluster_id=cluster_id, result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True, "upid": upid, "newid": newid})


async def template_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    deny = _check_role(request, cluster_id, vm, "admin")
    if deny: return deny

    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.vm_to_template(vm["node"], vmid)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="vm.to_template",
                          target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="vm.to_template",
                      target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                      cluster_id=cluster_id, result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


async def delete_handler(request: web.Request) -> web.Response:
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    deny = _check_role(request, cluster_id, vm, "admin")
    if deny: return deny

    purge = request.query.get("purge", "0") in ("1", "true", "yes")
    user, ip, rid = _audit_actor(request)
    is_lxc = vm["type"] == "lxc"
    action = "ct.delete" if is_lxc else "vm.delete"
    try:
        if is_lxc:
            upid = await cluster.client.ct_delete(vm["node"], vmid, purge=purge)
        else:
            upid = await cluster.client.vm_delete(vm["node"], vmid, purge=purge)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action=action,
                          target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid, params={"purge": purge})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action=action,
                      target=f"{cluster_id}/{vm['node']}/{vm['type']}/{vmid}",
                      cluster_id=cluster_id, result="ok", request_id=rid,
                      params={"purge": purge})
    return web.json_response({"ok": True, "upid": upid})


# ---------------------------------------------------------------- config update

async def config_update_handler(request: web.Request) -> web.Response:
    """PUT /api/clusters/{cid}/vms/{vmid}/config — partial update of VM config.
    Body fields are passed through to PVE except `node` and `vmid` which are
    derived from the URL. Most edits require operator; structural changes
    (like resize) admin."""
    if not _enabled():
        return _disabled()
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm = _resolve_vm(cluster, vmid)
    if vm is None:
        return web.json_response({"error": "vm_not_found"}, status=404)

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    if not isinstance(body, dict) or not body:
        return web.json_response({"error": "empty_body"}, status=400)

    # Decide tier by which fields are touched.
    DESTRUCTIVE_KEYS = {"delete", "scsi0", "scsi1", "scsi2", "virtio0", "virtio1",
                        "ide2", "boot", "machine", "bios"}
    needs_admin = any(k in DESTRUCTIVE_KEYS or k.startswith("delete") for k in body)
    min_role = "admin" if needs_admin else "operator"
    deny = _check_role(request, cluster_id, vm, min_role)
    if deny: return deny

    user, ip, rid = _audit_actor(request)
    try:
        result = await cluster.client.vm_update_config(vm["node"], vmid, **body)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="vm.config.update",
                          target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                          cluster_id=cluster_id, result=audit.result_error(e),
                          request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="vm.config.update",
                      target=f"{cluster_id}/{vm['node']}/vm/{vmid}",
                      cluster_id=cluster_id, result="ok", request_id=rid,
                      params={"keys": sorted(body.keys())})
    return web.json_response({"ok": True, "result": result})


# ---------------------------------------------------------------- routes

ROUTES = [
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/vms/{vmid}/reset",            vm_reset_handler),
    ("GET",    "/api/clusters/{cluster_id}/vms/{vmid}/snapshots",                      snapshots_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/vms/{vmid}/snapshots",                      snapshot_create_handler),
    ("DELETE", "/api/clusters/{cluster_id}/vms/{vmid}/snapshots/{snapname}",           snapshot_delete_handler),
    ("POST",   "/api/clusters/{cluster_id}/vms/{vmid}/snapshots/{snapname}/rollback",  snapshot_rollback_handler),
    ("POST",   "/api/clusters/{cluster_id}/vms/{vmid}/clone",                          clone_handler),
    ("POST",   "/api/clusters/{cluster_id}/vms/{vmid}/template",                       template_handler),
    ("DELETE", "/api/clusters/{cluster_id}/vms/{vmid}",                                delete_handler),
    ("PUT",    "/api/clusters/{cluster_id}/vms/{vmid}/config",                         config_update_handler),
]
