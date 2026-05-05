"""Minimal login page served at /login when auth is enabled.

Vanilla HTML + inline CSS to avoid touching the prebuilt React bundle. Posts
to /api/auth/login via fetch(); on success redirects to /. The full app
(React/dist) is gated by the auth middleware — anonymous requests to /
will see this login page after middleware redirects them.
"""
from __future__ import annotations

from aiohttp import web

LOGIN_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JT-PROXENSE — Sign in</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <style>
        :root {
            --bg: #050810; --bg-elev: #0d1320;
            --cyan: #00f0ff; --cyan-soft: rgba(0,240,255,.18);
            --magenta: #bf00ff; --text: #e6f6ff; --text-dim: #95a8c4;
            --border: rgba(0,240,255,.16); --red: #ff3860;
            --font-display: "Orbitron", system-ui, sans-serif;
            --font-body: "Rajdhani", system-ui, sans-serif;
            --font-mono: "Share Tech Mono", ui-monospace, monospace;
        }
        @font-face { font-family: Orbitron; src: url(/fonts/orbitron-700.woff2) format('woff2'); font-weight: 700; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-400.woff2) format('woff2'); font-weight: 400; }
        @font-face { font-family: Rajdhani; src: url(/fonts/rajdhani-500.woff2) format('woff2'); font-weight: 500; }
        @font-face { font-family: 'Share Tech Mono'; src: url(/fonts/share-tech-mono-400.woff2) format('woff2'); }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; min-height: 100vh; background: var(--bg); color: var(--text); font-family: var(--font-body); }
        body {
            display: flex; align-items: center; justify-content: center;
            background:
                radial-gradient(ellipse 800px 400px at 50% 30%, rgba(0,240,255,.07), transparent 60%),
                radial-gradient(ellipse 600px 300px at 80% 70%, rgba(191,0,255,.05), transparent 60%),
                var(--bg);
            background-attachment: fixed;
        }
        body::after {
            content: ''; position: fixed; inset: 0; pointer-events: none;
            background-image: repeating-linear-gradient(180deg, transparent 0, transparent 2px, rgba(255,255,255,.012) 2px, rgba(255,255,255,.012) 3px);
        }
        .card {
            position: relative; z-index: 2;
            width: 100%; max-width: 380px;
            background: linear-gradient(180deg, var(--bg-elev), var(--bg));
            border: 1px solid var(--border); border-radius: 12px;
            padding: 36px 32px 28px;
            box-shadow:
                0 0 0 1px rgba(0,240,255,.06),
                0 8px 32px rgba(0,0,0,.4),
                0 24px 64px -10px rgba(0,240,255,.10);
        }
        h1 {
            font-family: var(--font-display); font-weight: 700;
            font-size: 22px; letter-spacing: .08em; text-transform: uppercase;
            margin: 0 0 4px;
            background: linear-gradient(135deg, #fff, var(--cyan), var(--magenta));
            -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .sub {
            font-family: var(--font-mono); font-size: 11px;
            color: var(--cyan); letter-spacing: .12em; text-transform: uppercase;
            margin-bottom: 28px;
        }
        label {
            display: block; font-size: 12px; letter-spacing: .08em;
            text-transform: uppercase; color: var(--text-dim);
            margin: 14px 0 6px; font-weight: 500;
        }
        input {
            width: 100%; padding: 11px 14px;
            background: #02050b; color: var(--text);
            border: 1px solid var(--border); border-radius: 6px;
            font-family: var(--font-mono); font-size: 14px;
            outline: none; transition: border-color .15s, box-shadow .15s;
        }
        input:focus {
            border-color: var(--cyan);
            box-shadow: 0 0 0 3px var(--cyan-soft);
        }
        button {
            width: 100%; margin-top: 22px;
            padding: 12px 18px;
            font-family: var(--font-display); font-size: 13px; font-weight: 600;
            letter-spacing: .1em; text-transform: uppercase;
            color: #001018;
            background: linear-gradient(135deg, var(--cyan), #00b8d4);
            border: none; border-radius: 6px; cursor: pointer;
            box-shadow: 0 0 16px rgba(0,240,255,.35);
            transition: transform .1s, box-shadow .15s;
        }
        button:hover { transform: translateY(-1px); box-shadow: 0 0 22px rgba(0,240,255,.5); }
        button:disabled { opacity: .5; cursor: wait; transform: none; }
        .err {
            margin-top: 16px;
            padding: 10px 14px;
            background: rgba(255,56,96,.08);
            border-left: 3px solid var(--red);
            border-radius: 4px;
            font-size: 13px; color: var(--text);
        }
        .err.hidden { display: none; }
        .foot {
            margin-top: 26px; padding-top: 18px;
            border-top: 1px solid var(--border);
            text-align: center;
            font-family: var(--font-mono); font-size: 11px; color: var(--text-dim);
            letter-spacing: .04em;
        }
    </style>
</head>
<body>
    <form class="card" id="loginForm" autocomplete="on">
        <h1>JT-PROXENSE</h1>
        <div class="sub" id="step-label">// Sign in</div>

        <div id="step1">
            <label for="username">Username</label>
            <input id="username" name="username" type="text" required autofocus autocomplete="username">

            <label for="password">Password</label>
            <input id="password" name="password" type="password" required autocomplete="current-password">
        </div>

        <div id="step2" style="display:none;">
            <label for="totp">Authenticator code</label>
            <input id="totp" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code"
                   placeholder="6 digits or backup code"
                   style="font-family:'Share Tech Mono',monospace; font-size:18px; letter-spacing:.4em; text-align:center;">
            <div style="margin-top:8px; font-family:'Share Tech Mono',monospace; font-size:11px; color:var(--text-dim);">
                <span id="totpTtl"></span>
            </div>
        </div>

        <button type="submit" id="submit">Authenticate &raquo;</button>

        <div class="err hidden" id="err"></div>

        <div class="foot">JT-PROXENSE &middot; Cyberpunk PVE Monitor</div>
    </form>

<script>
const form = document.getElementById('loginForm');
const errBox = document.getElementById('err');
const btn = document.getElementById('submit');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const stepLabel = document.getElementById('step-label');
const totpInput = document.getElementById('totp');
const totpTtl = document.getElementById('totpTtl');

let pendingToken = null;
let ttlTimer = null;

function showStep2(ttl) {
    step1.style.display = 'none';
    step2.style.display = 'block';
    stepLabel.textContent = '// Two-factor verification';
    btn.textContent = 'Verify &raquo;';
    totpInput.focus();

    let remaining = ttl || 120;
    const tick = () => {
        if (remaining <= 0) {
            clearInterval(ttlTimer);
            totpTtl.textContent = 'Pending token expired — refresh to retry.';
            btn.disabled = true;
            return;
        }
        totpTtl.textContent = 'Code window expires in ' + remaining + 's.';
        remaining--;
    };
    tick();
    ttlTimer = setInterval(tick, 1000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errBox.classList.add('hidden');
    btn.disabled = true;
    const orig = btn.textContent;
    btn.textContent = 'Authenticating...';

    try {
        if (!pendingToken) {
            // STEP 1: password
            const r = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                }),
            });
            const data = await r.json().catch(() => ({}));
            if (r.ok && data.totp_required) {
                pendingToken = data.pending_token;
                showStep2(data.ttl_seconds);
                btn.disabled = false;
                btn.innerHTML = 'Verify &raquo;';
                return;
            }
            if (r.ok) { window.location.replace('/'); return; }
            let msg = 'Authentication failed';
            if (r.status === 429) msg = 'Too many failed attempts. Try again later.';
            else if (data.error === 'invalid_credentials') msg = 'Invalid username or password.';
            else if (data.error) msg = data.error;
            errBox.textContent = msg;
            errBox.classList.remove('hidden');
        } else {
            // STEP 2: totp
            const r = await fetch('/api/auth/totp/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({
                    pending_token: pendingToken,
                    code: totpInput.value.trim(),
                }),
            });
            if (r.ok) { window.location.replace('/'); return; }
            const data = await r.json().catch(() => ({}));
            let msg = 'TOTP verification failed';
            if (data.error === 'invalid_totp') msg = 'Invalid code. Try again.';
            else if (data.error === 'pending_expired') msg = 'Pending login expired. Refresh and try again.';
            else if (data.error) msg = data.error;
            errBox.textContent = msg;
            errBox.classList.remove('hidden');
            totpInput.value = '';
            totpInput.focus();
        }
    } catch (e) {
        errBox.textContent = 'Network error. Check the server is reachable.';
        errBox.classList.remove('hidden');
    } finally {
        btn.disabled = false;
        if (!pendingToken) btn.innerHTML = 'Authenticate &raquo;';
        else btn.innerHTML = 'Verify &raquo;';
    }
});
</script>
</body>
</html>
"""


async def login_page_handler(request: web.Request) -> web.Response:
    return web.Response(
        text=LOGIN_HTML,
        content_type="text/html",
        charset="utf-8",
        headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
    )
