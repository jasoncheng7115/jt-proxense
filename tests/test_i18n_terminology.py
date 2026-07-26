"""zh-TW terminology guard.

The operator has corrected the same wording more than once — 儲存池 was fixed in
the demo subtitles, then reappeared in the ZFS view's i18n keys, and 系統池 slipped
through a search that only looked for the exact string 儲存池. A reviewer cannot
be relied on to catch every instance by eye, so the rules are asserted here and
run on every push.

Rules come from CLAUDE.md "UI conventions -> zh-TW terminology".
"""
import pathlib
import re

import pytest

I18N = pathlib.Path(__file__).parent.parent / "src" / "client" / "i18n.tsx"

# term -> (correct replacement, why)
FORBIDDEN = {
    "任務": ("作業", "PVE jobs/tasks are 作業"),
    "日誌": ("記錄", "logs are 記錄"),
    "資源池": ("資源集區", "PVE resource pools are 資源集區"),
    "儲存池": ("儲存集區", "storage/ZFS pools are 儲存集區"),
    "系統池": ("系統集區", "the root pool tag is 系統集區"),
    "視圖": ("檢視", "views are 檢視"),
    "告警": ("警示", "alerts are 警示"),
    "詳情": ("細節", "details are 細節"),
}

# Any bare 池 that is not part of an approved compound is almost certainly a
# missed 集區. Approved: none — every pool concept uses 集區.
BARE_POOL = re.compile(r"池")


def _lines():
    if not I18N.exists():
        pytest.skip("i18n.tsx not present (server-only checkout)")
    return I18N.read_text(encoding="utf-8").splitlines()


@pytest.mark.parametrize("bad", sorted(FORBIDDEN))
def test_forbidden_term_absent(bad):
    good, why = FORBIDDEN[bad]
    hits = [f"  line {i}: {ln.strip()[:100]}"
            for i, ln in enumerate(_lines(), 1) if bad in ln]
    assert not hits, (
        f"\n'{bad}' must be '{good}' ({why}). Found:\n" + "\n".join(hits))


def test_no_bare_pool_character():
    """Catches variants a whole-word search misses (系統池, 快取池, …)."""
    hits = [f"  line {i}: {ln.strip()[:100]}"
            for i, ln in enumerate(_lines(), 1) if BARE_POOL.search(ln)]
    assert not hits, (
        "\nEvery 'pool' concept is 集區 in zh-TW; found a bare 池:\n"
        + "\n".join(hits))
