"""One place for outbound SSH to PVE nodes.

Nine call sites across eight modules had each grown their own copy of the same
three things: resolving a node name to (host, user, port), calling
`asyncssh.connect(..., known_hosts=None)`, and deciding what a failure means.
Five of those modules carried a byte-identical `_ssh_for`. The duplication was
not merely untidy — it meant a policy fix had to be applied nine times, and the
one that mattered was missed everywhere: **`asyncssh.connect()` has no timeout of
its own**, so a request against an unreachable node pinned an aiohttp handler
until the OS abandoned the TCP handshake (minutes), and a background job could
sit there far longer.

This module owns that policy. Callers keep their own error handling — the point
is to centralise *how we connect*, not to rewrite what each feature does when a
node says no.

known_hosts=None is deliberate and unchanged: the operator authorises this host's
key on each node (see ssh_setup.py / the SSHSetupModal), and PVE nodes are
re-imaged often enough that pinning host keys would generate more support load
than it removes. Documented here so the decision lives in one place rather than
being re-derived from a comment in whichever module you happen to read.
"""
from __future__ import annotations

import asyncio
import logging

logger = logging.getLogger(__name__)

# Bound the TCP + SSH handshake. Long enough for a loaded node behind a slow
# link, short enough that a dead node fails a request rather than parking it.
CONNECT_TIMEOUT = 12

DEFAULT_USER = "root"
DEFAULT_PORT = 22


class SshUnavailable(OSError):
    """asyncssh itself is missing on the jt-proxense host."""


class SshTimeout(OSError):
    """Connection did not complete within the timeout.

    Subclasses OSError so the existing `except Exception` / `except OSError`
    blocks in caller modules treat it as the connection failure it is.
    """


def user_port_for(cluster) -> tuple[str, int]:
    """SSH credentials policy for a cluster: config override, else root:22."""
    user = getattr(cluster.config, "ssh_user", None) or DEFAULT_USER
    port = int(getattr(cluster.config, "ssh_port", None) or DEFAULT_PORT)
    return user, port


def target_for(cluster, node: str) -> tuple[str, str, int]:
    """Resolve a PVE node name to (host, user, port).

    Prefer an address we know is reachable, and fall back to the bare node name
    so DNS can do the work when nothing else is known.

    Careful with the health map: it is keyed by "{host}:{port}" (see
    PveClient.node_health), NOT by PVE node name. The original code did
    `health.get(node)`, which could never match — so the address the poller had
    just proved reachable was ignored and every SSH connection relied on the
    node's short name resolving. It happens to work where DNS is configured and
    fails with a 12s timeout where it is not.
    """
    user, port = user_port_for(cluster)
    host = _resolve_host(cluster, node)
    return host, user, port


def _resolve_host(cluster, node: str) -> str:
    """Best address for a PVE node name.

    There is no name->IP map in the cached data: `cache.nodes` holds NodeMetrics,
    which carries no address field at all, and `client.node_health` is keyed by
    "{host}:{port}" of the CONFIGURED API endpoints — which in a multi-node
    cluster is usually a subset of the members. So:

      1. a configured endpoint whose hostname is this node (exact, or short form
         of an FQDN) — we already talk to it, so we know it resolves;
      2. otherwise the bare node name, and let DNS / etc/hosts do the work,
         which is what PVE itself assumes.

    Anything cleverer would need /cluster/status, which we do not cache today.
    """
    for n in (getattr(cluster.config, "nodes", None) or []):
        h = getattr(n, "host", None) or (n.get("host") if isinstance(n, dict) else None)
        if h and str(h).split(".")[0] == node:
            return str(h)
    try:
        for key in (cluster.client.get_health_status() or {}):
            host = str(key).rsplit(":", 1)[0]
            if host.split(".")[0] == node:
                return host
    except Exception:
        pass
    return node


async def connect(host: str, user: str, port: int = DEFAULT_PORT, *,
                  timeout: float = CONNECT_TIMEOUT):
    """Open a bounded SSH connection. Returns an SSHClientConnection.

    Usable both as `conn = await connect(...)` and
    `async with await connect(...) as conn:`.
    """
    try:
        import asyncssh
    except ImportError as e:
        raise SshUnavailable(
            "asyncssh is not installed on the jt-proxense host — "
            "pip install 'asyncssh>=2.21.0'") from e
    try:
        return await asyncio.wait_for(
            asyncssh.connect(host, port=port, username=user, known_hosts=None),
            timeout=timeout)
    except asyncio.TimeoutError:
        raise SshTimeout(
            f"connecting to {host}:{port} timed out after {timeout:g}s "
            "— node unreachable, or the SSH port is filtered") from None


async def connect_node(cluster, node: str, *, timeout: float = CONNECT_TIMEOUT):
    """target_for() + connect() — the common case."""
    host, user, port = target_for(cluster, node)
    return await connect(host, user, port, timeout=timeout)
