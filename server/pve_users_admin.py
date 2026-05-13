"""PVE user / group / ACL admin (admin only).

Wraps PVE's /access/users, /access/groups, /access/acl, /access/roles.
Distinct from jt-proxense's own user table managed by user_admin.py.

Routes:
  GET    /api/clusters/{cid}/pve-access/users               (admin)
  POST   /api/clusters/{cid}/pve-access/users               (admin)
  PUT    /api/clusters/{cid}/pve-access/users/{userid}      (admin)
  DELETE /api/clusters/{cid}/pve-access/users/{userid}      (admin)
  GET    /api/clusters/{cid}/pve-access/groups              (admin)
  POST   /api/clusters/{cid}/pve-access/groups              (admin)
  DELETE /api/clusters/{cid}/pve-access/groups/{groupid}    (admin)
  GET    /api/clusters/{cid}/pve-access/acl                 (admin)
  PUT    /api/clusters/{cid}/pve-access/acl                 (admin)
  GET    /api/clusters/{cid}/pve-access/roles               (admin)
"""
from __future__ import annotations

import logging
import re

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_USERID_RE = re.compile(r"^[A-Za-z0-9._\-]{1,64}@[a-z][a-z0-9\-]{0,32}$")
_GROUP_RE = re.compile(r"^[A-Za-z][A-Za-z0-9._\-]{0,63}$")
_PATH_RE = re.compile(r"^/[A-Za-z0-9._/\-]{0,256}$|^/$")
_ROLE_LIST_RE = re.compile(r"^[A-Za-z0-9._,\-]{1,256}$")
_NAME_LIST_RE = re.compile(r"^[A-Za-z0-9._@\-,]{1,512}$")
_COMMENT_RE = re.compile(r"^[\x20-\x7e]{0,256}$")


def _audit(request: web.Request):
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


# ---------- users -----------------------------------------------------

@role_required("admin")
async def users_list_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    rows = await cluster.client.list_users_full()
    return web.json_response({"users": rows or []})


@role_required("admin")
async def users_create_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    userid = (body.get("userid") or "").strip()
    if not _USERID_RE.match(userid):
        return web.json_response({"error": "bad_userid"}, status=400)
    fields: dict = {}
    for k in ("password", "comment", "email", "firstname", "lastname",
              "groups", "expire", "keys"):
        v = body.get(k)
        if v is None or v == "":
            continue
        # Light validation; PVE rejects malformed values.
        s = str(v)
        if k == "comment" and not _COMMENT_RE.match(s):
            return web.json_response({"error": "bad_comment"}, status=400)
        if k == "groups" and not _NAME_LIST_RE.match(s):
            return web.json_response({"error": "bad_groups"}, status=400)
        fields[k] = s
    if "enable" in body:
        fields["enable"] = 1 if bool(body["enable"]) else 0
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_pve_user(userid, **fields)
    except Exception as e:
        # NEVER include the password in the audit row.
        safe = {k: v for k, v in fields.items() if k != "password"}
        await audit.write(user=actor, source_ip=ip, action="pve.user.create",
                          target=f"{cid}/{userid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid, params=safe)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    safe = {k: v for k, v in fields.items() if k != "password"}
    await audit.write(user=actor, source_ip=ip, action="pve.user.create",
                      target=f"{cid}/{userid}", cluster_id=cid,
                      result="ok", request_id=rid, params=safe)
    return web.json_response({"ok": True})


@role_required("admin")
async def users_update_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    userid = request.match_info["userid"]
    if not _USERID_RE.match(userid):
        return web.json_response({"error": "bad_userid"}, status=400)
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    fields: dict = {}
    for k in ("comment", "email", "firstname", "lastname", "groups",
              "expire", "keys"):
        v = body.get(k)
        if v is None:
            continue
        fields[k] = str(v)
    if "enable" in body:
        fields["enable"] = 1 if bool(body["enable"]) else 0
    if "password" in body and body["password"]:
        fields["password"] = str(body["password"])
    if not fields:
        return web.json_response({"error": "no_changes"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.update_pve_user(userid, **fields)
    except Exception as e:
        safe = {k: v for k, v in fields.items() if k != "password"}
        await audit.write(user=actor, source_ip=ip, action="pve.user.update",
                          target=f"{cid}/{userid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid, params=safe)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    safe = {k: v for k, v in fields.items() if k != "password"}
    await audit.write(user=actor, source_ip=ip, action="pve.user.update",
                      target=f"{cid}/{userid}", cluster_id=cid,
                      result="ok", request_id=rid, params=safe)
    return web.json_response({"ok": True})


@role_required("admin")
async def users_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    userid = request.match_info["userid"]
    if not _USERID_RE.match(userid):
        return web.json_response({"error": "bad_userid"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_pve_user(userid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="pve.user.delete",
                          target=f"{cid}/{userid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="pve.user.delete",
                      target=f"{cid}/{userid}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


# ---------- groups ----------------------------------------------------

@role_required("admin")
async def groups_list_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    rows = await cluster.client.list_pve_groups()
    return web.json_response({"groups": rows or []})


@role_required("admin")
async def groups_create_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    groupid = (body.get("groupid") or "").strip()
    if not _GROUP_RE.match(groupid):
        return web.json_response({"error": "bad_groupid"}, status=400)
    comment = (body.get("comment") or "").strip()
    if not _COMMENT_RE.match(comment):
        return web.json_response({"error": "bad_comment"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.create_pve_group(groupid, comment=comment)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="pve.group.create",
                          target=f"{cid}/{groupid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="pve.group.create",
                      target=f"{cid}/{groupid}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


@role_required("admin")
async def groups_delete_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    groupid = request.match_info["groupid"]
    if not _GROUP_RE.match(groupid):
        return web.json_response({"error": "bad_groupid"}, status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.delete_pve_group(groupid)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="pve.group.delete",
                          target=f"{cid}/{groupid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="pve.group.delete",
                      target=f"{cid}/{groupid}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


# ---------- ACL -------------------------------------------------------

@role_required("admin")
async def acl_list_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    rows = await cluster.client.list_pve_acl()
    return web.json_response({"acl": rows or []})


@role_required("admin")
async def acl_set_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    path = (body.get("path") or "").strip()
    roles = (body.get("roles") or "").strip()
    users = (body.get("users") or "").strip() or None
    groups = (body.get("groups") or "").strip() or None
    tokens = (body.get("tokens") or "").strip() or None
    propagate = bool(body.get("propagate", True))
    delete = bool(body.get("delete", False))
    if not _PATH_RE.match(path):
        return web.json_response({"error": "bad_path"}, status=400)
    if not _ROLE_LIST_RE.match(roles):
        return web.json_response({"error": "bad_roles"}, status=400)
    for fld, val in (("users", users), ("groups", groups), ("tokens", tokens)):
        if val and not _NAME_LIST_RE.match(val):
            return web.json_response({"error": f"bad_{fld}"}, status=400)
    if not (users or groups or tokens):
        return web.json_response({"error": "missing_subject",
                                  "detail": "one of users / groups / tokens required"},
                                 status=400)
    actor, ip, rid = _audit(request)
    cid = request.match_info["cluster_id"]
    try:
        await cluster.client.update_pve_acl(
            path=path, roles=roles, users=users, groups=groups, tokens=tokens,
            propagate=propagate, delete=delete,
        )
    except Exception as e:
        await audit.write(user=actor, source_ip=ip,
                          action=f"pve.acl.{'remove' if delete else 'grant'}",
                          target=f"{cid}/{path}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"roles": roles, "users": users,
                                  "groups": groups, "tokens": tokens})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip,
                      action=f"pve.acl.{'remove' if delete else 'grant'}",
                      target=f"{cid}/{path}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"roles": roles, "users": users,
                              "groups": groups, "tokens": tokens})
    return web.json_response({"ok": True})


@role_required("admin")
async def roles_list_handler(request: web.Request) -> web.Response:
    cluster, err = _cluster_or_404(request)
    if err: return err
    rows = await cluster.client.list_pve_roles()
    return web.json_response({"roles": rows or []})


ROUTES = [
    ("GET",    r"/api/clusters/{cluster_id}/pve-access/users",              users_list_handler),
    ("POST",   r"/api/clusters/{cluster_id}/pve-access/users",              users_create_handler),
    ("PUT",    r"/api/clusters/{cluster_id}/pve-access/users/{userid}",     users_update_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/pve-access/users/{userid}",     users_delete_handler),
    ("GET",    r"/api/clusters/{cluster_id}/pve-access/groups",             groups_list_handler),
    ("POST",   r"/api/clusters/{cluster_id}/pve-access/groups",             groups_create_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/pve-access/groups/{groupid}",   groups_delete_handler),
    ("GET",    r"/api/clusters/{cluster_id}/pve-access/acl",                acl_list_handler),
    ("PUT",    r"/api/clusters/{cluster_id}/pve-access/acl",                acl_set_handler),
    ("GET",    r"/api/clusters/{cluster_id}/pve-access/roles",              roles_list_handler),
]
