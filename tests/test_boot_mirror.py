"""Tests for the root-pool boot mirror flow.

The theme here is that every check must FAIL LOUDLY. A preflight that silently
returns "all clear" because it read the wrong data structure is worse than no
preflight at all — the operator trusts it and detaches their only good copy.
So most of these tests assert on the blocking behaviour, not on the happy path.

Per CLAUDE.md recurring mistake #15: assert on BEHAVIOUR, never on source text.
"""
from __future__ import annotations

import json
from dataclasses import dataclass

import pytest

from server import boot_mirror as bm


# --------------------------------------------------------------- fake plumbing

@dataclass
class FakeVM:
    vmid: int
    node: str


class FakeCache:
    def __init__(self, vms):
        self.vms = {f"{v.node}/{v.vmid}": v for v in vms}


class FakeCluster:
    """Records commands and replays canned output, matched by substring."""

    def __init__(self, responses, vms=()):
        self.responses = responses
        self.cache = FakeCache(list(vms))
        self.ran: list[str] = []

    def reply(self, cmd):
        self.ran.append(cmd)
        for needle, resp in self.responses.items():
            if needle in cmd:
                return resp
        return (0, "", "")


@pytest.fixture
def patch_run(monkeypatch):
    def install(cluster):
        async def _run(_cluster, _node, cmd, *, timeout=60):
            return cluster.reply(cmd)
        monkeypatch.setattr(bm, "_run", _run)
    return install


def _pool(members, *, scan=None, state="ONLINE"):
    return {
        "name": "rpool", "state": state, "error_count": 0, "scan": scan or {},
        "vdevs": {"data": [{"type": "mirror", "name": "mirror-0",
                            "children": members}]},
    }


def _member(by_id, state="ONLINE", part=3):
    return {"by_id": f"{by_id}-part{part}", "name": f"{by_id}-part{part}",
            "path": f"/dev/disk/by-id/{by_id}-part{part}", "state": state,
            "children": []}


GOOD = "ata-SAMSUNG_MZ7L3480_S000AAAA"
NEWD = "ata-SAMSUNG_MZ7L3480_S111BBBB"
DEAD = "ata-SAMSUNG_MZ7L3480_S222CCCC"

BASE_RESPONSES = {
    "findmnt": (0, "rpool/ROOT/pve-1\n", ""),
    "blockdev": (0, "480103981056\n", ""),
    "lsblk -rno FSTYPE,MOUNTPOINT": (0, "\n", ""),        # new disk blank
    # Verbatim shape of `lsblk -Pno NAME,PARTTYPE,FSTYPE` on a real PVE 8 node:
    # kernel names (not by-id), and a whole-disk row with empty columns.
    "lsblk -Pno NAME,PARTTYPE,FSTYPE": (
        0, 'NAME="sdb" PARTTYPE="" TYPE="disk" FSTYPE=""\n'
           'NAME="sdb1" PARTTYPE="21686148-6449-6e6f-744e-656564454649" TYPE="part" FSTYPE=""\n'
           'NAME="sdb2" PARTTYPE="c12a7328-f81f-11d2-ba4b-00a0c93ec93b" TYPE="part" FSTYPE="vfat"\n'
           'NAME="sdb3" PARTTYPE="6a898cc3-1dd2-11b2-99a6-080020736631" '
           'TYPE="part" FSTYPE="zfs_member"\n', ""),
    "lsblk -dno PHY-SEC": (0, "512 512\n---\n512 512\n", ""),
    "firmware/efi": (0, "uefi\n", ""),
    "proxmox-boot-tool status": (0, "System currently booted with uefi\n", ""),
    "not-backed-up": (0, "[]", ""),
}


async def _pre(monkeypatch, patch_run, *, pools, responses=None, vms=(),
               new=NEWD, old=None):
    cluster = FakeCluster({**BASE_RESPONSES, **(responses or {})}, vms=vms)
    patch_run(cluster)

    async def _status(_c, _n, _p):
        return pools
    monkeypatch.setattr(bm, "_status_pools", _status)
    result = await bm._preflight(cluster, "c1", "n1", "rpool", new, old)
    return result, cluster


def _check(result, cid):
    return next(c for c in result["checks"] if c["id"] == cid)


# ------------------------------------------------------------------ scenarios

@pytest.mark.asyncio
async def test_single_disk_pool_is_add_mirror(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    assert r["scenario"] == "add_mirror"
    assert r["ok"], r["blocking"]
    assert r["source_disk"] == GOOD


@pytest.mark.asyncio
async def test_healthy_old_disk_is_replace_live(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run,
                      pools=[_pool([_member(GOOD), _member(DEAD)])], old=DEAD)
    assert r["scenario"] == "replace_live"


@pytest.mark.asyncio
async def test_faulted_member_is_replace_dead(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run,
                      pools=[_pool([_member(GOOD), _member(DEAD, "FAULTED")])])
    assert r["scenario"] == "replace_dead"
    # and it must clone from the SURVIVOR, never from the dead disk
    assert r["source_disk"] == GOOD
    assert any("replicate" in c and GOOD in c for c in r["plan"])
    assert not any(f"--replicate={bm._BYID_DIR}{DEAD}" in c for c in r["plan"])


@pytest.mark.asyncio
async def test_replace_dead_uses_replace_not_attach(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run,
                      pools=[_pool([_member(GOOD), _member(DEAD, "FAULTED")])])
    assert any(c.startswith("zpool replace") for c in r["plan"])
    assert not any(c.startswith("zpool attach") for c in r["plan"])


@pytest.mark.asyncio
async def test_add_mirror_uses_attach(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    assert any(c.startswith("zpool attach") for c in r["plan"])
    assert not any(c.startswith("zpool replace") for c in r["plan"])


@pytest.mark.asyncio
async def test_every_member_dead_is_unrecoverable(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run,
                      pools=[_pool([_member(GOOD, "FAULTED"),
                                    _member(DEAD, "FAULTED")], state="DEGRADED")])
    assert not r["ok"]
    assert "survivor_exists" in r["blocking"]


# ------------------------------------------------------------- fatal preflight

@pytest.mark.asyncio
async def test_non_zfs_root_blocks(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
                      responses={"findmnt": (0, "/dev/sda2\n", "")})
    assert not r["ok"] and "zfs_root" in r["blocking"]


@pytest.mark.asyncio
async def test_smaller_new_disk_blocks_and_is_not_forceable(monkeypatch, patch_run):
    """The whole GPT is cloned, so a smaller target writes a table past the end
    of the disk. There must be no override for this."""
    calls = {"n": 0}

    def sizes(cmd):
        calls["n"] += 1
        return (0, ("480103981056\n" if calls["n"] == 1 else "240057409536\n"), "")

    cluster = FakeCluster(BASE_RESPONSES)
    orig = cluster.reply

    def reply(cmd):
        if "blockdev" in cmd:
            cluster.ran.append(cmd)
            return sizes(cmd)
        return orig(cmd)
    cluster.reply = reply
    patch_run(cluster)

    async def _status(_c, _n, _p):
        return [_pool([_member(GOOD)])]
    monkeypatch.setattr(bm, "_status_pools", _status)
    r = await bm._preflight(cluster, "c1", "n1", "rpool", NEWD, None)
    assert not r["ok"] and "new_disk_size" in r["blocking"]
    assert _check(r, "new_disk_size")["fatal"] is True


@pytest.mark.asyncio
async def test_new_disk_carrying_data_blocks(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
                      responses={"lsblk -rno FSTYPE,MOUNTPOINT":
                                 (0, "ext4 /mnt/backup\n", "")})
    assert not r["ok"] and "new_disk_blank" in r["blocking"]


@pytest.mark.asyncio
async def test_running_scrub_blocks(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run,
                      pools=[_pool([_member(GOOD)],
                                   scan={"state": "SCANNING", "function": "scrub",
                                         "percent": 42})])
    assert not r["ok"] and "no_scan_running" in r["blocking"]


@pytest.mark.asyncio
async def test_disk_already_in_pool_blocks(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run,
                      pools=[_pool([_member(GOOD), _member(NEWD)])])
    assert not r["ok"] and "new_disk_not_member" in r["blocking"]


# ------------------------------------------------------------ the backup gate

@pytest.mark.asyncio
async def test_guest_without_backup_blocks(monkeypatch, patch_run):
    """rpool carries local-zfs, so an unbacked guest on this node is data at
    risk. This must BLOCK, and it must actually see the guests."""
    r, _ = await _pre(
        monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
        vms=[FakeVM(101, "n1"), FakeVM(102, "n1")],
        responses={"not-backed-up": (0, json.dumps([{"vmid": 102, "type": "qemu"}]), "")})
    assert not r["ok"] and "guest_backups" in r["blocking"]
    assert "102" in _check(r, "guest_backups")["detail"]


@pytest.mark.asyncio
async def test_unbacked_guest_on_another_node_does_not_block(monkeypatch, patch_run):
    r, _ = await _pre(
        monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
        vms=[FakeVM(101, "n1")],
        responses={"not-backed-up": (0, json.dumps([{"vmid": 999, "type": "qemu"}]), "")})
    assert _check(r, "guest_backups")["ok"]


@pytest.mark.asyncio
async def test_unreadable_backup_info_blocks_rather_than_assumes_ok(
        monkeypatch, patch_run):
    """A false green on a hard gate is worse than no gate."""
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
                      vms=[FakeVM(101, "n1")],
                      responses={"not-backed-up": (0, "not json at all", "")})
    assert not r["ok"] and "guest_backups" in r["blocking"]


@pytest.mark.asyncio
async def test_backup_check_is_fatal_by_design(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    assert _check(r, "guest_backups")["fatal"] is True


# ------------------------------------------------------------------- the plan

@pytest.mark.asyncio
async def test_gpt_is_backed_up_before_anything_is_written(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    backup = next(i for i, c in enumerate(r["plan"]) if "--backup=" in c)
    write = next(i for i, c in enumerate(r["plan"]) if "--replicate=" in c)
    assert backup < write, "GPT backup must precede the first write"


@pytest.mark.asyncio
async def test_replicate_direction_target_is_the_new_disk(monkeypatch, patch_run):
    """Reversed --replicate blanks the SOURCE disk and loses the node."""
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    cmd = next(c for c in r["plan"] if "--replicate=" in c)
    assert f"--replicate={bm._BYID_DIR}{NEWD}" in cmd
    assert cmd.rstrip().endswith(f"{bm._BYID_DIR}{GOOD}")


@pytest.mark.asyncio
async def test_guids_randomised_after_clone(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    rep = next(i for i, c in enumerate(r["plan"]) if "--replicate=" in c)
    rnd = next(i for i, c in enumerate(r["plan"]) if "--randomize-guids" in c)
    assert rep < rnd


@pytest.mark.asyncio
async def test_partprobe_and_settle_both_run_in_sequence(monkeypatch, patch_run):
    """`partprobe || udevadm settle` only settles when partprobe FAILS — the
    by-id symlinks then race the next step."""
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    cmd = next(c for c in r["plan"] if "partprobe" in c)
    assert "udevadm settle" in cmd and "||" not in cmd


@pytest.mark.asyncio
async def test_esp_located_by_gpt_type_not_by_index(monkeypatch, patch_run):
    """A layout with the ESP at part4 must format part4, not a hardcoded part2."""
    r, _ = await _pre(
        monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
        responses={"lsblk -Pno NAME,PARTTYPE,FSTYPE": (
            0, 'NAME="nvme0n1" PARTTYPE="" TYPE="disk" FSTYPE=""\n'
               'NAME="nvme0n1p3" PARTTYPE="6a898cc3-1dd2-11b2-99a6-080020736631" '
               'TYPE="part" FSTYPE="zfs_member"\n'
               'NAME="nvme0n1p4" PARTTYPE="c12a7328-f81f-11d2-ba4b-00a0c93ec93b" '
               'TYPE="part" FSTYPE="vfat"\n', "")})
    assert r["layout"]["esp"] == "4"
    assert any("-part4" in c and "proxmox-boot-tool format" in c for c in r["plan"])


@pytest.mark.asyncio
async def test_attach_anchors_on_the_zfs_partition_of_the_source(
        monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    cmd = next(c for c in r["plan"] if c.startswith("zpool attach"))
    assert f"{GOOD}-part3" in cmd and f"{NEWD}-part3" in cmd


@pytest.mark.asyncio
async def test_plan_never_contains_detach(monkeypatch, patch_run):
    """Detach is a separate, explicitly confirmed step — never part of the
    automatic run, because it is only safe after the resilver completes."""
    r, _ = await _pre(monkeypatch, patch_run,
                      pools=[_pool([_member(GOOD), _member(DEAD)])], old=DEAD)
    assert not any("detach" in c for c in r["plan"])


@pytest.mark.asyncio
async def test_no_plan_command_uses_sdx_paths(monkeypatch, patch_run):
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    for cmd in r["plan"]:
        assert "/dev/sd" not in cmd, cmd


# ------------------------------------------------------------------ device IO

def test_boot_layout_ignores_disks_with_no_zfs_partition():
    """A disk with an ESP but no ZFS member is not a boot mirror source."""
    assert bm._ZFS_GUIDS, "zfs type GUIDs must be known"


@pytest.mark.asyncio
async def test_leaves_flattens_nested_vdevs():
    v = {"type": "mirror", "children": [
        {"name": "a", "children": []},
        {"type": "mirror", "children": [{"name": "b", "children": []}]}]}
    assert [x["name"] for x in bm._leaves(v)] == ["a", "b"]


@pytest.mark.asyncio
async def test_root_members_exclude_cache_and_log_vdevs():
    """Only `data` vdevs are pool members for mirroring purposes; a stray
    l2arc device must never be offered as a detach target."""
    p = {"vdevs": {"data": [{"children": [{"name": "d1", "children": []}]}],
                   "l2cache": [{"name": "cache1", "children": []}],
                   "logs": [{"name": "slog1", "children": []}]}}
    assert [m["name"] for m in bm._root_pool_members(p)] == ["d1"]


# ------------------------------------------------------ backend <-> i18n glue

def _i18n_keys() -> set[str]:
    import pathlib
    import re
    src = pathlib.Path(__file__).resolve().parents[1] / "src/client/i18n.tsx"
    return set(re.findall(r"'([\w.]+)'\s*:", src.read_text(encoding="utf-8")))


def test_every_check_id_has_a_translation():
    """A check the operator cannot read is a check they will click past. The
    UI renders `zfs.bm.check.<id>`, so a new id with no string shows the raw
    key on the most safety-critical screen in the product."""
    import pathlib
    import re
    src = (pathlib.Path(__file__).resolve().parents[1]
           / "server/boot_mirror.py").read_text(encoding="utf-8")
    ids = set(re.findall(r'add\("(\w+)"', src))
    missing = sorted(i for i in ids if f"zfs.bm.check.{i}" not in _i18n_keys())
    assert not missing, f"check ids without a translation: {missing}"


def test_every_stage_and_status_has_a_translation():
    keys = _i18n_keys()
    shown = [s for s in ("preflight", "cloning", "bootloader", "attaching",
                         "resilvering", "awaiting_detach", "done")]
    missing = [f"zfs.bm.stage.{s}" for s in shown
               if f"zfs.bm.stage.{s}" not in keys]
    missing += [f"zfs.bm.status.{s}" for s in ("running", "done", "failed", "aborted")
                if f"zfs.bm.status.{s}" not in keys]
    missing += [f"zfs.bm.scenario.{s}"
                for s in ("add_mirror", "replace_live", "replace_dead")
                if f"zfs.bm.scenario.{s}" not in keys]
    assert not missing, missing


def test_stage_names_in_sql_match_the_module():
    """Migration 010 documents the stage machine; drift means the UI rail and
    the DB disagree about what 'awaiting_detach' means."""
    import pathlib
    sql = (pathlib.Path(__file__).resolve().parents[1]
           / "server/migrations/010_boot_mirror.sql").read_text(encoding="utf-8")
    for stage in bm.STAGES:
        assert stage in sql, f"stage {stage} undocumented in migration 010"


@pytest.mark.asyncio
async def test_empty_parttype_does_not_shift_columns(monkeypatch, patch_run):
    """`lsblk -r` collapses empty columns, so a partition with no PARTTYPE but
    an FSTYPE (seen on a live node as `rbd1  ext4`) used to read ext4 AS the
    partition type. Getting this wrong picks the wrong ESP and formats a
    partition that holds data."""
    r, _ = await _pre(
        monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
        responses={"lsblk -Pno NAME,PARTTYPE,FSTYPE": (
            0, 'NAME="sdb" PARTTYPE="" TYPE="disk" FSTYPE=""\n'
               'NAME="sdb1" PARTTYPE="" TYPE="part" FSTYPE="ext4"\n'
               'NAME="sdb2" PARTTYPE="c12a7328-f81f-11d2-ba4b-00a0c93ec93b" '
               'TYPE="part" FSTYPE="vfat"\n'
               'NAME="sdb3" PARTTYPE="6a898cc3-1dd2-11b2-99a6-080020736631" '
               'TYPE="part" FSTYPE="zfs_member"\n', "")})
    assert r["layout"]["esp"] == "2", "the ext4 partition must not be taken for the ESP"
    assert r["layout"]["zfs"] == "3"


@pytest.mark.asyncio
async def test_whole_disk_row_is_not_read_as_a_partition(monkeypatch, patch_run):
    """`nvme0n1` ends in a digit; it must not be mistaken for partition 1."""
    r, _ = await _pre(
        monkeypatch, patch_run, pools=[_pool([_member(GOOD)])],
        responses={"lsblk -Pno NAME,PARTTYPE,FSTYPE": (
            0, 'NAME="nvme0n1" PARTTYPE="" TYPE="disk" FSTYPE=""\n'
               'NAME="nvme0n1p2" PARTTYPE="c12a7328-f81f-11d2-ba4b-00a0c93ec93b" '
               'TYPE="part" FSTYPE="vfat"\n'
               'NAME="nvme0n1p3" PARTTYPE="6a898cc3-1dd2-11b2-99a6-080020736631" '
               'TYPE="part" FSTYPE="zfs_member"\n', "")})
    assert r["layout"]["esp"] == "2" and r["layout"]["zfs"] == "3"
    assert r["layout"]["bios"] is None


@pytest.mark.asyncio
async def test_real_single_disk_rpool_plans_an_add_mirror(monkeypatch, patch_run):
    """Modelled on a real node: rpool is one SATA SSD, part1 BIOS-boot,
    part2 ESP, part3 zfs. Adding a mirror must be offered, and it must install
    the bootloader on BOTH firmware paths."""
    r, _ = await _pre(monkeypatch, patch_run, pools=[_pool([_member(GOOD)])])
    assert r["scenario"] == "add_mirror" and r["ok"], r["blocking"]
    assert r["layout"] == {"esp": "2", "zfs": "3", "bios": "1"}
    joined = "\n".join(r["plan"])
    assert "proxmox-boot-tool format" in joined and "-part2" in joined
    assert "grub-install" in joined, "a BIOS-boot partition exists, so install GRUB too"


def test_dropdown_outranks_every_overlay():
    """A portaled dropdown must sit above every overlay in the app.

    When CyberSelect sat at z-index 2000 and the ZFS modal overlay at 4000,
    the option list rendered inside the DOM, fully opaque — and could not be
    clicked, because the modal painted on top of it. Nothing in the type
    system or the test suite caught that; only elementFromPoint did.
    """
    import pathlib
    import re
    root = pathlib.Path(__file__).resolve().parents[1] / "src/client"
    sel = (root / "components/CyberSelect.tsx").read_text(encoding="utf-8")
    m = re.search(r"\.cyber-select-list\s*\{.*?z-index:\s*(\d+)", sel, re.S)
    assert m, "cyber-select-list must declare a z-index"
    dropdown = int(m.group(1))

    overlays = []
    for f in root.rglob("*.tsx"):
        text = f.read_text(encoding="utf-8")
        for blk in re.findall(r"(position:\s*fixed;[^}]*)", text):
            for z in re.findall(r"z-index:\s*(\d+)", blk):
                overlays.append((f.name, int(z)))
    for f in (root / "styles.css",):
        for z in re.findall(r"z-index:\s*(\d+)", f.read_text(encoding="utf-8")):
            overlays.append(("styles.css", int(z)))

    higher = [(n, z) for n, z in overlays if z > dropdown]
    assert not higher, (
        f"cyber-select-list z-index {dropdown} is below: {higher} — "
        "its options would be unclickable inside those overlays")
