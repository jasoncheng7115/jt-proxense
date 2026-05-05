"""
JT-PROXENSE Cluster Manager
Manages multiple PVE clusters with independent polling
"""

import asyncio
import logging
import re
import time
from dataclasses import dataclass, field, asdict
from typing import Optional, Callable, Awaitable

from .config import ClusterConfig, get_config
from .pve_client import PVEClient
from .models import (
    NodeMetrics,
    VMMetrics,
    StorageMetrics,
    CephMetrics,
    ClusterSummary,
    CPUMetrics,
    MemoryMetrics,
    DiskMetrics,
    DiskConfig,
    NetworkMetrics,
    VMStatus,
    NodeStatus,
    CephOSD,
    CephPool,
    CephMon,
    CephMgr,
    CephMds,
    VMTask,
)

logger = logging.getLogger(__name__)


@dataclass
class NetworkRateTracker:
    """Track previous network values for rate calculation"""
    prev_rx: float = 0.0
    prev_tx: float = 0.0
    prev_time: float = 0.0


@dataclass
class ClusterCache:
    """Cached data for a single cluster"""
    nodes: dict[str, NodeMetrics] = field(default_factory=dict)
    vms: dict[str, VMMetrics] = field(default_factory=dict)  # key: "node/vmid"
    storages: dict[str, StorageMetrics] = field(default_factory=dict)
    ceph: Optional[CephMetrics] = None
    summary: Optional[ClusterSummary] = None
    tasks: dict[str, VMTask] = field(default_factory=dict)  # key: upid
    vm_network_trackers: dict[str, NetworkRateTracker] = field(default_factory=dict)  # key: "node/vmid"
    node_network_trackers: dict[str, NetworkRateTracker] = field(default_factory=dict)  # key: node_name
    last_update: float = 0.0
    last_static_update: float = 0.0


class Cluster:
    """
    Represents a single PVE cluster with its own polling and cache
    """

    def __init__(self, config: ClusterConfig):
        self.config = config
        self.client = PVEClient(
            nodes=config.nodes,
            auth=config.auth,
        )
        self.cache = ClusterCache()
        self._poll_task: Optional[asyncio.Task] = None
        self._static_task: Optional[asyncio.Task] = None
        self._running = False
        self._callbacks: list[Callable[[str, ClusterCache], Awaitable[None]]] = []
        self._pve_cluster_name: str = ""  # Actual PVE cluster name
        self._is_standalone: bool = False  # True if single node, no PVE cluster

    @property
    def id(self) -> str:
        return self.config.id

    @property
    def name(self) -> str:
        # Use config name if set, otherwise use PVE cluster name
        if self.config.name:
            return self.config.name
        return self._pve_cluster_name or self.config.id

    @property
    def is_standalone(self) -> bool:
        return self._is_standalone

    def add_callback(self, callback: Callable[[str, ClusterCache], Awaitable[None]]):
        """Add callback for data updates"""
        self._callbacks.append(callback)

    async def _notify_callbacks(self):
        """Notify all callbacks of data update"""
        for callback in self._callbacks:
            try:
                await callback(self.id, self.cache)
            except Exception as e:
                logger.error(f"Callback error for cluster {self.id}: {e}")

    async def start(self):
        """Start polling this cluster"""
        if self._running:
            return

        self._running = True
        await self.client.start_health_check()

        # Initial data fetch
        await self._fetch_static_data()
        await self._fetch_metrics()

        # Start polling tasks
        self._poll_task = asyncio.create_task(self._poll_loop())
        self._static_task = asyncio.create_task(self._static_refresh_loop())

        logger.info(f"Started polling cluster: {self.id} ({self.name})")

    async def stop(self):
        """Stop polling this cluster"""
        self._running = False

        if self._poll_task:
            self._poll_task.cancel()
            try:
                await self._poll_task
            except asyncio.CancelledError:
                pass

        if self._static_task:
            self._static_task.cancel()
            try:
                await self._static_task
            except asyncio.CancelledError:
                pass

        await self.client.close()
        logger.info(f"Stopped polling cluster: {self.id}")

    async def _poll_loop(self):
        """Main polling loop for metrics"""
        while self._running:
            try:
                await self._fetch_metrics()
                # Also fetch Ceph I/O data on each poll for real-time updates
                if self.cache.ceph:
                    await self._fetch_ceph_io()
                await self._notify_callbacks()
            except Exception as e:
                logger.error(f"Poll error for cluster {self.id}: {e}")

            await asyncio.sleep(self.config.poll_interval)

    async def _static_refresh_loop(self):
        """Refresh static data periodically"""
        while self._running:
            await asyncio.sleep(self.config.static_refresh_interval)
            try:
                await self._fetch_static_data()
            except Exception as e:
                logger.error(f"Static refresh error for cluster {self.id}: {e}")

    async def _fetch_static_data(self):
        """Fetch static data (VM list, storage list, etc.)"""
        try:
            # Fetch PVE cluster name if not already set
            if not self._pve_cluster_name:
                await self._fetch_cluster_name()

            # Fetch storage configurations (includes allowed_nodes)
            storage_configs = await self._fetch_storage_configs()

            # Get all resources in one call
            resources = await self.client.get_cluster_resources()

            # Process resources by type
            for resource in resources:
                res_type = resource.get("type")

                if res_type == "node":
                    await self._process_node_resource(resource)
                elif res_type == "qemu":
                    await self._process_vm_resource(resource, "qemu")
                elif res_type == "lxc":
                    await self._process_vm_resource(resource, "lxc")
                elif res_type == "storage":
                    await self._process_storage_resource(resource, storage_configs)

            # Update node VM/CT counts
            self._update_node_vm_counts()

            # Fetch VM disk configurations
            await self._fetch_vm_disk_configs()

            # Fetch Ceph data if available
            await self._fetch_ceph_data()

            self.cache.last_static_update = time.time()
            logger.debug(f"Static data refreshed for cluster {self.id}")

        except Exception as e:
            logger.error(f"Failed to fetch static data for {self.id}: {e}")

    async def _fetch_storage_configs(self) -> dict[str, list[str]]:
        """Fetch storage configurations to get allowed nodes per storage"""
        storage_configs: dict[str, list[str]] = {}
        try:
            configs = await self.client.get_storage_config()
            for config in configs:
                storage_name = config.get("storage", "")
                if storage_name:
                    # 'nodes' field contains comma-separated list of allowed nodes
                    # If empty or not present, storage is available on all nodes
                    nodes_str = config.get("nodes", "")
                    if nodes_str:
                        storage_configs[storage_name] = [n.strip() for n in nodes_str.split(",")]
                    else:
                        storage_configs[storage_name] = []  # Empty = all nodes
            logger.debug(f"Fetched storage configs: {storage_configs}")
        except Exception as e:
            logger.warning(f"Failed to fetch storage configs: {e}")
        return storage_configs

    async def _fetch_vm_disk_configs(self):
        """Fetch disk configurations for all VMs/CTs"""
        for key, vm in self.cache.vms.items():
            try:
                node = vm.node
                vmid = vm.vmid

                if vm.type == "qemu":
                    config = await self.client.get_vm_config(node, vmid)
                else:  # lxc
                    config = await self.client.get_container_config(node, vmid)

                disks = self._parse_disk_config(config, vm.type)
                vm.disks = disks

            except Exception as e:
                logger.debug(f"Failed to fetch disk config for {key}: {e}")

    def _parse_disk_config(self, config: dict, vm_type: str) -> list[DiskConfig]:
        """Parse disk configuration from VM/CT config"""
        disks = []

        if vm_type == "qemu":
            # QEMU disk patterns: scsi0, virtio0, ide0, sata0, etc.
            disk_patterns = ["scsi", "virtio", "ide", "sata", "efidisk", "tpmstate"]
            for key, value in config.items():
                for pattern in disk_patterns:
                    if key.startswith(pattern) and isinstance(value, str):
                        disk = self._parse_qemu_disk(key, value)
                        if disk:
                            disks.append(disk)
                        break
        else:
            # LXC disk patterns: rootfs, mp0, mp1, etc.
            for key, value in config.items():
                if (key == "rootfs" or key.startswith("mp")) and isinstance(value, str):
                    disk = self._parse_lxc_disk(key, value)
                    if disk:
                        disks.append(disk)

        # Sort by device name
        disks.sort(key=lambda d: d.device)
        return disks

    def _parse_qemu_disk(self, device: str, value: str) -> Optional[DiskConfig]:
        """Parse QEMU disk config string
        Format: storage:vm-vmid-disk-N,size=32G,format=raw,...
        or: storage:iso/filename.iso,media=cdrom,...
        """
        try:
            parts = value.split(",")
            if not parts:
                return None

            # First part is storage:volume
            storage_volume = parts[0]
            if ":" not in storage_volume:
                return None

            storage, volume = storage_volume.split(":", 1)

            # Skip CD-ROM/ISO
            for part in parts:
                if "media=cdrom" in part:
                    return None

            # Parse size
            size_bytes = 0
            disk_format = "raw"
            for part in parts:
                if part.startswith("size="):
                    size_str = part[5:]
                    size_bytes = self._parse_size(size_str)
                elif part.startswith("format="):
                    disk_format = part[7:]

            # Try to detect format from volume name if not specified
            if disk_format == "raw" and ".qcow2" in volume:
                disk_format = "qcow2"
            elif disk_format == "raw" and ".vmdk" in volume:
                disk_format = "vmdk"

            return DiskConfig(
                device=device,
                storage=storage,
                size=size_bytes,
                format=disk_format
            )
        except Exception as e:
            logger.debug(f"Failed to parse disk {device}: {e}")
            return None

    def _parse_lxc_disk(self, device: str, value: str) -> Optional[DiskConfig]:
        """Parse LXC disk config string
        Format: storage:subvol-vmid-disk-N,size=8G,...
        or: storage:vm-vmid-disk-N,size=8G,...
        """
        try:
            parts = value.split(",")
            if not parts:
                return None

            storage_volume = parts[0]
            if ":" not in storage_volume:
                return None

            storage, volume = storage_volume.split(":", 1)

            # Parse size
            size_bytes = 0
            for part in parts:
                if part.startswith("size="):
                    size_str = part[5:]
                    size_bytes = self._parse_size(size_str)

            # LXC typically uses subvol or raw
            disk_format = "subvol" if "subvol" in volume else "raw"

            return DiskConfig(
                device=device,
                storage=storage,
                size=size_bytes,
                format=disk_format
            )
        except Exception as e:
            logger.debug(f"Failed to parse LXC disk {device}: {e}")
            return None

    def _parse_size(self, size_str: str) -> int:
        """Parse size string (e.g., '32G', '500M', '1T') to bytes"""
        try:
            size_str = size_str.strip().upper()
            if size_str.endswith("T"):
                return int(float(size_str[:-1]) * 1024 * 1024 * 1024 * 1024)
            elif size_str.endswith("G"):
                return int(float(size_str[:-1]) * 1024 * 1024 * 1024)
            elif size_str.endswith("M"):
                return int(float(size_str[:-1]) * 1024 * 1024)
            elif size_str.endswith("K"):
                return int(float(size_str[:-1]) * 1024)
            else:
                return int(size_str)
        except:
            return 0

    async def _fetch_cluster_name(self):
        """Fetch the actual PVE cluster name from cluster status"""
        try:
            status = await self.client.get_cluster_status()
            has_cluster = False
            node_count = 0

            for item in status:
                if item.get("type") == "cluster":
                    self._pve_cluster_name = item.get("name", "")
                    has_cluster = True
                    logger.debug(f"PVE cluster name: {self._pve_cluster_name}")
                elif item.get("type") == "node":
                    node_count += 1

            # Standalone if: no cluster item, or only 1 node with no cluster name
            self._is_standalone = not has_cluster or (node_count == 1 and not self._pve_cluster_name)
            logger.debug(f"Cluster {self.id} is_standalone: {self._is_standalone}")

        except Exception as e:
            logger.debug(f"Failed to fetch cluster name: {e}")
            # If we can't get cluster status, assume standalone if only 1 node configured
            self._is_standalone = len(self.config.nodes) == 1

    async def _fetch_metrics(self):
        """Fetch current metrics for all resources"""
        try:
            resources = await self.client.get_cluster_resources()

            # Track which VMs are seen in this poll to clean up stale entries
            seen_vm_keys: set[str] = set()

            for resource in resources:
                res_type = resource.get("type")

                if res_type == "node":
                    await self._update_node_metrics(resource)
                elif res_type in ("qemu", "lxc"):
                    await self._update_vm_metrics(resource, res_type)
                    # Track seen VM keys
                    vmid = resource.get("vmid")
                    node = resource.get("node", "")
                    if vmid is not None and node:
                        seen_vm_keys.add(f"{node}/{vmid}")
                elif res_type == "storage":
                    await self._update_storage_metrics(resource)

            # Clean up stale VM entries (VMs that were in cache but not in current poll)
            # This handles cases where a VM was migrated and the old node entry is stale
            stale_keys = set(self.cache.vms.keys()) - seen_vm_keys
            for key in stale_keys:
                logger.debug(f"Removing stale VM entry: {key}")
                del self.cache.vms[key]
                # Also clean up network tracker
                if key in self.cache.vm_network_trackers:
                    del self.cache.vm_network_trackers[key]

            # Fetch running tasks
            await self._fetch_running_tasks()

            # Update summary
            self._update_summary()
            self.cache.last_update = time.time()

        except Exception as e:
            logger.error(f"Failed to fetch metrics for {self.id}: {e}")

    async def _fetch_running_tasks(self):
        """Fetch running tasks from cluster"""
        try:
            tasks = await self.client.get_cluster_tasks(running=True, limit=100)
            new_tasks: dict[str, VMTask] = {}

            # Debug: Log all running tasks
            if tasks:
                logger.info(f"[{self.id}] Running tasks count: {len(tasks)}")
                for t in tasks:
                    logger.info(f"  Task: type={t.get('type')}, id={t.get('id')}, node={t.get('node')}, status={t.get('status')}")

            # Helper to get target from task status (detailed endpoint)
            async def get_target_from_status(node: str, upid: str) -> str:
                try:
                    status = await self.client.get_task_status(node, upid)
                    logger.info(f"Task status for {upid}: {status}")
                    # Check for target field directly
                    if status.get("target"):
                        return status.get("target")
                    # Check for target in status string
                    status_str = status.get("status", "")
                    if isinstance(status_str, str) and " to " in status_str:
                        return status_str.split(" to ")[-1].strip("'\" ")
                except Exception as e:
                    logger.warning(f"Failed to get task status: {e}")
                return ""

            # Helper to get target from task log
            async def get_target_from_log(node: str, upid: str) -> str:
                try:
                    # Fetch more log lines to find target info
                    log_lines = await self.client.get_task_log(node, upid, start=0, limit=50)
                    logger.info(f"Task log for {upid} ({len(log_lines)} lines)")
                    for line in log_lines:
                        text = line.get("t", "")
                        if text:
                            logger.info(f"  Log: {text}")
                        # Look for various patterns:
                        # Pattern: "to node 'xxx'" or "target node 'xxx'"
                        match = re.search(r"(?:to|target)\s+node\s+['\"]?(\w[\w-]*)['\"]?", text, re.IGNORECASE)
                        if match:
                            return match.group(1)
                        # Pattern: "migrating VM xxx to xxx"
                        match = re.search(r"migrating\s+(?:VM|CT)\s+\d+\s+to\s+['\"]?(\w[\w-]*)['\"]?", text, re.IGNORECASE)
                        if match:
                            return match.group(1)
                        # Pattern: "target: xxx" or "target=xxx"
                        match = re.search(r"target[=:]\s*['\"]?(\w[\w-]+)['\"]?", text, re.IGNORECASE)
                        if match:
                            return match.group(1)
                        # Pattern: "-> xxx" or "=> xxx" (arrow to target)
                        match = re.search(r"[-=]>\s*['\"]?(\w[\w-]+)['\"]?", text)
                        if match:
                            return match.group(1)
                        # Pattern: Proxmox typical log format: "starting migration of VM 154 to node 'host-111'"
                        match = re.search(r"migration.*?to\s+(?:node\s+)?['\"]?(\w[\w-]+)['\"]?", text, re.IGNORECASE)
                        if match:
                            return match.group(1)
                        # Pattern: just a hostname pattern like host-xxx
                        match = re.search(r"\b(host-\d+|pve\d+|node\d+)\b", text, re.IGNORECASE)
                        if match and "source" not in text.lower():
                            # Make sure it's not the source node
                            return match.group(1)
                except Exception as e:
                    logger.warning(f"Failed to get task log: {e}")
                return ""

            # First pass: build a map of vmid -> nodes with qmstart tasks
            # This helps detect migration targets (qmstart runs on target during migration)
            qmstart_map: dict[int, str] = {}  # vmid -> target node (where qmstart is running)
            for task in tasks:
                task_type = task.get("type", "")
                if task_type in ("qmstart", "vzstart"):
                    try:
                        vmid_int = int(task.get("id", 0))
                        if vmid_int:
                            qmstart_map[vmid_int] = task.get("node", "")
                            logger.info(f"Found start task: vmid={vmid_int} on node={task.get('node', '')}")
                    except (ValueError, TypeError):
                        pass

            if qmstart_map:
                logger.info(f"qmstart_map built: {qmstart_map}")

            for task in tasks:
                upid = task.get("upid", "")
                if not upid:
                    continue

                # Parse task type to identify VM operations
                task_type = task.get("type", "")
                vmid = task.get("id", "")

                # Only track VM-related tasks
                if not task_type.startswith(("qm", "vz", "ha")):
                    continue

                # Handle vzdump tasks specially - need to get currently backing up VM from log
                if task_type == "vzdump":
                    task_node = task.get("node", "")
                    task_status = "running" if not task.get("endtime") else task.get("status", "stopped")

                    # Get task log to find which VM is currently being backed up
                    try:
                        log_lines = await self.client.get_task_log(task_node, upid, start=0, limit=500)
                        started_vms = []  # List of VMIDs that have started backup
                        finished_vms = set()  # Set of VMIDs that have finished backup

                        # Parse log to find started and finished backups
                        # Pattern: "Starting Backup of VM 100 (lxc)" or "Starting Backup of VM 100 (qemu)"
                        # Pattern: "Finished Backup of VM 100"
                        for line in log_lines:
                            text = line.get("t", "")
                            # Check for starting backup
                            match = re.search(r"Starting Backup of VM (\d+)", text)
                            if match:
                                vmid_str = match.group(1)
                                vmtype = "lxc" if "(lxc)" in text else "qemu"
                                started_vms.append((int(vmid_str), vmtype))
                            # Check for finished backup
                            match = re.search(r"Finished Backup of VM (\d+)", text)
                            if match:
                                finished_vms.add(int(match.group(1)))

                        # The currently backing up VM is the last started that hasn't finished
                        current_backup_vmid = None
                        current_vmtype = "qemu"
                        for vmid, vmtype in reversed(started_vms):
                            if vmid not in finished_vms:
                                current_backup_vmid = vmid
                                current_vmtype = vmtype
                                break

                        if current_backup_vmid:
                            vm_task = VMTask(
                                upid=upid,
                                node=task_node,
                                vmid=current_backup_vmid,
                                vmtype=current_vmtype,
                                task_type=task_type,
                                status=task_status,
                                user=task.get("user", ""),
                                starttime=task.get("starttime", 0),
                                endtime=task.get("endtime", 0),
                                exitstatus=task.get("exitstatus", ""),
                                target_node="",
                            )
                            new_tasks[upid] = vm_task
                            logger.info(f"Backup task detected: vmid={current_backup_vmid} ({current_vmtype}), node={task_node}")
                        else:
                            logger.info(f"vzdump task found but no current backup VM detected (started={len(started_vms)}, finished={len(finished_vms)})")
                    except Exception as e:
                        logger.warning(f"Failed to get vzdump task log: {e}")
                    continue  # Skip normal processing for vzdump

                # Extract vmid from task id field (format varies)
                try:
                    vmid_int = int(vmid) if vmid else 0
                except (ValueError, TypeError):
                    vmid_int = 0

                # Determine vmtype from task type
                vmtype = "lxc" if task_type.startswith("vz") else "qemu"

                # Status: if no endtime, it's running; otherwise it's the actual status
                task_status = "running" if not task.get("endtime") else task.get("status", "stopped")

                # Log all VM tasks for debugging
                logger.info(f"VM task detected: vmid={vmid}, type={task_type}, node={task.get('node', '')}")
                logger.debug(f"  Full task data: {task}")

                # Parse target node for migration tasks
                target_node = ""
                if "migrate" in task_type:
                    status_text = task.get("status", "")

                    # Debug log for migration task - show ALL task fields
                    logger.info(f"  Migration task: status={status_text}, upid={upid}")

                    # Try multiple patterns to extract target node:
                    # Pattern 1: "to node 'nodename'" or "to node nodename"
                    match = re.search(r"to node ['\"]?(\w+)['\"]?", status_text, re.IGNORECASE)
                    if match:
                        target_node = match.group(1)
                        logger.info(f"  -> Pattern 1 matched: target_node={target_node}")
                    # Pattern 2: "to 'nodename'" or "to nodename" at end of status
                    elif " to " in status_text:
                        target_part = status_text.split(" to ")[-1].strip()
                        # Clean up quotes and punctuation
                        target_node = target_part.strip("'\".,;!").split()[0] if target_part else ""
                        if target_node:
                            logger.info(f"  -> Pattern 2 matched: target_node={target_node}")
                    # Pattern 3: Check id field for "vmid@target" format
                    elif "@" in str(vmid):
                        parts = str(vmid).split("@")
                        if len(parts) == 2:
                            target_node = parts[1]
                            logger.info(f"  -> Pattern 3 matched: target_node={target_node}")
                    # Pattern 4: Try UPID parsing - target might be in the id portion
                    if not target_node and upid:
                        # UPID format: UPID:node:pid:pstart:starttime:type:id:user@realm:
                        upid_parts = upid.split(":")
                        if len(upid_parts) >= 7:
                            upid_id = upid_parts[6]  # The id field
                            if "@" in upid_id:
                                target_node = upid_id.split("@")[-1]
                                logger.info(f"  -> Pattern 4 matched: target_node={target_node}")

                    # Pattern 5: Check for qmstart task on different node (migration target)
                    if not target_node:
                        source_node = task.get("node", "")
                        logger.info(f"  Checking Pattern 5: vmid_int={vmid_int}, source_node={source_node}, qmstart_map={qmstart_map}")
                        if vmid_int in qmstart_map:
                            start_node = qmstart_map[vmid_int]
                            logger.info(f"  Found in qmstart_map: start_node={start_node}")
                            if start_node and start_node != source_node:
                                target_node = start_node
                                logger.info(f"  -> Pattern 5 (qmstart on different node) matched: target_node={target_node}")
                            else:
                                logger.info(f"  -> Pattern 5 skipped: start_node={start_node} same as source or empty")

                    # Pattern 6: Try to get from task status endpoint (detailed info)
                    if not target_node:
                        task_node = task.get("node", "")
                        if task_node and upid:
                            target_node = await get_target_from_status(task_node, upid)
                            if target_node:
                                logger.info(f"  -> Pattern 6 (status) matched: target_node={target_node}")

                    # Pattern 7: If still no target, try to get from task log
                    if not target_node:
                        task_node = task.get("node", "")
                        if task_node and upid:
                            target_node = await get_target_from_log(task_node, upid)
                            if target_node:
                                logger.info(f"  -> Pattern 7 (log) matched: target_node={target_node}")

                    if not target_node:
                        logger.warning(f"  -> No target_node detected for migration task vmid={vmid}")

                vm_task = VMTask(
                    upid=upid,
                    node=task.get("node", ""),
                    vmid=vmid_int,
                    vmtype=vmtype,
                    task_type=task_type,
                    status=task_status,
                    user=task.get("user", ""),
                    starttime=task.get("starttime", 0),
                    endtime=task.get("endtime", 0),
                    exitstatus=task.get("exitstatus", ""),
                    target_node=target_node,
                )
                new_tasks[upid] = vm_task

            self.cache.tasks = new_tasks

        except Exception as e:
            logger.debug(f"Failed to fetch tasks for {self.id}: {e}")

    async def _process_node_resource(self, resource: dict):
        """Process node resource data"""
        node_name = resource.get("node", "")
        if not node_name:
            return

        if node_name not in self.cache.nodes:
            self.cache.nodes[node_name] = NodeMetrics(
                node=node_name,
                cluster_id=self.id,
            )

        # Set status during initial processing
        node = self.cache.nodes[node_name]
        node.status = NodeStatus.ONLINE if resource.get("status") == "online" else NodeStatus.OFFLINE

    async def _update_node_metrics(self, resource: dict):
        """Update node metrics from resource data"""
        node_name = resource.get("node", "")
        if not node_name:
            return

        if node_name not in self.cache.nodes:
            self.cache.nodes[node_name] = NodeMetrics(
                node=node_name,
                cluster_id=self.id,
            )

        node = self.cache.nodes[node_name]
        node.status = NodeStatus.ONLINE if resource.get("status") == "online" else NodeStatus.OFFLINE
        node.uptime = resource.get("uptime", 0)

        # CPU
        node.cpu.usage_percent = resource.get("cpu", 0) * 100
        node.cpu.cores = resource.get("maxcpu", 0)

        # Memory
        node.memory.used_bytes = resource.get("mem", 0)
        node.memory.total_bytes = resource.get("maxmem", 0)
        node.memory.free_bytes = node.memory.total_bytes - node.memory.used_bytes

        # Disk (root filesystem)
        node.disk.used_bytes = resource.get("disk", 0)
        node.disk.total_bytes = resource.get("maxdisk", 0)
        node.disk.free_bytes = node.disk.total_bytes - node.disk.used_bytes

        node.timestamp = time.time()

        # Fetch detailed node status for kernel/pve version and network
        if node.status == NodeStatus.ONLINE:
            try:
                node_status = await self.client.get_node_status(node_name)
                if node_status:
                    # Kernel and PVE version from /nodes/{node}/status
                    node.kernel_version = node_status.get("kversion", "")
                    node.pve_version = node_status.get("pveversion", "")

                    # CPU iowait
                    node.cpu.iowait = node_status.get("wait", 0) * 100
            except Exception as e:
                logger.debug(f"Failed to get node status for {node_name}: {e}")

            # Get network data from rrddata endpoint
            # RRD data updates approximately every 60 seconds
            try:
                rrd_data = await self.client.get_node_rrddata(node_name, "hour", "AVERAGE")
                if rrd_data and len(rrd_data) > 0:
                    # Get the most recent data point
                    last = rrd_data[-1]
                    netin = last.get("netin") or 0
                    netout = last.get("netout") or 0

                    # If last point has no data, try previous point
                    if netin == 0 and netout == 0 and len(rrd_data) > 1:
                        prev = rrd_data[-2]
                        netin = prev.get("netin") or 0
                        netout = prev.get("netout") or 0

                    node.network.rx_bytes_sec = float(netin)
                    node.network.tx_bytes_sec = float(netout)
            except Exception as e:
                logger.warning(f"Failed to get rrddata for {node_name}: {e}")

    async def _process_vm_resource(self, resource: dict, vm_type: str):
        """Process VM/CT resource data"""
        vmid = resource.get("vmid")
        node = resource.get("node", "")
        if vmid is None or not node:
            return

        key = f"{node}/{vmid}"
        if key not in self.cache.vms:
            self.cache.vms[key] = VMMetrics(
                vmid=vmid,
                name=resource.get("name", f"VM {vmid}"),
                node=node,
                cluster_id=self.id,
                type=vm_type,
            )

    async def _update_vm_metrics(self, resource: dict, vm_type: str):
        """Update VM/CT metrics"""
        vmid = resource.get("vmid")
        node = resource.get("node", "")
        if vmid is None or not node:
            return

        key = f"{node}/{vmid}"
        if key not in self.cache.vms:
            self.cache.vms[key] = VMMetrics(
                vmid=vmid,
                name=resource.get("name", f"VM {vmid}"),
                node=node,
                cluster_id=self.id,
                type=vm_type,
            )

        vm = self.cache.vms[key]
        vm.name = resource.get("name", vm.name)
        vm.template = resource.get("template", 0) == 1
        vm.tags = resource.get("tags", "").split(";") if resource.get("tags") else []

        # Status
        status_str = resource.get("status", "unknown")
        vm.status = VMStatus(status_str) if status_str in VMStatus.__members__.values() else VMStatus.UNKNOWN

        # CPU
        vm.cpu.usage_percent = resource.get("cpu", 0) * 100
        vm.cpu.cores = resource.get("maxcpu", 0)

        # Memory
        vm.memory.used_bytes = resource.get("mem", 0)
        vm.memory.total_bytes = resource.get("maxmem", 0)
        vm.memory.free_bytes = vm.memory.total_bytes - vm.memory.used_bytes

        # Disk
        vm.disk.used_bytes = resource.get("disk", 0)
        vm.disk.total_bytes = resource.get("maxdisk", 0)

        # Network - calculate rate from cumulative netin/netout values
        current_rx = resource.get("netin") or 0
        current_tx = resource.get("netout") or 0
        current_time = time.time()

        vm_is_running = vm.status == VMStatus.RUNNING

        # Get or create tracker for this VM
        if key not in self.cache.vm_network_trackers:
            self.cache.vm_network_trackers[key] = NetworkRateTracker(
                prev_rx=current_rx,
                prev_tx=current_tx,
                prev_time=current_time
            )
            # First sample - don't set rates (keep at 0 or previous value)
        else:
            tracker = self.cache.vm_network_trackers[key]
            time_delta = current_time - tracker.prev_time

            # Only calculate if we have valid data and enough time has passed
            if time_delta > 0.5 and (current_rx > 0 or current_tx > 0 or not vm_is_running):
                # Calculate rates (bytes per second)
                rx_delta = current_rx - tracker.prev_rx
                tx_delta = current_tx - tracker.prev_tx

                # Handle counter reset (VM restart or overflow)
                if rx_delta < 0:
                    rx_delta = current_rx
                if tx_delta < 0:
                    tx_delta = current_tx

                new_rx_rate = rx_delta / time_delta
                new_tx_rate = tx_delta / time_delta

                # For running VMs, only update if new rate > 0 or VM is stopped
                # This prevents flickering to 0 when API intermittently returns no data
                if not vm_is_running or new_rx_rate > 0 or new_tx_rate > 0:
                    vm.network.rx_bytes_sec = new_rx_rate
                    vm.network.tx_bytes_sec = new_tx_rate

                # Update tracker
                tracker.prev_rx = current_rx
                tracker.prev_tx = current_tx
                tracker.prev_time = current_time

        vm.uptime = resource.get("uptime", 0)
        vm.timestamp = time.time()

    async def _process_storage_resource(self, resource: dict, storage_configs: dict[str, list[str]]):
        """Process storage resource"""
        storage_name = resource.get("storage", "")
        node = resource.get("node", "")
        if not storage_name:
            return

        key = f"{node}/{storage_name}" if node else storage_name
        if key not in self.cache.storages:
            self.cache.storages[key] = StorageMetrics(
                storage=storage_name,
                node=node,
                cluster_id=self.id,
            )

        # Set allowed_nodes from storage config
        allowed_nodes = storage_configs.get(storage_name, [])
        self.cache.storages[key].allowed_nodes = allowed_nodes

    async def _update_storage_metrics(self, resource: dict):
        """Update storage metrics"""
        storage_name = resource.get("storage", "")
        node = resource.get("node", "")
        if not storage_name:
            return

        key = f"{node}/{storage_name}" if node else storage_name
        if key not in self.cache.storages:
            self.cache.storages[key] = StorageMetrics(
                storage=storage_name,
                node=node,
                cluster_id=self.id,
            )

        storage = self.cache.storages[key]
        storage.type = resource.get("plugintype", "")
        storage.content = resource.get("content", "").split(",")
        storage.shared = resource.get("shared", 0) == 1
        storage.enabled = resource.get("status") == "available"

        storage.disk.used_bytes = resource.get("disk", 0)
        storage.disk.total_bytes = resource.get("maxdisk", 0)
        storage.disk.free_bytes = storage.disk.total_bytes - storage.disk.used_bytes

        storage.timestamp = time.time()

    def _update_node_vm_counts(self):
        """Update VM and CT counts for each node"""
        # Reset counts
        for node in self.cache.nodes.values():
            node.vm_count = 0
            node.ct_count = 0

        # Count VMs/CTs per node
        for vm in self.cache.vms.values():
            if vm.template:
                continue  # Skip templates
            node_name = vm.node
            if node_name in self.cache.nodes:
                if vm.type == "qemu":
                    self.cache.nodes[node_name].vm_count += 1
                elif vm.type == "lxc":
                    self.cache.nodes[node_name].ct_count += 1

    async def _fetch_ceph_io(self):
        """Fetch only Ceph I/O stats for real-time updates"""
        if not self.cache.nodes or not self.cache.ceph:
            return

        # Try to get Ceph status from first online node
        for node_name, node_metrics in self.cache.nodes.items():
            if node_metrics.status != NodeStatus.ONLINE:
                continue

            try:
                ceph_status = await self.client.get_ceph_status(node_name)
                if not ceph_status:
                    continue

                # Only update I/O metrics
                pg_map = ceph_status.get("pgmap", {})
                self.cache.ceph.read_bytes_sec = pg_map.get("read_bytes_sec", 0)
                self.cache.ceph.write_bytes_sec = pg_map.get("write_bytes_sec", 0)
                self.cache.ceph.read_ops_sec = pg_map.get("read_op_per_sec", 0)
                self.cache.ceph.write_ops_sec = pg_map.get("write_op_per_sec", 0)

                # Also update storage usage
                self.cache.ceph.used_bytes = pg_map.get("bytes_used", self.cache.ceph.used_bytes)
                self.cache.ceph.total_bytes = pg_map.get("bytes_total", self.cache.ceph.total_bytes)
                self.cache.ceph.available_bytes = pg_map.get("bytes_avail", self.cache.ceph.available_bytes)

                break  # Got data successfully

            except Exception as e:
                logger.debug(f"Failed to fetch Ceph I/O from {node_name}: {e}")
                continue

    async def _fetch_ceph_data(self):
        """Fetch Ceph cluster data"""
        logger.info(f"Fetching Ceph data, nodes: {list(self.cache.nodes.keys())}")
        if not self.cache.nodes:
            logger.info("No nodes in cache, skipping Ceph fetch")
            return

        # Try to get Ceph status from first online node
        for node_name, node_metrics in self.cache.nodes.items():
            if node_metrics.status != NodeStatus.ONLINE:
                continue

            try:
                logger.info(f"Fetching Ceph status from node {node_name}")
                ceph_status = await self.client.get_ceph_status(node_name)
                logger.info(f"Ceph status response: {bool(ceph_status)}, keys: {list(ceph_status.keys()) if ceph_status else []}")
                if not ceph_status:
                    continue

                # Parse Ceph status - handle different API response formats
                health = ceph_status.get("health", {})
                pg_map = ceph_status.get("pgmap", {})

                # OSD map can be nested differently in different PVE versions
                osd_map = ceph_status.get("osdmap", {})
                if "osdmap" in osd_map:
                    osd_map = osd_map.get("osdmap", {})

                # Mon map for monitors
                mon_map = ceph_status.get("monmap", {})
                mon_list_raw = mon_map.get("mons", [])
                mon_count = len(mon_list_raw)

                # Parse individual MON info
                quorum = ceph_status.get("quorum", [])
                quorum_names = ceph_status.get("quorum_names", [])
                mons_list = []
                for mon in mon_list_raw:
                    mon_name = mon.get("name", "")
                    # Determine state - leader is first in quorum
                    if mon_name in quorum_names:
                        state = "leader" if quorum_names.index(mon_name) == 0 else "peon"
                    else:
                        state = "out"
                    mons_list.append(CephMon(
                        name=mon_name,
                        host=mon.get("host", mon_name),
                        addr=mon.get("addr", mon.get("public_addr", "")),
                        state=state,
                    ))

                # If monmap is not in status, try to get from quorum
                if mon_count == 0:
                    mon_count = len(quorum) if quorum else 0

                # MGR map for managers
                mgr_map = ceph_status.get("mgrmap", {})
                active_name = mgr_map.get("active_name", "")
                mgr_count = 1 if active_name else 0

                # Parse individual MGR info
                mgrs_list = []
                if active_name:
                    mgrs_list.append(CephMgr(
                        name=active_name,
                        host=mgr_map.get("active_addr", "").split(":")[0] if mgr_map.get("active_addr") else "",
                        active=True,
                    ))
                # Add standbys
                standbys = mgr_map.get("standbys", [])
                for standby in standbys:
                    mgrs_list.append(CephMgr(
                        name=standby.get("name", ""),
                        host=standby.get("addr", "").split(":")[0] if standby.get("addr") else "",
                        active=False,
                    ))
                mgr_count += len(standbys)

                self.cache.ceph = CephMetrics(
                    cluster_id=self.id,
                    health=health.get("status", "HEALTH_UNKNOWN"),
                    mons=mons_list,
                    mgrs=mgrs_list,
                    mon_count=mon_count,
                    mgr_count=mgr_count,
                    osd_count=osd_map.get("num_osds", 0),
                    osd_up=osd_map.get("num_up_osds", 0),
                    osd_in=osd_map.get("num_in_osds", 0),
                    total_bytes=pg_map.get("bytes_total", 0),
                    used_bytes=pg_map.get("bytes_used", 0),
                    available_bytes=pg_map.get("bytes_avail", 0),
                    read_bytes_sec=pg_map.get("read_bytes_sec", 0),
                    write_bytes_sec=pg_map.get("write_bytes_sec", 0),
                    read_ops_sec=pg_map.get("read_op_per_sec", 0),
                    write_ops_sec=pg_map.get("write_op_per_sec", 0),
                )

                # Fetch MON details if mons list is empty
                if not self.cache.ceph.mons:
                    mons = await self.client.get_ceph_mon(node_name)
                    if mons:
                        self.cache.ceph.mon_count = len(mons)
                        self.cache.ceph.mons = [
                            CephMon(
                                name=mon.get("name", ""),
                                host=mon.get("host", mon.get("name", "")),
                                addr=mon.get("addr", ""),
                                state="leader" if mon.get("quorum", False) else "peon",
                            )
                            for mon in mons
                        ]

                # Fetch MGR details if mgrs list is empty
                if not self.cache.ceph.mgrs:
                    mgrs = await self.client.get_ceph_mgr(node_name)
                    if mgrs:
                        self.cache.ceph.mgr_count = len(mgrs)
                        self.cache.ceph.mgrs = [
                            CephMgr(
                                name=mgr.get("name", ""),
                                host=mgr.get("host", mgr.get("name", "")),
                                active=mgr.get("state", "") == "active",
                            )
                            for mgr in mgrs
                        ]

                # Fetch MDS details
                if not self.cache.ceph.mds:
                    mds_list = await self.client.get_ceph_mds(node_name)
                    if mds_list:
                        self.cache.ceph.mds_count = len(mds_list)
                        self.cache.ceph.mds = [
                            CephMds(
                                name=mds.get("name", ""),
                                host=mds.get("host", mds.get("name", "")),
                                state=mds.get("state", "standby"),
                                rank=mds.get("rank", -1),
                            )
                            for mds in mds_list
                        ]

                # Fetch OSD details - API returns a tree structure
                osd_data = await self.client.get_ceph_osd(node_name)
                if osd_data:
                    # Parse OSD from CRUSH tree
                    osd_list = self._extract_osds_from_tree(osd_data)
                    if osd_list:
                        self.cache.ceph.osds = osd_list
                        # Update counts from actual OSD list if API data is missing
                        if self.cache.ceph.osd_count == 0:
                            self.cache.ceph.osd_count = len(osd_list)
                            self.cache.ceph.osd_up = sum(1 for o in osd_list if o.status == "up")
                            self.cache.ceph.osd_in = sum(1 for o in osd_list if o.in_cluster)

                # Fetch pool details
                pools = await self.client.get_ceph_pools(node_name)
                if pools:
                    self.cache.ceph.pools = [
                        CephPool(
                            name=pool.get("pool_name", pool.get("name", "")),
                            size=pool.get("size", 3),
                            pg_num=pool.get("pg_num", 0),
                            used_bytes=pool.get("bytes_used", 0),
                            total_bytes=0,  # Not provided directly
                        )
                        for pool in pools
                    ]

                logger.debug(f"Ceph data fetched for cluster {self.id}: {self.cache.ceph.mon_count} MONs, {self.cache.ceph.osd_count} OSDs")
                break

            except Exception as e:
                logger.debug(f"Ceph not available on {node_name}: {e}")

    def _extract_osds_from_tree(self, osd_data: dict) -> list[CephOSD]:
        """Extract OSD list from CRUSH tree structure"""
        osds = []

        def traverse(node):
            if isinstance(node, dict):
                # Check if this is an OSD node
                if node.get("type") == "osd" and node.get("leaf") == 1:
                    osds.append(CephOSD(
                        id=node.get("id", 0),
                        name=node.get("name", f"osd.{node.get('id', 0)}"),
                        status=node.get("status", "unknown"),
                        in_cluster=node.get("in", 0) == 1,
                        used_bytes=node.get("bytes_used", 0),
                        total_bytes=node.get("total_space", 0),
                        host=node.get("host", ""),
                        apply_latency_ms=node.get("apply_latency_ms", 0),
                        commit_latency_ms=node.get("commit_latency_ms", 0),
                    ))
                # Traverse children
                for child in node.get("children", []):
                    traverse(child)

        # Start from root
        root = osd_data.get("root", osd_data)
        traverse(root)

        return osds

    def _update_summary(self):
        """Update cluster summary"""
        nodes_online = sum(1 for n in self.cache.nodes.values() if n.status == NodeStatus.ONLINE)
        vms_running = sum(1 for v in self.cache.vms.values() if v.status == VMStatus.RUNNING and v.type == "qemu")
        cts_running = sum(1 for v in self.cache.vms.values() if v.status == VMStatus.RUNNING and v.type == "lxc")

        total_cpu = 0.0
        total_mem = 0.0
        total_storage = 0.0
        count = 0

        for node in self.cache.nodes.values():
            if node.status == NodeStatus.ONLINE:
                total_cpu += node.cpu.usage_percent
                total_mem += node.memory.usage_percent
                count += 1

        for storage in self.cache.storages.values():
            if storage.disk.total_bytes > 0:
                total_storage += storage.disk.usage_percent

        self.cache.summary = ClusterSummary(
            id=self.id,
            name=self.name,
            status="connected",
            node_count=len(self.cache.nodes),
            nodes_online=nodes_online,
            vm_count=sum(1 for v in self.cache.vms.values() if v.type == "qemu" and not v.template),
            vms_running=vms_running,
            ct_count=sum(1 for v in self.cache.vms.values() if v.type == "lxc"),
            cts_running=cts_running,
            total_cpu_usage=total_cpu / count if count > 0 else 0,
            total_memory_usage=total_mem / count if count > 0 else 0,
            total_storage_usage=total_storage / len(self.cache.storages) if self.cache.storages else 0,
            has_ceph=self.cache.ceph is not None,
            ceph_health=self.cache.ceph.health if self.cache.ceph else "",
            is_standalone=self._is_standalone,
        )

    def get_data(self) -> dict:
        """Get all cached data as dict"""
        return {
            "id": self.id,
            "name": self.name,
            "summary": asdict(self.cache.summary) if self.cache.summary else None,
            "nodes": {k: asdict(v) for k, v in self.cache.nodes.items()},
            "vms": {k: asdict(v) for k, v in self.cache.vms.items()},
            "storages": {k: asdict(v) for k, v in self.cache.storages.items()},
            "ceph": asdict(self.cache.ceph) if self.cache.ceph else None,
            "tasks": {k: asdict(v) for k, v in self.cache.tasks.items()},
            "last_update": self.cache.last_update,
            "client_health": self.client.get_health_status(),
        }


class ClusterManager:
    """
    Manages multiple PVE clusters
    """

    def __init__(self):
        self.clusters: dict[str, Cluster] = {}
        self._callbacks: list[Callable[[dict], Awaitable[None]]] = []

    def add_callback(self, callback: Callable[[dict], Awaitable[None]]):
        """Add callback for any cluster update"""
        self._callbacks.append(callback)

    async def _on_cluster_update(self, cluster_id: str, cache: ClusterCache):
        """Handle cluster data update"""
        data = self.get_all_data()
        for callback in self._callbacks:
            try:
                await callback(data)
            except Exception as e:
                logger.error(f"Manager callback error: {e}")

    async def load_clusters(self):
        """Load clusters from configuration"""
        config = get_config()

        for cluster_config in config.clusters:
            if not cluster_config.enabled:
                continue

            cluster = Cluster(cluster_config)
            cluster.add_callback(self._on_cluster_update)
            self.clusters[cluster.id] = cluster

        logger.info(f"Loaded {len(self.clusters)} clusters")

    async def start_all(self):
        """Start polling all clusters"""
        tasks = [cluster.start() for cluster in self.clusters.values()]
        await asyncio.gather(*tasks, return_exceptions=True)
        logger.info("All clusters started")

    async def stop_all(self):
        """Stop all clusters"""
        tasks = [cluster.stop() for cluster in self.clusters.values()]
        await asyncio.gather(*tasks, return_exceptions=True)
        logger.info("All clusters stopped")

    def get_cluster(self, cluster_id: str) -> Optional[Cluster]:
        """Get cluster by ID"""
        return self.clusters.get(cluster_id)

    def get_all_data(self) -> dict:
        """Get data from all clusters"""
        return {
            "clusters": {
                cluster_id: cluster.get_data()
                for cluster_id, cluster in self.clusters.items()
            },
            "timestamp": time.time(),
        }

    async def sync_clusters(self):
        """Sync running clusters with current configuration (start/stop as needed)"""
        config = get_config()

        # Get sets of cluster IDs
        config_enabled_ids = {c.id for c in config.clusters if c.enabled}
        running_ids = set(self.clusters.keys())

        # Stop clusters that are now disabled
        to_stop = running_ids - config_enabled_ids
        for cluster_id in to_stop:
            cluster = self.clusters.pop(cluster_id, None)
            if cluster:
                await cluster.stop()
                logger.info(f"Stopped disabled cluster: {cluster_id}")

        # Start clusters that are now enabled but not running
        to_start = config_enabled_ids - running_ids
        for cluster_config in config.clusters:
            if cluster_config.id in to_start:
                cluster = Cluster(cluster_config)
                cluster.add_callback(self._on_cluster_update)
                self.clusters[cluster.id] = cluster
                await cluster.start()
                logger.info(f"Started enabled cluster: {cluster_config.id}")

        # Notify callbacks of the change
        if to_stop or to_start:
            data = self.get_all_data()
            for callback in self._callbacks:
                try:
                    await callback(data)
                except Exception as e:
                    logger.error(f"Sync callback error: {e}")

    async def reload_all_clusters(self):
        """Stop all clusters and reload from fresh config (use after config changes)"""
        logger.info("Reloading all clusters from config...")

        # Stop all running clusters
        for cluster_id, cluster in list(self.clusters.items()):
            await cluster.stop()
            logger.info(f"Stopped cluster for reload: {cluster_id}")
        self.clusters.clear()

        # Reload config from file
        from .config import load_config
        load_config()

        # Load and start clusters from fresh config
        await self.load_clusters()
        await self.start_all()

        # Notify callbacks
        data = self.get_all_data()
        for callback in self._callbacks:
            try:
                await callback(data)
            except Exception as e:
                logger.error(f"Reload callback error: {e}")

        logger.info("All clusters reloaded")

    def get_global_summary(self) -> dict:
        """Get global summary across all clusters"""
        total_nodes = 0
        total_nodes_online = 0
        total_vms = 0
        total_vms_running = 0
        total_cts = 0
        total_cts_running = 0

        cluster_summaries = []

        for cluster in self.clusters.values():
            if cluster.cache.summary:
                s = cluster.cache.summary
                total_nodes += s.node_count
                total_nodes_online += s.nodes_online
                total_vms += s.vm_count
                total_vms_running += s.vms_running
                total_cts += s.ct_count
                total_cts_running += s.cts_running
                cluster_summaries.append(asdict(s))

        return {
            "total_clusters": len(self.clusters),
            "total_nodes": total_nodes,
            "total_nodes_online": total_nodes_online,
            "total_vms": total_vms,
            "total_vms_running": total_vms_running,
            "total_cts": total_cts,
            "total_cts_running": total_cts_running,
            "clusters": cluster_summaries,
        }


# Global instance
cluster_manager = ClusterManager()
