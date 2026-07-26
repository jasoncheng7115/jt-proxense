"""ZFS admin: topology parsing + device-argument safety.

The fixtures under tests/fixtures/zfs/ are REAL `zpool status -j` output from
OpenZFS 2.4.2, captured from a throwaway file-backed lab pool built to mirror
the operator's target layout: 22 disks as two raidz2-of-11 vdevs in one pool,
plus a 3-way special mirror, a 3-way log mirror, an L2ARC and a hot spare —
in ONLINE, DEGRADED (one member offlined) and RESILVERING (spare kicked in)
states.

Capturing rather than hand-writing them caught a real bug: `zpool status -j`
does NOT nest special/log/cache/spare inside the root vdev tree with a
distinguishing `class`; it hangs them off the pool object under sibling keys
(special / logs / l2cache / spares). A hand-authored fixture would have
encoded the wrong assumption and the UI would have silently shown no
special/log/cache/spare vdevs at all.
"""
import json
import pathlib

import pytest

from server import zfs_admin as z

FIX = pathlib.Path(__file__).parent / "fixtures" / "zfs"


def _fx(name: str) -> str:
    return (FIX / name).read_text()


def _lab(fixture: str) -> dict:
    pools = z.parse_pools(_fx(fixture), root_pool="rpool")
    return next(p for p in pools if p["name"] == "jtplab")


# --------------------------------------------------------------- topology

def test_parses_two_raidz2_of_eleven():
    lab = _lab("zpool_status_complex.json")
    data = lab["vdevs"]["data"]
    assert len(data) == 2
    assert [v["type"] for v in data] == ["raidz", "raidz"]
    assert [len(v["children"]) for v in data] == [11, 11]
    assert lab["state"] == "ONLINE"


def test_auxiliary_vdevs_come_from_pool_level_keys():
    """special / logs / l2cache / spares are siblings of `vdevs`, not children."""
    lab = _lab("zpool_status_complex.json")
    v = lab["vdevs"]
    assert len(v["special"]) == 1 and v["special"][0]["type"] == "mirror"
    assert len(v["special"][0]["children"]) == 3
    assert len(v["log"]) == 1 and v["log"][0]["type"] == "mirror"
    assert len(v["cache"]) == 1
    assert len(v["spare"]) == 1
    assert lab["vdev_count"] == 6


def test_raidz_pool_is_flagged_non_removable():
    """A raidz top-level vdev can never be removed — the UI must say so."""
    lab = _lab("zpool_status_complex.json")
    assert lab["has_raidz"] is True
    assert lab["removable_toplevel"] is False


def test_degraded_member_is_visible():
    lab = _lab("zpool_status_degraded.json")
    assert lab["state"] == "DEGRADED"
    bad = [c for g in lab["vdevs"].values() for v in g
           for c in v["children"] if c["state"] != "ONLINE"]
    assert bad, "expected the offlined member to be surfaced"


def test_resilver_scan_is_reported():
    lab = _lab("zpool_status_resilver.json")
    assert lab["scan"] is not None
    assert lab["scan"]["function"] == "RESILVER"


def test_root_pool_on_partition_is_detected_as_boot_layout():
    """PVE puts rpool on -part3 next to an ESP; replace must take the boot path."""
    pools = z.parse_pools(_fx("zpool_status_complex.json"), root_pool="rpool")
    rpool = next(p for p in pools if p["name"] == "rpool")
    assert rpool["is_root_pool"] is True
    assert rpool["vdevs"]["data"][0]["is_partition"] is True


def test_root_pool_sorts_first():
    pools = z.parse_pools(_fx("zpool_status_complex.json"), root_pool="rpool")
    assert pools[0]["name"] == "rpool"


def test_error_counters_are_ints_not_strings():
    lab = _lab("zpool_status_complex.json")
    leaf = lab["vdevs"]["data"][0]["children"][0]
    for k in ("read_errors", "write_errors", "cksum_errors", "slow_ios"):
        assert isinstance(leaf[k], int)


def test_bad_json_raises_zfs_error_not_valueerror():
    with pytest.raises(z.ZfsError) as e:
        z.parse_pools("{not json")
    assert e.value.code == "zpool_json_parse"


def test_empty_input_is_empty_list():
    assert z.parse_pools("") == []


# ------------------------------------------------------------ size handling

@pytest.mark.parametrize("raw,want", [
    ("236G", 236 * 1024 ** 3),
    ("75.3G", int(75.3 * 1024 ** 3)),
    ("0B", 0),
    ("-", None),
    (None, None),
    ("1.5T", int(1.5 * 1024 ** 4)),
    (12345, 12345),
])
def test_size_to_bytes(raw, want):
    assert z._size_to_bytes(raw) == want


# --------------------------------------------------- device-argument safety

def test_by_id_leaf_is_expanded_to_full_path():
    assert z._norm_device("ata-FOO_123") == "/dev/disk/by-id/ata-FOO_123"


def test_full_by_id_path_passes_through():
    p = "/dev/disk/by-id/nvme-Samsung_990_S1234"
    assert z._norm_device(p) == p


@pytest.mark.parametrize("bad", [
    "/dev/sda",                      # kernel names reorder across reboots
    "/dev/sda3",
    "/dev/nvme0n1",
    "/dev/mapper/pve-root",
    "/dev/disk/by-path/pci-0000",    # by-path changes when you move the cable
    "../../etc/passwd",
    "/dev/disk/by-id/../../sda",
])
def test_unstable_or_hostile_devices_are_refused(bad):
    with pytest.raises(z.ZfsError):
        z._norm_device(bad)


def test_empty_device_is_refused():
    with pytest.raises(z.ZfsError) as e:
        z._norm_device("")
    assert e.value.code == "missing_device"


def test_shell_metacharacters_cannot_survive_validation():
    for evil in ["ata-x; rm -rf /", "ata-x$(id)", "ata-x`id`", "ata-x|tee",
                 "ata-x&&id", "ata-x\nid"]:
        with pytest.raises(z.ZfsError):
            z._norm_device(evil)


def test_duplicate_devices_are_refused():
    with pytest.raises(z.ZfsError) as e:
        z._norm_devices(["ata-a", "ata-a"])
    assert e.value.code == "duplicate_devices"


def test_layout_minimums():
    assert z._min_devices("mirror") == 2
    assert z._min_devices("raidz2") == 4
    with pytest.raises(z.ZfsError):
        z._norm_devices(["ata-a", "ata-b"], minimum=z._min_devices("raidz2"))


@pytest.mark.parametrize("bad", ["", "1pool", "-pool", "pool name", "a" * 65,
                                 "pool;rm", "pool/child"])
def test_bad_pool_names_are_refused(bad):
    with pytest.raises(z.ZfsError):
        z._norm_pool(bad)


def test_good_pool_names_pass():
    for ok in ["rpool", "tank", "vmimage", "Backup_1", "pool-2", "a.b:c"]:
        assert z._norm_pool(ok) == ok


# --------------------------------------------------------- disk inventory

_LSBLK = json.dumps({"blockdevices": [
    {"name": "sda", "type": "disk", "size": 480103981056,
     "model": "INTEL SSDSC2KG480G8", "serial": "BTYG1", "rota": False,
     "tran": "sata",
     "mountpoint": None, "children": [
         {"name": "sda1", "type": "part", "size": 1031168, "mountpoint": None},
         {"name": "sda2", "type": "part", "size": 536870912, "mountpoint": None},
         {"name": "sda3", "type": "part", "size": 479564660736, "mountpoint": None}]},
    {"name": "sdb", "type": "disk", "size": 1000204886016,
     "model": "WDC WD10EZEX", "serial": "WD-XYZ", "rota": True,
     "tran": "sata", "mountpoint": None, "children": []},
    {"name": "nvme0n1", "type": "disk", "size": 1920383410176,
     "model": "SAMSUNG MZQL2", "serial": "S64F", "rota": False,
     "tran": "nvme", "mountpoint": None, "children": []},
    {"name": "sr0", "type": "rom", "size": 0, "children": []},
    # lsblk reports ZFS zvols as type=disk — they must never be offered as media
    {"name": "zd0", "type": "disk", "size": 34359738368, "rota": False,
     "mountpoint": None, "children": []},
    {"name": "zd16", "type": "disk", "size": 34359738368, "rota": False,
     "mountpoint": None, "children": []},
    {"name": "dm-0", "type": "disk", "size": 1073741824, "rota": False,
     "mountpoint": None, "children": []},
]})

_BYID = (
    "lrwxrwxrwx 1 root root  9 Jul 25 00:00 ata-INTEL_SSDSC2KG480G8_BTYG1 -> ../../sda\n"
    "lrwxrwxrwx 1 root root 10 Jul 25 00:00 ata-INTEL_SSDSC2KG480G8_BTYG1-part3 -> ../../sda3\n"
    "lrwxrwxrwx 1 root root  9 Jul 25 00:00 wwn-0x5001111111111111 -> ../../sda\n"
    "lrwxrwxrwx 1 root root  9 Jul 25 00:00 ata-WDC_WD10EZEX_WD-XYZ -> ../../sdb\n"
    "lrwxrwxrwx 1 root root  9 Jul 25 00:00 nvme-SAMSUNG_MZQL2_S64F -> ../../nvme0n1\n"
)


def _pools_for_inventory():
    return [{
        "name": "rpool",
        "vdevs": {"data": [{
            "name": "ata-INTEL_SSDSC2KG480G8_BTYG1-part3",
            "by_id": "ata-INTEL_SSDSC2KG480G8_BTYG1-part3",
            "state": "ONLINE", "children": []}]},
    }]


def test_inventory_maps_pool_membership_through_partition_suffix():
    disks = z.parse_disks(_LSBLK, _BYID, _pools_for_inventory())
    sda = next(d for d in disks if d["kernel"] == "sda")
    assert sda["pool"] == "rpool"
    assert sda["free"] is False


def test_inventory_prefers_human_alias_over_wwn():
    disks = z.parse_disks(_LSBLK, _BYID, _pools_for_inventory())
    sda = next(d for d in disks if d["kernel"] == "sda")
    assert sda["by_id"] == "ata-INTEL_SSDSC2KG480G8_BTYG1"


def test_inventory_marks_untouched_disk_free():
    disks = z.parse_disks(_LSBLK, _BYID, _pools_for_inventory())
    sdb = next(d for d in disks if d["kernel"] == "sdb")
    assert sdb["pool"] is None
    assert sdb["free"] is True
    assert sdb["rotational"] is True


def test_inventory_skips_non_disks():
    disks = z.parse_disks(_LSBLK, _BYID, _pools_for_inventory())
    assert all(d["kernel"] != "sr0" for d in disks)


def test_inventory_survives_garbage_input():
    assert z.parse_disks("not json", "", []) == []


# ------------------------------------------------------------------- routes

def test_every_mutating_route_is_admin_gated():
    """A01: no POST endpoint may be reachable by a viewer."""
    for method, path, handler in z.ROUTES:
        if method == "POST":
            assert getattr(handler, "__wrapped__", None) is not None, (
                f"{path} is not wrapped by a role decorator")


def test_route_paths_are_namespaced_under_zfs():
    assert all("/zfs" in p for _, p, _ in z.ROUTES)


# ------------------------------------------------- raidz level / parity

def test_raidz_parity_comes_from_the_name_not_the_type():
    """`zpool status -j` reports a flat vdev_type="raidz" with no nparity field.

    Only the vdev NAME carries the level ("raidz2-0"). Reading parity off the
    type yields 1 for every raidz group, which would tell an operator a raidz2
    array tolerates one failure when it tolerates two — the exact number they
    rely on when deciding whether pulling a disk is safe.
    """
    lab = _lab("zpool_status_complex.json")
    for v in lab["vdevs"]["data"]:
        assert v["type"] == "raidz", "fixture should carry the flat JSON type"
        assert v["level"] == "raidz2"
        assert v["parity"] == 2


@pytest.mark.parametrize("vtype,name,level,parity", [
    ("raidz", "raidz2-0", "raidz2", 2),
    ("raidz", "raidz3-1", "raidz3", 3),
    ("raidz", "raidz-0", "raidz1", 1),
    ("raidz", "raidz1-0", "raidz1", 1),
    ("draid", "draid2-0", "draid2", 2),
    ("mirror", "mirror-2", "mirror", None),
    ("disk", "ata-FOO", "disk", None),
    ("file", "/tmp/x.img", "file", None),
])
def test_raidz_level_derivation(vtype, name, level, parity):
    assert z._raidz_level(vtype, name) == (level, parity)


def test_mirror_has_no_parity_number():
    lab = _lab("zpool_status_complex.json")
    mirror = lab["vdevs"]["special"][0]
    assert mirror["level"] == "mirror"
    assert mirror["parity"] is None


# --------------------------------------------------- media classification

@pytest.mark.parametrize("kdev,tran,rota,by_id,want", [
    ("nvme0n1", "nvme", False, "nvme-SAMSUNG_X", "nvme"),
    ("nvme1n1", None,   False, None,             "nvme"),   # name alone is enough
    ("sdd",     None,   False, "nvme-FOO",       "nvme"),   # by-id alone is enough
    ("sda",     "sata", False, "ata-INTEL_X",    "ssd"),
    ("sdb",     "sata", True,  "ata-WDC_X",      "hdd"),
    ("sdc",     "sas",  True,  "scsi-X",         "hdd"),
    ("sde",     "usb",  False, "usb-X",          "ssd"),
])
def test_media_kind(kdev, tran, rota, by_id, want):
    """PVE buckets disks as hdd / ssd / nvme; `rotational` alone cannot separate
    an NVMe from a SATA SSD, so transport and naming both feed the decision."""
    assert z._media_kind(kdev, tran, rota, by_id) == want


def test_inventory_reports_media_kind():
    disks = z.parse_disks(_LSBLK, _BYID, _pools_for_inventory())
    kinds = {d["kernel"]: d["kind"] for d in disks}
    assert kinds["sda"] == "ssd"
    assert kinds["sdb"] == "hdd"
    assert kinds["nvme0n1"] == "nvme"


def test_zvols_and_virtual_devices_are_never_offered_as_media():
    """lsblk labels ZFS zvols (zd*) as type=disk. Offering one as a pool member
    would build a pool inside a pool; dm-/loop/md/zram are equally not media."""
    disks = z.parse_disks(_LSBLK, _BYID, _pools_for_inventory())
    names = {d["kernel"] for d in disks}
    assert not {n for n in names if n.startswith(("zd", "dm-", "loop", "md", "zram"))}
    assert "sda" in names and "nvme0n1" in names


def test_nvme_disk_is_free_and_selectable():
    disks = z.parse_disks(_LSBLK, _BYID, _pools_for_inventory())
    nvme = next(d for d in disks if d["kernel"] == "nvme0n1")
    assert nvme["free"] is True
    assert nvme["by_id"] == "nvme-SAMSUNG_MZQL2_S64F"


# ------------------------------------------------- PVE-API read path
#
# The API path matters because it needs NO passwordless SSH and performs no
# writes: /disks/zfs + /disks/zfs/{pool} + /disks/list are enough for the whole
# topology view. Fixtures are real pvesh output.

def _api_lab():
    listing = json.loads(_fx("api_zfs_list.json"))
    det = {"jtplab2": json.loads(_fx("api_zfs_detail_complex.json"))}
    pools = z.parse_pools_api(listing, det, root_pool="rpool")
    return next(p for p in pools if p["name"] == "jtplab2")


def test_api_parses_multi_vdev_topology():
    lab = _api_lab()
    v = lab["vdevs"]
    assert len(v["data"]) == 2
    assert [x["level"] for x in v["data"]] == ["raidz2", "raidz2"]
    assert [x["parity"] for x in v["data"]] == [2, 2]
    assert len(v["data"][0]["children"]) == 4


def test_api_finds_auxiliary_group_nodes():
    """The API returns special / cache / spares as sibling group nodes named
    after the class, not as vdevs carrying a `class` field."""
    v = _api_lab()["vdevs"]
    assert len(v["special"]) == 1 and v["special"][0]["type"] == "mirror"
    assert len(v["cache"]) == 1
    assert len(v["spare"]) == 1


def test_api_surfaces_degraded_member():
    lab = _api_lab()
    assert lab["state"] == "DEGRADED"
    bad = [c["name"] for c in lab["vdevs"]["data"][0]["children"]
           if c["state"] != "ONLINE"]
    assert len(bad) == 1


def test_api_shape_matches_ssh_shape():
    """Both sources must produce the same keys, or the frontend would have to
    branch on which one answered."""
    api = _api_lab()
    ssh = _lab("zpool_status_complex.json")
    shared = {"name", "state", "size", "alloc", "scan", "is_root_pool",
              "has_raidz", "removable_toplevel", "vdevs", "vdev_count"}
    assert shared <= set(api) and shared <= set(ssh)
    for key in ("data", "special", "log", "cache", "spare", "dedup"):
        assert key in api["vdevs"] and key in ssh["vdevs"]
    leaf_keys = {"name", "type", "level", "parity", "state", "by_id",
                 "read_errors", "write_errors", "cksum_errors", "children"}
    assert leaf_keys <= set(api["vdevs"]["data"][0])
    assert leaf_keys <= set(ssh["vdevs"]["data"][0])


def test_api_marks_pool_source():
    assert _api_lab()["source"] == "api"


@pytest.mark.parametrize("text,func,state,pct", [
    ("scrub repaired 0B in 00:13:58 with 0 errors on Sun Jul 12 00:38:00 2026",
     "SCRUB", "FINISHED", 100.0),
    ("scrub in progress since Sat Jul 25 12:00:00 2026 3.40% done",
     "SCRUB", "SCANNING", 3.4),
    ("resilver in progress since Sat Jul 25 12:00:00 2026 12.50% done",
     "RESILVER", "SCANNING", 12.5),
    ("none requested", None, None, None),
])
def test_api_scan_text_is_structured(text, func, state, pct):
    got = z._api_scan(text)
    assert got["function"] == func
    assert got["state"] == state
    assert got["percent"] == pct


def test_api_disk_inventory_uses_pve_classification():
    """PVE already reports type=hdd/ssd/nvme and a by_id_link, so no lsblk."""
    pve = [
        {"devpath": "/dev/nvme0n1", "type": "nvme", "size": 2000398934016,
         "model": "Samsung 970", "serial": "S4J", "rpm": 0, "used": "ZFS",
         "by_id_link": "/dev/disk/by-id/nvme-Samsung_970_S4J", "wearout": 98},
        {"devpath": "/dev/sda", "type": "ssd", "size": 480103981056,
         "model": "INTEL", "serial": "BTY", "rpm": 0, "used": "zfs_member",
         "by_id_link": "/dev/disk/by-id/ata-INTEL_BTY"},
        {"devpath": "/dev/sdb", "type": "hdd", "size": 16000900661248,
         "model": "TOSHIBA", "serial": "X1A", "rpm": 7200, "used": "",
         "by_id_link": "/dev/disk/by-id/ata-TOSHIBA_X1A"},
        # a zvol must never be offered as media
        {"devpath": "/dev/zd0", "type": "unknown", "size": 34359738368,
         "used": "", "by_id_link": ""},
    ]
    disks = z.parse_disks_api(pve, [])
    kinds = {d["kernel"]: d["kind"] for d in disks}
    assert kinds == {"nvme0n1": "nvme", "sda": "ssd", "sdb": "hdd"}
    free = {d["kernel"] for d in disks if d["free"]}
    assert free == {"sdb"}, "only the unclaimed disk is offerable"
    assert next(d for d in disks if d["kernel"] == "nvme0n1")["wearout"] == 98


def test_api_inventory_marks_pool_membership():
    pools = [{"name": "tank", "vdevs": {"data": [
        {"by_id": "ata-INTEL_BTY-part3", "children": []}]}}]
    pve = [{"devpath": "/dev/sda", "type": "ssd", "size": 1, "used": "zfs_member",
            "by_id_link": "/dev/disk/by-id/ata-INTEL_BTY"}]
    disks = z.parse_disks_api(pve, pools)
    assert disks[0]["pool"] == "tank"
    assert disks[0]["free"] is False


# =============================================================== safety rails
#
# These lock down the answers to "is it foolproof / does it ask before doing
# something destructive". They are behavioural, not cosmetic: the first one
# caught handlers that raised ZfsError out of the coroutine, which made aiohttp
# answer 500 + traceback on any node without passwordless SSH — and silently
# disabled the UI's SSH-setup helper, because that keys off error=ssh_failed.

import ast
import inspect


def _handler_names():
    return [h.__name__ for _, _, h in z.ROUTES]


def test_every_handler_converts_our_errors_to_json():
    src = inspect.getsource(z)
    tree = ast.parse(src)
    names = set(_handler_names())
    seen = {}
    for node in ast.walk(tree):
        if isinstance(node, (ast.AsyncFunctionDef, ast.FunctionDef)) and node.name in names:
            decos = {d.id if isinstance(d, ast.Name) else getattr(d, "attr", "")
                     for d in node.decorator_list
                     if isinstance(d, (ast.Name, ast.Attribute))}
            seen[node.name] = "zfs_errors" in decos
    missing = [n for n, ok in seen.items() if not ok]
    assert not missing, f"handlers would 500 on ZfsError: {missing}"
    assert len(seen) == len(names)


def test_error_decorator_maps_code_and_status():
    import asyncio

    @z.zfs_errors
    async def boom(request):
        raise z.ZfsError("ssh_failed", "Permission denied", status=502)

    resp = asyncio.get_event_loop_policy().new_event_loop().run_until_complete(
        boom(None))
    assert resp.status == 502
    assert json.loads(resp.body.decode())["error"] == "ssh_failed"


def test_error_decorator_hides_unexpected_tracebacks():
    import asyncio

    @z.zfs_errors
    async def boom(request):
        raise RuntimeError("inner detail that should not leak as a trace")

    resp = asyncio.get_event_loop_policy().new_event_loop().run_until_complete(
        boom(None))
    assert resp.status == 500
    body = json.loads(resp.body.decode())
    assert body["error"] == "internal"
    assert "Traceback" not in body["detail"]


def test_state_changing_device_actions_all_require_confirmation():
    """online / clear restore state and are safe; everything else must be asked."""
    src = inspect.getsource(z.device_handler)
    assert '_NEEDS_CONFIRM = ("offline", "detach", "remove", "attach")' in src
    assert '"online"' not in src.split("_NEEDS_CONFIRM")[1].split(")")[0]


def test_destructive_endpoints_have_a_two_step_shape():
    """replace / vdev add / expand / create must not act on the first request."""
    for fn in (z.replace_handler, z.vdev_add_handler, z.expand_handler,
               z.create_pool_handler):
        src = inspect.getsource(fn)
        assert "confirm" in src, f"{fn.__name__} never looks at confirm"


def test_dry_run_helper_refuses_without_confirm():
    """_dry_then_run must return the preview, not execute, when unconfirmed."""
    src = inspect.getsource(z._dry_then_run)
    assert "if not confirm:" in src
    assert '"dry_run": True' in src


def test_force_is_never_implicit():
    """-f may only appear when the caller explicitly asked for force."""
    src = inspect.getsource(z._dry_then_run)
    assert "if force:" in src and 'base.insert(1, "-f")' in src


def test_special_vdev_without_redundancy_is_refused():
    src = inspect.getsource(z.vdev_add_handler)
    assert "special_needs_redundancy" in src


def test_scrub_refuses_to_stack_on_a_running_scan():
    assert "scan_already_running" in inspect.getsource(z.scrub_handler)


def test_replace_checks_replacement_size_first():
    assert "replacement_too_small" in inspect.getsource(z.replace_handler)


def test_replace_detects_boot_layout_and_handles_esp():
    src = inspect.getsource(z.replace_handler)
    for needed in ("is_partition", "sgdisk", "--randomize-guids",
                   "proxmox-boot-tool"):
        assert needed in src, f"boot-disk replace is missing {needed}"


def test_replace_refuses_a_target_that_already_holds_data():
    assert "target_in_use" in inspect.getsource(z.replace_handler)


def test_replace_refuses_a_device_not_in_the_pool():
    assert "old_not_in_pool" in inspect.getsource(z.replace_handler)


def test_command_fstrings_only_interpolate_quoted_values():
    """Any f-string that builds a shell command must quote every value it splices.

    A plain string check is not enough — the boot-disk replace legitimately uses
    an f-string whose every hole is shlex.quote()d. So walk the AST and demand
    that each interpolation is either shlex.quote(...) or one of a small set of
    provably-constrained expressions (documented inline).
    """
    src = inspect.getsource(z)
    tree = ast.parse(src)
    CMD_WORDS = ("zpool ", "zfs ", "sgdisk", "proxmox-boot-tool", "lsblk",
                 "blockdev", "partprobe")
    # Values that cannot carry shell metacharacters by construction:
    #   zpart  - digits captured by re.search(r"-part(\d+)$", ...)
    #   force  - renders either "-f " or "" from a bool
    SAFE_EXPR = {"zpart"}
    offenders = []
    for node in ast.walk(tree):
        if not isinstance(node, ast.JoinedStr):
            continue
        literal = "".join(v.value for v in node.values
                          if isinstance(v, ast.Constant) and isinstance(v.value, str))
        # Must BE a command, not merely mention one: an error message such as
        # "could not parse zpool status JSON: {e}" contains a command word but
        # never reaches a shell.
        if not literal.lstrip().startswith(CMD_WORDS):
            continue
        for v in node.values:
            if not isinstance(v, ast.FormattedValue):
                continue
            e = v.value
            if isinstance(e, ast.Call):
                f = e.func
                nm = f.attr if isinstance(f, ast.Attribute) else getattr(f, "id", "")
                if nm == "quote":
                    continue
            if isinstance(e, ast.Name) and e.id in SAFE_EXPR:
                continue
            # a bool-driven flag such as ('-f ' if force else '')
            if isinstance(e, ast.IfExp) and all(
                    isinstance(b, ast.Constant) for b in (e.body, e.orelse)):
                continue
            offenders.append(ast.dump(e)[:120])
    assert not offenders, "unquoted interpolation into a shell command:\n" + \
        "\n".join(offenders)


def test_every_device_argument_passes_through_the_by_id_guard():
    """No handler may take a device straight from the request body."""
    for fn in (z.replace_handler, z.device_handler, z.vdev_add_handler,
               z.expand_handler, z.create_pool_handler):
        src = inspect.getsource(fn)
        assert ("_norm_device(" in src or "_norm_devices(" in src), \
            f"{fn.__name__} accepts a device without _norm_device"


def test_ssh_connect_is_bounded_via_the_shared_helper():
    """asyncssh.connect() has no timeout of its own.

    Without a bound, a request against an unreachable node pins an aiohttp
    handler until the OS abandons the TCP handshake — minutes. The security gate
    caught this: a probe against an unroutable TEST-NET address never came back.
    The bound now lives in ssh_util (see tests/test_ssh_util.py) so all nine
    outbound-SSH call sites inherit it; zfs_admin must route through it and
    translate the timeout into its own error code.
    """
    src = inspect.getsource(z._connect)
    assert "ssh_util.connect(" in src, "must not hand-roll a connection"
    assert "SshTimeout" in src, "timeout must map to a precise ZfsError"
    assert z.CONNECT_TIMEOUT <= 30


def test_run_does_not_rewrap_precise_errors():
    src = inspect.getsource(z._run)
    assert "except ZfsError:" in src, (
        "a precise ZfsError (e.g. connect timeout) must not be flattened into a "
        "generic ssh_failed with a str() detail")
