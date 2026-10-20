"""Migration pre-flight: refuse what PVE would accept and then fail.

PVE's migration API answers HTTP 200 with a UPID and does the real work
asynchronously. Anything it cannot do is discovered *inside* the task, minutes
later, long after the UI has said "migration started". This module checks the
preconditions we can evaluate from data we already hold, so the operator gets a
straight "no, and here is why" instead of a task that dies quietly.

Three classes of precondition live here:

  HA node affinity — see ha_affinity. A strict rule can forbid the guest from
  running on the target; `ha-manager migrate` then exits 2.

  Storage availability — the subtle one. On a real cluster `local-zfs` is
  `shared=False` yet exists ON EVERY NODE, because each node has its own. The
  storage NAME resolving on the target proves nothing: the DATA is on the
  source. So a guest with a disk there cannot simply move; PVE fails the task
  with "storage 'X' is not available on node 'Y'" or refuses an online
  migration outright. Conversely `vmimage-dir` is configured for only two
  nodes, so it does not resolve anywhere else at all.

  CPU compatibility — see cpu_compat. A running QEMU guest must see the same
  CPU on the target; `cpu: host` across an Intel/AMD pair, or `x86-64-v4` onto
  a host without AVX-512, is accepted by PVE and fails inside the task.

Every check fails OPEN on unexpected data: a migration wrongly blocked during
an evacuation is worse than the recoverable failure this prevents. Blocking
only happens when we can positively demonstrate the precondition is violated.
"""
from __future__ import annotations

import logging

from . import cpu_compat, ha_affinity

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


async def live_config(cluster, kind: str, vmid: int | str,
                      source: str | None) -> dict | None:
    """The guest's config as PVE has it NOW, or None.

    The poll cache refreshes disk layouts on a slow cadence (they rarely
    change), so a guard that decides from it could judge a disk that was moved
    a few minutes ago by where it USED to be. One read per migration check is
    cheap; the cache stays the fallback when this read fails."""
    client = getattr(cluster, "client", None)
    if client is None or not source:
        return None
    try:
        if (kind or "").lower() in ("lxc", "ct"):
            cfg = await client.get_lxc_config(source, int(vmid))
        else:
            cfg = await client.get_vm_config(source, int(vmid))
    except Exception as e:
        logger.debug("migrate guard: live config of %s unreadable: %s", vmid, e)
        return None
    return cfg if isinstance(cfg, dict) else None


def _disks_from_config(cluster, cfg: dict | None, kind: str) -> list[str] | None:
    parse = getattr(cluster, "_parse_disk_config", None)
    if cfg is None or parse is None:
        return None
    try:
        vtype = "lxc" if (kind or "").lower() in ("lxc", "ct") else "qemu"
        return [d.storage for d in parse(cfg, vtype) if getattr(d, "storage", None)]
    except Exception:
        return None


def storage_blockers(cluster, vmid: int | str, source: str | None, target: str,
                     *, online: bool, with_local_disks: bool,
                     disks: list[str] | None = None) -> dict | None:
    """Storage reasons this migration cannot work, or None. `disks` (storage
    names) overrides the cache when the caller read the live config."""
    try:
        stores = _storage_nodes(cluster)
        if disks is None:
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
    cfg = await live_config(cluster, kind, vmid, source)
    blocked = storage_blockers(cluster, vmid, source, target,
                               online=online, with_local_disks=with_local_disks,
                               disks=_disks_from_config(cluster, cfg, kind))
    if blocked is not None:
        return blocked
    return await cpu_compat.Checker(cluster, kind, vmid, source, online,
                                    config=cfg).check(target)


async def viable_targets(cluster, kind: str, vmid: int | str, source: str | None,
                         candidates: list[str], *, online: bool = True,
                         with_local_disks: bool = False) -> list[str]:
    """Filter candidate nodes down to those this guest could actually reach."""
    allowed = await ha_affinity.allowed_nodes(cluster, kind, vmid)
    cfg = await live_config(cluster, kind, vmid, source)
    disks = _disks_from_config(cluster, cfg, kind)
    cpu = cpu_compat.Checker(cluster, kind, vmid, source, online, config=cfg)
    out = []
    for node in candidates:
        if node == source:
            continue
        if allowed is not None and node not in allowed:
            continue
        if storage_blockers(cluster, vmid, source, node,
                            online=online,
                            with_local_disks=with_local_disks,
                            disks=disks) is not None:
            continue
        if await cpu.check(node) is not None:
            continue
        out.append(node)
    return out
