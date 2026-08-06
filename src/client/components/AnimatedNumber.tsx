/**
 * JT-PROXENSE Animated Number Component
 * Count-up animation effect for numbers
 */

import { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;      // Animation duration in ms
  decimals?: number;      // Number of decimal places
  suffix?: string;        // Suffix like '%', 'GB', etc.
  prefix?: string;        // Prefix like '$', etc.
  className?: string;
  formatFn?: (n: number) => string;  // Custom format function
}

export function AnimatedNumber({
  value,
  duration = 800,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  formatFn,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const frameRef = useRef<number>(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // First render: animate from 0 → value (intro effect).
    // Subsequent renders: snap. Re-running a 60fps tween on every live data
    // refresh across the dashboard's many AnimatedNumbers melted ~50% CPU.
    if (!isFirstRender.current) {
      setDisplayValue(value);
      return;
    }
    startValueRef.current = 0;
    isFirstRender.current = false;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = startValueRef.current + (value - startValueRef.current) * easeOut;
      setDisplayValue(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);

  const formattedValue = formatFn
    ? formatFn(displayValue)
    : displayValue.toFixed(decimals);

  return (
    <span className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

// Hook version for more flexibility
export function useCountUp(
  targetValue: number,
  duration = 800,
  startFromZero = true
): number {
  const [value, setValue] = useState(startFromZero ? 0 : targetValue);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(startFromZero ? 0 : targetValue);
  const frameRef = useRef<number>(0);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Same first-mount-only animation rule as AnimatedNumber above.
    if (!isFirstRun.current) {
      setValue(targetValue);
      return;
    }
    startValueRef.current = startFromZero ? 0 : targetValue;
    isFirstRun.current = false;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = startValueRef.current + (targetValue - startValueRef.current) * easeOut;
      setValue(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setValue(targetValue);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetValue, duration]);

  return value;
}
