/**
 * useDialogs — async, cyberpunk-styled replacements for the browser's native
 * alert / confirm / prompt. Wrap the app in <DialogProvider> once; any
 * component can `const dialog = useDialogs()` and `await dialog.alert(...)`.
 *
 * Native dialogs were jarring against the rest of the UI and locked Chrome's
 * tab focus + couldn't be themed. These dialogs render as React modals,
 * inherit our font / color tokens, and resolve a Promise on close.
 */
import React, {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  type ReactNode,
} from 'react';
import { useTranslation } from '../i18n';

type Kind = 'alert' | 'confirm' | 'prompt';

interface Common {
  title?: string;
  destructive?: boolean;
}
interface AlertOpts extends Common {}
interface ConfirmOpts extends Common {}
interface PromptOpts extends Common {
  defaultValue?: string;
  inputType?: 'text' | 'password';
  placeholder?: string;
}

interface State {
  kind: Kind;
  title: string;
  body: string;
  destructive: boolean;
  inputType: 'text' | 'password';
  placeholder: string;
  resolve: (v: unknown) => void;
}

interface Ctx {
  alert: (body: string, opts?: AlertOpts) => Promise<void>;
  confirm: (body: string, opts?: ConfirmOpts) => Promise<boolean>;
  prompt: (body: string, opts?: PromptOpts) => Promise<string | null>;
}

const DialogContext = createContext<Ctx | null>(null);

export function useDialogs(): Ctx {
  const c = useContext(DialogContext);
  if (!c) {
    // Convenient fallback: log + return native so missing-provider doesn't
    // crash the page. The visible warning surfaces the bug at dev time.
    if (typeof console !== 'undefined') console.warn('useDialogs called outside DialogProvider — falling back to native.');
    return {
      alert:   (b) => { window.alert(b); return Promise.resolve(); },
      confirm: (b) => Promise.resolve(window.confirm(b)),
      prompt:  (b, o) => Promise.resolve(window.prompt(b, o?.defaultValue ?? '')),
    };
  }
  return c;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [state, setState] = useState<State | null>(null);
  const [val, setVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback((value: unknown) => {
    if (!state) return;
    state.resolve(value);
    setState(null);
    setVal('');
  }, [state]);

  const alert = useCallback<Ctx['alert']>((body, opts = {}) =>
    new Promise<void>((resolve) => {
      setState({
        kind: 'alert',
        title: opts.title || t('dialog.notice'),
        body, destructive: !!opts.destructive,
        inputType: 'text', placeholder: '',
        resolve: () => resolve(),
      });
    }), [t]);

  const confirm = useCallback<Ctx['confirm']>((body, opts = {}) =>
    new Promise<boolean>((resolve) => {
      setState({
        kind: 'confirm',
        title: opts.title || t('dialog.confirm'),
        body, destructive: !!opts.destructive,
        inputType: 'text', placeholder: '',
        resolve: (v) => resolve(!!v),
      });
    }), [t]);

  const prompt = useCallback<Ctx['prompt']>((body, opts = {}) =>
    new Promise<string | null>((resolve) => {
      setVal(opts.defaultValue || '');
      setState({
        kind: 'prompt',
        title: opts.title || t('dialog.input'),
        body, destructive: !!opts.destructive,
        inputType: opts.inputType || 'text',
        placeholder: opts.placeholder || '',
        resolve: (v) => resolve(v === null ? null : String(v)),
      });
    }), [t]);

  // Esc / Enter handlers + autofocus.
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close(state.kind === 'prompt' ? null : (state.kind === 'confirm' ? false : undefined));
      } else if (e.key === 'Enter' && state.kind !== 'alert') {
        e.preventDefault();
        close(state.kind === 'prompt' ? val : true);
      } else if (e.key === 'Enter' && state.kind === 'alert') {
        close(undefined);
      }
    };
    document.addEventListener('keydown', onKey);
    if (state.kind === 'prompt') {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [state, val, close]);

  return (
    <DialogContext.Provider value={{ alert, confirm, prompt }}>
      {children}
      {state && (
        <div
          onClick={() => close(state.kind === 'prompt' ? null : (state.kind === 'confirm' ? false : undefined))}
          style={overlay}
        >
          <style>{styleBlock}</style>
          <div className={`jtd-modal ${state.destructive ? 'destructive' : ''}`}
               onClick={(e) => e.stopPropagation()}>
            <div className="jtd-eyebrow">// {state.kind}</div>
            <h3 className="jtd-title">{state.title}</h3>
            <p className="jtd-body">{state.body}</p>
            {state.kind === 'prompt' && (
              <input
                ref={inputRef}
                type={state.inputType}
                value={val}
                placeholder={state.placeholder}
                onChange={(e) => setVal(e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
            )}
            <div className="jtd-actions">
              {state.kind !== 'alert' && (
                <button className="ghost" onClick={() =>
                  close(state.kind === 'prompt' ? null : false)
                }>
                  {t('action.cancel')}
                </button>
              )}
              <button
                className={`primary ${state.destructive ? 'destructive' : ''}`}
                onClick={() => close(state.kind === 'prompt' ? val : true)}
              >
                {state.kind === 'alert' ? t('dialog.ok')
                  : state.kind === 'confirm' ? t('dialog.confirm_btn')
                  : t('action.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 5000,
  background: 'rgba(0,0,0,.78)', backdropFilter: 'blur(6px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 24, animation: 'jtdFade .18s ease',
};

const styleBlock = `
@keyframes jtdFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes jtdSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.jtd-modal {
  width: min(440px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 22px 24px; animation: jtdSlide .2s ease;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.jtd-modal.destructive {
  border-color: rgba(255,56,96,.45);
  box-shadow: 0 0 0 1px rgba(255,56,96,.12), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(255,56,96,.55);
}
.jtd-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 12px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.jtd-modal.destructive .jtd-eyebrow { color: #ff3860; }
.jtd-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: .06em; margin: 0 0 10px; }
.jtd-body { color: #c8d8ec; font-size: 15px; line-height: 1.55; margin: 0 0 14px; white-space: pre-wrap; }
.jtd-modal input {
  width: 100%; padding: 10px 14px; margin-bottom: 6px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.jtd-modal input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
.jtd-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.jtd-actions button {
  padding: 9px 18px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.jtd-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.jtd-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.jtd-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.jtd-actions button.primary.destructive { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
`;
