"""Per-cluster free-form ops notes.

Operators leave reminders like "PROD cluster — never reboot host-101 during
business hours" or "host-104 still on legacy SSDs, plan migration before end
of Q3". Stored in SQLite (one row per cluster_id), retrieved on demand.

Routes:
  GET /api/clusters/{cluster_id}/notes
  PUT /api/clusters/{cluster_id}/notes  body: {notes: "…"}
"""
from __future__ import annotations

import logging
import time
from typing import Optional

import aiosqlite
from aiohttp import web

from . import audit, db
from .middleware import role_required


logger = logging.getLogger(__name__)


async def get_notes(cluster_id: str) -> tuple[str, Optional[str], int]:
    async with aiosqlite.connect(str(db.get_path())) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        cur = await conn.execute(
            "SELECT notes, updated_by, updated_at FROM cluster_notes "
            "WHERE cluster_id = ?",
            (cluster_id,),
        )
        row = await cur.fetchone()
        if row is None:
            return "", None, 0
        return row[0], row[1], int(row[2] or 0)


async def set_notes(cluster_id: str, notes: str, updated_by: str) -> None:
    async with aiosqlite.connect(str(db.get_path())) as conn:
        await conn.execute("PRAGMA foreign_keys=ON")
        ts = int(time.time())
        await conn.execute(
            "INSERT INTO cluster_notes (cluster_id, notes, updated_by, updated_at) "
            "VALUES (?, ?, ?, ?) "
            "ON CONFLICT(cluster_id) DO UPDATE SET "
            "  notes=excluded.notes, "
            "  updated_by=excluded.updated_by, "
            "  updated_at=excluded.updated_at",
            (cluster_id, notes, updated_by, ts),
        )
        await conn.commit()


@role_required("viewer")
async def get_notes_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    notes, updated_by, updated_at = await get_notes(cid)
    return web.json_response({
        "notes": notes,
        "updated_by": updated_by or "",
        "updated_at": updated_at,
    })


@role_required("admin")
async def put_notes_handler(request: web.Request) -> web.Response:
    cid = request.match_info["cluster_id"]
    try:
        body = await request.json()
    except Exception:
        return web.json_response({"error": "bad_json"}, status=400)
    notes = (body.get("notes") or "").strip()
    if len(notes) > 16384:
        return web.json_response({"error": "too_long",
                                  "max_chars": 16384}, status=400)
    user = (request.get("user") or {}).get("username", "anonymous")
    ip   = request.get("client_ip", "unknown")
    rid  = request.get("request_id", "")
    try:
        await set_notes(cid, notes, user)
    except Exception as e:
        await audit.write(user=user, source_ip=ip, action="cluster.notes.set",
                          target=cid, cluster_id=cid,
                          result=audit.result_error(e), request_id=rid)
        return web.json_response({"error": "db_error", "detail": str(e)}, status=500)
    await audit.write(user=user, source_ip=ip, action="cluster.notes.set",
                      target=cid, cluster_id=cid,
                      result="ok", request_id=rid,
                      params={"len": len(notes)})
    return web.json_response({"ok": True, "len": len(notes)})


ROUTES = [
    ("GET", r"/api/clusters/{cluster_id}/notes", get_notes_handler),
    ("PUT", r"/api/clusters/{cluster_id}/notes", put_notes_handler),
]
