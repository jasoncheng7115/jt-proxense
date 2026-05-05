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

        try:
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

            logger.warning(
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

    async def get_vm_rrddata(
        self, node: str, vmid: int, timeframe: str = "hour", cf: str = "AVERAGE"
    ) -> list:
        """Get VM RRD data"""
        return await self._request(
            "GET",
            f"/nodes/{node}/qemu/{vmid}/rrddata",
            params={"timeframe": timeframe, "cf": cf},
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
                         online: bool = True, with_local_disks: bool = False) -> str:
        """Migrate a VM to another node. Returns task UPID.
        `online=True` does live migration (requires shared storage or
        with_local_disks)."""
        data = {"target": target, "online": 1 if online else 0}
        if with_local_disks:
            data["with-local-disks"] = 1
        return await self._request(
            "POST", f"/nodes/{node}/qemu/{vmid}/migrate", data=data,
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
