"""Node and guest RRDs are DIFFERENT schemas; a chart must read its own.

Issue #4: the Performance History modal drew Memory and Disk I/O from `s.mem`,
`s.diskread` and `s.diskwrite` for every kind. Guests have those fields; nodes
have none of them. PVE keeps no per-node disk-IO counters at all, and reports
node memory as `memused` / `memtotal`.

Nothing raised. An all-undefined series draws an empty card, so the modal
reported "no data" for data that was there under another name and for data that
has never existed -- the project's recurring "answers wrongly instead of
failing" shape (CLAUDE.md #9).

The fixtures are real payloads captured from the operator's clusters (PVE
9.0.10 and 9.2.3), so these assertions run against what PVE actually emits
rather than against what the docs or this file's author believe it emits
(CLAUDE.md #15).
"""
import json
import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parent.parent
FIX = Path(__file__).resolve().parent / "fixtures" / "rrd"
MODAL = ROOT / "src" / "client" / "components" / "RRDChartModal.tsx"

pytestmark = pytest.mark.skipif(
    not MODAL.exists(), reason="frontend source not present in this tree")


def _keys(name: str) -> set[str]:
    return set(json.loads((FIX / f"{name}.json").read_text())["keys"])


NODE_KEYS = _keys("node_hour")
GUEST_KEYS = _keys("qemu_hour")

# Fields that exist for exactly one of the two kinds. Reading one of these on
# the wrong kind is silently undefined.
GUEST_ONLY = GUEST_KEYS - NODE_KEYS
NODE_ONLY = NODE_KEYS - GUEST_KEYS


def _branches(src: str) -> tuple[list[str], list[str]]:
    """Split out the `kind === 'node' ? (A) : (B)` arms.

    Paren-matched rather than pattern-matched, so reindenting or reordering the
    cards cannot make this silently stop looking at anything.
    """
    node_arms, guest_arms = [], []
    for m in re.finditer(r"kind === 'node' \?\s*\(", src):
        i, depth = m.end() - 1, 0
        while i < len(src):
            if src[i] == "(":
                depth += 1
            elif src[i] == ")":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        node_arms.append(src[m.end():i])
        rest = src[i + 1:]
        e = re.match(r"\s*:\s*\(", rest)
        assert e, "ternary has no else arm; the parse below would be blind to it"
        j, depth = e.end() - 1, 0
        while j < len(rest):
            if rest[j] == "(":
                depth += 1
            elif rest[j] == ")":
                depth -= 1
                if depth == 0:
                    break
            j += 1
        guest_arms.append(rest[e.end():j])
    assert node_arms, "no kind === 'node' branch found -- charts are kind-blind again"
    return node_arms, guest_arms


def _fields(text: str) -> set[str]:
    """Every RRD field the sample accessor reads, e.g. `s.memused`.

    The lookbehind keeps dotted i18n keys such as 'rrd.s.arc' out; without it
    they parse as a field named `arc` and this file fails on its own labels.
    """
    return set(re.findall(r"(?<![.\w])s\.([a-z][a-z0-9_]*)", text))


def test_the_two_schemas_really_do_differ():
    """Guard the premise. If a future PVE unified these, the fixtures change and
    the rest of this file should be revisited rather than quietly kept."""
    assert "mem" in GUEST_ONLY and "maxmem" in GUEST_ONLY
    assert {"diskread", "diskwrite"} <= GUEST_ONLY, (
        "guest disk-IO counters missing from the guest fixture")
    assert not {"diskread", "diskwrite"} & NODE_KEYS, (
        "PVE grew per-node disk IO; the node charts can now show it")
    assert {"memused", "memtotal"} <= NODE_ONLY


def test_node_charts_never_read_a_guest_only_field():
    """The exact bug in issue #4."""
    node_arms, _ = _branches(MODAL.read_text())
    for arm in node_arms:
        bad = sorted(_fields(arm) & GUEST_ONLY)
        assert not bad, (
            f"node chart reads guest-only field(s) {bad}; a node sample has no "
            f"such key, so the card renders empty")


def test_guest_charts_never_read_a_node_only_field():
    """The same mistake in the other direction, which would blank the VM
    charts that currently work."""
    _, guest_arms = _branches(MODAL.read_text())
    for arm in guest_arms:
        bad = sorted(_fields(arm) & NODE_ONLY)
        assert not bad, f"guest chart reads node-only field(s) {bad}"


def test_every_field_the_modal_reads_actually_exists():
    """Catches a typo or an invented field name anywhere in the modal, for any
    kind. Storage fields are checked against the storage payload's own shape."""
    src = MODAL.read_text()
    storage_fields = {"used", "total"}
    known = NODE_KEYS | GUEST_KEYS | storage_fields
    unknown = sorted(_fields(src) - known)
    assert not unknown, (
        f"modal reads field(s) PVE does not emit for any kind: {unknown}")


def test_node_memory_is_scaled_against_node_total():
    """`fillTop` sets the y-axis ceiling. Left on the guest's `maxmem` it would
    be undefined for a node, so the axis would auto-scale to the used line and
    a node at 40% would look pinned at the top."""
    node_arms, _ = _branches(MODAL.read_text())
    joined = "\n".join(node_arms)
    assert "memtotal" in joined, "node memory chart is not scaled against memtotal"
