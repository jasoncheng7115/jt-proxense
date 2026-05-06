"""PDM-style resource grouping endpoints — pools + VM/CT tags.

Pools are PVE's first-class resource container. A pool holds a set of VMs,
CTs, and storages and gives operators (and ACLs) a unit to grant on. We
expose the read-write surface so admins can organize resources from this UI
instead of bouncing to the PVE web UI.

VM tags double as scope keys for our VM-pattern RBAC (e.g. `tag:prod` matches
any VM with that tag). Letting admins set tags from here is what makes that
RBAC feature usable without the operator going elsewhere.
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


# ---------------------------------------------------------------- pools

@role_required("admin")
async def pools_list_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        pools = await cluster.client.list_pools()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"pools": pools})


@role_required("admin")
async def pool_create_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    poolid = (body.get("poolid") or "").strip()
    comment = body.get("comment") or ""
    if not poolid:
        return web.json_response({"error": "missing_poolid"}, status=400)

    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.create_pool(poolid, comment)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="pool.create",
            target=f"{cluster_id}/{poolid}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"comment": comment},
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="pool.create",
        target=f"{cluster_id}/{poolid}", cluster_id=cluster_id,
        result="ok", request_id=rid, params={"comment": comment},
    )
    return web.json_response({"ok": True})


@role_required("admin")
async def pool_delete_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    poolid = request.match_info["poolid"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.delete_pool(poolid)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="pool.delete",
            target=f"{cluster_id}/{poolid}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip, action="pool.delete",
        target=f"{cluster_id}/{poolid}", cluster_id=cluster_id,
        result="ok", request_id=rid,
    )
    return web.json_response({"ok": True})


@role_required("admin")
async def pool_update_handler(request: web.Request) -> web.Response:
    """PUT /api/clusters/{cid}/pools/{poolid}
    body: {"vms": "100,101", "storage": "local", "delete": false}
    """
    cluster_id = request.match_info["cluster_id"]
    poolid = request.match_info["poolid"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    vms = body.get("vms")
    storage = body.get("storage")
    delete = bool(body.get("delete", False))
    if vms is None and storage is None:
        return web.json_response({"error": "no_changes"}, status=400)

    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.update_pool(poolid, vms=vms, storage=storage, delete=delete)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip,
            action="pool.delete_members" if delete else "pool.add_members",
            target=f"{cluster_id}/{poolid}", cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"vms": vms, "storage": storage},
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip,
        action="pool.delete_members" if delete else "pool.add_members",
        target=f"{cluster_id}/{poolid}", cluster_id=cluster_id,
        result="ok", request_id=rid,
        params={"vms": vms, "storage": storage},
    )
    return web.json_response({"ok": True})


# ---------------------------------------------------------------- tags


def _resolve_guest(cluster, vmid: int):
    """Find VM/CT in cluster cache and return (node, type)."""
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == int(vmid):
            return getattr(vm, "node", ""), getattr(vm, "type", "qemu")
    return None, None


@role_required("admin")
async def tags_set_handler(request: web.Request) -> web.Response:
    """PUT /api/clusters/{cid}/vms/{vmid}/tags
    body: {"tags": "prod;web"} — full replace, semicolon-separated per PVE.
    """
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    node, vm_type = _resolve_guest(cluster, vmid)
    if not node:
        return web.json_response({"error": "vm_not_found"}, status=404)

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    tags = (body.get("tags") or "").strip()

    user, ip, rid = _audit_actor(request)
    try:
        if vm_type == "lxc":
            await cluster.client.set_ct_tags(node, vmid, tags)
        else:
            await cluster.client.set_vm_tags(node, vmid, tags)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip,
            action=f"{'ct' if vm_type=='lxc' else 'vm'}.tags.set",
            target=f"{cluster_id}/{node}/{vm_type}/{vmid}",
            cluster_id=cluster_id, result=audit.result_error(e),
            request_id=rid, params={"tags": tags},
        )
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(
        user=user, source_ip=ip,
        action=f"{'ct' if vm_type=='lxc' else 'vm'}.tags.set",
        target=f"{cluster_id}/{node}/{vm_type}/{vmid}",
        cluster_id=cluster_id, result="ok", request_id=rid,
        params={"tags": tags},
    )
    return web.json_response({"ok": True, "tags": tags, "type": vm_type})


# ---------------------------------------------------------------- routes

ROUTES = [
    ("GET",    "/api/clusters/{cluster_id}/pools",          pools_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/pools",          pool_create_handler),
    ("PUT",    "/api/clusters/{cluster_id}/pools/{poolid}", pool_update_handler),
    ("DELETE", "/api/clusters/{cluster_id}/pools/{poolid}", pool_delete_handler),
    ("PUT",    "/api/clusters/{cluster_id}/vms/{vmid}/tags", tags_set_handler),
]
