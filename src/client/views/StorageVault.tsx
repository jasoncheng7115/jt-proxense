/**
 * JT-PROXENSE Storage Vault View
 * Liquid Energy Tank visualization for storage across clusters
 */

import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as d3 from 'd3';
import { useTranslation } from '../i18n';
import type { ClusterData, StorageMetrics, VMMetrics, DiskConfig } from '../types';
import { formatBytes, formatPercent, getHealthColor } from '../utils/format';
import { LiquidTank } from '../components/LiquidTank';
import { RRDChartModal } from '../components/RRDChartModal';

// Animated number counter component
function AnimatedNumber({ value, duration = 800, formatFn }: { value: number; duration?: number; formatFn?: (v: number) => string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutExpo for rapid start then slow down
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = startValueRef.current + (value - startValueRef.current) * easeOutExpo;
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [value, duration]);

  return <>{formatFn ? formatFn(displayValue) : displayValue.toFixed(0)}</>;
}

// Animated progress bar component
function AnimatedBar({ percent, className, duration = 1000 }: { percent: number; className: string; duration?: number }) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    startValueRef.current = displayPercent;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutCubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const current = startValueRef.current + (percent - startValueRef.current) * easeOutCubic;
      setDisplayPercent(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [percent, duration]);

  return <div className={className} style={{ width: `${displayPercent}%` }} />;
}

// Sci-Fi Horizontal Indicator Component
function SciFiIndicator({
  percent,
  usedBytes,
  totalBytes,
  duration = 1200
}: {
  percent: number;
  usedBytes: number;
  totalBytes: number;
  duration?: number;
}) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    startValueRef.current = displayPercent;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = startValueRef.current + (percent - startValueRef.current) * easeOutExpo;
      setDisplayPercent(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [percent, duration]);

  // Color based on usage
  const getColor = () => {
    if (displayPercent >= 90) return '#ff0040';
    if (displayPercent >= 70) return '#ff6b00';
    return '#00f0ff';
  };
  const indicatorColor = getColor();

  // Generate segments (20 segments)
  const segmentCount = 40;
  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    const segmentPercent = (i / segmentCount) * 100;
    const isActive = segmentPercent < displayPercent;
    const isMajor = i % 4 === 0;
    segments.push({ index: i, isActive, isMajor, percent: segmentPercent });
  }

  return (
    <div className="scifi-indicator">
      {/* Left section: Label and bytes */}
      <div className="indicator-left">
        <div className="indicator-bytes">
          <span className="used" style={{ color: indicatorColor }}>{formatBytes(usedBytes)}</span>
          <span className="separator">/</span>
          <span className="total">{formatBytes(totalBytes)}</span>
        </div>
      </div>

      {/* Center: The indicator bar */}
      <div className="indicator-bar-container">
        {/* Main bar */}
        <div className="indicator-bar">
          {/* Background segments */}
          <div className="segments-container">
            {segments.map((seg) => (
              <div
                key={seg.index}
                className={`segment ${seg.isActive ? 'active' : ''} ${seg.isMajor ? 'major' : ''}`}
                style={{
                  '--segment-color': seg.isActive ? indicatorColor : 'rgba(60, 80, 100, 0.3)',
                  animationDelay: seg.isActive ? `${seg.index * 20}ms` : '0ms',
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Glow overlay */}
          <div
            className="indicator-glow"
            style={{
              width: `${displayPercent}%`,
              background: `linear-gradient(90deg, transparent, ${indicatorColor}40)`,
              boxShadow: `0 0 20px ${indicatorColor}60, 0 0 40px ${indicatorColor}30`,
            }}
          />

          {/* Pointer/Needle */}
          <div
            className="indicator-pointer"
            style={{
              left: `${displayPercent}%`,
              borderColor: `transparent transparent ${indicatorColor} transparent`,
              filter: `drop-shadow(0 0 4px ${indicatorColor})`,
            }}
          />

          {/* Scan line effect */}
          <div className="indicator-scanline" />
        </div>

        {/* Bottom accent line */}
        <div className="indicator-accent" style={{ background: indicatorColor }} />
      </div>

      {/* Right section: Percentage */}
      <div className="indicator-right">
        <div className="indicator-percent" style={{ color: indicatorColor }}>
          {displayPercent.toFixed(1)}
          <span className="percent-symbol">%</span>
        </div>
      </div>
    </div>
  );
}

// Shared storage types
const SHARED_TYPES = ['rbd', 'cephfs', 'nfs', 'iscsi', 'glusterfs', 'zfs-over-iscsi', 'pbs'];

// Categorized storage interface
interface CategorizedStorage {
  name: string;
  type: string;
  content: string[];
  isShared: boolean;
  // For shared storage - single instance
  totalBytes: number;
  usedBytes: number;
  connectedNodes: string[];
  // For local storage - per-node instances
  nodeInstances: {
    node: string;
    totalBytes: number;
    usedBytes: number;
    active: boolean;
  }[];
}

// D3 Treemap component (preserved from original)
interface TreemapData {
  vm: VMMetrics & { clusterName: string };
  value: number;
}

interface TreemapNodeData {
  name: string;
  value?: number;
  vm?: VMMetrics & { clusterName: string };
  children?: TreemapNodeData[];
}

// Simulated disk detail interface
interface VMDiskDetail {
  device: string;  // e.g., "scsi0", "virtio0"
  storage: string; // e.g., "local-lvm", "ceph-pool"
  size: number;    // bytes
  format: string;  // e.g., "raw", "qcow2"
}

// Generate simulated disk details for a VM
function generateDiskDetails(vm: VMMetrics, storages: string[]): VMDiskDetail[] {
  const totalBytes = vm.disk?.total_bytes || 0;
  if (totalBytes === 0 || storages.length === 0) return [];

  // Seed random with vmid for consistent results
  const seed = vm.vmid;
  const seededRandom = (n: number) => {
    const x = Math.sin(seed * n) * 10000;
    return x - Math.floor(x);
  };

  // Determine number of disks (1-4 based on total size)
  const numDisks = Math.min(4, Math.max(1, Math.floor(seededRandom(1) * 3) + 1));
  const disks: VMDiskDetail[] = [];
  let remainingBytes = totalBytes;

  const devicePrefixes = ['scsi', 'virtio', 'ide', 'sata'];
  const formats = ['raw', 'qcow2', 'vmdk'];

  for (let i = 0; i < numDisks; i++) {
    const isLast = i === numDisks - 1;
    const diskSize = isLast ? remainingBytes : Math.floor(remainingBytes * (0.3 + seededRandom(i + 2) * 0.4));
    remainingBytes -= diskSize;

    const prefix = devicePrefixes[Math.floor(seededRandom(i + 3) * devicePrefixes.length)];
    const storage = storages[Math.floor(seededRandom(i + 4) * storages.length)];
    const format = formats[Math.floor(seededRandom(i + 5) * formats.length)];

    disks.push({
      device: `${prefix}${i}`,
      storage,
      size: diskSize,
      format,
    });
  }

  return disks;
}

// VM Disk Detail Popup Card
function VMDiskPopup({
  vm,
  position,
  onClose,
}: {
  vm: VMMetrics & { clusterName: string };
  position: CellPosition;
  onClose: () => void;
}) {
  const { t, language } = useTranslation();
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number; lineStart: { x: number; y: number }; lineEnd: { x: number; y: number } } | null>(null);

  const isRunning = vm.status === 'running';
  const statusColor = isRunning ? '#00ff88' : '#ff6b00';
  const isContainer = vm.type === 'lxc';
  const disks = vm.disks || [];
  const isZhTW = language === 'zh-TW';

  // For containers, show usage info
  const diskUsedPercent = vm.disk?.total_bytes > 0
    ? (vm.disk.used_bytes / vm.disk.total_bytes) * 100
    : 0;
  const diskColor = diskUsedPercent >= 90 ? '#ff0040' : diskUsedPercent >= 70 ? '#ff6b00' : '#00f0ff';

  // Status translation
  const statusText = isZhTW
    ? (vm.status === 'running' ? '運作中' : vm.status === 'stopped' ? '已停止' : vm.status.toUpperCase())
    : vm.status.toUpperCase();

  // Calculate popup position after render
  useEffect(() => {
    if (!popupRef.current) return;

    const popup = popupRef.current;
    const popupRect = popup.getBoundingClientRect();
    const popupW = popupRect.width;
    const popupH = popupRect.height;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const margin = 15;

    const { cellX, cellY, cellTop, cellBottom, cellLeft, cellRight } = position;

    // Determine best position: prefer right side, then left, then above, then below
    let finalX = 0;
    let finalY = 0;
    let lineStartX = cellX;
    let lineStartY = cellY;

    // Try right of cell
    if (cellRight + margin + popupW < viewportW) {
      finalX = cellRight + margin;
      finalY = Math.max(margin, Math.min(viewportH - popupH - margin, cellY - popupH / 2));
      lineStartX = cellRight;
      lineStartY = cellY;
    }
    // Try left of cell
    else if (cellLeft - margin - popupW > 0) {
      finalX = cellLeft - margin - popupW;
      finalY = Math.max(margin, Math.min(viewportH - popupH - margin, cellY - popupH / 2));
      lineStartX = cellLeft;
      lineStartY = cellY;
    }
    // Try above cell
    else if (cellTop - margin - popupH > 0) {
      finalX = Math.max(margin, Math.min(viewportW - popupW - margin, cellX - popupW / 2));
      finalY = cellTop - margin - popupH;
      lineStartX = cellX;
      lineStartY = cellTop;
    }
    // Place below cell
    else {
      finalX = Math.max(margin, Math.min(viewportW - popupW - margin, cellX - popupW / 2));
      finalY = cellBottom + margin;
      lineStartX = cellX;
      lineStartY = cellBottom;
    }

    // Calculate line end point (edge of popup closest to cell)
    let lineEndX = finalX;
    let lineEndY = finalY + popupH / 2;

    if (finalX > cellRight) {
      // Popup is to the right
      lineEndX = finalX;
      lineEndY = Math.max(finalY, Math.min(finalY + popupH, lineStartY));
    } else if (finalX + popupW < cellLeft) {
      // Popup is to the left
      lineEndX = finalX + popupW;
      lineEndY = Math.max(finalY, Math.min(finalY + popupH, lineStartY));
    } else if (finalY + popupH < cellTop) {
      // Popup is above
      lineEndX = Math.max(finalX, Math.min(finalX + popupW, lineStartX));
      lineEndY = finalY + popupH;
    } else {
      // Popup is below
      lineEndX = Math.max(finalX, Math.min(finalX + popupW, lineStartX));
      lineEndY = finalY;
    }

    setPopupPos({
      x: finalX,
      y: finalY,
      lineStart: { x: lineStartX, y: lineStartY },
      lineEnd: { x: lineEndX, y: lineEndY },
    });
  }, [position]);

  // Calculate line angle and length
  const lineStyle = popupPos ? (() => {
    const dx = popupPos.lineEnd.x - popupPos.lineStart.x;
    const dy = popupPos.lineEnd.y - popupPos.lineStart.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return {
      width: `${length}px`,
      transform: `rotate(${angle}deg)`,
      left: `${popupPos.lineStart.x}px`,
      top: `${popupPos.lineStart.y}px`,
    };
  })() : null;

  // Portaled to <body>: the popup + connector are position:fixed using
  // viewport coords, but rendered inline they were offset by an ancestor's
  // transform / backdrop-filter (the treemap/page container becomes the
  // containing block for fixed children). Portaling clears that. (gotcha #7)
  return createPortal(
    <>
      {/* Connecting line */}
      {popupPos && lineStyle && (
        <div
          className="popup-connector-line"
          style={lineStyle}
        />
      )}

      <div
        ref={popupRef}
        className="vm-disk-popup"
        style={{
          left: popupPos?.x ?? -9999,
          top: popupPos?.y ?? -9999,
          opacity: popupPos ? 1 : 0,
          transform: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-header">
          <div className="popup-title">
            <span className="vm-icon">{vm.type === 'qemu' ? 'VM' : 'CT'}</span>
            <span className="vm-name">{vm.name}</span>
            <span className="vm-id">#{vm.vmid}</span>
          </div>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>

        <div className="popup-status">
          <span className="status-dot" style={{ background: statusColor }} />
          <span className="status-text" style={{ color: statusColor }}>
            {statusText}
          </span>
          <span className="node-info">@ {vm.node}</span>
        </div>

        <div className="popup-section">
          <div className="section-label">
            {isZhTW ? '磁碟' : 'DISK'}{disks.length > 1 ? (isZhTW ? '' : 'S') : ''} ({disks.length || 1})
          </div>

          {/* Show individual disks if available */}
          {disks.length > 0 ? (
            <div className="disk-list">
              {disks.map((disk, i) => (
                <div key={i} className="disk-item">
                  <div className="disk-device">
                    <span className="device-name">{disk.device}</span>
                    <span className="device-format">{disk.format}</span>
                  </div>
                  <div className="disk-info">
                    <span className="disk-storage">{disk.storage}</span>
                    <span className="disk-size">{formatBytes(disk.size)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="disk-summary">
              <div className="disk-summary-row">
                <span className="disk-label">{isZhTW ? '配置容量' : 'Allocated'}</span>
                <span className="disk-value">{formatBytes(vm.disk?.total_bytes || 0)}</span>
              </div>
            </div>
          )}

          {/* Show usage only for containers */}
          {isContainer && (
            <div className="disk-usage-section">
              <div className="disk-summary-row">
                <span className="disk-label">{isZhTW ? '已使用' : 'Used'}</span>
                <span className="disk-value">{formatBytes(vm.disk?.used_bytes || 0)}</span>
              </div>
              <div className="disk-summary-row">
                <span className="disk-label">{isZhTW ? '使用率' : 'Usage'}</span>
                <span className="disk-value" style={{ color: diskColor }}>{diskUsedPercent.toFixed(1)}%</span>
              </div>
              <div className="disk-bar">
                <div
                  className="disk-bar-fill"
                  style={{
                    width: `${diskUsedPercent}%`,
                    background: diskColor,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="popup-metrics">
          <div className="metric-item">
            <span className="metric-label">CPU</span>
            <span className="metric-value">{vm.cpu?.cores || 0} {isZhTW ? '核心' : 'cores'}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">{isZhTW ? '記憶體' : 'Memory'}</span>
            <span className="metric-value">{formatBytes(vm.memory?.total_bytes || 0)}</span>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}

interface CellPosition {
  cellX: number;
  cellY: number;
  cellWidth: number;
  cellHeight: number;
  cellTop: number;
  cellBottom: number;
  cellLeft: number;
  cellRight: number;
}

function D3Treemap({
  data,
  width,
  height,
  isInitialLoad = false,
  onVMClick,
}: {
  data: TreemapData[];
  width: number;
  height: number;
  isInitialLoad?: boolean;
  onVMClick?: (vm: VMMetrics & { clusterName: string }, position: CellPosition) => void;
}) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const treemapData = useMemo(() => {
    if (data.length === 0 || width === 0 || height === 0) return [];

    const hierarchyData: TreemapNodeData = {
      name: 'root',
      children: data.map(d => ({
        name: d.vm.name,
        value: d.value,
        vm: d.vm,
      })),
    };

    const root = d3.hierarchy<TreemapNodeData>(hierarchyData)
      .sum(d => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const treemap = d3.treemap<TreemapNodeData>()
      .size([width, height])
      .paddingInner(3)
      .paddingOuter(2)
      .round(true)
      .tile(d3.treemapSquarify.ratio(1));

    const treemapRoot = treemap(root);

    return treemapRoot.leaves().map(node => ({
      x: node.x0,
      y: node.y0,
      width: node.x1 - node.x0,
      height: node.y1 - node.y0,
      vm: node.data.vm as VMMetrics & { clusterName: string },
      value: node.value || 0,
    }));
  }, [data, width, height]);

  if (treemapData.length === 0) {
    return <div className="no-storage">No VM disk data available</div>;
  }

  return (
    <svg ref={svgRef} width={width} height={height} className="d3-treemap">
      <defs>
        {/* Scanline pattern for sci-fi effect */}
        <pattern id="scanlinePattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(0, 255, 200, 0.5)" strokeWidth="1" />
        </pattern>
        {/* Animated gradient for energy pulse */}
        <linearGradient id="energyPulse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 255, 200, 0.8)">
            <animate attributeName="stop-color" values="rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="rgba(0, 200, 255, 0.4)">
            <animate attributeName="stop-color" values="rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        {/* Glow filter */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {treemapData.map((node, i) => {
        const diskTotal = node.vm.disk?.total_bytes || 1;
        const isRunning = node.vm.status === 'running';
        const isHovered = hoveredNode === `${node.vm.node}-${node.vm.vmid}`;

        const showMinimal = node.width > 15 && node.height > 12;
        const showName = node.width > 40 && node.height > 25;
        const showSize = node.width > 50 && node.height > 40;
        const showStatus = node.width > 60 && node.height > 55;

        // Color based on relative size within the dataset - Sci-Fi Neon Theme
        const maxValue = Math.max(...treemapData.map(n => n.value));
        const sizeRatio = node.value / maxValue;

        const getFillColor = () => {
          if (!isRunning) return 'rgba(30, 35, 50, 0.6)';
          // Neon sci-fi gradient based on size
          if (sizeRatio > 0.7) return 'rgba(0, 255, 200, 0.15)';       // Large - neon cyan
          if (sizeRatio > 0.4) return 'rgba(0, 200, 255, 0.12)';       // Medium - electric blue
          if (sizeRatio > 0.2) return 'rgba(180, 0, 255, 0.1)';        // Small - neon purple
          return 'rgba(255, 0, 180, 0.08)';                             // Tiny - magenta
        };

        const getStrokeColor = () => {
          if (!isRunning) return 'rgba(60, 70, 90, 0.5)';
          if (sizeRatio > 0.7) return 'rgba(0, 255, 200, 0.9)';        // Neon cyan
          if (sizeRatio > 0.4) return 'rgba(0, 200, 255, 0.85)';       // Electric blue
          if (sizeRatio > 0.2) return 'rgba(180, 100, 255, 0.8)';      // Neon purple
          return 'rgba(255, 80, 200, 0.75)';                            // Magenta
        };

        const getGlowColor = () => {
          if (!isRunning) return 'transparent';
          if (sizeRatio > 0.7) return 'rgba(0, 255, 200, 0.4)';
          if (sizeRatio > 0.4) return 'rgba(0, 200, 255, 0.35)';
          if (sizeRatio > 0.2) return 'rgba(180, 100, 255, 0.3)';
          return 'rgba(255, 80, 200, 0.25)';
        };

        const getTextColor = () => {
          if (!isRunning) return 'rgba(100, 110, 130, 0.7)';
          if (sizeRatio > 0.7) return 'rgba(0, 255, 220, 1)';
          if (sizeRatio > 0.4) return 'rgba(100, 220, 255, 1)';
          if (sizeRatio > 0.2) return 'rgba(200, 160, 255, 1)';
          return 'rgba(255, 150, 220, 1)';
        };

        // Calculate staggered animation delay
        const animDelay = isInitialLoad ? i * 30 : 0;

        return (
          <g
            key={`${node.vm.node}-${node.vm.vmid}`}
            transform={`translate(${node.x}, ${node.y})`}
            onMouseEnter={() => setHoveredNode(`${node.vm.node}-${node.vm.vmid}`)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={(e) => {
              e.stopPropagation();
              if (onVMClick) {
                // Use mouse click position and node dimensions for accurate cell bounds
                const clickX = e.clientX;
                const clickY = e.clientY;
                // Calculate cell bounds based on click position and node size
                // The click should be within the cell, so we can estimate cell bounds
                const halfWidth = node.width / 2;
                const halfHeight = node.height / 2;
                onVMClick(node.vm, {
                  cellX: clickX,
                  cellY: clickY,
                  cellWidth: node.width,
                  cellHeight: node.height,
                  cellTop: clickY - halfHeight,
                  cellBottom: clickY + halfHeight,
                  cellLeft: clickX - halfWidth,
                  cellRight: clickX + halfWidth,
                });
              }
            }}
            className={isInitialLoad ? 'treemap-node-enter' : ''}
            style={{
              cursor: 'pointer',
              '--anim-delay': `${animDelay}ms`,
            } as React.CSSProperties}
          >
            <title>
              {`${node.vm.name} (#${node.vm.vmid})\nStatus: ${node.vm.status}\nAllocated: ${formatBytes(diskTotal)}`}
            </title>
            {/* Outer glow layer with pulse animation */}
            {isRunning && (
              <rect
                width={node.width}
                height={node.height}
                fill="none"
                stroke={getGlowColor()}
                strokeWidth={3}
                rx={4}
                ry={4}
                className="glow-pulse"
                style={{
                  filter: `blur(4px)`,
                  opacity: isHovered ? 1 : 0.6,
                }}
              />
            )}
            {/* Data stream border animation */}
            {isRunning && node.width > 30 && node.height > 25 && (
              <rect
                width={node.width}
                height={node.height}
                fill="none"
                stroke={getStrokeColor()}
                strokeWidth={1}
                strokeDasharray="8 4"
                rx={4}
                ry={4}
                className="data-stream"
                style={{
                  opacity: 0.5,
                }}
              />
            )}
            {/* Main block */}
            <rect
              className="main-cell"
              width={node.width}
              height={node.height}
              fill={getFillColor()}
              stroke={getStrokeColor()}
              strokeWidth={isHovered ? 2 : 1}
              rx={4}
              ry={4}
              style={{
                filter: isHovered ? `drop-shadow(0 0 12px ${getGlowColor()}) drop-shadow(0 0 4px ${getStrokeColor()})` : `drop-shadow(0 0 3px ${getGlowColor()})`,
                transition: 'all 0.2s ease',
              }}
            />
            {/* Inner highlight line */}
            {isRunning && node.width > 20 && node.height > 15 && (
              <line
                x1={2}
                y1={2}
                x2={Math.min(node.width * 0.4, 30)}
                y2={2}
                stroke={getStrokeColor()}
                strokeWidth={1}
                opacity={0.6}
              />
            )}
            {/* Data circuit lines - sci-fi decoration */}
            {isRunning && node.width > 50 && node.height > 40 && (
              <>
                {/* Bottom-right corner circuit */}
                <path
                  d={`M ${node.width - 8} ${node.height - 2} L ${node.width - 2} ${node.height - 2} L ${node.width - 2} ${node.height - 8}`}
                  fill="none"
                  stroke={getStrokeColor()}
                  strokeWidth={1}
                  opacity={0.4}
                  className="circuit-line"
                />
                {/* Energy pulse dot */}
                <circle
                  cx={node.width - 5}
                  cy={node.height - 5}
                  r={2}
                  fill={getStrokeColor()}
                  opacity={0.8}
                  className="energy-dot"
                />
              </>
            )}
            {/* Scan line overlay effect */}
            {isRunning && (
              <rect
                x={0}
                y={0}
                width={node.width}
                height={node.height}
                fill="url(#scanlinePattern)"
                opacity={0.15}
                rx={4}
                ry={4}
                style={{ pointerEvents: 'none' }}
              />
            )}
            {showMinimal && !showName && (
              <text
                x={node.width / 2}
                y={node.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={getTextColor()}
                fontSize={Math.min(10, Math.max(7, node.width / 6))}
                fontFamily="var(--font-mono)"
                fontWeight={600}
                style={{ textShadow: isRunning ? `0 0 6px ${getGlowColor()}` : 'none' }}
              >
                {node.vm.name.slice(0, Math.max(1, Math.min(3, Math.floor(node.width / 10))))}
              </text>
            )}
            {showName && (() => {
              const w = node.width;
              const h = node.height;
              const nameFontSize = Math.min(16, Math.max(9, Math.min(w / 8, h / 5)));
              const sizeFontSize = Math.min(12, Math.max(8, Math.min(w / 10, h / 7)));
              const idFontSize = Math.min(10, Math.max(7, Math.min(w / 12, h / 8)));
              const maxChars = Math.floor((w - 8) / (nameFontSize * 0.6));
              const displayName = node.vm.name.length > maxChars
                ? node.vm.name.slice(0, Math.max(1, maxChars - 1)) + '…'
                : node.vm.name;
              const totalTextHeight = nameFontSize + (showSize ? sizeFontSize + 2 : 0) + (showStatus ? idFontSize + 2 : 0);
              const startY = (h - totalTextHeight) / 2 + nameFontSize / 2;

              return (
                <>
                  <text
                    x={w / 2}
                    y={startY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={getTextColor()}
                    fontSize={nameFontSize}
                    fontFamily="var(--font-mono)"
                    fontWeight={600}
                    style={{
                      textShadow: isRunning ? `0 0 8px ${getGlowColor()}` : 'none',
                      filter: isRunning ? `drop-shadow(0 0 2px ${getGlowColor()})` : 'none'
                    }}
                  >
                    {displayName}
                  </text>
                  {showSize && (
                    <text
                      x={w / 2}
                      y={startY + nameFontSize * 0.8 + 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isRunning ? 'rgba(180, 200, 220, 0.8)' : 'rgba(100, 110, 130, 0.6)'}
                      fontSize={sizeFontSize}
                      fontFamily="var(--font-mono)"
                    >
                      {formatBytes(diskTotal)}
                    </text>
                  )}
                  {showStatus && (
                    <text
                      x={w / 2}
                      y={startY + nameFontSize * 0.8 + (showSize ? sizeFontSize * 0.8 + 4 : 2)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={getTextColor()}
                      fontSize={idFontSize}
                      fontFamily="var(--font-mono)"
                      fontWeight={700}
                      style={{ filter: isRunning ? `drop-shadow(0 0 3px ${getGlowColor()})` : 'none' }}
                    >
                      #{node.vm.vmid}
                    </text>
                  )}
                </>
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
}

// Treemap view wrapper
function TreemapView({ vmDiskData, totals, storages }: {
  vmDiskData: (VMMetrics & { clusterName: string })[];
  totals: { totalUsed: number; totalCapacity: number };
  storages: string[];
}) {
  const { t, language } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedVM, setSelectedVM] = useState<{
    vm: VMMetrics & { clusterName: string };
    position: CellPosition;
  } | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  // Clear initial load state after animation completes
  useEffect(() => {
    if (isInitialLoad && vmDiskData.length > 0) {
      const timeout = setTimeout(() => {
        setIsInitialLoad(false);
      }, vmDiskData.length * 30 + 500); // Animation delay * count + buffer
      return () => clearTimeout(timeout);
    }
  }, [isInitialLoad, vmDiskData.length]);

  const treemapData = useMemo(() =>
    vmDiskData.map(vm => ({
      vm,
      value: vm.disk?.total_bytes || 0,
    })).filter(d => d.value > 0),
    [vmDiskData]
  );

  return (
    <div className="treemap-container">
      <div className="treemap-header">
        <h3 className="treemap-title font-display">VM DISK ALLOCATION TREEMAP</h3>
        <div className="treemap-stats">
          <span>{vmDiskData.length} VMs</span>
          <span className="stat-divider">|</span>
          <span>Total Allocated: {formatBytes(vmDiskData.reduce((sum, vm) => sum + (vm.disk?.total_bytes || 0), 0))}</span>
        </div>
      </div>
      <div ref={containerRef} className="treemap-grid" onClick={() => setSelectedVM(null)}>
        {dimensions.width > 0 && dimensions.height > 0 && (
          <D3Treemap
            data={treemapData}
            width={dimensions.width}
            height={dimensions.height}
            isInitialLoad={isInitialLoad}
            onVMClick={(vm, position) => setSelectedVM({ vm, position })}
          />
        )}
      </div>
      {selectedVM && (
        <VMDiskPopup
          vm={selectedVM.vm}
          position={selectedVM.position}
          onClose={() => setSelectedVM(null)}
        />
      )}
      <div className="treemap-legend">
        <div className="legend-item">
          <span className="legend-color running" />
          <span>{t('vm.running')}</span>
        </div>
        <div className="legend-item">
          <span className="legend-color stopped" />
          <span>{t('vm.stopped')}</span>
        </div>
        <div className="legend-note">
          {language === 'zh-TW' ? '方塊大小 = 磁碟配置容量' : 'Block size = Disk allocation'}
        </div>
      </div>
    </div>
  );
}

// Storage detail tooltip with sci-fi animation
function StorageTooltip({
  storage,
  position,
  sourcePos,
  onClose,
  onManage,
}: {
  storage: CategorizedStorage | null;
  position: { x: number; y: number } | null;
  sourcePos: { x: number; y: number } | null;
  onClose: () => void;
  onManage?: (storage: CategorizedStorage) => void;
}) {
  const { t } = useTranslation();
  if (!storage || !position) return null;

  const percent = storage.totalBytes > 0 ? (storage.usedBytes / storage.totalBytes) * 100 : 0;

  // Calculate line coordinates
  const lineStart = sourcePos || { x: position.x - 20, y: position.y + 50 };
  const lineEnd = { x: position.x, y: position.y + 50 };

  // Portaled to document.body — fixed-position coordinates are viewport
  // clientX/Y, and any ancestor with a lingering transform/filter would
  // re-anchor them (same fix as the right-click menu / VMContextMenu).
  return createPortal(
    <>
      {/* Connecting line - subtle */}
      <svg className="tooltip-connector" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 999 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(80, 140, 180, 0)" stopOpacity="0" />
            <stop offset="30%" stopColor="rgba(80, 160, 200, 0.6)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgba(80, 160, 200, 0.6)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <line
          x1={lineStart.x}
          y1={lineStart.y}
          x2={lineEnd.x}
          y2={lineEnd.y}
          stroke="url(#lineGradient)"
          strokeWidth="1"
          className="connector-line"
        />
        <circle cx={lineEnd.x} cy={lineEnd.y} r="3" fill="rgba(80, 180, 200, 0.7)" className="connector-dot" />
      </svg>

      {/* Tooltip card */}
      <div
        className="storage-tooltip"
        style={{ left: position.x, top: position.y }}
      >
        <div className="tooltip-grid" />
        <div className="tooltip-scan-line" />
        <div className="tooltip-corner tl" />
        <div className="tooltip-corner tr" />
        <div className="tooltip-corner bl" />
        <div className="tooltip-corner br" />

        <div className="tooltip-header">
          <span className="tooltip-name">{storage.name}</span>
          <button className="tooltip-close" onClick={onClose}>×</button>
        </div>
        <div className="tooltip-type-row">
          <span className={`tooltip-badge ${storage.isShared ? 'shared' : 'local'}`}>
            {storage.isShared ? t('storage.filter_shared') : t('storage.filter_local')}
          </span>
        </div>
        <div className="tooltip-content">
          <div className="tooltip-row">
            <span>{t('table.type')}:</span>
            <span>{storage.type.toUpperCase()}</span>
          </div>
          <div className="tooltip-row">
            <span>{t('storage.content')}:</span>
            <div className="tooltip-labels">
              {storage.content.map((c, i) => (
                <span key={i} className="tooltip-label">{c}</span>
              ))}
            </div>
          </div>
          <div className="tooltip-row">
            <span>{t('metric.used')}:</span>
            <span>{formatBytes(storage.usedBytes)}</span>
          </div>
          <div className="tooltip-row">
            <span>{t('metric.total')}:</span>
            <span>{formatBytes(storage.totalBytes)}</span>
          </div>
          <div className="tooltip-row">
            <span>{t('metric.usage')}:</span>
            <span className={`text-${getHealthColor(percent)}`}>{formatPercent(percent, 1)}</span>
          </div>
          {storage.isShared && storage.connectedNodes.length > 0 && (
            <div className="tooltip-row">
              <span>{t('cluster.nodes')}:</span>
              <div className="tooltip-labels">
                {storage.connectedNodes.map((node, i) => (
                  <span key={i} className="tooltip-label node">{node}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action row — only "管理" for now. The detail page itself
            handles per-content-type tabs (= the old "內容" idea is folded
            into the management page since they share the same destination). */}
        {onManage && (
          <div className="tooltip-actions">
            <button
              className="tooltip-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onManage(storage);
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h12" />
              </svg>
              <span>{t('storage.manage')}</span>
            </button>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

interface StorageVaultProps {
  cluster: ClusterData | null;
  clusters?: Record<string, ClusterData>;
}

type ViewMode = 'tanks' | 'treemap';
type StorageFilter = 'all' | 'local' | 'shared';

export function StorageVault({ cluster, clusters }: StorageVaultProps) {
  const { t, language } = useTranslation();
  // Resolve initial viewMode from /storage/{tanks|treemap} sub-path so
  // direct deep-links land on the right view. Default = tanks.
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === 'undefined') return 'tanks';
    const seg = window.location.pathname.split('/').filter(Boolean)[1];
    return (seg === 'treemap' || seg === 'tanks') ? seg : 'tanks';
  });
  // Sync viewMode → URL. Only when we're at the top-level /storage path
  // (NOT inside /storage/{cluster}/{node}/{name} detail).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts[0] !== 'storage') return;
    if (parts.length >= 4) return;  // detail route, leave alone
    const desired = `/storage/${viewMode}`;
    if (window.location.pathname !== desired) {
      window.history.replaceState(null, '', desired);
    }
  }, [viewMode]);
  useEffect(() => {
    const onPop = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts[0] !== 'storage' || parts.length >= 4) return;
      const seg = parts[1];
      if (seg === 'tanks' || seg === 'treemap') setViewMode(seg);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const [filter, setFilter] = useState<StorageFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStorage, setSelectedStorage] = useState<CategorizedStorage | null>(null);
  const [tooltipStorage, setTooltipStorage] = useState<CategorizedStorage | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [tooltipSourcePos, setTooltipSourcePos] = useState<{ x: number; y: number } | null>(null);
  // Right-click context menu — null = closed.
  const [ctxMenu, setCtxMenu] = useState<{
    x: number; y: number; storage: CategorizedStorage;
  } | null>(null);
  // Storage RRD modal state.
  const [storageRRD, setStorageRRD] = useState<{
    clusterId: string; node: string; storage: string; title: string;
  } | null>(null);

  // Navigate to /storage/{cluster}/{node}/{storage}. We pick a node from
  // the storage's `connectedNodes`/`nodeInstances` (preferring active);
  // shared storages are reachable from any node so the choice doesn't
  // matter functionally. The cluster context comes from the parent —
  // when in all-clusters mode each storage carries connected node
  // metadata that includes which cluster it lives in via `clusters`.
  const navigateToStorageDetail = useCallback((storage: CategorizedStorage) => {
    // Determine the cluster id and the node to call.
    let cid = cluster?.id || '';
    let node = '';
    if (storage.isShared) {
      // For shared: any active node from connectedNodes works.
      node = storage.connectedNodes[0] || '';
    } else {
      // For local: pick first active node instance.
      const inst = storage.nodeInstances.find((n) => n.active)
                || storage.nodeInstances[0];
      node = inst?.node || '';
    }
    // In all-clusters mode, find which cluster owns this node.
    if (!cid && clusters) {
      for (const [id, cd] of Object.entries(clusters)) {
        if (cd.nodes && cd.nodes[node]) { cid = id; break; }
      }
    }
    if (!cid || !node) return;
    const path = `/storage/${encodeURIComponent(cid)}`
      + `/${encodeURIComponent(node)}`
      + `/${encodeURIComponent(storage.name)}`;
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    // Close any open tooltip / menu.
    setTooltipStorage(null);
    setTooltipPosition(null);
    setTooltipSourcePos(null);
    setCtxMenu(null);
  }, [cluster, clusters]);

  const openCtxMenu = useCallback((e: React.MouseEvent, storage: CategorizedStorage) => {
    e.preventDefault();
    e.stopPropagation();
    // Clamp to viewport so the menu doesn't render off-screen.
    const x = Math.min(e.clientX, window.innerWidth  - 180);
    const y = Math.min(e.clientY, window.innerHeight - 80);
    setCtxMenu({ x, y, storage });
  }, []);

  const isAllClusters = !cluster && clusters && Object.keys(clusters).length > 0;

  // Collect VMs for treemap
  const vmDiskData = useMemo(() => {
    const vms: (VMMetrics & { clusterName: string })[] = [];
    const processCluster = (clusterData: ClusterData, clusterLabel: string) => {
      Object.values(clusterData.vms).forEach((vm) => {
        if (vm.disk?.total_bytes && vm.disk.total_bytes > 0 && !vm.template) {
          vms.push({ ...vm, clusterName: clusterLabel });
        }
      });
    };
    if (isAllClusters) {
      Object.entries(clusters!).forEach(([id, c]) => {
        processCluster(c, c.name || id);
      });
    } else if (cluster) {
      processCluster(cluster, cluster.name || '');
    }
    return vms.sort((a, b) => (b.disk?.total_bytes || 0) - (a.disk?.total_bytes || 0));
  }, [cluster, clusters, isAllClusters]);

  // Categorize storages into Shared and Local
  const { sharedStorages, localStoragesByNode, allNodes, totals, warnings } = useMemo(() => {
    const storageMap = new Map<string, {
      name: string;
      type: string;
      content: string[];
      allowedNodes: string[];  // From PVE config
      nodes: { node: string; totalBytes: number; usedBytes: number; active: boolean }[];
    }>();

    let totalUsed = 0;
    let totalCapacity = 0;
    let warningCount = 0;
    const nodeSet = new Set<string>();

    const processCluster = (clusterData: ClusterData) => {
      Object.values(clusterData.storages).forEach((storage) => {
        nodeSet.add(storage.node);

        const key = storage.storage;
        if (!storageMap.has(key)) {
          storageMap.set(key, {
            name: storage.storage,
            type: storage.type,
            content: storage.content,
            allowedNodes: storage.allowed_nodes || [],
            nodes: [],
          });
        }
        storageMap.get(key)!.nodes.push({
          node: storage.node,
          totalBytes: storage.disk.total_bytes,
          usedBytes: storage.disk.used_bytes,
          active: storage.enabled !== false,
        });
      });
    };

    if (isAllClusters) {
      Object.values(clusters!).forEach(c => processCluster(c));
    } else if (cluster) {
      processCluster(cluster);
    }

    // Categorize as shared or local
    const shared: CategorizedStorage[] = [];
    const localByNode: Record<string, CategorizedStorage[]> = {};

    // Initialize localByNode for all nodes
    nodeSet.forEach(node => {
      localByNode[node] = [];
    });

    storageMap.forEach((storage) => {
      const isSharedType = SHARED_TYPES.includes(storage.type);
      // Check if all nodes have similar capacity (within 1% tolerance for shared storage detection)
      const firstCapacity = storage.nodes[0].totalBytes;
      const allSameCapacity = storage.nodes.length > 1 && firstCapacity > 0 &&
        storage.nodes.every(n => {
          const diff = Math.abs(n.totalBytes - firstCapacity);
          return diff / firstCapacity < 0.01; // 1% tolerance
        });

      if (isSharedType || allSameCapacity) {
        // Shared storage - use first node's data (they're all the same)
        const firstNode = storage.nodes[0];

        // Use allowed_nodes from PVE config if available, otherwise fall back to runtime nodes
        const configuredNodes = storage.allowedNodes.length > 0
          ? storage.allowedNodes
          : storage.nodes.map(n => n.node);

        shared.push({
          name: storage.name,
          type: storage.type,
          content: storage.content,
          isShared: true,
          totalBytes: firstNode.totalBytes,
          usedBytes: firstNode.usedBytes,
          connectedNodes: configuredNodes,
          nodeInstances: storage.nodes,
        });
      } else {
        // Local storage - add to each node
        storage.nodes.forEach(nodeData => {
          if (!localByNode[nodeData.node]) {
            localByNode[nodeData.node] = [];
          }

          localByNode[nodeData.node].push({
            name: storage.name,
            type: storage.type,
            content: storage.content,
            isShared: false,
            totalBytes: nodeData.totalBytes,
            usedBytes: nodeData.usedBytes,
            connectedNodes: [],
            nodeInstances: [nodeData],
          });
        });
      }
    });

    // Apply filters
    const filterStorage = (s: CategorizedStorage) => {
      if (filter === 'local' && s.isShared) return false;
      if (filter === 'shared' && !s.isShared) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!s.name.toLowerCase().includes(term) && !s.type.toLowerCase().includes(term)) {
          return false;
        }
      }
      return true;
    };

    const filteredShared = shared.filter(filterStorage).sort((a, b) => a.name.localeCompare(b.name));
    const filteredLocalByNode: Record<string, CategorizedStorage[]> = {};
    Object.entries(localByNode).forEach(([node, storages]) => {
      const filtered = storages.filter(filterStorage).sort((a, b) => a.name.localeCompare(b.name));
      if (filtered.length > 0) {
        filteredLocalByNode[node] = filtered;
      }
    });

    // Calculate totals from filtered results
    filteredShared.forEach(s => {
      const percent = s.totalBytes > 0 ? (s.usedBytes / s.totalBytes) * 100 : 0;
      if (percent >= 85) warningCount++;
      totalUsed += s.usedBytes;
      totalCapacity += s.totalBytes;
    });

    Object.values(filteredLocalByNode).flat().forEach(s => {
      const percent = s.totalBytes > 0 ? (s.usedBytes / s.totalBytes) * 100 : 0;
      if (percent >= 85) warningCount++;
      totalUsed += s.usedBytes;
      totalCapacity += s.totalBytes;
    });

    return {
      sharedStorages: filteredShared,
      localStoragesByNode: filteredLocalByNode,
      allNodes: Array.from(nodeSet).sort(),
      totals: { totalUsed, totalCapacity },
      warnings: warningCount,
    };
  }, [cluster, clusters, isAllClusters, filter, searchTerm]);

  // Handle tank click to show/hide tooltip
  const handleTankClick = (storage: CategorizedStorage, element: HTMLElement) => {
    // If clicking the same storage, close tooltip
    if (tooltipStorage && tooltipStorage.name === storage.name && tooltipStorage.isShared === storage.isShared) {
      setTooltipStorage(null);
      setTooltipPosition(null);
      setTooltipSourcePos(null);
      return;
    }

    const rect = element.getBoundingClientRect();
    const tooltipWidth = 240;
    const tooltipHeight = 200;

    // Source position (center-right of the tank)
    const sourceY = rect.top + rect.height / 2;

    // Check if tooltip would overflow right side
    let x = rect.right + 30;
    let onLeft = false;
    if (x + tooltipWidth > window.innerWidth) {
      x = rect.left - tooltipWidth - 30;
      onLeft = true;
    }

    // Check if tooltip would overflow bottom
    let y = rect.top;
    if (y + tooltipHeight > window.innerHeight) {
      y = window.innerHeight - tooltipHeight - 10;
    }

    // Ensure tooltip doesn't go above viewport
    if (y < 10) {
      y = 10;
    }

    setTooltipStorage(storage);
    setTooltipPosition({ x, y });
    setTooltipSourcePos({ x: onLeft ? rect.left : rect.right, y: sourceY });
  };

  // Close tooltip when clicking outside
  const closeTooltip = () => {
    setTooltipStorage(null);
    setTooltipPosition(null);
    setTooltipSourcePos(null);
  };

  if (!cluster && !isAllClusters) {
    return (
      <div className="storage-vault empty">
        <div className="empty-message">
          <span className="loading-spinner" />
          <span>{t('cluster.select')}</span>
        </div>
      </div>
    );
  }

  const usagePercent = totals.totalCapacity > 0 ? (totals.totalUsed / totals.totalCapacity) * 100 : 0;

  return (
    <div className="storage-vault">
      <div className="grid-floor" />

      {/* Header */}
      <div className="vault-header">
        <div className="header-title-section">
          <h1 className="vault-title font-display">
            <svg className="title-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="8" ry="3" />
              <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
              <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
              <ellipse cx="12" cy="19" rx="3" ry="1" fill="currentColor" opacity="0.3" />
            </svg>
            {t('storage.title')}
          </h1>
          <div className="vault-stats">
            <span className="stat-item">{t('storage.count', { n: sharedStorages.length + Object.values(localStoragesByNode).flat().length })}</span>
            <span className="stat-divider">|</span>
            <span className="stat-item">{t('storage.shared_count', { n: sharedStorages.length })}</span>
            <span className="stat-divider">|</span>
            <span className="stat-item">{t('storage.local_count', { n: Object.values(localStoragesByNode).flat().length })}</span>
            {warnings > 0 && (
              <>
                <span className="stat-divider">|</span>
                <span className="stat-warning">⚠️ {warnings} {t('settings.warning')}</span>
              </>
            )}
          </div>
        </div>

        <div className="header-controls">
          {/* Search */}
          <div className="search-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={t('storage.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="filter-tabs">
            <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              <span>{t('storage.filter_all')}</span>
            </button>
            <button className={`filter-tab ${filter === 'shared' ? 'active' : ''}`} onClick={() => setFilter('shared')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{t('storage.filter_shared')}</span>
            </button>
            <button className={`filter-tab ${filter === 'local' ? 'active' : ''}`} onClick={() => setFilter('local')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8" />
              </svg>
              <span>{t('storage.filter_local')}</span>
            </button>
          </div>

          {/* View toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'tanks' ? 'active' : ''}`}
              onClick={() => setViewMode('tanks')}
              title={language === 'zh-TW' ? '能量槽檢視' : 'Tank view'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="18" rx="2" />
                <rect x="14" y="8" width="7" height="13" rx="2" />
              </svg>
              <span className="view-btn-lbl">{language === 'zh-TW' ? '能量槽' : 'Tanks'}</span>
            </button>
            <button
              className={`view-btn ${viewMode === 'treemap' ? 'active' : ''}`}
              onClick={() => setViewMode('treemap')}
              title={language === 'zh-TW' ? '矩形樹圖檢視（每 VM 磁碟占用）' : 'Treemap view (per-VM disk usage)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="10" height="8" />
                <rect x="15" y="3" width="6" height="5" />
                <rect x="15" y="10" width="6" height="6" />
                <rect x="3" y="13" width="10" height="8" />
              </svg>
              <span className="view-btn-lbl">{language === 'zh-TW' ? '矩形樹圖' : 'Treemap'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Indicator */}
      <div className="panel-card summary-indicator-container">
        <div className="panel-card-head">
          <span className="panel-card-dot" />
          <span>{t('storage.total_capacity')}</span>
        </div>
        <SciFiIndicator
          percent={usagePercent}
          usedBytes={totals.totalUsed}
          totalBytes={totals.totalCapacity}
          duration={1500}
        />
      </div>

      {/* Content */}
      <div className="vault-content">
        {viewMode === 'treemap' ? (
          <TreemapView
            vmDiskData={vmDiskData}
            totals={totals}
            storages={[
              ...sharedStorages.map(s => s.name),
              ...Object.values(localStoragesByNode).flat().map(s => s.name)
            ]}
          />
        ) : (
          <div className="tanks-layout">
            {/* Shared Storage Section */}
            {(filter === 'all' || filter === 'shared') && sharedStorages.length > 0 && (
              <div className="panel-card storage-section shared-section">
                <div className="panel-card-head">
                  <span className="panel-card-dot" />
                  <svg className="section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{t('storage.section_shared')}</span>
                  <span className="panel-card-meta">{t(sharedStorages.length > 1 ? 'storage.storages_plural' : 'storage.storages_count', { n: sharedStorages.length })}</span>
                </div>
                <div className="panel-card-body tanks-grid shared-grid">
                  {sharedStorages.map((storage, index) => (
                    <div
                      key={storage.name}
                      onClick={(e) => handleTankClick(storage, e.currentTarget)}
                      onContextMenu={(e) => openCtxMenu(e, storage)}
                      style={{ cursor: 'pointer' }}
                    >
                      <LiquidTank
                        name={storage.name}
                        usedBytes={storage.usedBytes}
                        totalBytes={storage.totalBytes}
                        type={storage.type}
                        isShared={true}
                        connectedNodes={storage.connectedNodes}
                        width={140}
                        height={220}
                        animationDelay={index * 80}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Local Storage Section */}
            {(filter === 'all' || filter === 'local') && Object.keys(localStoragesByNode).length > 0 && (
              <div className="panel-card storage-section local-section">
                <div className="panel-card-head">
                  <span className="panel-card-dot" />
                  <svg className="section-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8" />
                  </svg>
                  <span>{t('storage.section_local')}</span>
                  <span className="panel-card-meta">
                    {t(Object.values(localStoragesByNode).flat().length > 1 ? 'storage.storages_plural' : 'storage.storages_count', { n: Object.values(localStoragesByNode).flat().length })} {t(Object.keys(localStoragesByNode).length > 1 ? 'storage.across_nodes_plural' : 'storage.across_nodes', { n: Object.keys(localStoragesByNode).length })}
                  </span>
                </div>
                <div className="panel-card-body tanks-grid local-grid">
                  {(() => {
                    let globalIndex = sharedStorages.length;
                    return Object.entries(localStoragesByNode).sort(([a], [b]) => a.localeCompare(b)).flatMap(([nodeName, storages]) =>
                      storages.map((storage) => {
                        const nodeData = storage.nodeInstances[0];
                        const currentIndex = globalIndex++;
                        return (
                          <div
                            key={`${nodeName}-${storage.name}`}
                            onClick={(e) => handleTankClick(storage, e.currentTarget)}
                            onContextMenu={(e) => openCtxMenu(e, storage)}
                            style={{ cursor: 'pointer' }}
                          >
                            <LiquidTank
                              name={storage.name}
                              usedBytes={nodeData.usedBytes}
                              totalBytes={nodeData.totalBytes}
                              type={storage.type}
                              isShared={false}
                              nodeName={nodeName}
                              isOffline={!nodeData.active}
                              width={120}
                              height={200}
                              animationDelay={currentIndex * 80}
                            />
                          </div>
                        );
                      })
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Empty state */}
            {sharedStorages.length === 0 && Object.keys(localStoragesByNode).length === 0 && (
              <div className="no-storage">
                {searchTerm ? (
                  <span>{t('error.no_data')}: "{searchTerm}"</span>
                ) : (
                  <span>{t('error.no_data')}</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tooltip */}
      <StorageTooltip
        storage={tooltipStorage}
        position={tooltipPosition}
        sourcePos={tooltipSourcePos}
        onClose={() => {
          setTooltipStorage(null);
          setTooltipPosition(null);
          setTooltipSourcePos(null);
        }}
        onManage={navigateToStorageDetail}
      />

      {/* Right-click context menu — minimal, just one entry for now. */}
      {ctxMenu && createPortal(
        <>
          {/* Click-anywhere shield to dismiss the menu. Render BEFORE the
              menu so it sits behind it; pointer-events:auto on a fixed
              full-viewport div eats stray clicks without affecting normal
              hover for things underneath.
              PORTALED to document.body (same as VMContextMenu): any
              ancestor with a lingering transform/filter would otherwise
              become the containing block for position:fixed and shift
              the menu by the sidebar+topbar size. */}
          <div
            className="storage-ctx-shield"
            onClick={() => setCtxMenu(null)}
            onContextMenu={(e) => { e.preventDefault(); setCtxMenu(null); }}
          />
          <div
            className="storage-ctx-menu"
            style={{ left: ctxMenu.x, top: ctxMenu.y }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="storage-ctx-item"
              onClick={() => { navigateToStorageDetail(ctxMenu.storage); setCtxMenu(null); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>{t('storage.content')}</span>
            </button>
            <button
              className="storage-ctx-item"
              onClick={() => {
                // Derive (cluster, node) the same way navigateToStorageDetail does.
                const s = ctxMenu.storage;
                let cid = cluster?.id || '';
                let n = '';
                if (s.isShared) n = s.connectedNodes[0] || '';
                else {
                  const inst = s.nodeInstances.find((x) => x.active) || s.nodeInstances[0];
                  n = inst?.node || '';
                }
                if (!cid && clusters) {
                  for (const [id, cd] of Object.entries(clusters)) {
                    if (cd.nodes && (cd.nodes as any)[n]) { cid = id; break; }
                  }
                }
                if (!cid || !n) { setCtxMenu(null); return; }
                setStorageRRD({
                  clusterId: cid, node: n, storage: s.name,
                  title: `${s.name} @ ${n}`,
                });
                setCtxMenu(null);
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 17 9 11 13 15 21 7"/>
                <polyline points="14 7 21 7 21 14"/>
              </svg>
              <span>{t('vm.perf_charts')}</span>
            </button>
          </div>
        </>,
        document.body
      )}

      <RRDChartModal
        open={storageRRD !== null}
        clusterId={storageRRD?.clusterId || ''}
        node={storageRRD?.node || ''}
        storage={storageRRD?.storage}
        kind="storage"
        title={storageRRD?.title}
        onClose={() => setStorageRRD(null)}
      />

      <style>{`
        .storage-vault {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #0a0c10 0%, #08090d 100%);
        }

        .storage-vault.empty {
          align-items: center;
          justify-content: center;
        }

        .vault-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-xs);
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .header-title-section {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md);
        }

        .vault-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }

        .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: storageIconFloat 3s ease-in-out infinite;
        }

        @keyframes storageIconFloat {
          0%, 100% { transform: none; }
          50% { transform: translateY(-2px); }
        }

        .vault-stats {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .stat-divider {
          margin: 0 var(--spacing-xs);
          color: rgba(100, 110, 130, 0.5);
        }

        .stat-warning {
          color: var(--warning);
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        /* Sci-Fi Horizontal Indicator Styles */
        /* Surface from panel-card; overflow stays visible because the
           pointer marker rides above the bar. */
        .summary-indicator-container {
          margin-bottom: var(--spacing-sm);
          overflow: visible;
        }

        .scifi-indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: 10px 16px 12px;
        }

        .indicator-left {
          min-width: 140px;
        }

        .indicator-bytes {
          font-family: var(--font-mono);
          font-size: 14px;
        }

        .indicator-bytes .used {
          font-weight: 600;
          text-shadow: 0 0 8px currentColor;
        }

        .indicator-bytes .separator {
          color: var(--text-muted);
          margin: 0 4px;
        }

        .indicator-bytes .total {
          color: var(--text-muted);
        }

        .indicator-bar-container {
          flex: 1;
          position: relative;
        }

        .indicator-bar {
          position: relative;
          height: 16px;
          background: rgba(10, 15, 25, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .segments-container {
          display: flex;
          height: 100%;
          gap: 2px;
          padding: 2px;
        }

        .segment {
          flex: 1;
          background: var(--segment-color);
          border-radius: 1px;
          transition: background 0.15s ease, box-shadow 0.15s ease;
        }

        .segment.active {
          box-shadow: 0 0 4px var(--segment-color);
          animation: segment-glow 0.3s ease-out both;
        }

        .segment.major {
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        @keyframes segment-glow {
          0% {
            opacity: 0;
            transform: scaleY(0.3);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.1);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        .indicator-glow {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          pointer-events: none;
          transition: width 0.1s ease-out;
        }

        .indicator-pointer {
          position: absolute;
          top: -6px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          transform: translateX(-50%);
          transition: left 0.1s ease-out;
        }

        .indicator-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: indicator-scan 2s linear infinite;
          pointer-events: none;
        }

        @keyframes indicator-scan {
          0% { left: -30px; }
          100% { left: 100%; }
        }

        .indicator-accent {
          height: 2px;
          margin-top: 2px;
          border-radius: 1px;
          box-shadow: 0 0 8px currentColor;
          transition: background 0.3s ease;
        }

        .indicator-right {
          min-width: 80px;
          text-align: right;
        }

        .indicator-percent {
          font-family: var(--font-mono);
          font-size: 28px;
          font-weight: 700;
          text-shadow: 0 0 15px currentColor;
          line-height: 1;
        }

        .indicator-percent .percent-symbol {
          font-size: 15px;
          opacity: 0.7;
          margin-left: 2px;
        }

        .summary-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
        }

        .summary-bar-fill.success { background: linear-gradient(90deg, #00cc70, #00aa60); }
        .summary-bar-fill.warning { background: linear-gradient(90deg, #dd9500, #cc8500); }
        .summary-bar-fill.danger { background: linear-gradient(90deg, #dd3050, #cc2040); }

        .summary-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .vault-content {
          flex: 1;
          overflow: auto;
        }

        /* Tanks Layout */
        .tanks-layout {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        /* Sections share the canonical panel-card surface; shared vs
           local is conveyed by the head icon + label, not tinted frames. */
        .section-icon {
          width: 16px;
          height: 16px;
          stroke: var(--primary);
          opacity: 0.85;
          flex-shrink: 0;
        }

        .tanks-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          justify-content: flex-start;
        }

        .shared-grid {
          justify-content: flex-start;
        }

        .local-grid {
          justify-content: flex-start;
        }

        /* Node grouping for local storage - breaks wall of sameness */
        .node-groups-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .node-group {
          background: rgba(0, 20, 35, 0.3);
          border: 1px solid rgba(0, 229, 255, 0.08);
          border-radius: 4px;
          padding: var(--spacing-md);
        }

        .node-group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px dashed rgba(0, 229, 255, 0.15);
        }

        .node-group-name {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: #00E5FF;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          background: rgba(0, 229, 255, 0.1);
          border-radius: 3px;
          border-left: 3px solid #00E5FF;
        }

        .node-group-count {
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(0, 229, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Tooltip with subtle glassmorphism */
        .storage-tooltip {
          position: fixed;
          z-index: 1000;
          min-width: 260px;
          background: rgba(8, 12, 20, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 4px;
          padding: 14px;
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.7),
            0 0 20px rgba(0, 240, 255, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          pointer-events: auto;
          overflow: hidden;
          animation: tooltipMaterialize 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          clip-path: polygon(
            0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
            100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)
          );
        }

        @keyframes tooltipMaterialize {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Top accent line */
        .storage-tooltip::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.8) 50%, transparent 100%);
        }

        /* Bottom accent line */
        .storage-tooltip::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent);
        }

        /* Scan line effect - very subtle */
        .tooltip-scan-line {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(100, 130, 160, 0.04), transparent);
          animation: tooltipSweep 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes tooltipSweep {
          0% { left: -50%; }
          100% { left: 150%; }
        }

        /* Grid pattern overlay - very subtle */
        .storage-tooltip .tooltip-grid {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(80, 100, 130, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(80, 100, 130, 0.03) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
          opacity: 0.5;
        }

        /* Corner decorations - refined */
        .tooltip-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(100, 140, 180, 0.5);
          border-style: solid;
          opacity: 0;
          animation: cornerMaterialize 0.25s ease-out forwards;
          pointer-events: none;
        }

        .tooltip-corner.tl {
          top: -1px;
          left: -1px;
          border-width: 1px 0 0 1px;
          animation-delay: 0.05s;
        }

        .tooltip-corner.tr {
          top: -1px;
          right: -1px;
          border-width: 1px 1px 0 0;
          animation-delay: 0.1s;
        }

        .tooltip-corner.bl {
          bottom: -1px;
          left: -1px;
          border-width: 0 0 1px 1px;
          animation-delay: 0.15s;
        }

        .tooltip-corner.br {
          bottom: -1px;
          right: -1px;
          border-width: 0 1px 1px 0;
          animation-delay: 0.2s;
        }

        @keyframes cornerMaterialize {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Corner dots - subtle status indicator */
        .tooltip-corner::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(0, 180, 200, 0.6);
          border-radius: 50%;
          animation: cornerDotPulse 2s ease-in-out infinite;
        }

        .tooltip-corner.tl::after { top: -2px; left: -2px; }
        .tooltip-corner.tr::after { top: -2px; right: -2px; }
        .tooltip-corner.bl::after { bottom: -2px; left: -2px; }
        .tooltip-corner.br::after { bottom: -2px; right: -2px; }

        @keyframes cornerDotPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        /* Connector line animation - refined */
        .tooltip-connector .connector-line {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: drawLine 0.3s ease-out forwards;
        }

        .tooltip-connector .connector-dot {
          opacity: 0;
          animation: dotMaterialize 0.25s ease-out 0.2s forwards;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes dotMaterialize {
          0% {
            opacity: 0;
            r: 0;
          }
          100% {
            opacity: 1;
            r: 3;
          }
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(80, 100, 130, 0.2);
          position: relative;
          z-index: 10;
        }

        .tooltip-name {
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 700;
          color: rgba(200, 220, 240, 0.95);
          letter-spacing: 0.03em;
        }

        .tooltip-close {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          line-height: 1;
          transition: color 0.2s;
          position: relative;
          z-index: 20;
        }

        .tooltip-close:hover {
          color: var(--danger-text);
        }

        .tooltip-type-row {
          margin-bottom: 8px;
        }

        .tooltip-badge {
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .tooltip-badge.shared {
          background: rgba(0, 180, 120, 0.15);
          color: rgba(100, 220, 180, 0.9);
          border: 1px solid rgba(0, 180, 120, 0.25);
        }

        .tooltip-badge.local {
          background: rgba(0, 160, 200, 0.12);
          color: rgba(100, 200, 220, 0.9);
          border: 1px solid rgba(0, 160, 200, 0.2);
        }

        .tooltip-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .tooltip-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 3px 0;
          gap: 12px;
        }

        /* Action footer for the storage tooltip — hosts the 管理 button.
           Border-top + slightly different bg gives it visual separation
           from the metadata rows above. */
        .tooltip-actions {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 240, 255, 0.18);
          display: flex;
          justify-content: stretch;
          position: relative;
          z-index: 1;
        }
        .tooltip-action-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 12px;
          background: rgba(0, 240, 255, 0.10);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: var(--radius-sm);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .tooltip-action-btn:hover {
          background: rgba(0, 240, 255, 0.2);
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
          text-shadow: 0 0 6px var(--primary);
        }

        /* Right-click context menu. Fixed-positioned, pinned via inline
           style. Uses the same cyber-style as other menus in the app. */
        .storage-ctx-shield {
          position: fixed;
          inset: 0;
          z-index: 9998;
        }
        .storage-ctx-menu {
          position: fixed;
          z-index: 9999;
          min-width: 160px;
          padding: 4px;
          background: var(--bg-secondary);
          border: 1px solid var(--primary);
          border-radius: var(--radius-sm);
          box-shadow: 0 8px 24px rgba(0,0,0,0.6),
                      0 0 16px rgba(0, 240, 255, 0.25);
          animation: ctxMenuIn 0.15s ease-out;
        }
        @keyframes ctxMenuIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: none; }
        }
        .storage-ctx-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-align: left;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .storage-ctx-item:hover {
          background: rgba(0, 240, 255, 0.12);
          color: var(--primary);
          text-shadow: 0 0 6px var(--primary);
        }

        .tooltip-row > span:first-child {
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          min-width: 50px;
        }

        .tooltip-row > span:last-child {
          color: var(--text-primary);
          font-weight: 500;
          text-align: right;
        }

        .tooltip-labels {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: flex-end;
          max-width: 160px;
        }

        .tooltip-label {
          font-size: 10px;
          padding: 2px 6px;
          background: rgba(0, 200, 255, 0.15);
          color: rgba(150, 220, 255, 0.95);
          border: 1px solid rgba(0, 200, 255, 0.3);
          border-radius: 3px;
          font-weight: 500;
          white-space: nowrap;
        }

        .tooltip-label.node {
          background: rgba(100, 180, 100, 0.15);
          color: rgba(150, 220, 150, 0.95);
          border-color: rgba(100, 180, 100, 0.3);
        }

        .no-storage {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        /* Treemap styles - sci-fi themed */
        .treemap-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          height: 100%;
          min-height: 500px;
        }

        .treemap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-sm) var(--spacing-md);
          background: rgba(10, 14, 22, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(60, 80, 120, 0.2);
          border-radius: var(--radius-sm);
        }

        .treemap-title {
          font-size: 14px;
          color: rgba(100, 200, 220, 0.9);
          letter-spacing: 0.12em;
        }

        .treemap-stats {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .treemap-grid {
          flex: 1;
          background: linear-gradient(180deg, rgba(8, 12, 20, 0.8) 0%, rgba(5, 8, 15, 0.9) 100%);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(60, 80, 120, 0.25);
          border-radius: var(--radius-md);
          min-height: 400px;
          overflow: hidden;
          position: relative;
        }

        /* Subtle grid pattern overlay */
        .treemap-grid::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(60, 100, 140, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(60, 100, 140, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          z-index: 0;
        }


        .treemap-grid .d3-treemap {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }

        /* Treemap staggered entry animation - Sci-Fi Holographic Materialization */
        .treemap-node-enter > rect,
        .treemap-node-enter > text,
        .treemap-node-enter > line,
        .treemap-node-enter > path,
        .treemap-node-enter > circle {
          animation: treemap-element-materialize 0.6s ease-out both;
          animation-delay: var(--anim-delay, 0ms);
        }

        @keyframes treemap-element-materialize {
          0% {
            opacity: 0;
            filter: blur(6px) brightness(2);
          }
          20% {
            opacity: 0.2;
            filter: blur(4px) brightness(1.8);
          }
          40% {
            opacity: 0.1;
            filter: blur(8px) brightness(2.5);
          }
          60% {
            opacity: 0.6;
            filter: blur(2px) brightness(1.5);
          }
          80% {
            opacity: 0.9;
            filter: blur(0.5px) brightness(1.2);
          }
          100% {
            opacity: 1;
            filter: none;
          }
        }

        /* Additional hover effects for treemap nodes */
        .d3-treemap g {
          transition: filter 0.3s ease;
        }

        .d3-treemap g:hover {
          filter: drop-shadow(0 0 15px currentColor) brightness(1.2);
        }

        /* Circuit line animation */
        .d3-treemap .circuit-line {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: circuit-draw 1.5s ease-out forwards, circuit-pulse 2s ease-in-out 1.5s infinite;
        }

        @keyframes circuit-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes circuit-pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Energy dot pulsing */
        .d3-treemap .energy-dot {
          animation: energy-dot-pulse 1.5s ease-in-out infinite;
        }

        @keyframes energy-dot-pulse {
          0%, 100% {
            opacity: 0.5;
            r: 2;
          }
          50% {
            opacity: 1;
            r: 3;
          }
        }

        /* Glow pulse animation */
        .d3-treemap .glow-pulse {
          animation: glow-pulse-anim 2.5s ease-in-out infinite;
        }

        @keyframes glow-pulse-anim {
          0%, 100% {
            opacity: 0.4;
            stroke-width: 3;
          }
          50% {
            opacity: 0.7;
            stroke-width: 4;
          }
        }

        /* Data stream border animation */
        .d3-treemap .data-stream {
          animation: data-stream-flow 1.5s linear infinite;
        }

        @keyframes data-stream-flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -24;
          }
        }

        /* Hex pattern overlay for larger blocks */
        .d3-treemap .hex-overlay {
          animation: hex-shimmer 3s ease-in-out infinite;
        }

        @keyframes hex-shimmer {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.12;
          }
        }

        .treemap-legend {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
          align-items: center;
          padding: var(--spacing-sm) var(--spacing-md);
          background: rgba(10, 14, 22, 0.5);
          border: 1px solid rgba(60, 80, 120, 0.15);
          border-radius: var(--radius-sm);
        }

        .treemap-legend .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .treemap-legend .legend-color {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 4px currentColor;
        }

        .treemap-legend .legend-color.running {
          background: linear-gradient(135deg, rgba(0, 255, 200, 0.9), rgba(0, 200, 255, 0.9));
          box-shadow: 0 0 8px rgba(0, 255, 220, 0.5);
        }
        .treemap-legend .legend-color.stopped {
          background: rgba(50, 55, 70, 0.8);
          box-shadow: none;
        }

        .treemap-legend .legend-note {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: var(--spacing-md);
          padding-left: var(--spacing-md);
          border-left: 1px solid rgba(80, 100, 130, 0.3);
        }

        /* Size legend for treemap */
        .treemap-legend .size-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: var(--spacing-md);
          padding-left: var(--spacing-md);
          border-left: 1px solid rgba(80, 100, 130, 0.3);
        }

        .treemap-legend .size-legend .size-box {
          width: 8px;
          height: 8px;
          border-radius: 2px;
        }

        .treemap-legend .size-legend .size-box.large {
          background: rgba(0, 255, 200, 0.8);
          box-shadow: 0 0 6px rgba(0, 255, 200, 0.5);
        }
        .treemap-legend .size-legend .size-box.medium {
          background: rgba(0, 200, 255, 0.8);
          box-shadow: 0 0 6px rgba(0, 200, 255, 0.4);
        }
        .treemap-legend .size-legend .size-box.small {
          background: rgba(180, 100, 255, 0.8);
          box-shadow: 0 0 6px rgba(180, 100, 255, 0.4);
        }
        .treemap-legend .size-legend .size-box.tiny {
          background: rgba(255, 80, 200, 0.8);
          box-shadow: 0 0 6px rgba(255, 80, 200, 0.4);
        }

        /* Common controls */
        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          background: rgba(10, 15, 25, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: var(--radius-sm);
          padding: 6px 10px;
        }

        .search-box svg {
          color: var(--text-muted);
        }

        .search-box input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          outline: none;
          width: 70px;
        }

        .search-box input::placeholder {
          color: var(--text-muted);
        }

        .filter-tabs {
          display: flex;
          gap: 2px;
          background: rgba(10, 15, 25, 0.8);
          padding: 2px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 240, 255, 0.1);
        }

        .filter-tab {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 12px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          text-transform: uppercase;
        }

        .filter-tab svg { flex-shrink: 0; opacity: 0.8; }

        .filter-tab:hover {
          color: var(--text-primary);
        }

        .filter-tab.active {
          background: rgba(0, 240, 255, 0.15);
          color: var(--primary);
        }

        .view-toggle {
          display: flex;
          gap: 2px;
          background: rgba(10, 15, 25, 0.8);
          padding: 2px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 240, 255, 0.1);
        }

        .view-btn-lbl {
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        @media (max-width: 1280px) {
          .view-btn-lbl { display: none; }
        }

        .view-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: var(--spacing-xs) 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .view-btn:hover {
          color: var(--text-primary);
        }

        .view-btn.active {
          background: rgba(0, 240, 255, 0.15);
          color: var(--primary);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .tanks-grid {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .vault-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-controls {
            width: 100%;
            flex-wrap: wrap;
          }

          .search-box {
            flex: 1;
            min-width: 150px;
          }

          .search-box input {
            width: 100%;
          }

          /* Responsive SciFi Indicator */
          .scifi-indicator {
            gap: var(--spacing-sm);
          }

          .indicator-left {
            min-width: auto;
            flex-shrink: 0;
          }

          .indicator-bytes {
            font-size: 12px;
          }

          .indicator-bar-container {
            min-width: 80px;
          }

          .indicator-right {
            min-width: auto;
            flex-shrink: 0;
          }

          .indicator-percent {
            font-size: 20px;
          }

          .indicator-percent .percent-symbol {
            font-size: 13px;
          }
        }

        /* VM Disk Popup Styles */
        .popup-connector-line {
          position: fixed;
          height: 2px;
          background: linear-gradient(90deg, rgba(0, 240, 255, 0.8), rgba(0, 240, 255, 0.4));
          transform-origin: left center;
          z-index: 999;
          pointer-events: none;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }

        .vm-disk-popup {
          position: fixed;
          background: rgba(10, 15, 25, 0.95);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 8px;
          padding: 16px;
          min-width: 320px;
          max-width: 400px;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          animation: popup-appear 0.2s ease-out;
        }

        @keyframes popup-appear {
          from {
            opacity: 0;
            transform: translate(-50%, -100%) translateY(0);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%) translateY(-10px);
          }
        }

        .vm-disk-popup::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.6), transparent);
        }

        .popup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.15);
        }

        .popup-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .popup-title .vm-icon {
          font-size: 18px;
        }

        .popup-title .vm-name {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .popup-title .vm-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .popup-close {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
          line-height: 1;
          transition: color 0.2s;
        }

        .popup-close:hover {
          color: #ff6b6b;
        }

        .popup-status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .node-info {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .popup-section {
          margin-bottom: 14px;
        }

        .section-label {
          font-family: var(--font-display);
          font-size: 10px;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }

        .disk-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .disk-item {
          background: rgba(0, 20, 40, 0.5);
          border: 1px solid rgba(0, 240, 255, 0.1);
          border-radius: 6px;
          padding: 10px;
        }

        .disk-device {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .device-name {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
        }

        .device-format {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.15);
          padding: 2px 8px;
          border-radius: 3px;
          border: 1px solid rgba(0, 240, 255, 0.3);
          text-transform: uppercase;
        }

        .disk-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .disk-storage {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #ff9f43;
        }

        .disk-size {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .disk-bar {
          height: 4px;
          background: rgba(30, 40, 60, 0.8);
          border-radius: 2px;
          overflow: hidden;
        }

        .disk-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f0ff, #00ff88);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }

        .popup-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 240, 255, 0.15);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .popup-total .total-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .disk-summary {
          background: rgba(0, 20, 40, 0.5);
          border: 1px solid rgba(0, 240, 255, 0.1);
          border-radius: 6px;
          padding: 12px;
        }

        .disk-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .disk-summary-row:last-of-type {
          margin-bottom: 10px;
        }

        .disk-label {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .disk-value {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .popup-metrics {
          display: flex;
          gap: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(0, 240, 255, 0.15);
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .disk-usage-section {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 240, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
