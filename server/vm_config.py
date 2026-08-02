"""VM / CT hardware config — read AND edit (v0.4).

Read endpoints (viewer+):
  GET /api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/config
  GET /api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/config

Edit endpoints (operator+):
  PUT /api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/config
  PUT /api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/config
  PUT /api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/resize
  PUT /api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/resize

Drive add / remove is intentionally NOT in this module — that's an admin
operation handled separately when we ship the VM/CT creation wizard.

OWASP design:
  A01 — viewer for read, operator for write. Server-side @role_required.
  A03 — every accepted field passes through one of:
        - regex ALLOW pattern (named fields)
        - integer bounds check
        - per-slot validator (netN / scsiN / virtioN syntax)
        Anything not in the allow-list is rejected (reject-by-default).
  A04 — disk resize uses only `+<N>G` form; we never accept absolute sizes
        because PVE silently shrinks if a smaller absolute is given (data
        loss). The frontend offers a delta widget; the server enforces.
  A09 — each PUT writes one audit row per accepted change with the
        params hash; PVE response (UPID or {}) is captured.
  A05 — request body size capped at 16 KiB; field-count capped at 32.
"""
from __future__ import annotations

import logging
import re
import time
from typing import Any, Callable

from aiohttp import web

from . import audit
from . import create_guard
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_CACHE_TTL_S = 15.0
_cache: dict[tuple, tuple[float, dict]] = {}

_MAX_BODY_BYTES = 16 * 1024
_MAX_FIELDS_PER_REQUEST = 32


def _audit(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


# ---------- validators -------------------------------------------------

_NAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,127}$")
_HOSTNAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9.\-]{0,127}$")
_OSTYPE_RE = re.compile(r"^[a-z0-9]{2,16}$")
_BOOT_RE = re.compile(r"^[a-z0-9=;,]{0,256}$")  # e.g. order=scsi0;net0;ide2
# netN is comma-separated key=value (model=, bridge=, firewall=, tag=, mtu=, mac=, etc.)
# We don't try to validate every key — just reject anything beyond the
# safe charset PVE itself uses for these strings.
_PVE_KV_RE = re.compile(r"^[A-Za-z0-9_:./=,;\-\+\@\s]{1,512}$")
# tags: PVE's pve-tag charset is [A-Za-z0-9_-] separated by ;,space
_TAGS_RE = re.compile(r"^[A-Za-z0-9_;,\s\-]{0,512}$")
_DISK_SLOT_RE = re.compile(r"^(scsi|virtio|ide|sata)[0-9]{1,2}$")
_LXC_DISK_SLOT_RE = re.compile(r"^(rootfs|mp[0-9]{1,2})$")
_NET_SLOT_RE = re.compile(r"^net[0-9]{1,2}$")
_DELTA_GB_RE = re.compile(r"^\+[0-9]{1,4}G$")  # only-grow, max +9999G per call
_HOSTPCI_SLOT_RE = re.compile(r"^hostpci[0-9]{1,2}$")
_USB_SLOT_RE = re.compile(r"^usb[0-9]{1,2}$")
_SERIAL_SLOT_RE = re.compile(r"^serial[0-9]$")
_IPCONFIG_SLOT_RE = re.compile(r"^ipconfig[0-9]{1,2}$")


def _is_int_in(lo: int, hi: int) -> Callable[[Any], int | None]:
    def f(v: Any) -> int | None:
        try:
            n = int(v)
        except (TypeError, ValueError):
            return None
        if n < lo or n > hi:
            return None
        return n
    return f


def _is_bool01() -> Callable[[Any], int | None]:
    def f(v: Any) -> int | None:
        if v in (0, "0", False): return 0
        if v in (1, "1", True):  return 1
        return None
    return f


def _is_string_re(pat: re.Pattern, max_len: int = 256) -> Callable[[Any], str | None]:
    def f(v: Any) -> str | None:
        if v is None: return ""
        s = str(v)
        if len(s) > max_len: return None
        if s == "": return ""
        if not pat.match(s): return None
        return s
    return f


def _is_free_text(max_len: int) -> Callable[[Any], str | None]:
    def f(v: Any) -> str | None:
        if v is None: return ""
        s = str(v)
        if len(s) > max_len: return None
        # Reject control chars except tab/newline (description allows newlines).
        for ch in s:
            if ord(ch) < 0x20 and ch not in ("\t", "\n", "\r"):
                return None
        return s
    return f


# Cloud-init fields. PVE accepts these on QEMU VMs that have a cloud-init
# drive (e.g. `ide2: <storage>:cloudinit`). Validation:
#   - ipconfigN: comma-separated kv (`ip=`, `gw=`, `ip6=`, `gw6=`, ...) — uses
#     the same conservative PVE-style charset as netN.
#   - ciuser: standard unix username charset.
#   - cipassword: PVE accepts up to 1024 chars; we cap at 128. NOT echoed.
#   - sshkeys: PVE expects a URL-encoded blob; we accept up to 8 KiB raw and
#     pass through. (PVE itself URL-encodes when received from web UI.)
#   - cicustom: snippet path string; PVE charset is similar to volid.
_CIUSER_RE = re.compile(r"^[a-z_][a-z0-9_\-]{0,32}$")

VM_EDITABLE: dict[str, Callable] = {
    "name":        _is_string_re(_NAME_RE, 128),
    "description": _is_free_text(8192),
    "cores":       _is_int_in(1, 1024),
    "sockets":     _is_int_in(1, 16),
    "memory":      _is_int_in(16, 1_048_576),     # MiB
    "balloon":     _is_int_in(0, 1_048_576),
    "agent":       _is_bool01(),
    "onboot":      _is_bool01(),
    "protection":  _is_bool01(),
    "tablet":      _is_bool01(),
    "ostype":      _is_string_re(_OSTYPE_RE, 16),
    # cpu format: "host" or "<model>[,flags=...]" — keep it conservative.
    "cpu":         _is_string_re(re.compile(r"^[A-Za-z0-9._\-,=+@]{1,128}$"), 128),
    "boot":        _is_string_re(_BOOT_RE, 256),
    "tags":        _is_string_re(_TAGS_RE, 512),
    # cloud-init scalar fields
    "ciuser":      _is_string_re(_CIUSER_RE, 33),
    "cipassword":  _is_free_text(128),
    "searchdomain": _is_string_re(_PVE_KV_RE, 256),
    "nameserver":  _is_string_re(_PVE_KV_RE, 256),
    "sshkeys":     _is_free_text(8192),
    "cicustom":    _is_string_re(_PVE_KV_RE, 256),
}

LXC_EDITABLE: dict[str, Callable] = {
    "hostname":    _is_string_re(_HOSTNAME_RE, 128),
    "description": _is_free_text(8192),
    "cores":       _is_int_in(1, 1024),
    "cpulimit":    _is_int_in(0, 1024),
    "memory":      _is_int_in(16, 1_048_576),
    "swap":        _is_int_in(0, 1_048_576),
    "onboot":      _is_bool01(),
    "protection":  _is_bool01(),
    "tags":        _is_string_re(_TAGS_RE, 512),
    "nameserver":  _is_string_re(_PVE_KV_RE, 256),
    "searchdomain": _is_string_re(_PVE_KV_RE, 256),
}


def _validate_dynamic_slot(key: str, value: Any, kind: str) -> tuple[bool, Any]:
    """Validate slot-style fields like netN, scsiN, virtioN, hostpciN, usbN.
    Returns (accepted, sanitized_value)."""
    if _NET_SLOT_RE.match(key):
        if value is None or value == "":
            # explicit removal
            return True, ""
        s = str(value)
        if len(s) > 512 or not _PVE_KV_RE.match(s):
            return False, None
        return True, s
    if kind == "qemu" and _DISK_SLOT_RE.match(key):
        # Editing a disk's *opts* (cache, ssd, etc.) — we accept the same
        # PVE-style kv string. ACTUAL disk grow goes through /resize.
        if value is None or value == "":
            return False, None  # don't allow removal here
        s = str(value)
        if len(s) > 512 or not _PVE_KV_RE.match(s):
            return False, None
        return True, s
    if kind == "lxc" and _LXC_DISK_SLOT_RE.match(key):
        if value is None or value == "":
            return False, None
        s = str(value)
        if len(s) > 512 or not _PVE_KV_RE.match(s):
            return False, None
        return True, s
    # PCI/USB/serial passthrough — qemu only. Empty value removes the slot.
    if kind == "qemu" and (_HOSTPCI_SLOT_RE.match(key) or _USB_SLOT_RE.match(key) or _SERIAL_SLOT_RE.match(key)):
        if value is None or value == "":
            return True, ""  # explicit removal
        s = str(value)
        if len(s) > 256 or not _PVE_KV_RE.match(s):
            return False, None
        return True, s
    # Cloud-init ipconfigN — qemu only.
    if kind == "qemu" and _IPCONFIG_SLOT_RE.match(key):
        if value is None or value == "":
            return True, ""
        s = str(value)
        if len(s) > 256 or not _PVE_KV_RE.match(s):
            return False, None
        return True, s
    return False, None


async def _read_json_capped(request: web.Request) -> dict:
    """Read JSON body but enforce a 16 KiB cap (DoS guard, A05)."""
    if request.content_length is not None and request.content_length > _MAX_BODY_BYTES:
        raise web.HTTPRequestEntityTooLarge(
            max_size=_MAX_BODY_BYTES, actual_size=request.content_length,
        )
    raw = await request.content.read(_MAX_BODY_BYTES + 1)
    if len(raw) > _MAX_BODY_BYTES:
        raise web.HTTPRequestEntityTooLarge(
            max_size=_MAX_BODY_BYTES, actual_size=len(raw),
        )
    import json as _json
    try:
        body = _json.loads(raw or b"{}")
    except Exception:
        raise web.HTTPBadRequest(reason="bad_json")
    if not isinstance(body, dict):
        raise web.HTTPBadRequest(reason="bad_body")
    return body


def _validate_delete_list(raw: Any, kind: str) -> tuple[bool, str]:
    """The PVE config PUT endpoint accepts `delete=key1,key2,...` to
    unset config keys. Validate that every requested key is either a
    scalar allow-listed field or a recognized slot (netN, scsiN, etc.).
    Bare scalar keys are accepted only when explicitly in the editable
    allow-list — we never let the operator unset things like `name`."""
    if raw is None or raw == "":
        return False, ""
    if isinstance(raw, list):
        keys = [str(x).strip() for x in raw if str(x).strip()]
    else:
        keys = [k.strip() for k in str(raw).split(",") if k.strip()]
    if not keys:
        return False, ""
    table = VM_EDITABLE if kind == "qemu" else LXC_EDITABLE
    cleaned: list[str] = []
    for k in keys:
        # Re-use the slot regexes to validate "deletable" slot names.
        if _NET_SLOT_RE.match(k):
            cleaned.append(k); continue
        if kind == "qemu" and _DISK_SLOT_RE.match(k):
            cleaned.append(k); continue
        if kind == "qemu" and _HOSTPCI_SLOT_RE.match(k):
            cleaned.append(k); continue
        if kind == "qemu" and _USB_SLOT_RE.match(k):
            cleaned.append(k); continue
        if kind == "lxc" and _LXC_DISK_SLOT_RE.match(k):
            cleaned.append(k); continue
        # Allow unsetting selected scalar fields too (e.g. tags, description).
        if k in {"tags", "description", "ciuser", "cipassword",
                  "searchdomain", "nameserver", "sshkeys", "balloon",
                  "cpu", "boot", "agent", "onboot", "protection"} and k in table:
            cleaned.append(k); continue
        return False, ""   # any unknown key kills the whole delete request
    return True, ",".join(cleaned)


def _validate_changes(changes: dict, kind: str) -> tuple[dict, list[str]]:
    """Returns (accepted_fields, rejected_field_names).
    Reject-by-default — anything not in the editable allow-list AND not a
    recognized slot field is dropped."""
    accepted: dict[str, Any] = {}
    rejected: list[str] = []
    table = VM_EDITABLE if kind == "qemu" else LXC_EDITABLE
    for k, v in changes.items():
        if k == "delete":
            ok, cleaned = _validate_delete_list(v, kind)
            if ok:
                accepted["delete"] = cleaned
            else:
                rejected.append("delete")
            continue
        if k in table:
            ok = table[k](v)
            if ok is None:
                rejected.append(k)
            else:
                accepted[k] = ok
            continue
        ok2, val2 = _validate_dynamic_slot(k, v, kind)
        if ok2:
            accepted[k] = val2
        else:
            rejected.append(k)
    return accepted, rejected


# ---------- handlers ---------------------------------------------------

async def _fetch(key: tuple, fetcher) -> dict:
    now = time.monotonic()
    hit = _cache.get(key)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return hit[1]
    try:
        data = await fetcher()
        if not isinstance(data, dict):
            data = {}
    except Exception as e:
        logger.warning("vm_config %s failed: %s", key, e)
        return {"_error": str(e)}
    _cache[key] = (now, data)
    return data


def _invalidate(cid: str, node: str, kind: str, vmid: int) -> None:
    _cache.pop((kind, cid, node, vmid), None)


@role_required("viewer")
async def qemu_config_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("qemu", cid, node, vmid),
        lambda: cluster.client.get_vm_config(node, vmid),
    )
    return web.json_response({"kind": "qemu", "config": data})


@role_required("viewer")
async def lxc_config_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    data = await _fetch(
        ("lxc", cid, node, vmid),
        lambda: cluster.client.get_lxc_config(node, vmid),
    )
    return web.json_response({"kind": "lxc", "config": data})


async def _do_update(request: web.Request, kind: str) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
        if vmid < 100 or vmid > 999_999_999:
            raise ValueError
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    try:
        body = await _read_json_capped(request)
    except web.HTTPException as e:
        return web.json_response({"error": e.reason or "bad_request"}, status=e.status)

    changes = body.get("changes")
    if not isinstance(changes, dict) or not changes:
        return web.json_response({"error": "no_changes"}, status=400)
    if len(changes) > _MAX_FIELDS_PER_REQUEST:
        return web.json_response({"error": "too_many_fields"}, status=400)

    accepted, rejected = _validate_changes(changes, kind)
    if rejected:
        return web.json_response(
            {"error": "rejected_fields", "fields": rejected,
             "detail": "field name not in allow-list or value failed validation"},
            status=400,
        )
    if not accepted:
        return web.json_response({"error": "no_valid_changes"}, status=400)

    actor, ip, rid = _audit(request)
    fn = (cluster.client.vm_update_config
          if kind == "qemu" else cluster.client.ct_update_config)
    try:
        resp = await fn(node, vmid, **accepted)
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action=f"pve.{kind}.config_update",
            target=f"{node}/{vmid}", result=audit.result_error(e),
            request_id=rid, cluster_id=cid,
            params={"keys": sorted(accepted.keys())},
        )
        return web.json_response(
            {"error": "update_failed", "detail": str(e)}, status=400,
        )

    await audit.write(
        user=actor, source_ip=ip, action=f"pve.{kind}.config_update",
        target=f"{node}/{vmid}", result="ok", request_id=rid, cluster_id=cid,
        params={"keys": sorted(accepted.keys())},
    )
    _invalidate(cid, node, kind, vmid)
    return web.json_response({
        "ok": True, "applied": sorted(accepted.keys()),
        "task": resp if isinstance(resp, str) else None,
    })


@role_required("operator")
async def qemu_config_update_handler(request: web.Request) -> web.Response:
    return await _do_update(request, "qemu")


@role_required("operator")
async def lxc_config_update_handler(request: web.Request) -> web.Response:
    return await _do_update(request, "lxc")


async def _do_resize(request: web.Request, kind: str) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    try:
        body = await _read_json_capped(request)
    except web.HTTPException as e:
        return web.json_response({"error": e.reason or "bad_request"}, status=e.status)

    disk = (body.get("disk") or "").strip()
    size = (body.get("size") or "").strip()
    slot_re = _DISK_SLOT_RE if kind == "qemu" else _LXC_DISK_SLOT_RE
    if not slot_re.match(disk):
        return web.json_response({"error": "bad_disk_slot"}, status=400)
    if not _DELTA_GB_RE.match(size):
        # Reject-by-default: only "+<N>G" delta is allowed. PVE accepts
        # absolute "<N>G" too, which silently SHRINKS if smaller — kept
        # out of the API surface to avoid data-loss footguns.
        return web.json_response({"error": "bad_size_delta"}, status=400)

    actor, ip, rid = _audit(request)
    fn = (cluster.client.vm_resize_disk if kind == "qemu"
          else cluster.client.ct_resize_disk)
    try:
        upid = await fn(node, vmid, disk, size)
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action=f"pve.{kind}.resize_disk",
            target=f"{node}/{vmid}/{disk}", result=audit.result_error(e),
            request_id=rid, cluster_id=cid, params={"size": size},
        )
        return web.json_response(
            {"error": "resize_failed", "detail": str(e)}, status=400,
        )

    await audit.write(
        user=actor, source_ip=ip, action=f"pve.{kind}.resize_disk",
        target=f"{node}/{vmid}/{disk}", result="ok",
        request_id=rid, cluster_id=cid, params={"size": size},
    )
    _invalidate(cid, node, kind, vmid)
    return web.json_response({"ok": True, "task": upid})


@role_required("operator")
async def qemu_resize_handler(request: web.Request) -> web.Response:
    return await _do_resize(request, "qemu")


@role_required("operator")
async def lxc_resize_handler(request: web.Request) -> web.Response:
    return await _do_resize(request, "lxc")


async def _do_move_disk(request: web.Request, kind: str) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    try:
        vmid = int(request.match_info["vmid"])
    except ValueError:
        return web.json_response({"error": "bad_vmid"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await _read_json_capped(request)
    except web.HTTPException as e:
        return web.json_response({"error": e.reason or "bad_request"}, status=e.status)

    disk = (body.get("disk") or body.get("volume") or "").strip()
    storage = (body.get("storage") or "").strip()
    delete = bool(body.get("delete", False))
    slot_re = _DISK_SLOT_RE if kind == "qemu" else _LXC_DISK_SLOT_RE
    if not slot_re.match(disk):
        return web.json_response({"error": "bad_disk_slot"}, status=400)
    if not re.match(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$", storage):
        return web.json_response({"error": "bad_storage"}, status=400)
    bwlimit = body.get("bwlimit")
    if bwlimit is not None and bwlimit != "":
        try:
            bwlimit = int(bwlimit)
            if bwlimit < 0:
                raise ValueError
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_bwlimit"}, status=400)
    else:
        bwlimit = None
    fmt = body.get("format")
    if fmt is not None:
        fmt = str(fmt).strip()
        if fmt not in ("", "raw", "qcow2", "vmdk", "subvol"):
            return web.json_response({"error": "bad_format"}, status=400)
        if fmt == "":
            fmt = None

    # The destination must actually hold this kind of volume. PVE accepts the
    # request and fails partway through the copy otherwise, which leaves the
    # disk on the old storage with a half-written copy on the new one.
    blocked = create_guard.check_disk_storage(cluster, node, storage, kind)
    if blocked is not None:
        return web.json_response(blocked, status=409)

    actor, ip, rid = _audit(request)
    try:
        if kind == "qemu":
            upid = await cluster.client.vm_move_disk(
                node, vmid, disk, storage,
                delete=delete, format=fmt, bwlimit=bwlimit,
            )
        else:
            upid = await cluster.client.ct_move_volume(
                node, vmid, disk, storage, delete=delete, bwlimit=bwlimit,
            )
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action=f"pve.{kind}.move_disk",
            target=f"{node}/{vmid}/{disk} -> {storage}",
            result=audit.result_error(e), request_id=rid, cluster_id=cid,
            params={"delete": delete, "format": fmt},
        )
        return web.json_response({"error": "move_failed", "detail": str(e)}, status=400)

    await audit.write(
        user=actor, source_ip=ip, action=f"pve.{kind}.move_disk",
        target=f"{node}/{vmid}/{disk} -> {storage}",
        result="ok", request_id=rid, cluster_id=cid,
        params={"delete": delete, "format": fmt},
    )
    _invalidate(cid, node, kind, vmid)
    return web.json_response({"ok": True, "task": upid})


@role_required("operator")
async def qemu_move_disk_handler(request: web.Request) -> web.Response:
    return await _do_move_disk(request, "qemu")


@role_required("operator")
async def lxc_move_disk_handler(request: web.Request) -> web.Response:
    return await _do_move_disk(request, "lxc")


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/config", qemu_config_handler),
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/config",  lxc_config_handler),
    ("PUT", r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/config", qemu_config_update_handler),
    ("PUT", r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/config",  lxc_config_update_handler),
    ("PUT",  r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/resize",      qemu_resize_handler),
    ("PUT",  r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/resize",       lxc_resize_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/move_disk",   qemu_move_disk_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/move_volume",  lxc_move_disk_handler),
]
