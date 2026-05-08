"""noVNC console proxy.

Two endpoints:

  POST /api/console/prepare
      body: {cluster_id, node, vmid, password?}
      Server uses the password (prompt mode) or cluster.auth.password
      (stored mode) to mint a PVE ticket, wraps it in a single-use
      console_token, and returns it to the browser.

  GET  /api/console/{cluster_id}/{node}/{vmid}/ws?ct=<token>
      WebSocket bridge from browser to PVE noVNC.
      Looks up the console_token, uses the embedded PVE ticket as a
      PVEAuthCookie when connecting upstream (PVE's vncwebsocket refuses
      API tokens at the WS Upgrade step — long-standing PVE limitation).

Modes (from `console.mode` in config.yaml):
    'disabled' — both endpoints return 403.
    'stored'   — `password` in POST body ignored; server uses
                 cluster.auth.password from config.
    'prompt'   — server requires `password` in POST body; never persists.
"""
from __future__ import annotations

import asyncio
import logging
import ssl
from typing import Optional

import aiohttp
from aiohttp import web

from . import audit
from . import console_sessions
from . import secret_store
from .cluster_manager import cluster_manager
from .config import get_config
from .pve_throttle import throttle


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


def _check_role(request: web.Request, cluster, vmid: int, vm_name: str) -> Optional[str]:
    """Returns None on success, or an error string the caller turns into 403."""
    user_state = request.get("user")
    if user_state is None:
        return None  # auth disabled
    from . import auth as auth_mod
    tags = []
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == vmid:
            raw = getattr(vm, "tags", "") or ""
            tags = [t.strip() for t in raw.split(";") if t.strip()] if isinstance(raw, str) else list(raw)
            break
    effective = auth_mod.role_for(user_state["id"], cluster.id,
                                   vm_name=vm_name, vm_tags=tags)
    rank = {"viewer": 1, "operator": 2, "admin": 3}
    if not effective or rank.get(effective, 0) < 2:
        return "operator"
    return None


# ============================================================ /prepare

async def console_prepare_handler(request: web.Request) -> web.Response:
    """POST /api/console/prepare — mint a one-shot console_token."""
    cfg = get_config()
    mode = (cfg.console.mode or "disabled").lower()
    if mode == "disabled":
        return web.json_response(
            {"error": "console_disabled",
             "message": "Console authentication mode is 'disabled'. "
                        "Set console.mode to 'stored' or 'prompt' in config."},
            status=403,
        )

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    cluster_id = body.get("cluster_id")
    node = body.get("node")
    vmid_raw = body.get("vmid")
    pw = body.get("password") or ""
    if not cluster_id or not node or vmid_raw is None:
        return web.json_response({"error": "missing_fields"}, status=400)
    try:
        vmid = int(vmid_raw)
    except Exception:
        return web.json_response({"error": "bad_vmid"}, status=400)

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    actual_node, vm_type, vm_name = _resolve_guest(cluster, vmid)
    if not actual_node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    if actual_node != node:
        node = actual_node

    err = _check_role(request, cluster, vmid, vm_name or "")
    if err:
        return web.json_response({"error": "forbidden", "required_role": err}, status=403)

    # Decide which password to use.
    if mode == "stored":
        # Encrypted store wins; fall back to yaml only for unmigrated installs.
        pw_to_use = (
            secret_store.get(cluster_id, "pve_password")
            or (cluster.client.auth.password or "")
        ).strip()
        if not pw_to_use:
            return web.json_response(
                {"error": "no_stored_password",
                 "message": (f"console.mode='stored' but no PVE password is "
                             f"stored for cluster '{cluster_id}'. Set one in "
                             f"Settings → Clusters or run "
                             f"`jt-proxense secret set {cluster_id} pve_password`")},
                status=412,
            )
        force_fresh = False
    elif mode == "prompt":
        pw_to_use = (pw or "").strip()
        if not pw_to_use:
            return web.json_response({"error": "password_required"}, status=400)
        force_fresh = True   # never reuse a cached ticket if a fresh password came in
    else:
        return web.json_response({"error": "bad_console_mode"}, status=500)

    user_for_pve = cluster.client.auth.user or "root@pam"

    user, ip, rid = _audit_actor(request)
    audit_target = f"{cluster_id}/{node}/{vm_type}/{vmid}"

    try:
        ticket, csrf = await console_sessions.get_or_mint_pve_ticket(
            cluster_id, cluster.client, username=user_for_pve, password=pw_to_use,
            force_fresh=force_fresh,
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="console.prepare",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"mode": mode},
        )
        return web.json_response(
            {"error": "ticket_exchange_failed", "detail": str(e)},
            status=502,
        )

    # LXC → termproxy (xterm.js); QEMU → vncproxy (noVNC). Both endpoints
    # return {ticket, port}; the upstream WS URL is the same `vncwebsocket`
    # path. The auth flow differs: noVNC uses the ticket as RFB password,
    # while xterm.js's termproxy expects the bridge to send `<user>:<ticket>\n`
    # as the first WS frame.
    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        return web.json_response({"error": "no_pve_node"}, status=502)
    pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()
    api_path = "lxc" if vm_type == "lxc" else "qemu"
    is_term = (vm_type == "lxc")
    proxy_endpoint = "termproxy" if is_term else "vncproxy"
    proxy_url = (
        f"https://{pve_node_cfg.host}:{pve_node_cfg.port}"
        f"/api2/json/nodes/{node}/{api_path}/{vmid}/{proxy_endpoint}"
    )
    headers = {"Cookie": f"PVEAuthCookie={ticket}"}
    if csrf:
        headers["CSRFPreventionToken"] = csrf
    try:
        async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=pve_ssl),
        ) as cs:
            # vncproxy needs websocket=1; termproxy doesn't take that param.
            post_data = ({"websocket": 1, "generate-password": 0}
                         if not is_term else {})
            async with throttle.acquire(pve_node_cfg.host), cs.post(
                proxy_url, headers=headers, data=post_data,
            ) as r:
                if r.status != 200:
                    body = await r.text()
                    raise RuntimeError(f"{proxy_endpoint} HTTP {r.status}: {body[:200]}")
                tk = (await r.json()).get("data", {}) or {}
        proxy_ticket = tk.get("ticket") or ""
        pve_port = int(tk.get("port") or 0)
        if not proxy_ticket or not pve_port:
            raise RuntimeError(f"{proxy_endpoint} returned no ticket/port")
    except Exception as e:
        logger.warning("%s_failed in /prepare cluster=%s vmid=%d: %s",
                       proxy_endpoint, cluster_id, vmid, e)
        await audit.write(
            user=user, source_ip=ip, action="console.prepare",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"mode": mode, "kind": "term" if is_term else "vnc"},
        )
        return web.json_response(
            {"error": f"{proxy_endpoint}_failed", "detail": str(e)},
            status=502,
        )

    token = await console_sessions.mint_console_token(
        cluster_id=cluster_id, node=node, vmid=vmid,
        ticket=ticket, csrf=csrf,
        vnc_ticket=proxy_ticket, pve_port=pve_port,
        kind=("term" if is_term else "vnc"),
        pve_user=user_for_pve,
    )
    await audit.write(
        user=user, source_ip=ip, action="console.prepare",
        target=audit_target, cluster_id=cluster_id,
        result="ok", request_id=rid,
        params={"mode": mode, "kind": "term" if is_term else "vnc"},
    )
    resp: dict = {
        "ok": True,
        "console_token": token,
        "kind": "term" if is_term else "vnc",
        "ttl_seconds": console_sessions.CONSOLE_TOKEN_TTL_S,
    }
    # vnc_password (=RFB password) is only meaningful for noVNC. The term
    # bridge handles termproxy auth itself, so don't leak the ticket.
    if not is_term:
        resp["vnc_password"] = proxy_ticket
    return web.json_response(resp)


# ============================================================ /ws

async def console_ws_handler(request: web.Request) -> web.WebSocketResponse:
    """WebSocket bridge from browser to PVE noVNC.

    Path: /api/console/{cluster_id}/{node}/{vmid}/ws?ct=<console_token>
    """
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    vmid       = int(request.match_info["vmid"])

    cfg = get_config()
    mode = (cfg.console.mode or "disabled").lower()
    if mode == "disabled":
        return web.json_response({"error": "console_disabled"}, status=403)

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    actual_node, vm_type, vm_name = _resolve_guest(cluster, vmid)
    if not actual_node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    if actual_node != node:
        node = actual_node

    err = _check_role(request, cluster, vmid, vm_name or "")
    if err:
        return web.json_response({"error": "forbidden", "required_role": err}, status=403)

    # Consume the console_token (single-use).
    ct = request.query.get("ct", "")
    if not ct:
        return web.json_response({"error": "missing_console_token"}, status=400)
    entry = await console_sessions.consume_console_token(
        ct, cluster_id=cluster_id, node=node, vmid=vmid,
    )
    if entry is None:
        return web.json_response(
            {"error": "invalid_or_expired_token",
             "message": "console_token missing, expired, or didn't match this VM"},
            status=403,
        )

    user, ip, rid = _audit_actor(request)
    audit_target = f"{cluster_id}/{node}/{vm_type}/{vmid}"

    # vncproxy was already called in /prepare and the result cached on the
    # console_token. We must reuse it — minting a fresh vncproxy here would
    # invalidate the vnc_password the browser already loaded into noVNC.
    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        return web.json_response({"error": "no_pve_node"}, status=502)
    pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()
    api_path = "lxc" if vm_type == "lxc" else "qemu"

    vnc_ticket = entry.vnc_ticket
    pve_port = entry.pve_port
    if not vnc_ticket or not pve_port:
        return web.json_response(
            {"error": "stale_token",
             "message": "console_token has no vncproxy data — re-open the console"},
            status=409,
        )

    # Accept the browser WS upgrade.
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

    # vnc tickets contain ':', '+', '/', '=' — URL-encode so the WS upgrade
    # request line is well-formed. PVE returns the ticket already trimmed.
    from urllib.parse import quote as _q
    pve_url = (
        f"wss://{pve_node_cfg.host}:{pve_node_cfg.port}"
        f"/api2/json/nodes/{node}/{api_path}/{vmid}/vncwebsocket"
        f"?port={pve_port}&vncticket={_q(vnc_ticket, safe='')}"
    )

    # !!! KEY DIFFERENCE FROM TOKEN AUTH !!!
    # vncwebsocket needs PVEAuthCookie. Use the ticket we minted in /prepare
    # (or the cache, in stored mode).
    # Send via raw Cookie header — see vncproxy block above for why.
    ws_headers = {"Cookie": f"PVEAuthCookie={entry.pve_ticket}"}

    session = aiohttp.ClientSession(
        connector=aiohttp.TCPConnector(ssl=pve_ssl),
    )
    logger.info("vncwebsocket connecting cluster=%s node=%s vmid=%d port=%s",
                cluster_id, node, vmid, pve_port)
    ws_pve = None
    try:
        # Throttle the WS handshake only — pveproxy charges its single-process
        # cost during the upgrade. Once the bridge is up the slot is released;
        # otherwise N concurrent consoles would deadlock the per-host limiter
        # (4-slot semaphore vs. arbitrarily many sessions).
        async with throttle.acquire(pve_node_cfg.host):
            ws_pve = await session.ws_connect(
                pve_url, protocols=("binary",), max_msg_size=0,
                headers=ws_headers,
            )

        async def browser_to_pve():
            async for msg in ws_browser:
                if msg.type == aiohttp.WSMsgType.BINARY:
                    await ws_pve.send_bytes(msg.data)
                elif msg.type == aiohttp.WSMsgType.TEXT:
                    await ws_pve.send_str(msg.data)
                elif msg.type in (aiohttp.WSMsgType.CLOSE,
                                  aiohttp.WSMsgType.CLOSED,
                                  aiohttp.WSMsgType.ERROR):
                    return
            await ws_pve.close()

        async def pve_to_browser():
            async for msg in ws_pve:
                if msg.type == aiohttp.WSMsgType.BINARY:
                    await ws_browser.send_bytes(msg.data)
                elif msg.type == aiohttp.WSMsgType.TEXT:
                    await ws_browser.send_str(msg.data)
                elif msg.type in (aiohttp.WSMsgType.CLOSE,
                                  aiohttp.WSMsgType.CLOSED,
                                  aiohttp.WSMsgType.ERROR):
                    return
            await ws_browser.close()

        await asyncio.gather(browser_to_pve(), pve_to_browser(),
                              return_exceptions=True)
    except Exception as e:
        logger.warning("console proxy error vmid=%d: %s", vmid, e)
        if not ws_browser.closed:
            await ws_browser.close()
    finally:
        if ws_pve is not None and not ws_pve.closed:
            await ws_pve.close()
        await session.close()

    return ws_browser


# ============================================================ /term/ws  (LXC)

async def console_term_ws_handler(request: web.Request) -> web.WebSocketResponse:
    """xterm.js termproxy bridge for LXC containers.

    Path: /api/console/{cluster_id}/{node}/{vmid}/term/ws?ct=<console_token>

    PVE termproxy quirks:
      1. WS upgrade hits the same `/vncwebsocket` URL as VNC, with
         ?port=<termproxy_port>&vncticket=<termproxy_ticket>.
      2. The first frame from the *client* must be `<user>:<ticket>\\n`
         (text). We send this from the bridge so the browser never sees
         the raw ticket.
      3. PVE then replies with a single byte 'O' meaning auth OK.
      4. After that, both directions speak PVE's term-channel framing —
         the browser sends `0:<bytelen>:<data>` for stdin, `1:<cols>:<rows>:`
         for resize, and PVE sends raw stdout. The bridge stays
         transparent past the auth handshake.
    """
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    vmid       = int(request.match_info["vmid"])

    cfg = get_config()
    mode = (cfg.console.mode or "disabled").lower()
    if mode == "disabled":
        return web.json_response({"error": "console_disabled"}, status=403)

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    actual_node, vm_type, vm_name = _resolve_guest(cluster, vmid)
    if not actual_node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    if actual_node != node:
        node = actual_node

    err = _check_role(request, cluster, vmid, vm_name or "")
    if err:
        return web.json_response({"error": "forbidden", "required_role": err}, status=403)

    ct = request.query.get("ct", "")
    if not ct:
        return web.json_response({"error": "missing_console_token"}, status=400)
    entry = await console_sessions.consume_console_token(
        ct, cluster_id=cluster_id, node=node, vmid=vmid,
    )
    if entry is None or entry.kind != "term":
        return web.json_response(
            {"error": "invalid_or_expired_token"},
            status=403,
        )

    user, ip, rid = _audit_actor(request)
    audit_target = f"{cluster_id}/{node}/{vm_type}/{vmid}"

    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        return web.json_response({"error": "no_pve_node"}, status=502)
    pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()
    api_path = "lxc" if vm_type == "lxc" else "qemu"
    if not entry.vnc_ticket or not entry.pve_port:
        return web.json_response({"error": "stale_token"}, status=409)

    from urllib.parse import quote as _q
    pve_url = (
        f"wss://{pve_node_cfg.host}:{pve_node_cfg.port}"
        f"/api2/json/nodes/{node}/{api_path}/{vmid}/vncwebsocket"
        f"?port={entry.pve_port}&vncticket={_q(entry.vnc_ticket, safe='')}"
    )
    ws_headers = {"Cookie": f"PVEAuthCookie={entry.pve_ticket}"}

    ws_browser = web.WebSocketResponse(max_msg_size=0, heartbeat=30)
    if not ws_browser.can_prepare(request).ok:
        return web.json_response({"error": "expected_ws_upgrade"}, status=400)
    await ws_browser.prepare(request)

    await audit.write(
        user=user, source_ip=ip, action="console.open",
        target=audit_target, cluster_id=cluster_id,
        result="ok", request_id=rid, params={"kind": "term"},
    )

    logger.info("termproxy connecting cluster=%s node=%s vmid=%d port=%s",
                cluster_id, node, vmid, entry.pve_port)
    session = aiohttp.ClientSession(
        connector=aiohttp.TCPConnector(ssl=pve_ssl),
    )
    ws_pve = None
    try:
        # Throttle handshake only (see vncwebsocket bridge above for rationale).
        async with throttle.acquire(pve_node_cfg.host):
            ws_pve = await session.ws_connect(
                pve_url, max_msg_size=0, headers=ws_headers,
            )
        # Auth: send `<user>:<ticket>\n` to PVE; never to the browser.
        await ws_pve.send_str(f"{entry.pve_user}:{entry.vnc_ticket}\n")

        async def browser_to_pve():
            async for msg in ws_browser:
                if msg.type == aiohttp.WSMsgType.TEXT:
                    await ws_pve.send_str(msg.data)
                elif msg.type == aiohttp.WSMsgType.BINARY:
                    await ws_pve.send_bytes(msg.data)
                elif msg.type in (aiohttp.WSMsgType.CLOSE,
                                   aiohttp.WSMsgType.CLOSED,
                                   aiohttp.WSMsgType.ERROR):
                    return
            await ws_pve.close()

        async def pve_to_browser():
            async for msg in ws_pve:
                if msg.type == aiohttp.WSMsgType.TEXT:
                    await ws_browser.send_str(msg.data)
                elif msg.type == aiohttp.WSMsgType.BINARY:
                    await ws_browser.send_bytes(msg.data)
                elif msg.type in (aiohttp.WSMsgType.CLOSE,
                                   aiohttp.WSMsgType.CLOSED,
                                   aiohttp.WSMsgType.ERROR):
                    return
            await ws_browser.close()

        await asyncio.gather(browser_to_pve(), pve_to_browser(),
                              return_exceptions=True)
    except Exception as e:
        logger.warning("term proxy error vmid=%d: %s", vmid, e)
        if not ws_browser.closed:
            await ws_browser.close()
    finally:
        if ws_pve is not None and not ws_pve.closed:
            await ws_pve.close()
        await session.close()

    return ws_browser
