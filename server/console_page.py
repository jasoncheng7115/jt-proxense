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

Language: server reads ?lang=zh-TW from the query string (the main React
app passes its current language when opening this page in a new tab).
Falls back to Accept-Language, then English.
"""
from __future__ import annotations

import json

from aiohttp import web

from .middleware import auth_required


# Server-rendered i18n. Kept tiny on purpose — the page only has a handful
# of visible strings. Adding more keys: bump both dicts.
_I18N: dict[str, dict[str, str]] = {
    "en": {
        "title_console":  "Console",
        "status_connecting":   "connecting",
        "status_connected":    "connected",
        "status_error":        "error",
        "status_closed":       "closed",
        "btn_cad":             "Ctrl-Alt-Del",
        "btn_cad_title":       "Send Ctrl+Alt+Del to guest",
        "btn_reconnect":       "Reconnect",
        "btn_fullscreen":      "Fullscreen",
        "btn_send_keys":       "Send keys",
        "btn_ocr":             "OCR copy",
        "btn_ocr_title":       "Drag a rectangle on the screen to OCR + copy text",
        "ocr_running":         "OCR running…",
        "ocr_copied":          "Text copied to clipboard",
        "ocr_no_text":         "No text recognised",
        "ocr_failed":          "OCR failed: ",
        "ocr_lang":            "OCR language",
        "ocr_overlay_hint":    "Drag to select. Avoid bar charts / progress bars — only plain text lines OCR cleanly.",
        "ocr_bars_warn":       "Looks like a progress / bar-chart region — result is unreliable. Try a text-only selection.",
        "ocr_bars_filtered":   "Filtered {n} bar-chart line(s)",
        "btn_paste":           "Paste",
        "btn_paste_title":     "Type text into the guest as keystrokes",
        "paste_title":         "Paste as keystrokes",
        "paste_hint":          "ASCII only (letters / digits / symbols). CJK / emoji can't be sent through the VNC keyboard channel.",
        "paste_send":          "Send",
        "paste_cancel":        "Cancel",
        "paste_clipboard":     "From clipboard",
        "paste_speed":         "Typing speed",
        "paste_done":          "Sent {n} chars",
        "paste_skipped":       "{n} non-ASCII chars skipped",
        "paste_empty":         "Nothing to send",
        "overlay_lead":        "// initialising",
        "overlay_msg":         "opening WebSocket bridge to PVE…",
        "err_init":            "noVNC init failed: ",
        "msg_closed_clean":    "connection closed cleanly. Reconnect?",
        "msg_closed_drop":     "connection dropped: ",
        "msg_unknown":         "unknown",
        "err_creds":           "VNC asked for credentials — not handled via API token; set a VNC password on the VM, or supply via UI.",
        "err_handshake":       "VNC handshake failed: ",
        "err_reconnect_prompt":"Console password required — close this tab and reopen the console from the main app to re-enter it.",
    },
    "zh-TW": {
        "title_console":  "主控台",
        "status_connecting":   "連線中",
        "status_connected":    "已連線",
        "status_error":        "錯誤",
        "status_closed":       "已關閉",
        "btn_cad":             "Ctrl-Alt-Del",
        "btn_cad_title":       "向 Guest 送出 Ctrl+Alt+Del",
        "btn_reconnect":       "重新連線",
        "btn_fullscreen":      "全螢幕",
        "btn_send_keys":       "傳送按鍵",
        "btn_ocr":             "OCR 複製",
        "btn_ocr_title":       "在畫面上拉出矩形 → OCR 文字並複製",
        "ocr_running":         "OCR 辨識中…",
        "ocr_copied":          "文字已複製到剪貼簿",
        "ocr_no_text":         "未辨識到文字",
        "ocr_failed":          "OCR 失敗：",
        "ocr_lang":            "OCR 語言",
        "ocr_overlay_hint":    "拉出矩形選取範圍。請避開進度條 / bar chart — 只圈純文字行 OCR 才會準。",
        "ocr_bars_warn":       "看起來圈到進度條區，結果可能不可靠 — 建議只圈純文字行重試。",
        "ocr_bars_filtered":   "已過濾 {n} 行疑似進度條",
        "btn_paste":           "貼上",
        "btn_paste_title":     "把文字以鍵盤打字的方式送進 Guest",
        "paste_title":         "貼上 → 模擬鍵盤輸入",
        "paste_hint":          "僅支援 ASCII（英文字母 / 數字 / 符號）。VNC 鍵盤通道無法直接送中文 / Emoji。",
        "paste_send":          "送出",
        "paste_cancel":        "取消",
        "paste_clipboard":     "從剪貼簿讀取",
        "paste_speed":         "打字速度",
        "paste_done":          "已送出 {n} 個字元",
        "paste_skipped":       "略過 {n} 個非 ASCII 字元",
        "paste_empty":         "沒有要送出的內容",
        "overlay_lead":        "// 初始化中",
        "overlay_msg":         "正在開啟到 PVE 的連線通道…",
        "err_init":            "noVNC 初始化失敗：",
        "msg_closed_clean":    "連線已正常關閉，是否重新連線？",
        "msg_closed_drop":     "連線中斷：",
        "msg_unknown":         "原因不明",
        "err_creds":           "VNC 要求認證 — 我們不透過 API token 提供密碼；請在 VM 上設定 VNC 密碼，或於 UI 中提供。",
        "err_handshake":       "VNC 握手失敗：",
        "err_reconnect_prompt":"主控台需要密碼 — 請關閉此頁，從主畫面重新開啟主控台以重新輸入密碼。",
    },
}


def _pick_lang(request: web.Request) -> str:
    """`?lang=zh-TW` wins; else Accept-Language; default 'en'."""
    q = request.query.get("lang", "")
    if q in _I18N:
        return q
    accept = request.headers.get("Accept-Language", "")
    # crude: any zh prefix → zh-TW (we only ship Taiwan Mandarin)
    if accept.lower().startswith("zh"):
        return "zh-TW"
    return "en"


# Plain template with {{name}} placeholders — NOT an f-string, so the
# CSS/JS curly braces don't have to be escaped.
_TEMPLATE = """<!DOCTYPE html>
<html lang="{{HTML_LANG}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{VM_TITLE}}</title>
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
            display: inline-flex; align-items: center; gap: 6px;
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
        select#ocr-lang {
            padding: 6px 8px;
            font-family: Orbitron, sans-serif;
            font-size: 10px; letter-spacing: .06em;
            color: var(--cyan);
            background: rgba(0,240,255,.05);
            border: 1px solid var(--cyan-soft); border-radius: 4px;
            cursor: pointer;
        }
        select#ocr-lang:disabled { opacity: .4; cursor: not-allowed; }
        select#ocr-lang option { background: #050810; color: var(--cyan); }
        /* Paste-as-keystrokes modal — same cyberpunk vocabulary as the
           dialogs in the SPA (cyan rim, mono body font). */
        .paste-modal {
            position: fixed; inset: 0;
            background: rgba(2,4,10,0.72);
            display: flex; align-items: center; justify-content: center;
            z-index: 10000;
        }
        .paste-modal.hidden { display: none; }
        .paste-card {
            width: min(560px, 92vw);
            background: linear-gradient(180deg, #0d1320, #050810);
            border: 1px solid var(--cyan);
            border-radius: 6px;
            box-shadow: 0 0 32px rgba(0,240,255,0.25);
            padding: 16px 18px;
            display: flex; flex-direction: column; gap: 10px;
        }
        .paste-head {
            display: flex; align-items: center; justify-content: space-between;
            border-bottom: 1px solid var(--cyan-soft);
            padding-bottom: 8px;
        }
        .paste-title {
            font-family: Orbitron, sans-serif; color: var(--cyan);
            letter-spacing: .14em; text-transform: uppercase; font-size: 14px;
        }
        .paste-close {
            background: transparent; border: none; color: var(--text-dim);
            font-size: 22px; line-height: 1; cursor: pointer; padding: 0 6px;
        }
        .paste-close:hover { color: var(--cyan); }
        .paste-hint {
            font-size: 12px; color: var(--orange);
            background: rgba(255,138,60,0.08);
            border-left: 2px solid var(--orange);
            padding: 6px 10px; border-radius: 2px;
        }
        .paste-text {
            min-height: 140px;
            background: rgba(0,240,255,0.04);
            border: 1px solid var(--cyan-soft); border-radius: 3px;
            color: var(--text); font-family: 'Share Tech Mono', monospace;
            font-size: 13px; padding: 8px 10px; resize: vertical;
            outline: none;
        }
        .paste-text:focus { border-color: var(--cyan); }
        .paste-row { display: flex; align-items: center; gap: 10px; }
        .paste-speed-label {
            font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
            color: var(--text-dim); font-family: Orbitron, sans-serif;
        }
        #paste-speed {
            padding: 4px 8px;
            background: rgba(0,240,255,.05); color: var(--cyan);
            border: 1px solid var(--cyan-soft); border-radius: 3px;
            font-family: 'Share Tech Mono', monospace; font-size: 12px;
        }
        #paste-speed option { background: #050810; color: var(--cyan); }
        .paste-actions { display: flex; gap: 8px; align-items: center; }
        .paste-btn {
            padding: 6px 14px; font-family: Orbitron, sans-serif;
            font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
            border-radius: 3px; cursor: pointer; transition: all .12s;
        }
        .paste-btn.primary {
            color: var(--cyan); background: rgba(0,240,255,.12);
            border: 1px solid var(--cyan);
        }
        .paste-btn.primary:hover { background: rgba(0,240,255,.22); }
        .paste-btn.ghost {
            color: var(--text-dim); background: transparent;
            border: 1px solid var(--cyan-soft);
        }
        .paste-btn.ghost:hover { color: var(--cyan); border-color: var(--cyan); }
        .dropdown { position: relative; }
        .dropdown-menu {
            position: absolute; top: calc(100% + 4px); right: 0;
            min-width: 180px;
            background: #0d1320;
            border: 1px solid rgba(0,240,255,.35);
            border-radius: 6px;
            box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 12px 40px rgba(0,0,0,.6),
                        0 0 60px -20px rgba(0,240,255,.5);
            padding: 4px 0;
            z-index: 50;
            max-height: 60vh; overflow-y: auto;
        }
        .dropdown-menu button {
            display: block; width: 100%;
            padding: 6px 14px;
            text-align: left;
            border: 0; border-radius: 0; background: transparent;
            color: var(--text);
            font-family: 'Share Tech Mono', monospace;
            font-size: 12px; letter-spacing: .04em;
            text-transform: none;
        }
        .dropdown-menu button:hover { background: rgba(0,240,255,.12); color: var(--cyan); }
        .dropdown-menu .sep { height: 1px; margin: 4px 0; background: rgba(0,240,255,.18); }
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

        /* OCR overlay — draggable rect on top of the noVNC canvas. */
        #ocr.active { background: rgba(0,240,255,.25); border-color: var(--cyan); color: var(--cyan); }
        .ocr-overlay {
            position: fixed;
            cursor: crosshair;
            background: rgba(0,0,0,0.18);
            z-index: 50;
        }
        .ocr-rect {
            position: absolute;
            border: 2px solid var(--cyan);
            background: rgba(0,240,255,0.10);
            box-shadow: 0 0 12px rgba(0,240,255,0.45);
            display: none;
            pointer-events: none;
        }
        .ocr-overlay-hint {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px 18px;
            background: rgba(13,19,32,0.92);
            border: 1px solid var(--orange);
            border-left-width: 3px;
            border-radius: 4px;
            color: var(--orange);
            font-family: 'Share Tech Mono', monospace;
            font-size: 12px;
            max-width: 480px; text-align: center;
            box-shadow: 0 0 24px rgba(255,138,60,0.32);
            pointer-events: none;
            opacity: 0;
            animation: ocrHintIn .25s ease-out forwards,
                       ocrHintOut .4s ease-in 2.6s forwards;
        }
        @keyframes ocrHintIn  { to { opacity: 1; } }
        @keyframes ocrHintOut { to { opacity: 0; transform: translate(-50%, calc(-50% - 8px)); } }
        .ocr-toast {
            position: fixed; bottom: 20px; left: 50%;
            transform: translateX(-50%);
            padding: 10px 18px;
            background: linear-gradient(180deg, #0d1320, #050810);
            border: 1px solid var(--cyan);
            border-radius: 6px;
            color: var(--text);
            font-family: 'Share Tech Mono', monospace;
            font-size: 13px;
            box-shadow: 0 0 24px rgba(0,240,255,0.4);
            z-index: 9999;
            animation: ocrToastIn .18s ease-out;
        }
        .ocr-toast.ok   { border-color: var(--green); color: var(--green); box-shadow: 0 0 24px rgba(0,255,136,0.4); }
        .ocr-toast.warn { border-color: var(--orange); color: var(--orange); box-shadow: 0 0 24px rgba(255,138,60,0.4); }
        .ocr-toast.err  { border-color: var(--red); color: var(--red); box-shadow: 0 0 24px rgba(255,56,96,0.4); }
        @keyframes ocrToastIn {
            from { opacity: 0; transform: translate(-50%, 8px); }
            to   { opacity: 1; transform: translate(-50%, 0); }
        }
    </style>
</head>
<body>
<div class="frame">
    <div class="titlebar">
        <span class="name">{{HEADING}}</span>
        <span class="meta">{{CLUSTER}} / {{NODE}}</span>
        <div class="right">
            <span id="status" class="pill connecting">{{T_STATUS_CONNECTING}}</span>
            <div class="dropdown" id="keys-dropdown">
                <button id="keys-btn" disabled>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M6 10h0M10 10h0M14 10h0M18 10h0M6 14h0M10 14h0M14 14h0M18 14h0M7 18h10"/></svg>
                    <span>{{T_BTN_SEND_KEYS}}</span>
                    <span style="opacity:.6">▾</span>
                </button>
                <div class="dropdown-menu" id="keys-menu" hidden>
                    <button data-key="tab">Tab</button>
                    <button data-key="esc">Esc</button>
                    <button data-key="bksp">Backspace</button>
                    <button data-key="super">Super (Win)</button>
                    <button data-key="prtsc">Print Screen</button>
                    <div class="sep"></div>
                    <button data-key="cab">Ctrl-Alt-Backspace</button>
                    <button data-key="caf1">Ctrl-Alt-F1</button>
                    <button data-key="caf2">Ctrl-Alt-F2</button>
                    <button data-key="caf3">Ctrl-Alt-F3</button>
                    <button data-key="caf4">Ctrl-Alt-F4</button>
                    <button data-key="caf5">Ctrl-Alt-F5</button>
                    <button data-key="caf6">Ctrl-Alt-F6</button>
                    <button data-key="caf7">Ctrl-Alt-F7</button>
                    <button data-key="caf8">Ctrl-Alt-F8</button>
                    <button data-key="caf9">Ctrl-Alt-F9</button>
                    <button data-key="caf10">Ctrl-Alt-F10</button>
                    <button data-key="caf11">Ctrl-Alt-F11</button>
                    <button data-key="caf12">Ctrl-Alt-F12</button>
                </div>
            </div>
            <button id="cad" disabled title="{{T_BTN_CAD_TITLE}}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                <span>{{T_BTN_CAD}}</span>
            </button>
            <button id="reconnect" disabled>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                <span>{{T_BTN_RECONNECT}}</span>
            </button>
            <button id="full" disabled>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
                <span>{{T_BTN_FULLSCREEN}}</span>
            </button>
            <button id="paste" disabled title="{{T_BTN_PASTE_TITLE}}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
                <span>{{T_BTN_PASTE}}</span>
            </button>
            <button id="ocr" disabled title="{{T_BTN_OCR_TITLE}}">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10M7 8h6M7 16h8"/></svg>
                <span>{{T_BTN_OCR}}</span>
            </button>
            <select id="ocr-lang" disabled title="{{T_OCR_LANG}}">
                <option value="chi_tra+eng">中+英</option>
                <option value="eng">English</option>
                <option value="chi_tra">繁中</option>
                <option value="chi_sim+eng">简+英</option>
                <option value="chi_sim">简中</option>
                <option value="jpn">日本語</option>
            </select>
        </div>
    </div>
    <div id="screen">
        <div id="overlay" class="overlay">
            <div>
                <span class="lead">{{T_OVERLAY_LEAD}}</span>
                <span id="overlay-msg">{{T_OVERLAY_MSG}}</span>
            </div>
        </div>
    </div>
</div>
<!-- Paste modal — backdrop click closes; submit types text into the guest -->
<div id="paste-modal" class="paste-modal hidden" role="dialog" aria-modal="true">
    <div class="paste-card">
        <div class="paste-head">
            <span class="paste-title">{{T_PASTE_TITLE}}</span>
            <button class="paste-close" data-paste-cancel aria-label="close">×</button>
        </div>
        <div class="paste-hint">{{T_PASTE_HINT}}</div>
        <textarea id="paste-text" class="paste-text" autocomplete="off" spellcheck="false" autocapitalize="off"></textarea>
        <div class="paste-row">
            <label class="paste-speed-label">{{T_PASTE_SPEED}}</label>
            <select id="paste-speed">
                <option value="5">⚡⚡⚡</option>
                <option value="15" selected>⚡⚡</option>
                <option value="40">⚡</option>
            </select>
        </div>
        <div class="paste-actions">
            <button data-paste-clipboard class="paste-btn ghost">{{T_PASTE_CLIPBOARD}}</button>
            <span style="flex:1"></span>
            <button data-paste-cancel class="paste-btn ghost">{{T_PASTE_CANCEL}}</button>
            <button id="paste-send" class="paste-btn primary">{{T_PASTE_SEND}}</button>
        </div>
    </div>
</div>

<script type="module">
// noVNC is vendored under /assets/novnc/ — we keep the upstream layout
// (core/ + vendor/pako/) intact because core/deflator.js imports its
// pako dependencies via relative paths like `../vendor/pako/...`.
// Same-origin load means: no external CDN, no third-party CSP holes,
// works fully air-gapped.
import RFB from '/assets/novnc/core/rfb.js';

const I18N = {{I18N_JSON}};
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

// Map internal state to translated label. Keep state in className for
// CSS color theming, but render translated text content.
function setStatus(state, msg) {
    statusEl.className = 'pill ' + state;
    statusEl.textContent = I18N['status_' + state] || state;
    if (msg) { overlayMsg.textContent = msg; overlay.classList.remove('hidden'); }
}

// One-shot console token from URL — first connect uses it, subsequent
// reconnects re-mint by POSTing /api/console/prepare (stored mode only;
// prompt mode requires reopening the console from the main app).
let activeToken = new URLSearchParams(location.search).get('ct') || '';

// VNC RFB-level password = the `ticket` PVE's vncproxy returned. Comes via
// URL fragment (#vp=...) so it never hits server logs / cache. We strip the
// fragment from the location bar after reading so it doesn't survive a
// browser refresh either.
function readVncPasswordFromHash() {
    const h = (location.hash || '').replace(/^#/, '');
    const params = new URLSearchParams(h);
    const vp = params.get('vp') || '';
    if (vp && history && history.replaceState) {
        try { history.replaceState(null, '', location.pathname + location.search); } catch (_) {}
    }
    return vp;
}
let activeVncPassword = readVncPasswordFromHash();

async function ensureToken() {
    if (activeToken) return activeToken;
    // Reconnect path: re-mint via /prepare (stored mode only; prompt mode
    // requires reopening the console from the main app).
    try {
        const r = await fetch('/api/console/prepare', {
            method: 'POST', credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cluster_id: CLUSTER, node: NODE, vmid: VMID}),
        });
        const d = await r.json().catch(() => ({}));
        if (r.ok && d.console_token) {
            activeToken = d.console_token;
            // /prepare returns vnc_password in stored mode — refresh ours.
            if (d.vnc_password) activeVncPassword = d.vnc_password;
            return activeToken;
        }
        if (d.error === 'password_required') {
            throw new Error(I18N.err_reconnect_prompt || 'Reopen console from the main app to re-enter password.');
        }
        throw new Error(d.error || ('HTTP ' + r.status));
    } catch (e) {
        throw e;
    }
}

async function connect() {
    overlay.classList.remove('hidden');
    setStatus('connecting', I18N.overlay_msg);

    let token;
    try {
        token = await ensureToken();
    } catch (e) {
        setStatus('error', I18N.err_init + (e && e.message || e));
        recon.disabled = false;
        return;
    }

    const wsScheme = location.protocol === 'https:' ? 'wss:' : 'ws:';
    let url = wsScheme + '//' + location.host
        + '/api/console/' + encodeURIComponent(CLUSTER)
        + '/' + encodeURIComponent(NODE) + '/' + VMID + '/ws';
    if (token) url += '?ct=' + encodeURIComponent(token);
    // Token is single-use; clear so the next reconnect mints a fresh one.
    activeToken = '';

    const rfbPassword = activeVncPassword || '';
    // vnc_password is also single-use (tied to the vncproxy ticket which
    // PVE invalidates on first use). Clear after consuming.
    activeVncPassword = '';

    try {
        rfb = new RFB($('screen'), url, {
            credentials: { password: rfbPassword },
            shared: true,
            wsProtocols: ['binary'],
        });
    } catch (e) {
        setStatus('error', I18N.err_init + (e && e.message || e));
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
        const kb = document.getElementById('keys-btn');
        if (kb) kb.disabled = false;
        const ocrBtn = document.getElementById('ocr');
        if (ocrBtn) ocrBtn.disabled = false;
        const ocrLangEl = document.getElementById('ocr-lang');
        if (ocrLangEl) ocrLangEl.disabled = false;
        const pasteBtnEl = document.getElementById('paste');
        if (pasteBtnEl) pasteBtnEl.disabled = false;
        // Re-apply scaleViewport after connect: noVNC only has the remote
        // dimensions once the framebuffer init message arrives, so the value
        // we set in the constructor is sometimes a no-op for the first paint.
        // Toggle and re-set to force a recompute.
        try {
            rfb.clipViewport = false;
            rfb.scaleViewport = false;
            rfb.scaleViewport = true;
        } catch (_) {}
    });
    rfb.addEventListener('disconnect', (ev) => {
        cad.disabled = true; fs.disabled = true; recon.disabled = false;
        const kb = document.getElementById('keys-btn');
        if (kb) kb.disabled = true;
        const ocrBtn = document.getElementById('ocr');
        if (ocrBtn) ocrBtn.disabled = true;
        const ocrLangEl = document.getElementById('ocr-lang');
        if (ocrLangEl) ocrLangEl.disabled = true;
        const pasteBtnEl = document.getElementById('paste');
        if (pasteBtnEl) pasteBtnEl.disabled = true;
        if (ev.detail && ev.detail.clean) {
            setStatus('closed', I18N.msg_closed_clean);
        } else {
            setStatus('error', I18N.msg_closed_drop + (ev.detail && ev.detail.reason || I18N.msg_unknown));
        }
    });
    rfb.addEventListener('credentialsrequired', () => {
        setStatus('error', I18N.err_creds);
    });
    rfb.addEventListener('securityfailure', (ev) => {
        setStatus('error', I18N.err_handshake + (ev.detail && ev.detail.reason || I18N.msg_unknown));
    });
}

// Re-fit on window resize. noVNC's scaleViewport only recomputes when the
// `<canvas>` element changes size or when the property is reassigned —
// browser-window resizing alone doesn't trigger it.
window.addEventListener('resize', () => {
    if (!rfb) return;
    try { rfb.scaleViewport = false; rfb.scaleViewport = true; } catch (_) {}
});

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

// ================== Send-keys dropdown ==================
// X11 keysyms used by noVNC's RFB.sendKey. Reference: X11/keysymdef.h.
const KEYSYM = {
    Tab:        0xff09,
    Escape:     0xff1b,
    BackSpace:  0xff08,
    Super_L:    0xffeb,
    Print:      0xff61,
    Delete:     0xffff,
    Control_L:  0xffe3,
    Alt_L:      0xffe9,
    F1: 0xffbe, F2: 0xffbf, F3: 0xffc0, F4: 0xffc1,
    F5: 0xffc2, F6: 0xffc3, F7: 0xffc4, F8: 0xffc5,
    F9: 0xffc6, F10: 0xffc7, F11: 0xffc8, F12: 0xffc9,
};

function sendCombo(parts) {
    if (!rfb) return;
    // parts: [{keysym, code}] sent as press-all then release-in-reverse
    for (const p of parts) rfb.sendKey(p.keysym, p.code, true);
    for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        rfb.sendKey(p.keysym, p.code, false);
    }
}

function sendCtrlAltKey(keysym, code) {
    sendCombo([
        { keysym: KEYSYM.Control_L, code: 'ControlLeft' },
        { keysym: KEYSYM.Alt_L,     code: 'AltLeft' },
        { keysym, code },
    ]);
}

function sendKeyAction(name) {
    if (!rfb) return;
    switch (name) {
        case 'tab':   rfb.sendKey(KEYSYM.Tab,        'Tab'); break;
        case 'esc':   rfb.sendKey(KEYSYM.Escape,     'Escape'); break;
        case 'bksp':  rfb.sendKey(KEYSYM.BackSpace,  'Backspace'); break;
        case 'super': rfb.sendKey(KEYSYM.Super_L,    'MetaLeft'); break;
        case 'prtsc': rfb.sendKey(KEYSYM.Print,      'PrintScreen'); break;
        case 'cab':   sendCtrlAltKey(KEYSYM.BackSpace, 'Backspace'); break;
        default:
            const m = /^caf(\\d{1,2})$/.exec(name);
            if (m) {
                const n = parseInt(m[1], 10);
                if (n >= 1 && n <= 12) {
                    sendCtrlAltKey(KEYSYM['F' + n], 'F' + n);
                }
            }
    }
}

const keysBtn = $('keys-btn');
const keysMenu = $('keys-menu');
keysBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    keysMenu.hidden = !keysMenu.hidden;
});
document.addEventListener('click', (e) => {
    if (!keysMenu.hidden && !keysMenu.contains(e.target) && e.target !== keysBtn) {
        keysMenu.hidden = true;
    }
});
keysMenu.querySelectorAll('button[data-key]').forEach((b) => {
    b.addEventListener('click', () => {
        sendKeyAction(b.dataset.key);
        keysMenu.hidden = true;
    });
});

connect();

// ----- OCR copy ---------------------------------------------------------
// User clicks the OCR button → we draw a transparent overlay on top of
// the noVNC canvas, let them drag-select a rectangle, then crop that
// region out of the canvas, POST it to /api/ocr, copy the result to
// the clipboard. Server-side tesseract handles language packs (chi_tra,
// jpn, etc. install via `apt`).
// Toast — top-level so both OCR and paste-as-keystrokes can use it.
let toastEl = null;
const showToast = (msg, kind) => {
    if (toastEl) toastEl.remove();
    toastEl = document.createElement('div');
    toastEl.className = 'ocr-toast ' + (kind || '');
    toastEl.textContent = msg;
    document.body.appendChild(toastEl);
    setTimeout(() => { if (toastEl) toastEl.remove(); }, 2400);
};

const ocrBtn = document.getElementById('ocr');
if (ocrBtn) {
    let ocrActive = false;
    let dragStart = null;
    let dragRect = null;
    let overlayEl = null;
    let rectEl = null;

    const startOcr = () => {
        if (!rfb) return;
        const screenEl = document.getElementById('screen');
        const canvas = screenEl.querySelector('canvas');
        if (!canvas) {
            showToast(I18N.ocr_failed + 'no canvas', 'err');
            return;
        }
        ocrActive = true;
        ocrBtn.classList.add('active');
        overlayEl = document.createElement('div');
        overlayEl.className = 'ocr-overlay';
        rectEl = document.createElement('div');
        rectEl.className = 'ocr-rect';
        overlayEl.appendChild(rectEl);
        // Cover the entire viewport so the mouse can drift past the canvas
        // edges without losing events. The visual rect (and the eventual
        // crop coords) get clamped to the canvas's bounding box, so dragging
        // off-canvas just snaps the rect to the canvas edge.
        overlayEl.style.left   = '0';
        overlayEl.style.top    = '0';
        overlayEl.style.width  = '100vw';
        overlayEl.style.height = '100vh';
        document.body.appendChild(overlayEl);
        // Floating hint — auto-fades after ~3s. Reminds operators that
        // ANSI bar charts / progress meters won't OCR cleanly so they
        // don't blame the engine when htop output comes back as gibberish.
        const hintEl = document.createElement('div');
        hintEl.className = 'ocr-overlay-hint';
        hintEl.textContent = I18N.ocr_overlay_hint;
        overlayEl.appendChild(hintEl);

        // Clamp viewport coords to the canvas's CSS box.
        const clampToCanvas = (vx, vy) => {
            const r = canvas.getBoundingClientRect();
            return {
                x: Math.max(r.left, Math.min(r.right,  vx)),
                y: Math.max(r.top,  Math.min(r.bottom, vy)),
            };
        };
        // Render a rect spanning two viewport-coord points, in viewport coords.
        const renderRect = (a, b) => {
            const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y);
            rectEl.style.left   = x + 'px';
            rectEl.style.top    = y + 'px';
            rectEl.style.width  = Math.abs(a.x - b.x) + 'px';
            rectEl.style.height = Math.abs(a.y - b.y) + 'px';
            rectEl.style.display = 'block';
        };

        overlayEl.addEventListener('mousedown', (e) => {
            const p = clampToCanvas(e.clientX, e.clientY);
            // Store viewport-coord anchor so out-of-canvas drift is
            // handled cleanly by clamping the live point on each move.
            dragStart = { vx: p.x, vy: p.y };
            dragRect  = { vx0: p.x, vy0: p.y, vx1: p.x, vy1: p.y };
            renderRect({ x: p.x, y: p.y }, { x: p.x, y: p.y });
        });
        overlayEl.addEventListener('mousemove', (e) => {
            if (!dragStart) return;
            const p = clampToCanvas(e.clientX, e.clientY);
            dragRect.vx1 = p.x;
            dragRect.vy1 = p.y;
            renderRect({ x: dragStart.vx, y: dragStart.vy }, { x: p.x, y: p.y });
        });
        overlayEl.addEventListener('mouseup', async () => {
            const dr = dragRect;
            dragStart = null;
            dragRect = null;
            stopOcr();
            if (!dr) return;
            // Convert viewport coords → canvas-local CSS coords → backing-store.
            const cssRect = canvas.getBoundingClientRect();
            const cssX = Math.min(dr.vx0, dr.vx1) - cssRect.left;
            const cssY = Math.min(dr.vy0, dr.vy1) - cssRect.top;
            const cssW = Math.abs(dr.vx1 - dr.vx0);
            const cssH = Math.abs(dr.vy1 - dr.vy0);
            if (cssW < 8 || cssH < 8) return;
            const sx = canvas.width  / cssRect.width;
            const sy = canvas.height / cssRect.height;
            const cx = Math.round(cssX * sx);
            const cy = Math.round(cssY * sy);
            const cw = Math.round(cssW * sx);
            const ch = Math.round(cssH * sy);
            if (cw < 4 || ch < 4) return;
            const out = document.createElement('canvas');
            out.width = cw; out.height = ch;
            out.getContext('2d').drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
            showToast(I18N.ocr_running);
            // Pick OCR language. Default chi_tra+eng works for the common
            // Taiwan workload; English-only users fall back automatically
            // if chi_tra isn't installed via the server's lang whitelist.
            const langEl = document.getElementById('ocr-lang');
            const lang = (langEl && langEl.value)
                || localStorage.getItem('ocr_lang')
                || 'chi_tra+eng';
            try {
                const blob = await new Promise((res) => out.toBlob(res, 'image/png'));
                if (!blob) throw new Error('toBlob failed');
                const r = await fetch('/api/ocr?lang=' + encodeURIComponent(lang), {
                    method: 'POST', credentials: 'same-origin',
                    headers: { 'Content-Type': 'image/png' },
                    body: blob,
                });
                const data = await r.json().catch(() => ({}));
                if (!r.ok) {
                    throw new Error(data.detail || data.error || ('HTTP ' + r.status));
                }
                let text = (data.text || '').trim();
                if (!text) {
                    showToast(I18N.ocr_no_text, 'warn');
                    return;
                }
                // Per-line bar-char heuristic. ANSI bar charts / progress
                // meters come back as long unbroken runs of vertical-stroke
                // glyphs ('|', 'I', 'H', 'U', 'l', 'P', 'E', 'T', plus CJK
                // glyphs with strong vertical strokes like 戰 / 闠). When a
                // line is ≥75% such chars (with ≥10 non-space chars total)
                // it's almost certainly a graphic region — drop it so the
                // remaining lines (real text like "Load average: ...") can
                // still be copied cleanly.
                const barChars = '|IlHUTPELⅠ丨戰闠鬪闘鬨鬬';
                const lines = text.split('\\n');
                const kept = [];
                let droppedLines = 0;
                for (const line of lines) {
                    let bar = 0, total = 0;
                    for (const ch of line) {
                        if (/\\s/.test(ch)) continue;
                        total++;
                        if (barChars.includes(ch)) bar++;
                    }
                    if (total >= 10 && bar / total >= 0.75) {
                        droppedLines++;
                    } else {
                        kept.push(line);
                    }
                }
                text = kept.join('\\n').trim();
                if (!text) {
                    // Everything was bar-noise — nothing useful to copy.
                    showToast(I18N.ocr_bars_warn, 'warn');
                    return;
                }
                let okMsg = I18N.ocr_copied + ' (' + text.length + ' chars)';
                if (droppedLines > 0) {
                    okMsg += ' · ' + I18N.ocr_bars_filtered.replace('{n}', droppedLines);
                }
                try {
                    await navigator.clipboard.writeText(text);
                    showToast(okMsg, droppedLines > 0 ? 'warn' : 'ok');
                } catch (clipErr) {
                    // Clipboard API can be blocked; fall back to a textarea trick.
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    try { document.execCommand('copy'); showToast(okMsg, droppedLines > 0 ? 'warn' : 'ok'); }
                    catch { showToast(I18N.ocr_failed + clipErr, 'err'); }
                    finally { ta.remove(); }
                }
            } catch (e) {
                showToast(I18N.ocr_failed + (e && e.message || e), 'err');
            }
        });
        // Esc cancels.
        const onKey = (e) => {
            if (e.key === 'Escape') {
                stopOcr();
                document.removeEventListener('keydown', onKey);
            }
        };
        document.addEventListener('keydown', onKey);
    };

    const stopOcr = () => {
        ocrActive = false;
        ocrBtn.classList.remove('active');
        if (overlayEl) {
            if (overlayEl._cleanup) overlayEl._cleanup();
            overlayEl.remove();
            overlayEl = null;
            rectEl = null;
        }
        dragStart = null; dragRect = null;
    };

    ocrBtn.addEventListener('click', () => {
        if (ocrActive) stopOcr(); else startOcr();
    });

    // Restore + persist language selection. Defaults to chi_tra+eng so
    // mixed Chinese/English/digit content (the common operator workload)
    // works out of the box.
    const langSel = document.getElementById('ocr-lang');
    if (langSel) {
        const saved = localStorage.getItem('ocr_lang') || 'chi_tra+eng';
        const opts = Array.from(langSel.options).map((o) => o.value);
        langSel.value = opts.indexOf(saved) >= 0 ? saved : 'chi_tra+eng';
        langSel.addEventListener('change', () => {
            localStorage.setItem('ocr_lang', langSel.value);
        });
    }
}

// ── Paste-as-keystrokes ───────────────────────────────────────────────
//
// Sends typed text to the guest by replaying each character as a
// keypress through noVNC's RFB.sendKey(). Works for ASCII printable
// (0x20–0x7E) + CR/LF/Tab; CJK / emoji can't be expressed as X11
// keysyms over the RFB keyboard channel, so they're filtered out and
// the user is told how many were skipped.
const pasteBtn = document.getElementById('paste');
const pasteModal = document.getElementById('paste-modal');
const pasteText = document.getElementById('paste-text');
const pasteSpeed = document.getElementById('paste-speed');
const pasteSendBtn = document.getElementById('paste-send');
let pasting = false;

const openPasteModal = () => {
    if (!rfb) return;
    pasteText.value = '';
    pasteModal.classList.remove('hidden');
    setTimeout(() => pasteText.focus(), 30);
};
const closePasteModal = () => {
    pasteModal.classList.add('hidden');
};

const sendKeystrokes = async (text) => {
    if (!rfb || !text || pasting) return;
    pasting = true;
    pasteSendBtn.disabled = true;
    const delay = parseInt(pasteSpeed.value, 10) || 15;
    let sent = 0, skipped = 0;
    try {
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const cp = text.charCodeAt(i);
            // Surrogate-pair codepoint (emoji etc.) → can't send.
            if (cp >= 0xD800 && cp <= 0xDFFF) {
                skipped++;
                if (cp >= 0xD800 && cp <= 0xDBFF) i++;  // skip the low surrogate too
                continue;
            }
            let keysym = null;
            if (ch === '\\r') {
                continue;  // CRLF → handled when we hit \\n
            } else if (ch === '\\n') {
                keysym = 0xff0d;  // Return
            } else if (ch === '\\t') {
                keysym = 0xff09;  // Tab
            } else if (cp >= 0x20 && cp <= 0x7e) {
                keysym = cp;       // ASCII printable maps 1:1 to X11 keysyms
            } else {
                skipped++;
                continue;
            }
            try {
                rfb.sendKey(keysym, null, true);
                rfb.sendKey(keysym, null, false);
                sent++;
            } catch (_) { skipped++; }
            // Small inter-character delay so guest's input layer keeps up.
            // Without this, fast typing (esp. into shells with readline)
            // sometimes drops or merges keys.
            if (delay > 0) await new Promise((r) => setTimeout(r, delay));
        }
        let msg = I18N.paste_done.replace('{n}', sent);
        let kind = 'ok';
        if (skipped > 0) {
            msg += ' · ' + I18N.paste_skipped.replace('{n}', skipped);
            kind = 'warn';
        }
        showToast(msg, kind);
    } finally {
        pasting = false;
        pasteSendBtn.disabled = false;
    }
};

if (pasteBtn) {
    pasteBtn.addEventListener('click', openPasteModal);
}
if (pasteModal) {
    pasteModal.addEventListener('click', (e) => {
        if (e.target === pasteModal) closePasteModal();
    });
    pasteModal.querySelectorAll('[data-paste-cancel]').forEach((el) => {
        el.addEventListener('click', closePasteModal);
    });
    const fromClip = pasteModal.querySelector('[data-paste-clipboard]');
    if (fromClip) {
        fromClip.addEventListener('click', async () => {
            try {
                const t = await navigator.clipboard.readText();
                pasteText.value = t || '';
            } catch (e) {
                showToast(I18N.ocr_failed + (e && e.message || e), 'err');
            }
        });
    }
    pasteSendBtn.addEventListener('click', async () => {
        const t = pasteText.value;
        if (!t) { showToast(I18N.paste_empty, 'warn'); return; }
        closePasteModal();
        await sendKeystrokes(t);
    });
    // Ctrl/⌘+Enter inside textarea = send.
    pasteText.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            pasteSendBtn.click();
        } else if (e.key === 'Escape') {
            closePasteModal();
        }
    });
}
</script>
</body>
</html>
"""


@auth_required
async def console_page_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    vmid = int(request.match_info["vmid"])
    # The main React app passes the VM name through ?name=... so we can show
    # it in the page title and titlebar without a server-side lookup race
    # (cluster_manager cache may not yet contain a freshly-created VM).
    vm_name = (request.query.get("name") or "").strip()
    # Build the shown labels.
    heading = f"VM {vmid}" + (f" — {vm_name}" if vm_name else "")
    page_title = f"JT-PROXENSE — {heading}@{node}"

    lang = _pick_lang(request)
    s = _I18N[lang]

    import html as _html
    heading_safe = _html.escape(heading)
    page_title_safe = _html.escape(page_title)

    html = (_TEMPLATE
            .replace("{{HTML_LANG}}", lang)
            .replace("{{VMID}}", str(vmid))
            .replace("{{NODE}}", node)
            .replace("{{CLUSTER}}", cluster_id)
            .replace("{{CLUSTER_JSON}}", json.dumps(cluster_id))
            .replace("{{NODE_JSON}}", json.dumps(node))
            .replace("{{I18N_JSON}}", json.dumps(s, ensure_ascii=False))
            .replace("{{HEADING}}", heading_safe)
            .replace("{{VM_TITLE}}", page_title_safe)
            .replace("{{T_TITLE}}", s["title_console"])
            .replace("{{T_STATUS_CONNECTING}}", s["status_connecting"])
            .replace("{{T_BTN_CAD}}", s["btn_cad"])
            .replace("{{T_BTN_CAD_TITLE}}", s["btn_cad_title"])
            .replace("{{T_BTN_RECONNECT}}", s["btn_reconnect"])
            .replace("{{T_BTN_FULLSCREEN}}", s["btn_fullscreen"])
            .replace("{{T_BTN_SEND_KEYS}}", s["btn_send_keys"])
            .replace("{{T_OVERLAY_LEAD}}", s["overlay_lead"])
            .replace("{{T_OVERLAY_MSG}}", s["overlay_msg"])
            .replace("{{T_BTN_OCR}}", s["btn_ocr"])
            .replace("{{T_BTN_OCR_TITLE}}", s["btn_ocr_title"])
            .replace("{{T_OCR_RUNNING}}", s["ocr_running"])
            .replace("{{T_OCR_COPIED}}", s["ocr_copied"])
            .replace("{{T_OCR_NO_TEXT}}", s["ocr_no_text"])
            .replace("{{T_OCR_FAILED}}", s["ocr_failed"])
            .replace("{{T_OCR_LANG}}", s["ocr_lang"])
            .replace("{{T_BTN_PASTE}}", s["btn_paste"])
            .replace("{{T_BTN_PASTE_TITLE}}", s["btn_paste_title"])
            .replace("{{T_PASTE_TITLE}}", s["paste_title"])
            .replace("{{T_PASTE_HINT}}", s["paste_hint"])
            .replace("{{T_PASTE_SEND}}", s["paste_send"])
            .replace("{{T_PASTE_CANCEL}}", s["paste_cancel"])
            .replace("{{T_PASTE_CLIPBOARD}}", s["paste_clipboard"])
            .replace("{{T_PASTE_SPEED}}", s["paste_speed"])
            .replace("{{T_OCR_OVERLAY_HINT}}", s["ocr_overlay_hint"])
            .replace("{{T_OCR_BARS_WARN}}", s["ocr_bars_warn"])
            .replace("{{T_OCR_BARS_FILTERED}}", s["ocr_bars_filtered"]))

    return web.Response(
        text=html,
        content_type="text/html", charset="utf-8",
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            # All resources (HTML/CSS/JS/fonts/noVNC) are served from same
            # origin — no third-party CDNs. This is a hard project rule:
            # the system must run fully offline / air-gapped. WS connections
            # stay on self too (the bridge to PVE is server-side).
            "Content-Security-Policy":
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline'; "
                "style-src 'self' 'unsafe-inline'; "
                "font-src 'self' data:; "
                "img-src 'self' data:; "
                "connect-src 'self' wss: ws:;",
        },
    )
