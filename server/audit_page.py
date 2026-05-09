"""Admin-only HTML viewer for the audit log.

Reuses the API at /api/audit to fetch rows. Self-contained HTML+CSS+JS so we
don't have to touch the React bundle. Cyberpunk styling matches the rest.
"""
from __future__ import annotations

import json

from aiohttp import web

from .middleware import role_required
from .page_i18n import pick_lang


_I18N: dict[str, dict[str, str]] = {
    "en": {
        "title":          "Audit",
        "loading_session": "loading session…",
        "nav_dashboard":  "Dashboard",
        "nav_logout":     "Logout",
        "f_user":         "User",
        "f_user_ph":      "any",
        "f_action":       "Action (LIKE)",
        "f_action_ph":    "e.g. auth.% or vm.start",
        "f_cluster":      "Cluster",
        "f_since":        "Since (UTC)",
        "f_until":        "Until (UTC)",
        "f_limit":        "Limit",
        "f_errors_only":  "errors only",
        "btn_refresh":    "Refresh »",
        "btn_auto_off":   "Auto: off",
        "btn_auto_on":    "Auto: 5s",
        "btn_csv":        "CSV",
        "btn_csv_title":  "Download visible rows as CSV",
        "th_ts":          "Timestamp",
        "th_user":        "User",
        "th_action":      "Action",
        "th_target":      "Target",
        "th_result":      "Result",
        "th_ip":          "Source IP",
        "th_req":         "Request ID",
        "empty_initial":  "No rows yet. Hit Refresh.",
        "empty_filtered": "No rows match the filters.",
        "rows_initial":   "— rows",
        "rows_total":     "{n} rows total",
        "page":           "page",
        "page_of":        "of",
        "btn_prev":       "« Prev",
        "btn_next":       "Next »",
        "err_403":        "403 forbidden — admin role required.",
        "err_admin_only": "Admin role required to view the audit log.",
        "alert_no_rows":  "No rows to export — run a query first.",
        "signed_in":      "// signed in as {user} ({role})",
        "no_role":        "no role",
    },
    "zh-TW": {
        "title":          "稽核記錄",
        "loading_session": "載入工作階段中…",
        "nav_dashboard":  "儀表板",
        "nav_logout":     "登出",
        "f_user":         "使用者",
        "f_user_ph":      "任意",
        "f_action":       "動作 (LIKE)",
        "f_action_ph":    "例：auth.% 或 vm.start",
        "f_cluster":      "叢集",
        "f_since":        "起始時間 (UTC)",
        "f_until":        "結束時間 (UTC)",
        "f_limit":        "筆數上限",
        "f_errors_only":  "僅顯示錯誤",
        "btn_refresh":    "重新整理 »",
        "btn_auto_off":   "自動：關",
        "btn_auto_on":    "自動：5 秒",
        "btn_csv":        "匯出 CSV",
        "btn_csv_title":  "把目前列匯出成 CSV",
        "th_ts":          "時間",
        "th_user":        "使用者",
        "th_action":      "動作",
        "th_target":      "目標",
        "th_result":      "結果",
        "th_ip":          "來源 IP",
        "th_req":         "請求 ID",
        "empty_initial":  "尚未查詢，請按重新整理。",
        "empty_filtered": "沒有符合條件的紀錄。",
        "rows_initial":   "— 筆",
        "rows_total":     "共 {n} 筆",
        "page":           "第",
        "page_of":        "頁／共",
        "btn_prev":       "« 上一頁",
        "btn_next":       "下一頁 »",
        "err_403":        "403 禁止存取 — 需要 admin 角色。",
        "err_admin_only": "查看稽核記錄需要 admin 角色。",
        "alert_no_rows":  "目前無資料可匯出，請先執行查詢。",
        "signed_in":      "// 目前登入：{user} ({role})",
        "no_role":        "未指派角色",
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
            --bg: #050810; --bg-elev: #0d1320; --bg-elev-2: #14182a;
            --cyan: #00f0ff; --cyan-soft: rgba(0,240,255,.18);
            --magenta: #bf00ff; --green: #00ff88; --red: #ff3860;
            --orange: #ff8a3c;
            --text: #e6f6ff; --text-dim: #95a8c4; --text-muted: #6b7c93;
            --border: rgba(0,240,255,.16);
        }
        @font-face { font-family: Orbitron; src: url(/fonts/orbitron-700.woff2) format('woff2'); font-weight: 700; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-400.woff2) format('woff2'); font-weight: 400; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-500.woff2) format('woff2'); font-weight: 500; }
        @font-face { font-family: 'Share Tech Mono'; src: url(/fonts/share-tech-mono-400.woff2) format('woff2'); }

        * { box-sizing: border-box; }
        html, body {
            margin: 0; padding: 0;
            background: var(--bg); color: var(--text);
            font-family: Rajdhani, system-ui, sans-serif;
            min-height: 100vh;
        }
        body {
            background:
                radial-gradient(ellipse 1200px 600px at 50% -100px, rgba(0,240,255,.06), transparent 60%),
                var(--bg);
            background-attachment: fixed;
        }
        body::after {
            content: ''; position: fixed; inset: 0; pointer-events: none;
            background-image: repeating-linear-gradient(180deg, transparent 0, transparent 2px, rgba(255,255,255,.012) 2px, rgba(255,255,255,.012) 3px);
        }
        .container { max-width: 1300px; margin: 0 auto; padding: 24px 32px; position: relative; z-index: 2; }
        /* Header aligned with the React SPA's matrix / radar / users views:
           font-display title, inline cyan icon w/ drop-shadow + pulse,
           mono subtitle. Different vocabulary than the legacy "JT-<span
           accent>PROXENSE</span> · Title" the page used to have, so the
           operator gets the same visual language whether they're in the
           SPA or in a server-rendered admin page. */
        header.page-header {
            display: flex; align-items: flex-end; justify-content: space-between;
            margin-bottom: 24px; gap: 24px; flex-wrap: wrap;
        }
        .title-section { display: flex; flex-direction: column; gap: 2px; }
        h1.page-title {
            display: flex; align-items: center; gap: 10px;
            margin: 0;
            font-family: Orbitron, sans-serif; font-weight: 600;
            font-size: 22px; letter-spacing: 0.12em; text-transform: uppercase;
            color: var(--text);
        }
        h1.page-title .title-icon {
            stroke: var(--cyan);
            filter: drop-shadow(0 0 6px rgba(0,240,255,.6));
            animation: titlePulse 2s ease-in-out infinite;
        }
        @keyframes titlePulse {
            0%,100% { opacity: .85; transform: scale(1); }
            50%     { opacity: 1;   transform: scale(1.05); }
        }
        .page-sub {
            font-family: 'Share Tech Mono', monospace;
            font-size: 12px; color: var(--text-dim);
        }
        .meta {
            font-family: 'Share Tech Mono', monospace;
            font-size: 12px; color: var(--text-muted); letter-spacing: .04em;
        }
        nav.top { display: flex; align-items: center; gap: 4px; }
        nav.top a {
            display: inline-flex; align-items: center; gap: 6px;
            color: var(--text-dim); padding: 6px 12px;
            font-family: Orbitron, sans-serif; font-size: 11px;
            letter-spacing: .1em; text-transform: uppercase;
            text-decoration: none; border-radius: 4px;
            border: 1px solid transparent;
            transition: color .15s, border-color .15s, background .15s;
        }
        nav.top a:hover { color: var(--cyan); border-color: var(--cyan-soft); background: rgba(0,240,255,.05); }
        nav.top a.danger { color: var(--orange); }
        nav.top a.danger:hover { color: var(--red); border-color: rgba(255,56,96,.4); background: rgba(255,56,96,.06); }

        .filters {
            display: flex; flex-wrap: wrap; gap: 10px;
            background: var(--bg-elev); border: 1px solid var(--border);
            border-radius: 10px; padding: 12px 14px; margin-bottom: 18px;
        }
        .filters label {
            display: flex; flex-direction: column;
            font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
            color: var(--text-dim);
        }
        .filters input, .filters select {
            margin-top: 4px;
            background: #02050b; color: var(--text);
            border: 1px solid var(--border); border-radius: 4px;
            padding: 6px 10px; font-family: 'Share Tech Mono', monospace; font-size: 13px;
            outline: none;
        }
        .filters input:focus, .filters select:focus {
            border-color: var(--cyan); box-shadow: 0 0 0 3px var(--cyan-soft);
        }
        .filters .actions { display: flex; align-items: flex-end; gap: 8px; margin-left: auto; }
        .filters label.check { flex-direction: row; align-items: center; gap: 6px; align-self: flex-end; padding-bottom: 7px; cursor: pointer; }
        .filters label.check input { accent-color: var(--cyan); }
        button {
            padding: 7px 14px;
            font-family: Orbitron, sans-serif; font-weight: 600;
            font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
            color: var(--cyan); background: rgba(0,240,255,.05);
            border: 1px solid var(--cyan-soft); border-radius: 4px;
            cursor: pointer;
        }
        button.primary {
            color: #001018; background: linear-gradient(135deg, var(--cyan), #00b8d4);
            border: none; box-shadow: 0 0 12px rgba(0,240,255,.35);
        }
        button:hover { background: rgba(0,240,255,.18); }
        button.primary:hover { box-shadow: 0 0 22px rgba(0,240,255,.5); }

        /* Table style aligned with the matrix view's vm-table — same
           Orbitron header, same letter-spacing, same secondary-text
           colour, no rounded surround. Keeps the look consistent across
           the React frontend and the server-rendered admin pages. */
        table {
            width: 100%; border-collapse: collapse;
            font-family: 'Share Tech Mono', monospace; font-size: 13px;
        }
        thead { position: sticky; top: 0; z-index: 10; background: var(--bg); }
        th {
            padding: 10px 14px; text-align: left;
            font-family: Orbitron, sans-serif; font-weight: 600;
            font-size: 14px; letter-spacing: .05em; text-transform: uppercase;
            color: var(--text-dim);
            border-bottom: 1px solid var(--border);
            white-space: nowrap;
        }
        td {
            padding: 6px 14px;
            border-bottom: 1px solid rgba(0,240,255,.08);
            vertical-align: middle;
        }
        tbody tr { transition: background .14s; }
        tbody tr:hover { background: rgba(0,240,255,.05); }
        td.ts { color: var(--text-dim); white-space: nowrap; }
        td.user { color: var(--text); font-weight: 500; }
        td.action { color: var(--magenta); }
        td.target { color: var(--text-dim); font-size: 12px; }
        td.result { font-weight: 700; }
        td.result.ok { color: var(--green); }
        td.result.denied, td.result[data-r^="error"] { color: var(--red); }
        td.result[data-r="pending"] { color: var(--orange); }
        td.ip { color: var(--text-muted); font-size: 12px; }
        td.req { color: var(--text-muted); font-size: 11px; opacity: .6; }

        .pager {
            display: flex; align-items: center; justify-content: space-between;
            margin-top: 14px; font-family: 'Share Tech Mono', monospace; font-size: 12px;
            color: var(--text-dim);
        }
        .empty { text-align: center; padding: 48px 12px; color: var(--text-muted); }
        .hidden { display: none; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        tbody tr.row-main:hover { background: rgba(0,240,255,.06); }
        tbody tr.row-detail:not(.hidden) td { animation: slideIn .15s ease; }
        .err {
            margin: 12px 0; padding: 12px;
            background: rgba(255,56,96,.08); border-left: 3px solid var(--red);
            border-radius: 4px; color: var(--text);
        }
    </style>
</head>
<body>
<div class="container">
    <header class="page-header">
        <div class="title-section">
            <h1 class="page-title">
                <svg class="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="9" y1="13" x2="15" y2="13"/>
                    <line x1="9" y1="17" x2="15" y2="17"/>
                    <line x1="9" y1="9" x2="11" y2="9"/>
                </svg>
                {{T_TITLE}}
            </h1>
            <div class="page-sub" id="userInfo">{{T_LOADING_SESSION}}</div>
        </div>
        <nav class="top">
            <a href="/">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l9-9 9 9M5 10v10h14V10"/></svg>
                {{T_NAV_DASHBOARD}}
            </a>
            <a href="#" id="logoutBtn" class="danger">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                {{T_NAV_LOGOUT}}
            </a>
        </nav>
    </header>

    <div class="filters">
        <label>{{T_F_USER}}
            <input type="text" id="fUser" placeholder="{{T_F_USER_PH}}" autocomplete="off">
        </label>
        <label>{{T_F_ACTION}}
            <input type="text" id="fAction" placeholder="{{T_F_ACTION_PH}}" autocomplete="off">
        </label>
        <label>{{T_F_CLUSTER}}
            <input type="text" id="fCluster" placeholder="{{T_F_USER_PH}}" autocomplete="off">
        </label>
        <label>{{T_F_SINCE}}
            <input type="datetime-local" id="fSince" step="1">
        </label>
        <label>{{T_F_UNTIL}}
            <input type="datetime-local" id="fUntil" step="1">
        </label>
        <label>{{T_F_LIMIT}}
            <select id="fLimit">
                <option>50</option>
                <option selected>100</option>
                <option>200</option>
                <option>500</option>
            </select>
        </label>
        <label class="check"><input type="checkbox" id="fErrorsOnly"> {{T_F_ERRORS_ONLY}}</label>
        <div class="actions">
            <button id="refresh" class="primary">{{T_BTN_REFRESH}}</button>
            <button id="auto">{{T_BTN_AUTO_OFF}}</button>
            <button id="exportCsv" title="{{T_BTN_CSV_TITLE}}">{{T_BTN_CSV}}</button>
        </div>
    </div>

    <div id="errBox"></div>

    <table>
        <thead><tr>
            <th style="width: 165px">{{T_TH_TS}}</th>
            <th style="width: 120px">{{T_TH_USER}}</th>
            <th>{{T_TH_ACTION}}</th>
            <th>{{T_TH_TARGET}}</th>
            <th style="width: 90px">{{T_TH_RESULT}}</th>
            <th style="width: 110px">{{T_TH_IP}}</th>
            <th style="width: 110px">{{T_TH_REQ}}</th>
        </tr></thead>
        <tbody id="rows">
            <tr><td colspan="7" class="empty">{{T_EMPTY_INITIAL}}</td></tr>
        </tbody>
    </table>

    <div class="pager">
        <div id="totalInfo">{{T_ROWS_INITIAL}}</div>
        <div>
            <button id="prev">{{T_BTN_PREV}}</button>
            <span id="pageInfo" style="margin: 0 12px;">{{T_PAGE}} 1</span>
            <button id="next">{{T_BTN_NEXT}}</button>
        </div>
    </div>
</div>

<script>
const I18N = {{I18N_JSON}};
let offset = 0;
let limit = 100;
let autoTimer = null;

function tsFmt(ms) {
    if (!ms) return '—';
    const d = new Date(ms);
    return d.toISOString().replace('T', ' ').slice(0, 19) + 'Z';
}

function escapeHtml(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

let lastRows = [];

function localToUtcMs(v) {
    if (!v) return null;
    // datetime-local returns "YYYY-MM-DDTHH:MM[:SS]" in browser-local time;
    // we want UTC ms. The cleanest path: append 'Z' if no offset present —
    // but datetime-local has no offset, so interpret as local and convert.
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d.getTime();
}

async function fetchAndRender() {
    const errBox = document.getElementById('errBox');
    errBox.innerHTML = '';
    const params = new URLSearchParams({ limit, offset });
    const u = document.getElementById('fUser').value.trim(); if (u) params.set('user', u);
    const a = document.getElementById('fAction').value.trim(); if (a) params.set('action', a);
    const c = document.getElementById('fCluster').value.trim(); if (c) params.set('cluster_id', c);
    const since = localToUtcMs(document.getElementById('fSince').value); if (since) params.set('since_ms', since);
    const until = localToUtcMs(document.getElementById('fUntil').value); if (until) params.set('until_ms', until);
    try {
        const r = await fetch('/api/audit?' + params, { credentials: 'same-origin' });
        if (r.status === 401) { window.location.href = '/login'; return; }
        if (r.status === 403) { errBox.innerHTML = '<div class="err">' + escapeHtml(I18N.err_403) + '</div>'; return; }
        if (!r.ok) { errBox.innerHTML = '<div class="err">HTTP ' + r.status + '</div>'; return; }
        const data = await r.json();
        const tbody = document.getElementById('rows');
        const onlyErr = document.getElementById('fErrorsOnly').checked;
        lastRows = (data.rows || []).filter((row) => {
            if (!onlyErr) return true;
            const r = (row.result || '').toString();
            return r.startsWith('error') || r === 'denied';
        });
        if (lastRows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty">' + escapeHtml(I18N.empty_filtered) + '</td></tr>';
        } else {
            tbody.innerHTML = lastRows.map((r, i) => `
                <tr data-row="${i}" class="row-main" style="cursor: pointer">
                    <td class="ts">${tsFmt(r.ts)}</td>
                    <td class="user">${escapeHtml(r.user)}</td>
                    <td class="action">${escapeHtml(r.action)}</td>
                    <td class="target">${escapeHtml(r.target || '')}${r.cluster_id ? ' <span style="color:var(--text-muted)">[' + escapeHtml(r.cluster_id) + ']</span>' : ''}</td>
                    <td class="result ${r.result.startsWith('error') || r.result === 'denied' ? 'denied' : r.result}" data-r="${escapeHtml(r.result)}">${escapeHtml(r.result)}</td>
                    <td class="ip">${escapeHtml(r.source_ip)}</td>
                    <td class="req">${escapeHtml(r.request_id)}</td>
                </tr>
                <tr class="row-detail hidden" data-detail="${i}">
                    <td colspan="7" style="background: var(--bg-elev-2); padding: 12px 18px; font-family: 'Share Tech Mono', monospace; font-size: 12px;">
                        <span style="color: var(--cyan)">id</span>=${r.id}
                        &middot; <span style="color: var(--cyan)">params_hash</span>=<span style="color: var(--magenta); user-select: all">${escapeHtml(r.params_hash || '—')}</span>
                        &middot; <span style="color: var(--cyan)">request_id</span>=<span style="color: var(--magenta); user-select: all">${escapeHtml(r.request_id)}</span>
                    </td>
                </tr>
            `).join('');
            // Toggle detail row on click
            document.querySelectorAll('.row-main').forEach((tr) => {
                tr.addEventListener('click', () => {
                    const i = tr.dataset.row;
                    const det = document.querySelector(`.row-detail[data-detail="${i}"]`);
                    if (det) det.classList.toggle('hidden');
                });
            });
        }
        document.getElementById('totalInfo').textContent = I18N.rows_total.replace('{n}', data.total);
        document.getElementById('pageInfo').textContent = `${I18N.page} ${Math.floor(offset/limit)+1} ${I18N.page_of} ${Math.max(1, Math.ceil(data.total/limit))}`;
    } catch (e) {
        errBox.innerHTML = '<div class="err">' + escapeHtml(e.message || 'fetch failed') + '</div>';
    }
}

async function loadMe() {
    try {
        const r = await fetch('/api/auth/me', { credentials: 'same-origin' });
        const d = await r.json();
        if (!d.authenticated) { window.location.href = '/login'; return; }
        document.getElementById('userInfo').textContent =
            `// signed in as ${d.user.username} (${d.user.role_global || 'no role'})`;
        if (d.user.role_global !== 'admin') {
            document.getElementById('errBox').innerHTML =
                '<div class="err">Admin role required to view the audit log.</div>';
        }
    } catch (e) {
        // Server might be in auth-disabled mode -> /api/auth/me returns 200/false; let table handle.
    }
}

document.getElementById('refresh').addEventListener('click', () => { offset = 0; fetchAndRender(); });
document.getElementById('fErrorsOnly').addEventListener('change', () => fetchAndRender());
document.getElementById('prev').addEventListener('click', () => {
    offset = Math.max(0, offset - limit); fetchAndRender();
});
document.getElementById('next').addEventListener('click', () => {
    offset += limit; fetchAndRender();
});
document.getElementById('fLimit').addEventListener('change', (e) => {
    limit = parseInt(e.target.value, 10) || 100; offset = 0; fetchAndRender();
});
document.getElementById('auto').addEventListener('click', (e) => {
    if (autoTimer) {
        clearInterval(autoTimer); autoTimer = null;
        e.target.textContent = 'Auto: off';
    } else {
        autoTimer = setInterval(fetchAndRender, 5000);
        e.target.textContent = 'Auto: 5s';
        fetchAndRender();
    }
});
document.getElementById('exportCsv').addEventListener('click', () => {
    if (!lastRows.length) { alert('No rows to export — run a query first.'); return; }
    const cols = ['id', 'ts', 'user', 'source_ip', 'cluster_id', 'action', 'target', 'params_hash', 'result', 'request_id'];
    const csvEsc = (v) => {
        if (v == null) return '';
        const s = String(v);
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const lines = [cols.join(',')];
    lastRows.forEach((r) => lines.push(cols.map(c => csvEsc(r[c])).join(',')));
    const blob = new Blob([lines.join('\\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `jt-proxense-audit-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
});

document.getElementById('logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    window.location.href = '/login';
});

loadMe().then(fetchAndRender);
</script>
</body>
</html>
"""


@role_required("admin")
async def audit_page_handler(request: web.Request) -> web.Response:
    lang = pick_lang(request)
    s = _I18N[lang]
    html = (_TEMPLATE
            .replace("{{LANG}}", lang)
            .replace("{{I18N_JSON}}", json.dumps(s, ensure_ascii=False))
            .replace("{{T_TITLE}}", s["title"])
            .replace("{{T_LOADING_SESSION}}", s["loading_session"])
            .replace("{{T_NAV_DASHBOARD}}", s["nav_dashboard"])
            .replace("{{T_NAV_LOGOUT}}", s["nav_logout"])
            .replace("{{T_F_USER}}", s["f_user"])
            .replace("{{T_F_USER_PH}}", s["f_user_ph"])
            .replace("{{T_F_ACTION}}", s["f_action"])
            .replace("{{T_F_ACTION_PH}}", s["f_action_ph"])
            .replace("{{T_F_CLUSTER}}", s["f_cluster"])
            .replace("{{T_F_SINCE}}", s["f_since"])
            .replace("{{T_F_UNTIL}}", s["f_until"])
            .replace("{{T_F_LIMIT}}", s["f_limit"])
            .replace("{{T_F_ERRORS_ONLY}}", s["f_errors_only"])
            .replace("{{T_BTN_REFRESH}}", s["btn_refresh"])
            .replace("{{T_BTN_AUTO_OFF}}", s["btn_auto_off"])
            .replace("{{T_BTN_CSV}}", s["btn_csv"])
            .replace("{{T_BTN_CSV_TITLE}}", s["btn_csv_title"])
            .replace("{{T_TH_TS}}", s["th_ts"])
            .replace("{{T_TH_USER}}", s["th_user"])
            .replace("{{T_TH_ACTION}}", s["th_action"])
            .replace("{{T_TH_TARGET}}", s["th_target"])
            .replace("{{T_TH_RESULT}}", s["th_result"])
            .replace("{{T_TH_IP}}", s["th_ip"])
            .replace("{{T_TH_REQ}}", s["th_req"])
            .replace("{{T_EMPTY_INITIAL}}", s["empty_initial"])
            .replace("{{T_ROWS_INITIAL}}", s["rows_initial"])
            .replace("{{T_PAGE}}", s["page"])
            .replace("{{T_BTN_PREV}}", s["btn_prev"])
            .replace("{{T_BTN_NEXT}}", s["btn_next"]))
    return web.Response(
        text=html,
        content_type="text/html",
        charset="utf-8",
        headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
    )
