import{u as ba,r as g,g as te,a as ya,b as va,h as ye,j as a,c as ge}from"./index-DeG9m4sY.js";import{V as wa,C as ka,S as Ma,B as ja,R as Na}from"./ConsolePasswordPrompt-npI1cSAA.js";import"./CyberSelect-BYmnn2HO.js";function Se(o,m,E,T,D){const re=v=>{if(!v.tasks)return null;for(const O of Object.values(v.tasks))if(O.vmid===o&&O.node===m&&O.status==="running")return O;return null};if(D&&E){const v=D[E];if(v)return re(v)}else if(T)return re(T);return null}function Je(o){if(!o)return null;const m=o.task_type.toLowerCase();return m.includes("migrate")?{label:o.target_node?`→${o.target_node}`:"MIGRATE",color:"#00f0ff"}:m.includes("start")?{label:"START",color:"#00ff88"}:m.includes("stop")||m.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:m.includes("backup")||m.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:m.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:m.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:m.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function Sa({vm:o,index:m,previousIndex:E,onClick:T,onContextMenu:D,isSelected:re,task:v}){var ie;const O=o.memory.used_bytes/o.memory.total_bytes*100,p=((ie=o.disk)==null?void 0:ie.usage_percent)||0,se=te(o.cpu.usage_percent),Pe=te(O),Ce=te(p),Re=g.useRef(null),[me,C]=g.useState(E===void 0),F=Je(v||null);g.useEffect(()=>{if(me){const Y=setTimeout(()=>C(!1),50);return()=>clearTimeout(Y)}},[me]);const w=o.name.length>10?o.name.substring(0,9)+"…":o.name,q=Math.max(o.cpu.usage_percent,O,p)>95?"critical":"warning";return a.jsxs("div",{ref:Re,className:`anomaly-item ${q} ${me?"entering":""} ${re?"selected":""} ${v?"has-task":""}`,style:{animationDelay:`${m*80}ms`,cursor:T?"pointer":"default"},title:`${o.name} (#${o.vmid})
CPU: ${ge(o.cpu.usage_percent,1)}
MEM: ${ge(O,1)}
DISK: ${ge(p,1)}${v?`
Task: ${v.task_type}`:""}`,onClick:T,onContextMenu:Y=>D==null?void 0:D(Y,o),children:[a.jsx("div",{className:"corner-bracket tl"}),a.jsx("div",{className:"corner-bracket tr"}),a.jsx("div",{className:"corner-bracket bl"}),a.jsx("div",{className:"corner-bracket br"}),a.jsxs("div",{className:"anomaly-header",children:[a.jsx("span",{className:`anomaly-indicator ${se}`}),a.jsx("span",{className:"anomaly-name",children:w}),a.jsxs("span",{className:"anomaly-vmid",children:["#",o.vmid]}),F&&a.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${F.color}30`,borderColor:F.color,color:F.color},children:F.label})]}),a.jsxs("div",{className:"anomaly-bars-row",children:[a.jsxs("div",{className:`metric-gauge ${se}`,children:[a.jsx("span",{className:"gauge-label",children:"C"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(o.cpu.usage_percent,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(o.cpu.usage_percent,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(o.cpu.usage_percent)})]}),a.jsxs("div",{className:`metric-gauge ${Pe}`,children:[a.jsx("span",{className:"gauge-label",children:"M"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(O,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(O,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(O)})]}),a.jsxs("div",{className:`metric-gauge ${Ce}`,children:[a.jsx("span",{className:"gauge-label",children:"D"}),a.jsxs("div",{className:"gauge-track",children:[a.jsx("div",{className:"gauge-segments"}),a.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(p,3)}%`}}),a.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(p,3)}%`}})]}),a.jsx("span",{className:"gauge-value",children:Math.round(p)})]})]})]})}function Ae(o){return o?{vmid:o.vm.vmid,name:o.vm.name,node:o.vm.node,type:o.vm.type}:null}function Pa({sel:o,onClose:m}){const E=g.useMemo(()=>Ae(o),[o]);return a.jsx(Ma,{open:o!==null,cluster_id:(o==null?void 0:o.clusterId)||"",vm:E,onClose:m})}function Ca({sel:o,onClose:m}){const E=g.useMemo(()=>Ae(o),[o]);return a.jsx(ja,{open:o!==null,cluster_id:(o==null?void 0:o.clusterId)||"",vm:E,onClose:m})}function _a({sel:o,onClose:m}){const E=g.useMemo(()=>Ae(o),[o]);return a.jsx(Na,{open:o!==null,cluster_id:(o==null?void 0:o.clusterId)||"",vm:E,onClose:m})}function Ra({cluster:o,clusters:m,isPaused:E=!1}){var Le;const{t:T}=ba(),D=g.useRef(null),re=g.useRef(null),[v,O]=g.useState(0),[p,se]=g.useState(null),[Pe,Ce]=g.useState(new Map),[Re,me]=g.useState(new Map),[C,F]=g.useState("grid"),[w,_e]=g.useState(0);g.useEffect(()=>{const t=setTimeout(()=>F("line"),600),e=setTimeout(()=>F("flip"),1100),n=setTimeout(()=>F("done"),3300);return()=>{clearTimeout(t),clearTimeout(e),clearTimeout(n)}},[]),g.useEffect(()=>{if(C==="grid"){_e(0);return}const t=C==="line"?1500:1200;let e,n=null;const i=w,d=h=>{n===null&&(n=h);const b=h-n,c=Math.min(b/t,1),s=1-Math.pow(1-c,3),l=i+(1-i)*s;_e(l),c<1&&(e=requestAnimationFrame(d))};return e=requestAnimationFrame(d),()=>cancelAnimationFrame(e)},[C]);const q=!o&&m&&Object.keys(m).length>0,ie=g.useMemo(()=>{if(!o&&!q)return[];const t=[];return q?Object.values(m).forEach(e=>{Object.values(e.vms).forEach(n=>{n.status==="running"&&!n.template&&t.push(n)})}):o&&Object.values(o.vms).forEach(e=>{e.status==="running"&&!e.template&&t.push(e)}),t},[o,m,q]),Y=g.useMemo(()=>ie.map((t,e)=>{var W;const n=e/ie.length*Math.PI*2,i=t.cpu.usage_percent,d=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,h=((W=t.disk)==null?void 0:W.usage_percent)||0,b=Math.max(i,d,h),c=e*.61803%1*.24,s=.26+b/100*.48+c,l=te(b),_=Se(t.vmid,t.node,t.cluster_id,o,m);return{vm:t,angle:n,distance:s,color:l,task:_}}),[ie,o,m]),fe=g.useMemo(()=>{if(!o&&!q)return[];const t=[];return q?Object.values(m).forEach(n=>{Object.values(n.vms).forEach(i=>t.push(i))}):o&&Object.values(o.vms).forEach(n=>t.push(n)),t.filter(n=>{if(n.status!=="running"||n.template)return!1;const i=n.memory.used_bytes/n.memory.total_bytes*100,d=n.disk.total_bytes>0?n.disk.used_bytes/n.disk.total_bytes*100:0;return n.cpu.usage_percent>80||i>85||d>85}).sort((n,i)=>{const d=n.memory.used_bytes/n.memory.total_bytes*100,h=i.memory.used_bytes/i.memory.total_bytes*100,b=n.disk.total_bytes>0?n.disk.used_bytes/n.disk.total_bytes*100:0,c=i.disk.total_bytes>0?i.disk.used_bytes/i.disk.total_bytes*100:0,s=Math.max(n.cpu.usage_percent,d,b);return Math.max(i.cpu.usage_percent,h,c)-s})},[o,m,q]);g.useEffect(()=>{const t=new Map;fe.forEach((e,n)=>{t.set(`${e.cluster_id}/${e.node}/${e.vmid}`,n)}),Ce(t)},[fe]);const Qe=g.useCallback(t=>{const e=D.current;if(!e)return;const n=e.getBoundingClientRect(),i=e.width/n.width,d=e.height/n.height,h=(t.clientX-n.left)*i,b=(t.clientY-n.top)*d,c=Math.min(e.width,e.height),s=e.width/2,l=e.height/2,_=c*.4;let W=null;for(const L of Y){const X=s+Math.cos(L.angle)*_*L.distance,V=l+Math.sin(L.angle)*_*L.distance,$=Math.sqrt((h-X)**2+(b-V)**2),I=15*Math.max(i,d);if($<I){W={vm:L.vm,x:t.clientX,y:t.clientY,pointX:X,pointY:V};break}}se(W)},[Y]),Ze=g.useCallback(()=>{se(null)},[]),Ee=g.useCallback(t=>{const e=D.current;if(!e)return;const n=Y.find(l=>l.vm.node===t.node&&l.vm.vmid===t.vmid);if(!n)return;const i=Math.min(e.width,e.height),d=e.width/2,h=e.height/2,b=i*.4,c=d+Math.cos(n.angle)*b*n.distance,s=h+Math.sin(n.angle)*b*n.distance;se({vm:n.vm,x:c,y:s,pointX:c,pointY:s})},[Y]),J=ya(),ea=((Le=va().user)==null?void 0:Le.role_global)??null,[S,De]=g.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),aa=g.useCallback(()=>De(t=>({...t,visible:!1})),[]),ta=g.useCallback((t,e)=>{t.preventDefault(),t.stopPropagation();const n=e.cluster_id||(o==null?void 0:o.id)||"";De({visible:!0,x:t.clientX,y:t.clientY,vm:e,clusterId:n})},[o]),na=g.useCallback((t,e)=>{var i;const n=(m==null?void 0:m[t])||((o==null?void 0:o.id)===t?o:null);return((i=n==null?void 0:n.client_health)==null?void 0:i[e])||null},[o,m]),oa=g.useCallback(async t=>{const{vm:e,action:n,clusterId:i}=t,d=e.type==="lxc";if(!((n==="stop"||n==="shutdown"||n==="reboot")&&!await J.confirm(`${n.toUpperCase()} ${e.name} (#${e.vmid})?`,{title:"Confirm",destructive:!0})))try{const b=d?await ye.ctAction(i,e.node,e.vmid,n):await ye.vmAction(i,e.node,e.vmid,n);console.info(`[radar] ${n} ${d?"ct":"vm"}/${e.vmid} → upid=${b.upid}`)}catch(b){const c=b instanceof Error?b.message:String(b);c.includes("vm_control_disabled")?await J.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await J.alert(`${n} failed: ${c.slice(0,200)}`)}},[J]),[ra,Oe]=g.useState(null),[sa,We]=g.useState(null),[ia,Ye]=g.useState(null),[le,$e]=g.useState(null),[ve,Xe]=g.useState("disabled");g.useEffect(()=>{ye.getConfig().then(t=>{var e;return Xe(((e=t.console)==null?void 0:e.mode)||"disabled")}).catch(()=>Xe("disabled"))},[]);const Ie=g.useCallback((t,e,n,i,d)=>{const h=typeof localStorage<"u"&&localStorage.getItem("language")||"",b=e.type==="lxc",s=`${b?"/console-term":"/console"}/${encodeURIComponent(t)}/${encodeURIComponent(e.node)}/${e.vmid}?ct=${encodeURIComponent(n)}`+(e.name?`&name=${encodeURIComponent(e.name)}`:"")+(h?`&lang=${encodeURIComponent(h)}`:"")+(!b&&i?`#vp=${encodeURIComponent(i)}`:"");d&&!d.closed?d.location.href=s:window.open(s,"_blank","noopener,noreferrer")},[]),ze=g.useCallback(()=>{const t=window.open("","_blank");if(t)try{t.opener=null}catch{}return t},[]),la=g.useCallback(async()=>{if(!S.vm)return;const t=S.vm,e=S.clusterId;if(ve==="disabled"){await J.alert(T("console.disabled"));return}if(ve==="prompt"){$e({vm:t,clusterId:e});return}const n=ze();try{const i=await ye.consolePrepare({cluster_id:e,node:t.node,vmid:t.vmid});Ie(e,t,i.console_token,i.vnc_password,n)}catch(i){n&&!n.closed&&n.close();const d=i instanceof Error?i.message:String(i);await J.alert(T("console.prepare_failed",{err:d}))}},[S,ve,J,T,Ie,ze]);return g.useEffect(()=>{if(E||C!=="done")return;const t=setInterval(()=>{O(e=>(e+2)%360)},50);return()=>clearInterval(t)},[E,C]),g.useEffect(()=>{const t=D.current;if(!t)return;const e=t.getContext("2d");if(!e)return;const n=window.devicePixelRatio||1,i=t.parentElement;if(i){const r=Math.round(i.clientWidth*n),u=Math.round(i.clientHeight*n);r>0&&u>0&&(t.width!==r||t.height!==u)&&(t.width=r,t.height=u,t.style.width=i.clientWidth+"px",t.style.height=i.clientHeight+"px")}e.setTransform(n,0,0,n,0,0);const d=t.width/n,h=t.height/n,b=Math.min(d,h),c=d/2,s=h/2,l=b*.4;e.clearRect(0,0,d,h),e.strokeStyle="rgba(0, 240, 255, 0.12)",e.lineWidth=.8;const _=20;for(let r=c%_;r<d;r+=_)e.beginPath(),e.moveTo(r,0),e.lineTo(r,h),e.stroke();for(let r=s%_;r<h;r+=_)e.beginPath(),e.moveTo(0,r),e.lineTo(d,r),e.stroke();if(C!=="flip"&&C!=="done")return;e.globalAlpha=w,e.strokeStyle="rgba(0, 240, 255, 0.25)",e.lineWidth=1.5,e.font='10px "Share Tech Mono", monospace',e.fillStyle="rgba(0, 240, 255, 0.5)",e.textAlign="left";const W=["25%","50%","75%","100%"];for(let r=1;r<=4;r++){const u=l*(r/4);e.beginPath(),e.arc(c,s,u,0,Math.PI*2),e.stroke(),!(r!==2&&r!==4)&&e.fillText(W[r-1],c+u+4,s+4)}e.fillStyle="rgba(0, 255, 136, 0.8)",e.textAlign="center",e.font='14px "Share Tech Mono", monospace',e.fillText("0%",c,s-8),e.font='11px "Share Tech Mono", monospace',e.fillText("LOW",c,s+8),e.fillStyle="rgba(0, 240, 255, 0.5)",e.textAlign="left",e.font='10px "Share Tech Mono", monospace',e.beginPath(),e.moveTo(c-l,s),e.lineTo(c+l,s),e.moveTo(c,s-l),e.lineTo(c,s+l),e.stroke(),e.save(),e.strokeStyle="rgba(0, 240, 255, 0.5)",e.lineWidth=1;for(let r=0;r<360;r+=5){const u=r*Math.PI/180,k=r%30===0,M=l*1.02,A=l*(k?1.065:1.04);e.globalAlpha=w*(k?.65:.3),e.beginPath(),e.moveTo(c+Math.cos(u)*M,s+Math.sin(u)*M),e.lineTo(c+Math.cos(u)*A,s+Math.sin(u)*A),e.stroke()}e.globalAlpha=w*.55,e.fillStyle="rgba(0, 240, 255, 0.8)",e.font='9px "Share Tech Mono", monospace',e.textAlign="center";for(let r=0;r<360;r+=30){const u=r*Math.PI/180;e.fillText(String(r).padStart(3,"0"),c+Math.cos(u)*l*1.12,s+Math.sin(u)*l*1.12+3)}e.globalAlpha=w,e.setLineDash([46,26]),e.lineDashOffset=-v*1.6,e.strokeStyle="rgba(0, 240, 255, 0.3)",e.lineWidth=2,e.beginPath(),e.arc(c,s,l*1.085,0,Math.PI*2),e.stroke(),e.setLineDash([10,34]),e.lineDashOffset=v*2.4,e.strokeStyle="rgba(191, 0, 255, 0.28)",e.lineWidth=1.5,e.beginPath(),e.arc(c,s,l*1.105,0,Math.PI*2),e.stroke(),e.restore();const L=v%360/360;e.save(),e.strokeStyle=`rgba(0, 240, 255, ${(1-L)*.22*w})`,e.lineWidth=2,e.beginPath(),e.arc(c,s,Math.max(2,L*l),0,Math.PI*2),e.stroke(),e.restore();const X=v*Math.PI/180;for(let r=0;r<12;r++){const u=.1*(r+1),k=.09*Math.pow(.82,r);e.fillStyle=`rgba(0, 240, 255, ${k})`,e.beginPath(),e.moveTo(c,s),e.arc(c,s,l,X-u,X-u+.1),e.closePath(),e.fill()}e.save(),e.shadowBlur=6,e.shadowColor="#00f0ff";const V=e.createLinearGradient(c,s,c+Math.cos(X)*l,s+Math.sin(X)*l);V.addColorStop(0,"rgba(0, 255, 200, 1)"),V.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),V.addColorStop(1,"rgba(0, 240, 255, 0)"),e.strokeStyle=V,e.lineWidth=3,e.beginPath(),e.moveTo(c,s),e.lineTo(c+Math.cos(X)*l,s+Math.sin(X)*l),e.stroke(),e.lineWidth=1.5,V.addColorStop(0,"rgba(255, 255, 255, 1)"),e.stroke(),e.restore();const $=c+Math.cos(X)*l*.95,I=s+Math.sin(X)*l*.95,ne=e.createRadialGradient($,I,0,$,I,8);ne.addColorStop(0,"rgba(0, 255, 200, 0.7)"),ne.addColorStop(1,"rgba(0, 240, 255, 0)"),e.fillStyle=ne,e.beginPath(),e.arc($,I,8,0,Math.PI*2),e.fill();const B=[];Y.forEach(r=>{const u=`${r.vm.cluster_id}/${r.vm.node}/${r.vm.vmid}`,k=(r.angle*180/Math.PI+360)%360;(v-k+360)%360<=5&&B.push({key:u,point:{vm:r.vm,angle:r.angle,distance:r.distance,color:r.color,lastScanAngle:v}})}),B.length>0&&me(r=>{const u=new Map(r);B.forEach(({key:M,point:A})=>{u.set(M,A)});const k=new Set(Y.map(M=>`${M.vm.cluster_id}/${M.vm.node}/${M.vm.vmid}`));for(const M of u.keys())k.has(M)||u.delete(M);return u}),Y.forEach(r=>{var ue,Te;const u=c+Math.cos(r.angle)*l*r.distance,k=s+Math.sin(r.angle)*l*r.distance,M=(r.angle*180/Math.PI+360)%360,A=(v-M+360)%360;let K;A<20?K=1:A<60?K=1-(A-20)/40*.4:K=.6-(A-60)/300*.45;let Q="#00ff88";r.color==="warning"&&(Q="#ff6b00"),r.color==="danger"&&(Q="#ff0040");const we=!!r.task,oe=(Te=(ue=r.task)==null?void 0:ue.task_type)==null?void 0:Te.includes("migrate");if(we){const U=oe?"#00f0ff":"#a855f7",Z=Date.now()/500%1;if(e.beginPath(),e.arc(u,k,12+Z*8,0,Math.PI*2),e.strokeStyle=U,e.lineWidth=1.5,e.globalAlpha=(1-Z)*.6*w,e.stroke(),e.beginPath(),e.arc(u,k,10,0,Math.PI*2),e.strokeStyle=U,e.lineWidth=1,e.globalAlpha=.8*w,e.stroke(),oe){const ee=Date.now()/200%(Math.PI*2);e.beginPath(),e.arc(u,k,15,ee,ee+Math.PI/2),e.strokeStyle=U,e.lineWidth=2,e.globalAlpha=.9*w,e.stroke();for(let H=0;H<3;H++){const he=ee+H*Math.PI*2/3,xe=8+(Date.now()/100+H*50)%100/100*10,ce=u+Math.cos(he)*xe,de=k+Math.sin(he)*xe;e.beginPath(),e.arc(ce,de,1.5,0,Math.PI*2),e.fillStyle=U,e.globalAlpha=(.8-(Date.now()/100+H*50)%100/100*.6)*w,e.fill()}}e.globalAlpha=w}if(A<28){const U=A/28;e.beginPath(),e.arc(u,k,4+U*10,0,Math.PI*2),e.strokeStyle=Q,e.lineWidth=1,e.globalAlpha=(1-U)*.3*w,e.stroke()}e.beginPath(),e.arc(u,k,3+r.vm.cpu.usage_percent/100*3,0,Math.PI*2),e.fillStyle=Q,e.globalAlpha=K*w,e.fill(),e.beginPath(),e.arc(u,k,Math.max(1,3+r.vm.cpu.usage_percent/100*3-2),0,Math.PI*2),e.fillStyle="rgba(255, 255, 255, 0.85)",e.globalAlpha=K*w,e.fill(),e.globalAlpha=w}),e.beginPath(),e.arc(c,s,6,0,Math.PI*2),e.fillStyle="#00f0ff",e.fill()},[v,Y,C,w]),g.useEffect(()=>{const t=D.current;if(!t)return;const e=t.parentElement;if(!e)return;const n=()=>{const d=window.devicePixelRatio||1,h=e.clientWidth,b=e.clientHeight;if(!h||!b)return;const c=Math.round(h*d),s=Math.round(b*d);(t.width!==c||t.height!==s)&&(t.width=c,t.height=s,t.style.width=h+"px",t.style.height=b+"px")};n();const i=new ResizeObserver(n);return i.observe(e),window.addEventListener("resize",n),()=>{i.disconnect(),window.removeEventListener("resize",n)}},[]),!o&&!q?a.jsx("div",{className:"radar-scan empty",children:a.jsxs("div",{className:"empty-message",children:[a.jsx("span",{className:"loading-spinner"}),a.jsx("span",{children:T("cluster.select")})]})}):a.jsxs("div",{className:"radar-scan",children:[a.jsx("div",{className:"grid-floor"}),a.jsx("div",{className:"radar-header",children:a.jsxs("h1",{className:"radar-title font-display",children:[a.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("circle",{cx:"12",cy:"12",r:"6"}),a.jsx("circle",{cx:"12",cy:"12",r:"2"}),a.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),T("nav.radar_scan").toUpperCase()]})}),a.jsxs("div",{className:"radar-layout",children:[a.jsxs("div",{className:`radar-container ${C!=="done"?"entering":""} ${C==="grid"?"grid-phase":""}`,ref:re,style:{position:"relative"},children:[(C==="line"||C==="flip")&&a.jsxs("div",{className:`radar-entry-overlay ${C}`,children:[a.jsx("div",{className:"entry-line"}),a.jsx("div",{className:"entry-circle"}),a.jsx("div",{className:"entry-glow"})]}),a.jsx("canvas",{ref:D,className:"radar-canvas",onMouseMove:Qe,onMouseLeave:Ze,style:{position:"absolute",top:0,left:0,cursor:p?"pointer":"default"}}),a.jsx("div",{className:"radar-overlay",style:{opacity:w},children:a.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",v.toFixed(0),"°"]})}),p&&(()=>{var He,Ge,Fe;const t=D.current;if(!t)return null;const e=t.width,n=t.height,i=t.getBoundingClientRect(),d=i.width,h=i.height,b=d/e,c=h/n,s=p.pointX*b,l=p.pointY*c,_=d,W=h,L=180,V=Se(p.vm.vmid,p.vm.node,p.vm.cluster_id,o,m)?175:145,$=L/2,I=V/2,ne=50,B=120,r=_/2,u=W/2,k=s-r,M=l-u,A=Math.sqrt(k*k+M*M)||1,K=k/A,Q=M/A,we=(f,x)=>{const y=f-$,z=f+$,P=x-I,pe=x+I;if(s>=y&&s<=z&&l>=P&&l<=pe)return-1;const j=Math.max(y,Math.min(z,s)),R=Math.max(P,Math.min(pe,l));return Math.sqrt((s-j)**2+(l-R)**2)},oe=20,ue=(f,x)=>({x:Math.max($+oe,Math.min(_-$-oe,f)),y:Math.max(I+oe,Math.min(W-I-oe,x))}),U=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((f,x)=>{const y=f.dx*K+f.dy*Q;return x.dx*K+x.dy*Q-y});let Z={x:s+K*B,y:l+Q*B},ee=!1;for(const f of U){const x={x:s+f.dx*B,y:l+f.dy*B},y=ue(x.x,x.y),z=y.x-s,P=y.y-l,j=Math.sqrt(z*z+P*P)>30&&Math.abs(Math.abs(z)-Math.abs(P))<20,R=we(y.x,y.y);if(j&&R>=ne){Z=y,ee=!0;break}}if(!ee)for(const f of U){const x={x:s+f.dx*(B+60),y:l+f.dy*(B+60)},y=ue(x.x,x.y),z=y.x-s,P=y.y-l,j=Math.sqrt(z*z+P*P)>30&&Math.abs(Math.abs(z)-Math.abs(P))<20,R=we(y.x,y.y);if(j&&R>=ne){Z=y,ee=!0;break}}if(!ee){const f=U[0],x=f.dx>0?(_-$-10-s)/f.dx:($+10-s)/f.dx,y=f.dy>0?(W-I-10-l)/f.dy:(I+10-l)/f.dy,z=Math.min(Math.abs(x),Math.abs(y),B),P=Math.max(ne+20,z);Z={x:s+f.dx*P,y:l+f.dy*P}}const H=20,he=Math.max($+H,Math.min(_-$-H,Z.x)),xe=Math.max(I+H,Math.min(W-I-H,Z.y)),ce=s,de=l,ke=20,ae=28,G=5,be=-Math.PI/2,ca=he-$,da=xe-I,Ve=he,Be=xe,pa=p.vm.memory.total_bytes>0?p.vm.memory.used_bytes/p.vm.memory.total_bytes*100:0,ga=((He=p.vm.disk)==null?void 0:He.usage_percent)||0,ma=Math.max(p.vm.cpu.usage_percent,pa,ga),Ue=te(ma),N={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[Ue]||"#00f0ff";return _<=0||W<=0?null:a.jsxs(a.Fragment,{children:[(()=>{const f=Math.sqrt((Ve-ce)**2+(Be-de)**2),x=Math.atan2(Be-de,Ve-ce)*180/Math.PI;return a.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:ce,top:de,width:f,height:2,background:`linear-gradient(90deg, ${N}, ${N}80)`,transformOrigin:"0 50%",transform:`rotate(${x}deg)`,boxShadow:`0 0 8px ${N}, 0 0 16px ${N}60`,pointerEvents:"none",zIndex:99}})})(),a.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:ce-ae-5,top:de-ae-5,width:(ae+5)*2,height:(ae+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[a.jsx("defs",{children:a.jsxs("filter",{id:"frameGlow",children:[a.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),a.jsxs("feMerge",{children:[a.jsx("feMergeNode",{in:"coloredBlur"}),a.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const f=ae+5,x=ae+5,y=[];for(let j=0;j<G;j++){const R=be+j*2*Math.PI/G;y.push(`${f+ke*Math.cos(R)},${x+ke*Math.sin(R)}`)}const z=y.join(" "),P=[];for(let j=0;j<G;j++){const R=be+j*2*Math.PI/G;P.push(`${f+ae*Math.cos(R)},${x+ae*Math.sin(R)}`)}const pe=P.join(" ");return a.jsxs(a.Fragment,{children:[a.jsx("polygon",{points:pe,fill:"none",stroke:N,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${f}px ${x}px`}}),a.jsx("polygon",{points:z,fill:"none",stroke:N,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(j=>{const R=be+j*2*Math.PI/G,Me=f+ke*Math.cos(R),je=x+ke*Math.sin(R),Ne=6,qe=be+(j-1+G)%G*2*Math.PI/G,Ke=be+(j+1)%G*2*Math.PI/G,fa=Me+Ne*Math.cos(qe+Math.PI),ua=je+Ne*Math.sin(qe+Math.PI),ha=Me+Ne*Math.cos(Ke+Math.PI),xa=je+Ne*Math.sin(Ke+Math.PI);return a.jsxs("g",{children:[a.jsx("line",{x1:Me,y1:je,x2:fa,y2:ua,stroke:N,strokeWidth:"2"}),a.jsx("line",{x1:Me,y1:je,x2:ha,y2:xa,stroke:N,strokeWidth:"2"})]},j)}),a.jsx("line",{x1:f-5,y1:x,x2:f+5,y2:x,stroke:N,strokeWidth:"1"}),a.jsx("line",{x1:f,y1:x-5,x2:f,y2:x+5,stroke:N,strokeWidth:"1"})]})})()]}),a.jsxs("div",{className:`radar-tooltip tooltip-${Ue}`,style:{position:"absolute",left:ca,top:da,width:L,height:V,borderColor:N,boxShadow:`0 0 15px ${N}40, 0 0 30px ${N}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[a.jsx("div",{className:"tooltip-corner tl",style:{borderColor:N}}),a.jsx("div",{className:"tooltip-corner tr",style:{borderColor:N}}),a.jsx("div",{className:"tooltip-corner bl",style:{borderColor:N}}),a.jsx("div",{className:"tooltip-corner br",style:{borderColor:N}}),a.jsxs("div",{className:"tooltip-header",children:[a.jsx("span",{className:"tooltip-name",children:p.vm.name}),a.jsxs("span",{className:"tooltip-id",children:["#",p.vm.vmid]})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"NODE"}),a.jsx("span",{className:"tooltip-value",children:p.vm.node})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"CPU"}),a.jsx("span",{className:`tooltip-value text-${te(p.vm.cpu.usage_percent)}`,children:ge(p.vm.cpu.usage_percent,1)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"MEMORY"}),a.jsx("span",{className:`tooltip-value text-${te(p.vm.memory.used_bytes/p.vm.memory.total_bytes*100)}`,children:ge(p.vm.memory.used_bytes/p.vm.memory.total_bytes*100,1)})]}),a.jsxs("div",{className:"tooltip-row",children:[a.jsx("span",{className:"tooltip-label",children:"DISKIO"}),a.jsx("span",{className:`tooltip-value text-${te(((Ge=p.vm.disk)==null?void 0:Ge.usage_percent)||0)}`,children:ge(((Fe=p.vm.disk)==null?void 0:Fe.usage_percent)||0,1)})]}),(()=>{const f=Se(p.vm.vmid,p.vm.node,p.vm.cluster_id,o,m),x=Je(f);return x?a.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${x.color}40`,marginTop:4,paddingTop:4},children:[a.jsx("span",{className:"tooltip-label",children:"TASK"}),a.jsx("span",{className:"tooltip-value",style:{color:x.color},children:x.label})]}):null})(),a.jsx("div",{className:"tooltip-scanline"})]})]})})(),a.jsxs("div",{className:"radar-legend",style:{opacity:w},children:[a.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),a.jsx("span",{children:"<80%"}),a.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),a.jsx("span",{children:"80-95%"}),a.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),a.jsx("span",{children:">95%"}),a.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),a.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[a.jsxs("div",{className:"panel-header",children:[a.jsx("h2",{className:"panel-title font-display",children:T("radar.anomalies")}),a.jsx("span",{className:"anomaly-count",children:fe.length})]}),a.jsx("div",{className:"anomaly-list",children:fe.length===0?a.jsxs("div",{className:"no-anomalies",children:[a.jsx("span",{className:"status-indicator"}),a.jsx("span",{children:T("radar.all_normal")})]}):fe.map((t,e)=>{const n=`${t.cluster_id}/${t.node}/${t.vmid}`,i=Pe.get(n),d=(p==null?void 0:p.vm.node)===t.node&&(p==null?void 0:p.vm.vmid)===t.vmid&&(p==null?void 0:p.vm.cluster_id)===t.cluster_id,h=Se(t.vmid,t.node,t.cluster_id,o,m);return a.jsx(Sa,{vm:t,index:e,previousIndex:i,onClick:()=>Ee(t),onContextMenu:ta,isSelected:d,task:h},n)})})]})]}),a.jsx(wa,{state:S,onClose:aa,onShowDetails:()=>{S.vm&&Ee(S.vm)},onPowerAction:oa,onOpenConsole:la,onOpenSnapshots:()=>{S.vm&&Oe({vm:S.vm,clusterId:S.clusterId})},onBackupNow:()=>{S.vm&&We({vm:S.vm,clusterId:S.clusterId})},onRemoteMigrate:()=>{S.vm&&Ye({vm:S.vm,clusterId:S.clusterId})},getNodeHealth:na,userRole:ea,consoleMode:ve,consolePasswordSet:!1}),a.jsx(Pa,{sel:ra,onClose:()=>Oe(null)}),a.jsx(Ca,{sel:sa,onClose:()=>We(null)}),a.jsx(_a,{sel:ia,onClose:()=>Ye(null)}),a.jsx(ka,{open:le!==null,cluster_id:(le==null?void 0:le.clusterId)||"",pveUser:"root@pam",onCancel:()=>$e(null),onSubmit:async t=>{if(!le)return;const{vm:e,clusterId:n}=le,i=ze();try{const d=await ye.consolePrepare({cluster_id:n,node:e.node,vmid:e.vmid,password:t});Ie(n,e,d.console_token,d.vnc_password,i)}catch(d){i&&!i.closed&&i.close();const h=d instanceof Error?d.message:String(d);await J.alert(T("console.prepare_failed",{err:h}))}$e(null)}}),a.jsx("style",{children:`
        .radar-scan {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
        }

        .radar-scan.empty {
          align-items: center;
          justify-content: center;
        }

        /* Canvas always visible - grid is continuously drawn */
        .radar-canvas {
          opacity: 1;
        }

        /* Hide scan indicator during entry animation */
        .radar-container.entering .radar-overlay {
          opacity: 0;
        }

        /* Radar Entry Animation - inside radar container only */
        .radar-entry-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border-radius: 50%;
          pointer-events: none;
        }

        .radar-entry-overlay.flip {
          animation: radar-overlay-fade 2.0s ease-out 0.2s forwards;
        }

        @keyframes radar-overlay-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Horizontal line that expands from center */
        .entry-line {
          position: absolute;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, var(--primary) 20%, var(--primary) 80%, transparent 100%);
          box-shadow: 0 0 15px var(--primary), 0 0 30px var(--primary), 0 0 45px rgba(0, 240, 255, 0.5);
          animation: radar-line-expand 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes radar-line-expand {
          0% {
            width: 0;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            width: 70vmin;
            opacity: 1;
          }
        }

        .radar-entry-overlay.flip .entry-line {
          animation: radar-line-to-circle 2.0s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes radar-line-to-circle {
          0% {
            width: 70vmin;
            height: 3px;
            border-radius: 2px;
            background: linear-gradient(90deg, transparent 0%, var(--primary) 20%, var(--primary) 80%, transparent 100%);
          }
          50% {
            width: 35vmin;
            height: 35vmin;
            border-radius: 50%;
            background: transparent;
            border: 2px solid var(--primary);
            box-shadow: 0 0 20px var(--primary), inset 0 0 30px rgba(0, 240, 255, 0.1);
          }
          100% {
            width: 65vmin;
            height: 65vmin;
            border-radius: 50%;
            background: transparent;
            border: 1.5px solid rgba(0, 240, 255, 0.25);
            opacity: 0;
            box-shadow: 0 0 15px var(--primary);
          }
        }

        /* Circle rings that pulse outward */
        .entry-circle {
          position: absolute;
          width: 0;
          height: 0;
          border: 1px solid var(--primary);
          border-radius: 50%;
          opacity: 0;
        }

        .radar-entry-overlay.flip .entry-circle {
          animation: radar-circle-pulse 2.0s ease-out 0.2s forwards;
        }

        @keyframes radar-circle-pulse {
          0% {
            width: 15vmin;
            height: 15vmin;
            opacity: 0;
            border-width: 2px;
          }
          30% {
            opacity: 0.8;
            box-shadow: 0 0 20px var(--primary);
          }
          100% {
            width: 65vmin;
            height: 65vmin;
            opacity: 0;
            border-width: 1.5px;
          }
        }

        /* Center glow effect */
        .entry-glow {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 20px 10px var(--primary), 0 0 40px 20px rgba(0, 240, 255, 0.5);
          animation: radar-glow-pulse 0.35s ease-out forwards;
        }

        @keyframes radar-glow-pulse {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: none;
            opacity: 0.8;
          }
        }

        .radar-entry-overlay.flip .entry-glow {
          animation: radar-glow-expand 0.5s ease-out forwards;
        }

        @keyframes radar-glow-expand {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(2.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }


        .empty-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--text-secondary);
        }

        .radar-header {
          margin-bottom: var(--spacing-lg);
        }

        .radar-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }

        .radar-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: radarIconSpin 8s linear infinite;
        }

        @keyframes radarIconSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .radar-subtitle {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        .radar-layout {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--spacing-lg);
          min-height: 0;
        }

        .radar-container {
          position: relative;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: visible;
        }

        /* Radar Tooltip */
        .radar-tooltip {
          position: absolute;
          /* Positioned by left/top (the computed top-left corner, already
             edge-clamped in JS). NO translate — a -50% shift here (and in the
             materialize keyframes below) was overriding the inline transform
             via animation fill-mode:forwards and pushing the card off-screen. */
          transform: none;
          background: linear-gradient(135deg, rgba(0, 20, 40, 0.95), rgba(0, 10, 30, 0.98));
          border: 1px solid var(--primary);
          border-radius: var(--radius-sm);
          padding: var(--spacing-sm);
          min-width: 180px;
          z-index: 100;
          pointer-events: none;
          animation: tooltip-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          overflow: hidden;
        }

        .radar-tooltip::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 240, 255, 0.1) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0, 240, 255, 0.05) 100%
          );
          pointer-events: none;
          animation: tooltip-hologram 2s ease-in-out infinite;
        }

        .radar-tooltip::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 240, 255, 0.15),
            transparent
          );
          animation: tooltip-shine 1.5s ease-in-out 0.3s;
        }

        @keyframes tooltip-hologram {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes tooltip-shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        @keyframes tooltip-materialize {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateX(20deg);
            filter: blur(8px) brightness(3);
            clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
          }
          30% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: blur(4px) brightness(2);
          }
          60% {
            transform: scale(1.02);
            filter: blur(1px) brightness(1.3);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }

        /* Tooltip corner decorations */
        .tooltip-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: var(--primary);
          animation: corner-appear 0.3s ease-out forwards;
          opacity: 0;
        }

        .tooltip-corner.tl {
          top: -1px;
          left: -1px;
          border-top: 2px solid;
          border-left: 2px solid;
          animation-delay: 0.2s;
        }

        .tooltip-corner.tr {
          top: -1px;
          right: -1px;
          border-top: 2px solid;
          border-right: 2px solid;
          animation-delay: 0.25s;
        }

        .tooltip-corner.bl {
          bottom: -1px;
          left: -1px;
          border-bottom: 2px solid;
          border-left: 2px solid;
          animation-delay: 0.3s;
        }

        .tooltip-corner.br {
          bottom: -1px;
          right: -1px;
          border-bottom: 2px solid;
          border-right: 2px solid;
          animation-delay: 0.35s;
        }

        @keyframes corner-appear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Tooltip scanline effect */
        .tooltip-scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: tooltip-scan 1.5s linear infinite;
        }

        @keyframes tooltip-scan {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(80px);
            opacity: 0;
          }
        }

        /* Connecting line animation - solid line with draw effect */
        .tooltip-line {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: line-draw 0.4s ease-out forwards;
        }

        @keyframes line-draw {
          0% {
            stroke-dashoffset: 2000;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: none;
            opacity: 1;
          }
        }

        /* Secondary glow line */
        .tooltip-line-glow {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: line-draw-glow 0.4s ease-out forwards, line-pulse 1.5s ease-in-out 0.4s infinite;
        }

        @keyframes line-draw-glow {
          0% {
            stroke-dashoffset: 2000;
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: none;
            opacity: 0.3;
          }
        }

        @keyframes line-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Pentagon targeting frame */
        .target-frame {
          animation: frame-pulse 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 4px currentColor);
        }

        .target-frame-outer {
          animation: frame-rotate 8s linear infinite, frame-pulse 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 2px currentColor);
        }

        @keyframes frame-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes frame-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Legacy - keeping for compatibility */
        .point-ring {
          animation: ring-pulse 1s ease-out infinite;
        }

        .point-ring-outer {
          animation: ring-pulse 1s ease-out 0.3s infinite;
        }

        @keyframes ring-pulse {
          0% {
            opacity: 0.8;
            transform-origin: center;
          }
          100% {
            opacity: 0;
            r: 25;
          }
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
          padding-bottom: var(--spacing-xs);
          border-bottom: 1px solid var(--border);
        }

        .tooltip-name {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--primary);
          flex: 1;
        }

        .tooltip-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .tooltip-row {
          display: flex;
          justify-content: space-between;
          margin-top: 2px;
        }

        .tooltip-label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .tooltip-value {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        .radar-canvas {
          width: 100%;
          height: 100%;
        }

        .radar-overlay {
          position: absolute;
          top: var(--spacing-md);
          left: var(--spacing-md);
        }

        .scan-indicator {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--primary);
          text-shadow: 0 0 10px var(--primary);
          animation: pulse 1s ease-in-out infinite;
        }

        .radar-legend {
          position: absolute;
          bottom: var(--spacing-md);
          left: var(--spacing-md);
          display: flex;
          background: rgba(0, 10, 20, 0.8);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 6px 10px;
          font-size: 12px;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          z-index: 10;
        }

        /* Mobile/tablet: hide legend */
        @media (max-width: 1200px) {
          .radar-legend {
            display: none;
          }
        }

        .radar-legend .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 4px currentColor;
        }

        .radar-legend .legend-note {
          color: var(--text-muted);
          margin-left: 4px;
        }

        .anomaly-panel {
          padding: var(--spacing-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
        }

        .anomaly-count {
          font-family: var(--font-mono);
          font-size: 15px;
          color: var(--warning);
          padding: 2px 8px;
          background: rgba(255, 107, 0, 0.2);
          border: 1px solid var(--warning);
          border-radius: var(--radius-sm);
        }

        .anomaly-list {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: 4px;
          margin: -4px;
        }

        .no-anomalies {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-xl);
          color: var(--success);
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .no-anomalies .status-indicator {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .anomaly-item {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: linear-gradient(135deg, rgba(0, 20, 35, 0.9) 0%, rgba(5, 15, 30, 0.95) 100%);
          border: none;
          padding: 10px 12px;
          min-height: 52px;
          transition: all 0.3s ease-out;
          animation: anomaly-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
          clip-path: polygon(
            0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
            100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)
          );
        }

        .anomaly-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 240, 255, 0.15) 0%,
            transparent 40%,
            transparent 60%,
            rgba(0, 240, 255, 0.08) 100%
          );
          pointer-events: none;
        }

        .anomaly-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: anomaly-scan 2s linear infinite;
          transform: translateY(0);
        }

        @keyframes anomaly-scan {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(60px); opacity: 0; }
        }

        @keyframes anomaly-materialize {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.9);
            filter: blur(4px) brightness(2);
            clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
          }
          40% {
            clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        /* Sci-fi corner brackets */
        .anomaly-item .corner-bracket {
          position: absolute;
          width: 10px;
          height: 10px;
          pointer-events: none;
        }

        .anomaly-item .corner-bracket.tl { top: 2px; left: 2px; border-top: 2px solid var(--primary); border-left: 2px solid var(--primary); }
        .anomaly-item .corner-bracket.tr { top: 2px; right: 2px; border-top: 2px solid var(--primary); border-right: 2px solid var(--primary); }
        .anomaly-item .corner-bracket.bl { bottom: 2px; left: 2px; border-bottom: 2px solid var(--primary); border-left: 2px solid var(--primary); }
        .anomaly-item .corner-bracket.br { bottom: 2px; right: 2px; border-bottom: 2px solid var(--primary); border-right: 2px solid var(--primary); }

        .anomaly-header {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .anomaly-task-badge {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          padding: 2px 5px;
          border: 1px solid;
          border-radius: 3px;
          letter-spacing: 0.05em;
          animation: task-badge-pulse 1.5s ease-in-out infinite;
          white-space: nowrap;
        }

        @keyframes task-badge-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; filter: brightness(1.2); }
        }

        .anomaly-item.has-task {
          border-color: var(--primary);
        }

        .anomaly-item.has-task::after {
          content: '';
          position: absolute;
          inset: -2px;
          border: 1px solid var(--primary);
          border-radius: inherit;
          animation: task-pulse-border 1s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes task-pulse-border {
          0%, 100% { box-shadow: 0 0 2px var(--primary), 0 0 4px var(--primary); opacity: 0.5; }
          50% { box-shadow: 0 0 6px var(--primary), 0 0 10px var(--primary); opacity: 0.8; }
        }

        /* Compact horizontal metrics row */
        .anomaly-bars-row {
          display: flex;
          gap: 6px;
          margin-top: -5px;
        }

        .metric-mini {
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 2px 5px;
          background: rgba(0, 20, 30, 0.6);
          border: 1px solid currentColor;
          border-radius: 3px;
          opacity: 0.9;
        }

        .metric-mini.success {
          color: var(--success);
          border-color: rgba(0, 255, 136, 0.4);
          box-shadow: 0 0 4px rgba(0, 255, 136, 0.2);
        }
        .metric-mini.warning {
          color: var(--warning);
          border-color: rgba(255, 107, 0, 0.4);
          box-shadow: 0 0 4px rgba(255, 107, 0, 0.2);
        }
        .metric-mini.danger {
          color: var(--danger-text);
          border-color: rgba(255, 0, 64, 0.5);
          box-shadow: 0 0 6px rgba(255, 0, 64, 0.3);
          animation: metric-danger-pulse 1s ease-in-out infinite;
        }

        @keyframes metric-danger-pulse {
          0%, 100% { box-shadow: 0 0 4px rgba(255, 0, 64, 0.3); }
          50% { box-shadow: 0 0 8px rgba(255, 0, 64, 0.5); }
        }

        .metric-mini .metric-label {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          opacity: 0.8;
        }

        .metric-mini .metric-value {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          text-shadow: 0 0 4px currentColor;
        }

        /* VMID styling */
        .anomaly-vmid {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          opacity: 0.7;
        }

        /* Gauge indicator styles - enhanced visibility */
        .metric-gauge {
          display: flex;
          align-items: center;
          gap: 3px;
          flex: 1;
          min-width: 55px;
          background: rgba(0, 30, 50, 0.8);
          padding: 2px 4px;
          border-radius: 3px;
          border: 1px solid rgba(0, 200, 255, 0.25);
        }

        .metric-gauge .gauge-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
          width: auto;
          margin-right: 1px;
          text-shadow: 0 0 4px currentColor;
        }

        .metric-gauge .gauge-track {
          flex: 1;
          height: 10px;
          background: rgba(0, 5, 15, 0.95);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 2px;
          overflow: visible;
          position: relative;
        }

        .metric-gauge .gauge-segments {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 4px,
            rgba(0, 0, 0, 0.5) 4px,
            rgba(0, 0, 0, 0.5) 5px
          );
          z-index: 2;
          pointer-events: none;
        }

        .metric-gauge .gauge-fill {
          position: absolute;
          top: 1px;
          left: 1px;
          bottom: 1px;
          min-width: 3px;
          border-radius: 1px;
          transition: width 0.3s ease;
          animation: gauge-fill-in 0.6s ease-out forwards;
          transform-origin: left;
          z-index: 1;
        }

        .metric-gauge .gauge-glow {
          position: absolute;
          top: -2px;
          bottom: -2px;
          width: 6px;
          transform: translateX(-50%);
          border-radius: 50%;
          filter: blur(3px);
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          animation: gauge-glow-appear 0.6s ease-out 0.3s forwards;
        }

        @keyframes gauge-glow-appear {
          to { opacity: 0.8; }
        }

        @keyframes gauge-fill-in {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: none;
            opacity: 1;
          }
        }

        .metric-gauge .gauge-value {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          min-width: 22px;
          text-align: right;
          flex-shrink: 0;
          text-shadow: 0 0 4px currentColor;
        }

        /* Success state (green) */
        .metric-gauge.success .gauge-label,
        .metric-gauge.success .gauge-value {
          color: #00ff88;
        }
        .metric-gauge.success .gauge-track {
          border-color: rgba(0, 255, 136, 0.5);
          box-shadow: 0 0 4px rgba(0, 255, 136, 0.2);
        }
        .metric-gauge.success .gauge-fill {
          background: linear-gradient(180deg, #00ff88 0%, #00cc66 50%, #00ff88 100%);
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.9), inset 0 1px 0 rgba(255,255,255,0.4);
        }
        .metric-gauge.success .gauge-glow {
          background: #00ff88;
        }

        /* Warning state (orange) */
        .metric-gauge.warning .gauge-label,
        .metric-gauge.warning .gauge-value {
          color: #ff8800;
        }
        .metric-gauge.warning .gauge-track {
          border-color: rgba(255, 136, 0, 0.5);
          box-shadow: 0 0 4px rgba(255, 136, 0, 0.2);
        }
        .metric-gauge.warning .gauge-fill {
          background: linear-gradient(180deg, #ffaa00 0%, #ff6b00 50%, #ffaa00 100%);
          box-shadow: 0 0 8px rgba(255, 107, 0, 0.9), inset 0 1px 0 rgba(255,255,255,0.4);
        }
        .metric-gauge.warning .gauge-glow {
          background: #ff8800;
        }

        /* Danger state (red) */
        .metric-gauge.danger .gauge-label,
        .metric-gauge.danger .gauge-value {
          color: #ff3366;
          text-shadow: 0 0 6px rgba(255, 0, 64, 0.8);
        }
        .metric-gauge.danger .gauge-track {
          border-color: rgba(255, 0, 64, 0.6);
          box-shadow: 0 0 6px rgba(255, 0, 64, 0.3);
        }
        .metric-gauge.danger .gauge-fill {
          background: linear-gradient(180deg, #ff4466 0%, #ff0040 50%, #ff4466 100%);
          box-shadow: 0 0 10px rgba(255, 0, 64, 1), inset 0 1px 0 rgba(255,255,255,0.4);
          animation: gauge-fill-in 0.6s ease-out forwards, gauge-fill-danger-pulse 1s ease-in-out 0.6s infinite;
        }
        .metric-gauge.danger .gauge-glow {
          background: #ff0040;
          animation: gauge-glow-appear 0.6s ease-out 0.3s forwards, gauge-glow-pulse 0.8s ease-in-out 0.6s infinite;
        }

        @keyframes gauge-fill-danger-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px rgba(255, 0, 64, 1); }
          50% { opacity: 0.85; box-shadow: 0 0 15px rgba(255, 0, 64, 1); }
        }

        @keyframes gauge-glow-pulse {
          0%, 100% { opacity: 0.8; transform: translateX(-50%); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.3); }
        }

        .track-segments {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 4px,
            rgba(0, 0, 0, 0.4) 4px,
            rgba(0, 0, 0, 0.4) 5px
          );
          z-index: 2;
          pointer-events: none;
        }

        .inline-fill {
          height: 100%;
          border-radius: 1px;
          transition: width 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .inline-fill.success {
          background: linear-gradient(180deg, #00ff88 0%, #00cc66 50%, #00ff88 100%);
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .inline-fill.warning {
          background: linear-gradient(180deg, #ffaa00 0%, #ff6b00 50%, #ffaa00 100%);
          box-shadow: 0 0 8px rgba(255, 107, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .inline-fill.danger {
          background: linear-gradient(180deg, #ff4466 0%, #ff0040 50%, #ff4466 100%);
          box-shadow: 0 0 8px rgba(255, 0, 64, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
          animation: danger-bar-pulse 1s ease-in-out infinite;
        }

        @keyframes danger-bar-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .fill-glow {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8));
          animation: glow-scan 1.5s ease-in-out infinite;
        }

        @keyframes glow-scan {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .track-value {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 4px rgba(0, 0, 0, 1), 0 0 2px rgba(0, 0, 0, 1);
          z-index: 3;
          letter-spacing: 0.5px;
        }

        .anomaly-item.entering {
          animation: anomaly-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .anomaly-item.warning {
          background: linear-gradient(135deg, rgba(40, 25, 0, 0.9) 0%, rgba(30, 15, 5, 0.95) 100%);
          box-shadow: 0 0 15px rgba(255, 107, 0, 0.2), inset 0 0 30px rgba(255, 107, 0, 0.05);
        }

        .anomaly-item.warning::before {
          background: linear-gradient(
            135deg,
            rgba(255, 107, 0, 0.2) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 107, 0, 0.1) 100%
          );
        }

        .anomaly-item.warning::after {
          background: linear-gradient(90deg, transparent, var(--warning), transparent);
        }

        .anomaly-item.warning .corner-bracket { border-color: var(--warning) !important; }

        .anomaly-item.critical {
          background: linear-gradient(135deg, rgba(50, 10, 15, 0.9) 0%, rgba(35, 5, 10, 0.95) 100%);
          box-shadow: 0 0 20px rgba(255, 0, 64, 0.3), inset 0 0 30px rgba(255, 0, 64, 0.08);
          animation: anomaly-materialize 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards, critical-pulse 1.5s ease-in-out infinite;
        }

        .anomaly-item.critical::before {
          background: linear-gradient(
            135deg,
            rgba(255, 0, 64, 0.25) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 0, 64, 0.15) 100%
          );
        }

        .anomaly-item.critical::after {
          background: linear-gradient(90deg, transparent, var(--danger), transparent);
        }

        .anomaly-item.critical .corner-bracket { border-color: var(--danger) !important; }

        @keyframes critical-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 64, 0.3), inset 0 0 30px rgba(255, 0, 64, 0.08); }
          50% { box-shadow: 0 0 30px rgba(255, 0, 64, 0.5), inset 0 0 40px rgba(255, 0, 64, 0.15); }
        }

        .anomaly-item.selected {
          transform: scale(1.02);
        }

        .anomaly-item.selected.warning {
          box-shadow: 0 0 15px var(--warning), 0 0 30px rgba(255, 107, 0, 0.3);
          border-color: var(--warning);
        }

        .anomaly-item.selected.critical {
          box-shadow: 0 0 15px var(--danger), 0 0 30px rgba(255, 0, 64, 0.3);
          border-color: var(--danger-text);
        }

        @keyframes warning-pulse-border {
          0%, 100% { box-shadow: 0 0 2px var(--warning), 0 0 4px var(--warning); }
          50% { box-shadow: 0 0 8px var(--warning), 0 0 12px var(--warning); }
        }

        @keyframes danger-pulse-border {
          0%, 100% { box-shadow: 0 0 2px var(--danger), 0 0 4px var(--danger); }
          50% { box-shadow: 0 0 10px var(--danger), 0 0 15px var(--danger); }
        }

        .anomaly-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--text-muted);
        }

        .anomaly-indicator.warning {
          background: var(--warning);
          box-shadow: 0 0 6px var(--warning);
        }

        .anomaly-indicator.danger {
          background: var(--danger);
          box-shadow: 0 0 6px var(--danger);
        }

        .anomaly-name {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .anomaly-stats {
          display: flex;
          gap: var(--spacing-sm);
          flex-shrink: 0;
        }

        .anomaly-stats .stat-cpu,
        .anomaly-stats .stat-mem {
          font-family: var(--font-mono);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .anomaly-stats .stat-label {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .radar-layout {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
          }

          .radar-container {
            min-height: 300px;
          }
        }

      `})]})}export{Ra as RadarScan};
