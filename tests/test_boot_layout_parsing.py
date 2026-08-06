"""`lsblk -r` collapses empty columns; this parser must not be fooled by it.

CLAUDE.md #17. Raw mode drops empty fields, so a partition with no PARTTYPE but
an FSTYPE emits `rbd1  ext4` and a positional parse reads `ext4` AS the
partition type. This code chooses which partition gets formatted as vfat during
a boot-disk replace, so a wrong answer destroys data.

The parse used to exist TWICE -- once in boot_mirror.py and once in
zfs_admin.py. boot_mirror was moved to `-P` when this was found; zfs_admin was
left parsing positionally. There is now one implementation and these tests
exercise it directly, against captured output rather than a live node.
"""
import pytest

from server.zfs_admin import parse_boot_layout

ESP = "c12a7328-f81f-11d2-ba4b-00a0c93ec93b"
ZFS = "6a898cc3-1dd2-11b2-99a6-080020736631"
BIOS = "21686148-6449-6e6f-744e-656564454649"


def test_standard_pve_root_layout():
    out = (
        'NAME="sdb" PARTTYPE="" FSTYPE="" TYPE="disk"\n'
        f'NAME="sdb1" PARTTYPE="{BIOS}" FSTYPE="" TYPE="part"\n'
        f'NAME="sdb2" PARTTYPE="{ESP}" FSTYPE="vfat" TYPE="part"\n'
        f'NAME="sdb3" PARTTYPE="{ZFS}" FSTYPE="zfs_member" TYPE="part"\n'
    )
    assert parse_boot_layout(out) == {"esp": "2", "zfs": "3", "bios": "1"}


def test_a_partition_with_no_parttype_does_not_shift_the_columns():
    """The exact shape seen on a live node: FSTYPE present, PARTTYPE empty.

    Under `-r` this row arrives as two fields and the FSTYPE lands in the
    PARTTYPE slot. With `-P` each field is named, so an empty one stays empty.
    """
    out = (
        'NAME="sdb" PARTTYPE="" FSTYPE="" TYPE="disk"\n'
        'NAME="sdb1" PARTTYPE="" FSTYPE="ext4" TYPE="part"\n'
        f'NAME="sdb2" PARTTYPE="{ESP}" FSTYPE="vfat" TYPE="part"\n'
        'NAME="sdb3" PARTTYPE="" FSTYPE="zfs_member" TYPE="part"\n'
    )
    got = parse_boot_layout(out)
    assert got["esp"] == "2", f"ESP misidentified: {got}"
    assert got["zfs"] == "3", f"ZFS member misidentified: {got}"


def test_whole_nvme_disk_is_not_mistaken_for_partition_one():
    """`nvme0n1` is the DISK. Its name ends in a digit, so deriving a partition
    number from trailing digits reads it as partition 1 -- and this disk
    carries an FSTYPE, so it would win the zfs_member branch."""
    out = (
        'NAME="nvme0n1" PARTTYPE="" FSTYPE="zfs_member" TYPE="disk"\n'
        f'NAME="nvme0n1p2" PARTTYPE="{ESP}" FSTYPE="vfat" TYPE="part"\n'
        f'NAME="nvme0n1p3" PARTTYPE="{ZFS}" FSTYPE="zfs_member" TYPE="part"\n'
    )
    got = parse_boot_layout(out)
    assert got["zfs"] == "3", f"whole disk leaked in: {got}"
    assert got["esp"] == "2"


def test_esp_is_not_assumed_to_be_partition_two():
    """PVE's default is ESP on part2, but hand-built layouts differ and
    formatting the wrong one as vfat wrecks it."""
    out = (
        f'NAME="sda1" PARTTYPE="{ZFS}" FSTYPE="zfs_member" TYPE="part"\n'
        f'NAME="sda5" PARTTYPE="{ESP}" FSTYPE="vfat" TYPE="part"\n'
    )
    assert parse_boot_layout(out) == {"esp": "5", "zfs": "1", "bios": None}


def test_no_partitions_yields_no_roles():
    assert parse_boot_layout("") == {"esp": None, "zfs": None, "bios": None}
    only_disk = 'NAME="sdc" PARTTYPE="" FSTYPE="" TYPE="disk"\n'
    assert parse_boot_layout(only_disk)["zfs"] is None


@pytest.mark.parametrize("mod", ["zfs_admin", "boot_mirror"])
def test_neither_module_still_parses_raw_lsblk(mod):
    import importlib
    import inspect

    src = inspect.getsource(importlib.import_module(f"server.{mod}"))
    assert "lsblk -rno NAME,PARTTYPE" not in src, (
        f"{mod} is back to positional parsing of `lsblk -r`")
