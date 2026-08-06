/**
 * CyberSelect — drop-in replacement for <select> that respects our
 * cyberpunk theme (dark surface, neon border, monospace font, custom
 * caret). Matches the rest of the modal/Settings styling.
 *
 * Keyboard: ArrowUp/Down navigates open list, Enter selects, Escape
 * closes. Click-outside also closes.
 *
 * Drop-in interface: pass `value`, `options`, `onChange`. No name/form
 * support yet — we use it only inside React-controlled forms.
 */
import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface CyberOption<T extends string = string> {
  value: T;
  label: string;
  hint?: string;          // optional secondary line under the label
  disabled?: boolean;
}

interface Props<T extends string> {
  value: T;
  options: CyberOption<T>[];
  onChange: (v: T) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CyberSelect<T extends string>({
  value, options, onChange, placeholder, className, disabled,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      // Dropdown is rendered through a portal outside ref's subtree,
      // so we need to check BOTH the trigger root and the list root.
      const target = e.target as Node;
      const inTrigger = ref.current?.contains(target);
      const inList    = listRef.current?.contains(target);
      if (!inTrigger && !inList) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHover((h) => Math.min(options.length - 1, h < 0 ? 0 : h + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHover((h) => Math.max(0, h - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const o = options[hover];
        if (o && !o.disabled) { onChange(o.value); setOpen(false); }
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, hover, options, onChange]);

  const toggle = () => {
    if (disabled) return;
    setOpen((v) => !v);
    setHover(options.findIndex((o) => o.value === value));
  };

  // Compute viewport-fixed dropdown position. The dropdown is rendered
  // through a portal to document.body so a parent modal's `overflow:
  // hidden` (or any clipping ancestor) can't crop it. We also flip the
  // panel above the trigger when there isn't enough space below.
  const [pos, setPos] = useState<{ left: number; top: number; width: number; flipUp: boolean; maxH: number }>(
    { left: 0, top: 0, width: 200, flipUp: false, maxH: 280 },
  );
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const GAP = 6;
      const HARD_MAX = 320;
      const spaceBelow = window.innerHeight - r.bottom - GAP - 8;
      const spaceAbove = r.top - GAP - 8;
      // Prefer below; flip up only when both: (a) below is cramped AND
      // (b) there is meaningfully more room above.
      const flipUp = spaceBelow < 160 && spaceAbove > spaceBelow + 40;
      const maxH = Math.max(120, Math.min(HARD_MAX, flipUp ? spaceAbove : spaceBelow));
      setPos({
        left: r.left,
        top:  flipUp ? r.top - GAP : r.bottom + GAP,
        width: r.width,
        flipUp,
        maxH,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open]);

  return (
    <div ref={ref} className={`cyber-select ${className || ''} ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`}>
      <style>{styleBlock}</style>
      <button
        type="button"
        id={id}
        className="cyber-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        disabled={disabled}
      >
        <span className="cyber-select-value">
          {current ? current.label : (placeholder || '—')}
        </span>
        <svg className="cyber-select-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden>
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.6" fill="none"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && createPortal(
        <div
          ref={listRef}
          className="cyber-select-list"
          role="listbox"
          style={{
            left: pos.left,
            width: pos.width,
            ...(pos.flipUp
              ? { bottom: window.innerHeight - pos.top, top: 'auto' }
              : { top: pos.top }),
            maxHeight: pos.maxH,
          }}
        >
          {options.map((o, i) => (
            <div
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              aria-disabled={o.disabled || undefined}
              className={`cyber-select-opt ${o.value === value ? 'selected' : ''} ${i === hover ? 'hover' : ''} ${o.disabled ? 'disabled' : ''}`}
              onMouseEnter={() => setHover(i)}
              onClick={() => {
                if (o.disabled) return;
                onChange(o.value);
                setOpen(false);
              }}
            >
              <div className="cyber-select-opt-main">{o.label}</div>
              {o.hint && <div className="cyber-select-opt-hint">{o.hint}</div>}
              {o.value === value && (
                <svg className="cyber-select-check" width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.8"
                        fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          )) }
        </div>,
        document.body,
      )}
    </div>
  );
}

const styleBlock = `
.cyber-select { position: relative; display: inline-block; min-width: 200px; }
.cyber-select.full { width: 100%; }
.cyber-select-trigger {
  width: 100%;
  display: inline-flex; align-items: center; justify-content: space-between;
  gap: 8px;
  padding: 9px 12px;
  background: #02050b;
  border: 1px solid rgba(0, 240, 255, .18);
  border-radius: 6px;
  color: #e6f6ff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 15px;
  letter-spacing: .03em;
  cursor: pointer;
  outline: none;
  transition: border-color .12s, box-shadow .12s, background .12s;
}
.cyber-select-trigger:hover { border-color: rgba(0, 240, 255, .35); }
.cyber-select.open .cyber-select-trigger {
  border-color: #00f0ff;
  box-shadow: 0 0 0 3px rgba(0, 240, 255, .14);
}
.cyber-select.disabled .cyber-select-trigger { opacity: .45; cursor: not-allowed; }
.cyber-select-value { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cyber-select-caret { color: #00f0ff; transition: transform .18s ease; flex-shrink: 0; }
.cyber-select.open .cyber-select-caret { transform: rotate(180deg); }

.cyber-select-list {
  /* Portaled to body, positioned via JS so it's never clipped by a
     parent modal's overflow:hidden. left/top/width/maxHeight come from
     inline style.

     The z-index must beat EVERY overlay in the app, not just most of them.
     At 2000 this list rendered behind any modal with a higher overlay
     (the ZFS modal sits at 4000, others at 9999): the list was in the DOM,
     visible: visible, opacity 1 — and completely unclickable, because
     elementFromPoint returned the modal on top of it. A dropdown is always
     logically above the thing that opened it, so it gets the top band —
     above the command palette (12000) as well, which is the current ceiling.
     If you add an overlay above this, test_dropdown_outranks_every_overlay
     will fail and make you decide deliberately rather than ship a dropdown
     nobody can click. */
  position: fixed;
  z-index: 12050;
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0, 240, 255, .35);
  border-radius: 8px;
  padding: 4px;
  box-shadow:
    0 0 0 1px rgba(0, 240, 255, .08),
    0 14px 40px rgba(0, 0, 0, .6),
    0 0 50px -16px rgba(0, 240, 255, .55);
  animation: cyberSelectIn .14s ease;
  overflow-y: auto;
}
@keyframes cyberSelectIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: none; }
}
.cyber-select-opt {
  position: relative;
  display: block;
  padding: 9px 28px 9px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  color: #e6f6ff;
  transition: background .12s, color .12s, padding-left .12s, box-shadow .12s;
}
/* Full-row light bar on hover — left vertical cyan rail + cyan band across
   the row + soft outer glow. The padding shift gives a tiny "snap to" feel
   so it's obvious which option the cursor is on. */
.cyber-select-opt.hover {
  background: linear-gradient(90deg, rgba(0, 240, 255, .22) 0%, rgba(0, 240, 255, .08) 60%, transparent 100%);
  color: #00f0ff;
  padding-left: 18px;
  box-shadow: inset 4px 0 0 #00f0ff, 0 0 18px -6px rgba(0, 240, 255, .55);
}
.cyber-select-opt.hover .cyber-select-opt-main { color: #00f0ff; text-shadow: 0 0 6px rgba(0, 240, 255, .55); }
.cyber-select-opt.selected { color: #00f0ff; }
.cyber-select-opt.disabled { opacity: .45; cursor: not-allowed; color: #6b7c93; }
.cyber-select-opt-main {
  font-family: 'Share Tech Mono', monospace;
  font-size: 15px; letter-spacing: .04em;
}
.cyber-select-opt-hint {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; color: #95a8c4;
  margin-top: 2px; line-height: 1.3;
}
.cyber-select-opt.hover .cyber-select-opt-hint { color: #c8e1ff; }
.cyber-select-check {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  color: #00f0ff;
}
`;
