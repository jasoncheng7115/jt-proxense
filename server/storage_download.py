"""Storage file download via SSH — PVE has no native download endpoint
for ISOs / templates / backups, so we open an SSH connection to the
node that owns the storage, resolve the volume's on-disk path via
`pvesm path`, then stream the file back to the browser.

Why SSH and not the API:
  - PVE API has `download-url` (server PULLS from a URL) but no
    "give me this file's bytes" — there's a `file-restore` endpoint
    for backup contents, but it's per-file inside an archive, not the
    archive itself.
  - SSH is universally available on every PVE node, no plugin needed.
  - Streaming via asyncssh.SSHClientProcess.stdout means we never
    buffer the whole file in jt-proxense's memory or disk.

Auth model:
  - Uses the cluster's `ssh_user` (config.yaml) — defaults to `root`.
  - Uses key-based auth via `~/.ssh/id_*` on the jt-proxense host;
    keys must be deployed to the PVE nodes' authorized_keys ahead of
    time. Operator-managed setup; documented in README.
  - The HTTP route requires viewer+ (read access matches "see what's
    in the storage" semantics; downloads are audited regardless).
"""
from __future__ import annotations

import logging
import os
import shlex
from typing import Optional
from urllib.parse import quote

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from .middleware import role_required


logger = logging.getLogger(__name__)


def _audit_actor(request: web.Request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    return (
        user,
        request.get("client_ip", "unknown"),
        request.get("request_id", ""),
    )


def _ssh_user_for(cluster) -> str:
    """Resolve the SSH user from cluster.config.ssh_user; default root."""
    return getattr(cluster.config, "ssh_user", None) or "root"


def _ssh_port_for(cluster) -> int:
    return int(getattr(cluster.config, "ssh_port", None) or 22)


@role_required("viewer")
async def download_handler(request: web.Request) -> web.StreamResponse:
    """GET /api/clusters/{cid}/nodes/{node}/storage/{storage}/download/{volume:.+}

    Streams the resolved on-disk file from `node` back to the browser
    via SSH. `volume` is the PVE volid (e.g. `local:iso/debian-12.iso`).

    Path resolution: we run `pvesm path '<volid>'` on the node and use
    its stdout as the file path. This works for every file-level
    storage type PVE supports (dir, nfs, cifs, cephfs, glusterfs).
    Block-level storages (RBD / LVM / ZFSpool) get rejected because
    `pvesm path` returns a device node, not a regular file.
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
        import asyncssh
    except ImportError:
        return web.json_response(
            {"error": "asyncssh_not_installed",
             "message": "Install asyncssh on the jt-proxense host: "
                        "pip install asyncssh>=2.21.0"},
            status=500,
        )

    # Find the host of the chosen node — pveproxy host is also the SSH
    # host (PVE always exposes both on the management interface).
    health = cluster.client.get_health_status()
    node_info = health.get(node)
    if not node_info:
        return web.json_response(
            {"error": "node_unknown",
             "message": f"node {node!r} not in cluster cache"},
            status=404,
        )
    ssh_host = node_info["host"]
    ssh_user = _ssh_user_for(cluster)
    ssh_port = _ssh_port_for(cluster)

    # Resolve volid → real path via `pvesm path`.
    quoted_volid = shlex.quote(volume)
    path_cmd = f"pvesm path {quoted_volid}"

    file_path: Optional[str] = None
    try:
        async with asyncssh.connect(
            ssh_host, port=ssh_port, username=ssh_user,
            known_hosts=None,  # Operator-trusted hosts; no host-key pinning yet
        ) as conn:
            r = await conn.run(path_cmd, check=False)
            if r.exit_status != 0:
                stderr = (r.stderr or "").strip()[:300]
                raise RuntimeError(f"pvesm path failed: {stderr}")
            file_path = (r.stdout or "").strip()
            if not file_path:
                raise RuntimeError("pvesm path returned empty path")
            # Sanity check: `pvesm path` for block-level returns
            # /dev/.../something — refuse to dd-stream a device.
            if file_path.startswith("/dev/"):
                raise RuntimeError(
                    "volume resolves to a device node — block-level "
                    "storages don't support file-level download")

            # Stat for size (Content-Length) + filename suggestion.
            stat_cmd = f"stat -c '%s' {shlex.quote(file_path)}"
            sr = await conn.run(stat_cmd, check=False)
            size: Optional[int] = None
            if sr.exit_status == 0:
                try:
                    size = int((sr.stdout or "").strip())
                except ValueError:
                    size = None

            # Stream the file via `cat`. asyncssh's run() collects all
            # stdout into a string by default — bad for multi-GB files.
            # Use create_process() so we can iterate over stdout chunks.
            filename = os.path.basename(file_path) or "download.bin"
            # Encode the filename per RFC 5987 so non-ASCII names work.
            filename_safe = filename.encode("ascii", errors="ignore").decode("ascii") or "download.bin"
            filename_utf8 = quote(filename, safe="")

            response = web.StreamResponse(
                status=200,
                headers={
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": (
                        f'attachment; filename="{filename_safe}"; '
                        f"filename*=UTF-8''{filename_utf8}"
                    ),
                    "Cache-Control": "no-store",
                },
            )
            if size is not None:
                response.content_length = size
            await response.prepare(request)

            # Note: the audit row is written BEFORE streaming begins,
            # so even a partial download leaves a trace.
            await audit.write(
                user=user, source_ip=ip, action="storage.content.download",
                target=audit_target, cluster_id=cluster_id,
                result="ok", request_id=rid,
                params={"path": file_path, "size": size},
            )

            cat_cmd = f"cat {shlex.quote(file_path)}"
            async with conn.create_process(cat_cmd) as proc:
                while True:
                    chunk = await proc.stdout.read(64 * 1024)
                    if not chunk:
                        break
                    if isinstance(chunk, str):
                        chunk = chunk.encode()
                    await response.write(chunk)
                # Surface non-zero exit (e.g. permission denied mid-stream)
                # via a log entry; the response body is already sent so
                # we can't change status here.
                await proc.wait()
                if proc.returncode and proc.returncode != 0:
                    logger.warning(
                        "storage download stream exit=%s file=%s",
                        proc.returncode, file_path,
                    )

            await response.write_eof()
            return response

    except Exception as e:
        logger.warning("download failed cluster=%s vol=%s: %s",
                       cluster_id, volume, e)
        await audit.write(
            user=user, source_ip=ip, action="storage.content.download",
            target=audit_target, cluster_id=cluster_id,
            result=audit.result_error(e), request_id=rid,
            params={"path": file_path or "?"},
        )
        # If we never started the response we can still return JSON.
        return web.json_response(
            {"error": "download_failed", "detail": str(e)},
            status=502,
        )


ROUTES = [
    ("GET", "/api/clusters/{cluster_id}/nodes/{node}/storage/{storage}/download/{volume:.+}",
                                                              download_handler),
]
