/**
 * NotificationsModal — admin-only CRUD for alerting channels.
 *
 * Backend (server/notifications_handlers.py) supports:
 *   - GET    /api/notifications/channels
 *   - POST   /api/notifications/channels        body: {name, type, config, enabled}
 *   - PATCH  /api/notifications/channels/{name} body: {enabled?, config?}
 *   - DELETE /api/notifications/channels/{name}
 *
 * Channel types currently supported by the server: 'webhook' / 'email'.
 * Webhook config: { url, method?, headers? }
 * Email   config: { to, smtp_host?, … (server-defined) }
 */
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';
import { useDialogs } from '../composables/useDialogs';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Channel {
  id?: number;
  name: string;
  type: 'webhook' | 'email';
  enabled: boolean;
  config?: Record<string, any>;
}

export function NotificationsModal({ open, onClose }: Props) {
  const { t, language } = useTranslation();
  const dialog = useDialogs();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add-form state
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'webhook' | 'email'>('webhook');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [newEmailTo, setNewEmailTo] = useState('');
  const [adding, setAdding] = useState(false);

  // Rules state
  type Rule = {
    name: string; action_pattern?: string; min_severity?: string;
    cluster_filter?: string; channel_ids?: number[]; enabled?: boolean;
  };
  const [rules, setRules] = useState<Rule[]>([]);
  const [ruleName, setRuleName] = useState('');
  const [rulePattern, setRulePattern] = useState('');
  const [ruleSeverity, setRuleSeverity] = useState<'ok'|'warn'|'error'|'critical'>('warn');
  const [ruleClusterFilter, setRuleClusterFilter] = useState('');
  const [ruleChannel, setRuleChannel] = useState<string>('');   // channel id as string
  const [addingRule, setAddingRule] = useState(false);

  const reload = async () => {
    setLoading(true); setError(null);
    try {
      const [r1, r2] = await Promise.all([
        fetch('/api/notifications/channels', { credentials: 'same-origin' }),
        fetch('/api/notifications/rules',    { credentials: 'same-origin' }),
      ]);
      if (!r1.ok) {
        const d = await r1.json().catch(() => ({}));
        throw new Error(d.error || `channels HTTP ${r1.status}`);
      }
      const ch = await r1.json();
      setChannels(ch.channels || []);
      if (r2.ok) {
        const rl = await r2.json();
        setRules(rl.rules || []);
      }
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (open) reload(); }, [open]);

  const addChannel = async () => {
    if (!newName.trim() || adding) return;
    setAdding(true); setError(null);
    const config = newType === 'webhook'
      ? { url: newWebhookUrl.trim() }
      : { to: newEmailTo.trim() };
    if (newType === 'webhook' && !config.url) {
      setError(language === 'zh-TW' ? 'webhook URL 必填' : 'webhook URL required');
      setAdding(false); return;
    }
    if (newType === 'email' && !config.to) {
      setError(language === 'zh-TW' ? '收件 email 必填' : 'recipient email required');
      setAdding(false); return;
    }
    try {
      const r = await fetch('/api/notifications/channels', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), type: newType, config, enabled: true }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      setNewName(''); setNewWebhookUrl(''); setNewEmailTo('');
      await reload();
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setAdding(false);
    }
  };

  const toggle = async (ch: Channel) => {
    try {
      await fetch(`/api/notifications/channels/${encodeURIComponent(ch.name)}`, {
        method: 'PATCH', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !ch.enabled }),
      });
      reload();
    } catch (e: any) {
      dialog.alert(e.message || String(e));
    }
  };

  const addRule = async () => {
    if (!ruleName.trim() || addingRule) return;
    setAddingRule(true); setError(null);
    try {
      const body: any = {
        name: ruleName.trim(),
        min_severity: ruleSeverity,
        enabled: true,
      };
      if (rulePattern.trim()) body.action_pattern = rulePattern.trim();
      if (ruleClusterFilter.trim()) body.cluster_filter = ruleClusterFilter.trim();
      // Match channel by name → resolve to id (notifications backend keys
      // by id internally, but the create endpoint takes `channel_ids`).
      if (ruleChannel) {
        const ch = channels.find((c) => c.name === ruleChannel);
        if (ch && (ch as any).id != null) body.channel_ids = [(ch as any).id];
      }
      const r = await fetch('/api/notifications/rules', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      setRuleName(''); setRulePattern(''); setRuleClusterFilter('');
      setRuleChannel('');
      await reload();
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setAddingRule(false);
    }
  };

  const removeRule = async (ru: Rule) => {
    const ok = await dialog.confirm(
      language === 'zh-TW' ? `刪除規則 ${ru.name}？` : `Delete rule ${ru.name}?`,
      { destructive: true }
    );
    if (!ok) return;
    try {
      await fetch(`/api/notifications/rules/${encodeURIComponent(ru.name)}`, {
        method: 'DELETE', credentials: 'same-origin',
      });
      reload();
    } catch (e: any) {
      dialog.alert(e.message || String(e));
    }
  };

  const toggleRule = async (ru: Rule) => {
    try {
      await fetch(`/api/notifications/rules/${encodeURIComponent(ru.name)}`, {
        method: 'PATCH', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !ru.enabled }),
      });
      reload();
    } catch (e: any) {
      dialog.alert(e.message || String(e));
    }
  };

  const sendTest = async (ch: Channel) => {
    try {
      const r = await fetch(
        `/api/notifications/channels/${encodeURIComponent(ch.name)}/test`,
        { method: 'POST', credentials: 'same-origin' }
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.detail || d.error || `HTTP ${r.status}`);
      await dialog.alert(
        language === 'zh-TW'
          ? `已送出測試訊息到 ${ch.name}（請於目標端確認收到）。`
          : `Test message sent to ${ch.name}. Check the target side for delivery.`
      );
    } catch (e: any) {
      await dialog.alert(`Test send failed: ${e.message || e}`);
    }
  };

  const remove = async (ch: Channel) => {
    const ok = await dialog.confirm(
      language === 'zh-TW' ? `確定刪除通道 ${ch.name}？` : `Delete channel ${ch.name}?`,
      { destructive: true }
    );
    if (!ok) return;
    try {
      await fetch(`/api/notifications/channels/${encodeURIComponent(ch.name)}`, {
        method: 'DELETE', credentials: 'same-origin',
      });
      reload();
    } catch (e: any) {
      dialog.alert(e.message || String(e));
    }
  };

  if (!open) return null;
  return (
    <div className="nf-back" onClick={onClose}>
      <div className="nf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nf-head">
          <div className="nf-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span>{t('notif.title')}</span>
          </div>
          <button className="nf-close" onClick={onClose}>×</button>
        </div>
        <div className="nf-body">
          {error && <div className="nf-error">{error}</div>}

          <div className="nf-section-title">{t('notif.add')}</div>
          <div className="nf-add">
            <input
              placeholder={t('notif.name_ph')}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <select value={newType} onChange={(e) => setNewType(e.target.value as any)}>
              <option value="webhook">webhook</option>
              <option value="email">email</option>
            </select>
            {newType === 'webhook'
              ? <input className="nf-url" placeholder="https://hooks.slack.com/…"
                       value={newWebhookUrl} onChange={(e) => setNewWebhookUrl(e.target.value)} />
              : <input className="nf-url" placeholder="ops@example.com"
                       value={newEmailTo} onChange={(e) => setNewEmailTo(e.target.value)} />
            }
            <button className="nf-btn primary" onClick={addChannel} disabled={adding || !newName.trim()}>
              {adding ? t('notes.saving') : t('notif.add_btn')}
            </button>
          </div>

          <div className="nf-section-title">{t('notif.existing')}</div>
          {loading && channels.length === 0 && (
            <div className="nf-empty">{t('notif.loading')}</div>
          )}
          {!loading && channels.length === 0 && !error && (
            <div className="nf-empty">{t('notif.empty')}</div>
          )}
          {channels.length > 0 && (
            <table className="nf-table">
              <thead>
                <tr>
                  <th>{t('notif.col.name')}</th>
                  <th>{t('notif.col.type')}</th>
                  <th>{t('notif.col.target')}</th>
                  <th>{t('notif.col.enabled')}</th>
                  <th>{t('notif.col.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((c) => (
                  <tr key={c.name}>
                    <td className="nf-mono">{c.name}</td>
                    <td><span className={`nf-type nf-type-${c.type}`}>{c.type}</span></td>
                    <td className="nf-mono nf-tgt" title={c.config?.url || c.config?.to || ''}>
                      {c.config?.url || c.config?.to || ''}
                    </td>
                    <td>
                      <button className={`nf-tog ${c.enabled ? 'on' : 'off'}`} onClick={() => toggle(c)}>
                        {c.enabled ? t('bjobs.enabled_yes') : t('bjobs.enabled_no')}
                      </button>
                    </td>
                    <td>
                      <button className="nf-act" onClick={() => sendTest(c)} style={{ marginRight: 4 }}>
                        {language === 'zh-TW' ? '測試' : 'Test'}
                      </button>
                      <button className="nf-act delete" onClick={() => remove(c)}>{t('notif.delete')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="nf-section-title" style={{ marginTop: 16 }}>{t('notif.rules_add')}</div>
          <div className="nf-add">
            <input placeholder={t('notif.rule_name_ph')} value={ruleName} onChange={(e) => setRuleName(e.target.value)} />
            <input className="nf-url" placeholder={t('notif.rule_action_ph')} value={rulePattern} onChange={(e) => setRulePattern(e.target.value)} />
            <select value={ruleSeverity} onChange={(e) => setRuleSeverity(e.target.value as any)}>
              <option value="ok">ok</option>
              <option value="warn">warn</option>
              <option value="error">error</option>
              <option value="critical">critical</option>
            </select>
            <input placeholder={t('notif.rule_cluster_ph')} value={ruleClusterFilter} onChange={(e) => setRuleClusterFilter(e.target.value)} />
            <select value={ruleChannel} onChange={(e) => setRuleChannel(e.target.value)}>
              <option value="">{t('notif.rule_no_channel')}</option>
              {channels.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            <button className="nf-btn primary" onClick={addRule} disabled={addingRule || !ruleName.trim()}>
              {addingRule ? t('notes.saving') : t('notif.add_btn')}
            </button>
          </div>

          <div className="nf-section-title">{t('notif.rules_existing')}</div>
          {rules.length === 0 && (
            <div className="nf-empty">{t('notif.rules_empty')}</div>
          )}
          {rules.length > 0 && (
            <table className="nf-table">
              <thead>
                <tr>
                  <th>{t('notif.col.name')}</th>
                  <th>{t('notif.col.action_pattern')}</th>
                  <th>{t('notif.col.severity')}</th>
                  <th>{t('notif.col.cluster_filter')}</th>
                  <th>{t('notif.col.channels')}</th>
                  <th>{t('notif.col.enabled')}</th>
                  <th>{t('notif.col.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((ru) => (
                  <tr key={ru.name}>
                    <td className="nf-mono">{ru.name}</td>
                    <td className="nf-mono">{ru.action_pattern || '*'}</td>
                    <td className="nf-mono">{ru.min_severity || 'ok'}</td>
                    <td className="nf-mono">{ru.cluster_filter || '*'}</td>
                    <td className="nf-mono">
                      {ru.channel_ids && ru.channel_ids.length > 0
                        ? ru.channel_ids.map((cid) => {
                            const c = channels.find((x) => (x as any).id === cid);
                            return c ? c.name : `#${cid}`;
                          }).join(', ')
                        : '—'}
                    </td>
                    <td>
                      <button className={`nf-tog ${ru.enabled ? 'on' : 'off'}`} onClick={() => toggleRule(ru)}>
                        {ru.enabled ? t('bjobs.enabled_yes') : t('bjobs.enabled_no')}
                      </button>
                    </td>
                    <td>
                      <button className="nf-act delete" onClick={() => removeRule(ru)}>{t('notif.delete')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <style>{`
          .nf-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .nf-modal { width: min(900px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: nf-in .18s ease-out; overflow: hidden; }
          @keyframes nf-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .nf-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .nf-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .nf-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .nf-close:hover { color: var(--primary); }
          .nf-body { flex: 1; padding: 14px 18px; overflow: auto; }
          .nf-section-title { font-family: var(--font-display); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); margin: 6px 0; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.08); }
          .nf-error { padding: 8px 14px; margin: 6px 0; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .nf-empty { padding: 24px 12px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }

          .nf-add { display: flex; gap: 8px; align-items: stretch; flex-wrap: wrap; margin-bottom: 14px; }
          .nf-add input, .nf-add select { padding: 6px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .nf-add input:focus, .nf-add select:focus { border-color: var(--primary); }
          .nf-add input { min-width: 140px; }
          .nf-add input.nf-url { flex: 1; min-width: 240px; }
          .nf-btn { padding: 6px 14px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .nf-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border: none; }
          .nf-btn.primary:hover:not(:disabled) { box-shadow: 0 0 16px rgba(0, 240, 255, 0.4); }
          .nf-btn.primary:disabled { opacity: .4; cursor: not-allowed; }

          .nf-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .nf-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .nf-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .nf-mono { font-family: var(--font-mono); }
          .nf-tgt { max-width: 320px; overflow: hidden; text-overflow: ellipsis; }
          .nf-type { display: inline-block; padding: 1px 8px; border-radius: 2px; font-size: 12.5px; font-family: var(--font-display); letter-spacing: .04em; border: 1px solid currentColor; }
          .nf-type-webhook { color: var(--primary); }
          .nf-type-email { color: var(--accent); }

          .nf-tog { padding: 1px 10px; border-radius: 999px; font-size: 12.5px; border: 1px solid currentColor; cursor: pointer; background: transparent; font-family: var(--font-mono); }
          .nf-tog.on  { color: var(--success); }
          .nf-tog.off { color: var(--text-muted); }
          .nf-tog:hover { box-shadow: 0 0 8px currentColor; }

          .nf-act { padding: 2px 10px; font-family: var(--font-display); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: 1px solid rgba(0,240,255,.2); border-radius: 2px; cursor: pointer; }
          .nf-act.delete:hover { color: var(--danger, #ff4d6d); border-color: var(--danger, #ff4d6d); background: rgba(255,77,109,.06); }
        `}</style>
      </div>
    </div>
  );
}
