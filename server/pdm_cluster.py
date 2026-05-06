"""PDM-style cluster operations: apt updates, ACME certs, HA groups,
firewall rules (cluster + VM level), SDN read, storage replication.

All endpoints share the same RBAC + audit pattern as v0.3 vm_control:
  - Read endpoints: operator (mostly) — informational
  - Mutating endpoints: admin
  - Every write emits an audit row, body hashed not stored
  - PVE failures audited with the exception class name
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


def _get_cluster_or_404(request: web.Request):
    """Return cluster object or a 404 web.Response."""
    cluster_id = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return None, web.json_response({"error": "cluster_not_found"}, status=404)
    return cluster, None


# ============================================================ APT UPDATES

@role_required("operator")
async def apt_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    node = request.match_info["node"]
    try:
        rows = await cluster.client.list_apt_updates(node)
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"updates": rows})


@role_required("admin")
async def apt_refresh_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    node = request.match_info["node"]
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.apt_refresh(node)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="apt.refresh",
                          target=f"{request.match_info['cluster_id']}/{node}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="apt.refresh",
                      target=f"{request.match_info['cluster_id']}/{node}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def apt_upgrade_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    node = request.match_info["node"]
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.apt_upgrade(node)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="apt.upgrade",
                          target=f"{request.match_info['cluster_id']}/{node}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="apt.upgrade",
                      target=f"{request.match_info['cluster_id']}/{node}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


# ============================================================ ACME

@role_required("admin")
async def acme_accounts_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        rows = await cluster.client.list_acme_accounts()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"accounts": rows})


@role_required("admin")
async def acme_account_create_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    name = body.get("name")
    contact = body.get("contact")
    if not name or not contact:
        return web.json_response({"error": "missing_fields",
                                  "required": ["name", "contact"]}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.create_acme_account(
            name=name, contact=contact,
            directory=body.get("directory", "https://acme-v02.api.letsencrypt.org/directory"),
            tos_url=body.get("tos_url", ""),
        )
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="acme.account.create",
                          target=f"{request.match_info['cluster_id']}/{name}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="acme.account.create",
                      target=f"{request.match_info['cluster_id']}/{name}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def acme_cert_request_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    node = request.match_info["node"]
    try:
        body = await request.json()
    except Exception:
        body = {}
    force = bool(body.get("force", False))
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.request_acme_cert(node, force=force)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="acme.cert.request",
                          target=f"{request.match_info['cluster_id']}/{node}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid,
                          params={"force": force})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="acme.cert.request",
                      target=f"{request.match_info['cluster_id']}/{node}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid, params={"force": force})
    return web.json_response({"ok": True, "upid": upid})


# ============================================================ HA

@role_required("operator")
async def ha_groups_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        rows = await cluster.client.list_ha_groups()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"groups": rows})


@role_required("admin")
async def ha_group_create_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    group = body.get("group")
    nodes = body.get("nodes")
    if not group or not nodes:
        return web.json_response({"error": "missing_fields",
                                  "required": ["group", "nodes"]}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.create_ha_group(
            group=group, nodes=nodes,
            restricted=bool(body.get("restricted", False)),
            nofailback=bool(body.get("nofailback", False)),
            comment=body.get("comment", ""),
        )
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="ha.group.create",
                          target=f"{request.match_info['cluster_id']}/{group}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="ha.group.create",
                      target=f"{request.match_info['cluster_id']}/{group}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True})


@role_required("admin")
async def ha_group_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    group = request.match_info["group"]
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.delete_ha_group(group)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="ha.group.delete",
                          target=f"{request.match_info['cluster_id']}/{group}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="ha.group.delete",
                      target=f"{request.match_info['cluster_id']}/{group}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("operator")
async def ha_resources_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        rows = await cluster.client.list_ha_resources()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"resources": rows})


@role_required("admin")
async def ha_resource_add_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    sid = body.get("sid")
    if not sid:
        return web.json_response({"error": "missing_sid"}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.add_ha_resource(
            sid=sid, group=body.get("group"),
            state=body.get("state", "started"),
            comment=body.get("comment", ""),
        )
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="ha.resource.add",
                          target=f"{request.match_info['cluster_id']}/{sid}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="ha.resource.add",
                      target=f"{request.match_info['cluster_id']}/{sid}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True})


@role_required("admin")
async def ha_resource_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    sid = request.match_info["sid"]
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.delete_ha_resource(sid)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="ha.resource.delete",
                          target=f"{request.match_info['cluster_id']}/{sid}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="ha.resource.delete",
                      target=f"{request.match_info['cluster_id']}/{sid}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


# ============================================================ FIREWALL

@role_required("operator")
async def fw_cluster_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        rows = await cluster.client.list_cluster_firewall_rules()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"rules": rows})


@role_required("admin")
async def fw_cluster_add_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    action = body.get("action")
    if action not in ("ACCEPT", "REJECT", "DROP"):
        return web.json_response({"error": "bad_action",
                                  "valid": ["ACCEPT", "REJECT", "DROP"]},
                                 status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.add_cluster_firewall_rule(
            action=action, type=body.get("type", "in"),
            enable=bool(body.get("enable", True)),
            source=body.get("source", ""), dest=body.get("dest", ""),
            proto=body.get("proto", ""), dport=body.get("dport", ""),
            comment=body.get("comment", ""),
        )
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="firewall.cluster.add",
                          target=request.match_info["cluster_id"],
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="firewall.cluster.add",
                      target=request.match_info["cluster_id"],
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True})


@role_required("admin")
async def fw_cluster_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        pos = int(request.match_info["pos"])
    except ValueError:
        return web.json_response({"error": "bad_pos"}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.delete_cluster_firewall_rule(pos)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="firewall.cluster.delete",
                          target=f"{request.match_info['cluster_id']}/pos={pos}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="firewall.cluster.delete",
                      target=f"{request.match_info['cluster_id']}/pos={pos}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


def _resolve_guest_type(cluster, vmid: int) -> tuple[str | None, str | None]:
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == int(vmid):
            return getattr(vm, "node", ""), getattr(vm, "type", "qemu")
    return None, None


@role_required("operator")
async def fw_vm_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vmid = int(request.match_info["vmid"])
    node, vm_type = _resolve_guest_type(cluster, vmid)
    if not node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    try:
        rows = await cluster.client.list_vm_firewall_rules(node, vmid, vm_type)
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"rules": rows, "type": vm_type})


@role_required("admin")
async def fw_vm_add_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vmid = int(request.match_info["vmid"])
    node, vm_type = _resolve_guest_type(cluster, vmid)
    if not node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    if body.get("action") not in ("ACCEPT", "REJECT", "DROP"):
        return web.json_response({"error": "bad_action"}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.add_vm_firewall_rule(node, vmid, vm_type, **body)
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"firewall.{vm_type}.add",
                          target=f"{request.match_info['cluster_id']}/{node}/{vm_type}/{vmid}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"firewall.{vm_type}.add",
                      target=f"{request.match_info['cluster_id']}/{node}/{vm_type}/{vmid}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True})


@role_required("admin")
async def fw_vm_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vmid = int(request.match_info["vmid"])
    pos = int(request.match_info["pos"])
    node, vm_type = _resolve_guest_type(cluster, vmid)
    if not node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.delete_vm_firewall_rule(node, vmid, vm_type, pos)
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"firewall.{vm_type}.delete",
                          target=f"{request.match_info['cluster_id']}/{node}/{vm_type}/{vmid}/pos={pos}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"firewall.{vm_type}.delete",
                      target=f"{request.match_info['cluster_id']}/{node}/{vm_type}/{vmid}/pos={pos}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


# ============================================================ SDN

@role_required("operator")
async def sdn_zones_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        rows = await cluster.client.list_sdn_zones()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"zones": rows})


@role_required("operator")
async def sdn_vnets_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        rows = await cluster.client.list_sdn_vnets()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"vnets": rows})


@role_required("operator")
async def sdn_subnets_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vnet = request.match_info["vnet"]
    try:
        rows = await cluster.client.list_sdn_subnets(vnet)
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"subnets": rows})


@role_required("admin")
async def sdn_reload_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.reload_sdn()
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="sdn.reload",
                          target=request.match_info["cluster_id"],
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="sdn.reload",
                      target=request.match_info["cluster_id"],
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


# ============================================================ STORAGE REPLICATION

@role_required("operator")
async def repl_list_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        rows = await cluster.client.list_replication_jobs()
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"jobs": rows})


@role_required("admin")
async def repl_create_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    job_id = body.get("id")
    target = body.get("target")
    schedule = body.get("schedule")
    if not job_id or not target or not schedule:
        return web.json_response({"error": "missing_fields",
                                  "required": ["id", "target", "schedule"]},
                                 status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.create_replication_job(
            id=job_id, target=target, schedule=schedule,
            rate=body.get("rate"), comment=body.get("comment", ""),
        )
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="replication.create",
                          target=f"{request.match_info['cluster_id']}/{job_id}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid, params=body)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="replication.create",
                      target=f"{request.match_info['cluster_id']}/{job_id}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid, params=body)
    return web.json_response({"ok": True})


@role_required("admin")
async def repl_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    job_id = request.match_info["job_id"]
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.delete_replication_job(job_id)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="replication.delete",
                          target=f"{request.match_info['cluster_id']}/{job_id}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="replication.delete",
                      target=f"{request.match_info['cluster_id']}/{job_id}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


# ============================================================ ROUTES

ROUTES = [
    # apt updates
    ("GET",    "/api/clusters/{cluster_id}/nodes/{node}/apt",          apt_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/apt/refresh",  apt_refresh_handler),
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/apt/upgrade",  apt_upgrade_handler),
    # ACME
    ("GET",    "/api/clusters/{cluster_id}/acme/accounts",             acme_accounts_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/acme/accounts",             acme_account_create_handler),
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/acme/cert",    acme_cert_request_handler),
    # HA groups + resources
    ("GET",    "/api/clusters/{cluster_id}/ha/groups",                 ha_groups_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/ha/groups",                 ha_group_create_handler),
    ("DELETE", "/api/clusters/{cluster_id}/ha/groups/{group}",         ha_group_delete_handler),
    ("GET",    "/api/clusters/{cluster_id}/ha/resources",              ha_resources_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/ha/resources",              ha_resource_add_handler),
    ("DELETE", "/api/clusters/{cluster_id}/ha/resources/{sid:.+}",     ha_resource_delete_handler),
    # firewall — cluster level
    ("GET",    "/api/clusters/{cluster_id}/firewall/rules",            fw_cluster_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/firewall/rules",            fw_cluster_add_handler),
    ("DELETE", "/api/clusters/{cluster_id}/firewall/rules/{pos}",      fw_cluster_delete_handler),
    # firewall — VM level
    ("GET",    "/api/clusters/{cluster_id}/vms/{vmid}/firewall/rules", fw_vm_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/vms/{vmid}/firewall/rules", fw_vm_add_handler),
    ("DELETE", "/api/clusters/{cluster_id}/vms/{vmid}/firewall/rules/{pos}", fw_vm_delete_handler),
    # SDN
    ("GET",    "/api/clusters/{cluster_id}/sdn/zones",                 sdn_zones_list_handler),
    ("GET",    "/api/clusters/{cluster_id}/sdn/vnets",                 sdn_vnets_list_handler),
    ("GET",    "/api/clusters/{cluster_id}/sdn/vnets/{vnet}/subnets",  sdn_subnets_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/sdn/reload",                sdn_reload_handler),
    # Storage replication
    ("GET",    "/api/clusters/{cluster_id}/replication",               repl_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/replication",               repl_create_handler),
    ("DELETE", "/api/clusters/{cluster_id}/replication/{job_id}",      repl_delete_handler),
]
