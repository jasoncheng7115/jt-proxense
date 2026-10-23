"""The installer's Python-runtime helpers, executed for real in bash.

Why these exist: the installer used to pick the newest VERSIONED interpreter
(e.g. python3.10) and write it into the systemd unit. An OS release upgrade
(Ubuntu 22.04 -> 24.04) removes that binary, so the service could not even
start to explain itself; and the CLI, run by `env python3`, used a different
interpreter than the one the dependencies were installed for (always so on
RHEL, where python3 is 3.9). These tests run the helper functions extracted
from install.sh against stub interpreters — behaviour, not source text.
"""
from __future__ import annotations

import os
import re
import stat
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
INSTALL = next(p for p in (ROOT / "install.sh", ROOT / "github" / "install.sh") if p.exists())


def helpers() -> str:
    text = INSTALL.read_text()
    m = re.search(r"# BEGIN python-runtime helpers\n(.*?)# END python-runtime helpers",
                  text, re.S)
    assert m, "install.sh lost its python-runtime helper block"
    return m.group(1)


def stub_python(bindir: Path, name: str, version: str) -> Path:
    """A fake interpreter that answers the version probe and nothing else."""
    p = bindir / name
    p.write_text(f'#!/bin/sh\necho "{version}"\n')
    p.chmod(0o755)
    return p


def run(script: str, path: str, cwd: Path) -> subprocess.CompletedProcess:
    env = {"PATH": path, "HOME": str(cwd)}
    return subprocess.run(["/bin/bash", "-c", helpers() + "\n" + script],
                          env=env, cwd=cwd, capture_output=True, text=True)


def bash_path(bindir: Path) -> str:
    # stubs first, then just enough of the system for the helpers themselves
    return f"{bindir}:/usr/bin:/bin"


@pytest.fixture
def bindir(tmp_path):
    d = tmp_path / "bin"
    d.mkdir()
    # Shadow every real interpreter the system may have, so only stubs answer.
    for v in ("python3", "python3.10", "python3.11", "python3.12", "python3.13"):
        (d / v).write_text("#!/bin/sh\nexit 127\n")
        (d / v).chmod(0o755)
    return d


def test_prefers_python3_when_it_is_new_enough(bindir, tmp_path):
    """Debian/Ubuntu: python3 is 3.12 and python3.12 exists too. The unit must
    end up with the stable /usr/bin/python3, so pick python3."""
    stub_python(bindir, "python3", "3.12")
    stub_python(bindir, "python3.12", "3.12")
    stub_python(bindir, "python3.13", "3.13")
    r = run("pick_python", bash_path(bindir), tmp_path)
    assert r.returncode == 0 and r.stdout.strip() == "python3 3.12"


def test_falls_back_to_newest_versioned_when_python3_is_old(bindir, tmp_path):
    """RHEL/Rocky 9: python3 is 3.9, python3.11 and 3.12 installed."""
    stub_python(bindir, "python3", "3.9")
    stub_python(bindir, "python3.11", "3.11")
    stub_python(bindir, "python3.12", "3.12")
    r = run("pick_python", bash_path(bindir), tmp_path)
    assert r.stdout.strip() == "python3.12 3.12"


def test_no_suitable_python_fails(bindir, tmp_path):
    stub_python(bindir, "python3", "3.8")
    r = run("pick_python", bash_path(bindir), tmp_path)
    assert r.returncode != 0 and r.stdout.strip() == ""


def test_cli_wrapper_runs_the_chosen_interpreter(tmp_path):
    cli = tmp_path / "jt-proxense-cli.py"
    cli.write_text("print('cli body')\n")
    py = tmp_path / "py"
    py.write_text('#!/bin/sh\necho "py=$0 args=$*"\n')
    py.chmod(0o755)
    dest = tmp_path / "jt-proxense"
    r = run(f'install_cli_wrapper "{dest}" "{py}" "{cli}" && "{dest}" user list --x "a b"',
            "/usr/bin:/bin", tmp_path)
    assert r.returncode == 0, r.stderr
    assert r.stdout.strip() == f"py={py} args={cli} user list --x a b"
    assert dest.stat().st_mode & stat.S_IXUSR


def test_cli_wrapper_replaces_an_old_symlink_without_writing_through_it(tmp_path):
    """Pre-v1.2.0 installs left /usr/local/bin/jt-proxense as a SYMLINK to
    bin/jt-proxense. Writing the wrapper through it would overwrite the CLI
    itself with a three-line shell script."""
    cli = tmp_path / "jt-proxense-cli.py"
    cli.write_text("#!/usr/bin/env python3\nprint('the real CLI')\n")
    dest = tmp_path / "jt-proxense"
    dest.symlink_to(cli)
    r = run(f'install_cli_wrapper "{dest}" /usr/bin/python3 "{cli}"', "/usr/bin:/bin", tmp_path)
    assert r.returncode == 0, r.stderr
    assert not dest.is_symlink()
    assert cli.read_text() == "#!/usr/bin/env python3\nprint('the real CLI')\n"
    assert dest.read_text().startswith("#!/bin/sh")


def test_record_python_runtime_is_what_the_guard_reads(tmp_path, monkeypatch):
    real = tmp_path / "python3.10"
    real.write_text('#!/bin/sh\necho "3.10"\n')
    real.chmod(0o755)
    link = tmp_path / "python3"
    link.symlink_to(real)
    out = tmp_path / ".python-runtime"
    r = run(f'record_python_runtime "{out}" "{link}"', "/usr/bin:/bin", tmp_path)
    assert r.returncode == 0, r.stderr
    assert oct(out.stat().st_mode & 0o777) == "0o644"
    from server import runtime_guard
    monkeypatch.setattr(runtime_guard, "RUNTIME_FILE", out)
    # the REAL path is recorded, so the message can name python3.10, not python3
    assert runtime_guard.recorded() == {"version": "3.10", "executable": str(real)}


# ---------- ensure_venv: the dependencies live in $INSTALL_DIR/.venv ----------
# Why a venv at all: on Ubuntu 26.04 the newest asyncssh needs cryptography >= 48
# and the distro ships 46 as a Debian package, which pip cannot uninstall ("no
# RECORD file"), so installing into the system Python died at step 5.

def stub_venv_maker(tmp_path: Path, version: str, ok: bool = True) -> Path:
    """A fake base interpreter: `-m venv DIR` lays out what a venv needs here."""
    p = tmp_path / f"base-python-{version}"
    if ok:
        p.write_text(f"""#!/bin/sh
[ "$1" = "-m" ] && [ "$2" = "venv" ] || exit 9
mkdir -p "$3/bin"
printf 'home = /usr/bin\\nversion = {version}.4\\n' > "$3/pyvenv.cfg"
printf '#!/bin/sh\\nexit 0\\n' > "$3/bin/python3"; chmod +x "$3/bin/python3"
""")
    else:  # what Debian does without python3-venv: half a venv, then failure
        p.write_text('#!/bin/sh\nmkdir -p "$3/bin"; echo "ensurepip is not available" >&2; exit 1\n')
    p.chmod(0o755)
    return p


def test_venv_created_then_reused(tmp_path):
    venv = tmp_path / ".venv"
    base = stub_venv_maker(tmp_path, "3.14")
    r = run(f'ensure_venv "{venv}" "{base}" 3.14', "/usr/bin:/bin", tmp_path)
    assert (r.returncode, r.stdout.strip()) == (0, "created"), r.stderr
    (venv / "marker").write_text("installed deps")
    r = run(f'ensure_venv "{venv}" "{base}" 3.14', "/usr/bin:/bin", tmp_path)
    assert (r.returncode, r.stdout.strip()) == (0, "reused")
    assert (venv / "marker").exists(), "a healthy venv must not be rebuilt on every run"


def test_venv_rebuilt_after_python_version_change(tmp_path):
    """OS release upgrade: the venv was built for 3.12, python3 is now 3.14.
    Its bin/python3 still RUNS (it links to /usr/bin/python3), so only the
    recorded version can tell — and its site-packages are for the wrong one."""
    venv = tmp_path / ".venv"
    run(f'ensure_venv "{venv}" "{stub_venv_maker(tmp_path, "3.12")}" 3.12', "/usr/bin:/bin", tmp_path)
    (venv / "marker").write_text("deps for 3.12")
    r = run(f'ensure_venv "{venv}" "{stub_venv_maker(tmp_path, "3.14")}" 3.14', "/usr/bin:/bin", tmp_path)
    assert (r.returncode, r.stdout.strip()) == (0, "created")
    assert not (venv / "marker").exists()
    assert "version = 3.14" in (venv / "pyvenv.cfg").read_text()


def test_venv_rebuilt_when_its_interpreter_is_gone(tmp_path):
    venv = tmp_path / ".venv"
    base = stub_venv_maker(tmp_path, "3.12")
    run(f'ensure_venv "{venv}" "{base}" 3.12', "/usr/bin:/bin", tmp_path)
    (venv / "bin" / "python3").unlink()
    (venv / "bin" / "python3").symlink_to(tmp_path / "removed-by-upgrade")
    r = run(f'ensure_venv "{venv}" "{base}" 3.12', "/usr/bin:/bin", tmp_path)
    assert r.stdout.strip() == "created"


def test_venv_failure_leaves_nothing_that_looks_reusable(tmp_path):
    venv = tmp_path / ".venv"
    r = run(f'ensure_venv "{venv}" "{stub_venv_maker(tmp_path, "3.12", ok=False)}" 3.12',
            "/usr/bin:/bin", tmp_path)
    assert r.returncode == 1
    assert not venv.exists()


def test_venv_refuses_to_delete_anything_but_a_dot_venv(tmp_path):
    victim = tmp_path / "opt-jt-proxense"
    victim.mkdir()
    (victim / "run.py").write_text("code")
    r = run(f'ensure_venv "{victim}" "{stub_venv_maker(tmp_path, "3.12")}" 3.12',
            "/usr/bin:/bin", tmp_path)
    assert r.returncode == 2
    assert (victim / "run.py").read_text() == "code"


def test_venv_reads_a_real_pyvenv_cfg(tmp_path):
    """The version parse against what `python -m venv` actually writes."""
    import sys
    base = Path(getattr(sys, "_base_executable", sys.executable))
    probe = subprocess.run([str(base), "-c", "import venv, ensurepip"], capture_output=True)
    if probe.returncode != 0:
        pytest.skip("this interpreter cannot create venvs")
    ver = "%d.%d" % sys.version_info[:2]
    venv = tmp_path / ".venv"
    r1 = run(f'ensure_venv "{venv}" "{base}" {ver}', "/usr/bin:/bin", tmp_path)
    r2 = run(f'ensure_venv "{venv}" "{base}" {ver}', "/usr/bin:/bin", tmp_path)
    assert (r1.stdout.strip(), r2.stdout.strip()) == ("created", "reused"), r1.stderr + r2.stderr


# ---------- the pip floor (eMudhra / emSign CA compromise, October 2026) ----------

@pytest.mark.parametrize("have,need,ok", [
    ("26.2.2", "26.2.2", True), ("26.10", "26.2.2", True), ("27.0", "26.2.2", True),
    ("26.2.1", "26.2.2", False), ("25.1.1", "26.2.2", False), ("", "26.2.2", False),
])
def test_version_at_least(tmp_path, have, need, ok):
    r = run(f'version_at_least "{have}" "{need}"', "/usr/bin:/bin", tmp_path)
    assert (r.returncode == 0) is ok


def test_pip_floor_and_certifi_floor_agree_with_the_advisory():
    """pip < 26.2.2 and certifi < 2026.10.19 still trust the leaked chains."""
    text = INSTALL.read_text()
    m = re.search(r'^PIP_MIN="([0-9.]+)"', text, re.M)
    assert m, "install.sh lost PIP_MIN"
    assert tuple(map(int, m.group(1).split("."))) >= (26, 2, 2)
    req = next(p for p in (ROOT / "requirements.txt", ROOT / "github" / "requirements.txt") if p.exists())
    m = re.search(r"^certifi>=([0-9.]+)", req.read_text(), re.M)
    assert m and tuple(map(int, m.group(1).split("."))) >= (2026, 10, 19)
