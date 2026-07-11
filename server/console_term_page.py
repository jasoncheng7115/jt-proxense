"""xterm.js console page for LXC containers.

LXC has no framebuffer, so PVE serves a plain shell over termproxy. This
page mirrors the noVNC console_page.py structure but loads xterm.js
(vendored under /assets/xterm/) and speaks PVE's term-channel framing:

  - Browser → server: `0:<bytelen>:<data>` for stdin, `1:<cols>:<rows>:`
    for resize. The bridge forwards verbatim to PVE.
  - Server → browser: raw stdout text (the bridge handles auth itself,
    so the browser only sees terminal data after auth succeeds).
  - The very first server message is a single byte 'O' meaning auth OK
    — we treat that as the "connected" signal.

Anonymous → 302 /login (auth_required). operator+ role required for the
underlying WS bridge.

Language: ?lang=zh-TW > Accept-Language > 'en'.
"""
from __future__ import annotations

import html as _html
import json

from aiohttp import web

from .middleware import auth_required


_I18N: dict[str, dict[str, str]] = {
    "en": {
        "status_connecting":   "connecting",
        "status_connected":    "connected",
        "status_error":        "error",
        "status_closed":       "closed",
        "btn_reconnect":       "Reconnect",
        "btn_fullscreen":      "Fullscreen",
        "overlay_lead":        "// initialising",
        "overlay_msg":         "opening shell to LXC container…",
        "msg_closed_clean":    "session closed cleanly. Reconnect?",
        "msg_closed_drop":     "session dropped: ",
        "msg_unknown":         "unknown",
        "err_init":            "term init failed: ",
    },
    "zh-TW": {
        "status_connecting":   "連線中",
        "status_connected":    "已連線",
        "status_error":        "錯誤",
        "status_closed":       "已關閉",
        "btn_reconnect":       "重新連線",
        "btn_fullscreen":      "全螢幕",
        "overlay_lead":        "// 初始化中",
        "overlay_msg":         "正在開啟到 LXC 容器的終端機…",
        "msg_closed_clean":    "工作階段已正常關閉，是否重新連線？",
        "msg_closed_drop":     "工作階段中斷：",
        "msg_unknown":         "原因不明",
        "err_init":            "終端機初始化失敗：",
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


_TEMPLATE = """<!DOCTYPE html>
<html lang="{{HTML_LANG}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{VM_TITLE}}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="stylesheet" href="/assets/xterm/xterm.css">
    <style>
        :root {
            --bg: #050810; --bg-elev: #0d1320;
            --cyan: #00f0ff; --cyan-soft: rgba(0,240,255,.18);
            --green: #00ff88; --red: #ff3860;
            --orange: #ff8a3c;
            --text: #e6f6ff; --text-dim: #95a8c4; --text-muted: #6b7c93;
            --border: rgba(0,240,255,.16);
        }
        @font-face { font-family: Orbitron; src: url(/fonts/orbitron-700.woff2) format('woff2'); font-weight: 700; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-400.woff2) format('woff2'); font-weight: 400; }
        @font-face { font-family: 'Share Tech Mono'; src: url(/fonts/share-tech-mono-400.woff2) format('woff2'); }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; height: 100vh; background: var(--bg); color: var(--text); font-family: Rajdhani, system-ui, sans-serif; overflow: hidden; }
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
        button:hover:not(:disabled) { background: rgba(0,240,255,.18); }
        button:disabled { opacity: .4; cursor: not-allowed; }
        #screen {
            flex: 1; min-height: 0; background: #000;
            position: relative; overflow: hidden;
            padding: 6px 8px;
        }
        #term { width: 100%; height: 100%; }
        .overlay {
            position: absolute; inset: 0;
            display: flex; align-items: center; justify-content: center;
            color: var(--text-dim);
            font-family: 'Share Tech Mono', monospace;
            font-size: 13px; letter-spacing: .08em;
            background: rgba(5, 8, 16, .92);
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
        <span class="name">{{HEADING}}</span>
        <span class="meta">{{CLUSTER}} / {{NODE}} · LXC</span>
        <div class="right">
            <span id="status" class="pill connecting">{{T_STATUS_CONNECTING}}</span>
            <button id="reconnect" disabled>{{T_BTN_RECONNECT}}</button>
            <button id="full" disabled>{{T_BTN_FULLSCREEN}}</button>
        </div>
    </div>
    <div id="screen">
        <div id="term"></div>
        <div id="overlay" class="overlay">
            <div>
                <span class="lead">{{T_OVERLAY_LEAD}}</span>
                <span id="overlay-msg">{{T_OVERLAY_MSG}}</span>
            </div>
        </div>
    </div>
</div>

<!-- xterm.js (vendored). Loads as global `Terminal` and `FitAddon`. -->
<script src="/assets/xterm/xterm.js"></script>
<script src="/assets/xterm/xterm-addon-fit.js"></script>
<script>
const I18N = {{I18N_JSON}};
const CLUSTER = {{CLUSTER_JSON}};
const NODE    = {{NODE_JSON}};
const VMID    = {{VMID}};

const $ = (id) => document.getElementById(id);
const statusEl = $('status');
const overlay  = $('overlay');
const overlayMsg = $('overlay-msg');
const recon = $('reconnect');
const fs = $('full');

let term = null;
let fitAddon = null;
let socket = null;
let authed = false;
let activeToken = new URLSearchParams(location.search).get('ct') || '';
// Preserve the console kind (e.g. 'serial' for a QEMU serial console) so
// reconnect re-mints the SAME session type. Without this, ensureToken()
// re-minted a default (noVNC) session for a QEMU guest and the terminal
// never reconnected.
const KIND = (new URLSearchParams(location.search).get('kind') || '').trim();

function setStatus(state, msg) {
    statusEl.className = 'pill ' + state;
    statusEl.textContent = I18N['status_' + state] || state;
    if (msg) { overlayMsg.textContent = msg; overlay.classList.remove('hidden'); }
}

async function ensureToken() {
    if (activeToken) return activeToken;
    const prepareBody = {cluster_id: CLUSTER, node: NODE, vmid: VMID};
    if (KIND === 'serial') prepareBody.kind = 'serial';
    const r = await fetch('/api/console/prepare', {
        method: 'POST', credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(prepareBody),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok && d.console_token) { activeToken = d.console_token; return activeToken; }
    throw new Error(d.error || ('HTTP ' + r.status));
}

function pveSendStdin(data) {
    if (!socket || socket.readyState !== 1) return;
    // PVE term-channel framing: 0:<bytelen>:<data>
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

    // Build / reset terminal.
    if (term) { try { term.dispose(); } catch (_) {} }
    /* eslint-disable no-undef */
    term = new Terminal({
        cursorBlink: true,
        fontFamily: '"Share Tech Mono", "Fira Mono", Menlo, monospace',
        fontSize: 14,
        theme: {
            background: '#000000',
            foreground: '#e6f6ff',
            cursor: '#00f0ff',
            cursorAccent: '#000000',
            selectionBackground: 'rgba(0,240,255,.35)',
        },
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
        + '/api/console/' + encodeURIComponent(CLUSTER)
        + '/' + encodeURIComponent(NODE) + '/' + VMID + '/term/ws'
        + '?ct=' + encodeURIComponent(token);
    activeToken = '';
    authed = false;

    socket = new WebSocket(url);
    socket.binaryType = 'arraybuffer';

    socket.addEventListener('open', () => {
        // Bridge sends the auth frame to PVE; we just wait for the 'O' ack.
    });

    socket.addEventListener('message', (ev) => {
        let data = ev.data;
        // First message is a single 'O' byte = auth OK; subsequent are stdout.
        if (!authed) {
            let firstChar;
            if (typeof data === 'string') {
                firstChar = data.charAt(0);
            } else {
                firstChar = String.fromCharCode(new Uint8Array(data)[0]);
            }
            if (firstChar === 'O') {
                authed = true;
                setStatus('connected');
                overlay.classList.add('hidden');
                recon.disabled = false; fs.disabled = false;
                // Send initial size + start resize listener.
                fitAddon.fit();
                pveSendResize(term.cols, term.rows);
                term.onData(pveSendStdin);
                term.onResize((s) => pveSendResize(s.cols, s.rows));
                term.focus();
                return;
            }
            // Non-'O' before auth: surface as error.
            setStatus('error', I18N.err_init + (typeof data === 'string' ? data : '[binary]'));
            try { socket.close(); } catch (_) {}
            return;
        }
        // Authed: data is shell output.
        if (typeof data === 'string') {
            term.write(data);
        } else {
            const text = new TextDecoder().decode(new Uint8Array(data));
            term.write(text);
        }
    });

    socket.addEventListener('close', (ev) => {
        recon.disabled = false; fs.disabled = true;
        if (ev.wasClean || ev.code === 1000) {
            setStatus('closed', I18N.msg_closed_clean);
        } else {
            setStatus('error', I18N.msg_closed_drop + (ev.reason || I18N.msg_unknown));
        }
    });

    socket.addEventListener('error', () => {
        if (!authed) setStatus('error', I18N.err_init + 'WebSocket error');
    });
}

window.addEventListener('resize', () => {
    if (fitAddon && term) {
        try { fitAddon.fit(); pveSendResize(term.cols, term.rows); } catch (_) {}
    }
});

recon.addEventListener('click', () => {
    if (socket && socket.readyState <= 1) { try { socket.close(); } catch (_) {} }
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
async def console_term_page_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    vmid = int(request.match_info["vmid"])
    vm_name = (request.query.get("name") or "").strip()
    # Distinguish CT (LXC termproxy) from VM serial (QEMU termproxy with
    # serial=serial0). Caller passes ?kind=serial when opening a QEMU
    # serial console; default is CT (kept for backwards compat).
    kind = (request.query.get("kind") or "ct").strip().lower()
    label = "VM" if kind == "serial" else "CT"
    heading = f"{label} {vmid}" + (f" — {vm_name}" if vm_name else "")
    page_title = f"JT-PROXENSE — {heading}@{node}"

    lang = _pick_lang(request)
    s = _I18N[lang]

    heading_safe = _html.escape(heading)
    page_title_safe = _html.escape(page_title)

    out = (_TEMPLATE
            .replace("{{HTML_LANG}}", lang)
            .replace("{{VMID}}", str(vmid))
            .replace("{{NODE}}", node)
            .replace("{{CLUSTER}}", cluster_id)
            .replace("{{CLUSTER_JSON}}", json.dumps(cluster_id))
            .replace("{{NODE_JSON}}", json.dumps(node))
            .replace("{{I18N_JSON}}", json.dumps(s, ensure_ascii=False))
            .replace("{{HEADING}}", heading_safe)
            .replace("{{VM_TITLE}}", page_title_safe)
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
