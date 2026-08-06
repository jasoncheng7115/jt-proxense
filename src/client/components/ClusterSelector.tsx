/**
 * Custom Cluster Selector with styled dropdown
 */

import React, { useState, useRef, useEffect } from 'react';
import type { ClusterData } from '../types';

interface Props {
  clusters: Record<string, ClusterData>;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ClusterSelector({ clusters, value, onChange, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleSelect = (id: string) => {
    onChange(id);
    setIsOpen(false);
  };

  // Get display label for current value
  const getLabel = () => {
    if (value === '__all__') return '⊕ All';
    const cluster = clusters[value];
    if (!cluster) return value;
    const prefix = cluster.summary?.is_standalone ? '◉ ' : '';
    return prefix + (cluster.name || value);
  };

  return (
    <div
      ref={containerRef}
      className={`cluster-selector-wrapper ${disabled ? 'disabled' : ''}`}
    >
      <button
        className={`cluster-selector-button ${isOpen ? 'open' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        title={getLabel()}
      >
        {/* Cluster icon - visible on narrow screens */}
        <svg
          className="selector-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="20" cy="12" r="2" />
          <line x1="12" y1="7" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="18" />
          <line x1="7" y1="12" x2="9" y2="12" />
          <line x1="15" y1="12" x2="18" y2="12" />
        </svg>
        <span className="selector-label">{getLabel()}</span>
        <svg
          className="selector-arrow"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="cluster-dropdown">
          <div className="dropdown-header">
            <span className="dropdown-title">SELECT CLUSTER</span>
            <div className="dropdown-line" />
          </div>

          <div className="dropdown-options">
            {/* All option */}
            <button
              className={`dropdown-option ${value === '__all__' ? 'selected' : ''}`}
              onClick={() => handleSelect('__all__')}
            >
              <span className="option-icon">⊕</span>
              <span className="option-label">All Clusters</span>
              {value === '__all__' && <span className="option-check">✓</span>}
            </button>

            {/* Divider */}
            <div className="dropdown-divider" />

            {/* Cluster options */}
            {Object.entries(clusters).map(([id, cluster]) => {
              const isStandalone = cluster.summary?.is_standalone;
              const label = cluster.name || id;
              const nodeCount = cluster.summary?.nodes_online ?? 0;
              const vmCount = Object.keys(cluster.vms || {}).length;

              return (
                <button
                  key={id}
                  className={`dropdown-option ${value === id ? 'selected' : ''}`}
                  onClick={() => handleSelect(id)}
                >
                  <span className="option-icon">{isStandalone ? '◉' : '◇'}</span>
                  <div className="option-content">
                    <span className="option-label">{label}</span>
                    <span className="option-meta">
                      {nodeCount} nodes · {vmCount} VMs
                    </span>
                  </div>
                  {value === id && <span className="option-check">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Corner decorations */}
          <div className="dropdown-corner tl" />
          <div className="dropdown-corner tr" />
          <div className="dropdown-corner bl" />
          <div className="dropdown-corner br" />
        </div>
      )}

      <style>{`
        .cluster-selector-wrapper {
          position: relative;
          z-index: 100;
        }

        .cluster-selector-button {
          appearance: none;
          background: linear-gradient(180deg, var(--bg-card) 0%, rgba(10, 10, 15, 0.9) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: 0;
          height: 40px;
          box-sizing: border-box;
          padding: 0 32px 0 12px;
          color: var(--primary);
          font-family: var(--font-mono);
          font-size: 15px;
          cursor: pointer;
          transition: all var(--transition-fast);
          min-width: 200px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .cluster-selector-button:hover:not(:disabled) {
          border-color: var(--primary);
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.05);
        }

        .cluster-selector-button.open {
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.5), inset 0 0 30px rgba(0, 240, 255, 0.08);
        }

        .cluster-selector-button:disabled {
          cursor: not-allowed;
          color: var(--text-secondary);
          border-color: var(--border);
          opacity: 0.7;
        }

        .selector-icon {
          display: none;
          flex-shrink: 0;
        }

        /* Wide enough for real cluster names ("CLUSTER1", hostnames);
           the old 70px cap truncated almost everything to "CLUSTE…". */
        .selector-label {
          flex: 1;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 220px;
        }

        .selector-arrow {
          position: absolute;
          right: 10px;
          transition: transform 0.2s ease;
        }

        .cluster-selector-button.open .selector-arrow {
          transform: rotate(180deg);
        }

        /* Responsive: collapse to icon only on narrow screens */
        @media (max-width: 1200px) {
          .cluster-selector-button {
            min-width: unset;
            padding: 8px 12px;
            justify-content: center;
          }

          .selector-icon {
            display: block;
          }

          .selector-label,
          .selector-arrow {
            display: none;
          }
        }

        .cluster-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          min-width: 220px;
          max-width: calc(100vw - 20px);
          background: linear-gradient(180deg, rgba(10, 15, 25, 0.98) 0%, rgba(5, 10, 20, 0.98) 100%);
          border: 1px solid var(--primary-dim);
          z-index: 9999;
          animation: dropdown-hologram 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(6px);
          overflow: hidden;
        }

        /* On small screens, align dropdown to right edge */
        @media (max-width: 600px) {
          .cluster-dropdown {
            left: auto;
            right: 0;
            min-width: 200px;
          }
        }

        /* Hologram scan line effect */
        .cluster-dropdown::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 240, 255, 0.15) 2%,
            transparent 4%
          );
          animation: dropdown-scan 1.5s linear infinite;
          pointer-events: none;
          z-index: 100;
        }

        /* Data stream effect on edges */
        .cluster-dropdown::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 0%, transparent 5%, transparent 95%, rgba(0, 240, 255, 0.1) 100%),
            linear-gradient(180deg, rgba(0, 240, 255, 0.15) 0%, transparent 10%, transparent 90%, rgba(0, 240, 255, 0.1) 100%);
          pointer-events: none;
          z-index: 99;
          animation: dropdown-edge-pulse 2s ease-in-out infinite;
        }

        @keyframes dropdown-hologram {
          0% {
            opacity: 0;
            transform: translateY(-20px) scaleY(0.3) scaleX(0.8);
            filter: blur(10px) brightness(3);
            clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
          }
          30% {
            opacity: 0.7;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: blur(4px) brightness(2);
          }
          60% {
            transform: translateY(2px) scaleY(1.02) scaleX(1);
            filter: blur(1px) brightness(1.3);
          }
          80% {
            transform: translateY(-1px) scaleY(0.99);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }

        @keyframes dropdown-scan {
          0% {
            background-position: 0 -100%;
          }
          100% {
            background-position: 0 200%;
          }
        }

        @keyframes dropdown-edge-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .dropdown-header {
          padding: 10px 12px 8px;
          border-bottom: 1px solid var(--border);
        }

        .dropdown-title {
          font-family: var(--font-display);
          font-size: 15px;
          color: var(--primary-dim);
          letter-spacing: 0.15em;
        }

        .dropdown-line {
          height: 1px;
          background: linear-gradient(90deg, var(--primary-dim) 0%, transparent 100%);
          margin-top: 6px;
        }

        .dropdown-options {
          padding: 6px 0;
          max-height: 300px;
          overflow-y: auto;
        }

        .dropdown-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 15px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          position: relative;
          animation: option-materialize 0.3s ease-out backwards;
          overflow: hidden;
        }

        .dropdown-option:nth-child(1) { animation-delay: 0.15s; }
        .dropdown-option:nth-child(2) { animation-delay: 0.2s; }
        .dropdown-option:nth-child(3) { animation-delay: 0.25s; }
        .dropdown-option:nth-child(4) { animation-delay: 0.3s; }
        .dropdown-option:nth-child(5) { animation-delay: 0.35s; }
        .dropdown-option:nth-child(6) { animation-delay: 0.4s; }
        .dropdown-option:nth-child(7) { animation-delay: 0.45s; }
        .dropdown-option:nth-child(8) { animation-delay: 0.5s; }

        @keyframes option-materialize {
          0% {
            opacity: 0;
            transform: translateX(-20px);
            filter: blur(4px);
          }
          60% {
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        /* Hover scan line effect */
        .dropdown-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.2), transparent);
          transition: left 0.4s ease;
        }

        .dropdown-option:hover::before {
          left: 100%;
        }

        .dropdown-option:hover {
          background: rgba(0, 240, 255, 0.08);
          color: var(--text-primary);
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }

        .dropdown-option.selected {
          background: rgba(0, 240, 255, 0.12);
          color: var(--primary);
          box-shadow: inset 2px 0 0 var(--primary);
        }

        .option-icon {
          font-size: 14px;
          color: var(--primary-dim);
          width: 16px;
          text-align: center;
        }

        .dropdown-option.selected .option-icon {
          color: var(--primary);
        }

        .option-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .option-label {
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .option-meta {
          font-size: 15px;
          color: var(--text-muted);
          text-transform: none;
          letter-spacing: 0;
        }

        .dropdown-option:hover .option-meta {
          color: var(--text-secondary);
        }

        .option-check {
          color: var(--success);
          font-size: 14px;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 4px 12px;
        }

        /* Corner decorations */
        .dropdown-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          pointer-events: none;
        }

        .dropdown-corner.tl {
          top: -1px;
          left: -1px;
          border-top: 2px solid var(--primary);
          border-left: 2px solid var(--primary);
        }

        .dropdown-corner.tr {
          top: -1px;
          right: -1px;
          border-top: 2px solid var(--primary);
          border-right: 2px solid var(--primary);
        }

        .dropdown-corner.bl {
          bottom: -1px;
          left: -1px;
          border-bottom: 2px solid var(--primary);
          border-left: 2px solid var(--primary);
        }

        .dropdown-corner.br {
          bottom: -1px;
          right: -1px;
          border-bottom: 2px solid var(--primary);
          border-right: 2px solid var(--primary);
        }

        /* Scrollbar styling for dropdown */
        .dropdown-options::-webkit-scrollbar {
          width: 4px;
        }

        .dropdown-options::-webkit-scrollbar-track {
          background: var(--bg-tertiary);
        }

        .dropdown-options::-webkit-scrollbar-thumb {
          background: var(--primary-dim);
          border-radius: 2px;
        }

        .dropdown-options::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }

        /* Wrapper corner decorations */
        .cluster-selector-wrapper::before,
        .cluster-selector-wrapper::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border-color: var(--primary-dim);
          pointer-events: none;
          z-index: 1;
          transition: border-color var(--transition-fast);
        }

        .cluster-selector-wrapper::before {
          top: 0;
          left: 0;
          border-top: 1px solid;
          border-left: 1px solid;
        }

        .cluster-selector-wrapper::after {
          bottom: 0;
          right: 0;
          border-bottom: 1px solid;
          border-right: 1px solid;
        }

        .cluster-selector-wrapper:hover::before,
        .cluster-selector-wrapper:hover::after {
          border-color: var(--primary);
        }

        .cluster-selector-wrapper.disabled::before,
        .cluster-selector-wrapper.disabled::after {
          border-color: var(--border);
        }
      `}</style>
    </div>
  );
}
