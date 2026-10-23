import{u as V,r as l,j as e,a as fe,k as pe,l as de,e as Ie,R as Te}from"./index-HzkmC-WK.js";import{C as ee}from"./CyberSelect-BGKzR2ZN.js";const Le=8e3,Ne=["preflight","cloning","bootloader","attaching","resilvering","awaiting_detach","detaching","cleaning","done"];function je(s){const n=Ne.indexOf(s);return n<0?0:n}function we(s){return new Date(s*1e3).toLocaleTimeString()}function Ae(s,n,a){const d=Math.max(0,n-s),c=Math.floor(d/3600),t=Math.floor(d%3600/60);return c?`${c} ${a("zfs.bm.hours")} ${t} ${a("zfs.bm.minutes")}`:`${t} ${a("zfs.bm.minutes")}`}function Ee({ok:s,fatal:n}){return s?e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M3 8.5l3.2 3.2L13 5",stroke:"#38e8a0",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}):n?e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M4 4l8 8M12 4l-8 8",stroke:"#ff5c7a",strokeWidth:"2",strokeLinecap:"round"})}):e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",children:[e.jsx("path",{d:"M8 2l6.5 11.5h-13L8 2z",stroke:"#ffc04d",strokeWidth:"1.6",strokeLinejoin:"round"}),e.jsx("path",{d:"M8 6.5v3.2",stroke:"#ffc04d",strokeWidth:"1.6",strokeLinecap:"round"})]})}function Oe({pre:s}){const{t:n}=V(),a=(d,c,t)=>e.jsxs("div",{className:`bm-chip ${t}`,children:[e.jsx("div",{className:"bm-chip-role",children:d}),e.jsx("div",{className:"bm-chip-name",title:c||"",children:c||"—"})]});return e.jsxs("div",{className:"bm-topo",children:[a(n("zfs.bm.roleSource"),s.source_disk,"ok"),e.jsx("div",{className:"bm-arrow","aria-hidden":"true",children:e.jsx("svg",{width:"34",height:"12",viewBox:"0 0 34 12",fill:"none",children:e.jsx("path",{d:"M0 6h27M22 1.5L28 6l-6 4.5",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),a(n("zfs.bm.roleNew"),s.new_disk,"new"),s.old_disk&&s.scenario!=="add_mirror"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"bm-sep","aria-hidden":"true"}),a(n("zfs.bm.roleOld"),s.old_disk,"gone")]})]})}function De({job:s}){const{t:n}=V(),a=je(s.stage),d=s.status==="failed"||s.status==="aborted",c=Ne.filter(t=>t!=="detaching"&&t!=="cleaning");return e.jsx("div",{className:"bm-rail",children:c.map(t=>{const m=je(t),h=d&&m===a?"fail":m<a?"done":m===a?"live":"todo";return e.jsxs("div",{className:`bm-rail-step ${h}`,children:[e.jsx("span",{className:"bm-rail-dot"}),e.jsx("span",{className:"bm-rail-label",children:n(`zfs.bm.stage.${t}`)})]},t)})})}function Re({cid:s,node:n,freeDisks:a,onClose:d,onChanged:c}){const{t}=V(),[m,h]=l.useState(!0),[i,k]=l.useState(null),[b,u]=l.useState(null),[g,M]=l.useState(void 0),[z,L]=l.useState(""),[$,O]=l.useState(""),[y,U]=l.useState(null),[j,A]=l.useState(""),[S,J]=l.useState(!1),[B,v]=l.useState(!1),[w,f]=l.useState(""),[I,_]=l.useState(""),D=l.useRef(null),F=`/api/clusters/${encodeURIComponent(s)}`,W=`${F}/nodes/${encodeURIComponent(n)}/zfs/boot-mirror`,H=l.useCallback(async()=>{try{const o=await fetch(W,{credentials:"same-origin"}),C=await o.json().catch(()=>({}));if(!o.ok){f(C.detail||C.error||`HTTP ${o.status}`),_(C.error||""),M(void 0);return}M(C.root_pool??null),_(""),u(C.pool||null),k(C.active_job||null),f("")}catch(o){f(String((o==null?void 0:o.message)||o))}finally{h(!1)}},[W]);l.useEffect(()=>{H()},[H]),l.useEffect(()=>{if(!(i&&i.status==="running")){D.current&&(window.clearInterval(D.current),D.current=null);return}return D.current=window.setInterval(H,Le),()=>{D.current&&(window.clearInterval(D.current),D.current=null)}},[i==null?void 0:i.status,i==null?void 0:i.id,H]);const te=l.useCallback(async()=>{if(z){v(!0),f(""),U(null);try{const o=await fetch(`${W}/preflight`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({pool:g||"rpool",new_disk:z,old_disk:$||null})}),C=await o.json().catch(()=>({}));!o.ok&&!C.checks?f(C.detail||C.error||`HTTP ${o.status}`):U(C)}catch(o){f(String((o==null?void 0:o.message)||o))}v(!1)}},[W,z,$,g]);l.useEffect(()=>{U(null),A(""),J(!1)},[z,$]);const Z=l.useCallback(async()=>{if(y){v(!0),f("");try{const o=await fetch(`${W}/start`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({pool:y.pool,new_disk:y.new_disk,old_disk:$||null,confirm_pool:j,acknowledge_backup:S})}),C=await o.json().catch(()=>({}));o.ok?(U(null),await H(),c==null||c()):f(C.detail||C.error||`HTTP ${o.status}`)}catch(o){f(String((o==null?void 0:o.message)||o))}v(!1)}},[W,y,$,j,S,H,c]),Y=l.useCallback(async()=>{if(i){v(!0),f("");try{const o=await fetch(`${F}/zfs/boot-mirror/${i.id}/detach`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({confirm_pool:i.pool})}),C=await o.json().catch(()=>({}));o.ok||f(C.detail||C.error||`HTTP ${o.status}`),await H(),c==null||c()}catch(o){f(String((o==null?void 0:o.message)||o))}v(!1)}},[F,i,H,c]);if(m)return e.jsx("div",{className:"bm-wait",children:t("zfs.loading")});if(g===void 0)return e.jsxs("div",{className:"bm-note warn",children:[e.jsx("div",{children:t("zfs.bm.cannotDetermine")}),w&&e.jsx("div",{className:"bm-note-detail",children:w}),I==="ssh_failed"&&e.jsx("div",{className:"bm-note-detail",children:t("zfs.bm.needsSsh")})]});if(!g)return e.jsx("div",{className:"bm-note warn",children:t("zfs.bm.notZfsRoot")});if(i){const o=i.status==="running",C=i.stage==="resilvering",R=i.stage==="awaiting_detach",K=!i.old_disk;return e.jsxs("div",{className:"bm",children:[e.jsxs("div",{className:"bm-job-head",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"bm-job-title",children:[t(`zfs.bm.scenario.${i.scenario}`)," · ",i.pool," @ ",i.node]}),e.jsxs("div",{className:"bm-job-sub",children:[t("zfs.bm.startedBy")," ",i.created_by||"—"," ·"," ",we(i.created_at)," ·"," ",t("zfs.bm.elapsed")," ",Ae(i.created_at,i.finished_at||Math.floor(Date.now()/1e3),t)]})]}),e.jsx("span",{className:`bm-status ${i.status}`,children:t(`zfs.bm.status.${i.status}`)})]}),e.jsx(De,{job:i}),C&&e.jsxs("div",{className:"bm-progress",children:[e.jsxs("div",{className:"bm-progress-top",children:[e.jsx("span",{children:t("zfs.bm.resilverProgress")}),e.jsxs("span",{className:"bm-pct",children:[i.progress.toFixed(1),"%"]})]}),e.jsx("div",{className:"bm-bar",children:e.jsx("i",{style:{width:`${Math.min(100,i.progress)}%`}})}),e.jsx("div",{className:"bm-note",children:t("zfs.bm.safeToLeave")})]}),R&&!K&&e.jsxs("div",{className:"bm-gate ok",children:[e.jsx("div",{className:"bm-gate-title",children:t("zfs.bm.resilverDone")}),e.jsx("div",{className:"bm-gate-body",children:t("zfs.bm.detachExplain")}),e.jsxs("button",{className:"bm-btn danger",disabled:B,onClick:Y,children:[t("zfs.bm.detachOld")," — ",i.old_disk]})]}),R&&K&&e.jsxs("div",{className:"bm-gate ok",children:[e.jsx("div",{className:"bm-gate-title",children:t("zfs.bm.mirrorComplete")}),e.jsx("div",{className:"bm-gate-body",children:t("zfs.bm.rebootAdvice")})]}),i.status==="done"&&e.jsxs("div",{className:"bm-gate ok",children:[e.jsx("div",{className:"bm-gate-title",children:t("zfs.bm.allDone")}),e.jsx("div",{className:"bm-gate-body",children:t("zfs.bm.rebootAdvice")})]}),i.status==="failed"&&e.jsxs("div",{className:"bm-gate bad",children:[e.jsx("div",{className:"bm-gate-title",children:t("zfs.bm.failed")}),e.jsx("div",{className:"bm-gate-body",children:t("zfs.bm.failedAdvice")})]}),e.jsx("div",{className:"bm-timeline-head",children:t("zfs.bm.timeline")}),e.jsx("div",{className:"bm-timeline",children:i.events.map((le,ue)=>e.jsxs("div",{className:`bm-ev ${le.kind}`,children:[e.jsx("span",{className:"bm-ev-ts",children:we(le.ts)}),e.jsx("span",{className:"bm-ev-msg",children:le.message})]},ue))}),w&&e.jsx("div",{className:"bm-err",children:w}),o&&e.jsx("div",{className:"bm-foot",children:e.jsx("span",{className:"bm-poll",children:t("zfs.bm.autoRefresh")})})]})}const Q=(b==null?void 0:b.members)||[],se=Q.filter(o=>!["ONLINE"].includes((o.state||"").toUpperCase())),ne=a.map(o=>({value:o.by_id,label:`${o.by_id}${o.model?` · ${o.model}`:""}`})),ie=[{value:"",label:t("zfs.bm.oldNone")},...Q.map(o=>({value:o.by_id.replace(/-part\d+$/,""),label:`${o.by_id.replace(/-part\d+$/,"")} · ${o.state}`}))],oe=y?y.blocking.filter(o=>!(o==="guest_backups"&&S)):["preflight"],G=!!y&&oe.length===0&&j===y.pool&&!B;return e.jsxs("div",{className:"bm",children:[e.jsxs("div",{className:"bm-intro",children:[e.jsx("div",{className:"bm-intro-title",children:t("zfs.bm.introTitle")}),e.jsx("div",{className:"bm-intro-body",children:t("zfs.bm.introBody")})]}),b&&e.jsxs("div",{className:"bm-current",children:[e.jsx("span",{className:"bm-current-label",children:t("zfs.bm.currentLayout")}),e.jsx("span",{className:`bm-pool-state ${b.state.toLowerCase()}`,children:b.state}),e.jsx("span",{className:"bm-current-kind",children:b.is_mirror?t("zfs.bm.isMirror"):t("zfs.bm.isSingle")}),e.jsx("div",{className:"bm-members",children:Q.map(o=>e.jsx("span",{className:`bm-member ${o.state.toLowerCase()}`,title:o.by_id,children:o.by_id.replace(/-part\d+$/,"")},o.by_id))})]}),se.length>0&&e.jsx("div",{className:"bm-note warn",children:t("zfs.bm.faultedDetected")}),e.jsxs("div",{className:"bm-field",children:[e.jsx("label",{children:t("zfs.bm.pickNew")}),e.jsx(ee,{value:z,options:ne,onChange:L,placeholder:t("zfs.bm.pickNewPlaceholder")}),a.length===0&&e.jsx("div",{className:"bm-hint",children:t("zfs.bm.noFreeDisks")})]}),se.length===0&&Q.length>1&&e.jsxs("div",{className:"bm-field",children:[e.jsx("label",{children:t("zfs.bm.pickOld")}),e.jsx(ee,{value:$,options:ie,onChange:O}),e.jsx("div",{className:"bm-hint",children:t("zfs.bm.pickOldHint")})]}),e.jsx("button",{className:"bm-btn",disabled:!z||B,onClick:te,children:t(B?"zfs.bm.checking":"zfs.bm.runPreflight")}),w&&e.jsx("div",{className:"bm-err",children:w}),y&&e.jsxs("div",{className:"bm-pre",children:[e.jsxs("div",{className:"bm-pre-head",children:[e.jsx("span",{children:t("zfs.bm.preflightResult")}),e.jsx("span",{className:`bm-scenario ${y.scenario}`,children:t(`zfs.bm.scenario.${y.scenario}`)})]}),e.jsx(Oe,{pre:y}),e.jsx("div",{className:"bm-checks",children:y.checks.map(o=>e.jsxs("div",{className:`bm-check ${o.ok?"ok":o.fatal?"bad":"warn"}`,children:[e.jsx(Ee,{ok:o.ok,fatal:o.fatal}),e.jsx("span",{className:"bm-check-name",children:t(`zfs.bm.check.${o.id}`)}),e.jsx("span",{className:"bm-check-detail",children:o.detail})]},o.id))}),y.blocking.includes("guest_backups")&&e.jsxs("label",{className:"bm-ack",children:[e.jsx("input",{type:"checkbox",checked:S,onChange:o=>J(o.target.checked)}),e.jsx("span",{children:t("zfs.bm.ackBackup")})]}),e.jsx("div",{className:"bm-plan-head",children:t("zfs.bm.planHead")}),e.jsx("pre",{className:"bm-plan",children:y.plan.join(`
`)}),e.jsx("div",{className:"bm-note",children:t("zfs.bm.detachLater")}),oe.length>0?e.jsxs("div",{className:"bm-gate bad",children:[e.jsx("div",{className:"bm-gate-title",children:t("zfs.bm.blocked")}),e.jsx("div",{className:"bm-gate-body",children:oe.map(o=>t(`zfs.bm.check.${o}`)).join(" · ")})]}):e.jsxs("div",{className:"bm-confirm",children:[e.jsx("label",{children:t("zfs.bm.typeToConfirm").replace("{pool}",y.pool)}),e.jsx("input",{value:j,spellCheck:!1,autoComplete:"off",onChange:o=>A(o.target.value),placeholder:y.pool}),e.jsx("button",{className:"bm-btn danger",disabled:!G,onClick:Z,children:t("zfs.bm.execute")})]})]})]})}const Fe=["data","special","log","cache","spare","dedup"];function X(s){const n=(s||"").toUpperCase();return n==="ONLINE"?"ok":n==="AVAIL"||n==="INUSE"?"idle":n==="DEGRADED"||n==="OFFLINE"||n==="REMOVED"?"warn":n==="FAULTED"||n==="UNAVAIL"||n==="CORRUPT"?"bad":"idle"}function Pe(s){const d=(s.by_id||s.name||"").replace(/-part\d+$/,"").replace(/^(ata|scsi|nvme|wwn|usb)-/,""),c=d.split("/").pop()||d;return c.length>26?c.slice(0,11)+"…"+c.slice(-13):c}function Ue(s){return(s.read_errors||0)+(s.write_errors||0)+(s.cksum_errors||0)}function Be(s,n){const a=(s.type||"").toLowerCase();return s.parity!=null?`${n("zfs.parity")} ${s.parity}`:a==="mirror"?`${n("zfs.tolerates")} ${Math.max(0,s.children.length-1)}`:null}function me({kind:s,size:n=13}){const a={width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"};return s==="nvme"?e.jsxs("svg",{...a,className:"zfs-mico nvme","aria-hidden":"true",children:[e.jsx("path",{d:"M3 8h14a4 4 0 0 1 4 4 4 4 0 0 1-4 4H3z"}),e.jsx("path",{d:"M6 11v2M9 11v2M12 11v2"}),e.jsx("path",{d:"M3 8v8"})]}):s==="ssd"?e.jsxs("svg",{...a,className:"zfs-mico ssd","aria-hidden":"true",children:[e.jsx("rect",{x:"4",y:"6",width:"16",height:"12",rx:"2"}),e.jsx("rect",{x:"8",y:"10",width:"8",height:"4",rx:"1"}),e.jsx("path",{d:"M4 9H2M4 15H2M22 9h-2M22 15h-2"})]}):e.jsxs("svg",{...a,className:"zfs-mico hdd","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"12",r:"8.5"}),e.jsx("circle",{cx:"12",cy:"12",r:"2.2"}),e.jsx("path",{d:"M17.5 17.5 13.6 13.6"})]})}function he(s){return s==="nvme"?"NVMe":s==="ssd"?"SSD":"HDD"}const E=(s,n,a)=>e.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",className:a,"aria-hidden":"true",children:s}),T={scrub:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M3 7h18M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"}),e.jsx("path",{d:"M9 4h6M10 11v6M14 11v6"})]}),s),addVdev:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"5",rx:"1"}),e.jsx("rect",{x:"3",y:"12",width:"10",height:"5",rx:"1"}),e.jsx("path",{d:"M18 12v7M14.5 15.5h7"})]}),s),trim:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4 20 20 4M9 20 20 9"}),e.jsx("circle",{cx:"6",cy:"6",r:"2.4"}),e.jsx("circle",{cx:"6",cy:"14",r:"2.4"})]}),s),blast:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"2.4"}),e.jsx("path",{d:"M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"})]}),s),refresh:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M21 12a9 9 0 1 1-3-6.7"}),e.jsx("path",{d:"M21 4v5h-5"})]}),s),boot:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("ellipse",{cx:"8",cy:"6",rx:"5",ry:"2.2"}),e.jsx("path",{d:"M3 6v5c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2V6"}),e.jsx("path",{d:"M17 10.5l4 1.6v3c0 2.3-1.7 4.2-4 5-2.3-.8-4-2.7-4-5v-3l4-1.6z"})]}),s),plus:(s=13)=>E(e.jsx("path",{d:"M12 5v14M5 12h14"}),s),create:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),e.jsx("path",{d:"M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"}),e.jsx("path",{d:"M12 19v-2M9 18h6"})]}),s),data:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("ellipse",{cx:"12",cy:"5.5",rx:"7.5",ry:"2.8"}),e.jsx("path",{d:"M4.5 5.5v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-6"}),e.jsx("path",{d:"M4.5 11.5v6c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-6"})]}),s),special:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"5",y:"5",width:"14",height:"14",rx:"2"}),e.jsx("path",{d:"M12 8.5l1.3 2.7 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4z"})]}),s),log:(s=13)=>E(e.jsx(e.Fragment,{children:e.jsx("path",{d:"M13 3 5 14h5l-1 7 8-11h-5z"})}),s),cache:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M4 7a8 3 0 0 1 16 0v10a8 3 0 0 1-16 0z"}),e.jsx("path",{d:"M4 12a8 3 0 0 0 16 0"})]}),s),spare:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"8.5"}),e.jsx("circle",{cx:"12",cy:"12",r:"3.2"}),e.jsx("path",{d:"M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5"})]}),s),dedup:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"4",y:"4",width:"11",height:"11",rx:"1.5"}),e.jsx("rect",{x:"9",y:"9",width:"11",height:"11",rx:"1.5"})]}),s),ok:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M8 12.5l2.6 2.6L16 9.5"})]}),s),warn:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M12 3.5 21.5 20H2.5z"}),e.jsx("path",{d:"M12 9.5v4.5M12 17h.01"})]}),s),bad:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M9 9l6 6M15 9l-6 6"})]}),s),idle:(s=13)=>E(e.jsxs(e.Fragment,{children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M8 12h8"})]}),s)},Ve={data:T.data,special:T.special,log:T.log,cache:T.cache,spare:T.spare,dedup:T.dedup};function _e({state:s,size:n=13}){const a=X(s),d=a==="ok"?T.ok:a==="warn"?T.warn:a==="bad"?T.bad:T.idle;return e.jsx("span",{className:`zfs-sico st-${a}`,children:d(n)})}function We({v:s}){const n=s.children.length?s.children:[];if(!n.length)return null;const a=(s.type||"").toLowerCase(),d=s.parity!=null?s.parity:a==="mirror"?Math.max(0,n.length-1):0;if(!d)return null;const c=n.filter(m=>X(m.state)!=="ok").length,t=Math.max(0,d-c);return e.jsx("span",{className:"zfs-pips",title:`redundancy: ${t}/${d} remaining`,children:Array.from({length:d}).map((m,h)=>e.jsx("span",{className:`zfs-pip ${h<t?"live":"spent"}`},h))})}function $e({pct:s,tone:n="cyan",width:a=46}){return e.jsx("span",{className:`zfs-mini tone-${n}`,style:{width:a},children:e.jsx("span",{className:"zfs-mini-fill",style:{width:`${Math.max(0,Math.min(100,s))}%`}})})}function He({health:s,wearout:n,t:a}){const d=(s||"").trim();if(!d)return e.jsx("span",{className:"zfs-dim",children:"—"});const c=d.toUpperCase(),t=c.includes("FAIL"),m=c==="PASSED"||c==="OK",h=t?"bad":m?"ok":"unknown",i=typeof n=="number"?n:typeof n=="string"&&/^\d+$/.test(n)?Number(n):null;return e.jsxs("span",{className:"zfs-health",children:[e.jsx("span",{className:`zfs-tag health-${h}`,children:t?a("zfs.smart_fail"):m?a("zfs.smart_pass"):d}),i!==null&&e.jsxs("span",{className:`zfs-wear${i<=10?" crit":i<=25?" warn":""}`,title:a("zfs.wearout_hint"),children:[a("zfs.life")," ",i,"%"]})]})}function Ge({disks:s}){const n={hdd:0,ssd:0,nvme:0};for(const d of s){const c=d.kind==="nvme"?"nvme":d.kind==="ssd"?"ssd":d.kind==="hdd"||d.rotational?"hdd":"ssd";n[c]++}const a=s.length||1;return e.jsxs("span",{className:"zfs-mix",children:[e.jsx("span",{className:"zfs-mix-bar",children:["nvme","ssd","hdd"].map(d=>n[d]?e.jsx("span",{className:`zfs-mix-seg ${d}`,style:{width:`${n[d]/a*100}%`},title:`${he(d)}: ${n[d]}`},d):null)}),["nvme","ssd","hdd"].map(d=>n[d]?e.jsxs("span",{className:"zfs-mix-n",children:[e.jsx(me,{kind:d,size:12}),n[d]]},d):null)]})}function ke({v:s,onPick:n,dim:a,kind:d}){const{t:c}=V(),t=Ue(s),m=X(s.state);return e.jsxs("button",{type:"button",className:`zfs-chip st-${m}${a?" dim":""}`,onClick:n?()=>n(s):void 0,title:[s.by_id||s.name,`state: ${s.state}`,s.size?`size: ${pe(s.size)}`:"",`R:${s.read_errors} W:${s.write_errors} CKSUM:${s.cksum_errors}`,s.slow_ios?`slow I/O: ${s.slow_ios}`:"",d?`media: ${he(d)}`:"",s.is_partition?"partition-backed":"",s.note||""].filter(Boolean).join(`
`),children:[e.jsx("span",{className:"zfs-chip-led"}),d&&e.jsx(me,{kind:d,size:12}),e.jsx("span",{className:"zfs-chip-name",children:Pe(s)}),s.size?e.jsx("span",{className:"zfs-chip-size",children:pe(s.size,0)}):null,t>0&&e.jsxs("span",{className:"zfs-chip-err",title:[`${c("zfs.err_read")}: ${s.read_errors||0}`,`${c("zfs.err_write")}: ${s.write_errors||0}`,`${c("zfs.err_cksum")}: ${s.cksum_errors||0}`,c("zfs.err_hint")].join(`
`),children:["⚠ ",t]}),s.slow_ios>0&&t===0&&e.jsx("span",{className:"zfs-chip-slow",title:c("zfs.slow_hint"),children:"slow"})]})}function Je({v:s,group:n,onPick:a,kinds:d,isRootPool:c}){const{t}=V(),m=Be(s,t),h=s.children.length?s.children:[s],i=X(s.state),k=u=>d==null?void 0:d[(u.by_id||"").replace(/-part\d+$/,"")],b=c===!0;return e.jsxs("div",{className:`zfs-vdev grp-${n} st-${i}`,children:[e.jsx("span",{className:"cb tl"}),e.jsx("span",{className:"cb tr"}),e.jsx("span",{className:"cb bl"}),e.jsx("span",{className:"cb br"}),e.jsxs("div",{className:"zfs-vdev-head",children:[e.jsx("span",{className:"zfs-vdev-type",children:s.level||s.type||"disk"}),e.jsx("span",{className:"zfs-vdev-name",children:s.children.length?s.name:""}),e.jsxs("span",{className:"zfs-vdev-meta",children:[h.length," ",h.length===1?t("zfs.disk"):t("zfs.disks"),m?` · ${m}`:""]}),b&&e.jsx("span",{className:"zfs-chip-boot",title:t("zfs.boot_layout_hint"),children:"boot"}),e.jsx(We,{v:s}),s.size?e.jsx($e,{pct:(s.alloc||0)/s.size*100,tone:i==="ok"?"cyan":i==="warn"?"amber":"red"}):null,e.jsxs("span",{className:`zfs-vdev-state st-${i}`,children:[e.jsx(_e,{state:s.state,size:12}),s.state]})]}),e.jsx("div",{className:"zfs-vdev-body",children:h.map(u=>u.children.length?e.jsxs("div",{className:`zfs-nest st-${X(u.state)}`,children:[e.jsxs("span",{className:"zfs-nest-label",children:[u.name.replace(/-\d+$/,""),e.jsx("span",{className:`zfs-nest-state st-${X(u.state)}`,children:u.state})]}),e.jsx("div",{className:"zfs-nest-body",children:u.children.map((g,M)=>e.jsxs(Te.Fragment,{children:[M>0&&e.jsx("span",{className:"zfs-nest-arrow",children:"→"}),e.jsx(ke,{v:g,onPick:a,kind:k(g)})]},g.name+(g.by_id||"")))})]},u.name):e.jsx(ke,{v:u,onPick:a,kind:k(u),dim:n==="spare"&&u.state==="AVAIL"},u.name+(u.by_id||"")))})]})}function Ke({pool:s,onPick:n,onAction:a,busy:d,kinds:c}){const[t,m]=l.useState(!1),{t:h}=V(),i=s.alloc||0,k=s.size||0,b=k>0?Math.min(100,i/k*100):0,u=s.scan,g=!!u&&(u.state==="SCANNING"||u.state==="ACTIVE"),M=X(s.state);return e.jsxs("div",{className:"panel-card zfs-pool",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{className:"zfs-pool-name",children:s.name}),s.is_root_pool&&e.jsx("span",{className:"zfs-tag root",children:h("zfs.root_pool")}),e.jsxs("span",{className:`zfs-pool-state st-${M}`,children:[e.jsx(_e,{state:s.state,size:12}),s.state]}),e.jsxs("span",{className:"panel-card-meta",children:[s.vdev_count," vdev",s.vdev_count===1?"":"s",s.frag?` · frag ${s.frag}`:"",s.error_count?` · ${s.error_count} ${h("zfs.errors")}`:""]}),e.jsxs("span",{className:"zfs-pool-actions",children:[e.jsxs("button",{className:"zfs-btn ico",disabled:d,onClick:()=>a("scrub",s),children:[T.scrub(),h("zfs.scrub")]}),e.jsxs("button",{className:"zfs-btn ico",disabled:d,onClick:()=>a("vdev",s),children:[T.addVdev(),h("zfs.add_vdev")]}),e.jsxs("button",{className:"zfs-btn ico",disabled:d,onClick:()=>a("trim",s),children:[T.trim(),h("zfs.trim")]}),e.jsxs("button",{className:"zfs-btn ico",disabled:d,onClick:()=>a("consumers",s),children:[T.blast(),h("zfs.blast_radius")]})]})]}),e.jsxs("div",{className:"panel-card-body",children:[e.jsxs("div",{className:"zfs-cap",children:[e.jsxs("div",{className:"zfs-cap-bar",children:[e.jsx("div",{className:"zfs-cap-fill",style:{width:`${b}%`}}),e.jsx("div",{className:"zfs-cap-ticks"})]}),e.jsxs("div",{className:"zfs-cap-txt",children:[e.jsxs("span",{title:h("zfs.iec_hint"),children:[de(i)," / ",k?de(k):"—"]}),e.jsxs("span",{className:"zfs-cap-pct",children:[b.toFixed(1),"%"]})]})]}),u&&u.function&&(g?e.jsxs("div",{className:"zfs-scan live",children:[e.jsx("span",{className:"zfs-scan-label",children:u.function}),e.jsx("div",{className:"zfs-scan-bar",children:e.jsx("div",{className:"zfs-scan-fill",style:{width:`${u.percent??0}%`}})}),e.jsxs("span",{className:"zfs-scan-meta",children:[u.state,u.percent!=null?` · ${u.percent}%`:"",u.examined!=null&&u.total?` · ${de(u.examined)} / ${de(u.total)}`:"",u.errors?` · ${u.errors} ${h("zfs.errors")}`:""]})]}):e.jsxs("div",{className:"zfs-scan-done",children:[u.function," · ",u.state,u.errors?` · ${u.errors} ${h("zfs.errors")}`:""]})),s.status_text&&e.jsxs("button",{type:"button",className:`zfs-notice${t?" open":""}`,onClick:()=>m(z=>!z),title:s.status_text,children:[e.jsx("span",{className:"zfs-notice-tag",children:h("zfs.zfs_says")}),e.jsx("span",{className:"zfs-notice-txt",children:s.status_text})]}),e.jsx("div",{className:"zfs-topo",children:Fe.map(z=>{var $;const L=(($=s.vdevs)==null?void 0:$[z])||[];return L.length?e.jsxs("div",{className:`zfs-topo-row row-${z}`,children:[e.jsxs("div",{className:"zfs-topo-label",children:[e.jsxs("span",{className:"zfs-topo-label-txt",children:[e.jsx("span",{className:`zfs-gico grp-${z}`,children:(Ve[z]||T.data)(12)}),h(`zfs.group.${z}`)]}),e.jsx("span",{className:"zfs-topo-rail"})]}),e.jsxs("div",{className:"zfs-topo-groups",children:[L.map(O=>e.jsx(Je,{v:O,group:z,onPick:n,kinds:c,isRootPool:s.is_root_pool},z+O.name)),z==="data"&&s.has_raidz&&e.jsx("div",{className:"zfs-oneway",title:h("zfs.oneway_hint"),children:h("zfs.oneway")})]})]},z):null})})]})]})}function re({title:s,onClose:n,children:a,wide:d}){return Ie.createPortal(e.jsx("div",{className:"zfs-ov",onClick:c=>{c.target===c.currentTarget&&n()},children:e.jsxs("div",{className:`zfs-modal${d?" wide":""}`,onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"zfs-modal-head",children:[e.jsx("span",{children:s}),e.jsx("button",{className:"zfs-x",onClick:n,"aria-label":"close",children:"×"})]}),e.jsx("div",{className:"zfs-modal-body",children:a})]})}),document.body)}function xe(s){return JSON.stringify(s,Object.keys(s).sort())}function ze(s,n){return!!s&&s.ok!==!1&&s.dry_run===!0&&s.__sig===xe(n)}function ve({data:s}){const{t:n}=V();if(!s)return null;const a=c=>Array.isArray(c)?c.join(`
`):c==null?"":String(c),d=Array.isArray(s.warnings)?s.warnings:s.warnings?[String(s.warnings)]:[];return e.jsxs("div",{className:"zfs-preview",children:[s.plan&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"zfs-preview-label",children:n("zfs.plan")}),e.jsx("pre",{className:"zfs-pre",children:a(s.plan)})]}),s.command&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"zfs-preview-label",children:n("zfs.command")}),e.jsx("pre",{className:"zfs-pre",children:a(s.command)})]}),s.preview&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"zfs-preview-label",children:n("zfs.zfs_dryrun")}),e.jsx("pre",{className:"zfs-pre dim",children:a(s.preview)})]}),s.warning&&e.jsx("div",{className:"zfs-warn danger",children:a(s.warning)}),d.map((c,t)=>e.jsx("div",{className:"zfs-warn",children:c},t))]})}function es({cluster:s,clusters:n}){const{t:a,language:d}=V(),c=fe(),t=l.useMemo(()=>n&&Object.keys(n).length?Object.values(n):s?[s]:[],[s,n]),[m,h]=l.useState(()=>{var r;return((r=t[0])==null?void 0:r.id)||""}),[i,k]=l.useState(""),[b,u]=l.useState([]),[g,M]=l.useState([]),[z,L]=l.useState(!1),[$,O]=l.useState(null),[y,U]=l.useState("api"),[j,A]=l.useState({key:"by_id",dir:1}),[S,J]=l.useState(()=>{try{return localStorage.getItem("jtp.zfs.tab")==="disks"?"disks":"pools"}catch{return"pools"}});l.useEffect(()=>{try{localStorage.setItem("jtp.zfs.tab",S)}catch{}},[S]);const[B,v]=l.useState(!1),[w,f]=l.useState(null),[I,_]=l.useState([]),[D,F]=l.useState(null),[W,H]=l.useState(null),[te,Z]=l.useState(null),[Y,Q]=l.useState(null),[se,ne]=l.useState(null),[ie,oe]=l.useState(""),G=l.useMemo(()=>t.find(r=>r.id===m)||t[0]||null,[t,m]),o=l.useMemo(()=>{const r=G==null?void 0:G.nodes;return r?(Array.isArray(r)?r:Object.values(r)).map(x=>(x==null?void 0:x.name)||(x==null?void 0:x.node)).filter(Boolean).sort():[]},[G]);l.useEffect(()=>{var p;const r=(G==null?void 0:G.id)||((p=t[0])==null?void 0:p.id)||"";r&&r!==m&&(h(r),u([]),M([]),k(""))},[G,t,m]),l.useEffect(()=>{o.length&&!o.includes(i)&&k(o[0])},[o,i]);const C=l.useRef(0),R=l.useCallback(async()=>{if(!m||!i)return;const r=++C.current;L(!0),O(null);try{const p=await fetch(`/api/clusters/${encodeURIComponent(m)}/nodes/${encodeURIComponent(i)}/zfs`,{credentials:"same-origin"}),x=await p.json().catch(()=>({}));if(r!==C.current)return;if(!p.ok||x.ok===!1)throw new Error(x.detail||x.error||`HTTP ${p.status}`);u(x.pools||[]),M(x.disks||[]),U(x.source||"api")}catch(p){if(r!==C.current)return;O(String(p.message||p)),u([]),M([])}finally{r===C.current&&L(!1)}},[m,i]);l.useEffect(()=>{R()},[R]),l.useEffect(()=>{if(!b.some(x=>x.scan&&(x.scan.state==="SCANNING"||x.scan.state==="ACTIVE")))return;const p=window.setInterval(()=>{R()},15e3);return()=>window.clearInterval(p)},[b,R]);const K=l.useMemo(()=>g.filter(r=>r.free&&r.by_id),[g]),le=l.useMemo(()=>{const r=(p,x)=>{switch(x){case"size":return p.size||0;case"usage":return p.free?"":p.pool||"￿";case"model":return(p.model||"").toLowerCase();case"serial":return(p.serial||"").toLowerCase();case"kind":return(p.kind||"").toLowerCase();case"health":{const N=(p.health||"").toUpperCase(),P=N.includes("FAIL")?0:N?N==="PASSED"||N==="OK"?3:2:1,q=typeof p.wearout=="number"?p.wearout:typeof p.wearout=="string"&&/^\d+$/.test(p.wearout)?Number(p.wearout):101;return P*1e3+q}default:return(p.by_id||p.dev||"").toLowerCase()}};return[...g].sort((p,x)=>{const N=r(p,j.key),P=r(x,j.key);return N<P?-j.dir:N>P?j.dir:0})},[g,j]),ue=l.useMemo(()=>g.reduce((r,p)=>Math.max(r,p.size||0),1),[g]),Ce=l.useMemo(()=>{const r={};for(const p of g)p.by_id&&(r[p.by_id]=p.kind||(p.rotational?"hdd":"ssd"));return r},[g]),be=r=>(r==null?void 0:r.error)==="ssh_failed"||/permission denied|publickey|host key|no route to host|connection refused/i.test(String((r==null?void 0:r.detail)||"")),ge=l.useCallback(async r=>{try{const x=await(await fetch("/api/ssh/pubkey",{credentials:"same-origin"})).json().catch(()=>({}));oe(x.pubkey||x.key||"")}catch{}ne(r||"")},[]),ae=l.useCallback(async(r,p)=>{try{const x=await fetch(`/api/clusters/${encodeURIComponent(m)}/nodes/${encodeURIComponent(i)}/zfs${r}`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}),N=await x.json().catch(()=>({error:`http_${x.status}`,detail:`server returned ${x.status} with a non-JSON body`}));return{ok:x.ok,status:x.status,d:N}}catch(x){return{ok:!1,status:0,d:{error:"network",detail:String((x==null?void 0:x.message)||x)}}}},[m,i]);l.useEffect(()=>{let r=!0;const p=async()=>{try{const N=await fetch(`/api/clusters/${encodeURIComponent(m)}/zfs/boot-mirror/jobs`,{credentials:"same-origin"});if(!N.ok)return;const P=await N.json().catch(()=>({}));r&&_((P.jobs||[]).filter(q=>q.status==="running"))}catch{}};p();const x=window.setInterval(p,15e3);return()=>{r=!1,window.clearInterval(x)}},[m]);const ce=l.useCallback((r,p,x)=>{F(p),H(x||null),Z(null),f(r)},[]),Se=l.useCallback(async(r,p)=>{if(r==="scrub"){const x=p.scan&&(p.scan.state==="SCANNING"||p.scan.state==="ACTIVE");if(!await c.confirm(x?a("zfs.confirm_scrub_stop").replace("{pool}",p.name):a("zfs.confirm_scrub").replace("{pool}",p.name)))return;v(!0);const{ok:P,d:q}=await ae(`/pools/${encodeURIComponent(p.name)}/scrub`,{action:x?"stop":"start"});v(!1),P||(be(q)?await ge(String(q.detail||q.error||"")):await c.alert(`${a("zfs.failed")}: ${q.detail||q.error}`)),R();return}if(r==="trim"){if(!await c.confirm(a("zfs.confirm_trim").replace("{pool}",p.name)))return;v(!0);const{ok:N,d:P}=await ae(`/pools/${encodeURIComponent(p.name)}/trim`,{action:"start"});v(!1),N||(be(P)?await ge(String(P.detail||P.error||"")):await c.alert(`${a("zfs.failed")}: ${P.detail||P.error}`)),R();return}if(r==="consumers"){v(!0);try{const x=await fetch(`/api/clusters/${encodeURIComponent(m)}/nodes/${encodeURIComponent(i)}/zfs/pools/${encodeURIComponent(p.name)}/consumers`,{credentials:"same-origin"}),N=await x.json().catch(()=>({error:"bad_response"}));if(!x.ok||N.error){be(N)?await ge(String(N.detail||N.error||"")):await c.alert(`${a("zfs.failed")}: ${N.detail||N.error||x.status}`);return}Q(N)}catch(x){await c.alert(`${a("zfs.failed")}: ${String((x==null?void 0:x.message)||x)}`)}finally{v(!1)}return}ce(r,p)},[c,a,ae,R,m,i,ce]),Me=l.useCallback((r,p)=>{ce("replace",r,p)},[ce]);return e.jsxs("div",{className:"zfs-page view-container",children:[e.jsxs("div",{className:"zfs-header",children:[e.jsxs("h1",{className:"zfs-title font-display",children:[e.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),e.jsx("path",{d:"M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),e.jsx("path",{d:"M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),a("zfs.title")]}),e.jsxs("div",{className:"zfs-picker",children:[t.length>1&&e.jsx(ee,{value:m,options:t.map(r=>({value:r.id,label:r.name||r.id})),onChange:r=>{h(r),u([]),M([])}}),e.jsx(ee,{value:i,options:o.map(r=>({value:r,label:r})),onChange:k,placeholder:a("zfs.pick_node")}),e.jsxs("button",{className:"zfs-btn ico",onClick:()=>void R(),disabled:z,children:[T.refresh(),a(z?"zfs.loading":"zfs.refresh")]}),e.jsxs("button",{className:"zfs-btn ico",disabled:!i,onClick:()=>{F(null),Z(null),f("bootmirror")},children:[T.boot(),a("zfs.bm.button")]}),e.jsxs("button",{className:"zfs-btn primary ico",disabled:B||!K.length,onClick:()=>{F(null),Z(null),f("create")},children:[T.create(),a("zfs.create_pool")]})]})]}),e.jsxs("div",{className:"zfs-tabs",children:[e.jsxs("button",{className:`zfs-tab${S==="pools"?" active":""}`,onClick:()=>J("pools"),children:[T.create(15),e.jsx("span",{children:a("zfs.tab_pools")}),e.jsx("span",{className:"zfs-tab-n",children:b.length})]}),e.jsxs("button",{className:`zfs-tab${S==="disks"?" active":""}`,onClick:()=>J("disks"),children:[T.data(15),e.jsx("span",{children:a("zfs.tab_disks")}),e.jsx("span",{className:"zfs-tab-n",children:g.length})]})]}),$&&e.jsx("div",{className:"zfs-err",children:$}),!$&&!!b.length&&y==="api"&&e.jsxs("div",{className:"zfs-info",children:[T.ok(12),a("zfs.api_read_note")]}),z&&!b.length&&e.jsx("div",{className:"zfs-load",children:a("zfs.loading")}),S==="pools"&&!z&&!$&&!b.length&&e.jsx("div",{className:"panel-card zfs-empty",children:e.jsx("div",{className:"panel-card-body",children:a("zfs.no_pools")})}),S==="pools"&&b.map(r=>e.jsx(Ke,{pool:r,busy:B,kinds:Ce,onPick:p=>Me(r,p),onAction:Se},r.name)),S==="disks"&&!z&&!$&&!g.length&&e.jsx("div",{className:"panel-card zfs-empty",children:e.jsx("div",{className:"panel-card-body",children:a("zfs.no_disks")})}),S==="disks"&&!!g.length&&e.jsxs("div",{className:"panel-card zfs-inv",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:a("zfs.inventory")}),e.jsxs("span",{className:"panel-card-meta",children:[g.length," ",a("zfs.disks")," · ",K.length," ",a("zfs.free")]}),e.jsx("span",{style:{marginLeft:"auto"},children:e.jsx(Ge,{disks:g})})]}),e.jsx("div",{className:"panel-card-body",children:e.jsxs("table",{className:"vm-table zfs-table",children:[e.jsx("thead",{children:e.jsx("tr",{children:[["by_id","zfs.device",""],["model","zfs.model",""],["serial","zfs.serial",""],["size","zfs.size","num"],["kind","zfs.kind",""],["health","zfs.health","nowrap"],["usage","zfs.usage",""]].map(([r,p,x])=>e.jsxs("th",{className:`${x} zfs-th-sort${j.key===r?" on":""}`,onClick:()=>A(N=>({key:r,dir:N.key===r&&N.dir===1?-1:1})),title:a("zfs.sort_hint"),children:[a(p),e.jsx("span",{className:"zfs-th-arrow",children:j.key===r?j.dir===1?"▲":"▼":"↕"})]},r))})}),e.jsx("tbody",{children:le.map(r=>e.jsxs("tr",{className:r.free?"free":"",children:[e.jsx("td",{children:e.jsx("code",{children:r.by_id||r.dev})}),e.jsx("td",{children:r.model||"—"}),e.jsx("td",{children:r.serial||"—"}),e.jsx("td",{className:"num",children:e.jsxs("span",{className:"zfs-sizecell",children:[pe(r.size),e.jsx($e,{pct:r.size/ue*100,tone:r.kind==="nvme"?"magenta":r.kind==="ssd"?"cyan":"grey",width:40})]})}),e.jsx("td",{children:e.jsxs("span",{className:"zfs-media",children:[e.jsx(me,{kind:r.kind}),he(r.kind),r.transport&&r.transport!=="nvme"&&e.jsx("span",{className:"zfs-tran",children:r.transport})]})}),e.jsx("td",{children:e.jsx(He,{health:r.health,wearout:r.wearout,t:a})}),e.jsxs("td",{children:[r.pool?e.jsxs("span",{className:"zfs-tag pool",children:[T.data(10),r.pool]}):r.mounted?e.jsx("span",{className:"zfs-tag busy",children:a("zfs.mounted")}):r.partitions?e.jsx("span",{className:"zfs-tag busy",children:a("zfs.partitioned")}):e.jsx("span",{className:"zfs-tag ok",children:a("zfs.free")}),r.has_esp&&e.jsx("span",{className:"zfs-tag boot",children:"ESP"})]})]},r.kernel))})]})})]}),I.length>0&&e.jsx("div",{className:"zfs-bm-banner",children:I.map(r=>e.jsxs("button",{className:"zfs-bm-banner-row",onClick:()=>{k(r.node),f("bootmirror")},children:[e.jsx("span",{className:"zfs-bm-spark","aria-hidden":"true"}),e.jsxs("span",{className:"zfs-bm-banner-txt",children:[a(`zfs.bm.scenario.${r.scenario}`)," · ",r.pool," @ ",r.node," ·"," ",a(`zfs.bm.stage.${r.stage}`),r.stage==="resilvering"?` ${r.progress.toFixed(1)}%`:""]}),e.jsxs("span",{className:"zfs-bm-banner-go",children:[a("zfs.bm.title")," →"]})]},r.id))}),w==="replace"&&D&&e.jsx(qe,{pool:D,target:W,free:K,preview:te,setPreview:Z,post:ae,onDone:()=>{f(null),R()},onClose:()=>f(null)}),w==="vdev"&&D&&e.jsx(Ze,{pool:D,free:K,preview:te,setPreview:Z,post:ae,onDone:()=>{f(null),R()},onClose:()=>f(null)}),w==="bootmirror"&&e.jsx(re,{title:`${a("zfs.bm.title")} — ${i}`,onClose:()=>f(null),wide:!0,children:e.jsx(Re,{cid:m,node:i,freeDisks:K,onClose:()=>f(null),onChanged:()=>void R()})}),w==="create"&&e.jsx(Ye,{free:K,preview:te,setPreview:Z,post:ae,onDone:()=>{f(null),R()},onClose:()=>f(null)}),se!==null&&e.jsxs(re,{title:a("zfs.ssh_required"),onClose:()=>ne(null),wide:!0,children:[e.jsx("div",{className:"zfs-warn",children:a("zfs.ssh_why")}),se&&e.jsx("pre",{className:"zfs-pre dim",children:se}),e.jsx("div",{className:"zfs-preview-label",children:a("zfs.ssh_how")}),e.jsx("pre",{className:"zfs-pre",children:"ssh-copy-id -i ~/.ssh/id_ed25519.pub root@<node>"}),ie&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"zfs-preview-label",children:a("zfs.ssh_pubkey")}),e.jsx("pre",{className:"zfs-pre",children:ie})]}),e.jsx("div",{className:"zfs-warn",children:a("zfs.ssh_propagate")}),e.jsxs("div",{className:"zfs-actions",children:[e.jsx("button",{className:"zfs-btn",onClick:()=>{var r;(r=navigator.clipboard)==null||r.writeText(ie)},children:a("zfs.copy_key")}),e.jsx("button",{className:"zfs-btn primary",onClick:()=>ne(null),children:a("zfs.close")})]})]}),Y&&e.jsx(re,{title:a("zfs.blast_radius"),onClose:()=>Q(null),wide:!0,children:e.jsxs("div",{className:"zfs-blast",children:[e.jsx("div",{className:"zfs-preview-label",children:a("zfs.storages")}),(Y.storages||[]).length?e.jsx("ul",{className:"zfs-list",children:Y.storages.map(r=>e.jsxs("li",{children:[e.jsx("code",{children:r.storage})," ",e.jsxs("span",{className:"dim",children:["(",r.type,")"]})]},r.storage))}):e.jsx("div",{className:"dim",children:a("zfs.none")}),e.jsxs("div",{className:"zfs-preview-label",children:[a("zfs.guests")," (",Y.guest_count||0,")"]}),(Y.guests||[]).length?e.jsx("div",{className:"zfs-guests",children:Y.guests.map(r=>e.jsxs("span",{className:`zfs-guest ${r.status==="running"?"up":""}`,children:[e.jsx("b",{children:r.vmid})," ",r.name]},r.vmid))}):e.jsx("div",{className:"dim",children:a("zfs.none")}),e.jsx("div",{className:"zfs-warn",children:a("zfs.blast_hint")})]})}),e.jsx("style",{children:`
        .zfs-page {
          padding: var(--spacing-lg);
          display: flex; flex-direction: column; gap: var(--spacing-lg);
          overflow: auto;
        }
        /* A column flex container shrinks its children by default, and
           .panel-card is overflow:hidden — together they silently guillotined
           the bottom of every pool card (the CACHE and SPARE rows of a
           6-vdev pool vanished with no scrollbar to hint at it). Cards must
           keep their natural height and let the PAGE scroll instead. */
        .zfs-page > * { flex: 0 0 auto; }
        .zfs-header {
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }
        .zfs-title {
          margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.12em;
          color: var(--text-primary);
          display: inline-flex; align-items: center; gap: var(--spacing-sm);
        }
        .zfs-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: zfs-title-pulse 2.4s ease-in-out infinite;
        }
        @keyframes zfs-title-pulse {
          0%, 100% { opacity: 0.85; transform: none; }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        .zfs-picker { margin-left: auto; display: flex; align-items: center; gap: 10px; }

        .zfs-btn {
          padding: 6px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all .15s ease;
        }
        .zfs-btn:hover:not(:disabled) {
          border-color: var(--primary); color: var(--primary);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.25);
        }
        .zfs-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .zfs-btn.primary { border-color: var(--primary); color: var(--primary); }
        .zfs-btn.danger { border-color: var(--danger); color: var(--danger); }

        .zfs-err {
          padding: 10px 14px; border-radius: var(--radius-sm);
          border: 1px solid var(--danger);
          background: rgba(255, 60, 90, 0.08);
          color: var(--danger); font-family: var(--font-mono); font-size: 13px;
        }
        .zfs-tabs {
          display: flex; gap: 8px; align-self: flex-start;
        }
        .zfs-tab {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: all .15s ease;
        }
        .zfs-tab:hover { color: var(--primary); border-color: var(--primary-dim); }
        .zfs-tab.active {
          color: var(--primary); border-color: var(--primary);
          background: rgba(0, 240, 255, 0.08);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
        }
        .zfs-tab-n {
          font-family: var(--font-mono); font-size: 11px;
          padding: 1px 7px; border-radius: 9px;
          border: 1px solid currentColor; opacity: .8;
        }
        .zfs-info {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 12px; border-radius: var(--radius-sm);
          border: 1px solid var(--primary-dim);
          background: rgba(0, 240, 255, 0.05);
          color: var(--text-primary); font-size: 13px;
          align-self: flex-start;
        }
        .zfs-info svg { color: var(--success); }
        .zfs-load, .zfs-empty { color: var(--text-secondary); font-size: 13px; }

        /* ---------- pool ---------- */
        .zfs-pool-name {
          font-family: var(--font-mono); font-size: 14px;
          color: var(--text-primary); letter-spacing: 0.06em;
        }
        .zfs-pool-state, .zfs-vdev-state {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.1em; padding: 1px 7px; border-radius: 3px;
          border: 1px solid currentColor;
        }
        .zfs-page .st-ok, .zfs-modal .st-ok   { color: var(--success); }
        .zfs-page .st-warn, .zfs-modal .st-warn { color: var(--warning); }
        .zfs-page .st-bad, .zfs-modal .st-bad  { color: var(--danger); }
        .zfs-page .st-idle, .zfs-modal .st-idle { color: var(--text-secondary); }
        .zfs-pool-actions { margin-left: auto; display: flex; gap: 8px; }

        .zfs-tag {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.08em; padding: 1px 6px; border-radius: 3px;
          border: 1px solid currentColor; margin-left: 6px;
        }
        .zfs-tag.root { color: var(--primary); }
        .zfs-tag.pool { color: var(--primary); }
        .zfs-tag.ok   { color: var(--success); }
        .zfs-tag.busy { color: var(--text-secondary); }
        .zfs-tag.boot { color: var(--warning); }

        /* The verdict and the endurance figure are each a single short token;
           letting them wrap turns one row into three and misaligns the whole
           column. Keep both on one line and let the column claim the width. */
        .zfs-table th.nowrap, .zfs-table td.nowrap { white-space: nowrap; }
        .zfs-health { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
        .zfs-health .zfs-tag { white-space: nowrap; }
        .zfs-tag.health-ok      { color: var(--success); }
        .zfs-tag.health-bad     { color: #ff5c7a; border-color: rgba(255, 0, 64, .55);
                                  background: rgba(255, 0, 64, .12); }
        .zfs-tag.health-unknown { color: var(--text-muted); }
        /* Endurance is advisory next to the verdict, so it stays quiet --
           until it is low, which is the one time it should pull the eye. */
        .zfs-wear { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);
                    white-space: nowrap; }
        .zfs-wear.warn { color: var(--warning); }
        .zfs-wear.crit { color: #ff5c7a; font-weight: 600; }
        .zfs-dim { color: var(--text-muted); }

        .zfs-cap { margin-bottom: 12px; }
        .zfs-cap-bar {
          position: relative; height: 14px; border-radius: 3px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid var(--primary-dim); overflow: hidden;
        }
        .zfs-cap-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(0,240,255,.5), rgba(0,240,255,.85));
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
          transition: width .6s ease;
        }
        .zfs-cap-ticks {
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(90deg,
            transparent 0 11px, rgba(5, 8, 16, 0.85) 11px 12px);
          pointer-events: none;
        }
        .zfs-cap-txt {
          display: flex; justify-content: space-between; margin-top: 4px;
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        .zfs-cap-pct { color: var(--primary); }

        .zfs-scan {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
          padding: 7px 10px; border-radius: var(--radius-sm);
          border: 1px solid var(--primary-dim);
          background: rgba(0, 240, 255, 0.04);
        }
        .zfs-scan.live { border-color: var(--warning); }
        .zfs-scan-label {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.1em; color: var(--primary);
        }
        .zfs-scan-bar {
          flex: 1; height: 6px; border-radius: 3px;
          background: rgba(255,255,255,0.06); overflow: hidden;
        }
        .zfs-scan-fill {
          height: 100%; background: var(--warning);
          box-shadow: 0 0 8px currentColor; transition: width .8s ease;
        }
        .zfs-scan-meta {
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        /* One line by default; click to read the whole advisory. It is the same
           untranslated paragraph on every pool, so at full height it repeated
           down the page and buried the topology. */
        .zfs-th-sort {
          cursor: pointer; user-select: none; white-space: nowrap;
        }
        .zfs-th-sort:hover { color: var(--primary); }
        .zfs-th-sort.on { color: var(--primary); }
        .zfs-th-arrow {
          margin-left: 5px; font-size: 10px; opacity: .45;
        }
        .zfs-th-sort.on .zfs-th-arrow { opacity: 1; }

        .zfs-notice {
          display: flex; align-items: baseline; gap: 8px; width: 100%;
          margin-bottom: 10px; padding: 6px 11px; cursor: pointer; text-align: left;
          border: 0; border-left: 2px solid var(--warning);
          background: rgba(255, 176, 32, 0.06);
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-secondary);
        }
        .zfs-notice:hover { background: rgba(255, 176, 32, 0.11); }
        .zfs-notice-tag { color: var(--warning); flex: none; }
        .zfs-notice-txt {
          flex: 1; min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .zfs-notice.open .zfs-notice-txt { white-space: pre-wrap; overflow: visible; }

        /* A finished scan does not need a progress bar — it needs one line. */
        .zfs-scan-done {
          margin-bottom: 10px; font-size: 12.5px; letter-spacing: .04em;
          color: var(--text-tertiary, var(--text-secondary)); opacity: .75;
          text-transform: uppercase; font-family: var(--font-mono);
        }

        /* ---------- topology ---------- */
        .zfs-topo { display: flex; flex-direction: column; gap: 14px; }
        .zfs-topo-row { display: flex; gap: 12px; align-items: stretch; }
        .zfs-topo-label {
          /* A flex item's min-width defaults to auto, so a basis of 74px was
             only a MINIMUM: the wider SPECIAL label grew its own column and
             pushed that row's vdev box ~23px right of the DATA row's, which is
             the misalignment you see between the group boxes. Pin the width so
             every row starts its content at the same x. */
          flex: 0 0 104px; width: 104px; min-width: 104px; max-width: 104px;
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 5px; padding-top: 3px; overflow: hidden;
        }
        .zfs-topo-label-txt {
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.14em; color: #c6c6c6;
          text-transform: uppercase;
        }
        .zfs-topo-rail {
          flex: 1; width: 2px; border-radius: 1px;
          background: linear-gradient(180deg, var(--primary-dim), transparent);
        }
        .zfs-topo-groups { flex: 1; display: flex; flex-wrap: wrap; gap: 12px; }

        .zfs-vdev {
          position: relative; padding: 10px 12px 12px;
          flex: 1 1 262px; max-width: 100%;
          border: 1px solid var(--primary-dim); border-radius: var(--radius-sm);
          background: rgba(0, 240, 255, 0.025);
          min-width: 262px;
        }
        .zfs-vdev.st-warn { border-color: var(--warning); }
        .zfs-vdev.st-bad  { border-color: var(--danger); }
        .zfs-vdev.grp-special { background: rgba(190, 120, 255, 0.05); }
        .zfs-vdev.grp-log     { background: rgba(255, 176, 32, 0.05); }
        .zfs-vdev.grp-cache   { background: rgba(80, 220, 160, 0.05); }
        .zfs-vdev.grp-spare   { background: rgba(255, 255, 255, 0.03); }
        /* corner brackets, same decorative language as the radar anomaly cards */
        .zfs-vdev .cb {
          position: absolute; width: 7px; height: 7px;
          border-color: var(--primary); opacity: .65;
        }
        .zfs-vdev .cb.tl { top: -1px; left: -1px; border-top: 1px solid; border-left: 1px solid; }
        .zfs-vdev .cb.tr { top: -1px; right: -1px; border-top: 1px solid; border-right: 1px solid; }
        .zfs-vdev .cb.bl { bottom: -1px; left: -1px; border-bottom: 1px solid; border-left: 1px solid; }
        .zfs-vdev .cb.br { bottom: -1px; right: -1px; border-bottom: 1px solid; border-right: 1px solid; }

        .zfs-vdev-head {
          display: flex; align-items: center; gap: 7px; margin-bottom: 8px;
          padding-bottom: 6px; border-bottom: 1px dashed rgba(0, 240, 255, 0.15);
        }
        .zfs-vdev-type {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.1em; color: var(--primary); text-transform: uppercase;
        }
        .zfs-vdev-name {
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        .zfs-vdev-meta {
          font-family: var(--font-mono); font-size: 13px;
          color: #c6c6c6; margin-left: auto;
        }

        .zfs-vdev-body {
          display: grid; gap: 5px;
          /* auto-FIT, not auto-fill: with auto-fill an empty trailing track is
             still reserved, so a 4-disk vdev in a 3-track container left a
             ragged gap. 210px lets four fit on a normal-width card. */
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
        }
        .zfs-chip {
          position: relative; display: flex; align-items: center; gap: 5px;
          padding: 5px 7px; border-radius: 3px;
          border: 1px solid var(--border);
          background: var(--bg-tertiary);
          font-family: var(--font-mono); font-size: 13.5px;
          color: var(--text-primary); cursor: pointer; text-align: left;
          transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease;
        }
        .zfs-chip:hover {
          border-color: var(--primary); transform: translateY(-1px);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
        }
        .zfs-chip.dim { opacity: .55; }
        .zfs-chip-led {
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 5px currentColor;
          flex: 0 0 auto;
        }
        .zfs-chip.st-ok   .zfs-chip-led { color: var(--success); }
        .zfs-chip.st-warn .zfs-chip-led { color: var(--warning); }
        .zfs-chip.st-bad  .zfs-chip-led { color: var(--danger); animation: pulse 1.2s infinite; }
        .zfs-chip.st-idle .zfs-chip-led { color: var(--text-secondary); }
        /* The by-id name is the thing an operator matches against the label on
           the physical drive, so it gets the space; size and badges yield. */
        .zfs-chip-name {
          flex: 1 1 auto; min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .zfs-chip-size { margin-left: auto; color: #c6c6c6; font-size: 11px; }
        .zfs-chip-err, .zfs-chip-slow, .zfs-chip-boot {
          font-size: 11px; padding: 0 3px; border-radius: 2px;
          font-family: var(--font-display);
        }
        .zfs-chip-err  { background: var(--danger); color: #fff; }
        .zfs-chip-slow { border: 1px solid var(--warning); color: var(--warning); }
        .zfs-chip-boot { border: 1px solid var(--warning); color: var(--warning); }

        /* nested replacing-/spare- vdev: old disk -> new disk, inline */
        .zfs-nest {
          grid-column: 1 / -1;
          display: flex; flex-direction: column; gap: 4px;
          padding: 5px 7px; border-radius: 3px;
          border: 1px dashed var(--warning);
          background: rgba(255, 176, 32, 0.06);
        }
        .zfs-nest.st-bad { border-color: var(--danger); background: rgba(255,60,90,.07); }
        .zfs-nest-label {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--font-display); font-size: 11px;
          letter-spacing: 0.1em; color: var(--warning); text-transform: uppercase;
        }
        .zfs-nest-state {
          font-family: var(--font-display); font-size: 11px;
          padding: 0 5px; border-radius: 2px; border: 1px solid currentColor;
        }
        .zfs-nest-body { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
        .zfs-nest-body .zfs-chip { flex: 1 1 96px; }
        .zfs-nest-arrow { color: var(--warning); font-size: 13px; flex: 0 0 auto; }

        /* Sits in the same flex row as the vdev boxes, so as a normal inline item it
   stole horizontal space: the vdev box narrowed until a 4-disk raidz could
   only fit three columns and orphaned the fourth on its own row, and the DATA
   row ended up narrower than SPECIAL so their right edges did not line up.
   One cause, two kinds of untidiness. Giving it a full-basis puts it on its
   own line and every vdev box gets the full width. */
        .zfs-oneway {
          flex: 0 0 100%; align-self: flex-start;
          margin-top: 2px; padding: 3px 0 0;
          border: 0; border-top: 1px dashed rgba(255, 176, 32, .35);
          color: var(--warning);
          font-family: var(--font-display); font-size: 11.5px;
          letter-spacing: 0.08em; opacity: .85;
        }

        /* ---------- icon plumbing ---------- */
        /* Buttons with a leading glyph must be inline-flex on the BUTTON itself,
           otherwise icon and label do not share a baseline (house rule). */
        .zfs-btn.ico { display: inline-flex; align-items: center; gap: 6px; }
        .zfs-btn.ico svg { flex: 0 0 auto; }
        .zfs-sico { display: inline-flex; align-items: center; margin-right: 4px; }
        .zfs-gico { display: inline-flex; align-items: center; margin-right: 5px; }
        .zfs-gico.grp-data    { color: var(--primary); }
        .zfs-gico.grp-special { color: #be78ff; }
        .zfs-gico.grp-log     { color: var(--warning); }
        .zfs-gico.grp-cache   { color: #50dca0; }
        .zfs-gico.grp-spare   { color: var(--text-secondary); }
        .zfs-gico.grp-dedup   { color: #7de3ff; }
        .zfs-topo-label-txt { display: inline-flex; align-items: center; }
        .zfs-pool-state, .zfs-vdev-state { display: inline-flex; align-items: center; }
        .zfs-tag.pool { display: inline-flex; align-items: center; gap: 4px; }

        /* ---------- tolerance pips ---------- */
        .zfs-pips { display: inline-flex; align-items: center; gap: 3px; margin-left: 8px; }
        .zfs-pip {
          width: 7px; height: 7px; border-radius: 50%;
          border: 1px solid var(--success);
        }
        .zfs-pip.live { background: var(--success); box-shadow: 0 0 4px var(--success); }
        .zfs-pip.spent { border-color: var(--danger); background: transparent; }

        /* ---------- mini bars ---------- */
        .zfs-mini {
          display: inline-block; height: 5px; border-radius: 3px;
          background: rgba(255,255,255,0.08); overflow: hidden;
          margin-left: 8px; vertical-align: middle;
        }
        .zfs-mini-fill { display: block; height: 100%; border-radius: 3px; }
        .zfs-mini.tone-cyan    .zfs-mini-fill { background: var(--primary); }
        .zfs-mini.tone-amber   .zfs-mini-fill { background: var(--warning); }
        .zfs-mini.tone-red     .zfs-mini-fill { background: var(--danger); }
        .zfs-mini.tone-magenta .zfs-mini-fill { background: var(--magenta, #ff5edb); }
        .zfs-mini.tone-grey    .zfs-mini-fill { background: var(--text-secondary); }
        .zfs-sizecell { display: inline-flex; align-items: center; justify-content: flex-end; }

        /* ---------- media mix ---------- */
        .zfs-mix { display: inline-flex; align-items: center; gap: 8px; }
        .zfs-mix-bar {
          display: inline-flex; width: 90px; height: 7px; border-radius: 4px;
          overflow: hidden; border: 1px solid var(--border);
        }
        .zfs-mix-seg.nvme { background: var(--magenta, #ff5edb); }
        .zfs-mix-seg.ssd  { background: var(--primary); }
        .zfs-mix-seg.hdd  { background: var(--text-secondary); }
        .zfs-mix-n {
          display: inline-flex; align-items: center; gap: 3px;
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }

        /* ---------- media marks ---------- */
        .zfs-media {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono); font-size: 12px;
        }
        .zfs-media.tiny { gap: 3px; margin-left: 6px; font-size: 12px; }
        .zfs-mico { flex: 0 0 auto; }
        /* Colour-code the media so a mixed pool reads at a glance: spinning
           rust cool-neutral, SATA/SAS flash cyan, NVMe magenta (fastest tier). */
        .zfs-mico.hdd  { color: var(--text-secondary); }
        .zfs-mico.ssd  { color: var(--primary); }
        .zfs-mico.nvme { color: var(--magenta, #ff5edb); }
        .zfs-tran {
          font-size: 11px; padding: 0 4px; border-radius: 2px;
          border: 1px solid var(--border); color: #c6c6c6;
          text-transform: uppercase;
        }
        .zfs-chip .zfs-mico { opacity: .85; }

        /* ---------- inventory ---------- */
        .zfs-table code { font-size: 12px; color: var(--text-primary); }
        .zfs-table tr.free td { background: rgba(80, 220, 160, 0.04); }
        .zfs-table td.num, .zfs-table th.num { text-align: right; }

        /* ---------- modal ---------- */
        .zfs-ov {
          position: fixed; inset: 0; z-index: 4000;
          background: rgba(2, 5, 11, 0.78);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .zfs-modal {
          width: min(620px, 96vw); max-height: 88vh; overflow: auto;
          background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
          border: 1px solid var(--primary-dim); border-radius: var(--radius-md);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.18);
        }
        .zfs-modal.wide { width: min(900px, 96vw); }
        .zfs-modal-head {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 18px; border-bottom: 1px solid var(--primary-dim);
          font-family: var(--font-display); font-size: 15px;
          letter-spacing: 0.12em; color: var(--primary); text-transform: uppercase;
        }
        .zfs-x {
          margin-left: auto; background: none; border: none;
          color: var(--text-secondary); font-size: 20px; cursor: pointer;
          line-height: 1;
        }
        .zfs-x:hover { color: var(--danger); }
        .zfs-modal-body { padding: 18px; display: flex; flex-direction: column; gap: 13px; font-size: 14px; }
        .zfs-modal-body label {
          font-family: var(--font-display); font-size: 13px;
          letter-spacing: 0.1em; color: var(--text-primary);
          text-transform: uppercase;
        }
        .zfs-modal-body input[type="text"] {
          padding: 9px 12px; background: var(--bg-tertiary);
          border: 1px solid var(--border); border-radius: var(--radius-sm);
          color: var(--text-primary); font-family: var(--font-mono); font-size: 14px;
        }
        .zfs-modal-body input[type="checkbox"] { width: 15px; height: 15px; }
        .zfs-modal-body input:focus { border-color: var(--primary); outline: none; }
        .zfs-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 6px; }
        .zfs-actions .zfs-btn { padding: 8px 18px; font-size: 14px; }

        .zfs-preview {
          display: flex; flex-direction: column; gap: 6px;
          padding: 10px; border-radius: var(--radius-sm);
          border: 1px solid var(--border); background: rgba(0,0,0,0.25);
        }
        .zfs-preview-label {
          font-family: var(--font-display); font-size: 12px;
          letter-spacing: 0.12em; color: var(--primary); text-transform: uppercase;
        }
        .zfs-pre {
          margin: 0; padding: 10px 12px; border-radius: 3px;
          background: #02050b; border: 1px solid var(--border);
          font-family: var(--font-mono); font-size: 14px; line-height: 1.55;
          color: var(--text-primary);
          white-space: pre-wrap; overflow-wrap: anywhere; user-select: all;
        }
        .zfs-pre.dim { color: #c8c8c8; }
        .zfs-warn {
          padding: 9px 12px; border-left: 2px solid var(--warning);
          background: rgba(255, 176, 32, 0.08);
          font-size: 13.5px; line-height: 1.6; color: var(--text-primary);
        }
        .zfs-warn.danger {
          border-left-color: var(--danger); background: rgba(255, 60, 90, 0.09);
          color: var(--danger);
        }
        .zfs-page .dim, .zfs-modal .dim { color: #bcbcbc; font-size: 13px; }

        /* disk picker inside wizards */
        .zfs-pick {
          display: grid; gap: 6px; max-height: 240px; overflow: auto;
          grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
          padding: 8px; border: 1px solid var(--border);
          border-radius: var(--radius-sm); background: rgba(0,0,0,0.2);
        }
        .zfs-pick-item {
          display: flex; align-items: center; gap: 7px; padding: 8px 10px;
          border: 1px solid var(--border); border-radius: 3px;
          background: var(--bg-tertiary); cursor: pointer;
          font-family: var(--font-mono); font-size: 13px; text-align: left;
          color: var(--text-primary); transition: all .15s ease;
        }
        .zfs-pick-item:hover { border-color: var(--primary); }
        .zfs-pick-item.on {
          border-color: var(--primary); color: var(--primary);
          background: rgba(0, 240, 255, 0.09);
        }
        .zfs-pick-item .sz { margin-left: auto; color: #c0c0c0; font-size: 12px; }
        .zfs-groups { display: flex; flex-direction: column; gap: 10px; }
        .zfs-group-row {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          padding: 8px 10px; border: 1px solid var(--border);
          border-radius: var(--radius-sm); background: rgba(0,0,0,0.18);
        }
        .zfs-list { margin: 0; padding-left: 18px; font-family: var(--font-mono); font-size: 13px; }
        .zfs-guests { display: flex; flex-wrap: wrap; gap: 6px; }
        .zfs-guest {
          padding: 3px 8px; border-radius: 3px; border: 1px solid var(--border);
          font-family: var(--font-mono); font-size: 12px; color: #c6c6c6;
        }
        .zfs-guest.up { border-color: var(--success); color: var(--success); }
      `})]})}function ye({free:s,selected:n,toggle:a,max:d}){return e.jsx("div",{className:"zfs-pick",children:s.map(c=>{const t=c.by_id,m=n.includes(t),h=!m&&d!=null&&n.length>=d;return e.jsxs("button",{type:"button",className:`zfs-pick-item${m?" on":""}`,disabled:h,onClick:()=>a(t),children:[e.jsx("span",{children:m?"◉":"○"}),e.jsx("span",{children:t.replace(/^(ata|scsi|nvme|wwn|usb)-/,"")}),e.jsxs("span",{className:"sz",children:[pe(c.size,0),e.jsxs("span",{className:"zfs-media tiny",children:[e.jsx(me,{kind:c.kind,size:12}),he(c.kind)]})]})]},t)})})}function qe({pool:s,target:n,free:a,preview:d,setPreview:c,post:t,onDone:m,onClose:h}){const{t:i}=V(),k=fe(),[b,u]=l.useState(""),[g,M]=l.useState(!1),[z,L]=l.useState(!1),$=(n==null?void 0:n.by_id)||(n==null?void 0:n.name)||"",O={old:$,new:b,force:g},y=async()=>{L(!0);try{const{ok:j,d:A}=await t(`/pools/${encodeURIComponent(s.name)}/replace`,O);c(j&&A.dry_run?{...A,__sig:xe(O)}:{...A,ok:!1,preview:A.preview||A.detail||A.error})}finally{L(!1)}},U=async()=>{if(await k.prompt(i("zfs.type_pool_to_confirm").replace("{pool}",s.name))!==s.name)return;L(!0);let A=!1,S={};try{({ok:A,d:S}=await t(`/pools/${encodeURIComponent(s.name)}/replace`,{...O,confirm:!0}))}finally{L(!1)}if(!A){await k.alert(`${i("zfs.failed")}: ${S.detail||S.error}`);return}await k.alert(i("zfs.replace_started")),m()};return e.jsxs(re,{title:`${i("zfs.replace_disk")} — ${s.name}`,onClose:h,children:[e.jsx("label",{children:i("zfs.failing_disk")}),e.jsxs("div",{className:"zfs-pre",children:[$||"—",n?`   [${n.state}]`:""]}),e.jsx("label",{children:i("zfs.replacement")}),a.length?e.jsx(ye,{free:a,selected:b?[b]:[],toggle:j=>u(j===b?"":j),max:1}):e.jsx("div",{className:"zfs-warn",children:i("zfs.no_free_disks")}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,textTransform:"none"},children:[e.jsx("input",{type:"checkbox",checked:g,onChange:j=>M(j.target.checked)}),i("zfs.force_hint")]}),e.jsx(ve,{data:d}),e.jsxs("div",{className:"zfs-actions",children:[e.jsx("button",{className:"zfs-btn",onClick:h,children:i("zfs.cancel")}),e.jsx("button",{className:"zfs-btn",disabled:!$||!b||z,onClick:y,children:i("zfs.preview")}),e.jsx("button",{className:"zfs-btn danger",disabled:z||!b||!ze(d,O),onClick:U,children:i("zfs.execute")})]})]})}function Ze({pool:s,free:n,preview:a,setPreview:d,post:c,onDone:t,onClose:m}){const{t:h}=V(),i=fe(),[k,b]=l.useState("data"),[u,g]=l.useState("mirror"),[M,z]=l.useState([]),[L,$]=l.useState(!1),[O,y]=l.useState(!1),U=v=>z(w=>w.includes(v)?w.filter(f=>f!==v):[...w,v]),j={class:k,layout:u,devices:M,force:L},A=async()=>{y(!0);try{const{ok:v,d:w}=await c(`/pools/${encodeURIComponent(s.name)}/vdev`,j);d(v&&w.dry_run?{...w,__sig:xe(j)}:{...w,ok:!1,preview:w.preview||w.detail||w.error})}finally{y(!1)}},S=async()=>{if(await i.prompt(h("zfs.type_pool_to_confirm").replace("{pool}",s.name))!==s.name)return;y(!0);let w=!1,f={};try{({ok:w,d:f}=await c(`/pools/${encodeURIComponent(s.name)}/vdev`,{...j,confirm:!0}))}finally{y(!1)}if(!w){await i.alert(`${h("zfs.failed")}: ${f.detail||f.error}`);return}t()},J=[{value:"data",label:h("zfs.group.data")},{value:"special",label:h("zfs.group.special"),hint:h("zfs.special_hint")},{value:"log",label:h("zfs.group.log"),hint:h("zfs.log_hint")},{value:"cache",label:h("zfs.group.cache"),hint:h("zfs.cache_hint")},{value:"spare",label:h("zfs.group.spare")}],B=["stripe","mirror","raidz","raidz2","raidz3"].map(v=>({value:v,label:v}));return e.jsxs(re,{title:`${h("zfs.add_vdev")} — ${s.name}`,onClose:m,children:[e.jsx("label",{children:h("zfs.vdev_class")}),e.jsx(ee,{value:k,options:J,onChange:v=>{b(v),d(null)}}),(k==="data"||k==="special"||k==="log")&&e.jsxs(e.Fragment,{children:[e.jsx("label",{children:h("zfs.layout")}),e.jsx(ee,{value:u,options:B,onChange:v=>{g(v),d(null)}})]}),e.jsxs("label",{children:[h("zfs.devices")," (",M.length,")"]}),n.length?e.jsx(ye,{free:n,selected:M,toggle:U}):e.jsx("div",{className:"zfs-warn",children:h("zfs.no_free_disks")}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,textTransform:"none"},children:[e.jsx("input",{type:"checkbox",checked:L,onChange:v=>$(v.target.checked)}),h("zfs.force_hint")]}),e.jsx(ve,{data:a}),e.jsxs("div",{className:"zfs-actions",children:[e.jsx("button",{className:"zfs-btn",onClick:m,children:h("zfs.cancel")}),e.jsx("button",{className:"zfs-btn",disabled:!M.length||O,onClick:A,children:h("zfs.preview")}),e.jsx("button",{className:"zfs-btn danger",disabled:O||!ze(a,j),onClick:S,children:h("zfs.execute")})]})]})}function Ye({free:s,preview:n,setPreview:a,post:d,onDone:c,onClose:t}){var v,w;const{t:m}=V(),h=fe(),[i,k]=l.useState("tank"),[b,u]=l.useState([{layout:"raidz2",devices:[]}]),[g,M]=l.useState(0),[z,L]=l.useState(!1),[$,O]=l.useState(!1),y=l.useMemo(()=>new Set(b.flatMap(f=>f.devices)),[b]),U=l.useMemo(()=>s.filter(f=>{var I;return!y.has(f.by_id)||((I=b[g])==null?void 0:I.devices.includes(f.by_id))}),[s,y,b,g]),j=f=>u(I=>I.map((_,D)=>D===g?{..._,devices:_.devices.includes(f)?_.devices.filter(F=>F!==f):[..._.devices,f]}:_)),A=["stripe","mirror","raidz","raidz2","raidz3"].map(f=>({value:f,label:f})),S=()=>({name:i,vdevs:b.filter(f=>f.devices.length),props:{ashift:"12",compression:"lz4"},force:$}),J=async()=>{L(!0);const f=S();try{const{ok:I,d:_}=await d("/pools",f);a(I&&_.dry_run?{..._,__sig:xe(f)}:{..._,ok:!1,preview:_.preview||_.detail||_.error})}finally{L(!1)}},B=async()=>{if(await h.prompt(m("zfs.type_pool_to_confirm").replace("{pool}",i))!==i)return;L(!0);let I=!1,_={};try{({ok:I,d:_}=await d("/pools",{...S(),confirm:!0}))}finally{L(!1)}if(!I){await h.alert(`${m("zfs.failed")}: ${_.detail||_.error}`);return}c()};return e.jsxs(re,{title:m("zfs.create_pool"),onClose:t,wide:!0,children:[e.jsx("label",{children:m("zfs.pool_name")}),e.jsx("input",{type:"text",value:i,spellCheck:!1,onChange:f=>{k(f.target.value),a(null)}}),e.jsx("label",{children:m("zfs.vdev_groups")}),e.jsxs("div",{className:"zfs-groups",children:[b.map((f,I)=>e.jsxs("div",{className:`zfs-group-row${I===g?" on":""}`,children:[e.jsxs("button",{className:`zfs-btn${I===g?" primary":""}`,onClick:()=>M(I),children:["#",I+1]}),e.jsx("div",{style:{minWidth:130},children:e.jsx(ee,{value:f.layout,options:A,onChange:_=>{u(D=>D.map((F,W)=>W===I?{...F,layout:_}:F)),a(null)}})}),e.jsxs("span",{className:"dim",children:[f.devices.length," ",m("zfs.disks")]}),b.length>1&&e.jsx("button",{className:"zfs-btn danger",onClick:()=>{u(_=>_.filter((D,F)=>F!==I)),M(0),a(null)},children:"×"})]},I)),e.jsxs("button",{className:"zfs-btn",onClick:()=>{u(f=>[...f,{layout:"raidz2",devices:[]}]),M(b.length),a(null)},children:["+ ",m("zfs.add_group")]})]}),e.jsxs("label",{children:[m("zfs.assign_to")," #",g+1," (",((v=b[g])==null?void 0:v.devices.length)||0,")"]}),U.length?e.jsx(ye,{free:U,selected:((w=b[g])==null?void 0:w.devices)||[],toggle:j}):e.jsx("div",{className:"zfs-warn",children:m("zfs.no_free_disks")}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,textTransform:"none"},children:[e.jsx("input",{type:"checkbox",checked:$,onChange:f=>O(f.target.checked)}),m("zfs.force_hint")]}),e.jsx(ve,{data:n}),e.jsxs("div",{className:"zfs-actions",children:[e.jsx("button",{className:"zfs-btn",onClick:t,children:m("zfs.cancel")}),e.jsx("button",{className:"zfs-btn",disabled:z||!b.some(f=>f.devices.length),onClick:J,children:m("zfs.preview")}),e.jsx("button",{className:"zfs-btn danger",disabled:z||!ze(n,S()),onClick:B,children:m("zfs.execute")})]})]})}export{es as ZFSManager};
