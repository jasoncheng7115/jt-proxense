import{u as F,r as b,j as e,g as G,d as O,c as B,e as X}from"./index-DeG9m4sY.js";function K({value:a,duration:r=800,suffix:l=""}){const[s,o]=b.useState(0),p=b.useRef(0),c=b.useRef(0);return b.useEffect(()=>{p.current=s;const f=performance.now(),i=d=>{const j=d-f,v=Math.min(j/r,1),n=1-Math.pow(1-v,3);o(p.current+(a-p.current)*n),v<1&&(c.current=requestAnimationFrame(i))};return c.current=requestAnimationFrame(i),()=>cancelAnimationFrame(c.current)},[a,r]),e.jsxs(e.Fragment,{children:[s.toFixed(0),l]})}function I({value:a,duration:r=800}){const[l,s]=b.useState(0),o=b.useRef(0),p=b.useRef(0);return b.useEffect(()=>{o.current=l;const c=performance.now(),f=i=>{const d=i-c,j=Math.min(d/r,1),v=1-Math.pow(1-j,3);s(o.current+(a-o.current)*v),j<1&&(p.current=requestAnimationFrame(f))};return p.current=requestAnimationFrame(f),()=>cancelAnimationFrame(p.current)},[a,r]),e.jsx(e.Fragment,{children:O(l)})}function V({ceph:a}){const r=a.health==="HEALTH_OK"?"#00ff88":a.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",l=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,s=l>=95?"#ff0040":l>=80?"#ff6b00":"#00ff88";return e.jsxs("div",{className:"ceph-core visible",children:[e.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:r,stopOpacity:"0"}),e.jsx("stop",{offset:"50%",stopColor:r,stopOpacity:"0.6"}),e.jsx("stop",{offset:"100%",stopColor:r,stopOpacity:"0"})]})}),e.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),e.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:r,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${r})`}}),e.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),e.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),e.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:s,strokeWidth:"8",strokeDasharray:`${l*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${s})`}}),e.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:r,strokeWidth:"2",className:"pulse-core"}),e.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),e.jsx("circle",{r:"3",fill:r,className:"data-particle p1",children:e.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),e.jsx("circle",{r:"2",fill:r,className:"data-particle p2",children:e.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),e.jsx("circle",{r:"2.5",fill:r,className:"data-particle p3",children:e.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),e.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:r,className:"health-text",children:a.health.replace("HEALTH_","")}),e.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:e.jsx(K,{value:l,duration:1500,suffix:"%"})})]}),e.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:r}}),e.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:r}}),e.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:r}})]})}function J({mons:a,mgrs:r,mds:l}){const{t:s}=F();return e.jsxs("div",{className:"panel-card daemon-orbital",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:s("ceph.cluster_daemons")}),e.jsx("span",{className:"panel-card-meta",children:a.length+r.length+l.length})]}),e.jsxs("div",{className:"daemon-row",children:[e.jsxs("div",{className:"daemon-label",children:[e.jsx("span",{className:"daemon-type mon",children:"MON"}),e.jsx("span",{className:"daemon-count",children:a.length})]}),e.jsx("div",{className:"daemon-nodes",children:a.map(o=>e.jsxs("div",{className:`daemon-node mon ${o.state}`,title:`${o.name} - ${o.host}`,children:[e.jsx("span",{className:"node-name",children:o.name}),e.jsx("span",{className:"node-state",children:o.state==="leader"?"L":"P"}),o.state==="leader"&&e.jsx("div",{className:"leader-glow"})]},o.name))})]}),e.jsxs("div",{className:"daemon-row",children:[e.jsxs("div",{className:"daemon-label",children:[e.jsx("span",{className:"daemon-type mgr",children:"MGR"}),e.jsx("span",{className:"daemon-count",children:r.length})]}),e.jsx("div",{className:"daemon-nodes",children:r.map(o=>e.jsxs("div",{className:`daemon-node mgr ${o.active?"active":"standby"}`,title:`${o.name} - ${o.host}`,children:[e.jsx("span",{className:"node-name",children:o.name}),e.jsx("span",{className:"node-state",children:o.active?"A":"S"}),o.active&&e.jsx("div",{className:"active-glow"})]},o.name))})]}),l.length>0&&e.jsxs("div",{className:"daemon-row",children:[e.jsxs("div",{className:"daemon-label",children:[e.jsx("span",{className:"daemon-type mds",children:"MDS"}),e.jsx("span",{className:"daemon-count",children:l.length})]}),e.jsx("div",{className:"daemon-nodes",children:l.map(o=>e.jsxs("div",{className:`daemon-node mds ${o.state}`,title:`${o.name} rank:${o.rank}`,children:[e.jsx("span",{className:"node-name",children:o.name}),e.jsx("span",{className:"node-state",children:o.state==="active"?"A":"S"}),o.state==="active"&&e.jsx("div",{className:"mds-glow"})]},o.name))})]})]})}function Q({osds:a,onSelect:r}){const{t:l}=F(),s=b.useMemo(()=>{const p={};return a.forEach(c=>{const f=c.host||"unknown";p[f]||(p[f]=[]),p[f].push(c)}),Object.entries(p).sort(([c],[f])=>c.localeCompare(f,void 0,{numeric:!0,sensitivity:"base"}))},[a]),o=a.filter(p=>p.status==="up").length;return e.jsxs("div",{className:"panel-card osd-grid-panel",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:l("ceph.osd_array")}),e.jsxs("span",{className:`osd-status ${o===a.length?"all-up":""}`,children:[o,"/",a.length," UP"]})]}),e.jsx("div",{className:"panel-card-body osd-hosts",children:(()=>{let p=0;return s.map(([c,f])=>e.jsxs("div",{className:"osd-host-group",children:[e.jsx("div",{className:"host-label",children:c}),e.jsx("div",{className:"osd-hexgrid",children:f.sort((i,d)=>i.id-d.id).map(i=>{const d=i.total_bytes>0?i.used_bytes/i.total_bytes*100:0,j=i.status!=="up"||G(d)==="danger"?"#ff0040":G(d)==="warning"?"#ff6b00":"#00ff88",v=p*30;return p++,e.jsx("div",{className:`osd-hex ${i.status==="up"?"up":"down"}`,style:{"--osd-color":j,animationDelay:`${v}ms`},onClick:()=>r(i),title:`OSD.${i.id} - ${B(d,0)}`,children:e.jsx("span",{className:"osd-id",children:i.id})},i.id)})})]},c))})()})]})}function q({read:a,write:r,fmt:l,height:s=100,isPaused:o=!1}){const p=b.useRef(null),c=b.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),f=b.useRef(0),i=b.useRef(0),d=100,j=l;return b.useEffect(()=>{c.current.targetRead=a,c.current.targetWrite=r},[a,r]),b.useEffect(()=>{const v=p.current;if(!v)return;const n=v.getContext("2d");if(!n)return;const M=window.devicePixelRatio||1,S=()=>{const _=v.getBoundingClientRect();return v.width=_.width*M,v.height=_.height*M,n.setTransform(M,0,0,M,0,0),{width:_.width,height:_.height}},{width:A,height:D}=S(),h=42,P=A-h;let w=0;const m=50;let g=0;const R=_=>{const t=_-w;w=_,g+=t;const x=.1;c.current.currentRead+=(c.current.targetRead-c.current.currentRead)*x,c.current.currentWrite+=(c.current.targetWrite-c.current.currentWrite)*x,g>=m&&(g=0,c.current.read.push(c.current.currentRead),c.current.write.push(c.current.currentWrite),c.current.read.length>d&&c.current.read.shift(),c.current.write.length>d&&c.current.write.shift()),i.current=(i.current+.5)%20,n.clearRect(0,0,A,D);const k=Math.max(...c.current.read,...c.current.write,1),N=8,C=4;n.font="9px monospace",n.fillStyle="rgba(0, 240, 255, 0.6)",n.textAlign="right",n.textBaseline="middle";for(let z=0;z<=C;z++){const W=N+z/C*(D-N*2),T=k*(1-z/C);n.fillText(j(T),h-4,W)}n.strokeStyle="rgba(0, 240, 255, 0.06)",n.lineWidth=1;for(let z=0;z<=C;z++){const W=N+z/C*(D-N*2);n.beginPath(),n.setLineDash([4,4]),n.lineDashOffset=-i.current,n.moveTo(h,W),n.lineTo(A,W),n.stroke()}n.setLineDash([]);const $=(z,W,T)=>{if(z.length<2)return;const u=z.map((y,L)=>({x:h+L/(d-1)*P,y:D-N-y/k*(D-N*2)}));n.strokeStyle=T,n.lineWidth=6,n.lineCap="round",n.lineJoin="round",n.globalAlpha=.3,n.beginPath(),n.moveTo(u[0].x,u[0].y);for(let y=1;y<u.length-1;y++){const L=(u[y].x+u[y+1].x)/2,H=(u[y].y+u[y+1].y)/2;n.quadraticCurveTo(u[y].x,u[y].y,L,H)}n.lineTo(u[u.length-1].x,u[u.length-1].y),n.stroke(),n.globalAlpha=1,n.strokeStyle=W,n.lineWidth=2,n.shadowColor=W,n.shadowBlur=8,n.beginPath(),n.moveTo(u[0].x,u[0].y);for(let y=1;y<u.length-1;y++){const L=(u[y].x+u[y+1].x)/2,H=(u[y].y+u[y+1].y)/2;n.quadraticCurveTo(u[y].x,u[y].y,L,H)}n.lineTo(u[u.length-1].x,u[u.length-1].y),n.stroke(),n.shadowBlur=0;const E=3;for(let y=0;y<E;y++){const L=(i.current/20+y/E)%1,H=Math.floor(L*(u.length-1));H<u.length&&(n.fillStyle=W,n.globalAlpha=.8,n.beginPath(),n.arc(u[H].x,u[H].y,3,0,Math.PI*2),n.fill())}n.globalAlpha=1};$(c.current.write,"#ff6b00","#ff6b00"),$(c.current.read,"#00ff88","#00ff88"),o||(f.current=requestAnimationFrame(R))};return f.current=requestAnimationFrame(R),()=>cancelAnimationFrame(f.current)},[o]),e.jsx("canvas",{ref:p,className:"io-canvas",style:{width:"100%",height:`${s}px`}})}function Z({readBps:a,writeBps:r,readOps:l,writeOps:s,osds:o,isPaused:p=!1}){const c=i=>i===0?"0":i>=1073741824?`${(i/1073741824).toFixed(1)}G`:i>=1048576?`${(i/1048576).toFixed(1)}M`:i>=1024?`${(i/1024).toFixed(0)}K`:`${i.toFixed(0)}`,f=i=>i>=1e3?`${(i/1e3).toFixed(1)}K`:`${i.toFixed(0)}`;return e.jsxs("div",{className:"panel-card io-wave-panel",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:"I/O ACTIVITY"})]}),e.jsxs("div",{className:"panel-card-body",children:[e.jsx(q,{read:a,write:r,fmt:c,isPaused:p}),e.jsxs("div",{className:"io-stats",children:[e.jsxs("div",{className:"io-stat read",children:[e.jsx("span",{className:"io-icon",children:"▼"}),e.jsx("span",{className:"io-label",children:"READ"}),e.jsxs("span",{className:"io-value",children:[O(a),"/s"]}),e.jsxs("span",{className:"io-ops",children:[l.toFixed(0)," IOPS"]})]}),e.jsxs("div",{className:"io-stat write",children:[e.jsx("span",{className:"io-icon",children:"▲"}),e.jsx("span",{className:"io-label",children:"WRITE"}),e.jsxs("span",{className:"io-value",children:[O(r),"/s"]}),e.jsxs("span",{className:"io-ops",children:[s.toFixed(0)," IOPS"]})]})]}),e.jsx("div",{className:"io-section-label",children:"IOPS"}),e.jsx(q,{read:l,write:s,fmt:f,height:72,isPaused:p}),(()=>{const i=(o||[]).filter(n=>n.status==="up");if(i.length===0)return null;const d=n=>i.reduce((M,S)=>M+(n(S)||0),0)/i.length,j=d(n=>n.apply_latency_ms||0),v=d(n=>n.commit_latency_ms||0);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"io-section-label",children:"AVG OSD LATENCY"}),e.jsxs("div",{className:"io-stats",children:[e.jsxs("div",{className:"io-stat read",children:[e.jsx("span",{className:"io-label",children:"APPLY"}),e.jsxs("span",{className:"io-value",children:[j.toFixed(1)," ms"]})]}),e.jsxs("div",{className:"io-stat write",children:[e.jsx("span",{className:"io-label",children:"COMMIT"}),e.jsxs("span",{className:"io-value",children:[v.toFixed(1)," ms"]})]})]})]})})()]})]})}function U({pool:a,totalBytes:r}){const l=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/r*100,s=l>=95?"#ff0040":l>=80?"#ff6b00":"#00ff88";return e.jsxs("div",{className:"pool-energy-bar visible",children:[e.jsxs("div",{className:"pool-info",children:[e.jsx("span",{className:"pool-name",children:a.name}),e.jsx("span",{className:"pool-size",children:O(a.used_bytes)})]}),e.jsxs("div",{className:"energy-track",children:[e.jsx("div",{className:"energy-fill",style:{width:`${l}%`,background:`linear-gradient(90deg, ${s}88, ${s})`,boxShadow:`0 0 10px ${s}`}}),e.jsx("div",{className:"energy-glow",style:{width:`${l}%`,background:s}})]}),e.jsxs("span",{className:"pool-percent",style:{color:s},children:[l.toFixed(1),"%"]})]})}function ee({osd:a,onClose:r}){const{t:l}=F(),s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,o=G(s);return e.jsx("div",{className:"osd-popup-overlay",onClick:r,children:e.jsxs("div",{className:"osd-popup",onClick:p=>p.stopPropagation(),children:[e.jsxs("div",{className:"popup-header",children:[e.jsxs("div",{className:"popup-title",children:[e.jsx("span",{className:`status-badge ${a.status==="up"?"up":"down"}`,children:a.status.toUpperCase()}),e.jsxs("span",{className:"osd-name",children:["OSD.",a.id]})]}),e.jsx("button",{className:"popup-close",onClick:r,children:"×"})]}),e.jsxs("div",{className:"popup-content",children:[e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:"Host"}),e.jsx("span",{className:"info-value",children:a.host||"N/A"})]}),e.jsxs("div",{className:"info-row",children:[e.jsx("span",{className:"info-label",children:l("ceph.in_cluster")}),e.jsx("span",{className:`info-value ${a.in_cluster?"text-success":"text-danger"}`,children:a.in_cluster?l("ceph.yes"):l("ceph.no")})]}),e.jsxs("div",{className:"storage-section",children:[e.jsx("div",{className:"storage-bar",children:e.jsx("div",{className:`storage-fill ${o}`,style:{width:`${s}%`}})}),e.jsxs("div",{className:"storage-stats",children:[e.jsxs("span",{children:[O(a.used_bytes)," / ",O(a.total_bytes)]}),e.jsx("span",{className:`text-${o}`,children:B(s,1)})]})]}),a.status==="up"&&(a.apply_latency_ms||a.commit_latency_ms)&&e.jsxs("div",{className:"latency-section",children:[e.jsx("div",{className:"latency-title",children:l("ceph.latency")}),e.jsxs("div",{className:"latency-grid",children:[e.jsxs("div",{className:"latency-item",children:[e.jsx("span",{className:"latency-label",children:l("ceph.apply")}),e.jsxs("span",{className:"latency-value",children:[(a.apply_latency_ms||0).toFixed(1)," ms"]})]}),e.jsxs("div",{className:"latency-item",children:[e.jsx("span",{className:"latency-label",children:l("ceph.commit")}),e.jsxs("span",{className:"latency-value",children:[(a.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function ae({ceph:a}){const{t:r}=F(),l=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,s=100-l;return e.jsxs("div",{className:"panel-card storage-summary",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:r("ceph.cluster_storage")})]}),e.jsxs("div",{className:"panel-card-body",children:[e.jsxs("div",{className:"summary-stats",children:[e.jsxs("div",{className:"stat-block used",children:[e.jsx("span",{className:"stat-value",children:O(a.used_bytes)}),e.jsx("span",{className:"stat-label",children:r("ceph.used")})]}),e.jsx("div",{className:"stat-divider",children:"/"}),e.jsxs("div",{className:"stat-block total",children:[e.jsx("span",{className:"stat-value",children:O(a.total_bytes)}),e.jsx("span",{className:"stat-label",children:r("ceph.total")})]})]}),e.jsxs("div",{className:"summary-bar",children:[e.jsx("div",{className:"bar-used",style:{width:`${l}%`}}),e.jsx("div",{className:"bar-available",style:{width:`${s}%`}})]}),e.jsxs("div",{className:"summary-legend",children:[e.jsxs("span",{className:"legend-item used",children:[e.jsx("span",{className:"legend-dot"})," Used ",B(l,1)]}),e.jsxs("span",{className:"legend-item available",children:[e.jsx("span",{className:"legend-dot"})," Available ",B(s,1)]})]})]})]})}function se({ceph:a}){const r=a.health==="HEALTH_OK"?"#00ff88":a.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",l=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,s=l>=95?"#ff0040":l>=80?"#ff6b00":"#00ff88";return e.jsx("div",{className:"compact-core",children:e.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[e.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),e.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:r,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${r})`}}),e.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),e.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:s,strokeWidth:"6",strokeDasharray:`${l*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${s})`,transition:"stroke-dasharray 0.5s ease"}}),e.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:r,strokeWidth:"1.5"}),e.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:r,className:"compact-health-text",children:a.health.replace("HEALTH_","")}),e.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:B(l,0)})]})})}function te({mons:a,mgrs:r,mds:l}){return e.jsxs("div",{className:"compact-daemons",children:[e.jsxs("div",{className:"daemon-row",children:[e.jsx("span",{className:"daemon-badge mon",children:"MON"}),e.jsx("div",{className:"daemon-dots",children:a.map(s=>e.jsx("span",{className:`daemon-dot mon ${s.state}`,title:`${s.name} - ${s.state}`},s.name))}),e.jsx("span",{className:"daemon-count-small",children:a.length})]}),e.jsxs("div",{className:"daemon-row",children:[e.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),e.jsx("div",{className:"daemon-dots",children:r.map(s=>e.jsx("span",{className:`daemon-dot mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.active?"Active":"Standby"}`},s.name))}),e.jsx("span",{className:"daemon-count-small",children:r.length})]}),l.length>0&&e.jsxs("div",{className:"daemon-row",children:[e.jsx("span",{className:"daemon-badge mds",children:"MDS"}),e.jsx("div",{className:"daemon-dots",children:l.map(s=>e.jsx("span",{className:`daemon-dot mds ${s.state}`,title:`${s.name} - ${s.state}`},s.name))}),e.jsx("span",{className:"daemon-count-small",children:l.length})]})]})}function oe({ceph:a}){const{t:r}=F(),l=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0;return e.jsxs("div",{className:"compact-storage",children:[e.jsxs("div",{className:"storage-row",children:[e.jsx("span",{className:"storage-label",children:r("ceph.used")}),e.jsx("span",{className:"storage-value",children:e.jsx(I,{value:a.used_bytes})})]}),e.jsx("div",{className:"compact-bar",children:e.jsx("div",{className:"compact-bar-fill",style:{width:`${l}%`,transition:"width 0.8s ease-out"}})}),e.jsxs("div",{className:"storage-row",children:[e.jsx("span",{className:"storage-label",children:r("ceph.total")}),e.jsx("span",{className:"storage-value",children:e.jsx(I,{value:a.total_bytes})})]})]})}function ne({osds:a,onSelect:r}){const l=a.filter(s=>s.status==="up").length;return e.jsxs("div",{className:"compact-osd-panel",children:[e.jsxs("div",{className:"compact-osd-header",children:[e.jsx("span",{className:"compact-osd-title",children:"OSD"}),e.jsxs("span",{className:`compact-osd-status ${l===a.length?"all-up":""}`,children:[l,"/",a.length]})]}),e.jsx("div",{className:"compact-osd-grid",children:a.sort((s,o)=>s.id-o.id).map((s,o)=>{const p=s.total_bytes>0?s.used_bytes/s.total_bytes*100:0,c=s.status!=="up"||p>=95?"#ff0040":p>=80?"#ff6b00":"#00ff88";return e.jsx("div",{className:`compact-osd ${s.status==="up"?"up":"down"}`,style:{"--osd-color":c,animationDelay:`${o*20}ms`},onClick:()=>r(s),title:`OSD.${s.id}`,children:s.id},s.id)})})]})}function re({readBps:a,writeBps:r}){return e.jsxs("div",{className:"compact-io",children:[e.jsxs("div",{className:"io-row read",children:[e.jsx("span",{className:"io-arrow",children:"▼"}),e.jsx("span",{className:"io-label",children:"R"}),e.jsxs("span",{className:"io-val",children:[e.jsx(I,{value:a,duration:500}),"/s"]})]}),e.jsxs("div",{className:"io-row write",children:[e.jsx("span",{className:"io-arrow",children:"▲"}),e.jsx("span",{className:"io-label",children:"W"}),e.jsxs("span",{className:"io-val",children:[e.jsx(I,{value:r,duration:500}),"/s"]})]})]})}function ie({pools:a,totalBytes:r}){const l=a.filter(s=>!s.name.startsWith(".")&&!s.name.endsWith("_metadata")).map(s=>({...s,name:s.name.endsWith("_data")?s.name.replace(/_data$/,""):s.name}));return l.length===0?null:e.jsxs("div",{className:"compact-pools",children:[l.slice(0,6).map(s=>{const o=s.total_bytes>0?s.used_bytes/s.total_bytes*100:s.used_bytes/r*100,p=o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return e.jsxs("div",{className:"compact-pool",children:[e.jsx("span",{className:"pool-label",children:s.name.substring(0,12)}),e.jsx("div",{className:"pool-mini-bar",children:e.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(o,100)}%`,background:p}})}),e.jsx("span",{className:"pool-pct",style:{color:p},children:B(o,0)})]},s.name)}),l.length>6&&e.jsxs("span",{className:"pool-more",children:["+",l.length-6," more"]})]})}function le({osds:a}){const{t:r}=F(),l=b.useRef(null),s=b.useRef(null),[o,p]=b.useState(null),[c,f]=b.useState({left:0,top:0}),i=a.filter(t=>t.status==="up").map(t=>({id:t.id,apply:t.apply_latency_ms||0,commit:t.commit_latency_ms||0,host:t.host||""}));b.useLayoutEffect(()=>{if(!o||!s.current)return;const t=s.current.getBoundingClientRect(),x=8,k=window.innerWidth,N=window.innerHeight;let C=o.x+14,$=o.y+14;C+t.width>k-x&&(C=o.x-t.width-14),$+t.height>N-x&&($=o.y-t.height-14),C=Math.min(Math.max(x,C),Math.max(x,k-t.width-x)),$=Math.min(Math.max(x,$),Math.max(x,N-t.height-x)),(C!==c.left||$!==c.top)&&f({left:C,top:$})},[o]);const d=b.useMemo(()=>{const t=new Map;for(const x of i){const k=`${x.apply.toFixed(2)}|${x.commit.toFixed(2)}`,N=t.get(k)||[];N.push(x),t.set(k,N)}return Array.from(t.entries()).map(([x,k])=>({key:x,idKey:k.map(N=>N.id).sort((N,C)=>N-C).join("-"),apply:k[0].apply,commit:k[0].commit,members:k}))},[i]),j=t=>t<=1?1:t<=2?2:t<=4?4:t<=6?6:t<=10?10:t<=20?20:t<=50?50:t<=100?100:Math.ceil(t/50)*50,v=Math.max(1,j(i.reduce((t,x)=>Math.max(t,x.apply),0)*1.1)),n=Math.max(1,j(i.reduce((t,x)=>Math.max(t,x.commit),0)*1.1)),M=(t,x)=>t>=x*.4,S=(t,x)=>t>=x*.75,A=480,D=220,h={l:44,r:14,t:12,b:32},P=A-h.l-h.r,w=D-h.t-h.b,m=t=>h.l+t/v*P,g=t=>h.t+w-t/n*w,R=[0,v/4,v/2,v*3/4,v],_=[0,n/4,n/2,n*3/4,n];return e.jsxs("div",{className:"panel-card osd-lat-card",ref:l,children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:r("ceph.osd_latency_title")}),e.jsxs("span",{className:"panel-card-meta",children:[i.length," OSD"]})]}),i.length===0?e.jsx("div",{className:"osd-lat-empty",children:r("ceph.osd_latency_empty")}):e.jsxs("div",{className:"osd-lat-svg-wrap",children:[e.jsxs("svg",{viewBox:`0 0 ${A} ${D}`,className:"osd-lat-svg",preserveAspectRatio:"xMidYMid meet",onMouseLeave:()=>p(null),children:[e.jsxs("defs",{children:[e.jsx("pattern",{id:"osd-lat-grid",width:P/4,height:w/4,patternUnits:"userSpaceOnUse",children:e.jsx("path",{d:`M ${P/4} 0 L 0 0 0 ${w/4}`,fill:"none",stroke:"rgba(0,240,255,0.08)",strokeWidth:"1"})}),e.jsxs("radialGradient",{id:"osd-dot-ok",children:[e.jsx("stop",{offset:"0%",stopColor:"#a8f5ff"}),e.jsx("stop",{offset:"60%",stopColor:"#00f0ff"}),e.jsx("stop",{offset:"100%",stopColor:"#0080a0"})]}),e.jsxs("radialGradient",{id:"osd-dot-warn",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffd49a"}),e.jsx("stop",{offset:"60%",stopColor:"#ff8a3c"}),e.jsx("stop",{offset:"100%",stopColor:"#a04a00"})]}),e.jsxs("radialGradient",{id:"osd-dot-crit",children:[e.jsx("stop",{offset:"0%",stopColor:"#ffb0c0"}),e.jsx("stop",{offset:"60%",stopColor:"#ff4d6d"}),e.jsx("stop",{offset:"100%",stopColor:"#7a0020"})]})]}),e.jsx("rect",{x:h.l,y:h.t,width:P,height:w,fill:"url(#osd-lat-grid)"}),e.jsx("line",{x1:h.l,y1:h.t+w,x2:h.l+P,y2:h.t+w,stroke:"rgba(0,240,255,0.35)"}),e.jsx("line",{x1:h.l,y1:h.t,x2:h.l,y2:h.t+w,stroke:"rgba(0,240,255,0.35)"}),e.jsx("line",{x1:m(0),y1:g(0),x2:m(Math.min(v,n)),y2:g(Math.min(v,n)),stroke:"rgba(0,240,255,0.18)",strokeWidth:"1",strokeDasharray:"3 4"}),R.map(t=>e.jsxs("g",{children:[e.jsx("line",{x1:m(t),y1:h.t+w,x2:m(t),y2:h.t+w+3,stroke:"rgba(0,240,255,0.35)"}),e.jsx("text",{x:m(t),y:h.t+w+14,textAnchor:"middle",style:{fontFamily:"var(--font-mono)",fontSize:10,fill:"var(--text-muted)"},children:t.toFixed(t<10?1:0)})]},`x${t}`)),e.jsx("text",{x:h.l+P/2,y:D-4,textAnchor:"middle",style:{fontFamily:"var(--font-mono)",fontSize:10,fill:"var(--text-secondary)"},children:r("ceph.apply_ms")}),_.map(t=>e.jsxs("g",{children:[e.jsx("line",{x1:h.l-3,y1:g(t),x2:h.l,y2:g(t),stroke:"rgba(0,240,255,0.35)"}),e.jsx("text",{x:h.l-6,y:g(t)+3,textAnchor:"end",style:{fontFamily:"var(--font-mono)",fontSize:10,fill:"var(--text-muted)"},children:t.toFixed(t<10?1:0)})]},`y${t}`)),e.jsx("text",{x:12,y:h.t+w/2,textAnchor:"middle",transform:`rotate(-90, 12, ${h.t+w/2})`,style:{fontFamily:"var(--font-mono)",fontSize:10,fill:"var(--text-secondary)"},children:r("ceph.commit_ms")}),d.map((t,x)=>{const k=S(t.apply,v)||S(t.commit,n),N=!k&&(M(t.apply,v)||M(t.commit,n)),C=k?"url(#osd-dot-crit)":N?"url(#osd-dot-warn)":"url(#osd-dot-ok)",$=k?"#ff4d6d":N?"#ff8a3c":"#00f0ff",z=5+Math.min(8,Math.log2(t.members.length+1)*2),W=m(t.apply),T=g(t.commit),u=(o==null?void 0:o.idx)===x,E="cx .6s cubic-bezier(.4,0,.2,1), cy .6s cubic-bezier(.4,0,.2,1)";return e.jsxs("g",{children:[u&&e.jsx("circle",{cx:W,cy:T,r:z+5,fill:"none",stroke:$,strokeWidth:"1.5",opacity:"0.7",style:{pointerEvents:"none",transition:E}}),e.jsx("circle",{cx:W,cy:T,r:z,fill:C,stroke:$,strokeWidth:"1.4",style:{filter:"drop-shadow(0 0 4px "+$+")",cursor:"pointer",transition:E},onMouseEnter:y=>{p({idx:x,x:y.clientX,y:y.clientY}),f({left:y.clientX+14,top:y.clientY+14})},onMouseMove:y=>{p({idx:x,x:y.clientX,y:y.clientY})}}),t.members.length>1&&e.jsx("text",{x:W,y:T+3.5,textAnchor:"middle",style:{fontFamily:"var(--font-mono)",fontSize:10,fill:"#021018",fontWeight:700,pointerEvents:"none",transition:E},children:t.members.length})]},t.idKey)})]}),o&&d[o.idx]&&X.createPortal(e.jsxs("div",{className:"osd-lat-tip osd-lat-tip--fixed",ref:s,style:{left:c.left,top:c.top},children:[e.jsxs("div",{className:"osd-lat-tip-row",children:[e.jsx("span",{className:"osd-lat-tip-key",children:"apply"}),e.jsxs("span",{className:"osd-lat-tip-val",children:[d[o.idx].apply.toFixed(2)," ms"]})]}),e.jsxs("div",{className:"osd-lat-tip-row",children:[e.jsx("span",{className:"osd-lat-tip-key",children:"commit"}),e.jsxs("span",{className:"osd-lat-tip-val",children:[d[o.idx].commit.toFixed(2)," ms"]})]}),e.jsx("div",{className:"osd-lat-tip-sep"}),d[o.idx].members.map(t=>e.jsxs("div",{className:"osd-lat-tip-row",children:[e.jsxs("span",{className:"osd-lat-tip-osd",children:["osd.",t.id]}),t.host&&e.jsx("span",{className:"osd-lat-tip-host",children:t.host})]},t.id))]}),document.body)]})]})}function ce({ceph:a,clusterName:r,onOSDSelect:l,compact:s=!1,isPaused:o=!1}){const{t:p}=F();if(s)return e.jsxs("div",{className:"ceph-cluster-compact",children:[e.jsx("div",{className:"compact-left",children:e.jsx(se,{ceph:a})}),e.jsxs("div",{className:"compact-middle",children:[e.jsx(te,{mons:a.mons||[],mgrs:a.mgrs||[],mds:a.mds||[]}),e.jsx(oe,{ceph:a}),e.jsx(re,{readBps:a.read_bytes_sec,writeBps:a.write_bytes_sec})]}),e.jsx("div",{className:"compact-right",children:e.jsx(ne,{osds:a.osds,onSelect:l})}),e.jsx("div",{className:"compact-pools-section",children:e.jsx(ie,{pools:a.pools,totalBytes:a.total_bytes})})]});const c=a.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),f=c.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),i=c.filter(d=>!d.name.toLowerCase().includes("cephfs"));return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ceph-content-full",children:[e.jsxs("div",{className:"col-core",children:[e.jsxs("div",{className:"panel-card core-card",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:p("ceph.health")}),e.jsx("span",{className:"panel-card-meta",children:a.health.replace("HEALTH_","")})]}),e.jsx("div",{className:"panel-card-body core-card-body",children:e.jsx(V,{ceph:a})})]}),e.jsx(ae,{ceph:a})]}),e.jsxs("div",{className:"col-daemons",children:[e.jsx(J,{mons:a.mons||[],mgrs:a.mgrs||[],mds:a.mds||[]}),e.jsxs("div",{className:"pools-inline",children:[i.length>0&&e.jsxs("div",{className:"panel-card pool-group-inline",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:p("ceph.ceph_pools")}),e.jsx("span",{className:"panel-card-meta",children:i.length})]}),e.jsx("div",{className:"panel-card-body pools-list",children:i.map((d,j)=>e.jsx(U,{pool:d,totalBytes:a.total_bytes},d.name))})]}),f.length>0&&e.jsxs("div",{className:"panel-card pool-group-inline",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:p("ceph.cephfs_pools")}),e.jsx("span",{className:"panel-card-meta",children:f.length})]}),e.jsx("div",{className:"panel-card-body pools-list",children:f.map((d,j)=>e.jsx(U,{pool:d,totalBytes:a.total_bytes},d.name))})]})]})]}),e.jsx("div",{className:"col-osd",children:e.jsx(Z,{readBps:a.read_bytes_sec,writeBps:a.write_bytes_sec,readOps:a.read_ops_sec,writeOps:a.write_ops_sec,osds:a.osds,isPaused:o})})]}),e.jsx(Q,{osds:a.osds,onSelect:l}),e.jsxs("div",{className:"ceph-charts",children:[e.jsx(le,{osds:a.osds||[]}),e.jsx(de,{osds:a.osds||[]})]})]})}function de({osds:a}){const{t:r}=F(),l=b.useRef(null),s=b.useRef(null),[o,p]=b.useState(null),[c,f]=b.useState({left:0,top:0});b.useLayoutEffect(()=>{if(!o||!s.current)return;const m=s.current.getBoundingClientRect(),g=8,R=window.innerWidth,_=window.innerHeight;let t=o.x+14,x=o.y+14;t+m.width>R-g&&(t=o.x-m.width-14),x+m.height>_-g&&(x=o.y-m.height-14),t=Math.min(Math.max(g,t),Math.max(g,R-m.width-g)),x=Math.min(Math.max(g,x),Math.max(g,_-m.height-g)),(t!==c.left||x!==c.top)&&f({left:t,top:x})},[o]);const i=[...a||[]].sort((m,g)=>{const R=m.total_bytes?m.used_bytes/m.total_bytes:0;return(g.total_bytes?g.used_bytes/g.total_bytes:0)-R}),d=720,j=330,v=(a||[]).length<=24,n={l:42,r:10,t:12,b:v?26:10},M=d-n.l-n.r,S=j-n.t-n.b,A=i.length?M/i.length:M,D=m=>m>=95?"#ff4d6d":m>=85?"#FFB74D":"#00E5FF",h=m=>m.total_bytes?m.used_bytes/m.total_bytes*100:0,P=i.length?i.reduce((m,g)=>m+h(g),0)/i.length:0,w=n.t+S-P/100*S;return e.jsxs("div",{className:"panel-card osd-usage-card",children:[e.jsxs("div",{className:"panel-card-head",children:[e.jsx("span",{className:"panel-card-dot"}),e.jsx("span",{children:r("ceph.osd_usage_title")}),e.jsxs("span",{className:"panel-card-meta",children:["avg ",P.toFixed(1),"%"]})]}),e.jsxs("div",{className:"panel-card-body osd-usage-wrap",ref:l,children:[i.length===0?e.jsx("div",{className:"osd-lat-empty",children:"—"}):e.jsxs("svg",{viewBox:`0 0 ${d} ${j}`,className:"osd-usage-svg",preserveAspectRatio:"xMidYMid meet",onMouseLeave:()=>p(null),children:[[0,25,50,75,100].map(m=>{const g=n.t+S-m/100*S;return e.jsxs("g",{children:[e.jsx("line",{x1:n.l,y1:g,x2:n.l+M,y2:g,stroke:"rgba(0,240,255,0.1)"}),e.jsxs("text",{x:n.l-6,y:g+3,textAnchor:"end",fontSize:"9",fill:"#6b7c93",children:[m,"%"]})]},m)}),e.jsx("line",{x1:n.l,y1:w,x2:n.l+M,y2:w,stroke:"rgba(224,102,255,0.55)",strokeDasharray:"4 3"}),i.map((m,g)=>{const R=h(m),_=Math.max(1,R/100*S);return e.jsx("rect",{x:n.l+g*A+A*.12,y:n.t+S-_,width:Math.max(1,A*.76),height:_,rx:"1",fill:D(R),opacity:m.status==="up"?.85:.3,onMouseEnter:t=>{p({x:t.clientX,y:t.clientY,osd:m}),f({left:t.clientX+14,top:t.clientY+14})},onMouseMove:t=>{p({x:t.clientX,y:t.clientY,osd:m})}},m.id)}),v&&i.map((m,g)=>e.jsx("text",{x:n.l+g*A+A/2,y:j-9,textAnchor:"middle",fontSize:"8",fill:"#6b7c93",children:m.id},m.id))]}),o&&X.createPortal(e.jsxs("div",{className:"osd-lat-tip osd-lat-tip--fixed",ref:s,style:{left:c.left,top:c.top},children:[e.jsxs("div",{className:"osd-lat-tip-row",children:[e.jsxs("span",{className:"osd-lat-tip-osd",children:["OSD.",o.osd.id]}),e.jsx("span",{className:"osd-lat-tip-host",children:o.osd.host||"?"})]}),e.jsx("div",{className:"osd-lat-tip-sep"}),e.jsxs("div",{className:"osd-lat-tip-row",children:[e.jsx("span",{className:"osd-lat-tip-key",children:r("ceph.used")}),e.jsxs("span",{className:"osd-lat-tip-val",children:[O(o.osd.used_bytes)," / ",O(o.osd.total_bytes)]})]}),e.jsxs("div",{className:"osd-lat-tip-row",children:[e.jsx("span",{className:"osd-lat-tip-key",children:"%"}),e.jsxs("span",{className:"osd-lat-tip-val",children:[h(o.osd).toFixed(1),"%"]})]}),e.jsxs("div",{className:"osd-lat-tip-row",children:[e.jsx("span",{className:"osd-lat-tip-key",children:"STATUS"}),e.jsx("span",{className:"osd-lat-tip-val",children:o.osd.status})]})]}),document.body)]})]})}function me({cluster:a,clusters:r,isPaused:l=!1}){const{t:s}=F(),[o,p]=b.useState(null),c=!a&&r&&Object.keys(r).length>0,f=b.useMemo(()=>c?Object.entries(r).filter(([i,d])=>d.ceph).map(([i,d])=>({id:i,name:d.name||i,ceph:d.ceph})):a!=null&&a.ceph?[{id:a.id,name:a.name||a.id,ceph:a.ceph}]:[],[a,r,c]);return!a&&!c?e.jsxs("div",{className:"ceph-constellation empty",children:[e.jsxs("div",{className:"empty-message",children:[e.jsx("span",{className:"loading-spinner"}),e.jsx("span",{children:s("cluster.select")})]}),e.jsx("style",{children:Y})]}):f.length===0?e.jsxs("div",{className:"ceph-constellation empty",children:[e.jsxs("div",{className:"empty-message",children:[e.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 8v4M12 16h.01"})]}),e.jsx("span",{children:s("ceph.no_cluster")})]}),e.jsx("style",{children:Y})]}):e.jsxs("div",{className:"ceph-constellation",children:[e.jsx("div",{className:"grid-floor"}),e.jsx("div",{className:"ceph-header",children:e.jsxs("h1",{className:"ceph-title font-display",children:[e.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),e.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),s("ceph.title")]})}),e.jsx("div",{className:"ceph-clusters-stack",children:f.map((i,d)=>{const j=i.ceph.health==="HEALTH_OK"?"success":i.ceph.health==="HEALTH_WARN"?"warning":"danger";return e.jsxs("div",{className:"ceph-cluster-section",children:[f.length>1&&e.jsxs("div",{className:"cluster-section-header",children:[e.jsx("span",{className:`section-health ${j}`}),e.jsx("span",{className:"section-name",children:i.name}),e.jsxs("span",{className:"section-osd",children:[i.ceph.osd_up,"/",i.ceph.osd_count," OSD"]}),e.jsx("div",{className:"section-line"})]}),e.jsx(ce,{ceph:i.ceph,clusterName:f.length===1?i.name:void 0,onOSDSelect:p,compact:f.length>1,isPaused:l})]},i.id)})}),o&&e.jsx(ee,{osd:o,onClose:()=>p(null)}),e.jsx("style",{children:Y})]})}const Y=`
  .ceph-constellation {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: var(--spacing-lg);
  }

  .ceph-constellation.empty {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    color: var(--text-secondary);
    font-family: var(--font-display);
  }

  /* Header */
  .ceph-header {
    margin-bottom: var(--spacing-lg);
  }

  .ceph-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: 22px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.12em;
  }

  .title-icon {
    stroke: var(--primary);
    filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.6));
    animation: iconSpin 20s linear infinite;
  }

  @keyframes iconSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Stacked Clusters Layout */
  .ceph-clusters-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .ceph-cluster-section {
    position: relative;
  }

  .cluster-section-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
  }

  .section-health {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .section-health.success {
    background: #00ff88;
    box-shadow: 0 0 12px #00ff88;
  }

  .section-health.warning {
    background: #ff6b00;
    box-shadow: 0 0 12px #ff6b00;
  }

  .section-health.danger {
    background: #ff0040;
    box-shadow: 0 0 12px #ff0040;
  }

  .section-name {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 600;
    color: var(--primary);
    letter-spacing: 0.1em;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
  }

  .section-osd {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
    padding: 4px 10px;
    background: rgba(20, 30, 45, 0.6);
    border: 1px solid rgba(100, 100, 120, 0.3);
    border-radius: 4px;
  }

  .section-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 240, 255, 0.4) 0%, rgba(0, 240, 255, 0) 100%);
  }

  /* Compact Cluster Layout */
  .ceph-cluster-compact {
    display: grid;
    grid-template-columns: 130px 1fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--spacing-md);
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.6) 0%, rgba(15, 25, 40, 0.4) 100%);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .compact-left {
    grid-row: span 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .compact-middle {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .compact-right {
    display: flex;
    flex-direction: column;
  }

  .compact-pools-section {
    grid-column: 2 / -1;
  }

  /* Compact Core */
  .compact-core {
    width: 120px;
    height: 120px;
  }

  .compact-core-svg {
    width: 100%;
    height: 100%;
  }

  .compact-health-text {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .compact-storage-text {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 600;
  }

  /* Compact Daemons */
  .compact-daemons {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .daemon-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .daemon-badge {
    font-family: var(--font-mono);
    font-size: 9px;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 600;
    min-width: 32px;
    text-align: center;
  }

  .daemon-badge.mon { background: rgba(0, 240, 255, 0.15); color: #00f0ff; }
  .daemon-badge.mgr { background: rgba(255, 149, 0, 0.15); color: #ff9500; }
  .daemon-badge.mds { background: rgba(255, 170, 0, 0.15); color: #ffaa00; }

  .daemon-dots {
    display: flex;
    gap: 4px;
    flex: 1;
  }

  .daemon-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    cursor: default;
  }

  .daemon-dot.mon.leader { background: #00f0ff; box-shadow: 0 0 6px #00f0ff; }
  .daemon-dot.mon.peon { background: rgba(0, 240, 255, 0.4); }
  .daemon-dot.mgr.active { background: #ff9500; box-shadow: 0 0 6px #ff9500; }
  .daemon-dot.mgr.standby { background: rgba(255, 149, 0, 0.4); }
  .daemon-dot.mds.active { background: #ffaa00; box-shadow: 0 0 6px #ffaa00; }
  .daemon-dot.mds.standby { background: rgba(255, 170, 0, 0.4); }

  .daemon-count-small {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    min-width: 16px;
    text-align: right;
  }

  /* Compact Storage */
  .compact-storage {
    padding: var(--spacing-xs) 0;
  }

  .storage-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .storage-label {
    font-family: var(--font-display);
    font-size: 9px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  .storage-value {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-primary);
  }

  .compact-bar {
    height: 4px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 2px;
    margin: 4px 0;
    overflow: hidden;
  }

  .compact-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #00ff88, #00cc6a);
    border-radius: 2px;
    transition: width 0.5s ease;
  }

  /* Compact I/O */
  .compact-io {
    display: flex;
    gap: var(--spacing-md);
    padding-top: var(--spacing-xs);
    border-top: 1px solid rgba(100, 100, 120, 0.2);
  }

  .io-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .io-arrow {
    font-size: 10px;
  }

  .io-row.read .io-arrow { color: #00ff88; }
  .io-row.write .io-arrow { color: #ff6b00; }

  .io-label {
    font-family: var(--font-display);
    font-size: 9px;
    color: var(--text-muted);
  }

  .io-val {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-secondary);
  }

  /* Compact OSD Panel */
  .compact-osd-panel {
    flex: 1;
  }

  .compact-osd-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
  }

  .compact-osd-title {
    font-family: var(--font-display);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  .compact-osd-status {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 3px;
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
  }

  .compact-osd-status:not(.all-up) {
    background: rgba(255, 107, 0, 0.1);
    color: #ff6b00;
  }

  .compact-osd-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .compact-osd {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(20, 30, 45, 0.8);
    border: 1.5px solid var(--osd-color);
    border-radius: 3px;
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 600;
    color: var(--osd-color);
    cursor: pointer;
    transition: all 0.2s ease;
    animation: compact-osd-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  }

  @keyframes compact-osd-pop {
    0% { opacity: 0; transform: scale(0); }
    100% { opacity: 1; transform: none; }
  }

  .compact-osd:hover {
    transform: scale(1.15);
    box-shadow: 0 0 10px var(--osd-color);
  }

  .compact-osd.down {
    opacity: 0.5;
  }

  /* Compact Pools */
  .compact-pools {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-xs);
    border-top: 1px solid rgba(100, 100, 120, 0.2);
  }

  .compact-pool {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    background: rgba(20, 30, 45, 0.5);
    border-radius: 4px;
    min-width: 120px;
  }

  .pool-label {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
    min-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pool-mini-bar {
    flex: 1;
    height: 4px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 2px;
    min-width: 40px;
  }

  .pool-mini-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .pool-pct {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 600;
    min-width: 30px;
    text-align: right;
  }

  .pool-more {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    padding: 4px 8px;
  }

  /* Content Layout - Full 3-column */
  /* Unified three-column layout. Column widths tuned so the core ring
     column reads as a sidebar and the two data columns share the rest;
     a single gap value keeps the vertical rhythm consistent with the
     in-column gaps. */
  .ceph-content-full {
    display: grid;
    grid-template-columns: 320px 1.15fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    /* Stretch + per-column filler panels (below) keep all three column
       bottoms on the same line instead of ragged heights. */
    align-items: stretch;
  }

  .col-core .storage-summary { flex: 1; }
  .col-daemons .pools-inline { flex: 1; }
  .pools-inline > .panel-card:last-child { flex: 1; }
  .col-osd .io-wave-panel { flex: 1; }

  /* Full-width OSD array row */
  .osd-grid-panel { margin-bottom: var(--spacing-md); }

  /* Core health ring card */
  .core-card-body {
    display: flex;
    justify-content: center;
  }

  /* Performance charts grid — scatter + usage bars side by side. */
  .ceph-charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    /* start, not stretch: the svgs keep their natural aspect, so
       stretching the cards only manufactures dead space below them. */
    align-items: start;
  }
  @media (max-width: 1100px) {
    .ceph-charts { grid-template-columns: 1fr; }
  }
  .ceph-charts .osd-lat-card { margin-bottom: 0; }
  .osd-usage-svg { width: 100%; }

  /* OSD apply-vs-commit latency scatter — surface comes from panel-card. */
  .osd-lat-card {
    margin-bottom: var(--spacing-md);
  }
  .osd-lat-svg-wrap {
    position: relative;
    padding: 12px 16px 14px;
  }
  /* No max-height cap: both chart svgs share the same aspect ratio, so
     letting them scale purely by width keeps the two cards EXACTLY the
     same height (the old 260px cap silently shortened this one). */
  .osd-lat-svg {
    width: 100%;
  }
  .osd-lat-empty {
    padding: 24px 12px;
    text-align: center;
    font-family: var(--font-mono); font-size: 12px;
    color: var(--text-muted); font-style: italic;
  }
  .osd-lat-tip {
    position: absolute;
    pointer-events: none;
    z-index: 10;
    background: linear-gradient(180deg, rgba(8, 18, 30, 0.96), rgba(2, 8, 16, 0.96));
    border: 1px solid var(--primary);
    border-radius: 4px;
    padding: 8px 12px;
    min-width: 180px;
    box-shadow: 0 4px 16px rgba(0, 240, 255, 0.25);
    font-family: var(--font-mono); font-size: 12px;
    color: var(--text-primary);
    backdrop-filter: blur(4px);
  }
  /* Portaled to <body>: fixed to the viewport so it clears any card edge.
     Capped to the viewport height in case a stacked cluster lists many OSDs. */
  .osd-lat-tip--fixed {
    position: fixed;
    z-index: 4000;
    max-height: calc(100vh - 16px);
    overflow-y: auto;
  }
  .osd-lat-tip-row {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: 12px;
    line-height: 1.5;
  }
  .osd-lat-tip-key {
    color: var(--primary);
    font-family: var(--font-display); font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .osd-lat-tip-val {
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }
  .osd-lat-tip-sep {
    height: 1px; margin: 6px 0;
    background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.35), transparent);
  }
  .osd-lat-tip-osd {
    color: var(--accent, #e066ff);
    font-weight: 600;
  }
  .osd-lat-tip-host {
    color: var(--text-muted); font-size: 11px;
  }

  @media (max-width: 1200px) {
    .ceph-content-full {
      grid-template-columns: 1fr 1fr;
    }
    .col-core {
      grid-column: span 2;
      display: flex;
      gap: var(--spacing-lg);
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .ceph-content-full {
      grid-template-columns: 1fr;
    }
    .col-core {
      grid-column: span 1;
      flex-direction: column;
      align-items: center;
    }
  }

  .col-core {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .col-daemons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .col-osd {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  /* Inline Pools in Column 2 */
  .pools-inline {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .pools-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pools-list .pool-energy-bar {
    padding: 6px 8px;
  }

  /* Legacy 2-column layout */
  .ceph-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  @media (max-width: 1200px) {
    .ceph-content {
      grid-template-columns: 1fr;
    }
  }

  /* Left Panel */
  .left-panel {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  /* Ceph Core */
  .ceph-core {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
    opacity: 1;
    transform: scale(1);
  }

  .core-svg {
    width: 100%;
    height: 100%;
  }

  .scan-line {
    animation: scanRotate 4s linear infinite;
    transform-origin: 100px 100px;
  }

  @keyframes scanRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .data-particle {
    filter: drop-shadow(0 0 4px currentColor);
  }

  .storage-ring {
    filter: drop-shadow(0 0 6px currentColor);
  }

  .rotating-ring {
    animation: rotateRing 30s linear infinite;
    transform-origin: center;
  }

  @keyframes rotateRing {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .pulse-core {
    animation: pulseCore 2s ease-in-out infinite;
  }

  @keyframes pulseCore {
    0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
    50% { filter: drop-shadow(0 0 15px currentColor); }
  }

  .inner-dots {
    animation: rotateDots 15s linear infinite reverse;
  }

  @keyframes rotateDots {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .health-text {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .storage-text {
    font-family: var(--font-mono);
    font-size: 20px;
    font-weight: 600;
  }

  .pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid;
    opacity: 0;
    pointer-events: none;
  }

  .ring-1 {
    width: 180px;
    height: 180px;
    animation: pulseRing 3s ease-out infinite;
  }

  .ring-2 {
    width: 200px;
    height: 200px;
    animation: pulseRing 3s ease-out infinite 1.5s;
  }

  .ring-3 {
    width: 220px;
    height: 220px;
    animation: pulseRing 3s ease-out infinite 0.75s;
  }

  @keyframes pulseRing {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
  }

  /* Daemon Orbital */
  /* Growth bounds: with many daemons/pools/OSD hosts the cards scroll
     INTERNALLY instead of stretching the column — keeps the three
     column bottoms aligned no matter the cluster size. */
  .daemon-orbital {
    padding-bottom: 6px;
  }
  .daemon-orbital {
    max-height: 320px;
    overflow-y: auto;
  }
  .pool-group-inline .pools-list {
    max-height: 240px;
    overflow-y: auto;
  }
  .osd-grid-panel .osd-hosts {
    max-height: 480px;
    overflow-y: auto;
  }

  .daemon-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin: 10px 16px;
  }

  .daemon-label {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    min-width: 70px;
    flex-shrink: 0;
  }

  .daemon-type {
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 3px 10px;
    border-radius: 3px;
    font-weight: 600;
  }

  .daemon-type.mon { background: rgba(0, 240, 255, 0.15); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3); }
  .daemon-type.mgr { background: rgba(255, 149, 0, 0.15); color: #ff9500; border: 1px solid rgba(255, 149, 0, 0.3); }
  .daemon-type.mds { background: rgba(180, 120, 255, 0.15); color: #b478ff; border: 1px solid rgba(180, 120, 255, 0.3); }

  .daemon-count {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-muted);
  }

  .daemon-nodes {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    flex: 1;
  }

  .daemon-node {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 12px;
    background: rgba(20, 30, 45, 0.8);
    border: 1px solid rgba(100, 100, 120, 0.3);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 13px;
    cursor: default;
    transition: all 0.2s ease;
  }

  .daemon-node:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .daemon-node.mon.leader { border-color: #00f0ff; color: #00f0ff; }
  .daemon-node.mon.peon { border-color: rgba(0, 240, 255, 0.4); color: rgba(0, 240, 255, 0.7); }
  .daemon-node.mgr.active { border-color: #ff9500; color: #ff9500; }
  .daemon-node.mgr.standby { border-color: rgba(255, 149, 0, 0.4); color: rgba(255, 149, 0, 0.7); }
  .daemon-node.mds.active { border-color: #b478ff; color: #b478ff; }
  .daemon-node.mds.standby { border-color: rgba(180, 120, 255, 0.4); color: rgba(180, 120, 255, 0.7); }

  .node-state {
    font-size: 9px;
    opacity: 0.7;
  }

  .leader-glow, .active-glow, .mds-glow {
    position: absolute;
    inset: -2px;
    border-radius: 6px;
    opacity: 0.4;
    animation: glowPulse 2s ease-in-out infinite;
  }

  .leader-glow { box-shadow: 0 0 10px #00f0ff; }
  .active-glow { box-shadow: 0 0 10px #ff9500; }
  .mds-glow { box-shadow: 0 0 10px #b478ff; }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }

  .summary-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .stat-block {
    text-align: center;
  }

  .stat-value {
    display: block;
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 600;
  }

  .stat-block.used .stat-value { color: #00ff88; }
  .stat-block.total .stat-value { color: var(--text-primary); }

  .stat-label {
    font-family: var(--font-display);
    font-size: 10px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  .stat-divider {
    font-size: 20px;
    color: var(--text-muted);
  }

  .summary-bar {
    display: flex;
    height: 8px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: var(--spacing-sm);
  }

  .bar-used {
    background: linear-gradient(90deg, #00ff88, #00cc6a);
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    transition: width 0.5s ease;
  }

  .bar-available {
    background: rgba(100, 100, 120, 0.3);
  }

  .summary-legend {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-secondary);
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  .legend-item.used .legend-dot { background: #00ff88; }
  .legend-item.available .legend-dot { background: rgba(100, 100, 120, 0.5); }

  /* Right Panel */
  .right-panel {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  /* OSD up-count chip rides in the panel-card head. */
  .panel-card-head .osd-status { margin-left: auto; }

  .osd-status {
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 3px 10px;
    border-radius: 4px;
    background: rgba(0, 255, 136, 0.1);
    color: #00ff88;
    border: 1px solid rgba(0, 255, 136, 0.3);
  }

  .osd-status:not(.all-up) {
    background: rgba(255, 107, 0, 0.1);
    color: #ff6b00;
    border-color: rgba(255, 107, 0, 0.3);
  }

  /* Tight row rhythm — the old md gap + padding made each host row eat
     ~3 rows' worth of space on big estates. */
  .osd-hosts {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .osd-host-group {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: 3px 0;
    border-bottom: 1px solid rgba(0, 240, 255, 0.08);
  }

  .osd-host-group:last-child {
    border-bottom: none;
  }

  .host-label {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.08em;
    min-width: 95px;
    padding: 5px 10px;
    background: rgba(0, 240, 255, 0.06);
    border-left: 2px solid var(--primary);
    border-radius: 0 4px 4px 0;
  }

  .osd-hexgrid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .osd-hex {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(20, 30, 45, 0.8);
    border: 1px solid var(--osd-color);
    border-radius: 3px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    animation: osd-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  }

  @keyframes osd-pop-in {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  .osd-hex::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--osd-color);
    opacity: 0.1;
    border-radius: 2px;
  }

  .osd-hex:hover {
    transform: scale(1.15);
    box-shadow: 0 0 15px var(--osd-color);
  }

  .osd-hex.down {
    opacity: 0.5;
    animation: blinkDown 1s ease-in-out infinite;
  }

  @keyframes blinkDown {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }

  .osd-id {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--osd-color);
    position: relative;
    z-index: 1;
  }

  /* I/O Wave Panel — canonical panel-card surface. */
  .io-section-label {
    margin: 14px 0 6px;
    font-family: var(--font-display);
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--text-secondary);
    border-top: 1px solid rgba(0, 240, 255, 0.1);
    padding-top: 10px;
  }
  .io-iops-svg {
    width: 100%;
    height: 64px;
    background: rgba(5, 10, 20, 0.5);
    border-radius: var(--radius-sm);
  }

  .io-canvas {
    width: 100%;
    height: 100px;
    border-radius: var(--radius-sm);
    background: rgba(5, 10, 20, 0.5);
    margin-bottom: var(--spacing-md);
  }

  .io-stats {
    display: flex;
    gap: var(--spacing-lg);
  }

  .io-stat {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm);
    background: rgba(20, 30, 45, 0.5);
    border-radius: var(--radius-sm);
  }

  .io-icon {
    font-size: 13px;
  }

  .io-stat.read .io-icon { color: #00ff88; }
  .io-stat.write .io-icon { color: #ff6b00; }

  .io-label {
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    min-width: 45px;
  }

  .io-value {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 600;
  }

  .io-stat.read .io-value { color: #00ff88; }
  .io-stat.write .io-value { color: #ff6b00; }

  .io-ops {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
    width: 100%;
    text-align: right;
  }

  /* Pools Section */
  .pools-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .pool-group {
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.8) 0%, rgba(15, 25, 40, 0.6) 100%);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .pool-group-title {
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
    margin-bottom: var(--spacing-md);
  }

  .pools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-sm);
  }

  .pool-energy-bar {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(20, 30, 45, 0.5);
    border-radius: var(--radius-sm);
    opacity: 1;
    transform: translateX(0);
  }

  .pool-info {
    min-width: 120px;
  }

  .pool-name {
    display: block;
    font-family: var(--font-mono);
    font-size: 16px !important;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pool-size {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-muted);
  }

  .energy-track {
    flex: 1;
    height: 8px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .energy-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .energy-glow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    opacity: 0.3;
    filter: blur(4px);
    transition: width 0.5s ease;
  }

  .pool-percent {
    min-width: 40px;
    text-align: right;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 600;
  }

  /* OSD Popup */
  .osd-popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .osd-popup {
    background: linear-gradient(135deg, rgba(15, 25, 40, 0.98) 0%, rgba(10, 18, 30, 0.98) 100%);
    border: 1px solid rgba(0, 240, 255, 0.4);
    border-radius: var(--radius-md);
    min-width: 280px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 240, 255, 0.2);
    animation: popupIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes popupIn {
    from { transform: scale(0.9) translateY(20px); opacity: 0; }
    to { transform: none; opacity: 1; }
  }

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
  }

  .popup-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .status-badge {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 3px;
    font-weight: 600;
  }

  .status-badge.up { background: rgba(0, 255, 136, 0.15); color: #00ff88; }
  .status-badge.down { background: rgba(255, 0, 64, 0.15); color: #ff0040; }

  .osd-name {
    font-family: var(--font-display);
    font-size: 16px;
    color: var(--primary);
  }

  .popup-close {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.2s ease;
  }

  .popup-close:hover { color: var(--text-primary); }

  .popup-content {
    padding: var(--spacing-md);
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-xs) 0;
    border-bottom: 1px solid rgba(100, 100, 120, 0.1);
  }

  .info-label {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-muted);
  }

  .info-value {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-primary);
  }

  .storage-section {
    margin-top: var(--spacing-md);
  }

  .storage-bar {
    height: 8px;
    background: rgba(30, 40, 55, 0.8);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: var(--spacing-xs);
  }

  .storage-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .storage-fill.success { background: linear-gradient(90deg, #00ff88, #00cc6a); }
  .storage-fill.warning { background: linear-gradient(90deg, #ffaa00, #ff6b00); }
  .storage-fill.danger { background: linear-gradient(90deg, #ff4466, #ff0040); }

  .storage-stats {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-secondary);
  }

  .latency-section {
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(100, 100, 120, 0.2);
  }

  .latency-title {
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    margin-bottom: var(--spacing-xs);
  }

  .latency-grid {
    display: flex;
    gap: var(--spacing-md);
  }

  .latency-item {
    flex: 1;
    text-align: center;
  }

  .latency-label {
    display: block;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    margin-bottom: 2px;
  }

  .latency-value {
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
  }

  .text-success { color: #00ff88 !important; }
  .text-warning { color: #ff6b00 !important; }
  .text-danger { color: #ff0040 !important; }
`;export{me as CephConstellation};
