"""SSH key helper — surfaces the jt-proxense host's own root public key
so the UI can show a copy-paste SOP for enabling the passwordless SSH
that the node-level features (NTP / host upgrade / VM export / storage
download) depend on.

Read-only, admin-only. Generates a keypair on first call if the host
has none yet, so the returned key is always usable.

Route:
  GET /api/ssh/pubkey → {ok, has_key, pubkey, generated}
"""
from __future__ import annotations

import logging
import re
import shlex
import subprocess
from pathlib import Path

from aiohttp import web

from . import audit
from .cluster_manager import cluster_manager
from . import ssh_util
from .middleware import role_required

logger = logging.getLogger(__name__)

_KEY = Path.home() / ".ssh" / "id_ed25519"
_PUB = Path.home() / ".ssh" / "id_ed25519.pub"

# ed25519/rsa public key line — used to refuse anything that isn't a key
# before it ever reaches a shell.
_PUBKEY_RE = re.compile(r"^(ssh-ed25519|ssh-rsa|ecdsa-sharp?2-nistp\d+)\s+[A-Za-z0-9+/=]+(\s+\S+)?$")


@role_required("admin")
async def pubkey_handler(request: web.Request) -> web.Response:
    generated = False
    try:
        if not _PUB.exists():
            _KEY.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
            # Non-interactive keygen; empty passphrase so the daemon can
            # use it unattended (same trust model as the existing
            # SSH-based features).
            subprocess.run(
                ["ssh-keygen", "-t", "ed25519", "-N", "", "-q",
                 "-C", "jt-proxense", "-f", str(_KEY)],
                check=True, timeout=15,
            )
            generated = True
        pub = _PUB.read_text(encoding="utf-8").strip()
        return web.json_response({"ok": True, "has_key": True,
                                  "pubkey": pub, "generated": generated})
    except Exception as e:
        logger.warning("ssh pubkey read/generate failed: %s", e)
        return web.json_response({"ok": False, "has_key": False,
                                  "error": str(e)}, status=500)


def _read_pubkey() -> str | None:
    try:
        return _PUB.read_text(encoding="utf-8").strip()
    except Exception:
        return None


@role_required("admin")
async def targets_handler(request: web.Request) -> web.Response:
    """List clusters + their node names so the UI can offer a
    seed-node picker for key propagation."""
    out = []
    data = (cluster_manager.get_all_data() or {}).get("clusters", {})
    for cid, cd in data.items():
        nodes = sorted((cd or {}).get("nodes", {}).keys())
        if nodes:
            out.append({"id": cid, "name": (cd or {}).get("name") or cid,
                        "nodes": nodes})
    return web.json_response({"ok": True, "clusters": out})


@role_required("admin")
async def propagate_handler(request: web.Request) -> web.Response:
    """Fan the jt-proxense host pubkey out across a cluster from ONE
    already-seeded node: we SSH into `seed_node` (which the operator
    has authorised), then from THERE append the key to every other
    member's /root/.ssh/authorized_keys — PVE clusters share root SSH
    between members, so the seed node can reach its peers.

    Body: {cluster_id, seed_node}. Admin-only, audited.
    """
    user = (request.get("user") or {}).get("username", "anonymous")
    ip = request.get("client_ip", "unknown")
    rid = request.get("request_id", "")

    try:
        body = await request.json()
    except Exception:
        # A malformed body used to escape as a 500 with a traceback page --
        # the shape scripts/security-full.sh flags. Answer it as data.
        return web.json_response({"error": "bad_json"}, status=400)
    cid = str(body.get("cluster_id", ""))
    seed = str(body.get("seed_node", ""))

    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    pubkey = _read_pubkey()
    if not pubkey or not _PUBKEY_RE.match(pubkey):
        return web.json_response({"error": "no_pubkey"}, status=500)

    # The picker (targets_handler) offers PVE node NAMES, so validate + resolve
    # by name. The previous code checked `seed not in health` and iterated
    # `health.items()`, but that map is keyed "{host}:{port}" — the seed name was
    # never a key (always 400) and the fan-out list treated "host:port" strings
    # as node identifiers. Go by the cached node list and ssh_util instead.
    nodes = sorted((getattr(getattr(cluster, "cache", None), "nodes", None) or {}))
    if seed not in nodes:
        return web.json_response({"error": "bad_seed_node"}, status=400)
    seed_host = ssh_util._resolve_host(cluster, seed)
    targets = [(n, ssh_util._resolve_host(cluster, n)) for n in nodes if n != seed]
    if not targets:
        return web.json_response({"error": "single_node_cluster"}, status=400)

    # Per-target: pipe the key over the inter-node SSH hop and append it
    # idempotently. The key travels via stdin so it never has to be
    # quoted inside the target-side command. Inner command is
    # single-quoted → sent literally to the peer.
    target_hosts = [h for _, h in targets]
    remote_inner = ("umask 077; mkdir -p ~/.ssh; touch ~/.ssh/authorized_keys; "
                    "k=$(cat); grep -qF \"$k\" ~/.ssh/authorized_keys || "
                    "printf '%s\\n' \"$k\" >> ~/.ssh/authorized_keys")
    script_lines = [f"KEY={shlex.quote(pubkey)}"]
    for h in target_hosts:
        qh = shlex.quote(h)
        script_lines.append(
            f"if printf '%s\\n' \"$KEY\" | ssh -o BatchMode=yes "
            f"-o StrictHostKeyChecking=no -o ConnectTimeout=8 root@{qh} "
            f"{shlex.quote(remote_inner)}; then echo \"OK {h}\"; "
            f"else echo \"FAIL {h}\"; fi")
    script = "\n".join(script_lines)

    # Credentials policy lives in ssh_util; the health map is used wholesale
    # here (enumerate fan-out targets + validate the seed), which is why this
    # does not go through target_for().
    user_ssh, port = ssh_util.user_port_for(cluster)
    results = []
    try:
        async with await ssh_util.connect(seed_host, user_ssh, port) as conn:
            r = await conn.run(script, check=False, timeout=90)
            for line in (r.stdout or "").splitlines():
                line = line.strip()
                if line.startswith("OK "):
                    results.append({"host": line[3:], "ok": True})
                elif line.startswith("FAIL "):
                    results.append({"host": line[5:], "ok": False})
            err_tail = (r.stderr or "").strip()[:300]
    except Exception as e:
        await audit.write(user=user, source_ip=ip, request_id=rid,
                          action="ssh.propagate", cluster_id=cid,
                          target=f"seed={seed}", result=f"error: {e}")
        return web.json_response(
            {"ok": False, "error": str(e),
             "message": "could not SSH into the seed node — authorise it first"},
            status=502)

    ok_n = sum(1 for x in results if x["ok"])
    await audit.write(user=user, source_ip=ip, request_id=rid,
                      action="ssh.propagate", cluster_id=cid,
                      target=f"seed={seed}",
                      result=f"ok ({ok_n}/{len(results)})",
                      params={"seed": seed, "targets": target_hosts})
    return web.json_response({"ok": True, "results": results,
                              "stderr": err_tail})


ROUTES = [
    ("GET",  r"/api/ssh/pubkey",    pubkey_handler),
    ("GET",  r"/api/ssh/targets",   targets_handler),
    ("POST", r"/api/ssh/propagate", propagate_handler),
]
