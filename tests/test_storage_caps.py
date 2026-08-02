"""Storage content-type pre-flight.

Grounded in the real cluster: `ceph1` declares images,rootdir and has NO
backup; `host-107-pbs-cluster1` declares backup only. Both are healthy — the
mistake is picking the wrong one, and PVE only tells you once the vzdump task
has already started and failed.
"""
from __future__ import annotations

from dataclasses import dataclass, field

from server import storage_caps as sc


@dataclass
class Storage:
    storage: str
    node: str
    content: list = field(default_factory=list)
    enabled: bool = True


NODES = ["host-108", "host-114"]
REAL = (
    [Storage("ceph1", n, ["images", "rootdir"]) for n in NODES]
    + [Storage("host-107-pbs-cluster1", n, ["backup"]) for n in NODES]
    + [Storage("local", n, ["vztmpl", "iso", "images"]) for n in NODES]
    + [Storage("nas3", n, ["vztmpl", "snippets", "import", "iso"]) for n in NODES]
    + [Storage("old-nfs", "host-108", ["backup"], enabled=False)]
)


class C:
    class cache:
        storages = {f"{s.node}/{s.storage}": s for s in REAL}


def test_backup_to_image_only_storage_is_refused():
    r = sc.check(C, "ceph1", "backup", "host-114")
    assert r is not None
    assert r["error"] == "storage_content_unsupported"
    assert r["needs"] == "backup"
    assert r["has"] == ["images", "rootdir"]


def test_backup_to_pbs_is_allowed():
    assert sc.check(C, "host-107-pbs-cluster1", "backup", "host-114") is None


def test_vm_disk_needs_images():
    assert sc.check(C, "ceph1", "vm-disk", "host-114") is None
    assert sc.check(C, "nas3", "vm-disk", "host-114") is not None


def test_ct_disk_needs_rootdir():
    assert sc.check(C, "ceph1", "ct-disk", "host-114") is None
    assert sc.check(C, "local", "ct-disk", "host-114") is not None


def test_iso_storage():
    assert sc.check(C, "nas3", "iso", "host-114") is None
    assert sc.check(C, "ceph1", "iso", "host-114") is not None


def test_unknown_storage_is_not_refused():
    """We must not invent a refusal for something we have never polled."""
    assert sc.check(C, "never-seen", "backup", "host-114") is None


def test_unknown_purpose_is_not_refused():
    assert sc.check(C, "ceph1", "not-a-purpose", "host-114") is None


def test_node_scoping():
    """One entry per node, so a storage absent from a node reads as unknown
    there rather than silently borrowing another node's capabilities."""
    assert sc.content_types(C, "old-nfs", "host-114") is None
    assert sc.content_types(C, "old-nfs", "host-108") == {"backup"}


def test_usable_for_lists_only_matching_and_enabled():
    out = sc.usable_for(C, "backup", "host-108")
    assert out == ["host-107-pbs-cluster1"], out      # old-nfs is disabled


def test_usable_for_iso():
    assert sc.usable_for(C, "iso", "host-114") == ["local", "nas3"]


def test_broken_cache_fails_open():
    class Bad:
        cache = None
    assert sc.check(Bad, "ceph1", "backup") is None
    assert sc.content_types(Bad, "ceph1") is None
