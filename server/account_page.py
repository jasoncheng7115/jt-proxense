"""Self-service /account page — change password, see profile, link to /totp.

Authenticated users only. PAM-managed users see a notice that password
changes happen via the system's passwd tooling.
"""
from __future__ import annotations

import json

from aiohttp import web

from .middleware import auth_required
from .page_i18n import pick_lang


_I18N: dict[str, dict[str, str]] = {
    "en": {
        "title":           "Account settings",
        "back":            "« Dashboard",
        "profile":         "Profile",
        "loading":         "loading...",
        "signed_in_as":    "// signed in as",
        "change_pw":       "Change password",
        "change_pw_lead":  "Enter your current password to confirm, then a new one (min 8 chars).",
        "label_current":   "Current password",
        "label_new1":      "New password",
        "label_new2":      "Confirm new password",
        "btn_change":      "Change password »",
        "ok_updated":      "Password updated.",
        "tfa_title":       "Two-factor authentication",
        "tfa_lead":        "Manage TOTP enrollment + backup codes.",
        "tfa_open":        "Open 2FA setup »",
        "err_required":    "All fields required",
        "err_mismatch":    "New passwords do not match",
        "err_too_short":   "New password must be at least 8 characters",
        "err_pam":         "This account is managed by your system's PAM — change it via passwd.",
        "err_current_bad": "Current password is incorrect.",
        "err_generic":     "Password change failed",
    },
    "zh-TW": {
        "title":           "帳號設定",
        "back":            "« 儀表板",
        "profile":         "個人資料",
        "loading":         "載入中...",
        "signed_in_as":    "// 目前登入帳號",
        "change_pw":       "變更密碼",
        "change_pw_lead":  "請先輸入目前的密碼進行確認，再設定新密碼（至少 8 個字元）。",
        "label_current":   "目前密碼",
        "label_new1":      "新密碼",
        "label_new2":      "確認新密碼",
        "btn_change":      "變更密碼 »",
        "ok_updated":      "密碼已更新。",
        "tfa_title":       "雙因素認證",
        "tfa_lead":        "管理 TOTP 註冊與備援碼。",
        "tfa_open":        "開啟 2FA 設定 »",
        "err_required":    "所有欄位必填",
        "err_mismatch":    "兩次新密碼不一致",
        "err_too_short":   "新密碼至少需 8 個字元",
        "err_pam":         "此帳號由系統 PAM 管理 — 請使用 passwd 指令變更。",
        "err_current_bad": "目前密碼錯誤。",
        "err_generic":     "密碼變更失敗",
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
        :root {
            --bg:#050810; --bg-elev:#0d1320; --bg-elev-2:#14182a;
            --cyan:#00f0ff; --cyan-soft:rgba(0,240,255,.18); --cyan-glow:rgba(0,240,255,.40);
            --magenta:#bf00ff; --green:#00ff88; --red:#ff3860; --orange:#ff8a3c;
            --text:#e6f6ff; --text-dim:#95a8c4; --text-muted:#6b7c93;
            --border:rgba(0,240,255,.16);
        }
        @font-face { font-family: Orbitron; src: url(/fonts/orbitron-700.woff2) format('woff2'); font-weight:700; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-400.woff2) format('woff2'); font-weight:400; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-500.woff2) format('woff2'); font-weight:500; }
        @font-face { font-family: 'Share Tech Mono'; src: url(/fonts/share-tech-mono-400.woff2) format('woff2'); }
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;min-height:100vh;background:var(--bg);color:var(--text);font-family:Rajdhani,system-ui,sans-serif}
        body{background:radial-gradient(ellipse 1000px 500px at 50% -100px,rgba(0,240,255,.07),transparent 60%),var(--bg);background-attachment:fixed}
        body::after{content:'';position:fixed;inset:0;pointer-events:none;background-image:repeating-linear-gradient(180deg,transparent 0,transparent 2px,rgba(255,255,255,.012) 2px,rgba(255,255,255,.012) 3px)}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.35}}
        .container{max-width:680px;margin:0 auto;padding:32px 24px;position:relative;z-index:2;animation:fadeIn .35s ease}
        header{display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:26px}
        h1{margin:0;font-family:Orbitron,sans-serif;font-weight:700;font-size:22px;letter-spacing:.08em;text-transform:uppercase}
        h1 .accent{color:var(--cyan)}
        nav.top a{color:var(--text-dim);margin-left:16px;font-size:13px;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;transition:color .15s,text-shadow .15s}
        nav.top a:hover{color:var(--cyan);text-shadow:0 0 8px var(--cyan-glow)}
        .card{background:linear-gradient(180deg,var(--bg-elev),var(--bg));border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:18px;position:relative;overflow:hidden;animation:fadeIn .4s ease}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--magenta));transform:scaleX(0);transform-origin:left;transition:transform .4s}
        .card:hover::before{transform:scaleX(1)}
        h2{display:flex;align-items:center;gap:8px;font-family:Orbitron,sans-serif;font-size:15px;letter-spacing:.04em;margin:0 0 14px;color:var(--text);text-transform:uppercase}
        h2 .h-ico{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;color:var(--cyan);filter:drop-shadow(0 0 4px var(--cyan-glow))}
        button{display:inline-flex;align-items:center;gap:7px}
        button .b-ico{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px}
        p{color:var(--text-dim);line-height:1.55}
        code{font-family:'Share Tech Mono',monospace;background:#02050b;color:var(--cyan);padding:1px 6px;border-radius:3px;font-size:13px}
        label{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-dim);margin:14px 0 6px;font-weight:500}
        input{width:100%;padding:11px 14px;background:#02050b;color:var(--text);border:1px solid var(--border);border-radius:6px;font-family:'Share Tech Mono',monospace;font-size:14px;outline:none;transition:border-color .15s,box-shadow .15s}
        input:focus{border-color:var(--cyan);box-shadow:0 0 0 3px var(--cyan-soft)}
        button{padding:10px 22px;margin-top:14px;font-family:Orbitron,sans-serif;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#001018;background:linear-gradient(135deg,var(--cyan),#00b8d4);border:none;border-radius:6px;cursor:pointer;box-shadow:0 0 16px var(--cyan-glow);transition:transform .12s,box-shadow .15s}
        button:hover{transform:translateY(-1px);box-shadow:0 0 22px var(--cyan-glow)}
        button:disabled{opacity:.5;cursor:wait;transform:none;box-shadow:none}
        button.ghost{color:var(--cyan);background:rgba(0,240,255,.05);border:1px solid var(--cyan-soft);box-shadow:none}
        .meta{display:flex;align-items:center;gap:8px;font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--text-dim);letter-spacing:.04em}
        .pill{display:inline-flex;align-items:center;gap:6px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:999px;border:1px solid currentColor}
        .pill.cyan{color:var(--cyan)} .pill.orange{color:var(--orange)} .pill.muted{color:var(--text-muted)}
        .pill::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor;animation:pulseDot 1.6s ease-in-out infinite}
        .err{margin-top:14px;padding:12px 14px;background:rgba(255,56,96,.08);border-left:3px solid var(--red);border-radius:4px;font-size:13px;animation:fadeIn .25s ease}
        .ok{margin-top:14px;padding:12px 14px;background:rgba(0,255,136,.06);border-left:3px solid var(--green);border-radius:4px;font-size:13px;animation:fadeIn .25s ease}
        .hidden{display:none}
    </style>
</head>
<body>
<div class="container">
    <header>
        <h1>JT-<span class="accent">PROXENSE</span> &middot; {{T_TITLE}}</h1>
        <nav class="top"><a href="/">{{T_BACK}}</a></nav>
    </header>

    <div class="card">
        <h2>
            <span class="h-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
            {{T_PROFILE}}
        </h2>
        <div class="meta" id="profile">{{T_LOADING}}</div>
    </div>

    <div class="card" id="pwCard">
        <h2>
            <span class="h-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg></span>
            {{T_CHANGE_PW}}
        </h2>
        <p id="pwLead">{{T_CHANGE_PW_LEAD}}</p>
        <div id="pwForm">
            <label for="cur">{{T_LABEL_CURRENT}}</label>
            <input id="cur" type="password" autocomplete="current-password">
            <label for="new1">{{T_LABEL_NEW1}}</label>
            <input id="new1" type="password" autocomplete="new-password">
            <label for="new2">{{T_LABEL_NEW2}}</label>
            <input id="new2" type="password" autocomplete="new-password">
            <button id="pwBtn">
                <span class="b-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>
                {{T_BTN_CHANGE}}
            </button>
            <div class="err hidden" id="pwErr"></div>
            <div class="ok hidden" id="pwOk">{{T_OK_UPDATED}}</div>
        </div>
    </div>

    <div class="card">
        <h2>
            <span class="h-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></span>
            {{T_TFA_TITLE}}
        </h2>
        <p>{{T_TFA_LEAD}}</p>
        <a href="/totp"><button class="ghost">
            <span class="b-ico"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
            {{T_TFA_OPEN}}
        </button></a>
    </div>
</div>

<script>
const I18N = {{I18N_JSON}};
const $=id=>document.getElementById(id);
const show=el=>el.classList.remove('hidden'); const hide=el=>el.classList.add('hidden');

let me=null;
async function loadProfile(){
    const r=await fetch('/api/auth/me',{credentials:'same-origin'});
    if(!r.ok){window.location.replace('/login');return}
    const d=await r.json();
    if(!d.authenticated){window.location.replace('/login');return}
    me=d.user;
    $('profile').innerHTML = `
        <span>${esc(I18N.signed_in_as)} <strong style="color:var(--text)">${esc(me.username)}</strong></span>
        <span class="pill ${roleClass(me.role_global)}">${esc(me.role_global||'guest')}</span>`;
}
function roleClass(r){return r==='admin'?'orange':(r?'cyan':'muted')}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]))}

$('pwBtn').addEventListener('click', async ()=>{
    hide($('pwErr')); hide($('pwOk'));
    const cur=$('cur').value, n1=$('new1').value, n2=$('new2').value;
    if(!cur||!n1){$('pwErr').textContent=I18N.err_required;show($('pwErr'));return}
    if(n1!==n2){$('pwErr').textContent=I18N.err_mismatch;show($('pwErr'));return}
    if(n1.length<8){$('pwErr').textContent=I18N.err_too_short;show($('pwErr'));return}
    $('pwBtn').disabled=true;
    const r=await fetch('/api/auth/change-password',{
        method:'POST',credentials:'same-origin',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({current_password:cur,new_password:n1})
    });
    $('pwBtn').disabled=false;
    if(r.ok){
        show($('pwOk'));
        $('cur').value=''; $('new1').value=''; $('new2').value='';
    } else {
        const d=await r.json().catch(()=>({}));
        const map={pam_managed:I18N.err_pam,
                   current_password_invalid:I18N.err_current_bad,
                   new_too_short:I18N.err_too_short};
        $('pwErr').textContent=map[d.error]||d.error||I18N.err_generic;
        show($('pwErr'));
    }
});

loadProfile();
</script>
</body>
</html>
"""


@auth_required
async def account_page_handler(request: web.Request) -> web.Response:
    lang = pick_lang(request)
    s = _I18N[lang]
    html = (_TEMPLATE
            .replace("{{LANG}}", lang)
            .replace("{{I18N_JSON}}", json.dumps(s, ensure_ascii=False))
            .replace("{{T_TITLE}}", s["title"])
            .replace("{{T_BACK}}", s["back"])
            .replace("{{T_PROFILE}}", s["profile"])
            .replace("{{T_LOADING}}", s["loading"])
            .replace("{{T_CHANGE_PW}}", s["change_pw"])
            .replace("{{T_CHANGE_PW_LEAD}}", s["change_pw_lead"])
            .replace("{{T_LABEL_CURRENT}}", s["label_current"])
            .replace("{{T_LABEL_NEW1}}", s["label_new1"])
            .replace("{{T_LABEL_NEW2}}", s["label_new2"])
            .replace("{{T_BTN_CHANGE}}", s["btn_change"])
            .replace("{{T_OK_UPDATED}}", s["ok_updated"])
            .replace("{{T_TFA_TITLE}}", s["tfa_title"])
            .replace("{{T_TFA_LEAD}}", s["tfa_lead"])
            .replace("{{T_TFA_OPEN}}", s["tfa_open"]))
    return web.Response(
        text=html, content_type="text/html", charset="utf-8",
        headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
    )
