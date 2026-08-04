"""Regression tests for issue #2 (host shell broken in v0.9.3).

Two independent bugs, both of which left the terminal stuck on "opening host
shell bridge" with nothing useful in the log:

  1. host_shell.py read `cluster.client.auth.username`. PVEAuthConfig is a
     dataclass declaring `user`, so every call raised AttributeError.

  2. The page only recognised the PVE auth ack ('O') when it arrived as a TEXT
     frame. The bridge forwards whichever frame type PVE sent and binaryType is
     'arraybuffer', so a binary ack surfaced as an ArrayBuffer and the check
     silently failed.

console_term_page.py had (2) right all along -- the two copies of the same
handshake diverged, which is why this is tested for BOTH pages rather than
just the one that broke.
"""
import re
from pathlib import Path

import pytest

SERVER = Path(__file__).resolve().parent.parent / "server"
HOST_SHELL = (SERVER / "host_shell.py").read_text()
TERM_PAGE = (SERVER / "console_term_page.py").read_text()


def test_pve_auth_config_has_user_not_username():
    """Pin the field name this bug was about, from the producer's side."""
    from server.config import PVEAuthConfig

    cfg = PVEAuthConfig()
    assert cfg.user == "root@pam"
    assert not hasattr(cfg, "username")


def test_host_shell_reads_the_field_that_exists():
    """Asserting the attribute ACCESS is unavoidable here -- the failure is a
    name lookup on a dataclass, which no runtime value can stand in for."""
    assert "auth.username" not in HOST_SHELL
    assert "auth.user " in HOST_SHELL or "auth.user " in HOST_SHELL.replace(
        "auth.user or", "auth.user ")


def _run_handshake(src: str, name: str, payload_js: str) -> dict:
    """Extract the WebSocket message handler and ACTUALLY RUN IT in node.

    The first version of this test grepped for `new Uint8Array(data)` and for
    `setStatus('error')`. Both strings already existed elsewhere in the file --
    the post-auth write path and the socket error listener -- so the tests
    passed against the broken code and pinned nothing. Asserting on source text
    is how a bug gets locked in place (CLAUDE.md #15); the handler has to be
    executed against a real ArrayBuffer.
    """
    import json, re, shutil, subprocess, tempfile

    node = shutil.which("node")
    if not node:
        pytest.skip("node not installed")

    m = re.search(r"socket\.addEventListener\(\s*'message',\s*\((\w+)\)\s*=>\s*\{(.*?)\n    \}\);",
                  src, re.S)
    assert m, f"{name}: could not locate the message handler"
    arg, body = m.group(1), m.group(2)

    harness = """
let authed = false, status = null, statusMsg = null, closed = false, written = [];
const I18N = {};
const setStatus = (s, m) => { status = s; statusMsg = m === undefined ? null : String(m); };
const overlay = { classList: { add() {}, remove() {} } };
const recon = {}, full = {}, fs = {};
const fitAddon = { fit() {} };
const term = { cols: 80, rows: 24, write(d) { written.push(String(d)); },
               onData() {}, onResize() {}, focus() {} };
const socket = { close() { closed = true; }, send() {} };
const pveSendResize = () => {}, pveSendStdin = () => {};
const handler = (%s) => {%s};
handler({ data: %s });
console.log(JSON.stringify({ authed, status, statusMsg, closed }));
""" % (arg, body, payload_js)

    with tempfile.NamedTemporaryFile("w", suffix=".mjs", delete=False) as f:
        f.write(harness)
        path = f.name
    r = subprocess.run([node, path], capture_output=True)
    assert r.returncode == 0, f"{name}: {r.stderr.decode()[:600]}"
    return json.loads(r.stdout.decode().strip().splitlines()[-1])


@pytest.mark.parametrize("name,src", [("host_shell", HOST_SHELL),
                                      ("console_term_page", TERM_PAGE)])
def test_handshake_accepts_a_text_ack(name, src):
    out = _run_handshake(src, name, "'O'")
    assert out["authed"] is True, out


@pytest.mark.parametrize("name,src", [("host_shell", HOST_SHELL),
                                      ("console_term_page", TERM_PAGE)])
def test_rejected_handshake_is_reported_not_swallowed(name, src):
    """A refusal must not be indistinguishable from a slow connect."""
    out = _run_handshake(src, name, "'permission denied'")
    assert out["authed"] is False, out
    assert out["status"] == "error", out


@pytest.mark.parametrize("name,src", [("host_shell", HOST_SHELL),
                                      ("console_term_page", TERM_PAGE)])
def test_handshake_accepts_a_binary_ack(name, src):
    """Issue #2: Chrome delivered the ack as ArrayBuffer [79], and the page --
    which only handled strings -- sat on "opening bridge" forever.

    Runs the real handler against a real ArrayBuffer. An earlier version of
    this test merely grepped for `new Uint8Array(data)`, which already appeared
    in the post-auth write path, so it passed against the broken code.
    """
    assert "binaryType = 'arraybuffer'" in src, name
    out = _run_handshake(src, name, "new Uint8Array([79]).buffer")
    assert out["authed"] is True, out


@pytest.mark.parametrize("name,src", [("host_shell", HOST_SHELL),
                                      ("console_term_page", TERM_PAGE)])
def test_embedded_javascript_parses(name, src):
    """console_page.py-style templates interpret \\n in the Python source, which
    silently breaks the script (CLAUDE.md recurring mistake #4). Parse it."""
    import shutil
    import subprocess
    import tempfile

    node = shutil.which("node")
    if not node:
        pytest.skip("node not installed")
    blocks = re.findall(r"<script>(.*?)</script>", src, re.S)
    assert blocks, name
    js = re.sub(r"\{\{[A-Za-z0-9_]+\}\}", '"X"', max(blocks, key=len))
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
        f.write(js)
        path = f.name
    r = subprocess.run([node, "--check", path], capture_output=True)
    assert r.returncode == 0, f"{name}: {r.stderr.decode()[:400]}"
