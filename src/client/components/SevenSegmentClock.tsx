/**
 * Seven Segment Clock Component
 * Shows last data update time with sci-fi style
 * Based on jt-gelflow implementation
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';

interface Props {
  timestamp: number | null;  // Timestamp in seconds
  connected?: boolean;
}

// Seven-segment display digit patterns (a-g segments)
const DIGITS: Record<string, boolean[]> = {
  '0': [true, true, true, true, true, true, false],
  '1': [false, true, true, false, false, false, false],
  '2': [true, true, false, true, true, false, true],
  '3': [true, true, true, true, false, false, true],
  '4': [false, true, true, false, false, true, true],
  '5': [true, false, true, true, false, true, true],
  '6': [true, false, true, true, true, true, true],
  '7': [true, true, true, false, false, false, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true],
  '-': [false, false, false, false, false, false, true],
  ' ': [false, false, false, false, false, false, false],
};

function SevenSegmentDigit({ digit, size = 16, color = '#00f0ff', dimColor = 'rgba(0, 240, 255, 0.08)', glow = false }: {
  digit: string;
  size?: number;
  color?: string;
  dimColor?: string;
  glow?: boolean;
}) {
  const segments = DIGITS[digit] || DIGITS[' '];
  const w = size;
  const h = size * 1.8;
  const thickness = size * 0.15;
  const gap = size * 0.05;
  const glowIntensity = glow ? size * 0.4 : size * 0.15;

  const segmentPaths = [
    `M ${gap + thickness} ${gap} L ${w - gap - thickness} ${gap} L ${w - gap - thickness * 0.3} ${thickness * 0.7 + gap} L ${gap + thickness * 0.3} ${thickness * 0.7 + gap} Z`,
    `M ${w - gap} ${gap + thickness} L ${w - gap} ${h / 2 - gap} L ${w - gap - thickness * 0.7} ${h / 2 - gap - thickness * 0.3} L ${w - gap - thickness * 0.7} ${gap + thickness + thickness * 0.3} Z`,
    `M ${w - gap} ${h / 2 + gap} L ${w - gap} ${h - gap - thickness} L ${w - gap - thickness * 0.7} ${h - gap - thickness - thickness * 0.3} L ${w - gap - thickness * 0.7} ${h / 2 + gap + thickness * 0.3} Z`,
    `M ${gap + thickness} ${h - gap} L ${w - gap - thickness} ${h - gap} L ${w - gap - thickness * 0.3} ${h - thickness * 0.7 - gap} L ${gap + thickness * 0.3} ${h - thickness * 0.7 - gap} Z`,
    `M ${gap} ${h / 2 + gap} L ${gap} ${h - gap - thickness} L ${gap + thickness * 0.7} ${h - gap - thickness - thickness * 0.3} L ${gap + thickness * 0.7} ${h / 2 + gap + thickness * 0.3} Z`,
    `M ${gap} ${gap + thickness} L ${gap} ${h / 2 - gap} L ${gap + thickness * 0.7} ${h / 2 - gap - thickness * 0.3} L ${gap + thickness * 0.7} ${gap + thickness + thickness * 0.3} Z`,
    `M ${gap + thickness * 0.5} ${h / 2} L ${gap + thickness} ${h / 2 - thickness * 0.4} L ${w - gap - thickness} ${h / 2 - thickness * 0.4} L ${w - gap - thickness * 0.5} ${h / 2} L ${w - gap - thickness} ${h / 2 + thickness * 0.4} L ${gap + thickness} ${h / 2 + thickness * 0.4} Z`,
  ];

  return (
    <svg width={w} height={h} style={{ display: 'inline-block' }}>
      {segmentPaths.map((path, i) => (
        <path
          key={i}
          d={path}
          fill={segments[i] ? color : dimColor}
          style={{
            filter: segments[i] ? `drop-shadow(0 0 ${glowIntensity}px ${color})` : 'none',
            transition: 'fill 0.03s ease-out',
          }}
        />
      ))}
    </svg>
  );
}

function Colon({ size = 16, color = '#00f0ff', dim = false }: { size?: number; color?: string; dim?: boolean }) {
  const w = size * 0.4;
  const h = size * 1.8;
  const dotSize = size * 0.15;
  const opacity = dim ? 0.15 : 1;

  return (
    <svg width={w} height={h} style={{ display: 'inline-block' }}>
      <circle cx={w / 2} cy={h * 0.3} r={dotSize} fill={color} opacity={opacity}
        style={{ filter: dim ? 'none' : `drop-shadow(0 0 ${size * 0.1}px ${color})` }} />
      <circle cx={w / 2} cy={h * 0.7} r={dotSize} fill={color} opacity={opacity}
        style={{ filter: dim ? 'none' : `drop-shadow(0 0 ${size * 0.1}px ${color})` }} />
    </svg>
  );
}

// Helper to format timestamp to time parts
function formatTimestamp(ts: number): { hours: string; minutes: string; seconds: string } {
  const date = new Date(ts * 1000); // Convert from seconds to milliseconds
  return {
    hours: date.getHours().toString().padStart(2, '0'),
    minutes: date.getMinutes().toString().padStart(2, '0'),
    seconds: date.getSeconds().toString().padStart(2, '0'),
  };
}

// Generate random time display
function randomTime(): { hours: string; minutes: string; seconds: string } {
  return {
    hours: Math.floor(Math.random() * 24).toString().padStart(2, '0'),
    minutes: Math.floor(Math.random() * 60).toString().padStart(2, '0'),
    seconds: Math.floor(Math.random() * 60).toString().padStart(2, '0'),
  };
}

export function SevenSegmentClock({ timestamp, connected = true }: Props) {
  const [displayTime, setDisplayTime] = useState({ hours: '  ', minutes: '  ', seconds: '  ' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstSpin, setIsFirstSpin] = useState(false);

  const hasReceivedFirstEventRef = useRef(false);
  const spinAnimationRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastDisplayedTimestampRef = useRef<number | null>(null);

  // Color based on connection status
  const color = connected ? '#00f0ff' : '#ff4444';
  const dimColor = connected ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 68, 68, 0.08)';
  const isBlank = displayTime.hours === '  ';

  // Update display with a specific timestamp
  const updateDisplay = useCallback((ts: number) => {
    const time = formatTimestamp(ts);
    setDisplayTime(time);
    lastDisplayedTimestampRef.current = ts;
  }, []);

  // Handle first event - do the rapid spin animation
  const startFirstSpinAnimation = useCallback((targetTimestamp: number) => {
    if (spinAnimationRef.current) {
      clearInterval(spinAnimationRef.current);
    }

    setIsFirstSpin(true);
    setIsAnimating(true);

    let spinCount = 0;
    const totalSpins = 20;
    const spinSpeed = 50;

    const targetRef = { current: targetTimestamp };

    spinAnimationRef.current = setInterval(() => {
      spinCount++;

      if (spinCount < totalSpins) {
        setDisplayTime(randomTime());
      } else {
        if (spinAnimationRef.current) {
          clearInterval(spinAnimationRef.current);
          spinAnimationRef.current = null;
        }

        const finalTime = formatTimestamp(targetRef.current);
        setDisplayTime(finalTime);
        lastDisplayedTimestampRef.current = targetRef.current;

        setIsFirstSpin(false);
        setIsAnimating(false);
      }
    }, spinSpeed);

    return (newTs: number) => {
      targetRef.current = newTs;
    };
  }, []);

  const spinUpdateRef = useRef<((ts: number) => void) | null>(null);

  // Main effect to handle timestamp changes
  useEffect(() => {
    if (timestamp === null) {
      if (!hasReceivedFirstEventRef.current) {
        setDisplayTime({ hours: '  ', minutes: '  ', seconds: '  ' });
      }
      return;
    }

    if (!hasReceivedFirstEventRef.current) {
      hasReceivedFirstEventRef.current = true;
      spinUpdateRef.current = startFirstSpinAnimation(timestamp);
      return;
    }

    if (spinAnimationRef.current && spinUpdateRef.current) {
      spinUpdateRef.current(timestamp);
      return;
    }

    if (lastDisplayedTimestampRef.current !== timestamp) {
      updateDisplay(timestamp);
    }
  }, [timestamp, startFirstSpinAnimation, updateDisplay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (spinAnimationRef.current) {
        clearInterval(spinAnimationRef.current);
      }
    };
  }, []);

  const size = 14;

  return (
    <div className={`seven-segment-clock ${isAnimating ? 'pulse' : ''} ${isFirstSpin ? 'first-spin' : ''} ${!connected ? 'disconnected' : ''}`}>
      <div className="clock-label">
        {/* Minimal sci-fi telemetry-pulse glyph (was a download arrow). */}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h5l3-7 4 14 3-7h5" />
        </svg>
        <span style={{ color }}>LAST</span>
      </div>
      <div className="clock-display">
        {(displayTime.hours || '  ').split('').map((d, i) => (
          <SevenSegmentDigit key={`h${i}`} digit={d || ' '} size={size} color={color} dimColor={dimColor} glow={isFirstSpin} />
        ))}
        <Colon size={size} color={color} dim={isBlank} />
        {(displayTime.minutes || '  ').split('').map((d, i) => (
          <SevenSegmentDigit key={`m${i}`} digit={d || ' '} size={size} color={color} dimColor={dimColor} glow={isFirstSpin} />
        ))}
        <Colon size={size} color={color} dim={isBlank} />
        {(displayTime.seconds || '  ').split('').map((d, i) => (
          <SevenSegmentDigit key={`s${i}`} digit={d || ' '} size={size} color={color} dimColor={dimColor} glow={isFirstSpin} />
        ))}
      </div>
    </div>
  );
}
