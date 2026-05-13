"""Server-rendered cyberpunk TOTP enrollment / management page.

Visiting `/totp` while authenticated lets the user:
  - enroll TOTP (generates a QR + manual-entry secret + verifies their first code)
  - see backup codes once after successful enrollment
  - disable their TOTP (must enter a current code)

Anonymous → 302 to /login (handled by middleware on the path being NOT public).
"""
from __future__ import annotations

import json

from aiohttp import web

from .middleware import auth_required
from .page_i18n import pick_lang


_I18N: dict[str, dict[str, str]] = {
    "en": {
        "title":             "2FA Setup",
        "back":              "« Dashboard",
        "status_h":          "Status",
        "status_loading":    "Loading current 2FA state for {user}...",
        "signed_in":         "Signed in as",
        "role":              "role",
        "pill_enabled":      "2FA enabled",
        "pill_disabled":     "2FA not enabled",
        "backup_remaining":  "{n} backup codes remaining",
        "backup_remaining_1":"{n} backup code remaining",
        "btn_setup":         "Set up authenticator »",
        "btn_re_enroll":     "Re-enroll authenticator (regenerates backup codes)",
        "btn_disable":       "Disable 2FA",
        "enroll_h":          "Enroll Authenticator",
        "enroll_lead":       "Scan the QR code with any TOTP authenticator (Google Authenticator, 1Password, Authy, etc.). If you can't scan, type the secret manually.",
        "manual_entry":      "Manual entry:",
        "issuer":            "Issuer",
        "secret":            "Secret",
        "confirm_lead":      "Then type a fresh 6-digit code to confirm:",
        "ph_six":            "6 digits",
        "btn_confirm":       "Confirm »",
        "btn_generating":    "Generating...",
        "err_start":         "Failed to start enrollment.",
        "err_invalid_totp":  "Code didn't match — check your authenticator clock and try again.",
        "err_verify":        "Verification failed.",
        "backup_h":          "Backup Codes",
        "backup_warn":       "Save these now. Each works once if you lose your authenticator. They will not be shown again.",
        "btn_copy":          "Copy all to clipboard",
        "btn_copied":        "Copied",
        "btn_copy_failed":   "Copy failed",
        "btn_download":      "Download as .txt",
        "btn_done":          "I saved them »",
        "disable_h":         "Disable 2FA",
        "disable_lead":      "Confirms your identity by requiring a current TOTP code.",
        "ph_six_or_backup":  "6 digits or backup code",
        "btn_disable_2fa":   "Disable Two-Factor",
        "ok_disabled":       "2FA disabled.",
        "err_invalid_code":  "Invalid code.",
        "err_failed":        "Failed.",
        "backup_file_title": "JT-PROXENSE TOTP backup codes",
        "backup_file_acct":  "Account:",
        "backup_file_gen":   "Generated:",
        "backup_file_warn":  "WARNING:   Each code works ONCE. Treat as a password.",
    },
    "zh-TW": {
        "title":             "雙因素認證設定",
        "back":              "« 儀表板",
        "status_h":          "狀態",
        "status_loading":    "正在載入 {user} 的 2FA 狀態...",
        "signed_in":         "目前登入",
        "role":              "角色",
        "pill_enabled":      "已啟用 2FA",
        "pill_disabled":     "尚未啟用 2FA",
        "backup_remaining":  "剩餘 {n} 個備援碼",
        "backup_remaining_1":"剩餘 {n} 個備援碼",
        "btn_setup":         "設定驗證器 »",
        "btn_re_enroll":     "重新註冊驗證器（重新產生備援碼）",
        "btn_disable":       "停用 2FA",
        "enroll_h":          "註冊驗證器",
        "enroll_lead":       "用任意 TOTP 驗證器（Google Authenticator、1Password、Authy 等）掃描 QR 碼。若無法掃描，可手動輸入金鑰。",
        "manual_entry":      "手動輸入：",
        "issuer":            "發行者",
        "secret":            "金鑰",
        "confirm_lead":      "輸入一組目前的 6 位數驗證碼確認：",
        "ph_six":            "6 位數",
        "btn_confirm":       "確認 »",
        "btn_generating":    "產生中...",
        "err_start":         "無法啟動註冊流程。",
        "err_invalid_totp":  "驗證碼不正確 — 請確認驗證器時間後再試。",
        "err_verify":        "驗證失敗。",
        "backup_h":          "備援碼",
        "backup_warn":       "請立即保存。每個備援碼只能用一次，且不會再顯示。",
        "btn_copy":          "複製全部到剪貼簿",
        "btn_copied":        "已複製",
        "btn_copy_failed":   "複製失敗",
        "btn_download":      "下載為 .txt",
        "btn_done":          "已保存 »",
        "disable_h":         "停用 2FA",
        "disable_lead":      "需要目前的 TOTP 驗證碼以確認身分。",
        "ph_six_or_backup":  "6 位數或備援碼",
        "btn_disable_2fa":   "停用雙因素認證",
        "ok_disabled":       "2FA 已停用。",
        "err_invalid_code":  "驗證碼錯誤。",
        "err_failed":        "失敗。",
        "backup_file_title": "JT-PROXENSE TOTP 備援碼",
        "backup_file_acct":  "帳號：",
        "backup_file_gen":   "產生時間：",
        "backup_file_warn":  "警告：每個備援碼只能用一次，請當成密碼保護。",
    },
}


_TEMPLATE = """<!DOCTYPE html>
<html lang="{{LANG}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JT-PROXENSE — {{T_TITLE}}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <style>
        /* Locked to the SPA's --primary / --bg-* palette (styles.css :root). */
        :root {
            --bg: #0a0a0f; --bg-elev: #0d1117; --bg-elev-2: #1a1a25;
            --cyan: #00f0ff; --cyan-soft: rgba(0,240,255,.18);
            --cyan-glow: rgba(0,240,255,.40);
            --magenta: #e066ff; --green: #00ff88; --red: #ff0040;
            --orange: #ff6b00;
            --text: #e8e8e8; --text-dim: #a0a0a0; --text-muted: #707070;
            --border: rgba(0,240,255,.16);
        }
        @font-face { font-family: Orbitron; src: url(/fonts/orbitron-700.woff2) format('woff2'); font-weight: 700; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-400.woff2) format('woff2'); font-weight: 400; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-500.woff2) format('woff2'); font-weight: 500; }
        @font-face { font-family: 'Share Tech Mono'; src: url(/fonts/share-tech-mono-400.woff2) format('woff2'); }

        * { box-sizing: border-box; }
        html, body {
            margin: 0; padding: 0; min-height: 100vh;
            background: var(--bg); color: var(--text);
            font-family: Rajdhani, system-ui, sans-serif;
        }
        body {
            background:
                radial-gradient(ellipse 1000px 500px at 50% -100px, rgba(0,240,255,.07), transparent 60%),
                radial-gradient(ellipse 600px 300px at 100% 200px, rgba(191,0,255,.05), transparent 60%),
                var(--bg);
            background-attachment: fixed;
        }
        body::after {
            content: ''; position: fixed; inset: 0; pointer-events: none;
            background-image: repeating-linear-gradient(180deg, transparent 0, transparent 2px, rgba(255,255,255,.012) 2px, rgba(255,255,255,.012) 3px);
        }

        @keyframes fadeIn  { from {opacity:0; transform: translateY(8px);} to {opacity:1; transform: none;} }
        @keyframes pulseDot { 0%,100% {opacity:1;} 50% {opacity:.35;} }

        .container {
            max-width: 720px; margin: 0 auto; padding: 32px 24px;
            position: relative; z-index: 2;
            animation: fadeIn .35s ease;
        }
        header {
            display: flex; align-items: baseline; justify-content: space-between;
            border-bottom: 1px solid var(--border); padding-bottom: 14px; margin-bottom: 26px;
        }
        h1 {
            margin: 0;
            font-family: Orbitron, sans-serif; font-weight: 700;
            font-size: 22px; letter-spacing: .08em; text-transform: uppercase;
        }
        h1 .accent { color: var(--cyan); }
        nav.top a {
            color: var(--text-dim); margin-left: 16px;
            font-size: 13px; letter-spacing: .04em; text-transform: uppercase;
            text-decoration: none; transition: color .15s ease, text-shadow .15s ease;
        }
        nav.top a:hover { color: var(--cyan); text-shadow: 0 0 8px var(--cyan-glow); }

        .card {
            background: linear-gradient(180deg, var(--bg-elev), var(--bg));
            border: 1px solid var(--border); border-radius: 12px;
            padding: 28px;
            margin-bottom: 18px;
            position: relative; overflow: hidden;
            animation: fadeIn .4s ease;
        }
        .card::before {
            content: '';
            position: absolute; top: 0; left: 0; right: 0; height: 2px;
            background: linear-gradient(90deg, var(--cyan), var(--magenta));
            transform: scaleX(0); transform-origin: left;
            transition: transform .4s ease;
        }
        .card:hover::before { transform: scaleX(1); }

        .pill {
            display: inline-flex; align-items: center; gap: 8px;
            font-family: 'Share Tech Mono', monospace;
            font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
            color: var(--cyan);
            padding: 4px 12px;
            border: 1px solid var(--cyan-soft); border-radius: 999px;
            background: rgba(0,240,255,.04);
        }
        .pill.green  { color: var(--green); border-color: rgba(0,255,136,.3); }
        .pill.orange { color: var(--orange); border-color: rgba(255,138,60,.3); }
        .pill.green::before, .pill.orange::before, .pill::before {
            content: ''; width: 6px; height: 6px; border-radius: 50%;
            background: currentColor; box-shadow: 0 0 8px currentColor;
            animation: pulseDot 1.6s ease-in-out infinite;
        }

        h2 { font-family: Orbitron, sans-serif; font-size: 16px; letter-spacing: .04em; margin: 0 0 12px; color: var(--text); }
        p { color: var(--text-dim); line-height: 1.55; }
        code {
            font-family: 'Share Tech Mono', monospace;
            background: #02050b; color: var(--cyan);
            padding: 1px 6px; border-radius: 3px; font-size: 13px;
        }

        label {
            display: block; font-size: 12px; letter-spacing: .08em;
            text-transform: uppercase; color: var(--text-dim);
            margin: 16px 0 6px; font-weight: 500;
        }
        input {
            width: 100%; padding: 11px 14px;
            background: #02050b; color: var(--text);
            border: 1px solid var(--border); border-radius: 6px;
            font-family: 'Share Tech Mono', monospace; font-size: 14px;
            outline: none; transition: border-color .15s, box-shadow .15s;
        }
        input:focus { border-color: var(--cyan); box-shadow: 0 0 0 3px var(--cyan-soft); }

        button {
            padding: 10px 22px; margin-top: 14px;
            font-family: Orbitron, sans-serif; font-size: 12px; font-weight: 600;
            letter-spacing: .1em; text-transform: uppercase;
            color: #001018;
            background: linear-gradient(135deg, var(--cyan), #00b8d4);
            border: none; border-radius: 6px; cursor: pointer;
            box-shadow: 0 0 16px var(--cyan-glow);
            transition: transform .12s, box-shadow .15s, background .15s;
        }
        button:hover  { transform: translateY(-1px); box-shadow: 0 0 22px var(--cyan-glow); }
        button:disabled { opacity: .5; cursor: wait; transform: none; box-shadow: none; }
        button.ghost {
            color: var(--cyan);
            background: rgba(0,240,255,.05);
            border: 1px solid var(--cyan-soft);
            box-shadow: none;
        }
        button.ghost:hover { background: rgba(0,240,255,.18); box-shadow: 0 0 14px var(--cyan-soft); }
        button.danger {
            color: #1a0006;
            background: linear-gradient(135deg, var(--red), #c41a3a);
            box-shadow: 0 0 14px rgba(255,56,96,.4);
            border: none;
        }
        button.danger:hover { box-shadow: 0 0 22px rgba(255,56,96,.5); transform: translateY(-1px); }
        .pill.green { color: var(--green); border-color: rgba(0,255,136,.3); }
        .pill.orange { color: var(--orange); border-color: rgba(255,138,60,.3); }

        .qr-block {
            display: flex; gap: 24px; align-items: center;
            margin: 20px 0;
            padding: 18px;
            background: #02050b;
            border: 1px solid var(--border); border-radius: 8px;
        }
        .qr-block img { width: 192px; height: 192px; image-rendering: pixelated; flex-shrink: 0; }
        .qr-meta { flex: 1; }
        .qr-meta .secret-row {
            display: flex; align-items: center; gap: 8px;
            font-family: 'Share Tech Mono', monospace; font-size: 13px;
            word-break: break-all;
            background: var(--bg-elev-2); padding: 8px 12px; border-radius: 4px;
            border: 1px solid var(--border);
        }
        .qr-meta .secret-row .key { color: var(--magenta); flex-shrink: 0; }
        .qr-meta .secret-row .val { color: var(--cyan); }

        .codes {
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
            margin: 16px 0;
            font-family: 'Share Tech Mono', monospace; font-size: 14px;
        }
        .codes div {
            padding: 10px 14px;
            background: #02050b; color: var(--cyan);
            border: 1px solid var(--cyan-soft); border-radius: 4px;
            text-align: center; letter-spacing: .04em;
        }

        .err {
            margin-top: 14px;
            padding: 12px 14px;
            background: rgba(255,56,96,.08);
            border-left: 3px solid var(--red);
            border-radius: 4px;
            font-size: 13px; color: var(--text);
            animation: fadeIn .25s ease;
        }
        .ok {
            margin-top: 14px;
            padding: 12px 14px;
            background: rgba(0,255,136,.06);
            border-left: 3px solid var(--green);
            border-radius: 4px;
            font-size: 13px; color: var(--text);
            animation: fadeIn .25s ease;
        }
        .hidden { display: none; }
    </style>
</head>
<body>
<div class="container">
    <header>
        <div>
            <h1>JT-<span class="accent">PROXENSE</span> &middot; {{T_TITLE}}</h1>
        </div>
        <nav class="top">
            <a href="/">{{T_BACK}}</a>
        </nav>
    </header>

    <div class="card" id="statusCard">
        <h2>{{T_STATUS_H}}</h2>
        <p id="statusLoading"></p>
    </div>

    <div class="card hidden" id="enrollCard">
        <h2>{{T_ENROLL_H}}</h2>
        <p>{{T_ENROLL_LEAD}}</p>
        <div class="qr-block">
            <img id="qr" alt="">
            <div class="qr-meta">
                <p style="margin-top:0">{{T_MANUAL_ENTRY}}</p>
                <div class="secret-row">
                    <span class="key">{{T_ISSUER}}</span>
                    <span>:</span>
                    <span class="val">JT-PROXENSE</span>
                </div>
                <div class="secret-row" style="margin-top:6px">
                    <span class="key">{{T_SECRET}}</span>
                    <span>:</span>
                    <span class="val" id="secret"></span>
                </div>
            </div>
        </div>
        <p>{{T_CONFIRM_LEAD}}</p>
        <input type="text" id="verifyCode" inputmode="numeric" pattern="[0-9]*"
               autocomplete="one-time-code" placeholder="{{T_PH_SIX}}"
               style="font-family:'Share Tech Mono',monospace; font-size:18px; letter-spacing:.4em; text-align:center;">
        <button id="verifyBtn">{{T_BTN_CONFIRM}}</button>
        <div class="err hidden" id="verifyErr"></div>
    </div>

    <div class="card hidden" id="backupCard">
        <h2>{{T_BACKUP_H}}</h2>
        <p style="color: var(--orange)" id="backupWarn"></p>
        <div class="codes" id="codes"></div>
        <button class="ghost" id="copyBackup">{{T_BTN_COPY}}</button>
        <button class="ghost" id="downloadBackup" style="margin-left:8px;">{{T_BTN_DOWNLOAD}}</button>
        <button id="doneBtn" style="margin-left:8px;">{{T_BTN_DONE}}</button>
    </div>

    <div class="card hidden" id="disableCard">
        <h2>{{T_DISABLE_H}}</h2>
        <p>{{T_DISABLE_LEAD}}</p>
        <input type="text" id="disableCode" inputmode="numeric" pattern="[0-9]*"
               autocomplete="one-time-code" placeholder="{{T_PH_SIX_OR_BACKUP}}"
               style="font-family:'Share Tech Mono',monospace; font-size:18px; letter-spacing:.4em; text-align:center;">
        <button class="danger" id="disableBtn">{{T_BTN_DISABLE_2FA}}</button>
        <div class="err hidden" id="disableErr"></div>
        <div class="ok hidden" id="disableOk">{{T_OK_DISABLED}}</div>
    </div>
</div>

<script>
const I18N = {{I18N_JSON}};
const $ = (id) => document.getElementById(id);
const show = (el) => el.classList.remove('hidden');
const hide = (el) => el.classList.add('hidden');

// 'Save these now…' line — uses an i18n string but keeps `<strong>` flavor.
$('backupWarn').innerHTML = escapeHtml(I18N.backup_warn);

let user = null;

async function loadStatus() {
    const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (!r.ok) { window.location.replace('/login'); return; }
    const d = await r.json();
    if (!d.authenticated) { window.location.replace('/login'); return; }
    user = d.user;
    $('statusLoading').textContent = I18N.status_loading.replace('{user}', user.username);

    let status = { enabled: false, backup_codes_remaining: 0 };
    try {
        const sr = await fetch('/api/auth/totp/status', { credentials: 'same-origin' });
        if (sr.ok) status = await sr.json();
    } catch (e) { /* fall through with defaults */ }

    const remaining = status.backup_codes_remaining;
    const remainTxt = (remaining === 1 ? I18N.backup_remaining_1 : I18N.backup_remaining)
        .replace('{n}', remaining);
    const enrolledHtml = status.enabled
        ? `<span class="pill green">${escapeHtml(I18N.pill_enabled)}</span>
           <span style="margin-left:10px; color: var(--text-dim); font-family: 'Share Tech Mono', monospace; font-size: 13px;">
                ${escapeHtml(remainTxt)}
           </span>`
        : `<span class="pill orange">${escapeHtml(I18N.pill_disabled)}</span>`;

    $('statusCard').innerHTML = `
        <h2>${escapeHtml(I18N.status_h)}</h2>
        <p>${escapeHtml(I18N.signed_in)} <code>${escapeHtml(user.username)}</code> &middot;
           ${escapeHtml(I18N.role)} <code>${escapeHtml(user.role_global || 'none')}</code></p>
        <p>${enrolledHtml}</p>
        <div style="margin-top:12px;">
            ${status.enabled
                ? '<button id="startEnroll" class="ghost">' + escapeHtml(I18N.btn_re_enroll) + '</button>'
                + '<button class="danger" id="startDisable" style="margin-left:10px;">' + escapeHtml(I18N.btn_disable) + '</button>'
                : '<button id="startEnroll">' + escapeHtml(I18N.btn_setup) + '</button>'
            }
        </div>
    `;
    $('startEnroll').addEventListener('click', startEnroll);
    if ($('startDisable')) {
        $('startDisable').addEventListener('click', () => { hide($('enrollCard')); show($('disableCard')); });
    }
}

async function startEnroll() {
    hide($('disableCard'));
    hide($('backupCard'));
    show($('enrollCard'));
    $('verifyBtn').disabled = true;
    $('verifyBtn').textContent = I18N.btn_generating;
    try {
        const r = await fetch('/api/auth/totp/enroll-init', {
            method: 'POST', credentials: 'same-origin',
        });
        const d = await r.json();
        $('qr').src = d.qr_data_uri;
        $('secret').textContent = d.secret;
        $('verifyBtn').disabled = false;
        $('verifyBtn').textContent = I18N.btn_confirm;
        $('verifyCode').focus();
    } catch (e) {
        $('verifyBtn').disabled = false;
        $('verifyErr').textContent = I18N.err_start;
        show($('verifyErr'));
    }
}

$('verifyBtn').addEventListener('click', async () => {
    hide($('verifyErr'));
    $('verifyBtn').disabled = true;
    const code = $('verifyCode').value.trim();
    try {
        const r = await fetch('/api/auth/totp/enroll-verify', {
            method: 'POST', credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({code}),
        });
        if (!r.ok) {
            const d = await r.json().catch(()=>({}));
            $('verifyErr').textContent = d.error === 'invalid_totp'
                ? I18N.err_invalid_totp
                : I18N.err_verify;
            show($('verifyErr'));
            $('verifyBtn').disabled = false;
            return;
        }
        const d = await r.json();
        // Show backup codes
        $('codes').innerHTML = d.backup_codes.map(c => '<div>' + escapeHtml(c) + '</div>').join('');
        hide($('enrollCard'));
        show($('backupCard'));
    } finally {
        $('verifyBtn').disabled = false;
    }
});

function backupCodesText() {
    const codes = [...$('codes').children].map(el => el.textContent);
    const ts = new Date().toISOString();
    return [
        I18N.backup_file_title,
        I18N.backup_file_acct + '  ' + (user ? user.username : 'unknown'),
        I18N.backup_file_gen + '  ' + ts,
        I18N.backup_file_warn,
        '',
        ...codes,
        '',
    ].join('\\n');
}

$('copyBackup')?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(backupCodesText()); $('copyBackup').textContent = I18N.btn_copied; }
    catch { $('copyBackup').textContent = I18N.btn_copy_failed; }
    setTimeout(() => { $('copyBackup').textContent = I18N.btn_copy; }, 1800);
});

$('downloadBackup')?.addEventListener('click', () => {
    const blob = new Blob([backupCodesText()], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `jt-proxense-backup-codes-${user ? user.username : 'user'}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
});

$('doneBtn')?.addEventListener('click', () => { window.location.replace('/'); });

$('disableBtn').addEventListener('click', async () => {
    hide($('disableErr')); hide($('disableOk'));
    $('disableBtn').disabled = true;
    const code = $('disableCode').value.trim();
    const r = await fetch('/api/auth/totp/disable', {
        method: 'POST', credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({code}),
    });
    if (r.ok) { show($('disableOk')); }
    else {
        const d = await r.json().catch(()=>({}));
        $('disableErr').textContent = d.error === 'invalid_totp'
            ? I18N.err_invalid_code : (d.error || I18N.err_failed);
        show($('disableErr'));
    }
    $('disableBtn').disabled = false;
});

function escapeHtml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

loadStatus();
</script>
</body>
</html>
"""


@auth_required
async def totp_page_handler(request: web.Request) -> web.Response:
    lang = pick_lang(request)
    s = _I18N[lang]
    html = (_TEMPLATE
            .replace("{{LANG}}", lang)
            .replace("{{I18N_JSON}}", json.dumps(s, ensure_ascii=False))
            .replace("{{T_TITLE}}", s["title"])
            .replace("{{T_BACK}}", s["back"])
            .replace("{{T_STATUS_H}}", s["status_h"])
            .replace("{{T_ENROLL_H}}", s["enroll_h"])
            .replace("{{T_ENROLL_LEAD}}", s["enroll_lead"])
            .replace("{{T_MANUAL_ENTRY}}", s["manual_entry"])
            .replace("{{T_ISSUER}}", s["issuer"])
            .replace("{{T_SECRET}}", s["secret"])
            .replace("{{T_CONFIRM_LEAD}}", s["confirm_lead"])
            .replace("{{T_PH_SIX}}", s["ph_six"])
            .replace("{{T_BTN_CONFIRM}}", s["btn_confirm"])
            .replace("{{T_BACKUP_H}}", s["backup_h"])
            .replace("{{T_BTN_COPY}}", s["btn_copy"])
            .replace("{{T_BTN_DOWNLOAD}}", s["btn_download"])
            .replace("{{T_BTN_DONE}}", s["btn_done"])
            .replace("{{T_DISABLE_H}}", s["disable_h"])
            .replace("{{T_DISABLE_LEAD}}", s["disable_lead"])
            .replace("{{T_PH_SIX_OR_BACKUP}}", s["ph_six_or_backup"])
            .replace("{{T_BTN_DISABLE_2FA}}", s["btn_disable_2fa"])
            .replace("{{T_OK_DISABLED}}", s["ok_disabled"]))
    return web.Response(
        text=html, content_type="text/html", charset="utf-8",
        headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
    )
