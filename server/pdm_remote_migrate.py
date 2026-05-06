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
    candidates = []
    for cluster_cfg in config.clusters:
        if cluster_cfg.id == cluster_id:
            continue  # don't migrate to self
        if not cluster_cfg.enabled:
            continue
        # Each node's listed host is a candidate IP/hostname for the endpoint.
        for node_cfg in cluster_cfg.nodes:
            candidates.append({
                "cluster_id": cluster_cfg.id,
                "cluster_name": cluster_cfg.name or cluster_cfg.id,
                "node_host": node_cfg.host,
                "node_port": node_cfg.port,
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
    ("GET",  "/api/clusters/{cluster_id}/remote-endpoints",            list_target_endpoints_handler),
    ("GET",  "/api/remote-fingerprint",                                fingerprint_handler),
    ("POST", "/api/clusters/{cluster_id}/vms/{vmid}/remote-migrate",   remote_migrate_handler),
]
