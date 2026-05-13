"""Pluggable cluster adapters.

PVE clusters use the existing `server/cluster_manager.py:Cluster` class
(legacy / not yet migrated here). ESXi clusters use `clusters/esxi.py`.
The factory `make_adapter` returns an adapter that exposes the read-only
surface defined in `clusters/base.py:ClusterAdapter`.

This package is the v0.4 entry point. Once ESXi parity is proven, the
PVE Cluster will move under `clusters/pve.py` and `cluster_manager`
will lose its hard PVE dependency.
"""
from __future__ import annotations

from ..config import ClusterConfig

from .base import ClusterAdapter, ClusterType


def make_adapter(config: ClusterConfig) -> ClusterAdapter | None:
    """Return an adapter for non-PVE cluster types. PVE returns None and
    the caller falls back to the legacy `cluster_manager.Cluster`."""
    t = (config.type or "pve").strip().lower()
    if t == "esxi":
        from .esxi import ESXiAdapter
        return ESXiAdapter(config)
    return None


__all__ = ["ClusterAdapter", "ClusterType", "make_adapter"]
