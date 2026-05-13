"""Storage content management endpoints.

Exposes per-storage content listing, deletion, and upload for the
Storage detail page (mirrors PVE webui's "節點 / 儲存 / 內容" tab
+ 上傳 / 從網址下載 / 移除 actions).

Routes (registered in ROUTES at the bottom):
  GET    /api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content
                                                            ?type=iso|vztmpl|backup|images|snippets|import
  DELETE /api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content/{volume:.+}
  POST   /api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/download-url
  POST   /api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/upload

Roles:
  - listing: viewer
  - delete / upload / download-url: operator
"""
from __future__ import annotations

import logging
import ssl

import aiohttp
from aiohttp import web

from . import audit
from . import console_sessions
from . import secret_store
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


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
async def download_url_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cid}/nodes/{node}/storage/{storage}/download-url

    Body: {"url": "...", "filename": "...", "content": "iso|vztmpl|...",
           "checksum": "abcd...", "checksum_algorithm": "sha256",
           "verify_certificates": true}

    Server-side download — PVE pulls the file onto the storage; the
    operator's bandwidth never carries it. Returns task UPID for
    progress polling. operator+ since this consumes storage + bandwidth
    on the PVE host.
    """
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    storage    = request.match_info["storage"]

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)

    url      = (body.get("url") or "").strip()
    filename = (body.get("filename") or "").strip()
    content  = (body.get("content") or "").strip().lower()
    if not url or not filename or content not in _VALID_CONTENT_TYPES:
        return web.json_response(
            {"error": "missing_or_invalid", "fields": ["url", "filename", "content"]},
            status=400,
        )
    # OWASP A10 — restrict to http(s); reject anything else (file:, ftp:,
    # gopher:, etc.). PVE does the actual fetch but we shouldn't enable
    # weird schemes via our API surface.
    from urllib.parse import urlparse
    try:
        parsed = urlparse(url)
    except Exception:
        return web.json_response({"error": "bad_url"}, status=400)
    if parsed.scheme not in ("http", "https") or not parsed.netloc:
        return web.json_response({"error": "bad_url_scheme",
                                  "allowed": ["http", "https"]}, status=400)
    # OWASP A09 — strip embedded credentials before audit log so
    # url-with-password (e.g. http://user:secret@host/file) doesn't leak
    # into audit_log.params_hash inputs.
    audit_url = parsed._replace(netloc=parsed.hostname or parsed.netloc).geturl()

    # Filename: keep on the same storage's well-known content directory,
    # so reject path traversal characters.
    if (".." in filename or "/" in filename or "\x00" in filename
            or len(filename) > 255):
        return web.json_response({"error": "bad_filename"}, status=400)

    checksum = (body.get("checksum") or "").strip() or None
    checksum_algorithm = (body.get("checksum_algorithm") or "").strip() or None
    verify_certificates = bool(body.get("verify_certificates", True))

    user, ip, rid = _audit_actor(request)
    audit_target = f"{cluster_id}/{node}/{storage}/{filename}"

    try:
        upid = await cluster.client.download_url_to_storage(
            node, storage,
            url=url, filename=filename, content=content,
            checksum=checksum, checksum_algorithm=checksum_algorithm,
            verify_certificates=verify_certificates,
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="storage.content.download_url",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"url": audit_url[:200], "filename": filename, "content": content},
        )
        return web.json_response(
            {"error": "pve_request_failed", "detail": str(e)},
            status=502,
        )

    await audit.write(
        user=user, source_ip=ip, action="storage.content.download_url",
        target=audit_target, cluster_id=cluster_id,
        result="ok", request_id=rid,
        params={"url": url[:200], "filename": filename, "content": content},
    )
    return web.json_response({"ok": True, "upid": upid})


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


@role_required("operator")
async def upload_handler(request: web.Request) -> web.Response:
    """POST /api/clusters/{cid}/nodes/{node}/storage/{storage}/upload

    Streams a browser multipart upload to PVE's
    `/nodes/{node}/storage/{storage}/upload`. We rebuild the multipart
    on the way out so PVE sees the exact field names it expects:
      - `content`   — content type (iso / vztmpl / ...)
      - `filename`  — the file part itself

    The incoming body is consumed via `request.multipart()` and each
    chunk forwarded to the outbound MultipartWriter — no full-file
    buffering on disk. ISO uploads can run into multi-GB so streaming
    is essential.
    """
    cluster_id = request.match_info["cluster_id"]
    node       = request.match_info["node"]
    storage    = request.match_info["storage"]

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    pve_node_cfg = cluster.client.current_node or (
        cluster.client.nodes[0] if cluster.client.nodes else None
    )
    if pve_node_cfg is None:
        return web.json_response({"error": "no_pve_node"}, status=502)

    user_for_pve = cluster.client.auth.user or "root@pam"
    pw = (
        secret_store.get(cluster_id, "pve_password")
        or (cluster.client.auth.password or "")
    ).strip()
    if not pw:
        return web.json_response(
            {"error": "no_stored_password",
             "message": "no PVE password stored for this cluster — uploads "
                        "need a session ticket, not API token"},
            status=412,
        )

    user, ip, rid = _audit_actor(request)

    # Read the incoming multipart parts.
    reader = await request.multipart()
    content_type: str | None = None
    file_part = None
    file_name: str | None = None
    while True:
        part = await reader.next()
        if part is None:
            break
        if part.name == "content":
            content_type = (await part.text()).strip().lower()
        elif part.name in ("file", "filename"):
            file_part = part
            file_name = part.filename or "uploaded.bin"
            break  # file MUST be processed in stream order
        else:
            await part.read()  # discard unknown field

    if not content_type or content_type not in _VALID_CONTENT_TYPES:
        return web.json_response(
            {"error": "missing_or_invalid_content"}, status=400,
        )
    if file_part is None:
        return web.json_response({"error": "no_file_part"}, status=400)

    audit_target = f"{cluster_id}/{node}/{storage}/{file_name}"

    try:
        ticket, csrf = await console_sessions.get_or_mint_pve_ticket(
            cluster_id, cluster.client,
            username=user_for_pve, password=pw,
        )
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="storage.content.upload",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"file": file_name, "content": content_type},
        )
        return web.json_response(
            {"error": "ticket_mint_failed", "detail": str(e)},
            status=502,
        )

    # Build outbound multipart streaming the file part through.
    writer = aiohttp.MultipartWriter("form-data")
    cp = writer.append(content_type)
    cp.set_content_disposition("form-data", name="content")

    async def stream_file():
        while True:
            chunk = await file_part.read_chunk(64 * 1024)
            if not chunk:
                break
            yield chunk
    fp = writer.append(stream_file())
    fp.set_content_disposition("form-data", name="filename", filename=file_name)

    pve_url = (
        f"https://{pve_node_cfg.host}:{pve_node_cfg.port}"
        f"/api2/json/nodes/{node}/storage/{storage}/upload"
    )
    pve_ssl: ssl.SSLContext | None
    pve_ssl = None if pve_node_cfg.verify_ssl else ssl._create_unverified_context()
    headers = {"Cookie": f"PVEAuthCookie={ticket}"}
    if csrf:
        headers["CSRFPreventionToken"] = csrf

    try:
        async with aiohttp.ClientSession(
            connector=aiohttp.TCPConnector(ssl=pve_ssl),
            timeout=aiohttp.ClientTimeout(total=None, sock_read=600),
        ) as cs:
            async with cs.post(pve_url, data=writer, headers=headers) as r:
                body = await r.text()
                if r.status != 200:
                    raise RuntimeError(f"PVE HTTP {r.status}: {body[:300]}")
                # PVE returns task UPID in the JSON body
                import json as _json
                upid = ""
                try:
                    upid = (_json.loads(body).get("data") or "")
                except Exception:
                    pass
    except Exception as e:
        await audit.write(
            user=user, source_ip=ip, action="storage.content.upload",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"file": file_name, "content": content_type},
        )
        return web.json_response(
            {"error": "upload_failed", "detail": str(e)},
            status=502,
        )

    await audit.write(
        user=user, source_ip=ip, action="storage.content.upload",
        target=audit_target, cluster_id=cluster_id,
        result="ok", request_id=rid,
        params={"file": file_name, "content": content_type},
    )
    return web.json_response({"ok": True, "upid": upid, "filename": file_name})


ROUTES = [
    ("GET",    "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content",
                                                              list_content_handler),
    ("DELETE", "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/content/{volume:.+}",
                                                              delete_content_handler),
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/download-url",
                                                              download_url_handler),
    ("POST",   "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/upload",
                                                              upload_handler),
]
