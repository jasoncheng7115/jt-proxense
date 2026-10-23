import{u as ce,r as h,j as e,l as ne}from"./index-HzkmC-WK.js";import{H as pe,R as he}from"./ReplicationModal-DTMi2N8J.js";function me({clusterId:v,clusterName:$,onClose:s}){const{language:g}=ce(),z=g==="zh-TW",d=(r,k)=>z?r:k,[b,T]=h.useState(null),[x,w]=h.useState(!1),[V,E]=h.useState(null),P=h.useCallback(async(r=!1)=>{w(!0),E(null);try{const k=await fetch(`/api/clusters/${encodeURIComponent(v)}/capacity${r?"?force=1":""}`,{credentials:"same-origin"}),U=await k.json().catch(()=>({}));if(!k.ok)throw new Error(U.detail||U.error||`HTTP ${k.status}`);T(U)}catch(k){E(k.message||String(k))}finally{w(!1)}},[v]);h.useEffect(()=>{P(!1)},[P]),h.useEffect(()=>{const r=k=>{k.key==="Escape"&&s()};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[s]);const q={growing:d("成長中","Growing"),flat:d("持平","Flat"),shrinking:d("減少中","Shrinking"),irregular:d("變化不規則","Irregular"),insufficient_data:d("資料不足","Not enough data")},O=r=>r==null?"—":r<=0?d("已達到","reached"):z?`${Math.round(r)} 天`:`${Math.round(r)} d`;return e.jsxs("div",{className:"cap-overlay",onClick:s,children:[e.jsxs("div",{className:"cap-modal",onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{className:"cap-head",children:[e.jsxs("span",{className:"cap-title",children:[d("容量預測","Capacity forecast")," · ",$]}),e.jsx("button",{className:"cap-btn",onClick:()=>P(!0),disabled:x,children:x?d("讀取中…","Reading…"):d("重新整理","Refresh")}),e.jsx("button",{className:"cap-x",onClick:s,"aria-label":"close",children:"×"})]}),e.jsxs("div",{className:"cap-body",children:[e.jsx("div",{className:"cap-scan"}),e.jsx("p",{className:"cap-note",children:d("依 PVE 自己的 RRD：儲存看過去 30 天的成長趨勢，虛擬機看過去一週的負載。只有成長趨勢穩定 (r² ≥ 0.5) 的儲存才會推算日期。","From PVE's own RRDs: 30 days of storage growth, one week of guest load. A date is only projected for a storage whose growth is steady (r² ≥ 0.5).")}),V&&e.jsx("div",{className:"cap-error",children:V}),!b&&x&&e.jsx("div",{className:"cap-empty",children:d("正在讀取 RRD…","Reading RRD data…")}),b&&e.jsxs(e.Fragment,{children:[e.jsx("h4",{className:"cap-h",children:d("儲存","Storage")}),e.jsxs("table",{className:"vm-table cap-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:d("儲存","Storage")}),e.jsx("th",{children:d("節點","Node")}),e.jsx("th",{children:d("已用","Used")}),e.jsx("th",{children:d("趨勢","Trend")}),e.jsx("th",{children:d("每日變化","Per day")}),e.jsx("th",{children:d("到 80%","To 80%")}),e.jsx("th",{children:d("到滿","To full")})]})}),e.jsx("tbody",{children:b.storages.map(r=>e.jsxs("tr",{children:[e.jsx("td",{className:"cap-mono",children:r.storage}),e.jsx("td",{className:"cap-mono",children:r.shared?d("共用","shared"):r.node}),e.jsxs("td",{className:"cap-mono",children:[e.jsx("span",{className:"cap-bar",children:e.jsx("span",{style:{width:`${Math.min(100,r.used_pct||0)}%`},className:(r.used_pct||0)>=90?"hot":(r.used_pct||0)>=80?"warm":""})}),r.used_pct!=null?`${r.used_pct}%`:"—"]}),e.jsxs("td",{children:[e.jsx("span",{className:`cap-trend t-${r.trend}`,children:q[r.trend]}),r.r2!=null&&e.jsxs("span",{className:"cap-r2",children:["r² ",r.r2]})]}),e.jsx("td",{className:"cap-mono",children:r.growth_per_day!=null?`${r.growth_per_day>=0?"+":"−"}${ne(Math.abs(r.growth_per_day))}`:"—"}),e.jsx("td",{className:"cap-mono",children:O(r.days_to_80)}),e.jsx("td",{className:"cap-mono",children:O(r.days_to_full)})]},`${r.storage}|${r.shared?"*":r.node}`))})]}),e.jsxs("h4",{className:"cap-h",children:[d("閒置的虛擬機","Idle guests"),e.jsx("span",{className:"cap-sub",children:d(`一週內 CPU 平均 < 2%、p95 < 5%、網路 < 2 KB/s；共檢查 ${b.guests_checked} 台運作中的虛擬機`,`a week under 2 % CPU on average and 5 % at p95, network under 2 KB/s; ${b.guests_checked} running guests checked`)})]}),b.idle.length===0?e.jsx("div",{className:"cap-empty",children:d("沒有閒置的虛擬機","No idle guests")}):e.jsxs("table",{className:"vm-table cap-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"VMID"}),e.jsx("th",{children:d("名稱","Name")}),e.jsx("th",{children:d("節點","Node")}),e.jsxs("th",{children:["CPU ",d("平均","avg")]}),e.jsx("th",{children:"CPU p95"}),e.jsx("th",{children:d("網路","Network")}),e.jsx("th",{children:d("資料天數","Days")})]})}),e.jsx("tbody",{children:b.idle.map(r=>e.jsxs("tr",{children:[e.jsxs("td",{className:"cap-mono",children:[r.vmid,e.jsx("span",{className:"cap-kind",children:r.type==="lxc"?"CT":"VM"})]}),e.jsx("td",{children:r.name}),e.jsx("td",{className:"cap-mono",children:r.node}),e.jsxs("td",{className:"cap-mono",children:[r.cpu_avg_pct,"%"]}),e.jsxs("td",{className:"cap-mono",children:[r.cpu_p95_pct,"%"]}),e.jsxs("td",{className:"cap-mono",children:[ne(r.net_avg_bps),"/s"]}),e.jsx("td",{className:"cap-mono",children:r.days})]},r.vmid))})]}),b.errors.length>0&&e.jsxs("div",{className:"cap-error",children:[d(`${b.errors.length} 項讀不到，未列入：`,`${b.errors.length} item(s) could not be read and are not included: `),b.errors.slice(0,8).map(r=>r.what).join(", "),b.errors.length>8?" …":""]})]})]})]}),e.jsx("style",{children:`
        .cap-overlay { position: fixed; inset: 0; z-index: 4000; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(0,0,0,.65); backdrop-filter: blur(4px); }
        .cap-modal { width: 100%; max-width: 1040px; max-height: calc(100vh - 48px); display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 8px; box-shadow: 0 24px 80px rgba(0,0,0,.6), 0 0 60px -20px rgba(0,240,255,.4); animation: cap-in .18s ease-out; }
        @keyframes cap-in { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }
        .cap-head { display: flex; align-items: center; gap: 10px; padding: 14px 16px; background: var(--bg-tertiary); border-bottom: 1px solid var(--border); border-radius: 8px 8px 0 0; }
        .cap-title { margin-right: auto; font-family: var(--font-display); font-size: 13px; letter-spacing: .06em; text-transform: uppercase; color: var(--primary); }
        .cap-btn { padding: 5px 12px; background: rgba(0,240,255,.06); border: 1px solid rgba(0,240,255,.4); border-radius: 4px; color: var(--primary); font-family: var(--font-display); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; cursor: pointer; transition: background .15s ease, transform .15s ease; }
        .cap-btn:hover:not(:disabled) { background: rgba(0,240,255,.16); transform: translateY(-1px); }
        .cap-btn:disabled { opacity: .5; cursor: not-allowed; }
        .cap-x { width: 26px; height: 26px; background: transparent; border: 1px solid transparent; border-radius: 4px; color: var(--text-secondary); font-size: 18px; cursor: pointer; }
        .cap-x:hover { color: var(--primary); border-color: var(--primary); }
        .cap-body { position: relative; padding: 14px 16px 18px; overflow: auto; }
        .cap-scan { position: absolute; left: 0; right: 0; top: -8px; height: 4px; opacity: 0; pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,.95), transparent); box-shadow: 0 0 12px 2px rgba(0,240,255,.6);
          animation: cap-scan .55s cubic-bezier(0.55, 0, 0.4, 1) forwards; }
        @keyframes cap-scan { 0% { opacity: 0; top: -8px; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { opacity: 0; top: calc(100% + 8px); } }
        .cap-note { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); line-height: 1.6; margin: 0 0 10px; }
        .cap-h { margin: 16px 0 8px; font-family: var(--font-display); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--text-secondary); display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; }
        .cap-sub { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0; text-transform: none; color: var(--text-muted); }
        .cap-table td { white-space: nowrap; }
        .cap-mono { font-family: var(--font-mono); }
        .cap-kind { margin-left: 6px; font-size: 10px; color: var(--text-muted); }
        .cap-bar { display: inline-block; width: 60px; height: 5px; margin-right: 8px; vertical-align: middle; background: rgba(0,240,255,.08); border-radius: 3px; overflow: hidden; }
        .cap-bar span { display: block; height: 100%; background: var(--primary); }
        .cap-bar span.warm { background: var(--warning, #ffb020); }
        .cap-bar span.hot { background: var(--danger, #ff4d6d); }
        .cap-trend { padding: 1px 8px; border-radius: 999px; font-family: var(--font-mono); font-size: 11.5px; border: 1px solid currentColor; }
        .t-growing { color: var(--warning, #ffb020); }
        .t-flat, .t-shrinking { color: var(--success); }
        .t-irregular, .t-insufficient_data { color: var(--text-muted); }
        .cap-r2 { margin-left: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
        .cap-empty { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); padding: 8px 0; }
        .cap-error { margin-top: 12px; padding: 8px 12px; border-left: 3px solid var(--warning, #ffb020); background: rgba(255,176,32,.07); color: var(--warning, #ffb020); font-family: var(--font-mono); font-size: 12px; }
      `})]})}const oe={critical:0,warning:1,info:2,ok:3};function ue({name:v,data:$,isZh:s}){const g=$.quorate,z=$.votes||{},d=$.nodes||[],b=x=>typeof x=="number"?`${(x/1e3).toFixed(x<1e3?2:1)} ms`:"—",T=x=>{const w=(x||"").toLowerCase();return w==="connected"||w==="localhost"?"ok":w?"down":"na"};return e.jsxs("div",{className:"panel-card coro-card",children:[e.jsxs("div",{className:"coro-head",children:[e.jsx("span",{className:"coro-dot"}),e.jsxs("span",{className:"coro-title",children:["COROSYNC · ",v]}),e.jsx("span",{className:`coro-quorum ${g===!1?"bad":g?"ok":"na"}`,children:g===!1?s?"失去仲裁":"NO QUORUM":g?s?"仲裁正常":"QUORATE":s?"未知":"UNKNOWN"})]}),e.jsxs("div",{className:"coro-meta",children:[e.jsxs("span",{children:[s?"票數":"Votes",": ",e.jsx("b",{children:z.total??"—"}),"/",z.expected??"—"]}),e.jsxs("span",{children:[s?"仲裁門檻":"Quorum",": ",e.jsx("b",{children:z.quorum??"—"})]}),e.jsxs("span",{children:[s?"傳輸":"Transport",": ",e.jsx("b",{children:$.transport||"—"})]}),e.jsxs("span",{children:["Ring ID: ",e.jsx("b",{children:$.ring_id||"—"})]})]}),e.jsxs("table",{className:"coro-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:s?"節點":"Node"}),e.jsx("th",{children:"ID"}),e.jsx("th",{children:s?"狀態":"State"}),e.jsx("th",{children:s?"連結 · 延遲":"Links · latency"})]})}),e.jsx("tbody",{children:d.map(x=>e.jsxs("tr",{children:[e.jsxs("td",{className:"coro-node",children:[x.name||"—",x.local?e.jsx("span",{className:"coro-local",children:" ◆"}):null]}),e.jsx("td",{className:"coro-mono",children:x.nodeid??"—"}),e.jsx("td",{children:e.jsx("span",{className:`coro-online ${x.online===!1?"off":"on"}`,children:x.online===!1?s?"離線":"OFFLINE":s?"在線":"ONLINE"})}),e.jsx("td",{children:(x.links||[]).length===0?e.jsx("span",{className:"coro-na",children:"—"}):(x.links||[]).map(w=>e.jsxs("span",{className:`coro-link ${T(w.status)}`,title:`link ${w.linkid}: ${w.status||"n/a"}`,children:["L",w.linkid,w.status==="localhost"?"":` · ${b(w.latency_ave_us)}`]},w.linkid))})]},x.nodeid??x.name))})]}),!$.ssh_ok&&e.jsx("div",{className:"coro-sshnote",children:s?"連結狀態與環延遲需要本機到各 PVE 節點的 SSH 金鑰（設定 → 伺服器 → SSH 設定）。目前僅顯示 API 仲裁與成員資訊。":"Link status & ring latency need SSH from this host to each PVE node (Settings → Server → SSH setup). Showing API quorum/membership only."})]})}function xe({clusters:v,onNavigate:$}){var re;const{t:s,language:g}=ce(),[z,d]=h.useState({}),[b,T]=h.useState([]),[x,w]=h.useState([]),[V,E]=h.useState([]),[P,q]=h.useState([]),[O,r]=h.useState([]),[k,U]=h.useState({}),[Q,G]=h.useState(null),[J,X]=h.useState(null),[Z,ie]=h.useState({}),[W,ee]=h.useState(null),[H,le]=h.useState(0),D=h.useCallback(async()=>{const t={},f=[],u=[],j=[],N=[],a=[],p={},y={},o=[];for(const[m,C]of Object.entries(v)){const n=C.name||m;o.push((async()=>{try{const i=await fetch(`/api/clusters/${encodeURIComponent(m)}/tasks?status=error&limit=200`,{credentials:"same-origin"});if(i.ok){const l=await i.json(),c=Math.floor(Date.now()/1e3)-86400;t[m]=(l.tasks||[]).filter(_=>(_.starttime||0)>c).length}}catch{}})()),o.push((async()=>{try{const i=await fetch(`/api/clusters/${encodeURIComponent(m)}/log-health`,{credentials:"same-origin"});if(i.ok){const l=await i.json();for(const c of l.findings||[])a.push({cluster:n,clusterId:m,node:c.node||"",category:c.category||"kernel",severity:c.severity==="critical"?"critical":"warning",count:Number(c.count)||1,sample:String(c.sample||"")})}}catch{}})()),o.push((async()=>{try{const i=await fetch(`/api/clusters/${encodeURIComponent(m)}/capacity`,{credentials:"same-origin"});i.ok&&(y[m]=await i.json())}catch{}})()),o.push((async()=>{try{const i=await fetch(`/api/clusters/${encodeURIComponent(m)}/corosync`,{credentials:"same-origin"});if(i.ok){const l=await i.json();l&&l.ok&&(p[m]=l)}}catch{}})()),o.push((async()=>{try{const i=await fetch(`/api/clusters/${encodeURIComponent(m)}/ha/status`,{credentials:"same-origin"});if(i.ok){const l=await i.json();for(const c of l.resources||[]){const _=(c.state||c["request-state"]||"").toLowerCase();_&&_!=="started"&&_!=="stopped"&&j.push({cluster:n,clusterId:m,sid:c.sid||"",state:_,node:c.node||c.crm_state||""})}}}catch{}})()),o.push((async()=>{try{const i=await fetch(`/api/clusters/${encodeURIComponent(m)}/replication-jobs`,{credentials:"same-origin"});if(i.ok){const l=await i.json();for(const c of l.jobs||[])(c.error||c.fail_count&&Number(c.fail_count)>0)&&N.push({cluster:n,clusterId:m,sid:c.id||c.guest||"",error:c.error||`fail_count=${c.fail_count}`})}}catch{}})());for(const i of Object.keys(C.nodes||{}))o.push((async()=>{try{const l=await fetch(`/api/clusters/${encodeURIComponent(m)}/nodes/${encodeURIComponent(i)}/certificates`,{credentials:"same-origin"});if(l.ok){const _=(await l.json()).certificates||[];let S=null;for(const M of _){const L=M.notafter||M["notafter-formatted"];if(!L)continue;const F=typeof L=="number"?L:Date.parse(String(L))/1e3;!F||isNaN(F)||(!S||F<S.ts)&&(S={ts:F,subj:M.subject||M.filename||"cert"})}if(S){const M=Math.floor((S.ts-Date.now()/1e3)/86400);M<90&&f.push({cluster:n,clusterId:m,node:i,days:M,subject:S.subj})}}}catch{}})()),o.push((async()=>{try{const l=await fetch(`/api/clusters/${encodeURIComponent(m)}/nodes/${encodeURIComponent(i)}/updates`,{credentials:"same-origin"});if(l.ok){const c=await l.json();(c.count??0)>0&&u.push({cluster:n,clusterId:m,node:i,count:c.count})}}catch{}})())}await Promise.all(o),d(t),T(f),w(u),E(j),q(N),r(a),ie(y),U(p),le(Date.now())},[v]);h.useEffect(()=>{D()},[D]),h.useEffect(()=>{const t=setInterval(D,6e4);return()=>clearInterval(t)},[D]);const R=h.useMemo(()=>{var f,u,j,N;const t=[];for(const[a,p]of Object.entries(v)){const y=p.name||a;for(const[n,i]of Object.entries(p.nodes||{})){const l=i;l.status&&l.status!=="online"&&t.push({sev:"critical",cluster:y,target:`node:${n}`,category:s("health.cat.node_down"),msg:g==="zh-TW"?`${n} 狀態 ${l.status}`:`${n} is ${l.status}`,navView:"cluster-core",navParams:{cluster:a}});const c=((f=l.cpu)==null?void 0:f.usage_percent)||0,_=((u=l.memory)==null?void 0:u.usage_percent)||0;c>92&&t.push({sev:"warning",cluster:y,target:`node:${n}`,category:s("health.cat.high_cpu"),msg:`${n} CPU ${c.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:a}}),_>92&&t.push({sev:"warning",cluster:y,target:`node:${n}`,category:s("health.cat.high_mem"),msg:`${n} ${g==="zh-TW"?"記憶體":"memory"} ${_.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:a}})}for(const[n,i]of Object.entries(p.storages||{})){const l=i,c=l.usage_percent??l.used_pct??0;c>=95?t.push({sev:"critical",cluster:y,target:`storage:${n}`,category:s("health.cat.storage_full"),msg:`${l.storage||n} ${c.toFixed(0)}% `+(g==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:a}}):c>=85&&t.push({sev:"warning",cluster:y,target:`storage:${n}`,category:s("health.cat.storage_high"),msg:`${l.storage||n} ${c.toFixed(0)}% `+(g==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:a}})}const o=p.ceph;if(o){const n=(o.status||((j=o.health)==null?void 0:j.status)||"").toUpperCase();n.includes("ERR")?t.push({sev:"critical",cluster:y,target:"ceph",category:s("health.cat.ceph_err"),msg:n,navView:"ceph-constellation",navParams:{cluster:a}}):n.includes("WARN")&&t.push({sev:"warning",cluster:y,target:"ceph",category:s("health.cat.ceph_warn"),msg:n,navView:"ceph-constellation",navParams:{cluster:a}})}const m=k[a];for(const n of(m==null?void 0:m.findings)||[]){const i=g==="zh-TW";let l="Corosync",c=n.code;const _=n.severity==="critical"?"critical":"warning";if(n.code==="no_quorum")l=i?"Corosync 仲裁":"Corosync quorum",c=i?"叢集失去仲裁（NO QUORUM）":"Cluster has lost quorum";else if(n.code==="node_offline")l=i?"Corosync 成員":"Corosync membership",c=i?`${n.node} 不在環中（離線）`:`${n.node} is not in the ring (offline)`;else if(n.code==="link_down")l=i?"Corosync 連結":"Corosync link",c=i?`${n.node} link${n.link} 斷線`:`${n.node} link${n.link} is down`;else if(n.code==="high_latency"){l=i?"Corosync 延遲":"Corosync latency";const S=(Number(n.latency_us)/1e3).toFixed(1);c=i?`${n.node} link${n.link} 環延遲 ${S} ms`:`${n.node} link${n.link} ring latency ${S} ms`}t.push({sev:_,cluster:y,target:`corosync:${n.code}:${n.node||""}:${n.link??""}`,category:l,msg:c})}const C=z[a]||0;C>0&&t.push({sev:C>=10?"warning":"info",cluster:y,target:"tasks",category:s("health.cat.task_failures"),msg:g==="zh-TW"?`過去 24h 共 ${C} 筆作業失敗`:`${C} task error(s) in the last 24h`,navView:"tasks",navParams:{cluster:a}})}for(const[a,p]of Object.entries(Z)){const y=((N=v[a])==null?void 0:N.name)||a;for(const o of p.storages||[]){if(o.trend!=="growing"||o.days_to_80==null)continue;const m=o.days_to_80<=7?"critical":o.days_to_80<=30?"warning":"info";if(o.days_to_80>90)continue;const C=o.shared?o.storage:`${o.storage}@${o.node}`;t.push({sev:m,cluster:y,target:`capacity:${a}:${C}`,category:s("health.cat.capacity"),msg:g==="zh-TW"?`${C}：已用 ${o.used_pct}%，依目前趨勢約 ${Math.round(o.days_to_80)} 天後到 80%、${Math.round(o.days_to_full||0)} 天後滿`:`${C}: ${o.used_pct}% used; at the current trend 80 % in ~${Math.round(o.days_to_80)} d, full in ~${Math.round(o.days_to_full||0)} d`,navView:"storage",navParams:{cluster:a}})}if((p.idle||[]).length>0){const o=p.idle.slice(0,6).map(m=>`${m.vmid}${m.name?` ${m.name}`:""}`).join(", ");t.push({sev:"info",cluster:y,target:`idle:${a}`,category:s("health.cat.idle"),msg:g==="zh-TW"?`${p.idle.length} 台運作中的虛擬機一週內幾乎沒有負載：${o}${p.idle.length>6?" …":""}`:`${p.idle.length} running guest(s) nearly idle for a week: ${o}${p.idle.length>6?" …":""}`,navView:"holo-matrix",navParams:{cluster:a}})}}for(const a of b){let p="info";if(a.days<0)p="critical";else if(a.days<14)p="critical";else if(a.days<30)p="warning";else if(a.days<60)p="info";else continue;t.push({sev:p,cluster:a.cluster,target:`cert:${a.node}`,category:a.days<0?s("health.cat.cert_expired"):s("health.cat.cert_expiring"),msg:g==="zh-TW"?`${a.node}: ${a.subject} (${a.days<0?`已過期 ${Math.abs(a.days)} 天`:`${a.days} 天`})`:`${a.node}: ${a.subject} (${a.days<0?`expired ${Math.abs(a.days)}d ago`:`${a.days}d`})`,navView:"cluster-core",navParams:{cluster:a.clusterId}})}for(const a of x)t.push({sev:a.count>=50?"warning":"info",cluster:a.cluster,target:`updates:${a.node}`,category:s("health.cat.updates"),msg:g==="zh-TW"?`${a.node}: ${a.count} 個套件待更新`:`${a.node}: ${a.count} package update(s) pending`,navView:"cluster-core",navParams:{cluster:a.clusterId}});for(const a of V){const p=a.state==="error"?"critical":"warning";t.push({sev:p,cluster:a.cluster,target:`ha:${a.sid}`,category:s("health.cat.ha"),msg:g==="zh-TW"?`${a.sid}: ${a.state} (節點 ${a.node||"?"})`:`${a.sid}: ${a.state} (node ${a.node||"?"})`,navView:"__ha__",navParams:{cluster:a.clusterId}})}for(const a of O)t.push({sev:a.severity,cluster:a.cluster,target:`log:${a.node}:${a.category}`,category:s(`health.cat.log.${a.category}`),msg:`${a.node}: ${s("health.log.times",{n:a.count})}`+(a.sample?` — ${a.sample.slice(0,160)}`:""),navView:"cluster-core",navParams:{cluster:a.clusterId}});for(const a of P)t.push({sev:"warning",cluster:a.cluster,target:`repl:${a.sid}`,category:s("health.cat.replication"),msg:`${a.sid}: ${a.error}`,navView:"__repl__",navParams:{cluster:a.clusterId}});return t.sort((a,p)=>{const y=oe[a.sev]-oe[p.sev];if(y!==0)return y;const o=`${a.cluster}|${a.target}|${a.category}|${a.msg}`,m=`${p.cluster}|${p.target}|${p.category}|${p.msg}`;return o.localeCompare(m)}),t},[v,z,b,x,V,P,O,k,Z,g,s]),A=t=>`${t.cluster}|${t.target}|${t.category}`,ae=h.useRef(new Map),K=h.useRef(new Set),[B,te]=h.useState(new Map),se=h.useRef(void 0);h.useEffect(()=>{const t=new Set(R.map(A)),f=[...K.current].filter(u=>!t.has(u));return R.forEach(u=>ae.current.set(A(u),u)),f.length>0&&K.current.size>0&&(te(u=>{const j=new Map(u);for(const N of f){const a=ae.current.get(N);a&&j.set(N,a)}return j}),se.current=window.setTimeout(()=>{te(u=>{const j=new Map(u);return f.forEach(N=>j.delete(N)),j})},450)),K.current=t,()=>window.clearTimeout(se.current)},[R]);const de=h.useMemo(()=>{const t=new Set(R.map(A)),f=[...B.entries()].filter(([u])=>!t.has(u)).map(([,u])=>u);return[...R,...f]},[R,B]),Y=h.useMemo(()=>{const t={critical:0,warning:0,info:0,ok:0};for(const f of R)t[f.sev]++;return t},[R]),I=h.useMemo(()=>{let t=0,f=0,u=0,j=0,N=0,a=0,p=0;for(const y of Object.values(v)){for(const o of Object.values(y.nodes||{}))t++,o.status==="online"&&f++;for(const o of Object.values(y.vms||{}))o.type==="lxc"?(N++,o.status==="running"&&a++):(u++,o.status==="running"&&j++);p+=Object.keys(y.storages||{}).length}return{nodes:t,online:f,vms:u,running:j,cts:N,ctsRunning:a,storages:p}},[v]);return e.jsxs("div",{className:"hm-page",children:[e.jsxs("div",{className:"hm-header",children:[e.jsxs("div",{className:"title-section",children:[e.jsxs("h1",{className:"hm-title font-display",children:[e.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),s("health.title")]}),e.jsxs("div",{className:"hm-sub",children:[s("health.subtitle"),H?` · ${s("health.updated")} ${new Date(H).toLocaleTimeString()}`:""]})]}),e.jsxs("div",{className:"hm-tally",children:[Object.keys(v).map(t=>{var f;return e.jsxs("button",{className:"hm-cap-btn",onClick:()=>ee(t),title:g==="zh-TW"?"儲存成長預測與閒置的虛擬機":"Storage growth forecast and idle guests",children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M3 3v18h18"}),e.jsx("path",{d:"M7 15l4-4 3 3 6-6"}),e.jsx("path",{d:"M16 8h4v4"})]}),e.jsxs("span",{children:[g==="zh-TW"?"容量預測":"Capacity",Object.keys(v).length>1?` · ${((f=v[t])==null?void 0:f.name)||t}`:""]})]},t)}),e.jsxs("span",{className:"hm-pill hm-pill-critical",children:[Y.critical," ",s("health.sev.critical")]}),e.jsxs("span",{className:"hm-pill hm-pill-warning",children:[Y.warning," ",s("health.sev.warning")]}),e.jsxs("span",{className:"hm-pill hm-pill-info",children:[Y.info," ",s("health.sev.info")]})]})]}),e.jsxs("div",{className:"hm-stats",children:[e.jsxs("div",{className:"panel-card hm-stat",onClick:()=>$("cluster-core"),children:[e.jsxs("div",{className:"hm-stat-num",children:[I.online,e.jsxs("span",{className:"hm-stat-of",children:["/",I.nodes]})]}),e.jsx("div",{className:"hm-stat-lbl",children:s("health.stat.nodes")})]}),e.jsxs("div",{className:"panel-card hm-stat",onClick:()=>$("holo-matrix"),children:[e.jsxs("div",{className:"hm-stat-num",children:[I.running,e.jsxs("span",{className:"hm-stat-of",children:["/",I.vms]})]}),e.jsx("div",{className:"hm-stat-lbl",children:s("health.stat.vms")})]}),e.jsxs("div",{className:"panel-card hm-stat",onClick:()=>$("holo-matrix"),children:[e.jsxs("div",{className:"hm-stat-num",children:[I.ctsRunning,e.jsxs("span",{className:"hm-stat-of",children:["/",I.cts]})]}),e.jsx("div",{className:"hm-stat-lbl",children:s("health.stat.cts")})]}),e.jsxs("div",{className:"panel-card hm-stat",onClick:()=>$("storage"),children:[e.jsx("div",{className:"hm-stat-num",children:I.storages}),e.jsx("div",{className:"hm-stat-lbl",children:s("health.stat.storages")})]})]}),Object.keys(k).length>0&&e.jsx("div",{className:"hm-corosync",children:Object.entries(k).map(([t,f])=>{var u;return e.jsx(ue,{name:((u=v[t])==null?void 0:u.name)||t,data:f,isZh:g==="zh-TW"},t)})}),H===0?e.jsxs("div",{className:"hm-empty hm-loading",children:[e.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",opacity:"0.25"}),e.jsx("path",{d:"M21 12a9 9 0 00-9-9"})]}),e.jsx("div",{className:"hm-empty-title",children:s("health.loading.title")}),e.jsx("div",{className:"hm-empty-sub",children:s("health.loading.sub")})]}):R.length===0?e.jsxs("div",{className:"hm-empty",children:[e.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),e.jsx("div",{className:"hm-empty-title",children:s("health.empty.title")}),e.jsx("div",{className:"hm-empty-sub",children:s("health.empty.sub")})]}):e.jsx("div",{className:"hm-grid",children:de.map(t=>e.jsxs("div",{className:`hm-card hm-card-${t.sev}${B.has(`${t.cluster}|${t.target}|${t.category}`)?" hm-card-leaving":""}`,onClick:()=>{var f,u,j;if(t.navView){if(t.navView==="__ha__"){G(((f=t.navParams)==null?void 0:f.cluster)||null);return}if(t.navView==="__repl__"){X(((u=t.navParams)==null?void 0:u.cluster)||null);return}$(t.navView,{cluster:(j=t.navParams)==null?void 0:j.cluster})}},children:[e.jsxs("div",{className:"hm-card-head",children:[e.jsx("span",{className:"hm-card-sev",children:t.sev.toUpperCase()}),e.jsx("span",{className:"hm-card-cluster",children:t.cluster})]}),e.jsx("div",{className:"hm-card-cat",children:t.category}),e.jsx("div",{className:"hm-card-msg",children:t.msg})]},`${t.cluster}|${t.target}|${t.category}`))}),e.jsx(pe,{open:Q!==null,clusterId:Q||"",onClose:()=>G(null)}),e.jsx(he,{open:J!==null,clusterId:J||"",onClose:()=>X(null)}),W&&e.jsx(me,{clusterId:W,clusterName:((re=v[W])==null?void 0:re.name)||W,onClose:()=>ee(null)}),e.jsx("style",{children:`
        .hm-page {
          padding: 24px 32px; height: 100%;
          display: flex; flex-direction: column; gap: 20px;
          color: var(--text-primary);
        }
        .hm-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
          margin-bottom: var(--spacing-md);
        }
        .title-section { display: flex; flex-direction: column; gap: 2px; }
        .hm-title {
          display: flex; align-items: center; gap: var(--spacing-sm);
          margin: 0;
          font-size: 22px; font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }
        .hm-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0,240,255,0.6));
          animation: hm-title-pulse 2s ease-in-out infinite;
        }
        @keyframes hm-title-pulse {
          0%,100% { opacity: 0.85; transform: none; }
          50%     { opacity: 1;    transform: scale(1.05); }
        }
        .hm-sub {
          font-size: 12px; color: var(--text-secondary);
          font-family: var(--font-mono); margin-top: 4px;
        }
        .hm-tally { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .hm-cap-btn { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 4px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background .15s ease, transform .15s ease, box-shadow .15s ease; }
        .hm-cap-btn:hover { background: rgba(0, 240, 255, 0.16); transform: translateY(-1px); box-shadow: 0 4px 14px -6px rgba(0, 240, 255, .6); }
        /* Severity pill — tinted bg + bright readable text + saturated
           border. Earlier version used the raw severity color as both
           text and border on a transparent bg, which made the red/orange
           text nearly illegible against the dark page background. */
        .hm-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px; border-radius: 999px;
          font-family: var(--font-mono); font-size: 13px;
          font-weight: 600;
          letter-spacing: .05em;
          border: 1px solid;
        }
        .hm-pill::before {
          content: ''; width: 7px; height: 7px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 8px currentColor;
          flex-shrink: 0;
        }
        .hm-pill-critical {
          color: #ff8aa3;
          border-color: rgba(255, 0, 64, 0.7);
          background: rgba(255, 0, 64, 0.14);
          text-shadow: 0 0 6px rgba(255, 0, 64, 0.55);
        }
        .hm-pill-critical::before {
          background: #ff3a6e;
          box-shadow: 0 0 10px #ff3a6e;
        }
        .hm-pill-warning {
          color: #ffcc7a;
          border-color: rgba(255, 107, 0, 0.7);
          background: rgba(255, 107, 0, 0.14);
          text-shadow: 0 0 6px rgba(255, 107, 0, 0.55);
        }
        .hm-pill-warning::before {
          background: #ff9540;
          box-shadow: 0 0 10px #ff9540;
        }
        .hm-pill-info {
          color: #a8efff;
          border-color: rgba(0, 240, 255, 0.6);
          background: rgba(0, 240, 255, 0.10);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.45);
        }
        .hm-pill-info::before {
          background: #00f0ff;
          box-shadow: 0 0 10px #00f0ff;
        }

        .hm-stats {
          display: grid; gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }
        /* Surface comes from panel-card; breathe disabled on small stat
           tiles (same call as the dashboard hero tiles — the animated
           shadow costs paint and adds no signal here). */
        .hm-stat {
          padding: 16px 20px;
          cursor: pointer;
          transition: all .15s;
          animation: none;
        }
        .hm-stat:hover {
          background: rgba(0, 240, 255, 0.10);
          border-color: var(--primary);
          transform: translateY(-1px);
        }
        .hm-stat-num {
          font-family: var(--font-display);
          font-size: 28px; font-weight: 600;
          color: var(--primary);
          letter-spacing: 0.05em;
        }
        .hm-stat-of {
          color: var(--text-secondary); font-size: 18px;
          margin-left: 4px; opacity: .7;
        }
        .hm-stat-lbl {
          font-family: var(--font-display);
          font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
          color: var(--text-secondary); margin-top: 4px;
        }

        /* Corosync status panel(s) */
        .hm-corosync {
          display: grid; gap: 12px;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
        }
        .coro-card { padding: 14px 16px; }
        .coro-head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .coro-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 8px var(--primary); }
        .coro-title { font-family: var(--font-display); font-size: 13px; letter-spacing: 0.1em; color: var(--text-primary); }
        .coro-quorum {
          margin-left: auto; padding: 2px 10px; border-radius: 999px;
          font-family: var(--font-display); font-size: 11px; letter-spacing: 0.08em;
          border: 1px solid currentColor;
        }
        .coro-quorum.ok  { color: var(--success, #00ff88); }
        .coro-quorum.bad { color: #fff; background: var(--danger, #ff0040); border-color: var(--danger, #ff0040); box-shadow: 0 0 8px rgba(255,0,64,.5); }
        .coro-quorum.na  { color: var(--text-muted); }
        .coro-meta {
          display: flex; flex-wrap: wrap; gap: 6px 18px;
          font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);
          margin-bottom: 10px;
        }
        .coro-meta b { color: var(--text-primary); }
        .coro-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 12px; }
        .coro-table th {
          text-align: left; padding: 6px 8px;
          font-family: var(--font-display); font-size: 11px; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--primary);
          border-bottom: 1px solid rgba(0,240,255,.2);
        }
        .coro-table td { padding: 6px 8px; border-bottom: 1px solid rgba(0,240,255,.06); color: var(--text-primary); }
        .coro-node { font-weight: 600; }
        .coro-local { color: var(--primary); }
        .coro-mono { color: var(--text-secondary); }
        .coro-online { font-family: var(--font-display); font-size: 10px; letter-spacing: .06em; padding: 1px 7px; border-radius: 999px; border: 1px solid currentColor; }
        .coro-online.on  { color: var(--success, #00ff88); }
        .coro-online.off { color: #fff; background: var(--danger, #ff0040); border-color: var(--danger, #ff0040); }
        .coro-link {
          display: inline-block; margin: 1px 4px 1px 0; padding: 1px 7px;
          border-radius: 3px; font-size: 11px; border: 1px solid currentColor;
        }
        .coro-link.ok   { color: var(--success, #00ff88); background: rgba(0,255,136,.08); }
        .coro-link.down { color: #fff; background: var(--danger, #ff0040); border-color: var(--danger, #ff0040); }
        .coro-link.na   { color: var(--text-muted); }
        .coro-na { color: var(--text-muted); }
        .coro-sshnote {
          margin-top: 10px; padding: 7px 10px;
          background: rgba(0,240,255,.04); border-left: 2px solid rgba(0,240,255,.4);
          border-radius: 3px; font-size: 11px; color: var(--text-secondary); line-height: 1.5;
        }

        .hm-grid {
          display: grid; gap: 10px;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
        .hm-card {
          /* Canonical panel-card surface, but keeps the severity-colored
             left rail (currentColor + 3px) since the colour conveys the
             severity at a glance — that's a deliberate exception, not
             style drift. */
          position: relative;
          padding: 12px 16px;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-left: 3px solid currentColor;
          border-radius: var(--radius-md);
          cursor: pointer;
          overflow: hidden;
          transition: transform .15s, box-shadow .15s, border-color .15s;
        }
        .hm-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.55;
          pointer-events: none;
        }
        .hm-card::after {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          animation: scan-line 5s ease-in-out infinite;
          pointer-events: none;
        }
        .hm-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(0, 240, 255, 0.16),
                      0 0 0 1px rgba(0, 240, 255, 0.12);
        }
        /* Hologram materialize on mount — only NEW cards mount thanks to
           stable keys, so steady-state polls animate nothing. */
        .hm-card {
          animation: hm-card-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        @keyframes hm-card-in {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
            filter: brightness(2.2);
            clip-path: inset(0 0 92% 0);
          }
          55% { clip-path: inset(0 0 0 0); }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
            clip-path: inset(0 0 0 0);
          }
        }
        /* Dissolve-out for findings that cleared — the ghost row is
           removed from the DOM right after the animation ends. */
        .hm-card-leaving {
          animation: hm-card-out 0.4s ease-in forwards;
          pointer-events: none;
        }
        @keyframes hm-card-out {
          0%   { opacity: 1; transform: none; filter: none; }
          100% { opacity: 0; transform: translateY(-8px) scale(0.96); filter: brightness(1.8); }
        }
        .hm-card-critical { color: var(--danger, #ff4d6d); }
        .hm-card-warning  { color: var(--warning); }
        .hm-card-info     { color: var(--primary); }

        .hm-card-head {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 4px;
        }
        .hm-card-sev {
          font-family: var(--font-display);
          font-size: 10px; letter-spacing: .12em;
          font-weight: 600;
        }
        .hm-card-cluster {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary); opacity: .85;
        }
        .hm-card-cat {
          font-family: var(--font-display);
          font-size: 13px; letter-spacing: .04em;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .hm-card-msg {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary);
          word-break: break-all;
        }

        .hm-empty {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; text-align: center;
          color: var(--success); padding: 60px 20px; gap: 14px;
        }
        .hm-empty svg {
          stroke: var(--success);
          filter: drop-shadow(0 0 12px rgba(0, 255, 136, 0.5));
        }
        /* Loading variant — cyan spinner instead of success-green check. */
        .hm-empty.hm-loading { color: var(--primary); }
        .hm-empty.hm-loading svg {
          stroke: var(--primary);
          filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.5));
          animation: hm-spin 1.1s linear infinite;
        }
        @keyframes hm-spin {
          to { transform: rotate(360deg); }
        }
        .hm-empty-title {
          font-family: var(--font-display); font-size: 18px;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--success);
        }
        .hm-empty-sub {
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-secondary);
        }
      `})]})}export{xe as HealthMonitor};
