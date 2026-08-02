"""Migration pre-flight: refuse what PVE would accept and then fail.

PVE's migration API answers HTTP 200 with a UPID and does the real work
asynchronously. Anything it cannot do is discovered *inside* the task, minutes
later, long after the UI has said "migration started". This module checks the
preconditions we can evaluate from data we already hold, so the operator gets a
straight "no, and here is why" instead of a task that dies quietly.

Two classes of precondition live here:

  HA node affinity — see ha_affinity. A strict rule can forbid the guest from
  running on the target; `ha-manager migrate` then exits 2.

  Storage availability — the subtle one. On a real cluster `local-zfs` is
  `shared=False` yet exists ON EVERY NODE, because each node has its own. The
  storage NAME resolving on the target proves nothing: the DATA is on the
  source. So a guest with a disk there cannot simply move; PVE fails the task
  with "storage 'X' is not available on node 'Y'" or refuses an online
  migration outright. Conversely `vmimage-dir` is configured for only two
  nodes, so it does not resolve anywhere else at all.

Every check fails OPEN on unexpected data: a migration wrongly blocked during
an evacuation is worse than the recoverable failure this prevents. Blocking
only happens when we can positively demonstrate the precondition is violated.
"""
from __future__ import annotations

import logging

from . import ha_affinity

logger = logging.getLogger(__name__)


def _get(o, attr, default=None):
    """cache entries are dataclasses in the daemon and dicts in tests."""
    if isinstance(o, dict):
        return o.get(attr, default)
    return getattr(o, attr, default)


def _storage_nodes(cluster) -> dict[str, dict]:
    """{storage name: {nodes: set, shared: bool, allowed: set}}.

    `cache.storages` holds ONE ENTRY PER NODE for every storage, so the set of
    nodes a name appears on is the set of nodes PVE has it configured on.
    """
    out: dict[str, dict] = {}
    storages = _get(getattr(cluster, "cache", None), "storages", {}) or {}
    items = storages.values() if isinstance(storages, dict) else storages
    for st in items:
        name = _get(st, "storage")
        node = _get(st, "node")
        if not name:
            continue
        rec = out.setdefault(name, {"nodes": set(), "shared": False,
                                    "allowed": set(), "enabled": False})
        if node:
            rec["nodes"].add(str(node))
        if _get(st, "shared"):
            rec["shared"] = True
        if _get(st, "enabled", True):
            rec["enabled"] = True
        for a in (_get(st, "allowed_nodes", []) or []):
            rec["allowed"].add(str(a))
    return out


def _guest_disk_storages(cluster, vmid: int | str, node: str | None) -> list[str]:
    vms = _get(getattr(cluster, "cache", None), "vms", {}) or {}
    items = vms.values() if isinstance(vms, dict) else vms
    for v in items:
        if str(_get(v, "vmid")) != str(vmid):
            continue
        if node and _get(v, "node") and _get(v, "node") != node:
            continue
        return [s for s in (_get(d, "storage") for d in (_get(v, "disks", []) or [])) if s]
    return []


def storage_blockers(cluster, vmid: int | str, source: str | None, target: str,
                     *, online: bool, with_local_disks: bool) -> dict | None:
    """Storage reasons this migration cannot work, or None."""
    try:
        stores = _storage_nodes(cluster)
        disks = _guest_disk_storages(cluster, vmid, source)
    except Exception as e:
        logger.warning("migrate guard: storage inspection failed for %s: %s", vmid, e)
        return None
    if not disks:
        return None                      # nothing known — do not invent a block

    missing: list[str] = []
    local: list[str] = []
    for name in sorted(set(disks)):
        rec = stores.get(name)
        if rec is None:
            continue                     # unknown to us; let PVE decide
        allowed = rec["allowed"]
        on_target = (target in rec["nodes"]) and (not allowed or target in allowed)
        if not on_target:
            missing.append(name)
        elif not rec["shared"]:
            # Name resolves on the target but the DATA does not live there.
            local.append(name)

    if missing:
        return {
            "error": "storage_not_on_target",
            "detail": (
                f"storage {', '.join(missing)} is not configured on '{target}', "
                f"so PVE would accept the migration and then fail the task with "
                f"\"storage is not available on node '{target}'\"."
            ),
            "storages": missing, "target": target,
        }
    if local and online and not with_local_disks:
        return {
            "error": "local_disks_need_copy",
            "detail": (
                f"storage {', '.join(local)} is not shared, so the disk data "
                f"lives on the source node. An online migration must copy it — "
                f"re-run with 'with local disks' enabled, or migrate offline."
            ),
            "storages": local, "target": target,
        }
    return None


async def check(cluster, kind: str, vmid: int | str, target: str, *,
                source: str | None = None, online: bool = True,
                with_local_disks: bool = False) -> dict | None:
    """Every pre-flight for one migration. None means "go ahead"."""
    blocked = await ha_affinity.check_target(cluster, kind, vmid, target)
    if blocked is not None:
        return blocked
    return storage_blockers(cluster, vmid, source, target,
                            online=online, with_local_disks=with_local_disks)


async def viable_targets(cluster, kind: str, vmid: int | str, source: str | None,
                         candidates: list[str], *, online: bool = True,
                         with_local_disks: bool = False) -> list[str]:
    """Filter candidate nodes down to those this guest could actually reach."""
    allowed = await ha_affinity.allowed_nodes(cluster, kind, vmid)
    out = []
    for node in candidates:
        if node == source:
            continue
        if allowed is not None and node not in allowed:
            continue
        if storage_blockers(cluster, vmid, source, node,
                            online=online,
                            with_local_disks=with_local_disks) is not None:
            continue
        out.append(node)
    return out
