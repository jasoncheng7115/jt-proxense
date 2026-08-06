/**
 * JT-PROXENSE ECG Monitor Component
 * Cyberpunk-style heartbeat visualization for node metrics
 * Single metric per ECG with sweep-style animation
 */

import React, { useRef, useEffect, useCallback, useState } from 'react';

interface ECGTraceProps {
  value: number;        // Current value 0-100
  label: string;        // Label (CPU, MEM, DISK)
  color: string;        // Trace color
  isOnline: boolean;    // Node online status
  width?: number;
  height?: number;
  isPaused?: boolean;   // Pause animation
}

// Generate heartbeat waveform based on value intensity
function generateHeartbeat(
  value: number,
  position: number,  // 0-1 position within beat cycle
  intensity: number  // 0-1 overall intensity
): number {
  // Normalize value
  const norm = Math.min(value, 100) / 100;

  // Base amplitude scales with value
  const baseAmp = 0.1 + norm * 0.6;

  // PQRST wave components with position in cycle
  const t = position;

  // Baseline with slight noise
  let y = (Math.random() - 0.5) * 0.02;

  // P wave (small bump) - around 10-20% of cycle
  if (t > 0.08 && t < 0.22) {
    const pt = (t - 0.08) / 0.14;
    y += baseAmp * 0.2 * Math.sin(pt * Math.PI);
  }

  // QRS complex (sharp spike) - around 25-40% of cycle
  if (t > 0.24 && t < 0.40) {
    const qt = (t - 0.24) / 0.16;
    // Q dip
    if (qt < 0.2) {
      y -= baseAmp * 0.15 * Math.sin(qt * 5 * Math.PI);
    }
    // R spike (main peak)
    else if (qt < 0.5) {
      const rt = (qt - 0.2) / 0.3;
      y += baseAmp * (1 + norm * 0.5) * Math.sin(rt * Math.PI);
    }
    // S dip
    else if (qt < 0.7) {
      const st = (qt - 0.5) / 0.2;
      y -= baseAmp * 0.25 * Math.sin(st * Math.PI);
    }
  }

  // T wave (rounded bump) - around 50-70% of cycle
  if (t > 0.48 && t < 0.72) {
    const tt = (t - 0.48) / 0.24;
    y += baseAmp * 0.35 * Math.sin(tt * Math.PI);
  }

  return y * intensity;
}

export function ECGTrace({
  value,
  label,
  color,
  isOnline,
  width = 180,
  height = 35,
  isPaused = false,
}: ECGTraceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dataRef = useRef<number[]>([]);
  const cursorRef = useRef<number>(0);
  const beatPhaseRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const shouldAnimateRef = useRef<boolean>(!isPaused);
  const isInitializedRef = useRef<boolean>(false);

  // Calculate BPM based on value (higher value = faster heartbeat)
  const bpm = 50 + (value / 100) * 50; // 50-100 BPM range
  const beatDuration = 60000 / bpm; // ms per beat

  // Pixels per second (fixed speed like real ECG)
  const pixelsPerSecond = 12; // Very slow sweep speed

  // Keep ref in sync with isPaused prop
  useEffect(() => {
    shouldAnimateRef.current = !isPaused;
  }, [isPaused]);

  // Draw function - renders current state without advancing
  const drawCurrentState = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(5, 8, 15, 0.95)';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 0.5;

    // Horizontal grid lines
    for (let y = 0; y < height; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let x = 0; x < width; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw waveform
    const centerY = height / 2;
    const amplitude = height * 0.45;
    // Wave color changes based on value thresholds
    const getWaveColor = () => {
      if (!isOnline) return '#ff0040';
      if (value > 90) return '#ff0040';  // Danger red
      if (value > 70) return '#ff6b00';  // Warning orange
      return color;
    };
    const waveColor = getWaveColor();

    // Glow effect
    ctx.shadowColor = waveColor;
    ctx.shadowBlur = 6;
    ctx.strokeStyle = waveColor;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    let started = false;

    for (let i = 0; i < width; i++) {
      // Skip the gap area near cursor
      const distFromCursor = (i - cursorRef.current + width) % width;
      if (distFromCursor < 8 && distFromCursor > 0) continue;

      const y = centerY - dataRef.current[i] * amplitude;

      if (!started) {
        ctx.moveTo(i, y);
        started = true;
      } else {
        ctx.lineTo(i, y);
      }
    }
    ctx.stroke();

    // Draw cursor line (sweep indicator)
    ctx.shadowBlur = 0;
    ctx.strokeStyle = `${waveColor}60`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cursorRef.current, 0);
    ctx.lineTo(cursorRef.current, height);
    ctx.stroke();

    // Cursor glow
    const gradient = ctx.createLinearGradient(cursorRef.current - 15, 0, cursorRef.current, 0);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, `${waveColor}30`);
    ctx.fillStyle = gradient;
    ctx.fillRect(cursorRef.current - 15, 0, 15, height);
  }, [width, height, value, isOnline, color]);

  // Canvas initialization - only when size changes
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
    ctxRef.current = ctx;

    // Initialize data buffer
    if (dataRef.current.length !== width) {
      dataRef.current = new Array(width).fill(0);
    }

    isInitializedRef.current = true;

    // Draw initial state
    drawCurrentState();
  }, [width, height, drawCurrentState]);

  // Animation loop - separate from initialization
  useEffect(() => {
    if (!isInitializedRef.current) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Calculate how many pixels to advance
      const pixelsToAdvance = (deltaTime / 1000) * pixelsPerSecond;

      // Update beat phase
      beatPhaseRef.current += deltaTime / beatDuration;
      if (beatPhaseRef.current >= 1) {
        beatPhaseRef.current -= 1;
      }

      // Generate new data points
      const newPixels = Math.ceil(pixelsToAdvance);
      for (let i = 0; i < newPixels; i++) {
        const phase = beatPhaseRef.current + (i / newPixels) * (deltaTime / beatDuration);
        const normalizedPhase = phase % 1;

        let newValue: number;
        if (isOnline) {
          newValue = generateHeartbeat(value, normalizedPhase, 1);
        } else {
          // Flatline with tiny noise
          newValue = (Math.random() - 0.5) * 0.01;
        }

        // Update cursor position (sweep style)
        cursorRef.current = (cursorRef.current + 1) % width;
        dataRef.current[cursorRef.current] = newValue;

        // Clear ahead of cursor (creates the sweep gap effect)
        const clearAhead = (cursorRef.current + 1) % width;
        for (let j = 0; j < 8; j++) {
          const clearIdx = (clearAhead + j) % width;
          dataRef.current[clearIdx] = 0;
        }
      }

      // Draw current state
      drawCurrentState();

      // Only schedule next frame if not paused
      if (shouldAnimateRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation if not paused
    if (!isPaused) {
      lastTimeRef.current = 0; // Reset time tracking
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [width, height, value, isOnline, beatDuration, pixelsPerSecond, isPaused, drawCurrentState]);

  // Determine color based on value
  const getValueColor = () => {
    if (!isOnline) return '#ff0040';
    if (value > 90) return '#ff0040';
    if (value > 70) return '#ff6b00';
    return color;
  };

  return (
    <div className="ecg-trace">
      <div className="ecg-trace-header">
        <span className="ecg-trace-label" style={{ color: getValueColor() }}>{label}</span>
        <span className="ecg-trace-value" style={{ color: getValueColor() }}>
          {isOnline ? `${Math.round(value)}%` : '--'}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        style={{ width, height, display: 'block' }}
      />

      <style>{`
        .ecg-trace {
          position: relative;
        }

        .ecg-trace-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2px 4px;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(0, 240, 255, 0.2);
        }

        .ecg-trace-label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-shadow: 0 0 6px currentColor;
        }

        .ecg-trace-value {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          text-shadow: 0 0 6px currentColor;
        }

        .ecg-trace canvas {
          display: block;
        }
      `}</style>
    </div>
  );
}

// Combined ECG Monitor with 3 traces for a node
interface ECGMonitorProps {
  cpu: number;
  memory: number;
  diskIO: number;
  isOnline: boolean;
  isPaused?: boolean;
}

export function ECGMonitor({
  cpu,
  memory,
  diskIO,
  isOnline,
  isPaused = false,
}: ECGMonitorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(180);

  // Measure container width on mount and resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      const w = container.clientWidth - 6; // Account for padding
      if (w > 0) setWidth(w);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="ecg-monitor-stack" ref={containerRef}>
      <ECGTrace
        value={cpu}
        label="CPU"
        color="#00f0ff"
        isOnline={isOnline}
        width={width}
        height={32}
        isPaused={isPaused}
      />
      <ECGTrace
        value={memory}
        label="MEM"
        color="#00ff88"
        isOnline={isOnline}
        width={width}
        height={32}
        isPaused={isPaused}
      />
      <ECGTrace
        value={diskIO}
        label="IOW"
        color="#ffd700"
        isOnline={isOnline}
        width={width}
        height={32}
        isPaused={isPaused}
      />

      <style>{`
        .ecg-monitor-stack {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(5, 10, 20, 0.9);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
          padding: 2px;
        }

        .ecg-monitor-stack .ecg-trace {
          border-radius: 2px;
          overflow: hidden;
          background: rgba(0, 5, 15, 0.8);
        }

        /* Scanline effect */
        .ecg-monitor-stack::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
