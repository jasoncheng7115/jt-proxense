"""PDM-style cluster operations: apt updates, ACME certs, HA groups,
firewall rules (cluster + VM level), SDN read, storage replication.

All endpoints share the same RBAC + audit pattern as v0.3 vm_control:
  - Read endpoints: operator (mostly) — informational
  - Mutating endpoints: admin
  - Every write emits an audit row, body hashed not stored
  - PVE failures audited with the exception class name
"""
from __future__ import annotations

import re

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


# OWASP A03 — narrow regex allow-lists for fields that flow into PVE.
# `source` / `dest` accept IP, CIDR, IP-range, ipset name (+leading "+"),
# alias name (no special prefix), or empty.
_FW_ADDR_RE = re.compile(r"^[+A-Za-z0-9._:/\-]{0,128}$")
_FW_PORT_RE = re.compile(r"^[0-9,:\-]{0,64}$")        # 80 / 80,443 / 8000-8100
_FW_PROTO_RE = re.compile(r"^[a-zA-Z]{0,16}$")        # tcp / udp / icmp / etc
_FW_TYPE_RE = re.compile(r"^(in|out|forward|group)$")
_FW_IFACE_RE = re.compile(r"^[A-Za-z0-9._\-]{0,32}$")
_FW_COMMENT_RE = re.compile(r"^[\x20-\x7e]{0,256}$")  # printable ASCII only
_HA_SID_RE = re.compile(r"^(vm|ct):[0-9]{2,9}$")
_HA_GROUP_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_\-]{0,63}$")


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
    group = (body.get("group") or "").strip()
    nodes = (body.get("nodes") or "").strip()
    if not group or not nodes:
        return web.json_response({"error": "missing_fields",
                                  "required": ["group", "nodes"]}, status=400)
    if not _HA_GROUP_RE.match(group):
        return web.json_response({"error": "bad_group_name"}, status=400)
    # nodes is a comma-separated list of node names with optional priorities,
    # e.g. "pve01:2,pve02:1". Conservative regex.
    if not re.match(r"^[A-Za-z0-9._\-:,]{1,512}$", nodes):
        return web.json_response({"error": "bad_nodes"}, status=400)
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
    if not _HA_GROUP_RE.match(group):
        return web.json_response({"error": "bad_group"}, status=400)
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
    sid = (body.get("sid") or "").strip()
    if not sid or not _HA_SID_RE.match(sid):
        return web.json_response({"error": "bad_sid",
                                  "expected": "vm:<id> | ct:<id>"}, status=400)
    group = body.get("group")
    if group and not _HA_GROUP_RE.match(str(group).strip()):
        return web.json_response({"error": "bad_group"}, status=400)
    state = (body.get("state") or "started").strip()
    if state not in ("started", "stopped", "enabled", "disabled", "ignored"):
        return web.json_response({"error": "bad_state"}, status=400)
    comment = (body.get("comment") or "").strip()
    if not _FW_COMMENT_RE.match(comment):
        return web.json_response({"error": "bad_comment"}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.add_ha_resource(
            sid=sid, group=(group or None),
            state=state, comment=comment,
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
    if not _HA_SID_RE.match(sid):
        return web.json_response({"error": "bad_sid"}, status=400)
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
    rtype = (body.get("type") or "in").strip()
    if not _FW_TYPE_RE.match(rtype):
        return web.json_response({"error": "bad_type"}, status=400)
    source = (body.get("source") or "").strip()
    dest   = (body.get("dest")   or "").strip()
    proto  = (body.get("proto")  or "").strip()
    dport  = (body.get("dport")  or "").strip()
    comment= (body.get("comment") or "").strip()
    if not _FW_ADDR_RE.match(source):  return web.json_response({"error": "bad_source"}, status=400)
    if not _FW_ADDR_RE.match(dest):    return web.json_response({"error": "bad_dest"}, status=400)
    if not _FW_PROTO_RE.match(proto):  return web.json_response({"error": "bad_proto"}, status=400)
    if not _FW_PORT_RE.match(dport):   return web.json_response({"error": "bad_dport"}, status=400)
    if not _FW_COMMENT_RE.match(comment): return web.json_response({"error": "bad_comment"}, status=400)
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.add_cluster_firewall_rule(
            action=action, type=rtype,
            enable=bool(body.get("enable", True)),
            source=source, dest=dest, proto=proto, dport=dport,
            comment=comment,
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
async def fw_vm_options_get_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vmid = int(request.match_info["vmid"])
    node, vm_type = _resolve_guest_type(cluster, vmid)
    if not node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    try:
        opts = await cluster.client.get_vm_fw_options(node, vmid, vm_type or "qemu")
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    return web.json_response({"options": opts, "type": vm_type})


@role_required("admin")
async def fw_vm_options_set_handler(request: web.Request) -> web.Response:
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
    allowed = {"enable", "policy_in", "policy_out",
               "log_level_in", "log_level_out",
               "dhcp", "ipfilter", "macfilter", "ndp", "radv"}
    fields: dict = {}
    for k, v in body.items():
        if k not in allowed:
            continue
        if k == "enable" or k.startswith("dhcp") or k in ("ipfilter", "macfilter", "ndp", "radv"):
            fields[k] = 1 if bool(v) else 0
        elif k.startswith("policy_"):
            if v not in ("ACCEPT", "REJECT", "DROP"):
                return web.json_response({"error": f"bad_{k}"}, status=400)
            fields[k] = v
        elif k.startswith("log_level_"):
            if v not in ("nolog", "emerg", "alert", "crit", "err",
                         "warning", "notice", "info", "debug"):
                return web.json_response({"error": f"bad_{k}"}, status=400)
            fields[k] = v
    if not fields:
        return web.json_response({"error": "no_changes"}, status=400)
    user, ip, rid = _audit_actor(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.update_vm_fw_options(node, vmid, vm_type or "qemu", **fields)
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"firewall.{vm_type}.options",
                          target=f"{cid}/{node}/{vm_type}/{vmid}",
                          cluster_id=cid, result=audit.result_error(e),
                          request_id=rid, params={"keys": sorted(fields.keys())})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"firewall.{vm_type}.options",
                      target=f"{cid}/{node}/{vm_type}/{vmid}",
                      cluster_id=cid, result="ok",
                      request_id=rid, params={"keys": sorted(fields.keys())})
    return web.json_response({"ok": True})


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
    rtype = (body.get("type") or "in").strip()
    if not _FW_TYPE_RE.match(rtype):
        return web.json_response({"error": "bad_type"}, status=400)
    for fld, pat in (
        ("source", _FW_ADDR_RE), ("dest", _FW_ADDR_RE),
        ("proto", _FW_PROTO_RE), ("dport", _FW_PORT_RE),
        ("sport", _FW_PORT_RE),  ("iface", _FW_IFACE_RE),
        ("comment", _FW_COMMENT_RE),
    ):
        v = body.get(fld) or ""
        if not pat.match(str(v)):
            return web.json_response({"error": f"bad_{fld}"}, status=400)
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


_SDN_NAME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_\-]{0,15}$")
_SDN_BRIDGE_RE = re.compile(r"^[A-Za-z0-9._\-]{1,32}$")
_SDN_CIDR_RE = re.compile(r"^[0-9.]{7,18}/[0-9]{1,2}$")
_SDN_IP_RE = re.compile(r"^[0-9.]{7,18}$")
_SDN_VALID_ZTYPES = ("simple", "vlan", "qinq", "vxlan", "evpn")


@role_required("admin")
async def sdn_zone_create_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    zone = (body.get("zone") or "").strip()
    ztype = (body.get("type") or "").strip().lower()
    if not _SDN_NAME_RE.match(zone):
        return web.json_response({"error": "bad_zone"}, status=400)
    if ztype not in _SDN_VALID_ZTYPES:
        return web.json_response({"error": "bad_type",
                                  "valid": list(_SDN_VALID_ZTYPES)}, status=400)
    bridge = (body.get("bridge") or "").strip()
    if bridge and not _SDN_BRIDGE_RE.match(bridge):
        return web.json_response({"error": "bad_bridge"}, status=400)
    extra: dict = {}
    if bridge: extra["bridge"] = bridge
    # vlan + qinq need a `tag`
    if body.get("tag") is not None and body.get("tag") != "":
        try:
            tag = int(body["tag"])
            if tag < 1 or tag > 4094:
                raise ValueError
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_tag"}, status=400)
        extra["tag"] = tag
    if body.get("mtu"):
        try:
            mtu = int(body["mtu"])
            if mtu < 576 or mtu > 65535:
                raise ValueError
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_mtu"}, status=400)
        extra["mtu"] = mtu
    user, ip, rid = _audit_actor(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_sdn_zone(zone, ztype, **extra)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="sdn.zone.create",
                          target=f"{cid}/{zone}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"type": ztype, **extra})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="sdn.zone.create",
                      target=f"{cid}/{zone}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"type": ztype, **extra})
    return web.json_response({"ok": True})


@role_required("admin")
async def sdn_zone_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    zone = request.match_info["zone"]
    if not _SDN_NAME_RE.match(zone):
        return web.json_response({"error": "bad_zone"}, status=400)
    user, ip, rid = _audit_actor(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_sdn_zone(zone)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="sdn.zone.delete",
                          target=f"{cid}/{zone}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="sdn.zone.delete",
                      target=f"{cid}/{zone}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def sdn_vnet_create_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    vnet = (body.get("vnet") or "").strip()
    zone = (body.get("zone") or "").strip()
    if not _SDN_NAME_RE.match(vnet) or not _SDN_NAME_RE.match(zone):
        return web.json_response({"error": "bad_input"}, status=400)
    tag = body.get("tag")
    if tag is not None and tag != "":
        try:
            tag = int(tag)
            if tag < 1 or tag > 4094:
                raise ValueError
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_tag"}, status=400)
    else:
        tag = None
    alias = (body.get("alias") or "").strip() or None
    user, ip, rid = _audit_actor(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_sdn_vnet(vnet, zone, tag=tag, alias=alias)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="sdn.vnet.create",
                          target=f"{cid}/{vnet}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"zone": zone, "tag": tag})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="sdn.vnet.create",
                      target=f"{cid}/{vnet}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"zone": zone, "tag": tag})
    return web.json_response({"ok": True})


@role_required("admin")
async def sdn_vnet_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vnet = request.match_info["vnet"]
    if not _SDN_NAME_RE.match(vnet):
        return web.json_response({"error": "bad_vnet"}, status=400)
    user, ip, rid = _audit_actor(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_sdn_vnet(vnet)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="sdn.vnet.delete",
                          target=f"{cid}/{vnet}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="sdn.vnet.delete",
                      target=f"{cid}/{vnet}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def sdn_subnet_create_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vnet = request.match_info["vnet"]
    if not _SDN_NAME_RE.match(vnet):
        return web.json_response({"error": "bad_vnet"}, status=400)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    subnet = (body.get("subnet") or "").strip()
    if not _SDN_CIDR_RE.match(subnet):
        return web.json_response({"error": "bad_subnet"}, status=400)
    gateway = (body.get("gateway") or "").strip()
    if gateway and not _SDN_IP_RE.match(gateway):
        return web.json_response({"error": "bad_gateway"}, status=400)
    snat = bool(body.get("snat", False))
    user, ip, rid = _audit_actor(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_sdn_subnet(vnet, subnet,
                                                gateway=gateway or None,
                                                snat=snat)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="sdn.subnet.create",
                          target=f"{cid}/{vnet}/{subnet}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"gateway": gateway, "snat": snat})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="sdn.subnet.create",
                      target=f"{cid}/{vnet}/{subnet}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"gateway": gateway, "snat": snat})
    return web.json_response({"ok": True})


@role_required("admin")
async def sdn_subnet_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    vnet = request.match_info["vnet"]
    subnet = request.match_info["subnet"]
    if not _SDN_NAME_RE.match(vnet) or not _SDN_CIDR_RE.match(subnet):
        return web.json_response({"error": "bad_input"}, status=400)
    user, ip, rid = _audit_actor(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_sdn_subnet(vnet, subnet)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="sdn.subnet.delete",
                          target=f"{cid}/{vnet}/{subnet}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="sdn.subnet.delete",
                      target=f"{cid}/{vnet}/{subnet}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


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


@role_required("operator")
async def repl_run_now_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cid}/replication/{job_id}/run-now — schedule
    immediate execution. PVE expects the call to hit the *node* the job
    is configured to run on; we look up the node from the job_id format
    `<vmid>-<index>` plus the cluster cache."""
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    job_id = request.match_info["job_id"]
    if not re.match(r"^[0-9]+-[0-9]+$", job_id):
        return web.json_response({"error": "bad_job_id"}, status=400)
    # Look up the source node from the job's vmid.
    try:
        vmid = int(job_id.split("-", 1)[0])
    except ValueError:
        return web.json_response({"error": "bad_job_id"}, status=400)
    src_node = None
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == vmid:
            src_node = getattr(vm, "node", "")
            break
    if not src_node:
        return web.json_response({"error": "vm_not_found_for_job"}, status=404)
    user, ip, rid = _audit_actor(request)
    try:
        upid = await cluster.client.replication_run_now(src_node, job_id)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="replication.run_now",
                          target=f"{request.match_info['cluster_id']}/{job_id}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip, action="replication.run_now",
                      target=f"{request.match_info['cluster_id']}/{job_id}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def repl_disable_toggle_handler(request: web.Request) -> web.Response:
    cluster, err = _get_cluster_or_404(request)
    if err: return err
    job_id = request.match_info["job_id"]
    if not re.match(r"^[0-9]+-[0-9]+$", job_id):
        return web.json_response({"error": "bad_job_id"}, status=400)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    disabled = bool(body.get("disabled", True))
    user, ip, rid = _audit_actor(request)
    try:
        await cluster.client.replication_set_disable(job_id, disabled)
    except Exception as e:
        await audit.write(user=user, source_ip=ip,
                          action=f"replication.{'disable' if disabled else 'enable'}",
                          target=f"{request.match_info['cluster_id']}/{job_id}",
                          cluster_id=request.match_info["cluster_id"],
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=user, source_ip=ip,
                      action=f"replication.{'disable' if disabled else 'enable'}",
                      target=f"{request.match_info['cluster_id']}/{job_id}",
                      cluster_id=request.match_info["cluster_id"],
                      result="ok", request_id=rid)
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
    ("GET",    "/api/clusters/{cluster_id}/vms/{vmid}/firewall/options", fw_vm_options_get_handler),
    ("PUT",    "/api/clusters/{cluster_id}/vms/{vmid}/firewall/options", fw_vm_options_set_handler),
    # SDN
    ("GET",    "/api/clusters/{cluster_id}/sdn/zones",                 sdn_zones_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/sdn/zones",                 sdn_zone_create_handler),
    ("DELETE", "/api/clusters/{cluster_id}/sdn/zones/{zone}",          sdn_zone_delete_handler),
    ("GET",    "/api/clusters/{cluster_id}/sdn/vnets",                 sdn_vnets_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/sdn/vnets",                 sdn_vnet_create_handler),
    ("DELETE", "/api/clusters/{cluster_id}/sdn/vnets/{vnet}",          sdn_vnet_delete_handler),
    ("GET",    "/api/clusters/{cluster_id}/sdn/vnets/{vnet}/subnets",  sdn_subnets_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/sdn/vnets/{vnet}/subnets",  sdn_subnet_create_handler),
    ("DELETE", "/api/clusters/{cluster_id}/sdn/vnets/{vnet}/subnets/{subnet:.+}", sdn_subnet_delete_handler),
    ("POST",   "/api/clusters/{cluster_id}/sdn/reload",                sdn_reload_handler),
    # Storage replication
    ("GET",    "/api/clusters/{cluster_id}/replication",               repl_list_handler),
    ("POST",   "/api/clusters/{cluster_id}/replication",                       repl_create_handler),
    ("POST",   "/api/clusters/{cluster_id}/replication/{job_id}/run-now",      repl_run_now_handler),
    ("PUT",    "/api/clusters/{cluster_id}/replication/{job_id}/disabled",     repl_disable_toggle_handler),
    ("DELETE", "/api/clusters/{cluster_id}/replication/{job_id}",              repl_delete_handler),
]
