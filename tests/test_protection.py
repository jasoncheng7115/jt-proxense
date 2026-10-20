"""Backup-recency (RPO) and snapshot overview.

The vzdump log fixture is a real 9.2.3 task log trimmed to the lines the
parser reads (no repository / credentials). The failure line is vzdump's
standard `ERROR: Backup of VM <id> failed - <reason>` shape.
"""
from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

import pytest

from server import protection as pr
from server import vm_backups

FIX = json.loads((Path(__file__).parent / "fixtures" / "vzdump_task_log_pve923.json").read_text())
TASK = FIX["task"]
TZ = FIX["tz_offset_s"]           # Asia/Taipei → +28800


def _local_to_epoch(s: str, tz: float) -> float:
    return datetime.strptime(s, "%Y-%m-%d %H:%M:%S").replace(
        tzinfo=timezone.utc).timestamp() - tz


# ── log parsing ───────────────────────────────────────────────────────────

def test_real_log_yields_every_finished_guest():
    res = pr.parse_vzdump_log(FIX["lines"], TASK["starttime"], TASK["endtime"], TZ)
    finished = {int(l.split("VM ")[1].split(" ")[0])
                for l in FIX["lines"] if "Finished Backup of VM" in l}
    assert finished and set(res) == finished
    assert all(r["ok"] for r in res.values())


def test_per_guest_time_uses_node_local_stamp():
    res = pr.parse_vzdump_log(FIX["lines"], TASK["starttime"], TASK["endtime"], TZ)
    lines = FIX["lines"]
    i = next(k for k, l in enumerate(lines) if "Finished Backup of VM 103" in l)
    stamp = lines[i + 1].split("finished at ")[1]
    assert res[103]["time"] == pytest.approx(_local_to_epoch(stamp, TZ))
    # and every per-guest time lies inside the task's own window
    for r in res.values():
        assert TASK["starttime"] - 60 <= r["time"] <= TASK["endtime"] + 60


def test_failure_without_stamp_uses_task_start_not_end():
    """A failure must not look newer than a success the same job logged on
    another node (real case: a guest HA-moved mid-job)."""
    fail = pr.parse_vzdump_log(
        ["ERROR: Backup of VM 108 failed - Configuration file "
         "'nodes/host-109/lxc/108.conf' does not exist"], 1000.0, 9000.0, 0)
    ok = pr.parse_vzdump_log(
        ["INFO: Starting Backup of VM 108 (lxc)",
         "INFO: Finished Backup of VM 108 (00:00:10)"], 1000.0, 5000.0, None)
    ev = pr.merge_evidence([(1, fail), (2, ok)])
    assert fail[108]["time"] == 1000.0
    assert not ev[108]["last_attempt_failed"]


def test_failure_time_uses_its_own_started_stamp():
    lines = ["INFO: Starting Backup of VM 5 (qemu)",
             "INFO: Backup started at 1970-01-01 00:10:00",
             "ERROR: Backup of VM 5 failed - boom"]
    assert pr.parse_vzdump_log(lines, 0.0, 9999.0, 0)[5]["time"] == 600.0


def test_long_error_keeps_the_cause_at_the_end():
    msg = "command 'lxc-usernsexec " + "x" * 800 + "' failed: exit code 255"
    lines = [f"ERROR: Backup of VM 7 failed - {msg}"]
    err = pr.parse_vzdump_log(lines, 0.0, 1.0, None)[7]["error"]
    assert err.endswith("exit code 255") and len(err) <= 300


def test_pbs_repository_is_redacted_from_errors():
    lines = ["ERROR: Backup of VM 7 failed - command '/usr/bin/proxmox-backup-client "
             "backup --repository backupuser@pbs!tok@pbs.example.com:store --ns c1' "
             "failed: exit code 255"]
    err = pr.parse_vzdump_log(lines, 0.0, 1.0, None)[7]["error"]
    assert "pbs.example.com" not in err and "backupuser" not in err
    assert "--repository <redacted>" in err and err.endswith("exit code 255")


def test_without_tz_falls_back_to_task_end():
    res = pr.parse_vzdump_log(FIX["lines"], TASK["starttime"], TASK["endtime"], None)
    assert {r["time"] for r in res.values()} == {float(TASK["endtime"])}


def test_failure_line_is_recorded():
    lines = [
        "INFO: Starting Backup of VM 116 (qemu)",
        "INFO: Backup started at 2026-09-28 02:30:02",
        "ERROR: Backup of VM 116 failed - unable to open file '/x' - No space left on device",
        "INFO: Starting Backup of VM 117 (lxc)",
        "INFO: Finished Backup of VM 117 (00:00:10)",
        "INFO: Backup finished at 2026-09-28 02:31:00",
    ]
    res = pr.parse_vzdump_log(lines, 1000.0, 2000.0, 0)
    assert res[116]["ok"] is False and "No space left" in res[116]["error"]
    assert res[117]["ok"] is True


# ── evidence merge ────────────────────────────────────────────────────────

def test_latest_attempt_decides_failed():
    ev = pr.merge_evidence([
        (1, {5: {"ok": True, "time": 100.0, "error": None}}),
        (2, {5: {"ok": False, "time": 200.0, "error": "boom"}}),
    ])
    assert ev[5]["last_ok"] == 100.0
    assert ev[5]["last_attempt_failed"] and ev[5]["last_error"] == "boom"


def test_success_after_failure_clears_failed():
    ev = pr.merge_evidence([
        (2, {5: {"ok": True, "time": 300.0, "error": None}}),
        (1, {5: {"ok": False, "time": 200.0, "error": "boom"}}),   # order-free
    ])
    assert ev[5]["last_ok"] == 300.0 and not ev[5]["last_attempt_failed"]


# ── job coverage (mirrors vzdump selection) ───────────────────────────────

G = [{"vmid": 100, "node": "a"}, {"vmid": 101, "node": "b"}, {"vmid": 102, "node": "b"}]


def test_coverage_vmid_list_all_exclude_pool_node():
    jobs = [
        {"id": "list", "vmid": "100,102", "enabled": 1},
        {"id": "all", "all": 1, "exclude": "101", "enabled": 1},
        {"id": "pool", "pool": "prod", "enabled": 1},
        {"id": "node-b", "all": 1, "node": "b", "enabled": 1},
        {"id": "off", "all": 1, "enabled": 0},
    ]
    cov = pr.job_coverage(jobs, G, {"prod": {101}})
    assert cov[100] == ["list", "all"]
    assert cov[101] == ["pool", "node-b"]
    assert cov[102] == ["list", "all", "node-b"]


def test_real_job_shape_vmid_list_string():
    """cluster1's job carries `vmid` as one comma string and all=None."""
    jobs = [{"id": "j", "all": None, "vmid": "116,134,100", "pool": None,
             "node": None, "exclude": None, "enabled": 1}]
    cov = pr.job_coverage(jobs, G, {})
    assert cov[100] == ["j"] and cov[101] == []


# ── classification ────────────────────────────────────────────────────────

def _row(rows, vmid):
    return next(r for r in rows if r["vmid"] == vmid)


def test_classification_states():
    now = 1_000_000.0
    guests = [{"vmid": v, "node": "a", "name": "", "type": "qemu", "status": ""}
              for v in (1, 2, 3, 4, 5)]
    ev = {
        1: {"last_ok": now - 3600, "last_attempt": now - 3600, "last_attempt_failed": False, "last_error": None},
        2: {"last_ok": now - 3 * 86400, "last_attempt": now - 3 * 86400, "last_attempt_failed": False, "last_error": None},
        3: {"last_ok": now - 3600, "last_attempt": now - 60, "last_attempt_failed": True, "last_error": "x"},
    }
    cov = {1: ["j"], 2: ["j"], 3: ["j"], 4: ["j"], 5: []}
    rows = pr.classify(guests, ev, cov, set(), 24 * 3600, now)
    assert [_row(rows, v)["status"] for v in (1, 2, 3, 4, 5)] == \
        ["ok", "stale", "failed", "no_record", "unprotected"]


def test_unreadable_node_makes_missing_evidence_unknown_not_none():
    """Absence from what we could read is not a statement about the guest."""
    guests = [{"vmid": 9, "node": "a", "name": "", "type": "qemu", "status": ""}]
    rows = pr.classify(guests, {}, {9: []}, {"b"}, 3600, 0.0)
    assert rows[0]["status"] == "unknown"


# ── end to end over a fake PVE ────────────────────────────────────────────

class FakeClient:
    def __init__(self, fail_nodes=()):
        self.fail_nodes = set(fail_nodes)
        self.calls = []

    async def _request(self, method, path, params=None, **kw):
        self.calls.append((path, dict(params or {})))
        if path == "/cluster/backup":
            return [{"id": "daily", "vmid": "103,124,999", "enabled": 1}]
        if path.endswith("/time"):
            return {"time": 1790558414, "localtime": 1790558414 + TZ}
        node = path.split("/")[2] if path.startswith("/nodes/") else None
        if node in self.fail_nodes:
            raise RuntimeError("595 no route to host")
        if path.endswith("/tasks"):
            if node != "host-108":
                return []
            return [{"upid": "UPID:host-108:1:2:3:vzdump::root@pam:",
                     "starttime": TASK["starttime"], "endtime": TASK["endtime"],
                     "status": "OK"},
                    {"upid": "UPID:host-108:running", "starttime": 1, "status": ""}]
        if "/log" in path:
            return [{"n": i, "t": l} for i, l in enumerate(FIX["lines"])]
        if path.endswith("/snapshot"):
            return [{"name": "old", "snaptime": 1_000, "description": "d",
                     "vmstate": 1},
                    {"name": "current", "digest": "x"}]
        raise AssertionError(path)


def make_cluster(client, guests_on=("host-108",)):
    class Cache:
        nodes = {n: {"node": n, "status": "online"} for n in ("host-108", "host-109")}
        vms = {
            "host-108/103": {"vmid": 103, "node": "host-108", "name": "a", "type": "qemu", "status": "running"},
            "host-108/124": {"vmid": 124, "node": "host-108", "name": "b", "type": "lxc", "status": "running"},
            "host-109/999": {"vmid": 999, "node": "host-109", "name": "c", "type": "qemu", "status": "stopped"},
            "host-109/500": {"vmid": 500, "node": "host-109", "name": "t", "type": "qemu", "status": "stopped", "template": 1},
        }

    class C:
        id = "c1"
        cache = Cache()
    C.client = client
    return C


async def test_build_backups_end_to_end():
    c = make_cluster(FakeClient())
    data = await pr.build_backups(c)
    rows = {r["vmid"]: r for r in pr.classify(
        data["guests"], data["evidence"], data["coverage"],
        set(data["unreadable_nodes"]), 10 * 365 * 86400, float(TASK["endtime"]) + 60)}
    assert 500 not in rows                                  # templates skipped
    assert rows[103]["status"] == "ok" and rows[124]["status"] == "ok"
    assert rows[999]["status"] == "no_record"               # covered, never seen
    # the task still running is not read
    assert not any("running" in p for p, _ in c.client.calls if "/log" in p)
    # tasks are fetched with a vzdump filter, never unbounded
    tp = [q for p, q in c.client.calls if p.endswith("/tasks")]
    assert tp and all(q.get("typefilter") == "vzdump" and q.get("limit") for q in tp)


async def test_unreadable_node_is_reported_not_swallowed():
    c = make_cluster(FakeClient(fail_nodes={"host-109"}))
    data = await pr.build_backups(c)
    assert "host-109" in data["unreadable_nodes"]
    rows = {r["vmid"]: r for r in pr.classify(
        data["guests"], data["evidence"], data["coverage"],
        set(data["unreadable_nodes"]), 10 * 365 * 86400, float(TASK["endtime"]))}
    assert rows[999]["status"] == "unknown"


async def test_build_snapshots_skips_current_and_templates():
    c = make_cluster(FakeClient())
    data = await pr.build_snapshots(c)
    names = {(s["vmid"], s["name"]) for s in data["snapshots"]}
    assert (103, "old") in names and (124, "old") in names
    assert not any(n == "current" for _, n in names)
    assert not any(v == 500 for v, _ in names)
    lxc = [p for p, _ in c.client.calls if "/lxc/124/snapshot" in p]
    assert lxc, "containers must be read from the lxc endpoint"


def test_routes_are_viewer_gated():
    for _m, _p, h in pr.ROUTES:
        assert getattr(h, "__wrapped__", None) is not None, h


# ── vm_backups regressions found while building this ─────────────────────

def test_content_list_does_not_crash():
    assert vm_backups._content_set(["images", "backup"]) == {"images", "backup"}
    assert vm_backups._content_set("rootdir,Backup") == {"rootdir", "backup"}
    assert vm_backups._content_set(None) == set()


def test_pbs_row_matches_by_vmid_field():
    row = {"volid": "pbs:backup/vm/100/2026-09-27T18:30:02Z", "vmid": 100}
    assert vm_backups._row_is_for(row, 100)
    assert not vm_backups._row_is_for(row, 10)
    # the old volid-only matcher could never see it
    assert not vm_backups._matches_vmid(row["volid"], 100)


def test_empty_list_carries_visibility_note():
    assert "note" in vm_backups._body([])
    assert "note" not in vm_backups._body([{"volid": "x"}])
