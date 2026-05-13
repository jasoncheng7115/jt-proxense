"""Cluster storage CRUD (admin).

Routes:
  GET    /api/clusters/{cid}/storage-config              (admin) — list all
  GET    /api/clusters/{cid}/storage-config/{storage}    (admin) — one
  POST   /api/clusters/{cid}/storage-config              (admin) — create
  PUT    /api/clusters/{cid}/storage-config/{storage}    (admin) — update
  DELETE /api/clusters/{cid}/storage-config/{storage}    (admin) — remove

OWASP design:
  A01 — admin only.
  A03 — strict per-type allow-list of fields. Per-type validators with
        regex / range checks before the payload reaches PVE.
  A05 — body cap 16 KiB; field-count cap 32.
  A09 — every write writes one audit row (params hash includes type+id).
"""
from __future__ import annotations

import json
import logging
import re

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_MAX_BODY_BYTES = 16 * 1024
_MAX_FIELDS = 32

_ID_RE = re.compile(r"^[A-Za-z][A-Za-z0-9._\-]{0,31}$")
_PATH_RE = re.compile(r"^[A-Za-z0-9_./\-]{1,255}$")
_SERVER_RE = re.compile(r"^[A-Za-z0-9._\-]{1,253}$")
_EXPORT_RE = re.compile(r"^[A-Za-z0-9_./\-]{1,255}$")
_VG_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_\-]{0,63}$")
_POOL_RE = re.compile(r"^[A-Za-z][A-Za-z0-9._\-]{0,63}$")
_USERNAME_RE = re.compile(r"^[A-Za-z0-9._\-@]{1,128}$")
_FINGERPRINT_RE = re.compile(r"^[0-9a-fA-F:]{47,95}$")
_NODES_RE = re.compile(r"^[A-Za-z0-9._\-,]{0,256}$")
_CONTENT_RE = re.compile(r"^[a-z]+(?:,[a-z]+){0,10}$")  # e.g. "iso,vztmpl,backup"

# Allowed storage types we let users create/edit through this UI. Keep
# conservative — exotic backends (cephfs/glusterfs/iscsi/zfs over iscsi)
# need their own validation paths and are rare enough to defer.
_ALLOWED_TYPES = {
    "dir", "nfs", "cifs", "lvm", "lvmthin", "zfspool", "rbd", "pbs",
    "cephfs", "iscsi", "glusterfs", "zfs",
}

# Per-type editable field allow-lists. Each maps field name → validator
# fn returning (ok, sanitized_value) or None for "field not allowed".
def _str_re(pat: re.Pattern, max_len: int = 256):
    def f(v):
        if v is None: return None
        s = str(v)
        if len(s) > max_len or not pat.match(s):
            return None
        return s
    return f

def _bool01():
    def f(v):
        if v in (0, "0", False): return 0
        if v in (1, "1", True):  return 1
        return None
    return f

def _int_in(lo: int, hi: int):
    def f(v):
        try:
            n = int(v)
        except (TypeError, ValueError):
            return None
        if n < lo or n > hi:
            return None
        return n
    return f

# Common fields (every storage type accepts these).
_COMMON_FIELDS = {
    "content":  _str_re(_CONTENT_RE, 64),
    "nodes":    _str_re(_NODES_RE, 256),
    "shared":   _bool01(),
    "disable":  _bool01(),
    "preallocation": _str_re(re.compile(r"^(off|metadata|falloc|full)$"), 16),
    "format":   _str_re(re.compile(r"^(raw|qcow2|subvol|vmdk)$"), 16),
}

# Per-type extra fields.
_TYPE_FIELDS: dict[str, dict] = {
    "dir": {
        **_COMMON_FIELDS,
        "path": _str_re(_PATH_RE, 255),
        "mkdir": _bool01(),
        "is_mountpoint": _str_re(re.compile(r"^[A-Za-z0-9_./\-]{0,255}$"), 255),
    },
    "nfs": {
        **_COMMON_FIELDS,
        "server": _str_re(_SERVER_RE, 253),
        "export": _str_re(_EXPORT_RE, 255),
        "options": _str_re(re.compile(r"^[A-Za-z0-9=,_./\-]{0,255}$"), 255),
        "path": _str_re(_PATH_RE, 255),
    },
    "cifs": {
        **_COMMON_FIELDS,
        "server": _str_re(_SERVER_RE, 253),
        "share": _str_re(_EXPORT_RE, 255),
        "username": _str_re(_USERNAME_RE, 128),
        "password": _str_re(re.compile(r"^[\x20-\x7e]{0,128}$"), 128),
        "smbversion": _str_re(re.compile(r"^(default|2\.0|2\.1|3\.0|3\.11)$"), 8),
        "domain": _str_re(_SERVER_RE, 64),
        "path": _str_re(_PATH_RE, 255),
    },
    "lvm": {
        **_COMMON_FIELDS,
        "vgname": _str_re(_VG_RE, 64),
        "saferemove": _bool01(),
    },
    "lvmthin": {
        **_COMMON_FIELDS,
        "vgname": _str_re(_VG_RE, 64),
        "thinpool": _str_re(_VG_RE, 64),
    },
    "zfspool": {
        **_COMMON_FIELDS,
        "pool": _str_re(_POOL_RE, 64),
        "sparse": _bool01(),
        "blocksize": _str_re(re.compile(r"^[0-9]+[kKmMgG]?$"), 16),
    },
    "rbd": {
        **_COMMON_FIELDS,
        "monhost": _str_re(re.compile(r"^[A-Za-z0-9._\-:,;\s]{1,512}$"), 512),
        "pool": _str_re(_POOL_RE, 64),
        "username": _str_re(_USERNAME_RE, 128),
        "krbd": _bool01(),
    },
    "pbs": {
        **_COMMON_FIELDS,
        "server": _str_re(_SERVER_RE, 253),
        "datastore": _str_re(_POOL_RE, 64),
        "username": _str_re(_USERNAME_RE, 128),
        "password": _str_re(re.compile(r"^[\x20-\x7e]{0,128}$"), 128),
        "fingerprint": _str_re(_FINGERPRINT_RE, 95),
        "namespace": _str_re(re.compile(r"^[A-Za-z0-9_./\-]{0,128}$"), 128),
    },
    "cephfs": {
        **_COMMON_FIELDS,
        "monhost": _str_re(re.compile(r"^[A-Za-z0-9._\-:,;\s]{1,512}$"), 512),
        "username": _str_re(_USERNAME_RE, 128),
        "subdir": _str_re(_PATH_RE, 255),
        "fs_name": _str_re(_POOL_RE, 64),
        "fuse": _bool01(),
    },
    "iscsi": {
        **_COMMON_FIELDS,
        "portal": _str_re(re.compile(r"^[A-Za-z0-9._\-:,;\s]{1,256}$"), 256),
        "target": _str_re(re.compile(r"^[A-Za-z0-9._\-:]{1,128}$"), 128),
    },
    "glusterfs": {
        **_COMMON_FIELDS,
        "server": _str_re(_SERVER_RE, 253),
        "server2": _str_re(_SERVER_RE, 253),
        "volume": _str_re(_POOL_RE, 64),
    },
    "zfs": {
        # PVE "zfs over iscsi" — distinct from zfspool (local).
        **_COMMON_FIELDS,
        "portal": _str_re(re.compile(r"^[A-Za-z0-9._\-:]{1,128}$"), 128),
        "target": _str_re(re.compile(r"^[A-Za-z0-9._\-:]{1,128}$"), 128),
        "pool": _str_re(_POOL_RE, 64),
        "iscsiprovider": _str_re(re.compile(r"^(comstar|istgt|iet|LIO)$"), 16),
    },
}


def _audit(request: web.Request):
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


async def _read_body(request: web.Request) -> dict:
    if request.content_length is not None and request.content_length > _MAX_BODY_BYTES:
        raise web.HTTPRequestEntityTooLarge(
            max_size=_MAX_BODY_BYTES, actual_size=request.content_length,
        )
    raw = await request.content.read(_MAX_BODY_BYTES + 1)
    if len(raw) > _MAX_BODY_BYTES:
        raise web.HTTPRequestEntityTooLarge(
            max_size=_MAX_BODY_BYTES, actual_size=len(raw),
        )
    try:
        body = json.loads(raw or b"{}")
    except Exception:
        raise web.HTTPBadRequest(reason="bad_json")
    if not isinstance(body, dict):
        raise web.HTTPBadRequest(reason="bad_body")
    return body


def _validate(stype: str, body: dict) -> tuple[dict | None, str | None]:
    """Validate a create/update payload. Returns (clean_dict, err)."""
    if stype not in _TYPE_FIELDS:
        return None, f"unsupported_type:{stype}"
    rules = _TYPE_FIELDS[stype]
    if len(body) > _MAX_FIELDS:
        return None, "too_many_fields"
    out: dict = {}
    rejected: list[str] = []
    for k, v in body.items():
        if k in ("storage", "type"):
            continue  # handled by caller
        if k not in rules:
            rejected.append(k)
            continue
        sanitized = rules[k](v)
        if sanitized is None:
            rejected.append(k)
        else:
            out[k] = sanitized
    if rejected:
        return None, f"rejected:{','.join(rejected)}"
    return out, None


# ---------- handlers --------------------------------------------------

@role_required("admin")
async def list_storage_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        rows = await cluster.client.get_storage_config()
    except Exception as e:
        return web.json_response({"error": "fetch_failed", "detail": str(e)}, status=502)
    return web.json_response({"storages": rows or []})


@role_required("admin")
async def get_storage_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    storage = request.match_info["storage"]
    if not _ID_RE.match(storage):
        return web.json_response({"error": "bad_id"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        cfg = await cluster.client.get_storage_config_one(storage)
    except Exception as e:
        return web.json_response({"error": "fetch_failed", "detail": str(e)}, status=502)
    return web.json_response({"storage": cfg or {}})


@role_required("admin")
async def create_storage_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await _read_body(request)
    except web.HTTPException as e:
        return web.json_response({"error": e.reason or "bad_request"}, status=e.status)

    sid = (body.get("storage") or "").strip()
    stype = (body.get("type") or "").strip().lower()
    if not _ID_RE.match(sid):
        return web.json_response({"error": "bad_id"}, status=400)
    if stype not in _ALLOWED_TYPES:
        return web.json_response({"error": "unsupported_type",
                                  "allowed": sorted(_ALLOWED_TYPES)}, status=400)

    fields, err = _validate(stype, body)
    if err:
        return web.json_response({"error": "validation", "detail": err}, status=400)

    actor, ip, rid = _audit(request)
    try:
        await cluster.client.create_storage(storage=sid, type=stype, **fields)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="storage.create",
                          target=f"{cid}/{sid}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"type": stype, "keys": sorted(fields.keys())})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="storage.create",
                      target=f"{cid}/{sid}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"type": stype, "keys": sorted(fields.keys())})
    return web.json_response({"ok": True, "storage": sid})


@role_required("admin")
async def update_storage_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    storage = request.match_info["storage"]
    if not _ID_RE.match(storage):
        return web.json_response({"error": "bad_id"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await _read_body(request)
    except web.HTTPException as e:
        return web.json_response({"error": e.reason or "bad_request"}, status=e.status)

    # Determine the type of the existing storage so we know which allow-list
    # to apply. Avoids letting an admin smuggle wrong-type fields through.
    try:
        existing = await cluster.client.get_storage_config_one(storage)
    except Exception as e:
        return web.json_response({"error": "fetch_failed", "detail": str(e)}, status=502)
    stype = (existing or {}).get("type", "").lower()
    if stype not in _ALLOWED_TYPES:
        return web.json_response({"error": "unsupported_type", "type": stype}, status=400)
    fields, err = _validate(stype, body)
    if err:
        return web.json_response({"error": "validation", "detail": err}, status=400)
    if not fields:
        return web.json_response({"error": "no_changes"}, status=400)

    actor, ip, rid = _audit(request)
    try:
        await cluster.client.update_storage(storage, **fields)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="storage.update",
                          target=f"{cid}/{storage}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid,
                          params={"keys": sorted(fields.keys())})
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="storage.update",
                      target=f"{cid}/{storage}", cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"keys": sorted(fields.keys())})
    return web.json_response({"ok": True})


@role_required("admin")
async def delete_storage_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    storage = request.match_info["storage"]
    if not _ID_RE.match(storage):
        return web.json_response({"error": "bad_id"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actor, ip, rid = _audit(request)
    try:
        await cluster.client.delete_storage(storage)
    except Exception as e:
        await audit.write(user=actor, source_ip=ip, action="storage.delete",
                          target=f"{cid}/{storage}", cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)
    await audit.write(user=actor, source_ip=ip, action="storage.delete",
                      target=f"{cid}/{storage}", cluster_id=cid,
                      result="ok", request_id=rid)
    return web.json_response({"ok": True})


ROUTES = [
    ("GET",    r"/api/clusters/{cluster_id}/storage-config",                list_storage_handler),
    ("GET",    r"/api/clusters/{cluster_id}/storage-config/{storage}",      get_storage_handler),
    ("POST",   r"/api/clusters/{cluster_id}/storage-config",                create_storage_handler),
    ("PUT",    r"/api/clusters/{cluster_id}/storage-config/{storage}",      update_storage_handler),
    ("DELETE", r"/api/clusters/{cluster_id}/storage-config/{storage}",      delete_storage_handler),
]
