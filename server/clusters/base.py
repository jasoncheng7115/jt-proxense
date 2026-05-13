"""Abstract cluster adapter — the read-only surface every backend must
expose so the rest of the app (UI, alerts, telemetry) can treat PVE and
ESXi as peers.

Concrete adapters:
  - clusters/esxi.py    (vSphere REST, v0.4)
  - clusters/pve.py     (planned — currently lives in cluster_manager.Cluster)

Each adapter is responsible for:
  - Maintaining a polling loop that updates an internal cache.
  - Returning a JSON-serialisable snapshot via `snapshot()`.
  - Implementing OWASP-A02 TLS verification (default on; allow operator
    opt-out only with explicit log warning).
  - NEVER logging credentials or session tokens.

Mutating operations (start/stop/migrate) are NOT in this base interface.
v0.4 ships ESXi as read-only; v0.5 will add a mutation surface.
"""
from __future__ import annotations

import asyncio
import enum
from typing import Awaitable, Callable, Optional, Protocol


class ClusterType(str, enum.Enum):
    PVE  = "pve"
    ESXI = "esxi"


class ClusterAdapter(Protocol):
    """Read-only adapter surface."""

    @property
    def id(self) -> str: ...

    @property
    def name(self) -> str: ...

    @property
    def type(self) -> ClusterType: ...

    async def start(self) -> None:
        """Begin background polling. Idempotent — safe to call twice."""
        ...

    async def stop(self) -> None:
        """Cancel the polling task and clean up sessions."""
        ...

    def snapshot(self) -> dict:
        """JSON-serialisable view of the latest cached state. Shape:
            {id, name, type, summary, nodes, vms, storages,
             last_update, healthy, error?: str}
        """
        ...

    def add_callback(self, cb: Callable[[str, dict], Awaitable[None]]) -> None:
        """Register a coroutine fired after each successful poll. Used by
        cluster_manager to push WebSocket updates."""
        ...
