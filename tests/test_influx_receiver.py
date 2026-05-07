"""Tests for the InfluxDB-line-protocol receiver.

Two layers:
  - Parser unit tests — line-protocol edge cases (escaped chars, quoted
    strings, integer markers, missing timestamps, comments).
  - HTTP integration — POST a real Telegraf payload to a running
    `InfluxReceiver` and verify points end up in the ring buffer with the
    right host indexing.
"""
from __future__ import annotations

import asyncio
import gzip
import socket
from typing import Any

import aiohttp
import pytest

from server import influx_receiver as ir


# ============================================================ parser tests

def test_parser_minimal_int_field() -> None:
    points = ir.parse_line_protocol('cpu,host=h1 usage=42i 1700000000000000000')
    assert len(points) == 1
    p = points[0]
    assert p.measurement == "cpu"
    assert p.tags == {"host": "h1"}
    assert p.fields == {"usage": 42}
    assert p.timestamp_ns == 1700000000000000000


def test_parser_float_and_bool_fields() -> None:
    points = ir.parse_line_protocol(
        'mem,host=h1 used_pct=87.5,swap_used=t,active=true,oomkill=False 1700000000000000000'
    )
    p = points[0]
    assert p.fields["used_pct"] == 87.5
    assert p.fields["swap_used"] is True
    assert p.fields["active"] is True
    assert p.fields["oomkill"] is False


def test_parser_quoted_string_field_with_spaces_and_escapes() -> None:
    body = 'evt,host=h1 msg="hello world",path="C:\\\\Users\\\\Bob" 17e17'
    # Note: Python source `\\\\` -> 2 backslashes in the actual string
    points = ir.parse_line_protocol(body)
    assert len(points) == 1
    p = points[0]
    assert p.fields["msg"] == "hello world"
    # The path field round-trips backslashes as written
    assert "\\" in p.fields["path"]


def test_parser_no_timestamp() -> None:
    points = ir.parse_line_protocol('cpu,host=h1 usage=42i')
    assert len(points) == 1
    assert points[0].timestamp_ns is None


def test_parser_skips_comments_and_blank_lines() -> None:
    body = "\n# this is a comment\ncpu,host=h1 usage=1i\n\n# another\ncpu,host=h2 usage=2i"
    points = ir.parse_line_protocol(body)
    assert len(points) == 2
    hosts = [p.tags["host"] for p in points]
    assert hosts == ["h1", "h2"]


def test_parser_escaped_comma_in_tag_value() -> None:
    # Telegraf writes commas-in-tag-values as `\,`
    body = r'cpu,host=h1,job=worker\,1 usage=1i'
    points = ir.parse_line_protocol(body)
    assert len(points) == 1
    assert points[0].tags["job"] == "worker,1"


def test_parser_multiple_tags_and_fields() -> None:
    body = "cpu,host=h1,cpu=cpu0,scope=user usage_idle=99.1,usage_user=0.7,usage_system=0.2 1700"
    points = ir.parse_line_protocol(body)
    assert len(points) == 1
    p = points[0]
    assert set(p.tags) == {"host", "cpu", "scope"}
    assert set(p.fields) == {"usage_idle", "usage_user", "usage_system"}
    assert p.fields["usage_idle"] == 99.1


def test_parser_drops_unparseable_lines_without_raising() -> None:
    body = "good,host=h1 v=1i\ngarbage with no equals\nstill,host=h2 ok=t"
    points = ir.parse_line_protocol(body)
    # First and third lines parse; middle is dropped silently.
    measurements = [p.measurement for p in points]
    assert "good" in measurements
    assert "still" in measurements
    assert "garbage" not in measurements


# ============================================================ store tests

@pytest.mark.asyncio
async def test_store_buckets_by_host() -> None:
    # Reset the module-level state so this test is hermetic.
    ir._metrics.clear()
    pts = ir.parse_line_protocol(
        "cpu,host=h1 v=1i\n"
        "cpu,host=h2 v=2i\n"
        "mem,host=h1 used=99.0"
    )
    await ir.store_points(pts)
    assert "h1" in ir._metrics
    assert "h2" in ir._metrics
    assert "cpu" in ir._metrics["h1"]
    assert "mem" in ir._metrics["h1"]
    h1 = ir.get_host_metrics("h1")
    assert len(h1["cpu"]) == 1
    assert h1["cpu"][0].fields == {"v": 1}


@pytest.mark.asyncio
async def test_store_drops_points_without_host_tag() -> None:
    ir._metrics.clear()
    # No 'host' tag → skipped (we have no way to route the sample).
    pts = ir.parse_line_protocol("cpu,region=us v=1i")
    await ir.store_points(pts)
    assert ir._metrics == {}


@pytest.mark.asyncio
async def test_store_ring_buffer_capped() -> None:
    ir._metrics.clear()
    body = "\n".join(f"cpu,host=hN v={i}i" for i in range(ir._BUFFER_PER_KEY + 50))
    pts = ir.parse_line_protocol(body)
    await ir.store_points(pts)
    samples = ir.get_host_metrics("hN")["cpu"]
    # Buffer keeps only the last N
    assert len(samples) == ir._BUFFER_PER_KEY
    # Values are the LATEST batch — ring evicts oldest first
    assert samples[-1].fields["v"] == ir._BUFFER_PER_KEY + 49


# ============================================================ http integration


def _free_port() -> int:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(("127.0.0.1", 0))
    p = s.getsockname()[1]
    s.close()
    return p


@pytest.mark.asyncio
async def test_receiver_accepts_v2_write_no_auth() -> None:
    ir._metrics.clear()
    port = _free_port()
    recv = ir.InfluxReceiver(
        host="127.0.0.1", port=port, token="", on_points=ir.store_points,
    )
    await recv.start()
    try:
        async with aiohttp.ClientSession() as s:
            async with s.post(
                f"http://127.0.0.1:{port}/api/v2/write",
                data="cpu,host=ph1 usage=33.3 1700000000000000000",
            ) as r:
                assert r.status == 204
        # Give the event loop a tick; store_points was awaited by the handler
        # so data should be visible immediately.
        h = ir.get_host_metrics("ph1")
        assert "cpu" in h
        assert h["cpu"][-1].fields["usage"] == 33.3
    finally:
        await recv.stop()


@pytest.mark.asyncio
async def test_receiver_token_auth_enforced() -> None:
    ir._metrics.clear()
    port = _free_port()
    recv = ir.InfluxReceiver(
        host="127.0.0.1", port=port, token="s3cret", on_points=ir.store_points,
    )
    await recv.start()
    try:
        async with aiohttp.ClientSession() as s:
            # Missing auth — should be rejected
            async with s.post(
                f"http://127.0.0.1:{port}/api/v2/write",
                data="cpu,host=ph1 v=1i",
            ) as r:
                assert r.status == 401
            # Correct token — accepted
            async with s.post(
                f"http://127.0.0.1:{port}/api/v2/write",
                data="cpu,host=ph1 v=1i",
                headers={"Authorization": "Token s3cret"},
            ) as r:
                assert r.status == 204
            # Bearer fallback — also accepted (Telegraf doesn't use it but
            # other writers might).
            async with s.post(
                f"http://127.0.0.1:{port}/api/v2/write",
                data="cpu,host=ph1 v=2i",
                headers={"Authorization": "Bearer s3cret"},
            ) as r:
                assert r.status == 204
        assert recv.stats()["auth_fail"] == 1
        assert recv.stats()["writes"] == 2
    finally:
        await recv.stop()


@pytest.mark.asyncio
async def test_receiver_handles_gzip_bodies() -> None:
    ir._metrics.clear()
    port = _free_port()
    recv = ir.InfluxReceiver(
        host="127.0.0.1", port=port, token="", on_points=ir.store_points,
    )
    await recv.start()
    try:
        body = "cpu,host=gz v=99i".encode("utf-8")
        gz_body = gzip.compress(body)
        async with aiohttp.ClientSession() as s:
            async with s.post(
                f"http://127.0.0.1:{port}/api/v2/write",
                data=gz_body,
                headers={"Content-Encoding": "gzip"},
            ) as r:
                assert r.status == 204
        h = ir.get_host_metrics("gz")
        assert h["cpu"][-1].fields["v"] == 99
    finally:
        await recv.stop()


@pytest.mark.asyncio
async def test_receiver_v1_endpoint_disabled() -> None:
    """The legacy v1 `/write` endpoint is intentionally NOT registered;
    we only support InfluxDB v2 (`/api/v2/write`). An old v1 agent
    pointed at us must get a clear 404 rather than a silent success."""
    ir._metrics.clear()
    port = _free_port()
    recv = ir.InfluxReceiver(
        host="127.0.0.1", port=port, token="", on_points=ir.store_points,
    )
    await recv.start()
    try:
        async with aiohttp.ClientSession() as s:
            async with s.post(
                f"http://127.0.0.1:{port}/write",
                data="mem,host=v1h used=512i",
            ) as r:
                assert r.status == 404
        assert "v1h" not in ir.get_all_hosts()
    finally:
        await recv.stop()


@pytest.mark.asyncio
async def test_receiver_health_endpoint() -> None:
    port = _free_port()
    recv = ir.InfluxReceiver(
        host="127.0.0.1", port=port, token="", on_points=ir.store_points,
    )
    await recv.start()
    try:
        async with aiohttp.ClientSession() as s:
            async with s.get(f"http://127.0.0.1:{port}/health") as r:
                assert r.status == 200
                data = await r.json()
                assert data["ok"] is True
    finally:
        await recv.stop()
