"""Does this storage accept this kind of thing, on this node?

PVE storages declare a content whitelist (`images`, `rootdir`, `iso`, `vztmpl`,
`backup`, `snippets`, `import`) and PVE enforces it — but only when the task
runs. Ask it to write a backup to a storage that carries `images,rootdir` and
the request is accepted; the vzdump task then dies, and because the audit row
was written on submission the log still reads "ok".

Verified against a real cluster: `ceph1` is `images,rootdir` with no `backup`,
while `host-107-pbs-cluster1` is `backup` only. Both are perfectly healthy
storages — picking the wrong one is an ordinary mistake that deserves an
ordinary error message, not a task that fails ten seconds later.

We already poll this: `StorageMetrics.content` is a list, and there is one
entry per node, so node scoping comes for free.

Fails OPEN throughout. Not knowing about a storage means exactly that, and a
refusal we cannot justify is worse than the failure we are trying to prevent.
"""
from __future__ import annotations

import logging

logger = logging.getLogger(__name__)

# What each operation needs the storage to declare.
NEEDS = {
    "backup": "backup",
    "restore-source": "backup",
    "vm-disk": "images",
    "ct-disk": "rootdir",
    "iso": "iso",
    "template": "vztmpl",
}


def _get(o, attr, default=None):
    if isinstance(o, dict):
        return o.get(attr, default)
    return getattr(o, attr, default)


def _entries(cluster, storage: str, node: str | None) -> list:
    out = []
    storages = _get(getattr(cluster, "cache", None), "storages", {}) or {}
    items = storages.values() if isinstance(storages, dict) else storages
    for st in items:
        if _get(st, "storage") != storage:
            continue
        if node and _get(st, "node") and _get(st, "node") != node:
            continue
        out.append(st)
    return out


def restricted_from(cluster, storage: str, node: str | None) -> bool:
    """True when PVE's own `nodes=` restriction excludes this node.

    This is the authoritative answer and the cache's per-node rows are not:
    `cache.storages` carries an entry for nodes PVE actually excludes, so
    "is there a row for this node?" said yes for a storage configured
    `nodes=host-115,host-108` and a backup was accepted for a guest on
    host-111, where it cannot possibly be written. `allowed_nodes` mirrors
    PVE's setting — empty means every node.
    """
    if not node:
        return False
    for st in _entries(cluster, storage, None):
        allowed = {str(a) for a in (_get(st, "allowed_nodes", []) or [])}
        if allowed:
            return node not in allowed
    return False


def content_types(cluster, storage: str, node: str | None = None) -> set[str] | None:
    """Declared content types, or None when we have never seen this storage."""
    try:
        entries = _entries(cluster, storage, node)
    except Exception as e:
        logger.warning("storage caps lookup failed for %s: %s", storage, e)
        return None
    if not entries:
        return None
    out: set[str] = set()
    for st in entries:
        for c in (_get(st, "content", []) or []):
            out.add(str(c))
    return out or None


def check(cluster, storage: str, purpose: str, node: str | None = None) -> dict | None:
    """None if the storage can be used this way, else a JSON-ready refusal."""
    need = NEEDS.get(purpose)
    if not need or not storage:
        return None
    # PVE's own node restriction comes first: a storage can be present in the
    # cache for a node and still be excluded by `nodes=` in storage.cfg.
    if restricted_from(cluster, storage, node):
        return {
            "error": "storage_not_on_node",
            "detail": (f"storage '{storage}' is restricted to specific nodes and "
                       f"'{node}' is not one of them. PVE would accept the "
                       f"request and fail the task."),
            "storage": storage, "node": node,
        }
    have = content_types(cluster, storage, node)
    if have is None:
        # Two very different situations look the same from here, and conflating
        # them let a real failure through: a backup was sent to a storage that
        # is configured on two OTHER nodes, and this returned None (allow).
        #   - never heard of this storage at all -> we genuinely do not know
        #   - known cluster-wide, absent from THIS node -> that is a refusal
        if node and content_types(cluster, storage, None) is not None:
            return {
                "error": "storage_not_on_node",
                "detail": (f"storage '{storage}' is not configured on node "
                           f"'{node}' (it exists elsewhere in the cluster). PVE "
                           f"would accept the request and fail the task."),
                "storage": storage, "node": node,
            }
        return None                       # unknown storage — let PVE decide
    if need in have:
        return None
    return {
        "error": "storage_content_unsupported",
        "detail": (
            f"storage '{storage}' does not accept '{need}' content"
            + (f" on node '{node}'" if node else "")
            + f" (it declares: {', '.join(sorted(have))}). PVE would accept the "
              f"request and then fail the task."
        ),
        "storage": storage, "needs": need, "has": sorted(have),
    }


def usable_for(cluster, purpose: str, node: str | None = None) -> list[str]:
    """Storage names that can serve `purpose` — for populating a picker."""
    need = NEEDS.get(purpose)
    if not need:
        return []
    names: set[str] = set()
    storages = _get(getattr(cluster, "cache", None), "storages", {}) or {}
    items = storages.values() if isinstance(storages, dict) else storages
    for st in items:
        if node and _get(st, "node") and _get(st, "node") != node:
            continue
        if not _get(st, "enabled", True):
            continue
        if need in {str(c) for c in (_get(st, "content", []) or [])}:
            name = _get(st, "storage")
            if name:
                names.add(str(name))
    return sorted(names)
