"""The licence declaration must be consistent, and the notices complete.

THIRD-PARTY-NOTICES.md was missing eight runtime dependencies -- including the
two that actually constrain the choice of licence: asyncssh (EPL-2.0 OR
GPL-2.0-or-later, where only the GPL branch combines with the AGPL) and pyte
(LGPL-3.0). Nothing checked, so nothing noticed.
"""
import json
import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
GH = ROOT / "github"
NOTICES = GH / "THIRD-PARTY-NOTICES.md"

LICENCE_ID = "AGPL-3.0-or-later"


@pytest.mark.parametrize("where", ["root", "mirror"])
def test_license_file_is_the_real_agpl_text(where):
    """Check BOTH copies.

    The mirror's LICENSE was hand-maintained and outside the sync list, so
    every other surface said AGPL while the file the public repo actually
    ships still said Apache 2.0 -- the one file that legally matters, and the
    only one nothing was checking.
    """
    path = ROOT / "LICENSE" if where == "root" else GH / "LICENSE"
    if not path.exists():
        pytest.skip(f"{where} LICENSE not in this tree")
    text = path.read_text()
    assert "GNU AFFERO GENERAL PUBLIC LICENSE" in text
    assert "Version 3, 19 November 2007" in text
    # Section 13 is what makes the AGPL the AGPL; a truncated copy that drops
    # it would look plausible and grant something else entirely.
    assert "Remote Network Interaction" in text
    assert len(text.splitlines()) > 600, "AGPL-3.0 is ~660 lines; this looks truncated"


def test_package_json_declares_the_same_licence():
    d = json.loads((ROOT / "package.json").read_text())
    assert d.get("license") == LICENCE_ID


@pytest.mark.skipif(not NOTICES.exists(), reason="notices file not in this tree")
def test_every_runtime_dependency_is_in_the_notices():
    """requirements.txt is the source of truth for what we ship against."""
    req = []
    for line in (ROOT / "requirements.txt").read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        req.append(re.split(r"[><=\[]", line)[0].strip().lower())
    notes = NOTICES.read_text().lower()
    missing = sorted({r for r in req if r and r not in notes})
    assert not missing, f"not declared in THIRD-PARTY-NOTICES.md: {missing}"


@pytest.mark.skipif(not NOTICES.exists(), reason="notices file not in this tree")
def test_asyncssh_dual_licence_branch_is_recorded():
    """asyncssh is EPL-2.0 OR GPL-2.0-or-later. EPL-2.0 alone is NOT
    (A)GPL-compatible, so which branch we take is a legal fact about this
    project, not a detail -- it has to be written down."""
    notes = NOTICES.read_text()
    assert "asyncssh" in notes
    assert "GPL-2.0-or-later" in notes
    assert re.search(r"GPL-2\.0-or-later branch", notes), (
        "the notices must state that asyncssh is used under its GPL branch")


@pytest.mark.skipif(not NOTICES.exists(), reason="notices file not in this tree")
def test_vendored_browser_assets_are_declared():
    """noVNC and xterm.js ship verbatim in dist/assets and were undeclared."""
    notes = NOTICES.read_text()
    for name in ("noVNC", "xterm.js"):
        assert name in notes, f"{name} is vendored but not in the notices"


@pytest.mark.parametrize("doc", [
    "README.md", "README_zh-tw.md", "CONTRIBUTING.md",
    "docs/index.html", "docs/index.zh-tw.html",
])
def test_no_document_still_claims_apache(doc):
    """Every surface that names the licence must agree with LICENSE.

    The one permitted mention is the note that releases up to v0.9.9 remain
    Apache-2.0 -- that grant is irrevocable and saying so is accurate.
    """
    p = GH / doc
    if not p.exists():
        pytest.skip(f"{doc} not in this tree")
    for i, line in enumerate(p.read_text().splitlines(), 1):
        if re.search(r"Apache[ -]?(License )?2", line):
            assert re.search(r"v?0\.9\.9|irrevocable|不可撤回|permanently|永久", line), (
                f"{doc}:{i} still claims Apache 2.0: {line.strip()[:100]}")
