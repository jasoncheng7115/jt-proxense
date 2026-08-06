"""Frontend invariants that TypeScript cannot express.

Each of these guards a bug class that has shipped in this project more than
once. They read the built source rather than running a browser, so they are
cheap enough to sit in the normal suite; the browser checks live in
scripts/ui_smoke.py.
"""
import re
from pathlib import Path

import pytest

CLIENT = Path(__file__).resolve().parent.parent / "src" / "client"
TSX = sorted(CLIENT.rglob("*.tsx"))


def _keyframes(src: str):
    """Yield (name, final-step-body) for every @keyframes block."""
    for m in re.finditer(r"@keyframes\s+([\w-]+)\s*\{((?:[^{}]|\{[^}]*\})*)\}", src):
        for step in re.findall(r"(?:100%|to)\s*\{([^}]*)\}", m.group(2)):
            yield m.group(1), step


# Animations that legitimately end somewhere other than the identity: a
# continuous rotation must land on 360deg, and a sweep must finish off-screen.
_ALLOWED = re.compile(
    r"rotate\(-?\d+deg\)"          # spinners
    r"|translateY\((?:\d{2,}(?:px|%)|calc)"   # scan lines sweeping away
    r"|translateX\(-?\d{2,}px\)"
    r"|scale\((?:0|0?\.\d+|[2-9])"  # deliberate grow/shrink exits
    r"|translate\(-50%, *-50%\)"    # centring, not an animation artefact
    r"|translate\(\d+px, *\d+px\)"  # tiling grid drift
    r"|hue-rotate"
    r"|drop-shadow"
    r"|blur\([1-9]"                 # exit blurs
    r"|brightness\([01]?\.[0-9]|brightness\([2-9]"   # exit flares
    # translate(-50%, ...) is CENTRING, not animation residue: the element is
    # positioned by it and must keep it. Anything else pairing with a -50% is
    # still checked, because the residue would ride along with the centring.
    r"|translate\(-50%"
    r"|translateX\(-50%\)$"
)


@pytest.mark.parametrize("path", TSX, ids=lambda p: p.name)
def test_animations_settle_at_identity(path):
    """A persisted transform/filter makes the element the containing block for
    every `position: fixed` descendant.

    That is how a context menu ended up rendering a sidebar-width away from the
    cursor: `.view-container`'s page-enter animation ended at `translateY(0)`
    instead of `none` (CLAUDE.md recurring mistake #7). `translateY(0)` and
    `blur(0)` look like "no transform" and are not.
    """
    offenders = []
    for name, step in _keyframes(path.read_text()):
        for prop in ("transform", "filter"):
            m = re.search(rf"\b{prop}\s*:\s*([^;]+);", step)
            if not m:
                continue
            val = m.group(1).strip()
            if val == "none" or _ALLOWED.search(val):
                continue
            offenders.append(f"@{name} ends at {prop}: {val}")
    assert not offenders, (
        f"{path.name}: these keyframes settle on a non-identity "
        f"transform/filter:\n  " + "\n  ".join(offenders)
    )


def test_no_native_browser_dialogs_in_the_spa():
    """The app routes every dialog through useDialogs(). Two bare `alert()`
    calls survived the migration because the guard grepped for `window.alert(`
    and these had no prefix."""
    offenders = []
    for path in TSX + sorted(CLIENT.rglob("*.ts")):
        if path.name == "useDialogs.tsx":
            continue          # the fallback implementation lives there
        src = path.read_text()
        src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
        src = re.sub(r"//[^\n]*", "", src)
        for m in re.finditer(r"(?<![.\w])(alert|confirm|prompt)\s*\(", src):
            line = src[:m.start()].count("\n") + 1
            offenders.append(f"{path.name}:{line} {m.group(1)}(")
    assert not offenders, "native dialogs: " + ", ".join(offenders)


def test_guest_tags_are_normalised_before_use():
    """PVE sends `tags` as a semicolon string on some payloads and an array on
    others, while the type says `string[]`.

    A cast does not coerce: `.map()` over a string iterates CHARACTERS and
    `tags[0]` returns the first letter, so a VM tagged "alpha" grouped under
    "a". This is the shape that once turned the whole matrix table black.
    """
    src = (CLIENT / "views" / "HoloMatrix.tsx").read_text()
    assert "export function normaliseTags" in src
    # No direct indexing or mapping of the raw field.
    body = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    body = re.sub(r"//[^\n]*", "", body)
    assert not re.search(r"\bvm\.tags\[", body), "vm.tags indexed without normalising"
    assert not re.search(r"\(vm\.tags \|\| \[\]\)\.map", body), \
        "vm.tags mapped without normalising"


@pytest.mark.parametrize("path,marker", [
    ("views/CommandCenter.tsx", "c.storages"),
    ("components/CommandPalette.tsx", "storages"),
])
def test_storage_lists_are_deduped_by_name(path, marker):
    """cache.storages holds one row PER NODE for a shared storage, so a single
    PBS on a five-node cluster yields five identical entries."""
    src = (CLIENT / path).read_text()
    for m in re.finditer(r"for \(const \w+ of Object\.values\(([^)]*storages[^)]*)\)[^)]*\) \{",
                         src):
        tail = src[m.end():m.end() + 400]
        assert "seenStor" in tail or "seen" in tail, (
            f"{path}: storage loop at offset {m.start()} does not dedupe by name")
