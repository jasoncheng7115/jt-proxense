"""Capacity forecast and idle-guest detection (server/capacity.py).

Fixtures are real PVE 9.2.3 RRD payloads: a month of `used`/`total` for a
shared Ceph pool (1440 points, 30-min step) and a week of a running guest.
"""
from __future__ import annotations

import json
from pathlib import Path

import pytest

from server import capacity as cap

FIX = Path(__file__).parent / "fixtures" / "rrd"
STORAGE_MONTH = json.loads((FIX / "storage_month_pve923.json").read_text())
GUEST_WEEK = json.loads((FIX / "guest_week_pve923.json").read_text())

DAY = 86400.0
TB = 1024 ** 4


def series(days=30, start_used=0.5 * TB, per_day=0.0, total=1 * TB, noise=0.0, step=1800):
    import math
    out = []
    n = int(days * DAY / step)
    for i in range(n):
        t = 1_700_000_000 + i * step
        wobble = noise * math.sin(i * 0.7) * TB
        out.append({"time": t, "used": start_used + per_day * (i * step / DAY) + wobble,
                    "total": total})
    return out


def test_linear_fit_recovers_slope():
    a, b, r2 = cap.linear_fit([(x, 3 + 2 * x) for x in range(10)])
    assert (round(a, 6), round(b, 6), round(r2, 6)) == (3, 2, 1)


def test_growing_storage_projects_days_to_80_and_full():
    f = cap.storage_forecast(series(per_day=0.01 * TB))      # +1 %/day from 50 %
    assert f["trend"] == "growing"
    used_now = 0.5 * TB + 0.01 * TB * (29.98)
    assert f["days_to_full"] == pytest.approx((TB - used_now) / (0.01 * TB), abs=0.2)
    assert f["days_to_80"] == pytest.approx((0.8 * TB - used_now) / (0.01 * TB), abs=0.2)


def test_flat_and_shrinking_give_no_date():
    assert cap.storage_forecast(series(per_day=0))["trend"] == "flat"
    s = cap.storage_forecast(series(per_day=-0.01 * TB))
    assert s["trend"] == "shrinking" and "days_to_full" not in s


def test_noisy_growth_is_irregular_not_a_confident_date():
    f = cap.storage_forecast(series(per_day=0.0005 * TB, noise=0.05))
    assert f["trend"] == "irregular" and "days_to_full" not in f


def test_already_past_80_reports_zero():
    f = cap.storage_forecast(series(start_used=0.85 * TB, per_day=0.001 * TB))
    assert f["trend"] == "growing" and f["days_to_80"] == 0.0


def test_too_few_samples():
    assert cap.storage_forecast(series(days=0.2))["trend"] == "insufficient_data"
    assert cap.storage_forecast([])["trend"] == "insufficient_data"


def test_real_ceph_month_is_classified_without_error():
    f = cap.storage_forecast(STORAGE_MONTH)
    assert f["samples"] >= 1400 and 29 < f["span_days"] < 31
    assert f["trend"] in {"growing", "flat", "shrinking", "irregular"}
    assert 0 < f["used_pct"] < 100


# ── idle guests ───────────────────────────────────────────────────────────

def week(cpu=0.001, net=100.0, days=7, spike_every=0, spike=0.0):
    out = []
    n = int(days * 48)
    for i in range(n):
        c = spike if spike_every and i % spike_every == 0 else cpu
        out.append({"time": 1_700_000_000 + i * 1800, "cpu": c,
                    "netin": net / 2, "netout": net / 2})
    return out


def test_quiet_guest_is_idle():
    v = cap.idle_verdict(week())
    assert v["idle"] and v["reason"] == "idle"


def test_busy_at_night_is_not_idle_even_if_average_is_low():
    v = cap.idle_verdict(week(cpu=0.001, spike_every=10, spike=0.5))
    assert v["cpu_avg_pct"] < 10 and not v["idle"]


def test_short_history_is_not_judged():
    v = cap.idle_verdict(week(days=2))
    assert not v["idle"] and v["reason"] == "too_little_history"


def test_network_active_guest_is_not_idle():
    assert not cap.idle_verdict(week(net=50_000))["idle"]


def test_real_guest_week_is_active():
    """The captured guest runs at ~20 % CPU: must not be called idle."""
    v = cap.idle_verdict(GUEST_WEEK)
    assert v["days"] > 6 and not v["idle"]


# ── what gets read ────────────────────────────────────────────────────────

def test_shared_storage_read_once_local_per_node_and_nodes_restriction():
    class Cache:
        storages = {
            "a/ceph1": {"storage": "ceph1", "node": "a", "shared": True},
            "b/ceph1": {"storage": "ceph1", "node": "b", "shared": True},
            "a/local-zfs": {"storage": "local-zfs", "node": "a", "shared": False},
            "b/local-zfs": {"storage": "local-zfs", "node": "b", "shared": False},
            "a/vmimage": {"storage": "vmimage", "node": "a", "shared": False,
                          "allowed_nodes": ["b"]},
            "a/off": {"storage": "off", "node": "a", "enabled": False},
        }

    class C:
        cache = Cache()
    got = [(t["storage"], t["node"] if not t["shared"] else "*")
           for t in cap.storage_targets(C)]
    assert sorted(got) == [("ceph1", "*"), ("local-zfs", "a"), ("local-zfs", "b")]


async def test_build_reports_errors_instead_of_hiding_them():
    class Client:
        async def _request(self, method, path, params=None):
            if "/storage/" in path:
                raise RuntimeError("595 no route to host")
            return week()

    class Cache:
        storages = {"a/s": {"storage": "s", "node": "a", "shared": False}}
        vms = {"a/100": {"vmid": 100, "node": "a", "name": "quiet", "type": "qemu",
                         "status": "running"},
               "a/101": {"vmid": 101, "node": "a", "name": "t", "type": "qemu",
                         "status": "running", "template": 1},
               "a/102": {"vmid": 102, "node": "a", "name": "off", "type": "qemu",
                         "status": "stopped"}}

    class C:
        cache = Cache()
        client = Client()
    d = await cap.build(C)
    assert d["storages"] == [] and d["errors"][0]["what"] == "storage s@a"
    assert [g["vmid"] for g in d["idle"]] == [100] and d["guests_checked"] == 1


def test_route_is_viewer_gated():
    from tests.test_route_uniqueness import _role_of
    for _m, _p, h in cap.ROUTES:
        assert _role_of(h) == "viewer"
