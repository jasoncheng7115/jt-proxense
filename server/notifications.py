"""Notifications subsystem — operator-defined channels + rules over audit rows.

Architecture (mirrors audit_forwarder's "best effort, never blocks audit"):
  - audit.write() ALSO calls notifications.dispatch(row) after the SQLite
    insert. Dispatch is non-blocking — schedules a fire-and-forget task per
    matched rule; failures are logged at WARNING.
  - Two channel types in v0.3.x: webhook (POST JSON) and email (SMTP).
  - Rules filter rows by action LIKE pattern + min severity + cluster
    filter, then fan out to a list of channel ids.
  - Channels and rules are operator-managed via /api/notifications and an
    admin web UI. CLI also exposes minimal CRUD (handy for back-door
    bootstrap).

Severity mapping (audit `result` → notification severity):
  - 'ok'                  → 'ok'
  - 'denied'              → 'notice'
  - 'pending'             → 'notice'
  - 'error:*'             → 'error'
  - anything else         → 'ok'
"""
from __future__ import annotations

import asyncio
import json
import logging
import smtplib
from email.message import EmailMessage
from typing import Any, Optional

import aiohttp

from . import db


logger = logging.getLogger(__name__)

# Severity ordering for min-severity comparison.
_SEVERITY_RANK = {"ok": 1, "notice": 2, "warning": 3, "error": 4}


def _severity_of(row: dict) -> str:
    r = (row.get("result") or "ok")
    if r == "ok":
        return "ok"
    if r == "denied":
        return "notice"
    if r == "pending":
        return "notice"
    if r.startswith("error"):
        return "error"
    return "ok"


# ---------------------------------------------------------------- channels CRUD

def list_channels() -> list[dict]:
    with db.connect_sync() as c:
        rows = c.execute(
            "SELECT id, name, type, enabled, config_json, created_at, updated_at "
            "FROM notification_channels ORDER BY name"
        ).fetchall()
    return [
        {**dict(r), "config": json.loads(r["config_json"]) if r["config_json"] else {}}
        for r in rows
    ]


def get_channel(name: str) -> Optional[dict]:
    with db.connect_sync() as c:
        row = c.execute(
            "SELECT id, name, type, enabled, config_json FROM notification_channels "
            "WHERE name=? COLLATE NOCASE", (name,),
        ).fetchone()
    if not row:
        return None
    d = dict(row)
    d["config"] = json.loads(d.pop("config_json")) if d.get("config_json") else {}
    return d


def create_channel(name: str, type_: str, config: dict, *, enabled: bool = True) -> int:
    if type_ not in ("webhook", "email"):
        raise ValueError(f"unsupported channel type: {type_}")
    if type_ == "webhook" and not config.get("url"):
        raise ValueError("webhook channel requires url")
    if type_ == "email":
        for k in ("smtp_host", "smtp_port", "to"):
            if not config.get(k):
                raise ValueError(f"email channel requires {k}")
    now = db.now_ms()
    with db.connect_sync() as c:
        try:
            cur = c.execute(
                "INSERT INTO notification_channels "
                "(name, type, enabled, config_json, created_at, updated_at) "
                "VALUES (?,?,?,?,?,?)",
                (name, type_, 1 if enabled else 0,
                 json.dumps(config, ensure_ascii=False), now, now),
            )
            return cur.lastrowid
        except Exception as e:
            if "UNIQUE constraint" in str(e):
                raise ValueError(f"channel already exists: {name}") from e
            raise


def update_channel(name: str, *, enabled: Optional[bool] = None,
                   config: Optional[dict] = None) -> bool:
    sets, args = [], []
    if enabled is not None:
        sets.append("enabled = ?"); args.append(1 if enabled else 0)
    if config is not None:
        sets.append("config_json = ?"); args.append(json.dumps(config, ensure_ascii=False))
    if not sets:
        return False
    sets.append("updated_at = ?"); args.append(db.now_ms())
    args.append(name)
    with db.connect_sync() as c:
        cur = c.execute(
            f"UPDATE notification_channels SET {', '.join(sets)} "
            "WHERE name=? COLLATE NOCASE", args,
        )
        return cur.rowcount > 0


def delete_channel(name: str) -> bool:
    with db.connect_sync() as c:
        cur = c.execute("DELETE FROM notification_channels WHERE name=? COLLATE NOCASE", (name,))
        return cur.rowcount > 0


# ---------------------------------------------------------------- rules CRUD

def list_rules() -> list[dict]:
    with db.connect_sync() as c:
        rows = c.execute(
            "SELECT id, name, enabled, action_pattern, min_severity, "
            "       cluster_filter, channel_ids_json, created_at "
            "FROM notification_rules ORDER BY name"
        ).fetchall()
    out = []
    for r in rows:
        d = dict(r)
        d["channel_ids"] = json.loads(d.pop("channel_ids_json") or "[]")
        out.append(d)
    return out


def create_rule(name: str, *, action_pattern: Optional[str] = None,
                min_severity: str = "ok",
                cluster_filter: Optional[str] = None,
                channel_ids: list[int] = None,
                enabled: bool = True) -> int:
    if min_severity not in _SEVERITY_RANK:
        raise ValueError(f"bad min_severity: {min_severity}")
    if channel_ids is None:
        channel_ids = []
    with db.connect_sync() as c:
        try:
            cur = c.execute(
                "INSERT INTO notification_rules "
                "(name, enabled, action_pattern, min_severity, cluster_filter, channel_ids_json, created_at) "
                "VALUES (?,?,?,?,?,?,?)",
                (name, 1 if enabled else 0,
                 action_pattern, min_severity, cluster_filter,
                 json.dumps(channel_ids), db.now_ms()),
            )
            return cur.lastrowid
        except Exception as e:
            if "UNIQUE constraint" in str(e):
                raise ValueError(f"rule already exists: {name}") from e
            raise


def update_rule(name: str, **fields) -> bool:
    allowed = {"enabled", "action_pattern", "min_severity",
               "cluster_filter", "channel_ids"}
    sets, args = [], []
    for k, v in fields.items():
        if k not in allowed:
            continue
        if k == "channel_ids":
            sets.append("channel_ids_json = ?"); args.append(json.dumps(v))
        elif k == "enabled":
            sets.append("enabled = ?"); args.append(1 if v else 0)
        else:
            sets.append(f"{k} = ?"); args.append(v)
    if not sets:
        return False
    args.append(name)
    with db.connect_sync() as c:
        cur = c.execute(
            f"UPDATE notification_rules SET {', '.join(sets)} "
            "WHERE name=? COLLATE NOCASE", args,
        )
        return cur.rowcount > 0


def delete_rule(name: str) -> bool:
    with db.connect_sync() as c:
        cur = c.execute("DELETE FROM notification_rules WHERE name=? COLLATE NOCASE", (name,))
        return cur.rowcount > 0


# ---------------------------------------------------------------- matching

def _matches_rule(row: dict, rule: dict) -> bool:
    """Compare an audit-row dict against a rule dict (already with parsed channel_ids)."""
    if not rule.get("enabled"):
        return False
    sev = _severity_of(row)
    if _SEVERITY_RANK[sev] < _SEVERITY_RANK[rule.get("min_severity", "ok")]:
        return False
    pat = rule.get("action_pattern")
    if pat:
        # Translate SQL LIKE wildcards to fnmatch-style.
        from fnmatch import fnmatchcase
        glob_pat = pat.replace("%", "*").replace("_", "?")
        if not fnmatchcase(row.get("action") or "", glob_pat):
            return False
    cf = rule.get("cluster_filter")
    if cf and row.get("cluster_id") != cf:
        return False
    return True


# ---------------------------------------------------------------- dispatch

async def send_test(channel_name: str) -> tuple[bool, str]:
    """Synchronously send a test event to one channel and report success.
    Used by the "Send test" button in the notifications UI."""
    channels = [c for c in list_channels() if c.get("name") == channel_name]
    if not channels:
        return False, "channel_not_found"
    ch = channels[0]
    if not ch.get("enabled"):
        return False, "channel_disabled"
    fake_row = {
        "ts_ms": int(__import__("time").time() * 1000),
        "user": "jt-proxense",
        "source_ip": "127.0.0.1",
        "cluster_id": None,
        "action": "notification.test",
        "target": channel_name,
        "params_hash": None,
        "result": "ok",
        "request_id": "test",
    }
    fake_rule = {
        "id": 0, "name": "(test)", "action_pattern": "%",
        "min_severity": "info", "cluster_filter": None,
        "channel_ids": [ch["id"]], "enabled": True,
    }
    try:
        await _send_channel(ch, fake_rule, fake_row)
        return True, "ok"
    except Exception as e:
        return False, str(e)


def dispatch(row: dict) -> None:
    """Schedule notification fan-out for one audit row.

    Called by audit.write() AFTER the SQLite insert. Returns immediately;
    each channel send happens in its own background task. Never raises.
    """
    try:
        rules = list_rules()
        if not rules:
            return
        channels_by_id = {c["id"]: c for c in list_channels() if c.get("enabled")}
        if not channels_by_id:
            return
    except Exception as e:
        logger.warning("notifications: rule/channel lookup failed: %s", e)
        return

    for rule in rules:
        try:
            if not _matches_rule(row, rule):
                continue
            for cid in rule["channel_ids"]:
                ch = channels_by_id.get(cid)
                if ch is None:
                    continue
                try:
                    asyncio.get_running_loop().create_task(
                        _send_channel(ch, rule, row),
                        name=f"notif-{ch['name']}",
                    )
                except RuntimeError:
                    # No running loop (e.g. CLI context) — drop silently.
                    pass
        except Exception as e:
            logger.warning("notifications: rule dispatch failed: %s", e)


async def _send_channel(channel: dict, rule: dict, row: dict) -> None:
    try:
        if channel["type"] == "webhook":
            await _send_webhook(channel["config"], rule, row)
        elif channel["type"] == "email":
            await _send_email(channel["config"], rule, row)
    except Exception as e:
        logger.warning("notification send failed: channel=%s err=%s",
                       channel.get("name"), e)


async def _send_webhook(config: dict, rule: dict, row: dict) -> None:
    url = config["url"]
    method = (config.get("method") or "POST").upper()
    headers = config.get("headers") or {}
    headers.setdefault("Content-Type", "application/json")
    payload = {
        "jt_proxense": {"version": "0.3", "rule": rule.get("name")},
        "audit": row,
        "severity": _severity_of(row),
    }
    timeout = aiohttp.ClientTimeout(total=float(config.get("timeout_s", 5)))
    async with aiohttp.ClientSession(timeout=timeout) as s:
        async with s.request(method, url, json=payload, headers=headers) as resp:
            if resp.status >= 400:
                text = await resp.text()
                logger.warning("webhook %s returned %d: %s",
                               url, resp.status, text[:200])


async def _send_email(config: dict, rule: dict, row: dict) -> None:
    """Email goes through SMTP via blocking smtplib in a thread executor."""
    msg = EmailMessage()
    sev = _severity_of(row)
    subject_prefix = f"[{sev.upper()}] [jt-proxense]"
    msg["Subject"] = f"{subject_prefix} {row.get('action')} {row.get('result')}"
    msg["From"] = config.get("from", "jt-proxense@localhost")
    msg["To"] = config["to"]
    body_lines = [
        f"Rule:       {rule.get('name')}",
        f"Severity:   {sev}",
        f"Action:     {row.get('action')}",
        f"Result:     {row.get('result')}",
        f"User:       {row.get('user')}",
        f"Source IP:  {row.get('source_ip')}",
        f"Target:     {row.get('target') or '-'}",
        f"Cluster:    {row.get('cluster_id') or '-'}",
        f"Request ID: {row.get('request_id')}",
        f"Timestamp:  {row.get('ts_ms') or row.get('ts')}",
    ]
    msg.set_content("\n".join(body_lines))
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, _send_email_sync, config, msg)


def _send_email_sync(config: dict, msg: EmailMessage) -> None:
    host = config["smtp_host"]
    port = int(config.get("smtp_port", 587))
    use_tls = bool(config.get("starttls", True))
    user = config.get("smtp_user")
    pw = config.get("smtp_password")
    if use_tls:
        with smtplib.SMTP(host, port, timeout=10) as srv:
            srv.ehlo()
            srv.starttls()
            srv.ehlo()
            if user:
                srv.login(user, pw or "")
            srv.send_message(msg)
    else:
        with smtplib.SMTP(host, port, timeout=10) as srv:
            if user:
                srv.login(user, pw or "")
            srv.send_message(msg)
