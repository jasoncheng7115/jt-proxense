import{u as ne,a as ce,r as o,j as e,e as pe,h as R,R as xe}from"./index-HzkmC-WK.js";import{C as ae}from"./CyberSelect-BGKzR2ZN.js";function ze({state:a,onClose:i,onShowDetails:l,onPowerAction:x,onOpenConsole:d,onOpenSnapshots:r,onBackupNow:g,onRemoteMigrate:w,onShowPerf:v,onShowBackupHistory:_,onShowConfig:M,onShowFirewall:C,onEditTags:P,onClone:$,onMigrate:j,onDelete:B,onConvertTemplate:f,onOpenSerialConsole:V,onExportFormat:y,getNodeHealth:E,userRole:u,consoleMode:O,consolePasswordSet:D,consoleCaps:F,hideSnapshots:c,hideBackup:z,hideRemoteMigrate:Z,hideConsole:I}){const{t:p}=ne(),te=ce(),H=o.useRef(null),[K,Q]=o.useState({left:a.x,top:a.y,maxHeight:0});if(o.useLayoutEffect(()=>{if(!a.visible)return;const n=H.current;if(!n)return;const k=n.getBoundingClientRect(),N=8,A=window.innerWidth,G=window.innerHeight;let q=a.x,b=a.y,ee=0;q+k.width>A-N&&(q=Math.max(N,a.x-k.width));const J=G-a.y-N,re=a.y-N;k.height<=J?b=a.y:k.height<=re?b=Math.max(N,a.y-k.height):k.height<=G-2*N?b=N:(b=N,ee=G-2*N),(q!==K.left||b!==K.top||ee!==K.maxHeight)&&Q({left:q,top:b,maxHeight:ee})},[a.visible,a.x,a.y]),o.useEffect(()=>{const n=()=>i(),k=A=>{H.current&&A.target instanceof Node&&H.current.contains(A.target)||i()},N=A=>{A.key==="Escape"&&i()};return a.visible&&(document.addEventListener("click",n),document.addEventListener("scroll",k,!0),document.addEventListener("keydown",N)),()=>{document.removeEventListener("click",n),document.removeEventListener("scroll",k,!0),document.removeEventListener("keydown",N)}},[a.visible,i]),!a.visible||!a.vm)return null;const s=a.vm,L=E(a.clusterId,s.node),X=L?`https://${L.host}:${L.port}/#v1:0:=${s.type}/${s.vmid}`:null,Y=n=>{n.stopPropagation(),X&&window.open(X,"_blank","noopener,noreferrer"),i()},T=n=>{n.stopPropagation(),l(),i()},W=e.jsxs("div",{ref:H,className:"vm-context-menu",style:{left:K.left,top:K.top,...K.maxHeight>0?{maxHeight:K.maxHeight,overflowY:"auto"}:{}},onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{className:"context-menu-header",children:[e.jsx("span",{className:"context-menu-name",children:s.name}),e.jsxs("span",{className:"context-menu-id",children:["#",s.vmid]})]}),e.jsx("div",{className:"context-menu-divider"}),e.jsxs("button",{className:"context-menu-item",onClick:T,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),e.jsx("span",{children:p("vm.details")})]}),X&&e.jsxs("button",{className:"context-menu-item",onClick:Y,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),e.jsx("polyline",{points:"15,3 21,3 21,9"}),e.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),e.jsx("span",{children:p("vm.open_pve")})]}),!I&&(u==="operator"||u==="admin")&&(()=>{const n=s.type==="lxc",k=O==="disabled"?"console.disabled":s.status!=="running"?"console.vm_not_running":null,N=!!k,A=e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),e.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),e.jsx("polyline",{points:"6 8 9 11 6 14"}),e.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),G=e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"4 17 10 11 4 5"}),e.jsx("line",{x1:"12",y1:"19",x2:"20",y2:"19"})]}),q=J=>re=>{if(re.stopPropagation(),N){i(),te.alert(p(k));return}J(),i()},b=!n&&(F==null?void 0:F.xterm)&&V,ee=!n&&(F==null?void 0:F.spice);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:`context-menu-item ${N?"is-disabled":""}`,title:N?p(k):void 0,onClick:q(d),children:[A,e.jsx("span",{children:p(n?"vm.console_xterm":"vm.console_novnc")})]}),b&&e.jsxs("button",{className:`context-menu-item ${N?"is-disabled":""}`,title:N?p(k):void 0,onClick:q(V),children:[G,e.jsx("span",{children:p("vm.console_xterm_serial")})]}),ee&&e.jsxs("button",{className:"context-menu-item is-disabled",title:p("vm.console_spice_unsupported"),onClick:J=>{J.stopPropagation(),i(),te.alert(p("vm.console_spice_unsupported"))},children:[G,e.jsx("span",{children:p("vm.console_spice")})]})]})})(),!c&&(u==="operator"||u==="admin")&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),r(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M12 7v5l3 2"})]}),e.jsx("span",{children:p("vm.snapshots")})]}),e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation();const k=`/tasks?vmid=${encodeURIComponent(String(s.vmid))}&cluster=${encodeURIComponent(a.clusterId)}`;window.history.pushState(null,"",k),window.dispatchEvent(new PopStateEvent("popstate")),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),e.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"})]}),e.jsx("span",{children:p("vm.task_history")})]}),v&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),v(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),e.jsx("polyline",{points:"14 7 21 7 21 14"})]}),e.jsx("span",{children:p("vm.perf_charts")})]}),_&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),_(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),e.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),e.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),e.jsx("span",{children:p("vm.backup_history")})]}),M&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),M(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),e.jsx("line",{x1:"8",y1:"21",x2:"16",y2:"21"}),e.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"21"})]}),e.jsx("span",{children:p("vm.config_view")})]}),C&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),C(),i()},children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"})}),e.jsx("span",{children:p("vm.firewall")})]}),P&&(u==="operator"||u==="admin")&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),P(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),e.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]}),e.jsx("span",{children:p("vm.edit_tags")})]}),!z&&(u==="operator"||u==="admin")&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),g(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),e.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),e.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),e.jsx("span",{children:p("vm.backup_now")})]}),(u==="operator"||u==="admin")&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"context-menu-divider"}),s.status!=="running"&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),x({vm:s,clusterId:a.clusterId,action:"start"}),i()},children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("polygon",{points:"6,4 20,12 6,20"})}),e.jsx("span",{children:p("vm.start")})]}),s.status==="running"&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),x({vm:s,clusterId:a.clusterId,action:"shutdown"}),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),e.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),e.jsx("span",{children:p("vm.shutdown_acpi")})]}),e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),x({vm:s,clusterId:a.clusterId,action:"reboot"}),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23,4 23,10 17,10"}),e.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),e.jsx("span",{children:p("vm.reboot")})]}),e.jsxs("button",{className:"context-menu-item danger",onClick:n=>{n.stopPropagation(),x({vm:s,clusterId:a.clusterId,action:"stop"}),i()},children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),e.jsx("span",{children:p("vm.stop_hard")})]})]})]}),($||j||B)&&(u==="operator"||u==="admin")&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"context-menu-divider"}),j&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),j(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"17 1 21 5 17 9"}),e.jsx("path",{d:"M3 11V9a4 4 0 0 1 4-4h14"}),e.jsx("polyline",{points:"7 23 3 19 7 15"}),e.jsx("path",{d:"M21 13v2a4 4 0 0 1-4 4H3"})]}),e.jsx("span",{children:p("vm.migrate")})]}),$&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),$(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),e.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]}),e.jsx("span",{children:p("vm.clone")})]}),y&&s.type==="qemu"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"context-menu-subhead",children:p("vm.export_other")}),e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),y("ova"),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),e.jsx("span",{children:p("vm.export_ova")})]}),e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),y("hyperv"),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"8",height:"8",rx:"1"}),e.jsx("rect",{x:"13",y:"3",width:"8",height:"8",rx:"1"}),e.jsx("rect",{x:"3",y:"13",width:"8",height:"8",rx:"1"}),e.jsx("rect",{x:"13",y:"13",width:"8",height:"8",rx:"1"})]}),e.jsx("span",{children:p("vm.export_hyperv")})]}),e.jsxs("button",{className:"context-menu-item is-disabled",onClick:n=>n.stopPropagation(),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"12",cy:"12",r:"1"}),e.jsx("circle",{cx:"19",cy:"12",r:"1"}),e.jsx("circle",{cx:"5",cy:"12",r:"1"})]}),e.jsx("span",{children:p("vm.export_more")})]})]}),f&&u==="admin"&&s.type!=="lxc"&&e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),f(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1"})]}),e.jsx("span",{children:p("vm.to_template")})]}),B&&u==="admin"&&e.jsxs("button",{className:"context-menu-item danger",onClick:n=>{n.stopPropagation(),B(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"}),e.jsx("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),e.jsx("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]}),e.jsx("span",{children:p("vm.delete")})]})]}),!Z&&u==="admin"&&s.type!=="lxc"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"context-menu-divider"}),e.jsxs("button",{className:"context-menu-item",onClick:n=>{n.stopPropagation(),w(),i()},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M3 12h12"}),e.jsx("polyline",{points:"13 6 19 12 13 18"}),e.jsx("circle",{cx:"20",cy:"6",r:"2"}),e.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),e.jsx("span",{children:p("vm.migrate_remote")})]})]}),e.jsx("style",{children:`
        .vm-context-menu {
          position: fixed;
          z-index: 1000;
          min-width: 220px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: var(--radius-md);
          box-shadow:
            0 0 0 1px rgba(0, 240, 255, .12),
            0 16px 60px rgba(0, 0, 0, .65),
            0 0 80px -20px rgba(0, 240, 255, .55),
            0 0 24px -6px rgba(0, 240, 255, .35);
          padding: var(--spacing-sm);
          animation: context-menu-appear 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(8px);
        }
        /* Cyberpunk-themed scrollbar — only visible when the menu has
           been clamped to fit a short viewport (maxHeight applied
           inline). Otherwise the inner content sits at natural height
           and no scrollbar shows. */
        .vm-context-menu::-webkit-scrollbar { width: 8px; }
        .vm-context-menu::-webkit-scrollbar-track {
          background: rgba(0, 240, 255, .04);
          border-radius: 4px;
        }
        .vm-context-menu::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg,
            rgba(0, 240, 255, .35),
            rgba(0, 240, 255, .15));
          border-radius: 4px;
        }
        .vm-context-menu::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg,
            rgba(0, 240, 255, .55),
            rgba(0, 240, 255, .25));
        }
        @keyframes context-menu-appear {
          0%   { opacity: 0; transform: scale(0.9) translateY(-5px); }
          100% { opacity: 1; transform: none; }
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
        .context-menu-subhead {
          padding: 6px var(--spacing-sm) 2px;
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
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
      `})]});return pe.createPortal(W,document.body)}const he=a=>{if(!a)return"—";const i=a/1024**3;return i>=100?`${i.toFixed(0)}G`:`${i.toFixed(1)}G`};function Me({open:a,cluster_id:i,vm:l,onClose:x,onMigrationStarted:d}){const{t:r}=ne(),[g,w]=o.useState("endpoint"),[v,_]=o.useState([]),[M,C]=o.useState(""),[P,$]=o.useState(""),[j,B]=o.useState(!1),[f,V]=o.useState(null),[y,E]=o.useState(null),[u,O]=o.useState(!1),[D,F]=o.useState({}),[c,z]=o.useState({}),[Z,I]=o.useState(""),[p,te]=o.useState(""),[H,K]=o.useState(!0),[Q,s]=o.useState(!1),[L,X]=o.useState(""),[Y,T]=o.useState(""),[W,n]=o.useState(""),[k,N]=o.useState(null),[A,G]=o.useState(!1),q=async()=>{if(!(!l||!b)){G(!0),N(null),T("");try{const t=await R.migrationPrecheck(i,l.vmid,b.cluster_id,b.node_name||b.node_host);N({ok:t.ok,blockers:t.blockers,warnings:t.warnings})}catch(t){const m=t instanceof Error?t.message:String(t);T(`pre-flight check failed: ${m}`)}finally{G(!1)}}};o.useEffect(()=>{a&&(w("endpoint"),_([]),C(""),$(""),V(null),E(null),F({}),z({}),I(""),te(l?String(l.vmid):""),X(""),T(""),n(""),N(null),R.listRemoteEndpoints(i).then(t=>_(t.endpoints)).catch(t=>T(`could not list target clusters: ${t.message||t}`)),l&&R.getMigrationSource(i,l.vmid).then(V).catch(t=>T(`could not introspect source VM: ${t.message||t}`)))},[a,i,l]),o.useEffect(()=>{if(!a)return;const t=m=>{m.key==="Escape"&&g!=="submitting"&&x()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[a,g,x]);const b=v.find(t=>oe(t)===M),ee=async t=>{var S;C(t);const m=v.find(h=>oe(h)===t);if(m){B(!0),O(!0),T(""),E(null),I("");try{const h=await R.fetchRemoteFingerprint(m.node_host,m.node_port);$(h.fingerprint)}catch(h){const U=h instanceof Error?h.message:String(h);T(`could not auto-fetch fingerprint (${U}); paste manually`),$("")}finally{B(!1)}try{const h=m.node_name||m.node_host,U=await R.getMigrationTargets(m.cluster_id,h);E(U);const se=U.ips.find(me=>me.address===m.node_host);I(se?se.address:((S=U.ips[0])==null?void 0:S.address)||m.node_host)}catch(h){const U=h instanceof Error?h.message:String(h);T(`could not enumerate target node resources: ${U}`)}finally{O(!1)}}};o.useEffect(()=>{!f||!y||(F(t=>{const m={...t};return f.disks.forEach(S=>{var h;if(!m[S.key]){const U=y.storages.find(se=>se.storage===S.storage);m[S.key]=((h=U||y.storages[0])==null?void 0:h.storage)||""}}),m}),z(t=>{const m={...t};return f.nics.forEach(S=>{var h;if(!m[S.key]){const U=y.bridges.find(se=>se.iface===S.bridge);m[S.key]=((h=U||y.bridges[0])==null?void 0:h.iface)||""}}),m}))},[f,y]);const J=o.useMemo(()=>{if(!f)return"";const t=new Set,m=new Map;return f.disks.forEach(S=>{const h=D[S.key];S.storage&&h&&(m.set(S.storage,h),t.add(h))}),t.size===1?Array.from(t)[0]:Array.from(m.entries()).map(([S,h])=>`${S}=${h}`).join(",")},[f,D]),re=o.useMemo(()=>{if(!f)return"";const t=new Set,m=new Map;return f.nics.forEach(S=>{const h=c[S.key];S.bridge&&h&&(m.set(S.bridge,h),t.add(h))}),t.size===1?Array.from(t)[0]:Array.from(m.entries()).map(([S,h])=>`${S}=${h}`).join(",")},[f,c]),le=async()=>{if(!(!l||!b)){w("submitting"),T("");try{const t=await R.remoteMigrate(i,l.vmid,{target_cluster_id:b.cluster_id,target_endpoint_host:Z||b.node_host,target_endpoint_port:b.node_port,target_endpoint_fingerprint:P||void 0,target_vmid:parseInt(p,10),target_bridge_map:re,target_storage_map:J,online:H,delete_source:Q,bwlimit:L?parseInt(L,10):void 0});n(t.upid),w("done"),d==null||d(t.upid)}catch(t){const m=t instanceof Error?t.message:String(t);T(m),w("error")}}};if(!a||!l)return null;const de=!!p&&/^\d+$/.test(p)&&!!f&&!!y&&f.disks.every(t=>!!D[t.key])&&f.nics.every(t=>!!c[t.key]),ie=g==="endpoint"?!!b&&!!y&&!!Z:g==="mappings"?de:!0;return e.jsxs("div",{onClick:()=>g!=="submitting"&&x(),style:fe,children:[e.jsx("style",{children:ue}),e.jsxs("div",{className:"rmm",onClick:t=>t.stopPropagation(),children:[e.jsx("div",{className:"rmm-eyebrow",children:r("rmm.eyebrow",{step:r(`rmm.step.${g}`)})}),e.jsx("h3",{className:"rmm-title",children:r("rmm.title",{vmid:l.vmid,name:l.name})}),g==="endpoint"&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"rmm-sub",children:r("rmm.endpoint.intro")}),e.jsx("label",{children:r("rmm.endpoint.target")}),e.jsx(ae,{value:M,placeholder:r("rmm.endpoint.select"),options:v.map(t=>({value:oe(t),label:`${t.cluster_name} @ ${t.node_host}:${t.node_port}`})),onChange:t=>ee(t)}),e.jsx("label",{children:r("rmm.endpoint.fp_label")}),e.jsx("input",{type:"text",value:P,onChange:t=>$(t.target.value),placeholder:j?r("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),b&&e.jsxs(e.Fragment,{children:[e.jsxs("label",{children:[r("rmm.endpoint.datapath")," ",e.jsx("span",{className:"hint",children:r("rmm.endpoint.datapath_hint")})]}),e.jsx(ae,{value:Z,disabled:u||!y,placeholder:u?r("rmm.endpoint.datapath_loading"):"",options:u?[]:!y||y.ips.length===0?[{value:b.node_host,label:`${b.node_host} (mgmt)`}]:y.ips.map(t=>({value:t.address,label:`${t.address} · ${t.iface} (${t.type})`})),onChange:t=>I(t)}),e.jsx("p",{className:"rmm-tip",children:r("rmm.endpoint.datapath_tip")})]}),Y&&e.jsx("div",{className:"rmm-err",children:Y}),e.jsxs("div",{className:"rmm-actions",children:[e.jsx("button",{className:"ghost",onClick:x,children:r("action.cancel")}),e.jsx("button",{className:"primary",disabled:!ie,onClick:()=>w("mappings"),children:r("rmm.action.next")})]})]}),g==="mappings"&&b&&f&&y&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"rmm-sub",children:r("rmm.mappings.intro")}),e.jsxs("label",{children:[r("rmm.mappings.target_vmid")," ",e.jsx("span",{className:"hint",children:r("rmm.mappings.target_vmid_hint")})]}),e.jsx("input",{type:"text",inputMode:"numeric",value:p,onChange:t=>te(t.target.value)}),f.disks.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("label",{children:r("rmm.mappings.disks")}),e.jsxs("div",{className:"rmm-maptable",children:[e.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[e.jsx("span",{children:r("rmm.mappings.col_source")}),e.jsx("span",{children:r("rmm.mappings.col_size")}),e.jsx("span",{children:r("rmm.mappings.col_target_storage")})]}),f.disks.map(t=>e.jsxs("div",{className:"rmm-maprow",children:[e.jsx("code",{className:"rmm-mapkey",children:t.key}),e.jsxs("code",{className:"rmm-mapsrc",children:[t.storage," ",e.jsx("em",{children:t.size})]}),e.jsx(ae,{value:D[t.key]||"",options:y.storages.map(m=>({value:m.storage,label:`${m.storage} (${m.type}, ${he(m.avail)} free)`})),onChange:m=>F({...D,[t.key]:m})})]},t.key))]})]}),f.nics.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("label",{children:r("rmm.mappings.nics")}),e.jsxs("div",{className:"rmm-maptable",children:[e.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[e.jsx("span",{children:r("rmm.mappings.col_source")}),e.jsx("span",{children:r("rmm.mappings.col_bridge")}),e.jsx("span",{children:r("rmm.mappings.col_target_bridge")})]}),f.nics.map(t=>e.jsxs("div",{className:"rmm-maprow",children:[e.jsx("code",{className:"rmm-mapkey",children:t.key}),e.jsxs("code",{className:"rmm-mapsrc",children:[t.bridge," ",e.jsx("em",{children:t.model})]}),e.jsx(ae,{value:c[t.key]||"",options:y.bridges.map(m=>({value:m.iface,label:`${m.iface}${m.address?` (${m.address})`:""}`})),onChange:m=>z({...c,[t.key]:m})})]},t.key))]})]}),e.jsxs("div",{className:"rmm-row",children:[e.jsxs("label",{className:"rmm-check",children:[e.jsx("input",{type:"checkbox",checked:H,onChange:t=>K(t.target.checked)}),e.jsx("span",{children:r("rmm.mappings.online")})]}),e.jsxs("label",{className:"rmm-check",children:[e.jsx("input",{type:"checkbox",checked:Q,onChange:t=>s(t.target.checked)}),e.jsx("span",{children:r("rmm.mappings.delete_source")})]})]}),e.jsx("label",{children:r("rmm.mappings.bwlimit")}),e.jsx("input",{type:"text",inputMode:"numeric",value:L,onChange:t=>X(t.target.value),placeholder:"0"}),Y&&e.jsx("div",{className:"rmm-err",children:Y}),e.jsxs("div",{className:"rmm-actions",children:[e.jsx("button",{className:"ghost",onClick:()=>w("endpoint"),children:r("rmm.action.back")}),e.jsx("button",{className:"primary danger",disabled:!ie,onClick:()=>w("review"),children:r("rmm.action.review")})]})]}),g==="review"&&b&&e.jsxs(e.Fragment,{children:[e.jsx(ge,{vm:l,selected:b,clusterId:i,precheck:k,precheckLoading:A,onRun:q,t:r}),e.jsx("p",{className:"rmm-sub",children:r("rmm.review.intro")}),e.jsxs("div",{className:"rmm-review",children:[e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.from")}),e.jsxs("code",{children:[i,"/",l.node,"/vm/",l.vmid," (",l.name,")"]})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.to")}),e.jsxs("code",{children:[b.cluster_id,"/",b.node_host,":",b.node_port," → vmid ",p]})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.data_path")}),e.jsx("code",{children:Z})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.fingerprint")}),e.jsx("code",{className:"trunc",children:P||e.jsx("em",{children:r("rmm.review.fp_none")})})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.storage_map")}),e.jsx("code",{children:J||"<empty>"})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.bridge_map")}),e.jsx("code",{children:re||"<empty>"})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.online")}),e.jsx("code",{children:r(H?"rmm.review.online_yes":"rmm.review.online_no")})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.delete_source")}),e.jsx("code",{children:r(Q?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.review.bandwidth")}),e.jsx("code",{children:L?`${L} KB/s`:r("rmm.review.unlimited")})]})]}),e.jsxs("div",{className:"rmm-actions",children:[e.jsx("button",{className:"ghost",onClick:()=>w("mappings"),children:r("rmm.action.back")}),e.jsx("button",{className:"primary danger",disabled:A||k!==null&&!k.ok,onClick:le,children:r("rmm.action.start")})]})]}),g==="submitting"&&e.jsxs("div",{className:"rmm-spin",children:[e.jsx("div",{className:"rmm-spin-ring"}),e.jsx("div",{children:r("rmm.submitting")})]}),g==="done"&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:r("rmm.done.msg")}),e.jsxs("div",{className:"rmm-review",children:[e.jsxs("div",{children:[e.jsx("span",{children:r("rmm.done.upid")}),e.jsx("code",{className:"trunc",style:{userSelect:"all"},children:W})]}),e.jsxs("div",{children:[e.jsx("span",{}),e.jsx("span",{style:{color:"var(--text-dim)"},children:r("rmm.done.hint")})]})]}),e.jsx("div",{className:"rmm-actions",children:e.jsx("button",{className:"primary",onClick:x,children:r("rmm.action.close")})})]}),g==="error"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"rmm-err",style:{marginTop:16},children:Y}),e.jsxs("div",{className:"rmm-actions",children:[e.jsx("button",{className:"ghost",onClick:()=>w("mappings"),children:r("rmm.action.back")}),e.jsx("button",{className:"primary",onClick:x,children:r("rmm.action.close")})]})]})]})]})}function oe(a){return`${a.cluster_id}::${a.node_host}::${a.node_port}`}function ge({vm:a,selected:i,clusterId:l,precheck:x,precheckLoading:d,onRun:r,t:g}){if(xe.useEffect(()=>{x===null&&!d&&r()},[]),d)return e.jsx("div",{className:"rmm-precheck loading",children:g("rmm.precheck.running")});if(x===null)return null;const w=x.blockers.length>0,v=x.warnings.length>0,_=w?"blockers":v?"warnings":"ok";return e.jsxs("div",{className:`rmm-precheck ${_}`,children:[w&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"rmm-precheck-head",children:g("rmm.precheck.blockers")}),e.jsx("ul",{children:x.blockers.map((M,C)=>e.jsx("li",{children:M},C))})]}),v&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"rmm-precheck-head",children:g("rmm.precheck.warnings")}),e.jsx("ul",{children:x.warnings.map((M,C)=>e.jsx("li",{children:M},C))})]}),!w&&!v&&e.jsx("div",{className:"rmm-precheck-head",children:g("rmm.precheck.ok")}),e.jsx("div",{className:"rmm-precheck-actions",children:e.jsx("button",{className:"ghost",onClick:r,children:g("rmm.action.precheck")})})]})}const fe={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},ue=`
@keyframes rmmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes rmmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes rmmSpin { to { transform: rotate(360deg); } }
.rmm {
  width: min(640px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow:
    0 0 0 1px rgba(0,240,255,.1),
    0 16px 60px rgba(0,0,0,.65),
    0 0 80px -20px rgba(0,240,255,.5);
  padding: 24px 26px;
  animation: rmmSlide .2s ease;
  max-height: 88vh; overflow-y: auto;
  font-family: 'Rajdhani', sans-serif;
  color: #e6f6ff;
}
.rmm-eyebrow {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
  color: #00f0ff; margin-bottom: 6px;
}
.rmm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 10px; }
.rmm-sub { color: #95a8c4; font-size: 15px; line-height: 1.5; margin: 0 0 14px; }
.rmm-tip {
  margin: 6px 0 0; padding: 8px 10px;
  font-size: 14px; color: #c8ffe1;
  background: rgba(0, 255, 136, 0.05);
  border-left: 2px solid #00ff88;
  border-radius: 3px; line-height: 1.4;
}
.rmm label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 14px 0 6px;
}
.rmm label .hint { color: #6b7c93; text-transform: none; letter-spacing: 0; margin-left: 6px; }
.rmm input[type=text], .rmm select {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.rmm input[type=text]:focus, .rmm select:focus {
  border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18);
}
.rmm-row { display: flex; gap: 18px; margin-top: 14px; }
.rmm-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.rmm-check input { margin: 0; }
.rmm-check span {
  font-family: 'Rajdhani', sans-serif; font-size: 15px;
  color: #e6f6ff; text-transform: none; letter-spacing: 0;
}
.rmm-maptable {
  border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px; overflow: hidden;
  background: #02050b;
}
.rmm-maprow {
  display: grid;
  grid-template-columns: 70px 1fr 1.4fr;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(0,240,255,.06);
}
.rmm-maprow:last-child { border-bottom: none; }
.rmm-maphead {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase;
  color: #6b7c93; background: rgba(0,240,255,.04);
}
.rmm-mapkey {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #00f0ff; background: rgba(0,240,255,.06);
  padding: 2px 6px; border-radius: 3px;
  text-align: center;
}
.rmm-mapsrc {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #c8e1ff;
  background: transparent;
}
.rmm-mapsrc em { color: #6b7c93; font-style: normal; margin-left: 4px; }
.rmm-maprow select { padding: 6px 10px; font-size: 14px; }
.rmm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
.rmm-actions button {
  padding: 9px 20px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.rmm-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.rmm-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.rmm-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.rmm-actions button.primary.danger { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
.rmm-actions button:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
.rmm-err {
  margin-top: 14px; padding: 12px 14px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 15px; color: #ffd0d8;
}
.rmm-review {
  margin: 4px 0 8px; padding: 12px 14px;
  background: #02050b; border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px;
}
.rmm-review > div { display: flex; gap: 12px; margin: 6px 0; align-items: baseline; }
.rmm-review > div > span:first-child {
  display: inline-block; min-width: 120px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; color: #95a8c4;
}
.rmm-review code {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #00f0ff; background: rgba(0,240,255,.06); padding: 1px 6px;
  border-radius: 3px;
}
.rmm-review code.trunc { word-break: break-all; }
.rmm-precheck {
  margin: 0 0 14px; padding: 12px 14px;
  border-radius: 6px; border-left: 3px solid;
  font-family: 'Rajdhani', sans-serif; font-size: 15px;
}
.rmm-precheck.loading {
  background: rgba(0,240,255,.04); border-left-color: #00f0ff; color: #95a8c4;
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
}
.rmm-precheck.ok {
  background: rgba(0,255,136,.05); border-left-color: #00ff88; color: #c8ffe1;
}
.rmm-precheck.warnings {
  background: rgba(255,138,60,.06); border-left-color: #ff8a3c; color: #ffe1c8;
}
.rmm-precheck.blockers {
  background: rgba(255,56,96,.08); border-left-color: #ff3860; color: #ffd0d8;
}
.rmm-precheck-head {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; margin-bottom: 6px;
  font-weight: 700;
}
.rmm-precheck ul { margin: 0 0 8px; padding-left: 18px; line-height: 1.5; }
.rmm-precheck li { margin-bottom: 3px; }
.rmm-precheck-actions { display: flex; justify-content: flex-end; }
.rmm-precheck-actions button {
  padding: 4px 12px;
  font-family: 'Share Tech Mono', monospace; font-size: 11.5px;
  letter-spacing: .06em; text-transform: uppercase;
  background: transparent; color: #95a8c4;
  border: 1px solid rgba(0,240,255,.16); border-radius: 4px;
  cursor: pointer;
}
.rmm-precheck-actions button:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }

.rmm-spin {
  display: flex; flex-direction: column; align-items: center;
  padding: 32px; gap: 16px;
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  letter-spacing: .08em; color: #00f0ff;
}
.rmm-spin-ring {
  width: 36px; height: 36px; border-radius: 50%;
  border: 2px solid rgba(0,240,255,.2);
  border-top-color: #00f0ff;
  animation: rmmSpin .9s linear infinite;
}
`;function be(a){if(!a)return"—";try{return new Date(a*1e3).toLocaleString()}catch{return String(a)}}function Ce({open:a,cluster_id:i,vm:l,onClose:x}){const{t:d}=ne(),r=ce(),[g,w]=o.useState([]),[v,_]=o.useState(!1),[M,C]=o.useState(!1),[P,$]=o.useState(""),[j,B]=o.useState(""),[f,V]=o.useState(!1),[y,E]=o.useState(""),u=async()=>{if(l){_(!0),E("");try{const c=await R.listSnapshots(i,l.vmid);w((c.snapshots||[]).filter(z=>z.name!=="current"))}catch(c){E(c instanceof Error?c.message:String(c))}finally{_(!1)}}};if(o.useEffect(()=>{a&&($(""),B(""),V(!1),E(""),u())},[a,i,l==null?void 0:l.vmid]),o.useEffect(()=>{if(!a)return;const c=z=>{z.key==="Escape"&&x()};return document.addEventListener("keydown",c),()=>document.removeEventListener("keydown",c)},[a,x]),!a||!l)return null;const O=async()=>{if(P){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(P)){E("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}C(!0),E("");try{await R.createSnapshot(i,l.vmid,{snapname:P,description:j,vmstate:f}),$(""),B(""),V(!1),await u()}catch(c){E(c instanceof Error?c.message:String(c))}finally{C(!1)}}},D=async c=>{if(await r.confirm(d("snap.confirm_delete",{name:c.name}),{destructive:!0})){E("");try{await R.deleteSnapshot(i,l.vmid,c.name),await u()}catch(z){E(z instanceof Error?z.message:String(z))}}},F=async c=>{if(await r.confirm(d("snap.confirm_rollback",{name:c.name}),{destructive:!0})){E("");try{await R.rollbackSnapshot(i,l.vmid,c.name),await u()}catch(z){E(z instanceof Error?z.message:String(z))}}};return e.jsxs("div",{onClick:x,style:je,children:[e.jsx("style",{children:ye}),e.jsxs("div",{className:"sm-modal",onClick:c=>c.stopPropagation(),children:[e.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",i]}),e.jsx("h3",{className:"sm-title",children:d("snap.title",{vmid:l.vmid,name:l.name})}),e.jsxs("div",{className:"sm-create",children:[e.jsxs("div",{className:"sm-row",children:[e.jsx("label",{children:d("snap.name")}),e.jsx("input",{type:"text",value:P,onChange:c=>$(c.target.value),placeholder:"my-snap",spellCheck:!1})]}),e.jsxs("div",{className:"sm-row",children:[e.jsx("label",{children:d("snap.description")}),e.jsx("input",{type:"text",value:j,onChange:c=>B(c.target.value)})]}),e.jsxs("div",{className:"sm-row sm-check-row",children:[e.jsxs("label",{className:"sm-check",children:[e.jsx("input",{type:"checkbox",checked:f,onChange:c=>V(c.target.checked)}),e.jsx("span",{children:d("snap.include_state")})]}),e.jsxs("button",{className:"sm-btn primary",disabled:M||!P,onClick:O,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"}),e.jsx("circle",{cx:"12",cy:"13",r:"4"})]}),M?"…":d("snap.create")]})]})]}),y&&e.jsx("div",{className:"sm-err",children:y}),e.jsxs("div",{className:"sm-list",children:[v&&e.jsx("div",{className:"sm-empty",children:"…"}),!v&&g.length===0&&e.jsx("div",{className:"sm-empty",children:d("snap.empty")}),!v&&g.map(c=>e.jsxs("div",{className:"sm-item",children:[e.jsxs("div",{className:"sm-item-head",children:[e.jsx("code",{className:"sm-name",children:c.name}),c.parent&&e.jsxs("span",{className:"sm-meta",children:[d("snap.parent"),": ",e.jsx("code",{children:c.parent})]}),e.jsxs("span",{className:"sm-meta",children:[d("snap.taken"),": ",be(c.snaptime)]}),c.vmstate?e.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),c.description&&e.jsx("div",{className:"sm-desc",children:c.description}),e.jsxs("div",{className:"sm-item-actions",children:[e.jsxs("button",{className:"sm-btn ghost",onClick:()=>F(c),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"1 4 1 10 7 10"}),e.jsx("path",{d:"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"})]}),d("snap.rollback")]}),e.jsxs("button",{className:"sm-btn danger",onClick:()=>D(c),children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"}),e.jsx("path",{d:"M10 11v6M14 11v6"})]}),d("snap.delete")]})]})]},c.name))]}),e.jsx("div",{className:"sm-actions",children:e.jsxs("button",{className:"sm-btn ghost",onClick:x,children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]}),d("action.close")]})})]})]})}const je={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},ye=`
@keyframes smFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes smSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.sm-modal {
  width: min(640px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 24px 26px; animation: smSlide .2s ease;
  max-height: 88vh; overflow-y: auto;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.sm-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.sm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 16px; }
.sm-create {
  background: #02050b; border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px; padding: 12px 14px; margin-bottom: 14px;
}
.sm-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.sm-row:last-child { margin-bottom: 0; }
.sm-row label {
  flex: 0 0 110px; font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; color: #95a8c4;
}
.sm-row input[type=text] {
  flex: 1; padding: 8px 12px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 5px;
  font-family: 'Share Tech Mono', monospace; font-size: 14px; outline: none;
}
.sm-row input[type=text]:focus { border-color: #00f0ff; box-shadow: 0 0 0 2px rgba(0,240,255,.18); }
.sm-check-row { justify-content: space-between; }
/* Override the generic .sm-row label width (110px) so the checkbox label
   can show its full Chinese text on one line instead of wrapping. */
.sm-row label.sm-check {
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  text-transform: none;
  letter-spacing: 0;
  color: #e6f6ff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  margin: 0;
}
.sm-check span {
  font-family: 'Rajdhani', sans-serif; font-size: 15px; color: #e6f6ff;
  white-space: nowrap;
}
.sm-list { margin-bottom: 14px; }
.sm-empty {
  padding: 20px; text-align: center; color: #6b7c93;
  font-family: 'Share Tech Mono', monospace; font-size: 14px; letter-spacing: .08em;
}
.sm-item {
  background: #02050b; border: 1px solid rgba(0,240,255,.10);
  border-radius: 5px; padding: 10px 12px; margin-bottom: 8px;
}
.sm-item-head {
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
}
.sm-name {
  color: #00f0ff; background: rgba(0,240,255,.06);
  padding: 2px 8px; border-radius: 3px; font-size: 14px;
}
.sm-meta { color: #95a8c4; }
.sm-meta code { color: #c8e1ff; }
.sm-tag {
  color: #00ff88; background: rgba(0,255,136,.08);
  padding: 1px 6px; border-radius: 3px; font-size: 11.5px;
}
.sm-desc {
  margin-top: 6px; font-family: 'Rajdhani', sans-serif; font-size: 15px;
  color: #c8e1ff;
}
.sm-item-actions {
  display: flex; gap: 6px; margin-top: 8px; justify-content: flex-end;
}
.sm-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .06em; text-transform: uppercase;
  border-radius: 4px; cursor: pointer; border: 1px solid transparent;
}
.sm-btn svg { flex-shrink: 0; }
.sm-btn.primary { color: #001018; background: linear-gradient(135deg,#00f0ff,#00b8d4); }
.sm-btn.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.sm-btn.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.sm-btn.danger { color: #1a0006; background: linear-gradient(135deg,#ff3860,#c41a3a); }
.sm-btn:disabled { opacity: .4; cursor: not-allowed; }
.sm-err {
  margin-bottom: 12px; padding: 10px 12px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 14px; color: #ffd0d8;
  font-family: 'Share Tech Mono', monospace;
}
.sm-actions { display: flex; justify-content: flex-end; }
`;function Ee({open:a,cluster_id:i,vm:l,onClose:x}){const{t:d}=ne(),[r,g]=o.useState([]),[w,v]=o.useState(!1),[_,M]=o.useState(""),[C,P]=o.useState("snapshot"),[$,j]=o.useState("zstd"),[B,f]=o.useState("{{guestname}}"),[V,y]=o.useState(!1),[E,u]=o.useState("failure"),[O,D]=o.useState(""),[F,c]=o.useState(""),[z,Z]=o.useState(""),[I,p]=o.useState(!1);o.useEffect(()=>{!a||!l||(c(""),Z(""),M(""),f("{{guestname}}"),y(!1),u("failure"),D(""),v(!0),R.getCluster(i).then(s=>{const X=Object.values(s.storages||{}).filter(W=>{var k;if(!((k=W.content)!=null&&k.includes("backup")))return!1;const n=W.allowed_nodes||[];return n.length>0&&!n.includes(l.node)||!W.shared&&W.node!==l.node?!1:W.enabled!==!1}),Y=new Set,T=[];for(const W of X)Y.has(W.storage)||(Y.add(W.storage),T.push(W));g(T),T.length>0&&M(T[0].storage)}).catch(s=>c(s.message||String(s))).finally(()=>v(!1)))},[a,i,l==null?void 0:l.vmid,l==null?void 0:l.node]);const H=o.useMemo(()=>{const s=r.find(L=>L.storage===_);return((s==null?void 0:s.type)||"").toLowerCase()},[_,r])==="pbs";if(o.useEffect(()=>{if(!a)return;const s=L=>{L.key==="Escape"&&!I&&x()};return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[a,I,x]),!a||!l)return null;const K=r.length>0,Q=async()=>{if(_){p(!0),c("");try{const s={vmid:l.vmid,storage:_,mode:C};H||(s.compress=$),B.trim()&&(s["notes-template"]=B.trim()),V&&(s.protected=!0),O.trim()&&(s.mailto=O.trim(),s.mailnotification=E);const L=await R.triggerBackup(i,l.node,s);Z(L.upid)}catch(s){c(s instanceof Error?s.message:String(s))}finally{p(!1)}}};return e.jsxs("div",{onClick:()=>!I&&x(),style:ve,children:[e.jsx("style",{children:ke}),e.jsxs("div",{className:"bm-modal",onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",i," · ",l.node]}),e.jsx("h3",{className:"bm-title",children:d("backup.title",{vmid:l.vmid,name:l.name})}),!z&&e.jsxs(e.Fragment,{children:[e.jsx("label",{children:d("backup.storage")}),w?e.jsx("div",{className:"bm-empty",children:"…"}):K?e.jsx("select",{value:_,onChange:s=>M(s.target.value),children:r.map(s=>e.jsxs("option",{value:s.storage,children:[s.storage," (",s.type,s.shared?", shared":"",")"]},s.storage))}):e.jsx("div",{className:"bm-err",children:d("backup.no_backup_storage")}),e.jsx("label",{children:d("backup.mode")}),e.jsxs("select",{value:C,onChange:s=>P(s.target.value),children:[e.jsx("option",{value:"snapshot",children:d("backup.mode_snapshot")}),e.jsx("option",{value:"suspend",children:d("backup.mode_suspend")}),e.jsx("option",{value:"stop",children:d("backup.mode_stop")})]}),!H&&e.jsxs(e.Fragment,{children:[e.jsx("label",{children:d("backup.compress")}),e.jsxs("select",{value:$,onChange:s=>j(s.target.value),children:[e.jsx("option",{value:"zstd",children:"zstd"}),e.jsx("option",{value:"lzo",children:"lzo"}),e.jsx("option",{value:"gzip",children:"gzip"}),e.jsx("option",{value:"0",children:"none"})]})]}),H&&e.jsx("div",{className:"bm-hint",children:d("backup.pbs_no_compress")}),e.jsx("label",{children:d("backup.notes_template")}),e.jsx("input",{type:"text",value:B,onChange:s=>f(s.target.value),placeholder:"{{guestname}}"}),e.jsx("div",{className:"bm-hint",children:d("backup.notes_template_help")}),e.jsxs("label",{className:"bm-check-row",children:[e.jsx("input",{type:"checkbox",checked:V,onChange:s=>y(s.target.checked)}),e.jsx("span",{children:d("backup.protected")})]}),e.jsx("div",{className:"bm-hint bm-hint-tight",children:d("backup.protected_help")}),e.jsx("label",{children:d("backup.mailto")}),e.jsx("input",{type:"text",value:O,onChange:s=>D(s.target.value),placeholder:"ops@example.com"}),O.trim()&&e.jsxs("select",{value:E,onChange:s=>u(s.target.value),style:{marginTop:6},children:[e.jsx("option",{value:"failure",children:d("backup.mail_failure")}),e.jsx("option",{value:"always",children:d("backup.mail_always")})]}),F&&e.jsx("div",{className:"bm-err",children:F}),e.jsxs("div",{className:"bm-actions",children:[e.jsx("button",{className:"bm-btn ghost",onClick:x,disabled:I,children:d("action.cancel")}),e.jsx("button",{className:"bm-btn primary",disabled:I||!_,onClick:Q,children:I?"…":d("backup.start")})]})]}),z&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"bm-ok",children:d("backup.started")}),e.jsx("div",{className:"bm-review",children:e.jsxs("div",{children:[e.jsx("span",{children:d("rmm.done.upid")}),e.jsx("code",{style:{userSelect:"all"},children:z})]})}),e.jsx("div",{className:"bm-actions",children:e.jsx("button",{className:"bm-btn primary",onClick:x,children:d("action.close")})})]})]})]})}const ve={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},ke=`
@keyframes bmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes bmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.bm-modal {
  width: min(520px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 24px 26px; animation: bmSlide .2s ease;
  max-height: 88vh; overflow-y: auto;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.bm-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.bm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 16px; }
.bm-modal label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 14px 0 6px;
}
.bm-modal select, .bm-modal input[type=text] {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px; outline: none;
}
.bm-modal select:focus, .bm-modal input[type=text]:focus {
  border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18);
}
.bm-empty { padding: 12px; color: #6b7c93; font-family: 'Share Tech Mono', monospace; font-size: 14px; }
.bm-hint {
  margin-top: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 13.5px;
  color: #6b7c93; line-height: 1.5;
}
.bm-hint-tight { margin-top: 2px; margin-bottom: 6px; }
.bm-check-row {
  display: flex; align-items: center; gap: 10px;
  margin: 14px 0 0;
  cursor: pointer;
  text-transform: none !important;
  letter-spacing: normal !important;
  font-size: 14px !important;
  color: #e6f6ff !important;
}
.bm-check-row input { accent-color: #00f0ff; width: 16px; height: 16px; }
.bm-check-row span { font-family: 'Share Tech Mono', monospace; }
.bm-err {
  margin-top: 14px; padding: 12px 14px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 15px; color: #ffd0d8;
}
.bm-ok { color: #00ff88; font-size: 15px; margin: 8px 0 12px; }
.bm-review {
  margin: 4px 0 8px; padding: 12px 14px;
  background: #02050b; border: 1px solid rgba(0,240,255,.12);
  border-radius: 6px;
}
.bm-review > div { display: flex; gap: 12px; margin: 6px 0; align-items: baseline; }
.bm-review > div > span:first-child {
  display: inline-block; min-width: 60px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .08em; text-transform: uppercase; color: #95a8c4;
}
.bm-review code {
  font-family: 'Share Tech Mono', monospace; font-size: 14px;
  color: #00f0ff; background: rgba(0,240,255,.06); padding: 1px 6px;
  border-radius: 3px; word-break: break-all;
}
.bm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
.bm-btn {
  padding: 9px 20px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.bm-btn.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.bm-btn.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.bm-btn.primary { color: #001018; background: linear-gradient(135deg,#00f0ff,#00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.bm-btn:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
`;function $e({open:a,cluster_id:i,pveUser:l,onCancel:x,onSubmit:d}){const{t:r}=ne(),[g,w]=o.useState(""),[v,_]=o.useState(!1),[M,C]=o.useState(""),P=o.useRef(null);if(o.useEffect(()=>{a&&(w(""),C(""),_(!1),setTimeout(()=>{var j;return(j=P.current)==null?void 0:j.focus()},50))},[a]),o.useEffect(()=>{if(!a)return;const j=B=>{B.key==="Escape"&&!v&&x()};return document.addEventListener("keydown",j),()=>document.removeEventListener("keydown",j)},[a,v,x]),!a)return null;const $=async()=>{if(g){_(!0),C("");try{await d(g)}catch(j){const B=j instanceof Error?j.message:String(j);C(r("console.prepare_failed",{err:B})),_(!1)}}};return e.jsxs("div",{onClick:()=>!v&&x(),style:we,children:[e.jsx("style",{children:Ne}),e.jsxs("div",{className:"cpw-modal",onClick:j=>j.stopPropagation(),children:[e.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",i]}),e.jsx("h3",{className:"cpw-title",children:r("console.prompt_title")}),e.jsx("p",{className:"cpw-body",children:r("console.prompt_body",{user:l,cluster:i})}),e.jsx("label",{children:r("console.prompt_label")}),e.jsx("input",{ref:P,type:"password",value:g,onChange:j=>w(j.target.value),onKeyDown:j=>{j.key==="Enter"&&$()},autoComplete:"current-password",spellCheck:!1}),M&&e.jsx("div",{className:"cpw-err",children:M}),e.jsxs("div",{className:"cpw-actions",children:[e.jsx("button",{className:"ghost",onClick:x,disabled:v,children:r("action.cancel")}),e.jsx("button",{className:"primary",onClick:$,disabled:v||!g,children:v?"…":r("console.prompt_open")})]})]})]})}const we={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},Ne=`
@keyframes cpwFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes cpwSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.cpw-modal {
  width: min(440px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 22px 24px; animation: cpwSlide .2s ease;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.cpw-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.cpw-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 10px; }
.cpw-body { color: #95a8c4; font-size: 15px; line-height: 1.5; margin: 0 0 14px; }
.cpw-modal label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 0 0 6px;
}
.cpw-modal input {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.cpw-modal input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
.cpw-err {
  margin-top: 10px; padding: 10px 12px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 14px; color: #ffd0d8;
}
.cpw-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.cpw-actions button {
  padding: 9px 18px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.cpw-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.cpw-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.cpw-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.cpw-actions button:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
`;export{Ee as B,$e as C,Me as R,Ce as S,ze as V};
