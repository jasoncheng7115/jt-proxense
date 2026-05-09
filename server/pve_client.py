"""
JT-PROXENSE PVE API Client
Async client for Proxmox VE API with failover support
"""

import asyncio
import logging
import ssl
import time
from typing import Optional, Any
from dataclasses import dataclass, field

import aiohttp

from .config import PVENodeConfig, PVEAuthConfig

logger = logging.getLogger(__name__)


@dataclass
class NodeHealth:
    """Health status of a single PVE node"""
    host: str
    port: int
    healthy: bool = False
    last_check: float = 0.0
    consecutive_failures: int = 0
    response_time_ms: float = 0.0
    error_message: str = ""


class PVEClient:
    """
    Async Proxmox VE API Client with multi-node failover support
    """

    def __init__(
        self,
        nodes: list[PVENodeConfig],
        auth: PVEAuthConfig,
        timeout: float = 10.0,
        health_check_interval: float = 30.0,
        max_consecutive_failures: int = 3,
    ):
        self.nodes = sorted(nodes, key=lambda n: n.priority)
        self.auth = auth
        self.timeout = timeout
        self.health_check_interval = health_check_interval
        self.max_consecutive_failures = max_consecutive_failures

        # Node health tracking
        self.node_health: dict[str, NodeHealth] = {}
        for node in self.nodes:
            key = f"{node.host}:{node.port}"
            self.node_health[key] = NodeHealth(host=node.host, port=node.port)

        # Current active node
        self._current_node_index = 0
        self._session: Optional[aiohttp.ClientSession] = None
        self._health_check_task: Optional[asyncio.Task] = None

    @property
    def current_node(self) -> Optional[PVENodeConfig]:
        """Get current active node"""
        if not self.nodes:
            return None
        return self.nodes[self._current_node_index]

    def _get_base_url(self, node: PVENodeConfig) -> str:
        """Get base URL for a node"""
        return f"https://{node.host}:{node.port}/api2/json"

    def _get_auth_headers(self) -> dict:
        """Get authentication headers"""
        if self.auth.token_name and self.auth.token_value:
            return {
                "Authorization": f"PVEAPIToken={self.auth.user}!{self.auth.token_name}={self.auth.token_value}"
            }
        return {}

    async def _get_session(self) -> aiohttp.ClientSession:
        """Get or create aiohttp session"""
        if self._session is None or self._session.closed:
            # Create SSL context that doesn't verify certificates
            ssl_context = ssl.create_default_context()
            ssl_context.check_hostname = False
            ssl_context.verify_mode = ssl.CERT_NONE

            connector = aiohttp.TCPConnector(ssl=ssl_context)
            timeout = aiohttp.ClientTimeout(total=self.timeout)
            self._session = aiohttp.ClientSession(
                connector=connector,
                timeout=timeout,
                headers=self._get_auth_headers(),
            )
        return self._session

    async def close(self):
        """Close the client session"""
        if self._health_check_task:
            self._health_check_task.cancel()
            try:
                await self._health_check_task
            except asyncio.CancelledError:
                pass

        if self._session and not self._session.closed:
            await self._session.close()

    async def _request(
        self,
        method: str,
        path: str,
        node: Optional[PVENodeConfig] = None,
        **kwargs,
    ) -> dict:
        """
        Make an API request to PVE
        """
        if node is None:
            node = self.current_node
        if node is None:
            raise RuntimeError("No PVE nodes configured")

        url = f"{self._get_base_url(node)}{path}"
        session = await self._get_session()

        start_time = time.time()
        node_key = f"{node.host}:{node.port}"

        from .pve_throttle import throttle
        try:
            async with throttle.acquire(node.host):
                async with session.request(method, url, **kwargs) as response:
                    response_time = (time.time() - start_time) * 1000

                    if response.status == 200:
                        data = await response.json()
                        # Update health
                        self.node_health[node_key].healthy = True
                        self.node_health[node_key].consecutive_failures = 0
                        self.node_health[node_key].response_time_ms = response_time
                        self.node_health[node_key].last_check = time.time()
                        return data.get("data", data)
                    else:
                        error_text = await response.text()
                        raise aiohttp.ClientResponseError(
                            response.request_info,
                            response.history,
                            status=response.status,
                            message=error_text,
                        )

        except Exception as e:
            # Update health on failure
            health = self.node_health[node_key]
            health.healthy = False
            health.consecutive_failures += 1
            health.error_message = str(e)
            health.last_check = time.time()

            # Some 500s are *expected* states, not failures: a node without
            # ceph installed will always 500 on /ceph/status. Log those at
            # debug level so the journal isn't drowned. Heuristic on the
            # error message — `pve_client.get_ceph_status` already wraps
            # the failure but only after we've logged here.
            err_str = str(e)
            benign = (
                "ceph-mon" in err_str
                or "pveceph configuration not initialized" in err_str
                or "ceph not installed" in err_str.lower()
            )
            log_fn = logger.debug if benign else logger.warning
            log_fn(
                f"PVE request failed for {node_key}: {e} "
                f"(failures: {health.consecutive_failures})"
            )

            # Try failover if too many failures
            if health.consecutive_failures >= self.max_consecutive_failures:
                await self._failover()

            raise

    async def _failover(self):
        """Switch to next healthy node"""
        original_index = self._current_node_index

        for i in range(len(self.nodes)):
            next_index = (self._current_node_index + 1) % len(self.nodes)
            self._current_node_index = next_index
            node = self.nodes[next_index]
            node_key = f"{node.host}:{node.port}"

            # Check if this node might be healthy
            health = self.node_health[node_key]
            if health.healthy or health.consecutive_failures < self.max_consecutive_failures:
                logger.info(f"Failing over to node: {node_key}")
                return

        # All nodes seem unhealthy, stay on current
        self._current_node_index = original_index
        logger.error("All PVE nodes appear unhealthy")

    async def start_health_check(self):
        """Start background health check task"""
        self._health_check_task = asyncio.create_task(self._health_check_loop())

    async def _health_check_loop(self):
        """Periodically check health of all nodes"""
        while True:
            try:
                await asyncio.sleep(self.health_check_interval)
                await self._check_all_nodes()
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Health check error: {e}")

    async def _check_all_nodes(self):
        """Check health of all nodes"""
        for node in self.nodes:
            node_key = f"{node.host}:{node.port}"
            try:
                await self._request("GET", "/version", node=node)
                logger.debug(f"Health check passed for {node_key}")
            except Exception as e:
                logger.debug(f"Health check failed for {node_key}: {e}")

    # API Methods

    async def get_version(self) -> dict:
        """Get PVE version info"""
        return await self._request("GET", "/version")

    async def get_cluster_status(self) -> list:
        """Get cluster status"""
        return await self._request("GET", "/cluster/status")

    async def get_cluster_resources(self, resource_type: Optional[str] = None) -> list:
        """Get cluster resources (nodes, VMs, storage, etc.)"""
        params = {}
        if resource_type:
            params["type"] = resource_type
        return await self._request("GET", "/cluster/resources", params=params)

    async def get_nodes(self) -> list:
        """Get list of nodes"""
        return await self._request("GET", "/nodes")

    async def get_node_status(self, node: str) -> dict:
        """Get node status"""
        return await self._request("GET", f"/nodes/{node}/status")

    async def get_node_rrddata(
        self, node: str, timeframe: str = "hour", cf: str = "AVERAGE"
    ) -> list:
        """Get node RRD data for graphs"""
        return await self._request(
            "GET",
            f"/nodes/{node}/rrddata",
            params={"timeframe": timeframe, "cf": cf},
        )

    async def get_vms(self, node: str) -> list:
        """Get VMs on a node"""
        return await self._request("GET", f"/nodes/{node}/qemu")

    async def get_vm_status(self, node: str, vmid: int) -> dict:
        """Get VM current status"""
        return await self._request("GET", f"/nodes/{node}/qemu/{vmid}/status/current")

    async def get_vm_config(self, node: str, vmid: int) -> dict:
        """Get VM config (includes disk info)"""
        return await self._request("GET", f"/nodes/{node}/qemu/{vmid}/config")

    async def get_lxc_config(self, node: str, vmid: int) -> dict:
        """Get LXC container config (memory, swap, mp/rootfs, net etc.)"""
        return await self._request("GET", f"/nodes/{node}/lxc/{vmid}/config")

    async def get_vm_rrddata(
        self, node: str, vmid: int, timeframe: str = "hour", cf: str = "AVERAGE"
    ) -> list:
        """Get VM RRD data"""
        return await self._request(
            "GET",
            f"/nodes/{node}/qemu/{vmid}/rrddata",
            params={"timeframe": timeframe, "cf": cf},
        )

    async def get_lxc_rrddata(
        self, node: str, vmid: int, timeframe: str = "hour", cf: str = "AVERAGE"
    ) -> list:
        """Get LXC container RRD data"""
        return await self._request(
            "GET",
            f"/nodes/{node}/lxc/{vmid}/rrddata",
            params={"timeframe": timeframe, "cf": cf},
        )

    async def get_storage_rrddata(
        self, node: str, storage: str,
        timeframe: str = "hour", cf: str = "AVERAGE",
    ) -> list:
        """Get storage usage RRD data — used / total bytes over time."""
        return await self._request(
            "GET",
            f"/nodes/{node}/storage/{storage}/rrddata",
            params={"timeframe": timeframe, "cf": cf},
        )

    async def get_cluster_log(self, max_lines: int = 200) -> list:
        """Cluster-wide syslog tail (the 'Cluster log' panel in PVE web UI).

        Each entry: {n, t, pri, time, node, user, msg}. Useful for ops
        timeline triage — who logged in, services restarted, etc."""
        return await self._request(
            "GET", "/cluster/log", params={"max": max_lines}
        )

    async def get_node_syslog(self, node: str, *, since: int = 0,
                              until: int = 0, lines: int = 500,
                              service: str = "") -> list:
        """`/nodes/{node}/syslog` — host journalctl tail. Each entry has
        {n, t} where t is the line text. PVE strips it of any time
        prefix the operator may want to add a unit filter via `service`."""
        params: dict = {}
        if since:   params["since"] = since
        if until:   params["until"] = until
        if lines:   params["limit"] = lines
        if service: params["service"] = service
        return await self._request(
            "GET", f"/nodes/{node}/syslog", params=params
        )

    async def list_users(self) -> list:
        """`/access/users` — list PVE users."""
        try:
            return await self._request("GET", "/access/users", params={"enabled": 1})
        except Exception:
            return []

    async def list_user_tokens(self, userid: str) -> list:
        """`/access/users/{userid}/token` — list API tokens for a user."""
        try:
            return await self._request("GET", f"/access/users/{userid}/token")
        except Exception:
            return []

    async def get_node_services(self, node: str) -> list:
        """`/nodes/{node}/services` — pveproxy, pvedaemon, pvestatd,
        corosync, etc. Returns {name, desc, state, active-state}."""
        return await self._request("GET", f"/nodes/{node}/services")

    async def node_service_action(self, node: str, service: str, action: str) -> str:
        """POST /nodes/{node}/services/{name}/{start|stop|restart|reload}.
        Returns the PVE task UPID. Caller must have validated `action`."""
        return await self._request(
            "POST", f"/nodes/{node}/services/{service}/{action}"
        )

    # ----- VM lifecycle (v0.3+ writes; require write-scoped PVE token) -----

    async def vm_start(self, node: str, vmid: int) -> str:
        """Power on a VM. Returns the PVE task UPID."""
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/status/start")

    async def vm_stop(self, node: str, vmid: int) -> str:
        """Hard power-off (no ACPI). Returns the task UPID."""
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/status/stop")

    async def vm_shutdown(self, node: str, vmid: int) -> str:
        """ACPI shutdown — guest OS is asked to shut down gracefully."""
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/status/shutdown")

    async def vm_reboot(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/status/reboot")

    async def vm_suspend(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/status/suspend")

    async def vm_resume(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/status/resume")

    async def vm_migrate(self, node: str, vmid: int, target: str,
                         online: bool = True, with_local_disks: bool = False,
                         migration_network: str | None = None) -> str:
        """Migrate a VM to another node within the same cluster. Returns task UPID.

        `online=True` does live migration (requires shared storage or with_local_disks).
        `migration_network` optionally pins the data transfer onto a specific
        CIDR — the operator's high-bandwidth migration network. PVE looks up
        which interface on each node carries that subnet.
        """
        data = {"target": target, "online": 1 if online else 0}
        if with_local_disks:
            data["with-local-disks"] = 1
        if migration_network:
            data["migration_network"] = migration_network
        return await self._request(
            "POST", f"/nodes/{node}/qemu/{vmid}/migrate", data=data,
        )

    async def vm_remote_migrate(
        self, node: str, vmid: int, *,
        target_endpoint: str,
        target_vmid: int,
        target_bridge: str,
        target_storage: str,
        online: bool = True,
        delete_source: bool = False,
        bwlimit: int | None = None,
    ) -> str:
        """PVE 8 cross-cluster ('remote') migrate.

        target_endpoint (string built by the caller): 'apitoken=PVEAPIToken=<USER!TOKEN=SECRET>,
            host=<IP_OR_HOSTNAME>,fingerprint=<SHA256_HEX>,port=8006'
        target_vmid: VM id to assign on the target cluster (auto-pick or operator-chosen).
        target_bridge: 'src=dst[;src=dst...]' mapping (e.g. 'vmbr0=vmbr0').
        target_storage: 'src=dst[;src=dst...]' mapping for each VM disk's storage.
        delete_source: if True, source VM is removed after a successful migrate
            (PVE term for "move" vs "copy"). Default False = leave source intact.
        """
        data = {
            "target-endpoint": target_endpoint,
            "target-vmid": target_vmid,
            "target-bridge": target_bridge,
            "target-storage": target_storage,
            "online": 1 if online else 0,
            "delete": 1 if delete_source else 0,
        }
        if bwlimit:
            data["bwlimit"] = bwlimit
        return await self._request(
            "POST", f"/nodes/{node}/qemu/{vmid}/remote_migrate", data=data,
        )

    # --- Snapshots / clone / template / delete (full VM lifecycle) ---

    async def vm_reset(self, node: str, vmid: int) -> str:
        """Hard reset (button-style power cycle). UPID returned."""
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/status/reset")

    async def vm_list_snapshots(self, node: str, vmid: int) -> list:
        return await self._request("GET", f"/nodes/{node}/qemu/{vmid}/snapshot")

    async def vm_take_snapshot(self, node: str, vmid: int, snapname: str,
                               description: str = "", vmstate: bool = False) -> str:
        data = {"snapname": snapname, "description": description,
                "vmstate": 1 if vmstate else 0}
        return await self._request(
            "POST", f"/nodes/{node}/qemu/{vmid}/snapshot", data=data,
        )

    async def vm_delete_snapshot(self, node: str, vmid: int, snapname: str) -> str:
        return await self._request(
            "DELETE", f"/nodes/{node}/qemu/{vmid}/snapshot/{snapname}",
        )

    async def vm_rollback_snapshot(self, node: str, vmid: int, snapname: str) -> str:
        return await self._request(
            "POST", f"/nodes/{node}/qemu/{vmid}/snapshot/{snapname}/rollback",
        )

    async def vm_clone(self, node: str, vmid: int, *,
                       newid: int, name: str = "", target_node: str | None = None,
                       full: bool = False, storage: str | None = None,
                       snapname: str | None = None) -> str:
        data = {"newid": newid, "full": 1 if full else 0}
        if name: data["name"] = name
        if target_node: data["target"] = target_node
        if storage: data["storage"] = storage
        if snapname: data["snapname"] = snapname
        return await self._request(
            "POST", f"/nodes/{node}/qemu/{vmid}/clone", data=data,
        )

    async def vm_to_template(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/qemu/{vmid}/template")

    async def vm_delete(self, node: str, vmid: int, *, purge: bool = False,
                        skiplock: bool = False) -> str:
        params = {}
        if purge: params["purge"] = 1
        if skiplock: params["skiplock"] = 1
        return await self._request(
            "DELETE", f"/nodes/{node}/qemu/{vmid}", params=params,
        )

    async def vm_update_config(self, node: str, vmid: int, **fields) -> dict:
        """Update VM config. PVE returns {} on async update (uses background
        task) or directly applies for simple fields."""
        return await self._request(
            "PUT", f"/nodes/{node}/qemu/{vmid}/config", data=fields,
        )

    # --- noVNC / console ---

    async def vm_vncproxy(self, node: str, vmid: int, *,
                          websocket: bool = True, generate_password: bool = False) -> dict:
        """Get a noVNC ticket. Returns {ticket, port, user, cert, ...}.
        Pass websocket=True (default) for browser noVNC. The ticket is single-use
        and expires within ~30 s if not used."""
        data = {"websocket": 1 if websocket else 0,
                "generate-password": 1 if generate_password else 0}
        return await self._request(
            "POST", f"/nodes/{node}/qemu/{vmid}/vncproxy", data=data,
        )

    async def ct_vncproxy(self, node: str, vmid: int, *,
                          websocket: bool = True) -> dict:
        data = {"websocket": 1 if websocket else 0}
        return await self._request(
            "POST", f"/nodes/{node}/lxc/{vmid}/vncproxy", data=data,
        )

    async def get_task_status(self, node: str, upid: str) -> dict:
        """Poll the status of a long-running task by its UPID."""
        return await self._request(
            "GET", f"/nodes/{node}/tasks/{upid}/status",
        )

    # ----- LXC container lifecycle (v0.3+ writes; mirror of vm_*) -----

    async def ct_start(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/lxc/{vmid}/status/start")

    async def ct_stop(self, node: str, vmid: int) -> str:
        """Hard stop (no graceful shutdown)."""
        return await self._request("POST", f"/nodes/{node}/lxc/{vmid}/status/stop")

    async def ct_shutdown(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/lxc/{vmid}/status/shutdown")

    async def ct_reboot(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/lxc/{vmid}/status/reboot")

    async def ct_suspend(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/lxc/{vmid}/status/suspend")

    async def ct_resume(self, node: str, vmid: int) -> str:
        return await self._request("POST", f"/nodes/{node}/lxc/{vmid}/status/resume")

    async def ct_migrate(self, node: str, vmid: int, target: str,
                         online: bool = False, restart: bool = False) -> str:
        """LXC migrate. PVE supports offline migration always, online via
        restart=1 (which stops + starts on target)."""
        data = {"target": target}
        if online: data["online"] = 1
        if restart: data["restart"] = 1
        return await self._request(
            "POST", f"/nodes/{node}/lxc/{vmid}/migrate", data=data,
        )

    # ----- Tags + pools (PDM-style, v0.3.x) -----

    async def list_pools(self) -> list:
        """All resource pools in the cluster."""
        return await self._request("GET", "/pools")

    async def get_pool(self, poolid: str) -> dict:
        """Pool details including member VMs / storages."""
        return await self._request("GET", f"/pools/{poolid}")

    async def create_pool(self, poolid: str, comment: str = "") -> None:
        await self._request("POST", "/pools", data={"poolid": poolid, "comment": comment})

    async def delete_pool(self, poolid: str) -> None:
        await self._request("DELETE", f"/pools/{poolid}")

    async def update_pool(self, poolid: str, *, vms: str | None = None,
                          storage: str | None = None, delete: bool = False) -> None:
        """Add/remove VMs and storages to/from a pool. `vms` and `storage`
        are comma-separated lists of vmids / storage ids per PVE convention.
        delete=True removes them; otherwise adds."""
        data: dict = {}
        if vms is not None:
            data["vms"] = vms
        if storage is not None:
            data["storage"] = storage
        if delete:
            data["delete"] = 1
        await self._request("PUT", f"/pools/{poolid}", data=data)

    async def set_vm_tags(self, node: str, vmid: int, tags: str) -> None:
        """Replace the VM's tag list. PVE separates tags by ';'."""
        await self._request(
            "PUT", f"/nodes/{node}/qemu/{vmid}/config",
            data={"tags": tags},
        )

    async def set_ct_tags(self, node: str, vmid: int, tags: str) -> None:
        await self._request(
            "PUT", f"/nodes/{node}/lxc/{vmid}/config",
            data={"tags": tags},
        )

    # ----- Backups (vzdump + storage content listing) -----

    async def list_backup_jobs(self) -> list:
        """Cluster-level scheduled backup jobs."""
        return await self._request("GET", "/cluster/backup")

    async def get_backup_job(self, job_id: str) -> dict:
        return await self._request("GET", f"/cluster/backup/{job_id}")

    async def create_backup_job(self, *, schedule: str, storage: str,
                                vmid: str | None = None, all_vms: bool = False,
                                node: str | None = None,
                                mode: str = "snapshot",
                                **kwargs) -> None:
        data = {"schedule": schedule, "storage": storage, "mode": mode}
        if vmid: data["vmid"] = vmid
        if all_vms: data["all"] = 1
        if node: data["node"] = node
        for k, v in kwargs.items():
            data[k] = v
        await self._request("POST", "/cluster/backup", data=data)

    async def delete_backup_job(self, job_id: str) -> None:
        await self._request("DELETE", f"/cluster/backup/{job_id}")

    async def trigger_backup(self, node: str, *, vmid: int | str,
                             storage: str, mode: str = "snapshot",
                             compress: str = "zstd", **kwargs) -> str:
        """Run an ad-hoc vzdump on `node`. Returns the task UPID.
        Accepts a single vmid or a comma-separated list."""
        data = {"vmid": str(vmid), "storage": storage,
                "mode": mode, "compress": compress}
        for k, v in kwargs.items():
            data[k] = v
        return await self._request("POST", f"/nodes/{node}/vzdump", data=data)

    async def list_storage_content(self, node: str, storage: str,
                                   content: str = "backup") -> list:
        """Backups (or other content) currently stored on `storage`."""
        return await self._request(
            "GET", f"/nodes/{node}/storage/{storage}/content",
            params={"content": content},
        )

    async def delete_storage_content(self, node: str, storage: str,
                                     volume: str) -> str:
        """Delete a stored volume (e.g. an old backup file). Returns task UPID."""
        return await self._request(
            "DELETE", f"/nodes/{node}/storage/{storage}/content/{volume}",
        )

    async def download_url_to_storage(self, node: str, storage: str, *,
                                      url: str, filename: str, content: str,
                                      checksum: str | None = None,
                                      checksum_algorithm: str | None = None,
                                      verify_certificates: bool = True) -> str:
        """Tell PVE to download a file from `url` into `storage` with the
        given `filename`. Returns task UPID — caller can poll
        `/nodes/{node}/tasks/{upid}/status` for progress.

        PVE 8+ exposes `/nodes/{node}/storage/{storage}/download-url`. Only
        the file-level storage drivers accept this; backend will 400 for
        block-level. We pass through verify_certificates to let operators
        opt out for self-signed mirrors (used carefully, audit-logged)."""
        data: dict = {
            "url":      url,
            "filename": filename,
            "content":  content,
        }
        if checksum:
            data["checksum"] = checksum
        if checksum_algorithm:
            data["checksum-algorithm"] = checksum_algorithm
        if not verify_certificates:
            data["verify-certificates"] = 0
        return await self._request(
            "POST", f"/nodes/{node}/storage/{storage}/download-url",
            data=data,
        )

    async def restore_backup(self, node: str, *, vmid: int, storage: str,
                             archive: str, vm_type: str = "qemu",
                             force: bool = False, **kwargs) -> str:
        """Restore a backup file into a (new or existing) vmid. Returns UPID.
        `vm_type` is 'qemu' or 'lxc' — selects the right PVE endpoint."""
        path = "qemu" if vm_type == "qemu" else "lxc"
        data = {"vmid": vmid, "archive": f"{storage}:{archive}",
                "force": 1 if force else 0}
        for k, v in kwargs.items():
            data[k] = v
        return await self._request("POST", f"/nodes/{node}/{path}", data=data)

    # ----- Apt updates manager -----

    async def list_apt_updates(self, node: str) -> list:
        """Pending apt-get upgrades on a node."""
        return await self._request("GET", f"/nodes/{node}/apt/update")

    async def apt_refresh(self, node: str) -> str:
        """Trigger apt-get update. Returns task UPID."""
        return await self._request("POST", f"/nodes/{node}/apt/update")

    async def apt_upgrade(self, node: str) -> str:
        """Apply pending updates. Returns task UPID."""
        return await self._request("POST", f"/nodes/{node}/apt/upgrade")

    # ----- ACME certificate management -----

    async def list_acme_accounts(self) -> list:
        return await self._request("GET", "/cluster/acme/account")

    async def create_acme_account(self, name: str, contact: str, *,
                                  directory: str = "https://acme-v02.api.letsencrypt.org/directory",
                                  tos_url: str = "") -> str:
        data = {"name": name, "contact": contact, "directory": directory}
        if tos_url:
            data["tos_url"] = tos_url
        return await self._request("POST", "/cluster/acme/account", data=data)

    async def request_acme_cert(self, node: str, *, force: bool = False) -> str:
        """Order/renew a certificate for the given node. Returns task UPID."""
        data = {"force": 1 if force else 0}
        return await self._request("POST", f"/nodes/{node}/certificates/acme/certificate", data=data)

    # ----- HA group management -----

    async def list_ha_groups(self) -> list:
        return await self._request("GET", "/cluster/ha/groups")

    async def create_ha_group(self, group: str, nodes: str, *,
                              restricted: bool = False, nofailback: bool = False,
                              comment: str = "") -> None:
        data = {"group": group, "nodes": nodes,
                "restricted": 1 if restricted else 0,
                "nofailback": 1 if nofailback else 0}
        if comment:
            data["comment"] = comment
        await self._request("POST", "/cluster/ha/groups", data=data)

    async def delete_ha_group(self, group: str) -> None:
        await self._request("DELETE", f"/cluster/ha/groups/{group}")

    async def list_ha_resources(self) -> list:
        return await self._request("GET", "/cluster/ha/resources")

    async def list_ha_status(self) -> list:
        """`/cluster/ha/status/current` — per-resource live state (started /
        stopped / error), node, max_relocate, last reboot, request_state, etc."""
        return await self._request("GET", "/cluster/ha/status/current")

    async def list_replication_jobs(self) -> list:
        """List storage replication jobs (`/cluster/replication`)."""
        try:
            return await self._request("GET", "/cluster/replication")
        except Exception:
            return []

    async def add_ha_resource(self, sid: str, *, group: str | None = None,
                              state: str = "started", comment: str = "") -> None:
        """sid is e.g. 'vm:100' or 'ct:101'."""
        data = {"sid": sid, "state": state}
        if group:
            data["group"] = group
        if comment:
            data["comment"] = comment
        await self._request("POST", "/cluster/ha/resources", data=data)

    async def delete_ha_resource(self, sid: str) -> None:
        # PVE accepts sid in the URL path
        await self._request("DELETE", f"/cluster/ha/resources/{sid}")

    # ----- Firewall (cluster-level) -----

    async def list_cluster_firewall_rules(self) -> list:
        return await self._request("GET", "/cluster/firewall/rules")

    async def add_cluster_firewall_rule(self, *, action: str, type: str = "in",
                                        enable: bool = True,
                                        source: str = "", dest: str = "",
                                        proto: str = "", dport: str = "",
                                        comment: str = "") -> None:
        data = {"action": action, "type": type, "enable": 1 if enable else 0}
        for k, v in (("source", source), ("dest", dest), ("proto", proto),
                     ("dport", dport), ("comment", comment)):
            if v:
                data[k] = v
        await self._request("POST", "/cluster/firewall/rules", data=data)

    async def delete_cluster_firewall_rule(self, pos: int) -> None:
        await self._request("DELETE", f"/cluster/firewall/rules/{pos}")

    # ----- Firewall (VM-level) -----

    async def list_vm_firewall_rules(self, node: str, vmid: int, vm_type: str = "qemu") -> list:
        path = "qemu" if vm_type == "qemu" else "lxc"
        return await self._request("GET", f"/nodes/{node}/{path}/{vmid}/firewall/rules")

    async def add_vm_firewall_rule(self, node: str, vmid: int, vm_type: str, **kwargs) -> None:
        path = "qemu" if vm_type == "qemu" else "lxc"
        await self._request("POST", f"/nodes/{node}/{path}/{vmid}/firewall/rules", data=kwargs)

    async def delete_vm_firewall_rule(self, node: str, vmid: int, vm_type: str, pos: int) -> None:
        path = "qemu" if vm_type == "qemu" else "lxc"
        await self._request("DELETE", f"/nodes/{node}/{path}/{vmid}/firewall/rules/{pos}")

    # ----- SDN (read-only first; write needs reload semantics) -----

    async def list_sdn_zones(self) -> list:
        return await self._request("GET", "/cluster/sdn/zones")

    async def list_sdn_vnets(self) -> list:
        return await self._request("GET", "/cluster/sdn/vnets")

    async def list_sdn_subnets(self, vnet: str) -> list:
        return await self._request("GET", f"/cluster/sdn/vnets/{vnet}/subnets")

    async def reload_sdn(self) -> str:
        """Apply pending SDN configuration. Returns task UPID."""
        return await self._request("POST", "/cluster/sdn")

    # ----- Storage replication -----

    async def list_replication_jobs(self) -> list:
        return await self._request("GET", "/cluster/replication")

    async def create_replication_job(self, *, id: str, target: str, schedule: str,
                                     rate: int | None = None, comment: str = "") -> None:
        data = {"id": id, "target": target, "schedule": schedule, "type": "local"}
        if rate is not None:
            data["rate"] = rate
        if comment:
            data["comment"] = comment
        await self._request("POST", "/cluster/replication", data=data)

    async def delete_replication_job(self, job_id: str) -> None:
        await self._request("DELETE", f"/cluster/replication/{job_id}")

    async def get_containers(self, node: str) -> list:
        """Get containers on a node"""
        return await self._request("GET", f"/nodes/{node}/lxc")

    async def get_container_status(self, node: str, vmid: int) -> dict:
        """Get container current status"""
        return await self._request("GET", f"/nodes/{node}/lxc/{vmid}/status/current")

    async def get_container_config(self, node: str, vmid: int) -> dict:
        """Get container config (includes disk info)"""
        return await self._request("GET", f"/nodes/{node}/lxc/{vmid}/config")

    async def get_storage(self, node: str) -> list:
        """Get storage on a node"""
        return await self._request("GET", f"/nodes/{node}/storage")

    async def acquire_ticket(self, username: str, password: str) -> dict:
        """POST /access/ticket — exchange username+password for a PVE auth
        cookie + CSRF token. Used by the noVNC console proxy to mint a
        PVEAuthCookie because PVE's vncwebsocket endpoint refuses API tokens
        at the WebSocket Upgrade step.

        Returns {ticket, csrf, expires_at_unix}. Caller should cache the
        ticket up to ~110 minutes; PVE tickets are valid 2h, refresh early.
        """
        # /access/ticket is unauthenticated by definition (it IS the
        # authentication step). We hit the current active node directly.
        if not self.nodes:
            raise RuntimeError("no PVE nodes configured")
        node = self.current_node or self.nodes[0]
        url = f"https://{node.host}:{node.port}/api2/json/access/ticket"
        ssl_ctx = None if node.verify_ssl else ssl._create_unverified_context()
        connector = aiohttp.TCPConnector(ssl=ssl_ctx)
        timeout = aiohttp.ClientTimeout(total=self.timeout)
        import time as _time
        async with aiohttp.ClientSession(connector=connector, timeout=timeout) as s:
            async with s.post(url, data={"username": username, "password": password}) as resp:
                if resp.status != 200:
                    body = await resp.text()
                    raise RuntimeError(f"ticket exchange failed: HTTP {resp.status}: {body[:200]}")
                payload = await resp.json()
        data = (payload or {}).get("data") or {}
        ticket = data.get("ticket")
        csrf = data.get("CSRFPreventionToken") or ""
        if not ticket:
            raise RuntimeError("ticket exchange returned no ticket")
        # PVE tickets last 2 hours; we expire ours at +110 min so callers
        # always refresh comfortably before PVE rejects.
        return {"ticket": ticket, "csrf": csrf, "expires_at": int(_time.time()) + 110 * 60}

    async def get_node_network(self, node: str, iface_type: str | None = None) -> list:
        """Get network interface list on a node.

        Used by the cross-cluster migrate UI to enumerate bridges (for the
        per-NIC target-bridge mapping) and IP addresses (so the operator
        can pin the migration data transfer onto a specific subnet).
        `iface_type` accepts PVE's filter values ('bridge', 'bond', 'eth',
        'OVSBridge', 'any_bridge', etc.) — leave None to get everything.
        """
        params = {"type": iface_type} if iface_type else None
        return await self._request("GET", f"/nodes/{node}/network", params=params)

    async def get_storage_status(self, node: str, storage: str) -> dict:
        """Get storage status"""
        return await self._request("GET", f"/nodes/{node}/storage/{storage}/status")

    async def get_storage_config(self) -> list:
        """Get all storage configurations (includes allowed nodes)"""
        return await self._request("GET", "/storage")

    # Ceph APIs

    async def get_ceph_status(self, node: str) -> dict:
        """Get Ceph status"""
        try:
            return await self._request("GET", f"/nodes/{node}/ceph/status")
        except Exception:
            return {}

    async def get_ceph_osd(self, node: str) -> list:
        """Get Ceph OSD list"""
        try:
            return await self._request("GET", f"/nodes/{node}/ceph/osd")
        except Exception:
            return []

    async def get_ceph_pools(self, node: str) -> list:
        """Get Ceph pools"""
        try:
            return await self._request("GET", f"/nodes/{node}/ceph/pool")
        except Exception:
            return []

    async def get_ceph_mon(self, node: str) -> list:
        """Get Ceph monitors"""
        try:
            return await self._request("GET", f"/nodes/{node}/ceph/mon")
        except Exception:
            return []

    async def get_ceph_mgr(self, node: str) -> list:
        """Get Ceph managers"""
        try:
            return await self._request("GET", f"/nodes/{node}/ceph/mgr")
        except Exception:
            return []

    async def get_ceph_mds(self, node: str) -> list:
        """Get Ceph metadata servers"""
        try:
            return await self._request("GET", f"/nodes/{node}/ceph/mds")
        except Exception:
            return []

    def get_health_status(self) -> dict:
        """Get health status of all nodes"""
        return {
            key: {
                "host": h.host,
                "port": h.port,
                "healthy": h.healthy,
                "response_time_ms": h.response_time_ms,
                "consecutive_failures": h.consecutive_failures,
                "error_message": h.error_message,
                "last_check": h.last_check,
            }
            for key, h in self.node_health.items()
        }

    # Task APIs

    async def get_cluster_tasks(self, running: bool = False, limit: int = 50) -> list:
        """Get cluster tasks"""
        try:
            # Note: older PVE versions don't support running/limit params
            # Fetch without params for compatibility
            tasks = await self._request("GET", "/cluster/tasks")
            if running:
                # Filter running tasks manually
                # Running tasks have no endtime or endtime=0, and status not 'stopped'
                tasks = [t for t in tasks if not t.get("endtime") and t.get("status") != "stopped"]
            return tasks[:limit] if limit else tasks
        except Exception as e:
            logger.debug(f"Failed to get cluster tasks: {e}")
            return []

    async def get_node_tasks(self, node: str, running: bool = False, limit: int = 50) -> list:
        """Get tasks for a specific node"""
        try:
            # Note: older PVE versions don't support running/limit params
            tasks = await self._request("GET", f"/nodes/{node}/tasks")
            if running:
                # Running tasks have no endtime or endtime=0, and status not 'stopped'
                tasks = [t for t in tasks if not t.get("endtime") and t.get("status") != "stopped"]
            return tasks[:limit] if limit else tasks
        except Exception as e:
            logger.debug(f"Failed to get node tasks: {e}")
            return []

    async def get_task_status(self, node: str, upid: str) -> dict:
        """Get status of a specific task"""
        try:
            from urllib.parse import quote
            encoded_upid = quote(upid, safe='')
            return await self._request("GET", f"/nodes/{node}/tasks/{encoded_upid}/status")
        except Exception:
            return {}

    async def get_task_log(self, node: str, upid: str, start: int = 0, limit: int = 10) -> list:
        """Get log lines of a specific task"""
        try:
            from urllib.parse import quote
            encoded_upid = quote(upid, safe='')
            result = await self._request("GET", f"/nodes/{node}/tasks/{encoded_upid}/log", params={"start": start, "limit": limit})
            return result if isinstance(result, list) else []
        except Exception as e:
            import logging
            logging.getLogger(__name__).warning(f"Failed to get task log for {upid}: {e}")
            return []
