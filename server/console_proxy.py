"""noVNC console proxy.

Browser flow:
    1. User clicks "Console" on a VM/CT tile.
    2. Frontend opens /console/{cluster_id}/{node}/{vmid} (server-rendered HTML
       page that loads noVNC.js).
    3. The page connects WebSocket to /api/console/{cluster_id}/{node}/{vmid}/ws.
    4. Our WS handler:
         a. Authorizes (requires VM.Console role on the target VM)
         b. Calls PVE vncproxy → gets a single-use ticket + port
         c. Opens a WS to PVE's /api2/json/nodes/.../vncwebsocket?...
         d. Forwards bytes between browser and PVE in both directions.

Why proxy instead of giving the browser the PVE token? Two reasons:
    - Defense in depth: the JS in the browser never sees the PVE API token.
      A compromised CDN or XSS still can't lift the token.
    - Single auth surface: jt-proxense session cookie is the only thing the
      operator manages.

Auth: the WS handshake honors the same session cookie as every other route.
Anonymous WS upgrade is rejected by middleware. Operator+ role is required;
admin role for non-running VMs (consoles to stopped VMs are a debug action).
"""
from __future__ import annotations

import asyncio
import logging
import ssl
from typing import Optional

import aiohttp
from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager


logger = logging.getLogger(__name__)


def _audit_actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def _resolve_guest(cluster, vmid: int):
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == int(vmid):
            return getattr(vm, "node", ""), getattr(vm, "type", "qemu"), \
                   getattr(vm, "name", f"vm-{vmid}")
    return None, None, None


async def console_ws_handler(request: web.Request) -> web.WebSocketResponse:
    """WebSocket bridge from browser to PVE noVNC.

    Path: /api/console/{cluster_id}/{node}/{vmid}/ws

    Note: aiohttp's session cookie middleware runs before this handler
    so anonymous WS upgrades have already been rejected by the time we get
    here when auth is enabled. We still re-check role for non-anonymous use.
    """
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    vmid       = int(request.match_info["vmid"])

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    actual_node, vm_type, vm_name = _resolve_guest(cluster, vmid)
    if not actual_node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    # Trust the cache's view of node — handles HA-relocated VMs
    if actual_node != node:
        node = actual_node

    # Role check — operator+ on this specific VM
    user_state = request.get("user")
    if user_state is not None:
        from . import auth as auth_mod
        # Tags for VM-pattern RBAC
        tags = []
        for vm in cluster.cache.vms.values():
            if int(vm.vmid) == vmid:
                raw = getattr(vm, "tags", "") or ""
                tags = [t.strip() for t in raw.split(";") if t.strip()] if isinstance(raw, str) else list(raw)
                break
        effective = auth_mod.role_for(user_state["id"], cluster_id,
                                       vm_name=vm_name, vm_tags=tags)
        rank = {"viewer": 1, "operator": 2, "admin": 3}
        if not effective or rank.get(effective, 0) < 2:
            return web.json_response({"error": "forbidden", "required_role": "operator"},
                                     status=403)

    user, ip, rid = _audit_actor(request)
    audit_target = f"{cluster_id}/{node}/{vm_type}/{vmid}"

    # Step 1: ask PVE for a vncproxy ticket.
    try:
        if vm_type == "lxc":
            tk = await cluster.client.ct_vncproxy(node, vmid)
        else:
            tk = await cluster.client.vm_vncproxy(node, vmid)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="console.open",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
        )
        return web.json_response({"error": "vncproxy_failed", "detail": str(e)},
                                 status=502)

    ticket = tk.get("ticket")
    pve_port = tk.get("port")
    if not ticket or not pve_port:
        await audit.write(
            user=user, source_ip=ip, action="console.open",
            target=audit_target, cluster_id=cluster_id,
            result="error:BadProxyResponse", request_id=rid,
        )
        return web.json_response({"error": "bad_pve_response"}, status=502)

    # Step 2: accept the browser WS upgrade.
    ws_browser = web.WebSocketResponse(
        protocols=("binary",), max_msg_size=0, heartbeat=30,
    )
    if not ws_browser.can_prepare(request).ok:
        return web.json_response({"error": "expected_ws_upgrade"}, status=400)
    await ws_browser.prepare(request)

    await audit.write(
        user=user, source_ip=ip, action="console.open",
        target=audit_target, cluster_id=cluster_id,
        result="ok", request_id=rid,
    )

    # Step 3: open WS to PVE. Use whichever PVE host the cluster client is
    # currently bound to (handles failover transparently).
    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        await ws_browser.close()
        return ws_browser

    api_path = "lxc" if vm_type == "lxc" else "qemu"
    pve_url = (
        f"wss://{pve_node_cfg.host}:{pve_node_cfg.port}"
        f"/api2/json/nodes/{node}/{api_path}/{vmid}/vncwebsocket"
        f"?port={pve_port}&vncticket={ticket}"
    )
    pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()

    pve_auth = cluster.client.auth
    headers = {
        "Authorization": (
            f"PVEAPIToken={pve_auth.user}!{pve_auth.token_name}={pve_auth.token_value}"
        ),
    }

    session = aiohttp.ClientSession(
        connector=aiohttp.TCPConnector(ssl=pve_ssl),
    )
    try:
        async with session.ws_connect(pve_url, headers=headers,
                                       protocols=("binary",),
                                       max_msg_size=0) as ws_pve:

            async def browser_to_pve():
                async for msg in ws_browser:
                    if msg.type == aiohttp.WSMsgType.BINARY:
                        await ws_pve.send_bytes(msg.data)
                    elif msg.type == aiohttp.WSMsgType.TEXT:
                        await ws_pve.send_str(msg.data)
                    elif msg.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED, aiohttp.WSMsgType.ERROR):
                        return
                await ws_pve.close()

            async def pve_to_browser():
                async for msg in ws_pve:
                    if msg.type == aiohttp.WSMsgType.BINARY:
                        await ws_browser.send_bytes(msg.data)
                    elif msg.type == aiohttp.WSMsgType.TEXT:
                        await ws_browser.send_str(msg.data)
                    elif msg.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED, aiohttp.WSMsgType.ERROR):
                        return
                await ws_browser.close()

            await asyncio.gather(browser_to_pve(), pve_to_browser(),
                                  return_exceptions=True)
    except Exception as e:
        logger.warning("console proxy error vmid=%d: %s", vmid, e)
        if not ws_browser.closed:
            await ws_browser.close()
    finally:
        await session.close()

    return ws_browser
