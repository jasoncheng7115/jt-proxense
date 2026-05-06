"""Audit log forwarder tests — formats + UDP/TCP transports.

Uses mock socket servers (asyncio for TCP, threaded UDP) so tests don't need
network access.
"""
from __future__ import annotations

import asyncio
import json
import re
import socket
import threading

import pytest

from server import audit_forwarder as af


# ---------------------------------------------------------------- format tests

def _row(**overrides) -> af._Row:
    base = dict(
        ts_ms=1_700_000_000_000,
        user="alice",
        source_ip="10.0.0.5",
        cluster_id="cluster1",
        action="vm.start",
        target="cluster1/node1/vm/100",
        params_hash="ab" * 32,
        result="ok",
        request_id="req-abc123",
    )
    base.update(overrides)
    return af._Row(**base)


def test_format_gelf_basic():
    out = af._format_gelf(_row(), "host01").decode("utf-8")
    j = json.loads(out)
    assert j["version"] == "1.1"
    assert j["host"] == "host01"
    assert j["_user"] == "alice"
    assert j["_action"] == "vm.start"
    assert j["_result"] == "ok"
    # Custom fields must start with underscore
    for k in j:
        if k not in ("version", "host", "short_message", "timestamp", "level"):
            assert k.startswith("_"), f"non-standard top-level GELF field: {k}"


def test_format_gelf_omits_optional_when_missing():
    out = af._format_gelf(_row(target=None, cluster_id=None, params_hash=None), "h").decode()
    j = json.loads(out)
    assert "_target" not in j
    assert "_cluster_id" not in j
    assert "_params_hash" not in j


def test_format_gelf_severity_for_denied():
    j = json.loads(af._format_gelf(_row(result="denied"), "h").decode())
    assert j["level"] == af.SEV_NOTICE


def test_format_gelf_severity_for_error():
    j = json.loads(af._format_gelf(_row(result="error:ValueError"), "h").decode())
    assert j["level"] == af.SEV_ERR


def test_format_syslog_rfc5424_shape():
    out = af._format_syslog(_row(), "host01", facility=16).decode()
    # <PRI>1 ISO8601 HOST APP PROCID MSGID [SD-ID@iana ...] MSG
    m = re.match(r'^<(\d+)>1 (\S+) (\S+) (\S+) (\S+) (\S+) \[audit@53595 (.+?)\] (.+)$', out)
    assert m, f"shape doesn't match RFC 5424: {out!r}"
    pri = int(m.group(1))
    # pri = facility * 8 + severity ; facility=16, severity=info(6)
    assert pri == 16 * 8 + 6
    assert m.group(3) == "host01"
    assert m.group(4) == "jt-proxense"
    sd = m.group(7)
    assert 'user="alice"' in sd
    assert 'action="vm.start"' in sd
    assert 'result="ok"' in sd


def test_format_syslog_escapes_quotes_in_sd_values():
    out = af._format_syslog(_row(target='vm "scary"'), "h", 16).decode()
    assert '\\"scary\\"' in out


def test_format_cef_shape():
    out = af._format_cef(_row(), "host01", "JT", "jt-proxense", "0.2", 16).decode()
    # Syslog wrapper + CEF prefix
    assert out.startswith("<")
    assert "CEF:0|JT|jt-proxense|0.2|vm.start|vm.start|" in out
    assert "src=10.0.0.5" in out
    assert "suser=alice" in out
    assert "deviceCustomString1Label=target" in out
    assert "deviceCustomString2Label=cluster_id" in out


def test_format_cef_severity_mapping():
    ok = af._format_cef(_row(result="ok"), "h", "v", "p", "1", 16).decode()
    assert "|3|" in ok
    den = af._format_cef(_row(result="denied"), "h", "v", "p", "1", 16).decode()
    assert "|6|" in den
    err = af._format_cef(_row(result="error:Foo"), "h", "v", "p", "1", 16).decode()
    assert "|9|" in err


def test_format_cef_escapes_pipes_in_prefix_fields():
    out = af._format_cef(_row(action="weird|action"), "h", "vendor|x", "p|y", "v", 16).decode()
    # vendor and product fields should have pipes escaped
    assert "vendor\\|x" in out
    assert "p\\|y" in out


def test_format_cef_escapes_equals_in_extensions():
    out = af._format_cef(_row(target="key=value"), "h", "v", "p", "1", 16).decode()
    assert "deviceCustomString1=key\\=value" in out


# ---------------------------------------------------------------- ctor validation

def test_invalid_format_raises():
    with pytest.raises(ValueError, match="invalid format"):
        af.AuditForwarder(fmt="leef", transport="udp", host="x", port=1)


def test_invalid_transport_raises():
    with pytest.raises(ValueError, match="invalid transport"):
        af.AuditForwarder(fmt="gelf", transport="quic", host="x", port=1)


def test_missing_host_raises():
    with pytest.raises(ValueError, match="host is required"):
        af.AuditForwarder(fmt="gelf", transport="udp", host="", port=1)


# ---------------------------------------------------------------- queue

@pytest.mark.asyncio
async def test_submit_drops_oldest_when_queue_full():
    fwd = af.AuditForwarder(
        fmt="gelf", transport="udp", host="127.0.0.1", port=12_201,
        queue_size=2,
    )
    fwd.submit({"action": "a", "result": "ok"})
    fwd.submit({"action": "b", "result": "ok"})
    # third submission should drop the oldest
    fwd.submit({"action": "c", "result": "ok"})
    assert fwd._queue.qsize() == 2
    # Oldest got dropped — remaining first item is "b"
    first = await fwd._queue.get()
    assert first.action == "b"


def test_submit_does_not_raise_on_bad_input():
    fwd = af.AuditForwarder(fmt="gelf", transport="udp", host="x", port=1)
    # Even with a totally junk dict it must not raise.
    fwd.submit({"ts_ms": "not-an-int", "result": None})


# ---------------------------------------------------------------- UDP transport

@pytest.mark.asyncio
async def test_udp_delivers_gelf():
    """Bind a UDP socket on a free port; have the forwarder ship to it; verify
    the JSON arrives intact."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("127.0.0.1", 0))
    sock.settimeout(2.0)
    port = sock.getsockname()[1]

    fwd = af.AuditForwarder(
        fmt="gelf", transport="udp",
        host="127.0.0.1", port=port,
        hostname="host01",
    )
    await fwd.start()
    try:
        fwd.submit({
            "ts_ms": 1_700_000_000_000, "user": "alice",
            "source_ip": "10.0.0.5", "action": "vm.start",
            "result": "ok", "request_id": "r1",
            "cluster_id": "c1", "target": "vm/100",
        })

        # Receive in a thread to avoid blocking the loop
        loop = asyncio.get_running_loop()
        data, _addr = await loop.run_in_executor(None, sock.recvfrom, 4096)
        j = json.loads(data.decode("utf-8"))
        assert j["_user"] == "alice"
        assert j["_action"] == "vm.start"
        assert j["host"] == "host01"
    finally:
        await fwd.stop()
        sock.close()


# ---------------------------------------------------------------- TCP transport

@pytest.mark.asyncio
async def test_tcp_delivers_gelf_null_terminated():
    """Spin up a tiny asyncio TCP server, point the forwarder at it, verify
    null-terminated GELF payloads arrive."""
    received: list[bytes] = []
    server_ready = asyncio.Event()
    payloads_in = asyncio.Event()

    async def handle(reader, writer):
        # Read until we see two NUL terminators
        buf = b""
        while not payloads_in.is_set():
            chunk = await reader.read(4096)
            if not chunk:
                break
            buf += chunk
            if buf.count(b"\x00") >= 2:
                received.extend([p for p in buf.split(b"\x00") if p])
                payloads_in.set()
                break

    server = await asyncio.start_server(handle, "127.0.0.1", 0)
    port = server.sockets[0].getsockname()[1]
    server_ready.set()

    fwd = af.AuditForwarder(
        fmt="gelf", transport="tcp",
        host="127.0.0.1", port=port,
        hostname="host01",
    )
    await fwd.start()
    try:
        for i in range(2):
            fwd.submit({
                "ts_ms": 1_700_000_000_000 + i, "user": f"u{i}",
                "source_ip": "10.0.0.5", "action": "vm.start",
                "result": "ok", "request_id": f"r{i}",
            })
        await asyncio.wait_for(payloads_in.wait(), timeout=4.0)
    finally:
        await fwd.stop()
        server.close()
        await server.wait_closed()

    assert len(received) >= 2
    j0 = json.loads(received[0].decode())
    j1 = json.loads(received[1].decode())
    users = {j0["_user"], j1["_user"]}
    assert users == {"u0", "u1"}


@pytest.mark.asyncio
async def test_tcp_delivers_syslog_newline_framed():
    received: list[bytes] = []
    payloads_in = asyncio.Event()

    async def handle(reader, writer):
        buf = b""
        while not payloads_in.is_set():
            chunk = await reader.read(4096)
            if not chunk:
                break
            buf += chunk
            if buf.count(b"\n") >= 1:
                received.extend([p for p in buf.split(b"\n") if p])
                payloads_in.set()
                break

    server = await asyncio.start_server(handle, "127.0.0.1", 0)
    port = server.sockets[0].getsockname()[1]

    fwd = af.AuditForwarder(
        fmt="syslog", transport="tcp", host="127.0.0.1", port=port,
        hostname="host01",
    )
    await fwd.start()
    try:
        fwd.submit({
            "ts_ms": 1_700_000_000_000, "user": "alice",
            "source_ip": "10.0.0.5", "action": "vm.start",
            "result": "ok", "request_id": "r-syslog",
        })
        await asyncio.wait_for(payloads_in.wait(), timeout=4.0)
    finally:
        await fwd.stop()
        server.close()
        await server.wait_closed()

    assert received, "no syslog line received"
    line = received[0].decode("utf-8")
    assert line.startswith("<")
    assert "[audit@53595" in line
    assert 'user="alice"' in line


# ---------------------------------------------------------------- module-level

def test_module_get_set_forwarder_round_trip():
    assert af.get_forwarder() is None
    fwd = af.AuditForwarder(fmt="gelf", transport="udp", host="x", port=1)
    af.set_forwarder(fwd)
    assert af.get_forwarder() is fwd
    af.set_forwarder(None)
    assert af.get_forwarder() is None
