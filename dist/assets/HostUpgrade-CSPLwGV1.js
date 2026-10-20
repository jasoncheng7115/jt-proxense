import{u as N,b as O,a as P,r as c,j as e}from"./index-DeG9m4sY.js";import{C as E}from"./CyberSelect-BYmnn2HO.js";const I=new Set(["pending","queued","running","preflight","evacuating","updating","awaiting_reboot","rebooting","restoring","done","failed","skipped","aborted"]),z=(a,s)=>I.has(s)?a(`upgrade.st.${s}`):s;function L(a){if(!a)return"—";const s=new Date(a*1e3),i=n=>String(n).padStart(2,"0");return`${s.getMonth()+1}/${i(s.getDate())} ${i(s.getHours())}:${i(s.getMinutes())}:${i(s.getSeconds())}`}function B(a,s){if(!a)return"—";const i=s||Math.floor(Date.now()/1e3),n=Math.max(0,i-a);return n<60?`${n}s`:n<3600?`${Math.floor(n/60)}m ${n%60}s`:`${Math.floor(n/3600)}h ${Math.floor(n%3600/60)}m`}const J={queued:"queued",preflight:"active",evacuating:"active",updating:"active",rebooting:"active",restoring:"active",awaiting_reboot:"pause",done:"ok",failed:"fail",skipped:"fail"};function G({cluster:a,clusters:s}){var j;const{t:i}=N(),n=O(),t=P(),l=c.useMemo(()=>a?a.id:s&&Object.keys(s)[0]||"",[a,s]),u=c.useMemo(()=>s?Object.entries(s).map(([b,w])=>({value:b,label:w.name||b})):a?[{value:a.id,label:a.name||a.id}]:[],[a,s]),[d,f]=c.useState(l);c.useEffect(()=>{l&&!d&&f(l)},[l,d]);const m=s&&s[d]||a,[x,o]=c.useState("list"),[v,h]=c.useState(null);return((j=n.user)==null?void 0:j.role_global)==="admin"?e.jsxs("div",{className:"hu-page",children:[e.jsxs("div",{className:"hu-header",children:[e.jsxs("div",{children:[e.jsxs("h1",{className:"hu-title font-display",children:[e.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M12 2v8m0 0l-3-3m3 3l3-3"}),e.jsx("path",{d:"M3 14v4a2 2 0 002 2h14a2 2 0 002-2v-4"})]}),i("upgrade.title")]}),e.jsx("div",{className:"hu-sub",children:i("upgrade.subtitle")})]}),e.jsxs("div",{className:"hu-cluster",children:[e.jsx("label",{className:"hu-cluster-lbl",children:i("upgrade.cluster")}),e.jsx(E,{value:d,options:u,onChange:b=>{f(b),o("list"),h(null)}})]})]}),x==="list"&&e.jsx(R,{clusterId:d,onCreateNew:()=>o("wizard"),onOpenJob:b=>{h(b),o("detail")}}),x==="wizard"&&e.jsx(D,{cluster:m,clusterId:d,onCancel:()=>o("list"),onCreated:b=>{h(b),o("detail")}}),x==="detail"&&v!=null&&e.jsx(W,{clusterId:d,jobId:v,onBack:()=>{o("list"),h(null)},dialog:t}),e.jsx("style",{children:T})]}):e.jsxs("div",{className:"hu-page",children:[e.jsxs("div",{className:"hu-no-perm",children:[e.jsx("div",{className:"hu-title font-display",children:i("upgrade.title")}),e.jsx("p",{children:i("upgrade.admin_only")})]}),e.jsx("style",{children:T})]})}function R({clusterId:a,onCreateNew:s,onOpenJob:i}){const{t:n}=N(),[t,l]=c.useState([]),[u,d]=c.useState(!1),[f,m]=c.useState(null),x=async()=>{if(a){d(!0),m(null);try{const o=await fetch(`/api/clusters/${encodeURIComponent(a)}/upgrade-jobs`,{credentials:"same-origin"}),v=await o.json().catch(()=>({}));if(!o.ok||!v.ok)throw new Error(v.error||`HTTP ${o.status}`);l(v.jobs||[])}catch(o){m(o.message||String(o))}finally{d(!1)}}};return c.useEffect(()=>{x()},[a]),c.useEffect(()=>{const o=setInterval(x,1e4);return()=>clearInterval(o)},[a]),e.jsxs("div",{className:"hu-list",children:[e.jsxs("div",{className:"hu-toolbar",children:[e.jsxs("button",{className:"hu-btn hu-btn-primary",onClick:s,children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M12 5v14M5 12h14"})}),n("upgrade.new")]}),e.jsxs("button",{className:"hu-btn",onClick:x,disabled:u,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M21 12a9 9 0 11-3-6.7"}),e.jsx("path",{d:"M21 4v5h-5"})]}),n("upgrade.refresh")]})]}),f&&e.jsx("div",{className:"hu-error",children:f}),e.jsx("div",{className:"hu-table-wrap panel-card",children:e.jsxs("table",{className:"vm-table hu-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:n("upgrade.col.created")}),e.jsx("th",{children:n("upgrade.col.creator")}),e.jsx("th",{children:n("upgrade.col.nodes")}),e.jsx("th",{children:n("upgrade.col.status")}),e.jsx("th",{children:n("upgrade.col.duration")}),e.jsx("th",{})]})}),e.jsxs("tbody",{children:[t.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:7,className:"hu-empty",children:n("upgrade.empty")})}),t.map(o=>e.jsxs("tr",{children:[e.jsx("td",{className:"hu-mono",children:o.id}),e.jsx("td",{className:"hu-mono",children:L(o.created_at)}),e.jsx("td",{className:"hu-mono",children:o.created_by}),e.jsx("td",{className:"hu-mono",children:o.nodes.length}),e.jsx("td",{children:(o.node_failed||0)>0?e.jsx("span",{className:"hu-status hu-status-failed",children:o.status==="done"?n("upgrade.status.done_failed",{n:o.node_failed??0}):`${o.status} · ${o.node_failed}✕`}):e.jsx("span",{className:`hu-status hu-status-${o.status}`,children:z(n,o.status)})}),e.jsx("td",{className:"hu-mono",children:B(o.started_at,o.finished_at)}),e.jsx("td",{children:e.jsx("button",{className:"hu-btn hu-btn-sm",onClick:()=>i(o.id),children:n("upgrade.open")})})]},o.id))]})]})})]})}function D({cluster:a,clusterId:s,onCancel:i,onCreated:n}){const{t}=N(),[l,u]=c.useState(new Set),[d,f]=c.useState("auto"),[m,x]=c.useState({}),[o,v]=c.useState(new Set),[h,y]=c.useState(!0),[j,b]=c.useState(!0),[w,$]=c.useState(!1),[C,_]=c.useState(null),k=c.useMemo(()=>a?Object.entries(a.nodes).map(([r,p])=>{var g,S,M;return{name:r,online:(p.status||"").toLowerCase()==="online",cpu:((g=p.cpu)==null?void 0:g.usage_percent)||0,mem:(((S=p.memory)==null?void 0:S.used_bytes)||0)/Math.max(1,((M=p.memory)==null?void 0:M.total_bytes)||1)*100}}):[],[a]),U=r=>{const p=new Set(l);p.has(r)?p.delete(r):p.add(r),u(p)},A=async()=>{if(l.size===0){_(t("upgrade.err.no_nodes"));return}$(!0),_(null);try{const r={nodes:Array.from(l),target_mode:d,target_manual:d==="manual"?m:{},exclude_targets:d==="auto"?Array.from(o):[],migrate_back:d==="in_place"?!1:h,ceph_aware:j},p=await fetch(`/api/clusters/${encodeURIComponent(s)}/upgrade-jobs`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),g=await p.json().catch(()=>({}));if(!p.ok||!g.ok)throw new Error(g.error||`HTTP ${p.status}`);await fetch(`/api/clusters/${encodeURIComponent(s)}/upgrade-jobs/${g.job_id}/start`,{method:"POST",credentials:"same-origin"}),n(g.job_id)}catch(r){_(r.message||String(r))}finally{$(!1)}};return e.jsxs("div",{className:"hu-wizard panel-card",children:[e.jsx("div",{className:"hu-section-title",children:t("upgrade.wiz.pick_nodes")}),e.jsxs("div",{className:"hu-node-grid",children:[k.length===0&&e.jsx("div",{className:"hu-empty",children:t("upgrade.wiz.no_nodes")}),k.map(r=>e.jsxs("label",{className:`hu-node-cell ${l.has(r.name)?"on":""} ${r.online?"":"off"}`,children:[e.jsx("input",{type:"checkbox",checked:l.has(r.name),onChange:()=>U(r.name),disabled:!r.online}),e.jsx("span",{className:"hu-node-name",children:r.name}),e.jsx("span",{className:"hu-node-state",children:r.online?t("upgrade.online"):t("upgrade.offline")}),e.jsxs("span",{className:"hu-node-load",children:["CPU ",r.cpu.toFixed(0),"% · MEM ",r.mem.toFixed(0),"%"]})]},r.name))]}),e.jsx("div",{className:"hu-section-title",children:t("upgrade.wiz.target")}),e.jsxs("div",{className:"hu-radio-row",children:[e.jsxs("label",{children:[e.jsx("input",{type:"radio",checked:d==="auto",onChange:()=>f("auto")}),t("upgrade.wiz.target_auto")]}),e.jsxs("label",{children:[e.jsx("input",{type:"radio",checked:d==="manual",onChange:()=>f("manual")}),t("upgrade.wiz.target_manual")]}),e.jsxs("label",{children:[e.jsx("input",{type:"radio",checked:d==="in_place",onChange:()=>f("in_place")}),t("upgrade.wiz.target_in_place")]})]}),d==="in_place"&&e.jsx("div",{className:"hu-hint",children:t("upgrade.wiz.target_in_place_help")}),d==="auto"&&e.jsxs("div",{className:"hu-exclude",children:[e.jsx("div",{className:"hu-exclude-title",children:t("upgrade.wiz.exclude_title")}),e.jsx("div",{className:"hu-exclude-grid",children:k.filter(r=>!l.has(r.name)).map(r=>e.jsxs("label",{className:`hu-exclude-cell ${o.has(r.name)?"on":""} ${r.online?"":"off"}`,children:[e.jsx("input",{type:"checkbox",checked:o.has(r.name),disabled:!r.online,onChange:()=>v(p=>{const g=new Set(p);return g.has(r.name)?g.delete(r.name):g.add(r.name),g})}),e.jsx("span",{className:"hu-node-name",children:r.name})]},r.name))}),e.jsx("div",{className:"hu-hint",children:t("upgrade.wiz.exclude_help")})]}),d==="manual"&&e.jsx("div",{className:"hu-manual",children:Array.from(l).map(r=>e.jsxs("div",{className:"hu-manual-row",children:[e.jsx("span",{className:"hu-manual-from",children:r}),e.jsx("span",{className:"hu-manual-arrow",children:"→"}),e.jsx(E,{value:m[r]||"",options:[{value:"",label:t("upgrade.wiz.pick_target")},...k.filter(p=>p.name!==r&&p.online).map(p=>({value:p.name,label:p.name}))],onChange:p=>x({...m,[r]:p})})]},r))}),e.jsx("div",{className:"hu-section-title",children:t("upgrade.wiz.options")}),d==="in_place"?e.jsx("div",{className:"hu-hint",children:t("upgrade.wiz.migrate_back_na")}):e.jsxs(e.Fragment,{children:[e.jsxs("label",{className:"hu-check",children:[e.jsx("input",{type:"checkbox",checked:h,onChange:r=>y(r.target.checked)}),t("upgrade.wiz.migrate_back")]}),e.jsx("div",{className:"hu-hint",children:t("upgrade.wiz.migrate_back_help")})]}),e.jsxs("label",{className:"hu-check",children:[e.jsx("input",{type:"checkbox",checked:j,onChange:r=>b(r.target.checked)}),t("upgrade.wiz.ceph_aware")]}),e.jsx("div",{className:"hu-hint",children:t("upgrade.wiz.ceph_aware_help")}),e.jsxs("div",{className:"hu-warn",children:[e.jsx("strong",{children:t("upgrade.wiz.warn_title")}),e.jsxs("ul",{children:[e.jsx("li",{children:t("upgrade.wiz.warn_rolling")}),e.jsx("li",{children:t("upgrade.wiz.warn_apt")}),e.jsx("li",{children:t("upgrade.wiz.warn_pause")})]})]}),C&&e.jsx("div",{className:"hu-error",children:C}),e.jsxs("div",{className:"hu-actions",children:[e.jsxs("button",{className:"hu-btn",onClick:i,disabled:w,children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18"})}),t("upgrade.cancel")]}),e.jsxs("button",{className:"hu-btn hu-btn-primary",onClick:A,disabled:w||l.size===0,children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})}),t(w?"upgrade.creating":"upgrade.start")]})]})]})}function W({clusterId:a,jobId:s,onBack:i,dialog:n}){const{t}=N(),[l,u]=c.useState(null),[d,f]=c.useState(null),m=c.useRef(null),x=async()=>{try{const h=await fetch(`/api/clusters/${encodeURIComponent(a)}/upgrade-jobs/${s}`,{credentials:"same-origin"}),y=await h.json().catch(()=>({}));if(!h.ok||!y.ok)throw new Error(y.error||`HTTP ${h.status}`);u(y.job)}catch(h){f(h.message||String(h))}};c.useEffect(()=>{x()},[s]),c.useEffect(()=>(m.current&&window.clearInterval(m.current),m.current=window.setInterval(()=>{x()},4e3),()=>{m.current&&window.clearInterval(m.current)}),[s]),c.useEffect(()=>{l&&(l.status==="done"||l.status==="aborted")&&m.current&&(window.clearInterval(m.current),m.current=null)},[l==null?void 0:l.status]);const o=async(h,y)=>{await n.confirm(t(y==="reboot"?"upgrade.confirm.reboot_msg":"upgrade.confirm.skip_msg").replace("{node}",h),{title:t(y==="reboot"?"upgrade.confirm.reboot_title":"upgrade.confirm.skip_title")})&&(await fetch(`/api/clusters/${encodeURIComponent(a)}/upgrade-jobs/${s}/nodes/${encodeURIComponent(h)}/confirm-reboot`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({choice:y})}),x())},v=async()=>{await n.confirm(t("upgrade.abort.msg"),{title:t("upgrade.abort.title"),destructive:!0})&&(await fetch(`/api/clusters/${encodeURIComponent(a)}/upgrade-jobs/${s}/abort`,{method:"POST",credentials:"same-origin"}),x())};return d?e.jsx("div",{className:"hu-error",children:d}):l?e.jsxs("div",{className:"hu-detail",children:[e.jsxs("div",{className:"hu-detail-head",children:[e.jsxs("button",{className:"hu-btn hu-btn-sm",onClick:i,children:[e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})}),t("upgrade.back")]}),e.jsxs("div",{className:"hu-detail-title",children:[t("upgrade.job")," #",l.id," · ",e.jsx("span",{className:`hu-status hu-status-${l.status}`,children:z(t,l.status)})]}),(l.status==="pending"||l.status==="running")&&e.jsx("button",{className:"hu-btn hu-btn-danger hu-btn-sm",onClick:v,children:t("upgrade.abort.btn")})]}),e.jsx("div",{className:"hu-node-list",children:(l.node_steps||[]).map(h=>e.jsx(H,{step:h,onConfirm:o,t},h.id))})]}):e.jsx("div",{className:"hu-empty",children:t("upgrade.loading")})}function q({p:a,t:s}){const i=a.percent,n=a.total??0;let t=s(`upgrade.apt.phase.${a.phase}`);return a.phase==="download"&&n&&(t+=` ${Math.min(a.downloaded,n)} / ${n}`),a.phase==="unpack"&&n&&(t+=` ${Math.min(a.unpacked,n)} / ${n}`),(a.phase==="configure"||a.phase==="triggers")&&n&&(t+=` ${Math.min(a.configured,n)} / ${n}`),e.jsxs("div",{className:`hu-apt hu-apt-${a.phase}`,children:[e.jsxs("div",{className:"hu-apt-row",children:[e.jsx("span",{className:"hu-apt-phase",children:t}),a.current&&a.phase!=="lock_wait"&&e.jsx("span",{className:"hu-apt-pkg",children:a.current}),n>0&&e.jsxs("span",{className:"hu-apt-meta",children:[n," ",s("upgrade.apt.pkgs"),a.download_size?` · ${a.download_size}`:""]}),e.jsx("span",{className:"hu-apt-pct",children:i==null?"…":`${i}%`})]}),e.jsx("div",{className:`hu-apt-track ${i==null?"indet":""}`,children:e.jsx("div",{className:"hu-apt-fill",style:{width:i==null?"30%":`${i}%`}})}),a.phase==="lock_wait"&&a.lock&&e.jsxs("div",{className:"hu-apt-lock",children:[s("upgrade.apt.lock")," ",a.lock.path||"",a.lock.pid?` · PID ${a.lock.pid}`:"",a.lock.holder?` (${a.lock.holder})`:""]})]})}function H({step:a,onConfirm:s,t:i}){const n=J[a.status]||"queued",[t,l]=c.useState(a.status==="awaiting_reboot");return c.useEffect(()=>{a.status==="awaiting_reboot"&&l(!0)},[a.status]),e.jsxs("div",{className:`hu-node-card hu-tone-${n} panel-card`,children:[e.jsxs("div",{className:"hu-node-card-head",onClick:()=>l(!t),children:[e.jsxs("span",{className:"hu-node-card-name",children:["#",a.ordinal," ",a.node]}),e.jsx("span",{className:`hu-status hu-status-${a.status}`,children:z(i,a.status)}),a.target_node&&e.jsxs("span",{className:"hu-node-target",children:["→ ",a.target_node]}),e.jsx("span",{className:"hu-node-card-dur",children:B(a.started_at,a.finished_at)}),e.jsx("span",{className:"hu-node-card-toggle",children:t?"−":"+"})]}),a.status==="awaiting_reboot"&&e.jsxs("div",{className:"hu-reboot-prompt",children:[e.jsx("div",{className:"hu-reboot-msg",children:a.detail.reboot_required?i("upgrade.prompt.reboot_required"):i("upgrade.prompt.reboot_optional")}),e.jsxs("div",{className:"hu-reboot-actions",children:[e.jsx("button",{className:"hu-btn",onClick:()=>s(a.node,"skip"),children:i("upgrade.prompt.skip")}),e.jsx("button",{className:"hu-btn hu-btn-primary",onClick:()=>s(a.node,"reboot"),children:i("upgrade.prompt.reboot")})]})]}),a.detail.apt_progress&&(a.status==="updating"||a.detail.apt_progress.phase==="failed")&&e.jsx(q,{p:a.detail.apt_progress,t:i}),a.error&&e.jsx("div",{className:"hu-error hu-node-error",children:a.error}),t&&e.jsxs("div",{className:"hu-node-detail",children:[a.detail.evacuated&&e.jsxs("div",{className:"hu-evac",children:[e.jsx("div",{className:"hu-section-title",children:i("upgrade.evacuated")}),e.jsx("ul",{children:a.detail.evacuated.map((u,d)=>e.jsxs("li",{className:u.ok?"":"fail",children:[u.type,"/",u.vmid," → ",u.target," · ",u.exitstatus||u.detail||"?"]},d))})]}),a.detail.restored&&e.jsxs("div",{className:"hu-evac",children:[e.jsx("div",{className:"hu-section-title",children:i("upgrade.restored")}),e.jsx("ul",{children:a.detail.restored.map((u,d)=>e.jsxs("li",{className:u.ok?"":"fail",children:[u.type,"/",u.vmid," · ",u.exitstatus||u.detail||"?"]},d))})]}),a.events&&a.events.length>0&&e.jsxs("div",{className:"hu-events",children:[e.jsx("div",{className:"hu-section-title",children:i("upgrade.events")}),e.jsx("pre",{className:"hu-events-log",children:a.events.map(u=>`${L(u.ts)} [${u.kind.toUpperCase()}] ${u.message}`).join(`
`)})]})]})]})}const T=`
.hu-page {
  flex: 1; min-height: 0;
  display: flex; flex-direction: column;
  padding: 24px 32px; gap: 16px;
}
.hu-header {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 24px; flex-wrap: wrap;
  margin-bottom: var(--spacing-md);
}
/* Title matches the list-page canon (PveTasks / BackupJobs / Health):
   text-primary 22px h1 + pulsing cyan icon. */
.hu-title {
  display: flex; align-items: center; gap: var(--spacing-sm);
  font-size: 22px; font-weight: 600; letter-spacing: .12em;
  color: var(--text-primary);
  margin: 0;
}
.hu-title svg {
  stroke: var(--primary);
  filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
  animation: hu-title-pulse 2s ease-in-out infinite;
}
@keyframes hu-title-pulse {
  0%, 100% { opacity: 0.85; transform: none; }
  50%      { opacity: 1;    transform: scale(1.05); }
}
.hu-sub {
  font-family: var(--font-mono); font-size: 12px;
  color: var(--text-secondary); margin-top: 4px;
}
.hu-cluster { display: flex; align-items: center; gap: 10px; }
.hu-cluster-lbl {
  font-family: var(--font-display); font-size: 11px;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--text-muted);
}
.hu-no-perm {
  margin: 80px auto; text-align: center;
  font-family: var(--font-mono); font-size: 14px;
  color: var(--text-secondary); max-width: 480px;
}

.hu-toolbar {
  display: flex; gap: 10px; align-items: center;
  margin-bottom: 14px;   /* breathing room between toolbar and table */
}
.hu-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 7px 16px;
  font-family: var(--font-display); font-size: 12px;
  letter-spacing: .08em; text-transform: uppercase;
  background: rgba(0, 240, 255, 0.06);
  color: var(--text-secondary);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 3px;
  cursor: pointer;
  transition: all .12s;
}
.hu-btn:hover:not(:disabled) {
  background: rgba(0, 240, 255, 0.12);
  color: var(--primary);
  border-color: var(--primary);
}
.hu-btn:disabled { opacity: .4; cursor: not-allowed; }
.hu-btn-primary {
  background: var(--primary); color: #001018;
  border-color: var(--primary);
}
.hu-btn-primary:hover:not(:disabled) {
  background: var(--primary); color: #001018;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.45);
}
.hu-btn-danger {
  color: var(--danger, #ff4d6d);
  border-color: var(--danger, #ff4d6d);
}
.hu-btn-danger:hover:not(:disabled) {
  background: rgba(255, 77, 109, 0.15);
}
.hu-btn-sm { padding: 4px 12px; font-size: 11px; }

.hu-error {
  padding: 9px 14px;
  border: 1px solid var(--danger, #ff4d6d);
  border-left-width: 3px;
  background: rgba(255, 77, 109, 0.08);
  color: var(--danger, #ff4d6d);
  font-family: var(--font-mono); font-size: 12px;
  border-radius: 3px;
}
.hu-empty {
  padding: 30px 12px; text-align: center;
  font-family: var(--font-mono); font-size: 13px;
  color: var(--text-muted); font-style: italic;
}

.hu-table-wrap { overflow: auto; }
/* Header/row/cell look now inherited from the canonical .vm-table (styles.css);
   the bespoke .hu-table th/td rules were removed so the job list matches the
   tasks/backups/users tables (house standard, CLAUDE.md v0.8.3). */
.hu-mono { font-family: var(--font-mono); }

.hu-status {
  display: inline-block; padding: 2px 10px;
  font-family: var(--font-display); font-size: 10px;
  letter-spacing: .1em; text-transform: uppercase;
  border-radius: 999px; border: 1px solid currentColor;
}
.hu-status-pending, .hu-status-queued { color: var(--text-muted); }
.hu-status-running, .hu-status-evacuating, .hu-status-updating,
.hu-status-rebooting, .hu-status-restoring { color: var(--primary); background: rgba(0,240,255,.08); }
.hu-status-awaiting_reboot { color: var(--warning); background: rgba(255, 107, 0, 0.10); }
.hu-status-done { color: var(--success, #00ff88); background: rgba(0, 255, 136, 0.08); }
.hu-status-failed, .hu-status-aborted, .hu-status-skipped {
  /* Was white-on-solid-#ff0040 with an 8px glow -- the only badge in the app
     painted that way, and at 10px with letter-spacing the glow bled into the
     glyphs and made the label hard to read. Match the house pattern the other
     states already use: coloured text on a translucent bed. */
  color: #ff5c7a; background: rgba(255, 0, 64, 0.12);
  border-color: rgba(255, 0, 64, 0.55);
  font-weight: 600;
}

/* ─── Wizard ─────────────────────────────────────────── */
.hu-wizard { padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; }
.hu-section-title {
  font-family: var(--font-display); font-size: 14px;
  letter-spacing: .14em; text-transform: uppercase;
  color: var(--primary);
  text-shadow: 0 0 6px rgba(0,240,255,.35);
  padding-bottom: 6px; margin-top: 8px;
  border-bottom: 1px solid rgba(0,240,255,.22);
}
.hu-node-grid {
  display: grid; gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.hu-node-cell {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 4px 10px;
  padding: 10px 14px;
  border: 1px solid rgba(0, 240, 255, 0.18);
  border-radius: 4px;
  background: rgba(0, 240, 255, 0.03);
  cursor: pointer; transition: all .12s;
  font-family: var(--font-mono); font-size: 14px;
}
.hu-node-cell:hover { border-color: var(--primary); background: rgba(0,240,255,.08); }
.hu-node-cell.on   { border-color: var(--primary); background: rgba(0,240,255,.14); }
.hu-node-cell.off  { opacity: .4; cursor: not-allowed; }
.hu-node-cell input { accent-color: var(--primary); }
.hu-node-name { color: var(--primary); font-weight: 600; }
.hu-node-state {
  justify-self: end;
  font-family: var(--font-display); font-size: 12px;
  letter-spacing: .08em; text-transform: uppercase;
  color: var(--text-muted);
}
.hu-node-load { grid-column: 2 / 4; color: var(--text-muted); font-size: 13px; }

.hu-exclude { display: flex; flex-direction: column; gap: 8px; }
.hu-exclude-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .06em; color: var(--text-secondary); }
.hu-exclude-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.hu-exclude-cell {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 5px 12px; border-radius: 4px;
  border: 1px solid rgba(0, 240, 255, 0.18); background: rgba(0, 240, 255, 0.03);
  font-family: var(--font-mono); font-size: 13px; cursor: pointer; transition: all .12s;
}
.hu-exclude-cell:hover { border-color: var(--primary); }
.hu-exclude-cell.on { border-color: var(--danger, #ff4d6d); background: rgba(255, 77, 109, 0.12); color: var(--danger, #ff4d6d); }
.hu-exclude-cell.off { opacity: .4; cursor: not-allowed; }
.hu-exclude-cell input { accent-color: var(--danger, #ff4d6d); }
.hu-radio-row { display: flex; gap: 24px; font-family: var(--font-mono); font-size: 14px; }
.hu-radio-row label { display: inline-flex; gap: 7px; align-items: center; cursor: pointer; }
.hu-radio-row input { accent-color: var(--primary); }

.hu-manual {
  display: flex; flex-direction: column; gap: 8px;
  padding: 10px 14px; background: rgba(0, 240, 255, 0.03);
  border: 1px dashed rgba(0, 240, 255, 0.18); border-radius: 3px;
}
.hu-manual-row { display: flex; align-items: center; gap: 12px; }
.hu-manual-from { font-family: var(--font-mono); color: var(--primary); min-width: 110px; }
.hu-manual-arrow { color: var(--text-muted); }

.hu-check {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: 14px;
  cursor: pointer;
}
.hu-check input { accent-color: var(--primary); }
.hu-hint {
  font-family: var(--font-mono); font-size: 13px;
  color: var(--text-muted); margin-left: 24px;
}

.hu-warn {
  padding: 12px 18px;
  border: 1px solid var(--warning);
  border-left-width: 3px;
  background: rgba(255, 107, 0, 0.06);
  color: var(--warning);
  font-family: var(--font-mono); font-size: 13px;
  border-radius: 3px;
}
.hu-warn strong {
  font-family: var(--font-display); font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase;
}
.hu-warn ul { margin: 6px 0 0 18px; padding: 0; }
.hu-warn li { color: #ffd9b3; line-height: 1.55; }

.hu-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }

/* ─── Detail ─────────────────────────────────────────── */
.hu-detail { display: flex; flex-direction: column; gap: 14px; }
.hu-detail-head {
  display: flex; align-items: center; gap: 14px;
  font-family: var(--font-display); font-size: 14px;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--primary);
}
.hu-detail-title { flex: 1; }

.hu-node-list { display: flex; flex-direction: column; gap: 10px; }
.hu-node-card { padding: 0; overflow: hidden; }
.hu-node-card-head {
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  gap: 14px; align-items: center;
  padding: 12px 18px; cursor: pointer;
  font-family: var(--font-mono); font-size: 13px;
}
.hu-node-card-head:hover { background: rgba(0,240,255,.04); }
.hu-node-card-name { color: var(--primary); font-weight: 600; }
.hu-node-target { color: var(--text-secondary); font-size: 12px; }
.hu-node-card-dur { color: var(--text-muted); font-size: 12px; min-width: 60px; text-align: right; }
.hu-node-card-toggle { color: var(--text-muted); font-size: 18px; width: 14px; text-align: center; }

.hu-reboot-prompt {
  padding: 14px 18px;
  background: rgba(255, 107, 0, 0.08);
  border-top: 1px solid rgba(255, 107, 0, 0.3);
  border-bottom: 1px solid rgba(255, 107, 0, 0.3);
  display: flex; flex-direction: column; gap: 10px;
}
.hu-reboot-msg {
  font-family: var(--font-mono); font-size: 13px;
  color: var(--warning);
}
.hu-reboot-actions { display: flex; gap: 10px; justify-content: flex-end; }

.hu-node-error {
  margin: 8px 18px;
}
.hu-apt {
  padding: 10px 18px 12px;
  border-top: 1px solid rgba(0, 240, 255, 0.12);
  display: flex; flex-direction: column; gap: 7px;
  animation: hu-apt-in .24s ease-out;
}
@keyframes hu-apt-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.hu-apt-row { display: flex; align-items: baseline; gap: 12px; font-family: var(--font-mono); font-size: 12.5px; }
.hu-apt-phase { color: var(--primary); letter-spacing: .04em; }
.hu-apt-pkg { color: var(--text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 280px; }
.hu-apt-meta { color: var(--text-muted); margin-left: auto; }
.hu-apt-pct { color: var(--text-primary); min-width: 40px; text-align: right; }
.hu-apt-track { position: relative; height: 6px; border-radius: 3px; background: rgba(0, 240, 255, 0.08); border: 1px solid rgba(0, 240, 255, 0.18); overflow: hidden; }
.hu-apt-fill {
  height: 100%; border-radius: 3px;
  background: linear-gradient(90deg, rgba(0,240,255,.55), var(--primary));
  box-shadow: 0 0 10px rgba(0, 240, 255, .55);
  transition: width .6s ease;
  position: relative;
}
.hu-apt-fill::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 40px; right: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.55));
  animation: hu-apt-glint 1.6s ease-in-out infinite;
}
@keyframes hu-apt-glint { 0%,100% { opacity: .2; } 50% { opacity: .9; } }
.hu-apt-track.indet .hu-apt-fill { animation: hu-apt-indet 1.4s ease-in-out infinite; }
@keyframes hu-apt-indet { 0% { margin-left: -30%; } 100% { margin-left: 100%; } }
.hu-apt-lock_wait .hu-apt-phase, .hu-apt-lock { color: var(--warning); }
.hu-apt-lock { font-family: var(--font-mono); font-size: 12px; }
.hu-apt-failed .hu-apt-phase { color: var(--danger, #ff4d6d); }
.hu-apt-failed .hu-apt-fill { background: var(--danger, #ff4d6d); box-shadow: 0 0 10px rgba(255, 77, 109, .5); }
.hu-node-detail {
  padding: 12px 18px 14px;
  border-top: 1px solid rgba(0, 240, 255, 0.08);
  display: flex; flex-direction: column; gap: 12px;
}
.hu-evac ul { margin: 4px 0 0 18px; padding: 0; font-family: var(--font-mono); font-size: 12px; }
.hu-evac li { color: var(--text-secondary); line-height: 1.6; }
.hu-evac li.fail { color: var(--danger, #ff4d6d); }
.hu-events-log {
  margin: 4px 0 0 0;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(0, 240, 255, 0.12);
  border-radius: 3px;
  font-family: var(--font-mono); font-size: 11px;
  color: var(--text-secondary);
  max-height: 240px; overflow: auto;
  white-space: pre-wrap; word-break: break-word;
}
`;export{G as HostUpgrade};
