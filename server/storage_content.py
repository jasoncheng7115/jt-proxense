"""Storage content management endpoints.

Exposes per-storage content listing and deletion for the Storage detail
page (mirrors PVE webui's "節點 / 儲存 / 內容" tab + 上傳/移除 actions).
The PVE API has the underlying primitives — we just give them an HTTP
surface that respects our auth + audit rules.

Routes (registered in ROUTES at the bottom):
  GET    /api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content
                                                            ?type=iso|vztmpl|backup|images|snippets|import
  DELETE /api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content/{volume:.+}

Roles:
  - listing: viewer  (anyone who can see the cluster)
  - delete:  operator (matches "delete a backup / ISO" being a write op
             on shared infra, same level as snapshot delete)
"""
from __future__ import annotations

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


# Whitelist of content types we'll accept. Mirrors PVE's content categories.
# images   = VM disk images (qcow2 / raw / rbd)
# rootdir  = LXC root volumes
# vztmpl   = LXC templates (.tar.gz / .tar.zst)
# iso      = bootable installers
# backup   = vzdump archives (.vma.zst / .tar.zst / .tar.lzo)
# snippets = hookscripts, cloud-init userdata
# import   = importable disks (PVE 8.3+ — VMware OVA, raw etc.)
_VALID_CONTENT_TYPES = {
    "images", "rootdir", "vztmpl", "iso", "backup", "snippets", "import",
}


def _audit_actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


@role_required("viewer")
async def list_content_handler(request: web.Request) -> web.Response:
    """List items stored on a given storage, filtered by content type.

    PVE's `/nodes/{node}/storage/{storage}/content?content=...` returns
    objects with at least `volid`, `format`, `size`, `ctime`, plus
    type-specific extras (e.g. backup includes `notes`, vztmpl `verification`).
    We pass that through verbatim — the client handles per-tab columns.
    """
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    storage    = request.match_info["storage"]

    content_type = (request.query.get("type") or "iso").lower()
    if content_type not in _VALID_CONTENT_TYPES:
        return web.json_response(
            {"error": "invalid_content_type",
             "allowed": sorted(_VALID_CONTENT_TYPES)},
            status=400,
        )

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    try:
        rows = await cluster.client.list_storage_content(
            node, storage, content=content_type,
        )
    except Exception as e:
        return web.json_response(
            {"error": "pve_request_failed", "detail": str(e)},
            status=502,
        )
    return web.json_response({
        "node": node,
        "storage": storage,
        "type": content_type,
        "items": rows,
    })


@role_required("operator")
async def delete_content_handler(request: web.Request) -> web.Response:
    """Delete a single item (volid) from the given storage.

    `volume` in the URL is the volid as returned by listing — for example
    `local:iso/debian-12.iso` or `backup-pbs:backup/vzdump-qemu-100-...`.
    The colon and slash are URL-safe per RFC 3986 sub-delims, but most
    clients will percent-encode the slash; we match with `{volume:.+}`
    so either form works.

    Note: PVE returns a task UPID for some volume types (backup) and
    nothing/empty for others (iso). We surface whatever we get, the
    client just shows a generic success.
    """
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    storage    = request.match_info["storage"]
    volume     = request.match_info["volume"]

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    user, ip, rid = _audit_actor(request)
    audit_target = f"{cluster_id}/{node}/{storage}/{volume}"

    try:
        upid = await cluster.client.delete_storage_content(node, storage, volume)
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="storage.content.delete",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
        )
        return web.json_response(
            {"error": "pve_request_failed", "detail": str(e)},
            status=502,
        )

    await audit.write(
        user=user, source_ip=ip, action="storage.content.delete",
        target=audit_target, cluster_id=cluster_id,
        result="ok", request_id=rid,
    )
    return web.json_response({"ok": True, "upid": upid})


ROUTES = [
    ("GET",    "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content",
                                                              list_content_handler),
    ("DELETE", "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content/{volume:.+}",
                                                              delete_content_handler),
]
