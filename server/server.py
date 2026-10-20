"""
JT-PROXENSE HTTP/WebSocket Server
Based on aiohttp, similar to jt-gelflow architecture
"""

import asyncio
import json
import logging
import os
import time
from typing import Set
from pathlib import Path

from aiohttp import web, WSMsgType
import aiohttp_cors

from .config import get_config, save_config, update_config, Config
from .cluster_manager import cluster_manager
from . import db
from . import auth_handlers
from . import login_page
from . import audit_page
from . import totp_page
from . import account_page
from . import sessions_page
from . import vm_control
from . import pdm_resources
from . import pdm_backups
from . import storage_content
from . import storage_download
from . import user_admin
from . import ocr
from . import pve_tasks
from . import backup_jobs
from . import node_inspect
from . import log_health
from . import vm_export
from . import node_config_backup
from . import node_ntp
from . import node_netinfo
from . import ssh_setup
from . import rrd_proxy
from . import vm_backups
from . import protection
from . import trust_store
from . import trust_admin
from . import capacity
from . import host_shell
from . import vm_config as vm_config_mod
from . import vm_create as vm_create_mod
from . import node_hardware
from . import fw_admin
from . import storage_admin
from . import ceph_admin
from . import network_admin
from . import maintenance
from . import host_upgrade
from . import boot_mirror, task_outcome, zfs_admin
from . import pve_users_admin
from . import cluster_locks
from . import audit_forwarder_admin
from . import ha_view
from . import corosync_view
from . import pools_view
from . import cluster_notes
from . import api_tokens
from . import pdm_cluster
from . import pdm_remote_migrate
from . import pdm_vm_ext
from . import console_proxy
from . import console_page
from . import console_term_page
from . import console_screenshot
from . import notifications_handlers
from . import audit_forwarder
from . import secret_handlers
from . import secret_store
from .middleware import (
    request_id_middleware, security_headers_middleware,
    make_auth_middleware, role_required,
)
from . import audit
from . import auth as auth_mod

logger = logging.getLogger(__name__)

# WebSocket clients
ws_clients: Set[web.WebSocketResponse] = set()

# Broadcast state
_last_broadcast_hash = 0
_last_broadcast_message = ""

# Static files directory
DIST_DIR = Path(__file__).parent.parent / "dist"


def _visible_cluster_ids(user):
    """Which clusters this session may see. None means "all".

    Grants are `(user, cluster_id|*) -> role`, so a `*` grant of any rank means
    every cluster; otherwise the visible set is exactly the clusters the user
    holds a row for. None is also returned when auth is disabled, matching the
    rest of the codebase's backward-compat policy.
    """
    if user is None:
        return None
    if user.get("role_global"):
        return None
    known = set(getattr(cluster_manager, "clusters", {}) or {})
    known |= set(getattr(cluster_manager, "adapters", {}) or {})
    try:
        return frozenset(cid for cid in known
                         if auth_mod.role_for(user["id"], cid))
    except Exception:
        logger.exception("could not resolve visible clusters; denying all")
        return frozenset()


def _scope_snapshot(data: dict, scope) -> dict:
    """Drop clusters this session may not see.

    The WebSocket used to hand every authenticated client the complete
    `get_all_data()` -- every cluster, node, guest and storage -- with no role
    check at all: the handler only inherited the middleware's "are you logged
    in?" gate. That is the whole data surface of the product, so filtering it
    in the UI would have been no filtering at all.
    """
    if scope is None:
        return data
    return {
        **data,
        "clusters": {cid: v for cid, v in (data.get("clusters") or {}).items()
                     if cid in scope},
    }


def _ws_is_paused(ws) -> bool:
    """Each connected WS carries a `_jtp_paused` flag we set when the client
    reports its tab as hidden. Paused clients are skipped by broadcast so
    we don't burn CPU JSON-encoding for a tab nobody is looking at."""
    return getattr(ws, "_jtp_paused", False)


async def broadcast_to_clients(data: dict):
    """Broadcast data to all WebSocket clients"""
    global _last_broadcast_hash, _last_broadcast_message

    if not ws_clients:
        return

    # Calculate hash to avoid unnecessary serialization
    data_hash = hash(json.dumps(data, sort_keys=True, default=str))
    if data_hash == _last_broadcast_hash:
        return

    _last_broadcast_hash = data_hash
    _last_broadcast_message = json.dumps({
        "type": "update",
        "data": data,
        "timestamp": time.time(),
    })

    # Broadcast to all clients (skip ones whose tab is hidden). Clients that
    # may see everything share the single pre-encoded message; a restricted
    # client gets its own, encoded ONCE PER DISTINCT SCOPE rather than once per
    # client, so N viewers of the same cluster still cost one serialisation.
    dead_clients = set()
    per_scope: dict = {None: _last_broadcast_message}
    for ws in ws_clients:
        if _ws_is_paused(ws):
            continue
        scope = getattr(ws, "_jtp_scope", None)
        message = per_scope.get(scope)
        if message is None:
            message = json.dumps({
                "type": "update",
                "data": _scope_snapshot(data, scope),
                "timestamp": time.time(),
            }, default=str)
            per_scope[scope] = message
        try:
            await asyncio.wait_for(ws.send_str(message), timeout=2.0)
        except Exception as e:
            logger.debug(f"Failed to send to client: {e}")
            dead_clients.add(ws)

    ws_clients.difference_update(dead_clients)


async def on_cluster_data_update(data: dict):
    """Callback when cluster data is updated"""
    await broadcast_to_clients(data)


# WebSocket Handler
async def websocket_handler(request: web.Request) -> web.WebSocketResponse:
    """Handle WebSocket connections"""
    ws = web.WebSocketResponse(heartbeat=30)
    await ws.prepare(request)

    # Resolve the caller's cluster scope ONCE, at connect. Role grants change
    # rarely and a session is re-established on reload, so re-resolving per
    # broadcast would cost a DB read per client per poll for no benefit.
    ws._jtp_scope = _visible_cluster_ids(request.get("user"))

    ws_clients.add(ws)
    logger.info(
        "WebSocket client connected. Total: %d (scope: %s)",
        len(ws_clients),
        "all" if ws._jtp_scope is None else f"{len(ws._jtp_scope)} cluster(s)")

    # Send initial data
    try:
        initial_data = _scope_snapshot(cluster_manager.get_all_data(), ws._jtp_scope)
        await ws.send_json({
            "type": "initial",
            "data": initial_data,
            "timestamp": time.time(),
        })
    except Exception as e:
        logger.error(f"Failed to send initial data: {e}")

    try:
        async for msg in ws:
            if msg.type == WSMsgType.TEXT:
                # Handle client messages (e.g., subscription)
                try:
                    data = json.loads(msg.data)
                    msg_type = data.get("type")

                    if msg_type == "ping":
                        await ws.send_json({"type": "pong", "timestamp": time.time()})
                    elif msg_type == "pause":
                        # Client tab went hidden — skip broadcasts until resume.
                        ws._jtp_paused = True
                    elif msg_type == "resume":
                        ws._jtp_paused = False
                    elif msg_type == "refresh":
                        # Re-arm with a fresh snapshot — used right after the
                        # tab becomes visible so the UI shows current data.
                        ws._jtp_paused = False
                        try:
                            snapshot = cluster_manager.get_all_data()
                            await ws.send_json({
                                "type": "initial",
                                "data": snapshot,
                                "timestamp": time.time(),
                            })
                        except Exception as e:
                            logger.debug(f"refresh failed: {e}")
                    elif msg_type == "subscribe":
                        # Future: handle cluster-specific subscriptions
                        pass

                except json.JSONDecodeError:
                    pass

            elif msg.type == WSMsgType.ERROR:
                logger.error(f"WebSocket error: {ws.exception()}")
                break

    finally:
        ws_clients.discard(ws)
        logger.info(f"WebSocket client disconnected. Total: {len(ws_clients)}")

    return ws


# REST API Handlers

# Every credential is replaced by this before a config leaves the process. The
# UI only ever needs "is it set?", and the frontend already keys off this exact
# string (HoloMatrix reads auth.password === "***" to decide whether a console
# password prompt is needed).
_SECRET_SENTINEL = "***"

# Substrings that mark a key inside the free-form auth.ldap dict as a
# credential. That dict is deliberately schema-less so operators can extend it,
# which means it cannot be masked field-by-field -- so mask by name and accept
# the occasional false positive. A masked non-secret is a cosmetic bug; an
# unmasked bind password is not.
_SECRET_KEY_HINTS = ("pass", "secret", "token", "key", "cred")


def _mask_config_secrets(config_dict: dict) -> dict:
    """Replace every credential in a serialised Config with a sentinel.

    to_dict() is `asdict(self)` -- the whole dataclass tree, verbatim -- so
    anything not masked here goes out on the wire. The previous version masked
    only the two per-cluster fields, which left server.influx_token (the write
    credential Telegraf agents use) and auth.ldap (the directory bind password)
    readable by anyone with a session.
    """
    srv = config_dict.get("server")
    if isinstance(srv, dict) and "influx_token" in srv:
        srv["influx_token"] = _SECRET_SENTINEL if srv.get("influx_token") else ""

    auth = config_dict.get("auth")
    if isinstance(auth, dict):
        if "session_secret" in auth:
            auth["session_secret"] = _SECRET_SENTINEL if auth.get("session_secret") else ""
        ldap = auth.get("ldap")
        if isinstance(ldap, dict):
            for k, v in list(ldap.items()):
                if any(h in k.lower() for h in _SECRET_KEY_HINTS):
                    ldap[k] = _SECRET_SENTINEL if v else ""

    for cluster in config_dict.get("clusters", []):
        cid = cluster.get("id", "")
        if "auth" in cluster:
            cluster["auth"]["token_value"] = _SECRET_SENTINEL if cluster["auth"].get("token_value") else ""
            # `auth.password` is sourced from BOTH the encrypted secret store
            # AND (legacy) the yaml field — treat either as "configured".
            yaml_pw = cluster["auth"].get("password") or ""
            store_has = secret_store.has_secret(cid, "pve_password") if cid else False
            cluster["auth"]["password"] = _SECRET_SENTINEL if (yaml_pw or store_has) else ""
    return config_dict


# What a non-admin session is allowed to see. The SPA needs display preferences,
# the console mode, the alert thresholds it draws bands from, and enough of each
# cluster to label it -- nothing else. Everything absent from this projection
# (node addresses, PVE usernames, SSH users and ports, poll intervals, the auth
# backend, LDAP, audit forwarding, the bind address) is infrastructure detail
# that a viewer has no reason to hold.
def _project_config_for_viewer(config_dict: dict) -> dict:
    out = {
        "ui": config_dict.get("ui", {}),
        "alerts": config_dict.get("alerts", {}),
        "console": {"mode": (config_dict.get("console") or {}).get("mode", "disabled")},
        "vm_control": {"enabled": (config_dict.get("vm_control") or {}).get("enabled", False)},
        "clusters": [],
    }
    for cluster in config_dict.get("clusters", []):
        cauth = cluster.get("auth") or {}
        out["clusters"].append({
            "id": cluster.get("id", ""),
            "name": cluster.get("name", ""),
            "type": cluster.get("type", "pve"),
            "enabled": cluster.get("enabled", True),
            # Already sentinel-valued by _mask_config_secrets; the console
            # prompt decides on presence, never on the value.
            "auth": {
                "password": cauth.get("password", ""),
                "token_value": cauth.get("token_value", ""),
            },
        })
    return out


async def get_config_handler(request: web.Request) -> web.Response:
    """Get current configuration, scoped to the caller.

    This route used to carry NO role check at all (only the POST was
    admin-gated), so any authenticated session -- including one with no role
    grant whatsoever -- could read the entire config. Two layers now: secrets
    are masked for everyone, and everything a viewer has no need for is dropped
    before the response is built rather than hidden in the UI.
    """
    config = get_config()
    config_dict = _mask_config_secrets(config.to_dict())

    user = request.get("user")
    # user is None when auth is disabled — same backward-compat policy the rest
    # of the codebase uses (role_required is a no-op in that mode).
    if user is None or user.get("role_global") == "admin":
        return web.json_response(config_dict)
    return web.json_response(_project_config_for_viewer(config_dict))


async def update_config_handler(request: web.Request) -> web.Response:
    """Update configuration. EVERY config change is audited — body is hashed,
    not stored, so secrets in the body (PVE tokens) never reach the audit log."""
    actor = (request.get("user") or {}).get("username", "anonymous")
    src_ip = request.get("client_ip", "unknown")
    request_id = request.get("request_id", "")
    try:
        updates = await request.json()
        # Compute the change set's top-level keys for the audit "target" — gives
        # operators a clue without leaking the values.
        changed_keys = sorted(list(updates.keys())) if isinstance(updates, dict) else []
        config = update_config(updates)
        await cluster_manager.reload_all_clusters()
        await audit.write(
            user=actor, source_ip=src_ip, action="config.update",
            target=",".join(changed_keys) or "<empty>",
            result="ok", request_id=request_id,
            params=updates,  # hashed inside audit.write — body itself never stored
        )
        return web.json_response({"status": "ok", "message": "Configuration updated and reloaded"})
    except Exception as e:
        await audit.write(
            user=actor, source_ip=src_ip, action="config.update",
            result=audit.result_error(e), request_id=request_id,
        )
        return web.json_response({"error": str(e)}, status=400)


# The REST mirrors of the WebSocket snapshot. v1.1.0 scoped the WebSocket to
# the clusters a session holds a grant on, but these handlers kept answering
# with EVERY cluster to any logged-in user — so a user granted only cluster A
# could read cluster B's nodes, guests and storages from /api/vms or
# /api/clusters/B, which is the same data the WebSocket scoping withholds.
# Each one now goes through the same _visible_cluster_ids().

def _scope(request: web.Request):
    return _visible_cluster_ids(request.get("user"))


def _in_scope(scope, cluster_id) -> bool:
    return scope is None or cluster_id in scope


def _scoped_clusters(scope) -> dict:
    return {cid: c for cid, c in cluster_manager.clusters.items()
            if _in_scope(scope, cid)}


async def get_clusters_handler(request: web.Request) -> web.Response:
    """All cluster data visible to the caller."""
    data = cluster_manager.get_all_data()
    return web.json_response(_scope_snapshot(data, _scope(request)))


async def get_cluster_handler(request: web.Request) -> web.Response:
    """One cluster's data (404 when missing OR outside the caller's scope)."""
    cluster_id = request.match_info.get("cluster_id")
    cluster = cluster_manager.get_cluster(cluster_id)

    # Out-of-scope answers exactly like missing, so the endpoint cannot be
    # used to enumerate cluster ids.
    if not cluster or not _in_scope(_scope(request), cluster_id):
        return web.json_response({"error": "Cluster not found"}, status=404)

    return web.json_response(cluster.get_data())


async def get_summary_handler(request: web.Request) -> web.Response:
    """Summary across the clusters visible to the caller."""
    summary = cluster_manager.get_global_summary(scope=_scope(request))
    return web.json_response(summary)


async def get_nodes_handler(request: web.Request) -> web.Response:
    """Nodes across the clusters visible to the caller."""
    scope = _scope(request)
    cluster_id = request.query.get("cluster")
    nodes = {}

    if cluster_id and not _in_scope(scope, cluster_id):
        pass
    elif cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            nodes = {k: _to_jsonable(v) for k, v in cluster.cache.nodes.items()}
    else:
        for cid, cluster in _scoped_clusters(scope).items():
            for key, node in cluster.cache.nodes.items():
                nodes[f"{cid}/{key}"] = _to_jsonable(node)

    return web.json_response(nodes)


def _to_jsonable(obj):
    """Recursively convert dataclasses + Enums (and the cache models that
    contain both) into plain dict/list/scalar so json.dumps works.

    The cache models include nested dataclasses (CPUMetrics, MemoryMetrics,
    …) and Enum fields (VMStatus, NodeStatus). Those weren't JSON-serializable
    until polling started populating them — the latent bug exposed once the
    new Administrator tokens started filling the cache properly."""
    import dataclasses
    import enum
    # Enum: unwrap to value (handles VMStatus.RUNNING → "running")
    if isinstance(obj, enum.Enum):
        return obj.value
    # Dataclass instance: deep-convert via asdict, then re-walk in case any
    # leaf fields are Enums or further dataclasses asdict already inlined.
    if dataclasses.is_dataclass(obj) and not isinstance(obj, type):
        return {k: _to_jsonable(v) for k, v in dataclasses.asdict(obj).items()}
    if isinstance(obj, dict):
        return {str(k): _to_jsonable(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple, set)):
        return [_to_jsonable(v) for v in obj]
    # Plain Python object with attributes — but NOT a class, NOT an Enum.
    if (hasattr(obj, "__dict__")
            and not isinstance(obj, type)
            and not isinstance(obj, enum.Enum)):
        return {k: _to_jsonable(v) for k, v in vars(obj).items()
                if not k.startswith("_")}
    return obj


async def get_vms_handler(request: web.Request) -> web.Response:
    """Guests across the clusters visible to the caller."""
    scope = _scope(request)
    cluster_id = request.query.get("cluster")
    vms = {}

    if cluster_id and not _in_scope(scope, cluster_id):
        pass
    elif cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            vms = {k: _to_jsonable(v) for k, v in cluster.cache.vms.items()}
    else:
        for cid, cluster in _scoped_clusters(scope).items():
            for key, vm in cluster.cache.vms.items():
                vms[f"{cid}/{key}"] = _to_jsonable(vm)

    return web.json_response(vms)


async def get_storages_handler(request: web.Request) -> web.Response:
    """Storages across the clusters visible to the caller."""
    scope = _scope(request)
    cluster_id = request.query.get("cluster")
    storages = {}

    if cluster_id and not _in_scope(scope, cluster_id):
        pass
    elif cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            storages = {k: _to_jsonable(v) for k, v in cluster.cache.storages.items()}
    else:
        for cid, cluster in _scoped_clusters(scope).items():
            for key, storage in cluster.cache.storages.items():
                storages[f"{cid}/{key}"] = _to_jsonable(storage)

    return web.json_response(storages)


async def get_ceph_handler(request: web.Request) -> web.Response:
    """Ceph data for the clusters visible to the caller."""
    scope = _scope(request)
    cluster_id = request.query.get("cluster")
    ceph_data = {}

    if cluster_id and not _in_scope(scope, cluster_id):
        pass
    elif cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster and cluster.cache.ceph:
            ceph_data[cluster_id] = _to_jsonable(cluster.cache.ceph)
    else:
        for cid, cluster in _scoped_clusters(scope).items():
            if cluster.cache.ceph:
                ceph_data[cid] = _to_jsonable(cluster.cache.ceph)

    return web.json_response(ceph_data)


async def get_health_handler(request: web.Request) -> web.Response:
    """Get health status of all cluster connections"""
    health = {}
    for cid, cluster in cluster_manager.clusters.items():
        health[cid] = cluster.client.get_health_status()
    return web.json_response(health)


async def get_telegraf_hosts_handler(request: web.Request) -> web.Response:
    """List PVE hosts that have pushed Telegraf metrics."""
    from . import influx_receiver
    return web.json_response({
        "hosts": influx_receiver.get_all_hosts(),
        "stats": influx_receiver.stats(),
    })


async def get_telegraf_host_handler(request: web.Request) -> web.Response:
    """Snapshot of recent Telegraf samples for a single host.

    Response shape: {measurement: [{tags, fields, received_at, timestamp_ns}, …]}
    """
    from . import influx_receiver
    host = request.match_info["host"]
    samples = influx_receiver.get_host_metrics(host)
    return web.json_response({
        m: [
            {
                "tags": s.tags,
                "fields": s.fields,
                "received_at": s.received_at,
                "timestamp_ns": s.timestamp_ns,
            }
            for s in samples_list
        ]
        for m, samples_list in samples.items()
    })


# SPA shell headers — applied to EVERY index.html response, including the
# SPA fallback at the bottom of static_handler. Without this, Chrome
# heuristic-caches the HTML based on Last-Modified and serves stale HTML
# pointing at non-existent (deleted) hashed JS bundles after every deploy.
# Users would see no UI updates without manual cache clearing.
_SPA_HEADERS = {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
}


# Static file handler (SPA)
def _serve_index(request: web.Request) -> web.Response:
    """Serve index.html with the per-request CSP nonce stamped on its single
    inline <script> (the self-heal cache-buster), so script-src can be
    nonce-based with no 'unsafe-inline'. The external module bundle is
    <script src=...> and needs no nonce (covered by 'self')."""
    index_path = DIST_DIR / "index.html"
    if not index_path.exists():
        return web.Response(text="Frontend not built. Run: npm run build", status=404)
    # Return as a text Response (not FileResponse) so the security middleware
    # can stamp the CSP nonce onto its inline <script>.
    html = index_path.read_text(encoding="utf-8")
    return web.Response(text=html, content_type="text/html", charset="utf-8",
                        headers=_SPA_HEADERS)


async def index_handler(request: web.Request) -> web.Response:
    """Serve index.html for SPA"""
    return _serve_index(request)


def _resolve_within(base: Path, filename: str):
    """Resolve base/filename and return it ONLY if it stays inside `base`.

    The routes use `{filename:.*}`, and aiohttp URL-decodes %2f / %2e%2e AFTER
    path normalization — so an encoded `../` reaches the handler literally.
    Without this check, `/assets/..%2f..%2fconfig.yaml` (and worse:
    master.key, the SQLite DB, /etc/passwd) would be served unauthenticated.
    Returns None on any escape / bad path.
    """
    base = base.resolve()
    try:
        target = (base / filename).resolve()
    except (ValueError, OSError, RuntimeError):
        return None
    if target == base or target.is_relative_to(base):
        return target
    return None


async def assets_handler(request: web.Request) -> web.Response:
    """Serve static assets from /assets/ directory"""
    filename = request.match_info.get("filename", "")
    file_path = _resolve_within(DIST_DIR / "assets", filename)

    if file_path is not None and file_path.is_file():
        # Set appropriate cache headers for hashed assets
        return web.FileResponse(
            file_path,
            headers={"Cache-Control": "public, max-age=31536000, immutable"}
        )

    return web.Response(text="Asset not found", status=404)


async def fonts_handler(request: web.Request) -> web.Response:
    """Serve font files from /fonts/ directory"""
    filename = request.match_info.get("filename", "")
    file_path = _resolve_within(DIST_DIR / "fonts", filename)

    if file_path is not None and file_path.is_file():
        # Set appropriate cache headers for fonts
        content_type = "font/woff2" if filename.endswith(".woff2") else "text/css"
        return web.FileResponse(
            file_path,
            headers={
                "Cache-Control": "public, max-age=31536000, immutable",
                "Content-Type": content_type,
            }
        )

    return web.Response(text="Font not found", status=404)


async def static_handler(request: web.Request) -> web.Response:
    """Serve static files with SPA fallback"""
    filename = request.match_info.get("filename", "")
    file_path = _resolve_within(DIST_DIR, filename)

    if file_path is not None and file_path.is_file():
        # Top-level files like favicon.svg can rotate too, so also discourage
        # heuristic caching here (these are not hash-versioned).
        return web.FileResponse(
            file_path,
            headers={"Cache-Control": "no-cache, must-revalidate"},
        )

    # SPA fallback — must use the same no-store headers + nonce injection as
    # index_handler. Chrome heuristic-caches FileResponse otherwise, pinning
    # users to a stale HTML that references deleted asset bundle hashes.
    index_path = DIST_DIR / "index.html"
    if index_path.exists():
        return _serve_index(request)

    return web.Response(text="Not found", status=404)


def create_app() -> web.Application:
    """Create the aiohttp application"""
    config = get_config()
    auth_enabled = bool(getattr(config, "auth", None) and config.auth.enabled)

    middlewares = [
        security_headers_middleware,
        request_id_middleware,
        make_auth_middleware(auth_enabled),
    ]
    # client_max_size = 16 GiB so large ISO uploads (debian-DVD, Windows
    # ISOs, etc.) reach the storage upload handler. The handler streams
    # the file part to PVE without buffering, so the size limit doesn't
    # cost RAM. aiohttp's default of 1MB would silently 413 every ISO.
    app = web.Application(
        middlewares=middlewares,
        client_max_size=16 * 1024 * 1024 * 1024,
    )

    # CORS. The SPA is served by THIS process from the same origin, so the
    # browser needs no cross-origin grant to talk to /api/* at all -- the
    # default is therefore no cross-origin access.
    #
    # What was here before was `"*"` with allow_credentials=True. aiohttp_cors
    # cannot send a literal `*` alongside credentials (browsers reject that
    # pair), so it echoes the requesting Origin back instead -- which means any
    # site the operator visited could issue authenticated, cookie-bearing
    # requests to every endpoint, with any method and any header. SameSite=Lax
    # blunts the common case but not a compromised sibling subdomain.
    #
    # An operator hosting the UI on a different origin sets
    # `server.cors_origins: ["https://ui.example.net"]`. Explicit list only:
    # there is no wildcard path back in, and credentials are granted only to
    # origins named there.
    cors_origins = [o for o in (getattr(config.server, "cors_origins", None) or [])
                    if isinstance(o, str) and o.strip() and o.strip() != "*"]
    if cors_origins:
        logger.info("CORS: granting credentialed access to %s", ", ".join(cors_origins))
        cors = aiohttp_cors.setup(app, defaults={
            o: aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
                allow_methods="*",
            ) for o in cors_origins
        })
    else:
        cors = aiohttp_cors.setup(app, defaults={})

    # WebSocket route
    app.router.add_get("/ws", websocket_handler)

    # API routes — config write requires admin (no-op when auth disabled)
    api_routes = [
        ("GET",  "/api/config",            get_config_handler),
        ("POST", "/api/config",            role_required("admin")(update_config_handler)),
        ("GET",  "/api/clusters",          get_clusters_handler),
        ("GET",  "/api/clusters/{cluster_id}", get_cluster_handler),
        ("GET",  "/api/summary",           get_summary_handler),
        ("GET",  "/api/nodes",             get_nodes_handler),
        ("GET",  "/api/vms",               get_vms_handler),
        ("GET",  "/api/storages",          get_storages_handler),
        ("GET",  "/api/ceph",              get_ceph_handler),
        ("GET",  "/api/health",            get_health_handler),
        # ----- v0.2 auth / users / audit -----
        ("POST", "/api/auth/login",        auth_handlers.login_handler),
        ("POST", "/api/auth/logout",       auth_handlers.logout_handler),
        ("GET",  "/api/auth/me",           auth_handlers.me_handler),
        # TOTP 2FA (v0.2.x)
        ("POST", "/api/auth/totp/login",         auth_handlers.totp_login_handler),
        ("GET",  "/api/auth/totp/status",        auth_handlers.totp_status_handler),
        ("POST", "/api/auth/totp/enroll-init",   auth_handlers.totp_enroll_init_handler),
        ("POST", "/api/auth/totp/enroll-verify", auth_handlers.totp_enroll_verify_handler),
        ("POST", "/api/auth/totp/disable",       auth_handlers.totp_disable_handler),
        # Change password (self-service) + sessions admin
        ("POST",   "/api/auth/change-password",  auth_handlers.change_password_handler),
        ("GET",    "/api/sessions",              auth_handlers.sessions_list_handler),
        ("DELETE", "/api/sessions/{session_id}", auth_handlers.sessions_revoke_handler),
        ("POST",   "/api/sessions/user/{username}/revoke-all", auth_handlers.sessions_revoke_user_handler),
        # Role management (admin only — same logic as `jt-proxense user grant/revoke`)
        ("POST",   "/api/roles/grant",              auth_handlers.roles_grant_handler),
        ("POST",   "/api/roles/revoke",             auth_handlers.roles_revoke_handler),
        ("GET",    "/api/roles/{username}",         auth_handlers.roles_list_handler),
        ("GET",  "/api/users",             auth_handlers.users_list_handler),
        ("POST", "/api/users",             auth_handlers.users_create_handler),
        ("DELETE","/api/users/{username}", auth_handlers.users_delete_handler),
        ("GET",  "/api/audit",             auth_handlers.audit_query_handler),
        # Telegraf-fed supplemental host metrics (admin/operator scope —
        # the data is host-level, not cluster-level, so we don't gate by
        # cluster scope; viewer can read).
        ("GET",  "/api/telegraf/hosts",     role_required("viewer")(get_telegraf_hosts_handler)),
        ("GET",  "/api/telegraf/{host}",    role_required("viewer")(get_telegraf_host_handler)),
    ]

    for method, path, handler in api_routes:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3 VM control (writes; gated by config.vm_control.enabled at runtime)
    for method, path, handler in vm_control.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x PDM-style resource management (pools + tags). Admin-only at handler.
    for method, path, handler in pdm_resources.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x backup orchestration
    for method, path, handler in pdm_backups.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x storage content (list / delete; upload + download in later phases)
    for method, path, handler in storage_content.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x storage file download (SSH-streamed; needs ssh_user / key
    # deployed to PVE nodes). Optional — fails cleanly if asyncssh isn't
    # installed.
    for method, path, handler in storage_download.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x admin user management (admin-only) — companion to the
    # bin/jt-proxense user CLI; lets web admins manage users + roles
    # + reset 2FA without SSH access to the host.
    for method, path, handler in user_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x OCR — used by the noVNC console "select to copy" feature.
    # Spawns the system tesseract binary; absent → returns 501.
    for method, path, handler in ocr.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.6 PVE task / VM operation history viewer
    for method, path, handler in pve_tasks.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.8 cluster backup-jobs viewer
    for method, path, handler in backup_jobs.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.8 per-node certs / pending updates / subscription
    for method, path, handler in node_inspect.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.8 RRD time-series proxy (node / qemu / lxc historical charts)
    for method, path, handler in rrd_proxy.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.9 per-VM backup history (vzdump aggregator across backup-capable storages)
    for method, path, handler in vm_backups.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v1.2.0 data-protection overview: backup recency per guest + snapshots
    for method, path, handler in protection.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v1.2.0 pinned TLS/SSH fingerprints: review / accept / forget (admin)
    for method, path, handler in trust_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v1.2.0 capacity forecast + idle guests (read-only, RRD-based)
    for method, path, handler in capacity.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.11 PVE host shell (xterm.js terminal directly to a node)
    for method, path, handler in host_shell.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.13 VM / CT hardware config viewer (read-only)
    for method, path, handler in vm_config_mod.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.15 HA + replication read-only viewers
    for method, path, handler in ha_view.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # Corosync cluster health + ring performance viewer (viewer+)
    for method, path, handler in corosync_view.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.16 Pools browser (read-only)
    for method, path, handler in pools_view.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.19 Per-cluster ops notes
    for method, path, handler in cluster_notes.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.30 PVE API tokens listing (admin)
    for method, path, handler in api_tokens.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 VM/CT creation wizard (operator+)
    for method, path, handler in vm_create_mod.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # Log-derived health findings (ECC/MCE/OOM/disk errors; viewer+)
    for method, path, handler in log_health.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # VM export to OVA / Hyper-V (operator+; internal job queue)
    for method, path, handler in vm_export.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # Per-node config archive download (admin; SSH-based, read-only)
    for method, path, handler in node_config_backup.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # Per-node NTP / chrony config (admin; SSH-based)
    for method, path, handler in node_ntp.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # Per-node NIC / bridge / bond status (viewer; SSH-based, read-only)
    for method, path, handler in node_netinfo.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # SSH pubkey helper (admin) — powers the passwordless-SSH setup SOP
    for method, path, handler in ssh_setup.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 node hardware + disks/SMART (viewer+)
    for method, path, handler in node_hardware.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 firewall ipsets/aliases/groups (operator/admin)
    for method, path, handler in fw_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 storage CRUD (admin)
    for method, path, handler in storage_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 ceph admin actions
    for method, path, handler in ceph_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 node network bridge CRUD (admin)
    for method, path, handler in network_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 node maintenance mode (admin)
    for method, path, handler in maintenance.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.6 batch host upgrade orchestrator (admin)
    for method, path, handler in host_upgrade.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.9 ZFS pool lifecycle — replace / add / log / cache / special / builder
    for method, path, handler in zfs_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.9.1 root-pool boot mirror — staged, resumable across page reloads
    for method, path, handler in boot_mirror.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 PVE users / groups / ACL (admin)
    for method, path, handler in pve_users_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 cluster locks viewer + clear (operator/admin)
    for method, path, handler in cluster_locks.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.4 audit forwarder admin (admin)
    for method, path, handler in audit_forwarder_admin.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x apt + ACME + HA + firewall + SDN + replication
    for method, path, handler in pdm_cluster.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x notification channels + rules
    for method, path, handler in notifications_handlers.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x cross-cluster (remote) migrate
    for method, path, handler in pdm_remote_migrate.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x extended VM ops (snapshot / clone / template / delete / config)
    for method, path, handler in pdm_vm_ext.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x encrypted per-cluster secret store (admin only)
    for method, path, handler in secret_handlers.ROUTES:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # v0.3.x noVNC console: prepare + WS bridge + server-rendered page
    app.router.add_post(
        "/api/console/prepare",
        console_proxy.console_prepare_handler,
    )
    app.router.add_get(
        "/api/console/{cluster_id}/{node}/{vmid}/ws",
        console_proxy.console_ws_handler,
    )
    app.router.add_get(
        "/api/console/{cluster_id}/{node}/{vmid}/term/ws",
        console_proxy.console_term_ws_handler,
    )
    app.router.add_get(
        "/console/{cluster_id}/{node}/{vmid}",
        console_page.console_page_handler,
    )
    app.router.add_get(
        "/console-term/{cluster_id}/{node}/{vmid}",
        console_term_page.console_term_page_handler,
    )
    # v0.3.x: server-side framebuffer capture for the matrix thumbnail view.
    app.router.add_get(
        "/api/console/screenshot/{cluster_id}/{node}/{vmid}",
        console_screenshot.screenshot_handler,
    )

    # v0.2 login page (always public; the SPA root is gated by auth middleware)
    app.router.add_get("/login", login_page.login_page_handler)
    # v0.2 audit log viewer (admin only — gated by @role_required in handler)
    app.router.add_get("/audit", audit_page.audit_page_handler)
    # v0.2.x TOTP enrollment / disable page (any authenticated user)
    app.router.add_get("/totp", totp_page.totp_page_handler)
    # v0.2.x self-service profile / change-password page
    app.router.add_get("/account", account_page.account_page_handler)
    # v0.2.x admin: active sessions viewer + revoke
    app.router.add_get("/sessions", sessions_page.sessions_page_handler)

    # Static files (SPA)
    app.router.add_get("/", index_handler)
    app.router.add_get("/assets/{filename:.*}", assets_handler)
    app.router.add_get("/fonts/{filename:.*}", fonts_handler)
    app.router.add_get("/{filename:.*}", static_handler)

    return app


async def _bring_up_clusters():
    """Background task: load and start cluster polling. Runs concurrently
    with the HTTP server so unreachable PVE doesn't delay UI availability."""
    try:
        await cluster_manager.load_clusters()
        await cluster_manager.start_all()
        logger.info("cluster polling online")
    except Exception as e:
        logger.error("cluster bring-up failed: %s", e, exc_info=True)


async def start_server():
    """Start the HTTP server.

    v0.2: HTTP binds FIRST (so /login and /api/health respond instantly even
    on a fresh box with unreachable PVE), then cluster polling spins up in
    the background. v0.1 used to block startup on cluster reachability,
    causing ~10–15 s delay before the UI loaded.
    """
    config = get_config()

    # If auth is on, ensure the SQLite DB and schema exist before serving.
    if config.auth.enabled:
        db.configure(config.auth.db_path)
        db.apply_migrations()
        logger.info("auth backend=%s, db=%s, schema=%d",
                    config.auth.backend, config.auth.db_path, db.schema_version())
        try:
            trust_store.enable_persistence()
        except Exception as e:
            logger.error("trust store: persistence unavailable (%s) — fingerprints "
                         "are pinned in memory only until the next restart", e)
    else:
        logger.warning("auth.enabled=false — service is OPEN to anyone who can reach the port.")
        logger.warning("trust store: no database without auth — TLS/SSH fingerprints "
                       "are pinned in memory only and re-learned after a restart")

    # Encrypted secret store: ensure master.key exists, then sweep any
    # plaintext PVE passwords still in config.yaml into the store and clear
    # them from yaml. Idempotent — does nothing on subsequent boots.
    try:
        secret_store.ensure_master_key()
        migrated = secret_store.migrate_from_yaml(actor="system:boot")
        if migrated:
            ok = [m[0] for m in migrated if m[1] == "ok"]
            if ok:
                logger.warning("migrated %d cluster password(s) from yaml → encrypted store: %s",
                               len(ok), ", ".join(ok))
    except Exception as e:
        logger.error("secret store bootstrap failed: %s", e)

    # Audit forwarding (optional, set up after DB so the forwarder is ready
    # before the first audit row is written).
    fwd_cfg = getattr(config.auth, "forward", None)
    if fwd_cfg and fwd_cfg.enabled and fwd_cfg.host:
        try:
            import socket as _socket
            fwd = audit_forwarder.AuditForwarder(
                fmt=fwd_cfg.format, transport=fwd_cfg.transport,
                host=fwd_cfg.host, port=fwd_cfg.port,
                hostname=_socket.gethostname() or "jt-proxense",
                syslog_facility=fwd_cfg.syslog_facility,
                cef_vendor=fwd_cfg.cef_vendor,
                cef_product=fwd_cfg.cef_product,
                cef_version=fwd_cfg.cef_version,
            )
            await fwd.start()
            audit_forwarder.set_forwarder(fwd)
        except Exception as e:
            logger.warning("audit forwarder failed to start: %s", e)

    # Register cluster-update broadcast callback now (handler is idempotent
    # against the cluster_manager being not-yet-loaded — it just won't fire).
    cluster_manager.add_callback(on_cluster_data_update)

    # Build app & start HTTP listener BEFORE cluster polling.
    app = create_app()
    runner = web.AppRunner(app)
    await runner.setup()

    site = web.TCPSite(runner, config.server.host, config.server.http_port)
    await site.start()
    logger.info(f"HTTP listener up on http://{config.server.host}:{config.server.http_port}")

    # Optional InfluxDB-line-protocol receiver — Telegraf agents push host
    # metrics here on a separate port. Zero deps in the parser; runs in its
    # own aiohttp Application so the main UI's auth/CORS don't get in
    # Telegraf's way.
    if config.server.influx_enabled:
        try:
            from . import influx_receiver
            recv = influx_receiver.InfluxReceiver(
                host=config.server.host,
                port=config.server.influx_port,
                token=config.server.influx_token,
                on_points=influx_receiver.store_points,
            )
            await recv.start()
            # Stash on the main runner so stop_server can reach it.
            setattr(runner, "_jtp_influx_recv", recv)
        except Exception as e:
            logger.warning("InfluxDB receiver failed to start: %s", e)

    # Cluster polling in the background.
    asyncio.create_task(_bring_up_clusters())

    # Resume any in-flight host-upgrade jobs that were left running when
    # the daemon was last stopped (orderly restart mid-sweep, OS reboot,
    # etc.). Each job's state is fully driven from SQLite so this just
    # re-launches the per-job runner.
    asyncio.create_task(host_upgrade.resume_running_jobs_on_startup())

    # ZFS jobs are NOT resumed: a resilver keeps running inside the kernel
    # regardless of us, but our watcher died with the old process, so the row
    # is flagged 'orphaned' for human review instead of silently reported done.
    asyncio.create_task(zfs_admin.mark_orphans_on_startup())

    # Boot-mirror jobs: a resilver keeps running inside the kernel across a
    # daemon restart, so re-attach the watcher rather than orphaning the job —
    # the operator who comes back hours later must still see live progress.
    asyncio.create_task(boot_mirror.resume_on_startup())

    # PVE tasks whose outcome we still owe the audit log (migration 011). Most
    # resolve on the first poll because they finished while we were down.
    asyncio.create_task(task_outcome.resume_on_startup())

    # Export jobs: mark conversions orphaned by the restart as failed,
    # then run the 24 h output-retention reaper.
    async def _export_lifecycle():
        await vm_export.mark_orphans_on_startup()
        await vm_export.retention_reaper()
    asyncio.create_task(_export_lifecycle())

    return runner


async def stop_server(runner: web.AppRunner):
    """Stop the server"""
    recv = getattr(runner, "_jtp_influx_recv", None)
    if recv is not None:
        try:
            await recv.stop()
        except Exception as e:
            logger.warning("InfluxDB receiver shutdown error: %s", e)
    fwd = audit_forwarder.get_forwarder()
    if fwd is not None:
        await fwd.stop()
        audit_forwarder.set_forwarder(None)
    # In-flight PVE task watchers die with the process, so anything still
    # being followed loses its outcome row. Say so rather than leaving a silent
    # hole in the audit trail.
    await task_outcome.warn_on_shutdown()
    await cluster_manager.stop_all()
    await runner.cleanup()
    logger.info("Server stopped")
