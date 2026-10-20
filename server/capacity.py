"""Capacity forecast and idle-guest detection — read-only, from PVE's own RRDs.

  GET /api/clusters/{cluster_id}/capacity
      storages: per storage, the 30-day growth trend (least squares on the
                month RRD, `used` / `total`, one point per 30 min) and the
                projected days until 80 % and until full.
      idle:     running guests whose week RRD shows almost no CPU and network —
                candidates for shutdown or right-sizing, never acted on here.

Honesty rules, because a forecast is the easiest thing in this product to get
confidently wrong:
  * A projection is only given for a storage that is actually GROWING, with a
    fit that explains the data (r² ≥ 0.5); otherwise the trend is reported as
    flat / shrinking / irregular and no date is printed.
  * A guest is only called idle with at least 3 days of samples AND a low
    95th percentile, so a guest that is quiet on average but busy nightly is
    not listed.
  * Anything that could not be read is listed under `errors`, never folded
    into "no data means fine".

Shared storages (Ceph, NFS, PBS…) are one storage seen from every node: they
are read once. Local storages are per node (`local-zfs` on each node is a
different pool) and are read per node.
"""
from __future__ import annotations

import asyncio
import logging
import time

from aiohttp import web

from .cluster_manager import cluster_manager
from .middleware import role_required

logger = logging.getLogger(__name__)

CACHE_TTL_S = 1800.0          # RRD month/week data moves slowly
_CONCURRENCY = 4
MIN_R2 = 0.5
IDLE_CPU_AVG = 0.02           # fraction of allocated CPU
IDLE_CPU_P95 = 0.05
IDLE_NET_BPS = 2048.0         # netin + netout, bytes/s
IDLE_MIN_DAYS = 3.0

_cache: dict[str, tuple[float, dict]] = {}
_inflight: dict[str, asyncio.Future] = {}


def _g(o, k, d=None):
    return o.get(k, d) if isinstance(o, dict) else getattr(o, k, d)


# ───────────────────────────────────────────────────────────── pure maths

def linear_fit(points: list[tuple[float, float]]) -> tuple[float, float, float] | None:
    """Least squares y = a + b·x. Returns (a, b, r²) or None if degenerate."""
    n = len(points)
    if n < 3:
        return None
    sx = sum(p[0] for p in points)
    sy = sum(p[1] for p in points)
    mx, my = sx / n, sy / n
    sxx = sum((p[0] - mx) ** 2 for p in points)
    syy = sum((p[1] - my) ** 2 for p in points)
    sxy = sum((p[0] - mx) * (p[1] - my) for p in points)
    if sxx == 0:
        return None
    b = sxy / sxx
    a = my - b * mx
    r2 = 1.0 if syy == 0 else (sxy * sxy) / (sxx * syy)
    return a, b, r2


def storage_forecast(rrd: list[dict], now: float | None = None) -> dict:
    """Trend + projections from a storage's month RRD."""
    pts = [(float(p["time"]), float(p["used"]), float(p.get("total") or 0))
           for p in rrd or []
           if p.get("time") is not None and p.get("used") is not None]
    if len(pts) < 24:                       # under half a day of samples
        return {"trend": "insufficient_data", "samples": len(pts)}
    pts.sort()
    t_last, used, total = pts[-1]
    if total <= 0:
        return {"trend": "insufficient_data", "samples": len(pts)}
    fit = linear_fit([(t / 86400.0, u) for t, u, _ in pts])
    span_days = (pts[-1][0] - pts[0][0]) / 86400.0
    out = {
        "samples": len(pts), "span_days": round(span_days, 1),
        "used": used, "total": total, "used_pct": round(used / total * 100, 1),
    }
    if fit is None:
        return {**out, "trend": "insufficient_data"}
    _, per_day, r2 = fit
    out.update(growth_per_day=per_day, r2=round(r2, 3))
    # "Flat" = under 0.01 % of capacity a day (a TB pool growing 100 MB/day).
    if abs(per_day) < total * 0.0001:
        return {**out, "trend": "flat"}
    if per_day < 0:
        return {**out, "trend": "shrinking"}
    if r2 < MIN_R2:
        return {**out, "trend": "irregular"}
    out["trend"] = "growing"
    out["days_to_full"] = round((total - used) / per_day, 1)
    out["days_to_80"] = (round((total * 0.8 - used) / per_day, 1)
                         if used < total * 0.8 else 0.0)
    return out


def _p95(xs: list[float]) -> float:
    s = sorted(xs)
    return s[min(len(s) - 1, int(round(0.95 * (len(s) - 1))))]


def idle_verdict(rrd: list[dict]) -> dict:
    """CPU / network summary of a guest's week RRD, and whether it is idle."""
    rows = [p for p in rrd or [] if p.get("cpu") is not None]
    if not rows:
        return {"idle": False, "reason": "no_data", "days": 0.0}
    days = (float(rows[-1]["time"]) - float(rows[0]["time"])) / 86400.0
    cpu = [float(p["cpu"]) for p in rows]
    net = [float(p.get("netin") or 0) + float(p.get("netout") or 0) for p in rows]
    out = {
        "days": round(days, 1),
        "cpu_avg_pct": round(sum(cpu) / len(cpu) * 100, 2),
        "cpu_p95_pct": round(_p95(cpu) * 100, 2),
        "net_avg_bps": round(sum(net) / len(net), 1),
    }
    if days < IDLE_MIN_DAYS:
        return {**out, "idle": False, "reason": "too_little_history"}
    idle = (out["cpu_avg_pct"] < IDLE_CPU_AVG * 100
            and out["cpu_p95_pct"] < IDLE_CPU_P95 * 100
            and out["net_avg_bps"] < IDLE_NET_BPS)
    return {**out, "idle": idle, "reason": "idle" if idle else "active"}


# ───────────────────────────────────────────────────────────── PVE reads

def storage_targets(cluster) -> list[dict]:
    """One read per shared storage, one per (node, local storage)."""
    stores = _g(getattr(cluster, "cache", None), "storages", {}) or {}
    items = stores.values() if isinstance(stores, dict) else stores
    shared_done: set[str] = set()
    out = []
    for st in sorted(items, key=lambda s: (str(_g(s, "storage")), str(_g(s, "node")))):
        name, node = _g(st, "storage"), _g(st, "node")
        if not name or not node or not _g(st, "enabled", True):
            continue
        allowed = _g(st, "allowed_nodes", []) or []
        if allowed and node not in allowed:
            continue                              # PVE's nodes= excludes it
        if _g(st, "shared"):
            if name in shared_done:
                continue
            shared_done.add(name)
            out.append({"storage": name, "node": node, "shared": True,
                        "type": _g(st, "type", "")})
        else:
            out.append({"storage": name, "node": node, "shared": False,
                        "type": _g(st, "type", "")})
    return out


async def build(cluster) -> dict:
    client = cluster.client
    sem = asyncio.Semaphore(_CONCURRENCY)
    errors: list[dict] = []

    async def one_storage(t):
        async with sem:
            try:
                rrd = await client._request(
                    "GET", f"/nodes/{t['node']}/storage/{t['storage']}/rrddata",
                    params={"timeframe": "month", "cf": "AVERAGE"}) or []
            except Exception as e:
                errors.append({"what": f"storage {t['storage']}@{t['node']}",
                               "error": str(e)[:200]})
                return None
        return {**t, **storage_forecast(rrd)}

    vms = _g(getattr(cluster, "cache", None), "vms", {}) or {}
    items = vms.values() if isinstance(vms, dict) else vms
    running = []
    for v in items:
        st = _g(v, "status")
        if _g(v, "template") or str(getattr(st, "value", st)) != "running":
            continue
        running.append({"vmid": int(_g(v, "vmid")), "name": _g(v, "name") or "",
                        "node": _g(v, "node"), "type": _g(v, "type") or "qemu"})

    async def one_guest(g):
        kind = "lxc" if g["type"] == "lxc" else "qemu"
        async with sem:
            try:
                rrd = await client._request(
                    "GET", f"/nodes/{g['node']}/{kind}/{g['vmid']}/rrddata",
                    params={"timeframe": "week", "cf": "AVERAGE"}) or []
            except Exception as e:
                errors.append({"what": f"{kind} {g['vmid']}", "error": str(e)[:200]})
                return None
        return {**g, **idle_verdict(rrd)}

    storages = [s for s in await asyncio.gather(
        *(one_storage(t) for t in storage_targets(cluster))) if s]
    guests = [g for g in await asyncio.gather(*(one_guest(g) for g in running)) if g]
    storages.sort(key=lambda s: (s.get("days_to_full") is None,
                                 s.get("days_to_full") or 0, -s.get("used_pct", 0)))
    return {
        "storages": storages,
        "idle": sorted((g for g in guests if g["idle"]), key=lambda g: g["cpu_avg_pct"]),
        "guests_checked": len(guests),
        "errors": errors,
        "generated_at": time.time(),
    }


@role_required("viewer")
async def capacity_handler(request: web.Request) -> web.Response:
    """Storage growth forecast and idle running guests, from PVE RRD data."""
    cid = request.match_info["cluster_id"]
    cluster = cluster_manager.get_cluster(cid)
    if cluster is None:
        return web.json_response({"error": "cluster_not_found"}, status=404)
    force = request.query.get("force") == "1"
    hit = _cache.get(cid)
    if hit and not force and time.monotonic() - hit[0] < CACHE_TTL_S:
        return web.json_response(hit[1])
    fut = _inflight.get(cid)
    if fut is None:
        fut = asyncio.ensure_future(build(cluster))
        _inflight[cid] = fut
        fut.add_done_callback(lambda _f: _inflight.pop(cid, None))
    try:
        data = await asyncio.shield(fut)
    except Exception as e:
        logger.warning("capacity %s failed: %s", cid, e)
        return web.json_response({"error": "pve_request_failed", "detail": str(e)},
                                 status=502)
    _cache[cid] = (time.monotonic(), data)
    return web.json_response(data)


ROUTES = [
    ("GET", "/api/clusters/{cluster_id}/capacity", capacity_handler),
]
