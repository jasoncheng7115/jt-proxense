"""Turn `apt-get update && apt-get dist-upgrade -y` output into progress.

The host-upgrade orchestrator already streams every apt line into the node's
event log, which is complete but unreadable while it scrolls: an operator
watching a 15-minute dist-upgrade wants "configuring 41 / 57", not 900 lines.

apt-get writes no progress bar when stdout is not a TTY, but its plain output
is stable and line-oriented:

    Hit:1 http://download.proxmox.com/... InRelease          (update phase)
    57 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
    Need to get 312 MB of archives.
    Get:12 http://.../pve-manager_9.2.4_all.deb [1,234 kB]    (download)
    Fetched 312 MB in 21s (14.8 MB/s)
    Unpacking pve-manager (9.2.4) over (9.2.3) ...            (unpack)
    Setting up pve-manager (9.2.4) ...                        (configure)
    Processing triggers for man-db (2.11.2-2) ...
    Waiting for cache lock: Could not get lock /var/lib/dpkg/lock-frontend.
      It is held by process 1234 (unattended-upgr)... 12s

`Get:` lines also appear during `apt-get update` (index files); they only count
as package downloads once the "N upgraded, M newly installed" summary has been
seen. The percentage is an ESTIMATE weighted across the three phases, and it
never goes backwards.
"""
from __future__ import annotations

import re

_RE_SUMMARY = re.compile(
    r"^(\d+) upgraded, (\d+) newly installed, (\d+) to remove and (\d+) not upgraded")
_RE_NEED = re.compile(r"^Need to get ([\d.,]+ [kMG]?B)")
_RE_GET = re.compile(r"^Get:\d+ ")
_RE_FETCHED = re.compile(r"^Fetched ")
_RE_UNPACK = re.compile(r"^Unpacking (\S+)")
_RE_SETUP = re.compile(r"^Setting up (\S+)")
_RE_TRIGGER = re.compile(r"^Processing triggers for (\S+)")
_RE_HELD = re.compile(r"held by process (\d+)(?: \(([^)]+)\))?", re.I)

_W_DOWNLOAD, _W_UNPACK, _W_CONFIGURE = 0.3, 0.35, 0.35


class AptProgress:
    """Feed lines in order; `snapshot()` returns a JSON-safe dict."""

    def __init__(self) -> None:
        self.phase = "update"
        self.total = None            # packages being upgraded + newly installed
        self.download_size = None
        self.downloaded = 0
        self.unpacked = 0
        self.configured = 0
        self.current = None          # package name being worked on
        self.lock = None             # {"path", "pid", "holder"} while waiting
        self.nothing_to_do = False
        self._summary_seen = False
        self._percent = 0

    def feed(self, line: str) -> bool:
        """Consume one line. Returns True when the snapshot changed."""
        line = (line or "").strip()
        if not line:
            return False
        if "cache lock" in line.lower() or "could not get lock" in line.lower():
            held = _RE_HELD.search(line)
            path = re.search(r"(/var/\S+?)\.?(?:\s|$)", line)
            self.lock = {
                "path": path.group(1) if path else None,
                "pid": int(held.group(1)) if held else None,
                "holder": held.group(2) if held and held.group(2) else None,
            }
            self.phase = "lock_wait"
            return True
        m = _RE_SUMMARY.match(line)
        if m:
            self.total = int(m.group(1)) + int(m.group(2))
            self._summary_seen = True
            self.nothing_to_do = self.total == 0 and int(m.group(3)) == 0
            self.phase = "done" if self.nothing_to_do else "resolve"
            self.lock = None
            return True
        m = _RE_NEED.match(line)
        if m:
            self.download_size = m.group(1)
            return True
        if self._summary_seen and _RE_GET.match(line):
            self.downloaded += 1
            self.phase = "download"
            self.lock = None
            return True
        if self._summary_seen and _RE_FETCHED.match(line):
            if self.total:
                self.downloaded = max(self.downloaded, self.total)
            return True
        m = _RE_UNPACK.match(line)
        if m:
            self.unpacked += 1
            self.current = m.group(1).split(":")[0]
            self.phase = "unpack"
            self.lock = None
            return True
        m = _RE_SETUP.match(line)
        if m:
            self.configured += 1
            self.current = m.group(1).split(":")[0]
            self.phase = "configure"
            self.lock = None
            return True
        m = _RE_TRIGGER.match(line)
        if m and self.phase in ("unpack", "configure", "triggers"):
            self.current = m.group(1).split(":")[0]
            self.phase = "triggers"
            return True
        return False

    def finish(self, ok: bool) -> None:
        self.phase = "done" if ok else "failed"
        self.lock = None
        if ok:
            self._percent = 100

    def percent(self) -> int | None:
        if self.phase == "done":
            return 100
        if not self.total:
            return None if not self._summary_seen else self._percent
        t = float(self.total)
        p = (_W_DOWNLOAD * min(self.downloaded, t) / t
             + _W_UNPACK * min(self.unpacked, t) / t
             + _W_CONFIGURE * min(self.configured, t) / t)
        self._percent = max(self._percent, min(99, int(p * 100)))
        return self._percent

    def snapshot(self) -> dict:
        return {
            "phase": self.phase,
            "total": self.total,
            "download_size": self.download_size,
            "downloaded": self.downloaded,
            "unpacked": self.unpacked,
            "configured": self.configured,
            "current": self.current,
            "lock": self.lock,
            "percent": self.percent(),
        }
