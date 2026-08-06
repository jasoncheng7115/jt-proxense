"""Download a node's configuration as a compressed archive.

Collects /etc/pve, /etc/network and the other per-node files an operator needs
to rebuild or audit a Proxmox host, and streams them to the browser.

Three properties this module is built around:

* **It never writes to the node.** `tar czf -` streams to stdout over the SSH
  channel, so nothing lands in /tmp on a production host and there is no
  cleanup to get wrong. Every node here is production (CLAUDE.md #13).

* **Secrets are opt-in and named.** /etc/pve/priv holds the cluster CA private
  key, authkey.key and shadow.cfg; /etc/ceph holds keyrings; /etc/ssh holds the
  host keys. Anyone with that CA key can forge a PVE ticket for any user on the
  cluster, so the default archive excludes all of it. Including it is a
  deliberate flag, recorded in the audit log as a distinct action.

* **A partial archive says so.** tar exits 2 when a path is unreadable, and
  --ignore-failed-read downgrades that to a warning so one missing directory
  does not lose the other twenty. That means "succeeded" and "silently skipped
  half the list" look identical unless the warnings are captured -- so stderr
  is parsed and the skipped paths are reported back in a header rather than
  left for the operator to discover when they need the backup.
"""
from __future__ import annotations

import asyncio
import io
import json
import os
import re
import shlex
import tarfile
import time
from datetime import datetime, timezone

import aiohttp
from aiohttp import web

from . import audit, ssh_util
from .cluster_manager import cluster_manager
from .middleware import role_required

# Read timeout for the whole collection. /etc/pve is a FUSE mount backed by a
# small sqlite database, so this is seconds of work, not minutes -- a long run
# means something is wrong, not something is big.
COLLECT_TIMEOUT = 300.0

# pvereport runs real commands on the node; on a busy host it takes far longer
# than an ordinary API read.
REPORT_TIMEOUT = 180.0

# Refuse anything implausible for a config archive. A node whose /etc has been
# used as a dumping ground should fail loudly rather than stream a gigabyte
# through the daemon's memory.
MAX_BYTES = 256 * 1024 * 1024

# Per-node configuration worth keeping. Paths that do not exist are skipped by
# --ignore-failed-read and reported; there is no penalty for listing something
# a given node happens not to use.
PATHS = [
    "/etc/pve",                 # cluster + guest config (pmxcfs)
    "/etc/network/interfaces",
    "/etc/network/interfaces.d",
    "/etc/hostname",
    "/etc/hosts",
    "/etc/resolv.conf",
    "/etc/fstab",
    "/etc/timezone",
    "/etc/apt/sources.list",
    "/etc/apt/sources.list.d",
    "/etc/apt/preferences.d",
    "/etc/chrony",
    "/etc/systemd/network",
    "/etc/systemd/timesyncd.conf",
    "/etc/sysctl.conf",
    "/etc/sysctl.d",
    "/etc/modprobe.d",
    "/etc/modules",
    "/etc/default/grub",
    "/etc/kernel",
    "/etc/lvm/lvm.conf",
    "/etc/multipath.conf",
    "/etc/multipath",
    "/etc/zfs",
    "/etc/vzdump.conf",
    "/etc/crontab",
    "/etc/cron.d",
    "/etc/aliases",
    "/etc/postfix/main.cf",
    "/etc/ssl/openssl.cnf",
]

# --- API collection -------------------------------------------------------
#
# Everything below is reachable over the PVE REST API with no SSH at all, which
# matters because a node that has never had our pubkey installed can still be
# captured. Each entry is (archive path, API path). A path that errors is
# recorded in the manifest rather than failing the whole archive -- a token
# without Sys.Audit should cost you one file, not the backup.
CLUSTER_ENDPOINTS = [
    ("cluster/options.json",              "/cluster/options"),
    ("cluster/status.json",               "/cluster/status"),
    ("cluster/storage.json",              "/storage"),
    ("cluster/backup-jobs.json",          "/cluster/backup"),
    ("cluster/pools.json",                "/pools"),
    ("cluster/access-users.json",         "/access/users"),
    ("cluster/access-groups.json",        "/access/groups"),
    ("cluster/access-roles.json",         "/access/roles"),
    ("cluster/access-acl.json",           "/access/acl"),
    ("cluster/access-domains.json",       "/access/domains"),
    ("cluster/firewall-options.json",     "/cluster/firewall/options"),
    ("cluster/firewall-rules.json",       "/cluster/firewall/rules"),
    ("cluster/firewall-groups.json",      "/cluster/firewall/groups"),
    ("cluster/firewall-ipset.json",       "/cluster/firewall/ipset"),
    ("cluster/firewall-aliases.json",     "/cluster/firewall/aliases"),
    ("cluster/ha-resources.json",         "/cluster/ha/resources"),
    ("cluster/ha-groups.json",            "/cluster/ha/groups"),
    ("cluster/ha-rules.json",             "/cluster/ha/rules"),
    ("cluster/replication.json",          "/cluster/replication"),
    ("cluster/sdn-zones.json",            "/cluster/sdn/zones"),
    ("cluster/sdn-vnets.json",            "/cluster/sdn/vnets"),
    ("cluster/sdn-controllers.json",      "/cluster/sdn/controllers"),
    ("cluster/notifications-endpoints.json", "/cluster/notifications/endpoints"),
    ("cluster/notifications-matchers.json",  "/cluster/notifications/matchers"),
    ("cluster/mapping-pci.json",          "/cluster/mapping/pci"),
    ("cluster/mapping-usb.json",          "/cluster/mapping/usb"),
    ("version.json",                      "/version"),
]

NODE_ENDPOINTS = [
    ("node/config.json",            "/nodes/{n}/config"),
    ("node/network.json",           "/nodes/{n}/network"),
    ("node/dns.json",               "/nodes/{n}/dns"),
    ("node/time.json",              "/nodes/{n}/time"),
    ("node/apt-repositories.json",  "/nodes/{n}/apt/repositories"),
    ("node/certificates.json",      "/nodes/{n}/certificates/info"),
    ("node/services.json",          "/nodes/{n}/services"),
    ("node/disks.json",             "/nodes/{n}/disks/list"),
    ("node/disks-zfs.json",         "/nodes/{n}/disks/zfs"),
    ("node/status.json",            "/nodes/{n}/status"),
]

# Config the PVE API simply does not expose. Named in the manifest so nobody
# mistakes an API snapshot for a restorable copy of /etc.
API_CANNOT_REACH = [
    "/etc/network/interfaces  (API gives structured JSON, not the raw file)",
    "/etc/fstab",
    "/etc/default/grub, /etc/kernel/",
    "/etc/modprobe.d/, /etc/modules, /etc/sysctl.d/",
    "/etc/lvm/lvm.conf, /etc/multipath.conf",
    "/etc/chrony/, /etc/zfs/",
    "/etc/crontab, /etc/cron.d/, /etc/postfix/",
    "/etc/vzdump.conf",
    "/etc/pve/priv/ and /etc/ssh/  (secrets -- never in an API snapshot)",
]


# Only included when the caller explicitly asks for secrets.
SECRET_PATHS = [
    "/etc/ceph",
    "/etc/ssh",
]

# Excluded from the paths above unless secrets are requested. These are
# tar --exclude patterns, matched against the archive member path.
SECRET_EXCLUDES = [
    "etc/pve/priv",
    "etc/pve/priv/*",
    "*.key",
    "*.keyring",
    "*shadow.cfg*",
]


def _actor(request) -> tuple[str, str, str]:
    """Who / from where / which request -- audit.write requires all three."""
    user = (request.get("user") or {}).get("username", "anonymous")
    ip = request.get("client_ip", "unknown")
    rid = request.get("request_id", "")
    return user, ip, rid


async def _audit(request, cid: str, node: str, action: str, result: str,
                 detail: str) -> None:
    user, ip, rid = _actor(request)
    await audit.write(user=user, source_ip=ip, request_id=rid, action=action,
                      cluster_id=cid, target=node, result=result,
                      params={"detail": detail})


def encrypt_openssl(data: bytes, passphrase: str, *, iters: int = 100_000) -> bytes:
    """AES-256-CBC in OpenSSL's own `enc` container format.

    Deliberately NOT a bespoke format. An operator who finds this file in two
    years must be able to open it without our tooling, so it decrypts with a
    stock command that is already on every PVE node:

        openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -md sha256 \
                -in NODE-config.tar.gz.enc -out NODE-config.tar.gz

    The salt is random per archive -- a fixed salt would let identical configs
    be recognised by their ciphertext, and the same passphrase across nodes
    would derive the same key every time.
    """
    from cryptography.hazmat.primitives import hashes, padding
    from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
    from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

    salt = os.urandom(8)
    material = PBKDF2HMAC(algorithm=hashes.SHA256(), length=48, salt=salt,
                          iterations=iters).derive(passphrase.encode("utf-8"))
    key, iv = material[:32], material[32:48]
    pad = padding.PKCS7(128).padder()
    body = pad.update(data) + pad.finalize()
    enc = Cipher(algorithms.AES(key), modes.CBC(iv)).encryptor()
    return b"Salted__" + salt + enc.update(body) + enc.finalize()


async def collect_via_api(cluster, node: str, *, include_report: bool) -> tuple[bytes, list[str]]:
    """Build the archive from PVE REST calls only. Returns (tar.gz, failed).

    No SSH, so this works on a node that has never seen our public key -- which
    on a fresh install is every node. The trade-off is fidelity: this is a
    semantic snapshot (JSON per endpoint) plus the handful of real files PVE
    serves verbatim, NOT a byte-for-byte copy of /etc. The manifest says so in
    as many words, because an archive that looks like a backup and is not one
    is worse than no archive.
    """
    client = cluster.client
    files: list[tuple[str, bytes]] = []
    failed: list[str] = []

    async def fetch(arc: str, api: str) -> None:
        try:
            data = await client._request("GET", api)
        except Exception as e:
            failed.append(f"{api}  ({type(e).__name__}: {e})")
            return
        files.append((arc, json.dumps(data, indent=2, ensure_ascii=False,
                                      sort_keys=True, default=str).encode()))

    for arc, api in CLUSTER_ENDPOINTS:
        await fetch(arc, api)
    for arc, api in NODE_ENDPOINTS:
        await fetch(arc, api.format(n=node))

    # /etc/hosts comes back as the real file body, not a structure.
    try:
        h = await client._request("GET", f"/nodes/{node}/hosts")
        body = h.get("data") if isinstance(h, dict) else None
        if body:
            files.append(("etc/hosts", str(body).encode()))
    except Exception as e:
        failed.append(f"/nodes/{node}/hosts  ({type(e).__name__}: {e})")

    # Guest configs -- the qemu-server / lxc .conf files, one per guest.
    for kind in ("qemu", "lxc"):
        try:
            guests = await client._request("GET", f"/nodes/{node}/{kind}")
        except Exception as e:
            failed.append(f"/nodes/{node}/{kind}  ({type(e).__name__}: {e})")
            continue
        for g in guests or []:
            vmid = g.get("vmid")
            if vmid is None:
                continue
            try:
                cfg = await client._request(
                    "GET", f"/nodes/{node}/{kind}/{vmid}/config")
            except Exception as e:
                failed.append(f"/nodes/{node}/{kind}/{vmid}/config  ({type(e).__name__})")
                continue
            files.append((f"guests/{kind}/{vmid}.json",
                          json.dumps(cfg, indent=2, ensure_ascii=False,
                                     sort_keys=True, default=str).encode()))

    if include_report:
        try:
            # pvereport SHELLS OUT on the node -- lscpu, df, pvesm status, a cat
            # of every guest config -- so it routinely runs past the client's
            # 10s default and the archive came back without the very thing the
            # operator ticked. Give it its own window.
            rep = await client._request(
                "GET", f"/nodes/{node}/report",
                timeout=aiohttp.ClientTimeout(total=REPORT_TIMEOUT))
            files.append(("system-report.txt",
                          (rep if isinstance(rep, str) else json.dumps(rep)).encode()))
        except Exception as e:
            failed.append(f"/nodes/{node}/report  ({type(e).__name__}: {e})")

    files.append(("MANIFEST.txt", _manifest(node, files, failed,
                                            include_report).encode()))
    return _targz(f"{_safe_node(node)}-config", files), failed


def _manifest(node: str, files, failed, include_report: bool) -> str:
    """State what this archive is -- and, more importantly, what it is not."""
    lines = [
        f"jt-proxense node configuration snapshot",
        f"node:      {node}",
        f"collected: via PVE REST API (no SSH)",
        "",
        "WHAT THIS IS",
        "  A semantic snapshot: one JSON document per API endpoint, plus the",
        "  few files PVE serves verbatim (/etc/hosts). Good for auditing,",
        "  diffing and rebuilding by hand.",
        "",
        "WHAT THIS IS NOT",
        "  A restorable copy of /etc. You cannot untar this over a fresh node.",
        "  The PVE API does not expose these at all, so they are ABSENT:",
    ]
    lines += [f"    - {x}" for x in API_CANNOT_REACH]
    lines += ["",
              "  For a byte-for-byte archive use the SSH collection mode, which",
              "  reads the real files off the node.", ""]
    if include_report:
        lines += [
            "SYSTEM REPORT INCLUDED",
            "  system-report.txt is PVE's own `pvereport` output. It embeds guest",
            "  configs INCLUDING their description/notes fields -- if anyone has",
            "  written credentials into a VM's notes, they are in this file in",
            "  plain text. Treat this archive as secret.", ""]
    lines += [f"CONTENTS ({len(files)} files)"]
    lines += [f"    {n}" for n, _ in sorted(files)]
    if failed:
        lines += ["", f"NOT COLLECTED ({len(failed)}) -- these endpoints errored:"]
        lines += [f"    {x}" for x in failed]
    return "\n".join(lines) + "\n"


def _targz(root: str, files) -> bytes:
    buf = io.BytesIO()
    # mtime is pinned so the same config produces the same bytes; a differing
    # checksum should mean the config changed, not that a second elapsed.
    with tarfile.open(fileobj=buf, mode="w:gz") as tf:
        for name, data in sorted(files):
            ti = tarfile.TarInfo(f"{root}/{name}")
            ti.size = len(data)
            ti.mtime = 0
            ti.mode = 0o600
            tf.addfile(ti, io.BytesIO(data))
    return buf.getvalue()


def _stamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")


def _safe_node(node: str) -> str:
    """Node names reach us from the URL and end up in a filename."""
    return re.sub(r"[^A-Za-z0-9._-]", "_", node or "node")[:64]


def build_command(include_secrets: bool) -> str:
    """The tar command run on the node.

    Built here rather than inline so a test can assert on the STRING it
    produces -- asserting on the source text is how a broken command layout
    got pinned in place once already (CLAUDE.md #15).
    """
    paths = list(PATHS)
    if include_secrets:
        paths += SECRET_PATHS
    args = ["tar", "czf", "-", "--ignore-failed-read", "--warning=no-file-changed"]
    if not include_secrets:
        for pat in SECRET_EXCLUDES:
            args += ["--exclude", pat]
    # Relative members (strip the leading /) so the archive unpacks into a
    # directory instead of over the extracting machine's own /etc.
    args += ["-C", "/"]
    args += [p.lstrip("/") for p in paths]
    return " ".join(shlex.quote(a) for a in args)


def parse_skipped(stderr: str) -> list[str]:
    """Pull the paths tar could not read out of its warnings.

    --ignore-failed-read means a missing or unreadable path is a warning on
    stderr and exit 0, so without this the caller cannot tell a complete
    archive from one missing /etc/pve.
    """
    out: list[str] = []
    for line in (stderr or "").splitlines():
        m = re.search(r"tar: (.+?): Cannot (?:open|stat|read)", line)
        if m:
            p = m.group(1).strip()
            if p not in out:
                out.append(p)
    return out


@role_required("admin")
async def download_node_config_handler(request: web.Request) -> web.Response:
    cluster_id = request.match_info["cluster_id"]
    node = request.match_info["node"]
    # POST, not GET: the passphrase must not travel in a URL, where it would
    # land in access logs, proxy caches and the browser's history.
    try:
        body = await request.json() if request.can_read_body else {}
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    # API is the default: it needs no SSH key on the node, so it works on a
    # node that has never been set up for it. SSH is the opt-in for people who
    # need the real files.
    mode = "ssh" if body.get("mode") == "ssh" else "api"
    include_secrets = bool(body.get("secrets")) and mode == "ssh"
    include_report = bool(body.get("report")) and mode == "api"
    passphrase = (body.get("passphrase") or "").strip()

    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)

    action = "node.config_backup_with_secrets" if include_secrets else "node.config_backup"

    if mode == "api":
        try:
            data, failed = await asyncio.wait_for(
                collect_via_api(cluster, node, include_report=include_report),
                timeout=COLLECT_TIMEOUT)
        except asyncio.TimeoutError:
            await _audit(request, cluster_id, node, action, "error",
                         "api collection timed out")
            return web.json_response({"error": "collect_timeout"}, status=504)
        except Exception as e:
            await _audit(request, cluster_id, node, action, "error",
                         f"api collection failed: {e}")
            return web.json_response(
                {"error": "collect_failed", "detail": f"{type(e).__name__}: {e}"},
                status=502)
        return await _respond(request, cluster_id, node, action, data, failed,
                              passphrase, include_secrets, include_report, mode)

    cmd = build_command(include_secrets)
    try:
        async with await ssh_util.connect_node(cluster, node) as conn:
            proc = await asyncio.wait_for(
                conn.run(cmd, check=False, encoding=None),
                timeout=COLLECT_TIMEOUT,
            )
    except asyncio.TimeoutError:
        await _audit(request, cluster_id, node, action, "error", "collection timed out")
        return web.json_response({"error": "collect_timeout"}, status=504)
    except ssh_util.SshUnavailable as e:
        await _audit(request, cluster_id, node, action, "error", f"ssh unavailable: {e}")
        return web.json_response({"error": "ssh_unavailable", "detail": str(e)},
                                 status=502)
    except Exception as e:
        # asyncssh raises PermissionDenied / HostKeyNotVerifiable / ConnectionLost
        # and none of them inherit SshUnavailable, so catching only that let a
        # missing pubkey escape as a 500 with a traceback body. The frontend
        # matches on this message to offer the SSH-setup helper, so it has to
        # come back as JSON -- and an unhandled 500 is a finding in its own
        # right (scripts/security-full.sh flags exactly this shape).
        await _audit(request, cluster_id, node, action, "error", f"ssh failed: {e}")
        return web.json_response(
            {"error": "ssh_failed", "detail": f"{type(e).__name__}: {e}"},
            status=502)

    data = proc.stdout or b""
    stderr = (proc.stderr or b"").decode("utf-8", "replace")

    # tar exits 2 on a fatal error even with --ignore-failed-read; 1 is the
    # "some files differ" warning class, which for a live /etc is expected.
    if proc.exit_status not in (0, 1) or not data:
        await _audit(request, cluster_id, node, action, "error", f"tar exit {proc.exit_status}: {stderr[:400]}")
        return web.json_response(
            {"error": "collect_failed", "exit_status": proc.exit_status,
             "detail": stderr[:1000]}, status=502)

    skipped = parse_skipped(stderr)
    return await _respond(request, cluster_id, node, action, data, skipped,
                          passphrase, include_secrets, False, mode)


async def _respond(request, cluster_id, node, action, data: bytes,
                   skipped: list, passphrase: str, include_secrets: bool,
                   include_report: bool, mode: str) -> web.Response:
    """One exit path for both collection modes, so the audit row, the filename
    and the partial-archive headers cannot drift apart between them."""
    if len(data) > MAX_BYTES:
        await _audit(request, cluster_id, node, action, "error",
                     f"archive too large: {len(data)} bytes")
        return web.json_response({"error": "archive_too_large",
                                  "bytes": len(data)}, status=507)

    name = f"{_safe_node(node)}-config-{_stamp()}.tar.gz"
    if passphrase:
        data = encrypt_openssl(data, passphrase)
        name += ".enc"

    await _audit(request, cluster_id, node, action, "ok",
                 f"mode={mode} {len(data)} bytes, {len(skipped)} not collected, "
                 f"encrypted={bool(passphrase)} report={include_report}")

    headers = {
        "Content-Disposition": f'attachment; filename="{name}"',
        # The browser cannot see tar's warnings or a failed API call, so the
        # partial-archive facts travel as headers the dialog reads back.
        "X-Config-Skipped-Count": str(len(skipped)),
        "X-Config-Secrets": "1" if include_secrets else "0",
        "X-Config-Encrypted": "1" if passphrase else "0",
        "X-Config-Mode": mode,
        "X-Config-Filename": name,
    }
    if skipped:
        # NOT comma-joined: these strings are API error messages and contain
        # commas of their own, so the dialog split one entry into five and
        # reported "5 paths could not be read" when two could not. Use a
        # separator that cannot occur in the payload.
        headers["X-Config-Skipped"] = "\x1f".join(skipped)[:3000]
    return web.Response(body=data, content_type="application/gzip", headers=headers)

ROUTES = [
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/config-backup",
     download_node_config_handler),
]
