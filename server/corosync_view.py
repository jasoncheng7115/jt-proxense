"""Corosync cluster health + ring performance viewer.

PVE clusters run corosync as the membership / quorum layer. A degraded
corosync ring (a link flapping, a node losing quorum, climbing ring
latency) is exactly the kind of "everything looks fine until it isn't"
problem an operator wants surfaced early — so this feeds the Health page.

Two data sources, combined:
  1. PVE API `/cluster/status` (always available, no SSH): node membership,
     per-node online / local / ip / nodeid, and the cluster `quorate` flag.
  2. SSH, best-effort (degrades gracefully if the host key isn't installed):
     - `corosync-quorumtool -s`  → expected / total votes, quorum, ring id
     - `corosync-cfgtool -s`     → per-link, per-peer connection status
     - `corosync-cmapctl -m stats` (knet) → per node/link latency (µs) +
       down_count  ← the "performance" picture.

Read-only (viewer+). The remote commands take NO operator input — there is
no injection surface; they only read corosync's own state. Cached per
cluster (single-flight) so a Health-page poll across N clusters doesn't
spawn an SSH storm.

Route:
  GET /api/clusters/{cluster_id}/corosync
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

_CACHE_TTL_S = 15.0
_cache: dict[str, tuple[float, dict]] = {}
_inflight: dict[str, asyncio.Lock] = {}

# Fixed remote script — no interpolation. Sections delimited by =MARKER=.
_SCRIPT = r"""
echo '=QUORUM='
corosync-quorumtool -s 2>/dev/null || true
echo '=CFG='
corosync-cfgtool -s 2>/dev/null || true
echo '=STATS='
corosync-cmapctl -m stats 2>/dev/null | grep -E 'knet\.node[0-9]+\.link[0-9]+\.(latency_ave|latency_min|latency_max|down_count|connected|enabled)' || true
echo '=NODELIST='
corosync-cmapctl 2>/dev/null | grep -E 'nodelist\.node[0-9]+\.(nodeid|name|ring0_addr|ring1_addr)' || true
"""


def _split_sections(out: str) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {}
    cur = None
    for line in out.splitlines():
        s = line.strip()
        if s.startswith("=") and s.endswith("=") and len(s) > 2:
            cur = s.strip("=")
            sections[cur] = []
        elif cur is not None:
            sections[cur].append(line)
    return sections


def _parse_quorum(lines: list[str]) -> dict:
    q: dict = {}
    def grab(label: str):
        for ln in lines:
            m = re.match(rf"\s*{re.escape(label)}\s*:\s*(.+?)\s*$", ln)
            if m:
                return m.group(1).strip()
        return None
    quorate = grab("Quorate")
    q["quorate"] = (quorate or "").lower() == "yes" if quorate is not None else None
    for key, label in (("local_nodeid", "Node ID"), ("ring_id", "Ring ID"),
                       ("nodes", "Nodes"), ("expected", "Expected votes"),
                       ("total", "Total votes"), ("quorum", "Quorum")):
        v = grab(label)
        if v is not None:
            if key in ("nodes", "expected", "total", "quorum", "local_nodeid"):
                try:
                    q[key] = int(re.split(r"\s", v)[0])
                except ValueError:
                    q[key] = v
            else:
                q[key] = v
    return q


def _parse_cfg(lines: list[str]) -> dict:
    """corosync-cfgtool -s — local node id, transport, per-link peer status."""
    out: dict = {"transport": None, "local_nodeid": None, "links": {}}
    cur_link = None
    for ln in lines:
        m = re.search(r"Local node ID\s+(\d+)(?:,\s*transport\s+(\w+))?", ln)
        if m:
            out["local_nodeid"] = int(m.group(1))
            if m.group(2):
                out["transport"] = m.group(2)
            continue
        m = re.search(r"LINK ID\s+(\d+)", ln)
        if m:
            cur_link = int(m.group(1))
            out["links"].setdefault(cur_link, {"peers": {}})
            continue
        # knet status rows:  nodeid:   2:	connected
        m = re.search(r"nodeid:\s*(\d+):\s*(\w+)", ln)
        if m and cur_link is not None:
            out["links"][cur_link]["peers"][int(m.group(1))] = m.group(2)
    return out


def _parse_stats(lines: list[str]) -> dict:
    """stats.knet.node{nodeid}.link{linkid}.{metric} (type) = value → nested."""
    stats: dict = {}
    rx = re.compile(r"knet\.node(\d+)\.link(\d+)\.(\w+)\s*\([^)]*\)\s*=\s*(\S+)")
    for ln in lines:
        m = rx.search(ln)
        if not m:
            continue
        nid, lid, metric, val = int(m.group(1)), int(m.group(2)), m.group(3), m.group(4)
        try:
            num = int(val)
        except ValueError:
            try:
                num = float(val)
            except ValueError:
                continue
        stats.setdefault(nid, {}).setdefault(lid, {})[metric] = num
    return stats


def _parse_nodelist(lines: list[str]) -> dict:
    """nodelist.node{idx}.{nodeid|name|ring0_addr} → {nodeid: {name, addrs}}."""
    by_idx: dict = {}
    rx = re.compile(r"nodelist\.node(\d+)\.(\w+)\s*\([^)]*\)\s*=\s*(.+?)\s*$")
    for ln in lines:
        m = rx.search(ln)
        if not m:
            continue
        idx, key, val = int(m.group(1)), m.group(2), m.group(3).strip()
        by_idx.setdefault(idx, {})[key] = val
    out: dict = {}
    for entry in by_idx.values():
        try:
            nid = int(entry.get("nodeid"))
        except (TypeError, ValueError):
            continue
        addrs = [entry[k] for k in ("ring0_addr", "ring1_addr") if entry.get(k)]
        out[nid] = {"name": entry.get("name"), "addrs": addrs}
    return out


async def _ssh_corosync(host: str, user: str, port: int) -> dict:
    import asyncssh
    async with asyncssh.connect(host, port=port, username=user,
                                known_hosts=None) as conn:
        r = await conn.run(_SCRIPT, check=False, timeout=20)
        out = r.stdout or ""
    sections = _split_sections(out)
    return {
        "quorum": _parse_quorum(sections.get("QUORUM", [])),
        "cfg": _parse_cfg(sections.get("CFG", [])),
        "stats": _parse_stats(sections.get("STATS", [])),
        "nodelist": _parse_nodelist(sections.get("NODELIST", [])),
    }


async def _collect(cluster) -> dict:
    # --- 1. PVE API: membership + quorate (always) ---
    api_nodes: list[dict] = []
    quorate_api = None
    cluster_name = None
    try:
        rows = await cluster.client.get_cluster_status()
    except Exception as e:
        logger.warning("corosync: /cluster/status failed: %s", e)
        rows = []
    ssh_host = None
    for r in rows:
        if r.get("type") == "cluster":
            quorate_api = bool(r.get("quorate"))
            cluster_name = r.get("name")
        elif r.get("type") == "node":
            online = bool(r.get("online"))
            node = {
                "name": r.get("name"),
                "nodeid": r.get("nodeid"),
                "ip": r.get("ip"),
                "online": online,
                "local": bool(r.get("local")),
            }
            api_nodes.append(node)
            if online and ssh_host is None:
                ssh_host = r.get("ip") or r.get("name")

    # --- 2. SSH best-effort: quorum votes + link status + latency ---
    user = getattr(cluster.config, "ssh_user", None) or "root"
    port = int(getattr(cluster.config, "ssh_port", None) or 22)
    ssh_ok = False
    ssh_err = None
    ssh: dict = {}
    if ssh_host:
        try:
            ssh = await _ssh_corosync(ssh_host, user, port)
            ssh_ok = True
        except Exception as e:
            ssh_err = str(e)
            logger.debug("corosync ssh on %s failed: %s", ssh_host, e)

    quorum = ssh.get("quorum", {}) if ssh_ok else {}
    cfg = ssh.get("cfg", {}) if ssh_ok else {}
    stats = ssh.get("stats", {}) if ssh_ok else {}
    nodelist = ssh.get("nodelist", {}) if ssh_ok else {}

    # --- merge per-node link view (nodeid → {link: {status, latency...}}) ---
    nodes_out: list[dict] = []
    # index api nodes by nodeid for merge
    api_by_id = {n.get("nodeid"): n for n in api_nodes if n.get("nodeid") is not None}
    all_ids = set(api_by_id) | set(nodelist) | set(stats)
    for nid in sorted(x for x in all_ids if isinstance(x, int)):
        a = api_by_id.get(nid, {})
        nl = nodelist.get(nid, {})
        links = []
        for lid, link in sorted(cfg.get("links", {}).items()):
            status = link.get("peers", {}).get(nid)
            st = stats.get(nid, {}).get(lid, {})
            links.append({
                "linkid": lid,
                "status": status,
                "latency_ave_us": st.get("latency_ave"),
                "latency_max_us": st.get("latency_max"),
                "down_count": st.get("down_count"),
            })
        nodes_out.append({
            "nodeid": nid,
            "name": a.get("name") or nl.get("name"),
            "ip": a.get("ip") or (nl.get("addrs") or [None])[0],
            "online": a.get("online"),
            "local": a.get("local"),
            "links": links,
        })

    # If SSH gave us nothing, still return API node list (health only).
    if not nodes_out:
        nodes_out = [{
            "nodeid": n.get("nodeid"), "name": n.get("name"), "ip": n.get("ip"),
            "online": n.get("online"), "local": n.get("local"), "links": [],
        } for n in api_nodes]

    quorate = quorum.get("quorate")
    if quorate is None:
        quorate = quorate_api

    # --- derive findings (health) ---
    findings: list[dict] = []
    if quorate is False:
        findings.append({"severity": "critical", "code": "no_quorum"})
    for n in nodes_out:
        if n.get("online") is False:
            findings.append({"severity": "critical", "code": "node_offline",
                             "node": n.get("name"), "nodeid": n.get("nodeid")})
        for lk in n.get("links", []):
            sstat = (lk.get("status") or "").lower()
            if sstat and sstat not in ("connected", "localhost"):
                findings.append({"severity": "critical", "code": "link_down",
                                 "node": n.get("name"), "link": lk.get("linkid")})
            ave = lk.get("latency_ave_us")
            if isinstance(ave, (int, float)) and ave >= 5000:  # ≥5 ms ring latency
                findings.append({"severity": "warning", "code": "high_latency",
                                 "node": n.get("name"), "link": lk.get("linkid"),
                                 "latency_us": ave})

    return {
        "ok": True,
        "cluster_name": cluster_name,
        "quorate": quorate,
        "transport": cfg.get("transport"),
        "local_nodeid": cfg.get("local_nodeid") or quorum.get("local_nodeid"),
        "votes": {
            "expected": quorum.get("expected"),
            "total": quorum.get("total"),
            "quorum": quorum.get("quorum"),
        },
        "ring_id": quorum.get("ring_id"),
        "nodes": nodes_out,
        "findings": findings,
        "ssh_ok": ssh_ok,
        "ssh_error": ssh_err,
    }


async def _cached(cid: str, cluster) -> dict:
    now = time.monotonic()
    hit = _cache.get(cid)
    if hit and now - hit[0] < _CACHE_TTL_S:
        return hit[1]
    lock = _inflight.setdefault(cid, asyncio.Lock())
    async with lock:
        hit = _cache.get(cid)
        if hit and time.monotonic() - hit[0] < _CACHE_TTL_S:
            return hit[1]
        data = await _collect(cluster)
        _cache[cid] = (time.monotonic(), data)
        return data


@role_required("viewer")
async def corosync_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    try:
        data = await _cached(cid, cluster)
    except Exception as e:
        logger.warning("corosync handler %s failed: %s", cid, e)
        return web.json_response({"ok": False, "error": str(e)}, status=502)
    return web.json_response(data)


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/corosync", corosync_handler),
]
