"""Server-side OCR endpoint — used by the noVNC console for the
"select text in screen → copy" feature.

The browser sends a cropped PNG (selection region) and a language code;
we spawn the system `tesseract` binary (must be installed on the host:
`apt install tesseract-ocr tesseract-ocr-chi-tra` on Debian/Ubuntu) and
return the recognized text.

Why server-side over `tesseract.js`:
  - tesseract.js + chi_tra.traineddata is ~10 MB of JS+wasm to download
    once. For a feature that's used occasionally that's a bad trade.
  - Server-side gets system-installed language data automatically; the
    operator can `apt install tesseract-ocr-jpn` (etc.) without touching
    jt-proxense.
  - Running tesseract on the host is much faster than wasm-tesseract
    in the browser, especially for the larger languages.
  - Audit-friendly: every OCR request shows up in the audit log with
    the cluster + VM context.

Constraints:
  - Tesseract spawned with a strict timeout (8s — more than enough for
    a screen region; longer means stuck or runaway).
  - Image size capped at 8 MB on the way in (matches the implicit cap
    a screen-region selection is going to produce; full-frame upload
    is rejected).
  - Language whitelist matches what the binary advertises; client can
    always fall back to 'eng'.
"""
from __future__ import annotations

import asyncio
import logging
import os
import shutil
import tempfile
from typing import Optional

from aiohttp import web

from . import audit
from .middleware import role_required


logger = logging.getLogger(__name__)


# Hard cap: cropped region from a 1920×1080 screen at 32-bit colour ≈
# 8 MB raw. PNG-encoded it'll be smaller; this leaves headroom.
_MAX_BYTES = 8 * 1024 * 1024
_TIMEOUT_S = 8.0
# 0.5s extra margin past _TIMEOUT_S for the wait.
_TIMEOUT_GRACE_S = 0.5


async def _list_langs() -> list[str]:
    """Run `tesseract --list-langs` once to learn what the host supports.
    Falls back to a sensible default if the binary is missing."""
    if not shutil.which("tesseract"):
        return ["eng"]
    try:
        proc = await asyncio.create_subprocess_exec(
            "tesseract", "--list-langs",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        out, _ = await asyncio.wait_for(proc.communicate(), timeout=3.0)
        text = out.decode("utf-8", errors="replace")
        # First line is "List of available languages (N):", rest are langs
        lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
        return [ln for ln in lines[1:] if ln and not ln.startswith("List ")]
    except Exception:
        return ["eng"]


_LANGS_CACHE: Optional[list[str]] = None


async def _supported_langs() -> list[str]:
    global _LANGS_CACHE
    if _LANGS_CACHE is None:
        _LANGS_CACHE = await _list_langs()
    return _LANGS_CACHE


@role_required("viewer")
async def list_langs_handler(request: web.Request) -> web.Response:
    """GET /api/ocr/langs — what the host's tesseract install supports."""
    langs = await _supported_langs()
    return web.json_response({"langs": langs})


@role_required("operator")
async def ocr_handler(request: web.Request) -> web.Response:
    """POST /api/ocr  body: PNG bytes  query: ?lang=chi_tra+eng

    `lang` accepts tesseract's `+`-joined multi-language syntax (e.g.
    `chi_tra+eng` to recognise Traditional Chinese with English fallback).
    Returns plain text in the response body.
    """
    if not shutil.which("tesseract"):
        return web.json_response(
            {"error": "tesseract_not_installed",
             "message": "Install on the host: apt install tesseract-ocr "
                        "tesseract-ocr-chi-tra"},
            status=501,
        )

    lang_q = (request.query.get("lang") or "eng").strip()
    # Normalise + sanitise. Reject anything that isn't [A-Za-z_+]
    if not all(c.isalnum() or c in "_+" for c in lang_q):
        return web.json_response({"error": "bad_lang"}, status=400)
    supported = set(await _supported_langs())
    requested = [p for p in lang_q.split("+") if p]
    if not requested:
        return web.json_response({"error": "bad_lang"}, status=400)
    for p in requested:
        if p not in supported:
            return web.json_response(
                {"error": "lang_unavailable", "lang": p,
                 "available": sorted(supported)},
                status=400,
            )
    lang = "+".join(requested)

    body = await request.read()
    if not body:
        return web.json_response({"error": "empty_body"}, status=400)
    if len(body) > _MAX_BYTES:
        return web.json_response(
            {"error": "image_too_large", "max_bytes": _MAX_BYTES},
            status=413,
        )

    # Spawn tesseract on a temp file. Using stdin (`-`) is supported but
    # some older builds choke on PNG via stdin; tempfile is universal.
    user = (request.get("user") or {}).get("username", "anonymous")
    src_ip = request.get("client_ip", "unknown")
    rid = request.get("request_id", "")

    text = ""
    err: str = ""
    with tempfile.NamedTemporaryFile(
        suffix=".png", delete=False, prefix="jt_ocr_"
    ) as f:
        tmp = f.name
        f.write(body)
    try:
        proc = await asyncio.create_subprocess_exec(
            "tesseract", tmp, "stdout", "-l", lang,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        try:
            out, errb = await asyncio.wait_for(
                proc.communicate(), timeout=_TIMEOUT_S + _TIMEOUT_GRACE_S,
            )
        except asyncio.TimeoutError:
            try:
                proc.kill()
            except Exception:
                pass
            err = f"tesseract timed out (>{_TIMEOUT_S}s)"
        else:
            text = out.decode("utf-8", errors="replace")
            if proc.returncode and proc.returncode != 0:
                err = errb.decode("utf-8", errors="replace")[:300]
    finally:
        try:
            os.unlink(tmp)
        except OSError:
            pass

    await audit.write(
        user=user, source_ip=src_ip, action="ocr.console",
        target=f"bytes={len(body)} lang={lang}",
        result=("ok" if not err else f"error: {err}"),
        request_id=rid,
        params={"lang": lang, "bytes": len(body), "chars": len(text)},
    )

    if err:
        return web.json_response(
            {"error": "tesseract_failed", "detail": err},
            status=502,
        )
    return web.json_response({"text": text, "lang": lang})


ROUTES = [
    ("GET",  "/api/ocr/langs", list_langs_handler),
    ("POST", "/api/ocr",       ocr_handler),
]
