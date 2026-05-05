"""Admin-only HTML viewer for the audit log.

Reuses the API at /api/audit to fetch rows. Self-contained HTML+CSS+JS so we
don't have to touch the React bundle. Cyberpunk styling matches the rest.
"""
from __future__ import annotations

from aiohttp import web

from .middleware import role_required


AUDIT_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JT-PROXENSE — Audit log</title>
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
        .container { max-width: 1300px; margin: 0 auto; padding: 24px; position: relative; z-index: 2; }
        header {
            display: flex; align-items: baseline; justify-content: space-between;
            border-bottom: 1px solid var(--border); padding-bottom: 14px; margin-bottom: 22px;
        }
        h1 {
            margin: 0;
            font-family: Orbitron, sans-serif; font-weight: 700;
            font-size: 22px; letter-spacing: .08em; text-transform: uppercase;
        }
        h1 .accent { color: var(--cyan); }
        .meta {
            font-family: 'Share Tech Mono', monospace;
            font-size: 12px; color: var(--text-muted); letter-spacing: .04em;
        }
        nav.top a {
            color: var(--text-dim); margin-right: 16px;
            font-size: 13px; letter-spacing: .04em; text-transform: uppercase;
            text-decoration: none;
        }
        nav.top a:hover { color: var(--cyan); }
        nav.top a.danger { color: var(--orange); }

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

        table {
            width: 100%; border-collapse: collapse;
            background: var(--bg-elev); border: 1px solid var(--border);
            border-radius: 10px; overflow: hidden;
            font-family: 'Share Tech Mono', monospace; font-size: 13px;
        }
        thead {
            background: var(--bg-elev-2);
            font-family: Orbitron, sans-serif;
            font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
            color: var(--cyan);
        }
        th, td {
            padding: 8px 12px; text-align: left;
            border-bottom: 1px solid rgba(0,240,255,.06);
        }
        tbody tr:hover { background: rgba(0,240,255,.04); }
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
        .err {
            margin: 12px 0; padding: 12px;
            background: rgba(255,56,96,.08); border-left: 3px solid var(--red);
            border-radius: 4px; color: var(--text);
        }
    </style>
</head>
<body>
<div class="container">
    <header>
        <div>
            <h1>JT-<span class="accent">PROXENSE</span> &middot; Audit</h1>
            <div class="meta" id="userInfo">loading session…</div>
        </div>
        <nav class="top">
            <a href="/">Dashboard</a>
            <a href="#" id="logoutBtn" class="danger">Logout</a>
        </nav>
    </header>

    <div class="filters">
        <label>User
            <input type="text" id="fUser" placeholder="any" autocomplete="off">
        </label>
        <label>Action (LIKE)
            <input type="text" id="fAction" placeholder="e.g. auth.% or vm.start" autocomplete="off">
        </label>
        <label>Cluster
            <input type="text" id="fCluster" placeholder="any" autocomplete="off">
        </label>
        <label>Limit
            <select id="fLimit">
                <option>50</option>
                <option selected>100</option>
                <option>200</option>
                <option>500</option>
            </select>
        </label>
        <div class="actions">
            <button id="refresh" class="primary">Refresh &raquo;</button>
            <button id="auto">Auto: off</button>
        </div>
    </div>

    <div id="errBox"></div>

    <table>
        <thead><tr>
            <th style="width: 165px">Timestamp</th>
            <th style="width: 120px">User</th>
            <th>Action</th>
            <th>Target</th>
            <th style="width: 90px">Result</th>
            <th style="width: 110px">Source IP</th>
            <th style="width: 110px">Request ID</th>
        </tr></thead>
        <tbody id="rows">
            <tr><td colspan="7" class="empty">No rows yet. Hit Refresh.</td></tr>
        </tbody>
    </table>

    <div class="pager">
        <div id="totalInfo">— rows</div>
        <div>
            <button id="prev">&laquo; Prev</button>
            <span id="pageInfo" style="margin: 0 12px;">page 1</span>
            <button id="next">Next &raquo;</button>
        </div>
    </div>
</div>

<script>
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

async function fetchAndRender() {
    const errBox = document.getElementById('errBox');
    errBox.innerHTML = '';
    const params = new URLSearchParams({ limit, offset });
    const u = document.getElementById('fUser').value.trim(); if (u) params.set('user', u);
    const a = document.getElementById('fAction').value.trim(); if (a) params.set('action', a);
    const c = document.getElementById('fCluster').value.trim(); if (c) params.set('cluster_id', c);
    try {
        const r = await fetch('/api/audit?' + params, { credentials: 'same-origin' });
        if (r.status === 401) { window.location.href = '/login'; return; }
        if (r.status === 403) { errBox.innerHTML = '<div class="err">403 forbidden — admin role required.</div>'; return; }
        if (!r.ok) { errBox.innerHTML = '<div class="err">HTTP ' + r.status + '</div>'; return; }
        const data = await r.json();
        const tbody = document.getElementById('rows');
        if (!data.rows || data.rows.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty">No rows match the filters.</td></tr>';
        } else {
            tbody.innerHTML = data.rows.map(r => `
                <tr>
                    <td class="ts">${tsFmt(r.ts)}</td>
                    <td class="user">${escapeHtml(r.user)}</td>
                    <td class="action">${escapeHtml(r.action)}</td>
                    <td class="target">${escapeHtml(r.target || '')}${r.cluster_id ? ' <span style="color:var(--text-muted)">[' + escapeHtml(r.cluster_id) + ']</span>' : ''}</td>
                    <td class="result ${r.result.startsWith('error') || r.result === 'denied' ? 'denied' : r.result}" data-r="${escapeHtml(r.result)}">${escapeHtml(r.result)}</td>
                    <td class="ip">${escapeHtml(r.source_ip)}</td>
                    <td class="req">${escapeHtml(r.request_id)}</td>
                </tr>
            `).join('');
        }
        document.getElementById('totalInfo').textContent = data.total + ' rows total';
        document.getElementById('pageInfo').textContent = `page ${Math.floor(offset/limit)+1} of ${Math.max(1, Math.ceil(data.total/limit))}`;
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
    return web.Response(
        text=AUDIT_HTML,
        content_type="text/html",
        charset="utf-8",
        headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
    )
