"""Cluster-wide lock visibility + clear.

Routes:
  GET    /api/clusters/{cid}/locks                                    (operator)
  POST   /api/clusters/{cid}/nodes/{node}/qemu/{vmid}/unlock          (admin)
  POST   /api/clusters/{cid}/nodes/{node}/lxc/{vmid}/unlock           (admin)

The list endpoint walks the cluster cache (already populated by the
polling loop) and emits any VM/CT whose `lock` field is non-empty —
common locks: migrate, backup, snapshot, rollback, suspended, clone.
A stuck lock prevents most operations until it's cleared.
"""
from __future__ import annotations

import logging

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


def _audit(request: web.Request):
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


@role_required("operator")
async def list_locks_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    rows = []
    for vm in cluster.cache.vms.values():
        lock = (getattr(vm, "lock", "") or "").strip()
        if not lock:
            continue
        rows.append({
            "vmid": int(vm.vmid),
            "name": getattr(vm, "name", "") or "",
            "node": getattr(vm, "node", "") or "",
            "type": getattr(vm, "type", "qemu"),
            "lock": lock,
            "status": getattr(vm, "status", "") or "",
        })
    rows.sort(key=lambda r: (r["node"], r["vmid"]))
    return web.json_response({"locks": rows, "count": len(rows)})


async def _do_unlock(request: web.Request, kind: str) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    fn = cluster.client.vm_unlock if kind == "qemu" else cluster.client.ct_unlock
    try:
        await fn(node, vmid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip,
                          action=f"pve.{kind}.unlock",
                          target=f"{cid}/{node}/{vmid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip,
                      action=f"pve.{kind}.unlock",
                      target=f"{cid}/{node}/{vmid}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def qemu_unlock_handler(request: web.Request) -> web.Response:
    return await _do_unlock(request, "qemu")


@role_required("admin")
async def lxc_unlock_handler(request: web.Request) -> web.Response:
    return await _do_unlock(request, "lxc")


ROUTES = [
    ("GET",  r"/api/clusters/{cluster_id}/locks",                                 list_locks_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/unlock",       qemu_unlock_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/unlock",        lxc_unlock_handler),
]
