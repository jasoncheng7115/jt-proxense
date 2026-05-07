"""Screenshot endpoint backing the matrix thumbnail view.

GET /api/console/screenshot/{cluster_id}/{node}/{vmid}[?max=320]

Flow:
  1. Resolve VM, role-check (operator+).
  2. Mint / reuse a PVE ticket for the cluster (110-min cache).
  3. Throttled vncproxy POST → vnc_ticket + port.
  4. RFB grab → PNG (server-side via `vnc_screenshot.capture_framebuffer_png`).
  5. Cache PNG bytes per VM for ~10 seconds; dedupe concurrent fetches so
     N thumbnails opening at once don't fan-out into N×vncproxy calls.

LXC containers are skipped — they have no real framebuffer (PVE returns a
text-mode VNC stream that screenshots as a tiny shell). Caller gets 415
back and the UI shows a placeholder.

Stored mode only. Prompt mode would need a per-request password and isn't
useful for batch thumbnails.
"""
from __future__ import annotations

import asyncio
import logging
import time
from typing import Optional

import aiohttp
import ssl
from aiohttp import web

from . import audit
from . import console_sessions
from . import secret_store
from . import vnc_screenshot
from .cluster_manager import cluster_manager
from .config import get_config
from .pve_throttle import throttle


logger = logging.getLogger(__name__)


# Per-VM PNG cache. Hits are cheap, misses kick off one upstream RFB grab
# and every concurrent caller awaits the same Future.
_CACHE_TTL_S = 10.0


class _CacheEntry:
    __slots__ = ("png", "is_blank", "expires_at", "future")

    def __init__(self):
        self.png: Optional[bytes] = None
        self.is_blank: bool = False
        self.expires_at: float = 0.0
        self.future: Optional[asyncio.Future[tuple[bytes, bool]]] = None


_cache: dict[str, _CacheEntry] = {}
_cache_lock = asyncio.Lock()


def _cache_key(cluster_id: str, node: str, vmid: int, max_dim: int) -> str:
    return f"{cluster_id}/{node}/{vmid}/{max_dim}"


async def _get_or_grab(
    key: str,
    grab_coro_factory,
) -> tuple[bytes, bool]:
    """Memoise upstream grabs. Single-flight per key."""
    now = time.time()
    async with _cache_lock:
        entry = _cache.get(key)
        if entry and entry.png is not None and entry.expires_at > now:
            return entry.png, entry.is_blank
        if entry and entry.future is not None:
            # In-flight already; wait on the same future.
            fut = entry.future
        else:
            entry = _CacheEntry()
            entry.future = asyncio.get_event_loop().create_future()
            _cache[key] = entry
            fut = entry.future
            asyncio.create_task(_run_grab(key, entry, grab_coro_factory))
    return await fut


async def _run_grab(key: str, entry: _CacheEntry, grab_coro_factory) -> None:
    try:
        png, is_blank = await grab_coro_factory()
        entry.png = png
        entry.is_blank = is_blank
        entry.expires_at = time.time() + _CACHE_TTL_S
        if entry.future and not entry.future.done():
            entry.future.set_result((png, is_blank))
    except Exception as e:
        if entry.future and not entry.future.done():
            entry.future.set_exception(e)
    finally:
        # Future is consumed once per call cycle; subsequent waiters in the
        # same TTL window read directly from `entry.png`.
        async with _cache_lock:
            entry.future = None


def _resolve_guest(cluster, vmid: int):
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == int(vmid):
            return getattr(vm, "node", ""), getattr(vm, "type", "qemu"), \
                   getattr(vm, "name", f"vm-{vmid}")
    return None, None, None


def _check_role(request: web.Request, cluster, vmid: int, vm_name: str) -> Optional[str]:
    user_state = request.get("user")
    if user_state is None:
        return None
    from . import auth as auth_mod
    tags = []
    for vm in cluster.cache.vms.values():
        if int(vm.vmid) == vmid:
            raw = getattr(vm, "tags", "") or ""
            tags = [t.strip() for t in raw.split(";") if t.strip()] if isinstance(raw, str) else list(raw)
            break
    effective = auth_mod.role_for(user_state["id"], cluster.id,
                                   vm_name=vm_name, vm_tags=tags)
    rank = {"viewer": 1, "operator": 2, "admin": 3}
    if not effective or rank.get(effective, 0) < 2:
        return "operator"
    return None


async def screenshot_handler(request: web.Request) -> web.StreamResponse:
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    vmid       = int(request.match_info["vmid"])
    try:
        max_dim = int(request.query.get("max", "320"))
    except ValueError:
        max_dim = 320
    max_dim = max(64, min(max_dim, 1920))

    cfg = get_config()
    mode = (cfg.console.mode or "disabled").lower()
    if mode != "stored":
        return web.json_response(
            {"error": "screenshot_requires_stored_mode",
             "message": "set console.mode='stored' and store the PVE password "
                        "to enable screenshot capture"},
            status=412,
        )

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    actual_node, vm_type, vm_name = _resolve_guest(cluster, vmid)
    if not actual_node:
        return web.json_response({"error": "vm_not_found"}, status=404)
    if actual_node != node:
        node = actual_node
    # LXC vncproxy returns the container's text-console framebuffer
    # (login prompt, dmesg, getty etc) — small but useful for "is this
    # CT alive at a glance?" thumbnails. We accept both qemu and lxc.

    err = _check_role(request, cluster, vmid, vm_name or "")
    if err:
        return web.json_response({"error": "forbidden", "required_role": err}, status=403)

    pw_to_use = (
        secret_store.get(cluster_id, "pve_password")
        or (cluster.client.auth.password or "")
    ).strip()
    if not pw_to_use:
        return web.json_response(
            {"error": "no_stored_password",
             "message": "no PVE password stored for this cluster"},
            status=412,
        )

    user_for_pve = cluster.client.auth.user or "root@pam"
    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        return web.json_response({"error": "no_pve_node"}, status=502)

    actor = (request.get("user") or {}).get("username", "anonymous")
    actor_ip = request.get("client_ip", "unknown")
    rid = request.get("request_id", "")
    audit_target = f"{cluster_id}/{node}/{vm_type}/{vmid}"

    key = _cache_key(cluster_id, node, vmid, max_dim)

    async def grab() -> tuple[bytes, bool]:
        # Mint / reuse PVE ticket.
        ticket, csrf = await console_sessions.get_or_mint_pve_ticket(
            cluster_id, cluster.client,
            username=user_for_pve, password=pw_to_use,
        )

        # LXC: PVE's lxc/vncproxy returns a near-empty framebuffer (CTs
        # don't have a graphical console). Use termproxy + a vt100
        # emulator instead — that's what PVE's webui does for CT consoles.
        if vm_type == "lxc":
            from . import lxc_thumb
            return await lxc_thumb.capture_lxc_text_png(
                pve_host=pve_node_cfg.host,
                pve_port=pve_node_cfg.port,
                pve_auth_cookie=ticket,
                pve_csrf=csrf,
                pve_user=user_for_pve,
                node=node, vmid=vmid,
                verify_ssl=pve_node_cfg.verify_ssl,
                max_dimension=max_dim,
            )

        # QEMU: classic vncproxy + RFB framebuffer grab.
        pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()
        url = (f"https://{pve_node_cfg.host}:{pve_node_cfg.port}"
               f"/api2/json/nodes/{node}/qemu/{vmid}/vncproxy")
        headers = {"Cookie": f"PVEAuthCookie={ticket}"}
        if csrf:
            headers["CSRFPreventionToken"] = csrf
        post_data = {"websocket": 1, "generate-password": 0}
        async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=pve_ssl),
        ) as cs:
            async with throttle.acquire(pve_node_cfg.host), cs.post(
                url, headers=headers, data=post_data,
            ) as r:
                if r.status != 200:
                    body = await r.text()
                    raise RuntimeError(f"vncproxy HTTP {r.status}: {body[:200]}")
                tk = (await r.json()).get("data", {}) or {}
        vnc_ticket = tk.get("ticket") or ""
        pve_port = int(tk.get("port") or 0)
        if not vnc_ticket or not pve_port:
            raise RuntimeError("vncproxy returned no ticket/port")

        return await vnc_screenshot.capture_framebuffer_png(
            pve_host=pve_node_cfg.host,
            pve_port=pve_node_cfg.port,
            pve_auth_cookie=ticket,
            node=node, vm_type=vm_type, vmid=vmid,
            vnc_ticket=vnc_ticket,
            pve_ws_port=pve_port,
            verify_ssl=pve_node_cfg.verify_ssl,
            overall_timeout=12.0,
            max_dimension=max_dim,
        )

    try:
        png, is_blank = await _get_or_grab(key, grab)
    except Exception as e:
        logger.warning("screenshot failed cluster=%s vmid=%d: %s", cluster_id, vmid, e)
        await audit.write(
            user=actor, source_ip=actor_ip, action="console.screenshot",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
        )
        return web.json_response(
            {"error": "screenshot_failed", "detail": str(e)},
            status=502,
        )

    # Quiet success — only log the first grab in a TTL window. (We don't
    # have a clean signal for that here; skip the per-hit audit row to
    # avoid polluting the audit log when 30 thumbnails refresh on a timer.)
    headers = {
        # Allow brief client cache so back/forward + tab switches don't
        # re-hit the endpoint immediately.
        "Cache-Control": f"private, max-age={int(_CACHE_TTL_S)}",
        "X-Content-Type-Options": "nosniff",
        # 1 = blank/empty thumbnail (all-black VM, CT with no visible text).
        # The matrix view uses this to deprioritise these guests in the
        # "prefer with content" sort. Header name is exposed via CORS for
        # cross-origin uses (we don't actually serve cross-origin in prod
        # but it costs nothing to declare).
        "X-Thumb-Empty": "1" if is_blank else "0",
        "Access-Control-Expose-Headers": "X-Thumb-Empty",
    }
    return web.Response(body=png, content_type="image/png", headers=headers)
