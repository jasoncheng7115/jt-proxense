"""PVE 8 cross-cluster (remote) VM migration.

Wraps `POST /nodes/{node}/qemu/{vmid}/remote_migrate`. The hard part is
constructing `target-endpoint`, which encodes the remote cluster's address +
TLS fingerprint + API token in one PVE-specific string format.

UI requirement (Jason 2026-05-06): the operator must be able to pick which
remote IP / network segment carries the data transfer. We expose the target
node's reachable IPs via /api/clusters/{cid}/nodes/{node}/ips so the modal
can offer them as a dropdown.
"""
from __future__ import annotations

import hashlib
import logging
import socket
import ssl
from typing import Any

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .config import get_config
from .middleware import role_required


logger = logging.getLogger(__name__)


def _audit_actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def get_tls_fingerprint(host: str, port: int = 8006) -> str:
    """Fetch the SHA-256 fingerprint of the TLS cert at host:port.

    Returns an uppercased hex string with colons every two chars
    (PVE's expected format: 'AB:CD:...:12').

    Synchronous — only called once per migrate, blocking is fine. Doesn't
    verify the cert (we explicitly don't trust it; we just want its fingerprint
    to pin the remote in the migration RPC).
    """
    ctx = ssl._create_unverified_context()
    sock = socket.create_connection((host, port), timeout=10)
    try:
        with ctx.wrap_socket(sock, server_hostname=host) as ssock:
            cert_bin = ssock.getpeercert(binary_form=True)
    finally:
        try:
            sock.close()
        except Exception:
            pass
    digest = hashlib.sha256(cert_bin).hexdigest().upper()
    return ":".join(digest[i:i+2] for i in range(0, len(digest), 2))


def _build_target_endpoint(*, host: str, port: int, fingerprint: str,
                           token_user: str, token_name: str, token_value: str) -> str:
    """Format expected by PVE 8 remote_migrate. PVE quotes the apitoken value
    so commas inside don't break the comma-separated key=value list."""
    apitoken = f"PVEAPIToken={token_user}!{token_name}={token_value}"
    return (
        f"apitoken={apitoken},"
        f"host={host},"
        f"port={port},"
        f"fingerprint={fingerprint}"
    )


def _resolve_vm_in_cluster(cluster, vmid: int):
    """Find VM in cache, return {node, name, tags, type} or None."""
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == int(vmid):
            tags = []
            raw_tags = getattr(vm, "tags", "") or ""
            if isinstance(raw_tags, str):
                tags = [t.strip() for t in raw_tags.split(";") if t.strip()]
            return {
                "node": getattr(vm, "node", ""),
                "name": getattr(vm, "name", "") or f"vm-{vmid}",
                "tags": tags,
                "type": getattr(vm, "type", "qemu"),
            }
    return None


# ---------------------------------------------------------------- handlers

@role_required("admin")
async def list_target_endpoints_handler(request: web.Request) -> web.Response:
    """GET /api/clusters/{cluster_id}/remote-endpoints

    Returns every other configured cluster as a candidate target, with each
    cluster's nodes' reachable IPs flattened so the UI can offer the operator
    a dropdown like '<cluster_id> @ <node_host>' — useful when a target node
    has multiple IPs (management vs migration network).

    The IPs come from the cluster's config.yaml `nodes[].host` entries —
    operators with a separate migration network just add another node entry
    with the migration IP, or we expose a future `migration_ips` extension.
    """
    cluster_id = request.match_info["cluster_id"]
    config = get_config()
    candidates: list[dict[str, Any]] = []
    for cluster_cfg in config.clusters:
        if cluster_cfg.id == cluster_id:
            continue  # don't migrate to self
        if not cluster_cfg.enabled:
            continue

        # Resolve config-host → PVE node name. We ask the live cluster for
        # /cluster/status, which lists each node with its IP. This lets the
        # UI pass a real PVE node name to the per-node endpoints below
        # (PVE's API rejects IPs in the {node} path component).
        host_to_node: dict[str, str] = {}
        target_cluster = cluster_manager.get_cluster(cluster_cfg.id)
        if target_cluster is not None:
            try:
                status_rows = await target_cluster.client.get_cluster_status()
                for row in status_rows or []:
                    if not isinstance(row, dict):
                        continue
                    if row.get("type") != "node":
                        continue
                    nname = row.get("name", "")
                    nip = row.get("ip", "")
                    if nname and nip:
                        host_to_node[nip] = nname
            except Exception as e:
                logger.debug(f"could not enumerate nodes for {cluster_cfg.id}: {e}")

        for node_cfg in cluster_cfg.nodes:
            # Best-effort node-name lookup. Falls back to the lone cached node
            # for standalone single-node managed clusters.
            node_name = host_to_node.get(node_cfg.host, "")
            if not node_name and target_cluster is not None:
                cached_nodes = getattr(getattr(target_cluster, "cache", None), "nodes", None) or {}
                if len(cached_nodes) == 1:
                    node_name = next(iter(cached_nodes.keys()))
            candidates.append({
                "cluster_id": cluster_cfg.id,
                "cluster_name": cluster_cfg.name or cluster_cfg.id,
                "node_host": node_cfg.host,
                "node_port": node_cfg.port,
                "node_name": node_name,
            })
    return web.json_response({"endpoints": candidates})


@role_required("admin")
async def fingerprint_handler(request: web.Request) -> web.Response:
    """GET /api/remote-fingerprint?host=H&port=P
    Helper the UI calls to pre-fill the fingerprint field when an operator
    picks a target endpoint. Synchronous TLS handshake — runs in executor."""
    host = request.query.get("host")
    port = int(request.query.get("port", "8006"))
    if not host:
        return web.json_response({"error": "missing_host"}, status=400)
    import asyncio
    try:
        loop = asyncio.get_running_loop()
        fp = await loop.run_in_executor(None, get_tls_fingerprint, host, port)
    except Exception as e:
        return web.json_response({"error": "fingerprint_failed", "detail": str(e)}, status=502)
    return web.json_response({"host": host, "port": port, "fingerprint": fp})


@role_required("admin")
async def source_layout_handler(request: web.Request) -> web.Response:
    """GET /api/clusters/{cluster_id}/vms/{vmid}/migration-source

    Return the source VM's disks and NICs so the modal can render one
    dropdown per disk (for storage_map) and one per NIC (for bridge_map),
    instead of asking the operator to type the mapping by hand.
    """
    cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    vm_meta = _resolve_vm_in_cluster(cluster, vmid)
    if vm_meta is None:
        return web.json_response({"error": "vm_not_found"}, status=404)
    if vm_meta["type"] != "qemu":
        return web.json_response({"error": "lxc_unsupported"}, status=400)

    try:
        cfg = await cluster.client.get_vm_config(vm_meta["node"], vmid)
    except Exception as e:
        return web.json_response({"error": "pve_request_failed", "detail": str(e)}, status=502)

    disks: list[dict[str, Any]] = []
    nics: list[dict[str, Any]] = []
    if isinstance(cfg, dict):
        for key, raw in cfg.items():
            if not isinstance(key, str) or not isinstance(raw, str):
                continue
            # Disks: keys like scsi0, sata1, virtio2, ide0 with value
            #   "<storage>:<volid>,size=...,..." (cloudinit + cdrom variants
            #   exist; we skip cdrom/none).
            if any(key.startswith(p) for p in ("scsi", "sata", "virtio", "ide")):
                # Skip cdrom / unallocated
                if "media=cdrom" in raw or raw.startswith("none"):
                    continue
                head = raw.split(",", 1)[0]
                if ":" not in head:
                    continue
                storage, _, volid = head.partition(":")
                size = ""
                for part in raw.split(","):
                    part = part.strip()
                    if part.startswith("size="):
                        size = part[5:]
                disks.append({
                    "key": key, "storage": storage, "volid": volid, "size": size,
                })
            # NICs: keys like net0, net1 with bridge=vmbrX
            elif key.startswith("net") and key[3:].isdigit():
                bridge = ""
                model = ""
                for part in raw.split(","):
                    part = part.strip()
                    if part.startswith("bridge="):
                        bridge = part[7:]
                    elif "=" in part and not part.startswith("macaddr=") and not part.startswith("tag="):
                        # First key=val pair is usually `<model>=<mac>`.
                        m_key = part.split("=", 1)[0]
                        if not model and m_key in {"virtio", "e1000", "rtl8139", "vmxnet3"}:
                            model = m_key
                if bridge:
                    nics.append({"key": key, "bridge": bridge, "model": model})

    disks.sort(key=lambda d: d["key"])
    nics.sort(key=lambda n: n["key"])
    return web.json_response({
        "vmid": vmid, "node": vm_meta["node"], "name": vm_meta["name"],
        "disks": disks, "nics": nics,
    })


@role_required("admin")
async def target_layout_handler(request: web.Request) -> web.Response:
    """GET /api/clusters/{cluster_id}/nodes/{node}/migration-targets

    Enumerate the destination node's storages, bridges, and IPv4 addresses
    so the modal can offer:
      - per-disk → target storage dropdowns (filtered to image-capable storages)
      - per-NIC → target bridge dropdowns
      - which IP/subnet the data transfer should ride on (operator picks
        the migration network — e.g. 172.16.100.x — by selecting the
        matching IP here; that IP becomes the target_endpoint_host).
    """
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    try:
        storages_raw = await cluster.client.get_storage(node)
    except Exception as e:
        return web.json_response({"error": "storage_query_failed", "detail": str(e)}, status=502)
    storages = []
    for s in storages_raw or []:
        if not isinstance(s, dict):
            continue
        content = s.get("content", "") or ""
        # Only storages that can hold VM disk images are valid migration targets.
        if "images" not in content:
            continue
        if int(s.get("active", 0) or 0) == 0 and int(s.get("enabled", 1) or 1) == 0:
            continue
        storages.append({
            "storage": s.get("storage", ""),
            "type": s.get("type", ""),
            "content": content,
            "avail": int(s.get("avail", 0) or 0),
            "total": int(s.get("total", 0) or 0),
            "shared": bool(s.get("shared", 0)),
        })

    try:
        ifaces = await cluster.client.get_node_network(node)
    except Exception as e:
        return web.json_response({"error": "network_query_failed", "detail": str(e)}, status=502)
    bridges: list[dict[str, Any]] = []
    ips: list[dict[str, Any]] = []
    for ifc in ifaces or []:
        if not isinstance(ifc, dict):
            continue
        iface_type = ifc.get("type", "")
        iface_name = ifc.get("iface", "")
        if iface_type in ("bridge", "OVSBridge"):
            bridges.append({"iface": iface_name, "type": iface_type,
                            "address": ifc.get("address", "")})
        # Collect any iface that has an IPv4 address. Preferred for the
        # migration network picker — operator picks 172.16.x.x to pin transfer.
        addr = ifc.get("address", "") or ""
        if addr and "." in addr:  # IPv4-ish
            ips.append({
                "iface": iface_name,
                "type": iface_type,
                "address": addr,
                "netmask": ifc.get("netmask", ""),
            })
    bridges.sort(key=lambda b: b["iface"])
    ips.sort(key=lambda i: i["address"])
    return web.json_response({
        "cluster_id": cluster_id, "node": node,
        "storages": storages, "bridges": bridges, "ips": ips,
    })


@role_required("admin")
async def precheck_handler(request: web.Request) -> web.Response:
    """GET /api/clusters/{cluster_id}/vms/{vmid}/migration-precheck
       ?target_cluster_id=X&target_node=Y

    Run the cheap, deterministic pre-flight checks operators ask for over
    and over: snapshots, PCI passthrough, lock state, machine type / qemu
    version compatibility. We split findings into two buckets:

      blockers  — things PVE will definitely reject mid-flight, surfaced
                  before the operator clicks Submit so they don't end up
                  with a half-migrated VM stuck in `lock=migrate` state
                  (which can only be cleared as `root@pam` over SSH —
                  the API token can't touch the lock attribute).

      warnings  — things that *might* break (CPU model mismatch when
                  source is `host`; QEMU version skew). Operator can
                  proceed but is informed.
    """
    src_cid = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    target_cid = request.query.get("target_cluster_id", "")
    target_node = request.query.get("target_node", "")

    src_cluster = cluster_manager.get_cluster(src_cid)
    if src_cluster is None:
        return web.json_response({"error": "source_cluster_not_found"}, status=404)
    src_meta = _resolve_vm_in_cluster(src_cluster, vmid)
    if src_meta is None:
        return web.json_response({"error": "vm_not_found"}, status=404)

    tgt_cluster = cluster_manager.get_cluster(target_cid) if target_cid else None

    blockers: list[str] = []
    warnings: list[str] = []
    info: dict[str, Any] = {"source": {}, "target": {}}

    # ---------------- source-side gathering
    src_node = src_meta["node"]
    try:
        cfg = await src_cluster.client.get_vm_config(src_node, vmid)
    except Exception as e:
        return web.json_response({"error": "vm_config_failed", "detail": str(e)}, status=502)

    src_lock = cfg.get("lock") if isinstance(cfg, dict) else None
    if src_lock:
        # A pre-existing lock means PVE will reject the migrate call. Surface
        # the exact lock name so the operator knows which CLI command to run.
        blockers.append(f"source VM is locked (lock={src_lock}); run `qm unlock {vmid}` on {src_node} first")

    # PCI passthrough: hostpciN keys can't migrate (not even live). Same
    # for `args` containing -device vfio-pci.
    pci_keys = [k for k in (cfg or {}).keys() if isinstance(k, str) and k.startswith("hostpci")]
    if pci_keys:
        blockers.append(f"VM has PCI passthrough ({', '.join(pci_keys)}); remote_migrate is not supported")

    # PVE 8 remote_migrate refuses VMs with snapshots — must delete or
    # collapse them first. Online migrations within a cluster sometimes
    # tolerate them; cross-cluster never does.
    try:
        snaps = await src_cluster.client.vm_list_snapshots(src_node, vmid)
        snap_names = [s.get("name", "") for s in (snaps or [])
                      if isinstance(s, dict) and s.get("name") and s.get("name") != "current"]
        if snap_names:
            blockers.append(
                f"VM has {len(snap_names)} snapshot(s) ({', '.join(snap_names[:3])}"
                + ("…" if len(snap_names) > 3 else "")
                + "); PVE refuses cross-cluster migrate while snapshots exist"
            )
        info["source"]["snapshots"] = snap_names
    except Exception as e:
        warnings.append(f"could not enumerate snapshots: {e}")

    src_cpu = (cfg or {}).get("cpu", "") or ""
    src_machine = (cfg or {}).get("machine", "") or ""
    info["source"]["cpu"] = src_cpu
    info["source"]["machine"] = src_machine
    info["source"]["lock"] = src_lock or ""

    try:
        src_node_status = await src_cluster.client.get_node_status(src_node)
        info["source"]["pve_version"] = src_node_status.get("pveversion", "")
        info["source"]["kvm_version"] = src_node_status.get("kversion", "")
    except Exception:
        pass

    # ---------------- target-side gathering (best-effort)
    if tgt_cluster is not None and target_node:
        try:
            tgt_node_status = await tgt_cluster.client.get_node_status(target_node)
            info["target"]["pve_version"] = tgt_node_status.get("pveversion", "")
            info["target"]["kvm_version"] = tgt_node_status.get("kversion", "")
        except Exception as e:
            warnings.append(f"could not query target node status: {e}")

        # PVE major-version skew: 7→8 is a known minefield (machine-type
        # default changes, deprecated CPU flags). Allow but warn.
        sv = (info["source"].get("pve_version") or "").split("/")[0]
        tv = (info["target"].get("pve_version") or "").split("/")[0]
        if sv and tv:
            sv_major = sv.split(".")[0]
            tv_major = tv.split(".")[0]
            if sv_major and tv_major and sv_major != tv_major:
                warnings.append(
                    f"PVE major-version skew (source={sv}, target={tv}); "
                    "machine-type defaults differ — pin `machine: pc-i440fx-X.Y` on the source"
                )

    # CPU model 'host' is a portability hazard — it exposes the source's
    # exact feature set. Different physical CPU on target may lack flags
    # → guest crashes at resume (the exact failure mode you saw with VM 123).
    if src_cpu == "host" or src_cpu.startswith("host,") or src_cpu == "":
        warnings.append(
            "source CPU model is 'host' (or default); target physical CPU "
            "must support every feature flag — mismatch crashes the guest "
            "at handoff. Consider switching to a portable model "
            "(e.g. 'x86-64-v3') before migrating."
        )

    return web.json_response({
        "ok": len(blockers) == 0,
        "blockers": blockers,
        "warnings": warnings,
        "info": info,
    })


@role_required("admin")
async def remote_migrate_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cluster_id}/vms/{vmid}/remote-migrate

    Body shape:
      {
        "target_cluster_id": "<destination_cluster>",
        "target_endpoint_host": "<reachable_ip_or_hostname>",  # which IP to talk to
        "target_endpoint_port": 8006,
        "target_endpoint_fingerprint": "AB:CD:...",  # optional; we autofetch if missing
        "target_vmid": 200,                          # new vmid on remote
        "target_bridge_map": "vmbr0=vmbr0",          # required by PVE
        "target_storage_map": "local-lvm=local-lvm",
        "online": true,
        "delete_source": false,
        "bwlimit": 0
      }
    """
    src_cluster_id = request.match_info["cluster_id"]
    vmid = int(request.match_info["vmid"])
    src_cluster = cluster_manager.get_cluster(src_cluster_id)
    if src_cluster is None:
        return web.json_response({"error": "source_cluster_not_found"}, status=404)
    src_vm = _resolve_vm_in_cluster(src_cluster, vmid)
    if src_vm is None:
        return web.json_response({"error": "vm_not_found_in_source"}, status=404)
    if src_vm["type"] != "qemu":
        return web.json_response({"error": "lxc_remote_migrate_unsupported",
                                  "message": "PVE remote-migrate only supports QEMU VMs"},
                                 status=400)

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    target_cid = body.get("target_cluster_id")
    target_host = body.get("target_endpoint_host")
    target_port = int(body.get("target_endpoint_port", 8006))
    target_vmid = body.get("target_vmid")
    target_bridge_map = body.get("target_bridge_map", "")
    target_storage_map = body.get("target_storage_map", "")
    online = bool(body.get("online", True))
    delete_source = bool(body.get("delete_source", False))
    bwlimit = body.get("bwlimit") or None
    fingerprint = body.get("target_endpoint_fingerprint")

    missing = [k for k, v in {
        "target_cluster_id": target_cid,
        "target_endpoint_host": target_host,
        "target_vmid": target_vmid,
        "target_bridge_map": target_bridge_map,
        "target_storage_map": target_storage_map,
    }.items() if not v]
    if missing:
        return web.json_response({"error": "missing_fields", "fields": missing}, status=400)

    # Look up the target cluster's config so we can pull its API token —
    # PVE remote-migrate expects the FULL token in target-endpoint.
    target_cluster_cfg = None
    for c in get_config().clusters:
        if c.id == target_cid:
            target_cluster_cfg = c
            break
    if target_cluster_cfg is None or not target_cluster_cfg.auth.token_value:
        return web.json_response({
            "error": "target_cluster_not_configured",
            "message": f"target cluster '{target_cid}' must be in config.yaml with an API token",
        }, status=400)

    # Resolve fingerprint if the UI didn't supply one. Best-effort — if the
    # fetch fails, surface a clear error so the operator can paste it manually.
    if not fingerprint:
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            fingerprint = await loop.run_in_executor(
                None, get_tls_fingerprint, target_host, target_port,
            )
        except Exception as e:
            return web.json_response({
                "error": "fingerprint_fetch_failed",
                "message": f"could not auto-fetch TLS fingerprint of {target_host}:{target_port}; supply target_endpoint_fingerprint manually",
                "detail": str(e),
            }, status=502)

    target_endpoint = _build_target_endpoint(
        host=target_host, port=target_port, fingerprint=fingerprint,
        token_user=target_cluster_cfg.auth.user,
        token_name=target_cluster_cfg.auth.token_name,
        token_value=target_cluster_cfg.auth.token_value,
    )

    user, ip, rid = _audit_actor(request)
    audit_target = f"{src_cluster_id}/{src_vm['node']}/vm/{vmid} -> {target_cid}/vm/{target_vmid}@{target_host}"
    # NOTE: target_endpoint contains the SECRET token. Pass `params` WITHOUT
    # the endpoint string so the audit row's hash is based on operator-supplied
    # fields only — the secret never reaches the SHA-256 input.
    audit_params = {
        "target_cluster_id": target_cid,
        "target_endpoint_host": target_host,
        "target_endpoint_port": target_port,
        "target_vmid": target_vmid,
        "target_bridge_map": target_bridge_map,
        "target_storage_map": target_storage_map,
        "online": online, "delete_source": delete_source,
    }

    try:
        upid = await src_cluster.client.vm_remote_migrate(
            src_vm["node"], vmid,
            target_endpoint=target_endpoint,
            target_vmid=int(target_vmid),
            target_bridge=target_bridge_map,
            target_storage=target_storage_map,
            online=online, delete_source=delete_source,
            bwlimit=int(bwlimit) if bwlimit else None,
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="vm.remote_migrate",
            target=audit_target, cluster_id=src_cluster_id,
            result=audit.result_error(e), request_id=rid, params=audit_params,
        )
        return web.json_response(
            {"error": "pve_request_failed", "detail": str(e)}, status=502,
        )

    await audit.write(
        user=user, source_ip=ip, action="vm.remote_migrate",
        target=audit_target, cluster_id=src_cluster_id,
        result="ok", request_id=rid, params=audit_params,
    )
    return web.json_response({
        "ok": True, "upid": upid,
        "source": {"cluster": src_cluster_id, "node": src_vm["node"], "vmid": vmid},
        "target": {"cluster": target_cid, "vmid": int(target_vmid),
                    "endpoint_host": target_host},
    })


ROUTES = [
    ("GET",  "/api/clusters/{cluster_id}/remote-endpoints",                list_target_endpoints_handler),
    ("GET",  "/api/remote-fingerprint",                                    fingerprint_handler),
    ("GET",  "/api/clusters/{cluster_id}/vms/{vmid}/migration-source",     source_layout_handler),
    ("GET",  "/api/clusters/{cluster_id}/nodes/{node}/migration-targets",  target_layout_handler),
    ("GET",  "/api/clusters/{cluster_id}/vms/{vmid}/migration-precheck",   precheck_handler),
    ("POST", "/api/clusters/{cluster_id}/vms/{vmid}/remote-migrate",       remote_migrate_handler),
]
