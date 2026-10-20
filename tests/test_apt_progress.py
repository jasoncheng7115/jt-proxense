"""apt-get (non-TTY) output → structured progress for the host-upgrade UI."""
from __future__ import annotations

from server.apt_progress import AptProgress
from server import host_upgrade

UPDATE = """\
Hit:1 http://security.debian.org/debian-security trixie-security InRelease
Get:2 http://download.proxmox.com/debian/pve trixie InRelease [2,771 B]
Get:3 http://download.proxmox.com/debian/pve trixie/pve-no-subscription amd64 Packages [612 kB]
Fetched 615 kB in 1s (512 kB/s)
Reading package lists...
"""

UPGRADE = """\
Reading package lists...
Building dependency tree...
Reading state information...
Calculating upgrade...
The following packages will be upgraded:
  libpve-common-perl pve-manager qemu-server
3 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Need to get 5,321 kB of archives.
After this operation, 12.3 kB of additional disk space will be used.
Get:1 http://download.proxmox.com/debian/pve trixie/pve-no-subscription amd64 libpve-common-perl all 9.0.11 [210 kB]
Get:2 http://download.proxmox.com/debian/pve trixie/pve-no-subscription amd64 pve-manager all 9.2.4 [4,800 kB]
Get:3 http://download.proxmox.com/debian/pve trixie/pve-no-subscription amd64 qemu-server amd64 9.0.23 [311 kB]
Fetched 5,321 kB in 1s (6,012 kB/s)
(Reading database ... 71234 files and directories currently installed.)
Preparing to unpack .../libpve-common-perl_9.0.11_all.deb ...
Unpacking libpve-common-perl (9.0.11) over (9.0.10) ...
Preparing to unpack .../pve-manager_9.2.4_all.deb ...
Unpacking pve-manager (9.2.4) over (9.2.3) ...
Processing triggers for man-db (2.13.1-1) ...
Preparing to unpack .../qemu-server_9.0.23_amd64.deb ...
Unpacking qemu-server (9.0.23) over (9.0.22) ...
Setting up libpve-common-perl (9.0.11) ...
Setting up qemu-server (9.0.23) ...
Setting up pve-manager (9.2.4) ...
Processing triggers for pve-ha-manager (5.0.4) ...
"""


def run(text, p=None):
    p = p or AptProgress()
    seen = []
    for line in text.splitlines():
        p.feed(line)
        seen.append(p.snapshot())
    return p, seen


def test_update_phase_get_lines_are_not_package_downloads():
    p, _ = run(UPDATE)
    s = p.snapshot()
    assert s["phase"] == "update" and s["downloaded"] == 0 and s["total"] is None
    assert s["percent"] is None                      # nothing to estimate yet


def test_full_run_counts_and_phases():
    p, seen = run(UPDATE + UPGRADE)
    s = p.snapshot()
    assert s["total"] == 3 and s["download_size"] == "5,321 kB"
    assert s["downloaded"] == 3 and s["unpacked"] == 3 and s["configured"] == 3
    phases = [x["phase"] for x in seen]
    for ph in ("update", "resolve", "download", "unpack", "configure", "triggers"):
        assert ph in phases, ph
    assert phases.index("download") < phases.index("unpack") < phases.index("configure")
    assert s["current"] == "pve-ha-manager"


def test_percent_is_monotonic_and_not_100_until_finished():
    p, seen = run(UPDATE + UPGRADE)
    pct = [x["percent"] for x in seen if x["percent"] is not None]
    assert pct == sorted(pct)
    assert max(pct) <= 99
    p.finish(True)
    assert p.snapshot()["percent"] == 100 and p.snapshot()["phase"] == "done"


def test_triggers_mid_unpack_do_not_jump_ahead():
    p, seen = run(UPGRADE)
    at_trigger = next(x for x in seen if x["phase"] == "triggers")
    assert at_trigger["percent"] < 70


def test_lock_wait_is_reported_with_holder():
    p = AptProgress()
    p.feed("Waiting for cache lock: Could not get lock /var/lib/dpkg/lock-frontend. "
           "It is held by process 4242 (unattended-upgr)... 17s")
    s = p.snapshot()
    assert s["phase"] == "lock_wait"
    assert s["lock"] == {"path": "/var/lib/dpkg/lock-frontend", "pid": 4242,
                         "holder": "unattended-upgr"}
    run(UPGRADE, p)
    assert p.snapshot()["lock"] is None               # cleared once work resumes


def test_nothing_to_upgrade_is_done_at_once():
    p = AptProgress()
    p.feed("0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.")
    assert p.snapshot()["phase"] == "done" and p.snapshot()["percent"] == 100


def test_failure_marks_failed():
    p, _ = run(UPGRADE.splitlines()[0] + "\n" + "3 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.")
    p.finish(False)
    assert p.snapshot()["phase"] == "failed"


def test_apt_command_waits_for_lock_on_both_invocations():
    cmd = host_upgrade.APT_CMD
    upd, _, dist = cmd.partition("&&")
    assert "DPkg::Lock::Timeout=" in upd and "update" in upd
    assert "DPkg::Lock::Timeout=" in dist and "dist-upgrade" in dist
    # the non-interactive guarantees must survive the edit
    for must in ("DEBIAN_FRONTEND=noninteractive", "NEEDRESTART_MODE=a",
                 "UCF_FORCE_CONFOLD=1", "--force-confdef", "--force-confold", "-y"):
        assert must in dist, must
