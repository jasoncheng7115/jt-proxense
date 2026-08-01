"""Shared outbound-SSH policy.

Nine call sites across eight modules each had their own copy of "resolve node ->
connect", and five carried a byte-identical `_ssh_for`. The cost was not
tidiness: `asyncssh.connect()` has no timeout of its own, and that fix had to be
applied nine times — so it was applied nowhere until a security-gate probe
against an unroutable address never came back. These tests keep the policy in
one place and keep it applied everywhere.
"""
import ast
import asyncio
import inspect
import pathlib
import types

import pytest

from server import ssh_util

SERVER = pathlib.Path(__file__).parent.parent / "server"


# --------------------------------------------------------------- resolution

class _FakeClient:
    def __init__(self, health):
        self._health = health

    def get_health_status(self):
        return self._health


def _cluster(health=None, ssh_user=None, ssh_port=None, nodes=None):
    cfg = types.SimpleNamespace(nodes=nodes or [])
    if ssh_user is not None:
        cfg.ssh_user = ssh_user
    if ssh_port is not None:
        cfg.ssh_port = ssh_port
    return types.SimpleNamespace(client=_FakeClient(health or {}), config=cfg)


def test_health_map_is_keyed_by_host_port_not_node_name():
    """Guards the assumption that made the original lookup dead code.

    PveClient.node_health is keyed "{host}:{port}". The first version of
    target_for did `health.get(node)` with a PVE node NAME, which can never
    match — so the address the poller had just proven reachable was ignored and
    every SSH connection silently depended on the short name resolving. The
    original test fed a name-keyed map and therefore validated the same wrong
    assumption instead of catching it.
    """
    c = _cluster({"192.0.2.8:8006": {"host": "192.0.2.8"}})
    # An IP-keyed entry cannot be matched to a node name — fall through to DNS.
    assert ssh_util.target_for(c, "host-108")[0] == "host-108"


def test_configured_endpoint_for_this_node_is_preferred():
    """We already talk to that endpoint, so we know it resolves."""
    c = _cluster(nodes=[types.SimpleNamespace(host="host-108.jason.tools")])
    assert ssh_util.target_for(c, "host-108")[0] == "host-108.jason.tools"


def test_health_entry_matching_by_short_name_is_used():
    c = _cluster({"host-109.lan:8006": {"host": "host-109.lan"}})
    assert ssh_util.target_for(c, "host-109")[0] == "host-109.lan"


def test_unknown_node_falls_back_to_dns():
    assert ssh_util.target_for(_cluster({}), "host-114")[0] == "host-114"


def test_resolution_never_raises_on_odd_shapes():
    """Config nodes may be dicts, and a broken client must not break SSH."""
    c = _cluster(nodes=[{"host": "host-108.lan"}, {"nope": 1}])
    assert ssh_util.target_for(c, "host-108")[0] == "host-108.lan"

    class Broken:
        def get_health_status(self):
            raise RuntimeError("poller down")
    b = types.SimpleNamespace(client=Broken(), config=types.SimpleNamespace(nodes=[]))
    assert ssh_util.target_for(b, "host-1")[0] == "host-1"


def test_target_honours_cluster_ssh_overrides():
    c = _cluster({}, ssh_user="ops", ssh_port="2222")
    assert ssh_util.target_for(c, "n1") == ("n1", "ops", 2222)


def test_empty_overrides_fall_back_to_defaults():
    c = _cluster({}, ssh_user="", ssh_port=0)
    assert ssh_util.target_for(c, "n1") == ("n1", "root", 22)


def test_user_port_for_is_the_same_policy():
    c = _cluster({}, ssh_user="ops", ssh_port=2200)
    assert ssh_util.user_port_for(c) == ("ops", 2200)


# ------------------------------------------------------------------ timeout

def test_connect_is_bounded(monkeypatch):
    """The whole point of the module: a hung handshake must not hang the caller."""
    async def never(*a, **kw):
        await asyncio.sleep(3600)

    fake = types.SimpleNamespace(connect=never)
    monkeypatch.setitem(__import__("sys").modules, "asyncssh", fake)

    async def go():
        with pytest.raises(ssh_util.SshTimeout):
            await ssh_util.connect("192.0.2.1", "root", 22, timeout=0.05)

    asyncio.new_event_loop().run_until_complete(go())


def test_timeout_is_an_oserror():
    """Caller modules catch OSError/Exception on connect; SshTimeout must land there."""
    assert issubclass(ssh_util.SshTimeout, OSError)


def test_timeout_message_names_the_target():
    async def never(*a, **kw):
        await asyncio.sleep(3600)

    import sys
    sys.modules["asyncssh"] = types.SimpleNamespace(connect=never)
    try:
        async def go():
            try:
                await ssh_util.connect("192.0.2.7", "root", 2222, timeout=0.05)
            except ssh_util.SshTimeout as e:
                return str(e)
            return ""
        msg = asyncio.new_event_loop().run_until_complete(go())
    finally:
        sys.modules.pop("asyncssh", None)
    assert "192.0.2.7:2222" in msg


def test_default_timeout_is_sane():
    assert 1 <= ssh_util.CONNECT_TIMEOUT <= 30


# ------------------------------------------------- no call site opts out

def test_no_module_calls_asyncssh_connect_directly():
    r"""Every outbound SSH must go through ssh_util, or it loses the timeout."""
    offenders = []
    for path in sorted(SERVER.glob("*.py")):
        if path.name == "ssh_util.py":
            continue
        tree = ast.parse(path.read_text(encoding="utf-8"))
        for node in ast.walk(tree):
            if (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                    and node.func.attr == "connect"
                    and isinstance(node.func.value, ast.Name)
                    and node.func.value.id == "asyncssh"):
                offenders.append(f"{path.name}:{node.lineno}")
    assert not offenders, (
        "these bypass ssh_util and so have no connect timeout: " + ", ".join(offenders))


def test_no_module_reimplements_the_credentials_policy():
    """"which user, which port" must be decided in exactly one place.

    Reading the health map is fine — ssh_setup legitimately needs the whole map
    to enumerate fan-out targets. What must not be copied is the
    ssh_user/ssh_port defaulting, because that is the policy the five duplicate
    `_ssh_for` helpers were silently forking.
    """
    offenders = []
    for path in sorted(SERVER.glob("*.py")):
        if path.name == "ssh_util.py":
            continue
        text = path.read_text(encoding="utf-8")
        if 'getattr(cluster.config, "ssh_user"' in text:
            offenders.append(path.name)
    assert not offenders, (
        "re-implemented the SSH credentials policy instead of using "
        "ssh_util.target_for / user_port_for: " + ", ".join(offenders))


def test_known_hosts_policy_documented_in_one_place():
    """known_hosts=None is a deliberate decision; it should be argued once."""
    src = inspect.getsource(ssh_util)
    assert "known_hosts" in src
    assert "ssh_setup" in src, "the policy comment should point at how keys get authorised"


# ------------------------------------- call sites must not re-key by hand

def test_no_module_looks_up_a_node_in_the_health_map():
    """`get_health_status()` is keyed "{host}:{port}", never by node name.

    Two modules (storage_download, ssh_setup) kept their own `health.get(node)`
    after the refactor and so 404'd / 400'd on any cluster whose endpoint isn't
    literally the bare node name. Any `health...get(<node>)` / `<node> in health`
    outside pve_client is almost certainly this bug returning.
    """
    import re
    offenders = []
    for path in sorted(SERVER.glob("*.py")):
        if path.name in ("pve_client.py", "ssh_util.py"):
            continue
        # strip comments so a docstring/comment explaining the OLD bug does not
        # trip the guard
        code = "\n".join(ln.split("#", 1)[0] for ln in
                         path.read_text(encoding="utf-8").splitlines())
        if (re.search(r"health\.get\(\s*node\b", code)
                or re.search(r"\bseed\s+not\s+in\s+health\b", code)
                or re.search(r"get_health_status\(\)\.get\(\s*node\b", code)):
            offenders.append(path.name)
    assert not offenders, (
        "node looked up in the host:port-keyed health map: " + ", ".join(offenders))


def test_missing_asyncssh_is_reported_once_centrally():
    """The friendly 'install asyncssh' error lives in ssh_util, not copied into
    each caller as a dead ImportError guard."""
    src = inspect.getsource(ssh_util)
    assert "SshUnavailable" in src and "pip install" in src
    assert issubclass(ssh_util.SshUnavailable, OSError)


def test_single_node_cluster_by_ip_uses_the_endpoint():
    """A one-node cluster configured by IP can't be matched by name; its sole
    endpoint IS that node, so use the IP rather than a DNS name that may not
    resolve."""
    c = _cluster(nodes=[types.SimpleNamespace(host="192.168.1.50")])
    assert ssh_util.target_for(c, "pve")[0] == "192.168.1.50"


def test_multi_node_by_ip_does_not_guess():
    c = _cluster(nodes=[types.SimpleNamespace(host="192.168.1.50"),
                        types.SimpleNamespace(host="192.168.1.51")])
    assert ssh_util.target_for(c, "pve")[0] == "pve"
