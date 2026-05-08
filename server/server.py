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

logger = logging.getLogger(__name__)

# WebSocket clients
ws_clients: Set[web.WebSocketResponse] = set()

# Broadcast state
_last_broadcast_hash = 0
_last_broadcast_message = ""

# Static files directory
DIST_DIR = Path(__file__).parent.parent / "dist"


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

    # Broadcast to all clients (skip ones whose tab is hidden)
    dead_clients = set()
    for ws in ws_clients:
        if _ws_is_paused(ws):
            continue
        try:
            await asyncio.wait_for(
                ws.send_str(_last_broadcast_message),
                timeout=2.0
            )
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

    ws_clients.add(ws)
    logger.info(f"WebSocket client connected. Total: {len(ws_clients)}")

    # Send initial data
    try:
        initial_data = cluster_manager.get_all_data()
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

async def get_config_handler(request: web.Request) -> web.Response:
    """Get current configuration"""
    config = get_config()
    # Don't expose sensitive auth data — replace with a sentinel so the UI
    # can show a "configured" badge without ever seeing the value.
    config_dict = config.to_dict()
    for cluster in config_dict.get("clusters", []):
        cid = cluster.get("id", "")
        if "auth" in cluster:
            cluster["auth"]["token_value"] = "***" if cluster["auth"].get("token_value") else ""
            # `auth.password` is sourced from BOTH the encrypted secret store
            # AND (legacy) the yaml field — treat either as "configured".
            yaml_pw = cluster["auth"].get("password") or ""
            store_has = secret_store.has_secret(cid, "pve_password") if cid else False
            cluster["auth"]["password"] = "***" if (yaml_pw or store_has) else ""

    return web.json_response(config_dict)


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


async def get_clusters_handler(request: web.Request) -> web.Response:
    """Get all cluster data"""
    data = cluster_manager.get_all_data()
    return web.json_response(data)


async def get_cluster_handler(request: web.Request) -> web.Response:
    """Get single cluster data"""
    cluster_id = request.match_info.get("cluster_id")
    cluster = cluster_manager.get_cluster(cluster_id)

    if not cluster:
        return web.json_response({"error": "Cluster not found"}, status=404)

    return web.json_response(cluster.get_data())


async def get_summary_handler(request: web.Request) -> web.Response:
    """Get global summary"""
    summary = cluster_manager.get_global_summary()
    return web.json_response(summary)


async def get_nodes_handler(request: web.Request) -> web.Response:
    """Get all nodes across clusters"""
    cluster_id = request.query.get("cluster")
    nodes = {}

    if cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            nodes = {k: _to_jsonable(v) for k, v in cluster.cache.nodes.items()}
    else:
        for cid, cluster in cluster_manager.clusters.items():
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
    """Get all VMs across clusters"""
    cluster_id = request.query.get("cluster")
    vms = {}

    if cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            vms = {k: _to_jsonable(v) for k, v in cluster.cache.vms.items()}
    else:
        for cid, cluster in cluster_manager.clusters.items():
            for key, vm in cluster.cache.vms.items():
                vms[f"{cid}/{key}"] = _to_jsonable(vm)

    return web.json_response(vms)


async def get_storages_handler(request: web.Request) -> web.Response:
    """Get all storages"""
    cluster_id = request.query.get("cluster")
    storages = {}

    if cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            storages = {k: _to_jsonable(v) for k, v in cluster.cache.storages.items()}
    else:
        for cid, cluster in cluster_manager.clusters.items():
            for key, storage in cluster.cache.storages.items():
                storages[f"{cid}/{key}"] = _to_jsonable(storage)

    return web.json_response(storages)


async def get_ceph_handler(request: web.Request) -> web.Response:
    """Get Ceph data"""
    cluster_id = request.query.get("cluster")
    ceph_data = {}

    if cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster and cluster.cache.ceph:
            ceph_data[cluster_id] = _to_jsonable(cluster.cache.ceph)
    else:
        for cid, cluster in cluster_manager.clusters.items():
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
async def index_handler(request: web.Request) -> web.Response:
    """Serve index.html for SPA"""
    index_path = DIST_DIR / "index.html"
    if index_path.exists():
        return web.FileResponse(index_path, headers=_SPA_HEADERS)
    return web.Response(text="Frontend not built. Run: npm run build", status=404)


async def assets_handler(request: web.Request) -> web.Response:
    """Serve static assets from /assets/ directory"""
    filename = request.match_info.get("filename", "")
    file_path = DIST_DIR / "assets" / filename

    if file_path.exists() and file_path.is_file():
        # Set appropriate cache headers for hashed assets
        return web.FileResponse(
            file_path,
            headers={"Cache-Control": "public, max-age=31536000, immutable"}
        )

    return web.Response(text="Asset not found", status=404)


async def fonts_handler(request: web.Request) -> web.Response:
    """Serve font files from /fonts/ directory"""
    filename = request.match_info.get("filename", "")
    file_path = DIST_DIR / "fonts" / filename

    if file_path.exists() and file_path.is_file():
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
    file_path = DIST_DIR / filename

    if file_path.exists() and file_path.is_file():
        # Top-level files like favicon.svg can rotate too, so also discourage
        # heuristic caching here (these are not hash-versioned).
        return web.FileResponse(
            file_path,
            headers={"Cache-Control": "no-cache, must-revalidate"},
        )

    # SPA fallback — must use the same no-store headers as index_handler.
    # Chrome heuristic-caches FileResponse otherwise, pinning users to a
    # stale HTML that references deleted asset bundle hashes.
    index_path = DIST_DIR / "index.html"
    if index_path.exists():
        return web.FileResponse(index_path, headers=_SPA_HEADERS)

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

    # Setup CORS
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods="*",
        )
    })

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
        ("GET",  "/api/telegraf/hosts",     get_telegraf_hosts_handler),
        ("GET",  "/api/telegraf/{host}",    get_telegraf_host_handler),
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
    else:
        logger.warning("auth.enabled=false — service is OPEN to anyone who can reach the port.")

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
    await cluster_manager.stop_all()
    await runner.cleanup()
    logger.info("Server stopped")
