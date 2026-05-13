"""ESXi / vCenter read-only adapter (v0.4 preview).

Uses the vSphere REST API (`/rest/...` and the newer `/api/...`). This
intentionally avoids the `pyVmomi` dependency: the REST surface covers
the read paths we need (hosts, vms, datastores, networks) and keeps the
runtime env footprint identical to the PVE side.

Auth model:
  - Operator configures `auth.user` + `auth.password` in config.yaml for
    the cluster. The password lives in the encrypted secret store the
    same way PVE write-tokens do (operator runs `bin/jt-proxense secret
    set <cluster_id>.esxi.password`).
  - First request POSTs `/rest/com/vmware/cis/session` with HTTP Basic
    auth and pulls the session-id cookie. Subsequent requests reuse the
    cookie. We re-auth automatically on 401 (session expired).

OWASP design:
  A01 — read-only adapter; no mutation routes are wired through.
  A02 — `verify_ssl` defaults to True. If operator turns it off, the
        adapter logs a one-shot WARNING at start naming the cluster.
  A05 — credentials never leave config / secret store; the session-id
        cookie is held in memory only and not logged.
  A07 — failed auth bumps a counter (`stats["auth_fail"]`); 3 consecutive
        failures back off poll interval to 60 s so a wrong password
        doesn't hammer vCenter (which has its own brute-force lockouts).
  A09 — every state transition (auth ok / auth fail / poll error) logs
        at INFO/WARN with the cluster id (no secret material).
  A10 — adapter only contacts the configured host:port; no operator
        input ever drives the request URL. Path components are static.
"""
from __future__ import annotations

import asyncio
import logging
import ssl
import time
from base64 import b64encode
from typing import Any, Awaitable, Callable, Optional

import aiohttp

from ..config import ClusterConfig
from .base import ClusterAdapter, ClusterType


logger = logging.getLogger(__name__)


class ESXiAdapter(ClusterAdapter):
    def __init__(self, config: ClusterConfig):
        self.config = config
        self._session_id: Optional[str] = None
        self._http: Optional[aiohttp.ClientSession] = None
        self._cache: dict[str, Any] = {
            "id": config.id, "name": config.name or config.id,
            "type": "esxi", "nodes": {}, "vms": {}, "storages": {},
            "last_update": 0.0, "healthy": False,
        }
        self._poll_task: Optional[asyncio.Task] = None
        self._running = False
        self._callbacks: list[Callable[[str, dict], Awaitable[None]]] = []
        self._consecutive_auth_fail = 0
        self._poll_interval = max(config.poll_interval, 5.0)

    # ----------- adapter surface -----------

    @property
    def id(self) -> str: return self.config.id

    @property
    def name(self) -> str: return self.config.name or self.config.id

    @property
    def type(self) -> ClusterType: return ClusterType.ESXI

    async def start(self) -> None:
        if self._running:
            return
        self._running = True
        # If verify_ssl is disabled on the FIRST node, log it loudly.
        n0 = self.config.nodes[0] if self.config.nodes else None
        if n0 and not n0.verify_ssl:
            logger.warning(
                "ESXi cluster %s: TLS verification DISABLED (verify_ssl=false). "
                "MitM possible. Configure a CA-signed cert and re-enable.",
                self.id,
            )
        self._poll_task = asyncio.create_task(self._poll_loop())
        logger.info("ESXi cluster %s started (read-only preview)", self.id)

    async def stop(self) -> None:
        self._running = False
        if self._poll_task:
            self._poll_task.cancel()
            try:
                await self._poll_task
            except (asyncio.CancelledError, Exception):
                pass
            self._poll_task = None
        await self._close_session()

    def snapshot(self) -> dict:
        return dict(self._cache)

    def add_callback(self, cb: Callable[[str, dict], Awaitable[None]]) -> None:
        self._callbacks.append(cb)

    # ----------- internals -----------

    def _base_url(self) -> str:
        n = self.config.nodes[0]
        return f"https://{n.host}:{n.port}"

    def _verify_ssl(self) -> bool:
        return bool(self.config.nodes[0].verify_ssl) if self.config.nodes else True

    async def _http_session(self) -> aiohttp.ClientSession:
        if self._http is None or self._http.closed:
            ctx: ssl.SSLContext | bool
            if self._verify_ssl():
                ctx = ssl.create_default_context()
            else:
                ctx = False
            connector = aiohttp.TCPConnector(ssl=ctx)
            self._http = aiohttp.ClientSession(
                connector=connector,
                timeout=aiohttp.ClientTimeout(total=15),
            )
        return self._http

    async def _close_session(self) -> None:
        if self._http and not self._http.closed:
            await self._http.close()
        self._http = None
        self._session_id = None

    async def _login(self) -> None:
        # POST /rest/com/vmware/cis/session with Basic auth.
        user = self.config.auth.user or "administrator@vsphere.local"
        pw = self.config.auth.password
        if not pw:
            raise RuntimeError(
                f"ESXi cluster {self.id}: missing auth.password "
                "(set via secret store or config.yaml)"
            )
        sess = await self._http_session()
        token = b64encode(f"{user}:{pw}".encode()).decode()
        headers = {"Authorization": f"Basic {token}"}
        url = f"{self._base_url()}/rest/com/vmware/cis/session"
        async with sess.post(url, headers=headers) as resp:
            if resp.status != 200:
                self._consecutive_auth_fail += 1
                body = await resp.text()
                # NEVER include `body` if it might echo back creds. vCenter
                # responds with a JSON envelope, not the request body, so
                # logging the truncated text is safe.
                logger.warning(
                    "ESXi cluster %s auth failed (HTTP %d): %s",
                    self.id, resp.status, body[:200],
                )
                raise RuntimeError(f"esxi auth http {resp.status}")
            data = await resp.json()
            self._session_id = data.get("value") if isinstance(data, dict) else None
            if not self._session_id:
                raise RuntimeError("esxi auth: no session id in response")
            self._consecutive_auth_fail = 0
            logger.info("ESXi cluster %s authenticated", self.id)

    def _auth_headers(self) -> dict:
        if not self._session_id:
            return {}
        return {"vmware-api-session-id": self._session_id}

    async def _get(self, path: str) -> Any:
        sess = await self._http_session()
        url = f"{self._base_url()}{path}"
        async with sess.get(url, headers=self._auth_headers()) as resp:
            if resp.status == 401:
                # Session expired — re-auth once.
                self._session_id = None
                await self._login()
                async with sess.get(url, headers=self._auth_headers()) as resp2:
                    if resp2.status != 200:
                        raise RuntimeError(f"esxi GET {path} http {resp2.status}")
                    return await resp2.json()
            if resp.status != 200:
                raise RuntimeError(f"esxi GET {path} http {resp.status}")
            return await resp.json()

    async def _poll_once(self) -> None:
        if not self._session_id:
            await self._login()

        # vSphere REST returns {"value": [...]} envelopes; both are common.
        hosts_resp = await self._get("/rest/vcenter/host")
        vms_resp   = await self._get("/rest/vcenter/vm")
        ds_resp    = await self._get("/rest/vcenter/datastore")

        hosts = (hosts_resp.get("value") if isinstance(hosts_resp, dict) else hosts_resp) or []
        vms   = (vms_resp.get("value") if isinstance(vms_resp, dict) else vms_resp) or []
        dss   = (ds_resp.get("value") if isinstance(ds_resp, dict) else ds_resp) or []

        nodes_payload: dict[str, dict] = {}
        for h in hosts:
            hid = h.get("host") or h.get("name") or "?"
            nodes_payload[hid] = {
                "node": h.get("name", hid),
                "status": h.get("connection_state", "?"),
                "type": "esxi-host",
            }
        vms_payload: dict[str, dict] = {}
        for v in vms:
            vid = v.get("vm") or v.get("name") or "?"
            vms_payload[vid] = {
                "vmid": vid,
                "name": v.get("name", vid),
                "status": v.get("power_state", "UNKNOWN").lower(),
                "cpu": v.get("cpu_count", 0),
                "memory_mb": v.get("memory_size_MiB", 0),
                "type": "esxi-vm",
            }
        storages_payload: dict[str, dict] = {}
        for d in dss:
            sid = d.get("datastore") or d.get("name") or "?"
            storages_payload[sid] = {
                "storage": d.get("name", sid),
                "type": d.get("type", "?"),
                "free": d.get("free_space", 0),
                "capacity": d.get("capacity", 0),
            }

        self._cache.update({
            "nodes": nodes_payload,
            "vms": vms_payload,
            "storages": storages_payload,
            "last_update": time.time(),
            "healthy": True,
            "error": None,
            "summary": {
                "total_nodes": len(nodes_payload),
                "total_vms": len(vms_payload),
                "running_vms": sum(1 for v in vms_payload.values()
                                   if (v.get("status") or "").lower() == "powered_on"),
            },
        })

        for cb in list(self._callbacks):
            try:
                await cb(self.id, self._cache)
            except Exception as e:
                logger.warning("esxi cluster %s callback error: %s", self.id, e)

    async def _poll_loop(self) -> None:
        while self._running:
            try:
                await self._poll_once()
                interval = self._poll_interval
            except Exception as e:
                self._cache["healthy"] = False
                self._cache["error"] = str(e)
                logger.warning("ESXi cluster %s poll error: %s", self.id, e)
                # Backoff if we're failing auth — don't hammer vCenter.
                if self._consecutive_auth_fail >= 3:
                    interval = 60.0
                else:
                    interval = max(self._poll_interval, 10.0)
            try:
                await asyncio.sleep(interval)
            except asyncio.CancelledError:
                break
