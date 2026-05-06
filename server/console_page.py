"""Cyberpunk noVNC console page.

Visiting /console/{cluster}/{node}/{vmid} loads a small page that:
  - Connects to /api/console/{cluster}/{node}/{vmid}/ws (our WS bridge)
  - Renders the VM's screen via noVNC's RFB.js (loaded as ESM from CDN)
  - Wraps in our cyberpunk frame: title bar with VM name, connection
    status pill, send-Ctrl-Alt-Del + fullscreen + reconnect buttons.

Anonymous → 302 /login (the @auth_required decorator). Operator+ role
required for the underlying WS bridge (enforced in console_proxy).

Air-gapped operators: replace the noVNC import URL with a vendored copy
served from /assets/novnc/.
"""
from __future__ import annotations

import json

from aiohttp import web

from .middleware import auth_required


# Plain template with {{name}} placeholders — NOT an f-string, so the
# CSS/JS curly braces don't have to be escaped.
_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JT-PROXENSE — Console {{VMID}}@{{NODE}}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <style>
        :root {
            --bg: #050810; --bg-elev: #0d1320;
            --cyan: #00f0ff; --cyan-soft: rgba(0,240,255,.18);
            --magenta: #bf00ff; --green: #00ff88; --red: #ff3860;
            --orange: #ff8a3c;
            --text: #e6f6ff; --text-dim: #95a8c4; --text-muted: #6b7c93;
            --border: rgba(0,240,255,.16);
        }
        @font-face { font-family: Orbitron; src: url(/fonts/orbitron-700.woff2) format('woff2'); font-weight: 700; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-400.woff2) format('woff2'); font-weight: 400; }
        @font-face { font-family: 'Share Tech Mono'; src: url(/fonts/share-tech-mono-400.woff2) format('woff2'); }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; height: 100vh; background: var(--bg); color: var(--text); font-family: Rajdhani, system-ui, sans-serif; overflow: hidden; }
        body::after { content:''; position: fixed; inset: 0; pointer-events: none; background-image: repeating-linear-gradient(180deg, transparent 0, transparent 2px, rgba(255,255,255,.012) 2px, rgba(255,255,255,.012) 3px); z-index: 99; }
        @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.35} }
        .frame { display: flex; flex-direction: column; height: 100vh; }
        .titlebar {
            display: flex; align-items: center; gap: 12px;
            padding: 10px 18px;
            background: var(--bg-elev);
            border-bottom: 1px solid var(--border);
            font-family: Orbitron, sans-serif;
            letter-spacing: .08em; font-size: 12px; text-transform: uppercase;
        }
        .titlebar .name { color: var(--cyan); }
        .titlebar .meta { color: var(--text-dim); font-family: 'Share Tech Mono', monospace; font-size: 11px; }
        .titlebar .right { margin-left: auto; display: flex; gap: 8px; align-items: center; }
        .pill {
            display: inline-flex; align-items: center; gap: 6px;
            font-family: 'Share Tech Mono', monospace; font-size: 10px;
            padding: 3px 10px; border-radius: 999px;
            border: 1px solid currentColor;
            text-transform: uppercase; letter-spacing: .08em;
        }
        .pill::before {
            content:''; width: 6px; height: 6px; border-radius: 50%;
            background: currentColor; box-shadow: 0 0 6px currentColor;
            animation: pulseDot 1.6s ease-in-out infinite;
        }
        .pill.connecting { color: var(--orange); }
        .pill.connected  { color: var(--green); }
        .pill.error      { color: var(--red); }
        .pill.closed     { color: var(--text-muted); }
        button {
            padding: 6px 12px;
            font-family: Orbitron, sans-serif;
            font-size: 10px; letter-spacing: .08em; text-transform: uppercase;
            color: var(--cyan);
            background: rgba(0,240,255,.05);
            border: 1px solid var(--cyan-soft); border-radius: 4px;
            cursor: pointer;
            transition: background .12s, border-color .12s;
        }
        button:hover { background: rgba(0,240,255,.18); }
        button:disabled { opacity: .4; cursor: not-allowed; }
        #screen { flex: 1; min-height: 0; background: #000; position: relative; overflow: hidden; }
        #screen > div { position: absolute; inset: 0; }
        .overlay {
            position: absolute; inset: 0;
            display: flex; align-items: center; justify-content: center;
            color: var(--text-dim);
            font-family: 'Share Tech Mono', monospace;
            font-size: 13px; letter-spacing: .08em;
            background: rgba(5, 8, 16, .82);
            backdrop-filter: blur(2px);
            z-index: 10;
            text-align: center; padding: 24px;
        }
        .overlay.hidden { display: none; }
        .overlay .lead { display: block; color: var(--cyan); margin-bottom: 8px; font-family: Orbitron, sans-serif; font-size: 14px; letter-spacing: .12em; text-transform: uppercase; }
    </style>
</head>
<body>
<div class="frame">
    <div class="titlebar">
        <span class="name">VM {{VMID}}</span>
        <span class="meta">{{CLUSTER}} / {{NODE}}</span>
        <div class="right">
            <span id="status" class="pill connecting">connecting</span>
            <button id="cad" disabled title="Send Ctrl+Alt+Del to guest">Ctrl-Alt-Del</button>
            <button id="reconnect" disabled>Reconnect</button>
            <button id="full" disabled>Fullscreen</button>
        </div>
    </div>
    <div id="screen">
        <div id="overlay" class="overlay">
            <div>
                <span class="lead">// initialising</span>
                <span id="overlay-msg">opening WebSocket bridge to PVE&hellip;</span>
            </div>
        </div>
    </div>
</div>

<script type="module">
import RFB from 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.5.0/lib/rfb.js';

const CLUSTER = {{CLUSTER_JSON}};
const NODE    = {{NODE_JSON}};
const VMID    = {{VMID}};

const $ = (id) => document.getElementById(id);
const statusEl = $('status');
const overlay  = $('overlay');
const overlayMsg = $('overlay-msg');
const cad = $('cad');
const recon = $('reconnect');
const fs = $('full');

let rfb = null;

function setStatus(state, msg) {
    statusEl.className = 'pill ' + state;
    statusEl.textContent = state;
    if (msg) { overlayMsg.textContent = msg; overlay.classList.remove('hidden'); }
}

function connect() {
    overlay.classList.remove('hidden');
    setStatus('connecting', 'opening WebSocket bridge to PVE…');
    const wsScheme = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = wsScheme + '//' + location.host
        + '/api/console/' + encodeURIComponent(CLUSTER)
        + '/' + encodeURIComponent(NODE) + '/' + VMID + '/ws';

    try {
        rfb = new RFB($('screen'), url, {
            credentials: { password: '' },
            shared: true,
            wsProtocols: ['binary'],
        });
    } catch (e) {
        setStatus('error', 'noVNC init failed: ' + (e && e.message || e));
        recon.disabled = false;
        return;
    }
    rfb.viewOnly = false;
    rfb.scaleViewport = true;
    rfb.resizeSession = false;
    rfb.background = '#050810';

    rfb.addEventListener('connect', () => {
        setStatus('connected');
        overlay.classList.add('hidden');
        cad.disabled = false; recon.disabled = false; fs.disabled = false;
    });
    rfb.addEventListener('disconnect', (ev) => {
        cad.disabled = true; fs.disabled = true; recon.disabled = false;
        if (ev.detail && ev.detail.clean) {
            setStatus('closed', 'connection closed cleanly. Reconnect?');
        } else {
            setStatus('error', 'connection dropped: ' + (ev.detail && ev.detail.reason || 'unknown'));
        }
    });
    rfb.addEventListener('credentialsrequired', () => {
        setStatus('error', 'VNC asked for credentials — not handled via API token; set a VNC password on the VM, or supply via UI.');
    });
    rfb.addEventListener('securityfailure', (ev) => {
        setStatus('error', 'VNC handshake failed: ' + (ev.detail && ev.detail.reason || 'unknown'));
    });
}

cad.addEventListener('click', () => { if (rfb) rfb.sendCtrlAltDel(); });
recon.addEventListener('click', () => {
    if (rfb) { try { rfb.disconnect(); } catch (_) {} }
    connect();
});
fs.addEventListener('click', () => {
    const el = $('screen');
    if (!document.fullscreenElement) { el.requestFullscreen && el.requestFullscreen(); }
    else { document.exitFullscreen && document.exitFullscreen(); }
});

connect();
</script>
</body>
</html>
"""


@auth_required
async def console_page_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    vmid = int(request.match_info["vmid"])

    html = (_TEMPLATE
            .replace("{{VMID}}", str(vmid))
            .replace("{{NODE}}", node)
            .replace("{{CLUSTER}}", cluster_id)
            .replace("{{CLUSTER_JSON}}", json.dumps(cluster_id))
            .replace("{{NODE_JSON}}", json.dumps(node)))

    return web.Response(
        text=html,
        content_type="text/html", charset="utf-8",
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            # noVNC needs to load from jsdelivr — adjust CSP narrowly
            "Content-Security-Policy":
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
                "style-src 'self' 'unsafe-inline'; "
                "font-src 'self' data:; "
                "img-src 'self' data:; "
                "connect-src 'self' https://cdn.jsdelivr.net wss: ws:;",
        },
    )
