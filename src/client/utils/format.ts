/**
 * JT-PROXENSE Formatting Utilities
 */

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}


/**
 * Physical media size, base-10 — the way the manufacturer labels the drive.
 *
 * A "256 GB" SSD holds 256,060,514,304 bytes, which is 238.5 GiB. Dividing by
 * 1024 and printing "238.5 GB" is doubly wrong: the unit label is a lie AND the
 * number matches nothing the operator can see on the drive, in the model name
 * (CD256, CD1920A) or in the vendor's datasheet. Use this for hardware.
 */
export function formatDiskSize(bytes: number, decimals = 2): string {
  if (!bytes) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.min(units.length - 1,
                     Math.max(0, Math.floor(Math.log10(bytes) / 3)));
  const v = bytes / Math.pow(1000, i);
  // 1.92 TB, 256 GB — trim to whole numbers once we are past three digits.
  const d = v >= 100 ? 0 : decimals;
  return `${parseFloat(v.toFixed(d))} ${units[i]}`;
}

/**
 * Base-2 size with HONEST units (GiB / TiB).
 *
 * Filesystem-reported figures (zpool list, zfs list) are base-2, so pool
 * capacity is shown this way to stay cross-checkable against the CLI — but it
 * must be labelled GiB/TiB, not GB/TB.
 */
export function formatBytesIEC(bytes: number, decimals = 1): string {
  if (!bytes) return '0 B';
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  const i = Math.min(units.length - 1,
                     Math.max(0, Math.floor(Math.log2(bytes) / 10)));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(decimals))} ${units[i]}`;
}

/**
 * Format bytes per second
 */
export function formatBytesPerSec(bytesPerSec: number): string {
  return `${formatBytes(bytesPerSec)}/s`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format uptime to human readable string
 */
export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.length > 0 ? parts.join(' ') : '< 1m';
}

/**
 * Format timestamp to relative time
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 5) return 'now';
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Get health color class
 */
export function getHealthColor(value: number, warning = 80, critical = 95): string {
  if (value >= critical) return 'danger';
  if (value >= warning) return 'warning';
  return 'success';
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'running':
    case 'online':
    case 'healthy':
    case 'health_ok':
      return 'success';
    case 'warning':
    case 'health_warn':
      return 'warning';
    case 'stopped':
    case 'offline':
    case 'critical':
    case 'health_err':
      return 'danger';
    default:
      return 'muted';
  }
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate percentage
 */
export function calcPercent(used: number, total: number): number {
  if (total === 0) return 0;
  return (used / total) * 100;
}
