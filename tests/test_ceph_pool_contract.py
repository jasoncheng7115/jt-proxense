"""The Ceph pool payload the frontend reads must match what the backend sends.

CephAdminModal was written against PVE's own pool shape (`pool_name`, `pool`,
`min_size`, `application`), but the backend maps PVE into the CephPool
dataclass before serialising, and that dataclass carried none of those names.
Every field the modal read was `undefined` at runtime:

  * the name column rendered "(pool undefined)"
  * every row used the React key `undefined`
  * the destroy confirmation asked the operator to approve destroying pool
    "undefined" -- with "ALL DATA in this pool is irrecoverably lost" under it
  * the destroy request then went to `.../ceph/pool/` with an empty name

Nothing threw. The panel simply displayed nonsense.
"""
import re
from dataclasses import fields
from pathlib import Path

import pytest

from server.models import CephPool

ROOT = Path(__file__).resolve().parent.parent
MODAL = ROOT / "src" / "client" / "components" / "CephAdminModal.tsx"


def _modal_interface_fields() -> set[str]:
    src = MODAL.read_text()
    m = re.search(r"interface Pool \{(.*?)\n\}", src, re.S)
    assert m, "could not locate the Pool interface"
    return set(re.findall(r"^\s*(\w+)\??:", m.group(1), re.M))


def test_every_field_the_modal_declares_exists_on_the_dataclass():
    """The modal may read a subset, never a field the backend does not send."""
    declared = _modal_interface_fields()
    available = {f.name for f in fields(CephPool)}
    missing = declared - available
    assert not missing, (
        f"CephAdminModal's Pool interface declares {sorted(missing)}, which "
        f"CephPool does not carry, so they are undefined at runtime. "
        f"CephPool has: {sorted(available)}"
    )


@pytest.mark.parametrize("field", ["name", "size", "min_size", "pg_num"])
def test_the_admin_panel_columns_are_actually_populated(field):
    """These four are rendered as table columns; dropping any of them shows a
    blank cell rather than an error."""
    assert field in {f.name for f in fields(CephPool)}


def test_modal_no_longer_reads_pve_side_names():
    """`pool_name` / a bare `pool` are PVE's spellings, not ours."""
    src = MODAL.read_text()
    # Strip comments before checking -- the explanation of this bug names them.
    body = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    body = re.sub(r"//[^\n]*", "", body)
    assert "p.pool_name" not in body
    assert not re.search(r"\bp\.pool\b", body)


def test_ceph_pool_delete_path_is_singular():
    """PVE 9 lists `pool` under /nodes/N/ceph and answers "no such resource"
    for `pools`, so the plural path could never destroy anything. Verified
    against a live 9.2 node."""
    src = (ROOT / "server" / "pve_client.py").read_text()
    m = re.search(r"async def delete_ceph_pool.*?\n    async def", src, re.S)
    assert m, "delete_ceph_pool not found"
    body = m.group(0)
    # The singular form must be attempted first.
    first = re.search(r'f"/nodes/\{node\}/ceph/(pools?)/\{name\}"', body)
    assert first and first.group(1) == "pool", (
        "the first path tried must be the singular /ceph/pool/{name}"
    )
