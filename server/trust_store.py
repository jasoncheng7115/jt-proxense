"""Pinned TLS / SSH fingerprints for PVE nodes — trust on first use.

Why: `verify_ssl` defaults to false (PVE ships a self-signed certificate) and
SSH connects with `known_hosts=None`. So jt-proxense — which holds API tokens,
cached root tickets and root SSH to every node — accepted whatever answered on
a node's address. Flipping `verify_ssl` on is not the answer: every stock PVE
would become unreachable. Proxmox Datacenter Manager solves the same problem by
confirming a fingerprint; this is the same idea without a setup step:

  * The FIRST time an endpoint (host:port) is contacted its certificate / host
    key fingerprint is recorded.
  * Afterwards only that fingerprint is accepted. aiohttp enforces it for TLS
    (`aiohttp.Fingerprint`); ssh_util checks the host key right after connect.
  * A DIFFERENT fingerprint is refused and remembered as `pending`. An admin
    accepts it (Settings → Trusted fingerprints, or `jt-proxense trust
    accept`) — re-imaging a node or renewing its certificate legitimately
    needs exactly that, and an interception looks exactly like it.

With `verify_ssl: true` the TLS side uses normal CA validation and is not
pinned. `server.tls_pinning: false` switches the whole mechanism off (the
pre-v1.2.0 behaviour) for labs that re-image constantly.

Limitations, stated rather than hidden: the first contact is trusted blindly
(like SSH); compare the fingerprint in the UI with the one PVE shows under
Node → System → Certificates if that matters to you.

The hot path (every PVE request) reads an in-memory map. The database is only
written when a fingerprint is first recorded, refused, accepted or forgotten,
and only once `enable_persistence()` has been called by the daemon — tests and
the CLI never touch the production database by accident.
"""
from __future__ import annotations

import asyncio
import hashlib
import logging
import ssl
import time

logger = logging.getLogger(__name__)

PROBE_TIMEOUT_S = 8.0
_UNMATCHABLE = b"\x00" * 32

_pins: dict[tuple[str, str], dict] = {}
_locks: dict[tuple[str, str], asyncio.Lock] = {}
_persist = False


class FingerprintMismatch(Exception):
    """The endpoint presented a fingerprint other than the pinned one."""

    def __init__(self, kind: str, endpoint: str, expected: str, got: str):
        self.kind, self.endpoint, self.expected, self.got = kind, endpoint, expected, got
        super().__init__(
            f"{kind.upper()} fingerprint of {endpoint} changed "
            f"(pinned {_short(expected)}, presented {_short(got)}) — refusing to "
            f"connect. If the node was re-installed or its certificate renewed, "
            f"accept the new fingerprint under Settings → Trusted fingerprints.")


def _short(fp: str | None) -> str:
    fp = fp or ""
    return fp if len(fp) <= 23 else fp[:23] + "…"


def enabled() -> bool:
    try:
        from .config import get_config
        return bool(getattr(get_config().server, "tls_pinning", True))
    except Exception:
        return True


def endpoint(host: str, port: int | str) -> str:
    return f"{host}:{port}"


def _unverified() -> ssl.SSLContext:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx


# ───────────────────────────────────────────────────────────── persistence

def enable_persistence() -> None:
    """Load pins from the DB and write changes back. Daemon startup only."""
    global _persist
    from . import db
    with db.connect_sync() as c:
        for row in c.execute("SELECT kind, endpoint, fingerprint, first_seen, "
                             "last_seen, pending, pending_seen FROM trusted_endpoints"):
            _pins[(row[0], row[1])] = {
                "fingerprint": row[2], "first_seen": row[3], "last_seen": row[4],
                "pending": row[5], "pending_seen": row[6],
            }
    _persist = True
    logger.info("trust store: %d pinned fingerprint(s) loaded", len(_pins))


def reset() -> None:
    """Forget everything in memory (tests)."""
    global _persist
    _pins.clear()
    _locks.clear()
    _persist = False


async def _save(kind: str, ep: str) -> None:
    if not _persist:
        return
    from . import db
    rec = _pins.get((kind, ep))
    try:
        async with db.connect() as c:
            if rec is None:
                await c.execute("DELETE FROM trusted_endpoints WHERE kind=? AND endpoint=?",
                                (kind, ep))
            else:
                await c.execute(
                    "INSERT INTO trusted_endpoints (kind, endpoint, fingerprint, first_seen, "
                    "last_seen, pending, pending_seen) VALUES (?,?,?,?,?,?,?) "
                    "ON CONFLICT(kind, endpoint) DO UPDATE SET fingerprint=excluded.fingerprint, "
                    "first_seen=excluded.first_seen, last_seen=excluded.last_seen, "
                    "pending=excluded.pending, pending_seen=excluded.pending_seen",
                    (kind, ep, rec["fingerprint"], rec["first_seen"], rec["last_seen"],
                     rec.get("pending"), rec.get("pending_seen")))
            await c.commit()
    except Exception as e:
        # The pin still holds in memory for this process; say so loudly.
        logger.error("trust store: could not persist %s %s: %s", kind, ep, e)


# ───────────────────────────────────────────────────────────── core

async def _record_first(kind: str, ep: str, fp: str) -> dict:
    now = int(time.time())
    rec = {"fingerprint": fp, "first_seen": now, "last_seen": now,
           "pending": None, "pending_seen": None}
    _pins[(kind, ep)] = rec
    logger.warning("trust store: pinned %s fingerprint of %s on first use: %s",
                   kind.upper(), ep, fp)
    await _save(kind, ep)
    return rec


async def note_mismatch(kind: str, ep: str, got: str) -> None:
    """Remember a refused fingerprint so an admin can review and accept it."""
    rec = _pins.get((kind, ep))
    if rec is None or rec.get("pending") == got:
        return
    rec["pending"] = got
    rec["pending_seen"] = int(time.time())
    logger.error("trust store: %s fingerprint of %s CHANGED — pinned %s, presented %s; "
                 "connection refused until an admin accepts it",
                 kind.upper(), ep, rec["fingerprint"], got)
    await _save(kind, ep)


async def probe_tls(host: str, port: int) -> str:
    """sha256 (hex) of the certificate `host:port` presents."""
    reader, writer = await asyncio.wait_for(
        asyncio.open_connection(host, int(port), ssl=_unverified(),
                                server_hostname=host),
        timeout=PROBE_TIMEOUT_S)
    try:
        der = writer.get_extra_info("ssl_object").getpeercert(binary_form=True)
    finally:
        writer.close()
        try:
            await writer.wait_closed()
        except Exception:
            pass
    return hashlib.sha256(der).hexdigest()


async def tls_ssl(host: str, port: int | str, verify_ssl: bool):
    """The `ssl=` argument for an aiohttp request/connector to a PVE node.

    CA verification when `verify_ssl`; otherwise the pinned fingerprint
    (recorded now if this is the first contact); an unverified context only
    when pinning is switched off.
    """
    if verify_ssl:
        return None
    if not enabled():
        return _unverified()
    import aiohttp
    ep = endpoint(host, port)
    key = ("tls", ep)
    rec = _pins.get(key)
    if rec is None:
        lock = _locks.setdefault(key, asyncio.Lock())
        async with lock:                          # one probe per endpoint
            rec = _pins.get(key)
            if rec is None:
                try:
                    fp = await probe_tls(host, int(port))
                except Exception as e:
                    # Node unreachable (or not speaking TLS). Fail CLOSED
                    # without raising: a fingerprint nothing can match makes
                    # the caller's own request fail inside its existing error
                    # handling (a JSON 502, not a traceback), and the next
                    # request probes again.
                    logger.debug("trust store: probe of %s failed: %s", ep, e)
                    return aiohttp.Fingerprint(_UNMATCHABLE)
                rec = await _record_first("tls", ep, fp)
    return aiohttp.Fingerprint(bytes.fromhex(rec["fingerprint"]))


async def tls_failure(exc: BaseException, host: str, port: int | str) -> None:
    """Call from a request's error path: records a refused certificate."""
    import aiohttp
    if isinstance(exc, aiohttp.ServerFingerprintMismatch):
        await note_mismatch("tls", endpoint(host, port), exc.got.hex())


async def check_ssh(host: str, port: int | str, conn) -> None:
    """Pin / verify the host key of an open asyncssh connection. Raises
    FingerprintMismatch (the caller closes the connection)."""
    if not enabled():
        return
    get_key = getattr(conn, "get_server_host_key", None)
    if get_key is None:
        return                                    # not an asyncssh connection
    key = get_key()
    if key is None:
        return
    fp = key.get_fingerprint("sha256")
    ep = endpoint(host, port)
    rec = _pins.get(("ssh", ep))
    if rec is None:
        lock = _locks.setdefault(("ssh", ep), asyncio.Lock())
        async with lock:
            rec = _pins.get(("ssh", ep))
            if rec is None:
                await _record_first("ssh", ep, fp)
                return
    if rec["fingerprint"] != fp:
        await note_mismatch("ssh", ep, fp)
        raise FingerprintMismatch("ssh", ep, rec["fingerprint"], fp)


# ───────────────────────────────────────────────────────────── admin

def entries() -> list[dict]:
    return [{"kind": k, "endpoint": ep, **rec}
            for (k, ep), rec in sorted(_pins.items())]


async def accept(kind: str, ep: str) -> bool:
    """Make the refused (pending) fingerprint the pinned one."""
    rec = _pins.get((kind, ep))
    if rec is None or not rec.get("pending"):
        return False
    rec["fingerprint"] = rec["pending"]
    rec["pending"] = None
    rec["pending_seen"] = None
    rec["first_seen"] = rec["last_seen"] = int(time.time())
    logger.warning("trust store: %s fingerprint of %s ACCEPTED by admin: %s",
                   kind.upper(), ep, rec["fingerprint"])
    await _save(kind, ep)
    return True


async def forget(kind: str, ep: str) -> bool:
    """Drop the pin; the next contact is trusted on first use again."""
    if _pins.pop((kind, ep), None) is None:
        return False
    await _save(kind, ep)
    return True
