/**
 * AuditForwarderModal — admin config for the audit-row syslog forwarder.
 * Backend: /api/audit-forwarder.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props { open: boolean; onClose: () => void; }

interface Form {
  enabled: boolean;
  format: 'gelf' | 'syslog' | 'cef';
  transport: 'udp' | 'tcp';
  host: string;
  port: number;
  syslog_facility: number;
  cef_vendor: string;
  cef_product: string;
  cef_version: string;
}

const defaults: Form = {
  enabled: false, format: 'gelf', transport: 'udp', host: '',
  port: 12201, syslog_facility: 16,
  cef_vendor: 'JasonTools', cef_product: 'jt-proxense', cef_version: '0.2',
};

export function AuditForwarderModal({ open, onClose }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [form, setForm] = useState<Form>(defaults);
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    (async () => {
      setErr(null);
      try {
        const r = await fetch('/api/audit-forwarder', { credentials: 'same-origin' });
        if (alive && r.ok) {
          const d = await r.json();
          setForm({ ...defaults, ...(d.config || {}) });
          setRunning(!!d.running);
          setStats(d.stats);
        }
      } catch (e: any) { if (alive) setErr(e.message || String(e)); }
    })();
    return () => { alive = false; };
  }, [open]);

  if (!open) return null;

  const submit = async () => {
    setBusy(true); setErr(null);
    try {
      const r = await fetch('/api/audit-forwarder', {
        method: 'PUT', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      setRunning(!!d.running);
      await dialog.alert(language === 'zh-TW' ? '已套用，下方狀態已更新。' : 'Applied. Forwarder status above is fresh.');
    } catch (e: any) { setErr(e.message || String(e)); }
    finally { setBusy(false); }
  };

  return (
    <div className="af-back" onClick={() => !busy && onClose()}>
      <div className="af-modal" onClick={(e) => e.stopPropagation()}>
        <div className="af-head">
          <span>{t('af.title')}</span>
          <button className="af-close" onClick={onClose} disabled={busy}>×</button>
        </div>
        <div className="af-body">
          {err && <div className="af-error">{err}</div>}
          <div className="af-status">
            <span className={`af-pill ${running ? 'on' : 'off'}`}>{running ? 'running' : 'stopped'}</span>
            {stats && <span className="af-stats">dropped={stats.dropped ?? 0}</span>}
          </div>
          <Row label="enabled">
            <input type="checkbox" checked={form.enabled}
                   onChange={(e) => setForm({ ...form, enabled: e.target.checked })} />
          </Row>
          <Row label="format">
            <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value as any })}>
              <option value="gelf">gelf (Graylog)</option>
              <option value="syslog">syslog (RFC 5424)</option>
              <option value="cef">cef (ArcSight)</option>
            </select>
          </Row>
          <Row label="transport">
            <select value={form.transport} onChange={(e) => setForm({ ...form, transport: e.target.value as any })}>
              <option value="udp">udp</option>
              <option value="tcp">tcp</option>
            </select>
          </Row>
          <Row label="host">
            <input value={form.host} onChange={(e) => setForm({ ...form, host: e.target.value })}
                   placeholder="graylog.example.com" />
          </Row>
          <Row label="port">
            <input type="number" min={1} max={65535} value={form.port}
                   onChange={(e) => setForm({ ...form, port: +e.target.value })} />
          </Row>
          {form.format === 'syslog' && (
            <Row label="syslog facility">
              <input type="number" min={0} max={23} value={form.syslog_facility}
                     onChange={(e) => setForm({ ...form, syslog_facility: +e.target.value })} />
            </Row>
          )}
          {form.format === 'cef' && (
            <>
              <Row label="cef vendor"><input value={form.cef_vendor} onChange={(e) => setForm({ ...form, cef_vendor: e.target.value })} /></Row>
              <Row label="cef product"><input value={form.cef_product} onChange={(e) => setForm({ ...form, cef_product: e.target.value })} /></Row>
              <Row label="cef version"><input value={form.cef_version} onChange={(e) => setForm({ ...form, cef_version: e.target.value })} /></Row>
            </>
          )}
          <div className="af-actions">
            <button onClick={onClose} disabled={busy}>Cancel</button>
            <button className="af-primary" onClick={submit} disabled={busy}>{busy ? '…' : 'Apply'}</button>
          </div>
        </div>
        <style>{`
          .af-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .af-modal { width: min(560px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); overflow: hidden; }
          .af-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); color: var(--primary); font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
          .af-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; }
          .af-body { padding: 14px 18px; overflow: auto; }
          .af-status { display: flex; gap: 8px; align-items: center; margin-bottom: 14px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .af-pill { padding: 2px 10px; font-size: 12.5px; border-radius: 999px; border: 1px solid currentColor; }
          .af-pill.on { color: var(--success); }
          .af-pill.off { color: var(--text-muted); }
          .af-stats { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); }
          .af-row { display: grid; grid-template-columns: 140px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .af-row > span { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .af-row input, .af-row select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .af-row input[type="checkbox"] { justify-self: start; }
          .af-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .af-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 14px; }
          .af-actions button { padding: 6px 14px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .af-actions .af-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
        `}</style>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="af-row"><span>{label}</span>{children}</label>;
}
