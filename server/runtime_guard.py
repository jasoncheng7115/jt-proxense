"""Fail with instructions, not a traceback, when the Python dependencies are gone.

The installer puts the dependencies into a virtual environment built from the
system python3 (since v1.2.0; before that, into the system interpreter itself).
An operating-system release upgrade (Ubuntu 22.04 -> 24.04, Debian 12 -> 13)
replaces that interpreter with a newer minor version, which looks in a different
site-packages directory: every dependency "disappears" at once. What the
operator then sees is `ModuleNotFoundError: No module named 'aiohttp'` in a
restart loop — accurate, and no help at all.

This module runs FIRST, before anything outside the standard library is
imported, and turns that into a statement of what changed and the one command
that fixes it. The installer records which interpreter the dependencies were
installed for in `<install dir>/.python-runtime`; when that file is missing (an
install made before v1.2.0) the message still says what to do.

Only `importlib.util.find_spec` is used, so the check imports nothing and costs
next to nothing on every CLI invocation.
"""
from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

RUNTIME_FILE = Path(__file__).resolve().parent.parent / ".python-runtime"

# sysexits.h EX_CONFIG. The systemd unit lists it in RestartPreventExitStatus,
# so a missing dependency stops the service once instead of crash-looping:
# restarting cannot install a package.
EXIT_CODE = 78

REINSTALL = ("curl -fsSL https://raw.githubusercontent.com/jasoncheng7115/"
             "jt-proxense/main/install.sh | sudo bash")
HELP_URL = ("https://jasoncheng7115.github.io/jt-proxense/"
            "troubleshooting.html#python-changed")

# Import names, not distribution names. Enough to detect "the dependencies are
# not installed for this interpreter" — that is all-or-nothing in practice.
REQUIRED = ("aiohttp", "yaml", "aiosqlite", "cryptography", "asyncssh",
            "argon2", "pyotp")


def recorded() -> dict | None:
    """{'version': '3.10', 'executable': '/usr/bin/python3.10'} or None."""
    try:
        text = RUNTIME_FILE.read_text()
    except OSError:
        return None
    out = {}
    for line in text.splitlines():
        key, sep, value = line.partition("=")
        if sep and key.strip() in ("version", "executable"):
            out[key.strip()] = value.strip()
    return out if out.get("version") else None


def missing_module(modules=None) -> str | None:
    for name in (REQUIRED if modules is None else modules):
        try:
            if importlib.util.find_spec(name) is None:
                return name
        except (ImportError, ValueError):
            return name
    return None


def explain(module: str, rec: dict | None,
            version: str | None = None, executable: str | None = None) -> str:
    """The message for a missing dependency. `version` is MAJOR.MINOR — the
    unit a dependency install is tied to; it defaults to the running one."""
    version = version or "%d.%d" % sys.version_info[:2]
    executable = executable or sys.executable
    lines = [
        f"jt-proxense: the Python package '{module}' is not installed for this "
        f"interpreter: Python {version} ({executable}).",
    ]
    if rec and rec.get("version") and rec["version"] != version:
        lines += [
            f"The dependencies were installed for Python {rec['version']}"
            + (f" ({rec['executable']})" if rec.get("executable") else "") + ".",
            "The system Python changed underneath this install, usually through an "
            "operating-system upgrade (for example Ubuntu 22.04 -> 24.04, or "
            "Debian 12 -> 13).",
        ]
    else:
        lines.append("The dependencies are missing or incomplete for this interpreter.")
    lines += [
        "Fix: run the installer again. It installs the dependencies for the "
        "current Python and keeps your configuration, users and data:",
        f"  {REINSTALL}",
        f"More: {HELP_URL}",
    ]
    return "\n".join(lines) + "\n"


def ensure_dependencies() -> None:
    """Exit with EXIT_CODE and an explanation if a dependency is missing."""
    module = missing_module()
    if module is None:
        return
    sys.stderr.write(explain(module, recorded()))
    sys.stderr.flush()
    raise SystemExit(EXIT_CODE)
