"""runtime_guard: a changed system Python is explained, not crash-looped."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import pytest

from server import runtime_guard as g

ROOT = Path(__file__).resolve().parent.parent


def test_all_present_is_silent():
    assert g.missing_module() is None
    g.ensure_dependencies()                    # returns, no exit


def test_missing_dependency_exits_78_with_the_fix(monkeypatch, capsys, tmp_path):
    # The recorded version must DIFFER from the running one, or the guard
    # (correctly) reports "missing" rather than "the Python changed". This used
    # 3.10, which is exactly what CI's 3.10 leg runs, so it failed only there.
    rec = tmp_path / ".python-runtime"
    rec.write_text("version=3.9\nexecutable=/usr/bin/python3.9\n")
    monkeypatch.setattr(g, "RUNTIME_FILE", rec)
    monkeypatch.setattr(g, "REQUIRED", ("aiohttp", "jtp_definitely_not_installed"))
    with pytest.raises(SystemExit) as ei:
        g.ensure_dependencies()
    assert ei.value.code == g.EXIT_CODE == 78
    err = capsys.readouterr().err
    assert "jtp_definitely_not_installed" in err
    assert "installed for Python 3.9 (/usr/bin/python3.9)" in err
    assert g.REINSTALL in err and g.HELP_URL in err


def test_same_version_reports_missing_not_changed(monkeypatch, capsys, tmp_path):
    """The other branch: deps recorded for the version that is running now."""
    rec = tmp_path / ".python-runtime"
    rec.write_text("version=%d.%d\n" % sys.version_info[:2])
    monkeypatch.setattr(g, "RUNTIME_FILE", rec)
    monkeypatch.setattr(g, "REQUIRED", ("jtp_definitely_not_installed",))
    with pytest.raises(SystemExit):
        g.ensure_dependencies()
    err = capsys.readouterr().err
    assert "missing or incomplete" in err and "Python changed" not in err


def test_same_version_does_not_claim_an_os_upgrade():
    msg = g.explain("aiohttp", {"version": "3.12"}, "3.12", "/usr/bin/python3")
    assert "changed underneath" not in msg and "missing or incomplete" in msg


def test_no_record_from_an_older_install_still_says_what_to_do(monkeypatch, tmp_path):
    monkeypatch.setattr(g, "RUNTIME_FILE", tmp_path / "absent")
    assert g.recorded() is None
    msg = g.explain("yaml", None, "3.12", "/usr/bin/python3")
    assert g.REINSTALL in msg


def test_guard_needs_only_the_standard_library():
    """It must load in an interpreter that has none of the dependencies."""
    code = ("import sys, builtins\n"
            "real = builtins.__import__\n"
            "deps = {'aiohttp','yaml','aiosqlite','cryptography','asyncssh','argon2','pyotp'}\n"
            "def guard(name, *a, **k):\n"
            "    if name.split('.')[0] in deps: raise ImportError(name)\n"
            "    return real(name, *a, **k)\n"
            "builtins.__import__ = guard\n"
            f"sys.path.insert(0, {str(ROOT)!r})\n"
            "import server.runtime_guard as g\n"
            "print('loaded')\n")
    r = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True)
    assert r.returncode == 0 and r.stdout.strip() == "loaded", r.stderr


def test_unit_stops_instead_of_looping_on_exit_78():
    unit = next(p for p in (ROOT / "packaging", ROOT / "github" / "packaging")
                if p.exists()) / "jt-proxense.service"
    directives = dict(l.split("=", 1) for l in unit.read_text().splitlines()
                      if "=" in l and not l.lstrip().startswith("#"))
    assert str(g.EXIT_CODE) in directives.get("RestartPreventExitStatus", "").split()


def test_help_anchor_exists_in_both_languages():
    docs = next(p for p in (ROOT / "docs", ROOT / "github" / "docs")
                if (p / "troubleshooting.html").exists())
    anchor = g.HELP_URL.split("#", 1)[1]
    for page in ("troubleshooting.html", "troubleshooting.zh-tw.html"):
        assert f'id="{anchor}"' in (docs / page).read_text(), page
