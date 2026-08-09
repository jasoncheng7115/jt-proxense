"""Everything `npm run build` needs must be in the publish list.

v0.9.8 published the frontend source so contributors could build it, but the
sync list carried tsconfig.json WITHOUT the tsconfig.node.json it references
and WITHOUT public/ (favicon, logo, fonts). `tsc` then failed with TS6053 on a
fresh clone and the SPA was missing its static assets -- the same "the docs say
build it but you can't" failure the source-publishing change was meant to end,
reintroduced by an incomplete list.

These tests read sync-to-github.sh and the build configs; they do not run a
build (that lives in the release check). They fail if a build input is not
published.
"""
import json
import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent

# sync-to-github.sh is a dev/ops tool and is deliberately NOT published to the
# mirror, so these tests can only run in the source tree. Skipping cleanly in
# the mirror keeps its suite green -- the whole point of publishing src/ was to
# make the two trees agree, and a test that must fail in one of them defeats
# that. (Meta-lesson this project keeps relearning: a test has to be able to
# run in the tree it is shipped to.)
pytestmark = pytest.mark.skipif(
    not (ROOT / "sync-to-github.sh").exists(),
    reason="sync-to-github.sh is a dev tool, absent from the published mirror",
)


def _sync_items() -> set[str]:
    m = re.search(r"ITEMS=\((.*?)\n\)", (ROOT / "sync-to-github.sh").read_text(), re.S)
    assert m, "ITEMS array not found in sync-to-github.sh"
    # Strip trailing comments; take the first token on each line.
    return set(re.findall(r"^\s*([A-Za-z0-9_.\-/]+)", m.group(1), re.M))


def _covered(path: str, items: set[str]) -> bool:
    """A path is published if it, or its top-level dir, is a sync item."""
    return path in items or path.split("/")[0] in items


def test_frontend_build_files_are_published():
    """The specific files a contributor needs for `npm install && npm run build`."""
    items = _sync_items()
    for f in ("package.json", "package-lock.json", "tsconfig.json",
              "tsconfig.node.json", "vite.config.ts", "index.html", "src", "public"):
        assert _covered(f, items), f"{f} is required to build but not in the sync list"


def test_tsconfig_references_are_published():
    """tsconfig.json references tsconfig.node.json; a missing reference is a
    hard TS6053, not a warning."""
    items = _sync_items()
    tc = json.loads(re.sub(r"//.*", "", (ROOT / "tsconfig.json").read_text()))
    for ref in tc.get("references", []):
        p = ref["path"].lstrip("./")
        assert _covered(p, items), f"tsconfig references {p}, which is not published"


def test_vite_publicdir_is_published():
    vite = (ROOT / "vite.config.ts").read_text()
    m = re.search(r"publicDir:\s*['\"]([^'\"]+)", vite)
    if not m:
        pytest.skip("no explicit publicDir")
    items = _sync_items()
    assert _covered(m.group(1), items), (
        f"vite publicDir '{m.group(1)}' is not published; the SPA would ship "
        f"without its static assets")


def test_referenced_build_files_actually_exist():
    """Guard against listing something in sync that is not there to copy."""
    for f in ("tsconfig.node.json", "public", "package-lock.json"):
        assert (ROOT / f).exists(), f"{f} is in the sync list but missing from the tree"
