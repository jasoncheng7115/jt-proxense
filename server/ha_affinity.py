"""HA node-affinity pre-flight for migrations.

Why this exists: a guest under HA management can be forbidden from running on
a given node by a *strict* node-affinity rule. Ask PVE to migrate it there and
the request is accepted, `ha-manager migrate` runs, and it exits 2 — after the
UI has already told the operator the migration started. Worse, the generic
failure path then advises clearing a `migrate` lock that was never taken, which
sends people to run `qm unlock` on a VM that is perfectly healthy.

Found the hard way: `vm:147` sits in a strict rule allowing
host-109/110/111/114, the demo asked for host-108, and every attempt failed
with `command 'ha-manager migrate vm:147 host-108' failed: exit code 2`.

PVE 8 vs PVE 9 is a real fork, not a detail:
  * PVE 8 — `/cluster/ha/groups` lists groups with a `restricted` flag, and each
    entry in `/cluster/ha/resources` names its `group`.
  * PVE 9 — groups were converted to rules. `/cluster/ha/rules` returns
    `type: node-affinity` entries carrying `nodes`, `resources` and `strict`,
    and **`/cluster/ha/groups` now returns an error** ("ha groups have been
    migrated to rules"), so it cannot be used as a probe.
Both are read here, either may be missing, and neither failing is fatal: if the
HA config cannot be read we allow the migration rather than block a legitimate
one on a cluster that has no HA at all.
"""
from __future__ import annotations

import logging
import time

logger = logging.getLogger(__name__)

# HA config changes rarely and a migration dialog may ask repeatedly.
CACHE_TTL = 30.0
_cache: dict[str, tuple[float, list[dict], list[dict], list[dict]]] = {}


def sid_for(kind: str, vmid: int | str) -> str:
    """PVE's service id: `vm:100` for QEMU, `ct:100` for LXC."""
    k = (kind or "").lower()
    prefix = "ct" if k in ("ct", "lxc") else "vm"
    return f"{prefix}:{vmid}"


def _split_nodes(raw) -> set[str]:
    """`nodes` is a comma list, and entries may carry a priority (`host-1:2`)."""
    if not raw:
        return set()
    if isinstance(raw, dict):            # some PVE versions hand back a map
        return {str(n).split(":")[0].strip() for n in raw if str(n).strip()}
    if isinstance(raw, (list, tuple)):
        items = raw
    else:
        items = str(raw).split(",")
    return {str(n).split(":")[0].strip() for n in items if str(n).strip()}


def _split_resources(raw) -> set[str]:
    if not raw:
        return set()
    if isinstance(raw, (list, tuple)):
        items = raw
    else:
        items = str(raw).split(",")
    return {str(r).strip() for r in items if str(r).strip()}


async def _load(cluster) -> tuple[list[dict], list[dict], list[dict]]:
    """(rules, groups, resources) — each best-effort and possibly empty."""
    cid = getattr(cluster, "id", "") or ""
    hit = _cache.get(cid)
    now = time.monotonic()
    if hit and now - hit[0] < CACHE_TTL:
        return hit[1], hit[2], hit[3]

    client = cluster.client
    rules: list = []
    groups: list = []
    resources: list = []
    try:
        rules = await client._request("GET", "/cluster/ha/rules") or []
    except Exception as e:
        logger.debug("ha rules unavailable (PVE 8 or no HA): %s", e)
    try:
        # On PVE 9 this ERRORS rather than returning empty, so it must not be
        # used to decide whether HA exists — only as the PVE 8 data source.
        groups = await client.list_ha_groups() or []
    except Exception as e:
        logger.debug("ha groups unavailable (PVE 9 or no HA): %s", e)
    try:
        resources = await client.list_ha_resources() or []
    except Exception as e:
        logger.debug("ha resources unavailable: %s", e)

    rules = [r for r in rules if isinstance(r, dict)]
    groups = [g for g in groups if isinstance(g, dict)]
    resources = [r for r in resources if isinstance(r, dict)]
    _cache[cid] = (now, rules, groups, resources)
    return rules, groups, resources


def _restrictions(sid: str, rules: list[dict], groups: list[dict],
                  resources: list[dict]) -> list[tuple[str, set[str]]]:
    """[(rule name, allowed nodes)] for every STRICT restriction on `sid`.

    Non-strict rules are a preference — HA will honour them when it can and
    ignore them when it must, so they never block an explicit migration.
    """
    out: list[tuple[str, set[str]]] = []

    for r in rules:
        if (r.get("type") or "").lower() != "node-affinity":
            continue
        if not (str(r.get("strict", 0)) in ("1", "True", "true")):
            continue
        if sid not in _split_resources(r.get("resources")):
            continue
        nodes = _split_nodes(r.get("nodes"))
        if nodes:
            out.append((str(r.get("rule") or "node-affinity"), nodes))

    if not rules:                      # PVE 8 shape
        by_name = {str(g.get("group")): g for g in groups}
        for res in resources:
            if str(res.get("sid") or "") != sid:
                continue
            gname = str(res.get("group") or "")
            g = by_name.get(gname)
            if not g:
                continue
            if not (str(g.get("restricted", 0)) in ("1", "True", "true")):
                continue
            nodes = _split_nodes(g.get("nodes"))
            if nodes:
                out.append((gname, nodes))
    return out


async def allowed_nodes(cluster, kind: str, vmid: int | str) -> set[str] | None:
    """Nodes this guest may run on, or None when nothing restricts it."""
    sid = sid_for(kind, vmid)
    rules, groups, resources = await _load(cluster)
    limits = _restrictions(sid, rules, groups, resources)
    if not limits:
        return None
    allowed: set[str] | None = None
    for _, nodes in limits:            # every strict rule must be satisfied
        allowed = nodes if allowed is None else (allowed & nodes)
    return allowed


async def check_target(cluster, kind: str, vmid: int | str,
                       target: str) -> dict | None:
    """None if the migration may proceed, else a JSON-ready refusal.

    Deliberately fails OPEN: if the HA config cannot be read we do not block a
    migration that might be perfectly valid. The cost of a false block (an
    operator who cannot evacuate a node) is higher than the cost of the failure
    this prevents, which is recoverable.
    """
    try:
        sid = sid_for(kind, vmid)
        rules, groups, resources = await _load(cluster)
        limits = _restrictions(sid, rules, groups, resources)
    except Exception as e:                       # never break migration on this
        logger.warning("HA affinity check failed for %s/%s: %s", kind, vmid, e)
        return None
    if not limits:
        return None

    blocking = [(name, nodes) for name, nodes in limits if target not in nodes]
    if not blocking:
        return None

    allowed: set[str] | None = None
    for _, nodes in limits:
        allowed = nodes if allowed is None else (allowed & nodes)
    allowed_list = sorted(allowed or [])
    rule_names = ", ".join(name for name, _ in blocking)
    return {
        "error": "ha_target_not_allowed",
        "detail": (
            f"HA rule '{rule_names}' does not permit {sid_for(kind, vmid)} to "
            f"run on '{target}'. PVE would accept this request and then fail "
            f"the migration inside ha-manager. Allowed nodes: "
            f"{', '.join(allowed_list) or '(none)'}."
        ),
        "sid": sid,
        "target": target,
        "rules": [name for name, _ in blocking],
        "allowed_nodes": allowed_list,
    }
