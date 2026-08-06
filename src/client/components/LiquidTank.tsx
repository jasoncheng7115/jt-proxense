/**
 * JT-PROXENSE Liquid Tank Component
 * Cyberpunk-style liquid energy tank visualization for storage
 * Features: wave animation, bubbles, color thresholds, boiling effect
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface LiquidTankProps {
  name: string;
  usedBytes: number;
  totalBytes: number;
  type: string;
  isShared?: boolean;
  connectedNodes?: string[];
  nodeName?: string;  // For local storage - show which node it belongs to
  isOffline?: boolean;
  width?: number;
  height?: number;
  animationDelay?: number;  // Staggered animation delay in ms
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobbleOffset: number;
  wobbleSpeed: number;
}

// Per-type palette constrained to the COOL band (green - cyan - blue -
// violet) so the vault reads as one family while types stay tellable
// apart. History: the original Material rainbow (orange NFS / gold RBD)
// fought the cyan theme; the follow-up all-cyan pass was monotonous and
// hard on the eyes. This is the middle ground. Amber and red stay
// RESERVED for the usage-warning overrides below.
const STORAGE_TYPE_COLORS: Record<string, { main: string; glow: string; gradient: [string, string] }> = {
  // ZFS - teal
  zfs:     { main: '#00BCD4', glow: 'rgba(0, 188, 212, 0.3)', gradient: ['#00BCD4', '#00838F'] },
  zfspool: { main: '#00BCD4', glow: 'rgba(0, 188, 212, 0.3)', gradient: ['#00BCD4', '#00838F'] },
  // Dir - muted steel blue (most common type; keep it calm)
  dir:     { main: '#6E9BC5', glow: 'rgba(110, 155, 197, 0.3)', gradient: ['#6E9BC5', '#44607F'] },
  // LVM - azure blue
  lvm:     { main: '#4D9FFF', glow: 'rgba(77, 159, 255, 0.3)', gradient: ['#4D9FFF', '#2161B0'] },
  lvmthin: { main: '#4D9FFF', glow: 'rgba(77, 159, 255, 0.3)', gradient: ['#4D9FFF', '#2161B0'] },
  // iSCSI - indigo
  iscsi:   { main: '#5C6FFF', glow: 'rgba(92, 111, 255, 0.3)', gradient: ['#5C6FFF', '#3340B8'] },
  // NFS / CIFS - spring green
  nfs:     { main: '#00E5A0', glow: 'rgba(0, 229, 160, 0.3)', gradient: ['#00E5A0', '#00936A'] },
  cifs:    { main: '#00E5A0', glow: 'rgba(0, 229, 160, 0.3)', gradient: ['#00E5A0', '#00936A'] },
  // PBS - violet
  pbs:     { main: '#9C6BFF', glow: 'rgba(156, 107, 255, 0.35)', gradient: ['#9C6BFF', '#6234C9'] },
  // GlusterFS - aquamarine
  glusterfs: { main: '#2EE6C8', glow: 'rgba(46, 230, 200, 0.3)', gradient: ['#2EE6C8', '#189E8C'] },
  // RBD / CephFS / default - theme cyan
  rbd:     { main: '#00E5FF', glow: 'rgba(0, 229, 255, 0.3)', gradient: ['#00E5FF', '#00ADB5'] },
  cephfs:  { main: '#00E5FF', glow: 'rgba(0, 229, 255, 0.3)', gradient: ['#00E5FF', '#00ADB5'] },
  default: { main: '#00E5FF', glow: 'rgba(0, 229, 255, 0.3)', gradient: ['#00E5FF', '#00ADB5'] },
};

function getLiquidColor(percent: number, storageType?: string): { main: string; glow: string; gradient: [string, string] } {
  // Usage overrides type — amber from 85%, red from 95%.
  if (percent >= 95) {
    return { main: '#FF4081', glow: 'rgba(255, 64, 129, 0.4)', gradient: ['#FF4081', '#D32F2F'] };
  }
  if (percent >= 85) {
    return { main: '#FFB74D', glow: 'rgba(255, 183, 77, 0.35)', gradient: ['#FFB74D', '#F57C00'] };
  }
  const typeKey = storageType?.toLowerCase() || 'default';
  return STORAGE_TYPE_COLORS[typeKey] || STORAGE_TYPE_COLORS.default;
}

// Format bytes to human readable
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function LiquidTank({
  name,
  usedBytes,
  totalBytes,
  type,
  isShared = false,
  connectedNodes = [],
  nodeName,
  isOffline = false,
  width = 120,
  height = 180,
  animationDelay = 0,
  onClick,
  onHover,
}: LiquidTankProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const bubblesRef = useRef<Bubble[]>([]);
  const timeRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Target percent from actual data
  const targetPercent = totalBytes > 0 ? (usedBytes / totalBytes) * 100 : 0;

  // Animated percent for fill animation on mount
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const animationStartRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(0);
  const fillAnimationDuration = 1200; // Animation duration in ms for initial
  const updateAnimationDuration = 500; // Shorter duration for updates

  // Animate liquid fill on mount with staggered delay
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setAnimationStarted(true);
    }, animationDelay);

    return () => clearTimeout(delayTimer);
  }, [animationDelay]);

  useEffect(() => {
    if (!animationStarted) return;

    // Capture current value as start point
    startValueRef.current = animatedPercent;
    animationStartRef.current = null;
    const startValue = startValueRef.current;
    const endValue = targetPercent;

    // Skip animation if values are the same
    if (Math.abs(startValue - endValue) < 0.1) {
      setAnimatedPercent(endValue);
      return;
    }

    // Use longer duration for initial mount, shorter for updates
    const duration = isInitialMount ? fillAnimationDuration : updateAnimationDuration;

    const animateFill = (timestamp: number) => {
      if (animationStartRef.current === null) {
        animationStartRef.current = timestamp;
      }

      const elapsed = timestamp - animationStartRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutCubic for smooth deceleration
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const currentPercent = startValue + (endValue - startValue) * easedProgress;
      setAnimatedPercent(currentPercent);

      if (progress < 1) {
        requestAnimationFrame(animateFill);
      } else {
        // Mark initial mount as done after first animation completes
        if (isInitialMount) {
          setIsInitialMount(false);
        }
      }
    };

    requestAnimationFrame(animateFill);
  }, [targetPercent, animationStarted]);

  // Use animated percent for liquid level, but target for colors/states
  const percent = animatedPercent;
  const isBoiling = targetPercent >= 85;  // Matches warning threshold
  const isCritical = targetPercent >= 95;
  // Use target percent and storage type for color
  const colors = getLiquidColor(targetPercent, type);

  // Initialize bubbles
  const initBubbles = useCallback((count: number) => {
    const bubbles: Bubble[] = [];
    for (let i = 0; i < count; i++) {
      bubbles.push({
        x: Math.random() * width * 0.6 + width * 0.2,
        y: height + Math.random() * height,
        radius: Math.random() * 4 + 2,
        speed: Math.random() * 1.5 + 0.5,
        wobbleOffset: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
      });
    }
    return bubbles;
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Initialize bubbles
    const bubbleCount = isBoiling ? 15 : 5;
    bubblesRef.current = initBubbles(bubbleCount);

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - timeRef.current;
      timeRef.current = timestamp;
      const time = timestamp * 0.001; // Convert to seconds

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Tank dimensions
      const tankPadding = 8;
      const tankX = tankPadding;
      const tankY = tankPadding + 20; // Leave room for name
      const tankWidth = width - tankPadding * 2;
      const tankHeight = height - tankPadding * 2 - 40; // Leave room for name and stats
      const cornerRadius = 8;
      const liquidLevel = isOffline ? 0.05 : (percent / 100);
      const liquidHeight = tankHeight * liquidLevel;
      const liquidTop = tankY + tankHeight - liquidHeight;

      // Draw tank background (dark interior with gradient)
      const bgGradient = ctx.createLinearGradient(tankX, tankY, tankX, tankY + tankHeight);
      bgGradient.addColorStop(0, '#0a0a12');
      bgGradient.addColorStop(0.5, '#050510');
      bgGradient.addColorStop(1, '#0a0a12');
      ctx.fillStyle = bgGradient;
      ctx.beginPath();
      ctx.roundRect(tankX, tankY, tankWidth, tankHeight, cornerRadius);
      ctx.fill();

      // Draw hexagonal grid pattern
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(tankX, tankY, tankWidth, tankHeight, cornerRadius);
      ctx.clip();

      const hexSize = 12;
      const hexHeight = hexSize * Math.sqrt(3);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.lineWidth = 0.5;

      for (let row = 0; row < tankHeight / hexHeight + 1; row++) {
        for (let col = 0; col < tankWidth / (hexSize * 1.5) + 1; col++) {
          const offsetX = (row % 2) * hexSize * 0.75;
          const cx = tankX + col * hexSize * 1.5 + offsetX;
          const cy = tankY + row * hexHeight * 0.5;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + Math.PI / 6;
            const hx = cx + hexSize * 0.4 * Math.cos(angle);
            const hy = cy + hexSize * 0.4 * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();

      // Draw scanning line effect
      const scanLineY = tankY + ((time * 30) % tankHeight);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(tankX, tankY, tankWidth, tankHeight, cornerRadius);
      ctx.clip();

      const scanGradient = ctx.createLinearGradient(tankX, scanLineY - 15, tankX, scanLineY + 5);
      scanGradient.addColorStop(0, 'transparent');
      scanGradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.15)');
      scanGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(tankX, scanLineY - 15, tankWidth, 20);
      ctx.restore();

      // Draw scale marks with glow
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const y = tankY + tankHeight - (tankHeight * i / 10);
        const markWidth = i % 5 === 0 ? 12 : 6;
        const alpha = i % 5 === 0 ? 0.4 : 0.2;
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(tankX + 2, y);
        ctx.lineTo(tankX + 2 + markWidth, y);
        ctx.stroke();

        // Right side marks
        ctx.beginPath();
        ctx.moveTo(tankX + tankWidth - 2, y);
        ctx.lineTo(tankX + tankWidth - 2 - markWidth, y);
        ctx.stroke();
      }

      // Draw energy pulse lines on sides
      const pulseOffset = (time * 50) % tankHeight;
      for (let i = 0; i < 3; i++) {
        const pulseY = tankY + ((pulseOffset + i * tankHeight / 3) % tankHeight);
        const pulseAlpha = 0.3 + Math.sin(time * 3 + i) * 0.2;

        // Left pulse
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 240, 255, ${pulseAlpha})`;
        ctx.lineWidth = 2;
        ctx.moveTo(tankX, pulseY);
        ctx.lineTo(tankX + 4, pulseY);
        ctx.stroke();

        // Right pulse
        ctx.beginPath();
        ctx.moveTo(tankX + tankWidth, pulseY);
        ctx.lineTo(tankX + tankWidth - 4, pulseY);
        ctx.stroke();
      }

      if (!isOffline && liquidLevel > 0) {
        // Create liquid gradient
        const gradient = ctx.createLinearGradient(0, liquidTop, 0, tankY + tankHeight);
        gradient.addColorStop(0, colors.gradient[0]);
        gradient.addColorStop(1, colors.gradient[1]);

        // Wave parameters
        const waveAmplitude = isBoiling ? 6 : 3;
        const waveFrequency = 0.05;
        const waveSpeed = isBoiling ? 0.1 : 0.05;
        const wave2Offset = Math.PI / 3;

        // Draw liquid with wave effect
        ctx.save();
        ctx.beginPath();
        ctx.rect(tankX, tankY, tankWidth, tankHeight);
        ctx.clip();

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(tankX, tankY + tankHeight);

        // Draw wave top
        for (let x = 0; x <= tankWidth; x += 2) {
          const wave1 = Math.sin((x * waveFrequency) + (time * waveSpeed * 60)) * waveAmplitude;
          const wave2 = Math.sin((x * waveFrequency * 1.5) + (time * waveSpeed * 40) + wave2Offset) * (waveAmplitude * 0.5);
          const y = liquidTop + wave1 + wave2;
          if (x === 0) {
            ctx.moveTo(tankX + x, y);
          } else {
            ctx.lineTo(tankX + x, y);
          }
        }

        ctx.lineTo(tankX + tankWidth, tankY + tankHeight);
        ctx.lineTo(tankX, tankY + tankHeight);
        ctx.closePath();
        ctx.fill();

        // Draw wave highlight (top edge glow)
        ctx.strokeStyle = colors.glow;
        ctx.lineWidth = 2;
        ctx.shadowColor = colors.main;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        for (let x = 0; x <= tankWidth; x += 2) {
          const wave1 = Math.sin((x * waveFrequency) + (time * waveSpeed * 60)) * waveAmplitude;
          const wave2 = Math.sin((x * waveFrequency * 1.5) + (time * waveSpeed * 40) + wave2Offset) * (waveAmplitude * 0.5);
          const y = liquidTop + wave1 + wave2;
          if (x === 0) {
            ctx.moveTo(tankX + x, y);
          } else {
            ctx.lineTo(tankX + x, y);
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw bubbles
        bubblesRef.current.forEach((bubble, i) => {
          // Only draw bubbles that are within the liquid
          if (bubble.y > liquidTop && bubble.y < tankY + tankHeight) {
            const wobble = Math.sin(time * bubble.wobbleSpeed * 60 + bubble.wobbleOffset) * 3;

            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.2})`;
            ctx.beginPath();
            ctx.arc(bubble.x + wobble, bubble.y, bubble.radius, 0, Math.PI * 2);
            ctx.fill();

            // Bubble highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(bubble.x + wobble - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
          }

          // Update bubble position
          bubble.y -= bubble.speed * (isBoiling ? 2 : 1);

          // Reset bubble if it reaches the top
          if (bubble.y < liquidTop - 10) {
            bubble.y = tankY + tankHeight + Math.random() * 20;
            bubble.x = tankX + Math.random() * tankWidth * 0.6 + tankWidth * 0.2;
          }
        });

        ctx.restore();

        // Holographic shimmer effect on liquid
        const shimmerCount = 3;
        for (let i = 0; i < shimmerCount; i++) {
          const shimmerX = tankX + (tankWidth * (i + 0.5)) / shimmerCount;
          const shimmerPhase = time * 2 + i * Math.PI * 0.7;
          const shimmerAlpha = (Math.sin(shimmerPhase) * 0.5 + 0.5) * 0.3;

          if (shimmerAlpha > 0.1) {
            const shimmerGradient = ctx.createLinearGradient(
              shimmerX - 8, liquidTop,
              shimmerX + 8, tankY + tankHeight
            );
            shimmerGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
            shimmerGradient.addColorStop(0.3, `rgba(255, 255, 255, ${shimmerAlpha})`);
            shimmerGradient.addColorStop(0.7, `rgba(255, 255, 255, ${shimmerAlpha * 0.5})`);
            shimmerGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.fillStyle = shimmerGradient;
            ctx.fillRect(shimmerX - 8, liquidTop, 16, liquidHeight);
          }
        }

        // Data particles floating in liquid
        const particleCount = Math.floor(liquidLevel * 8);
        for (let i = 0; i < particleCount; i++) {
          const seed = i * 137.5;
          const px = tankX + 10 + ((seed * 7) % (tankWidth - 20));
          const baseY = liquidTop + 10 + ((seed * 13) % (liquidHeight - 20));
          const py = baseY + Math.sin(time * 2 + seed) * 5;

          // Small glowing dot
          const particleAlpha = 0.4 + Math.sin(time * 3 + seed) * 0.3;
          ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Tiny connecting lines between nearby particles
          if (i > 0 && i % 3 === 0) {
            const prevSeed = (i - 1) * 137.5;
            const ppx = tankX + 10 + ((prevSeed * 7) % (tankWidth - 20));
            const ppy = liquidTop + 10 + ((prevSeed * 13) % (liquidHeight - 20)) + Math.sin(time * 2 + prevSeed) * 5;
            const dist = Math.sqrt((px - ppx) ** 2 + (py - ppy) ** 2);
            if (dist < 30) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / 30)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(ppx, ppy);
              ctx.stroke();
            }
          }
        }

        // Steam effect for boiling
        if (isBoiling) {
          for (let i = 0; i < 8; i++) {
            const steamX = tankX + tankWidth * 0.15 + Math.random() * tankWidth * 0.7;
            const steamY = liquidTop - Math.random() * 25;
            const steamSize = Math.random() * 4 + 1;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.random() * 0.15})`;
            ctx.beginPath();
            ctx.arc(steamX, steamY, steamSize, 0, Math.PI * 2);
            ctx.fill();
          }

          // Warning flicker effect
          if (Math.sin(time * 10) > 0.7) {
            ctx.fillStyle = 'rgba(255, 100, 0, 0.05)';
            ctx.fillRect(tankX, tankY, tankWidth, tankHeight);
          }
        }
      }

      // Draw tank frame (neon border with double line effect)
      const borderColor = isOffline ? '#ff0040' : (isCritical ? '#ff0040' : colors.main);
      const glowIntensity = isCritical ? (Math.sin(time * 5) * 0.3 + 0.7) : 1;

      // Outer glow
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 3;
      ctx.shadowColor = borderColor;
      ctx.shadowBlur = isHovered ? 20 : 12 * glowIntensity;
      ctx.beginPath();
      ctx.roundRect(tankX, tankY, tankWidth, tankHeight, cornerRadius);
      ctx.stroke();

      // Inner line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `${borderColor}60`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(tankX + 3, tankY + 3, tankWidth - 6, tankHeight - 6, cornerRadius - 2);
      ctx.stroke();

      // Draw corner accents (larger, more dramatic)
      const accentSize = 16;
      const accentWidth = 3;
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = accentWidth;
      ctx.shadowColor = borderColor;
      ctx.shadowBlur = 8;

      // Top-left corner bracket
      ctx.beginPath();
      ctx.moveTo(tankX - 2, tankY + accentSize);
      ctx.lineTo(tankX - 2, tankY - 2);
      ctx.lineTo(tankX + accentSize, tankY - 2);
      ctx.stroke();

      // Top-right corner bracket
      ctx.beginPath();
      ctx.moveTo(tankX + tankWidth - accentSize, tankY - 2);
      ctx.lineTo(tankX + tankWidth + 2, tankY - 2);
      ctx.lineTo(tankX + tankWidth + 2, tankY + accentSize);
      ctx.stroke();

      // Bottom-left corner bracket
      ctx.beginPath();
      ctx.moveTo(tankX - 2, tankY + tankHeight - accentSize);
      ctx.lineTo(tankX - 2, tankY + tankHeight + 2);
      ctx.lineTo(tankX + accentSize, tankY + tankHeight + 2);
      ctx.stroke();

      // Bottom-right corner bracket
      ctx.beginPath();
      ctx.moveTo(tankX + tankWidth - accentSize, tankY + tankHeight + 2);
      ctx.lineTo(tankX + tankWidth + 2, tankY + tankHeight + 2);
      ctx.lineTo(tankX + tankWidth + 2, tankY + tankHeight - accentSize);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Draw corner dots (animated)
      const dotPulse = (Math.sin(time * 4) * 0.5 + 0.5);
      const dotSize = 2 + dotPulse;
      ctx.fillStyle = borderColor;
      ctx.shadowColor = borderColor;
      ctx.shadowBlur = 6;

      // Corner dots
      [[tankX - 2, tankY - 2], [tankX + tankWidth + 2, tankY - 2],
       [tankX - 2, tankY + tankHeight + 2], [tankX + tankWidth + 2, tankY + tankHeight + 2]
      ].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      // Draw percentage indicator bar on the right side
      if (!isOffline) {
        const barWidth = 4;
        const barX = tankX + tankWidth + 6;
        const barHeight = tankHeight;
        const filledHeight = barHeight * (percent / 100);

        // Bar background
        ctx.fillStyle = 'rgba(0, 20, 40, 0.8)';
        ctx.fillRect(barX, tankY, barWidth, barHeight);

        // Filled portion
        const barGradient = ctx.createLinearGradient(0, tankY + barHeight - filledHeight, 0, tankY + barHeight);
        barGradient.addColorStop(0, colors.main);
        barGradient.addColorStop(1, colors.gradient[1]);
        ctx.fillStyle = barGradient;
        ctx.fillRect(barX, tankY + barHeight - filledHeight, barWidth, filledHeight);

        // Bar border
        ctx.strokeStyle = `${borderColor}40`;
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, tankY, barWidth, barHeight);
      }

      // Draw offline crack effect
      if (isOffline) {
        ctx.strokeStyle = '#ff0040';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const crackStartX = tankX + tankWidth * 0.3;
        const crackStartY = tankY + tankHeight * 0.3;
        ctx.moveTo(crackStartX, crackStartY);
        ctx.lineTo(crackStartX + 10, crackStartY + 15);
        ctx.lineTo(crackStartX + 5, crackStartY + 25);
        ctx.lineTo(crackStartX + 15, crackStartY + 40);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(crackStartX + 10, crackStartY + 15);
        ctx.lineTo(crackStartX + 20, crackStartY + 20);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [width, height, percent, isBoiling, isCritical, isOffline, colors, isHovered, initBubbles]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  return (
    <div
      className={`liquid-tank ${isShared ? 'shared' : 'local'} ${isCritical ? 'critical' : ''} ${isOffline ? 'offline' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tank-header">
        <div
          className={`tank-name-tag ${isOffline ? 'offline' : ''}`}
          style={!isOffline ? {
            color: colors.main,
            background: `${colors.main}15`,
            borderColor: `${colors.main}50`,
          } : undefined}
        >
          {name}
        </div>
        <div className={`tank-type-tag type-${type.toLowerCase()}`}>{type}</div>
      </div>

      <canvas
        ref={canvasRef}
        style={{ width, height: height - 50, display: 'block' }}
      />

      <div className="tank-stats">
        <div
          className={`tank-percent ${isCritical ? 'critical' : (isBoiling ? 'warning' : '')}`}
          style={{
            color: isOffline ? '#FF4081' : colors.main,
            textShadow: isOffline ? 'none' : `0 0 10px ${colors.glow}`,
          }}
        >
          {isOffline ? 'OFFLINE' : `${targetPercent.toFixed(1)}%`}
        </div>
        <div className="tank-capacity">
          {formatBytes(usedBytes)} / {formatBytes(totalBytes)}
        </div>
      </div>

      {isShared && connectedNodes.length > 0 && (
        <div className="tank-nodes">
          {connectedNodes.map((node, i) => (
            <span key={i} className="node-tag">{node}</span>
          ))}
        </div>
      )}

      {!isShared && nodeName && (
        <div className="tank-node-label">{nodeName}</div>
      )}

      <style>{`
        .liquid-tank {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 12px;
          background: rgba(10, 25, 41, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 155px;
          overflow: visible;
        }

        /* Corner accents - FUI style */
        .liquid-tank::before,
        .liquid-tank::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: rgba(0, 229, 255, 0.3);
          border-style: solid;
          transition: border-color 0.2s;
        }

        .liquid-tank::before {
          top: -1px;
          left: -1px;
          border-width: 1px 0 0 1px;
        }

        .liquid-tank::after {
          bottom: -1px;
          right: -1px;
          border-width: 0 1px 1px 0;
        }

        .liquid-tank:hover {
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .liquid-tank:hover::before,
        .liquid-tank:hover::after {
          border-color: rgba(0, 229, 255, 0.6);
        }

        /* Local storage - Cyan theme */
        .liquid-tank.local {
          border-color: rgba(0, 229, 255, 0.12);
          background: rgba(10, 25, 41, 0.65);
        }

        .liquid-tank.local::before,
        .liquid-tank.local::after {
          border-color: rgba(0, 229, 255, 0.25);
        }

        .liquid-tank.local:hover {
          border-color: rgba(0, 229, 255, 0.35);
        }

        /* Shared storage - Amber theme */
        .liquid-tank.shared {
          border-color: rgba(255, 183, 77, 0.15);
          background: rgba(20, 18, 12, 0.65);
        }

        .liquid-tank.shared::before,
        .liquid-tank.shared::after {
          border-color: rgba(255, 183, 77, 0.25);
        }

        .liquid-tank.shared:hover {
          border-color: rgba(255, 183, 77, 0.4);
        }

        .liquid-tank.shared:hover::before,
        .liquid-tank.shared:hover::after {
          border-color: rgba(255, 183, 77, 0.6);
        }

        /* Critical state - Magenta pulse */
        .liquid-tank.critical {
          border-color: rgba(255, 64, 129, 0.3);
          animation: criticalPulse 2s ease-in-out infinite;
        }

        .liquid-tank.critical::before,
        .liquid-tank.critical::after {
          border-color: rgba(255, 64, 129, 0.5);
        }

        @keyframes criticalPulse {
          0%, 100% { border-color: rgba(255, 64, 129, 0.25); }
          50% { border-color: rgba(255, 64, 129, 0.5); }
        }

        .liquid-tank.offline {
          border-color: rgba(255, 64, 129, 0.2);
          opacity: 0.6;
        }

        .tank-header {
          text-align: center;
          margin-bottom: 6px;
          width: 100%;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        /* Name tag - dynamic color based on storage type */
        .tank-name-tag {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid;
        }

        .tank-name-tag.offline {
          color: #FF4081 !important;
          background: rgba(255, 64, 129, 0.1) !important;
          border-color: rgba(255, 64, 129, 0.4) !important;
        }

        .tank-type-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 6px;
          border-radius: 2px;
          border: 1px solid;
        }

        /* Storage type colors - subtle border style */
        .tank-type-tag.type-rbd,
        .tank-type-tag.type-cephfs {
          color: #FFB74D;
          background: rgba(255, 183, 77, 0.1);
          border-color: rgba(255, 183, 77, 0.25);
        }

        .tank-type-tag.type-nfs {
          color: #FF9800;
          background: rgba(255, 152, 0, 0.1);
          border-color: rgba(255, 152, 0, 0.25);
        }

        .tank-type-tag.type-iscsi,
        .tank-type-tag.type-zfs-over-iscsi {
          color: #29B6F6;
          background: rgba(41, 182, 246, 0.1);
          border-color: rgba(41, 182, 246, 0.25);
        }

        .tank-type-tag.type-lvm,
        .tank-type-tag.type-lvmthin {
          color: #FFCA28;
          background: rgba(255, 202, 40, 0.1);
          border-color: rgba(255, 202, 40, 0.25);
        }

        /* ZFS - Teal (primary storage) */
        .tank-type-tag.type-zfspool,
        .tank-type-tag.type-zfs {
          color: #26A69A;
          background: rgba(38, 166, 154, 0.1);
          border-color: rgba(38, 166, 154, 0.25);
        }

        .tank-type-tag.type-dir {
          color: #90A4AE;
          background: rgba(144, 164, 174, 0.1);
          border-color: rgba(144, 164, 174, 0.25);
        }

        /* PBS - Purple (backup) */
        .tank-type-tag.type-pbs {
          color: #BA68C8;
          background: rgba(186, 104, 200, 0.1);
          border-color: rgba(186, 104, 200, 0.25);
        }

        .tank-type-tag.type-glusterfs {
          color: #FF7043;
          background: rgba(255, 112, 67, 0.1);
          border-color: rgba(255, 112, 67, 0.25);
        }

        .tank-stats {
          text-align: center;
          margin-top: 6px;
          position: relative;
          z-index: 1;
        }

        /* Data hierarchy - percentage large and bright */
        .tank-percent {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin-bottom: 2px;
        }

        /* Capacity smaller and gray */
        .tank-capacity {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #888;
          display: block;
          letter-spacing: 0.02em;
        }

        .tank-nodes {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: center;
          margin-top: 8px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* Node tags for shared storage - amber theme */
        .node-tag {
          font-family: var(--font-mono);
          font-size: 8px;
          padding: 2px 6px;
          background: rgba(255, 183, 77, 0.1);
          border: 1px solid rgba(255, 183, 77, 0.2);
          border-radius: 2px;
          color: #FFB74D;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
        }

        .node-tag:hover {
          background: rgba(255, 183, 77, 0.18);
          border-color: rgba(255, 183, 77, 0.4);
        }

        /* Node label for local storage - cyan theme */
        .tank-node-label {
          font-family: var(--font-mono);
          font-size: 9px;
          margin-top: 6px;
          padding: 3px 8px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: 2px;
          color: #00E5FF;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }

        .tank-node-label::before {
          content: '+';
          margin-right: 4px;
          font-size: 8px;
          color: #00E5FF;
          opacity: 0.5;
        }

      `}</style>
    </div>
  );
}
