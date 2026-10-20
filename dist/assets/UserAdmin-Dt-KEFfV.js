import{u as M,a as _,b as O,r as i,j as e}from"./index-DeG9m4sY.js";import{C as B}from"./CyberSelect-BYmnn2HO.js";function q(){var S;const{language:r}=M(),o=_(),d=O(),[g,u]=i.useState([]),[m,f]=i.useState(!0),[b,v]=i.useState(null),[k,y]=i.useState(null),[z,w]=i.useState(!1),[c,t]=i.useState(""),[l,h]=i.useState(""),[T,$]=i.useState(!1),[j,N]=i.useState(null),P=()=>{t(""),h(""),w(!0)},C=()=>{T||(w(!1),t(""),h(""))},p=i.useCallback(async()=>{f(!0),v(null);try{const a=await fetch("/api/admin/users",{credentials:"same-origin"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const s=await a.json();u(s.users||[])}catch(a){v(String(a instanceof Error?a.message:a))}finally{f(!1)}},[]);i.useEffect(()=>{p()},[p]);const E=((S=d.user)==null?void 0:S.role_global)==="admin"||!d.authEnforced,W=async()=>{if(!c.trim()||l.length<8){await o.alert(r==="zh-TW"?"使用者名稱必填，密碼至少 8 字元":"Username required, password ≥ 8 chars");return}$(!0);try{const a=await fetch("/api/admin/users",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c,password:l})});if(!a.ok)throw new Error(`HTTP ${a.status}: ${await a.text()}`);t(""),h(""),w(!1),await p()}catch(a){await o.alert(`${a}`)}finally{$(!1)}},R=async a=>{const s=await o.prompt(r==="zh-TW"?`為 ${a.username} 設定新密碼（至少 8 字元）：`:`New password for ${a.username} (≥8 chars):`,{inputType:"password"});if(!s||s.length<8)return;const n=await fetch(`/api/admin/users/${encodeURIComponent(a.username)}/password`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:s,must_change_pw:!0})});n.ok?await o.alert(r==="zh-TW"?"已重設並要求下次登入時變更":"Reset; user must change on next login"):await o.alert(`HTTP ${n.status}: ${await n.text()}`),p()},A=async a=>{if(!a.totp_enabled||!await o.confirm(r==="zh-TW"?`清除 ${a.username} 的 2FA 註冊？`:`Clear 2FA enrolment for ${a.username}?`,{destructive:!0}))return;const n=await fetch(`/api/admin/users/${encodeURIComponent(a.username)}/totp/disable`,{method:"POST",credentials:"same-origin"});n.ok||await o.alert(`HTTP ${n.status}`),p()},U=async a=>{if(!a.totp_enabled)return;const s=await o.prompt(r==="zh-TW"?`重新發行 ${a.username} 的 2FA 備援代碼會讓舊代碼立即失效。請輸入「你自己」的密碼確認：`:`Re-issuing ${a.username}'s 2FA backup codes invalidates the old ones. Enter YOUR OWN password to confirm:`,{inputType:"password"});if(s)try{const n=await fetch(`/api/admin/users/${encodeURIComponent(a.username)}/totp/backup-codes`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({admin_password:s})}),x=await n.json().catch(()=>({}));if(n.status===403&&x.error==="admin_reauth_required"){await o.alert(r==="zh-TW"?"密碼確認失敗。":"Password confirmation failed.");return}if(!n.ok||!x.ok)throw new Error(x.detail||x.error||`HTTP ${n.status}`);N({title:r==="zh-TW"?`${a.username} 的新 2FA 備援代碼`:`New 2FA backup codes for ${a.username}`,note:r==="zh-TW"?"請以安全方式交付給使用者，此畫面關閉後不再顯示。":"Deliver securely to the user — not shown again after this closes.",codes:x.backup_codes||[]})}catch(n){await o.alert(`Regen failed: ${n.message||n}`)}},D=async a=>{const s=await fetch(`/api/admin/users/${encodeURIComponent(a.username)}/enabled`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:!a.enabled})});s.ok||await o.alert(`HTTP ${s.status}`),p()},F=async a=>{if(!await o.confirm(r==="zh-TW"?`永久刪除使用者 ${a.username}？`:`Permanently delete user ${a.username}?`,{destructive:!0}))return;const n=await fetch(`/api/admin/users/${encodeURIComponent(a.username)}`,{method:"DELETE",credentials:"same-origin"});n.ok||await o.alert(`HTTP ${n.status}`),p()},H=a=>{if(!a)return"—";const s=new Date(a),n=x=>String(x).padStart(2,"0");return`${s.getFullYear()}-${n(s.getMonth()+1)}-${n(s.getDate())} ${n(s.getHours())}:${n(s.getMinutes())}`},I=i.useMemo(()=>[...g].sort((a,s)=>a.username.localeCompare(s.username)),[g]);return E?e.jsxs("div",{className:"user-admin",children:[e.jsxs("div",{className:"ua-header",children:[e.jsxs("h1",{className:"ua-title font-display",children:[e.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"}),e.jsx("circle",{cx:"9",cy:"7",r:"4"}),e.jsx("path",{d:"M23 21v-2a4 4 0 00-3-3.87"}),e.jsx("path",{d:"M16 3.13a4 4 0 010 7.75"})]}),r==="zh-TW"?"使用者管理":"User management"]}),e.jsxs("span",{className:"ua-count",children:[g.length," ",r==="zh-TW"?"位使用者":"users"]}),e.jsxs("button",{className:"ua-btn primary ua-create-btn",onClick:P,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"}),e.jsx("circle",{cx:"9",cy:"7",r:"4"}),e.jsx("line",{x1:"19",y1:"8",x2:"19",y2:"14"}),e.jsx("line",{x1:"22",y1:"11",x2:"16",y2:"11"})]}),r==="zh-TW"?"新增使用者":"New user"]})]}),m&&e.jsx("div",{className:"ua-loading",children:r==="zh-TW"?"載入中…":"Loading…"}),b&&e.jsx("div",{className:"ua-err",children:b}),!m&&!b&&e.jsx("div",{className:"ua-table-wrap panel-card",children:e.jsxs("table",{className:"vm-table ua-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:r==="zh-TW"?"帳號":"Username"}),e.jsx("th",{children:r==="zh-TW"?"狀態":"Status"}),e.jsx("th",{children:"2FA"}),e.jsx("th",{children:r==="zh-TW"?"角色":"Roles"}),e.jsx("th",{children:r==="zh-TW"?"上次登入":"Last login"}),e.jsx("th",{className:"actions",children:r==="zh-TW"?"動作":"Actions"})]})}),e.jsx("tbody",{children:I.map(a=>e.jsxs("tr",{className:a.enabled?"":"dim",children:[e.jsxs("td",{children:[e.jsx("code",{className:"ua-username",children:a.username}),a.must_change_pw&&e.jsx("span",{className:"ua-badge warn",title:r==="zh-TW"?"下次登入需變更密碼":"Must change password",children:"!"})]}),e.jsx("td",{children:e.jsx("span",{className:`ua-state-pill ${a.enabled?"on":"off"}`,children:a.enabled?r==="zh-TW"?"啟用":"Enabled":r==="zh-TW"?"停用":"Disabled"})}),e.jsx("td",{children:a.totp_enabled?e.jsx("span",{className:"ua-totp on",title:"2FA enrolled",children:"●"}):e.jsx("span",{className:"ua-totp off",title:"No 2FA",children:"○"})}),e.jsx("td",{children:e.jsx("div",{className:"ua-roles",children:a.roles.length===0?e.jsx("span",{className:"muted",children:"—"}):a.roles.map((s,n)=>e.jsxs("span",{className:`ua-role role-${s.role}`,children:[s.role,e.jsxs("span",{className:"ua-role-scope",children:["@",s.cluster_id==="*"?"all":s.cluster_id,s.vm_pattern!=="*"&&` :${s.vm_pattern}`]})]},n))})}),e.jsx("td",{className:"muted",children:H(a.last_login_at)}),e.jsxs("td",{className:"actions",children:[e.jsx("button",{className:"ua-icon-btn",onClick:()=>y(a),title:r==="zh-TW"?"管理角色":"Manage roles",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M12 20h9"}),e.jsx("path",{d:"M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z"})]})}),e.jsx("button",{className:"ua-icon-btn",onClick:()=>R(a),title:r==="zh-TW"?"重設密碼":"Reset password",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"})})}),e.jsx("button",{className:`ua-icon-btn ${a.totp_enabled?"":"is-faded"}`,onClick:()=>A(a),disabled:!a.totp_enabled,title:r==="zh-TW"?"清除 2FA":"Clear 2FA",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"}),e.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),e.jsx("button",{className:`ua-icon-btn ${a.totp_enabled?"":"is-faded"}`,onClick:()=>U(a),disabled:!a.totp_enabled,title:r==="zh-TW"?"重發 2FA 備援代碼":"Re-issue 2FA backup codes",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"})})}),e.jsx("button",{className:"ua-icon-btn",onClick:()=>D(a),title:a.enabled?r==="zh-TW"?"停用":"Disable":r==="zh-TW"?"啟用":"Enable",children:a.enabled?e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07"})]}):e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polyline",{points:"9 12 11 14 15 10"})]})}),e.jsx("button",{className:"ua-icon-btn danger",onClick:()=>F(a),title:r==="zh-TW"?"刪除":"Delete",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),e.jsx("path",{d:"M10 11v6M14 11v6"})]})})]})]},a.id))})]})}),z&&e.jsx("div",{className:"ua-modal-overlay",onClick:C,children:e.jsxs("div",{className:"ua-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"ua-modal-head",children:[e.jsx("span",{children:r==="zh-TW"?"新增本機帳號":"Create local user"}),e.jsx("button",{className:"ua-icon-btn",onClick:C,"aria-label":"close",children:"×"})]}),e.jsxs("div",{className:"ua-modal-body",children:[e.jsx("label",{children:r==="zh-TW"?"使用者名稱":"Username"}),e.jsx("input",{type:"text",value:c,autoFocus:!0,onChange:a=>t(a.target.value),onKeyDown:a=>{a.key==="Enter"&&c&&l.length>=8&&W()},placeholder:r==="zh-TW"?"使用者名稱":"username",spellCheck:!1,autoComplete:"off"}),e.jsx("label",{children:r==="zh-TW"?"密碼（≥8 字元）":"Password (≥8 chars)"}),e.jsx("input",{type:"password",value:l,onChange:a=>h(a.target.value),onKeyDown:a=>{a.key==="Enter"&&c&&l.length>=8&&W()},placeholder:r==="zh-TW"?"密碼（≥8 字元）":"password (≥8 chars)",autoComplete:"new-password"}),e.jsxs("div",{className:"ua-modal-actions",children:[e.jsx("button",{className:"ua-btn",onClick:C,disabled:T,children:r==="zh-TW"?"取消":"Cancel"}),e.jsx("button",{className:"ua-btn primary",disabled:T||!c||l.length<8,onClick:W,children:T?r==="zh-TW"?"建立中…":"Creating…":r==="zh-TW"?"建立":"Create"})]})]})]})}),j&&e.jsx("div",{className:"ua-modal-overlay",onClick:()=>N(null),children:e.jsxs("div",{className:"ua-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"ua-modal-head",children:[e.jsx("span",{children:j.title}),e.jsx("button",{className:"ua-icon-btn",onClick:()=>N(null),"aria-label":"close",children:"×"})]}),e.jsxs("div",{className:"ua-modal-body",children:[e.jsx("div",{className:"ua-reveal-note",children:j.note}),e.jsx("pre",{className:"ua-reveal-codes",children:j.codes.join(`
`)}),e.jsxs("div",{className:"ua-modal-actions",children:[e.jsx("button",{className:"ua-btn",onClick:()=>{var a;(a=navigator.clipboard)==null||a.writeText(j.codes.join(`
`))},children:r==="zh-TW"?"複製":"Copy"}),e.jsx("button",{className:"ua-btn primary",onClick:()=>N(null),children:r==="zh-TW"?"我已保存":"Done"})]})]})]})}),k&&e.jsx(L,{user:k,onClose:()=>{y(null),p()}}),e.jsx("style",{children:`
        .user-admin {
          padding: var(--spacing-lg);
          height: 100%;
          overflow: auto;
          display: flex; flex-direction: column;
          gap: var(--spacing-md);
        }
        .ua-header {
          display: flex; align-items: center; gap: 16px;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }
        .ua-create-btn {
          margin-left: auto;
          display: inline-flex; align-items: center; gap: 7px;
        }
        /* Title matches the page canon (white h1 + pulsing cyan icon),
           same as PveTasks / BackupJobs / HealthMonitor. */
        .ua-title {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--text-primary);
          display: inline-flex; align-items: center; gap: var(--spacing-sm);
        }
        .ua-title svg {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: ua-title-pulse 2s ease-in-out infinite;
        }
        @keyframes ua-title-pulse {
          0%, 100% { opacity: 0.85; transform: none; }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        .ua-count {
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 13px;
        }
        /* Create-user modal */
        .ua-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 600;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .ua-modal {
          width: 100%; max-width: 420px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid var(--primary);
          border-radius: var(--radius-md, 8px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 60px -20px rgba(0,240,255,0.4);
          animation: uaModalIn .16s ease-out;
        }
        @keyframes uaModalIn { from { transform: translateY(12px); opacity: 0 } to { transform: none; opacity: 1 } }
        .ua-modal-head {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          border-radius: var(--radius-md, 8px) var(--radius-md, 8px) 0 0;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .ua-modal-head span { margin-right: auto; }
        .ua-modal-body { padding: 18px 16px; display: flex; flex-direction: column; gap: 6px; }
        .ua-modal-body label {
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 8px;
        }
        .ua-modal-body input {
          padding: 9px 11px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
        }
        .ua-modal-body input:focus { border-color: var(--primary); }
        .ua-modal-body input::placeholder { color: var(--text-secondary); opacity: 1; }
        .ua-modal-actions {
          display: flex; justify-content: flex-end; gap: 10px;
          margin-top: 18px;
        }
        .ua-reveal-note {
          font-size: 12px; color: var(--text-secondary);
          line-height: 1.5; margin-bottom: 4px;
        }
        .ua-reveal-codes {
          margin: 0; padding: 12px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 14px; letter-spacing: 0.08em;
          color: var(--text-primary);
          white-space: pre-wrap; overflow-wrap: anywhere;
          user-select: all;
        }

        .ua-btn {
          padding: 6px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .ua-btn.primary {
          background: rgba(0,240,255,0.12);
          border-color: var(--primary);
          color: var(--primary);
        }
        .ua-btn.primary:hover:not(:disabled) {
          background: rgba(0,240,255,0.22);
          box-shadow: 0 0 12px rgba(0,240,255,0.3);
        }
        .ua-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .ua-loading, .ua-err {
          padding: 24px;
          text-align: center;
          color: var(--text-muted);
        }
        .ua-err { color: var(--danger, #ff4d6d); }

        /* Table look inherited from the global .vm-table standard
           (matrix); only the wrapper + right-aligned actions column are
           local. The rows aren't clickable here, so reset the cursor. */
        .ua-table-wrap { overflow: auto; }
        .ua-table tbody tr { cursor: default; }
        .ua-table th.actions, .ua-table td.actions { text-align: right; }
        .ua-table .muted, .ua-table td.muted { color: var(--text-secondary); }

        .ua-username { color: var(--primary); font-weight: 600; }
        .ua-badge.warn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px; height: 16px;
          margin-left: 6px;
          background: rgba(255,165,0,0.2);
          border: 1px solid #ffa500;
          color: #ffa500;
          border-radius: 50%;
          font-weight: 700;
          font-size: 11px;
        }

        .ua-state-pill {
          display: inline-block;
          padding: 1px 8px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 999px;
          border: 1px solid currentColor;
        }
        .ua-state-pill.on  { color: var(--success, #00ff88); }
        .ua-state-pill.off { color: var(--text-muted); }

        .ua-totp { font-size: 16px; }
        .ua-totp.on  { color: #00ff88; text-shadow: 0 0 6px rgba(0,255,136,0.5); }
        .ua-totp.off { color: var(--text-muted); }

        .ua-roles { display: flex; flex-wrap: wrap; gap: 4px; }
        .ua-role {
          display: inline-flex; align-items: baseline; gap: 4px;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ua-role.role-admin    { color: #ffa500; background: rgba(255,165,0,0.12); border: 1px solid rgba(255,165,0,0.4); }
        .ua-role.role-operator { color: var(--primary); background: rgba(0,240,255,0.12); border: 1px solid rgba(0,240,255,0.4); }
        .ua-role.role-viewer   { color: #b464ff; background: rgba(180,100,255,0.12); border: 1px solid rgba(180,100,255,0.4); }
        .ua-role-scope { font-weight: 400; opacity: 0.75; font-size: 10px; }

        .ua-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          margin-left: 4px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .ua-icon-btn:hover:not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0,240,255,0.08);
        }
        .ua-icon-btn.danger:hover:not(:disabled) {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          background: rgba(255,77,109,0.08);
        }
        .ua-icon-btn:disabled, .ua-icon-btn.is-faded { opacity: 0.35; cursor: not-allowed; }

        .user-admin-noauth {
          padding: 80px 24px;
          text-align: center;
          color: var(--text-secondary);
        }
        .user-admin-noauth h2 {
          color: var(--danger, #ff4d6d);
          font-family: var(--font-display);
          letter-spacing: 0.08em;
        }
      `})]}):e.jsxs("div",{className:"user-admin-noauth",children:[e.jsx("h2",{children:r==="zh-TW"?"需要管理員權限":"Admin role required"}),e.jsx("p",{children:r==="zh-TW"?"此頁僅限 admin 角色檢視。":"Only users with the admin role can access this page."})]})}function L({user:r,onClose:o}){const{language:d}=M(),g=_(),[u,m]=i.useState(!1),[f,b]=i.useState("*"),[v,k]=i.useState("viewer"),[y,z]=i.useState("*"),w=async()=>{m(!0);try{const t=await fetch(`/api/admin/users/${encodeURIComponent(r.username)}/roles`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:f,role:v,vm_pattern:y})});if(!t.ok)throw new Error(`HTTP ${t.status}: ${await t.text()}`);o()}catch(t){await g.alert(`${t}`)}finally{m(!1)}},c=async t=>{m(!0);try{const l=new URLSearchParams({cluster_id:t.cluster_id,vm_pattern:t.vm_pattern}).toString(),h=await fetch(`/api/admin/users/${encodeURIComponent(r.username)}/roles?${l}`,{method:"DELETE",credentials:"same-origin"});if(!h.ok)throw new Error(`HTTP ${h.status}`);o()}catch(l){await g.alert(`${l}`)}finally{m(!1)}};return e.jsxs("div",{className:"ua-drawer-overlay",onClick:()=>!u&&o(),children:[e.jsxs("div",{className:"ua-drawer",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"ua-drawer-head",children:[e.jsxs("span",{children:[d==="zh-TW"?"管理角色":"Manage roles",": "]}),e.jsx("code",{children:r.username}),e.jsx("button",{className:"ua-icon-btn",onClick:()=>!u&&o(),children:"×"})]}),e.jsxs("div",{className:"ua-drawer-body",children:[e.jsxs("div",{className:"ua-existing",children:[e.jsx("div",{className:"ua-section-h",children:d==="zh-TW"?"現有授權":"Current grants"}),r.roles.length===0?e.jsx("div",{className:"muted",children:d==="zh-TW"?"無":"None"}):r.roles.map((t,l)=>e.jsxs("div",{className:"ua-grant-row",children:[e.jsx("span",{className:`ua-role role-${t.role}`,children:t.role}),e.jsxs("code",{className:"ua-grant-scope",children:["@",t.cluster_id,t.vm_pattern!=="*"&&` :${t.vm_pattern}`]}),e.jsx("button",{className:"ua-icon-btn danger",onClick:()=>c(t),disabled:u,title:"Revoke",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"})]})})]},l))]}),e.jsx("div",{className:"ua-section-h",children:d==="zh-TW"?"新增授權":"Add grant"}),e.jsxs("div",{className:"ua-grant-form",children:[e.jsx("label",{children:d==="zh-TW"?"叢集 ID（* = 全部）":"Cluster ID (* = all)"}),e.jsx("input",{type:"text",value:f,onChange:t=>b(t.target.value)}),e.jsx("label",{children:d==="zh-TW"?"角色":"Role"}),e.jsx(B,{value:v,options:[{value:"viewer",label:"viewer"},{value:"operator",label:"operator"},{value:"admin",label:"admin"}],onChange:t=>k(t)}),e.jsx("label",{children:d==="zh-TW"?"VM pattern（* = 任何 VM、prod-* = 名稱比對、tag:prod = 標籤比對）":"VM pattern (* = any VM, prod-* = name glob, tag:prod = tag match)"}),e.jsx("input",{type:"text",value:y,onChange:t=>z(t.target.value)}),e.jsx("button",{className:"ua-btn primary",disabled:u,onClick:w,children:u?"…":d==="zh-TW"?"授權":"Grant"})]})]})]}),e.jsx("style",{children:`
        .ua-drawer-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 600;
          display: flex; justify-content: flex-end;
        }
        .ua-drawer {
          width: 100%;
          max-width: 480px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border-left: 1px solid var(--primary);
          box-shadow: -16px 0 60px rgba(0,0,0,0.6), -16px 0 80px -20px rgba(0,240,255,0.3);
          display: flex; flex-direction: column;
          animation: uaDrawerIn .18s ease-out;
        }
        @keyframes uaDrawerIn { from { transform: translateX(40px); opacity: 0 } to { transform: none; opacity: 1 } }
        .ua-drawer-head {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .ua-drawer-head code { color: var(--text-primary); margin-right: auto; }
        .ua-drawer-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; overflow: auto; }
        .ua-section-h {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 4px;
          padding-bottom: 5px;
          border-bottom: 1px solid var(--border);
        }
        .ua-existing { display: flex; flex-direction: column; gap: 6px; }
        .ua-grant-row {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 8px;
          background: rgba(0,240,255,0.04);
          border-radius: 4px;
        }
        .ua-grant-scope { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); flex: 1; }
        .ua-grant-form { display: flex; flex-direction: column; gap: 6px; }
        /* 12px floor on drawer labels — the earlier 10px caps were
           borderline unreadable on the dark backdrop (operator feedback). */
        .ua-grant-form label {
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .ua-grant-form input {
          padding: 8px 10px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
        }
        .ua-grant-form input:focus { border-color: var(--primary); }
      `})]})}export{q as UserAdmin};
