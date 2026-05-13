"""InfluxDB-line-protocol receiver — Telegraf agents push host metrics here.

Telegraf agents on each PVE host (`outputs.influxdb_v2`) write line-protocol
metrics to `http://<jt-proxense>:<influx_port>/api/v2/write`. We parse, drop
unrelated measurements, and surface the rest as supplemental host metrics
the dashboard can render alongside what we pull from PVE's API.

Why a separate listener (different port from the main app):
  - No auth middleware in the way — Telegraf is a service-to-service caller.
  - Different connection pattern (constant POST stream vs human SPA).
  - Crashing the receiver should not 500 the main UI.

Auth model:
  - If `influx_token` is set in config, require `Authorization: Token <t>`.
  - If empty, accept any caller — caller should bind to LAN-only interface
    in this case (mirrors Telegraf's default trust model).

Why our own parser instead of pip install:
  - Zero deps. Telegraf line protocol is small and well-specified.
  - We need to drop measurements we don't care about WITHOUT allocating
    full Python objects for them — saves CPU when telegraf pushes 100s
    of measurements per host.
"""
from __future__ import annotations

import asyncio
import hmac
import ipaddress
import logging
import time
from collections import deque, defaultdict
from dataclasses import dataclass
from typing import Any, Awaitable, Callable, Iterable, Optional

from aiohttp import web


logger = logging.getLogger(__name__)


# ============================================================ data shapes

@dataclass
class InfluxPoint:
    """One sample. tag/field values are str/int/float/bool — what line-
    protocol expresses natively."""
    measurement: str
    tags: dict[str, str]
    fields: dict[str, Any]
    # Nanosecond unix timestamp from the line, or None (caller fills with
    # current time so we don't drop samples that omit it).
    timestamp_ns: Optional[int]


# ============================================================ parser

# Line-protocol grammar (https://docs.influxdata.com/influxdb/v2/reference/syntax/line-protocol/):
#   measurement[,tagk=tagv,tagk=tagv] fieldk=fieldv[,fieldk=fieldv] [timestamp]
# Escape chars: \, in tag/measurement; \" inside string field values.

_PRECISION_TO_NS = {
    "ns": 1,
    "us": 1_000,
    "u":  1_000,        # legacy alias some clients use
    "ms": 1_000_000,
    "s":  1_000_000_000,
}


def parse_line_protocol(body: str, precision: str = "ns") -> list[InfluxPoint]:
    """Parse a Telegraf line-protocol payload into InfluxPoint records.

    Robust to:
      - Empty lines and lines starting with `#` (comments)
      - Escaped commas / equals / spaces in measurements / tags / field keys
      - String field values quoted with `"` (with escaped `\\"` inside)
      - Integer suffix `i` (e.g. `cpu_usage=42i` → int 42)
      - Float fields, bool fields (`t/T/true/True/f/F/false/False`)
      - Optional trailing nanosecond timestamp

    Lines that fail to parse are logged at DEBUG and skipped — never raises.
    """
    # InfluxDB v2 accepts a `precision` query param: ns | us | ms | s.
    # Convert any non-ns timestamps up to ns so the rest of the system
    # (ring buffer, /api/telegraf/*) only ever sees nanosecond values.
    mult = _PRECISION_TO_NS.get(precision.lower(), 1)
    out: list[InfluxPoint] = []
    for raw in body.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        try:
            point = _parse_one_line(line)
            if point is None:
                continue
            if point.timestamp_ns is not None and mult != 1:
                point = InfluxPoint(
                    measurement=point.measurement,
                    tags=point.tags,
                    fields=point.fields,
                    timestamp_ns=point.timestamp_ns * mult,
                )
            out.append(point)
        except Exception as e:
            logger.debug("influx parse skip: %s | line=%r", e, line[:200])
    return out


def _parse_one_line(line: str) -> Optional[InfluxPoint]:
    # Split into 3 sections: <meas[,tags]> <fields> [timestamp]
    # Splits MUST respect escaped chars and quoted strings.
    sec1, sec2, sec3 = _split_top_level(line)
    if sec1 is None or sec2 is None:
        return None

    # Section 1: measurement and tags
    parts = _split_unescaped(sec1, ",")
    measurement = _unescape(parts[0])
    if not measurement:
        return None
    tags: dict[str, str] = {}
    for tag in parts[1:]:
        if not tag:
            continue
        kv = _split_unescaped(tag, "=", 1)
        if len(kv) != 2:
            continue
        tags[_unescape(kv[0])] = _unescape(kv[1])

    # Section 2: fields
    fields: dict[str, Any] = {}
    for fpair in _split_field_pairs(sec2):
        kv = _split_unescaped(fpair, "=", 1)
        if len(kv) != 2:
            continue
        fields[_unescape(kv[0])] = _parse_field_value(kv[1])
    if not fields:
        return None

    # Section 3: optional timestamp. InfluxDB v2 lets the writer choose
    # ns / us / ms / s via a `precision` query param (default ns). We
    # multiply up so the cache always stores nanosecond timestamps.
    ts: Optional[int] = None
    if sec3 is not None:
        try:
            ts = int(sec3.strip())
        except ValueError:
            ts = None

    return InfluxPoint(
        measurement=measurement,
        tags=tags,
        fields=fields,
        timestamp_ns=ts,
    )


def _split_top_level(line: str) -> tuple[Optional[str], Optional[str], Optional[str]]:
    """Split a line into (sec1, sec2, sec3) at unescaped, unquoted spaces."""
    spaces: list[int] = []
    i = 0
    n = len(line)
    in_str = False
    while i < n:
        c = line[i]
        if c == "\\" and i + 1 < n:
            i += 2
            continue
        if c == '"':
            in_str = not in_str
            i += 1
            continue
        if c == " " and not in_str:
            spaces.append(i)
        i += 1
    if len(spaces) == 0:
        return None, None, None
    if len(spaces) == 1:
        return line[: spaces[0]], line[spaces[0] + 1 :], None
    # Take the FIRST and LAST top-level space — anything between is part
    # of section 2 (fields can have quoted strings with spaces).
    s1 = line[: spaces[0]]
    s2 = line[spaces[0] + 1 : spaces[-1]]
    s3 = line[spaces[-1] + 1 :]
    # If the "last" candidate looks non-numeric (e.g. has = inside), the
    # line has no timestamp and what we thought was sec3 is part of fields.
    if "=" in s3:
        return line[: spaces[0]], line[spaces[0] + 1 :], None
    return s1, s2, s3


def _split_unescaped(s: str, sep: str, maxsplit: int = -1) -> list[str]:
    """Split on `sep` ignoring backslash-escaped occurrences and chars inside
    double-quoted strings."""
    out: list[str] = []
    buf: list[str] = []
    i = 0
    n = len(s)
    in_str = False
    splits = 0
    while i < n:
        c = s[i]
        if c == "\\" and i + 1 < n:
            buf.append(c)
            buf.append(s[i + 1])
            i += 2
            continue
        if c == '"':
            in_str = not in_str
            buf.append(c)
            i += 1
            continue
        if c == sep and not in_str and (maxsplit < 0 or splits < maxsplit):
            out.append("".join(buf))
            buf.clear()
            splits += 1
            i += 1
            continue
        buf.append(c)
        i += 1
    out.append("".join(buf))
    return out


def _split_field_pairs(s: str) -> list[str]:
    """Split section 2 into k=v pairs, respecting quotes."""
    return [p for p in _split_unescaped(s, ",") if p]


def _unescape(s: str) -> str:
    # Unescape \, \= \space and \\
    out: list[str] = []
    i = 0
    n = len(s)
    while i < n:
        c = s[i]
        if c == "\\" and i + 1 < n:
            out.append(s[i + 1])
            i += 2
        else:
            out.append(c)
            i += 1
    return "".join(out)


def _parse_field_value(v: str) -> Any:
    if not v:
        return ""
    if v[0] == '"' and v[-1] == '"':
        # Quoted string — unescape \" and \\
        inner = v[1:-1]
        return inner.replace('\\"', '"').replace("\\\\", "\\")
    if v in ("t", "T", "true", "True", "TRUE"):
        return True
    if v in ("f", "F", "false", "False", "FALSE"):
        return False
    # Integer (line-protocol marks with trailing 'i')
    if v.endswith("i") or v.endswith("u"):
        try:
            return int(v[:-1])
        except ValueError:
            pass
    # Float
    try:
        return float(v)
    except ValueError:
        # Last resort: leave as-is — caller will see a string they didn't expect.
        return v


# ============================================================ receiver app

# Type alias for the callback the receiver invokes after parsing.
PointsCallback = Callable[[list[InfluxPoint]], Awaitable[None]]


class InfluxReceiver:
    """Standalone aiohttp app on `(host, port)` accepting Telegraf writes.

    Lifecycle: caller creates, calls `start`, eventually `stop`. The receiver
    serves until stopped.
    """

    def __init__(
        self,
        host: str,
        port: int,
        token: str,
        on_points: PointsCallback,
    ):
        self.host = host
        self.port = port
        # Empty token = no auth, trust LAN. Treat any whitespace-only token
        # as empty so config "  " doesn't accidentally lock everyone out.
        self.token = (token or "").strip()
        self.on_points = on_points
        self._runner: Optional[web.AppRunner] = None
        self._site: Optional[web.TCPSite] = None
        self._stats = {
            "writes": 0,
            "points": 0,
            "auth_fail": 0,
            "parse_errors": 0,
            "started_at": 0.0,
        }
        # Per-IP failed-auth window for soft brute-force detection (A07).
        # Map ip → list[ts] within the last 60 s. Logged at WARN once a
        # source crosses the threshold; we do NOT actively block (Telegraf
        # mis-config could lock out a real fleet) — operators are expected
        # to read the warning and rotate / fix.
        self._auth_fail_log: dict[str, list[float]] = defaultdict(list)
        self._auth_fail_warned: set[str] = set()

    async def start(self) -> None:
        app = web.Application(client_max_size=8 * 1024 * 1024)  # 8MB cap
        # InfluxDB v2 write endpoint. This is the only supported write
        # path — pair Telegraf with `outputs.influxdb_v2`. The legacy
        # `/write` endpoint is intentionally not registered: v2-only
        # keeps auth (Authorization: Token) consistent and surfaces a
        # clean 404 if an old v1 agent points at us by mistake.
        app.router.add_post("/api/v2/write", self._handle_write)
        # Health probe so operators can verify the receiver is up
        app.router.add_get("/health", self._handle_health)
        app.router.add_get("/", self._handle_health)

        self._runner = web.AppRunner(app)
        await self._runner.setup()
        self._site = web.TCPSite(self._runner, self.host, self.port)
        await self._site.start()
        self._stats["started_at"] = time.time()
        if self.token:
            logger.info("InfluxDB receiver up on http://%s:%d (with token auth)",
                        self.host, self.port)
        else:
            # OWASP A05 — call out the dangerous combination of "bound to a
            # non-loopback interface" AND "no token configured" so operators
            # can't accidentally expose a free metrics-write endpoint.
            try:
                bind_loopback = ipaddress.ip_address(self.host).is_loopback
            except ValueError:
                bind_loopback = self.host in ("localhost", "::1")
            if bind_loopback:
                logger.info("InfluxDB receiver up on http://%s:%d (no auth, loopback only)",
                            self.host, self.port)
            else:
                logger.warning(
                    "SECURITY: InfluxDB receiver bound to %s:%d with NO TOKEN. "
                    "Anyone on this network can write metrics. Set "
                    "server.influx_token in config.yaml or bind to 127.0.0.1.",
                    self.host, self.port,
                )

    async def stop(self) -> None:
        if self._site:
            await self._site.stop()
        if self._runner:
            await self._runner.cleanup()
        self._site = None
        self._runner = None
        logger.info("InfluxDB receiver stopped")

    def stats(self) -> dict:
        return dict(self._stats)

    # --------------------------------------------------------------

    async def _handle_health(self, request: web.Request) -> web.Response:
        return web.json_response({"ok": True, "stats": self._stats})

    async def _handle_write(self, request: web.Request) -> web.Response:
        # Auth: Telegraf v2 sends `Authorization: Token <token>`.
        # OWASP A02 / A07 — string equality on secret material leaks length
        # and content via timing. Use hmac.compare_digest for a constant-
        # time match. The two prefixes are tried independently so an
        # attacker can't tell which prefix was correct on partial match.
        if self.token:
            header = request.headers.get("Authorization", "")
            expected_a = f"Token {self.token}"
            expected_b = f"Bearer {self.token}"
            ok = (
                hmac.compare_digest(header, expected_a)
                or hmac.compare_digest(header, expected_b)
            )
            if not ok:
                self._stats["auth_fail"] += 1
                ip = (request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
                      or (request.remote or "unknown"))
                # Roll the per-IP window and warn once per minute on burst.
                now = time.time()
                bucket = self._auth_fail_log[ip]
                bucket.append(now)
                # drop entries older than 60 s
                cutoff = now - 60.0
                while bucket and bucket[0] < cutoff:
                    bucket.pop(0)
                if len(bucket) >= 5 and ip not in self._auth_fail_warned:
                    self._auth_fail_warned.add(ip)
                    logger.warning(
                        "InfluxDB receiver: %d auth failures in 60s from %s — "
                        "possible brute force or mis-configured agent",
                        len(bucket), ip,
                    )
                else:
                    logger.info(
                        "InfluxDB receiver auth fail from %s (header_len=%d)",
                        ip, len(header),
                    )
                # Periodic GC of the warned set so a fixed agent stops
                # being treated as suspicious forever.
                if len(self._auth_fail_warned) > 64:
                    self._auth_fail_warned.clear()
                return web.Response(status=401, text="unauthorized")

        # v2 query params: org, bucket, precision (ns | us | ms | s).
        # We don't actually route by org/bucket — the receiver is a
        # single sink — but logging them makes mis-targeted agents
        # easier to spot. precision is honoured by the parser so
        # timestamps land in the cache as nanoseconds regardless of
        # what unit the agent sent.
        precision = (request.query.get("precision") or "ns").strip().lower()
        org    = request.query.get("org",    "")
        bucket = request.query.get("bucket", "")

        body_bytes = await request.read()
        # aiohttp transparently decompresses Content-Encoding: gzip on
        # `request.read()`. Just in case a Telegraf agent uses a body that
        # ends up as raw gzip bytes (some configs / proxies strip the
        # encoding header), peek for the gzip magic and decompress.
        if body_bytes[:2] == b"\x1f\x8b":
            import gzip
            try:
                body_bytes = gzip.decompress(body_bytes)
            except Exception as e:
                self._stats["parse_errors"] += 1
                return web.Response(status=400, text=f"bad gzip: {e}")

        try:
            body = body_bytes.decode("utf-8", errors="replace")
        except Exception:
            return web.Response(status=400, text="invalid utf-8")

        points = parse_line_protocol(body, precision=precision)
        self._stats["writes"] += 1
        self._stats["points"] += len(points)
        if org or bucket:
            logger.debug(
                "influx v2 write: org=%s bucket=%s precision=%s points=%d",
                org or "-", bucket or "-", precision, len(points),
            )

        if points:
            try:
                await self.on_points(points)
            except Exception as e:
                logger.warning("influx callback error: %s", e)
                # Don't 500 — Telegraf will retry forever and back-pressure us.
                # Drop silently; we already counted in stats.

        # Telegraf v2 expects 204 on success (v1 expects 204 too).
        return web.Response(status=204)


# ============================================================ ring-buffer store

# Module-level metrics store keyed by host. Exposed through cluster_manager
# so other parts of the app (e.g. the WS broadcast or REST endpoints) can
# read recent samples without touching the receiver internals.

@dataclass
class TelegrafSample:
    measurement: str
    tags: dict[str, str]
    fields: dict[str, Any]
    received_at: float        # local server time, seconds
    timestamp_ns: Optional[int]


_BUFFER_PER_KEY = 60  # ~1 minute @ 1Hz

# host_name → measurement → deque[TelegrafSample]
_metrics: dict[str, dict[str, deque[TelegrafSample]]] = {}
_lock = asyncio.Lock()


async def store_points(points: Iterable[InfluxPoint]) -> None:
    """Default `on_points` implementation: index by host (from `host` tag,
    standard Telegraf convention) and ring-buffer the last N samples per
    measurement. Drops anything without a `host` tag — without it we have
    no way to route to a node detail panel.
    """
    now = time.time()
    async with _lock:
        for p in points:
            host = (p.tags.get("host") or "").strip()
            if not host:
                continue
            host_buckets = _metrics.setdefault(host, {})
            buf = host_buckets.get(p.measurement)
            if buf is None:
                buf = deque(maxlen=_BUFFER_PER_KEY)
                host_buckets[p.measurement] = buf
            buf.append(TelegrafSample(
                measurement=p.measurement,
                tags=dict(p.tags),
                fields=dict(p.fields),
                received_at=now,
                timestamp_ns=p.timestamp_ns,
            ))


def get_host_metrics(host: str) -> dict[str, list[TelegrafSample]]:
    """Snapshot copy for a single host — safe to serialise to JSON."""
    bucket = _metrics.get(host)
    if not bucket:
        return {}
    return {m: list(buf) for m, buf in bucket.items()}


def get_all_hosts() -> list[str]:
    return sorted(_metrics.keys())


def stats() -> dict:
    return {
        "hosts": len(_metrics),
        "samples": sum(
            len(buf)
            for host_buckets in _metrics.values()
            for buf in host_buckets.values()
        ),
    }
