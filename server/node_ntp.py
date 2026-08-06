"""Per-node NTP (chrony) configuration — PVE keeps time with chrony but
exposes no API for it, so this works over SSH like host_upgrade /
storage_download (passwordless root SSH to the node is the documented
precondition).

Routes (admin only — writing time config is host-level):
  GET /api/clusters/{cid}/nodes/{node}/ntp
      → {ok, sources: <chronyc -n sources text>,
              tracking: <chronyc -n tracking text>,
              servers: [..] (our drop-in),
              base_servers: [..] (server/pool lines from distro config)}
  PUT /api/clusters/{cid}/nodes/{node}/ntp   {servers: ["ntp1.x", ...]}
      Writes /etc/chrony/conf.d/jt-proxense-ntp.conf (one `server X
      iburst` per entry; empty list removes the drop-in) and restarts
      chrony. The distro's own chrony.conf is NEVER touched — operators
      can always fall back by clearing our drop-in.

OWASP: A01 admin-gated; A03 every server string is whitelist-validated
(hostname/IP charset) and shell-quoted; A09 writes audited.
"""
from __future__ import annotations

import json
import logging
import re
import shlex

from aiohttp import web

from . import audit
from . import ssh_util
from .cluster_manager import cluster_manager
from .middleware import role_required

logger = logging.getLogger(__name__)

DROPIN = "/etc/chrony/conf.d/jt-proxense-ntp.conf"
_SERVER_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9.\-:]{0,253}$")
MAX_SERVERS = 8


def _ssh_for(cluster, node: str) -> tuple[str, str, int]:
    # Single source of truth in ssh_util — this used to be five byte-identical
    # copies, which is how the missing connect timeout stayed missing.
    return ssh_util.target_for(cluster, node)


def _require_cluster(cid: str):
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        raise web.HTTPNotFound(
            text=json.dumps({"error": "cluster_not_found"}),
            content_type="application/json")
    return cluster


async def _connect(cluster, node: str):
    host, user, port = _ssh_for(cluster, node)
    return await ssh_util.connect(host, user, port)


@role_required("admin")
async def ntp_get_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    try:
        async with await _connect(cluster, node) as conn:
            r = await conn.run(
                "chronyc -n tracking 2>&1; echo '===SRC==='; "
                "chronyc -n sources 2>&1; echo '===DROPIN==='; "
                f"cat {shlex.quote(DROPIN)} 2>/dev/null; echo '===BASE==='; "
                "grep -hE '^(server|pool) ' /etc/chrony/chrony.conf "
                "/etc/chrony/conf.d/*.conf 2>/dev/null | "
                f"grep -v -F {shlex.quote(DROPIN)} || true",
                check=False, timeout=20)
            out = r.stdout or ""
    except Exception as e:
        return web.json_response({"ok": False, "error": str(e)}, status=502)

    def section(name: str, nxt: str | None) -> str:
        try:
            start = out.index(f"==={name}===") + len(f"==={name}===")
            end = out.index(f"==={nxt}===") if nxt else len(out)
            return out[start:end].strip()
        except ValueError:
            return ""

    tracking = out.split("===SRC===")[0].strip()
    sources = section("SRC", "DROPIN")
    dropin = section("DROPIN", "BASE")
    base = section("BASE", None)

    servers = [m.group(1) for ln in dropin.splitlines()
               if (m := re.match(r"^server\s+(\S+)", ln.strip()))]
    base_servers = [ln.strip() for ln in base.splitlines() if ln.strip()]

    return web.json_response({
        "ok": True,
        "tracking": tracking,
        "sources": sources,
        "servers": servers,
        "base_servers": base_servers,
    })


@role_required("admin")
async def ntp_put_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    user = (request.get("user") or {}).get("username", "anonymous")
    ip = request.get("client_ip", "unknown")
    rid = request.get("request_id", "")

    try:
        body = await request.json()
    except Exception:
        # A malformed body used to escape as a 500 with a traceback page --
        # the shape scripts/security-full.sh flags. Answer it as data.
        return web.json_response({"error": "bad_json"}, status=400)
    raw = body.get("servers")
    if not isinstance(raw, list) or len(raw) > MAX_SERVERS:
        return web.json_response(
            {"error": "bad_servers", "message": f"list of ≤{MAX_SERVERS} entries"},
            status=400)
    servers: list[str] = []
    for item in raw:
        s = str(item).strip()
        if not s:
            continue
        if not _SERVER_RE.match(s):
            return web.json_response(
                {"error": "bad_server", "message": f"invalid server: {s!r}"},
                status=400)
        servers.append(s)

    if servers:
        content = "# Managed by jt-proxense — edits here are overwritten.\n" + \
                  "".join(f"server {s} iburst\n" for s in servers)
        write_cmd = (f"mkdir -p /etc/chrony/conf.d && "
                     f"printf '%s' {shlex.quote(content)} > {shlex.quote(DROPIN)}")
    else:
        # Empty list = remove our drop-in, fall back to distro defaults.
        write_cmd = f"rm -f {shlex.quote(DROPIN)}"

    cmd = (f"{write_cmd} && "
           "(systemctl restart chrony 2>/dev/null || systemctl restart chronyd) && "
           "sleep 1 && chronyc -n sources 2>&1 | head -20")
    try:
        async with await _connect(cluster, node) as conn:
            r = await conn.run(cmd, check=False, timeout=40)
            ok = r.exit_status == 0
            detail = ((r.stdout or "") + (r.stderr or "")).strip()[:1200]
    except Exception as e:
        ok, detail = False, str(e)

    await audit.write(user=user, source_ip=ip, request_id=rid,
                      action="node.ntp_update", cluster_id=cid,
                      target=f"{node}",
                      result="ok" if ok else f"error: {detail[:160]}",
                      params={"servers": servers})
    if not ok:
        return web.json_response({"ok": False, "error": detail}, status=502)
    return web.json_response({"ok": True, "sources": detail})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/nodes/{node}/ntp", ntp_get_handler),
    ("PUT", r"/api/clusters/{cluster_id}/nodes/{node}/ntp", ntp_put_handler),
]
