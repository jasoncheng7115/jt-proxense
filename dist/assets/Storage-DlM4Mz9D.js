import{r as y,j as r,u as Yt,e as Me,d as lt,c as sn,g as we,a as Rn,b as Wn}from"./index-HzkmC-WK.js";import{R as Pn}from"./RRDChartModal-C3vJHUQy.js";var In={value:()=>{}};function ln(){for(var t=0,e=arguments.length,n={},a;t<e;++t){if(!(a=arguments[t]+"")||a in n||/[\s.]/.test(a))throw new Error("illegal type: "+a);n[a]=[]}return new ne(n)}function ne(t){this._=t}function Dn(t,e){return t.trim().split(/^|\s+/).map(function(n){var a="",i=n.indexOf(".");if(i>=0&&(a=n.slice(i+1),n=n.slice(0,i)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:a}})}ne.prototype=ln.prototype={constructor:ne,on:function(t,e){var n=this._,a=Dn(t+"",n),i,o=-1,s=a.length;if(arguments.length<2){for(;++o<s;)if((i=(t=a[o]).type)&&(i=Ln(n[i],t.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++o<s;)if(i=(t=a[o]).type)n[i]=De(n[i],t.name,e);else if(e==null)for(i in n)n[i]=De(n[i],t.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new ne(t)},call:function(t,e){if((i=arguments.length-2)>0)for(var n=new Array(i),a=0,i,o;a<i;++a)n[a]=arguments[a+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(o=this._[t],a=0,i=o.length;a<i;++a)o[a].value.apply(e,n)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var a=this._[t],i=0,o=a.length;i<o;++i)a[i].value.apply(e,n)}};function Ln(t,e){for(var n=0,a=t.length,i;n<a;++n)if((i=t[n]).name===e)return i.value}function De(t,e,n){for(var a=0,i=t.length;a<i;++a)if(t[a].name===e){t[a]=In,t=t.slice(0,a).concat(t.slice(a+1));break}return n!=null&&t.push({name:e,value:n}),t}var ke="http://www.w3.org/1999/xhtml";const Le={svg:"http://www.w3.org/2000/svg",xhtml:ke,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function he(t){var e=t+="",n=e.indexOf(":");return n>=0&&(e=t.slice(0,n))!=="xmlns"&&(t=t.slice(n+1)),Le.hasOwnProperty(e)?{space:Le[e],local:t}:t}function qn(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===ke&&e.documentElement.namespaceURI===ke?e.createElement(t):e.createElementNS(n,t)}}function Un(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function cn(t){var e=he(t);return(e.local?Un:qn)(e)}function On(){}function Te(t){return t==null?On:function(){return this.querySelector(t)}}function Vn(t){typeof t!="function"&&(t=Te(t));for(var e=this._groups,n=e.length,a=new Array(n),i=0;i<n;++i)for(var o=e[i],s=o.length,c=a[i]=new Array(s),p,l,f=0;f<s;++f)(p=o[f])&&(l=t.call(p,p.__data__,f,o))&&("__data__"in p&&(l.__data__=p.__data__),c[f]=l);return new mt(a,this._parents)}function Hn(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function Yn(){return[]}function dn(t){return t==null?Yn:function(){return this.querySelectorAll(t)}}function Xn(t){return function(){return Hn(t.apply(this,arguments))}}function Gn(t){typeof t=="function"?t=Xn(t):t=dn(t);for(var e=this._groups,n=e.length,a=[],i=[],o=0;o<n;++o)for(var s=e[o],c=s.length,p,l=0;l<c;++l)(p=s[l])&&(a.push(t.call(p,p.__data__,l,s)),i.push(p));return new mt(a,i)}function pn(t){return function(){return this.matches(t)}}function hn(t){return function(e){return e.matches(t)}}var Kn=Array.prototype.find;function Zn(t){return function(){return Kn.call(this.children,t)}}function Jn(){return this.firstElementChild}function Qn(t){return this.select(t==null?Jn:Zn(typeof t=="function"?t:hn(t)))}var tr=Array.prototype.filter;function er(){return Array.from(this.children)}function nr(t){return function(){return tr.call(this.children,t)}}function rr(t){return this.selectAll(t==null?er:nr(typeof t=="function"?t:hn(t)))}function ar(t){typeof t!="function"&&(t=pn(t));for(var e=this._groups,n=e.length,a=new Array(n),i=0;i<n;++i)for(var o=e[i],s=o.length,c=a[i]=[],p,l=0;l<s;++l)(p=o[l])&&t.call(p,p.__data__,l,o)&&c.push(p);return new mt(a,this._parents)}function fn(t){return new Array(t.length)}function ir(){return new mt(this._enter||this._groups.map(fn),this._parents)}function ie(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}ie.prototype={constructor:ie,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function or(t){return function(){return t}}function sr(t,e,n,a,i,o){for(var s=0,c,p=e.length,l=o.length;s<l;++s)(c=e[s])?(c.__data__=o[s],a[s]=c):n[s]=new ie(t,o[s]);for(;s<p;++s)(c=e[s])&&(i[s]=c)}function lr(t,e,n,a,i,o,s){var c,p,l=new Map,f=e.length,g=o.length,h=new Array(f),u;for(c=0;c<f;++c)(p=e[c])&&(h[c]=u=s.call(p,p.__data__,c,e)+"",l.has(u)?i[c]=p:l.set(u,p));for(c=0;c<g;++c)u=s.call(t,o[c],c,o)+"",(p=l.get(u))?(a[c]=p,p.__data__=o[c],l.delete(u)):n[c]=new ie(t,o[c]);for(c=0;c<f;++c)(p=e[c])&&l.get(h[c])===p&&(i[c]=p)}function cr(t){return t.__data__}function dr(t,e){if(!arguments.length)return Array.from(this,cr);var n=e?lr:sr,a=this._parents,i=this._groups;typeof t!="function"&&(t=or(t));for(var o=i.length,s=new Array(o),c=new Array(o),p=new Array(o),l=0;l<o;++l){var f=a[l],g=i[l],h=g.length,u=pr(t.call(f,f&&f.__data__,l,a)),v=u.length,N=c[l]=new Array(v),z=s[l]=new Array(v),W=p[l]=new Array(h);n(f,g,N,z,W,u,e);for(var L=0,B=0,q,H;L<v;++L)if(q=N[L]){for(L>=B&&(B=L+1);!(H=z[B])&&++B<v;);q._next=H||null}}return s=new mt(s,a),s._enter=c,s._exit=p,s}function pr(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function hr(){return new mt(this._exit||this._groups.map(fn),this._parents)}function fr(t,e,n){var a=this.enter(),i=this,o=this.exit();return typeof t=="function"?(a=t(a),a&&(a=a.selection())):a=a.append(t+""),e!=null&&(i=e(i),i&&(i=i.selection())),n==null?o.remove():n(o),a&&i?a.merge(i).order():i}function ur(t){for(var e=t.selection?t.selection():t,n=this._groups,a=e._groups,i=n.length,o=a.length,s=Math.min(i,o),c=new Array(i),p=0;p<s;++p)for(var l=n[p],f=a[p],g=l.length,h=c[p]=new Array(g),u,v=0;v<g;++v)(u=l[v]||f[v])&&(h[v]=u);for(;p<i;++p)c[p]=n[p];return new mt(c,this._parents)}function gr(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var a=t[e],i=a.length-1,o=a[i],s;--i>=0;)(s=a[i])&&(o&&s.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(s,o),o=s);return this}function mr(t){t||(t=xr);function e(g,h){return g&&h?t(g.__data__,h.__data__):!g-!h}for(var n=this._groups,a=n.length,i=new Array(a),o=0;o<a;++o){for(var s=n[o],c=s.length,p=i[o]=new Array(c),l,f=0;f<c;++f)(l=s[f])&&(p[f]=l);p.sort(e)}return new mt(i,this._parents).order()}function xr(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function br(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function yr(){return Array.from(this)}function vr(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var a=t[e],i=0,o=a.length;i<o;++i){var s=a[i];if(s)return s}return null}function wr(){let t=0;for(const e of this)++t;return t}function kr(){return!this.node()}function jr(t){for(var e=this._groups,n=0,a=e.length;n<a;++n)for(var i=e[n],o=0,s=i.length,c;o<s;++o)(c=i[o])&&t.call(c,c.__data__,o,i);return this}function _r(t){return function(){this.removeAttribute(t)}}function Nr(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Cr(t,e){return function(){this.setAttribute(t,e)}}function Sr(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function zr(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttribute(t):this.setAttribute(t,n)}}function Mr(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function Tr(t,e){var n=he(t);if(arguments.length<2){var a=this.node();return n.local?a.getAttributeNS(n.space,n.local):a.getAttribute(n)}return this.each((e==null?n.local?Nr:_r:typeof e=="function"?n.local?Mr:zr:n.local?Sr:Cr)(n,e))}function un(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function $r(t){return function(){this.style.removeProperty(t)}}function Fr(t,e,n){return function(){this.style.setProperty(t,e,n)}}function Br(t,e,n){return function(){var a=e.apply(this,arguments);a==null?this.style.removeProperty(t):this.style.setProperty(t,a,n)}}function Er(t,e,n){return arguments.length>1?this.each((e==null?$r:typeof e=="function"?Br:Fr)(t,e,n??"")):At(this.node(),t)}function At(t,e){return t.style.getPropertyValue(e)||un(t).getComputedStyle(t,null).getPropertyValue(e)}function Ar(t){return function(){delete this[t]}}function Rr(t,e){return function(){this[t]=e}}function Wr(t,e){return function(){var n=e.apply(this,arguments);n==null?delete this[t]:this[t]=n}}function Pr(t,e){return arguments.length>1?this.each((e==null?Ar:typeof e=="function"?Wr:Rr)(t,e)):this.node()[t]}function gn(t){return t.trim().split(/^|\s+/)}function $e(t){return t.classList||new mn(t)}function mn(t){this._node=t,this._names=gn(t.getAttribute("class")||"")}mn.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function xn(t,e){for(var n=$e(t),a=-1,i=e.length;++a<i;)n.add(e[a])}function bn(t,e){for(var n=$e(t),a=-1,i=e.length;++a<i;)n.remove(e[a])}function Ir(t){return function(){xn(this,t)}}function Dr(t){return function(){bn(this,t)}}function Lr(t,e){return function(){(e.apply(this,arguments)?xn:bn)(this,t)}}function qr(t,e){var n=gn(t+"");if(arguments.length<2){for(var a=$e(this.node()),i=-1,o=n.length;++i<o;)if(!a.contains(n[i]))return!1;return!0}return this.each((typeof e=="function"?Lr:e?Ir:Dr)(n,e))}function Ur(){this.textContent=""}function Or(t){return function(){this.textContent=t}}function Vr(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function Hr(t){return arguments.length?this.each(t==null?Ur:(typeof t=="function"?Vr:Or)(t)):this.node().textContent}function Yr(){this.innerHTML=""}function Xr(t){return function(){this.innerHTML=t}}function Gr(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function Kr(t){return arguments.length?this.each(t==null?Yr:(typeof t=="function"?Gr:Xr)(t)):this.node().innerHTML}function Zr(){this.nextSibling&&this.parentNode.appendChild(this)}function Jr(){return this.each(Zr)}function Qr(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ta(){return this.each(Qr)}function ea(t){var e=typeof t=="function"?t:cn(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function na(){return null}function ra(t,e){var n=typeof t=="function"?t:cn(t),a=e==null?na:typeof e=="function"?e:Te(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),a.apply(this,arguments)||null)})}function aa(){var t=this.parentNode;t&&t.removeChild(this)}function ia(){return this.each(aa)}function oa(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function sa(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function la(t){return this.select(t?sa:oa)}function ca(t){return arguments.length?this.property("__data__",t):this.node().__data__}function da(t){return function(e){t.call(this,e,this.__data__)}}function pa(t){return t.trim().split(/^|\s+/).map(function(e){var n="",a=e.indexOf(".");return a>=0&&(n=e.slice(a+1),e=e.slice(0,a)),{type:e,name:n}})}function ha(t){return function(){var e=this.__on;if(e){for(var n=0,a=-1,i=e.length,o;n<i;++n)o=e[n],(!t.type||o.type===t.type)&&o.name===t.name?this.removeEventListener(o.type,o.listener,o.options):e[++a]=o;++a?e.length=a:delete this.__on}}}function fa(t,e,n){return function(){var a=this.__on,i,o=da(e);if(a){for(var s=0,c=a.length;s<c;++s)if((i=a[s]).type===t.type&&i.name===t.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=o,i.options=n),i.value=e;return}}this.addEventListener(t.type,o,n),i={type:t.type,name:t.name,value:e,listener:o,options:n},a?a.push(i):this.__on=[i]}}function ua(t,e,n){var a=pa(t+""),i,o=a.length,s;if(arguments.length<2){var c=this.node().__on;if(c){for(var p=0,l=c.length,f;p<l;++p)for(i=0,f=c[p];i<o;++i)if((s=a[i]).type===f.type&&s.name===f.name)return f.value}return}for(c=e?fa:ha,i=0;i<o;++i)this.each(c(a[i],e,n));return this}function yn(t,e,n){var a=un(t),i=a.CustomEvent;typeof i=="function"?i=new i(e,n):(i=a.document.createEvent("Event"),n?(i.initEvent(e,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(e,!1,!1)),t.dispatchEvent(i)}function ga(t,e){return function(){return yn(this,t,e)}}function ma(t,e){return function(){return yn(this,t,e.apply(this,arguments))}}function xa(t,e){return this.each((typeof e=="function"?ma:ga)(t,e))}function*ba(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var a=t[e],i=0,o=a.length,s;i<o;++i)(s=a[i])&&(yield s)}var ya=[null];function mt(t,e){this._groups=t,this._parents=e}function Xt(){return new mt([[document.documentElement]],ya)}function va(){return this}mt.prototype=Xt.prototype={constructor:mt,select:Vn,selectAll:Gn,selectChild:Qn,selectChildren:rr,filter:ar,data:dr,enter:ir,exit:hr,join:fr,merge:ur,selection:va,order:gr,sort:mr,call:br,nodes:yr,node:vr,size:wr,empty:kr,each:jr,attr:Tr,style:Er,property:Pr,classed:qr,text:Hr,html:Kr,raise:Jr,lower:ta,append:ea,insert:ra,remove:ia,clone:la,datum:ca,on:ua,dispatch:xa,[Symbol.iterator]:ba};function Fe(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function vn(t,e){var n=Object.create(t.prototype);for(var a in e)n[a]=e[a];return n}function Gt(){}var Ut=.7,oe=1/Ut,Et="\\s*([+-]?\\d+)\\s*",Ot="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",yt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",wa=/^#([0-9a-f]{3,8})$/,ka=new RegExp(`^rgb\\(${Et},${Et},${Et}\\)$`),ja=new RegExp(`^rgb\\(${yt},${yt},${yt}\\)$`),_a=new RegExp(`^rgba\\(${Et},${Et},${Et},${Ot}\\)$`),Na=new RegExp(`^rgba\\(${yt},${yt},${yt},${Ot}\\)$`),Ca=new RegExp(`^hsl\\(${Ot},${yt},${yt}\\)$`),Sa=new RegExp(`^hsla\\(${Ot},${yt},${yt},${Ot}\\)$`),qe={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Fe(Gt,Vt,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:Ue,formatHex:Ue,formatHex8:za,formatHsl:Ma,formatRgb:Oe,toString:Oe});function Ue(){return this.rgb().formatHex()}function za(){return this.rgb().formatHex8()}function Ma(){return wn(this).formatHsl()}function Oe(){return this.rgb().formatRgb()}function Vt(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=wa.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?Ve(e):n===3?new ct(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?Qt(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?Qt(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=ka.exec(t))?new ct(e[1],e[2],e[3],1):(e=ja.exec(t))?new ct(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=_a.exec(t))?Qt(e[1],e[2],e[3],e[4]):(e=Na.exec(t))?Qt(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=Ca.exec(t))?Xe(e[1],e[2]/100,e[3]/100,1):(e=Sa.exec(t))?Xe(e[1],e[2]/100,e[3]/100,e[4]):qe.hasOwnProperty(t)?Ve(qe[t]):t==="transparent"?new ct(NaN,NaN,NaN,0):null}function Ve(t){return new ct(t>>16&255,t>>8&255,t&255,1)}function Qt(t,e,n,a){return a<=0&&(t=e=n=NaN),new ct(t,e,n,a)}function Ta(t){return t instanceof Gt||(t=Vt(t)),t?(t=t.rgb(),new ct(t.r,t.g,t.b,t.opacity)):new ct}function je(t,e,n,a){return arguments.length===1?Ta(t):new ct(t,e,n,a??1)}function ct(t,e,n,a){this.r=+t,this.g=+e,this.b=+n,this.opacity=+a}Fe(ct,je,vn(Gt,{brighter(t){return t=t==null?oe:Math.pow(oe,t),new ct(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?Ut:Math.pow(Ut,t),new ct(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new ct(zt(this.r),zt(this.g),zt(this.b),se(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:He,formatHex:He,formatHex8:$a,formatRgb:Ye,toString:Ye}));function He(){return`#${St(this.r)}${St(this.g)}${St(this.b)}`}function $a(){return`#${St(this.r)}${St(this.g)}${St(this.b)}${St((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ye(){const t=se(this.opacity);return`${t===1?"rgb(":"rgba("}${zt(this.r)}, ${zt(this.g)}, ${zt(this.b)}${t===1?")":`, ${t})`}`}function se(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function zt(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function St(t){return t=zt(t),(t<16?"0":"")+t.toString(16)}function Xe(t,e,n,a){return a<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new gt(t,e,n,a)}function wn(t){if(t instanceof gt)return new gt(t.h,t.s,t.l,t.opacity);if(t instanceof Gt||(t=Vt(t)),!t)return new gt;if(t instanceof gt)return t;t=t.rgb();var e=t.r/255,n=t.g/255,a=t.b/255,i=Math.min(e,n,a),o=Math.max(e,n,a),s=NaN,c=o-i,p=(o+i)/2;return c?(e===o?s=(n-a)/c+(n<a)*6:n===o?s=(a-e)/c+2:s=(e-n)/c+4,c/=p<.5?o+i:2-o-i,s*=60):c=p>0&&p<1?0:s,new gt(s,c,p,t.opacity)}function Fa(t,e,n,a){return arguments.length===1?wn(t):new gt(t,e,n,a??1)}function gt(t,e,n,a){this.h=+t,this.s=+e,this.l=+n,this.opacity=+a}Fe(gt,Fa,vn(Gt,{brighter(t){return t=t==null?oe:Math.pow(oe,t),new gt(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?Ut:Math.pow(Ut,t),new gt(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,a=n+(n<.5?n:1-n)*e,i=2*n-a;return new ct(be(t>=240?t-240:t+120,i,a),be(t,i,a),be(t<120?t+240:t-120,i,a),this.opacity)},clamp(){return new gt(Ge(this.h),te(this.s),te(this.l),se(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=se(this.opacity);return`${t===1?"hsl(":"hsla("}${Ge(this.h)}, ${te(this.s)*100}%, ${te(this.l)*100}%${t===1?")":`, ${t})`}`}}));function Ge(t){return t=(t||0)%360,t<0?t+360:t}function te(t){return Math.max(0,Math.min(1,t||0))}function be(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}const kn=t=>()=>t;function Ba(t,e){return function(n){return t+n*e}}function Ea(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(a){return Math.pow(t+a*e,n)}}function Aa(t){return(t=+t)==1?jn:function(e,n){return n-e?Ea(e,n,t):kn(isNaN(e)?n:e)}}function jn(t,e){var n=e-t;return n?Ba(t,n):kn(isNaN(t)?e:t)}const Ke=function t(e){var n=Aa(e);function a(i,o){var s=n((i=je(i)).r,(o=je(o)).r),c=n(i.g,o.g),p=n(i.b,o.b),l=jn(i.opacity,o.opacity);return function(f){return i.r=s(f),i.g=c(f),i.b=p(f),i.opacity=l(f),i+""}}return a.gamma=t,a}(1);function _t(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}var _e=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ye=new RegExp(_e.source,"g");function Ra(t){return function(){return t}}function Wa(t){return function(e){return t(e)+""}}function Pa(t,e){var n=_e.lastIndex=ye.lastIndex=0,a,i,o,s=-1,c=[],p=[];for(t=t+"",e=e+"";(a=_e.exec(t))&&(i=ye.exec(e));)(o=i.index)>n&&(o=e.slice(n,o),c[s]?c[s]+=o:c[++s]=o),(a=a[0])===(i=i[0])?c[s]?c[s]+=i:c[++s]=i:(c[++s]=null,p.push({i:s,x:_t(a,i)})),n=ye.lastIndex;return n<e.length&&(o=e.slice(n),c[s]?c[s]+=o:c[++s]=o),c.length<2?p[0]?Wa(p[0].x):Ra(e):(e=p.length,function(l){for(var f=0,g;f<e;++f)c[(g=p[f]).i]=g.x(l);return c.join("")})}var Ze=180/Math.PI,Ne={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function _n(t,e,n,a,i,o){var s,c,p;return(s=Math.sqrt(t*t+e*e))&&(t/=s,e/=s),(p=t*n+e*a)&&(n-=t*p,a-=e*p),(c=Math.sqrt(n*n+a*a))&&(n/=c,a/=c,p/=c),t*a<e*n&&(t=-t,e=-e,p=-p,s=-s),{translateX:i,translateY:o,rotate:Math.atan2(e,t)*Ze,skewX:Math.atan(p)*Ze,scaleX:s,scaleY:c}}var ee;function Ia(t){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?Ne:_n(e.a,e.b,e.c,e.d,e.e,e.f)}function Da(t){return t==null||(ee||(ee=document.createElementNS("http://www.w3.org/2000/svg","g")),ee.setAttribute("transform",t),!(t=ee.transform.baseVal.consolidate()))?Ne:(t=t.matrix,_n(t.a,t.b,t.c,t.d,t.e,t.f))}function Nn(t,e,n,a){function i(l){return l.length?l.pop()+" ":""}function o(l,f,g,h,u,v){if(l!==g||f!==h){var N=u.push("translate(",null,e,null,n);v.push({i:N-4,x:_t(l,g)},{i:N-2,x:_t(f,h)})}else(g||h)&&u.push("translate("+g+e+h+n)}function s(l,f,g,h){l!==f?(l-f>180?f+=360:f-l>180&&(l+=360),h.push({i:g.push(i(g)+"rotate(",null,a)-2,x:_t(l,f)})):f&&g.push(i(g)+"rotate("+f+a)}function c(l,f,g,h){l!==f?h.push({i:g.push(i(g)+"skewX(",null,a)-2,x:_t(l,f)}):f&&g.push(i(g)+"skewX("+f+a)}function p(l,f,g,h,u,v){if(l!==g||f!==h){var N=u.push(i(u)+"scale(",null,",",null,")");v.push({i:N-4,x:_t(l,g)},{i:N-2,x:_t(f,h)})}else(g!==1||h!==1)&&u.push(i(u)+"scale("+g+","+h+")")}return function(l,f){var g=[],h=[];return l=t(l),f=t(f),o(l.translateX,l.translateY,f.translateX,f.translateY,g,h),s(l.rotate,f.rotate,g,h),c(l.skewX,f.skewX,g,h),p(l.scaleX,l.scaleY,f.scaleX,f.scaleY,g,h),l=f=null,function(u){for(var v=-1,N=h.length,z;++v<N;)g[(z=h[v]).i]=z.x(u);return g.join("")}}}var La=Nn(Ia,"px, ","px)","deg)"),qa=Nn(Da,", ",")",")"),Rt=0,Dt=0,Wt=0,Cn=1e3,le,Lt,ce=0,Mt=0,fe=0,Ht=typeof performance=="object"&&performance.now?performance:Date,Sn=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function Be(){return Mt||(Sn(Ua),Mt=Ht.now()+fe)}function Ua(){Mt=0}function de(){this._call=this._time=this._next=null}de.prototype=zn.prototype={constructor:de,restart:function(t,e,n){if(typeof t!="function")throw new TypeError("callback is not a function");n=(n==null?Be():+n)+(e==null?0:+e),!this._next&&Lt!==this&&(Lt?Lt._next=this:le=this,Lt=this),this._call=t,this._time=n,Ce()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ce())}};function zn(t,e,n){var a=new de;return a.restart(t,e,n),a}function Oa(){Be(),++Rt;for(var t=le,e;t;)(e=Mt-t._time)>=0&&t._call.call(void 0,e),t=t._next;--Rt}function Je(){Mt=(ce=Ht.now())+fe,Rt=Dt=0;try{Oa()}finally{Rt=0,Ha(),Mt=0}}function Va(){var t=Ht.now(),e=t-ce;e>Cn&&(fe-=e,ce=t)}function Ha(){for(var t,e=le,n,a=1/0;e;)e._call?(a>e._time&&(a=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:le=n);Lt=t,Ce(a)}function Ce(t){if(!Rt){Dt&&(Dt=clearTimeout(Dt));var e=t-Mt;e>24?(t<1/0&&(Dt=setTimeout(Je,t-Ht.now()-fe)),Wt&&(Wt=clearInterval(Wt))):(Wt||(ce=Ht.now(),Wt=setInterval(Va,Cn)),Rt=1,Sn(Je))}}function Qe(t,e,n){var a=new de;return e=e==null?0:+e,a.restart(i=>{a.stop(),t(i+e)},e,n),a}var Ya=ln("start","end","cancel","interrupt"),Xa=[],Mn=0,tn=1,Se=2,re=3,en=4,ze=5,ae=6;function ue(t,e,n,a,i,o){var s=t.__transition;if(!s)t.__transition={};else if(n in s)return;Ga(t,n,{name:e,index:a,group:i,on:Ya,tween:Xa,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:Mn})}function Ee(t,e){var n=xt(t,e);if(n.state>Mn)throw new Error("too late; already scheduled");return n}function vt(t,e){var n=xt(t,e);if(n.state>re)throw new Error("too late; already running");return n}function xt(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function Ga(t,e,n){var a=t.__transition,i;a[e]=n,n.timer=zn(o,0,n.time);function o(l){n.state=tn,n.timer.restart(s,n.delay,n.time),n.delay<=l&&s(l-n.delay)}function s(l){var f,g,h,u;if(n.state!==tn)return p();for(f in a)if(u=a[f],u.name===n.name){if(u.state===re)return Qe(s);u.state===en?(u.state=ae,u.timer.stop(),u.on.call("interrupt",t,t.__data__,u.index,u.group),delete a[f]):+f<e&&(u.state=ae,u.timer.stop(),u.on.call("cancel",t,t.__data__,u.index,u.group),delete a[f])}if(Qe(function(){n.state===re&&(n.state=en,n.timer.restart(c,n.delay,n.time),c(l))}),n.state=Se,n.on.call("start",t,t.__data__,n.index,n.group),n.state===Se){for(n.state=re,i=new Array(h=n.tween.length),f=0,g=-1;f<h;++f)(u=n.tween[f].value.call(t,t.__data__,n.index,n.group))&&(i[++g]=u);i.length=g+1}}function c(l){for(var f=l<n.duration?n.ease.call(null,l/n.duration):(n.timer.restart(p),n.state=ze,1),g=-1,h=i.length;++g<h;)i[g].call(t,f);n.state===ze&&(n.on.call("end",t,t.__data__,n.index,n.group),p())}function p(){n.state=ae,n.timer.stop(),delete a[e];for(var l in a)return;delete t.__transition}}function Ka(t,e){var n=t.__transition,a,i,o=!0,s;if(n){e=e==null?null:e+"";for(s in n){if((a=n[s]).name!==e){o=!1;continue}i=a.state>Se&&a.state<ze,a.state=ae,a.timer.stop(),a.on.call(i?"interrupt":"cancel",t,t.__data__,a.index,a.group),delete n[s]}o&&delete t.__transition}}function Za(t){return this.each(function(){Ka(this,t)})}function Ja(t,e){var n,a;return function(){var i=vt(this,t),o=i.tween;if(o!==n){a=n=o;for(var s=0,c=a.length;s<c;++s)if(a[s].name===e){a=a.slice(),a.splice(s,1);break}}i.tween=a}}function Qa(t,e,n){var a,i;if(typeof n!="function")throw new Error;return function(){var o=vt(this,t),s=o.tween;if(s!==a){i=(a=s).slice();for(var c={name:e,value:n},p=0,l=i.length;p<l;++p)if(i[p].name===e){i[p]=c;break}p===l&&i.push(c)}o.tween=i}}function ti(t,e){var n=this._id;if(t+="",arguments.length<2){for(var a=xt(this.node(),n).tween,i=0,o=a.length,s;i<o;++i)if((s=a[i]).name===t)return s.value;return null}return this.each((e==null?Ja:Qa)(n,t,e))}function Ae(t,e,n){var a=t._id;return t.each(function(){var i=vt(this,a);(i.value||(i.value={}))[e]=n.apply(this,arguments)}),function(i){return xt(i,a).value[e]}}function Tn(t,e){var n;return(typeof e=="number"?_t:e instanceof Vt?Ke:(n=Vt(e))?(e=n,Ke):Pa)(t,e)}function ei(t){return function(){this.removeAttribute(t)}}function ni(t){return function(){this.removeAttributeNS(t.space,t.local)}}function ri(t,e,n){var a,i=n+"",o;return function(){var s=this.getAttribute(t);return s===i?null:s===a?o:o=e(a=s,n)}}function ai(t,e,n){var a,i=n+"",o;return function(){var s=this.getAttributeNS(t.space,t.local);return s===i?null:s===a?o:o=e(a=s,n)}}function ii(t,e,n){var a,i,o;return function(){var s,c=n(this),p;return c==null?void this.removeAttribute(t):(s=this.getAttribute(t),p=c+"",s===p?null:s===a&&p===i?o:(i=p,o=e(a=s,c)))}}function oi(t,e,n){var a,i,o;return function(){var s,c=n(this),p;return c==null?void this.removeAttributeNS(t.space,t.local):(s=this.getAttributeNS(t.space,t.local),p=c+"",s===p?null:s===a&&p===i?o:(i=p,o=e(a=s,c)))}}function si(t,e){var n=he(t),a=n==="transform"?qa:Tn;return this.attrTween(t,typeof e=="function"?(n.local?oi:ii)(n,a,Ae(this,"attr."+t,e)):e==null?(n.local?ni:ei)(n):(n.local?ai:ri)(n,a,e))}function li(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function ci(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function di(t,e){var n,a;function i(){var o=e.apply(this,arguments);return o!==a&&(n=(a=o)&&ci(t,o)),n}return i._value=e,i}function pi(t,e){var n,a;function i(){var o=e.apply(this,arguments);return o!==a&&(n=(a=o)&&li(t,o)),n}return i._value=e,i}function hi(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;var a=he(t);return this.tween(n,(a.local?di:pi)(a,e))}function fi(t,e){return function(){Ee(this,t).delay=+e.apply(this,arguments)}}function ui(t,e){return e=+e,function(){Ee(this,t).delay=e}}function gi(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?fi:ui)(e,t)):xt(this.node(),e).delay}function mi(t,e){return function(){vt(this,t).duration=+e.apply(this,arguments)}}function xi(t,e){return e=+e,function(){vt(this,t).duration=e}}function bi(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?mi:xi)(e,t)):xt(this.node(),e).duration}function yi(t,e){if(typeof e!="function")throw new Error;return function(){vt(this,t).ease=e}}function vi(t){var e=this._id;return arguments.length?this.each(yi(e,t)):xt(this.node(),e).ease}function wi(t,e){return function(){var n=e.apply(this,arguments);if(typeof n!="function")throw new Error;vt(this,t).ease=n}}function ki(t){if(typeof t!="function")throw new Error;return this.each(wi(this._id,t))}function ji(t){typeof t!="function"&&(t=pn(t));for(var e=this._groups,n=e.length,a=new Array(n),i=0;i<n;++i)for(var o=e[i],s=o.length,c=a[i]=[],p,l=0;l<s;++l)(p=o[l])&&t.call(p,p.__data__,l,o)&&c.push(p);return new jt(a,this._parents,this._name,this._id)}function _i(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,a=e.length,i=n.length,o=Math.min(a,i),s=new Array(a),c=0;c<o;++c)for(var p=e[c],l=n[c],f=p.length,g=s[c]=new Array(f),h,u=0;u<f;++u)(h=p[u]||l[u])&&(g[u]=h);for(;c<a;++c)s[c]=e[c];return new jt(s,this._parents,this._name,this._id)}function Ni(t){return(t+"").trim().split(/^|\s+/).every(function(e){var n=e.indexOf(".");return n>=0&&(e=e.slice(0,n)),!e||e==="start"})}function Ci(t,e,n){var a,i,o=Ni(e)?Ee:vt;return function(){var s=o(this,t),c=s.on;c!==a&&(i=(a=c).copy()).on(e,n),s.on=i}}function Si(t,e){var n=this._id;return arguments.length<2?xt(this.node(),n).on.on(t):this.each(Ci(n,t,e))}function zi(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function Mi(){return this.on("end.remove",zi(this._id))}function Ti(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Te(t));for(var a=this._groups,i=a.length,o=new Array(i),s=0;s<i;++s)for(var c=a[s],p=c.length,l=o[s]=new Array(p),f,g,h=0;h<p;++h)(f=c[h])&&(g=t.call(f,f.__data__,h,c))&&("__data__"in f&&(g.__data__=f.__data__),l[h]=g,ue(l[h],e,n,h,l,xt(f,n)));return new jt(o,this._parents,e,n)}function $i(t){var e=this._name,n=this._id;typeof t!="function"&&(t=dn(t));for(var a=this._groups,i=a.length,o=[],s=[],c=0;c<i;++c)for(var p=a[c],l=p.length,f,g=0;g<l;++g)if(f=p[g]){for(var h=t.call(f,f.__data__,g,p),u,v=xt(f,n),N=0,z=h.length;N<z;++N)(u=h[N])&&ue(u,e,n,N,h,v);o.push(h),s.push(f)}return new jt(o,s,e,n)}var Fi=Xt.prototype.constructor;function Bi(){return new Fi(this._groups,this._parents)}function Ei(t,e){var n,a,i;return function(){var o=At(this,t),s=(this.style.removeProperty(t),At(this,t));return o===s?null:o===n&&s===a?i:i=e(n=o,a=s)}}function $n(t){return function(){this.style.removeProperty(t)}}function Ai(t,e,n){var a,i=n+"",o;return function(){var s=At(this,t);return s===i?null:s===a?o:o=e(a=s,n)}}function Ri(t,e,n){var a,i,o;return function(){var s=At(this,t),c=n(this),p=c+"";return c==null&&(p=c=(this.style.removeProperty(t),At(this,t))),s===p?null:s===a&&p===i?o:(i=p,o=e(a=s,c))}}function Wi(t,e){var n,a,i,o="style."+e,s="end."+o,c;return function(){var p=vt(this,t),l=p.on,f=p.value[o]==null?c||(c=$n(e)):void 0;(l!==n||i!==f)&&(a=(n=l).copy()).on(s,i=f),p.on=a}}function Pi(t,e,n){var a=(t+="")=="transform"?La:Tn;return e==null?this.styleTween(t,Ei(t,a)).on("end.style."+t,$n(t)):typeof e=="function"?this.styleTween(t,Ri(t,a,Ae(this,"style."+t,e))).each(Wi(this._id,t)):this.styleTween(t,Ai(t,a,e),n).on("end.style."+t,null)}function Ii(t,e,n){return function(a){this.style.setProperty(t,e.call(this,a),n)}}function Di(t,e,n){var a,i;function o(){var s=e.apply(this,arguments);return s!==i&&(a=(i=s)&&Ii(t,s,n)),a}return o._value=e,o}function Li(t,e,n){var a="style."+(t+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(e==null)return this.tween(a,null);if(typeof e!="function")throw new Error;return this.tween(a,Di(t,e,n??""))}function qi(t){return function(){this.textContent=t}}function Ui(t){return function(){var e=t(this);this.textContent=e??""}}function Oi(t){return this.tween("text",typeof t=="function"?Ui(Ae(this,"text",t)):qi(t==null?"":t+""))}function Vi(t){return function(e){this.textContent=t.call(this,e)}}function Hi(t){var e,n;function a(){var i=t.apply(this,arguments);return i!==n&&(e=(n=i)&&Vi(i)),e}return a._value=t,a}function Yi(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,Hi(t))}function Xi(){for(var t=this._name,e=this._id,n=Fn(),a=this._groups,i=a.length,o=0;o<i;++o)for(var s=a[o],c=s.length,p,l=0;l<c;++l)if(p=s[l]){var f=xt(p,e);ue(p,t,n,l,s,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new jt(a,this._parents,t,n)}function Gi(){var t,e,n=this,a=n._id,i=n.size();return new Promise(function(o,s){var c={value:s},p={value:function(){--i===0&&o()}};n.each(function(){var l=vt(this,a),f=l.on;f!==t&&(e=(t=f).copy(),e._.cancel.push(c),e._.interrupt.push(c),e._.end.push(p)),l.on=e}),i===0&&o()})}var Ki=0;function jt(t,e,n,a){this._groups=t,this._parents=e,this._name=n,this._id=a}function Fn(){return++Ki}var kt=Xt.prototype;jt.prototype={constructor:jt,select:Ti,selectAll:$i,selectChild:kt.selectChild,selectChildren:kt.selectChildren,filter:ji,merge:_i,selection:Bi,transition:Xi,call:kt.call,nodes:kt.nodes,node:kt.node,size:kt.size,empty:kt.empty,each:kt.each,on:Si,attr:si,attrTween:hi,style:Pi,styleTween:Li,text:Oi,textTween:Yi,remove:Mi,tween:ti,delay:gi,duration:bi,ease:vi,easeVarying:ki,end:Gi,[Symbol.iterator]:kt[Symbol.iterator]};function Zi(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}var Ji={time:null,delay:0,duration:250,ease:Zi};function Qi(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return n}function to(t){var e,n;t instanceof jt?(e=t._id,t=t._name):(e=Fn(),(n=Ji).time=Be(),t=t==null?null:t+"");for(var a=this._groups,i=a.length,o=0;o<i;++o)for(var s=a[o],c=s.length,p,l=0;l<c;++l)(p=s[l])&&ue(p,t,e,l,s,n||Qi(p,e));return new jt(a,this._parents,t,e)}Xt.prototype.interrupt=Za;Xt.prototype.transition=to;function eo(t){var e=0,n=t.children,a=n&&n.length;if(!a)e=1;else for(;--a>=0;)e+=n[a].value;t.value=e}function no(){return this.eachAfter(eo)}function ro(t,e){let n=-1;for(const a of this)t.call(e,a,++n,this);return this}function ao(t,e){for(var n=this,a=[n],i,o,s=-1;n=a.pop();)if(t.call(e,n,++s,this),i=n.children)for(o=i.length-1;o>=0;--o)a.push(i[o]);return this}function io(t,e){for(var n=this,a=[n],i=[],o,s,c,p=-1;n=a.pop();)if(i.push(n),o=n.children)for(s=0,c=o.length;s<c;++s)a.push(o[s]);for(;n=i.pop();)t.call(e,n,++p,this);return this}function oo(t,e){let n=-1;for(const a of this)if(t.call(e,a,++n,this))return a}function so(t){return this.eachAfter(function(e){for(var n=+t(e.data)||0,a=e.children,i=a&&a.length;--i>=0;)n+=a[i].value;e.value=n})}function lo(t){return this.eachBefore(function(e){e.children&&e.children.sort(t)})}function co(t){for(var e=this,n=po(e,t),a=[e];e!==n;)e=e.parent,a.push(e);for(var i=a.length;t!==n;)a.splice(i,0,t),t=t.parent;return a}function po(t,e){if(t===e)return t;var n=t.ancestors(),a=e.ancestors(),i=null;for(t=n.pop(),e=a.pop();t===e;)i=t,t=n.pop(),e=a.pop();return i}function ho(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e}function fo(){return Array.from(this)}function uo(){var t=[];return this.eachBefore(function(e){e.children||t.push(e)}),t}function go(){var t=this,e=[];return t.each(function(n){n!==t&&e.push({source:n.parent,target:n})}),e}function*mo(){var t=this,e,n=[t],a,i,o;do for(e=n.reverse(),n=[];t=e.pop();)if(yield t,a=t.children)for(i=0,o=a.length;i<o;++i)n.push(a[i]);while(n.length)}function Re(t,e){t instanceof Map?(t=[void 0,t],e===void 0&&(e=yo)):e===void 0&&(e=bo);for(var n=new pe(t),a,i=[n],o,s,c,p;a=i.pop();)if((s=e(a.data))&&(p=(s=Array.from(s)).length))for(a.children=s,c=p-1;c>=0;--c)i.push(o=s[c]=new pe(s[c])),o.parent=a,o.depth=a.depth+1;return n.eachBefore(wo)}function xo(){return Re(this).eachBefore(vo)}function bo(t){return t.children}function yo(t){return Array.isArray(t)?t[1]:null}function vo(t){t.data.value!==void 0&&(t.value=t.data.value),t.data=t.data.data}function wo(t){var e=0;do t.height=e;while((t=t.parent)&&t.height<++e)}function pe(t){this.data=t,this.depth=this.height=0,this.parent=null}pe.prototype=Re.prototype={constructor:pe,count:no,each:ro,eachAfter:io,eachBefore:ao,find:oo,sum:so,sort:lo,path:co,ancestors:ho,descendants:fo,leaves:uo,links:go,copy:xo,[Symbol.iterator]:mo};function ko(t){if(typeof t!="function")throw new Error;return t}function Pt(){return 0}function It(t){return function(){return t}}function jo(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}function _o(t,e,n,a,i){for(var o=t.children,s,c=-1,p=o.length,l=t.value&&(a-e)/t.value;++c<p;)s=o[c],s.y0=n,s.y1=i,s.x0=e,s.x1=e+=s.value*l}function No(t,e,n,a,i){for(var o=t.children,s,c=-1,p=o.length,l=t.value&&(i-n)/t.value;++c<p;)s=o[c],s.x0=e,s.x1=a,s.y0=n,s.y1=n+=s.value*l}var Co=(1+Math.sqrt(5))/2;function So(t,e,n,a,i,o){for(var s=[],c=e.children,p,l,f=0,g=0,h=c.length,u,v,N=e.value,z,W,L,B,q,H,I;f<h;){u=i-n,v=o-a;do z=c[g++].value;while(!z&&g<h);for(W=L=z,H=Math.max(v/u,u/v)/(N*t),I=z*z*H,q=Math.max(L/I,I/W);g<h;++g){if(z+=l=c[g].value,l<W&&(W=l),l>L&&(L=l),I=z*z*H,B=Math.max(L/I,I/W),B>q){z-=l;break}q=B}s.push(p={value:z,dice:u<v,children:c.slice(f,g)}),p.dice?_o(p,n,a,i,N?a+=v*z/N:o):No(p,n,a,N?n+=u*z/N:i,o),N-=z,f=g}return s}const Bn=function t(e){function n(a,i,o,s,c){So(e,a,i,o,s,c)}return n.ratio=function(a){return t((a=+a)>1?a:1)},n}(Co);function zo(){var t=Bn,e=!1,n=1,a=1,i=[0],o=Pt,s=Pt,c=Pt,p=Pt,l=Pt;function f(h){return h.x0=h.y0=0,h.x1=n,h.y1=a,h.eachBefore(g),i=[0],e&&h.eachBefore(jo),h}function g(h){var u=i[h.depth],v=h.x0+u,N=h.y0+u,z=h.x1-u,W=h.y1-u;z<v&&(v=z=(v+z)/2),W<N&&(N=W=(N+W)/2),h.x0=v,h.y0=N,h.x1=z,h.y1=W,h.children&&(u=i[h.depth+1]=o(h)/2,v+=l(h)-u,N+=s(h)-u,z-=c(h)-u,W-=p(h)-u,z<v&&(v=z=(v+z)/2),W<N&&(N=W=(N+W)/2),t(h,v,N,z,W))}return f.round=function(h){return arguments.length?(e=!!h,f):e},f.size=function(h){return arguments.length?(n=+h[0],a=+h[1],f):[n,a]},f.tile=function(h){return arguments.length?(t=ko(h),f):t},f.padding=function(h){return arguments.length?f.paddingInner(h).paddingOuter(h):f.paddingInner()},f.paddingInner=function(h){return arguments.length?(o=typeof h=="function"?h:It(+h),f):o},f.paddingOuter=function(h){return arguments.length?f.paddingTop(h).paddingRight(h).paddingBottom(h).paddingLeft(h):f.paddingTop()},f.paddingTop=function(h){return arguments.length?(s=typeof h=="function"?h:It(+h),f):s},f.paddingRight=function(h){return arguments.length?(c=typeof h=="function"?h:It(+h),f):c},f.paddingBottom=function(h){return arguments.length?(p=typeof h=="function"?h:It(+h),f):p},f.paddingLeft=function(h){return arguments.length?(l=typeof h=="function"?h:It(+h),f):l},f}function qt(t,e,n){this.k=t,this.x=e,this.y=n}qt.prototype={constructor:qt,scale:function(t){return t===1?this:new qt(this.k*t,this.x,this.y)},translate:function(t,e){return t===0&e===0?this:new qt(this.k,this.x+this.k*t,this.y+this.k*e)},apply:function(t){return[t[0]*this.k+this.x,t[1]*this.k+this.y]},applyX:function(t){return t*this.k+this.x},applyY:function(t){return t*this.k+this.y},invert:function(t){return[(t[0]-this.x)/this.k,(t[1]-this.y)/this.k]},invertX:function(t){return(t-this.x)/this.k},invertY:function(t){return(t-this.y)/this.k},rescaleX:function(t){return t.copy().domain(t.range().map(this.invertX,this).map(t.invert,t))},rescaleY:function(t){return t.copy().domain(t.range().map(this.invertY,this).map(t.invert,t))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};qt.prototype;const nn={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},dir:{main:"#6E9BC5",glow:"rgba(110, 155, 197, 0.3)",gradient:["#6E9BC5","#44607F"]},lvm:{main:"#4D9FFF",glow:"rgba(77, 159, 255, 0.3)",gradient:["#4D9FFF","#2161B0"]},lvmthin:{main:"#4D9FFF",glow:"rgba(77, 159, 255, 0.3)",gradient:["#4D9FFF","#2161B0"]},iscsi:{main:"#5C6FFF",glow:"rgba(92, 111, 255, 0.3)",gradient:["#5C6FFF","#3340B8"]},nfs:{main:"#00E5A0",glow:"rgba(0, 229, 160, 0.3)",gradient:["#00E5A0","#00936A"]},cifs:{main:"#00E5A0",glow:"rgba(0, 229, 160, 0.3)",gradient:["#00E5A0","#00936A"]},pbs:{main:"#9C6BFF",glow:"rgba(156, 107, 255, 0.35)",gradient:["#9C6BFF","#6234C9"]},glusterfs:{main:"#2EE6C8",glow:"rgba(46, 230, 200, 0.3)",gradient:["#2EE6C8","#189E8C"]},rbd:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]},cephfs:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function Mo(t,e){if(t>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(t>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(e==null?void 0:e.toLowerCase())||"default";return nn[n]||nn.default}function rn(t){if(t===0)return"0 B";const e=1024,n=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(t)/Math.log(e));return parseFloat((t/Math.pow(e,a)).toFixed(1))+" "+n[a]}function an({name:t,usedBytes:e,totalBytes:n,type:a,isShared:i=!1,connectedNodes:o=[],nodeName:s,isOffline:c=!1,width:p=120,height:l=180,animationDelay:f=0,onClick:g,onHover:h}){const u=y.useRef(null),v=y.useRef(0),N=y.useRef([]),z=y.useRef(0),[W,L]=y.useState(!1),B=n>0?e/n*100:0,[q,H]=y.useState(0),[I,K]=y.useState(!1),[D,X]=y.useState(!0),P=y.useRef(null),O=y.useRef(0),R=1200,Y=500;y.useEffect(()=>{const S=setTimeout(()=>{K(!0)},f);return()=>clearTimeout(S)},[f]),y.useEffect(()=>{if(!I)return;O.current=q,P.current=null;const S=O.current,d=B;if(Math.abs(S-d)<.1){H(d);return}const V=D?R:Y,Q=nt=>{P.current===null&&(P.current=nt);const ut=nt-P.current,G=Math.min(ut/V,1),b=(E=>1-Math.pow(1-E,3))(G),_=S+(d-S)*b;H(_),G<1?requestAnimationFrame(Q):D&&X(!1)};requestAnimationFrame(Q)},[B,I]);const tt=q,J=B>=85,at=B>=95,x=Mo(B,a),$=y.useCallback(S=>{const d=[];for(let V=0;V<S;V++)d.push({x:Math.random()*p*.6+p*.2,y:l+Math.random()*l,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return d},[p,l]);y.useEffect(()=>{const S=u.current;if(!S)return;const d=S.getContext("2d");if(!d)return;const V=window.devicePixelRatio||1;S.width=p*V,S.height=l*V,d.scale(V,V);const Q=J?15:5;N.current=$(Q);const nt=ut=>{ut-z.current,z.current=ut;const G=ut*.001;d.clearRect(0,0,p,l);const C=8,b=C,_=C+20,E=p-C*2,M=l-C*2-40,bt=8,rt=c?.05:tt/100,Tt=M*rt,it=_+M-Tt,Nt=d.createLinearGradient(b,_,b,_+M);Nt.addColorStop(0,"#0a0a12"),Nt.addColorStop(.5,"#050510"),Nt.addColorStop(1,"#0a0a12"),d.fillStyle=Nt,d.beginPath(),d.roundRect(b,_,E,M,bt),d.fill(),d.save(),d.beginPath(),d.roundRect(b,_,E,M,bt),d.clip();const dt=12,Kt=dt*Math.sqrt(3);d.strokeStyle="rgba(0, 240, 255, 0.06)",d.lineWidth=.5;for(let w=0;w<M/Kt+1;w++)for(let k=0;k<E/(dt*1.5)+1;k++){const A=w%2*dt*.75,U=b+k*dt*1.5+A,Z=_+w*Kt*.5;d.beginPath();for(let Ct=0;Ct<6;Ct++){const Jt=Math.PI/3*Ct+Math.PI/6,T=U+dt*.4*Math.cos(Jt),et=Z+dt*.4*Math.sin(Jt);Ct===0?d.moveTo(T,et):d.lineTo(T,et)}d.closePath(),d.stroke()}d.restore();const $t=_+G*30%M;d.save(),d.beginPath(),d.roundRect(b,_,E,M,bt),d.clip();const Ft=d.createLinearGradient(b,$t-15,b,$t+5);Ft.addColorStop(0,"transparent"),Ft.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Ft.addColorStop(1,"transparent"),d.fillStyle=Ft,d.fillRect(b,$t-15,E,20),d.restore(),d.strokeStyle="rgba(0, 240, 255, 0.2)",d.lineWidth=1;for(let w=0;w<=10;w++){const k=_+M-M*w/10,A=w%5===0?12:6,U=w%5===0?.4:.2;d.strokeStyle=`rgba(0, 240, 255, ${U})`,d.beginPath(),d.moveTo(b+2,k),d.lineTo(b+2+A,k),d.stroke(),d.beginPath(),d.moveTo(b+E-2,k),d.lineTo(b+E-2-A,k),d.stroke()}const ge=G*50%M;for(let w=0;w<3;w++){const k=_+(ge+w*M/3)%M,A=.3+Math.sin(G*3+w)*.2;d.beginPath(),d.strokeStyle=`rgba(0, 240, 255, ${A})`,d.lineWidth=2,d.moveTo(b,k),d.lineTo(b+4,k),d.stroke(),d.beginPath(),d.moveTo(b+E,k),d.lineTo(b+E-4,k),d.stroke()}if(!c&&rt>0){const w=d.createLinearGradient(0,it,0,_+M);w.addColorStop(0,x.gradient[0]),w.addColorStop(1,x.gradient[1]);const k=J?6:3,A=.05,U=J?.1:.05,Z=Math.PI/3;d.save(),d.beginPath(),d.rect(b,_,E,M),d.clip(),d.fillStyle=w,d.beginPath(),d.moveTo(b,_+M);for(let T=0;T<=E;T+=2){const et=Math.sin(T*A+G*U*60)*k,st=Math.sin(T*A*1.5+G*U*40+Z)*(k*.5),ft=it+et+st;T===0?d.moveTo(b+T,ft):d.lineTo(b+T,ft)}d.lineTo(b+E,_+M),d.lineTo(b,_+M),d.closePath(),d.fill(),d.strokeStyle=x.glow,d.lineWidth=2,d.shadowColor=x.main,d.shadowBlur=10,d.beginPath();for(let T=0;T<=E;T+=2){const et=Math.sin(T*A+G*U*60)*k,st=Math.sin(T*A*1.5+G*U*40+Z)*(k*.5),ft=it+et+st;T===0?d.moveTo(b+T,ft):d.lineTo(b+T,ft)}d.stroke(),d.shadowBlur=0,N.current.forEach((T,et)=>{if(T.y>it&&T.y<_+M){const st=Math.sin(G*T.wobbleSpeed*60+T.wobbleOffset)*3;d.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,d.beginPath(),d.arc(T.x+st,T.y,T.radius,0,Math.PI*2),d.fill(),d.fillStyle="rgba(255, 255, 255, 0.5)",d.beginPath(),d.arc(T.x+st-T.radius*.3,T.y-T.radius*.3,T.radius*.3,0,Math.PI*2),d.fill()}T.y-=T.speed*(J?2:1),T.y<it-10&&(T.y=_+M+Math.random()*20,T.x=b+Math.random()*E*.6+E*.2)}),d.restore();const Ct=3;for(let T=0;T<Ct;T++){const et=b+E*(T+.5)/Ct,st=G*2+T*Math.PI*.7,ft=(Math.sin(st)*.5+.5)*.3;if(ft>.1){const wt=d.createLinearGradient(et-8,it,et+8,_+M);wt.addColorStop(0,"rgba(255, 255, 255, 0)"),wt.addColorStop(.3,`rgba(255, 255, 255, ${ft})`),wt.addColorStop(.7,`rgba(255, 255, 255, ${ft*.5})`),wt.addColorStop(1,"rgba(255, 255, 255, 0)"),d.fillStyle=wt,d.fillRect(et-8,it,16,Tt)}}const Jt=Math.floor(rt*8);for(let T=0;T<Jt;T++){const et=T*137.5,st=b+10+et*7%(E-20),wt=it+10+et*13%(Tt-20)+Math.sin(G*2+et)*5,An=.4+Math.sin(G*3+et)*.3;if(d.fillStyle=`rgba(255, 255, 255, ${An})`,d.beginPath(),d.arc(st,wt,1.5,0,Math.PI*2),d.fill(),T>0&&T%3===0){const xe=(T-1)*137.5,We=b+10+xe*7%(E-20),Pe=it+10+xe*13%(Tt-20)+Math.sin(G*2+xe)*5,Ie=Math.sqrt((st-We)**2+(wt-Pe)**2);Ie<30&&(d.strokeStyle=`rgba(255, 255, 255, ${.1*(1-Ie/30)})`,d.lineWidth=.5,d.beginPath(),d.moveTo(st,wt),d.lineTo(We,Pe),d.stroke())}}if(J){for(let T=0;T<8;T++){const et=b+E*.15+Math.random()*E*.7,st=it-Math.random()*25,ft=Math.random()*4+1;d.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,d.beginPath(),d.arc(et,st,ft,0,Math.PI*2),d.fill()}Math.sin(G*10)>.7&&(d.fillStyle="rgba(255, 100, 0, 0.05)",d.fillRect(b,_,E,M))}}const pt=c||at?"#ff0040":x.main,ot=at?Math.sin(G*5)*.3+.7:1;d.strokeStyle=pt,d.lineWidth=3,d.shadowColor=pt,d.shadowBlur=W?20:12*ot,d.beginPath(),d.roundRect(b,_,E,M,bt),d.stroke(),d.shadowBlur=0,d.strokeStyle=`${pt}60`,d.lineWidth=1,d.beginPath(),d.roundRect(b+3,_+3,E-6,M-6,bt-2),d.stroke();const ht=16,Zt=3;d.strokeStyle=pt,d.lineWidth=Zt,d.shadowColor=pt,d.shadowBlur=8,d.beginPath(),d.moveTo(b-2,_+ht),d.lineTo(b-2,_-2),d.lineTo(b+ht,_-2),d.stroke(),d.beginPath(),d.moveTo(b+E-ht,_-2),d.lineTo(b+E+2,_-2),d.lineTo(b+E+2,_+ht),d.stroke(),d.beginPath(),d.moveTo(b-2,_+M-ht),d.lineTo(b-2,_+M+2),d.lineTo(b+ht,_+M+2),d.stroke(),d.beginPath(),d.moveTo(b+E-ht,_+M+2),d.lineTo(b+E+2,_+M+2),d.lineTo(b+E+2,_+M-ht),d.stroke(),d.shadowBlur=0;const m=2+(Math.sin(G*4)*.5+.5);if(d.fillStyle=pt,d.shadowColor=pt,d.shadowBlur=6,[[b-2,_-2],[b+E+2,_-2],[b-2,_+M+2],[b+E+2,_+M+2]].forEach(([w,k])=>{d.beginPath(),d.arc(w,k,m,0,Math.PI*2),d.fill()}),d.shadowBlur=0,!c){const k=b+E+6,A=M,U=A*(tt/100);d.fillStyle="rgba(0, 20, 40, 0.8)",d.fillRect(k,_,4,A);const Z=d.createLinearGradient(0,_+A-U,0,_+A);Z.addColorStop(0,x.main),Z.addColorStop(1,x.gradient[1]),d.fillStyle=Z,d.fillRect(k,_+A-U,4,U),d.strokeStyle=`${pt}40`,d.lineWidth=1,d.strokeRect(k,_,4,A)}if(c){d.strokeStyle="#ff0040",d.lineWidth=2,d.beginPath();const w=b+E*.3,k=_+M*.3;d.moveTo(w,k),d.lineTo(w+10,k+15),d.lineTo(w+5,k+25),d.lineTo(w+15,k+40),d.stroke(),d.beginPath(),d.moveTo(w+10,k+15),d.lineTo(w+20,k+20),d.stroke()}v.current=requestAnimationFrame(nt)};return v.current=requestAnimationFrame(nt),()=>{cancelAnimationFrame(v.current)}},[p,l,tt,J,at,c,x,W,$]);const j=()=>{L(!0),h==null||h(!0)},F=()=>{L(!1),h==null||h(!1)};return r.jsxs("div",{className:`liquid-tank ${i?"shared":"local"} ${at?"critical":""} ${c?"offline":""}`,onClick:g,onMouseEnter:j,onMouseLeave:F,children:[r.jsxs("div",{className:"tank-header",children:[r.jsx("div",{className:`tank-name-tag ${c?"offline":""}`,style:c?void 0:{color:x.main,background:`${x.main}15`,borderColor:`${x.main}50`},children:t}),r.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),r.jsx("canvas",{ref:u,style:{width:p,height:l-50,display:"block"}}),r.jsxs("div",{className:"tank-stats",children:[r.jsx("div",{className:`tank-percent ${at?"critical":J?"warning":""}`,style:{color:c?"#FF4081":x.main,textShadow:c?"none":`0 0 10px ${x.glow}`},children:c?"OFFLINE":`${B.toFixed(1)}%`}),r.jsxs("div",{className:"tank-capacity",children:[rn(e)," / ",rn(n)]})]}),i&&o.length>0&&r.jsx("div",{className:"tank-nodes",children:o.map((S,d)=>r.jsx("span",{className:"node-tag",children:S},d))}),!i&&s&&r.jsx("div",{className:"tank-node-label",children:s}),r.jsx("style",{children:`
        .liquid-tank {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 12px;
          background: rgba(10, 25, 41, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(0, 229, 255, 0.15);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 155px;
          overflow: visible;
        }

        /* Corner accents - FUI style */
        .liquid-tank::before,
        .liquid-tank::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: rgba(0, 229, 255, 0.3);
          border-style: solid;
          transition: border-color 0.2s;
        }

        .liquid-tank::before {
          top: -1px;
          left: -1px;
          border-width: 1px 0 0 1px;
        }

        .liquid-tank::after {
          bottom: -1px;
          right: -1px;
          border-width: 0 1px 1px 0;
        }

        .liquid-tank:hover {
          border-color: rgba(0, 229, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .liquid-tank:hover::before,
        .liquid-tank:hover::after {
          border-color: rgba(0, 229, 255, 0.6);
        }

        /* Local storage - Cyan theme */
        .liquid-tank.local {
          border-color: rgba(0, 229, 255, 0.12);
          background: rgba(10, 25, 41, 0.65);
        }

        .liquid-tank.local::before,
        .liquid-tank.local::after {
          border-color: rgba(0, 229, 255, 0.25);
        }

        .liquid-tank.local:hover {
          border-color: rgba(0, 229, 255, 0.35);
        }

        /* Shared storage - Amber theme */
        .liquid-tank.shared {
          border-color: rgba(255, 183, 77, 0.15);
          background: rgba(20, 18, 12, 0.65);
        }

        .liquid-tank.shared::before,
        .liquid-tank.shared::after {
          border-color: rgba(255, 183, 77, 0.25);
        }

        .liquid-tank.shared:hover {
          border-color: rgba(255, 183, 77, 0.4);
        }

        .liquid-tank.shared:hover::before,
        .liquid-tank.shared:hover::after {
          border-color: rgba(255, 183, 77, 0.6);
        }

        /* Critical state - Magenta pulse */
        .liquid-tank.critical {
          border-color: rgba(255, 64, 129, 0.3);
          animation: criticalPulse 2s ease-in-out infinite;
        }

        .liquid-tank.critical::before,
        .liquid-tank.critical::after {
          border-color: rgba(255, 64, 129, 0.5);
        }

        @keyframes criticalPulse {
          0%, 100% { border-color: rgba(255, 64, 129, 0.25); }
          50% { border-color: rgba(255, 64, 129, 0.5); }
        }

        .liquid-tank.offline {
          border-color: rgba(255, 64, 129, 0.2);
          opacity: 0.6;
        }

        .tank-header {
          text-align: center;
          margin-bottom: 6px;
          width: 100%;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        /* Name tag - dynamic color based on storage type */
        .tank-name-tag {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid;
        }

        .tank-name-tag.offline {
          color: #FF4081 !important;
          background: rgba(255, 64, 129, 0.1) !important;
          border-color: rgba(255, 64, 129, 0.4) !important;
        }

        .tank-type-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 6px;
          border-radius: 2px;
          border: 1px solid;
        }

        /* Storage type colors - subtle border style */
        .tank-type-tag.type-rbd,
        .tank-type-tag.type-cephfs {
          color: #FFB74D;
          background: rgba(255, 183, 77, 0.1);
          border-color: rgba(255, 183, 77, 0.25);
        }

        .tank-type-tag.type-nfs {
          color: #FF9800;
          background: rgba(255, 152, 0, 0.1);
          border-color: rgba(255, 152, 0, 0.25);
        }

        .tank-type-tag.type-iscsi,
        .tank-type-tag.type-zfs-over-iscsi {
          color: #29B6F6;
          background: rgba(41, 182, 246, 0.1);
          border-color: rgba(41, 182, 246, 0.25);
        }

        .tank-type-tag.type-lvm,
        .tank-type-tag.type-lvmthin {
          color: #FFCA28;
          background: rgba(255, 202, 40, 0.1);
          border-color: rgba(255, 202, 40, 0.25);
        }

        /* ZFS - Teal (primary storage) */
        .tank-type-tag.type-zfspool,
        .tank-type-tag.type-zfs {
          color: #26A69A;
          background: rgba(38, 166, 154, 0.1);
          border-color: rgba(38, 166, 154, 0.25);
        }

        .tank-type-tag.type-dir {
          color: #90A4AE;
          background: rgba(144, 164, 174, 0.1);
          border-color: rgba(144, 164, 174, 0.25);
        }

        /* PBS - Purple (backup) */
        .tank-type-tag.type-pbs {
          color: #BA68C8;
          background: rgba(186, 104, 200, 0.1);
          border-color: rgba(186, 104, 200, 0.25);
        }

        .tank-type-tag.type-glusterfs {
          color: #FF7043;
          background: rgba(255, 112, 67, 0.1);
          border-color: rgba(255, 112, 67, 0.25);
        }

        .tank-stats {
          text-align: center;
          margin-top: 6px;
          position: relative;
          z-index: 1;
        }

        /* Data hierarchy - percentage large and bright */
        .tank-percent {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin-bottom: 2px;
        }

        /* Capacity smaller and gray */
        .tank-capacity {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #888;
          display: block;
          letter-spacing: 0.02em;
        }

        .tank-nodes {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: center;
          margin-top: 8px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* Node tags for shared storage - amber theme */
        .node-tag {
          font-family: var(--font-mono);
          font-size: 8px;
          padding: 2px 6px;
          background: rgba(255, 183, 77, 0.1);
          border: 1px solid rgba(255, 183, 77, 0.2);
          border-radius: 2px;
          color: #FFB74D;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
        }

        .node-tag:hover {
          background: rgba(255, 183, 77, 0.18);
          border-color: rgba(255, 183, 77, 0.4);
        }

        /* Node label for local storage - cyan theme */
        .tank-node-label {
          font-family: var(--font-mono);
          font-size: 9px;
          margin-top: 6px;
          padding: 3px 8px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.2);
          border-radius: 2px;
          color: #00E5FF;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }

        .tank-node-label::before {
          content: '+';
          margin-right: 4px;
          font-size: 8px;
          color: #00E5FF;
          opacity: 0.5;
        }

      `})]})}function To({percent:t,usedBytes:e,totalBytes:n,duration:a=1200}){const[i,o]=y.useState(0),s=y.useRef(0),c=y.useRef(null),p=y.useRef(0);y.useEffect(()=>{p.current=i,c.current=null;const u=v=>{c.current===null&&(c.current=v);const N=v-c.current,z=Math.min(N/a,1),W=z===1?1:1-Math.pow(2,-10*z),L=p.current+(t-p.current)*W;o(L),z<1&&(s.current=requestAnimationFrame(u))};return s.current=requestAnimationFrame(u),()=>cancelAnimationFrame(s.current)},[t,a]);const f=i>=90?"#ff0040":i>=70?"#ff6b00":"#00f0ff",g=40,h=[];for(let u=0;u<g;u++){const v=u/g*100,N=v<i,z=u%4===0;h.push({index:u,isActive:N,isMajor:z,percent:v})}return r.jsxs("div",{className:"scifi-indicator",children:[r.jsx("div",{className:"indicator-left",children:r.jsxs("div",{className:"indicator-bytes",children:[r.jsx("span",{className:"used",style:{color:f},children:lt(e)}),r.jsx("span",{className:"separator",children:"/"}),r.jsx("span",{className:"total",children:lt(n)})]})}),r.jsxs("div",{className:"indicator-bar-container",children:[r.jsxs("div",{className:"indicator-bar",children:[r.jsx("div",{className:"segments-container",children:h.map(u=>r.jsx("div",{className:`segment ${u.isActive?"active":""} ${u.isMajor?"major":""}`,style:{"--segment-color":u.isActive?f:"rgba(60, 80, 100, 0.3)",animationDelay:u.isActive?`${u.index*20}ms`:"0ms"}},u.index))}),r.jsx("div",{className:"indicator-glow",style:{width:`${i}%`,background:`linear-gradient(90deg, transparent, ${f}40)`,boxShadow:`0 0 20px ${f}60, 0 0 40px ${f}30`}}),r.jsx("div",{className:"indicator-pointer",style:{left:`${i}%`,borderColor:`transparent transparent ${f} transparent`,filter:`drop-shadow(0 0 4px ${f})`}}),r.jsx("div",{className:"indicator-scanline"})]}),r.jsx("div",{className:"indicator-accent",style:{background:f}})]}),r.jsx("div",{className:"indicator-right",children:r.jsxs("div",{className:"indicator-percent",style:{color:f},children:[i.toFixed(1),r.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const $o=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function Fo({vm:t,position:e,onClose:n}){var W,L,B,q,H;const{t:a,language:i}=Yt(),o=y.useRef(null),[s,c]=y.useState(null),l=t.status==="running"?"#00ff88":"#ff6b00",f=t.type==="lxc",g=t.disks||[],h=i==="zh-TW",u=((W=t.disk)==null?void 0:W.total_bytes)>0?t.disk.used_bytes/t.disk.total_bytes*100:0,v=u>=90?"#ff0040":u>=70?"#ff6b00":"#00f0ff",N=h?t.status==="running"?"運作中":t.status==="stopped"?"已停止":t.status.toUpperCase():t.status.toUpperCase();y.useEffect(()=>{if(!o.current)return;const K=o.current.getBoundingClientRect(),D=K.width,X=K.height,P=window.innerWidth,O=window.innerHeight,R=15,{cellX:Y,cellY:tt,cellTop:J,cellBottom:at,cellLeft:x,cellRight:$}=e;let j=0,F=0,S=Y,d=tt;$+R+D<P?(j=$+R,F=Math.max(R,Math.min(O-X-R,tt-X/2)),S=$,d=tt):x-R-D>0?(j=x-R-D,F=Math.max(R,Math.min(O-X-R,tt-X/2)),S=x,d=tt):J-R-X>0?(j=Math.max(R,Math.min(P-D-R,Y-D/2)),F=J-R-X,S=Y,d=J):(j=Math.max(R,Math.min(P-D-R,Y-D/2)),F=at+R,S=Y,d=at);let V=j,Q=F+X/2;j>$?(V=j,Q=Math.max(F,Math.min(F+X,d))):j+D<x?(V=j+D,Q=Math.max(F,Math.min(F+X,d))):F+X<J?(V=Math.max(j,Math.min(j+D,S)),Q=F+X):(V=Math.max(j,Math.min(j+D,S)),Q=F),c({x:j,y:F,lineStart:{x:S,y:d},lineEnd:{x:V,y:Q}})},[e]);const z=s?(()=>{const I=s.lineEnd.x-s.lineStart.x,K=s.lineEnd.y-s.lineStart.y,D=Math.sqrt(I*I+K*K),X=Math.atan2(K,I)*(180/Math.PI);return{width:`${D}px`,transform:`rotate(${X}deg)`,left:`${s.lineStart.x}px`,top:`${s.lineStart.y}px`}})():null;return Me.createPortal(r.jsxs(r.Fragment,{children:[s&&z&&r.jsx("div",{className:"popup-connector-line",style:z}),r.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(s==null?void 0:s.x)??-9999,top:(s==null?void 0:s.y)??-9999,opacity:s?1:0,transform:"none"},onClick:I=>I.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:"vm-icon",children:t.type==="qemu"?"VM":"CT"}),r.jsx("span",{className:"vm-name",children:t.name}),r.jsxs("span",{className:"vm-id",children:["#",t.vmid]})]}),r.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"popup-status",children:[r.jsx("span",{className:"status-dot",style:{background:l}}),r.jsx("span",{className:"status-text",style:{color:l},children:N}),r.jsxs("span",{className:"node-info",children:["@ ",t.node]})]}),r.jsxs("div",{className:"popup-section",children:[r.jsxs("div",{className:"section-label",children:[h?"磁碟":"DISK",g.length>1?h?"":"S":""," (",g.length||1,")"]}),g.length>0?r.jsx("div",{className:"disk-list",children:g.map((I,K)=>r.jsxs("div",{className:"disk-item",children:[r.jsxs("div",{className:"disk-device",children:[r.jsx("span",{className:"device-name",children:I.device}),r.jsx("span",{className:"device-format",children:I.format})]}),r.jsxs("div",{className:"disk-info",children:[r.jsx("span",{className:"disk-storage",children:I.storage}),r.jsx("span",{className:"disk-size",children:lt(I.size)})]})]},K))}):r.jsx("div",{className:"disk-summary",children:r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:h?"配置容量":"Allocated"}),r.jsx("span",{className:"disk-value",children:lt(((L=t.disk)==null?void 0:L.total_bytes)||0)})]})}),f&&r.jsxs("div",{className:"disk-usage-section",children:[r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:h?"已使用":"Used"}),r.jsx("span",{className:"disk-value",children:lt(((B=t.disk)==null?void 0:B.used_bytes)||0)})]}),r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:h?"使用率":"Usage"}),r.jsxs("span",{className:"disk-value",style:{color:v},children:[u.toFixed(1),"%"]})]}),r.jsx("div",{className:"disk-bar",children:r.jsx("div",{className:"disk-bar-fill",style:{width:`${u}%`,background:v}})})]})]}),r.jsxs("div",{className:"popup-metrics",children:[r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsxs("span",{className:"metric-value",children:[((q=t.cpu)==null?void 0:q.cores)||0," ",h?"核心":"cores"]})]}),r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:h?"記憶體":"Memory"}),r.jsx("span",{className:"metric-value",children:lt(((H=t.memory)==null?void 0:H.total_bytes)||0)})]})]})]})]}),document.body)}function Bo({data:t,width:e,height:n,isInitialLoad:a=!1,onVMClick:i}){const[o,s]=y.useState(null),c=y.useRef(null),p=y.useMemo(()=>{if(t.length===0||e===0||n===0)return[];const l={name:"root",children:t.map(u=>({name:u.vm.name,value:u.value,vm:u.vm}))},f=Re(l).sum(u=>u.value||0).sort((u,v)=>(v.value||0)-(u.value||0));return zo().size([e,n]).paddingInner(3).paddingOuter(2).round(!0).tile(Bn.ratio(1))(f).leaves().map(u=>({x:u.x0,y:u.y0,width:u.x1-u.x0,height:u.y1-u.y0,vm:u.data.vm,value:u.value||0}))},[t,e,n]);return p.length===0?r.jsx("div",{className:"no-storage",children:"No VM disk data available"}):r.jsxs("svg",{ref:c,width:e,height:n,className:"d3-treemap",children:[r.jsxs("defs",{children:[r.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:r.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),r.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),r.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),r.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),p.map((l,f)=>{var X;const g=((X=l.vm.disk)==null?void 0:X.total_bytes)||1,h=l.vm.status==="running",u=o===`${l.vm.node}-${l.vm.vmid}`,v=l.width>15&&l.height>12,N=l.width>40&&l.height>25,z=l.width>50&&l.height>40,W=l.width>60&&l.height>55,L=Math.max(...p.map(P=>P.value)),B=l.value/L,q=()=>h?B>.7?"rgba(0, 255, 200, 0.15)":B>.4?"rgba(0, 200, 255, 0.12)":B>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",H=()=>h?B>.7?"rgba(0, 255, 200, 0.9)":B>.4?"rgba(0, 200, 255, 0.85)":B>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",I=()=>h?B>.7?"rgba(0, 255, 200, 0.4)":B>.4?"rgba(0, 200, 255, 0.35)":B>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",K=()=>h?B>.7?"rgba(0, 255, 220, 1)":B>.4?"rgba(100, 220, 255, 1)":B>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",D=a?f*30:0;return r.jsxs("g",{transform:`translate(${l.x}, ${l.y})`,onMouseEnter:()=>s(`${l.vm.node}-${l.vm.vmid}`),onMouseLeave:()=>s(null),onClick:P=>{if(P.stopPropagation(),i){const O=P.clientX,R=P.clientY,Y=l.width/2,tt=l.height/2;i(l.vm,{cellX:O,cellY:R,cellWidth:l.width,cellHeight:l.height,cellTop:R-tt,cellBottom:R+tt,cellLeft:O-Y,cellRight:O+Y})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${D}ms`},children:[r.jsx("title",{children:`${l.vm.name} (#${l.vm.vmid})
Status: ${l.vm.status}
Allocated: ${lt(g)}`}),h&&r.jsx("rect",{width:l.width,height:l.height,fill:"none",stroke:I(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:u?1:.6}}),h&&l.width>30&&l.height>25&&r.jsx("rect",{width:l.width,height:l.height,fill:"none",stroke:H(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),r.jsx("rect",{className:"main-cell",width:l.width,height:l.height,fill:q(),stroke:H(),strokeWidth:u?2:1,rx:4,ry:4,style:{filter:u?`drop-shadow(0 0 12px ${I()}) drop-shadow(0 0 4px ${H()})`:`drop-shadow(0 0 3px ${I()})`,transition:"all 0.2s ease"}}),h&&l.width>20&&l.height>15&&r.jsx("line",{x1:2,y1:2,x2:Math.min(l.width*.4,30),y2:2,stroke:H(),strokeWidth:1,opacity:.6}),h&&l.width>50&&l.height>40&&r.jsxs(r.Fragment,{children:[r.jsx("path",{d:`M ${l.width-8} ${l.height-2} L ${l.width-2} ${l.height-2} L ${l.width-2} ${l.height-8}`,fill:"none",stroke:H(),strokeWidth:1,opacity:.4,className:"circuit-line"}),r.jsx("circle",{cx:l.width-5,cy:l.height-5,r:2,fill:H(),opacity:.8,className:"energy-dot"})]}),h&&r.jsx("rect",{x:0,y:0,width:l.width,height:l.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),v&&!N&&r.jsx("text",{x:l.width/2,y:l.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:K(),fontSize:Math.min(10,Math.max(7,l.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:h?`0 0 6px ${I()}`:"none"},children:l.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(l.width/10))))}),N&&(()=>{const P=l.width,O=l.height,R=Math.min(16,Math.max(9,Math.min(P/8,O/5))),Y=Math.min(12,Math.max(8,Math.min(P/10,O/7))),tt=Math.min(10,Math.max(7,Math.min(P/12,O/8))),J=Math.floor((P-8)/(R*.6)),at=l.vm.name.length>J?l.vm.name.slice(0,Math.max(1,J-1))+"…":l.vm.name,x=R+(z?Y+2:0)+(W?tt+2:0),$=(O-x)/2+R/2;return r.jsxs(r.Fragment,{children:[r.jsx("text",{x:P/2,y:$,textAnchor:"middle",dominantBaseline:"middle",fill:K(),fontSize:R,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:h?`0 0 8px ${I()}`:"none",filter:h?`drop-shadow(0 0 2px ${I()})`:"none"},children:at}),z&&r.jsx("text",{x:P/2,y:$+R*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:h?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:Y,fontFamily:"var(--font-mono)",children:lt(g)}),W&&r.jsxs("text",{x:P/2,y:$+R*.8+(z?Y*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:K(),fontSize:tt,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:h?`drop-shadow(0 0 3px ${I()})`:"none"},children:["#",l.vm.vmid]})]})})()]},`${l.vm.node}-${l.vm.vmid}`)})]})}function Eo({vmDiskData:t,totals:e,storages:n}){const{t:a,language:i}=Yt(),o=y.useRef(null),[s,c]=y.useState({width:0,height:0}),[p,l]=y.useState(!0),[f,g]=y.useState(null);y.useEffect(()=>{const u=()=>{if(o.current){const N=o.current.getBoundingClientRect();c({width:N.width,height:N.height})}};u();const v=new ResizeObserver(u);return o.current&&v.observe(o.current),()=>v.disconnect()},[]),y.useEffect(()=>{if(p&&t.length>0){const u=setTimeout(()=>{l(!1)},t.length*30+500);return()=>clearTimeout(u)}},[p,t.length]);const h=y.useMemo(()=>t.map(u=>{var v;return{vm:u,value:((v=u.disk)==null?void 0:v.total_bytes)||0}}).filter(u=>u.value>0),[t]);return r.jsxs("div",{className:"treemap-container",children:[r.jsxs("div",{className:"treemap-header",children:[r.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),r.jsxs("div",{className:"treemap-stats",children:[r.jsxs("span",{children:[t.length," VMs"]}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{children:["Total Allocated: ",lt(t.reduce((u,v)=>{var N;return u+(((N=v.disk)==null?void 0:N.total_bytes)||0)},0))]})]})]}),r.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>g(null),children:s.width>0&&s.height>0&&r.jsx(Bo,{data:h,width:s.width,height:s.height,isInitialLoad:p,onVMClick:(u,v)=>g({vm:u,position:v})})}),f&&r.jsx(Fo,{vm:f.vm,position:f.position,onClose:()=>g(null)}),r.jsxs("div",{className:"treemap-legend",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color running"}),r.jsx("span",{children:a("vm.running")})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color stopped"}),r.jsx("span",{children:a("vm.stopped")})]}),r.jsx("div",{className:"legend-note",children:i==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function Ao({storage:t,position:e,sourcePos:n,onClose:a,onManage:i}){const{t:o}=Yt();if(!t||!e)return null;const s=t.totalBytes>0?t.usedBytes/t.totalBytes*100:0,c=n||{x:e.x-20,y:e.y+50},p={x:e.x,y:e.y+50};return Me.createPortal(r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),r.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),r.jsx("line",{x1:c.x,y1:c.y,x2:p.x,y2:p.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),r.jsx("circle",{cx:p.x,cy:p.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),r.jsxs("div",{className:"storage-tooltip",style:{left:e.x,top:e.y},children:[r.jsx("div",{className:"tooltip-grid"}),r.jsx("div",{className:"tooltip-scan-line"}),r.jsx("div",{className:"tooltip-corner tl"}),r.jsx("div",{className:"tooltip-corner tr"}),r.jsx("div",{className:"tooltip-corner bl"}),r.jsx("div",{className:"tooltip-corner br"}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:t.name}),r.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),r.jsx("div",{className:"tooltip-type-row",children:r.jsx("span",{className:`tooltip-badge ${t.isShared?"shared":"local"}`,children:t.isShared?o("storage.filter_shared"):o("storage.filter_local")})}),r.jsxs("div",{className:"tooltip-content",children:[r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("table.type"),":"]}),r.jsx("span",{children:t.type.toUpperCase()})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("storage.content"),":"]}),r.jsx("div",{className:"tooltip-labels",children:t.content.map((l,f)=>r.jsx("span",{className:"tooltip-label",children:l},f))})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.used"),":"]}),r.jsx("span",{children:lt(t.usedBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.total"),":"]}),r.jsx("span",{children:lt(t.totalBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.usage"),":"]}),r.jsx("span",{className:`text-${we(s)}`,children:sn(s,1)})]}),t.isShared&&t.connectedNodes.length>0&&r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("cluster.nodes"),":"]}),r.jsx("div",{className:"tooltip-labels",children:t.connectedNodes.map((l,f)=>r.jsx("span",{className:"tooltip-label node",children:l},f))})]})]}),i&&r.jsx("div",{className:"tooltip-actions",children:r.jsxs("button",{className:"tooltip-action-btn",onClick:l=>{l.stopPropagation(),i(t)},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h12"})}),r.jsx("span",{children:o("storage.manage")})]})})]})]}),document.body)}function Ro({cluster:t,clusters:e}){const{t:n,language:a}=Yt(),[i,o]=y.useState(()=>{if(typeof window>"u")return"tanks";const x=window.location.pathname.split("/").filter(Boolean)[1];return x==="treemap"||x==="tanks"?x:"tanks"});y.useEffect(()=>{if(typeof window>"u")return;const x=window.location.pathname.split("/").filter(Boolean);if(x[0]!=="storage"||x.length>=4)return;const $=`/storage/${i}`;window.location.pathname!==$&&window.history.replaceState(null,"",$)},[i]),y.useEffect(()=>{const x=()=>{const $=window.location.pathname.split("/").filter(Boolean);if($[0]!=="storage"||$.length>=4)return;const j=$[1];(j==="tanks"||j==="treemap")&&o(j)};return window.addEventListener("popstate",x),()=>window.removeEventListener("popstate",x)},[]);const[s,c]=y.useState("all"),[p,l]=y.useState(""),[f,g]=y.useState(null),[h,u]=y.useState(null),[v,N]=y.useState(null),[z,W]=y.useState(null),[L,B]=y.useState(null),[q,H]=y.useState(null),I=y.useCallback(x=>{let $=(t==null?void 0:t.id)||"",j="";if(x.isShared)j=x.connectedNodes[0]||"";else{const S=x.nodeInstances.find(d=>d.active)||x.nodeInstances[0];j=(S==null?void 0:S.node)||""}if(!$&&e){for(const[S,d]of Object.entries(e))if(d.nodes&&d.nodes[j]){$=S;break}}if(!$||!j)return;const F=`/storage/${encodeURIComponent($)}/${encodeURIComponent(j)}/${encodeURIComponent(x.name)}`;window.history.pushState(null,"",F),window.dispatchEvent(new PopStateEvent("popstate")),u(null),N(null),W(null),B(null)},[t,e]),K=y.useCallback((x,$)=>{x.preventDefault(),x.stopPropagation();const j=Math.min(x.clientX,window.innerWidth-180),F=Math.min(x.clientY,window.innerHeight-80);B({x:j,y:F,storage:$})},[]),D=!t&&e&&Object.keys(e).length>0,X=y.useMemo(()=>{const x=[],$=(j,F)=>{Object.values(j.vms).forEach(S=>{var d;(d=S.disk)!=null&&d.total_bytes&&S.disk.total_bytes>0&&!S.template&&x.push({...S,clusterName:F})})};return D?Object.entries(e).forEach(([j,F])=>{$(F,F.name||j)}):t&&$(t,t.name||""),x.sort((j,F)=>{var S,d;return(((S=F.disk)==null?void 0:S.total_bytes)||0)-(((d=j.disk)==null?void 0:d.total_bytes)||0)})},[t,e,D]),{sharedStorages:P,localStoragesByNode:O,allNodes:R,totals:Y,warnings:tt}=y.useMemo(()=>{const x=new Map;let $=0,j=0,F=0;const S=new Set,d=C=>{Object.values(C.storages).forEach(b=>{S.add(b.node);const _=b.storage;x.has(_)||x.set(_,{name:b.storage,type:b.type,content:b.content,allowedNodes:b.allowed_nodes||[],nodes:[]}),x.get(_).nodes.push({node:b.node,totalBytes:b.disk.total_bytes,usedBytes:b.disk.used_bytes,active:b.enabled!==!1})})};D?Object.values(e).forEach(C=>d(C)):t&&d(t);const V=[],Q={};S.forEach(C=>{Q[C]=[]}),x.forEach(C=>{const b=$o.includes(C.type),_=C.nodes[0].totalBytes,E=C.nodes.length>1&&_>0&&C.nodes.every(M=>Math.abs(M.totalBytes-_)/_<.01);if(b||E){const M=C.nodes[0],bt=C.allowedNodes.length>0?C.allowedNodes:C.nodes.map(rt=>rt.node);V.push({name:C.name,type:C.type,content:C.content,isShared:!0,totalBytes:M.totalBytes,usedBytes:M.usedBytes,connectedNodes:bt,nodeInstances:C.nodes})}else C.nodes.forEach(M=>{Q[M.node]||(Q[M.node]=[]),Q[M.node].push({name:C.name,type:C.type,content:C.content,isShared:!1,totalBytes:M.totalBytes,usedBytes:M.usedBytes,connectedNodes:[],nodeInstances:[M]})})});const nt=C=>{if(s==="local"&&C.isShared||s==="shared"&&!C.isShared)return!1;if(p){const b=p.toLowerCase();if(!C.name.toLowerCase().includes(b)&&!C.type.toLowerCase().includes(b))return!1}return!0},ut=V.filter(nt).sort((C,b)=>C.name.localeCompare(b.name)),G={};return Object.entries(Q).forEach(([C,b])=>{const _=b.filter(nt).sort((E,M)=>E.name.localeCompare(M.name));_.length>0&&(G[C]=_)}),ut.forEach(C=>{(C.totalBytes>0?C.usedBytes/C.totalBytes*100:0)>=85&&F++,$+=C.usedBytes,j+=C.totalBytes}),Object.values(G).flat().forEach(C=>{(C.totalBytes>0?C.usedBytes/C.totalBytes*100:0)>=85&&F++,$+=C.usedBytes,j+=C.totalBytes}),{sharedStorages:ut,localStoragesByNode:G,allNodes:Array.from(S).sort(),totals:{totalUsed:$,totalCapacity:j},warnings:F}},[t,e,D,s,p]),J=(x,$)=>{if(h&&h.name===x.name&&h.isShared===x.isShared){u(null),N(null),W(null);return}const j=$.getBoundingClientRect(),F=240,S=200,d=j.top+j.height/2;let V=j.right+30,Q=!1;V+F>window.innerWidth&&(V=j.left-F-30,Q=!0);let nt=j.top;nt+S>window.innerHeight&&(nt=window.innerHeight-S-10),nt<10&&(nt=10),u(x),N({x:V,y:nt}),W({x:Q?j.left:j.right,y:d})};if(!t&&!D)return r.jsx("div",{className:"storage-vault empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const at=Y.totalCapacity>0?Y.totalUsed/Y.totalCapacity*100:0;return r.jsxs("div",{className:"storage-vault",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"vault-header",children:[r.jsxs("div",{className:"header-title-section",children:[r.jsxs("h1",{className:"vault-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),r.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),r.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),r.jsxs("div",{className:"vault-stats",children:[r.jsx("span",{className:"stat-item",children:n("storage.count",{n:P.length+Object.values(O).flat().length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:P.length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(O).flat().length})}),tt>0&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{className:"stat-warning",children:["⚠️ ",tt," ",n("settings.warning")]})]})]})]}),r.jsxs("div",{className:"header-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("storage.search"),value:p,onChange:x=>l(x.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsxs("button",{className:`filter-tab ${s==="all"?"active":""}`,onClick:()=>c("all"),children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]}),r.jsx("span",{children:n("storage.filter_all")})]}),r.jsxs("button",{className:`filter-tab ${s==="shared"?"active":""}`,onClick:()=>c("shared"),children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.filter_shared")})]}),r.jsxs("button",{className:`filter-tab ${s==="local"?"active":""}`,onClick:()=>c("local"),children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.filter_local")})]})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsxs("button",{className:`view-btn ${i==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),r.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]}),r.jsx("span",{className:"view-btn-lbl",children:a==="zh-TW"?"能量槽":"Tanks"})]}),r.jsxs("button",{className:`view-btn ${i==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"矩形樹圖檢視（每 VM 磁碟占用）":"Treemap view (per-VM disk usage)",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),r.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),r.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),r.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]}),r.jsx("span",{className:"view-btn-lbl",children:a==="zh-TW"?"矩形樹圖":"Treemap"})]})]})]})]}),r.jsxs("div",{className:"panel-card summary-indicator-container",children:[r.jsxs("div",{className:"panel-card-head",children:[r.jsx("span",{className:"panel-card-dot"}),r.jsx("span",{children:n("storage.total_capacity")})]}),r.jsx(To,{percent:at,usedBytes:Y.totalUsed,totalBytes:Y.totalCapacity,duration:1500})]}),r.jsx("div",{className:"vault-content",children:i==="treemap"?r.jsx(Eo,{vmDiskData:X,totals:Y,storages:[...P.map(x=>x.name),...Object.values(O).flat().map(x=>x.name)]}):r.jsxs("div",{className:"tanks-layout",children:[(s==="all"||s==="shared")&&P.length>0&&r.jsxs("div",{className:"panel-card storage-section shared-section",children:[r.jsxs("div",{className:"panel-card-head",children:[r.jsx("span",{className:"panel-card-dot"}),r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.section_shared")}),r.jsx("span",{className:"panel-card-meta",children:n(P.length>1?"storage.storages_plural":"storage.storages_count",{n:P.length})})]}),r.jsx("div",{className:"panel-card-body tanks-grid shared-grid",children:P.map((x,$)=>r.jsx("div",{onClick:j=>J(x,j.currentTarget),onContextMenu:j=>K(j,x),style:{cursor:"pointer"},children:r.jsx(an,{name:x.name,usedBytes:x.usedBytes,totalBytes:x.totalBytes,type:x.type,isShared:!0,connectedNodes:x.connectedNodes,width:140,height:220,animationDelay:$*80})},x.name))})]}),(s==="all"||s==="local")&&Object.keys(O).length>0&&r.jsxs("div",{className:"panel-card storage-section local-section",children:[r.jsxs("div",{className:"panel-card-head",children:[r.jsx("span",{className:"panel-card-dot"}),r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.section_local")}),r.jsxs("span",{className:"panel-card-meta",children:[n(Object.values(O).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(O).flat().length})," ",n(Object.keys(O).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(O).length})]})]}),r.jsx("div",{className:"panel-card-body tanks-grid local-grid",children:(()=>{let x=P.length;return Object.entries(O).sort(([$],[j])=>$.localeCompare(j)).flatMap(([$,j])=>j.map(F=>{const S=F.nodeInstances[0],d=x++;return r.jsx("div",{onClick:V=>J(F,V.currentTarget),onContextMenu:V=>K(V,F),style:{cursor:"pointer"},children:r.jsx(an,{name:F.name,usedBytes:S.usedBytes,totalBytes:S.totalBytes,type:F.type,isShared:!1,nodeName:$,isOffline:!S.active,width:120,height:200,animationDelay:d*80})},`${$}-${F.name}`)}))})()})]}),P.length===0&&Object.keys(O).length===0&&r.jsx("div",{className:"no-storage",children:p?r.jsxs("span",{children:[n("error.no_data"),': "',p,'"']}):r.jsx("span",{children:n("error.no_data")})})]})}),r.jsx(Ao,{storage:h,position:v,sourcePos:z,onClose:()=>{u(null),N(null),W(null)},onManage:I}),L&&Me.createPortal(r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"storage-ctx-shield",onClick:()=>B(null),onContextMenu:x=>{x.preventDefault(),B(null)}}),r.jsxs("div",{className:"storage-ctx-menu",style:{left:L.x,top:L.y},onClick:x=>x.stopPropagation(),children:[r.jsxs("button",{className:"storage-ctx-item",onClick:()=>{I(L.storage),B(null)},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]}),r.jsx("span",{children:n("storage.content")})]}),r.jsxs("button",{className:"storage-ctx-item",onClick:()=>{const x=L.storage;let $=(t==null?void 0:t.id)||"",j="";if(x.isShared)j=x.connectedNodes[0]||"";else{const F=x.nodeInstances.find(S=>S.active)||x.nodeInstances[0];j=(F==null?void 0:F.node)||""}if(!$&&e){for(const[F,S]of Object.entries(e))if(S.nodes&&S.nodes[j]){$=F;break}}if(!$||!j){B(null);return}H({clusterId:$,node:j,storage:x.name,title:`${x.name} @ ${j}`}),B(null)},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:n("vm.perf_charts")})]})]})]}),document.body),r.jsx(Pn,{open:q!==null,clusterId:(q==null?void 0:q.clusterId)||"",node:(q==null?void 0:q.node)||"",storage:q==null?void 0:q.storage,kind:"storage",title:q==null?void 0:q.title,onClose:()=>H(null)}),r.jsx("style",{children:`
        .storage-vault {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #0a0c10 0%, #08090d 100%);
        }

        .storage-vault.empty {
          align-items: center;
          justify-content: center;
        }

        .vault-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-xs);
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .header-title-section {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md);
        }

        .vault-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }

        .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: storageIconFloat 3s ease-in-out infinite;
        }

        @keyframes storageIconFloat {
          0%, 100% { transform: none; }
          50% { transform: translateY(-2px); }
        }

        .vault-stats {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .stat-divider {
          margin: 0 var(--spacing-xs);
          color: rgba(100, 110, 130, 0.5);
        }

        .stat-warning {
          color: var(--warning);
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        /* Sci-Fi Horizontal Indicator Styles */
        /* Surface from panel-card; overflow stays visible because the
           pointer marker rides above the bar. */
        .summary-indicator-container {
          margin-bottom: var(--spacing-sm);
          overflow: visible;
        }

        .scifi-indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: 10px 16px 12px;
        }

        .indicator-left {
          min-width: 140px;
        }

        .indicator-bytes {
          font-family: var(--font-mono);
          font-size: 14px;
        }

        .indicator-bytes .used {
          font-weight: 600;
          text-shadow: 0 0 8px currentColor;
        }

        .indicator-bytes .separator {
          color: var(--text-muted);
          margin: 0 4px;
        }

        .indicator-bytes .total {
          color: var(--text-muted);
        }

        .indicator-bar-container {
          flex: 1;
          position: relative;
        }

        .indicator-bar {
          position: relative;
          height: 16px;
          background: rgba(10, 15, 25, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .segments-container {
          display: flex;
          height: 100%;
          gap: 2px;
          padding: 2px;
        }

        .segment {
          flex: 1;
          background: var(--segment-color);
          border-radius: 1px;
          transition: background 0.15s ease, box-shadow 0.15s ease;
        }

        .segment.active {
          box-shadow: 0 0 4px var(--segment-color);
          animation: segment-glow 0.3s ease-out both;
        }

        .segment.major {
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        @keyframes segment-glow {
          0% {
            opacity: 0;
            transform: scaleY(0.3);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.1);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        .indicator-glow {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          pointer-events: none;
          transition: width 0.1s ease-out;
        }

        .indicator-pointer {
          position: absolute;
          top: -6px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          transform: translateX(-50%);
          transition: left 0.1s ease-out;
        }

        .indicator-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: indicator-scan 2s linear infinite;
          pointer-events: none;
        }

        @keyframes indicator-scan {
          0% { left: -30px; }
          100% { left: 100%; }
        }

        .indicator-accent {
          height: 2px;
          margin-top: 2px;
          border-radius: 1px;
          box-shadow: 0 0 8px currentColor;
          transition: background 0.3s ease;
        }

        .indicator-right {
          min-width: 80px;
          text-align: right;
        }

        .indicator-percent {
          font-family: var(--font-mono);
          font-size: 28px;
          font-weight: 700;
          text-shadow: 0 0 15px currentColor;
          line-height: 1;
        }

        .indicator-percent .percent-symbol {
          font-size: 15px;
          opacity: 0.7;
          margin-left: 2px;
        }

        .summary-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
        }

        .summary-bar-fill.success { background: linear-gradient(90deg, #00cc70, #00aa60); }
        .summary-bar-fill.warning { background: linear-gradient(90deg, #dd9500, #cc8500); }
        .summary-bar-fill.danger { background: linear-gradient(90deg, #dd3050, #cc2040); }

        .summary-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .vault-content {
          flex: 1;
          overflow: auto;
        }

        /* Tanks Layout */
        .tanks-layout {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        /* Sections share the canonical panel-card surface; shared vs
           local is conveyed by the head icon + label, not tinted frames. */
        .section-icon {
          width: 16px;
          height: 16px;
          stroke: var(--primary);
          opacity: 0.85;
          flex-shrink: 0;
        }

        .tanks-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          justify-content: flex-start;
        }

        .shared-grid {
          justify-content: flex-start;
        }

        .local-grid {
          justify-content: flex-start;
        }

        /* Node grouping for local storage - breaks wall of sameness */
        .node-groups-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .node-group {
          background: rgba(0, 20, 35, 0.3);
          border: 1px solid rgba(0, 229, 255, 0.08);
          border-radius: 4px;
          padding: var(--spacing-md);
        }

        .node-group-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px dashed rgba(0, 229, 255, 0.15);
        }

        .node-group-name {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: #00E5FF;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          background: rgba(0, 229, 255, 0.1);
          border-radius: 3px;
          border-left: 3px solid #00E5FF;
        }

        .node-group-count {
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(0, 229, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Tooltip with subtle glassmorphism */
        .storage-tooltip {
          position: fixed;
          z-index: 1000;
          min-width: 260px;
          background: rgba(8, 12, 20, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 4px;
          padding: 14px;
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.7),
            0 0 20px rgba(0, 240, 255, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          pointer-events: auto;
          overflow: hidden;
          animation: tooltipMaterialize 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          clip-path: polygon(
            0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
            100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px)
          );
        }

        @keyframes tooltipMaterialize {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(8px);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Top accent line */
        .storage-tooltip::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.8) 50%, transparent 100%);
        }

        /* Bottom accent line */
        .storage-tooltip::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent);
        }

        /* Scan line effect - very subtle */
        .tooltip-scan-line {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(100, 130, 160, 0.04), transparent);
          animation: tooltipSweep 3s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes tooltipSweep {
          0% { left: -50%; }
          100% { left: 150%; }
        }

        /* Grid pattern overlay - very subtle */
        .storage-tooltip .tooltip-grid {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(80, 100, 130, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(80, 100, 130, 0.03) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
          opacity: 0.5;
        }

        /* Corner decorations - refined */
        .tooltip-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(100, 140, 180, 0.5);
          border-style: solid;
          opacity: 0;
          animation: cornerMaterialize 0.25s ease-out forwards;
          pointer-events: none;
        }

        .tooltip-corner.tl {
          top: -1px;
          left: -1px;
          border-width: 1px 0 0 1px;
          animation-delay: 0.05s;
        }

        .tooltip-corner.tr {
          top: -1px;
          right: -1px;
          border-width: 1px 1px 0 0;
          animation-delay: 0.1s;
        }

        .tooltip-corner.bl {
          bottom: -1px;
          left: -1px;
          border-width: 0 0 1px 1px;
          animation-delay: 0.15s;
        }

        .tooltip-corner.br {
          bottom: -1px;
          right: -1px;
          border-width: 0 1px 1px 0;
          animation-delay: 0.2s;
        }

        @keyframes cornerMaterialize {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: none;
          }
        }

        /* Corner dots - subtle status indicator */
        .tooltip-corner::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(0, 180, 200, 0.6);
          border-radius: 50%;
          animation: cornerDotPulse 2s ease-in-out infinite;
        }

        .tooltip-corner.tl::after { top: -2px; left: -2px; }
        .tooltip-corner.tr::after { top: -2px; right: -2px; }
        .tooltip-corner.bl::after { bottom: -2px; left: -2px; }
        .tooltip-corner.br::after { bottom: -2px; right: -2px; }

        @keyframes cornerDotPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        /* Connector line animation - refined */
        .tooltip-connector .connector-line {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: drawLine 0.3s ease-out forwards;
        }

        .tooltip-connector .connector-dot {
          opacity: 0;
          animation: dotMaterialize 0.25s ease-out 0.2s forwards;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes dotMaterialize {
          0% {
            opacity: 0;
            r: 0;
          }
          100% {
            opacity: 1;
            r: 3;
          }
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(80, 100, 130, 0.2);
          position: relative;
          z-index: 10;
        }

        .tooltip-name {
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 700;
          color: rgba(200, 220, 240, 0.95);
          letter-spacing: 0.03em;
        }

        .tooltip-close {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          line-height: 1;
          transition: color 0.2s;
          position: relative;
          z-index: 20;
        }

        .tooltip-close:hover {
          color: var(--danger-text);
        }

        .tooltip-type-row {
          margin-bottom: 8px;
        }

        .tooltip-badge {
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 3px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .tooltip-badge.shared {
          background: rgba(0, 180, 120, 0.15);
          color: rgba(100, 220, 180, 0.9);
          border: 1px solid rgba(0, 180, 120, 0.25);
        }

        .tooltip-badge.local {
          background: rgba(0, 160, 200, 0.12);
          color: rgba(100, 200, 220, 0.9);
          border: 1px solid rgba(0, 160, 200, 0.2);
        }

        .tooltip-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .tooltip-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 3px 0;
          gap: 12px;
        }

        /* Action footer for the storage tooltip — hosts the 管理 button.
           Border-top + slightly different bg gives it visual separation
           from the metadata rows above. */
        .tooltip-actions {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 240, 255, 0.18);
          display: flex;
          justify-content: stretch;
          position: relative;
          z-index: 1;
        }
        .tooltip-action-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 12px;
          background: rgba(0, 240, 255, 0.10);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: var(--radius-sm);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .tooltip-action-btn:hover {
          background: rgba(0, 240, 255, 0.2);
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
          text-shadow: 0 0 6px var(--primary);
        }

        /* Right-click context menu. Fixed-positioned, pinned via inline
           style. Uses the same cyber-style as other menus in the app. */
        .storage-ctx-shield {
          position: fixed;
          inset: 0;
          z-index: 9998;
        }
        .storage-ctx-menu {
          position: fixed;
          z-index: 9999;
          min-width: 160px;
          padding: 4px;
          background: var(--bg-secondary);
          border: 1px solid var(--primary);
          border-radius: var(--radius-sm);
          box-shadow: 0 8px 24px rgba(0,0,0,0.6),
                      0 0 16px rgba(0, 240, 255, 0.25);
          animation: ctxMenuIn 0.15s ease-out;
        }
        @keyframes ctxMenuIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: none; }
        }
        .storage-ctx-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-align: left;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .storage-ctx-item:hover {
          background: rgba(0, 240, 255, 0.12);
          color: var(--primary);
          text-shadow: 0 0 6px var(--primary);
        }

        .tooltip-row > span:first-child {
          color: var(--text-muted);
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          min-width: 50px;
        }

        .tooltip-row > span:last-child {
          color: var(--text-primary);
          font-weight: 500;
          text-align: right;
        }

        .tooltip-labels {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          justify-content: flex-end;
          max-width: 160px;
        }

        .tooltip-label {
          font-size: 10px;
          padding: 2px 6px;
          background: rgba(0, 200, 255, 0.15);
          color: rgba(150, 220, 255, 0.95);
          border: 1px solid rgba(0, 200, 255, 0.3);
          border-radius: 3px;
          font-weight: 500;
          white-space: nowrap;
        }

        .tooltip-label.node {
          background: rgba(100, 180, 100, 0.15);
          color: rgba(150, 220, 150, 0.95);
          border-color: rgba(100, 180, 100, 0.3);
        }

        .no-storage {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        /* Treemap styles - sci-fi themed */
        .treemap-container {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          height: 100%;
          min-height: 500px;
        }

        .treemap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-sm) var(--spacing-md);
          background: rgba(10, 14, 22, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(60, 80, 120, 0.2);
          border-radius: var(--radius-sm);
        }

        .treemap-title {
          font-size: 14px;
          color: rgba(100, 200, 220, 0.9);
          letter-spacing: 0.12em;
        }

        .treemap-stats {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .treemap-grid {
          flex: 1;
          background: linear-gradient(180deg, rgba(8, 12, 20, 0.8) 0%, rgba(5, 8, 15, 0.9) 100%);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(60, 80, 120, 0.25);
          border-radius: var(--radius-md);
          min-height: 400px;
          overflow: hidden;
          position: relative;
        }

        /* Subtle grid pattern overlay */
        .treemap-grid::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(60, 100, 140, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(60, 100, 140, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          z-index: 0;
        }


        .treemap-grid .d3-treemap {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }

        /* Treemap staggered entry animation - Sci-Fi Holographic Materialization */
        .treemap-node-enter > rect,
        .treemap-node-enter > text,
        .treemap-node-enter > line,
        .treemap-node-enter > path,
        .treemap-node-enter > circle {
          animation: treemap-element-materialize 0.6s ease-out both;
          animation-delay: var(--anim-delay, 0ms);
        }

        @keyframes treemap-element-materialize {
          0% {
            opacity: 0;
            filter: blur(6px) brightness(2);
          }
          20% {
            opacity: 0.2;
            filter: blur(4px) brightness(1.8);
          }
          40% {
            opacity: 0.1;
            filter: blur(8px) brightness(2.5);
          }
          60% {
            opacity: 0.6;
            filter: blur(2px) brightness(1.5);
          }
          80% {
            opacity: 0.9;
            filter: blur(0.5px) brightness(1.2);
          }
          100% {
            opacity: 1;
            filter: none;
          }
        }

        /* Additional hover effects for treemap nodes */
        .d3-treemap g {
          transition: filter 0.3s ease;
        }

        .d3-treemap g:hover {
          filter: drop-shadow(0 0 15px currentColor) brightness(1.2);
        }

        /* Circuit line animation */
        .d3-treemap .circuit-line {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: circuit-draw 1.5s ease-out forwards, circuit-pulse 2s ease-in-out 1.5s infinite;
        }

        @keyframes circuit-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes circuit-pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Energy dot pulsing */
        .d3-treemap .energy-dot {
          animation: energy-dot-pulse 1.5s ease-in-out infinite;
        }

        @keyframes energy-dot-pulse {
          0%, 100% {
            opacity: 0.5;
            r: 2;
          }
          50% {
            opacity: 1;
            r: 3;
          }
        }

        /* Glow pulse animation */
        .d3-treemap .glow-pulse {
          animation: glow-pulse-anim 2.5s ease-in-out infinite;
        }

        @keyframes glow-pulse-anim {
          0%, 100% {
            opacity: 0.4;
            stroke-width: 3;
          }
          50% {
            opacity: 0.7;
            stroke-width: 4;
          }
        }

        /* Data stream border animation */
        .d3-treemap .data-stream {
          animation: data-stream-flow 1.5s linear infinite;
        }

        @keyframes data-stream-flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -24;
          }
        }

        /* Hex pattern overlay for larger blocks */
        .d3-treemap .hex-overlay {
          animation: hex-shimmer 3s ease-in-out infinite;
        }

        @keyframes hex-shimmer {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.12;
          }
        }

        .treemap-legend {
          display: flex;
          gap: var(--spacing-lg);
          justify-content: center;
          align-items: center;
          padding: var(--spacing-sm) var(--spacing-md);
          background: rgba(10, 14, 22, 0.5);
          border: 1px solid rgba(60, 80, 120, 0.15);
          border-radius: var(--radius-sm);
        }

        .treemap-legend .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .treemap-legend .legend-color {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 4px currentColor;
        }

        .treemap-legend .legend-color.running {
          background: linear-gradient(135deg, rgba(0, 255, 200, 0.9), rgba(0, 200, 255, 0.9));
          box-shadow: 0 0 8px rgba(0, 255, 220, 0.5);
        }
        .treemap-legend .legend-color.stopped {
          background: rgba(50, 55, 70, 0.8);
          box-shadow: none;
        }

        .treemap-legend .legend-note {
          font-size: 10px;
          color: var(--text-muted);
          margin-left: var(--spacing-md);
          padding-left: var(--spacing-md);
          border-left: 1px solid rgba(80, 100, 130, 0.3);
        }

        /* Size legend for treemap */
        .treemap-legend .size-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-left: var(--spacing-md);
          padding-left: var(--spacing-md);
          border-left: 1px solid rgba(80, 100, 130, 0.3);
        }

        .treemap-legend .size-legend .size-box {
          width: 8px;
          height: 8px;
          border-radius: 2px;
        }

        .treemap-legend .size-legend .size-box.large {
          background: rgba(0, 255, 200, 0.8);
          box-shadow: 0 0 6px rgba(0, 255, 200, 0.5);
        }
        .treemap-legend .size-legend .size-box.medium {
          background: rgba(0, 200, 255, 0.8);
          box-shadow: 0 0 6px rgba(0, 200, 255, 0.4);
        }
        .treemap-legend .size-legend .size-box.small {
          background: rgba(180, 100, 255, 0.8);
          box-shadow: 0 0 6px rgba(180, 100, 255, 0.4);
        }
        .treemap-legend .size-legend .size-box.tiny {
          background: rgba(255, 80, 200, 0.8);
          box-shadow: 0 0 6px rgba(255, 80, 200, 0.4);
        }

        /* Common controls */
        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          background: rgba(10, 15, 25, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: var(--radius-sm);
          padding: 6px 10px;
        }

        .search-box svg {
          color: var(--text-muted);
        }

        .search-box input {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          outline: none;
          width: 70px;
        }

        .search-box input::placeholder {
          color: var(--text-muted);
        }

        .filter-tabs {
          display: flex;
          gap: 2px;
          background: rgba(10, 15, 25, 0.8);
          padding: 2px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 240, 255, 0.1);
        }

        .filter-tab {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 12px;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          text-transform: uppercase;
        }

        .filter-tab svg { flex-shrink: 0; opacity: 0.8; }

        .filter-tab:hover {
          color: var(--text-primary);
        }

        .filter-tab.active {
          background: rgba(0, 240, 255, 0.15);
          color: var(--primary);
        }

        .view-toggle {
          display: flex;
          gap: 2px;
          background: rgba(10, 15, 25, 0.8);
          padding: 2px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0, 240, 255, 0.1);
        }

        .view-btn-lbl {
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        @media (max-width: 1280px) {
          .view-btn-lbl { display: none; }
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

        .view-btn:hover {
          color: var(--text-primary);
        }

        .view-btn.active {
          background: rgba(0, 240, 255, 0.15);
          color: var(--primary);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .tanks-grid {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .vault-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-controls {
            width: 100%;
            flex-wrap: wrap;
          }

          .search-box {
            flex: 1;
            min-width: 150px;
          }

          .search-box input {
            width: 100%;
          }

          /* Responsive SciFi Indicator */
          .scifi-indicator {
            gap: var(--spacing-sm);
          }

          .indicator-left {
            min-width: auto;
            flex-shrink: 0;
          }

          .indicator-bytes {
            font-size: 12px;
          }

          .indicator-bar-container {
            min-width: 80px;
          }

          .indicator-right {
            min-width: auto;
            flex-shrink: 0;
          }

          .indicator-percent {
            font-size: 20px;
          }

          .indicator-percent .percent-symbol {
            font-size: 13px;
          }
        }

        /* VM Disk Popup Styles */
        .popup-connector-line {
          position: fixed;
          height: 2px;
          background: linear-gradient(90deg, rgba(0, 240, 255, 0.8), rgba(0, 240, 255, 0.4));
          transform-origin: left center;
          z-index: 999;
          pointer-events: none;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }

        .vm-disk-popup {
          position: fixed;
          background: rgba(10, 15, 25, 0.95);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 8px;
          padding: 16px;
          min-width: 320px;
          max-width: 400px;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          animation: popup-appear 0.2s ease-out;
        }

        @keyframes popup-appear {
          from {
            opacity: 0;
            transform: translate(-50%, -100%) translateY(0);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%) translateY(-10px);
          }
        }

        .vm-disk-popup::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.6), transparent);
        }

        .popup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.15);
        }

        .popup-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .popup-title .vm-icon {
          font-size: 18px;
        }

        .popup-title .vm-name {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .popup-title .vm-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .popup-close {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 20px;
          cursor: pointer;
          padding: 4px 8px;
          line-height: 1;
          transition: color 0.2s;
        }

        .popup-close:hover {
          color: #ff6b6b;
        }

        .popup-status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .node-info {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .popup-section {
          margin-bottom: 14px;
        }

        .section-label {
          font-family: var(--font-display);
          font-size: 10px;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }

        .disk-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .disk-item {
          background: rgba(0, 20, 40, 0.5);
          border: 1px solid rgba(0, 240, 255, 0.1);
          border-radius: 6px;
          padding: 10px;
        }

        .disk-device {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .device-name {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
        }

        .device-format {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #00f0ff;
          background: rgba(0, 240, 255, 0.15);
          padding: 2px 8px;
          border-radius: 3px;
          border: 1px solid rgba(0, 240, 255, 0.3);
          text-transform: uppercase;
        }

        .disk-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .disk-storage {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #ff9f43;
        }

        .disk-size {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .disk-bar {
          height: 4px;
          background: rgba(30, 40, 60, 0.8);
          border-radius: 2px;
          overflow: hidden;
        }

        .disk-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f0ff, #00ff88);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }

        .popup-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 240, 255, 0.15);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .popup-total .total-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .disk-summary {
          background: rgba(0, 20, 40, 0.5);
          border: 1px solid rgba(0, 240, 255, 0.1);
          border-radius: 6px;
          padding: 12px;
        }

        .disk-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .disk-summary-row:last-of-type {
          margin-bottom: 10px;
        }

        .disk-label {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .disk-value {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .popup-metrics {
          display: flex;
          gap: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(0, 240, 255, 0.15);
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
        }

        .disk-usage-section {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 240, 255, 0.1);
        }
      `})]})}const Wo=["backup","iso","vztmpl","snippets","import","images","rootdir"],Po=new Set(["rbd","lvm","lvmthin","zfspool","zfs","iscsi","iscsidirect"]);function Io({clusterId:t,node:e,storageName:n,clusters:a}){var Zt,me;const{t:i,language:o}=Yt(),s=Rn(),c=Wn(),p=y.useMemo(()=>{var A,U;const m=a==null?void 0:a[t];if(!m)return null;const w=m.storages||{};let k=w[`${e}/${n}`]||w[n];if(!k){for(const Z of Object.values(w))if(Z&&Z.storage===n){k=Z;break}}return k?{clusterName:m.name||t,type:k.type||"",content:k.content||[],total:((A=k.disk)==null?void 0:A.total_bytes)||0,used:((U=k.disk)==null?void 0:U.used_bytes)||0,shared:!!k.shared}:null},[a,t,n,e]),l=p?Po.has(p.type):!1,f=((Zt=c.user)==null?void 0:Zt.role_global)==="operator"||((me=c.user)==null?void 0:me.role_global)==="admin"||!c.authEnforced,g=y.useMemo(()=>{if(!p)return[];const m=new Set(p.content);return Wo.filter(w=>m.has(w))},[p]),[h,u]=y.useState(null);y.useEffect(()=>{h&&g.includes(h)||g.length>0&&u(g[0])},[g,h]);const[v,N]=y.useState([]),[z,W]=y.useState(!1),[L,B]=y.useState(null),[q,H]=y.useState(0),[I,K]=y.useState(!1),[D,X]=y.useState(null),[P,O]=y.useState(0),[R,Y]=y.useState(!1),[tt,J]=y.useState(null),[at,x]=y.useState(!1),[$,j]=y.useState(""),[F,S]=y.useState(""),[d,V]=y.useState(""),[Q,nt]=y.useState(""),[ut,G]=y.useState(!0),[C,b]=y.useState(!1),[_,E]=y.useState(null),[M,bt]=y.useState(""),[rt,Tt]=y.useState("ctime"),[it,Nt]=y.useState("desc"),dt=m=>{rt===m?Nt(w=>w==="asc"?"desc":"asc"):(Tt(m),Nt(m==="name"||m==="format"||m==="notes"?"asc":"desc")),$t(!0),setTimeout(()=>$t(!1),600)},[Kt,$t]=y.useState(!1);y.useEffect(()=>{if(!h)return;let m=!1;W(!0),B(null);const w=`/api/clusters/${encodeURIComponent(t)}/nodes/${encodeURIComponent(e)}/storage/${encodeURIComponent(n)}/content?type=${h}`;return fetch(w,{credentials:"same-origin"}).then(async k=>{if(!k.ok){const U=await k.text().catch(()=>"");throw new Error(`HTTP ${k.status}: ${U.slice(0,200)}`)}const A=await k.json();m||N(Array.isArray(A.items)?A.items:[])}).catch(k=>{m||B(String((k==null?void 0:k.message)||k))}).finally(()=>{m||W(!1)}),()=>{m=!0}},[h,q,t,e,n]);const Ft=()=>{window.history.pushState(null,"","/storage"),window.dispatchEvent(new PopStateEvent("popstate"))},ge=async m=>{if(!(!f||l||!await s.confirm(o==="zh-TW"?`確定要刪除「${Bt(m.volid)}」？此操作無法復原。`:`Delete "${Bt(m.volid)}"? This cannot be undone.`,{title:o==="zh-TW"?"刪除確認":"Delete confirmation",destructive:!0})))try{const k=`/api/clusters/${encodeURIComponent(t)}/nodes/${encodeURIComponent(e)}/storage/${encodeURIComponent(n)}/content/`+encodeURIComponent(m.volid),A=await fetch(k,{method:"DELETE",credentials:"same-origin"});if(!A.ok){const U=await A.text().catch(()=>"");throw new Error(`HTTP ${A.status}: ${U.slice(0,200)}`)}N(U=>U.filter(Z=>Z.volid!==m.volid)),H(U=>U+1)}catch(k){await s.alert(o==="zh-TW"?`刪除失敗：${k}`:`Delete failed: ${k}`,{title:o==="zh-TW"?"錯誤":"Error"})}},pt=y.useMemo(()=>{let m=v;const w=M.trim().toLowerCase();return w&&(m=v.filter(A=>Bt(A.volid).toLowerCase().includes(w)||(A.format||"").toLowerCase().includes(w)||(A.notes||"").toLowerCase().includes(w))),m.slice().sort((A,U)=>{let Z=0;switch(rt){case"name":Z=Bt(A.volid).localeCompare(Bt(U.volid));break;case"ctime":Z=(A.ctime||0)-(U.ctime||0);break;case"format":Z=(A.format||"").localeCompare(U.format||"");break;case"size":Z=(A.size||0)-(U.size||0);break;case"vmid":Z=(A.vmid??-1)-(U.vmid??-1);break;case"notes":Z=(A.notes||"").localeCompare(U.notes||"");break}return it==="asc"?Z:-Z})},[v,M,rt,it]),ot=m=>rt===m?it==="asc"?"▲":"▼":"";if(!p)return r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]});const ht=p.total>0?p.used/p.total*100:0;return r.jsxs("div",{className:"storage-detail",children:[r.jsxs("div",{className:"storage-detail-header",children:[r.jsxs("button",{className:"back-btn",onClick:Ft,title:o==="zh-TW"?"返回儲存清單":"Back to storage list",children:[r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M15 18l-6-6 6-6"})}),r.jsx("span",{children:o==="zh-TW"?"返回":"Back"})]}),r.jsxs("div",{className:"storage-detail-title",children:[r.jsx("span",{className:"breadcrumb",children:p.clusterName}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("span",{className:"breadcrumb",children:e}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("h1",{className:"storage-name font-display",children:n}),r.jsx("span",{className:`storage-type-badge ${l?"block":"file"}`,children:p.type.toUpperCase()}),p.shared&&r.jsx("span",{className:"storage-shared-badge",children:o==="zh-TW"?"共享":"SHARED"})]}),r.jsxs("div",{className:"storage-detail-stats",children:[r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:i("metric.used")}),r.jsxs("span",{className:`stat-val text-${we(ht)}`,children:[lt(p.used)," / ",lt(p.total)]})]}),r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:i("metric.usage")}),r.jsx("span",{className:`stat-val text-${we(ht)}`,children:sn(ht,1)})]})]})]}),r.jsx("div",{className:"storage-detail-tabs",children:g.length===0?r.jsx("span",{className:"no-tabs",children:o==="zh-TW"?"此儲存沒有可管理的內容類型":"No manageable content types on this storage"}):g.map(m=>r.jsxs("button",{className:`storage-tab tab-${m} ${h===m?"active":""}`,onClick:()=>u(m),children:[r.jsx("span",{className:"tab-icon","aria-hidden":!0,children:Do(m)}),r.jsx("span",{children:ve(m,o)})]},m))}),r.jsxs("div",{className:"storage-detail-toolbar",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:o==="zh-TW"?"搜尋名稱 / 格式 / 備註":"Search name / format / notes",value:M,onChange:m=>bt(m.target.value)})]}),!l&&f&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"action-btn",onClick:()=>K(!0),title:o==="zh-TW"?"從本機上傳檔案到此儲存":"Upload a local file to this storage",children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M12 5v14M5 12l7-7 7 7"})}),r.jsx("span",{children:o==="zh-TW"?"上傳":"Upload"})]}),r.jsxs("button",{className:"action-btn",onClick:()=>x(!0),title:o==="zh-TW"?"伺服器端從 URL 下載到此儲存（PVE download-url）":"Server-side download to this storage (PVE download-url)",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"})]}),r.jsx("span",{children:o==="zh-TW"?"從網址下載":"From URL"})]})]}),l&&r.jsx("span",{className:"readonly-hint",children:o==="zh-TW"?"此儲存為區塊級（VM 磁碟），僅供瀏覽":"Block-level storage (VM disks) — list only"}),r.jsxs("button",{className:"action-btn ghost",onClick:()=>H(m=>m+1),title:o==="zh-TW"?"重新整理":"Refresh",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),r.jsx("span",{children:o==="zh-TW"?"重新整理":"Refresh"})]})]}),r.jsxs("div",{className:"storage-detail-list",children:[r.jsx("div",{className:"tab-scan-line"}),z&&v.length===0&&r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]}),L&&r.jsx("div",{className:"storage-detail-error",children:r.jsxs("span",{children:[o==="zh-TW"?"錯誤：":"Error: ",L]})}),!z&&!L&&pt.length===0&&r.jsx("div",{className:"storage-detail-empty",children:r.jsx("span",{children:o==="zh-TW"?"此分類無內容":"No items in this category"})}),pt.length>0&&r.jsxs("table",{className:"storage-content-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:`sortable ${rt==="name"?"sorted":""}`,onClick:()=>dt("name"),children:r.jsxs("span",{children:[o==="zh-TW"?"名稱":"Name",ot("name")&&r.jsx("span",{className:"sort-indicator",children:ot("name")})]})}),r.jsx("th",{className:`sortable ${rt==="ctime"?"sorted":""}`,onClick:()=>dt("ctime"),children:r.jsxs("span",{children:[o==="zh-TW"?"日期":"Date",ot("ctime")&&r.jsx("span",{className:"sort-indicator",children:ot("ctime")})]})}),r.jsx("th",{className:`sortable ${rt==="format"?"sorted":""}`,onClick:()=>dt("format"),children:r.jsxs("span",{children:[o==="zh-TW"?"格式":"Format",ot("format")&&r.jsx("span",{className:"sort-indicator",children:ot("format")})]})}),r.jsx("th",{className:`num sortable ${rt==="size"?"sorted":""}`,onClick:()=>dt("size"),children:r.jsxs("span",{children:[o==="zh-TW"?"大小":"Size",ot("size")&&r.jsx("span",{className:"sort-indicator",children:ot("size")})]})}),h==="backup"&&r.jsx("th",{className:`num sortable ${rt==="vmid"?"sorted":""}`,onClick:()=>dt("vmid"),children:r.jsxs("span",{children:["VMID",ot("vmid")&&r.jsx("span",{className:"sort-indicator",children:ot("vmid")})]})}),h==="backup"&&r.jsx("th",{className:`sortable ${rt==="notes"?"sorted":""}`,onClick:()=>dt("notes"),children:r.jsxs("span",{children:[o==="zh-TW"?"備註":"Notes",ot("notes")&&r.jsx("span",{className:"sort-indicator",children:ot("notes")})]})}),!l&&f&&r.jsx("th",{className:"actions",children:o==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:pt.map(m=>{const w=En(m.format),k=Lo(m.size);return r.jsxs("tr",{className:Kt?"sort-animating":"",children:[r.jsxs("td",{className:"name-cell",title:m.volid,children:[r.jsx("span",{className:"file-icon","aria-hidden":!0,children:qo(m.format)}),r.jsx("span",{className:"file-name",children:Bt(m.volid)})]}),r.jsx("td",{className:"date-cell",children:m.ctime?Uo(m.ctime):"—"}),r.jsx("td",{children:m.format?r.jsx("span",{className:`format-badge ${w}`,children:m.format}):r.jsx("span",{className:"muted",children:"—"})}),r.jsx("td",{className:`num size-${k}`,children:m.size?lt(m.size):"—"}),h==="backup"&&r.jsx("td",{className:"num",children:m.vmid!=null?r.jsxs("span",{className:"vmid-badge",children:["#",m.vmid]}):r.jsx("span",{className:"muted",children:"—"})}),h==="backup"&&r.jsx("td",{className:"notes-cell",title:m.notes||"",children:m.notes||r.jsx("span",{className:"muted",children:"—"})}),!l&&r.jsxs("td",{className:"actions",children:[r.jsxs("a",{className:"action-btn-row",href:`/api/clusters/${encodeURIComponent(t)}/nodes/${encodeURIComponent(e)}/storage/${encodeURIComponent(n)}/download/`+encodeURIComponent(m.volid),download:!0,title:o==="zh-TW"?"下載到本機（SSH 串流）":"Download to local (SSH stream)",onClick:A=>A.stopPropagation(),children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{className:"act-lbl",children:o==="zh-TW"?"下載":"Download"})]}),f&&r.jsxs("button",{className:"action-btn-row danger",onClick:()=>ge(m),title:o==="zh-TW"?"刪除":"Delete",children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"}),r.jsx("path",{d:"M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"})]}),r.jsx("span",{className:"act-lbl",children:o==="zh-TW"?"刪除":"Delete"})]})]})]},m.volid)})})]})]},h||"none"),I&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!R&&K(!1),onDragOver:m=>m.preventDefault(),onDrop:m=>{var k;if(m.preventDefault(),R)return;const w=(k=m.dataTransfer.files)==null?void 0:k[0];w&&X(w)},children:r.jsxs("div",{className:"url-dl-frame",onClick:m=>m.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsxs("span",{children:[o==="zh-TW"?"上傳到 ":"Upload to ",n]}),r.jsx("button",{className:"url-dl-close",onClick:()=>!R&&K(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`將檔案上傳到此儲存區的 ${ve(h||"iso",o)} 分類。可拖曳檔案到此視窗。`:`Upload a file to this storage's ${ve(h||"iso",o)} category. You can also drag-drop into this window.`}),r.jsx("label",{children:o==="zh-TW"?"檔案":"File"}),r.jsx("input",{type:"file",disabled:R,onChange:m=>{var w;return X(((w=m.target.files)==null?void 0:w[0])||null)},style:{width:"100%",padding:"8px",background:"#02050b",border:"1px solid var(--border)",borderRadius:4,color:"var(--text-primary)",fontFamily:"var(--font-mono)",fontSize:13}}),D&&r.jsxs("div",{className:"url-dl-lead",style:{marginTop:8},children:[r.jsx("code",{children:D.name})," · ",r.jsxs("span",{children:[(D.size/(1024*1024)).toFixed(1)," MB"]})]}),R&&r.jsxs("div",{style:{marginTop:12},children:[r.jsx("div",{style:{height:6,background:"#02050b",borderRadius:3,border:"1px solid var(--border)",overflow:"hidden"},children:r.jsx("div",{style:{width:`${P}%`,height:"100%",background:"linear-gradient(90deg, var(--primary), #00b4ff)",transition:"width 0.2s ease",boxShadow:"0 0 8px rgba(0,240,255,0.5)"}})}),r.jsxs("div",{style:{marginTop:6,fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-secondary)"},children:[P.toFixed(1),"%"," ",o==="zh-TW"?"上傳中…":"Uploading…"]})]}),tt&&r.jsx("div",{className:"url-dl-err",children:tt})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!R&&K(!1),disabled:R,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:R||!D||!h,onClick:()=>{if(!D||!h)return;Y(!0),J(null),O(0);const m=new FormData;m.append("content",h),m.append("filename",D,D.name);const w=new XMLHttpRequest;w.upload.onprogress=k=>{k.lengthComputable&&O(k.loaded/k.total*100)},w.onload=()=>{Y(!1),w.status>=200&&w.status<300?(K(!1),X(null),O(0),H(k=>k+1),s.alert(o==="zh-TW"?"上傳完成。檔案已派送到 PVE。":"Upload complete. File dispatched to PVE.",{title:o==="zh-TW"?"完成":"Done"})):J(`HTTP ${w.status}: ${w.responseText.slice(0,200)}`)},w.onerror=()=>{Y(!1),J(o==="zh-TW"?"網路錯誤":"Network error")},w.open("POST",`/api/clusters/${encodeURIComponent(t)}/nodes/${encodeURIComponent(e)}/storage/${encodeURIComponent(n)}/upload`),w.withCredentials=!0,w.send(m)},children:R?o==="zh-TW"?"上傳中…":"Uploading…":o==="zh-TW"?"開始上傳":"Upload"})]})]})}),at&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!C&&x(!1),children:r.jsxs("div",{className:"url-dl-frame",onClick:m=>m.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsx("span",{children:o==="zh-TW"?"從網址下載":"Download from URL"}),r.jsx("button",{className:"url-dl-close",onClick:()=>!C&&x(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`PVE 端伺服器會直接從這個網址抓檔到 ${n}，你的網路頻寬不會經手。`:`The PVE host will pull the file directly into ${n}; your bandwidth never carries it.`}),r.jsx("label",{children:o==="zh-TW"?"網址 (URL)":"URL"}),r.jsx("input",{type:"text",value:$,onChange:m=>j(m.target.value),placeholder:"https://example.com/debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"檔名（儲存後）":"Filename (as stored)"}),r.jsx("input",{type:"text",value:F,onChange:m=>S(m.target.value),placeholder:"debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"校驗 (選填)":"Checksum (optional)"}),r.jsxs("div",{className:"url-dl-row",children:[r.jsxs("select",{value:Q,onChange:m=>nt(m.target.value),className:"url-dl-algo",children:[r.jsx("option",{value:"",children:o==="zh-TW"?"— 演算法 —":"— algorithm —"}),r.jsx("option",{value:"sha256",children:"sha256"}),r.jsx("option",{value:"sha512",children:"sha512"}),r.jsx("option",{value:"md5",children:"md5"})]}),r.jsx("input",{type:"text",value:d,onChange:m=>V(m.target.value),placeholder:o==="zh-TW"?"十六進位摘要":"hex digest",spellCheck:!1,autoComplete:"off"})]}),r.jsxs("label",{className:"url-dl-check",children:[r.jsx("input",{type:"checkbox",checked:ut,onChange:m=>G(m.target.checked)}),r.jsx("span",{children:o==="zh-TW"?"驗證來源 TLS 憑證（建議開啟）":"Verify source TLS certificate (recommended)"})]}),_&&r.jsx("div",{className:"url-dl-err",children:_})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!C&&x(!1),disabled:C,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:C||!$||!F||!h,onClick:async()=>{if(h){b(!0),E(null);try{const m=await fetch(`/api/clusters/${encodeURIComponent(t)}/nodes/${encodeURIComponent(e)}/storage/${encodeURIComponent(n)}/download-url`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:$,filename:F,content:h,checksum:d||void 0,checksum_algorithm:Q||void 0,verify_certificates:ut})});if(!m.ok){const w=await m.text().catch(()=>"");throw new Error(`HTTP ${m.status}: ${w.slice(0,200)}`)}x(!1),j(""),S(""),V(""),nt(""),setTimeout(()=>H(w=>w+1),1e3),await s.alert(o==="zh-TW"?"下載作業已派送。完成後檔案會出現在清單。":"Download task dispatched. The file will appear in the list when finished.",{title:o==="zh-TW"?"已派送":"Dispatched"})}catch(m){E(String(m instanceof Error?m.message:m))}finally{b(!1)}}},children:C?o==="zh-TW"?"派送中…":"Dispatching…":o==="zh-TW"?"開始下載":"Start download"})]})]})}),r.jsx("style",{children:`
        .storage-detail {
          padding: var(--spacing-lg);
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          overflow: hidden;
        }
        .storage-detail-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .back-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }
        .storage-detail-title {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 0;
        }
        .breadcrumb {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }
        .breadcrumb-sep {
          color: var(--text-muted);
          opacity: 0.5;
        }
        .storage-name {
          font-size: 22px;
          color: var(--primary);
          text-shadow: 0 0 8px rgba(0,240,255,0.4);
          margin: 0;
        }
        .storage-type-badge {
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          font-weight: bold;
        }
        .storage-type-badge.file {
          background: rgba(0, 240, 255, 0.15);
          color: var(--primary);
          border: 1px solid var(--primary);
        }
        .storage-type-badge.block {
          background: rgba(224, 102, 255, 0.15);
          color: #e066ff;
          border: 1px solid #e066ff;
        }
        .storage-shared-badge {
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          border: 1px solid var(--border);
        }
        .storage-detail-stats {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          align-items: flex-end;
        }
        .stat-label {
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .stat-val {
          font-family: var(--font-mono);
          font-size: 14px;
        }
        .storage-detail-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          align-self: flex-start;
        }
        .storage-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .storage-tab:hover {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.06);
        }
        .storage-tab.active {
          color: var(--primary);
          background: rgba(0,240,255,0.15);
          text-shadow: 0 0 6px var(--primary);
        }
        /* Tab icon — inherits the tab's text colour by default (so the
           icon dims with inactive tabs and lights up when active or
           hovered). Each content-type tab gets a TINT override so even
           inactive tabs are visually distinguishable at a glance. */
        .tab-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          flex: 0 0 14px;
          opacity: 0.85;
          transition: filter var(--transition-fast), opacity var(--transition-fast);
        }
        .storage-tab.active .tab-icon {
          opacity: 1;
          filter: drop-shadow(0 0 4px currentColor);
        }
        .storage-tab.tab-backup   .tab-icon { color: #ffa500; }
        .storage-tab.tab-iso      .tab-icon { color: #00b4ff; }
        .storage-tab.tab-vztmpl   .tab-icon { color: #b464ff; }
        .storage-tab.tab-snippets .tab-icon { color: #a0c864; }
        .storage-tab.tab-import   .tab-icon { color: #ff64b4; }
        .storage-tab.tab-images   .tab-icon { color: #00f0c8; }
        .storage-tab.tab-rootdir  .tab-icon { color: var(--text-secondary); }
        .no-tabs {
          padding: 8px 14px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 13px;
        }
        .storage-detail-toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        /* One fixed control height across the toolbar — search box and
           buttons drift apart whenever either side's padding/font moves. */
        .storage-detail-toolbar .search-box,
        .storage-detail-toolbar .action-btn {
          height: 34px;
          box-sizing: border-box;
        }
        .storage-detail-toolbar .search-box {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          flex: 0 0 280px;
        }
        .storage-detail-toolbar .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          width: 100%;
        }
        /* Lighter placeholder so the hint is readable, not faded out. */
        .storage-detail-toolbar .search-box input::placeholder {
          color: var(--text-secondary);
          opacity: 1;
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .action-btn:hover:not(.disabled):not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
        }
        .action-btn.ghost {
          margin-left: auto;
        }
        .action-btn.disabled, .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .readonly-hint {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }
        .storage-detail-list {
          flex: 1;
          overflow: auto;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          position: relative;
          /* Replayed every time we re-mount with a new key=activeTab. */
          animation: tabSwitchIn 0.24s ease-out;
        }
        @keyframes tabSwitchIn {
          0% {
            opacity: 0;
            transform: translateY(6px);
            filter: blur(2px);
          }
          60% {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
        /* Scanline that sweeps top→bottom across the table when a tab
           is freshly opened. We animate the top property from above the
           visible area to past the bottom so the bar visibly traverses
           the whole list, not just shifts 2px. A taller (4px) bar with
           stronger glow + tail makes the sweep obvious without being
           garish. */
        .tab-scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.4) 20%,
            rgba(0, 240, 255, 0.95) 50%,
            rgba(0, 240, 255, 0.4) 80%,
            transparent 100%);
          box-shadow:
            0 0 12px 2px rgba(0, 240, 255, 0.6),
            0 0 24px rgba(0, 240, 255, 0.35);
          pointer-events: none;
          z-index: 5;
          animation: tabScan 0.55s cubic-bezier(0.55, 0, 0.4, 1) forwards;
          opacity: 0;
          top: -8px;
        }
        /* Soft trailing glow that follows the scan-line down. */
        .tab-scan-line::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          top: 4px;
          height: 36px;
          background: linear-gradient(
            to bottom,
            rgba(0, 240, 255, 0.22) 0%,
            rgba(0, 240, 255, 0.04) 60%,
            transparent 100%);
        }
        @keyframes tabScan {
          0% {
            opacity: 0;
            top: -8px;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            top: calc(100% + 8px);
          }
        }
        /* Tab button itself gets a subtle pulse when becoming active. */
        .storage-tab.active {
          animation: tabActiveIn 0.24s ease-out;
        }
        @keyframes tabActiveIn {
          0%   { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.0); }
          50%  { box-shadow: 0 0 0 4px rgba(0, 240, 255, 0.35); }
          100% { box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.0); }
        }
        /* Table — visual layering inspired by HoloMatrix's vm-table.
           Goal: each column carries its own colour signal so the eye can
           scan by category instead of reading every line. */
        .storage-content-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-mono);
          font-size: 13px;
          position: relative;
        }
        /* Sci-fi sort animation — same pattern as the matrix table:
           rows fade-up + slight blur with stagger, while a glowing
           cyan scan-bar travels down the table edge. Triggered by
           .sort-animating on the rows. */
        .storage-content-table tbody tr.sort-animating {
          animation: sortRowReveal 360ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        .storage-content-table tbody tr.sort-animating:nth-child(1)  { animation-delay:   0ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(2)  { animation-delay:  18ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(3)  { animation-delay:  36ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(4)  { animation-delay:  54ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(5)  { animation-delay:  72ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(6)  { animation-delay:  90ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(7)  { animation-delay: 108ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(8)  { animation-delay: 126ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(9)  { animation-delay: 144ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(10) { animation-delay: 162ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+11) { animation-delay: 180ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+16) { animation-delay: 200ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+22) { animation-delay: 220ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+30) { animation-delay: 240ms; }
        .storage-content-table tbody tr.sort-animating:nth-child(n+40) { animation-delay: 260ms; }
        @keyframes sortRowReveal {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(2px); }
          50%  { filter: blur(0); }
          100% { opacity: 1; transform: none; filter: none; }
        }
        /* Glow scan-bar that travels down during sort. */
        .storage-content-table::before {
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
        .storage-content-table:has(tr.sort-animating)::before {
          animation: sortScanBar 480ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        @keyframes sortScanBar {
          0%   { opacity: 0; top: 0; }
          12%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0; top: 100%; }
        }
        .storage-content-table thead {
          position: sticky;
          top: 0;
          z-index: 10;
          background: var(--bg-secondary);
        }
        .storage-content-table th {
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
          transition: color var(--transition-fast), background var(--transition-fast);
        }
        /* Sortable header — same exact behaviour as the matrix table:
           plain color transition only (no background tint, no glow). */
        .storage-content-table th.sortable {
          cursor: pointer;
          user-select: none;
        }
        .storage-content-table th.sortable:hover {
          color: var(--primary);
        }
        .storage-content-table th.sorted {
          color: var(--primary);
        }
        .storage-content-table th span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .storage-content-table .sort-indicator {
          font-size: 11px;
          opacity: 0.85;
        }
        .storage-content-table th.num,
        .storage-content-table td.num {
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        /* For numeric (right-aligned) sortable headers, the inline-flex
           span shouldn't push contents to the left. */
        .storage-content-table th.num span {
          justify-content: flex-end;
          width: 100%;
        }
        /* Width 1% + nowrap = shrink-to-fit, so the column adapts when
           the buttons show text labels vs icon-only. */
        .storage-content-table th.actions,
        .storage-content-table td.actions {
          text-align: center;
          width: 1%;
          white-space: nowrap;
        }
        .storage-content-table td.actions {
          padding-left: 4px;
          padding-right: 8px;
        }
        .storage-content-table td.actions .action-btn-row + .action-btn-row {
          margin-left: 4px;
        }
        .storage-content-table td {
          padding: var(--spacing-xs) var(--spacing-md);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
          vertical-align: middle;
        }
        /* Subtle zebra. Without this every row reads the same — even a
           4% delta is enough for the eye to pick up bands. */
        .storage-content-table tbody tr:nth-child(odd) {
          background: rgba(0, 240, 255, 0.025);
        }
        .storage-content-table tbody tr:hover {
          background: var(--bg-hover);
        }

        /* File name column — primary brightness, with a leading icon
           that's tinted by file type. */
        .name-cell {
          max-width: 600px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .file-icon {
          flex: 0 0 16px;
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
        }
        .file-name {
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Date — secondary tone, smaller weight. */
        .date-cell {
          color: var(--text-secondary);
          font-size: 12px;
        }

        /* Format badge — type-coded pill. Same shape as type-badge in
           the matrix table; colours chosen so each format is instantly
           distinguishable at a glance. */
        .format-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .format-badge.fmt-iso {
          background: rgba(0, 180, 255, 0.15);
          border: 1px solid rgba(0, 180, 255, 0.4);
          color: #00b4ff;
        }
        .format-badge.fmt-backup {
          background: rgba(255, 165, 0, 0.15);
          border: 1px solid rgba(255, 165, 0, 0.45);
          color: #ffa500;
        }
        .format-badge.fmt-tmpl {
          background: rgba(180, 100, 255, 0.15);
          border: 1px solid rgba(180, 100, 255, 0.4);
          color: #b464ff;
        }
        .format-badge.fmt-disk {
          background: rgba(0, 240, 200, 0.12);
          border: 1px solid rgba(0, 240, 200, 0.4);
          color: #00f0c8;
        }
        .format-badge.fmt-snippet {
          background: rgba(160, 200, 100, 0.12);
          border: 1px solid rgba(160, 200, 100, 0.4);
          color: #a0c864;
        }
        .format-badge.fmt-import {
          background: rgba(255, 100, 180, 0.12);
          border: 1px solid rgba(255, 100, 180, 0.4);
          color: #ff64b4;
        }
        .format-badge.fmt-other {
          background: rgba(180, 180, 180, 0.08);
          border: 1px solid rgba(180, 180, 180, 0.3);
          color: var(--text-secondary);
        }

        /* Size — tinted by magnitude. Multi-GB stands out so the
           operator can spot fat files without reading every digit. */
        .num.size-tiny    { color: var(--text-muted); }
        .num.size-small   { color: var(--text-primary); }
        .num.size-medium  { color: var(--primary); }
        .num.size-large   { color: #ffa500; }
        .num.size-huge    { color: #ff6464; text-shadow: 0 0 4px rgba(255,100,100,0.3); }

        /* VMID badge in the backup tab — same shape as matrix VMID. */
        .vmid-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 3px;
          background: rgba(0, 240, 255, 0.10);
          border: 1px solid rgba(0, 240, 255, 0.35);
          color: var(--primary);
        }

        .notes-cell {
          max-width: 280px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-secondary);
          font-style: italic;
        }
        .muted {
          color: var(--text-muted);
          opacity: 0.6;
        }

        /* Icon + text label when the viewport is wide enough; collapses
           to icon-only via the media query below. */
        .action-btn-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          height: 26px;
          padding: 0 10px;
          background: transparent;
          border: 1px solid rgba(0, 240, 255, 0.22);
          border-radius: 3px;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-decoration: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .action-btn-row:hover {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0, 240, 255, 0.08);
        }
        .action-btn-row svg { flex-shrink: 0; }
        @media (max-width: 1100px) {
          .action-btn-row .act-lbl { display: none; }
          .action-btn-row { width: 26px; padding: 0; }
        }
        .action-btn-row.danger:hover {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          background: rgba(255,77,109,0.08);
        }
        .storage-detail-loading,
        .storage-detail-error,
        .storage-detail-empty {
          padding: 32px;
          text-align: center;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .storage-detail-error {
          color: var(--danger, #ff4d6d);
        }

        /* From-URL download modal — minimal cyber styling consistent
           with the rest of the modals. */
        .url-dl-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 600;
          display: flex; align-items: center; justify-content: center;
          padding: 32px;
          animation: tpFade .15s ease;
        }
        @keyframes urlDlFade { from { opacity: 0 } to { opacity: 1 } }
        .url-dl-frame {
          width: 100%; max-width: 560px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0,240,255,0.35);
          border-radius: 8px;
          box-shadow:
            0 16px 60px rgba(0,0,0,0.65),
            0 0 60px -10px rgba(0,240,255,0.4);
          display: flex; flex-direction: column;
          animation: urlDlFade .15s ease-out;
          overflow: hidden;
        }
        .url-dl-titlebar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .url-dl-close {
          background: transparent; border: none;
          color: var(--text-secondary);
          font-size: 20px; cursor: pointer;
          line-height: 1;
        }
        .url-dl-close:hover { color: var(--primary); }
        .url-dl-body {
          padding: 16px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .url-dl-lead {
          margin: 0 0 8px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.5;
        }
        .url-dl-body label {
          display: block;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin: 6px 0 2px;
        }
        .url-dl-body input[type="text"],
        .url-dl-body select {
          width: 100%;
          padding: 8px 10px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .url-dl-body input[type="text"]:focus,
        .url-dl-body select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(0,240,255,0.15);
        }
        .url-dl-row {
          display: flex; gap: 8px;
        }
        .url-dl-row .url-dl-algo { flex: 0 0 140px; }
        .url-dl-row input[type="text"] { flex: 1; }
        .url-dl-check {
          display: inline-flex !important;
          align-items: center;
          gap: 8px;
          margin-top: 10px !important;
          font-size: 13px !important;
          letter-spacing: 0 !important;
          text-transform: none !important;
          color: var(--text-primary) !important;
          font-family: var(--font-body) !important;
          cursor: pointer;
        }
        .url-dl-err {
          margin-top: 8px;
          padding: 8px 10px;
          background: rgba(255,80,80,0.08);
          border-left: 3px solid var(--danger, #ff4d6d);
          color: var(--danger, #ff4d6d);
          font-size: 13px;
          font-family: var(--font-mono);
        }
        .url-dl-actions {
          display: flex; justify-content: flex-end;
          gap: 8px;
          padding: 12px 16px;
          background: var(--bg-tertiary);
          border-top: 1px solid var(--border);
        }
        .url-dl-actions .action-btn.primary {
          background: rgba(0,240,255,0.15);
          color: var(--primary);
          border-color: var(--primary);
        }
        .url-dl-actions .action-btn.primary:hover {
          background: rgba(0,240,255,0.25);
          box-shadow: 0 0 12px rgba(0,240,255,0.4);
        }
      `})]})}function Bt(t){const e=t.indexOf("/");if(e>=0)return t.slice(e+1);const n=t.indexOf(":");return n>=0?t.slice(n+1):t}function Do(t){switch(t){case"backup":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2.2"})]});case"iso":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]});case"vztmpl":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]});case"snippets":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]});case"import":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]});case"images":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]});case"rootdir":return r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"})})}}function ve(t,e){return e==="zh-TW"?{backup:"備份",iso:"ISO 映像",vztmpl:"CT 範本",snippets:"程式碼片段",import:"匯入",images:"磁碟映像",rootdir:"CT 根目錄"}[t]:{backup:"Backups",iso:"ISO Images",vztmpl:"CT Templates",snippets:"Snippets",import:"Import",images:"Disk Images",rootdir:"CT Root"}[t]}function En(t){if(!t)return"fmt-other";const e=t.toLowerCase();return e==="iso"||e==="img"?"fmt-iso":e.startsWith("vma")||e==="pbs-vm"||e==="pbs-ct"?"fmt-backup":e.startsWith("tar")?"fmt-tmpl":e==="qcow2"||e==="raw"||e==="vmdk"||e==="subvol"?"fmt-disk":e==="snippet"||e==="yaml"||e==="yml"||e==="sh"?"fmt-snippet":e==="ovf"||e==="ova"||e==="vmx"?"fmt-import":"fmt-other"}function Lo(t){if(!t)return"tiny";const e=t/(1024*1024);return e<50?"tiny":e<1024?"small":e<5120?"medium":e<20480?"large":"huge"}function qo(t,e){const n=En(t),a=n==="fmt-iso"?"#00b4ff":n==="fmt-backup"?"#ffa500":n==="fmt-tmpl"?"#b464ff":n==="fmt-disk"?"#00f0c8":n==="fmt-snippet"?"#a0c864":n==="fmt-import"?"#ff64b4":"var(--text-muted)";return n==="fmt-iso"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):n==="fmt-backup"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"})]}):n==="fmt-tmpl"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]}):n==="fmt-disk"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]}):n==="fmt-snippet"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]}):n==="fmt-import"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"var(--text-muted)",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]})}function Uo(t,e){const n=new Date(t*1e3),a=i=>String(i).padStart(2,"0");return`${n.getFullYear()}-${a(n.getMonth()+1)}-${a(n.getDate())} ${a(n.getHours())}:${a(n.getMinutes())}`}function on(){if(typeof window>"u")return null;const t=window.location.pathname.split("/").filter(Boolean);return t.length<4||t[0]!=="storage"?null:{clusterId:decodeURIComponent(t[1]),node:decodeURIComponent(t[2]),storage:decodeURIComponent(t[3])}}function Ho({cluster:t,clusters:e}){const[n,a]=y.useState(()=>on());if(y.useEffect(()=>{const i=()=>a(on());return window.addEventListener("popstate",i),()=>window.removeEventListener("popstate",i)},[]),n){const i=e||(t?{[t.id]:t}:null);return r.jsx(Io,{clusterId:n.clusterId,node:n.node,storageName:n.storage,clusters:i})}return r.jsx(Ro,{cluster:t,clusters:e})}export{Ho as Storage};
