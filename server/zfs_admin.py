"""ZFS pool lifecycle management — the operations PVE's own WebUI can create
but never maintain (it can build a pool and then abandons you to the CLI).

Everything here runs over SSH like host_upgrade / node_ntp / storage_download,
because PVE exposes no API for `zpool`. Passwordless root SSH to each node is
the documented precondition.

Routes:
  GET  /api/clusters/{cid}/nodes/{node}/zfs                       (viewer)
       → {pools: [...normalised topology...], disks: [...inventory...]}
  GET  /api/clusters/{cid}/nodes/{node}/zfs/pools/{pool}/consumers (viewer)
       → blast radius: pool → PVE storages → guests
  POST /api/clusters/{cid}/nodes/{node}/zfs/pools/{pool}/scrub     (admin)
  POST /api/clusters/{cid}/nodes/{node}/zfs/pools/{pool}/trim      (admin)
  POST /api/clusters/{cid}/nodes/{node}/zfs/pools/{pool}/replace   (admin)
  POST /api/clusters/{cid}/nodes/{node}/zfs/pools/{pool}/device    (admin)
  POST /api/clusters/{cid}/nodes/{node}/zfs/pools/{pool}/vdev      (admin)
  POST /api/clusters/{cid}/nodes/{node}/zfs/pools/{pool}/expand    (admin)
  POST /api/clusters/{cid}/nodes/{node}/zfs/pools                  (admin)
  GET  /api/clusters/{cid}/zfs/jobs           /  .../zfs/jobs/{id} (viewer)

Design notes that matter (learned the hard way — see the module tests):

* **`zpool status -j` JSON, never text.** OpenZFS 2.2+ emits JSON; the text
  layout mutates with resilver / spare / degraded states and parsing it is a
  guaranteed future breakage.
* **by-id only.** Every device argument must live under /dev/disk/by-id (or be
  a bare by-id name). `/dev/sdX` reorders across reboots — accepting it means
  one day resilvering the WRONG disk. Bare `/dev/sd*` is rejected outright.
* **ZFS's own dry-run is the preview.** `zpool create/add/remove` all support
  `-n`. We run the real command with `-n` first and surface ZFS's verdict
  (it catches mismatched replication levels, e.g. adding a 2-way mirror to a
  raidz2 pool, which is exactly the mistake a GUI invites). Only when the
  caller re-submits with confirm=true do we execute for real.
* **Boot disks are not data disks.** A PVE root pool sits on a *partition*
  (…-part3) beside an ESP (…-part2) managed by proxmox-boot-tool. A plain
  `zpool replace` there yields a pool that resilvers fine and a disk that
  cannot boot. We detect that case and run the partition-clone + ESP flow.
* **Long ops get a DB job row** (migration 009) so a resilver survives a
  daemon restart, mirroring the vm_export / host_upgrade pattern.

OWASP: A01 every mutating handler is admin-gated; A03 no shell interpolation
of caller data — every token is allow-list validated *and* shlex.quote'd;
A09 every mutation is audited (including refused pre-flight attempts).
"""
from __future__ import annotations

import asyncio
import functools
import json
import logging
import re
import shlex
import time

from aiohttp import web

from . import audit, db
from . import ssh_util
from .cluster_manager import cluster_manager
from .middleware import role_required

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------- validation

# Pool names: ZFS allows [A-Za-z0-9_.:-] and must start alphanumeric. We are
# stricter than ZFS on purpose — these end up in shell commands.
_POOL_RE = re.compile(r"^[A-Za-z][A-Za-z0-9_.:\-]{0,63}$")
# A by-id link name, optionally with a -partN suffix.
_BYID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.:+\-]{0,127}$")
_BYID_DIR = "/dev/disk/by-id/"

VDEV_LAYOUTS = ("stripe", "mirror", "raidz", "raidz2", "raidz3", "draid", "draid2", "draid3")
VDEV_CLASSES = ("data", "log", "cache", "special", "spare", "dedup")
# Layouts that carry no redundancy — refused for special/dedup unless forced,
# because losing a special vdev loses the whole pool.
_NO_REDUNDANCY = ("stripe",)

SSH_TIMEOUT = 30
LONG_TIMEOUT = 120
# asyncssh.connect() has no timeout of its own, so an unreachable node blocks
# until the OS gives up on the TCP handshake — minutes, during which an aiohttp
# handler and a browser request are both pinned. Bound it ourselves.
CONNECT_TIMEOUT = 12


class ZfsError(Exception):
    """Caller-visible failure with a stable machine code."""

    def __init__(self, code: str, detail: str = "", status: int = 400):
        super().__init__(detail or code)
        self.code = code
        self.detail = detail
        self.status = status


def _norm_pool(name: str) -> str:
    name = (name or "").strip()
    if not _POOL_RE.match(name):
        raise ZfsError("bad_pool_name", f"invalid pool name: {name[:64]!r}")
    return name


def _norm_device(dev: str) -> str:
    """Accept a by-id name or a full /dev/disk/by-id path; return the full path.

    Rejects /dev/sdX, /dev/nvmeXnY and anything else unstable. This is the
    single most important guard in this module: a wrong device here means a
    resilver onto a live disk.
    """
    dev = (dev or "").strip()
    if not dev:
        raise ZfsError("missing_device", "device is required")
    if dev.startswith(_BYID_DIR):
        leaf = dev[len(_BYID_DIR):]
    elif "/" not in dev:
        leaf = dev
    else:
        raise ZfsError(
            "unstable_device",
            f"refusing {dev!r}: only /dev/disk/by-id paths are accepted "
            "(kernel names like /dev/sdX reorder across reboots)")
    if not _BYID_RE.match(leaf) or "/" in leaf or ".." in leaf:
        raise ZfsError("bad_device", f"invalid device id: {dev[:96]!r}")
    return _BYID_DIR + leaf


def _norm_devices(raw, *, minimum: int = 1) -> list[str]:
    if not isinstance(raw, list):
        raise ZfsError("bad_devices", "devices must be a list")
    out = [_norm_device(d) for d in raw]
    if len(out) < minimum:
        raise ZfsError("too_few_devices", f"need at least {minimum} device(s)")
    if len(set(out)) != len(out):
        raise ZfsError("duplicate_devices", "the same device is listed twice")
    return out


def _min_devices(layout: str) -> int:
    return {"stripe": 1, "mirror": 2, "raidz": 3, "raidz2": 4, "raidz3": 5,
            "draid": 3, "draid2": 4, "draid3": 5}.get(layout, 1)


# ------------------------------------------------------------------- ssh glue

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
    try:
        return await ssh_util.connect(host, user, port, timeout=CONNECT_TIMEOUT)
    except ssh_util.SshTimeout as e:
        raise ZfsError("ssh_failed", str(e), status=502)


async def _run(cluster, node: str, cmd: str, *, timeout: int = SSH_TIMEOUT
               ) -> tuple[int, str, str]:
    """Run one command; return (exit_status, stdout, stderr).

    Never raises on a non-zero exit — zpool uses exit codes as information
    (notably `-n` dry runs that reject a layout), so callers inspect them.
    """
    try:
        async with await _connect(cluster, node) as conn:
            r = await conn.run(cmd, check=False, timeout=timeout)
            return int(r.exit_status or 0), (r.stdout or ""), (r.stderr or "")
    except ZfsError:
        raise                      # already precise (e.g. connect timeout)
    except Exception as e:          # auth failure / command timeout / transport
        raise ZfsError("ssh_failed", str(e), status=502)


def zfs_errors(handler):
    """Convert ZfsError into a clean JSON envelope.

    Without this, any handler that reaches SSH (i.e. every maintenance action)
    raises out of the coroutine on a node without passwordless root and aiohttp
    answers 500 with a traceback. Callers then cannot distinguish "you have not
    set up SSH" from "the pool is broken", and the UI's SSH-setup helper never
    fires because it keys off {"error": "ssh_failed"}.
    """
    @functools.wraps(handler)
    async def wrapped(request: web.Request):
        try:
            return await handler(request)
        except ZfsError as e:
            logger.info("zfs %s -> %s: %s", handler.__name__, e.code, e.detail[:200])
            return web.json_response(
                {"ok": False, "error": e.code, "detail": e.detail},
                status=e.status)
        except web.HTTPException:
            raise
        except Exception as e:  # never leak a stack trace to the browser
            logger.exception("zfs %s crashed", handler.__name__)
            return web.json_response(
                {"ok": False, "error": "internal", "detail": str(e)[:200]},
                status=500)
    return wrapped


# --------------------------------------------------------- topology parsing

def _size_to_bytes(v) -> int | None:
    """ZFS prints human sizes ('236G', '75.3G', '0B', '-'). Return bytes."""
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return int(v)
    s = str(v).strip()
    if not s or s == "-":
        return None
    mult = {"B": 1, "K": 1024, "M": 1024 ** 2, "G": 1024 ** 3,
            "T": 1024 ** 4, "P": 1024 ** 5, "E": 1024 ** 6}
    unit = s[-1].upper()
    if unit in mult:
        try:
            return int(float(s[:-1]) * mult[unit])
        except ValueError:
            return None
    try:
        return int(float(s))
    except ValueError:
        return None


def _int0(v) -> int:
    try:
        return int(str(v).replace(",", ""))
    except (TypeError, ValueError):
        return 0


def _leaf_byid(path: str | None, name: str) -> str | None:
    """The stable by-id leaf for a vdev, if it has one."""
    p = path or ""
    if p.startswith(_BYID_DIR):
        return p[len(_BYID_DIR):]
    if not p and _BYID_RE.match(name or ""):
        return name
    return None


def _raidz_level(vtype: str, name: str) -> tuple[str, int | None]:
    """Recover the parity level, which the JSON does NOT carry.

    `vdev_type` is a flat "raidz" for raidz1/2/3 alike and there is no
    `nparity` field — the level only survives in the vdev NAME ("raidz2-0").
    Reporting a raidz2 group as "parity 1" would understate its fault tolerance
    to an operator deciding whether it is safe to pull a disk, so derive it.
    """
    t = (vtype or "").lower()
    if not t.startswith(("raidz", "draid")):
        return vtype, None
    m = re.match(r"^(raidz|draid)(\d)?(?:-\d+)?$", (name or "").lower())
    if m and m.group(2):
        return f"{m.group(1)}{m.group(2)}", int(m.group(2))
    # A bare "raidz-0" / "draid-0" name means level 1.
    return f"{t}1" if t in ("raidz", "draid") else t, 1


def _walk_vdev(name: str, node: dict) -> dict:
    """Normalise one vdev node (recursively) from `zpool status -j`."""
    vtype = node.get("vdev_type") or "disk"
    path = node.get("path")
    level, parity = _raidz_level(vtype, name)
    out: dict = {
        "name": name,
        "type": vtype,
        # "raidz2" rather than the JSON's flat "raidz", plus the numeric parity
        # so the UI never has to re-derive (and mis-derive) it.
        "level": level,
        "parity": parity,
        "class": node.get("class") or "normal",
        "state": node.get("state") or "UNKNOWN",
        "guid": node.get("guid"),
        "path": path,
        "by_id": _leaf_byid(path, name),
        "size": _size_to_bytes(node.get("total_space")),
        "alloc": _size_to_bytes(node.get("alloc_space")),
        "read_errors": _int0(node.get("read_errors")),
        "write_errors": _int0(node.get("write_errors")),
        "cksum_errors": _int0(node.get("checksum_errors")),
        "slow_ios": _int0(node.get("slow_ios")),
        "note": node.get("vdev_stats_note") or node.get("comment") or None,
        # A partition-backed leaf means this is (almost always) a boot disk
        # layout: PVE puts the root pool on -part3 next to an ESP on -part2.
        "is_partition": bool(re.search(r"-part\d+$", (path or name or ""))),
        "children": [],
    }
    for cname, child in (node.get("vdevs") or {}).items():
        out["children"].append(_walk_vdev(cname, child))
    return out


# `zpool status -j` does NOT put auxiliary vdevs inside the root vdev tree with
# a distinguishing `class`; it hangs them off the POOL object under sibling
# keys. Verified against a real 2.4.2 pool (22-disk 2xraidz2 + special mirror +
# log mirror + cache + spare): pools.<name>.{special,logs,l2cache,spares}, each
# a dict-of-vdevs shaped exactly like `vdevs`. Assuming `class` alone would have
# silently rendered every special/log/cache/spare as missing.
_AUX_KEYS = (("special", "special"), ("logs", "log"),
             ("l2cache", "cache"), ("spares", "spare"), ("dedup", "dedup"))


def _classify(data_vdevs: list[dict], pool_obj: dict | None = None) -> dict:
    """Bucket top-level vdevs into data / log / cache / special / spare / dedup.

    `data_vdevs` are the children of the root vdev; auxiliary classes come from
    the pool-level sibling keys. We still honour a `class` on a data vdev as a
    fallback, in case a future ZFS release folds them back into the tree.
    """
    buckets: dict[str, list[dict]] = {
        "data": [], "log": [], "cache": [], "special": [], "spare": [], "dedup": []}
    for v in data_vdevs:
        cls = (v.get("class") or "normal").lower()
        vt = (v.get("type") or "").lower()
        if vt == "spare" or cls == "spare":
            buckets["spare"].append(v)
        elif cls in ("log", "slog"):
            buckets["log"].append(v)
        elif cls in ("cache", "l2arc", "l2cache"):
            buckets["cache"].append(v)
        elif cls == "special":
            buckets["special"].append(v)
        elif cls == "dedup":
            buckets["dedup"].append(v)
        else:
            buckets["data"].append(v)
    for json_key, bucket in _AUX_KEYS:
        for name, node in ((pool_obj or {}).get(json_key) or {}).items():
            buckets[bucket].append(_walk_vdev(name, node))
    return buckets


def _scan_progress(scan: dict | None) -> dict | None:
    """Normalise scan_stats into something a progress bar can use."""
    if not scan:
        return None
    total = _size_to_bytes(scan.get("to_examine"))
    done = _size_to_bytes(scan.get("examined"))
    pct = None
    if total and done is not None and total > 0:
        pct = round(min(100.0, done / total * 100.0), 2)
    return {
        "function": (scan.get("function") or "").upper() or None,   # SCRUB / RESILVER
        "state": (scan.get("state") or "").upper() or None,         # SCANNING / FINISHED
        "percent": pct,
        "examined": done,
        "total": total,
        "errors": _int0(scan.get("errors")),
        "start_time": scan.get("start_time"),
        "end_time": scan.get("end_time"),
    }


def parse_pools(status_json: str, list_json: str = "", *, root_pool: str | None = None
                ) -> list[dict]:
    """Turn `zpool status -j` (+ optional `zpool list -j`) into our shape.

    Pure function — the unit tests drive it from captured fixtures of a
    22-disk 2×raidz2 pool with special/log/cache/spare in ONLINE, DEGRADED
    and RESILVERING states.
    """
    try:
        status = json.loads(status_json) if status_json.strip() else {}
    except json.JSONDecodeError as e:
        raise ZfsError("zpool_json_parse", f"could not parse zpool status JSON: {e}",
                       status=502)
    listed: dict[str, dict] = {}
    if list_json.strip():
        try:
            for name, p in (json.loads(list_json).get("pools") or {}).items():
                listed[name] = p
        except (json.JSONDecodeError, AttributeError):
            pass

    pools: list[dict] = []
    for name, p in (status.get("pools") or {}).items():
        root = (p.get("vdevs") or {}).get(name) or {}
        top = [_walk_vdev(n, v) for n, v in (root.get("vdevs") or {}).items()]
        buckets = _classify(top, p)
        props = (listed.get(name) or {}).get("properties") or {}

        def prop(key):
            v = props.get(key)
            return v.get("value") if isinstance(v, dict) else v

        # A pool has raidz somewhere iff any top-level *data* vdev is raidz.
        # This decides two things the UI must warn about: top-level vdev
        # removal is impossible, and so is removing special/log later.
        has_raidz = any((v.get("type") or "").startswith(("raidz", "draid"))
                        for v in buckets["data"])
        pools.append({
            "name": name,
            "state": p.get("state") or "UNKNOWN",
            "guid": p.get("pool_guid"),
            "error_count": _int0(p.get("error_count")),
            "status_text": (p.get("status") or "").strip() or None,
            "action_text": (p.get("action") or "").strip() or None,
            "size": _size_to_bytes(root.get("total_space")) or _size_to_bytes(prop("size")),
            "alloc": _size_to_bytes(root.get("alloc_space")) or _size_to_bytes(prop("allocated")),
            "free": _size_to_bytes(prop("free")),
            "frag": prop("fragmentation"),
            "capacity": prop("capacity"),
            "dedup_ratio": prop("dedupratio"),
            "scan": _scan_progress(p.get("scan_stats")),
            "is_root_pool": (name == root_pool),
            "has_raidz": has_raidz,
            "removable_toplevel": not has_raidz,
            "vdevs": buckets,
            "vdev_count": sum(len(g) for g in buckets.values()),
        })
    pools.sort(key=lambda x: (not x["is_root_pool"], x["name"]))
    return pools


def _media_kind(kdev: str, tran: str | None, rota: bool, by_id: str | None) -> str:
    """hdd / ssd / nvme — the same three buckets PVE's own disk list uses.

    `rotational` alone cannot separate an NVMe from a SATA SSD, so key off the
    transport (lsblk TRAN) and fall back to the device / by-id naming.
    """
    t = (tran or "").lower()
    if t == "nvme" or kdev.startswith("nvme") or (by_id or "").startswith(("nvme-", "nvme.")):
        return "nvme"
    return "hdd" if rota else "ssd"


def parse_disks(lsblk_json: str, byid_ls: str, pools: list[dict],
                boot_esps: str = "") -> list[dict]:
    """Build the node disk inventory, annotated with ZFS membership.

    `byid_ls` is `ls -l /dev/disk/by-id` output; we prefer a human-meaningful
    alias (ata-/nvme-/scsi- with the serial in it) over `wwn-*`, and dedupe
    the multiple aliases every disk has.
    """
    # by-id leaf -> kernel name  (and reverse, best alias per kernel name)
    alias: dict[str, list[str]] = {}
    for line in (byid_ls or "").splitlines():
        m = re.search(r"\s(\S+)\s+->\s+\.\./\.\./(\S+)$", line)
        if not m:
            continue
        leaf, kdev = m.group(1), m.group(2)
        if re.search(r"-part\d+$", leaf):
            continue
        alias.setdefault(kdev, []).append(leaf)

    def best_alias(kdev: str) -> str | None:
        cands = alias.get(kdev) or []
        if not cands:
            return None
        # Prefer nvme-/ata-/scsi- (contain model+serial) over wwn-/eui.
        ranked = sorted(cands, key=lambda a: (
            a.startswith("wwn-") or a.startswith("nvme-eui"),
            len(a)))
        return ranked[0]

    # by-id (and partition parent) -> pool it belongs to
    member: dict[str, tuple[str, str]] = {}   # by_id_leaf -> (pool, state)

    def collect(v: dict, pool: str):
        if v.get("by_id"):
            leaf = re.sub(r"-part\d+$", "", v["by_id"])
            member[leaf] = (pool, v.get("state") or "")
        for c in v.get("children") or []:
            collect(c, pool)

    for p in pools:
        for group in (p.get("vdevs") or {}).values():
            for v in group:
                collect(v, p["name"])

    esp_devs = set()
    for line in (boot_esps or "").splitlines():
        m = re.match(r"\s*(\S+)\s", line)
        if m and m.group(1).startswith("/dev/"):
            esp_devs.add(re.sub(r"p?\d+$", "", m.group(1)))

    out: list[dict] = []
    try:
        blk = json.loads(lsblk_json).get("blockdevices") or []
    except (json.JSONDecodeError, AttributeError):
        blk = []
    for d in blk:
        if d.get("type") != "disk":
            continue
        kdev = d.get("name") or ""
        # lsblk reports ZFS zvols (zd0, zd16, …) as type=disk. Listing them as
        # available storage would let a wizard offer a volume that lives INSIDE
        # a pool as a member of a new pool — a pool within a pool. Same for
        # device-mapper, loop, MD and zram nodes: none are physical media.
        if re.match(r"^(zd\d|dm-|loop|md\d|zram|sr\d|fd\d)", kdev):
            continue
        by_id = best_alias(kdev)
        parts = d.get("children") or []
        pool_of = member.get(by_id or "", (None, ""))
        # "in use" = claimed by ZFS, mounted, or holding LVM/other members
        mounted = bool(d.get("mountpoint")) or any(c.get("mountpoint") for c in parts)
        out.append({
            "kernel": kdev,
            "dev": f"/dev/{kdev}",
            "by_id": by_id,
            "path": (_BYID_DIR + by_id) if by_id else None,
            "model": (d.get("model") or "").strip() or None,
            "serial": (d.get("serial") or "").strip() or None,
            "size": _int0(d.get("size")),
            "rotational": bool(d.get("rota")),
            "transport": (d.get("tran") or "").lower() or None,
            "kind": _media_kind(kdev, d.get("tran"), bool(d.get("rota")), by_id),
            "partitions": len(parts),
            "pool": pool_of[0],
            "pool_state": pool_of[1] or None,
            "mounted": mounted,
            "has_esp": f"/dev/{kdev}" in esp_devs,
            # Free = safe to offer in a wizard: no pool, no mounts, no partitions.
            "free": pool_of[0] is None and not mounted and not parts,
        })
    out.sort(key=lambda x: (x["pool"] or "~", x["kernel"]))
    return out



# --------------------------------------------------- PVE-API topology parsing
#
# The whole read path prefers the PVE API over SSH: /nodes/{n}/disks/zfs and
# /disks/zfs/{pool} give the pool list and the vdev tree, and /disks/list gives
# the inventory with PVE's own hdd/ssd/nvme classification and a by_id_link.
# That means the topology view works on a stock cluster with NO passwordless
# SSH configured — SSH is only needed for the operations PVE has no API for
# (replace, add vdev, log/cache/special, scrub, trim, raidz expand).
#
# The API tree differs from `zpool status -j`: children are a LIST, leaves are
# flagged `leaf:1`, auxiliary classes arrive as sibling group nodes named
# special / logs / cache / spares, there are no per-vdev sizes, and `scan` is
# free text rather than structured counters.

_API_GROUP = {"special": "special", "logs": "log", "log": "log",
              "cache": "cache", "l2cache": "cache",
              "spares": "spare", "spare": "spare", "dedup": "dedup"}


def _api_walk(node: dict, klass: str = "normal") -> dict:
    name = node.get("name") or ""
    is_leaf = bool(node.get("leaf"))
    vtype = "disk" if is_leaf else _api_vdev_type(name)
    level, parity = _raidz_level(vtype, name)
    path = name if name.startswith(("/dev/", "/")) else None
    out = {
        "name": name,
        "type": vtype,
        "level": level,
        "parity": parity,
        "class": klass,
        "state": node.get("state") or "UNKNOWN",
        "guid": None,
        "path": path,
        "by_id": _leaf_byid(path, name),
        # The API carries no per-vdev capacity; the UI treats None as "unknown"
        # and simply omits the allocation bar rather than drawing a fake 0%.
        "size": None,
        "alloc": None,
        "read_errors": _int0(node.get("read")),
        "write_errors": _int0(node.get("write")),
        "cksum_errors": _int0(node.get("cksum")),
        "slow_ios": 0,
        "note": (node.get("msg") or "").strip() or None,
        "is_partition": bool(re.search(r"-part\d+$", path or name or "")),
        "children": [_api_walk(c, klass) for c in (node.get("children") or [])],
    }
    return out


def _api_vdev_type(name: str) -> str:
    m = re.match(r"^(raidz[123]?|draid[123]?|mirror|spare|replacing|logs?|cache|special)",
                 (name or "").lower())
    if not m:
        return "disk"
    t = m.group(1)
    return "raidz" if t.startswith("raidz") else "draid" if t.startswith("draid") else t


_SCAN_PCT = re.compile(r"([\d.]+)\s*%\s*done")


def _api_scan(text: str | None) -> dict | None:
    """Best-effort structuring of PVE's free-text scan line.

    Examples seen in the wild:
      "scrub repaired 0B in 00:13:58 with 0 errors on Sun Jul 12 00:38:00 2026"
      "scrub in progress since ...  1.2G scanned ... 3.40% done ..."
      "resilver in progress since ... 12.5% done ..."
    """
    t = (text or "").strip()
    if not t:
        return None
    low = t.lower()
    func = "RESILVER" if "resilver" in low else "SCRUB" if "scrub" in low else None
    running = "in progress" in low
    m = _SCAN_PCT.search(t)
    pct = float(m.group(1)) if m else (100.0 if not running and func else None)
    errs = 0
    me = re.search(r"with (\d+) errors", t)
    if me:
        errs = int(me.group(1))
    return {
        "function": func,
        "state": "SCANNING" if running else ("FINISHED" if func else None),
        "percent": pct,
        "examined": None,
        "total": None,
        "errors": errs,
        "start_time": None,
        "end_time": None,
        "text": t,
    }


def parse_pools_api(listing: list, details: dict[str, dict],
                    *, root_pool: str | None = None) -> list[dict]:
    """Normalise the PVE API's pool list + per-pool detail into OUR shape,
    identical to what parse_pools() produces from `zpool status -j`, so the
    frontend never has to care which source was available."""
    pools: list[dict] = []
    for entry in listing or []:
        name = entry.get("name")
        if not name:
            continue
        det = details.get(name) or {}
        buckets: dict[str, list[dict]] = {
            "data": [], "log": [], "cache": [], "special": [], "spare": [], "dedup": []}
        for child in (det.get("children") or []):
            cname = (child.get("name") or "").lower()
            grp = _API_GROUP.get(cname)
            if grp:
                for gc in (child.get("children") or []):
                    buckets[grp].append(_api_walk(gc, grp))
            elif cname == name.lower():
                # the pool-named node holds the data vdevs
                for gc in (child.get("children") or []):
                    buckets["data"].append(_api_walk(gc))
            else:
                buckets["data"].append(_api_walk(child))
        has_raidz = any((v.get("type") or "").startswith(("raidz", "draid"))
                        for v in buckets["data"])
        size = _int0(entry.get("size")) or None
        alloc = _int0(entry.get("alloc")) or None
        frag = entry.get("frag")
        pools.append({
            "name": name,
            "state": det.get("state") or entry.get("health") or "UNKNOWN",
            "guid": None,
            "error_count": 0 if (det.get("errors") or "").lower().startswith(
                "no known data errors") else 0,
            "status_text": (det.get("status") or "").strip() or None,
            "action_text": (det.get("action") or "").strip() or None,
            "size": size,
            "alloc": alloc,
            "free": _int0(entry.get("free")) or None,
            "frag": f"{frag}%" if isinstance(frag, (int, float)) else frag,
            "capacity": (f"{round(alloc / size * 100)}%" if size and alloc else None),
            "dedup_ratio": entry.get("dedup"),
            "scan": _api_scan(det.get("scan")),
            "is_root_pool": (name == root_pool),
            "has_raidz": has_raidz,
            "removable_toplevel": not has_raidz,
            "vdevs": buckets,
            "vdev_count": sum(len(g) for g in buckets.values()),
            "errors_text": (det.get("errors") or "").strip() or None,
            "source": "api",
        })
    pools.sort(key=lambda x: (not x["is_root_pool"], x["name"]))
    return pools


def parse_disks_api(pve_disks: list, pools: list[dict]) -> list[dict]:
    """Inventory from `/nodes/{n}/disks/list`.

    PVE already classifies media as hdd / ssd / nvme and hands back a
    `by_id_link`, so this needs no SSH and no lsblk parsing. `used` tells us
    what has claimed the disk ("ZFS", "zfs_member", "LVM", "partitions", ...).
    """
    member: dict[str, str] = {}

    def collect(v: dict, pool: str):
        if v.get("by_id"):
            member[re.sub(r"-part\d+$", "", v["by_id"])] = pool
        for c in v.get("children") or []:
            collect(c, pool)

    for p in pools:
        for group in (p.get("vdevs") or {}).values():
            for v in group:
                collect(v, p["name"])

    out: list[dict] = []
    for d in pve_disks or []:
        dev = d.get("devpath") or ""
        kdev = dev.rsplit("/", 1)[-1]
        if re.match(r"^(zd\d|dm-|loop|md\d|zram|sr\d|fd\d)", kdev):
            continue
        link = d.get("by_id_link") or ""
        by_id = link[len(_BYID_DIR):] if link.startswith(_BYID_DIR) else (link or None)
        used = (d.get("used") or "").strip()
        pool = member.get(by_id or "")
        kind = (d.get("type") or "").lower()
        if kind not in ("hdd", "ssd", "nvme"):
            kind = _media_kind(kdev, None, bool(d.get("rpm")), by_id)
        out.append({
            "kernel": kdev,
            "dev": dev,
            "by_id": by_id,
            "path": link or None,
            "model": (d.get("model") or "").strip() or None,
            "serial": (d.get("serial") or "").strip() or None,
            "size": _int0(d.get("size")),
            "rotational": bool(_int0(d.get("rpm"))),
            "transport": None,
            "kind": kind,
            "partitions": 0,
            "pool": pool,
            "pool_state": None,
            "mounted": bool(used) and used.lower() not in ("", "unused"),
            "has_esp": False,
            "health": d.get("health"),
            "wearout": d.get("wearout"),
            "used_by": used or None,
            # Only an untouched disk is safe to offer in a wizard.
            "free": pool is None and (not used or used.lower() in ("", "unused")),
        })
    out.sort(key=lambda x: (x["pool"] or "~", x["kernel"]))
    return out


# ------------------------------------------------------------- read handlers

_READ_CMD = (
    "zpool status -j 2>/dev/null; echo '===LIST==='; "
    "zpool list -j 2>/dev/null; echo '===LSBLK==='; "
    "lsblk -J -b -o NAME,TYPE,SIZE,MODEL,SERIAL,ROTA,TRAN,MOUNTPOINT 2>/dev/null; "
    "echo '===BYID==='; ls -l /dev/disk/by-id/ 2>/dev/null; "
    "echo '===ROOT==='; findmnt -no SOURCE / 2>/dev/null; "
    "echo '===ESP==='; proxmox-boot-tool status --quiet 2>/dev/null || true"
)


def _split(out: str) -> dict[str, str]:
    keys = ["LIST", "LSBLK", "BYID", "ROOT", "ESP"]
    parts = {"STATUS": out}
    cur = "STATUS"
    buf: dict[str, list[str]] = {"STATUS": []}
    for line in out.splitlines():
        hit = next((k for k in keys if line.strip() == f"==={k}==="), None)
        if hit:
            cur = hit
            buf[cur] = []
            continue
        buf.setdefault(cur, []).append(line)
    return {k: "\n".join(v) for k, v in buf.items()}


@role_required("viewer")
@zfs_errors
async def zfs_get_handler(request: web.Request) -> web.Response:
    """Pool topology + disk inventory.

    READ-ONLY and API-FIRST: PVE exposes /disks/zfs, /disks/zfs/{pool} and
    /disks/list, so the topology view needs no passwordless SSH and performs no
    writes of any kind on the node. SSH is only consulted when the caller opts
    in with ?enrich=ssh, purely to add per-vdev capacity, slow-I/O counts and a
    structured scan percentage that the API does not carry.
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)

    listing = await cluster.client.zfs_list(node)
    details: dict[str, dict] = {}
    for entry in listing or []:
        nm = entry.get("name")
        if nm:
            details[nm] = await cluster.client.zfs_detail(node, nm)
    # The node's own root pool, so the UI can flag boot-disk layouts.
    root_pool = None
    for nm, det in details.items():
        if any(re.search(r"-part\d+$", (c.get("name") or ""))
               for c in _flatten_api(det)):
            root_pool = root_pool or nm
    pools = parse_pools_api(listing, details, root_pool=root_pool)
    pve_disks = await cluster.client.list_node_disks(node)
    disks = parse_disks_api(pve_disks, pools)

    payload = {"ok": True, "zfs_available": bool(listing) or bool(pve_disks),
               "pools": pools, "disks": disks, "root_pool": root_pool,
               "source": "api", "ssh_enriched": False}

    if request.query.get("enrich") == "ssh" and pools:
        try:
            rc, out, _ = await _run(cluster, node, _READ_CMD)
            sec = _split(out)
            if (sec.get("STATUS") or "").strip():
                rsrc = (sec.get("ROOT") or "").strip().splitlines()
                rp = rsrc[0].split("/")[0] if rsrc else root_pool
                ssh_pools = parse_pools(sec.get("STATUS", ""), sec.get("LIST", ""),
                                        root_pool=rp)
                if ssh_pools:
                    payload.update({"pools": ssh_pools, "root_pool": rp,
                                    "source": "ssh", "ssh_enriched": True})
                    payload["disks"] = parse_disks(
                        sec.get("LSBLK", ""), sec.get("BYID", ""), ssh_pools,
                        sec.get("ESP", "")) or disks
        except ZfsError as e:
            # Enrichment is strictly optional — never fail the read because SSH
            # is not set up. Surface it so the UI can offer the SSH helper.
            payload["ssh_error"] = e.code
            payload["ssh_detail"] = e.detail[:200]
    return web.json_response(payload)


def _flatten_api(det: dict) -> list[dict]:
    out: list[dict] = []

    def walk(n: dict):
        out.append(n)
        for c in (n.get("children") or []):
            walk(c)

    for c in (det.get("children") or []):
        walk(c)
    return out


@role_required("viewer")
@zfs_errors
async def consumers_handler(request: web.Request) -> web.Response:
    """Blast radius: which PVE storages sit on this pool, and which guests use them.

    Answers the question every operator asks before touching a disk: "if this
    pool dies, what dies with it?"
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    pool = request.match_info["pool"]
    cluster = _require_cluster(cid)
    try:
        pool = _norm_pool(pool)
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)

    # Which storage.cfg entries map onto this pool?
    storages: list[dict] = []
    try:
        cfg = await cluster.client.get_storage_config()
    except Exception:
        cfg = []
    for s in cfg or []:
        stype = s.get("type")
        target = None
        if stype == "zfspool":
            target = (s.get("pool") or "").split("/")[0]
        elif stype == "dir":
            # a dir storage living inside the pool's mountpoint
            m = re.match(rf"^/{re.escape(pool)}(/|$)", s.get("path") or "")
            target = pool if m else None
        if target == pool:
            storages.append({"storage": s.get("storage"), "type": stype,
                             "content": s.get("content"),
                             "nodes": s.get("nodes")})
    names = {s["storage"] for s in storages if s.get("storage")}

    # Which guests have a disk on those storages (on this node)?
    guests: list[dict] = []
    cache = getattr(cluster, "cache", None)
    vms = (getattr(cache, "vms", None) or {}) if cache else {}
    for v in (vms.values() if isinstance(vms, dict) else vms) or []:
        if not isinstance(v, dict):
            continue
        if v.get("node") != node:
            continue
        hit = [d for d in (v.get("disks") or [])
               if (d.get("storage") in names)]
        if hit:
            guests.append({"vmid": v.get("vmid"), "name": v.get("name"),
                           "type": v.get("type"), "status": v.get("status"),
                           "disks": [d.get("storage") for d in hit]})
    guests.sort(key=lambda g: (g.get("vmid") or 0))
    return web.json_response({"ok": True, "pool": pool, "node": node,
                              "storages": storages, "guests": guests,
                              "guest_count": len(guests)})


# ------------------------------------------------------------------- job rows

_JOB_TASKS: set = set()


def _now() -> int:
    return int(time.time())


async def _job_create(cid: str, node: str, pool: str, kind: str, actor: str,
                      command: str, detail: dict | None = None) -> int:
    async with db.connect() as c:
        cur = await c.execute(
            "INSERT INTO zfs_jobs (cluster_id, node, pool, kind, status, "
            "created_by, created_at, command, detail_json) "
            "VALUES (?,?,?,?,'running',?,?,?,?)",
            (cid, node, pool, kind, actor, _now(), command,
             json.dumps(detail or {})))
        await c.commit()
        return int(cur.lastrowid)


async def _job_finish(job_id: int, status: str, detail: dict | None = None) -> None:
    async with db.connect() as c:
        if detail is None:
            await c.execute(
                "UPDATE zfs_jobs SET status=?, finished_at=? WHERE id=?",
                (status, _now(), job_id))
        else:
            await c.execute(
                "UPDATE zfs_jobs SET status=?, finished_at=?, detail_json=? WHERE id=?",
                (status, _now(), json.dumps(detail), job_id))
        await c.commit()


async def _watch_scan(cluster, cid: str, node: str, pool: str, job_id: int) -> None:
    """Poll a resilver/scrub to completion so the job row reflects reality even
    if every browser is closed. Bounded so a stuck scan can't leak a task."""
    deadline = _now() + 14 * 24 * 3600
    try:
        while _now() < deadline:
            await asyncio.sleep(20)
            try:
                rc, out, _ = await _run(cluster, node,
                                        f"zpool status -j {shlex.quote(pool)}")
                pools = parse_pools(out, root_pool=None)
            except ZfsError:
                continue
            p = next((x for x in pools if x["name"] == pool), None)
            if not p:
                await _job_finish(job_id, "failed", {"error": "pool_vanished"})
                return
            scan = p.get("scan") or {}
            if (scan.get("state") or "") in ("FINISHED", "CANCELED", ""):
                ok = p["state"] in ("ONLINE",) and not p["error_count"]
                await _job_finish(job_id, "done" if ok else "warning",
                                  {"pool_state": p["state"],
                                   "errors": p["error_count"],
                                   "scan": scan})
                return
            async with db.connect() as c:
                await c.execute(
                    "UPDATE zfs_jobs SET progress=?, detail_json=? WHERE id=?",
                    (scan.get("percent") or 0, json.dumps({"scan": scan}), job_id))
                await c.commit()
        await _job_finish(job_id, "warning", {"error": "watch_timeout"})
    except asyncio.CancelledError:
        raise
    except Exception as e:  # never let the watcher kill the loop
        logger.warning("zfs job %s watcher failed: %s", job_id, e)
        await _job_finish(job_id, "warning", {"error": str(e)[:200]})


def _spawn_watch(cluster, cid: str, node: str, pool: str, job_id: int) -> None:
    t = asyncio.create_task(_watch_scan(cluster, cid, node, pool, job_id))
    _JOB_TASKS.add(t)
    t.add_done_callback(_JOB_TASKS.discard)


async def mark_orphans_on_startup() -> None:
    """A resilver we were watching outlives us; the pool keeps going but our
    watcher didn't. Mark those rows for human review rather than pretending."""
    try:
        async with db.connect() as c:
            cur = await c.execute(
                "SELECT COUNT(*) AS n FROM zfs_jobs WHERE status='running'")
            row = await cur.fetchone()
            n = int((row and row["n"]) or 0)
            if n:
                await c.execute(
                    "UPDATE zfs_jobs SET status='orphaned', finished_at=?, "
                    "detail_json=json_patch(COALESCE(detail_json,'{}'), "
                    "'{\"note\":\"daemon restarted while running; check zpool status\"}') "
                    "WHERE status='running'", (_now(),))
                await c.commit()
                logger.info("zfs_admin: marked %d in-flight job(s) orphaned", n)
    except Exception as e:
        logger.warning("zfs_admin: orphan sweep failed: %s", e)


# ------------------------------------------------------------ mutation glue

def _actor(request) -> tuple[str, str, str]:
    user = (request.get("user") or {}).get("username", "anonymous")
    ip = request.get("client_ip", "unknown")
    rid = request.get("request_id", "")
    return user, ip, rid


async def _audit(request, action: str, cid: str, target: str, result: str,
                 params: dict) -> None:
    user, ip, rid = _actor(request)
    await audit.write(user=user, source_ip=ip, request_id=rid, action=action,
                      cluster_id=cid, target=target, result=result, params=params)


async def _body(request) -> dict:
    try:
        b = await request.json()
    except Exception:
        b = {}
    return b if isinstance(b, dict) else {}


async def _dry_then_run(cluster, node: str, cid: str, pool: str, request,
                        *, action: str, argv: list[str], confirm: bool,
                        force: bool, dry_flag: str = "-n",
                        params: dict) -> web.Response:
    """Run ZFS's own dry-run, then (only if confirmed) the real thing.

    The dry run is the preview: ZFS itself rejects mismatched redundancy and
    tells us why, which is far more trustworthy than us re-implementing its
    rules. `force` maps to -f and is only ever set by an explicit UI opt-in.
    """
    base = list(argv)
    if force:
        base.insert(1, "-f")
    dry = " ".join(shlex.quote(x) for x in
                   [base[0], dry_flag] + base[1:])
    rc, out, err = await _run(cluster, node, dry, timeout=LONG_TIMEOUT)
    preview = ((out or "") + ("\n" + err if err else "")).strip()
    if rc != 0:
        # ZFS refused the layout. Surface verbatim; the UI offers "force".
        await _audit(request, action, cid, f"{node}/{pool}", "refused_by_zfs",
                     {**params, "preview": preview[:400]})
        return web.json_response({"ok": False, "error": "zfs_refused",
                                  "preview": preview,
                                  "forceable": "use '-f'" in preview},
                                 status=409)
    if not confirm:
        return web.json_response({"ok": True, "dry_run": True, "preview": preview,
                                  "command": " ".join(shlex.quote(x) for x in base)})
    real = " ".join(shlex.quote(x) for x in base)
    rc, out, err = await _run(cluster, node, real, timeout=LONG_TIMEOUT)
    detail = ((out or "") + ("\n" + err if err else "")).strip()
    await _audit(request, action, cid, f"{node}/{pool}",
                 "ok" if rc == 0 else f"error: {detail[:160]}",
                 {**params, "command": real})
    if rc != 0:
        return web.json_response({"ok": False, "error": "zpool_failed",
                                  "detail": detail}, status=502)
    return web.json_response({"ok": True, "detail": detail or None,
                              "command": real})


# --------------------------------------------------------- scrub / trim

@role_required("admin")
@zfs_errors
async def scrub_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(request.match_info["pool"])
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)
    act = (body.get("action") or "start").lower()
    flag = {"start": "", "stop": "-s", "pause": "-p"}.get(act)
    if flag is None:
        return web.json_response({"error": "bad_action"}, status=400)
    if act == "start" and not body.get("force"):
        busy = await _scan_in_flight(cluster, node, pool)
        if busy:
            return web.json_response(
                {"ok": False, "error": "scan_already_running",
                 "detail": f"{busy.get('function') or 'a scan'} is already running "
                           f"({busy.get('percent')}% done). Starting another now "
                           "would compete for the same disks.",
                 "scan": busy, "forceable": True}, status=409)
    cmd = " ".join(x for x in ["zpool", "scrub", flag, shlex.quote(pool)] if x)
    rc, out, err = await _run(cluster, node, cmd)
    detail = ((out or "") + ("\n" + err if err else "")).strip()
    await _audit(request, "zfs.scrub", cid, f"{node}/{pool}",
                 "ok" if rc == 0 else f"error: {detail[:160]}", {"action": act})
    if rc != 0:
        return web.json_response({"ok": False, "error": "zpool_failed",
                                  "detail": detail}, status=502)
    job_id = None
    if act == "start":
        user, _, _ = _actor(request)
        job_id = await _job_create(cid, node, pool, "scrub", user, cmd)
        _spawn_watch(cluster, cid, node, pool, job_id)
    return web.json_response({"ok": True, "job_id": job_id, "detail": detail or None})


@role_required("admin")
@zfs_errors
async def trim_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(request.match_info["pool"])
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)
    act = (body.get("action") or "start").lower()
    flag = {"start": "", "stop": "-c", "suspend": "-s"}.get(act)
    if flag is None:
        return web.json_response({"error": "bad_action"}, status=400)
    cmd = " ".join(x for x in ["zpool", "trim", flag, shlex.quote(pool)] if x)
    rc, out, err = await _run(cluster, node, cmd, timeout=LONG_TIMEOUT)
    detail = ((out or "") + ("\n" + err if err else "")).strip()
    await _audit(request, "zfs.trim", cid, f"{node}/{pool}",
                 "ok" if rc == 0 else f"error: {detail[:160]}", {"action": act})
    if rc != 0:
        return web.json_response({"ok": False, "error": "zpool_failed",
                                  "detail": detail}, status=502)
    return web.json_response({"ok": True, "detail": detail or None})


# ------------------------------------------------------------------- replace

async def _scan_in_flight(cluster, node: str, pool: str) -> dict | None:
    """Return the running scan (scrub/resilver) for this pool, if any.

    Stacking a scrub on top of a live resilver competes for the very disks the
    pool is trying to rebuild onto — it slows the rebuild and lengthens the
    window in which a second failure is fatal. Callers refuse unless forced.
    """
    try:
        rc, out, _ = await _run(cluster, node, f"zpool status -j {shlex.quote(pool)}")
        for p in parse_pools(out):
            if p["name"] != pool:
                continue
            scan = p.get("scan") or {}
            if (scan.get("state") or "").upper() in ("SCANNING", "ACTIVE"):
                return scan
    except ZfsError:
        return None   # cannot tell -> do not block the operator
    return None


async def _find_vdev(cluster, node: str, pool: str, want: str) -> dict | None:
    rc, out, _ = await _run(cluster, node, f"zpool status -j {shlex.quote(pool)}")
    pools = parse_pools(out)
    p = next((x for x in pools if x["name"] == pool), None)
    if not p:
        return None
    target = re.sub(r"^" + re.escape(_BYID_DIR), "", want)

    def hunt(v: dict) -> dict | None:
        cand = {v.get("name") or "", v.get("by_id") or "",
                (v.get("path") or "").replace(_BYID_DIR, "")}
        if target in cand or re.sub(r"-part\d+$", "", v.get("by_id") or "") == target:
            return v
        for c in v.get("children") or []:
            r = hunt(c)
            if r:
                return r
        return None

    for group in (p.get("vdevs") or {}).values():
        for v in group:
            r = hunt(v)
            if r:
                return r
    return None


@role_required("admin")
@zfs_errors
async def replace_handler(request: web.Request) -> web.Response:
    """Replace a failing device.

    Two very different flows:
      * data disk  → `zpool replace pool old new`
      * boot disk  → clone the partition table, randomise GUIDs, replace the
        ZFS *partition*, then format+init the ESP with proxmox-boot-tool.
        Skipping the ESP work yields a pool that resilvers perfectly and a
        machine that cannot boot from the new disk — a trap we refuse to set.
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(request.match_info["pool"])
        old = _norm_device(body.get("old") or "")
        new = _norm_device(body.get("new") or "")
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)
    if old == new:
        return web.json_response({"error": "same_device"}, status=400)
    confirm = bool(body.get("confirm"))
    force = bool(body.get("force"))

    # Pre-flight: the old device must actually be in this pool, and the new
    # one must not be in ANY pool / carry a filesystem.
    try:
        vd = await _find_vdev(cluster, node, pool, old)
    except ZfsError as e:
        return web.json_response({"ok": False, "error": e.code, "detail": e.detail},
                                 status=e.status)
    if vd is None:
        return web.json_response({"ok": False, "error": "old_not_in_pool",
                                  "detail": f"{old} is not a member of {pool}"},
                                 status=400)
    rc, out, _ = await _run(
        cluster, node,
        f"lsblk -no NAME,FSTYPE,MOUNTPOINT {shlex.quote(new)} 2>&1; echo '---'; "
        f"zpool labelclear -n {shlex.quote(new)} 2>&1 || true")
    busy = [ln for ln in (out or "").splitlines()
            if re.search(r"(zfs_member|LVM2_member|_raid_member|/)", ln)]
    if busy and not force:
        return web.json_response(
            {"ok": False, "error": "target_in_use",
             "detail": "the replacement device already carries data:\n" +
                       "\n".join(busy[:6]),
             "forceable": True}, status=409)

    # Size pre-flight. ZFS refuses a smaller device, but it does so *after* the
    # operator has confirmed a destructive-looking action, so check first and
    # say why in plain terms.
    old_sz = vd.get("size")
    if old_sz:
        rc2, out2, _ = await _run(
            cluster, node, f"blockdev --getsize64 {shlex.quote(new)} 2>/dev/null || echo 0")
        try:
            new_sz = int((out2 or "0").strip().splitlines()[0])
        except (ValueError, IndexError):
            new_sz = 0
        if new_sz and new_sz < old_sz and not force:
            return web.json_response(
                {"ok": False, "error": "replacement_too_small",
                 "detail": f"the replacement holds {new_sz} bytes but the member "
                           f"it takes over is {old_sz}; ZFS will refuse this",
                 "forceable": False}, status=409)

    is_boot = bool(vd.get("is_partition"))
    plan: list[str] = []
    if is_boot:
        # part3 = ZFS, part2 = ESP under PVE's default layout. Derive the
        # partition suffix from the CURRENT member rather than assuming.
        m = re.search(r"-part(\d+)$", vd.get("by_id") or vd.get("path") or "")
        zpart = m.group(1) if m else "3"
        old_disk = re.sub(r"-part\d+$", "", vd.get("by_id") or "")
        plan = [
            f"sgdisk --replicate={shlex.quote(new)} {shlex.quote(_BYID_DIR + old_disk)}",
            f"sgdisk --randomize-guids {shlex.quote(new)}",
            f"partprobe {shlex.quote(new)} 2>/dev/null || udevadm settle",
            f"zpool replace {'-f ' if force else ''}{shlex.quote(pool)} "
            f"{shlex.quote(vd.get('path') or old)} {shlex.quote(new)}-part{zpart}",
            f"proxmox-boot-tool format {shlex.quote(new)}-part2 --force",
            f"proxmox-boot-tool init {shlex.quote(new)}-part2",
        ]
    else:
        plan = [f"zpool replace {'-f ' if force else ''}{shlex.quote(pool)} "
                f"{shlex.quote(vd.get('path') or old)} {shlex.quote(new)}"]

    if not confirm:
        return web.json_response({
            "ok": True, "dry_run": True, "boot_disk": is_boot,
            "plan": plan,
            "target": {"name": vd.get("name"), "state": vd.get("state"),
                       "by_id": vd.get("by_id"), "is_partition": is_boot},
            "warning": ("This is a BOOT disk (root pool on a partition). The "
                        "ESP must be cloned too or the replacement cannot boot."
                        if is_boot else None),
        })

    user, _, _ = _actor(request)
    script = " && ".join(plan)
    job_id = await _job_create(cid, node, pool, "replace", user, script,
                               {"old": old, "new": new, "boot_disk": is_boot})
    rc, out, err = await _run(cluster, node, script, timeout=LONG_TIMEOUT)
    detail = ((out or "") + ("\n" + err if err else "")).strip()
    await _audit(request, "zfs.replace", cid, f"{node}/{pool}",
                 "ok" if rc == 0 else f"error: {detail[:160]}",
                 {"old": old, "new": new, "boot_disk": is_boot, "job_id": job_id})
    if rc != 0:
        await _job_finish(job_id, "failed", {"error": detail[:400]})
        return web.json_response({"ok": False, "error": "replace_failed",
                                  "detail": detail, "job_id": job_id}, status=502)
    _spawn_watch(cluster, cid, node, pool, job_id)
    return web.json_response({"ok": True, "job_id": job_id, "boot_disk": is_boot,
                              "detail": detail or None})


# -------------------------------------------------- per-device operations

@role_required("admin")
@zfs_errors
async def device_handler(request: web.Request) -> web.Response:
    """offline / online / clear / detach / attach / remove one device."""
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(request.match_info["pool"])
        act = (body.get("action") or "").lower()
        if act not in ("offline", "online", "clear", "detach", "attach", "remove"):
            raise ZfsError("bad_action", f"unsupported action: {act[:24]!r}")
        dev = _norm_device(body.get("device") or "")
        new_dev = _norm_device(body.get("new_device")) if act == "attach" else None
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)
    confirm = bool(body.get("confirm"))

    # Resolve to the exact member string ZFS knows (may be a -partN).
    try:
        vd = await _find_vdev(cluster, node, pool, dev)
    except ZfsError as e:
        return web.json_response({"ok": False, "error": e.code, "detail": e.detail},
                                 status=e.status)
    member = (vd.get("path") or vd.get("name")) if vd else dev
    if vd is None and act != "attach":
        return web.json_response({"ok": False, "error": "device_not_in_pool"},
                                 status=400)

    # Guard rails for the operations that reduce redundancy.
    # Anything that changes the pool needs an explicit second request. online
    # and clear are the only exceptions: they restore/annul state and cannot
    # lose data. `attach` is additive but still rewrites the vdev and starts a
    # resilver, so it is gated too.
    _NEEDS_CONFIRM = ("offline", "detach", "remove", "attach")
    _WARNS = {"offline": "reduces redundancy until the device is brought back online",
              "detach": "permanently removes this device from its mirror",
              "remove": "removes a top-level device; not possible once the pool "
                        "contains a raidz vdev",
              "attach": "starts a resilver onto the new device"}
    if act in _NEEDS_CONFIRM and not confirm:
        return web.json_response({"ok": True, "dry_run": True,
                                  "command": " ".join(shlex.quote(x) for x in
                                      ["zpool", act, pool, member] +
                                      ([new_dev] if new_dev else [])),
                                  "warning": _WARNS.get(act)})
    argv = ["zpool", act, pool, member] + ([new_dev] if new_dev else [])
    cmd = " ".join(shlex.quote(x) for x in argv)
    rc, out, err = await _run(cluster, node, cmd, timeout=LONG_TIMEOUT)
    detail = ((out or "") + ("\n" + err if err else "")).strip()
    await _audit(request, f"zfs.{act}", cid, f"{node}/{pool}",
                 "ok" if rc == 0 else f"error: {detail[:160]}",
                 {"device": dev, "new_device": new_dev})
    if rc != 0:
        return web.json_response({"ok": False, "error": "zpool_failed",
                                  "detail": detail}, status=502)
    job_id = None
    if act == "attach":
        user, _, _ = _actor(request)
        job_id = await _job_create(cid, node, pool, "attach", user, cmd,
                                   {"device": dev, "new_device": new_dev})
        _spawn_watch(cluster, cid, node, pool, job_id)
    return web.json_response({"ok": True, "detail": detail or None, "job_id": job_id})


# --------------------------------------------------------------- add vdev

@role_required("admin")
@zfs_errors
async def vdev_add_handler(request: web.Request) -> web.Response:
    """Add a top-level vdev: more data capacity, or log / cache / special /
    spare / dedup.

    Two irreversibility warnings the stock UI never gives:
      * a raidz top-level vdev can NEVER be removed from the pool;
      * once any raidz top-level exists, log/special/dedup removal is blocked
        too — so "just add a special later and drop it if I don't like it" is
        not a thing.
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(request.match_info["pool"])
        klass = (body.get("class") or "data").lower()
        if klass not in VDEV_CLASSES:
            raise ZfsError("bad_class", f"class must be one of {VDEV_CLASSES}")
        layout = (body.get("layout") or "stripe").lower()
        if layout not in VDEV_LAYOUTS:
            raise ZfsError("bad_layout", f"layout must be one of {VDEV_LAYOUTS}")
        devices = _norm_devices(body.get("devices"), minimum=_min_devices(layout))
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)
    confirm = bool(body.get("confirm"))
    force = bool(body.get("force"))

    # cache/spare are inherently single-device groups; log/special want mirrors.
    if klass in ("special", "dedup") and layout in _NO_REDUNDANCY and not force:
        return web.json_response(
            {"ok": False, "error": "special_needs_redundancy",
             "detail": "A special/dedup vdev holds pool metadata — losing it "
                       "loses the entire pool. Use a mirror, or set force.",
             "forceable": True}, status=409)

    argv = ["zpool", "add", pool]
    if klass != "data":
        argv.append({"log": "log", "cache": "cache", "special": "special",
                     "spare": "spare", "dedup": "dedup"}[klass])
    if layout != "stripe":
        argv.append(layout)
    argv += devices

    irreversible = layout.startswith(("raidz", "draid")) or klass in ("special", "dedup")
    resp = await _dry_then_run(
        cluster, node, cid, pool, request, action="zfs.vdev_add", argv=argv,
        confirm=confirm, force=force,
        params={"class": klass, "layout": layout, "devices": devices})
    # Decorate the dry-run response with our own warnings.
    if resp.status == 200 and not confirm:
        payload = json.loads(resp.body.decode())
        payload["warnings"] = [w for w in [
            ("A raidz/draid top-level vdev can never be removed from the pool "
             "— this is a one-way door." if layout.startswith(("raidz", "draid")) else None),
            ("New capacity is not rebalanced: existing data stays on the old "
             "vdevs, so throughput improves only for newly written blocks."
             if klass == "data" else None),
            ("Losing a special/dedup vdev destroys the whole pool — mirror it."
             if klass in ("special", "dedup") else None),
            ("A single-device log means an unclean shutdown can lose the most "
             "recent synchronous writes." if klass == "log" and layout == "stripe" else None),
        ] if w]
        payload["irreversible"] = irreversible
        return web.json_response(payload)
    return resp


@role_required("admin")
@zfs_errors
async def expand_handler(request: web.Request) -> web.Response:
    """RAIDZ online expansion (OpenZFS 2.3+): grow a raidz vdev by one disk.

    `zpool attach pool <raidz-vdev> <new-disk>` — note this is attach, not add:
    add would create a *second* vdev instead of widening the existing one,
    which is the classic irreversible mistake.
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        pool = _norm_pool(request.match_info["pool"])
        vdev = (body.get("vdev") or "").strip()
        if not re.match(r"^(raidz[123]?|draid[123]?)-\d+$", vdev):
            raise ZfsError("bad_vdev", "vdev must name a raidz/draid group, e.g. raidz2-0")
        dev = _norm_device(body.get("device") or "")
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)
    argv = ["zpool", "attach", pool, vdev, dev]
    resp = await _dry_then_run(
        cluster, node, cid, pool, request, action="zfs.raidz_expand", argv=argv,
        confirm=bool(body.get("confirm")), force=bool(body.get("force")),
        params={"vdev": vdev, "device": dev})
    if resp.status == 200 and not body.get("confirm"):
        payload = json.loads(resp.body.decode())
        payload["warnings"] = [
            "Expansion rewrites the vdev in the background; it can take days "
            "on large pools and cannot be undone.",
            "Pre-expansion data keeps its old parity ratio, so usable space "
            "grows by less than a whole disk.",
        ]
        return web.json_response(payload)
    return resp


# ---------------------------------------------------------------- create pool

@role_required("admin")
@zfs_errors
async def create_pool_handler(request: web.Request) -> web.Response:
    """Create a pool with an arbitrary multi-vdev topology.

    Body: {name, vdevs: [{layout, devices:[...]}, ...],
           log/cache/special/spare/dedev groups, props:{ashift,compression,...},
           mountpoint?, confirm, force}

    This is what makes "22 disks as two raidz2-of-11 in one pool" a single
    reviewed action instead of a hand-typed command nobody double-checks.
    """
    cid = request.match_info["cluster_id"]
    node = request.match_info["node"]
    cluster = _require_cluster(cid)
    body = await _body(request)
    try:
        name = _norm_pool(body.get("name") or "")
        groups: list[tuple[str, str, list[str]]] = []
        raw_vdevs = body.get("vdevs")
        if not isinstance(raw_vdevs, list) or not raw_vdevs:
            raise ZfsError("no_vdevs", "at least one data vdev is required")
        for g in raw_vdevs:
            if not isinstance(g, dict):
                raise ZfsError("bad_vdev", "each vdev must be an object")
            layout = (g.get("layout") or "stripe").lower()
            if layout not in VDEV_LAYOUTS:
                raise ZfsError("bad_layout", f"layout must be one of {VDEV_LAYOUTS}")
            groups.append(("data", layout,
                           _norm_devices(g.get("devices"), minimum=_min_devices(layout))))
        for klass in ("special", "log", "cache", "spare", "dedup"):
            for g in (body.get(klass) or []):
                if not isinstance(g, dict):
                    raise ZfsError("bad_vdev", f"each {klass} group must be an object")
                layout = (g.get("layout") or "stripe").lower()
                if layout not in VDEV_LAYOUTS:
                    raise ZfsError("bad_layout", f"layout must be one of {VDEV_LAYOUTS}")
                groups.append((klass, layout,
                               _norm_devices(g.get("devices"),
                                             minimum=_min_devices(layout))))
        # No device may appear twice across the whole topology.
        allsel = [d for _, _, ds in groups for d in ds]
        if len(set(allsel)) != len(allsel):
            raise ZfsError("duplicate_devices",
                           "a device is used in more than one vdev")
    except ZfsError as e:
        return web.json_response({"error": e.code, "detail": e.detail}, status=400)

    props = body.get("props") or {}
    argv = ["zpool", "create"]
    # ashift is effectively permanent — default to 12 (4K) like PVE does.
    ashift = str(props.get("ashift") or "12")
    if not re.match(r"^(9|1[0-6])$", ashift):
        return web.json_response({"error": "bad_ashift"}, status=400)
    argv += ["-o", f"ashift={ashift}"]
    for k, v in props.items():
        if k == "ashift":
            continue
        if not re.match(r"^[a-z_]{2,32}$", str(k)) or not re.match(
                r"^[A-Za-z0-9_.:%/\-]{1,64}$", str(v)):
            return web.json_response({"error": "bad_property",
                                      "detail": f"{k}={v}"}, status=400)
        argv += ["-O" if k in ("compression", "atime", "relatime", "recordsize",
                               "xattr", "acltype", "dnodesize", "mountpoint",
                               "quota", "special_small_blocks") else "-o",
                 f"{k}={v}"]
    argv.append(name)
    for klass, layout, devs in groups:
        if klass != "data":
            argv.append(klass)
        if layout != "stripe":
            argv.append(layout)
        argv += devs

    resp = await _dry_then_run(
        cluster, node, cid, name, request, action="zfs.pool_create", argv=argv,
        confirm=bool(body.get("confirm")), force=bool(body.get("force")),
        params={"groups": [{"class": k, "layout": l, "n": len(d)}
                           for k, l, d in groups], "props": props})
    if resp.status == 200 and not body.get("confirm"):
        payload = json.loads(resp.body.decode())
        payload["warnings"] = [w for w in [
            f"ashift={ashift} is permanent for the life of the pool.",
            ("This topology contains raidz/draid vdevs, which can never be "
             "removed — the layout is a one-way decision."
             if any(l.startswith(("raidz", "draid")) for _, l, _ in groups) else None),
            f"All data on the {len(allsel)} selected device(s) will be destroyed.",
        ] if w]
        return web.json_response(payload)
    return resp


# ------------------------------------------------------------------- jobs API

@role_required("viewer")
@zfs_errors
async def jobs_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    limit = 50
    try:
        limit = max(1, min(200, int(request.query.get("limit", 50))))
    except (TypeError, ValueError):
        pass
    async with db.connect() as c:
        cur = await c.execute(
            "SELECT * FROM zfs_jobs WHERE cluster_id=? ORDER BY id DESC LIMIT ?",
            (cid, limit))
        rows = await cur.fetchall()
    out = []
    for r in rows:
        d = dict(r)
        try:
            d["detail"] = json.loads(d.pop("detail_json") or "{}")
        except (json.JSONDecodeError, TypeError):
            d["detail"] = {}
        out.append(d)
    return web.json_response({"ok": True, "jobs": out})


ROUTES = [
    ("GET",  r"/api/clusters/{cluster_id}/nodes/{node}/zfs", zfs_get_handler),
    ("GET",  r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools/{pool}/consumers",
             consumers_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools/{pool}/scrub",
             scrub_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools/{pool}/trim",
             trim_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools/{pool}/replace",
             replace_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools/{pool}/device",
             device_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools/{pool}/vdev",
             vdev_add_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools/{pool}/expand",
             expand_handler),
    ("POST", r"/api/clusters/{cluster_id}/nodes/{node}/zfs/pools", create_pool_handler),
    ("GET",  r"/api/clusters/{cluster_id}/zfs/jobs", jobs_handler),
]
