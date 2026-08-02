"""Pre-flight for guest creation, restore and disk placement.

Same failure mode as the migration guard: PVE takes the request, spawns a task,
and only then discovers that the bridge does not exist on that node or that the
storage will not hold disk images. By then a config may be written and a disk
half-allocated, and the audit row already said the request was accepted.

Everything here is checked against data we either already poll (guests,
storages and their content whitelists) or can fetch cheaply and cache (a node's
network interfaces). Nothing here guesses at PVE's internals — where we cannot
establish a fact, we let PVE be the authority and say nothing.
"""
from __future__ import annotations

import logging
import time

from . import storage_caps

logger = logging.getLogger(__name__)

BRIDGE_TTL = 60.0
_bridges: dict[tuple[str, str], tuple[float, set[str]]] = {}


def _get(o, attr, default=None):
    if isinstance(o, dict):
        return o.get(attr, default)
    return getattr(o, attr, default)


def vmid_in_use(cluster, vmid: int | str) -> str | None:
    """Node currently holding this VMID, or None.

    PVE ids are cluster-wide, so "free on this node" is not free. Creating onto
    a taken id fails, and restoring onto one silently overwrites a live guest
    when force is set — worth catching before either happens.
    """
    try:
        vms = _get(getattr(cluster, "cache", None), "vms", {}) or {}
        items = vms.values() if isinstance(vms, dict) else vms
        for v in items:
            if str(_get(v, "vmid")) == str(vmid):
                return str(_get(v, "node") or "") or "unknown"
    except Exception as e:
        logger.warning("vmid lookup failed for %s: %s", vmid, e)
    return None


async def node_bridges(cluster, node: str) -> set[str] | None:
    """Bridge names configured on a node, or None if we could not look."""
    key = (getattr(cluster, "id", ""), node)
    hit = _bridges.get(key)
    now = time.monotonic()
    if hit and now - hit[0] < BRIDGE_TTL:
        return hit[1]
    try:
        ifaces = await cluster.client._request("GET", f"/nodes/{node}/network") or []
    except Exception as e:
        logger.debug("network list unavailable for %s: %s", node, e)
        return None
    names = {str(_get(i, "iface")) for i in ifaces
             if str(_get(i, "type", "")).lower() in ("bridge", "ovsbridge", "vlan", "bond")
             and _get(i, "iface")}
    _bridges[key] = (now, names)
    return names


async def check_nic_bridges(cluster, node: str, bridges) -> dict | None:
    """Refuse bridges that do not exist on the target node."""
    wanted = {str(b) for b in (bridges or []) if b}
    if not wanted:
        return None
    have = await node_bridges(cluster, node)
    if have is None:
        return None                       # could not look — do not invent a block
    missing = sorted(wanted - have)
    if not missing:
        return None
    return {
        "error": "bridge_not_on_node",
        "detail": (
            f"bridge {', '.join(missing)} does not exist on node '{node}' "
            f"(it has: {', '.join(sorted(have)) or 'none'}). PVE would accept "
            f"the request and fail while attaching the NIC, leaving a "
            f"partially created guest."
        ),
        "bridges": missing, "node": node, "available": sorted(have),
    }


def check_disk_storage(cluster, node: str, storage: str, kind: str) -> dict | None:
    """Storage must accept the right content type for this guest kind."""
    purpose = "ct-disk" if str(kind).lower() in ("lxc", "ct") else "vm-disk"
    bad = storage_caps.check(cluster, storage, purpose, node)
    if bad is not None:
        bad["usable_storages"] = storage_caps.usable_for(cluster, purpose, node)
    return bad


def check_vmid_free(cluster, vmid: int | str, *, allow_existing: bool = False) -> dict | None:
    holder = vmid_in_use(cluster, vmid)
    if holder is None or allow_existing:
        return None
    return {
        "error": "vmid_in_use",
        "detail": (f"VMID {vmid} already exists on node '{holder}'. PVE ids are "
                   f"cluster-wide, so this cannot be created here."),
        "vmid": int(vmid) if str(vmid).isdigit() else vmid, "node": holder,
    }
