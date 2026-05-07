"""LXC thumbnail capture via PVE termproxy + vt100 emulator.

Rationale: PVE's `lxc/{vmid}/vncproxy` returns a tiny mostly-empty
framebuffer for containers (no visible TTY, often just black). The PVE
web UI never offers VNC for CTs by default — it uses xterm.js over
termproxy because that's where the useful content actually lives.

This module mirrors that approach for thumbnails:
  1. POST `lxc/{vmid}/termproxy` → get one-shot ticket + port
  2. WSS to vncwebsocket with that port + ticket
  3. Send the PVE auth frame (`<user>:<ticket>\\n`)
  4. Wait for the 'O' acknowledge
  5. Read shell output for ~1.2s — captures whatever the operator would
     see (login prompt, top output, dmesg, whatever)
  6. Feed bytes through `pyte` (vt100 emulator) to resolve cursor moves,
     clears, scrolls, ANSI colours into a final 80×24 screen state
  7. Render that text onto a black PNG with monospace font + cyan
     foreground (matches the cyberpunk theme)

The capture is a one-shot read — we don't poke stdin or send any keys.
For CTs sitting at a getty prompt this just shows the prompt + maybe a
banner; for CTs running interactive logged-in shells we get whatever
last drew on the screen.

Optional input: caller can pass `keystrokes=b"\\n"` to nudge the shell
to redraw, useful when we suspect the screen is blank because nothing
recent touched it.
"""
from __future__ import annotations

import asyncio
import logging
import os
import ssl
from io import BytesIO
from typing import Optional
from urllib.parse import quote as _urlquote

import aiohttp


logger = logging.getLogger(__name__)


# Standard Debian/Ubuntu path. CentOS / RHEL ships it under different
# subdir; we fall through to PIL's default bitmap font if neither found.
_FONT_CANDIDATES = (
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
    "/usr/share/fonts/dejavu/DejaVuSansMono.ttf",
    "/usr/share/fonts/dejavu-sans-mono-fonts/DejaVuSansMono.ttf",
)


def _find_mono_font_path() -> Optional[str]:
    for p in _FONT_CANDIDATES:
        if os.path.exists(p):
            return p
    return None


async def capture_lxc_text_png(
    *,
    pve_host: str,
    pve_port: int,
    pve_auth_cookie: str,
    pve_csrf: str,
    pve_user: str,            # e.g. "root@pam" — required for termproxy auth frame
    node: str,
    vmid: int,
    verify_ssl: bool = False,
    overall_timeout: float = 8.0,
    capture_window_s: float = 2.0,
    cols: int = 80,
    rows: int = 24,
    max_dimension: Optional[int] = None,
) -> tuple[bytes, bool]:
    """Open a termproxy connection, capture the screen, return (PNG, is_blank).

    `is_blank` is True when the captured terminal screen has no visible
    text after stripping whitespace — used by the matrix view to push
    empty CTs to the end of the thumbnail list.

    Raises on protocol failure / timeout — caller turns that into a 502.
    """
    pve_ssl: Optional[ssl.SSLContext]
    if verify_ssl:
        pve_ssl = None
    else:
        pve_ssl = ssl._create_unverified_context()

    # 1. Mint termproxy ticket. Sends raw Cookie header (same gotcha as
    #    everywhere else: aiohttp's `cookies={...}` percent-encodes PVE's
    #    ticket and PVE rejects it).
    proxy_url = (
        f"https://{pve_host}:{pve_port}"
        f"/api2/json/nodes/{node}/lxc/{vmid}/termproxy"
    )
    headers_post = {"Cookie": f"PVEAuthCookie={pve_auth_cookie}"}
    if pve_csrf:
        headers_post["CSRFPreventionToken"] = pve_csrf

    async def run() -> bytes:
        async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=pve_ssl),
        ) as session:
            async with session.post(proxy_url, headers=headers_post, data={}) as r:
                if r.status != 200:
                    body = await r.text()
                    raise RuntimeError(f"termproxy HTTP {r.status}: {body[:200]}")
                tk = (await r.json()).get("data", {}) or {}
            term_ticket = tk.get("ticket") or ""
            term_port = int(tk.get("port") or 0)
            if not term_ticket or not term_port:
                raise RuntimeError("termproxy returned no ticket/port")

            ws_url = (
                f"wss://{pve_host}:{pve_port}"
                f"/api2/json/nodes/{node}/lxc/{vmid}/vncwebsocket"
                f"?port={term_port}&vncticket={_urlquote(term_ticket, safe='')}"
            )
            ws_headers = {"Cookie": f"PVEAuthCookie={pve_auth_cookie}"}

            async with session.ws_connect(
                ws_url, max_msg_size=0, headers=ws_headers,
            ) as ws:
                # Auth frame: PVE expects "<user>:<ticket>\n".
                await ws.send_str(f"{pve_user}:{term_ticket}\n")

                # Resize to our desired terminal size — PVE's term-channel
                # uses `1:<cols>:<rows>:` for resize. The SIGWINCH this
                # delivers also nudges most shells / TUI apps to redraw.
                await ws.send_str(f"1:{cols}:{rows}:")

                # PVE's CT console runs through dtach; on attach, dtach
                # only shows the current screen state, NOT a replay of
                # history. So if the operator left the shell sitting at
                # a prompt, my fresh attach sees nothing visible. Send
                # Ctrl-L (form-feed, 0x0c) — bash/zsh/most TUI apps treat
                # it as "redraw screen", giving us at least the prompt.
                # Frame format: 0:<bytelen>:<data>
                await ws.send_str("0:1:\x0c")

                buf = bytearray()
                authed = False
                deadline = asyncio.get_event_loop().time() + capture_window_s
                while True:
                    remaining = deadline - asyncio.get_event_loop().time()
                    if remaining <= 0:
                        break
                    try:
                        msg = await asyncio.wait_for(ws.receive(), timeout=remaining)
                    except asyncio.TimeoutError:
                        break
                    if msg.type == aiohttp.WSMsgType.BINARY:
                        data = bytes(msg.data)
                    elif msg.type == aiohttp.WSMsgType.TEXT:
                        data = msg.data.encode("utf-8", errors="replace")
                    elif msg.type in (
                        aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.CLOSED,
                        aiohttp.WSMsgType.ERROR,
                    ):
                        break
                    else:
                        continue
                    if not authed:
                        # First non-empty message starting with 'O' = auth ok.
                        if data and data[0:1] == b"O":
                            authed = True
                            data = data[1:]
                        else:
                            # Some PVE versions send "OK" — handle both.
                            if data[:2] == b"OK":
                                authed = True
                                data = data[2:]
                    if data:
                        buf.extend(data)
                try:
                    await ws.close()
                except Exception:
                    pass

        return _render_terminal_png(bytes(buf), cols, rows, max_dimension)

    return await asyncio.wait_for(run(), timeout=overall_timeout)


def _render_terminal_png(
    raw: bytes, cols: int, rows: int, max_dimension: Optional[int],
) -> bytes:
    """Feed bytes to a vt100 emulator, then draw the screen state to PNG.

    pyte handles all the messy ANSI / control-char interpretation for us
    — cursor position, clear screen, line wrapping, colours, etc. We
    only consume the final visible screen state and draw it.
    """
    import pyte
    from PIL import Image, ImageDraw, ImageFont

    screen = pyte.Screen(cols, rows)
    stream = pyte.ByteStream(screen)
    if raw:
        try:
            stream.feed(raw)
        except Exception as e:
            # Don't fail the screenshot if some weird control char trips
            # pyte; render whatever we got so far.
            logger.debug("pyte feed error (rendering partial): %s", e)

    # Pick monospace font + a size that fits the requested PNG max_dim.
    font_path = _find_mono_font_path()
    # Cell metrics: pick a font size where (cols * char_w) + padding ≤ max_dimension.
    pad = 8
    target_w = max_dimension or 800
    # DejaVu Sans Mono char advance ≈ 0.6 × font_size at common sizes.
    # Solve: cols * 0.6 * size + 2*pad <= target_w  →  size <= (target_w - 16) / (cols * 0.6)
    font_size = max(8, int((target_w - 2 * pad) / (cols * 0.6)))
    font_size = min(font_size, 28)  # cap so very small captures don't get huge text

    if font_path:
        font = ImageFont.truetype(font_path, font_size)
    else:
        # PIL's default bitmap font — small and ugly but always works.
        font = ImageFont.load_default()

    # Measure char dimensions from the actual font.
    bbox = font.getbbox("M")
    char_w = bbox[2] - bbox[0]
    # Use the font's full em height (font_size) plus generous extra
    # leading. Just bbox height makes lines run together because bbox of
    # 'M' doesn't include descender or normal terminal line gap. ~1.5×
    # font size matches what most terminal emulators use as default.
    char_h = max(int(font_size * 1.45), bbox[3] - bbox[1] + 6)

    img_w = char_w * cols + 2 * pad
    img_h = char_h * rows + 2 * pad
    img = Image.new("RGB", (img_w, img_h), (5, 8, 16))   # bg = jt-proxense panel bg
    draw = ImageDraw.Draw(img)

    # Render each terminal row as one drawn line. Strip trailing whitespace
    # so the image isn't dominated by empty spaces (lets PNG compression
    # collapse the right-hand side too). Track whether ANY visible text
    # was drawn, for the blank-thumb hint.
    any_text = False
    for r_idx, line in enumerate(screen.display):
        text = line.rstrip()
        if not text:
            continue
        any_text = True
        draw.text(
            (pad, pad + r_idx * char_h),
            text,
            font=font,
            fill=(0, 240, 255),  # cyber cyan
        )
    is_blank = not any_text

    # Optional downscale to match the caller's `?max=` request.
    if max_dimension and (img.width > max_dimension or img.height > max_dimension):
        scale = max_dimension / max(img.width, img.height)
        new_size = (max(1, int(img.width * scale)), max(1, int(img.height * scale)))
        img = img.resize(new_size, Image.LANCZOS)

    out = BytesIO()
    img.save(out, format="PNG", optimize=False)
    return out.getvalue(), is_blank
