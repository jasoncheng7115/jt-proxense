"""Cluster firewall admin: ipsets, aliases, security groups.

Cluster-level firewall ruleset CRUD lives in pdm_cluster.py; this module
covers the supporting objects that rules can reference by name:

  - ipsets: named bags of CIDRs/IPs (`+myset` in source/dest)
  - aliases: name → single CIDR/IP shortcut
  - groups: named rule packs that can be attached at cluster/VM scope

Backend pve_client methods exist; handlers here gate by role and validate
inputs with strict regex allow-lists (OWASP A03).

Routes:
  GET    /api/clusters/{cid}/firewall/ipsets                          (operator)
  POST   /api/clusters/{cid}/firewall/ipsets                          (admin)
  DELETE /api/clusters/{cid}/firewall/ipsets/{name}                   (admin)
  GET    /api/clusters/{cid}/firewall/ipsets/{name}                   (operator)
  POST   /api/clusters/{cid}/firewall/ipsets/{name}                   (admin)  — add member
  DELETE /api/clusters/{cid}/firewall/ipsets/{name}/members/{cidr:.+} (admin)  — del member
  GET    /api/clusters/{cid}/firewall/aliases                         (operator)
  POST   /api/clusters/{cid}/firewall/aliases                         (admin)
  DELETE /api/clusters/{cid}/firewall/aliases/{name}                  (admin)
  GET    /api/clusters/{cid}/firewall/groups                          (operator)
  POST   /api/clusters/{cid}/firewall/groups                          (admin)
  DELETE /api/clusters/{cid}/firewall/groups/{group}                  (admin)
"""
from __future__ import annotations

import logging
import re

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_NAME_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_\-]{0,63}$")
_CIDR_RE = re.compile(r"^[+A-Za-z0-9._:/\-]{1,128}$")
_COMMENT_RE = re.compile(r"^[\x20-\x7e]{0,256}$")


def _audit(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def _cluster_or_404(request: web.Request):
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return None, web.json_response({"error": "cluster_not_found"}, status=404)
    return cluster, None


# ============================================================ ipsets

@role_required("operator")
async def list_ipsets_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    rows = await cluster.client.list_fw_ipsets()
    return web.json_response({"ipsets": rows or []})


@role_required("admin")
async def create_ipset_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    name = (body.get("name") or "").strip()
    comment = (body.get("comment") or "").strip()
    if not _NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    if not _COMMENT_RE.match(comment):
        return web.json_response({"error": "bad_comment"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_fw_ipset(name, comment=comment)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.ipset.create",
                          target=f"{cid}/{name}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.ipset.create",
                      target=f"{cid}/{name}", cluster_id=cid, result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def delete_ipset_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    name = request.match_info["name"]
    if not _NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_fw_ipset(name)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.ipset.delete",
                          target=f"{cid}/{name}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.ipset.delete",
                      target=f"{cid}/{name}", cluster_id=cid, result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("operator")
async def list_ipset_members_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    name = request.match_info["name"]
    if not _NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    rows = await cluster.client.list_fw_ipset_members(name)
    return web.json_response({"members": rows or []})


@role_required("admin")
async def add_ipset_member_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    name = request.match_info["name"]
    if not _NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    cidr = (body.get("cidr") or "").strip()
    comment = (body.get("comment") or "").strip()
    nomatch = bool(body.get("nomatch", False))
    if not _CIDR_RE.match(cidr):
        return web.json_response({"error": "bad_cidr"}, status=400)
    if not _COMMENT_RE.match(comment):
        return web.json_response({"error": "bad_comment"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.add_fw_ipset_member(name, cidr, nomatch=nomatch, comment=comment)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.ipset.add_member",
                          target=f"{cid}/{name}/{cidr}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.ipset.add_member",
                      target=f"{cid}/{name}/{cidr}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def delete_ipset_member_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    name = request.match_info["name"]
    cidr = request.match_info["cidr"]
    if not _NAME_RE.match(name) or not _CIDR_RE.match(cidr):
        return web.json_response({"error": "bad_input"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_fw_ipset_member(name, cidr)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.ipset.delete_member",
                          target=f"{cid}/{name}/{cidr}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.ipset.delete_member",
                      target=f"{cid}/{name}/{cidr}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


# ============================================================ aliases

@role_required("operator")
async def list_aliases_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    rows = await cluster.client.list_fw_aliases()
    return web.json_response({"aliases": rows or []})


@role_required("admin")
async def create_alias_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    name = (body.get("name") or "").strip()
    cidr = (body.get("cidr") or "").strip()
    comment = (body.get("comment") or "").strip()
    if not _NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    if not _CIDR_RE.match(cidr):
        return web.json_response({"error": "bad_cidr"}, status=400)
    if not _COMMENT_RE.match(comment):
        return web.json_response({"error": "bad_comment"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_fw_alias(name, cidr, comment=comment)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.alias.create",
                          target=f"{cid}/{name}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"cidr": cidr})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.alias.create",
                      target=f"{cid}/{name}", cluster_id=cid,
                      result="ok", request_id=rid, params={"cidr": cidr})
    return web.json_response({"ok": True})


@role_required("admin")
async def delete_alias_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    name = request.match_info["name"]
    if not _NAME_RE.match(name):
        return web.json_response({"error": "bad_name"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_fw_alias(name)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.alias.delete",
                          target=f"{cid}/{name}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.alias.delete",
                      target=f"{cid}/{name}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


# ============================================================ groups

@role_required("operator")
async def list_groups_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    rows = await cluster.client.list_fw_groups()
    return web.json_response({"groups": rows or []})


@role_required("admin")
async def create_group_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    group = (body.get("group") or "").strip()
    comment = (body.get("comment") or "").strip()
    if not _NAME_RE.match(group):
        return web.json_response({"error": "bad_group"}, status=400)
    if not _COMMENT_RE.match(comment):
        return web.json_response({"error": "bad_comment"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_fw_group(group, comment=comment)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.group.create",
                          target=f"{cid}/{group}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.group.create",
                      target=f"{cid}/{group}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def delete_group_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    group = request.match_info["group"]
    if not _NAME_RE.match(group):
        return web.json_response({"error": "bad_group"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_fw_group(group)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="firewall.group.delete",
                          target=f"{cid}/{group}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="firewall.group.delete",
                      target=f"{cid}/{group}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


ROUTES = [
    ("GET",    r"/api/clusters/{cluster_id}/firewall/ipsets",                          list_ipsets_handler),
    ("POST",   r"/api/clusters/{cluster_id}/firewall/ipsets",                          create_ipset_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/firewall/ipsets/{name}",                   delete_ipset_handler),
    ("GET",    r"/api/clusters/{cluster_id}/firewall/ipsets/{name}",                   list_ipset_members_handler),
    ("POST",   r"/api/clusters/{cluster_id}/firewall/ipsets/{name}",                   add_ipset_member_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/firewall/ipsets/{name}/members/{cidr}",    delete_ipset_member_handler),
    ("GET",    r"/api/clusters/{cluster_id}/firewall/aliases",                         list_aliases_handler),
    ("POST",   r"/api/clusters/{cluster_id}/firewall/aliases",                         create_alias_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/firewall/aliases/{name}",                  delete_alias_handler),
    ("GET",    r"/api/clusters/{cluster_id}/firewall/groups",                          list_groups_handler),
    ("POST",   r"/api/clusters/{cluster_id}/firewall/groups",                          create_group_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/firewall/groups/{group}",                  delete_group_handler),
]
