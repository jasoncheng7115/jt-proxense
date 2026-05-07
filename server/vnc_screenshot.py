"""Minimal RFB 3.8 client for one-shot framebuffer capture (screenshots).

Speaks just enough of the RFB protocol to authenticate against PVE's
`vncwebsocket` bridge, request one full FramebufferUpdate, and return
a PNG. Intentionally NOT a general-purpose VNC client:
  - Only the Raw encoding is requested (no CopyRect / Hextile / Tight etc.)
  - Only 32-bit BGRX pixel format is asked for (matches how QEMU encodes)
  - No keyboard/pointer events; no incremental updates; no clipboard
  - Hard timeout per stage so a stuck VM never blocks the API thread

Used by the screenshot endpoint to power the matrix thumbnail view. Pacing
is the caller's job (see pve_throttle).

VNC auth quirk: the password (= vncproxy `ticket` from PVE) is used as a
DES key, with each byte's BITS REVERSED — that's the famous VNC
authentication oddity, documented in RFC 6143 §7.2.2 and noVNC's source.
"""
from __future__ import annotations

import asyncio
import logging
import ssl
import struct
from io import BytesIO
from typing import Optional
from urllib.parse import quote as _urlquote

import aiohttp
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


logger = logging.getLogger(__name__)


_BIT_REV = bytes(int(format(b, "08b")[::-1], 2) for b in range(256))


def _vnc_des_key(password: bytes) -> bytes:
    """Build the 8-byte DES key from a VNC password.

    Pad/truncate to 8 bytes, then bit-reverse each byte. The bit-reversal
    is the historical VNC quirk; without it auth fails silently.
    """
    pad = (password + b"\x00" * 8)[:8]
    return bytes(_BIT_REV[b] for b in pad)


def _vnc_encrypt_challenge(password: bytes, challenge: bytes) -> bytes:
    """Encrypt the 16-byte VNC challenge with single DES (ECB).

    pyca/cryptography does not expose single DES directly anymore, so we
    use 3DES with K1==K2==K3 — algebraically equivalent to single DES on K1.
    """
    if len(challenge) != 16:
        raise ValueError("VNC challenge must be exactly 16 bytes")
    key = _vnc_des_key(password)
    cipher = Cipher(algorithms.TripleDES(key * 3), modes.ECB(), backend=default_backend())
    enc = cipher.encryptor()
    return enc.update(challenge) + enc.finalize()


async def capture_framebuffer_png(
    *,
    pve_host: str,
    pve_port: int,
    pve_auth_cookie: str,
    node: str,
    vm_type: str,           # 'qemu' or 'lxc'
    vmid: int,
    vnc_ticket: str,
    pve_ws_port: int,       # the `port` returned by vncproxy
    verify_ssl: bool = False,
    overall_timeout: float = 10.0,
    max_dimension: Optional[int] = None,  # if set, downscale (preserving aspect)
) -> tuple[bytes, bool]:
    """Connect, auth, grab one frame, return (PNG bytes, is_blank).

    `is_blank` is True when the framebuffer's average luminance is below a
    near-black threshold — used by the matrix view to deprioritise VMs
    whose screens are off / on a blank console / showing nothing.

    Raises RuntimeError on protocol error / timeout / auth failure.
    """
    if vm_type not in ("qemu", "lxc"):
        raise ValueError(f"vm_type must be qemu or lxc, got {vm_type!r}")

    pve_ssl: Optional[ssl.SSLContext]
    if verify_ssl:
        pve_ssl = None
    else:
        pve_ssl = ssl._create_unverified_context()

    pve_url = (
        f"wss://{pve_host}:{pve_port}"
        f"/api2/json/nodes/{node}/{vm_type}/{vmid}/vncwebsocket"
        f"?port={pve_ws_port}&vncticket={_urlquote(vnc_ticket, safe='')}"
    )
    # PVE's vncwebsocket needs PVEAuthCookie. aiohttp's `cookies={...}`
    # percent-encodes ticket characters that PVE wants raw — use a literal
    # Cookie header instead. (Same gotcha as console_proxy.)
    headers = {"Cookie": f"PVEAuthCookie={pve_auth_cookie}"}

    async def run() -> bytes:
        async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=pve_ssl),
        ) as session:
            async with session.ws_connect(
                pve_url, protocols=("binary",), max_msg_size=0, headers=headers,
            ) as ws:
                return await _rfb_grab(ws, vnc_ticket, max_dimension)

    return await asyncio.wait_for(run(), timeout=overall_timeout)


async def _rfb_grab(
    ws: aiohttp.ClientWebSocketResponse,
    password: str,
    max_dimension: Optional[int],
) -> bytes:
    # PVE forwards raw RFB bytes inside WS binary frames. We re-frame them
    # into a sync bytestream via a ring buffer.
    pending = bytearray()

    async def recv_n(n: int) -> bytes:
        while len(pending) < n:
            msg = await ws.receive()
            if msg.type == aiohttp.WSMsgType.BINARY:
                pending.extend(msg.data)
            elif msg.type == aiohttp.WSMsgType.TEXT:
                # PVE shouldn't send text on this channel; treat as bytes.
                pending.extend(msg.data.encode("latin1", "replace"))
            elif msg.type in (aiohttp.WSMsgType.CLOSE,
                              aiohttp.WSMsgType.CLOSING,
                              aiohttp.WSMsgType.CLOSED,
                              aiohttp.WSMsgType.ERROR):
                raise RuntimeError(f"WS closed before {n} bytes (got {len(pending)})")
        out = bytes(pending[:n])
        del pending[:n]
        return out

    async def send(data: bytes) -> None:
        await ws.send_bytes(data)

    # Step 1 — ProtocolVersion handshake. Server sends "RFB 003.0xx\n";
    # we reply with "RFB 003.008\n".
    server_ver = await recv_n(12)
    if not server_ver.startswith(b"RFB "):
        raise RuntimeError(f"not an RFB stream: {server_ver!r}")
    await send(b"RFB 003.008\n")

    # Step 2 — Security types. Server sends count + N bytes of type ids.
    # PVE always offers 2 (VNCAuth). 1 (None) sometimes appears for unauth'd.
    num_sec = (await recv_n(1))[0]
    if num_sec == 0:
        # Failure path: 4-byte length + reason text.
        rlen = struct.unpack(">I", await recv_n(4))[0]
        reason = (await recv_n(rlen)).decode("utf-8", "replace")
        raise RuntimeError(f"server refused security: {reason}")
    sec_types = set(await recv_n(num_sec))

    if 2 in sec_types:
        await send(b"\x02")
        challenge = await recv_n(16)
        response = _vnc_encrypt_challenge(password.encode("utf-8"), challenge)
        await send(response)
    elif 1 in sec_types:
        await send(b"\x01")
    else:
        raise RuntimeError(f"no supported security type (offered: {sorted(sec_types)})")

    # Step 3 — SecurityResult (4-byte big-endian; 0 = OK)
    sec_result = struct.unpack(">I", await recv_n(4))[0]
    if sec_result != 0:
        try:
            rlen = struct.unpack(">I", await recv_n(4))[0]
            reason = (await recv_n(rlen)).decode("utf-8", "replace")
        except Exception:
            reason = "(no reason returned)"
        raise RuntimeError(f"VNC auth failed: {reason}")

    # Step 4 — ClientInit. 1 byte: 1 = shared (don't disconnect other clients).
    await send(b"\x01")

    # Step 5 — ServerInit: width(2) + height(2) + pixel-format(16) + name-len(4) + name.
    server_init = await recv_n(24)
    width, height = struct.unpack(">HH", server_init[:4])
    name_len = struct.unpack(">I", server_init[20:24])[0]
    if name_len:
        await recv_n(name_len)  # discard

    if width <= 0 or height <= 0 or width > 8192 or height > 8192:
        raise RuntimeError(f"unreasonable framebuffer size {width}x{height}")

    # Step 6 — SetPixelFormat (msg type 0). Force 32-bit BGRX little-endian:
    #   bpp=32, depth=24, big-endian=0, true-color=1
    #   max R/G/B = 255, shifts R=16,G=8,B=0 → bytes in memory = B,G,R,X
    pixel_format = struct.pack(
        ">BBBBHHHBBBBBB",
        32, 24, 0, 1,
        255, 255, 255,
        16, 8, 0,
        0, 0, 0,
    )
    await send(b"\x00\x00\x00\x00" + pixel_format)

    # Step 7 — SetEncodings (msg type 2). We only know Raw (0).
    await send(struct.pack(">BBHi", 2, 0, 1, 0))

    # Step 8 — FramebufferUpdateRequest (msg type 3). Non-incremental, full screen.
    await send(struct.pack(">BBHHHH", 3, 0, 0, 0, width, height))

    # Step 9 — Read FramebufferUpdate. msg type 0, padding 1, num-rects 2.
    hdr = await recv_n(4)
    if hdr[0] != 0:
        raise RuntimeError(
            f"expected FramebufferUpdate (msg 0), got msg {hdr[0]}"
        )
    num_rects = struct.unpack(">H", hdr[2:4])[0]
    if num_rects == 0:
        raise RuntimeError("server sent zero-rect FramebufferUpdate")

    from PIL import Image
    full = Image.new("RGB", (width, height), (0, 0, 0))
    for i in range(num_rects):
        rect_hdr = await recv_n(12)
        rx, ry, rw, rh = struct.unpack(">HHHH", rect_hdr[:8])
        encoding = struct.unpack(">i", rect_hdr[8:12])[0]
        if encoding != 0:
            raise RuntimeError(f"rect {i}: unexpected encoding {encoding}")
        if rw == 0 or rh == 0:
            continue
        pixel_data = await recv_n(rw * rh * 4)
        # We asked for 32-bit BGRX little-endian. PIL's "raw" decoder
        # doesn't have a "BGRX" mode for RGBA → load the bytes as RGBA
        # (so PIL doesn't validate the channel layout) then swap the B/R
        # channels via split + merge.
        tile = Image.frombytes("RGBA", (rw, rh), pixel_data)
        b, g, r, _x = tile.split()
        rgb = Image.merge("RGB", (r, g, b))
        full.paste(rgb, (rx, ry))

    # Sample the rendered framebuffer for "blank-ness". Sampling on the
    # full-res image (before downscale) is more accurate. We compute the
    # mean grey value via a 1-channel conversion. Threshold ~6/255 catches
    # solid-black QEMU consoles (screensaver / off / not-yet-rendered)
    # without false-positiving genuinely dark UIs.
    is_blank = False
    try:
        gray_mean = sum(full.convert("L").getdata()) / max(1, full.width * full.height)
        is_blank = gray_mean < 6.0
    except Exception:  # noqa: BLE001 — mean is best-effort only
        is_blank = False

    # Optional downscale (preserve aspect ratio). Saves bytes and CPU on
    # the clients rendering many thumbnails.
    if max_dimension and (full.width > max_dimension or full.height > max_dimension):
        scale = max_dimension / max(full.width, full.height)
        new_size = (max(1, int(full.width * scale)), max(1, int(full.height * scale)))
        full = full.resize(new_size, Image.LANCZOS)

    out = BytesIO()
    full.save(out, format="PNG", optimize=False)
    return out.getvalue(), is_blank
