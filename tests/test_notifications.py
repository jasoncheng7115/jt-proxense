"""Notifications subsystem — channels, rules, dispatch matching, fan-out."""
from __future__ import annotations

import asyncio
import json

import pytest
from aiohttp import web

from server import audit, notifications, db


# ---------------------------------------------------------------- migration

def test_migration_004_creates_tables(db_path):
    assert db.schema_version() >= 4
    with db.connect_sync() as c:
        names = {r[0] for r in c.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )}
    assert "notification_channels" in names
    assert "notification_rules" in names


# ---------------------------------------------------------------- channels CRUD

def test_create_webhook_channel(db_path):
    cid = notifications.create_channel(
        "ops-slack", "webhook",
        config={"url": "https://example.com/hook"},
    )
    assert cid > 0
    rows = notifications.list_channels()
    assert len(rows) == 1
    assert rows[0]["type"] == "webhook"
    assert rows[0]["config"]["url"] == "https://example.com/hook"


def test_create_email_channel(db_path):
    notifications.create_channel(
        "ops-email", "email",
        config={"smtp_host": "smtp.example.com", "smtp_port": 587, "to": "ops@example.com"},
    )
    ch = notifications.get_channel("ops-email")
    assert ch["type"] == "email"


def test_create_channel_duplicate_raises(db_path):
    notifications.create_channel("c1", "webhook", {"url": "http://x"})
    with pytest.raises(ValueError, match="already exists"):
        notifications.create_channel("c1", "webhook", {"url": "http://y"})


def test_create_channel_validates_required(db_path):
    with pytest.raises(ValueError, match="webhook channel requires url"):
        notifications.create_channel("c", "webhook", {})
    with pytest.raises(ValueError, match="email channel requires"):
        notifications.create_channel("c", "email", {"smtp_host": "x"})


def test_unknown_channel_type(db_path):
    with pytest.raises(ValueError, match="unsupported channel type"):
        notifications.create_channel("c", "telegram", {})


def test_update_channel(db_path):
    notifications.create_channel("c", "webhook", {"url": "http://a"})
    assert notifications.update_channel("c", enabled=False) is True
    assert notifications.update_channel("c", config={"url": "http://b"}) is True
    ch = notifications.get_channel("c")
    assert ch["enabled"] == 0
    assert ch["config"]["url"] == "http://b"


def test_delete_channel(db_path):
    notifications.create_channel("c", "webhook", {"url": "http://x"})
    assert notifications.delete_channel("c") is True
    assert notifications.delete_channel("c") is False  # idempotent


# ---------------------------------------------------------------- rules CRUD

def test_create_and_list_rule(db_path):
    cid = notifications.create_channel("c", "webhook", {"url": "http://x"})
    rid = notifications.create_rule(
        "auth-events",
        action_pattern="auth.%",
        min_severity="notice",
        channel_ids=[cid],
    )
    assert rid > 0
    rules = notifications.list_rules()
    assert len(rules) == 1
    assert rules[0]["channel_ids"] == [cid]


def test_create_rule_bad_severity(db_path):
    with pytest.raises(ValueError, match="bad min_severity"):
        notifications.create_rule("r", min_severity="critical")


def test_update_rule(db_path):
    notifications.create_rule("r", min_severity="ok")
    notifications.update_rule("r", min_severity="warning", enabled=False,
                              channel_ids=[1, 2])
    rules = notifications.list_rules()
    assert rules[0]["min_severity"] == "warning"
    assert rules[0]["enabled"] == 0
    assert rules[0]["channel_ids"] == [1, 2]


def test_delete_rule(db_path):
    notifications.create_rule("r")
    assert notifications.delete_rule("r") is True
    assert notifications.delete_rule("r") is False


# ---------------------------------------------------------------- matching

def test_severity_of():
    assert notifications._severity_of({"result": "ok"}) == "ok"
    assert notifications._severity_of({"result": "denied"}) == "notice"
    assert notifications._severity_of({"result": "pending"}) == "notice"
    assert notifications._severity_of({"result": "error:Foo"}) == "error"


def test_match_action_pattern(db_path):
    rule = {
        "enabled": 1, "min_severity": "ok",
        "action_pattern": "auth.%", "cluster_filter": None,
    }
    assert notifications._matches_rule({"action": "auth.login", "result": "ok"}, rule)
    assert notifications._matches_rule({"action": "auth.logout", "result": "ok"}, rule)
    assert not notifications._matches_rule({"action": "vm.start", "result": "ok"}, rule)


def test_match_min_severity_filter(db_path):
    rule = {"enabled": 1, "min_severity": "error",
            "action_pattern": None, "cluster_filter": None}
    assert not notifications._matches_rule({"action": "x", "result": "ok"}, rule)
    assert not notifications._matches_rule({"action": "x", "result": "denied"}, rule)
    assert notifications._matches_rule({"action": "x", "result": "error:E"}, rule)


def test_match_disabled_rule(db_path):
    rule = {"enabled": 0, "min_severity": "ok",
            "action_pattern": None, "cluster_filter": None}
    assert not notifications._matches_rule({"action": "x", "result": "ok"}, rule)


def test_match_cluster_filter(db_path):
    rule = {"enabled": 1, "min_severity": "ok",
            "action_pattern": None, "cluster_filter": "cluster1"}
    assert notifications._matches_rule({"action": "x", "result": "ok",
                                         "cluster_id": "cluster1"}, rule)
    assert not notifications._matches_rule({"action": "x", "result": "ok",
                                             "cluster_id": "cluster2"}, rule)


# ---------------------------------------------------------------- end-to-end webhook fan-out

@pytest.mark.asyncio
async def test_dispatch_fires_webhook_on_matching_audit(db_path):
    """End-to-end: configure a webhook channel + rule, then call audit.write
    and verify the webhook is hit. Use a tiny aiohttp server as the receiver."""
    received: list[dict] = []
    received_event = asyncio.Event()

    async def handle(request):
        received.append(await request.json())
        received_event.set()
        return web.json_response({"ok": True})

    app = web.Application()
    app.router.add_post("/hook", handle)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "127.0.0.1", 0)
    await site.start()
    try:
        port = site._server.sockets[0].getsockname()[1]

        cid = notifications.create_channel(
            "test-hook", "webhook",
            config={"url": f"http://localhost:{port}/hook"},
        )
        notifications.create_rule(
            "everything",
            action_pattern=None, min_severity="ok",
            channel_ids=[cid],
        )

        await audit.write(
            user="alice", source_ip="10.0.0.1",
            action="vm.start", result="ok",
            request_id="r-1", target="cluster1/node1/vm/100",
            cluster_id="cluster1",
        )

        await asyncio.wait_for(received_event.wait(), timeout=4.0)
    finally:
        await runner.cleanup()

    assert len(received) == 1
    payload = received[0]
    assert payload["audit"]["action"] == "vm.start"
    assert payload["severity"] == "ok"


@pytest.mark.asyncio
async def test_dispatch_skips_non_matching_rule(db_path):
    """Rule pattern doesn't match → no fire."""
    fired = asyncio.Event()

    async def handle(request):
        fired.set()
        return web.json_response({"ok": True})

    app = web.Application()
    app.router.add_post("/hook", handle)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "127.0.0.1", 0)
    await site.start()
    try:
        port = site._server.sockets[0].getsockname()[1]
        cid = notifications.create_channel("h", "webhook",
                                            config={"url": f"http://localhost:{port}/hook"})
        notifications.create_rule("only-auth",
                                   action_pattern="auth.%",
                                   channel_ids=[cid])

        await audit.write(
            user="alice", source_ip="10.0.0.1",
            action="vm.start", result="ok",
            request_id="r-1",
        )
        # Give the dispatcher a beat — should NOT receive
        try:
            await asyncio.wait_for(fired.wait(), timeout=0.5)
            assert False, "non-matching rule fired anyway"
        except asyncio.TimeoutError:
            pass
    finally:
        await runner.cleanup()


@pytest.mark.asyncio
async def test_dispatch_silent_when_no_rules(db_path):
    """No rules / no channels → audit.write doesn't blow up."""
    await audit.write(
        user="alice", source_ip="10.0.0.1",
        action="x", result="ok", request_id="r",
    )


@pytest.mark.asyncio
async def test_dispatch_skips_disabled_channel(db_path):
    """A rule routed to a disabled channel: no send."""
    fired = asyncio.Event()

    async def handle(request):
        fired.set()
        return web.json_response({"ok": True})

    app = web.Application()
    app.router.add_post("/hook", handle)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, "127.0.0.1", 0)
    await site.start()
    try:
        port = site._server.sockets[0].getsockname()[1]
        cid = notifications.create_channel("h", "webhook",
                                            config={"url": f"http://localhost:{port}/hook"},
                                            enabled=False)
        notifications.create_rule("all", channel_ids=[cid])

        await audit.write(user="alice", source_ip="10.0.0.1",
                          action="x", result="ok", request_id="r")
        try:
            await asyncio.wait_for(fired.wait(), timeout=0.5)
            assert False, "disabled channel fired"
        except asyncio.TimeoutError:
            pass
    finally:
        await runner.cleanup()
