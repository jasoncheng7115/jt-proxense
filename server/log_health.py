"""Log-derived health findings — scan each node's syslog tail for serious
hardware / kernel events that the metric-based health checks can't see:
ECC memory errors, machine-check exceptions, OOM kills, disk I/O / ATA
CRC errors, filesystem corruption, segfaults, kernel BUG / panic, hung
tasks.

Route:
  GET /api/clusters/{cluster_id}/log-health
      → {ok, ts, findings: [{node, category, severity, count, sample}]}

Design notes:
  - One syslog tail (500 lines) per node per scan. With the 5-minute
    per-cluster cache + the global pve_throttle, an 8-node estate costs
    8 throttled GETs per 5 min worst case — well inside the API budget.
  - Single-flight per cluster: concurrent health-page opens share one
    scan instead of fanning out duplicate syslog pulls.
  - Patterns intentionally favour precision over recall: every category
    here should be worth waking an operator for, so we match the
    canonical kernel strings rather than fuzzy words like "error".
"""
from __future__ import annotations

import asyncio
import logging
import re
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required

logger = logging.getLogger(__name__)

_CACHE_TTL_S = 300.0
_SYSLOG_LINES = 500

# category -> (severity, compiled pattern). Order matters: first match
# wins, so put the more specific patterns first.
_PATTERNS: list[tuple[str, str, re.Pattern]] = [
    # Uncorrectable ECC / EDAC — memory is actively corrupting.
    ("ecc_ue", "critical", re.compile(
        r"EDAC.*\bUE\b|Uncorrected(?:able)? (?:DRAM |memory )?(?:ECC )?error|UncorrectableError",
        re.IGNORECASE)),
    # Corrected ECC — DIMM is degrading; warn before it becomes UE.
    ("ecc_ce", "warning", re.compile(
        r"EDAC.*\bCE\b|Corrected (?:DRAM |memory )?(?:ECC )?error|ECC error",
        re.IGNORECASE)),
    # Machine Check Exception — CPU/platform-level hardware fault.
    ("mce", "critical", re.compile(
        r"\bmce:|Machine Check Exception|\[Hardware Error\]",
        re.IGNORECASE)),
    # OOM killer fired — a guest or service was killed for memory.
    ("oom", "critical", re.compile(
        r"Out of memory: Kill|invoked oom-killer|oom-kill:|oom_reaper",
        re.IGNORECASE)),
    # Block-device I/O errors — failing disk or path.
    ("disk_io", "critical", re.compile(
        r"I/O error|blk_update_request.*error|critical medium error|"
        r"Medium Error|failed command: (?:READ|WRITE)",
        re.IGNORECASE)),
    # ATA / SATA link CRC — usually cabling or backplane.
    ("ata_crc", "warning", re.compile(
        r"interface CRC error|UDMA CRC error|ICRC|SError: \{.*BadCRC",
        re.IGNORECASE)),
    # Filesystem corruption.
    ("fs", "critical", re.compile(
        r"EXT4-fs error|XFS .*(?:Corruption|Internal error)|"
        r"BTRFS (?:error|critical|warning.*csum failed)|csum failed",
        re.IGNORECASE)),
    # Kernel-level breakage.
    ("kernel", "critical", re.compile(
        r"kernel BUG at|Kernel panic|general protection fault",
        re.IGNORECASE)),
    # Userspace crash — noisy-ish but worth a warning card.
    ("segfault", "warning", re.compile(r"segfault at", re.IGNORECASE)),
    # Hung tasks — storage stalls show up here first.
    ("hung_task", "warning", re.compile(
        r"hung_task|blocked for more than \d+ seconds",
        re.IGNORECASE)),
]

# cluster_id -> (monotonic_ts, findings)
_cache: dict[str, tuple[float, list]] = {}
_locks: dict[str, asyncio.Lock] = {}


def _scan_lines(node: str, lines: list) -> list[dict]:
    """Match every syslog line against the pattern table; aggregate
    per (category) with a count and the LAST matching line as sample."""
    agg: dict[str, dict] = {}
    for entry in lines:
        text = entry.get("t", "") if isinstance(entry, dict) else str(entry)
        if not text:
            continue
        for category, severity, pat in _PATTERNS:
            if pat.search(text):
                slot = agg.setdefault(category, {
                    "node": node, "category": category,
                    "severity": severity, "count": 0, "sample": "",
                })
                slot["count"] += 1
                slot["sample"] = text[-300:]
                break  # first matching category wins for this line
    return list(agg.values())


async def _scan_cluster(cluster_id: str) -> list[dict]:
    cluster = cluster_manager.get_cluster(cluster_id)
    if cluster is None:
        raise web.HTTPNotFound(text='{"error": "cluster_not_found"}',
                               content_type="application/json")

    # Node list: prefer the polled snapshot (knows online state); fall
    # back to asking PVE directly.
    nodes: list[str] = []
    try:
        snapshot = ((cluster_manager.get_all_data() or {})
                    .get("clusters", {}).get(cluster_id, {}) or {}).get("nodes")
        if snapshot:
            nodes = [n for n, nd in snapshot.items()
                     if (nd or {}).get("status", "online") == "online"]
    except Exception:
        nodes = []
    if not nodes:
        try:
            listed = await cluster.client._request("GET", "/nodes")
            nodes = [n.get("node") for n in (listed or [])
                     if n.get("status") == "online" and n.get("node")]
        except Exception as e:
            logger.warning("log-health: node list failed for %s: %s", cluster_id, e)
            return []

    async def scan_node(node: str) -> list[dict]:
        try:
            lines = await cluster.client.get_node_syslog(node, lines=_SYSLOG_LINES)
            return _scan_lines(node, lines or [])
        except Exception as e:
            logger.debug("log-health: syslog fetch failed %s/%s: %s",
                         cluster_id, node, e)
            return []

    results = await asyncio.gather(*(scan_node(n) for n in nodes))
    findings = [f for per_node in results for f in per_node]
    # Worst first, then by count.
    sev_rank = {"critical": 0, "warning": 1}
    findings.sort(key=lambda f: (sev_rank.get(f["severity"], 2), -f["count"]))
    return findings


@role_required("viewer")
async def log_health_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    now = time.monotonic()

    hit = _cache.get(cid)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return web.json_response({"ok": True, "cached": True, "findings": hit[1]})

    lock = _locks.setdefault(cid, asyncio.Lock())
    async with lock:
        # Re-check after the wait — a concurrent request may have filled it.
        hit = _cache.get(cid)
        if hit and time.monotonic() - hit[0] < _CACHE_TTL_S:
            return web.json_response({"ok": True, "cached": True, "findings": hit[1]})
        try:
            findings = await _scan_cluster(cid)
        except web.HTTPException:
            raise
        except Exception as e:
            logger.warning("log-health scan failed for %s: %s", cid, e)
            return web.json_response({"ok": False, "error": str(e)}, status=502)
        _cache[cid] = (time.monotonic(), findings)
        return web.json_response({"ok": True, "cached": False, "findings": findings})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/log-health", log_health_handler),
]
