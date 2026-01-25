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

logger = logging.getLogger(__name__)

# WebSocket clients
ws_clients: Set[web.WebSocketResponse] = set()

# Broadcast state
_last_broadcast_hash = 0
_last_broadcast_message = ""

# Static files directory
DIST_DIR = Path(__file__).parent.parent / "dist"


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

    # Broadcast to all clients
    dead_clients = set()
    for ws in ws_clients:
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
    # Don't expose sensitive auth data
    config_dict = config.to_dict()
    for cluster in config_dict.get("clusters", []):
        if "auth" in cluster:
            cluster["auth"]["token_value"] = "***" if cluster["auth"].get("token_value") else ""
            cluster["auth"]["password"] = "***" if cluster["auth"].get("password") else ""

    return web.json_response(config_dict)


async def update_config_handler(request: web.Request) -> web.Response:
    """Update configuration"""
    try:
        updates = await request.json()
        config = update_config(updates)
        # Reload all clusters to pick up config changes (auth, intervals, etc.)
        await cluster_manager.reload_all_clusters()
        return web.json_response({"status": "ok", "message": "Configuration updated and reloaded"})
    except Exception as e:
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
            nodes = {k: v.__dict__ for k, v in cluster.cache.nodes.items()}
    else:
        for cid, cluster in cluster_manager.clusters.items():
            for key, node in cluster.cache.nodes.items():
                nodes[f"{cid}/{key}"] = node.__dict__

    return web.json_response(nodes)


async def get_vms_handler(request: web.Request) -> web.Response:
    """Get all VMs across clusters"""
    cluster_id = request.query.get("cluster")
    vms = {}

    if cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            vms = {k: v.__dict__ for k, v in cluster.cache.vms.items()}
    else:
        for cid, cluster in cluster_manager.clusters.items():
            for key, vm in cluster.cache.vms.items():
                vms[f"{cid}/{key}"] = vm.__dict__

    return web.json_response(vms)


async def get_storages_handler(request: web.Request) -> web.Response:
    """Get all storages"""
    cluster_id = request.query.get("cluster")
    storages = {}

    if cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster:
            storages = {k: v.__dict__ for k, v in cluster.cache.storages.items()}
    else:
        for cid, cluster in cluster_manager.clusters.items():
            for key, storage in cluster.cache.storages.items():
                storages[f"{cid}/{key}"] = storage.__dict__

    return web.json_response(storages)


async def get_ceph_handler(request: web.Request) -> web.Response:
    """Get Ceph data"""
    cluster_id = request.query.get("cluster")
    ceph_data = {}

    if cluster_id:
        cluster = cluster_manager.get_cluster(cluster_id)
        if cluster and cluster.cache.ceph:
            ceph_data[cluster_id] = cluster.cache.ceph.__dict__
    else:
        for cid, cluster in cluster_manager.clusters.items():
            if cluster.cache.ceph:
                ceph_data[cid] = cluster.cache.ceph.__dict__

    return web.json_response(ceph_data)


async def get_health_handler(request: web.Request) -> web.Response:
    """Get health status of all cluster connections"""
    health = {}
    for cid, cluster in cluster_manager.clusters.items():
        health[cid] = cluster.client.get_health_status()
    return web.json_response(health)


# Static file handler (SPA)
async def index_handler(request: web.Request) -> web.Response:
    """Serve index.html for SPA"""
    index_path = DIST_DIR / "index.html"
    if index_path.exists():
        return web.FileResponse(
            index_path,
            headers={
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            }
        )
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
        return web.FileResponse(file_path)

    # SPA fallback - serve index.html for client-side routing
    index_path = DIST_DIR / "index.html"
    if index_path.exists():
        return web.FileResponse(index_path)

    return web.Response(text="Not found", status=404)


def create_app() -> web.Application:
    """Create the aiohttp application"""
    app = web.Application()

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

    # API routes
    api_routes = [
        ("GET", "/api/config", get_config_handler),
        ("POST", "/api/config", update_config_handler),
        ("GET", "/api/clusters", get_clusters_handler),
        ("GET", "/api/clusters/{cluster_id}", get_cluster_handler),
        ("GET", "/api/summary", get_summary_handler),
        ("GET", "/api/nodes", get_nodes_handler),
        ("GET", "/api/vms", get_vms_handler),
        ("GET", "/api/storages", get_storages_handler),
        ("GET", "/api/ceph", get_ceph_handler),
        ("GET", "/api/health", get_health_handler),
    ]

    for method, path, handler in api_routes:
        route = app.router.add_route(method, path, handler)
        cors.add(route)

    # Static files (SPA)
    app.router.add_get("/", index_handler)
    app.router.add_get("/assets/{filename:.*}", assets_handler)
    app.router.add_get("/fonts/{filename:.*}", fonts_handler)
    app.router.add_get("/{filename:.*}", static_handler)

    return app


async def start_server():
    """Start the HTTP server"""
    config = get_config()

    # Register callback for cluster updates
    cluster_manager.add_callback(on_cluster_data_update)

    # Load and start clusters
    await cluster_manager.load_clusters()
    await cluster_manager.start_all()

    # Create and start web app
    app = create_app()
    runner = web.AppRunner(app)
    await runner.setup()

    site = web.TCPSite(
        runner,
        config.server.host,
        config.server.http_port,
    )
    await site.start()

    logger.info(f"Server started on http://{config.server.host}:{config.server.http_port}")

    return runner


async def stop_server(runner: web.AppRunner):
    """Stop the server"""
    await cluster_manager.stop_all()
    await runner.cleanup()
    logger.info("Server stopped")
