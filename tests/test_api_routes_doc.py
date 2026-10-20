"""API-ROUTES.md must list exactly the routes the server registers.

The table is generated (scripts/gen_api_routes.py) because API.md, written by
hand, documented a few dozen of ~300 routes. This test keeps the generated file
from going stale: add or remove a route and it fails until the file is
regenerated. It reads only the markdown, so it runs in the public mirror too.
"""
from __future__ import annotations

import re
from pathlib import Path

import pytest

from server.server import create_app

HERE = Path(__file__).resolve().parent.parent
DOC = next((p for p in (HERE / "API-ROUTES.md", HERE / "github" / "API-ROUTES.md")
            if p.exists()), None)


def _documented() -> dict[tuple[str, str], str]:
    rows = {}
    for line in DOC.read_text().splitlines():
        m = re.match(r"^\| `(\w+)` \| `([^`]+)` \| ([^|]+?) \|", line)
        if m:
            rows[(m.group(1), m.group(2))] = m.group(3).strip()
    return rows


def _registered() -> set[tuple[str, str]]:
    app = create_app()
    return {(r.method, r.resource.canonical) for r in app.router.routes()
            if r.method not in ("HEAD", "OPTIONS")}


@pytest.mark.skipif(DOC is None, reason="API-ROUTES.md not present")
def test_every_route_is_documented_and_nothing_stale():
    doc = _documented()
    live = _registered()
    missing = sorted(live - set(doc))
    stale = sorted(set(doc) - live)
    assert not missing and not stale, (
        "API-ROUTES.md is out of date — run scripts/gen_api_routes.py.\n"
        f"undocumented: {missing[:20]}\nno longer registered: {stale[:20]}")


@pytest.mark.skipif(DOC is None, reason="API-ROUTES.md not present")
def test_new_protection_routes_are_viewer_gated_in_the_doc():
    doc = _documented()
    for path in ("/api/clusters/{cluster_id}/protection/backups",
                 "/api/clusters/{cluster_id}/protection/snapshots"):
        assert doc[("GET", path)] == "viewer"
