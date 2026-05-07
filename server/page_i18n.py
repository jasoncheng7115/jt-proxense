"""Language picker for server-side rendered HTML pages.

The React SPA stores its language in `localStorage` and passes it to
backend-rendered routes (login / account / audit / sessions / totp /
console) via `?lang=zh-TW`. We honour that first, fall back to
`Accept-Language`, then English.

Pages embed their own per-page translation dicts; this module just
returns the active language code.
"""
from __future__ import annotations

from aiohttp import web

SUPPORTED = ("en", "zh-TW")


def pick_lang(request: web.Request) -> str:
    """Return one of `SUPPORTED`. `?lang=` wins; else Accept-Language; else 'en'."""
    q = request.query.get("lang", "")
    if q in SUPPORTED:
        return q
    accept = request.headers.get("Accept-Language", "")
    # crude: any zh prefix → zh-TW (we only ship Taiwan Mandarin)
    if accept.lower().startswith("zh"):
        return "zh-TW"
    return "en"
