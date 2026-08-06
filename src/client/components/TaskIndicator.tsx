/**
 * VM Task Indicator Component
 * Shows animated indicators for running VM operations
 */

import React from 'react';
import type { VMTask } from '../types';

interface TaskIndicatorProps {
  task: VMTask;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

// Map task types to display info
const TASK_INFO: Record<string, { label: string; icon: string; color: string }> = {
  qmstart: { label: 'Starting', icon: '▶', color: 'var(--success)' },
  qmstop: { label: 'Stopping', icon: '■', color: 'var(--danger)' },
  qmshutdown: { label: 'Shutting Down', icon: '⏻', color: 'var(--warning)' },
  qmrestart: { label: 'Restarting', icon: '↻', color: 'var(--primary)' },
  qmreset: { label: 'Resetting', icon: '↺', color: 'var(--warning)' },
  qmmigrate: { label: 'Migrating', icon: '→', color: 'var(--accent)' },
  qmclone: { label: 'Cloning', icon: '⎘', color: 'var(--primary)' },
  qmsnapshot: { label: 'Snapshotting', icon: '◉', color: 'var(--primary)' },
  qmrollback: { label: 'Rolling Back', icon: '↩', color: 'var(--warning)' },
  vzdump: { label: 'Backing Up', icon: '⬇', color: 'var(--primary)' },
  qmrestore: { label: 'Restoring', icon: '⬆', color: 'var(--success)' },
  vzstart: { label: 'Starting', icon: '▶', color: 'var(--success)' },
  vzstop: { label: 'Stopping', icon: '■', color: 'var(--danger)' },
  vzshutdown: { label: 'Shutting Down', icon: '⏻', color: 'var(--warning)' },
  vzrestore: { label: 'Restoring', icon: '⬆', color: 'var(--success)' },
  vzmigrate: { label: 'Migrating', icon: '→', color: 'var(--accent)' },
  hamigrate: { label: 'HA Migrating', icon: '⇢', color: 'var(--accent)' },
};

// Animation type based on task category
function getAnimationType(taskType: string): string {
  if (taskType.includes('start') || taskType.includes('restore')) return 'pulse-grow';
  if (taskType.includes('stop') || taskType.includes('shutdown')) return 'pulse-fade';
  if (taskType.includes('migrate')) return 'slide';
  if (taskType.includes('dump') || taskType.includes('backup')) return 'stripe';
  if (taskType.includes('snapshot')) return 'flash';
  if (taskType.includes('rollback')) return 'reverse';
  return 'pulse';
}

export function TaskIndicator({ task, size = 'md', showLabel = true }: TaskIndicatorProps) {
  const info = TASK_INFO[task.task_type] || { label: task.task_type, icon: '⚙', color: 'var(--primary)' };
  const animationType = getAnimationType(task.task_type);
  const sizeClass = `task-indicator-${size}`;

  return (
    <div className={`task-indicator ${sizeClass} ${animationType}`} style={{ '--task-color': info.color } as React.CSSProperties}>
      <div className="task-icon">{info.icon}</div>
      {showLabel && <span className="task-label">{info.label}</span>}
      <style>{styles}</style>
    </div>
  );
}

// Compact badge for use in tables and lists
export function TaskBadge({ task }: { task: VMTask }) {
  const info = TASK_INFO[task.task_type] || { label: task.task_type, icon: '⚙', color: 'var(--primary)' };
  const animationType = getAnimationType(task.task_type);

  return (
    <span className={`task-badge ${animationType}`} style={{ '--task-color': info.color } as React.CSSProperties} title={info.label}>
      <span className="task-badge-icon">{info.icon}</span>
      <span className="task-badge-text">{info.label}</span>
      <style>{styles}</style>
    </span>
  );
}

// Get task for a VM from clusters
export function getVMTask(
  clusters: Record<string, { tasks?: Record<string, VMTask> }>,
  vmid: number
): VMTask | null {
  for (const cluster of Object.values(clusters)) {
    if (!cluster.tasks) continue;
    for (const task of Object.values(cluster.tasks)) {
      if (task.vmid === vmid && task.status === 'running') {
        return task;
      }
    }
  }
  return null;
}

const styles = `
  .task-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--task-color);
    color: var(--task-color);
    font-family: var(--font-mono);
    font-size: 15px;
  }

  .task-indicator-sm {
    padding: 2px 6px;
    font-size: 14px;
    gap: 4px;
  }

  .task-indicator-lg {
    padding: 6px 14px;
    font-size: 15px;
    gap: 8px;
  }

  .task-icon {
    font-size: 1em;
  }

  .task-label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
  }

  /* Task Badge */
  .task-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--task-color);
    color: var(--task-color);
    font-family: var(--font-mono);
    font-size: 14px;
    white-space: nowrap;
  }

  .task-badge-icon {
    font-size: 14px;
  }

  .task-badge-text {
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-weight: 500;
  }

  /* Animations */
  .pulse-grow {
    animation: taskPulseGrow 1.5s ease-in-out infinite;
  }

  .pulse-fade {
    animation: taskPulseFade 1.2s ease-in-out infinite;
  }

  .slide {
    animation: taskSlide 2s linear infinite;
  }

  .stripe {
    position: relative;
    overflow: hidden;
  }

  .stripe::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    animation: taskStripe 1.5s linear infinite;
  }

  .flash {
    animation: taskFlash 0.8s ease-in-out infinite;
  }

  .reverse {
    animation: taskReverse 1.5s ease-in-out infinite;
  }

  .pulse {
    animation: taskPulse 1.5s ease-in-out infinite;
  }

  @keyframes taskPulseGrow {
    0%, 100% {
      transform: none;
      box-shadow: 0 0 0 rgba(var(--task-color-rgb, 0, 240, 255), 0);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 15px var(--task-color);
    }
  }

  @keyframes taskPulseFade {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes taskSlide {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .slide {
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      var(--task-color) 25%,
      var(--task-color) 75%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
  }

  @keyframes taskStripe {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes taskFlash {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 5px var(--task-color);
    }
    25% {
      opacity: 0.7;
      box-shadow: 0 0 20px var(--task-color);
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 5px var(--task-color);
    }
    75% {
      opacity: 0.7;
      box-shadow: 0 0 20px var(--task-color);
    }
  }

  @keyframes taskReverse {
    0%, 100% {
      transform: none;
      filter: hue-rotate(0deg);
    }
    50% {
      transform: scale(0.95);
      filter: hue-rotate(30deg);
    }
  }

  @keyframes taskPulse {
    0%, 100% {
      box-shadow: 0 0 5px var(--task-color);
    }
    50% {
      box-shadow: 0 0 15px var(--task-color), 0 0 25px var(--task-color);
    }
  }
`;
