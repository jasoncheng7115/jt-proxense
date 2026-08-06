"""No two modules may register the same route.

This test exists because duplicate registration is silent and its symptoms
look like anything but a routing problem. aiohttp hands the path to whichever
module registers first; the loser's handler becomes dead code that still
imports, still passes its own unit tests, and still looks correct in review.

Three real bugs came from it:

* `GET /api/clusters/{cid}/backup-jobs` — the "next run" column was empty, the
  fix was applied to `backup_jobs.py`, deployment was verified by checking the
  file on disk, and nothing changed, because `pdm_backups.py` registers the
  same path first.
* The same pair also disagreed about authorisation: the live handler required
  `operator`, the dead one `viewer`, so viewers got 403 on the whole Backups
  page.
* `GET /api/clusters/{cid}/pools` — `pdm_resources.py` gates every pool route
  at admin including the list, and shadowed `pools_view.py`'s viewer-level
  read. A viewer could fetch one pool by id but not list them.

So: assert the registration table is unique, and assert the roles that the
route table actually resolves to.
"""
import importlib
import pkgutil
import re
from collections import defaultdict
from pathlib import Path

import pytest

SERVER = Path(__file__).resolve().parent.parent / "server"


def _modules_with_routes():
    out = {}
    for m in pkgutil.iter_modules([str(SERVER)]):
        if m.ispkg:
            continue
        try:
            mod = importlib.import_module(f"server.{m.name}")
        except Exception:
            continue
        routes = getattr(mod, "ROUTES", None)
        if isinstance(routes, (list, tuple)) and routes:
            out[m.name] = routes
    return out


def test_no_route_is_registered_by_two_modules():
    seen = defaultdict(list)
    for name, routes in _modules_with_routes().items():
        for entry in routes:
            method, path = entry[0], entry[1]
            seen[(method, path)].append(name)

    dupes = {k: sorted(set(v)) for k, v in seen.items() if len(set(v)) > 1}
    assert not dupes, (
        "These routes are registered by more than one module. aiohttp keeps "
        "the first registration and the rest become dead code:\n"
        + "\n".join(f"  {m} {p}  <- {mods}" for (m, p), mods in sorted(dupes.items()))
    )


def _role_of(handler) -> str | None:
    """Recover the role a handler is gated at.

    role_required wraps with functools.wraps, so the decorator's own closure is
    where the answer lives. Read it rather than grepping the source -- a source
    grep cannot tell which of two same-named handlers is the routed one, which
    is the whole problem this file is about.
    """
    for cell in getattr(handler, "__closure__", None) or ():
        v = cell.cell_contents
        if isinstance(v, int):          # _role_rank(min_role)
            return {1: "viewer", 2: "operator", 3: "admin"}.get(v)
        if isinstance(v, str) and v in ("viewer", "operator", "admin"):
            return v
    return None


# Endpoints that must stay readable by a plain viewer. Each one is a read-only
# pass-through; gating them higher silently empties a page rather than showing
# a permission error the operator can act on.
VIEWER_READABLE = [
    ("GET", "/api/clusters/{cluster_id}/pools"),
    ("GET", "/api/clusters/{cluster_id}/pools/{poolid}"),
    ("GET", "/api/clusters/{cluster_id}/backup-jobs"),
]


@pytest.mark.parametrize("method,path", VIEWER_READABLE)
def test_read_only_endpoints_are_reachable_by_a_viewer(method, path):
    table = {}
    for name, routes in _modules_with_routes().items():
        for entry in routes:
            key = (entry[0], entry[1].lstrip("r"))
            table.setdefault(key, (name, entry[2]))

    match = None
    for (m, p), v in table.items():
        if m == method and p.replace("r/", "/") == path:
            match = v
            break
    assert match, f"{method} {path} is not registered by any module"
    module, handler = match
    role = _role_of(handler)
    assert role == "viewer", (
        f"{method} {path} resolves to {module}.{handler.__name__} gated at "
        f"{role!r}; a read-only viewer endpoint must be 'viewer'."
    )
