"""CPU-compatibility pre-flight for live migration.

Fixtures are the real cluster1 cpuinfo (PVE 9.2.3): host-114 AMD Ryzen 5 5500GT,
host-108 Intel i5-10400 (no AVX-512), host-109/110/111 Xeon D-2141I (AVX-512).
The guest cpu strings exercised below are ones actually configured there.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

import pytest

from server import cpu_compat as cc
from server import migrate_guard as mg

FIX = Path(__file__).parent / "fixtures" / "cpu"
INFO = json.loads((FIX / "cluster1_cpuinfo_pve923.json").read_text())
CAPS_ROWS = json.loads((FIX / "cpu_flags_pve923.json").read_text())
CAPS = {r["name"]: set(r["supported-on"]) for r in CAPS_ROWS}


def b(cpu, src, dst, caps=CAPS):
    return cc.blockers(cpu, INFO[src], INFO[dst], caps, dst)


# ── parsing ────────────────────────────────────────────────────────────────

@pytest.mark.parametrize("raw,model,plus", [
    ("host", "host", set()),
    ("host,flags=+aes", "host", {"aes"}),
    ("x86-64-v3,flags=-pcid", "x86-64-v3", set()),
    ("x86-64-v2-AES,flags=+nested-virt", "x86-64-v2-aes", {"nested-virt"}),
    ("cputype=x86-64-v4,flags=+pcid;-spec-ctrl;+aes", "x86-64-v4", {"pcid", "aes"}),
    ("", "", set()),
    (None, "", set()),
])
def test_parse_cpu(raw, model, plus):
    assert cc.parse_cpu(raw) == (model, plus)


# ── the fixture itself is what we think it is ─────────────────────────────

def test_fixture_is_mixed_vendor():
    assert INFO["host-114"]["vendor"] == "AuthenticAMD"
    assert {INFO[n]["vendor"] for n in ("host-108", "host-109", "host-110",
                                        "host-111")} == {"GenuineIntel"}


# ── cpu: host ──────────────────────────────────────────────────────────────

def test_host_cpu_across_vendors_is_blocked():
    r = b("host", "host-114", "host-108")
    assert r and r["error"] == "cpu_vendor_mismatch"
    assert r["source_vendor"] == "AuthenticAMD" and r["target_vendor"] == "GenuineIntel"


def test_host_cpu_onto_host_without_avx512_is_blocked():
    """Xeon D (AVX-512) → i5-10400 (none): same vendor, still unsafe."""
    r = b("host", "host-109", "host-108")
    assert r and r["error"] == "cpu_features_missing_on_target"
    assert "avx512f" in r["missing"]


def test_host_cpu_between_identical_hosts_is_allowed():
    assert b("host", "host-109", "host-110") is None
    assert b("host,flags=+aes", "host-110", "host-111") is None


def test_host_cpu_ignores_non_guest_flags():
    """/proc flags such as 'ept' or 'pti' differ harmlessly between hosts."""
    src = dict(INFO["host-109"]); dst = dict(INFO["host-110"])
    src["flags"] = src["flags"] + " ept flexpriority pti"
    dst["flags"] = " ".join(f for f in dst["flags"].split()
                            if f not in {"ept", "flexpriority", "pti"})
    assert cc.blockers("host", src, dst, CAPS, "host-110") is None


# ── x86-64 levels ─────────────────────────────────────────────────────────

def test_v2_aes_runs_everywhere_in_cluster1():
    for src in INFO:
        for dst in INFO:
            if src != dst:
                assert b("x86-64-v2-AES", src, dst) is None, (src, dst)


def test_v3_runs_everywhere_in_cluster1():
    assert b("x86-64-v3,flags=-pcid", "host-110", "host-114") is None
    assert b("x86-64-v3", "host-108", "host-114") is None


def test_v4_onto_host_without_avx512_is_blocked():
    r = b("x86-64-v4", "host-109", "host-114")
    assert r and r["error"] == "cpu_level_unsupported_on_target"
    assert "avx512f" in r["missing"]


# ── nested-virt / PVE optional flags ──────────────────────────────────────

def test_nested_virt_across_vendors_is_blocked():
    r = b("x86-64-v2-AES,flags=+nested-virt", "host-108", "host-114")
    assert r and r["error"] == "cpu_vendor_mismatch"


def test_nested_virt_same_vendor_is_allowed():
    assert b("x86-64-v2-AES,flags=+nested-virt", "host-108", "host-109") is None


def test_optional_flag_not_supported_on_target_is_blocked():
    caps = {**CAPS, "pdpe1gb": {"host-109", "host-110"}}
    r = b("x86-64-v2-AES,flags=+pdpe1gb", "host-109", "host-108", caps)
    assert r and r["error"] == "cpu_flag_unsupported_on_target"
    assert r["flags"] == ["pdpe1gb"]


# ── fail open ─────────────────────────────────────────────────────────────

@pytest.mark.parametrize("cpu", ["SandyBridge", "kvm64", "EPYC-Rome", "custom-foo", ""])
def test_unjudged_models_are_not_blocked(cpu):
    assert b(cpu, "host-114", "host-108") is None


def test_unreadable_target_fails_open():
    assert cc.blockers("host", INFO["host-114"], None, CAPS, "host-108") is None
    assert cc.blockers("x86-64-v4", INFO["host-109"], {}, CAPS, "host-108") is None


# ── the Checker: running-only, qemu-only, one config read ─────────────────

@dataclass
class VM:
    vmid: int
    node: str
    status: str
    disks: list = None
    type: str = "qemu"


class Client:
    def __init__(self, cpu):
        self.cpu = cpu
        self.config_reads = 0

    async def get_vm_config(self, node, vmid):
        self.config_reads += 1
        return {"cpu": self.cpu}

    async def get_node_status(self, node):
        return {"cpuinfo": INFO[node]}

    async def _request(self, method, path, **kw):
        if path.endswith("/capabilities/qemu/cpu-flags"):
            return CAPS_ROWS
        if path.startswith("/cluster/ha/"):
            return []
        raise AssertionError(path)


def make_cluster(cpu, status="running", cid="t"):
    class Cache:
        vms = {"host-114/200": VM(200, "host-114", status, [])}
        storages = {}
        nodes = {}

    class C:
        id = cid
        cache = Cache()
        client = Client(cpu)
    return C


@pytest.fixture(autouse=True)
def _clear_caches():
    cc._cpuinfo.clear(); cc._flagcaps.clear()
    yield
    cc._cpuinfo.clear(); cc._flagcaps.clear()


async def test_viable_targets_drop_other_vendor_for_host_cpu():
    c = make_cluster("host")
    targets = await mg.viable_targets(c, "qemu", 200, "host-114",
                                      list(INFO), online=True)
    assert targets == []                       # AMD source, every other node Intel
    assert c.client.config_reads == 1          # one read for all candidates


async def test_viable_targets_keep_everything_for_v2():
    c = make_cluster("x86-64-v2-AES")
    targets = await mg.viable_targets(c, "qemu", 200, "host-114",
                                      list(INFO), online=True)
    assert sorted(targets) == sorted(n for n in INFO if n != "host-114")


async def test_stopped_guest_is_not_checked():
    c = make_cluster("host", status="stopped")
    assert await mg.check(c, "qemu", 200, "host-108", source="host-114") is None
    assert c.client.config_reads <= 1          # the guard's one live read, no more


async def test_offline_request_is_not_checked():
    c = make_cluster("host")
    assert await mg.check(c, "qemu", 200, "host-108", source="host-114",
                          online=False) is None


async def test_lxc_is_not_checked():
    c = make_cluster("host")
    assert await mg.check(c, "lxc", 200, "host-108", source="host-114") is None


async def test_check_reports_vendor_mismatch():
    c = make_cluster("host")
    r = await mg.check(c, "qemu", 200, "host-108", source="host-114")
    assert r and r["error"] == "cpu_vendor_mismatch"


async def test_enum_status_counts_as_running():
    from server.models import VMStatus
    c = make_cluster("host", status=VMStatus.RUNNING)
    r = await mg.check(c, "qemu", 200, "host-108", source="host-114")
    assert r and r["error"] == "cpu_vendor_mismatch"


async def test_client_failure_fails_open():
    c = make_cluster("host")

    async def boom(*a, **k):
        raise RuntimeError("pveproxy 596")
    c.client.get_vm_config = boom
    assert await mg.check(c, "qemu", 200, "host-108", source="host-114") is None


async def test_guard_reads_config_once_for_storage_and_cpu():
    c = make_cluster("host")
    r = await mg.check(c, "qemu", 200, "host-108", source="host-114")
    assert r and r["error"] == "cpu_vendor_mismatch"
    assert c.client.config_reads == 1
