"""PVE host shell — xterm.js terminal directly to the PVE node host
(equivalent of clicking "Shell" on a node in the PVE web UI). Wraps
PVE's host-level termproxy: same auth dance as the LXC console_proxy
but the URL has no qemu/lxc/{vmid} segment.

Routes:
  POST /api/console/host/prepare                 body: {cluster_id, node, password?}
  GET  /api/console/host/{cid}/{node}/term/ws?ct=<token>     WS bridge
  GET  /console-host/{cid}/{node}?ct=<token>&lang=zh-TW      xterm.js HTML page

Permissions: admin only. Operators with shell access on a PVE host
effectively have full cluster control, so we don't expose this to lower
roles. Audited like every other operator action.
"""
from __future__ import annotations

import asyncio
import logging
from urllib.parse import quote as _q
import ssl
import json
import html as _html
from typing import Optional

import aiohttp
from aiohttp import web

from .cluster_manager import cluster_manager
from . import audit
from . import console_sessions
from . import secret_store
from .config import get_config
from .middleware import role_required
from .pve_throttle import throttle


logger = logging.getLogger(__name__)


@role_required("admin")
async def host_shell_prepare_handler(request: web.Request) -> web.Response:
    """POST /api/console/host/prepare — mint a one-shot console_token for
    a PVE host shell. Same modes as the VM console (`stored` / `prompt`)."""
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
    node       = body.get("node")
    pw         = body.get("password") or ""
    if not cluster_id or not node:
        return web.json_response({"error": "missing_fields"}, status=400)

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        return web.json_response({"error": "no_pve_node"}, status=502)
    pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()

    user = (request.get("user") or {}).get("username", "anonymous")
    ip   = request.get("client_ip", "unknown")
    rid  = request.get("request_id", "")
    audit_target = f"{cluster_id}/{node}/host"

    # Decide which password to use (mirrors console_proxy._prepare).
    if mode == "stored":
        pw_to_use = (
            secret_store.get(cluster_id, "pve_password")
            or (cluster.client.auth.password or "")
        ).strip()
        if not pw_to_use:
            return web.json_response(
                {"error": "no_stored_password",
                 "message": (f"console.mode='stored' but no PVE password is "
                             f"stored for cluster '{cluster_id}'.")},
                status=412,
            )
        force_fresh = False
    elif mode == "prompt":
        pw_to_use = (pw or "").strip()
        if not pw_to_use:
            return web.json_response(
                {"error": "password_required",
                 "message": "console.mode='prompt' but no password supplied."},
                status=400,
            )
        force_fresh = True
    else:
        return web.json_response(
            {"error": "unknown_mode", "message": f"unknown console.mode={mode!r}"},
            status=500,
        )

    user_for_pve = (cluster.client.auth.username or "root@pam").strip()
    try:
        ticket, csrf = await console_sessions.get_or_mint_pve_ticket(
            cluster_id, cluster.client,
            username=user_for_pve, password=pw_to_use,
            force_fresh=force_fresh,
        )
    except Exception as e:
        logger.warning("ticket exchange failed for host shell: %s", e)
        return web.json_response(
            {"error": "auth_failed", "detail": str(e)},
            status=502,
        )

    # POST /nodes/{node}/termproxy → returns {ticket, port}. PVEAuthCookie
    # MUST be sent as a raw Cookie header (cookies={} would percent-encode).
    proxy_url = (
        f"https://{pve_node_cfg.host}:{pve_node_cfg.port}"
        f"/api2/json/nodes/{_q(node, safe='')}/termproxy"
    )
    headers = {
        "Cookie": f"PVEAuthCookie={ticket}",
    }
    if csrf:
        headers["CSRFPreventionToken"] = csrf
    try:
        async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=pve_ssl),
        ) as cs:
            async with throttle.acquire(pve_node_cfg.host), cs.post(
                proxy_url, headers=headers, data={},
            ) as r:
                if r.status != 200:
                    body_t = await r.text()
                    raise RuntimeError(f"termproxy HTTP {r.status}: {body_t[:200]}")
                tk = (await r.json()).get("data", {}) or {}
        proxy_ticket = tk.get("ticket") or ""
        pve_port     = int(tk.get("port") or 0)
        if not proxy_ticket or not pve_port:
            raise RuntimeError("termproxy returned no ticket/port")
    except Exception as e:
        logger.warning("host_termproxy failed cluster=%s node=%s: %s",
                       cluster_id, node, e)
        await audit.write(
            user=user, source_ip=ip, action="console.host.prepare",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"mode": mode},
        )
        return web.json_response(
            {"error": "termproxy_failed", "detail": str(e)},
            status=502,
        )

    token = await console_sessions.mint_console_token(
        cluster_id=cluster_id, node=node, vmid=0,
        ticket=ticket, csrf=csrf,
        vnc_ticket=proxy_ticket, pve_port=pve_port,
        kind="host_term",
        pve_user=user_for_pve,
    )
    await audit.write(
        user=user, source_ip=ip, action="console.host.prepare",
        target=audit_target, cluster_id=cluster_id,
        result="ok", request_id=rid, params={"mode": mode},
    )
    return web.json_response({
        "ok": True,
        "console_token": token,
        "kind": "host_term",
        "ttl_seconds": console_sessions.CONSOLE_TOKEN_TTL_S,
    })


@role_required("admin")
async def host_shell_term_ws_handler(request: web.Request) -> web.WebSocketResponse:
    """GET /api/console/host/{cid}/{node}/term/ws?ct=<token>"""
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    ct         = request.query.get("ct", "")

    entry = await console_sessions.consume_console_token(
        ct, cluster_id=cluster_id, node=node, vmid=0,
    )
    if entry is None or (entry.kind or "") != "host_term":
        ws = web.WebSocketResponse()
        if not ws.can_prepare(request).ok:
            return web.json_response({"error": "expected_ws_upgrade"}, status=400)
        await ws.prepare(request)
        await ws.close(code=4401, message=b"bad_or_used_token")
        return ws

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        return web.json_response({"error": "no_pve_node"}, status=502)
    pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()

    if not entry.vnc_ticket or not entry.pve_port:
        return web.json_response({"error": "stale_token"}, status=409)

    user = (request.get("user") or {}).get("username", "anonymous")
    ip   = request.get("client_ip", "unknown")
    rid  = request.get("request_id", "")

    from urllib.parse import quote as _q
    pve_url = (
        f"wss://{pve_node_cfg.host}:{pve_node_cfg.port}"
        f"/api2/json/nodes/{_q(node, safe='')}/vncwebsocket"
        f"?port={entry.pve_port}&vncticket={_q(entry.vnc_ticket, safe='')}"
    )
    ws_headers = {"Cookie": f"PVEAuthCookie={entry.pve_ticket}"}

    ws_browser = web.WebSocketResponse(max_msg_size=0, heartbeat=30)
    if not ws_browser.can_prepare(request).ok:
        return web.json_response({"error": "expected_ws_upgrade"}, status=400)
    await ws_browser.prepare(request)

    await audit.write(
        user=user, source_ip=ip, action="console.host.open",
        target=f"{cluster_id}/{node}/host",
        cluster_id=cluster_id, result="ok", request_id=rid, params={"kind": "host_term"},
    )

    logger.info("host termproxy connecting cluster=%s node=%s port=%s",
                cluster_id, node, entry.pve_port)
    session = aiohttp.ClientSession(
        connector=aiohttp.TCPConnector(ssl=pve_ssl),
    )
    ws_pve = None
    try:
        async with throttle.acquire(pve_node_cfg.host):
            ws_pve = await session.ws_connect(
                pve_url, max_msg_size=0, headers=ws_headers,
            )
        # Same termproxy auth frame as LXC: '<user>:<ticket>\n'.
        await ws_pve.send_str(f"{entry.pve_user}:{entry.vnc_ticket}\n")

        async def browser_to_pve():
            async for msg in ws_browser:
                if msg.type == aiohttp.WSMsgType.TEXT:
                    await ws_pve.send_str(msg.data)
                elif msg.type == aiohttp.WSMsgType.BINARY:
                    await ws_pve.send_bytes(msg.data)
                elif msg.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED, aiohttp.WSMsgType.ERROR):
                    return
            await ws_pve.close()

        async def pve_to_browser():
            async for msg in ws_pve:
                if msg.type == aiohttp.WSMsgType.TEXT:
                    await ws_browser.send_str(msg.data)
                elif msg.type == aiohttp.WSMsgType.BINARY:
                    await ws_browser.send_bytes(msg.data)
                elif msg.type in (aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED, aiohttp.WSMsgType.ERROR):
                    return
            await ws_browser.close()

        await asyncio.gather(browser_to_pve(), pve_to_browser(),
                              return_exceptions=True)
    except Exception as e:
        logger.warning("host shell proxy error node=%s: %s", node, e)
        if not ws_browser.closed:
            await ws_browser.close()
    finally:
        if ws_pve is not None and not ws_pve.closed:
            await ws_pve.close()
        await session.close()

    return ws_browser


# Minimal HTML — re-uses console_term_page's aesthetic (cyber pill / Orbitron
# / Rajdhani / Share Tech Mono) and embeds xterm.js. Different ws path
# (no vmid segment) so we can't share the file as-is.
_HTML = """<!DOCTYPE html>
<html lang="{{HTML_LANG}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{VM_TITLE}}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="stylesheet" href="/assets/xterm/xterm.css">
    <script src="/assets/xterm/xterm.js"></script>
    <script src="/assets/xterm/xterm-addon-fit.js"></script>
    <style>
        :root { --bg:#050810; --bg-elev:#0d1320; --cyan:#00f0ff;
                --cyan-soft:rgba(0,240,255,.18); --magenta:#bf00ff;
                --green:#00ff88; --red:#ff3860; --orange:#ff8a3c;
                --text:#e6f6ff; --text-dim:#95a8c4; --text-muted:#6b7c93;
                --border:rgba(0,240,255,.16); }
        @font-face { font-family: Orbitron; src: url(/fonts/orbitron-700.woff2) format('woff2'); font-weight: 700; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-400.woff2) format('woff2'); font-weight: 400; }
        @font-face { font-family: 'Share Tech Mono'; src: url(/fonts/share-tech-mono-400.woff2) format('woff2'); }
        * { box-sizing: border-box; }
        html,body { margin:0; padding:0; height:100vh; background:var(--bg); color:var(--text); font-family:Rajdhani,system-ui,sans-serif; overflow:hidden; }
        .frame { display:flex; flex-direction:column; height:100vh; }
        .titlebar { display:flex; align-items:center; gap:12px; padding:10px 18px; background:var(--bg-elev); border-bottom:1px solid var(--border); font-family:Orbitron,sans-serif; letter-spacing:.08em; font-size:12px; text-transform:uppercase; }
        .titlebar .name { color:var(--cyan); display:flex; align-items:center; gap:8px; }
        .titlebar .meta { color:var(--text-dim); font-family:'Share Tech Mono',monospace; font-size:11px; }
        .titlebar .right { margin-left:auto; display:flex; gap:8px; align-items:center; }
        .pill { display:inline-flex; align-items:center; gap:6px; font-family:'Share Tech Mono',monospace; font-size:10px; padding:3px 10px; border-radius:999px; border:1px solid currentColor; text-transform:uppercase; letter-spacing:.08em; }
        .pill::before { content:''; width:6px; height:6px; border-radius:50%; background:currentColor; box-shadow:0 0 6px currentColor; animation:pulseDot 1.6s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100% { opacity:1; } 50% { opacity:.45; } }
        .pill.connecting { color:var(--orange); }
        .pill.connected  { color:var(--green); }
        .pill.error      { color:var(--red); }
        .pill.closed     { color:var(--text-muted); }
        button { display:inline-flex; align-items:center; gap:6px; padding:6px 12px; font-family:Orbitron,sans-serif; font-size:10px; letter-spacing:.08em; text-transform:uppercase; color:var(--cyan); background:rgba(0,240,255,.05); border:1px solid var(--cyan-soft); border-radius:4px; cursor:pointer; transition:background .12s,border-color .12s; }
        button:hover:not(:disabled) { background:rgba(0,240,255,.18); }
        button:disabled { opacity:.4; cursor:not-allowed; }
        #term { flex:1; padding:6px; }
        .overlay { position:absolute; inset:0; background:rgba(5,8,16,.92); display:flex; align-items:center; justify-content:center; z-index:50; pointer-events:none; }
        .overlay.hidden { display:none; }
        .overlay .lead { display:block; color:var(--cyan); margin-bottom:8px; font-family:Orbitron,sans-serif; font-size:14px; letter-spacing:.12em; text-transform:uppercase; }
    </style>
</head>
<body>
<div class="frame">
    <div class="titlebar">
        <span class="name">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            {{HEADING}}
        </span>
        <span class="meta">{{CLUSTER}} / {{NODE}} (host)</span>
        <div class="right">
            <span id="status" class="pill connecting">{{T_STATUS_CONNECTING}}</span>
            <button id="reconnect" disabled>{{T_BTN_RECONNECT}}</button>
            <button id="full" disabled>{{T_BTN_FULLSCREEN}}</button>
        </div>
    </div>
    <div id="term" style="position:relative">
        <div id="overlay" class="overlay">
            <div>
                <span class="lead">{{T_OVERLAY_LEAD}}</span>
                <span id="overlay-msg">{{T_OVERLAY_MSG}}</span>
            </div>
        </div>
    </div>
</div>
<script>
const I18N = {{I18N_JSON}};
const CLUSTER = {{CLUSTER_JSON}};
const NODE    = {{NODE_JSON}};
let term, fitAddon, socket;
let activeToken = new URLSearchParams(location.search).get('ct') || '';
let authed = false;
const $ = (id) => document.getElementById(id);
const statusEl = $('status');
const overlay = $('overlay');
const overlayMsg = $('overlay-msg');
const recon = $('reconnect');
const full  = $('full');

function setStatus(state, msg) {
    statusEl.className = 'pill ' + state;
    statusEl.textContent = I18N['status_' + state] || state;
    if (msg) { overlayMsg.textContent = msg; overlay.classList.remove('hidden'); }
}

async function ensureToken() {
    if (activeToken) return activeToken;
    const r = await fetch('/api/console/host/prepare', {
        method: 'POST', credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({cluster_id: CLUSTER, node: NODE}),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok && d.console_token) { activeToken = d.console_token; return activeToken; }
    throw new Error(d.error || ('HTTP ' + r.status));
}

function pveSendStdin(data) {
    if (!socket || socket.readyState !== 1) return;
    const enc = new TextEncoder();
    const bytes = enc.encode(data);
    socket.send('0:' + bytes.length + ':' + data);
}
function pveSendResize(cols, rows) {
    if (!socket || socket.readyState !== 1) return;
    socket.send('1:' + cols + ':' + rows + ':');
}

async function connect() {
    overlay.classList.remove('hidden');
    setStatus('connecting', I18N.overlay_msg);
    if (term) { try { term.dispose(); } catch (_) {} }
    /* eslint-disable no-undef */
    term = new Terminal({
        cursorBlink: true,
        fontFamily: '"Share Tech Mono", "Fira Mono", Menlo, monospace',
        fontSize: 14,
        theme: { background: '#000000', foreground: '#e6f6ff', cursor: '#00f0ff', cursorAccent: '#000000', selectionBackground: 'rgba(0,240,255,.35)' },
        scrollback: 5000,
    });
    fitAddon = new FitAddon.FitAddon();
    /* eslint-enable no-undef */
    term.loadAddon(fitAddon);
    term.open($('term'));
    fitAddon.fit();

    let token;
    try { token = await ensureToken(); }
    catch (e) {
        setStatus('error', I18N.err_init + (e && e.message || e));
        recon.disabled = false;
        return;
    }

    const wsScheme = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = wsScheme + '//' + location.host
        + '/api/console/host/' + encodeURIComponent(CLUSTER)
        + '/' + encodeURIComponent(NODE) + '/term/ws'
        + '?ct=' + encodeURIComponent(token);
    activeToken = '';
    authed = false;

    socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';

    socket.addEventListener('open', () => {
        // termproxy bridge handles auth on the server side.
    });
    socket.addEventListener('message', (ev) => {
        const data = ev.data;
        if (!authed) {
            // PVE sends 'O' once auth handshake completes.
            if (typeof data === 'string' && data.charCodeAt(0) === 79) {
                authed = true;
                setStatus('connected');
                overlay.classList.add('hidden');
                recon.disabled = true; full.disabled = false;
                pveSendResize(term.cols, term.rows);
                return;
            }
            return;
        }
        if (typeof data === 'string') term.write(data);
        else term.write(new Uint8Array(data));
    });
    socket.addEventListener('close', () => {
        setStatus('closed', I18N.msg_closed_clean || 'closed');
        recon.disabled = false; full.disabled = true;
    });
    socket.addEventListener('error', () => {
        setStatus('error', I18N.err_handshake || 'error');
        recon.disabled = false; full.disabled = true;
    });

    term.onData((data) => pveSendStdin(data));
    term.onResize((sz) => pveSendResize(sz.cols, sz.rows));
    window.addEventListener('resize', () => fitAddon && fitAddon.fit());
}

recon.addEventListener('click', () => connect());
full.addEventListener('click', () => {
    const el = document.documentElement;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
});

connect();
</script>
</body>
</html>
"""


_I18N = {
    "en": {
        "status_connecting": "connecting", "status_connected": "connected",
        "status_error": "error", "status_closed": "closed",
        "btn_reconnect": "Reconnect", "btn_fullscreen": "Fullscreen",
        "overlay_lead": "// initialising", "overlay_msg": "opening host shell bridge…",
        "msg_closed_clean": "connection closed", "err_init": "init failed: ",
        "err_handshake": "handshake failed",
    },
    "zh-TW": {
        "status_connecting": "連線中", "status_connected": "已連線",
        "status_error": "錯誤", "status_closed": "已關閉",
        "btn_reconnect": "重新連線", "btn_fullscreen": "全螢幕",
        "overlay_lead": "// 初始化中", "overlay_msg": "正在開啟主機 Shell 通道…",
        "msg_closed_clean": "連線已關閉", "err_init": "初始化失敗：",
        "err_handshake": "握手失敗",
    },
}


def _pick_lang(request: web.Request) -> str:
    q = request.query.get("lang", "")
    if q in _I18N:
        return q
    accept = request.headers.get("Accept-Language", "")
    if accept.lower().startswith("zh"):
        return "zh-TW"
    return "en"


@role_required("admin")
async def host_shell_page_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    lang = _pick_lang(request)
    s = _I18N[lang]
    heading = f"shell · {node}"
    page_title = f"JT-PROXENSE — {heading}"
    out = (_HTML
            .replace("{{HTML_LANG}}", lang)
            .replace("{{NODE}}", node)
            .replace("{{CLUSTER}}", cluster_id)
            .replace("{{CLUSTER_JSON}}", json.dumps(cluster_id))
            .replace("{{NODE_JSON}}", json.dumps(node))
            .replace("{{I18N_JSON}}", json.dumps(s, ensure_ascii=False))
            .replace("{{HEADING}}", _html.escape(heading))
            .replace("{{VM_TITLE}}", _html.escape(page_title))
            .replace("{{T_STATUS_CONNECTING}}", s["status_connecting"])
            .replace("{{T_BTN_RECONNECT}}", s["btn_reconnect"])
            .replace("{{T_BTN_FULLSCREEN}}", s["btn_fullscreen"])
            .replace("{{T_OVERLAY_LEAD}}", s["overlay_lead"])
            .replace("{{T_OVERLAY_MSG}}", s["overlay_msg"]))
    return web.Response(
        text=out,
        content_type="text/html", charset="utf-8",
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Content-Security-Policy":
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline'; "
                "style-src 'self' 'unsafe-inline'; "
                "font-src 'self' data:; "
                "img-src 'self' data:; "
                "connect-src 'self' wss: ws:;",
        },
    )


ROUTES = [
    ("POST", "/api/console/host/prepare",                                host_shell_prepare_handler),
    ("GET",  r"/api/console/host/{cluster_id}/{node}/term/ws",           host_shell_term_ws_handler),
    ("GET",  r"/console-host/{cluster_id}/{node}",                       host_shell_page_handler),
]
