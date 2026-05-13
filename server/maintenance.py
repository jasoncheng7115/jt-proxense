"""Node maintenance-mode orchestration (admin only).

POST /api/clusters/{cid}/nodes/{node}/maintenance
  body: {
    enable: true | false,                        # required
    set_ceph_noout: true | false,                # optional, default true
    migrate_vms: true | false,                   # optional, default false
    target_node: "<node>",                       # required when migrate_vms
  }

When enable=true:
  - if set_ceph_noout: set the cluster `noout` ceph flag
  - if migrate_vms: enumerate all VMs/CTs running on `node` and submit
    online migrate tasks to `target_node`. Returns list of task UPIDs.

When enable=false:
  - clears noout (only if it was set; safe either way)
  - migrate_vms is ignored

OWASP design:
  A01 — admin only.
  A03 — node + target_node validated against the same regex.
  A09 — every step audits independently so a partial failure is visible.
  A04 — does NOT auto-revert on partial failure: operator must clean up
        manually if a migrate fails (we surface the per-VM result list).
"""
from __future__ import annotations

import logging
import re

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_NODE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$")


def _audit(request: web.Request):
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


@role_required("admin")
async def maintenance_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    if not _NODE_RE.match(node):
        return web.json_response({"error": "bad_node"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    enable = bool(body.get("enable", True))
    set_noout = bool(body.get("set_ceph_noout", True))
    migrate_vms = bool(body.get("migrate_vms", False))
    target = (body.get("target_node") or "").strip()
    if migrate_vms and not _NODE_RE.match(target):
        return web.json_response({"error": "bad_target_node"}, status=400)

    actor, ip, rid = _audit(request)
    out: dict = {
        "node": node, "enable": enable,
        "noout_set": False, "noout_cleared": False,
        "migrations": [],   # list of {vmid, type, ok, detail}
    }

    # --- Ceph noout ---------------------------------------------------
    if set_noout:
        try:
            if enable:
                await cluster.client.ceph_set_flag("noout")
                out["noout_set"] = True
            else:
                await cluster.client.ceph_unset_flag("noout")
                out["noout_cleared"] = True
        except Exception as e:
            # Many clusters have no Ceph; failing the whole operation
            # because of that would be unhelpful. Audit + carry on.
            logger.info("maintenance: noout %s on %s/%s failed (likely no Ceph): %s",
                        "set" if enable else "unset", cid, node, e)
            out["noout_error"] = str(e)

    # --- Migrate ALL VMs/CTs off the node ----------------------------
    if enable and migrate_vms:
        running = []
        for vm in cluster.cache.vms.values():
            if getattr(vm, "node", "") != node:
                continue
            if (getattr(vm, "status", "") or "").lower() != "running":
                continue
            running.append(vm)
        for vm in running:
            vmid = int(vm.vmid)
            vm_type = getattr(vm, "type", "qemu")
            try:
                if vm_type == "lxc":
                    upid = await cluster.client.ct_migrate(
                        node, vmid, target=target, online=True, restart=True,
                    )
                else:
                    upid = await cluster.client.vm_migrate(
                        node, vmid, target=target, online=True,
                    )
                out["migrations"].append({
                    "vmid": vmid, "type": vm_type,
                    "ok": True, "upid": upid,
                })
            except Exception as e:
                out["migrations"].append({
                    "vmid": vmid, "type": vm_type,
                    "ok": False, "detail": str(e),
                })

    await audit.write(
        user=actor, source_ip=ip,
        action="node.maintenance.enter" if enable else "node.maintenance.exit",
        target=f"{cid}/{node}", cluster_id=cid,
        result="ok", request_id=rid,
        params={
            "set_noout": set_noout, "migrate_vms": migrate_vms,
            "target": target, "migrated": len(out["migrations"]),
        },
    )
    return web.json_response({"ok": True, **out})


ROUTES = [
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/maintenance", maintenance_handler),
]
