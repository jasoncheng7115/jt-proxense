import{r as n,j as s,e as H}from"./index-DeG9m4sY.js";function z({value:d,options:a,onChange:y,placeholder:j,className:E,disabled:m}){const[i,p]=n.useState(!1),[x,b]=n.useState(-1),g=n.useRef(null),v=n.useRef(null),L=n.useId(),w=a.find(e=>e.value===d);n.useEffect(()=>{if(!i)return;const e=t=>{var c,u;const r=t.target,f=(c=g.current)==null?void 0:c.contains(r),h=(u=v.current)==null?void 0:u.contains(r);!f&&!h&&p(!1)},o=t=>{if(t.key==="Escape"){p(!1);return}if(t.key==="ArrowDown")t.preventDefault(),b(r=>Math.min(a.length-1,r<0?0:r+1));else if(t.key==="ArrowUp")t.preventDefault(),b(r=>Math.max(0,r-1));else if(t.key==="Enter"){t.preventDefault();const r=a[x];r&&!r.disabled&&(y(r.value),p(!1))}};return document.addEventListener("mousedown",e),document.addEventListener("keydown",o),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",o)}},[i,x,a,y]);const M=()=>{m||(p(e=>!e),b(a.findIndex(e=>e.value===d)))},[l,S]=n.useState({left:0,top:0,width:200,flipUp:!1,maxH:280});return n.useLayoutEffect(()=>{if(!i)return;const e=()=>{var k;const o=(k=g.current)==null?void 0:k.getBoundingClientRect();if(!o)return;const t=6,r=320,f=window.innerHeight-o.bottom-t-8,h=o.top-t-8,c=f<160&&h>f+40,u=Math.max(120,Math.min(r,c?h:f));S({left:o.left,top:c?o.top-t:o.bottom+t,width:o.width,flipUp:c,maxH:u})};return e(),window.addEventListener("resize",e),window.addEventListener("scroll",e,!0),()=>{window.removeEventListener("resize",e),window.removeEventListener("scroll",e,!0)}},[i]),s.jsxs("div",{ref:g,className:`cyber-select ${E||""} ${i?"open":""} ${m?"disabled":""}`,children:[s.jsx("style",{children:N}),s.jsxs("button",{type:"button",id:L,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:M,disabled:m,children:[s.jsx("span",{className:"cyber-select-value",children:w?w.label:j||"—"}),s.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:s.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&H.createPortal(s.jsx("div",{ref:v,className:"cyber-select-list",role:"listbox",style:{left:l.left,width:l.width,...l.flipUp?{bottom:window.innerHeight-l.top,top:"auto"}:{top:l.top},maxHeight:l.maxH},children:a.map((e,o)=>s.jsxs("div",{role:"option","aria-selected":e.value===d,"aria-disabled":e.disabled||void 0,className:`cyber-select-opt ${e.value===d?"selected":""} ${o===x?"hover":""} ${e.disabled?"disabled":""}`,onMouseEnter:()=>b(o),onClick:()=>{e.disabled||(y(e.value),p(!1))},children:[s.jsx("div",{className:"cyber-select-opt-main",children:e.label}),e.hint&&s.jsx("div",{className:"cyber-select-opt-hint",children:e.hint}),e.value===d&&s.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:s.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},e.value))}),document.body)]})}const N=`
.cyber-select { position: relative; display: inline-block; min-width: 200px; }
.cyber-select.full { width: 100%; }
.cyber-select-trigger {
  width: 100%;
  display: inline-flex; align-items: center; justify-content: space-between;
  gap: 8px;
  padding: 9px 12px;
  background: #02050b;
  border: 1px solid rgba(0, 240, 255, .18);
  border-radius: 6px;
  color: #e6f6ff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 15px;
  letter-spacing: .03em;
  cursor: pointer;
  outline: none;
  transition: border-color .12s, box-shadow .12s, background .12s;
}
.cyber-select-trigger:hover { border-color: rgba(0, 240, 255, .35); }
.cyber-select.open .cyber-select-trigger {
  border-color: #00f0ff;
  box-shadow: 0 0 0 3px rgba(0, 240, 255, .14);
}
.cyber-select.disabled .cyber-select-trigger { opacity: .45; cursor: not-allowed; }
.cyber-select-value { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cyber-select-caret { color: #00f0ff; transition: transform .18s ease; flex-shrink: 0; }
.cyber-select.open .cyber-select-caret { transform: rotate(180deg); }

.cyber-select-list {
  /* Portaled to body, positioned via JS so it's never clipped by a
     parent modal's overflow:hidden. left/top/width/maxHeight come from
     inline style.

     The z-index must beat EVERY overlay in the app, not just most of them.
     At 2000 this list rendered behind any modal with a higher overlay
     (the ZFS modal sits at 4000, others at 9999): the list was in the DOM,
     visible: visible, opacity 1 — and completely unclickable, because
     elementFromPoint returned the modal on top of it. A dropdown is always
     logically above the thing that opened it, so it gets the top band —
     above the command palette (12000) as well, which is the current ceiling.
     If you add an overlay above this, test_dropdown_outranks_every_overlay
     will fail and make you decide deliberately rather than ship a dropdown
     nobody can click. */
  position: fixed;
  z-index: 12050;
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0, 240, 255, .35);
  border-radius: 8px;
  padding: 4px;
  box-shadow:
    0 0 0 1px rgba(0, 240, 255, .08),
    0 14px 40px rgba(0, 0, 0, .6),
    0 0 50px -16px rgba(0, 240, 255, .55);
  animation: cyberSelectIn .14s ease;
  overflow-y: auto;
}
@keyframes cyberSelectIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: none; }
}
.cyber-select-opt {
  position: relative;
  display: block;
  padding: 9px 28px 9px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  color: #e6f6ff;
  transition: background .12s, color .12s, padding-left .12s, box-shadow .12s;
}
/* Full-row light bar on hover — left vertical cyan rail + cyan band across
   the row + soft outer glow. The padding shift gives a tiny "snap to" feel
   so it's obvious which option the cursor is on. */
.cyber-select-opt.hover {
  background: linear-gradient(90deg, rgba(0, 240, 255, .22) 0%, rgba(0, 240, 255, .08) 60%, transparent 100%);
  color: #00f0ff;
  padding-left: 18px;
  box-shadow: inset 4px 0 0 #00f0ff, 0 0 18px -6px rgba(0, 240, 255, .55);
}
.cyber-select-opt.hover .cyber-select-opt-main { color: #00f0ff; text-shadow: 0 0 6px rgba(0, 240, 255, .55); }
.cyber-select-opt.selected { color: #00f0ff; }
.cyber-select-opt.disabled { opacity: .45; cursor: not-allowed; color: #6b7c93; }
.cyber-select-opt-main {
  font-family: 'Share Tech Mono', monospace;
  font-size: 15px; letter-spacing: .04em;
}
.cyber-select-opt-hint {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px; color: #95a8c4;
  margin-top: 2px; line-height: 1.3;
}
.cyber-select-opt.hover .cyber-select-opt-hint { color: #c8e1ff; }
.cyber-select-check {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  color: #00f0ff;
}
`;export{z as C};
