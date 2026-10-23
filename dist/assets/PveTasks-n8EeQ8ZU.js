import{u as K,r,j as e,a as de}from"./index-HzkmC-WK.js";import{E as we}from"./VMExportModal-BcrDsH9u.js";import{C as q}from"./CyberSelect-BGKzR2ZN.js";const je={0:"crit",1:"crit",2:"crit",3:"err",4:"warn",5:"notice",6:"info",7:"debug"},ke=i=>{if(!i)return"—";const a=new Date(i*1e3),s=n=>String(n).padStart(2,"0");return`${s(a.getMonth()+1)}-${s(a.getDate())} ${s(a.getHours())}:${s(a.getMinutes())}:${s(a.getSeconds())}`};function Ne({open:i,onClose:a,clusterId:s}){const{t:n}=K(),[u,g]=r.useState([]),[w,m]=r.useState(!1),[S,j]=r.useState(null),[C,k]=r.useState(""),[v,h]=r.useState(!0),R=r.useRef(null),N=async()=>{if(s){m(!0),j(null);try{const o=await fetch(`/api/clusters/${encodeURIComponent(s)}/log?max=500`,{credentials:"same-origin"});if(!o.ok){const T=await o.json().catch(()=>({}));throw new Error(T.error||`HTTP ${o.status}`)}const b=await o.json();g(b.lines||[])}catch(o){j(o.message||String(o))}finally{m(!1)}}};r.useEffect(()=>{i&&N()},[i,s]),r.useEffect(()=>{if(!i||!v)return;const o=setInterval(N,5e3);return()=>clearInterval(o)},[i,v,s]);const M=C.trim().toLowerCase(),f=M?u.filter(o=>(o.msg||"").toLowerCase().includes(M)||(o.node||"").toLowerCase().includes(M)||(o.user||"").toLowerCase().includes(M)||(o.tag||"").toLowerCase().includes(M)):u;return i?e.jsx("div",{className:"cl-back",onClick:a,children:e.jsxs("div",{className:"cl-modal",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"cl-head",children:[e.jsxs("div",{className:"cl-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),e.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),e.jsx("span",{children:n("clog.title")})]}),e.jsxs("div",{className:"cl-actions",children:[e.jsx("input",{className:"cl-filter",value:C,onChange:o=>k(o.target.value),placeholder:n("clog.filter_ph")}),e.jsxs("label",{className:"cl-auto",children:[e.jsx("input",{type:"checkbox",checked:v,onChange:o=>h(o.target.checked)}),n("tasks.auto_refresh")]}),e.jsxs("button",{className:"cl-btn",onClick:N,disabled:w,children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("polyline",{points:"1 20 1 14 7 14"}),e.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),e.jsx("span",{children:n("tasks.refresh")})]}),e.jsx("button",{className:"cl-close",onClick:a,children:"×"})]})]}),e.jsx("div",{className:"cl-meta",children:e.jsxs("span",{children:[f.length,C&&` / ${u.length}`]})}),e.jsxs("div",{className:"cl-body",ref:R,children:[S&&e.jsx("div",{className:"cl-error",children:S}),f.length===0&&!w&&e.jsx("div",{className:"cl-empty",children:n(C?"clog.no_match":"clog.empty")}),f.map((o,b)=>e.jsxs("div",{className:`cl-row cl-pri-${je[o.pri??6]||"info"}`,children:[e.jsx("span",{className:"cl-time",children:ke(o.time)}),e.jsx("span",{className:"cl-node",children:o.node||"—"}),e.jsx("span",{className:"cl-user",children:o.user||""}),e.jsx("span",{className:"cl-tag",children:o.tag||""}),e.jsx("span",{className:"cl-msg",children:o.msg||""})]},o.n??b))]}),e.jsx("style",{children:`
          .cl-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .cl-modal { width: min(1200px, 96vw); height: 80vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: cl-in .18s ease-out; overflow: hidden; }
          @keyframes cl-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .cl-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .cl-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .cl-actions { display: flex; align-items: center; gap: 8px; }
          .cl-filter { padding: 5px 10px; min-width: 220px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .cl-filter:focus { border-color: var(--primary); }
          .cl-auto { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); cursor: pointer; }
          .cl-auto input { accent-color: var(--primary); }
          .cl-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .cl-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
          .cl-btn:disabled { opacity: .5; cursor: not-allowed; }
          .cl-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .cl-close:hover { color: var(--primary); }
          .cl-meta { padding: 6px 18px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.08); }

          .cl-body { flex: 1; overflow: auto; padding: 6px 12px; font-family: var(--font-mono); font-size: 13.5px; }
          .cl-empty { padding: 40px 12px; text-align: center; color: var(--text-muted); font-style: italic; }
          .cl-error { padding: 8px 14px; margin: 6px 0; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); border-radius: 2px; }

          .cl-row { display: grid; grid-template-columns: 90px 90px 130px 130px 1fr; gap: 10px; padding: 3px 8px; border-bottom: 1px solid rgba(0,240,255,.04); white-space: pre; }
          .cl-row:hover { background: rgba(0, 240, 255, 0.05); }
          .cl-time { color: var(--text-secondary); }
          .cl-node { color: var(--accent); }
          .cl-user { color: var(--primary); }
          .cl-tag  { color: var(--text-secondary); opacity: .85; }
          .cl-msg  { color: var(--text-primary); white-space: pre-wrap; word-break: break-all; }
          .cl-pri-crit  .cl-msg { color: var(--danger, #ff4d6d); }
          .cl-pri-err   .cl-msg { color: var(--danger, #ff4d6d); }
          .cl-pri-warn  .cl-msg { color: var(--warning); }
          .cl-pri-notice .cl-msg, .cl-pri-info .cl-msg { color: var(--text-primary); }
          .cl-pri-debug .cl-msg { color: var(--text-muted); }
        `})]})}):null}const me={running:"tasks.filter.running",ok:"tasks.filter.ok",error:"tasks.filter.error"},xe=(i,a)=>{if(!i)return"—";const n=(a??Math.floor(Date.now()/1e3))-i;if(n<0)return"—";if(n<60)return`${n}s`;if(n<3600)return`${Math.floor(n/60)}m ${n%60}s`;const u=Math.floor(n/3600),g=Math.floor(n%3600/60);return`${u}h ${g}m`},ue=i=>{if(!i)return"—";const a=new Date(i*1e3),s=n=>String(n).padStart(2,"0");return`${a.getFullYear()}-${s(a.getMonth()+1)}-${s(a.getDate())} ${s(a.getHours())}:${s(a.getMinutes())}:${s(a.getSeconds())}`},Se=()=>{if(typeof window>"u")return{vmid:"",cluster:null};const i=new URLSearchParams(window.location.search);return{vmid:i.get("vmid")||"",cluster:i.get("cluster")}};function Re({clusters:i,selectedCluster:a}){const{t:s,language:n}=K(),u=de(),g=r.useRef(Se()),w=r.useMemo(()=>Object.keys(i),[i]),[m,S]=r.useState(()=>g.current.cluster&&i[g.current.cluster]?g.current.cluster:a&&a!=="__all__"&&i[a]?a:w[0]||"");r.useEffect(()=>{!a||a==="__all__"||i[a]&&a!==m&&S(a)},[a]);const[j,C]=r.useState(""),[k,v]=r.useState("all"),[h,R]=r.useState(g.current.vmid),[N,M]=r.useState(""),[f,o]=r.useState([]),[b,T]=r.useState("starttime"),[E,D]=r.useState("desc"),_=t=>{b===t?D(l=>l==="asc"?"desc":"asc"):(T(t),D(t==="starttime"||t==="duration"?"desc":"asc"))},F=r.useMemo(()=>{const t=p=>(p.endtime||Math.floor(Date.now()/1e3))-(p.starttime||0),l={starttime:(p,x)=>(p.starttime||0)-(x.starttime||0),duration:(p,x)=>t(p)-t(x),type:(p,x)=>(p.type||"").localeCompare(x.type||""),id:(p,x)=>String(p.id||"").localeCompare(String(x.id||"")),node:(p,x)=>(p.node||"").localeCompare(x.node||""),user:(p,x)=>(p.user||"").localeCompare(x.user||""),status:(p,x)=>(p._status||"").localeCompare(x._status||"")},y=[...f];return y.sort((p,x)=>E==="asc"?l[b](p,x):l[b](x,p)),y},[f,b,E]),[H,J]=r.useState([]),[L,Q]=r.useState([]),[A,G]=r.useState(!1),[Z,ee]=r.useState(null),[X,he]=r.useState(!0),[W,te]=r.useState(null),[ge,ae]=r.useState(!1),[fe,se]=r.useState(!1),[P,be]=r.useState(()=>{try{const t=localStorage.getItem("jtp.tasks.rightPaneW"),l=t?parseInt(t,10):0;if(Number.isFinite(l)&&l>=280&&l<=1600)return l}catch{}return 480}),re=r.useRef(P);r.useEffect(()=>{re.current=P},[P]);const O=r.useRef(new Set),Y=r.useRef(new Map),ne=r.useRef(!0),oe=r.useRef(""),[ye,ie]=r.useState(new Set),[ve,le]=r.useState(new Set),B=r.useCallback(async(t=!1)=>{if(!m)return;G(!0),ee(null);const l=new URLSearchParams;j&&l.set("type",j),k!=="all"&&l.set("status",k),h&&l.set("vmid",h),N&&l.set("user",N),l.set("limit","300"),t&&l.set("force","1");try{const y=await fetch(`/api/clusters/${encodeURIComponent(m)}/tasks?`+l.toString(),{credentials:"same-origin"});if(!y.ok){const c=await y.json().catch(()=>({}));throw new Error(c.error||`HTTP ${y.status}`)}const p=await y.json(),x=p.tasks||[],z=new Map;for(const c of x)c.upid&&z.set(c.upid,c);const $=Array.from(z.values()).sort((c,U)=>(U.starttime||0)-(c.starttime||0)),d=new Set,I=new Set;if(!ne.current)for(const c of $)if(!O.current.has(c.upid))d.add(c.upid);else{const U=Y.current.get(c.upid);U&&U!==c._status&&I.add(c.upid)}for(const c of $)O.current.add(c.upid),Y.current.set(c.upid,c._status);O.current.size>5e3&&(O.current=new Set($.map(c=>c.upid)),Y.current=new Map($.map(c=>[c.upid,c._status]))),ne.current=!1;const V=$.map(c=>`${c.upid}|${c._status}|${c.endtime||""}`).join(";");V!==oe.current&&(oe.current=V,o($)),J(p.types||[]),Q(p.users||[]),d.size>0&&(ie(d),setTimeout(()=>ie(new Set),900)),I.size>0&&(le(I),setTimeout(()=>le(new Set),900))}catch(y){ee(y.message||String(y))}finally{G(!1)}},[m,j,k,h,N]);r.useEffect(()=>{B(!1)},[B]),r.useEffect(()=>{if(!X)return;const t=setInterval(()=>B(!0),15e3);return()=>clearInterval(t)},[X,B]);const ce=r.useMemo(()=>f.filter(t=>t._status==="running").length,[f]);return e.jsxs("div",{className:"pt-page",children:[e.jsxs("div",{className:"pt-header",children:[e.jsxs("div",{className:"pt-title-section",children:[e.jsxs("h1",{className:"pt-title font-display",children:[e.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),e.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),e.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),e.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),e.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),s("tasks.title")]}),e.jsx("div",{className:"pt-sub",children:s("tasks.subtitle")})]}),e.jsxs("div",{className:"pt-actions",children:[e.jsxs("label",{className:"pt-auto",children:[e.jsx("input",{type:"checkbox",checked:X,onChange:t=>he(t.target.checked)}),s("tasks.auto_refresh")]}),e.jsxs("button",{className:"pt-btn",onClick:()=>{const t=["starttime","endtime","duration_s","type","id","node","user","status","upid"],l=f.map(d=>[d.starttime?new Date(d.starttime*1e3).toISOString():"",d.endtime?new Date(d.endtime*1e3).toISOString():"",d.starttime&&d.endtime?String(d.endtime-d.starttime):"",d.type||"",d.id||"",d.node||"",d.user||"",d._status,d.upid]),y=d=>/[",\n]/.test(d)?'"'+d.replace(/"/g,'""')+'"':d,p=[t.join(","),...l.map(d=>d.map(y).join(","))].join(`
`),x=new Blob([p],{type:"text/csv;charset=utf-8"}),z=document.createElement("a");z.href=URL.createObjectURL(x);const $=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);z.download=`pve-tasks-${m}-${$}.csv`,document.body.appendChild(z),z.click(),z.remove(),setTimeout(()=>URL.revokeObjectURL(z.href),1e3)},disabled:f.length===0,children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),e.jsx("span",{children:"CSV"})]}),e.jsxs("button",{className:"pt-btn",onClick:()=>se(!0),children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),e.jsx("span",{children:s("export.jobs_title")})]}),e.jsxs("button",{className:"pt-btn",onClick:()=>ae(!0),children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),e.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),e.jsx("span",{children:s("clog.button")})]}),e.jsxs("button",{className:"pt-btn",onClick:()=>B(!0),disabled:A,children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("polyline",{points:"1 20 1 14 7 14"}),e.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),e.jsx("span",{children:s("tasks.refresh")})]})]})]}),e.jsx(Ne,{open:ge,clusterId:m,onClose:()=>ae(!1)}),e.jsx(we,{open:fe,clusterId:m,onClose:()=>se(!1)}),e.jsxs("div",{className:"pt-filters",children:[e.jsxs("label",{className:"pt-f",children:[e.jsx("span",{children:s("tasks.filter.cluster")}),e.jsx(q,{value:m,options:w.map(t=>{var l;return{value:t,label:((l=i[t])==null?void 0:l.name)||t}}),onChange:t=>S(t)})]}),e.jsxs("label",{className:"pt-f",children:[e.jsx("span",{children:s("tasks.filter.type")}),e.jsx(q,{value:j,options:[{value:"",label:s("tasks.filter.all")},...H.map(t=>({value:t,label:t}))],onChange:t=>C(t)})]}),e.jsxs("label",{className:"pt-f",children:[e.jsx("span",{children:s("tasks.filter.status")}),e.jsx(q,{value:k,options:[{value:"all",label:s("tasks.filter.all")},{value:"running",label:s("tasks.filter.running")},{value:"ok",label:s("tasks.filter.ok")},{value:"error",label:s("tasks.filter.error")}],onChange:t=>v(t)})]}),e.jsxs("label",{className:"pt-f",children:[e.jsx("span",{children:s("tasks.filter.vmid")}),e.jsx("input",{type:"text",inputMode:"numeric",value:h,onChange:t=>R(t.target.value.replace(/[^\d]/g,"")),placeholder:"e.g. 102"})]}),e.jsxs("label",{className:"pt-f",children:[e.jsx("span",{children:s("tasks.filter.user")}),e.jsx(q,{value:N,options:[{value:"",label:s("tasks.filter.all")},...L.map(t=>({value:t,label:t}))],onChange:t=>M(t)})]}),e.jsxs("span",{className:"pt-count",children:[f.length,ce>0&&` · ${ce} ${s("tasks.filter.running").toLowerCase()}`]})]}),Z&&e.jsx("div",{className:"pt-error",children:Z}),e.jsxs("div",{className:"pt-split panel-card",style:{gridTemplateColumns:`1fr 6px ${P}px`},children:[e.jsx("div",{className:"pt-tablewrap",children:e.jsxs("table",{className:"vm-table pt-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:[["starttime",s("tasks.col.starttime")],["duration",s("tasks.col.duration")],["type",s("tasks.col.type")],["id",s("tasks.col.target")],["node",s("tasks.col.node")],["user",s("tasks.col.user")],["status",s("tasks.col.status")]].map(([t,l])=>e.jsxs("th",{className:`sortable ${b===t?"sorted":""}`,onClick:()=>_(t),children:[e.jsx("span",{children:l}),b===t&&e.jsx("span",{className:"sort-indicator",children:E==="asc"?"▲":"▼"})]},t))})}),e.jsxs("tbody",{children:[f.length===0&&!A&&e.jsx("tr",{children:e.jsx("td",{colSpan:7,className:"pt-empty",children:s("tasks.empty")})}),F.map(t=>{const l=[t===W?"active":"",ye.has(t.upid)?"pt-new":""].filter(Boolean).join(" "),y=["pt-st",`pt-st-${t._status}`,ve.has(t.upid)?"pt-st-pulse":""].join(" ");return e.jsxs("tr",{className:l,onClick:()=>te(t),children:[e.jsx("td",{className:"pt-mono",children:ue(t.starttime)}),e.jsx("td",{className:"pt-mono",children:xe(t.starttime,t.endtime)}),e.jsx("td",{children:e.jsx("span",{className:`pt-type pt-type-${t.type}`,children:t.type})}),e.jsx("td",{className:"pt-mono",children:t.id||"—"}),e.jsx("td",{className:"pt-mono",children:t.node}),e.jsx("td",{className:"pt-mono",children:t.user||"—"}),e.jsx("td",{children:e.jsx("span",{className:y,children:s(me[t._status]||"tasks.filter.all")})})]},t.upid)})]})]})}),e.jsx("div",{className:"pt-split-handle",role:"separator","aria-orientation":"vertical",title:n==="zh-TW"?"拖曳調整左右寬度":"Drag to resize",onMouseDown:t=>{var I;t.preventDefault();const l=t.clientX,y=P,p=((I=t.currentTarget.parentElement)==null?void 0:I.clientWidth)||1200,x=280,z=Math.max(x,p-360),$=V=>{const c=l-V.clientX,U=Math.max(x,Math.min(z,y+c));be(U)},d=()=>{window.removeEventListener("mousemove",$),window.removeEventListener("mouseup",d);try{localStorage.setItem("jtp.tasks.rightPaneW",String(re.current))}catch{}};window.addEventListener("mousemove",$),window.addEventListener("mouseup",d)}}),e.jsx("aside",{className:"pt-detail",children:W?e.jsx(Ce,{clusterId:m,task:W,onClose:()=>te(null),onCopyUpid:async()=>{try{await navigator.clipboard.writeText(W.upid),u.alert(n==="zh-TW"?"UPID 已複製":"UPID copied")}catch{}}},W.upid):e.jsxs("div",{className:"pt-detail-empty",children:[e.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),e.jsx("path",{d:"M9 9h6M9 13h6M9 17h4"})]}),e.jsx("div",{className:"pt-detail-empty-title",children:s("tasks.detail.empty_title")}),e.jsx("div",{className:"pt-detail-empty-sub",children:s("tasks.detail.empty_sub")})]})})]}),e.jsx("style",{children:`
        .pt-page {
          padding: 24px 32px;
          height: 100%;
          display: flex; flex-direction: column;
          gap: 16px;
          color: var(--text-primary);
        }
        .pt-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px;
          margin-bottom: var(--spacing-lg);
          flex-wrap: wrap;
        }
        .pt-title-section {
          display: flex; flex-direction: column; gap: 2px;
        }
        /* Title visual matches HoloMatrix / RadarScan / Storage etc. —
           font-display 22 px, primary text colour, big letter-spacing,
           inline cyan icon with drop-shadow glow + pulse. */
        .pt-title {
          display: flex; align-items: center; gap: var(--spacing-sm);
          margin: 0;
          font-size: 22px; font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }
        .pt-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: pt-title-pulse 2s ease-in-out infinite;
        }
        @keyframes pt-title-pulse {
          0%, 100% { opacity: 0.85; transform: none; }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        .pt-sub {
          font-size: 12px; color: var(--text-secondary);
          font-family: var(--font-mono);
          margin-top: 4px;
        }
        .pt-actions { display: flex; gap: 12px; align-items: center; }
        .pt-auto {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); font-family: var(--font-display);
          cursor: pointer;
        }
        .pt-auto input { accent-color: var(--primary); }
        .pt-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 4px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.4);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: background var(--transition-fast);
        }
        .pt-btn.pt-btn-nowrap { white-space: nowrap; flex-shrink: 0; }
        .pt-btn.pt-btn-danger { color: var(--danger, #ff4d6d); border-color: rgba(255, 77, 109, .5); background: rgba(255, 77, 109, .08); }
        .pt-btn.pt-btn-danger:hover { background: rgba(255, 77, 109, .15); }
        .pt-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
        .pt-btn:disabled { opacity: .5; cursor: not-allowed; }

        .pt-filters {
          display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: flex-end;
          padding: 12px 14px;
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.12);
          border-radius: 4px;
        }
        .pt-f {
          display: flex; flex-direction: column; gap: 4px;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); font-family: var(--font-display);
        }
        /* Same FIXED height on the dropdown trigger and the free-text
           input — padding/font mirroring alone kept drifting because the
           CJK line box inside the trigger is taller than the latin
           placeholder's. One explicit height ends the argument. */
        .pt-filters .cyber-select-trigger,
        .pt-f input {
          height: 40px;
          box-sizing: border-box;
        }
        /* Filters are all CyberSelect now; the native <select> rules that used
           to live here were dead and carried a duplicate border-radius. */
        .pt-f input {
          padding: 9px 12px; min-width: 140px;
          font-family: var(--font-mono); font-size: 15px;
          letter-spacing: .03em;
          background: rgba(0, 240, 255, 0.04);
          color: var(--text-primary);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 3px;
          outline: none;
        }
        .pt-f input:focus {
          border-color: var(--primary);
        }
        .pt-count {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary); margin-left: auto;
        }
        .pt-error {
          padding: 8px 14px;
          border: 1px solid var(--danger, #ff4d6d);
          border-left-width: 3px;
          background: rgba(255, 77, 109, 0.08);
          color: var(--danger, #ff4d6d);
          font-family: var(--font-mono); font-size: 12px;
          border-radius: 2px;
        }

        .pt-split {
          flex: 1; min-height: 0;
          display: grid;
          /* Inline style sets gridTemplateColumns: 1fr 6px <Npx>. The
           * media queries below override on narrow viewports. */
          gap: 0;
        }
        /* Drop the panel-card top hairline + scan-line on THIS card: the
         * table's sticky thead (opaque bg) paints over them on the left
         * half but not over the detail pane on the right, so the top
         * edge looked thicker on one side. The plain 1px card border is
         * uniform on all four sides. */
        .pt-split::before, .pt-split::after { display: none; }
        .pt-split-handle {
          width: 6px;
          cursor: col-resize;
          background: linear-gradient(180deg,
            rgba(0, 240, 255, 0.06) 0%,
            rgba(0, 240, 255, 0.18) 50%,
            rgba(0, 240, 255, 0.06) 100%);
          border-left: 1px solid rgba(0, 240, 255, 0.12);
          border-right: 1px solid rgba(0, 240, 255, 0.12);
          transition: background .12s;
          flex-shrink: 0;
        }
        .pt-split-handle:hover,
        .pt-split-handle:active {
          background: linear-gradient(180deg,
            rgba(0, 240, 255, 0.12) 0%,
            rgba(0, 240, 255, 0.45) 50%,
            rgba(0, 240, 255, 0.12) 100%);
        }
        @media (max-width: 850px) {
          /* On narrow viewports stack: table on top, detail below.
           * Detail still always visible; drag handle is hidden because
           * a vertical handle would conflict with vertical scroll. */
          .pt-split { grid-template-columns: 1fr !important; grid-auto-rows: minmax(220px, auto); gap: 14px; }
          .pt-split-handle { display: none; }
        }
        /* Inner panes — no border/background of their own; the parent
         * .pt-split.panel-card supplies the cyan-rim surround so the
         * whole table+detail area reads as one unified card. */
        .pt-tablewrap {
          flex: 1; overflow: auto;
          background: transparent;
          min-height: 0;
        }
        .pt-detail {
          background: transparent;
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .pt-detail-empty {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; padding: 24px;
          color: var(--text-muted);
          text-align: center;
        }
        .pt-detail-empty svg { stroke: var(--primary-dim, #00c0cc); opacity: .55; }
        .pt-detail-empty-title {
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-secondary);
        }
        .pt-detail-empty-sub {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-muted); max-width: 280px; line-height: 1.5;
        }
        /* Row + cell look inherited from the global .vm-table standard
           (matrix). Only the cell whitespace rule is task-specific. */
        .pt-table td { white-space: nowrap; }
        .pt-mono { font-family: var(--font-mono); }
        .pt-empty {
          text-align: center; padding: 24px;
          color: var(--text-muted); font-style: italic;
        }
        .pt-type {
          display: inline-block; padding: 2px 8px; border-radius: 2px;
          font-size: 11px; font-family: var(--font-display);
          letter-spacing: 0.05em; text-transform: uppercase;
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.3);
          color: var(--primary);
        }
        /* Tint per-type so the eye picks them out at a glance. */
        .pt-type-qmstart, .pt-type-vzstart {
          color: var(--success); border-color: rgba(0, 255, 136, 0.4);
          background: rgba(0, 255, 136, 0.06);
        }
        .pt-type-qmshutdown, .pt-type-qmstop, .pt-type-vzstop {
          color: var(--warning); border-color: rgba(255, 107, 0, 0.4);
          background: rgba(255, 107, 0, 0.06);
        }
        .pt-type-vzdump, .pt-type-qmsnapshot {
          color: var(--accent); border-color: rgba(224, 102, 255, 0.4);
          background: rgba(224, 102, 255, 0.06);
        }
        .pt-type-qmigrate, .pt-type-relocate {
          color: #ffe066; border-color: rgba(255, 224, 102, 0.4);
          background: rgba(255, 224, 102, 0.06);
        }
        .pt-st {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 2px 8px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono);
          border: 1px solid currentColor;
        }
        .pt-st::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 6px currentColor;
        }
        .pt-st-running { color: var(--warning); }
        .pt-st-ok { color: var(--success); }
        .pt-st-error { color: var(--danger, #ff4d6d); }

        /* Arrival animation for newly-seen UPIDs only — diffed in reload().
           Slide down from -8px while a cyan wash fades from inset 0 12px to
           transparent so the eye picks up the row entering, then settles. */
        @keyframes pt-row-in {
          0%   { opacity: 0; transform: translateY(-8px);
                 box-shadow: inset 0 0 0 1px rgba(0, 240, 255, 0.7),
                             inset 4px 0 0 var(--primary); }
          60%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: none;
                 box-shadow: inset 0 0 0 1px transparent; }
        }
        .pt-table tbody tr.pt-new {
          animation: pt-row-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .pt-table tbody tr.pt-new td:first-child {
          /* Subtle cyan wash on the timestamp cell so the row's "newness"
             reads even after the slide settles. Decays via animation. */
          animation: pt-cell-flash 0.8s ease-out both;
        }
        @keyframes pt-cell-flash {
          0%   { background: rgba(0, 240, 255, 0.22); }
          100% { background: transparent; }
        }

        /* Status-pill pulse — fires when the SAME UPID's status changes
           (running → ok / error). Brief glow ring so the operator's eye
           catches the in-place transition without the row re-arriving. */
        @keyframes pt-st-pulse {
          0%   { box-shadow: 0 0 0 0 currentColor, 0 0 12px currentColor; transform: scale(1); }
          50%  { box-shadow: 0 0 0 6px transparent, 0 0 20px currentColor; transform: scale(1.1); }
          100% { box-shadow: 0 0 0 0 transparent, 0 0 0 transparent; transform: none; }
        }
        .pt-st.pt-st-pulse {
          animation: pt-st-pulse 0.7s ease-out both;
        }
      `})]})}function Ce({clusterId:i,task:a,onClose:s,onCopyUpid:n}){const{t:u,language:g}=K(),w=de(),[m,S]=r.useState([]),j=r.useRef(null),[C,k]=r.useState(!0),[v,h]=r.useState(null),[R,N]=r.useState(null),M=a._status==="running";return r.useEffect(()=>{let f=!0;const o=async()=>{try{k(!0);const T=encodeURIComponent(a.upid),E=encodeURIComponent(a.node),D=encodeURIComponent(i),[_,F]=await Promise.all([fetch(`/api/clusters/${D}/nodes/${E}/tasks/${T}/log?limit=2000`,{credentials:"same-origin"}),fetch(`/api/clusters/${D}/nodes/${E}/tasks/${T}/status`,{credentials:"same-origin"})]);if(!f)return;if(_.ok){const J=((await _.json()).lines||[]).map(A=>A.t||"").filter(Boolean),L=window.getSelection();!!(L&&!L.isCollapsed&&j.current&&L.anchorNode&&j.current.contains(L.anchorNode))||S(J)}else{const H=await _.json().catch(()=>({}));throw new Error(H.error||`HTTP ${_.status}`)}F.ok&&N(await F.json())}catch(T){f&&h(T.message||String(T))}finally{f&&k(!1)}};o();const b=M?setInterval(o,2500):null;return()=>{f=!1,b&&clearInterval(b)}},[a.upid,a.node,i,M]),e.jsxs("div",{className:"pt-panel",children:[e.jsxs("div",{className:"pt-panel-head",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"pt-panel-title",children:[e.jsx("span",{className:`pt-type pt-type-${a.type}`,children:a.type}),e.jsx("span",{className:"pt-mono",children:a.id||""}),e.jsx("span",{className:`pt-st pt-st-${a._status}`,children:u(me[a._status]||"tasks.filter.all")})]}),e.jsx("div",{className:"pt-panel-sub",children:e.jsx("code",{className:"pt-upid",children:a.upid})}),e.jsxs("div",{className:"pt-panel-actions",children:[a._status==="running"&&e.jsx("button",{className:"pt-btn pt-btn-danger pt-btn-nowrap",onClick:async()=>{if(await w.confirm(g==="zh-TW"?"中止此 PVE 作業？作業可能會以中斷狀態結束。":"Stop this PVE task? It may end in an aborted state.",{title:g==="zh-TW"?"中止作業？":"Stop task?",destructive:!0}))try{const o=await fetch(`/api/clusters/${encodeURIComponent(i)}/nodes/${encodeURIComponent(a.node)}/tasks/${encodeURIComponent(a.upid)}`,{method:"DELETE",credentials:"same-origin"}),b=await o.json().catch(()=>({}));if(!o.ok||!b.ok)throw new Error(b.detail||b.error||`HTTP ${o.status}`)}catch(o){await w.alert(`Stop failed: ${o.message||o}`)}},children:e.jsx("span",{children:g==="zh-TW"?"中止":"Stop"})}),e.jsxs("button",{className:"pt-btn pt-btn-nowrap",onClick:n,children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),e.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),e.jsx("span",{children:u("tasks.copy_upid")})]}),e.jsxs("button",{className:"pt-btn pt-btn-nowrap",onClick:async()=>{try{await navigator.clipboard.writeText(m.join(`
`)),w.alert(g==="zh-TW"?"記錄已複製":"Log copied")}catch{}},disabled:m.length===0,children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),e.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),e.jsx("span",{children:g==="zh-TW"?"複製記錄":"Copy log"})]})]})]}),e.jsx("button",{className:"pt-panel-close",onClick:s,"aria-label":"clear selection",title:"clear",children:"×"})]}),e.jsxs("div",{className:"pt-panel-meta",children:[e.jsxs("span",{children:[e.jsx("span",{className:"lbl",children:u("tasks.col.node")})," ",a.node]}),e.jsxs("span",{children:[e.jsx("span",{className:"lbl",children:u("tasks.col.user")})," ",a.user||"—"]}),e.jsxs("span",{children:[e.jsx("span",{className:"lbl",children:u("tasks.col.starttime")})," ",ue(a.starttime)]}),e.jsxs("span",{children:[e.jsx("span",{className:"lbl",children:u("tasks.col.duration")})," ",xe(a.starttime,a.endtime)]})]}),e.jsx(ze,{task:a,lines:m}),e.jsxs("div",{className:"pt-panel-log",ref:j,children:[C&&m.length===0&&e.jsx("div",{className:"pt-loading",children:u("tasks.log_loading")}),v&&e.jsx("div",{className:"pt-error",children:v}),m.length===0&&!C&&!v&&e.jsx("div",{className:"pt-loading",children:u("tasks.log_empty")}),m.length>0&&e.jsx("pre",{children:m.join(`
`)})]}),e.jsx("style",{children:`
        .pt-panel {
          height: 100%;
          display: flex; flex-direction: column;
          animation: ptFade .12s ease-out;
        }
        @keyframes ptFade { from { opacity: 0; } to { opacity: 1; } }
        /* Head visual matches the vm-table thead treatment (cyan gradient
           strip) so the detail pane reads as part of the same family as
           the matrix. */
        .pt-panel-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 14px 16px; gap: 14px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.16);
          background: linear-gradient(180deg, rgba(0, 240, 255, 0.08), rgba(0, 240, 255, 0.0));
        }
        .pt-panel-head > div:first-child { flex: 1; min-width: 0; }
        .pt-panel-title {
          display: flex; gap: 10px; align-items: center;
          font-size: 14px;
          font-family: var(--font-mono);
          color: var(--text-primary);
        }
        .pt-panel-sub {
          margin-top: 10px;
          display: flex; gap: 8px; align-items: center;
        }
        /* Actions on their own row — the buttons NEVER share a line with
           the (long) UPID, so they can't get squeezed into two-line text. */
        .pt-panel-actions {
          margin-top: 8px;
          display: flex; gap: 8px; align-items: center;
        }
        .pt-upid {
          flex: 1; min-width: 0;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary);
          padding: 5px 10px; border: 1px solid rgba(0, 240, 255, 0.18);
          border-radius: 2px;
          background: rgba(0, 240, 255, 0.03);
          overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .pt-panel-close {
          background: transparent; border: none; color: var(--text-secondary);
          font-size: 24px; cursor: pointer; padding: 0 8px; line-height: 1;
        }
        .pt-panel-close:hover { color: var(--primary); }
        .pt-panel-meta {
          display: flex; flex-wrap: wrap; gap: 8px 18px;
          padding: 10px 16px;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-primary);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
        }
        .pt-panel-meta .lbl {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); margin-right: 4px;
        }
        .pt-panel-log {
          flex: 1; overflow: auto;
          padding: 12px 16px;
          font-family: var(--font-mono); font-size: 13px;
          line-height: 1.6;
        }
        .pt-panel-log pre {
          margin: 0; white-space: pre-wrap; word-break: break-all;
          color: var(--text-primary);
        }
        .pt-loading {
          color: var(--text-muted); font-style: italic;
          font-family: var(--font-mono); font-size: 12px;
        }
      `})]})}function ze({task:i,lines:a}){const s=/migr/i.test(i.type||""),n=r.useMemo(()=>{if(!s||a.length===0)return null;let g=null,w=null,m=null,S=null,j=null,C=null;for(let k=a.length-1;k>=0&&k>a.length-60;k--){const v=a[k];if(g===null){const h=v.match(/transferred ([\d.]+ ?\w+) of ([\d.]+ ?\w+)/i);if(h){j=h[1].trim(),C=h[2].trim();const R=pe(h[1]),N=pe(h[2]);R!==null&&N!==null&&N>0&&(g=Math.min(100,Math.max(0,R/N*100)))}}if(w===null){const h=v.match(/migration speed: ([\d.]+ ?\w+\/s)/i);h&&(w=h[1])}if(m===null){const h=v.match(/downtime ?: ?([\d.]+ ?\w+)/i);h&&(m=h[1])}S===null&&(/migration completed/i.test(v)?S="completed":/migration aborted|migration failed/i.test(v)&&(S="failed"))}return g===null&&S===null&&w===null?null:{pct:g,speed:w,downtime:m,phase:S,bytesNow:j,bytesTotal:C}},[s,a]);if(!n)return null;const u=n.phase==="completed"?"ok":n.phase==="failed"?"bad":"live";return e.jsxs("div",{className:"mig-prog",children:[e.jsxs("div",{className:"mig-prog-bar",children:[e.jsx("div",{className:"mig-prog-fill",style:{width:`${n.pct??(n.phase==="completed"?100:0)}%`}}),e.jsx("span",{className:"mig-prog-pct",children:n.pct!==null?`${n.pct.toFixed(1)}%`:n.phase||"…"})]}),e.jsxs("div",{className:"mig-prog-meta",children:[n.bytesNow&&e.jsxs("span",{children:[e.jsx("span",{className:"lbl",children:"transferred"})," ",n.bytesNow," / ",n.bytesTotal]}),n.speed&&e.jsxs("span",{children:[e.jsx("span",{className:"lbl",children:"speed"})," ",n.speed]}),n.downtime&&e.jsxs("span",{children:[e.jsx("span",{className:"lbl",children:"downtime"})," ",n.downtime]}),n.phase&&e.jsx("span",{className:`mig-phase ${u}`,children:n.phase})]}),e.jsx("style",{children:`
        .mig-prog { padding: 10px 16px; border-bottom: 1px solid rgba(0,240,255,.08); background: rgba(0,240,255,.04); }
        .mig-prog-bar { position: relative; height: 14px; background: rgba(0,240,255,.08); border: 1px solid rgba(0,240,255,.2); border-radius: 2px; overflow: hidden; }
        .mig-prog-fill { height: 100%; background: linear-gradient(90deg, rgba(0,240,255,.4), var(--primary)); transition: width .3s ease-out; box-shadow: 0 0 6px rgba(0,240,255,.5) inset; }
        .mig-prog-pct { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 11px; color: var(--text-primary); text-shadow: 0 0 2px rgba(0,0,0,.8); }
        .mig-prog-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; padding-top: 8px; font-family: var(--font-mono); font-size: 11px; color: var(--text-primary); }
        .mig-prog-meta .lbl { font-family: var(--font-display); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); margin-right: 4px; }
        .mig-phase { padding: 1px 8px; border-radius: 999px; border: 1px solid currentColor; font-size: 10px; }
        .mig-phase.ok { color: var(--success); }
        .mig-phase.bad { color: var(--danger, #ff4d6d); }
        .mig-phase.live { color: var(--warning); }
      `})]})}function pe(i){const a=i.trim().match(/^([\d.]+) ?(\w+)?/);if(!a)return null;const s=parseFloat(a[1]);if(!Number.isFinite(s))return null;const n=(a[2]||"B").toLowerCase(),u={b:1,kb:1e3,kib:1024,mb:1e6,mib:1024**2,gb:1e9,gib:1024**3,tb:1e12,tib:1024**4};return s*(u[n]??1)}export{Re as PveTasks};
