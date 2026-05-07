"""Per-PVE-host rate limiter / semaphore for outbound API calls.

PVE's pveproxy is single-process and modest in capacity — hammering it with
unrestrained concurrency (e.g. screenshot fan-out across N VMs) regularly
returns 596 / starves the cluster's other clients. This module exposes
`acquire(host)` so every outbound PVE HTTP call can serialise behind a
small, per-host semaphore plus an optional minimum gap between starts.

Defaults (override via `configure()`):
  - max_concurrent_per_host: 4   — proven safe across PVE 7.x and 8.x
  - min_gap_ms:              50  — tiny stagger to avoid thundering herd
                                   when many tasks unblock simultaneously

Usage:

    from .pve_throttle import throttle
    async with throttle.acquire(node.host):
        async with session.request(...) as r:
            ...

Designed to be layered transparently into pve_client._request — every other
caller (screenshots, batch ops, cluster_manager polling) inherits the
limiter for free.
"""
from __future__ import annotations

import asyncio
import time
from collections import defaultdict
from contextlib import asynccontextmanager


class _PVEThrottle:
    def __init__(self, max_concurrent_per_host: int = 4, min_gap_ms: int = 50):
        self.max_concurrent_per_host = max_concurrent_per_host
        self.min_gap_ms = min_gap_ms
        self._sems: dict[str, asyncio.Semaphore] = {}
        self._last_start_ts: dict[str, float] = defaultdict(float)
        self._gap_locks: dict[str, asyncio.Lock] = defaultdict(asyncio.Lock)

    def configure(self, *, max_concurrent_per_host: int | None = None,
                  min_gap_ms: int | None = None) -> None:
        """Tune limits at runtime. Existing waiters keep their old slot;
        new acquirers see the new ceiling. Call before request fan-out."""
        if max_concurrent_per_host is not None:
            self.max_concurrent_per_host = max(1, int(max_concurrent_per_host))
            # Drop cached sems so the next acquire builds with the new size.
            self._sems.clear()
        if min_gap_ms is not None:
            self.min_gap_ms = max(0, int(min_gap_ms))

    def _sem_for(self, host: str) -> asyncio.Semaphore:
        sem = self._sems.get(host)
        if sem is None:
            sem = asyncio.Semaphore(self.max_concurrent_per_host)
            self._sems[host] = sem
        return sem

    @asynccontextmanager
    async def acquire(self, host: str):
        """Hold the per-host slot until the wrapped call returns."""
        if not host:
            yield
            return
        sem = self._sem_for(host)
        async with sem:
            # Stagger starts: keep at least min_gap_ms between kick-offs to
            # avoid PVE's single-process pveproxy choking on simultaneous
            # bursts (very visible in /api2/json/cluster/resources fanouts).
            if self.min_gap_ms > 0:
                async with self._gap_locks[host]:
                    now = time.monotonic() * 1000.0
                    last = self._last_start_ts[host]
                    delta = now - last
                    if delta < self.min_gap_ms:
                        await asyncio.sleep((self.min_gap_ms - delta) / 1000.0)
                    self._last_start_ts[host] = time.monotonic() * 1000.0
            yield

    def stats(self) -> dict:
        """Diagnostic snapshot. Cheap; safe to expose to /health style probes."""
        return {
            "max_concurrent_per_host": self.max_concurrent_per_host,
            "min_gap_ms": self.min_gap_ms,
            "tracked_hosts": list(self._sems.keys()),
        }


# Module-level singleton. Import as `from .pve_throttle import throttle`.
throttle = _PVEThrottle()
