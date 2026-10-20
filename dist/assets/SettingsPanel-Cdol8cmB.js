import{u as Ee,r as n,j as e,h as V,a as kt,T as Mt}from"./index-DeG9m4sY.js";import{C as Wt}from"./CyberSelect-BYmnn2HO.js";import{S as It}from"./SSHSetupModal-ytGyMOsm.js";function Bt({open:j,cluster_id:k,kind:r,title:s,body:y,label:C,onClose:x,onSaved:g}){const{t:O}=Ee(),[S,u]=n.useState(""),[h,T]=n.useState(!1),[w,$]=n.useState(""),_=n.useRef(null);if(n.useEffect(()=>{j&&(u(""),$(""),T(!1),setTimeout(()=>{var p;return(p=_.current)==null?void 0:p.focus()},50))},[j]),n.useEffect(()=>{if(!j)return;const p=L=>{L.key==="Escape"&&!h&&x()};return document.addEventListener("keydown",p),()=>document.removeEventListener("keydown",p)},[j,h,x]),!j)return null;const F=async()=>{if(S){T(!0),$("");try{await V.setClusterSecret(k,r,S),g()}catch(p){$(p instanceof Error?p.message:String(p)),T(!1)}}};return e.jsxs("div",{onClick:()=>!h&&x(),style:Pt,children:[e.jsx("style",{children:Rt}),e.jsxs("div",{className:"ssm-modal",onClick:p=>p.stopPropagation(),children:[e.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",k]}),e.jsx("h3",{className:"ssm-title",children:s}),e.jsx("p",{className:"ssm-body",children:y}),e.jsx("label",{children:C}),e.jsx("input",{ref:_,type:"password",value:S,onChange:p=>u(p.target.value),onKeyDown:p=>{p.key==="Enter"&&F()},autoComplete:"new-password",spellCheck:!1}),w&&e.jsx("div",{className:"ssm-err",children:w}),e.jsxs("div",{className:"ssm-actions",children:[e.jsx("button",{className:"ghost",onClick:x,disabled:h,children:O("action.cancel")}),e.jsx("button",{className:"primary",onClick:F,disabled:h||!S,children:h?"…":O("action.save")})]})]})]})}const Pt={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},Rt=`
@keyframes ssmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ssmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.ssm-modal {
  width: min(440px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 22px 24px; animation: ssmSlide .2s ease;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.ssm-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.ssm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 10px; }
.ssm-body { color: #95a8c4; font-size: 15px; line-height: 1.5; margin: 0 0 14px; }
.ssm-modal label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 0 0 6px;
}
.ssm-modal input {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.ssm-modal input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
.ssm-err {
  margin-top: 10px; padding: 10px 12px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 14px; color: #ffd0d8;
}
.ssm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.ssm-actions button {
  padding: 9px 18px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.ssm-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.ssm-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.ssm-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.ssm-actions button:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
`;function Ot({open:j,onClose:k}){const{t:r,language:s}=Ee(),y=kt(),[C,x]=n.useState([]),[g,O]=n.useState(!1),[S,u]=n.useState(null),[h,T]=n.useState(""),[w,$]=n.useState("webhook"),[_,F]=n.useState(""),[p,L]=n.useState(""),[Y,K]=n.useState(!1),[J,me]=n.useState([]),[A,ne]=n.useState(""),[D,q]=n.useState(""),[re,ge]=n.useState("warn"),[M,Q]=n.useState(""),[H,X]=n.useState(""),[W,Z]=n.useState(!1),N=async()=>{O(!0),u(null);try{const[a,o]=await Promise.all([fetch("/api/notifications/channels",{credentials:"same-origin"}),fetch("/api/notifications/rules",{credentials:"same-origin"})]);if(!a.ok){const f=await a.json().catch(()=>({}));throw new Error(f.error||`channels HTTP ${a.status}`)}const l=await a.json();if(x(l.channels||[]),o.ok){const f=await o.json();me(f.rules||[])}}catch(a){u(a.message||String(a))}finally{O(!1)}};n.useEffect(()=>{j&&N()},[j]);const ie=async()=>{if(!h.trim()||Y)return;K(!0),u(null);const a=w==="webhook"?{url:_.trim()}:{to:p.trim()};if(w==="webhook"&&!a.url){u(s==="zh-TW"?"webhook URL 必填":"webhook URL required"),K(!1);return}if(w==="email"&&!a.to){u(s==="zh-TW"?"收件 email 必填":"recipient email required"),K(!1);return}try{const o=await fetch("/api/notifications/channels",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:h.trim(),type:w,config:a,enabled:!0})});if(!o.ok){const l=await o.json().catch(()=>({}));throw new Error(l.error||`HTTP ${o.status}`)}T(""),F(""),L(""),await N()}catch(o){u(o.message||String(o))}finally{K(!1)}},I=async a=>{try{await fetch(`/api/notifications/channels/${encodeURIComponent(a.name)}`,{method:"PATCH",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:!a.enabled})}),N()}catch(o){y.alert(o.message||String(o))}},ee=async()=>{if(!(!A.trim()||W)){Z(!0),u(null);try{const a={name:A.trim(),min_severity:re,enabled:!0};if(D.trim()&&(a.action_pattern=D.trim()),M.trim()&&(a.cluster_filter=M.trim()),H){const l=C.find(f=>f.name===H);l&&l.id!=null&&(a.channel_ids=[l.id])}const o=await fetch("/api/notifications/rules",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!o.ok){const l=await o.json().catch(()=>({}));throw new Error(l.error||`HTTP ${o.status}`)}ne(""),q(""),Q(""),X(""),await N()}catch(a){u(a.message||String(a))}finally{Z(!1)}}},B=async a=>{if(await y.confirm(s==="zh-TW"?`刪除規則 ${a.name}？`:`Delete rule ${a.name}?`,{destructive:!0}))try{await fetch(`/api/notifications/rules/${encodeURIComponent(a.name)}`,{method:"DELETE",credentials:"same-origin"}),N()}catch(l){y.alert(l.message||String(l))}},te=async a=>{try{await fetch(`/api/notifications/rules/${encodeURIComponent(a.name)}`,{method:"PATCH",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:!a.enabled})}),N()}catch(o){y.alert(o.message||String(o))}},G=async a=>{try{const o=await fetch(`/api/notifications/channels/${encodeURIComponent(a.name)}/test`,{method:"POST",credentials:"same-origin"}),l=await o.json().catch(()=>({}));if(!o.ok||!l.ok)throw new Error(l.detail||l.error||`HTTP ${o.status}`);await y.alert(s==="zh-TW"?`已送出測試訊息到 ${a.name}（請於目標端確認收到）。`:`Test message sent to ${a.name}. Check the target side for delivery.`)}catch(o){await y.alert(`Test send failed: ${o.message||o}`)}},se=async a=>{if(await y.confirm(s==="zh-TW"?`確定刪除通道 ${a.name}？`:`Delete channel ${a.name}?`,{destructive:!0}))try{await fetch(`/api/notifications/channels/${encodeURIComponent(a.name)}`,{method:"DELETE",credentials:"same-origin"}),N()}catch(l){y.alert(l.message||String(l))}};return j?e.jsx("div",{className:"nf-back",onClick:k,children:e.jsxs("div",{className:"nf-modal",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"nf-head",children:[e.jsxs("div",{className:"nf-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),e.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]}),e.jsx("span",{children:r("notif.title")})]}),e.jsx("button",{className:"nf-close",onClick:k,children:"×"})]}),e.jsxs("div",{className:"nf-body",children:[S&&e.jsx("div",{className:"nf-error",children:S}),e.jsx("div",{className:"nf-section-title",children:r("notif.add")}),e.jsxs("div",{className:"nf-add",children:[e.jsx("input",{placeholder:r("notif.name_ph"),value:h,onChange:a=>T(a.target.value)}),e.jsxs("select",{value:w,onChange:a=>$(a.target.value),children:[e.jsx("option",{value:"webhook",children:"webhook"}),e.jsx("option",{value:"email",children:"email"})]}),w==="webhook"?e.jsx("input",{className:"nf-url",placeholder:"https://hooks.slack.com/…",value:_,onChange:a=>F(a.target.value)}):e.jsx("input",{className:"nf-url",placeholder:"ops@example.com",value:p,onChange:a=>L(a.target.value)}),e.jsx("button",{className:"nf-btn primary",onClick:ie,disabled:Y||!h.trim(),children:r(Y?"notes.saving":"notif.add_btn")})]}),e.jsx("div",{className:"nf-section-title",children:r("notif.existing")}),g&&C.length===0&&e.jsx("div",{className:"nf-empty",children:r("notif.loading")}),!g&&C.length===0&&!S&&e.jsx("div",{className:"nf-empty",children:r("notif.empty")}),C.length>0&&e.jsxs("table",{className:"nf-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:r("notif.col.name")}),e.jsx("th",{children:r("notif.col.type")}),e.jsx("th",{children:r("notif.col.target")}),e.jsx("th",{children:r("notif.col.enabled")}),e.jsx("th",{children:r("notif.col.actions")})]})}),e.jsx("tbody",{children:C.map(a=>{var o,l,f,U;return e.jsxs("tr",{children:[e.jsx("td",{className:"nf-mono",children:a.name}),e.jsx("td",{children:e.jsx("span",{className:`nf-type nf-type-${a.type}`,children:a.type})}),e.jsx("td",{className:"nf-mono nf-tgt",title:((o=a.config)==null?void 0:o.url)||((l=a.config)==null?void 0:l.to)||"",children:((f=a.config)==null?void 0:f.url)||((U=a.config)==null?void 0:U.to)||""}),e.jsx("td",{children:e.jsx("button",{className:`nf-tog ${a.enabled?"on":"off"}`,onClick:()=>I(a),children:a.enabled?r("bjobs.enabled_yes"):r("bjobs.enabled_no")})}),e.jsxs("td",{children:[e.jsx("button",{className:"nf-act",onClick:()=>G(a),style:{marginRight:4},children:s==="zh-TW"?"測試":"Test"}),e.jsx("button",{className:"nf-act delete",onClick:()=>se(a),children:r("notif.delete")})]})]},a.name)})})]}),e.jsx("div",{className:"nf-section-title",style:{marginTop:16},children:r("notif.rules_add")}),e.jsxs("div",{className:"nf-add",children:[e.jsx("input",{placeholder:r("notif.rule_name_ph"),value:A,onChange:a=>ne(a.target.value)}),e.jsx("input",{className:"nf-url",placeholder:r("notif.rule_action_ph"),value:D,onChange:a=>q(a.target.value)}),e.jsxs("select",{value:re,onChange:a=>ge(a.target.value),children:[e.jsx("option",{value:"ok",children:"ok"}),e.jsx("option",{value:"warn",children:"warn"}),e.jsx("option",{value:"error",children:"error"}),e.jsx("option",{value:"critical",children:"critical"})]}),e.jsx("input",{placeholder:r("notif.rule_cluster_ph"),value:M,onChange:a=>Q(a.target.value)}),e.jsxs("select",{value:H,onChange:a=>X(a.target.value),children:[e.jsx("option",{value:"",children:r("notif.rule_no_channel")}),C.map(a=>e.jsx("option",{value:a.name,children:a.name},a.name))]}),e.jsx("button",{className:"nf-btn primary",onClick:ee,disabled:W||!A.trim(),children:r(W?"notes.saving":"notif.add_btn")})]}),e.jsx("div",{className:"nf-section-title",children:r("notif.rules_existing")}),J.length===0&&e.jsx("div",{className:"nf-empty",children:r("notif.rules_empty")}),J.length>0&&e.jsxs("table",{className:"nf-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:r("notif.col.name")}),e.jsx("th",{children:r("notif.col.action_pattern")}),e.jsx("th",{children:r("notif.col.severity")}),e.jsx("th",{children:r("notif.col.cluster_filter")}),e.jsx("th",{children:r("notif.col.channels")}),e.jsx("th",{children:r("notif.col.enabled")}),e.jsx("th",{children:r("notif.col.actions")})]})}),e.jsx("tbody",{children:J.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"nf-mono",children:a.name}),e.jsx("td",{className:"nf-mono",children:a.action_pattern||"*"}),e.jsx("td",{className:"nf-mono",children:a.min_severity||"ok"}),e.jsx("td",{className:"nf-mono",children:a.cluster_filter||"*"}),e.jsx("td",{className:"nf-mono",children:a.channel_ids&&a.channel_ids.length>0?a.channel_ids.map(o=>{const l=C.find(f=>f.id===o);return l?l.name:`#${o}`}).join(", "):"—"}),e.jsx("td",{children:e.jsx("button",{className:`nf-tog ${a.enabled?"on":"off"}`,onClick:()=>te(a),children:a.enabled?r("bjobs.enabled_yes"):r("bjobs.enabled_no")})}),e.jsx("td",{children:e.jsx("button",{className:"nf-act delete",onClick:()=>B(a),children:r("notif.delete")})})]},a.name))})]})]}),e.jsx("style",{children:`
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
        `})]})}):null}function Ht({onClose:j,clusters:k,initialTab:r}){const{t:s,language:y,setLanguage:C}=Ee(),x=kt(),[g,O]=n.useState(null),[S,u]=n.useState(!0),[h,T]=n.useState(!1),[w,$]=n.useState(null),[_,F]=n.useState(!1),[p,L]=n.useState(r||"ui"),[Y,K]=n.useState(!1),[J,me]=n.useState(!0),[A,ne]=n.useState("cyberpunk"),[D,q]=n.useState("command-center"),[re,ge]=n.useState(100),[M,Q]=n.useState("all"),[H,X]=n.useState(85),[W,Z]=n.useState("vmid"),[N,ie]=n.useState("node"),[I,ee]=n.useState("node"),[B,te]=n.useState("asc"),[G,se]=n.useState({}),[a,o]=n.useState(!0),[l,f]=n.useState(80),[U,xe]=n.useState(95),[he,ue]=n.useState(85),[fe,be]=n.useState(95),[ve,ye]=n.useState(80),[je,we]=n.useState(95),[$e,Me]=n.useState(50),[We,Ie]=n.useState(100),[oe,_e]=n.useState(5),[le,Ne]=n.useState(10),[Be,Pe]=n.useState("0.0.0.0"),[Re,Oe]=n.useState(8098),[ce,Fe]=n.useState(!1),[Ke,De]=n.useState(8086),[He,Le]=n.useState("disabled"),[ae,ke]=n.useState(null),[de,Ce]=n.useState({}),pe=()=>{F(!0),setTimeout(()=>j(),400)};n.useEffect(()=>{Se()},[]);const Se=async()=>{var t,m,d,b,P,R,v,Je,qe,Qe,Xe,Ze,et,tt,st,at,nt,rt,it,ot,lt,ct,dt,pt,mt,gt,xt,ht,ut,ft,bt,vt,yt,jt,wt;try{u(!0);const i=await V.getConfig();O(i),me(((t=i.ui)==null?void 0:t.animations_enabled)??!0),ne(((m=i.ui)==null?void 0:m.theme)??"cyberpunk"),q(((d=i.ui)==null?void 0:d.default_view)??"command-center"),ge(((b=i.ui)==null?void 0:b.particle_count)??100),Q(((P=i.ui)==null?void 0:P.vm_matrix_default_filter)??"all"),X(((R=i.ui)==null?void 0:R.matrix_card_width)??85),Z(((v=i.ui)==null?void 0:v.matrix_sort_by)??"vmid"),ie(((Je=i.ui)==null?void 0:Je.matrix_group_by)??"node"),ee(((qe=i.ui)==null?void 0:qe.matrix_group_sort_by)??"node"),te(((Qe=i.ui)==null?void 0:Qe.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((Xe=i.ui)==null?void 0:Xe.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((Ze=i.ui)==null?void 0:Ze.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((et=i.ui)==null?void 0:et.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((tt=i.ui)==null?void 0:tt.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((st=i.ui)==null?void 0:st.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((at=i.ui)==null?void 0:at.matrix_group_sort_order)??"asc");const _t={};(nt=i.clusters)==null||nt.forEach(E=>{_t[E.id]={enabled:E.enabled!==!1,poll_interval:E.poll_interval||5,static_refresh_interval:E.static_refresh_interval||60}}),se(_t),o(((rt=i.alerts)==null?void 0:rt.enabled)??!0),f(((it=i.alerts)==null?void 0:it.cpu_warning)??80),xe(((ot=i.alerts)==null?void 0:ot.cpu_critical)??95),ue(((lt=i.alerts)==null?void 0:lt.memory_warning)??85),be(((ct=i.alerts)==null?void 0:ct.memory_critical)??95),ye(((dt=i.alerts)==null?void 0:dt.disk_warning)??80),we(((pt=i.alerts)==null?void 0:pt.disk_critical)??95),Me(((mt=i.alerts)==null?void 0:mt.diskio_warning)??50),Ie(((gt=i.alerts)==null?void 0:gt.diskio_critical)??100),_e(((xt=i.alerts)==null?void 0:xt.iowait_warning)??5),Ne(((ht=i.alerts)==null?void 0:ht.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((ut=i.alerts)==null?void 0:ut.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((ft=i.alerts)==null?void 0:ft.iowait_critical)??10)),Pe(((bt=i.server)==null?void 0:bt.host)??"0.0.0.0"),Oe(((vt=i.server)==null?void 0:vt.http_port)??8098),Fe(((yt=i.server)==null?void 0:yt.influx_enabled)??!1),De(((jt=i.server)==null?void 0:jt.influx_port)??8086),Le(((wt=i.console)==null?void 0:wt.mode)||"disabled");const Nt={};(i.clusters||[]).forEach(E=>{Nt[E.id]=!!(E.auth&&E.auth.password&&E.auth.password.length>0)}),Ce(Nt)}catch(i){$(String(i))}finally{u(!1)}},Ct=async()=>{var t;try{T(!0),localStorage.setItem("matrix_card_width",String(H)),localStorage.setItem("matrix_sort_by",W),localStorage.setItem("matrix_group_by",N),localStorage.setItem("vm_matrix_default_filter",M),localStorage.setItem("matrix_group_sort_by",I),localStorage.setItem("matrix_group_sort_order",B),localStorage.setItem("iowait_warning",String(oe)),localStorage.setItem("iowait_critical",String(le));const m=(t=g==null?void 0:g.clusters)==null?void 0:t.map(d=>{var b,P,R;return{...d,enabled:((b=G[d.id])==null?void 0:b.enabled)!==!1,poll_interval:((P=G[d.id])==null?void 0:P.poll_interval)||d.poll_interval,static_refresh_interval:((R=G[d.id])==null?void 0:R.static_refresh_interval)||d.static_refresh_interval}});await V.updateConfig({server:{host:Be,http_port:Re,influx_enabled:ce,influx_port:Ke},console:{mode:He},ui:{default_view:D,theme:A,language:y,animations_enabled:J,particle_count:re,vm_matrix_default_filter:M,matrix_card_width:H,matrix_sort_by:W,matrix_group_by:N,matrix_group_sort_by:I,matrix_group_sort_order:B},alerts:{enabled:a,cpu_warning:l,cpu_critical:U,memory_warning:he,memory_critical:fe,disk_warning:ve,disk_critical:je,diskio_warning:$e,diskio_critical:We,iowait_warning:oe,iowait_critical:le},clusters:m}),j()}catch(m){$(String(m))}finally{T(!1)}},St=t=>{se(m=>{var d;return{...m,[t]:{...m[t],enabled:!((d=m[t])!=null&&d.enabled)}}})},Ae=(t,m,d)=>{se(b=>({...b,[t]:{...b[t],[m]:d}}))},ze={id:"",name:"",host:"",port:8006,verify_ssl:!1,user:"root@pam",token_name:"",token_value:""},[Ge,Te]=n.useState(!1),[zt,Ue]=n.useState(!1),[c,z]=n.useState(ze),[Ve,Ye]=n.useState(!1),Tt=async()=>{var m;const t=c.id.trim();if(!/^[a-z0-9][a-z0-9_-]*$/.test(t)){await x.alert(s("settings.conn_id_invalid"));return}if((m=g==null?void 0:g.clusters)!=null&&m.some(d=>d.id===t)){await x.alert(s("settings.conn_id_taken"));return}if(!c.host.trim()||!c.user.trim()){await x.alert(s("settings.conn_required"));return}Ye(!0);try{const d={id:t,name:c.name.trim()||t,enabled:!0,poll_interval:5,static_refresh_interval:60,nodes:[{host:c.host.trim(),port:Number(c.port)||8006,verify_ssl:c.verify_ssl,priority:1}],auth:{user:c.user.trim(),token_name:c.token_name.trim(),token_value:c.token_value,password:""}};await V.updateConfig({clusters:[...(g==null?void 0:g.clusters)||[],d]}),Te(!1),z(ze),await Se()}catch(d){await x.alert(String(d))}finally{Ye(!1)}},Et=async t=>{if(await x.confirm(s("settings.conn_delete_confirm",{id:t}),{destructive:!0}))try{await V.updateConfig({clusters:((g==null?void 0:g.clusters)||[]).filter(d=>d.id!==t)}),await Se()}catch(d){await x.alert(String(d))}};n.useEffect(()=>{const t=m=>{m.key==="Escape"&&!_&&pe()};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[_]);const $t=[{id:"ui",labelKey:"settings.tab_ui",icon:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),e.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),e.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),e.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),e.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),e.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),e.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return e.jsxs("div",{className:`settings-overlay ${_?"exiting":""}`,onClick:t=>t.target===t.currentTarget&&!_&&pe(),children:[e.jsxs("div",{className:`settings-panel panel ${_?"exiting":""}`,children:[e.jsx("div",{className:"settings-scanline"}),h&&e.jsxs("div",{className:"settings-busy","aria-busy":"true",children:[e.jsx("span",{className:"settings-busy-spin"}),e.jsx("span",{className:"settings-busy-text",children:y==="zh-TW"?"儲存中…":"Saving…"})]}),e.jsxs("div",{className:"settings-header",children:[e.jsx("h2",{className:"settings-title font-display",children:s("settings.title")}),e.jsx("button",{className:"settings-close",onClick:pe,children:"×"})]}),e.jsx("div",{className:"settings-tabs",children:$t.map(t=>e.jsxs("button",{className:`settings-tab ${p===t.id?"active":""}`,onClick:()=>L(t.id),children:[t.icon,e.jsx("span",{children:s(t.labelKey)})]},t.id))}),e.jsx("div",{className:"settings-content",children:S?e.jsxs("div",{className:"settings-loading",children:[e.jsx("span",{className:"loading-spinner"}),e.jsx("span",{children:s("loading.data")})]}):w?e.jsx("div",{className:"settings-error",children:e.jsx("span",{children:w})}):e.jsxs(e.Fragment,{children:[p==="ui"&&e.jsxs("div",{className:"tab-content",children:[e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.default_view")}),e.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(t=>e.jsxs("label",{className:`radio-option ${D===t.id?"active":""}`,children:[e.jsx("input",{type:"radio",name:"defaultView",value:t.id,checked:D===t.id,onChange:()=>q(t.id)}),e.jsx("span",{className:"radio-label",children:s(t.labelKey)})]},t.id))})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.vm_matrix_filter")}),e.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(t=>e.jsxs("label",{className:`radio-option ${M===t?"active":""}`,children:[e.jsx("input",{type:"radio",name:"vmFilter",value:t,checked:M===t,onChange:()=>Q(t)}),e.jsx("span",{className:"radio-label",children:s(`settings.filter_${t}`)})]},t))})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.matrix_card_width")}),e.jsxs("div",{className:"input-row",children:[e.jsx("input",{type:"number",className:"input-field",value:H,onChange:t=>X(Number(t.target.value)),min:60,max:200}),e.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.matrix_sort_by")}),e.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(t=>e.jsxs("label",{className:`radio-option ${W===t?"active":""}`,children:[e.jsx("input",{type:"radio",name:"matrixSortBy",value:t,checked:W===t,onChange:()=>Z(t)}),e.jsx("span",{className:"radio-label",children:s(`settings.sort_${t}`)})]},t))})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.matrix_group_by")}),e.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(t=>e.jsxs("label",{className:`radio-option ${N===t?"active":""}`,children:[e.jsx("input",{type:"radio",name:"matrixGroupBy",value:t,checked:N===t,onChange:()=>ie(t)}),e.jsx("span",{className:"radio-label",children:s(`matrix.group_${t}`)})]},t))})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.matrix_group_sort")}),e.jsxs("div",{className:"settings-row",children:[e.jsxs("div",{className:"settings-item",children:[e.jsx("label",{children:s("settings.sort_by")}),e.jsxs("div",{className:"radio-group inline",children:[e.jsxs("label",{className:`radio-option ${I==="node"?"active":""}`,children:[e.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:I==="node",onChange:()=>ee("node")}),e.jsx("span",{className:"radio-label",children:s("settings.sort_node")})]}),e.jsxs("label",{className:`radio-option ${I==="cluster"?"active":""}`,children:[e.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:I==="cluster",onChange:()=>ee("cluster")}),e.jsx("span",{className:"radio-label",children:s("settings.sort_cluster")})]})]})]}),e.jsxs("div",{className:"settings-item",children:[e.jsx("label",{children:s("settings.sort_order")}),e.jsxs("div",{className:"radio-group inline",children:[e.jsxs("label",{className:`radio-option ${B==="asc"?"active":""}`,children:[e.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:B==="asc",onChange:()=>te("asc")}),e.jsx("span",{className:"radio-label",children:s("settings.sort_asc")})]}),e.jsxs("label",{className:`radio-option ${B==="desc"?"active":""}`,children:[e.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:B==="desc",onChange:()=>te("desc")}),e.jsx("span",{className:"radio-label",children:s("settings.sort_desc")})]})]})]})]})]})]}),p==="clusters"&&g&&e.jsx("div",{className:"tab-content",children:e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.cluster_management")}),e.jsx("p",{className:"section-hint",children:s("settings.cluster_hint")}),!Ge&&e.jsxs("button",{className:"conn-add-btn",onClick:()=>Te(!0),children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",children:e.jsx("path",{d:"M12 5v14M5 12h14"})}),e.jsx("span",{children:s("settings.conn_add")})]}),Ge&&e.jsxs("div",{className:"conn-add-form",children:[e.jsx("div",{className:"conn-add-title",children:s("settings.conn_add_title")}),e.jsx("p",{className:"section-hint",children:s("settings.conn_hint")}),e.jsxs("div",{className:"conn-add-grid",children:[e.jsxs("label",{children:[e.jsxs("span",{children:[s("settings.conn_id")," *"]}),e.jsx("input",{className:"input-field-sm",value:c.id,placeholder:"cluster2",onChange:t=>z({...c,id:t.target.value})})]}),e.jsxs("label",{children:[e.jsx("span",{children:s("settings.conn_name")}),e.jsx("input",{className:"input-field-sm",value:c.name,placeholder:"Cluster 2",onChange:t=>z({...c,name:t.target.value})})]}),e.jsxs("label",{children:[e.jsxs("span",{children:[s("settings.conn_host")," *"]}),e.jsx("input",{className:"input-field-sm",value:c.host,placeholder:"10.0.0.10",onChange:t=>z({...c,host:t.target.value})})]}),e.jsxs("label",{children:[e.jsx("span",{children:s("settings.conn_port")}),e.jsx("input",{className:"input-field-sm",type:"number",min:1,max:65535,value:c.port,onChange:t=>z({...c,port:Number(t.target.value)})})]}),e.jsxs("label",{children:[e.jsxs("span",{children:[s("settings.conn_user")," *"]}),e.jsx("input",{className:"input-field-sm",value:c.user,onChange:t=>z({...c,user:t.target.value})})]}),e.jsxs("label",{children:[e.jsx("span",{children:s("settings.conn_token_name")}),e.jsx("input",{className:"input-field-sm",value:c.token_name,placeholder:"jt-proxense",onChange:t=>z({...c,token_name:t.target.value})})]}),e.jsxs("label",{children:[e.jsx("span",{children:s("settings.conn_token_value")}),e.jsx("input",{className:"input-field-sm",type:"password",value:c.token_value,autoComplete:"new-password",onChange:t=>z({...c,token_value:t.target.value})})]}),e.jsxs("label",{className:"conn-ssl-check",children:[e.jsx("input",{type:"checkbox",checked:c.verify_ssl,onChange:t=>z({...c,verify_ssl:t.target.checked})}),e.jsx("span",{children:s("settings.conn_verify_ssl")})]})]}),e.jsxs("div",{className:"conn-add-actions",children:[e.jsx("button",{className:"secret-btn ghost",disabled:Ve,onClick:()=>{Te(!1),z(ze)},children:s("settings.conn_cancel")}),e.jsx("button",{className:"secret-btn primary",disabled:Ve,onClick:Tt,children:s("settings.conn_create")})]})]}),e.jsx("div",{className:"cluster-list-full",children:g.clusters.map(t=>{var P,R;const m=k==null?void 0:k[t.id],d=(m==null?void 0:m.name)||t.name||t.id,b=G[t.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return e.jsxs("div",{className:`cluster-card ${b.enabled?"":"disabled-cluster"}`,children:[e.jsxs("div",{className:"cluster-card-header",children:[e.jsxs("label",{className:"cluster-toggle",onClick:v=>v.stopPropagation(),children:[e.jsx("input",{type:"checkbox",checked:b.enabled,onChange:()=>St(t.id)}),e.jsx("span",{className:"cluster-toggle-switch"})]}),e.jsx("span",{className:`cluster-status ${b.enabled?"enabled":"disabled"}`}),e.jsx("span",{className:"cluster-name",children:d}),e.jsxs("span",{className:"cluster-id",children:["(",t.id,")"]}),e.jsxs("button",{type:"button",className:"conn-del-btn",title:s("settings.conn_delete"),onClick:v=>{v.stopPropagation(),Et(t.id)},children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),e.jsx("path",{d:"M10 11v6M14 11v6"}),e.jsx("path",{d:"M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"})]}),e.jsx("span",{children:s("settings.conn_delete")})]})]}),e.jsxs("div",{className:"cluster-card-body",children:[e.jsxs("div",{className:"cluster-setting",children:[e.jsx("label",{children:s("settings.poll_interval")}),e.jsx("input",{type:"number",className:"input-field-sm",value:b.poll_interval,onChange:v=>Ae(t.id,"poll_interval",Number(v.target.value)),min:1,max:60})]}),e.jsxs("div",{className:"cluster-setting",children:[e.jsx("label",{children:s("settings.static_refresh")}),e.jsx("input",{type:"number",className:"input-field-sm",value:b.static_refresh_interval,onChange:v=>Ae(t.id,"static_refresh_interval",Number(v.target.value)),min:30,max:600})]})]}),e.jsxs("div",{className:"cluster-card-info",children:[e.jsx("span",{children:s("settings.nodes_count",{n:((P=t.nodes)==null?void 0:P.length)||0})}),e.jsxs("span",{children:[s("settings.auth"),": ",((R=t.auth)==null?void 0:R.user)||"N/A"]})]}),e.jsxs("div",{className:"cluster-secret-row",children:[e.jsx("span",{className:"secret-label",children:s("settings.cluster_pve_password")}),e.jsx("span",{className:`secret-status ${de[t.id]?"set":"unset"}`,children:de[t.id]?s("settings.secret_set"):s("settings.secret_unset")}),e.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>ke(t.id),children:de[t.id]?s("settings.secret_replace"):s("settings.secret_set_btn")}),de[t.id]&&e.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(await x.confirm(s("settings.secret_confirm_clear",{id:t.id}),{destructive:!0}))try{await V.deleteClusterSecret(t.id,"pve_password"),Ce(v=>({...v,[t.id]:!1}))}catch(v){await x.alert(String(v))}},children:s("settings.secret_clear")})]})]},t.id)})})]})}),p==="alerts"&&e.jsxs("div",{className:"tab-content",children:[e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("notif.title")}),e.jsx("p",{style:{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-secondary)",marginBottom:8},children:s("settings.notif_lead")}),e.jsxs("button",{className:"action-btn",onClick:()=>K(!0),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"}),e.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]}),e.jsx("span",{children:s("settings.notif_manage")})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.cpu_threshold")}),e.jsxs("div",{className:"threshold-row",children:[e.jsxs("div",{className:"threshold-item warning",children:[e.jsxs("label",{children:[s("settings.warning")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:l,onChange:t=>f(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider warning",value:l,onChange:t=>f(Number(t.target.value)),min:0,max:100})]}),e.jsxs("div",{className:"threshold-item danger",children:[e.jsxs("label",{children:[s("settings.critical")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:U,onChange:t=>xe(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider danger",value:U,onChange:t=>xe(Number(t.target.value)),min:0,max:100})]})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.memory_threshold")}),e.jsxs("div",{className:"threshold-row",children:[e.jsxs("div",{className:"threshold-item warning",children:[e.jsxs("label",{children:[s("settings.warning")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:he,onChange:t=>ue(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider warning",value:he,onChange:t=>ue(Number(t.target.value)),min:0,max:100})]}),e.jsxs("div",{className:"threshold-item danger",children:[e.jsxs("label",{children:[s("settings.critical")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:fe,onChange:t=>be(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider danger",value:fe,onChange:t=>be(Number(t.target.value)),min:0,max:100})]})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.disk_threshold")}),e.jsxs("div",{className:"threshold-row",children:[e.jsxs("div",{className:"threshold-item warning",children:[e.jsxs("label",{children:[s("settings.warning")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:ve,onChange:t=>ye(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider warning",value:ve,onChange:t=>ye(Number(t.target.value)),min:0,max:100})]}),e.jsxs("div",{className:"threshold-item danger",children:[e.jsxs("label",{children:[s("settings.critical")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:je,onChange:t=>we(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider danger",value:je,onChange:t=>we(Number(t.target.value)),min:0,max:100})]})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.diskio_threshold")}),e.jsxs("div",{className:"threshold-row",children:[e.jsxs("div",{className:"threshold-item warning",children:[e.jsx("label",{children:s("settings.warning")}),e.jsx("input",{type:"number",className:"input-field-sm",value:$e,onChange:t=>Me(Number(t.target.value)),min:0,max:1e4})]}),e.jsxs("div",{className:"threshold-item danger",children:[e.jsx("label",{children:s("settings.critical")}),e.jsx("input",{type:"number",className:"input-field-sm",value:We,onChange:t=>Ie(Number(t.target.value)),min:0,max:1e4})]})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.iowait_threshold")}),e.jsxs("div",{className:"threshold-row",children:[e.jsxs("div",{className:"threshold-item warning",children:[e.jsxs("label",{children:[s("settings.warning")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:oe,onChange:t=>_e(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider warning",value:oe,onChange:t=>_e(Number(t.target.value)),min:0,max:100})]}),e.jsxs("div",{className:"threshold-item danger",children:[e.jsxs("label",{children:[s("settings.critical")," (%)"]}),e.jsx("input",{type:"number",className:"input-field-sm",value:le,onChange:t=>Ne(Number(t.target.value)),min:0,max:100}),e.jsx("input",{type:"range",className:"threshold-slider danger",value:le,onChange:t=>Ne(Number(t.target.value)),min:0,max:100})]})]})]})]}),p==="server"&&e.jsxs("div",{className:"tab-content",children:[e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("sshsetup.title")}),e.jsx("p",{className:"section-hint",children:s("sshsetup.intro")}),e.jsxs("button",{className:"conn-add-btn",onClick:()=>Ue(!0),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),e.jsx("span",{children:s("sshsetup.button")})]})]}),e.jsx(Mt,{}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.http_server")}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-row",children:[e.jsx("label",{children:s("settings.host")}),e.jsx("input",{type:"text",className:"input-field",value:Be,onChange:t=>Pe(t.target.value)})]}),e.jsxs("div",{className:"input-row",children:[e.jsx("label",{children:s("settings.port")}),e.jsx("input",{type:"number",className:"input-field",value:Re,onChange:t=>Oe(Number(t.target.value)),min:1,max:65535})]})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.influx_integration")}),e.jsxs("label",{className:"toggle-option",children:[e.jsx("input",{type:"checkbox",checked:ce,onChange:t=>Fe(t.target.checked)}),e.jsx("span",{className:"toggle-switch"}),e.jsx("span",{className:"toggle-label",children:s(ce?"settings.enabled":"settings.disabled")})]}),ce&&e.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[e.jsx("label",{children:s("settings.influx_port")}),e.jsx("input",{type:"number",className:"input-field",value:Ke,onChange:t=>De(Number(t.target.value)),min:1,max:65535})]})]}),e.jsxs("div",{className:"settings-section",children:[e.jsx("h3",{className:"section-title",children:s("settings.console_section")}),e.jsxs("div",{className:"input-row",children:[e.jsx("label",{children:s("settings.console_mode")}),e.jsx(Wt,{className:"full",value:He,onChange:Le,options:[{value:"disabled",label:s("settings.console_mode_disabled")},{value:"stored",label:s("settings.console_mode_stored")},{value:"prompt",label:s("settings.console_mode_prompt")}]})]}),e.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),e.jsx("span",{children:s("settings.console_mode_hint")})]})]}),e.jsx("div",{className:"settings-section",children:e.jsxs("div",{className:"server-note",children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),e.jsx("span",{children:s("settings.server_restart_note")})]})})]})]})}),e.jsxs("div",{className:"settings-footer",children:[e.jsxs("div",{className:"settings-footer-left",children:[e.jsxs("div",{className:"settings-version",children:[e.jsx("span",{className:"version-label",children:s("settings.version")}),e.jsxs("span",{className:"version-number",children:["v","1.2.0"]})]}),e.jsxs("div",{className:"settings-author",children:[e.jsx("span",{className:"author-label",children:"by"}),e.jsx("span",{className:"author-name",children:"Jason Cheng"}),e.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),e.jsxs("div",{className:"settings-actions",children:[e.jsx("button",{className:"btn",onClick:pe,children:s("action.cancel")}),e.jsx("button",{className:"btn btn-primary",onClick:Ct,disabled:h||_,children:s(h?"action.saving":"action.save")})]})]}),e.jsx("div",{className:"corner-decoration top-left"}),e.jsx("div",{className:"corner-decoration top-right"}),e.jsx("div",{className:"corner-decoration bottom-left"}),e.jsx("div",{className:"corner-decoration bottom-right"})]}),e.jsx(Bt,{open:ae!==null,cluster_id:ae||"",kind:"pve_password",title:s("settings.secret_pw_title",{id:ae||""}),body:s("settings.secret_pw_body"),label:s("settings.secret_pw_label"),onClose:()=>ke(null),onSaved:()=>{ae&&Ce(t=>({...t,[ae]:!0})),ke(null)}}),e.jsx(Ot,{open:Y,onClose:()=>K(!1)}),e.jsx(It,{open:zt,onClose:()=>Ue(!1),nodes:(Object.keys(k||{}).length,void 0)}),e.jsx("style",{children:`
        .settings-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          animation: overlay-enter 0.3s ease-out;
        }

        .settings-overlay.exiting {
          animation: overlay-exit 0.4s ease-in forwards;
        }

        @keyframes overlay-enter {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }

        @keyframes overlay-exit {
          to { opacity: 0; backdrop-filter: none; }
        }

        .settings-busy {
          position: absolute;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: rgba(2, 4, 10, 0.6);
          cursor: wait;
        }
        .settings-busy-spin {
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 2px solid rgba(0, 240, 255, 0.25);
          border-top-color: var(--primary);
          animation: settings-busy-rot 0.8s linear infinite;
        }
        @keyframes settings-busy-rot { to { transform: rotate(360deg); } }
        .settings-busy-text {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow: none;
        }

        .settings-panel {
          width: 600px;
          max-width: 95vw;
          max-height: 85vh;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          animation: panel-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 240, 255, 0.1);
        }

        .settings-panel.exiting {
          animation: panel-exit 0.4s ease-in forwards;
        }

        @keyframes panel-enter {
          0% { opacity: 0; transform: scale(0.9) translateY(30px); filter: brightness(2) blur(10px); }
          50% { filter: brightness(1.3) blur(2px); }
          100% { opacity: 1; transform: none; filter: none; }
        }

        @keyframes panel-exit {
          0% { opacity: 1; transform: scale(1); filter: brightness(1); }
          30% { filter: brightness(1.5); }
          100% { opacity: 0; transform: scale(0.85) translateY(-20px); filter: brightness(2) blur(10px); }
        }

        .settings-scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scanline-sweep 2s linear infinite;
          z-index: 10;
          pointer-events: none;
          opacity: 0.6;
        }

        @keyframes scanline-sweep {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(calc(85vh)); opacity: 0; }
        }

        .settings-panel.exiting .settings-scanline {
          animation: none;
          opacity: 0;
        }

        .settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border);
        }

        .settings-title {
          font-size: 18px;
          color: var(--primary);
          letter-spacing: 0.15em;
        }

        .settings-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .settings-close:hover { color: var(--text-primary); }

        /* Tabs */
        .settings-tabs {
          display: flex;
          gap: 2px;
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--primary-dim) transparent;
          min-height: 48px;
          align-items: center;
        }

        .settings-tabs::-webkit-scrollbar {
          height: 4px;
        }

        .settings-tabs::-webkit-scrollbar-track {
          background: transparent;
        }

        .settings-tabs::-webkit-scrollbar-thumb {
          background: var(--primary-dim);
          border-radius: 2px;
        }

        .settings-tab {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
          white-space: nowrap;
        }

        .settings-tab:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
        }

        .settings-tab.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.1);
          border-color: var(--primary-dim);
        }

        .settings-tab svg {
          flex-shrink: 0;
        }

        .settings-content {
          flex: 1;
          overflow: auto;
          padding: var(--spacing-lg);
        }

        .settings-content::-webkit-scrollbar {
          width: 10px;
        }

        .settings-content::-webkit-scrollbar-track {
          background: var(--bg-secondary);
          border-radius: 5px;
        }

        .settings-content::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.35);
          border-radius: 5px;
          border: 2px solid var(--bg-secondary);
        }

        .settings-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.55);
        }

        .settings-loading, .settings-error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          padding: var(--spacing-xl);
          color: var(--text-secondary);
        }

        .settings-error { color: var(--danger-text); }

        .tab-content {
          animation: tab-fade-in 0.2s ease-out;
        }

        @keyframes tab-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }

        .settings-section {
          margin-bottom: var(--spacing-lg);
        }

        .settings-section:last-child { margin-bottom: 0; }

        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
        }

        .section-hint {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: var(--spacing-sm);
        }

        .radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }

        .radio-group.inline {
          flex-wrap: nowrap;
        }

        .settings-row {
          display: flex;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .settings-row .settings-item {
          flex: 1;
          min-width: 150px;
        }

        .settings-row .settings-item label {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: var(--spacing-xs);
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .radio-option:hover { border-color: var(--primary-dim); }
        .radio-option.active { border-color: var(--primary); background: rgba(0, 240, 255, 0.1); }
        .radio-option input { display: none; }

        .radio-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        .toggle-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          cursor: pointer;
        }

        .toggle-option input { display: none; }

        .toggle-switch {
          position: relative;
          width: 52px;
          height: 26px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: all var(--transition-fast);
          overflow: hidden;
        }

        .toggle-switch::before {
          content: 'OFF';
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          transition: all var(--transition-fast);
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 18px;
          background: linear-gradient(180deg, var(--text-secondary) 0%, rgba(100, 100, 120, 0.8) 100%);
          border-radius: 2px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .toggle-option:hover .toggle-switch {
          border-color: var(--primary-dim);
        }

        .toggle-option input:checked + .toggle-switch {
          background: rgba(0, 240, 255, 0.15);
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1);
        }

        .toggle-option input:checked + .toggle-switch::before {
          content: 'ON';
          right: auto;
          left: 8px;
          color: var(--primary);
          text-shadow: 0 0 6px var(--primary);
        }

        .toggle-option input:checked + .toggle-switch::after {
          left: 27px;
          background: linear-gradient(180deg, var(--primary) 0%, rgba(0, 180, 200, 1) 100%);
          box-shadow: 0 0 10px var(--primary), 0 0 20px rgba(0, 240, 255, 0.5);
        }

        .toggle-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        /* Input fields */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .input-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .input-row label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          min-width: 100px;
        }

        .input-field {
          flex: 1;
          max-width: 200px;
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .input-field:focus { border-color: var(--primary); }

        .input-field-sm {
          width: 80px;
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
          text-align: center;
        }

        .input-field-sm:focus { border-color: var(--primary); }

        .input-hint {
          font-size: 13px;
          color: var(--text-muted);
          margin-left: var(--spacing-sm);
        }

        /* Cluster cards */
        .cluster-list-full {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .cluster-card {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-md);
          transition: all var(--transition-fast);
        }

        .cluster-card:hover { border-color: var(--primary-dim); }
        .cluster-card.disabled-cluster { opacity: 0.6; }

        .cluster-card-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }

        .cluster-toggle {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .cluster-toggle input { display: none; }

        .cluster-toggle-switch {
          position: relative;
          width: 36px;
          height: 20px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: all var(--transition-fast);
        }

        .cluster-toggle-switch::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: var(--text-muted);
          border-radius: 50%;
          transition: all var(--transition-fast);
        }

        .cluster-toggle input:checked + .cluster-toggle-switch {
          background: rgba(0, 240, 255, 0.2);
          border-color: var(--primary);
        }

        .cluster-toggle input:checked + .cluster-toggle-switch::after {
          left: 18px;
          background: var(--primary);
          box-shadow: 0 0 6px var(--primary);
        }

        .cluster-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .cluster-status.enabled {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .cluster-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
        }

        .cluster-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .cluster-card-body {
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-sm) 0;
        }

        .cluster-setting {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .cluster-setting label {
          font-size: 13px;
          /* was --text-muted (#707070) — too dim to read on the modal
             (operator feedback). Match the other settings labels. */
          color: var(--text-secondary);
        }

        .cluster-card-info {
          display: flex;
          gap: var(--spacing-md);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
        }

        /* Per-cluster encrypted-secret row (PVE password). Shows status +
           Set / Replace / Clear buttons. The status pill colour mirrors the
           "configured / not set" state. */
        .cluster-secret-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 13px;
          flex-wrap: wrap;
        }
        .cluster-secret-row .secret-label {
          color: var(--text-secondary);
          min-width: 110px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 12px;
        }
        .cluster-secret-row .secret-status {
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.04em;
          border: 1px solid currentColor;
        }
        .cluster-secret-row .secret-status.set {
          color: var(--success);
        }
        .cluster-secret-row .secret-status.unset {
          color: var(--text-muted);
        }
        .cluster-secret-row .secret-btn {
          margin-left: auto;
          padding: 5px 12px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .cluster-secret-row .secret-btn + .secret-btn {
          margin-left: 0;
        }
        .cluster-secret-row .secret-btn.primary {
          color: #001018;
          background: linear-gradient(135deg, var(--primary), #00b8d4);
        }
        .cluster-secret-row .secret-btn.ghost {
          background: transparent;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .cluster-secret-row .secret-btn.ghost:hover {
          color: var(--danger-text);
          border-color: var(--danger-text);
        }

        /* Add / delete connection */
        .conn-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: var(--spacing-md);
          padding: 7px 16px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 4px;
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .conn-add-btn:hover {
          background: rgba(0, 240, 255, 0.16);
        }
        .conn-add-form {
          background: rgba(0, 240, 255, 0.03);
          border: 1px dashed rgba(0, 240, 255, 0.3);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        .conn-add-title {
          font-family: var(--font-display);
          font-size: 15px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow: none;
          margin-bottom: 6px;
        }
        /* This form read cramped — bump label/input/hint sizes (operator
           feedback: "東西都太小了"). Scoped to .conn-add-form so the small
           .input-field-sm used elsewhere is untouched. */
        .conn-add-form .section-hint { font-size: 13px; line-height: 1.5; }
        .conn-add-form .input-field-sm {
          font-size: 14px;
          padding: 9px 12px;
        }
        .conn-add-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px 18px;
          margin: 14px 0 18px;
        }
        .conn-add-grid label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .conn-add-grid label.conn-ssl-check {
          flex-direction: row;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          text-transform: none;
          letter-spacing: 0;
          font-size: 12px;
          align-self: end;
          padding-bottom: 6px;
          cursor: pointer;
        }
        .conn-ssl-check input { accent-color: var(--primary); }
        .conn-add-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .conn-add-actions .secret-btn {
          padding: 5px 14px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .conn-add-actions .secret-btn:disabled { opacity: .5; cursor: not-allowed; }
        .conn-add-actions .secret-btn.primary {
          color: #001018;
          background: linear-gradient(135deg, var(--primary), #00b8d4);
        }
        .conn-add-actions .secret-btn.ghost {
          background: transparent;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .conn-del-btn {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          background: transparent;
          border: 1px solid rgba(255, 77, 109, 0.35);
          border-radius: 3px;
          color: var(--danger, #ff4d6d);
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .conn-del-btn:hover {
          background: rgba(255, 77, 109, 0.12);
          border-color: var(--danger, #ff4d6d);
        }

        /* Threshold settings */
        .threshold-row {
          display: flex;
          gap: var(--spacing-lg);
        }

        .threshold-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--text-muted);
        }

        .threshold-item.warning { border-left-color: var(--warning); }
        .threshold-item.danger { border-left-color: var(--danger-text); }

        .threshold-item label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Horizontal slider paired with the number box (operator request).
           Colour-matched to the warning / critical accent. */
        .threshold-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          margin-top: 2px;
          border-radius: 999px;
          background: var(--bg-primary);
          outline: none;
          cursor: pointer;
        }
        .threshold-slider.warning { accent-color: var(--warning); }
        .threshold-slider.danger { accent-color: var(--danger-text); }
        .threshold-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          border: 2px solid var(--bg-base, #000);
          cursor: pointer;
        }
        .threshold-slider.warning::-webkit-slider-thumb { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
        .threshold-slider.danger::-webkit-slider-thumb { background: var(--danger-text); box-shadow: 0 0 8px var(--danger-text); }
        .threshold-slider.warning::-moz-range-thumb { background: var(--warning); border: 2px solid var(--bg-base, #000); }
        .threshold-slider.danger::-moz-range-thumb { background: var(--danger-text); border: 2px solid var(--bg-base, #000); }

        /* Server note */
        .server-note {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid var(--warning-dim);
          border-radius: var(--radius-sm);
          color: var(--warning);
          font-size: 13px;
        }

        .server-note svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .settings-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          border-top: 1px solid var(--border);
        }

        .settings-footer-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .settings-version {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .version-label {
          color: var(--text-muted);
        }

        .settings-author {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .author-label {
          color: var(--text-muted);
        }

        .author-name {
          color: var(--primary);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.4);
        }

        .author-org {
          color: var(--text-secondary);
        }

        .version-number {
          color: var(--primary-dim);
        }

        .settings-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
      `})]})}export{Ht as SettingsPanel};
