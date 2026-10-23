import{r as t,j as e,u as K,a as te,b as ze,g as se,f as ot,c as Ae,d as ye,e as ct}from"./index-HzkmC-WK.js";import{R as dt}from"./RRDChartModal-C3vJHUQy.js";import{F as pt}from"./FirewallModal-BUjzl8oh.js";import{H as mt,R as xt}from"./ReplicationModal-DTMi2N8J.js";import{S as ut}from"./SSHSetupModal-aQehe0se.js";import{C as _e}from"./CyberSelect-BGKzR2ZN.js";function ft(a,u,x){const n=Math.min(a,100)/100,i=.1+n*.6,r=u;let N=(Math.random()-.5)*.02;if(r>.08&&r<.22){const I=(r-.08)/.14;N+=i*.2*Math.sin(I*Math.PI)}if(r>.24&&r<.4){const I=(r-.24)/.16;if(I<.2)N-=i*.15*Math.sin(I*5*Math.PI);else if(I<.5){const z=(I-.2)/.3;N+=i*(1+n*.5)*Math.sin(z*Math.PI)}else if(I<.7){const z=(I-.5)/.2;N-=i*.25*Math.sin(z*Math.PI)}}if(r>.48&&r<.72){const I=(r-.48)/.24;N+=i*.35*Math.sin(I*Math.PI)}return N*x}function Ge({value:a,label:u,color:x,isOnline:n,width:i=180,height:r=35,isPaused:N=!1}){const I=t.useRef(null),z=t.useRef(null),P=t.useRef([]),C=t.useRef(0),D=t.useRef(0),S=t.useRef(0),A=t.useRef(0),w=t.useRef(!N),R=t.useRef(!1),v=6e4/(50+a/100*50),k=12;t.useEffect(()=>{w.current=!N},[N]);const $=t.useCallback(()=>{const h=z.current;if(!h)return;h.fillStyle="rgba(5, 8, 15, 0.95)",h.fillRect(0,0,i,r),h.strokeStyle="rgba(0, 240, 255, 0.08)",h.lineWidth=.5;for(let o=0;o<r;o+=10)h.beginPath(),h.moveTo(0,o),h.lineTo(i,o),h.stroke();for(let o=0;o<i;o+=10)h.beginPath(),h.moveTo(o,0),h.lineTo(o,r),h.stroke();const p=r/2,d=r*.45,j=!n||a>90?"#ff0040":a>70?"#ff6b00":x;h.shadowColor=j,h.shadowBlur=6,h.strokeStyle=j,h.lineWidth=1.5,h.lineCap="round",h.lineJoin="round",h.beginPath();let E=!1;for(let o=0;o<i;o++){const b=(o-C.current+i)%i;if(b<8&&b>0)continue;const U=p-P.current[o]*d;E?h.lineTo(o,U):(h.moveTo(o,U),E=!0)}h.stroke(),h.shadowBlur=0,h.strokeStyle=`${j}60`,h.lineWidth=2,h.beginPath(),h.moveTo(C.current,0),h.lineTo(C.current,r),h.stroke();const y=h.createLinearGradient(C.current-15,0,C.current,0);y.addColorStop(0,"transparent"),y.addColorStop(1,`${j}30`),h.fillStyle=y,h.fillRect(C.current-15,0,15,r)},[i,r,a,n,x]);t.useEffect(()=>{const h=I.current;if(!h)return;const p=h.getContext("2d");if(!p)return;const d=window.devicePixelRatio||1;h.width=i*d,h.height=r*d,p.scale(d,d),z.current=p,P.current.length!==i&&(P.current=new Array(i).fill(0)),R.current=!0,$()},[i,r,$]),t.useEffect(()=>{if(!R.current||!z.current)return;const p=d=>{A.current||(A.current=d);const c=d-A.current;A.current=d;const j=c/1e3*k;D.current+=c/v,D.current>=1&&(D.current-=1);const E=Math.ceil(j);for(let y=0;y<E;y++){const b=(D.current+y/E*(c/v))%1;let U;n?U=ft(a,b,1):U=(Math.random()-.5)*.01,C.current=(C.current+1)%i,P.current[C.current]=U;const s=(C.current+1)%i;for(let L=0;L<8;L++){const H=(s+L)%i;P.current[H]=0}}$(),w.current&&(S.current=requestAnimationFrame(p))};return N||(A.current=0,S.current=requestAnimationFrame(p)),()=>{cancelAnimationFrame(S.current)}},[i,r,a,n,v,k,N,$]);const m=()=>!n||a>90?"#ff0040":a>70?"#ff6b00":x;return e.jsxs("div",{className:"ecg-trace",children:[e.jsxs("div",{className:"ecg-trace-header",children:[e.jsx("span",{className:"ecg-trace-label",style:{color:m()},children:u}),e.jsx("span",{className:"ecg-trace-value",style:{color:m()},children:n?`${Math.round(a)}%`:"--"})]}),e.jsx("canvas",{ref:I,style:{width:i,height:r,display:"block"}}),e.jsx("style",{children:`
        .ecg-trace {
          position: relative;
        }

        .ecg-trace-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2px 4px;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(0, 240, 255, 0.2);
        }

        .ecg-trace-label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-shadow: 0 0 6px currentColor;
        }

        .ecg-trace-value {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          text-shadow: 0 0 6px currentColor;
        }

        .ecg-trace canvas {
          display: block;
        }
      `})]})}function ht({cpu:a,memory:u,diskIO:x,isOnline:n,isPaused:i=!1}){const r=t.useRef(null),[N,I]=t.useState(180);return t.useEffect(()=>{const z=r.current;if(!z)return;const P=()=>{const D=z.clientWidth-6;D>0&&I(D)};P();const C=new ResizeObserver(P);return C.observe(z),()=>C.disconnect()},[]),e.jsxs("div",{className:"ecg-monitor-stack",ref:r,children:[e.jsx(Ge,{value:a,label:"CPU",color:"#00f0ff",isOnline:n,width:N,height:32,isPaused:i}),e.jsx(Ge,{value:u,label:"MEM",color:"#00ff88",isOnline:n,width:N,height:32,isPaused:i}),e.jsx(Ge,{value:x,label:"IOW",color:"#ffd700",isOnline:n,width:N,height:32,isPaused:i}),e.jsx("style",{children:`
        .ecg-monitor-stack {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(5, 10, 20, 0.9);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 4px;
          overflow: hidden;
          padding: 2px;
        }

        .ecg-monitor-stack .ecg-trace {
          border-radius: 2px;
          overflow: hidden;
          background: rgba(0, 5, 15, 0.8);
        }

        /* Scanline effect */
        .ecg-monitor-stack::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          pointer-events: none;
          z-index: 1;
        }
      `})]})}const et=new Map,gt=6e4,bt={live:6e4,hour:6e4,day:3e5,week:6e5,month:18e5,year:36e5};function vt({clusterId:a,node:u,timeframe:x,isOnline:n,fallback:i}){const[r,N]=t.useState([]),[I,z]=t.useState(!1),[P,C]=t.useState(!1);t.useEffect(()=>{if(!a||!u||!n){N([]);return}const A=`${a}|${u}|${x}`,w=Date.now(),R=et.get(A);R&&w-R.ts<gt&&N(R.samples);let _=!0;const v=async()=>{z(!0),C(!1);try{const $=await fetch(`/api/clusters/${encodeURIComponent(a)}/nodes/${encodeURIComponent(u)}/rrddata?timeframe=${x}`,{credentials:"same-origin"});if(!$.ok)throw new Error(`HTTP ${$.status}`);const m=await $.json();if(!_)return;const h=(m.samples||m.data||[]).filter(p=>p&&(p.time||p.timestamp));et.set(A,{samples:h,ts:Date.now()}),N(h)}catch{_&&C(!0)}finally{_&&z(!1)}};v();const k=window.setInterval(v,bt[x]);return()=>{_=!1,window.clearInterval(k)}},[a,u,x,n]);const D=t.useMemo(()=>{if(r.length===0)return{cpu:[],mem:[],iow:[]};const A=[],w=[],R=[];for(const _ of r){const v=typeof _.cpu=="number"?_.cpu*100:NaN,k=typeof _.memused=="number"?_.memused:NaN,$=typeof _.memtotal=="number"&&_.memtotal>0?_.memtotal:NaN,m=Number.isFinite(k)&&Number.isFinite($)?k/$*100:NaN,h=typeof _.iowait=="number"?_.iowait:NaN,p=Number.isFinite(h)?h<=1?h*100:h:NaN;A.push(Number.isFinite(v)?v:NaN),w.push(Number.isFinite(m)?m:NaN),R.push(Number.isFinite(p)?p:NaN)}return{cpu:A,mem:w,iow:R}},[r]),S=r.length>=2;return e.jsxs("div",{className:`nrrd-stack ${n?"":"offline"}`,children:[e.jsx(Ye,{label:"CPU",data:D.cpu,color:"#00f0ff",instant:i==null?void 0:i.cpu,hasData:S,loading:I,errored:P}),e.jsx(Ye,{label:"MEM",data:D.mem,color:"#00ff88",instant:i==null?void 0:i.memory,hasData:S,loading:I,errored:P}),e.jsx(Ye,{label:"IOW",data:D.iow,color:"#ffd700",instant:i==null?void 0:i.diskIO,hasData:S,loading:I,errored:P}),e.jsx("style",{children:yt})]})}function Ye({label:a,data:u,color:x,instant:n,hasData:i,loading:r,errored:N}){const I=u.filter(p=>Number.isFinite(p)),z=I.length>0?Math.max(100,Math.max(...I)*1.05):100,P=0,C=200,D=32,S=4,A=4,w=3,R=3,_=C-S-A,v=D-w-R,k=t.useMemo(()=>{if(!i)return"";const p=u.length;if(p<2)return"";let d="",c=!1;for(let j=0;j<p;j++){const E=u[j];if(!Number.isFinite(E)){c=!1;continue}const y=S+j/(p-1)*_,o=w+(1-(E-P)/(z-P))*v;d+=(c?" L ":" M ")+y.toFixed(1)+","+o.toFixed(1),c=!0}return d},[u,i,z]),$=t.useMemo(()=>k?(u.length,`${k} L ${(S+_).toFixed(1)},${(w+v).toFixed(1)} L ${S},${(w+v).toFixed(1)} Z`):"",[k,v,_]),m=(()=>{for(let p=u.length-1;p>=0;p--)if(Number.isFinite(u[p]))return u[p]})(),h=m!==void 0?m:n;return e.jsxs("div",{className:"nrrd-trace",children:[e.jsx("span",{className:"nrrd-label",style:{color:x},children:a}),e.jsxs("svg",{viewBox:`0 0 ${C} ${D}`,preserveAspectRatio:"none",className:"nrrd-svg",children:[i&&$&&e.jsx("path",{d:$,fill:x,opacity:"0.12"}),i&&k&&e.jsx("path",{d:k,fill:"none",stroke:x,strokeWidth:"1.4",style:{filter:`drop-shadow(0 0 2px ${x})`}}),!i&&!r&&!N&&e.jsx("text",{x:C/2,y:D/2+4,textAnchor:"middle",fontSize:"9",fill:"rgba(160,180,200,.5)",fontFamily:"Share Tech Mono, monospace",children:"no data"}),r&&!i&&e.jsx("text",{x:C/2,y:D/2+4,textAnchor:"middle",fontSize:"9",fill:"rgba(160,180,200,.5)",fontFamily:"Share Tech Mono, monospace",children:"loading…"}),N&&e.jsx("text",{x:C/2,y:D/2+4,textAnchor:"middle",fontSize:"9",fill:"#ff6b80",fontFamily:"Share Tech Mono, monospace",children:"rrd err"})]}),e.jsx("span",{className:"nrrd-val",style:{color:x},children:h!==void 0&&Number.isFinite(h)?`${h.toFixed(0)}%`:"—"})]})}const yt=`
.nrrd-stack {
  display: flex; flex-direction: column;
  gap: 2px;
  background: rgba(5, 10, 20, 0.9);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 4px;
  padding: 4px 6px;
  position: relative;
}
.nrrd-stack.offline { opacity: 0.5; }
.nrrd-stack::before {
  content: '';
  position: absolute; inset: 0;
  background:
    linear-gradient(0deg, transparent 50%, rgba(0,240,255,0.03) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  border-radius: inherit;
}
.nrrd-trace {
  display: grid;
  grid-template-columns: 28px 1fr 38px;
  gap: 6px;
  align-items: center;
  position: relative;
  z-index: 1;
}
.nrrd-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.05em;
  text-shadow: 0 0 4px currentColor;
}
.nrrd-svg {
  width: 100%; height: 32px;
  background: rgba(0, 5, 15, 0.6);
  border-radius: 2px;
}
.nrrd-val {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 4px currentColor;
}
`,jt=a=>/permission denied|publickey|authentication|host key|no route to host|connection refused/i.test(a);function wt({clusterId:a,node:u,onClose:x}){const{t:n}=K(),[i,r]=t.useState("api"),[N,I]=t.useState(!1),[z,P]=t.useState(!1),[C,D]=t.useState(""),[S,A]=t.useState(""),[w,R]=t.useState(!1),[_,v]=t.useState(null),[k,$]=t.useState(null),m=C!==""&&S!==""&&C!==S,h=!w&&!m&&!(C!==""&&S===""),p=async()=>{R(!0),v(null),$(null);try{const d=await fetch(`/api/clusters/${encodeURIComponent(a)}/nodes/${encodeURIComponent(u)}/config-backup`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode:i,secrets:z,report:N,passphrase:C})});if(!d.ok){const b=await d.json().catch(()=>({}));throw new Error(b.detail||b.error||`HTTP ${d.status}`)}const c=d.headers.get("X-Config-Filename")||`${u}-config.tar.gz${C?".enc":""}`,j=(d.headers.get("X-Config-Skipped")||"").split("").map(b=>b.trim()).filter(Boolean),E=await d.blob(),y=URL.createObjectURL(E),o=document.createElement("a");o.href=y,o.download=c,document.body.appendChild(o),o.click(),o.remove(),URL.revokeObjectURL(y),$({name:c,skipped:j})}catch(d){v(String(d.message||d))}finally{R(!1)}};return e.jsxs("div",{className:"ncb-back",onClick:x,children:[e.jsxs("div",{className:"ncb-modal",onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{className:"ncb-head",children:[e.jsx("span",{children:n("ncb.title")}),e.jsx("button",{className:"ncb-close",onClick:x,children:"×"})]}),e.jsxs("div",{className:"ncb-body",children:[e.jsxs("p",{className:"ncb-target",children:[e.jsx("span",{className:"ncb-label",children:n("ncb.node")}),e.jsx("code",{children:u})]}),e.jsx("p",{className:"ncb-desc",children:n("ncb.desc")}),e.jsx("div",{className:"ncb-modes",children:["api","ssh"].map(d=>e.jsxs("button",{type:"button",className:`ncb-mode${i===d?" on":""}`,onClick:()=>r(d),children:[e.jsx("span",{className:"ncb-mode-t",children:n(`ncb.mode.${d}`)}),e.jsx("span",{className:"ncb-mode-d",children:n(`ncb.mode.${d}_d`)})]},d))}),i==="api"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ncb-note",children:n("ncb.api_note")}),e.jsxs("label",{className:"ncb-check",children:[e.jsx("input",{type:"checkbox",checked:N,onChange:d=>I(d.target.checked)}),e.jsx("span",{children:n("ncb.report")})]}),N&&e.jsx("div",{className:"ncb-warn",children:n("ncb.report_warn")})]}),i==="ssh"&&e.jsxs(e.Fragment,{children:[e.jsxs("label",{className:"ncb-check",children:[e.jsx("input",{type:"checkbox",checked:z,onChange:d=>P(d.target.checked)}),e.jsx("span",{children:n("ncb.secrets")})]}),z&&e.jsx("div",{className:"ncb-warn",children:n("ncb.secrets_warn")})]}),e.jsxs("div",{className:"ncb-field",children:[e.jsx("label",{children:n("ncb.passphrase")}),e.jsx("input",{type:"password",value:C,autoComplete:"new-password",placeholder:n("ncb.passphrase_ph"),onChange:d=>D(d.target.value)})]}),C!==""&&e.jsxs("div",{className:"ncb-field",children:[e.jsx("label",{children:n("ncb.confirm")}),e.jsx("input",{type:"password",value:S,autoComplete:"new-password",onChange:d=>A(d.target.value)}),m&&e.jsx("div",{className:"ncb-err",children:n("ncb.mismatch")})]}),C!==""&&e.jsxs("div",{className:"ncb-hint",children:[n("ncb.decrypt_hint"),e.jsx("code",{className:"ncb-cmd",children:"openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 -md sha256 -in FILE.enc -out FILE"})]}),_&&e.jsxs("div",{className:"ncb-err",children:[_,jt(_)&&e.jsx("div",{className:"ncb-sshhint",children:n("ncb.ssh_hint")})]}),k&&e.jsxs("div",{className:"ncb-done",children:[e.jsxs("div",{children:[n("ncb.done")," ",e.jsx("code",{children:k.name})]}),k.skipped.length>0&&e.jsxs("div",{className:"ncb-skipped",children:[n("ncb.skipped",{n:k.skipped.length}),e.jsx("ul",{children:k.skipped.map(d=>e.jsx("li",{children:e.jsx("code",{children:d})},d))})]})]})]}),e.jsxs("div",{className:"ncb-foot",children:[e.jsx("button",{className:"ncb-btn",onClick:x,children:n("action.close")}),e.jsx("button",{className:"ncb-btn ncb-btn-go",disabled:!h,onClick:p,children:n(w?"ncb.working":"ncb.download")})]})]}),e.jsx("style",{children:`
        .ncb-back {
          position: fixed; inset: 0; background: rgba(2, 4, 10, .65);
          display: flex; align-items: center; justify-content: center; z-index: 10000;
        }
        .ncb-modal {
          width: min(560px, 94vw); max-height: 88vh; display: flex; flex-direction: column;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid var(--primary-dim); border-radius: 6px;
          box-shadow: 0 0 32px rgba(0, 240, 255, .2); overflow: hidden;
          animation: ncb-in .18s ease-out;
        }
        @keyframes ncb-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .ncb-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, .25);
          color: var(--primary); font-family: var(--font-display); font-size: 14px;
          letter-spacing: .1em; text-transform: uppercase;
        }
        .ncb-close { background: transparent; border: none; color: var(--text-secondary);
                     font-size: 22px; cursor: pointer; line-height: 1; }
        .ncb-foot {
          display: flex; justify-content: flex-end; gap: 10px;
          padding: 12px 18px; border-top: 1px solid rgba(0, 240, 255, .18);
        }
        .ncb-btn {
          padding: 7px 16px; font-family: var(--font-display); font-size: 12px;
          letter-spacing: .08em; text-transform: uppercase; cursor: pointer;
          background: transparent; color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, .18); border-radius: 3px;
        }
        .ncb-btn:hover { color: var(--text-primary); border-color: rgba(255, 255, 255, .35); }
        .ncb-btn-go { color: var(--primary); border-color: var(--primary-dim);
                      background: rgba(0, 240, 255, .08); }
        .ncb-btn-go:disabled { opacity: .45; cursor: not-allowed; }
        .ncb-body { flex: 1; overflow: auto; padding: 14px 18px;
                    display: flex; flex-direction: column; gap: 12px; }
        .ncb-target { display: flex; align-items: center; gap: 8px; margin: 0; }
        .ncb-label { color: var(--text-muted); font-size: 12px; }
        .ncb-desc { margin: 0; color: var(--text-secondary); font-size: 12px; line-height: 1.6; }
        .ncb-modes { display: flex; gap: 8px; }
        .ncb-mode {
          flex: 1; text-align: left; cursor: pointer; padding: 9px 11px;
          background: rgba(0, 0, 0, .3); border: 1px solid rgba(255, 255, 255, .12);
          border-radius: 4px; color: var(--text-secondary);
        }
        .ncb-mode.on { border-color: var(--primary-dim); background: rgba(0, 240, 255, .08); }
        .ncb-mode-t { display: block; font-family: var(--font-display); font-size: 12px;
                      letter-spacing: .06em; text-transform: uppercase; }
        .ncb-mode.on .ncb-mode-t { color: var(--primary); }
        .ncb-mode-d { display: block; margin-top: 3px; font-size: 11px; color: var(--text-muted);
                      line-height: 1.5; }
        .ncb-note { font-size: 11px; color: var(--text-muted); line-height: 1.6;
                    border-left: 2px solid rgba(0, 240, 255, .35); padding-left: 9px; }
        .ncb-check { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; cursor: pointer; }
        .ncb-check input { margin-top: 2px; }
        .ncb-warn {
          border: 1px solid rgba(255, 107, 0, .5); background: rgba(255, 107, 0, .08);
          color: var(--warning); font-size: 12px; line-height: 1.6;
          padding: 8px 10px; border-radius: 3px;
        }
        .ncb-field { display: flex; flex-direction: column; gap: 4px; }
        .ncb-field label { font-size: 12px; color: var(--text-muted); }
        .ncb-field input {
          background: rgba(0, 0, 0, .35); border: 1px solid rgba(0, 216, 239, .25);
          color: var(--text-primary); padding: 7px 10px; border-radius: 3px;
          font-family: var(--font-mono); font-size: 13px;
        }
        .ncb-hint { font-size: 11px; color: var(--text-muted); line-height: 1.6; }
        .ncb-cmd {
          display: block; margin-top: 5px; padding: 7px 9px;
          background: rgba(0, 0, 0, .4); border: 1px solid rgba(255, 255, 255, .08);
          border-radius: 3px; font-size: 11px; overflow-x: auto; white-space: nowrap;
        }
        .ncb-err { color: #ff5c7a; font-size: 12px; line-height: 1.6; }
        .ncb-sshhint { margin-top: 5px; color: var(--warning); }
        .ncb-done { font-size: 12px; color: var(--success); line-height: 1.7; }
        .ncb-skipped { margin-top: 6px; color: var(--warning); }
        .ncb-skipped ul { margin: 4px 0 0; padding-left: 18px; }
      `})]})}function kt({open:a,onClose:u,clusterId:x,node:n}){var y;const{t:i,language:r}=K(),N=te(),z=((y=ze().user)==null?void 0:y.role_global)==="admin",[P,C]=t.useState([]),[D,S]=t.useState(!1),[A,w]=t.useState(null),[R,_]=t.useState(null),[v,k]=t.useState(null),[$,m]=t.useState(""),h=async()=>{if(!(!x||!n)){S(!0),w(null);try{const o=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/apt`,{credentials:"same-origin"});if(!o.ok){const U=await o.json().catch(()=>({}));throw new Error(U.error||`HTTP ${o.status}`)}const b=await o.json();C(b.updates||[])}catch(o){w(o.message||String(o))}finally{S(!1)}}};t.useEffect(()=>{a&&h()},[a,x,n]);const p=o=>{k(o),setTimeout(()=>k(null),3e3)},d=async()=>{var o,b;if(z){_("refresh");try{const U=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/apt/refresh`,{method:"POST",credentials:"same-origin"}),s=await U.json().catch(()=>({}));if(!U.ok)throw new Error(s.error||`HTTP ${U.status}`);p(r==="zh-TW"?`已啟動 apt update（${((o=s.upid)==null?void 0:o.slice(0,24))||""}）`:`apt update kicked off (${((b=s.upid)==null?void 0:b.slice(0,24))||""})`),setTimeout(h,8e3)}catch(U){N.alert(U.message||String(U))}finally{_(null)}}},c=async()=>{if(!(!z||!await N.confirm(r==="zh-TW"?`在 ${n} 上開啟升級主控台？將執行 pveupgrade --shell（等同 apt dist-upgrade），升級過程會在新分頁中互動進行，需要您親自確認。建議先在備援節點測試。`:`Open an upgrade console on ${n}? This runs pveupgrade --shell (apt dist-upgrade) interactively in a new tab, so you drive it yourself. Test on a spare node first.`,{destructive:!0}))){_("upgrade");try{const b=await fetch("/api/console/host/prepare",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:x,node:n,cmd:"upgrade"})}),U=await b.json().catch(()=>({}));if(!b.ok)throw new Error(U.message||U.error||`HTTP ${b.status}`);const s=`/console-host/${encodeURIComponent(x)}/${encodeURIComponent(n)}?ct=${encodeURIComponent(U.console_token)}&cmd=upgrade&lang=${encodeURIComponent(r)}`;window.open(s,"_blank","noopener,noreferrer"),p(r==="zh-TW"?"已開啟升級主控台":"upgrade console opened")}catch(b){N.alert(b.message||String(b))}finally{_(null)}}};if(!a)return null;const j=$.trim().toLowerCase(),E=j?P.filter(o=>(o.Package||"").toLowerCase().includes(j)||(o.Description||"").toLowerCase().includes(j)):P;return e.jsx("div",{className:"apt-back",onClick:u,children:e.jsxs("div",{className:"apt-modal",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"apt-head",children:[e.jsxs("div",{className:"apt-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),e.jsx("span",{children:i("apt.title")}),e.jsx("span",{className:"apt-target",children:n})]}),e.jsxs("div",{className:"apt-actions",children:[e.jsx("input",{className:"apt-filter",value:$,onChange:o=>m(o.target.value),placeholder:i("apt.filter_ph")}),e.jsxs("button",{className:"apt-btn",onClick:h,disabled:D||R!==null,children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("polyline",{points:"1 20 1 14 7 14"}),e.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),e.jsx("span",{children:i("apt.btn_reload")})]}),z&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"apt-btn",onClick:d,disabled:R!==null,children:e.jsx("span",{children:i("apt.btn_refresh")})}),e.jsx("button",{className:"apt-btn primary",onClick:c,disabled:R!==null||P.length===0,children:e.jsx("span",{children:i("apt.btn_upgrade")})})]}),e.jsx("button",{className:"apt-close",onClick:u,children:"×"})]})]}),e.jsxs("div",{className:"apt-meta",children:[e.jsxs("span",{children:[E.length,$&&` / ${P.length}`," ",i("apt.pkgs")]}),!z&&e.jsx("span",{className:"apt-readonly",children:i("apt.readonly")}),v&&e.jsx("span",{className:"apt-toast",children:v})]}),e.jsxs("div",{className:"apt-body",children:[A&&e.jsx("div",{className:"apt-error",children:A}),D&&P.length===0&&e.jsx("div",{className:"apt-empty",children:i("apt.loading")}),!D&&P.length===0&&!A&&e.jsx("div",{className:"apt-empty",children:i("apt.uptodate")}),E.length>0&&e.jsxs("table",{className:"apt-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:i("apt.col.package")}),e.jsx("th",{children:i("apt.col.from")}),e.jsx("th",{children:i("apt.col.to")}),e.jsx("th",{children:i("apt.col.section")})]})}),e.jsx("tbody",{children:E.map(o=>e.jsxs("tr",{title:o.Description||"",children:[e.jsx("td",{className:"apt-mono apt-name",children:o.Package}),e.jsx("td",{className:"apt-mono",children:o.OldVersion||"—"}),e.jsx("td",{className:"apt-mono apt-newver",children:o.Version||"—"}),e.jsx("td",{className:"apt-mono apt-section",children:o.Section||""})]},o.Package))})]})]}),e.jsx("style",{children:`
          .apt-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .apt-modal { width: min(960px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: apt-in .18s ease-out; overflow: hidden; }
          @keyframes apt-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .apt-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; border-bottom: 1px solid rgba(0,240,255,.16); flex-wrap: wrap; }
          .apt-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .apt-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .apt-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
          .apt-filter { padding: 5px 10px; min-width: 200px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .apt-filter:focus { border-color: var(--primary); }
          .apt-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .apt-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
          .apt-btn:disabled { opacity: .4; cursor: not-allowed; }
          .apt-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border-color: transparent; }
          .apt-btn.primary:hover:not(:disabled) { box-shadow: 0 0 14px rgba(0, 240, 255, 0.4); }
          .apt-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .apt-close:hover { color: var(--primary); }
          .apt-meta { padding: 6px 18px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0, 240, 255, .08); display: flex; gap: 14px; align-items: center; }
          .apt-readonly { color: var(--warning); }
          .apt-toast { color: var(--success); }

          .apt-body { flex: 1; overflow: auto; padding: 6px 0; }
          .apt-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .apt-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }

          .apt-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .apt-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .apt-table th { padding: 6px 14px; text-align: left; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .apt-table td { padding: 4px 14px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .apt-table tbody tr:hover { background: rgba(0,240,255,.04); }
          .apt-name { color: var(--primary); }
          .apt-newver { color: var(--success); }
          .apt-section { color: var(--text-secondary); font-size: 12.5px; }
        `})]})})}function Nt({open:a,onClose:u,clusterId:x}){var H;const{t:n}=K(),i=te(),N=((H=ze().user)==null?void 0:H.role_global)==="admin",[I,z]=t.useState([]),[P,C]=t.useState(!1),[D,S]=t.useState(null),[A,w]=t.useState(null),[R,_]=t.useState({}),[v,k]=t.useState(0),[$,m]=t.useState(!1),[h,p]=t.useState({poolid:"",comment:""}),[d,c]=t.useState({vms:"",storage:""}),[j,E]=t.useState(!1),y=/^[A-Za-z][A-Za-z0-9_\-]{0,63}$/,o=()=>{_({}),k(f=>f+1)},b=async()=>{if(!y.test(h.poolid)){S("Bad pool id");return}E(!0),S(null);try{const f=await fetch(`/api/clusters/${encodeURIComponent(x)}/pools`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)}),l=await f.json().catch(()=>({}));if(!f.ok||!l.ok)throw new Error(l.detail||l.error||`HTTP ${f.status}`);m(!1),p({poolid:"",comment:""}),o()}catch(f){S(f.message||String(f))}finally{E(!1)}},U=async f=>{if(await i.confirm(`Delete pool "${f}"?

Members (VMs / storages) are NOT deleted; they're just unbound.`,{title:"Delete pool?",destructive:!0}))try{const g=await fetch(`/api/clusters/${encodeURIComponent(x)}/pools/${encodeURIComponent(f)}`,{method:"DELETE",credentials:"same-origin"}),F=await g.json().catch(()=>({}));if(!g.ok||!F.ok)throw new Error(F.detail||F.error||`HTTP ${g.status}`);o()}catch(g){await i.alert(`Delete failed: ${g.message||g}`)}},s=async(f,l)=>{const g={delete:l};if(d.vms.trim()&&(g.vms=d.vms.trim()),d.storage.trim()&&(g.storage=d.storage.trim()),!(!g.vms&&!g.storage))try{const F=await fetch(`/api/clusters/${encodeURIComponent(x)}/pools/${encodeURIComponent(f)}`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)}),B=await F.json().catch(()=>({}));if(!F.ok||!B.ok)throw new Error(B.detail||B.error||`HTTP ${F.status}`);c({vms:"",storage:""}),o()}catch(F){await i.alert(`Update failed: ${F.message||F}`)}};t.useEffect(()=>{if(!a)return;let f=!0;return(async()=>{C(!0),S(null);try{const l=await fetch(`/api/clusters/${encodeURIComponent(x)}/pools`,{credentials:"same-origin"});if(!l.ok){const F=await l.json().catch(()=>({}));throw new Error(F.error||`HTTP ${l.status}`)}const g=await l.json();f&&z(g.pools||[])}catch(l){f&&S(l.message||String(l))}finally{f&&C(!1)}})(),()=>{f=!1}},[a,x,v]);const L=async f=>{if(A===f){w(null);return}if(w(f),!R[f])try{const l=await fetch(`/api/clusters/${encodeURIComponent(x)}/pools/${encodeURIComponent(f)}`,{credentials:"same-origin"});if(!l.ok)throw new Error(`HTTP ${l.status}`);const g=await l.json();_(F=>{var B;return{...F,[f]:((B=g.pool)==null?void 0:B.members)||[]}})}catch{_(l=>({...l,[f]:[]}))}};return a?e.jsx("div",{className:"po-back",onClick:u,children:e.jsxs("div",{className:"po-modal",onClick:f=>f.stopPropagation(),children:[e.jsxs("div",{className:"po-head",children:[e.jsxs("div",{className:"po-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"6",cy:"6",r:"2"}),e.jsx("circle",{cx:"6",cy:"18",r:"2"}),e.jsx("circle",{cx:"18",cy:"6",r:"2"}),e.jsx("circle",{cx:"18",cy:"18",r:"2"}),e.jsx("line",{x1:"8",y1:"6",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"18",x2:"16",y2:"18"}),e.jsx("line",{x1:"6",y1:"8",x2:"6",y2:"16"}),e.jsx("line",{x1:"18",y1:"8",x2:"18",y2:"16"})]}),e.jsx("span",{children:n("pools.title")})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[N&&!$&&e.jsx("button",{className:"po-add-btn",onClick:()=>{m(!0),S(null)},children:"+ Pool"}),e.jsx("button",{className:"po-close",onClick:u,children:"×"})]})]}),$&&N&&e.jsxs("div",{className:"po-create",children:[e.jsx("input",{placeholder:"pool id (e.g. tenant1)",value:h.poolid,onChange:f=>p({...h,poolid:f.target.value})}),e.jsx("input",{placeholder:"comment (optional)",value:h.comment,onChange:f=>p({...h,comment:f.target.value})}),e.jsx("button",{onClick:()=>{m(!1),S(null)},disabled:j,children:"Cancel"}),e.jsx("button",{className:"po-primary",onClick:b,disabled:j||!y.test(h.poolid),children:j?"…":"Create"})]}),e.jsxs("div",{className:"po-body",children:[D&&e.jsx("div",{className:"po-error",children:D}),P&&I.length===0&&e.jsx("div",{className:"po-empty",children:n("pools.loading")}),!P&&I.length===0&&!D&&e.jsx("div",{className:"po-empty",children:n("pools.empty")}),I.map(f=>{const l=f.poolid||"",g=A===l,F=R[l]||[];return e.jsxs("div",{className:"po-row",children:[e.jsxs("div",{className:"po-row-head",onClick:()=>L(l),children:[e.jsx("span",{className:"po-chevron",children:g?"▾":"▸"}),e.jsx("span",{className:"po-name",children:l}),f.comment&&e.jsx("span",{className:"po-comment",children:f.comment}),e.jsx("span",{className:"po-count",children:f.members_count!=null?`${f.members_count} ${n("pools.members")}`:""}),N&&e.jsx("button",{className:"po-del",onClick:B=>{B.stopPropagation(),U(l)},children:"Delete"})]}),g&&e.jsxs("div",{className:"po-members",children:[N&&e.jsxs("div",{className:"po-mem-add",children:[e.jsx("input",{placeholder:"vmids (e.g. 100,101)",value:d.vms,onChange:B=>c({...d,vms:B.target.value.replace(/[^0-9,]/g,"")})}),e.jsx("input",{placeholder:"storage ids (e.g. local,ceph)",value:d.storage,onChange:B=>c({...d,storage:B.target.value})}),e.jsx("button",{onClick:()=>s(l,!1),children:"+ Add"}),e.jsx("button",{className:"po-del",onClick:()=>s(l,!0),children:"− Remove"})]}),F.length===0?e.jsx("div",{className:"po-empty-inline",children:n("pools.no_members")}):e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:n("pools.col.type")}),e.jsx("th",{children:n("pools.col.id")}),e.jsx("th",{children:n("pools.col.name")}),e.jsx("th",{children:n("pools.col.node")}),e.jsx("th",{children:n("pools.col.status")})]})}),e.jsx("tbody",{children:F.map((B,G)=>e.jsxs("tr",{children:[e.jsx("td",{className:"po-mono",children:e.jsx("span",{className:`po-kind po-kind-${B.type}`,children:B.type})}),e.jsx("td",{className:"po-mono",children:B.vmid||B.storage||B.id}),e.jsx("td",{className:"po-mono",children:B.name||B.storage||""}),e.jsx("td",{className:"po-mono",children:B.node||""}),e.jsx("td",{className:"po-mono",children:B.status||""})]},`${B.type}-${B.id||G}`))})]})]})]},l)})]}),e.jsx("style",{children:`
          .po-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .po-modal { width: min(900px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); overflow: hidden; animation: po-in .18s ease-out; }
          @keyframes po-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .po-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .po-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .po-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .po-close:hover { color: var(--primary); }
          .po-body { flex: 1; overflow: auto; padding: 6px 0; }
          .po-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .po-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }

          .po-row { border-bottom: 1px solid rgba(0,240,255,.06); }
          .po-row-head { display: flex; align-items: center; gap: 12px; padding: 10px 18px; cursor: pointer; transition: background .12s; }
          .po-row-head:hover { background: rgba(0,240,255,.05); }
          .po-chevron { color: var(--primary); font-family: var(--font-mono); width: 12px; }
          .po-name { font-family: var(--font-mono); color: var(--primary); font-size: 13px; }
          .po-comment { font-family: var(--font-mono); color: var(--text-secondary); font-size: 13px; }
          .po-count { margin-left: auto; font-family: var(--font-mono); color: var(--text-secondary); font-size: 13.5px; }

          .po-members { padding: 8px 18px 18px 30px; background: rgba(0, 240, 255, 0.02); }
          .po-empty-inline { color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; padding: 8px 0; }
          .po-members table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .po-members th { padding: 4px 10px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.1); }
          .po-members td { padding: 3px 10px; color: var(--text-primary); border-bottom: 1px solid rgba(0,240,255,.04); white-space: nowrap; }
          .po-mono { font-family: var(--font-mono); }
          .po-kind { display: inline-block; padding: 1px 7px; font-size: 13.5px; border-radius: 2px; font-family: var(--font-display); letter-spacing: .04em; border: 1px solid currentColor; }
          .po-kind-qemu    { color: var(--primary); }
          .po-kind-lxc     { color: var(--accent); }
          .po-kind-storage { color: var(--warning); }
          .po-add-btn { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .po-add-btn:hover { background: rgba(0,240,255,.2); }
          .po-create { display: flex; gap: 8px; align-items: center; padding: 10px 18px; border-bottom: 1px solid rgba(0,240,255,.16); background: rgba(0, 240, 255, 0.04); }
          .po-create input { flex: 1; padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .po-create button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .po-create .po-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .po-mem-add { display: flex; gap: 6px; align-items: center; margin-bottom: 10px; padding: 8px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .po-mem-add input { flex: 1; padding: 4px 8px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .po-mem-add button { padding: 3px 10px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .po-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; margin-left: 8px; }
          .po-del:hover { background: rgba(255, 77, 109, 0.1); }
        `})]})}):null}function Ct({open:a,onClose:u,clusterId:x,clusterName:n}){var E;const{t:i,language:r}=K(),N=ze(),I=te(),z=((E=N.user)==null?void 0:E.role_global)==="admin",[P,C]=t.useState(""),[D,S]=t.useState(""),[A,w]=t.useState(""),[R,_]=t.useState(0),[v,k]=t.useState(!1),[$,m]=t.useState(!1),[h,p]=t.useState(null);t.useEffect(()=>{if(!a)return;let y=!0;return(async()=>{k(!0),p(null);try{const o=await fetch(`/api/clusters/${encodeURIComponent(x)}/notes`,{credentials:"same-origin"});if(!o.ok){const U=await o.json().catch(()=>({}));throw new Error(U.error||`HTTP ${o.status}`)}const b=await o.json();if(!y)return;C(b.notes||""),S(b.notes||""),w(b.updated_by||""),_(b.updated_at||0)}catch(o){y&&p(o.message||String(o))}finally{y&&k(!1)}})(),()=>{y=!1}},[a,x]);const d=P!==D,c=async()=>{var y;if(!(!d||$)){m(!0),p(null);try{const o=await fetch(`/api/clusters/${encodeURIComponent(x)}/notes`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({notes:P})});if(!o.ok){const b=await o.json().catch(()=>({}));throw new Error(b.error||`HTTP ${o.status}`)}S(P),w(((y=N.user)==null?void 0:y.username)||""),_(Math.floor(Date.now()/1e3))}catch(o){p(o.message||String(o))}finally{m(!1)}}},j=async()=>{d&&!await I.confirm(r==="zh-TW"?"尚未儲存的內容會丟掉，確定關閉？":"Unsaved changes will be lost. Close anyway?",{destructive:!0})||u()};return a?e.jsx("div",{className:"cn-back",onClick:j,children:e.jsxs("div",{className:"cn-modal",onClick:y=>y.stopPropagation(),children:[e.jsxs("div",{className:"cn-head",children:[e.jsxs("div",{className:"cn-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),e.jsx("polyline",{points:"10 9 9 9 8 9"})]}),e.jsx("span",{children:i("notes.title")}),n&&e.jsx("span",{className:"cn-target",children:n})]}),e.jsx("button",{className:"cn-close",onClick:j,children:"×"})]}),e.jsxs("div",{className:"cn-meta",children:[R>0?e.jsxs("span",{children:[i("notes.updated_by")," ",e.jsx("b",{children:A||"?"})," · ",new Date(R*1e3).toLocaleString()]}):e.jsx("span",{children:i("notes.never_set")}),!z&&e.jsx("span",{className:"cn-readonly",children:i("notes.readonly")}),d&&e.jsx("span",{className:"cn-dirty",children:i("notes.dirty")})]}),e.jsxs("div",{className:"cn-body",children:[h&&e.jsx("div",{className:"cn-error",children:h}),e.jsx("textarea",{className:"cn-text",value:P,onChange:y=>C(y.target.value),disabled:!z||v||$,placeholder:i("notes.placeholder")})]}),e.jsxs("div",{className:"cn-footer",children:[e.jsxs("span",{className:"cn-charcount",children:[P.length," / 16384"]}),e.jsx("span",{style:{flex:1}}),e.jsx("button",{className:"cn-btn ghost",onClick:j,children:i("notes.cancel")}),z&&e.jsx("button",{className:"cn-btn primary",onClick:c,disabled:!d||$,children:i($?"notes.saving":"notes.save")})]}),e.jsx("style",{children:`
          .cn-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .cn-modal { width: min(720px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: cn-in .18s ease-out; overflow: hidden; }
          @keyframes cn-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .cn-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .cn-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .cn-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13px; letter-spacing: .04em; text-transform: none; }
          .cn-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .cn-close:hover { color: var(--primary); }
          .cn-meta { padding: 8px 18px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.08); display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
          .cn-meta b { color: var(--text-primary); font-weight: 600; }
          .cn-readonly { color: var(--warning); }
          .cn-dirty { color: var(--accent); }
          .cn-body { flex: 1; padding: 14px 18px; display: flex; flex-direction: column; }
          .cn-error { padding: 8px 14px; margin-bottom: 8px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .cn-text { flex: 1; min-height: 240px; padding: 12px 14px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; font-family: var(--font-mono); font-size: 13px; resize: none; outline: none; line-height: 1.5; }
          .cn-text:focus { border-color: var(--primary); }
          .cn-text:disabled { opacity: .85; cursor: default; }
          .cn-footer { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); }
          .cn-charcount { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .cn-btn { padding: 6px 16px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .cn-btn.primary { color: #001018; background: linear-gradient(135deg, var(--primary), #00b8d4); border: none; }
          .cn-btn.primary:hover:not(:disabled) { box-shadow: 0 0 16px rgba(0, 240, 255, 0.4); }
          .cn-btn.primary:disabled { opacity: .4; cursor: not-allowed; }
          .cn-btn.ghost { color: var(--text-secondary); background: transparent; border: 1px solid rgba(0, 240, 255, 0.4); }
          .cn-btn.ghost:hover { color: var(--primary); border-color: var(--primary); }
        `})]})}):null}const $t={active:"success",running:"success",inactive:"muted",failed:"danger",reloading:"warning",activating:"warning"};function zt({open:a,onClose:u,clusterId:x,node:n,onShowLogs:i}){var d;const{t:r,language:N}=K(),I=ze(),z=te(),P=((d=I.user)==null?void 0:d.role_global)==="admin",[C,D]=t.useState([]),[S,A]=t.useState(!1),[w,R]=t.useState(null),[_,v]=t.useState(null),[k,$]=t.useState(null),m=async()=>{A(!0),R(null);try{const c=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/services`,{credentials:"same-origin"});if(!c.ok){const E=await c.json().catch(()=>({}));throw new Error(E.error||`HTTP ${c.status}`)}const j=await c.json();D(j.services||[])}catch(c){R(c.message||String(c))}finally{A(!1)}};t.useEffect(()=>{a&&m()},[a,x,n]);const h=c=>{$(c),setTimeout(()=>$(null),3500)},p=async(c,j)=>{if(!(!P||_||(/^(pveproxy|pvedaemon|pvestatd|corosync|pve-cluster|pve-firewall|pve-lxc-syscalld)$/.test(c)||j==="stop")&&!await z.confirm(N==="zh-TW"?`確定在 ${n} 上對 ${c} 執行 ${j}？關鍵服務動作可能影響整個叢集，請確認。`:`Run ${j} on ${c}@${n}? Critical-service actions can affect the whole cluster.`,{destructive:j==="stop"||j==="restart"}))){v(`${c}:${j}`);try{const o=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/services/${encodeURIComponent(c)}/${j}`,{method:"POST",credentials:"same-origin"}),b=await o.json().catch(()=>({}));if(!o.ok)throw new Error(b.detail||b.error||`HTTP ${o.status}`);h(N==="zh-TW"?`${c} ${j} 已啟動 (${(b.upid||"").slice(0,24)})`:`${c} ${j} kicked off (${(b.upid||"").slice(0,24)})`),setTimeout(m,1500)}catch(o){z.alert(o.message||String(o))}finally{v(null)}}};return a?e.jsx("div",{className:"ns-back",onClick:u,children:e.jsxs("div",{className:"ns-modal",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"ns-head",children:[e.jsxs("div",{className:"ns-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"})]}),e.jsx("span",{children:r("svcs.title")}),e.jsx("span",{className:"ns-target",children:n})]}),e.jsx("button",{className:"ns-close",onClick:u,children:"×"})]}),e.jsxs("div",{className:"ns-body",children:[w&&e.jsx("div",{className:"ns-error",children:w}),S&&C.length===0&&e.jsx("div",{className:"ns-empty",children:r("svcs.loading")}),k&&e.jsx("div",{className:"ns-toast",children:k}),C.length>0&&e.jsxs("table",{className:"ns-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:r("svcs.col.service")}),e.jsx("th",{children:r("svcs.col.state")}),e.jsx("th",{children:r("svcs.col.desc")}),P&&e.jsx("th",{children:r("svcs.col.actions")})]})}),e.jsx("tbody",{children:C.map(c=>{const j=(c["active-state"]||c.state||c["unit-state"]||"").toLowerCase(),E=c.service||c.name||"",y=_==null?void 0:_.startsWith(`${E}:`);return e.jsxs("tr",{children:[e.jsx("td",{className:"ns-mono",children:E}),e.jsx("td",{children:e.jsx("span",{className:`ns-state ns-state-${$t[j]||"muted"}`,children:j||"—"})}),e.jsx("td",{className:"ns-mono ns-desc",title:c.desc||"",children:c.desc||""}),P&&e.jsxs("td",{className:"ns-actions",children:[e.jsx("button",{className:"ns-act start",disabled:!!_||j==="active",onClick:()=>p(E,"start"),children:r("svcs.act.start")}),e.jsx("button",{className:"ns-act restart",disabled:!!_,onClick:()=>p(E,"restart"),children:r("svcs.act.restart")}),e.jsx("button",{className:"ns-act reload",disabled:!!_||j!=="active",onClick:()=>p(E,"reload"),children:r("svcs.act.reload")}),e.jsx("button",{className:"ns-act stop",disabled:!!_||j!=="active",onClick:()=>p(E,"stop"),children:r("svcs.act.stop")}),i&&e.jsx("button",{className:"ns-act",title:r("svcs.act.logs"),onClick:()=>i(E),children:r("svcs.act.logs")}),y&&e.jsx("span",{className:"ns-spinner"})]})]},E)})})]})]}),e.jsx("style",{children:`
          .ns-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .ns-modal { width: min(820px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: ns-in .18s ease-out; overflow: hidden; }
          @keyframes ns-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ns-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .ns-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .ns-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .ns-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .ns-close:hover { color: var(--primary); }
          .ns-body { flex: 1; overflow: auto; padding: 6px 0; }
          .ns-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .ns-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .ns-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .ns-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .ns-table th { padding: 6px 14px; text-align: left; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .ns-table td { padding: 4px 14px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .ns-mono { font-family: var(--font-mono); }
          .ns-state { display: inline-flex; align-items: center; gap: 6px; padding: 1px 8px; border-radius: 999px; font-size: 12.5px; border: 1px solid currentColor; }
          .ns-state::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 4px currentColor; }
          .ns-state-success { color: var(--success); }
          .ns-state-warning { color: var(--warning); }
          .ns-state-danger  { color: var(--danger, #ff4d6d); }
          .ns-state-muted   { color: var(--text-muted); }
          .ns-desc { max-width: 320px; overflow: hidden; text-overflow: ellipsis; }
          .ns-actions { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
          .ns-act { padding: 2px 8px; font-family: var(--font-display); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; background: rgba(0,240,255,.05); color: var(--text-secondary); border: 1px solid rgba(0,240,255,.2); border-radius: 2px; cursor: pointer; }
          .ns-act:hover:not(:disabled) { color: var(--primary); border-color: var(--primary); background: rgba(0,240,255,.12); }
          .ns-act:disabled { opacity: .35; cursor: not-allowed; }
          .ns-act.stop:hover:not(:disabled)    { color: var(--danger, #ff4d6d); border-color: var(--danger, #ff4d6d); background: rgba(255,77,109,.08); }
          .ns-act.restart:hover:not(:disabled) { color: var(--warning); border-color: var(--warning); background: rgba(255,107,0,.08); }
          .ns-act.start:hover:not(:disabled)   { color: var(--success); border-color: var(--success); background: rgba(0,255,136,.08); }
          .ns-spinner { display: inline-block; width: 10px; height: 10px; border: 1.5px solid rgba(0,240,255,.3); border-top-color: var(--primary); border-radius: 50%; animation: ns-spin 0.7s linear infinite; }
          @keyframes ns-spin { to { transform: rotate(360deg); } }
          .ns-toast { padding: 6px 14px; margin: 0 18px 8px; border: 1px solid var(--success); border-left-width: 3px; background: rgba(0,255,136,.06); color: var(--success); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
        `})]})}):null}function St({open:a,onClose:u,clusterId:x,node:n,initialService:i}){const{t:r}=K(),[N,I]=t.useState([]),[z,P]=t.useState(!1),[C,D]=t.useState(null),[S,A]=t.useState(""),[w,R]=t.useState("");t.useEffect(()=>{a&&R(i||"")},[a,i]);const[_,v]=t.useState(!0),k=t.useRef(null),$=async()=>{if(!(!x||!n)){P(!0),D(null);try{const p=new URLSearchParams;p.set("lines","1000"),w&&p.set("service",w);const d=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/syslog?`+p.toString(),{credentials:"same-origin"});if(!d.ok){const j=await d.json().catch(()=>({}));throw new Error(j.error||`HTTP ${d.status}`)}const c=await d.json();I(c.lines||[])}catch(p){D(p.message||String(p))}finally{P(!1)}}};t.useEffect(()=>{a&&$()},[a,x,n,w]),t.useEffect(()=>{if(!a||!_)return;const p=setInterval($,5e3);return()=>clearInterval(p)},[a,_,x,n,w]);const m=S.trim().toLowerCase(),h=m?N.filter(p=>(p.t||"").toLowerCase().includes(m)):N;return a?e.jsx("div",{className:"sl-back",onClick:u,children:e.jsxs("div",{className:"sl-modal",onClick:p=>p.stopPropagation(),children:[e.jsxs("div",{className:"sl-head",children:[e.jsxs("div",{className:"sl-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),e.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),e.jsx("span",{children:r("nslog.title")}),e.jsx("span",{className:"sl-target",children:n})]}),e.jsxs("div",{className:"sl-actions",children:[e.jsx("input",{className:"sl-svc",value:w,onChange:p=>R(p.target.value),placeholder:r("nslog.svc_ph"),size:18}),e.jsx("input",{className:"sl-filter",value:S,onChange:p=>A(p.target.value),placeholder:r("nslog.filter_ph")}),e.jsxs("label",{className:"sl-auto",children:[e.jsx("input",{type:"checkbox",checked:_,onChange:p=>v(p.target.checked)}),r("tasks.auto_refresh")]}),e.jsxs("button",{className:"sl-btn",onClick:$,disabled:z,children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("polyline",{points:"1 20 1 14 7 14"}),e.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),e.jsx("span",{children:r("tasks.refresh")})]}),e.jsx("button",{className:"sl-close",onClick:u,children:"×"})]})]}),e.jsx("div",{className:"sl-meta",children:e.jsxs("span",{children:[h.length,S&&` / ${N.length}`]})}),e.jsxs("div",{className:"sl-body",children:[C&&e.jsx("div",{className:"sl-error",children:C}),h.length===0&&!z&&e.jsx("div",{className:"sl-empty",children:r(S?"clog.no_match":"clog.empty")}),h.map((p,d)=>e.jsx("div",{className:"sl-row",children:p.t||""},p.n??d)),e.jsx("div",{ref:k})]}),e.jsx("style",{children:`
          .sl-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .sl-modal { width: min(1200px, 96vw); height: 80vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: sl-in .18s ease-out; overflow: hidden; }
          @keyframes sl-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .sl-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); flex-wrap: wrap; }
          .sl-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .sl-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .sl-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
          .sl-svc, .sl-filter { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .sl-svc { width: 160px; }
          .sl-filter { width: 200px; }
          .sl-svc:focus, .sl-filter:focus { border-color: var(--primary); }
          .sl-auto { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); cursor: pointer; }
          .sl-auto input { accent-color: var(--primary); }
          .sl-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 3px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .sl-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
          .sl-btn:disabled { opacity: .5; cursor: not-allowed; }
          .sl-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .sl-close:hover { color: var(--primary); }
          .sl-meta { padding: 6px 18px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border-bottom: 1px solid rgba(0, 240, 255, .08); }
          .sl-body { flex: 1; overflow: auto; padding: 6px 12px; font-family: var(--font-mono); font-size: 13.5px; }
          .sl-empty { padding: 32px 12px; text-align: center; color: var(--text-muted); font-style: italic; }
          .sl-error { padding: 8px 14px; margin: 6px 0; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); border-radius: 2px; }
          .sl-row { padding: 1px 8px; color: var(--text-primary); white-space: pre-wrap; word-break: break-all; font-family: var(--font-mono); }
          .sl-row:hover { background: rgba(0, 240, 255, 0.04); }
        `})]})}):null}const $e=a=>{if(!a||a<=0)return"—";const u=["B","KiB","MiB","GiB","TiB","PiB"];let x=0,n=a;for(;n>=1024&&x<u.length-1;)n/=1024,x++;return`${n.toFixed(n<10?2:1)} ${u[x]}`},_t=a=>{if(!a)return"—";const u=Math.floor(a/86400),x=Math.floor(a%86400/3600),n=Math.floor(a%3600/60);return u>0?`${u}d ${x}h ${n}m`:`${x}h ${n}m`};function Rt({open:a,onClose:u,clusterId:x,node:n}){var h,p,d,c,j,E,y,o,b,U,s,L,H,f,l;const{t:i}=K(),[r,N]=t.useState(null),[I,z]=t.useState([]),[P,C]=t.useState(!1),[D,S]=t.useState(null),[A,w]=t.useState(null),[R,_]=t.useState(null),[v,k]=t.useState(!1);t.useEffect(()=>{if(!a)return;let g=!0;return(async()=>{C(!0),S(null);try{const F=encodeURIComponent(x),B=encodeURIComponent(n),[G,O]=await Promise.all([fetch(`/api/clusters/${F}/nodes/${B}/hardware`,{credentials:"same-origin"}),fetch(`/api/clusters/${F}/nodes/${B}/disks`,{credentials:"same-origin"})]);if(!g)return;if(G.ok&&N(await G.json()),O.ok){const W=await O.json();z(W.disks||[])}}catch(F){g&&S(F.message||String(F))}finally{g&&C(!1)}})(),()=>{g=!1}},[a,x,n]),t.useEffect(()=>{a||(w(null),_(null))},[a]);const $=async g=>{const F=g.replace(/^\/dev\//,"");w(F),_(null),k(!0);try{const B=encodeURIComponent(x),G=encodeURIComponent(n),O=await fetch(`/api/clusters/${B}/nodes/${G}/disks/${encodeURIComponent(F)}/smart`,{credentials:"same-origin"}),W=await O.json();if(!O.ok)throw new Error(W.detail||W.error||`HTTP ${O.status}`);_(W.smart)}catch(B){_({_error:B.message||String(B)})}finally{k(!1)}};if(!a)return null;const m=r==null?void 0:r.status;return e.jsx("div",{className:"nh-back",onClick:u,children:e.jsxs("div",{className:"nh-modal",onClick:g=>g.stopPropagation(),children:[e.jsxs("div",{className:"nh-head",children:[e.jsxs("div",{className:"nh-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"1"}),e.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"1"}),e.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),e.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]}),e.jsx("span",{children:i("nhw.title")}),e.jsx("span",{className:"nh-target",children:n})]}),e.jsx("button",{className:"nh-close",onClick:u,children:"×"})]}),e.jsxs("div",{className:"nh-body",children:[D&&e.jsx("div",{className:"nh-error",children:D}),P&&!r&&e.jsx("div",{className:"nh-empty",children:i("nhw.loading")}),m&&e.jsx(De,{title:i("nhw.section.system"),children:e.jsxs("div",{className:"nh-kv",children:[e.jsx(oe,{k:i("nhw.cpu.model"),v:((h=m.cpuinfo)==null?void 0:h.model)||"—"}),e.jsx(oe,{k:i("nhw.cpu.layout"),v:`${((p=m.cpuinfo)==null?void 0:p.sockets)??"?"}× sockets / ${((d=m.cpuinfo)==null?void 0:d.cores)??"?"} cores / ${((c=m.cpuinfo)==null?void 0:c.cpus)??"?"} threads`}),e.jsx(oe,{k:i("nhw.cpu.mhz"),v:(j=m.cpuinfo)!=null&&j.mhz?`${m.cpuinfo.mhz} MHz`:"—"}),e.jsx(oe,{k:i("nhw.kernel"),v:((E=m.current_kernel)==null?void 0:E.release)||m.kversion||"—"}),e.jsx(oe,{k:i("nhw.pveversion"),v:m.pveversion||"—"}),e.jsx(oe,{k:i("nhw.bootmode"),v:`${((y=m.bootinfo)==null?void 0:y.mode)||"—"}${(o=m.bootinfo)!=null&&o.secureboot?" (Secure Boot)":""}`}),e.jsx(oe,{k:i("nhw.uptime"),v:_t(m.uptime)}),e.jsx(oe,{k:i("nhw.loadavg"),v:(m.loadavg||[]).join(" / ")||"—"})]})}),m&&e.jsx(De,{title:i("nhw.section.memory"),children:e.jsxs("div",{className:"nh-kv",children:[e.jsx(oe,{k:"memory total",v:$e((b=m.memory)==null?void 0:b.total)}),e.jsx(oe,{k:"memory used",v:$e((U=m.memory)==null?void 0:U.used)}),e.jsx(oe,{k:"memory free",v:$e((s=m.memory)==null?void 0:s.free)}),e.jsx(oe,{k:"swap total",v:$e((L=m.swap)==null?void 0:L.total)}),e.jsx(oe,{k:"swap used",v:$e((H=m.swap)==null?void 0:H.used)}),e.jsx(oe,{k:"rootfs used / total",v:`${$e((f=m.rootfs)==null?void 0:f.used)} / ${$e((l=m.rootfs)==null?void 0:l.total)}`})]})}),I.length>0&&e.jsx(De,{title:i("nhw.section.disks"),children:e.jsxs("table",{className:"nh-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:i("nhw.disk.dev")}),e.jsx("th",{children:i("nhw.disk.type")}),e.jsx("th",{children:i("nhw.disk.size")}),e.jsx("th",{children:i("nhw.disk.model")}),e.jsx("th",{children:i("nhw.disk.serial")}),e.jsx("th",{children:i("nhw.disk.used")}),e.jsx("th",{children:i("nhw.disk.wearout")}),e.jsx("th",{children:i("nhw.disk.health")}),e.jsx("th",{})]})}),e.jsx("tbody",{children:I.map(g=>{const F=(g.health||"").toUpperCase(),B=F==="PASSED"?"ok":F==="FAILED"?"bad":"mute";return e.jsxs("tr",{children:[e.jsx("td",{className:"nh-mono",children:g.devpath}),e.jsx("td",{children:e.jsx("span",{className:"nh-disk-type",children:g.type||(g.rotational?"hdd":"ssd")})}),e.jsx("td",{className:"nh-mono",children:$e(g.size)}),e.jsx("td",{className:"nh-mono nh-trunc",title:g.model||"",children:g.model||"—"}),e.jsx("td",{className:"nh-mono nh-trunc",title:g.serial||"",children:g.serial||"—"}),e.jsx("td",{className:"nh-mono",children:g.used||"—"}),e.jsx("td",{className:"nh-mono",children:g.wearout!=null?`${g.wearout}%`:"—"}),e.jsx("td",{children:e.jsx("span",{className:`nh-h ${B}`,children:F||"—"})}),e.jsx("td",{children:e.jsx("button",{className:"nh-row-btn",onClick:()=>$(g.devpath||""),children:"SMART"})})]},g.devpath)})})]})}),(r==null?void 0:r.pci)&&r.pci.length>0&&e.jsx(De,{title:i("nhw.section.pci"),children:e.jsxs("table",{className:"nh-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"id"}),e.jsx("th",{children:"class"}),e.jsx("th",{children:"vendor"}),e.jsx("th",{children:"device"})]})}),e.jsx("tbody",{children:r.pci.map((g,F)=>e.jsxs("tr",{children:[e.jsx("td",{className:"nh-mono",children:g.id||"—"}),e.jsx("td",{className:"nh-mono",children:g.class||"—"}),e.jsx("td",{className:"nh-mono nh-trunc",title:g.vendor||"",children:g.vendor||"—"}),e.jsx("td",{className:"nh-mono nh-trunc",title:g.device||"",children:g.device||"—"})]},F))})]})}),(r==null?void 0:r.usb)&&r.usb.length>0&&e.jsx(De,{title:i("nhw.section.usb"),children:e.jsxs("table",{className:"nh-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"bus:port"}),e.jsx("th",{children:"vid:pid"}),e.jsx("th",{children:"class"}),e.jsx("th",{children:"product"})]})}),e.jsx("tbody",{children:r.usb.map((g,F)=>e.jsxs("tr",{children:[e.jsxs("td",{className:"nh-mono",children:[g.bus,":",g.portpath||"—"]}),e.jsxs("td",{className:"nh-mono",children:[g.vendid||"—",":",g.prodid||"—"]}),e.jsx("td",{className:"nh-mono",children:g.class||"—"}),e.jsx("td",{className:"nh-mono nh-trunc",title:g.product||"",children:g.product||g.manufacturer||"—"})]},F))})]})})]}),A&&e.jsx("div",{className:"nh-overlay",onClick:()=>w(null),children:e.jsxs("div",{className:"nh-overlay-card",onClick:g=>g.stopPropagation(),children:[e.jsxs("div",{className:"nh-overlay-head",children:[e.jsxs("span",{children:["SMART · /dev/",A]}),e.jsx("button",{onClick:()=>w(null),children:"×"})]}),v&&e.jsx("div",{className:"nh-empty",children:i("nhw.loading")}),(R==null?void 0:R._error)&&e.jsx("div",{className:"nh-error",children:R._error}),R&&!v&&!R._error&&e.jsx("pre",{className:"nh-smart",children:JSON.stringify(R,null,2)})]})}),e.jsx("style",{children:`
          .nh-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .nh-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: nh-in .18s ease-out; overflow: hidden; }
          @keyframes nh-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .nh-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .nh-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .nh-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .nh-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .nh-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .nh-empty { padding: 20px 12px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13.5px; font-style: italic; }
          .nh-error { padding: 8px 14px; margin: 6px 0 12px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }

          .nh-section { margin-bottom: 18px; }
          .nh-section-title { font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .nh-kv { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 4px 16px; font-family: var(--font-mono); font-size: 13.5px; }
          .nh-kv-row { display: flex; justify-content: space-between; gap: 12px; padding: 5px 8px; background: rgba(0, 240, 255, 0.025); border: 1px solid rgba(0, 240, 255, 0.1); border-radius: 3px; }
          .nh-kv-row:hover { background: rgba(0, 240, 255, 0.06); }
          .nh-kv-key { color: var(--text-secondary); font-family: var(--font-display); font-size: 11.5px; letter-spacing: .05em; text-transform: uppercase; }
          .nh-kv-val { color: var(--text-primary); text-align: right; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

          .nh-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .nh-table thead { position: sticky; top: 0; background: rgba(0, 240, 255, 0.08); }
          .nh-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--primary); border-bottom: 1px solid rgba(0,240,255,.2); white-space: nowrap; }
          .nh-table td { padding: 5px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .nh-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .nh-mono { font-family: var(--font-mono); }
          .nh-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; }
          .nh-row-btn { padding: 2px 8px; font-family: var(--font-mono); font-size: 12.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .nh-row-btn:hover { background: rgba(0, 240, 255, 0.1); }

          .nh-disk-type { display: inline-block; padding: 1px 8px; font-size: 11.5px; font-family: var(--font-display); letter-spacing: .04em; text-transform: uppercase; color: var(--accent, #e066ff); border: 1px solid currentColor; border-radius: 2px; }
          .nh-h { display: inline-block; padding: 1px 8px; font-size: 12.5px; font-family: var(--font-mono); border: 1px solid currentColor; border-radius: 999px; }
          .nh-h.ok { color: var(--success); }
          .nh-h.bad { color: var(--danger, #ff4d6d); }
          .nh-h.mute { color: var(--text-muted); }

          .nh-overlay { position: absolute; inset: 0; background: rgba(2,4,10,.7); display: flex; align-items: center; justify-content: center; z-index: 5; }
          .nh-overlay-card { width: min(820px, 92%); max-height: 80vh; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; padding: 12px 18px; display: flex; flex-direction: column; }
          .nh-overlay-head { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid rgba(0,240,255,.2); }
          .nh-overlay-head button { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .nh-smart { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-primary); background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; padding: 10px; overflow: auto; flex: 1; margin: 0; }
        `})]})})}function De({title:a,children:u}){return e.jsxs("div",{className:"nh-section",children:[e.jsx("div",{className:"nh-section-title",children:a}),u]})}function oe({k:a,v:u}){return e.jsxs("div",{className:"nh-kv-row",children:[e.jsx("span",{className:"nh-kv-key",children:a}),e.jsx("span",{className:"nh-kv-val",title:u,children:u})]})}const Tt=/^vmbr[0-9]{1,3}$/;function Et({open:a,onClose:u,clusterId:x,node:n}){const{t:i,language:r}=K(),N=te(),[I,z]=t.useState([]),[P,C]=t.useState(!1),[D,S]=t.useState(null),[A,w]=t.useState(0),[R,_]=t.useState(!1),[v,k]=t.useState({iface:"",bridge_ports:"",address:"",gateway:"",autostart:!0,vlan_aware:!1,mtu:"",comments:""});if(t.useEffect(()=>{if(!a)return;let c=!0;return(async()=>{C(!0),S(null);try{const j=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/network`,{credentials:"same-origin"});c&&j.ok?z((await j.json()).interfaces||[]):c&&S(`HTTP ${j.status}`)}catch(j){c&&S(j.message||String(j))}finally{c&&C(!1)}})(),()=>{c=!1}},[a,x,n,A]),!a)return null;const $=async()=>{if(!Tt.test(v.iface)){S("Bad bridge name (expected vmbr<N>)");return}try{const c={iface:v.iface,type:"bridge"};v.bridge_ports&&(c.bridge_ports=v.bridge_ports),v.address&&(c.address=v.address),v.gateway&&(c.gateway=v.gateway),c.autostart=v.autostart,c.vlan_aware=v.vlan_aware,v.mtu&&(c.mtu=+v.mtu),v.comments&&(c.comments=v.comments);const j=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/network`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)}),E=await j.json().catch(()=>({}));if(!j.ok||!E.ok)throw new Error(E.detail||E.error||`HTTP ${j.status}`);_(!1),k({iface:"",bridge_ports:"",address:"",gateway:"",autostart:!0,vlan_aware:!1,mtu:"",comments:""}),w(y=>y+1)}catch(c){S(c.message||String(c))}},m=async c=>{if(await N.confirm(`Delete pending change to "${c}"?

This stages a removal — you must click "Apply" for it to take effect.`,{title:"Stage interface removal?",destructive:!0}))try{const E=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/network/${encodeURIComponent(c)}`,{method:"DELETE",credentials:"same-origin"}),y=await E.json().catch(()=>({}));if(!E.ok||!y.ok)throw new Error(y.detail||y.error||`HTTP ${E.status}`);w(o=>o+1)}catch(E){await N.alert(`Delete failed: ${E.message||E}`)}},h=async()=>{if(await N.confirm(`Apply pending network changes on ${n}?

This writes /etc/network/interfaces and reloads networking. Existing VM/CT traffic should continue but the host may briefly drop a connection.`,{title:"Apply network config?"}))try{const j=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/network`,{method:"PUT",credentials:"same-origin"}),E=await j.json().catch(()=>({}));if(!j.ok||!E.ok)throw new Error(E.detail||E.error||`HTTP ${j.status}`);await N.alert(`Apply submitted. PVE task: ${E.upid||"(no upid)"}`),w(y=>y+1)}catch(j){await N.alert(`Apply failed: ${j.message||j}`)}},p=async()=>{if(await N.confirm(`Discard all pending network changes on ${n}?`,{title:"Revert pending?",destructive:!0}))try{const j=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/network`,{method:"DELETE",credentials:"same-origin"}),E=await j.json().catch(()=>({}));if(!j.ok||!E.ok)throw new Error(E.detail||E.error||`HTTP ${j.status}`);w(y=>y+1)}catch(j){await N.alert(`Revert failed: ${j.message||j}`)}},d=I.some(c=>c.pending);return e.jsx("div",{className:"nn-back",onClick:u,children:e.jsxs("div",{className:"nn-modal",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"nn-head",children:[e.jsxs("div",{className:"nn-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M5 12h14M12 5v14"}),e.jsx("circle",{cx:"12",cy:"12",r:"9"})]}),e.jsx("span",{children:i("nn.title")}),e.jsx("span",{className:"nn-target",children:n})]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[d&&e.jsx("span",{className:"nn-pending-pill",children:"pending changes"}),e.jsx("button",{className:"nn-btn",onClick:h,children:i("nn.apply")}),e.jsx("button",{className:"nn-btn ghost",onClick:p,children:i("nn.revert")}),!R&&e.jsx("button",{className:"nn-btn primary",onClick:()=>{_(!0),S(null)},children:"+ Bridge"}),e.jsx("button",{className:"nn-close",onClick:u,children:"×"})]})]}),R&&e.jsxs("div",{className:"nn-add",children:[e.jsx("input",{placeholder:"vmbr0",value:v.iface,onChange:c=>k({...v,iface:c.target.value})}),e.jsx("input",{placeholder:"ports (e.g. eno1)",value:v.bridge_ports,onChange:c=>k({...v,bridge_ports:c.target.value})}),e.jsx("input",{placeholder:"address (CIDR)",value:v.address,onChange:c=>k({...v,address:c.target.value})}),e.jsx("input",{placeholder:"gateway",value:v.gateway,onChange:c=>k({...v,gateway:c.target.value})}),e.jsx("input",{placeholder:"mtu",type:"number",style:{width:90},value:v.mtu,onChange:c=>k({...v,mtu:c.target.value})}),e.jsxs("label",{className:"nn-check",children:[e.jsx("input",{type:"checkbox",checked:v.autostart,onChange:c=>k({...v,autostart:c.target.checked})}),"autostart"]}),e.jsxs("label",{className:"nn-check",children:[e.jsx("input",{type:"checkbox",checked:v.vlan_aware,onChange:c=>k({...v,vlan_aware:c.target.checked})}),"vlan-aware"]}),e.jsx("button",{onClick:()=>{_(!1),S(null)},children:"Cancel"}),e.jsx("button",{className:"nn-primary",onClick:$,children:"Stage"})]}),e.jsxs("div",{className:"nn-body",children:[D&&e.jsx("div",{className:"nn-error",children:D}),P&&I.length===0&&e.jsx("div",{className:"nn-empty",children:i("nn.loading")}),!P&&I.length===0&&e.jsx("div",{className:"nn-empty",children:i("nn.empty")}),I.length>0&&e.jsxs("table",{className:"nn-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"iface"}),e.jsx("th",{children:"type"}),e.jsx("th",{children:"address / cidr"}),e.jsx("th",{children:"gateway"}),e.jsx("th",{children:"ports / opts"}),e.jsx("th",{children:"flags"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:I.map(c=>e.jsxs("tr",{className:c.pending?"nn-row-pending":"",children:[e.jsx("td",{className:"nn-mono",children:c.iface}),e.jsx("td",{className:"nn-mono",children:c.type}),e.jsx("td",{className:"nn-mono",children:c.cidr||c.address||"—"}),e.jsx("td",{className:"nn-mono",children:c.gateway||"—"}),e.jsx("td",{className:"nn-mono nn-trunc",title:c.bridge_ports||"",children:c.bridge_ports||"—"}),e.jsxs("td",{className:"nn-mono",children:[c.active?e.jsx("span",{className:"nn-pill ok",children:"up"}):e.jsx("span",{className:"nn-pill mute",children:"down"}),c.autostart?e.jsx("span",{className:"nn-pill ok",style:{marginLeft:4},children:"auto"}):null,c.bridge_vlan_aware?e.jsx("span",{className:"nn-pill",style:{marginLeft:4},children:"vlan"}):null,c.pending?e.jsx("span",{className:"nn-pill warn",style:{marginLeft:4},children:"pending"}):null]}),e.jsx("td",{children:e.jsx("button",{className:"nn-del",onClick:()=>m(c.iface),children:"Stage delete"})})]},c.iface))})]})]}),e.jsx("div",{className:"nn-footer",children:i("nn.footer_help")}),e.jsx("style",{children:`
          .nn-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .nn-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); overflow: hidden; animation: nn-in .18s ease-out; }
          @keyframes nn-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .nn-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .nn-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .nn-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .nn-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .nn-btn { padding: 5px 12px; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.06); color: var(--primary); border: 1px solid rgba(0,240,255,.4); border-radius: 3px; cursor: pointer; }
          .nn-btn:hover { background: rgba(0,240,255,.15); }
          .nn-btn.ghost { color: var(--text-secondary); border-color: rgba(255,255,255,.18); background: transparent; }
          .nn-btn.primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .nn-pending-pill { padding: 3px 10px; font-size: 12.5px; font-family: var(--font-mono); color: var(--warning); border: 1px solid currentColor; border-radius: 999px; }
          .nn-add { display: flex; gap: 6px; align-items: center; padding: 10px 18px; flex-wrap: wrap; border-bottom: 1px solid rgba(0,240,255,.16); background: rgba(0, 240, 255, 0.04); }
          .nn-add input, .nn-add select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .nn-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .nn-add button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .nn-add .nn-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .nn-body { flex: 1; overflow: auto; padding: 6px 0; }
          .nn-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13.5px; font-style: italic; }
          .nn-error { padding: 8px 12px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .nn-footer { padding: 8px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); }
          .nn-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; }
          .nn-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .nn-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .nn-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .nn-row-pending { background: rgba(255, 200, 0, 0.04); }
          .nn-mono { font-family: var(--font-mono); }
          .nn-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .nn-pill { display: inline-block; padding: 1px 6px; font-size: 11.5px; border-radius: 999px; border: 1px solid currentColor; }
          .nn-pill.ok { color: var(--success); }
          .nn-pill.mute { color: var(--text-muted); }
          .nn-pill.warn { color: var(--warning); }
          .nn-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 12.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .nn-del:hover { background: rgba(255, 77, 109, 0.1); }
        `})]})})}const It=a=>/permission denied|publickey|authentication|no authentication|connection refused|host key/i.test(a);function Mt({open:a,onClose:u,clusterId:x,node:n}){const{t:i}=K(),r=te(),[N,I]=t.useState(!1),[z,P]=t.useState(null),[C,D]=t.useState(""),[S,A]=t.useState(""),[w,R]=t.useState([]),[_,v]=t.useState([]),[k,$]=t.useState(""),[m,h]=t.useState(!1),[p,d]=t.useState(null),[c,j]=t.useState(!1),E=t.useCallback(async()=>{I(!0),P(null),d(null);try{const b=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ntp`,{credentials:"same-origin"}),U=await b.json();if(!b.ok||!U.ok)throw new Error(U.error||`HTTP ${b.status}`);D(U.tracking||""),A(U.sources||""),R(U.servers||[]),v(U.base_servers||[])}catch(b){P(b.message||String(b))}finally{I(!1)}},[x,n]);if(t.useEffect(()=>{a&&E()},[a,E]),!a)return null;const y=async(b,U)=>{if(await r.confirm(i(U,{n:b.length,node:n}),{destructive:!1})){h(!0),P(null);try{const L=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ntp`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({servers:b})}),H=await L.json();if(!L.ok||!H.ok)throw new Error(H.error||`HTTP ${L.status}`);d(H.sources||""),await E()}catch(L){P(L.message||String(L))}finally{h(!1)}}},o=()=>{const b=k.trim();!b||w.includes(b)||(R(U=>[...U,b]),$(""))};return e.jsx("div",{className:"ntp-back",onClick:()=>!m&&u(),children:e.jsxs("div",{className:"ntp-modal",onClick:b=>b.stopPropagation(),children:[e.jsxs("div",{className:"ntp-head",children:[e.jsxs("span",{children:[i("ntp.title")," · ",n]}),e.jsx("button",{className:"ntp-close",onClick:()=>!m&&u(),children:"×"})]}),e.jsxs("div",{className:"ntp-body",children:[z&&e.jsxs("div",{className:"ntp-error",children:[e.jsx("span",{children:z}),It(z)&&e.jsx("button",{className:"ntp-btn",style:{marginTop:8},onClick:()=>j(!0),children:i("sshsetup.button")})]}),e.jsx(ut,{open:c,onClose:()=>j(!1),nodes:[n],clusterId:x}),N&&e.jsx("div",{className:"ntp-loading",children:i("ntp.loading")}),!N&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ntp-section-h",children:i("ntp.servers")}),w.length===0&&e.jsx("div",{className:"ntp-hint",children:i("ntp.empty_servers")}),w.map(b=>e.jsxs("div",{className:"ntp-server-row",children:[e.jsx("span",{className:"ntp-mono",children:b}),e.jsx("button",{className:"ntp-del",disabled:m,onClick:()=>R(U=>U.filter(s=>s!==b)),children:"×"})]},b)),e.jsxs("div",{className:"ntp-add-row",children:[e.jsx("input",{className:"ntp-input",value:k,placeholder:i("ntp.placeholder"),onChange:b=>$(b.target.value),onKeyDown:b=>{b.key==="Enter"&&o()}}),e.jsx("button",{className:"ntp-btn",onClick:o,disabled:m||!k.trim(),children:i("ntp.add")})]}),e.jsxs("div",{className:"ntp-actions",children:[e.jsx("button",{className:"ntp-btn ghost",disabled:m,onClick:()=>y([],"ntp.confirm_clear"),children:i("ntp.clear")}),e.jsx("button",{className:"ntp-btn primary",disabled:m||w.length===0,onClick:()=>y(w,"ntp.confirm"),children:i("ntp.apply")})]}),p!=null&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ntp-section-h ok",children:i("ntp.applied")}),e.jsx("pre",{className:"ntp-pre",children:p})]}),_.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"ntp-section-h",children:i("ntp.base")}),e.jsx("pre",{className:"ntp-pre",children:_.join(`
`)})]}),e.jsx("div",{className:"ntp-section-h",children:i("ntp.tracking")}),e.jsx("pre",{className:"ntp-pre",children:C||"—"}),e.jsx("div",{className:"ntp-section-h",children:i("ntp.sources")}),e.jsx("pre",{className:"ntp-pre",children:S||"—"})]})]}),e.jsx("style",{children:`
          .ntp-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .ntp-modal { width: min(680px, 96vw); max-height: 88vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary-dim); border-radius: 6px; box-shadow: 0 0 32px rgba(0, 240, 255, 0.2); overflow: hidden; animation: ntp-in .18s ease-out; }
          @keyframes ntp-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ntp-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.25); color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .1em; text-transform: uppercase; }
          .ntp-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .ntp-body { flex: 1; overflow: auto; padding: 14px 18px; display: flex; flex-direction: column; gap: 10px; }
          .ntp-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .ntp-loading { color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; padding: 18px 0; }
          .ntp-section-h { font-family: var(--font-display); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--primary); border-bottom: 1px solid rgba(0,240,255,.16); padding-bottom: 5px; margin-top: 6px; }
          .ntp-section-h.ok { color: var(--success); border-bottom-color: rgba(0,255,136,.25); }
          .ntp-hint { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); }
          .ntp-server-row { display: flex; align-items: center; gap: 10px; padding: 7px 12px; border: 1px solid rgba(0,240,255,.16); border-radius: 4px; }
          .ntp-server-row .ntp-mono { flex: 1; }
          .ntp-mono { font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); }
          .ntp-del { background: transparent; border: 1px solid rgba(255,77,109,.4); border-radius: 3px; color: var(--danger, #ff4d6d); width: 24px; height: 24px; cursor: pointer; line-height: 1; }
          .ntp-del:hover { background: rgba(255,77,109,.12); }
          .ntp-add-row { display: flex; gap: 8px; }
          .ntp-input { flex: 1; height: 36px; box-sizing: border-box; padding: 6px 12px; background: #02050b; border: 1px solid rgba(0,240,255,.2); border-radius: 4px; color: var(--text-primary); font-family: var(--font-mono); font-size: 14px; outline: none; }
          .ntp-input:focus { border-color: var(--primary); }
          .ntp-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 4px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); color: var(--primary); font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; white-space: nowrap; }
          .ntp-btn:hover:not(:disabled) { background: rgba(0,240,255,.16); }
          .ntp-btn:disabled { opacity: .45; cursor: not-allowed; }
          .ntp-btn.primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .ntp-btn.ghost { color: var(--text-secondary); border-color: var(--border); background: transparent; }
          .ntp-actions { display: flex; justify-content: flex-end; gap: 10px; }
          .ntp-pre { margin: 0; padding: 10px 12px; background: rgba(0,0,0,.4); border: 1px solid rgba(0,240,255,.12); border-radius: 3px; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; color: var(--text-secondary); white-space: pre-wrap; word-break: break-word; max-height: 220px; overflow: auto; }
        `})]})})}function Pt({open:a,onClose:u,clusterId:x,node:n}){const{t:i}=K(),[r,N]=t.useState([]),[I,z]=t.useState([]),[P,C]=t.useState(!1),[D,S]=t.useState(null),[A,w]=t.useState(!1),R=t.useRef(null),_=t.useCallback(async($=!1)=>{$||C(!0),S(null);try{const m=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/netinfo`,{credentials:"same-origin"}),h=await m.json();if(!m.ok||!h.ok)throw new Error(h.error||`HTTP ${m.status}`);N(h.phys||[]),z(h.nets||[])}catch(m){S(m.message||String(m))}finally{$||C(!1)}},[x,n]);if(t.useEffect(()=>{a&&_()},[a,_]),t.useEffect(()=>(R.current&&(window.clearInterval(R.current),R.current=null),a&&A&&(R.current=window.setInterval(()=>_(!0),5e3)),()=>{R.current&&window.clearInterval(R.current)}),[a,A,_]),!a)return null;const v=$=>$==="up"?"nic-up":$==="down"?"nic-down":"nic-na",k=$=>$==="yes"?"nic-up":$==="no"?"nic-down":"nic-na";return e.jsx("div",{className:"nic-back",onClick:u,children:e.jsxs("div",{className:"nic-modal",onClick:$=>$.stopPropagation(),children:[e.jsxs("div",{className:"nic-head",children:[e.jsxs("span",{children:[i("nic.title")," · ",n]}),e.jsxs("div",{className:"nic-head-actions",children:[e.jsxs("label",{className:"nic-auto",children:[e.jsx("input",{type:"checkbox",checked:A,onChange:$=>w($.target.checked)}),e.jsx("span",{children:i("nic.auto")})]}),e.jsx("button",{className:"nic-btn",onClick:()=>_(),children:i("nic.refresh")}),e.jsx("button",{className:"nic-close",onClick:u,children:"×"})]})]}),e.jsxs("div",{className:"nic-body",children:[D&&e.jsx("div",{className:"nic-error",children:D}),P&&r.length===0&&I.length===0&&e.jsx("div",{className:"nic-loading",children:i("nic.loading")}),(r.length>0||I.length>0)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"nic-sec-h",children:i("nic.phys")}),e.jsxs("table",{className:"vm-table nic-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:i("nic.iface")}),e.jsx("th",{children:i("nic.state")}),e.jsx("th",{children:i("nic.link")}),e.jsx("th",{children:i("nic.speed")}),e.jsx("th",{children:i("nic.duplex")}),e.jsx("th",{children:i("nic.mac")})]})}),e.jsx("tbody",{children:r.map($=>e.jsxs("tr",{children:[e.jsx("td",{className:"nic-name",children:$.iface}),e.jsx("td",{children:e.jsx("span",{className:v($.state),children:$.state})}),e.jsx("td",{children:e.jsx("span",{className:k($.link),children:$.link})}),e.jsx("td",{children:$.speed}),e.jsx("td",{children:$.duplex}),e.jsx("td",{className:"nic-mac",children:$.mac})]},$.iface))})]}),e.jsx("div",{className:"nic-sec-h",children:i("nic.nets")}),e.jsxs("table",{className:"vm-table nic-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:i("nic.iface")}),e.jsx("th",{children:i("nic.type")}),e.jsx("th",{children:i("nic.ipv4")}),e.jsx("th",{children:i("nic.members")})]})}),e.jsx("tbody",{children:I.map($=>e.jsxs("tr",{children:[e.jsx("td",{className:"nic-name",children:$.iface}),e.jsx("td",{children:e.jsx("span",{className:"nic-type",children:$.type})}),e.jsx("td",{className:"nic-ip",children:$.ipv4}),e.jsx("td",{className:"nic-members",children:$.members.length===0?"—":$.members.map(m=>e.jsx("span",{className:"nic-member",children:m},m))})]},$.iface))})]})]}),!P&&!D&&r.length===0&&I.length===0&&e.jsx("div",{className:"nic-loading",children:i("nic.empty")})]}),e.jsx("style",{children:`
          .nic-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .nic-modal { width: min(820px, 96vw); max-height: 88vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary-dim); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,.2); overflow: hidden; animation: nic-in .18s ease-out; }
          @keyframes nic-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .nic-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid rgba(0,240,255,.25); color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .1em; text-transform: uppercase; }
          .nic-head-actions { display: flex; align-items: center; gap: 12px; }
          .nic-auto { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); text-transform: none; letter-spacing: 0; cursor: pointer; }
          .nic-auto input { accent-color: var(--primary); }
          .nic-btn { padding: 6px 14px; border-radius: 4px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); color: var(--primary); font-family: var(--font-display); font-size: 12.5px; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
          .nic-btn:hover { background: rgba(0,240,255,.16); }
          .nic-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .nic-body { flex: 1; overflow: auto; padding: 14px 18px; display: flex; flex-direction: column; gap: 8px; }
          .nic-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .nic-loading { padding: 20px 0; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .nic-sec-h { font-family: var(--font-display); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--primary); border-bottom: 1px solid rgba(0,240,255,.16); padding-bottom: 5px; margin-top: 8px; }
          .nic-table td { white-space: nowrap; }
          .nic-table tbody tr { cursor: default; }
          .nic-name { color: var(--primary); }
          .nic-mac, .nic-ip { color: var(--text-secondary); }
          .nic-up { color: var(--success); }
          .nic-down { color: var(--warning); }
          .nic-na { color: var(--text-muted); }
          .nic-type { display: inline-block; padding: 1px 8px; border-radius: 2px; font-size: 12.5px; font-family: var(--font-display); letter-spacing: .06em; border: 1px solid rgba(0,240,255,.4); color: var(--primary); }
          .nic-members { display: flex; flex-wrap: wrap; gap: 4px; white-space: normal; }
          .nic-member { display: inline-block; padding: 1px 8px; border-radius: 999px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); border: 1px solid rgba(0,240,255,.2); background: rgba(0,240,255,.04); }
        `})]})})}function Ut({open:a,onClose:u,clusterId:x,node:n,candidates:i}){const{t:r,language:N}=K();te();const[I,z]=t.useState(!0),[P,C]=t.useState(!0),[D,S]=t.useState(""),[A,w]=t.useState(!1),[R,_]=t.useState(null),[v,k]=t.useState(null);if(t.useEffect(()=>{a&&(_(null),k(null),w(!1),z(!0),C(!0),S(i[0]||""))},[a,i]),!a)return null;const $=async m=>{_(null),w(!0);try{const h={enable:m,set_ceph_noout:I};m&&P&&(h.migrate_vms=!0,h.target_node=D);const p=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/maintenance`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)}),d=await p.json().catch(()=>({}));if(!p.ok||!d.ok)throw new Error(d.detail||d.error||`HTTP ${p.status}`);k(d)}catch(h){_(h.message||String(h))}finally{w(!1)}};return e.jsx("div",{className:"mm-back",onClick:()=>!A&&u(),children:e.jsxs("div",{className:"mm-modal",onClick:m=>m.stopPropagation(),children:[e.jsxs("div",{className:"mm-head",children:[e.jsx("span",{children:r("mm.title").replace("{node}",n)}),e.jsx("button",{className:"mm-close",onClick:u,disabled:A,children:"×"})]}),!v&&e.jsxs("div",{className:"mm-body",children:[R&&e.jsx("div",{className:"mm-error",children:R}),e.jsxs("label",{className:"mm-row",children:[e.jsx("input",{type:"checkbox",checked:I,onChange:m=>z(m.target.checked)}),e.jsx("span",{children:r("mm.set_noout")})]}),e.jsx("div",{className:"mm-help",children:r("mm.set_noout_help")}),e.jsxs("label",{className:"mm-row",children:[e.jsx("input",{type:"checkbox",checked:P,onChange:m=>C(m.target.checked)}),e.jsx("span",{children:r("mm.migrate_vms")})]}),P&&e.jsx("div",{className:"mm-target",children:e.jsxs("label",{children:[e.jsx("span",{children:r("mm.target_node")}),e.jsx("select",{value:D,onChange:m=>S(m.target.value),children:i.map(m=>e.jsx("option",{value:m,children:m},m))})]})}),e.jsx("div",{className:"mm-help",children:r("mm.help")}),e.jsxs("div",{className:"mm-actions",children:[e.jsx("button",{onClick:u,disabled:A,children:r("mm.cancel")}),e.jsx("button",{className:"mm-warn-btn",disabled:A,onClick:()=>$(!1),children:r("mm.exit")}),e.jsx("button",{className:"mm-primary",disabled:A||P&&!D,onClick:()=>$(!0),children:r(A?"mm.busy":"mm.enter")})]})]}),v&&e.jsxs("div",{className:"mm-body",children:[e.jsx("div",{className:"mm-result-title",children:r("mm.result_title")}),v.noout_set&&e.jsxs("div",{className:"mm-result-line",children:[e.jsx("span",{className:"ok",children:"✓"})," noout flag set"]}),v.noout_cleared&&e.jsxs("div",{className:"mm-result-line",children:[e.jsx("span",{className:"ok",children:"✓"})," noout flag cleared"]}),v.noout_error&&e.jsxs("div",{className:"mm-result-line",children:[e.jsx("span",{className:"bad",children:"✗"})," noout: ",v.noout_error]}),Array.isArray(v.migrations)&&v.migrations.length>0&&e.jsxs("table",{className:"mm-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"vmid"}),e.jsx("th",{children:"type"}),e.jsx("th",{children:"result"}),e.jsx("th",{children:"upid / detail"})]})}),e.jsx("tbody",{children:v.migrations.map(m=>e.jsxs("tr",{children:[e.jsx("td",{className:"mm-mono",children:m.vmid}),e.jsx("td",{className:"mm-mono",children:m.type}),e.jsx("td",{children:e.jsx("span",{className:m.ok?"ok":"bad",children:m.ok?"✓":"✗"})}),e.jsx("td",{className:"mm-mono mm-trunc",title:m.upid||m.detail||"",children:m.upid||m.detail||"—"})]},m.vmid))})]}),e.jsx("div",{className:"mm-actions",children:e.jsx("button",{className:"mm-primary",onClick:u,children:r("mm.close")})})]}),e.jsx("style",{children:`
          .mm-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .mm-modal { width: min(640px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--warning); border-radius: 6px; box-shadow: 0 0 32px rgba(255, 200, 0, 0.25); animation: mm-in .18s ease-out; overflow: hidden; }
          @keyframes mm-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .mm-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(255, 200, 0, 0.3); color: var(--warning); font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
          .mm-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .mm-body { padding: 14px 18px; overflow: auto; }
          .mm-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-primary); cursor: pointer; }
          .mm-help { font-family: var(--font-mono); font-size: 12.5px; color: var(--text-muted); padding: 0 0 8px 24px; line-height: 1.4; }
          .mm-target { padding: 6px 0 6px 24px; }
          .mm-target label { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .mm-target select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13.5px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; }
          .mm-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13.5px; border-radius: 2px; }
          .mm-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 14px; }
          .mm-actions button { padding: 6px 14px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .mm-actions .mm-primary { background: var(--warning); color: #100b00; border-color: var(--warning); }
          .mm-actions .mm-warn-btn { color: var(--text-secondary); border-color: rgba(255,255,255,.25); }
          .mm-result-title { font-family: var(--font-display); font-size: 13.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid rgba(0,240,255,.16); }
          .mm-result-line { padding: 4px 0; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-primary); }
          .mm-result-line .ok { color: var(--success); margin-right: 8px; }
          .mm-result-line .bad { color: var(--danger, #ff4d6d); margin-right: 8px; }
          .mm-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13.5px; margin-top: 8px; }
          .mm-table th { padding: 4px 8px; text-align: left; color: var(--text-secondary); font-size: 12.5px; text-transform: uppercase; border-bottom: 1px solid rgba(0,240,255,.12); }
          .mm-table td { padding: 4px 8px; border-bottom: 1px solid rgba(0,240,255,.05); }
          .mm-mono { font-family: var(--font-mono); }
          .mm-trunc { max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .ok { color: var(--success); }
          .bad { color: var(--danger, #ff4d6d); }
        `})]})})}const At=/^[A-Za-z0-9._\-]{1,64}@[a-z][a-z0-9\-]{0,32}$/,Dt=/^[A-Za-z][A-Za-z0-9._\-]{0,63}$/,Ft=/^\/$|^\/[A-Za-z0-9._/\-]{0,256}$/;function Lt({open:a,onClose:u,clusterId:x}){const{t:n,language:i}=K(),r=te(),[N,I]=t.useState("users"),[z,P]=t.useState(0),C=()=>P(s=>s+1),[D,S]=t.useState([]),[A,w]=t.useState([]),[R,_]=t.useState([]),[v,k]=t.useState([]),[$,m]=t.useState(null),[h,p]=t.useState(!1),[d,c]=t.useState({userid:"",password:"",comment:"",email:"",groups:"",enable:!0}),[j,E]=t.useState({groupid:"",comment:""}),[y,o]=t.useState({path:"/",roles:"",users:"",groups:"",tokens:"",propagate:!0,delete:!1});t.useEffect(()=>{if(!a)return;let s=!0;return(async()=>{p(!0),m(null);try{const L=encodeURIComponent(x),[H,f,l,g]=await Promise.all([fetch(`/api/clusters/${L}/pve-access/users`,{credentials:"same-origin"}),fetch(`/api/clusters/${L}/pve-access/groups`,{credentials:"same-origin"}),fetch(`/api/clusters/${L}/pve-access/acl`,{credentials:"same-origin"}),fetch(`/api/clusters/${L}/pve-access/roles`,{credentials:"same-origin"})]);if(!s)return;H.ok&&S((await H.json()).users||[]),f.ok&&w((await f.json()).groups||[]),l.ok&&_((await l.json()).acl||[]),g.ok&&k((await g.json()).roles||[])}catch(L){s&&m(L.message||String(L))}finally{s&&p(!1)}})(),()=>{s=!1}},[a,x,z]);const b=async(s,L,H)=>{const f=await fetch(`/api/clusters/${encodeURIComponent(x)}${L}`,{method:s,credentials:"same-origin",headers:H?{"Content-Type":"application/json"}:void 0,body:H?JSON.stringify(H):void 0}),l=await f.json().catch(()=>({}));if(!f.ok||!l.ok)throw new Error(l.detail||l.error||`HTTP ${f.status}`)},U=async s=>{m(null);try{await s(),C()}catch(L){m(L.message||String(L))}};return a?e.jsx("div",{className:"pa-back",onClick:u,children:e.jsxs("div",{className:"pa-modal",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"pa-head",children:[e.jsxs("div",{className:"pa-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"9",cy:"7",r:"4"}),e.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"})]}),e.jsx("span",{children:n("pa.title")})]}),e.jsx("button",{className:"pa-close",onClick:u,children:"×"})]}),e.jsx("div",{className:"pa-tabs",children:["users","groups","acl"].map(s=>e.jsx("button",{className:`pa-tab ${N===s?"active":""}`,onClick:()=>I(s),children:n(`pa.tab.${s}`)},s))}),e.jsxs("div",{className:"pa-body",children:[$&&e.jsx("div",{className:"pa-error",children:$}),h&&!D.length&&e.jsx("div",{className:"pa-empty",children:n("pa.loading")}),N==="users"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"pa-add",children:[e.jsx("input",{placeholder:"user@realm",value:d.userid,onChange:s=>c({...d,userid:s.target.value})}),e.jsx("input",{placeholder:"password (optional)",type:"password",value:d.password,onChange:s=>c({...d,password:s.target.value})}),e.jsx("input",{placeholder:"email",value:d.email,onChange:s=>c({...d,email:s.target.value})}),e.jsx("input",{placeholder:"groups (csv)",value:d.groups,onChange:s=>c({...d,groups:s.target.value})}),e.jsx("input",{placeholder:"comment",value:d.comment,onChange:s=>c({...d,comment:s.target.value})}),e.jsx("button",{className:"pa-primary",disabled:!At.test(d.userid),onClick:()=>U(async()=>{const s={userid:d.userid,enable:d.enable};d.password&&(s.password=d.password),d.email&&(s.email=d.email),d.groups&&(s.groups=d.groups),d.comment&&(s.comment=d.comment),await b("POST","/pve-access/users",s),c({userid:"",password:"",comment:"",email:"",groups:"",enable:!0})}),children:"+ Create"})]}),e.jsxs("table",{className:"pa-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"userid"}),e.jsx("th",{children:"enable"}),e.jsx("th",{children:"email"}),e.jsx("th",{children:"groups"}),e.jsx("th",{children:"comment"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:D.map(s=>e.jsxs("tr",{children:[e.jsx("td",{className:"pa-mono",children:s.userid}),e.jsx("td",{children:e.jsx("button",{className:`pa-tog ${s.enable?"on":"off"}`,onClick:()=>U(()=>b("PUT",`/pve-access/users/${encodeURIComponent(s.userid)}`,{enable:!s.enable})),children:s.enable?"on":"off"})}),e.jsx("td",{className:"pa-mono pa-trunc",children:s.email||"—"}),e.jsx("td",{className:"pa-mono pa-trunc",children:s.groups||"—"}),e.jsx("td",{className:"pa-mono pa-trunc",title:s.comment||"",children:s.comment||"—"}),e.jsx("td",{children:e.jsx("button",{className:"pa-del",onClick:async()=>{await r.confirm(`Delete PVE user "${s.userid}"?`,{title:"Delete PVE user?",destructive:!0})&&U(()=>b("DELETE",`/pve-access/users/${encodeURIComponent(s.userid)}`))},children:"Delete"})})]},s.userid))})]})]}),N==="groups"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"pa-add",children:[e.jsx("input",{placeholder:"group id",value:j.groupid,onChange:s=>E({...j,groupid:s.target.value})}),e.jsx("input",{placeholder:"comment",value:j.comment,onChange:s=>E({...j,comment:s.target.value})}),e.jsx("button",{className:"pa-primary",disabled:!Dt.test(j.groupid),onClick:()=>U(async()=>{await b("POST","/pve-access/groups",j),E({groupid:"",comment:""})}),children:"+ Create"})]}),e.jsxs("table",{className:"pa-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"group"}),e.jsx("th",{children:"members"}),e.jsx("th",{children:"comment"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:A.map(s=>e.jsxs("tr",{children:[e.jsx("td",{className:"pa-mono",children:s.groupid}),e.jsx("td",{className:"pa-mono pa-trunc",title:s.users||"",children:s.users||"—"}),e.jsx("td",{className:"pa-mono pa-trunc",children:s.comment||"—"}),e.jsx("td",{children:e.jsx("button",{className:"pa-del",onClick:async()=>{await r.confirm(`Delete group "${s.groupid}"?`,{title:"Delete PVE group?",destructive:!0})&&U(()=>b("DELETE",`/pve-access/groups/${encodeURIComponent(s.groupid)}`))},children:"Delete"})})]},s.groupid))})]})]}),N==="acl"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"pa-add",children:[e.jsx("input",{placeholder:"path (e.g. / or /vms/100)",value:y.path,onChange:s=>o({...y,path:s.target.value})}),e.jsxs("select",{value:y.roles,onChange:s=>o({...y,roles:s.target.value}),children:[e.jsx("option",{value:"",children:"— pick role —"}),v.map(s=>e.jsx("option",{value:s.roleid,children:s.roleid},s.roleid))]}),e.jsx("input",{placeholder:"users (csv)",value:y.users,onChange:s=>o({...y,users:s.target.value})}),e.jsx("input",{placeholder:"groups (csv)",value:y.groups,onChange:s=>o({...y,groups:s.target.value})}),e.jsxs("label",{className:"pa-check",children:[e.jsx("input",{type:"checkbox",checked:y.propagate,onChange:s=>o({...y,propagate:s.target.checked})}),"propagate"]}),e.jsx("button",{className:"pa-primary",disabled:!Ft.test(y.path)||!y.roles||!y.users&&!y.groups,onClick:()=>U(async()=>{const s={path:y.path,roles:y.roles,propagate:y.propagate,delete:!1};y.users&&(s.users=y.users),y.groups&&(s.groups=y.groups),await b("PUT","/pve-access/acl",s),o({...y,path:"/",roles:"",users:"",groups:"",tokens:""})}),children:"+ Grant"})]}),e.jsxs("table",{className:"pa-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"path"}),e.jsx("th",{children:"type"}),e.jsx("th",{children:"ugid"}),e.jsx("th",{children:"role"}),e.jsx("th",{children:"propagate"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:R.map((s,L)=>e.jsxs("tr",{children:[e.jsx("td",{className:"pa-mono pa-trunc",children:s.path}),e.jsx("td",{className:"pa-mono",children:s.type||"—"}),e.jsx("td",{className:"pa-mono pa-trunc",children:s.ugid||"—"}),e.jsx("td",{className:"pa-mono",children:s.roleid||"—"}),e.jsx("td",{className:"pa-mono",children:s.propagate?"yes":"no"}),e.jsx("td",{children:e.jsx("button",{className:"pa-del",onClick:async()=>{if(!await r.confirm(`Remove ACL: path=${s.path}, role=${s.roleid}, ugid=${s.ugid}?`,{title:"Revoke ACL?",destructive:!0}))return;const f={path:s.path,roles:s.roleid,propagate:!!s.propagate,delete:!0};s.type==="user"||s.type==="token"?f.users=s.ugid:s.type==="group"?f.groups=s.ugid:f.users=s.ugid,U(()=>b("PUT","/pve-access/acl",f))},children:"Revoke"})})]},`${s.path}-${s.ugid}-${s.roleid}-${L}`))})]})]})]}),e.jsx("style",{children:`
          .pa-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .pa-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: pa-in .18s ease-out; overflow: hidden; }
          @keyframes pa-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .pa-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .pa-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .pa-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .pa-tabs { display: flex; padding: 0 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); }
          .pa-tab { padding: 10px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: none; border-bottom: 2px solid transparent; cursor: pointer; }
          .pa-tab:hover { color: var(--primary); }
          .pa-tab.active { color: var(--primary); border-bottom-color: var(--primary); }
          .pa-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .pa-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .pa-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .pa-add { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .pa-add input, .pa-add select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; min-width: 140px; flex: 1; }
          .pa-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .pa-primary { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .pa-primary:disabled { opacity: .4; cursor: not-allowed; }
          .pa-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .pa-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .pa-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .pa-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .pa-mono { font-family: var(--font-mono); }
          .pa-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .pa-tog { padding: 2px 10px; font-size: 13.5px; font-family: var(--font-mono); border-radius: 999px; border: 1px solid currentColor; background: transparent; cursor: pointer; }
          .pa-tog.on { color: var(--success); }
          .pa-tog.off { color: var(--text-muted); }
          .pa-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .pa-del:hover { background: rgba(255, 77, 109, 0.1); }
        `})]})}):null}function Ot({open:a,onClose:u,clusterId:x}){var v;const{t:n,language:i}=K(),r=te(),I=((v=ze().user)==null?void 0:v.role_global)==="admin",[z,P]=t.useState([]),[C,D]=t.useState(!1),[S,A]=t.useState(null),[w,R]=t.useState(0);t.useEffect(()=>{if(!a)return;let k=!0;return(async()=>{D(!0),A(null);try{const $=await fetch(`/api/clusters/${encodeURIComponent(x)}/locks`,{credentials:"same-origin"});k&&$.ok?P((await $.json()).locks||[]):k&&A(`HTTP ${$.status}`)}catch($){k&&A($.message||String($))}finally{k&&D(!1)}})(),()=>{k=!1}},[a,x,w]);const _=async k=>{if(await r.confirm(i==="zh-TW"?`清除 ${k.type==="lxc"?"CT":"VM"} ${k.vmid} (${k.name}) 的 lock=${k.lock}？

清鎖等同 'qm unlock'。如果該動作仍在執行中，清鎖可能造成資料損毀。`:`Clear lock=${k.lock} on ${k.type==="lxc"?"CT":"VM"} ${k.vmid} (${k.name})?

Equivalent to 'qm unlock'. If the underlying operation is still running, clearing may cause data corruption.`,{title:"Clear stuck lock?",destructive:!0}))try{const m=k.type==="lxc"?"lxc":"qemu",h=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(k.node)}/${m}/${k.vmid}/unlock`,{method:"POST",credentials:"same-origin"}),p=await h.json().catch(()=>({}));if(!h.ok||!p.ok)throw new Error(p.detail||p.error||`HTTP ${h.status}`);R(d=>d+1)}catch(m){await r.alert(`Unlock failed: ${m.message||m}`)}};return a?e.jsx("div",{className:"lk-back",onClick:u,children:e.jsxs("div",{className:"lk-modal",onClick:k=>k.stopPropagation(),children:[e.jsxs("div",{className:"lk-head",children:[e.jsx("span",{children:n("lk.title")}),e.jsx("button",{className:"lk-close",onClick:u,children:"×"})]}),e.jsxs("div",{className:"lk-body",children:[S&&e.jsx("div",{className:"lk-error",children:S}),C&&z.length===0&&e.jsx("div",{className:"lk-empty",children:n("lk.loading")}),!C&&z.length===0&&!S&&e.jsx("div",{className:"lk-empty",children:n("lk.empty")}),z.length>0&&e.jsxs("table",{className:"lk-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"node"}),e.jsx("th",{children:"vmid"}),e.jsx("th",{children:"type"}),e.jsx("th",{children:"name"}),e.jsx("th",{children:"lock"}),e.jsx("th",{children:"status"}),I&&e.jsx("th",{})]})}),e.jsx("tbody",{children:z.map(k=>e.jsxs("tr",{children:[e.jsx("td",{className:"lk-mono",children:k.node}),e.jsx("td",{className:"lk-mono",children:k.vmid}),e.jsx("td",{className:"lk-mono",children:k.type}),e.jsx("td",{className:"lk-mono lk-trunc",title:k.name,children:k.name}),e.jsx("td",{children:e.jsx("span",{className:"lk-pill warn",children:k.lock})}),e.jsx("td",{className:"lk-mono",children:k.status}),I&&e.jsx("td",{children:e.jsx("button",{className:"lk-del",onClick:()=>_(k),children:n("lk.unlock")})})]},`${k.node}/${k.vmid}`))})]})]}),e.jsx("div",{className:"lk-footer",children:n("lk.footer_help")}),e.jsx("style",{children:`
          .lk-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .lk-modal { width: min(900px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--warning); border-radius: 6px; box-shadow: 0 0 32px rgba(255, 200, 0, 0.25); animation: lk-in .18s ease-out; overflow: hidden; }
          @keyframes lk-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .lk-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(255, 200, 0, 0.3); color: var(--warning); font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
          .lk-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; line-height: 1; }
          .lk-body { flex: 1; overflow: auto; padding: 6px 0; }
          .lk-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .lk-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .lk-footer { padding: 8px 18px; border-top: 1px solid rgba(255, 200, 0, 0.16); font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .lk-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .lk-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .lk-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .lk-mono { font-family: var(--font-mono); }
          .lk-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .lk-pill { display: inline-block; padding: 1px 8px; font-size: 13.5px; font-family: var(--font-mono); border-radius: 999px; border: 1px solid currentColor; }
          .lk-pill.warn { color: var(--warning); }
          .lk-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--warning); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .lk-del:hover { background: rgba(255, 200, 0, 0.1); }
        `})]})}):null}const Je=/^[A-Za-z][A-Za-z0-9_\-]{0,63}$/,tt=/^[+A-Za-z0-9._:/\-]{1,128}$/;function Bt({open:a,onClose:u,clusterId:x}){const{t:n}=K(),i=te(),[r,N]=t.useState("ipsets"),[I,z]=t.useState(0),P=()=>z(f=>f+1),[C,D]=t.useState([]),[S,A]=t.useState(null),[w,R]=t.useState([]),[_,v]=t.useState([]),[k,$]=t.useState([]),[m,h]=t.useState(!1),[p,d]=t.useState(null),[c,j]=t.useState({name:"",comment:""}),[E,y]=t.useState({cidr:"",comment:"",nomatch:!1}),[o,b]=t.useState({name:"",cidr:"",comment:""}),[U,s]=t.useState({group:"",comment:""});if(t.useEffect(()=>{if(!a)return;let f=!0;return(async()=>{h(!0),d(null);try{const l=encodeURIComponent(x),[g,F,B]=await Promise.all([fetch(`/api/clusters/${l}/firewall/ipsets`,{credentials:"same-origin"}),fetch(`/api/clusters/${l}/firewall/aliases`,{credentials:"same-origin"}),fetch(`/api/clusters/${l}/firewall/groups`,{credentials:"same-origin"})]);if(!f)return;g.ok&&D((await g.json()).ipsets||[]),F.ok&&v((await F.json()).aliases||[]),B.ok&&$((await B.json()).groups||[])}catch(l){f&&d(l.message||String(l))}finally{f&&h(!1)}})(),()=>{f=!1}},[a,x,I]),t.useEffect(()=>{if(!a||!S){R([]);return}let f=!0;return(async()=>{try{const l=await fetch(`/api/clusters/${encodeURIComponent(x)}/firewall/ipsets/${encodeURIComponent(S)}`,{credentials:"same-origin"});f&&l.ok&&R((await l.json()).members||[])}catch{}})(),()=>{f=!1}},[a,x,S,I]),!a)return null;const L=async(f,l,g)=>{const F=await fetch(`/api/clusters/${encodeURIComponent(x)}${l}`,{method:f,credentials:"same-origin",headers:g?{"Content-Type":"application/json"}:void 0,body:g?JSON.stringify(g):void 0}),B=await F.json().catch(()=>({}));if(!F.ok||!B.ok)throw new Error(B.detail||B.error||`HTTP ${F.status}`)},H=async f=>{d(null);try{await f(),P()}catch(l){d(l.message||String(l))}};return e.jsx("div",{className:"fo-back",onClick:u,children:e.jsxs("div",{className:"fo-modal",onClick:f=>f.stopPropagation(),children:[e.jsxs("div",{className:"fo-head",children:[e.jsxs("div",{className:"fo-title",children:[e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"})}),e.jsx("span",{children:n("fwo.title")})]}),e.jsx("button",{className:"fo-close",onClick:u,children:"×"})]}),e.jsx("div",{className:"fo-tabs",children:["ipsets","aliases","groups"].map(f=>e.jsx("button",{className:`fo-tab ${r===f?"active":""}`,onClick:()=>{N(f),A(null)},children:n(`fwo.tab.${f}`)},f))}),e.jsxs("div",{className:"fo-body",children:[p&&e.jsx("div",{className:"fo-error",children:p}),m&&e.jsx("div",{className:"fo-empty",children:n("fwo.loading")}),r==="ipsets"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"fo-add",children:[e.jsx("input",{placeholder:"name (e.g. trusted)",value:c.name,onChange:f=>j({...c,name:f.target.value})}),e.jsx("input",{placeholder:"comment (optional)",value:c.comment,onChange:f=>j({...c,comment:f.target.value})}),e.jsx("button",{className:"fo-primary",disabled:!Je.test(c.name),onClick:()=>H(async()=>{await L("POST","/firewall/ipsets",c),j({name:"",comment:""})}),children:"+ Create"})]}),e.jsxs("table",{className:"fo-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"name"}),e.jsx("th",{children:"comment"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:C.map(f=>e.jsxs("tr",{className:S===f.name?"fo-selected":"",children:[e.jsx("td",{className:"fo-mono",children:e.jsx("button",{className:"fo-link",onClick:()=>A(S===f.name?null:f.name),children:f.name})}),e.jsx("td",{className:"fo-mono",children:f.comment||"—"}),e.jsx("td",{children:e.jsx("button",{className:"fo-del",onClick:async()=>{await i.confirm(`Delete ipset "${f.name}"?`,{title:"Delete ipset?",destructive:!0})&&H(()=>L("DELETE",`/firewall/ipsets/${encodeURIComponent(f.name)}`))},children:"Delete"})})]},f.name))})]}),S&&e.jsxs("div",{className:"fo-sub",children:[e.jsxs("div",{className:"fo-sub-title",children:["Members of ",e.jsx("code",{children:S})]}),e.jsxs("div",{className:"fo-add",children:[e.jsx("input",{placeholder:"cidr / ip / +set",value:E.cidr,onChange:f=>y({...E,cidr:f.target.value})}),e.jsx("input",{placeholder:"comment (optional)",value:E.comment,onChange:f=>y({...E,comment:f.target.value})}),e.jsxs("label",{className:"fo-check",children:[e.jsx("input",{type:"checkbox",checked:E.nomatch,onChange:f=>y({...E,nomatch:f.target.checked})}),"nomatch"]}),e.jsx("button",{className:"fo-primary",disabled:!tt.test(E.cidr),onClick:()=>H(async()=>{await L("POST",`/firewall/ipsets/${encodeURIComponent(S)}`,E),y({cidr:"",comment:"",nomatch:!1})}),children:"+ Add"})]}),e.jsxs("table",{className:"fo-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"cidr"}),e.jsx("th",{children:"nomatch"}),e.jsx("th",{children:"comment"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:w.map(f=>e.jsxs("tr",{children:[e.jsx("td",{className:"fo-mono",children:f.cidr}),e.jsx("td",{className:"fo-mono",children:f.nomatch?"yes":"—"}),e.jsx("td",{className:"fo-mono",children:f.comment||"—"}),e.jsx("td",{children:e.jsx("button",{className:"fo-del",onClick:()=>H(()=>L("DELETE",`/firewall/ipsets/${encodeURIComponent(S)}/members/${encodeURIComponent(f.cidr)}`)),children:"Remove"})})]},f.cidr))})]})]})]}),r==="aliases"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"fo-add",children:[e.jsx("input",{placeholder:"name",value:o.name,onChange:f=>b({...o,name:f.target.value})}),e.jsx("input",{placeholder:"10.0.0.0/24",value:o.cidr,onChange:f=>b({...o,cidr:f.target.value})}),e.jsx("input",{placeholder:"comment",value:o.comment,onChange:f=>b({...o,comment:f.target.value})}),e.jsx("button",{className:"fo-primary",disabled:!Je.test(o.name)||!tt.test(o.cidr),onClick:()=>H(async()=>{await L("POST","/firewall/aliases",o),b({name:"",cidr:"",comment:""})}),children:"+ Create"})]}),e.jsxs("table",{className:"fo-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"name"}),e.jsx("th",{children:"cidr"}),e.jsx("th",{children:"comment"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:_.map(f=>e.jsxs("tr",{children:[e.jsx("td",{className:"fo-mono",children:f.name}),e.jsx("td",{className:"fo-mono",children:f.cidr}),e.jsx("td",{className:"fo-mono",children:f.comment||"—"}),e.jsx("td",{children:e.jsx("button",{className:"fo-del",onClick:async()=>{await i.confirm(`Delete alias "${f.name}"?`,{title:"Delete alias?",destructive:!0})&&H(()=>L("DELETE",`/firewall/aliases/${encodeURIComponent(f.name)}`))},children:"Delete"})})]},f.name))})]})]}),r==="groups"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"fo-add",children:[e.jsx("input",{placeholder:"group name",value:U.group,onChange:f=>s({...U,group:f.target.value})}),e.jsx("input",{placeholder:"comment",value:U.comment,onChange:f=>s({...U,comment:f.target.value})}),e.jsx("button",{className:"fo-primary",disabled:!Je.test(U.group),onClick:()=>H(async()=>{await L("POST","/firewall/groups",U),s({group:"",comment:""})}),children:"+ Create"})]}),e.jsx("div",{className:"fo-help",children:n("fwo.groups_help")}),e.jsxs("table",{className:"fo-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"group"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:k.map(f=>e.jsxs("tr",{children:[e.jsx("td",{className:"fo-mono",children:f.group}),e.jsx("td",{children:e.jsx("button",{className:"fo-del",onClick:async()=>{await i.confirm(`Delete group "${f.group}"?`,{title:"Delete group?",destructive:!0})&&H(()=>L("DELETE",`/firewall/groups/${encodeURIComponent(f.group)}`))},children:"Delete"})})]},f.group))})]})]})]}),e.jsx("style",{children:`
          .fo-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .fo-modal { width: min(900px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: fo-in .18s ease-out; overflow: hidden; }
          @keyframes fo-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .fo-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .fo-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .fo-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .fo-tabs { display: flex; padding: 0 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); }
          .fo-tab { padding: 10px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: none; border-bottom: 2px solid transparent; cursor: pointer; }
          .fo-tab:hover { color: var(--primary); }
          .fo-tab.active { color: var(--primary); border-bottom-color: var(--primary); }
          .fo-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .fo-empty { padding: 20px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .fo-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .fo-help { padding: 4px 0 12px; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }

          .fo-add { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .fo-add input { flex: 1; min-width: 140px; padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .fo-add input:focus { border-color: var(--primary); }
          .fo-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .fo-primary { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .fo-primary:disabled { opacity: .4; cursor: not-allowed; }

          .fo-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .fo-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .fo-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .fo-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .fo-table tbody tr.fo-selected { background: rgba(0, 240, 255, 0.08); box-shadow: inset 3px 0 0 var(--primary); }
          .fo-link { background: transparent; border: none; color: var(--primary); font-family: var(--font-mono); font-size: 13px; cursor: pointer; text-decoration: underline; padding: 0; }
          .fo-mono { font-family: var(--font-mono); }
          .fo-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .fo-del:hover { background: rgba(255, 77, 109, 0.1); }

          .fo-sub { margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(0, 240, 255, 0.16); }
          .fo-sub-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; }
        `})]})})}const Ke=/^[A-Za-z][A-Za-z0-9_\-]{0,15}$/,Ht=/^[A-Za-z0-9._\-]{1,32}$/,Wt=/^[0-9.]{7,18}\/[0-9]{1,2}$/,Vt=/^[0-9.]{7,18}$/,qt=["simple","vlan","qinq","vxlan","evpn"];function Zt({open:a,onClose:u,clusterId:x}){const{t:n}=K(),i=te(),[r,N]=t.useState("zones"),[I,z]=t.useState(0),P=()=>z(s=>s+1),[C,D]=t.useState([]),[S,A]=t.useState([]),[w,R]=t.useState(null),[_,v]=t.useState([]),[k,$]=t.useState(!1),[m,h]=t.useState(null),[p,d]=t.useState({zone:"",type:"simple",bridge:"",tag:"",mtu:""}),[c,j]=t.useState({vnet:"",zone:"",tag:"",alias:""}),[E,y]=t.useState({subnet:"",gateway:"",snat:!1});if(t.useEffect(()=>{if(!a)return;let s=!0;return(async()=>{$(!0),h(null);try{const L=encodeURIComponent(x),[H,f]=await Promise.all([fetch(`/api/clusters/${L}/sdn/zones`,{credentials:"same-origin"}),fetch(`/api/clusters/${L}/sdn/vnets`,{credentials:"same-origin"})]);if(!s)return;if(H.ok){const l=await H.json();D(l.zones||l||[])}if(f.ok){const l=await f.json();A(l.vnets||l||[])}}catch(L){s&&h(L.message||String(L))}finally{s&&$(!1)}})(),()=>{s=!1}},[a,x,I]),t.useEffect(()=>{if(!a||!w){v([]);return}let s=!0;return(async()=>{try{const L=await fetch(`/api/clusters/${encodeURIComponent(x)}/sdn/vnets/${encodeURIComponent(w)}/subnets`,{credentials:"same-origin"});if(s&&L.ok){const H=await L.json();v(H.subnets||[])}}catch{}})(),()=>{s=!1}},[a,x,w,I]),!a)return null;const o=async(s,L,H)=>{const f=await fetch(`/api/clusters/${encodeURIComponent(x)}${L}`,{method:s,credentials:"same-origin",headers:H?{"Content-Type":"application/json"}:void 0,body:H?JSON.stringify(H):void 0}),l=await f.json().catch(()=>({}));if(!f.ok||!l.ok)throw new Error(l.detail||l.error||`HTTP ${f.status}`)},b=async s=>{h(null);try{await s(),P()}catch(L){h(L.message||String(L))}},U=()=>b(async()=>{await o("POST","/sdn/reload"),await i.alert("SDN reload submitted. Check tasks for status.")});return e.jsx("div",{className:"sd-back",onClick:u,children:e.jsxs("div",{className:"sd-modal",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"sd-head",children:[e.jsxs("div",{className:"sd-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),e.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),e.jsx("span",{children:n("sdn.title")})]}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[e.jsx("button",{className:"sd-reload",onClick:U,children:n("sdn.reload")}),e.jsx("button",{className:"sd-close",onClick:u,children:"×"})]})]}),e.jsx("div",{className:"sd-tabs",children:["zones","vnets"].map(s=>e.jsx("button",{className:`sd-tab ${r===s?"active":""}`,onClick:()=>N(s),children:n(`sdn.tab.${s}`)},s))}),e.jsxs("div",{className:"sd-body",children:[m&&e.jsx("div",{className:"sd-error",children:m}),k&&e.jsx("div",{className:"sd-empty",children:n("sdn.loading")}),r==="zones"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sd-add",children:[e.jsx("input",{placeholder:"zone (e.g. zone1)",value:p.zone,onChange:s=>d({...p,zone:s.target.value})}),e.jsx("select",{value:p.type,onChange:s=>d({...p,type:s.target.value}),children:qt.map(s=>e.jsx("option",{value:s,children:s},s))}),e.jsx("input",{placeholder:"bridge (vlan/qinq)",value:p.bridge,onChange:s=>d({...p,bridge:s.target.value})}),e.jsx("input",{placeholder:"tag (qinq)",type:"number",min:1,max:4094,value:p.tag,onChange:s=>d({...p,tag:s.target.value})}),e.jsx("input",{placeholder:"mtu",type:"number",value:p.mtu,onChange:s=>d({...p,mtu:s.target.value})}),e.jsx("button",{className:"sd-primary",disabled:!Ke.test(p.zone)||p.bridge!==""&&!Ht.test(p.bridge),onClick:()=>b(async()=>{const s={zone:p.zone,type:p.type};p.bridge&&(s.bridge=p.bridge),p.tag&&(s.tag=+p.tag),p.mtu&&(s.mtu=+p.mtu),await o("POST","/sdn/zones",s),d({zone:"",type:"simple",bridge:"",tag:"",mtu:""})}),children:"+ Create"})]}),e.jsxs("table",{className:"sd-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"zone"}),e.jsx("th",{children:"type"}),e.jsx("th",{children:"bridge"}),e.jsx("th",{children:"tag"}),e.jsx("th",{children:"mtu"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:C.map(s=>e.jsxs("tr",{children:[e.jsx("td",{className:"sd-mono",children:s.zone}),e.jsx("td",{className:"sd-mono",children:s.type||"—"}),e.jsx("td",{className:"sd-mono",children:s.bridge||"—"}),e.jsx("td",{className:"sd-mono",children:s.tag??"—"}),e.jsx("td",{className:"sd-mono",children:s.mtu??"—"}),e.jsx("td",{children:e.jsx("button",{className:"sd-del",onClick:async()=>{await i.confirm(`Delete zone "${s.zone}"?`,{title:"Delete SDN zone?",destructive:!0})&&b(()=>o("DELETE",`/sdn/zones/${encodeURIComponent(s.zone)}`))},children:"Delete"})})]},s.zone))})]})]}),r==="vnets"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"sd-add",children:[e.jsx("input",{placeholder:"vnet",value:c.vnet,onChange:s=>j({...c,vnet:s.target.value})}),e.jsxs("select",{value:c.zone,onChange:s=>j({...c,zone:s.target.value}),children:[e.jsx("option",{value:"",children:"— pick zone —"}),C.map(s=>e.jsx("option",{value:s.zone,children:s.zone},s.zone))]}),e.jsx("input",{placeholder:"vlan tag (optional)",type:"number",min:1,max:4094,value:c.tag,onChange:s=>j({...c,tag:s.target.value})}),e.jsx("input",{placeholder:"alias (optional)",value:c.alias,onChange:s=>j({...c,alias:s.target.value})}),e.jsx("button",{className:"sd-primary",disabled:!Ke.test(c.vnet)||!Ke.test(c.zone),onClick:()=>b(async()=>{const s={vnet:c.vnet,zone:c.zone};c.tag&&(s.tag=+c.tag),c.alias&&(s.alias=c.alias),await o("POST","/sdn/vnets",s),j({vnet:"",zone:"",tag:"",alias:""})}),children:"+ Create"})]}),e.jsxs("table",{className:"sd-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"vnet"}),e.jsx("th",{children:"zone"}),e.jsx("th",{children:"tag"}),e.jsx("th",{children:"alias"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:S.map(s=>e.jsxs("tr",{className:w===s.vnet?"sd-selected":"",children:[e.jsx("td",{className:"sd-mono",children:e.jsx("button",{className:"sd-link",onClick:()=>R(w===s.vnet?null:s.vnet),children:s.vnet})}),e.jsx("td",{className:"sd-mono",children:s.zone}),e.jsx("td",{className:"sd-mono",children:s.tag??"—"}),e.jsx("td",{className:"sd-mono",children:s.alias||"—"}),e.jsx("td",{children:e.jsx("button",{className:"sd-del",onClick:async()=>{await i.confirm(`Delete vnet "${s.vnet}"?`,{title:"Delete vnet?",destructive:!0})&&b(()=>o("DELETE",`/sdn/vnets/${encodeURIComponent(s.vnet)}`))},children:"Delete"})})]},s.vnet))})]}),w&&e.jsxs("div",{className:"sd-sub",children:[e.jsxs("div",{className:"sd-sub-title",children:["Subnets in ",e.jsx("code",{children:w})]}),e.jsxs("div",{className:"sd-add",children:[e.jsx("input",{placeholder:"10.0.0.0/24",value:E.subnet,onChange:s=>y({...E,subnet:s.target.value})}),e.jsx("input",{placeholder:"gateway (optional)",value:E.gateway,onChange:s=>y({...E,gateway:s.target.value})}),e.jsxs("label",{className:"sd-check",children:[e.jsx("input",{type:"checkbox",checked:E.snat,onChange:s=>y({...E,snat:s.target.checked})}),"SNAT"]}),e.jsx("button",{className:"sd-primary",disabled:!Wt.test(E.subnet)||E.gateway!==""&&!Vt.test(E.gateway),onClick:()=>b(async()=>{await o("POST",`/sdn/vnets/${encodeURIComponent(w)}/subnets`,E),y({subnet:"",gateway:"",snat:!1})}),children:"+ Add"})]}),e.jsxs("table",{className:"sd-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"subnet"}),e.jsx("th",{children:"gateway"}),e.jsx("th",{children:"snat"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:_.map(s=>e.jsxs("tr",{children:[e.jsx("td",{className:"sd-mono",children:s.subnet}),e.jsx("td",{className:"sd-mono",children:s.gateway||"—"}),e.jsx("td",{className:"sd-mono",children:s.snat?"yes":"—"}),e.jsx("td",{children:e.jsx("button",{className:"sd-del",onClick:()=>b(()=>o("DELETE",`/sdn/vnets/${encodeURIComponent(w)}/subnets/${encodeURIComponent(s.subnet)}`)),children:"Delete"})})]},s.subnet))})]})]})]})]}),e.jsx("div",{className:"sd-footer",children:n("sdn.footer_help")}),e.jsx("style",{children:`
          .sd-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .sd-modal { width: min(960px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: sd-in .18s ease-out; overflow: hidden; }
          @keyframes sd-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .sd-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .sd-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .sd-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .sd-reload { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .sd-reload:hover { background: rgba(0,240,255,.2); }
          .sd-tabs { display: flex; padding: 0 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); }
          .sd-tab { padding: 10px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; background: transparent; color: var(--text-secondary); border: none; border-bottom: 2px solid transparent; cursor: pointer; }
          .sd-tab:hover { color: var(--primary); }
          .sd-tab.active { color: var(--primary); border-bottom-color: var(--primary); }
          .sd-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .sd-empty { padding: 20px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .sd-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .sd-footer { padding: 8px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .sd-add { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; }
          .sd-add input, .sd-add select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; min-width: 120px; }
          .sd-add input:focus, .sd-add select:focus { border-color: var(--primary); }
          .sd-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .sd-primary { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .sd-primary:disabled { opacity: .4; cursor: not-allowed; }
          .sd-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .sd-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .sd-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .sd-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .sd-table tbody tr.sd-selected { background: rgba(0, 240, 255, 0.08); box-shadow: inset 3px 0 0 var(--primary); }
          .sd-link { background: transparent; border: none; color: var(--primary); font-family: var(--font-mono); font-size: 13px; cursor: pointer; text-decoration: underline; padding: 0; }
          .sd-mono { font-family: var(--font-mono); }
          .sd-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .sd-del:hover { background: rgba(255, 77, 109, 0.1); }
          .sd-sub { margin-top: 18px; padding-top: 14px; border-top: 1px solid rgba(0, 240, 255, 0.16); }
          .sd-sub-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; }
        `})]})})}const Gt=["dir","nfs","cifs","lvm","lvmthin","zfspool","rbd","pbs","cephfs","iscsi","glusterfs","zfs"],Yt=/^[A-Za-z][A-Za-z0-9._\-]{0,31}$/,Xe={dir:[{key:"path",label:"path",placeholder:"/srv/storage"},{key:"mkdir",label:"mkdir",type:"bool"},{key:"shared",label:"shared",type:"bool"}],nfs:[{key:"server",label:"server",placeholder:"nas.example.com"},{key:"export",label:"export",placeholder:"/srv/export"},{key:"options",label:"options",placeholder:"vers=4.2"},{key:"shared",label:"shared",type:"bool"}],cifs:[{key:"server",label:"server"},{key:"share",label:"share"},{key:"username",label:"username"},{key:"password",label:"password",type:"password"},{key:"smbversion",label:"smb version",placeholder:"3.0"},{key:"domain",label:"domain"},{key:"shared",label:"shared",type:"bool"}],lvm:[{key:"vgname",label:"volume group"},{key:"shared",label:"shared",type:"bool"},{key:"saferemove",label:"safe remove",type:"bool"}],lvmthin:[{key:"vgname",label:"volume group"},{key:"thinpool",label:"thin pool"}],zfspool:[{key:"pool",label:"pool"},{key:"sparse",label:"sparse",type:"bool"},{key:"blocksize",label:"block size",placeholder:"8k"}],rbd:[{key:"monhost",label:"mon hosts"},{key:"pool",label:"pool"},{key:"username",label:"username",placeholder:"admin"},{key:"krbd",label:"krbd",type:"bool"},{key:"shared",label:"shared",type:"bool"}],pbs:[{key:"server",label:"server"},{key:"datastore",label:"datastore"},{key:"username",label:"username",placeholder:"user@pbs"},{key:"password",label:"password",type:"password"},{key:"fingerprint",label:"fingerprint (sha256)",placeholder:"aa:bb:.."},{key:"namespace",label:"namespace"}],cephfs:[{key:"monhost",label:"mon hosts (comma-sep)"},{key:"username",label:"username",placeholder:"admin"},{key:"fs_name",label:"fs name"},{key:"subdir",label:"subdir"},{key:"fuse",label:"fuse",type:"bool"}],iscsi:[{key:"portal",label:"portal",placeholder:"10.0.0.10:3260"},{key:"target",label:"target IQN"}],glusterfs:[{key:"server",label:"server"},{key:"server2",label:"server2 (failover)"},{key:"volume",label:"volume"}],zfs:[{key:"portal",label:"portal"},{key:"target",label:"target IQN"},{key:"pool",label:"pool"},{key:"iscsiprovider",label:"provider",placeholder:"comstar | istgt | iet | LIO"}]};function Jt({open:a,onClose:u,clusterId:x}){const{t:n}=K(),i=te(),[r,N]=t.useState([]),[I,z]=t.useState(!1),[P,C]=t.useState(null),[D,S]=t.useState(0),A=()=>S(o=>o+1),[w,R]=t.useState(!1),[_,v]=t.useState(null),[k,$]=t.useState("dir"),[m,h]=t.useState({});t.useEffect(()=>{if(!a)return;let o=!0;return(async()=>{z(!0),C(null);try{const b=await fetch(`/api/clusters/${encodeURIComponent(x)}/storage-config`,{credentials:"same-origin"});o&&b.ok&&N((await b.json()).storages||[])}catch(b){o&&C(b.message||String(b))}finally{o&&z(!1)}})(),()=>{o=!1}},[a,x,D]),t.useEffect(()=>{a||(R(!1),v(null),h({}))},[a]);const p=t.useMemo(()=>r.find(o=>o.storage===_)||null,[r,_]),d=()=>{v(null),R(!0),$("dir"),h({storage:"",content:"images",nodes:"",disable:0})},c=o=>{R(!1),v(o.storage);const b={content:o.content||"",nodes:o.nodes||"",shared:o.shared?1:0,disable:o.disable?1:0};for(const U of Xe[o.type]||[])o[U.key]!==void 0&&(b[U.key]=o[U.key]);h(b)},j=async()=>{C(null);try{if(w){const o=(m.storage||"").trim();if(!Yt.test(o))throw new Error("Bad storage id");const b={storage:o,type:k};for(const[L,H]of Object.entries(m))L!=="storage"&&(H===""||H===void 0||H===null||(b[L]=H));const U=await fetch(`/api/clusters/${encodeURIComponent(x)}/storage-config`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}),s=await U.json().catch(()=>({}));if(!U.ok||!s.ok)throw new Error(s.detail||s.error||`HTTP ${U.status}`);R(!1),h({}),A()}else if(p){const o={};for(const[s,L]of Object.entries(m))L===""||L===void 0||L===null||(o[s]=L);const b=await fetch(`/api/clusters/${encodeURIComponent(x)}/storage-config/${encodeURIComponent(p.storage)}`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),U=await b.json().catch(()=>({}));if(!b.ok||!U.ok)throw new Error(U.detail||U.error||`HTTP ${b.status}`);v(null),h({}),A()}}catch(o){C(o.message||String(o))}},E=async o=>{if(await i.confirm(`Remove storage "${o.storage}" from cluster config?

This only deletes the entry. Underlying disk/share data is left intact.`,{title:"Delete storage?",destructive:!0}))try{const U=await fetch(`/api/clusters/${encodeURIComponent(x)}/storage-config/${encodeURIComponent(o.storage)}`,{method:"DELETE",credentials:"same-origin"}),s=await U.json().catch(()=>({}));if(!U.ok||!s.ok)throw new Error(s.detail||s.error||`HTTP ${U.status}`);_===o.storage&&v(null),A()}catch(U){await i.alert(`Delete failed: ${U.message||U}`)}};if(!a)return null;const y=w?Xe[k]||[]:p?Xe[p.type]||[]:[];return e.jsx("div",{className:"sa-back",onClick:u,children:e.jsxs("div",{className:"sa-modal",onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{className:"sa-head",children:[e.jsxs("div",{className:"sa-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),e.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),e.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),e.jsx("span",{children:n("sta.title")})]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{className:"sa-add-btn",onClick:d,children:"+ New"}),e.jsx("button",{className:"sa-close",onClick:u,children:"×"})]})]}),e.jsxs("div",{className:"sa-split",children:[e.jsxs("div",{className:"sa-list",children:[P&&e.jsx("div",{className:"sa-error",children:P}),I&&r.length===0&&e.jsx("div",{className:"sa-empty",children:n("sta.loading")}),!I&&r.length===0&&e.jsx("div",{className:"sa-empty",children:n("sta.empty")}),e.jsxs("table",{className:"sa-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"id"}),e.jsx("th",{children:"type"}),e.jsx("th",{children:"content"}),e.jsx("th",{children:"nodes"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:r.map(o=>e.jsxs("tr",{className:_===o.storage?"sa-selected":"",children:[e.jsxs("td",{className:"sa-mono",children:[e.jsx("button",{className:"sa-link",onClick:()=>c(o),children:o.storage}),o.disable?e.jsx("span",{className:"sa-pill off",children:"disabled"}):null]}),e.jsx("td",{className:"sa-mono",children:o.type}),e.jsx("td",{className:"sa-mono sa-trunc",title:o.content||"",children:o.content||"—"}),e.jsx("td",{className:"sa-mono sa-trunc",title:o.nodes||"",children:o.nodes||"all"}),e.jsx("td",{children:e.jsx("button",{className:"sa-del",onClick:()=>E(o),children:"Delete"})})]},o.storage))})]})]}),e.jsxs("div",{className:"sa-edit",children:[!w&&!p&&e.jsx("div",{className:"sa-empty",children:n("sta.pick_or_new")}),(w||p)&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"sa-edit-title",children:w?`+ New ${k}`:`Edit ${p.storage} (${p.type})`}),w&&e.jsxs(e.Fragment,{children:[e.jsx(Te,{label:"storage id",children:e.jsx("input",{value:m.storage||"",onChange:o=>h({...m,storage:o.target.value}),placeholder:"my-storage"})}),e.jsx(Te,{label:"type",children:e.jsx("select",{value:k,onChange:o=>$(o.target.value),children:Gt.map(o=>e.jsx("option",{value:o,children:o},o))})})]}),e.jsx(Te,{label:"content",children:e.jsx("input",{value:m.content||"",onChange:o=>h({...m,content:o.target.value}),placeholder:"images,iso,vztmpl,backup"})}),e.jsx(Te,{label:"nodes",children:e.jsx("input",{value:m.nodes||"",onChange:o=>h({...m,nodes:o.target.value}),placeholder:"(empty = all)"})}),e.jsx(Te,{label:"disabled",children:e.jsx("input",{type:"checkbox",checked:!!m.disable,onChange:o=>h({...m,disable:o.target.checked?1:0})})}),y.map(o=>e.jsx(Te,{label:o.label,children:o.type==="bool"?e.jsx("input",{type:"checkbox",checked:!!m[o.key],onChange:b=>h({...m,[o.key]:b.target.checked?1:0})}):o.type==="password"?e.jsx("input",{type:"password",value:m[o.key]||"",onChange:b=>h({...m,[o.key]:b.target.value}),placeholder:o.placeholder}):e.jsx("input",{value:m[o.key]||"",onChange:b=>h({...m,[o.key]:b.target.value}),placeholder:o.placeholder})},o.key)),e.jsxs("div",{className:"sa-actions",children:[e.jsx("button",{onClick:()=>{R(!1),v(null),h({})},children:"Cancel"}),e.jsx("button",{className:"sa-primary",onClick:j,children:w?"Create":"Save"})]})]})]})]}),e.jsx("style",{children:`
          .sa-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .sa-modal { width: min(1100px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: sa-in .18s ease-out; overflow: hidden; }
          @keyframes sa-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .sa-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .sa-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .sa-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .sa-add-btn { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0,240,255,.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .sa-add-btn:hover { background: rgba(0,240,255,.2); }
          .sa-split { display: grid; grid-template-columns: 1fr 360px; flex: 1; min-height: 0; }
          .sa-list { overflow: auto; padding: 12px 14px; border-right: 1px solid rgba(0,240,255,.12); }
          .sa-edit { overflow: auto; padding: 12px 14px; background: rgba(0, 240, 255, 0.02); }
          .sa-edit-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1px solid rgba(0,240,255,.16); }
          .sa-row { display: grid; grid-template-columns: 110px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .sa-row > span { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-secondary); }
          .sa-row input, .sa-row select { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .sa-row input[type="checkbox"] { justify-self: start; }
          .sa-row input:focus, .sa-row select:focus { border-color: var(--primary); }
          .sa-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
          .sa-actions button { padding: 6px 16px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .sa-actions .sa-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .sa-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .sa-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .sa-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .sa-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .sa-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); color: var(--text-primary); white-space: nowrap; }
          .sa-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .sa-table tbody tr.sa-selected { background: rgba(0, 240, 255, 0.08); box-shadow: inset 3px 0 0 var(--primary); }
          .sa-link { background: transparent; border: none; color: var(--primary); font-family: var(--font-mono); font-size: 13px; cursor: pointer; text-decoration: underline; padding: 0; }
          .sa-mono { font-family: var(--font-mono); }
          .sa-trunc { max-width: 220px; overflow: hidden; text-overflow: ellipsis; }
          .sa-pill { margin-left: 8px; padding: 1px 6px; font-size: 13.5px; border-radius: 999px; border: 1px solid currentColor; }
          .sa-pill.off { color: var(--warning); }
          .sa-del { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .sa-del:hover { background: rgba(255, 77, 109, 0.1); }
        `})]})})}function Te({label:a,children:u}){return e.jsxs("label",{className:"sa-row",children:[e.jsx("span",{children:a}),u]})}const Ve=["noout","nobackfill","norebalance","norecover","noscrub","nodeep-scrub","pause","noup","nodown"];function Kt({open:a,onClose:u,clusterId:x,cephNode:n}){const{t:i}=K(),r=te(),[N,I]=t.useState({}),[z,P]=t.useState([]),[C,D]=t.useState(!1),[S,A]=t.useState(null),[w,R]=t.useState(0),[_,v]=t.useState(null),[k,$]=t.useState("1.00"),[m,h]=t.useState([]),[p,d]=t.useState([]),[c,j]=t.useState([]),[E,y]=t.useState([]),[o,b]=t.useState({name:"",pg_num:"128",size:"3",min_size:"2",application:"rbd",add_storages:!1}),U=/^[A-Za-z][A-Za-z0-9._\-]{0,63}$/;t.useEffect(()=>{if(!a||!n)return;let l=!0;return(async()=>{D(!0),A(null);try{const g=encodeURIComponent(x),F=encodeURIComponent(n),[B]=await Promise.all([fetch(`/api/clusters/${g}/ceph/flags`,{credentials:"same-origin"})]);if(l&&B.ok){const G=await B.json(),O={};for(const Y of Ve)O[Y]=!1;const W=G.flags;if(Array.isArray(W))for(const Y of W){const ee=Y&&(Y.name||Y),ae=Y&&(Y.value!==void 0?Y.value:1);ee&&Ve.includes(ee)&&(O[ee]=!!ae)}else if(W&&typeof W=="object")for(const Y of Object.keys(W))Ve.includes(Y)&&(O[Y]=!!W[Y]);I(O)}try{const G=await fetch(`/api/clusters/${encodeURIComponent(x)}`,{credentials:"same-origin"});if(l&&G.ok){const W=(await G.json()).ceph||{},Y=W.osds||[];P(Y),h(W.pools||[]),d(W.monitors||W.mons||[]),j(W.managers||W.mgrs||[]),y(W.mdss||[])}}catch{}}catch(g){l&&A(g.message||String(g))}finally{l&&D(!1)}})(),()=>{l=!1}},[a,x,n,w]);const s=async(l,g)=>{A(null);try{const F=await fetch(`/api/clusters/${encodeURIComponent(x)}/ceph/flags/${encodeURIComponent(l)}`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({value:g})}),B=await F.json().catch(()=>({}));if(!F.ok||!B.ok)throw new Error(B.detail||B.error||`HTTP ${F.status}`);I(G=>({...G,[l]:g})),R(G=>G+1)}catch(F){A(`${l}: ${F.message||F}`)}},L=async(l,g)=>{if(!(!n||!await r.confirm(g==="out"?`Mark osd.${l} OUT? Data will be re-balanced off this OSD.`:`Mark osd.${l} IN?`,{title:`osd ${g}`,destructive:g==="out"})))try{const B=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ceph/osd/${l}/${g}`,{method:"POST",credentials:"same-origin"}),G=await B.json().catch(()=>({}));if(!B.ok||!G.ok)throw new Error(G.detail||G.error||`HTTP ${B.status}`);R(O=>O+1)}catch(B){await r.alert(`Action failed: ${B.message||B}`)}},H=async()=>{if(_===null||!n)return;const l=parseFloat(k);if(!Number.isFinite(l)||l<0||l>1){await r.alert("Weight must be between 0.0 and 1.0");return}try{const g=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ceph/osd/${_}/reweight`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({weight:l})}),F=await g.json().catch(()=>({}));if(!g.ok||!F.ok)throw new Error(F.detail||F.error||`HTTP ${g.status}`);v(null),R(B=>B+1)}catch(g){await r.alert(`Reweight failed: ${g.message||g}`)}},f=t.useMemo(()=>[...z].sort((l,g)=>(l.id||0)-(g.id||0)),[z]);return a?e.jsx("div",{className:"ca-back",onClick:u,children:e.jsxs("div",{className:"ca-modal",onClick:l=>l.stopPropagation(),children:[e.jsxs("div",{className:"ca-head",children:[e.jsxs("div",{className:"ca-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),e.jsx("span",{children:i("ca.title")})]}),e.jsx("button",{className:"ca-close",onClick:u,children:"×"})]}),e.jsxs("div",{className:"ca-body",children:[S&&e.jsx("div",{className:"ca-error",children:S}),C&&e.jsx("div",{className:"ca-empty",children:i("ca.loading")}),!n&&e.jsx("div",{className:"ca-empty",children:i("ca.no_ceph")}),n&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ca-section",children:[e.jsx("div",{className:"ca-section-title",children:i("ca.section.flags")}),e.jsx("div",{className:"ca-flags",children:Ve.map(l=>e.jsxs("label",{className:`ca-flag ${N[l]?"on":""}`,children:[e.jsx("input",{type:"checkbox",checked:!!N[l],onChange:g=>s(l,g.target.checked)}),e.jsx("span",{children:l})]},l))}),e.jsx("div",{className:"ca-help",children:i("ca.flags_help")})]}),e.jsxs("div",{className:"ca-section",children:[e.jsx("div",{className:"ca-section-title",children:i("ca.section.osds")}),f.length===0?e.jsx("div",{className:"ca-empty",children:i("ca.no_osds")}):e.jsxs("table",{className:"ca-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"id"}),e.jsx("th",{children:"host"}),e.jsx("th",{children:"class"}),e.jsx("th",{children:"weight"}),e.jsx("th",{children:"reweight"}),e.jsx("th",{children:"up/in"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:f.map(l=>{var g,F;return e.jsxs("tr",{children:[e.jsxs("td",{className:"ca-mono",children:["osd.",l.id]}),e.jsx("td",{className:"ca-mono",children:l.host||"—"}),e.jsx("td",{className:"ca-mono",children:l.device_class||"—"}),e.jsx("td",{className:"ca-mono",children:((g=l.weight)==null?void 0:g.toFixed(3))??"—"}),e.jsx("td",{className:"ca-mono",children:((F=l.reweight)==null?void 0:F.toFixed(2))??"—"}),e.jsxs("td",{children:[e.jsx("span",{className:`ca-pill ${l.up?"ok":"bad"}`,children:l.up?"up":"down"}),e.jsx("span",{className:`ca-pill ${l.in?"ok":"bad"}`,style:{marginLeft:4},children:l.in?"in":"out"})]}),e.jsxs("td",{children:[e.jsx("button",{className:"ca-btn",onClick:()=>{v(l.id),$((l.reweight??1).toFixed(2))},children:"reweight"}),l.in?e.jsx("button",{className:"ca-btn ca-bad",onClick:()=>L(l.id,"out"),children:"out"}):e.jsx("button",{className:"ca-btn ca-ok",onClick:()=>L(l.id,"in"),children:"in"})]})]},l.id)})})]})]})]}),n&&e.jsxs("div",{className:"ca-section",children:[e.jsx("div",{className:"ca-section-title",children:i("ca.section.pools")}),e.jsxs("div",{className:"ca-pool-add",children:[e.jsx("input",{placeholder:"pool name",value:o.name,onChange:l=>b({...o,name:l.target.value})}),e.jsx("input",{placeholder:"pg_num",type:"number",value:o.pg_num,style:{width:90},onChange:l=>b({...o,pg_num:l.target.value})}),e.jsx("input",{placeholder:"size",type:"number",value:o.size,style:{width:60},onChange:l=>b({...o,size:l.target.value})}),e.jsx("input",{placeholder:"min_size",type:"number",value:o.min_size,style:{width:80},onChange:l=>b({...o,min_size:l.target.value})}),e.jsxs("select",{value:o.application,onChange:l=>b({...o,application:l.target.value}),children:[e.jsx("option",{value:"rbd",children:"rbd"}),e.jsx("option",{value:"cephfs",children:"cephfs"}),e.jsx("option",{value:"rgw",children:"rgw"})]}),e.jsxs("label",{className:"ca-check",children:[e.jsx("input",{type:"checkbox",checked:o.add_storages,onChange:l=>b({...o,add_storages:l.target.checked})}),"add PVE storage"]}),e.jsx("button",{className:"ca-primary",disabled:!U.test(o.name),onClick:async()=>{try{const l={name:o.name,pg_num:+o.pg_num,size:+o.size,min_size:+o.min_size,application:o.application,add_storages:o.add_storages},g=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ceph/pool`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)}),F=await g.json().catch(()=>({}));if(!g.ok||!F.ok)throw new Error(F.detail||F.error||`HTTP ${g.status}`);b({...o,name:""}),R(B=>B+1)}catch(l){await r.alert(`Create pool failed: ${l.message||l}`)}},children:"+ Create pool"})]}),m.length===0?e.jsx("div",{className:"ca-empty",children:i("ca.no_pools")}):e.jsxs("table",{className:"ca-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"name"}),e.jsx("th",{children:"size/min"}),e.jsx("th",{children:"pg_num"}),e.jsx("th",{children:"app"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:m.map(l=>e.jsxs("tr",{children:[e.jsx("td",{className:"ca-mono",children:l.name||`(pool ${l.pool_id??"?"})`}),e.jsxs("td",{className:"ca-mono",children:[l.size??"—","/",l.min_size||"—"]}),e.jsx("td",{className:"ca-mono",children:l.pg_num??"—"}),e.jsx("td",{className:"ca-mono",children:l.application||"—"}),e.jsx("td",{children:e.jsx("button",{className:"ca-btn ca-bad",onClick:async()=>{if(await r.confirm(`Destroy Ceph pool "${l.name}"?

ALL DATA in this pool is irrecoverably lost.`,{title:"Destroy Ceph pool?",destructive:!0}))try{const F=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ceph/pool/${encodeURIComponent(l.name||"")}?remove_storages=1`,{method:"DELETE",credentials:"same-origin"}),B=await F.json().catch(()=>({}));if(!F.ok||!B.ok)throw new Error(B.detail||B.error||`HTTP ${F.status}`);R(G=>G+1)}catch(F){await r.alert(`Destroy failed: ${F.message||F}`)}},children:"Destroy"})})]},l.name||l.pool_id))})]})]}),n&&e.jsxs("div",{className:"ca-section",children:[e.jsx("div",{className:"ca-section-title",children:i("ca.section.daemons")}),e.jsx("div",{className:"ca-help",children:i("ca.daemons_help").replace("{node}",n)}),e.jsxs("div",{className:"ca-daemon-actions",children:[e.jsxs("button",{className:"ca-btn",onClick:async()=>{try{const l=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ceph/mon`,{method:"POST",credentials:"same-origin"}),g=await l.json().catch(()=>({}));if(!l.ok||!g.ok)throw new Error(g.detail||g.error||`HTTP ${l.status}`);R(F=>F+1)}catch(l){await r.alert(`MON create failed: ${l.message||l}`)}},children:["+ MON on ",n]}),e.jsxs("button",{className:"ca-btn",onClick:async()=>{try{const l=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ceph/mgr`,{method:"POST",credentials:"same-origin"}),g=await l.json().catch(()=>({}));if(!l.ok||!g.ok)throw new Error(g.detail||g.error||`HTTP ${l.status}`);R(F=>F+1)}catch(l){await r.alert(`MGR create failed: ${l.message||l}`)}},children:["+ MGR on ",n]}),e.jsxs("button",{className:"ca-btn",onClick:async()=>{try{const l=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(n)}/ceph/mds`,{method:"POST",credentials:"same-origin"}),g=await l.json().catch(()=>({}));if(!l.ok||!g.ok)throw new Error(g.detail||g.error||`HTTP ${l.status}`);R(F=>F+1)}catch(l){await r.alert(`MDS create failed: ${l.message||l}`)}},children:["+ MDS on ",n]})]}),[{label:"MONs",list:p,kind:"mon"},{label:"MGRs",list:c,kind:"mgr"},{label:"MDSs",list:E,kind:"mds"}].map(l=>l.list.length>0&&e.jsxs("div",{style:{marginTop:10},children:[e.jsx("div",{style:{fontFamily:"var(--font-display)",fontSize:11,color:"var(--text-secondary)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:4},children:l.label}),e.jsxs("table",{className:"ca-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"name"}),e.jsx("th",{children:"host"}),e.jsx("th",{children:"state"}),e.jsx("th",{})]})}),e.jsx("tbody",{children:l.list.map(g=>e.jsxs("tr",{children:[e.jsx("td",{className:"ca-mono",children:g.name}),e.jsx("td",{className:"ca-mono",children:g.host||"—"}),e.jsx("td",{className:"ca-mono",children:g.state||(g.standby?"standby":"—")}),e.jsx("td",{children:e.jsx("button",{className:"ca-btn ca-bad",onClick:async()=>{if(!await r.confirm(`Destroy ceph ${l.kind} "${g.name}"?`,{title:`Destroy ${l.kind}?`,destructive:!0}))return;const B=g.host||n;try{const G=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(B)}/ceph/${l.kind}/${encodeURIComponent(g.name||"")}`,{method:"DELETE",credentials:"same-origin"}),O=await G.json().catch(()=>({}));if(!G.ok||!O.ok)throw new Error(O.detail||O.error||`HTTP ${G.status}`);R(W=>W+1)}catch(G){await r.alert(`Destroy failed: ${G.message||G}`)}},children:"Destroy"})})]},g.name))})]})]},l.kind))]}),_!==null&&e.jsx("div",{className:"ca-overlay",onClick:()=>v(null),children:e.jsxs("div",{className:"ca-overlay-card",onClick:l=>l.stopPropagation(),children:[e.jsxs("div",{className:"ca-section-title",children:["Reweight osd.",_]}),e.jsx("div",{className:"ca-help",children:"Range 0.0 – 1.0. Setting 0 effectively drains the OSD without marking it out."}),e.jsx("input",{type:"range",min:0,max:1,step:.01,value:k,onChange:l=>$(l.target.value),style:{width:"100%",accentColor:"var(--primary)"}}),e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",marginTop:8},children:[e.jsx("input",{type:"number",min:0,max:1,step:.01,value:k,onChange:l=>$(l.target.value),style:{width:100,padding:"4px 8px",fontFamily:"var(--font-mono)",background:"rgba(0,240,255,.05)",border:"1px solid rgba(0,240,255,.2)",borderRadius:3,color:"var(--text-primary)"}}),e.jsx("div",{style:{flex:1}}),e.jsx("button",{onClick:()=>v(null),children:"Cancel"}),e.jsx("button",{className:"ca-primary",onClick:H,children:"Apply"})]})]})})]}),e.jsx("style",{children:`
          .ca-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .ca-modal { width: min(900px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: ca-in .18s ease-out; overflow: hidden; }
          @keyframes ca-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .ca-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .ca-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .ca-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .ca-body { flex: 1; overflow: auto; padding: 14px 18px; position: relative; }
          .ca-empty { padding: 24px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .ca-error { padding: 8px 12px; margin-bottom: 12px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .ca-help { font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); padding: 4px 0; }
          .ca-section { margin-bottom: 18px; }
          .ca-section-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .ca-flags { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 6px; }
          .ca-flag { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); cursor: pointer; }
          .ca-flag.on { color: var(--warning); border-color: rgba(255, 200, 0, 0.5); background: rgba(255, 200, 0, 0.05); }
          .ca-flag input { accent-color: var(--warning); }
          .ca-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .ca-table th { padding: 6px 12px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .ca-table td { padding: 4px 12px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .ca-table tbody tr:hover { background: rgba(0, 240, 255, 0.04); }
          .ca-mono { font-family: var(--font-mono); }
          .ca-pill { display: inline-block; padding: 1px 6px; font-size: 13.5px; border-radius: 999px; border: 1px solid currentColor; }
          .ca-pill.ok { color: var(--success); }
          .ca-pill.bad { color: var(--danger, #ff4d6d); }
          .ca-btn { padding: 2px 8px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--primary); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; margin-right: 4px; }
          .ca-btn:hover { background: rgba(0, 240, 255, 0.08); }
          .ca-btn.ca-bad { color: var(--danger, #ff4d6d); }
          .ca-btn.ca-ok  { color: var(--success); }
          .ca-overlay { position: absolute; inset: 0; background: rgba(2,4,10,.7); display: flex; align-items: center; justify-content: center; z-index: 5; }
          .ca-overlay-card { width: min(420px, 92%); background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; padding: 16px 18px; }
          .ca-overlay-card button { padding: 5px 14px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .ca-overlay-card .ca-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .ca-pool-add { display: flex; gap: 6px; align-items: center; padding: 10px; margin-bottom: 12px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 3px; flex-wrap: wrap; }
          .ca-pool-add input, .ca-pool-add select { padding: 4px 8px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .ca-check { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .ca-primary { padding: 5px 12px; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .ca-primary:disabled { opacity: .4; cursor: not-allowed; }
          .ca-daemon-actions { display: flex; gap: 8px; flex-wrap: wrap; padding: 4px 0 8px; }
        `})]})}):null}const Xt=/^[A-Za-z0-9._\-]{1,64}@[a-z][a-z0-9\-]{0,32}$/,Qt=/^[A-Za-z][A-Za-z0-9._\-]{0,63}$/,ea=(a,u)=>{if(!a)return u==="zh-TW"?"無到期":"never";const x=new Date(a*1e3),n=Math.floor((a-Date.now()/1e3)/86400),i=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`;return n<0?`${i} (${u==="zh-TW"?"已過期":"expired"})`:n<30?`${i} (${n}d)`:i};function ta({open:a,onClose:u,clusterId:x}){const{t:n,language:i}=K(),r=te(),[N,I]=t.useState([]),[z,P]=t.useState(!1),[C,D]=t.useState(null),[S,A]=t.useState(""),[w,R]=t.useState(0),[_,v]=t.useState(!1),[k,$]=t.useState(""),[m,h]=t.useState(""),[p,d]=t.useState(!0),[c,j]=t.useState(""),[E,y]=t.useState(""),[o,b]=t.useState(!1),[U,s]=t.useState(null),[L,H]=t.useState(null),[f,l]=t.useState(!1);t.useEffect(()=>{if(!a)return;let O=!0;return(async()=>{P(!0),D(null);try{const W=await fetch(`/api/clusters/${encodeURIComponent(x)}/tokens`,{credentials:"same-origin"});if(!W.ok){const ee=await W.json().catch(()=>({}));throw new Error(ee.error||`HTTP ${W.status}`)}const Y=await W.json();O&&I(Y.tokens||[])}catch(W){O&&D(W.message||String(W))}finally{O&&P(!1)}})(),()=>{O=!1}},[a,x,w]),t.useEffect(()=>{a||(v(!1),$(""),h(""),d(!0),j(""),y(""),s(null),b(!1),H(null),l(!1))},[a]);const g=t.useMemo(()=>{const O=S.trim().toLowerCase();return O?N.filter(W=>W.user.toLowerCase().includes(O)||W.tokenid.toLowerCase().includes(O)||(W.comment||"").toLowerCase().includes(O)):N},[N,S]),F=async()=>{if(s(null),!Xt.test(k.trim())){s(n("apitok.error.bad_userid"));return}if(!Qt.test(m.trim())){s(n("apitok.error.bad_tokenid"));return}let O=null;if(c.trim()){const W=Math.floor(new Date(c).getTime()/1e3);if(!Number.isFinite(W)||W<=0){s(n("apitok.error.create_failed"));return}O=W}b(!0);try{const W=await fetch(`/api/clusters/${encodeURIComponent(x)}/users/${encodeURIComponent(k.trim())}/tokens`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({tokenid:m.trim(),privsep:p,expire:O,comment:E.trim()})}),Y=await W.json().catch(()=>({}));if(!W.ok||!Y.ok)throw new Error(Y.detail||Y.error||`HTTP ${W.status}`);H({full:Y.full_tokenid||`${k}!${m}`,value:Y.value||""}),v(!1),R(ee=>ee+1)}catch(W){s(`${n("apitok.error.create_failed")}: ${W.message||W}`)}finally{b(!1)}},B=async O=>{if(await r.confirm(n("apitok.revoke_confirm_body").replace("{tok}",`${O.user}!${O.tokenid}`),{title:n("apitok.revoke_confirm_title"),destructive:!0}))try{const Y=await fetch(`/api/clusters/${encodeURIComponent(x)}/users/${encodeURIComponent(O.user)}/tokens/${encodeURIComponent(O.tokenid)}`,{method:"DELETE",credentials:"same-origin"}),ee=await Y.json().catch(()=>({}));if(!Y.ok||!ee.ok)throw new Error(ee.detail||ee.error||`HTTP ${Y.status}`);R(ae=>ae+1)}catch(Y){await r.alert(`${n("apitok.error.delete_failed")}: ${Y.message||Y}`)}},G=async()=>{if(L)try{await navigator.clipboard.writeText(L.value),l(!0),setTimeout(()=>l(!1),2e3)}catch{const O=document.getElementById("apitok-secret-input");O&&(O.focus(),O.select())}};return a?e.jsx("div",{className:"at-back",onClick:u,children:e.jsxs("div",{className:"at-modal",onClick:O=>O.stopPropagation(),children:[e.jsxs("div",{className:"at-head",children:[e.jsxs("div",{className:"at-title",children:[e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"})}),e.jsx("span",{children:n("apitok.title")})]}),e.jsxs("div",{className:"at-actions",children:[!_&&!L&&e.jsx("button",{className:"at-create-btn",onClick:()=>v(!0),children:n("apitok.create_btn")}),e.jsx("input",{className:"at-filter",value:S,onChange:O=>A(O.target.value),placeholder:n("apitok.filter_ph")}),e.jsx("button",{className:"at-close",onClick:u,children:"×"})]})]}),L&&e.jsxs("div",{className:"at-reveal",children:[e.jsx("div",{className:"at-reveal-title",children:n("apitok.created_title")}),e.jsxs("div",{className:"at-reveal-warn",children:["⚠ ",n("apitok.created_warning")]}),e.jsxs("div",{className:"at-reveal-row",children:[e.jsx("label",{children:n("apitok.created_full")}),e.jsx("code",{className:"at-reveal-full",children:L.full})]}),e.jsxs("div",{className:"at-reveal-row",children:[e.jsx("label",{children:n("apitok.created_value")}),e.jsx("input",{id:"apitok-secret-input",className:"at-reveal-secret",readOnly:!0,value:L.value,onFocus:O=>O.currentTarget.select()}),e.jsx("button",{className:"at-copy-btn",onClick:G,children:n(f?"apitok.copied":"apitok.copy")})]}),e.jsx("div",{className:"at-reveal-actions",children:e.jsx("button",{className:"at-create-submit",onClick:()=>{H(null),l(!1)},children:n("apitok.created_done")})})]}),_&&e.jsxs("div",{className:"at-create",children:[e.jsx("div",{className:"at-create-title",children:n("apitok.create_title")}),U&&e.jsx("div",{className:"at-error",children:U}),e.jsxs("div",{className:"at-form-row",children:[e.jsx("label",{children:n("apitok.field.user")}),e.jsx("input",{value:k,onChange:O=>$(O.target.value),placeholder:"user@pam",spellCheck:!1})]}),e.jsxs("div",{className:"at-form-row",children:[e.jsx("label",{children:n("apitok.field.tokenid")}),e.jsx("input",{value:m,onChange:O=>h(O.target.value),placeholder:"my-token",spellCheck:!1}),e.jsx("small",{children:n("apitok.field.tokenid_help")})]}),e.jsxs("div",{className:"at-form-row at-form-row-check",children:[e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:p,onChange:O=>d(O.target.checked)}),e.jsx("span",{children:n("apitok.field.privsep")})]}),e.jsx("small",{children:n("apitok.field.privsep_help")})]}),e.jsxs("div",{className:"at-form-row",children:[e.jsx("label",{children:n("apitok.field.expire")}),e.jsx("input",{type:"datetime-local",value:c,onChange:O=>j(O.target.value)}),e.jsx("small",{children:n("apitok.field.expire_help")})]}),e.jsxs("div",{className:"at-form-row",children:[e.jsx("label",{children:n("apitok.field.comment")}),e.jsx("input",{value:E,onChange:O=>y(O.target.value),maxLength:256})]}),e.jsxs("div",{className:"at-form-actions",children:[e.jsx("button",{className:"at-create-cancel",onClick:()=>{v(!1),s(null)},disabled:o,children:n("apitok.create_cancel")}),e.jsx("button",{className:"at-create-submit",onClick:F,disabled:o||!k.trim()||!m.trim(),children:o?"…":n("apitok.create_submit")})]})]}),e.jsxs("div",{className:"at-body",children:[C&&e.jsx("div",{className:"at-error",children:C}),z&&N.length===0&&e.jsx("div",{className:"at-empty",children:n("apitok.loading")}),!z&&N.length===0&&!C&&e.jsx("div",{className:"at-empty",children:n("apitok.empty")}),g.length>0&&e.jsxs("table",{className:"at-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:n("apitok.col.user")}),e.jsx("th",{children:n("apitok.col.token")}),e.jsx("th",{children:n("apitok.col.privsep")}),e.jsx("th",{children:n("apitok.col.expire")}),e.jsx("th",{children:n("apitok.col.comment")}),e.jsx("th",{children:n("apitok.col.actions")})]})}),e.jsx("tbody",{children:g.map(O=>{const W=O.expire&&O.expire>0&&O.expire-Date.now()/1e3<2592e3,Y=O.expire&&O.expire>0&&O.expire-Date.now()/1e3<0;return e.jsxs("tr",{children:[e.jsx("td",{className:"at-mono",children:O.user}),e.jsx("td",{className:"at-mono at-tok",children:O.tokenid}),e.jsx("td",{children:e.jsx("span",{className:`at-bool ${O.privsep?"on":"off"}`,children:O.privsep?"yes":"no"})}),e.jsx("td",{className:`at-mono ${Y?"at-bad":W?"at-warn":""}`,children:ea(O.expire,i)}),e.jsx("td",{className:"at-mono at-comment",title:O.comment||"",children:O.comment||""}),e.jsx("td",{children:e.jsx("button",{className:"at-revoke-btn",onClick:()=>B(O),children:n("apitok.revoke")})})]},`${O.user}!${O.tokenid}`)})})]})]}),e.jsx("div",{className:"at-footer",children:n("apitok.note")}),e.jsx("style",{children:`
          .at-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .at-modal { width: min(960px, 96vw); max-height: 86vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: at-in .18s ease-out; overflow: hidden; }
          @keyframes at-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .at-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .at-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .at-actions { display: flex; align-items: center; gap: 8px; }
          .at-filter { padding: 5px 10px; min-width: 200px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .at-filter:focus { border-color: var(--primary); }
          .at-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .at-close:hover { color: var(--primary); }
          .at-create-btn { padding: 5px 14px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: rgba(0, 240, 255, 0.1); color: var(--primary); border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .at-create-btn:hover { background: rgba(0, 240, 255, 0.2); box-shadow: 0 0 8px rgba(0,240,255,.4); }
          .at-revoke-btn { padding: 2px 10px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--danger, #ff4d6d); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .at-revoke-btn:hover { background: rgba(255, 77, 109, 0.1); }
          .at-create { padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); background: rgba(0, 240, 255, 0.03); }
          .at-create-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 10px; }
          .at-form-row { display: grid; grid-template-columns: 140px 1fr; column-gap: 10px; row-gap: 2px; align-items: center; margin-bottom: 8px; }
          .at-form-row label { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .at-form-row input[type="text"], .at-form-row input:not([type]), .at-form-row input[type="datetime-local"] { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .at-form-row input:focus { border-color: var(--primary); }
          .at-form-row small { grid-column: 2; font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
          .at-form-row-check label { display: flex; align-items: center; gap: 8px; color: var(--text-primary); }
          .at-form-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
          .at-create-cancel { padding: 6px 16px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255,255,255,.18); border-radius: 3px; cursor: pointer; }
          .at-create-submit { padding: 6px 16px; font-family: var(--font-display); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; background: var(--primary); color: #001018; border: 1px solid var(--primary); border-radius: 3px; cursor: pointer; }
          .at-create-submit:disabled, .at-create-cancel:disabled { opacity: .4; cursor: not-allowed; }
          .at-reveal { padding: 14px 18px; border-bottom: 1px solid rgba(255, 200, 0, 0.4); background: linear-gradient(180deg, rgba(255, 200, 0, 0.08), rgba(255, 200, 0, 0.02)); }
          .at-reveal-title { font-family: var(--font-display); font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: var(--warning); margin-bottom: 6px; }
          .at-reveal-warn { font-family: var(--font-mono); font-size: 13px; color: var(--warning); margin-bottom: 12px; line-height: 1.4; }
          .at-reveal-row { display: grid; grid-template-columns: 140px 1fr auto; column-gap: 10px; align-items: center; margin-bottom: 8px; }
          .at-reveal-row label { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .at-reveal-full { font-family: var(--font-mono); font-size: 13px; color: var(--primary); padding: 5px 10px; background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; }
          .at-reveal-secret { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(255, 200, 0, 0.04); color: var(--warning); border: 1px solid rgba(255, 200, 0, 0.4); border-radius: 3px; outline: none; }
          .at-copy-btn { padding: 5px 12px; font-family: var(--font-mono); font-size: 13.5px; background: transparent; color: var(--warning); border: 1px solid currentColor; border-radius: 2px; cursor: pointer; }
          .at-copy-btn:hover { background: rgba(255, 200, 0, 0.1); }
          .at-reveal-actions { display: flex; justify-content: flex-end; margin-top: 8px; }
          .at-body { flex: 1; overflow: auto; padding: 6px 0; }
          .at-empty { padding: 32px 18px; text-align: center; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px; font-style: italic; }
          .at-error { padding: 8px 14px; margin: 6px 18px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .at-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 13px; }
          .at-table thead { position: sticky; top: 0; background: rgba(13, 19, 32, 0.95); }
          .at-table th { padding: 6px 14px; text-align: left; font-family: var(--font-display); font-size: 13.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid rgba(0,240,255,.16); }
          .at-table td { padding: 4px 14px; border-bottom: 1px solid rgba(0,240,255,.05); white-space: nowrap; color: var(--text-primary); }
          .at-mono { font-family: var(--font-mono); }
          .at-tok { color: var(--primary); }
          .at-bad { color: var(--danger, #ff4d6d); }
          .at-warn { color: var(--warning); }
          .at-comment { max-width: 320px; overflow: hidden; text-overflow: ellipsis; }
          .at-bool { display: inline-block; padding: 1px 8px; border-radius: 999px; border: 1px solid currentColor; font-size: 13.5px; font-family: var(--font-mono); }
          .at-bool.on { color: var(--success); }
          .at-bool.off { color: var(--text-muted); }
          .at-footer { padding: 8px 18px; border-top: 1px solid rgba(0, 240, 255, 0.08); font-family: var(--font-mono); font-size: 13.5px; color: var(--text-muted); }
        `})]})}):null}const aa=/^[A-Za-z0-9][A-Za-z0-9._\-]{0,127}$/,na=/^[A-Za-z0-9][A-Za-z0-9.\-]{0,63}$/,ra=/^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}$/,sa=/^vmbr[0-9]{1,3}$/,at=/^[A-Za-z0-9][A-Za-z0-9._\-]{0,63}:[A-Za-z0-9./_\-]{1,256}$/;function oa({open:a,onClose:u,clusterId:x,defaultNode:n,onCreated:i}){const{t:r}=K();te();const[N,I]=t.useState(0),[z,P]=t.useState("qemu"),[C,D]=t.useState(n||""),[S,A]=t.useState(""),[w,R]=t.useState(""),[_,v]=t.useState(""),[k,$]=t.useState("l26"),[m,h]=t.useState([]),[p,d]=t.useState(""),[c,j]=t.useState([]),[E,y]=t.useState(""),[o,b]=t.useState([]),[U,s]=t.useState(""),[L,H]=t.useState([]),[f,l]=t.useState(""),[g,F]=t.useState("2"),[B,G]=t.useState("2048"),[O,W]=t.useState("512"),[Y,ee]=t.useState([]),[ae,Se]=t.useState(""),[de,Ee]=t.useState("20"),[pe,Ie]=t.useState("vmbr0"),[ie,Me]=t.useState(""),[je,me]=t.useState(!0),[ge,xe]=t.useState("dhcp"),[ue,Re]=t.useState(""),[we,q]=t.useState(""),[be,ke]=t.useState(""),[Fe,qe]=t.useState([]),[Ne,X]=t.useState(!1),[ce,Ce]=t.useState(null);t.useEffect(()=>{a&&(I(0),P("qemu"),D(n||""),A(""),R(""),v(""),$("l26"),d(""),y(""),s(""),l(""),F("2"),G("2048"),W("512"),Se(""),Ee("20"),Ie("vmbr0"),Me(""),me(!0),xe("dhcp"),Re(""),q(""),ke(""),Ce(null),(async()=>{try{const T=await(await fetch(`/api/clusters/${encodeURIComponent(x)}/next-vmid`,{credentials:"same-origin"})).json();T.vmid&&A(String(T.vmid))}catch{}try{const M=await fetch(`/api/clusters/${encodeURIComponent(x)}`,{credentials:"same-origin"});if(M.ok){const T=await M.json(),V=Object.keys(T.nodes||{}).map(Z=>({node:Z}));qe(V),!n&&V.length>0&&D(V[0].node)}}catch{}})())},[a,x,n]),t.useEffect(()=>{!a||!C||(async()=>{const M=async T=>{try{const V=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(C)}/storages?content=${T}`,{credentials:"same-origin"});return V.ok?((await V.json()).storages||[]).filter(Q=>Q.active!==0):[]}catch{return[]}};if(z==="qemu"){const T=await M("iso");h(T),T.length&&!p&&d(T[0].storage);const V=await M("images");ee(V),V.length&&!ae&&Se(V[0].storage)}else{const T=await M("vztmpl");b(T),T.length&&!U&&s(T[0].storage);const V=await M("rootdir");ee(V),V.length&&!ae&&Se(V[0].storage)}})()},[a,C,z]),t.useEffect(()=>{!a||!C||z!=="qemu"||!p||(async()=>{try{const M=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(C)}/storages/${encodeURIComponent(p)}/iso`,{credentials:"same-origin"});if(M.ok){const T=await M.json();j(T.content||[])}}catch{}})()},[a,x,C,z,p]),t.useEffect(()=>{!a||!C||z!=="lxc"||!U||(async()=>{try{const M=await fetch(`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(C)}/storages/${encodeURIComponent(U)}/vztmpl`,{credentials:"same-origin"});if(M.ok){const T=await M.json();H(T.content||[])}}catch{}})()},[a,x,C,z,U]);const Pe=t.useMemo(()=>{if(N===0)return!(/^\d+$/.test(S)&&+S>=100&&+S<=999999999)||!C?!1:z==="qemu"?w===""||aa.test(w):na.test(_);if(N===1)return z==="qemu"?E===""||at.test(E):at.test(f);if(N===2){const M=parseInt(g,10),T=parseInt(B,10);if(!Number.isFinite(M)||M<1||M>1024||!Number.isFinite(T)||T<16)return!1;if(z==="lxc"){const Z=parseInt(O,10);if(!Number.isFinite(Z)||Z<0)return!1}const V=parseInt(de,10);return!(!Number.isFinite(V)||V<1||V>65536||!ra.test(ae))}return N===3?!(!sa.test(pe)||ie&&!/^\d{1,4}$/.test(ie)||z==="lxc"&&(ge!=="dhcp"&&!/^[0-9.]{7,18}\/[0-9]{1,2}$/.test(ge)||ue&&!/^[0-9.]{7,18}$/.test(ue)||!we&&!be.trim())):!0},[N,z,C,S,w,_,E,f,g,B,O,de,ae,pe,ie,ge,ue,we,be]),Ze=async()=>{X(!0),Ce(null);try{let M,T;z==="qemu"?(M={vmid:+S,name:w||`vm${S}`,cores:+g,memory:+B,ostype:k,iso_volid:E||void 0,disks:[{slot:"scsi0",storage:ae,size_gb:+de}],nics:[{slot:"net0",model:"virtio",bridge:pe,vlan:ie||void 0,firewall:je}]},T=`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(C)}/qemu`):(M={vmid:+S,hostname:_,cores:+g,memory:+B,swap:+O,ostemplate:f,storage:ae,size_gb:+de,password:we||void 0,ssh_public_keys:be.trim()||void 0,nic:{bridge:pe,vlan:ie||void 0,firewall:je,ip:ge,gw:ue||void 0}},T=`/api/clusters/${encodeURIComponent(x)}/nodes/${encodeURIComponent(C)}/lxc`);const V=await fetch(T,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(M)}),Z=await V.json().catch(()=>({}));if(!V.ok||!Z.ok)throw new Error(Z.detail||Z.error||`HTTP ${V.status}`);i==null||i(+S,z,C),u()}catch(M){Ce(`${r("vmcw.create_err")}: ${M.message||M}`)}finally{X(!1)}};if(!a)return null;const Le=[r("vmcw.step.kind"),r("vmcw.step.os"),r("vmcw.step.hw"),r("vmcw.step.net"),r("vmcw.step.review")];return e.jsx("div",{className:"cw-back",onClick:()=>!Ne&&u(),children:e.jsxs("div",{className:"cw-modal",onClick:M=>M.stopPropagation(),children:[e.jsxs("div",{className:"cw-head",children:[e.jsx("div",{className:"cw-title",children:r("vmcw.title")}),e.jsx("button",{className:"cw-close",onClick:u,disabled:Ne,children:"×"})]}),e.jsx("div",{className:"cw-stepper",children:Le.map((M,T)=>e.jsxs("div",{className:`cw-step ${T===N?"active":""} ${T<N?"done":""}`,children:[e.jsx("span",{className:"cw-step-num",children:T+1}),e.jsx("span",{className:"cw-step-label",children:M})]},M))}),e.jsxs("div",{className:"cw-body",children:[ce&&e.jsx("div",{className:"cw-error",children:ce}),N===0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.kind.vm")}),e.jsx("input",{type:"radio",checked:z==="qemu",onChange:()=>P("qemu")})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.kind.lxc")}),e.jsx("input",{type:"radio",checked:z==="lxc",onChange:()=>P("lxc")})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.node")}),e.jsx(_e,{value:C,options:(Fe.length>0?Fe.map(M=>M.node):C?[C]:[]).map(M=>({value:M,label:M})),onChange:M=>D(M)})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.vmid")}),e.jsx("input",{value:S,onChange:M=>A(M.target.value),type:"number",min:100})]}),z==="qemu"?e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.name")}),e.jsx("input",{value:w,onChange:M=>R(M.target.value),placeholder:`vm${S}`})]}):e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.hostname")}),e.jsx("input",{value:_,onChange:M=>v(M.target.value),placeholder:"ct1"})]})]}),N===1&&z==="qemu"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.iso_storage")}),e.jsx(_e,{value:p,options:m.map(M=>({value:M.storage,label:M.storage})),onChange:M=>{d(M),y("")}})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.iso")}),e.jsx(_e,{value:E,options:[{value:"",label:"— none —"},...c.map(M=>({value:M.volid,label:M.volid.split("/").pop()||M.volid}))],onChange:M=>y(M)})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.ostype")}),e.jsx(_e,{value:k,options:[{value:"l26",label:"Linux (l26)"},{value:"win11",label:"Windows 11"},{value:"win10",label:"Windows 10"},{value:"win8",label:"Windows 8/2012"},{value:"other",label:"Other"}],onChange:M=>$(M)})]})]}),N===1&&z==="lxc"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.tmpl_storage")}),e.jsx(_e,{value:U,options:o.map(M=>({value:M.storage,label:M.storage})),onChange:M=>{s(M),l("")}})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.tmpl")}),e.jsx(_e,{value:f,options:[{value:"",label:"— pick —"},...L.map(M=>({value:M.volid,label:M.volid.split("/").pop()||M.volid}))],onChange:M=>l(M)})]})]}),N===2&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.cores")}),e.jsx("input",{type:"number",min:1,value:g,onChange:M=>F(M.target.value)})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.memory")}),e.jsx("input",{type:"number",min:16,value:B,onChange:M=>G(M.target.value)})]}),z==="lxc"&&e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.swap")}),e.jsx("input",{type:"number",min:0,value:O,onChange:M=>W(M.target.value)})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.disk_storage")}),e.jsx(_e,{value:ae,options:Y.map(M=>({value:M.storage,label:M.storage})),onChange:M=>Se(M)})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.disk_size")}),e.jsx("input",{type:"number",min:1,max:65536,value:de,onChange:M=>Ee(M.target.value)})]}),e.jsx("div",{className:"cw-help",children:r("vmcw.help.disk_grow_only")})]}),N===3&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.bridge")}),e.jsx("input",{value:pe,onChange:M=>Ie(M.target.value),placeholder:"vmbr0"})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.vlan")}),e.jsx("input",{value:ie,onChange:M=>Me(M.target.value),type:"number",min:0,max:4094})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.firewall")}),e.jsx("input",{type:"checkbox",checked:je,onChange:M=>me(M.target.checked)})]}),z==="lxc"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.ip")}),e.jsx("input",{value:ge,onChange:M=>xe(M.target.value),placeholder:"dhcp or 10.0.0.5/24"})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.gw")}),e.jsx("input",{value:ue,onChange:M=>Re(M.target.value),placeholder:"10.0.0.1"})]}),e.jsxs("div",{className:"cw-row",children:[e.jsx("label",{children:r("vmcw.field.password")}),e.jsx("input",{type:"password",value:we,onChange:M=>q(M.target.value)})]}),e.jsxs("div",{className:"cw-row cw-row-tall",children:[e.jsx("label",{children:r("vmcw.field.ssh_keys")}),e.jsx("textarea",{value:be,onChange:M=>ke(M.target.value),rows:3})]}),e.jsx("div",{className:"cw-help",children:r("vmcw.help.password_or_keys")})]})]}),N===4&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"cw-help",children:r("vmcw.review_intro")}),e.jsx("pre",{className:"cw-preview",children:JSON.stringify({kind:z,node:C,vmid:+S,...z==="qemu"?{name:w||`vm${S}`,ostype:k,iso:E||null,cores:+g,memory:+B,disk:`${ae}:${de}G`,net:`virtio,bridge=${pe}${ie?`,tag=${ie}`:""}${je?",firewall=1":""}`}:{hostname:_,template:f,cores:+g,memory:+B,swap:+O,rootfs:`${ae}:${de}G`,net:`bridge=${pe}${ie?`,tag=${ie}`:""}${je?",firewall=1":""},ip=${ge}${ue?`,gw=${ue}`:""}`,password:we?"••••••":void 0,ssh_keys:be?`${be.split(`
`).filter(M=>M.trim()).length} key(s)`:void 0}},null,2)})]})]}),e.jsxs("div",{className:"cw-footer",children:[e.jsx("button",{onClick:u,disabled:Ne,children:r("vmcw.cancel")}),e.jsx("div",{style:{flex:1}}),N>0&&e.jsx("button",{onClick:()=>I(M=>M-1),disabled:Ne,children:r("vmcw.prev")}),N<4&&e.jsx("button",{className:"cw-primary",disabled:!Pe,onClick:()=>I(M=>M+1),children:r("vmcw.next")}),N===4&&e.jsx("button",{className:"cw-primary",disabled:Ne,onClick:Ze,children:r(Ne?"vmcw.creating":"vmcw.create")})]}),e.jsx("style",{children:`
          .cw-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; align-items: center; justify-content: center; z-index: 10000; }
          .cw-modal { width: min(720px, 96vw); max-height: 92vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: cw-in .18s ease-out; overflow: hidden; }
          @keyframes cw-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .cw-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .cw-title { color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .cw-close { background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .cw-stepper { display: flex; gap: 0; padding: 10px 18px; border-bottom: 1px solid rgba(0,240,255,.12); background: rgba(0,240,255,.03); overflow-x: auto; }
          .cw-step { display: flex; align-items: center; gap: 6px; padding: 4px 10px; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); border-right: 1px solid rgba(0,240,255,.05); white-space: nowrap; }
          .cw-step.active { color: var(--primary); }
          .cw-step.done { color: var(--success); }
          .cw-step-num { display: inline-block; width: 18px; height: 18px; border-radius: 50%; border: 1px solid currentColor; text-align: center; line-height: 16px; font-size: 12px; }
          .cw-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .cw-row { display: grid; grid-template-columns: 160px 1fr; align-items: center; gap: 10px; margin-bottom: 8px; }
          .cw-row-tall { align-items: start; }
          .cw-row label { font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary); }
          .cw-row input, .cw-row select, .cw-row textarea { padding: 5px 10px; font-family: var(--font-mono); font-size: 13px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; outline: none; }
          .cw-row input:focus, .cw-row select:focus, .cw-row textarea:focus { border-color: var(--primary); }
          .cw-row input[type="checkbox"], .cw-row input[type="radio"] { justify-self: start; }
          .cw-help { padding: 6px 0; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
          .cw-error { padding: 8px 14px; margin-bottom: 10px; border: 1px solid var(--danger, #ff4d6d); background: rgba(255,77,109,.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 13px; border-radius: 2px; }
          .cw-preview { font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); background: rgba(0, 240, 255, 0.04); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; padding: 10px; overflow: auto; max-height: 360px; }
          .cw-footer { display: flex; gap: 8px; align-items: center; padding: 12px 18px; border-top: 1px solid rgba(0, 240, 255, 0.12); background: rgba(0, 240, 255, 0.03); }
          .cw-footer button { padding: 6px 16px; font-family: var(--font-mono); font-size: 13px; background: transparent; color: var(--text-secondary); border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 3px; cursor: pointer; }
          .cw-footer button:hover { background: rgba(0, 240, 255, 0.05); }
          .cw-footer .cw-primary { background: var(--primary); color: #001018; border-color: var(--primary); }
          .cw-footer .cw-primary:disabled { opacity: .4; cursor: not-allowed; }
          .cw-footer button:disabled { opacity: .4; cursor: not-allowed; }
        `})]})})}function nt(a){const u=parseFloat(localStorage.getItem("iowait_warning")||"5"),x=parseFloat(localStorage.getItem("iowait_critical")||"10");return a>=x?"danger":a>=u?"warning":"success"}function rt({value:a,decimals:u=0,suffix:x="",duration:n=800,className:i=""}){const[r,N]=t.useState(0),I=t.useRef(null),z=t.useRef(0),P=t.useRef(!0);return t.useEffect(()=>{const C=P.current?0:r;P.current=!1,I.current=null;const D=S=>{I.current||(I.current=S);const A=S-I.current,w=Math.min(A/n,1),R=1-Math.pow(1-w,3),_=C+(a-C)*R;N(_),w<1?z.current=requestAnimationFrame(D):N(a)};return z.current=requestAnimationFrame(D),()=>{z.current&&cancelAnimationFrame(z.current)}},[a,n]),e.jsxs("span",{className:i,children:[r.toFixed(u),x]})}function st({left:a,right:u,className:x=""}){const[n,i]=t.useState(0),[r,N]=t.useState(0),I=t.useRef(null),z=t.useRef(0),P=t.useRef(!0);return t.useEffect(()=>{const D=P.current?0:n,S=P.current?0:r;P.current=!1,I.current=null;const A=w=>{I.current||(I.current=w);const R=w-I.current,_=Math.min(R/800,1),v=1-Math.pow(1-_,3);i(Math.round(D+(a-D)*v)),N(Math.round(S+(u-S)*v)),_<1?z.current=requestAnimationFrame(A):(i(a),N(u))};return z.current=requestAnimationFrame(A),()=>{z.current&&cancelAnimationFrame(z.current)}},[a,u]),e.jsxs("span",{className:x,children:[n,"/",r]})}function ia(a){if(!a)return"N/A";const u=a.match(/pve-manager\/([^\/]+)/);return u?u[1]:a}function la(a){if(!a)return"N/A";const u=a.match(/Linux\s+(\S+)/);return u?u[1]:a}function ca({state:a,onClose:u,onShowDetails:x,onShowPerf:n,onOpenShell:i,onShowServices:r,onShowSyslog:N,onShowHardware:I,onShowNetwork:z,onShowNetInfo:P,onShowNTP:C,onConfigBackup:D,onMaintenance:S,getNodeHealth:A}){var E;const{t:w}=K(),_=((E=ze().user)==null?void 0:E.role_global)==="admin",v=t.useRef(null),[k,$]=t.useState({left:a.x,top:a.y,maxHeight:0});if(t.useLayoutEffect(()=>{if(!a.visible)return;const y=v.current;if(!y)return;const o=y.getBoundingClientRect(),b=8,U=window.innerWidth,s=window.innerHeight;let L=a.x,H=a.y,f=0;L+o.width>U-b&&(L=Math.max(b,a.x-o.width));const l=s-a.y-b,g=a.y-b,F=260;o.height<=l?H=a.y:o.height<=g?H=Math.max(b,a.y-o.height):l>=F?(H=a.y,f=l):g>=F?(H=b,f=g):(H=b,f=s-2*b),(L!==k.left||H!==k.top||f!==k.maxHeight)&&$({left:L,top:H,maxHeight:f})},[a.visible,a.x,a.y]),t.useEffect(()=>{const y=()=>u(),o=U=>{v.current&&U.target instanceof Node&&v.current.contains(U.target)||u()},b=U=>{U.key==="Escape"&&u()};return a.visible&&(document.addEventListener("click",y),document.addEventListener("scroll",o,!0),document.addEventListener("keydown",b)),()=>{document.removeEventListener("click",y),document.removeEventListener("scroll",o,!0),document.removeEventListener("keydown",b)}},[a.visible,u]),!a.visible||!a.node)return null;const m=a.node,h=m.status==="online",p=A(a.clusterId,m.node),d=p?`https://${p.host}:${p.port}/#v1:0:=node/${m.node}`:null,c=y=>{y.stopPropagation(),d&&window.open(d,"_blank","noopener,noreferrer"),u()},j=y=>{y.stopPropagation(),x(),u()};return ct.createPortal(e.jsxs("div",{ref:v,className:"node-context-menu",style:{left:k.left,top:k.top,...k.maxHeight>0?{maxHeight:k.maxHeight,overflowY:"auto"}:{}},onClick:y=>y.stopPropagation(),children:[e.jsxs("div",{className:"context-menu-header",children:[e.jsx("span",{className:`context-status ${h?"online":"offline"}`}),e.jsx("span",{className:"context-menu-name",children:m.node})]}),e.jsx("div",{className:"context-menu-divider"}),e.jsxs("button",{className:"context-menu-item",onClick:j,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),e.jsx("span",{children:w("vm.details")})]}),e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),n(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),e.jsx("polyline",{points:"14 7 21 7 21 14"})]}),e.jsx("span",{children:w("vm.perf_charts")})]}),_&&e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),i(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"4 17 10 11 4 5"}),e.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),e.jsx("span",{children:w("node.host_shell")})]}),e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),r(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{d:"M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24"})]}),e.jsx("span",{children:w("node.services")})]}),e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),N(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"9",y1:"13",x2:"15",y2:"13"}),e.jsx("line",{x1:"9",y1:"17",x2:"15",y2:"17"})]}),e.jsx("span",{children:w("node.syslog")})]}),e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),I(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"1"}),e.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"1"}),e.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),e.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]}),e.jsx("span",{children:w("nhw.button")})]}),e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),P(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),e.jsx("path",{d:"M8 21h8M12 17v4"}),e.jsx("path",{d:"M6 8h.01M10 8h.01M14 8h4"})]}),e.jsx("span",{children:w("nic.button")})]}),_&&e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),z(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M5 12h14M12 5v14"})]}),e.jsx("span",{children:w("nn.button")})]}),_&&e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),C(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 7v5l3 3"})]}),e.jsx("span",{children:w("ntp.button")})]}),_&&e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),D(),u()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("path",{d:"M7 10l5 5 5-5"}),e.jsx("path",{d:"M12 15V3"})]}),e.jsx("span",{children:w("ncb.button")})]}),_&&e.jsxs("button",{className:"context-menu-item",onClick:y=>{y.stopPropagation(),S(),u()},children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"})}),e.jsx("span",{children:w("mm.button")})]}),d&&e.jsxs("button",{className:"context-menu-item",onClick:c,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),e.jsx("polyline",{points:"15,3 21,3 21,9"}),e.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),e.jsx("span",{children:w("node.open_pve")})]}),e.jsx("div",{className:"context-menu-divider"}),e.jsxs("div",{className:"context-menu-info",children:[e.jsxs("div",{className:"info-row",children:[e.jsxs("span",{children:[w("node.status"),":"]}),e.jsx("span",{className:h?"text-success":"text-danger",children:h?w("node.online").toUpperCase():w("node.offline").toUpperCase()})]}),e.jsxs("div",{className:"info-row",children:[e.jsxs("span",{children:[w("metric.cpu"),":"]}),e.jsxs("span",{children:[m.cpu.cores," ",w("node.cores")]})]}),e.jsxs("div",{className:"info-row",children:[e.jsxs("span",{children:[w("metric.memory"),":"]}),e.jsx("span",{children:ye(m.memory.total_bytes)})]}),e.jsxs("div",{className:"info-row",children:[e.jsxs("span",{children:[w("cluster.vms_short"),":"]}),e.jsx("span",{children:m.vm_count})]}),e.jsxs("div",{className:"info-row",children:[e.jsxs("span",{children:[w("cluster.cts_short"),":"]}),e.jsx("span",{children:m.ct_count})]})]})]}),document.body)}function da({cpuUsage:a,memUsage:u,compact:x,label:n="AVG LOAD"}){const i=(a+u)/2,r=se(i),N=.3+i/100*.7,[I,z]=t.useState(0),P=t.useRef(null),C=t.useRef(0),D=t.useRef(!0);return t.useEffect(()=>{const A=D.current?0:I;D.current=!1,P.current=null;const w=R=>{P.current||(P.current=R);const _=R-P.current,v=Math.min(_/1e3,1),k=1-Math.pow(1-v,3),$=A+(i-A)*k;z($),v<1?C.current=requestAnimationFrame(w):z(i)};return C.current=requestAnimationFrame(w),()=>{C.current&&cancelAnimationFrame(C.current)}},[i]),e.jsxs("div",{className:`reactor-core ${x?"compact":""}`,children:[e.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[e.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),e.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${r})`,strokeWidth:"2",strokeDasharray:`${i*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${N*10}px var(--${r}))`,transition:"all 0.5s ease"}}),e.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),e.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${r})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${N*15}px var(--${r}))`}}),e.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${r})`,style:{textShadow:`0 0 10px var(--${r})`},children:[I.toFixed(0),"%"]}),e.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:n})]}),e.jsx("div",{className:"reactor-pulse",style:{opacity:N*.3}})]})}function pa({node:a,onClick:u,onContextMenu:x,clusterName:n,clusterId:i,timeframe:r,isPaused:N=!1}){se(a.cpu.usage_percent),se(a.memory.used_bytes/a.memory.total_bytes*100);const I=a.status==="online",z=a.cpu.usage_percent,P=a.memory.used_bytes/a.memory.total_bytes*100,C=a.cpu.iowait!==void 0?Math.min(a.cpu.iowait*5,100):0;return e.jsxs("div",{className:`node-card ${I?"":"offline"}`,onClick:u,onContextMenu:x,children:[e.jsxs("div",{className:"node-header",children:[e.jsx("span",{className:`node-status ${I?"online":"offline"}`}),e.jsx("span",{className:"node-name",children:a.node}),n&&e.jsx("span",{className:"node-cluster-tag",children:n})]}),e.jsx("div",{className:"node-ecg-container",children:r==="live"?e.jsx(ht,{cpu:z,memory:P,diskIO:C,isOnline:I,isPaused:N}):e.jsx(vt,{clusterId:i,node:a.node,timeframe:r,isOnline:I,fallback:{cpu:z,memory:P,diskIO:C}})}),e.jsxs("div",{className:"node-info",children:[e.jsxs("span",{className:"node-info-item",children:[a.vm_count," VMs | ",a.ct_count," CTs"]}),e.jsx("span",{className:"node-info-item",children:ot(a.uptime)})]}),e.jsx("div",{className:"corner-decoration top-left"}),e.jsx("div",{className:"corner-decoration top-right"}),e.jsx("div",{className:"corner-decoration bottom-left"}),e.jsx("div",{className:"corner-decoration bottom-right"})]})}function ma({node:a,storages:u,onClose:x}){var h;const{t:n,language:i}=K(),r=ze(),N=te(),I=((h=r.user)==null?void 0:h.role_global)==="admin",z=a.status==="online",P=a.cpu.usage_percent,C=a.memory.used_bytes/a.memory.total_bytes*100,D=a.disk.used_bytes/a.disk.total_bytes*100,S=a.cluster_id||"",[A,w]=t.useState(null),[R,_]=t.useState(null),[v,k]=t.useState(null),[$,m]=t.useState(!1);return t.useEffect(()=>{if(!S)return;let p=!0;const d=encodeURIComponent(S),c=encodeURIComponent(a.node);return(async()=>{try{const j=await fetch(`/api/clusters/${d}/nodes/${c}/updates`,{credentials:"same-origin"});j.ok&&p&&w((await j.json()).count??0)}catch{}})(),(async()=>{try{const j=await fetch(`/api/clusters/${d}/nodes/${c}/subscription`,{credentials:"same-origin"});j.ok&&p&&_((await j.json()).subscription||{})}catch{}})(),(async()=>{try{const j=await fetch(`/api/clusters/${d}/nodes/${c}/certificates`,{credentials:"same-origin"});if(j.ok&&p){const E=(await j.json()).certificates||[];let y=null;for(const o of E){const b=o.notafter||o["notafter-formatted"];if(!b)continue;const U=typeof b=="number"?b:Date.parse(String(b))/1e3;!U||isNaN(U)||(!y||U<y.ts)&&(y={ts:U,subj:o.subject||o.filename||"cert"})}if(y){const o=Math.floor((y.ts-Date.now()/1e3)/86400);k({days:o,subj:y.subj})}}}catch{}})(),()=>{p=!1}},[S,a.node]),e.jsxs("div",{className:"node-detail-overlay",onClick:x,children:[e.jsx(kt,{open:$,clusterId:S,node:a.node,onClose:()=>m(!1)}),e.jsxs("div",{className:"node-detail-panel",onClick:p=>p.stopPropagation(),children:[e.jsxs("div",{className:"detail-header",children:[e.jsxs("div",{className:"detail-title",children:[e.jsx("span",{className:`detail-status ${z?"online":"offline"}`}),e.jsx("h2",{children:a.node}),e.jsx("span",{className:"detail-tag",children:z?n("node.online").toUpperCase():n("node.offline").toUpperCase()})]}),e.jsx("button",{className:"detail-close",onClick:x,children:"×"})]}),e.jsxs("div",{className:"detail-body",children:[e.jsxs("div",{className:"detail-section",children:[e.jsx("h3",{className:"section-title",children:n("node.system_info")}),e.jsxs("div",{className:"info-grid",children:[e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-label",children:n("node.kernel")}),e.jsx("span",{className:"info-value",children:la(a.kernel_version)})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-label",children:n("node.pve_version")}),e.jsx("span",{className:"info-value",children:ia(a.pve_version)})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-label",children:n("node.uptime")}),e.jsx("span",{className:"info-value",children:ot(a.uptime)})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-label",children:n("node.workloads")}),e.jsxs("span",{className:"info-value",children:[a.vm_count," VMs, ",a.ct_count," CTs"]})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-label",children:n("node.subscription")}),e.jsxs("span",{className:"info-value",children:[R===null?"…":R.status==="active"?e.jsx("span",{className:"ndp-badge ok",children:R.level||"Active"}):R.status?e.jsx("span",{className:"ndp-badge warn",children:R.status}):e.jsx("span",{className:"ndp-badge muted",children:n("node.no_sub")}),I&&e.jsx("button",{className:"ndp-act",style:{marginLeft:6},onClick:async()=>{const p=await N.prompt(i==="zh-TW"?"輸入訂閱碼（PVE-...）以註冊；留空 + recheck 重新查驗；輸入 DELETE 清除：":"Subscription key (PVE-...) to register; empty = re-check upstream; type DELETE to remove:",{title:"Subscription",defaultValue:""});if(p!==null)try{if(p.trim().toUpperCase()==="DELETE"){const d=await fetch(`/api/clusters/${encodeURIComponent(S)}/nodes/${encodeURIComponent(a.node)}/subscription`,{method:"DELETE",credentials:"same-origin"}),c=await d.json().catch(()=>({}));if(!d.ok||!c.ok)throw new Error(c.detail||c.error||`HTTP ${d.status}`)}else{const d={};p.trim()&&(d.key=p.trim());const c=await fetch(`/api/clusters/${encodeURIComponent(S)}/nodes/${encodeURIComponent(a.node)}/subscription`,{method:"PUT",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}),j=await c.json().catch(()=>({}));if(!c.ok||!j.ok)throw new Error(j.detail||j.error||`HTTP ${c.status}`)}await N.alert(i==="zh-TW"?"訂閱動作已送出，請重新整理。":"Subscription action submitted, refresh to see new state.")}catch(d){await N.alert(`Failed: ${d.message||d}`)}},children:i==="zh-TW"?"管理":"Manage"})]})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-label",children:n("node.updates_pending")}),e.jsx("span",{className:"info-value",children:A===null?"…":A===0?e.jsx("span",{className:"ndp-badge ok",onClick:()=>m(!0),style:{cursor:"pointer"},children:"0"}):e.jsx("span",{className:`ndp-badge ${A>=50?"warn":"info"}`,onClick:()=>m(!0),style:{cursor:"pointer"},title:n("node.click_to_manage"),children:A})})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-label",children:n("node.cert_expires")}),e.jsxs("span",{className:"info-value",children:[v===null?"…":v.days<0?e.jsx("span",{className:"ndp-badge crit",title:v.subj,children:i==="zh-TW"?`已過期 ${Math.abs(v.days)} 天`:`expired ${Math.abs(v.days)}d ago`}):v.days<30?e.jsx("span",{className:"ndp-badge warn",title:v.subj,children:i==="zh-TW"?`${v.days} 天`:`${v.days}d`}):e.jsx("span",{className:"ndp-badge ok",title:v.subj,children:i==="zh-TW"?`${v.days} 天`:`${v.days}d`}),I&&v!==null&&e.jsx("button",{className:"ndp-act",style:{marginLeft:6},onClick:async()=>{if(await N.confirm(`Trigger ACME renewal for ${a.node}? Requires ACME-managed cert; otherwise PVE will reject.`,{title:"ACME renew?"}))try{const d=await fetch(`/api/clusters/${encodeURIComponent(S)}/nodes/${encodeURIComponent(a.node)}/acme/cert`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({force:!1})}),c=await d.json().catch(()=>({}));if(!d.ok||!c.ok)throw new Error(c.detail||c.error||`HTTP ${d.status}`);await N.alert(`ACME task submitted: ${c.upid||"(no upid)"}`)}catch(d){await N.alert(`Renew failed: ${d.message||d}`)}},children:i==="zh-TW"?"立即更新":"Renew"})]})]})]})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h3",{className:"section-title",children:n("node.resource_usage")}),e.jsxs("div",{className:"resource-bars",children:[e.jsxs("div",{className:"resource-bar-item",children:[e.jsxs("div",{className:"resource-header",children:[e.jsx("span",{className:"resource-label",children:n("metric.cpu")}),e.jsx("span",{className:`resource-value text-${se(P)}`,children:Ae(P,1)})]}),e.jsx("div",{className:"resource-track",children:e.jsx("div",{className:`resource-fill ${se(P)}`,style:{width:`${P}%`}})}),e.jsxs("span",{className:"resource-detail",children:[a.cpu.cores," ",n("node.cores")]})]}),a.cpu.iowait!==void 0&&a.cpu.iowait>0&&e.jsxs("div",{className:"resource-bar-item",children:[e.jsxs("div",{className:"resource-header",children:[e.jsx("span",{className:"resource-label",children:n("node.io_wait")}),e.jsx("span",{className:`resource-value text-${nt(a.cpu.iowait)}`,children:Ae(a.cpu.iowait,1)})]}),e.jsx("div",{className:"resource-track",children:e.jsx("div",{className:`resource-fill ${nt(a.cpu.iowait)}`,style:{width:`${Math.min(a.cpu.iowait*5,100)}%`}})}),e.jsx("span",{className:"resource-detail",children:n("node.io_wait_desc")})]}),e.jsxs("div",{className:"resource-bar-item",children:[e.jsxs("div",{className:"resource-header",children:[e.jsx("span",{className:"resource-label",children:n("metric.memory")}),e.jsx("span",{className:`resource-value text-${se(C)}`,children:Ae(C,1)})]}),e.jsx("div",{className:"resource-track",children:e.jsx("div",{className:`resource-fill ${se(C)}`,style:{width:`${C}%`}})}),e.jsxs("span",{className:"resource-detail",children:[ye(a.memory.used_bytes)," / ",ye(a.memory.total_bytes)]})]}),e.jsxs("div",{className:"resource-bar-item",children:[e.jsxs("div",{className:"resource-header",children:[e.jsx("span",{className:"resource-label",children:n("node.root_disk")}),e.jsx("span",{className:`resource-value text-${se(D)}`,children:Ae(D,1)})]}),e.jsx("div",{className:"resource-track",children:e.jsx("div",{className:`resource-fill ${se(D)}`,style:{width:`${D}%`}})}),e.jsxs("span",{className:"resource-detail",children:[ye(a.disk.used_bytes)," / ",ye(a.disk.total_bytes)]})]})]})]}),e.jsxs("div",{className:"detail-section",children:[e.jsx("h3",{className:"section-title",children:n("node.network_io")}),e.jsxs("div",{className:"network-stats",children:[e.jsxs("div",{className:"net-stat",children:[e.jsxs("span",{className:"net-direction",children:["↓ ",n("metric.rx")]}),e.jsxs("span",{className:"net-value",children:[ye(a.network.rx_bytes_sec),"/s"]})]}),e.jsxs("div",{className:"net-stat",children:[e.jsxs("span",{className:"net-direction",children:["↑ ",n("metric.tx")]}),e.jsxs("span",{className:"net-value",children:[ye(a.network.tx_bytes_sec),"/s"]})]})]})]}),e.jsxs("div",{className:"detail-section",children:[e.jsxs("h3",{className:"section-title",children:[n("node.storage")," (",u.length,")"]}),u.length>0?e.jsx("div",{className:"storage-list",children:u.map(p=>{const d=p.disk.used_bytes/p.disk.total_bytes*100;return e.jsxs("div",{className:`storage-item ${p.shared?"shared":"local"}`,children:[e.jsxs("div",{className:"storage-header",children:[e.jsx("span",{className:"storage-name",children:p.storage}),e.jsx("span",{className:"storage-type",children:p.type}),p.shared&&e.jsx("span",{className:"storage-shared-badge",children:n("node.shared")})]}),e.jsx("div",{className:"storage-bar",children:e.jsx("div",{className:`storage-fill ${se(d)}`,style:{width:`${d}%`}})}),e.jsxs("div",{className:"storage-info",children:[e.jsxs("span",{children:[ye(p.disk.used_bytes)," / ",ye(p.disk.total_bytes)]}),e.jsx("span",{className:`text-${se(d)}`,children:Ae(d,1)})]}),e.jsx("div",{className:"storage-content-labels",children:[...p.content].sort().map(c=>e.jsx("span",{className:"content-label",children:c},c))})]},p.storage)})}):e.jsx("div",{className:"no-storage",children:n("node.no_storage")})]})]}),e.jsx("div",{className:"corner-decoration top-left"}),e.jsx("div",{className:"corner-decoration top-right"}),e.jsx("div",{className:"corner-decoration bottom-left"}),e.jsx("div",{className:"corner-decoration bottom-right"})]})]})}function va({cluster:a,clusters:u,onSelectVM:x,onNavigateToVMMatrix:n,isPaused:i=!1}){var Le,M;const{t:r,language:N}=K(),I=ze(),z=te(),[P,C]=t.useState(null),[D,S]=t.useState(null),[A,w]=t.useState(null),[R,_]=t.useState(null),[v,k]=t.useState(null),[$,m]=t.useState(null),[h,p]=t.useState(null),[d,c]=t.useState(null),[j,E]=t.useState(null),[y,o]=t.useState(()=>{try{const T=localStorage.getItem("jtp.nodes.timeframe.v2");if(T==="live"||T==="hour"||T==="day"||T==="week"||T==="month"||T==="year")return T}catch{}return"live"});t.useEffect(()=>{try{localStorage.setItem("jtp.nodes.timeframe.v2",y)}catch{}},[y]);const[b,U]=t.useState(null),[s,L]=t.useState(null),[H,f]=t.useState(null),[l,g]=t.useState(null),[F,B]=t.useState(null),[G,O]=t.useState(null),[W,Y]=t.useState(null),[ee,ae]=t.useState(null),[Se,de]=t.useState(null),[Ee,pe]=t.useState(null),[Ie,ie]=t.useState(null),[Me,je]=t.useState(null),[me,ge]=t.useState(null),xe=((Le=I.user)==null?void 0:Le.role_global)==="admin",ue=xe||((M=I.user)==null?void 0:M.role_global)==="operator",[Re,we]=t.useState(null),[q,be]=t.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),ke=!a&&u&&Object.keys(u).length>0,Fe=t.useCallback((T,V)=>{var Z;return a&&a.client_health?a.client_health[V]||null:u&&((Z=u[T])!=null&&Z.client_health)&&u[T].client_health[V]||null},[a,u]),qe=t.useCallback((T,V,Z)=>{T.preventDefault(),T.stopPropagation();const Q=Math.min(T.clientX,window.innerWidth-250),ve=Math.min(T.clientY,window.innerHeight-280);be({visible:!0,x:Q,y:ve,node:V,clusterId:Z})},[]),Ne=t.useCallback(()=>{be(T=>({...T,visible:!1}))},[]),X=t.useMemo(()=>{var Z,Q,ve,Oe,Qe;const T=[];if(ke)Object.entries(u).forEach(([ne,le])=>{var he,re,J,Be,He;const fe=Object.values(le.nodes);if(fe.length>0){const it=fe.reduce((We,Ue)=>We+Ue.cpu.usage_percent,0)/fe.length,lt=fe.reduce((We,Ue)=>Ue.memory.total_bytes===0?We:We+Ue.memory.used_bytes/Ue.memory.total_bytes*100,0)/fe.length;T.push({clusterId:ne,clusterName:le.name||ne,clusterNodes:fe,isStandalone:((he=le.summary)==null?void 0:he.is_standalone)||!1,avgCpu:it,avgMem:lt,vmsRunning:((re=le.summary)==null?void 0:re.vms_running)||0,ctsRunning:((J=le.summary)==null?void 0:J.cts_running)||0,vmCount:((Be=le.summary)==null?void 0:Be.vm_count)||0,ctCount:((He=le.summary)==null?void 0:He.ct_count)||0})}});else if(a){const ne=Object.values(a.nodes),le=ne.length>0?ne.reduce((he,re)=>he+re.cpu.usage_percent,0)/ne.length:0,fe=ne.length>0?ne.reduce((he,re)=>re.memory.total_bytes===0?he:he+re.memory.used_bytes/re.memory.total_bytes*100,0)/ne.length:0;T.push({clusterId:a.id,clusterName:a.name||a.id,clusterNodes:ne,isStandalone:((Z=a.summary)==null?void 0:Z.is_standalone)||!1,avgCpu:le,avgMem:fe,vmsRunning:((Q=a.summary)==null?void 0:Q.vms_running)||0,ctsRunning:((ve=a.summary)==null?void 0:ve.cts_running)||0,vmCount:((Oe=a.summary)==null?void 0:Oe.vm_count)||0,ctCount:((Qe=a.summary)==null?void 0:Qe.ct_count)||0})}const V=T.filter(ne=>ne.isStandalone);if(V.length>1){const ne=T.filter(J=>!J.isStandalone),le=V.flatMap(J=>J.clusterNodes),fe=V.flatMap(J=>J.clusterNodes.map(()=>J.clusterId)),he=le.length||1,re=J=>V.reduce((Be,He)=>Be+J(He),0);return ne.push({clusterId:"__standalone__",clusterName:"Standalone",clusterNodes:le,nodeCids:fe,isStandalone:!0,avgCpu:re(J=>J.avgCpu*J.clusterNodes.length)/he,avgMem:re(J=>J.avgMem*J.clusterNodes.length)/he,vmsRunning:re(J=>J.vmsRunning),ctsRunning:re(J=>J.ctsRunning),vmCount:re(J=>J.vmCount),ctCount:re(J=>J.ctCount)}),ne}return T},[a,u,ke]),ce=X.flatMap(T=>T.clusterNodes);t.useMemo(()=>ce.length===0?0:ce.reduce((T,V)=>T+V.cpu.usage_percent,0)/ce.length,[ce]),t.useMemo(()=>ce.length===0?0:ce.reduce((T,V)=>V.memory.total_bytes===0?T:T+V.memory.used_bytes/V.memory.total_bytes*100,0)/ce.length,[ce]);let Ce=null,Pe=[];if(P){const[T,V]=P.split("/");if(ke&&u){const Z=u[T];Z&&(Ce=Z.nodes[V]||null,Pe=Object.values(Z.storages).filter(Q=>Q.node===V))}else a&&(Ce=a.nodes[V]||null,Pe=Object.values(a.storages).filter(Z=>Z.node===V))}if(!a&&!ke)return e.jsx("div",{className:"cluster-core empty",children:e.jsxs("div",{className:"empty-message",children:[e.jsx("span",{className:"loading-spinner"}),e.jsx("span",{children:r("cluster.select")})]})});const Ze=ke?r("cluster.clusters_count",{n:Object.keys(u).length}):(a==null?void 0:a.name)||(a==null?void 0:a.id)||r("cluster.nodes");return e.jsxs("div",{className:"cluster-core",children:[e.jsx("div",{className:"grid-floor"}),e.jsxs("div",{className:"core-header",children:[e.jsxs("h1",{className:"core-title font-display",children:[e.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),e.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),e.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),e.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),e.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),Ze]}),X.length===1&&e.jsxs("div",{className:"cc-ops-bar",children:[e.jsxs("button",{className:"cc-pools-btn",onClick:()=>f(X[0].clusterId),title:r("pools.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"6",cy:"6",r:"2"}),e.jsx("circle",{cx:"6",cy:"18",r:"2"}),e.jsx("circle",{cx:"18",cy:"6",r:"2"}),e.jsx("circle",{cx:"18",cy:"18",r:"2"}),e.jsx("line",{x1:"8",y1:"6",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"18",x2:"16",y2:"18"}),e.jsx("line",{x1:"6",y1:"8",x2:"6",y2:"16"}),e.jsx("line",{x1:"18",y1:"8",x2:"18",y2:"16"})]}),e.jsx("span",{children:r("pools.button")})]}),e.jsxs("button",{className:"cc-pools-btn",onClick:()=>B(X[0].clusterId),title:r("ha.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),e.jsx("path",{d:"M2 17l10 5 10-5"}),e.jsx("path",{d:"M2 12l10 5 10-5"})]}),e.jsx("span",{children:r("ha.button")})]}),e.jsxs("button",{className:"cc-pools-btn",onClick:()=>O(X[0].clusterId),title:r("repl.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23 4 23 10 17 10"}),e.jsx("polyline",{points:"1 20 1 14 7 14"}),e.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),e.jsx("span",{children:r("repl.button")})]}),e.jsxs("button",{className:"cc-pools-btn",onClick:()=>g(X[0].clusterId),title:r("fw.title_cluster"),children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"})}),e.jsx("span",{children:r("fw.button")})]}),e.jsxs("button",{className:"cc-pools-btn",onClick:()=>Y({id:X[0].clusterId,name:X[0].clusterName}),title:r("notes.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]}),e.jsx("span",{children:r("notes.button")})]}),xe&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>pe(X[0].clusterId),title:r("fwo.title"),children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"})}),e.jsx("span",{children:r("fwo.button")})]}),xe&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>{var Z,Q;const T=X[0],V=((Q=(Z=T==null?void 0:T.clusterNodes)==null?void 0:Z[0])==null?void 0:Q.node)||"";ge({id:T.clusterId,node:V})},title:r("ca.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),e.jsx("span",{children:r("ca.button")})]}),xe&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>je(X[0].clusterId),title:r("sta.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),e.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),e.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),e.jsx("span",{children:r("sta.button")})]}),xe&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>ie(X[0].clusterId),title:r("sdn.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"2",y1:"12",x2:"22",y2:"12"}),e.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),e.jsx("span",{children:r("sdn.button")})]}),xe&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>U(X[0].clusterId),title:r("pa.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"9",cy:"7",r:"4"}),e.jsx("path",{d:"M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"})]}),e.jsx("span",{children:r("pa.button")})]}),xe&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>ae(X[0].clusterId),title:r("apitok.title"),children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"})}),e.jsx("span",{children:r("apitok.button")})]}),ue&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>L(X[0].clusterId),title:r("lk.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),e.jsx("span",{children:r("lk.button")})]}),ue&&e.jsxs("button",{className:"cc-pools-btn",onClick:()=>de(X[0].clusterId),title:r("vmcw.title"),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]}),e.jsx("span",{children:r("vmcw.btn")})]})]})]}),e.jsx(Nt,{open:H!==null,clusterId:H||"",onClose:()=>f(null)}),e.jsx(mt,{open:F!==null,clusterId:F||"",onClose:()=>B(null)}),e.jsx(xt,{open:G!==null,clusterId:G||"",onClose:()=>O(null)}),e.jsx(pt,{open:l!==null,clusterId:l||"",scope:"cluster",onClose:()=>g(null)}),e.jsx(Ct,{open:W!==null,clusterId:(W==null?void 0:W.id)||"",clusterName:W==null?void 0:W.name,onClose:()=>Y(null)}),e.jsx(ta,{open:ee!==null,clusterId:ee||"",onClose:()=>ae(null)}),e.jsx(oa,{open:Se!==null,clusterId:Se||"",onClose:()=>de(null)}),e.jsx(Bt,{open:Ee!==null,clusterId:Ee||"",onClose:()=>pe(null)}),e.jsx(Zt,{open:Ie!==null,clusterId:Ie||"",onClose:()=>ie(null)}),e.jsx(Jt,{open:Me!==null,clusterId:Me||"",onClose:()=>je(null)}),e.jsx(Kt,{open:me!==null,clusterId:(me==null?void 0:me.id)||"",cephNode:(me==null?void 0:me.node)||"",onClose:()=>ge(null)}),e.jsxs("div",{className:"nodes-toolbar",children:[e.jsx("span",{className:"nodes-toolbar-label",children:r("nodes.tf.label")}),e.jsx("div",{className:"nodes-toolbar-tabs",children:["live","hour","day","week","month","year"].map(T=>e.jsx("button",{className:`nodes-toolbar-tab ${y===T?"on":""}`,onClick:()=>o(T),children:r(`nodes.tf.${T}`)},T))})]}),e.jsx("div",{className:"cluster-sections",children:X.map(T=>e.jsxs("div",{className:"cluster-section",children:[e.jsxs("div",{className:`cluster-section-header ${n&&T.clusterId!=="__standalone__"?"clickable":""}`,onClick:()=>{T.clusterId!=="__standalone__"&&(n==null||n(T.clusterId))},title:n&&T.clusterId!=="__standalone__"?r("cluster.view_vms_in",{name:T.clusterName}):void 0,children:[e.jsxs("div",{className:"section-title-group",children:[e.jsx("span",{className:"cluster-section-name",children:T.clusterId==="__standalone__"?r("dashboard.standalone"):T.clusterName}),T.isStandalone&&T.clusterId!=="__standalone__"&&e.jsx("span",{className:"standalone-tag",children:r("dashboard.standalone")}),n&&T.clusterId!=="__standalone__"&&e.jsx("span",{className:"nav-arrow",children:"→"})]}),e.jsxs("span",{className:"cluster-section-count",children:[T.clusterNodes.filter(V=>V.status==="online").length,"/",T.clusterNodes.length," ",r("cluster.nodes")]})]}),e.jsxs("div",{className:"cluster-section-content",children:[e.jsxs("div",{className:"section-statsbar",children:[e.jsx("div",{className:"statsbar-reactor",children:e.jsx(da,{cpuUsage:T.avgCpu,memUsage:T.avgMem,compact:!0,label:r("node.avg_load")})}),e.jsxs("div",{className:"mini-telemetry",children:[e.jsxs("div",{className:"mini-chart",children:[e.jsx("span",{className:"mini-label",children:"CPU"}),e.jsx("div",{className:"mini-bar",children:e.jsx("div",{className:`mini-fill ${se(T.avgCpu)}`,style:{width:`${T.avgCpu}%`}})}),e.jsx(rt,{value:T.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${se(T.avgCpu)}`})]}),e.jsxs("div",{className:"mini-chart",children:[e.jsx("span",{className:"mini-label",children:"MEM"}),e.jsx("div",{className:"mini-bar",children:e.jsx("div",{className:`mini-fill ${se(T.avgMem)}`,style:{width:`${T.avgMem}%`}})}),e.jsx(rt,{value:T.avgMem,decimals:0,suffix:"%",className:`mini-value text-${se(T.avgMem)}`})]})]}),e.jsxs("div",{className:"mini-stats",children:[e.jsxs("div",{className:"mini-stat",children:[e.jsx(st,{left:T.vmsRunning,right:T.vmCount,className:"mini-stat-value"}),e.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),e.jsxs("div",{className:"mini-stat",children:[e.jsx(st,{left:T.ctsRunning,right:T.ctCount,className:"mini-stat-value"}),e.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]}),e.jsxs("div",{className:"section-nodes",children:[e.jsx("div",{className:"nodes-grid",children:T.clusterNodes.map((V,Z)=>{var ve;const Q=((ve=T.nodeCids)==null?void 0:ve[Z])??T.clusterId;return e.jsx(pa,{node:V,onClick:()=>C(`${Q}/${V.node}`),onContextMenu:Oe=>qe(Oe,V,Q),clusterId:Q,timeframe:y,isPaused:i},`${Q}-${V.node}`)})}),e.jsxs("div",{className:"ecg-legend",children:[e.jsxs("span",{className:"ecg-legend-item",children:[e.jsx("span",{className:"ecg-legend-line cpu"}),e.jsx("span",{children:r("metric.cpu")})]}),e.jsxs("span",{className:"ecg-legend-item",children:[e.jsx("span",{className:"ecg-legend-line mem"}),e.jsx("span",{children:r("metric.memory")})]}),e.jsxs("span",{className:"ecg-legend-item",children:[e.jsx("span",{className:"ecg-legend-line io"}),e.jsx("span",{children:r("node.io_wait")})]})]})]})]})]},T.clusterId))}),e.jsx("div",{className:"core-footer",children:e.jsxs("button",{className:"btn-view-vms",onClick:x,children:[r("cluster.view_all_vms")," →"]})}),Ce&&e.jsx(ma,{node:Ce,storages:Pe,onClose:()=>C(null)}),e.jsx(ca,{state:q,onClose:Ne,onShowDetails:()=>{q.node&&C(`${q.clusterId}/${q.node.node}`)},onShowPerf:()=>{q.node&&S({clusterId:q.clusterId,node:q.node.node})},onShowServices:()=>{q.node&&w({clusterId:q.clusterId,node:q.node.node})},onShowSyslog:()=>{q.node&&_({clusterId:q.clusterId,node:q.node.node})},onShowHardware:()=>{q.node&&k({clusterId:q.clusterId,node:q.node.node})},onShowNetwork:()=>{q.node&&m({clusterId:q.clusterId,node:q.node.node})},onShowNTP:()=>{q.node&&p({clusterId:q.clusterId,node:q.node.node})},onConfigBackup:()=>{q.node&&we({clusterId:q.clusterId,node:q.node.node})},onShowNetInfo:()=>{q.node&&c({clusterId:q.clusterId,node:q.node.node})},onMaintenance:()=>{if(!q.node)return;const T=(u==null?void 0:u[q.clusterId])??((a==null?void 0:a.id)===q.clusterId?a:void 0),V=T?Object.keys(T.nodes).filter(Z=>Z!==q.node.node):[];E({clusterId:q.clusterId,node:q.node.node,candidates:V})},onOpenShell:async()=>{if(!q.node)return;const T=q.clusterId,V=q.node.node;try{const Z=await fetch("/api/console/host/prepare",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:T,node:V})}),Q=await Z.json().catch(()=>({}));if(!Z.ok){await z.alert(Q.message||Q.error||"HTTP "+Z.status);return}const ve=`/console-host/${encodeURIComponent(T)}/${encodeURIComponent(V)}?ct=${encodeURIComponent(Q.console_token)}&lang=${encodeURIComponent(N)}`;window.open(ve,"_blank","noopener,noreferrer")}catch(Z){await z.alert((Z==null?void 0:Z.message)||String(Z))}},getNodeHealth:Fe}),e.jsx(dt,{open:D!==null,clusterId:(D==null?void 0:D.clusterId)||"",node:(D==null?void 0:D.node)||"",kind:"node",title:D?D.node:"",onClose:()=>S(null)}),e.jsx(Rt,{open:v!==null,clusterId:(v==null?void 0:v.clusterId)||"",node:(v==null?void 0:v.node)||"",onClose:()=>k(null)}),e.jsx(Et,{open:$!==null,clusterId:($==null?void 0:$.clusterId)||"",node:($==null?void 0:$.node)||"",onClose:()=>m(null)}),Re&&e.jsx(wt,{clusterId:Re.clusterId,node:Re.node,onClose:()=>we(null)}),e.jsx(Mt,{open:h!==null,clusterId:(h==null?void 0:h.clusterId)||"",node:(h==null?void 0:h.node)||"",onClose:()=>p(null)}),e.jsx(Pt,{open:d!==null,clusterId:(d==null?void 0:d.clusterId)||"",node:(d==null?void 0:d.node)||"",onClose:()=>c(null)}),e.jsx(Ut,{open:j!==null,clusterId:(j==null?void 0:j.clusterId)||"",node:(j==null?void 0:j.node)||"",candidates:(j==null?void 0:j.candidates)||[],onClose:()=>E(null)}),e.jsx(Lt,{open:b!==null,clusterId:b||"",onClose:()=>U(null)}),e.jsx(Ot,{open:s!==null,clusterId:s||"",onClose:()=>L(null)}),e.jsx(zt,{open:A!==null,clusterId:(A==null?void 0:A.clusterId)||"",node:(A==null?void 0:A.node)||"",onClose:()=>w(null),onShowLogs:T=>{A&&_({clusterId:A.clusterId,node:A.node,service:T})}}),e.jsx(St,{open:R!==null,clusterId:(R==null?void 0:R.clusterId)||"",node:(R==null?void 0:R.node)||"",initialService:R==null?void 0:R.service,onClose:()=>_(null)}),e.jsx("style",{children:`
        .cluster-core {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-lg);
        }

        .cluster-core.empty {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--text-secondary);
          font-family: var(--font-display);
          letter-spacing: 0.1em;
        }

        .core-header {
          margin-bottom: var(--spacing-xl);
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
        }
        /* Uniform grid instead of a ragged pill row — every button the
           same width, second row aligns in columns under the first.
           flex-basis:100% forces the bar onto its OWN full-width row
           below the title: as a plain child of the space-between flex
           header it collapsed to a single right-hand column. */
        .cc-ops-bar {
          flex: 1 0 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 8px;
          margin-top: 12px;
        }
        .cc-pools-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          padding: 7px 10px; border-radius: 4px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.4);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
          white-space: nowrap;
          cursor: pointer; transition: background var(--transition-fast);
        }
        .cc-pools-btn:hover { background: rgba(0, 240, 255, 0.16); }

        .core-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
          margin-bottom: var(--spacing-xs);
        }

        .core-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: nodeIconBlink 3s ease-in-out infinite;
        }

        @keyframes nodeIconBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .core-subtitle {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        /* Nodes toolbar — sparkline timeframe selector */
        .nodes-toolbar {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: var(--spacing-md);
          padding: 8px 14px;
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: 4px;
        }
        .nodes-toolbar-label {
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .nodes-toolbar-tabs { display: flex; gap: 4px; }
        .nodes-toolbar-tab {
          padding: 5px 14px;
          background: rgba(0, 240, 255, 0.04);
          color: var(--text-secondary);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 3px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all .12s;
        }
        .nodes-toolbar-tab:hover {
          color: var(--primary);
          border-color: rgba(0, 240, 255, 0.4);
        }
        .nodes-toolbar-tab.on {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0, 240, 255, 0.12);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
        }

        /* Cluster Sections */
        .cluster-sections {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .cluster-section {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .cluster-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          transition: all var(--transition-fast);
        }

        .cluster-section-header.clickable {
          cursor: pointer;
        }

        .cluster-section-header.clickable:hover {
          background: var(--bg-hover);
        }

        .cluster-section-header.clickable:hover .cluster-section-name {
          color: var(--primary);
          text-shadow: 0 0 10px var(--primary);
        }

        .cluster-section-header.clickable:hover .nav-arrow {
          transform: translateX(4px);
          opacity: 1;
        }

        .nav-arrow {
          font-size: 15px;
          color: var(--primary-dim);
          opacity: 0.5;
          transition: all var(--transition-fast);
        }

        .section-title-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .cluster-section-name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: var(--primary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .cluster-section-count {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .cluster-section-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
        }

        /* Compact stats strip — load ring + CPU/MEM bars + VM/CT counts
           in one row above the node grid. */
        .section-statsbar {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
          padding: 0 var(--spacing-sm) var(--spacing-sm);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
        }

        .statsbar-reactor {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .statsbar-reactor .reactor-core.compact {
          max-width: 92px;
          width: 92px;
        }

        .reactor-core {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reactor-core.compact {
          max-width: 160px;
        }

        .reactor-svg {
          width: 100%;
          height: 100%;
        }

        .reactor-value {
          font-family: var(--font-mono);
          font-size: 36px;
          font-weight: bold;
        }

        .reactor-core.compact .reactor-value {
          font-size: 32px;
        }

        .reactor-label {
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        .reactor-core.compact .reactor-label {
          font-size: 9px;
        }

        .reactor-pulse {
          position: absolute;
          inset: 10%;
          border: 2px solid var(--primary);
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite;
        }

        /* Section Nodes */
        .section-nodes {
          min-width: 0;
          width: 100%;
        }

        /* Section Telemetry */
        .mini-telemetry {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          flex: 1;
          min-width: 220px;
          max-width: 420px;
        }

        .mini-chart {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .mini-label {
          font-family: var(--font-mono);
          font-size: 15px;
          color: var(--text-secondary);
          width: 36px;
        }

        .mini-bar {
          flex: 1;
          height: 10px;
          background: var(--bg-primary);
          border-radius: 5px;
          overflow: hidden;
        }

        .mini-fill {
          height: 100%;
          border-radius: 5px;
          transition: width var(--transition-normal);
        }

        .mini-fill.success { background: var(--success); }
        .mini-fill.warning { background: var(--warning); }
        .mini-fill.danger { background: var(--danger); }

        .mini-value {
          font-family: var(--font-mono);
          font-size: 15px;
          width: 42px;
          text-align: right;
        }

        .mini-stats {
          display: flex;
          gap: var(--spacing-lg);
          padding-left: var(--spacing-lg);
          border-left: 1px solid var(--border);
        }

        .mini-stat {
          text-align: center;
        }

        .mini-stat-value {
          display: block;
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 600;
          color: var(--primary);
        }

        .mini-stat-label {
          font-size: 14px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        /* Footer */
        .core-footer {
          display: flex;
          justify-content: center;
          padding: var(--spacing-md) 0;
        }

        /* Legacy styles for backward compatibility */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
        }

        .section-title {
          font-size: 15px;
          color: var(--primary);
          letter-spacing: 0.15em;
        }

        .section-count {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .cluster-group-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }

        .cluster-group-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 0 0 10px var(--primary);
        }

        .standalone-tag {
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 2px 6px;
          background: rgba(191, 0, 255, 0.2);
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cluster-group-count {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .nodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--spacing-md);
        }

        /* Node card — canonical panel-card surface (gradient bg, neon-breathe,
           top accent + scan-line) so it matches the rest of the cyberpunk
           cards in the app. */
        .node-card {
          position: relative;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm);
          cursor: pointer;
          overflow: hidden;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
          animation: neon-breathe 4s ease-in-out infinite;
        }
        .node-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.55;
          pointer-events: none;
        }
        .node-card::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
        }

        .node-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary);
          box-shadow: 0 8px 32px rgba(0, 240, 255, 0.22), var(--primary-glow);
        }

        .node-card.offline {
          opacity: 0.55;
          border-color: var(--danger-dim);
          animation: none;
        }
        .node-card.offline::after {
          animation: none;
          background: linear-gradient(90deg, transparent, var(--danger, #ff4d6d), transparent);
        }

        .node-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-xs);
        }

        .node-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--danger);
        }

        .node-status.online {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .node-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .node-cluster-tag {
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 2px 6px;
          background: rgba(191, 0, 255, 0.2);
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-left: auto;
        }

        .node-metrics {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
        }

        /* ECG Monitor Container */
        .node-ecg-container {
          margin: var(--spacing-xs) 0;
        }

        .node-ecg-container .ecg-monitor-stack {
          width: 100%;
        }

        /* ECG Legend */
        .ecg-legend {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
          margin-top: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-md);
          background: rgba(10, 20, 30, 0.5);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 240, 255, 0.1);
        }

        .ecg-legend-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .ecg-legend-line {
          width: 20px;
          height: 2px;
          border-radius: 1px;
        }

        .ecg-legend-line.cpu {
          background: #00f0ff;
          box-shadow: 0 0 6px #00f0ff;
        }

        .ecg-legend-line.mem {
          background: #00ff88;
          box-shadow: 0 0 6px #00ff88;
        }

        .ecg-legend-line.io {
          background: #ffd700;
          box-shadow: 0 0 6px #ffd700;
        }

        .node-metric {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .node-metric-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          width: 28px;
        }

        .node-metric-bar {
          flex: 1;
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          overflow: hidden;
        }

        .node-metric-fill {
          height: 100%;
          border-radius: 2px;
          transition: width var(--transition-normal);
          animation: metric-bar-fill 0.8s ease-out forwards;
          transform-origin: left;
        }

        @keyframes metric-bar-fill {
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

        .node-metric-fill.success { background: var(--success); box-shadow: 0 0 6px var(--success); }
        .node-metric-fill.warning { background: var(--warning); box-shadow: 0 0 6px var(--warning); }
        .node-metric-fill.danger { background: var(--danger); box-shadow: 0 0 6px var(--danger); }

        .node-metric-value {
          font-family: var(--font-mono);
          font-size: 13px;
          min-width: 32px;
          text-align: right;
        }

        .node-info {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          padding-top: var(--spacing-xs);
        }

        /* Telemetry */
        .core-telemetry {
          padding: var(--spacing-md);
        }

        .telemetry-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .telemetry-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .telemetry-label {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          width: 36px;
          letter-spacing: 0.05em;
        }

        .telemetry-bar {
          flex: 1;
          display: flex;
          gap: 2px;
        }

        .telemetry-segment {
          flex: 1;
          height: 16px;
          background: var(--bg-primary);
          border-radius: 1px;
        }

        .telemetry-segment.filled {
          background: var(--primary);
          box-shadow: 0 0 4px var(--primary);
        }

        .telemetry-segment.filled.warning {
          background: var(--warning);
          box-shadow: 0 0 4px var(--warning);
        }

        .telemetry-segment.filled.danger {
          background: var(--danger);
          box-shadow: 0 0 4px var(--danger);
        }

        .telemetry-segment.filled.success {
          background: var(--success);
          box-shadow: 0 0 4px var(--success);
        }

        .telemetry-value {
          font-family: var(--font-mono);
          font-size: 13px;
          min-width: 48px;
          text-align: right;
        }

        .telemetry-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-sm) 0;
        }

        .telemetry-stats {
          display: flex;
          justify-content: space-around;
        }

        .telemetry-stat {
          text-align: center;
        }

        .telemetry-stat .stat-value {
          font-family: var(--font-mono);
          font-size: 20px;
          color: var(--text-primary);
          display: block;
        }

        .telemetry-stat .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .btn-view-vms {
          margin-top: var(--spacing-md);
          padding: var(--spacing-sm) var(--spacing-md);
          background: transparent;
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-sm);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-view-vms:hover {
          background: var(--primary);
          color: var(--bg-primary);
          box-shadow: var(--primary-glow);
        }

        @media (max-width: 1200px) {
          .core-layout {
            grid-template-columns: 1fr;
          }

          .core-reactor {
            max-width: 300px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .cluster-core {
            padding: var(--spacing-md);
          }

          .core-title {
            font-size: 20px;
          }
        }

        /* Node Detail Panel */
        .node-detail-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 5, 15, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .node-detail-panel {
          position: relative;
          width: 90%;
          max-width: 600px;
          max-height: 85vh;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.22);
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .node-detail-panel::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.6;
          pointer-events: none;
          z-index: 1;
        }
        .node-detail-panel::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .node-detail-panel .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }

        .node-detail-panel .detail-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .node-detail-panel .detail-title h2 {
          font-family: var(--font-display);
          font-size: 18px;
          color: var(--primary);
          letter-spacing: 0.1em;
        }

        .node-detail-panel .detail-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .node-detail-panel .detail-status.online {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .node-detail-panel .detail-status.offline {
          background: var(--danger);
          box-shadow: 0 0 8px var(--danger);
        }

        .node-detail-panel .detail-tag {
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          background: rgba(0, 255, 136, 0.1);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .node-detail-panel .detail-close {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .node-detail-panel .detail-close:hover {
          color: var(--danger-text);
        }

        .node-detail-panel .detail-body {
          padding: var(--spacing-md);
          overflow-y: auto;
          max-height: calc(85vh - 60px);
        }

        .detail-section {
          margin-bottom: var(--spacing-md);
        }

        .detail-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-xs);
          border-bottom: 1px solid var(--border);
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
        }

        .info-item {
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
        }

        .info-label {
          display: block;
          font-size: 13px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .info-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
        }

        .ndp-badge {
          display: inline-block;
          padding: 1px 8px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono);
          border: 1px solid currentColor;
        }
        .ndp-badge.ok    { color: var(--success); }
        .ndp-badge.info  { color: var(--primary); }
        .ndp-badge.warn  { color: var(--warning); }
        .ndp-badge.crit  { color: var(--danger-text); }
        .ndp-badge.muted { color: var(--text-muted); }
        /* Actionable pill (Manage / Renew) — filled accent + dark text for
           clear contrast and a button affordance, vs the outlined status
           badges it sits next to. */
        .ndp-act {
          display: inline-flex; align-items: center;
          padding: 1px 9px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono); font-weight: 700;
          letter-spacing: 0.3px;
          background: var(--primary); color: #05121b;
          border: 1px solid var(--primary); cursor: pointer;
          transition: filter 0.15s ease, box-shadow 0.15s ease;
        }
        .ndp-act:hover { filter: brightness(1.12); box-shadow: 0 0 8px var(--primary); }

        .resource-bars {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .resource-bar-item {
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
        }

        .resource-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: var(--spacing-xs);
        }

        .resource-label {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .resource-value {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
        }

        .resource-track {
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: var(--spacing-xs);
        }

        .resource-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
          animation: resource-bar-fill 0.8s ease-out forwards;
          transform-origin: left;
        }

        @keyframes resource-bar-fill {
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

        .resource-fill.success { background: var(--success); box-shadow: 0 0 8px var(--success); }
        .resource-fill.warning { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
        .resource-fill.danger { background: var(--danger); box-shadow: 0 0 8px var(--danger); }

        .resource-detail {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .network-stats {
          display: flex;
          gap: var(--spacing-md);
        }

        .net-stat {
          flex: 1;
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          text-align: center;
        }

        .net-direction {
          display: block;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .net-value {
          font-family: var(--font-mono);
          font-size: 15px;
          color: var(--primary);
        }

        .storage-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .storage-item {
          background: var(--bg-tertiary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--primary-dim);
        }

        .storage-item.shared {
          border-left-color: var(--accent);
        }

        .storage-item .storage-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
        }

        .storage-name {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .storage-type {
          font-size: 13px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .storage-shared-badge {
          font-size: 14px;
          padding: 1px 4px;
          background: rgba(191, 0, 255, 0.2);
          color: var(--accent);
          border-radius: 2px;
        }

        .storage-item .storage-bar {
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: var(--spacing-xs);
        }

        .storage-item .storage-fill {
          height: 100%;
          border-radius: 2px;
        }

        .storage-item .storage-fill.success { background: var(--success); }
        .storage-item .storage-fill.warning { background: var(--warning); }
        .storage-item .storage-fill.danger { background: var(--danger); }

        .storage-item .storage-info {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .storage-content-labels {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 6px;
        }

        .content-label {
          font-size: 10px;
          padding: 2px 6px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 3px;
          color: var(--primary);
        }

        .no-storage {
          color: var(--text-muted);
          text-align: center;
          padding: var(--spacing-md);
          font-size: 13px;
        }

        /* Node Context Menu */
        .node-context-menu {
          position: fixed;
          z-index: 1000;
          min-width: 220px;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.15);
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

        .node-context-menu .context-menu-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
        }

        .node-context-menu .context-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--danger);
        }

        .node-context-menu .context-status.online {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .node-context-menu .context-menu-name {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
        }

        .node-context-menu .context-menu-divider {
          height: 1px;
          background: var(--border);
          margin: var(--spacing-xs) 0;
        }

        .node-context-menu .context-menu-item {
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
          transition: all var(--transition-fast);
        }

        .node-context-menu .context-menu-item:hover {
          background: rgba(0, 240, 255, 0.1);
          color: var(--primary);
        }

        .node-context-menu .context-menu-item svg {
          flex-shrink: 0;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .node-context-menu .context-menu-item:hover svg {
          color: var(--primary);
        }

        .node-context-menu .context-menu-info {
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-top: var(--spacing-xs);
        }

        .node-context-menu .context-menu-info .info-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 2px 0;
        }

        .node-context-menu .context-menu-info .info-row span:first-child {
          color: var(--text-muted);
        }

        .node-context-menu .context-menu-info .info-row span:last-child {
          color: var(--text-secondary);
        }

        .text-success {
          color: var(--success);
        }

        .text-warning {
          color: var(--warning);
        }

        .text-danger {
          color: var(--danger-text);
        }

        .text-white {
          color: #ffffff;
        }
      `})]})}export{va as ClusterCore};
