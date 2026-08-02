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
    have = content_types(cluster, storage, node)
    if have is None:
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
