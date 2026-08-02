"""Node network admin (admin only).

Routes:
  GET    /api/clusters/{cid}/nodes/{node}/network              — list ifaces
  POST   /api/clusters/{cid}/nodes/{node}/network              — create
  PUT    /api/clusters/{cid}/nodes/{node}/network/{iface}      — update
  DELETE /api/clusters/{cid}/nodes/{node}/network/{iface}      — delete
  PUT    /api/clusters/{cid}/nodes/{node}/network              — apply pending
  DELETE /api/clusters/{cid}/nodes/{node}/network              — revert pending

Only the most common type — Linux bridge — is supported through the UI
(create with bridge_ports, autostart, comments). Bonds / VLANs / OVS need
their own per-type fields and are deferred.

OWASP design:
  A01 — admin only.
  A03 — iface name, ports, address, etc. all validated against narrow
        regex allow-lists. Type fixed to {bridge, bond, vlan} on create.
  A09 — every write audits the iface name and key field set.
"""
from __future__ import annotations

import logging
import re

from aiohttp import web

from . import audit
from . import task_outcome
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_IFACE_RE = re.compile(r"^[A-Za-z][A-Za-z0-9._\-]{0,15}$")
_BRIDGE_RE = re.compile(r"^vmbr[0-9]{1,3}$")
_PORTS_RE = re.compile(r"^[A-Za-z0-9._\-,\s]{0,256}$")
_CIDR_RE = re.compile(r"^[0-9.]{7,18}/[0-9]{1,2}$")
_IP_RE = re.compile(r"^[0-9.]{7,18}$")
_COMMENT_RE = re.compile(r"^[\x20-\x7e]{0,256}$")
_TYPE_ALLOW = {"bridge", "bond", "vlan", "alias", "OVSBridge", "OVSPort"}


def _audit(request: web.Request):
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


@role_required("admin")
async def network_list_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        rows = await cluster.client.get_node_network(node)
    except Exception as e:
        return web.json_response({"error": "fetch_failed", "detail": str(e)}, status=502)
    return web.json_response({"interfaces": rows or []})


@role_required("admin")
async def network_create_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    iface = (body.get("iface") or "").strip()
    itype = (body.get("type") or "").strip()
    if itype not in _TYPE_ALLOW:
        return web.json_response({"error": "bad_type",
                                  "allowed": sorted(_TYPE_ALLOW)}, status=400)
    if itype == "bridge":
        if not _BRIDGE_RE.match(iface):
            return web.json_response(
                {"error": "bad_iface_for_bridge", "expected": "vmbr<N>"},
                status=400,
            )
    elif not _IFACE_RE.match(iface):
        return web.json_response({"error": "bad_iface"}, status=400)
    fields: dict = {"type": itype}
    # Optional fields with strict validation.
    if body.get("bridge_ports"):
        bp = str(body["bridge_ports"])
        if not _PORTS_RE.match(bp):
            return web.json_response({"error": "bad_bridge_ports"}, status=400)
        fields["bridge_ports"] = bp
    if body.get("address"):
        ad = str(body["address"])
        if not (_CIDR_RE.match(ad) or _IP_RE.match(ad)):
            return web.json_response({"error": "bad_address"}, status=400)
        fields["address"] = ad
    if body.get("netmask"):
        nm = str(body["netmask"])
        if not _IP_RE.match(nm):
            return web.json_response({"error": "bad_netmask"}, status=400)
        fields["netmask"] = nm
    if body.get("gateway"):
        gw = str(body["gateway"])
        if not _IP_RE.match(gw):
            return web.json_response({"error": "bad_gateway"}, status=400)
        fields["gateway"] = gw
    if body.get("autostart") is not None:
        fields["autostart"] = 1 if bool(body["autostart"]) else 0
    if body.get("vlan_aware") is not None:
        fields["bridge_vlan_aware"] = 1 if bool(body["vlan_aware"]) else 0
    if body.get("mtu"):
        try:
            mtu = int(body["mtu"])
            if mtu < 576 or mtu > 65535:
                raise ValueError
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_mtu"}, status=400)
        fields["mtu"] = mtu
    if body.get("comments"):
        cm = str(body["comments"])
        if not _COMMENT_RE.match(cm):
            return web.json_response({"error": "bad_comments"}, status=400)
        fields["comments"] = cm

    actor, ip, rid = _audit(request)
    try:
        await cluster.client.create_node_network(node, iface, **fields)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="network.create",
                          target=f"{cid}/{node}/{iface}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"type": itype, "fields": list(fields.keys())})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="network.create",
                      target=f"{cid}/{node}/{iface}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"type": itype, "fields": list(fields.keys())})
    return web.json_response({"ok": True, "pending": True})


@role_required("admin")
async def network_delete_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    iface = request.match_info["iface"]
    if not _IFACE_RE.match(iface):
        return web.json_response({"error": "bad_iface"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.delete_node_network(node, iface)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="network.delete",
                          target=f"{cid}/{node}/{iface}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="network.delete",
                      target=f"{cid}/{node}/{iface}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True, "pending": True})


@role_required("admin")
async def network_apply_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.apply_node_network(node)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="network.apply",
                          target=f"{cid}/{node}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await task_outcome.submitted(
        cluster, node, upid,
        action="network.apply", user=actor, source_ip=ip,
        request_id=rid, cluster_id=cid,
        target=f"{cid}/{node}")
    return web.json_response({"ok": True, "upid": upid})


@role_required("admin")
async def network_revert_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.revert_node_network(node)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="network.revert",
                          target=f"{cid}/{node}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="network.revert",
                      target=f"{cid}/{node}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


ROUTES = [
    ("GET",    r"/api/clusters/{cluster_id}/nodes/{node}/network",          network_list_handler),
    ("POST",   r"/api/clusters/{cluster_id}/nodes/{node}/network",          network_create_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/nodes/{node}/network/{iface}",  network_delete_handler),
    ("PUT",    r"/api/clusters/{cluster_id}/nodes/{node}/network",          network_apply_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/nodes/{node}/network",          network_revert_handler),
]
