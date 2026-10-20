import{j as e,R as Qt,r as o,u as We,a as It,b as ea,h as Ue,g as ze,c as ct,i as Xt,d as Oe,f as Ea}from"./index-DeG9m4sY.js";import{V as Ja,R as Xa,S as Za,B as Qa,C as er}from"./ConsolePasswordPrompt-npI1cSAA.js";import{V as tr}from"./VMExportModal-Damb5zr5.js";import{R as ar}from"./RRDChartModal-CP0qP0m9.js";import{F as rr}from"./FirewallModal-B3Q0iyob.js";import"./CyberSelect-BYmnn2HO.js";const sr={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function nr(r){return r.includes("start")||r.includes("restore")?"pulse-grow":r.includes("stop")||r.includes("shutdown")?"pulse-fade":r.includes("migrate")?"slide":r.includes("dump")||r.includes("backup")?"stripe":r.includes("snapshot")?"flash":r.includes("rollback")?"reverse":"pulse"}function or({task:r}){const l=sr[r.task_type]||{label:r.task_type,icon:"⚙",color:"var(--primary)"},d=nr(r.task_type);return e.jsxs("span",{className:`task-badge ${d}`,style:{"--task-color":l.color},title:l.label,children:[e.jsx("span",{className:"task-badge-icon",children:l.icon}),e.jsx("span",{className:"task-badge-text",children:l.label}),e.jsx("style",{children:ir})]})}const ir=`
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
`;function lr({open:r,title:l,details:d,typeToConfirm:p,destructive:v=!1,confirmLabel:b="Confirm",cancelLabel:u="Cancel",onConfirm:C,onCancel:m}){const[_,P]=Qt.useState(""),O=o.useRef(null),B=o.useRef(null);if(o.useEffect(()=>{r&&(P(""),setTimeout(()=>{var L,T;p?(L=B.current)==null||L.focus():(T=O.current)==null||T.focus()},50))},[r,p]),o.useEffect(()=>{if(!r)return;const L=T=>{T.key==="Escape"&&(T.preventDefault(),m()),T.key==="Enter"&&(!p||_===p)&&(T.preventDefault(),C())};return document.addEventListener("keydown",L),()=>document.removeEventListener("keydown",L)},[r,_,p,C,m]),!r)return null;const F=!p||_===p;return e.jsxs("div",{onClick:m,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[e.jsx("style",{children:`
        @keyframes cmFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
        .cm-card {
          width: min(440px, 100%);
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0,240,255,.35);
          border-radius: 12px;
          box-shadow:
            0 0 0 1px rgba(0,240,255,.1),
            0 16px 60px rgba(0,0,0,.65),
            0 0 80px -20px rgba(0,240,255,.5);
          padding: 24px 26px;
          animation: cmSlide .2s ease;
        }
        .cm-card.danger {
          border-color: rgba(255,56,96,.45);
          box-shadow:
            0 0 0 1px rgba(255,56,96,.18),
            0 16px 60px rgba(0,0,0,.65),
            0 0 80px -20px rgba(255,56,96,.5);
        }
        .cm-title {
          font-family: 'Orbitron', sans-serif; font-weight: 700;
          font-size: 16px; letter-spacing: .08em; text-transform: uppercase;
          color: #e6f6ff; margin: 0 0 4px;
        }
        .cm-card.danger .cm-title { color: #ff8aa0; }
        .cm-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
          color: #00f0ff; margin-bottom: 14px;
        }
        .cm-card.danger .cm-eyebrow { color: #ff3860; }
        .cm-details {
          font-family: 'Rajdhani', sans-serif; font-size: 15px;
          color: #95a8c4; line-height: 1.5; margin-bottom: 16px;
        }
        .cm-details code, .cm-details strong {
          color: #e6f6ff; font-family: 'Share Tech Mono', monospace;
          background: rgba(0,240,255,.08); padding: 1px 6px; border-radius: 3px;
        }
        .cm-input-label {
          display: block; font-size: 13px; letter-spacing: .08em;
          text-transform: uppercase; color: #95a8c4; margin: 16px 0 6px;
        }
        .cm-input {
          width: 100%; padding: 10px 14px;
          background: #02050b; color: #e6f6ff;
          border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
          font-family: 'Share Tech Mono', monospace; font-size: 15px;
          outline: none;
        }
        .cm-input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
        .cm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
        .cm-btn {
          padding: 9px 20px;
          font-family: 'Orbitron', sans-serif; font-weight: 600;
          font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
          border-radius: 6px; cursor: pointer; border: 1px solid transparent;
        }
        .cm-btn.cancel { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
        .cm-btn.cancel:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
        .cm-btn.confirm { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
        .cm-btn.confirm.danger { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
        .cm-btn:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
      `}),e.jsxs("div",{className:`cm-card ${v?"danger":""}`,onClick:L=>L.stopPropagation(),children:[e.jsx("div",{className:"cm-eyebrow",children:v?"// destructive action":"// confirm"}),e.jsx("h3",{className:"cm-title",children:l}),d&&e.jsx("div",{className:"cm-details",children:d}),p&&e.jsxs(e.Fragment,{children:[e.jsxs("label",{className:"cm-input-label",children:["Type ",e.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:p})," to confirm"]}),e.jsx("input",{ref:B,className:"cm-input",type:"text",value:_,onChange:L=>P(L.target.value),autoComplete:"off",spellCheck:!1})]}),e.jsxs("div",{className:"cm-actions",children:[e.jsx("button",{className:"cm-btn cancel",onClick:m,children:u}),e.jsx("button",{ref:O,className:`cm-btn confirm ${v?"danger":""}`,disabled:!F,onClick:C,children:b})]})]})]})}const cr=/^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$/;function dr({open:r,onClose:l,clusterId:d,vm:p,nodes:v,onDone:b}){const{t:u}=We();It();const[C,m]=o.useState(""),[_,P]=o.useState(""),[O,B]=o.useState(""),[F,L]=o.useState(""),[T,$]=o.useState(!0),[W,A]=o.useState(!1),[Y,ae]=o.useState(null);o.useEffect(()=>{r&&(m(""),P(""),B(""),L(""),$(!0),ae(null),A(!1),(async()=>{try{const S=await fetch(`/api/clusters/${encodeURIComponent(d)}/next-vmid`,{credentials:"same-origin"});if(S.ok){const J=await S.json();J.vmid&&m(String(J.vmid))}}catch{}})())},[r,d]);const ne=o.useMemo(()=>{const S=parseInt(C,10);return!(!Number.isFinite(S)||S<100||S>999999999||F&&!cr.test(F))},[C,F]);if(!r||!p)return null;const w=async()=>{ae(null),A(!0);try{const S={newid:parseInt(C,10),full:T};_&&(S.name=_),O&&(S.target_node=O),F&&(S.storage=F);const J=await fetch(`/api/clusters/${encodeURIComponent(d)}/vms/${p.vmid}/clone`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(S)}),q=await J.json().catch(()=>({}));if(!J.ok||!q.ok)throw new Error(q.detail||q.error||`HTTP ${J.status}`);b==null||b(),l()}catch(S){ae(`${u("clone.error")}: ${S.message||S}`)}finally{A(!1)}};return e.jsxs(ta,{title:u("clone.title").replace("{kind}",p.type==="lxc"?"CT":"VM").replace("{vmid}",String(p.vmid)),onClose:l,disabled:W,children:[Y&&e.jsx("div",{className:"am-error",children:Y}),e.jsx(Le,{label:u("clone.field.newid"),children:e.jsx("input",{type:"number",min:100,value:C,onChange:S=>m(S.target.value)})}),e.jsx(Le,{label:u("clone.field.name"),children:e.jsx("input",{value:_,onChange:S=>P(S.target.value),placeholder:p.name})}),e.jsx(Le,{label:u("clone.field.target_node"),children:e.jsxs("select",{value:O,onChange:S=>B(S.target.value),children:[e.jsx("option",{value:"",children:u("clone.field.target_node_same")}),v.filter(S=>S!==p.node).map(S=>e.jsx("option",{value:S,children:S},S))]})}),e.jsx(Le,{label:u("clone.field.storage"),children:e.jsx("input",{value:F,onChange:S=>L(S.target.value),placeholder:u("clone.field.storage_default")})}),e.jsx(Le,{label:u("clone.field.full"),children:e.jsx("input",{type:"checkbox",checked:T,onChange:S=>$(S.target.checked)})}),e.jsx("div",{className:"am-help",children:u("clone.field.full_help")}),e.jsxs(aa,{children:[e.jsx(sa,{onClick:l,disabled:W,label:u("clone.cancel")}),e.jsx(Pa,{onClick:w,disabled:W||!ne,icon:"copy",label:u(W?"clone.busy":"clone.submit")})]})]})}function pr({open:r,onClose:l,clusterId:d,vm:p,nodes:v,onDone:b}){const{t:u}=We(),[C,m]=o.useState(""),[_,P]=o.useState(!0),[O,B]=o.useState(!1),[F,L]=o.useState(!1),[T,$]=o.useState(null);if(o.useEffect(()=>{if(!r)return;const A=v.filter(Y=>Y!==(p==null?void 0:p.node));m(A[0]||""),P(!0),B(!1),$(null),L(!1)},[r,p,v]),!r||!p)return null;const W=async()=>{$(null),L(!0);try{const A=p.type==="lxc"?`/api/clusters/${encodeURIComponent(d)}/cts/${p.vmid}/migrate`:`/api/clusters/${encodeURIComponent(d)}/vms/${p.vmid}/migrate`,Y=p.type==="lxc"?{target:C,online:_}:{target_node:C,online:_};O&&p.type!=="lxc"&&(Y.with_local_disks=!0);const ae=await fetch(A,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(Y)}),ne=await ae.json().catch(()=>({}));if(!ae.ok||!ne.ok)throw new Error(ne.detail||ne.error||`HTTP ${ae.status}`);b==null||b(),l()}catch(A){$(`${u("mig.error")}: ${A.message||A}`)}finally{L(!1)}};return e.jsxs(ta,{title:u("mig.title").replace("{kind}",p.type==="lxc"?"CT":"VM").replace("{vmid}",String(p.vmid)),onClose:l,disabled:F,children:[T&&e.jsx("div",{className:"am-error",children:T}),e.jsx(Le,{label:u("mig.field.target"),children:(()=>{const A=v.filter(Y=>Y!==p.node);return A.length===0?e.jsx("select",{disabled:!0,value:"",children:e.jsx("option",{value:"",children:u("mig.field.target_none")})}):e.jsx("select",{value:C,onChange:Y=>m(Y.target.value),children:A.map(Y=>e.jsx("option",{value:Y,children:Y},Y))})})()}),e.jsx(Le,{label:u("mig.field.online"),children:e.jsx("input",{type:"checkbox",checked:_,onChange:A=>P(A.target.checked)})}),e.jsx("div",{className:"am-help",children:u("mig.field.online_help")}),p.type!=="lxc"&&e.jsx(Le,{label:u("mig.field.local_disks"),children:e.jsx("input",{type:"checkbox",checked:O,onChange:A=>B(A.target.checked)})}),e.jsxs(aa,{children:[e.jsx(sa,{onClick:l,disabled:F,label:u("mig.cancel")}),e.jsx(Pa,{onClick:W,disabled:F||!C,icon:"migrate",label:u(F?"mig.busy":"mig.submit")})]})]})}function mr({open:r,onClose:l,clusterId:d,vm:p,onDone:v}){const{t:b}=We(),[u,C]=o.useState(""),[m,_]=o.useState(!0),[P,O]=o.useState(!1),[B,F]=o.useState(null);if(o.useEffect(()=>{r&&(C(""),_(!0),F(null),O(!1))},[r]),!r||!p)return null;const L=u.trim()===String(p.vmid),T=async()=>{F(null),O(!0);try{const $=`/api/clusters/${encodeURIComponent(d)}/vms/${p.vmid}${m?"?purge=1":""}`,W=await fetch($,{method:"DELETE",credentials:"same-origin"}),A=await W.json().catch(()=>({}));if(!W.ok||!A.ok)throw new Error(A.detail||A.error||`HTTP ${W.status}`);v==null||v(),l()}catch($){F(`${b("del.error")}: ${$.message||$}`)}finally{O(!1)}};return e.jsxs(ta,{title:b("del.title").replace("{kind}",p.type==="lxc"?"CT":"VM").replace("{vmid}",String(p.vmid)),danger:!0,onClose:l,disabled:P,children:[B&&e.jsx("div",{className:"am-error",children:B}),e.jsxs("div",{className:"am-warn",children:["⚠ ",b("del.warn")]}),e.jsx(Le,{label:b("del.type_to_confirm"),children:e.jsx("input",{value:u,onChange:$=>C($.target.value.replace(/\D/g,"")),placeholder:String(p.vmid),autoFocus:!0,inputMode:"numeric"})}),e.jsx(Le,{label:b("del.purge"),children:e.jsx("input",{type:"checkbox",checked:m,onChange:$=>_($.target.checked)})}),e.jsxs(aa,{children:[e.jsx(sa,{onClick:l,disabled:P,label:b("del.cancel")}),e.jsx(hr,{onClick:T,disabled:P||!L,icon:"trash",label:b(P?"del.busy":"del.submit")})]})]})}function ta({title:r,danger:l,onClose:d,disabled:p,children:v}){return e.jsx("div",{className:"am-back",onClick:()=>!p&&d(),children:e.jsxs("div",{className:`am-modal ${l?"am-modal-danger":""}`,onClick:b=>b.stopPropagation(),children:[e.jsxs("div",{className:"am-head",children:[e.jsx("span",{children:r}),e.jsx("button",{className:"am-close",onClick:d,disabled:p,children:"×"})]}),e.jsx("div",{className:"am-body",children:v}),e.jsx("style",{children:`
          .am-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .am-modal { width: min(560px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: am-in .18s ease-out; overflow: hidden; }
          .am-modal-danger { border-color: var(--danger, #ff4d6d); box-shadow: 0 0 32px rgba(255,77,109,.25); }
          @keyframes am-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .am-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); color: var(--primary); font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
          .am-modal-danger .am-head { color: var(--danger, #ff4d6d); border-bottom-color: rgba(255,77,109,.3); }
          .am-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .am-close:hover { color: var(--primary); }
          .am-body { padding: 14px 18px; overflow: auto; }
          .am-row { display: grid; grid-template-columns: 160px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .am-row > span { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .am-row input, .am-row select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .am-row input[type="checkbox"] { justify-self: start; }
          .am-row input:focus, .am-row select:focus { border-color: var(--primary); }
          .am-help { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); margin: 4px 0 12px 170px; line-height: 1.4; }
          .am-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .am-warn { padding: 10px 14px; margin-bottom: 14px; border: 1px solid var(--warning); background: rgba(255, 200, 0, 0.08); color: var(--warning); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; line-height: 1.5; }
          .am-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px; }
          .am-actions button {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 7px 18px;
            font-family: var(--font-display); font-size: 13.5px;
            letter-spacing: .08em; text-transform: uppercase;
            background: transparent; color: var(--text-secondary);
            border: 1px solid rgba(255,255,255,.18);
            border-radius: 3px;
            cursor: pointer;
            transition: background .12s, border-color .12s, color .12s;
          }
          .am-actions button:hover:not(:disabled) {
            background: rgba(0, 240, 255, 0.06);
            color: var(--primary);
            border-color: rgba(0, 240, 255, 0.4);
          }
          .am-actions .am-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .am-actions .am-primary:hover:not(:disabled) { background: var(--primary); color: #001018; box-shadow: 0 0 12px rgba(0, 240, 255, 0.45); }
          .am-actions .am-danger { background: var(--danger, #ff4d6d); color: #100007; border-color: var(--danger, #ff4d6d); }
          .am-actions .am-danger:hover:not(:disabled) { background: var(--danger, #ff4d6d); color: #100007; box-shadow: 0 0 12px rgba(255, 77, 109, 0.5); }
          .am-actions button:disabled { opacity: .4; cursor: not-allowed; }
          .am-btn-ico { flex-shrink: 0; }
        `})]})})}function Le({label:r,children:l}){return e.jsxs("label",{className:"am-row",children:[e.jsx("span",{children:r}),l]})}function aa({children:r}){return e.jsx("div",{className:"am-actions",children:r})}function ra({name:r}){const l={cancel:e.jsx("path",{d:"M6 6l12 12M18 6L6 18"}),check:e.jsx("path",{d:"M5 12l5 5L20 7"}),copy:e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"9",y:"9",width:"11",height:"11",rx:"1.5"}),e.jsx("path",{d:"M5 15V5a1 1 0 011-1h10"})]}),migrate:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4 12h12"}),e.jsx("path",{d:"M12 6l8 6-8 6"})]}),trash:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4 7h16"}),e.jsx("path",{d:"M9 7V4h6v3"}),e.jsx("path",{d:"M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"})]}),save:e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M5 4h11l3 3v13a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"}),e.jsx("path",{d:"M7 4v5h8V4"})]})}[r];return e.jsx("svg",{className:"am-btn-ico",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:l})}function sa({onClick:r,disabled:l,label:d}){return e.jsxs("button",{onClick:r,disabled:l,children:[e.jsx(ra,{name:"cancel"}),d]})}function Pa({onClick:r,disabled:l,icon:d,label:p}){return e.jsxs("button",{className:"am-primary",onClick:r,disabled:l,children:[e.jsx(ra,{name:d}),p]})}function hr({onClick:r,disabled:l,icon:d,label:p}){return e.jsxs("button",{className:"am-danger",onClick:r,disabled:l,children:[e.jsx(ra,{name:d}),p]})}const Sa=r=>{if(!r||!isFinite(r))return"—";const l=["B","KB","MB","GB","TB"];let d=0,p=r;for(;p>=1024&&d<l.length-1;)p/=1024,d++;return`${p.toFixed(p>=100?0:p>=10?1:2)} ${l[d]}`},_a=r=>{if(!r)return"—";const l=new Date(r*1e3),d=p=>String(p).padStart(2,"0");return`${l.getFullYear()}-${d(l.getMonth()+1)}-${d(l.getDate())} ${d(l.getHours())}:${d(l.getMinutes())}`},za=(r,l)=>{if(!r)return"—";const d=Math.floor(Date.now()/1e3)-r,p=Math.floor(d/86400);if(p===0)return l==="zh-TW"?"今天":"today";if(p===1)return l==="zh-TW"?"昨天":"yesterday";if(p<30)return l==="zh-TW"?`${p} 天前`:`${p}d ago`;const v=Math.floor(p/30);return l==="zh-TW"?`${v} 個月前`:`${v}mo ago`},Ma=r=>{if(!r)return"unknown";const l=(Date.now()/1e3-r)/86400;return l>30?"stale":l>7?"aging":"fresh"};function xr({open:r,onClose:l,clusterId:d,vmid:p,vmName:v,vmType:b}){var q,Q;const{t:u,language:C}=We(),m=It(),P=((q=ea().user)==null?void 0:q.role_global)==="admin",[O,B]=o.useState([]),[F,L]=o.useState(!1),[T,$]=o.useState(null),[W,A]=o.useState(!1),[Y,ae]=o.useState(null),ne=async M=>{if(!(!M.node||!M.storage||!M.volid))try{const V=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(M.node)}/storage/${encodeURIComponent(M.storage)}/verify`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({volume:M.volid})}),k=await V.json().catch(()=>({}));if(!V.ok||!k.verified){await m.alert(`Verify failed: ${k.detail||k.error||`HTTP ${V.status}`}`);return}await m.alert("✓ Backup metadata is readable. (Shallow verify only — for full PBS verify, run a verify job in the PBS UI.)")}catch(V){await m.alert(`Verify failed: ${V.message||V}`)}},w=async M=>{const V=await m.prompt(`Restore to VMID? (default ${p} = overwrite original)`,{title:"Restore backup",defaultValue:String(p),inputType:"text"});if(V===null)return;const k=parseInt(V.trim(),10);if(!Number.isFinite(k)||k<100){await m.alert("Invalid VMID");return}const D=k===p;if(await m.confirm(D?`OVERWRITE existing ${b==="lxc"?"CT":"VM"} ${p} with this backup?

The current disks and config will be DESTROYED. This is not reversible.`:`Create new ${b==="lxc"?"CT":"VM"} ${k} from this backup?

A fresh guest will be created using the backup's contents.`,{title:D?"Overwrite & restore?":"Restore as new VMID?",destructive:D})){ae(M.volid);try{const ye=M.node||"",pe=b==="lxc"?"lxc":"qemu",Me=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(ye)}/${pe}/${k}/restore`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({archive:M.volid,force:D})}),me=await Me.json().catch(()=>({}));if(!Me.ok||!me.ok)throw new Error(me.detail||me.error||`HTTP ${Me.status}`);await m.alert(`Restore submitted. PVE task: ${me.task||"(no upid)"}`)}catch(ye){await m.alert(`Restore failed: ${ye.message||ye}`)}finally{ae(null)}}};if(o.useEffect(()=>{if(!r)return;let M=!0;return(async()=>{L(!0),$(null);try{const V=await fetch(`/api/clusters/${encodeURIComponent(d)}/vms/${p}/backups`,{credentials:"same-origin"});if(!V.ok){const D=await V.json().catch(()=>({}));throw new Error(D.error||`HTTP ${V.status}`)}const k=await V.json();M&&(B(k.backups||[]),A(!!k.note))}catch(V){M&&$(V.message||String(V))}finally{M&&L(!1)}})(),()=>{M=!1}},[r,d,p]),!r)return null;const S=O.reduce((M,V)=>M+(V.size||0),0),J=(Q=O[0])==null?void 0:Q.ctime;return e.jsx("div",{className:"bh-back",onClick:l,children:e.jsxs("div",{className:"bh-modal",onClick:M=>M.stopPropagation(),children:[e.jsxs("div",{className:"bh-head",children:[e.jsxs("div",{className:"bh-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),e.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),e.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),e.jsx("span",{children:u("bh.title")}),v&&e.jsxs("span",{className:"bh-target",children:[p," — ",v]})]}),e.jsx("button",{className:"bh-close",onClick:l,children:"×"})]}),e.jsxs("div",{className:"bh-stats",children:[e.jsxs("div",{children:[e.jsx("span",{className:"lbl",children:u("bh.count")})," ",O.length]}),e.jsxs("div",{children:[e.jsx("span",{className:"lbl",children:u("bh.total_size")})," ",Sa(S)]}),e.jsxs("div",{children:[e.jsx("span",{className:"lbl",children:u("bh.newest")})," ",J?_a(J):"—",J&&e.jsx("span",{className:`bh-age bh-age-${Ma(J)}`,children:za(J,C)})]})]}),e.jsxs("div",{className:"bh-body",children:[T&&e.jsx("div",{className:"bh-error",children:T}),F&&O.length===0&&e.jsx("div",{className:"bh-loading",children:u("bh.loading")}),!F&&O.length===0&&!T&&e.jsxs("div",{className:"bh-empty",children:[e.jsx("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M3 6h18M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"})}),e.jsx("div",{children:u("bh.empty")}),W&&e.jsx("div",{className:"bh-empty-note",children:u("bh.empty_note")})]}),O.length>0&&e.jsxs("table",{className:"bh-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:u("bh.col.ctime")}),e.jsx("th",{children:u("bh.col.age")}),e.jsx("th",{children:u("bh.col.storage")}),e.jsx("th",{children:u("bh.col.node")}),e.jsx("th",{className:"num",children:u("bh.col.size")}),e.jsx("th",{children:u("bh.col.flags")}),e.jsx("th",{children:u("bh.col.notes")}),P&&e.jsx("th",{})]})}),e.jsx("tbody",{children:O.map(M=>{var V,k;return e.jsxs("tr",{children:[e.jsx("td",{children:_a(M.ctime)}),e.jsx("td",{children:e.jsx("span",{className:`bh-age bh-age-${Ma(M.ctime)}`,children:za(M.ctime,C)})}),e.jsx("td",{children:M.storage||"—"}),e.jsx("td",{children:M.node||"—"}),e.jsx("td",{className:"num",children:Sa(M.size)}),e.jsxs("td",{children:[M.protected&&e.jsx("span",{className:"bh-flag protected",children:u("bh.protected")}),((V=M.verification)==null?void 0:V.state)==="ok"&&e.jsx("span",{className:"bh-flag verified",children:u("bh.verified")}),((k=M.verification)==null?void 0:k.state)==="failed"&&e.jsx("span",{className:"bh-flag failed",children:u("bh.verify_failed")})]}),e.jsx("td",{className:"bh-notes",title:M.notes,children:M.notes||""}),P&&e.jsxs("td",{children:[e.jsx("button",{className:"bh-restore-btn",onClick:()=>ne(M),disabled:Y!==null,style:{marginRight:4},children:u("bh.verify_btn")}),e.jsx("button",{className:"bh-restore-btn",onClick:()=>w(M),disabled:Y!==null,children:Y===M.volid?"…":u("bh.restore")})]})]},M.volid)})})]})]}),e.jsx("style",{children:`
          .bh-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .bh-modal { width: min(1000px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: bh-in .18s ease-out; overflow: hidden; }
          @keyframes bh-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .bh-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .bh-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .bh-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .bh-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .bh-close:hover { color: var(--primary); }
          .bh-stats { display: flex; gap: 32px; padding: 10px 20px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-primary); border-bottom: 1px solid rgba(0,240,255,.08); flex-wrap: wrap; align-items: center; }
          .bh-stats .lbl { font-family: var(--font-display); font-size: 11.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); margin-right: 6px; }
          .bh-body { flex: 1; overflow: auto; padding: 6px 0; }
          .bh-loading, .bh-empty { padding: 40px 20px; text-align: center; font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 12px; }
          .bh-empty-note { max-width: 520px; font-size: 12px; line-height: 1.6; color: var(--text-secondary); }
          .bh-empty svg { stroke: var(--text-muted); opacity: .6; }
          .bh-error { padding: 8px 14px; margin: 0 18px 8px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .bh-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .bh-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .bh-table th { padding: 8px 14px; text-align: left; font-family: var(--font-display); font-weight: 600; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .bh-table th.num, .bh-table td.num { text-align: right; }
          .bh-table td { padding: 6px 14px; border-bottom: 1px solid rgba(0,240,255,.06); white-space: nowrap; color: var(--text-primary); }
          .bh-table tbody tr:nth-child(odd) { background: rgba(0, 240, 255, 0.025); }
          .bh-table tbody tr:hover { background: rgba(0, 240, 255, 0.08); }
          .bh-notes { max-width: 240px; overflow: hidden; text-overflow: ellipsis; }

          .bh-age { display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 999px; font-size: 12.5px; font-family: var(--font-mono); border: 1px solid currentColor; margin-left: 8px; }
          .bh-age::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 4px currentColor; }
          .bh-age-fresh    { color: var(--success); }
          .bh-age-aging    { color: var(--warning); }
          .bh-age-stale    { color: var(--danger, #ff4d6d); }
          .bh-age-unknown  { color: var(--text-muted); }

          .bh-flag { display: inline-block; padding: 1px 6px; margin-right: 4px; font-size: 11.5px; font-family: var(--font-display); letter-spacing: .04em; border-radius: 2px; }
          .bh-flag.protected { color: var(--accent); border: 1px solid rgba(224,102,255,.5); }
          .bh-flag.verified { color: var(--success); border: 1px solid rgba(0,255,136,.5); }
          .bh-flag.failed { color: var(--danger, #ff4d6d); border: 1px solid rgba(255,77,109,.5); }
          .bh-restore-btn { padding: 2px 10px; font-family: var(--font-mono); font-size: 12.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .bh-restore-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.1); }
          .bh-restore-btn:disabled { opacity: .4; cursor: not-allowed; }
        `})]})})}const ur=/^(scsi|virtio|sata|ide)\d+$/,gr=/^net\d+$/,fr=/^(mp|rootfs)\d*$/,br=/^(hostpci|usb|serial)\d+$/,vr=r=>{const l=/size=([^,]+)/.exec(r);return l?l[1]:""},Mt=r=>{const l={};if(!r)return l;const d=r.split(",");d[0]&&d[0].indexOf("=")<0&&(l._head=d[0],d.shift());for(const p of d){const v=p.indexOf("=");v>0&&(l[p.slice(0,v).trim()]=p.slice(v+1).trim())}return l},yr=r=>{const l=r._head?[r._head]:[],d=Object.entries(r).filter(([p])=>p!=="_head").filter(([,p])=>p!==""&&p!=null).map(([p,v])=>`${p}=${v}`);return[...l,...d].join(",")},wr=["l26","l24","win11","win10","win8","w2k19","w2k16","w2k12","w2k8","wxp","w2k","solaris","other"],kr=["host","x86-64-v4","x86-64-v3","x86-64-v2-AES","x86-64-v2","kvm64","qemu64","EPYC","EPYC-Rome","EPYC-Milan","Skylake-Server","Cascadelake-Server","Icelake-Server"],jr=[{key:"name",type:"text"},{key:"cores",type:"int"},{key:"sockets",type:"int"},{key:"memory",type:"int"},{key:"balloon",type:"int"},{key:"agent",type:"bool"},{key:"onboot",type:"bool"},{key:"protection",type:"bool"},{key:"ostype",type:"select",options:wr},{key:"cpu",type:"select",options:kr,help:"host = pass-through; x86-64-v3 = stable baseline for live migrate"},{key:"boot",type:"text",help:"order=scsi0;net0;ide2 (semicolons separate priority)"},{key:"tags",type:"text"},{key:"description",type:"textarea"},{key:"ciuser",type:"text"},{key:"cipassword",type:"text"},{key:"searchdomain",type:"text"},{key:"nameserver",type:"text"},{key:"sshkeys",type:"textarea"}],Nr=[{key:"hostname",type:"text"},{key:"cores",type:"int"},{key:"cpulimit",type:"int"},{key:"memory",type:"int"},{key:"swap",type:"int"},{key:"onboot",type:"bool"},{key:"protection",type:"bool"},{key:"tags",type:"text"},{key:"nameserver",type:"text"},{key:"searchdomain",type:"text"},{key:"description",type:"textarea"}];function Cr({open:r,onClose:l,clusterId:d,node:p,vmid:v,kind:b,title:u,canEdit:C}){const{t:m}=We(),_=It(),[P,O]=o.useState(null),[B,F]=o.useState(!1),[L,T]=o.useState(null),[$,W]=o.useState(0),[A,Y]=o.useState(!1),[ae,ne]=o.useState({}),[w,S]=o.useState(!1),[J,q]=o.useState(!1),[Q,M]=o.useState(null),[V,k]=o.useState(null),[D,oe]=o.useState(""),[ye,pe]=o.useState(null),[Me,me]=o.useState(""),[dt,we]=o.useState(!0),[qe,fe]=o.useState(!1),[Je,Xe]=o.useState(null),[$e,Se]=o.useState({}),[yt,pt]=o.useState(!1),[Te,Ce]=o.useState({bus:"scsi",storage:"",sizeGb:"32"}),[mt,Ze]=o.useState(!1),[ie,Ae]=o.useState({model:"virtio",bridge:"vmbr0",vlan:"",firewall:!1,mac:""}),[ht,xt]=o.useState(null),[wt,Ve]=o.useState("");o.useEffect(()=>{if(!r)return;let c=!0;return(async()=>{F(!0),T(null);try{const y=b==="qemu"?"qemu":"lxc",j=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(p)}/${y}/${v}/config`,{credentials:"same-origin"});if(!j.ok){const ee=await j.json().catch(()=>({}));throw new Error(ee.error||`HTTP ${j.status}`)}const I=await j.json();c&&O(I.config||{})}catch(y){c&&T(y.message||String(y))}finally{c&&F(!1)}})(),()=>{c=!1}},[r,d,p,v,b,$]),o.useEffect(()=>{r||(Y(!1),ne({}),S(!1),k(null),oe(""),Xe(null),Se({}),pe(null),me(""),we(!0),M(null))},[r]);const Z=o.useMemo(()=>{if(!P)return null;const c=[],y=[],j=[],I=[],ee=[],H=[],le=[],it=new Set(["name","hostname","cores","sockets","cpu","cpulimit","cpuunits","memory","balloon","shares","ostype","agent","boot","bios","machine","numa","tablet","onboot","protection","startup","arch","description","tags","unprivileged","features","parent","lock","swap","vga","nameserver","searchdomain"]);for(const[te,Ne]of Object.entries(P)){const xe=String(Ne);if(!(te.startsWith("digest")||te==="_error")){if(it.has(te)){c.push([te,xe]);continue}if(ur.test(te)){const ue=Mt(xe),Re=ue._head||xe.split(",")[0],Ie=ue.size||vr(xe),De=Object.entries(ue).filter(([Ge])=>Ge!=="_head"&&Ge!=="size"),X={id:te,bus:te,volid:Re,size:Ie,opts:De.map(([Ge,be])=>`${Ge}=${be}`).join(", "),raw:xe};ue.media==="cdrom"||xe.includes("media=cdrom")?j.push(X):y.push(X);continue}if(fr.test(te)){if(te==="rootfs"||te.startsWith("mp")){const ue=Mt(xe),Re=ue._head||xe.split(",")[0],Ie=ue.size||"",De=Object.entries(ue).filter(([X])=>X!=="_head"&&X!=="size");y.push({id:te,bus:te,volid:Re,size:Ie,opts:De.map(([X,Ge])=>`${X}=${Ge}`).join(", "),raw:xe})}else I.push([te,xe]);continue}if(gr.test(te)){const ue=Mt(xe),Re=(ue._head||"").split("="),Ie=Re[0]||"",De=Re[1]||"";ee.push({id:te,model:Ie||ue.model||"",bridge:ue.bridge||"",mac:De,vlan:ue.tag||"",firewall:ue.firewall||"",raw:xe});continue}if(br.test(te)){H.push([te,xe]);continue}le.push([te,xe])}}return c.sort((te,Ne)=>te[0].localeCompare(Ne[0])),le.sort((te,Ne)=>te[0].localeCompare(Ne[0])),H.sort((te,Ne)=>te[0].localeCompare(Ne[0])),j.sort((te,Ne)=>te.id.localeCompare(Ne.id)),{general:c,disks:y,cdroms:j,mounts:I,nics:ee,passthrough:H,other:le}},[P]),de=b==="qemu"?jr:Nr,Pe=(c,y)=>{ne(j=>({...j,[c]:y}))},he=()=>{if(!P)return[];const c=[];for(const[y,j]of Object.entries(ae)){const I=P[y]!=null?String(P[y]):"";String(j)!==I&&c.push([y,I,String(j)])}return c},Et=async()=>{const c=he();if(c.length!==0){q(!0),M(null);try{const y={};for(const[H,,le]of c)y[H]=le;const j=b==="qemu"?"qemu":"lxc",I=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(p)}/${j}/${v}/config`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({changes:y})}),ee=await I.json().catch(()=>({}));if(!I.ok||!ee.ok)throw new Error(ee.detail||ee.error||`HTTP ${I.status}`);S(!1),Y(!1),ne({}),W(H=>H+1)}catch(y){M(`${m("vmcfg.apply_err")}: ${y.message||y}`)}finally{q(!1)}}},re=async()=>{if(!V)return;const c=parseInt(D,10);if(!Number.isFinite(c)||c<=0||c>9999){await _.alert(m("vmcfg.grow_help"));return}try{const y=b==="qemu"?"qemu":"lxc",j=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(p)}/${y}/${v}/resize`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({disk:V,size:`+${c}G`})}),I=await j.json().catch(()=>({}));if(!j.ok||!I.ok)throw new Error(I.detail||I.error||`HTTP ${j.status}`);k(null),oe(""),W(ee=>ee+1)}catch(y){await _.alert(`${m("vmcfg.apply_err")}: ${y.message||y}`)}},st=async()=>{if(!Je)return;const c=Z==null?void 0:Z.nics.find(I=>I.id===Je);if(!c)return;const y=Mt(c.raw);$e.bridge!==void 0&&(y.bridge=$e.bridge),$e.vlan!==void 0&&(y.tag=$e.vlan),$e.firewall!==void 0&&(y.firewall=$e.firewall?"1":"");const j=yr(y);try{const I=b==="qemu"?"qemu":"lxc",ee=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(p)}/${I}/${v}/config`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({changes:{[Je]:j}})}),H=await ee.json().catch(()=>({}));if(!ee.ok||!H.ok)throw new Error(H.detail||H.error||`HTTP ${ee.status}`);Xe(null),Se({}),W(le=>le+1)}catch(I){await _.alert(`${m("vmcfg.apply_err")}: ${I.message||I}`)}},je=async c=>{const y=b==="qemu"?"qemu":"lxc",j=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(p)}/${y}/${v}/config`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({changes:c})}),I=await j.json().catch(()=>({}));if(!j.ok||!I.ok)throw new Error(I.detail||I.error||`HTTP ${j.status}`)},Fe=(c,y)=>{for(let j=0;j<64;j++){const I=`${c}${j}`;if(!y.has(I))return I}return`${c}0`},ut=async(c,y)=>{if(await _.confirm(m("vmcfg.del.msg").replace("{slot}",c).replace("{descr}",y),{title:m("vmcfg.del.title"),destructive:!0}))try{await je({delete:c}),W(I=>I+1)}catch(I){await _.alert(`${m("vmcfg.del.error")}: ${I.message||I}`)}},nt=async()=>{const c=Te.storage.trim();if(!c){await _.alert(m("vmcfg.adddisk.need_storage"));return}const y=parseInt(Te.sizeGb||"0",10);if(!Number.isFinite(y)||y<=0||y>65536){await _.alert(m("vmcfg.adddisk.bad_size"));return}const j=new Set(((Z==null?void 0:Z.disks)||[]).map(H=>H.id));((Z==null?void 0:Z.cdroms)||[]).forEach(H=>j.add(H.id));const I=Fe(Te.bus,j),ee=`${c}:${y}`;try{await je({[I]:ee}),pt(!1),W(H=>H+1)}catch(H){await _.alert(`${m("vmcfg.adddisk.error")}: ${H.message||H}`)}},ot=async()=>{const c=ie.bridge.trim();if(!c){await _.alert(m("vmcfg.addnic.need_bridge"));return}const y=new Set(((Z==null?void 0:Z.nics)||[]).map(le=>le.id)),j=Fe("net",y),I=[ie.model];ie.mac&&(I[0]=`${ie.model}=${ie.mac}`);const ee=[I[0],`bridge=${c}`];ie.vlan&&ee.push(`tag=${ie.vlan}`),ie.firewall&&ee.push("firewall=1");const H=ee.join(",");try{await je({[j]:H}),Ze(!1),Ae({model:"virtio",bridge:"vmbr0",vlan:"",firewall:!1,mac:""}),W(le=>le+1)}catch(le){await _.alert(`${m("vmcfg.addnic.error")}: ${le.message||le}`)}},K=async c=>{const y=wt.trim();if(!y){await _.alert(m("vmcfg.iso.need_vol"));return}try{await je({[c]:`${y},media=cdrom`}),xt(null),Ve(""),W(j=>j+1)}catch(j){await _.alert(`${m("vmcfg.iso.error")}: ${j.message||j}`)}},Qe=async c=>{if(await _.confirm(m("vmcfg.iso.eject_msg").replace("{slot}",c),{title:m("vmcfg.iso.eject_title")}))try{await je({[c]:"none,media=cdrom"}),W(j=>j+1)}catch(j){await _.alert(`${m("vmcfg.iso.error")}: ${j.message||j}`)}};if(!r)return null;const _e=A?he():[];return e.jsx("div",{className:"vc-back",onClick:l,children:e.jsxs("div",{className:"vc-modal",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"vc-head",children:[e.jsxs("div",{className:"vc-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),e.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),e.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}),e.jsx("span",{children:m("vmcfg.title")}),u&&e.jsx("span",{className:"vc-target",children:u})]}),e.jsxs("div",{className:"vc-head-actions",children:[C&&!A&&e.jsxs("button",{className:"vc-edit-btn",onClick:()=>{Y(!0);const c={};for(const y of de){const j=P==null?void 0:P[y.key];j!=null&&(c[y.key]=String(j))}ne(c)},children:[e.jsxs("svg",{className:"vc-btn-ico",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),e.jsx("path",{d:"M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"})]}),m("vmcfg.edit_btn")]}),A&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"vc-cancel-btn",onClick:()=>{Y(!1),ne({})},children:[e.jsx("svg",{className:"vc-btn-ico",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18"})}),m("vmcfg.cancel_btn")]}),e.jsxs("button",{className:"vc-apply-btn",disabled:_e.length===0,onClick:()=>S(!0),children:[e.jsx("svg",{className:"vc-btn-ico",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M5 12l5 5L20 7"})}),m("vmcfg.apply_btn")," ",_e.length>0&&e.jsxs("em",{children:["(",_e.length,")"]})]})]}),e.jsx("button",{className:"vc-close",onClick:l,children:"×"})]})]}),e.jsxs("div",{className:"vc-body",children:[B&&!P&&e.jsx("div",{className:"vc-loading",children:m("vmcfg.loading")}),L&&e.jsx("div",{className:"vc-error",children:L}),Z&&e.jsxs(e.Fragment,{children:[e.jsx(at,{title:m("vmcfg.section.general"),children:A?e.jsx("div",{className:"vc-form",children:de.map(c=>{const y=ae[c.key]??"";return c.type==="bool"?e.jsxs("label",{className:"vc-form-row vc-form-bool",children:[e.jsx("span",{children:m(`vmcfg.field.${c.key}`)||c.key}),e.jsx("input",{type:"checkbox",checked:y==="1"||y==="true",onChange:j=>Pe(c.key,j.target.checked?"1":"0")})]},c.key):c.type==="select"?e.jsxs("label",{className:"vc-form-row",title:c.help||"",children:[e.jsx("span",{children:m(`vmcfg.field.${c.key}`)||c.key}),e.jsxs("select",{value:y,onChange:j=>Pe(c.key,j.target.value),children:[e.jsx("option",{value:"",children:"— pick —"}),(c.options||[]).map(j=>e.jsx("option",{value:j,children:j},j)),y&&!(c.options||[]).includes(y)&&e.jsx("option",{value:y,children:y})]})]},c.key):c.type==="textarea"?e.jsxs("label",{className:"vc-form-row vc-form-textarea",children:[e.jsx("span",{children:m(`vmcfg.field.${c.key}`)||c.key}),e.jsx("textarea",{value:y,rows:3,onChange:j=>Pe(c.key,j.target.value)})]},c.key):e.jsxs("label",{className:"vc-form-row",children:[e.jsx("span",{children:m(`vmcfg.field.${c.key}`)||c.key}),e.jsx("input",{type:c.type==="int"?"number":"text",value:y,onChange:j=>Pe(c.key,j.target.value)})]},c.key)})}):Z.general.length>0&&e.jsx("div",{className:"vc-kv",children:Z.general.map(([c,y])=>e.jsxs("div",{className:"vc-kv-row",children:[e.jsx("span",{className:"vc-kv-key",children:c}),e.jsx("span",{className:"vc-kv-val",children:y})]},c))})}),Z.disks.length>0&&e.jsxs(at,{title:m("vmcfg.section.disks"),children:[e.jsxs("table",{className:"vc-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:m("vmcfg.col.bus")}),e.jsx("th",{children:m("vmcfg.col.volid")}),e.jsx("th",{children:m("vmcfg.col.size")}),e.jsx("th",{children:m("vmcfg.col.opts")}),C&&e.jsx("th",{})]})}),e.jsx("tbody",{children:Z.disks.map(c=>e.jsxs("tr",{children:[e.jsx("td",{className:"vc-mono",children:c.bus}),e.jsx("td",{className:"vc-mono",children:c.volid}),e.jsx("td",{className:"vc-mono",children:c.size}),e.jsx("td",{className:"vc-mono vc-trunc",title:c.opts,children:c.opts}),C&&e.jsxs("td",{children:[e.jsx("button",{className:"vc-row-btn",onClick:()=>{k(c.id),oe("")},children:m("vmcfg.grow_btn")}),e.jsx("button",{className:"vc-row-btn",onClick:()=>{pe(c.id),me(""),we(!0)},children:m("vmcfg.move_btn")}),e.jsx("button",{className:"vc-row-btn vc-row-btn-danger",onClick:()=>ut(c.id,c.volid),children:m("vmcfg.del.btn")})]})]},c.id))})]}),C&&(yt?e.jsxs("div",{className:"vc-add-form",children:[e.jsx("span",{children:m("vmcfg.adddisk.title")}),e.jsxs("select",{value:Te.bus,onChange:c=>Ce({...Te,bus:c.target.value}),children:[e.jsx("option",{value:"scsi",children:"scsi"}),e.jsx("option",{value:"virtio",children:"virtio"}),e.jsx("option",{value:"sata",children:"sata"}),b==="qemu"&&e.jsx("option",{value:"ide",children:"ide"})]}),e.jsx("input",{placeholder:m("vmcfg.adddisk.storage_ph"),value:Te.storage,onChange:c=>Ce({...Te,storage:c.target.value.trim()})}),e.jsx("input",{type:"number",min:1,max:65536,placeholder:m("vmcfg.adddisk.size_ph"),value:Te.sizeGb,onChange:c=>Ce({...Te,sizeGb:c.target.value})}),e.jsx("span",{className:"vc-add-unit",children:"GB"}),e.jsx("button",{className:"vc-row-btn",onClick:nt,children:m("vmcfg.adddisk.submit")}),e.jsx("button",{className:"vc-row-btn",onClick:()=>pt(!1),children:"×"})]}):e.jsxs("button",{className:"vc-add-btn",onClick:()=>pt(!0),children:["+ ",m("vmcfg.adddisk.open")]}))]}),(Z.cdroms.length>0||C&&b==="qemu")&&e.jsx(at,{title:m("vmcfg.section.cdrom"),children:Z.cdroms.length===0?e.jsx("div",{className:"vc-help",children:m("vmcfg.iso.none")}):e.jsxs("table",{className:"vc-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:m("vmcfg.col.bus")}),e.jsx("th",{children:m("vmcfg.col.volid")}),C&&e.jsx("th",{})]})}),e.jsx("tbody",{children:Z.cdroms.map(c=>{const y=c.volid&&c.volid!=="none";return ht===c.id?e.jsxs("tr",{className:"vc-edit-row",children:[e.jsx("td",{className:"vc-mono",children:c.id}),e.jsxs("td",{colSpan:2,children:[e.jsx("input",{className:"vc-inline-input",style:{width:"60%"},placeholder:m("vmcfg.iso.vol_ph"),value:wt,onChange:j=>Ve(j.target.value.trim())}),e.jsx("button",{className:"vc-row-btn",onClick:()=>K(c.id),children:m("vmcfg.iso.mount_submit")}),e.jsx("button",{className:"vc-row-btn",onClick:()=>{xt(null),Ve("")},children:"×"})]})]},c.id):e.jsxs("tr",{children:[e.jsx("td",{className:"vc-mono",children:c.id}),e.jsx("td",{className:"vc-mono vc-trunc",title:c.volid,children:y?c.volid:e.jsx("em",{style:{color:"var(--text-muted)"},children:m("vmcfg.iso.empty")})}),C&&e.jsxs("td",{children:[e.jsx("button",{className:"vc-row-btn",onClick:()=>{xt(c.id),Ve("")},children:m("vmcfg.iso.mount_btn")}),y&&e.jsx("button",{className:"vc-row-btn",onClick:()=>Qe(c.id),children:m("vmcfg.iso.eject_btn")}),e.jsx("button",{className:"vc-row-btn vc-row-btn-danger",onClick:()=>ut(c.id,c.volid),children:m("vmcfg.del.btn")})]})]},c.id)})})]})}),Z.nics.length>0&&e.jsxs(at,{title:m("vmcfg.section.nics"),children:[e.jsxs("table",{className:"vc-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:m("vmcfg.col.id")}),e.jsx("th",{children:m("vmcfg.col.model")}),e.jsx("th",{children:m("vmcfg.col.bridge")}),e.jsx("th",{children:m("vmcfg.col.mac")}),e.jsx("th",{children:m("vmcfg.col.vlan")}),e.jsx("th",{children:m("vmcfg.col.firewall")}),C&&e.jsx("th",{})]})}),e.jsx("tbody",{children:Z.nics.map(c=>Je===c.id?e.jsxs("tr",{className:"vc-edit-row",children:[e.jsx("td",{className:"vc-mono",children:c.id}),e.jsx("td",{className:"vc-mono",children:c.model}),e.jsx("td",{children:e.jsx("input",{className:"vc-inline-input",value:$e.bridge??c.bridge,onChange:y=>Se(j=>({...j,bridge:y.target.value}))})}),e.jsx("td",{className:"vc-mono",children:c.mac}),e.jsx("td",{children:e.jsx("input",{className:"vc-inline-input vc-inline-narrow",value:$e.vlan??c.vlan,onChange:y=>Se(j=>({...j,vlan:y.target.value}))})}),e.jsx("td",{children:e.jsx("input",{type:"checkbox",checked:($e.firewall??c.firewall)==="1",onChange:y=>Se(j=>({...j,firewall:y.target.checked?"1":""}))})}),e.jsxs("td",{children:[e.jsx("button",{className:"vc-row-btn",onClick:st,children:m("vmcfg.nic_save_btn")}),e.jsx("button",{className:"vc-row-btn",onClick:()=>{Xe(null),Se({})},children:"×"})]})]},c.id):e.jsxs("tr",{children:[e.jsx("td",{className:"vc-mono",children:c.id}),e.jsx("td",{className:"vc-mono",children:c.model}),e.jsx("td",{className:"vc-mono",children:c.bridge}),e.jsx("td",{className:"vc-mono",children:c.mac}),e.jsx("td",{className:"vc-mono",children:c.vlan||"—"}),e.jsx("td",{className:"vc-mono",children:c.firewall==="1"?"on":"—"}),C&&e.jsxs("td",{children:[e.jsx("button",{className:"vc-row-btn",onClick:()=>{Xe(c.id),Se({})},children:m("vmcfg.nic_edit_btn")}),e.jsx("button",{className:"vc-row-btn vc-row-btn-danger",onClick:()=>ut(c.id,`${c.model} ${c.bridge}`),children:m("vmcfg.del.btn")})]})]},c.id))})]}),C&&(mt?e.jsxs("div",{className:"vc-add-form",children:[e.jsx("span",{children:m("vmcfg.addnic.title")}),e.jsxs("select",{value:ie.model,onChange:c=>Ae({...ie,model:c.target.value}),children:[e.jsx("option",{value:"virtio",children:"virtio"}),e.jsx("option",{value:"e1000",children:"e1000"}),e.jsx("option",{value:"rtl8139",children:"rtl8139"}),e.jsx("option",{value:"vmxnet3",children:"vmxnet3"})]}),e.jsx("input",{placeholder:"vmbr0",value:ie.bridge,onChange:c=>Ae({...ie,bridge:c.target.value.trim()})}),e.jsx("input",{placeholder:m("vmcfg.addnic.vlan_ph"),type:"number",min:1,max:4094,value:ie.vlan,style:{width:80},onChange:c=>Ae({...ie,vlan:c.target.value})}),e.jsxs("label",{className:"vc-add-check",children:[e.jsx("input",{type:"checkbox",checked:ie.firewall,onChange:c=>Ae({...ie,firewall:c.target.checked})}),"firewall"]}),e.jsx("input",{placeholder:m("vmcfg.addnic.mac_ph"),value:ie.mac,style:{width:150},onChange:c=>Ae({...ie,mac:c.target.value.trim()})}),e.jsx("button",{className:"vc-row-btn",onClick:ot,children:m("vmcfg.addnic.submit")}),e.jsx("button",{className:"vc-row-btn",onClick:()=>Ze(!1),children:"×"})]}):e.jsxs("button",{className:"vc-add-btn",onClick:()=>Ze(!0),children:["+ ",m("vmcfg.addnic.open")]}))]}),Z.mounts.length>0&&e.jsx(at,{title:m("vmcfg.section.mounts"),children:e.jsx("div",{className:"vc-kv",children:Z.mounts.map(([c,y])=>e.jsxs("div",{className:"vc-kv-row",children:[e.jsx("span",{className:"vc-kv-key",children:c}),e.jsx("span",{className:"vc-kv-val vc-trunc",title:y,children:y})]},c))})}),(Z.passthrough.length>0||C&&b==="qemu")&&e.jsxs(at,{title:m("vmcfg.section.passthrough"),children:[Z.passthrough.length>0?e.jsxs("table",{className:"vc-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"slot"}),e.jsx("th",{children:m("vmcfg.col.opts")}),C&&e.jsx("th",{})]})}),e.jsx("tbody",{children:Z.passthrough.map(([c,y])=>e.jsxs("tr",{children:[e.jsx("td",{className:"vc-mono",children:c}),e.jsx("td",{className:"vc-mono vc-trunc",title:y,children:y}),C&&e.jsx("td",{children:e.jsx("button",{className:"vc-row-btn",onClick:async()=>{if(await _.confirm(`Remove passthrough slot ${c}?`,{title:"Remove passthrough?",destructive:!0}))try{const I=b==="qemu"?"qemu":"lxc",ee=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(p)}/${I}/${v}/config`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({changes:{[c]:""}})}),H=await ee.json().catch(()=>({}));if(!ee.ok||!H.ok)throw new Error(H.detail||H.error||`HTTP ${ee.status}`);W(le=>le+1)}catch(I){await _.alert(`Remove failed: ${I.message||I}`)}},children:m("vmcfg.pt.remove")})})]},c))})]}):e.jsx("div",{className:"vc-help",children:m("vmcfg.pt.none")}),C&&b==="qemu"&&e.jsx($r,{clusterId:d,node:p,vmid:v,existing:Z.passthrough.map(([c])=>c),onAdded:()=>W(c=>c+1)})]}),Z.other.length>0&&e.jsx(at,{title:m("vmcfg.section.other"),children:e.jsx("div",{className:"vc-kv",children:Z.other.map(([c,y])=>e.jsxs("div",{className:"vc-kv-row",children:[e.jsx("span",{className:"vc-kv-key",children:c}),e.jsx("span",{className:"vc-kv-val vc-trunc",title:y,children:y})]},c))})})]})]}),w&&e.jsx("div",{className:"vc-overlay",onClick:()=>!J&&S(!1),children:e.jsxs("div",{className:"vc-overlay-card",onClick:c=>c.stopPropagation(),children:[e.jsx("div",{className:"vc-overlay-title",children:m("vmcfg.diff_title")}),e.jsx("div",{className:"vc-overlay-intro",children:m("vmcfg.diff_intro")}),Q&&e.jsx("div",{className:"vc-error",children:Q}),e.jsxs("table",{className:"vc-diff-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"field"}),e.jsx("th",{children:"before"}),e.jsx("th",{children:"after"})]})}),e.jsx("tbody",{children:_e.map(([c,y,j])=>e.jsxs("tr",{children:[e.jsx("td",{className:"vc-mono",children:c}),e.jsx("td",{className:"vc-mono vc-diff-before",children:y||"—"}),e.jsx("td",{className:"vc-mono vc-diff-after",children:j||"—"})]},c))})]}),e.jsxs("div",{className:"vc-overlay-actions",children:[e.jsx("button",{onClick:()=>S(!1),disabled:J,children:m("vmcfg.diff_cancel")}),e.jsx("button",{className:"vc-primary",onClick:Et,disabled:J,children:m(J?"vmcfg.applying":"vmcfg.diff_apply")})]})]})}),V&&e.jsx("div",{className:"vc-overlay",onClick:()=>k(null),children:e.jsxs("div",{className:"vc-overlay-card",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"vc-overlay-title",children:[m("vmcfg.grow_title")," — ",e.jsx("code",{children:V})]}),e.jsx("div",{className:"vc-overlay-intro",children:m("vmcfg.grow_help")}),e.jsxs("label",{className:"vc-form-row",children:[e.jsx("span",{children:m("vmcfg.grow_amount")}),e.jsx("input",{type:"number",min:1,max:9999,value:D,onChange:c=>oe(c.target.value),autoFocus:!0})]}),e.jsxs("div",{className:"vc-overlay-actions",children:[e.jsx("button",{onClick:()=>k(null),children:m("vmcfg.diff_cancel")}),e.jsx("button",{className:"vc-primary",onClick:re,disabled:!D||parseInt(D,10)<=0,children:m("vmcfg.grow_apply")})]})]})}),ye&&e.jsx("div",{className:"vc-overlay",onClick:()=>!qe&&pe(null),children:e.jsxs("div",{className:"vc-overlay-card",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"vc-overlay-title",children:[m("vmcfg.move_title")," — ",e.jsx("code",{children:ye})]}),e.jsx("div",{className:"vc-overlay-intro",children:m("vmcfg.move_help")}),e.jsxs("label",{className:"vc-form-row",children:[e.jsx("span",{children:m("vmcfg.move_target")}),e.jsx("input",{value:Me,placeholder:"storage id",onChange:c=>me(c.target.value),autoFocus:!0})]}),e.jsxs("label",{className:"vc-form-row vc-form-bool",children:[e.jsx("span",{children:m("vmcfg.move_delete_source")}),e.jsx("input",{type:"checkbox",checked:dt,onChange:c=>we(c.target.checked)})]}),e.jsxs("div",{className:"vc-overlay-actions",children:[e.jsx("button",{onClick:()=>pe(null),disabled:qe,children:m("vmcfg.diff_cancel")}),e.jsx("button",{className:"vc-primary",onClick:async()=>{if(!(!ye||!Me.trim())){fe(!0);try{const c=b==="qemu"?"qemu":"lxc",y=b==="qemu"?"move_disk":"move_volume",j={storage:Me.trim(),delete:dt};b==="qemu"?j.disk=ye:j.volume=ye;const I=await fetch(`/api/clusters/${encodeURIComponent(d)}/nodes/${encodeURIComponent(p)}/${c}/${v}/${y}`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(j)}),ee=await I.json().catch(()=>({}));if(!I.ok||!ee.ok)throw new Error(ee.detail||ee.error||`HTTP ${I.status}`);pe(null),me(""),W(H=>H+1)}catch(c){await _.alert(`Move failed: ${c.message||c}`)}finally{fe(!1)}}},disabled:qe||!Me.trim(),children:qe?"…":m("vmcfg.move_apply")})]})]})}),e.jsx("style",{children:`
          .vc-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .vc-modal { width: min(960px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: vc-in .18s ease-out; overflow: hidden; }
          @keyframes vc-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .vc-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .vc-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .vc-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .vc-head-actions { display: flex; align-items: center; gap: 8px; }
          .vc-edit-btn, .vc-cancel-btn, .vc-apply-btn {
            display: inline-flex; align-items: center; gap: 7px;
            padding: 7px 16px;
            font-family: var(--font-display); font-size: 13.5px;
            letter-spacing: .08em; text-transform: uppercase;
            border-radius: 3px;
            cursor: pointer;
            transition: background .12s, box-shadow .12s, border-color .12s;
          }
          .vc-btn-ico { flex-shrink: 0; }
          .vc-edit-btn { background: rgba(0, 240, 255, 0.1); color: var(--primary); border: 1px solid var(--primary); }
          .vc-edit-btn:hover { background: rgba(0, 240, 255, 0.2); }
          .vc-cancel-btn { background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); }
          .vc-apply-btn { background: var(--primary); color: #001018; border: 1px solid var(--primary); }
          .vc-apply-btn:disabled { opacity: .35; cursor: not-allowed; }
          .vc-apply-btn em { font-style: normal; opacity: .8; margin-left: 4px; }
          .vc-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .vc-close:hover { color: var(--primary); }
          .vc-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .vc-loading { padding: 40px 12px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .vc-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; margin-bottom: 12px; }

          /* Section — tighter cyan accent + slightly larger title so the
             modal reads as a structured form, not a wall of small text. */
          .vc-section { margin-bottom: 22px; }
          .vc-section-title {
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: .14em; text-transform: uppercase;
            color: var(--primary);
            text-shadow: 0 0 6px rgba(0, 240, 255, 0.35);
            margin-bottom: 10px;
            padding-bottom: 6px;
            border-bottom: 1px solid rgba(0, 240, 255, 0.22);
          }
          .vc-kv { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4px 20px; font-family: var(--font-mono); font-size: 13px; }
          .vc-kv-row { display: flex; justify-content: space-between; gap: 14px; padding: 6px 8px; border-bottom: 1px solid rgba(0, 240, 255, 0.06); }
          .vc-kv-row:hover { background: rgba(0, 240, 255, 0.05); }
          .vc-kv-key { color: var(--text-secondary); font-family: var(--font-display); font-size: 13.5px; letter-spacing: .06em; text-transform: uppercase; }
          .vc-kv-val { color: var(--text-primary); text-align: right; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

          /* Form — bigger labels (display uppercase 11px reads as a chip
             header), bigger inputs (13px), more breathing room. */
          .vc-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px 24px; }
          .vc-form-row { display: grid; grid-template-columns: 130px 1fr; align-items: center; gap: 10px; padding: 4px 0; }
          .vc-form-row > span {
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: .06em; text-transform: uppercase;
            /* was --text-secondary 11px — too dim & small to read on the
               modal (operator feedback). Brighter + larger. */
            color: var(--text-primary);
          }
          .vc-form-row input, .vc-form-row textarea {
            padding: 8px 11px;
            font-family: var(--font-mono); font-size: 14px;
            background: rgba(0, 240, 255, 0.04);
            color: var(--text-primary);
            border: 1px solid rgba(0, 240, 255, 0.22);
            border-radius: 3px;
            outline: none;
            transition: border-color .12s, box-shadow .12s;
          }
          .vc-form-row input:focus, .vc-form-row textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.15);
          }
          .vc-form-bool { grid-template-columns: 130px auto; }
          .vc-form-textarea { grid-template-columns: 1fr; }
          .vc-form-textarea > span { margin-bottom: 6px; }

          /* Tables — larger font, more padding, cyan-tinted header. */
          .vc-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 14px; }
          .vc-table th {
            padding: 9px 12px;
            text-align: left;
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: .08em; text-transform: uppercase;
            color: var(--primary);
            border-bottom: 1px solid rgba(0,240,255,.22);
            background: rgba(0,240,255,.06);
          }
          .vc-table td {
            padding: 8px 12px;
            border-bottom: 1px solid rgba(0,240,255,.07);
            color: var(--text-primary);
            white-space: nowrap;
          }
          .vc-table tbody tr:hover { background: rgba(0,240,255,.05); }
          .vc-mono { font-family: var(--font-mono); }
          .vc-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; }
          .vc-row-btn {
            padding: 4px 12px;
            font-family: var(--font-display); font-size: 12.5px;
            letter-spacing: .08em; text-transform: uppercase;
            background: transparent; color: var(--primary);
            border: 1px solid currentColor;
            border-radius: 3px;
            cursor: pointer;
            margin-right: 6px;
            transition: background .12s;
          }
          .vc-row-btn:hover { background: rgba(0, 240, 255, 0.15); }
          .vc-row-btn-danger { color: var(--danger, #ff4d6d); }
          .vc-row-btn-danger:hover { background: rgba(255, 77, 109, 0.12); }
          .vc-add-btn {
            margin-top: 10px;
            padding: 6px 14px;
            font-family: var(--font-display); font-size: 12.5px;
            letter-spacing: .08em; text-transform: uppercase;
            background: rgba(0, 240, 255, 0.06);
            color: var(--primary);
            border: 1px dashed var(--primary-dim);
            border-radius: 3px;
            cursor: pointer;
            transition: background .12s, border-color .12s;
          }
          .vc-add-btn:hover {
            background: rgba(0, 240, 255, 0.14);
            border-style: solid;
          }
          .vc-add-form {
            margin-top: 10px;
            padding: 10px 14px;
            display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
            border: 1px solid var(--primary-dim);
            border-radius: 3px;
            background: rgba(0, 240, 255, 0.04);
            font-family: var(--font-mono); font-size: 13.5px;
          }
          .vc-add-form > span:first-child {
            font-family: var(--font-display); font-size: 12.5px;
            letter-spacing: .08em; text-transform: uppercase;
            color: var(--primary);
            padding-right: 4px;
            border-right: 1px solid rgba(0,240,255,.22);
            margin-right: 4px;
          }
          .vc-add-form select, .vc-add-form input {
            padding: 5px 10px;
            font-family: var(--font-mono); font-size: 13.5px;
            background: rgba(0, 240, 255, 0.04);
            color: var(--text-primary);
            border: 1px solid rgba(0, 240, 255, 0.22);
            border-radius: 3px;
            outline: none;
          }
          .vc-add-form input:focus, .vc-add-form select:focus {
            border-color: var(--primary);
          }
          .vc-add-unit {
            font-family: var(--font-mono); font-size: 13.5px;
            color: var(--text-muted); margin-left: -6px;
          }
          .vc-add-check {
            display: inline-flex; align-items: center; gap: 5px;
            font-family: var(--font-mono); font-size: 13.5px;
            color: var(--text-secondary);
          }
          .vc-add-check input { accent-color: var(--primary); }
          .vc-edit-row { background: rgba(0, 240, 255, 0.05); }
          .vc-inline-input { padding: 2px 6px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 2px; outline: none; width: 140px; }
          .vc-inline-narrow { width: 60px; }

          .vc-overlay { position: absolute; inset: 0; background: rgba(2,4,10,.7); display: flex; align-items: center; justify-content: center; z-index: 5; }
          .vc-overlay-card { width: min(640px, 92%); background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; padding: 16px 18px; box-shadow: 0 0 24px rgba(0,240,255,.3); }
          .vc-overlay-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; }
          .vc-overlay-intro { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); margin-bottom: 10px; }
          .vc-diff-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; margin-bottom: 12px; }
          .vc-diff-table th { padding: 4px 8px; text-align: left; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.12); }
          .vc-diff-table td { padding: 3px 8px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; }
          .vc-diff-before { color: var(--text-muted); text-decoration: line-through; }
          .vc-diff-after { color: var(--success); }
          .vc-overlay-actions { display: flex; justify-content: flex-end; gap: 8px; }
          .vc-overlay-actions button { padding: 6px 16px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .vc-overlay-actions button.vc-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .vc-overlay-actions button:disabled { opacity: .4; cursor: not-allowed; }
        `})]})})}function at({title:r,children:l}){return e.jsxs("div",{className:"vc-section",children:[e.jsx("div",{className:"vc-section-title",children:r}),l]})}function $r({clusterId:r,node:l,vmid:d,existing:p,onAdded:v}){const[b,u]=o.useState("hostpci"),[C,m]=o.useState(""),[_,P]=o.useState(!1),[O,B]=o.useState(null),F=()=>{const T=p.filter($=>$.startsWith(b)).map($=>parseInt($.slice(b.length),10)).filter($=>Number.isFinite($));for(let $=0;$<32;$++)if(!T.includes($))return`${b}${$}`;return`${b}0`},L=async()=>{if(B(null),!!C.trim()){P(!0);try{const T=F(),$=await fetch(`/api/clusters/${encodeURIComponent(r)}/nodes/${encodeURIComponent(l)}/qemu/${d}/config`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({changes:{[T]:C.trim()}})}),W=await $.json().catch(()=>({}));if(!$.ok||!W.ok)throw new Error(W.detail||W.error||`HTTP ${$.status}`);m(""),v()}catch(T){B(T.message||String(T))}finally{P(!1)}}};return e.jsxs("div",{className:"vc-pt-add",children:[O&&e.jsx("div",{className:"vc-error",children:O}),e.jsxs("select",{value:b,onChange:T=>u(T.target.value),children:[e.jsx("option",{value:"hostpci",children:"hostpci"}),e.jsx("option",{value:"usb",children:"usb"})]}),e.jsx("input",{value:C,onChange:T=>m(T.target.value),placeholder:b==="hostpci"?"0000:01:00.0,pcie=1":"1234:abcd"}),e.jsx("button",{className:"vc-row-btn",disabled:_||!C.trim(),onClick:L,children:_?"…":`+ Add ${F()}`}),e.jsx("style",{children:`
        .vc-pt-add { display: flex; gap: 8px; align-items: center; padding: 10px; margin-top: 10px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
        .vc-pt-add input, .vc-pt-add select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
        .vc-pt-add input { flex: 1; }
        .vc-help { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); padding: 4px 0 8px; }
      `})]})}const Ht=r=>(r||"").split(/[,;]/).map(l=>l.trim()).filter(Boolean);function Sr({open:r,onClose:l,clusterId:d,vmid:p,currentTags:v,vmName:b,clusters:u,onSaved:C}){var M,V;const{t:m,language:_}=We(),P=ea(),O=((M=P.user)==null?void 0:M.role_global)==="admin"||((V=P.user)==null?void 0:V.role_global)==="operator",[B,F]=o.useState([]),[L,T]=o.useState(""),[$,W]=o.useState(!1),[A,Y]=o.useState(null),ae=o.useRef(null);o.useEffect(()=>{r&&(F(Ht(v)),T(""),Y(null),setTimeout(()=>{var k;return(k=ae.current)==null?void 0:k.focus()},30))},[r,v]);const ne=o.useMemo(()=>{const k=u[d];if(!k)return[];const D=new Set;for(const oe of Object.values(k.vms||{}))for(const ye of Ht(oe.tags||""))D.add(ye);for(const oe of B)D.delete(oe);return Array.from(D).sort()},[u,d,B]),w=k=>{const D=k.trim();if(D&&!B.includes(D)){if(!/^[A-Za-z0-9_\-.]+$/.test(D)){Y(_==="zh-TW"?"標籤只能含字母 / 數字 / 連字號 / 底線 / 句點":"Tags must be alphanumeric (plus - _ .)");return}F(oe=>[...oe,D]),Y(null)}},S=k=>F(D=>D.filter(oe=>oe!==k)),J=k=>{k.key==="Enter"||k.key===","||k.key===";"||k.key===" "?(k.preventDefault(),w(L),T("")):k.key==="Backspace"&&L===""&&B.length>0&&F(D=>D.slice(0,-1))},q=o.useMemo(()=>{const k=Ht(v).sort().join(";"),D=[...B].sort().join(";");return k!==D},[v,B]),Q=async()=>{if(!q||$||!O)return;W(!0),Y(null);const k=B.join(";");try{const D=await fetch(`/api/clusters/${encodeURIComponent(d)}/vms/${p}/tags`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:k})});if(!D.ok){const oe=await D.json().catch(()=>({}));throw new Error(oe.error||`HTTP ${D.status}`)}C==null||C(k),l()}catch(D){Y(D.message||String(D))}finally{W(!1)}};return r?e.jsx("div",{className:"te-back",onClick:l,children:e.jsxs("div",{className:"te-modal",onClick:k=>k.stopPropagation(),children:[e.jsxs("div",{className:"te-head",children:[e.jsxs("div",{className:"te-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),e.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]}),e.jsx("span",{children:m("tagedit.title")}),b&&e.jsxs("span",{className:"te-target",children:[p," — ",b]})]}),e.jsx("button",{className:"te-close",onClick:l,children:"×"})]}),e.jsxs("div",{className:"te-body",children:[A&&e.jsx("div",{className:"te-error",children:A}),!O&&e.jsx("div",{className:"te-readonly",children:m("tagedit.readonly")}),e.jsxs("div",{className:"te-chips",children:[B.map(k=>e.jsxs("span",{className:"te-chip",children:[k,O&&e.jsx("button",{className:"te-chip-x",onClick:()=>S(k),"aria-label":"remove",children:"×"})]},k)),O&&e.jsx("input",{ref:ae,className:"te-input",value:L,onChange:k=>T(k.target.value),onKeyDown:J,placeholder:B.length===0?m("tagedit.placeholder"):""})]}),O&&ne.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"te-sug-label",children:m("tagedit.suggestions")}),e.jsx("div",{className:"te-sug",children:ne.slice(0,30).map(k=>e.jsxs("button",{className:"te-sug-chip",onClick:()=>w(k),children:["+ ",k]},k))})]})]}),e.jsxs("div",{className:"te-footer",children:[e.jsx("span",{className:"te-hint",children:m("tagedit.hint")}),e.jsx("span",{style:{flex:1}}),e.jsx("button",{className:"te-btn ghost",onClick:l,children:m("notes.cancel")}),O&&e.jsx("button",{className:"te-btn primary",onClick:Q,disabled:!q||$,children:m($?"notes.saving":"notes.save")})]}),e.jsx("style",{children:`
          .te-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .te-modal { width: min(640px, 96vw); display: flex; flex-direction: column; max-height: 86vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: te-in .18s ease-out; overflow: hidden; }
          @keyframes te-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .te-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .te-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .te-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .te-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .te-close:hover { color: var(--primary); }
          .te-body { flex: 1; padding: 14px 18px; overflow: auto; }
          .te-error { padding: 8px 14px; margin-bottom: 8px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .te-readonly { padding: 8px 14px; margin-bottom: 8px; border: 1px solid var(--warning); border-left-width: 3px; background: rgba(255, 107, 0, 0.08); color: var(--warning); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }

          .te-chips { display: flex; gap: 6px 8px; flex-wrap: wrap; padding: 10px 12px; min-height: 60px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; align-items: center; }
          .te-chip { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px 3px 10px; border-radius: 999px; background: rgba(0, 240, 255, 0.12); border: 1px solid var(--primary); color: var(--primary); font-family: var(--font-mono); font-size: 13.5px; }
          .te-chip-x { background: transparent; border: none; color: currentColor; cursor: pointer; padding: 0 4px; font-size: 14px; line-height: 1; opacity: .8; }
          .te-chip-x:hover { opacity: 1; color: var(--danger, #ff4d6d); }
          .te-input { flex: 1; min-width: 120px; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-mono); font-size: 13px; padding: 4px; }

          .te-sug-label { margin-top: 14px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); }
          .te-sug { margin-top: 6px; display: flex; gap: 4px 6px; flex-wrap: wrap; }
          .te-sug-chip { padding: 2px 8px; border: 1px dashed rgba(0, 240, 255, 0.3); background: transparent; color: var(--text-secondary); font-family: var(--font-mono); font-size: 12.5px; border-radius: 999px; cursor: pointer; }
          .te-sug-chip:hover { color: var(--primary); border-color: var(--primary); border-style: solid; }

          .te-footer { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); }
          .te-hint { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); }
          .te-btn { padding: 6px 16px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .te-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border: none; }
          .te-btn.primary:hover:not(:disabled) { box-shadow: 0 0 16px rgba(0, 240, 255, 0.4); }
          .te-btn.primary:disabled { opacity: .4; cursor: not-allowed; }
          .te-btn.ghost { color: var(--text-secondary); background: transparent; border: 1px solid rgba(0, 240, 255, 0.4); }
          .te-btn.ghost:hover { color: var(--primary); border-color: var(--primary); }
        `})]})}):null}const Ta=r=>(r||"").split(/[,;]/).map(l=>l.trim()).filter(Boolean);function _r({open:r,onClose:l,selected:d,clusters:p,onApplied:v}){const{t:b,language:u}=We(),[C,m]=o.useState("add"),[_,P]=o.useState([]),[O,B]=o.useState(""),[F,L]=o.useState(!1),[T,$]=o.useState(null),W=o.useMemo(()=>{const w=new Set;for(const S of d){const J=p[S.clusterId];if(J)for(const q of Object.values(J.vms||{}))for(const Q of Ta(q.tags||""))w.add(Q)}for(const S of _)w.delete(S);return Array.from(w).sort()},[d,p,_]),A=w=>{const S=w.trim();S&&/^[A-Za-z0-9_\-.]+$/.test(S)&&(_.includes(S)||P(J=>[...J,S]))},Y=w=>P(S=>S.filter(J=>J!==w)),ae=w=>{w.key==="Enter"||w.key===","||w.key===";"||w.key===" "?(w.preventDefault(),A(O),B("")):w.key==="Backspace"&&O===""&&_.length>0&&P(S=>S.slice(0,-1))},ne=async()=>{if(F||_.length===0&&C!=="replace")return;L(!0),$(null);let w=0,S=0;const J=[],q=d.map(async Q=>{const M=Ta(Q.vm.tags||"");let V;C==="replace"?V=[..._]:C==="add"?V=Array.from(new Set([...M,..._])):V=M.filter(k=>!_.includes(k));try{const k=await fetch(`/api/clusters/${encodeURIComponent(Q.clusterId)}/vms/${Q.vm.vmid}/tags`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({tags:V.join(";")})});if(k.ok)w++;else{S++;const D=await k.json().catch(()=>({}));J.push(`#${Q.vm.vmid}: ${D.error||`HTTP ${k.status}`}`)}}catch(k){S++,J.push(`#${Q.vm.vmid}: ${(k==null?void 0:k.message)||"unknown"}`)}});await Promise.all(q),$({ok:w,fail:S,errs:J}),L(!1),S===0&&(v==null||v())};return r?e.jsx("div",{className:"bt-back",onClick:l,children:e.jsxs("div",{className:"bt-modal",onClick:w=>w.stopPropagation(),children:[e.jsxs("div",{className:"bt-head",children:[e.jsxs("div",{className:"bt-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),e.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]}),e.jsx("span",{children:b("bulk.tag_title")}),e.jsx("span",{className:"bt-target",children:u==="zh-TW"?`${d.length} 個目標`:`${d.length} target(s)`})]}),e.jsx("button",{className:"bt-close",onClick:l,children:"×"})]}),e.jsxs("div",{className:"bt-body",children:[e.jsx("div",{className:"bt-modes",children:["add","remove","replace"].map(w=>e.jsxs("label",{className:`bt-mode ${C===w?"on":""}`,children:[e.jsx("input",{type:"radio",checked:C===w,onChange:()=>m(w)}),b(`bulk.tag_mode.${w}`)]},w))}),e.jsxs("div",{className:"bt-chips",children:[_.map(w=>e.jsxs("span",{className:"bt-chip",children:[w,e.jsx("button",{className:"bt-chip-x",onClick:()=>Y(w),children:"×"})]},w)),e.jsx("input",{className:"bt-input",value:O,onChange:w=>B(w.target.value),onKeyDown:ae,placeholder:_.length===0?b("tagedit.placeholder"):""})]}),W.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"bt-sug-label",children:b("tagedit.suggestions")}),e.jsx("div",{className:"bt-sug",children:W.slice(0,30).map(w=>e.jsxs("button",{className:"bt-sug-chip",onClick:()=>A(w),children:["+ ",w]},w))})]}),T&&e.jsxs("div",{className:`bt-results ${T.fail===0?"ok":T.ok===0?"fail":"mixed"}`,children:[e.jsx("div",{children:u==="zh-TW"?`成功 ${T.ok} / 失敗 ${T.fail}`:`${T.ok} ok / ${T.fail} failed`}),T.errs.slice(0,5).map((w,S)=>e.jsx("div",{className:"bt-err-line",children:w},S)),T.errs.length>5&&e.jsx("div",{className:"bt-err-line",children:"…"})]})]}),e.jsxs("div",{className:"bt-footer",children:[e.jsx("span",{className:"bt-hint",children:b("tagedit.hint")}),e.jsx("span",{style:{flex:1}}),e.jsx("button",{className:"bt-btn ghost",onClick:l,children:b("notes.cancel")}),e.jsx("button",{className:"bt-btn primary",onClick:ne,disabled:F||_.length===0&&C!=="replace",children:b(F?"notes.saving":"bulk.tag_apply")})]}),e.jsx("style",{children:`
          .bt-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .bt-modal { width: min(640px, 96vw); display: flex; flex-direction: column; max-height: 86vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: bt-in .18s ease-out; overflow: hidden; }
          @keyframes bt-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .bt-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .bt-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .bt-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .bt-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .bt-close:hover { color: var(--primary); }
          .bt-body { flex: 1; padding: 14px 18px; overflow: auto; }

          .bt-modes { display: flex; gap: 18px; margin-bottom: 12px; }
          .bt-mode { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); cursor: pointer; padding: 5px 10px; border-radius: 3px; border: 1px solid transparent; }
          .bt-mode input { accent-color: var(--primary); }
          .bt-mode.on { color: var(--primary); border-color: var(--primary); background: rgba(0,240,255,.06); }

          .bt-chips { display: flex; gap: 6px 8px; flex-wrap: wrap; padding: 10px 12px; min-height: 60px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; align-items: center; }
          .bt-chip { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px 3px 10px; border-radius: 999px; background: rgba(0, 240, 255, 0.12); border: 1px solid var(--primary); color: var(--primary); font-family: var(--font-mono); font-size: 13.5px; }
          .bt-chip-x { background: transparent; border: none; color: currentColor; cursor: pointer; padding: 0 4px; font-size: 14px; line-height: 1; opacity: .8; }
          .bt-chip-x:hover { opacity: 1; color: var(--danger, #ff4d6d); }
          .bt-input { flex: 1; min-width: 120px; background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-mono); font-size: 13px; padding: 4px; }

          .bt-sug-label { margin-top: 14px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-secondary); }
          .bt-sug { margin-top: 6px; display: flex; gap: 4px 6px; flex-wrap: wrap; }
          .bt-sug-chip { padding: 2px 8px; border: 1px dashed rgba(0, 240, 255, 0.3); background: transparent; color: var(--text-secondary); font-family: var(--font-mono); font-size: 12.5px; border-radius: 999px; cursor: pointer; }
          .bt-sug-chip:hover { color: var(--primary); border-color: var(--primary); border-style: solid; }

          .bt-results { margin-top: 12px; padding: 10px 12px; border-radius: 3px; font-family: var(--font-mono); font-size: 13.5px; border-left-width: 3px; border-style: solid; }
          .bt-results.ok    { background: rgba(0,255,136,.06); border-color: var(--success); color: var(--success); }
          .bt-results.fail  { background: rgba(255,77,109,.06); border-color: var(--danger, #ff4d6d); color: var(--danger, #ff4d6d); }
          .bt-results.mixed { background: rgba(255,107,0,.06); border-color: var(--warning); color: var(--warning); }
          .bt-err-line { color: var(--danger, #ff4d6d); margin-top: 4px; }

          .bt-footer { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); }
          .bt-hint { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); }
          .bt-btn { padding: 6px 16px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .bt-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border: none; }
          .bt-btn.primary:hover:not(:disabled) { box-shadow: 0 0 16px rgba(0, 240, 255, 0.4); }
          .bt-btn.primary:disabled { opacity: .4; cursor: not-allowed; }
          .bt-btn.ghost { color: var(--text-secondary); background: transparent; border: 1px solid rgba(0, 240, 255, 0.4); }
          .bt-btn.ghost:hover { color: var(--primary); border-color: var(--primary); }
        `})]})}):null}function Yt(r,l){switch(r){case"start":return l("vm.start");case"stop":return l("vm.stop_hard");case"shutdown":return l("vm.shutdown_acpi");case"reboot":return l("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return r}}function zr(r){return r==="stop"||r==="shutdown"||r==="reboot"}function Tt(r,l,d,p,v){const b=u=>{if(!u.tasks)return null;for(const C of Object.values(u.tasks))if(C.vmid===r&&C.node===l&&C.status==="running")return C;return null};if(v&&d){const u=v[d];if(u)return b(u)}else if(p)return b(p);return null}const Mr=[{key:"status",labelKey:"node.status"},{key:"vmid",labelKey:"VMID"},{key:"type",labelKey:"table.type"},{key:"name",labelKey:"table.name"},{key:"tags",labelKey:"table.tags"},{key:"cluster",labelKey:"table.cluster"},{key:"node",labelKey:"table.node"},{key:"cpu",labelKey:"metric.cpu"},{key:"cores",labelKey:"table.cores"},{key:"memory",labelKey:"metric.memory"},{key:"maxmem",labelKey:"table.maxmem"},{key:"disk",labelKey:"table.disk_usage"},{key:"maxdisk",labelKey:"table.maxdisk"},{key:"diskio",labelKey:"table.diskio"},{key:"rx",labelKey:"metric.rx"},{key:"tx",labelKey:"metric.tx"},{key:"uptime",labelKey:"table.uptime"},{key:"task",labelKey:"table.task"}],qt=["status","vmid","type","name","tags","node","cpu","memory","rx","tx","uptime","task"],Ia=Qt.forwardRef(function({vm:l,isSelected:d,onClick:p,onContextMenu:v,animationDelay:b,task:u,isGhost:C=!1,isCompleting:m=!1},_){var w,S,J;const P=l.status==="running",O=l.memory.total_bytes>0?l.memory.used_bytes/l.memory.total_bytes*100:0,B=l.disk.total_bytes>0?l.disk.used_bytes/l.disk.total_bytes*100:0,F=Math.max(l.cpu.usage_percent,O,B),L=P?ze(F):"muted",T=!!u,$=(w=u==null?void 0:u.task_type)==null?void 0:w.includes("migrate"),W=((S=u==null?void 0:u.task_type)==null?void 0:S.includes("backup"))||((J=u==null?void 0:u.task_type)==null?void 0:J.includes("vzdump")),A=l.name.length>12?l.name.substring(0,11)+"…":l.name,ae=u?(q=>{const Q=q.toLowerCase();return Q.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:Q.includes("backup")||Q.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:Q.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:Q.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:Q.includes("clone")?{label:"CLONE",color:"#10b981"}:Q.includes("start")||Q.includes("qmstart")?{label:"START",color:"#00ff88"}:Q.includes("stop")||Q.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:Q.includes("reboot")||Q.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(u.task_type):null,ne=u?{type:u.task_type,target:u.target_node}:null;return e.jsxs("div",{ref:_,className:`vm-cell ${l.status} ${d?"selected":""} ${T?"has-task":""} ${$?"migrating":""} ${W?"backup":""} ${C?"ghost":""} ${m?"completing":""}`,onClick:p,onContextMenu:v,title:`${l.name} (${l.vmid})${u?`
[${u.task_type}]${u.target_node?` → ${u.target_node}`:""}`:""}`,style:{"--anim-delay":`${b}ms`,animationDelay:`${b}ms`},"data-vmid":l.vmid,"data-node":l.node,children:[e.jsxs("div",{className:`vm-cell-inner ${L}`,children:[e.jsx("span",{className:`vm-type-tag ${l.type==="lxc"?"ct":"vm"}`,children:l.type==="lxc"?"CT":"VM"}),e.jsx("span",{className:"vm-name",children:A}),e.jsx("span",{className:"vm-id",children:l.vmid}),u&&!$&&!W&&e.jsx("span",{className:"vm-task-icon",children:"⚙"}),W&&e.jsx("span",{className:"vm-backup-icon",children:"◉"}),$&&e.jsx("span",{className:"vm-migrate-icon",children:e.jsx("span",{className:"migrate-arrow",children:"→"})})]}),ae&&e.jsxs("div",{className:"vm-task-label",style:{borderColor:ae.color,color:ae.color},children:[ae.label,$&&u&&u.progress>0&&e.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(u.progress),"%"]})]}),T&&!$&&!W&&e.jsx("div",{className:"vm-task-ring"}),W&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"backup-ring"}),e.jsx("div",{className:"backup-scanner"}),e.jsxs("div",{className:"backup-particles",children:[e.jsx("span",{className:"bp bp1"}),e.jsx("span",{className:"bp bp2"}),e.jsx("span",{className:"bp bp3"}),e.jsx("span",{className:"bp bp4"})]})]}),$&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"migrate-ring"}),e.jsxs("div",{className:"migrate-particles",children:[e.jsx("span",{className:"particle p1"}),e.jsx("span",{className:"particle p2"}),e.jsx("span",{className:"particle p3"})]}),(ne==null?void 0:ne.target)&&e.jsxs("div",{className:"migrate-target-label",children:["→ ",ne.target]})]}),C&&e.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",u&&u.progress>0&&e.jsxs("span",{className:"vm-task-progress",children:[Math.floor(u.progress),"%"]})]})]})});function Tr({vm:r,onClose:l}){const{t:d}=We(),p=r.status==="running";return e.jsxs("div",{className:"vm-detail-panel panel",children:[e.jsxs("div",{className:"detail-scroll-area",children:[e.jsxs("div",{className:"detail-header",children:[e.jsxs("div",{className:"detail-title",children:[e.jsx("span",{className:`detail-status ${Xt(r.status)}`}),e.jsx("span",{className:"detail-name",children:r.name}),e.jsxs("span",{className:"detail-id",children:["#",r.vmid]})]}),e.jsx("button",{className:"detail-close",onClick:l,children:"×"})]}),e.jsxs("div",{className:"detail-content",children:[e.jsxs("div",{className:"detail-info",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:d("table.node")}),e.jsx("span",{className:"info-value",children:r.node})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:d("table.type")}),e.jsx("span",{className:"info-value",children:r.type.toUpperCase()})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:d("node.status")}),e.jsx("span",{className:`info-value text-${Xt(r.status)}`,children:r.status.toUpperCase()})]}),p&&e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:d("table.uptime")}),e.jsx("span",{className:"info-value",children:Ea(r.uptime)})]}),(()=>{const v=Zt(r.tags);return v.length>0?e.jsxs("div",{className:"info-row tags-row",children:[e.jsx("span",{className:"info-label",children:d("table.tags")}),e.jsx("div",{className:"vm-tags detail-tags",children:v.map((b,u)=>e.jsx("span",{className:"vm-tag",children:b},u))})]}):null})()]}),p&&e.jsxs("div",{className:"detail-metrics",children:[e.jsxs("div",{className:"metric-row metric-row-stacked",children:[e.jsxs("div",{className:"metric-row-header",children:[e.jsx("span",{className:"metric-label",children:d("metric.cpu")}),e.jsx("span",{className:`metric-value text-${ze(r.cpu.usage_percent)}`,children:ct(r.cpu.usage_percent,1)})]}),e.jsx("div",{className:"metric-bar",children:e.jsx("div",{className:`metric-fill ${ze(r.cpu.usage_percent)}`,style:{width:`${r.cpu.usage_percent}%`}})})]}),e.jsxs("div",{className:"metric-row metric-row-stacked",children:[e.jsxs("div",{className:"metric-row-header",children:[e.jsx("span",{className:"metric-label",children:d("metric.memory")}),e.jsxs("span",{className:"metric-value",children:[Oe(r.memory.used_bytes)," / ",Oe(r.memory.total_bytes)]})]}),e.jsx("div",{className:"metric-bar",children:e.jsx("div",{className:`metric-fill ${ze(r.memory.used_bytes/r.memory.total_bytes*100)}`,style:{width:`${r.memory.used_bytes/r.memory.total_bytes*100}%`}})})]}),e.jsxs("div",{className:"metric-row metric-row-network",children:[e.jsx("span",{className:"metric-label",children:d("metric.network")}),e.jsxs("div",{className:"network-stats",children:[e.jsxs("span",{className:"net-rx",children:["↓ ",Oe(r.network.rx_bytes_sec),"/s"]}),e.jsxs("span",{className:"net-tx",children:["↑ ",Oe(r.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),e.jsx("div",{className:"corner-decoration top-left"}),e.jsx("div",{className:"corner-decoration top-right"}),e.jsx("div",{className:"corner-decoration bottom-left"}),e.jsx("div",{className:"corner-decoration bottom-right"})]})}const Ir=12e3;function Ur({cluster:r,clusters:l}){var wa,ka,ja,Na,Ca,$a;const{t:d,language:p}=We(),v=It(),[b,u]=o.useState(null),C=ea(),[m,_]=o.useState(null),[P,O]=o.useState(null),[B,F]=o.useState(null),[L,T]=o.useState(null),[$,W]=o.useState(null),[A,Y]=o.useState(!1),[ae,ne]=o.useState(()=>{try{const t=localStorage.getItem("jtp.matrix.table.cols.v1");if(t)return new Set(JSON.parse(t))}catch{}return new Set(qt)}),w=o.useCallback(t=>ae.has(t),[ae]),S=o.useCallback(t=>{ne(i=>{const s=new Set(i);s.has(t)?s.delete(t):s.add(t);try{localStorage.setItem("jtp.matrix.table.cols.v1",JSON.stringify([...s]))}catch{}return s})},[]),J=o.useCallback(()=>{ne(new Set(qt));try{localStorage.setItem("jtp.matrix.table.cols.v1",JSON.stringify(qt))}catch{}},[]);o.useEffect(()=>{if(!A)return;const t=i=>{i.target.closest(".col-picker-wrap")||Y(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[A]);const[q,Q]=o.useState(null),[M,V]=o.useState(null),[k,D]=o.useState(null),[oe,ye]=o.useState(null),[pe,Me]=o.useState(null),[me,dt]=o.useState(null),[we,qe]=o.useState(null),[fe,Je]=o.useState(null),[Xe,$e]=o.useState(!1),[Se,yt]=o.useState("disabled"),[pt,Te]=o.useState({});o.useEffect(()=>{Ue.getConfig().then(t=>{var s;yt(((s=t.console)==null?void 0:s.mode)||"disabled");const i={};(t.clusters||[]).forEach(a=>{i[a.id]=!!(a.auth&&a.auth.password&&a.auth.password.length>0)}),Te(i)}).catch(()=>yt("disabled"))},[]);const[Ce,mt]=o.useState(null),Ze=o.useCallback((t,i,s,a,n="auto",h)=>{const f=typeof localStorage<"u"&&localStorage.getItem("language")||"",x=i.type==="lxc",g=n==="serial"&&!x,z=`${x||g?"/console-term":"/console"}/${encodeURIComponent(t)}/${encodeURIComponent(i.node)}/${i.vmid}?ct=${encodeURIComponent(s)}`+(i.name?`&name=${encodeURIComponent(i.name)}`:"")+(g?"&kind=serial":"")+(f?`&lang=${encodeURIComponent(f)}`:"")+(!x&&!g&&a?`#vp=${encodeURIComponent(a)}`:"");h&&!h.closed?h.location.href=z:window.open(z,"_blank","noopener,noreferrer")},[]),ie=o.useCallback(()=>{const t=window.open("","_blank");if(t)try{t.opener=null,t.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Console…</title><style>html,body{margin:0;height:100%;background:#05070d;color:#00f0ff;font-family:monospace;display:flex;align-items:center;justify-content:center}</style></head><body>opening console…</body></html>')}catch{}return t},[]),[Ae,ht]=o.useState([]),xt=o.useRef(new Map),wt=o.useCallback(t=>{t.action==="start"||t.action==="resume"?Ve(t):_(t)},[]),Ve=o.useCallback(async t=>{_(null);try{const i=t.vm.type==="lxc",s=i?await Ue.ctAction(t.clusterId,t.vm.node,t.vm.vmid,t.action):await Ue.vmAction(t.clusterId,t.vm.node,t.vm.vmid,t.action);console.info(`[vm_control] ${t.action} ${i?"ct":"vm"}/${t.vm.vmid} → upid=${s.upid}`)}catch(i){const s=i instanceof Error?i.message:String(i);s.includes("vm_control_disabled")?await v.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await v.alert(`${t.action} failed: ${s.slice(0,200)}`)}},[]),Z=o.useCallback(()=>{m&&Ve(m)},[m,Ve]),[de,Pe]=o.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[he,Et]=o.useState(""),[re,st]=o.useState(new Set),[je,Fe]=o.useState(!1),ut=o.useCallback(t=>{st(i=>{const s=new Set(i);return s.has(t)?s.delete(t):s.add(t),s})},[]),nt=o.useCallback(()=>st(new Set),[]),ot=o.useCallback(async t=>{if(re.size!==0){Fe(!0);try{const i=new Map;for(const f of re){const[x,,g]=f.split("/"),N=parseInt(g,10);if(!x||!Number.isFinite(N))continue;const z=i.get(x)||[];z.push(N),i.set(x,z)}const s=[];for(const[f,x]of i)try{const g=await Ue.bulkAction(f,{action:t,vmids:x}),N=g.results.filter(U=>U.ok).length,z=g.results.length-N,E=g.results.filter(U=>!U.ok).map(U=>`#${U.vmid}: ${U.error||"unknown"}`);s.push({cluster:f,ok:N,fail:z,errs:E})}catch(g){const N=g instanceof Error?g.message:String(g);s.push({cluster:f,ok:0,fail:x.length,errs:[N]})}const a=s.reduce((f,x)=>f+x.ok,0),n=s.reduce((f,x)=>f+x.fail,0),h=[];s.forEach(f=>{h.push(`${f.cluster}: ${f.ok} ok / ${f.fail} fail`),f.errs.slice(0,5).forEach(x=>h.push(`  • ${x}`)),f.errs.length>5&&h.push(`  • … +${f.errs.length-5}`)}),await v.alert(`${t.toUpperCase()}: ${a} ok, ${n} fail

${h.join(`
`)}`,{title:"Bulk action result"}),n===0&&nt()}finally{Fe(!1)}}},[re,nt]),[K,Qe]=o.useState(()=>{const t=(()=>{if(typeof window>"u")return null;const s=window.location.pathname.split("/").filter(Boolean)[1];return s==="grid"||s==="table"||s==="thumb"||s==="heatmap"?s:null})();if(t)return t;const i=localStorage.getItem("vm_matrix_view_mode");return i==="table"||i==="thumb"||i==="grid"||i==="heatmap"?i:"grid"});o.useEffect(()=>{if(typeof window>"u"||window.location.pathname.split("/").filter(Boolean)[0]!=="matrix")return;const i=`/matrix/${K}`;window.location.pathname!==i&&window.history.replaceState(null,"",i)},[K]),o.useEffect(()=>{const t=()=>{const i=window.location.pathname.split("/").filter(Boolean)[1];(i==="grid"||i==="table"||i==="thumb"||i==="heatmap")&&Qe(i)};return window.addEventListener("popstate",t),()=>window.removeEventListener("popstate",t)},[]);const[_e,c]=o.useState(()=>{const t=parseInt(localStorage.getItem("vm_matrix_thumb_size")||"320",10);return Number.isFinite(t)?Math.max(160,Math.min(640,t)):320}),[y,j]=o.useState(null);o.useEffect(()=>{if(!y)return;const t=i=>{i.key==="Escape"&&j(null)};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[y]);const[I,ee]=o.useState(()=>Math.floor(Date.now()/3e4));o.useEffect(()=>{if(K!=="thumb")return;const t=window.setInterval(()=>ee(Math.floor(Date.now()/3e4)),3e4);return()=>window.clearInterval(t)},[K]);const[H,le]=o.useState(()=>{const t=localStorage.getItem("vm_matrix_thumb_type");return t==="qemu"||t==="lxc"?t:"all"});o.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_type",H)},[H]);const[it,te]=o.useState(()=>localStorage.getItem("vm_matrix_thumb_prefer_content")!=="0");o.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_prefer_content",it?"1":"0")},[it]);const[Ne,xe]=o.useState({}),ue=o.useRef({});ue.current=Ne,o.useEffect(()=>()=>{Object.values(ue.current).forEach(t=>{try{URL.revokeObjectURL(t.url)}catch{}})},[]);const Re=o.useRef(new Map),Ie=o.useRef(!1);o.useEffect(()=>{K==="thumb"&&(Ie.current=!1)},[K]),o.useLayoutEffect(()=>{if(K!=="thumb"){Re.current.clear();return}const t=a=>{let n=0,h=0,f=a;for(;f;)n+=f.offsetLeft,h+=f.offsetTop,f=f.offsetParent;return{left:n,top:h}},i=document.querySelectorAll(".vm-thumb-card[data-card-key]"),s=new Map;i.forEach(a=>{const n=a.dataset.cardKey;n&&s.set(n,t(a))}),Ie.current&&i.forEach(a=>{const n=a.dataset.cardKey;if(!n)return;const h=Re.current.get(n),f=s.get(n);if(!h||!f)return;const x=h.left-f.left,g=h.top-f.top;Math.abs(x)<1&&Math.abs(g)<1||(a.style.transition="none",a.style.transform=`translate(${x}px, ${g}px)`,requestAnimationFrame(()=>{a.style.transition="transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",a.style.transform=""}))}),Re.current=s}),o.useEffect(()=>{localStorage.setItem("vm_matrix_view_mode",K)},[K]),o.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_size",String(_e))},[_e]);const De=o.useRef(null),[X,Ge]=o.useState("vmid"),[be,na]=o.useState("asc"),[Ra,oa]=o.useState(!1),[kt,ia]=o.useState(()=>{const t=localStorage.getItem("matrix_card_width");return t?parseInt(t,10):85}),[ge,jt]=o.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[Ke,Nt]=o.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[Pt,Ba]=o.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[gt,Oa]=o.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[R,Rt]=o.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[La,Bt]=o.useState(null),la=o.useRef(new Map),[Ct,ca]=o.useState([]),[da,pa]=o.useState([]),[He,Ot]=o.useState(new Map),ma=o.useRef(new Set),[ha,xa]=o.useState(!1),[Wa,Aa]=o.useState(0),[Lt,ua]=o.useState(!0);o.useEffect(()=>{xa(!1),Aa(s=>s+1),ua(!0);const t=setTimeout(()=>{xa(!0)},100),i=setTimeout(()=>{ua(!1)},8e3);return()=>{clearTimeout(t),clearTimeout(i)}},[Ke]);const Ye=o.useRef(new Map),Wt=o.useRef(new Map),At=o.useRef(null),ft=o.useRef(!1),bt=o.useRef(new Map),Ft=o.useRef([]),[Fa,Ua]=o.useState(0),ga=o.useMemo(()=>{if(ge!=="load")return"";const t=[],i=s=>{Object.values(s.vms).forEach(a=>{if(a.template||de==="running"&&a.status!=="running"||de==="stopped"&&a.status!=="stopped")return;const n=a.memory.total_bytes>0?a.memory.used_bytes/a.memory.total_bytes*100:0,h=a.disk.total_bytes>0?a.disk.used_bytes/a.disk.total_bytes*100:0,f=Math.max(a.cpu.usage_percent,n,h);t.push({key:`${a.node}/${a.vmid}`,load:Math.round(f)})})};return l?Object.values(l).forEach(i):r&&i(r),t.sort((s,a)=>a.load-s.load),t.map(s=>`${s.key}:${s.load}`).join("|")},[r,l,ge,de]);o.useLayoutEffect(()=>{if(ge!=="load"||ft.current)return;const t=new Map;Ye.current.forEach((i,s)=>{i&&t.set(s,i.getBoundingClientRect())}),Wt.current=t},[ga,ge]),o.useEffect(()=>{ge==="load"&&Wt.current.size!==0&&requestAnimationFrame(()=>{const t=[];Ye.current.forEach((i,s)=>{if(!i)return;const a=Wt.current.get(s);if(!a)return;const n=i.getBoundingClientRect(),h=a.left-n.left,f=a.top-n.top;if(Math.abs(h)>2||Math.abs(f)>2){ft.current=!0;const x=i.animate([{transform:`translate(${h}px, ${f}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});t.push(x)}}),t.length>0?Promise.all(t.map(i=>i.finished)).then(()=>{ft.current=!1}).catch(()=>{ft.current=!1}):ft.current=!1})},[ga,ge]);const[fa,ba]=o.useState(!1);o.useEffect(()=>{fa||Ue.getConfig().then(t=>{var s;const i=(s=t==null?void 0:t.ui)==null?void 0:s.vm_matrix_default_filter;i&&(Pe(i),localStorage.setItem("vm_matrix_default_filter",i)),ba(!0)}).catch(()=>{const t=localStorage.getItem("vm_matrix_default_filter");t&&Pe(t),ba(!0)})},[fa]),o.useEffect(()=>{const t=()=>{const s=localStorage.getItem("matrix_card_width");s&&ia(parseInt(s,10));const a=localStorage.getItem("matrix_sort_by");a&&a!==ge&&jt(a);const n=localStorage.getItem("matrix_group_sort_by");n&&n!==Pt&&Ba(n);const h=localStorage.getItem("matrix_group_sort_order");h&&h!==gt&&Oa(h)};window.addEventListener("storage",t);const i=setInterval(t,1e3);return()=>{window.removeEventListener("storage",t),clearInterval(i)}},[ge,Pt,gt]);const Va=o.useCallback((t,i)=>{var s;return r&&r.client_health?r.client_health[i]||null:l&&((s=l[t])!=null&&s.client_health)&&l[t].client_health[i]||null},[r,l]),Ut=o.useCallback((t,i,s)=>{t.preventDefault(),t.stopPropagation();const a=Math.min(t.clientX,window.innerWidth-250),n=Math.min(t.clientY,window.innerHeight-300);Rt({visible:!0,x:a,y:n,vm:i,clusterId:s});const h=i.type==="lxc",f=h?"lxc":"qemu",x=`${s}|${i.node}|${i.vmid}|${f}`,g=la.current.get(x),N=Date.now();if(g&&N-g.ts<6e4){Bt(g.caps);return}Bt(h?{novnc:!1,xterm:!0,spice:!1}:{novnc:!0,xterm:!1,spice:!1}),(async()=>{try{const z=await fetch(`/api/clusters/${encodeURIComponent(s)}/nodes/${encodeURIComponent(i.node)}/${f}/${i.vmid}/config`,{credentials:"same-origin"});if(!z.ok)return;const E=await z.json(),U=E&&E.config||{};let se;if(h){const G=U.console===void 0||String(U.console)==="1"||U.console===1;se={xterm:G,novnc:G,spice:!1}}else{const G=Object.keys(U).some(zt=>/^serial[0-9]+$/.test(zt)),ve=String(U.vga||"").toLowerCase(),lt=/qxl/.test(ve)||ve==="virtio-vga";se={novnc:!0,xterm:G,spice:lt}}la.current.set(x,{caps:se,ts:N}),Rt(G=>{var ve;return((ve=G.vm)==null?void 0:ve.vmid)===i.vmid&&G.clusterId===s,G}),Bt(se)}catch{}})()},[]),Da=o.useCallback(()=>{Rt(t=>({...t,visible:!1}))},[]),ce=!r&&l&&Object.keys(l).length>0,vt=o.useRef(new Map);o.useEffect(()=>()=>{vt.current.forEach(t=>window.clearTimeout(t)),vt.current.clear()},[]);const Vt=o.useRef(new Map),Be=o.useMemo(()=>{const t=[],i=(n,h,f)=>{if(!n.tasks)return;Object.values(n.tasks).forEach(g=>{var G;const N=((G=g.task_type)==null?void 0:G.toLowerCase())||"",z=N.includes("migrate"),E=g.status==="running",U=!!g.target_node,se=N.startsWith("ha");if(N.startsWith("qm")||N.startsWith("vz"),E&&z&&U){const ve=Object.keys(n.vms).find(lt=>{const zt=n.vms[lt];return zt.vmid===g.vmid&&(se||zt.node===g.node)});ve&&t.push({vm:n.vms[ve],task:g,targetNode:g.target_node||"",clusterId:h,clusterLabel:f,isHA:se})}})};ce&&l?Object.entries(l).forEach(([n,h])=>{i(h,n,h.name||n)}):r&&i(r,r.id,r.name||r.id);const s=new Map;for(const n of t){const h=`${n.clusterId}:${n.vm.vmid}`,f=s.get(h);(!f||f.isHA&&!n.isHA)&&s.set(h,n)}const a=Date.now();for(const[n,h]of s)Vt.current.set(n,{...h,lastSeen:a});return Vt.current.forEach((n,h)=>{if(s.has(h))return;const f=ce?l==null?void 0:l[n.clusterId]:(r==null?void 0:r.id)===n.clusterId?r:void 0;if((f?Object.values(f.vms||{}).some(g=>g.vmid===n.vm.vmid&&g.node===n.targetNode):!1)||a-n.lastSeen>Ir){Vt.current.delete(h);return}s.set(h,n)}),Array.from(s.values())},[r,l,ce]);o.useEffect(()=>{const t=new Set(Be.map(a=>`${a.clusterId}:${a.vm.vmid}`)),i=ma.current,s=xt.current;i.forEach(a=>{if(!t.has(a)&&!He.has(a)){const n=s.get(a);n&&n.upid&&(async()=>{var h,f,x;try{const g=await Ue.taskStatus(n.clusterId,n.node,n.upid),N=(g==null?void 0:g.exitstatus)||"";if((g==null?void 0:g.status)==="running")return;if(N&&N!=="OK"){const E=((h=r==null?void 0:r.vms)==null?void 0:h[`${n.sourceNode}/${n.vmid}`])||((x=(f=l==null?void 0:l[n.clusterId])==null?void 0:f.vms)==null?void 0:x[`${n.sourceNode}/${n.vmid}`]),U=E&&E.lock||"migrate";ht(se=>se.some(G=>G.id===a)?se:[...se,{id:a,vmid:n.vmid,sourceNode:n.sourceNode,targetNode:n.targetNode,clusterLabel:n.clusterLabel,lock:U,copied:!1}])}}catch{}})(),s.delete(a)}}),Be.forEach(({vm:a,task:n,clusterId:h,clusterLabel:f,targetNode:x})=>{const g=`${h}:${a.vmid}`;s.set(g,{upid:n.upid,node:n.node,sourceNode:a.node,vmid:a.vmid,clusterId:h,clusterLabel:f,targetNode:x})}),ma.current=t},[Be,He,r,l]);const Dt=o.useRef(new Map);o.useEffect(()=>{Be.forEach(({vm:t,targetNode:i,clusterId:s})=>{const a=`${s}:${t.vmid}`;Dt.current.set(a,{targetNode:i,sourceNode:t.node,clusterId:s,vmid:t.vmid})})},[Be]);const Gt=o.useRef(new Map);o.useEffect(()=>{Ct.forEach(t=>{const i=`${t.clusterId}:${t.vmid}`;Gt.current.set(i,{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2})})},[Ct]),o.useEffect(()=>{const t=new Set(Be.map(i=>`${i.clusterId}:${i.vm.vmid}`));Dt.current.forEach((i,s)=>{if(!t.has(s)&&!He.has(s)){const a=Gt.current.get(s);if(a){const n=Date.now(),h=800,f=()=>{const x=Date.now()-n,g=Math.min(x/h,1),N=a.x1+(a.x2-a.x1)*g,z=a.y1+(a.y2-a.y1)*g;pa([{x1:N,y1:z,x2:a.x2,y2:a.y2,vmid:i.vmid,progress:g}]),g<1?requestAnimationFrame(f):pa([])};requestAnimationFrame(f)}Ot(n=>{const h=new Map(n);return h.set(s,{...i,startTime:Date.now()}),h}),Dt.current.delete(s),Gt.current.delete(s),window.clearTimeout(vt.current.get(s)),vt.current.set(s,window.setTimeout(()=>{vt.current.delete(s),Ot(n=>{const h=new Map(n);return h.delete(s),h})},1e4))}})},[Be,He]),o.useEffect(()=>{if(He.size===0)return;const t=(i,s)=>{const a=n=>{for(const h of Object.values(n.vms))if(h.vmid===i)return h.node;return null};if(l&&s){const n=l[s];if(n)return a(n)}else if(r)return a(r);return null};He.forEach((i,s)=>{const a=t(i.vmid,i.clusterId);a&&a===i.targetNode&&a!==i.sourceNode&&Ot(n=>{const h=new Map(n);return h.delete(s),h})})},[r,l,He]);const $t=o.useCallback((t,i)=>{const s=ce?`${i} / `:"";switch(Ke){case"none":return ce?i:"all";case"type":return`${s}${t.type==="qemu"?"VM":"CT"}`;case"tag":{const a=Zt(t.tags);return a.length>0?`${s}${a[0]}`:`${s}(no tag)`}case"node":default:return`${s}${t.node}`}},[Ke,ce]),va=o.useMemo(()=>{const t={},i=(s,a,n)=>{Object.entries(s.vms).forEach(([h,f])=>{if(de==="running"&&f.status!=="running"||de==="stopped"&&f.status!=="stopped"||he&&!f.name.toLowerCase().includes(he.toLowerCase())&&!String(f.vmid).includes(he)||f.template)return;const x=$t(f,a);t[x]||(t[x]={vms:[],clusterId:n}),t[x].vms.push(f)})};return ce?Object.entries(l).forEach(([s,a])=>{const n=a.name||s;i(a,n,s)}):r&&i(r,"",r.id),Object.values(t).forEach(s=>{s.vms.sort((a,n)=>{switch(ge){case"name":return a.name.localeCompare(n.name);case"load":{const h=a.memory.total_bytes>0?a.memory.used_bytes/a.memory.total_bytes*100:0,f=n.memory.total_bytes>0?n.memory.used_bytes/n.memory.total_bytes*100:0,x=a.disk.total_bytes>0?a.disk.used_bytes/a.disk.total_bytes*100:0,g=n.disk.total_bytes>0?n.disk.used_bytes/n.disk.total_bytes*100:0,N=Math.max(a.cpu.usage_percent,h,x),z=Math.max(n.cpu.usage_percent,f,g);if(a.status!=="running"&&n.status==="running")return 1;if(a.status==="running"&&n.status!=="running")return-1;if(a.status!=="running"&&n.status!=="running")return a.vmid-n.vmid;const E=G=>G>=95?0:G>=80?1:2,U=E(N),se=E(z);return U!==se?U-se:z-N}case"vmid":default:return a.vmid-n.vmid}})}),t},[r,l,ce,de,he,ge,$t]),et=o.useMemo(()=>{const t=[],i=(s,a)=>{Object.values(s.vms).forEach(n=>{n.template||n.status==="running"&&de!=="stopped"&&(H==="qemu"&&n.type!=="qemu"||H==="lxc"&&n.type!=="lxc"||he&&!n.name.toLowerCase().includes(he.toLowerCase())&&!String(n.vmid).includes(he)||t.push({...n,clusterId:a}))})};return ce&&l?Object.entries(l).forEach(([s,a])=>i(a,s)):r&&i(r,r.id),t.sort((s,a)=>{switch(ge){case"name":return s.name.localeCompare(a.name);case"load":{const n=s.memory.total_bytes>0?s.memory.used_bytes/s.memory.total_bytes*100:0,h=a.memory.total_bytes>0?a.memory.used_bytes/a.memory.total_bytes*100:0,f=s.disk.total_bytes>0?s.disk.used_bytes/s.disk.total_bytes*100:0,x=a.disk.total_bytes>0?a.disk.used_bytes/a.disk.total_bytes*100:0,g=Math.max(s.cpu.usage_percent,n,f),N=Math.max(a.cpu.usage_percent,h,x),z=g>=95?0:g>=80?1:2,E=N>=95?0:N>=80?1:2;return z!==E?z-E:N-g}case"vmid":default:return s.vmid-a.vmid}}),t},[r,l,ce,de,he,ge,H]),Ga=o.useMemo(()=>{const t=new Map,i=s=>l&&l[s]?l[s].name||s:r&&r.id===s&&r.name||s;return et.forEach(s=>{const a=i(s.clusterId),n=$t(s,a),h=t.get(n)||[];h.push(s),t.set(n,h)}),Array.from(t.entries()).sort(([s],[a])=>{const n=s.localeCompare(a);return gt==="desc"?-n:n})},[et,$t,l,r,gt]);o.useEffect(()=>{if(K!=="thumb")return;let t=!1;const i=640,s=Ie.current,a={},n=async x=>{const g=x.clusterId||(r==null?void 0:r.id)||"",N=`${g}/${x.node}/${x.vmid}`,z=`/api/console/screenshot/${encodeURIComponent(g)}/${encodeURIComponent(x.node)}/${x.vmid}?max=${i}&t=${I}`;try{const E=await fetch(z,{credentials:"same-origin"});if(!E.ok||t)return;const U=await E.blob();if(t)return;const se=URL.createObjectURL(U),G=E.headers.get("X-Thumb-Empty")==="1";s?a[N]={url:se,isBlank:G}:xe(ve=>{const lt=ve[N];if(lt)try{URL.revokeObjectURL(lt.url)}catch{}return{...ve,[N]:{url:se,isBlank:G}}})}catch{}},h=6;return(async x=>{const g=new Set;for(const N of x){const z=n(N).finally(()=>{g.delete(z)});g.add(z),g.size>=h&&await Promise.race(g)}await Promise.all(g)})(et).finally(()=>{if(t){Object.values(a).forEach(g=>{try{URL.revokeObjectURL(g.url)}catch{}});return}const x=new Set(et.map(g=>`${g.clusterId||(r==null?void 0:r.id)||""}/${g.node}/${g.vmid}`));xe(g=>{let N=!1;const z={};return Object.entries(g).forEach(([E,U])=>{if(x.has(E))z[E]=U;else{try{URL.revokeObjectURL(U.url)}catch{}N=!0}}),s&&Object.entries(a).forEach(([E,U])=>{const se=z[E];if(se)try{URL.revokeObjectURL(se.url)}catch{}z[E]=U,N=!0}),N?z:g}),Ie.current||setTimeout(()=>{t||(Ie.current=!0)},300)}),()=>{t=!0}},[K,et,I,r==null?void 0:r.id]);const tt=o.useMemo(()=>{const t=[],i=new Map;return ce&&l&&Object.entries(l).forEach(([s,a])=>{const n=a.name||s;Object.values(a.nodes||{}).forEach(h=>{h&&h.node&&i.set(h.node,{id:s,label:n})})}),Be.forEach(({vm:s,targetNode:a,clusterId:n,clusterLabel:h})=>{const f=i.get(a),x=f&&f.id!==n?f:{id:n,label:h},g=ce?`${x.label} / ${a}`:a,N=ce?`${h} / ${s.node}`:s.node;t.push({vm:s,targetGroupKey:g,sourceGroupKey:N,clusterId:n,targetClusterId:x.id})}),t},[Be,ce,l]);o.useEffect(()=>{if(K!=="grid"||tt.length===0){ca([]);return}const t=()=>{const n=At.current;if(!n)return;const h=n.getBoundingClientRect(),f=n.scrollLeft,x=n.scrollTop,g=[];tt.forEach(({vm:N})=>{const z=`${N.cluster_id}/${N.node}/${N.vmid}`,E=`ghost-${N.cluster_id}-${N.vmid}`,U=Ye.current.get(z),se=Ye.current.get(E);if(U&&se){const G=U.getBoundingClientRect(),ve=se.getBoundingClientRect();g.push({x1:G.left+G.width/2-h.left+f,y1:G.top+G.height/2-h.top+x,x2:ve.left+ve.width/2-h.left+f,y2:ve.top+ve.height/2-h.top+x,vmid:N.vmid,clusterId:N.cluster_id})}}),ca(g)},i=setTimeout(t,100),s=setInterval(t,500),a=At.current;return a&&a.addEventListener("scroll",t),()=>{clearTimeout(i),clearInterval(s),a&&a.removeEventListener("scroll",t)}},[tt,K]);const ke=o.useMemo(()=>{const t=[],i=(s,a,n)=>{Object.values(s.vms).forEach(h=>{de==="running"&&h.status!=="running"||de==="stopped"&&h.status!=="stopped"||he&&!h.name.toLowerCase().includes(he.toLowerCase())&&!String(h.vmid).includes(he)||h.template||t.push({...h,clusterName:a,clusterId:n})})};return ce?Object.entries(l).forEach(([s,a])=>{const n=a.name||s;i(a,n,s)}):r&&i(r,r.name||"Cluster",r.id),t.sort((s,a)=>{var h,f,x,g;let n=0;switch(X){case"name":n=s.name.localeCompare(a.name);break;case"vmid":n=s.vmid-a.vmid;break;case"type":n=s.type.localeCompare(a.type);break;case"node":n=s.node.localeCompare(a.node);break;case"status":n=s.status.localeCompare(a.status);break;case"cpu":n=s.cpu.usage_percent-a.cpu.usage_percent;break;case"memory":n=s.memory.used_bytes/s.memory.total_bytes-a.memory.used_bytes/a.memory.total_bytes;break;case"uptime":n=s.uptime-a.uptime;break;case"rx":n=(((h=s.network)==null?void 0:h.rx_bytes_sec)||0)-(((f=a.network)==null?void 0:f.rx_bytes_sec)||0);break;case"tx":n=(((x=s.network)==null?void 0:x.tx_bytes_sec)||0)-(((g=a.network)==null?void 0:g.tx_bytes_sec)||0);break;case"task":{const N=Tt(s.vmid,s.node,s.cluster_id,r,l),z=Tt(a.vmid,a.node,a.cluster_id,r,l);N&&!z?n=-1:!N&&z?n=1:N&&z?n=N.task_type.localeCompare(z.task_type):n=0;break}}return be==="asc"?n:-n}),t},[r,l,ce,de,he,X,be]);o.useEffect(()=>{var s;if(K!=="heatmap"){Ft.current=[];return}const t=30,i=new Set;for(const a of ke){const n=`${a.cluster_id}|${a.node}|${a.vmid}`;i.add(n);const h=bt.current.get(n)||[],f=typeof((s=a.cpu)==null?void 0:s.usage_percent)=="number"?a.cpu.usage_percent:0;if(h.length===0)for(let x=0;x<t;x++)h.push(f);else h.push(f),h.length>t&&h.shift();bt.current.set(n,h)}{const a=Ft.current;a.push(Date.now()),a.length>t&&a.shift()}for(const a of Array.from(bt.current.keys()))i.has(a)||bt.current.delete(a);Ua(a=>a+1)},[ke,K]);const[St,Ka]=o.useState(0);o.useEffect(()=>{if(K!=="thumb")return;const t=De.current;if(!t)return;const i=new ResizeObserver(s=>{var n,h;const a=((h=(n=s[0])==null?void 0:n.contentRect)==null?void 0:h.width)||0;a>0&&Ka(a)});return i.observe(t),()=>i.disconnect()},[K]);const Kt=14,ya=o.useMemo(()=>{if(!St)return _e;const t=Math.max(1,Math.round((St+Kt)/(_e+Kt)));return Math.floor((St-Kt*(t-1))/t)},[St,_e]),Ha=Math.round(ya*9/16),Ee=t=>{oa(!0),setTimeout(()=>oa(!1),300),X===t?na(be==="asc"?"desc":"asc"):(Ge(t),na("asc"))},_t=o.useMemo(()=>{if(!b)return null;if(r)return r.vms[b]||null;if(l){for(const t of Object.values(l))if(t.vms[b])return t.vms[b]}return null},[b,r,l]),{totalVMs:Ya,runningVMs:qa}=o.useMemo(()=>{let t=0,i=0;const s=a=>{Object.values(a.vms).forEach(n=>{n.template||(t++,n.status==="running"&&i++)})};return ce?l&&Object.values(l).forEach(s):r&&s(r),{totalVMs:t,runningVMs:i}},[r,l,ce]);return!r&&!ce?e.jsx("div",{className:"holo-matrix empty",children:e.jsxs("div",{className:"empty-message",children:[e.jsx("span",{className:"loading-spinner"}),e.jsx("span",{children:d("cluster.select")})]})}):e.jsxs("div",{className:"holo-matrix",children:[e.jsx("div",{className:"grid-floor"}),e.jsxs("div",{className:"matrix-header",children:[e.jsxs("div",{className:"matrix-title-section",children:[e.jsxs("h1",{className:"matrix-title font-display",children:[e.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),e.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),d("nav.holo_matrix").toUpperCase()]}),e.jsxs("div",{className:"matrix-stats",children:[e.jsxs("span",{className:"stat-running",children:[qa," ",d("matrix.running")]}),e.jsx("span",{className:"stat-divider",children:"/"}),e.jsxs("span",{className:"stat-total",children:[Ya," ",d("matrix.total")]})]})]}),e.jsxs("div",{className:"matrix-controls",children:[e.jsxs("div",{className:"search-box",children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"M21 21l-4.35-4.35"})]}),e.jsx("input",{type:"text",placeholder:d("matrix.search"),value:he,onChange:t=>Et(t.target.value)})]}),e.jsxs("div",{className:`filter-tabs ${K==="thumb"?"is-disabled":""}`,children:[e.jsxs("button",{className:`filter-tab ${de==="all"?"active":""}`,onClick:()=>Pe("all"),disabled:K==="thumb",title:K==="thumb"?p==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),e.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),e.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),e.jsx("span",{className:"tb-lbl",children:d("matrix.filter_all")})]}),e.jsxs("button",{className:`filter-tab ${de==="running"?"active":""}`,onClick:()=>Pe("running"),disabled:K==="thumb",title:K==="thumb"?p==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:e.jsx("polygon",{points:"6 4 20 12 6 20 6 4"})})}),e.jsx("span",{className:"tb-lbl",children:d("matrix.filter_running")})]}),e.jsxs("button",{className:`filter-tab ${de==="stopped"?"active":""}`,onClick:()=>Pe("stopped"),disabled:K==="thumb",title:K==="thumb"?p==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:e.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})})}),e.jsx("span",{className:"tb-lbl",children:d("matrix.filter_stopped")})]})]}),e.jsxs("div",{className:"sort-selector",children:[e.jsxs("span",{className:"sort-label",children:[e.jsx("span",{className:"label-icon","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),e.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]})}),d("settings.sort_by"),":"]}),e.jsxs("button",{className:`sort-btn ${ge==="vmid"?"active":""}`,onClick:()=>{jt("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:d("settings.sort_vmid"),children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M4 7h3v10H4zM10 7h2v10h-2zM15 7h5v3h-3v4h3v3h-5z"})})}),e.jsx("span",{className:"tb-lbl",children:"ID"})]}),e.jsxs("button",{className:`sort-btn ${ge==="name"?"active":""}`,onClick:()=>{jt("name"),localStorage.setItem("matrix_sort_by","name")},title:d("settings.sort_name"),children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M4 7h16M4 12h16M4 17h10"})})}),e.jsx("span",{className:"tb-lbl",children:d("settings.sort_name")})]}),e.jsxs("button",{className:`sort-btn ${ge==="load"?"active":""}`,onClick:()=>{jt("load"),localStorage.setItem("matrix_sort_by","load")},title:d("settings.sort_load"),children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),e.jsx("polyline",{points:"15 7 21 7 21 13"})]})}),e.jsx("span",{className:"tb-lbl",children:d("settings.sort_load")})]})]}),e.jsxs("div",{className:"sort-selector",children:[e.jsxs("span",{className:"sort-label",children:[e.jsx("span",{className:"label-icon","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),d("matrix.group_by"),":"]}),e.jsxs("button",{className:`sort-btn ${Ke==="none"?"active":""}`,onClick:()=>{Nt("none"),localStorage.setItem("matrix_group_by","none")},title:d("matrix.group_none"),children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),e.jsx("span",{className:"tb-lbl",children:d("matrix.group_none")})]}),e.jsxs("button",{className:`sort-btn ${Ke==="node"?"active":""}`,onClick:()=>{Nt("node"),localStorage.setItem("matrix_group_by","node")},title:d("matrix.group_node"),children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),e.jsx("rect",{x:"2",y:"15",width:"20",height:"6",rx:"1"}),e.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),e.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}),e.jsx("span",{className:"tb-lbl",children:d("matrix.group_node")})]}),e.jsxs("button",{className:`sort-btn ${Ke==="type"?"active":""}`,onClick:()=>{Nt("type"),localStorage.setItem("matrix_group_by","type")},title:d("matrix.group_type"),children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"8",height:"8",rx:"1"}),e.jsx("rect",{x:"13",y:"3",width:"8",height:"8",rx:"1"}),e.jsx("rect",{x:"3",y:"13",width:"8",height:"8",rx:"4"}),e.jsx("rect",{x:"13",y:"13",width:"8",height:"8",rx:"4"})]})}),e.jsx("span",{className:"tb-lbl",children:d("matrix.group_type")})]}),e.jsxs("button",{className:`sort-btn ${Ke==="tag"?"active":""}`,onClick:()=>{Nt("tag"),localStorage.setItem("matrix_group_by","tag")},title:d("matrix.group_tag"),children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),e.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]})}),e.jsx("span",{className:"tb-lbl",children:d("matrix.group_tag")})]})]}),e.jsxs("div",{className:"view-toggle",children:[e.jsxs("button",{className:`view-btn ${K==="grid"?"active":""}`,onClick:()=>Qe("grid"),title:p==="zh-TW"?"方格檢視":"Grid view",children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]}),e.jsx("span",{className:"view-btn-lbl",children:p==="zh-TW"?"方格":"Grid"})]}),e.jsxs("button",{className:`view-btn ${K==="table"?"active":""}`,onClick:()=>Qe("table"),title:p==="zh-TW"?"表格檢視":"Table view",children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})}),e.jsx("span",{className:"view-btn-lbl",children:p==="zh-TW"?"表格":"Table"})]}),e.jsxs("button",{className:`view-btn ${K==="thumb"?"active":""}`,onClick:()=>Qe("thumb"),title:p==="zh-TW"?"縮圖檢視":"Thumbnail view",children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),e.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),e.jsx("path",{d:"M21 15l-5-5L5 21"})]}),e.jsx("span",{className:"view-btn-lbl",children:p==="zh-TW"?"縮圖":"Thumbs"})]}),e.jsxs("button",{className:`view-btn ${K==="heatmap"?"active":""}`,onClick:()=>Qe("heatmap"),title:p==="zh-TW"?"熱度檢視":"Heatmap view",children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"4",width:"3",height:"3"}),e.jsx("rect",{x:"8",y:"4",width:"3",height:"3"}),e.jsx("rect",{x:"13",y:"4",width:"3",height:"3"}),e.jsx("rect",{x:"18",y:"4",width:"3",height:"3"}),e.jsx("rect",{x:"3",y:"10.5",width:"3",height:"3"}),e.jsx("rect",{x:"8",y:"10.5",width:"3",height:"3"}),e.jsx("rect",{x:"13",y:"10.5",width:"3",height:"3"}),e.jsx("rect",{x:"18",y:"10.5",width:"3",height:"3"}),e.jsx("rect",{x:"3",y:"17",width:"3",height:"3"}),e.jsx("rect",{x:"8",y:"17",width:"3",height:"3"}),e.jsx("rect",{x:"13",y:"17",width:"3",height:"3"}),e.jsx("rect",{x:"18",y:"17",width:"3",height:"3"})]}),e.jsx("span",{className:"view-btn-lbl",children:p==="zh-TW"?"熱度":"Heat"})]})]}),K==="table"&&e.jsxs("div",{className:"col-picker-wrap",children:[e.jsxs("button",{className:`view-btn ${A?"active":""}`,onClick:()=>Y(t=>!t),title:d("table.columns"),children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),e.jsx("path",{d:"M9 3v18M15 3v18"})]}),e.jsx("span",{className:"view-btn-lbl",children:d("table.columns")})]}),A&&e.jsxs("div",{className:"col-picker",children:[Mr.map(t=>e.jsxs("label",{className:"col-picker-row",children:[e.jsx("input",{type:"checkbox",checked:ae.has(t.key),onChange:()=>S(t.key)}),e.jsx("span",{children:t.labelKey==="VMID"?"VMID":d(t.labelKey)})]},t.key)),e.jsx("button",{className:"col-picker-reset",onClick:J,children:d("table.columns_reset")})]})]}),K==="grid"&&e.jsxs("div",{className:"grid-width-ctl",children:[e.jsx("span",{className:"gw-icon","aria-hidden":!0,children:e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"15 3 21 3 21 9"}),e.jsx("polyline",{points:"9 21 3 21 3 15"}),e.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),e.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),e.jsx("input",{type:"range",min:60,max:200,step:5,value:kt,onChange:t=>{const i=parseInt(t.target.value,10);ia(i),localStorage.setItem("matrix_card_width",String(i))},className:"thumb-size-slider gw-slider",title:`${p==="zh-TW"?"方格寬度":"Cell width"}: ${kt}px`}),e.jsx("span",{className:"gw-val",children:kt})]})]})]}),K==="thumb"&&e.jsxs("div",{className:"thumb-size-row",children:[e.jsxs("div",{className:"thumb-size",children:[e.jsxs("span",{className:"thumb-size-label",children:[e.jsx("span",{className:"label-icon","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"15 3 21 3 21 9"}),e.jsx("polyline",{points:"9 21 3 21 3 15"}),e.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),e.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),p==="zh-TW"?"尺寸":"Size"]}),e.jsx("input",{type:"range",min:160,max:640,step:20,value:_e,onChange:t=>c(parseInt(t.target.value,10)),className:"thumb-size-slider"}),e.jsxs("span",{className:"thumb-size-val",children:[_e,"px"]}),e.jsx("span",{className:"thumb-build-stamp",title:"build 2026-09-28T04:08:32.256Z",children:(()=>{try{return`b${new Date("2026-09-28T04:08:32.256Z").toISOString().slice(11,16).replace(":","")}`}catch{return"b—"}})()})]}),e.jsxs("div",{className:"thumb-type-filter",role:"group",children:[e.jsxs("button",{className:`thumb-type-btn ${H==="all"?"active":""}`,onClick:()=>le("all"),title:p==="zh-TW"?"顯示 VM + CT":"Show VMs and CTs",children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),e.jsx("span",{className:"tb-lbl",children:p==="zh-TW"?"全部":"ALL"})]}),e.jsxs("button",{className:`thumb-type-btn ${H==="qemu"?"active":""}`,onClick:()=>le("qemu"),title:p==="zh-TW"?"只顯示 VM (QEMU)":"Show VMs (QEMU) only",children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),e.jsx("line",{x1:"8",y1:"20",x2:"16",y2:"20"}),e.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"20"})]})}),e.jsx("span",{className:"tb-lbl",children:"VM"})]}),e.jsxs("button",{className:`thumb-type-btn ${H==="lxc"?"active":""}`,onClick:()=>le("lxc"),title:p==="zh-TW"?"只顯示 CT (LXC)":"Show CTs (LXC) only",children:[e.jsx("span",{className:"tb-ico","aria-hidden":!0,children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),e.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),e.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})}),e.jsx("span",{className:"tb-lbl",children:"CT"})]})]}),e.jsxs("button",{className:`thumb-prefer-btn ${it?"active":""}`,onClick:()=>te(t=>!t),title:p==="zh-TW"?"優先顯示有畫面/有文字的縮圖；全黑 VM 與空白 CT 排到最後":"Prefer thumbnails with content; blank VMs and empty CTs go to the end",children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),e.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]}),p==="zh-TW"?"優先有內容":"Prefer content"]})]}),e.jsxs("div",{className:"matrix-content",children:[K==="grid"?e.jsxs("div",{className:"matrix-grid",ref:At,children:[Ct.length>0&&e.jsxs("svg",{className:"migration-lines-overlay",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),e.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),e.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),e.jsxs("filter",{id:"migrationGlow",children:[e.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"coloredBlur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),Ct.map((t,i)=>e.jsxs("g",{children:[e.jsx("line",{className:"migration-line",x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),e.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:e.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${t.x1},${t.y1} L${t.x2},${t.y2}`})}),e.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:e.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${t.x1},${t.y1} L${t.x2},${t.y2}`})}),e.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:e.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${t.x1},${t.y1} L${t.x2},${t.y2}`})})]},`line-${t.vmid}-${i}`))]}),da.length>0&&e.jsxs("svg",{className:"migration-lines-overlay completing",children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[e.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),e.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),e.jsxs("filter",{id:"completingGlow",children:[e.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),e.jsxs("feMerge",{children:[e.jsx("feMergeNode",{in:"coloredBlur"}),e.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),da.map((t,i)=>e.jsxs("g",{children:[e.jsx("line",{className:"completing-line",x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-t.progress)+1,filter:"url(#completingGlow)",opacity:1-t.progress*.5}),t.progress>.8&&e.jsx("circle",{cx:t.x2,cy:t.y2,r:20*(t.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(t.progress-.8)*5})]},`completing-${t.vmid}-${i}`))]}),(()=>{const t=new Map;Object.entries(va).forEach(([n,h])=>{t.set(n,h)}),tt.forEach(n=>{t.has(n.targetGroupKey)||t.set(n.targetGroupKey,{vms:[],clusterId:n.clusterId})});const i=new Set;t.forEach(n=>{n.vms.forEach(h=>{i.add(`${h.cluster_id}/${h.node}/${h.vmid}`)})});const s=Array.from(t.entries()).sort((n,h)=>{const[f]=n,[x]=h,g=U=>{if(U.includes(" / ")){const[se,G]=U.split(" / ");return{cluster:se,node:G}}return{cluster:"",node:U}},N=g(f),z=g(x);let E=0;return Pt==="cluster"?(E=N.cluster.localeCompare(z.cluster),E===0&&(E=N.node.localeCompare(z.node))):(E=N.node.localeCompare(z.node),E===0&&(E=N.cluster.localeCompare(z.cluster))),gt==="desc"?-E:E});let a=0;return s.map(([n,h])=>{const f=tt.filter(x=>x.targetGroupKey===n);return e.jsxs("div",{className:`node-section ${h.vms.length===0&&f.length>0?"ghost-only":""}`,children:[e.jsxs("div",{className:"node-section-header",children:[e.jsx("span",{className:"node-section-name",children:n}),e.jsxs("span",{className:"node-section-count",children:[h.vms.length,f.length>0&&e.jsxs("span",{className:"incoming-count",children:[" +",f.length]})]})]}),e.jsxs("div",{className:`vm-grid ${ge==="load"&&!Lt?"sort-by-load":""} ${Lt?"initial-load":""}`,children:[ha&&h.vms.map(x=>{const g=`${x.cluster_id}/${x.node}/${x.vmid}`,N=Tt(x.vmid,x.node,x.cluster_id,r,l),z=`${x.cluster_id}:${x.vmid}`,E=He.get(z);if(E&&E.sourceNode===x.node&&i.has(`${x.cluster_id}/${E.targetNode}/${x.vmid}`)||tt.find(G=>G.targetClusterId===x.cluster_id&&G.vm.vmid===x.vmid&&G.clusterId!==G.targetClusterId))return null;const se=a++;return e.jsx(Ia,{ref:G=>{G?Ye.current.set(g,G):Ye.current.delete(g)},vm:x,isSelected:b===g,onClick:()=>u(b===g?null:g),onContextMenu:G=>Ut(G,x,h.clusterId),animationDelay:Lt?se*50:0,task:N,isCompleting:!!E},g)}).filter(Boolean),ha&&f.map(x=>{var z;const g=`ghost-${x.vm.cluster_id}-${x.vm.vmid}`,N=(z=Be.find(E=>E.vm.vmid===x.vm.vmid&&E.clusterId===x.vm.cluster_id))==null?void 0:z.task;return e.jsx(Ia,{ref:E=>{E?Ye.current.set(g,E):Ye.current.delete(g)},vm:x.vm,isSelected:!1,onClick:()=>{},onContextMenu:E=>E.preventDefault(),animationDelay:0,task:N,isGhost:!0},g)})]},`grid-${de}-${he}-${ge}-${Wa}`)]},n)})})(),Object.keys(va).length===0&&tt.length===0&&e.jsx("div",{className:"no-vms",children:e.jsx("span",{children:d("error.no_data")})})]}):K==="thumb"?e.jsxs("div",{ref:De,className:"matrix-thumb-grid",children:[e.jsx("svg",{"aria-hidden":!0,style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:e.jsx("defs",{children:e.jsxs("filter",{id:"jt-noise",x:"0",y:"0",width:"100%",height:"100%",children:[e.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.9",numOctaves:"2",stitchTiles:"stitch",children:e.jsx("animate",{attributeName:"seed",values:"1;7;3;9;5;11",dur:"0.4s",repeatCount:"indefinite"})}),e.jsx("feColorMatrix",{values:`
                    0.10 0.10 0.10 0  0
                    0.45 0.55 0.55 0  0
                    0.65 0.85 0.95 0  0
                    0    0    0    1.6 -0.4`})]})})}),et.length===0?e.jsx("div",{className:"no-vms",children:e.jsx("span",{children:d("error.no_data")})}):Ga.map(([t,i])=>{const s=it?[...i].sort((a,n)=>{var N,z;const h=`${a.clusterId||(r==null?void 0:r.id)||""}/${a.node}/${a.vmid}`,f=`${n.clusterId||(r==null?void 0:r.id)||""}/${n.node}/${n.vmid}`,x=(N=Ne[h])!=null&&N.isBlank?1:0,g=(z=Ne[f])!=null&&z.isBlank?1:0;return x-g}):i;return e.jsxs("div",{className:"thumb-group",children:[Ke!=="none"&&e.jsxs("div",{className:"thumb-group-header",children:[e.jsx("span",{className:"thumb-group-bracket left","aria-hidden":!0}),e.jsx("span",{className:"thumb-group-name",children:t}),e.jsx("span",{className:"thumb-group-count",children:s.length}),e.jsx("span",{className:"thumb-group-rule","aria-hidden":!0}),e.jsx("span",{className:"thumb-group-bracket right","aria-hidden":!0})]}),e.jsx("div",{className:"thumb-group-cards",children:s.map(a=>{var E;const n=a.type==="lxc",h=a.status==="running",f=((E=a.cpu)==null?void 0:E.usage_percent)??0,x=a.memory&&a.memory.total_bytes>0?a.memory.used_bytes/a.memory.total_bytes*100:0,g=a.clusterId||(r==null?void 0:r.id)||"",N=`${g}/${a.node}/${a.vmid}`,z=Ne[N];return e.jsxs("div",{"data-card-key":N,className:`vm-thumb-card status-${a.status}${z!=null&&z.isBlank?" is-blank":""}`,style:{width:`${ya}px`,flex:"0 0 auto"},onClick:()=>j({vm:a,clusterId:g}),onContextMenu:U=>Ut(U,a,g),children:[e.jsxs("div",{className:"vm-thumb-image",style:{height:`${Ha}px`},children:[e.jsxs("div",{className:"vm-thumb-loading","aria-hidden":!0,children:[e.jsxs("svg",{className:"vtl-fill",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{width:"100%",height:"100%",fill:"#02050b"}),e.jsx("rect",{width:"100%",height:"100%",filter:"url(#jt-noise)"})]}),e.jsx("div",{className:"vtl-scanlines"}),e.jsx("div",{className:"vtl-vignette"}),e.jsx("span",{className:"vtl-text",children:p==="zh-TW"?"訊號接收中":"NO SIGNAL"})]}),z&&e.jsx("img",{src:z.url,alt:`VM ${a.vmid} screenshot`,loading:"lazy",onLoad:U=>{U.currentTarget.parentElement.dataset.loaded="1"},onError:U=>{U.currentTarget.parentElement.dataset.error="1"}})]}),e.jsxs("div",{className:"vm-thumb-meta",children:[e.jsxs("div",{className:"vm-thumb-title",children:[e.jsx("span",{className:`type-badge ${a.type}`,children:n?"CT":"VM"}),e.jsxs("code",{className:"vm-thumb-id",children:["#",a.vmid]}),e.jsx("span",{className:"vm-thumb-name",children:a.name})]}),h&&e.jsxs("div",{className:"vm-thumb-bars",children:[e.jsxs("div",{className:"vm-thumb-bar",children:[e.jsx("span",{className:"vm-thumb-bar-label",children:"CPU"}),e.jsx("div",{className:"mini-bar",children:e.jsx("div",{className:`mini-bar-fill ${ze(f)}`,style:{width:`${Math.min(f,100)}%`}})}),e.jsx("span",{className:`vm-thumb-bar-val text-${ze(f)}`,children:ct(f,1)})]}),e.jsxs("div",{className:"vm-thumb-bar",children:[e.jsx("span",{className:"vm-thumb-bar-label",children:"MEM"}),e.jsx("div",{className:"mini-bar",children:e.jsx("div",{className:`mini-bar-fill ${ze(x)}`,style:{width:`${Math.min(x,100)}%`}})}),e.jsx("span",{className:`vm-thumb-bar-val text-${ze(x)}`,children:ct(x,0)})]})]})]})]},N)})})]},t)})]}):K==="heatmap"?e.jsx(Rr,{vms:ke,history:bt.current,times:Ft.current,tick:Fa,language:p}):e.jsxs("div",{className:"matrix-table-container",children:[e.jsx(Er,{vms:ke,onSelectByTag:t=>{const i=new Set(re);for(const s of ke){const a=s.tags;(Array.isArray(a)?a.flatMap(h=>String(h).split(/[;,\s]+/)):typeof a=="string"?a.split(/[;,\s]+/):[]).filter(Boolean).includes(t)&&i.add(`${s.cluster_id}/${s.node}/${s.vmid}`)}st(i)}}),re.size>0&&e.jsxs("div",{className:"bulk-toolbar",children:[e.jsx("span",{className:"bulk-count",children:p==="zh-TW"?`已選 ${re.size}`:`${re.size} selected`}),e.jsxs("button",{className:"bulk-btn",disabled:je,onClick:async()=>{await v.confirm(p==="zh-TW"?`對選取的 ${re.size} 台 VM/CT 執行開機？`:`Start ${re.size} selected VM/CTs?`,{title:p==="zh-TW"?"批次開機":"Bulk start"})&&await ot("start")},children:[e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("polygon",{points:"6,4 20,12 6,20"})}),e.jsx("span",{children:d("vm.start")})]}),e.jsxs("button",{className:"bulk-btn",disabled:je,onClick:async()=>{await v.confirm(p==="zh-TW"?`對選取的 ${re.size} 台 VM/CT 執行關機（ACPI）？`:`Shutdown (ACPI) ${re.size} selected VM/CTs?`,{title:p==="zh-TW"?"批次關機":"Bulk shutdown",destructive:!0})&&await ot("shutdown")},children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),e.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),e.jsx("span",{children:d("vm.shutdown_acpi")})]}),e.jsxs("button",{className:"bulk-btn",disabled:je,onClick:async()=>{await v.confirm(p==="zh-TW"?`對選取的 ${re.size} 台 VM/CT 重新啟動？`:`Reboot ${re.size} selected VM/CTs?`,{title:p==="zh-TW"?"批次重啟":"Bulk reboot",destructive:!0})&&await ot("reboot")},children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23,4 23,10 17,10"}),e.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),e.jsx("span",{children:d("vm.reboot")})]}),e.jsxs("button",{className:"bulk-btn danger",disabled:je,onClick:async()=>{await v.confirm(p==="zh-TW"?`強制停止 ${re.size} 台 VM/CT？此動作不會通知 guest OS。`:`Hard-stop ${re.size} selected VM/CTs? Guest OS will not be notified.`,{title:p==="zh-TW"?"批次強制停止":"Bulk hard stop",destructive:!0})&&await ot("stop")},children:[e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),e.jsx("span",{children:d("vm.stop_hard")})]}),e.jsx("span",{className:"bulk-sep"}),e.jsxs("button",{className:"bulk-btn ghost",disabled:je,onClick:async()=>{const t=new Set;for(const x of ke){const g=l==null?void 0:l[x.cluster_id];if(g)for(const N of Object.keys(g.nodes))t.add(N)}const i=ke.filter(x=>re.has(`${x.cluster_id}/${x.node}/${x.vmid}`)),s=new Set(i.map(x=>x.node)),a=[...t].filter(x=>!s.has(x)||s.size>1).sort();if(a.length===0){await v.alert("No other node available for migration.");return}const n=await v.prompt(p==="zh-TW"?`將 ${re.size} 台 VM/CT 遷移到下列節點之一（輸入節點名稱）：
${a.join(", ")}`:`Migrate ${re.size} VM/CT(s) to which node?
Available: ${a.join(", ")}`,{title:p==="zh-TW"?"批次遷移":"Bulk migrate",defaultValue:a[0]});if(n===null)return;if(!a.includes(n.trim())){await v.alert(`Unknown target node: ${n}`);return}Fe(!0);let h=0,f=0;for(const x of i)try{const g=x.type==="lxc"?`/api/clusters/${encodeURIComponent(x.cluster_id)}/cts/${x.vmid}/migrate`:`/api/clusters/${encodeURIComponent(x.cluster_id)}/vms/${x.vmid}/migrate`,N=x.type==="lxc"?{target:n.trim(),online:!0}:{target_node:n.trim(),online:!0};(await fetch(g,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(N)})).ok?h++:f++}catch{f++}Fe(!1),await v.alert(`Bulk migrate to ${n}: ${h} ok, ${f} failed.`)},title:p==="zh-TW"?"批次遷移":"Bulk migrate",children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"17 1 21 5 17 9"}),e.jsx("path",{d:"M3 11V9a4 4 0 0 1 4-4h14"}),e.jsx("polyline",{points:"7 23 3 19 7 15"}),e.jsx("path",{d:"M21 13v2a4 4 0 0 1-4 4H3"})]}),e.jsx("span",{children:p==="zh-TW"?"批次遷移":"Bulk migrate"})]}),e.jsxs("button",{className:"bulk-btn ghost",disabled:je,onClick:async()=>{const t=ke.filter(n=>re.has(`${n.cluster_id}/${n.node}/${n.vmid}`)),i=await v.prompt(p==="zh-TW"?`為 ${t.length} 台 VM/CT 建立快照。輸入快照名稱（英數 / -_ 開頭）：`:`Take snapshot on ${t.length} VM/CT(s). Snapshot name (alnum / -_ start):`,{title:p==="zh-TW"?"批次快照":"Bulk snapshot",defaultValue:`bulk-${new Date().toISOString().slice(0,10)}`});if(i===null)return;if(!/^[A-Za-z][A-Za-z0-9_\-]{0,39}$/.test(i.trim())){await v.alert("Bad snapshot name");return}Fe(!0);let s=0,a=0;for(const n of t)try{(await fetch(`/api/clusters/${encodeURIComponent(n.cluster_id)}/vms/${n.vmid}/snapshots`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({snapname:i.trim()})})).ok?s++:a++}catch{a++}Fe(!1),await v.alert(`Bulk snapshot "${i}": ${s} ok, ${a} failed.`)},title:p==="zh-TW"?"批次快照":"Bulk snapshot",children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{d:"M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"})]}),e.jsx("span",{children:p==="zh-TW"?"批次快照":"Bulk snapshot"})]}),e.jsxs("button",{className:"bulk-btn ghost",disabled:je,onClick:()=>$e(!0),title:d("bulk.tag_action"),children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),e.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]}),e.jsx("span",{children:d("bulk.tag_action")})]}),e.jsx("button",{className:"bulk-btn ghost",onClick:nt,disabled:je,children:p==="zh-TW"?"取消選取":"Clear"})]}),e.jsxs("table",{className:"vm-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"select-col",children:e.jsx("input",{type:"checkbox",className:"bulk-check",checked:re.size>0&&ke.every(t=>re.has(`${t.cluster_id}/${t.node}/${t.vmid}`)),ref:t=>{if(!t)return;const i=ke.some(a=>re.has(`${a.cluster_id}/${a.node}/${a.vmid}`)),s=ke.length>0&&ke.every(a=>re.has(`${a.cluster_id}/${a.node}/${a.vmid}`));t.indeterminate=i&&!s},onChange:t=>{t.target.checked?st(new Set(ke.map(i=>`${i.cluster_id}/${i.node}/${i.vmid}`))):nt()},title:d("matrix.bulk.select_all")})}),w("status")&&e.jsxs("th",{className:`sortable ${X==="status"?"sorted":""}`,onClick:()=>Ee("status"),children:[e.jsx("span",{children:d("node.status")}),X==="status"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("vmid")&&e.jsxs("th",{className:`sortable ${X==="vmid"?"sorted":""}`,onClick:()=>Ee("vmid"),children:[e.jsx("span",{children:"VMID"}),X==="vmid"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("type")&&e.jsxs("th",{className:`sortable ${X==="type"?"sorted":""}`,onClick:()=>Ee("type"),children:[e.jsx("span",{children:d("table.type")}),X==="type"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("name")&&e.jsxs("th",{className:`sortable ${X==="name"?"sorted":""}`,onClick:()=>Ee("name"),children:[e.jsx("span",{children:d("table.name")}),X==="name"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("tags")&&e.jsx("th",{className:"tags-header",children:d("table.tags")}),w("cluster")&&e.jsx("th",{children:d("table.cluster")}),w("node")&&e.jsxs("th",{className:`sortable ${X==="node"?"sorted":""}`,onClick:()=>Ee("node"),children:[e.jsx("span",{children:d("table.node")}),X==="node"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("cpu")&&e.jsxs("th",{className:`sortable ${X==="cpu"?"sorted":""}`,onClick:()=>Ee("cpu"),children:[e.jsx("span",{children:d("metric.cpu")}),X==="cpu"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("cores")&&e.jsx("th",{className:"num-header",children:d("table.cores")}),w("memory")&&e.jsxs("th",{className:`sortable ${X==="memory"?"sorted":""}`,onClick:()=>Ee("memory"),children:[e.jsx("span",{children:d("metric.memory")}),X==="memory"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("maxmem")&&e.jsx("th",{className:"num-header",children:d("table.maxmem")}),w("disk")&&e.jsx("th",{children:d("table.disk_usage")}),w("maxdisk")&&e.jsx("th",{className:"num-header",children:d("table.maxdisk")}),w("diskio")&&e.jsx("th",{className:"net-header",children:d("table.diskio")}),w("rx")&&e.jsxs("th",{className:`sortable net-header ${X==="rx"?"sorted":""}`,onClick:()=>Ee("rx"),children:[e.jsxs("span",{children:["↓ ",d("metric.rx")]}),X==="rx"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("tx")&&e.jsxs("th",{className:`sortable net-header ${X==="tx"?"sorted":""}`,onClick:()=>Ee("tx"),children:[e.jsxs("span",{children:["↑ ",d("metric.tx")]}),X==="tx"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("uptime")&&e.jsxs("th",{className:`sortable ${X==="uptime"?"sorted":""}`,onClick:()=>Ee("uptime"),children:[e.jsx("span",{children:d("table.uptime")}),X==="uptime"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]}),w("task")&&e.jsxs("th",{className:`sortable task-header ${X==="task"?"sorted":""}`,onClick:()=>Ee("task"),children:[e.jsx("span",{children:d("table.task")}),X==="task"&&e.jsx("span",{className:"sort-indicator",children:be==="asc"?"▲":"▼"})]})]})}),e.jsx("tbody",{children:ke.map(t=>{var x;const i=`${t.cluster_id}/${t.node}/${t.vmid}`,s=t.status==="running",a=t.cpu.usage_percent,n=t.memory.used_bytes/t.memory.total_bytes*100,h=Tt(t.vmid,t.node,t.cluster_id,r,l),f=re.has(i);return e.jsxs("tr",{className:`${b===i?"selected":""} ${f?"multi-selected":""} ${t.status} ${Ra?"sort-animating":""}`,onClick:()=>u(b===i?null:i),onContextMenu:g=>Ut(g,t,t.clusterId),children:[e.jsx("td",{className:"select-col",onClick:g=>g.stopPropagation(),children:e.jsx("input",{type:"checkbox",className:"bulk-check",checked:f,onChange:()=>ut(i)})}),w("status")&&e.jsx("td",{children:e.jsx("span",{className:`status-badge ${Xt(t.status)}`,children:t.status.toUpperCase()})}),w("vmid")&&e.jsx("td",{className:"vmid-cell",children:t.vmid}),w("type")&&e.jsx("td",{className:"type-cell",children:e.jsx("span",{className:`type-badge ${t.type}`,children:t.type==="qemu"?"VM":"CT"})}),w("name")&&e.jsx("td",{className:"name-cell",children:t.name}),w("tags")&&e.jsx("td",{className:"tags-cell",children:(()=>{const g=Zt(t.tags);return g.length>0?e.jsx("div",{className:"vm-tags",children:g.map((N,z)=>e.jsx("span",{className:"vm-tag",children:N},z))}):null})()}),w("cluster")&&e.jsx("td",{className:"node-cell",children:((x=l==null?void 0:l[t.cluster_id])==null?void 0:x.name)||t.cluster_id}),w("node")&&e.jsx("td",{className:"node-cell",children:t.node}),w("cpu")&&e.jsx("td",{children:s?e.jsxs("div",{className:"cpu-cell",children:[e.jsx("div",{className:"mini-bar",children:e.jsx("div",{className:`mini-bar-fill ${ze(a)}`,style:{width:`${a}%`}})}),e.jsx("span",{className:`text-${ze(a)}`,children:ct(a,1)})]}):e.jsx("span",{className:"text-muted",children:"—"})}),w("cores")&&e.jsx("td",{className:"num-cell",children:t.cpu.cores||"—"}),w("memory")&&e.jsx("td",{children:s?e.jsxs("div",{className:"mem-cell",children:[e.jsx("div",{className:"mini-bar",children:e.jsx("div",{className:`mini-bar-fill ${ze(n)}`,style:{width:`${n}%`}})}),e.jsx("span",{children:ct(n,1)})]}):e.jsx("span",{className:"text-muted",children:"—"})}),w("maxmem")&&e.jsx("td",{className:"num-cell",children:t.memory.total_bytes?Oe(t.memory.total_bytes):"—"}),w("disk")&&e.jsx("td",{children:t.disk.total_bytes>0&&t.disk.used_bytes>0?e.jsxs("div",{className:"mem-cell",children:[e.jsx("div",{className:"mini-bar",children:e.jsx("div",{className:`mini-bar-fill ${ze(t.disk.used_bytes/t.disk.total_bytes*100)}`,style:{width:`${t.disk.used_bytes/t.disk.total_bytes*100}%`}})}),e.jsx("span",{children:ct(t.disk.used_bytes/t.disk.total_bytes*100,1)})]}):e.jsx("span",{className:"text-muted",children:"—"})}),w("maxdisk")&&e.jsx("td",{className:"num-cell",children:t.disk.total_bytes?Oe(t.disk.total_bytes):"—"}),w("diskio")&&e.jsx("td",{className:"net-rx-cell",children:s?e.jsxs("span",{className:"net-rx",children:["R ",Oe(t.disk.read_bytes_sec),"/s · W ",Oe(t.disk.write_bytes_sec),"/s"]}):e.jsx("span",{className:"text-muted",children:"—"})}),w("rx")&&e.jsx("td",{className:"net-rx-cell",children:s?e.jsxs("span",{className:"net-rx",children:[Oe(t.network.rx_bytes_sec),"/s"]}):e.jsx("span",{className:"text-muted",children:"—"})}),w("tx")&&e.jsx("td",{className:"net-tx-cell",children:s?e.jsxs("span",{className:"net-tx",children:[Oe(t.network.tx_bytes_sec),"/s"]}):e.jsx("span",{className:"text-muted",children:"—"})}),w("uptime")&&e.jsx("td",{children:s?e.jsx("span",{className:"uptime-cell",children:Ea(t.uptime)}):e.jsx("span",{className:"text-muted",children:"—"})}),w("task")&&e.jsx("td",{className:"task-cell",children:h&&e.jsx(or,{task:h})})]},i)})})]}),ke.length===0&&e.jsx("div",{className:"no-vms",children:e.jsx("span",{children:d("error.no_data")})})]}),_t&&e.jsx(Tr,{vm:_t,onClose:()=>u(null)},`${_t.node}/${_t.vmid}`)]}),y&&e.jsx("div",{className:"thumb-preview-overlay",onClick:()=>j(null),children:e.jsxs("div",{className:"thumb-preview-frame",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"thumb-preview-titlebar",children:[e.jsxs("span",{className:"thumb-preview-name",children:[e.jsx("span",{className:`type-badge ${y.vm.type}`,children:y.vm.type==="lxc"?"CT":"VM"}),e.jsxs("code",{className:"thumb-preview-id",children:["#",y.vm.vmid]}),e.jsx("span",{children:y.vm.name}),e.jsx("span",{className:"thumb-preview-node",children:y.vm.node})]}),e.jsx("button",{className:"thumb-preview-close",onClick:()=>j(null),children:"×"})]}),e.jsxs("div",{className:"thumb-preview-body",children:[e.jsxs("div",{className:"thumb-preview-loader","aria-hidden":!0,children:[e.jsx("div",{className:"tpl-grid"}),e.jsx("div",{className:"tpl-scan"}),e.jsx("div",{className:"tpl-ring"}),e.jsx("div",{className:"tpl-corner tl"}),e.jsx("div",{className:"tpl-corner tr"}),e.jsx("div",{className:"tpl-corner bl"}),e.jsx("div",{className:"tpl-corner br"}),e.jsxs("div",{className:"tpl-status",children:[e.jsxs("span",{className:"tpl-dots",children:[e.jsx("i",{}),e.jsx("i",{}),e.jsx("i",{})]}),e.jsx("span",{className:"tpl-text",children:p==="zh-TW"?"取得高解析畫面":"FETCHING FRAMEBUFFER"})]})]}),e.jsx("img",{src:`/api/console/screenshot/${encodeURIComponent(y.clusterId)}/${encodeURIComponent(y.vm.node)}/${y.vm.vmid}?max=1600&t=${I}`,alt:`VM ${y.vm.vmid} full screenshot`,onLoad:t=>{t.currentTarget.parentElement.dataset.loaded="1"},onError:t=>{t.currentTarget.parentElement.dataset.error="1"}})]})]})}),e.jsx(Ja,{state:R,onClose:Da,onShowDetails:()=>{R.vm&&u(`${R.vm.node}/${R.vm.vmid}`)},onPowerAction:wt,onOpenConsole:async()=>{if(!R.vm)return;const t=R.vm,i=R.clusterId;if(Se==="disabled"){await v.alert(d("console.disabled"));return}if(Se==="prompt"){mt({vm:t,clusterId:i});return}const s=ie();try{const a=await Ue.consolePrepare({cluster_id:i,node:t.node,vmid:t.vmid});Ze(i,t,a.console_token,a.vnc_password,"auto",s)}catch(a){s&&!s.closed&&s.close();const n=a instanceof Error?a.message:String(a);await v.alert(d("console.prepare_failed",{err:n}))}},onRemoteMigrate:()=>{R.vm&&O({vm:R.vm,clusterId:R.clusterId})},onOpenSnapshots:()=>{R.vm&&F({vm:R.vm,clusterId:R.clusterId})},onBackupNow:()=>{R.vm&&T({vm:R.vm,clusterId:R.clusterId})},onShowPerf:()=>{R.vm&&Q({vm:R.vm,clusterId:R.clusterId})},onShowBackupHistory:()=>{R.vm&&V({vm:R.vm,clusterId:R.clusterId})},onShowConfig:()=>{R.vm&&D({vm:R.vm,clusterId:R.clusterId})},onShowFirewall:()=>{R.vm&&qe({vm:R.vm,clusterId:R.clusterId})},onEditTags:()=>{R.vm&&Je({vm:R.vm,clusterId:R.clusterId})},onClone:()=>{R.vm&&ye({vm:R.vm,clusterId:R.clusterId})},onMigrate:()=>{R.vm&&Me({vm:R.vm,clusterId:R.clusterId})},onDelete:()=>{R.vm&&dt({vm:R.vm,clusterId:R.clusterId})},onExportFormat:t=>{R.vm&&W({vm:R.vm,clusterId:R.clusterId,format:t})},onOpenSerialConsole:async()=>{if(!R.vm)return;const t=R.vm,i=R.clusterId;if(Se==="disabled"){await v.alert(d("console.disabled"));return}const s=ie();try{const a=await Ue.consolePrepare({cluster_id:i,node:t.node,vmid:t.vmid,kind:"serial"});Ze(i,t,a.console_token,a.vnc_password,"serial",s)}catch(a){s&&!s.closed&&s.close();const n=a instanceof Error?a.message:String(a);await v.alert(d("console.prepare_failed",{err:n}))}},onConvertTemplate:async()=>{const t=R.vm;if(!(!t||!await v.confirm(d("vm.to_template_confirm_body").replace("{kind}",t.type==="lxc"?"CT":"VM").replace("{vmid}",String(t.vmid)),{title:d("vm.to_template_confirm_title"),destructive:!0})))try{const s=await fetch(`/api/clusters/${encodeURIComponent(R.clusterId)}/vms/${t.vmid}/template`,{method:"POST",credentials:"same-origin"}),a=await s.json().catch(()=>({}));if(!s.ok||!a.ok)throw new Error(a.detail||a.error||`HTTP ${s.status}`);await v.alert(`Template conversion submitted. PVE task: ${a.upid||"(no upid)"}`)}catch(s){await v.alert(`Convert failed: ${s.message||s}`)}},getNodeHealth:Va,userRole:((wa=C.user)==null?void 0:wa.role_global)??null,consoleMode:Se,consolePasswordSet:!!pt[R.clusterId],consoleCaps:La}),e.jsx(lr,{open:m!==null,title:m?Yt(m.action,d):"",destructive:m?zr(m.action):!1,details:m?e.jsxs(e.Fragment,{children:[d(m.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:Yt(m.action,d),vmid:String(m.vm.vmid),name:m.vm.name,node:m.vm.node,cluster:m.clusterId}),m.action==="stop"&&e.jsxs(e.Fragment,{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{style:{color:"#ff8a3c"},children:d("confirm.hard_stop_warning")})]})]}):null,confirmLabel:m?Yt(m.action,d):d("action.cancel"),onConfirm:Z,onCancel:()=>_(null)}),e.jsx(Xa,{open:P!==null,cluster_id:(P==null?void 0:P.clusterId)||"",vm:P?{vmid:P.vm.vmid,name:P.vm.name,node:P.vm.node,type:P.vm.type}:null,onClose:()=>O(null)}),e.jsx(dr,{open:oe!==null,clusterId:(oe==null?void 0:oe.clusterId)||"",vm:(oe==null?void 0:oe.vm)||null,nodes:oe&&l?Object.keys(((ka=l[oe.clusterId])==null?void 0:ka.nodes)||{}):[],onClose:()=>ye(null)}),e.jsx(pr,{open:pe!==null,clusterId:(pe==null?void 0:pe.clusterId)||"",vm:(pe==null?void 0:pe.vm)||null,nodes:pe&&l?Object.keys(((ja=l[pe.clusterId])==null?void 0:ja.nodes)||{}):[],onClose:()=>Me(null)}),e.jsx(mr,{open:me!==null,clusterId:(me==null?void 0:me.clusterId)||"",vm:(me==null?void 0:me.vm)||null,onClose:()=>dt(null)}),e.jsx(Za,{open:B!==null,cluster_id:(B==null?void 0:B.clusterId)||"",vm:B?{vmid:B.vm.vmid,name:B.vm.name,node:B.vm.node,type:B.vm.type}:null,onClose:()=>F(null)}),e.jsx(Qa,{open:L!==null,cluster_id:(L==null?void 0:L.clusterId)||"",vm:L?{vmid:L.vm.vmid,name:L.vm.name,node:L.vm.node,type:L.vm.type}:null,onClose:()=>T(null)}),e.jsx(tr,{open:$!==null,clusterId:($==null?void 0:$.clusterId)||"",node:($==null?void 0:$.vm.node)||"",vmid:($==null?void 0:$.vm.vmid)||0,vmName:($==null?void 0:$.vm.name)||"",format:($==null?void 0:$.format)||"ova",vmStatus:$==null?void 0:$.vm.status,onClose:()=>W(null)}),e.jsx(ar,{open:q!==null,clusterId:(q==null?void 0:q.clusterId)||"",node:(q==null?void 0:q.vm.node)||"",vmid:q==null?void 0:q.vm.vmid,kind:(q==null?void 0:q.vm.type)==="lxc"?"lxc":"qemu",title:q?`${q.vm.type==="lxc"?"CT":"VM"} ${q.vm.vmid} — ${q.vm.name}`:"",onClose:()=>Q(null)}),e.jsx(xr,{open:M!==null,clusterId:(M==null?void 0:M.clusterId)||"",vmid:(M==null?void 0:M.vm.vmid)||0,vmName:(M==null?void 0:M.vm.name)||"",vmType:(M==null?void 0:M.vm.type)==="lxc"?"lxc":"qemu",onClose:()=>V(null)}),e.jsx(Cr,{open:k!==null,clusterId:(k==null?void 0:k.clusterId)||"",node:(k==null?void 0:k.vm.node)||"",vmid:(k==null?void 0:k.vm.vmid)||0,kind:(k==null?void 0:k.vm.type)==="lxc"?"lxc":"qemu",title:k?`${k.vm.type==="lxc"?"CT":"VM"} ${k.vm.vmid} — ${k.vm.name}`:"",canEdit:((Na=C.user)==null?void 0:Na.role_global)==="operator"||((Ca=C.user)==null?void 0:Ca.role_global)==="admin",onClose:()=>D(null)}),e.jsx(rr,{open:we!==null,clusterId:(we==null?void 0:we.clusterId)||"",scope:"vm",vmid:we==null?void 0:we.vm.vmid,title:we?`${we.vm.type==="lxc"?"CT":"VM"} ${we.vm.vmid} — ${we.vm.name}`:"",onClose:()=>qe(null)}),e.jsx(Sr,{open:fe!==null,clusterId:(fe==null?void 0:fe.clusterId)||"",vmid:(fe==null?void 0:fe.vm.vmid)||0,currentTags:(($a=fe==null?void 0:fe.vm)==null?void 0:$a.tags)||"",vmName:(fe==null?void 0:fe.vm.name)||"",clusters:l||(r?{[r.id]:r}:{}),onClose:()=>Je(null)}),Xe&&e.jsx(_r,{open:Xe,onClose:()=>$e(!1),selected:(()=>{const t=[];for(const i of re){const[s,,a]=i.split("/"),n=parseInt(a,10);if(!s||!Number.isFinite(n))continue;const h=et.find(f=>(f.clusterId||(r==null?void 0:r.id))===s&&f.vmid===n);h&&t.push({clusterId:s,vm:h})}return t})(),clusters:l||(r?{[r.id]:r}:{})}),e.jsx(er,{open:Ce!==null,cluster_id:(Ce==null?void 0:Ce.clusterId)||"",pveUser:(()=>{var s;const t=Ce==null?void 0:Ce.clusterId;if(!t)return"root@pam";const i=l&&l[t]||((r==null?void 0:r.id)===t?r:null);return((s=i==null?void 0:i.summary)==null?void 0:s.pve_user)||"root@pam"})(),onCancel:()=>mt(null),onSubmit:async t=>{if(!Ce)return;const{vm:i,clusterId:s}=Ce,a=ie();try{const n=await Ue.consolePrepare({cluster_id:s,node:i.node,vmid:i.vmid,password:t});Ze(s,i,n.console_token,n.vnc_password,"auto",a)}catch(n){a&&!a.closed&&a.close();const h=n instanceof Error?n.message:String(n);await v.alert(d("console.prepare_failed",{err:h}))}mt(null)}}),Ae.length>0&&e.jsx("div",{className:"mig-fail-stack",children:Ae.map(t=>{const i=`qm unlock ${t.vmid}`;return e.jsxs("div",{className:"mig-fail-toast",children:[e.jsxs("div",{className:"mig-fail-head",children:["⚠ ",d("mig.failed.title")]}),e.jsx("div",{className:"mig-fail-body",children:d("mig.failed.body",{vmid:t.vmid,target:t.targetNode||"?",lock:t.lock})}),e.jsx("div",{className:"mig-fail-cmd-line",children:e.jsxs("span",{className:"mig-fail-cmd-hint",children:[d("mig.failed.cmd_hint")," ",e.jsx("code",{children:t.sourceNode})]})}),e.jsxs("div",{className:"mig-fail-cmd-row",children:[e.jsx("code",{className:"mig-fail-cmd",children:i}),e.jsx("button",{className:"mig-fail-btn",onClick:()=>{var s;(s=navigator.clipboard)==null||s.writeText(i).then(()=>{ht(a=>a.map(n=>n.id===t.id?{...n,copied:!0}:n))})},children:t.copied?d("mig.failed.copied"):d("mig.failed.copy")})]}),e.jsx("button",{className:"mig-fail-dismiss",onClick:()=>ht(s=>s.filter(a=>a.id!==t.id)),"aria-label":d("mig.failed.dismiss"),children:"×"})]},t.id)})}),e.jsxs("div",{className:"matrix-legend",children:[e.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),e.jsxs("div",{className:"legend-item",children:[e.jsx("span",{className:"legend-color success"}),e.jsx("span",{className:"legend-label",children:"<80%"})]}),e.jsxs("div",{className:"legend-item",children:[e.jsx("span",{className:"legend-color warning"}),e.jsx("span",{className:"legend-label",children:"80-95%"})]}),e.jsxs("div",{className:"legend-item",children:[e.jsx("span",{className:"legend-color danger"}),e.jsx("span",{className:"legend-label",children:">95%"})]}),e.jsxs("div",{className:"legend-item",children:[e.jsx("span",{className:"legend-color muted"}),e.jsx("span",{className:"legend-label",children:"Stopped"})]}),e.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"}),K==="thumb"&&e.jsxs("span",{className:"legend-thumb-refresh",title:p==="zh-TW"?"縮圖每 30 秒重新抓取一次（CPU / MEM 條跟著叢集 polling 即時更新）":"Thumbnails refresh every 30s (CPU / MEM bars update with cluster polling)",children:[e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M23 4v6h-6"}),e.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),p==="zh-TW"?"縮圖更新：每 30 秒":"Thumb refresh: every 30s"]})]}),e.jsx("style",{children:`
        .holo-matrix {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-xs) var(--spacing-lg);
          display: flex;
          flex-direction: column;
        }

        .holo-matrix.empty {
          align-items: center;
          justify-content: center;
        }

        .empty-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--text-secondary);
          font-family: var(--font-display);
        }

        /* Header */
        .matrix-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-lg);
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .matrix-title-section {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md);
        }

        .matrix-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .matrix-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }

        .matrix-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: matrixIconPulse 2s ease-in-out infinite;
        }

        @keyframes matrixIconPulse {
          0%, 100% { opacity: 0.8; transform: none; }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .matrix-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        .matrix-stats {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .stat-running {
          color: var(--success);
        }

        .stat-divider {
          margin: 0 var(--spacing-xs);
          color: var(--text-muted);
        }

        .matrix-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex-wrap: wrap;
          row-gap: 8px;
        }

        /* Inline grid cell-width slider (lives in the toolbar). */
        .grid-width-ctl {
          display: inline-flex; align-items: center; gap: 8px;
          height: 34px; box-sizing: border-box;
          padding: 0 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .grid-width-ctl .gw-icon svg { color: var(--text-muted); display: block; }
        .grid-width-ctl .gw-slider { width: 110px; }
        .grid-width-ctl .gw-val {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary); min-width: 26px; text-align: right;
        }

        /* All toolbar control GROUPS share one height so the search box,
           filter/sort/group strips and the view-mode toggle line up exactly
           (operator: the middle buttons must be the same height as the grid
           view buttons on the right). box-sizing so borders don't add up. */
        .matrix-controls > .search-box,
        .matrix-controls > .filter-tabs,
        .matrix-controls > .sort-selector,
        .matrix-controls > .view-toggle {
          height: 34px;
          box-sizing: border-box;
        }

        /* Vertical padding matches the filter-tabs strip (2px container
           + 4px button) so the search box sits at the same height as
           its toolbar neighbours. */
        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px var(--spacing-sm);
        }

        .search-box svg {
          color: var(--text-muted);
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          width: 75px;
        }

        .search-box input::placeholder {
          color: var(--text-muted);
        }

        .filter-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .filter-tab {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        /* Toolbar buttons NEVER wrap mid-label (CJK breaks per character
           otherwise). When the toolbar runs short of width the tb-lbl
           text collapses and icons carry the meaning — every button
           keeps its title attr for hover. */
        .filter-tab, .sort-btn, .sort-label, .thumb-type-btn {
          white-space: nowrap;
        }
        @media (max-width: 1560px) {
          .tb-lbl { display: none; }
          .sort-label { display: none; }
        }

        /* Inline icon used inside toolbar buttons (filter-tab / sort-btn /
           thumb-type-btn) and label spans. Inherits currentColor so it
           tints with the parent's hover/active state.
           NOTE: named .tb-ico (not .btn-icon) because App.tsx already
           uses a btn-icon class for icon-only header buttons; reusing
           that name here clobbered them. */
        .tb-ico, .label-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 12px; height: 12px;
          flex: 0 0 12px;
          opacity: 0.8;
          transition: opacity var(--transition-fast), filter var(--transition-fast);
        }
        .filter-tab.active .tb-ico,
        .sort-btn.active .tb-ico,
        .thumb-type-btn.active .tb-ico {
          opacity: 1;
          filter: drop-shadow(0 0 3px currentColor);
        }
        .label-icon {
          opacity: 0.7;
          color: var(--text-muted);
        }

        .filter-tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .filter-tab.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: none;
        }

        /* Disabled state — applied to whole group when the current view
           mode forces a fixed filter (e.g. thumbnail mode = running only). */
        .filter-tabs.is-disabled {
          opacity: 0.4;
          filter: grayscale(0.6);
        }
        .filter-tab:disabled {
          cursor: not-allowed;
          color: var(--text-muted);
          background: transparent;
          text-shadow: none;
        }
        .filter-tab:disabled:hover {
          background: transparent;
          color: var(--text-muted);
        }

        /* Sort Selector */
        .sort-selector {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .sort-label {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          margin-right: 2px;
        }

        .sort-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        .sort-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .sort-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: none;
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          gap: 2px;
          background: var(--bg-tertiary);
          padding: 2px;
          border-radius: var(--radius-sm);
        }

        /* Thumbnail-size slider — sits in its own row below the toolbar
           (see JSX). Anchored to the LEFT so it never pushes existing
           toolbar buttons around when thumb mode is toggled on. */
        .thumb-size-row {
          padding: 6px var(--spacing-md) 0;
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        /* Type filter — segmented buttons (All | VM | CT) sitting between
           the size slider and prefer-content toggle. Same cyberpunk pill
           styling as filter-tabs. */
        .thumb-type-filter {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 2px 4px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
        }
        .thumb-type-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .thumb-type-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .thumb-type-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: none;
        }

        /* "Prefer with content" toggle, sits to the right of the slider. */
        .thumb-prefer-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .thumb-prefer-btn:hover {
          color: var(--text-primary);
          border-color: rgba(0, 240, 255, 0.4);
        }
        .thumb-prefer-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.12);
          border-color: var(--primary);
          text-shadow: none;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.18);
        }
        .thumb-size {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
        }
        .thumb-size-label {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .thumb-size-val {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--primary);
          min-width: 48px;
          text-align: right;
        }
        .thumb-build-stamp {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          opacity: .55;
          margin-left: 6px;
          letter-spacing: 0.04em;
        }
        .thumb-size-slider {
          width: 130px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: var(--bg-primary);
          border-radius: 2px;
          outline: none;
        }
        .thumb-size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px; height: 14px;
          background: var(--primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
        }
        .thumb-size-slider::-moz-range-thumb {
          width: 14px; height: 14px;
          background: var(--primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
          border: none;
        }

        /* Thumbnail grid view. Outer container handles scroll; cards
           are inside .thumb-group-cards which is the actual flex-wrap
           row. Group headers (.thumb-group-header) appear above each
           row when group-by != none. */
        .matrix-thumb-grid {
          flex: 1;
          overflow: auto;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .thumb-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        /* Group header — designed to be unmistakable at a glance.
           Corner brackets + thick gradient bar + uppercase title with
           glow + count chip. Sticky-positioned so the label stays
           visible while the cards under it scroll. */
        .thumb-group-header {
          position: sticky;
          top: 0;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: linear-gradient(90deg,
            rgba(0,240,255,0.18) 0%,
            rgba(0,240,255,0.08) 35%,
            rgba(0,240,255,0.02) 100%);
          border-top: 1px solid rgba(0,240,255,0.45);
          border-bottom: 1px solid rgba(0,240,255,0.45);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        /* Cyber corner brackets — small angled accent at each end of
           the header bar. */
        .thumb-group-bracket {
          position: relative;
          width: 14px;
          height: 16px;
          flex: 0 0 14px;
        }
        .thumb-group-bracket.left::before,
        .thumb-group-bracket.left::after,
        .thumb-group-bracket.right::before,
        .thumb-group-bracket.right::after {
          content: '';
          position: absolute;
          background: var(--primary);
          box-shadow: 0 0 6px rgba(0,240,255,0.7);
        }
        .thumb-group-bracket.left::before  { top: 0; left: 0; width: 8px; height: 2px; }
        .thumb-group-bracket.left::after   { top: 0; left: 0; width: 2px; height: 10px; }
        .thumb-group-bracket.right::before { bottom: 0; right: 0; width: 8px; height: 2px; }
        .thumb-group-bracket.right::after  { bottom: 0; right: 0; width: 2px; height: 10px; }

        .thumb-group-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow:
            0 0 8px rgba(0,240,255,0.7),
            0 0 16px rgba(0,240,255,0.35);
          white-space: nowrap;
        }
        .thumb-group-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          height: 22px;
          padding: 0 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          background: rgba(0,240,255,0.10);
          border: 1px solid rgba(0,240,255,0.5);
          border-radius: 11px;
          box-shadow: inset 0 0 4px rgba(0,240,255,0.2);
        }
        /* The thin double rule that fills the rest of the header — gives
           the title a "label on a separator" feel rather than floating. */
        .thumb-group-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg,
            rgba(0,240,255,0.6) 0%,
            rgba(0,240,255,0.2) 60%,
            transparent 100%);
          box-shadow: 0 2px 0 rgba(0,240,255,0.15);
        }
        .thumb-group-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-content: flex-start;
          justify-content: flex-start;
        }
        /* Visual de-emphasis for blank thumbs when prefer-content is on
           (they're already last in DOM order from the sort). */
        .vm-thumb-card.is-blank {
          opacity: 0.78;
        }
        .vm-thumb-card.is-blank:hover {
          opacity: 1;
        }
        .vm-thumb-card {
          /* Plain block layout. Earlier flex-column attempt interacted
             badly with grid auto-row sizing at larger thumb widths.
             Uses canonical gradient + radius to match the rest of the
             cyberpunk panel cards across the app. */
          position: relative;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: border-color .15s, transform .15s, box-shadow .15s;
        }
        .vm-thumb-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.5;
          pointer-events: none;
          z-index: 2;
        }
        .vm-thumb-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(0, 240, 255, 0.22),
                      0 0 0 1px rgba(0, 240, 255, 0.18);
        }
        .vm-thumb-card.status-stopped { opacity: .65; }
        .vm-thumb-card.status-stopped .vm-thumb-image { background: #02050b; }
        .vm-thumb-image {
          /* Height is set inline by React: style={{height: thumbSize*9/16}}.
             We deliberately don't set any CSS height — that way inline
             style is the single source of truth and there's nothing to
             override. */
          position: relative;
          width: 100%;
          background: #000;
          border-bottom: 1px solid rgba(0, 240, 255, 0.12);
          overflow: hidden;
        }
        .vm-thumb-image > .vm-thumb-loading,
        .vm-thumb-image > img {
          position: absolute;
          inset: 0;
        }
        .vm-thumb-image img {
          width: 100%; height: 100%;
          object-fit: contain;
          background: #000;
          opacity: 0;
          transition: opacity .25s ease;
        }
        .vm-thumb-image[data-loaded="1"] img { opacity: 1; }
        .vm-thumb-image[data-error="1"] img { opacity: 0; }
        .vm-thumb-image[data-loaded="1"] .vm-thumb-loading { display: none; }
        .vm-thumb-image[data-error="1"] .vm-thumb-loading { display: none; }
        /* Per-thumb "no signal" loader. Look-and-feel: a CRT showing
           static — animated noise (SVG feTurbulence), faint horizontal
           scanlines on top, dark vignette around the edges, plus a
           flickering "NO SIGNAL / 訊號接收中" label. Three layers, no
           keyframe-heavy elements per thumb (the noise is a single
           global filter referenced via url()). */
        .vm-thumb-loading {
          position: absolute; inset: 0;
          background: #02050b;
          overflow: hidden;
          z-index: 1;
        }
        .vtl-fill {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          display: block;
        }
        /* Horizontal scanlines on top of the noise — gives the static
           a CRT character instead of generic film grain. */
        .vtl-scanlines {
          position: absolute; inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0)        0px,
            rgba(0, 0, 0, 0)        2px,
            rgba(0, 0, 0, 0.45)     3px,
            rgba(0, 0, 0, 0.45)     4px);
          mix-blend-mode: multiply;
        }
        /* Edge vignette — old monitor / signal-loss look. */
        .vtl-vignette {
          position: absolute; inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(0, 0, 0, 0.55) 100%);
        }
        /* Flicker label centered. The animation jiggles opacity + tiny
           horizontal shift to mimic VHS tracking error. */
        .vtl-text {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          color: rgba(0, 240, 255, 0.95);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-shadow:
            -1px 0 rgba(255, 60, 60, 0.55),
             1px 0 rgba(60, 255, 200, 0.55),
             0 0 8px rgba(0, 240, 255, 0.6);
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(0, 240, 255, 0.4);
          white-space: nowrap;
          animation: vtlFlicker 2.4s steps(1) infinite;
        }
        @keyframes vtlFlicker {
          0%, 12%, 14%, 38%, 42%, 60%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          13% { opacity: 0.4; transform: translate(calc(-50% + 1px), -50%); }
          40% { opacity: 0.2; transform: translate(calc(-50% - 1px), -50%); }
          61% { opacity: 0.6; transform: translate(-50%, calc(-50% + 1px)); }
        }
        .vm-thumb-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.05em;
        }
        .vm-thumb-meta {
          padding: 8px 10px;
          background: #0d1320;
          border-top: 1px solid rgba(0, 240, 255, 0.18);
          /* Min-height so meta is always visible even before bars compute */
          min-height: 56px;
          display: block;
        }
        /* Click-to-zoom preview modal — cyberpunk hologram entrance:
           backdrop fades in, frame scales up with cyan glow, scan-line
           sweeps across once, corner brackets fade in. Same visual
           language as the cluster-selector / lang-menu / context-menu. */
        .thumb-preview-overlay {
          /* Leave room for the app's topbar (~64px) at the top so the
             preview frame never sits behind it, and a small gutter at the
             bottom so its border stays visible. The frame's max-w/max-h
             below are 100% of THIS padded box, never exceeding it. */
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, .82);
          backdrop-filter: blur(6px);
          z-index: 500;
          display: flex; align-items: center; justify-content: center;
          padding: 80px 24px 32px;
          animation: tpFade .2s ease;
        }
        @keyframes tpFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tpHologramIn {
          0%   { opacity: 0; transform: scale(.92); filter: brightness(1.6); }
          60%  { opacity: 1; transform: scale(1.005); filter: brightness(1.15); }
          100% { opacity: 1; transform: none; filter: none; }
        }
        @keyframes tpScanLine {
          0%   { transform: translateY(-110%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes tpEdgePulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(0, 240, 255, .12),
              0 16px 60px rgba(0, 0, 0, .65),
              0 0 80px -20px rgba(0, 240, 255, .55),
              0 0 24px -6px rgba(0, 240, 255, .35);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(0, 240, 255, .25),
              0 16px 60px rgba(0, 0, 0, .65),
              0 0 100px -10px rgba(0, 240, 255, .75),
              0 0 36px -4px rgba(0, 240, 255, .55);
          }
        }
        .thumb-preview-frame {
          position: relative;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: 8px;
          /* Sized relative to the OVERLAY's content area (which has top
             padding of 80px = below topbar, bottom 32px = above edge).
             100% of that box = never overlaps topbar, never bleeds off
             the bottom of the viewport. */
          max-width: 100%;
          max-height: 100%;
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: tpHologramIn .35s cubic-bezier(.2, .9, .3, 1.1) both,
                     tpEdgePulse 3s ease-in-out 0.4s infinite;
        }
        /* Scan-line sweep over the modal once on entry */
        .thumb-preview-frame::before {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 30%;
          top: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 240, 255, 0) 30%,
            rgba(0, 240, 255, .18) 50%,
            rgba(0, 240, 255, 0) 70%,
            transparent 100%);
          pointer-events: none;
          animation: tpScanLine 1.2s ease-out .15s 1 both;
          z-index: 2;
        }
        /* Corner brackets — pure CSS, fade in after frame */
        .thumb-preview-frame::after {
          content: '';
          position: absolute; inset: 6px;
          pointer-events: none;
          border: 1px solid transparent;
          border-image: linear-gradient(135deg,
            rgba(0, 240, 255, .55) 0%, rgba(0, 240, 255, .55) 8%,
            transparent 8%, transparent 92%,
            rgba(0, 240, 255, .55) 92%, rgba(0, 240, 255, .55) 100%) 1;
          opacity: 0;
          animation: tpFade .4s ease .35s forwards;
          z-index: 3;
        }
        .thumb-preview-titlebar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(0, 240, 255, .25);
          font-family: var(--font-display);
          background: rgba(0, 240, 255, .06);
          position: relative; z-index: 4;
        }
        .thumb-preview-name {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; letter-spacing: .04em;
          color: var(--text-primary);
        }
        .thumb-preview-id {
          font-family: var(--font-mono);
          color: var(--text-muted);
          font-size: 12px;
        }
        .thumb-preview-node {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-left: 8px;
        }
        .thumb-preview-close {
          background: transparent;
          border: 1px solid rgba(0, 240, 255, .3);
          color: var(--text-muted);
          font-size: 20px; line-height: 1;
          width: 28px; height: 28px;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all .12s ease;
        }
        .thumb-preview-close:hover {
          color: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 8px rgba(0, 240, 255, .4);
        }
        /* Image container — keeps the framebuffer letterboxed inside
           the modal regardless of the source's native aspect (text
           terminals 720x40, full HD 1920x1080, etc.) */
        .thumb-preview-body {
          flex: 1 1 auto;
          min-height: 0; min-width: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 12px;
          background: #000;
          position: relative; z-index: 1;
          overflow: hidden;
        }
        /* While the image is loading, the <img> has no intrinsic size
           and the absolutely-positioned loader has nothing to fill.
           Give the body a sensible 16:9 viewport so the loader is the
           full size of where the framebuffer will land. The min() caps
           prevent overflow on narrow viewports. */
        .thumb-preview-body:not([data-loaded="1"]) {
          min-width: min(960px, calc(100vw - 80px));
          min-height: min(540px, calc(100vh - 192px));
        }
        .thumb-preview-body img {
          /* Constrain to the BODY (= the flex container's actual size)
             rather than viewport units. The previous viewport-units
             approach over-estimated padding + titlebar height and let
             the image render slightly taller than the body, which the
             frame's overflow:hidden then cropped at top + bottom.
             100% of the body is always exact regardless of titlebar
             height variation or scrollbar reservation. */
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0;
          transition: opacity 280ms ease-out;
          position: relative;
          z-index: 2;
        }
        /* When the parent has data-loaded=1 (set by img onLoad), fade
           the image in and hide the loader. Pre-load the loader covers
           the whole body so there's no flash of empty modal. */
        .thumb-preview-body[data-loaded="1"] img {
          opacity: 1;
        }
        .thumb-preview-body[data-loaded="1"] .thumb-preview-loader {
          opacity: 0;
          pointer-events: none;
        }
        /* ----- thumb preview loader ---------------------------------- */
        .thumb-preview-loader {
          position: absolute;
          inset: 12px;
          z-index: 1;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 30, 50, 0.4) 0%,
            #000 70%);
          overflow: hidden;
          border-radius: 4px;
          opacity: 1;
          transition: opacity 220ms ease-out;
        }
        /* Faint cyber grid backdrop. Pure CSS — no images. */
        .tpl-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0, 240, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
          animation: tplGrid 6s linear infinite;
        }
        @keyframes tplGrid {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(32px, 32px); }
        }
        /* Vertical scan bar that bounces top-to-bottom. */
        .tpl-scan {
          position: absolute;
          left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.5) 20%,
            rgba(0, 240, 255, 1) 50%,
            rgba(0, 240, 255, 0.5) 80%,
            transparent 100%);
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.7),
            0 0 32px rgba(0, 240, 255, 0.4);
          top: 0;
          animation: tplScan 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite alternate;
        }
        @keyframes tplScan {
          0%   { top: -3px; }
          100% { top: calc(100% - 3px); }
        }
        /* Pulsing rotating ring at center. Two rings rotating in
           opposite directions for a "scanning radar" feel. */
        .tpl-ring {
          position: absolute;
          left: 50%; top: 50%;
          width: 92px; height: 92px;
          margin-left: -46px; margin-top: -46px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: rgba(0, 240, 255, 0.95);
          border-right-color: rgba(0, 240, 255, 0.45);
          box-shadow:
            0 0 16px rgba(0, 240, 255, 0.5),
            inset 0 0 16px rgba(0, 240, 255, 0.18);
          animation: tplSpin 1.2s linear infinite;
        }
        .tpl-ring::before,
        .tpl-ring::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .tpl-ring::before {
          inset: 8px;
          border-bottom-color: rgba(0, 240, 255, 0.7);
          border-left-color:  rgba(0, 240, 255, 0.3);
          animation: tplSpin 0.9s linear reverse infinite;
        }
        .tpl-ring::after {
          inset: 18px;
          border-top-color:   rgba(0, 240, 255, 0.6);
          animation: tplPulse 1.4s ease-in-out infinite;
        }
        @keyframes tplSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes tplPulse {
          0%, 100% { transform: none;   opacity: 0.6; }
          50%      { transform: scale(1.2); opacity: 1;   }
        }
        /* Cyber corner brackets at each corner. */
        .tpl-corner {
          position: absolute;
          width: 22px; height: 22px;
          border: 2px solid rgba(0, 240, 255, 0.85);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }
        .tpl-corner.tl { top: 8px;    left: 8px;    border-right: 0; border-bottom: 0; }
        .tpl-corner.tr { top: 8px;    right: 8px;   border-left: 0;  border-bottom: 0; }
        .tpl-corner.bl { bottom: 8px; left: 8px;    border-right: 0; border-top: 0;    }
        .tpl-corner.br { bottom: 8px; right: 8px;   border-left: 0;  border-top: 0;    }
        /* Status text + animated dots. Sits CLEAR of the ring (92px
           tall, so we offset by half-height + a comfortable 24px gap
           = 70px below the parent's 50% line). */
        .tpl-status {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, 70px);
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow:
            0 0 8px rgba(0, 240, 255, 0.7),
            0 0 16px rgba(0, 240, 255, 0.3);
          white-space: nowrap;
        }
        .tpl-dots {
          display: inline-flex;
          gap: 4px;
        }
        .tpl-dots i {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.4);
          box-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
          animation: tplDot 1.2s ease-in-out infinite;
        }
        .tpl-dots i:nth-child(2) { animation-delay: 0.2s; }
        .tpl-dots i:nth-child(3) { animation-delay: 0.4s; }
        @keyframes tplDot {
          0%, 100% { opacity: 0.3; transform: none;   }
          50%      { opacity: 1;   transform: scale(1.4); }
        }
        /* Error path. */
        .thumb-preview-body[data-error="1"] .thumb-preview-loader {
          background: radial-gradient(ellipse at center,
            rgba(80, 0, 0, 0.5) 0%, #000 70%);
        }
        .thumb-preview-body[data-error="1"] .tpl-status::after {
          content: ' — FAILED';
          color: #ff6464;
        }
        .vm-thumb-title {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 6px;
        }
        .vm-thumb-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        .vm-thumb-name {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-primary);
          letter-spacing: 0.05em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 0;
        }
        .vm-thumb-bars {
          display: flex; flex-direction: column; gap: 4px;
        }
        .vm-thumb-bar {
          display: flex; align-items: center; gap: 6px;
        }
        .vm-thumb-bar-label {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-secondary);
          width: 28px;
          letter-spacing: 0.05em;
        }
        .vm-thumb-bar-val {
          font-family: var(--font-mono);
          font-size: 11px;
          min-width: 40px;
          text-align: right;
        }

        .view-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: var(--spacing-xs) 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .view-btn-lbl {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        /* Icon-only when the toolbar gets cramped. */
        @media (max-width: 1280px) {
          .view-btn-lbl { display: none; }
          .view-btn { padding: var(--spacing-xs); }
        }

        /* Column picker popover (table view) */
        .col-picker-wrap { position: relative; }
        .col-picker {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          z-index: 500;
          min-width: 180px;
          padding: 6px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid var(--primary);
          border-radius: var(--radius-sm);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 240, 255, 0.2);
          display: flex;
          flex-direction: column;
          animation: ctx-menu-in 0.12s ease-out;
        }
        @keyframes ctx-menu-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: none; }
        }
        .col-picker-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 10px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
          cursor: pointer;
          border-radius: 3px;
        }
        .col-picker-row:hover { background: rgba(0, 240, 255, 0.08); }
        .col-picker-row input { accent-color: var(--primary); }
        .col-picker-reset {
          margin-top: 4px;
          padding: 5px 10px;
          background: transparent;
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: 3px;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .col-picker-reset:hover { color: var(--primary); border-color: var(--primary); }
        .num-cell { font-variant-numeric: tabular-nums; white-space: nowrap; }

        .view-btn:hover {
          color: var(--text-primary);
        }

        .view-btn.active {
          background: var(--bg-card);
          color: var(--primary);
        }

        /* Content */
        .matrix-content {
          flex: 1;
          display: flex;
          gap: var(--spacing-lg);
          min-height: 0;
        }

        .matrix-grid {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          position: relative;
        }

        /* Migration lines SVG overlay */
        .migration-lines-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          overflow: visible;
        }

        .migration-line {
          stroke-dasharray: 8 4;
          animation: migrationLineDash 0.5s linear infinite;
        }

        @keyframes migrationLineDash {
          to {
            stroke-dashoffset: -12;
          }
        }

        .migration-particle {
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* Incoming migration count badge */
        .incoming-count {
          color: var(--accent);
          font-size: 12px;
          animation: incomingPulse 1.5s ease-in-out infinite;
        }

        @keyframes incomingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Node Section */
        .node-section {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm) var(--spacing-md);
        }

        .node-section.ghost-only {
          border-color: var(--accent);
          border-style: dashed;
          background: rgba(224, 102, 255, 0.05);
          animation: ghostSectionPulse 2s ease-in-out infinite;
        }

        @keyframes ghostSectionPulse {
          0%, 100% { border-color: var(--accent); }
          50% { border-color: var(--primary); }
        }

        .node-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-xs);
          border-bottom: 1px solid var(--border);
        }

        .node-section-name {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .node-section-count {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #ffffff;
        }

        /* VM Grid */
        .vm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(${kt}px, 1fr));
          gap: var(--spacing-xs);
        }

        .vm-cell {
          cursor: pointer;
          opacity: 0;
          animation-name: vm-materialize;
          animation-duration: 0.4s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }

        @keyframes vm-materialize {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(15px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Sort by load animations - disable entry animation, show immediately */
        .vm-grid.sort-by-load .vm-cell {
          animation: none !important;
          opacity: 1 !important;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        @keyframes load-reorder {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: none;
            opacity: 1;
          }
        }

        .vm-grid.sort-by-load .vm-cell {
          animation: load-reorder 0.3s ease-out;
        }

        .vm-cell-inner {
          width: 100%;
          height: 100%;
          min-height: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: var(--spacing-xs);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        /* VM vs CT marker — small corner tag so guest kind is distinguishable
           at a glance (cyan = VM/QEMU, violet = CT/LXC). */
        .vm-type-tag {
          position: absolute;
          top: 2px; left: 3px;
          font-family: var(--font-display);
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.06em;
          line-height: 1;
          padding: 1px 2px;
          border-radius: 2px;
          z-index: 2;
          pointer-events: none;
          opacity: 0.85;
        }
        .vm-type-tag.vm { color: #00f0ff; background: rgba(0, 240, 255, 0.12); }
        .vm-type-tag.ct { color: #c08bff; background: rgba(180, 100, 255, 0.14); }
        .vm-cell.stopped .vm-type-tag { opacity: 0.4; }

        /* Holographic scan line effect on entry */
        .vm-cell-inner::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.8), transparent);
          animation: vm-scan-line 0.6s ease-out var(--anim-delay) forwards;
          opacity: 0;
        }

        @keyframes vm-scan-line {
          0% {
            top: -10%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }

        .vm-cell:hover .vm-cell-inner {
          transform: scale(1.05);
          z-index: 1;
        }

        .vm-cell.selected .vm-cell-inner {
          border-color: var(--primary);
          box-shadow: var(--primary-glow);
        }

        .vm-cell.running .vm-cell-inner.success {
          border-color: var(--success);
          background: rgba(0, 255, 136, 0.1);
        }

        /* PERF: warning/danger cells previously ran an INFINITE box-shadow
           pulse (warning-pulse / danger-pulse). Animating a multi-layer
           box-shadow forces a full repaint every frame; with 100+ VMs and
           many in warning/danger that pinned the CPU/GPU and made the whole
           machine sluggish. Use a STATIC glow instead — painted once, zero
           per-frame cost — colour still distinguishes the state. */
        .vm-cell.running .vm-cell-inner.warning {
          border-color: var(--warning);
          background: rgba(255, 107, 0, 0.1);
          box-shadow: 0 0 6px rgba(255, 149, 0, 0.35);
        }

        .vm-cell.running .vm-cell-inner.danger {
          border-color: var(--danger-text);
          background: rgba(255, 0, 64, 0.1);
          box-shadow: 0 0 7px rgba(255, 0, 64, 0.45);
        }

        /* Danger cells blink red again — but the GPU-cheap way: a static
           inset-glow overlay whose OPACITY animates. Opacity is composited
           (no per-frame repaint), so this stays smooth with 100+ cells,
           unlike the old box-shadow keyframes that pinned the CPU. */
        .vm-cell.running .vm-cell-inner.danger::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 14px rgba(255, 0, 64, 0.85), inset 0 0 4px rgba(255, 0, 64, 0.9);
          pointer-events: none;
          animation: dangerBlinkCheap 1s ease-in-out infinite;
          will-change: opacity;
        }
        @keyframes dangerBlinkCheap {
          0%, 100% { opacity: 0.15; }
          50%      { opacity: 1; }
        }
        body[data-app-visible="false"] .vm-cell-inner.danger::after { animation: none; }

        .vm-cell.stopped .vm-cell-inner {
          opacity: 0.4;
        }

        .vm-name {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.2;
          word-break: break-all;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .vm-cell.running .vm-name {
          color: var(--text-primary);
        }

        .vm-id {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--primary-dim);
        }

        .vm-cell.running .vm-id {
          color: var(--primary);
        }

        /* Task indicator on grid cells */
        .vm-cell.has-task {
          position: relative;
        }

        .vm-cell.has-task .vm-cell-inner {
          border-color: var(--accent);
          background: rgba(224, 102, 255, 0.1);
        }

        .vm-task-icon {
          position: absolute;
          top: 2px;
          right: 4px;
          font-size: 13px;
          color: var(--accent);
          animation: taskSpin 2s linear infinite;
        }

        @keyframes taskSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .vm-task-label {
          position: absolute;
          top: -8px;
          left: -4px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border: 1px solid;
          border-radius: 3px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          z-index: 15;
          background: #0a1520;
        }

        @keyframes taskLabelPulse {
          0%, 100% {
            opacity: 0.9;
            transform: none;
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .vm-task-ring {
          position: absolute;
          inset: -3px;
          border: 2px solid var(--accent);
          border-radius: var(--radius-sm);
          opacity: 0.6;
          animation: taskPulse 1.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes taskPulse {
          0%, 100% {
            transform: none;
            opacity: 0.6;
            box-shadow: 0 0 8px var(--accent);
          }
          50% {
            transform: scale(1.03);
            opacity: 0.9;
            box-shadow: 0 0 15px var(--accent), 0 0 25px rgba(224, 102, 255, 0.3);
          }
        }

        /* Backup specific styles - Orange color */
        .vm-cell.backup {
          position: relative;
          z-index: 10;
        }

        .vm-cell.backup .vm-cell-inner {
          border-color: #ff9500;
          border-width: 2px;
          background: linear-gradient(135deg, rgba(255, 149, 0, 0.2) 0%, rgba(255, 120, 0, 0.15) 100%);
          animation: backupPulse 1.5s ease-in-out infinite;
        }

        @keyframes backupPulse {
          0%, 100% {
            box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.4), inset 0 0 15px rgba(255, 149, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 20px #ff9500, 0 0 40px rgba(255, 149, 0, 0.5), inset 0 0 25px rgba(255, 149, 0, 0.2);
          }
        }

        .vm-cell.backup .vm-name,
        .vm-cell.backup .vm-id {
          color: #ff9500;
          text-shadow: 0 0 8px rgba(255, 149, 0, 0.6);
        }

        .vm-backup-icon {
          position: absolute;
          top: 2px;
          right: 4px;
          font-size: 15px;
          color: #ff9500;
          text-shadow: 0 0 10px #ff9500;
          animation: backupIconPulse 0.8s ease-in-out infinite;
        }

        @keyframes backupIconPulse {
          0%, 100% {
            opacity: 1;
            transform: none;
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        .backup-ring {
          position: absolute;
          inset: -4px;
          border: 2px solid #ff9500;
          border-radius: var(--radius-sm);
          animation: backupRingPulse 1.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes backupRingPulse {
          0%, 100% {
            transform: none;
            opacity: 0.8;
            box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.3);
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
            box-shadow: 0 0 20px #ff9500, 0 0 40px rgba(255, 149, 0, 0.5);
          }
        }

        .backup-scanner {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: var(--radius-sm);
          pointer-events: none;
        }

        .backup-scanner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #ff9500, #ffb740, #ff9500, transparent);
          animation: backupScan 1.5s linear infinite;
          box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.8);
        }

        @keyframes backupScan {
          0% {
            top: 0;
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0.3;
          }
        }

        .backup-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
        }

        .backup-particles .bp {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ff9500;
          border-radius: 50%;
          box-shadow: 0 0 6px #ff9500, 0 0 12px rgba(255, 149, 0, 0.8);
        }

        .backup-particles .bp1 {
          top: 20%;
          right: -8px;
          animation: backupParticle 1.2s ease-out infinite;
        }

        .backup-particles .bp2 {
          top: 50%;
          right: -8px;
          animation: backupParticle 1.2s ease-out 0.3s infinite;
        }

        .backup-particles .bp3 {
          top: 80%;
          right: -8px;
          animation: backupParticle 1.2s ease-out 0.6s infinite;
        }

        .backup-particles .bp4 {
          top: 50%;
          left: -8px;
          animation: backupParticleLeft 1.2s ease-out 0.4s infinite;
        }

        @keyframes backupParticle {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(20px) scale(0);
            opacity: 0;
          }
        }

        @keyframes backupParticleLeft {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-20px) scale(0);
            opacity: 0;
          }
        }

        /* Migration specific styles - Source VM */
        .vm-cell.migrating {
          position: relative;
          z-index: 10;
        }

        .vm-cell.migrating .vm-cell-inner {
          border-color: #00f0ff;
          border-width: 2px;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 180, 220, 0.25) 100%);
          animation: migrateSourcePulse 1.2s ease-in-out infinite;
        }

        @keyframes migrateSourcePulse {
          0%, 100% {
            box-shadow: 0 0 8px #00f0ff, 0 0 16px rgba(0, 240, 255, 0.4), inset 0 0 12px rgba(0, 240, 255, 0.15);
          }
          50% {
            box-shadow: 0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.25);
          }
        }

        .vm-cell.migrating .vm-name,
        .vm-cell.migrating .vm-id {
          color: #00f0ff;
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
        }

        .vm-migrate-icon {
          position: absolute;
          top: 50%;
          right: -10px;
          transform: translateY(-50%);
          z-index: 5;
        }

        .migrate-arrow {
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
          color: #00f0ff;
          text-shadow: 0 0 12px #00f0ff, 0 0 24px #00f0ff;
          animation: arrowPulse 0.6s ease-in-out infinite;
        }

        @keyframes arrowPulse {
          0%, 100% { transform: none; opacity: 1; }
          50% { transform: translateX(5px) scale(1.1); opacity: 0.8; }
        }

        .migrate-ring {
          position: absolute;
          inset: -5px;
          border: 2px solid #00f0ff;
          border-radius: var(--radius-sm);
          animation: migrateRingSpin 3s linear infinite;
          pointer-events: none;
          background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg 30deg,
            rgba(0, 240, 255, 0.15) 30deg 60deg
          );
        }

        @keyframes migrateRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .migrate-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00f0ff;
          border-radius: 50%;
          box-shadow: 0 0 6px #00f0ff, 0 0 12px #00f0ff;
        }

        .particle.p1 {
          top: 15%;
          animation: particleFlow 1.2s linear infinite;
        }

        .particle.p2 {
          top: 50%;
          animation: particleFlow 1.2s linear infinite 0.4s;
        }

        .particle.p3 {
          top: 85%;
          animation: particleFlow 1.2s linear infinite 0.8s;
        }

        @keyframes particleFlow {
          0% {
            left: -5px;
            opacity: 0;
            transform: scale(0.3);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            left: calc(100% + 15px);
            opacity: 0;
            transform: scale(0.3);
          }
        }

        .migrate-target-label {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: #00f0ff;
          white-space: nowrap;
          text-shadow: 0 0 8px #00f0ff;
          padding: 2px 6px;
          background: rgba(0, 20, 40, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 3px;
        }

        /* Ghost cell for migration target */
        .vm-cell.ghost {
          opacity: 1;
          pointer-events: none;
        }

        .vm-cell.ghost .vm-cell-inner {
          border: 2px dashed #00ff88;
          background: rgba(0, 255, 136, 0.08);
          animation: ghostMaterialize 1.5s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.3), inset 0 0 15px rgba(0, 255, 136, 0.1);
        }

        .vm-cell.ghost .vm-name,
        .vm-cell.ghost .vm-id {
          color: #00ff88;
          opacity: 0.7;
        }

        @keyframes ghostMaterialize {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.97);
            border-color: rgba(0, 255, 136, 0.5);
          }
          50% {
            opacity: 0.9;
            transform: scale(1);
            border-color: rgba(0, 255, 136, 1);
          }
        }

        /* Incoming badge on ghost — rendered as a real DOM node so we can
           append a live progress percentage. Styling matches the MIGRATE
           source-side label so the two badges sit symmetrically across
           source and destination cells. */
        .vm-incoming-label {
          position: absolute;
          top: -8px;
          right: -4px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          color: #00ff88;
          background: #0a1520;
          padding: 2px 5px;
          border: 1px solid #00ff88;
          border-radius: 3px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          z-index: 15;
          text-shadow: 0 0 4px #00ff88;
          animation: incomingPulse 1s ease-in-out infinite;
        }
        .vm-incoming-label .vm-task-progress {
          margin-left: 3px;
          color: #c8ffe1;
          text-shadow: 0 0 3px rgba(0, 255, 136, 0.7);
        }
        .vm-task-label .vm-task-progress {
          margin-left: 3px;
          opacity: 0.9;
        }

        @keyframes incomingPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Completing migration - source fading out */
        .vm-cell.completing {
          pointer-events: none;
          animation: completingFadeOut 1.5s ease-out forwards;
        }

        .vm-cell.completing .vm-cell-inner {
          border-color: rgba(0, 240, 255, 0.3);
          background: rgba(0, 240, 255, 0.05);
        }

        .vm-cell.completing .vm-name,
        .vm-cell.completing .vm-id {
          color: rgba(0, 240, 255, 0.4);
        }

        @keyframes completingFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          30% {
            opacity: 0.8;
            transform: scale(0.98);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        /* Completing line animation */
        .completing-line {
          stroke-linecap: round;
        }

        .vm-cell.stopped .vm-id {
          color: var(--text-muted);
        }

        /* Detail Panel */
        .vm-detail-panel {
          /* Width bumped from 320 → 360 so the larger font size doesn't
             overflow the row labels ("MEMORY", "DISKIO") into the values. */
          width: 360px;
          flex-shrink: 0;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          position: relative;
          animation: panel-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     neon-breathe 4s ease-in-out 0.4s infinite;
          transform-origin: right center;
          max-height: calc(100vh - 160px);
          display: flex;
          flex-direction: column;
        }

        .vm-detail-panel .detail-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-md);
        }

        @keyframes panel-slide-in {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        .vm-detail-panel .detail-header {
          animation: content-fade-in 0.3s ease-out 0.15s backwards;
        }

        .vm-detail-panel .detail-content {
          animation: content-fade-in 0.3s ease-out 0.25s backwards;
        }

        @keyframes content-fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Holographic scan line effect */
        .vm-detail-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 2s linear infinite;
          opacity: 0.5;
        }

        @keyframes scan-line {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(400px);
          }
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }

        .detail-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .detail-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .detail-status.success {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .detail-status.danger {
          background: var(--danger);
        }

        .detail-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .detail-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .detail-close:hover {
          color: var(--text-primary);
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .detail-info {
          display: flex;
          flex-direction: column;
          /* spacing-xs was too tight for the bumped font size — rows
             collided. spacing-sm gives the larger labels breathing room. */
          gap: var(--spacing-sm);
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--spacing-sm);
          line-height: 1.5;
        }

        .info-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .info-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
        }

        .detail-metrics {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .metric-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .metric-row-network {
          margin-top: var(--spacing-xs);
        }

        .metric-row-stacked {
          flex-direction: column;
          align-items: stretch;
          gap: 4px;
        }

        .metric-row-stacked .metric-bar {
          flex: none;
          width: 100%;
        }

        .metric-row-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-row .metric-label {
          font-size: 13px;
          color: var(--text-secondary);
          width: 50px;
          flex-shrink: 0;
        }

        .metric-row-stacked .metric-label {
          width: auto;
        }

        .metric-row .metric-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
        }

        .metric-row .metric-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
          animation: bar-fill-in 0.8s ease-out forwards;
          transform-origin: left;
        }

        @keyframes bar-fill-in {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: none;
            opacity: 1;
          }
        }

        .metric-fill.success { background: var(--success); box-shadow: 0 0 8px var(--success); }
        .metric-fill.warning { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
        .metric-fill.danger { background: var(--danger); box-shadow: 0 0 8px var(--danger); }

        .metric-row .metric-value {
          font-family: var(--font-mono);
          font-size: 13px;
          min-width: 120px;
          text-align: right;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .network-stats {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
          font-family: var(--font-mono);
          font-size: 14px;
        }

        .net-rx { color: var(--success); }
        .net-tx { color: var(--warning); }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }

        .tag {
          padding: 2px 8px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Table View */
        .matrix-table-container {
          flex: 1;
          overflow: auto;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          position: relative;
        }

        /* Bulk-select column + checkbox styling. */
        .vm-table th.select-col,
        .vm-table td.select-col {
          width: 32px;
          text-align: center;
          padding: 4px 6px;
        }
        .bulk-check {
          width: 14px; height: 14px;
          accent-color: var(--primary);
          cursor: pointer;
          margin: 0;
        }
        .vm-table tbody tr.multi-selected {
          background: rgba(0, 240, 255, 0.06);
        }
        .vm-table tbody tr.multi-selected:hover {
          background: rgba(0, 240, 255, 0.12);
        }

        /* Bulk action toolbar — pinned above the table when ≥1 row is
           checked. Same cyber-style as the matrix top toolbar. */
        .bulk-toolbar {
          position: sticky; top: 0; z-index: 11;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px;
          background: linear-gradient(180deg,
            rgba(0, 240, 255, 0.10),
            rgba(0, 240, 255, 0.04));
          border-bottom: 1px solid var(--primary);
          backdrop-filter: blur(6px);
          animation: bulkBarIn 0.2s ease-out;
        }
        @keyframes bulkBarIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: none; }
        }
        .bulk-count {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
          margin-right: 8px;
        }
        .bulk-sep { width: 1px; height: 18px; background: rgba(0,240,255,.2); margin: 0 4px; }
        .bulk-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .bulk-btn:hover:not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.25);
        }
        .bulk-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .bulk-btn.danger:hover:not(:disabled) {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.3);
        }
        .bulk-btn.ghost {
          margin-left: auto;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .bulk-btn.ghost:hover:not(:disabled) {
          color: var(--text-primary);
          border-color: var(--text-secondary);
        }

        .vm-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .vm-table thead {
          position: sticky;
          top: 0;
          z-index: 10;
          background: var(--bg-secondary);
        }

        .vm-table th {
          padding: var(--spacing-sm) var(--spacing-md);
          text-align: left;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }

        .vm-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: color var(--transition-fast);
        }

        .vm-table th.sortable:hover {
          color: var(--primary);
        }

        .vm-table th.sorted {
          color: var(--primary);
        }

        .vm-table th span {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .sort-indicator {
          font-size: 13px;
          opacity: 0.8;
        }

        /* Sort animation */
        .vm-table tbody tr {
          transition: transform 0.3s ease-out, opacity 0.3s ease-out, background-color var(--transition-fast);
        }

        /* Cyber sort animation. The old horizontal wiggle was too generic.
           New behaviour: rows are "scanned in" top→bottom — each row
           fades up + slides up by 6px with a stagger, while a cyan
           glow-bar travels down the table edge to mimic a CRT/holo
           re-render. The stagger uses nth-child up to 60 rows; rows
           past that just snap (extremely long lists wouldn't benefit
           from staggering anyway). */
        .vm-table tbody tr.sort-animating {
          animation: sortRowReveal 360ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        @keyframes sortRowReveal {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(2px); }
          50%  { filter: blur(0); }
          100% { opacity: 1; transform: none; filter: none; }
        }
        /* Stagger via nth-child — pure CSS, no per-row inline styles. */
        .vm-table tbody tr.sort-animating:nth-child(1)  { animation-delay:   0ms; }
        .vm-table tbody tr.sort-animating:nth-child(2)  { animation-delay:  18ms; }
        .vm-table tbody tr.sort-animating:nth-child(3)  { animation-delay:  36ms; }
        .vm-table tbody tr.sort-animating:nth-child(4)  { animation-delay:  54ms; }
        .vm-table tbody tr.sort-animating:nth-child(5)  { animation-delay:  72ms; }
        .vm-table tbody tr.sort-animating:nth-child(6)  { animation-delay:  90ms; }
        .vm-table tbody tr.sort-animating:nth-child(7)  { animation-delay: 108ms; }
        .vm-table tbody tr.sort-animating:nth-child(8)  { animation-delay: 126ms; }
        .vm-table tbody tr.sort-animating:nth-child(9)  { animation-delay: 144ms; }
        .vm-table tbody tr.sort-animating:nth-child(10) { animation-delay: 162ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+11) { animation-delay: 180ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+16) { animation-delay: 200ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+22) { animation-delay: 220ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+30) { animation-delay: 240ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+40) { animation-delay: 260ms; }
        /* Glowing scan-bar that travels down the table during the sort.
           Anchored to .vm-table (positioned via the table's own bounding
           box). Triggered the same way as row animation: appears on
           tbody when any tr has .sort-animating. */
        .vm-table {
          position: relative;
        }
        .vm-table::before {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.4) 18%,
            rgba(0, 240, 255, 0.95) 50%,
            rgba(0, 240, 255, 0.4) 82%,
            transparent 100%);
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.7),
            0 0 28px rgba(0, 240, 255, 0.35);
          pointer-events: none;
          opacity: 0;
          z-index: 5;
        }
        .vm-table:has(tr.sort-animating)::before {
          animation: sortScanBar 480ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        @keyframes sortScanBar {
          0%   { opacity: 0; top: 0; }
          12%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0; top: 100%; }
        }

        .vm-table td {
          padding: var(--spacing-xs) var(--spacing-md);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
          vertical-align: middle;
        }

        .vm-table tbody tr {
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .vm-table tbody tr:hover {
          background: var(--bg-hover);
        }

        .vm-table tbody tr.selected {
          background: rgba(0, 240, 255, 0.1);
        }

        .vm-table tbody tr.stopped {
          opacity: 0.5;
        }

        .status-badge {
          display: inline-block;
          padding: 2px 6px;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .status-badge.success {
          background: rgba(0, 255, 136, 0.2);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .status-badge.danger {
          background: rgba(255, 0, 64, 0.18);
          color: var(--danger-text);
          border: 1px solid var(--danger);
        }

        .vmid-cell {
          font-weight: 600;
          color: var(--primary);
        }

        .type-cell {
          text-align: center;
        }

        .type-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .type-badge.qemu {
          background: rgba(0, 180, 255, 0.15);
          border: 1px solid rgba(0, 180, 255, 0.4);
          color: #00b4ff;
        }

        .type-badge.lxc {
          background: rgba(180, 100, 255, 0.15);
          border: 1px solid rgba(180, 100, 255, 0.4);
          color: #b464ff;
        }

        .name-cell {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .node-cell {
          color: var(--text-secondary);
        }

        .cpu-cell, .mem-cell {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          min-width: 100px;
        }

        .mini-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
          min-width: 50px;
        }

        .mini-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
        }

        .mini-bar-fill.success { background: var(--success); }
        .mini-bar-fill.warning { background: var(--warning); }
        .mini-bar-fill.danger { background: var(--danger); }

        .net-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 14px;
        }

        .net-cell .net-rx { color: var(--success); }
        .net-cell .net-tx { color: var(--warning); }

        .uptime-cell {
          color: var(--text-secondary);
        }

        .task-header {
          color: var(--accent);
          font-size: 13px;
        }

        .task-cell {
          min-width: 100px;
        }

        .tags-header {
          color: var(--primary);
          font-size: 13px;
        }

        .tags-cell {
          max-width: 150px;
        }

        .vm-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
        }

        .vm-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 1px 4px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid var(--primary-dim);
          border-radius: 3px;
          color: var(--primary);
          white-space: nowrap;
        }

        .tags-row {
          flex-wrap: wrap;
        }

        .detail-tags {
          justify-content: flex-end;
        }

        /* Legend */
        .matrix-legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          margin: var(--spacing-sm) 0 0 0;
          padding: var(--spacing-xs) 0 0 0;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }
        /* Thumb-refresh indicator pinned to the FAR right of the legend
           row (only visible in thumb mode). margin-left:auto pushes it
           past the centered legend items. */
        .legend-thumb-refresh {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--primary);
          opacity: 0.85;
          padding: 2px 10px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: var(--radius-sm);
          letter-spacing: 0.04em;
          cursor: help;
        }
        .legend-thumb-refresh svg {
          opacity: 0.7;
        }

        .legend-title {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .legend-color {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          border: 1px solid var(--border);
        }

        .legend-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .legend-note {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .legend-color.success {
          background: rgba(0, 255, 136, 0.3);
          border-color: var(--success);
        }

        .legend-color.warning {
          background: rgba(255, 107, 0, 0.3);
          border-color: var(--warning);
        }

        .legend-color.danger {
          background: rgba(255, 0, 64, 0.3);
          border-color: var(--danger-text);
        }

        .legend-color.muted {
          background: var(--bg-card);
          opacity: 0.4;
        }

        .no-vms {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          color: var(--text-secondary);
          font-family: var(--font-display);
        }

        @media (max-width: 1024px) {
          .matrix-content {
            flex-direction: column;
          }

          .vm-detail-panel {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .holo-matrix {
            padding: var(--spacing-md);
          }

          .matrix-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .matrix-controls {
            width: 100%;
            flex-wrap: wrap;
          }

          .search-box {
            flex: 1;
          }

          .search-box input {
            width: 100%;
          }
        }

        /* Context Menu */
        .vm-context-menu {
          position: fixed;
          z-index: 1000;
          min-width: 220px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: var(--radius-md);
          /* Layered glow so the cyan rim reads as luminous, not flat:
             - inner highlight ring at 0 1px
             - mid-distance soft cyan halo
             - far drop shadow for depth */
          box-shadow:
            0 0 0 1px rgba(0, 240, 255, .12),
            0 16px 60px rgba(0, 0, 0, .65),
            0 0 80px -20px rgba(0, 240, 255, .55),
            0 0 24px -6px rgba(0, 240, 255, .35);
          padding: var(--spacing-sm);
          animation: context-menu-appear 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(8px);
        }

        @keyframes context-menu-appear {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        .context-menu-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
        }

        .context-menu-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .context-menu-id {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
        }

        .context-menu-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-xs) 0;
        }

        .context-menu-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          width: 100%;
          padding: var(--spacing-sm);
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 13px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: background .14s ease, color .14s ease, padding-left .14s ease, box-shadow .14s ease;
        }

        /* Full-row light bar on hover — matches CyberSelect: left vertical
           cyan rail + cyan band gradient across the row + soft outer glow.
           The 2px padding-left bump gives a "snap to" tactility. */
        .context-menu-item:hover {
          background: linear-gradient(90deg,
            rgba(0, 240, 255, .22) 0%,
            rgba(0, 240, 255, .08) 60%,
            transparent 100%);
          color: var(--primary);
          padding-left: calc(var(--spacing-sm) + 4px);
          box-shadow:
            inset 4px 0 0 var(--primary),
            0 0 18px -6px rgba(0, 240, 255, .55);
          text-shadow: 0 0 6px rgba(0, 240, 255, .55);
        }

        /* Destructive row variant — red rail + red glow instead of cyan,
           so "Stop (hard)" reads as dangerous on hover. */
        .context-menu-item.danger:hover {
          background: linear-gradient(90deg,
            rgba(255, 56, 96, .22) 0%,
            rgba(255, 56, 96, .08) 60%,
            transparent 100%);
          color: var(--danger-text);
          box-shadow:
            inset 4px 0 0 var(--danger),
            0 0 18px -6px rgba(255, 56, 96, .55);
          text-shadow: 0 0 6px rgba(255, 56, 96, .55);
        }

        .context-menu-item svg {
          flex-shrink: 0;
          color: var(--text-secondary);
          transition: color var(--transition-fast), filter var(--transition-fast);
        }

        .context-menu-item:hover svg {
          color: var(--primary);
          filter: drop-shadow(0 0 4px rgba(0, 240, 255, .6));
        }
        .context-menu-item.danger:hover svg {
          color: var(--danger-text);
          filter: drop-shadow(0 0 4px rgba(255, 56, 96, .6));
        }

        /* Visible-but-disabled — operator can see the feature exists but
           clicking surfaces an explanation toast. No light bar on hover, no
           glow; just a muted tint and a not-allowed cursor. */
        .context-menu-item.is-disabled,
        .context-menu-item.is-disabled:hover {
          color: var(--text-muted);
          background: transparent;
          padding-left: var(--spacing-sm);
          box-shadow: none;
          text-shadow: none;
          cursor: help;
        }
        .context-menu-item.is-disabled svg,
        .context-menu-item.is-disabled:hover svg {
          color: var(--text-muted);
          filter: none;
          opacity: .55;
        }

        .context-menu-info {
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-top: var(--spacing-xs);
        }

        .context-menu-info .info-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 2px 0;
        }

        .context-menu-info .info-row span:first-child {
          color: var(--text-muted);
        }

        .context-menu-info .info-row span:last-child {
          color: var(--text-secondary);
        }

        /* Migration-failure toast stack — bottom-right of viewport */
        .mig-fail-stack {
          position: fixed;
          right: 16px; bottom: 16px;
          display: flex; flex-direction: column-reverse; gap: 10px;
          z-index: 500;
          max-width: 420px;
        }
        .mig-fail-toast {
          position: relative;
          padding: 14px 16px 14px 16px;
          background: linear-gradient(180deg, #1a0610, #0d0408);
          border: 1px solid #ff3860;
          border-left-width: 4px;
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .55), 0 0 32px -10px rgba(255, 56, 96, .6);
          color: #ffd0d8;
          font-family: 'Rajdhani', sans-serif;
          animation: migFailIn .25s ease;
        }
        @keyframes migFailIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: none; }
        }
        .mig-fail-head {
          font-family: 'Orbitron', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
          color: #ff3860; margin-bottom: 6px;
        }
        .mig-fail-body { font-size: 14px; line-height: 1.5; margin-bottom: 8px; }
        .mig-fail-cmd-line { font-size: 12px; color: #95a8c4; margin-bottom: 4px; }
        .mig-fail-cmd-hint code {
          font-family: 'Share Tech Mono', monospace; font-size: 12px;
          background: rgba(0, 240, 255, .06); color: #00f0ff;
          padding: 1px 6px; border-radius: 3px;
        }
        .mig-fail-cmd-row { display: flex; gap: 8px; align-items: center; }
        .mig-fail-cmd {
          flex: 1; font-family: 'Share Tech Mono', monospace; font-size: 13px;
          background: #02050b; color: #00f0ff;
          padding: 6px 10px; border-radius: 4px;
          border: 1px solid rgba(0, 240, 255, .16);
          user-select: all;
        }
        .mig-fail-btn {
          padding: 6px 12px;
          font-family: 'Share Tech Mono', monospace; font-size: 10px;
          letter-spacing: .06em; text-transform: uppercase;
          color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4);
          border: none; border-radius: 4px; cursor: pointer;
          white-space: nowrap;
        }
        .mig-fail-btn:hover { box-shadow: 0 0 12px rgba(0, 240, 255, .5); }
        .mig-fail-dismiss {
          position: absolute; top: 6px; right: 8px;
          width: 22px; height: 22px;
          background: transparent; border: none;
          color: #95a8c4; font-size: 18px; line-height: 1; cursor: pointer;
          padding: 0;
        }
        .mig-fail-dismiss:hover { color: #ffd0d8; }
      `})]})}function Er({vms:r,onSelectByTag:l}){const{language:d}=We(),p=Qt.useMemo(()=>{const v=new Map;for(const b of r){const u=b.tags,C=Array.isArray(u)?u.flatMap(m=>String(m).split(/[;,\s]+/)):typeof u=="string"?u.split(/[;,\s]+/):[];for(const m of C.filter(Boolean))v.set(m,(v.get(m)||0)+1)}return[...v.entries()].sort((b,u)=>u[1]-b[1]).slice(0,32)},[r]);return p.length===0?null:e.jsxs("div",{className:"tag-selector-bar",children:[e.jsx("span",{className:"tsb-label",children:d==="zh-TW"?"依標籤全選 VM：":"Select all VMs with tag:"}),p.map(([v,b])=>e.jsxs("button",{className:"tsb-tag",onClick:()=>l(v),title:d==="zh-TW"?`將 ${b} 台標籤為「${v}」的 VM/CT 加入選取`:`Add ${b} VM/CT(s) tagged "${v}" to selection`,children:[e.jsx("span",{className:"tsb-tag-name",children:v}),e.jsx("span",{className:"tsb-tag-count",children:b})]},v)),e.jsx("style",{children:`
        .tag-selector-bar { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px; margin-bottom: 8px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; align-items: center; }
        .tsb-label { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--text-secondary); margin-right: 4px; letter-spacing: .04em; }
        .tsb-tag { display: inline-flex; gap: 4px; align-items: center; padding: 2px 8px; background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 999px; cursor: pointer; font-family: 'Share Tech Mono', monospace; font-size: 11px; color: var(--text-primary); }
        .tsb-tag:hover { background: rgba(0, 240, 255, 0.15); border-color: var(--primary); }
        .tsb-tag-name { color: var(--primary); }
        .tsb-tag-count { color: var(--text-muted); font-size: 10px; }
      `})]})}const rt=30;function Pr(r,l){const d=l==="zh-TW";if(r.length<2)return d?"取樣中…":"SAMPLING…";const p=Math.round((r[r.length-1]-r[0])/1e3),v=p<90?d?`${p} 秒`:`${p}s`:d?`${Math.round(p/60)} 分鐘`:`${Math.round(p/60)}m`;return r.length<rt?d?`近 ${v} · 累積中 ${r.length}/${rt}`:`LAST ${v} · FILLING ${r.length}/${rt}`:d?`近 ${v}`:`LAST ${v}`}function Zt(r){return(Array.isArray(r)?r.flatMap(d=>String(d).split(/[;,\s]+/)):typeof r=="string"?r.split(/[;,\s]+/):[]).map(d=>d.trim()).filter(Boolean)}function Jt(r){return r==null?"rgba(0, 60, 80, 0.35)":r<5?"#1d4d3d":r<25?"#2e7d4f":r<50?"#a07a2e":r<75?"#d97a2e":r<90?"#e84d3d":"#ff3a6e"}function Rr({vms:r,history:l,times:d,tick:p,language:v}){return e.jsxs("div",{className:"hm-wrap",children:[e.jsxs("div",{className:"hm-head",children:[e.jsx("span",{className:"hm-dot"}),e.jsx("span",{className:"hm-title",children:v==="zh-TW"?"熱度圖 · 各 VM CPU":"HEAT MAP · CPU PER VM"}),e.jsx("span",{className:"hm-meta",children:Pr(d,v)})]}),e.jsx("div",{className:"hm-rows",children:r.length===0?e.jsx("div",{className:"hm-empty",children:v==="zh-TW"?"無資料":"No data"}):r.map(b=>{const u=`${b.cluster_id}|${b.node}|${b.vmid}`,C=l.get(u)||[],m=[...new Array(Math.max(0,rt-C.length)).fill(null),...C],_=C[C.length-1],P=b.status!=="running";return e.jsxs("div",{className:`hm-row ${P?"hm-row-dim":""}`,children:[e.jsx("span",{className:"hm-name",title:`${b.name} #${b.vmid} · ${b.node}`,children:b.name||`vm-${b.vmid}`}),e.jsx("div",{className:"hm-cells",children:m.map((O,B)=>e.jsx("span",{className:"hm-cell",style:{background:Jt(O)},title:O==null?`${b.name} · t-${rt-B} · —`:`${b.name} · t-${rt-B} · ${O.toFixed(1)}%`},B))}),e.jsx("span",{className:"hm-cur",style:{color:Jt(_)},children:_==null?"—":`${_.toFixed(0)}%`})]},u)})}),e.jsxs("div",{className:"hm-scale",children:[e.jsx("span",{className:"hm-scale-label",children:"SCALE:"}),e.jsx("span",{className:"hm-scale-label hm-scale-end",children:v==="zh-TW"?"IDLE":"LOW"}),[0,20,50,80,100].map(b=>e.jsx("span",{className:"hm-scale-cell",style:{background:Jt(b)}},b)),e.jsx("span",{className:"hm-scale-label hm-scale-end",children:v==="zh-TW"?"危險":"CRITICAL"})]}),e.jsx("style",{children:`
        .hm-wrap {
          position: relative;
          flex: 1;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          padding: 14px 18px;
          overflow: hidden;
          animation: neon-breathe 4s ease-in-out infinite;
          display: flex; flex-direction: column;
          min-height: 0;
        }
        .hm-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.55; pointer-events: none;
        }
        .hm-wrap::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
        }
        .hm-head {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--primary);
          text-shadow: none;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.18);
          margin-bottom: 10px;
        }
        .hm-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--primary); box-shadow: 0 0 6px var(--primary);
          animation: pulse 2.4s ease-in-out infinite;
        }
        .hm-title { white-space: nowrap; }
        .hm-meta {
          margin-left: auto;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-muted);
          padding: 2px 10px; border-radius: 999px;
          border: 1px solid rgba(0, 240, 255, 0.22);
          background: rgba(0, 240, 255, 0.04);
        }
        .hm-rows {
          flex: 1;
          overflow-y: auto; overflow-x: hidden;
          display: flex; flex-direction: column;
          gap: 0;
          padding: 4px 0;
          min-height: 0;
        }
        .hm-empty {
          padding: 24px;
          text-align: center;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-muted); font-style: italic;
        }
        .hm-row {
          display: grid;
          grid-template-columns: 140px 1fr 50px;
          gap: 10px;
          align-items: center;
          padding: 3px 0;
          border-bottom: 1px solid rgba(0, 240, 255, 0.06);
          transition: background 0.12s;
        }
        /* Subtle zebra so the eye can track a row across the 30 cells
           even when the cells themselves are tightly packed. */
        .hm-row:nth-child(odd)  { background: rgba(0, 240, 255, 0.018); }
        .hm-row:hover           { background: rgba(0, 240, 255, 0.07); }
        .hm-row-dim { opacity: 0.4; }
        .hm-name {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          padding-right: 4px;
        }
        .hm-cells {
          display: grid;
          grid-template-columns: repeat(${rt}, 1fr);
          gap: 2px;
          min-width: 0;
        }
        .hm-cell {
          aspect-ratio: 1 / 1;
          min-height: 14px; max-height: 18px;
          border-radius: 2px;
          transition: background 0.4s ease-out;
        }
        .hm-cur {
          font-family: var(--font-mono); font-size: 11px;
          font-variant-numeric: tabular-nums;
          text-align: right;
          text-shadow: 0 0 4px currentColor;
        }
        .hm-scale {
          display: flex; align-items: center; gap: 6px;
          padding-top: 10px;
          margin-top: 8px;
          border-top: 1px solid rgba(0, 240, 255, 0.15);
          font-family: var(--font-display); font-size: 10px;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-muted);
        }
        .hm-scale-end { opacity: .8; letter-spacing: .06em; }
        .hm-scale-cell {
          width: 18px; height: 14px;
          border-radius: 2px;
        }
        .hm-scale-tail { margin-left: 6px; color: var(--text-secondary); }
      `})]})}export{Ur as HoloMatrix,Zt as normaliseTags};
