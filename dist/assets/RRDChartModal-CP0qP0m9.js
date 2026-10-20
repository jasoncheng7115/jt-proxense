import{u as G,r as k,j as e}from"./index-DeG9m4sY.js";const K=["hour","day","week","month","year"],u=i=>{if(!isFinite(i)||i===0)return"0";const s=["B","K","M","G","T"];let d=0,x=i;for(;x>=1024&&d<s.length-1;)x/=1024,d++;return`${x.toFixed(x>=10?0:1)}${s[d]}`},S=i=>u(i)+"/s",W=i=>`${(i*100).toFixed(0)}%`;function V({open:i,onClose:s,clusterId:d,node:x,vmid:T,storage:w,kind:m,title:f}){const{t:a,language:v}=G(),[g,$]=k.useState("hour"),[l,I]=k.useState([]),[N,U]=k.useState(!1),[z,E]=k.useState(null);return k.useEffect(()=>{if(!i)return;let r=!0;return(async()=>{U(!0),E(null);try{const p=encodeURIComponent(d),h=encodeURIComponent(x),P=m==="node"?`/api/clusters/${p}/nodes/${h}/rrddata`:m==="qemu"?`/api/clusters/${p}/nodes/${h}/qemu/${T}/rrddata`:m==="lxc"?`/api/clusters/${p}/nodes/${h}/lxc/${T}/rrddata`:`/api/clusters/${p}/nodes/${h}/storage/${encodeURIComponent(w||"")}/rrddata`,F=await fetch(`${P}?timeframe=${g}`,{credentials:"same-origin"});if(!F.ok){const C=await F.json().catch(()=>({}));throw new Error(C.error||`HTTP ${F.status}`)}const B=await F.json();if(!r)return;I((B.samples||[]).filter(C=>C&&C.time))}catch(p){r&&E(p.message||String(p))}finally{r&&U(!1)}})(),()=>{r=!1}},[i,d,x,T,w,m,g]),i?e.jsx("div",{className:"rrd-back",onClick:s,children:e.jsxs("div",{className:"rrd-modal",onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"rrd-head",children:[e.jsxs("div",{className:"rrd-title",children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),e.jsx("polyline",{points:"14 7 21 7 21 14"})]}),e.jsx("span",{children:a("rrd.title")}),f&&e.jsx("span",{className:"rrd-target",children:f})]}),e.jsxs("div",{className:"rrd-tfs",children:[K.map(r=>e.jsx("button",{className:`rrd-tf ${r===g?"on":""}`,onClick:()=>$(r),children:a(`rrd.tf.${r}`)},r)),e.jsx("button",{className:"rrd-close",onClick:s,"aria-label":"close",children:"×"})]})]}),e.jsxs("div",{className:"rrd-body",children:[z&&e.jsx("div",{className:"rrd-error",children:z}),N&&l.length===0&&e.jsx("div",{className:"rrd-loading",children:a("rrd.loading")}),!N&&l.length===0&&!z&&e.jsx("div",{className:"rrd-loading",children:a("rrd.empty")}),l.length>0&&m==="storage"&&e.jsxs("div",{className:"rrd-grid",children:[e.jsx(b,{title:a("rrd.chart.usage_pct"),samples:l,color:"#00f0ff",series:[{key:"pct",label:"Used %",fmt:r=>`${(r*100).toFixed(0)}%`,scale:r=>{const p=r.used??null,h=r.total??null;return p==null||h==null||h===0?null:p/h}}],yMax:1,yFmt:r=>`${(r*100).toFixed(0)}%`}),e.jsx(b,{title:a("rrd.chart.usage_bytes"),samples:l,color:"#bf00ff",series:[{key:"used",label:"Used",fmt:u,scale:r=>r.used??null,color:"#00f0ff"},{key:"total",label:"Total",fmt:u,scale:r=>r.total??null,color:"#bf00ff"}],yFmt:u})]},g),l.length>0&&m!=="storage"&&e.jsxs("div",{className:"rrd-grid",children:[e.jsx(b,{title:a("rrd.chart.cpu"),samples:l,color:"#00f0ff",series:[{key:"cpu",label:"CPU",fmt:W,scale:r=>r.cpu??null}],yMax:1,yFmt:W}),m==="node"?e.jsx(b,{title:a("rrd.chart.mem"),samples:l,color:"#00ff88",series:[{key:"memused",label:a("rrd.s.used"),fmt:u,scale:r=>r.memused??null,color:"#00ff88"},{key:"arcsize",label:a("rrd.s.arc"),fmt:u,scale:r=>r.arcsize??null,color:"#00f0ff"}],yFmt:u,fillTop:r=>r.memtotal}):e.jsx(b,{title:a("rrd.chart.mem"),samples:l,color:"#00ff88",series:[{key:"mem",label:"Mem",fmt:r=>u(r),scale:r=>r.mem??null}],yFmt:u,fillTop:r=>r.maxmem}),e.jsx(b,{title:a("rrd.chart.net"),samples:l,color:"#ff8a3c",series:[{key:"netin",label:"In",fmt:S,scale:r=>r.netin??null,color:"#ff8a3c"},{key:"netout",label:"Out",fmt:S,scale:r=>r.netout??null,color:"#bf00ff"}],yFmt:S}),m==="node"?e.jsxs(e.Fragment,{children:[e.jsx(b,{title:a("rrd.chart.iowait"),samples:l,color:"#ffcc00",series:[{key:"iowait",label:a("rrd.s.iodelay"),fmt:W,scale:r=>r.iowait??null,color:"#ffcc00"}],yFmt:W,yFloor:.05}),e.jsx(b,{title:a("rrd.chart.rootfs"),samples:l,color:"#bf00ff",series:[{key:"rootused",label:a("rrd.s.used"),fmt:u,scale:r=>r.rootused??null,color:"#bf00ff"}],yFmt:u,fillTop:r=>r.roottotal})]}):e.jsx(b,{title:a("rrd.chart.disk"),samples:l,color:"#bf00ff",series:[{key:"diskread",label:"Read",fmt:S,scale:r=>r.diskread??null,color:"#00f0ff"},{key:"diskwrite",label:"Write",fmt:S,scale:r=>r.diskwrite??null,color:"#bf00ff"}],yFmt:S})]},g)]}),e.jsx("style",{children:`
          .rrd-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; justify-content: center; align-items: center; z-index: 10000; }
          .rrd-modal { width: min(1000px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: rrd-in .18s ease-out; overflow: hidden; }
          @keyframes rrd-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .rrd-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .rrd-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .rrd-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 13.5px; letter-spacing: .04em; text-transform: none; }
          .rrd-tfs { display: flex; gap: 4px; align-items: center; }
          .rrd-tf { padding: 4px 12px; border: 1px solid rgba(0,240,255,.2); background: rgba(0,240,255,.04); color: var(--text-secondary); font-family: var(--font-display); font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
          .rrd-tf:hover { color: var(--primary); border-color: rgba(0,240,255,.4); }
          .rrd-tf.on { color: var(--primary); border-color: var(--primary); background: rgba(0,240,255,.12); }
          .rrd-close { margin-left: 8px; background: transparent; border: none; color: var(--text-secondary); font-size: 22px; cursor: pointer; padding: 0 8px; line-height: 1; }
          .rrd-close:hover { color: var(--primary); }
          .rrd-body { flex: 1; overflow: auto; padding: 14px 18px; }
          .rrd-grid { display: grid; gap: 14px; grid-template-columns: 1fr 1fr; }
          .rrd-loading, .rrd-error { padding: 40px 12px; text-align: center; font-family: var(--font-mono); font-size: 13px; }
          .rrd-loading { color: var(--text-muted); font-style: italic; }
          .rrd-error { color: var(--danger, #ff4d6d); }
          @media (max-width: 700px) { .rrd-grid { grid-template-columns: 1fr; } }
        `})]})}):null}function b({title:i,samples:s,series:d,yMax:x,yFmt:T,fillTop:w,yFloor:m}){var X,Y;const{width:f,height:a}={width:460,height:160},v=48,g=8,$=10,l=22,I=k.useMemo(()=>{if(typeof x=="number")return x;let t=m??1;for(const o of s){const n=w==null?void 0:w(o);n&&n>t&&(t=n);for(const M of d){const c=M.scale(o);c!=null&&c>t&&(t=c)}}return t*1.1},[s,d,w,x,m]),N=((X=s[0])==null?void 0:X.time)||0,U=((Y=s[s.length-1])==null?void 0:Y.time)||N+1,z=Math.max(1,U-N),E=t=>v+(t-N)/z*(f-v-g),r=t=>$+(1-t/I)*(a-$-l),p=t=>{let o="",n=!1;for(const M of s){const c=t.scale(M);if(c==null||!isFinite(c)){n=!1;continue}const L=E(M.time),y=r(c);o+=(n?" L ":" M ")+L.toFixed(1)+","+y.toFixed(1),n=!0}return o},h=[0,.25,.5,.75,1].map(t=>I*(1-t)),P=k.useRef(null),[F,B]=k.useState(null),C=t=>{const o=P.current;if(!o||s.length===0)return;const n=o.getBoundingClientRect(),c=(t.clientX-n.left)/n.width*f;if(c<v||c>f-g){B(null);return}const L=N+(c-v)/(f-v-g)*z;let y=0,D=s.length-1;for(;y<D;){const H=y+D>>1;s[H].time<L?y=H+1:D=H}y>0&&Math.abs(s[y-1].time-L)<Math.abs(s[y].time-L)&&y--,B(y)},q=()=>B(null),j=F==null?null:s[F],R=j?E(j.time):0,A=t=>{const o=new Date(t*1e3),n=M=>M.toString().padStart(2,"0");return`${o.getMonth()+1}/${n(o.getDate())} ${n(o.getHours())}:${n(o.getMinutes())}`},_=j?R>f/2:!1;return e.jsxs("div",{className:"rrd-card",children:[e.jsxs("div",{className:"rrd-card-head",children:[e.jsx("div",{className:"rrd-card-title",children:i}),e.jsx("div",{className:"rrd-card-legend",children:d.map(t=>e.jsxs("span",{children:[e.jsx("span",{className:"dot",style:{background:t.color||"#00f0ff"}}),t.label]},t.key))})]}),e.jsxs("div",{className:"rrd-svg-wrap",children:[e.jsxs("svg",{ref:P,viewBox:`0 0 ${f} ${a}`,className:"rrd-svg",onMouseMove:C,onMouseLeave:q,children:[h.map((t,o)=>{const n=$+o/4*(a-$-l);return e.jsxs("g",{children:[e.jsx("line",{x1:v,y1:n,x2:f-g,y2:n,stroke:"rgba(0,240,255,.08)"}),e.jsx("text",{x:v-4,y:n+3,textAnchor:"end",fontSize:"9",fill:"rgba(160,180,200,.6)",fontFamily:"Share Tech Mono, monospace",children:T(t)})]},o)}),d.map(t=>e.jsx("path",{d:p(t),fill:"none",stroke:t.color||"#00f0ff",strokeWidth:"1.3",opacity:"0.95"},t.key)),j&&e.jsxs("g",{pointerEvents:"none",children:[e.jsx("line",{x1:R,y1:$,x2:R,y2:a-l,stroke:"rgba(0, 240, 255, 0.45)",strokeWidth:"1",strokeDasharray:"3 3"}),d.map(t=>{const o=t.scale(j);return o==null||!isFinite(o)?null:e.jsx("circle",{cx:R,cy:r(o),r:"3.5",fill:t.color||"#00f0ff",stroke:"#021018",strokeWidth:"1.5",style:{filter:`drop-shadow(0 0 4px ${t.color||"#00f0ff"})`}},t.key)})]})]}),j&&e.jsxs("div",{className:"rrd-tip",style:_?{right:`${100-R/f*100+1.5}%`}:{left:`${R/f*100+1.5}%`},children:[e.jsx("div",{className:"rrd-tip-time",children:A(j.time)}),d.map(t=>{const o=t.scale(j);return o==null||!isFinite(o)?null:e.jsxs("div",{className:"rrd-tip-row",children:[e.jsx("span",{className:"rrd-tip-dot",style:{background:t.color||"#00f0ff"}}),e.jsx("span",{className:"rrd-tip-key",children:t.label}),e.jsx("span",{className:"rrd-tip-val",children:t.fmt(o)})]},t.key)})]})]}),e.jsx("style",{children:`
        .rrd-card {
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.15);
          border-radius: 4px;
          padding: 10px 12px;
          animation: rrd-card-fade 0.32s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes rrd-card-fade {
          from { opacity: 0; transform: translateY(6px) scale(0.985); }
          to   { opacity: 1; transform: none; }
        }
        .rrd-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .rrd-card-title { font-family: var(--font-display); font-size: 12.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-primary); }
        .rrd-card-legend { display: flex; gap: 10px; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-secondary); }
        .rrd-card-legend .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; box-shadow: 0 0 6px currentColor; vertical-align: 1px; }
        .rrd-svg-wrap { position: relative; }
        .rrd-svg { width: 100%; height: 160px; display: block; }
        .rrd-tip {
          position: absolute; top: 4px;
          background: linear-gradient(180deg, rgba(8, 18, 30, 0.96), rgba(2, 8, 16, 0.96));
          border: 1px solid var(--primary);
          border-radius: 4px;
          padding: 6px 10px;
          box-shadow: 0 4px 16px rgba(0, 240, 255, 0.25);
          font-family: var(--font-mono); font-size: 12.5px;
          color: var(--text-primary);
          pointer-events: none;
          z-index: 4;
          min-width: 140px;
          backdrop-filter: blur(4px);
        }
        .rrd-tip-time {
          font-family: var(--font-display); font-size: 11.5px;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--primary);
          padding-bottom: 4px; margin-bottom: 4px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.22);
        }
        .rrd-tip-row { display: flex; align-items: baseline; gap: 6px; line-height: 1.6; }
        .rrd-tip-dot { width: 7px; height: 7px; border-radius: 50%; box-shadow: 0 0 4px currentColor; flex-shrink: 0; }
        .rrd-tip-key { color: var(--text-secondary); flex: 1; }
        .rrd-tip-val { color: var(--text-primary); font-variant-numeric: tabular-nums; }
      `})]})}export{V as R};
