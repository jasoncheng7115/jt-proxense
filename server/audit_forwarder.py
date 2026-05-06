"""Audit log forwarder for jt-proxense v0.2.x.

Ships every new audit row to an external collector (Graylog, ArcSight, syslog
server, etc.) in one of three formats:

  - **GELF** (Graylog Extended Log Format) — JSON, one message per row.
    Native fit for Jason's existing jt-gelflow stack. UDP delivers a single
    JSON datagram (optionally gzipped — we send uncompressed for simplicity);
    TCP uses null-byte termination per the GELF spec.
  - **Syslog** RFC 5424 — `<PRI>1 ISO8601-TS HOST APP PROCID MSGID
    [SD-ID@iana ...] MSG`. UDP per-line; TCP uses octet counting.
  - **CEF** (ArcSight Common Event Format) — `CEF:0|Vendor|Product|
    Version|SignatureID|Name|Severity|Extensions` wrapped in a syslog header.

Two transports:
  - `udp` — `socket.SOCK_DGRAM`, fire and forget. Lossy by design; fine for
    high-throughput collectors that already prefer UDP (Graylog, syslog-ng).
  - `tcp` — `asyncio.open_connection`, line-framed. Reconnects on failure
    with exponential backoff. Outgoing queue is bounded; oldest rows are
    dropped (with a warning) when the remote is unreachable for too long.

Operational notes:
  - The forwarder runs as an asyncio task spawned at server startup when
    `auth.forward.enabled: true`. It owns one Queue, one transport, one
    background loop. Stopping it drains the queue with a 2 s budget then
    gives up — never block service shutdown.
  - Audit row → wire is best-effort. We never refuse an audit.write because
    the forwarder is unhappy; the SQLite log is always the source of truth.
"""
from __future__ import annotations

import asyncio
import json
import logging
import socket
import time
from dataclasses import dataclass
from typing import Optional


logger = logging.getLogger(__name__)

# Syslog severity mapping (RFC 5424)
SEV_INFO = 6
SEV_NOTICE = 5
SEV_WARN = 4
SEV_ERR = 3

# Bounded queue: discard oldest when full so a slow remote doesn't pin RAM.
DEFAULT_QUEUE_SIZE = 1000

# TCP reconnect backoff
TCP_RECONNECT_INITIAL_S = 1.0
TCP_RECONNECT_MAX_S = 30.0


@dataclass
class _Row:
    ts_ms: int
    user: str
    source_ip: str
    cluster_id: Optional[str]
    action: str
    target: Optional[str]
    params_hash: Optional[str]
    result: str
    request_id: str


def _row_severity(row: _Row) -> int:
    """Best-effort syslog severity from the audit result."""
    r = row.result or "ok"
    if r == "ok":
        return SEV_INFO
    if r == "denied":
        return SEV_NOTICE
    if r.startswith("error"):
        return SEV_ERR
    return SEV_INFO


def _format_gelf(row: _Row, host: str) -> bytes:
    """GELF v1.1 — JSON object, NUL-terminated when used over TCP."""
    msg = {
        "version": "1.1",
        "host": host,
        "short_message": f"{row.action} {row.target or ''} -> {row.result}".strip(),
        "timestamp": row.ts_ms / 1000.0,
        "level": _row_severity(row),
        # Custom fields must start with underscore per GELF spec.
        "_user": row.user,
        "_source_ip": row.source_ip,
        "_action": row.action,
        "_result": row.result,
        "_request_id": row.request_id,
        "_app": "jt-proxense",
    }
    if row.target:
        msg["_target"] = row.target
    if row.cluster_id:
        msg["_cluster_id"] = row.cluster_id
    if row.params_hash:
        msg["_params_hash"] = row.params_hash
    return json.dumps(msg, ensure_ascii=False).encode("utf-8")


def _format_syslog(row: _Row, host: str, facility: int) -> bytes:
    """RFC 5424. Structured data carries the audit fields under
    `audit@53595` (53595 is a private enterprise number we picked locally;
    operators can change it via config later if it conflicts)."""
    pri = facility * 8 + _row_severity(row)
    # ISO 8601 timestamp with millisecond precision and Z suffix
    sec = row.ts_ms // 1000
    ms = row.ts_ms % 1000
    ts = time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime(sec)) + f".{ms:03d}Z"
    appname = "jt-proxense"
    procid = "-"
    msgid = "audit"
    sd_pairs = [
        f'user="{_sd_escape(row.user)}"',
        f'src="{_sd_escape(row.source_ip)}"',
        f'action="{_sd_escape(row.action)}"',
        f'result="{_sd_escape(row.result)}"',
        f'request_id="{_sd_escape(row.request_id)}"',
    ]
    if row.target:
        sd_pairs.append(f'target="{_sd_escape(row.target)}"')
    if row.cluster_id:
        sd_pairs.append(f'cluster_id="{_sd_escape(row.cluster_id)}"')
    if row.params_hash:
        sd_pairs.append(f'params_hash="{_sd_escape(row.params_hash)}"')
    sd = "[audit@53595 " + " ".join(sd_pairs) + "]"
    msg_text = f"{row.action} {row.target or ''} -> {row.result}".strip()
    line = f"<{pri}>1 {ts} {host} {appname} {procid} {msgid} {sd} {msg_text}"
    return line.encode("utf-8")


def _sd_escape(s: str) -> str:
    """RFC 5424 §6.3.3 — escape `"`, `\\`, `]` in structured data values."""
    return (s or "").replace("\\", "\\\\").replace('"', '\\"').replace("]", "\\]")


def _format_cef(row: _Row, host: str, vendor: str, product: str, version: str,
                facility: int) -> bytes:
    """CEF over syslog. Severity 0-10 derived from result (10 = highest)."""
    cef_severity = {
        "ok": 3,
        "denied": 6,
    }.get(row.result, 9 if (row.result or "").startswith("error") else 3)

    # CEF prefix wrapped in a basic syslog header for compatibility with
    # most ArcSight ingest paths.
    pri = facility * 8 + _row_severity(row)
    ts = time.strftime("%b %d %H:%M:%S", time.gmtime(row.ts_ms / 1000))
    syslog_header = f"<{pri}>{ts} {host} CEF:0"

    # CEF: pipe-delimited prefix then key=value extensions.
    name = row.action
    sig_id = row.action
    extension_pairs = [
        f"src={row.source_ip}",
        f"suser={_cef_escape_ext(row.user)}",
        f"act={_cef_escape_ext(row.action)}",
        f"outcome={_cef_escape_ext(row.result)}",
        f"requestId={_cef_escape_ext(row.request_id)}",
    ]
    if row.target:
        extension_pairs.append(f"deviceCustomString1={_cef_escape_ext(row.target)}")
        extension_pairs.append("deviceCustomString1Label=target")
    if row.cluster_id:
        extension_pairs.append(f"deviceCustomString2={_cef_escape_ext(row.cluster_id)}")
        extension_pairs.append("deviceCustomString2Label=cluster_id")
    if row.params_hash:
        extension_pairs.append(f"deviceCustomString3={_cef_escape_ext(row.params_hash)}")
        extension_pairs.append("deviceCustomString3Label=params_hash")
    extensions = " ".join(extension_pairs)

    line = (
        f"{syslog_header}|{_cef_escape_pfx(vendor)}|{_cef_escape_pfx(product)}|"
        f"{_cef_escape_pfx(version)}|{_cef_escape_pfx(sig_id)}|"
        f"{_cef_escape_pfx(name)}|{cef_severity}|{extensions}"
    )
    return line.encode("utf-8")


def _cef_escape_pfx(s: str) -> str:
    """Pipe + backslash inside CEF header fields must be escaped."""
    return (s or "").replace("\\", "\\\\").replace("|", "\\|")


def _cef_escape_ext(s: str) -> str:
    """Equals-sign + backslash inside CEF extensions must be escaped."""
    return (s or "").replace("\\", "\\\\").replace("=", "\\=").replace("\n", "\\n")


# ---------------------------------------------------------------- forwarder

class AuditForwarder:
    """Background asyncio task that ships audit rows to an external collector."""

    def __init__(self, *, fmt: str, transport: str, host: str, port: int,
                 hostname: str = "jt-proxense",
                 syslog_facility: int = 16,
                 cef_vendor: str = "JasonTools",
                 cef_product: str = "jt-proxense",
                 cef_version: str = "0.2",
                 queue_size: int = DEFAULT_QUEUE_SIZE):
        if fmt not in ("gelf", "syslog", "cef"):
            raise ValueError(f"invalid format: {fmt}")
        if transport not in ("udp", "tcp"):
            raise ValueError(f"invalid transport: {transport}")
        if not host:
            raise ValueError("host is required when forwarding is enabled")
        self.fmt = fmt
        self.transport = transport
        self.host = host
        self.port = int(port)
        self.hostname = hostname
        self.syslog_facility = syslog_facility
        self.cef_vendor = cef_vendor
        self.cef_product = cef_product
        self.cef_version = cef_version

        self._queue: asyncio.Queue[_Row] = asyncio.Queue(maxsize=queue_size)
        self._task: Optional[asyncio.Task] = None
        self._tcp_writer: Optional[asyncio.StreamWriter] = None
        self._udp_sock: Optional[socket.socket] = None
        self._running = False
        self._dropped = 0  # count of rows dropped due to full queue

    async def start(self) -> None:
        if self._task is not None:
            return
        self._running = True
        self._task = asyncio.create_task(self._run(), name="audit-forwarder")
        logger.info(
            "audit forwarder started: fmt=%s transport=%s dest=%s:%d",
            self.fmt, self.transport, self.host, self.port,
        )

    async def stop(self) -> None:
        self._running = False
        if self._task:
            try:
                await asyncio.wait_for(self._task, timeout=2.0)
            except asyncio.TimeoutError:
                logger.warning("audit forwarder did not stop within 2 s")
                self._task.cancel()
        if self._tcp_writer is not None:
            try:
                self._tcp_writer.close()
                await self._tcp_writer.wait_closed()
            except Exception:
                pass
        if self._udp_sock is not None:
            try:
                self._udp_sock.close()
            except Exception:
                pass
        if self._dropped:
            logger.warning("audit forwarder dropped %d row(s) total", self._dropped)

    def submit(self, row_dict: dict) -> None:
        """Non-blocking enqueue. Called from audit.write() — never raises."""
        try:
            row = _Row(
                ts_ms=int(row_dict.get("ts_ms") or row_dict.get("ts") or 0),
                user=str(row_dict.get("user", "")),
                source_ip=str(row_dict.get("source_ip", "")),
                cluster_id=row_dict.get("cluster_id"),
                action=str(row_dict.get("action", "")),
                target=row_dict.get("target"),
                params_hash=row_dict.get("params_hash"),
                result=str(row_dict.get("result", "")),
                request_id=str(row_dict.get("request_id", "")),
            )
        except Exception as e:
            logger.warning("audit forwarder: bad row: %s", e)
            return
        try:
            self._queue.put_nowait(row)
        except asyncio.QueueFull:
            # Drop the oldest, enqueue the newest — keep the freshest data.
            try:
                self._queue.get_nowait()
                self._dropped += 1
                self._queue.put_nowait(row)
            except Exception:
                self._dropped += 1

    # ----- internals -----

    def _format(self, row: _Row) -> bytes:
        if self.fmt == "gelf":
            return _format_gelf(row, self.hostname)
        if self.fmt == "syslog":
            return _format_syslog(row, self.hostname, self.syslog_facility)
        return _format_cef(row, self.hostname, self.cef_vendor,
                           self.cef_product, self.cef_version,
                           self.syslog_facility)

    async def _run(self) -> None:
        backoff = TCP_RECONNECT_INITIAL_S
        while self._running:
            try:
                if self.transport == "udp":
                    await self._run_udp()
                else:
                    await self._run_tcp()
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.warning("audit forwarder loop error: %s; sleeping %.1fs",
                               e, backoff)
                await asyncio.sleep(backoff)
                backoff = min(backoff * 2, TCP_RECONNECT_MAX_S)
            else:
                backoff = TCP_RECONNECT_INITIAL_S

    async def _run_udp(self) -> None:
        if self._udp_sock is None:
            self._udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            self._udp_sock.setblocking(False)
        loop = asyncio.get_running_loop()
        while self._running:
            row = await self._queue.get()
            data = self._format(row)
            try:
                # UDP write is small + non-blocking; just sendto.
                await loop.run_in_executor(
                    None,
                    self._udp_sock.sendto, data, (self.host, self.port),
                )
            except Exception as e:
                logger.warning("audit forwarder UDP send failed: %s", e)
                # Drop the row; UDP is lossy by design.

    async def _run_tcp(self) -> None:
        reader, writer = await asyncio.open_connection(self.host, self.port)
        self._tcp_writer = writer
        logger.info("audit forwarder TCP connected to %s:%d", self.host, self.port)
        try:
            while self._running:
                row = await self._queue.get()
                data = self._format(row)
                # Frame:
                #   GELF over TCP wants NUL termination.
                #   syslog RFC 5424 over TCP can be octet-counted ("LEN msg")
                #     OR newline-delimited (RFC 6587 NSP). Use newline; most
                #     modern receivers accept it and CEF expects it anyway.
                if self.fmt == "gelf":
                    writer.write(data + b"\x00")
                else:
                    writer.write(data + b"\n")
                await writer.drain()
        finally:
            try:
                writer.close()
                await writer.wait_closed()
            except Exception:
                pass
            self._tcp_writer = None


# ---------------------------------------------------------------- module-level API

_forwarder: Optional[AuditForwarder] = None


def get_forwarder() -> Optional[AuditForwarder]:
    return _forwarder


def set_forwarder(fwd: Optional[AuditForwarder]) -> None:
    global _forwarder
    _forwarder = fwd
