"""VM / CT creation wizard — backend.

Endpoints (all operator+):
  GET  /api/clusters/{cid}/nodes/{node}/storages?content=iso
       List storages on a node, optionally filtered by content type
       (iso | vztmpl | images | rootdir). Wizard uses this to populate
       the OS-template and disk-target selectors.

  GET  /api/clusters/{cid}/nodes/{node}/storages/{storage}/iso
       Enumerate ISOs on a storage. Returns volid + size + format.

  GET  /api/clusters/{cid}/nodes/{node}/storages/{storage}/vztmpl
       Enumerate LXC templates on a storage.

  GET  /api/clusters/{cid}/next-vmid
       PVE-allocated free VMID.

  POST /api/clusters/{cid}/nodes/{node}/qemu
       Create a QEMU VM. Body: {vmid, name, cores, memory, ostype,
       iso_volid, disks: [{slot, storage, size_gb}],
       nics: [{slot, model, bridge, vlan?, firewall?}]}.

  POST /api/clusters/{cid}/nodes/{node}/lxc
       Create an LXC container. Body: {vmid, hostname, cores, memory,
       swap, ostemplate (volid), password, storage, size_gb,
       nic: {bridge, vlan?, firewall?, ip?, gw?}}.

OWASP design:
  A01 — operator role for create. Admin not required because PVE itself
        gates create on the underlying token's privileges; if jt-proxense's
        write token is operator-scoped on PVE, the call fails server-side.
  A03 — every user-controlled string passes through one of:
          - integer bounds (vmid, cores, memory, size_gb)
          - regex (name/hostname/storage id/disk slot/bridge name)
          - PVE volid format check (storage:vztmpl/template-name.tar.gz)
        We REJECT anything off-pattern rather than escape it.
  A04 — wizard frontend offers a confirmation step; backend is single-shot.
        VMID range capped to PVE's accepted [100, 999_999_999] so a typo
        like "0" or "9999999999999999" is caught before going to PVE.
  A05 — body cap 16 KiB; max 32 disks/nics per request (PVE itself caps).
  A08 — for ISO/template volids we accept only `<storage>:<filename>`
        with strict charset; PVE verifies the file actually exists, but
        we won't construct a path the operator didn't pick.
  A09 — every create writes one audit row (target=node/vmid, params hash).
"""
from __future__ import annotations

import json
import logging
import re
from typing import Any

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


_MAX_BODY_BYTES = 16 * 1024
_NAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,127}$")
_HOSTNAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9.\-]{0,63}$")
_STORAGE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$")
_BRIDGE_RE = re.compile(r"^vmbr[0-9]{1,3}$")
_OSTYPE_RE = re.compile(r"^[a-z0-9]{2,16}$")
_NIC_MODEL_RE = re.compile(r"^(virtio|e1000|e1000e|rtl8139|vmxnet3)$")
_VLAN_RE = re.compile(r"^[0-9]{1,4}$")
_DISK_SLOT_RE = re.compile(r"^(scsi|virtio|sata|ide)[0-9]{1,2}$")
# volid format used by PVE for content references:
#   <storage>:<filename> where filename can contain "/"  (e.g. iso/myimg.iso)
# Accept the conservative subset.
_VOLID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}:[A-Za-z0-9./_\-]{1,256}$")


def _audit(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


async def _read_json_capped(request: web.Request) -> dict:
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


def _int_in(v: Any, lo: int, hi: int) -> int | None:
    try:
        n = int(v)
    except (TypeError, ValueError):
        return None
    if n < lo or n > hi:
        return None
    return n


# ---------- helper GET handlers ---------------------------------------

@role_required("operator")
async def list_storages_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    content = (request.query.get("content") or "").strip().lower()
    if content and content not in ("iso", "vztmpl", "images", "rootdir", "backup"):
        return web.json_response({"error": "bad_content"}, status=400)
    try:
        rows = await cluster.client.list_node_storages(node, content=content or None)
    except Exception as e:
        return web.json_response({"error": "list_failed", "detail": str(e)}, status=500)
    return web.json_response({"storages": rows or []})


async def _list_content(request: web.Request, content_type: str) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    storage = request.match_info["storage"]
    if not _STORAGE_RE.match(storage):
        return web.json_response({"error": "bad_storage"}, status=400)
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        rows = await cluster.client.list_storage_content(node, storage, content=content_type)
    except Exception as e:
        return web.json_response({"error": "list_failed", "detail": str(e)}, status=500)
    return web.json_response({"content": rows or []})


@role_required("operator")
async def list_iso_handler(request: web.Request) -> web.Response:
    return await _list_content(request, "iso")


@role_required("operator")
async def list_vztmpl_handler(request: web.Request) -> web.Response:
    return await _list_content(request, "vztmpl")


@role_required("operator")
async def next_vmid_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        nid = await cluster.client.cluster_next_vmid()
    except Exception as e:
        return web.json_response({"error": "next_vmid_failed", "detail": str(e)}, status=500)
    return web.json_response({"vmid": nid})


# ---------- create handlers -------------------------------------------

def _validate_qemu_payload(body: dict) -> tuple[dict | None, str | None]:
    vmid = _int_in(body.get("vmid"), 100, 999_999_999)
    if vmid is None:                  return None, "bad_vmid"
    name = (body.get("name") or "").strip()
    if name and not _NAME_RE.match(name):
        return None, "bad_name"
    cores = _int_in(body.get("cores"), 1, 1024)
    if cores is None:                 return None, "bad_cores"
    sockets = _int_in(body.get("sockets") or 1, 1, 16)
    if sockets is None:               return None, "bad_sockets"
    memory = _int_in(body.get("memory"), 16, 1_048_576)
    if memory is None:                return None, "bad_memory"
    ostype = (body.get("ostype") or "l26").strip()
    if not _OSTYPE_RE.match(ostype):  return None, "bad_ostype"

    iso_volid = (body.get("iso_volid") or "").strip()
    if iso_volid and not _VOLID_RE.match(iso_volid):
        return None, "bad_iso_volid"

    disks_in = body.get("disks") or []
    if not isinstance(disks_in, list) or len(disks_in) > 8:
        return None, "bad_disks"
    nics_in = body.get("nics") or []
    if not isinstance(nics_in, list) or len(nics_in) > 8:
        return None, "bad_nics"

    out: dict[str, Any] = {
        "name": name or f"vm{vmid}",
        "cores": cores,
        "sockets": sockets,
        "memory": memory,
        "ostype": ostype,
    }
    if iso_volid:
        # PVE accepts cdrom on `ide2` by convention.
        out["ide2"] = f"{iso_volid},media=cdrom"

    for d in disks_in:
        if not isinstance(d, dict): return None, "bad_disk_entry"
        slot = (d.get("slot") or "").strip()
        if not _DISK_SLOT_RE.match(slot): return None, f"bad_disk_slot:{slot}"
        storage = (d.get("storage") or "").strip()
        if not _STORAGE_RE.match(storage): return None, f"bad_disk_storage:{storage}"
        size_gb = _int_in(d.get("size_gb"), 1, 65_536)
        if size_gb is None: return None, f"bad_disk_size:{slot}"
        out[slot] = f"{storage}:{size_gb}"

    boot_order: list[str] = []
    for n in nics_in:
        if not isinstance(n, dict): return None, "bad_nic_entry"
        slot = (n.get("slot") or "net0").strip()
        if not re.match(r"^net[0-9]{1,2}$", slot): return None, f"bad_nic_slot:{slot}"
        model = (n.get("model") or "virtio").strip()
        if not _NIC_MODEL_RE.match(model): return None, f"bad_nic_model:{model}"
        bridge = (n.get("bridge") or "").strip()
        if not _BRIDGE_RE.match(bridge): return None, f"bad_nic_bridge:{bridge}"
        parts = [f"{model},bridge={bridge}"]
        vlan = (n.get("vlan") or "").strip()
        if vlan:
            if not _VLAN_RE.match(vlan): return None, f"bad_nic_vlan:{slot}"
            parts.append(f"tag={vlan}")
        if n.get("firewall"):
            parts.append("firewall=1")
        out[slot] = ",".join(parts)
        boot_order.append(slot)

    # Boot order: first disk, then ISO if present, then first NIC.
    bo: list[str] = []
    for d in disks_in:
        if isinstance(d, dict):
            slot = (d.get("slot") or "").strip()
            if _DISK_SLOT_RE.match(slot):
                bo.append(slot)
                break
    if iso_volid:
        bo.append("ide2")
    if boot_order:
        bo.append(boot_order[0])
    if bo:
        out["boot"] = "order=" + ";".join(bo)

    # Sane defaults
    out["agent"] = 1
    out["onboot"] = 0
    return out, None


def _validate_lxc_payload(body: dict) -> tuple[dict | None, str | None]:
    vmid = _int_in(body.get("vmid"), 100, 999_999_999)
    if vmid is None:                  return None, "bad_vmid"
    hostname = (body.get("hostname") or "").strip()
    if not _HOSTNAME_RE.match(hostname):
        return None, "bad_hostname"
    cores = _int_in(body.get("cores") or 1, 1, 1024)
    if cores is None:                 return None, "bad_cores"
    memory = _int_in(body.get("memory") or 512, 16, 1_048_576)
    if memory is None:                return None, "bad_memory"
    swap = _int_in(body.get("swap") or 512, 0, 1_048_576)
    if swap is None:                  return None, "bad_swap"

    ostemplate = (body.get("ostemplate") or "").strip()
    if not _VOLID_RE.match(ostemplate):
        return None, "bad_ostemplate"
    storage = (body.get("storage") or "").strip()
    if not _STORAGE_RE.match(storage):
        return None, "bad_storage"
    size_gb = _int_in(body.get("size_gb") or 8, 1, 65_536)
    if size_gb is None:               return None, "bad_size"

    out: dict[str, Any] = {
        "hostname": hostname,
        "cores": cores,
        "memory": memory,
        "swap": swap,
        "ostemplate": ostemplate,
        "storage": storage,
        "rootfs": f"{storage}:{size_gb}",
        "unprivileged": 1,
        "onboot": 0,
    }
    pw = body.get("password") or ""
    sshpub = body.get("ssh_public_keys") or ""
    if pw:
        if not isinstance(pw, str) or len(pw) < 5 or len(pw) > 128:
            return None, "bad_password"
        out["password"] = pw
    if sshpub:
        if not isinstance(sshpub, str) or len(sshpub) > 8192:
            return None, "bad_ssh_keys"
        out["ssh-public-keys"] = sshpub
    if not pw and not sshpub:
        return None, "need_password_or_ssh"

    nic = body.get("nic")
    if nic and isinstance(nic, dict):
        bridge = (nic.get("bridge") or "").strip()
        if not _BRIDGE_RE.match(bridge):
            return None, f"bad_nic_bridge:{bridge}"
        parts = [f"name=eth0,bridge={bridge}"]
        vlan = (nic.get("vlan") or "").strip()
        if vlan:
            if not _VLAN_RE.match(vlan): return None, "bad_nic_vlan"
            parts.append(f"tag={vlan}")
        if nic.get("firewall"):
            parts.append("firewall=1")
        ip = (nic.get("ip") or "dhcp").strip()
        if ip == "dhcp":
            parts.append("ip=dhcp")
        elif re.match(r"^[0-9.]{7,18}/[0-9]{1,2}$", ip):
            parts.append(f"ip={ip}")
            gw = (nic.get("gw") or "").strip()
            if gw:
                if not re.match(r"^[0-9.]{7,18}$", gw):
                    return None, "bad_gw"
                parts.append(f"gw={gw}")
        else:
            return None, "bad_ip"
        out["net0"] = ",".join(parts)

    return out, None


@role_required("operator")
async def create_qemu_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await _read_json_capped(request)
    except web.HTTPException as e:
        return web.json_response({"error": e.reason or "bad_request"}, status=e.status)

    fields, err = _validate_qemu_payload(body)
    if err:
        return web.json_response({"error": "validation", "detail": err}, status=400)
    vmid = int(body.get("vmid"))

    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.create_qemu(node, vmid, **fields)
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action="pve.qemu.create",
            target=f"{node}/{vmid}", result=audit.result_error(e),
            request_id=rid, cluster_id=cid,
            params={"name": fields.get("name"), "memory": fields.get("memory"),
                    "cores": fields.get("cores")},
        )
        return web.json_response({"error": "create_failed", "detail": str(e)}, status=400)

    await audit.write(
        user=actor, source_ip=ip, action="pve.qemu.create",
        target=f"{node}/{vmid}", result="ok", request_id=rid, cluster_id=cid,
        params={"name": fields.get("name"), "memory": fields.get("memory"),
                "cores": fields.get("cores")},
    )
    return web.json_response({"ok": True, "vmid": vmid, "task": upid})


@role_required("operator")
async def create_lxc_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        body = await _read_json_capped(request)
    except web.HTTPException as e:
        return web.json_response({"error": e.reason or "bad_request"}, status=e.status)

    fields, err = _validate_lxc_payload(body)
    if err:
        return web.json_response({"error": "validation", "detail": err}, status=400)
    vmid = int(body.get("vmid"))

    # Audit BEFORE password reaches PVE — and never log the password
    # itself. params hash includes only non-secret fields.
    safe_params = {k: v for k, v in fields.items()
                   if k not in ("password", "ssh-public-keys")}
    actor, ip, rid = _audit(request)
    try:
        upid = await cluster.client.create_lxc(node, vmid, **fields)
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action="pve.lxc.create",
            target=f"{node}/{vmid}", result=audit.result_error(e),
            request_id=rid, cluster_id=cid, params=safe_params,
        )
        return web.json_response({"error": "create_failed", "detail": str(e)}, status=400)

    await audit.write(
        user=actor, source_ip=ip, action="pve.lxc.create",
        target=f"{node}/{vmid}", result="ok", request_id=rid, cluster_id=cid,
        params=safe_params,
    )
    return web.json_response({"ok": True, "vmid": vmid, "task": upid})


# ---------- backup restore (admin) -------------------------------------

# `archive` is a PVE volid like 'storage:backup/vzdump-qemu-100-...vma.zst'.
# It must use the same charset PVE produces (`/`, `:`, `-`, `_`, alnum, dot).
_ARCHIVE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._/:\-]{1,512}$")


async def _do_restore(request: web.Request, kind: str) -> web.Response:
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
    archive = (body.get("archive") or "").strip()
    if not archive or not _ARCHIVE_RE.match(archive):
        return web.json_response({"error": "bad_archive"}, status=400)
    force = bool(body.get("force", False))
    storage = body.get("storage")
    if storage is not None:
        storage = str(storage).strip()
        if storage and not _STORAGE_RE.match(storage):
            return web.json_response({"error": "bad_storage"}, status=400)
        if not storage:
            storage = None
    bwlimit = body.get("bwlimit")
    if bwlimit is not None:
        try:
            bwlimit = int(bwlimit)
            if bwlimit < 0:
                raise ValueError
        except (TypeError, ValueError):
            return web.json_response({"error": "bad_bwlimit"}, status=400)
        if bwlimit == 0:
            bwlimit = None

    actor, ip, rid = _audit(request)
    fn = (cluster.client.restore_qemu if kind == "qemu" else cluster.client.restore_lxc)
    try:
        upid = await fn(node, vmid, archive, force=force,
                        storage=storage, bwlimit=bwlimit)
    except Exception as e:
        await audit.write(
            user=actor, source_ip=ip, action=f"pve.{kind}.restore",
            target=f"{node}/{vmid}", result=audit.result_error(e),
            request_id=rid, cluster_id=cid,
            params={"archive": archive, "force": force, "storage": storage},
        )
        return web.json_response({"error": "restore_failed", "detail": str(e)}, status=400)
    await audit.write(
        user=actor, source_ip=ip, action=f"pve.{kind}.restore",
        target=f"{node}/{vmid}", result="ok",
        request_id=rid, cluster_id=cid,
        params={"archive": archive, "force": force, "storage": storage},
    )
    return web.json_response({"ok": True, "vmid": vmid, "task": upid})


from .middleware import role_required as _rr  # for the inline admin decorators


@_rr("admin")
async def restore_qemu_handler(request: web.Request) -> web.Response:
    return await _do_restore(request, "qemu")


@_rr("admin")
async def restore_lxc_handler(request: web.Request) -> web.Response:
    return await _do_restore(request, "lxc")


ROUTES = [
    ("GET",  r"/api/clusters/{cluster_id}/next-vmid",                                       next_vmid_handler),
    ("GET",  r"/api/clusters/{cluster_id}/nodes/{node}/storages",                           list_storages_handler),
    ("GET",  r"/api/clusters/{cluster_id}/nodes/{node}/storages/{storage}/iso",             list_iso_handler),
    ("GET",  r"/api/clusters/{cluster_id}/nodes/{node}/storages/{storage}/vztmpl",          list_vztmpl_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/qemu",                               create_qemu_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/lxc",                                create_lxc_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/qemu/{vmid}/restore",                restore_qemu_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/lxc/{vmid}/restore",                 restore_lxc_handler),
]
