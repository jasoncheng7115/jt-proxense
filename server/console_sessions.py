"""Short-lived console-token store.

Bridges between two facts:

  1. PVE's vncwebsocket only accepts a PVEAuthCookie (not API tokens).
  2. The browser must not see the PVE password — and in 'prompt' mode,
     we want the password to be a one-shot value that never persists.

Flow:
  - Browser POST /api/console/prepare {cluster, node, vmid, password?}
  - Server uses password (prompt mode) or cluster.auth.password (stored mode)
    to call PVE /access/ticket.
  - Server stores (token → ticket+csrf+expiry) in this in-memory map and
    returns a short opaque console_token to the browser.
  - Browser opens WS to /api/console/.../ws?ct=<token>.
  - WS bridge looks up the token, uses the PVE ticket as PVEAuthCookie when
    connecting upstream, then deletes the token (single-use).

In stored mode we cache the *PVE ticket itself* per cluster (max 110 min)
so we don't pay the password→ticket round-trip on every console open.
The console_token wrapper is still single-use and short-lived.
"""
from __future__ import annotations

import asyncio
import secrets
import time
from dataclasses import dataclass


CONSOLE_TOKEN_TTL_S = 120          # console_token lifetime
PVE_TICKET_CACHE_S = 110 * 60       # cache the PVE ticket itself this long


@dataclass
class _ConsoleToken:
    cluster_id: str
    node: str
    vmid: int
    pve_ticket: str
    pve_csrf: str
    expires_at: float          # unix ts
    # vncproxy/termproxy already-called: cached for the bridge so it
    # doesn't round-trip again. For VNC, vnc_ticket also doubles as the
    # RFB-level password the browser hands to noVNC's `credentials.password`.
    vnc_ticket: str = ""
    pve_port: int = 0
    # 'vnc' for QEMU (noVNC) or 'term' for LXC (xterm.js termproxy).
    kind: str = "vnc"
    # PVE auth user (e.g. 'root@pam') — termproxy needs this for the auth
    # frame the bridge sends right after WS upgrade.
    pve_user: str = "root@pam"


# token-string -> _ConsoleToken
_tokens: dict[str, _ConsoleToken] = {}
# cluster_id -> (ticket, csrf, expires_at_unix)  — only for `stored` mode reuse.
_pve_ticket_cache: dict[str, tuple[str, str, float]] = {}
_lock = asyncio.Lock()


def _now() -> float:
    return time.time()


async def _gc() -> None:
    """Drop expired entries. Cheap to call per-request."""
    now = _now()
    async with _lock:
        for k in list(_tokens):
            if _tokens[k].expires_at <= now:
                del _tokens[k]
        for k in list(_pve_ticket_cache):
            if _pve_ticket_cache[k][2] <= now:
                del _pve_ticket_cache[k]


async def get_or_mint_pve_ticket(
    cluster_id: str, client, *, username: str, password: str, force_fresh: bool = False,
) -> tuple[str, str]:
    """Return (ticket, csrf) for the cluster. Reuses a cached ticket unless
    `force_fresh` is set or it's stale. `client` must implement
    `acquire_ticket(username, password)`."""
    await _gc()
    if not force_fresh:
        cached = _pve_ticket_cache.get(cluster_id)
        if cached and cached[2] > _now() + 60:
            return cached[0], cached[1]
    info = await client.acquire_ticket(username, password)
    ticket = info["ticket"]
    csrf = info.get("csrf", "")
    expires_at = info.get("expires_at", _now() + PVE_TICKET_CACHE_S)
    async with _lock:
        _pve_ticket_cache[cluster_id] = (ticket, csrf, float(expires_at))
    return ticket, csrf


async def mint_console_token(
    *, cluster_id: str, node: str, vmid: int, ticket: str, csrf: str = "",
    vnc_ticket: str = "", pve_port: int = 0,
    kind: str = "vnc", pve_user: str = "root@pam",
) -> str:
    """Generate an opaque short-lived token bound to one VM. Single-use."""
    await _gc()
    token = secrets.token_urlsafe(24)   # 32 chars; 144 bits
    async with _lock:
        _tokens[token] = _ConsoleToken(
            cluster_id=cluster_id, node=node, vmid=int(vmid),
            pve_ticket=ticket, pve_csrf=csrf,
            expires_at=_now() + CONSOLE_TOKEN_TTL_S,
            vnc_ticket=vnc_ticket, pve_port=int(pve_port),
            kind=kind, pve_user=pve_user,
        )
    return token


async def consume_console_token(
    token: str, *, cluster_id: str, node: str, vmid: int,
) -> _ConsoleToken | None:
    """Look up + delete a token. Returns None if missing / expired / mismatched VM."""
    await _gc()
    async with _lock:
        entry = _tokens.pop(token, None)
    if entry is None:
        return None
    if entry.expires_at <= _now():
        return None
    if entry.cluster_id != cluster_id or entry.node != node or entry.vmid != int(vmid):
        return None
    return entry


def clear_cache_for_cluster(cluster_id: str) -> None:
    """Called when cluster auth changes — drops any cached PVE ticket."""
    _pve_ticket_cache.pop(cluster_id, None)
