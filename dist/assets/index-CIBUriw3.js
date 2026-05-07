(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function cf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var yu={exports:{}},xo={},bu={exports:{}},je={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ya=Symbol.for("react.element"),df=Symbol.for("react.portal"),uf=Symbol.for("react.fragment"),pf=Symbol.for("react.strict_mode"),mf=Symbol.for("react.profiler"),ff=Symbol.for("react.provider"),gf=Symbol.for("react.context"),hf=Symbol.for("react.forward_ref"),xf=Symbol.for("react.suspense"),vf=Symbol.for("react.memo"),yf=Symbol.for("react.lazy"),Pc=Symbol.iterator;function bf(e){return e===null||typeof e!="object"?null:(e=Pc&&e[Pc]||e["@@iterator"],typeof e=="function"?e:null)}var wu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ku=Object.assign,ju={};function Kr(e,t,n){this.props=e,this.context=t,this.refs=ju,this.updater=n||wu}Kr.prototype.isReactComponent={};Kr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Kr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function _u(){}_u.prototype=Kr.prototype;function wl(e,t,n){this.props=e,this.context=t,this.refs=ju,this.updater=n||wu}var kl=wl.prototype=new _u;kl.constructor=wl;ku(kl,Kr.prototype);kl.isPureReactComponent=!0;var Tc=Array.isArray,Nu=Object.prototype.hasOwnProperty,jl={current:null},Su={key:!0,ref:!0,__self:!0,__source:!0};function Cu(e,t,n){var a,s={},o=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Nu.call(t,a)&&!Su.hasOwnProperty(a)&&(s[a]=t[a]);var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){for(var l=Array(c),d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}if(e&&e.defaultProps)for(a in c=e.defaultProps,c)s[a]===void 0&&(s[a]=c[a]);return{$$typeof:Ya,type:e,key:o,ref:i,props:s,_owner:jl.current}}function wf(e,t){return{$$typeof:Ya,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function _l(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ya}function kf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Rc=/\/+/g;function Fo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?kf(""+e.key):t.toString(36)}function js(e,t,n,a,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Ya:case df:i=!0}}if(i)return i=e,s=s(i),e=a===""?"."+Fo(i,0):a,Tc(s)?(n="",e!=null&&(n=e.replace(Rc,"$&/")+"/"),js(s,t,n,"",function(d){return d})):s!=null&&(_l(s)&&(s=wf(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(Rc,"$&/")+"/")+e)),t.push(s)),1;if(i=0,a=a===""?".":a+":",Tc(e))for(var c=0;c<e.length;c++){o=e[c];var l=a+Fo(o,c);i+=js(o,t,n,l,s)}else if(l=bf(e),typeof l=="function")for(e=l.call(e),c=0;!(o=e.next()).done;)o=o.value,l=a+Fo(o,c++),i+=js(o,t,n,l,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Ja(e,t,n){if(e==null)return e;var a=[],s=0;return js(e,a,"","",function(o){return t.call(n,o,s++)}),a}function jf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Nt={current:null},_s={transition:null},_f={ReactCurrentDispatcher:Nt,ReactCurrentBatchConfig:_s,ReactCurrentOwner:jl};function Mu(){throw Error("act(...) is not supported in production builds of React.")}je.Children={map:Ja,forEach:function(e,t,n){Ja(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ja(e,function(){t++}),t},toArray:function(e){return Ja(e,function(t){return t})||[]},only:function(e){if(!_l(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};je.Component=Kr;je.Fragment=uf;je.Profiler=mf;je.PureComponent=wl;je.StrictMode=pf;je.Suspense=xf;je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_f;je.act=Mu;je.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=ku({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=jl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)Nu.call(t,l)&&!Su.hasOwnProperty(l)&&(a[l]=t[l]===void 0&&c!==void 0?c[l]:t[l])}var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){c=Array(l);for(var d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}return{$$typeof:Ya,type:e.type,key:s,ref:o,props:a,_owner:i}};je.createContext=function(e){return e={$$typeof:gf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ff,_context:e},e.Consumer=e};je.createElement=Cu;je.createFactory=function(e){var t=Cu.bind(null,e);return t.type=e,t};je.createRef=function(){return{current:null}};je.forwardRef=function(e){return{$$typeof:hf,render:e}};je.isValidElement=_l;je.lazy=function(e){return{$$typeof:yf,_payload:{_status:-1,_result:e},_init:jf}};je.memo=function(e,t){return{$$typeof:vf,type:e,compare:t===void 0?null:t}};je.startTransition=function(e){var t=_s.transition;_s.transition={};try{e()}finally{_s.transition=t}};je.unstable_act=Mu;je.useCallback=function(e,t){return Nt.current.useCallback(e,t)};je.useContext=function(e){return Nt.current.useContext(e)};je.useDebugValue=function(){};je.useDeferredValue=function(e){return Nt.current.useDeferredValue(e)};je.useEffect=function(e,t){return Nt.current.useEffect(e,t)};je.useId=function(){return Nt.current.useId()};je.useImperativeHandle=function(e,t,n){return Nt.current.useImperativeHandle(e,t,n)};je.useInsertionEffect=function(e,t){return Nt.current.useInsertionEffect(e,t)};je.useLayoutEffect=function(e,t){return Nt.current.useLayoutEffect(e,t)};je.useMemo=function(e,t){return Nt.current.useMemo(e,t)};je.useReducer=function(e,t,n){return Nt.current.useReducer(e,t,n)};je.useRef=function(e){return Nt.current.useRef(e)};je.useState=function(e){return Nt.current.useState(e)};je.useSyncExternalStore=function(e,t,n){return Nt.current.useSyncExternalStore(e,t,n)};je.useTransition=function(){return Nt.current.useTransition()};je.version="18.3.1";bu.exports=je;var m=bu.exports;const vo=cf(m);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nf=m,Sf=Symbol.for("react.element"),Cf=Symbol.for("react.fragment"),Mf=Object.prototype.hasOwnProperty,Ef=Nf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,zf={key:!0,ref:!0,__self:!0,__source:!0};function Eu(e,t,n){var a,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)Mf.call(t,a)&&!zf.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:Sf,type:e,key:o,ref:i,props:s,_owner:Ef.current}}xo.Fragment=Cf;xo.jsx=Eu;xo.jsxs=Eu;yu.exports=xo;var r=yu.exports,bi={},zu={exports:{}},Dt={},$u={exports:{}},Pu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(L,D){var Y=L.length;L.push(D);e:for(;0<Y;){var K=Y-1>>>1,b=L[K];if(0<s(b,D))L[K]=D,L[Y]=b,Y=K;else break e}}function n(L){return L.length===0?null:L[0]}function a(L){if(L.length===0)return null;var D=L[0],Y=L.pop();if(Y!==D){L[0]=Y;e:for(var K=0,b=L.length,V=b>>>1;K<V;){var J=2*(K+1)-1,ae=L[J],le=J+1,ue=L[le];if(0>s(ae,Y))le<b&&0>s(ue,ae)?(L[K]=ue,L[le]=Y,K=le):(L[K]=ae,L[J]=Y,K=J);else if(le<b&&0>s(ue,Y))L[K]=ue,L[le]=Y,K=le;else break e}}return D}function s(L,D){var Y=L.sortIndex-D.sortIndex;return Y!==0?Y:L.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,c=i.now();e.unstable_now=function(){return i.now()-c}}var l=[],d=[],p=1,f=null,u=3,x=!1,y=!1,j=!1,N=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(L){for(var D=n(d);D!==null;){if(D.callback===null)a(d);else if(D.startTime<=L)a(d),D.sortIndex=D.expirationTime,t(l,D);else break;D=n(d)}}function _(L){if(j=!1,g(L),!y)if(n(l)!==null)y=!0,X(S);else{var D=n(d);D!==null&&T(_,D.startTime-L)}}function S(L,D){y=!1,j&&(j=!1,v(R),R=-1),x=!0;var Y=u;try{for(g(D),f=n(l);f!==null&&(!(f.expirationTime>D)||L&&!$());){var K=f.callback;if(typeof K=="function"){f.callback=null,u=f.priorityLevel;var b=K(f.expirationTime<=D);D=e.unstable_now(),typeof b=="function"?f.callback=b:f===n(l)&&a(l),g(D)}else a(l);f=n(l)}if(f!==null)var V=!0;else{var J=n(d);J!==null&&T(_,J.startTime-D),V=!1}return V}finally{f=null,u=Y,x=!1}}var P=!1,E=null,R=-1,M=5,w=-1;function $(){return!(e.unstable_now()-w<M)}function I(){if(E!==null){var L=e.unstable_now();w=L;var D=!0;try{D=E(!0,L)}finally{D?W():(P=!1,E=null)}}else P=!1}var W;if(typeof h=="function")W=function(){h(I)};else if(typeof MessageChannel<"u"){var C=new MessageChannel,F=C.port2;C.port1.onmessage=I,W=function(){F.postMessage(null)}}else W=function(){N(I,0)};function X(L){E=L,P||(P=!0,W())}function T(L,D){R=N(function(){L(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(L){L.callback=null},e.unstable_continueExecution=function(){y||x||(y=!0,X(S))},e.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<L?Math.floor(1e3/L):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(L){switch(u){case 1:case 2:case 3:var D=3;break;default:D=u}var Y=u;u=D;try{return L()}finally{u=Y}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(L,D){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var Y=u;u=L;try{return D()}finally{u=Y}},e.unstable_scheduleCallback=function(L,D,Y){var K=e.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?K+Y:K):Y=K,L){case 1:var b=-1;break;case 2:b=250;break;case 5:b=1073741823;break;case 4:b=1e4;break;default:b=5e3}return b=Y+b,L={id:p++,callback:D,priorityLevel:L,startTime:Y,expirationTime:b,sortIndex:-1},Y>K?(L.sortIndex=Y,t(d,L),n(l)===null&&L===n(d)&&(j?(v(R),R=-1):j=!0,T(_,Y-K))):(L.sortIndex=b,t(l,L),y||x||(y=!0,X(S))),L},e.unstable_shouldYield=$,e.unstable_wrapCallback=function(L){var D=u;return function(){var Y=u;u=D;try{return L.apply(this,arguments)}finally{u=Y}}}})(Pu);$u.exports=Pu;var $f=$u.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pf=m,Ft=$f;function G(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Tu=new Set,Na={};function vr(e,t){Dr(e,t),Dr(e+"Capture",t)}function Dr(e,t){for(Na[e]=t,e=0;e<t.length;e++)Tu.add(t[e])}var Cn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wi=Object.prototype.hasOwnProperty,Tf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ic={},Lc={};function Rf(e){return wi.call(Lc,e)?!0:wi.call(Ic,e)?!1:Tf.test(e)?Lc[e]=!0:(Ic[e]=!0,!1)}function If(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Lf(e,t,n,a){if(t===null||typeof t>"u"||If(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function St(e,t,n,a,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){xt[e]=new St(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];xt[t]=new St(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){xt[e]=new St(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){xt[e]=new St(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){xt[e]=new St(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){xt[e]=new St(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){xt[e]=new St(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){xt[e]=new St(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){xt[e]=new St(e,5,!1,e.toLowerCase(),null,!1,!1)});var Nl=/[\-:]([a-z])/g;function Sl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Nl,Sl);xt[t]=new St(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Nl,Sl);xt[t]=new St(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Nl,Sl);xt[t]=new St(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){xt[e]=new St(e,1,!1,e.toLowerCase(),null,!1,!1)});xt.xlinkHref=new St("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){xt[e]=new St(e,1,!1,e.toLowerCase(),null,!0,!0)});function Cl(e,t,n,a){var s=xt.hasOwnProperty(t)?xt[t]:null;(s!==null?s.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Lf(t,n,s,a)&&(n=null),a||s===null?Rf(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,a=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var Pn=Pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,es=Symbol.for("react.element"),wr=Symbol.for("react.portal"),kr=Symbol.for("react.fragment"),Ml=Symbol.for("react.strict_mode"),ki=Symbol.for("react.profiler"),Ru=Symbol.for("react.provider"),Iu=Symbol.for("react.context"),El=Symbol.for("react.forward_ref"),ji=Symbol.for("react.suspense"),_i=Symbol.for("react.suspense_list"),zl=Symbol.for("react.memo"),Ln=Symbol.for("react.lazy"),Lu=Symbol.for("react.offscreen"),Ac=Symbol.iterator;function Zr(e){return e===null||typeof e!="object"?null:(e=Ac&&e[Ac]||e["@@iterator"],typeof e=="function"?e:null)}var qe=Object.assign,Do;function ca(e){if(Do===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Do=t&&t[1]||""}return`
`+Do+e}var Bo=!1;function Wo(e,t){if(!e||Bo)return"";Bo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=a.stack.split(`
`),i=s.length-1,c=o.length-1;1<=i&&0<=c&&s[i]!==o[c];)c--;for(;1<=i&&0<=c;i--,c--)if(s[i]!==o[c]){if(i!==1||c!==1)do if(i--,c--,0>c||s[i]!==o[c]){var l=`
`+s[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=c);break}}}finally{Bo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?ca(e):""}function Af(e){switch(e.tag){case 5:return ca(e.type);case 16:return ca("Lazy");case 13:return ca("Suspense");case 19:return ca("SuspenseList");case 0:case 2:case 15:return e=Wo(e.type,!1),e;case 11:return e=Wo(e.type.render,!1),e;case 1:return e=Wo(e.type,!0),e;default:return""}}function Ni(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case kr:return"Fragment";case wr:return"Portal";case ki:return"Profiler";case Ml:return"StrictMode";case ji:return"Suspense";case _i:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Iu:return(e.displayName||"Context")+".Consumer";case Ru:return(e._context.displayName||"Context")+".Provider";case El:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case zl:return t=e.displayName||null,t!==null?t:Ni(e.type)||"Memo";case Ln:t=e._payload,e=e._init;try{return Ni(e(t))}catch{}}return null}function Of(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ni(t);case 8:return t===Ml?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Qn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Au(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ff(e){var t=Au(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){a=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ts(e){e._valueTracker||(e._valueTracker=Ff(e))}function Ou(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Au(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function Os(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Si(e,t){var n=t.checked;return qe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Oc(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=Qn(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Fu(e,t){t=t.checked,t!=null&&Cl(e,"checked",t,!1)}function Ci(e,t){Fu(e,t);var n=Qn(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Mi(e,t.type,n):t.hasOwnProperty("defaultValue")&&Mi(e,t.type,Qn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Fc(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Mi(e,t,n){(t!=="number"||Os(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var da=Array.isArray;function Tr(e,t,n,a){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&a&&(e[n].defaultSelected=!0)}else{for(n=""+Qn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,a&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Ei(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(G(91));return qe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Dc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(G(92));if(da(n)){if(1<n.length)throw Error(G(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Qn(n)}}function Du(e,t){var n=Qn(t.value),a=Qn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function Bc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Bu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function zi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Bu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ns,Wu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ns=ns||document.createElement("div"),ns.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ns.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Sa(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ha={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Df=["Webkit","ms","Moz","O"];Object.keys(ha).forEach(function(e){Df.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ha[t]=ha[e]})});function Vu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ha.hasOwnProperty(e)&&ha[e]?(""+t).trim():t+"px"}function Uu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,s=Vu(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,s):e[n]=s}}var Bf=qe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function $i(e,t){if(t){if(Bf[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(G(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(G(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(G(61))}if(t.style!=null&&typeof t.style!="object")throw Error(G(62))}}function Pi(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ti=null;function $l(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ri=null,Rr=null,Ir=null;function Wc(e){if(e=Ka(e)){if(typeof Ri!="function")throw Error(G(280));var t=e.stateNode;t&&(t=jo(t),Ri(e.stateNode,e.type,t))}}function Hu(e){Rr?Ir?Ir.push(e):Ir=[e]:Rr=e}function Yu(){if(Rr){var e=Rr,t=Ir;if(Ir=Rr=null,Wc(e),t)for(e=0;e<t.length;e++)Wc(t[e])}}function Gu(e,t){return e(t)}function Xu(){}var Vo=!1;function Ku(e,t,n){if(Vo)return e(t,n);Vo=!0;try{return Gu(e,t,n)}finally{Vo=!1,(Rr!==null||Ir!==null)&&(Xu(),Yu())}}function Ca(e,t){var n=e.stateNode;if(n===null)return null;var a=jo(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(G(231,t,typeof n));return n}var Ii=!1;if(Cn)try{var Jr={};Object.defineProperty(Jr,"passive",{get:function(){Ii=!0}}),window.addEventListener("test",Jr,Jr),window.removeEventListener("test",Jr,Jr)}catch{Ii=!1}function Wf(e,t,n,a,s,o,i,c,l){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(p){this.onError(p)}}var xa=!1,Fs=null,Ds=!1,Li=null,Vf={onError:function(e){xa=!0,Fs=e}};function Uf(e,t,n,a,s,o,i,c,l){xa=!1,Fs=null,Wf.apply(Vf,arguments)}function Hf(e,t,n,a,s,o,i,c,l){if(Uf.apply(this,arguments),xa){if(xa){var d=Fs;xa=!1,Fs=null}else throw Error(G(198));Ds||(Ds=!0,Li=d)}}function yr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function qu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Vc(e){if(yr(e)!==e)throw Error(G(188))}function Yf(e){var t=e.alternate;if(!t){if(t=yr(e),t===null)throw Error(G(188));return t!==e?null:e}for(var n=e,a=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(a=s.return,a!==null){n=a;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return Vc(s),e;if(o===a)return Vc(s),t;o=o.sibling}throw Error(G(188))}if(n.return!==a.return)n=s,a=o;else{for(var i=!1,c=s.child;c;){if(c===n){i=!0,n=s,a=o;break}if(c===a){i=!0,a=s,n=o;break}c=c.sibling}if(!i){for(c=o.child;c;){if(c===n){i=!0,n=o,a=s;break}if(c===a){i=!0,a=o,n=s;break}c=c.sibling}if(!i)throw Error(G(189))}}if(n.alternate!==a)throw Error(G(190))}if(n.tag!==3)throw Error(G(188));return n.stateNode.current===n?e:t}function Qu(e){return e=Yf(e),e!==null?Zu(e):null}function Zu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Zu(e);if(t!==null)return t;e=e.sibling}return null}var Ju=Ft.unstable_scheduleCallback,Uc=Ft.unstable_cancelCallback,Gf=Ft.unstable_shouldYield,Xf=Ft.unstable_requestPaint,nt=Ft.unstable_now,Kf=Ft.unstable_getCurrentPriorityLevel,Pl=Ft.unstable_ImmediatePriority,ep=Ft.unstable_UserBlockingPriority,Bs=Ft.unstable_NormalPriority,qf=Ft.unstable_LowPriority,tp=Ft.unstable_IdlePriority,yo=null,fn=null;function Qf(e){if(fn&&typeof fn.onCommitFiberRoot=="function")try{fn.onCommitFiberRoot(yo,e,void 0,(e.current.flags&128)===128)}catch{}}var an=Math.clz32?Math.clz32:e0,Zf=Math.log,Jf=Math.LN2;function e0(e){return e>>>=0,e===0?32:31-(Zf(e)/Jf|0)|0}var rs=64,as=4194304;function ua(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ws(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,s=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var c=i&~s;c!==0?a=ua(c):(o&=i,o!==0&&(a=ua(o)))}else i=n&~s,i!==0?a=ua(i):o!==0&&(a=ua(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&s)&&(s=a&-a,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-an(t),s=1<<n,a|=e[n],t&=~s;return a}function t0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function n0(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-an(o),c=1<<i,l=s[i];l===-1?(!(c&n)||c&a)&&(s[i]=t0(c,t)):l<=t&&(e.expiredLanes|=c),o&=~c}}function Ai(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function np(){var e=rs;return rs<<=1,!(rs&4194240)&&(rs=64),e}function Uo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ga(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-an(t),e[t]=n}function r0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-an(n),o=1<<s;t[s]=0,a[s]=-1,e[s]=-1,n&=~o}}function Tl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-an(n),s=1<<a;s&t|e[a]&t&&(e[a]|=t),n&=~s}}var Pe=0;function rp(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var ap,Rl,sp,op,ip,Oi=!1,ss=[],Vn=null,Un=null,Hn=null,Ma=new Map,Ea=new Map,Fn=[],a0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Hc(e,t){switch(e){case"focusin":case"focusout":Vn=null;break;case"dragenter":case"dragleave":Un=null;break;case"mouseover":case"mouseout":Hn=null;break;case"pointerover":case"pointerout":Ma.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ea.delete(t.pointerId)}}function ea(e,t,n,a,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[s]},t!==null&&(t=Ka(t),t!==null&&Rl(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function s0(e,t,n,a,s){switch(t){case"focusin":return Vn=ea(Vn,e,t,n,a,s),!0;case"dragenter":return Un=ea(Un,e,t,n,a,s),!0;case"mouseover":return Hn=ea(Hn,e,t,n,a,s),!0;case"pointerover":var o=s.pointerId;return Ma.set(o,ea(Ma.get(o)||null,e,t,n,a,s)),!0;case"gotpointercapture":return o=s.pointerId,Ea.set(o,ea(Ea.get(o)||null,e,t,n,a,s)),!0}return!1}function lp(e){var t=sr(e.target);if(t!==null){var n=yr(t);if(n!==null){if(t=n.tag,t===13){if(t=qu(n),t!==null){e.blockedOn=t,ip(e.priority,function(){sp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ns(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Fi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Ti=a,n.target.dispatchEvent(a),Ti=null}else return t=Ka(n),t!==null&&Rl(t),e.blockedOn=n,!1;t.shift()}return!0}function Yc(e,t,n){Ns(e)&&n.delete(t)}function o0(){Oi=!1,Vn!==null&&Ns(Vn)&&(Vn=null),Un!==null&&Ns(Un)&&(Un=null),Hn!==null&&Ns(Hn)&&(Hn=null),Ma.forEach(Yc),Ea.forEach(Yc)}function ta(e,t){e.blockedOn===t&&(e.blockedOn=null,Oi||(Oi=!0,Ft.unstable_scheduleCallback(Ft.unstable_NormalPriority,o0)))}function za(e){function t(s){return ta(s,e)}if(0<ss.length){ta(ss[0],e);for(var n=1;n<ss.length;n++){var a=ss[n];a.blockedOn===e&&(a.blockedOn=null)}}for(Vn!==null&&ta(Vn,e),Un!==null&&ta(Un,e),Hn!==null&&ta(Hn,e),Ma.forEach(t),Ea.forEach(t),n=0;n<Fn.length;n++)a=Fn[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<Fn.length&&(n=Fn[0],n.blockedOn===null);)lp(n),n.blockedOn===null&&Fn.shift()}var Lr=Pn.ReactCurrentBatchConfig,Vs=!0;function i0(e,t,n,a){var s=Pe,o=Lr.transition;Lr.transition=null;try{Pe=1,Il(e,t,n,a)}finally{Pe=s,Lr.transition=o}}function l0(e,t,n,a){var s=Pe,o=Lr.transition;Lr.transition=null;try{Pe=4,Il(e,t,n,a)}finally{Pe=s,Lr.transition=o}}function Il(e,t,n,a){if(Vs){var s=Fi(e,t,n,a);if(s===null)ei(e,t,a,Us,n),Hc(e,a);else if(s0(s,e,t,n,a))a.stopPropagation();else if(Hc(e,a),t&4&&-1<a0.indexOf(e)){for(;s!==null;){var o=Ka(s);if(o!==null&&ap(o),o=Fi(e,t,n,a),o===null&&ei(e,t,a,Us,n),o===s)break;s=o}s!==null&&a.stopPropagation()}else ei(e,t,a,null,n)}}var Us=null;function Fi(e,t,n,a){if(Us=null,e=$l(a),e=sr(e),e!==null)if(t=yr(e),t===null)e=null;else if(n=t.tag,n===13){if(e=qu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Us=e,null}function cp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Kf()){case Pl:return 1;case ep:return 4;case Bs:case qf:return 16;case tp:return 536870912;default:return 16}default:return 16}}var Bn=null,Ll=null,Ss=null;function dp(){if(Ss)return Ss;var e,t=Ll,n=t.length,a,s="value"in Bn?Bn.value:Bn.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(a=1;a<=i&&t[n-a]===s[o-a];a++);return Ss=s.slice(e,1<a?1-a:void 0)}function Cs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function os(){return!0}function Gc(){return!1}function Bt(e){function t(n,a,s,o,i){this._reactName=n,this._targetInst=s,this.type=a,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?os:Gc,this.isPropagationStopped=Gc,this}return qe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=os)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=os)},persist:function(){},isPersistent:os}),t}var qr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Al=Bt(qr),Xa=qe({},qr,{view:0,detail:0}),c0=Bt(Xa),Ho,Yo,na,bo=qe({},Xa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ol,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==na&&(na&&e.type==="mousemove"?(Ho=e.screenX-na.screenX,Yo=e.screenY-na.screenY):Yo=Ho=0,na=e),Ho)},movementY:function(e){return"movementY"in e?e.movementY:Yo}}),Xc=Bt(bo),d0=qe({},bo,{dataTransfer:0}),u0=Bt(d0),p0=qe({},Xa,{relatedTarget:0}),Go=Bt(p0),m0=qe({},qr,{animationName:0,elapsedTime:0,pseudoElement:0}),f0=Bt(m0),g0=qe({},qr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),h0=Bt(g0),x0=qe({},qr,{data:0}),Kc=Bt(x0),v0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},y0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},b0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function w0(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=b0[e])?!!t[e]:!1}function Ol(){return w0}var k0=qe({},Xa,{key:function(e){if(e.key){var t=v0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Cs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?y0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ol,charCode:function(e){return e.type==="keypress"?Cs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Cs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),j0=Bt(k0),_0=qe({},bo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qc=Bt(_0),N0=qe({},Xa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ol}),S0=Bt(N0),C0=qe({},qr,{propertyName:0,elapsedTime:0,pseudoElement:0}),M0=Bt(C0),E0=qe({},bo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),z0=Bt(E0),$0=[9,13,27,32],Fl=Cn&&"CompositionEvent"in window,va=null;Cn&&"documentMode"in document&&(va=document.documentMode);var P0=Cn&&"TextEvent"in window&&!va,up=Cn&&(!Fl||va&&8<va&&11>=va),Qc=" ",Zc=!1;function pp(e,t){switch(e){case"keyup":return $0.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var jr=!1;function T0(e,t){switch(e){case"compositionend":return mp(t);case"keypress":return t.which!==32?null:(Zc=!0,Qc);case"textInput":return e=t.data,e===Qc&&Zc?null:e;default:return null}}function R0(e,t){if(jr)return e==="compositionend"||!Fl&&pp(e,t)?(e=dp(),Ss=Ll=Bn=null,jr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return up&&t.locale!=="ko"?null:t.data;default:return null}}var I0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!I0[e.type]:t==="textarea"}function fp(e,t,n,a){Hu(a),t=Hs(t,"onChange"),0<t.length&&(n=new Al("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var ya=null,$a=null;function L0(e){Np(e,0)}function wo(e){var t=Sr(e);if(Ou(t))return e}function A0(e,t){if(e==="change")return t}var gp=!1;if(Cn){var Xo;if(Cn){var Ko="oninput"in document;if(!Ko){var ed=document.createElement("div");ed.setAttribute("oninput","return;"),Ko=typeof ed.oninput=="function"}Xo=Ko}else Xo=!1;gp=Xo&&(!document.documentMode||9<document.documentMode)}function td(){ya&&(ya.detachEvent("onpropertychange",hp),$a=ya=null)}function hp(e){if(e.propertyName==="value"&&wo($a)){var t=[];fp(t,$a,e,$l(e)),Ku(L0,t)}}function O0(e,t,n){e==="focusin"?(td(),ya=t,$a=n,ya.attachEvent("onpropertychange",hp)):e==="focusout"&&td()}function F0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return wo($a)}function D0(e,t){if(e==="click")return wo(t)}function B0(e,t){if(e==="input"||e==="change")return wo(t)}function W0(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var on=typeof Object.is=="function"?Object.is:W0;function Pa(e,t){if(on(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var s=n[a];if(!wi.call(t,s)||!on(e[s],t[s]))return!1}return!0}function nd(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function rd(e,t){var n=nd(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=nd(n)}}function xp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?xp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vp(){for(var e=window,t=Os();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Os(e.document)}return t}function Dl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function V0(e){var t=vp(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&xp(n.ownerDocument.documentElement,n)){if(a!==null&&Dl(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(a.start,s);a=a.end===void 0?o:Math.min(a.end,s),!e.extend&&o>a&&(s=a,a=o,o=s),s=rd(n,o);var i=rd(n,a);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var U0=Cn&&"documentMode"in document&&11>=document.documentMode,_r=null,Di=null,ba=null,Bi=!1;function ad(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Bi||_r==null||_r!==Os(a)||(a=_r,"selectionStart"in a&&Dl(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),ba&&Pa(ba,a)||(ba=a,a=Hs(Di,"onSelect"),0<a.length&&(t=new Al("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=_r)))}function is(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Nr={animationend:is("Animation","AnimationEnd"),animationiteration:is("Animation","AnimationIteration"),animationstart:is("Animation","AnimationStart"),transitionend:is("Transition","TransitionEnd")},qo={},yp={};Cn&&(yp=document.createElement("div").style,"AnimationEvent"in window||(delete Nr.animationend.animation,delete Nr.animationiteration.animation,delete Nr.animationstart.animation),"TransitionEvent"in window||delete Nr.transitionend.transition);function ko(e){if(qo[e])return qo[e];if(!Nr[e])return e;var t=Nr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in yp)return qo[e]=t[n];return e}var bp=ko("animationend"),wp=ko("animationiteration"),kp=ko("animationstart"),jp=ko("transitionend"),_p=new Map,sd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Jn(e,t){_p.set(e,t),vr(t,[e])}for(var Qo=0;Qo<sd.length;Qo++){var Zo=sd[Qo],H0=Zo.toLowerCase(),Y0=Zo[0].toUpperCase()+Zo.slice(1);Jn(H0,"on"+Y0)}Jn(bp,"onAnimationEnd");Jn(wp,"onAnimationIteration");Jn(kp,"onAnimationStart");Jn("dblclick","onDoubleClick");Jn("focusin","onFocus");Jn("focusout","onBlur");Jn(jp,"onTransitionEnd");Dr("onMouseEnter",["mouseout","mouseover"]);Dr("onMouseLeave",["mouseout","mouseover"]);Dr("onPointerEnter",["pointerout","pointerover"]);Dr("onPointerLeave",["pointerout","pointerover"]);vr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));vr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));vr("onBeforeInput",["compositionend","keypress","textInput","paste"]);vr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));vr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));vr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var pa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),G0=new Set("cancel close invalid load scroll toggle".split(" ").concat(pa));function od(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,Hf(a,t,void 0,e),e.currentTarget=null}function Np(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],s=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var i=a.length-1;0<=i;i--){var c=a[i],l=c.instance,d=c.currentTarget;if(c=c.listener,l!==o&&s.isPropagationStopped())break e;od(s,c,d),o=l}else for(i=0;i<a.length;i++){if(c=a[i],l=c.instance,d=c.currentTarget,c=c.listener,l!==o&&s.isPropagationStopped())break e;od(s,c,d),o=l}}}if(Ds)throw e=Li,Ds=!1,Li=null,e}function Ve(e,t){var n=t[Yi];n===void 0&&(n=t[Yi]=new Set);var a=e+"__bubble";n.has(a)||(Sp(t,e,2,!1),n.add(a))}function Jo(e,t,n){var a=0;t&&(a|=4),Sp(n,e,a,t)}var ls="_reactListening"+Math.random().toString(36).slice(2);function Ta(e){if(!e[ls]){e[ls]=!0,Tu.forEach(function(n){n!=="selectionchange"&&(G0.has(n)||Jo(n,!1,e),Jo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ls]||(t[ls]=!0,Jo("selectionchange",!1,t))}}function Sp(e,t,n,a){switch(cp(t)){case 1:var s=i0;break;case 4:s=l0;break;default:s=Il}n=s.bind(null,t,n,e),s=void 0,!Ii||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),a?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function ei(e,t,n,a,s){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var c=a.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(i===4)for(i=a.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;i=i.return}for(;c!==null;){if(i=sr(c),i===null)return;if(l=i.tag,l===5||l===6){a=o=i;continue e}c=c.parentNode}}a=a.return}Ku(function(){var d=o,p=$l(n),f=[];e:{var u=_p.get(e);if(u!==void 0){var x=Al,y=e;switch(e){case"keypress":if(Cs(n)===0)break e;case"keydown":case"keyup":x=j0;break;case"focusin":y="focus",x=Go;break;case"focusout":y="blur",x=Go;break;case"beforeblur":case"afterblur":x=Go;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=Xc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=u0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=S0;break;case bp:case wp:case kp:x=f0;break;case jp:x=M0;break;case"scroll":x=c0;break;case"wheel":x=z0;break;case"copy":case"cut":case"paste":x=h0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=qc}var j=(t&4)!==0,N=!j&&e==="scroll",v=j?u!==null?u+"Capture":null:u;j=[];for(var h=d,g;h!==null;){g=h;var _=g.stateNode;if(g.tag===5&&_!==null&&(g=_,v!==null&&(_=Ca(h,v),_!=null&&j.push(Ra(h,_,g)))),N)break;h=h.return}0<j.length&&(u=new x(u,y,null,n,p),f.push({event:u,listeners:j}))}}if(!(t&7)){e:{if(u=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",u&&n!==Ti&&(y=n.relatedTarget||n.fromElement)&&(sr(y)||y[Mn]))break e;if((x||u)&&(u=p.window===p?p:(u=p.ownerDocument)?u.defaultView||u.parentWindow:window,x?(y=n.relatedTarget||n.toElement,x=d,y=y?sr(y):null,y!==null&&(N=yr(y),y!==N||y.tag!==5&&y.tag!==6)&&(y=null)):(x=null,y=d),x!==y)){if(j=Xc,_="onMouseLeave",v="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(j=qc,_="onPointerLeave",v="onPointerEnter",h="pointer"),N=x==null?u:Sr(x),g=y==null?u:Sr(y),u=new j(_,h+"leave",x,n,p),u.target=N,u.relatedTarget=g,_=null,sr(p)===d&&(j=new j(v,h+"enter",y,n,p),j.target=g,j.relatedTarget=N,_=j),N=_,x&&y)t:{for(j=x,v=y,h=0,g=j;g;g=br(g))h++;for(g=0,_=v;_;_=br(_))g++;for(;0<h-g;)j=br(j),h--;for(;0<g-h;)v=br(v),g--;for(;h--;){if(j===v||v!==null&&j===v.alternate)break t;j=br(j),v=br(v)}j=null}else j=null;x!==null&&id(f,u,x,j,!1),y!==null&&N!==null&&id(f,N,y,j,!0)}}e:{if(u=d?Sr(d):window,x=u.nodeName&&u.nodeName.toLowerCase(),x==="select"||x==="input"&&u.type==="file")var S=A0;else if(Jc(u))if(gp)S=B0;else{S=F0;var P=O0}else(x=u.nodeName)&&x.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(S=D0);if(S&&(S=S(e,d))){fp(f,S,n,p);break e}P&&P(e,u,d),e==="focusout"&&(P=u._wrapperState)&&P.controlled&&u.type==="number"&&Mi(u,"number",u.value)}switch(P=d?Sr(d):window,e){case"focusin":(Jc(P)||P.contentEditable==="true")&&(_r=P,Di=d,ba=null);break;case"focusout":ba=Di=_r=null;break;case"mousedown":Bi=!0;break;case"contextmenu":case"mouseup":case"dragend":Bi=!1,ad(f,n,p);break;case"selectionchange":if(U0)break;case"keydown":case"keyup":ad(f,n,p)}var E;if(Fl)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else jr?pp(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(up&&n.locale!=="ko"&&(jr||R!=="onCompositionStart"?R==="onCompositionEnd"&&jr&&(E=dp()):(Bn=p,Ll="value"in Bn?Bn.value:Bn.textContent,jr=!0)),P=Hs(d,R),0<P.length&&(R=new Kc(R,e,null,n,p),f.push({event:R,listeners:P}),E?R.data=E:(E=mp(n),E!==null&&(R.data=E)))),(E=P0?T0(e,n):R0(e,n))&&(d=Hs(d,"onBeforeInput"),0<d.length&&(p=new Kc("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:d}),p.data=E))}Np(f,t)})}function Ra(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Hs(e,t){for(var n=t+"Capture",a=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=Ca(e,n),o!=null&&a.unshift(Ra(e,o,s)),o=Ca(e,t),o!=null&&a.push(Ra(e,o,s))),e=e.return}return a}function br(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function id(e,t,n,a,s){for(var o=t._reactName,i=[];n!==null&&n!==a;){var c=n,l=c.alternate,d=c.stateNode;if(l!==null&&l===a)break;c.tag===5&&d!==null&&(c=d,s?(l=Ca(n,o),l!=null&&i.unshift(Ra(n,l,c))):s||(l=Ca(n,o),l!=null&&i.push(Ra(n,l,c)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var X0=/\r\n?/g,K0=/\u0000|\uFFFD/g;function ld(e){return(typeof e=="string"?e:""+e).replace(X0,`
`).replace(K0,"")}function cs(e,t,n){if(t=ld(t),ld(e)!==t&&n)throw Error(G(425))}function Ys(){}var Wi=null,Vi=null;function Ui(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Hi=typeof setTimeout=="function"?setTimeout:void 0,q0=typeof clearTimeout=="function"?clearTimeout:void 0,cd=typeof Promise=="function"?Promise:void 0,Q0=typeof queueMicrotask=="function"?queueMicrotask:typeof cd<"u"?function(e){return cd.resolve(null).then(e).catch(Z0)}:Hi;function Z0(e){setTimeout(function(){throw e})}function ti(e,t){var n=t,a=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(a===0){e.removeChild(s),za(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=s}while(n);za(t)}function Yn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function dd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Qr=Math.random().toString(36).slice(2),mn="__reactFiber$"+Qr,Ia="__reactProps$"+Qr,Mn="__reactContainer$"+Qr,Yi="__reactEvents$"+Qr,J0="__reactListeners$"+Qr,eg="__reactHandles$"+Qr;function sr(e){var t=e[mn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Mn]||n[mn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=dd(e);e!==null;){if(n=e[mn])return n;e=dd(e)}return t}e=n,n=e.parentNode}return null}function Ka(e){return e=e[mn]||e[Mn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Sr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(G(33))}function jo(e){return e[Ia]||null}var Gi=[],Cr=-1;function er(e){return{current:e}}function Ue(e){0>Cr||(e.current=Gi[Cr],Gi[Cr]=null,Cr--)}function Oe(e,t){Cr++,Gi[Cr]=e.current,e.current=t}var Zn={},kt=er(Zn),$t=er(!1),pr=Zn;function Br(e,t){var n=e.type.contextTypes;if(!n)return Zn;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Pt(e){return e=e.childContextTypes,e!=null}function Gs(){Ue($t),Ue(kt)}function ud(e,t,n){if(kt.current!==Zn)throw Error(G(168));Oe(kt,t),Oe($t,n)}function Cp(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var s in a)if(!(s in t))throw Error(G(108,Of(e)||"Unknown",s));return qe({},n,a)}function Xs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Zn,pr=kt.current,Oe(kt,e),Oe($t,$t.current),!0}function pd(e,t,n){var a=e.stateNode;if(!a)throw Error(G(169));n?(e=Cp(e,t,pr),a.__reactInternalMemoizedMergedChildContext=e,Ue($t),Ue(kt),Oe(kt,e)):Ue($t),Oe($t,n)}var jn=null,_o=!1,ni=!1;function Mp(e){jn===null?jn=[e]:jn.push(e)}function tg(e){_o=!0,Mp(e)}function tr(){if(!ni&&jn!==null){ni=!0;var e=0,t=Pe;try{var n=jn;for(Pe=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}jn=null,_o=!1}catch(s){throw jn!==null&&(jn=jn.slice(e+1)),Ju(Pl,tr),s}finally{Pe=t,ni=!1}}return null}var Mr=[],Er=0,Ks=null,qs=0,Ut=[],Ht=0,mr=null,_n=1,Nn="";function rr(e,t){Mr[Er++]=qs,Mr[Er++]=Ks,Ks=e,qs=t}function Ep(e,t,n){Ut[Ht++]=_n,Ut[Ht++]=Nn,Ut[Ht++]=mr,mr=e;var a=_n;e=Nn;var s=32-an(a)-1;a&=~(1<<s),n+=1;var o=32-an(t)+s;if(30<o){var i=s-s%5;o=(a&(1<<i)-1).toString(32),a>>=i,s-=i,_n=1<<32-an(t)+s|n<<s|a,Nn=o+e}else _n=1<<o|n<<s|a,Nn=e}function Bl(e){e.return!==null&&(rr(e,1),Ep(e,1,0))}function Wl(e){for(;e===Ks;)Ks=Mr[--Er],Mr[Er]=null,qs=Mr[--Er],Mr[Er]=null;for(;e===mr;)mr=Ut[--Ht],Ut[Ht]=null,Nn=Ut[--Ht],Ut[Ht]=null,_n=Ut[--Ht],Ut[Ht]=null}var Ot=null,At=null,Ye=!1,tn=null;function zp(e,t){var n=Yt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function md(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ot=e,At=Yn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ot=e,At=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=mr!==null?{id:_n,overflow:Nn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Yt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ot=e,At=null,!0):!1;default:return!1}}function Xi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ki(e){if(Ye){var t=At;if(t){var n=t;if(!md(e,t)){if(Xi(e))throw Error(G(418));t=Yn(n.nextSibling);var a=Ot;t&&md(e,t)?zp(a,n):(e.flags=e.flags&-4097|2,Ye=!1,Ot=e)}}else{if(Xi(e))throw Error(G(418));e.flags=e.flags&-4097|2,Ye=!1,Ot=e}}}function fd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ot=e}function ds(e){if(e!==Ot)return!1;if(!Ye)return fd(e),Ye=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ui(e.type,e.memoizedProps)),t&&(t=At)){if(Xi(e))throw $p(),Error(G(418));for(;t;)zp(e,t),t=Yn(t.nextSibling)}if(fd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(G(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){At=Yn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}At=null}}else At=Ot?Yn(e.stateNode.nextSibling):null;return!0}function $p(){for(var e=At;e;)e=Yn(e.nextSibling)}function Wr(){At=Ot=null,Ye=!1}function Vl(e){tn===null?tn=[e]:tn.push(e)}var ng=Pn.ReactCurrentBatchConfig;function ra(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(G(309));var a=n.stateNode}if(!a)throw Error(G(147,e));var s=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var c=s.refs;i===null?delete c[o]:c[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(G(284));if(!n._owner)throw Error(G(290,e))}return e}function us(e,t){throw e=Object.prototype.toString.call(t),Error(G(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function gd(e){var t=e._init;return t(e._payload)}function Pp(e){function t(v,h){if(e){var g=v.deletions;g===null?(v.deletions=[h],v.flags|=16):g.push(h)}}function n(v,h){if(!e)return null;for(;h!==null;)t(v,h),h=h.sibling;return null}function a(v,h){for(v=new Map;h!==null;)h.key!==null?v.set(h.key,h):v.set(h.index,h),h=h.sibling;return v}function s(v,h){return v=qn(v,h),v.index=0,v.sibling=null,v}function o(v,h,g){return v.index=g,e?(g=v.alternate,g!==null?(g=g.index,g<h?(v.flags|=2,h):g):(v.flags|=2,h)):(v.flags|=1048576,h)}function i(v){return e&&v.alternate===null&&(v.flags|=2),v}function c(v,h,g,_){return h===null||h.tag!==6?(h=ci(g,v.mode,_),h.return=v,h):(h=s(h,g),h.return=v,h)}function l(v,h,g,_){var S=g.type;return S===kr?p(v,h,g.props.children,_,g.key):h!==null&&(h.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Ln&&gd(S)===h.type)?(_=s(h,g.props),_.ref=ra(v,h,g),_.return=v,_):(_=Rs(g.type,g.key,g.props,null,v.mode,_),_.ref=ra(v,h,g),_.return=v,_)}function d(v,h,g,_){return h===null||h.tag!==4||h.stateNode.containerInfo!==g.containerInfo||h.stateNode.implementation!==g.implementation?(h=di(g,v.mode,_),h.return=v,h):(h=s(h,g.children||[]),h.return=v,h)}function p(v,h,g,_,S){return h===null||h.tag!==7?(h=dr(g,v.mode,_,S),h.return=v,h):(h=s(h,g),h.return=v,h)}function f(v,h,g){if(typeof h=="string"&&h!==""||typeof h=="number")return h=ci(""+h,v.mode,g),h.return=v,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case es:return g=Rs(h.type,h.key,h.props,null,v.mode,g),g.ref=ra(v,null,h),g.return=v,g;case wr:return h=di(h,v.mode,g),h.return=v,h;case Ln:var _=h._init;return f(v,_(h._payload),g)}if(da(h)||Zr(h))return h=dr(h,v.mode,g,null),h.return=v,h;us(v,h)}return null}function u(v,h,g,_){var S=h!==null?h.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return S!==null?null:c(v,h,""+g,_);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case es:return g.key===S?l(v,h,g,_):null;case wr:return g.key===S?d(v,h,g,_):null;case Ln:return S=g._init,u(v,h,S(g._payload),_)}if(da(g)||Zr(g))return S!==null?null:p(v,h,g,_,null);us(v,g)}return null}function x(v,h,g,_,S){if(typeof _=="string"&&_!==""||typeof _=="number")return v=v.get(g)||null,c(h,v,""+_,S);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case es:return v=v.get(_.key===null?g:_.key)||null,l(h,v,_,S);case wr:return v=v.get(_.key===null?g:_.key)||null,d(h,v,_,S);case Ln:var P=_._init;return x(v,h,g,P(_._payload),S)}if(da(_)||Zr(_))return v=v.get(g)||null,p(h,v,_,S,null);us(h,_)}return null}function y(v,h,g,_){for(var S=null,P=null,E=h,R=h=0,M=null;E!==null&&R<g.length;R++){E.index>R?(M=E,E=null):M=E.sibling;var w=u(v,E,g[R],_);if(w===null){E===null&&(E=M);break}e&&E&&w.alternate===null&&t(v,E),h=o(w,h,R),P===null?S=w:P.sibling=w,P=w,E=M}if(R===g.length)return n(v,E),Ye&&rr(v,R),S;if(E===null){for(;R<g.length;R++)E=f(v,g[R],_),E!==null&&(h=o(E,h,R),P===null?S=E:P.sibling=E,P=E);return Ye&&rr(v,R),S}for(E=a(v,E);R<g.length;R++)M=x(E,v,R,g[R],_),M!==null&&(e&&M.alternate!==null&&E.delete(M.key===null?R:M.key),h=o(M,h,R),P===null?S=M:P.sibling=M,P=M);return e&&E.forEach(function($){return t(v,$)}),Ye&&rr(v,R),S}function j(v,h,g,_){var S=Zr(g);if(typeof S!="function")throw Error(G(150));if(g=S.call(g),g==null)throw Error(G(151));for(var P=S=null,E=h,R=h=0,M=null,w=g.next();E!==null&&!w.done;R++,w=g.next()){E.index>R?(M=E,E=null):M=E.sibling;var $=u(v,E,w.value,_);if($===null){E===null&&(E=M);break}e&&E&&$.alternate===null&&t(v,E),h=o($,h,R),P===null?S=$:P.sibling=$,P=$,E=M}if(w.done)return n(v,E),Ye&&rr(v,R),S;if(E===null){for(;!w.done;R++,w=g.next())w=f(v,w.value,_),w!==null&&(h=o(w,h,R),P===null?S=w:P.sibling=w,P=w);return Ye&&rr(v,R),S}for(E=a(v,E);!w.done;R++,w=g.next())w=x(E,v,R,w.value,_),w!==null&&(e&&w.alternate!==null&&E.delete(w.key===null?R:w.key),h=o(w,h,R),P===null?S=w:P.sibling=w,P=w);return e&&E.forEach(function(I){return t(v,I)}),Ye&&rr(v,R),S}function N(v,h,g,_){if(typeof g=="object"&&g!==null&&g.type===kr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case es:e:{for(var S=g.key,P=h;P!==null;){if(P.key===S){if(S=g.type,S===kr){if(P.tag===7){n(v,P.sibling),h=s(P,g.props.children),h.return=v,v=h;break e}}else if(P.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Ln&&gd(S)===P.type){n(v,P.sibling),h=s(P,g.props),h.ref=ra(v,P,g),h.return=v,v=h;break e}n(v,P);break}else t(v,P);P=P.sibling}g.type===kr?(h=dr(g.props.children,v.mode,_,g.key),h.return=v,v=h):(_=Rs(g.type,g.key,g.props,null,v.mode,_),_.ref=ra(v,h,g),_.return=v,v=_)}return i(v);case wr:e:{for(P=g.key;h!==null;){if(h.key===P)if(h.tag===4&&h.stateNode.containerInfo===g.containerInfo&&h.stateNode.implementation===g.implementation){n(v,h.sibling),h=s(h,g.children||[]),h.return=v,v=h;break e}else{n(v,h);break}else t(v,h);h=h.sibling}h=di(g,v.mode,_),h.return=v,v=h}return i(v);case Ln:return P=g._init,N(v,h,P(g._payload),_)}if(da(g))return y(v,h,g,_);if(Zr(g))return j(v,h,g,_);us(v,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,h!==null&&h.tag===6?(n(v,h.sibling),h=s(h,g),h.return=v,v=h):(n(v,h),h=ci(g,v.mode,_),h.return=v,v=h),i(v)):n(v,h)}return N}var Vr=Pp(!0),Tp=Pp(!1),Qs=er(null),Zs=null,zr=null,Ul=null;function Hl(){Ul=zr=Zs=null}function Yl(e){var t=Qs.current;Ue(Qs),e._currentValue=t}function qi(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Ar(e,t){Zs=e,Ul=zr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Et=!0),e.firstContext=null)}function Xt(e){var t=e._currentValue;if(Ul!==e)if(e={context:e,memoizedValue:t,next:null},zr===null){if(Zs===null)throw Error(G(308));zr=e,Zs.dependencies={lanes:0,firstContext:e}}else zr=zr.next=e;return t}var or=null;function Gl(e){or===null?or=[e]:or.push(e)}function Rp(e,t,n,a){var s=t.interleaved;return s===null?(n.next=n,Gl(t)):(n.next=s.next,s.next=n),t.interleaved=n,En(e,a)}function En(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var An=!1;function Xl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ip(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Sn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Gn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,Me&2){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,En(e,n)}return s=a.interleaved,s===null?(t.next=t,Gl(a)):(t.next=s.next,s.next=t),a.interleaved=t,En(e,n)}function Ms(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Tl(e,n)}}function hd(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Js(e,t,n,a){var s=e.updateQueue;An=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var l=c,d=l.next;l.next=null,i===null?o=d:i.next=d,i=l;var p=e.alternate;p!==null&&(p=p.updateQueue,c=p.lastBaseUpdate,c!==i&&(c===null?p.firstBaseUpdate=d:c.next=d,p.lastBaseUpdate=l))}if(o!==null){var f=s.baseState;i=0,p=d=l=null,c=o;do{var u=c.lane,x=c.eventTime;if((a&u)===u){p!==null&&(p=p.next={eventTime:x,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var y=e,j=c;switch(u=t,x=n,j.tag){case 1:if(y=j.payload,typeof y=="function"){f=y.call(x,f,u);break e}f=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=j.payload,u=typeof y=="function"?y.call(x,f,u):y,u==null)break e;f=qe({},f,u);break e;case 2:An=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,u=s.effects,u===null?s.effects=[c]:u.push(c))}else x={eventTime:x,lane:u,tag:c.tag,payload:c.payload,callback:c.callback,next:null},p===null?(d=p=x,l=f):p=p.next=x,i|=u;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;u=c,c=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(p===null&&(l=f),s.baseState=l,s.firstBaseUpdate=d,s.lastBaseUpdate=p,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);gr|=i,e.lanes=i,e.memoizedState=f}}function xd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],s=a.callback;if(s!==null){if(a.callback=null,a=n,typeof s!="function")throw Error(G(191,s));s.call(a)}}}var qa={},gn=er(qa),La=er(qa),Aa=er(qa);function ir(e){if(e===qa)throw Error(G(174));return e}function Kl(e,t){switch(Oe(Aa,t),Oe(La,e),Oe(gn,qa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:zi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=zi(t,e)}Ue(gn),Oe(gn,t)}function Ur(){Ue(gn),Ue(La),Ue(Aa)}function Lp(e){ir(Aa.current);var t=ir(gn.current),n=zi(t,e.type);t!==n&&(Oe(La,e),Oe(gn,n))}function ql(e){La.current===e&&(Ue(gn),Ue(La))}var Ge=er(0);function eo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ri=[];function Ql(){for(var e=0;e<ri.length;e++)ri[e]._workInProgressVersionPrimary=null;ri.length=0}var Es=Pn.ReactCurrentDispatcher,ai=Pn.ReactCurrentBatchConfig,fr=0,Ke=null,lt=null,dt=null,to=!1,wa=!1,Oa=0,rg=0;function yt(){throw Error(G(321))}function Zl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!on(e[n],t[n]))return!1;return!0}function Jl(e,t,n,a,s,o){if(fr=o,Ke=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Es.current=e===null||e.memoizedState===null?ig:lg,e=n(a,s),wa){o=0;do{if(wa=!1,Oa=0,25<=o)throw Error(G(301));o+=1,dt=lt=null,t.updateQueue=null,Es.current=cg,e=n(a,s)}while(wa)}if(Es.current=no,t=lt!==null&&lt.next!==null,fr=0,dt=lt=Ke=null,to=!1,t)throw Error(G(300));return e}function ec(){var e=Oa!==0;return Oa=0,e}function pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dt===null?Ke.memoizedState=dt=e:dt=dt.next=e,dt}function Kt(){if(lt===null){var e=Ke.alternate;e=e!==null?e.memoizedState:null}else e=lt.next;var t=dt===null?Ke.memoizedState:dt.next;if(t!==null)dt=t,lt=e;else{if(e===null)throw Error(G(310));lt=e,e={memoizedState:lt.memoizedState,baseState:lt.baseState,baseQueue:lt.baseQueue,queue:lt.queue,next:null},dt===null?Ke.memoizedState=dt=e:dt=dt.next=e}return dt}function Fa(e,t){return typeof t=="function"?t(e):t}function si(e){var t=Kt(),n=t.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=e;var a=lt,s=a.baseQueue,o=n.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}a.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,a=a.baseState;var c=i=null,l=null,d=o;do{var p=d.lane;if((fr&p)===p)l!==null&&(l=l.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var f={lane:p,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};l===null?(c=l=f,i=a):l=l.next=f,Ke.lanes|=p,gr|=p}d=d.next}while(d!==null&&d!==o);l===null?i=a:l.next=c,on(a,t.memoizedState)||(Et=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=l,n.lastRenderedState=a}if(e=n.interleaved,e!==null){s=e;do o=s.lane,Ke.lanes|=o,gr|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function oi(e){var t=Kt(),n=t.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=e;var a=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);on(o,t.memoizedState)||(Et=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function Ap(){}function Op(e,t){var n=Ke,a=Kt(),s=t(),o=!on(a.memoizedState,s);if(o&&(a.memoizedState=s,Et=!0),a=a.queue,tc(Bp.bind(null,n,a,e),[e]),a.getSnapshot!==t||o||dt!==null&&dt.memoizedState.tag&1){if(n.flags|=2048,Da(9,Dp.bind(null,n,a,s,t),void 0,null),ut===null)throw Error(G(349));fr&30||Fp(n,t,s)}return s}function Fp(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ke.updateQueue,t===null?(t={lastEffect:null,stores:null},Ke.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Dp(e,t,n,a){t.value=n,t.getSnapshot=a,Wp(t)&&Vp(e)}function Bp(e,t,n){return n(function(){Wp(t)&&Vp(e)})}function Wp(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!on(e,n)}catch{return!0}}function Vp(e){var t=En(e,1);t!==null&&sn(t,e,1,-1)}function vd(e){var t=pn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Fa,lastRenderedState:e},t.queue=e,e=e.dispatch=og.bind(null,Ke,e),[t.memoizedState,e]}function Da(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=Ke.updateQueue,t===null?(t={lastEffect:null,stores:null},Ke.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function Up(){return Kt().memoizedState}function zs(e,t,n,a){var s=pn();Ke.flags|=e,s.memoizedState=Da(1|t,n,void 0,a===void 0?null:a)}function No(e,t,n,a){var s=Kt();a=a===void 0?null:a;var o=void 0;if(lt!==null){var i=lt.memoizedState;if(o=i.destroy,a!==null&&Zl(a,i.deps)){s.memoizedState=Da(t,n,o,a);return}}Ke.flags|=e,s.memoizedState=Da(1|t,n,o,a)}function yd(e,t){return zs(8390656,8,e,t)}function tc(e,t){return No(2048,8,e,t)}function Hp(e,t){return No(4,2,e,t)}function Yp(e,t){return No(4,4,e,t)}function Gp(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xp(e,t,n){return n=n!=null?n.concat([e]):null,No(4,4,Gp.bind(null,t,e),n)}function nc(){}function Kp(e,t){var n=Kt();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Zl(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function qp(e,t){var n=Kt();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Zl(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function Qp(e,t,n){return fr&21?(on(n,t)||(n=np(),Ke.lanes|=n,gr|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Et=!0),e.memoizedState=n)}function ag(e,t){var n=Pe;Pe=n!==0&&4>n?n:4,e(!0);var a=ai.transition;ai.transition={};try{e(!1),t()}finally{Pe=n,ai.transition=a}}function Zp(){return Kt().memoizedState}function sg(e,t,n){var a=Kn(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},Jp(e))em(t,n);else if(n=Rp(e,t,n,a),n!==null){var s=_t();sn(n,e,a,s),tm(n,t,a)}}function og(e,t,n){var a=Kn(e),s={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Jp(e))em(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,c=o(i,n);if(s.hasEagerState=!0,s.eagerState=c,on(c,i)){var l=t.interleaved;l===null?(s.next=s,Gl(t)):(s.next=l.next,l.next=s),t.interleaved=s;return}}catch{}finally{}n=Rp(e,t,s,a),n!==null&&(s=_t(),sn(n,e,a,s),tm(n,t,a))}}function Jp(e){var t=e.alternate;return e===Ke||t!==null&&t===Ke}function em(e,t){wa=to=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function tm(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Tl(e,n)}}var no={readContext:Xt,useCallback:yt,useContext:yt,useEffect:yt,useImperativeHandle:yt,useInsertionEffect:yt,useLayoutEffect:yt,useMemo:yt,useReducer:yt,useRef:yt,useState:yt,useDebugValue:yt,useDeferredValue:yt,useTransition:yt,useMutableSource:yt,useSyncExternalStore:yt,useId:yt,unstable_isNewReconciler:!1},ig={readContext:Xt,useCallback:function(e,t){return pn().memoizedState=[e,t===void 0?null:t],e},useContext:Xt,useEffect:yd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,zs(4194308,4,Gp.bind(null,t,e),n)},useLayoutEffect:function(e,t){return zs(4194308,4,e,t)},useInsertionEffect:function(e,t){return zs(4,2,e,t)},useMemo:function(e,t){var n=pn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=pn();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=sg.bind(null,Ke,e),[a.memoizedState,e]},useRef:function(e){var t=pn();return e={current:e},t.memoizedState=e},useState:vd,useDebugValue:nc,useDeferredValue:function(e){return pn().memoizedState=e},useTransition:function(){var e=vd(!1),t=e[0];return e=ag.bind(null,e[1]),pn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=Ke,s=pn();if(Ye){if(n===void 0)throw Error(G(407));n=n()}else{if(n=t(),ut===null)throw Error(G(349));fr&30||Fp(a,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,yd(Bp.bind(null,a,o,e),[e]),a.flags|=2048,Da(9,Dp.bind(null,a,o,n,t),void 0,null),n},useId:function(){var e=pn(),t=ut.identifierPrefix;if(Ye){var n=Nn,a=_n;n=(a&~(1<<32-an(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=Oa++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=rg++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},lg={readContext:Xt,useCallback:Kp,useContext:Xt,useEffect:tc,useImperativeHandle:Xp,useInsertionEffect:Hp,useLayoutEffect:Yp,useMemo:qp,useReducer:si,useRef:Up,useState:function(){return si(Fa)},useDebugValue:nc,useDeferredValue:function(e){var t=Kt();return Qp(t,lt.memoizedState,e)},useTransition:function(){var e=si(Fa)[0],t=Kt().memoizedState;return[e,t]},useMutableSource:Ap,useSyncExternalStore:Op,useId:Zp,unstable_isNewReconciler:!1},cg={readContext:Xt,useCallback:Kp,useContext:Xt,useEffect:tc,useImperativeHandle:Xp,useInsertionEffect:Hp,useLayoutEffect:Yp,useMemo:qp,useReducer:oi,useRef:Up,useState:function(){return oi(Fa)},useDebugValue:nc,useDeferredValue:function(e){var t=Kt();return lt===null?t.memoizedState=e:Qp(t,lt.memoizedState,e)},useTransition:function(){var e=oi(Fa)[0],t=Kt().memoizedState;return[e,t]},useMutableSource:Ap,useSyncExternalStore:Op,useId:Zp,unstable_isNewReconciler:!1};function Jt(e,t){if(e&&e.defaultProps){t=qe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Qi(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:qe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var So={isMounted:function(e){return(e=e._reactInternals)?yr(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=_t(),s=Kn(e),o=Sn(a,s);o.payload=t,n!=null&&(o.callback=n),t=Gn(e,o,s),t!==null&&(sn(t,e,s,a),Ms(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=_t(),s=Kn(e),o=Sn(a,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Gn(e,o,s),t!==null&&(sn(t,e,s,a),Ms(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=_t(),a=Kn(e),s=Sn(n,a);s.tag=2,t!=null&&(s.callback=t),t=Gn(e,s,a),t!==null&&(sn(t,e,a,n),Ms(t,e,a))}};function bd(e,t,n,a,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,i):t.prototype&&t.prototype.isPureReactComponent?!Pa(n,a)||!Pa(s,o):!0}function nm(e,t,n){var a=!1,s=Zn,o=t.contextType;return typeof o=="object"&&o!==null?o=Xt(o):(s=Pt(t)?pr:kt.current,a=t.contextTypes,o=(a=a!=null)?Br(e,s):Zn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=So,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function wd(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&So.enqueueReplaceState(t,t.state,null)}function Zi(e,t,n,a){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Xl(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=Xt(o):(o=Pt(t)?pr:kt.current,s.context=Br(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Qi(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&So.enqueueReplaceState(s,s.state,null),Js(e,n,s,a),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Hr(e,t){try{var n="",a=t;do n+=Af(a),a=a.return;while(a);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function ii(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ji(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var dg=typeof WeakMap=="function"?WeakMap:Map;function rm(e,t,n){n=Sn(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){ao||(ao=!0,cl=a),Ji(e,t)},n}function am(e,t,n){n=Sn(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;n.payload=function(){return a(s)},n.callback=function(){Ji(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Ji(e,t),typeof a!="function"&&(Xn===null?Xn=new Set([this]):Xn.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function kd(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new dg;var s=new Set;a.set(t,s)}else s=a.get(t),s===void 0&&(s=new Set,a.set(t,s));s.has(n)||(s.add(n),e=_g.bind(null,e,t,n),t.then(e,e))}function jd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function _d(e,t,n,a,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Sn(-1,1),t.tag=2,Gn(n,t,1))),n.lanes|=1),e)}var ug=Pn.ReactCurrentOwner,Et=!1;function jt(e,t,n,a){t.child=e===null?Tp(t,null,n,a):Vr(t,e.child,n,a)}function Nd(e,t,n,a,s){n=n.render;var o=t.ref;return Ar(t,s),a=Jl(e,t,n,a,o,s),n=ec(),e!==null&&!Et?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,zn(e,t,s)):(Ye&&n&&Bl(t),t.flags|=1,jt(e,t,a,s),t.child)}function Sd(e,t,n,a,s){if(e===null){var o=n.type;return typeof o=="function"&&!dc(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,sm(e,t,o,a,s)):(e=Rs(n.type,null,a,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:Pa,n(i,a)&&e.ref===t.ref)return zn(e,t,s)}return t.flags|=1,e=qn(o,a),e.ref=t.ref,e.return=t,t.child=e}function sm(e,t,n,a,s){if(e!==null){var o=e.memoizedProps;if(Pa(o,a)&&e.ref===t.ref)if(Et=!1,t.pendingProps=a=o,(e.lanes&s)!==0)e.flags&131072&&(Et=!0);else return t.lanes=e.lanes,zn(e,t,s)}return el(e,t,n,a,s)}function om(e,t,n){var a=t.pendingProps,s=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Oe(Pr,Lt),Lt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Oe(Pr,Lt),Lt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:n,Oe(Pr,Lt),Lt|=a}else o!==null?(a=o.baseLanes|n,t.memoizedState=null):a=n,Oe(Pr,Lt),Lt|=a;return jt(e,t,s,n),t.child}function im(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function el(e,t,n,a,s){var o=Pt(n)?pr:kt.current;return o=Br(t,o),Ar(t,s),n=Jl(e,t,n,a,o,s),a=ec(),e!==null&&!Et?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,zn(e,t,s)):(Ye&&a&&Bl(t),t.flags|=1,jt(e,t,n,s),t.child)}function Cd(e,t,n,a,s){if(Pt(n)){var o=!0;Xs(t)}else o=!1;if(Ar(t,s),t.stateNode===null)$s(e,t),nm(t,n,a),Zi(t,n,a,s),a=!0;else if(e===null){var i=t.stateNode,c=t.memoizedProps;i.props=c;var l=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=Xt(d):(d=Pt(n)?pr:kt.current,d=Br(t,d));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==a||l!==d)&&wd(t,i,a,d),An=!1;var u=t.memoizedState;i.state=u,Js(t,a,i,s),l=t.memoizedState,c!==a||u!==l||$t.current||An?(typeof p=="function"&&(Qi(t,n,p,a),l=t.memoizedState),(c=An||bd(t,n,c,a,u,l,d))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=l),i.props=a,i.state=l,i.context=d,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,Ip(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:Jt(t.type,c),i.props=d,f=t.pendingProps,u=i.context,l=n.contextType,typeof l=="object"&&l!==null?l=Xt(l):(l=Pt(n)?pr:kt.current,l=Br(t,l));var x=n.getDerivedStateFromProps;(p=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==f||u!==l)&&wd(t,i,a,l),An=!1,u=t.memoizedState,i.state=u,Js(t,a,i,s);var y=t.memoizedState;c!==f||u!==y||$t.current||An?(typeof x=="function"&&(Qi(t,n,x,a),y=t.memoizedState),(d=An||bd(t,n,d,a,u,y,l)||!1)?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,y,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,y,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=y),i.props=a,i.state=y,i.context=l,a=d):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),a=!1)}return tl(e,t,n,a,o,s)}function tl(e,t,n,a,s,o){im(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return s&&pd(t,n,!1),zn(e,t,o);a=t.stateNode,ug.current=t;var c=i&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=Vr(t,e.child,null,o),t.child=Vr(t,null,c,o)):jt(e,t,c,o),t.memoizedState=a.state,s&&pd(t,n,!0),t.child}function lm(e){var t=e.stateNode;t.pendingContext?ud(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ud(e,t.context,!1),Kl(e,t.containerInfo)}function Md(e,t,n,a,s){return Wr(),Vl(s),t.flags|=256,jt(e,t,n,a),t.child}var nl={dehydrated:null,treeContext:null,retryLane:0};function rl(e){return{baseLanes:e,cachePool:null,transitions:null}}function cm(e,t,n){var a=t.pendingProps,s=Ge.current,o=!1,i=(t.flags&128)!==0,c;if((c=i)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),Oe(Ge,s&1),e===null)return Ki(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,o?(a=t.mode,o=t.child,i={mode:"hidden",children:i},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Eo(i,a,0,null),e=dr(e,a,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=rl(n),t.memoizedState=nl,e):rc(t,i));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return pg(e,t,i,a,c,s,n);if(o){o=a.fallback,i=t.mode,s=e.child,c=s.sibling;var l={mode:"hidden",children:a.children};return!(i&1)&&t.child!==s?(a=t.child,a.childLanes=0,a.pendingProps=l,t.deletions=null):(a=qn(s,l),a.subtreeFlags=s.subtreeFlags&14680064),c!==null?o=qn(c,o):(o=dr(o,i,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,i=e.child.memoizedState,i=i===null?rl(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=nl,a}return o=e.child,e=o.sibling,a=qn(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function rc(e,t){return t=Eo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ps(e,t,n,a){return a!==null&&Vl(a),Vr(t,e.child,null,n),e=rc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function pg(e,t,n,a,s,o,i){if(n)return t.flags&256?(t.flags&=-257,a=ii(Error(G(422))),ps(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,s=t.mode,a=Eo({mode:"visible",children:a.children},s,0,null),o=dr(o,s,i,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&Vr(t,e.child,null,i),t.child.memoizedState=rl(i),t.memoizedState=nl,o);if(!(t.mode&1))return ps(e,t,i,null);if(s.data==="$!"){if(a=s.nextSibling&&s.nextSibling.dataset,a)var c=a.dgst;return a=c,o=Error(G(419)),a=ii(o,a,void 0),ps(e,t,i,a)}if(c=(i&e.childLanes)!==0,Et||c){if(a=ut,a!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(a.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,En(e,s),sn(a,e,s,-1))}return cc(),a=ii(Error(G(421))),ps(e,t,i,a)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=Ng.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,At=Yn(s.nextSibling),Ot=t,Ye=!0,tn=null,e!==null&&(Ut[Ht++]=_n,Ut[Ht++]=Nn,Ut[Ht++]=mr,_n=e.id,Nn=e.overflow,mr=t),t=rc(t,a.children),t.flags|=4096,t)}function Ed(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),qi(e.return,t,n)}function li(e,t,n,a,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=s)}function dm(e,t,n){var a=t.pendingProps,s=a.revealOrder,o=a.tail;if(jt(e,t,a.children,n),a=Ge.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ed(e,n,t);else if(e.tag===19)Ed(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(Oe(Ge,a),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&eo(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),li(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&eo(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}li(t,!0,n,null,o);break;case"together":li(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function $s(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function zn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),gr|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(G(153));if(t.child!==null){for(e=t.child,n=qn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=qn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function mg(e,t,n){switch(t.tag){case 3:lm(t),Wr();break;case 5:Lp(t);break;case 1:Pt(t.type)&&Xs(t);break;case 4:Kl(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,s=t.memoizedProps.value;Oe(Qs,a._currentValue),a._currentValue=s;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(Oe(Ge,Ge.current&1),t.flags|=128,null):n&t.child.childLanes?cm(e,t,n):(Oe(Ge,Ge.current&1),e=zn(e,t,n),e!==null?e.sibling:null);Oe(Ge,Ge.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return dm(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Oe(Ge,Ge.current),a)break;return null;case 22:case 23:return t.lanes=0,om(e,t,n)}return zn(e,t,n)}var um,al,pm,mm;um=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};al=function(){};pm=function(e,t,n,a){var s=e.memoizedProps;if(s!==a){e=t.stateNode,ir(gn.current);var o=null;switch(n){case"input":s=Si(e,s),a=Si(e,a),o=[];break;case"select":s=qe({},s,{value:void 0}),a=qe({},a,{value:void 0}),o=[];break;case"textarea":s=Ei(e,s),a=Ei(e,a),o=[];break;default:typeof s.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=Ys)}$i(n,a);var i;n=null;for(d in s)if(!a.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var c=s[d];for(i in c)c.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Na.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in a){var l=a[d];if(c=s!=null?s[d]:void 0,a.hasOwnProperty(d)&&l!==c&&(l!=null||c!=null))if(d==="style")if(c){for(i in c)!c.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in l)l.hasOwnProperty(i)&&c[i]!==l[i]&&(n||(n={}),n[i]=l[i])}else n||(o||(o=[]),o.push(d,n)),n=l;else d==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(o=o||[]).push(d,l)):d==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(d,""+l):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Na.hasOwnProperty(d)?(l!=null&&d==="onScroll"&&Ve("scroll",e),o||c===l||(o=[])):(o=o||[]).push(d,l))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};mm=function(e,t,n,a){n!==a&&(t.flags|=4)};function aa(e,t){if(!Ye)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function bt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags&14680064,a|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags,a|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function fg(e,t,n){var a=t.pendingProps;switch(Wl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return bt(t),null;case 1:return Pt(t.type)&&Gs(),bt(t),null;case 3:return a=t.stateNode,Ur(),Ue($t),Ue(kt),Ql(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(ds(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,tn!==null&&(pl(tn),tn=null))),al(e,t),bt(t),null;case 5:ql(t);var s=ir(Aa.current);if(n=t.type,e!==null&&t.stateNode!=null)pm(e,t,n,a,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(G(166));return bt(t),null}if(e=ir(gn.current),ds(t)){a=t.stateNode,n=t.type;var o=t.memoizedProps;switch(a[mn]=t,a[Ia]=o,e=(t.mode&1)!==0,n){case"dialog":Ve("cancel",a),Ve("close",a);break;case"iframe":case"object":case"embed":Ve("load",a);break;case"video":case"audio":for(s=0;s<pa.length;s++)Ve(pa[s],a);break;case"source":Ve("error",a);break;case"img":case"image":case"link":Ve("error",a),Ve("load",a);break;case"details":Ve("toggle",a);break;case"input":Oc(a,o),Ve("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},Ve("invalid",a);break;case"textarea":Dc(a,o),Ve("invalid",a)}$i(n,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var c=o[i];i==="children"?typeof c=="string"?a.textContent!==c&&(o.suppressHydrationWarning!==!0&&cs(a.textContent,c,e),s=["children",c]):typeof c=="number"&&a.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&cs(a.textContent,c,e),s=["children",""+c]):Na.hasOwnProperty(i)&&c!=null&&i==="onScroll"&&Ve("scroll",a)}switch(n){case"input":ts(a),Fc(a,o,!0);break;case"textarea":ts(a),Bc(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=Ys)}a=s,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Bu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(n,{is:a.is}):(e=i.createElement(n),n==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,n),e[mn]=t,e[Ia]=a,um(e,t,!1,!1),t.stateNode=e;e:{switch(i=Pi(n,a),n){case"dialog":Ve("cancel",e),Ve("close",e),s=a;break;case"iframe":case"object":case"embed":Ve("load",e),s=a;break;case"video":case"audio":for(s=0;s<pa.length;s++)Ve(pa[s],e);s=a;break;case"source":Ve("error",e),s=a;break;case"img":case"image":case"link":Ve("error",e),Ve("load",e),s=a;break;case"details":Ve("toggle",e),s=a;break;case"input":Oc(e,a),s=Si(e,a),Ve("invalid",e);break;case"option":s=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},s=qe({},a,{value:void 0}),Ve("invalid",e);break;case"textarea":Dc(e,a),s=Ei(e,a),Ve("invalid",e);break;default:s=a}$i(n,s),c=s;for(o in c)if(c.hasOwnProperty(o)){var l=c[o];o==="style"?Uu(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Wu(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Sa(e,l):typeof l=="number"&&Sa(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Na.hasOwnProperty(o)?l!=null&&o==="onScroll"&&Ve("scroll",e):l!=null&&Cl(e,o,l,i))}switch(n){case"input":ts(e),Fc(e,a,!1);break;case"textarea":ts(e),Bc(e);break;case"option":a.value!=null&&e.setAttribute("value",""+Qn(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?Tr(e,!!a.multiple,o,!1):a.defaultValue!=null&&Tr(e,!!a.multiple,a.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=Ys)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return bt(t),null;case 6:if(e&&t.stateNode!=null)mm(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(G(166));if(n=ir(Aa.current),ir(gn.current),ds(t)){if(a=t.stateNode,n=t.memoizedProps,a[mn]=t,(o=a.nodeValue!==n)&&(e=Ot,e!==null))switch(e.tag){case 3:cs(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&cs(a.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[mn]=t,t.stateNode=a}return bt(t),null;case 13:if(Ue(Ge),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ye&&At!==null&&t.mode&1&&!(t.flags&128))$p(),Wr(),t.flags|=98560,o=!1;else if(o=ds(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(G(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(G(317));o[mn]=t}else Wr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;bt(t),o=!1}else tn!==null&&(pl(tn),tn=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||Ge.current&1?ct===0&&(ct=3):cc())),t.updateQueue!==null&&(t.flags|=4),bt(t),null);case 4:return Ur(),al(e,t),e===null&&Ta(t.stateNode.containerInfo),bt(t),null;case 10:return Yl(t.type._context),bt(t),null;case 17:return Pt(t.type)&&Gs(),bt(t),null;case 19:if(Ue(Ge),o=t.memoizedState,o===null)return bt(t),null;if(a=(t.flags&128)!==0,i=o.rendering,i===null)if(a)aa(o,!1);else{if(ct!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=eo(e),i!==null){for(t.flags|=128,aa(o,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)o=n,e=a,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Oe(Ge,Ge.current&1|2),t.child}e=e.sibling}o.tail!==null&&nt()>Yr&&(t.flags|=128,a=!0,aa(o,!1),t.lanes=4194304)}else{if(!a)if(e=eo(i),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),aa(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!Ye)return bt(t),null}else 2*nt()-o.renderingStartTime>Yr&&n!==1073741824&&(t.flags|=128,a=!0,aa(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=nt(),t.sibling=null,n=Ge.current,Oe(Ge,a?n&1|2:n&1),t):(bt(t),null);case 22:case 23:return lc(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?Lt&1073741824&&(bt(t),t.subtreeFlags&6&&(t.flags|=8192)):bt(t),null;case 24:return null;case 25:return null}throw Error(G(156,t.tag))}function gg(e,t){switch(Wl(t),t.tag){case 1:return Pt(t.type)&&Gs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ur(),Ue($t),Ue(kt),Ql(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ql(t),null;case 13:if(Ue(Ge),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(G(340));Wr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ue(Ge),null;case 4:return Ur(),null;case 10:return Yl(t.type._context),null;case 22:case 23:return lc(),null;case 24:return null;default:return null}}var ms=!1,wt=!1,hg=typeof WeakSet=="function"?WeakSet:Set,te=null;function $r(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){et(e,t,a)}else n.current=null}function sl(e,t,n){try{n()}catch(a){et(e,t,a)}}var zd=!1;function xg(e,t){if(Wi=Vs,e=vp(),Dl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var s=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,c=-1,l=-1,d=0,p=0,f=e,u=null;t:for(;;){for(var x;f!==n||s!==0&&f.nodeType!==3||(c=i+s),f!==o||a!==0&&f.nodeType!==3||(l=i+a),f.nodeType===3&&(i+=f.nodeValue.length),(x=f.firstChild)!==null;)u=f,f=x;for(;;){if(f===e)break t;if(u===n&&++d===s&&(c=i),u===o&&++p===a&&(l=i),(x=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=x}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Vi={focusedElem:e,selectionRange:n},Vs=!1,te=t;te!==null;)if(t=te,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,te=e;else for(;te!==null;){t=te;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var j=y.memoizedProps,N=y.memoizedState,v=t.stateNode,h=v.getSnapshotBeforeUpdate(t.elementType===t.type?j:Jt(t.type,j),N);v.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(G(163))}}catch(_){et(t,t.return,_)}if(e=t.sibling,e!==null){e.return=t.return,te=e;break}te=t.return}return y=zd,zd=!1,y}function ka(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&sl(t,n,o)}s=s.next}while(s!==a)}}function Co(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function ol(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function fm(e){var t=e.alternate;t!==null&&(e.alternate=null,fm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[mn],delete t[Ia],delete t[Yi],delete t[J0],delete t[eg])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function gm(e){return e.tag===5||e.tag===3||e.tag===4}function $d(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||gm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function il(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ys));else if(a!==4&&(e=e.child,e!==null))for(il(e,t,n),e=e.sibling;e!==null;)il(e,t,n),e=e.sibling}function ll(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(ll(e,t,n),e=e.sibling;e!==null;)ll(e,t,n),e=e.sibling}var gt=null,en=!1;function In(e,t,n){for(n=n.child;n!==null;)hm(e,t,n),n=n.sibling}function hm(e,t,n){if(fn&&typeof fn.onCommitFiberUnmount=="function")try{fn.onCommitFiberUnmount(yo,n)}catch{}switch(n.tag){case 5:wt||$r(n,t);case 6:var a=gt,s=en;gt=null,In(e,t,n),gt=a,en=s,gt!==null&&(en?(e=gt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):gt.removeChild(n.stateNode));break;case 18:gt!==null&&(en?(e=gt,n=n.stateNode,e.nodeType===8?ti(e.parentNode,n):e.nodeType===1&&ti(e,n),za(e)):ti(gt,n.stateNode));break;case 4:a=gt,s=en,gt=n.stateNode.containerInfo,en=!0,In(e,t,n),gt=a,en=s;break;case 0:case 11:case 14:case 15:if(!wt&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){s=a=a.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&sl(n,t,i),s=s.next}while(s!==a)}In(e,t,n);break;case 1:if(!wt&&($r(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(c){et(n,t,c)}In(e,t,n);break;case 21:In(e,t,n);break;case 22:n.mode&1?(wt=(a=wt)||n.memoizedState!==null,In(e,t,n),wt=a):In(e,t,n);break;default:In(e,t,n)}}function Pd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new hg),t.forEach(function(a){var s=Sg.bind(null,e,a);n.has(a)||(n.add(a),a.then(s,s))})}}function Zt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];try{var o=e,i=t,c=i;e:for(;c!==null;){switch(c.tag){case 5:gt=c.stateNode,en=!1;break e;case 3:gt=c.stateNode.containerInfo,en=!0;break e;case 4:gt=c.stateNode.containerInfo,en=!0;break e}c=c.return}if(gt===null)throw Error(G(160));hm(o,i,s),gt=null,en=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(d){et(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)xm(t,e),t=t.sibling}function xm(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Zt(t,e),un(e),a&4){try{ka(3,e,e.return),Co(3,e)}catch(j){et(e,e.return,j)}try{ka(5,e,e.return)}catch(j){et(e,e.return,j)}}break;case 1:Zt(t,e),un(e),a&512&&n!==null&&$r(n,n.return);break;case 5:if(Zt(t,e),un(e),a&512&&n!==null&&$r(n,n.return),e.flags&32){var s=e.stateNode;try{Sa(s,"")}catch(j){et(e,e.return,j)}}if(a&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&Fu(s,o),Pi(c,i);var d=Pi(c,o);for(i=0;i<l.length;i+=2){var p=l[i],f=l[i+1];p==="style"?Uu(s,f):p==="dangerouslySetInnerHTML"?Wu(s,f):p==="children"?Sa(s,f):Cl(s,p,f,d)}switch(c){case"input":Ci(s,o);break;case"textarea":Du(s,o);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var x=o.value;x!=null?Tr(s,!!o.multiple,x,!1):u!==!!o.multiple&&(o.defaultValue!=null?Tr(s,!!o.multiple,o.defaultValue,!0):Tr(s,!!o.multiple,o.multiple?[]:"",!1))}s[Ia]=o}catch(j){et(e,e.return,j)}}break;case 6:if(Zt(t,e),un(e),a&4){if(e.stateNode===null)throw Error(G(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(j){et(e,e.return,j)}}break;case 3:if(Zt(t,e),un(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{za(t.containerInfo)}catch(j){et(e,e.return,j)}break;case 4:Zt(t,e),un(e);break;case 13:Zt(t,e),un(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(oc=nt())),a&4&&Pd(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(wt=(d=wt)||p,Zt(t,e),wt=d):Zt(t,e),un(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!p&&e.mode&1)for(te=e,p=e.child;p!==null;){for(f=te=p;te!==null;){switch(u=te,x=u.child,u.tag){case 0:case 11:case 14:case 15:ka(4,u,u.return);break;case 1:$r(u,u.return);var y=u.stateNode;if(typeof y.componentWillUnmount=="function"){a=u,n=u.return;try{t=a,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(j){et(a,n,j)}}break;case 5:$r(u,u.return);break;case 22:if(u.memoizedState!==null){Rd(f);continue}}x!==null?(x.return=u,te=x):Rd(f)}p=p.sibling}e:for(p=null,f=e;;){if(f.tag===5){if(p===null){p=f;try{s=f.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=f.stateNode,l=f.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,c.style.display=Vu("display",i))}catch(j){et(e,e.return,j)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(j){et(e,e.return,j)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Zt(t,e),un(e),a&4&&Pd(e);break;case 21:break;default:Zt(t,e),un(e)}}function un(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(gm(n)){var a=n;break e}n=n.return}throw Error(G(160))}switch(a.tag){case 5:var s=a.stateNode;a.flags&32&&(Sa(s,""),a.flags&=-33);var o=$d(e);ll(e,o,s);break;case 3:case 4:var i=a.stateNode.containerInfo,c=$d(e);il(e,c,i);break;default:throw Error(G(161))}}catch(l){et(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function vg(e,t,n){te=e,vm(e)}function vm(e,t,n){for(var a=(e.mode&1)!==0;te!==null;){var s=te,o=s.child;if(s.tag===22&&a){var i=s.memoizedState!==null||ms;if(!i){var c=s.alternate,l=c!==null&&c.memoizedState!==null||wt;c=ms;var d=wt;if(ms=i,(wt=l)&&!d)for(te=s;te!==null;)i=te,l=i.child,i.tag===22&&i.memoizedState!==null?Id(s):l!==null?(l.return=i,te=l):Id(s);for(;o!==null;)te=o,vm(o),o=o.sibling;te=s,ms=c,wt=d}Td(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,te=o):Td(e)}}function Td(e){for(;te!==null;){var t=te;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:wt||Co(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!wt)if(n===null)a.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:Jt(t.type,n.memoizedProps);a.componentDidUpdate(s,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&xd(t,o,a);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}xd(t,i,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var p=d.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&za(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(G(163))}wt||t.flags&512&&ol(t)}catch(u){et(t,t.return,u)}}if(t===e){te=null;break}if(n=t.sibling,n!==null){n.return=t.return,te=n;break}te=t.return}}function Rd(e){for(;te!==null;){var t=te;if(t===e){te=null;break}var n=t.sibling;if(n!==null){n.return=t.return,te=n;break}te=t.return}}function Id(e){for(;te!==null;){var t=te;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Co(4,t)}catch(l){et(t,n,l)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var s=t.return;try{a.componentDidMount()}catch(l){et(t,s,l)}}var o=t.return;try{ol(t)}catch(l){et(t,o,l)}break;case 5:var i=t.return;try{ol(t)}catch(l){et(t,i,l)}}}catch(l){et(t,t.return,l)}if(t===e){te=null;break}var c=t.sibling;if(c!==null){c.return=t.return,te=c;break}te=t.return}}var yg=Math.ceil,ro=Pn.ReactCurrentDispatcher,ac=Pn.ReactCurrentOwner,Gt=Pn.ReactCurrentBatchConfig,Me=0,ut=null,st=null,ht=0,Lt=0,Pr=er(0),ct=0,Ba=null,gr=0,Mo=0,sc=0,ja=null,Mt=null,oc=0,Yr=1/0,kn=null,ao=!1,cl=null,Xn=null,fs=!1,Wn=null,so=0,_a=0,dl=null,Ps=-1,Ts=0;function _t(){return Me&6?nt():Ps!==-1?Ps:Ps=nt()}function Kn(e){return e.mode&1?Me&2&&ht!==0?ht&-ht:ng.transition!==null?(Ts===0&&(Ts=np()),Ts):(e=Pe,e!==0||(e=window.event,e=e===void 0?16:cp(e.type)),e):1}function sn(e,t,n,a){if(50<_a)throw _a=0,dl=null,Error(G(185));Ga(e,n,a),(!(Me&2)||e!==ut)&&(e===ut&&(!(Me&2)&&(Mo|=n),ct===4&&Dn(e,ht)),Tt(e,a),n===1&&Me===0&&!(t.mode&1)&&(Yr=nt()+500,_o&&tr()))}function Tt(e,t){var n=e.callbackNode;n0(e,t);var a=Ws(e,e===ut?ht:0);if(a===0)n!==null&&Uc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&Uc(n),t===1)e.tag===0?tg(Ld.bind(null,e)):Mp(Ld.bind(null,e)),Q0(function(){!(Me&6)&&tr()}),n=null;else{switch(rp(a)){case 1:n=Pl;break;case 4:n=ep;break;case 16:n=Bs;break;case 536870912:n=tp;break;default:n=Bs}n=Sm(n,ym.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ym(e,t){if(Ps=-1,Ts=0,Me&6)throw Error(G(327));var n=e.callbackNode;if(Or()&&e.callbackNode!==n)return null;var a=Ws(e,e===ut?ht:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=oo(e,a);else{t=a;var s=Me;Me|=2;var o=wm();(ut!==e||ht!==t)&&(kn=null,Yr=nt()+500,cr(e,t));do try{kg();break}catch(c){bm(e,c)}while(!0);Hl(),ro.current=o,Me=s,st!==null?t=0:(ut=null,ht=0,t=ct)}if(t!==0){if(t===2&&(s=Ai(e),s!==0&&(a=s,t=ul(e,s))),t===1)throw n=Ba,cr(e,0),Dn(e,a),Tt(e,nt()),n;if(t===6)Dn(e,a);else{if(s=e.current.alternate,!(a&30)&&!bg(s)&&(t=oo(e,a),t===2&&(o=Ai(e),o!==0&&(a=o,t=ul(e,o))),t===1))throw n=Ba,cr(e,0),Dn(e,a),Tt(e,nt()),n;switch(e.finishedWork=s,e.finishedLanes=a,t){case 0:case 1:throw Error(G(345));case 2:ar(e,Mt,kn);break;case 3:if(Dn(e,a),(a&130023424)===a&&(t=oc+500-nt(),10<t)){if(Ws(e,0)!==0)break;if(s=e.suspendedLanes,(s&a)!==a){_t(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Hi(ar.bind(null,e,Mt,kn),t);break}ar(e,Mt,kn);break;case 4:if(Dn(e,a),(a&4194240)===a)break;for(t=e.eventTimes,s=-1;0<a;){var i=31-an(a);o=1<<i,i=t[i],i>s&&(s=i),a&=~o}if(a=s,a=nt()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*yg(a/1960))-a,10<a){e.timeoutHandle=Hi(ar.bind(null,e,Mt,kn),a);break}ar(e,Mt,kn);break;case 5:ar(e,Mt,kn);break;default:throw Error(G(329))}}}return Tt(e,nt()),e.callbackNode===n?ym.bind(null,e):null}function ul(e,t){var n=ja;return e.current.memoizedState.isDehydrated&&(cr(e,t).flags|=256),e=oo(e,t),e!==2&&(t=Mt,Mt=n,t!==null&&pl(t)),e}function pl(e){Mt===null?Mt=e:Mt.push.apply(Mt,e)}function bg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var s=n[a],o=s.getSnapshot;s=s.value;try{if(!on(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Dn(e,t){for(t&=~sc,t&=~Mo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-an(t),a=1<<n;e[n]=-1,t&=~a}}function Ld(e){if(Me&6)throw Error(G(327));Or();var t=Ws(e,0);if(!(t&1))return Tt(e,nt()),null;var n=oo(e,t);if(e.tag!==0&&n===2){var a=Ai(e);a!==0&&(t=a,n=ul(e,a))}if(n===1)throw n=Ba,cr(e,0),Dn(e,t),Tt(e,nt()),n;if(n===6)throw Error(G(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,ar(e,Mt,kn),Tt(e,nt()),null}function ic(e,t){var n=Me;Me|=1;try{return e(t)}finally{Me=n,Me===0&&(Yr=nt()+500,_o&&tr())}}function hr(e){Wn!==null&&Wn.tag===0&&!(Me&6)&&Or();var t=Me;Me|=1;var n=Gt.transition,a=Pe;try{if(Gt.transition=null,Pe=1,e)return e()}finally{Pe=a,Gt.transition=n,Me=t,!(Me&6)&&tr()}}function lc(){Lt=Pr.current,Ue(Pr)}function cr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,q0(n)),st!==null)for(n=st.return;n!==null;){var a=n;switch(Wl(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&Gs();break;case 3:Ur(),Ue($t),Ue(kt),Ql();break;case 5:ql(a);break;case 4:Ur();break;case 13:Ue(Ge);break;case 19:Ue(Ge);break;case 10:Yl(a.type._context);break;case 22:case 23:lc()}n=n.return}if(ut=e,st=e=qn(e.current,null),ht=Lt=t,ct=0,Ba=null,sc=Mo=gr=0,Mt=ja=null,or!==null){for(t=0;t<or.length;t++)if(n=or[t],a=n.interleaved,a!==null){n.interleaved=null;var s=a.next,o=n.pending;if(o!==null){var i=o.next;o.next=s,a.next=i}n.pending=a}or=null}return e}function bm(e,t){do{var n=st;try{if(Hl(),Es.current=no,to){for(var a=Ke.memoizedState;a!==null;){var s=a.queue;s!==null&&(s.pending=null),a=a.next}to=!1}if(fr=0,dt=lt=Ke=null,wa=!1,Oa=0,ac.current=null,n===null||n.return===null){ct=1,Ba=t,st=null;break}e:{var o=e,i=n.return,c=n,l=t;if(t=ht,c.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=l,p=c,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var u=p.alternate;u?(p.updateQueue=u.updateQueue,p.memoizedState=u.memoizedState,p.lanes=u.lanes):(p.updateQueue=null,p.memoizedState=null)}var x=jd(i);if(x!==null){x.flags&=-257,_d(x,i,c,o,t),x.mode&1&&kd(o,d,t),t=x,l=d;var y=t.updateQueue;if(y===null){var j=new Set;j.add(l),t.updateQueue=j}else y.add(l);break e}else{if(!(t&1)){kd(o,d,t),cc();break e}l=Error(G(426))}}else if(Ye&&c.mode&1){var N=jd(i);if(N!==null){!(N.flags&65536)&&(N.flags|=256),_d(N,i,c,o,t),Vl(Hr(l,c));break e}}o=l=Hr(l,c),ct!==4&&(ct=2),ja===null?ja=[o]:ja.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=rm(o,l,t);hd(o,v);break e;case 1:c=l;var h=o.type,g=o.stateNode;if(!(o.flags&128)&&(typeof h.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Xn===null||!Xn.has(g)))){o.flags|=65536,t&=-t,o.lanes|=t;var _=am(o,c,t);hd(o,_);break e}}o=o.return}while(o!==null)}jm(n)}catch(S){t=S,st===n&&n!==null&&(st=n=n.return);continue}break}while(!0)}function wm(){var e=ro.current;return ro.current=no,e===null?no:e}function cc(){(ct===0||ct===3||ct===2)&&(ct=4),ut===null||!(gr&268435455)&&!(Mo&268435455)||Dn(ut,ht)}function oo(e,t){var n=Me;Me|=2;var a=wm();(ut!==e||ht!==t)&&(kn=null,cr(e,t));do try{wg();break}catch(s){bm(e,s)}while(!0);if(Hl(),Me=n,ro.current=a,st!==null)throw Error(G(261));return ut=null,ht=0,ct}function wg(){for(;st!==null;)km(st)}function kg(){for(;st!==null&&!Gf();)km(st)}function km(e){var t=Nm(e.alternate,e,Lt);e.memoizedProps=e.pendingProps,t===null?jm(e):st=t,ac.current=null}function jm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=gg(n,t),n!==null){n.flags&=32767,st=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ct=6,st=null;return}}else if(n=fg(n,t,Lt),n!==null){st=n;return}if(t=t.sibling,t!==null){st=t;return}st=t=e}while(t!==null);ct===0&&(ct=5)}function ar(e,t,n){var a=Pe,s=Gt.transition;try{Gt.transition=null,Pe=1,jg(e,t,n,a)}finally{Gt.transition=s,Pe=a}return null}function jg(e,t,n,a){do Or();while(Wn!==null);if(Me&6)throw Error(G(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(G(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(r0(e,o),e===ut&&(st=ut=null,ht=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||fs||(fs=!0,Sm(Bs,function(){return Or(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Gt.transition,Gt.transition=null;var i=Pe;Pe=1;var c=Me;Me|=4,ac.current=null,xg(e,n),xm(n,e),V0(Vi),Vs=!!Wi,Vi=Wi=null,e.current=n,vg(n),Xf(),Me=c,Pe=i,Gt.transition=o}else e.current=n;if(fs&&(fs=!1,Wn=e,so=s),o=e.pendingLanes,o===0&&(Xn=null),Qf(n.stateNode),Tt(e,nt()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],a(s.value,{componentStack:s.stack,digest:s.digest});if(ao)throw ao=!1,e=cl,cl=null,e;return so&1&&e.tag!==0&&Or(),o=e.pendingLanes,o&1?e===dl?_a++:(_a=0,dl=e):_a=0,tr(),null}function Or(){if(Wn!==null){var e=rp(so),t=Gt.transition,n=Pe;try{if(Gt.transition=null,Pe=16>e?16:e,Wn===null)var a=!1;else{if(e=Wn,Wn=null,so=0,Me&6)throw Error(G(331));var s=Me;for(Me|=4,te=e.current;te!==null;){var o=te,i=o.child;if(te.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var d=c[l];for(te=d;te!==null;){var p=te;switch(p.tag){case 0:case 11:case 15:ka(8,p,o)}var f=p.child;if(f!==null)f.return=p,te=f;else for(;te!==null;){p=te;var u=p.sibling,x=p.return;if(fm(p),p===d){te=null;break}if(u!==null){u.return=x,te=u;break}te=x}}}var y=o.alternate;if(y!==null){var j=y.child;if(j!==null){y.child=null;do{var N=j.sibling;j.sibling=null,j=N}while(j!==null)}}te=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,te=i;else e:for(;te!==null;){if(o=te,o.flags&2048)switch(o.tag){case 0:case 11:case 15:ka(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,te=v;break e}te=o.return}}var h=e.current;for(te=h;te!==null;){i=te;var g=i.child;if(i.subtreeFlags&2064&&g!==null)g.return=i,te=g;else e:for(i=h;te!==null;){if(c=te,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Co(9,c)}}catch(S){et(c,c.return,S)}if(c===i){te=null;break e}var _=c.sibling;if(_!==null){_.return=c.return,te=_;break e}te=c.return}}if(Me=s,tr(),fn&&typeof fn.onPostCommitFiberRoot=="function")try{fn.onPostCommitFiberRoot(yo,e)}catch{}a=!0}return a}finally{Pe=n,Gt.transition=t}}return!1}function Ad(e,t,n){t=Hr(n,t),t=rm(e,t,1),e=Gn(e,t,1),t=_t(),e!==null&&(Ga(e,1,t),Tt(e,t))}function et(e,t,n){if(e.tag===3)Ad(e,e,n);else for(;t!==null;){if(t.tag===3){Ad(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Xn===null||!Xn.has(a))){e=Hr(n,e),e=am(t,e,1),t=Gn(t,e,1),e=_t(),t!==null&&(Ga(t,1,e),Tt(t,e));break}}t=t.return}}function _g(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=_t(),e.pingedLanes|=e.suspendedLanes&n,ut===e&&(ht&n)===n&&(ct===4||ct===3&&(ht&130023424)===ht&&500>nt()-oc?cr(e,0):sc|=n),Tt(e,t)}function _m(e,t){t===0&&(e.mode&1?(t=as,as<<=1,!(as&130023424)&&(as=4194304)):t=1);var n=_t();e=En(e,t),e!==null&&(Ga(e,t,n),Tt(e,n))}function Ng(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),_m(e,n)}function Sg(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(G(314))}a!==null&&a.delete(t),_m(e,n)}var Nm;Nm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||$t.current)Et=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Et=!1,mg(e,t,n);Et=!!(e.flags&131072)}else Et=!1,Ye&&t.flags&1048576&&Ep(t,qs,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;$s(e,t),e=t.pendingProps;var s=Br(t,kt.current);Ar(t,n),s=Jl(null,t,a,e,s,n);var o=ec();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Pt(a)?(o=!0,Xs(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Xl(t),s.updater=So,t.stateNode=s,s._reactInternals=t,Zi(t,a,e,n),t=tl(null,t,a,!0,o,n)):(t.tag=0,Ye&&o&&Bl(t),jt(null,t,s,n),t=t.child),t;case 16:a=t.elementType;e:{switch($s(e,t),e=t.pendingProps,s=a._init,a=s(a._payload),t.type=a,s=t.tag=Mg(a),e=Jt(a,e),s){case 0:t=el(null,t,a,e,n);break e;case 1:t=Cd(null,t,a,e,n);break e;case 11:t=Nd(null,t,a,e,n);break e;case 14:t=Sd(null,t,a,Jt(a.type,e),n);break e}throw Error(G(306,a,""))}return t;case 0:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Jt(a,s),el(e,t,a,s,n);case 1:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Jt(a,s),Cd(e,t,a,s,n);case 3:e:{if(lm(t),e===null)throw Error(G(387));a=t.pendingProps,o=t.memoizedState,s=o.element,Ip(e,t),Js(t,a,null,n);var i=t.memoizedState;if(a=i.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=Hr(Error(G(423)),t),t=Md(e,t,a,n,s);break e}else if(a!==s){s=Hr(Error(G(424)),t),t=Md(e,t,a,n,s);break e}else for(At=Yn(t.stateNode.containerInfo.firstChild),Ot=t,Ye=!0,tn=null,n=Tp(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Wr(),a===s){t=zn(e,t,n);break e}jt(e,t,a,n)}t=t.child}return t;case 5:return Lp(t),e===null&&Ki(t),a=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,Ui(a,s)?i=null:o!==null&&Ui(a,o)&&(t.flags|=32),im(e,t),jt(e,t,i,n),t.child;case 6:return e===null&&Ki(t),null;case 13:return cm(e,t,n);case 4:return Kl(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Vr(t,null,a,n):jt(e,t,a,n),t.child;case 11:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Jt(a,s),Nd(e,t,a,s,n);case 7:return jt(e,t,t.pendingProps,n),t.child;case 8:return jt(e,t,t.pendingProps.children,n),t.child;case 12:return jt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,Oe(Qs,a._currentValue),a._currentValue=i,o!==null)if(on(o.value,i)){if(o.children===s.children&&!$t.current){t=zn(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){i=o.child;for(var l=c.firstContext;l!==null;){if(l.context===a){if(o.tag===1){l=Sn(-1,n&-n),l.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var p=d.pending;p===null?l.next=l:(l.next=p.next,p.next=l),d.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),qi(o.return,n,t),c.lanes|=n;break}l=l.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(G(341));i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),qi(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}jt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,a=t.pendingProps.children,Ar(t,n),s=Xt(s),a=a(s),t.flags|=1,jt(e,t,a,n),t.child;case 14:return a=t.type,s=Jt(a,t.pendingProps),s=Jt(a.type,s),Sd(e,t,a,s,n);case 15:return sm(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:Jt(a,s),$s(e,t),t.tag=1,Pt(a)?(e=!0,Xs(t)):e=!1,Ar(t,n),nm(t,a,s),Zi(t,a,s,n),tl(null,t,a,!0,e,n);case 19:return dm(e,t,n);case 22:return om(e,t,n)}throw Error(G(156,t.tag))};function Sm(e,t){return Ju(e,t)}function Cg(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yt(e,t,n,a){return new Cg(e,t,n,a)}function dc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mg(e){if(typeof e=="function")return dc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===El)return 11;if(e===zl)return 14}return 2}function qn(e,t){var n=e.alternate;return n===null?(n=Yt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Rs(e,t,n,a,s,o){var i=2;if(a=e,typeof e=="function")dc(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case kr:return dr(n.children,s,o,t);case Ml:i=8,s|=8;break;case ki:return e=Yt(12,n,t,s|2),e.elementType=ki,e.lanes=o,e;case ji:return e=Yt(13,n,t,s),e.elementType=ji,e.lanes=o,e;case _i:return e=Yt(19,n,t,s),e.elementType=_i,e.lanes=o,e;case Lu:return Eo(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ru:i=10;break e;case Iu:i=9;break e;case El:i=11;break e;case zl:i=14;break e;case Ln:i=16,a=null;break e}throw Error(G(130,e==null?e:typeof e,""))}return t=Yt(i,n,t,s),t.elementType=e,t.type=a,t.lanes=o,t}function dr(e,t,n,a){return e=Yt(7,e,a,t),e.lanes=n,e}function Eo(e,t,n,a){return e=Yt(22,e,a,t),e.elementType=Lu,e.lanes=n,e.stateNode={isHidden:!1},e}function ci(e,t,n){return e=Yt(6,e,null,t),e.lanes=n,e}function di(e,t,n){return t=Yt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Eg(e,t,n,a,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Uo(0),this.expirationTimes=Uo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uo(0),this.identifierPrefix=a,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function uc(e,t,n,a,s,o,i,c,l){return e=new Eg(e,t,n,c,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Yt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Xl(o),e}function zg(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:wr,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function Cm(e){if(!e)return Zn;e=e._reactInternals;e:{if(yr(e)!==e||e.tag!==1)throw Error(G(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Pt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(G(171))}if(e.tag===1){var n=e.type;if(Pt(n))return Cp(e,n,t)}return t}function Mm(e,t,n,a,s,o,i,c,l){return e=uc(n,a,!0,e,s,o,i,c,l),e.context=Cm(null),n=e.current,a=_t(),s=Kn(n),o=Sn(a,s),o.callback=t??null,Gn(n,o,s),e.current.lanes=s,Ga(e,s,a),Tt(e,a),e}function zo(e,t,n,a){var s=t.current,o=_t(),i=Kn(s);return n=Cm(n),t.context===null?t.context=n:t.pendingContext=n,t=Sn(o,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=Gn(s,t,i),e!==null&&(sn(e,s,i,o),Ms(e,s,i)),i}function io(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Od(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function pc(e,t){Od(e,t),(e=e.alternate)&&Od(e,t)}function $g(){return null}var Em=typeof reportError=="function"?reportError:function(e){console.error(e)};function mc(e){this._internalRoot=e}$o.prototype.render=mc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(G(409));zo(e,t,null,null)};$o.prototype.unmount=mc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;hr(function(){zo(null,e,null,null)}),t[Mn]=null}};function $o(e){this._internalRoot=e}$o.prototype.unstable_scheduleHydration=function(e){if(e){var t=op();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Fn.length&&t!==0&&t<Fn[n].priority;n++);Fn.splice(n,0,e),n===0&&lp(e)}};function fc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Po(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Fd(){}function Pg(e,t,n,a,s){if(s){if(typeof a=="function"){var o=a;a=function(){var d=io(i);o.call(d)}}var i=Mm(t,a,e,0,null,!1,!1,"",Fd);return e._reactRootContainer=i,e[Mn]=i.current,Ta(e.nodeType===8?e.parentNode:e),hr(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof a=="function"){var c=a;a=function(){var d=io(l);c.call(d)}}var l=uc(e,0,!1,null,null,!1,!1,"",Fd);return e._reactRootContainer=l,e[Mn]=l.current,Ta(e.nodeType===8?e.parentNode:e),hr(function(){zo(t,l,n,a)}),l}function To(e,t,n,a,s){var o=n._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var c=s;s=function(){var l=io(i);c.call(l)}}zo(t,i,e,s)}else i=Pg(n,t,e,s,a);return io(i)}ap=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ua(t.pendingLanes);n!==0&&(Tl(t,n|1),Tt(t,nt()),!(Me&6)&&(Yr=nt()+500,tr()))}break;case 13:hr(function(){var a=En(e,1);if(a!==null){var s=_t();sn(a,e,1,s)}}),pc(e,1)}};Rl=function(e){if(e.tag===13){var t=En(e,134217728);if(t!==null){var n=_t();sn(t,e,134217728,n)}pc(e,134217728)}};sp=function(e){if(e.tag===13){var t=Kn(e),n=En(e,t);if(n!==null){var a=_t();sn(n,e,t,a)}pc(e,t)}};op=function(){return Pe};ip=function(e,t){var n=Pe;try{return Pe=e,t()}finally{Pe=n}};Ri=function(e,t,n){switch(t){case"input":if(Ci(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var s=jo(a);if(!s)throw Error(G(90));Ou(a),Ci(a,s)}}}break;case"textarea":Du(e,n);break;case"select":t=n.value,t!=null&&Tr(e,!!n.multiple,t,!1)}};Gu=ic;Xu=hr;var Tg={usingClientEntryPoint:!1,Events:[Ka,Sr,jo,Hu,Yu,ic]},sa={findFiberByHostInstance:sr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Rg={bundleType:sa.bundleType,version:sa.version,rendererPackageName:sa.rendererPackageName,rendererConfig:sa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Pn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Qu(e),e===null?null:e.stateNode},findFiberByHostInstance:sa.findFiberByHostInstance||$g,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gs.isDisabled&&gs.supportsFiber)try{yo=gs.inject(Rg),fn=gs}catch{}}Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Tg;Dt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!fc(t))throw Error(G(200));return zg(e,t,null,n)};Dt.createRoot=function(e,t){if(!fc(e))throw Error(G(299));var n=!1,a="",s=Em;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=uc(e,1,!1,null,null,n,!1,a,s),e[Mn]=t.current,Ta(e.nodeType===8?e.parentNode:e),new mc(t)};Dt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(G(188)):(e=Object.keys(e).join(","),Error(G(268,e)));return e=Qu(t),e=e===null?null:e.stateNode,e};Dt.flushSync=function(e){return hr(e)};Dt.hydrate=function(e,t,n){if(!Po(t))throw Error(G(200));return To(null,e,t,!0,n)};Dt.hydrateRoot=function(e,t,n){if(!fc(e))throw Error(G(405));var a=n!=null&&n.hydratedSources||null,s=!1,o="",i=Em;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Mm(t,null,e,1,n??null,s,!1,o,i),e[Mn]=t.current,Ta(e),a)for(e=0;e<a.length;e++)n=a[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new $o(t)};Dt.render=function(e,t,n){if(!Po(t))throw Error(G(200));return To(null,e,t,!1,n)};Dt.unmountComponentAtNode=function(e){if(!Po(e))throw Error(G(40));return e._reactRootContainer?(hr(function(){To(null,null,e,!1,function(){e._reactRootContainer=null,e[Mn]=null})}),!0):!1};Dt.unstable_batchedUpdates=ic;Dt.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!Po(n))throw Error(G(200));if(e==null||e._reactInternals===void 0)throw Error(G(38));return To(e,t,n,!1,a)};Dt.version="18.3.1-next-f1338f8080-20240426";function zm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zm)}catch(e){console.error(e)}}zm(),zu.exports=Dt;var $m=zu.exports,Dd=$m;bi.createRoot=Dd.createRoot,bi.hydrateRoot=Dd.hydrateRoot;const ui={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.settings":"Settings","nav.more":"More","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","vm.open_pve":"Open in PVE Manager","vm.console":"Console (noVNC)","vm.snapshots":"Snapshots","vm.backup_now":"Backup now","vm.start":"Start","vm.shutdown_acpi":"Shutdown (ACPI)","vm.reboot":"Reboot","vm.stop_hard":"Stop (hard)","vm.migrate_remote":"Migrate to other cluster…","confirm.destructive":"// DESTRUCTIVE ACTION","confirm.about_to_vm":"You are about to {action} VM {vmid} ({name}) on node {node} ({cluster}).","confirm.about_to_ct":"You are about to {action} CT {vmid} ({name}) on node {node} ({cluster}).","confirm.hard_stop_warning":"Hard power-off bypasses guest OS shutdown. Unsaved data may be lost.","user.account_password":"Account settings","user.totp":"Two-factor (TOTP)","user.audit":"Audit log","user.sessions":"Active sessions","user.sign_out":"Sign out","rmm.title":"Migrate VM {vmid} ({name}) → other cluster","rmm.eyebrow":"// cross-cluster migrate · {step}","rmm.step.endpoint":"endpoint","rmm.step.mappings":"mappings","rmm.step.review":"review","rmm.step.submitting":"submitting","rmm.step.done":"done","rmm.step.error":"error","rmm.endpoint.intro":"Pick the target cluster's reachable IP. Once selected we auto-fetch the target node's storages, bridges, and IPs so the next step is all dropdowns.","rmm.endpoint.target":"Target endpoint","rmm.endpoint.select":"— select —","rmm.endpoint.fp_label":"TLS fingerprint (SHA-256, auto-fetched)","rmm.endpoint.fp_fetching":"fetching…","rmm.endpoint.datapath":"Migration data-path IP","rmm.endpoint.datapath_hint":"where the bytes ride","rmm.endpoint.datapath_loading":"loading interfaces…","rmm.endpoint.datapath_tip":"Pick the dedicated migration network (e.g. 172.16.100.x) so the disk mirror and memory stream do not saturate the management link.","rmm.mappings.intro":"Map each source disk and NIC to a target. Defaults pick a same-name target when available.","rmm.mappings.target_vmid":"Target VMID","rmm.mappings.target_vmid_hint":"must be free on remote","rmm.mappings.disks":"Disks → target storage","rmm.mappings.nics":"NICs → target bridge","rmm.mappings.col_source":"SOURCE","rmm.mappings.col_size":"SIZE","rmm.mappings.col_bridge":"BRIDGE","rmm.mappings.col_target_storage":"→ TARGET STORAGE","rmm.mappings.col_target_bridge":"→ TARGET BRIDGE","rmm.mappings.online":"Online (live) migration","rmm.mappings.delete_source":"Delete source after success","rmm.mappings.bwlimit":"Bandwidth limit (KB/s, blank = unlimited)","rmm.review.intro":"Final review — submitting starts a real PVE remote_migrate task.","rmm.review.from":"From","rmm.review.to":"To","rmm.review.data_path":"Data path","rmm.review.fingerprint":"Fingerprint","rmm.review.fp_none":"none — server will fetch","rmm.review.storage_map":"Storage map","rmm.review.bridge_map":"Bridge map","rmm.review.online":"Online","rmm.review.online_yes":"yes (live)","rmm.review.online_no":"no (offline)","rmm.review.delete_source":"Delete source","rmm.review.delete_source_yes":"yes","rmm.review.delete_source_no":"no — leave source intact","rmm.review.bandwidth":"Bandwidth","rmm.review.unlimited":"unlimited","rmm.action.next":"Next »","rmm.action.back":"« Back","rmm.action.review":"Review »","rmm.action.start":"Start migration »","rmm.submitting":"Submitting to PVE…","rmm.done.msg":"Migration task started.","rmm.done.upid":"UPID","rmm.done.hint":"Watch progress in the Matrix view; the source VM shows a migration task badge.","rmm.action.close":"Close","rmm.precheck.running":"Running pre-flight checks…","rmm.precheck.blockers":"Migration blocked","rmm.precheck.warnings":"Warnings — review before continuing","rmm.precheck.ok":"Pre-flight OK","rmm.action.precheck":"Re-check","dialog.notice":"Notice","dialog.confirm":"Confirm","dialog.input":"Input","dialog.ok":"OK","dialog.confirm_btn":"Confirm","console.disabled":"Console is disabled in settings.","console.vm_not_running":"VM must be running to open the console.","console.stored_no_pw":"Console mode is 'stored' but no PVE password has been set for this cluster. Set one in Settings → Clusters.","console.prompt_title":"Console password","console.prompt_body":"Enter the PVE password for {user}@{cluster}. Used once to mint a console token; never persisted.","console.prompt_label":"PVE password","console.prompt_open":"Open console »","console.prepare_failed":"Could not prepare console: {err}","settings.cluster_pve_password":"PVE password","settings.secret_set":"✓ configured","settings.secret_unset":"✗ not set","settings.secret_set_btn":"Set","settings.secret_replace":"Replace","settings.secret_clear":"Clear","settings.secret_confirm_clear":"Clear PVE password for cluster {id}?","settings.secret_pw_title":"PVE password — {id}","settings.secret_pw_body":"Stored encrypted in the local SQLite store under /etc/jt-proxense/master.key. Never written to config.yaml.","settings.secret_pw_label":"PVE root password","settings.console_section":"Console (noVNC)","settings.console_mode":"Authentication mode","settings.console_mode_disabled":"Disabled — show as unavailable","settings.console_mode_stored":"Stored — use cluster's saved password","settings.console_mode_prompt":"Prompt — ask each time","settings.console_mode_hint":"PVE's vncwebsocket refuses API tokens. We mint a PVEAuthCookie from a username+password instead.","mig.failed.title":"Migration failed","mig.failed.body":'VM {vmid} migration to {target} ended with errors. Source VM may be left in a "{lock}" lock state — clear it manually on the source node.',"mig.failed.cmd_hint":"Run on the source node:","mig.failed.copy":"Copy command","mig.failed.copied":"Copied","mig.failed.dismiss":"Dismiss","snap.title":"Snapshots — VM {vmid} ({name})","snap.create":"Create snapshot","snap.name":"Name","snap.description":"Description (optional)","snap.include_state":"Include RAM state","snap.rollback":"Rollback","snap.delete":"Delete","snap.confirm_delete":'Delete snapshot "{name}"?',"snap.confirm_rollback":'Rollback to "{name}"? The VM will revert to that point in time.',"snap.empty":"No snapshots yet.","snap.parent":"parent","snap.taken":"taken","backup.title":"Backup VM {vmid} ({name})","backup.storage":"Target storage","backup.no_backup_storage":"No backup-capable storage on this node.","backup.mode":"Mode","backup.mode_snapshot":"snapshot (zero downtime)","backup.mode_suspend":"suspend (brief pause)","backup.mode_stop":"stop (full stop)","backup.compress":"Compression","backup.start":"Start backup","backup.started":"Backup task started.","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.settings":"設定","nav.more":"更多","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","vm.open_pve":"在 PVE Manager 開啟","vm.console":"主控台 (noVNC)","vm.snapshots":"快照","vm.backup_now":"立即備份","vm.start":"啟動","vm.shutdown_acpi":"關機 (ACPI)","vm.reboot":"重新啟動","vm.stop_hard":"強制停止","vm.migrate_remote":"遷移到其他叢集…","confirm.destructive":"// 危險動作","confirm.about_to_vm":"您即將對節點 {node} ({cluster}) 上的 VM {vmid} ({name}) 執行 {action}。","confirm.about_to_ct":"您即將對節點 {node} ({cluster}) 上的 CT {vmid} ({name}) 執行 {action}。","confirm.hard_stop_warning":"硬關機會跳過 Guest OS 的關機程序，未儲存資料可能遺失。","user.account_password":"帳號設定","user.totp":"雙因素認證 (TOTP)","user.audit":"稽核記錄","user.sessions":"使用中工作階段","user.sign_out":"登出","rmm.title":"遷移 VM {vmid} ({name}) → 其他叢集","rmm.eyebrow":"// 跨叢集遷移 · {step}","rmm.step.endpoint":"端點","rmm.step.mappings":"對應","rmm.step.review":"檢閱","rmm.step.submitting":"送出中","rmm.step.done":"完成","rmm.step.error":"錯誤","rmm.endpoint.intro":"選擇目標叢集的可連線 IP。選擇後會自動抓取目標節點的儲存區、橋接、IP 列表，下一步即可選單操作。","rmm.endpoint.target":"目標端點","rmm.endpoint.select":"— 請選擇 —","rmm.endpoint.fp_label":"TLS 指紋 (SHA-256, 自動抓取)","rmm.endpoint.fp_fetching":"抓取中…","rmm.endpoint.datapath":"遷移資料路徑 IP","rmm.endpoint.datapath_hint":"資料走哪一段網路","rmm.endpoint.datapath_loading":"載入介面中…","rmm.endpoint.datapath_tip":"建議選擇專用的遷移網路 (如 172.16.100.x)，避免磁碟鏡像與記憶體串流佔滿管理網路。","rmm.mappings.intro":"為每個來源磁碟與網卡選擇目標。若同名選項存在，會預設為同名。","rmm.mappings.target_vmid":"目標 VMID","rmm.mappings.target_vmid_hint":"在遠端必須未被使用","rmm.mappings.disks":"磁碟 → 目標儲存區","rmm.mappings.nics":"網卡 → 目標橋接","rmm.mappings.col_source":"來源","rmm.mappings.col_size":"大小","rmm.mappings.col_bridge":"橋接","rmm.mappings.col_target_storage":"→ 目標儲存區","rmm.mappings.col_target_bridge":"→ 目標橋接","rmm.mappings.online":"線上 (即時) 遷移","rmm.mappings.delete_source":"成功後刪除來源","rmm.mappings.bwlimit":"頻寬限制 (KB/s, 空白 = 無限制)","rmm.review.intro":"最終確認 — 送出後會在 PVE 啟動真實的遷移作業。","rmm.review.from":"來源","rmm.review.to":"目標","rmm.review.data_path":"資料路徑","rmm.review.fingerprint":"TLS 指紋","rmm.review.fp_none":"無 — 伺服器將自動抓取","rmm.review.storage_map":"儲存對應","rmm.review.bridge_map":"橋接對應","rmm.review.online":"線上","rmm.review.online_yes":"是 (即時)","rmm.review.online_no":"否 (離線)","rmm.review.delete_source":"刪除來源","rmm.review.delete_source_yes":"是","rmm.review.delete_source_no":"否 — 保留來源","rmm.review.bandwidth":"頻寬","rmm.review.unlimited":"無限制","rmm.action.next":"下一步 »","rmm.action.back":"« 上一步","rmm.action.review":"檢閱 »","rmm.action.start":"開始遷移 »","rmm.submitting":"送出至 PVE 中…","rmm.done.msg":"遷移作業已啟動。","rmm.done.upid":"UPID","rmm.done.hint":"可在 Matrix 畫面追蹤進度；來源 VM 會顯示遷移作業標籤。","rmm.action.close":"關閉","rmm.precheck.running":"執行遷移前置檢查中…","rmm.precheck.blockers":"遷移被阻擋","rmm.precheck.warnings":"警告 — 繼續前請確認","rmm.precheck.ok":"前置檢查通過","rmm.action.precheck":"重新檢查","dialog.notice":"通知","dialog.confirm":"確認","dialog.input":"輸入","dialog.ok":"確定","dialog.confirm_btn":"確認","console.disabled":"主控台功能已於設定中停用。","console.vm_not_running":"VM 必須在運作中才能開啟主控台。","console.stored_no_pw":"主控台模式為 stored，但此叢集尚未設定 PVE 密碼。請至「設定 → 叢集」設定。","console.prompt_title":"主控台密碼","console.prompt_body":"請輸入 {cluster} 上 {user} 的 PVE 密碼。此密碼僅用於換取一次性 console 票，伺服器不會保存。","console.prompt_label":"PVE 密碼","console.prompt_open":"開啟主控台 »","console.prepare_failed":"無法準備主控台：{err}","settings.cluster_pve_password":"PVE 密碼","settings.secret_set":"✓ 已設定","settings.secret_unset":"✗ 未設定","settings.secret_set_btn":"設定","settings.secret_replace":"更換","settings.secret_clear":"清除","settings.secret_confirm_clear":"清除叢集 {id} 的 PVE 密碼？","settings.secret_pw_title":"PVE 密碼 — {id}","settings.secret_pw_body":"加密後儲存於本機 SQLite，金鑰在 /etc/jt-proxense/master.key。不會寫入 config.yaml。","settings.secret_pw_label":"PVE root 密碼","settings.console_section":"主控台 (noVNC)","settings.console_mode":"認證方式","settings.console_mode_disabled":"停用 — 顯示為無法使用","settings.console_mode_stored":"stored — 使用叢集已存的密碼","settings.console_mode_prompt":"prompt — 每次詢問","settings.console_mode_hint":"PVE 的 vncwebsocket 不接受 API token，因此必須用 username+password 換取 PVEAuthCookie。","mig.failed.title":"遷移失敗","mig.failed.body":"VM {vmid} 遷移至 {target} 失敗。來源 VM 可能仍處於「{lock}」鎖定狀態，需要在來源節點手動清除。","mig.failed.cmd_hint":"請在來源節點執行：","mig.failed.copy":"複製指令","mig.failed.copied":"已複製","mig.failed.dismiss":"關閉","snap.title":"快照 — VM {vmid} ({name})","snap.create":"建立快照","snap.name":"名稱","snap.description":"說明 (選填)","snap.include_state":"包含記憶體狀態","snap.rollback":"倒回","snap.delete":"刪除","snap.confirm_delete":"刪除快照「{name}」？","snap.confirm_rollback":"倒回到「{name}」？VM 將回到該時點的狀態。","snap.empty":"尚無快照。","snap.parent":"父層","snap.taken":"建立時間","backup.title":"備份 VM {vmid} ({name})","backup.storage":"目標儲存區","backup.no_backup_storage":"此節點沒有可用的備份儲存區。","backup.mode":"模式","backup.mode_snapshot":"snapshot (零停機)","backup.mode_suspend":"suspend (短暫暫停)","backup.mode_stop":"stop (完整停機)","backup.compress":"壓縮","backup.start":"開始備份","backup.started":"備份作業已啟動。","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},Pm=m.createContext(null);function Ig({children:e}){const[t,n]=m.useState(()=>{const o=localStorage.getItem("language");return o&&ui[o]?o:navigator.language.startsWith("zh")?"zh-TW":"en"}),a=m.useCallback(o=>{n(o),localStorage.setItem("language",o)},[]),s=m.useCallback((o,i)=>{let c=ui[t][o]||ui.en[o]||o;return i&&Object.entries(i).forEach(([l,d])=>{c=c.replace(`{${l}}`,String(d))}),c},[t]);return r.jsx(Pm.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}function Te(){const e=m.useContext(Pm);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}const Tm=m.createContext(null);function Ro(){const e=m.useContext(Tm);return e||(typeof console<"u"&&console.warn("useDialogs called outside DialogProvider — falling back to native."),{alert:t=>(window.alert(t),Promise.resolve()),confirm:t=>Promise.resolve(window.confirm(t)),prompt:(t,n)=>Promise.resolve(window.prompt(t,(n==null?void 0:n.defaultValue)??""))})}function Lg({children:e}){const{t}=Te(),[n,a]=m.useState(null),[s,o]=m.useState(""),i=m.useRef(null),c=m.useCallback(f=>{n&&(n.resolve(f),a(null),o(""))},[n]),l=m.useCallback((f,u={})=>new Promise(x=>{a({kind:"alert",title:u.title||t("dialog.notice"),body:f,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:()=>x()})}),[t]),d=m.useCallback((f,u={})=>new Promise(x=>{a({kind:"confirm",title:u.title||t("dialog.confirm"),body:f,destructive:!!u.destructive,inputType:"text",placeholder:"",resolve:y=>x(!!y)})}),[t]),p=m.useCallback((f,u={})=>new Promise(x=>{o(u.defaultValue||""),a({kind:"prompt",title:u.title||t("dialog.input"),body:f,destructive:!!u.destructive,inputType:u.inputType||"text",placeholder:u.placeholder||"",resolve:y=>x(y===null?null:String(y))})}),[t]);return m.useEffect(()=>{if(!n)return;const f=u=>{u.key==="Escape"?c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0):u.key==="Enter"&&n.kind!=="alert"?(u.preventDefault(),c(n.kind==="prompt"?s:!0)):u.key==="Enter"&&n.kind==="alert"&&c(void 0)};return document.addEventListener("keydown",f),n.kind==="prompt"&&setTimeout(()=>{var u;return(u=i.current)==null?void 0:u.focus()},50),()=>document.removeEventListener("keydown",f)},[n,s,c]),r.jsxs(Tm.Provider,{value:{alert:l,confirm:d,prompt:p},children:[e,n&&r.jsxs("div",{onClick:()=>c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0),style:Ag,children:[r.jsx("style",{children:Og}),r.jsxs("div",{className:`jtd-modal ${n.destructive?"destructive":""}`,onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"jtd-eyebrow",children:["// ",n.kind]}),r.jsx("h3",{className:"jtd-title",children:n.title}),r.jsx("p",{className:"jtd-body",children:n.body}),n.kind==="prompt"&&r.jsx("input",{ref:i,type:n.inputType,value:s,placeholder:n.placeholder,onChange:f=>o(f.target.value),spellCheck:!1,autoComplete:"off"}),r.jsxs("div",{className:"jtd-actions",children:[n.kind!=="alert"&&r.jsx("button",{className:"ghost",onClick:()=>c(n.kind==="prompt"?null:!1),children:t("action.cancel")}),r.jsx("button",{className:`primary ${n.destructive?"destructive":""}`,onClick:()=>c(n.kind==="prompt"?s:!0),children:n.kind==="alert"?t("dialog.ok"):n.kind==="confirm"?t("dialog.confirm_btn"):t("action.save")})]})]})]})]})}const Ag={position:"fixed",inset:0,zIndex:5e3,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"jtdFade .18s ease"},Og=`
@keyframes jtdFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes jtdSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.jtd-modal {
  width: min(440px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 22px 24px; animation: jtdSlide .2s ease;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.jtd-modal.destructive {
  border-color: rgba(255,56,96,.45);
  box-shadow: 0 0 0 1px rgba(255,56,96,.12), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(255,56,96,.55);
}
.jtd-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 12px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.jtd-modal.destructive .jtd-eyebrow { color: #ff3860; }
.jtd-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 17px; letter-spacing: .06em; margin: 0 0 10px; }
.jtd-body { color: #c8d8ec; font-size: 15px; line-height: 1.55; margin: 0 0 14px; white-space: pre-wrap; }
.jtd-modal input {
  width: 100%; padding: 10px 14px; margin-bottom: 6px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.jtd-modal input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
.jtd-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.jtd-actions button {
  padding: 9px 18px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.jtd-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.jtd-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.jtd-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.jtd-actions button.primary.destructive { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
`;function Fg(e={}){const{onMessage:t,onConnect:n,onDisconnect:a,onError:s,reconnectInterval:o=2e3,pingInterval:i=5e3}=e,c=m.useRef(null),l=m.useRef(null),d=m.useRef(null),p=m.useRef(t),[f,u]=m.useState({connected:!1,connecting:!1,lastMessageTime:0});p.current=t;const x=m.useCallback(()=>{const v=window.location.protocol==="https:"?"wss:":"ws:",h=window.location.host;return`${v}//${h}/ws`},[]),y=m.useCallback(()=>{var h;if(((h=c.current)==null?void 0:h.readyState)===WebSocket.OPEN)return;u(g=>({...g,connecting:!0}));const v=new WebSocket(x());c.current=v,v.onopen=()=>{u({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{v.readyState===WebSocket.OPEN&&v.send(JSON.stringify({type:"ping"}))},i)},v.onmessage=g=>{var _;try{const S=JSON.parse(g.data);u(P=>({...P,lastMessageTime:Date.now()})),(S.type==="initial"||S.type==="update")&&(_=S.data)!=null&&_.clusters&&p.current&&p.current(S.data.clusters)}catch(S){console.error("[WS] Failed to parse message:",S)}},v.onerror=g=>{console.error("[WS] Error:",g),s==null||s(g)},v.onclose=()=>{u(g=>({...g,connected:!1,connecting:!1})),a==null||a(),d.current&&(clearInterval(d.current),d.current=null),l.current&&clearTimeout(l.current),l.current=window.setTimeout(()=>{y()},o)}},[x,n,a,s,o,i]),j=m.useCallback(()=>{l.current&&(clearTimeout(l.current),l.current=null),d.current&&(clearInterval(d.current),d.current=null),c.current&&(c.current.close(),c.current=null)},[]),N=m.useCallback(v=>{var h;((h=c.current)==null?void 0:h.readyState)===WebSocket.OPEN&&c.current.send(JSON.stringify(v))},[]);return m.useEffect(()=>(y(),()=>{j()}),[y,j]),m.useEffect(()=>{const v=setInterval(()=>{const g=Date.now()-f.lastMessageTime;f.connected&&g>15e3&&(j(),y())},5e3);return()=>clearInterval(v)},[f.connected,f.lastMessageTime,y,j]),{connected:f.connected,connecting:f.connecting,lastMessageTime:f.lastMessageTime,send:N,reconnect:y,disconnect:j}}const Dg="/api";async function ke(e,t){const n=await fetch(`${Dg}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(n.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!n.ok){const a=await n.text();throw new Error(a||`HTTP ${n.status}`)}return n.json()}const Ie={authMe:()=>ke("/auth/me"),authLogin:(e,t)=>ke("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>ke("/auth/logout",{method:"POST"}),totpEnrollInit:()=>ke("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>ke("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>ke("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>ke("/config"),updateConfig:e=>ke("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>ke("/clusters"),getCluster:e=>ke(`/clusters/${e}`),getSummary:()=>ke("/summary"),getNodes:e=>ke(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>ke(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>ke(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>ke(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>ke("/health"),vmAction:(e,t,n,a)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/${a}`,{method:"POST"}),ctAction:(e,t,n,a)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${n}/${a}`,{method:"POST"}),guestAction:(e,t,n,a,s)=>a==="lxc"?Ie.ctAction(e,t,n,s):Ie.vmAction(e,t,n,s),vmMigrate:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),ctMigrate:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),bulkAction:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(n)}`),listSnapshots:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`),createSnapshot:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`,{method:"POST",body:JSON.stringify(n)}),deleteSnapshot:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}`,{method:"DELETE"}),rollbackSnapshot:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}/rollback`,{method:"POST"}),vmReset:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/reset`,{method:"POST"}),cloneVm:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/clone`,{method:"POST",body:JSON.stringify(n)}),listRemoteEndpoints:e=>ke(`/clusters/${encodeURIComponent(e)}/remote-endpoints`),fetchRemoteFingerprint:(e,t=8006)=>ke(`/remote-fingerprint?host=${encodeURIComponent(e)}&port=${t}`),triggerBackup:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/backup`,{method:"POST",body:JSON.stringify(n)}),setClusterSecret:(e,t,n)=>ke(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"POST",body:JSON.stringify({value:n})}),deleteClusterSecret:(e,t)=>ke(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"}),consolePrepare:e=>ke("/console/prepare",{method:"POST",body:JSON.stringify(e)}),migrationPrecheck:(e,t,n,a)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-precheck?target_cluster_id=${encodeURIComponent(n)}&target_node=${encodeURIComponent(a)}`),getMigrationSource:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-source`),getMigrationTargets:(e,t)=>ke(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/migration-targets`),remoteMigrate:(e,t,n)=>ke(`/clusters/${encodeURIComponent(e)}/vms/${t}/remote-migrate`,{method:"POST",body:JSON.stringify(n)})};function Ce(e,t=1){if(e===0)return"0 B";const n=1024,a=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${a[s]}`}function Xe(e,t=1){return`${e.toFixed(t)}%`}function Io(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),a>0&&s.push(`${a}m`),s.length>0?s.join(" "):"< 1m"}function he(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function ml(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function Bg({value:e,suffix:t="",className:n=""}){const a=x=>{if(typeof x=="number")return{left:x,isRatio:!1};const y=String(x).match(/^(\d+)\/(\d+)$/);if(y)return{left:parseInt(y[1]),right:parseInt(y[2]),isRatio:!0};const j=parseFloat(String(x));return isNaN(j)?{left:0,isRatio:!1}:{left:j,isRatio:!1}},s=a(e),[o,i]=m.useState(0),[c,l]=m.useState(s.right||0),d=m.useRef(null),p=m.useRef(0),f=m.useRef(!0);m.useEffect(()=>{const x=a(e);if(!f.current){i(x.left),x.right!==void 0&&l(x.right);return}const y=800,j=0,N=0;f.current=!1,d.current=null;const v=h=>{d.current||(d.current=h);const g=h-d.current,_=Math.min(g/y,1),S=1-Math.pow(1-_,3),P=j+(x.left-j)*S;if(i(Math.round(P)),x.isRatio&&x.right!==void 0){const E=N+(x.right-N)*S;l(Math.round(E))}_<1?p.current=requestAnimationFrame(v):(i(x.left),x.right!==void 0&&l(x.right))};return p.current=requestAnimationFrame(v),()=>{p.current&&cancelAnimationFrame(p.current)}},[e]);const u=s.isRatio?`${o}/${c}`:o;return r.jsxs("span",{className:`metric-value ${n}`,children:[u,t&&r.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function Bd({value:e,decimals:t=0,className:n=""}){const[a,s]=m.useState(0),o=m.useRef(null),i=m.useRef(0),c=m.useRef(!0);return m.useEffect(()=>{if(!c.current){s(e);return}const l=800,d=0;c.current=!1,o.current=null;const p=f=>{o.current||(o.current=f);const u=f-o.current,x=Math.min(u/l,1),y=1-Math.pow(1-x,3),j=d+(e-d)*y;s(j),x<1?i.current=requestAnimationFrame(p):s(e)};return i.current=requestAnimationFrame(p),()=>{i.current&&cancelAnimationFrame(i.current)}},[e]),r.jsxs("span",{className:n,children:[a.toFixed(t),"%"]})}function pi({left:e,right:t,className:n=""}){const[a,s]=m.useState(0),[o,i]=m.useState(0),c=m.useRef(null),l=m.useRef(0),d=m.useRef(!0);return m.useEffect(()=>{if(!d.current){s(e),i(t);return}const p=800,f=0,u=0;d.current=!1,c.current=null;const x=y=>{c.current||(c.current=y);const j=y-c.current,N=Math.min(j/p,1),v=1-Math.pow(1-N,3);s(Math.round(f+(e-f)*v)),i(Math.round(u+(t-u)*v)),N<1?l.current=requestAnimationFrame(x):(s(e),i(t))};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function hs({label:e,value:t,suffix:n,subValue:a,color:s="primary",icon:o}){return r.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[o&&r.jsx("div",{className:"stat-icon",children:o}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:e}),r.jsx(Bg,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),a&&r.jsx("div",{className:"stat-sub",children:a})]})]})}function mi({value:e,label:t,color:n,size:a=100}){const[s,o]=m.useState(0),i=m.useRef(null),c=m.useRef(0),l=m.useRef(!0);m.useEffect(()=>{if(!l.current){o(e);return}const N=1e3,v=0;l.current=!1,i.current=null;const h=g=>{i.current||(i.current=g);const _=g-i.current,S=Math.min(_/N,1),P=1-Math.pow(1-S,3),E=v+(e-v)*P;o(E),S<1?c.current=requestAnimationFrame(h):o(e)};return c.current=requestAnimationFrame(h),()=>{c.current&&cancelAnimationFrame(c.current)}},[e]);const d=5,p=(a-d*4)/2-8,f=(a-d)/2,u=p+(f-p)/2,x=2*Math.PI*u,y=x-s/100*x,j=Array.from({length:36},(N,v)=>{const h=(v*10-90)*(Math.PI/180),g=v%3===0,_=g?6:3,S=f-2,P=S-_;return{x1:a/2+Math.cos(h)*S,y1:a/2+Math.sin(h)*S,x2:a/2+Math.cos(h)*P,y2:a/2+Math.sin(h)*P,isMajor:g}});return r.jsxs("div",{className:"ring-gauge",children:[r.jsxs("svg",{viewBox:`0 0 ${a} ${a}`,className:"ring-svg",children:[r.jsx("circle",{className:"ring-outer-deco",cx:a/2,cy:a/2,r:f,strokeWidth:1}),j.map((N,v)=>r.jsx("line",{x1:N.x1,y1:N.y1,x2:N.x2,y2:N.y2,className:`ring-tick ${N.isMajor?"major":""}`},v)),r.jsx("circle",{className:"ring-bg",cx:a/2,cy:a/2,r:u,strokeWidth:d}),r.jsx("circle",{className:"ring-inner-deco",cx:a/2,cy:a/2,r:p,strokeWidth:1}),r.jsx("circle",{className:`ring-fill ${n}`,cx:a/2,cy:a/2,r:u,strokeWidth:d,strokeDasharray:x,strokeDashoffset:y,transform:`rotate(-90 ${a/2} ${a/2})`}),r.jsx("line",{className:"ring-sweep",x1:a/2,y1:a/2,x2:a/2,y2:a/2-u-4,transform:`rotate(${s/100*360-90} ${a/2} ${a/2})`})]}),r.jsxs("div",{className:"ring-content",children:[r.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),r.jsx("span",{className:"ring-percent",children:"%"})]}),r.jsx("span",{className:"ring-label",children:t})]})]})}function Wg({cluster:e,onClick:t}){var l,d;const{t:n}=Te(),a=e.summary;if(!a)return null;const s=he(a.total_cpu_usage),o=he(a.total_memory_usage),i=a.alerts_warning>0,c=a.alerts_critical>0;return r.jsxs("div",{className:`cluster-hex-card ${c?"critical":i?"warning":""}`,onClick:t,children:[r.jsxs("div",{className:"cluster-hex-inner",children:[r.jsxs("div",{className:"cluster-hex-header",children:[r.jsxs("div",{className:"cluster-hex-title",children:[r.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),a.is_standalone&&r.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),r.jsx("span",{className:`cluster-hex-status ${a.status==="connected"?"online":"offline"}`})]}),r.jsxs("div",{className:"cluster-hex-metrics",children:[r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${a.total_cpu_usage}%`}})}),r.jsx(Bd,{value:a.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"MEM"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${o}`,style:{width:`${a.total_memory_usage}%`}})}),r.jsx(Bd,{value:a.total_memory_usage,decimals:0,className:`metric-value small text-${o}`})]})]}),r.jsxs("div",{className:"cluster-hex-stats",children:[r.jsxs("div",{className:"hex-stat",children:[r.jsx(pi,{left:a.nodes_online,right:a.node_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(pi,{left:a.vms_running,right:a.vm_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(pi,{left:a.cts_running,right:a.ct_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),a.has_ceph&&r.jsx("div",{className:"cluster-hex-ceph",children:r.jsxs("span",{className:`ceph-badge ${((l=a.ceph_health)==null?void 0:l.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=a.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Wd({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:a=!1}){const{t:s}=Te(),o=m.useMemo(()=>Object.entries(e),[e]),i=m.useMemo(()=>{let c=0,l=0,d=0,p=0;return Object.values(e).forEach(f=>{f.summary&&(c+=f.summary.total_cpu_usage||0,l+=f.summary.total_memory_usage||0,d+=f.summary.total_storage_usage||0,p++)}),{avgCpu:p>0?c/p:0,avgMem:p>0?l/p:0,avgStorage:p>0?d/p:0}},[e]);return r.jsxs("div",{className:"command-center",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"cc-header",children:[r.jsx("h1",{className:"cc-title font-display",children:r.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),r.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),r.jsxs("div",{className:"cc-content",children:[r.jsxs("div",{className:"cc-top-row",children:[r.jsxs("div",{className:"cc-gauges panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),r.jsxs("div",{className:"gauges-container",children:[r.jsx(mi,{value:i.avgCpu,label:s("metric.cpu"),color:he(i.avgCpu),size:110}),r.jsx(mi,{value:i.avgMem,label:s("metric.memory"),color:he(i.avgMem),size:110}),r.jsx(mi,{value:i.avgStorage,label:s("metric.disk"),color:he(i.avgStorage),size:110})]})]}),r.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),r.jsxs("div",{className:"stats-grid",children:[r.jsx(hs,{label:s("cluster.total"),value:t.total_clusters,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),r.jsx(hs,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("path",{d:"M8 21h8M12 17v4"})]})}),r.jsx(hs,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 3v18"})]})}),r.jsx(hs,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),r.jsxs("div",{className:"cc-galaxy",children:[r.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),r.jsx("div",{className:"galaxy-container",children:o.length===0?r.jsxs("div",{className:"no-clusters",children:[r.jsx("div",{className:"no-clusters-icon",children:r.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]})}),r.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),r.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):r.jsx("div",{className:"cluster-grid",children:o.map(([c,l])=>r.jsx(Wg,{cluster:l,onClick:()=>n(c)},c))})})]})]}),r.jsx("style",{children:`
        .command-center {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-md);
        }

        .cc-header {
          text-align: center;
          margin-bottom: var(--spacing-md);
        }

        .cc-title {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
          letter-spacing: 0.12em;
        }

        .cc-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        .cc-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Top Row */
        .cc-top-row {
          display: grid;
          grid-template-columns: minmax(280px, 1fr) 2fr;
          gap: var(--spacing-md);
          align-items: stretch;
        }

        .cc-top-row > .panel {
          min-height: 160px;
          min-width: 0;
        }

        @media (max-width: 1000px) {
          .cc-top-row {
            grid-template-columns: 1fr;
          }
        }

        /* Gauges Panel */
        .cc-gauges {
          padding: var(--spacing-md);
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .gauges-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm);
          flex-wrap: nowrap;
          flex: 1;
          min-height: 120px;
        }

        /* Auto-scale gauges to fill container */
        .cc-gauges .ring-gauge {
          flex: 0 1 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cc-gauges .ring-gauge svg {
          width: 110px;
          height: 110px;
        }

        /* Ring Gauge - Sci-Fi Style */
        .ring-gauge {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ring-svg {
          transform: rotate(0deg);
        }

        .ring-outer-deco {
          fill: none;
          stroke: var(--primary-dim);
          opacity: 0.3;
        }

        .ring-inner-deco {
          fill: none;
          stroke: var(--primary-dim);
          opacity: 0.4;
          stroke-dasharray: 4 2;
        }

        .ring-tick {
          stroke: var(--primary-dim);
          stroke-width: 1;
          opacity: 0.3;
        }

        .ring-tick.major {
          opacity: 0.6;
          stroke-width: 1.5;
        }

        .ring-bg {
          fill: none;
          stroke: var(--bg-primary);
        }

        .ring-fill {
          fill: none;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.6s ease-out;
        }

        .ring-fill.success { stroke: var(--success); filter: drop-shadow(0 0 8px var(--success)); }
        .ring-fill.warning { stroke: var(--warning); filter: drop-shadow(0 0 8px var(--warning)); }
        .ring-fill.danger { stroke: var(--danger); filter: drop-shadow(0 0 8px var(--danger)); }

        .ring-sweep {
          stroke: var(--text);
          stroke-width: 2;
          opacity: 0.9;
          transform-origin: center;
          filter: drop-shadow(0 0 3px var(--primary));
          transition: transform 0.5s ease-out;
        }


        .ring-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .ring-value {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
        }

        .ring-percent {
          font-size: 13px;
          opacity: 0.7;
        }

        .ring-label {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          margin-top: 2px;
          text-transform: uppercase;
        }

        /* Stats Panel */
        .cc-stats-panel {
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          margin-bottom: var(--spacing-sm);
        }

        .panel-title {
          font-size: 13px;
          color: var(--primary);
          letter-spacing: 0.1em;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-sm);
          flex: 1;
          align-content: stretch;
        }

        .stats-grid .stat-card {
          height: 100%;
        }

        @media (min-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-left: 3px solid var(--primary);
          border-radius: var(--radius-sm);
          padding: var(--spacing-md) var(--spacing-sm);
          transition: all var(--transition-fast);
          min-height: 70px;
        }

        .stat-card:hover {
          border-color: var(--primary-dim);
          border-left-color: var(--primary);
          transform: translateY(-1px);
        }

        .stat-card.stat-warning { border-left-color: var(--warning); }
        .stat-card.stat-success { border-left-color: var(--success); }
        .stat-card.stat-danger { border-left-color: var(--danger); }

        .stat-icon {
          color: var(--primary-dim);
          opacity: 0.8;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
          min-width: 0;
        }

        .stat-label {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .stat-sub {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Galaxy */
        .cc-galaxy {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          position: relative;
          overflow: hidden;
        }

        .cc-galaxy::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(191, 0, 255, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .galaxy-title {
          font-size: 15px;
          color: var(--primary);
          letter-spacing: 0.15em;
          margin-bottom: var(--spacing-md);
          text-align: center;
          text-shadow: var(--primary-glow);
        }

        .galaxy-container {
          min-height: 200px;
          position: relative;
        }

        .cluster-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: var(--spacing-md);
          justify-content: center;
        }

        @media (min-width: 1200px) {
          .cluster-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 900px) and (max-width: 1199px) {
          .cluster-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Cluster Hex Card */
        .cluster-hex-card {
          position: relative;
          background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          cursor: pointer;
          transition: all var(--transition-normal);
          animation: neon-breathe 4s ease-in-out infinite;
          overflow: hidden;
        }

        .cluster-hex-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          opacity: 0.5;
        }

        .cluster-hex-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0, 240, 255, 0.2), var(--primary-glow);
          border-color: var(--primary);
        }

        .cluster-hex-card.warning {
          border-color: var(--warning);
          animation: warning-pulse 2s ease-in-out infinite;
        }

        .cluster-hex-card.warning::before {
          background: linear-gradient(90deg, transparent, var(--warning), transparent);
        }

        .cluster-hex-card.critical {
          border-color: var(--danger);
          animation: danger-pulse 1s ease-in-out infinite;
        }

        .cluster-hex-card.critical::before {
          background: linear-gradient(90deg, transparent, var(--danger), transparent);
        }

        .cluster-hex-inner {
          position: relative;
          z-index: 1;
        }

        .cluster-hex-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border-dim);
        }

        .cluster-hex-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .cluster-hex-name {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
        }

        .standalone-badge {
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 3px 8px;
          background: rgba(191, 0, 255, 0.15);
          border: 1px solid var(--accent);
          border-radius: var(--radius-sm);
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cluster-hex-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--danger);
          box-shadow: 0 0 8px var(--danger);
        }

        .cluster-hex-status.online {
          background: var(--success);
          box-shadow: 0 0 12px var(--success);
          animation: status-pulse 2s ease-in-out infinite;
        }

        @keyframes status-pulse {
          0%, 100% { box-shadow: 0 0 8px var(--success); }
          50% { box-shadow: 0 0 16px var(--success); }
        }

        .cluster-hex-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: var(--spacing-sm);
        }

        .cluster-hex-metric {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .cluster-hex-metric .metric-label {
          width: 36px;
          font-size: 14px;
          font-family: var(--font-display);
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .metric-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .metric-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 4px,
            rgba(255, 255, 255, 0.03) 4px,
            rgba(255, 255, 255, 0.03) 8px
          );
        }

        .metric-bar-fill {
          height: 100%;
          background: var(--gradient-cyber);
          background-size: 200% 100%;
          animation: data-flow 2s linear infinite;
          border-radius: 3px;
          transition: width var(--transition-normal);
          box-shadow: 0 0 8px currentColor;
        }

        .metric-bar-fill.warning {
          background: var(--warning);
          box-shadow: 0 0 8px var(--warning);
        }

        .metric-bar-fill.danger {
          background: var(--danger);
          box-shadow: 0 0 8px var(--danger);
        }

        .metric-bar-fill.success {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .metric-value.small {
          font-size: 13px;
          font-weight: 600;
          min-width: 40px;
          text-align: right;
        }

        .cluster-hex-stats {
          display: flex;
          justify-content: space-around;
          padding: var(--spacing-sm) 0;
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-bottom: var(--spacing-xs);
        }

        .hex-stat {
          text-align: center;
          padding: 0 var(--spacing-sm);
        }

        .hex-stat-value {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          display: block;
          line-height: 1.2;
        }

        .hex-stat-label {
          font-size: 13px;
          font-family: var(--font-display);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .cluster-hex-ceph {
          text-align: center;
          margin-top: var(--spacing-xs);
        }

        .ceph-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 4px 12px;
          border-radius: var(--radius-sm);
          background: var(--bg-primary);
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .ceph-badge.ok {
          color: var(--success);
          border: 1px solid rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.1);
        }

        .ceph-badge.warn {
          color: var(--warning);
          border: 1px solid rgba(255, 107, 0, 0.5);
          background: rgba(255, 107, 0, 0.1);
        }

        .ceph-badge.err {
          color: var(--danger);
          border: 1px solid rgba(255, 0, 64, 0.5);
          background: rgba(255, 0, 64, 0.1);
        }

        /* No clusters state */
        .no-clusters {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: var(--text-secondary);
        }

        .no-clusters-icon {
          color: var(--primary-dim);
          margin-bottom: var(--spacing-md);
          animation: pulse 2s ease-in-out infinite;
        }

        .no-clusters-text {
          font-family: var(--font-display);
          font-size: 15px;
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
        }

        .no-clusters-hint {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .command-center {
            padding: var(--spacing-md);
          }

          .cc-title {
            font-size: 20px;
          }

          .cluster-hex-card {
            width: 100%;
          }

          .cc-gauges .ring-gauge svg {
            width: 90px;
            height: 90px;
          }

          .ring-value {
            font-size: 15px;
          }

          .ring-label {
            font-size: 9px;
          }
        }

        @media (max-width: 480px) {
          .command-center {
            padding: var(--spacing-sm);
          }

          .cc-title {
            font-size: 16px;
          }

          .gauges-container {
            gap: 2px;
            padding: 2px;
            min-height: 90px;
          }

          .cc-gauges .ring-gauge svg {
            width: 75px;
            height: 75px;
          }

          .ring-value {
            font-size: 12px;
          }

          .ring-percent {
            font-size: 8px;
          }

          .ring-label {
            font-size: 7px;
            letter-spacing: 0.03em;
          }

          .cc-top-row > .panel {
            min-height: 100px;
          }

          .panel-title {
            font-size: 10px;
          }

          .stat-card {
            padding: var(--spacing-xs);
            min-height: 50px;
          }

          .stat-value {
            font-size: 16px;
          }

          .stat-label {
            font-size: 9px;
          }
        }

        @media (max-width: 360px) {
          .gauges-container {
            gap: 0;
            padding: 0;
            min-height: 70px;
          }

          .cc-gauges .ring-gauge svg {
            width: 60px;
            height: 60px;
          }

          .ring-value {
            font-size: 10px;
          }

          .ring-label {
            font-size: 6px;
          }
        }
      `})]})}function Vg(e,t,n){const a=Math.min(e,100)/100,s=.1+a*.6,o=t;let i=(Math.random()-.5)*.02;if(o>.08&&o<.22){const c=(o-.08)/.14;i+=s*.2*Math.sin(c*Math.PI)}if(o>.24&&o<.4){const c=(o-.24)/.16;if(c<.2)i-=s*.15*Math.sin(c*5*Math.PI);else if(c<.5){const l=(c-.2)/.3;i+=s*(1+a*.5)*Math.sin(l*Math.PI)}else if(c<.7){const l=(c-.5)/.2;i-=s*.25*Math.sin(l*Math.PI)}}if(o>.48&&o<.72){const c=(o-.48)/.24;i+=s*.35*Math.sin(c*Math.PI)}return i*n}function fi({value:e,label:t,color:n,isOnline:a,width:s=180,height:o=35,isPaused:i=!1}){const c=m.useRef(null),l=m.useRef(null),d=m.useRef([]),p=m.useRef(0),f=m.useRef(0),u=m.useRef(0),x=m.useRef(0),y=m.useRef(!i),j=m.useRef(!1),v=6e4/(50+e/100*50),h=12;m.useEffect(()=>{y.current=!i},[i]);const g=m.useCallback(()=>{const S=l.current;if(!S)return;S.fillStyle="rgba(5, 8, 15, 0.95)",S.fillRect(0,0,s,o),S.strokeStyle="rgba(0, 240, 255, 0.08)",S.lineWidth=.5;for(let I=0;I<o;I+=10)S.beginPath(),S.moveTo(0,I),S.lineTo(s,I),S.stroke();for(let I=0;I<s;I+=10)S.beginPath(),S.moveTo(I,0),S.lineTo(I,o),S.stroke();const P=o/2,E=o*.45,M=!a||e>90?"#ff0040":e>70?"#ff6b00":n;S.shadowColor=M,S.shadowBlur=6,S.strokeStyle=M,S.lineWidth=1.5,S.lineCap="round",S.lineJoin="round",S.beginPath();let w=!1;for(let I=0;I<s;I++){const W=(I-p.current+s)%s;if(W<8&&W>0)continue;const C=P-d.current[I]*E;w?S.lineTo(I,C):(S.moveTo(I,C),w=!0)}S.stroke(),S.shadowBlur=0,S.strokeStyle=`${M}60`,S.lineWidth=2,S.beginPath(),S.moveTo(p.current,0),S.lineTo(p.current,o),S.stroke();const $=S.createLinearGradient(p.current-15,0,p.current,0);$.addColorStop(0,"transparent"),$.addColorStop(1,`${M}30`),S.fillStyle=$,S.fillRect(p.current-15,0,15,o)},[s,o,e,a,n]);m.useEffect(()=>{const S=c.current;if(!S)return;const P=S.getContext("2d");if(!P)return;const E=window.devicePixelRatio||1;S.width=s*E,S.height=o*E,P.scale(E,E),l.current=P,d.current.length!==s&&(d.current=new Array(s).fill(0)),j.current=!0,g()},[s,o,g]),m.useEffect(()=>{if(!j.current||!l.current)return;const P=E=>{x.current||(x.current=E);const R=E-x.current;x.current=E;const M=R/1e3*h;f.current+=R/v,f.current>=1&&(f.current-=1);const w=Math.ceil(M);for(let $=0;$<w;$++){const W=(f.current+$/w*(R/v))%1;let C;a?C=Vg(e,W,1):C=(Math.random()-.5)*.01,p.current=(p.current+1)%s,d.current[p.current]=C;const F=(p.current+1)%s;for(let X=0;X<8;X++){const T=(F+X)%s;d.current[T]=0}}g(),y.current&&(u.current=requestAnimationFrame(P))};return i||(x.current=0,u.current=requestAnimationFrame(P)),()=>{cancelAnimationFrame(u.current)}},[s,o,e,a,v,h,i,g]);const _=()=>!a||e>90?"#ff0040":e>70?"#ff6b00":n;return r.jsxs("div",{className:"ecg-trace",children:[r.jsxs("div",{className:"ecg-trace-header",children:[r.jsx("span",{className:"ecg-trace-label",style:{color:_()},children:t}),r.jsx("span",{className:"ecg-trace-value",style:{color:_()},children:a?`${Math.round(e)}%`:"--"})]}),r.jsx("canvas",{ref:c,style:{width:s,height:o,display:"block"}}),r.jsx("style",{children:`
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
      `})]})}function Ug({cpu:e,memory:t,diskIO:n,isOnline:a,isPaused:s=!1}){const o=m.useRef(null),[i,c]=m.useState(180);return m.useEffect(()=>{const l=o.current;if(!l)return;const d=()=>{const f=l.clientWidth-6;f>0&&c(f)};d();const p=new ResizeObserver(d);return p.observe(l),()=>p.disconnect()},[]),r.jsxs("div",{className:"ecg-monitor-stack",ref:o,children:[r.jsx(fi,{value:e,label:"CPU",color:"#00f0ff",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(fi,{value:t,label:"MEM",color:"#00ff88",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(fi,{value:n,label:"IOW",color:"#ffd700",isOnline:a,width:i,height:32,isPaused:s}),r.jsx("style",{children:`
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
      `})]})}function Vd(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function Ud({value:e,decimals:t=0,suffix:n="",duration:a=800,className:s=""}){const[o,i]=m.useState(0),c=m.useRef(null),l=m.useRef(0),d=m.useRef(!0);return m.useEffect(()=>{const p=d.current?0:o;d.current=!1,c.current=null;const f=u=>{c.current||(c.current=u);const x=u-c.current,y=Math.min(x/a,1),j=1-Math.pow(1-y,3),N=p+(e-p)*j;i(N),y<1?l.current=requestAnimationFrame(f):i(e)};return l.current=requestAnimationFrame(f),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,a]),r.jsxs("span",{className:s,children:[o.toFixed(t),n]})}function Hd({left:e,right:t,className:n=""}){const[a,s]=m.useState(0),[o,i]=m.useState(0),c=m.useRef(null),l=m.useRef(0),d=m.useRef(!0);return m.useEffect(()=>{const f=d.current?0:a,u=d.current?0:o;d.current=!1,c.current=null;const x=y=>{c.current||(c.current=y);const j=y-c.current,N=Math.min(j/800,1),v=1-Math.pow(1-N,3);s(Math.round(f+(e-f)*v)),i(Math.round(u+(t-u)*v)),N<1?l.current=requestAnimationFrame(x):(s(e),i(t))};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Hg(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function Yg(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function Gg({state:e,onClose:t,onShowDetails:n,getNodeHealth:a}){const{t:s}=Te();if(m.useEffect(()=>{const f=()=>t(),u=()=>t(),x=y=>{y.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",f),document.addEventListener("scroll",u,!0),document.addEventListener("keydown",x)),()=>{document.removeEventListener("click",f),document.removeEventListener("scroll",u,!0),document.removeEventListener("keydown",x)}},[e.visible,t]),!e.visible||!e.node)return null;const o=e.node,i=o.status==="online",c=a(e.clusterId,o.node),l=c?`https://${c.host}:${c.port}/#v1:0:=node/${o.node}`:null,d=f=>{f.stopPropagation(),l&&window.open(l,"_blank","noopener,noreferrer"),t()},p=f=>{f.stopPropagation(),n(),t()};return r.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:`context-status ${i?"online":"offline"}`}),r.jsx("span",{className:"context-menu-name",children:o.node})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:p,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:s("vm.details")})]}),l&&r.jsxs("button",{className:"context-menu-item",onClick:d,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:s("node.open_pve")})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("div",{className:"context-menu-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("node.status"),":"]}),r.jsx("span",{className:i?"text-success":"text-danger",children:i?s("node.online").toUpperCase():s("node.offline").toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("metric.cpu"),":"]}),r.jsxs("span",{children:[o.cpu.cores," ",s("node.cores")]})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("metric.memory"),":"]}),r.jsx("span",{children:Ce(o.memory.total_bytes)})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("cluster.vms_short"),":"]}),r.jsx("span",{children:o.vm_count})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[s("cluster.cts_short"),":"]}),r.jsx("span",{children:o.ct_count})]})]})]})}function Xg({cpuUsage:e,memUsage:t,compact:n,label:a="AVG LOAD"}){const s=(e+t)/2,o=he(s),i=.3+s/100*.7,[c,l]=m.useState(0),d=m.useRef(null),p=m.useRef(0),f=m.useRef(!0);return m.useEffect(()=>{const x=f.current?0:c;f.current=!1,d.current=null;const y=j=>{d.current||(d.current=j);const N=j-d.current,v=Math.min(N/1e3,1),h=1-Math.pow(1-v,3),g=x+(s-x)*h;l(g),v<1?p.current=requestAnimationFrame(y):l(s)};return p.current=requestAnimationFrame(y),()=>{p.current&&cancelAnimationFrame(p.current)}},[s]),r.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${o})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${i*10}px var(--${o}))`,transition:"all 0.5s ease"}}),r.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),r.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${o})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${i*15}px var(--${o}))`}}),r.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${o})`,style:{textShadow:`0 0 10px var(--${o})`},children:[c.toFixed(0),"%"]}),r.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:a})]}),r.jsx("div",{className:"reactor-pulse",style:{opacity:i*.3}})]})}function Kg({node:e,onClick:t,onContextMenu:n,clusterName:a,isPaused:s=!1}){he(e.cpu.usage_percent),he(e.memory.used_bytes/e.memory.total_bytes*100);const o=e.status==="online";return r.jsxs("div",{className:`node-card ${o?"":"offline"}`,onClick:t,onContextMenu:n,children:[r.jsxs("div",{className:"node-header",children:[r.jsx("span",{className:`node-status ${o?"online":"offline"}`}),r.jsx("span",{className:"node-name",children:e.node}),a&&r.jsx("span",{className:"node-cluster-tag",children:a})]}),r.jsx("div",{className:"node-ecg-container",children:r.jsx(Ug,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:o,isPaused:s})}),r.jsxs("div",{className:"node-info",children:[r.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),r.jsx("span",{className:"node-info-item",children:Io(e.uptime)})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function qg({node:e,storages:t,onClose:n}){const{t:a}=Te(),s=e.status==="online",o=e.cpu.usage_percent,i=e.memory.used_bytes/e.memory.total_bytes*100,c=e.disk.used_bytes/e.disk.total_bytes*100;return r.jsx("div",{className:"node-detail-overlay",onClick:n,children:r.jsxs("div",{className:"node-detail-panel",onClick:l=>l.stopPropagation(),children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${s?"online":"offline"}`}),r.jsx("h2",{children:e.node}),r.jsx("span",{className:"detail-tag",children:s?a("node.online").toUpperCase():a("node.offline").toUpperCase()})]}),r.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"detail-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.system_info")}),r.jsxs("div",{className:"info-grid",children:[r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.kernel")}),r.jsx("span",{className:"info-value",children:Yg(e.kernel_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.pve_version")}),r.jsx("span",{className:"info-value",children:Hg(e.pve_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.uptime")}),r.jsx("span",{className:"info-value",children:Io(e.uptime)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.workloads")}),r.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.resource_usage")}),r.jsxs("div",{className:"resource-bars",children:[r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.cpu")}),r.jsx("span",{className:`resource-value text-${he(o)}`,children:Xe(o,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${he(o)}`,style:{width:`${o}%`}})}),r.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",a("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.io_wait")}),r.jsx("span",{className:`resource-value text-${Vd(e.cpu.iowait)}`,children:Xe(e.cpu.iowait,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${Vd(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),r.jsx("span",{className:"resource-detail",children:a("node.io_wait_desc")})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.memory")}),r.jsx("span",{className:`resource-value text-${he(i)}`,children:Xe(i,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${he(i)}`,style:{width:`${i}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Ce(e.memory.used_bytes)," / ",Ce(e.memory.total_bytes)]})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.root_disk")}),r.jsx("span",{className:`resource-value text-${he(c)}`,children:Xe(c,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${he(c)}`,style:{width:`${c}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Ce(e.disk.used_bytes)," / ",Ce(e.disk.total_bytes)]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.network_io")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↓ ",a("metric.rx")]}),r.jsxs("span",{className:"net-value",children:[Ce(e.network.rx_bytes_sec),"/s"]})]}),r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↑ ",a("metric.tx")]}),r.jsxs("span",{className:"net-value",children:[Ce(e.network.tx_bytes_sec),"/s"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{className:"section-title",children:[a("node.storage")," (",t.length,")"]}),t.length>0?r.jsx("div",{className:"storage-list",children:t.map(l=>{const d=l.disk.used_bytes/l.disk.total_bytes*100;return r.jsxs("div",{className:`storage-item ${l.shared?"shared":"local"}`,children:[r.jsxs("div",{className:"storage-header",children:[r.jsx("span",{className:"storage-name",children:l.storage}),r.jsx("span",{className:"storage-type",children:l.type}),l.shared&&r.jsx("span",{className:"storage-shared-badge",children:a("node.shared")})]}),r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${he(d)}`,style:{width:`${d}%`}})}),r.jsxs("div",{className:"storage-info",children:[r.jsxs("span",{children:[Ce(l.disk.used_bytes)," / ",Ce(l.disk.total_bytes)]}),r.jsx("span",{className:`text-${he(d)}`,children:Xe(d,1)})]}),r.jsx("div",{className:"storage-content-labels",children:[...l.content].sort().map(p=>r.jsx("span",{className:"content-label",children:p},p))})]},l.storage)})}):r.jsx("div",{className:"no-storage",children:a("node.no_storage")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})})}function Qg({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:a,isPaused:s=!1}){const{t:o}=Te(),[i,c]=m.useState(null),[l,d]=m.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),p=!e&&t&&Object.keys(t).length>0,f=m.useCallback((g,_)=>{var S;return e&&e.client_health?e.client_health[_]||null:t&&((S=t[g])!=null&&S.client_health)&&t[g].client_health[_]||null},[e,t]),u=m.useCallback((g,_,S)=>{g.preventDefault(),g.stopPropagation();const P=Math.min(g.clientX,window.innerWidth-250),E=Math.min(g.clientY,window.innerHeight-280);d({visible:!0,x:P,y:E,node:_,clusterId:S})},[]),x=m.useCallback(()=>{d(g=>({...g,visible:!1}))},[]),y=m.useMemo(()=>{var _,S,P,E,R;const g=[];if(p)Object.entries(t).forEach(([M,w])=>{var I,W,C,F,X;const $=Object.values(w.nodes);if($.length>0){const T=$.reduce((D,Y)=>D+Y.cpu.usage_percent,0)/$.length,L=$.reduce((D,Y)=>Y.memory.total_bytes===0?D:D+Y.memory.used_bytes/Y.memory.total_bytes*100,0)/$.length;g.push({clusterId:M,clusterName:w.name||M,clusterNodes:$,isStandalone:((I=w.summary)==null?void 0:I.is_standalone)||!1,avgCpu:T,avgMem:L,vmsRunning:((W=w.summary)==null?void 0:W.vms_running)||0,ctsRunning:((C=w.summary)==null?void 0:C.cts_running)||0,vmCount:((F=w.summary)==null?void 0:F.vm_count)||0,ctCount:((X=w.summary)==null?void 0:X.ct_count)||0})}});else if(e){const M=Object.values(e.nodes),w=M.length>0?M.reduce((I,W)=>I+W.cpu.usage_percent,0)/M.length:0,$=M.length>0?M.reduce((I,W)=>W.memory.total_bytes===0?I:I+W.memory.used_bytes/W.memory.total_bytes*100,0)/M.length:0;g.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:M,isStandalone:((_=e.summary)==null?void 0:_.is_standalone)||!1,avgCpu:w,avgMem:$,vmsRunning:((S=e.summary)==null?void 0:S.vms_running)||0,ctsRunning:((P=e.summary)==null?void 0:P.cts_running)||0,vmCount:((E=e.summary)==null?void 0:E.vm_count)||0,ctCount:((R=e.summary)==null?void 0:R.ct_count)||0})}return g},[e,t,p]),j=y.flatMap(g=>g.clusterNodes);m.useMemo(()=>j.length===0?0:j.reduce((g,_)=>g+_.cpu.usage_percent,0)/j.length,[j]),m.useMemo(()=>j.length===0?0:j.reduce((g,_)=>_.memory.total_bytes===0?g:g+_.memory.used_bytes/_.memory.total_bytes*100,0)/j.length,[j]);let N=null,v=[];if(i){const[g,_]=i.split("/");if(p&&t){const S=t[g];S&&(N=S.nodes[_]||null,v=Object.values(S.storages).filter(P=>P.node===_))}else e&&(N=e.nodes[_]||null,v=Object.values(e.storages).filter(S=>S.node===_))}if(!e&&!p)return r.jsx("div",{className:"cluster-core empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:o("cluster.select")})]})});const h=p?o("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||o("cluster.nodes");return r.jsxs("div",{className:"cluster-core",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"core-header",children:r.jsxs("h1",{className:"core-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),r.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),h]})}),r.jsx("div",{className:"cluster-sections",children:y.map(g=>r.jsxs("div",{className:"cluster-section",children:[r.jsxs("div",{className:`cluster-section-header ${a?"clickable":""}`,onClick:()=>a==null?void 0:a(g.clusterId),title:a?o("cluster.view_vms_in",{name:g.clusterName}):void 0,children:[r.jsxs("div",{className:"section-title-group",children:[r.jsx("span",{className:"cluster-section-name",children:g.clusterName}),g.isStandalone&&r.jsx("span",{className:"standalone-tag",children:o("dashboard.standalone")}),a&&r.jsx("span",{className:"nav-arrow",children:"→"})]}),r.jsxs("span",{className:"cluster-section-count",children:[g.clusterNodes.filter(_=>_.status==="online").length,"/",g.clusterNodes.length," ",o("cluster.nodes")]})]}),r.jsxs("div",{className:"cluster-section-content",children:[r.jsx("div",{className:"section-reactor",children:r.jsx(Xg,{cpuUsage:g.avgCpu,memUsage:g.avgMem,compact:!0,label:o("node.avg_load")})}),r.jsxs("div",{className:"section-nodes",children:[r.jsx("div",{className:"nodes-grid",children:g.clusterNodes.map(_=>r.jsx(Kg,{node:_,onClick:()=>c(`${g.clusterId}/${_.node}`),onContextMenu:S=>u(S,_,g.clusterId),isPaused:s},`${g.clusterId}-${_.node}`))}),r.jsxs("div",{className:"ecg-legend",children:[r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line cpu"}),r.jsx("span",{children:o("metric.cpu")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line mem"}),r.jsx("span",{children:o("metric.memory")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line io"}),r.jsx("span",{children:o("node.io_wait")})]})]})]}),r.jsxs("div",{className:"section-telemetry",children:[r.jsxs("div",{className:"mini-telemetry",children:[r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${he(g.avgCpu)}`,style:{width:`${g.avgCpu}%`}})}),r.jsx(Ud,{value:g.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${he(g.avgCpu)}`})]}),r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${he(g.avgMem)}`,style:{width:`${g.avgMem}%`}})}),r.jsx(Ud,{value:g.avgMem,decimals:0,suffix:"%",className:`mini-value text-${he(g.avgMem)}`})]})]}),r.jsxs("div",{className:"mini-stats",children:[r.jsxs("div",{className:"mini-stat",children:[r.jsx(Hd,{left:g.vmsRunning,right:g.vmCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),r.jsxs("div",{className:"mini-stat",children:[r.jsx(Hd,{left:g.ctsRunning,right:g.ctCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},g.clusterId))}),r.jsx("div",{className:"core-footer",children:r.jsxs("button",{className:"btn-view-vms",onClick:n,children:[o("cluster.view_all_vms")," →"]})}),N&&r.jsx(qg,{node:N,storages:v,onClose:()=>c(null)}),r.jsx(Gg,{state:l,onClose:x,onShowDetails:()=>{l.node&&c(`${l.clusterId}/${l.node.node}`)},getNodeHealth:f}),r.jsx("style",{children:`
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
        }

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
          flex-wrap: wrap;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
        }

        @media (min-width: 900px) {
          .cluster-section-content {
            display: grid;
            grid-template-columns: 180px 1fr 200px;
          }
        }

        /* Section Reactor */
        .section-reactor {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        @media (min-width: 900px) {
          .section-reactor {
            width: auto;
          }
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
          order: -1;
        }

        @media (min-width: 900px) {
          .section-nodes {
            width: auto;
            order: 0;
          }
        }

        /* Section Telemetry */
        .section-telemetry {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          width: 100%;
        }

        @media (min-width: 900px) {
          .section-telemetry {
            width: auto;
          }
        }

        .mini-telemetry {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
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
          justify-content: space-around;
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
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

        .node-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .node-card:hover {
          border-color: var(--primary-dim);
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
        }

        .node-card.offline {
          opacity: 0.6;
          border-color: var(--danger-dim);
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
            transform: scaleX(1);
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
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.2);
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
          color: var(--danger);
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
            transform: scaleX(1);
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
            transform: scale(1) translateY(0);
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
          color: var(--danger);
        }

        .text-white {
          color: #ffffff;
        }
      `})]})}const Zg={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function Jg(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function eh({task:e}){const t=Zg[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=Jg(e.task_type);return r.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[r.jsx("span",{className:"task-badge-icon",children:t.icon}),r.jsx("span",{className:"task-badge-text",children:t.label}),r.jsx("style",{children:th})]})}const th=`
  .task-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: var(--radius-sm);
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--task-color);
    color: var(--task-color);
    font-family: var(--font-mono);
    font-size: 15px;
  }

  .task-indicator-sm {
    padding: 2px 6px;
    font-size: 14px;
    gap: 4px;
  }

  .task-indicator-lg {
    padding: 6px 14px;
    font-size: 15px;
    gap: 8px;
  }

  .task-icon {
    font-size: 1em;
  }

  .task-label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
  }

  /* Task Badge */
  .task-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--task-color);
    color: var(--task-color);
    font-family: var(--font-mono);
    font-size: 14px;
    white-space: nowrap;
  }

  .task-badge-icon {
    font-size: 14px;
  }

  .task-badge-text {
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-weight: 500;
  }

  /* Animations */
  .pulse-grow {
    animation: taskPulseGrow 1.5s ease-in-out infinite;
  }

  .pulse-fade {
    animation: taskPulseFade 1.2s ease-in-out infinite;
  }

  .slide {
    animation: taskSlide 2s linear infinite;
  }

  .stripe {
    position: relative;
    overflow: hidden;
  }

  .stripe::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    animation: taskStripe 1.5s linear infinite;
  }

  .flash {
    animation: taskFlash 0.8s ease-in-out infinite;
  }

  .reverse {
    animation: taskReverse 1.5s ease-in-out infinite;
  }

  .pulse {
    animation: taskPulse 1.5s ease-in-out infinite;
  }

  @keyframes taskPulseGrow {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(var(--task-color-rgb, 0, 240, 255), 0);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 15px var(--task-color);
    }
  }

  @keyframes taskPulseFade {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes taskSlide {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .slide {
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      var(--task-color) 25%,
      var(--task-color) 75%,
      transparent 100%
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
  }

  @keyframes taskStripe {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes taskFlash {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 5px var(--task-color);
    }
    25% {
      opacity: 0.7;
      box-shadow: 0 0 20px var(--task-color);
    }
    50% {
      opacity: 1;
      box-shadow: 0 0 5px var(--task-color);
    }
    75% {
      opacity: 0.7;
      box-shadow: 0 0 20px var(--task-color);
    }
  }

  @keyframes taskReverse {
    0%, 100% {
      transform: scale(1);
      filter: hue-rotate(0deg);
    }
    50% {
      transform: scale(0.95);
      filter: hue-rotate(30deg);
    }
  }

  @keyframes taskPulse {
    0%, 100% {
      box-shadow: 0 0 5px var(--task-color);
    }
    50% {
      box-shadow: 0 0 15px var(--task-color), 0 0 25px var(--task-color);
    }
  }
`;function nh({open:e,title:t,details:n,typeToConfirm:a,destructive:s=!1,confirmLabel:o="Confirm",cancelLabel:i="Cancel",onConfirm:c,onCancel:l}){const[d,p]=vo.useState(""),f=m.useRef(null),u=m.useRef(null);if(m.useEffect(()=>{e&&(p(""),setTimeout(()=>{var y,j;a?(y=u.current)==null||y.focus():(j=f.current)==null||j.focus()},50))},[e,a]),m.useEffect(()=>{if(!e)return;const y=j=>{j.key==="Escape"&&(j.preventDefault(),l()),j.key==="Enter"&&(!a||d===a)&&(j.preventDefault(),c())};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,d,a,c,l]),!e)return null;const x=!a||d===a;return r.jsxs("div",{onClick:l,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[r.jsx("style",{children:`
        @keyframes cmFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
        .cm-card {
          width: min(440px, 100%);
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0,240,255,.35);
          border-radius: 12px;
          box-shadow:
            0 0 0 1px rgba(0,240,255,.1),
            0 16px 60px rgba(0,0,0,.65),
            0 0 80px -20px rgba(0,240,255,.5);
          padding: 24px 26px;
          animation: cmSlide .2s ease;
        }
        .cm-card.danger {
          border-color: rgba(255,56,96,.45);
          box-shadow:
            0 0 0 1px rgba(255,56,96,.18),
            0 16px 60px rgba(0,0,0,.65),
            0 0 80px -20px rgba(255,56,96,.5);
        }
        .cm-title {
          font-family: 'Orbitron', sans-serif; font-weight: 700;
          font-size: 16px; letter-spacing: .08em; text-transform: uppercase;
          color: #e6f6ff; margin: 0 0 4px;
        }
        .cm-card.danger .cm-title { color: #ff8aa0; }
        .cm-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px; letter-spacing: .12em; text-transform: uppercase;
          color: #00f0ff; margin-bottom: 14px;
        }
        .cm-card.danger .cm-eyebrow { color: #ff3860; }
        .cm-details {
          font-family: 'Rajdhani', sans-serif; font-size: 15px;
          color: #95a8c4; line-height: 1.5; margin-bottom: 16px;
        }
        .cm-details code, .cm-details strong {
          color: #e6f6ff; font-family: 'Share Tech Mono', monospace;
          background: rgba(0,240,255,.08); padding: 1px 6px; border-radius: 3px;
        }
        .cm-input-label {
          display: block; font-size: 13px; letter-spacing: .08em;
          text-transform: uppercase; color: #95a8c4; margin: 16px 0 6px;
        }
        .cm-input {
          width: 100%; padding: 10px 14px;
          background: #02050b; color: #e6f6ff;
          border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
          font-family: 'Share Tech Mono', monospace; font-size: 15px;
          outline: none;
        }
        .cm-input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
        .cm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 22px; }
        .cm-btn {
          padding: 9px 20px;
          font-family: 'Orbitron', sans-serif; font-weight: 600;
          font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
          border-radius: 6px; cursor: pointer; border: 1px solid transparent;
        }
        .cm-btn.cancel { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
        .cm-btn.cancel:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
        .cm-btn.confirm { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
        .cm-btn.confirm.danger { color: #1a0006; background: linear-gradient(135deg, #ff3860, #c41a3a); box-shadow: 0 0 14px rgba(255,56,96,.5); }
        .cm-btn:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
      `}),r.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:y=>y.stopPropagation(),children:[r.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),r.jsx("h3",{className:"cm-title",children:t}),n&&r.jsx("div",{className:"cm-details",children:n}),a&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{className:"cm-input-label",children:["Type ",r.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:a})," to confirm"]}),r.jsx("input",{ref:u,className:"cm-input",type:"text",value:d,onChange:y=>p(y.target.value),autoComplete:"off",spellCheck:!1})]}),r.jsxs("div",{className:"cm-actions",children:[r.jsx("button",{className:"cm-btn cancel",onClick:l,children:i}),r.jsx("button",{ref:f,className:`cm-btn confirm ${s?"danger":""}`,disabled:!x,onClick:c,children:o})]})]})]})}const rh=e=>{if(!e)return"—";const t=e/1024**3;return t>=100?`${t.toFixed(0)}G`:`${t.toFixed(1)}G`};function ah({open:e,cluster_id:t,vm:n,onClose:a,onMigrationStarted:s}){const{t:o}=Te(),[i,c]=m.useState("endpoint"),[l,d]=m.useState([]),[p,f]=m.useState(""),[u,x]=m.useState(""),[y,j]=m.useState(!1),[N,v]=m.useState(null),[h,g]=m.useState(null),[_,S]=m.useState(!1),[P,E]=m.useState({}),[R,M]=m.useState({}),[w,$]=m.useState(""),[I,W]=m.useState(""),[C,F]=m.useState(!0),[X,T]=m.useState(!1),[L,D]=m.useState(""),[Y,K]=m.useState(""),[b,V]=m.useState(""),[J,ae]=m.useState(null),[le,ue]=m.useState(!1),Qe=async()=>{if(!(!n||!q)){ue(!0),ae(null),K("");try{const H=await Ie.migrationPrecheck(t,n.vmid,q.cluster_id,q.node_name||q.node_host);ae({ok:H.ok,blockers:H.blockers,warnings:H.warnings})}catch(H){const se=H instanceof Error?H.message:String(H);K(`pre-flight check failed: ${se}`)}finally{ue(!1)}}},ee=m.useRef(null);m.useEffect(()=>{e&&(c("endpoint"),d([]),f(""),x(""),v(null),g(null),E({}),M({}),$(""),W(n?String(n.vmid):""),D(""),K(""),V(""),ae(null),Ie.listRemoteEndpoints(t).then(H=>d(H.endpoints)).catch(H=>K(`could not list target clusters: ${H.message||H}`)),n&&Ie.getMigrationSource(t,n.vmid).then(v).catch(H=>K(`could not introspect source VM: ${H.message||H}`)))},[e,t,n]),m.useEffect(()=>{if(!e)return;const H=se=>{se.key==="Escape"&&i!=="submitting"&&a()};return document.addEventListener("keydown",H),()=>document.removeEventListener("keydown",H)},[e,i,a]);const q=l.find(H=>xs(H)===p),ne=async H=>{var ce;f(H);const se=l.find(pe=>xs(pe)===H);if(se){j(!0),S(!0),K(""),g(null),$("");try{const pe=await Ie.fetchRemoteFingerprint(se.node_host,se.node_port);x(pe.fingerprint)}catch(pe){const Ee=pe instanceof Error?pe.message:String(pe);K(`could not auto-fetch fingerprint (${Ee}); paste manually`),x("")}finally{j(!1)}try{const pe=se.node_name||se.node_host,Ee=await Ie.getMigrationTargets(se.cluster_id,pe);g(Ee);const rt=Ee.ips.find(it=>it.address===se.node_host);$(rt?rt.address:((ce=Ee.ips[0])==null?void 0:ce.address)||se.node_host)}catch(pe){const Ee=pe instanceof Error?pe.message:String(pe);K(`could not enumerate target node resources: ${Ee}`)}finally{S(!1)}}};m.useEffect(()=>{!N||!h||(E(H=>{const se={...H};return N.disks.forEach(ce=>{var pe;if(!se[ce.key]){const Ee=h.storages.find(rt=>rt.storage===ce.storage);se[ce.key]=((pe=Ee||h.storages[0])==null?void 0:pe.storage)||""}}),se}),M(H=>{const se={...H};return N.nics.forEach(ce=>{var pe;if(!se[ce.key]){const Ee=h.bridges.find(rt=>rt.iface===ce.bridge);se[ce.key]=((pe=Ee||h.bridges[0])==null?void 0:pe.iface)||""}}),se}))},[N,h]);const de=m.useMemo(()=>{if(!N)return"";const H=new Set,se=new Map;return N.disks.forEach(ce=>{const pe=P[ce.key];ce.storage&&pe&&(se.set(ce.storage,pe),H.add(pe))}),H.size===1?Array.from(H)[0]:Array.from(se.entries()).map(([ce,pe])=>`${ce}=${pe}`).join(",")},[N,P]),Ae=m.useMemo(()=>{if(!N)return"";const H=new Set,se=new Map;return N.nics.forEach(ce=>{const pe=R[ce.key];ce.bridge&&pe&&(se.set(ce.bridge,pe),H.add(pe))}),H.size===1?Array.from(H)[0]:Array.from(se.entries()).map(([ce,pe])=>`${ce}=${pe}`).join(",")},[N,R]),Ze=async()=>{if(!(!n||!q)){c("submitting"),K("");try{const H=await Ie.remoteMigrate(t,n.vmid,{target_cluster_id:q.cluster_id,target_endpoint_host:w||q.node_host,target_endpoint_port:q.node_port,target_endpoint_fingerprint:u||void 0,target_vmid:parseInt(I,10),target_bridge_map:Ae,target_storage_map:de,online:C,delete_source:X,bwlimit:L?parseInt(L,10):void 0});V(H.upid),c("done"),s==null||s(H.upid)}catch(H){const se=H instanceof Error?H.message:String(H);K(se),c("error")}}};if(!e||!n)return null;const ot=!!I&&/^\d+$/.test(I)&&!!N&&!!h&&N.disks.every(H=>!!P[H.key])&&N.nics.every(H=>!!R[H.key]),Le=i==="endpoint"?!!q&&!!h&&!!w:i==="mappings"?ot:!0;return r.jsxs("div",{onClick:()=>i!=="submitting"&&a(),style:oh,children:[r.jsx("style",{children:ih}),r.jsxs("div",{className:"rmm",onClick:H=>H.stopPropagation(),children:[r.jsx("div",{className:"rmm-eyebrow",children:o("rmm.eyebrow",{step:o(`rmm.step.${i}`)})}),r.jsx("h3",{className:"rmm-title",children:o("rmm.title",{vmid:n.vmid,name:n.name})}),i==="endpoint"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.endpoint.intro")}),r.jsx("label",{children:o("rmm.endpoint.target")}),r.jsxs("select",{ref:ee,value:p,onChange:H=>ne(H.target.value),children:[r.jsx("option",{value:"",children:o("rmm.endpoint.select")}),l.map(H=>r.jsxs("option",{value:xs(H),children:[H.cluster_name," @ ",H.node_host,":",H.node_port]},xs(H)))]}),r.jsx("label",{children:o("rmm.endpoint.fp_label")}),r.jsx("input",{type:"text",value:u,onChange:H=>x(H.target.value),placeholder:y?o("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),q&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{children:[o("rmm.endpoint.datapath")," ",r.jsx("span",{className:"hint",children:o("rmm.endpoint.datapath_hint")})]}),r.jsxs("select",{value:w,onChange:H=>$(H.target.value),disabled:_||!h,children:[_&&r.jsx("option",{value:"",children:o("rmm.endpoint.datapath_loading")}),!_&&h&&h.ips.length===0&&r.jsxs("option",{value:q.node_host,children:[q.node_host," (mgmt)"]}),h&&h.ips.map(H=>r.jsxs("option",{value:H.address,children:[H.address," · ",H.iface," (",H.type,")"]},`${H.iface}-${H.address}`))]}),r.jsx("p",{className:"rmm-tip",children:o("rmm.endpoint.datapath_tip")})]}),Y&&r.jsx("div",{className:"rmm-err",children:Y}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:a,children:o("action.cancel")}),r.jsx("button",{className:"primary",disabled:!Le,onClick:()=>c("mappings"),children:o("rmm.action.next")})]})]}),i==="mappings"&&q&&N&&h&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.mappings.intro")}),r.jsxs("label",{children:[o("rmm.mappings.target_vmid")," ",r.jsx("span",{className:"hint",children:o("rmm.mappings.target_vmid_hint")})]}),r.jsx("input",{type:"text",inputMode:"numeric",value:I,onChange:H=>W(H.target.value)}),N.disks.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.disks")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_size")}),r.jsx("span",{children:o("rmm.mappings.col_target_storage")})]}),N.disks.map(H=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:H.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[H.storage," ",r.jsx("em",{children:H.size})]}),r.jsx("select",{value:P[H.key]||"",onChange:se=>E({...P,[H.key]:se.target.value}),children:h.storages.map(se=>r.jsxs("option",{value:se.storage,children:[se.storage," (",se.type,", ",rh(se.avail)," free)"]},se.storage))})]},H.key))]})]}),N.nics.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.nics")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_bridge")}),r.jsx("span",{children:o("rmm.mappings.col_target_bridge")})]}),N.nics.map(H=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:H.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[H.bridge," ",r.jsx("em",{children:H.model})]}),r.jsx("select",{value:R[H.key]||"",onChange:se=>M({...R,[H.key]:se.target.value}),children:h.bridges.map(se=>r.jsxs("option",{value:se.iface,children:[se.iface,se.address?` (${se.address})`:""]},se.iface))})]},H.key))]})]}),r.jsxs("div",{className:"rmm-row",children:[r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:C,onChange:H=>F(H.target.checked)}),r.jsx("span",{children:o("rmm.mappings.online")})]}),r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:X,onChange:H=>T(H.target.checked)}),r.jsx("span",{children:o("rmm.mappings.delete_source")})]})]}),r.jsx("label",{children:o("rmm.mappings.bwlimit")}),r.jsx("input",{type:"text",inputMode:"numeric",value:L,onChange:H=>D(H.target.value),placeholder:"0"}),Y&&r.jsx("div",{className:"rmm-err",children:Y}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("endpoint"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:!Le,onClick:()=>c("review"),children:o("rmm.action.review")})]})]}),i==="review"&&q&&r.jsxs(r.Fragment,{children:[r.jsx(sh,{vm:n,selected:q,clusterId:t,precheck:J,precheckLoading:le,onRun:Qe,t:o}),r.jsx("p",{className:"rmm-sub",children:o("rmm.review.intro")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.from")}),r.jsxs("code",{children:[t,"/",n.node,"/vm/",n.vmid," (",n.name,")"]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.to")}),r.jsxs("code",{children:[q.cluster_id,"/",q.node_host,":",q.node_port," → vmid ",I]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.data_path")}),r.jsx("code",{children:w})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.fingerprint")}),r.jsx("code",{className:"trunc",children:u||r.jsx("em",{children:o("rmm.review.fp_none")})})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.storage_map")}),r.jsx("code",{children:de||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bridge_map")}),r.jsx("code",{children:Ae||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.online")}),r.jsx("code",{children:o(C?"rmm.review.online_yes":"rmm.review.online_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.delete_source")}),r.jsx("code",{children:o(X?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bandwidth")}),r.jsx("code",{children:L?`${L} KB/s`:o("rmm.review.unlimited")})]})]}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:le||J!==null&&!J.ok,onClick:Ze,children:o("rmm.action.start")})]})]}),i==="submitting"&&r.jsxs("div",{className:"rmm-spin",children:[r.jsx("div",{className:"rmm-spin-ring"}),r.jsx("div",{children:o("rmm.submitting")})]}),i==="done"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:o("rmm.done.msg")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.done.upid")}),r.jsx("code",{className:"trunc",style:{userSelect:"all"},children:b})]}),r.jsxs("div",{children:[r.jsx("span",{}),r.jsx("span",{style:{color:"var(--text-dim)"},children:o("rmm.done.hint")})]})]}),r.jsx("div",{className:"rmm-actions",children:r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})})]}),i==="error"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-err",style:{marginTop:16},children:Y}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})]})]})]})]})}function xs(e){return`${e.cluster_id}::${e.node_host}::${e.node_port}`}function sh({vm:e,selected:t,clusterId:n,precheck:a,precheckLoading:s,onRun:o,t:i}){if(vo.useEffect(()=>{a===null&&!s&&o()},[]),s)return r.jsx("div",{className:"rmm-precheck loading",children:i("rmm.precheck.running")});if(a===null)return null;const c=a.blockers.length>0,l=a.warnings.length>0,d=c?"blockers":l?"warnings":"ok";return r.jsxs("div",{className:`rmm-precheck ${d}`,children:[c&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.blockers")}),r.jsx("ul",{children:a.blockers.map((p,f)=>r.jsx("li",{children:p},f))})]}),l&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.warnings")}),r.jsx("ul",{children:a.warnings.map((p,f)=>r.jsx("li",{children:p},f))})]}),!c&&!l&&r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.ok")}),r.jsx("div",{className:"rmm-precheck-actions",children:r.jsx("button",{className:"ghost",onClick:o,children:i("rmm.action.precheck")})})]})}const oh={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},ih=`
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
  font-size: 10px; letter-spacing: .1em; text-transform: uppercase;
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
  font-family: 'Share Tech Mono', monospace; font-size: 10px;
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
`;function lh(e){if(!e)return"—";try{return new Date(e*1e3).toLocaleString()}catch{return String(e)}}function ch({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Te(),o=Ro(),[i,c]=m.useState([]),[l,d]=m.useState(!1),[p,f]=m.useState(!1),[u,x]=m.useState(""),[y,j]=m.useState(""),[N,v]=m.useState(!1),[h,g]=m.useState(""),_=async()=>{if(n){d(!0),g("");try{const R=await Ie.listSnapshots(t,n.vmid);c((R.snapshots||[]).filter(M=>M.name!=="current"))}catch(R){g(R instanceof Error?R.message:String(R))}finally{d(!1)}}};if(m.useEffect(()=>{e&&(x(""),j(""),v(!1),g(""),_())},[e,t,n==null?void 0:n.vmid]),m.useEffect(()=>{if(!e)return;const R=M=>{M.key==="Escape"&&a()};return document.addEventListener("keydown",R),()=>document.removeEventListener("keydown",R)},[e,a]),!e||!n)return null;const S=async()=>{if(u){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(u)){g("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}f(!0),g("");try{await Ie.createSnapshot(t,n.vmid,{snapname:u,description:y,vmstate:N}),x(""),j(""),v(!1),await _()}catch(R){g(R instanceof Error?R.message:String(R))}finally{f(!1)}}},P=async R=>{if(await o.confirm(s("snap.confirm_delete",{name:R.name}),{destructive:!0})){g("");try{await Ie.deleteSnapshot(t,n.vmid,R.name),await _()}catch(M){g(M instanceof Error?M.message:String(M))}}},E=async R=>{if(await o.confirm(s("snap.confirm_rollback",{name:R.name}),{destructive:!0})){g("");try{await Ie.rollbackSnapshot(t,n.vmid,R.name),await _()}catch(M){g(M instanceof Error?M.message:String(M))}}};return r.jsxs("div",{onClick:a,style:dh,children:[r.jsx("style",{children:uh}),r.jsxs("div",{className:"sm-modal",onClick:R=>R.stopPropagation(),children:[r.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",t]}),r.jsx("h3",{className:"sm-title",children:s("snap.title",{vmid:n.vmid,name:n.name})}),r.jsxs("div",{className:"sm-create",children:[r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.name")}),r.jsx("input",{type:"text",value:u,onChange:R=>x(R.target.value),placeholder:"my-snap",spellCheck:!1})]}),r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.description")}),r.jsx("input",{type:"text",value:y,onChange:R=>j(R.target.value)})]}),r.jsxs("div",{className:"sm-row sm-check-row",children:[r.jsxs("label",{className:"sm-check",children:[r.jsx("input",{type:"checkbox",checked:N,onChange:R=>v(R.target.checked)}),r.jsx("span",{children:s("snap.include_state")})]}),r.jsx("button",{className:"sm-btn primary",disabled:p||!u,onClick:S,children:p?"…":s("snap.create")})]})]}),h&&r.jsx("div",{className:"sm-err",children:h}),r.jsxs("div",{className:"sm-list",children:[l&&r.jsx("div",{className:"sm-empty",children:"…"}),!l&&i.length===0&&r.jsx("div",{className:"sm-empty",children:s("snap.empty")}),!l&&i.map(R=>r.jsxs("div",{className:"sm-item",children:[r.jsxs("div",{className:"sm-item-head",children:[r.jsx("code",{className:"sm-name",children:R.name}),R.parent&&r.jsxs("span",{className:"sm-meta",children:[s("snap.parent"),": ",r.jsx("code",{children:R.parent})]}),r.jsxs("span",{className:"sm-meta",children:[s("snap.taken"),": ",lh(R.snaptime)]}),R.vmstate?r.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),R.description&&r.jsx("div",{className:"sm-desc",children:R.description}),r.jsxs("div",{className:"sm-item-actions",children:[r.jsx("button",{className:"sm-btn ghost",onClick:()=>E(R),children:s("snap.rollback")}),r.jsx("button",{className:"sm-btn danger",onClick:()=>P(R),children:s("snap.delete")})]})]},R.name))]}),r.jsx("div",{className:"sm-actions",children:r.jsx("button",{className:"sm-btn ghost",onClick:a,children:s("action.close")})})]})]})}const dh={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},uh=`
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
  padding: 1px 6px; border-radius: 3px; font-size: 10px;
}
.sm-desc {
  margin-top: 6px; font-family: 'Rajdhani', sans-serif; font-size: 15px;
  color: #c8e1ff;
}
.sm-item-actions {
  display: flex; gap: 6px; margin-top: 8px; justify-content: flex-end;
}
.sm-btn {
  padding: 6px 12px;
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .06em; text-transform: uppercase;
  border-radius: 4px; cursor: pointer; border: 1px solid transparent;
}
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
`;function ph({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Te(),[o,i]=m.useState([]),[c,l]=m.useState(!1),[d,p]=m.useState(""),[f,u]=m.useState("snapshot"),[x,y]=m.useState("zstd"),[j,N]=m.useState(""),[v,h]=m.useState(""),[g,_]=m.useState(!1);if(m.useEffect(()=>{!e||!n||(N(""),h(""),p(""),l(!0),Ie.getCluster(t).then(E=>{const M=Object.values(E.storages||{}).filter(w=>{var I;if(!((I=w.content)!=null&&I.includes("backup")))return!1;const $=w.allowed_nodes||[];return $.length>0&&!$.includes(n.node)||!w.shared&&w.node!==n.node?!1:w.enabled!==!1});i(M),M.length>0&&p(M[0].storage)}).catch(E=>N(E.message||String(E))).finally(()=>l(!1)))},[e,t,n==null?void 0:n.vmid,n==null?void 0:n.node]),m.useEffect(()=>{if(!e)return;const E=R=>{R.key==="Escape"&&!g&&a()};return document.addEventListener("keydown",E),()=>document.removeEventListener("keydown",E)},[e,g,a]),!e||!n)return null;const S=o.length>0,P=async()=>{if(d){_(!0),N("");try{const E=await Ie.triggerBackup(t,n.node,{vmid:n.vmid,storage:d,mode:f,compress:x});h(E.upid)}catch(E){N(E instanceof Error?E.message:String(E))}finally{_(!1)}}};return r.jsxs("div",{onClick:()=>!g&&a(),style:mh,children:[r.jsx("style",{children:fh}),r.jsxs("div",{className:"bm-modal",onClick:E=>E.stopPropagation(),children:[r.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",t," · ",n.node]}),r.jsx("h3",{className:"bm-title",children:s("backup.title",{vmid:n.vmid,name:n.name})}),!v&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:s("backup.storage")}),c?r.jsx("div",{className:"bm-empty",children:"…"}):S?r.jsx("select",{value:d,onChange:E=>p(E.target.value),children:o.map(E=>r.jsxs("option",{value:E.storage,children:[E.storage," (",E.type,E.shared?", shared":"",")"]},E.storage))}):r.jsx("div",{className:"bm-err",children:s("backup.no_backup_storage")}),r.jsx("label",{children:s("backup.mode")}),r.jsxs("select",{value:f,onChange:E=>u(E.target.value),children:[r.jsx("option",{value:"snapshot",children:s("backup.mode_snapshot")}),r.jsx("option",{value:"suspend",children:s("backup.mode_suspend")}),r.jsx("option",{value:"stop",children:s("backup.mode_stop")})]}),r.jsx("label",{children:s("backup.compress")}),r.jsxs("select",{value:x,onChange:E=>y(E.target.value),children:[r.jsx("option",{value:"zstd",children:"zstd"}),r.jsx("option",{value:"lzo",children:"lzo"}),r.jsx("option",{value:"gzip",children:"gzip"}),r.jsx("option",{value:"0",children:"none"})]}),j&&r.jsx("div",{className:"bm-err",children:j}),r.jsxs("div",{className:"bm-actions",children:[r.jsx("button",{className:"bm-btn ghost",onClick:a,disabled:g,children:s("action.cancel")}),r.jsx("button",{className:"bm-btn primary",disabled:g||!d,onClick:P,children:g?"…":s("backup.start")})]})]}),v&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"bm-ok",children:s("backup.started")}),r.jsx("div",{className:"bm-review",children:r.jsxs("div",{children:[r.jsx("span",{children:s("rmm.done.upid")}),r.jsx("code",{style:{userSelect:"all"},children:v})]})}),r.jsx("div",{className:"bm-actions",children:r.jsx("button",{className:"bm-btn primary",onClick:a,children:s("action.close")})})]})]})]})}const mh={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},fh=`
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
`;function gh({open:e,cluster_id:t,pveUser:n,onCancel:a,onSubmit:s}){const{t:o}=Te(),[i,c]=m.useState(""),[l,d]=m.useState(!1),[p,f]=m.useState(""),u=m.useRef(null);if(m.useEffect(()=>{e&&(c(""),f(""),d(!1),setTimeout(()=>{var y;return(y=u.current)==null?void 0:y.focus()},50))},[e]),m.useEffect(()=>{if(!e)return;const y=j=>{j.key==="Escape"&&!l&&a()};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[e,l,a]),!e)return null;const x=async()=>{if(i){d(!0),f("");try{await s(i)}catch(y){const j=y instanceof Error?y.message:String(y);f(o("console.prepare_failed",{err:j})),d(!1)}}};return r.jsxs("div",{onClick:()=>!l&&a(),style:hh,children:[r.jsx("style",{children:xh}),r.jsxs("div",{className:"cpw-modal",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",t]}),r.jsx("h3",{className:"cpw-title",children:o("console.prompt_title")}),r.jsx("p",{className:"cpw-body",children:o("console.prompt_body",{user:n,cluster:t})}),r.jsx("label",{children:o("console.prompt_label")}),r.jsx("input",{ref:u,type:"password",value:i,onChange:y=>c(y.target.value),onKeyDown:y=>{y.key==="Enter"&&x()},autoComplete:"current-password",spellCheck:!1}),p&&r.jsx("div",{className:"cpw-err",children:p}),r.jsxs("div",{className:"cpw-actions",children:[r.jsx("button",{className:"ghost",onClick:a,disabled:l,children:o("action.cancel")}),r.jsx("button",{className:"primary",onClick:x,disabled:l||!i,children:l?"…":o("console.prompt_open")})]})]})]})}const hh={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},xh=`
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
`;function Rm(){const[e,t]=m.useState(!0),[n,a]=m.useState(null),[s,o]=m.useState(!1),i=async()=>{try{const l=await Ie.authMe();l.authenticated&&l.user?(a(l.user),o(!0)):(a(null),o(!1))}catch{a(null),o(!1)}finally{t(!1)}},c=async()=>{try{await Ie.authLogout()}catch{}window.location.replace("/login")};return m.useEffect(()=>{i()},[]),{loading:e,user:n,authEnforced:s,refresh:i,logout:c}}function gi(e,t){switch(e){case"start":return t("vm.start");case"stop":return t("vm.stop_hard");case"shutdown":return t("vm.shutdown_acpi");case"reboot":return t("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function vh(e){return e==="stop"||e==="shutdown"||e==="reboot"}function vs(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function yh({state:e,onClose:t,onShowDetails:n,onPowerAction:a,onOpenConsole:s,onOpenSnapshots:o,onBackupNow:i,onRemoteMigrate:c,getNodeHealth:l,userRole:d,consoleMode:p,consolePasswordSet:f}){const{t:u}=Te(),x=Ro();if(m.useEffect(()=>{const _=()=>t(),S=()=>t(),P=E=>{E.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",_),document.addEventListener("scroll",S,!0),document.addEventListener("keydown",P)),()=>{document.removeEventListener("click",_),document.removeEventListener("scroll",S,!0),document.removeEventListener("keydown",P)}},[e.visible,t]),!e.visible||!e.vm)return null;const y=e.vm,j=l(e.clusterId,y.node),N=j?`https://${j.host}:${j.port}/#v1:0:=${y.type}/${y.vmid}`:null,v=_=>{_.stopPropagation(),N&&window.open(N,"_blank","noopener,noreferrer"),t()},h=_=>{_.stopPropagation(),n(),t()},g=r.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:_=>_.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:"context-menu-name",children:y.name}),r.jsxs("span",{className:"context-menu-id",children:["#",y.vmid]})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:h,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:u("vm.details")})]}),N&&r.jsxs("button",{className:"context-menu-item",onClick:v,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:u("vm.open_pve")})]}),(d==="operator"||d==="admin")&&(()=>{const _=p==="disabled"?"console.disabled":y.status!=="running"?"console.vm_not_running":null,S=!!_;return r.jsxs("button",{className:`context-menu-item ${S?"is-disabled":""}`,title:S?u(_):void 0,onClick:P=>{if(P.stopPropagation(),S){t(),x.alert(u(_));return}s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),r.jsx("polyline",{points:"6 8 9 11 6 14"}),r.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),r.jsx("span",{children:u("vm.console")})]})})(),(d==="operator"||d==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:_=>{_.stopPropagation(),o(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 7v5l3 2"})]}),r.jsx("span",{children:u("vm.snapshots")})]}),(d==="operator"||d==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:_=>{_.stopPropagation(),i(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:u("vm.backup_now")})]}),(d==="operator"||d==="admin")&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),y.status!=="running"&&r.jsxs("button",{className:"context-menu-item",onClick:_=>{_.stopPropagation(),a({vm:y,clusterId:e.clusterId,action:"start"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:u("vm.start")})]}),y.status==="running"&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"context-menu-item",onClick:_=>{_.stopPropagation(),a({vm:y,clusterId:e.clusterId,action:"shutdown"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:u("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"context-menu-item",onClick:_=>{_.stopPropagation(),a({vm:y,clusterId:e.clusterId,action:"reboot"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:u("vm.reboot")})]}),r.jsxs("button",{className:"context-menu-item danger",onClick:_=>{_.stopPropagation(),a({vm:y,clusterId:e.clusterId,action:"stop"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:u("vm.stop_hard")})]})]})]}),d==="admin"&&y.type!=="lxc"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:_=>{_.stopPropagation(),c(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 12h12"}),r.jsx("polyline",{points:"13 6 19 12 13 18"}),r.jsx("circle",{cx:"20",cy:"6",r:"2"}),r.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),r.jsx("span",{children:u("vm.migrate_remote")})]})]})]});return $m.createPortal(g,document.body)}const Yd=vo.forwardRef(function({vm:t,isSelected:n,onClick:a,onContextMenu:s,animationDelay:o,task:i,isGhost:c=!1,isCompleting:l=!1},d){var P,E,R;const p=t.status==="running",f=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,u=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,x=Math.max(t.cpu.usage_percent,f,u),y=p?he(x):"muted",j=!!i,N=(P=i==null?void 0:i.task_type)==null?void 0:P.includes("migrate"),v=((E=i==null?void 0:i.task_type)==null?void 0:E.includes("backup"))||((R=i==null?void 0:i.task_type)==null?void 0:R.includes("vzdump")),h=t.name.length>12?t.name.substring(0,11)+"…":t.name,_=i?(M=>{const w=M.toLowerCase();return w.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:w.includes("backup")||w.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:w.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:w.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:w.includes("clone")?{label:"CLONE",color:"#10b981"}:w.includes("start")||w.includes("qmstart")?{label:"START",color:"#00ff88"}:w.includes("stop")||w.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:w.includes("reboot")||w.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(i.task_type):null,S=i?{type:i.task_type,target:i.target_node}:null;return r.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${j?"has-task":""} ${N?"migrating":""} ${v?"backup":""} ${c?"ghost":""} ${l?"completing":""}`,onClick:a,onContextMenu:s,title:`${t.name} (${t.vmid})${i?`
[${i.task_type}]${i.target_node?` → ${i.target_node}`:""}`:""}`,style:{"--anim-delay":`${o}ms`,animationDelay:`${o}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[r.jsxs("div",{className:`vm-cell-inner ${y}`,children:[r.jsx("span",{className:"vm-name",children:h}),r.jsx("span",{className:"vm-id",children:t.vmid}),i&&!N&&!v&&r.jsx("span",{className:"vm-task-icon",children:"⚙"}),v&&r.jsx("span",{className:"vm-backup-icon",children:"◉"}),N&&r.jsx("span",{className:"vm-migrate-icon",children:r.jsx("span",{className:"migrate-arrow",children:"→"})})]}),_&&r.jsxs("div",{className:"vm-task-label",style:{borderColor:_.color,color:_.color},children:[_.label,N&&i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(i.progress),"%"]})]}),j&&!N&&!v&&r.jsx("div",{className:"vm-task-ring"}),v&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"backup-ring"}),r.jsx("div",{className:"backup-scanner"}),r.jsxs("div",{className:"backup-particles",children:[r.jsx("span",{className:"bp bp1"}),r.jsx("span",{className:"bp bp2"}),r.jsx("span",{className:"bp bp3"}),r.jsx("span",{className:"bp bp4"})]})]}),N&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"migrate-ring"}),r.jsxs("div",{className:"migrate-particles",children:[r.jsx("span",{className:"particle p1"}),r.jsx("span",{className:"particle p2"}),r.jsx("span",{className:"particle p3"})]}),(S==null?void 0:S.target)&&r.jsxs("div",{className:"migrate-target-label",children:["→ ",S.target]})]}),c&&r.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[Math.floor(i.progress),"%"]})]})]})});function bh({vm:e,onClose:t}){const{t:n}=Te(),a=e.status==="running";return r.jsxs("div",{className:"vm-detail-panel panel",children:[r.jsxs("div",{className:"detail-scroll-area",children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${ml(e.status)}`}),r.jsx("span",{className:"detail-name",children:e.name}),r.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"detail-content",children:[r.jsxs("div",{className:"detail-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.node")}),r.jsx("span",{className:"info-value",children:e.node})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.type")}),r.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("node.status")}),r.jsx("span",{className:`info-value text-${ml(e.status)}`,children:e.status.toUpperCase()})]}),a&&r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.uptime")}),r.jsx("span",{className:"info-value",children:Io(e.uptime)})]}),(()=>{const s=(e.tags||[]).map(o=>(o||"").trim()).filter(Boolean);return s.length>0?r.jsxs("div",{className:"info-row tags-row",children:[r.jsx("span",{className:"info-label",children:n("table.tags")}),r.jsx("div",{className:"vm-tags detail-tags",children:s.map((o,i)=>r.jsx("span",{className:"vm-tag",children:o},i))})]}):null})()]}),a&&r.jsxs("div",{className:"detail-metrics",children:[r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.cpu")}),r.jsx("span",{className:`metric-value text-${he(e.cpu.usage_percent)}`,children:Xe(e.cpu.usage_percent,1)})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${he(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.memory")}),r.jsxs("span",{className:"metric-value",children:[Ce(e.memory.used_bytes)," / ",Ce(e.memory.total_bytes)]})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${he(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-network",children:[r.jsx("span",{className:"metric-label",children:n("metric.network")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("span",{className:"net-rx",children:["↓ ",Ce(e.network.rx_bytes_sec),"/s"]}),r.jsxs("span",{className:"net-tx",children:["↑ ",Ce(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function wh({cluster:e,clusters:t}){var Rn;const{t:n,language:a}=Te(),s=Ro(),[o,i]=m.useState(null),c=Rm(),[l,d]=m.useState(null),[p,f]=m.useState(null),[u,x]=m.useState(null),[y,j]=m.useState(null),[N,v]=m.useState("disabled"),[h,g]=m.useState({});m.useEffect(()=>{Ie.getConfig().then(k=>{var A;v(((A=k.console)==null?void 0:A.mode)||"disabled");const U={};(k.clusters||[]).forEach(z=>{U[z.id]=!!(z.auth&&z.auth.password&&z.auth.password.length>0)}),g(U)}).catch(()=>v("disabled"))},[]);const[_,S]=m.useState(null),P=m.useCallback((k,U,A,z)=>{const B=typeof localStorage<"u"&&localStorage.getItem("language")||"",Z=U.type==="lxc",ie=`${Z?"/console-term":"/console"}/${encodeURIComponent(k)}/${encodeURIComponent(U.node)}/${U.vmid}?ct=${encodeURIComponent(A)}`+(U.name?`&name=${encodeURIComponent(U.name)}`:"")+(B?`&lang=${encodeURIComponent(B)}`:"")+(!Z&&z?`#vp=${encodeURIComponent(z)}`:"");window.open(ie,"_blank","noopener,noreferrer")},[]),[E,R]=m.useState([]),M=m.useRef(new Map),w=m.useCallback(k=>{k.action==="start"||k.action==="resume"?$(k):d(k)},[]),$=m.useCallback(async k=>{d(null);try{const U=k.vm.type==="lxc",A=U?await Ie.ctAction(k.clusterId,k.vm.node,k.vm.vmid,k.action):await Ie.vmAction(k.clusterId,k.vm.node,k.vm.vmid,k.action);console.info(`[vm_control] ${k.action} ${U?"ct":"vm"}/${k.vm.vmid} → upid=${A.upid}`)}catch(U){const A=U instanceof Error?U.message:String(U);A.includes("vm_control_disabled")?await s.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await s.alert(`${k.action} failed: ${A.slice(0,200)}`)}},[]),I=m.useCallback(()=>{l&&$(l)},[l,$]),[W,C]=m.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[F,X]=m.useState(""),[T,L]=m.useState(()=>{const k=localStorage.getItem("vm_matrix_view_mode");return k==="table"||k==="thumb"||k==="grid"?k:"grid"}),[D,Y]=m.useState(()=>{const k=parseInt(localStorage.getItem("vm_matrix_thumb_size")||"320",10);return Number.isFinite(k)?Math.max(160,Math.min(640,k)):320}),[K,b]=m.useState(()=>Math.floor(Date.now()/3e4));m.useEffect(()=>{if(T!=="thumb")return;const k=window.setInterval(()=>b(Math.floor(Date.now()/3e4)),3e4);return()=>window.clearInterval(k)},[T]),m.useEffect(()=>{localStorage.setItem("vm_matrix_view_mode",T)},[T]),m.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_size",String(D))},[D]);const[V,J]=m.useState("vmid"),[ae,le]=m.useState("asc"),[ue,Qe]=m.useState(!1),[ee,q]=m.useState(()=>{const k=localStorage.getItem("matrix_card_width");return k?parseInt(k,10):85}),[ne,de]=m.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[Ae,Ze]=m.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[ot,Le]=m.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[H,se]=m.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[ce,pe]=m.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[Ee,rt]=m.useState([]),[it,qt]=m.useState([]),[Fe,Rt]=m.useState(new Map),Qt=m.useRef(new Set),[vt,fe]=m.useState(!1),[ge,De]=m.useState(0),[tt,pt]=m.useState(!0);m.useEffect(()=>{fe(!1),De(A=>A+1),pt(!0);const k=setTimeout(()=>{fe(!0)},100),U=setTimeout(()=>{pt(!1)},8e3);return()=>{clearTimeout(k),clearTimeout(U)}},[Ae]);const Je=m.useRef(new Map),It=m.useRef(new Map),re=m.useRef(null),ze=m.useRef(!1),Be=m.useMemo(()=>{if(ne!=="load")return"";const k=[],U=A=>{Object.values(A.vms).forEach(z=>{if(z.template||W==="running"&&z.status!=="running"||W==="stopped"&&z.status!=="stopped")return;const B=z.memory.total_bytes>0?z.memory.used_bytes/z.memory.total_bytes*100:0,Z=z.disk.total_bytes>0?z.disk.used_bytes/z.disk.total_bytes*100:0,Q=Math.max(z.cpu.usage_percent,B,Z);k.push({key:`${z.node}/${z.vmid}`,load:Math.round(Q)})})};return t?Object.values(t).forEach(U):e&&U(e),k.sort((A,z)=>z.load-A.load),k.map(A=>`${A.key}:${A.load}`).join("|")},[e,t,ne,W]);m.useLayoutEffect(()=>{if(ne!=="load"||ze.current)return;const k=new Map;Je.current.forEach((U,A)=>{U&&k.set(A,U.getBoundingClientRect())}),It.current=k},[Be,ne]),m.useEffect(()=>{ne==="load"&&It.current.size!==0&&requestAnimationFrame(()=>{const k=[];Je.current.forEach((U,A)=>{if(!U)return;const z=It.current.get(A);if(!z)return;const B=U.getBoundingClientRect(),Z=z.left-B.left,Q=z.top-B.top;if(Math.abs(Z)>2||Math.abs(Q)>2){ze.current=!0;const ie=U.animate([{transform:`translate(${Z}px, ${Q}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});k.push(ie)}}),k.length>0?Promise.all(k.map(U=>U.finished)).then(()=>{ze.current=!1}).catch(()=>{ze.current=!1}):ze.current=!1})},[Be,ne]);const[at,Ne]=m.useState(!1);m.useEffect(()=>{at||Ie.getConfig().then(k=>{var A;const U=(A=k==null?void 0:k.ui)==null?void 0:A.vm_matrix_default_filter;U&&(C(U),localStorage.setItem("vm_matrix_default_filter",U)),Ne(!0)}).catch(()=>{const k=localStorage.getItem("vm_matrix_default_filter");k&&C(k),Ne(!0)})},[at]),m.useEffect(()=>{const k=()=>{const A=localStorage.getItem("matrix_card_width");A&&q(parseInt(A,10));const z=localStorage.getItem("matrix_sort_by");z&&z!==ne&&de(z);const B=localStorage.getItem("matrix_group_sort_by");B&&B!==ot&&Le(B);const Z=localStorage.getItem("matrix_group_sort_order");Z&&Z!==H&&se(Z)};window.addEventListener("storage",k);const U=setInterval(k,1e3);return()=>{window.removeEventListener("storage",k),clearInterval(U)}},[ne,ot,H]);const Tn=m.useCallback((k,U)=>{var A;return e&&e.client_health?e.client_health[U]||null:t&&((A=t[k])!=null&&A.client_health)&&t[k].client_health[U]||null},[e,t]),Wt=m.useCallback((k,U,A)=>{k.preventDefault(),k.stopPropagation();const z=Math.min(k.clientX,window.innerWidth-250),B=Math.min(k.clientY,window.innerHeight-300);pe({visible:!0,x:z,y:B,vm:U,clusterId:A})},[]),vn=m.useCallback(()=>{pe(k=>({...k,visible:!1}))},[]),oe=!e&&t&&Object.keys(t).length>0,me=m.useMemo(()=>{const k=[],U=(A,z,B)=>{if(!A.tasks)return;Object.values(A.tasks).forEach(Q=>{var ft;const ie=((ft=Q.task_type)==null?void 0:ft.toLowerCase())||"",xe=ie.includes("migrate"),ve=Q.status==="running",we=!!Q.target_node,mt=ie.startsWith("ha");if(ie.startsWith("qm")||ie.startsWith("vz"),ve&&xe&&we&&!mt){const We=Object.keys(A.vms).find(Ct=>{const dn=A.vms[Ct];return dn.vmid===Q.vmid&&dn.node===Q.node});We&&k.push({vm:A.vms[We],task:Q,targetNode:Q.target_node||"",clusterId:z,clusterLabel:B})}})};return oe&&t?Object.entries(t).forEach(([A,z])=>{U(z,A,z.name||A)}):e&&U(e,e.id,e.name||e.id),k},[e,t,oe]);m.useEffect(()=>{const k=new Set(me.map(z=>`${z.clusterId}:${z.vm.vmid}`)),U=Qt.current,A=M.current;U.forEach(z=>{if(!k.has(z)&&!Fe.has(z)){const B=A.get(z);B&&B.upid&&(async()=>{var Z,Q,ie;try{const xe=await Ie.taskStatus(B.clusterId,B.node,B.upid),ve=(xe==null?void 0:xe.exitstatus)||"";if((xe==null?void 0:xe.status)==="running")return;if(ve&&ve!=="OK"){const mt=((Z=e==null?void 0:e.vms)==null?void 0:Z[`${B.node}/${B.vmid}`])||((ie=(Q=t==null?void 0:t[B.clusterId])==null?void 0:Q.vms)==null?void 0:ie[`${B.node}/${B.vmid}`]),ft=mt&&mt.lock||"migrate";R(We=>We.some(Ct=>Ct.id===z)?We:[...We,{id:z,vmid:B.vmid,sourceNode:B.node,targetNode:B.targetNode,clusterLabel:B.clusterLabel,lock:ft,copied:!1}])}}catch{}})(),A.delete(z)}}),me.forEach(({vm:z,task:B,clusterId:Z,clusterLabel:Q,targetNode:ie})=>{const xe=`${Z}:${z.vmid}`;A.set(xe,{upid:B.upid,node:B.node,vmid:z.vmid,clusterId:Z,clusterLabel:Q,targetNode:ie})}),Qt.current=k},[me,Fe,e,t]);const O=m.useRef(new Map);m.useEffect(()=>{me.forEach(({vm:k,targetNode:U,clusterId:A})=>{const z=`${A}:${k.vmid}`;O.current.set(z,{targetNode:U,sourceNode:k.node,clusterId:A,vmid:k.vmid})})},[me]);const be=m.useRef(new Map);m.useEffect(()=>{Ee.forEach(k=>{const U=`${k.clusterId}:${k.vmid}`;be.current.set(U,{x1:k.x1,y1:k.y1,x2:k.x2,y2:k.y2})})},[Ee]),m.useEffect(()=>{const k=new Set(me.map(U=>`${U.clusterId}:${U.vm.vmid}`));O.current.forEach((U,A)=>{if(!k.has(A)&&!Fe.has(A)){const z=be.current.get(A);if(z){const B=Date.now(),Z=800,Q=()=>{const ie=Date.now()-B,xe=Math.min(ie/Z,1),ve=z.x1+(z.x2-z.x1)*xe,we=z.y1+(z.y2-z.y1)*xe;qt([{x1:ve,y1:we,x2:z.x2,y2:z.y2,vmid:U.vmid,progress:xe}]),xe<1?requestAnimationFrame(Q):qt([])};requestAnimationFrame(Q)}Rt(B=>{const Z=new Map(B);return Z.set(A,{...U,startTime:Date.now()}),Z}),O.current.delete(A),be.current.delete(A),setTimeout(()=>{Rt(B=>{const Z=new Map(B);return Z.delete(A),Z})},1e4)}})},[me,Fe]),m.useEffect(()=>{if(Fe.size===0)return;const k=(U,A)=>{const z=B=>{for(const Z of Object.values(B.vms))if(Z.vmid===U)return Z.node;return null};if(t&&A){const B=t[A];if(B)return z(B)}else if(e)return z(e);return null};Fe.forEach((U,A)=>{const z=k(U.vmid,U.clusterId);z&&z===U.targetNode&&z!==U.sourceNode&&Rt(B=>{const Z=new Map(B);return Z.delete(A),Z})})},[e,t,Fe]);const _e=m.useCallback((k,U)=>{const A=oe?`${U} / `:"";switch(Ae){case"none":return oe?U:"all";case"type":return`${A}${k.type==="qemu"?"VM":"CT"}`;case"tag":return k.tags&&k.tags.length>0?`${A}${k.tags[0]}`:`${A}(no tag)`;case"node":default:return`${A}${k.node}`}},[Ae,oe]),He=m.useMemo(()=>{const k={},U=(A,z,B)=>{Object.entries(A.vms).forEach(([Z,Q])=>{if(W==="running"&&Q.status!=="running"||W==="stopped"&&Q.status!=="stopped"||F&&!Q.name.toLowerCase().includes(F.toLowerCase())&&!String(Q.vmid).includes(F)||Q.template)return;const ie=_e(Q,z);k[ie]||(k[ie]={vms:[],clusterId:B}),k[ie].vms.push(Q)})};return oe?Object.entries(t).forEach(([A,z])=>{const B=z.name||A;U(z,B,A)}):e&&U(e,"",e.id),Object.values(k).forEach(A=>{A.vms.sort((z,B)=>{switch(ne){case"name":return z.name.localeCompare(B.name);case"load":{const Z=z.memory.total_bytes>0?z.memory.used_bytes/z.memory.total_bytes*100:0,Q=B.memory.total_bytes>0?B.memory.used_bytes/B.memory.total_bytes*100:0,ie=z.disk.total_bytes>0?z.disk.used_bytes/z.disk.total_bytes*100:0,xe=B.disk.total_bytes>0?B.disk.used_bytes/B.disk.total_bytes*100:0,ve=Math.max(z.cpu.usage_percent,Z,ie),we=Math.max(B.cpu.usage_percent,Q,xe);if(z.status!=="running"&&B.status==="running")return 1;if(z.status==="running"&&B.status!=="running")return-1;if(z.status!=="running"&&B.status!=="running")return z.vmid-B.vmid;const mt=Ct=>Ct>=95?0:Ct>=80?1:2,ft=mt(ve),We=mt(we);return ft!==We?ft-We:we-ve}case"vmid":default:return z.vmid-B.vmid}})}),k},[e,t,oe,W,F,ne,_e]),Se=m.useMemo(()=>{const k=[],U=new Map;return oe&&t&&Object.entries(t).forEach(([A,z])=>{const B=z.name||A;Object.values(z.nodes||{}).forEach(Z=>{Z&&Z.node&&U.set(Z.node,{id:A,label:B})})}),me.forEach(({vm:A,targetNode:z,clusterId:B,clusterLabel:Z})=>{const Q=U.get(z),ie=Q&&Q.id!==B?Q:{id:B,label:Z},xe=oe?`${ie.label} / ${z}`:z,ve=oe?`${Z} / ${A.node}`:A.node;k.push({vm:A,targetGroupKey:xe,sourceGroupKey:ve,clusterId:B,targetClusterId:ie.id})}),k},[me,oe,t]);m.useEffect(()=>{if(T!=="grid"||Se.length===0){rt([]);return}const k=()=>{const B=re.current;if(!B)return;const Z=B.getBoundingClientRect(),Q=B.scrollLeft,ie=B.scrollTop,xe=[];Se.forEach(({vm:ve})=>{const we=`${ve.cluster_id}/${ve.node}/${ve.vmid}`,mt=`ghost-${ve.cluster_id}-${ve.vmid}`,ft=Je.current.get(we),We=Je.current.get(mt);if(ft&&We){const Ct=ft.getBoundingClientRect(),dn=We.getBoundingClientRect();xe.push({x1:Ct.left+Ct.width/2-Z.left+Q,y1:Ct.top+Ct.height/2-Z.top+ie,x2:dn.left+dn.width/2-Z.left+Q,y2:dn.top+dn.height/2-Z.top+ie,vmid:ve.vmid,clusterId:ve.cluster_id})}}),rt(xe)},U=setTimeout(k,100),A=setInterval(k,500),z=re.current;return z&&z.addEventListener("scroll",k),()=>{clearTimeout(U),clearInterval(A),z&&z.removeEventListener("scroll",k)}},[Se,T]);const Re=m.useMemo(()=>{const k=[],U=(A,z,B)=>{Object.values(A.vms).forEach(Z=>{W==="running"&&Z.status!=="running"||W==="stopped"&&Z.status!=="stopped"||F&&!Z.name.toLowerCase().includes(F.toLowerCase())&&!String(Z.vmid).includes(F)||Z.template||k.push({...Z,clusterName:z,clusterId:B})})};return oe?Object.entries(t).forEach(([A,z])=>{const B=z.name||A;U(z,B,A)}):e&&U(e,e.name||"Cluster",e.id),k.sort((A,z)=>{var Z,Q,ie,xe;let B=0;switch(V){case"name":B=A.name.localeCompare(z.name);break;case"vmid":B=A.vmid-z.vmid;break;case"type":B=A.type.localeCompare(z.type);break;case"node":B=A.node.localeCompare(z.node);break;case"status":B=A.status.localeCompare(z.status);break;case"cpu":B=A.cpu.usage_percent-z.cpu.usage_percent;break;case"memory":B=A.memory.used_bytes/A.memory.total_bytes-z.memory.used_bytes/z.memory.total_bytes;break;case"uptime":B=A.uptime-z.uptime;break;case"rx":B=(((Z=A.network)==null?void 0:Z.rx_bytes_sec)||0)-(((Q=z.network)==null?void 0:Q.rx_bytes_sec)||0);break;case"tx":B=(((ie=A.network)==null?void 0:ie.tx_bytes_sec)||0)-(((xe=z.network)==null?void 0:xe.tx_bytes_sec)||0);break;case"task":{const ve=vs(A.vmid,A.node,A.cluster_id,e,t),we=vs(z.vmid,z.node,z.cluster_id,e,t);ve&&!we?B=-1:!ve&&we?B=1:ve&&we?B=ve.task_type.localeCompare(we.task_type):B=0;break}}return ae==="asc"?B:-B}),k},[e,t,oe,W,F,V,ae]),$e=k=>{Qe(!0),setTimeout(()=>Qe(!1),300),V===k?le(ae==="asc"?"desc":"asc"):(J(k),le("asc"))},Vt=m.useMemo(()=>{if(!o)return null;if(e)return e.vms[o]||null;if(t){for(const k of Object.values(t))if(k.vms[o])return k.vms[o]}return null},[o,e,t]);if(!e&&!oe)return r.jsx("div",{className:"holo-matrix empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const{totalVMs:yn,runningVMs:nr}=m.useMemo(()=>{let k=0,U=0;const A=z=>{Object.values(z.vms).forEach(B=>{B.template||(k++,B.status==="running"&&U++)})};return oe?Object.values(t).forEach(A):e&&A(e),{totalVMs:k,runningVMs:U}},[e,t,oe]);return r.jsxs("div",{className:"holo-matrix",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"matrix-header",children:[r.jsxs("div",{className:"matrix-title-section",children:[r.jsxs("h1",{className:"matrix-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),r.jsxs("div",{className:"matrix-stats",children:[r.jsxs("span",{className:"stat-running",children:[nr," ",n("matrix.running")]}),r.jsx("span",{className:"stat-divider",children:"/"}),r.jsxs("span",{className:"stat-total",children:[yn," ",n("matrix.total")]})]})]}),r.jsxs("div",{className:"matrix-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("matrix.search"),value:F,onChange:k=>X(k.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${W==="all"?"active":""}`,onClick:()=>C("all"),children:n("matrix.filter_all")}),r.jsx("button",{className:`filter-tab ${W==="running"?"active":""}`,onClick:()=>C("running"),children:n("matrix.filter_running")}),r.jsx("button",{className:`filter-tab ${W==="stopped"?"active":""}`,onClick:()=>C("stopped"),children:n("matrix.filter_stopped")})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[n("settings.sort_by"),":"]}),r.jsx("button",{className:`sort-btn ${ne==="vmid"?"active":""}`,onClick:()=>{de("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:"ID"}),r.jsx("button",{className:`sort-btn ${ne==="name"?"active":""}`,onClick:()=>{de("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:n("settings.sort_name")}),r.jsx("button",{className:`sort-btn ${ne==="load"?"active":""}`,onClick:()=>{de("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:n("settings.sort_load")})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[n("matrix.group_by"),":"]}),r.jsx("button",{className:`sort-btn ${Ae==="none"?"active":""}`,onClick:()=>{Ze("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:n("matrix.group_none")}),r.jsx("button",{className:`sort-btn ${Ae==="node"?"active":""}`,onClick:()=>{Ze("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:n("matrix.group_node")}),r.jsx("button",{className:`sort-btn ${Ae==="type"?"active":""}`,onClick:()=>{Ze("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:n("matrix.group_type")}),r.jsx("button",{className:`sort-btn ${Ae==="tag"?"active":""}`,onClick:()=>{Ze("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:n("matrix.group_tag")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${T==="grid"?"active":""}`,onClick:()=>L("grid"),title:a==="zh-TW"?"方格檢視":"Grid view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),r.jsx("button",{className:`view-btn ${T==="table"?"active":""}`,onClick:()=>L("table"),title:a==="zh-TW"?"表格檢視":"Table view",children:r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})}),r.jsx("button",{className:`view-btn ${T==="thumb"?"active":""}`,onClick:()=>L("thumb"),title:a==="zh-TW"?"縮圖檢視":"Thumbnail view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),r.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),r.jsx("path",{d:"M21 15l-5-5L5 21"})]})})]}),T==="thumb"&&r.jsxs("div",{className:"thumb-size",children:[r.jsx("span",{className:"thumb-size-label",children:a==="zh-TW"?"尺寸":"Size"}),r.jsx("input",{type:"range",min:160,max:640,step:20,value:D,onChange:k=>Y(parseInt(k.target.value,10)),className:"thumb-size-slider"}),r.jsxs("span",{className:"thumb-size-val",children:[D,"px"]})]})]})]}),r.jsxs("div",{className:"matrix-content",children:[T==="grid"?r.jsxs("div",{className:"matrix-grid",ref:re,children:[Ee.length>0&&r.jsxs("svg",{className:"migration-lines-overlay",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),r.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),r.jsxs("filter",{id:"migrationGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),Ee.map((k,U)=>r.jsxs("g",{children:[r.jsx("line",{className:"migration-line",x1:k.x1,y1:k.y1,x2:k.x2,y2:k.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),r.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${k.x1},${k.y1} L${k.x2},${k.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${k.x1},${k.y1} L${k.x2},${k.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${k.x1},${k.y1} L${k.x2},${k.y2}`})})]},`line-${k.vmid}-${U}`))]}),it.length>0&&r.jsxs("svg",{className:"migration-lines-overlay completing",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),r.jsxs("filter",{id:"completingGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),it.map((k,U)=>r.jsxs("g",{children:[r.jsx("line",{className:"completing-line",x1:k.x1,y1:k.y1,x2:k.x2,y2:k.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-k.progress)+1,filter:"url(#completingGlow)",opacity:1-k.progress*.5}),k.progress>.8&&r.jsx("circle",{cx:k.x2,cy:k.y2,r:20*(k.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(k.progress-.8)*5})]},`completing-${k.vmid}-${U}`))]}),(()=>{const k=new Map;Object.entries(He).forEach(([z,B])=>{k.set(z,B)}),Se.forEach(z=>{k.has(z.targetGroupKey)||k.set(z.targetGroupKey,{vms:[],clusterId:z.clusterId})});const U=Array.from(k.entries()).sort((z,B)=>{const[Z]=z,[Q]=B,ie=mt=>{if(mt.includes(" / ")){const[ft,We]=mt.split(" / ");return{cluster:ft,node:We}}return{cluster:"",node:mt}},xe=ie(Z),ve=ie(Q);let we=0;return ot==="cluster"?(we=xe.cluster.localeCompare(ve.cluster),we===0&&(we=xe.node.localeCompare(ve.node))):(we=xe.node.localeCompare(ve.node),we===0&&(we=xe.cluster.localeCompare(ve.cluster))),H==="desc"?-we:we});let A=0;return U.map(([z,B])=>{const Z=Se.filter(Q=>Q.targetGroupKey===z);return r.jsxs("div",{className:`node-section ${B.vms.length===0&&Z.length>0?"ghost-only":""}`,children:[r.jsxs("div",{className:"node-section-header",children:[r.jsx("span",{className:"node-section-name",children:z}),r.jsxs("span",{className:"node-section-count",children:[B.vms.length,Z.length>0&&r.jsxs("span",{className:"incoming-count",children:[" +",Z.length]})]})]}),r.jsxs("div",{className:`vm-grid ${ne==="load"&&!tt?"sort-by-load":""} ${tt?"initial-load":""}`,children:[vt&&B.vms.map(Q=>{const ie=`${Q.cluster_id}/${Q.node}/${Q.vmid}`,xe=vs(Q.vmid,Q.node,Q.cluster_id,e,t),ve=`${Q.cluster_id}:${Q.vmid}`,we=Fe.get(ve);if(we&&we.sourceNode===Q.node||Se.find(We=>We.targetClusterId===Q.cluster_id&&We.vm.vmid===Q.vmid))return null;const ft=A++;return r.jsx(Yd,{ref:We=>{We?Je.current.set(ie,We):Je.current.delete(ie)},vm:Q,isSelected:o===ie,onClick:()=>i(o===ie?null:ie),onContextMenu:We=>Wt(We,Q,B.clusterId),animationDelay:tt?ft*50:0,task:xe,isCompleting:!!we},ie)}).filter(Boolean),vt&&Z.map(Q=>{var ve;const ie=`ghost-${Q.vm.cluster_id}-${Q.vm.vmid}`,xe=(ve=me.find(we=>we.vm.vmid===Q.vm.vmid&&we.clusterId===Q.vm.cluster_id))==null?void 0:ve.task;return r.jsx(Yd,{ref:we=>{we?Je.current.set(ie,we):Je.current.delete(ie)},vm:Q.vm,isSelected:!1,onClick:()=>{},onContextMenu:we=>we.preventDefault(),animationDelay:0,task:xe,isGhost:!0},ie)})]},`grid-${W}-${F}-${ne}-${ge}`)]},z)})})(),Object.keys(He).length===0&&Se.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}):T==="thumb"?r.jsx("div",{className:"matrix-thumb-grid",style:{gridTemplateColumns:`repeat(auto-fill, minmax(${D}px, 1fr))`},children:Re.length===0?r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})}):Re.map(k=>{var xe;const U=k.type==="lxc",A=k.status==="running",z=((xe=k.cpu)==null?void 0:xe.usage_percent)??0,B=k.memory&&k.memory.total_bytes>0?k.memory.used_bytes/k.memory.total_bytes*100:0,Z=k.cluster_id||k.clusterId||(e==null?void 0:e.id)||"",Q=`/api/console/screenshot/${encodeURIComponent(Z)}/${encodeURIComponent(k.node)}/${k.vmid}?max=${Math.max(160,Math.min(D,640))}&t=${K}`,ie=`${k.cluster_id||k.clusterId||""}/${k.node}/${k.vmid}`;return r.jsxs("div",{className:`vm-thumb-card status-${k.status}`,onClick:()=>i(o===ie?null:ie),onContextMenu:ve=>Wt(ve,k,Z),children:[r.jsx("div",{className:"vm-thumb-image",children:A&&!U?r.jsx("img",{src:Q,alt:`VM ${k.vmid} screenshot`,loading:"lazy",onError:ve=>{ve.target.style.visibility="hidden"}}):r.jsxs("div",{className:"vm-thumb-placeholder",children:[r.jsx("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:U?r.jsxs(r.Fragment,{children:[r.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"1"}),r.jsx("path",{d:"M7 9l3 3-3 3M13 15h4"})]}):r.jsxs(r.Fragment,{children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"14",rx:"1"}),r.jsx("path",{d:"M8 21h8M12 17v4"})]})}),r.jsx("span",{children:U?a==="zh-TW"?"容器無框架緩衝":"no framebuffer":k.status==="stopped"?a==="zh-TW"?"已停止":"stopped":a==="zh-TW"?"無預覽":"no preview"})]})}),r.jsxs("div",{className:"vm-thumb-meta",children:[r.jsxs("div",{className:"vm-thumb-title",children:[r.jsx("span",{className:`type-badge ${k.type}`,children:U?"CT":"VM"}),r.jsxs("code",{className:"vm-thumb-id",children:["#",k.vmid]}),r.jsx("span",{className:"vm-thumb-name",children:k.name})]}),A&&r.jsxs("div",{className:"vm-thumb-bars",children:[r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${he(z)}`,style:{width:`${Math.min(z,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${he(z)}`,children:Xe(z,1)})]}),r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${he(B)}`,style:{width:`${Math.min(B,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${he(B)}`,children:Xe(B,0)})]})]})]})]},ie)})}):r.jsxs("div",{className:"matrix-table-container",children:[r.jsxs("table",{className:"vm-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsxs("th",{className:`sortable ${V==="status"?"sorted":""}`,onClick:()=>$e("status"),children:[r.jsx("span",{children:n("node.status")}),V==="status"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="vmid"?"sorted":""}`,onClick:()=>$e("vmid"),children:[r.jsx("span",{children:"VMID"}),V==="vmid"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="type"?"sorted":""}`,onClick:()=>$e("type"),children:[r.jsx("span",{children:n("table.type")}),V==="type"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="name"?"sorted":""}`,onClick:()=>$e("name"),children:[r.jsx("span",{children:n("table.name")}),V==="name"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsx("th",{className:"tags-header",children:n("table.tags")}),r.jsxs("th",{className:`sortable ${V==="node"?"sorted":""}`,onClick:()=>$e("node"),children:[r.jsx("span",{children:n("table.node")}),V==="node"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="cpu"?"sorted":""}`,onClick:()=>$e("cpu"),children:[r.jsx("span",{children:n("metric.cpu")}),V==="cpu"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="memory"?"sorted":""}`,onClick:()=>$e("memory"),children:[r.jsx("span",{children:n("metric.memory")}),V==="memory"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${V==="rx"?"sorted":""}`,onClick:()=>$e("rx"),children:[r.jsxs("span",{children:["↓ ",n("metric.rx")]}),V==="rx"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${V==="tx"?"sorted":""}`,onClick:()=>$e("tx"),children:[r.jsxs("span",{children:["↑ ",n("metric.tx")]}),V==="tx"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${V==="uptime"?"sorted":""}`,onClick:()=>$e("uptime"),children:[r.jsx("span",{children:n("table.uptime")}),V==="uptime"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable task-header ${V==="task"?"sorted":""}`,onClick:()=>$e("task"),children:[r.jsx("span",{children:n("table.task")}),V==="task"&&r.jsx("span",{className:"sort-indicator",children:ae==="asc"?"▲":"▼"})]})]})}),r.jsx("tbody",{children:Re.map(k=>{const U=`${k.cluster_id}/${k.node}/${k.vmid}`,A=k.status==="running",z=k.cpu.usage_percent,B=k.memory.used_bytes/k.memory.total_bytes*100,Z=vs(k.vmid,k.node,k.cluster_id,e,t);return r.jsxs("tr",{className:`${o===U?"selected":""} ${k.status} ${ue?"sort-animating":""}`,onClick:()=>i(o===U?null:U),onContextMenu:Q=>Wt(Q,k,k.clusterId),children:[r.jsx("td",{children:r.jsx("span",{className:`status-badge ${ml(k.status)}`,children:k.status.toUpperCase()})}),r.jsx("td",{className:"vmid-cell",children:k.vmid}),r.jsx("td",{className:"type-cell",children:r.jsx("span",{className:`type-badge ${k.type}`,children:k.type==="qemu"?"VM":"CT"})}),r.jsx("td",{className:"name-cell",children:k.name}),r.jsx("td",{className:"tags-cell",children:(()=>{const Q=(k.tags||[]).map(ie=>(ie||"").trim()).filter(Boolean);return Q.length>0?r.jsx("div",{className:"vm-tags",children:Q.map((ie,xe)=>r.jsx("span",{className:"vm-tag",children:ie},xe))}):null})()}),r.jsx("td",{className:"node-cell",children:k.node}),r.jsx("td",{children:A?r.jsxs("div",{className:"cpu-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${he(z)}`,style:{width:`${z}%`}})}),r.jsx("span",{className:`text-${he(z)}`,children:Xe(z,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:A?r.jsxs("div",{className:"mem-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${he(B)}`,style:{width:`${B}%`}})}),r.jsx("span",{children:Xe(B,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-rx-cell",children:A?r.jsxs("span",{className:"net-rx",children:[Ce(k.network.rx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-tx-cell",children:A?r.jsxs("span",{className:"net-tx",children:[Ce(k.network.tx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:A?r.jsx("span",{className:"uptime-cell",children:Io(k.uptime)}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"task-cell",children:Z&&r.jsx(eh,{task:Z})})]},U)})})]}),Re.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}),Vt&&r.jsx(bh,{vm:Vt,onClose:()=>i(null)},`${Vt.node}/${Vt.vmid}`)]}),r.jsx(yh,{state:ce,onClose:vn,onShowDetails:()=>{ce.vm&&i(`${ce.vm.node}/${ce.vm.vmid}`)},onPowerAction:w,onOpenConsole:async()=>{if(!ce.vm)return;const k=ce.vm,U=ce.clusterId;if(N==="disabled"){await s.alert(n("console.disabled"));return}if(N==="prompt"){S({vm:k,clusterId:U});return}try{const A=await Ie.consolePrepare({cluster_id:U,node:k.node,vmid:k.vmid});P(U,k,A.console_token,A.vnc_password)}catch(A){const z=A instanceof Error?A.message:String(A);await s.alert(n("console.prepare_failed",{err:z}))}},onRemoteMigrate:()=>{ce.vm&&f({vm:ce.vm,clusterId:ce.clusterId})},onOpenSnapshots:()=>{ce.vm&&x({vm:ce.vm,clusterId:ce.clusterId})},onBackupNow:()=>{ce.vm&&j({vm:ce.vm,clusterId:ce.clusterId})},getNodeHealth:Tn,userRole:((Rn=c.user)==null?void 0:Rn.role_global)??null,consoleMode:N,consolePasswordSet:!!h[ce.clusterId]}),r.jsx(nh,{open:l!==null,title:l?gi(l.action,n):"",destructive:l?vh(l.action):!1,details:l?r.jsxs(r.Fragment,{children:[n(l.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:gi(l.action,n),vmid:String(l.vm.vmid),name:l.vm.name,node:l.vm.node,cluster:l.clusterId}),l.action==="stop"&&r.jsxs(r.Fragment,{children:[r.jsx("br",{}),r.jsx("br",{}),r.jsx("strong",{style:{color:"#ff8a3c"},children:n("confirm.hard_stop_warning")})]})]}):null,confirmLabel:l?gi(l.action,n):n("action.cancel"),onConfirm:I,onCancel:()=>d(null)}),r.jsx(ah,{open:p!==null,cluster_id:(p==null?void 0:p.clusterId)||"",vm:p?{vmid:p.vm.vmid,name:p.vm.name,node:p.vm.node,type:p.vm.type}:null,onClose:()=>f(null)}),r.jsx(ch,{open:u!==null,cluster_id:(u==null?void 0:u.clusterId)||"",vm:u?{vmid:u.vm.vmid,name:u.vm.name,node:u.vm.node,type:u.vm.type}:null,onClose:()=>x(null)}),r.jsx(ph,{open:y!==null,cluster_id:(y==null?void 0:y.clusterId)||"",vm:y?{vmid:y.vm.vmid,name:y.vm.name,node:y.vm.node,type:y.vm.type}:null,onClose:()=>j(null)}),r.jsx(gh,{open:_!==null,cluster_id:(_==null?void 0:_.clusterId)||"",pveUser:(()=>{const k=_==null?void 0:_.clusterId;if(!k)return"root@pam";const U=t&&t[k]||((e==null?void 0:e.id)===k?e:null);return"root@pam"})(),onCancel:()=>S(null),onSubmit:async k=>{if(!_)return;const{vm:U,clusterId:A}=_,z=await Ie.consolePrepare({cluster_id:A,node:U.node,vmid:U.vmid,password:k});P(A,U,z.console_token,z.vnc_password),S(null)}}),E.length>0&&r.jsx("div",{className:"mig-fail-stack",children:E.map(k=>{const U=`qm unlock ${k.vmid}`;return r.jsxs("div",{className:"mig-fail-toast",children:[r.jsxs("div",{className:"mig-fail-head",children:["⚠ ",n("mig.failed.title")]}),r.jsx("div",{className:"mig-fail-body",children:n("mig.failed.body",{vmid:k.vmid,target:k.targetNode||"?",lock:k.lock})}),r.jsx("div",{className:"mig-fail-cmd-line",children:r.jsxs("span",{className:"mig-fail-cmd-hint",children:[n("mig.failed.cmd_hint")," ",r.jsx("code",{children:k.sourceNode})]})}),r.jsxs("div",{className:"mig-fail-cmd-row",children:[r.jsx("code",{className:"mig-fail-cmd",children:U}),r.jsx("button",{className:"mig-fail-btn",onClick:()=>{var A;(A=navigator.clipboard)==null||A.writeText(U).then(()=>{R(z=>z.map(B=>B.id===k.id?{...B,copied:!0}:B))})},children:k.copied?n("mig.failed.copied"):n("mig.failed.copy")})]}),r.jsx("button",{className:"mig-fail-dismiss",onClick:()=>R(A=>A.filter(z=>z.id!==k.id)),"aria-label":n("mig.failed.dismiss"),children:"×"})]},k.id)})}),r.jsxs("div",{className:"matrix-legend",children:[r.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color success"}),r.jsx("span",{className:"legend-label",children:"<80%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color warning"}),r.jsx("span",{className:"legend-label",children:"80-95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color danger"}),r.jsx("span",{className:"legend-label",children:">95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color muted"}),r.jsx("span",{className:"legend-label",children:"Stopped"})]}),r.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"})]}),r.jsx("style",{children:`
        .holo-matrix {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
          padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-xs) var(--spacing-lg);
          display: flex;
          flex-direction: column;
        }

        .holo-matrix.empty {
          align-items: center;
          justify-content: center;
        }

        .empty-message {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          color: var(--text-secondary);
          font-family: var(--font-display);
        }

        /* Header */
        .matrix-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-lg);
          flex-wrap: wrap;
          gap: var(--spacing-md);
        }

        .matrix-title-section {
          display: flex;
          align-items: baseline;
          gap: var(--spacing-md);
        }

        .matrix-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .matrix-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }

        .matrix-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: matrixIconPulse 2s ease-in-out infinite;
        }

        @keyframes matrixIconPulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .matrix-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.2em;
        }

        .matrix-stats {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .stat-running {
          color: var(--success);
        }

        .stat-divider {
          margin: 0 var(--spacing-xs);
          color: var(--text-muted);
        }

        .matrix-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-xs) var(--spacing-sm);
        }

        .search-box svg {
          color: var(--text-muted);
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          width: 75px;
        }

        .search-box input::placeholder {
          color: var(--text-muted);
        }

        .filter-tabs {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .filter-tab {
          padding: 4px 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 12px;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        .filter-tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .filter-tab.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: 0 0 6px var(--primary);
        }

        /* Sort Selector */
        .sort-selector {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg-tertiary);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
        }

        .sort-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          margin-right: 2px;
        }

        .sort-btn {
          padding: 4px 8px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 12px;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        .sort-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .sort-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: 0 0 6px var(--primary);
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          gap: 2px;
          background: var(--bg-tertiary);
          padding: 2px;
          border-radius: var(--radius-sm);
        }

        /* Thumbnail-size slider — only shown in thumb view */
        .thumb-size {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 12px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
        }
        .thumb-size-label {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .thumb-size-val {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--primary);
          min-width: 48px;
          text-align: right;
        }
        .thumb-size-slider {
          width: 130px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: var(--bg-primary);
          border-radius: 2px;
          outline: none;
        }
        .thumb-size-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px; height: 14px;
          background: var(--primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
        }
        .thumb-size-slider::-moz-range-thumb {
          width: 14px; height: 14px;
          background: var(--primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
          border: none;
        }

        /* Thumbnail grid view */
        .matrix-thumb-grid {
          display: grid;
          gap: 14px;
          padding: var(--spacing-md);
          align-content: start;
        }
        .vm-thumb-card {
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, 0.18);
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color .15s, transform .15s, box-shadow .15s;
        }
        .vm-thumb-card:hover {
          border-color: rgba(0, 240, 255, 0.55);
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(0, 240, 255, 0.18),
                      0 0 0 1px rgba(0, 240, 255, 0.12);
        }
        .vm-thumb-card.status-stopped { opacity: .65; }
        .vm-thumb-card.status-stopped .vm-thumb-image { background: #02050b; }
        .vm-thumb-image {
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #000;
          display: flex; align-items: center; justify-content: center;
          border-bottom: 1px solid rgba(0, 240, 255, 0.12);
          overflow: hidden;
        }
        .vm-thumb-image img {
          width: 100%; height: 100%;
          object-fit: contain;
          background: #000;
        }
        .vm-thumb-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.05em;
        }
        .vm-thumb-meta {
          padding: 8px 10px;
        }
        .vm-thumb-title {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 6px;
        }
        .vm-thumb-id {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        .vm-thumb-name {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-primary);
          letter-spacing: 0.05em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 0;
        }
        .vm-thumb-bars {
          display: flex; flex-direction: column; gap: 4px;
        }
        .vm-thumb-bar {
          display: flex; align-items: center; gap: 6px;
        }
        .vm-thumb-bar-label {
          font-family: var(--font-display);
          font-size: 11px;
          color: var(--text-secondary);
          width: 28px;
          letter-spacing: 0.05em;
        }
        .vm-thumb-bar-val {
          font-family: var(--font-mono);
          font-size: 11px;
          min-width: 40px;
          text-align: right;
        }

        .view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xs);
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
          background: var(--bg-card);
          color: var(--primary);
        }

        /* Content */
        .matrix-content {
          flex: 1;
          display: flex;
          gap: var(--spacing-lg);
          min-height: 0;
        }

        .matrix-grid {
          flex: 1;
          overflow: auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
          position: relative;
        }

        /* Migration lines SVG overlay */
        .migration-lines-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
          overflow: visible;
        }

        .migration-line {
          stroke-dasharray: 8 4;
          animation: migrationLineDash 0.5s linear infinite;
        }

        @keyframes migrationLineDash {
          to {
            stroke-dashoffset: -12;
          }
        }

        .migration-particle {
          filter: drop-shadow(0 0 4px currentColor);
        }

        /* Incoming migration count badge */
        .incoming-count {
          color: var(--accent);
          font-size: 12px;
          animation: incomingPulse 1.5s ease-in-out infinite;
        }

        @keyframes incomingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Node Section */
        .node-section {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--spacing-sm) var(--spacing-md);
        }

        .node-section.ghost-only {
          border-color: var(--accent);
          border-style: dashed;
          background: rgba(224, 102, 255, 0.05);
          animation: ghostSectionPulse 2s ease-in-out infinite;
        }

        @keyframes ghostSectionPulse {
          0%, 100% { border-color: var(--accent); }
          50% { border-color: var(--primary); }
        }

        .node-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-xs);
          border-bottom: 1px solid var(--border);
        }

        .node-section-name {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .node-section-count {
          font-family: var(--font-mono);
          font-size: 13px;
          color: #ffffff;
        }

        /* VM Grid */
        .vm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(${ee}px, 1fr));
          gap: var(--spacing-xs);
        }

        .vm-cell {
          cursor: pointer;
          opacity: 0;
          animation-name: vm-materialize;
          animation-duration: 0.4s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
        }

        @keyframes vm-materialize {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(15px);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Sort by load animations - disable entry animation, show immediately */
        .vm-grid.sort-by-load .vm-cell {
          animation: none !important;
          opacity: 1 !important;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        @keyframes load-reorder {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .vm-grid.sort-by-load .vm-cell {
          animation: load-reorder 0.3s ease-out;
        }

        .vm-cell-inner {
          width: 100%;
          height: 100%;
          min-height: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: var(--spacing-xs);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        /* Holographic scan line effect on entry */
        .vm-cell-inner::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.8), transparent);
          animation: vm-scan-line 0.6s ease-out var(--anim-delay) forwards;
          opacity: 0;
        }

        @keyframes vm-scan-line {
          0% {
            top: -10%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }

        .vm-cell:hover .vm-cell-inner {
          transform: scale(1.05);
          z-index: 1;
        }

        .vm-cell.selected .vm-cell-inner {
          border-color: var(--primary);
          box-shadow: var(--primary-glow);
        }

        .vm-cell.running .vm-cell-inner.success {
          border-color: var(--success);
          background: rgba(0, 255, 136, 0.1);
        }

        .vm-cell.running .vm-cell-inner.warning {
          border-color: var(--warning);
          background: rgba(255, 107, 0, 0.1);
          animation: warning-pulse 2s ease-in-out infinite;
        }

        .vm-cell.running .vm-cell-inner.danger {
          border-color: var(--danger);
          background: rgba(255, 0, 64, 0.1);
          animation: danger-pulse 1s ease-in-out infinite;
        }

        .vm-cell.stopped .vm-cell-inner {
          opacity: 0.4;
        }

        .vm-name {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          text-align: center;
          line-height: 1.2;
          word-break: break-all;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .vm-cell.running .vm-name {
          color: var(--text-primary);
        }

        .vm-id {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--primary-dim);
        }

        .vm-cell.running .vm-id {
          color: var(--primary);
        }

        /* Task indicator on grid cells */
        .vm-cell.has-task {
          position: relative;
        }

        .vm-cell.has-task .vm-cell-inner {
          border-color: var(--accent);
          background: rgba(224, 102, 255, 0.1);
        }

        .vm-task-icon {
          position: absolute;
          top: 2px;
          right: 4px;
          font-size: 13px;
          color: var(--accent);
          animation: taskSpin 2s linear infinite;
        }

        @keyframes taskSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .vm-task-label {
          position: absolute;
          top: -8px;
          left: -4px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border: 1px solid;
          border-radius: 3px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          z-index: 15;
          background: #0a1520;
        }

        @keyframes taskLabelPulse {
          0%, 100% {
            opacity: 0.9;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .vm-task-ring {
          position: absolute;
          inset: -3px;
          border: 2px solid var(--accent);
          border-radius: var(--radius-sm);
          opacity: 0.6;
          animation: taskPulse 1.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes taskPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
            box-shadow: 0 0 8px var(--accent);
          }
          50% {
            transform: scale(1.03);
            opacity: 0.9;
            box-shadow: 0 0 15px var(--accent), 0 0 25px rgba(224, 102, 255, 0.3);
          }
        }

        /* Backup specific styles - Orange color */
        .vm-cell.backup {
          position: relative;
          z-index: 10;
        }

        .vm-cell.backup .vm-cell-inner {
          border-color: #ff9500;
          border-width: 2px;
          background: linear-gradient(135deg, rgba(255, 149, 0, 0.2) 0%, rgba(255, 120, 0, 0.15) 100%);
          animation: backupPulse 1.5s ease-in-out infinite;
        }

        @keyframes backupPulse {
          0%, 100% {
            box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.4), inset 0 0 15px rgba(255, 149, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 20px #ff9500, 0 0 40px rgba(255, 149, 0, 0.5), inset 0 0 25px rgba(255, 149, 0, 0.2);
          }
        }

        .vm-cell.backup .vm-name,
        .vm-cell.backup .vm-id {
          color: #ff9500;
          text-shadow: 0 0 8px rgba(255, 149, 0, 0.6);
        }

        .vm-backup-icon {
          position: absolute;
          top: 2px;
          right: 4px;
          font-size: 15px;
          color: #ff9500;
          text-shadow: 0 0 10px #ff9500;
          animation: backupIconPulse 0.8s ease-in-out infinite;
        }

        @keyframes backupIconPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        .backup-ring {
          position: absolute;
          inset: -4px;
          border: 2px solid #ff9500;
          border-radius: var(--radius-sm);
          animation: backupRingPulse 1.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes backupRingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
            box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.3);
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
            box-shadow: 0 0 20px #ff9500, 0 0 40px rgba(255, 149, 0, 0.5);
          }
        }

        .backup-scanner {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: var(--radius-sm);
          pointer-events: none;
        }

        .backup-scanner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #ff9500, #ffb740, #ff9500, transparent);
          animation: backupScan 1.5s linear infinite;
          box-shadow: 0 0 10px #ff9500, 0 0 20px rgba(255, 149, 0, 0.8);
        }

        @keyframes backupScan {
          0% {
            top: 0;
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0.3;
          }
        }

        .backup-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
        }

        .backup-particles .bp {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ff9500;
          border-radius: 50%;
          box-shadow: 0 0 6px #ff9500, 0 0 12px rgba(255, 149, 0, 0.8);
        }

        .backup-particles .bp1 {
          top: 20%;
          right: -8px;
          animation: backupParticle 1.2s ease-out infinite;
        }

        .backup-particles .bp2 {
          top: 50%;
          right: -8px;
          animation: backupParticle 1.2s ease-out 0.3s infinite;
        }

        .backup-particles .bp3 {
          top: 80%;
          right: -8px;
          animation: backupParticle 1.2s ease-out 0.6s infinite;
        }

        .backup-particles .bp4 {
          top: 50%;
          left: -8px;
          animation: backupParticleLeft 1.2s ease-out 0.4s infinite;
        }

        @keyframes backupParticle {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(20px) scale(0);
            opacity: 0;
          }
        }

        @keyframes backupParticleLeft {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-20px) scale(0);
            opacity: 0;
          }
        }

        /* Migration specific styles - Source VM */
        .vm-cell.migrating {
          position: relative;
          z-index: 10;
        }

        .vm-cell.migrating .vm-cell-inner {
          border-color: #00f0ff;
          border-width: 2px;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 180, 220, 0.25) 100%);
          animation: migrateSourcePulse 1.2s ease-in-out infinite;
        }

        @keyframes migrateSourcePulse {
          0%, 100% {
            box-shadow: 0 0 8px #00f0ff, 0 0 16px rgba(0, 240, 255, 0.4), inset 0 0 12px rgba(0, 240, 255, 0.15);
          }
          50% {
            box-shadow: 0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.25);
          }
        }

        .vm-cell.migrating .vm-name,
        .vm-cell.migrating .vm-id {
          color: #00f0ff;
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
        }

        .vm-migrate-icon {
          position: absolute;
          top: 50%;
          right: -10px;
          transform: translateY(-50%);
          z-index: 5;
        }

        .migrate-arrow {
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
          color: #00f0ff;
          text-shadow: 0 0 12px #00f0ff, 0 0 24px #00f0ff;
          animation: arrowPulse 0.6s ease-in-out infinite;
        }

        @keyframes arrowPulse {
          0%, 100% { transform: translateX(0) scale(1); opacity: 1; }
          50% { transform: translateX(5px) scale(1.1); opacity: 0.8; }
        }

        .migrate-ring {
          position: absolute;
          inset: -5px;
          border: 2px solid #00f0ff;
          border-radius: var(--radius-sm);
          animation: migrateRingSpin 3s linear infinite;
          pointer-events: none;
          background: repeating-conic-gradient(
            from 0deg,
            transparent 0deg 30deg,
            rgba(0, 240, 255, 0.15) 30deg 60deg
          );
        }

        @keyframes migrateRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .migrate-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00f0ff;
          border-radius: 50%;
          box-shadow: 0 0 6px #00f0ff, 0 0 12px #00f0ff;
        }

        .particle.p1 {
          top: 15%;
          animation: particleFlow 1.2s linear infinite;
        }

        .particle.p2 {
          top: 50%;
          animation: particleFlow 1.2s linear infinite 0.4s;
        }

        .particle.p3 {
          top: 85%;
          animation: particleFlow 1.2s linear infinite 0.8s;
        }

        @keyframes particleFlow {
          0% {
            left: -5px;
            opacity: 0;
            transform: scale(0.3);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            left: calc(100% + 15px);
            opacity: 0;
            transform: scale(0.3);
          }
        }

        .migrate-target-label {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          color: #00f0ff;
          white-space: nowrap;
          text-shadow: 0 0 8px #00f0ff;
          padding: 2px 6px;
          background: rgba(0, 20, 40, 0.8);
          border: 1px solid rgba(0, 240, 255, 0.4);
          border-radius: 3px;
        }

        /* Ghost cell for migration target */
        .vm-cell.ghost {
          opacity: 1;
          pointer-events: none;
        }

        .vm-cell.ghost .vm-cell-inner {
          border: 2px dashed #00ff88;
          background: rgba(0, 255, 136, 0.08);
          animation: ghostMaterialize 1.5s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.3), inset 0 0 15px rgba(0, 255, 136, 0.1);
        }

        .vm-cell.ghost .vm-name,
        .vm-cell.ghost .vm-id {
          color: #00ff88;
          opacity: 0.7;
        }

        @keyframes ghostMaterialize {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.97);
            border-color: rgba(0, 255, 136, 0.5);
          }
          50% {
            opacity: 0.9;
            transform: scale(1);
            border-color: rgba(0, 255, 136, 1);
          }
        }

        /* Incoming badge on ghost — rendered as a real DOM node so we can
           append a live progress percentage. Styling matches the MIGRATE
           source-side label so the two badges sit symmetrically across
           source and destination cells. */
        .vm-incoming-label {
          position: absolute;
          top: -8px;
          right: -4px;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          color: #00ff88;
          background: #0a1520;
          padding: 2px 5px;
          border: 1px solid #00ff88;
          border-radius: 3px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          z-index: 15;
          text-shadow: 0 0 4px #00ff88;
          animation: incomingPulse 1s ease-in-out infinite;
        }
        .vm-incoming-label .vm-task-progress {
          margin-left: 3px;
          color: #c8ffe1;
          text-shadow: 0 0 3px rgba(0, 255, 136, 0.7);
        }
        .vm-task-label .vm-task-progress {
          margin-left: 3px;
          opacity: 0.9;
        }

        @keyframes incomingPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Completing migration - source fading out */
        .vm-cell.completing {
          pointer-events: none;
          animation: completingFadeOut 1.5s ease-out forwards;
        }

        .vm-cell.completing .vm-cell-inner {
          border-color: rgba(0, 240, 255, 0.3);
          background: rgba(0, 240, 255, 0.05);
        }

        .vm-cell.completing .vm-name,
        .vm-cell.completing .vm-id {
          color: rgba(0, 240, 255, 0.4);
        }

        @keyframes completingFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          30% {
            opacity: 0.8;
            transform: scale(0.98);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        /* Completing line animation */
        .completing-line {
          stroke-linecap: round;
        }

        .vm-cell.stopped .vm-id {
          color: var(--text-muted);
        }

        /* Detail Panel */
        .vm-detail-panel {
          /* Width bumped from 320 → 360 so the larger font size doesn't
             overflow the row labels ("MEMORY", "DISKIO") into the values. */
          width: 360px;
          flex-shrink: 0;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          position: relative;
          animation: panel-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     neon-breathe 4s ease-in-out 0.4s infinite;
          transform-origin: right center;
          max-height: calc(100vh - 160px);
          display: flex;
          flex-direction: column;
        }

        .vm-detail-panel .detail-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-md);
        }

        @keyframes panel-slide-in {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        .vm-detail-panel .detail-header {
          animation: content-fade-in 0.3s ease-out 0.15s backwards;
        }

        .vm-detail-panel .detail-content {
          animation: content-fade-in 0.3s ease-out 0.25s backwards;
        }

        @keyframes content-fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Holographic scan line effect */
        .vm-detail-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scan-line 2s linear infinite;
          opacity: 0.5;
        }

        @keyframes scan-line {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(400px);
          }
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }

        .detail-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .detail-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .detail-status.success {
          background: var(--success);
          box-shadow: 0 0 8px var(--success);
        }

        .detail-status.danger {
          background: var(--danger);
        }

        .detail-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .detail-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        .detail-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .detail-close:hover {
          color: var(--text-primary);
        }

        .detail-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .detail-info {
          display: flex;
          flex-direction: column;
          /* spacing-xs was too tight for the bumped font size — rows
             collided. spacing-sm gives the larger labels breathing room. */
          gap: var(--spacing-sm);
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--spacing-sm);
          line-height: 1.5;
        }

        .info-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .info-value {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-primary);
        }

        .detail-metrics {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }

        .metric-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .metric-row-network {
          margin-top: var(--spacing-xs);
        }

        .metric-row-stacked {
          flex-direction: column;
          align-items: stretch;
          gap: 4px;
        }

        .metric-row-stacked .metric-bar {
          flex: none;
          width: 100%;
        }

        .metric-row-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-row .metric-label {
          font-size: 13px;
          color: var(--text-secondary);
          width: 50px;
          flex-shrink: 0;
        }

        .metric-row-stacked .metric-label {
          width: auto;
        }

        .metric-row .metric-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
        }

        .metric-row .metric-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
          animation: bar-fill-in 0.8s ease-out forwards;
          transform-origin: left;
        }

        @keyframes bar-fill-in {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .metric-fill.success { background: var(--success); box-shadow: 0 0 8px var(--success); }
        .metric-fill.warning { background: var(--warning); box-shadow: 0 0 8px var(--warning); }
        .metric-fill.danger { background: var(--danger); box-shadow: 0 0 8px var(--danger); }

        .metric-row .metric-value {
          font-family: var(--font-mono);
          font-size: 13px;
          min-width: 120px;
          text-align: right;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .network-stats {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
          font-family: var(--font-mono);
          font-size: 14px;
        }

        .net-rx { color: var(--success); }
        .net-tx { color: var(--warning); }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }

        .tag {
          padding: 2px 8px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Table View */
        .matrix-table-container {
          flex: 1;
          overflow: auto;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }

        .vm-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .vm-table thead {
          position: sticky;
          top: 0;
          z-index: 10;
          background: var(--bg-secondary);
        }

        .vm-table th {
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
        }

        .vm-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: color var(--transition-fast);
        }

        .vm-table th.sortable:hover {
          color: var(--primary);
        }

        .vm-table th.sorted {
          color: var(--primary);
        }

        .vm-table th span {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .sort-indicator {
          font-size: 13px;
          opacity: 0.8;
        }

        /* Sort animation */
        .vm-table tbody tr {
          transition: transform 0.3s ease-out, opacity 0.3s ease-out, background-color var(--transition-fast);
        }

        .vm-table tbody tr.sort-animating {
          animation: sort-flash 0.3s ease-out;
        }

        @keyframes sort-flash {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          30% {
            opacity: 0.5;
            transform: translateX(-5px);
          }
          60% {
            opacity: 0.8;
            transform: translateX(3px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .vm-table td {
          padding: var(--spacing-xs) var(--spacing-md);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
          vertical-align: middle;
        }

        .vm-table tbody tr {
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .vm-table tbody tr:hover {
          background: var(--bg-hover);
        }

        .vm-table tbody tr.selected {
          background: rgba(0, 240, 255, 0.1);
        }

        .vm-table tbody tr.stopped {
          opacity: 0.5;
        }

        .status-badge {
          display: inline-block;
          padding: 2px 6px;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .status-badge.success {
          background: rgba(0, 255, 136, 0.2);
          color: var(--success);
          border: 1px solid var(--success);
        }

        .status-badge.danger {
          background: rgba(255, 0, 64, 0.2);
          color: var(--danger);
          border: 1px solid var(--danger);
        }

        .vmid-cell {
          font-weight: 600;
          color: var(--primary);
        }

        .type-cell {
          text-align: center;
        }

        .type-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .type-badge.qemu {
          background: rgba(0, 180, 255, 0.15);
          border: 1px solid rgba(0, 180, 255, 0.4);
          color: #00b4ff;
        }

        .type-badge.lxc {
          background: rgba(180, 100, 255, 0.15);
          border: 1px solid rgba(180, 100, 255, 0.4);
          color: #b464ff;
        }

        .name-cell {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .node-cell {
          color: var(--text-secondary);
        }

        .cpu-cell, .mem-cell {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          min-width: 100px;
        }

        .mini-bar {
          flex: 1;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 3px;
          overflow: hidden;
          min-width: 50px;
        }

        .mini-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width var(--transition-normal);
        }

        .mini-bar-fill.success { background: var(--success); }
        .mini-bar-fill.warning { background: var(--warning); }
        .mini-bar-fill.danger { background: var(--danger); }

        .net-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 14px;
        }

        .net-cell .net-rx { color: var(--success); }
        .net-cell .net-tx { color: var(--warning); }

        .uptime-cell {
          color: var(--text-secondary);
        }

        .task-header {
          color: var(--accent);
          font-size: 13px;
        }

        .task-cell {
          min-width: 100px;
        }

        .tags-header {
          color: var(--primary);
          font-size: 13px;
        }

        .tags-cell {
          max-width: 150px;
        }

        .vm-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 2px;
        }

        .vm-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 1px 4px;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid var(--primary-dim);
          border-radius: 3px;
          color: var(--primary);
          white-space: nowrap;
        }

        .tags-row {
          flex-wrap: wrap;
        }

        .detail-tags {
          justify-content: flex-end;
        }

        /* Legend */
        .matrix-legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          margin: var(--spacing-sm) 0 0 0;
          padding: var(--spacing-xs) 0 0 0;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .legend-title {
          font-family: var(--font-display);
          font-size: 13px;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .legend-color {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          border: 1px solid var(--border);
        }

        .legend-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .legend-note {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .legend-color.success {
          background: rgba(0, 255, 136, 0.3);
          border-color: var(--success);
        }

        .legend-color.warning {
          background: rgba(255, 107, 0, 0.3);
          border-color: var(--warning);
        }

        .legend-color.danger {
          background: rgba(255, 0, 64, 0.3);
          border-color: var(--danger);
        }

        .legend-color.muted {
          background: var(--bg-card);
          opacity: 0.4;
        }

        .no-vms {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xl);
          color: var(--text-secondary);
          font-family: var(--font-display);
        }

        @media (max-width: 1024px) {
          .matrix-content {
            flex-direction: column;
          }

          .vm-detail-panel {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .holo-matrix {
            padding: var(--spacing-md);
          }

          .matrix-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .matrix-controls {
            width: 100%;
            flex-wrap: wrap;
          }

          .search-box {
            flex: 1;
          }

          .search-box input {
            width: 100%;
          }
        }

        /* Context Menu */
        .vm-context-menu {
          position: fixed;
          z-index: 1000;
          min-width: 220px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: var(--radius-md);
          /* Layered glow so the cyan rim reads as luminous, not flat:
             - inner highlight ring at 0 1px
             - mid-distance soft cyan halo
             - far drop shadow for depth */
          box-shadow:
            0 0 0 1px rgba(0, 240, 255, .12),
            0 16px 60px rgba(0, 0, 0, .65),
            0 0 80px -20px rgba(0, 240, 255, .55),
            0 0 24px -6px rgba(0, 240, 255, .35);
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
            transform: scale(1) translateY(0);
          }
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

        /* Full-row light bar on hover — matches CyberSelect: left vertical
           cyan rail + cyan band gradient across the row + soft outer glow.
           The 2px padding-left bump gives a "snap to" tactility. */
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

        /* Destructive row variant — red rail + red glow instead of cyan,
           so "Stop (hard)" reads as dangerous on hover. */
        .context-menu-item.danger:hover {
          background: linear-gradient(90deg,
            rgba(255, 56, 96, .22) 0%,
            rgba(255, 56, 96, .08) 60%,
            transparent 100%);
          color: var(--danger);
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
          color: var(--danger);
          filter: drop-shadow(0 0 4px rgba(255, 56, 96, .6));
        }

        /* Visible-but-disabled — operator can see the feature exists but
           clicking surfaces an explanation toast. No light bar on hover, no
           glow; just a muted tint and a not-allowed cursor. */
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

        .context-menu-info {
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          margin-top: var(--spacing-xs);
        }

        .context-menu-info .info-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 2px 0;
        }

        .context-menu-info .info-row span:first-child {
          color: var(--text-muted);
        }

        .context-menu-info .info-row span:last-child {
          color: var(--text-secondary);
        }

        /* Migration-failure toast stack — bottom-right of viewport */
        .mig-fail-stack {
          position: fixed;
          right: 16px; bottom: 16px;
          display: flex; flex-direction: column-reverse; gap: 10px;
          z-index: 500;
          max-width: 420px;
        }
        .mig-fail-toast {
          position: relative;
          padding: 14px 16px 14px 16px;
          background: linear-gradient(180deg, #1a0610, #0d0408);
          border: 1px solid #ff3860;
          border-left-width: 4px;
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .55), 0 0 32px -10px rgba(255, 56, 96, .6);
          color: #ffd0d8;
          font-family: 'Rajdhani', sans-serif;
          animation: migFailIn .25s ease;
        }
        @keyframes migFailIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: none; }
        }
        .mig-fail-head {
          font-family: 'Orbitron', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
          color: #ff3860; margin-bottom: 6px;
        }
        .mig-fail-body { font-size: 14px; line-height: 1.5; margin-bottom: 8px; }
        .mig-fail-cmd-line { font-size: 12px; color: #95a8c4; margin-bottom: 4px; }
        .mig-fail-cmd-hint code {
          font-family: 'Share Tech Mono', monospace; font-size: 12px;
          background: rgba(0, 240, 255, .06); color: #00f0ff;
          padding: 1px 6px; border-radius: 3px;
        }
        .mig-fail-cmd-row { display: flex; gap: 8px; align-items: center; }
        .mig-fail-cmd {
          flex: 1; font-family: 'Share Tech Mono', monospace; font-size: 13px;
          background: #02050b; color: #00f0ff;
          padding: 6px 10px; border-radius: 4px;
          border: 1px solid rgba(0, 240, 255, .16);
          user-select: all;
        }
        .mig-fail-btn {
          padding: 6px 12px;
          font-family: 'Share Tech Mono', monospace; font-size: 10px;
          letter-spacing: .06em; text-transform: uppercase;
          color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4);
          border: none; border-radius: 4px; cursor: pointer;
          white-space: nowrap;
        }
        .mig-fail-btn:hover { box-shadow: 0 0 12px rgba(0, 240, 255, .5); }
        .mig-fail-dismiss {
          position: absolute; top: 6px; right: 8px;
          width: 22px; height: 22px;
          background: transparent; border: none;
          color: #95a8c4; font-size: 18px; line-height: 1; cursor: pointer;
          padding: 0;
        }
        .mig-fail-dismiss:hover { color: #ffd0d8; }
      `})]})}function ys(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function Im(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function kh({vm:e,index:t,previousIndex:n,onClick:a,isSelected:s,task:o}){var h;const i=e.memory.used_bytes/e.memory.total_bytes*100,c=((h=e.disk)==null?void 0:h.usage_percent)||0,l=he(e.cpu.usage_percent),d=he(i),p=he(c),f=m.useRef(null),[u,x]=m.useState(n===void 0),y=Im(o||null);m.useEffect(()=>{if(u){const g=setTimeout(()=>x(!1),50);return()=>clearTimeout(g)}},[u]);const j=e.name.length>10?e.name.substring(0,9)+"…":e.name,v=Math.max(e.cpu.usage_percent,i,c)>95?"critical":"warning";return r.jsxs("div",{ref:f,className:`anomaly-item ${v} ${u?"entering":""} ${s?"selected":""} ${o?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:a?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${Xe(e.cpu.usage_percent,1)}
MEM: ${Xe(i,1)}
DISK: ${Xe(c,1)}${o?`
Task: ${o.task_type}`:""}`,onClick:a,children:[r.jsx("div",{className:"corner-bracket tl"}),r.jsx("div",{className:"corner-bracket tr"}),r.jsx("div",{className:"corner-bracket bl"}),r.jsx("div",{className:"corner-bracket br"}),r.jsxs("div",{className:"anomaly-header",children:[r.jsx("span",{className:`anomaly-indicator ${l}`}),r.jsx("span",{className:"anomaly-name",children:j}),r.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),y&&r.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${y.color}30`,borderColor:y.color,color:y.color},children:y.label})]}),r.jsxs("div",{className:"anomaly-bars-row",children:[r.jsxs("div",{className:`metric-gauge ${l}`,children:[r.jsx("span",{className:"gauge-label",children:"C"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),r.jsxs("div",{className:`metric-gauge ${d}`,children:[r.jsx("span",{className:"gauge-label",children:"M"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(i,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(i,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(i)})]}),r.jsxs("div",{className:`metric-gauge ${p}`,children:[r.jsx("span",{className:"gauge-label",children:"D"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(c,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(c,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(c)})]})]})]})}function jh({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=Te(),s=m.useRef(null),o=m.useRef(null),[i,c]=m.useState(0),[l,d]=m.useState(null),[p,f]=m.useState(new Map),[u,x]=m.useState(new Map),[y,j]=m.useState("grid"),[N,v]=m.useState(0);m.useEffect(()=>{const M=setTimeout(()=>j("line"),600),w=setTimeout(()=>j("flip"),1100),$=setTimeout(()=>j("done"),3300);return()=>{clearTimeout(M),clearTimeout(w),clearTimeout($)}},[]),m.useEffect(()=>{if(y!=="flip"&&y!=="done"){v(0);return}const M=y==="flip"?300:0,w=1800;let $,I=null;const W=C=>{I===null&&(I=C);const F=C-I-M;if(F<0){$=requestAnimationFrame(W);return}const X=Math.min(F/w,1),T=1-Math.pow(1-X,3);v(T),X<1&&($=requestAnimationFrame(W))};return $=requestAnimationFrame(W),()=>cancelAnimationFrame($)},[y]);const h=!e&&t&&Object.keys(t).length>0,g=m.useMemo(()=>{if(!e&&!h)return[];const M=[];return h?Object.values(t).forEach(w=>{Object.values(w.vms).forEach($=>{$.status==="running"&&!$.template&&M.push($)})}):e&&Object.values(e.vms).forEach(w=>{w.status==="running"&&!w.template&&M.push(w)}),M},[e,t,h]),_=m.useMemo(()=>g.map((M,w)=>{var D;const $=w/g.length*Math.PI*2,I=M.cpu.usage_percent,W=M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,C=((D=M.disk)==null?void 0:D.usage_percent)||0,F=Math.max(I,W,C),X=.2+F/100*.6,T=he(F),L=ys(M.vmid,M.node,M.cluster_id,e,t);return{vm:M,angle:$,distance:X,color:T,task:L}}),[g,e,t]),S=m.useMemo(()=>{if(!e&&!h)return[];const M=[];return h?Object.values(t).forEach($=>{Object.values($.vms).forEach(I=>M.push(I))}):e&&Object.values(e.vms).forEach($=>M.push($)),M.filter($=>{if($.status!=="running"||$.template)return!1;const I=$.memory.used_bytes/$.memory.total_bytes*100,W=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0;return $.cpu.usage_percent>80||I>85||W>85}).sort(($,I)=>{const W=$.memory.used_bytes/$.memory.total_bytes*100,C=I.memory.used_bytes/I.memory.total_bytes*100,F=$.disk.total_bytes>0?$.disk.used_bytes/$.disk.total_bytes*100:0,X=I.disk.total_bytes>0?I.disk.used_bytes/I.disk.total_bytes*100:0,T=Math.max($.cpu.usage_percent,W,F);return Math.max(I.cpu.usage_percent,C,X)-T})},[e,t,h]);m.useEffect(()=>{const M=new Map;S.forEach((w,$)=>{M.set(`${w.cluster_id}/${w.node}/${w.vmid}`,$)}),f(M)},[S]);const P=m.useCallback(M=>{const w=s.current;if(!w)return;const $=w.getBoundingClientRect(),I=w.width/$.width,W=w.height/$.height,C=(M.clientX-$.left)*I,F=(M.clientY-$.top)*W,X=Math.min(w.width,w.height),T=w.width/2,L=w.height/2,D=X*.4;let Y=null;for(const K of _){const b=T+Math.cos(K.angle)*D*K.distance,V=L+Math.sin(K.angle)*D*K.distance,J=Math.sqrt((C-b)**2+(F-V)**2),ae=15*Math.max(I,W);if(J<ae){Y={vm:K.vm,x:M.clientX,y:M.clientY,pointX:b,pointY:V};break}}d(Y)},[_]),E=m.useCallback(()=>{d(null)},[]),R=m.useCallback(M=>{const w=s.current;if(!w)return;const $=_.find(L=>L.vm.node===M.node&&L.vm.vmid===M.vmid);if(!$)return;const I=Math.min(w.width,w.height),W=w.width/2,C=w.height/2,F=I*.4,X=W+Math.cos($.angle)*F*$.distance,T=C+Math.sin($.angle)*F*$.distance;d({vm:$.vm,x:X,y:T,pointX:X,pointY:T})},[_]);return m.useEffect(()=>{if(n||y!=="done")return;const M=setInterval(()=>{c(w=>(w+2)%360)},50);return()=>clearInterval(M)},[n,y]),m.useEffect(()=>{const M=s.current;if(!M)return;const w=M.getContext("2d");if(!w)return;const $=Math.min(M.width,M.height),I=M.width/2,W=M.height/2,C=$*.4;w.clearRect(0,0,M.width,M.height),w.strokeStyle="rgba(0, 240, 255, 0.12)",w.lineWidth=.8;const F=20;for(let V=I%F;V<M.width;V+=F)w.beginPath(),w.moveTo(V,0),w.lineTo(V,M.height),w.stroke();for(let V=W%F;V<M.height;V+=F)w.beginPath(),w.moveTo(0,V),w.lineTo(M.width,V),w.stroke();if(y!=="flip"&&y!=="done")return;w.globalAlpha=N,w.strokeStyle="rgba(0, 240, 255, 0.25)",w.lineWidth=1.5,w.font='13px "Share Tech Mono", monospace',w.fillStyle="rgba(0, 240, 255, 0.6)",w.textAlign="left";const X=["25%","50%","75%","100%"];for(let V=1;V<=4;V++){const J=C*(V/4);w.beginPath(),w.arc(I,W,J,0,Math.PI*2),w.stroke();const ae=I+J+4,le=W+4;w.fillText(X[V-1],ae,le)}w.fillStyle="rgba(0, 255, 136, 0.8)",w.textAlign="center",w.font='14px "Share Tech Mono", monospace',w.fillText("0%",I,W-8),w.font='11px "Share Tech Mono", monospace',w.fillText("LOW",I,W+8),w.fillStyle="rgba(0, 240, 255, 0.5)",w.textAlign="left",w.font='10px "Share Tech Mono", monospace',w.beginPath(),w.moveTo(I-C,W),w.lineTo(I+C,W),w.moveTo(I,W-C),w.lineTo(I,W+C),w.stroke();const T=i*Math.PI/180;for(let V=0;V<8;V++){const J=.12*(V+1),ae=.15-V*.015;w.fillStyle=`rgba(0, 240, 255, ${ae})`,w.beginPath(),w.moveTo(I,W),w.arc(I,W,C,T-J,T-J+.12),w.closePath(),w.fill()}w.save(),w.shadowBlur=20,w.shadowColor="#00f0ff";const L=w.createLinearGradient(I,W,I+Math.cos(T)*C,W+Math.sin(T)*C);L.addColorStop(0,"rgba(0, 255, 200, 1)"),L.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),L.addColorStop(1,"rgba(0, 240, 255, 0)"),w.strokeStyle=L,w.lineWidth=3,w.beginPath(),w.moveTo(I,W),w.lineTo(I+Math.cos(T)*C,W+Math.sin(T)*C),w.stroke(),w.lineWidth=1.5,L.addColorStop(0,"rgba(255, 255, 255, 1)"),w.stroke(),w.restore();const D=I+Math.cos(T)*C*.95,Y=W+Math.sin(T)*C*.95,K=w.createRadialGradient(D,Y,0,D,Y,15);K.addColorStop(0,"rgba(0, 255, 200, 0.8)"),K.addColorStop(1,"rgba(0, 240, 255, 0)"),w.fillStyle=K,w.beginPath(),w.arc(D,Y,15,0,Math.PI*2),w.fill();const b=[];_.forEach(V=>{const J=`${V.vm.cluster_id}/${V.vm.node}/${V.vm.vmid}`,ae=(V.angle*180/Math.PI+360)%360;(i-ae+360)%360<=5&&b.push({key:J,point:{vm:V.vm,angle:V.angle,distance:V.distance,color:V.color,lastScanAngle:i}})}),b.length>0&&x(V=>{const J=new Map(V);b.forEach(({key:le,point:ue})=>{J.set(le,ue)});const ae=new Set(_.map(le=>`${le.vm.cluster_id}/${le.vm.node}/${le.vm.vmid}`));for(const le of J.keys())ae.has(le)||J.delete(le);return J}),_.forEach(V=>{var de,Ae;const J=I+Math.cos(V.angle)*C*V.distance,ae=W+Math.sin(V.angle)*C*V.distance,le=(V.angle*180/Math.PI+360)%360,ue=(i-le+360)%360;let Qe;ue<20?Qe=1:ue<60?Qe=1-(ue-20)/40*.4:Qe=.6-(ue-60)/300*.45;let ee="#00ff88";V.color==="warning"&&(ee="#ff6b00"),V.color==="danger"&&(ee="#ff0040");const q=!!V.task,ne=(Ae=(de=V.task)==null?void 0:de.task_type)==null?void 0:Ae.includes("migrate");if(q){const Ze=ne?"#00f0ff":"#a855f7",ot=Date.now()/500%1;if(w.beginPath(),w.arc(J,ae,12+ot*8,0,Math.PI*2),w.strokeStyle=Ze,w.lineWidth=1.5,w.globalAlpha=(1-ot)*.6*N,w.stroke(),w.beginPath(),w.arc(J,ae,10,0,Math.PI*2),w.strokeStyle=Ze,w.lineWidth=1,w.globalAlpha=.8*N,w.stroke(),ne){const Le=Date.now()/200%(Math.PI*2);w.beginPath(),w.arc(J,ae,15,Le,Le+Math.PI/2),w.strokeStyle=Ze,w.lineWidth=2,w.globalAlpha=.9*N,w.stroke();for(let H=0;H<3;H++){const se=Le+H*Math.PI*2/3,ce=8+(Date.now()/100+H*50)%100/100*10,pe=J+Math.cos(se)*ce,Ee=ae+Math.sin(se)*ce;w.beginPath(),w.arc(pe,Ee,1.5,0,Math.PI*2),w.fillStyle=Ze,w.globalAlpha=(.8-(Date.now()/100+H*50)%100/100*.6)*N,w.fill()}}w.globalAlpha=N}w.beginPath(),w.arc(J,ae,4+V.vm.cpu.usage_percent/100*4,0,Math.PI*2),w.fillStyle=ee,w.globalAlpha=Qe*N,w.fill(),w.shadowBlur=10,w.shadowColor=ee,w.fill(),w.shadowBlur=0,w.globalAlpha=N}),w.beginPath(),w.arc(I,W,6,0,Math.PI*2),w.fillStyle="#00f0ff",w.fill()},[i,_,y,N]),m.useEffect(()=>{const M=s.current;if(!M)return;const w=()=>{const $=M.parentElement;$&&(M.width=$.clientWidth,M.height=$.clientHeight)};return w(),window.addEventListener("resize",w),()=>window.removeEventListener("resize",w)},[]),!e&&!h?r.jsx("div",{className:"radar-scan empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]})}):r.jsxs("div",{className:"radar-scan",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"radar-header",children:r.jsxs("h1",{className:"radar-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),a("nav.radar_scan").toUpperCase()]})}),r.jsxs("div",{className:"radar-layout",children:[r.jsxs("div",{className:`radar-container ${y!=="done"?"entering":""} ${y==="grid"?"grid-phase":""}`,ref:o,style:{position:"relative"},children:[(y==="line"||y==="flip")&&r.jsxs("div",{className:`radar-entry-overlay ${y}`,children:[r.jsx("div",{className:"entry-line"}),r.jsx("div",{className:"entry-circle"}),r.jsx("div",{className:"entry-glow"})]}),r.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:P,onMouseLeave:E,style:{position:"absolute",top:0,left:0,cursor:l?"pointer":"default"}}),r.jsx("div",{className:"radar-overlay",style:{opacity:N},children:r.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",i.toFixed(0),"°"]})}),l&&(()=>{var Tn,Wt,vn;const M=s.current;if(!M)return null;const w=M.width,$=M.height,I=M.getBoundingClientRect(),W=I.width,C=I.height,F=W/w,X=C/$,T=l.pointX*F,L=l.pointY*X,D=W,Y=C,K=180,V=ys(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t)?175:145,J=K/2,ae=V/2,le=50,ue=120,Qe=D/2,ee=Y/2,q=T-Qe,ne=L-ee,de=Math.sqrt(q*q+ne*ne)||1,Ae=q/de,Ze=ne/de,ot=(oe,me)=>{const O=oe-J,be=oe+J,_e=me-ae,He=me+ae;if(T>=O&&T<=be&&L>=_e&&L<=He)return-1;const Se=Math.max(O,Math.min(be,T)),Re=Math.max(_e,Math.min(He,L));return Math.sqrt((T-Se)**2+(L-Re)**2)},Le=20,H=(oe,me)=>({x:Math.max(J+Le,Math.min(D-J-Le,oe)),y:Math.max(ae+Le,Math.min(Y-ae-Le,me))}),ce=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((oe,me)=>{const O=oe.dx*Ae+oe.dy*Ze;return me.dx*Ae+me.dy*Ze-O});let pe={x:T+Ae*ue,y:L+Ze*ue},Ee=!1;for(const oe of ce){const me={x:T+oe.dx*ue,y:L+oe.dy*ue},O=H(me.x,me.y),be=O.x-T,_e=O.y-L,Se=Math.sqrt(be*be+_e*_e)>30&&Math.abs(Math.abs(be)-Math.abs(_e))<20,Re=ot(O.x,O.y);if(Se&&Re>=le){pe=O,Ee=!0;break}}if(!Ee)for(const oe of ce){const me={x:T+oe.dx*(ue+60),y:L+oe.dy*(ue+60)},O=H(me.x,me.y),be=O.x-T,_e=O.y-L,Se=Math.sqrt(be*be+_e*_e)>30&&Math.abs(Math.abs(be)-Math.abs(_e))<20,Re=ot(O.x,O.y);if(Se&&Re>=le){pe=O,Ee=!0;break}}if(!Ee){const oe=ce[0],me=oe.dx>0?(D-J-10-T)/oe.dx:(J+10-T)/oe.dx,O=oe.dy>0?(Y-ae-10-L)/oe.dy:(ae+10-L)/oe.dy,be=Math.min(Math.abs(me),Math.abs(O),ue),_e=Math.max(le+20,be);pe={x:T+oe.dx*_e,y:L+oe.dy*_e}}const rt=20,it=Math.max(J+rt,Math.min(D-J-rt,pe.x)),qt=Math.max(ae+rt,Math.min(Y-ae-rt,pe.y)),Fe=T,Rt=L,Qt=20,vt=28,fe=5,ge=-Math.PI/2,De=it-J,tt=qt-ae,pt=it,Je=qt,It=l.vm.memory.total_bytes>0?l.vm.memory.used_bytes/l.vm.memory.total_bytes*100:0,re=((Tn=l.vm.disk)==null?void 0:Tn.usage_percent)||0,ze=Math.max(l.vm.cpu.usage_percent,It,re),Be=he(ze),Ne={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[Be]||"#00f0ff";return D<=0||Y<=0?null:r.jsxs(r.Fragment,{children:[(()=>{const oe=Math.sqrt((pt-Fe)**2+(Je-Rt)**2),me=Math.atan2(Je-Rt,pt-Fe)*180/Math.PI;return r.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:Fe,top:Rt,width:oe,height:2,background:`linear-gradient(90deg, ${Ne}, ${Ne}80)`,transformOrigin:"0 50%",transform:`rotate(${me}deg)`,boxShadow:`0 0 8px ${Ne}, 0 0 16px ${Ne}60`,pointerEvents:"none",zIndex:99}})})(),r.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:Fe-vt-5,top:Rt-vt-5,width:(vt+5)*2,height:(vt+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[r.jsx("defs",{children:r.jsxs("filter",{id:"frameGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const oe=vt+5,me=vt+5,O=[];for(let Se=0;Se<fe;Se++){const Re=ge+Se*2*Math.PI/fe;O.push(`${oe+Qt*Math.cos(Re)},${me+Qt*Math.sin(Re)}`)}const be=O.join(" "),_e=[];for(let Se=0;Se<fe;Se++){const Re=ge+Se*2*Math.PI/fe;_e.push(`${oe+vt*Math.cos(Re)},${me+vt*Math.sin(Re)}`)}const He=_e.join(" ");return r.jsxs(r.Fragment,{children:[r.jsx("polygon",{points:He,fill:"none",stroke:Ne,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${oe}px ${me}px`}}),r.jsx("polygon",{points:be,fill:"none",stroke:Ne,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(Se=>{const Re=ge+Se*2*Math.PI/fe,$e=oe+Qt*Math.cos(Re),Vt=me+Qt*Math.sin(Re),yn=6,nr=ge+(Se-1+fe)%fe*2*Math.PI/fe,Rn=ge+(Se+1)%fe*2*Math.PI/fe,k=$e+yn*Math.cos(nr+Math.PI),U=Vt+yn*Math.sin(nr+Math.PI),A=$e+yn*Math.cos(Rn+Math.PI),z=Vt+yn*Math.sin(Rn+Math.PI);return r.jsxs("g",{children:[r.jsx("line",{x1:$e,y1:Vt,x2:k,y2:U,stroke:Ne,strokeWidth:"2"}),r.jsx("line",{x1:$e,y1:Vt,x2:A,y2:z,stroke:Ne,strokeWidth:"2"})]},Se)}),r.jsx("line",{x1:oe-5,y1:me,x2:oe+5,y2:me,stroke:Ne,strokeWidth:"1"}),r.jsx("line",{x1:oe,y1:me-5,x2:oe,y2:me+5,stroke:Ne,strokeWidth:"1"})]})})()]}),r.jsxs("div",{className:`radar-tooltip tooltip-${Be}`,style:{position:"absolute",left:De,top:tt,width:K,height:V,borderColor:Ne,boxShadow:`0 0 15px ${Ne}40, 0 0 30px ${Ne}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[r.jsx("div",{className:"tooltip-corner tl",style:{borderColor:Ne}}),r.jsx("div",{className:"tooltip-corner tr",style:{borderColor:Ne}}),r.jsx("div",{className:"tooltip-corner bl",style:{borderColor:Ne}}),r.jsx("div",{className:"tooltip-corner br",style:{borderColor:Ne}}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:l.vm.name}),r.jsxs("span",{className:"tooltip-id",children:["#",l.vm.vmid]})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"NODE"}),r.jsx("span",{className:"tooltip-value",children:l.vm.node})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"CPU"}),r.jsx("span",{className:`tooltip-value text-${he(l.vm.cpu.usage_percent)}`,children:Xe(l.vm.cpu.usage_percent,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"MEMORY"}),r.jsx("span",{className:`tooltip-value text-${he(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100)}`,children:Xe(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"DISKIO"}),r.jsx("span",{className:`tooltip-value text-${he(((Wt=l.vm.disk)==null?void 0:Wt.usage_percent)||0)}`,children:Xe(((vn=l.vm.disk)==null?void 0:vn.usage_percent)||0,1)})]}),(()=>{const oe=ys(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t),me=Im(oe);return me?r.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${me.color}40`,marginTop:4,paddingTop:4},children:[r.jsx("span",{className:"tooltip-label",children:"TASK"}),r.jsx("span",{className:"tooltip-value",style:{color:me.color},children:me.label})]}):null})(),r.jsx("div",{className:"tooltip-scanline"})]})]})})(),r.jsxs("div",{className:"radar-legend",style:{opacity:N},children:[r.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),r.jsx("span",{children:"<80%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),r.jsx("span",{children:"80-95%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),r.jsx("span",{children:">95%"}),r.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),r.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("h2",{className:"panel-title font-display",children:a("radar.anomalies")}),r.jsx("span",{className:"anomaly-count",children:S.length})]}),r.jsx("div",{className:"anomaly-list",children:S.length===0?r.jsxs("div",{className:"no-anomalies",children:[r.jsx("span",{className:"status-indicator"}),r.jsx("span",{children:a("radar.all_normal")})]}):S.map((M,w)=>{const $=`${M.cluster_id}/${M.node}/${M.vmid}`,I=p.get($),W=(l==null?void 0:l.vm.node)===M.node&&(l==null?void 0:l.vm.vmid)===M.vmid&&(l==null?void 0:l.vm.cluster_id)===M.cluster_id,C=ys(M.vmid,M.node,M.cluster_id,e,t);return r.jsx(kh,{vm:M,index:w,previousIndex:I,onClick:()=>R(M),isSelected:W,task:C},$)})})]})]}),r.jsx("style",{children:`
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
            transform: scale(1);
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
          transform: translate(-50%, 0);
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
            transform: translate(-50%, 0) scale(0.5) rotateX(20deg);
            filter: blur(8px) brightness(3);
            clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
          }
          30% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: blur(4px) brightness(2);
          }
          60% {
            transform: translate(-50%, 0) scale(1.02);
            filter: blur(1px) brightness(1.3);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1) rotateX(0deg);
            filter: blur(0) brightness(1);
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
            transform: scale(1);
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
            transform: translateX(0) scale(1);
            filter: blur(0) brightness(1);
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
          color: var(--danger);
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
            transform: scaleX(1);
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
          0%, 100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
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
          border-color: var(--danger);
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

      `})]})}function _h({value:e,duration:t=800,suffix:n=""}){const[a,s]=m.useState(0),o=m.useRef(0),i=m.useRef(0);return m.useEffect(()=>{o.current=a;const c=performance.now(),l=d=>{const p=d-c,f=Math.min(p/t,1),u=1-Math.pow(1-f,3);s(o.current+(e-o.current)*u),f<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),r.jsxs(r.Fragment,{children:[a.toFixed(0),n]})}function lo({value:e,duration:t=800}){const[n,a]=m.useState(0),s=m.useRef(0),o=m.useRef(0);return m.useEffect(()=>{s.current=n;const i=performance.now(),c=l=>{const d=l-i,p=Math.min(d/t,1),f=1-Math.pow(1-p,3);a(s.current+(e-s.current)*f),p<1&&(o.current=requestAnimationFrame(c))};return o.current=requestAnimationFrame(c),()=>cancelAnimationFrame(o.current)},[e,t]),r.jsx(r.Fragment,{children:Ce(n)})}function Nh({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"ceph-core visible",children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),r.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),r.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),r.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:a,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${a})`}}),r.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),r.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),r.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:r.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),r.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:r.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),r.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:r.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),r.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:r.jsx(_h,{value:n,duration:1500,suffix:"%"})})]}),r.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function Sh({mons:e,mgrs:t,mds:n}){const{t:a}=Te();return r.jsxs("div",{className:"daemon-orbital",children:[r.jsx("div",{className:"orbital-title",children:a("ceph.cluster_daemons")}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mon",children:"MON"}),r.jsx("span",{className:"daemon-count",children:e.length})]}),r.jsx("div",{className:"daemon-nodes",children:e.map(s=>r.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&r.jsx("div",{className:"leader-glow"})]},s.name))})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mgr",children:"MGR"}),r.jsx("span",{className:"daemon-count",children:t.length})]}),r.jsx("div",{className:"daemon-nodes",children:t.map(s=>r.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&r.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mds",children:"MDS"}),r.jsx("span",{className:"daemon-count",children:n.length})]}),r.jsx("div",{className:"daemon-nodes",children:n.map(s=>r.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&r.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function Ch({osds:e,onSelect:t}){const{t:n}=Te(),a=m.useMemo(()=>{const o={};return e.forEach(i=>{const c=i.host||"unknown";o[c]||(o[c]=[]),o[c].push(i)}),Object.entries(o).sort(([i],[c])=>i.localeCompare(c,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(o=>o.status==="up").length;return r.jsxs("div",{className:"osd-grid-panel",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),r.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),r.jsx("div",{className:"osd-hosts",children:(()=>{let o=0;return a.map(([i,c])=>r.jsxs("div",{className:"osd-host-group",children:[r.jsx("div",{className:"host-label",children:i}),r.jsx("div",{className:"osd-hexgrid",children:c.sort((l,d)=>l.id-d.id).map(l=>{const d=l.total_bytes>0?l.used_bytes/l.total_bytes*100:0,p=l.status!=="up"||he(d)==="danger"?"#ff0040":he(d)==="warning"?"#ff6b00":"#00ff88",f=o*30;return o++,r.jsx("div",{className:`osd-hex ${l.status==="up"?"up":"down"}`,style:{"--osd-color":p,animationDelay:`${f}ms`},onClick:()=>t(l),title:`OSD.${l.id} - ${Xe(d,0)}`,children:r.jsx("span",{className:"osd-id",children:l.id})},l.id)})})]},i))})()})]})}function Mh({readBps:e,writeBps:t,readOps:n,writeOps:a,isPaused:s=!1}){const o=m.useRef(null),i=m.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),c=m.useRef(0),l=m.useRef(0),d=100,p=f=>f===0?"0":f>=1073741824?`${(f/1073741824).toFixed(1)}G`:f>=1048576?`${(f/1048576).toFixed(1)}M`:f>=1024?`${(f/1024).toFixed(0)}K`:`${f.toFixed(0)}`;return m.useEffect(()=>{i.current.targetRead=e,i.current.targetWrite=t},[e,t]),m.useEffect(()=>{const f=o.current;if(!f)return;const u=f.getContext("2d");if(!u)return;const x=window.devicePixelRatio||1,y=()=>{const E=f.getBoundingClientRect();return f.width=E.width*x,f.height=E.height*x,u.setTransform(x,0,0,x,0,0),{width:E.width,height:E.height}};let{width:j,height:N}=y();const v=42,h=j-v;let g=0;const _=50;let S=0;const P=E=>{const R=E-g;g=E,S+=R;const M=.1;i.current.currentRead+=(i.current.targetRead-i.current.currentRead)*M,i.current.currentWrite+=(i.current.targetWrite-i.current.currentWrite)*M,S>=_&&(S=0,i.current.read.push(i.current.currentRead),i.current.write.push(i.current.currentWrite),i.current.read.length>d&&i.current.read.shift(),i.current.write.length>d&&i.current.write.shift()),l.current=(l.current+.5)%20,u.clearRect(0,0,j,N);const w=Math.max(...i.current.read,...i.current.write,1),$=8,I=4;u.font="9px monospace",u.fillStyle="rgba(0, 240, 255, 0.6)",u.textAlign="right",u.textBaseline="middle";for(let C=0;C<=I;C++){const F=$+C/I*(N-$*2),X=w*(1-C/I);u.fillText(p(X),v-4,F)}u.strokeStyle="rgba(0, 240, 255, 0.06)",u.lineWidth=1;for(let C=0;C<=I;C++){const F=$+C/I*(N-$*2);u.beginPath(),u.setLineDash([4,4]),u.lineDashOffset=-l.current,u.moveTo(v,F),u.lineTo(j,F),u.stroke()}u.setLineDash([]);const W=(C,F,X)=>{if(C.length<2)return;const T=C.map((D,Y)=>({x:v+Y/(d-1)*h,y:N-$-D/w*(N-$*2)}));u.strokeStyle=X,u.lineWidth=6,u.lineCap="round",u.lineJoin="round",u.globalAlpha=.3,u.beginPath(),u.moveTo(T[0].x,T[0].y);for(let D=1;D<T.length-1;D++){const Y=(T[D].x+T[D+1].x)/2,K=(T[D].y+T[D+1].y)/2;u.quadraticCurveTo(T[D].x,T[D].y,Y,K)}u.lineTo(T[T.length-1].x,T[T.length-1].y),u.stroke(),u.globalAlpha=1,u.strokeStyle=F,u.lineWidth=2,u.shadowColor=F,u.shadowBlur=8,u.beginPath(),u.moveTo(T[0].x,T[0].y);for(let D=1;D<T.length-1;D++){const Y=(T[D].x+T[D+1].x)/2,K=(T[D].y+T[D+1].y)/2;u.quadraticCurveTo(T[D].x,T[D].y,Y,K)}u.lineTo(T[T.length-1].x,T[T.length-1].y),u.stroke(),u.shadowBlur=0;const L=3;for(let D=0;D<L;D++){const Y=(l.current/20+D/L)%1,K=Math.floor(Y*(T.length-1));K<T.length&&(u.fillStyle=F,u.globalAlpha=.8,u.beginPath(),u.arc(T[K].x,T[K].y,3,0,Math.PI*2),u.fill())}u.globalAlpha=1};W(i.current.write,"#ff6b00","#ff6b00"),W(i.current.read,"#00ff88","#00ff88"),s||(c.current=requestAnimationFrame(P))};return c.current=requestAnimationFrame(P),()=>cancelAnimationFrame(c.current)},[s]),r.jsxs("div",{className:"io-wave-panel",children:[r.jsx("div",{className:"panel-header",children:r.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),r.jsx("canvas",{ref:o,className:"io-canvas",style:{width:"100%",height:"100px"}}),r.jsxs("div",{className:"io-stats",children:[r.jsxs("div",{className:"io-stat read",children:[r.jsx("span",{className:"io-icon",children:"▼"}),r.jsx("span",{className:"io-label",children:"READ"}),r.jsxs("span",{className:"io-value",children:[Ce(e),"/s"]}),r.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),r.jsxs("div",{className:"io-stat write",children:[r.jsx("span",{className:"io-icon",children:"▲"}),r.jsx("span",{className:"io-label",children:"WRITE"}),r.jsxs("span",{className:"io-value",children:[Ce(t),"/s"]}),r.jsxs("span",{className:"io-ops",children:[a.toFixed(0)," IOPS"]})]})]})]})}function Gd({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"pool-energy-bar visible",children:[r.jsxs("div",{className:"pool-info",children:[r.jsx("span",{className:"pool-name",children:e.name}),r.jsx("span",{className:"pool-size",children:Ce(e.used_bytes)})]}),r.jsxs("div",{className:"energy-track",children:[r.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${a}88, ${a})`,boxShadow:`0 0 10px ${a}`}}),r.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:a}})]}),r.jsxs("span",{className:"pool-percent",style:{color:a},children:[n.toFixed(1),"%"]})]})}function Eh({osd:e,onClose:t}){const{t:n}=Te(),a=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=he(a);return r.jsx("div",{className:"osd-popup-overlay",onClick:t,children:r.jsxs("div",{className:"osd-popup",onClick:o=>o.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),r.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),r.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"popup-content",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:"Host"}),r.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),r.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),r.jsxs("div",{className:"storage-section",children:[r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${s}`,style:{width:`${a}%`}})}),r.jsxs("div",{className:"storage-stats",children:[r.jsxs("span",{children:[Ce(e.used_bytes)," / ",Ce(e.total_bytes)]}),r.jsx("span",{className:`text-${s}`,children:Xe(a,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&r.jsxs("div",{className:"latency-section",children:[r.jsx("div",{className:"latency-title",children:n("ceph.latency")}),r.jsxs("div",{className:"latency-grid",children:[r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.apply")}),r.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.commit")}),r.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function zh({ceph:e}){const{t}=Te(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=100-n;return r.jsxs("div",{className:"storage-summary",children:[r.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),r.jsxs("div",{className:"summary-stats",children:[r.jsxs("div",{className:"stat-block used",children:[r.jsx("span",{className:"stat-value",children:Ce(e.used_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),r.jsx("div",{className:"stat-divider",children:"/"}),r.jsxs("div",{className:"stat-block total",children:[r.jsx("span",{className:"stat-value",children:Ce(e.total_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),r.jsxs("div",{className:"summary-bar",children:[r.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),r.jsx("div",{className:"bar-available",style:{width:`${a}%`}})]}),r.jsxs("div",{className:"summary-legend",children:[r.jsxs("span",{className:"legend-item used",children:[r.jsx("span",{className:"legend-dot"})," Used ",Xe(n,1)]}),r.jsxs("span",{className:"legend-item available",children:[r.jsx("span",{className:"legend-dot"})," Available ",Xe(a,1)]})]})]})}function $h({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:"compact-core",children:r.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:a,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${a})`,transition:"stroke-dasharray 0.5s ease"}}),r.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),r.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:Xe(n,0)})]})})}function Ph({mons:e,mgrs:t,mds:n}){return r.jsxs("div",{className:"compact-daemons",children:[r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mon",children:"MON"}),r.jsx("div",{className:"daemon-dots",children:e.map(a=>r.jsx("span",{className:`daemon-dot mon ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:e.length})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),r.jsx("div",{className:"daemon-dots",children:t.map(a=>r.jsx("span",{className:`daemon-dot mgr ${a.active?"active":"standby"}`,title:`${a.name} - ${a.active?"Active":"Standby"}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mds",children:"MDS"}),r.jsx("div",{className:"daemon-dots",children:n.map(a=>r.jsx("span",{className:`daemon-dot mds ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function Th({ceph:e}){const{t}=Te(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return r.jsxs("div",{className:"compact-storage",children:[r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.used")}),r.jsx("span",{className:"storage-value",children:r.jsx(lo,{value:e.used_bytes})})]}),r.jsx("div",{className:"compact-bar",children:r.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.total")}),r.jsx("span",{className:"storage-value",children:r.jsx(lo,{value:e.total_bytes})})]})]})}function Rh({osds:e,onSelect:t}){const n=e.filter(a=>a.status==="up").length;return r.jsxs("div",{className:"compact-osd-panel",children:[r.jsxs("div",{className:"compact-osd-header",children:[r.jsx("span",{className:"compact-osd-title",children:"OSD"}),r.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),r.jsx("div",{className:"compact-osd-grid",children:e.sort((a,s)=>a.id-s.id).map((a,s)=>{const o=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,i=a.status!=="up"||o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:`compact-osd ${a.status==="up"?"up":"down"}`,style:{"--osd-color":i,animationDelay:`${s*20}ms`},onClick:()=>t(a),title:`OSD.${a.id}`,children:a.id},a.id)})})]})}function Ih({readBps:e,writeBps:t}){return r.jsxs("div",{className:"compact-io",children:[r.jsxs("div",{className:"io-row read",children:[r.jsx("span",{className:"io-arrow",children:"▼"}),r.jsx("span",{className:"io-label",children:"R"}),r.jsxs("span",{className:"io-val",children:[r.jsx(lo,{value:e,duration:500}),"/s"]})]}),r.jsxs("div",{className:"io-row write",children:[r.jsx("span",{className:"io-arrow",children:"▲"}),r.jsx("span",{className:"io-label",children:"W"}),r.jsxs("span",{className:"io-val",children:[r.jsx(lo,{value:t,duration:500}),"/s"]})]})]})}function Lh({pools:e,totalBytes:t}){const n=e.filter(a=>!a.name.startsWith(".")&&!a.name.endsWith("_metadata")).map(a=>({...a,name:a.name.endsWith("_data")?a.name.replace(/_data$/,""):a.name}));return n.length===0?null:r.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(a=>{const s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/t*100,o=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"compact-pool",children:[r.jsx("span",{className:"pool-label",children:a.name.substring(0,12)}),r.jsx("div",{className:"pool-mini-bar",children:r.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:o}})}),r.jsx("span",{className:"pool-pct",style:{color:o},children:Xe(s,0)})]},a.name)}),n.length>6&&r.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function Ah({ceph:e,clusterName:t,onOSDSelect:n,compact:a=!1,isPaused:s=!1}){const{t:o}=Te();if(a)return r.jsxs("div",{className:"ceph-cluster-compact",children:[r.jsx("div",{className:"compact-left",children:r.jsx($h,{ceph:e})}),r.jsxs("div",{className:"compact-middle",children:[r.jsx(Ph,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsx(Th,{ceph:e}),r.jsx(Ih,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),r.jsx("div",{className:"compact-right",children:r.jsx(Rh,{osds:e.osds,onSelect:n})}),r.jsx("div",{className:"compact-pools-section",children:r.jsx(Lh,{pools:e.pools,totalBytes:e.total_bytes})})]});const i=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),c=i.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),l=i.filter(d=>!d.name.toLowerCase().includes("cephfs"));return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"ceph-content-full",children:[r.jsxs("div",{className:"col-core",children:[r.jsx(Nh,{ceph:e}),r.jsx(zh,{ceph:e})]}),r.jsxs("div",{className:"col-daemons",children:[r.jsx(Sh,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsxs("div",{className:"pools-inline",children:[l.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.ceph_pools")}),r.jsx("div",{className:"pools-list",children:l.map((d,p)=>r.jsx(Gd,{pool:d,totalBytes:e.total_bytes},d.name))})]}),c.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.cephfs_pools")}),r.jsx("div",{className:"pools-list",children:c.map((d,p)=>r.jsx(Gd,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),r.jsxs("div",{className:"col-osd",children:[r.jsx(Mh,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),r.jsx(Ch,{osds:e.osds,onSelect:n})]})]})})}function Oh({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=Te(),[s,o]=m.useState(null),i=!e&&t&&Object.keys(t).length>0,c=m.useMemo(()=>i?Object.entries(t).filter(([l,d])=>d.ceph).map(([l,d])=>({id:l,name:d.name||l,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,i]);return!e&&!i?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]}),r.jsx("style",{children:hi})]}):c.length===0?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 8v4M12 16h.01"})]}),r.jsx("span",{children:a("ceph.no_cluster")})]}),r.jsx("style",{children:hi})]}):r.jsxs("div",{className:"ceph-constellation",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"ceph-header",children:r.jsxs("h1",{className:"ceph-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),r.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),a("ceph.title")]})}),r.jsx("div",{className:"ceph-clusters-stack",children:c.map((l,d)=>{const p=l.ceph.health==="HEALTH_OK"?"success":l.ceph.health==="HEALTH_WARN"?"warning":"danger";return r.jsxs("div",{className:"ceph-cluster-section",children:[c.length>1&&r.jsxs("div",{className:"cluster-section-header",children:[r.jsx("span",{className:`section-health ${p}`}),r.jsx("span",{className:"section-name",children:l.name}),r.jsxs("span",{className:"section-osd",children:[l.ceph.osd_up,"/",l.ceph.osd_count," OSD"]}),r.jsx("div",{className:"section-line"})]}),r.jsx(Ah,{ceph:l.ceph,clusterName:c.length===1?l.name:void 0,onOSDSelect:o,compact:c.length>1,isPaused:n})]},l.id)})}),s&&r.jsx(Eh,{osd:s,onClose:()=>o(null)}),r.jsx("style",{children:hi})]})}const hi=`
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
    100% { opacity: 1; transform: scale(1); }
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
  .ceph-content-full {
    display: grid;
    grid-template-columns: 240px 1fr 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    align-items: start;
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

  .pool-group-inline {
    background: rgba(0, 20, 40, 0.4);
    border: 1px solid rgba(0, 240, 255, 0.15);
    border-radius: 8px;
    padding: var(--spacing-sm);
  }

  .pool-group-inline .pool-group-title {
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
    margin-bottom: var(--spacing-sm);
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
  .daemon-orbital {
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.8) 0%, rgba(15, 25, 40, 0.6) 100%);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .orbital-title {
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
    margin-bottom: var(--spacing-md);
  }

  .daemon-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
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

  /* Storage Summary */
  .storage-summary {
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.8) 0%, rgba(15, 25, 40, 0.6) 100%);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .summary-header {
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
    margin-bottom: var(--spacing-md);
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

  /* OSD Grid Panel */
  .osd-grid-panel {
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.8) 0%, rgba(15, 25, 40, 0.6) 100%);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
  }

  .panel-title {
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
  }

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

  .osd-hosts {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .osd-host-group {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    padding: 6px 0;
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
      transform: scale(1);
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

  /* I/O Wave Panel */
  .io-wave-panel {
    background: linear-gradient(135deg, rgba(10, 15, 25, 0.8) 0%, rgba(15, 25, 40, 0.6) 100%);
    border: 1px solid rgba(0, 240, 255, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
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
    to { transform: scale(1) translateY(0); opacity: 1; }
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
`;var Fh={value:()=>{}};function Lm(){for(var e=0,t=arguments.length,n={},a;e<t;++e){if(!(a=arguments[e]+"")||a in n||/[\s.]/.test(a))throw new Error("illegal type: "+a);n[a]=[]}return new Is(n)}function Is(e){this._=e}function Dh(e,t){return e.trim().split(/^|\s+/).map(function(n){var a="",s=n.indexOf(".");if(s>=0&&(a=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:a}})}Is.prototype=Lm.prototype={constructor:Is,on:function(e,t){var n=this._,a=Dh(e+"",n),s,o=-1,i=a.length;if(arguments.length<2){for(;++o<i;)if((s=(e=a[o]).type)&&(s=Bh(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<i;)if(s=(e=a[o]).type)n[s]=Xd(n[s],e.name,t);else if(t==null)for(s in n)n[s]=Xd(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Is(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),a=0,s,o;a<s;++a)n[a]=arguments[a+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],a=0,s=o.length;a<s;++a)o[a].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var a=this._[e],s=0,o=a.length;s<o;++s)a[s].value.apply(t,n)}};function Bh(e,t){for(var n=0,a=e.length,s;n<a;++n)if((s=e[n]).name===t)return s.value}function Xd(e,t,n){for(var a=0,s=e.length;a<s;++a)if(e[a].name===t){e[a]=Fh,e=e.slice(0,a).concat(e.slice(a+1));break}return n!=null&&e.push({name:t,value:n}),e}var fl="http://www.w3.org/1999/xhtml";const Kd={svg:"http://www.w3.org/2000/svg",xhtml:fl,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Lo(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Kd.hasOwnProperty(t)?{space:Kd[t],local:e}:e}function Wh(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===fl&&t.documentElement.namespaceURI===fl?t.createElement(e):t.createElementNS(n,e)}}function Vh(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Am(e){var t=Lo(e);return(t.local?Vh:Wh)(t)}function Uh(){}function gc(e){return e==null?Uh:function(){return this.querySelector(e)}}function Hh(e){typeof e!="function"&&(e=gc(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=new Array(i),l,d,p=0;p<i;++p)(l=o[p])&&(d=e.call(l,l.__data__,p,o))&&("__data__"in l&&(d.__data__=l.__data__),c[p]=d);return new ln(a,this._parents)}function Yh(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Gh(){return[]}function Om(e){return e==null?Gh:function(){return this.querySelectorAll(e)}}function Xh(e){return function(){return Yh(e.apply(this,arguments))}}function Kh(e){typeof e=="function"?e=Xh(e):e=Om(e);for(var t=this._groups,n=t.length,a=[],s=[],o=0;o<n;++o)for(var i=t[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&(a.push(e.call(l,l.__data__,d,i)),s.push(l));return new ln(a,s)}function Fm(e){return function(){return this.matches(e)}}function Dm(e){return function(t){return t.matches(e)}}var qh=Array.prototype.find;function Qh(e){return function(){return qh.call(this.children,e)}}function Zh(){return this.firstElementChild}function Jh(e){return this.select(e==null?Zh:Qh(typeof e=="function"?e:Dm(e)))}var ex=Array.prototype.filter;function tx(){return Array.from(this.children)}function nx(e){return function(){return ex.call(this.children,e)}}function rx(e){return this.selectAll(e==null?tx:nx(typeof e=="function"?e:Dm(e)))}function ax(e){typeof e!="function"&&(e=Fm(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new ln(a,this._parents)}function Bm(e){return new Array(e.length)}function sx(){return new ln(this._enter||this._groups.map(Bm),this._parents)}function co(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}co.prototype={constructor:co,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function ox(e){return function(){return e}}function ix(e,t,n,a,s,o){for(var i=0,c,l=t.length,d=o.length;i<d;++i)(c=t[i])?(c.__data__=o[i],a[i]=c):n[i]=new co(e,o[i]);for(;i<l;++i)(c=t[i])&&(s[i]=c)}function lx(e,t,n,a,s,o,i){var c,l,d=new Map,p=t.length,f=o.length,u=new Array(p),x;for(c=0;c<p;++c)(l=t[c])&&(u[c]=x=i.call(l,l.__data__,c,t)+"",d.has(x)?s[c]=l:d.set(x,l));for(c=0;c<f;++c)x=i.call(e,o[c],c,o)+"",(l=d.get(x))?(a[c]=l,l.__data__=o[c],d.delete(x)):n[c]=new co(e,o[c]);for(c=0;c<p;++c)(l=t[c])&&d.get(u[c])===l&&(s[c]=l)}function cx(e){return e.__data__}function dx(e,t){if(!arguments.length)return Array.from(this,cx);var n=t?lx:ix,a=this._parents,s=this._groups;typeof e!="function"&&(e=ox(e));for(var o=s.length,i=new Array(o),c=new Array(o),l=new Array(o),d=0;d<o;++d){var p=a[d],f=s[d],u=f.length,x=ux(e.call(p,p&&p.__data__,d,a)),y=x.length,j=c[d]=new Array(y),N=i[d]=new Array(y),v=l[d]=new Array(u);n(p,f,j,N,v,x,t);for(var h=0,g=0,_,S;h<y;++h)if(_=j[h]){for(h>=g&&(g=h+1);!(S=N[g])&&++g<y;);_._next=S||null}}return i=new ln(i,a),i._enter=c,i._exit=l,i}function ux(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function px(){return new ln(this._exit||this._groups.map(Bm),this._parents)}function mx(e,t,n){var a=this.enter(),s=this,o=this.exit();return typeof e=="function"?(a=e(a),a&&(a=a.selection())):a=a.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?o.remove():n(o),a&&s?a.merge(s).order():s}function fx(e){for(var t=e.selection?e.selection():e,n=this._groups,a=t._groups,s=n.length,o=a.length,i=Math.min(s,o),c=new Array(s),l=0;l<i;++l)for(var d=n[l],p=a[l],f=d.length,u=c[l]=new Array(f),x,y=0;y<f;++y)(x=d[y]||p[y])&&(u[y]=x);for(;l<s;++l)c[l]=n[l];return new ln(c,this._parents)}function gx(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a=e[t],s=a.length-1,o=a[s],i;--s>=0;)(i=a[s])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function hx(e){e||(e=xx);function t(f,u){return f&&u?e(f.__data__,u.__data__):!f-!u}for(var n=this._groups,a=n.length,s=new Array(a),o=0;o<a;++o){for(var i=n[o],c=i.length,l=s[o]=new Array(c),d,p=0;p<c;++p)(d=i[p])&&(l[p]=d);l.sort(t)}return new ln(s,this._parents).order()}function xx(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function vx(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function yx(){return Array.from(this)}function bx(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length;s<o;++s){var i=a[s];if(i)return i}return null}function wx(){let e=0;for(const t of this)++e;return e}function kx(){return!this.node()}function jx(e){for(var t=this._groups,n=0,a=t.length;n<a;++n)for(var s=t[n],o=0,i=s.length,c;o<i;++o)(c=s[o])&&e.call(c,c.__data__,o,s);return this}function _x(e){return function(){this.removeAttribute(e)}}function Nx(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Sx(e,t){return function(){this.setAttribute(e,t)}}function Cx(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Mx(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function Ex(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function zx(e,t){var n=Lo(e);if(arguments.length<2){var a=this.node();return n.local?a.getAttributeNS(n.space,n.local):a.getAttribute(n)}return this.each((t==null?n.local?Nx:_x:typeof t=="function"?n.local?Ex:Mx:n.local?Cx:Sx)(n,t))}function Wm(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function $x(e){return function(){this.style.removeProperty(e)}}function Px(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Tx(e,t,n){return function(){var a=t.apply(this,arguments);a==null?this.style.removeProperty(e):this.style.setProperty(e,a,n)}}function Rx(e,t,n){return arguments.length>1?this.each((t==null?$x:typeof t=="function"?Tx:Px)(e,t,n??"")):Gr(this.node(),e)}function Gr(e,t){return e.style.getPropertyValue(t)||Wm(e).getComputedStyle(e,null).getPropertyValue(t)}function Ix(e){return function(){delete this[e]}}function Lx(e,t){return function(){this[e]=t}}function Ax(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function Ox(e,t){return arguments.length>1?this.each((t==null?Ix:typeof t=="function"?Ax:Lx)(e,t)):this.node()[e]}function Vm(e){return e.trim().split(/^|\s+/)}function hc(e){return e.classList||new Um(e)}function Um(e){this._node=e,this._names=Vm(e.getAttribute("class")||"")}Um.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function Hm(e,t){for(var n=hc(e),a=-1,s=t.length;++a<s;)n.add(t[a])}function Ym(e,t){for(var n=hc(e),a=-1,s=t.length;++a<s;)n.remove(t[a])}function Fx(e){return function(){Hm(this,e)}}function Dx(e){return function(){Ym(this,e)}}function Bx(e,t){return function(){(t.apply(this,arguments)?Hm:Ym)(this,e)}}function Wx(e,t){var n=Vm(e+"");if(arguments.length<2){for(var a=hc(this.node()),s=-1,o=n.length;++s<o;)if(!a.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?Bx:t?Fx:Dx)(n,t))}function Vx(){this.textContent=""}function Ux(e){return function(){this.textContent=e}}function Hx(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Yx(e){return arguments.length?this.each(e==null?Vx:(typeof e=="function"?Hx:Ux)(e)):this.node().textContent}function Gx(){this.innerHTML=""}function Xx(e){return function(){this.innerHTML=e}}function Kx(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function qx(e){return arguments.length?this.each(e==null?Gx:(typeof e=="function"?Kx:Xx)(e)):this.node().innerHTML}function Qx(){this.nextSibling&&this.parentNode.appendChild(this)}function Zx(){return this.each(Qx)}function Jx(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ev(){return this.each(Jx)}function tv(e){var t=typeof e=="function"?e:Am(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function nv(){return null}function rv(e,t){var n=typeof e=="function"?e:Am(e),a=t==null?nv:typeof t=="function"?t:gc(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),a.apply(this,arguments)||null)})}function av(){var e=this.parentNode;e&&e.removeChild(this)}function sv(){return this.each(av)}function ov(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function iv(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function lv(e){return this.select(e?iv:ov)}function cv(e){return arguments.length?this.property("__data__",e):this.node().__data__}function dv(e){return function(t){e.call(this,t,this.__data__)}}function uv(e){return e.trim().split(/^|\s+/).map(function(t){var n="",a=t.indexOf(".");return a>=0&&(n=t.slice(a+1),t=t.slice(0,a)),{type:t,name:n}})}function pv(e){return function(){var t=this.__on;if(t){for(var n=0,a=-1,s=t.length,o;n<s;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++a]=o;++a?t.length=a:delete this.__on}}}function mv(e,t,n){return function(){var a=this.__on,s,o=dv(t);if(a){for(var i=0,c=a.length;i<c;++i)if((s=a[i]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=o,s.options=n),s.value=t;return}}this.addEventListener(e.type,o,n),s={type:e.type,name:e.name,value:t,listener:o,options:n},a?a.push(s):this.__on=[s]}}function fv(e,t,n){var a=uv(e+""),s,o=a.length,i;if(arguments.length<2){var c=this.node().__on;if(c){for(var l=0,d=c.length,p;l<d;++l)for(s=0,p=c[l];s<o;++s)if((i=a[s]).type===p.type&&i.name===p.name)return p.value}return}for(c=t?mv:pv,s=0;s<o;++s)this.each(c(a[s],t,n));return this}function Gm(e,t,n){var a=Wm(e),s=a.CustomEvent;typeof s=="function"?s=new s(t,n):(s=a.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function gv(e,t){return function(){return Gm(this,e,t)}}function hv(e,t){return function(){return Gm(this,e,t.apply(this,arguments))}}function xv(e,t){return this.each((typeof t=="function"?hv:gv)(e,t))}function*vv(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length,i;s<o;++s)(i=a[s])&&(yield i)}var yv=[null];function ln(e,t){this._groups=e,this._parents=t}function Qa(){return new ln([[document.documentElement]],yv)}function bv(){return this}ln.prototype=Qa.prototype={constructor:ln,select:Hh,selectAll:Kh,selectChild:Jh,selectChildren:rx,filter:ax,data:dx,enter:sx,exit:px,join:mx,merge:fx,selection:bv,order:gx,sort:hx,call:vx,nodes:yx,node:bx,size:wx,empty:kx,each:jx,attr:zx,style:Rx,property:Ox,classed:Wx,text:Yx,html:qx,raise:Zx,lower:ev,append:tv,insert:rv,remove:sv,clone:lv,datum:cv,on:fv,dispatch:xv,[Symbol.iterator]:vv};function xc(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Xm(e,t){var n=Object.create(e.prototype);for(var a in t)n[a]=t[a];return n}function Za(){}var Wa=.7,uo=1/Wa,Fr="\\s*([+-]?\\d+)\\s*",Va="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",hn="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",wv=/^#([0-9a-f]{3,8})$/,kv=new RegExp(`^rgb\\(${Fr},${Fr},${Fr}\\)$`),jv=new RegExp(`^rgb\\(${hn},${hn},${hn}\\)$`),_v=new RegExp(`^rgba\\(${Fr},${Fr},${Fr},${Va}\\)$`),Nv=new RegExp(`^rgba\\(${hn},${hn},${hn},${Va}\\)$`),Sv=new RegExp(`^hsl\\(${Va},${hn},${hn}\\)$`),Cv=new RegExp(`^hsla\\(${Va},${hn},${hn},${Va}\\)$`),qd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};xc(Za,Ua,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Qd,formatHex:Qd,formatHex8:Mv,formatHsl:Ev,formatRgb:Zd,toString:Zd});function Qd(){return this.rgb().formatHex()}function Mv(){return this.rgb().formatHex8()}function Ev(){return Km(this).formatHsl()}function Zd(){return this.rgb().formatRgb()}function Ua(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=wv.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Jd(t):n===3?new zt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?bs(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?bs(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=kv.exec(e))?new zt(t[1],t[2],t[3],1):(t=jv.exec(e))?new zt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=_v.exec(e))?bs(t[1],t[2],t[3],t[4]):(t=Nv.exec(e))?bs(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Sv.exec(e))?nu(t[1],t[2]/100,t[3]/100,1):(t=Cv.exec(e))?nu(t[1],t[2]/100,t[3]/100,t[4]):qd.hasOwnProperty(e)?Jd(qd[e]):e==="transparent"?new zt(NaN,NaN,NaN,0):null}function Jd(e){return new zt(e>>16&255,e>>8&255,e&255,1)}function bs(e,t,n,a){return a<=0&&(e=t=n=NaN),new zt(e,t,n,a)}function zv(e){return e instanceof Za||(e=Ua(e)),e?(e=e.rgb(),new zt(e.r,e.g,e.b,e.opacity)):new zt}function gl(e,t,n,a){return arguments.length===1?zv(e):new zt(e,t,n,a??1)}function zt(e,t,n,a){this.r=+e,this.g=+t,this.b=+n,this.opacity=+a}xc(zt,gl,Xm(Za,{brighter(e){return e=e==null?uo:Math.pow(uo,e),new zt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Wa:Math.pow(Wa,e),new zt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new zt(ur(this.r),ur(this.g),ur(this.b),po(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:eu,formatHex:eu,formatHex8:$v,formatRgb:tu,toString:tu}));function eu(){return`#${lr(this.r)}${lr(this.g)}${lr(this.b)}`}function $v(){return`#${lr(this.r)}${lr(this.g)}${lr(this.b)}${lr((isNaN(this.opacity)?1:this.opacity)*255)}`}function tu(){const e=po(this.opacity);return`${e===1?"rgb(":"rgba("}${ur(this.r)}, ${ur(this.g)}, ${ur(this.b)}${e===1?")":`, ${e})`}`}function po(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function ur(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function lr(e){return e=ur(e),(e<16?"0":"")+e.toString(16)}function nu(e,t,n,a){return a<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new rn(e,t,n,a)}function Km(e){if(e instanceof rn)return new rn(e.h,e.s,e.l,e.opacity);if(e instanceof Za||(e=Ua(e)),!e)return new rn;if(e instanceof rn)return e;e=e.rgb();var t=e.r/255,n=e.g/255,a=e.b/255,s=Math.min(t,n,a),o=Math.max(t,n,a),i=NaN,c=o-s,l=(o+s)/2;return c?(t===o?i=(n-a)/c+(n<a)*6:n===o?i=(a-t)/c+2:i=(t-n)/c+4,c/=l<.5?o+s:2-o-s,i*=60):c=l>0&&l<1?0:i,new rn(i,c,l,e.opacity)}function Pv(e,t,n,a){return arguments.length===1?Km(e):new rn(e,t,n,a??1)}function rn(e,t,n,a){this.h=+e,this.s=+t,this.l=+n,this.opacity=+a}xc(rn,Pv,Xm(Za,{brighter(e){return e=e==null?uo:Math.pow(uo,e),new rn(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Wa:Math.pow(Wa,e),new rn(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,a=n+(n<.5?n:1-n)*t,s=2*n-a;return new zt(xi(e>=240?e-240:e+120,s,a),xi(e,s,a),xi(e<120?e+240:e-120,s,a),this.opacity)},clamp(){return new rn(ru(this.h),ws(this.s),ws(this.l),po(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=po(this.opacity);return`${e===1?"hsl(":"hsla("}${ru(this.h)}, ${ws(this.s)*100}%, ${ws(this.l)*100}%${e===1?")":`, ${e})`}`}}));function ru(e){return e=(e||0)%360,e<0?e+360:e}function ws(e){return Math.max(0,Math.min(1,e||0))}function xi(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const qm=e=>()=>e;function Tv(e,t){return function(n){return e+n*t}}function Rv(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(a){return Math.pow(e+a*t,n)}}function Iv(e){return(e=+e)==1?Qm:function(t,n){return n-t?Rv(t,n,e):qm(isNaN(t)?n:t)}}function Qm(e,t){var n=t-e;return n?Tv(e,n):qm(isNaN(e)?t:e)}const au=function e(t){var n=Iv(t);function a(s,o){var i=n((s=gl(s)).r,(o=gl(o)).r),c=n(s.g,o.g),l=n(s.b,o.b),d=Qm(s.opacity,o.opacity);return function(p){return s.r=i(p),s.g=c(p),s.b=l(p),s.opacity=d(p),s+""}}return a.gamma=e,a}(1);function On(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var hl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,vi=new RegExp(hl.source,"g");function Lv(e){return function(){return e}}function Av(e){return function(t){return e(t)+""}}function Ov(e,t){var n=hl.lastIndex=vi.lastIndex=0,a,s,o,i=-1,c=[],l=[];for(e=e+"",t=t+"";(a=hl.exec(e))&&(s=vi.exec(t));)(o=s.index)>n&&(o=t.slice(n,o),c[i]?c[i]+=o:c[++i]=o),(a=a[0])===(s=s[0])?c[i]?c[i]+=s:c[++i]=s:(c[++i]=null,l.push({i,x:On(a,s)})),n=vi.lastIndex;return n<t.length&&(o=t.slice(n),c[i]?c[i]+=o:c[++i]=o),c.length<2?l[0]?Av(l[0].x):Lv(t):(t=l.length,function(d){for(var p=0,f;p<t;++p)c[(f=l[p]).i]=f.x(d);return c.join("")})}var su=180/Math.PI,xl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Zm(e,t,n,a,s,o){var i,c,l;return(i=Math.sqrt(e*e+t*t))&&(e/=i,t/=i),(l=e*n+t*a)&&(n-=e*l,a-=t*l),(c=Math.sqrt(n*n+a*a))&&(n/=c,a/=c,l/=c),e*a<t*n&&(e=-e,t=-t,l=-l,i=-i),{translateX:s,translateY:o,rotate:Math.atan2(t,e)*su,skewX:Math.atan(l)*su,scaleX:i,scaleY:c}}var ks;function Fv(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?xl:Zm(t.a,t.b,t.c,t.d,t.e,t.f)}function Dv(e){return e==null||(ks||(ks=document.createElementNS("http://www.w3.org/2000/svg","g")),ks.setAttribute("transform",e),!(e=ks.transform.baseVal.consolidate()))?xl:(e=e.matrix,Zm(e.a,e.b,e.c,e.d,e.e,e.f))}function Jm(e,t,n,a){function s(d){return d.length?d.pop()+" ":""}function o(d,p,f,u,x,y){if(d!==f||p!==u){var j=x.push("translate(",null,t,null,n);y.push({i:j-4,x:On(d,f)},{i:j-2,x:On(p,u)})}else(f||u)&&x.push("translate("+f+t+u+n)}function i(d,p,f,u){d!==p?(d-p>180?p+=360:p-d>180&&(d+=360),u.push({i:f.push(s(f)+"rotate(",null,a)-2,x:On(d,p)})):p&&f.push(s(f)+"rotate("+p+a)}function c(d,p,f,u){d!==p?u.push({i:f.push(s(f)+"skewX(",null,a)-2,x:On(d,p)}):p&&f.push(s(f)+"skewX("+p+a)}function l(d,p,f,u,x,y){if(d!==f||p!==u){var j=x.push(s(x)+"scale(",null,",",null,")");y.push({i:j-4,x:On(d,f)},{i:j-2,x:On(p,u)})}else(f!==1||u!==1)&&x.push(s(x)+"scale("+f+","+u+")")}return function(d,p){var f=[],u=[];return d=e(d),p=e(p),o(d.translateX,d.translateY,p.translateX,p.translateY,f,u),i(d.rotate,p.rotate,f,u),c(d.skewX,p.skewX,f,u),l(d.scaleX,d.scaleY,p.scaleX,p.scaleY,f,u),d=p=null,function(x){for(var y=-1,j=u.length,N;++y<j;)f[(N=u[y]).i]=N.x(x);return f.join("")}}}var Bv=Jm(Fv,"px, ","px)","deg)"),Wv=Jm(Dv,", ",")",")"),Xr=0,ma=0,oa=0,ef=1e3,mo,fa,fo=0,xr=0,Ao=0,Ha=typeof performance=="object"&&performance.now?performance:Date,tf=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function vc(){return xr||(tf(Vv),xr=Ha.now()+Ao)}function Vv(){xr=0}function go(){this._call=this._time=this._next=null}go.prototype=nf.prototype={constructor:go,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?vc():+n)+(t==null?0:+t),!this._next&&fa!==this&&(fa?fa._next=this:mo=this,fa=this),this._call=e,this._time=n,vl()},stop:function(){this._call&&(this._call=null,this._time=1/0,vl())}};function nf(e,t,n){var a=new go;return a.restart(e,t,n),a}function Uv(){vc(),++Xr;for(var e=mo,t;e;)(t=xr-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Xr}function ou(){xr=(fo=Ha.now())+Ao,Xr=ma=0;try{Uv()}finally{Xr=0,Yv(),xr=0}}function Hv(){var e=Ha.now(),t=e-fo;t>ef&&(Ao-=t,fo=e)}function Yv(){for(var e,t=mo,n,a=1/0;t;)t._call?(a>t._time&&(a=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:mo=n);fa=e,vl(a)}function vl(e){if(!Xr){ma&&(ma=clearTimeout(ma));var t=e-xr;t>24?(e<1/0&&(ma=setTimeout(ou,e-Ha.now()-Ao)),oa&&(oa=clearInterval(oa))):(oa||(fo=Ha.now(),oa=setInterval(Hv,ef)),Xr=1,tf(ou))}}function iu(e,t,n){var a=new go;return t=t==null?0:+t,a.restart(s=>{a.stop(),e(s+t)},t,n),a}var Gv=Lm("start","end","cancel","interrupt"),Xv=[],rf=0,lu=1,yl=2,Ls=3,cu=4,bl=5,As=6;function Oo(e,t,n,a,s,o){var i=e.__transition;if(!i)e.__transition={};else if(n in i)return;Kv(e,n,{name:t,index:a,group:s,on:Gv,tween:Xv,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:rf})}function yc(e,t){var n=cn(e,t);if(n.state>rf)throw new Error("too late; already scheduled");return n}function xn(e,t){var n=cn(e,t);if(n.state>Ls)throw new Error("too late; already running");return n}function cn(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function Kv(e,t,n){var a=e.__transition,s;a[t]=n,n.timer=nf(o,0,n.time);function o(d){n.state=lu,n.timer.restart(i,n.delay,n.time),n.delay<=d&&i(d-n.delay)}function i(d){var p,f,u,x;if(n.state!==lu)return l();for(p in a)if(x=a[p],x.name===n.name){if(x.state===Ls)return iu(i);x.state===cu?(x.state=As,x.timer.stop(),x.on.call("interrupt",e,e.__data__,x.index,x.group),delete a[p]):+p<t&&(x.state=As,x.timer.stop(),x.on.call("cancel",e,e.__data__,x.index,x.group),delete a[p])}if(iu(function(){n.state===Ls&&(n.state=cu,n.timer.restart(c,n.delay,n.time),c(d))}),n.state=yl,n.on.call("start",e,e.__data__,n.index,n.group),n.state===yl){for(n.state=Ls,s=new Array(u=n.tween.length),p=0,f=-1;p<u;++p)(x=n.tween[p].value.call(e,e.__data__,n.index,n.group))&&(s[++f]=x);s.length=f+1}}function c(d){for(var p=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(l),n.state=bl,1),f=-1,u=s.length;++f<u;)s[f].call(e,p);n.state===bl&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=As,n.timer.stop(),delete a[t];for(var d in a)return;delete e.__transition}}function qv(e,t){var n=e.__transition,a,s,o=!0,i;if(n){t=t==null?null:t+"";for(i in n){if((a=n[i]).name!==t){o=!1;continue}s=a.state>yl&&a.state<bl,a.state=As,a.timer.stop(),a.on.call(s?"interrupt":"cancel",e,e.__data__,a.index,a.group),delete n[i]}o&&delete e.__transition}}function Qv(e){return this.each(function(){qv(this,e)})}function Zv(e,t){var n,a;return function(){var s=xn(this,e),o=s.tween;if(o!==n){a=n=o;for(var i=0,c=a.length;i<c;++i)if(a[i].name===t){a=a.slice(),a.splice(i,1);break}}s.tween=a}}function Jv(e,t,n){var a,s;if(typeof n!="function")throw new Error;return function(){var o=xn(this,e),i=o.tween;if(i!==a){s=(a=i).slice();for(var c={name:t,value:n},l=0,d=s.length;l<d;++l)if(s[l].name===t){s[l]=c;break}l===d&&s.push(c)}o.tween=s}}function ey(e,t){var n=this._id;if(e+="",arguments.length<2){for(var a=cn(this.node(),n).tween,s=0,o=a.length,i;s<o;++s)if((i=a[s]).name===e)return i.value;return null}return this.each((t==null?Zv:Jv)(n,e,t))}function bc(e,t,n){var a=e._id;return e.each(function(){var s=xn(this,a);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return cn(s,a).value[t]}}function af(e,t){var n;return(typeof t=="number"?On:t instanceof Ua?au:(n=Ua(t))?(t=n,au):Ov)(e,t)}function ty(e){return function(){this.removeAttribute(e)}}function ny(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ry(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttribute(e);return i===s?null:i===a?o:o=t(a=i,n)}}function ay(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttributeNS(e.space,e.local);return i===s?null:i===a?o:o=t(a=i,n)}}function sy(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttribute(e):(i=this.getAttribute(e),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function oy(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttributeNS(e.space,e.local):(i=this.getAttributeNS(e.space,e.local),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function iy(e,t){var n=Lo(e),a=n==="transform"?Wv:af;return this.attrTween(e,typeof t=="function"?(n.local?oy:sy)(n,a,bc(this,"attr."+e,t)):t==null?(n.local?ny:ty)(n):(n.local?ay:ry)(n,a,t))}function ly(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function cy(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function dy(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&cy(e,o)),n}return s._value=t,s}function uy(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&ly(e,o)),n}return s._value=t,s}function py(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var a=Lo(e);return this.tween(n,(a.local?dy:uy)(a,t))}function my(e,t){return function(){yc(this,e).delay=+t.apply(this,arguments)}}function fy(e,t){return t=+t,function(){yc(this,e).delay=t}}function gy(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?my:fy)(t,e)):cn(this.node(),t).delay}function hy(e,t){return function(){xn(this,e).duration=+t.apply(this,arguments)}}function xy(e,t){return t=+t,function(){xn(this,e).duration=t}}function vy(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?hy:xy)(t,e)):cn(this.node(),t).duration}function yy(e,t){if(typeof t!="function")throw new Error;return function(){xn(this,e).ease=t}}function by(e){var t=this._id;return arguments.length?this.each(yy(t,e)):cn(this.node(),t).ease}function wy(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;xn(this,e).ease=n}}function ky(e){if(typeof e!="function")throw new Error;return this.each(wy(this._id,e))}function jy(e){typeof e!="function"&&(e=Fm(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new $n(a,this._parents,this._name,this._id)}function _y(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,a=t.length,s=n.length,o=Math.min(a,s),i=new Array(a),c=0;c<o;++c)for(var l=t[c],d=n[c],p=l.length,f=i[c]=new Array(p),u,x=0;x<p;++x)(u=l[x]||d[x])&&(f[x]=u);for(;c<a;++c)i[c]=t[c];return new $n(i,this._parents,this._name,this._id)}function Ny(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function Sy(e,t,n){var a,s,o=Ny(t)?yc:xn;return function(){var i=o(this,e),c=i.on;c!==a&&(s=(a=c).copy()).on(t,n),i.on=s}}function Cy(e,t){var n=this._id;return arguments.length<2?cn(this.node(),n).on.on(e):this.each(Sy(n,e,t))}function My(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function Ey(){return this.on("end.remove",My(this._id))}function zy(e){var t=this._name,n=this._id;typeof e!="function"&&(e=gc(e));for(var a=this._groups,s=a.length,o=new Array(s),i=0;i<s;++i)for(var c=a[i],l=c.length,d=o[i]=new Array(l),p,f,u=0;u<l;++u)(p=c[u])&&(f=e.call(p,p.__data__,u,c))&&("__data__"in p&&(f.__data__=p.__data__),d[u]=f,Oo(d[u],t,n,u,d,cn(p,n)));return new $n(o,this._parents,t,n)}function $y(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Om(e));for(var a=this._groups,s=a.length,o=[],i=[],c=0;c<s;++c)for(var l=a[c],d=l.length,p,f=0;f<d;++f)if(p=l[f]){for(var u=e.call(p,p.__data__,f,l),x,y=cn(p,n),j=0,N=u.length;j<N;++j)(x=u[j])&&Oo(x,t,n,j,u,y);o.push(u),i.push(p)}return new $n(o,i,t,n)}var Py=Qa.prototype.constructor;function Ty(){return new Py(this._groups,this._parents)}function Ry(e,t){var n,a,s;return function(){var o=Gr(this,e),i=(this.style.removeProperty(e),Gr(this,e));return o===i?null:o===n&&i===a?s:s=t(n=o,a=i)}}function sf(e){return function(){this.style.removeProperty(e)}}function Iy(e,t,n){var a,s=n+"",o;return function(){var i=Gr(this,e);return i===s?null:i===a?o:o=t(a=i,n)}}function Ly(e,t,n){var a,s,o;return function(){var i=Gr(this,e),c=n(this),l=c+"";return c==null&&(l=c=(this.style.removeProperty(e),Gr(this,e))),i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c))}}function Ay(e,t){var n,a,s,o="style."+t,i="end."+o,c;return function(){var l=xn(this,e),d=l.on,p=l.value[o]==null?c||(c=sf(t)):void 0;(d!==n||s!==p)&&(a=(n=d).copy()).on(i,s=p),l.on=a}}function Oy(e,t,n){var a=(e+="")=="transform"?Bv:af;return t==null?this.styleTween(e,Ry(e,a)).on("end.style."+e,sf(e)):typeof t=="function"?this.styleTween(e,Ly(e,a,bc(this,"style."+e,t))).each(Ay(this._id,e)):this.styleTween(e,Iy(e,a,t),n).on("end.style."+e,null)}function Fy(e,t,n){return function(a){this.style.setProperty(e,t.call(this,a),n)}}function Dy(e,t,n){var a,s;function o(){var i=t.apply(this,arguments);return i!==s&&(a=(s=i)&&Fy(e,i,n)),a}return o._value=t,o}function By(e,t,n){var a="style."+(e+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,Dy(e,t,n??""))}function Wy(e){return function(){this.textContent=e}}function Vy(e){return function(){var t=e(this);this.textContent=t??""}}function Uy(e){return this.tween("text",typeof e=="function"?Vy(bc(this,"text",e)):Wy(e==null?"":e+""))}function Hy(e){return function(t){this.textContent=e.call(this,t)}}function Yy(e){var t,n;function a(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&Hy(s)),t}return a._value=e,a}function Gy(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,Yy(e))}function Xy(){for(var e=this._name,t=this._id,n=of(),a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)if(l=i[d]){var p=cn(l,t);Oo(l,e,n,d,i,{time:p.time+p.delay+p.duration,delay:0,duration:p.duration,ease:p.ease})}return new $n(a,this._parents,e,n)}function Ky(){var e,t,n=this,a=n._id,s=n.size();return new Promise(function(o,i){var c={value:i},l={value:function(){--s===0&&o()}};n.each(function(){var d=xn(this,a),p=d.on;p!==e&&(t=(e=p).copy(),t._.cancel.push(c),t._.interrupt.push(c),t._.end.push(l)),d.on=t}),s===0&&o()})}var qy=0;function $n(e,t,n,a){this._groups=e,this._parents=t,this._name=n,this._id=a}function of(){return++qy}var wn=Qa.prototype;$n.prototype={constructor:$n,select:zy,selectAll:$y,selectChild:wn.selectChild,selectChildren:wn.selectChildren,filter:jy,merge:_y,selection:Ty,transition:Xy,call:wn.call,nodes:wn.nodes,node:wn.node,size:wn.size,empty:wn.empty,each:wn.each,on:Cy,attr:iy,attrTween:py,style:Oy,styleTween:By,text:Uy,textTween:Gy,remove:Ey,tween:ey,delay:gy,duration:vy,ease:by,easeVarying:ky,end:Ky,[Symbol.iterator]:wn[Symbol.iterator]};function Qy(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var Zy={time:null,delay:0,duration:250,ease:Qy};function Jy(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function e1(e){var t,n;e instanceof $n?(t=e._id,e=e._name):(t=of(),(n=Zy).time=vc(),e=e==null?null:e+"");for(var a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&Oo(l,e,t,d,i,n||Jy(l,t));return new $n(a,this._parents,e,t)}Qa.prototype.interrupt=Qv;Qa.prototype.transition=e1;function t1(e){var t=0,n=e.children,a=n&&n.length;if(!a)t=1;else for(;--a>=0;)t+=n[a].value;e.value=t}function n1(){return this.eachAfter(t1)}function r1(e,t){let n=-1;for(const a of this)e.call(t,a,++n,this);return this}function a1(e,t){for(var n=this,a=[n],s,o,i=-1;n=a.pop();)if(e.call(t,n,++i,this),s=n.children)for(o=s.length-1;o>=0;--o)a.push(s[o]);return this}function s1(e,t){for(var n=this,a=[n],s=[],o,i,c,l=-1;n=a.pop();)if(s.push(n),o=n.children)for(i=0,c=o.length;i<c;++i)a.push(o[i]);for(;n=s.pop();)e.call(t,n,++l,this);return this}function o1(e,t){let n=-1;for(const a of this)if(e.call(t,a,++n,this))return a}function i1(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,a=t.children,s=a&&a.length;--s>=0;)n+=a[s].value;t.value=n})}function l1(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function c1(e){for(var t=this,n=d1(t,e),a=[t];t!==n;)t=t.parent,a.push(t);for(var s=a.length;e!==n;)a.splice(s,0,e),e=e.parent;return a}function d1(e,t){if(e===t)return e;var n=e.ancestors(),a=t.ancestors(),s=null;for(e=n.pop(),t=a.pop();e===t;)s=e,e=n.pop(),t=a.pop();return s}function u1(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function p1(){return Array.from(this)}function m1(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function f1(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*g1(){var e=this,t,n=[e],a,s,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,a=e.children)for(s=0,o=a.length;s<o;++s)n.push(a[s]);while(n.length)}function wc(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=v1)):t===void 0&&(t=x1);for(var n=new ho(e),a,s=[n],o,i,c,l;a=s.pop();)if((i=t(a.data))&&(l=(i=Array.from(i)).length))for(a.children=i,c=l-1;c>=0;--c)s.push(o=i[c]=new ho(i[c])),o.parent=a,o.depth=a.depth+1;return n.eachBefore(b1)}function h1(){return wc(this).eachBefore(y1)}function x1(e){return e.children}function v1(e){return Array.isArray(e)?e[1]:null}function y1(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function b1(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function ho(e){this.data=e,this.depth=this.height=0,this.parent=null}ho.prototype=wc.prototype={constructor:ho,count:n1,each:r1,eachAfter:s1,eachBefore:a1,find:o1,sum:i1,sort:l1,path:c1,ancestors:u1,descendants:p1,leaves:m1,links:f1,copy:h1,[Symbol.iterator]:g1};function w1(e){if(typeof e!="function")throw new Error;return e}function ia(){return 0}function la(e){return function(){return e}}function k1(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function j1(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(a-t)/e.value;++c<l;)i=o[c],i.y0=n,i.y1=s,i.x0=t,i.x1=t+=i.value*d}function _1(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(s-n)/e.value;++c<l;)i=o[c],i.x0=t,i.x1=a,i.y0=n,i.y1=n+=i.value*d}var N1=(1+Math.sqrt(5))/2;function S1(e,t,n,a,s,o){for(var i=[],c=t.children,l,d,p=0,f=0,u=c.length,x,y,j=t.value,N,v,h,g,_,S,P;p<u;){x=s-n,y=o-a;do N=c[f++].value;while(!N&&f<u);for(v=h=N,S=Math.max(y/x,x/y)/(j*e),P=N*N*S,_=Math.max(h/P,P/v);f<u;++f){if(N+=d=c[f].value,d<v&&(v=d),d>h&&(h=d),P=N*N*S,g=Math.max(h/P,P/v),g>_){N-=d;break}_=g}i.push(l={value:N,dice:x<y,children:c.slice(p,f)}),l.dice?j1(l,n,a,s,j?a+=y*N/j:o):_1(l,n,a,j?n+=x*N/j:s,o),j-=N,p=f}return i}const lf=function e(t){function n(a,s,o,i,c){S1(t,a,s,o,i,c)}return n.ratio=function(a){return e((a=+a)>1?a:1)},n}(N1);function C1(){var e=lf,t=!1,n=1,a=1,s=[0],o=ia,i=ia,c=ia,l=ia,d=ia;function p(u){return u.x0=u.y0=0,u.x1=n,u.y1=a,u.eachBefore(f),s=[0],t&&u.eachBefore(k1),u}function f(u){var x=s[u.depth],y=u.x0+x,j=u.y0+x,N=u.x1-x,v=u.y1-x;N<y&&(y=N=(y+N)/2),v<j&&(j=v=(j+v)/2),u.x0=y,u.y0=j,u.x1=N,u.y1=v,u.children&&(x=s[u.depth+1]=o(u)/2,y+=d(u)-x,j+=i(u)-x,N-=c(u)-x,v-=l(u)-x,N<y&&(y=N=(y+N)/2),v<j&&(j=v=(j+v)/2),e(u,y,j,N,v))}return p.round=function(u){return arguments.length?(t=!!u,p):t},p.size=function(u){return arguments.length?(n=+u[0],a=+u[1],p):[n,a]},p.tile=function(u){return arguments.length?(e=w1(u),p):e},p.padding=function(u){return arguments.length?p.paddingInner(u).paddingOuter(u):p.paddingInner()},p.paddingInner=function(u){return arguments.length?(o=typeof u=="function"?u:la(+u),p):o},p.paddingOuter=function(u){return arguments.length?p.paddingTop(u).paddingRight(u).paddingBottom(u).paddingLeft(u):p.paddingTop()},p.paddingTop=function(u){return arguments.length?(i=typeof u=="function"?u:la(+u),p):i},p.paddingRight=function(u){return arguments.length?(c=typeof u=="function"?u:la(+u),p):c},p.paddingBottom=function(u){return arguments.length?(l=typeof u=="function"?u:la(+u),p):l},p.paddingLeft=function(u){return arguments.length?(d=typeof u=="function"?u:la(+u),p):d},p}function ga(e,t,n){this.k=e,this.x=t,this.y=n}ga.prototype={constructor:ga,scale:function(e){return e===1?this:new ga(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new ga(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};ga.prototype;const du={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function M1(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return du[n]||du.default}function uu(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,a)).toFixed(1))+" "+n[a]}function pu({name:e,usedBytes:t,totalBytes:n,type:a,isShared:s=!1,connectedNodes:o=[],nodeName:i,isOffline:c=!1,width:l=120,height:d=180,animationDelay:p=0,onClick:f,onHover:u}){const x=m.useRef(null),y=m.useRef(0),j=m.useRef([]),N=m.useRef(0),[v,h]=m.useState(!1),g=n>0?t/n*100:0,[_,S]=m.useState(0),[P,E]=m.useState(!1),[R,M]=m.useState(!0),w=m.useRef(null),$=m.useRef(0),I=1200,W=500;m.useEffect(()=>{const K=setTimeout(()=>{E(!0)},p);return()=>clearTimeout(K)},[p]),m.useEffect(()=>{if(!P)return;$.current=_,w.current=null;const K=$.current,b=g;if(Math.abs(K-b)<.1){S(b);return}const V=R?I:W,J=ae=>{w.current===null&&(w.current=ae);const le=ae-w.current,ue=Math.min(le/V,1),ee=(ne=>1-Math.pow(1-ne,3))(ue),q=K+(b-K)*ee;S(q),ue<1?requestAnimationFrame(J):R&&M(!1)};requestAnimationFrame(J)},[g,P]);const C=_,F=g>=85,X=g>=95,T=M1(g,a),L=m.useCallback(K=>{const b=[];for(let V=0;V<K;V++)b.push({x:Math.random()*l*.6+l*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return b},[l,d]);m.useEffect(()=>{const K=x.current;if(!K)return;const b=K.getContext("2d");if(!b)return;const V=window.devicePixelRatio||1;K.width=l*V,K.height=d*V,b.scale(V,V);const J=F?15:5;j.current=L(J);const ae=le=>{le-N.current,N.current=le;const ue=le*.001;b.clearRect(0,0,l,d);const Qe=8,ee=Qe,q=Qe+20,ne=l-Qe*2,de=d-Qe*2-40,Ae=8,Ze=c?.05:C/100,ot=de*Ze,Le=q+de-ot,H=b.createLinearGradient(ee,q,ee,q+de);H.addColorStop(0,"#0a0a12"),H.addColorStop(.5,"#050510"),H.addColorStop(1,"#0a0a12"),b.fillStyle=H,b.beginPath(),b.roundRect(ee,q,ne,de,Ae),b.fill(),b.save(),b.beginPath(),b.roundRect(ee,q,ne,de,Ae),b.clip();const se=12,ce=se*Math.sqrt(3);b.strokeStyle="rgba(0, 240, 255, 0.06)",b.lineWidth=.5;for(let fe=0;fe<de/ce+1;fe++)for(let ge=0;ge<ne/(se*1.5)+1;ge++){const De=fe%2*se*.75,tt=ee+ge*se*1.5+De,pt=q+fe*ce*.5;b.beginPath();for(let Je=0;Je<6;Je++){const It=Math.PI/3*Je+Math.PI/6,re=tt+se*.4*Math.cos(It),ze=pt+se*.4*Math.sin(It);Je===0?b.moveTo(re,ze):b.lineTo(re,ze)}b.closePath(),b.stroke()}b.restore();const pe=q+ue*30%de;b.save(),b.beginPath(),b.roundRect(ee,q,ne,de,Ae),b.clip();const Ee=b.createLinearGradient(ee,pe-15,ee,pe+5);Ee.addColorStop(0,"transparent"),Ee.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Ee.addColorStop(1,"transparent"),b.fillStyle=Ee,b.fillRect(ee,pe-15,ne,20),b.restore(),b.strokeStyle="rgba(0, 240, 255, 0.2)",b.lineWidth=1;for(let fe=0;fe<=10;fe++){const ge=q+de-de*fe/10,De=fe%5===0?12:6,tt=fe%5===0?.4:.2;b.strokeStyle=`rgba(0, 240, 255, ${tt})`,b.beginPath(),b.moveTo(ee+2,ge),b.lineTo(ee+2+De,ge),b.stroke(),b.beginPath(),b.moveTo(ee+ne-2,ge),b.lineTo(ee+ne-2-De,ge),b.stroke()}const rt=ue*50%de;for(let fe=0;fe<3;fe++){const ge=q+(rt+fe*de/3)%de,De=.3+Math.sin(ue*3+fe)*.2;b.beginPath(),b.strokeStyle=`rgba(0, 240, 255, ${De})`,b.lineWidth=2,b.moveTo(ee,ge),b.lineTo(ee+4,ge),b.stroke(),b.beginPath(),b.moveTo(ee+ne,ge),b.lineTo(ee+ne-4,ge),b.stroke()}if(!c&&Ze>0){const fe=b.createLinearGradient(0,Le,0,q+de);fe.addColorStop(0,T.gradient[0]),fe.addColorStop(1,T.gradient[1]);const ge=F?6:3,De=.05,tt=F?.1:.05,pt=Math.PI/3;b.save(),b.beginPath(),b.rect(ee,q,ne,de),b.clip(),b.fillStyle=fe,b.beginPath(),b.moveTo(ee,q+de);for(let re=0;re<=ne;re+=2){const ze=Math.sin(re*De+ue*tt*60)*ge,Be=Math.sin(re*De*1.5+ue*tt*40+pt)*(ge*.5),at=Le+ze+Be;re===0?b.moveTo(ee+re,at):b.lineTo(ee+re,at)}b.lineTo(ee+ne,q+de),b.lineTo(ee,q+de),b.closePath(),b.fill(),b.strokeStyle=T.glow,b.lineWidth=2,b.shadowColor=T.main,b.shadowBlur=10,b.beginPath();for(let re=0;re<=ne;re+=2){const ze=Math.sin(re*De+ue*tt*60)*ge,Be=Math.sin(re*De*1.5+ue*tt*40+pt)*(ge*.5),at=Le+ze+Be;re===0?b.moveTo(ee+re,at):b.lineTo(ee+re,at)}b.stroke(),b.shadowBlur=0,j.current.forEach((re,ze)=>{if(re.y>Le&&re.y<q+de){const Be=Math.sin(ue*re.wobbleSpeed*60+re.wobbleOffset)*3;b.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,b.beginPath(),b.arc(re.x+Be,re.y,re.radius,0,Math.PI*2),b.fill(),b.fillStyle="rgba(255, 255, 255, 0.5)",b.beginPath(),b.arc(re.x+Be-re.radius*.3,re.y-re.radius*.3,re.radius*.3,0,Math.PI*2),b.fill()}re.y-=re.speed*(F?2:1),re.y<Le-10&&(re.y=q+de+Math.random()*20,re.x=ee+Math.random()*ne*.6+ne*.2)}),b.restore();const Je=3;for(let re=0;re<Je;re++){const ze=ee+ne*(re+.5)/Je,Be=ue*2+re*Math.PI*.7,at=(Math.sin(Be)*.5+.5)*.3;if(at>.1){const Ne=b.createLinearGradient(ze-8,Le,ze+8,q+de);Ne.addColorStop(0,"rgba(255, 255, 255, 0)"),Ne.addColorStop(.3,`rgba(255, 255, 255, ${at})`),Ne.addColorStop(.7,`rgba(255, 255, 255, ${at*.5})`),Ne.addColorStop(1,"rgba(255, 255, 255, 0)"),b.fillStyle=Ne,b.fillRect(ze-8,Le,16,ot)}}const It=Math.floor(Ze*8);for(let re=0;re<It;re++){const ze=re*137.5,Be=ee+10+ze*7%(ne-20),Ne=Le+10+ze*13%(ot-20)+Math.sin(ue*2+ze)*5,Tn=.4+Math.sin(ue*3+ze)*.3;if(b.fillStyle=`rgba(255, 255, 255, ${Tn})`,b.beginPath(),b.arc(Be,Ne,1.5,0,Math.PI*2),b.fill(),re>0&&re%3===0){const Wt=(re-1)*137.5,vn=ee+10+Wt*7%(ne-20),oe=Le+10+Wt*13%(ot-20)+Math.sin(ue*2+Wt)*5,me=Math.sqrt((Be-vn)**2+(Ne-oe)**2);me<30&&(b.strokeStyle=`rgba(255, 255, 255, ${.1*(1-me/30)})`,b.lineWidth=.5,b.beginPath(),b.moveTo(Be,Ne),b.lineTo(vn,oe),b.stroke())}}if(F){for(let re=0;re<8;re++){const ze=ee+ne*.15+Math.random()*ne*.7,Be=Le-Math.random()*25,at=Math.random()*4+1;b.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,b.beginPath(),b.arc(ze,Be,at,0,Math.PI*2),b.fill()}Math.sin(ue*10)>.7&&(b.fillStyle="rgba(255, 100, 0, 0.05)",b.fillRect(ee,q,ne,de))}}const it=c||X?"#ff0040":T.main,qt=X?Math.sin(ue*5)*.3+.7:1;b.strokeStyle=it,b.lineWidth=3,b.shadowColor=it,b.shadowBlur=v?20:12*qt,b.beginPath(),b.roundRect(ee,q,ne,de,Ae),b.stroke(),b.shadowBlur=0,b.strokeStyle=`${it}60`,b.lineWidth=1,b.beginPath(),b.roundRect(ee+3,q+3,ne-6,de-6,Ae-2),b.stroke();const Fe=16,Rt=3;b.strokeStyle=it,b.lineWidth=Rt,b.shadowColor=it,b.shadowBlur=8,b.beginPath(),b.moveTo(ee-2,q+Fe),b.lineTo(ee-2,q-2),b.lineTo(ee+Fe,q-2),b.stroke(),b.beginPath(),b.moveTo(ee+ne-Fe,q-2),b.lineTo(ee+ne+2,q-2),b.lineTo(ee+ne+2,q+Fe),b.stroke(),b.beginPath(),b.moveTo(ee-2,q+de-Fe),b.lineTo(ee-2,q+de+2),b.lineTo(ee+Fe,q+de+2),b.stroke(),b.beginPath(),b.moveTo(ee+ne-Fe,q+de+2),b.lineTo(ee+ne+2,q+de+2),b.lineTo(ee+ne+2,q+de-Fe),b.stroke(),b.shadowBlur=0;const vt=2+(Math.sin(ue*4)*.5+.5);if(b.fillStyle=it,b.shadowColor=it,b.shadowBlur=6,[[ee-2,q-2],[ee+ne+2,q-2],[ee-2,q+de+2],[ee+ne+2,q+de+2]].forEach(([fe,ge])=>{b.beginPath(),b.arc(fe,ge,vt,0,Math.PI*2),b.fill()}),b.shadowBlur=0,!c){const ge=ee+ne+6,De=de,tt=De*(C/100);b.fillStyle="rgba(0, 20, 40, 0.8)",b.fillRect(ge,q,4,De);const pt=b.createLinearGradient(0,q+De-tt,0,q+De);pt.addColorStop(0,T.main),pt.addColorStop(1,T.gradient[1]),b.fillStyle=pt,b.fillRect(ge,q+De-tt,4,tt),b.strokeStyle=`${it}40`,b.lineWidth=1,b.strokeRect(ge,q,4,De)}if(c){b.strokeStyle="#ff0040",b.lineWidth=2,b.beginPath();const fe=ee+ne*.3,ge=q+de*.3;b.moveTo(fe,ge),b.lineTo(fe+10,ge+15),b.lineTo(fe+5,ge+25),b.lineTo(fe+15,ge+40),b.stroke(),b.beginPath(),b.moveTo(fe+10,ge+15),b.lineTo(fe+20,ge+20),b.stroke()}y.current=requestAnimationFrame(ae)};return y.current=requestAnimationFrame(ae),()=>{cancelAnimationFrame(y.current)}},[l,d,C,F,X,c,T,v,L]);const D=()=>{h(!0),u==null||u(!0)},Y=()=>{h(!1),u==null||u(!1)};return r.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${X?"critical":""} ${c?"offline":""}`,onClick:f,onMouseEnter:D,onMouseLeave:Y,children:[r.jsxs("div",{className:"tank-header",children:[r.jsx("div",{className:`tank-name-tag ${c?"offline":""}`,style:c?void 0:{color:T.main,background:`${T.main}15`,borderColor:`${T.main}50`},children:e}),r.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),r.jsx("canvas",{ref:x,style:{width:l,height:d-50,display:"block"}}),r.jsxs("div",{className:"tank-stats",children:[r.jsx("div",{className:`tank-percent ${X?"critical":F?"warning":""}`,style:{color:c?"#FF4081":T.main,textShadow:c?"none":`0 0 10px ${T.glow}`},children:c?"OFFLINE":`${g.toFixed(1)}%`}),r.jsxs("div",{className:"tank-capacity",children:[uu(t)," / ",uu(n)]})]}),s&&o.length>0&&r.jsx("div",{className:"tank-nodes",children:o.map((K,b)=>r.jsx("span",{className:"node-tag",children:K},b))}),!s&&i&&r.jsx("div",{className:"tank-node-label",children:i}),r.jsx("style",{children:`
        .liquid-tank {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 12px;
          background: rgba(10, 25, 41, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
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

      `})]})}function E1({percent:e,usedBytes:t,totalBytes:n,duration:a=1200}){const[s,o]=m.useState(0),i=m.useRef(0),c=m.useRef(null),l=m.useRef(0);m.useEffect(()=>{l.current=s,c.current=null;const x=y=>{c.current===null&&(c.current=y);const j=y-c.current,N=Math.min(j/a,1),v=N===1?1:1-Math.pow(2,-10*N),h=l.current+(e-l.current)*v;o(h),N<1&&(i.current=requestAnimationFrame(x))};return i.current=requestAnimationFrame(x),()=>cancelAnimationFrame(i.current)},[e,a]);const p=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",f=40,u=[];for(let x=0;x<f;x++){const y=x/f*100,j=y<s,N=x%4===0;u.push({index:x,isActive:j,isMajor:N,percent:y})}return r.jsxs("div",{className:"scifi-indicator",children:[r.jsx("div",{className:"indicator-left",children:r.jsxs("div",{className:"indicator-bytes",children:[r.jsx("span",{className:"used",style:{color:p},children:Ce(t)}),r.jsx("span",{className:"separator",children:"/"}),r.jsx("span",{className:"total",children:Ce(n)})]})}),r.jsxs("div",{className:"indicator-bar-container",children:[r.jsxs("div",{className:"indicator-bar",children:[r.jsx("div",{className:"segments-container",children:u.map(x=>r.jsx("div",{className:`segment ${x.isActive?"active":""} ${x.isMajor?"major":""}`,style:{"--segment-color":x.isActive?p:"rgba(60, 80, 100, 0.3)",animationDelay:x.isActive?`${x.index*20}ms`:"0ms"}},x.index))}),r.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${p}40)`,boxShadow:`0 0 20px ${p}60, 0 0 40px ${p}30`}}),r.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${p} transparent`,filter:`drop-shadow(0 0 4px ${p})`}}),r.jsx("div",{className:"indicator-scanline"})]}),r.jsx("div",{className:"indicator-accent",style:{background:p}})]}),r.jsx("div",{className:"indicator-right",children:r.jsxs("div",{className:"indicator-percent",style:{color:p},children:[s.toFixed(1),r.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const z1=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function $1({vm:e,position:t,onClose:n}){var v,h,g,_,S;const{t:a,language:s}=Te(),o=m.useRef(null),[i,c]=m.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",p=e.type==="lxc",f=e.disks||[],u=s==="zh-TW",x=((v=e.disk)==null?void 0:v.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,y=x>=90?"#ff0040":x>=70?"#ff6b00":"#00f0ff",j=u?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();m.useEffect(()=>{if(!o.current)return;const E=o.current.getBoundingClientRect(),R=E.width,M=E.height,w=window.innerWidth,$=window.innerHeight,I=15,{cellX:W,cellY:C,cellTop:F,cellBottom:X,cellLeft:T,cellRight:L}=t;let D=0,Y=0,K=W,b=C;L+I+R<w?(D=L+I,Y=Math.max(I,Math.min($-M-I,C-M/2)),K=L,b=C):T-I-R>0?(D=T-I-R,Y=Math.max(I,Math.min($-M-I,C-M/2)),K=T,b=C):F-I-M>0?(D=Math.max(I,Math.min(w-R-I,W-R/2)),Y=F-I-M,K=W,b=F):(D=Math.max(I,Math.min(w-R-I,W-R/2)),Y=X+I,K=W,b=X);let V=D,J=Y+M/2;D>L?(V=D,J=Math.max(Y,Math.min(Y+M,b))):D+R<T?(V=D+R,J=Math.max(Y,Math.min(Y+M,b))):Y+M<F?(V=Math.max(D,Math.min(D+R,K)),J=Y+M):(V=Math.max(D,Math.min(D+R,K)),J=Y),c({x:D,y:Y,lineStart:{x:K,y:b},lineEnd:{x:V,y:J}})},[t]);const N=i?(()=>{const P=i.lineEnd.x-i.lineStart.x,E=i.lineEnd.y-i.lineStart.y,R=Math.sqrt(P*P+E*E),M=Math.atan2(E,P)*(180/Math.PI);return{width:`${R}px`,transform:`rotate(${M}deg)`,left:`${i.lineStart.x}px`,top:`${i.lineStart.y}px`}})():null;return r.jsxs(r.Fragment,{children:[i&&N&&r.jsx("div",{className:"popup-connector-line",style:N}),r.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(i==null?void 0:i.x)??-9999,top:(i==null?void 0:i.y)??-9999,opacity:i?1:0,transform:"none"},onClick:P=>P.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),r.jsx("span",{className:"vm-name",children:e.name}),r.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"popup-status",children:[r.jsx("span",{className:"status-dot",style:{background:d}}),r.jsx("span",{className:"status-text",style:{color:d},children:j}),r.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),r.jsxs("div",{className:"popup-section",children:[r.jsxs("div",{className:"section-label",children:[u?"磁碟":"DISK",f.length>1?u?"":"S":""," (",f.length||1,")"]}),f.length>0?r.jsx("div",{className:"disk-list",children:f.map((P,E)=>r.jsxs("div",{className:"disk-item",children:[r.jsxs("div",{className:"disk-device",children:[r.jsx("span",{className:"device-name",children:P.device}),r.jsx("span",{className:"device-format",children:P.format})]}),r.jsxs("div",{className:"disk-info",children:[r.jsx("span",{className:"disk-storage",children:P.storage}),r.jsx("span",{className:"disk-size",children:Ce(P.size)})]})]},E))}):r.jsx("div",{className:"disk-summary",children:r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"配置容量":"Allocated"}),r.jsx("span",{className:"disk-value",children:Ce(((h=e.disk)==null?void 0:h.total_bytes)||0)})]})}),p&&r.jsxs("div",{className:"disk-usage-section",children:[r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"已使用":"Used"}),r.jsx("span",{className:"disk-value",children:Ce(((g=e.disk)==null?void 0:g.used_bytes)||0)})]}),r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:u?"使用率":"Usage"}),r.jsxs("span",{className:"disk-value",style:{color:y},children:[x.toFixed(1),"%"]})]}),r.jsx("div",{className:"disk-bar",children:r.jsx("div",{className:"disk-bar-fill",style:{width:`${x}%`,background:y}})})]})]}),r.jsxs("div",{className:"popup-metrics",children:[r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsxs("span",{className:"metric-value",children:[((_=e.cpu)==null?void 0:_.cores)||0," ",u?"核心":"cores"]})]}),r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:u?"記憶體":"Memory"}),r.jsx("span",{className:"metric-value",children:Ce(((S=e.memory)==null?void 0:S.total_bytes)||0)})]})]})]})]})}function P1({data:e,width:t,height:n,isInitialLoad:a=!1,onVMClick:s}){const[o,i]=m.useState(null),c=m.useRef(null),l=m.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(x=>({name:x.vm.name,value:x.value,vm:x.vm}))},p=wc(d).sum(x=>x.value||0).sort((x,y)=>(y.value||0)-(x.value||0));return C1().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(lf.ratio(1))(p).leaves().map(x=>({x:x.x0,y:x.y0,width:x.x1-x.x0,height:x.y1-x.y0,vm:x.data.vm,value:x.value||0}))},[e,t,n]);return l.length===0?r.jsx("div",{className:"no-storage",children:"No VM disk data available"}):r.jsxs("svg",{ref:c,width:t,height:n,className:"d3-treemap",children:[r.jsxs("defs",{children:[r.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:r.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),r.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),r.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),r.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),l.map((d,p)=>{var M;const f=((M=d.vm.disk)==null?void 0:M.total_bytes)||1,u=d.vm.status==="running",x=o===`${d.vm.node}-${d.vm.vmid}`,y=d.width>15&&d.height>12,j=d.width>40&&d.height>25,N=d.width>50&&d.height>40,v=d.width>60&&d.height>55,h=Math.max(...l.map(w=>w.value)),g=d.value/h,_=()=>u?g>.7?"rgba(0, 255, 200, 0.15)":g>.4?"rgba(0, 200, 255, 0.12)":g>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",S=()=>u?g>.7?"rgba(0, 255, 200, 0.9)":g>.4?"rgba(0, 200, 255, 0.85)":g>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",P=()=>u?g>.7?"rgba(0, 255, 200, 0.4)":g>.4?"rgba(0, 200, 255, 0.35)":g>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",E=()=>u?g>.7?"rgba(0, 255, 220, 1)":g>.4?"rgba(100, 220, 255, 1)":g>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",R=a?p*30:0;return r.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>i(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>i(null),onClick:w=>{if(w.stopPropagation(),s){const $=w.clientX,I=w.clientY,W=d.width/2,C=d.height/2;s(d.vm,{cellX:$,cellY:I,cellWidth:d.width,cellHeight:d.height,cellTop:I-C,cellBottom:I+C,cellLeft:$-W,cellRight:$+W})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${R}ms`},children:[r.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${Ce(f)}`}),u&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:P(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:x?1:.6}}),u&&d.width>30&&d.height>25&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:S(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),r.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:_(),stroke:S(),strokeWidth:x?2:1,rx:4,ry:4,style:{filter:x?`drop-shadow(0 0 12px ${P()}) drop-shadow(0 0 4px ${S()})`:`drop-shadow(0 0 3px ${P()})`,transition:"all 0.2s ease"}}),u&&d.width>20&&d.height>15&&r.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:S(),strokeWidth:1,opacity:.6}),u&&d.width>50&&d.height>40&&r.jsxs(r.Fragment,{children:[r.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:S(),strokeWidth:1,opacity:.4,className:"circuit-line"}),r.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:S(),opacity:.8,className:"energy-dot"})]}),u&&r.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),y&&!j&&r.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 6px ${P()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),j&&(()=>{const w=d.width,$=d.height,I=Math.min(16,Math.max(9,Math.min(w/8,$/5))),W=Math.min(12,Math.max(8,Math.min(w/10,$/7))),C=Math.min(10,Math.max(7,Math.min(w/12,$/8))),F=Math.floor((w-8)/(I*.6)),X=d.vm.name.length>F?d.vm.name.slice(0,Math.max(1,F-1))+"…":d.vm.name,T=I+(N?W+2:0)+(v?C+2:0),L=($-T)/2+I/2;return r.jsxs(r.Fragment,{children:[r.jsx("text",{x:w/2,y:L,textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:I,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:u?`0 0 8px ${P()}`:"none",filter:u?`drop-shadow(0 0 2px ${P()})`:"none"},children:X}),N&&r.jsx("text",{x:w/2,y:L+I*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:u?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:W,fontFamily:"var(--font-mono)",children:Ce(f)}),v&&r.jsxs("text",{x:w/2,y:L+I*.8+(N?W*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:E(),fontSize:C,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:u?`drop-shadow(0 0 3px ${P()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function T1({vmDiskData:e,totals:t,storages:n}){const{t:a,language:s}=Te(),o=m.useRef(null),[i,c]=m.useState({width:0,height:0}),[l,d]=m.useState(!0),[p,f]=m.useState(null);m.useEffect(()=>{const x=()=>{if(o.current){const j=o.current.getBoundingClientRect();c({width:j.width,height:j.height})}};x();const y=new ResizeObserver(x);return o.current&&y.observe(o.current),()=>y.disconnect()},[]),m.useEffect(()=>{if(l&&e.length>0){const x=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(x)}},[l,e.length]);const u=m.useMemo(()=>e.map(x=>{var y;return{vm:x,value:((y=x.disk)==null?void 0:y.total_bytes)||0}}).filter(x=>x.value>0),[e]);return r.jsxs("div",{className:"treemap-container",children:[r.jsxs("div",{className:"treemap-header",children:[r.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),r.jsxs("div",{className:"treemap-stats",children:[r.jsxs("span",{children:[e.length," VMs"]}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{children:["Total Allocated: ",Ce(e.reduce((x,y)=>{var j;return x+(((j=y.disk)==null?void 0:j.total_bytes)||0)},0))]})]})]}),r.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>f(null),children:i.width>0&&i.height>0&&r.jsx(P1,{data:u,width:i.width,height:i.height,isInitialLoad:l,onVMClick:(x,y)=>f({vm:x,position:y})})}),p&&r.jsx($1,{vm:p.vm,position:p.position,onClose:()=>f(null)}),r.jsxs("div",{className:"treemap-legend",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color running"}),r.jsx("span",{children:a("vm.running")})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color stopped"}),r.jsx("span",{children:a("vm.stopped")})]}),r.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function R1({storage:e,position:t,sourcePos:n,onClose:a}){const{t:s}=Te();if(!e||!t)return null;const o=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,i=n||{x:t.x-20,y:t.y+50},c={x:t.x,y:t.y+50};return r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),r.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),r.jsx("line",{x1:i.x,y1:i.y,x2:c.x,y2:c.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),r.jsx("circle",{cx:c.x,cy:c.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),r.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[r.jsx("div",{className:"tooltip-grid"}),r.jsx("div",{className:"tooltip-scan-line"}),r.jsx("div",{className:"tooltip-corner tl"}),r.jsx("div",{className:"tooltip-corner tr"}),r.jsx("div",{className:"tooltip-corner bl"}),r.jsx("div",{className:"tooltip-corner br"}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:e.name}),r.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),r.jsx("div",{className:"tooltip-type-row",children:r.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?s("storage.filter_shared"):s("storage.filter_local")})}),r.jsxs("div",{className:"tooltip-content",children:[r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("table.type"),":"]}),r.jsx("span",{children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("storage.content"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.content.map((l,d)=>r.jsx("span",{className:"tooltip-label",children:l},d))})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("metric.used"),":"]}),r.jsx("span",{children:Ce(e.usedBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("metric.total"),":"]}),r.jsx("span",{children:Ce(e.totalBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("metric.usage"),":"]}),r.jsx("span",{className:`text-${he(o)}`,children:Xe(o,1)})]}),e.isShared&&e.connectedNodes.length>0&&r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[s("cluster.nodes"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((l,d)=>r.jsx("span",{className:"tooltip-label node",children:l},d))})]})]})]})]})}function I1({cluster:e,clusters:t}){const{t:n,language:a}=Te(),[s,o]=m.useState("tanks"),[i,c]=m.useState("all"),[l,d]=m.useState(""),[p,f]=m.useState(null),[u,x]=m.useState(null),[y,j]=m.useState(null),[N,v]=m.useState(null),h=!e&&t&&Object.keys(t).length>0,g=m.useMemo(()=>{const $=[],I=(W,C)=>{Object.values(W.vms).forEach(F=>{var X;(X=F.disk)!=null&&X.total_bytes&&F.disk.total_bytes>0&&!F.template&&$.push({...F,clusterName:C})})};return h?Object.entries(t).forEach(([W,C])=>{I(C,C.name||W)}):e&&I(e,e.name||""),$.sort((W,C)=>{var F,X;return(((F=C.disk)==null?void 0:F.total_bytes)||0)-(((X=W.disk)==null?void 0:X.total_bytes)||0)})},[e,t,h]),{sharedStorages:_,localStoragesByNode:S,allNodes:P,totals:E,warnings:R}=m.useMemo(()=>{const $=new Map;let I=0,W=0,C=0;const F=new Set,X=b=>{Object.values(b.storages).forEach(V=>{F.add(V.node);const J=V.storage;$.has(J)||$.set(J,{name:V.storage,type:V.type,content:V.content,allowedNodes:V.allowed_nodes||[],nodes:[]}),$.get(J).nodes.push({node:V.node,totalBytes:V.disk.total_bytes,usedBytes:V.disk.used_bytes,active:V.enabled!==!1})})};h?Object.values(t).forEach(b=>X(b)):e&&X(e);const T=[],L={};F.forEach(b=>{L[b]=[]}),$.forEach(b=>{const V=z1.includes(b.type),J=b.nodes[0].totalBytes,ae=b.nodes.length>1&&J>0&&b.nodes.every(le=>Math.abs(le.totalBytes-J)/J<.01);if(V||ae){const le=b.nodes[0],ue=b.allowedNodes.length>0?b.allowedNodes:b.nodes.map(Qe=>Qe.node);T.push({name:b.name,type:b.type,content:b.content,isShared:!0,totalBytes:le.totalBytes,usedBytes:le.usedBytes,connectedNodes:ue,nodeInstances:b.nodes})}else b.nodes.forEach(le=>{L[le.node]||(L[le.node]=[]),L[le.node].push({name:b.name,type:b.type,content:b.content,isShared:!1,totalBytes:le.totalBytes,usedBytes:le.usedBytes,connectedNodes:[],nodeInstances:[le]})})});const D=b=>{if(i==="local"&&b.isShared||i==="shared"&&!b.isShared)return!1;if(l){const V=l.toLowerCase();if(!b.name.toLowerCase().includes(V)&&!b.type.toLowerCase().includes(V))return!1}return!0},Y=T.filter(D).sort((b,V)=>b.name.localeCompare(V.name)),K={};return Object.entries(L).forEach(([b,V])=>{const J=V.filter(D).sort((ae,le)=>ae.name.localeCompare(le.name));J.length>0&&(K[b]=J)}),Y.forEach(b=>{(b.totalBytes>0?b.usedBytes/b.totalBytes*100:0)>=85&&C++,I+=b.usedBytes,W+=b.totalBytes}),Object.values(K).flat().forEach(b=>{(b.totalBytes>0?b.usedBytes/b.totalBytes*100:0)>=85&&C++,I+=b.usedBytes,W+=b.totalBytes}),{sharedStorages:Y,localStoragesByNode:K,allNodes:Array.from(F).sort(),totals:{totalUsed:I,totalCapacity:W},warnings:C}},[e,t,h,i,l]),M=($,I)=>{if(u&&u.name===$.name&&u.isShared===$.isShared){x(null),j(null),v(null);return}const W=I.getBoundingClientRect(),C=240,F=200,X=W.top+W.height/2;let T=W.right+30,L=!1;T+C>window.innerWidth&&(T=W.left-C-30,L=!0);let D=W.top;D+F>window.innerHeight&&(D=window.innerHeight-F-10),D<10&&(D=10),x($),j({x:T,y:D}),v({x:L?W.left:W.right,y:X})};if(!e&&!h)return r.jsx("div",{className:"storage-vault empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const w=E.totalCapacity>0?E.totalUsed/E.totalCapacity*100:0;return r.jsxs("div",{className:"storage-vault",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"vault-header",children:[r.jsxs("div",{className:"header-title-section",children:[r.jsxs("h1",{className:"vault-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),r.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),r.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),r.jsxs("div",{className:"vault-stats",children:[r.jsx("span",{className:"stat-item",children:n("storage.count",{n:_.length+Object.values(S).flat().length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:_.length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(S).flat().length})}),R>0&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{className:"stat-warning",children:["⚠️ ",R," ",n("settings.warning")]})]})]})]}),r.jsxs("div",{className:"header-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("storage.search"),value:l,onChange:$=>d($.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${i==="all"?"active":""}`,onClick:()=>c("all"),children:n("storage.filter_all")}),r.jsx("button",{className:`filter-tab ${i==="shared"?"active":""}`,onClick:()=>c("shared"),children:n("storage.filter_shared")}),r.jsx("button",{className:`filter-tab ${i==="local"?"active":""}`,onClick:()=>c("local"),children:n("storage.filter_local")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),r.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),r.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),r.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),r.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),r.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),r.jsxs("div",{className:"summary-indicator-container",children:[r.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),r.jsx(E1,{percent:w,usedBytes:E.totalUsed,totalBytes:E.totalCapacity,duration:1500})]}),r.jsx("div",{className:"vault-content",children:s==="treemap"?r.jsx(T1,{vmDiskData:g,totals:E,storages:[..._.map($=>$.name),...Object.values(S).flat().map($=>$.name)]}):r.jsxs("div",{className:"tanks-layout",children:[(i==="all"||i==="shared")&&_.length>0&&r.jsxs("div",{className:"storage-section shared-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title shared",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.section_shared")})]}),r.jsx("span",{className:"section-count shared",children:n(_.length>1?"storage.storages_plural":"storage.storages_count",{n:_.length})})]}),r.jsx("div",{className:"tanks-grid shared-grid",children:_.map(($,I)=>r.jsx("div",{onClick:W=>M($,W.currentTarget),style:{cursor:"pointer"},children:r.jsx(pu,{name:$.name,usedBytes:$.usedBytes,totalBytes:$.totalBytes,type:$.type,isShared:!0,connectedNodes:$.connectedNodes,width:140,height:220,animationDelay:I*80})},$.name))})]}),(i==="all"||i==="local")&&Object.keys(S).length>0&&r.jsxs("div",{className:"storage-section local-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title local",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.section_local")})]}),r.jsxs("span",{className:"section-count local",children:[n(Object.values(S).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(S).flat().length})," ",n(Object.keys(S).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(S).length})]})]}),r.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let $=_.length;return Object.entries(S).sort(([I],[W])=>I.localeCompare(W)).flatMap(([I,W])=>W.map(C=>{const F=C.nodeInstances[0],X=$++;return r.jsx("div",{onClick:T=>M(C,T.currentTarget),style:{cursor:"pointer"},children:r.jsx(pu,{name:C.name,usedBytes:F.usedBytes,totalBytes:F.totalBytes,type:C.type,isShared:!1,nodeName:I,isOffline:!F.active,width:120,height:200,animationDelay:X*80})},`${I}-${C.name}`)}))})()})]}),_.length===0&&Object.keys(S).length===0&&r.jsx("div",{className:"no-storage",children:l?r.jsxs("span",{children:[n("error.no_data"),': "',l,'"']}):r.jsx("span",{children:n("error.no_data")})})]})}),r.jsx(R1,{storage:u,position:y,sourcePos:N,onClose:()=>{x(null),j(null),v(null)}}),r.jsx("style",{children:`
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
          0%, 100% { transform: translateY(0); }
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
        .summary-indicator-container {
          background: rgba(8, 12, 20, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 240, 255, 0.15);
          border-radius: var(--radius-md);
          padding: var(--spacing-xs) var(--spacing-md);
          margin-bottom: var(--spacing-sm);
          position: relative;
          overflow: visible;
        }

        .summary-indicator-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.4), transparent);
        }

        .indicator-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-top: 6px;
          margin-bottom: 4px;
          text-shadow: 0 0 10px rgba(0, 240, 255, 0.6);
        }

        .scifi-indicator {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
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
            transform: scaleY(1);
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

        .storage-section {
          background: rgba(10, 25, 41, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 229, 255, 0.1);
          border-radius: 4px;
          padding: var(--spacing-md);
          position: relative;
        }

        /* Corner accents for sections - FUI style */
        .storage-section::before,
        .storage-section::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: rgba(0, 229, 255, 0.2);
          border-style: solid;
        }

        .storage-section::before {
          top: -1px;
          left: -1px;
          border-width: 1px 0 0 1px;
        }

        .storage-section::after {
          bottom: -1px;
          right: -1px;
          border-width: 0 1px 1px 0;
        }

        /* Shared section styling - Amber */
        .storage-section.shared-section {
          border-color: rgba(255, 183, 77, 0.12);
          background: rgba(20, 18, 12, 0.55);
        }

        .storage-section.shared-section::before,
        .storage-section.shared-section::after {
          border-color: rgba(255, 183, 77, 0.25);
        }

        /* Local section styling - Cyan */
        .storage-section.local-section {
          border-color: rgba(0, 229, 255, 0.1);
          background: rgba(10, 25, 41, 0.55);
        }

        .storage-section.local-section::before,
        .storage-section.local-section::after {
          border-color: rgba(0, 229, 255, 0.2);
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-md);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid rgba(0, 229, 255, 0.1);
        }

        .shared-section .section-header {
          border-bottom-color: rgba(255, 183, 77, 0.12);
        }

        .local-section .section-header {
          border-bottom-color: rgba(0, 229, 255, 0.1);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .section-title.shared {
          color: #FFB74D;
        }

        .section-title.shared .section-icon {
          stroke: #FFB74D;
          opacity: 0.8;
        }

        .section-title.local {
          color: #00E5FF;
        }

        .section-title.local .section-icon {
          stroke: #00E5FF;
          opacity: 0.8;
        }

        .section-icon {
          width: 16px;
          height: 16px;
        }

        .section-count {
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .section-count.shared {
          color: rgba(255, 183, 77, 0.6);
        }

        .section-count.local {
          color: rgba(0, 229, 255, 0.6);
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
          backdrop-filter: blur(16px);
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
            transform: scale(1) translateY(0);
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
            transform: scale(1);
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
          color: var(--danger);
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

        .view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-xs);
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
          backdrop-filter: blur(12px);
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
      `})]})}function L1({value:e,options:t,onChange:n,placeholder:a,className:s,disabled:o}){const[i,c]=m.useState(!1),[l,d]=m.useState(-1),p=m.useRef(null),f=m.useRef(null),u=m.useId(),x=t.find(j=>j.value===e);m.useEffect(()=>{if(!i)return;const j=v=>{p.current&&!p.current.contains(v.target)&&c(!1)},N=v=>{if(v.key==="Escape"){c(!1);return}if(v.key==="ArrowDown")v.preventDefault(),d(h=>Math.min(t.length-1,h<0?0:h+1));else if(v.key==="ArrowUp")v.preventDefault(),d(h=>Math.max(0,h-1));else if(v.key==="Enter"){v.preventDefault();const h=t[l];h&&!h.disabled&&(n(h.value),c(!1))}};return document.addEventListener("mousedown",j),document.addEventListener("keydown",N),()=>{document.removeEventListener("mousedown",j),document.removeEventListener("keydown",N)}},[i,l,t,n]);const y=()=>{o||(c(j=>!j),d(t.findIndex(j=>j.value===e)))};return r.jsxs("div",{ref:p,className:`cyber-select ${s||""} ${i?"open":""} ${o?"disabled":""}`,children:[r.jsx("style",{children:A1}),r.jsxs("button",{type:"button",id:u,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:y,disabled:o,children:[r.jsx("span",{className:"cyber-select-value",children:x?x.label:a||"—"}),r.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:r.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&r.jsx("div",{ref:f,className:"cyber-select-list",role:"listbox",children:t.map((j,N)=>r.jsxs("div",{role:"option","aria-selected":j.value===e,"aria-disabled":j.disabled||void 0,className:`cyber-select-opt ${j.value===e?"selected":""} ${N===l?"hover":""} ${j.disabled?"disabled":""}`,onMouseEnter:()=>d(N),onClick:()=>{j.disabled||(n(j.value),c(!1))},children:[r.jsx("div",{className:"cyber-select-opt-main",children:j.label}),j.hint&&r.jsx("div",{className:"cyber-select-opt-hint",children:j.hint}),j.value===e&&r.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:r.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},j.value))})]})}const A1=`
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
  position: absolute; left: 0; right: 0; top: calc(100% + 6px);
  z-index: 1500;
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0, 240, 255, .35);
  border-radius: 8px;
  padding: 4px;
  box-shadow:
    0 0 0 1px rgba(0, 240, 255, .08),
    0 14px 40px rgba(0, 0, 0, .6),
    0 0 50px -16px rgba(0, 240, 255, .55);
  animation: cyberSelectIn .14s ease;
  max-height: 280px; overflow-y: auto;
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
`;function O1({open:e,cluster_id:t,kind:n,title:a,body:s,label:o,onClose:i,onSaved:c}){const{t:l}=Te(),[d,p]=m.useState(""),[f,u]=m.useState(!1),[x,y]=m.useState(""),j=m.useRef(null);if(m.useEffect(()=>{e&&(p(""),y(""),u(!1),setTimeout(()=>{var v;return(v=j.current)==null?void 0:v.focus()},50))},[e]),m.useEffect(()=>{if(!e)return;const v=h=>{h.key==="Escape"&&!f&&i()};return document.addEventListener("keydown",v),()=>document.removeEventListener("keydown",v)},[e,f,i]),!e)return null;const N=async()=>{if(d){u(!0),y("");try{await Ie.setClusterSecret(t,n,d),c()}catch(v){y(v instanceof Error?v.message:String(v)),u(!1)}}};return r.jsxs("div",{onClick:()=>!f&&i(),style:F1,children:[r.jsx("style",{children:D1}),r.jsxs("div",{className:"ssm-modal",onClick:v=>v.stopPropagation(),children:[r.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",t]}),r.jsx("h3",{className:"ssm-title",children:a}),r.jsx("p",{className:"ssm-body",children:s}),r.jsx("label",{children:o}),r.jsx("input",{ref:j,type:"password",value:d,onChange:v=>p(v.target.value),onKeyDown:v=>{v.key==="Enter"&&N()},autoComplete:"new-password",spellCheck:!1}),x&&r.jsx("div",{className:"ssm-err",children:x}),r.jsxs("div",{className:"ssm-actions",children:[r.jsx("button",{className:"ghost",onClick:i,disabled:f,children:l("action.cancel")}),r.jsx("button",{className:"primary",onClick:N,disabled:f||!d,children:f?"…":l("action.save")})]})]})]})}const F1={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},D1=`
@keyframes ssmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ssmSlide { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.ssm-modal {
  width: min(440px, 100%);
  background: linear-gradient(180deg, #0d1320, #050810);
  border: 1px solid rgba(0,240,255,.35);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0,240,255,.1), 0 16px 60px rgba(0,0,0,.65), 0 0 80px -20px rgba(0,240,255,.5);
  padding: 22px 24px; animation: ssmSlide .2s ease;
  font-family: 'Rajdhani', sans-serif; color: #e6f6ff;
}
.ssm-eyebrow {
  font-family: 'Share Tech Mono', monospace; font-size: 13px;
  letter-spacing: .12em; text-transform: uppercase; color: #00f0ff; margin-bottom: 6px;
}
.ssm-title { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: .06em; margin: 0 0 10px; }
.ssm-body { color: #95a8c4; font-size: 15px; line-height: 1.5; margin: 0 0 14px; }
.ssm-modal label {
  display: block; font-family: 'Share Tech Mono', monospace;
  font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
  color: #95a8c4; margin: 0 0 6px;
}
.ssm-modal input {
  width: 100%; padding: 10px 14px;
  background: #02050b; color: #e6f6ff;
  border: 1px solid rgba(0,240,255,.16); border-radius: 6px;
  font-family: 'Share Tech Mono', monospace; font-size: 15px;
  outline: none;
}
.ssm-modal input:focus { border-color: #00f0ff; box-shadow: 0 0 0 3px rgba(0,240,255,.18); }
.ssm-err {
  margin-top: 10px; padding: 10px 12px;
  background: rgba(255,56,96,.08); border-left: 3px solid #ff3860;
  border-radius: 4px; font-size: 14px; color: #ffd0d8;
}
.ssm-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.ssm-actions button {
  padding: 9px 18px;
  font-family: 'Orbitron', sans-serif; font-weight: 600;
  font-size: 14px; letter-spacing: .08em; text-transform: uppercase;
  border-radius: 6px; cursor: pointer; border: 1px solid transparent;
}
.ssm-actions button.ghost { background: transparent; color: #95a8c4; border-color: rgba(0,240,255,.16); }
.ssm-actions button.ghost:hover { color: #e6f6ff; border-color: rgba(0,240,255,.4); }
.ssm-actions button.primary { color: #001018; background: linear-gradient(135deg, #00f0ff, #00b8d4); box-shadow: 0 0 14px rgba(0,240,255,.4); }
.ssm-actions button:disabled { opacity: .4; cursor: not-allowed; box-shadow: none; }
`;function B1({onClose:e,clusters:t}){const{t:n,language:a,setLanguage:s}=Te(),o=Ro(),[i,c]=m.useState(null),[l,d]=m.useState(!0),[p,f]=m.useState(!1),[u,x]=m.useState(null),[y,j]=m.useState(!1),[N,v]=m.useState("ui"),[h,g]=m.useState(!0),[_,S]=m.useState("cyberpunk"),[P,E]=m.useState("command-center"),[R,M]=m.useState(100),[w,$]=m.useState("all"),[I,W]=m.useState(85),[C,F]=m.useState("vmid"),[X,T]=m.useState("node"),[L,D]=m.useState("node"),[Y,K]=m.useState("asc"),[b,V]=m.useState({}),[J,ae]=m.useState(!0),[le,ue]=m.useState(80),[Qe,ee]=m.useState(95),[q,ne]=m.useState(85),[de,Ae]=m.useState(95),[Ze,ot]=m.useState(80),[Le,H]=m.useState(95),[se,ce]=m.useState(50),[pe,Ee]=m.useState(100),[rt,it]=m.useState(5),[qt,Fe]=m.useState(10),[Rt,Qt]=m.useState("0.0.0.0"),[vt,fe]=m.useState(8098),[ge,De]=m.useState(!1),[tt,pt]=m.useState(8086),[Je,It]=m.useState("disabled"),[re,ze]=m.useState(null),[Be,at]=m.useState({}),Ne=()=>{j(!0),setTimeout(()=>e(),400)};m.useEffect(()=>{Tn()},[]);const Tn=async()=>{var O,be,_e,He,Se,Re,$e,Vt,yn,nr,Rn,k,U,A,z,B,Z,Q,ie,xe,ve,we,mt,ft,We,Ct,dn,kc,jc,_c,Nc,Sc,Cc,Mc,Ec;try{d(!0);const ye=await Ie.getConfig();c(ye),g(((O=ye.ui)==null?void 0:O.animations_enabled)??!0),S(((be=ye.ui)==null?void 0:be.theme)??"cyberpunk"),E(((_e=ye.ui)==null?void 0:_e.default_view)??"command-center"),M(((He=ye.ui)==null?void 0:He.particle_count)??100),$(((Se=ye.ui)==null?void 0:Se.vm_matrix_default_filter)??"all"),W(((Re=ye.ui)==null?void 0:Re.matrix_card_width)??85),F((($e=ye.ui)==null?void 0:$e.matrix_sort_by)??"vmid"),T(((Vt=ye.ui)==null?void 0:Vt.matrix_group_by)??"node"),D(((yn=ye.ui)==null?void 0:yn.matrix_group_sort_by)??"node"),K(((nr=ye.ui)==null?void 0:nr.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((Rn=ye.ui)==null?void 0:Rn.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((k=ye.ui)==null?void 0:k.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((U=ye.ui)==null?void 0:U.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((A=ye.ui)==null?void 0:A.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((z=ye.ui)==null?void 0:z.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((B=ye.ui)==null?void 0:B.matrix_group_sort_order)??"asc");const zc={};(Z=ye.clusters)==null||Z.forEach(bn=>{zc[bn.id]={enabled:bn.enabled!==!1,poll_interval:bn.poll_interval||5,static_refresh_interval:bn.static_refresh_interval||60}}),V(zc),ae(((Q=ye.alerts)==null?void 0:Q.enabled)??!0),ue(((ie=ye.alerts)==null?void 0:ie.cpu_warning)??80),ee(((xe=ye.alerts)==null?void 0:xe.cpu_critical)??95),ne(((ve=ye.alerts)==null?void 0:ve.memory_warning)??85),Ae(((we=ye.alerts)==null?void 0:we.memory_critical)??95),ot(((mt=ye.alerts)==null?void 0:mt.disk_warning)??80),H(((ft=ye.alerts)==null?void 0:ft.disk_critical)??95),ce(((We=ye.alerts)==null?void 0:We.diskio_warning)??50),Ee(((Ct=ye.alerts)==null?void 0:Ct.diskio_critical)??100),it(((dn=ye.alerts)==null?void 0:dn.iowait_warning)??5),Fe(((kc=ye.alerts)==null?void 0:kc.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((jc=ye.alerts)==null?void 0:jc.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((_c=ye.alerts)==null?void 0:_c.iowait_critical)??10)),Qt(((Nc=ye.server)==null?void 0:Nc.host)??"0.0.0.0"),fe(((Sc=ye.server)==null?void 0:Sc.http_port)??8098),De(((Cc=ye.server)==null?void 0:Cc.influx_enabled)??!1),pt(((Mc=ye.server)==null?void 0:Mc.influx_port)??8086),It(((Ec=ye.console)==null?void 0:Ec.mode)||"disabled");const $c={};(ye.clusters||[]).forEach(bn=>{$c[bn.id]=!!(bn.auth&&bn.auth.password&&bn.auth.password.length>0)}),at($c)}catch(ye){x(String(ye))}finally{d(!1)}},Wt=async()=>{var O;try{f(!0),localStorage.setItem("matrix_card_width",String(I)),localStorage.setItem("matrix_sort_by",C),localStorage.setItem("matrix_group_by",X),localStorage.setItem("vm_matrix_default_filter",w),localStorage.setItem("matrix_group_sort_by",L),localStorage.setItem("matrix_group_sort_order",Y),localStorage.setItem("iowait_warning",String(rt)),localStorage.setItem("iowait_critical",String(qt));const be=(O=i==null?void 0:i.clusters)==null?void 0:O.map(_e=>{var He,Se,Re;return{..._e,enabled:((He=b[_e.id])==null?void 0:He.enabled)!==!1,poll_interval:((Se=b[_e.id])==null?void 0:Se.poll_interval)||_e.poll_interval,static_refresh_interval:((Re=b[_e.id])==null?void 0:Re.static_refresh_interval)||_e.static_refresh_interval}});await Ie.updateConfig({server:{host:Rt,http_port:vt,influx_enabled:ge,influx_port:tt},console:{mode:Je},ui:{default_view:P,theme:_,language:a,animations_enabled:h,particle_count:R,vm_matrix_default_filter:w,matrix_card_width:I,matrix_sort_by:C,matrix_group_by:X,matrix_group_sort_by:L,matrix_group_sort_order:Y},alerts:{enabled:J,cpu_warning:le,cpu_critical:Qe,memory_warning:q,memory_critical:de,disk_warning:Ze,disk_critical:Le,diskio_warning:se,diskio_critical:pe,iowait_warning:rt,iowait_critical:qt},clusters:be}),e()}catch(be){x(String(be))}finally{f(!1)}},vn=O=>{V(be=>{var _e;return{...be,[O]:{...be[O],enabled:!((_e=be[O])!=null&&_e.enabled)}}})},oe=(O,be,_e)=>{V(He=>({...He,[O]:{...He[O],[be]:_e}}))};m.useEffect(()=>{const O=be=>{be.key==="Escape"&&!y&&Ne()};return window.addEventListener("keydown",O),()=>window.removeEventListener("keydown",O)},[y]);const me=[{id:"ui",labelKey:"settings.tab_ui",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),r.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),r.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return r.jsxs("div",{className:`settings-overlay ${y?"exiting":""}`,onClick:O=>O.target===O.currentTarget&&!y&&Ne(),children:[r.jsxs("div",{className:`settings-panel panel ${y?"exiting":""}`,children:[r.jsx("div",{className:"settings-scanline"}),r.jsxs("div",{className:"settings-header",children:[r.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),r.jsx("button",{className:"settings-close",onClick:Ne,children:"×"})]}),r.jsx("div",{className:"settings-tabs",children:me.map(O=>r.jsxs("button",{className:`settings-tab ${N===O.id?"active":""}`,onClick:()=>v(O.id),children:[O.icon,r.jsx("span",{children:n(O.labelKey)})]},O.id))}),r.jsx("div",{className:"settings-content",children:l?r.jsxs("div",{className:"settings-loading",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("loading.data")})]}):u?r.jsx("div",{className:"settings-error",children:r.jsx("span",{children:u})}):r.jsxs(r.Fragment,{children:[N==="ui"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.default_view")}),r.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(O=>r.jsxs("label",{className:`radio-option ${P===O.id?"active":""}`,children:[r.jsx("input",{type:"radio",name:"defaultView",value:O.id,checked:P===O.id,onChange:()=>E(O.id)}),r.jsx("span",{className:"radio-label",children:n(O.labelKey)})]},O.id))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),r.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(O=>r.jsxs("label",{className:`radio-option ${w===O?"active":""}`,children:[r.jsx("input",{type:"radio",name:"vmFilter",value:O,checked:w===O,onChange:()=>$(O)}),r.jsx("span",{className:"radio-label",children:n(`settings.filter_${O}`)})]},O))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),r.jsxs("div",{className:"input-row",children:[r.jsx("input",{type:"number",className:"input-field",value:I,onChange:O=>W(Number(O.target.value)),min:60,max:200}),r.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),r.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(O=>r.jsxs("label",{className:`radio-option ${C===O?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixSortBy",value:O,checked:C===O,onChange:()=>F(O)}),r.jsx("span",{className:"radio-label",children:n(`settings.sort_${O}`)})]},O))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),r.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(O=>r.jsxs("label",{className:`radio-option ${X===O?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupBy",value:O,checked:X===O,onChange:()=>T(O)}),r.jsx("span",{className:"radio-label",children:n(`matrix.group_${O}`)})]},O))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),r.jsxs("div",{className:"settings-row",children:[r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_by")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${L==="node"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:L==="node",onChange:()=>D("node")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),r.jsxs("label",{className:`radio-option ${L==="cluster"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:L==="cluster",onChange:()=>D("cluster")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_order")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${Y==="asc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:Y==="asc",onChange:()=>K("asc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),r.jsxs("label",{className:`radio-option ${Y==="desc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:Y==="desc",onChange:()=>K("desc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),N==="clusters"&&i&&r.jsx("div",{className:"tab-content",children:r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),r.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),r.jsx("div",{className:"cluster-list-full",children:i.clusters.map(O=>{var Se,Re;const be=t==null?void 0:t[O.id],_e=(be==null?void 0:be.name)||O.name||O.id,He=b[O.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return r.jsxs("div",{className:`cluster-card ${He.enabled?"":"disabled-cluster"}`,children:[r.jsxs("div",{className:"cluster-card-header",children:[r.jsxs("label",{className:"cluster-toggle",onClick:$e=>$e.stopPropagation(),children:[r.jsx("input",{type:"checkbox",checked:He.enabled,onChange:()=>vn(O.id)}),r.jsx("span",{className:"cluster-toggle-switch"})]}),r.jsx("span",{className:`cluster-status ${He.enabled?"enabled":"disabled"}`}),r.jsx("span",{className:"cluster-name",children:_e}),r.jsxs("span",{className:"cluster-id",children:["(",O.id,")"]})]}),r.jsxs("div",{className:"cluster-card-body",children:[r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.poll_interval")}),r.jsx("input",{type:"number",className:"input-field-sm",value:He.poll_interval,onChange:$e=>oe(O.id,"poll_interval",Number($e.target.value)),min:1,max:60})]}),r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.static_refresh")}),r.jsx("input",{type:"number",className:"input-field-sm",value:He.static_refresh_interval,onChange:$e=>oe(O.id,"static_refresh_interval",Number($e.target.value)),min:30,max:600})]})]}),r.jsxs("div",{className:"cluster-card-info",children:[r.jsx("span",{children:n("settings.nodes_count",{n:((Se=O.nodes)==null?void 0:Se.length)||0})}),r.jsxs("span",{children:[n("settings.auth"),": ",((Re=O.auth)==null?void 0:Re.user)||"N/A"]})]}),r.jsxs("div",{className:"cluster-secret-row",children:[r.jsx("span",{className:"secret-label",children:n("settings.cluster_pve_password")}),r.jsx("span",{className:`secret-status ${Be[O.id]?"set":"unset"}`,children:Be[O.id]?n("settings.secret_set"):n("settings.secret_unset")}),r.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>ze(O.id),children:Be[O.id]?n("settings.secret_replace"):n("settings.secret_set_btn")}),Be[O.id]&&r.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(await o.confirm(n("settings.secret_confirm_clear",{id:O.id}),{destructive:!0}))try{await Ie.deleteClusterSecret(O.id,"pve_password"),at($e=>({...$e,[O.id]:!1}))}catch($e){await o.alert(String($e))}},children:n("settings.secret_clear")})]})]},O.id)})})]})}),N==="alerts"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:le,onChange:O=>ue(Number(O.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Qe,onChange:O=>ee(Number(O.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:q,onChange:O=>ne(Number(O.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:de,onChange:O=>Ae(Number(O.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ze,onChange:O=>ot(Number(O.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Le,onChange:O=>H(Number(O.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsx("label",{children:n("settings.warning")}),r.jsx("input",{type:"number",className:"input-field-sm",value:se,onChange:O=>ce(Number(O.target.value)),min:0,max:1e4})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsx("label",{children:n("settings.critical")}),r.jsx("input",{type:"number",className:"input-field-sm",value:pe,onChange:O=>Ee(Number(O.target.value)),min:0,max:1e4})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:rt,onChange:O=>it(Number(O.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:qt,onChange:O=>Fe(Number(O.target.value)),min:0,max:100})]})]})]})]}),N==="server"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.http_server")}),r.jsxs("div",{className:"input-group",children:[r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.host")}),r.jsx("input",{type:"text",className:"input-field",value:Rt,onChange:O=>Qt(O.target.value)})]}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.port")}),r.jsx("input",{type:"number",className:"input-field",value:vt,onChange:O=>fe(Number(O.target.value)),min:1,max:65535})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),r.jsxs("label",{className:"toggle-option",children:[r.jsx("input",{type:"checkbox",checked:ge,onChange:O=>De(O.target.checked)}),r.jsx("span",{className:"toggle-switch"}),r.jsx("span",{className:"toggle-label",children:n(ge?"settings.enabled":"settings.disabled")})]}),ge&&r.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[r.jsx("label",{children:n("settings.influx_port")}),r.jsx("input",{type:"number",className:"input-field",value:tt,onChange:O=>pt(Number(O.target.value)),min:1,max:65535})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.console_section")}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.console_mode")}),r.jsx(L1,{className:"full",value:Je,onChange:It,options:[{value:"disabled",label:n("settings.console_mode_disabled")},{value:"stored",label:n("settings.console_mode_stored")},{value:"prompt",label:n("settings.console_mode_prompt")}]})]}),r.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.console_mode_hint")})]})]}),r.jsx("div",{className:"settings-section",children:r.jsxs("div",{className:"server-note",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),r.jsxs("div",{className:"settings-footer",children:[r.jsxs("div",{className:"settings-footer-left",children:[r.jsxs("div",{className:"settings-version",children:[r.jsx("span",{className:"version-label",children:n("settings.version")}),r.jsxs("span",{className:"version-number",children:["v","0.3.0"]})]}),r.jsxs("div",{className:"settings-author",children:[r.jsx("span",{className:"author-label",children:"by"}),r.jsx("span",{className:"author-name",children:"Jason Cheng"}),r.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),r.jsxs("div",{className:"settings-actions",children:[r.jsx("button",{className:"btn",onClick:Ne,children:n("action.cancel")}),r.jsx("button",{className:"btn btn-primary",onClick:Wt,disabled:p||y,children:p?"Saving...":n("action.save")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]}),r.jsx(O1,{open:re!==null,cluster_id:re||"",kind:"pve_password",title:n("settings.secret_pw_title",{id:re||""}),body:n("settings.secret_pw_body"),label:n("settings.secret_pw_label"),onClose:()=>ze(null),onSaved:()=>{re&&at(O=>({...O,[re]:!0})),ze(null)}}),r.jsx("style",{children:`
        .settings-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          animation: overlay-enter 0.3s ease-out;
        }

        .settings-overlay.exiting {
          animation: overlay-exit 0.4s ease-in forwards;
        }

        @keyframes overlay-enter {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }

        @keyframes overlay-exit {
          to { opacity: 0; backdrop-filter: blur(0); }
        }

        .settings-panel {
          width: 600px;
          max-width: 95vw;
          max-height: 85vh;
          background: var(--bg-card);
          border: 1px solid var(--primary-dim);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          animation: panel-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 240, 255, 0.1);
        }

        .settings-panel.exiting {
          animation: panel-exit 0.4s ease-in forwards;
        }

        @keyframes panel-enter {
          0% { opacity: 0; transform: scale(0.9) translateY(30px); filter: brightness(2) blur(10px); }
          50% { filter: brightness(1.3) blur(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: brightness(1) blur(0); }
        }

        @keyframes panel-exit {
          0% { opacity: 1; transform: scale(1); filter: brightness(1); }
          30% { filter: brightness(1.5); }
          100% { opacity: 0; transform: scale(0.85) translateY(-20px); filter: brightness(2) blur(10px); }
        }

        .settings-scanline {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: scanline-sweep 2s linear infinite;
          z-index: 10;
          pointer-events: none;
          opacity: 0.6;
        }

        @keyframes scanline-sweep {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(calc(85vh)); opacity: 0; }
        }

        .settings-panel.exiting .settings-scanline {
          animation: none;
          opacity: 0;
        }

        .settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border);
        }

        .settings-title {
          font-size: 18px;
          color: var(--primary);
          letter-spacing: 0.15em;
        }

        .settings-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .settings-close:hover { color: var(--text-primary); }

        /* Tabs */
        .settings-tabs {
          display: flex;
          gap: 2px;
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--primary-dim) transparent;
          min-height: 48px;
          align-items: center;
        }

        .settings-tabs::-webkit-scrollbar {
          height: 4px;
        }

        .settings-tabs::-webkit-scrollbar-track {
          background: transparent;
        }

        .settings-tabs::-webkit-scrollbar-thumb {
          background: var(--primary-dim);
          border-radius: 2px;
        }

        .settings-tab {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
          white-space: nowrap;
        }

        .settings-tab:hover {
          color: var(--text-primary);
          background: var(--bg-hover);
        }

        .settings-tab.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.1);
          border-color: var(--primary-dim);
        }

        .settings-tab svg {
          flex-shrink: 0;
        }

        .settings-content {
          flex: 1;
          overflow: auto;
          padding: var(--spacing-lg);
        }

        .settings-content::-webkit-scrollbar {
          width: 10px;
        }

        .settings-content::-webkit-scrollbar-track {
          background: var(--bg-secondary);
          border-radius: 5px;
        }

        .settings-content::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.35);
          border-radius: 5px;
          border: 2px solid var(--bg-secondary);
        }

        .settings-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.55);
        }

        .settings-loading, .settings-error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          padding: var(--spacing-xl);
          color: var(--text-secondary);
        }

        .settings-error { color: var(--danger); }

        .tab-content {
          animation: tab-fade-in 0.2s ease-out;
        }

        @keyframes tab-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .settings-section {
          margin-bottom: var(--spacing-lg);
        }

        .settings-section:last-child { margin-bottom: 0; }

        .section-title {
          font-family: var(--font-display);
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: var(--spacing-sm);
        }

        .section-hint {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: var(--spacing-sm);
        }

        .radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);
        }

        .radio-group.inline {
          flex-wrap: nowrap;
        }

        .settings-row {
          display: flex;
          gap: var(--spacing-lg);
          flex-wrap: wrap;
        }

        .settings-row .settings-item {
          flex: 1;
          min-width: 150px;
        }

        .settings-row .settings-item label {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: var(--spacing-xs);
        }

        .radio-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .radio-option:hover { border-color: var(--primary-dim); }
        .radio-option.active { border-color: var(--primary); background: rgba(0, 240, 255, 0.1); }
        .radio-option input { display: none; }

        .radio-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        .toggle-option {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          cursor: pointer;
        }

        .toggle-option input { display: none; }

        .toggle-switch {
          position: relative;
          width: 52px;
          height: 26px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          transition: all var(--transition-fast);
          overflow: hidden;
        }

        .toggle-switch::before {
          content: 'OFF';
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          transition: all var(--transition-fast);
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 18px;
          background: linear-gradient(180deg, var(--text-secondary) 0%, rgba(100, 100, 120, 0.8) 100%);
          border-radius: 2px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .toggle-option:hover .toggle-switch {
          border-color: var(--primary-dim);
        }

        .toggle-option input:checked + .toggle-switch {
          background: rgba(0, 240, 255, 0.15);
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.1);
        }

        .toggle-option input:checked + .toggle-switch::before {
          content: 'ON';
          right: auto;
          left: 8px;
          color: var(--primary);
          text-shadow: 0 0 6px var(--primary);
        }

        .toggle-option input:checked + .toggle-switch::after {
          left: 27px;
          background: linear-gradient(180deg, var(--primary) 0%, rgba(0, 180, 200, 1) 100%);
          box-shadow: 0 0 10px var(--primary), 0 0 20px rgba(0, 240, 255, 0.5);
        }

        .toggle-label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-primary);
        }

        /* Input fields */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .input-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .input-row label {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--text-secondary);
          min-width: 100px;
        }

        .input-field {
          flex: 1;
          max-width: 200px;
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .input-field:focus { border-color: var(--primary); }

        .input-field-sm {
          width: 80px;
          padding: var(--spacing-xs) var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 14px;
          outline: none;
          text-align: center;
        }

        .input-field-sm:focus { border-color: var(--primary); }

        .input-hint {
          font-size: 13px;
          color: var(--text-muted);
          margin-left: var(--spacing-sm);
        }

        /* Cluster cards */
        .cluster-list-full {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .cluster-card {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-md);
          transition: all var(--transition-fast);
        }

        .cluster-card:hover { border-color: var(--primary-dim); }
        .cluster-card.disabled-cluster { opacity: 0.6; }

        .cluster-card-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);
        }

        .cluster-toggle {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .cluster-toggle input { display: none; }

        .cluster-toggle-switch {
          position: relative;
          width: 36px;
          height: 20px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: all var(--transition-fast);
        }

        .cluster-toggle-switch::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          background: var(--text-muted);
          border-radius: 50%;
          transition: all var(--transition-fast);
        }

        .cluster-toggle input:checked + .cluster-toggle-switch {
          background: rgba(0, 240, 255, 0.2);
          border-color: var(--primary);
        }

        .cluster-toggle input:checked + .cluster-toggle-switch::after {
          left: 18px;
          background: var(--primary);
          box-shadow: 0 0 6px var(--primary);
        }

        .cluster-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-muted);
        }

        .cluster-status.enabled {
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
        }

        .cluster-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: var(--primary);
        }

        .cluster-id {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-muted);
        }

        .cluster-card-body {
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-sm) 0;
        }

        .cluster-setting {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .cluster-setting label {
          font-size: 13px;
          color: var(--text-muted);
        }

        .cluster-card-info {
          display: flex;
          gap: var(--spacing-md);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--text-secondary);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
        }

        /* Per-cluster encrypted-secret row (PVE password). Shows status +
           Set / Replace / Clear buttons. The status pill colour mirrors the
           "configured / not set" state. */
        .cluster-secret-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          border-top: 1px solid var(--border);
          font-family: var(--font-mono);
          font-size: 13px;
          flex-wrap: wrap;
        }
        .cluster-secret-row .secret-label {
          color: var(--text-secondary);
          min-width: 110px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 12px;
        }
        .cluster-secret-row .secret-status {
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.04em;
          border: 1px solid currentColor;
        }
        .cluster-secret-row .secret-status.set {
          color: var(--success);
        }
        .cluster-secret-row .secret-status.unset {
          color: var(--text-muted);
        }
        .cluster-secret-row .secret-btn {
          margin-left: auto;
          padding: 5px 12px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .cluster-secret-row .secret-btn + .secret-btn {
          margin-left: 0;
        }
        .cluster-secret-row .secret-btn.primary {
          color: #001018;
          background: linear-gradient(135deg, var(--primary), #00b8d4);
        }
        .cluster-secret-row .secret-btn.ghost {
          background: transparent;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .cluster-secret-row .secret-btn.ghost:hover {
          color: var(--danger);
          border-color: var(--danger);
        }

        /* Threshold settings */
        .threshold-row {
          display: flex;
          gap: var(--spacing-lg);
        }

        .threshold-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--text-muted);
        }

        .threshold-item.warning { border-left-color: var(--warning); }
        .threshold-item.danger { border-left-color: var(--danger); }

        .threshold-item label {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Server note */
        .server-note {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid var(--warning-dim);
          border-radius: var(--radius-sm);
          color: var(--warning);
          font-size: 13px;
        }

        .server-note svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .settings-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          border-top: 1px solid var(--border);
        }

        .settings-footer-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .settings-version {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .version-label {
          color: var(--text-muted);
        }

        .settings-author {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 12px;
        }

        .author-label {
          color: var(--text-muted);
        }

        .author-name {
          color: var(--primary);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.4);
        }

        .author-org {
          color: var(--text-secondary);
        }

        .version-number {
          color: var(--primary-dim);
        }

        .settings-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
      `})]})}const mu=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function W1({particleCount:e=40,enabled:t=!0,isPaused:n=!1}){const a=m.useRef(null),s=m.useRef([]),o=m.useRef(),i=m.useRef({x:0,y:0}),c=m.useRef(0),l=m.useCallback((p,f)=>{s.current=Array.from({length:e},()=>({x:Math.random()*p,y:Math.random()*f,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:mu[Math.floor(Math.random()*mu.length)]}))},[e]),d=m.useCallback(p=>{const f=a.current;if(!f)return;const u=p??performance.now();if(u-c.current<32){o.current=requestAnimationFrame(d);return}c.current=u;const x=f.getContext("2d");if(!x)return;const{width:y,height:j}=f;x.clearRect(0,0,y,j),s.current.forEach(N=>{const v=N.x-i.current.x,h=N.y-i.current.y,g=Math.sqrt(v*v+h*h);if(g<100){const _=(100-g)/100;N.vx+=v/g*_*.05,N.vy+=h/g*_*.05}N.x+=N.vx,N.y+=N.vy,N.vx*=.99,N.vy*=.99,N.x<0&&(N.x=y),N.x>y&&(N.x=0),N.y<0&&(N.y=j),N.y>j&&(N.y=0),N.alpha+=(Math.random()-.5)*.02,N.alpha=Math.max(.1,Math.min(.7,N.alpha)),x.beginPath(),x.arc(N.x,N.y,N.size,0,Math.PI*2),x.fillStyle=N.color,x.globalAlpha=N.alpha,x.fill()}),x.globalAlpha=1,o.current=requestAnimationFrame(d)},[]);return m.useEffect(()=>{if(!t)return;const p=a.current;if(!p)return;const f=()=>{p.width=window.innerWidth,p.height=window.innerHeight,l(p.width,p.height)},u=x=>{i.current={x:x.clientX,y:x.clientY}};return f(),window.addEventListener("resize",f),window.addEventListener("mousemove",u),()=>{window.removeEventListener("resize",f),window.removeEventListener("mousemove",u)}},[t,l]),m.useEffect(()=>{if(!t||n){o.current&&(cancelAnimationFrame(o.current),o.current=void 0);return}return d(),()=>{o.current&&cancelAnimationFrame(o.current)}},[t,n,d]),t?r.jsx("canvas",{ref:a,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const fu={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function yi({digit:e,size:t=16,color:n="#00f0ff",dimColor:a="rgba(0, 240, 255, 0.08)",glow:s=!1}){const o=fu[e]||fu[" "],i=t,c=t*1.8,l=t*.15,d=t*.05,p=s?t*.4:t*.15,f=[`M ${d+l} ${d} L ${i-d-l} ${d} L ${i-d-l*.3} ${l*.7+d} L ${d+l*.3} ${l*.7+d} Z`,`M ${i-d} ${d+l} L ${i-d} ${c/2-d} L ${i-d-l*.7} ${c/2-d-l*.3} L ${i-d-l*.7} ${d+l+l*.3} Z`,`M ${i-d} ${c/2+d} L ${i-d} ${c-d-l} L ${i-d-l*.7} ${c-d-l-l*.3} L ${i-d-l*.7} ${c/2+d+l*.3} Z`,`M ${d+l} ${c-d} L ${i-d-l} ${c-d} L ${i-d-l*.3} ${c-l*.7-d} L ${d+l*.3} ${c-l*.7-d} Z`,`M ${d} ${c/2+d} L ${d} ${c-d-l} L ${d+l*.7} ${c-d-l-l*.3} L ${d+l*.7} ${c/2+d+l*.3} Z`,`M ${d} ${d+l} L ${d} ${c/2-d} L ${d+l*.7} ${c/2-d-l*.3} L ${d+l*.7} ${d+l+l*.3} Z`,`M ${d+l*.5} ${c/2} L ${d+l} ${c/2-l*.4} L ${i-d-l} ${c/2-l*.4} L ${i-d-l*.5} ${c/2} L ${i-d-l} ${c/2+l*.4} L ${d+l} ${c/2+l*.4} Z`];return r.jsx("svg",{width:i,height:c,style:{display:"inline-block"},children:f.map((u,x)=>r.jsx("path",{d:u,fill:o[x]?n:a,style:{filter:o[x]?`drop-shadow(0 0 ${p}px ${n})`:"none",transition:"fill 0.03s ease-out"}},x))})}function gu({size:e=16,color:t="#00f0ff",dim:n=!1}){const a=e*.4,s=e*1.8,o=e*.15,i=n?.15:1;return r.jsxs("svg",{width:a,height:s,style:{display:"inline-block"},children:[r.jsx("circle",{cx:a/2,cy:s*.3,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),r.jsx("circle",{cx:a/2,cy:s*.7,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function hu(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function V1(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function U1({timestamp:e,connected:t=!0}){const[n,a]=m.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,o]=m.useState(!1),[i,c]=m.useState(!1),l=m.useRef(!1),d=m.useRef(null),p=m.useRef(null),f=t?"#00f0ff":"#ff4444",u=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",x=n.hours==="  ",y=m.useCallback(h=>{const g=hu(h);a(g),p.current=h},[]),j=m.useCallback(h=>{d.current&&clearInterval(d.current),c(!0),o(!0);let g=0;const _=20,S=50,P={current:h};return d.current=setInterval(()=>{if(g++,g<_)a(V1());else{d.current&&(clearInterval(d.current),d.current=null);const E=hu(P.current);a(E),p.current=P.current,c(!1),o(!1)}},S),E=>{P.current=E}},[]),N=m.useRef(null);m.useEffect(()=>{if(e===null){l.current||a({hours:"  ",minutes:"  ",seconds:"  "});return}if(!l.current){l.current=!0,N.current=j(e);return}if(d.current&&N.current){N.current(e);return}p.current!==e&&y(e)},[e,j,y]),m.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const v=14;return r.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${i?"first-spin":""} ${t?"":"disconnected"}`,children:[r.jsxs("div",{className:"clock-label",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:f,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{style:{color:f},children:"LAST"})]}),r.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((h,g)=>r.jsx(yi,{digit:h||" ",size:v,color:f,dimColor:u,glow:i},`h${g}`)),r.jsx(gu,{size:v,color:f,dim:x}),(n.minutes||"  ").split("").map((h,g)=>r.jsx(yi,{digit:h||" ",size:v,color:f,dimColor:u,glow:i},`m${g}`)),r.jsx(gu,{size:v,color:f,dim:x}),(n.seconds||"  ").split("").map((h,g)=>r.jsx(yi,{digit:h||" ",size:v,color:f,dimColor:u,glow:i},`s${g}`))]})]})}function H1({clusters:e,value:t,onChange:n,disabled:a}){const[s,o]=m.useState(!1),i=m.useRef(null);m.useEffect(()=>{const d=p=>{i.current&&!i.current.contains(p.target)&&o(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),m.useEffect(()=>{const d=p=>{p.key==="Escape"&&o(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const c=d=>{n(d),o(!1)},l=()=>{var f;if(t==="__all__")return"⊕ All";const d=e[t];return d?((f=d.summary)!=null&&f.is_standalone?"◉ ":"")+(d.name||t):t};return r.jsxs("div",{ref:i,className:`cluster-selector-wrapper ${a?"disabled":""}`,children:[r.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!a&&o(!s),disabled:a,title:l(),children:[r.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"4",r:"2"}),r.jsx("circle",{cx:"12",cy:"20",r:"2"}),r.jsx("circle",{cx:"4",cy:"12",r:"2"}),r.jsx("circle",{cx:"20",cy:"12",r:"2"}),r.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),r.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),r.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),r.jsx("span",{className:"selector-label",children:l()}),r.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!a&&r.jsxs("div",{className:"cluster-dropdown",children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>c("__all__"),children:[r.jsx("span",{className:"option-icon",children:"⊕"}),r.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&r.jsx("span",{className:"option-check",children:"✓"})]}),r.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,p])=>{var j,N;const f=(j=p.summary)==null?void 0:j.is_standalone,u=p.name||d,x=((N=p.summary)==null?void 0:N.nodes_online)??0,y=Object.keys(p.vms||{}).length;return r.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>c(d),children:[r.jsx("span",{className:"option-icon",children:f?"◉":"◇"}),r.jsxs("div",{className:"option-content",children:[r.jsx("span",{className:"option-label",children:u}),r.jsxs("span",{className:"option-meta",children:[x," nodes · ",y," VMs"]})]}),t===d&&r.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
        .cluster-selector-wrapper {
          position: relative;
          z-index: 100;
        }

        .cluster-selector-button {
          appearance: none;
          background: linear-gradient(180deg, var(--bg-card) 0%, rgba(10, 10, 15, 0.9) 100%);
          border: 1px solid var(--primary-dim);
          border-radius: 0;
          padding: 8px 32px 8px 12px;
          color: var(--primary);
          font-family: var(--font-mono);
          font-size: 15px;
          cursor: pointer;
          transition: all var(--transition-fast);
          min-width: 140px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .cluster-selector-button:hover:not(:disabled) {
          border-color: var(--primary);
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.05);
        }

        .cluster-selector-button.open {
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.5), inset 0 0 30px rgba(0, 240, 255, 0.08);
        }

        .cluster-selector-button:disabled {
          cursor: not-allowed;
          color: var(--text-secondary);
          border-color: var(--border);
          opacity: 0.7;
        }

        .selector-icon {
          display: none;
          flex-shrink: 0;
        }

        .selector-label {
          flex: 1;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 70px;
        }

        .selector-arrow {
          position: absolute;
          right: 10px;
          transition: transform 0.2s ease;
        }

        .cluster-selector-button.open .selector-arrow {
          transform: rotate(180deg);
        }

        /* Responsive: collapse to icon only on narrow screens */
        @media (max-width: 1200px) {
          .cluster-selector-button {
            min-width: unset;
            padding: 8px 12px;
            justify-content: center;
          }

          .selector-icon {
            display: block;
          }

          .selector-label,
          .selector-arrow {
            display: none;
          }
        }

        .cluster-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          min-width: 220px;
          max-width: calc(100vw - 20px);
          background: linear-gradient(180deg, rgba(10, 15, 25, 0.98) 0%, rgba(5, 10, 20, 0.98) 100%);
          border: 1px solid var(--primary-dim);
          z-index: 9999;
          animation: dropdown-hologram 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        /* On small screens, align dropdown to right edge */
        @media (max-width: 600px) {
          .cluster-dropdown {
            left: auto;
            right: 0;
            min-width: 200px;
          }
        }

        /* Hologram scan line effect */
        .cluster-dropdown::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 240, 255, 0.15) 2%,
            transparent 4%
          );
          animation: dropdown-scan 1.5s linear infinite;
          pointer-events: none;
          z-index: 100;
        }

        /* Data stream effect on edges */
        .cluster-dropdown::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            linear-gradient(90deg, rgba(0, 240, 255, 0.1) 0%, transparent 5%, transparent 95%, rgba(0, 240, 255, 0.1) 100%),
            linear-gradient(180deg, rgba(0, 240, 255, 0.15) 0%, transparent 10%, transparent 90%, rgba(0, 240, 255, 0.1) 100%);
          pointer-events: none;
          z-index: 99;
          animation: dropdown-edge-pulse 2s ease-in-out infinite;
        }

        @keyframes dropdown-hologram {
          0% {
            opacity: 0;
            transform: translateY(-20px) scaleY(0.3) scaleX(0.8);
            filter: blur(10px) brightness(3);
            clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
          }
          30% {
            opacity: 0.7;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            filter: blur(4px) brightness(2);
          }
          60% {
            transform: translateY(2px) scaleY(1.02) scaleX(1);
            filter: blur(1px) brightness(1.3);
          }
          80% {
            transform: translateY(-1px) scaleY(0.99);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1) scaleX(1);
            filter: blur(0) brightness(1);
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }

        @keyframes dropdown-scan {
          0% {
            background-position: 0 -100%;
          }
          100% {
            background-position: 0 200%;
          }
        }

        @keyframes dropdown-edge-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .dropdown-header {
          padding: 10px 12px 8px;
          border-bottom: 1px solid var(--border);
        }

        .dropdown-title {
          font-family: var(--font-display);
          font-size: 15px;
          color: var(--primary-dim);
          letter-spacing: 0.15em;
        }

        .dropdown-line {
          height: 1px;
          background: linear-gradient(90deg, var(--primary-dim) 0%, transparent 100%);
          margin-top: 6px;
        }

        .dropdown-options {
          padding: 6px 0;
          max-height: 300px;
          overflow-y: auto;
        }

        .dropdown-option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 15px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          position: relative;
          animation: option-materialize 0.3s ease-out backwards;
          overflow: hidden;
        }

        .dropdown-option:nth-child(1) { animation-delay: 0.15s; }
        .dropdown-option:nth-child(2) { animation-delay: 0.2s; }
        .dropdown-option:nth-child(3) { animation-delay: 0.25s; }
        .dropdown-option:nth-child(4) { animation-delay: 0.3s; }
        .dropdown-option:nth-child(5) { animation-delay: 0.35s; }
        .dropdown-option:nth-child(6) { animation-delay: 0.4s; }
        .dropdown-option:nth-child(7) { animation-delay: 0.45s; }
        .dropdown-option:nth-child(8) { animation-delay: 0.5s; }

        @keyframes option-materialize {
          0% {
            opacity: 0;
            transform: translateX(-20px);
            filter: blur(4px);
          }
          60% {
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
          }
        }

        /* Hover scan line effect */
        .dropdown-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.2), transparent);
          transition: left 0.4s ease;
        }

        .dropdown-option:hover::before {
          left: 100%;
        }

        .dropdown-option:hover {
          background: rgba(0, 240, 255, 0.08);
          color: var(--text-primary);
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }

        .dropdown-option.selected {
          background: rgba(0, 240, 255, 0.12);
          color: var(--primary);
          box-shadow: inset 2px 0 0 var(--primary);
        }

        .option-icon {
          font-size: 14px;
          color: var(--primary-dim);
          width: 16px;
          text-align: center;
        }

        .dropdown-option.selected .option-icon {
          color: var(--primary);
        }

        .option-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .option-label {
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .option-meta {
          font-size: 15px;
          color: var(--text-muted);
          text-transform: none;
          letter-spacing: 0;
        }

        .dropdown-option:hover .option-meta {
          color: var(--text-secondary);
        }

        .option-check {
          color: var(--success);
          font-size: 14px;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 4px 12px;
        }

        /* Corner decorations */
        .dropdown-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          pointer-events: none;
        }

        .dropdown-corner.tl {
          top: -1px;
          left: -1px;
          border-top: 2px solid var(--primary);
          border-left: 2px solid var(--primary);
        }

        .dropdown-corner.tr {
          top: -1px;
          right: -1px;
          border-top: 2px solid var(--primary);
          border-right: 2px solid var(--primary);
        }

        .dropdown-corner.bl {
          bottom: -1px;
          left: -1px;
          border-bottom: 2px solid var(--primary);
          border-left: 2px solid var(--primary);
        }

        .dropdown-corner.br {
          bottom: -1px;
          right: -1px;
          border-bottom: 2px solid var(--primary);
          border-right: 2px solid var(--primary);
        }

        /* Scrollbar styling for dropdown */
        .dropdown-options::-webkit-scrollbar {
          width: 4px;
        }

        .dropdown-options::-webkit-scrollbar-track {
          background: var(--bg-tertiary);
        }

        .dropdown-options::-webkit-scrollbar-thumb {
          background: var(--primary-dim);
          border-radius: 2px;
        }

        .dropdown-options::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }

        /* Wrapper corner decorations */
        .cluster-selector-wrapper::before,
        .cluster-selector-wrapper::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          border-color: var(--primary-dim);
          pointer-events: none;
          z-index: 1;
          transition: border-color var(--transition-fast);
        }

        .cluster-selector-wrapper::before {
          top: 0;
          left: 0;
          border-top: 1px solid;
          border-left: 1px solid;
        }

        .cluster-selector-wrapper::after {
          bottom: 0;
          right: 0;
          border-bottom: 1px solid;
          border-right: 1px solid;
        }

        .cluster-selector-wrapper:hover::before,
        .cluster-selector-wrapper:hover::after {
          border-color: var(--primary);
        }

        .cluster-selector-wrapper.disabled::before,
        .cluster-selector-wrapper.disabled::after {
          border-color: var(--border);
        }
      `})]})}const xu={admin:"#ff8a3c",operator:"#00f0ff",viewer:"#95a8c4",guest:"#6b7c93"};function Y1({user:e,onLogout:t}){const{t:n}=Te(),[a,s]=m.useState(!1),o=m.useRef(null);if(m.useEffect(()=>{if(!a)return;const d=f=>{o.current&&!o.current.contains(f.target)&&s(!1)},p=f=>{f.key==="Escape"&&s(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",p),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",p)}},[a]),!e)return null;const i=e.role_global||"guest",c=xu[i]||xu.guest,l=i==="admin";return r.jsxs("div",{className:"user-badge",ref:o,style:{position:"relative"},children:[r.jsxs("button",{className:"btn btn-icon user-badge-btn",onClick:()=>s(d=>!d),title:`${e.username} · ${i}`,"aria-label":`User menu: ${e.username} (${i})`,children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[r.jsx("circle",{cx:"12",cy:"8",r:"4"}),r.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"})]}),r.jsx("span",{"aria-hidden":!0,className:"user-badge-role-dot",style:{background:c,boxShadow:`0 0 6px ${c}`}})]}),a&&r.jsxs("div",{className:"user-cluster-dropdown",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsxs("div",{className:"user-meta-line",children:[r.jsx("span",{className:"user-meta-name",children:e.username}),r.jsxs("span",{className:"user-meta-role",style:{color:c,borderColor:c},children:[r.jsx("span",{"aria-hidden":!0,style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}`,marginRight:6}}),i]})]}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("a",{href:"/account",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚙"}),r.jsx("span",{className:"option-label",children:n("user.account_password")})]}),r.jsxs("a",{href:"/totp",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⊞"}),r.jsx("span",{className:"option-label",children:n("user.totp")})]}),l&&r.jsxs("a",{href:"/audit",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"▤"}),r.jsx("span",{className:"option-label",children:n("user.audit")})]}),l&&r.jsxs("a",{href:"/sessions",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚡"}),r.jsx("span",{className:"option-label",children:n("user.sessions")})]}),r.jsx("div",{className:"dropdown-divider"}),r.jsxs("button",{className:"dropdown-option danger",onClick:t,children:[r.jsx("span",{className:"option-icon",children:"⏻"}),r.jsx("span",{className:"option-label",children:n("user.sign_out")})]})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
        .user-badge-btn {
          position: relative;
        }
        .user-badge-role-dot {
          position: absolute;
          right: 6px;
          bottom: 6px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid var(--bg-secondary, #0d1117);
          pointer-events: none;
        }

        /* ----- cluster-dropdown styling re-stated locally so this popover
           doesn't depend on the ClusterSelector component being mounted.
           Numbers + animations match its definition exactly. ----- */
        .user-cluster-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: auto;
          right: 0;
          min-width: 240px;
          max-width: calc(100vw - 20px);
          background: linear-gradient(180deg, rgba(10, 15, 25, 0.98) 0%, rgba(5, 10, 20, 0.98) 100%);
          border: 1px solid var(--primary-dim, rgba(0, 240, 255, 0.4));
          z-index: 9999;
          animation: ub-dropdown-hologram 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        .user-cluster-dropdown::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 0%, rgba(0,240,255,.15) 2%, transparent 4%);
          animation: ub-dropdown-scan 1.5s linear infinite;
          pointer-events: none; z-index: 100;
        }
        .user-cluster-dropdown::after {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(0,240,255,.1) 0%, transparent 5%, transparent 95%, rgba(0,240,255,.1) 100%),
            linear-gradient(180deg, rgba(0,240,255,.15) 0%, transparent 10%, transparent 90%, rgba(0,240,255,.1) 100%);
          pointer-events: none; z-index: 99;
          animation: ub-dropdown-edge-pulse 2s ease-in-out infinite;
        }
        @keyframes ub-dropdown-hologram {
          0%   { opacity: 0; transform: translateY(-20px) scaleY(.3) scaleX(.8);
                 filter: blur(10px) brightness(3);
                 clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%); }
          30%  { opacity: .7; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                 filter: blur(4px) brightness(2); }
          60%  { transform: translateY(2px) scaleY(1.02) scaleX(1); filter: blur(1px) brightness(1.3); }
          80%  { transform: translateY(-1px) scaleY(.99); }
          100% { opacity: 1; transform: none; filter: blur(0) brightness(1); }
        }
        @keyframes ub-dropdown-scan {
          0% { background-position: 0 -100%; } 100% { background-position: 0 200%; }
        }
        @keyframes ub-dropdown-edge-pulse {
          0%, 100% { opacity: 0.6; } 50% { opacity: 1; }
        }
        .user-cluster-dropdown .dropdown-header {
          padding: 10px 12px 8px;
          border-bottom: 1px solid var(--border, rgba(0,240,255,.16));
          position: relative; z-index: 101;
        }
        .user-cluster-dropdown .dropdown-line {
          height: 1px;
          background: linear-gradient(90deg, var(--primary-dim, rgba(0,240,255,.4)) 0%, transparent 100%);
          margin-top: 6px;
        }
        .user-cluster-dropdown .dropdown-options {
          padding: 6px 0;
          position: relative; z-index: 101;
        }
        .user-cluster-dropdown .dropdown-option {
          width: 100%;
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          background: transparent; border: none;
          color: var(--text-secondary, #95a8c4);
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px; letter-spacing: .03em;
          cursor: pointer; text-align: left;
          position: relative; overflow: hidden;
          text-decoration: none;
          transition: all 0.15s ease;
          animation: ub-option-materialize 0.3s ease-out backwards;
        }
        .user-cluster-dropdown .dropdown-option:nth-child(1) { animation-delay: 0.15s; }
        .user-cluster-dropdown .dropdown-option:nth-child(2) { animation-delay: 0.20s; }
        .user-cluster-dropdown .dropdown-option:nth-child(3) { animation-delay: 0.25s; }
        .user-cluster-dropdown .dropdown-option:nth-child(4) { animation-delay: 0.30s; }
        .user-cluster-dropdown .dropdown-option:nth-child(5) { animation-delay: 0.35s; }
        .user-cluster-dropdown .dropdown-option:nth-child(6) { animation-delay: 0.40s; }
        @keyframes ub-option-materialize {
          0%  { opacity: 0; transform: translateX(-20px); filter: blur(4px); }
          60% { filter: blur(1px); }
          100%{ opacity: 1; transform: none; filter: blur(0); }
        }
        .user-cluster-dropdown .dropdown-option::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,.2), transparent);
          transition: left .4s ease;
        }
        .user-cluster-dropdown .dropdown-option:hover::before { left: 100%; }
        .user-cluster-dropdown .dropdown-option:hover {
          background: rgba(0, 240, 255, 0.08);
          color: #e6f6ff;
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }
        .user-cluster-dropdown .dropdown-option.danger:hover {
          background: rgba(255, 56, 96, 0.10);
          color: #ff3860;
          text-shadow: 0 0 8px rgba(255, 56, 96, 0.5);
          box-shadow: inset 2px 0 0 #ff3860;
        }
        .user-cluster-dropdown .dropdown-option .option-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px;
          color: var(--primary, #00f0ff);
          font-family: 'Share Tech Mono', monospace; font-size: 14px;
        }
        .user-cluster-dropdown .dropdown-option.danger .option-icon { color: #ff3860; }
        .user-cluster-dropdown .dropdown-option .option-label {
          flex: 1; font-size: 14px;
        }
        .user-cluster-dropdown .dropdown-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,240,255,.2) 50%, transparent 100%);
          margin: 4px 0;
        }
        /* Corner decorations — same as ClusterSelector */
        .user-cluster-dropdown .dropdown-corner {
          position: absolute; width: 8px; height: 8px;
          border: 1px solid var(--primary, #00f0ff);
          z-index: 102; pointer-events: none;
        }
        .user-cluster-dropdown .dropdown-corner.tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .user-cluster-dropdown .dropdown-corner.tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .user-cluster-dropdown .dropdown-corner.bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .user-cluster-dropdown .dropdown-corner.br { bottom: -1px; right: -1px; border-left: none; border-top: none; }
        .user-meta-line {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Share Tech Mono', monospace;
        }
        .user-meta-name {
          color: #e6f6ff; font-size: 14px; letter-spacing: 0.04em;
          flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .user-meta-role {
          display: inline-flex; align-items: center;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 2px 8px; border-radius: 999px;
          border: 1px solid currentColor;
        }
        /* Destructive option (logout) — red rail on hover instead of cyan. */
        /* danger row variant — keeps logout visually distinct */
      `})]})}const nn={Command:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),r.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Settings:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),r.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),r.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[r.jsx("circle",{cx:"5",cy:"12",r:"2"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},vu=[{view:"command-center",icon:nn.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:nn.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:nn.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:nn.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:nn.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:nn.Ceph,labelKey:"nav.ceph",shortcut:"C"}],G1={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation"};function X1(){var W;const{t:e,language:t,setLanguage:n}=Te(),[a,s]=m.useState("command-center"),[o,i]=m.useState({}),[c,l]=m.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,p]=m.useState(!1),f=Rm(),[u,x]=m.useState(0),[y,j]=m.useState(!1),[N,v]=m.useState(null),[h,g]=m.useState(!1),[_,S]=m.useState(!1),{connected:P,connecting:E,send:R}=Fg({onMessage:m.useCallback(C=>{y||(i(C),x(Date.now()/1e3))},[y])});m.useEffect(()=>{const C=()=>{const F=document.visibilityState!=="hidden";document.body.setAttribute("data-app-visible",F?"true":"false");try{F?(R({type:"resume"}),R({type:"refresh"})):R({type:"pause"})}catch{}};return C(),document.addEventListener("visibilitychange",C),()=>document.removeEventListener("visibilitychange",C)},[R]);const M=m.useCallback(()=>{v(y?"resuming":"pausing"),setTimeout(()=>{j(C=>!C),setTimeout(()=>v(null),500)},300)},[y]),w=c==="__all__"?null:o[c]||null,$=m.useMemo(()=>{const C=Object.values(o);return{total_clusters:C.length,total_nodes:C.reduce((F,X)=>{var T;return F+(((T=X.summary)==null?void 0:T.node_count)||0)},0),total_nodes_online:C.reduce((F,X)=>{var T;return F+(((T=X.summary)==null?void 0:T.nodes_online)||0)},0),total_vms:C.reduce((F,X)=>{var T;return F+(((T=X.summary)==null?void 0:T.vm_count)||0)},0),total_vms_running:C.reduce((F,X)=>{var T;return F+(((T=X.summary)==null?void 0:T.vms_running)||0)},0),total_cts:C.reduce((F,X)=>{var T;return F+(((T=X.summary)==null?void 0:T.ct_count)||0)},0),total_cts_running:C.reduce((F,X)=>{var T;return F+(((T=X.summary)==null?void 0:T.cts_running)||0)},0),clusters:C.map(F=>F.summary).filter(Boolean)}},[o]);m.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",c)}catch{}},[c]),m.useEffect(()=>{Object.keys(o).length>0&&c!=="__all__"&&(o[c]||l("__all__"))},[o,c]),m.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),m.useEffect(()=>{Ie.getConfig().then(C=>{C!=null&&C.ui&&(C.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",C.ui.vm_matrix_default_filter),C.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(C.ui.matrix_card_width)),C.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",C.ui.matrix_sort_by))}).catch(()=>{})},[]),m.useEffect(()=>{if(!h)return;const C=()=>g(!1);return document.addEventListener("click",C),()=>document.removeEventListener("click",C)},[h]),m.useEffect(()=>{if(!_)return;const C=()=>S(!1);return document.addEventListener("click",C),()=>document.removeEventListener("click",C)},[_]),m.useEffect(()=>{const C=F=>{if(F.target instanceof HTMLInputElement||F.target instanceof HTMLTextAreaElement)return;const X=F.key.toLowerCase();if(X===" "||F.code==="Space"){F.preventDefault(),M();return}if(!F.ctrlKey&&!F.metaKey&&!F.altKey){const T=G1[X];if(T){F.preventDefault(),s(T);return}}(F.ctrlKey||F.metaKey)&&X==="s"&&(F.preventDefault(),p(T=>!T))};return window.addEventListener("keydown",C),()=>window.removeEventListener("keydown",C)},[M]);const I=()=>{const C=c==="__all__";switch(a){case"command-center":return r.jsx(Wd,{clusters:o,globalSummary:$,isPaused:y,onSelectCluster:F=>{l(F),s("cluster-core")}});case"cluster-core":return r.jsx(Qg,{cluster:w,clusters:C?o:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:F=>{l(F),s("holo-matrix")},isPaused:y});case"holo-matrix":return r.jsx(wh,{cluster:w,clusters:C?o:void 0});case"radar-scan":return r.jsx(jh,{cluster:w,clusters:C?o:void 0,isPaused:y});case"storage":return r.jsx(I1,{cluster:w,clusters:C?o:void 0});case"ceph-constellation":return r.jsx(Oh,{cluster:w,clusters:C?o:void 0,isPaused:y});default:return r.jsx(Wd,{clusters:o,globalSummary:$,isPaused:y,onSelectCluster:F=>{l(F),s("cluster-core")}})}};return r.jsxs("div",{className:`app-container ${y?"animations-paused":""}`,children:[r.jsx(W1,{isPaused:y}),r.jsxs("header",{className:"header-bar",children:[r.jsxs("div",{className:"header-logo",children:[r.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),r.jsx("span",{className:`status-dot ${P?"connected":E?"connecting":"disconnected"}`,title:e(P?"status.connected":E?"status.connecting":"status.disconnected")}),r.jsx(U1,{timestamp:u,connected:P})]}),r.jsxs("nav",{className:"header-center",children:[r.jsxs("div",{className:"nav-tabs",children:[vu.map(({view:C,icon:F,labelKey:X,shortcut:T},L)=>r.jsxs("button",{className:`nav-tab nav-tab-${L} ${a===C?"active":""}`,onClick:()=>s(C),title:`${e(X)} [${T}]`,children:[r.jsx(F,{}),r.jsx("span",{children:e(X)}),r.jsx("span",{className:"nav-shortcut",children:T})]},C)),r.jsxs("div",{className:"nav-more-wrapper",children:[r.jsx("button",{className:"nav-tab nav-more-btn",onClick:C=>{C.stopPropagation(),S(!_)},title:e("nav.more"),children:r.jsx(nn.MoreHorizontal,{})}),_&&r.jsx("div",{className:"nav-more-dropdown",onClick:C=>C.stopPropagation(),children:vu.map(({view:C,icon:F,labelKey:X,shortcut:T},L)=>r.jsxs("button",{className:`nav-more-option nav-more-option-${L} ${a===C?"active":""}`,onClick:()=>{s(C),S(!1)},children:[r.jsx(F,{}),r.jsx("span",{children:e(X)}),r.jsx("span",{className:"nav-shortcut",children:T})]},C))})]})]}),Object.keys(o).length>0&&r.jsx(H1,{clusters:o,value:c,onChange:l,disabled:a==="command-center"})]}),r.jsxs("div",{className:"header-right",children:[r.jsxs("button",{className:`btn btn-icon pause-btn ${y?"paused":""} ${N||""}`,onClick:M,title:`${e(y?"status.paused":"status.live")} [Space]`,children:[r.jsx("div",{className:"pause-btn-inner",children:y?r.jsx(nn.Play,{}):r.jsx(nn.Pause,{})}),r.jsx("div",{className:"pause-fx"})]}),r.jsxs("div",{className:"lang-menu-wrapper",children:[r.jsx("button",{className:"btn btn-icon",onClick:C=>{C.stopPropagation(),g(!h)},title:e("settings.language"),children:r.jsx(nn.Language,{})}),h&&r.jsxs("div",{className:"lang-dropdown",onClick:C=>C.stopPropagation(),children:[r.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),g(!1)},children:[r.jsx("span",{className:"lang-flag",children:"EN"}),r.jsx("span",{children:"English"})]}),r.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),g(!1)},children:[r.jsx("span",{className:"lang-flag",children:"繁"}),r.jsx("span",{children:"繁體中文"})]})]})]}),r.jsx(Y1,{user:f.user,onLogout:f.logout}),(!f.authEnforced||((W=f.user)==null?void 0:W.role_global)==="admin")&&r.jsx("button",{className:"btn btn-icon",onClick:()=>p(!0),title:e("settings.title"),children:r.jsx(nn.Settings,{})})]})]}),r.jsx("main",{className:"main-content",children:r.jsx("div",{className:"view-container",children:I()},a)}),d&&r.jsx(B1,{onClose:()=>p(!1),clusters:o}),N&&r.jsxs("div",{className:`pause-overlay ${N}`,children:[r.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((C,F)=>r.jsx("div",{className:"glitch-line",style:{animationDelay:`${F*.05}s`}},F))}),r.jsx("div",{className:"pause-status-text",children:N==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),r.jsx("div",{className:"pause-scan-ring"})]})]})}function K1(){return r.jsx(Ig,{children:r.jsx(Lg,{children:r.jsx(X1,{})})})}bi.createRoot(document.getElementById("root")).render(r.jsx(vo.StrictMode,{children:r.jsx(K1,{})}));
