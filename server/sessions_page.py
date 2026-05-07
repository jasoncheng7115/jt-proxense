"""Admin /sessions page — list active sessions, revoke individual or per-user.

Cyberpunk styled, table layout. Auto-refresh every 10 s.
"""
from __future__ import annotations

import json

from aiohttp import web

from .middleware import role_required
from .page_i18n import pick_lang


_I18N: dict[str, dict[str, str]] = {
    "en": {
        "title":           "Active sessions",
        "loading":         "loading...",
        "nav_dashboard":   "Dashboard",
        "nav_audit":       "Audit log",
        "nav_account":     "Account",
        "filter_ph":       "filter by username",
        "btn_refresh":     "Refresh »",
        "btn_auto_off":    "Auto: off",
        "btn_auto_on":     "Auto: 10s",
        "btn_revoke_all":  "Revoke ALL sessions for <user>...",
        "btn_revoke_user": "Revoke user",
        "th_user":         "User",
        "th_session":      "Session id",
        "th_ip":           "Source IP",
        "th_ua":           "User agent",
        "th_last_seen":    "Last seen",
        "th_expires":      "Expires",
        "empty_initial":   "No sessions loaded yet.",
        "empty_filtered":  "No active sessions match the filter.",
        "active_count":    "// {n} active session(s)",
        "err_admin":       "Admin role required.",
        "confirm_revoke":  "Revoke ALL sessions for {user}?",
        "alert_revoked":   "Revoked {n} session(s) for {user}",
        "alert_fail":      "Failed: HTTP {code}",
        "prompt_user":     "Username to revoke ALL sessions for:",
    },
    "zh-TW": {
        "title":           "使用中工作階段",
        "loading":         "載入中...",
        "nav_dashboard":   "儀表板",
        "nav_audit":       "稽核記錄",
        "nav_account":     "帳號設定",
        "filter_ph":       "依使用者篩選",
        "btn_refresh":     "重新整理 »",
        "btn_auto_off":    "自動：關",
        "btn_auto_on":     "自動：10 秒",
        "btn_revoke_all":  "終止 <使用者> 全部工作階段...",
        "btn_revoke_user": "終止使用者",
        "th_user":         "使用者",
        "th_session":      "工作階段 ID",
        "th_ip":           "來源 IP",
        "th_ua":           "使用者代理",
        "th_last_seen":    "最後活動",
        "th_expires":      "到期時間",
        "empty_initial":   "尚未載入工作階段。",
        "empty_filtered":  "沒有符合條件的使用中工作階段。",
        "active_count":    "// 目前 {n} 個使用中工作階段",
        "err_admin":       "需要 admin 角色。",
        "confirm_revoke":  "終止 {user} 全部工作階段？",
        "alert_revoked":   "已終止 {user} 的 {n} 個工作階段",
        "alert_fail":      "失敗：HTTP {code}",
        "prompt_user":     "要終止全部工作階段的使用者帳號：",
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
        :root { --bg:#050810; --bg-elev:#0d1320; --bg-elev-2:#14182a;
            --cyan:#00f0ff; --cyan-soft:rgba(0,240,255,.18); --cyan-glow:rgba(0,240,255,.40);
            --magenta:#bf00ff; --green:#00ff88; --red:#ff3860; --orange:#ff8a3c;
            --text:#e6f6ff; --text-dim:#95a8c4; --text-muted:#6b7c93;
            --border:rgba(0,240,255,.16); }
        @font-face{font-family:Orbitron;src:url(/fonts/orbitron-700.woff2) format('woff2');font-weight:700}
        @font-face{font-family:Rajdhani;src:url(/fonts/rajdhani-400.woff2) format('woff2');font-weight:400}
        @font-face{font-family:Rajdhani;src:url(/fonts/rajdhani-500.woff2) format('woff2');font-weight:500}
        @font-face{font-family:'Share Tech Mono';src:url(/fonts/share-tech-mono-400.woff2) format('woff2')}
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:Rajdhani,sans-serif;min-height:100vh}
        body{background:radial-gradient(ellipse 1200px 600px at 50% -100px,rgba(0,240,255,.06),transparent 60%),var(--bg);background-attachment:fixed}
        body::after{content:'';position:fixed;inset:0;pointer-events:none;background-image:repeating-linear-gradient(180deg,transparent 0,transparent 2px,rgba(255,255,255,.012) 2px,rgba(255,255,255,.012) 3px)}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .container{max-width:1200px;margin:0 auto;padding:24px;position:relative;z-index:2;animation:fadeIn .35s ease}
        header{display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:22px}
        h1{margin:0;font-family:Orbitron,sans-serif;font-weight:700;font-size:23px;letter-spacing:.08em;text-transform:uppercase}
        h1 .accent{color:var(--cyan)}
        nav.top a{color:var(--text-dim);margin-right:16px;font-size:14px;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;transition:color .15s}
        nav.top a:hover{color:var(--cyan)}
        .meta{font-family:'Share Tech Mono',monospace;font-size:13px;color:var(--text-muted);letter-spacing:.04em}
        .toolbar{display:flex;align-items:center;gap:12px;background:var(--bg-elev);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:16px}
        .toolbar input{padding:7px 10px;background:#02050b;color:var(--text);border:1px solid var(--border);border-radius:4px;font-family:'Share Tech Mono',monospace;font-size:14px;outline:none;flex:1;max-width:240px}
        .toolbar input:focus{border-color:var(--cyan);box-shadow:0 0 0 3px var(--cyan-soft)}
        button{padding:7px 14px;font-family:Orbitron,sans-serif;font-weight:600;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--cyan);background:rgba(0,240,255,.05);border:1px solid var(--cyan-soft);border-radius:4px;cursor:pointer;transition:background .15s}
        button:hover{background:rgba(0,240,255,.18)}
        button.primary{color:#001018;background:linear-gradient(135deg,var(--cyan),#00b8d4);border:none;box-shadow:0 0 12px rgba(0,240,255,.35)}
        button.danger{color:#1a0006;background:linear-gradient(135deg,var(--red),#c41a3a);border:none;box-shadow:0 0 10px rgba(255,56,96,.4)}
        button.danger:hover{box-shadow:0 0 18px rgba(255,56,96,.55)}
        table{width:100%;border-collapse:collapse;background:var(--bg-elev);border:1px solid var(--border);border-radius:10px;overflow:hidden;font-family:'Share Tech Mono',monospace;font-size:14px}
        thead{background:var(--bg-elev-2);font-family:Orbitron,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--cyan)}
        th,td{padding:8px 12px;text-align:left;border-bottom:1px solid rgba(0,240,255,.06)}
        tbody tr{transition:background .12s} tbody tr:hover{background:rgba(0,240,255,.04)}
        td.user{color:var(--text);font-weight:500} td.dim{color:var(--text-dim)}
        td.preview{color:var(--magenta);font-size:13px}
        .empty{text-align:center;padding:48px 12px;color:var(--text-muted)}
        .err{margin:12px 0;padding:12px;background:rgba(255,56,96,.08);border-left:3px solid var(--red);border-radius:4px}
        .hidden{display:none}
    </style>
</head>
<body>
<div class="container">
    <header>
        <div>
            <h1>JT-<span class="accent">PROXENSE</span> &middot; {{T_TITLE}}</h1>
            <div class="meta" id="status">{{T_LOADING}}</div>
        </div>
        <nav class="top">
            <a href="/">{{T_NAV_DASHBOARD}}</a>
            <a href="/audit">{{T_NAV_AUDIT}}</a>
            <a href="/account">{{T_NAV_ACCOUNT}}</a>
        </nav>
    </header>

    <div class="toolbar">
        <input type="text" id="filter" placeholder="{{T_FILTER_PH}}">
        <button id="refresh" class="primary">{{T_BTN_REFRESH}}</button>
        <button id="auto">{{T_BTN_AUTO_OFF}}</button>
        <span style="flex:1"></span>
        <button id="revokeUserBtn" class="danger">{{T_BTN_REVOKE_ALL}}</button>
    </div>

    <div class="err hidden" id="errBox"></div>

    <table>
        <thead><tr>
            <th style="width:140px">{{T_TH_USER}}</th>
            <th style="width:120px">{{T_TH_SESSION}}</th>
            <th style="width:130px">{{T_TH_IP}}</th>
            <th>{{T_TH_UA}}</th>
            <th style="width:160px">{{T_TH_LAST_SEEN}}</th>
            <th style="width:160px">{{T_TH_EXPIRES}}</th>
            <th style="width:110px"></th>
        </tr></thead>
        <tbody id="rows"><tr><td colspan="7" class="empty">{{T_EMPTY_INITIAL}}</td></tr></tbody>
    </table>
</div>

<script>
const I18N = {{I18N_JSON}};
const $=id=>document.getElementById(id);
let autoTimer=null;

function tsFmt(ms){if(!ms)return '—';return new Date(ms).toISOString().replace('T',' ').slice(0,19)+'Z'}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]))}

async function load(){
    $('errBox').classList.add('hidden');
    const filter=($('filter').value||'').trim().toLowerCase();
    let rows=[];
    try{
        const r=await fetch('/api/sessions',{credentials:'same-origin'});
        if(r.status===401){window.location.href='/login';return}
        if(r.status===403){$('errBox').textContent=I18N.err_admin;$('errBox').classList.remove('hidden');return}
        if(!r.ok){$('errBox').textContent='HTTP '+r.status;$('errBox').classList.remove('hidden');return}
        rows=(await r.json()).sessions||[];
    } catch(e){$('errBox').textContent=e.message||String(e);$('errBox').classList.remove('hidden');return}

    if(filter) rows=rows.filter(r=>r.username.toLowerCase().includes(filter));
    $('status').textContent=I18N.active_count.replace('{n}', rows.length);

    if(rows.length===0){
        $('rows').innerHTML='<tr><td colspan="7" class="empty">'+esc(I18N.empty_filtered)+'</td></tr>';
        return;
    }
    $('rows').innerHTML=rows.map(r=>`
        <tr>
            <td class="user">${esc(r.username)}</td>
            <td class="preview">${esc(r.id_preview)}</td>
            <td class="dim">${esc(r.source_ip||'')}</td>
            <td class="dim" style="overflow:hidden;text-overflow:ellipsis;max-width:300px;white-space:nowrap" title="${esc(r.user_agent||'')}">${esc((r.user_agent||'').slice(0,80))}</td>
            <td class="dim">${tsFmt(r.last_seen_at)}</td>
            <td class="dim">${tsFmt(r.expires_at)}</td>
            <td><button class="danger" data-revoke-user="${esc(r.username)}">${esc(I18N.btn_revoke_user)}</button></td>
        </tr>`).join('');
    $('rows').querySelectorAll('[data-revoke-user]').forEach(b=>{
        b.addEventListener('click',()=>revokeUser(b.dataset.revokeUser));
    });
}

async function revokeUser(username){
    if(!confirm(I18N.confirm_revoke.replace('{user}', username))) return;
    const r=await fetch('/api/sessions/user/'+encodeURIComponent(username)+'/revoke-all',
        {method:'POST',credentials:'same-origin'});
    if(r.ok){
        const d=await r.json();
        alert(I18N.alert_revoked.replace('{n}', d.revoked).replace('{user}', username));
        load();
    } else {
        alert(I18N.alert_fail.replace('{code}', r.status));
    }
}

$('refresh').addEventListener('click',load);
$('filter').addEventListener('input',load);
$('auto').addEventListener('click',e=>{
    if(autoTimer){clearInterval(autoTimer);autoTimer=null;e.target.textContent=I18N.btn_auto_off;}
    else {autoTimer=setInterval(load,10000);e.target.textContent=I18N.btn_auto_on;}
});
$('revokeUserBtn').addEventListener('click',()=>{
    const u=prompt(I18N.prompt_user);
    if(u) revokeUser(u);
});

load();
</script>
</body>
</html>
"""


@role_required("admin")
async def sessions_page_handler(request: web.Request) -> web.Response:
    lang = pick_lang(request)
    s = _I18N[lang]
    html = (_TEMPLATE
            .replace("{{LANG}}", lang)
            .replace("{{I18N_JSON}}", json.dumps(s, ensure_ascii=False))
            .replace("{{T_TITLE}}", s["title"])
            .replace("{{T_LOADING}}", s["loading"])
            .replace("{{T_NAV_DASHBOARD}}", s["nav_dashboard"])
            .replace("{{T_NAV_AUDIT}}", s["nav_audit"])
            .replace("{{T_NAV_ACCOUNT}}", s["nav_account"])
            .replace("{{T_FILTER_PH}}", s["filter_ph"])
            .replace("{{T_BTN_REFRESH}}", s["btn_refresh"])
            .replace("{{T_BTN_AUTO_OFF}}", s["btn_auto_off"])
            .replace("{{T_BTN_REVOKE_ALL}}", s["btn_revoke_all"])
            .replace("{{T_TH_USER}}", s["th_user"])
            .replace("{{T_TH_SESSION}}", s["th_session"])
            .replace("{{T_TH_IP}}", s["th_ip"])
            .replace("{{T_TH_UA}}", s["th_ua"])
            .replace("{{T_TH_LAST_SEEN}}", s["th_last_seen"])
            .replace("{{T_TH_EXPIRES}}", s["th_expires"])
            .replace("{{T_EMPTY_INITIAL}}", s["empty_initial"]))
    return web.Response(
        text=html, content_type="text/html", charset="utf-8",
        headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
    )
