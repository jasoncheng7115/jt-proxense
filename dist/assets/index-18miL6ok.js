(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function Uf(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Yu={exports:{}},Vo={},Gu={exports:{}},Ie={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vs=Symbol.for("react.element"),Vf=Symbol.for("react.portal"),Hf=Symbol.for("react.fragment"),Yf=Symbol.for("react.strict_mode"),Gf=Symbol.for("react.profiler"),Xf=Symbol.for("react.provider"),Kf=Symbol.for("react.context"),qf=Symbol.for("react.forward_ref"),Qf=Symbol.for("react.suspense"),Jf=Symbol.for("react.memo"),Zf=Symbol.for("react.lazy"),td=Symbol.iterator;function e0(e){return e===null||typeof e!="object"?null:(e=td&&e[td]||e["@@iterator"],typeof e=="function"?e:null)}var Xu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ku=Object.assign,qu={};function ya(e,t,n){this.props=e,this.context=t,this.refs=qu,this.updater=n||Xu}ya.prototype.isReactComponent={};ya.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ya.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Qu(){}Qu.prototype=ya.prototype;function Ql(e,t,n){this.props=e,this.context=t,this.refs=qu,this.updater=n||Xu}var Jl=Ql.prototype=new Qu;Jl.constructor=Ql;Ku(Jl,ya.prototype);Jl.isPureReactComponent=!0;var rd=Array.isArray,Ju=Object.prototype.hasOwnProperty,Zl={current:null},Zu={key:!0,ref:!0,__self:!0,__source:!0};function ep(e,t,n){var a,s={},o=null,i=null;if(t!=null)for(a in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)Ju.call(t,a)&&!Zu.hasOwnProperty(a)&&(s[a]=t[a]);var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){for(var l=Array(c),d=0;d<c;d++)l[d]=arguments[d+2];s.children=l}if(e&&e.defaultProps)for(a in c=e.defaultProps,c)s[a]===void 0&&(s[a]=c[a]);return{$$typeof:vs,type:e,key:o,ref:i,props:s,_owner:Zl.current}}function t0(e,t){return{$$typeof:vs,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ec(e){return typeof e=="object"&&e!==null&&e.$$typeof===vs}function r0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var nd=/\/+/g;function ui(e,t){return typeof e=="object"&&e!==null&&e.key!=null?r0(""+e.key):t.toString(36)}function qs(e,t,n,a,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case vs:case Vf:i=!0}}if(i)return i=e,s=s(i),e=a===""?"."+ui(i,0):a,rd(s)?(n="",e!=null&&(n=e.replace(nd,"$&/")+"/"),qs(s,t,n,"",function(d){return d})):s!=null&&(ec(s)&&(s=t0(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(nd,"$&/")+"/")+e)),t.push(s)),1;if(i=0,a=a===""?".":a+":",rd(e))for(var c=0;c<e.length;c++){o=e[c];var l=a+ui(o,c);i+=qs(o,t,n,l,s)}else if(l=e0(e),typeof l=="function")for(e=l.call(e),c=0;!(o=e.next()).done;)o=o.value,l=a+ui(o,c++),i+=qs(o,t,n,l,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Ss(e,t,n){if(e==null)return e;var a=[],s=0;return qs(e,a,"","",function(o){return t.call(n,o,s++)}),a}function n0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ft={current:null},Qs={transition:null},a0={ReactCurrentDispatcher:Ft,ReactCurrentBatchConfig:Qs,ReactCurrentOwner:Zl};function tp(){throw Error("act(...) is not supported in production builds of React.")}Ie.Children={map:Ss,forEach:function(e,t,n){Ss(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ss(e,function(){t++}),t},toArray:function(e){return Ss(e,function(t){return t})||[]},only:function(e){if(!ec(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ie.Component=ya;Ie.Fragment=Hf;Ie.Profiler=Gf;Ie.PureComponent=Ql;Ie.StrictMode=Yf;Ie.Suspense=Qf;Ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=a0;Ie.act=tp;Ie.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=Ku({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=Zl.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in t)Ju.call(t,l)&&!Zu.hasOwnProperty(l)&&(a[l]=t[l]===void 0&&c!==void 0?c[l]:t[l])}var l=arguments.length-2;if(l===1)a.children=n;else if(1<l){c=Array(l);for(var d=0;d<l;d++)c[d]=arguments[d+2];a.children=c}return{$$typeof:vs,type:e.type,key:s,ref:o,props:a,_owner:i}};Ie.createContext=function(e){return e={$$typeof:Kf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Xf,_context:e},e.Consumer=e};Ie.createElement=ep;Ie.createFactory=function(e){var t=ep.bind(null,e);return t.type=e,t};Ie.createRef=function(){return{current:null}};Ie.forwardRef=function(e){return{$$typeof:qf,render:e}};Ie.isValidElement=ec;Ie.lazy=function(e){return{$$typeof:Zf,_payload:{_status:-1,_result:e},_init:n0}};Ie.memo=function(e,t){return{$$typeof:Jf,type:e,compare:t===void 0?null:t}};Ie.startTransition=function(e){var t=Qs.transition;Qs.transition={};try{e()}finally{Qs.transition=t}};Ie.unstable_act=tp;Ie.useCallback=function(e,t){return Ft.current.useCallback(e,t)};Ie.useContext=function(e){return Ft.current.useContext(e)};Ie.useDebugValue=function(){};Ie.useDeferredValue=function(e){return Ft.current.useDeferredValue(e)};Ie.useEffect=function(e,t){return Ft.current.useEffect(e,t)};Ie.useId=function(){return Ft.current.useId()};Ie.useImperativeHandle=function(e,t,n){return Ft.current.useImperativeHandle(e,t,n)};Ie.useInsertionEffect=function(e,t){return Ft.current.useInsertionEffect(e,t)};Ie.useLayoutEffect=function(e,t){return Ft.current.useLayoutEffect(e,t)};Ie.useMemo=function(e,t){return Ft.current.useMemo(e,t)};Ie.useReducer=function(e,t,n){return Ft.current.useReducer(e,t,n)};Ie.useRef=function(e){return Ft.current.useRef(e)};Ie.useState=function(e){return Ft.current.useState(e)};Ie.useSyncExternalStore=function(e,t,n){return Ft.current.useSyncExternalStore(e,t,n)};Ie.useTransition=function(){return Ft.current.useTransition()};Ie.version="18.3.1";Gu.exports=Ie;var u=Gu.exports;const Ho=Uf(u);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s0=u,o0=Symbol.for("react.element"),i0=Symbol.for("react.fragment"),l0=Object.prototype.hasOwnProperty,c0=s0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d0={key:!0,ref:!0,__self:!0,__source:!0};function rp(e,t,n){var a,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(a in t)l0.call(t,a)&&!d0.hasOwnProperty(a)&&(s[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)s[a]===void 0&&(s[a]=t[a]);return{$$typeof:o0,type:e,key:o,ref:i,props:s,_owner:c0.current}}Vo.Fragment=i0;Vo.jsx=rp;Vo.jsxs=rp;Yu.exports=Vo;var r=Yu.exports,Ki={},np={exports:{}},nr={},ap={exports:{}},sp={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(V,B){var K=V.length;V.push(B);e:for(;0<K;){var Q=K-1>>>1,S=V[Q];if(0<s(S,B))V[Q]=B,V[K]=S,K=Q;else break e}}function n(V){return V.length===0?null:V[0]}function a(V){if(V.length===0)return null;var B=V[0],K=V.pop();if(K!==B){V[0]=K;e:for(var Q=0,S=V.length,Se=S>>>1;Q<Se;){var te=2*(Q+1)-1,Me=V[te],X=te+1,me=V[X];if(0>s(Me,K))X<S&&0>s(me,Me)?(V[Q]=me,V[X]=K,Q=X):(V[Q]=Me,V[te]=K,Q=te);else if(X<S&&0>s(me,K))V[Q]=me,V[X]=K,Q=X;else break e}}return B}function s(V,B){var K=V.sortIndex-B.sortIndex;return K!==0?K:V.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,c=i.now();e.unstable_now=function(){return i.now()-c}}var l=[],d=[],m=1,g=null,p=3,x=!1,b=!1,k=!1,j=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(V){for(var B=n(d);B!==null;){if(B.callback===null)a(d);else if(B.startTime<=V)a(d),B.sortIndex=B.expirationTime,t(l,B);else break;B=n(d)}}function N(V){if(k=!1,v(V),!b)if(n(l)!==null)b=!0,G(w);else{var B=n(d);B!==null&&L(N,B.startTime-V)}}function w(V,B){b=!1,k&&(k=!1,f($),$=-1),x=!0;var K=p;try{for(v(B),g=n(l);g!==null&&(!(g.expirationTime>B)||V&&!I());){var Q=g.callback;if(typeof Q=="function"){g.callback=null,p=g.priorityLevel;var S=Q(g.expirationTime<=B);B=e.unstable_now(),typeof S=="function"?g.callback=S:g===n(l)&&a(l),v(B)}else a(l);g=n(l)}if(g!==null)var Se=!0;else{var te=n(d);te!==null&&L(N,te.startTime-B),Se=!1}return Se}finally{g=null,p=K,x=!1}}var _=!1,z=null,$=-1,P=5,D=-1;function I(){return!(e.unstable_now()-D<P)}function A(){if(z!==null){var V=e.unstable_now();D=V;var B=!0;try{B=z(!0,V)}finally{B?re():(_=!1,z=null)}}else _=!1}var re;if(typeof h=="function")re=function(){h(A)};else if(typeof MessageChannel<"u"){var U=new MessageChannel,R=U.port2;U.port1.onmessage=A,re=function(){R.postMessage(null)}}else re=function(){j(A,0)};function G(V){z=V,_||(_=!0,re())}function L(V,B){$=j(function(){V(e.unstable_now())},B)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(V){V.callback=null},e.unstable_continueExecution=function(){b||x||(b=!0,G(w))},e.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<V?Math.floor(1e3/V):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(V){switch(p){case 1:case 2:case 3:var B=3;break;default:B=p}var K=p;p=B;try{return V()}finally{p=K}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(V,B){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var K=p;p=V;try{return B()}finally{p=K}},e.unstable_scheduleCallback=function(V,B,K){var Q=e.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?Q+K:Q):K=Q,V){case 1:var S=-1;break;case 2:S=250;break;case 5:S=1073741823;break;case 4:S=1e4;break;default:S=5e3}return S=K+S,V={id:m++,callback:B,priorityLevel:V,startTime:K,expirationTime:S,sortIndex:-1},K>Q?(V.sortIndex=K,t(d,V),n(l)===null&&V===n(d)&&(k?(f($),$=-1):k=!0,L(N,K-Q))):(V.sortIndex=S,t(l,V),b||x||(b=!0,G(w))),V},e.unstable_shouldYield=I,e.unstable_wrapCallback=function(V){var B=p;return function(){var K=p;p=B;try{return V.apply(this,arguments)}finally{p=K}}}})(sp);ap.exports=sp;var u0=ap.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p0=u,rr=u0;function ee(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var op=new Set,Qa={};function Fn(e,t){ua(e,t),ua(e+"Capture",t)}function ua(e,t){for(Qa[e]=t,e=0;e<t.length;e++)op.add(t[e])}var Br=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),qi=Object.prototype.hasOwnProperty,m0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ad={},sd={};function f0(e){return qi.call(sd,e)?!0:qi.call(ad,e)?!1:m0.test(e)?sd[e]=!0:(ad[e]=!0,!1)}function h0(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function g0(e,t,n,a){if(t===null||typeof t>"u"||h0(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Dt(e,t,n,a,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$t[e]=new Dt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$t[t]=new Dt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){$t[e]=new Dt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$t[e]=new Dt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$t[e]=new Dt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){$t[e]=new Dt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){$t[e]=new Dt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){$t[e]=new Dt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){$t[e]=new Dt(e,5,!1,e.toLowerCase(),null,!1,!1)});var tc=/[\-:]([a-z])/g;function rc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(tc,rc);$t[t]=new Dt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(tc,rc);$t[t]=new Dt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(tc,rc);$t[t]=new Dt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){$t[e]=new Dt(e,1,!1,e.toLowerCase(),null,!1,!1)});$t.xlinkHref=new Dt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){$t[e]=new Dt(e,1,!1,e.toLowerCase(),null,!0,!0)});function nc(e,t,n,a){var s=$t.hasOwnProperty(t)?$t[t]:null;(s!==null?s.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(g0(t,n,s,a)&&(n=null),a||s===null?f0(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,a=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var Yr=p0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Cs=Symbol.for("react.element"),Yn=Symbol.for("react.portal"),Gn=Symbol.for("react.fragment"),ac=Symbol.for("react.strict_mode"),Qi=Symbol.for("react.profiler"),ip=Symbol.for("react.provider"),lp=Symbol.for("react.context"),sc=Symbol.for("react.forward_ref"),Ji=Symbol.for("react.suspense"),Zi=Symbol.for("react.suspense_list"),oc=Symbol.for("react.memo"),Jr=Symbol.for("react.lazy"),cp=Symbol.for("react.offscreen"),od=Symbol.iterator;function ja(e){return e===null||typeof e!="object"?null:(e=od&&e[od]||e["@@iterator"],typeof e=="function"?e:null)}var ut=Object.assign,pi;function Ra(e){if(pi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);pi=t&&t[1]||""}return`
`+pi+e}var mi=!1;function fi(e,t){if(!e||mi)return"";mi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var a=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){a=d}e.call(t.prototype)}else{try{throw Error()}catch(d){a=d}e()}}catch(d){if(d&&a&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=a.stack.split(`
`),i=s.length-1,c=o.length-1;1<=i&&0<=c&&s[i]!==o[c];)c--;for(;1<=i&&0<=c;i--,c--)if(s[i]!==o[c]){if(i!==1||c!==1)do if(i--,c--,0>c||s[i]!==o[c]){var l=`
`+s[i].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=i&&0<=c);break}}}finally{mi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ra(e):""}function x0(e){switch(e.tag){case 5:return Ra(e.type);case 16:return Ra("Lazy");case 13:return Ra("Suspense");case 19:return Ra("SuspenseList");case 0:case 2:case 15:return e=fi(e.type,!1),e;case 11:return e=fi(e.type.render,!1),e;case 1:return e=fi(e.type,!0),e;default:return""}}function el(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Gn:return"Fragment";case Yn:return"Portal";case Qi:return"Profiler";case ac:return"StrictMode";case Ji:return"Suspense";case Zi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case lp:return(e.displayName||"Context")+".Consumer";case ip:return(e._context.displayName||"Context")+".Provider";case sc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case oc:return t=e.displayName||null,t!==null?t:el(e.type)||"Memo";case Jr:t=e._payload,e=e._init;try{return el(e(t))}catch{}}return null}function v0(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return el(t);case 8:return t===ac?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function fn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function dp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function b0(e){var t=dp(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){a=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(i){a=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ms(e){e._valueTracker||(e._valueTracker=b0(e))}function up(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=dp(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function po(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function tl(e,t){var n=t.checked;return ut({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function id(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=fn(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function pp(e,t){t=t.checked,t!=null&&nc(e,"checked",t,!1)}function rl(e,t){pp(e,t);var n=fn(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?nl(e,t.type,n):t.hasOwnProperty("defaultValue")&&nl(e,t.type,fn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ld(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function nl(e,t,n){(t!=="number"||po(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Ia=Array.isArray;function aa(e,t,n,a){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&a&&(e[n].defaultSelected=!0)}else{for(n=""+fn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,a&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function al(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(ee(91));return ut({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function cd(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(ee(92));if(Ia(n)){if(1<n.length)throw Error(ee(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:fn(n)}}function mp(e,t){var n=fn(t.value),a=fn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function dd(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function fp(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function sl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?fp(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var zs,hp=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(zs=zs||document.createElement("div"),zs.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=zs.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ja(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Wa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},y0=["Webkit","ms","Moz","O"];Object.keys(Wa).forEach(function(e){y0.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Wa[t]=Wa[e]})});function gp(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Wa.hasOwnProperty(e)&&Wa[e]?(""+t).trim():t+"px"}function xp(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,s=gp(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,s):e[n]=s}}var w0=ut({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ol(e,t){if(t){if(w0[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(ee(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(ee(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(ee(61))}if(t.style!=null&&typeof t.style!="object")throw Error(ee(62))}}function il(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ll=null;function ic(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cl=null,sa=null,oa=null;function ud(e){if(e=ws(e)){if(typeof cl!="function")throw Error(ee(280));var t=e.stateNode;t&&(t=qo(t),cl(e.stateNode,e.type,t))}}function vp(e){sa?oa?oa.push(e):oa=[e]:sa=e}function bp(){if(sa){var e=sa,t=oa;if(oa=sa=null,ud(e),t)for(e=0;e<t.length;e++)ud(t[e])}}function yp(e,t){return e(t)}function wp(){}var hi=!1;function kp(e,t,n){if(hi)return e(t,n);hi=!0;try{return yp(e,t,n)}finally{hi=!1,(sa!==null||oa!==null)&&(wp(),bp())}}function Za(e,t){var n=e.stateNode;if(n===null)return null;var a=qo(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(ee(231,t,typeof n));return n}var dl=!1;if(Br)try{var Na={};Object.defineProperty(Na,"passive",{get:function(){dl=!0}}),window.addEventListener("test",Na,Na),window.removeEventListener("test",Na,Na)}catch{dl=!1}function k0(e,t,n,a,s,o,i,c,l){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(m){this.onError(m)}}var Ua=!1,mo=null,fo=!1,ul=null,j0={onError:function(e){Ua=!0,mo=e}};function N0(e,t,n,a,s,o,i,c,l){Ua=!1,mo=null,k0.apply(j0,arguments)}function _0(e,t,n,a,s,o,i,c,l){if(N0.apply(this,arguments),Ua){if(Ua){var d=mo;Ua=!1,mo=null}else throw Error(ee(198));fo||(fo=!0,ul=d)}}function Dn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function jp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function pd(e){if(Dn(e)!==e)throw Error(ee(188))}function S0(e){var t=e.alternate;if(!t){if(t=Dn(e),t===null)throw Error(ee(188));return t!==e?null:e}for(var n=e,a=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(a=s.return,a!==null){n=a;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return pd(s),e;if(o===a)return pd(s),t;o=o.sibling}throw Error(ee(188))}if(n.return!==a.return)n=s,a=o;else{for(var i=!1,c=s.child;c;){if(c===n){i=!0,n=s,a=o;break}if(c===a){i=!0,a=s,n=o;break}c=c.sibling}if(!i){for(c=o.child;c;){if(c===n){i=!0,n=o,a=s;break}if(c===a){i=!0,a=o,n=s;break}c=c.sibling}if(!i)throw Error(ee(189))}}if(n.alternate!==a)throw Error(ee(190))}if(n.tag!==3)throw Error(ee(188));return n.stateNode.current===n?e:t}function Np(e){return e=S0(e),e!==null?_p(e):null}function _p(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=_p(e);if(t!==null)return t;e=e.sibling}return null}var Sp=rr.unstable_scheduleCallback,md=rr.unstable_cancelCallback,C0=rr.unstable_shouldYield,M0=rr.unstable_requestPaint,xt=rr.unstable_now,z0=rr.unstable_getCurrentPriorityLevel,lc=rr.unstable_ImmediatePriority,Cp=rr.unstable_UserBlockingPriority,ho=rr.unstable_NormalPriority,$0=rr.unstable_LowPriority,Mp=rr.unstable_IdlePriority,Yo=null,Mr=null;function E0(e){if(Mr&&typeof Mr.onCommitFiberRoot=="function")try{Mr.onCommitFiberRoot(Yo,e,void 0,(e.current.flags&128)===128)}catch{}}var gr=Math.clz32?Math.clz32:R0,T0=Math.log,P0=Math.LN2;function R0(e){return e>>>=0,e===0?32:31-(T0(e)/P0|0)|0}var $s=64,Es=4194304;function La(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function go(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,s=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var c=i&~s;c!==0?a=La(c):(o&=i,o!==0&&(a=La(o)))}else i=n&~s,i!==0?a=La(i):o!==0&&(a=La(o));if(a===0)return 0;if(t!==0&&t!==a&&!(t&s)&&(s=a&-a,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-gr(t),s=1<<n,a|=e[n],t&=~s;return a}function I0(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function L0(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-gr(o),c=1<<i,l=s[i];l===-1?(!(c&n)||c&a)&&(s[i]=I0(c,t)):l<=t&&(e.expiredLanes|=c),o&=~c}}function pl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function zp(){var e=$s;return $s<<=1,!($s&4194240)&&($s=64),e}function gi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function bs(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-gr(t),e[t]=n}function A0(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-gr(n),o=1<<s;t[s]=0,a[s]=-1,e[s]=-1,n&=~o}}function cc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-gr(n),s=1<<a;s&t|e[a]&t&&(e[a]|=t),n&=~s}}var Ye=0;function $p(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ep,dc,Tp,Pp,Rp,ml=!1,Ts=[],sn=null,on=null,ln=null,es=new Map,ts=new Map,tn=[],O0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function fd(e,t){switch(e){case"focusin":case"focusout":sn=null;break;case"dragenter":case"dragleave":on=null;break;case"mouseover":case"mouseout":ln=null;break;case"pointerover":case"pointerout":es.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ts.delete(t.pointerId)}}function _a(e,t,n,a,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[s]},t!==null&&(t=ws(t),t!==null&&dc(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function F0(e,t,n,a,s){switch(t){case"focusin":return sn=_a(sn,e,t,n,a,s),!0;case"dragenter":return on=_a(on,e,t,n,a,s),!0;case"mouseover":return ln=_a(ln,e,t,n,a,s),!0;case"pointerover":var o=s.pointerId;return es.set(o,_a(es.get(o)||null,e,t,n,a,s)),!0;case"gotpointercapture":return o=s.pointerId,ts.set(o,_a(ts.get(o)||null,e,t,n,a,s)),!0}return!1}function Ip(e){var t=Sn(e.target);if(t!==null){var n=Dn(t);if(n!==null){if(t=n.tag,t===13){if(t=jp(n),t!==null){e.blockedOn=t,Rp(e.priority,function(){Tp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Js(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=fl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);ll=a,n.target.dispatchEvent(a),ll=null}else return t=ws(n),t!==null&&dc(t),e.blockedOn=n,!1;t.shift()}return!0}function hd(e,t,n){Js(e)&&n.delete(t)}function D0(){ml=!1,sn!==null&&Js(sn)&&(sn=null),on!==null&&Js(on)&&(on=null),ln!==null&&Js(ln)&&(ln=null),es.forEach(hd),ts.forEach(hd)}function Sa(e,t){e.blockedOn===t&&(e.blockedOn=null,ml||(ml=!0,rr.unstable_scheduleCallback(rr.unstable_NormalPriority,D0)))}function rs(e){function t(s){return Sa(s,e)}if(0<Ts.length){Sa(Ts[0],e);for(var n=1;n<Ts.length;n++){var a=Ts[n];a.blockedOn===e&&(a.blockedOn=null)}}for(sn!==null&&Sa(sn,e),on!==null&&Sa(on,e),ln!==null&&Sa(ln,e),es.forEach(t),ts.forEach(t),n=0;n<tn.length;n++)a=tn[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<tn.length&&(n=tn[0],n.blockedOn===null);)Ip(n),n.blockedOn===null&&tn.shift()}var ia=Yr.ReactCurrentBatchConfig,xo=!0;function B0(e,t,n,a){var s=Ye,o=ia.transition;ia.transition=null;try{Ye=1,uc(e,t,n,a)}finally{Ye=s,ia.transition=o}}function W0(e,t,n,a){var s=Ye,o=ia.transition;ia.transition=null;try{Ye=4,uc(e,t,n,a)}finally{Ye=s,ia.transition=o}}function uc(e,t,n,a){if(xo){var s=fl(e,t,n,a);if(s===null)Si(e,t,a,vo,n),fd(e,a);else if(F0(s,e,t,n,a))a.stopPropagation();else if(fd(e,a),t&4&&-1<O0.indexOf(e)){for(;s!==null;){var o=ws(s);if(o!==null&&Ep(o),o=fl(e,t,n,a),o===null&&Si(e,t,a,vo,n),o===s)break;s=o}s!==null&&a.stopPropagation()}else Si(e,t,a,null,n)}}var vo=null;function fl(e,t,n,a){if(vo=null,e=ic(a),e=Sn(e),e!==null)if(t=Dn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=jp(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return vo=e,null}function Lp(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(z0()){case lc:return 1;case Cp:return 4;case ho:case $0:return 16;case Mp:return 536870912;default:return 16}default:return 16}}var nn=null,pc=null,Zs=null;function Ap(){if(Zs)return Zs;var e,t=pc,n=t.length,a,s="value"in nn?nn.value:nn.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(a=1;a<=i&&t[n-a]===s[o-a];a++);return Zs=s.slice(e,1<a?1-a:void 0)}function eo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ps(){return!0}function gd(){return!1}function ar(e){function t(n,a,s,o,i){this._reactName=n,this._targetInst=s,this.type=a,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(n=e[c],this[c]=n?n(o):o[c]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Ps:gd,this.isPropagationStopped=gd,this}return ut(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ps)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ps)},persist:function(){},isPersistent:Ps}),t}var wa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},mc=ar(wa),ys=ut({},wa,{view:0,detail:0}),U0=ar(ys),xi,vi,Ca,Go=ut({},ys,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ca&&(Ca&&e.type==="mousemove"?(xi=e.screenX-Ca.screenX,vi=e.screenY-Ca.screenY):vi=xi=0,Ca=e),xi)},movementY:function(e){return"movementY"in e?e.movementY:vi}}),xd=ar(Go),V0=ut({},Go,{dataTransfer:0}),H0=ar(V0),Y0=ut({},ys,{relatedTarget:0}),bi=ar(Y0),G0=ut({},wa,{animationName:0,elapsedTime:0,pseudoElement:0}),X0=ar(G0),K0=ut({},wa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),q0=ar(K0),Q0=ut({},wa,{data:0}),vd=ar(Q0),J0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Z0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},eh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function th(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=eh[e])?!!t[e]:!1}function fc(){return th}var rh=ut({},ys,{key:function(e){if(e.key){var t=J0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=eo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Z0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fc,charCode:function(e){return e.type==="keypress"?eo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?eo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),nh=ar(rh),ah=ut({},Go,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bd=ar(ah),sh=ut({},ys,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fc}),oh=ar(sh),ih=ut({},wa,{propertyName:0,elapsedTime:0,pseudoElement:0}),lh=ar(ih),ch=ut({},Go,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),dh=ar(ch),uh=[9,13,27,32],hc=Br&&"CompositionEvent"in window,Va=null;Br&&"documentMode"in document&&(Va=document.documentMode);var ph=Br&&"TextEvent"in window&&!Va,Op=Br&&(!hc||Va&&8<Va&&11>=Va),yd=" ",wd=!1;function Fp(e,t){switch(e){case"keyup":return uh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Dp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xn=!1;function mh(e,t){switch(e){case"compositionend":return Dp(t);case"keypress":return t.which!==32?null:(wd=!0,yd);case"textInput":return e=t.data,e===yd&&wd?null:e;default:return null}}function fh(e,t){if(Xn)return e==="compositionend"||!hc&&Fp(e,t)?(e=Ap(),Zs=pc=nn=null,Xn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Op&&t.locale!=="ko"?null:t.data;default:return null}}var hh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function kd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!hh[e.type]:t==="textarea"}function Bp(e,t,n,a){vp(a),t=bo(t,"onChange"),0<t.length&&(n=new mc("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Ha=null,ns=null;function gh(e){Jp(e,0)}function Xo(e){var t=Qn(e);if(up(t))return e}function xh(e,t){if(e==="change")return t}var Wp=!1;if(Br){var yi;if(Br){var wi="oninput"in document;if(!wi){var jd=document.createElement("div");jd.setAttribute("oninput","return;"),wi=typeof jd.oninput=="function"}yi=wi}else yi=!1;Wp=yi&&(!document.documentMode||9<document.documentMode)}function Nd(){Ha&&(Ha.detachEvent("onpropertychange",Up),ns=Ha=null)}function Up(e){if(e.propertyName==="value"&&Xo(ns)){var t=[];Bp(t,ns,e,ic(e)),kp(gh,t)}}function vh(e,t,n){e==="focusin"?(Nd(),Ha=t,ns=n,Ha.attachEvent("onpropertychange",Up)):e==="focusout"&&Nd()}function bh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Xo(ns)}function yh(e,t){if(e==="click")return Xo(t)}function wh(e,t){if(e==="input"||e==="change")return Xo(t)}function kh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var vr=typeof Object.is=="function"?Object.is:kh;function as(e,t){if(vr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var s=n[a];if(!qi.call(t,s)||!vr(e[s],t[s]))return!1}return!0}function _d(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Sd(e,t){var n=_d(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=_d(n)}}function Vp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Vp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Hp(){for(var e=window,t=po();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=po(e.document)}return t}function gc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function jh(e){var t=Hp(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Vp(n.ownerDocument.documentElement,n)){if(a!==null&&gc(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(a.start,s);a=a.end===void 0?o:Math.min(a.end,s),!e.extend&&o>a&&(s=a,a=o,o=s),s=Sd(n,o);var i=Sd(n,a);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>a?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Nh=Br&&"documentMode"in document&&11>=document.documentMode,Kn=null,hl=null,Ya=null,gl=!1;function Cd(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;gl||Kn==null||Kn!==po(a)||(a=Kn,"selectionStart"in a&&gc(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ya&&as(Ya,a)||(Ya=a,a=bo(hl,"onSelect"),0<a.length&&(t=new mc("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Kn)))}function Rs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var qn={animationend:Rs("Animation","AnimationEnd"),animationiteration:Rs("Animation","AnimationIteration"),animationstart:Rs("Animation","AnimationStart"),transitionend:Rs("Transition","TransitionEnd")},ki={},Yp={};Br&&(Yp=document.createElement("div").style,"AnimationEvent"in window||(delete qn.animationend.animation,delete qn.animationiteration.animation,delete qn.animationstart.animation),"TransitionEvent"in window||delete qn.transitionend.transition);function Ko(e){if(ki[e])return ki[e];if(!qn[e])return e;var t=qn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Yp)return ki[e]=t[n];return e}var Gp=Ko("animationend"),Xp=Ko("animationiteration"),Kp=Ko("animationstart"),qp=Ko("transitionend"),Qp=new Map,Md="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function gn(e,t){Qp.set(e,t),Fn(t,[e])}for(var ji=0;ji<Md.length;ji++){var Ni=Md[ji],_h=Ni.toLowerCase(),Sh=Ni[0].toUpperCase()+Ni.slice(1);gn(_h,"on"+Sh)}gn(Gp,"onAnimationEnd");gn(Xp,"onAnimationIteration");gn(Kp,"onAnimationStart");gn("dblclick","onDoubleClick");gn("focusin","onFocus");gn("focusout","onBlur");gn(qp,"onTransitionEnd");ua("onMouseEnter",["mouseout","mouseover"]);ua("onMouseLeave",["mouseout","mouseover"]);ua("onPointerEnter",["pointerout","pointerover"]);ua("onPointerLeave",["pointerout","pointerover"]);Fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Aa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ch=new Set("cancel close invalid load scroll toggle".split(" ").concat(Aa));function zd(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,_0(a,t,void 0,e),e.currentTarget=null}function Jp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],s=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var i=a.length-1;0<=i;i--){var c=a[i],l=c.instance,d=c.currentTarget;if(c=c.listener,l!==o&&s.isPropagationStopped())break e;zd(s,c,d),o=l}else for(i=0;i<a.length;i++){if(c=a[i],l=c.instance,d=c.currentTarget,c=c.listener,l!==o&&s.isPropagationStopped())break e;zd(s,c,d),o=l}}}if(fo)throw e=ul,fo=!1,ul=null,e}function tt(e,t){var n=t[wl];n===void 0&&(n=t[wl]=new Set);var a=e+"__bubble";n.has(a)||(Zp(t,e,2,!1),n.add(a))}function _i(e,t,n){var a=0;t&&(a|=4),Zp(n,e,a,t)}var Is="_reactListening"+Math.random().toString(36).slice(2);function ss(e){if(!e[Is]){e[Is]=!0,op.forEach(function(n){n!=="selectionchange"&&(Ch.has(n)||_i(n,!1,e),_i(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Is]||(t[Is]=!0,_i("selectionchange",!1,t))}}function Zp(e,t,n,a){switch(Lp(t)){case 1:var s=B0;break;case 4:s=W0;break;default:s=uc}n=s.bind(null,t,n,e),s=void 0,!dl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),a?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function Si(e,t,n,a,s){var o=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var i=a.tag;if(i===3||i===4){var c=a.stateNode.containerInfo;if(c===s||c.nodeType===8&&c.parentNode===s)break;if(i===4)for(i=a.return;i!==null;){var l=i.tag;if((l===3||l===4)&&(l=i.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;i=i.return}for(;c!==null;){if(i=Sn(c),i===null)return;if(l=i.tag,l===5||l===6){a=o=i;continue e}c=c.parentNode}}a=a.return}kp(function(){var d=o,m=ic(n),g=[];e:{var p=Qp.get(e);if(p!==void 0){var x=mc,b=e;switch(e){case"keypress":if(eo(n)===0)break e;case"keydown":case"keyup":x=nh;break;case"focusin":b="focus",x=bi;break;case"focusout":b="blur",x=bi;break;case"beforeblur":case"afterblur":x=bi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=xd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=H0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=oh;break;case Gp:case Xp:case Kp:x=X0;break;case qp:x=lh;break;case"scroll":x=U0;break;case"wheel":x=dh;break;case"copy":case"cut":case"paste":x=q0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=bd}var k=(t&4)!==0,j=!k&&e==="scroll",f=k?p!==null?p+"Capture":null:p;k=[];for(var h=d,v;h!==null;){v=h;var N=v.stateNode;if(v.tag===5&&N!==null&&(v=N,f!==null&&(N=Za(h,f),N!=null&&k.push(os(h,N,v)))),j)break;h=h.return}0<k.length&&(p=new x(p,b,null,n,m),g.push({event:p,listeners:k}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",p&&n!==ll&&(b=n.relatedTarget||n.fromElement)&&(Sn(b)||b[Wr]))break e;if((x||p)&&(p=m.window===m?m:(p=m.ownerDocument)?p.defaultView||p.parentWindow:window,x?(b=n.relatedTarget||n.toElement,x=d,b=b?Sn(b):null,b!==null&&(j=Dn(b),b!==j||b.tag!==5&&b.tag!==6)&&(b=null)):(x=null,b=d),x!==b)){if(k=xd,N="onMouseLeave",f="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(k=bd,N="onPointerLeave",f="onPointerEnter",h="pointer"),j=x==null?p:Qn(x),v=b==null?p:Qn(b),p=new k(N,h+"leave",x,n,m),p.target=j,p.relatedTarget=v,N=null,Sn(m)===d&&(k=new k(f,h+"enter",b,n,m),k.target=v,k.relatedTarget=j,N=k),j=N,x&&b)t:{for(k=x,f=b,h=0,v=k;v;v=Un(v))h++;for(v=0,N=f;N;N=Un(N))v++;for(;0<h-v;)k=Un(k),h--;for(;0<v-h;)f=Un(f),v--;for(;h--;){if(k===f||f!==null&&k===f.alternate)break t;k=Un(k),f=Un(f)}k=null}else k=null;x!==null&&$d(g,p,x,k,!1),b!==null&&j!==null&&$d(g,j,b,k,!0)}}e:{if(p=d?Qn(d):window,x=p.nodeName&&p.nodeName.toLowerCase(),x==="select"||x==="input"&&p.type==="file")var w=xh;else if(kd(p))if(Wp)w=wh;else{w=bh;var _=vh}else(x=p.nodeName)&&x.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(w=yh);if(w&&(w=w(e,d))){Bp(g,w,n,m);break e}_&&_(e,p,d),e==="focusout"&&(_=p._wrapperState)&&_.controlled&&p.type==="number"&&nl(p,"number",p.value)}switch(_=d?Qn(d):window,e){case"focusin":(kd(_)||_.contentEditable==="true")&&(Kn=_,hl=d,Ya=null);break;case"focusout":Ya=hl=Kn=null;break;case"mousedown":gl=!0;break;case"contextmenu":case"mouseup":case"dragend":gl=!1,Cd(g,n,m);break;case"selectionchange":if(Nh)break;case"keydown":case"keyup":Cd(g,n,m)}var z;if(hc)e:{switch(e){case"compositionstart":var $="onCompositionStart";break e;case"compositionend":$="onCompositionEnd";break e;case"compositionupdate":$="onCompositionUpdate";break e}$=void 0}else Xn?Fp(e,n)&&($="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&($="onCompositionStart");$&&(Op&&n.locale!=="ko"&&(Xn||$!=="onCompositionStart"?$==="onCompositionEnd"&&Xn&&(z=Ap()):(nn=m,pc="value"in nn?nn.value:nn.textContent,Xn=!0)),_=bo(d,$),0<_.length&&($=new vd($,e,null,n,m),g.push({event:$,listeners:_}),z?$.data=z:(z=Dp(n),z!==null&&($.data=z)))),(z=ph?mh(e,n):fh(e,n))&&(d=bo(d,"onBeforeInput"),0<d.length&&(m=new vd("onBeforeInput","beforeinput",null,n,m),g.push({event:m,listeners:d}),m.data=z))}Jp(g,t)})}function os(e,t,n){return{instance:e,listener:t,currentTarget:n}}function bo(e,t){for(var n=t+"Capture",a=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=Za(e,n),o!=null&&a.unshift(os(e,o,s)),o=Za(e,t),o!=null&&a.push(os(e,o,s))),e=e.return}return a}function Un(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function $d(e,t,n,a,s){for(var o=t._reactName,i=[];n!==null&&n!==a;){var c=n,l=c.alternate,d=c.stateNode;if(l!==null&&l===a)break;c.tag===5&&d!==null&&(c=d,s?(l=Za(n,o),l!=null&&i.unshift(os(n,l,c))):s||(l=Za(n,o),l!=null&&i.push(os(n,l,c)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var Mh=/\r\n?/g,zh=/\u0000|\uFFFD/g;function Ed(e){return(typeof e=="string"?e:""+e).replace(Mh,`
`).replace(zh,"")}function Ls(e,t,n){if(t=Ed(t),Ed(e)!==t&&n)throw Error(ee(425))}function yo(){}var xl=null,vl=null;function bl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var yl=typeof setTimeout=="function"?setTimeout:void 0,$h=typeof clearTimeout=="function"?clearTimeout:void 0,Td=typeof Promise=="function"?Promise:void 0,Eh=typeof queueMicrotask=="function"?queueMicrotask:typeof Td<"u"?function(e){return Td.resolve(null).then(e).catch(Th)}:yl;function Th(e){setTimeout(function(){throw e})}function Ci(e,t){var n=t,a=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(a===0){e.removeChild(s),rs(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=s}while(n);rs(t)}function cn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Pd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ka=Math.random().toString(36).slice(2),Cr="__reactFiber$"+ka,is="__reactProps$"+ka,Wr="__reactContainer$"+ka,wl="__reactEvents$"+ka,Ph="__reactListeners$"+ka,Rh="__reactHandles$"+ka;function Sn(e){var t=e[Cr];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Wr]||n[Cr]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Pd(e);e!==null;){if(n=e[Cr])return n;e=Pd(e)}return t}e=n,n=e.parentNode}return null}function ws(e){return e=e[Cr]||e[Wr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Qn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(ee(33))}function qo(e){return e[is]||null}var kl=[],Jn=-1;function xn(e){return{current:e}}function rt(e){0>Jn||(e.current=kl[Jn],kl[Jn]=null,Jn--)}function Je(e,t){Jn++,kl[Jn]=e.current,e.current=t}var hn={},It=xn(hn),Xt=xn(!1),Pn=hn;function pa(e,t){var n=e.type.contextTypes;if(!n)return hn;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Kt(e){return e=e.childContextTypes,e!=null}function wo(){rt(Xt),rt(It)}function Rd(e,t,n){if(It.current!==hn)throw Error(ee(168));Je(It,t),Je(Xt,n)}function em(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var s in a)if(!(s in t))throw Error(ee(108,v0(e)||"Unknown",s));return ut({},n,a)}function ko(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||hn,Pn=It.current,Je(It,e),Je(Xt,Xt.current),!0}function Id(e,t,n){var a=e.stateNode;if(!a)throw Error(ee(169));n?(e=em(e,t,Pn),a.__reactInternalMemoizedMergedChildContext=e,rt(Xt),rt(It),Je(It,e)):rt(Xt),Je(Xt,n)}var Ar=null,Qo=!1,Mi=!1;function tm(e){Ar===null?Ar=[e]:Ar.push(e)}function Ih(e){Qo=!0,tm(e)}function vn(){if(!Mi&&Ar!==null){Mi=!0;var e=0,t=Ye;try{var n=Ar;for(Ye=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}Ar=null,Qo=!1}catch(s){throw Ar!==null&&(Ar=Ar.slice(e+1)),Sp(lc,vn),s}finally{Ye=t,Mi=!1}}return null}var Zn=[],ea=0,jo=null,No=0,sr=[],or=0,Rn=null,Or=1,Fr="";function Nn(e,t){Zn[ea++]=No,Zn[ea++]=jo,jo=e,No=t}function rm(e,t,n){sr[or++]=Or,sr[or++]=Fr,sr[or++]=Rn,Rn=e;var a=Or;e=Fr;var s=32-gr(a)-1;a&=~(1<<s),n+=1;var o=32-gr(t)+s;if(30<o){var i=s-s%5;o=(a&(1<<i)-1).toString(32),a>>=i,s-=i,Or=1<<32-gr(t)+s|n<<s|a,Fr=o+e}else Or=1<<o|n<<s|a,Fr=e}function xc(e){e.return!==null&&(Nn(e,1),rm(e,1,0))}function vc(e){for(;e===jo;)jo=Zn[--ea],Zn[ea]=null,No=Zn[--ea],Zn[ea]=null;for(;e===Rn;)Rn=sr[--or],sr[or]=null,Fr=sr[--or],sr[or]=null,Or=sr[--or],sr[or]=null}var tr=null,er=null,st=!1,fr=null;function nm(e,t){var n=ir(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ld(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,tr=e,er=cn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,tr=e,er=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Rn!==null?{id:Or,overflow:Fr}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ir(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,tr=e,er=null,!0):!1;default:return!1}}function jl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Nl(e){if(st){var t=er;if(t){var n=t;if(!Ld(e,t)){if(jl(e))throw Error(ee(418));t=cn(n.nextSibling);var a=tr;t&&Ld(e,t)?nm(a,n):(e.flags=e.flags&-4097|2,st=!1,tr=e)}}else{if(jl(e))throw Error(ee(418));e.flags=e.flags&-4097|2,st=!1,tr=e}}}function Ad(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;tr=e}function As(e){if(e!==tr)return!1;if(!st)return Ad(e),st=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!bl(e.type,e.memoizedProps)),t&&(t=er)){if(jl(e))throw am(),Error(ee(418));for(;t;)nm(e,t),t=cn(t.nextSibling)}if(Ad(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(ee(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){er=cn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}er=null}}else er=tr?cn(e.stateNode.nextSibling):null;return!0}function am(){for(var e=er;e;)e=cn(e.nextSibling)}function ma(){er=tr=null,st=!1}function bc(e){fr===null?fr=[e]:fr.push(e)}var Lh=Yr.ReactCurrentBatchConfig;function Ma(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ee(309));var a=n.stateNode}if(!a)throw Error(ee(147,e));var s=a,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var c=s.refs;i===null?delete c[o]:c[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(ee(284));if(!n._owner)throw Error(ee(290,e))}return e}function Os(e,t){throw e=Object.prototype.toString.call(t),Error(ee(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Od(e){var t=e._init;return t(e._payload)}function sm(e){function t(f,h){if(e){var v=f.deletions;v===null?(f.deletions=[h],f.flags|=16):v.push(h)}}function n(f,h){if(!e)return null;for(;h!==null;)t(f,h),h=h.sibling;return null}function a(f,h){for(f=new Map;h!==null;)h.key!==null?f.set(h.key,h):f.set(h.index,h),h=h.sibling;return f}function s(f,h){return f=mn(f,h),f.index=0,f.sibling=null,f}function o(f,h,v){return f.index=v,e?(v=f.alternate,v!==null?(v=v.index,v<h?(f.flags|=2,h):v):(f.flags|=2,h)):(f.flags|=1048576,h)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function c(f,h,v,N){return h===null||h.tag!==6?(h=Ii(v,f.mode,N),h.return=f,h):(h=s(h,v),h.return=f,h)}function l(f,h,v,N){var w=v.type;return w===Gn?m(f,h,v.props.children,N,v.key):h!==null&&(h.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Jr&&Od(w)===h.type)?(N=s(h,v.props),N.ref=Ma(f,h,v),N.return=f,N):(N=io(v.type,v.key,v.props,null,f.mode,N),N.ref=Ma(f,h,v),N.return=f,N)}function d(f,h,v,N){return h===null||h.tag!==4||h.stateNode.containerInfo!==v.containerInfo||h.stateNode.implementation!==v.implementation?(h=Li(v,f.mode,N),h.return=f,h):(h=s(h,v.children||[]),h.return=f,h)}function m(f,h,v,N,w){return h===null||h.tag!==7?(h=En(v,f.mode,N,w),h.return=f,h):(h=s(h,v),h.return=f,h)}function g(f,h,v){if(typeof h=="string"&&h!==""||typeof h=="number")return h=Ii(""+h,f.mode,v),h.return=f,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Cs:return v=io(h.type,h.key,h.props,null,f.mode,v),v.ref=Ma(f,null,h),v.return=f,v;case Yn:return h=Li(h,f.mode,v),h.return=f,h;case Jr:var N=h._init;return g(f,N(h._payload),v)}if(Ia(h)||ja(h))return h=En(h,f.mode,v,null),h.return=f,h;Os(f,h)}return null}function p(f,h,v,N){var w=h!==null?h.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return w!==null?null:c(f,h,""+v,N);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Cs:return v.key===w?l(f,h,v,N):null;case Yn:return v.key===w?d(f,h,v,N):null;case Jr:return w=v._init,p(f,h,w(v._payload),N)}if(Ia(v)||ja(v))return w!==null?null:m(f,h,v,N,null);Os(f,v)}return null}function x(f,h,v,N,w){if(typeof N=="string"&&N!==""||typeof N=="number")return f=f.get(v)||null,c(h,f,""+N,w);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case Cs:return f=f.get(N.key===null?v:N.key)||null,l(h,f,N,w);case Yn:return f=f.get(N.key===null?v:N.key)||null,d(h,f,N,w);case Jr:var _=N._init;return x(f,h,v,_(N._payload),w)}if(Ia(N)||ja(N))return f=f.get(v)||null,m(h,f,N,w,null);Os(h,N)}return null}function b(f,h,v,N){for(var w=null,_=null,z=h,$=h=0,P=null;z!==null&&$<v.length;$++){z.index>$?(P=z,z=null):P=z.sibling;var D=p(f,z,v[$],N);if(D===null){z===null&&(z=P);break}e&&z&&D.alternate===null&&t(f,z),h=o(D,h,$),_===null?w=D:_.sibling=D,_=D,z=P}if($===v.length)return n(f,z),st&&Nn(f,$),w;if(z===null){for(;$<v.length;$++)z=g(f,v[$],N),z!==null&&(h=o(z,h,$),_===null?w=z:_.sibling=z,_=z);return st&&Nn(f,$),w}for(z=a(f,z);$<v.length;$++)P=x(z,f,$,v[$],N),P!==null&&(e&&P.alternate!==null&&z.delete(P.key===null?$:P.key),h=o(P,h,$),_===null?w=P:_.sibling=P,_=P);return e&&z.forEach(function(I){return t(f,I)}),st&&Nn(f,$),w}function k(f,h,v,N){var w=ja(v);if(typeof w!="function")throw Error(ee(150));if(v=w.call(v),v==null)throw Error(ee(151));for(var _=w=null,z=h,$=h=0,P=null,D=v.next();z!==null&&!D.done;$++,D=v.next()){z.index>$?(P=z,z=null):P=z.sibling;var I=p(f,z,D.value,N);if(I===null){z===null&&(z=P);break}e&&z&&I.alternate===null&&t(f,z),h=o(I,h,$),_===null?w=I:_.sibling=I,_=I,z=P}if(D.done)return n(f,z),st&&Nn(f,$),w;if(z===null){for(;!D.done;$++,D=v.next())D=g(f,D.value,N),D!==null&&(h=o(D,h,$),_===null?w=D:_.sibling=D,_=D);return st&&Nn(f,$),w}for(z=a(f,z);!D.done;$++,D=v.next())D=x(z,f,$,D.value,N),D!==null&&(e&&D.alternate!==null&&z.delete(D.key===null?$:D.key),h=o(D,h,$),_===null?w=D:_.sibling=D,_=D);return e&&z.forEach(function(A){return t(f,A)}),st&&Nn(f,$),w}function j(f,h,v,N){if(typeof v=="object"&&v!==null&&v.type===Gn&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Cs:e:{for(var w=v.key,_=h;_!==null;){if(_.key===w){if(w=v.type,w===Gn){if(_.tag===7){n(f,_.sibling),h=s(_,v.props.children),h.return=f,f=h;break e}}else if(_.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Jr&&Od(w)===_.type){n(f,_.sibling),h=s(_,v.props),h.ref=Ma(f,_,v),h.return=f,f=h;break e}n(f,_);break}else t(f,_);_=_.sibling}v.type===Gn?(h=En(v.props.children,f.mode,N,v.key),h.return=f,f=h):(N=io(v.type,v.key,v.props,null,f.mode,N),N.ref=Ma(f,h,v),N.return=f,f=N)}return i(f);case Yn:e:{for(_=v.key;h!==null;){if(h.key===_)if(h.tag===4&&h.stateNode.containerInfo===v.containerInfo&&h.stateNode.implementation===v.implementation){n(f,h.sibling),h=s(h,v.children||[]),h.return=f,f=h;break e}else{n(f,h);break}else t(f,h);h=h.sibling}h=Li(v,f.mode,N),h.return=f,f=h}return i(f);case Jr:return _=v._init,j(f,h,_(v._payload),N)}if(Ia(v))return b(f,h,v,N);if(ja(v))return k(f,h,v,N);Os(f,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,h!==null&&h.tag===6?(n(f,h.sibling),h=s(h,v),h.return=f,f=h):(n(f,h),h=Ii(v,f.mode,N),h.return=f,f=h),i(f)):n(f,h)}return j}var fa=sm(!0),om=sm(!1),_o=xn(null),So=null,ta=null,yc=null;function wc(){yc=ta=So=null}function kc(e){var t=_o.current;rt(_o),e._currentValue=t}function _l(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function la(e,t){So=e,yc=ta=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Yt=!0),e.firstContext=null)}function cr(e){var t=e._currentValue;if(yc!==e)if(e={context:e,memoizedValue:t,next:null},ta===null){if(So===null)throw Error(ee(308));ta=e,So.dependencies={lanes:0,firstContext:e}}else ta=ta.next=e;return t}var Cn=null;function jc(e){Cn===null?Cn=[e]:Cn.push(e)}function im(e,t,n,a){var s=t.interleaved;return s===null?(n.next=n,jc(t)):(n.next=s.next,s.next=n),t.interleaved=n,Ur(e,a)}function Ur(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Zr=!1;function Nc(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Dr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function dn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,We&2){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,Ur(e,n)}return s=a.interleaved,s===null?(t.next=t,jc(a)):(t.next=s.next,s.next=t),a.interleaved=t,Ur(e,n)}function to(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,cc(e,n)}}function Fd(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Co(e,t,n,a){var s=e.updateQueue;Zr=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,c=s.shared.pending;if(c!==null){s.shared.pending=null;var l=c,d=l.next;l.next=null,i===null?o=d:i.next=d,i=l;var m=e.alternate;m!==null&&(m=m.updateQueue,c=m.lastBaseUpdate,c!==i&&(c===null?m.firstBaseUpdate=d:c.next=d,m.lastBaseUpdate=l))}if(o!==null){var g=s.baseState;i=0,m=d=l=null,c=o;do{var p=c.lane,x=c.eventTime;if((a&p)===p){m!==null&&(m=m.next={eventTime:x,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var b=e,k=c;switch(p=t,x=n,k.tag){case 1:if(b=k.payload,typeof b=="function"){g=b.call(x,g,p);break e}g=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=k.payload,p=typeof b=="function"?b.call(x,g,p):b,p==null)break e;g=ut({},g,p);break e;case 2:Zr=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,p=s.effects,p===null?s.effects=[c]:p.push(c))}else x={eventTime:x,lane:p,tag:c.tag,payload:c.payload,callback:c.callback,next:null},m===null?(d=m=x,l=g):m=m.next=x,i|=p;if(c=c.next,c===null){if(c=s.shared.pending,c===null)break;p=c,c=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);if(m===null&&(l=g),s.baseState=l,s.firstBaseUpdate=d,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Ln|=i,e.lanes=i,e.memoizedState=g}}function Dd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],s=a.callback;if(s!==null){if(a.callback=null,a=n,typeof s!="function")throw Error(ee(191,s));s.call(a)}}}var ks={},zr=xn(ks),ls=xn(ks),cs=xn(ks);function Mn(e){if(e===ks)throw Error(ee(174));return e}function _c(e,t){switch(Je(cs,t),Je(ls,e),Je(zr,ks),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:sl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=sl(t,e)}rt(zr),Je(zr,t)}function ha(){rt(zr),rt(ls),rt(cs)}function cm(e){Mn(cs.current);var t=Mn(zr.current),n=sl(t,e.type);t!==n&&(Je(ls,e),Je(zr,n))}function Sc(e){ls.current===e&&(rt(zr),rt(ls))}var ct=xn(0);function Mo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var zi=[];function Cc(){for(var e=0;e<zi.length;e++)zi[e]._workInProgressVersionPrimary=null;zi.length=0}var ro=Yr.ReactCurrentDispatcher,$i=Yr.ReactCurrentBatchConfig,In=0,dt=null,jt=null,St=null,zo=!1,Ga=!1,ds=0,Ah=0;function Tt(){throw Error(ee(321))}function Mc(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!vr(e[n],t[n]))return!1;return!0}function zc(e,t,n,a,s,o){if(In=o,dt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ro.current=e===null||e.memoizedState===null?Bh:Wh,e=n(a,s),Ga){o=0;do{if(Ga=!1,ds=0,25<=o)throw Error(ee(301));o+=1,St=jt=null,t.updateQueue=null,ro.current=Uh,e=n(a,s)}while(Ga)}if(ro.current=$o,t=jt!==null&&jt.next!==null,In=0,St=jt=dt=null,zo=!1,t)throw Error(ee(300));return e}function $c(){var e=ds!==0;return ds=0,e}function Sr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return St===null?dt.memoizedState=St=e:St=St.next=e,St}function dr(){if(jt===null){var e=dt.alternate;e=e!==null?e.memoizedState:null}else e=jt.next;var t=St===null?dt.memoizedState:St.next;if(t!==null)St=t,jt=e;else{if(e===null)throw Error(ee(310));jt=e,e={memoizedState:jt.memoizedState,baseState:jt.baseState,baseQueue:jt.baseQueue,queue:jt.queue,next:null},St===null?dt.memoizedState=St=e:St=St.next=e}return St}function us(e,t){return typeof t=="function"?t(e):t}function Ei(e){var t=dr(),n=t.queue;if(n===null)throw Error(ee(311));n.lastRenderedReducer=e;var a=jt,s=a.baseQueue,o=n.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}a.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,a=a.baseState;var c=i=null,l=null,d=o;do{var m=d.lane;if((In&m)===m)l!==null&&(l=l.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),a=d.hasEagerState?d.eagerState:e(a,d.action);else{var g={lane:m,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};l===null?(c=l=g,i=a):l=l.next=g,dt.lanes|=m,Ln|=m}d=d.next}while(d!==null&&d!==o);l===null?i=a:l.next=c,vr(a,t.memoizedState)||(Yt=!0),t.memoizedState=a,t.baseState=i,t.baseQueue=l,n.lastRenderedState=a}if(e=n.interleaved,e!==null){s=e;do o=s.lane,dt.lanes|=o,Ln|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ti(e){var t=dr(),n=t.queue;if(n===null)throw Error(ee(311));n.lastRenderedReducer=e;var a=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);vr(o,t.memoizedState)||(Yt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function dm(){}function um(e,t){var n=dt,a=dr(),s=t(),o=!vr(a.memoizedState,s);if(o&&(a.memoizedState=s,Yt=!0),a=a.queue,Ec(fm.bind(null,n,a,e),[e]),a.getSnapshot!==t||o||St!==null&&St.memoizedState.tag&1){if(n.flags|=2048,ps(9,mm.bind(null,n,a,s,t),void 0,null),Ct===null)throw Error(ee(349));In&30||pm(n,t,s)}return s}function pm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=dt.updateQueue,t===null?(t={lastEffect:null,stores:null},dt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function mm(e,t,n,a){t.value=n,t.getSnapshot=a,hm(t)&&gm(e)}function fm(e,t,n){return n(function(){hm(t)&&gm(e)})}function hm(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!vr(e,n)}catch{return!0}}function gm(e){var t=Ur(e,1);t!==null&&xr(t,e,1,-1)}function Bd(e){var t=Sr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:e},t.queue=e,e=e.dispatch=Dh.bind(null,dt,e),[t.memoizedState,e]}function ps(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=dt.updateQueue,t===null?(t={lastEffect:null,stores:null},dt.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function xm(){return dr().memoizedState}function no(e,t,n,a){var s=Sr();dt.flags|=e,s.memoizedState=ps(1|t,n,void 0,a===void 0?null:a)}function Jo(e,t,n,a){var s=dr();a=a===void 0?null:a;var o=void 0;if(jt!==null){var i=jt.memoizedState;if(o=i.destroy,a!==null&&Mc(a,i.deps)){s.memoizedState=ps(t,n,o,a);return}}dt.flags|=e,s.memoizedState=ps(1|t,n,o,a)}function Wd(e,t){return no(8390656,8,e,t)}function Ec(e,t){return Jo(2048,8,e,t)}function vm(e,t){return Jo(4,2,e,t)}function bm(e,t){return Jo(4,4,e,t)}function ym(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function wm(e,t,n){return n=n!=null?n.concat([e]):null,Jo(4,4,ym.bind(null,t,e),n)}function Tc(){}function km(e,t){var n=dr();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Mc(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function jm(e,t){var n=dr();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&Mc(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function Nm(e,t,n){return In&21?(vr(n,t)||(n=zp(),dt.lanes|=n,Ln|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Yt=!0),e.memoizedState=n)}function Oh(e,t){var n=Ye;Ye=n!==0&&4>n?n:4,e(!0);var a=$i.transition;$i.transition={};try{e(!1),t()}finally{Ye=n,$i.transition=a}}function _m(){return dr().memoizedState}function Fh(e,t,n){var a=pn(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},Sm(e))Cm(t,n);else if(n=im(e,t,n,a),n!==null){var s=Ot();xr(n,e,a,s),Mm(n,t,a)}}function Dh(e,t,n){var a=pn(e),s={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(Sm(e))Cm(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,c=o(i,n);if(s.hasEagerState=!0,s.eagerState=c,vr(c,i)){var l=t.interleaved;l===null?(s.next=s,jc(t)):(s.next=l.next,l.next=s),t.interleaved=s;return}}catch{}finally{}n=im(e,t,s,a),n!==null&&(s=Ot(),xr(n,e,a,s),Mm(n,t,a))}}function Sm(e){var t=e.alternate;return e===dt||t!==null&&t===dt}function Cm(e,t){Ga=zo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Mm(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,cc(e,n)}}var $o={readContext:cr,useCallback:Tt,useContext:Tt,useEffect:Tt,useImperativeHandle:Tt,useInsertionEffect:Tt,useLayoutEffect:Tt,useMemo:Tt,useReducer:Tt,useRef:Tt,useState:Tt,useDebugValue:Tt,useDeferredValue:Tt,useTransition:Tt,useMutableSource:Tt,useSyncExternalStore:Tt,useId:Tt,unstable_isNewReconciler:!1},Bh={readContext:cr,useCallback:function(e,t){return Sr().memoizedState=[e,t===void 0?null:t],e},useContext:cr,useEffect:Wd,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,no(4194308,4,ym.bind(null,t,e),n)},useLayoutEffect:function(e,t){return no(4194308,4,e,t)},useInsertionEffect:function(e,t){return no(4,2,e,t)},useMemo:function(e,t){var n=Sr();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=Sr();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=Fh.bind(null,dt,e),[a.memoizedState,e]},useRef:function(e){var t=Sr();return e={current:e},t.memoizedState=e},useState:Bd,useDebugValue:Tc,useDeferredValue:function(e){return Sr().memoizedState=e},useTransition:function(){var e=Bd(!1),t=e[0];return e=Oh.bind(null,e[1]),Sr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=dt,s=Sr();if(st){if(n===void 0)throw Error(ee(407));n=n()}else{if(n=t(),Ct===null)throw Error(ee(349));In&30||pm(a,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,Wd(fm.bind(null,a,o,e),[e]),a.flags|=2048,ps(9,mm.bind(null,a,o,n,t),void 0,null),n},useId:function(){var e=Sr(),t=Ct.identifierPrefix;if(st){var n=Fr,a=Or;n=(a&~(1<<32-gr(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=ds++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Ah++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Wh={readContext:cr,useCallback:km,useContext:cr,useEffect:Ec,useImperativeHandle:wm,useInsertionEffect:vm,useLayoutEffect:bm,useMemo:jm,useReducer:Ei,useRef:xm,useState:function(){return Ei(us)},useDebugValue:Tc,useDeferredValue:function(e){var t=dr();return Nm(t,jt.memoizedState,e)},useTransition:function(){var e=Ei(us)[0],t=dr().memoizedState;return[e,t]},useMutableSource:dm,useSyncExternalStore:um,useId:_m,unstable_isNewReconciler:!1},Uh={readContext:cr,useCallback:km,useContext:cr,useEffect:Ec,useImperativeHandle:wm,useInsertionEffect:vm,useLayoutEffect:bm,useMemo:jm,useReducer:Ti,useRef:xm,useState:function(){return Ti(us)},useDebugValue:Tc,useDeferredValue:function(e){var t=dr();return jt===null?t.memoizedState=e:Nm(t,jt.memoizedState,e)},useTransition:function(){var e=Ti(us)[0],t=dr().memoizedState;return[e,t]},useMutableSource:dm,useSyncExternalStore:um,useId:_m,unstable_isNewReconciler:!1};function pr(e,t){if(e&&e.defaultProps){t=ut({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Sl(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:ut({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Zo={isMounted:function(e){return(e=e._reactInternals)?Dn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Ot(),s=pn(e),o=Dr(a,s);o.payload=t,n!=null&&(o.callback=n),t=dn(e,o,s),t!==null&&(xr(t,e,s,a),to(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Ot(),s=pn(e),o=Dr(a,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=dn(e,o,s),t!==null&&(xr(t,e,s,a),to(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ot(),a=pn(e),s=Dr(n,a);s.tag=2,t!=null&&(s.callback=t),t=dn(e,s,a),t!==null&&(xr(t,e,a,n),to(t,e,a))}};function Ud(e,t,n,a,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,i):t.prototype&&t.prototype.isPureReactComponent?!as(n,a)||!as(s,o):!0}function zm(e,t,n){var a=!1,s=hn,o=t.contextType;return typeof o=="object"&&o!==null?o=cr(o):(s=Kt(t)?Pn:It.current,a=t.contextTypes,o=(a=a!=null)?pa(e,s):hn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Zo,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function Vd(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Zo.enqueueReplaceState(t,t.state,null)}function Cl(e,t,n,a){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Nc(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=cr(o):(o=Kt(t)?Pn:It.current,s.context=pa(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Sl(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&Zo.enqueueReplaceState(s,s.state,null),Co(e,n,s,a),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function ga(e,t){try{var n="",a=t;do n+=x0(a),a=a.return;while(a);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function Pi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ml(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Vh=typeof WeakMap=="function"?WeakMap:Map;function $m(e,t,n){n=Dr(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){To||(To=!0,Ol=a),Ml(e,t)},n}function Em(e,t,n){n=Dr(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;n.payload=function(){return a(s)},n.callback=function(){Ml(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Ml(e,t),typeof a!="function"&&(un===null?un=new Set([this]):un.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Hd(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new Vh;var s=new Set;a.set(t,s)}else s=a.get(t),s===void 0&&(s=new Set,a.set(t,s));s.has(n)||(s.add(n),e=ag.bind(null,e,t,n),t.then(e,e))}function Yd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Gd(e,t,n,a,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Dr(-1,1),t.tag=2,dn(n,t,1))),n.lanes|=1),e)}var Hh=Yr.ReactCurrentOwner,Yt=!1;function At(e,t,n,a){t.child=e===null?om(t,null,n,a):fa(t,e.child,n,a)}function Xd(e,t,n,a,s){n=n.render;var o=t.ref;return la(t,s),a=zc(e,t,n,a,o,s),n=$c(),e!==null&&!Yt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Vr(e,t,s)):(st&&n&&xc(t),t.flags|=1,At(e,t,a,s),t.child)}function Kd(e,t,n,a,s){if(e===null){var o=n.type;return typeof o=="function"&&!Dc(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Tm(e,t,o,a,s)):(e=io(n.type,null,a,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:as,n(i,a)&&e.ref===t.ref)return Vr(e,t,s)}return t.flags|=1,e=mn(o,a),e.ref=t.ref,e.return=t,t.child=e}function Tm(e,t,n,a,s){if(e!==null){var o=e.memoizedProps;if(as(o,a)&&e.ref===t.ref)if(Yt=!1,t.pendingProps=a=o,(e.lanes&s)!==0)e.flags&131072&&(Yt=!0);else return t.lanes=e.lanes,Vr(e,t,s)}return zl(e,t,n,a,s)}function Pm(e,t,n){var a=t.pendingProps,s=a.children,o=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Je(na,Zt),Zt|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Je(na,Zt),Zt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=o!==null?o.baseLanes:n,Je(na,Zt),Zt|=a}else o!==null?(a=o.baseLanes|n,t.memoizedState=null):a=n,Je(na,Zt),Zt|=a;return At(e,t,s,n),t.child}function Rm(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function zl(e,t,n,a,s){var o=Kt(n)?Pn:It.current;return o=pa(t,o),la(t,s),n=zc(e,t,n,a,o,s),a=$c(),e!==null&&!Yt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,Vr(e,t,s)):(st&&a&&xc(t),t.flags|=1,At(e,t,n,s),t.child)}function qd(e,t,n,a,s){if(Kt(n)){var o=!0;ko(t)}else o=!1;if(la(t,s),t.stateNode===null)ao(e,t),zm(t,n,a),Cl(t,n,a,s),a=!0;else if(e===null){var i=t.stateNode,c=t.memoizedProps;i.props=c;var l=i.context,d=n.contextType;typeof d=="object"&&d!==null?d=cr(d):(d=Kt(n)?Pn:It.current,d=pa(t,d));var m=n.getDerivedStateFromProps,g=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==a||l!==d)&&Vd(t,i,a,d),Zr=!1;var p=t.memoizedState;i.state=p,Co(t,a,i,s),l=t.memoizedState,c!==a||p!==l||Xt.current||Zr?(typeof m=="function"&&(Sl(t,n,m,a),l=t.memoizedState),(c=Zr||Ud(t,n,c,a,p,l,d))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=l),i.props=a,i.state=l,i.context=d,a=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,lm(e,t),c=t.memoizedProps,d=t.type===t.elementType?c:pr(t.type,c),i.props=d,g=t.pendingProps,p=i.context,l=n.contextType,typeof l=="object"&&l!==null?l=cr(l):(l=Kt(n)?Pn:It.current,l=pa(t,l));var x=n.getDerivedStateFromProps;(m=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==g||p!==l)&&Vd(t,i,a,l),Zr=!1,p=t.memoizedState,i.state=p,Co(t,a,i,s);var b=t.memoizedState;c!==g||p!==b||Xt.current||Zr?(typeof x=="function"&&(Sl(t,n,x,a),b=t.memoizedState),(d=Zr||Ud(t,n,d,a,p,b,l)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,b,l),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,b,l)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=b),i.props=a,i.state=b,i.context=l,a=d):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),a=!1)}return $l(e,t,n,a,o,s)}function $l(e,t,n,a,s,o){Rm(e,t);var i=(t.flags&128)!==0;if(!a&&!i)return s&&Id(t,n,!1),Vr(e,t,o);a=t.stateNode,Hh.current=t;var c=i&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&i?(t.child=fa(t,e.child,null,o),t.child=fa(t,null,c,o)):At(e,t,c,o),t.memoizedState=a.state,s&&Id(t,n,!0),t.child}function Im(e){var t=e.stateNode;t.pendingContext?Rd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Rd(e,t.context,!1),_c(e,t.containerInfo)}function Qd(e,t,n,a,s){return ma(),bc(s),t.flags|=256,At(e,t,n,a),t.child}var El={dehydrated:null,treeContext:null,retryLane:0};function Tl(e){return{baseLanes:e,cachePool:null,transitions:null}}function Lm(e,t,n){var a=t.pendingProps,s=ct.current,o=!1,i=(t.flags&128)!==0,c;if((c=i)||(c=e!==null&&e.memoizedState===null?!1:(s&2)!==0),c?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),Je(ct,s&1),e===null)return Nl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=a.children,e=a.fallback,o?(a=t.mode,o=t.child,i={mode:"hidden",children:i},!(a&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=ri(i,a,0,null),e=En(e,a,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=Tl(n),t.memoizedState=El,e):Pc(t,i));if(s=e.memoizedState,s!==null&&(c=s.dehydrated,c!==null))return Yh(e,t,i,a,c,s,n);if(o){o=a.fallback,i=t.mode,s=e.child,c=s.sibling;var l={mode:"hidden",children:a.children};return!(i&1)&&t.child!==s?(a=t.child,a.childLanes=0,a.pendingProps=l,t.deletions=null):(a=mn(s,l),a.subtreeFlags=s.subtreeFlags&14680064),c!==null?o=mn(c,o):(o=En(o,i,n,null),o.flags|=2),o.return=t,a.return=t,a.sibling=o,t.child=a,a=o,o=t.child,i=e.child.memoizedState,i=i===null?Tl(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=El,a}return o=e.child,e=o.sibling,a=mn(o,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function Pc(e,t){return t=ri({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Fs(e,t,n,a){return a!==null&&bc(a),fa(t,e.child,null,n),e=Pc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Yh(e,t,n,a,s,o,i){if(n)return t.flags&256?(t.flags&=-257,a=Pi(Error(ee(422))),Fs(e,t,i,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=a.fallback,s=t.mode,a=ri({mode:"visible",children:a.children},s,0,null),o=En(o,s,i,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,t.mode&1&&fa(t,e.child,null,i),t.child.memoizedState=Tl(i),t.memoizedState=El,o);if(!(t.mode&1))return Fs(e,t,i,null);if(s.data==="$!"){if(a=s.nextSibling&&s.nextSibling.dataset,a)var c=a.dgst;return a=c,o=Error(ee(419)),a=Pi(o,a,void 0),Fs(e,t,i,a)}if(c=(i&e.childLanes)!==0,Yt||c){if(a=Ct,a!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(a.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,Ur(e,s),xr(a,e,s,-1))}return Fc(),a=Pi(Error(ee(421))),Fs(e,t,i,a)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=sg.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,er=cn(s.nextSibling),tr=t,st=!0,fr=null,e!==null&&(sr[or++]=Or,sr[or++]=Fr,sr[or++]=Rn,Or=e.id,Fr=e.overflow,Rn=t),t=Pc(t,a.children),t.flags|=4096,t)}function Jd(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),_l(e.return,t,n)}function Ri(e,t,n,a,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=a,o.tail=n,o.tailMode=s)}function Am(e,t,n){var a=t.pendingProps,s=a.revealOrder,o=a.tail;if(At(e,t,a.children,n),a=ct.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Jd(e,n,t);else if(e.tag===19)Jd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(Je(ct,a),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&Mo(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Ri(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Mo(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Ri(t,!0,n,null,o);break;case"together":Ri(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ao(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Vr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ln|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(ee(153));if(t.child!==null){for(e=t.child,n=mn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=mn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Gh(e,t,n){switch(t.tag){case 3:Im(t),ma();break;case 5:cm(t);break;case 1:Kt(t.type)&&ko(t);break;case 4:_c(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,s=t.memoizedProps.value;Je(_o,a._currentValue),a._currentValue=s;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(Je(ct,ct.current&1),t.flags|=128,null):n&t.child.childLanes?Lm(e,t,n):(Je(ct,ct.current&1),e=Vr(e,t,n),e!==null?e.sibling:null);Je(ct,ct.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return Am(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Je(ct,ct.current),a)break;return null;case 22:case 23:return t.lanes=0,Pm(e,t,n)}return Vr(e,t,n)}var Om,Pl,Fm,Dm;Om=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Pl=function(){};Fm=function(e,t,n,a){var s=e.memoizedProps;if(s!==a){e=t.stateNode,Mn(zr.current);var o=null;switch(n){case"input":s=tl(e,s),a=tl(e,a),o=[];break;case"select":s=ut({},s,{value:void 0}),a=ut({},a,{value:void 0}),o=[];break;case"textarea":s=al(e,s),a=al(e,a),o=[];break;default:typeof s.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=yo)}ol(n,a);var i;n=null;for(d in s)if(!a.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var c=s[d];for(i in c)c.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Qa.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in a){var l=a[d];if(c=s!=null?s[d]:void 0,a.hasOwnProperty(d)&&l!==c&&(l!=null||c!=null))if(d==="style")if(c){for(i in c)!c.hasOwnProperty(i)||l&&l.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in l)l.hasOwnProperty(i)&&c[i]!==l[i]&&(n||(n={}),n[i]=l[i])}else n||(o||(o=[]),o.push(d,n)),n=l;else d==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(o=o||[]).push(d,l)):d==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(d,""+l):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Qa.hasOwnProperty(d)?(l!=null&&d==="onScroll"&&tt("scroll",e),o||c===l||(o=[])):(o=o||[]).push(d,l))}n&&(o=o||[]).push("style",n);var d=o;(t.updateQueue=d)&&(t.flags|=4)}};Dm=function(e,t,n,a){n!==a&&(t.flags|=4)};function za(e,t){if(!st)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Pt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags&14680064,a|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,a|=s.subtreeFlags,a|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function Xh(e,t,n){var a=t.pendingProps;switch(vc(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pt(t),null;case 1:return Kt(t.type)&&wo(),Pt(t),null;case 3:return a=t.stateNode,ha(),rt(Xt),rt(It),Cc(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(As(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,fr!==null&&(Bl(fr),fr=null))),Pl(e,t),Pt(t),null;case 5:Sc(t);var s=Mn(cs.current);if(n=t.type,e!==null&&t.stateNode!=null)Fm(e,t,n,a,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(ee(166));return Pt(t),null}if(e=Mn(zr.current),As(t)){a=t.stateNode,n=t.type;var o=t.memoizedProps;switch(a[Cr]=t,a[is]=o,e=(t.mode&1)!==0,n){case"dialog":tt("cancel",a),tt("close",a);break;case"iframe":case"object":case"embed":tt("load",a);break;case"video":case"audio":for(s=0;s<Aa.length;s++)tt(Aa[s],a);break;case"source":tt("error",a);break;case"img":case"image":case"link":tt("error",a),tt("load",a);break;case"details":tt("toggle",a);break;case"input":id(a,o),tt("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!o.multiple},tt("invalid",a);break;case"textarea":cd(a,o),tt("invalid",a)}ol(n,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var c=o[i];i==="children"?typeof c=="string"?a.textContent!==c&&(o.suppressHydrationWarning!==!0&&Ls(a.textContent,c,e),s=["children",c]):typeof c=="number"&&a.textContent!==""+c&&(o.suppressHydrationWarning!==!0&&Ls(a.textContent,c,e),s=["children",""+c]):Qa.hasOwnProperty(i)&&c!=null&&i==="onScroll"&&tt("scroll",a)}switch(n){case"input":Ms(a),ld(a,o,!0);break;case"textarea":Ms(a),dd(a);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(a.onclick=yo)}a=s,t.updateQueue=a,a!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=fp(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=i.createElement(n,{is:a.is}):(e=i.createElement(n),n==="select"&&(i=e,a.multiple?i.multiple=!0:a.size&&(i.size=a.size))):e=i.createElementNS(e,n),e[Cr]=t,e[is]=a,Om(e,t,!1,!1),t.stateNode=e;e:{switch(i=il(n,a),n){case"dialog":tt("cancel",e),tt("close",e),s=a;break;case"iframe":case"object":case"embed":tt("load",e),s=a;break;case"video":case"audio":for(s=0;s<Aa.length;s++)tt(Aa[s],e);s=a;break;case"source":tt("error",e),s=a;break;case"img":case"image":case"link":tt("error",e),tt("load",e),s=a;break;case"details":tt("toggle",e),s=a;break;case"input":id(e,a),s=tl(e,a),tt("invalid",e);break;case"option":s=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},s=ut({},a,{value:void 0}),tt("invalid",e);break;case"textarea":cd(e,a),s=al(e,a),tt("invalid",e);break;default:s=a}ol(n,s),c=s;for(o in c)if(c.hasOwnProperty(o)){var l=c[o];o==="style"?xp(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&hp(e,l)):o==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ja(e,l):typeof l=="number"&&Ja(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Qa.hasOwnProperty(o)?l!=null&&o==="onScroll"&&tt("scroll",e):l!=null&&nc(e,o,l,i))}switch(n){case"input":Ms(e),ld(e,a,!1);break;case"textarea":Ms(e),dd(e);break;case"option":a.value!=null&&e.setAttribute("value",""+fn(a.value));break;case"select":e.multiple=!!a.multiple,o=a.value,o!=null?aa(e,!!a.multiple,o,!1):a.defaultValue!=null&&aa(e,!!a.multiple,a.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=yo)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Pt(t),null;case 6:if(e&&t.stateNode!=null)Dm(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(ee(166));if(n=Mn(cs.current),Mn(zr.current),As(t)){if(a=t.stateNode,n=t.memoizedProps,a[Cr]=t,(o=a.nodeValue!==n)&&(e=tr,e!==null))switch(e.tag){case 3:Ls(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ls(a.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[Cr]=t,t.stateNode=a}return Pt(t),null;case 13:if(rt(ct),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(st&&er!==null&&t.mode&1&&!(t.flags&128))am(),ma(),t.flags|=98560,o=!1;else if(o=As(t),a!==null&&a.dehydrated!==null){if(e===null){if(!o)throw Error(ee(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(ee(317));o[Cr]=t}else ma(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pt(t),o=!1}else fr!==null&&(Bl(fr),fr=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||ct.current&1?Nt===0&&(Nt=3):Fc())),t.updateQueue!==null&&(t.flags|=4),Pt(t),null);case 4:return ha(),Pl(e,t),e===null&&ss(t.stateNode.containerInfo),Pt(t),null;case 10:return kc(t.type._context),Pt(t),null;case 17:return Kt(t.type)&&wo(),Pt(t),null;case 19:if(rt(ct),o=t.memoizedState,o===null)return Pt(t),null;if(a=(t.flags&128)!==0,i=o.rendering,i===null)if(a)za(o,!1);else{if(Nt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=Mo(e),i!==null){for(t.flags|=128,za(o,!1),a=i.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)o=n,e=a,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Je(ct,ct.current&1|2),t.child}e=e.sibling}o.tail!==null&&xt()>xa&&(t.flags|=128,a=!0,za(o,!1),t.lanes=4194304)}else{if(!a)if(e=Mo(i),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),za(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!st)return Pt(t),null}else 2*xt()-o.renderingStartTime>xa&&n!==1073741824&&(t.flags|=128,a=!0,za(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=xt(),t.sibling=null,n=ct.current,Je(ct,a?n&1|2:n&1),t):(Pt(t),null);case 22:case 23:return Oc(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?Zt&1073741824&&(Pt(t),t.subtreeFlags&6&&(t.flags|=8192)):Pt(t),null;case 24:return null;case 25:return null}throw Error(ee(156,t.tag))}function Kh(e,t){switch(vc(t),t.tag){case 1:return Kt(t.type)&&wo(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ha(),rt(Xt),rt(It),Cc(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Sc(t),null;case 13:if(rt(ct),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(ee(340));ma()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return rt(ct),null;case 4:return ha(),null;case 10:return kc(t.type._context),null;case 22:case 23:return Oc(),null;case 24:return null;default:return null}}var Ds=!1,Rt=!1,qh=typeof WeakSet=="function"?WeakSet:Set,fe=null;function ra(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){ht(e,t,a)}else n.current=null}function Rl(e,t,n){try{n()}catch(a){ht(e,t,a)}}var Zd=!1;function Qh(e,t){if(xl=xo,e=Hp(),gc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var s=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,c=-1,l=-1,d=0,m=0,g=e,p=null;t:for(;;){for(var x;g!==n||s!==0&&g.nodeType!==3||(c=i+s),g!==o||a!==0&&g.nodeType!==3||(l=i+a),g.nodeType===3&&(i+=g.nodeValue.length),(x=g.firstChild)!==null;)p=g,g=x;for(;;){if(g===e)break t;if(p===n&&++d===s&&(c=i),p===o&&++m===a&&(l=i),(x=g.nextSibling)!==null)break;g=p,p=g.parentNode}g=x}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(vl={focusedElem:e,selectionRange:n},xo=!1,fe=t;fe!==null;)if(t=fe,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,fe=e;else for(;fe!==null;){t=fe;try{var b=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var k=b.memoizedProps,j=b.memoizedState,f=t.stateNode,h=f.getSnapshotBeforeUpdate(t.elementType===t.type?k:pr(t.type,k),j);f.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var v=t.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ee(163))}}catch(N){ht(t,t.return,N)}if(e=t.sibling,e!==null){e.return=t.return,fe=e;break}fe=t.return}return b=Zd,Zd=!1,b}function Xa(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var s=a=a.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&Rl(t,n,o)}s=s.next}while(s!==a)}}function ei(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function Il(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Bm(e){var t=e.alternate;t!==null&&(e.alternate=null,Bm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Cr],delete t[is],delete t[wl],delete t[Ph],delete t[Rh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Wm(e){return e.tag===5||e.tag===3||e.tag===4}function eu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ll(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=yo));else if(a!==4&&(e=e.child,e!==null))for(Ll(e,t,n),e=e.sibling;e!==null;)Ll(e,t,n),e=e.sibling}function Al(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Al(e,t,n),e=e.sibling;e!==null;)Al(e,t,n),e=e.sibling}var Mt=null,mr=!1;function Qr(e,t,n){for(n=n.child;n!==null;)Um(e,t,n),n=n.sibling}function Um(e,t,n){if(Mr&&typeof Mr.onCommitFiberUnmount=="function")try{Mr.onCommitFiberUnmount(Yo,n)}catch{}switch(n.tag){case 5:Rt||ra(n,t);case 6:var a=Mt,s=mr;Mt=null,Qr(e,t,n),Mt=a,mr=s,Mt!==null&&(mr?(e=Mt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Mt.removeChild(n.stateNode));break;case 18:Mt!==null&&(mr?(e=Mt,n=n.stateNode,e.nodeType===8?Ci(e.parentNode,n):e.nodeType===1&&Ci(e,n),rs(e)):Ci(Mt,n.stateNode));break;case 4:a=Mt,s=mr,Mt=n.stateNode.containerInfo,mr=!0,Qr(e,t,n),Mt=a,mr=s;break;case 0:case 11:case 14:case 15:if(!Rt&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){s=a=a.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&Rl(n,t,i),s=s.next}while(s!==a)}Qr(e,t,n);break;case 1:if(!Rt&&(ra(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(c){ht(n,t,c)}Qr(e,t,n);break;case 21:Qr(e,t,n);break;case 22:n.mode&1?(Rt=(a=Rt)||n.memoizedState!==null,Qr(e,t,n),Rt=a):Qr(e,t,n);break;default:Qr(e,t,n)}}function tu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new qh),t.forEach(function(a){var s=og.bind(null,e,a);n.has(a)||(n.add(a),a.then(s,s))})}}function ur(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var s=n[a];try{var o=e,i=t,c=i;e:for(;c!==null;){switch(c.tag){case 5:Mt=c.stateNode,mr=!1;break e;case 3:Mt=c.stateNode.containerInfo,mr=!0;break e;case 4:Mt=c.stateNode.containerInfo,mr=!0;break e}c=c.return}if(Mt===null)throw Error(ee(160));Um(o,i,s),Mt=null,mr=!1;var l=s.alternate;l!==null&&(l.return=null),s.return=null}catch(d){ht(s,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Vm(t,e),t=t.sibling}function Vm(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ur(t,e),_r(e),a&4){try{Xa(3,e,e.return),ei(3,e)}catch(k){ht(e,e.return,k)}try{Xa(5,e,e.return)}catch(k){ht(e,e.return,k)}}break;case 1:ur(t,e),_r(e),a&512&&n!==null&&ra(n,n.return);break;case 5:if(ur(t,e),_r(e),a&512&&n!==null&&ra(n,n.return),e.flags&32){var s=e.stateNode;try{Ja(s,"")}catch(k){ht(e,e.return,k)}}if(a&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c==="input"&&o.type==="radio"&&o.name!=null&&pp(s,o),il(c,i);var d=il(c,o);for(i=0;i<l.length;i+=2){var m=l[i],g=l[i+1];m==="style"?xp(s,g):m==="dangerouslySetInnerHTML"?hp(s,g):m==="children"?Ja(s,g):nc(s,m,g,d)}switch(c){case"input":rl(s,o);break;case"textarea":mp(s,o);break;case"select":var p=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var x=o.value;x!=null?aa(s,!!o.multiple,x,!1):p!==!!o.multiple&&(o.defaultValue!=null?aa(s,!!o.multiple,o.defaultValue,!0):aa(s,!!o.multiple,o.multiple?[]:"",!1))}s[is]=o}catch(k){ht(e,e.return,k)}}break;case 6:if(ur(t,e),_r(e),a&4){if(e.stateNode===null)throw Error(ee(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(k){ht(e,e.return,k)}}break;case 3:if(ur(t,e),_r(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{rs(t.containerInfo)}catch(k){ht(e,e.return,k)}break;case 4:ur(t,e),_r(e);break;case 13:ur(t,e),_r(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(Lc=xt())),a&4&&tu(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Rt=(d=Rt)||m,ur(t,e),Rt=d):ur(t,e),_r(e),a&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!m&&e.mode&1)for(fe=e,m=e.child;m!==null;){for(g=fe=m;fe!==null;){switch(p=fe,x=p.child,p.tag){case 0:case 11:case 14:case 15:Xa(4,p,p.return);break;case 1:ra(p,p.return);var b=p.stateNode;if(typeof b.componentWillUnmount=="function"){a=p,n=p.return;try{t=a,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(k){ht(a,n,k)}}break;case 5:ra(p,p.return);break;case 22:if(p.memoizedState!==null){nu(g);continue}}x!==null?(x.return=p,fe=x):nu(g)}m=m.sibling}e:for(m=null,g=e;;){if(g.tag===5){if(m===null){m=g;try{s=g.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(c=g.stateNode,l=g.memoizedProps.style,i=l!=null&&l.hasOwnProperty("display")?l.display:null,c.style.display=gp("display",i))}catch(k){ht(e,e.return,k)}}}else if(g.tag===6){if(m===null)try{g.stateNode.nodeValue=d?"":g.memoizedProps}catch(k){ht(e,e.return,k)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;m===g&&(m=null),g=g.return}m===g&&(m=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:ur(t,e),_r(e),a&4&&tu(e);break;case 21:break;default:ur(t,e),_r(e)}}function _r(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Wm(n)){var a=n;break e}n=n.return}throw Error(ee(160))}switch(a.tag){case 5:var s=a.stateNode;a.flags&32&&(Ja(s,""),a.flags&=-33);var o=eu(e);Al(e,o,s);break;case 3:case 4:var i=a.stateNode.containerInfo,c=eu(e);Ll(e,c,i);break;default:throw Error(ee(161))}}catch(l){ht(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Jh(e,t,n){fe=e,Hm(e)}function Hm(e,t,n){for(var a=(e.mode&1)!==0;fe!==null;){var s=fe,o=s.child;if(s.tag===22&&a){var i=s.memoizedState!==null||Ds;if(!i){var c=s.alternate,l=c!==null&&c.memoizedState!==null||Rt;c=Ds;var d=Rt;if(Ds=i,(Rt=l)&&!d)for(fe=s;fe!==null;)i=fe,l=i.child,i.tag===22&&i.memoizedState!==null?au(s):l!==null?(l.return=i,fe=l):au(s);for(;o!==null;)fe=o,Hm(o),o=o.sibling;fe=s,Ds=c,Rt=d}ru(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,fe=o):ru(e)}}function ru(e){for(;fe!==null;){var t=fe;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Rt||ei(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!Rt)if(n===null)a.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:pr(t.type,n.memoizedProps);a.componentDidUpdate(s,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Dd(t,o,a);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Dd(t,i,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var m=d.memoizedState;if(m!==null){var g=m.dehydrated;g!==null&&rs(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ee(163))}Rt||t.flags&512&&Il(t)}catch(p){ht(t,t.return,p)}}if(t===e){fe=null;break}if(n=t.sibling,n!==null){n.return=t.return,fe=n;break}fe=t.return}}function nu(e){for(;fe!==null;){var t=fe;if(t===e){fe=null;break}var n=t.sibling;if(n!==null){n.return=t.return,fe=n;break}fe=t.return}}function au(e){for(;fe!==null;){var t=fe;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ei(4,t)}catch(l){ht(t,n,l)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var s=t.return;try{a.componentDidMount()}catch(l){ht(t,s,l)}}var o=t.return;try{Il(t)}catch(l){ht(t,o,l)}break;case 5:var i=t.return;try{Il(t)}catch(l){ht(t,i,l)}}}catch(l){ht(t,t.return,l)}if(t===e){fe=null;break}var c=t.sibling;if(c!==null){c.return=t.return,fe=c;break}fe=t.return}}var Zh=Math.ceil,Eo=Yr.ReactCurrentDispatcher,Rc=Yr.ReactCurrentOwner,lr=Yr.ReactCurrentBatchConfig,We=0,Ct=null,yt=null,zt=0,Zt=0,na=xn(0),Nt=0,ms=null,Ln=0,ti=0,Ic=0,Ka=null,Ht=null,Lc=0,xa=1/0,Lr=null,To=!1,Ol=null,un=null,Bs=!1,an=null,Po=0,qa=0,Fl=null,so=-1,oo=0;function Ot(){return We&6?xt():so!==-1?so:so=xt()}function pn(e){return e.mode&1?We&2&&zt!==0?zt&-zt:Lh.transition!==null?(oo===0&&(oo=zp()),oo):(e=Ye,e!==0||(e=window.event,e=e===void 0?16:Lp(e.type)),e):1}function xr(e,t,n,a){if(50<qa)throw qa=0,Fl=null,Error(ee(185));bs(e,n,a),(!(We&2)||e!==Ct)&&(e===Ct&&(!(We&2)&&(ti|=n),Nt===4&&rn(e,zt)),qt(e,a),n===1&&We===0&&!(t.mode&1)&&(xa=xt()+500,Qo&&vn()))}function qt(e,t){var n=e.callbackNode;L0(e,t);var a=go(e,e===Ct?zt:0);if(a===0)n!==null&&md(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&md(n),t===1)e.tag===0?Ih(su.bind(null,e)):tm(su.bind(null,e)),Eh(function(){!(We&6)&&vn()}),n=null;else{switch($p(a)){case 1:n=lc;break;case 4:n=Cp;break;case 16:n=ho;break;case 536870912:n=Mp;break;default:n=ho}n=Zm(n,Ym.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Ym(e,t){if(so=-1,oo=0,We&6)throw Error(ee(327));var n=e.callbackNode;if(ca()&&e.callbackNode!==n)return null;var a=go(e,e===Ct?zt:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=Ro(e,a);else{t=a;var s=We;We|=2;var o=Xm();(Ct!==e||zt!==t)&&(Lr=null,xa=xt()+500,$n(e,t));do try{rg();break}catch(c){Gm(e,c)}while(!0);wc(),Eo.current=o,We=s,yt!==null?t=0:(Ct=null,zt=0,t=Nt)}if(t!==0){if(t===2&&(s=pl(e),s!==0&&(a=s,t=Dl(e,s))),t===1)throw n=ms,$n(e,0),rn(e,a),qt(e,xt()),n;if(t===6)rn(e,a);else{if(s=e.current.alternate,!(a&30)&&!eg(s)&&(t=Ro(e,a),t===2&&(o=pl(e),o!==0&&(a=o,t=Dl(e,o))),t===1))throw n=ms,$n(e,0),rn(e,a),qt(e,xt()),n;switch(e.finishedWork=s,e.finishedLanes=a,t){case 0:case 1:throw Error(ee(345));case 2:_n(e,Ht,Lr);break;case 3:if(rn(e,a),(a&130023424)===a&&(t=Lc+500-xt(),10<t)){if(go(e,0)!==0)break;if(s=e.suspendedLanes,(s&a)!==a){Ot(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=yl(_n.bind(null,e,Ht,Lr),t);break}_n(e,Ht,Lr);break;case 4:if(rn(e,a),(a&4194240)===a)break;for(t=e.eventTimes,s=-1;0<a;){var i=31-gr(a);o=1<<i,i=t[i],i>s&&(s=i),a&=~o}if(a=s,a=xt()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Zh(a/1960))-a,10<a){e.timeoutHandle=yl(_n.bind(null,e,Ht,Lr),a);break}_n(e,Ht,Lr);break;case 5:_n(e,Ht,Lr);break;default:throw Error(ee(329))}}}return qt(e,xt()),e.callbackNode===n?Ym.bind(null,e):null}function Dl(e,t){var n=Ka;return e.current.memoizedState.isDehydrated&&($n(e,t).flags|=256),e=Ro(e,t),e!==2&&(t=Ht,Ht=n,t!==null&&Bl(t)),e}function Bl(e){Ht===null?Ht=e:Ht.push.apply(Ht,e)}function eg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var s=n[a],o=s.getSnapshot;s=s.value;try{if(!vr(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function rn(e,t){for(t&=~Ic,t&=~ti,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-gr(t),a=1<<n;e[n]=-1,t&=~a}}function su(e){if(We&6)throw Error(ee(327));ca();var t=go(e,0);if(!(t&1))return qt(e,xt()),null;var n=Ro(e,t);if(e.tag!==0&&n===2){var a=pl(e);a!==0&&(t=a,n=Dl(e,a))}if(n===1)throw n=ms,$n(e,0),rn(e,t),qt(e,xt()),n;if(n===6)throw Error(ee(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,_n(e,Ht,Lr),qt(e,xt()),null}function Ac(e,t){var n=We;We|=1;try{return e(t)}finally{We=n,We===0&&(xa=xt()+500,Qo&&vn())}}function An(e){an!==null&&an.tag===0&&!(We&6)&&ca();var t=We;We|=1;var n=lr.transition,a=Ye;try{if(lr.transition=null,Ye=1,e)return e()}finally{Ye=a,lr.transition=n,We=t,!(We&6)&&vn()}}function Oc(){Zt=na.current,rt(na)}function $n(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,$h(n)),yt!==null)for(n=yt.return;n!==null;){var a=n;switch(vc(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&wo();break;case 3:ha(),rt(Xt),rt(It),Cc();break;case 5:Sc(a);break;case 4:ha();break;case 13:rt(ct);break;case 19:rt(ct);break;case 10:kc(a.type._context);break;case 22:case 23:Oc()}n=n.return}if(Ct=e,yt=e=mn(e.current,null),zt=Zt=t,Nt=0,ms=null,Ic=ti=Ln=0,Ht=Ka=null,Cn!==null){for(t=0;t<Cn.length;t++)if(n=Cn[t],a=n.interleaved,a!==null){n.interleaved=null;var s=a.next,o=n.pending;if(o!==null){var i=o.next;o.next=s,a.next=i}n.pending=a}Cn=null}return e}function Gm(e,t){do{var n=yt;try{if(wc(),ro.current=$o,zo){for(var a=dt.memoizedState;a!==null;){var s=a.queue;s!==null&&(s.pending=null),a=a.next}zo=!1}if(In=0,St=jt=dt=null,Ga=!1,ds=0,Rc.current=null,n===null||n.return===null){Nt=1,ms=t,yt=null;break}e:{var o=e,i=n.return,c=n,l=t;if(t=zt,c.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=l,m=c,g=m.tag;if(!(m.mode&1)&&(g===0||g===11||g===15)){var p=m.alternate;p?(m.updateQueue=p.updateQueue,m.memoizedState=p.memoizedState,m.lanes=p.lanes):(m.updateQueue=null,m.memoizedState=null)}var x=Yd(i);if(x!==null){x.flags&=-257,Gd(x,i,c,o,t),x.mode&1&&Hd(o,d,t),t=x,l=d;var b=t.updateQueue;if(b===null){var k=new Set;k.add(l),t.updateQueue=k}else b.add(l);break e}else{if(!(t&1)){Hd(o,d,t),Fc();break e}l=Error(ee(426))}}else if(st&&c.mode&1){var j=Yd(i);if(j!==null){!(j.flags&65536)&&(j.flags|=256),Gd(j,i,c,o,t),bc(ga(l,c));break e}}o=l=ga(l,c),Nt!==4&&(Nt=2),Ka===null?Ka=[o]:Ka.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var f=$m(o,l,t);Fd(o,f);break e;case 1:c=l;var h=o.type,v=o.stateNode;if(!(o.flags&128)&&(typeof h.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(un===null||!un.has(v)))){o.flags|=65536,t&=-t,o.lanes|=t;var N=Em(o,c,t);Fd(o,N);break e}}o=o.return}while(o!==null)}qm(n)}catch(w){t=w,yt===n&&n!==null&&(yt=n=n.return);continue}break}while(!0)}function Xm(){var e=Eo.current;return Eo.current=$o,e===null?$o:e}function Fc(){(Nt===0||Nt===3||Nt===2)&&(Nt=4),Ct===null||!(Ln&268435455)&&!(ti&268435455)||rn(Ct,zt)}function Ro(e,t){var n=We;We|=2;var a=Xm();(Ct!==e||zt!==t)&&(Lr=null,$n(e,t));do try{tg();break}catch(s){Gm(e,s)}while(!0);if(wc(),We=n,Eo.current=a,yt!==null)throw Error(ee(261));return Ct=null,zt=0,Nt}function tg(){for(;yt!==null;)Km(yt)}function rg(){for(;yt!==null&&!C0();)Km(yt)}function Km(e){var t=Jm(e.alternate,e,Zt);e.memoizedProps=e.pendingProps,t===null?qm(e):yt=t,Rc.current=null}function qm(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Kh(n,t),n!==null){n.flags&=32767,yt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Nt=6,yt=null;return}}else if(n=Xh(n,t,Zt),n!==null){yt=n;return}if(t=t.sibling,t!==null){yt=t;return}yt=t=e}while(t!==null);Nt===0&&(Nt=5)}function _n(e,t,n){var a=Ye,s=lr.transition;try{lr.transition=null,Ye=1,ng(e,t,n,a)}finally{lr.transition=s,Ye=a}return null}function ng(e,t,n,a){do ca();while(an!==null);if(We&6)throw Error(ee(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(ee(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(A0(e,o),e===Ct&&(yt=Ct=null,zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Bs||(Bs=!0,Zm(ho,function(){return ca(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=lr.transition,lr.transition=null;var i=Ye;Ye=1;var c=We;We|=4,Rc.current=null,Qh(e,n),Vm(n,e),jh(vl),xo=!!xl,vl=xl=null,e.current=n,Jh(n),M0(),We=c,Ye=i,lr.transition=o}else e.current=n;if(Bs&&(Bs=!1,an=e,Po=s),o=e.pendingLanes,o===0&&(un=null),E0(n.stateNode),qt(e,xt()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],a(s.value,{componentStack:s.stack,digest:s.digest});if(To)throw To=!1,e=Ol,Ol=null,e;return Po&1&&e.tag!==0&&ca(),o=e.pendingLanes,o&1?e===Fl?qa++:(qa=0,Fl=e):qa=0,vn(),null}function ca(){if(an!==null){var e=$p(Po),t=lr.transition,n=Ye;try{if(lr.transition=null,Ye=16>e?16:e,an===null)var a=!1;else{if(e=an,an=null,Po=0,We&6)throw Error(ee(331));var s=We;for(We|=4,fe=e.current;fe!==null;){var o=fe,i=o.child;if(fe.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var d=c[l];for(fe=d;fe!==null;){var m=fe;switch(m.tag){case 0:case 11:case 15:Xa(8,m,o)}var g=m.child;if(g!==null)g.return=m,fe=g;else for(;fe!==null;){m=fe;var p=m.sibling,x=m.return;if(Bm(m),m===d){fe=null;break}if(p!==null){p.return=x,fe=p;break}fe=x}}}var b=o.alternate;if(b!==null){var k=b.child;if(k!==null){b.child=null;do{var j=k.sibling;k.sibling=null,k=j}while(k!==null)}}fe=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,fe=i;else e:for(;fe!==null;){if(o=fe,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Xa(9,o,o.return)}var f=o.sibling;if(f!==null){f.return=o.return,fe=f;break e}fe=o.return}}var h=e.current;for(fe=h;fe!==null;){i=fe;var v=i.child;if(i.subtreeFlags&2064&&v!==null)v.return=i,fe=v;else e:for(i=h;fe!==null;){if(c=fe,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:ei(9,c)}}catch(w){ht(c,c.return,w)}if(c===i){fe=null;break e}var N=c.sibling;if(N!==null){N.return=c.return,fe=N;break e}fe=c.return}}if(We=s,vn(),Mr&&typeof Mr.onPostCommitFiberRoot=="function")try{Mr.onPostCommitFiberRoot(Yo,e)}catch{}a=!0}return a}finally{Ye=n,lr.transition=t}}return!1}function ou(e,t,n){t=ga(n,t),t=$m(e,t,1),e=dn(e,t,1),t=Ot(),e!==null&&(bs(e,1,t),qt(e,t))}function ht(e,t,n){if(e.tag===3)ou(e,e,n);else for(;t!==null;){if(t.tag===3){ou(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(un===null||!un.has(a))){e=ga(n,e),e=Em(t,e,1),t=dn(t,e,1),e=Ot(),t!==null&&(bs(t,1,e),qt(t,e));break}}t=t.return}}function ag(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=Ot(),e.pingedLanes|=e.suspendedLanes&n,Ct===e&&(zt&n)===n&&(Nt===4||Nt===3&&(zt&130023424)===zt&&500>xt()-Lc?$n(e,0):Ic|=n),qt(e,t)}function Qm(e,t){t===0&&(e.mode&1?(t=Es,Es<<=1,!(Es&130023424)&&(Es=4194304)):t=1);var n=Ot();e=Ur(e,t),e!==null&&(bs(e,t,n),qt(e,n))}function sg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Qm(e,n)}function og(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(ee(314))}a!==null&&a.delete(t),Qm(e,n)}var Jm;Jm=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Xt.current)Yt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Yt=!1,Gh(e,t,n);Yt=!!(e.flags&131072)}else Yt=!1,st&&t.flags&1048576&&rm(t,No,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;ao(e,t),e=t.pendingProps;var s=pa(t,It.current);la(t,n),s=zc(null,t,a,e,s,n);var o=$c();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Kt(a)?(o=!0,ko(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Nc(t),s.updater=Zo,t.stateNode=s,s._reactInternals=t,Cl(t,a,e,n),t=$l(null,t,a,!0,o,n)):(t.tag=0,st&&o&&xc(t),At(null,t,s,n),t=t.child),t;case 16:a=t.elementType;e:{switch(ao(e,t),e=t.pendingProps,s=a._init,a=s(a._payload),t.type=a,s=t.tag=lg(a),e=pr(a,e),s){case 0:t=zl(null,t,a,e,n);break e;case 1:t=qd(null,t,a,e,n);break e;case 11:t=Xd(null,t,a,e,n);break e;case 14:t=Kd(null,t,a,pr(a.type,e),n);break e}throw Error(ee(306,a,""))}return t;case 0:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:pr(a,s),zl(e,t,a,s,n);case 1:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:pr(a,s),qd(e,t,a,s,n);case 3:e:{if(Im(t),e===null)throw Error(ee(387));a=t.pendingProps,o=t.memoizedState,s=o.element,lm(e,t),Co(t,a,null,n);var i=t.memoizedState;if(a=i.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=ga(Error(ee(423)),t),t=Qd(e,t,a,n,s);break e}else if(a!==s){s=ga(Error(ee(424)),t),t=Qd(e,t,a,n,s);break e}else for(er=cn(t.stateNode.containerInfo.firstChild),tr=t,st=!0,fr=null,n=om(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ma(),a===s){t=Vr(e,t,n);break e}At(e,t,a,n)}t=t.child}return t;case 5:return cm(t),e===null&&Nl(t),a=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,bl(a,s)?i=null:o!==null&&bl(a,o)&&(t.flags|=32),Rm(e,t),At(e,t,i,n),t.child;case 6:return e===null&&Nl(t),null;case 13:return Lm(e,t,n);case 4:return _c(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=fa(t,null,a,n):At(e,t,a,n),t.child;case 11:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:pr(a,s),Xd(e,t,a,s,n);case 7:return At(e,t,t.pendingProps,n),t.child;case 8:return At(e,t,t.pendingProps.children,n),t.child;case 12:return At(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,Je(_o,a._currentValue),a._currentValue=i,o!==null)if(vr(o.value,i)){if(o.children===s.children&&!Xt.current){t=Vr(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){i=o.child;for(var l=c.firstContext;l!==null;){if(l.context===a){if(o.tag===1){l=Dr(-1,n&-n),l.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var m=d.pending;m===null?l.next=l:(l.next=m.next,m.next=l),d.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),_l(o.return,n,t),c.lanes|=n;break}l=l.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(ee(341));i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),_l(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}At(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,a=t.pendingProps.children,la(t,n),s=cr(s),a=a(s),t.flags|=1,At(e,t,a,n),t.child;case 14:return a=t.type,s=pr(a,t.pendingProps),s=pr(a.type,s),Kd(e,t,a,s,n);case 15:return Tm(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,s=t.pendingProps,s=t.elementType===a?s:pr(a,s),ao(e,t),t.tag=1,Kt(a)?(e=!0,ko(t)):e=!1,la(t,n),zm(t,a,s),Cl(t,a,s,n),$l(null,t,a,!0,e,n);case 19:return Am(e,t,n);case 22:return Pm(e,t,n)}throw Error(ee(156,t.tag))};function Zm(e,t){return Sp(e,t)}function ig(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ir(e,t,n,a){return new ig(e,t,n,a)}function Dc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function lg(e){if(typeof e=="function")return Dc(e)?1:0;if(e!=null){if(e=e.$$typeof,e===sc)return 11;if(e===oc)return 14}return 2}function mn(e,t){var n=e.alternate;return n===null?(n=ir(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function io(e,t,n,a,s,o){var i=2;if(a=e,typeof e=="function")Dc(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case Gn:return En(n.children,s,o,t);case ac:i=8,s|=8;break;case Qi:return e=ir(12,n,t,s|2),e.elementType=Qi,e.lanes=o,e;case Ji:return e=ir(13,n,t,s),e.elementType=Ji,e.lanes=o,e;case Zi:return e=ir(19,n,t,s),e.elementType=Zi,e.lanes=o,e;case cp:return ri(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ip:i=10;break e;case lp:i=9;break e;case sc:i=11;break e;case oc:i=14;break e;case Jr:i=16,a=null;break e}throw Error(ee(130,e==null?e:typeof e,""))}return t=ir(i,n,t,s),t.elementType=e,t.type=a,t.lanes=o,t}function En(e,t,n,a){return e=ir(7,e,a,t),e.lanes=n,e}function ri(e,t,n,a){return e=ir(22,e,a,t),e.elementType=cp,e.lanes=n,e.stateNode={isHidden:!1},e}function Ii(e,t,n){return e=ir(6,e,null,t),e.lanes=n,e}function Li(e,t,n){return t=ir(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function cg(e,t,n,a,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gi(0),this.expirationTimes=gi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gi(0),this.identifierPrefix=a,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Bc(e,t,n,a,s,o,i,c,l){return e=new cg(e,t,n,c,l),t===1?(t=1,o===!0&&(t|=8)):t=0,o=ir(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Nc(o),e}function dg(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yn,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function ef(e){if(!e)return hn;e=e._reactInternals;e:{if(Dn(e)!==e||e.tag!==1)throw Error(ee(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Kt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(ee(171))}if(e.tag===1){var n=e.type;if(Kt(n))return em(e,n,t)}return t}function tf(e,t,n,a,s,o,i,c,l){return e=Bc(n,a,!0,e,s,o,i,c,l),e.context=ef(null),n=e.current,a=Ot(),s=pn(n),o=Dr(a,s),o.callback=t??null,dn(n,o,s),e.current.lanes=s,bs(e,s,a),qt(e,a),e}function ni(e,t,n,a){var s=t.current,o=Ot(),i=pn(s);return n=ef(n),t.context===null?t.context=n:t.pendingContext=n,t=Dr(o,i),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=dn(s,t,i),e!==null&&(xr(e,s,i,o),to(e,s,i)),i}function Io(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function iu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Wc(e,t){iu(e,t),(e=e.alternate)&&iu(e,t)}function ug(){return null}var rf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Uc(e){this._internalRoot=e}ai.prototype.render=Uc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(ee(409));ni(e,t,null,null)};ai.prototype.unmount=Uc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;An(function(){ni(null,e,null,null)}),t[Wr]=null}};function ai(e){this._internalRoot=e}ai.prototype.unstable_scheduleHydration=function(e){if(e){var t=Pp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<tn.length&&t!==0&&t<tn[n].priority;n++);tn.splice(n,0,e),n===0&&Ip(e)}};function Vc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function si(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function lu(){}function pg(e,t,n,a,s){if(s){if(typeof a=="function"){var o=a;a=function(){var d=Io(i);o.call(d)}}var i=tf(t,a,e,0,null,!1,!1,"",lu);return e._reactRootContainer=i,e[Wr]=i.current,ss(e.nodeType===8?e.parentNode:e),An(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof a=="function"){var c=a;a=function(){var d=Io(l);c.call(d)}}var l=Bc(e,0,!1,null,null,!1,!1,"",lu);return e._reactRootContainer=l,e[Wr]=l.current,ss(e.nodeType===8?e.parentNode:e),An(function(){ni(t,l,n,a)}),l}function oi(e,t,n,a,s){var o=n._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var c=s;s=function(){var l=Io(i);c.call(l)}}ni(t,i,e,s)}else i=pg(n,t,e,s,a);return Io(i)}Ep=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=La(t.pendingLanes);n!==0&&(cc(t,n|1),qt(t,xt()),!(We&6)&&(xa=xt()+500,vn()))}break;case 13:An(function(){var a=Ur(e,1);if(a!==null){var s=Ot();xr(a,e,1,s)}}),Wc(e,1)}};dc=function(e){if(e.tag===13){var t=Ur(e,134217728);if(t!==null){var n=Ot();xr(t,e,134217728,n)}Wc(e,134217728)}};Tp=function(e){if(e.tag===13){var t=pn(e),n=Ur(e,t);if(n!==null){var a=Ot();xr(n,e,t,a)}Wc(e,t)}};Pp=function(){return Ye};Rp=function(e,t){var n=Ye;try{return Ye=e,t()}finally{Ye=n}};cl=function(e,t,n){switch(t){case"input":if(rl(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var s=qo(a);if(!s)throw Error(ee(90));up(a),rl(a,s)}}}break;case"textarea":mp(e,n);break;case"select":t=n.value,t!=null&&aa(e,!!n.multiple,t,!1)}};yp=Ac;wp=An;var mg={usingClientEntryPoint:!1,Events:[ws,Qn,qo,vp,bp,Ac]},$a={findFiberByHostInstance:Sn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},fg={bundleType:$a.bundleType,version:$a.version,rendererPackageName:$a.rendererPackageName,rendererConfig:$a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Yr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Np(e),e===null?null:e.stateNode},findFiberByHostInstance:$a.findFiberByHostInstance||ug,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ws=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ws.isDisabled&&Ws.supportsFiber)try{Yo=Ws.inject(fg),Mr=Ws}catch{}}nr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mg;nr.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vc(t))throw Error(ee(200));return dg(e,t,null,n)};nr.createRoot=function(e,t){if(!Vc(e))throw Error(ee(299));var n=!1,a="",s=rf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Bc(e,1,!1,null,null,n,!1,a,s),e[Wr]=t.current,ss(e.nodeType===8?e.parentNode:e),new Uc(t)};nr.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(ee(188)):(e=Object.keys(e).join(","),Error(ee(268,e)));return e=Np(t),e=e===null?null:e.stateNode,e};nr.flushSync=function(e){return An(e)};nr.hydrate=function(e,t,n){if(!si(t))throw Error(ee(200));return oi(null,e,t,!0,n)};nr.hydrateRoot=function(e,t,n){if(!Vc(e))throw Error(ee(405));var a=n!=null&&n.hydratedSources||null,s=!1,o="",i=rf;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=tf(t,null,e,1,n??null,s,!1,o,i),e[Wr]=t.current,ss(e),a)for(e=0;e<a.length;e++)n=a[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new ai(t)};nr.render=function(e,t,n){if(!si(t))throw Error(ee(200));return oi(null,e,t,!1,n)};nr.unmountComponentAtNode=function(e){if(!si(e))throw Error(ee(40));return e._reactRootContainer?(An(function(){oi(null,null,e,!1,function(){e._reactRootContainer=null,e[Wr]=null})}),!0):!1};nr.unstable_batchedUpdates=Ac;nr.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!si(n))throw Error(ee(200));if(e==null||e._reactInternals===void 0)throw Error(ee(38));return oi(e,t,n,!1,a)};nr.version="18.3.1-next-f1338f8080-20240426";function nf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nf)}catch(e){console.error(e)}}nf(),np.exports=nr;var Hc=np.exports,cu=Hc;Ki.createRoot=cu.createRoot,Ki.hydrateRoot=cu.hydrateRoot;const Ai={en:{"app.title":"JT-PROXENSE","app.subtitle":"SYSTEM OVERVIEW","nav.command_center":"Dashboard","nav.cluster_core":"Nodes","nav.holo_matrix":"Matrix","nav.radar_scan":"Radar","nav.ceph":"Ceph","nav.storage":"Storage","nav.tasks":"Tasks","nav.health":"Health","nav.backups":"Backups","nav.settings":"Settings","nav.more":"More","bjobs.title":"Backup schedules","bjobs.subtitle":"Cluster-level vzdump cron jobs","bjobs.filter.enabled":"State","bjobs.col.id":"Job ID","bjobs.col.schedule":"Schedule","bjobs.col.next_run":"Next run","bjobs.col.storage":"Storage","bjobs.col.scope":"Scope","bjobs.col.mode":"Mode","bjobs.col.enabled":"Enabled","bjobs.col.comment":"Comment","bjobs.scope_all":"All VMs/CTs","bjobs.enabled_yes":"On","bjobs.enabled_no":"Off","bjobs.empty":"No scheduled backup jobs","health.title":"Health monitor","health.subtitle":"Aggregated proactive checks across every cluster","health.updated":"updated","health.sev.critical":"Critical","health.sev.warning":"Warning","health.sev.info":"Info","health.cat.node_down":"Node offline","health.cat.high_cpu":"High CPU","health.cat.high_mem":"High memory","health.cat.storage_full":"Storage almost full","health.cat.storage_high":"Storage high usage","health.cat.ceph_err":"Ceph HEALTH_ERR","health.cat.ceph_warn":"Ceph HEALTH_WARN","health.cat.task_failures":"Recent task failures","health.cat.cert_expired":"Certificate expired","health.cat.cert_expiring":"Certificate expiring","health.cat.updates":"Pending updates","health.stat.nodes":"Nodes online","health.stat.vms":"VMs running","health.stat.cts":"CTs running","health.stat.storages":"Storages","health.empty.title":"All systems nominal","health.empty.sub":"No critical or warning conditions detected.","tasks.title":"PVE task / VM operation history","tasks.subtitle":"Real PVE-side actions (qmstart / shutdown / snapshot / migrate / backup / etc.)","tasks.filter.cluster":"Cluster","tasks.filter.type":"Type","tasks.filter.status":"Status","tasks.filter.user":"User","tasks.filter.vmid":"VMID","tasks.filter.all":"All","tasks.filter.running":"Running","tasks.filter.ok":"Success","tasks.filter.error":"Error","tasks.col.starttime":"Started","tasks.col.duration":"Duration","tasks.col.type":"Type","tasks.col.target":"Target","tasks.col.user":"User","tasks.col.node":"Node","tasks.col.status":"Status","tasks.refresh":"Refresh","tasks.auto_refresh":"Auto","tasks.empty":"No tasks match the filters","tasks.loading":"Loading…","tasks.log_title":"Task log","tasks.log_loading":"Loading log…","tasks.log_empty":"No log output","tasks.copy_upid":"Copy UPID","status.connected":"Connected","status.disconnected":"Disconnected","status.connecting":"Connecting...","status.last_update":"Last Update","status.uptime":"Uptime","status.paused":"Updates Paused","status.live":"Live Updates","cluster.total":"Total Clusters","cluster.all":"All Clusters","cluster.nodes":"Nodes","cluster.nodes_online":"Nodes Online","cluster.vms":"Virtual Machines","cluster.vms_running":"VMs Running","cluster.vms_short":"VMs","cluster.cts":"Containers","cluster.cts_running":"CTs Running","cluster.cts_short":"CTs","cluster.select":"Select Cluster","cluster.galaxy":"CLUSTER GALAXY","cluster.clusters_count":"{n} CLUSTERS","cluster.view_all_vms":"VIEW ALL VMs","cluster.view_vms_in":"View VMs in {name}","dashboard.title":"DASHBOARD","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT MONITORING SYSTEM","dashboard.resource_usage":"RESOURCE USAGE","dashboard.infrastructure":"INFRASTRUCTURE","dashboard.no_clusters":"No clusters configured","dashboard.standalone":"Standalone","radar.anomalies":"ANOMALIES","radar.all_normal":"All systems normal","metric.cpu":"CPU","metric.memory":"Memory","metric.disk":"Disk","metric.network":"Network","metric.usage":"Usage","metric.total":"Total","metric.used":"Used","metric.free":"Free","metric.read":"Read","metric.write":"Write","metric.rx":"RX","metric.tx":"TX","node.status":"Status","node.online":"Online","node.offline":"Offline","node.kernel":"Kernel","node.pve_version":"PVE Version","node.open_pve":"Open in PVE Manager","node.system_info":"SYSTEM INFO","node.uptime":"Uptime","node.workloads":"Workloads","node.resource_usage":"RESOURCE USAGE","node.cores":"cores","node.io_wait":"IO Wait","node.io_wait_desc":"CPU waiting for I/O","node.root_disk":"Root Disk","node.network_io":"NETWORK I/O","node.storage":"STORAGE","node.no_storage":"No storage configured on this node","node.shared":"SHARED","node.avg_load":"AVG LOAD","vm.running":"Running","vm.stopped":"Stopped","vm.paused":"Paused","vm.template":"Template","vm.details":"View Details","vm.open_pve":"Open in PVE Manager","vm.console":"Console","vm.snapshots":"Snapshots","vm.backup_now":"Backup now","vm.task_history":"Task history","vm.perf_charts":"Performance charts","rrd.title":"Performance","rrd.tf.hour":"1H","rrd.tf.day":"24H","rrd.tf.week":"7D","rrd.tf.month":"30D","rrd.tf.year":"1Y","rrd.chart.cpu":"CPU","rrd.chart.mem":"Memory","rrd.chart.net":"Network I/O","rrd.chart.disk":"Disk I/O","rrd.loading":"Loading time-series…","rrd.empty":"No RRD data — VM may have just been created.","vm.start":"Start","vm.shutdown_acpi":"Shutdown","vm.reboot":"Reboot","vm.stop_hard":"Stop (hard)","vm.migrate_remote":"Migrate to other cluster…","confirm.destructive":"// DESTRUCTIVE ACTION","confirm.about_to_vm":"You are about to {action} VM {vmid} ({name}) on node {node} ({cluster}).","confirm.about_to_ct":"You are about to {action} CT {vmid} ({name}) on node {node} ({cluster}).","confirm.hard_stop_warning":"Hard power-off bypasses guest OS shutdown. Unsaved data may be lost.","user.account_password":"Account settings","user.totp":"Two-factor (TOTP)","user.audit":"Audit log","user.user_admin":"User management","user.sessions":"Active sessions","user.sign_out":"Sign out","rmm.title":"Migrate VM {vmid} ({name}) → other cluster","rmm.eyebrow":"// cross-cluster migrate · {step}","rmm.step.endpoint":"endpoint","rmm.step.mappings":"mappings","rmm.step.review":"review","rmm.step.submitting":"submitting","rmm.step.done":"done","rmm.step.error":"error","rmm.endpoint.intro":"Pick the target cluster's reachable IP. Once selected we auto-fetch the target node's storages, bridges, and IPs so the next step is all dropdowns.","rmm.endpoint.target":"Target endpoint","rmm.endpoint.select":"— select —","rmm.endpoint.fp_label":"TLS fingerprint (SHA-256, auto-fetched)","rmm.endpoint.fp_fetching":"fetching…","rmm.endpoint.datapath":"Migration data-path IP","rmm.endpoint.datapath_hint":"where the bytes ride","rmm.endpoint.datapath_loading":"loading interfaces…","rmm.endpoint.datapath_tip":"Pick the dedicated migration network (e.g. 172.16.100.x) so the disk mirror and memory stream do not saturate the management link.","rmm.mappings.intro":"Map each source disk and NIC to a target. Defaults pick a same-name target when available.","rmm.mappings.target_vmid":"Target VMID","rmm.mappings.target_vmid_hint":"must be free on remote","rmm.mappings.disks":"Disks → target storage","rmm.mappings.nics":"NICs → target bridge","rmm.mappings.col_source":"SOURCE","rmm.mappings.col_size":"SIZE","rmm.mappings.col_bridge":"BRIDGE","rmm.mappings.col_target_storage":"→ TARGET STORAGE","rmm.mappings.col_target_bridge":"→ TARGET BRIDGE","rmm.mappings.online":"Online (live) migration","rmm.mappings.delete_source":"Delete source after success","rmm.mappings.bwlimit":"Bandwidth limit (KB/s, blank = unlimited)","rmm.review.intro":"Final review — submitting starts a real PVE remote_migrate task.","rmm.review.from":"From","rmm.review.to":"To","rmm.review.data_path":"Data path","rmm.review.fingerprint":"Fingerprint","rmm.review.fp_none":"none — server will fetch","rmm.review.storage_map":"Storage map","rmm.review.bridge_map":"Bridge map","rmm.review.online":"Online","rmm.review.online_yes":"yes (live)","rmm.review.online_no":"no (offline)","rmm.review.delete_source":"Delete source","rmm.review.delete_source_yes":"yes","rmm.review.delete_source_no":"no — leave source intact","rmm.review.bandwidth":"Bandwidth","rmm.review.unlimited":"unlimited","rmm.action.next":"Next »","rmm.action.back":"« Back","rmm.action.review":"Review »","rmm.action.start":"Start migration »","rmm.submitting":"Submitting to PVE…","rmm.done.msg":"Migration task started.","rmm.done.upid":"UPID","rmm.done.hint":"Watch progress in the Matrix view; the source VM shows a migration task badge.","rmm.action.close":"Close","rmm.precheck.running":"Running pre-flight checks…","rmm.precheck.blockers":"Migration blocked","rmm.precheck.warnings":"Warnings — review before continuing","rmm.precheck.ok":"Pre-flight OK","rmm.action.precheck":"Re-check","dialog.notice":"Notice","dialog.confirm":"Confirm","dialog.input":"Input","dialog.ok":"OK","dialog.confirm_btn":"Confirm","console.disabled":"Console is disabled in settings.","console.vm_not_running":"VM must be running to open the console.","console.stored_no_pw":"Console mode is 'stored' but no PVE password has been set for this cluster. Set one in Settings → Clusters.","console.prompt_title":"Console password","console.prompt_body":"Enter the PVE password for {user}@{cluster}. Used once to mint a console token; never persisted.","console.prompt_label":"PVE password","console.prompt_open":"Open console »","console.prepare_failed":"Could not prepare console: {err}","settings.cluster_pve_password":"PVE password","settings.secret_set":"✓ configured","settings.secret_unset":"✗ not set","settings.secret_set_btn":"Set","settings.secret_replace":"Replace","settings.secret_clear":"Clear","settings.secret_confirm_clear":"Clear PVE password for cluster {id}?","settings.secret_pw_title":"PVE password — {id}","settings.secret_pw_body":"Stored encrypted in the local SQLite store under /etc/jt-proxense/master.key. Never written to config.yaml.","settings.secret_pw_label":"PVE root password","settings.console_section":"Console","settings.console_mode":"Authentication mode","settings.console_mode_disabled":"Disabled — show as unavailable","settings.console_mode_stored":"Stored — use cluster's saved password","settings.console_mode_prompt":"Prompt — ask each time","settings.console_mode_hint":"PVE's vncwebsocket refuses API tokens. We mint a PVEAuthCookie from a username+password instead.","mig.failed.title":"Migration failed","mig.failed.body":'VM {vmid} migration to {target} ended with errors. Source VM may be left in a "{lock}" lock state — clear it manually on the source node.',"mig.failed.cmd_hint":"Run on the source node:","mig.failed.copy":"Copy command","mig.failed.copied":"Copied","mig.failed.dismiss":"Dismiss","snap.title":"Snapshots — VM {vmid} ({name})","snap.create":"Create snapshot","snap.name":"Name","snap.description":"Description (optional)","snap.include_state":"Include RAM state","snap.rollback":"Rollback","snap.delete":"Delete","snap.confirm_delete":'Delete snapshot "{name}"?',"snap.confirm_rollback":'Rollback to "{name}"? The VM will revert to that point in time.',"snap.empty":"No snapshots yet.","snap.parent":"parent","snap.taken":"taken","backup.title":"Backup VM {vmid} ({name})","backup.storage":"Target storage","backup.no_backup_storage":"No backup-capable storage on this node.","backup.mode":"Mode","backup.mode_snapshot":"snapshot (zero downtime)","backup.mode_suspend":"suspend (brief pause)","backup.mode_stop":"stop (full stop)","backup.compress":"Compression","backup.start":"Start backup","backup.started":"Backup task started.","table.type":"Type","table.name":"Name","table.tags":"Tags","table.node":"Node","table.uptime":"Uptime","matrix.bulk.select_all":"Select all","table.task":"Task","common.shared":"Shared","common.local":"Local","common.total":"Total","ceph.health":"Health","ceph.osds":"OSDs","ceph.pools":"Pools","ceph.monitors":"Monitors","ceph.iops":"IOPS","ceph.throughput":"Throughput","ceph.recovery":"Recovery","ceph.title":"CEPH","ceph.cluster_daemons":"CLUSTER DAEMONS","ceph.osd_array":"OSD ARRAY","ceph.cluster_storage":"CLUSTER STORAGE","ceph.ceph_pools":"CEPH POOLS","ceph.cephfs_pools":"CEPHFS POOLS","ceph.in_cluster":"In Cluster","ceph.yes":"Yes","ceph.no":"No","ceph.used":"USED","ceph.total":"TOTAL","ceph.no_cluster":"No Ceph cluster detected","ceph.latency":"Latency","ceph.apply":"Apply","ceph.commit":"Commit","storage.title":"STORAGE","storage.search":"Search storage...","storage.filter_all":"ALL","storage.filter_shared":"SHARED","storage.filter_local":"LOCAL","storage.count":"{n} Storages","storage.shared_count":"{n} Shared","storage.local_count":"{n} Local","storage.section_shared":"SHARED STORAGE","storage.section_local":"LOCAL STORAGE","storage.storages_count":"{n} storage","storage.storages_plural":"{n} storages","storage.across_nodes":"across {n} node","storage.across_nodes_plural":"across {n} nodes","storage.no_storages":"No storages found","storage.content":"Content","storage.manage":"Manage","storage.total_capacity":"TOTAL CAPACITY","matrix.search":"Search VMs...","matrix.filter_all":"ALL","matrix.filter_running":"RUNNING","matrix.filter_stopped":"STOPPED","matrix.running":"Running","matrix.total":"Total","matrix.group_by":"Group","matrix.group_none":"None","matrix.group_node":"Node","matrix.group_type":"Type","matrix.group_tag":"Tag","alert.critical":"Critical","alert.warning":"Warning","alert.info":"Info","alert.none":"No alerts","alert.acknowledge":"Acknowledge","action.refresh":"Refresh","action.clear":"Clear","action.save":"Save","action.saving":"Saving…","action.cancel":"Cancel","action.close":"Close","action.expand":"Expand","action.collapse":"Collapse","time.now":"Now","time.seconds_ago":"{n} seconds ago","time.minutes_ago":"{n} minutes ago","time.hours_ago":"{n} hours ago","time.days_ago":"{n} days ago","settings.title":"Settings","settings.theme":"Theme","settings.language":"Language","settings.animations":"Animations","settings.particles":"Particle Count","settings.tab_ui":"UI","settings.tab_clusters":"Clusters","settings.tab_alerts":"Alerts","settings.tab_server":"Server","settings.default_view":"Default View","settings.vm_matrix_filter":"VM Matrix Default Filter","settings.filter_all":"All","settings.filter_running":"Running","settings.filter_stopped":"Stopped","settings.matrix_card_width":"Matrix Card Width (px)","settings.matrix_sort_by":"Matrix Sort By","settings.matrix_group_by":"Matrix Group By","settings.sort_vmid":"VMID","settings.sort_name":"Name","settings.sort_load":"Load","settings.matrix_group_sort":"Group Sorting (Cluster/Node)","settings.sort_by":"Sort","settings.sort_order":"Order","settings.sort_node":"Node","settings.sort_cluster":"Cluster","settings.sort_asc":"Ascending","settings.sort_desc":"Descending","settings.poll_interval":"Poll Interval (sec)","settings.static_refresh":"Static Refresh (sec)","settings.enabled":"Enabled","settings.disabled":"Disabled","settings.alerts_enabled":"Alerts Enabled","settings.cpu_threshold":"CPU Thresholds","settings.memory_threshold":"Memory Thresholds","settings.disk_threshold":"Storage Capacity Thresholds","settings.diskio_threshold":"Disk I/O Thresholds (MB/s)","settings.iowait_threshold":"I/O Wait Thresholds","settings.warning":"Warning","settings.critical":"Critical","settings.server_host":"Server Host","settings.http_port":"HTTP Port","settings.influx_enabled":"InfluxDB Enabled","settings.influx_port":"InfluxDB Port","settings.version":"Version","settings.restart_required":"Restart required to apply","settings.cluster_management":"Cluster Management","settings.cluster_hint":"Enable/disable clusters and configure polling intervals","settings.nodes_count":"{n} nodes","settings.auth":"Auth","settings.alert_system":"Alert System","settings.http_server":"HTTP Server","settings.host":"Host","settings.port":"Port","settings.influx_integration":"InfluxDB Integration","settings.server_restart_note":"Server settings require a restart to take effect. You can also edit config.yaml directly.","settings.particle_count":"Particle Count","settings.particle_hint":"Background particles (0-500)","settings.saving":"Saving...","loading.data":"Loading data...","loading.connecting":"Connecting to server...","error.connection_failed":"Connection failed","error.no_data":"No data available","error.not_found":"Not found"},"zh-TW":{"app.title":"JT-PROXENSE","app.subtitle":"系統總覽","nav.command_center":"概觀","nav.cluster_core":"節點","nav.holo_matrix":"矩陣","nav.radar_scan":"雷達","nav.ceph":"Ceph","nav.storage":"儲存","nav.tasks":"作業","nav.health":"健康","nav.backups":"備份","nav.settings":"設定","nav.more":"更多","bjobs.title":"備份排程","bjobs.subtitle":"叢集層級的 vzdump 排程作業","bjobs.filter.enabled":"狀態","bjobs.col.id":"排程 ID","bjobs.col.schedule":"排程時間","bjobs.col.next_run":"下次執行","bjobs.col.storage":"儲存","bjobs.col.scope":"對象","bjobs.col.mode":"模式","bjobs.col.enabled":"啟用","bjobs.col.comment":"備註","bjobs.scope_all":"全部 VM/CT","bjobs.enabled_yes":"開","bjobs.enabled_no":"關","bjobs.empty":"尚未設定備份排程","health.title":"健康監測","health.subtitle":"跨叢集的即時健康狀況彙總","health.updated":"更新於","health.sev.critical":"嚴重","health.sev.warning":"警告","health.sev.info":"資訊","health.cat.node_down":"節點離線","health.cat.high_cpu":"CPU 過高","health.cat.high_mem":"記憶體過高","health.cat.storage_full":"儲存接近滿載","health.cat.storage_high":"儲存使用率偏高","health.cat.ceph_err":"Ceph 嚴重錯誤","health.cat.ceph_warn":"Ceph 警告","health.cat.task_failures":"近期作業失敗","health.cat.cert_expired":"憑證已過期","health.cat.cert_expiring":"憑證即將到期","health.cat.updates":"套件待更新","health.stat.nodes":"節點在線","health.stat.vms":"VM 執行中","health.stat.cts":"CT 執行中","health.stat.storages":"儲存","health.empty.title":"一切正常","health.empty.sub":"目前沒有嚴重或警告等級的問題。","tasks.title":"PVE 作業 / VM 操作紀錄","tasks.subtitle":"PVE 端真實作業（qmstart / shutdown / 快照 / 遷移 / 備份 等）","tasks.filter.cluster":"叢集","tasks.filter.type":"類型","tasks.filter.status":"狀態","tasks.filter.user":"使用者","tasks.filter.vmid":"VMID","tasks.filter.all":"全部","tasks.filter.running":"進行中","tasks.filter.ok":"成功","tasks.filter.error":"錯誤","tasks.col.starttime":"開始時間","tasks.col.duration":"耗時","tasks.col.type":"類型","tasks.col.target":"對象","tasks.col.user":"使用者","tasks.col.node":"節點","tasks.col.status":"狀態","tasks.refresh":"重新整理","tasks.auto_refresh":"自動","tasks.empty":"沒有符合條件的作業","tasks.loading":"載入中…","tasks.log_title":"作業紀錄","tasks.log_loading":"載入紀錄中…","tasks.log_empty":"沒有日誌輸出","tasks.copy_upid":"複製 UPID","status.connected":"已連線","status.disconnected":"已斷線","status.connecting":"連線中...","status.last_update":"最後更新","status.uptime":"運作時間","status.paused":"更新已暫停","status.live":"即時更新","cluster.total":"叢集總數","cluster.all":"全部叢集","cluster.nodes":"節點","cluster.nodes_online":"線上節點","cluster.vms":"虛擬機","cluster.vms_running":"運作中虛擬機","cluster.vms_short":"虛擬機","cluster.cts":"容器","cluster.cts_running":"運作中容器","cluster.cts_short":"容器","cluster.select":"選擇叢集","cluster.galaxy":"叢集總覽","cluster.clusters_count":"{n} 個叢集","cluster.view_all_vms":"檢視全部虛擬機","cluster.view_vms_in":"檢視 {name} 的虛擬機","dashboard.title":"概觀","dashboard.subtitle":"PROXMOX VIRTUAL ENVIRONMENT 監控系統","dashboard.resource_usage":"資源使用率","dashboard.infrastructure":"基礎架構","dashboard.no_clusters":"尚未設定叢集","dashboard.standalone":"獨立節點","radar.anomalies":"異常","radar.all_normal":"系統正常","metric.cpu":"CPU","metric.memory":"記憶體","metric.disk":"磁碟","metric.network":"網路","metric.usage":"使用率","metric.total":"總計","metric.used":"已使用","metric.free":"可用","metric.read":"讀取","metric.write":"寫入","metric.rx":"接收","metric.tx":"傳送","node.status":"狀態","node.online":"線上","node.offline":"離線","node.kernel":"核心版本","node.pve_version":"PVE 版本","node.open_pve":"在 PVE 管理介面開啟","node.system_info":"系統資訊","node.uptime":"運作時間","node.workloads":"工作負載","node.resource_usage":"資源使用率","node.cores":"核心","node.io_wait":"IO 等待","node.io_wait_desc":"CPU 等待 I/O","node.root_disk":"系統磁碟","node.network_io":"網路 I/O","node.storage":"儲存","node.no_storage":"此節點未設定儲存","node.shared":"共用","node.avg_load":"平均負載","vm.running":"運作中","vm.stopped":"已停止","vm.paused":"已暫停","vm.template":"範本","vm.details":"檢視細節","vm.open_pve":"在 PVE Manager 開啟","vm.console":"主控台","vm.snapshots":"快照","vm.backup_now":"立即備份","vm.task_history":"作業紀錄","vm.perf_charts":"效能圖表","rrd.title":"效能歷史","rrd.tf.hour":"1 小時","rrd.tf.day":"24 小時","rrd.tf.week":"7 天","rrd.tf.month":"30 天","rrd.tf.year":"1 年","rrd.chart.cpu":"CPU","rrd.chart.mem":"記憶體","rrd.chart.net":"網路 I/O","rrd.chart.disk":"磁碟 I/O","rrd.loading":"載入時序資料…","rrd.empty":"沒有 RRD 資料 — VM 可能剛建立。","vm.start":"啟動","vm.shutdown_acpi":"關機","vm.reboot":"重新啟動","vm.stop_hard":"強制停止","vm.migrate_remote":"遷移到其他叢集…","confirm.destructive":"// 危險動作","confirm.about_to_vm":"您即將對節點 {node} ({cluster}) 上的 VM {vmid} ({name}) 執行 {action}。","confirm.about_to_ct":"您即將對節點 {node} ({cluster}) 上的 CT {vmid} ({name}) 執行 {action}。","confirm.hard_stop_warning":"硬關機會跳過 Guest OS 的關機程序，未儲存資料可能遺失。","user.account_password":"帳號設定","user.totp":"雙因素認證 (TOTP)","user.audit":"稽核記錄","user.user_admin":"使用者管理","user.sessions":"使用中工作階段","user.sign_out":"登出","rmm.title":"遷移 VM {vmid} ({name}) → 其他叢集","rmm.eyebrow":"// 跨叢集遷移 · {step}","rmm.step.endpoint":"端點","rmm.step.mappings":"對應","rmm.step.review":"檢閱","rmm.step.submitting":"送出中","rmm.step.done":"完成","rmm.step.error":"錯誤","rmm.endpoint.intro":"選擇目標叢集的可連線 IP。選擇後會自動抓取目標節點的儲存區、橋接、IP 列表，下一步即可選單操作。","rmm.endpoint.target":"目標端點","rmm.endpoint.select":"— 請選擇 —","rmm.endpoint.fp_label":"TLS 指紋 (SHA-256, 自動抓取)","rmm.endpoint.fp_fetching":"抓取中…","rmm.endpoint.datapath":"遷移資料路徑 IP","rmm.endpoint.datapath_hint":"資料走哪一段網路","rmm.endpoint.datapath_loading":"載入介面中…","rmm.endpoint.datapath_tip":"建議選擇專用的遷移網路 (如 172.16.100.x)，避免磁碟鏡像與記憶體串流佔滿管理網路。","rmm.mappings.intro":"為每個來源磁碟與網卡選擇目標。若同名選項存在，會預設為同名。","rmm.mappings.target_vmid":"目標 VMID","rmm.mappings.target_vmid_hint":"在遠端必須未被使用","rmm.mappings.disks":"磁碟 → 目標儲存區","rmm.mappings.nics":"網卡 → 目標橋接","rmm.mappings.col_source":"來源","rmm.mappings.col_size":"大小","rmm.mappings.col_bridge":"橋接","rmm.mappings.col_target_storage":"→ 目標儲存區","rmm.mappings.col_target_bridge":"→ 目標橋接","rmm.mappings.online":"線上 (即時) 遷移","rmm.mappings.delete_source":"成功後刪除來源","rmm.mappings.bwlimit":"頻寬限制 (KB/s, 空白 = 無限制)","rmm.review.intro":"最終確認 — 送出後會在 PVE 啟動真實的遷移作業。","rmm.review.from":"來源","rmm.review.to":"目標","rmm.review.data_path":"資料路徑","rmm.review.fingerprint":"TLS 指紋","rmm.review.fp_none":"無 — 伺服器將自動抓取","rmm.review.storage_map":"儲存對應","rmm.review.bridge_map":"橋接對應","rmm.review.online":"線上","rmm.review.online_yes":"是 (即時)","rmm.review.online_no":"否 (離線)","rmm.review.delete_source":"刪除來源","rmm.review.delete_source_yes":"是","rmm.review.delete_source_no":"否 — 保留來源","rmm.review.bandwidth":"頻寬","rmm.review.unlimited":"無限制","rmm.action.next":"下一步 »","rmm.action.back":"« 上一步","rmm.action.review":"檢閱 »","rmm.action.start":"開始遷移 »","rmm.submitting":"送出至 PVE 中…","rmm.done.msg":"遷移作業已啟動。","rmm.done.upid":"UPID","rmm.done.hint":"可在 Matrix 畫面追蹤進度；來源 VM 會顯示遷移作業標籤。","rmm.action.close":"關閉","rmm.precheck.running":"執行遷移前置檢查中…","rmm.precheck.blockers":"遷移被阻擋","rmm.precheck.warnings":"警告 — 繼續前請確認","rmm.precheck.ok":"前置檢查通過","rmm.action.precheck":"重新檢查","dialog.notice":"通知","dialog.confirm":"確認","dialog.input":"輸入","dialog.ok":"確定","dialog.confirm_btn":"確認","console.disabled":"主控台功能已於設定中停用。","console.vm_not_running":"VM 必須在運作中才能開啟主控台。","console.stored_no_pw":"主控台模式為 stored，但此叢集尚未設定 PVE 密碼。請至「設定 → 叢集」設定。","console.prompt_title":"主控台密碼","console.prompt_body":"請輸入 {cluster} 上 {user} 的 PVE 密碼。此密碼僅用於換取一次性 console 票，伺服器不會保存。","console.prompt_label":"PVE 密碼","console.prompt_open":"開啟主控台 »","console.prepare_failed":"無法準備主控台：{err}","settings.cluster_pve_password":"PVE 密碼","settings.secret_set":"✓ 已設定","settings.secret_unset":"✗ 未設定","settings.secret_set_btn":"設定","settings.secret_replace":"更換","settings.secret_clear":"清除","settings.secret_confirm_clear":"清除叢集 {id} 的 PVE 密碼？","settings.secret_pw_title":"PVE 密碼 — {id}","settings.secret_pw_body":"加密後儲存於本機 SQLite，金鑰在 /etc/jt-proxense/master.key。不會寫入 config.yaml。","settings.secret_pw_label":"PVE root 密碼","settings.console_section":"主控台","settings.console_mode":"認證方式","settings.console_mode_disabled":"停用 — 顯示為無法使用","settings.console_mode_stored":"stored — 使用叢集已存的密碼","settings.console_mode_prompt":"prompt — 每次詢問","settings.console_mode_hint":"PVE 的 vncwebsocket 不接受 API token，因此必須用 username+password 換取 PVEAuthCookie。","mig.failed.title":"遷移失敗","mig.failed.body":"VM {vmid} 遷移至 {target} 失敗。來源 VM 可能仍處於「{lock}」鎖定狀態，需要在來源節點手動清除。","mig.failed.cmd_hint":"請在來源節點執行：","mig.failed.copy":"複製指令","mig.failed.copied":"已複製","mig.failed.dismiss":"關閉","snap.title":"快照 — VM {vmid} ({name})","snap.create":"建立快照","snap.name":"名稱","snap.description":"說明 (選填)","snap.include_state":"包含記憶體狀態","snap.rollback":"倒回","snap.delete":"刪除","snap.confirm_delete":"刪除快照「{name}」？","snap.confirm_rollback":"倒回到「{name}」？VM 將回到該時點的狀態。","snap.empty":"尚無快照。","snap.parent":"父層","snap.taken":"建立時間","backup.title":"備份 VM {vmid} ({name})","backup.storage":"目標儲存區","backup.no_backup_storage":"此節點沒有可用的備份儲存區。","backup.mode":"模式","backup.mode_snapshot":"snapshot (零停機)","backup.mode_suspend":"suspend (短暫暫停)","backup.mode_stop":"stop (完整停機)","backup.compress":"壓縮","backup.start":"開始備份","backup.started":"備份作業已啟動。","table.type":"類型","table.name":"名稱","table.tags":"標籤","table.node":"節點","table.uptime":"運作時間","matrix.bulk.select_all":"全選","table.task":"作業","common.shared":"共用","common.local":"本機","common.total":"總計","storage.title":"儲存","storage.search":"搜尋儲存區...","storage.filter_all":"全部","storage.filter_shared":"共用","storage.filter_local":"本機","storage.count":"{n} 個儲存","storage.shared_count":"{n} 共用","storage.local_count":"{n} 本機","storage.section_shared":"共用儲存","storage.section_local":"本機儲存","storage.storages_count":"{n} 個儲存","storage.storages_plural":"{n} 個儲存","storage.across_nodes":"跨 {n} 個節點","storage.across_nodes_plural":"跨 {n} 個節點","storage.no_storages":"找不到儲存區","storage.content":"內容","storage.manage":"管理","storage.total_capacity":"總容量","matrix.search":"搜尋虛擬機...","matrix.filter_all":"全部","matrix.filter_running":"運作中","matrix.filter_stopped":"已停止","matrix.running":"運作中","matrix.total":"總計","matrix.group_by":"分組","matrix.group_none":"無","matrix.group_node":"節點","matrix.group_type":"類型","matrix.group_tag":"標籤","ceph.health":"健康狀態","ceph.osds":"OSD","ceph.pools":"儲存集區","ceph.monitors":"監控器","ceph.iops":"IOPS","ceph.throughput":"吞吐量","ceph.recovery":"恢復","ceph.title":"CEPH","ceph.cluster_daemons":"叢集程序","ceph.osd_array":"OSD 陣列","ceph.cluster_storage":"叢集儲存","ceph.ceph_pools":"CEPH 儲存集區","ceph.cephfs_pools":"CEPHFS 儲存集區","ceph.in_cluster":"叢集中","ceph.yes":"是","ceph.no":"否","ceph.used":"已使用","ceph.total":"總容量","ceph.no_cluster":"未偵測到 Ceph 叢集","ceph.latency":"延遲","ceph.apply":"套用","ceph.commit":"提交","alert.critical":"嚴重","alert.warning":"警告","alert.info":"資訊","alert.none":"無告警","alert.acknowledge":"確認","action.refresh":"重新整理","action.clear":"清除","action.save":"儲存","action.saving":"儲存中…","action.cancel":"取消","action.close":"關閉","action.expand":"展開","action.collapse":"收合","time.now":"現在","time.seconds_ago":"{n} 秒前","time.minutes_ago":"{n} 分鐘前","time.hours_ago":"{n} 小時前","time.days_ago":"{n} 天前","settings.title":"設定","settings.theme":"主題","settings.language":"語言","settings.animations":"動畫效果","settings.particles":"粒子數量","settings.tab_ui":"介面","settings.tab_clusters":"叢集","settings.tab_alerts":"告警","settings.tab_server":"伺服器","settings.default_view":"預設檢視","settings.vm_matrix_filter":"VM 矩陣預設篩選","settings.filter_all":"全部","settings.filter_running":"運作中","settings.filter_stopped":"已停止","settings.matrix_card_width":"矩陣卡片寬度 (px)","settings.matrix_sort_by":"矩陣排序方式","settings.matrix_group_by":"矩陣分組方式","settings.sort_vmid":"VMID","settings.sort_name":"名稱","settings.sort_load":"負載","settings.matrix_group_sort":"群組排序 (叢集/節點)","settings.sort_by":"排序","settings.sort_order":"排序順序","settings.sort_node":"節點","settings.sort_cluster":"叢集","settings.sort_asc":"正序","settings.sort_desc":"倒序","settings.poll_interval":"輪詢間隔 (秒)","settings.static_refresh":"靜態刷新 (秒)","settings.enabled":"已啟用","settings.disabled":"已停用","settings.alerts_enabled":"啟用告警","settings.cpu_threshold":"CPU 閾值","settings.memory_threshold":"記憶體閾值","settings.disk_threshold":"儲存容量閾值","settings.diskio_threshold":"磁碟 I/O 閾值 (MB/s)","settings.iowait_threshold":"I/O Wait 閾值","settings.warning":"警告","settings.critical":"嚴重","settings.server_host":"伺服器位址","settings.http_port":"HTTP 埠","settings.influx_enabled":"啟用 InfluxDB","settings.influx_port":"InfluxDB 埠","settings.version":"版本","settings.restart_required":"需重啟以套用","settings.cluster_management":"叢集管理","settings.cluster_hint":"啟用/停用叢集並設定輪詢間隔","settings.nodes_count":"{n} 個節點","settings.auth":"認證","settings.alert_system":"告警系統","settings.http_server":"HTTP 伺服器","settings.host":"主機","settings.port":"埠號","settings.influx_integration":"InfluxDB 整合","settings.server_restart_note":"伺服器設定需要重啟才能生效，您也可以直接編輯 config.yaml。","settings.particle_count":"粒子數量","settings.particle_hint":"背景粒子 (0-500)","settings.saving":"儲存中...","loading.data":"載入資料中...","loading.connecting":"連線伺服器中...","error.connection_failed":"連線失敗","error.no_data":"無可用資料","error.not_found":"找不到"}},af=u.createContext(null);function hg({children:e}){const[t,n]=u.useState(()=>{const o=localStorage.getItem("language");return o&&Ai[o]?o:navigator.language.startsWith("zh")?"zh-TW":"en"}),a=u.useCallback(o=>{n(o),localStorage.setItem("language",o)},[]),s=u.useCallback((o,i)=>{let c=Ai[t][o]||Ai.en[o]||o;return i&&Object.entries(i).forEach(([l,d])=>{c=c.replace(`{${l}}`,String(d))}),c},[t]);return r.jsx(af.Provider,{value:{language:t,setLanguage:a,t:s},children:e})}function Le(){const e=u.useContext(af);if(!e)throw new Error("useTranslation must be used within I18nProvider");return e}const sf=u.createContext(null);function Gr(){const e=u.useContext(sf);return e||(typeof console<"u"&&console.warn("useDialogs called outside DialogProvider — falling back to native."),{alert:t=>(window.alert(t),Promise.resolve()),confirm:t=>Promise.resolve(window.confirm(t)),prompt:(t,n)=>Promise.resolve(window.prompt(t,(n==null?void 0:n.defaultValue)??""))})}function gg({children:e}){const{t}=Le(),[n,a]=u.useState(null),[s,o]=u.useState(""),i=u.useRef(null),c=u.useCallback(g=>{n&&(n.resolve(g),a(null),o(""))},[n]),l=u.useCallback((g,p={})=>new Promise(x=>{a({kind:"alert",title:p.title||t("dialog.notice"),body:g,destructive:!!p.destructive,inputType:"text",placeholder:"",resolve:()=>x()})}),[t]),d=u.useCallback((g,p={})=>new Promise(x=>{a({kind:"confirm",title:p.title||t("dialog.confirm"),body:g,destructive:!!p.destructive,inputType:"text",placeholder:"",resolve:b=>x(!!b)})}),[t]),m=u.useCallback((g,p={})=>new Promise(x=>{o(p.defaultValue||""),a({kind:"prompt",title:p.title||t("dialog.input"),body:g,destructive:!!p.destructive,inputType:p.inputType||"text",placeholder:p.placeholder||"",resolve:b=>x(b===null?null:String(b))})}),[t]);return u.useEffect(()=>{if(!n)return;const g=p=>{p.key==="Escape"?c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0):p.key==="Enter"&&n.kind!=="alert"?(p.preventDefault(),c(n.kind==="prompt"?s:!0)):p.key==="Enter"&&n.kind==="alert"&&c(void 0)};return document.addEventListener("keydown",g),n.kind==="prompt"&&setTimeout(()=>{var p;return(p=i.current)==null?void 0:p.focus()},50),()=>document.removeEventListener("keydown",g)},[n,s,c]),r.jsxs(sf.Provider,{value:{alert:l,confirm:d,prompt:m},children:[e,n&&r.jsxs("div",{onClick:()=>c(n.kind==="prompt"?null:n.kind==="confirm"?!1:void 0),style:xg,children:[r.jsx("style",{children:vg}),r.jsxs("div",{className:`jtd-modal ${n.destructive?"destructive":""}`,onClick:g=>g.stopPropagation(),children:[r.jsxs("div",{className:"jtd-eyebrow",children:["// ",n.kind]}),r.jsx("h3",{className:"jtd-title",children:n.title}),r.jsx("p",{className:"jtd-body",children:n.body}),n.kind==="prompt"&&r.jsx("input",{ref:i,type:n.inputType,value:s,placeholder:n.placeholder,onChange:g=>o(g.target.value),spellCheck:!1,autoComplete:"off"}),r.jsxs("div",{className:"jtd-actions",children:[n.kind!=="alert"&&r.jsx("button",{className:"ghost",onClick:()=>c(n.kind==="prompt"?null:!1),children:t("action.cancel")}),r.jsx("button",{className:`primary ${n.destructive?"destructive":""}`,onClick:()=>c(n.kind==="prompt"?s:!0),children:n.kind==="alert"?t("dialog.ok"):n.kind==="confirm"?t("dialog.confirm_btn"):t("action.save")})]})]})]})]})}const xg={position:"fixed",inset:0,zIndex:5e3,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"jtdFade .18s ease"},vg=`
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
`;function bg(e={}){const{onMessage:t,onConnect:n,onDisconnect:a,onError:s,reconnectInterval:o=2e3,pingInterval:i=5e3}=e,c=u.useRef(null),l=u.useRef(null),d=u.useRef(null),m=u.useRef(t),[g,p]=u.useState({connected:!1,connecting:!1,lastMessageTime:0});m.current=t;const x=u.useCallback(()=>{const f=window.location.protocol==="https:"?"wss:":"ws:",h=window.location.host;return`${f}//${h}/ws`},[]),b=u.useCallback(()=>{var h;if(((h=c.current)==null?void 0:h.readyState)===WebSocket.OPEN)return;p(v=>({...v,connecting:!0}));const f=new WebSocket(x());c.current=f,f.onopen=()=>{p({connected:!0,connecting:!1,lastMessageTime:Date.now()}),n==null||n(),d.current&&clearInterval(d.current),d.current=window.setInterval(()=>{f.readyState===WebSocket.OPEN&&f.send(JSON.stringify({type:"ping"}))},i)},f.onmessage=v=>{var N;try{const w=JSON.parse(v.data);p(_=>({..._,lastMessageTime:Date.now()})),(w.type==="initial"||w.type==="update")&&(N=w.data)!=null&&N.clusters&&m.current&&m.current(w.data.clusters)}catch(w){console.error("[WS] Failed to parse message:",w)}},f.onerror=v=>{console.error("[WS] Error:",v),s==null||s(v)},f.onclose=()=>{p(v=>({...v,connected:!1,connecting:!1})),a==null||a(),d.current&&(clearInterval(d.current),d.current=null),l.current&&clearTimeout(l.current),l.current=window.setTimeout(()=>{b()},o)}},[x,n,a,s,o,i]),k=u.useCallback(()=>{l.current&&(clearTimeout(l.current),l.current=null),d.current&&(clearInterval(d.current),d.current=null),c.current&&(c.current.close(),c.current=null)},[]),j=u.useCallback(f=>{var h;((h=c.current)==null?void 0:h.readyState)===WebSocket.OPEN&&c.current.send(JSON.stringify(f))},[]);return u.useEffect(()=>(b(),()=>{k()}),[b,k]),u.useEffect(()=>{const f=setInterval(()=>{const v=Date.now()-g.lastMessageTime;g.connected&&v>15e3&&(k(),b())},5e3);return()=>clearInterval(f)},[g.connected,g.lastMessageTime,b,k]),{connected:g.connected,connecting:g.connecting,lastMessageTime:g.lastMessageTime,send:j,reconnect:b,disconnect:k}}const yg="/api";async function Pe(e,t){const n=await fetch(`${yg}${e}`,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...t});if(n.status===401&&!e.startsWith("/auth/"))throw typeof window<"u"&&window.location.pathname!=="/login"&&window.location.replace("/login"),new Error("auth_required");if(!n.ok){const a=await n.text();throw new Error(a||`HTTP ${n.status}`)}return n.json()}const Be={authMe:()=>Pe("/auth/me"),authLogin:(e,t)=>Pe("/auth/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),authLogout:()=>Pe("/auth/logout",{method:"POST"}),totpEnrollInit:()=>Pe("/auth/totp/enroll-init",{method:"POST"}),totpEnrollVerify:e=>Pe("/auth/totp/enroll-verify",{method:"POST",body:JSON.stringify({code:e})}),totpDisable:e=>Pe("/auth/totp/disable",{method:"POST",body:JSON.stringify({code:e})}),getConfig:()=>Pe("/config"),updateConfig:e=>Pe("/config",{method:"POST",body:JSON.stringify(e)}),getClusters:()=>Pe("/clusters"),getCluster:e=>Pe(`/clusters/${e}`),getSummary:()=>Pe("/summary"),getNodes:e=>Pe(`/nodes${e?`?cluster=${e}`:""}`),getVMs:e=>Pe(`/vms${e?`?cluster=${e}`:""}`),getStorages:e=>Pe(`/storages${e?`?cluster=${e}`:""}`),getCeph:e=>Pe(`/ceph${e?`?cluster=${e}`:""}`),getHealth:()=>Pe("/health"),vmAction:(e,t,n,a)=>Pe(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/${a}`,{method:"POST"}),ctAction:(e,t,n,a)=>Pe(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/cts/${n}/${a}`,{method:"POST"}),guestAction:(e,t,n,a,s)=>a==="lxc"?Be.ctAction(e,t,n,s):Be.vmAction(e,t,n,s),vmMigrate:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),ctMigrate:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/cts/${t}/migrate`,{method:"POST",body:JSON.stringify(n)}),bulkAction:(e,t)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/bulk`,{method:"POST",body:JSON.stringify(t)}),taskStatus:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/tasks/${encodeURIComponent(n)}`),listSnapshots:(e,t)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`),createSnapshot:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots`,{method:"POST",body:JSON.stringify(n)}),deleteSnapshot:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}`,{method:"DELETE"}),rollbackSnapshot:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/snapshots/${encodeURIComponent(n)}/rollback`,{method:"POST"}),vmReset:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/vms/${n}/reset`,{method:"POST"}),cloneVm:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/clone`,{method:"POST",body:JSON.stringify(n)}),listRemoteEndpoints:e=>Pe(`/clusters/${encodeURIComponent(e)}/remote-endpoints`),fetchRemoteFingerprint:(e,t=8006)=>Pe(`/remote-fingerprint?host=${encodeURIComponent(e)}&port=${t}`),triggerBackup:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/backup`,{method:"POST",body:JSON.stringify(n)}),setClusterSecret:(e,t,n)=>Pe(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"POST",body:JSON.stringify({value:n})}),deleteClusterSecret:(e,t)=>Pe(`/secrets/cluster/${encodeURIComponent(e)}/${encodeURIComponent(t)}`,{method:"DELETE"}),consolePrepare:e=>Pe("/console/prepare",{method:"POST",body:JSON.stringify(e)}),migrationPrecheck:(e,t,n,a)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-precheck?target_cluster_id=${encodeURIComponent(n)}&target_node=${encodeURIComponent(a)}`),getMigrationSource:(e,t)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/migration-source`),getMigrationTargets:(e,t)=>Pe(`/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/migration-targets`),remoteMigrate:(e,t,n)=>Pe(`/clusters/${encodeURIComponent(e)}/vms/${t}/remote-migrate`,{method:"POST",body:JSON.stringify(n)})};function Re(e,t=1){if(e===0)return"0 B";const n=1024,a=["B","KB","MB","GB","TB","PB"],s=Math.floor(Math.log(e)/Math.log(n));return`${parseFloat((e/Math.pow(n,s)).toFixed(t))} ${a[s]}`}function ot(e,t=1){return`${e.toFixed(t)}%`}function ii(e){const t=Math.floor(e/86400),n=Math.floor(e%86400/3600),a=Math.floor(e%3600/60),s=[];return t>0&&s.push(`${t}d`),n>0&&s.push(`${n}h`),a>0&&s.push(`${a}m`),s.length>0?s.join(" "):"< 1m"}function ze(e,t=80,n=95){return e>=n?"danger":e>=t?"warning":"success"}function Wl(e){switch(e.toLowerCase()){case"running":case"online":case"healthy":case"health_ok":return"success";case"warning":case"health_warn":return"warning";case"stopped":case"offline":case"critical":case"health_err":return"danger";default:return"muted"}}function wg({value:e,suffix:t="",className:n=""}){const a=x=>{if(typeof x=="number")return{left:x,isRatio:!1};const b=String(x).match(/^(\d+)\/(\d+)$/);if(b)return{left:parseInt(b[1]),right:parseInt(b[2]),isRatio:!0};const k=parseFloat(String(x));return isNaN(k)?{left:0,isRatio:!1}:{left:k,isRatio:!1}},s=a(e),[o,i]=u.useState(0),[c,l]=u.useState(s.right||0),d=u.useRef(null),m=u.useRef(0),g=u.useRef(!0);u.useEffect(()=>{const x=a(e);if(!g.current){i(x.left),x.right!==void 0&&l(x.right);return}const b=800,k=0,j=0;g.current=!1,d.current=null;const f=h=>{d.current||(d.current=h);const v=h-d.current,N=Math.min(v/b,1),w=1-Math.pow(1-N,3),_=k+(x.left-k)*w;if(i(Math.round(_)),x.isRatio&&x.right!==void 0){const z=j+(x.right-j)*w;l(Math.round(z))}N<1?m.current=requestAnimationFrame(f):(i(x.left),x.right!==void 0&&l(x.right))};return m.current=requestAnimationFrame(f),()=>{m.current&&cancelAnimationFrame(m.current)}},[e]);const p=s.isRatio?`${o}/${c}`:o;return r.jsxs("span",{className:`metric-value ${n}`,children:[p,t&&r.jsx("span",{style:{fontSize:"0.6em",opacity:.7},children:t})]})}function du({value:e,decimals:t=0,className:n=""}){const[a,s]=u.useState(0),o=u.useRef(null),i=u.useRef(0),c=u.useRef(!0);return u.useEffect(()=>{if(!c.current){s(e);return}const l=800,d=0;c.current=!1,o.current=null;const m=g=>{o.current||(o.current=g);const p=g-o.current,x=Math.min(p/l,1),b=1-Math.pow(1-x,3),k=d+(e-d)*b;s(k),x<1?i.current=requestAnimationFrame(m):s(e)};return i.current=requestAnimationFrame(m),()=>{i.current&&cancelAnimationFrame(i.current)}},[e]),r.jsxs("span",{className:n,children:[a.toFixed(t),"%"]})}function Oi({left:e,right:t,className:n=""}){const[a,s]=u.useState(0),[o,i]=u.useState(0),c=u.useRef(null),l=u.useRef(0),d=u.useRef(!0);return u.useEffect(()=>{if(!d.current){s(e),i(t);return}const m=800,g=0,p=0;d.current=!1,c.current=null;const x=b=>{c.current||(c.current=b);const k=b-c.current,j=Math.min(k/m,1),f=1-Math.pow(1-j,3);s(Math.round(g+(e-g)*f)),i(Math.round(p+(t-p)*f)),j<1?l.current=requestAnimationFrame(x):(s(e),i(t))};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Us({label:e,value:t,suffix:n,subValue:a,color:s="primary",icon:o}){return r.jsxs("div",{className:`stat-card ${s!=="primary"?`stat-${s}`:""}`,children:[o&&r.jsx("div",{className:"stat-icon",children:o}),r.jsxs("div",{className:"stat-content",children:[r.jsx("div",{className:"stat-label",children:e}),r.jsx(wg,{value:t,suffix:n,className:s!=="primary"?`text-${s}`:""}),a&&r.jsx("div",{className:"stat-sub",children:a})]})]})}function Fi({value:e,label:t,color:n,size:a=100}){const[s,o]=u.useState(0),i=u.useRef(null),c=u.useRef(0),l=u.useRef(!0);u.useEffect(()=>{if(!l.current){o(e);return}const j=1e3,f=0;l.current=!1,i.current=null;const h=v=>{i.current||(i.current=v);const N=v-i.current,w=Math.min(N/j,1),_=1-Math.pow(1-w,3),z=f+(e-f)*_;o(z),w<1?c.current=requestAnimationFrame(h):o(e)};return c.current=requestAnimationFrame(h),()=>{c.current&&cancelAnimationFrame(c.current)}},[e]);const d=5,m=(a-d*4)/2-8,g=(a-d)/2,p=m+(g-m)/2,x=2*Math.PI*p,b=x-s/100*x,k=Array.from({length:36},(j,f)=>{const h=(f*10-90)*(Math.PI/180),v=f%3===0,N=v?6:3,w=g-2,_=w-N;return{x1:a/2+Math.cos(h)*w,y1:a/2+Math.sin(h)*w,x2:a/2+Math.cos(h)*_,y2:a/2+Math.sin(h)*_,isMajor:v}});return r.jsxs("div",{className:"ring-gauge",children:[r.jsxs("svg",{viewBox:`0 0 ${a} ${a}`,className:"ring-svg",children:[r.jsx("circle",{className:"ring-outer-deco",cx:a/2,cy:a/2,r:g,strokeWidth:1}),k.map((j,f)=>r.jsx("line",{x1:j.x1,y1:j.y1,x2:j.x2,y2:j.y2,className:`ring-tick ${j.isMajor?"major":""}`},f)),r.jsx("circle",{className:"ring-bg",cx:a/2,cy:a/2,r:p,strokeWidth:d}),r.jsx("circle",{className:"ring-inner-deco",cx:a/2,cy:a/2,r:m,strokeWidth:1}),r.jsx("circle",{className:`ring-fill ${n}`,cx:a/2,cy:a/2,r:p,strokeWidth:d,strokeDasharray:x,strokeDashoffset:b,transform:`rotate(-90 ${a/2} ${a/2})`}),r.jsx("line",{className:"ring-sweep",x1:a/2,y1:a/2,x2:a/2,y2:a/2-p-4,transform:`rotate(${s/100*360-90} ${a/2} ${a/2})`})]}),r.jsxs("div",{className:"ring-content",children:[r.jsxs("span",{className:`ring-value text-${n}`,children:[s.toFixed(0),r.jsx("span",{className:"ring-percent",children:"%"})]}),r.jsx("span",{className:"ring-label",children:t})]})]})}function kg({cluster:e,onClick:t}){var l,d;const{t:n}=Le(),a=e.summary;if(!a)return null;const s=ze(a.total_cpu_usage),o=ze(a.total_memory_usage),i=a.alerts_warning>0,c=a.alerts_critical>0;return r.jsxs("div",{className:`cluster-hex-card ${c?"critical":i?"warning":""}`,onClick:t,children:[r.jsxs("div",{className:"cluster-hex-inner",children:[r.jsxs("div",{className:"cluster-hex-header",children:[r.jsxs("div",{className:"cluster-hex-title",children:[r.jsx("span",{className:"cluster-hex-name",children:e.name||e.id}),a.is_standalone&&r.jsx("span",{className:"standalone-badge",children:n("dashboard.standalone")})]}),r.jsx("span",{className:`cluster-hex-status ${a.status==="connected"?"online":"offline"}`})]}),r.jsxs("div",{className:"cluster-hex-metrics",children:[r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${s}`,style:{width:`${a.total_cpu_usage}%`}})}),r.jsx(du,{value:a.total_cpu_usage,decimals:0,className:`metric-value small text-${s}`})]}),r.jsxs("div",{className:"cluster-hex-metric",children:[r.jsx("span",{className:"metric-label",children:"MEM"}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-bar-fill ${o}`,style:{width:`${a.total_memory_usage}%`}})}),r.jsx(du,{value:a.total_memory_usage,decimals:0,className:`metric-value small text-${o}`})]})]}),r.jsxs("div",{className:"cluster-hex-stats",children:[r.jsxs("div",{className:"hex-stat",children:[r.jsx(Oi,{left:a.nodes_online,right:a.node_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.nodes")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Oi,{left:a.vms_running,right:a.vm_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.vms_short")})]}),r.jsxs("div",{className:"hex-stat",children:[r.jsx(Oi,{left:a.cts_running,right:a.ct_count,className:"hex-stat-value"}),r.jsx("span",{className:"hex-stat-label",children:n("cluster.cts_short")})]})]}),a.has_ceph&&r.jsx("div",{className:"cluster-hex-ceph",children:r.jsxs("span",{className:`ceph-badge ${((l=a.ceph_health)==null?void 0:l.toLowerCase().replace("health_",""))||"unknown"}`,children:["CEPH: ",((d=a.ceph_health)==null?void 0:d.replace("HEALTH_",""))||"N/A"]})})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function uu({clusters:e,globalSummary:t,onSelectCluster:n,isPaused:a=!1}){const{t:s}=Le(),o=u.useMemo(()=>Object.entries(e),[e]),i=u.useMemo(()=>{let c=0,l=0,d=0,m=0;return Object.values(e).forEach(g=>{g.summary&&(c+=g.summary.total_cpu_usage||0,l+=g.summary.total_memory_usage||0,d+=g.summary.total_storage_usage||0,m++)}),{avgCpu:m>0?c/m:0,avgMem:m>0?l/m:0,avgStorage:m>0?d/m:0}},[e]);return r.jsxs("div",{className:"command-center",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"cc-header",children:[r.jsx("h1",{className:"cc-title font-display",children:r.jsx("span",{className:"glitch-text","data-text":s("dashboard.title"),children:s("dashboard.title")})}),r.jsx("div",{className:"cc-subtitle",children:s("dashboard.subtitle")})]}),r.jsxs("div",{className:"cc-content",children:[r.jsxs("div",{className:"cc-top-row",children:[r.jsxs("div",{className:"cc-gauges panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.resource_usage")})}),r.jsxs("div",{className:"gauges-container",children:[r.jsx(Fi,{value:i.avgCpu,label:s("metric.cpu"),color:ze(i.avgCpu),size:110}),r.jsx(Fi,{value:i.avgMem,label:s("metric.memory"),color:ze(i.avgMem),size:110}),r.jsx(Fi,{value:i.avgStorage,label:s("metric.disk"),color:ze(i.avgStorage),size:110})]})]}),r.jsxs("div",{className:"cc-stats-panel panel panel-scan",children:[r.jsx("div",{className:"panel-header",children:r.jsx("h2",{className:"panel-title font-display",children:s("dashboard.infrastructure")})}),r.jsxs("div",{className:"stats-grid",children:[r.jsx(Us,{label:s("cluster.total"),value:t.total_clusters,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"4"})]})}),r.jsx(Us,{label:s("cluster.nodes_online"),value:`${t.total_nodes_online}/${t.total_nodes}`,color:t.total_nodes_online<t.total_nodes?"warning":"success",icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),r.jsx("path",{d:"M8 21h8M12 17v4"})]})}),r.jsx(Us,{label:s("cluster.vms_running"),value:`${t.total_vms_running}/${t.total_vms}`,icon:r.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 3v18"})]})}),r.jsx(Us,{label:s("cluster.cts_running"),value:`${t.total_cts_running}/${t.total_cts}`,icon:r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"})})})]})]})]}),r.jsxs("div",{className:"cc-galaxy",children:[r.jsx("div",{className:"galaxy-title font-display",children:s("cluster.galaxy")}),r.jsx("div",{className:"galaxy-container",children:o.length===0?r.jsxs("div",{className:"no-clusters",children:[r.jsx("div",{className:"no-clusters-icon",children:r.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]})}),r.jsx("div",{className:"no-clusters-text",children:s("loading.connecting")}),r.jsx("div",{className:"no-clusters-hint",children:"Configure clusters in config.yaml"})]}):r.jsx("div",{className:"cluster-grid",children:o.map(([c,l])=>r.jsx(kg,{cluster:l,onClick:()=>n(c)},c))})})]})]}),r.jsx("style",{children:`
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
      `})]})}function jg(e,t,n){const a=Math.min(e,100)/100,s=.1+a*.6,o=t;let i=(Math.random()-.5)*.02;if(o>.08&&o<.22){const c=(o-.08)/.14;i+=s*.2*Math.sin(c*Math.PI)}if(o>.24&&o<.4){const c=(o-.24)/.16;if(c<.2)i-=s*.15*Math.sin(c*5*Math.PI);else if(c<.5){const l=(c-.2)/.3;i+=s*(1+a*.5)*Math.sin(l*Math.PI)}else if(c<.7){const l=(c-.5)/.2;i-=s*.25*Math.sin(l*Math.PI)}}if(o>.48&&o<.72){const c=(o-.48)/.24;i+=s*.35*Math.sin(c*Math.PI)}return i*n}function Di({value:e,label:t,color:n,isOnline:a,width:s=180,height:o=35,isPaused:i=!1}){const c=u.useRef(null),l=u.useRef(null),d=u.useRef([]),m=u.useRef(0),g=u.useRef(0),p=u.useRef(0),x=u.useRef(0),b=u.useRef(!i),k=u.useRef(!1),f=6e4/(50+e/100*50),h=12;u.useEffect(()=>{b.current=!i},[i]);const v=u.useCallback(()=>{const w=l.current;if(!w)return;w.fillStyle="rgba(5, 8, 15, 0.95)",w.fillRect(0,0,s,o),w.strokeStyle="rgba(0, 240, 255, 0.08)",w.lineWidth=.5;for(let A=0;A<o;A+=10)w.beginPath(),w.moveTo(0,A),w.lineTo(s,A),w.stroke();for(let A=0;A<s;A+=10)w.beginPath(),w.moveTo(A,0),w.lineTo(A,o),w.stroke();const _=o/2,z=o*.45,P=!a||e>90?"#ff0040":e>70?"#ff6b00":n;w.shadowColor=P,w.shadowBlur=6,w.strokeStyle=P,w.lineWidth=1.5,w.lineCap="round",w.lineJoin="round",w.beginPath();let D=!1;for(let A=0;A<s;A++){const re=(A-m.current+s)%s;if(re<8&&re>0)continue;const U=_-d.current[A]*z;D?w.lineTo(A,U):(w.moveTo(A,U),D=!0)}w.stroke(),w.shadowBlur=0,w.strokeStyle=`${P}60`,w.lineWidth=2,w.beginPath(),w.moveTo(m.current,0),w.lineTo(m.current,o),w.stroke();const I=w.createLinearGradient(m.current-15,0,m.current,0);I.addColorStop(0,"transparent"),I.addColorStop(1,`${P}30`),w.fillStyle=I,w.fillRect(m.current-15,0,15,o)},[s,o,e,a,n]);u.useEffect(()=>{const w=c.current;if(!w)return;const _=w.getContext("2d");if(!_)return;const z=window.devicePixelRatio||1;w.width=s*z,w.height=o*z,_.scale(z,z),l.current=_,d.current.length!==s&&(d.current=new Array(s).fill(0)),k.current=!0,v()},[s,o,v]),u.useEffect(()=>{if(!k.current||!l.current)return;const _=z=>{x.current||(x.current=z);const $=z-x.current;x.current=z;const P=$/1e3*h;g.current+=$/f,g.current>=1&&(g.current-=1);const D=Math.ceil(P);for(let I=0;I<D;I++){const re=(g.current+I/D*($/f))%1;let U;a?U=jg(e,re,1):U=(Math.random()-.5)*.01,m.current=(m.current+1)%s,d.current[m.current]=U;const R=(m.current+1)%s;for(let G=0;G<8;G++){const L=(R+G)%s;d.current[L]=0}}v(),b.current&&(p.current=requestAnimationFrame(_))};return i||(x.current=0,p.current=requestAnimationFrame(_)),()=>{cancelAnimationFrame(p.current)}},[s,o,e,a,f,h,i,v]);const N=()=>!a||e>90?"#ff0040":e>70?"#ff6b00":n;return r.jsxs("div",{className:"ecg-trace",children:[r.jsxs("div",{className:"ecg-trace-header",children:[r.jsx("span",{className:"ecg-trace-label",style:{color:N()},children:t}),r.jsx("span",{className:"ecg-trace-value",style:{color:N()},children:a?`${Math.round(e)}%`:"--"})]}),r.jsx("canvas",{ref:c,style:{width:s,height:o,display:"block"}}),r.jsx("style",{children:`
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
      `})]})}function Ng({cpu:e,memory:t,diskIO:n,isOnline:a,isPaused:s=!1}){const o=u.useRef(null),[i,c]=u.useState(180);return u.useEffect(()=>{const l=o.current;if(!l)return;const d=()=>{const g=l.clientWidth-6;g>0&&c(g)};d();const m=new ResizeObserver(d);return m.observe(l),()=>m.disconnect()},[]),r.jsxs("div",{className:"ecg-monitor-stack",ref:o,children:[r.jsx(Di,{value:e,label:"CPU",color:"#00f0ff",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Di,{value:t,label:"MEM",color:"#00ff88",isOnline:a,width:i,height:32,isPaused:s}),r.jsx(Di,{value:n,label:"IOW",color:"#ffd700",isOnline:a,width:i,height:32,isPaused:s}),r.jsx("style",{children:`
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
      `})]})}const _g=["hour","day","week","month","year"],Ul=e=>{if(!isFinite(e)||e===0)return"0";const t=["B","K","M","G","T"];let n=0,a=e;for(;a>=1024&&n<t.length-1;)a/=1024,n++;return`${a.toFixed(a>=10?0:1)}${t[n]}`},Vn=e=>Ul(e)+"/s",pu=e=>`${(e*100).toFixed(0)}%`;function of({open:e,onClose:t,clusterId:n,node:a,vmid:s,kind:o,title:i}){const{t:c,language:l}=Le(),[d,m]=u.useState("hour"),[g,p]=u.useState([]),[x,b]=u.useState(!1),[k,j]=u.useState(null);return u.useEffect(()=>{if(!e)return;let f=!0;return(async()=>{b(!0),j(null);try{const h=encodeURIComponent(n),v=encodeURIComponent(a),N=o==="node"?`/api/clusters/${h}/nodes/${v}/rrddata`:o==="qemu"?`/api/clusters/${h}/nodes/${v}/qemu/${s}/rrddata`:`/api/clusters/${h}/nodes/${v}/lxc/${s}/rrddata`,w=await fetch(`${N}?timeframe=${d}`,{credentials:"same-origin"});if(!w.ok){const z=await w.json().catch(()=>({}));throw new Error(z.error||`HTTP ${w.status}`)}const _=await w.json();if(!f)return;p((_.samples||[]).filter(z=>z&&z.time))}catch(h){f&&j(h.message||String(h))}finally{f&&b(!1)}})(),()=>{f=!1}},[e,n,a,s,o,d]),e?r.jsx("div",{className:"rrd-back",onClick:t,children:r.jsxs("div",{className:"rrd-modal",onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"rrd-head",children:[r.jsxs("div",{className:"rrd-title",children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:c("rrd.title")}),i&&r.jsx("span",{className:"rrd-target",children:i})]}),r.jsxs("div",{className:"rrd-tfs",children:[_g.map(f=>r.jsx("button",{className:`rrd-tf ${f===d?"on":""}`,onClick:()=>m(f),children:c(`rrd.tf.${f}`)},f)),r.jsx("button",{className:"rrd-close",onClick:t,"aria-label":"close",children:"×"})]})]}),r.jsxs("div",{className:"rrd-body",children:[k&&r.jsx("div",{className:"rrd-error",children:k}),x&&g.length===0&&r.jsx("div",{className:"rrd-loading",children:c("rrd.loading")}),!x&&g.length===0&&!k&&r.jsx("div",{className:"rrd-loading",children:c("rrd.empty")}),g.length>0&&r.jsxs("div",{className:"rrd-grid",children:[r.jsx(Vs,{title:c("rrd.chart.cpu"),samples:g,color:"#00f0ff",series:[{key:"cpu",label:"CPU",fmt:pu,scale:f=>f.cpu??null}],yMax:1,yFmt:pu}),r.jsx(Vs,{title:c("rrd.chart.mem"),samples:g,color:"#00ff88",series:[{key:"mem",label:"Mem",fmt:f=>Ul(f),scale:f=>f.mem??null}],yFmt:Ul,fillTop:f=>f.maxmem}),r.jsx(Vs,{title:c("rrd.chart.net"),samples:g,color:"#ff8a3c",series:[{key:"netin",label:"In",fmt:Vn,scale:f=>f.netin??null,color:"#ff8a3c"},{key:"netout",label:"Out",fmt:Vn,scale:f=>f.netout??null,color:"#bf00ff"}],yFmt:Vn}),r.jsx(Vs,{title:c("rrd.chart.disk"),samples:g,color:"#bf00ff",series:[{key:"diskread",label:"Read",fmt:Vn,scale:f=>f.diskread??null,color:"#00f0ff"},{key:"diskwrite",label:"Write",fmt:Vn,scale:f=>f.diskwrite??null,color:"#bf00ff"}],yFmt:Vn})]})]}),r.jsx("style",{children:`
          .rrd-back { position: fixed; inset: 0; background: rgba(2,4,10,.65); display: flex; justify-content: center; align-items: center; z-index: 10000; }
          .rrd-modal { width: min(1000px, 96vw); max-height: 90vh; display: flex; flex-direction: column; background: linear-gradient(180deg, #0d1320, #050810); border: 1px solid var(--primary); border-radius: 6px; box-shadow: 0 0 32px rgba(0,240,255,0.25); animation: rrd-in .18s ease-out; overflow: hidden; }
          @keyframes rrd-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
          .rrd-head { display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; gap: 14px; border-bottom: 1px solid rgba(0, 240, 255, 0.16); }
          .rrd-title { display: flex; align-items: center; gap: 10px; color: var(--primary); font-family: var(--font-display); font-size: 14px; letter-spacing: .14em; text-transform: uppercase; }
          .rrd-target { color: var(--text-secondary); font-family: var(--font-mono); font-size: 12px; letter-spacing: .04em; text-transform: none; }
          .rrd-tfs { display: flex; gap: 4px; align-items: center; }
          .rrd-tf { padding: 4px 12px; border: 1px solid rgba(0,240,255,.2); background: rgba(0,240,255,.04); color: var(--text-secondary); font-family: var(--font-display); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; border-radius: 3px; cursor: pointer; }
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
        `})]})}):null}function Vs({title:e,samples:t,series:n,yMax:a,yFmt:s,fillTop:o}){var N,w;const{width:i,height:c}={width:460,height:160},l=48,d=8,m=10,g=22,p=u.useMemo(()=>{if(typeof a=="number")return a;let _=1;for(const z of t){const $=o==null?void 0:o(z);$&&$>_&&(_=$);for(const P of n){const D=P.scale(z);D!=null&&D>_&&(_=D)}}return _*1.1},[t,n,o,a]),x=((N=t[0])==null?void 0:N.time)||0,b=((w=t[t.length-1])==null?void 0:w.time)||x+1,k=Math.max(1,b-x),j=_=>l+(_-x)/k*(i-l-d),f=_=>m+(1-_/p)*(c-m-g),h=_=>{let z="",$=!1;for(const P of t){const D=_.scale(P);if(D==null||!isFinite(D)){$=!1;continue}const I=j(P.time),A=f(D);z+=($?" L ":" M ")+I.toFixed(1)+","+A.toFixed(1),$=!0}return z},v=[0,.25,.5,.75,1].map(_=>p*(1-_));return r.jsxs("div",{className:"rrd-card",children:[r.jsxs("div",{className:"rrd-card-head",children:[r.jsx("div",{className:"rrd-card-title",children:e}),r.jsx("div",{className:"rrd-card-legend",children:n.map(_=>r.jsxs("span",{children:[r.jsx("span",{className:"dot",style:{background:_.color||"#00f0ff"}}),_.label]},_.key))})]}),r.jsxs("svg",{viewBox:`0 0 ${i} ${c}`,className:"rrd-svg",children:[v.map((_,z)=>{const $=m+z/4*(c-m-g);return r.jsxs("g",{children:[r.jsx("line",{x1:l,y1:$,x2:i-d,y2:$,stroke:"rgba(0,240,255,.08)"}),r.jsx("text",{x:l-4,y:$+3,textAnchor:"end",fontSize:"9",fill:"rgba(160,180,200,.6)",fontFamily:"Share Tech Mono, monospace",children:s(_)})]},z)}),n.map(_=>r.jsx("path",{d:h(_),fill:"none",stroke:_.color||"#00f0ff",strokeWidth:"1.3",opacity:"0.95"},_.key))]}),r.jsx("style",{children:`
        .rrd-card { background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: 4px; padding: 10px 12px; }
        .rrd-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .rrd-card-title { font-family: var(--font-display); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--text-primary); }
        .rrd-card-legend { display: flex; gap: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); }
        .rrd-card-legend .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; box-shadow: 0 0 6px currentColor; vertical-align: 1px; }
        .rrd-svg { width: 100%; height: 160px; display: block; }
      `})]})}function mu(e){const t=parseFloat(localStorage.getItem("iowait_warning")||"5"),n=parseFloat(localStorage.getItem("iowait_critical")||"10");return e>=n?"danger":e>=t?"warning":"success"}function fu({value:e,decimals:t=0,suffix:n="",duration:a=800,className:s=""}){const[o,i]=u.useState(0),c=u.useRef(null),l=u.useRef(0),d=u.useRef(!0);return u.useEffect(()=>{const m=d.current?0:o;d.current=!1,c.current=null;const g=p=>{c.current||(c.current=p);const x=p-c.current,b=Math.min(x/a,1),k=1-Math.pow(1-b,3),j=m+(e-m)*k;i(j),b<1?l.current=requestAnimationFrame(g):i(e)};return l.current=requestAnimationFrame(g),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,a]),r.jsxs("span",{className:s,children:[o.toFixed(t),n]})}function hu({left:e,right:t,className:n=""}){const[a,s]=u.useState(0),[o,i]=u.useState(0),c=u.useRef(null),l=u.useRef(0),d=u.useRef(!0);return u.useEffect(()=>{const g=d.current?0:a,p=d.current?0:o;d.current=!1,c.current=null;const x=b=>{c.current||(c.current=b);const k=b-c.current,j=Math.min(k/800,1),f=1-Math.pow(1-j,3);s(Math.round(g+(e-g)*f)),i(Math.round(p+(t-p)*f)),j<1?l.current=requestAnimationFrame(x):(s(e),i(t))};return l.current=requestAnimationFrame(x),()=>{l.current&&cancelAnimationFrame(l.current)}},[e,t]),r.jsxs("span",{className:n,children:[a,"/",o]})}function Sg(e){if(!e)return"N/A";const t=e.match(/pve-manager\/([^\/]+)/);return t?t[1]:e}function Cg(e){if(!e)return"N/A";const t=e.match(/Linux\s+(\S+)/);return t?t[1]:e}function Mg({state:e,onClose:t,onShowDetails:n,onShowPerf:a,getNodeHealth:s}){const{t:o}=Le();if(u.useEffect(()=>{const p=()=>t(),x=()=>t(),b=k=>{k.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",p),document.addEventListener("scroll",x,!0),document.addEventListener("keydown",b)),()=>{document.removeEventListener("click",p),document.removeEventListener("scroll",x,!0),document.removeEventListener("keydown",b)}},[e.visible,t]),!e.visible||!e.node)return null;const i=e.node,c=i.status==="online",l=s(e.clusterId,i.node),d=l?`https://${l.host}:${l.port}/#v1:0:=node/${i.node}`:null,m=p=>{p.stopPropagation(),d&&window.open(d,"_blank","noopener,noreferrer"),t()},g=p=>{p.stopPropagation(),n(),t()};return r.jsxs("div",{className:"node-context-menu",style:{left:e.x,top:e.y},onClick:p=>p.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:`context-status ${c?"online":"offline"}`}),r.jsx("span",{className:"context-menu-name",children:i.node})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:g,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:o("vm.details")})]}),r.jsxs("button",{className:"context-menu-item",onClick:p=>{p.stopPropagation(),a(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:o("vm.perf_charts")})]}),d&&r.jsxs("button",{className:"context-menu-item",onClick:m,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:o("node.open_pve")})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("div",{className:"context-menu-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[o("node.status"),":"]}),r.jsx("span",{className:c?"text-success":"text-danger",children:c?o("node.online").toUpperCase():o("node.offline").toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[o("metric.cpu"),":"]}),r.jsxs("span",{children:[i.cpu.cores," ",o("node.cores")]})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[o("metric.memory"),":"]}),r.jsx("span",{children:Re(i.memory.total_bytes)})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[o("cluster.vms_short"),":"]}),r.jsx("span",{children:i.vm_count})]}),r.jsxs("div",{className:"info-row",children:[r.jsxs("span",{children:[o("cluster.cts_short"),":"]}),r.jsx("span",{children:i.ct_count})]})]})]})}function zg({cpuUsage:e,memUsage:t,compact:n,label:a="AVG LOAD"}){const s=(e+t)/2,o=ze(s),i=.3+s/100*.7,[c,l]=u.useState(0),d=u.useRef(null),m=u.useRef(0),g=u.useRef(!0);return u.useEffect(()=>{const x=g.current?0:c;g.current=!1,d.current=null;const b=k=>{d.current||(d.current=k);const j=k-d.current,f=Math.min(j/1e3,1),h=1-Math.pow(1-f,3),v=x+(s-x)*h;l(v),f<1?m.current=requestAnimationFrame(b):l(s)};return m.current=requestAnimationFrame(b),()=>{m.current&&cancelAnimationFrame(m.current)}},[s]),r.jsxs("div",{className:`reactor-core ${n?"compact":""}`,children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"reactor-svg",children:[r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:"var(--border)",strokeWidth:"2"}),r.jsx("circle",{cx:"100",cy:"100",r:"90",fill:"none",stroke:`var(--${o})`,strokeWidth:"2",strokeDasharray:`${s*5.65} 565`,strokeLinecap:"round",transform:"rotate(-90 100 100)",style:{filter:`drop-shadow(0 0 ${i*10}px var(--${o}))`,transition:"all 0.5s ease"}}),r.jsx("circle",{cx:"100",cy:"100",r:"70",fill:"none",stroke:"var(--border)",strokeWidth:"1",opacity:"0.5"}),r.jsx("circle",{cx:"100",cy:"100",r:"50",fill:"var(--bg-card)",stroke:`var(--${o})`,strokeWidth:"2",style:{filter:`drop-shadow(0 0 ${i*15}px var(--${o}))`}}),r.jsxs("text",{x:"100",y:"100",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-value",fill:`var(--${o})`,style:{textShadow:`0 0 10px var(--${o})`},children:[c.toFixed(0),"%"]}),r.jsx("text",{x:"100",y:"120",textAnchor:"middle",dominantBaseline:"middle",className:"reactor-label",fill:"var(--text-secondary)",fontSize:"8",children:a})]}),r.jsx("div",{className:"reactor-pulse",style:{opacity:i*.3}})]})}function $g({node:e,onClick:t,onContextMenu:n,clusterName:a,isPaused:s=!1}){ze(e.cpu.usage_percent),ze(e.memory.used_bytes/e.memory.total_bytes*100);const o=e.status==="online";return r.jsxs("div",{className:`node-card ${o?"":"offline"}`,onClick:t,onContextMenu:n,children:[r.jsxs("div",{className:"node-header",children:[r.jsx("span",{className:`node-status ${o?"online":"offline"}`}),r.jsx("span",{className:"node-name",children:e.node}),a&&r.jsx("span",{className:"node-cluster-tag",children:a})]}),r.jsx("div",{className:"node-ecg-container",children:r.jsx(Ng,{cpu:e.cpu.usage_percent,memory:e.memory.used_bytes/e.memory.total_bytes*100,diskIO:e.cpu.iowait!==void 0?Math.min(e.cpu.iowait*5,100):0,isOnline:o,isPaused:s})}),r.jsxs("div",{className:"node-info",children:[r.jsxs("span",{className:"node-info-item",children:[e.vm_count," VMs | ",e.ct_count," CTs"]}),r.jsx("span",{className:"node-info-item",children:ii(e.uptime)})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Eg({node:e,storages:t,onClose:n}){const{t:a}=Le(),s=e.status==="online",o=e.cpu.usage_percent,i=e.memory.used_bytes/e.memory.total_bytes*100,c=e.disk.used_bytes/e.disk.total_bytes*100;return r.jsx("div",{className:"node-detail-overlay",onClick:n,children:r.jsxs("div",{className:"node-detail-panel",onClick:l=>l.stopPropagation(),children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${s?"online":"offline"}`}),r.jsx("h2",{children:e.node}),r.jsx("span",{className:"detail-tag",children:s?a("node.online").toUpperCase():a("node.offline").toUpperCase()})]}),r.jsx("button",{className:"detail-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"detail-body",children:[r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.system_info")}),r.jsxs("div",{className:"info-grid",children:[r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.kernel")}),r.jsx("span",{className:"info-value",children:Cg(e.kernel_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.pve_version")}),r.jsx("span",{className:"info-value",children:Sg(e.pve_version)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.uptime")}),r.jsx("span",{className:"info-value",children:ii(e.uptime)})]}),r.jsxs("div",{className:"info-item",children:[r.jsx("span",{className:"info-label",children:a("node.workloads")}),r.jsxs("span",{className:"info-value",children:[e.vm_count," VMs, ",e.ct_count," CTs"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.resource_usage")}),r.jsxs("div",{className:"resource-bars",children:[r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.cpu")}),r.jsx("span",{className:`resource-value text-${ze(o)}`,children:ot(o,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${ze(o)}`,style:{width:`${o}%`}})}),r.jsxs("span",{className:"resource-detail",children:[e.cpu.cores," ",a("node.cores")]})]}),e.cpu.iowait!==void 0&&e.cpu.iowait>0&&r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.io_wait")}),r.jsx("span",{className:`resource-value text-${mu(e.cpu.iowait)}`,children:ot(e.cpu.iowait,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${mu(e.cpu.iowait)}`,style:{width:`${Math.min(e.cpu.iowait*5,100)}%`}})}),r.jsx("span",{className:"resource-detail",children:a("node.io_wait_desc")})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("metric.memory")}),r.jsx("span",{className:`resource-value text-${ze(i)}`,children:ot(i,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${ze(i)}`,style:{width:`${i}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Re(e.memory.used_bytes)," / ",Re(e.memory.total_bytes)]})]}),r.jsxs("div",{className:"resource-bar-item",children:[r.jsxs("div",{className:"resource-header",children:[r.jsx("span",{className:"resource-label",children:a("node.root_disk")}),r.jsx("span",{className:`resource-value text-${ze(c)}`,children:ot(c,1)})]}),r.jsx("div",{className:"resource-track",children:r.jsx("div",{className:`resource-fill ${ze(c)}`,style:{width:`${c}%`}})}),r.jsxs("span",{className:"resource-detail",children:[Re(e.disk.used_bytes)," / ",Re(e.disk.total_bytes)]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsx("h3",{className:"section-title",children:a("node.network_io")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↓ ",a("metric.rx")]}),r.jsxs("span",{className:"net-value",children:[Re(e.network.rx_bytes_sec),"/s"]})]}),r.jsxs("div",{className:"net-stat",children:[r.jsxs("span",{className:"net-direction",children:["↑ ",a("metric.tx")]}),r.jsxs("span",{className:"net-value",children:[Re(e.network.tx_bytes_sec),"/s"]})]})]})]}),r.jsxs("div",{className:"detail-section",children:[r.jsxs("h3",{className:"section-title",children:[a("node.storage")," (",t.length,")"]}),t.length>0?r.jsx("div",{className:"storage-list",children:t.map(l=>{const d=l.disk.used_bytes/l.disk.total_bytes*100;return r.jsxs("div",{className:`storage-item ${l.shared?"shared":"local"}`,children:[r.jsxs("div",{className:"storage-header",children:[r.jsx("span",{className:"storage-name",children:l.storage}),r.jsx("span",{className:"storage-type",children:l.type}),l.shared&&r.jsx("span",{className:"storage-shared-badge",children:a("node.shared")})]}),r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${ze(d)}`,style:{width:`${d}%`}})}),r.jsxs("div",{className:"storage-info",children:[r.jsxs("span",{children:[Re(l.disk.used_bytes)," / ",Re(l.disk.total_bytes)]}),r.jsx("span",{className:`text-${ze(d)}`,children:ot(d,1)})]}),r.jsx("div",{className:"storage-content-labels",children:[...l.content].sort().map(m=>r.jsx("span",{className:"content-label",children:m},m))})]},l.storage)})}):r.jsx("div",{className:"no-storage",children:a("node.no_storage")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})})}function Tg({cluster:e,clusters:t,onSelectVM:n,onNavigateToVMMatrix:a,isPaused:s=!1}){const{t:o}=Le(),[i,c]=u.useState(null),[l,d]=u.useState(null),[m,g]=u.useState({visible:!1,x:0,y:0,node:null,clusterId:""}),p=!e&&t&&Object.keys(t).length>0,x=u.useCallback((w,_)=>{var z;return e&&e.client_health?e.client_health[_]||null:t&&((z=t[w])!=null&&z.client_health)&&t[w].client_health[_]||null},[e,t]),b=u.useCallback((w,_,z)=>{w.preventDefault(),w.stopPropagation();const $=Math.min(w.clientX,window.innerWidth-250),P=Math.min(w.clientY,window.innerHeight-280);g({visible:!0,x:$,y:P,node:_,clusterId:z})},[]),k=u.useCallback(()=>{g(w=>({...w,visible:!1}))},[]),j=u.useMemo(()=>{var _,z,$,P,D;const w=[];if(p)Object.entries(t).forEach(([I,A])=>{var U,R,G,L,V;const re=Object.values(A.nodes);if(re.length>0){const B=re.reduce((Q,S)=>Q+S.cpu.usage_percent,0)/re.length,K=re.reduce((Q,S)=>S.memory.total_bytes===0?Q:Q+S.memory.used_bytes/S.memory.total_bytes*100,0)/re.length;w.push({clusterId:I,clusterName:A.name||I,clusterNodes:re,isStandalone:((U=A.summary)==null?void 0:U.is_standalone)||!1,avgCpu:B,avgMem:K,vmsRunning:((R=A.summary)==null?void 0:R.vms_running)||0,ctsRunning:((G=A.summary)==null?void 0:G.cts_running)||0,vmCount:((L=A.summary)==null?void 0:L.vm_count)||0,ctCount:((V=A.summary)==null?void 0:V.ct_count)||0})}});else if(e){const I=Object.values(e.nodes),A=I.length>0?I.reduce((U,R)=>U+R.cpu.usage_percent,0)/I.length:0,re=I.length>0?I.reduce((U,R)=>R.memory.total_bytes===0?U:U+R.memory.used_bytes/R.memory.total_bytes*100,0)/I.length:0;w.push({clusterId:e.id,clusterName:e.name||e.id,clusterNodes:I,isStandalone:((_=e.summary)==null?void 0:_.is_standalone)||!1,avgCpu:A,avgMem:re,vmsRunning:((z=e.summary)==null?void 0:z.vms_running)||0,ctsRunning:(($=e.summary)==null?void 0:$.cts_running)||0,vmCount:((P=e.summary)==null?void 0:P.vm_count)||0,ctCount:((D=e.summary)==null?void 0:D.ct_count)||0})}return w},[e,t,p]),f=j.flatMap(w=>w.clusterNodes);u.useMemo(()=>f.length===0?0:f.reduce((w,_)=>w+_.cpu.usage_percent,0)/f.length,[f]),u.useMemo(()=>f.length===0?0:f.reduce((w,_)=>_.memory.total_bytes===0?w:w+_.memory.used_bytes/_.memory.total_bytes*100,0)/f.length,[f]);let h=null,v=[];if(i){const[w,_]=i.split("/");if(p&&t){const z=t[w];z&&(h=z.nodes[_]||null,v=Object.values(z.storages).filter($=>$.node===_))}else e&&(h=e.nodes[_]||null,v=Object.values(e.storages).filter(z=>z.node===_))}if(!e&&!p)return r.jsx("div",{className:"cluster-core empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:o("cluster.select")})]})});const N=p?o("cluster.clusters_count",{n:Object.keys(t).length}):(e==null?void 0:e.name)||(e==null?void 0:e.id)||o("cluster.nodes");return r.jsxs("div",{className:"cluster-core",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"core-header",children:r.jsxs("h1",{className:"core-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"11",width:"20",height:"6",rx:"1"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"14",r:"1",fill:"currentColor"}),r.jsx("path",{d:"M10 6h8M10 14h8",strokeLinecap:"round"})]}),N]})}),r.jsx("div",{className:"cluster-sections",children:j.map(w=>r.jsxs("div",{className:"cluster-section",children:[r.jsxs("div",{className:`cluster-section-header ${a?"clickable":""}`,onClick:()=>a==null?void 0:a(w.clusterId),title:a?o("cluster.view_vms_in",{name:w.clusterName}):void 0,children:[r.jsxs("div",{className:"section-title-group",children:[r.jsx("span",{className:"cluster-section-name",children:w.clusterName}),w.isStandalone&&r.jsx("span",{className:"standalone-tag",children:o("dashboard.standalone")}),a&&r.jsx("span",{className:"nav-arrow",children:"→"})]}),r.jsxs("span",{className:"cluster-section-count",children:[w.clusterNodes.filter(_=>_.status==="online").length,"/",w.clusterNodes.length," ",o("cluster.nodes")]})]}),r.jsxs("div",{className:"cluster-section-content",children:[r.jsx("div",{className:"section-reactor",children:r.jsx(zg,{cpuUsage:w.avgCpu,memUsage:w.avgMem,compact:!0,label:o("node.avg_load")})}),r.jsxs("div",{className:"section-nodes",children:[r.jsx("div",{className:"nodes-grid",children:w.clusterNodes.map(_=>r.jsx($g,{node:_,onClick:()=>c(`${w.clusterId}/${_.node}`),onContextMenu:z=>b(z,_,w.clusterId),isPaused:s},`${w.clusterId}-${_.node}`))}),r.jsxs("div",{className:"ecg-legend",children:[r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line cpu"}),r.jsx("span",{children:o("metric.cpu")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line mem"}),r.jsx("span",{children:o("metric.memory")})]}),r.jsxs("span",{className:"ecg-legend-item",children:[r.jsx("span",{className:"ecg-legend-line io"}),r.jsx("span",{children:o("node.io_wait")})]})]})]}),r.jsxs("div",{className:"section-telemetry",children:[r.jsxs("div",{className:"mini-telemetry",children:[r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${ze(w.avgCpu)}`,style:{width:`${w.avgCpu}%`}})}),r.jsx(fu,{value:w.avgCpu,decimals:0,suffix:"%",className:`mini-value text-${ze(w.avgCpu)}`})]}),r.jsxs("div",{className:"mini-chart",children:[r.jsx("span",{className:"mini-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-fill ${ze(w.avgMem)}`,style:{width:`${w.avgMem}%`}})}),r.jsx(fu,{value:w.avgMem,decimals:0,suffix:"%",className:`mini-value text-${ze(w.avgMem)}`})]})]}),r.jsxs("div",{className:"mini-stats",children:[r.jsxs("div",{className:"mini-stat",children:[r.jsx(hu,{left:w.vmsRunning,right:w.vmCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"VMs"})]}),r.jsxs("div",{className:"mini-stat",children:[r.jsx(hu,{left:w.ctsRunning,right:w.ctCount,className:"mini-stat-value"}),r.jsx("span",{className:"mini-stat-label",children:"CTs"})]})]})]})]})]},w.clusterId))}),r.jsx("div",{className:"core-footer",children:r.jsxs("button",{className:"btn-view-vms",onClick:n,children:[o("cluster.view_all_vms")," →"]})}),h&&r.jsx(Eg,{node:h,storages:v,onClose:()=>c(null)}),r.jsx(Mg,{state:m,onClose:k,onShowDetails:()=>{m.node&&c(`${m.clusterId}/${m.node.node}`)},onShowPerf:()=>{m.node&&d({clusterId:m.clusterId,node:m.node.node})},getNodeHealth:x}),r.jsx(of,{open:l!==null,clusterId:(l==null?void 0:l.clusterId)||"",node:(l==null?void 0:l.node)||"",kind:"node",title:l?l.node:"",onClose:()=>d(null)}),r.jsx("style",{children:`
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
      `})]})}function lf({state:e,onClose:t,onShowDetails:n,onPowerAction:a,onOpenConsole:s,onOpenSnapshots:o,onBackupNow:i,onRemoteMigrate:c,onShowPerf:l,getNodeHealth:d,userRole:m,consoleMode:g,consolePasswordSet:p,hideSnapshots:x,hideBackup:b,hideRemoteMigrate:k,hideConsole:j}){const{t:f}=Le(),h=Gr();if(u.useEffect(()=>{const P=()=>t(),D=()=>t(),I=A=>{A.key==="Escape"&&t()};return e.visible&&(document.addEventListener("click",P),document.addEventListener("scroll",D,!0),document.addEventListener("keydown",I)),()=>{document.removeEventListener("click",P),document.removeEventListener("scroll",D,!0),document.removeEventListener("keydown",I)}},[e.visible,t]),!e.visible||!e.vm)return null;const v=e.vm,N=d(e.clusterId,v.node),w=N?`https://${N.host}:${N.port}/#v1:0:=${v.type}/${v.vmid}`:null,_=P=>{P.stopPropagation(),w&&window.open(w,"_blank","noopener,noreferrer"),t()},z=P=>{P.stopPropagation(),n(),t()},$=r.jsxs("div",{className:"vm-context-menu",style:{left:e.x,top:e.y},onClick:P=>P.stopPropagation(),children:[r.jsxs("div",{className:"context-menu-header",children:[r.jsx("span",{className:"context-menu-name",children:v.name}),r.jsxs("span",{className:"context-menu-id",children:["#",v.vmid]})]}),r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:z,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:f("vm.details")})]}),w&&r.jsxs("button",{className:"context-menu-item",onClick:_,children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15,3 21,3 21,9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),r.jsx("span",{children:f("vm.open_pve")})]}),!j&&(m==="operator"||m==="admin")&&(()=>{const P=g==="disabled"?"console.disabled":v.status!=="running"?"console.vm_not_running":null,D=!!P;return r.jsxs("button",{className:`context-menu-item ${D?"is-disabled":""}`,title:D?f(P):void 0,onClick:I=>{if(I.stopPropagation(),D){t(),h.alert(f(P));return}s(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("polyline",{points:"8 21 16 21 12 17 8 21"}),r.jsx("polyline",{points:"6 8 9 11 6 14"}),r.jsx("line",{x1:"11",y1:"14",x2:"14",y2:"14"})]}),r.jsx("span",{children:f("vm.console")})]})})(),!x&&(m==="operator"||m==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),o(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("path",{d:"M12 7v5l3 2"})]}),r.jsx("span",{children:f("vm.snapshots")})]}),r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation();const D=`/tasks?vmid=${encodeURIComponent(String(v.vmid))}&cluster=${encodeURIComponent(e.clusterId)}`;window.history.pushState(null,"",D),window.dispatchEvent(new PopStateEvent("popstate")),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"})]}),r.jsx("span",{children:f("vm.task_history")})]}),l&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),l(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"14 7 21 7 21 14"})]}),r.jsx("span",{children:f("vm.perf_charts")})]}),!b&&(m==="operator"||m==="admin")&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),i(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),r.jsx("span",{children:f("vm.backup_now")})]}),(m==="operator"||m==="admin")&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),v.status!=="running"&&r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),a({vm:v,clusterId:e.clusterId,action:"start"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:f("vm.start")})]}),v.status==="running"&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),a({vm:v,clusterId:e.clusterId,action:"shutdown"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:f("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),a({vm:v,clusterId:e.clusterId,action:"reboot"}),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:f("vm.reboot")})]}),r.jsxs("button",{className:"context-menu-item danger",onClick:P=>{P.stopPropagation(),a({vm:v,clusterId:e.clusterId,action:"stop"}),t()},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:f("vm.stop_hard")})]})]})]}),!k&&m==="admin"&&v.type!=="lxc"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"context-menu-divider"}),r.jsxs("button",{className:"context-menu-item",onClick:P=>{P.stopPropagation(),c(),t()},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 12h12"}),r.jsx("polyline",{points:"13 6 19 12 13 18"}),r.jsx("circle",{cx:"20",cy:"6",r:"2"}),r.jsx("circle",{cx:"20",cy:"18",r:"2"})]}),r.jsx("span",{children:f("vm.migrate_remote")})]})]}),r.jsx("style",{children:`
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
        @keyframes context-menu-appear {
          0%   { opacity: 0; transform: scale(0.9) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
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
      `})]});return Hc.createPortal($,document.body)}const Pg={qmstart:{label:"Starting",icon:"▶",color:"var(--success)"},qmstop:{label:"Stopping",icon:"■",color:"var(--danger)"},qmshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},qmrestart:{label:"Restarting",icon:"↻",color:"var(--primary)"},qmreset:{label:"Resetting",icon:"↺",color:"var(--warning)"},qmmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},qmclone:{label:"Cloning",icon:"⎘",color:"var(--primary)"},qmsnapshot:{label:"Snapshotting",icon:"◉",color:"var(--primary)"},qmrollback:{label:"Rolling Back",icon:"↩",color:"var(--warning)"},vzdump:{label:"Backing Up",icon:"⬇",color:"var(--primary)"},qmrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzstart:{label:"Starting",icon:"▶",color:"var(--success)"},vzstop:{label:"Stopping",icon:"■",color:"var(--danger)"},vzshutdown:{label:"Shutting Down",icon:"⏻",color:"var(--warning)"},vzrestore:{label:"Restoring",icon:"⬆",color:"var(--success)"},vzmigrate:{label:"Migrating",icon:"→",color:"var(--accent)"},hamigrate:{label:"HA Migrating",icon:"⇢",color:"var(--accent)"}};function Rg(e){return e.includes("start")||e.includes("restore")?"pulse-grow":e.includes("stop")||e.includes("shutdown")?"pulse-fade":e.includes("migrate")?"slide":e.includes("dump")||e.includes("backup")?"stripe":e.includes("snapshot")?"flash":e.includes("rollback")?"reverse":"pulse"}function Ig({task:e}){const t=Pg[e.task_type]||{label:e.task_type,icon:"⚙",color:"var(--primary)"},n=Rg(e.task_type);return r.jsxs("span",{className:`task-badge ${n}`,style:{"--task-color":t.color},title:t.label,children:[r.jsx("span",{className:"task-badge-icon",children:t.icon}),r.jsx("span",{className:"task-badge-text",children:t.label}),r.jsx("style",{children:Lg})]})}const Lg=`
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
`;function Ag({open:e,title:t,details:n,typeToConfirm:a,destructive:s=!1,confirmLabel:o="Confirm",cancelLabel:i="Cancel",onConfirm:c,onCancel:l}){const[d,m]=Ho.useState(""),g=u.useRef(null),p=u.useRef(null);if(u.useEffect(()=>{e&&(m(""),setTimeout(()=>{var b,k;a?(b=p.current)==null||b.focus():(k=g.current)==null||k.focus()},50))},[e,a]),u.useEffect(()=>{if(!e)return;const b=k=>{k.key==="Escape"&&(k.preventDefault(),l()),k.key==="Enter"&&(!a||d===a)&&(k.preventDefault(),c())};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[e,d,a,c,l]),!e)return null;const x=!a||d===a;return r.jsxs("div",{onClick:l,style:{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cmFade .18s ease"},children:[r.jsx("style",{children:`
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
      `}),r.jsxs("div",{className:`cm-card ${s?"danger":""}`,onClick:b=>b.stopPropagation(),children:[r.jsx("div",{className:"cm-eyebrow",children:s?"// destructive action":"// confirm"}),r.jsx("h3",{className:"cm-title",children:t}),n&&r.jsx("div",{className:"cm-details",children:n}),a&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{className:"cm-input-label",children:["Type ",r.jsx("code",{style:{fontFamily:"Share Tech Mono, monospace",color:"#ff3860",userSelect:"all"},children:a})," to confirm"]}),r.jsx("input",{ref:p,className:"cm-input",type:"text",value:d,onChange:b=>m(b.target.value),autoComplete:"off",spellCheck:!1})]}),r.jsxs("div",{className:"cm-actions",children:[r.jsx("button",{className:"cm-btn cancel",onClick:l,children:i}),r.jsx("button",{ref:g,className:`cm-btn confirm ${s?"danger":""}`,disabled:!x,onClick:c,children:o})]})]})]})}function Oa({value:e,options:t,onChange:n,placeholder:a,className:s,disabled:o}){const[i,c]=u.useState(!1),[l,d]=u.useState(-1),m=u.useRef(null),g=u.useRef(null),p=u.useId(),x=t.find(f=>f.value===e);u.useEffect(()=>{if(!i)return;const f=v=>{var z,$;const N=v.target,w=(z=m.current)==null?void 0:z.contains(N),_=($=g.current)==null?void 0:$.contains(N);!w&&!_&&c(!1)},h=v=>{if(v.key==="Escape"){c(!1);return}if(v.key==="ArrowDown")v.preventDefault(),d(N=>Math.min(t.length-1,N<0?0:N+1));else if(v.key==="ArrowUp")v.preventDefault(),d(N=>Math.max(0,N-1));else if(v.key==="Enter"){v.preventDefault();const N=t[l];N&&!N.disabled&&(n(N.value),c(!1))}};return document.addEventListener("mousedown",f),document.addEventListener("keydown",h),()=>{document.removeEventListener("mousedown",f),document.removeEventListener("keydown",h)}},[i,l,t,n]);const b=()=>{o||(c(f=>!f),d(t.findIndex(f=>f.value===e)))},[k,j]=u.useState({left:0,top:0,width:200,flipUp:!1,maxH:280});return u.useLayoutEffect(()=>{if(!i)return;const f=()=>{var P;const h=(P=m.current)==null?void 0:P.getBoundingClientRect();if(!h)return;const v=6,N=320,w=window.innerHeight-h.bottom-v-8,_=h.top-v-8,z=w<160&&_>w+40,$=Math.max(120,Math.min(N,z?_:w));j({left:h.left,top:z?h.top-v:h.bottom+v,width:h.width,flipUp:z,maxH:$})};return f(),window.addEventListener("resize",f),window.addEventListener("scroll",f,!0),()=>{window.removeEventListener("resize",f),window.removeEventListener("scroll",f,!0)}},[i]),r.jsxs("div",{ref:m,className:`cyber-select ${s||""} ${i?"open":""} ${o?"disabled":""}`,children:[r.jsx("style",{children:Og}),r.jsxs("button",{type:"button",id:p,className:"cyber-select-trigger","aria-haspopup":"listbox","aria-expanded":i,onClick:b,disabled:o,children:[r.jsx("span",{className:"cyber-select-value",children:x?x.label:a||"—"}),r.jsx("svg",{className:"cyber-select-caret",width:"10",height:"10",viewBox:"0 0 10 10","aria-hidden":!0,children:r.jsx("path",{d:"M2 4l3 3 3-3",stroke:"currentColor",strokeWidth:"1.6",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),i&&Hc.createPortal(r.jsx("div",{ref:g,className:"cyber-select-list",role:"listbox",style:{left:k.left,width:k.width,...k.flipUp?{bottom:window.innerHeight-k.top,top:"auto"}:{top:k.top},maxHeight:k.maxH},children:t.map((f,h)=>r.jsxs("div",{role:"option","aria-selected":f.value===e,"aria-disabled":f.disabled||void 0,className:`cyber-select-opt ${f.value===e?"selected":""} ${h===l?"hover":""} ${f.disabled?"disabled":""}`,onMouseEnter:()=>d(h),onClick:()=>{f.disabled||(n(f.value),c(!1))},children:[r.jsx("div",{className:"cyber-select-opt-main",children:f.label}),f.hint&&r.jsx("div",{className:"cyber-select-opt-hint",children:f.hint}),f.value===e&&r.jsx("svg",{className:"cyber-select-check",width:"12",height:"12",viewBox:"0 0 12 12","aria-hidden":!0,children:r.jsx("path",{d:"M2 6l3 3 5-6",stroke:"currentColor",strokeWidth:"1.8",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]},f.value))}),document.body)]})}const Og=`
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
     inline style. */
  position: fixed;
  z-index: 2000;
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
`,Fg=e=>{if(!e)return"—";const t=e/1024**3;return t>=100?`${t.toFixed(0)}G`:`${t.toFixed(1)}G`};function cf({open:e,cluster_id:t,vm:n,onClose:a,onMigrationStarted:s}){const{t:o}=Le(),[i,c]=u.useState("endpoint"),[l,d]=u.useState([]),[m,g]=u.useState(""),[p,x]=u.useState(""),[b,k]=u.useState(!1),[j,f]=u.useState(null),[h,v]=u.useState(null),[N,w]=u.useState(!1),[_,z]=u.useState({}),[$,P]=u.useState({}),[D,I]=u.useState(""),[A,re]=u.useState(""),[U,R]=u.useState(!0),[G,L]=u.useState(!1),[V,B]=u.useState(""),[K,Q]=u.useState(""),[S,Se]=u.useState(""),[te,Me]=u.useState(null),[X,me]=u.useState(!1),Ce=async()=>{if(!(!n||!Z)){me(!0),Me(null),Q("");try{const W=await Be.migrationPrecheck(t,n.vmid,Z.cluster_id,Z.node_name||Z.node_host);Me({ok:W.ok,blockers:W.blockers,warnings:W.warnings})}catch(W){const le=W instanceof Error?W.message:String(W);Q(`pre-flight check failed: ${le}`)}finally{me(!1)}}};u.useEffect(()=>{e&&(c("endpoint"),d([]),g(""),x(""),f(null),v(null),z({}),P({}),I(""),re(n?String(n.vmid):""),B(""),Q(""),Se(""),Me(null),Be.listRemoteEndpoints(t).then(W=>d(W.endpoints)).catch(W=>Q(`could not list target clusters: ${W.message||W}`)),n&&Be.getMigrationSource(t,n.vmid).then(f).catch(W=>Q(`could not introspect source VM: ${W.message||W}`)))},[e,t,n]),u.useEffect(()=>{if(!e)return;const W=le=>{le.key==="Escape"&&i!=="submitting"&&a()};return document.addEventListener("keydown",W),()=>document.removeEventListener("keydown",W)},[e,i,a]);const Z=l.find(W=>Bi(W)===m),ae=async W=>{var he;g(W);const le=l.find(ue=>Bi(ue)===W);if(le){k(!0),w(!0),Q(""),v(null),I("");try{const ue=await Be.fetchRemoteFingerprint(le.node_host,le.node_port);x(ue.fingerprint)}catch(ue){const we=ue instanceof Error?ue.message:String(ue);Q(`could not auto-fetch fingerprint (${we}); paste manually`),x("")}finally{k(!1)}try{const ue=le.node_name||le.node_host,we=await Be.getMigrationTargets(le.cluster_id,ue);v(we);const Ae=we.ips.find(Ge=>Ge.address===le.node_host);I(Ae?Ae.address:((he=we.ips[0])==null?void 0:he.address)||le.node_host)}catch(ue){const we=ue instanceof Error?ue.message:String(ue);Q(`could not enumerate target node resources: ${we}`)}finally{w(!1)}}};u.useEffect(()=>{!j||!h||(z(W=>{const le={...W};return j.disks.forEach(he=>{var ue;if(!le[he.key]){const we=h.storages.find(Ae=>Ae.storage===he.storage);le[he.key]=((ue=we||h.storages[0])==null?void 0:ue.storage)||""}}),le}),P(W=>{const le={...W};return j.nics.forEach(he=>{var ue;if(!le[he.key]){const we=h.bridges.find(Ae=>Ae.iface===he.bridge);le[he.key]=((ue=we||h.bridges[0])==null?void 0:ue.iface)||""}}),le}))},[j,h]);const T=u.useMemo(()=>{if(!j)return"";const W=new Set,le=new Map;return j.disks.forEach(he=>{const ue=_[he.key];he.storage&&ue&&(le.set(he.storage,ue),W.add(ue))}),W.size===1?Array.from(W)[0]:Array.from(le.entries()).map(([he,ue])=>`${he}=${ue}`).join(",")},[j,_]),C=u.useMemo(()=>{if(!j)return"";const W=new Set,le=new Map;return j.nics.forEach(he=>{const ue=$[he.key];he.bridge&&ue&&(le.set(he.bridge,ue),W.add(ue))}),W.size===1?Array.from(W)[0]:Array.from(le.entries()).map(([he,ue])=>`${he}=${ue}`).join(",")},[j,$]),J=async()=>{if(!(!n||!Z)){c("submitting"),Q("");try{const W=await Be.remoteMigrate(t,n.vmid,{target_cluster_id:Z.cluster_id,target_endpoint_host:D||Z.node_host,target_endpoint_port:Z.node_port,target_endpoint_fingerprint:p||void 0,target_vmid:parseInt(A,10),target_bridge_map:C,target_storage_map:T,online:U,delete_source:G,bwlimit:V?parseInt(V,10):void 0});Se(W.upid),c("done"),s==null||s(W.upid)}catch(W){const le=W instanceof Error?W.message:String(W);Q(le),c("error")}}};if(!e||!n)return null;const oe=!!A&&/^\d+$/.test(A)&&!!j&&!!h&&j.disks.every(W=>!!_[W.key])&&j.nics.every(W=>!!$[W.key]),be=i==="endpoint"?!!Z&&!!h&&!!D:i==="mappings"?oe:!0;return r.jsxs("div",{onClick:()=>i!=="submitting"&&a(),style:Bg,children:[r.jsx("style",{children:Wg}),r.jsxs("div",{className:"rmm",onClick:W=>W.stopPropagation(),children:[r.jsx("div",{className:"rmm-eyebrow",children:o("rmm.eyebrow",{step:o(`rmm.step.${i}`)})}),r.jsx("h3",{className:"rmm-title",children:o("rmm.title",{vmid:n.vmid,name:n.name})}),i==="endpoint"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.endpoint.intro")}),r.jsx("label",{children:o("rmm.endpoint.target")}),r.jsx(Oa,{value:m,placeholder:o("rmm.endpoint.select"),options:l.map(W=>({value:Bi(W),label:`${W.cluster_name} @ ${W.node_host}:${W.node_port}`})),onChange:W=>ae(W)}),r.jsx("label",{children:o("rmm.endpoint.fp_label")}),r.jsx("input",{type:"text",value:p,onChange:W=>x(W.target.value),placeholder:b?o("rmm.endpoint.fp_fetching"):"AB:CD:…",spellCheck:!1,autoComplete:"off"}),Z&&r.jsxs(r.Fragment,{children:[r.jsxs("label",{children:[o("rmm.endpoint.datapath")," ",r.jsx("span",{className:"hint",children:o("rmm.endpoint.datapath_hint")})]}),r.jsx(Oa,{value:D,disabled:N||!h,placeholder:N?o("rmm.endpoint.datapath_loading"):"",options:N?[]:!h||h.ips.length===0?[{value:Z.node_host,label:`${Z.node_host} (mgmt)`}]:h.ips.map(W=>({value:W.address,label:`${W.address} · ${W.iface} (${W.type})`})),onChange:W=>I(W)}),r.jsx("p",{className:"rmm-tip",children:o("rmm.endpoint.datapath_tip")})]}),K&&r.jsx("div",{className:"rmm-err",children:K}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:a,children:o("action.cancel")}),r.jsx("button",{className:"primary",disabled:!be,onClick:()=>c("mappings"),children:o("rmm.action.next")})]})]}),i==="mappings"&&Z&&j&&h&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",children:o("rmm.mappings.intro")}),r.jsxs("label",{children:[o("rmm.mappings.target_vmid")," ",r.jsx("span",{className:"hint",children:o("rmm.mappings.target_vmid_hint")})]}),r.jsx("input",{type:"text",inputMode:"numeric",value:A,onChange:W=>re(W.target.value)}),j.disks.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.disks")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_size")}),r.jsx("span",{children:o("rmm.mappings.col_target_storage")})]}),j.disks.map(W=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:W.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[W.storage," ",r.jsx("em",{children:W.size})]}),r.jsx(Oa,{value:_[W.key]||"",options:h.storages.map(le=>({value:le.storage,label:`${le.storage} (${le.type}, ${Fg(le.avail)} free)`})),onChange:le=>z({..._,[W.key]:le})})]},W.key))]})]}),j.nics.length>0&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:o("rmm.mappings.nics")}),r.jsxs("div",{className:"rmm-maptable",children:[r.jsxs("div",{className:"rmm-maprow rmm-maphead",children:[r.jsx("span",{children:o("rmm.mappings.col_source")}),r.jsx("span",{children:o("rmm.mappings.col_bridge")}),r.jsx("span",{children:o("rmm.mappings.col_target_bridge")})]}),j.nics.map(W=>r.jsxs("div",{className:"rmm-maprow",children:[r.jsx("code",{className:"rmm-mapkey",children:W.key}),r.jsxs("code",{className:"rmm-mapsrc",children:[W.bridge," ",r.jsx("em",{children:W.model})]}),r.jsx(Oa,{value:$[W.key]||"",options:h.bridges.map(le=>({value:le.iface,label:`${le.iface}${le.address?` (${le.address})`:""}`})),onChange:le=>P({...$,[W.key]:le})})]},W.key))]})]}),r.jsxs("div",{className:"rmm-row",children:[r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:U,onChange:W=>R(W.target.checked)}),r.jsx("span",{children:o("rmm.mappings.online")})]}),r.jsxs("label",{className:"rmm-check",children:[r.jsx("input",{type:"checkbox",checked:G,onChange:W=>L(W.target.checked)}),r.jsx("span",{children:o("rmm.mappings.delete_source")})]})]}),r.jsx("label",{children:o("rmm.mappings.bwlimit")}),r.jsx("input",{type:"text",inputMode:"numeric",value:V,onChange:W=>B(W.target.value),placeholder:"0"}),K&&r.jsx("div",{className:"rmm-err",children:K}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("endpoint"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:!be,onClick:()=>c("review"),children:o("rmm.action.review")})]})]}),i==="review"&&Z&&r.jsxs(r.Fragment,{children:[r.jsx(Dg,{vm:n,selected:Z,clusterId:t,precheck:te,precheckLoading:X,onRun:Ce,t:o}),r.jsx("p",{className:"rmm-sub",children:o("rmm.review.intro")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.from")}),r.jsxs("code",{children:[t,"/",n.node,"/vm/",n.vmid," (",n.name,")"]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.to")}),r.jsxs("code",{children:[Z.cluster_id,"/",Z.node_host,":",Z.node_port," → vmid ",A]})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.data_path")}),r.jsx("code",{children:D})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.fingerprint")}),r.jsx("code",{className:"trunc",children:p||r.jsx("em",{children:o("rmm.review.fp_none")})})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.storage_map")}),r.jsx("code",{children:T||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bridge_map")}),r.jsx("code",{children:C||"<empty>"})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.online")}),r.jsx("code",{children:o(U?"rmm.review.online_yes":"rmm.review.online_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.delete_source")}),r.jsx("code",{children:o(G?"rmm.review.delete_source_yes":"rmm.review.delete_source_no")})]}),r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.review.bandwidth")}),r.jsx("code",{children:V?`${V} KB/s`:o("rmm.review.unlimited")})]})]}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary danger",disabled:X||te!==null&&!te.ok,onClick:J,children:o("rmm.action.start")})]})]}),i==="submitting"&&r.jsxs("div",{className:"rmm-spin",children:[r.jsx("div",{className:"rmm-spin-ring"}),r.jsx("div",{children:o("rmm.submitting")})]}),i==="done"&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"rmm-sub",style:{color:"#00ff88"},children:o("rmm.done.msg")}),r.jsxs("div",{className:"rmm-review",children:[r.jsxs("div",{children:[r.jsx("span",{children:o("rmm.done.upid")}),r.jsx("code",{className:"trunc",style:{userSelect:"all"},children:S})]}),r.jsxs("div",{children:[r.jsx("span",{}),r.jsx("span",{style:{color:"var(--text-dim)"},children:o("rmm.done.hint")})]})]}),r.jsx("div",{className:"rmm-actions",children:r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})})]}),i==="error"&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-err",style:{marginTop:16},children:K}),r.jsxs("div",{className:"rmm-actions",children:[r.jsx("button",{className:"ghost",onClick:()=>c("mappings"),children:o("rmm.action.back")}),r.jsx("button",{className:"primary",onClick:a,children:o("rmm.action.close")})]})]})]})]})}function Bi(e){return`${e.cluster_id}::${e.node_host}::${e.node_port}`}function Dg({vm:e,selected:t,clusterId:n,precheck:a,precheckLoading:s,onRun:o,t:i}){if(Ho.useEffect(()=>{a===null&&!s&&o()},[]),s)return r.jsx("div",{className:"rmm-precheck loading",children:i("rmm.precheck.running")});if(a===null)return null;const c=a.blockers.length>0,l=a.warnings.length>0,d=c?"blockers":l?"warnings":"ok";return r.jsxs("div",{className:`rmm-precheck ${d}`,children:[c&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.blockers")}),r.jsx("ul",{children:a.blockers.map((m,g)=>r.jsx("li",{children:m},g))})]}),l&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.warnings")}),r.jsx("ul",{children:a.warnings.map((m,g)=>r.jsx("li",{children:m},g))})]}),!c&&!l&&r.jsx("div",{className:"rmm-precheck-head",children:i("rmm.precheck.ok")}),r.jsx("div",{className:"rmm-precheck-actions",children:r.jsx("button",{className:"ghost",onClick:o,children:i("rmm.action.precheck")})})]})}const Bg={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"rmmFade .18s ease"},Wg=`
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
`;function Ug(e){if(!e)return"—";try{return new Date(e*1e3).toLocaleString()}catch{return String(e)}}function df({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Le(),o=Gr(),[i,c]=u.useState([]),[l,d]=u.useState(!1),[m,g]=u.useState(!1),[p,x]=u.useState(""),[b,k]=u.useState(""),[j,f]=u.useState(!1),[h,v]=u.useState(""),N=async()=>{if(n){d(!0),v("");try{const $=await Be.listSnapshots(t,n.vmid);c(($.snapshots||[]).filter(P=>P.name!=="current"))}catch($){v($ instanceof Error?$.message:String($))}finally{d(!1)}}};if(u.useEffect(()=>{e&&(x(""),k(""),f(!1),v(""),N())},[e,t,n==null?void 0:n.vmid]),u.useEffect(()=>{if(!e)return;const $=P=>{P.key==="Escape"&&a()};return document.addEventListener("keydown",$),()=>document.removeEventListener("keydown",$)},[e,a]),!e||!n)return null;const w=async()=>{if(p){if(!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(p)){v("snapshot name must match [a-zA-Z][a-zA-Z0-9_-]*");return}g(!0),v("");try{await Be.createSnapshot(t,n.vmid,{snapname:p,description:b,vmstate:j}),x(""),k(""),f(!1),await N()}catch($){v($ instanceof Error?$.message:String($))}finally{g(!1)}}},_=async $=>{if(await o.confirm(s("snap.confirm_delete",{name:$.name}),{destructive:!0})){v("");try{await Be.deleteSnapshot(t,n.vmid,$.name),await N()}catch(P){v(P instanceof Error?P.message:String(P))}}},z=async $=>{if(await o.confirm(s("snap.confirm_rollback",{name:$.name}),{destructive:!0})){v("");try{await Be.rollbackSnapshot(t,n.vmid,$.name),await N()}catch(P){v(P instanceof Error?P.message:String(P))}}};return r.jsxs("div",{onClick:a,style:Vg,children:[r.jsx("style",{children:Hg}),r.jsxs("div",{className:"sm-modal",onClick:$=>$.stopPropagation(),children:[r.jsxs("div",{className:"sm-eyebrow",children:["// snapshots · ",t]}),r.jsx("h3",{className:"sm-title",children:s("snap.title",{vmid:n.vmid,name:n.name})}),r.jsxs("div",{className:"sm-create",children:[r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.name")}),r.jsx("input",{type:"text",value:p,onChange:$=>x($.target.value),placeholder:"my-snap",spellCheck:!1})]}),r.jsxs("div",{className:"sm-row",children:[r.jsx("label",{children:s("snap.description")}),r.jsx("input",{type:"text",value:b,onChange:$=>k($.target.value)})]}),r.jsxs("div",{className:"sm-row sm-check-row",children:[r.jsxs("label",{className:"sm-check",children:[r.jsx("input",{type:"checkbox",checked:j,onChange:$=>f($.target.checked)}),r.jsx("span",{children:s("snap.include_state")})]}),r.jsx("button",{className:"sm-btn primary",disabled:m||!p,onClick:w,children:m?"…":s("snap.create")})]})]}),h&&r.jsx("div",{className:"sm-err",children:h}),r.jsxs("div",{className:"sm-list",children:[l&&r.jsx("div",{className:"sm-empty",children:"…"}),!l&&i.length===0&&r.jsx("div",{className:"sm-empty",children:s("snap.empty")}),!l&&i.map($=>r.jsxs("div",{className:"sm-item",children:[r.jsxs("div",{className:"sm-item-head",children:[r.jsx("code",{className:"sm-name",children:$.name}),$.parent&&r.jsxs("span",{className:"sm-meta",children:[s("snap.parent"),": ",r.jsx("code",{children:$.parent})]}),r.jsxs("span",{className:"sm-meta",children:[s("snap.taken"),": ",Ug($.snaptime)]}),$.vmstate?r.jsx("span",{className:"sm-tag",children:"RAM"}):null]}),$.description&&r.jsx("div",{className:"sm-desc",children:$.description}),r.jsxs("div",{className:"sm-item-actions",children:[r.jsx("button",{className:"sm-btn ghost",onClick:()=>z($),children:s("snap.rollback")}),r.jsx("button",{className:"sm-btn danger",onClick:()=>_($),children:s("snap.delete")})]})]},$.name))]}),r.jsx("div",{className:"sm-actions",children:r.jsx("button",{className:"sm-btn ghost",onClick:a,children:s("action.close")})})]})]})}const Vg={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"smFade .18s ease"},Hg=`
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
`;function uf({open:e,cluster_id:t,vm:n,onClose:a}){const{t:s}=Le(),[o,i]=u.useState([]),[c,l]=u.useState(!1),[d,m]=u.useState(""),[g,p]=u.useState("snapshot"),[x,b]=u.useState("zstd"),[k,j]=u.useState(""),[f,h]=u.useState(""),[v,N]=u.useState(!1);if(u.useEffect(()=>{!e||!n||(j(""),h(""),m(""),l(!0),Be.getCluster(t).then(z=>{const P=Object.values(z.storages||{}).filter(D=>{var A;if(!((A=D.content)!=null&&A.includes("backup")))return!1;const I=D.allowed_nodes||[];return I.length>0&&!I.includes(n.node)||!D.shared&&D.node!==n.node?!1:D.enabled!==!1});i(P),P.length>0&&m(P[0].storage)}).catch(z=>j(z.message||String(z))).finally(()=>l(!1)))},[e,t,n==null?void 0:n.vmid,n==null?void 0:n.node]),u.useEffect(()=>{if(!e)return;const z=$=>{$.key==="Escape"&&!v&&a()};return document.addEventListener("keydown",z),()=>document.removeEventListener("keydown",z)},[e,v,a]),!e||!n)return null;const w=o.length>0,_=async()=>{if(d){N(!0),j("");try{const z=await Be.triggerBackup(t,n.node,{vmid:n.vmid,storage:d,mode:g,compress:x});h(z.upid)}catch(z){j(z instanceof Error?z.message:String(z))}finally{N(!1)}}};return r.jsxs("div",{onClick:()=>!v&&a(),style:Yg,children:[r.jsx("style",{children:Gg}),r.jsxs("div",{className:"bm-modal",onClick:z=>z.stopPropagation(),children:[r.jsxs("div",{className:"bm-eyebrow",children:["// backup · ",t," · ",n.node]}),r.jsx("h3",{className:"bm-title",children:s("backup.title",{vmid:n.vmid,name:n.name})}),!f&&r.jsxs(r.Fragment,{children:[r.jsx("label",{children:s("backup.storage")}),c?r.jsx("div",{className:"bm-empty",children:"…"}):w?r.jsx("select",{value:d,onChange:z=>m(z.target.value),children:o.map(z=>r.jsxs("option",{value:z.storage,children:[z.storage," (",z.type,z.shared?", shared":"",")"]},z.storage))}):r.jsx("div",{className:"bm-err",children:s("backup.no_backup_storage")}),r.jsx("label",{children:s("backup.mode")}),r.jsxs("select",{value:g,onChange:z=>p(z.target.value),children:[r.jsx("option",{value:"snapshot",children:s("backup.mode_snapshot")}),r.jsx("option",{value:"suspend",children:s("backup.mode_suspend")}),r.jsx("option",{value:"stop",children:s("backup.mode_stop")})]}),r.jsx("label",{children:s("backup.compress")}),r.jsxs("select",{value:x,onChange:z=>b(z.target.value),children:[r.jsx("option",{value:"zstd",children:"zstd"}),r.jsx("option",{value:"lzo",children:"lzo"}),r.jsx("option",{value:"gzip",children:"gzip"}),r.jsx("option",{value:"0",children:"none"})]}),k&&r.jsx("div",{className:"bm-err",children:k}),r.jsxs("div",{className:"bm-actions",children:[r.jsx("button",{className:"bm-btn ghost",onClick:a,disabled:v,children:s("action.cancel")}),r.jsx("button",{className:"bm-btn primary",disabled:v||!d,onClick:_,children:v?"…":s("backup.start")})]})]}),f&&r.jsxs(r.Fragment,{children:[r.jsx("p",{className:"bm-ok",children:s("backup.started")}),r.jsx("div",{className:"bm-review",children:r.jsxs("div",{children:[r.jsx("span",{children:s("rmm.done.upid")}),r.jsx("code",{style:{userSelect:"all"},children:f})]})}),r.jsx("div",{className:"bm-actions",children:r.jsx("button",{className:"bm-btn primary",onClick:a,children:s("action.close")})})]})]})]})}const Yg={position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"bmFade .18s ease"},Gg=`
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
`;function pf({open:e,cluster_id:t,pveUser:n,onCancel:a,onSubmit:s}){const{t:o}=Le(),[i,c]=u.useState(""),[l,d]=u.useState(!1),[m,g]=u.useState(""),p=u.useRef(null);if(u.useEffect(()=>{e&&(c(""),g(""),d(!1),setTimeout(()=>{var b;return(b=p.current)==null?void 0:b.focus()},50))},[e]),u.useEffect(()=>{if(!e)return;const b=k=>{k.key==="Escape"&&!l&&a()};return document.addEventListener("keydown",b),()=>document.removeEventListener("keydown",b)},[e,l,a]),!e)return null;const x=async()=>{if(i){d(!0),g("");try{await s(i)}catch(b){const k=b instanceof Error?b.message:String(b);g(o("console.prepare_failed",{err:k})),d(!1)}}};return r.jsxs("div",{onClick:()=>!l&&a(),style:Xg,children:[r.jsx("style",{children:Kg}),r.jsxs("div",{className:"cpw-modal",onClick:b=>b.stopPropagation(),children:[r.jsxs("div",{className:"cpw-eyebrow",children:["// console · ",t]}),r.jsx("h3",{className:"cpw-title",children:o("console.prompt_title")}),r.jsx("p",{className:"cpw-body",children:o("console.prompt_body",{user:n,cluster:t})}),r.jsx("label",{children:o("console.prompt_label")}),r.jsx("input",{ref:p,type:"password",value:i,onChange:b=>c(b.target.value),onKeyDown:b=>{b.key==="Enter"&&x()},autoComplete:"current-password",spellCheck:!1}),m&&r.jsx("div",{className:"cpw-err",children:m}),r.jsxs("div",{className:"cpw-actions",children:[r.jsx("button",{className:"ghost",onClick:a,disabled:l,children:o("action.cancel")}),r.jsx("button",{className:"primary",onClick:x,disabled:l||!i,children:l?"…":o("console.prompt_open")})]})]})]})}const Xg={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"cpwFade .18s ease"},Kg=`
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
`;function js(){const[e,t]=u.useState(!0),[n,a]=u.useState(null),[s,o]=u.useState(!1),i=async()=>{try{const l=await Be.authMe();l.authenticated&&l.user?(a(l.user),o(!0)):(a(null),o(!1))}catch{a(null),o(!1)}finally{t(!1)}},c=async()=>{try{await Be.authLogout()}catch{}window.location.replace("/login")};return u.useEffect(()=>{i()},[]),{loading:e,user:n,authEnforced:s,refresh:i,logout:c}}function Wi(e,t){switch(e){case"start":return t("vm.start");case"stop":return t("vm.stop_hard");case"shutdown":return t("vm.shutdown_acpi");case"reboot":return t("vm.reboot");case"suspend":return"Suspend";case"resume":return"Resume";default:return e}}function qg(e){return e==="stop"||e==="shutdown"||e==="reboot"}function Hs(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}const gu=Ho.forwardRef(function({vm:t,isSelected:n,onClick:a,onContextMenu:s,animationDelay:o,task:i,isGhost:c=!1,isCompleting:l=!1},d){var _,z,$;const m=t.status==="running",g=t.memory.total_bytes>0?t.memory.used_bytes/t.memory.total_bytes*100:0,p=t.disk.total_bytes>0?t.disk.used_bytes/t.disk.total_bytes*100:0,x=Math.max(t.cpu.usage_percent,g,p),b=m?ze(x):"muted",k=!!i,j=(_=i==null?void 0:i.task_type)==null?void 0:_.includes("migrate"),f=((z=i==null?void 0:i.task_type)==null?void 0:z.includes("backup"))||(($=i==null?void 0:i.task_type)==null?void 0:$.includes("vzdump")),h=t.name.length>12?t.name.substring(0,11)+"…":t.name,N=i?(P=>{const D=P.toLowerCase();return D.includes("migrate")?{label:"MIGRATE",color:"#00f0ff"}:D.includes("backup")||D.includes("vzdump")?{label:"BACKUP",color:"#ff9500"}:D.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:D.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:D.includes("clone")?{label:"CLONE",color:"#10b981"}:D.includes("start")||D.includes("qmstart")?{label:"START",color:"#00ff88"}:D.includes("stop")||D.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:D.includes("reboot")||D.includes("reset")?{label:"REBOOT",color:"#ff6b00"}:{label:"TASK",color:"#e066ff"}})(i.task_type):null,w=i?{type:i.task_type,target:i.target_node}:null;return r.jsxs("div",{ref:d,className:`vm-cell ${t.status} ${n?"selected":""} ${k?"has-task":""} ${j?"migrating":""} ${f?"backup":""} ${c?"ghost":""} ${l?"completing":""}`,onClick:a,onContextMenu:s,title:`${t.name} (${t.vmid})${i?`
[${i.task_type}]${i.target_node?` → ${i.target_node}`:""}`:""}`,style:{"--anim-delay":`${o}ms`,animationDelay:`${o}ms`},"data-vmid":t.vmid,"data-node":t.node,children:[r.jsxs("div",{className:`vm-cell-inner ${b}`,children:[r.jsx("span",{className:"vm-name",children:h}),r.jsx("span",{className:"vm-id",children:t.vmid}),i&&!j&&!f&&r.jsx("span",{className:"vm-task-icon",children:"⚙"}),f&&r.jsx("span",{className:"vm-backup-icon",children:"◉"}),j&&r.jsx("span",{className:"vm-migrate-icon",children:r.jsx("span",{className:"migrate-arrow",children:"→"})})]}),N&&r.jsxs("div",{className:"vm-task-label",style:{borderColor:N.color,color:N.color},children:[N.label,j&&i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[" ",Math.floor(i.progress),"%"]})]}),k&&!j&&!f&&r.jsx("div",{className:"vm-task-ring"}),f&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"backup-ring"}),r.jsx("div",{className:"backup-scanner"}),r.jsxs("div",{className:"backup-particles",children:[r.jsx("span",{className:"bp bp1"}),r.jsx("span",{className:"bp bp2"}),r.jsx("span",{className:"bp bp3"}),r.jsx("span",{className:"bp bp4"})]})]}),j&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"migrate-ring"}),r.jsxs("div",{className:"migrate-particles",children:[r.jsx("span",{className:"particle p1"}),r.jsx("span",{className:"particle p2"}),r.jsx("span",{className:"particle p3"})]}),(w==null?void 0:w.target)&&r.jsxs("div",{className:"migrate-target-label",children:["→ ",w.target]})]}),c&&r.jsxs("div",{className:"vm-incoming-label",children:["INCOMING",i&&i.progress>0&&r.jsxs("span",{className:"vm-task-progress",children:[Math.floor(i.progress),"%"]})]})]})});function Qg({vm:e,onClose:t}){const{t:n}=Le(),a=e.status==="running";return r.jsxs("div",{className:"vm-detail-panel panel",children:[r.jsxs("div",{className:"detail-scroll-area",children:[r.jsxs("div",{className:"detail-header",children:[r.jsxs("div",{className:"detail-title",children:[r.jsx("span",{className:`detail-status ${Wl(e.status)}`}),r.jsx("span",{className:"detail-name",children:e.name}),r.jsxs("span",{className:"detail-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"detail-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"detail-content",children:[r.jsxs("div",{className:"detail-info",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.node")}),r.jsx("span",{className:"info-value",children:e.node})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.type")}),r.jsx("span",{className:"info-value",children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("node.status")}),r.jsx("span",{className:`info-value text-${Wl(e.status)}`,children:e.status.toUpperCase()})]}),a&&r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("table.uptime")}),r.jsx("span",{className:"info-value",children:ii(e.uptime)})]}),(()=>{const s=(e.tags||[]).map(o=>(o||"").trim()).filter(Boolean);return s.length>0?r.jsxs("div",{className:"info-row tags-row",children:[r.jsx("span",{className:"info-label",children:n("table.tags")}),r.jsx("div",{className:"vm-tags detail-tags",children:s.map((o,i)=>r.jsx("span",{className:"vm-tag",children:o},i))})]}):null})()]}),a&&r.jsxs("div",{className:"detail-metrics",children:[r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.cpu")}),r.jsx("span",{className:`metric-value text-${ze(e.cpu.usage_percent)}`,children:ot(e.cpu.usage_percent,1)})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${ze(e.cpu.usage_percent)}`,style:{width:`${e.cpu.usage_percent}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-stacked",children:[r.jsxs("div",{className:"metric-row-header",children:[r.jsx("span",{className:"metric-label",children:n("metric.memory")}),r.jsxs("span",{className:"metric-value",children:[Re(e.memory.used_bytes)," / ",Re(e.memory.total_bytes)]})]}),r.jsx("div",{className:"metric-bar",children:r.jsx("div",{className:`metric-fill ${ze(e.memory.used_bytes/e.memory.total_bytes*100)}`,style:{width:`${e.memory.used_bytes/e.memory.total_bytes*100}%`}})})]}),r.jsxs("div",{className:"metric-row metric-row-network",children:[r.jsx("span",{className:"metric-label",children:n("metric.network")}),r.jsxs("div",{className:"network-stats",children:[r.jsxs("span",{className:"net-rx",children:["↓ ",Re(e.network.rx_bytes_sec),"/s"]}),r.jsxs("span",{className:"net-tx",children:["↑ ",Re(e.network.tx_bytes_sec),"/s"]})]})]})]})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]})}function Jg({cluster:e,clusters:t}){var jn;const{t:n,language:a}=Le(),s=Gr(),[o,i]=u.useState(null),c=js(),[l,d]=u.useState(null),[m,g]=u.useState(null),[p,x]=u.useState(null),[b,k]=u.useState(null),[j,f]=u.useState(null),[h,v]=u.useState("disabled"),[N,w]=u.useState({});u.useEffect(()=>{Be.getConfig().then(y=>{var E;v(((E=y.console)==null?void 0:E.mode)||"disabled");const F={};(y.clusters||[]).forEach(M=>{F[M.id]=!!(M.auth&&M.auth.password&&M.auth.password.length>0)}),w(F)}).catch(()=>v("disabled"))},[]);const[_,z]=u.useState(null),$=u.useCallback((y,F,E,M)=>{const O=typeof localStorage<"u"&&localStorage.getItem("language")||"",ne=F.type==="lxc",ie=`${ne?"/console-term":"/console"}/${encodeURIComponent(y)}/${encodeURIComponent(F.node)}/${F.vmid}?ct=${encodeURIComponent(E)}`+(F.name?`&name=${encodeURIComponent(F.name)}`:"")+(O?`&lang=${encodeURIComponent(O)}`:"")+(!ne&&M?`#vp=${encodeURIComponent(M)}`:"");window.open(ie,"_blank","noopener,noreferrer")},[]),[P,D]=u.useState([]),I=u.useRef(new Map),A=u.useCallback(y=>{y.action==="start"||y.action==="resume"?re(y):d(y)},[]),re=u.useCallback(async y=>{d(null);try{const F=y.vm.type==="lxc",E=F?await Be.ctAction(y.clusterId,y.vm.node,y.vm.vmid,y.action):await Be.vmAction(y.clusterId,y.vm.node,y.vm.vmid,y.action);console.info(`[vm_control] ${y.action} ${F?"ct":"vm"}/${y.vm.vmid} → upid=${E.upid}`)}catch(F){const E=F instanceof Error?F.message:String(F);E.includes("vm_control_disabled")?await s.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await s.alert(`${y.action} failed: ${E.slice(0,200)}`)}},[]),U=u.useCallback(()=>{l&&re(l)},[l,re]),[R,G]=u.useState(()=>localStorage.getItem("vm_matrix_default_filter")||"all"),[L,V]=u.useState(""),[B,K]=u.useState(new Set),[Q,S]=u.useState(!1),Se=u.useCallback(y=>{K(F=>{const E=new Set(F);return E.has(y)?E.delete(y):E.add(y),E})},[]),te=u.useCallback(()=>K(new Set),[]),Me=u.useCallback(async y=>{if(B.size!==0){S(!0);try{const F=new Map;for(const q of B){const[ie,,de]=q.split("/"),xe=parseInt(de,10);if(!ie||!Number.isFinite(xe))continue;const ve=F.get(ie)||[];ve.push(xe),F.set(ie,ve)}const E=[];for(const[q,ie]of F)try{const de=await Be.bulkAction(q,{action:y,vmids:ie}),xe=de.results.filter(De=>De.ok).length,ve=de.results.length-xe,Ue=de.results.filter(De=>!De.ok).map(De=>`#${De.vmid}: ${De.error||"unknown"}`);E.push({cluster:q,ok:xe,fail:ve,errs:Ue})}catch(de){const xe=de instanceof Error?de.message:String(de);E.push({cluster:q,ok:0,fail:ie.length,errs:[xe]})}const M=E.reduce((q,ie)=>q+ie.ok,0),O=E.reduce((q,ie)=>q+ie.fail,0),ne=[];E.forEach(q=>{ne.push(`${q.cluster}: ${q.ok} ok / ${q.fail} fail`),q.errs.slice(0,5).forEach(ie=>ne.push(`  • ${ie}`)),q.errs.length>5&&ne.push(`  • … +${q.errs.length-5}`)}),await s.alert(`${y.toUpperCase()}: ${M} ok, ${O} fail

${ne.join(`
`)}`,{title:"Bulk action result"}),O===0&&te()}finally{S(!1)}}},[B,te]),[X,me]=u.useState(()=>{const y=(()=>{if(typeof window>"u")return null;const E=window.location.pathname.split("/").filter(Boolean)[1];return E==="grid"||E==="table"||E==="thumb"?E:null})();if(y)return y;const F=localStorage.getItem("vm_matrix_view_mode");return F==="table"||F==="thumb"||F==="grid"?F:"grid"});u.useEffect(()=>{if(typeof window>"u"||window.location.pathname.split("/").filter(Boolean)[0]!=="matrix")return;const F=`/matrix/${X}`;window.location.pathname!==F&&window.history.replaceState(null,"",F)},[X]),u.useEffect(()=>{const y=()=>{const F=window.location.pathname.split("/").filter(Boolean)[1];(F==="grid"||F==="table"||F==="thumb")&&me(F)};return window.addEventListener("popstate",y),()=>window.removeEventListener("popstate",y)},[]);const[Ce,Z]=u.useState(()=>{const y=parseInt(localStorage.getItem("vm_matrix_thumb_size")||"320",10);return Number.isFinite(y)?Math.max(160,Math.min(640,y)):320}),[ae,T]=u.useState(null);u.useEffect(()=>{if(!ae)return;const y=F=>{F.key==="Escape"&&T(null)};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[ae]);const[C,J]=u.useState(()=>Math.floor(Date.now()/3e4));u.useEffect(()=>{if(X!=="thumb")return;const y=window.setInterval(()=>J(Math.floor(Date.now()/3e4)),3e4);return()=>window.clearInterval(y)},[X]);const[oe,be]=u.useState(()=>{const y=localStorage.getItem("vm_matrix_thumb_type");return y==="qemu"||y==="lxc"?y:"all"});u.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_type",oe)},[oe]);const[W,le]=u.useState(()=>localStorage.getItem("vm_matrix_thumb_prefer_content")!=="0");u.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_prefer_content",W?"1":"0")},[W]);const[he,ue]=u.useState({}),we=u.useRef({});we.current=he,u.useEffect(()=>()=>{Object.values(we.current).forEach(y=>{try{URL.revokeObjectURL(y.url)}catch{}})},[]);const Ae=u.useRef(new Map),Ge=u.useRef(!1);u.useEffect(()=>{X==="thumb"&&(Ge.current=!1)},[X]),u.useLayoutEffect(()=>{if(X!=="thumb"){Ae.current.clear();return}const y=M=>{let O=0,ne=0,q=M;for(;q;)O+=q.offsetLeft,ne+=q.offsetTop,q=q.offsetParent;return{left:O,top:ne}},F=document.querySelectorAll(".vm-thumb-card[data-card-key]"),E=new Map;F.forEach(M=>{const O=M.dataset.cardKey;O&&E.set(O,y(M))}),Ge.current&&F.forEach(M=>{const O=M.dataset.cardKey;if(!O)return;const ne=Ae.current.get(O),q=E.get(O);if(!ne||!q)return;const ie=ne.left-q.left,de=ne.top-q.top;Math.abs(ie)<1&&Math.abs(de)<1||(M.style.transition="none",M.style.transform=`translate(${ie}px, ${de}px)`,requestAnimationFrame(()=>{M.style.transition="transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",M.style.transform=""}))}),Ae.current=E}),u.useEffect(()=>{localStorage.setItem("vm_matrix_view_mode",X)},[X]),u.useEffect(()=>{localStorage.setItem("vm_matrix_thumb_size",String(Ce))},[Ce]);const Ve=u.useRef(null),[Ne,ge]=u.useState("vmid"),[ke,Oe]=u.useState("asc"),[Y,se]=u.useState(!1),[ce,je]=u.useState(()=>{const y=localStorage.getItem("matrix_card_width");return y?parseInt(y,10):85}),[ye,Ee]=u.useState(()=>localStorage.getItem("matrix_sort_by")||"vmid"),[Ze,wt]=u.useState(()=>localStorage.getItem("matrix_group_by")||"node"),[pe,He]=u.useState(()=>localStorage.getItem("matrix_group_sort_by")||"node"),[Fe,qe]=u.useState(()=>localStorage.getItem("matrix_group_sort_order")||"asc"),[$e,Qt]=u.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),[_t,Bt]=u.useState([]),[Jt,wr]=u.useState([]),[H,Qe]=u.useState(new Map),nt=u.useRef(new Set),[pt,vt]=u.useState(!1),[gt,bt]=u.useState(0),[Xr,bn]=u.useState(!0);u.useEffect(()=>{vt(!1),bt(E=>E+1),bn(!0);const y=setTimeout(()=>{vt(!0)},100),F=setTimeout(()=>{bn(!1)},8e3);return()=>{clearTimeout(y),clearTimeout(F)}},[Ze]);const Wt=u.useRef(new Map),Tr=u.useRef(new Map),Kr=u.useRef(null),kr=u.useRef(!1),yn=u.useMemo(()=>{if(ye!=="load")return"";const y=[],F=E=>{Object.values(E.vms).forEach(M=>{if(M.template||R==="running"&&M.status!=="running"||R==="stopped"&&M.status!=="stopped")return;const O=M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,ne=M.disk.total_bytes>0?M.disk.used_bytes/M.disk.total_bytes*100:0,q=Math.max(M.cpu.usage_percent,O,ne);y.push({key:`${M.node}/${M.vmid}`,load:Math.round(q)})})};return t?Object.values(t).forEach(F):e&&F(e),y.sort((E,M)=>M.load-E.load),y.map(E=>`${E.key}:${E.load}`).join("|")},[e,t,ye,R]);u.useLayoutEffect(()=>{if(ye!=="load"||kr.current)return;const y=new Map;Wt.current.forEach((F,E)=>{F&&y.set(E,F.getBoundingClientRect())}),Tr.current=y},[yn,ye]),u.useEffect(()=>{ye==="load"&&Tr.current.size!==0&&requestAnimationFrame(()=>{const y=[];Wt.current.forEach((F,E)=>{if(!F)return;const M=Tr.current.get(E);if(!M)return;const O=F.getBoundingClientRect(),ne=M.left-O.left,q=M.top-O.top;if(Math.abs(ne)>2||Math.abs(q)>2){kr.current=!0;const ie=F.animate([{transform:`translate(${ne}px, ${q}px)`},{transform:"translate(0, 0)"}],{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"none"});y.push(ie)}}),y.length>0?Promise.all(y.map(F=>F.finished)).then(()=>{kr.current=!1}).catch(()=>{kr.current=!1}):kr.current=!1})},[yn,ye]);const[qr,Bn]=u.useState(!1);u.useEffect(()=>{qr||Be.getConfig().then(y=>{var E;const F=(E=y==null?void 0:y.ui)==null?void 0:E.vm_matrix_default_filter;F&&(G(F),localStorage.setItem("vm_matrix_default_filter",F)),Bn(!0)}).catch(()=>{const y=localStorage.getItem("vm_matrix_default_filter");y&&G(y),Bn(!0)})},[qr]),u.useEffect(()=>{const y=()=>{const E=localStorage.getItem("matrix_card_width");E&&je(parseInt(E,10));const M=localStorage.getItem("matrix_sort_by");M&&M!==ye&&Ee(M);const O=localStorage.getItem("matrix_group_sort_by");O&&O!==pe&&He(O);const ne=localStorage.getItem("matrix_group_sort_order");ne&&ne!==Fe&&qe(ne)};window.addEventListener("storage",y);const F=setInterval(y,1e3);return()=>{window.removeEventListener("storage",y),clearInterval(F)}},[ye,pe,Fe]);const mt=u.useCallback((y,F)=>{var E;return e&&e.client_health?e.client_health[F]||null:t&&((E=t[y])!=null&&E.client_health)&&t[y].client_health[F]||null},[e,t]),Pr=u.useCallback((y,F,E)=>{y.preventDefault(),y.stopPropagation();const M=Math.min(y.clientX,window.innerWidth-250),O=Math.min(y.clientY,window.innerHeight-300);Qt({visible:!0,x:M,y:O,vm:F,clusterId:E})},[]),wn=u.useCallback(()=>{Qt(y=>({...y,visible:!1}))},[]),at=!e&&t&&Object.keys(t).length>0,_e=u.useMemo(()=>{const y=[],F=(E,M,O)=>{if(!E.tasks)return;Object.values(E.tasks).forEach(q=>{var De;const ie=((De=q.task_type)==null?void 0:De.toLowerCase())||"",de=ie.includes("migrate"),xe=q.status==="running",ve=!!q.target_node,Ue=ie.startsWith("ha");if(ie.startsWith("qm")||ie.startsWith("vz"),xe&&de&&ve&&!Ue){const Ke=Object.keys(E.vms).find(Ut=>{const Nr=E.vms[Ut];return Nr.vmid===q.vmid&&Nr.node===q.node});Ke&&y.push({vm:E.vms[Ke],task:q,targetNode:q.target_node||"",clusterId:M,clusterLabel:O})}})};return at&&t?Object.entries(t).forEach(([E,M])=>{F(M,E,M.name||E)}):e&&F(e,e.id,e.name||e.id),y},[e,t,at]);u.useEffect(()=>{const y=new Set(_e.map(M=>`${M.clusterId}:${M.vm.vmid}`)),F=nt.current,E=I.current;F.forEach(M=>{if(!y.has(M)&&!H.has(M)){const O=E.get(M);O&&O.upid&&(async()=>{var ne,q,ie;try{const de=await Be.taskStatus(O.clusterId,O.node,O.upid),xe=(de==null?void 0:de.exitstatus)||"";if((de==null?void 0:de.status)==="running")return;if(xe&&xe!=="OK"){const Ue=((ne=e==null?void 0:e.vms)==null?void 0:ne[`${O.node}/${O.vmid}`])||((ie=(q=t==null?void 0:t[O.clusterId])==null?void 0:q.vms)==null?void 0:ie[`${O.node}/${O.vmid}`]),De=Ue&&Ue.lock||"migrate";D(Ke=>Ke.some(Ut=>Ut.id===M)?Ke:[...Ke,{id:M,vmid:O.vmid,sourceNode:O.node,targetNode:O.targetNode,clusterLabel:O.clusterLabel,lock:De,copied:!1}])}}catch{}})(),E.delete(M)}}),_e.forEach(({vm:M,task:O,clusterId:ne,clusterLabel:q,targetNode:ie})=>{const de=`${ne}:${M.vmid}`;E.set(de,{upid:O.upid,node:O.node,vmid:M.vmid,clusterId:ne,clusterLabel:q,targetNode:ie})}),nt.current=y},[_e,H,e,t]);const Te=u.useRef(new Map);u.useEffect(()=>{_e.forEach(({vm:y,targetNode:F,clusterId:E})=>{const M=`${E}:${y.vmid}`;Te.current.set(M,{targetNode:F,sourceNode:y.node,clusterId:E,vmid:y.vmid})})},[_e]);const Xe=u.useRef(new Map);u.useEffect(()=>{_t.forEach(y=>{const F=`${y.clusterId}:${y.vmid}`;Xe.current.set(F,{x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2})})},[_t]),u.useEffect(()=>{const y=new Set(_e.map(F=>`${F.clusterId}:${F.vm.vmid}`));Te.current.forEach((F,E)=>{if(!y.has(E)&&!H.has(E)){const M=Xe.current.get(E);if(M){const O=Date.now(),ne=800,q=()=>{const ie=Date.now()-O,de=Math.min(ie/ne,1),xe=M.x1+(M.x2-M.x1)*de,ve=M.y1+(M.y2-M.y1)*de;wr([{x1:xe,y1:ve,x2:M.x2,y2:M.y2,vmid:F.vmid,progress:de}]),de<1?requestAnimationFrame(q):wr([])};requestAnimationFrame(q)}Qe(O=>{const ne=new Map(O);return ne.set(E,{...F,startTime:Date.now()}),ne}),Te.current.delete(E),Xe.current.delete(E),setTimeout(()=>{Qe(O=>{const ne=new Map(O);return ne.delete(E),ne})},1e4)}})},[_e,H]),u.useEffect(()=>{if(H.size===0)return;const y=(F,E)=>{const M=O=>{for(const ne of Object.values(O.vms))if(ne.vmid===F)return ne.node;return null};if(t&&E){const O=t[E];if(O)return M(O)}else if(e)return M(e);return null};H.forEach((F,E)=>{const M=y(F.vmid,F.clusterId);M&&M===F.targetNode&&M!==F.sourceNode&&Qe(O=>{const ne=new Map(O);return ne.delete(E),ne})})},[e,t,H]);const it=u.useCallback((y,F)=>{const E=at?`${F} / `:"";switch(Ze){case"none":return at?F:"all";case"type":return`${E}${y.type==="qemu"?"VM":"CT"}`;case"tag":return y.tags&&y.tags.length>0?`${E}${y.tags[0]}`:`${E}(no tag)`;case"node":default:return`${E}${y.node}`}},[Ze,at]),ft=u.useMemo(()=>{const y={},F=(E,M,O)=>{Object.entries(E.vms).forEach(([ne,q])=>{if(R==="running"&&q.status!=="running"||R==="stopped"&&q.status!=="stopped"||L&&!q.name.toLowerCase().includes(L.toLowerCase())&&!String(q.vmid).includes(L)||q.template)return;const ie=it(q,M);y[ie]||(y[ie]={vms:[],clusterId:O}),y[ie].vms.push(q)})};return at?Object.entries(t).forEach(([E,M])=>{const O=M.name||E;F(M,O,E)}):e&&F(e,"",e.id),Object.values(y).forEach(E=>{E.vms.sort((M,O)=>{switch(ye){case"name":return M.name.localeCompare(O.name);case"load":{const ne=M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,q=O.memory.total_bytes>0?O.memory.used_bytes/O.memory.total_bytes*100:0,ie=M.disk.total_bytes>0?M.disk.used_bytes/M.disk.total_bytes*100:0,de=O.disk.total_bytes>0?O.disk.used_bytes/O.disk.total_bytes*100:0,xe=Math.max(M.cpu.usage_percent,ne,ie),ve=Math.max(O.cpu.usage_percent,q,de);if(M.status!=="running"&&O.status==="running")return 1;if(M.status==="running"&&O.status!=="running")return-1;if(M.status!=="running"&&O.status!=="running")return M.vmid-O.vmid;const Ue=Ut=>Ut>=95?0:Ut>=80?1:2,De=Ue(xe),Ke=Ue(ve);return De!==Ke?De-Ke:ve-xe}case"vmid":default:return M.vmid-O.vmid}})}),y},[e,t,at,R,L,ye,it]),Et=u.useMemo(()=>{const y=[],F=(E,M)=>{Object.values(E.vms).forEach(O=>{O.template||O.status==="running"&&R!=="stopped"&&(oe==="qemu"&&O.type!=="qemu"||oe==="lxc"&&O.type!=="lxc"||L&&!O.name.toLowerCase().includes(L.toLowerCase())&&!String(O.vmid).includes(L)||y.push({...O,clusterId:M}))})};return at&&t?Object.entries(t).forEach(([E,M])=>F(M,E)):e&&F(e,e.id),y.sort((E,M)=>{switch(ye){case"name":return E.name.localeCompare(M.name);case"load":{const O=E.memory.total_bytes>0?E.memory.used_bytes/E.memory.total_bytes*100:0,ne=M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,q=E.disk.total_bytes>0?E.disk.used_bytes/E.disk.total_bytes*100:0,ie=M.disk.total_bytes>0?M.disk.used_bytes/M.disk.total_bytes*100:0,de=Math.max(E.cpu.usage_percent,O,q),xe=Math.max(M.cpu.usage_percent,ne,ie),ve=de>=95?0:de>=80?1:2,Ue=xe>=95?0:xe>=80?1:2;return ve!==Ue?ve-Ue:xe-de}case"vmid":default:return E.vmid-M.vmid}}),y},[e,t,at,R,L,ye,oe]),lt=u.useMemo(()=>{const y=new Map,F=E=>t&&t[E]?t[E].name||E:e&&e.id===E&&e.name||E;return Et.forEach(E=>{const M=F(E.clusterId),O=it(E,M),ne=y.get(O)||[];ne.push(E),y.set(O,ne)}),Array.from(y.entries()).sort(([E],[M])=>{const O=E.localeCompare(M);return Fe==="desc"?-O:O})},[Et,it,t,e,Fe]);u.useEffect(()=>{if(X!=="thumb")return;let y=!1;const F=640,E=Ge.current,M={},O=async ie=>{const de=ie.clusterId||(e==null?void 0:e.id)||"",xe=`${de}/${ie.node}/${ie.vmid}`,ve=`/api/console/screenshot/${encodeURIComponent(de)}/${encodeURIComponent(ie.node)}/${ie.vmid}?max=${F}&t=${C}`;try{const Ue=await fetch(ve,{credentials:"same-origin"});if(!Ue.ok||y)return;const De=await Ue.blob();if(y)return;const Ke=URL.createObjectURL(De),Ut=Ue.headers.get("X-Thumb-Empty")==="1";E?M[xe]={url:Ke,isBlank:Ut}:ue(Nr=>{const ed=Nr[xe];if(ed)try{URL.revokeObjectURL(ed.url)}catch{}return{...Nr,[xe]:{url:Ke,isBlank:Ut}}})}catch{}},ne=6;return(async ie=>{const de=new Set;for(const xe of ie){const ve=O(xe).finally(()=>{de.delete(ve)});de.add(ve),de.size>=ne&&await Promise.race(de)}await Promise.all(de)})(Et).finally(()=>{if(y){Object.values(M).forEach(de=>{try{URL.revokeObjectURL(de.url)}catch{}});return}const ie=new Set(Et.map(de=>`${de.clusterId||(e==null?void 0:e.id)||""}/${de.node}/${de.vmid}`));ue(de=>{let xe=!1;const ve={};return Object.entries(de).forEach(([Ue,De])=>{if(ie.has(Ue))ve[Ue]=De;else{try{URL.revokeObjectURL(De.url)}catch{}xe=!0}}),E&&Object.entries(M).forEach(([Ue,De])=>{const Ke=ve[Ue];if(Ke)try{URL.revokeObjectURL(Ke.url)}catch{}ve[Ue]=De,xe=!0}),xe?ve:de}),Ge.current||setTimeout(()=>{y||(Ge.current=!0)},300)}),()=>{y=!0}},[X,Et,C,e==null?void 0:e.id]);const et=u.useMemo(()=>{const y=[],F=new Map;return at&&t&&Object.entries(t).forEach(([E,M])=>{const O=M.name||E;Object.values(M.nodes||{}).forEach(ne=>{ne&&ne.node&&F.set(ne.node,{id:E,label:O})})}),_e.forEach(({vm:E,targetNode:M,clusterId:O,clusterLabel:ne})=>{const q=F.get(M),ie=q&&q.id!==O?q:{id:O,label:ne},de=at?`${ie.label} / ${M}`:M,xe=at?`${ne} / ${E.node}`:E.node;y.push({vm:E,targetGroupKey:de,sourceGroupKey:xe,clusterId:O,targetClusterId:ie.id})}),y},[_e,at,t]);u.useEffect(()=>{if(X!=="grid"||et.length===0){Bt([]);return}const y=()=>{const O=Kr.current;if(!O)return;const ne=O.getBoundingClientRect(),q=O.scrollLeft,ie=O.scrollTop,de=[];et.forEach(({vm:xe})=>{const ve=`${xe.cluster_id}/${xe.node}/${xe.vmid}`,Ue=`ghost-${xe.cluster_id}-${xe.vmid}`,De=Wt.current.get(ve),Ke=Wt.current.get(Ue);if(De&&Ke){const Ut=De.getBoundingClientRect(),Nr=Ke.getBoundingClientRect();de.push({x1:Ut.left+Ut.width/2-ne.left+q,y1:Ut.top+Ut.height/2-ne.top+ie,x2:Nr.left+Nr.width/2-ne.left+q,y2:Nr.top+Nr.height/2-ne.top+ie,vmid:xe.vmid,clusterId:xe.cluster_id})}}),Bt(de)},F=setTimeout(y,100),E=setInterval(y,500),M=Kr.current;return M&&M.addEventListener("scroll",y),()=>{clearTimeout(F),clearInterval(E),M&&M.removeEventListener("scroll",y)}},[et,X]);const Lt=u.useMemo(()=>{const y=[],F=(E,M,O)=>{Object.values(E.vms).forEach(ne=>{R==="running"&&ne.status!=="running"||R==="stopped"&&ne.status!=="stopped"||L&&!ne.name.toLowerCase().includes(L.toLowerCase())&&!String(ne.vmid).includes(L)||ne.template||y.push({...ne,clusterName:M,clusterId:O})})};return at?Object.entries(t).forEach(([E,M])=>{const O=M.name||E;F(M,O,E)}):e&&F(e,e.name||"Cluster",e.id),y.sort((E,M)=>{var ne,q,ie,de;let O=0;switch(Ne){case"name":O=E.name.localeCompare(M.name);break;case"vmid":O=E.vmid-M.vmid;break;case"type":O=E.type.localeCompare(M.type);break;case"node":O=E.node.localeCompare(M.node);break;case"status":O=E.status.localeCompare(M.status);break;case"cpu":O=E.cpu.usage_percent-M.cpu.usage_percent;break;case"memory":O=E.memory.used_bytes/E.memory.total_bytes-M.memory.used_bytes/M.memory.total_bytes;break;case"uptime":O=E.uptime-M.uptime;break;case"rx":O=(((ne=E.network)==null?void 0:ne.rx_bytes_sec)||0)-(((q=M.network)==null?void 0:q.rx_bytes_sec)||0);break;case"tx":O=(((ie=E.network)==null?void 0:ie.tx_bytes_sec)||0)-(((de=M.network)==null?void 0:de.tx_bytes_sec)||0);break;case"task":{const xe=Hs(E.vmid,E.node,E.cluster_id,e,t),ve=Hs(M.vmid,M.node,M.cluster_id,e,t);xe&&!ve?O=-1:!xe&&ve?O=1:xe&&ve?O=xe.task_type.localeCompare(ve.task_type):O=0;break}}return ke==="asc"?O:-O}),y},[e,t,at,R,L,Ne,ke]),Rr=Math.round(Ce*9/16),kt=y=>{se(!0),setTimeout(()=>se(!1),300),Ne===y?Oe(ke==="asc"?"desc":"asc"):(ge(y),Oe("asc"))},jr=u.useMemo(()=>{if(!o)return null;if(e)return e.vms[o]||null;if(t){for(const y of Object.values(t))if(y.vms[o])return y.vms[o]}return null},[o,e,t]),{totalVMs:kn,runningVMs:Wn}=u.useMemo(()=>{let y=0,F=0;const E=M=>{Object.values(M.vms).forEach(O=>{O.template||(y++,O.status==="running"&&F++)})};return at?t&&Object.values(t).forEach(E):e&&E(e),{totalVMs:y,runningVMs:F}},[e,t,at]);return!e&&!at?r.jsx("div",{className:"holo-matrix empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})}):r.jsxs("div",{className:"holo-matrix",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"matrix-header",children:[r.jsxs("div",{className:"matrix-title-section",children:[r.jsxs("h1",{className:"matrix-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"3",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"10",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"3",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"10",y:"17",width:"5",height:"5",rx:"1"}),r.jsx("rect",{x:"17",y:"17",width:"5",height:"5",rx:"1"})]}),n("nav.holo_matrix").toUpperCase()]}),r.jsxs("div",{className:"matrix-stats",children:[r.jsxs("span",{className:"stat-running",children:[Wn," ",n("matrix.running")]}),r.jsx("span",{className:"stat-divider",children:"/"}),r.jsxs("span",{className:"stat-total",children:[kn," ",n("matrix.total")]})]})]}),r.jsxs("div",{className:"matrix-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("matrix.search"),value:L,onChange:y=>V(y.target.value)})]}),r.jsxs("div",{className:`filter-tabs ${X==="thumb"?"is-disabled":""}`,children:[r.jsxs("button",{className:`filter-tab ${R==="all"?"active":""}`,onClick:()=>G("all"),disabled:X==="thumb",title:X==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),r.jsx("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),r.jsx("line",{x1:"3",y1:"18",x2:"21",y2:"18"})]})}),n("matrix.filter_all")]}),r.jsxs("button",{className:`filter-tab ${R==="running"?"active":""}`,onClick:()=>G("running"),disabled:X==="thumb",title:X==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6 4 20 12 6 20 6 4"})})}),n("matrix.filter_running")]}),r.jsxs("button",{className:`filter-tab ${R==="stopped"?"active":""}`,onClick:()=>G("stopped"),disabled:X==="thumb",title:X==="thumb"?a==="zh-TW"?"縮圖檢視只顯示運作中":"Thumbnail view shows running only":void 0,children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})})}),n("matrix.filter_stopped")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]})}),n("settings.sort_by"),":"]}),r.jsxs("button",{className:`sort-btn ${ye==="vmid"?"active":""}`,onClick:()=>{Ee("vmid"),localStorage.setItem("matrix_sort_by","vmid")},title:n("settings.sort_vmid"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h3v10H4zM10 7h2v10h-2zM15 7h5v3h-3v4h3v3h-5z"})})}),"ID"]}),r.jsxs("button",{className:`sort-btn ${ye==="name"?"active":""}`,onClick:()=>{Ee("name"),localStorage.setItem("matrix_sort_by","name")},title:n("settings.sort_name"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M4 7h16M4 12h16M4 17h10"})})}),n("settings.sort_name")]}),r.jsxs("button",{className:`sort-btn ${ye==="load"?"active":""}`,onClick:()=>{Ee("load"),localStorage.setItem("matrix_sort_by","load")},title:n("settings.sort_load"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 17 9 11 13 15 21 7"}),r.jsx("polyline",{points:"15 7 21 7 21 13"})]})}),n("settings.sort_load")]})]}),r.jsxs("div",{className:"sort-selector",children:[r.jsxs("span",{className:"sort-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),n("matrix.group_by"),":"]}),r.jsxs("button",{className:`sort-btn ${Ze==="none"?"active":""}`,onClick:()=>{wt("none"),localStorage.setItem("matrix_group_by","none")},title:n("matrix.group_none"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),n("matrix.group_none")]}),r.jsxs("button",{className:`sort-btn ${Ze==="node"?"active":""}`,onClick:()=>{wt("node"),localStorage.setItem("matrix_group_by","node")},title:n("matrix.group_node"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"3",width:"20",height:"6",rx:"1"}),r.jsx("rect",{x:"2",y:"15",width:"20",height:"6",rx:"1"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}),n("matrix.group_node")]}),r.jsxs("button",{className:`sort-btn ${Ze==="type"?"active":""}`,onClick:()=>{wt("type"),localStorage.setItem("matrix_group_by","type")},title:n("matrix.group_type"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"13",y:"3",width:"8",height:"8",rx:"1"}),r.jsx("rect",{x:"3",y:"13",width:"8",height:"8",rx:"4"}),r.jsx("rect",{x:"13",y:"13",width:"8",height:"8",rx:"4"})]})}),n("matrix.group_type")]}),r.jsxs("button",{className:`sort-btn ${Ze==="tag"?"active":""}`,onClick:()=>{wt("tag"),localStorage.setItem("matrix_group_by","tag")},title:n("matrix.group_tag"),children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"}),r.jsx("line",{x1:"7",y1:"7",x2:"7.01",y2:"7"})]})}),n("matrix.group_tag")]})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${X==="grid"?"active":""}`,onClick:()=>me("grid"),title:a==="zh-TW"?"方格檢視":"Grid view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),r.jsx("button",{className:`view-btn ${X==="table"?"active":""}`,onClick:()=>me("table"),title:a==="zh-TW"?"表格檢視":"Table view",children:r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})})}),r.jsx("button",{className:`view-btn ${X==="thumb"?"active":""}`,onClick:()=>me("thumb"),title:a==="zh-TW"?"縮圖檢視":"Thumbnail view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"1"}),r.jsx("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),r.jsx("path",{d:"M21 15l-5-5L5 21"})]})})]})]})]}),X==="thumb"&&r.jsxs("div",{className:"thumb-size-row",children:[r.jsxs("div",{className:"thumb-size",children:[r.jsxs("span",{className:"thumb-size-label",children:[r.jsx("span",{className:"label-icon","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"15 3 21 3 21 9"}),r.jsx("polyline",{points:"9 21 3 21 3 15"}),r.jsx("line",{x1:"21",y1:"3",x2:"14",y2:"10"}),r.jsx("line",{x1:"3",y1:"21",x2:"10",y2:"14"})]})}),a==="zh-TW"?"尺寸":"Size"]}),r.jsx("input",{type:"range",min:160,max:640,step:20,value:Ce,onChange:y=>Z(parseInt(y.target.value,10)),className:"thumb-size-slider"}),r.jsxs("span",{className:"thumb-size-val",children:[Ce,"px"]}),r.jsx("span",{className:"thumb-build-stamp",title:"build 2026-05-08T17:54:18.571Z",children:(()=>{try{return`b${new Date("2026-05-08T17:54:18.571Z").toISOString().slice(11,16).replace(":","")}`}catch{return"b—"}})()})]}),r.jsxs("div",{className:"thumb-type-filter",role:"group",children:[r.jsxs("button",{className:`thumb-type-btn ${oe==="all"?"active":""}`,onClick:()=>be("all"),title:a==="zh-TW"?"顯示 VM + CT":"Show VMs and CTs",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})}),a==="zh-TW"?"全部":"ALL"]}),r.jsxs("button",{className:`thumb-type-btn ${oe==="qemu"?"active":""}`,onClick:()=>be("qemu"),title:a==="zh-TW"?"只顯示 VM (QEMU)":"Show VMs (QEMU) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),r.jsx("line",{x1:"8",y1:"20",x2:"16",y2:"20"}),r.jsx("line",{x1:"12",y1:"18",x2:"12",y2:"20"})]})}),"VM"]}),r.jsxs("button",{className:`thumb-type-btn ${oe==="lxc"?"active":""}`,onClick:()=>be("lxc"),title:a==="zh-TW"?"只顯示 CT (LXC)":"Show CTs (LXC) only",children:[r.jsx("span",{className:"tb-ico","aria-hidden":!0,children:r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"}),r.jsx("polyline",{points:"3.27 6.96 12 12.01 20.73 6.96"}),r.jsx("line",{x1:"12",y1:"22.08",x2:"12",y2:"12"})]})}),"CT"]})]}),r.jsxs("button",{className:`thumb-prefer-btn ${W?"active":""}`,onClick:()=>le(y=>!y),title:a==="zh-TW"?"優先顯示有畫面/有文字的縮圖；全黑 VM 與空白 CT 排到最後":"Prefer thumbnails with content; blank VMs and empty CTs go to the end",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M3 6h13M3 12h9M3 18h6"}),r.jsx("path",{d:"M19 4l2 2-6 6-2-2 6-6z",opacity:"0.7"})]}),a==="zh-TW"?"優先有內容":"Prefer content"]})]}),r.jsxs("div",{className:"matrix-content",children:[X==="grid"?r.jsxs("div",{className:"matrix-grid",ref:Kr,children:[_t.length>0&&r.jsxs("svg",{className:"migration-lines-overlay",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"migrationGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#e066ff",stopOpacity:"0.8"}),r.jsx("stop",{offset:"50%",stopColor:"#00f0ff",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#e066ff",stopOpacity:"0.4"})]}),r.jsxs("filter",{id:"migrationGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),_t.map((y,F)=>r.jsxs("g",{children:[r.jsx("line",{className:"migration-line",x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2,stroke:"url(#migrationGradient)",strokeWidth:"2",filter:"url(#migrationGlow)"}),r.jsx("circle",{className:"migration-particle",r:"4",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",path:`M${y.x1},${y.y1} L${y.x2},${y.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"3",fill:"#e066ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"0.5s",path:`M${y.x1},${y.y1} L${y.x2},${y.y2}`})}),r.jsx("circle",{className:"migration-particle",r:"2",fill:"#00f0ff",children:r.jsx("animateMotion",{dur:"1.5s",repeatCount:"indefinite",begin:"1s",path:`M${y.x1},${y.y1} L${y.x2},${y.y2}`})})]},`line-${y.vmid}-${F}`))]}),Jt.length>0&&r.jsxs("svg",{className:"migration-lines-overlay completing",children:[r.jsxs("defs",{children:[r.jsxs("linearGradient",{id:"completingGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"#00ff88",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"#00ff88",stopOpacity:"0.3"})]}),r.jsxs("filter",{id:"completingGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"4",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})]}),Jt.map((y,F)=>r.jsxs("g",{children:[r.jsx("line",{className:"completing-line",x1:y.x1,y1:y.y1,x2:y.x2,y2:y.y2,stroke:"url(#completingGradient)",strokeWidth:3*(1-y.progress)+1,filter:"url(#completingGlow)",opacity:1-y.progress*.5}),y.progress>.8&&r.jsx("circle",{cx:y.x2,cy:y.y2,r:20*(y.progress-.8)*5,fill:"none",stroke:"#00ff88",strokeWidth:"2",opacity:1-(y.progress-.8)*5})]},`completing-${y.vmid}-${F}`))]}),(()=>{const y=new Map;Object.entries(ft).forEach(([M,O])=>{y.set(M,O)}),et.forEach(M=>{y.has(M.targetGroupKey)||y.set(M.targetGroupKey,{vms:[],clusterId:M.clusterId})});const F=Array.from(y.entries()).sort((M,O)=>{const[ne]=M,[q]=O,ie=Ue=>{if(Ue.includes(" / ")){const[De,Ke]=Ue.split(" / ");return{cluster:De,node:Ke}}return{cluster:"",node:Ue}},de=ie(ne),xe=ie(q);let ve=0;return pe==="cluster"?(ve=de.cluster.localeCompare(xe.cluster),ve===0&&(ve=de.node.localeCompare(xe.node))):(ve=de.node.localeCompare(xe.node),ve===0&&(ve=de.cluster.localeCompare(xe.cluster))),Fe==="desc"?-ve:ve});let E=0;return F.map(([M,O])=>{const ne=et.filter(q=>q.targetGroupKey===M);return r.jsxs("div",{className:`node-section ${O.vms.length===0&&ne.length>0?"ghost-only":""}`,children:[r.jsxs("div",{className:"node-section-header",children:[r.jsx("span",{className:"node-section-name",children:M}),r.jsxs("span",{className:"node-section-count",children:[O.vms.length,ne.length>0&&r.jsxs("span",{className:"incoming-count",children:[" +",ne.length]})]})]}),r.jsxs("div",{className:`vm-grid ${ye==="load"&&!Xr?"sort-by-load":""} ${Xr?"initial-load":""}`,children:[pt&&O.vms.map(q=>{const ie=`${q.cluster_id}/${q.node}/${q.vmid}`,de=Hs(q.vmid,q.node,q.cluster_id,e,t),xe=`${q.cluster_id}:${q.vmid}`,ve=H.get(xe);if(ve&&ve.sourceNode===q.node||et.find(Ke=>Ke.targetClusterId===q.cluster_id&&Ke.vm.vmid===q.vmid))return null;const De=E++;return r.jsx(gu,{ref:Ke=>{Ke?Wt.current.set(ie,Ke):Wt.current.delete(ie)},vm:q,isSelected:o===ie,onClick:()=>i(o===ie?null:ie),onContextMenu:Ke=>Pr(Ke,q,O.clusterId),animationDelay:Xr?De*50:0,task:de,isCompleting:!!ve},ie)}).filter(Boolean),pt&&ne.map(q=>{var xe;const ie=`ghost-${q.vm.cluster_id}-${q.vm.vmid}`,de=(xe=_e.find(ve=>ve.vm.vmid===q.vm.vmid&&ve.clusterId===q.vm.cluster_id))==null?void 0:xe.task;return r.jsx(gu,{ref:ve=>{ve?Wt.current.set(ie,ve):Wt.current.delete(ie)},vm:q.vm,isSelected:!1,onClick:()=>{},onContextMenu:ve=>ve.preventDefault(),animationDelay:0,task:de,isGhost:!0},ie)})]},`grid-${R}-${L}-${ye}-${gt}`)]},M)})})(),Object.keys(ft).length===0&&et.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}):X==="thumb"?r.jsxs("div",{ref:Ve,className:"matrix-thumb-grid",children:[r.jsx("svg",{"aria-hidden":!0,style:{position:"absolute",width:0,height:0,overflow:"hidden",pointerEvents:"none"},children:r.jsx("defs",{children:r.jsxs("filter",{id:"jt-noise",x:"0",y:"0",width:"100%",height:"100%",children:[r.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.9",numOctaves:"2",stitchTiles:"stitch",children:r.jsx("animate",{attributeName:"seed",values:"1;7;3;9;5;11",dur:"0.4s",repeatCount:"indefinite"})}),r.jsx("feColorMatrix",{values:`
                    0.10 0.10 0.10 0  0
                    0.45 0.55 0.55 0  0
                    0.65 0.85 0.95 0  0
                    0    0    0    1.6 -0.4`})]})})}),Et.length===0?r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})}):lt.map(([y,F])=>{const E=W?[...F].sort((M,O)=>{var xe,ve;const ne=`${M.clusterId||(e==null?void 0:e.id)||""}/${M.node}/${M.vmid}`,q=`${O.clusterId||(e==null?void 0:e.id)||""}/${O.node}/${O.vmid}`,ie=(xe=he[ne])!=null&&xe.isBlank?1:0,de=(ve=he[q])!=null&&ve.isBlank?1:0;return ie-de}):F;return r.jsxs("div",{className:"thumb-group",children:[Ze!=="none"&&r.jsxs("div",{className:"thumb-group-header",children:[r.jsx("span",{className:"thumb-group-bracket left","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-name",children:y}),r.jsx("span",{className:"thumb-group-count",children:E.length}),r.jsx("span",{className:"thumb-group-rule","aria-hidden":!0}),r.jsx("span",{className:"thumb-group-bracket right","aria-hidden":!0})]}),r.jsx("div",{className:"thumb-group-cards",children:E.map(M=>{var Ue;const O=M.type==="lxc",ne=M.status==="running",q=((Ue=M.cpu)==null?void 0:Ue.usage_percent)??0,ie=M.memory&&M.memory.total_bytes>0?M.memory.used_bytes/M.memory.total_bytes*100:0,de=M.clusterId||(e==null?void 0:e.id)||"",xe=`${de}/${M.node}/${M.vmid}`,ve=he[xe];return r.jsxs("div",{"data-card-key":xe,className:`vm-thumb-card status-${M.status}${ve!=null&&ve.isBlank?" is-blank":""}`,style:{width:`${Ce}px`,flex:"0 0 auto"},onClick:()=>T({vm:M,clusterId:de}),onContextMenu:De=>Pr(De,M,de),children:[r.jsxs("div",{className:"vm-thumb-image",style:{height:`${Rr}px`},children:[r.jsxs("div",{className:"vm-thumb-loading","aria-hidden":!0,children:[r.jsxs("svg",{className:"vtl-fill",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg",children:[r.jsx("rect",{width:"100%",height:"100%",fill:"#02050b"}),r.jsx("rect",{width:"100%",height:"100%",filter:"url(#jt-noise)"})]}),r.jsx("div",{className:"vtl-scanlines"}),r.jsx("div",{className:"vtl-vignette"}),r.jsx("span",{className:"vtl-text",children:a==="zh-TW"?"訊號接收中":"NO SIGNAL"})]}),ve&&r.jsx("img",{src:ve.url,alt:`VM ${M.vmid} screenshot`,loading:"lazy",onLoad:De=>{De.currentTarget.parentElement.dataset.loaded="1"},onError:De=>{De.currentTarget.parentElement.dataset.error="1"}})]}),r.jsxs("div",{className:"vm-thumb-meta",children:[r.jsxs("div",{className:"vm-thumb-title",children:[r.jsx("span",{className:`type-badge ${M.type}`,children:O?"CT":"VM"}),r.jsxs("code",{className:"vm-thumb-id",children:["#",M.vmid]}),r.jsx("span",{className:"vm-thumb-name",children:M.name})]}),ne&&r.jsxs("div",{className:"vm-thumb-bars",children:[r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"CPU"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${ze(q)}`,style:{width:`${Math.min(q,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${ze(q)}`,children:ot(q,1)})]}),r.jsxs("div",{className:"vm-thumb-bar",children:[r.jsx("span",{className:"vm-thumb-bar-label",children:"MEM"}),r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${ze(ie)}`,style:{width:`${Math.min(ie,100)}%`}})}),r.jsx("span",{className:`vm-thumb-bar-val text-${ze(ie)}`,children:ot(ie,0)})]})]})]})]},xe)})})]},y)})]}):r.jsxs("div",{className:"matrix-table-container",children:[B.size>0&&r.jsxs("div",{className:"bulk-toolbar",children:[r.jsx("span",{className:"bulk-count",children:a==="zh-TW"?`已選 ${B.size}`:`${B.size} selected`}),r.jsxs("button",{className:"bulk-btn",disabled:Q,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${B.size} 台 VM/CT 執行開機？`:`Start ${B.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次開機":"Bulk start"})&&await Me("start")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),r.jsx("span",{children:n("vm.start")})]}),r.jsxs("button",{className:"bulk-btn",disabled:Q,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${B.size} 台 VM/CT 執行關機（ACPI）？`:`Shutdown (ACPI) ${B.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次關機":"Bulk shutdown",destructive:!0})&&await Me("shutdown")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18.36 6.64A9 9 0 0 1 6.64 18.36"}),r.jsx("line",{x1:"12",y1:"2",x2:"12",y2:"12"})]}),r.jsx("span",{children:n("vm.shutdown_acpi")})]}),r.jsxs("button",{className:"bulk-btn",disabled:Q,onClick:async()=>{await s.confirm(a==="zh-TW"?`對選取的 ${B.size} 台 VM/CT 重新啟動？`:`Reboot ${B.size} selected VM/CTs?`,{title:a==="zh-TW"?"批次重啟":"Bulk reboot",destructive:!0})&&await Me("reboot")},children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23,4 23,10 17,10"}),r.jsx("path",{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"})]}),r.jsx("span",{children:n("vm.reboot")})]}),r.jsxs("button",{className:"bulk-btn danger",disabled:Q,onClick:async()=>{await s.confirm(a==="zh-TW"?`強制停止 ${B.size} 台 VM/CT？此動作不會通知 guest OS。`:`Hard-stop ${B.size} selected VM/CTs? Guest OS will not be notified.`,{title:a==="zh-TW"?"批次強制停止":"Bulk hard stop",destructive:!0})&&await Me("stop")},children:[r.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"currentColor",children:r.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"1"})}),r.jsx("span",{children:n("vm.stop_hard")})]}),r.jsx("button",{className:"bulk-btn ghost",onClick:te,disabled:Q,children:a==="zh-TW"?"取消選取":"Clear"})]}),r.jsxs("table",{className:"vm-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:"select-col",children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:B.size>0&&Lt.every(y=>B.has(`${y.cluster_id}/${y.node}/${y.vmid}`)),ref:y=>{if(!y)return;const F=Lt.some(M=>B.has(`${M.cluster_id}/${M.node}/${M.vmid}`)),E=Lt.length>0&&Lt.every(M=>B.has(`${M.cluster_id}/${M.node}/${M.vmid}`));y.indeterminate=F&&!E},onChange:y=>{y.target.checked?K(new Set(Lt.map(F=>`${F.cluster_id}/${F.node}/${F.vmid}`))):te()},title:n("matrix.bulk.select_all")})}),r.jsxs("th",{className:`sortable ${Ne==="status"?"sorted":""}`,onClick:()=>kt("status"),children:[r.jsx("span",{children:n("node.status")}),Ne==="status"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="vmid"?"sorted":""}`,onClick:()=>kt("vmid"),children:[r.jsx("span",{children:"VMID"}),Ne==="vmid"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="type"?"sorted":""}`,onClick:()=>kt("type"),children:[r.jsx("span",{children:n("table.type")}),Ne==="type"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="name"?"sorted":""}`,onClick:()=>kt("name"),children:[r.jsx("span",{children:n("table.name")}),Ne==="name"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsx("th",{className:"tags-header",children:n("table.tags")}),r.jsxs("th",{className:`sortable ${Ne==="node"?"sorted":""}`,onClick:()=>kt("node"),children:[r.jsx("span",{children:n("table.node")}),Ne==="node"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="cpu"?"sorted":""}`,onClick:()=>kt("cpu"),children:[r.jsx("span",{children:n("metric.cpu")}),Ne==="cpu"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="memory"?"sorted":""}`,onClick:()=>kt("memory"),children:[r.jsx("span",{children:n("metric.memory")}),Ne==="memory"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${Ne==="rx"?"sorted":""}`,onClick:()=>kt("rx"),children:[r.jsxs("span",{children:["↓ ",n("metric.rx")]}),Ne==="rx"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable net-header ${Ne==="tx"?"sorted":""}`,onClick:()=>kt("tx"),children:[r.jsxs("span",{children:["↑ ",n("metric.tx")]}),Ne==="tx"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable ${Ne==="uptime"?"sorted":""}`,onClick:()=>kt("uptime"),children:[r.jsx("span",{children:n("table.uptime")}),Ne==="uptime"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]}),r.jsxs("th",{className:`sortable task-header ${Ne==="task"?"sorted":""}`,onClick:()=>kt("task"),children:[r.jsx("span",{children:n("table.task")}),Ne==="task"&&r.jsx("span",{className:"sort-indicator",children:ke==="asc"?"▲":"▼"})]})]})}),r.jsx("tbody",{children:Lt.map(y=>{const F=`${y.cluster_id}/${y.node}/${y.vmid}`,E=y.status==="running",M=y.cpu.usage_percent,O=y.memory.used_bytes/y.memory.total_bytes*100,ne=Hs(y.vmid,y.node,y.cluster_id,e,t),q=B.has(F);return r.jsxs("tr",{className:`${o===F?"selected":""} ${q?"multi-selected":""} ${y.status} ${Y?"sort-animating":""}`,onClick:()=>i(o===F?null:F),onContextMenu:ie=>Pr(ie,y,y.clusterId),children:[r.jsx("td",{className:"select-col",onClick:ie=>ie.stopPropagation(),children:r.jsx("input",{type:"checkbox",className:"bulk-check",checked:q,onChange:()=>Se(F)})}),r.jsx("td",{children:r.jsx("span",{className:`status-badge ${Wl(y.status)}`,children:y.status.toUpperCase()})}),r.jsx("td",{className:"vmid-cell",children:y.vmid}),r.jsx("td",{className:"type-cell",children:r.jsx("span",{className:`type-badge ${y.type}`,children:y.type==="qemu"?"VM":"CT"})}),r.jsx("td",{className:"name-cell",children:y.name}),r.jsx("td",{className:"tags-cell",children:(()=>{const ie=(y.tags||[]).map(de=>(de||"").trim()).filter(Boolean);return ie.length>0?r.jsx("div",{className:"vm-tags",children:ie.map((de,xe)=>r.jsx("span",{className:"vm-tag",children:de},xe))}):null})()}),r.jsx("td",{className:"node-cell",children:y.node}),r.jsx("td",{children:E?r.jsxs("div",{className:"cpu-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${ze(M)}`,style:{width:`${M}%`}})}),r.jsx("span",{className:`text-${ze(M)}`,children:ot(M,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:E?r.jsxs("div",{className:"mem-cell",children:[r.jsx("div",{className:"mini-bar",children:r.jsx("div",{className:`mini-bar-fill ${ze(O)}`,style:{width:`${O}%`}})}),r.jsx("span",{children:ot(O,1)})]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-rx-cell",children:E?r.jsxs("span",{className:"net-rx",children:[Re(y.network.rx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"net-tx-cell",children:E?r.jsxs("span",{className:"net-tx",children:[Re(y.network.tx_bytes_sec),"/s"]}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{children:E?r.jsx("span",{className:"uptime-cell",children:ii(y.uptime)}):r.jsx("span",{className:"text-muted",children:"—"})}),r.jsx("td",{className:"task-cell",children:ne&&r.jsx(Ig,{task:ne})})]},F)})})]}),Lt.length===0&&r.jsx("div",{className:"no-vms",children:r.jsx("span",{children:n("error.no_data")})})]}),jr&&r.jsx(Qg,{vm:jr,onClose:()=>i(null)},`${jr.node}/${jr.vmid}`)]}),ae&&r.jsx("div",{className:"thumb-preview-overlay",onClick:()=>T(null),children:r.jsxs("div",{className:"thumb-preview-frame",onClick:y=>y.stopPropagation(),children:[r.jsxs("div",{className:"thumb-preview-titlebar",children:[r.jsxs("span",{className:"thumb-preview-name",children:[r.jsx("span",{className:`type-badge ${ae.vm.type}`,children:ae.vm.type==="lxc"?"CT":"VM"}),r.jsxs("code",{className:"thumb-preview-id",children:["#",ae.vm.vmid]}),r.jsx("span",{children:ae.vm.name}),r.jsx("span",{className:"thumb-preview-node",children:ae.vm.node})]}),r.jsx("button",{className:"thumb-preview-close",onClick:()=>T(null),children:"×"})]}),r.jsxs("div",{className:"thumb-preview-body",children:[r.jsxs("div",{className:"thumb-preview-loader","aria-hidden":!0,children:[r.jsx("div",{className:"tpl-grid"}),r.jsx("div",{className:"tpl-scan"}),r.jsx("div",{className:"tpl-ring"}),r.jsx("div",{className:"tpl-corner tl"}),r.jsx("div",{className:"tpl-corner tr"}),r.jsx("div",{className:"tpl-corner bl"}),r.jsx("div",{className:"tpl-corner br"}),r.jsxs("div",{className:"tpl-status",children:[r.jsxs("span",{className:"tpl-dots",children:[r.jsx("i",{}),r.jsx("i",{}),r.jsx("i",{})]}),r.jsx("span",{className:"tpl-text",children:a==="zh-TW"?"取得高解析畫面":"FETCHING FRAMEBUFFER"})]})]}),r.jsx("img",{src:`/api/console/screenshot/${encodeURIComponent(ae.clusterId)}/${encodeURIComponent(ae.vm.node)}/${ae.vm.vmid}?max=1600&t=${C}`,alt:`VM ${ae.vm.vmid} full screenshot`,onLoad:y=>{y.currentTarget.parentElement.dataset.loaded="1"},onError:y=>{y.currentTarget.parentElement.dataset.error="1"}})]})]})}),r.jsx(lf,{state:$e,onClose:wn,onShowDetails:()=>{$e.vm&&i(`${$e.vm.node}/${$e.vm.vmid}`)},onPowerAction:A,onOpenConsole:async()=>{if(!$e.vm)return;const y=$e.vm,F=$e.clusterId;if(h==="disabled"){await s.alert(n("console.disabled"));return}if(h==="prompt"){z({vm:y,clusterId:F});return}try{const E=await Be.consolePrepare({cluster_id:F,node:y.node,vmid:y.vmid});$(F,y,E.console_token,E.vnc_password)}catch(E){const M=E instanceof Error?E.message:String(E);await s.alert(n("console.prepare_failed",{err:M}))}},onRemoteMigrate:()=>{$e.vm&&g({vm:$e.vm,clusterId:$e.clusterId})},onOpenSnapshots:()=>{$e.vm&&x({vm:$e.vm,clusterId:$e.clusterId})},onBackupNow:()=>{$e.vm&&k({vm:$e.vm,clusterId:$e.clusterId})},onShowPerf:()=>{$e.vm&&f({vm:$e.vm,clusterId:$e.clusterId})},getNodeHealth:mt,userRole:((jn=c.user)==null?void 0:jn.role_global)??null,consoleMode:h,consolePasswordSet:!!N[$e.clusterId]}),r.jsx(Ag,{open:l!==null,title:l?Wi(l.action,n):"",destructive:l?qg(l.action):!1,details:l?r.jsxs(r.Fragment,{children:[n(l.vm.type==="lxc"?"confirm.about_to_ct":"confirm.about_to_vm",{action:Wi(l.action,n),vmid:String(l.vm.vmid),name:l.vm.name,node:l.vm.node,cluster:l.clusterId}),l.action==="stop"&&r.jsxs(r.Fragment,{children:[r.jsx("br",{}),r.jsx("br",{}),r.jsx("strong",{style:{color:"#ff8a3c"},children:n("confirm.hard_stop_warning")})]})]}):null,confirmLabel:l?Wi(l.action,n):n("action.cancel"),onConfirm:U,onCancel:()=>d(null)}),r.jsx(cf,{open:m!==null,cluster_id:(m==null?void 0:m.clusterId)||"",vm:m?{vmid:m.vm.vmid,name:m.vm.name,node:m.vm.node,type:m.vm.type}:null,onClose:()=>g(null)}),r.jsx(df,{open:p!==null,cluster_id:(p==null?void 0:p.clusterId)||"",vm:p?{vmid:p.vm.vmid,name:p.vm.name,node:p.vm.node,type:p.vm.type}:null,onClose:()=>x(null)}),r.jsx(uf,{open:b!==null,cluster_id:(b==null?void 0:b.clusterId)||"",vm:b?{vmid:b.vm.vmid,name:b.vm.name,node:b.vm.node,type:b.vm.type}:null,onClose:()=>k(null)}),r.jsx(of,{open:j!==null,clusterId:(j==null?void 0:j.clusterId)||"",node:(j==null?void 0:j.vm.node)||"",vmid:j==null?void 0:j.vm.vmid,kind:(j==null?void 0:j.vm.type)==="lxc"?"lxc":"qemu",title:j?`${j.vm.type==="lxc"?"CT":"VM"} ${j.vm.vmid} — ${j.vm.name}`:"",onClose:()=>f(null)}),r.jsx(pf,{open:_!==null,cluster_id:(_==null?void 0:_.clusterId)||"",pveUser:(()=>{const y=_==null?void 0:_.clusterId;if(!y)return"root@pam";const F=t&&t[y]||((e==null?void 0:e.id)===y?e:null);return"root@pam"})(),onCancel:()=>z(null),onSubmit:async y=>{if(!_)return;const{vm:F,clusterId:E}=_,M=await Be.consolePrepare({cluster_id:E,node:F.node,vmid:F.vmid,password:y});$(E,F,M.console_token,M.vnc_password),z(null)}}),P.length>0&&r.jsx("div",{className:"mig-fail-stack",children:P.map(y=>{const F=`qm unlock ${y.vmid}`;return r.jsxs("div",{className:"mig-fail-toast",children:[r.jsxs("div",{className:"mig-fail-head",children:["⚠ ",n("mig.failed.title")]}),r.jsx("div",{className:"mig-fail-body",children:n("mig.failed.body",{vmid:y.vmid,target:y.targetNode||"?",lock:y.lock})}),r.jsx("div",{className:"mig-fail-cmd-line",children:r.jsxs("span",{className:"mig-fail-cmd-hint",children:[n("mig.failed.cmd_hint")," ",r.jsx("code",{children:y.sourceNode})]})}),r.jsxs("div",{className:"mig-fail-cmd-row",children:[r.jsx("code",{className:"mig-fail-cmd",children:F}),r.jsx("button",{className:"mig-fail-btn",onClick:()=>{var E;(E=navigator.clipboard)==null||E.writeText(F).then(()=>{D(M=>M.map(O=>O.id===y.id?{...O,copied:!0}:O))})},children:y.copied?n("mig.failed.copied"):n("mig.failed.copy")})]}),r.jsx("button",{className:"mig-fail-dismiss",onClick:()=>D(E=>E.filter(M=>M.id!==y.id)),"aria-label":n("mig.failed.dismiss"),children:"×"})]},y.id)})}),r.jsxs("div",{className:"matrix-legend",children:[r.jsx("span",{className:"legend-title",children:"BORDER COLOR:"}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color success"}),r.jsx("span",{className:"legend-label",children:"<80%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color warning"}),r.jsx("span",{className:"legend-label",children:"80-95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color danger"}),r.jsx("span",{className:"legend-label",children:">95%"})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color muted"}),r.jsx("span",{className:"legend-label",children:"Stopped"})]}),r.jsx("span",{className:"legend-note",children:"(max of CPU/MEM/DISK)"}),X==="thumb"&&r.jsxs("span",{className:"legend-thumb-refresh",title:a==="zh-TW"?"縮圖每 30 秒重新抓取一次（CPU / MEM 條跟著叢集 polling 即時更新）":"Thumbnails refresh every 30s (CPU / MEM bars update with cluster polling)",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),a==="zh-TW"?"縮圖更新：每 30 秒":"Thumb refresh: every 30s"]})]}),r.jsx("style",{children:`
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
          display: inline-flex;
          align-items: center;
          gap: 5px;
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

        /* Inline icon used inside toolbar buttons (filter-tab / sort-btn /
           thumb-type-btn) and label spans. Inherits currentColor so it
           tints with the parent's hover/active state.
           NOTE: named .tb-ico (not .btn-icon) because App.tsx already
           uses a btn-icon class for icon-only header buttons; reusing
           that name here clobbered them. */
        .tb-ico, .label-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 12px; height: 12px;
          flex: 0 0 12px;
          opacity: 0.8;
          transition: opacity var(--transition-fast), filter var(--transition-fast);
        }
        .filter-tab.active .tb-ico,
        .sort-btn.active .tb-ico,
        .thumb-type-btn.active .tb-ico {
          opacity: 1;
          filter: drop-shadow(0 0 3px currentColor);
        }
        .label-icon {
          opacity: 0.7;
          color: var(--text-muted);
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

        /* Disabled state — applied to whole group when the current view
           mode forces a fixed filter (e.g. thumbnail mode = running only). */
        .filter-tabs.is-disabled {
          opacity: 0.4;
          filter: grayscale(0.6);
        }
        .filter-tab:disabled {
          cursor: not-allowed;
          color: var(--text-muted);
          background: transparent;
          text-shadow: none;
        }
        .filter-tab:disabled:hover {
          background: transparent;
          color: var(--text-muted);
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
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          margin-right: 2px;
        }

        .sort-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
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

        /* Thumbnail-size slider — sits in its own row below the toolbar
           (see JSX). Anchored to the LEFT so it never pushes existing
           toolbar buttons around when thumb mode is toggled on. */
        .thumb-size-row {
          padding: 6px var(--spacing-md) 0;
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        /* Type filter — segmented buttons (All | VM | CT) sitting between
           the size slider and prefer-content toggle. Same cyberpunk pill
           styling as filter-tabs. */
        .thumb-type-filter {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 2px 4px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
        }
        .thumb-type-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all var(--transition-fast);
        }
        .thumb-type-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .thumb-type-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.15);
          text-shadow: 0 0 6px var(--primary);
        }

        /* "Prefer with content" toggle, sits to the right of the slider. */
        .thumb-prefer-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.16);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .thumb-prefer-btn:hover {
          color: var(--text-primary);
          border-color: rgba(0, 240, 255, 0.4);
        }
        .thumb-prefer-btn.active {
          color: var(--primary);
          background: rgba(0, 240, 255, 0.12);
          border-color: var(--primary);
          text-shadow: 0 0 6px var(--primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.18);
        }
        .thumb-size {
          display: flex;
          align-items: center;
          gap: 8px;
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
        .thumb-build-stamp {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          opacity: .55;
          margin-left: 6px;
          letter-spacing: 0.04em;
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

        /* Thumbnail grid view. Outer container handles scroll; cards
           are inside .thumb-group-cards which is the actual flex-wrap
           row. Group headers (.thumb-group-header) appear above each
           row when group-by != none. */
        .matrix-thumb-grid {
          flex: 1;
          overflow: auto;
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .thumb-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        /* Group header — designed to be unmistakable at a glance.
           Corner brackets + thick gradient bar + uppercase title with
           glow + count chip. Sticky-positioned so the label stays
           visible while the cards under it scroll. */
        .thumb-group-header {
          position: sticky;
          top: 0;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: linear-gradient(90deg,
            rgba(0,240,255,0.18) 0%,
            rgba(0,240,255,0.08) 35%,
            rgba(0,240,255,0.02) 100%);
          border-top: 1px solid rgba(0,240,255,0.45);
          border-bottom: 1px solid rgba(0,240,255,0.45);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        /* Cyber corner brackets — small angled accent at each end of
           the header bar. */
        .thumb-group-bracket {
          position: relative;
          width: 14px;
          height: 16px;
          flex: 0 0 14px;
        }
        .thumb-group-bracket.left::before,
        .thumb-group-bracket.left::after,
        .thumb-group-bracket.right::before,
        .thumb-group-bracket.right::after {
          content: '';
          position: absolute;
          background: var(--primary);
          box-shadow: 0 0 6px rgba(0,240,255,0.7);
        }
        .thumb-group-bracket.left::before  { top: 0; left: 0; width: 8px; height: 2px; }
        .thumb-group-bracket.left::after   { top: 0; left: 0; width: 2px; height: 10px; }
        .thumb-group-bracket.right::before { bottom: 0; right: 0; width: 8px; height: 2px; }
        .thumb-group-bracket.right::after  { bottom: 0; right: 0; width: 2px; height: 10px; }

        .thumb-group-name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow:
            0 0 8px rgba(0,240,255,0.7),
            0 0 16px rgba(0,240,255,0.35);
          white-space: nowrap;
        }
        .thumb-group-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          height: 22px;
          padding: 0 8px;
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          background: rgba(0,240,255,0.10);
          border: 1px solid rgba(0,240,255,0.5);
          border-radius: 11px;
          box-shadow: inset 0 0 4px rgba(0,240,255,0.2);
        }
        /* The thin double rule that fills the rest of the header — gives
           the title a "label on a separator" feel rather than floating. */
        .thumb-group-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg,
            rgba(0,240,255,0.6) 0%,
            rgba(0,240,255,0.2) 60%,
            transparent 100%);
          box-shadow: 0 2px 0 rgba(0,240,255,0.15);
        }
        .thumb-group-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-content: flex-start;
          justify-content: flex-start;
        }
        /* Visual de-emphasis for blank thumbs when prefer-content is on
           (they're already last in DOM order from the sort). */
        .vm-thumb-card.is-blank {
          opacity: 0.78;
        }
        .vm-thumb-card.is-blank:hover {
          opacity: 1;
        }
        .vm-thumb-card {
          /* Plain block layout. Earlier flex-column attempt interacted
             badly with grid auto-row sizing at larger thumb widths. */
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
          /* Height is set inline by React: style={{height: thumbSize*9/16}}.
             We deliberately don't set any CSS height — that way inline
             style is the single source of truth and there's nothing to
             override. */
          position: relative;
          width: 100%;
          background: #000;
          border-bottom: 1px solid rgba(0, 240, 255, 0.12);
          overflow: hidden;
        }
        .vm-thumb-image > .vm-thumb-loading,
        .vm-thumb-image > img {
          position: absolute;
          inset: 0;
        }
        .vm-thumb-image img {
          width: 100%; height: 100%;
          object-fit: contain;
          background: #000;
          opacity: 0;
          transition: opacity .25s ease;
        }
        .vm-thumb-image[data-loaded="1"] img { opacity: 1; }
        .vm-thumb-image[data-error="1"] img { opacity: 0; }
        .vm-thumb-image[data-loaded="1"] .vm-thumb-loading { display: none; }
        .vm-thumb-image[data-error="1"] .vm-thumb-loading { display: none; }
        /* Per-thumb "no signal" loader. Look-and-feel: a CRT showing
           static — animated noise (SVG feTurbulence), faint horizontal
           scanlines on top, dark vignette around the edges, plus a
           flickering "NO SIGNAL / 訊號接收中" label. Three layers, no
           keyframe-heavy elements per thumb (the noise is a single
           global filter referenced via url()). */
        .vm-thumb-loading {
          position: absolute; inset: 0;
          background: #02050b;
          overflow: hidden;
          z-index: 1;
        }
        .vtl-fill {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          display: block;
        }
        /* Horizontal scanlines on top of the noise — gives the static
           a CRT character instead of generic film grain. */
        .vtl-scanlines {
          position: absolute; inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0)        0px,
            rgba(0, 0, 0, 0)        2px,
            rgba(0, 0, 0, 0.45)     3px,
            rgba(0, 0, 0, 0.45)     4px);
          mix-blend-mode: multiply;
        }
        /* Edge vignette — old monitor / signal-loss look. */
        .vtl-vignette {
          position: absolute; inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(0, 0, 0, 0.55) 100%);
        }
        /* Flicker label centered. The animation jiggles opacity + tiny
           horizontal shift to mimic VHS tracking error. */
        .vtl-text {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          color: rgba(0, 240, 255, 0.95);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-shadow:
            -1px 0 rgba(255, 60, 60, 0.55),
             1px 0 rgba(60, 255, 200, 0.55),
             0 0 8px rgba(0, 240, 255, 0.6);
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(0, 240, 255, 0.4);
          white-space: nowrap;
          animation: vtlFlicker 2.4s steps(1) infinite;
        }
        @keyframes vtlFlicker {
          0%, 12%, 14%, 38%, 42%, 60%, 100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          13% { opacity: 0.4; transform: translate(calc(-50% + 1px), -50%); }
          40% { opacity: 0.2; transform: translate(calc(-50% - 1px), -50%); }
          61% { opacity: 0.6; transform: translate(-50%, calc(-50% + 1px)); }
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
          background: #0d1320;
          border-top: 1px solid rgba(0, 240, 255, 0.18);
          /* Min-height so meta is always visible even before bars compute */
          min-height: 56px;
          display: block;
        }
        /* Click-to-zoom preview modal — cyberpunk hologram entrance:
           backdrop fades in, frame scales up with cyan glow, scan-line
           sweeps across once, corner brackets fade in. Same visual
           language as the cluster-selector / lang-menu / context-menu. */
        .thumb-preview-overlay {
          /* Leave room for the app's topbar (~64px) at the top so the
             preview frame never sits behind it, and a small gutter at the
             bottom so its border stays visible. The frame's max-w/max-h
             below are 100% of THIS padded box, never exceeding it. */
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, .82);
          backdrop-filter: blur(6px);
          z-index: 500;
          display: flex; align-items: center; justify-content: center;
          padding: 80px 24px 32px;
          animation: tpFade .2s ease;
        }
        @keyframes tpFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tpHologramIn {
          0%   { opacity: 0; transform: scale(.92); filter: brightness(1.6); }
          60%  { opacity: 1; transform: scale(1.005); filter: brightness(1.15); }
          100% { opacity: 1; transform: scale(1); filter: brightness(1); }
        }
        @keyframes tpScanLine {
          0%   { transform: translateY(-110%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes tpEdgePulse {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(0, 240, 255, .12),
              0 16px 60px rgba(0, 0, 0, .65),
              0 0 80px -20px rgba(0, 240, 255, .55),
              0 0 24px -6px rgba(0, 240, 255, .35);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(0, 240, 255, .25),
              0 16px 60px rgba(0, 0, 0, .65),
              0 0 100px -10px rgba(0, 240, 255, .75),
              0 0 36px -4px rgba(0, 240, 255, .55);
          }
        }
        .thumb-preview-frame {
          position: relative;
          background: linear-gradient(180deg, #0d1320, #050810);
          border: 1px solid rgba(0, 240, 255, .35);
          border-radius: 8px;
          /* Sized relative to the OVERLAY's content area (which has top
             padding of 80px = below topbar, bottom 32px = above edge).
             100% of that box = never overlaps topbar, never bleeds off
             the bottom of the viewport. */
          max-width: 100%;
          max-height: 100%;
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: tpHologramIn .35s cubic-bezier(.2, .9, .3, 1.1) both,
                     tpEdgePulse 3s ease-in-out 0.4s infinite;
        }
        /* Scan-line sweep over the modal once on entry */
        .thumb-preview-frame::before {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 30%;
          top: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 240, 255, 0) 30%,
            rgba(0, 240, 255, .18) 50%,
            rgba(0, 240, 255, 0) 70%,
            transparent 100%);
          pointer-events: none;
          animation: tpScanLine 1.2s ease-out .15s 1 both;
          z-index: 2;
        }
        /* Corner brackets — pure CSS, fade in after frame */
        .thumb-preview-frame::after {
          content: '';
          position: absolute; inset: 6px;
          pointer-events: none;
          border: 1px solid transparent;
          border-image: linear-gradient(135deg,
            rgba(0, 240, 255, .55) 0%, rgba(0, 240, 255, .55) 8%,
            transparent 8%, transparent 92%,
            rgba(0, 240, 255, .55) 92%, rgba(0, 240, 255, .55) 100%) 1;
          opacity: 0;
          animation: tpFade .4s ease .35s forwards;
          z-index: 3;
        }
        .thumb-preview-titlebar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(0, 240, 255, .25);
          font-family: var(--font-display);
          background: rgba(0, 240, 255, .06);
          position: relative; z-index: 4;
        }
        .thumb-preview-name {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; letter-spacing: .04em;
          color: var(--text-primary);
        }
        .thumb-preview-id {
          font-family: var(--font-mono);
          color: var(--text-muted);
          font-size: 12px;
        }
        .thumb-preview-node {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-left: 8px;
        }
        .thumb-preview-close {
          background: transparent;
          border: 1px solid rgba(0, 240, 255, .3);
          color: var(--text-muted);
          font-size: 20px; line-height: 1;
          width: 28px; height: 28px;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex; align-items: center; justify-content: center;
          transition: all .12s ease;
        }
        .thumb-preview-close:hover {
          color: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 8px rgba(0, 240, 255, .4);
        }
        /* Image container — keeps the framebuffer letterboxed inside
           the modal regardless of the source's native aspect (text
           terminals 720x40, full HD 1920x1080, etc.) */
        .thumb-preview-body {
          flex: 1 1 auto;
          min-height: 0; min-width: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 12px;
          background: #000;
          position: relative; z-index: 1;
          overflow: hidden;
        }
        /* While the image is loading, the <img> has no intrinsic size
           and the absolutely-positioned loader has nothing to fill.
           Give the body a sensible 16:9 viewport so the loader is the
           full size of where the framebuffer will land. The min() caps
           prevent overflow on narrow viewports. */
        .thumb-preview-body:not([data-loaded="1"]) {
          min-width: min(960px, calc(100vw - 80px));
          min-height: min(540px, calc(100vh - 192px));
        }
        .thumb-preview-body img {
          /* Constrain to the BODY (= the flex container's actual size)
             rather than viewport units. The previous viewport-units
             approach over-estimated padding + titlebar height and let
             the image render slightly taller than the body, which the
             frame's overflow:hidden then cropped at top + bottom.
             100% of the body is always exact regardless of titlebar
             height variation or scrollbar reservation. */
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0;
          transition: opacity 280ms ease-out;
          position: relative;
          z-index: 2;
        }
        /* When the parent has data-loaded=1 (set by img onLoad), fade
           the image in and hide the loader. Pre-load the loader covers
           the whole body so there's no flash of empty modal. */
        .thumb-preview-body[data-loaded="1"] img {
          opacity: 1;
        }
        .thumb-preview-body[data-loaded="1"] .thumb-preview-loader {
          opacity: 0;
          pointer-events: none;
        }
        /* ----- thumb preview loader ---------------------------------- */
        .thumb-preview-loader {
          position: absolute;
          inset: 12px;
          z-index: 1;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 30, 50, 0.4) 0%,
            #000 70%);
          overflow: hidden;
          border-radius: 4px;
          opacity: 1;
          transition: opacity 220ms ease-out;
        }
        /* Faint cyber grid backdrop. Pure CSS — no images. */
        .tpl-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0, 240, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
          animation: tplGrid 6s linear infinite;
        }
        @keyframes tplGrid {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(32px, 32px); }
        }
        /* Vertical scan bar that bounces top-to-bottom. */
        .tpl-scan {
          position: absolute;
          left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 240, 255, 0.5) 20%,
            rgba(0, 240, 255, 1) 50%,
            rgba(0, 240, 255, 0.5) 80%,
            transparent 100%);
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.7),
            0 0 32px rgba(0, 240, 255, 0.4);
          top: 0;
          animation: tplScan 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite alternate;
        }
        @keyframes tplScan {
          0%   { top: -3px; }
          100% { top: calc(100% - 3px); }
        }
        /* Pulsing rotating ring at center. Two rings rotating in
           opposite directions for a "scanning radar" feel. */
        .tpl-ring {
          position: absolute;
          left: 50%; top: 50%;
          width: 92px; height: 92px;
          margin-left: -46px; margin-top: -46px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: rgba(0, 240, 255, 0.95);
          border-right-color: rgba(0, 240, 255, 0.45);
          box-shadow:
            0 0 16px rgba(0, 240, 255, 0.5),
            inset 0 0 16px rgba(0, 240, 255, 0.18);
          animation: tplSpin 1.2s linear infinite;
        }
        .tpl-ring::before,
        .tpl-ring::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .tpl-ring::before {
          inset: 8px;
          border-bottom-color: rgba(0, 240, 255, 0.7);
          border-left-color:  rgba(0, 240, 255, 0.3);
          animation: tplSpin 0.9s linear reverse infinite;
        }
        .tpl-ring::after {
          inset: 18px;
          border-top-color:   rgba(0, 240, 255, 0.6);
          animation: tplPulse 1.4s ease-in-out infinite;
        }
        @keyframes tplSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes tplPulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%      { transform: scale(1.2); opacity: 1;   }
        }
        /* Cyber corner brackets at each corner. */
        .tpl-corner {
          position: absolute;
          width: 22px; height: 22px;
          border: 2px solid rgba(0, 240, 255, 0.85);
          box-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }
        .tpl-corner.tl { top: 8px;    left: 8px;    border-right: 0; border-bottom: 0; }
        .tpl-corner.tr { top: 8px;    right: 8px;   border-left: 0;  border-bottom: 0; }
        .tpl-corner.bl { bottom: 8px; left: 8px;    border-right: 0; border-top: 0;    }
        .tpl-corner.br { bottom: 8px; right: 8px;   border-left: 0;  border-top: 0;    }
        /* Status text + animated dots. Sits CLEAR of the ring (92px
           tall, so we offset by half-height + a comfortable 24px gap
           = 70px below the parent's 50% line). */
        .tpl-status {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, 70px);
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow:
            0 0 8px rgba(0, 240, 255, 0.7),
            0 0 16px rgba(0, 240, 255, 0.3);
          white-space: nowrap;
        }
        .tpl-dots {
          display: inline-flex;
          gap: 4px;
        }
        .tpl-dots i {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(0, 240, 255, 0.4);
          box-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
          animation: tplDot 1.2s ease-in-out infinite;
        }
        .tpl-dots i:nth-child(2) { animation-delay: 0.2s; }
        .tpl-dots i:nth-child(3) { animation-delay: 0.4s; }
        @keyframes tplDot {
          0%, 100% { opacity: 0.3; transform: scale(1);   }
          50%      { opacity: 1;   transform: scale(1.4); }
        }
        /* Error path. */
        .thumb-preview-body[data-error="1"] .thumb-preview-loader {
          background: radial-gradient(ellipse at center,
            rgba(80, 0, 0, 0.5) 0%, #000 70%);
        }
        .thumb-preview-body[data-error="1"] .tpl-status::after {
          content: ' — FAILED';
          color: #ff6464;
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
          grid-template-columns: repeat(auto-fill, minmax(${ce}px, 1fr));
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
          position: relative;
        }

        /* Bulk-select column + checkbox styling. */
        .vm-table th.select-col,
        .vm-table td.select-col {
          width: 32px;
          text-align: center;
          padding: 4px 6px;
        }
        .bulk-check {
          width: 14px; height: 14px;
          accent-color: var(--primary);
          cursor: pointer;
          margin: 0;
        }
        .vm-table tbody tr.multi-selected {
          background: rgba(0, 240, 255, 0.06);
        }
        .vm-table tbody tr.multi-selected:hover {
          background: rgba(0, 240, 255, 0.12);
        }

        /* Bulk action toolbar — pinned above the table when ≥1 row is
           checked. Same cyber-style as the matrix top toolbar. */
        .bulk-toolbar {
          position: sticky; top: 0; z-index: 11;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px;
          background: linear-gradient(180deg,
            rgba(0, 240, 255, 0.10),
            rgba(0, 240, 255, 0.04));
          border-bottom: 1px solid var(--primary);
          backdrop-filter: blur(6px);
          animation: bulkBarIn 0.2s ease-out;
        }
        @keyframes bulkBarIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bulk-count {
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
          text-shadow: 0 0 6px rgba(0, 240, 255, 0.5);
          margin-right: 8px;
        }
        .bulk-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          background: var(--bg-tertiary);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .bulk-btn:hover:not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.25);
        }
        .bulk-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .bulk-btn.danger:hover:not(:disabled) {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.3);
        }
        .bulk-btn.ghost {
          margin-left: auto;
          color: var(--text-secondary);
          border-color: var(--border);
        }
        .bulk-btn.ghost:hover:not(:disabled) {
          color: var(--text-primary);
          border-color: var(--text-secondary);
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

        /* Cyber sort animation. The old horizontal wiggle was too generic.
           New behaviour: rows are "scanned in" top→bottom — each row
           fades up + slides up by 6px with a stagger, while a cyan
           glow-bar travels down the table edge to mimic a CRT/holo
           re-render. The stagger uses nth-child up to 60 rows; rows
           past that just snap (extremely long lists wouldn't benefit
           from staggering anyway). */
        .vm-table tbody tr.sort-animating {
          animation: sortRowReveal 360ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        @keyframes sortRowReveal {
          0%   { opacity: 0; transform: translateY(6px); filter: blur(2px); }
          50%  { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        /* Stagger via nth-child — pure CSS, no per-row inline styles. */
        .vm-table tbody tr.sort-animating:nth-child(1)  { animation-delay:   0ms; }
        .vm-table tbody tr.sort-animating:nth-child(2)  { animation-delay:  18ms; }
        .vm-table tbody tr.sort-animating:nth-child(3)  { animation-delay:  36ms; }
        .vm-table tbody tr.sort-animating:nth-child(4)  { animation-delay:  54ms; }
        .vm-table tbody tr.sort-animating:nth-child(5)  { animation-delay:  72ms; }
        .vm-table tbody tr.sort-animating:nth-child(6)  { animation-delay:  90ms; }
        .vm-table tbody tr.sort-animating:nth-child(7)  { animation-delay: 108ms; }
        .vm-table tbody tr.sort-animating:nth-child(8)  { animation-delay: 126ms; }
        .vm-table tbody tr.sort-animating:nth-child(9)  { animation-delay: 144ms; }
        .vm-table tbody tr.sort-animating:nth-child(10) { animation-delay: 162ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+11) { animation-delay: 180ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+16) { animation-delay: 200ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+22) { animation-delay: 220ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+30) { animation-delay: 240ms; }
        .vm-table tbody tr.sort-animating:nth-child(n+40) { animation-delay: 260ms; }
        /* Glowing scan-bar that travels down the table during the sort.
           Anchored to .vm-table (positioned via the table's own bounding
           box). Triggered the same way as row animation: appears on
           tbody when any tr has .sort-animating. */
        .vm-table {
          position: relative;
        }
        .vm-table::before {
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
        .vm-table:has(tr.sort-animating)::before {
          animation: sortScanBar 480ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        @keyframes sortScanBar {
          0%   { opacity: 0; top: 0; }
          12%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { opacity: 0; top: 100%; }
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
        /* Thumb-refresh indicator pinned to the FAR right of the legend
           row (only visible in thumb mode). margin-left:auto pushes it
           past the centered legend items. */
        .legend-thumb-refresh {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--primary);
          opacity: 0.85;
          padding: 2px 10px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: var(--radius-sm);
          letter-spacing: 0.04em;
          cursor: help;
        }
        .legend-thumb-refresh svg {
          opacity: 0.7;
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
      `})]})}function Ys(e,t,n,a,s){const o=i=>{if(!i.tasks)return null;for(const c of Object.values(i.tasks))if(c.vmid===e&&c.node===t&&c.status==="running")return c;return null};if(s&&n){const i=s[n];if(i)return o(i)}else if(a)return o(a);return null}function mf(e){if(!e)return null;const t=e.task_type.toLowerCase();return t.includes("migrate")?{label:e.target_node?`→${e.target_node}`:"MIGRATE",color:"#00f0ff"}:t.includes("start")?{label:"START",color:"#00ff88"}:t.includes("stop")||t.includes("shutdown")?{label:"STOP",color:"#ff6b00"}:t.includes("backup")||t.includes("vzdump")?{label:"BACKUP",color:"#a855f7"}:t.includes("restore")?{label:"RESTORE",color:"#f59e0b"}:t.includes("snapshot")?{label:"SNAP",color:"#06b6d4"}:t.includes("clone")?{label:"CLONE",color:"#10b981"}:{label:"TASK",color:"#00f0ff"}}function Zg({vm:e,index:t,previousIndex:n,onClick:a,onContextMenu:s,isSelected:o,task:i}){var v;const c=e.memory.used_bytes/e.memory.total_bytes*100,l=((v=e.disk)==null?void 0:v.usage_percent)||0,d=ze(e.cpu.usage_percent),m=ze(c),g=ze(l),p=u.useRef(null),[x,b]=u.useState(n===void 0),k=mf(i||null);u.useEffect(()=>{if(x){const N=setTimeout(()=>b(!1),50);return()=>clearTimeout(N)}},[x]);const j=e.name.length>10?e.name.substring(0,9)+"…":e.name,h=Math.max(e.cpu.usage_percent,c,l)>95?"critical":"warning";return r.jsxs("div",{ref:p,className:`anomaly-item ${h} ${x?"entering":""} ${o?"selected":""} ${i?"has-task":""}`,style:{animationDelay:`${t*80}ms`,cursor:a?"pointer":"default"},title:`${e.name} (#${e.vmid})
CPU: ${ot(e.cpu.usage_percent,1)}
MEM: ${ot(c,1)}
DISK: ${ot(l,1)}${i?`
Task: ${i.task_type}`:""}`,onClick:a,onContextMenu:N=>s==null?void 0:s(N,e),children:[r.jsx("div",{className:"corner-bracket tl"}),r.jsx("div",{className:"corner-bracket tr"}),r.jsx("div",{className:"corner-bracket bl"}),r.jsx("div",{className:"corner-bracket br"}),r.jsxs("div",{className:"anomaly-header",children:[r.jsx("span",{className:`anomaly-indicator ${d}`}),r.jsx("span",{className:"anomaly-name",children:j}),r.jsxs("span",{className:"anomaly-vmid",children:["#",e.vmid]}),k&&r.jsx("span",{className:"anomaly-task-badge",style:{backgroundColor:`${k.color}30`,borderColor:k.color,color:k.color},children:k.label})]}),r.jsxs("div",{className:"anomaly-bars-row",children:[r.jsxs("div",{className:`metric-gauge ${d}`,children:[r.jsx("span",{className:"gauge-label",children:"C"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(e.cpu.usage_percent,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(e.cpu.usage_percent,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(e.cpu.usage_percent)})]}),r.jsxs("div",{className:`metric-gauge ${m}`,children:[r.jsx("span",{className:"gauge-label",children:"M"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(c,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(c,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(c)})]}),r.jsxs("div",{className:`metric-gauge ${g}`,children:[r.jsx("span",{className:"gauge-label",children:"D"}),r.jsxs("div",{className:"gauge-track",children:[r.jsx("div",{className:"gauge-segments"}),r.jsx("div",{className:"gauge-fill",style:{width:`${Math.max(l,3)}%`}}),r.jsx("div",{className:"gauge-glow",style:{left:`${Math.max(l,3)}%`}})]}),r.jsx("span",{className:"gauge-value",children:Math.round(l)})]})]})]})}function Yc(e){return e?{vmid:e.vm.vmid,name:e.vm.name,node:e.vm.node,type:e.vm.type}:null}function ex({sel:e,onClose:t}){const n=u.useMemo(()=>Yc(e),[e]);return r.jsx(df,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function tx({sel:e,onClose:t}){const n=u.useMemo(()=>Yc(e),[e]);return r.jsx(uf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function rx({sel:e,onClose:t}){const n=u.useMemo(()=>Yc(e),[e]);return r.jsx(cf,{open:e!==null,cluster_id:(e==null?void 0:e.clusterId)||"",vm:n,onClose:t})}function nx({cluster:e,clusters:t,isPaused:n=!1}){var ae;const{t:a}=Le(),s=u.useRef(null),o=u.useRef(null),[i,c]=u.useState(0),[l,d]=u.useState(null),[m,g]=u.useState(new Map),[p,x]=u.useState(new Map),[b,k]=u.useState("grid"),[j,f]=u.useState(0);u.useEffect(()=>{const T=setTimeout(()=>k("line"),600),C=setTimeout(()=>k("flip"),1100),J=setTimeout(()=>k("done"),3300);return()=>{clearTimeout(T),clearTimeout(C),clearTimeout(J)}},[]),u.useEffect(()=>{if(b==="grid"){f(0);return}const T=b==="line"?1500:1200;let C,J=null;const oe=j,be=W=>{J===null&&(J=W);const le=W-J,he=Math.min(le/T,1),ue=1-Math.pow(1-he,3),we=oe+(1-oe)*ue;f(we),he<1&&(C=requestAnimationFrame(be))};return C=requestAnimationFrame(be),()=>cancelAnimationFrame(C)},[b]);const h=!e&&t&&Object.keys(t).length>0,v=u.useMemo(()=>{if(!e&&!h)return[];const T=[];return h?Object.values(t).forEach(C=>{Object.values(C.vms).forEach(J=>{J.status==="running"&&!J.template&&T.push(J)})}):e&&Object.values(e.vms).forEach(C=>{C.status==="running"&&!C.template&&T.push(C)}),T},[e,t,h]),N=u.useMemo(()=>v.map((T,C)=>{var Ae;const J=C/v.length*Math.PI*2,oe=T.cpu.usage_percent,be=T.memory.total_bytes>0?T.memory.used_bytes/T.memory.total_bytes*100:0,W=((Ae=T.disk)==null?void 0:Ae.usage_percent)||0,le=Math.max(oe,be,W),he=.2+le/100*.6,ue=ze(le),we=Ys(T.vmid,T.node,T.cluster_id,e,t);return{vm:T,angle:J,distance:he,color:ue,task:we}}),[v,e,t]),w=u.useMemo(()=>{if(!e&&!h)return[];const T=[];return h?Object.values(t).forEach(J=>{Object.values(J.vms).forEach(oe=>T.push(oe))}):e&&Object.values(e.vms).forEach(J=>T.push(J)),T.filter(J=>{if(J.status!=="running"||J.template)return!1;const oe=J.memory.used_bytes/J.memory.total_bytes*100,be=J.disk.total_bytes>0?J.disk.used_bytes/J.disk.total_bytes*100:0;return J.cpu.usage_percent>80||oe>85||be>85}).sort((J,oe)=>{const be=J.memory.used_bytes/J.memory.total_bytes*100,W=oe.memory.used_bytes/oe.memory.total_bytes*100,le=J.disk.total_bytes>0?J.disk.used_bytes/J.disk.total_bytes*100:0,he=oe.disk.total_bytes>0?oe.disk.used_bytes/oe.disk.total_bytes*100:0,ue=Math.max(J.cpu.usage_percent,be,le);return Math.max(oe.cpu.usage_percent,W,he)-ue})},[e,t,h]);u.useEffect(()=>{const T=new Map;w.forEach((C,J)=>{T.set(`${C.cluster_id}/${C.node}/${C.vmid}`,J)}),g(T)},[w]);const _=u.useCallback(T=>{const C=s.current;if(!C)return;const J=C.getBoundingClientRect(),oe=C.width/J.width,be=C.height/J.height,W=(T.clientX-J.left)*oe,le=(T.clientY-J.top)*be,he=Math.min(C.width,C.height),ue=C.width/2,we=C.height/2,Ae=he*.4;let Ge=null;for(const Ve of N){const Ne=ue+Math.cos(Ve.angle)*Ae*Ve.distance,ge=we+Math.sin(Ve.angle)*Ae*Ve.distance,ke=Math.sqrt((W-Ne)**2+(le-ge)**2),Oe=15*Math.max(oe,be);if(ke<Oe){Ge={vm:Ve.vm,x:T.clientX,y:T.clientY,pointX:Ne,pointY:ge};break}}d(Ge)},[N]),z=u.useCallback(()=>{d(null)},[]),$=u.useCallback(T=>{const C=s.current;if(!C)return;const J=N.find(we=>we.vm.node===T.node&&we.vm.vmid===T.vmid);if(!J)return;const oe=Math.min(C.width,C.height),be=C.width/2,W=C.height/2,le=oe*.4,he=be+Math.cos(J.angle)*le*J.distance,ue=W+Math.sin(J.angle)*le*J.distance;d({vm:J.vm,x:he,y:ue,pointX:he,pointY:ue})},[N]),P=Gr(),I=((ae=js().user)==null?void 0:ae.role_global)??null,[A,re]=u.useState({visible:!1,x:0,y:0,vm:null,clusterId:""}),U=u.useCallback(()=>re(T=>({...T,visible:!1})),[]),R=u.useCallback((T,C)=>{T.preventDefault(),T.stopPropagation();const J=C.cluster_id||(e==null?void 0:e.id)||"";re({visible:!0,x:T.clientX,y:T.clientY,vm:C,clusterId:J})},[e]),G=u.useCallback((T,C)=>{var oe;const J=(t==null?void 0:t[T])||((e==null?void 0:e.id)===T?e:null);return((oe=J==null?void 0:J.client_health)==null?void 0:oe[C])||null},[e,t]),L=u.useCallback(async T=>{const{vm:C,action:J,clusterId:oe}=T,be=C.type==="lxc";if(!((J==="stop"||J==="shutdown"||J==="reboot")&&!await P.confirm(`${J.toUpperCase()} ${C.name} (#${C.vmid})?`,{title:"Confirm",destructive:!0})))try{const le=be?await Be.ctAction(oe,C.node,C.vmid,J):await Be.vmAction(oe,C.node,C.vmid,J);console.info(`[radar] ${J} ${be?"ct":"vm"}/${C.vmid} → upid=${le.upid}`)}catch(le){const he=le instanceof Error?le.message:String(le);he.includes("vm_control_disabled")?await P.alert(`VM control is disabled on this server.
Set vm_control.enabled: true in config.yaml and restart the service.`):await P.alert(`${J} failed: ${he.slice(0,200)}`)}},[P]),[V,B]=u.useState(null),[K,Q]=u.useState(null),[S,Se]=u.useState(null),[te,Me]=u.useState(null),[X,me]=u.useState("disabled");u.useEffect(()=>{Be.getConfig().then(T=>{var C;return me(((C=T.console)==null?void 0:C.mode)||"disabled")}).catch(()=>me("disabled"))},[]);const Ce=u.useCallback((T,C,J,oe)=>{const be=typeof localStorage<"u"&&localStorage.getItem("language")||"",W=C.type==="lxc",he=`${W?"/console-term":"/console"}/${encodeURIComponent(T)}/${encodeURIComponent(C.node)}/${C.vmid}?ct=${encodeURIComponent(J)}`+(C.name?`&name=${encodeURIComponent(C.name)}`:"")+(be?`&lang=${encodeURIComponent(be)}`:"")+(!W&&oe?`#vp=${encodeURIComponent(oe)}`:"");window.open(he,"_blank","noopener,noreferrer")},[]),Z=u.useCallback(async()=>{if(!A.vm)return;const T=A.vm,C=A.clusterId;if(X==="disabled"){await P.alert(a("console.disabled"));return}if(X==="prompt"){Me({vm:T,clusterId:C});return}try{const J=await Be.consolePrepare({cluster_id:C,node:T.node,vmid:T.vmid});Ce(C,T,J.console_token,J.vnc_password)}catch(J){const oe=J instanceof Error?J.message:String(J);await P.alert(a("console.prepare_failed",{err:oe}))}},[A,X,P,a,Ce]);return u.useEffect(()=>{if(n||b!=="done")return;const T=setInterval(()=>{c(C=>(C+2)%360)},50);return()=>clearInterval(T)},[n,b]),u.useEffect(()=>{const T=s.current;if(!T)return;const C=T.getContext("2d");if(!C)return;const J=Math.min(T.width,T.height),oe=T.width/2,be=T.height/2,W=J*.4;C.clearRect(0,0,T.width,T.height),C.strokeStyle="rgba(0, 240, 255, 0.12)",C.lineWidth=.8;const le=20;for(let ge=oe%le;ge<T.width;ge+=le)C.beginPath(),C.moveTo(ge,0),C.lineTo(ge,T.height),C.stroke();for(let ge=be%le;ge<T.height;ge+=le)C.beginPath(),C.moveTo(0,ge),C.lineTo(T.width,ge),C.stroke();if(b!=="flip"&&b!=="done")return;C.globalAlpha=j,C.strokeStyle="rgba(0, 240, 255, 0.25)",C.lineWidth=1.5,C.font='13px "Share Tech Mono", monospace',C.fillStyle="rgba(0, 240, 255, 0.6)",C.textAlign="left";const he=["25%","50%","75%","100%"];for(let ge=1;ge<=4;ge++){const ke=W*(ge/4);C.beginPath(),C.arc(oe,be,ke,0,Math.PI*2),C.stroke();const Oe=oe+ke+4,Y=be+4;C.fillText(he[ge-1],Oe,Y)}C.fillStyle="rgba(0, 255, 136, 0.8)",C.textAlign="center",C.font='14px "Share Tech Mono", monospace',C.fillText("0%",oe,be-8),C.font='11px "Share Tech Mono", monospace',C.fillText("LOW",oe,be+8),C.fillStyle="rgba(0, 240, 255, 0.5)",C.textAlign="left",C.font='10px "Share Tech Mono", monospace',C.beginPath(),C.moveTo(oe-W,be),C.lineTo(oe+W,be),C.moveTo(oe,be-W),C.lineTo(oe,be+W),C.stroke();const ue=i*Math.PI/180;for(let ge=0;ge<8;ge++){const ke=.12*(ge+1),Oe=.15-ge*.015;C.fillStyle=`rgba(0, 240, 255, ${Oe})`,C.beginPath(),C.moveTo(oe,be),C.arc(oe,be,W,ue-ke,ue-ke+.12),C.closePath(),C.fill()}C.save(),C.shadowBlur=20,C.shadowColor="#00f0ff";const we=C.createLinearGradient(oe,be,oe+Math.cos(ue)*W,be+Math.sin(ue)*W);we.addColorStop(0,"rgba(0, 255, 200, 1)"),we.addColorStop(.3,"rgba(0, 240, 255, 0.9)"),we.addColorStop(1,"rgba(0, 240, 255, 0)"),C.strokeStyle=we,C.lineWidth=3,C.beginPath(),C.moveTo(oe,be),C.lineTo(oe+Math.cos(ue)*W,be+Math.sin(ue)*W),C.stroke(),C.lineWidth=1.5,we.addColorStop(0,"rgba(255, 255, 255, 1)"),C.stroke(),C.restore();const Ae=oe+Math.cos(ue)*W*.95,Ge=be+Math.sin(ue)*W*.95,Ve=C.createRadialGradient(Ae,Ge,0,Ae,Ge,15);Ve.addColorStop(0,"rgba(0, 255, 200, 0.8)"),Ve.addColorStop(1,"rgba(0, 240, 255, 0)"),C.fillStyle=Ve,C.beginPath(),C.arc(Ae,Ge,15,0,Math.PI*2),C.fill();const Ne=[];N.forEach(ge=>{const ke=`${ge.vm.cluster_id}/${ge.vm.node}/${ge.vm.vmid}`,Oe=(ge.angle*180/Math.PI+360)%360;(i-Oe+360)%360<=5&&Ne.push({key:ke,point:{vm:ge.vm,angle:ge.angle,distance:ge.distance,color:ge.color,lastScanAngle:i}})}),Ne.length>0&&x(ge=>{const ke=new Map(ge);Ne.forEach(({key:Y,point:se})=>{ke.set(Y,se)});const Oe=new Set(N.map(Y=>`${Y.vm.cluster_id}/${Y.vm.node}/${Y.vm.vmid}`));for(const Y of ke.keys())Oe.has(Y)||ke.delete(Y);return ke}),N.forEach(ge=>{var Ze,wt;const ke=oe+Math.cos(ge.angle)*W*ge.distance,Oe=be+Math.sin(ge.angle)*W*ge.distance,Y=(ge.angle*180/Math.PI+360)%360,se=(i-Y+360)%360;let ce;se<20?ce=1:se<60?ce=1-(se-20)/40*.4:ce=.6-(se-60)/300*.45;let je="#00ff88";ge.color==="warning"&&(je="#ff6b00"),ge.color==="danger"&&(je="#ff0040");const ye=!!ge.task,Ee=(wt=(Ze=ge.task)==null?void 0:Ze.task_type)==null?void 0:wt.includes("migrate");if(ye){const pe=Ee?"#00f0ff":"#a855f7",He=Date.now()/500%1;if(C.beginPath(),C.arc(ke,Oe,12+He*8,0,Math.PI*2),C.strokeStyle=pe,C.lineWidth=1.5,C.globalAlpha=(1-He)*.6*j,C.stroke(),C.beginPath(),C.arc(ke,Oe,10,0,Math.PI*2),C.strokeStyle=pe,C.lineWidth=1,C.globalAlpha=.8*j,C.stroke(),Ee){const Fe=Date.now()/200%(Math.PI*2);C.beginPath(),C.arc(ke,Oe,15,Fe,Fe+Math.PI/2),C.strokeStyle=pe,C.lineWidth=2,C.globalAlpha=.9*j,C.stroke();for(let qe=0;qe<3;qe++){const $e=Fe+qe*Math.PI*2/3,Qt=8+(Date.now()/100+qe*50)%100/100*10,_t=ke+Math.cos($e)*Qt,Bt=Oe+Math.sin($e)*Qt;C.beginPath(),C.arc(_t,Bt,1.5,0,Math.PI*2),C.fillStyle=pe,C.globalAlpha=(.8-(Date.now()/100+qe*50)%100/100*.6)*j,C.fill()}}C.globalAlpha=j}C.beginPath(),C.arc(ke,Oe,4+ge.vm.cpu.usage_percent/100*4,0,Math.PI*2),C.fillStyle=je,C.globalAlpha=ce*j,C.fill(),C.shadowBlur=10,C.shadowColor=je,C.fill(),C.shadowBlur=0,C.globalAlpha=j}),C.beginPath(),C.arc(oe,be,6,0,Math.PI*2),C.fillStyle="#00f0ff",C.fill()},[i,N,b,j]),u.useEffect(()=>{const T=s.current;if(!T)return;const C=()=>{const J=T.parentElement;J&&(T.width=J.clientWidth,T.height=J.clientHeight)};return C(),window.addEventListener("resize",C),()=>window.removeEventListener("resize",C)},[]),!e&&!h?r.jsx("div",{className:"radar-scan empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]})}):r.jsxs("div",{className:"radar-scan",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"radar-header",children:r.jsxs("h1",{className:"radar-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 12l7 7",strokeLinecap:"round"})]}),a("nav.radar_scan").toUpperCase()]})}),r.jsxs("div",{className:"radar-layout",children:[r.jsxs("div",{className:`radar-container ${b!=="done"?"entering":""} ${b==="grid"?"grid-phase":""}`,ref:o,style:{position:"relative"},children:[(b==="line"||b==="flip")&&r.jsxs("div",{className:`radar-entry-overlay ${b}`,children:[r.jsx("div",{className:"entry-line"}),r.jsx("div",{className:"entry-circle"}),r.jsx("div",{className:"entry-glow"})]}),r.jsx("canvas",{ref:s,className:"radar-canvas",onMouseMove:_,onMouseLeave:z,style:{position:"absolute",top:0,left:0,cursor:l?"pointer":"default"}}),r.jsx("div",{className:"radar-overlay",style:{opacity:j},children:r.jsxs("div",{className:"scan-indicator",children:["SCANNING... ",i.toFixed(0),"°"]})}),l&&(()=>{var Pr,wn,at;const T=s.current;if(!T)return null;const C=T.width,J=T.height,oe=T.getBoundingClientRect(),be=oe.width,W=oe.height,le=be/C,he=W/J,ue=l.pointX*le,we=l.pointY*he,Ae=be,Ge=W,Ve=180,ge=Ys(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t)?175:145,ke=Ve/2,Oe=ge/2,Y=50,se=120,ce=Ae/2,je=Ge/2,ye=ue-ce,Ee=we-je,Ze=Math.sqrt(ye*ye+Ee*Ee)||1,wt=ye/Ze,pe=Ee/Ze,He=(_e,Te)=>{const Xe=_e-ke,it=_e+ke,ft=Te-Oe,Et=Te+Oe;if(ue>=Xe&&ue<=it&&we>=ft&&we<=Et)return-1;const lt=Math.max(Xe,Math.min(it,ue)),et=Math.max(ft,Math.min(Et,we));return Math.sqrt((ue-lt)**2+(we-et)**2)},Fe=20,qe=(_e,Te)=>({x:Math.max(ke+Fe,Math.min(Ae-ke-Fe,_e)),y:Math.max(Oe+Fe,Math.min(Ge-Oe-Fe,Te))}),Qt=[...[{dx:.707,dy:-.707,name:"45° (top-right)"},{dx:-.707,dy:-.707,name:"135° (top-left)"},{dx:-.707,dy:.707,name:"225° (bottom-left)"},{dx:.707,dy:.707,name:"315° (bottom-right)"}]].sort((_e,Te)=>{const Xe=_e.dx*wt+_e.dy*pe;return Te.dx*wt+Te.dy*pe-Xe});let _t={x:ue+wt*se,y:we+pe*se},Bt=!1;for(const _e of Qt){const Te={x:ue+_e.dx*se,y:we+_e.dy*se},Xe=qe(Te.x,Te.y),it=Xe.x-ue,ft=Xe.y-we,lt=Math.sqrt(it*it+ft*ft)>30&&Math.abs(Math.abs(it)-Math.abs(ft))<20,et=He(Xe.x,Xe.y);if(lt&&et>=Y){_t=Xe,Bt=!0;break}}if(!Bt)for(const _e of Qt){const Te={x:ue+_e.dx*(se+60),y:we+_e.dy*(se+60)},Xe=qe(Te.x,Te.y),it=Xe.x-ue,ft=Xe.y-we,lt=Math.sqrt(it*it+ft*ft)>30&&Math.abs(Math.abs(it)-Math.abs(ft))<20,et=He(Xe.x,Xe.y);if(lt&&et>=Y){_t=Xe,Bt=!0;break}}if(!Bt){const _e=Qt[0],Te=_e.dx>0?(Ae-ke-10-ue)/_e.dx:(ke+10-ue)/_e.dx,Xe=_e.dy>0?(Ge-Oe-10-we)/_e.dy:(Oe+10-we)/_e.dy,it=Math.min(Math.abs(Te),Math.abs(Xe),se),ft=Math.max(Y+20,it);_t={x:ue+_e.dx*ft,y:we+_e.dy*ft}}const Jt=20,wr=Math.max(ke+Jt,Math.min(Ae-ke-Jt,_t.x)),H=Math.max(Oe+Jt,Math.min(Ge-Oe-Jt,_t.y)),Qe=ue,nt=we,pt=20,vt=28,gt=5,bt=-Math.PI/2,Xr=wr-ke,bn=H-Oe,Wt=wr,Tr=H,Kr=l.vm.memory.total_bytes>0?l.vm.memory.used_bytes/l.vm.memory.total_bytes*100:0,kr=((Pr=l.vm.disk)==null?void 0:Pr.usage_percent)||0,yn=Math.max(l.vm.cpu.usage_percent,Kr,kr),qr=ze(yn),mt={success:"#00ff88",warning:"#ff6b00",danger:"#ff0040"}[qr]||"#00f0ff";return Ae<=0||Ge<=0?null:r.jsxs(r.Fragment,{children:[(()=>{const _e=Math.sqrt((Wt-Qe)**2+(Tr-nt)**2),Te=Math.atan2(Tr-nt,Wt-Qe)*180/Math.PI;return r.jsx("div",{className:"tooltip-connection-line",style:{position:"absolute",left:Qe,top:nt,width:_e,height:2,background:`linear-gradient(90deg, ${mt}, ${mt}80)`,transformOrigin:"0 50%",transform:`rotate(${Te}deg)`,boxShadow:`0 0 8px ${mt}, 0 0 16px ${mt}60`,pointerEvents:"none",zIndex:99}})})(),r.jsxs("svg",{className:"target-frame-svg",style:{position:"absolute",left:Qe-vt-5,top:nt-vt-5,width:(vt+5)*2,height:(vt+5)*2,pointerEvents:"none",zIndex:100,overflow:"visible"},children:[r.jsx("defs",{children:r.jsxs("filter",{id:"frameGlow",children:[r.jsx("feGaussianBlur",{stdDeviation:"2",result:"coloredBlur"}),r.jsxs("feMerge",{children:[r.jsx("feMergeNode",{in:"coloredBlur"}),r.jsx("feMergeNode",{in:"SourceGraphic"})]})]})}),(()=>{const _e=vt+5,Te=vt+5,Xe=[];for(let lt=0;lt<gt;lt++){const et=bt+lt*2*Math.PI/gt;Xe.push(`${_e+pt*Math.cos(et)},${Te+pt*Math.sin(et)}`)}const it=Xe.join(" "),ft=[];for(let lt=0;lt<gt;lt++){const et=bt+lt*2*Math.PI/gt;ft.push(`${_e+vt*Math.cos(et)},${Te+vt*Math.sin(et)}`)}const Et=ft.join(" ");return r.jsxs(r.Fragment,{children:[r.jsx("polygon",{points:Et,fill:"none",stroke:mt,strokeWidth:"1",strokeDasharray:"8 4",className:"target-frame-outer",style:{transformOrigin:`${_e}px ${Te}px`}}),r.jsx("polygon",{points:it,fill:"none",stroke:mt,strokeWidth:"1.5",className:"target-frame",filter:"url(#frameGlow)"}),[0,1,2,3,4].map(lt=>{const et=bt+lt*2*Math.PI/gt,Lt=_e+pt*Math.cos(et),Rr=Te+pt*Math.sin(et),kt=6,jr=bt+(lt-1+gt)%gt*2*Math.PI/gt,kn=bt+(lt+1)%gt*2*Math.PI/gt,Wn=Lt+kt*Math.cos(jr+Math.PI),jn=Rr+kt*Math.sin(jr+Math.PI),y=Lt+kt*Math.cos(kn+Math.PI),F=Rr+kt*Math.sin(kn+Math.PI);return r.jsxs("g",{children:[r.jsx("line",{x1:Lt,y1:Rr,x2:Wn,y2:jn,stroke:mt,strokeWidth:"2"}),r.jsx("line",{x1:Lt,y1:Rr,x2:y,y2:F,stroke:mt,strokeWidth:"2"})]},lt)}),r.jsx("line",{x1:_e-5,y1:Te,x2:_e+5,y2:Te,stroke:mt,strokeWidth:"1"}),r.jsx("line",{x1:_e,y1:Te-5,x2:_e,y2:Te+5,stroke:mt,strokeWidth:"1"})]})})()]}),r.jsxs("div",{className:`radar-tooltip tooltip-${qr}`,style:{position:"absolute",left:Xr,top:bn,width:Ve,height:ge,borderColor:mt,boxShadow:`0 0 15px ${mt}40, 0 0 30px ${mt}20`,pointerEvents:"none",zIndex:101,transform:"none"},children:[r.jsx("div",{className:"tooltip-corner tl",style:{borderColor:mt}}),r.jsx("div",{className:"tooltip-corner tr",style:{borderColor:mt}}),r.jsx("div",{className:"tooltip-corner bl",style:{borderColor:mt}}),r.jsx("div",{className:"tooltip-corner br",style:{borderColor:mt}}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:l.vm.name}),r.jsxs("span",{className:"tooltip-id",children:["#",l.vm.vmid]})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"NODE"}),r.jsx("span",{className:"tooltip-value",children:l.vm.node})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"CPU"}),r.jsx("span",{className:`tooltip-value text-${ze(l.vm.cpu.usage_percent)}`,children:ot(l.vm.cpu.usage_percent,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"MEMORY"}),r.jsx("span",{className:`tooltip-value text-${ze(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100)}`,children:ot(l.vm.memory.used_bytes/l.vm.memory.total_bytes*100,1)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsx("span",{className:"tooltip-label",children:"DISKIO"}),r.jsx("span",{className:`tooltip-value text-${ze(((wn=l.vm.disk)==null?void 0:wn.usage_percent)||0)}`,children:ot(((at=l.vm.disk)==null?void 0:at.usage_percent)||0,1)})]}),(()=>{const _e=Ys(l.vm.vmid,l.vm.node,l.vm.cluster_id,e,t),Te=mf(_e);return Te?r.jsxs("div",{className:"tooltip-row tooltip-task-row",style:{borderTop:`1px solid ${Te.color}40`,marginTop:4,paddingTop:4},children:[r.jsx("span",{className:"tooltip-label",children:"TASK"}),r.jsx("span",{className:"tooltip-value",style:{color:Te.color},children:Te.label})]}):null})(),r.jsx("div",{className:"tooltip-scanline"})]})]})})(),r.jsxs("div",{className:"radar-legend",style:{opacity:j},children:[r.jsx("span",{className:"legend-dot",style:{background:"#00ff88"}}),r.jsx("span",{children:"<80%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff6b00"}}),r.jsx("span",{children:"80-95%"}),r.jsx("span",{className:"legend-dot",style:{background:"#ff0040"}}),r.jsx("span",{children:">95%"}),r.jsx("span",{className:"legend-note",children:"(max CPU/MEM/DISK)"})]})]}),r.jsxs("div",{className:"anomaly-panel panel panel-scan",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("h2",{className:"panel-title font-display",children:a("radar.anomalies")}),r.jsx("span",{className:"anomaly-count",children:w.length})]}),r.jsx("div",{className:"anomaly-list",children:w.length===0?r.jsxs("div",{className:"no-anomalies",children:[r.jsx("span",{className:"status-indicator"}),r.jsx("span",{children:a("radar.all_normal")})]}):w.map((T,C)=>{const J=`${T.cluster_id}/${T.node}/${T.vmid}`,oe=m.get(J),be=(l==null?void 0:l.vm.node)===T.node&&(l==null?void 0:l.vm.vmid)===T.vmid&&(l==null?void 0:l.vm.cluster_id)===T.cluster_id,W=Ys(T.vmid,T.node,T.cluster_id,e,t);return r.jsx(Zg,{vm:T,index:C,previousIndex:oe,onClick:()=>$(T),onContextMenu:R,isSelected:be,task:W},J)})})]})]}),r.jsx(lf,{state:A,onClose:U,onShowDetails:()=>{A.vm&&$(A.vm)},onPowerAction:L,onOpenConsole:Z,onOpenSnapshots:()=>{A.vm&&B({vm:A.vm,clusterId:A.clusterId})},onBackupNow:()=>{A.vm&&Q({vm:A.vm,clusterId:A.clusterId})},onRemoteMigrate:()=>{A.vm&&Se({vm:A.vm,clusterId:A.clusterId})},getNodeHealth:G,userRole:I,consoleMode:X,consolePasswordSet:!1}),r.jsx(ex,{sel:V,onClose:()=>B(null)}),r.jsx(tx,{sel:K,onClose:()=>Q(null)}),r.jsx(rx,{sel:S,onClose:()=>Se(null)}),r.jsx(pf,{open:te!==null,cluster_id:(te==null?void 0:te.clusterId)||"",pveUser:"root@pam",onCancel:()=>Me(null),onSubmit:async T=>{if(!te)return;const{vm:C,clusterId:J}=te,oe=await Be.consolePrepare({cluster_id:J,node:C.node,vmid:C.vmid,password:T});Ce(J,C,oe.console_token,oe.vnc_password),Me(null)}}),r.jsx("style",{children:`
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

      `})]})}function ax({value:e,duration:t=800,suffix:n=""}){const[a,s]=u.useState(0),o=u.useRef(0),i=u.useRef(0);return u.useEffect(()=>{o.current=a;const c=performance.now(),l=d=>{const m=d-c,g=Math.min(m/t,1),p=1-Math.pow(1-g,3);s(o.current+(e-o.current)*p),g<1&&(i.current=requestAnimationFrame(l))};return i.current=requestAnimationFrame(l),()=>cancelAnimationFrame(i.current)},[e,t]),r.jsxs(r.Fragment,{children:[a.toFixed(0),n]})}function Lo({value:e,duration:t=800}){const[n,a]=u.useState(0),s=u.useRef(0),o=u.useRef(0);return u.useEffect(()=>{s.current=n;const i=performance.now(),c=l=>{const d=l-i,m=Math.min(d/t,1),g=1-Math.pow(1-m,3);a(s.current+(e-s.current)*g),m<1&&(o.current=requestAnimationFrame(c))};return o.current=requestAnimationFrame(c),()=>cancelAnimationFrame(o.current)},[e,t]),r.jsx(r.Fragment,{children:Re(n)})}function sx({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"ceph-core visible",children:[r.jsxs("svg",{viewBox:"0 0 200 200",className:"core-svg",children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"scanGradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:t,stopOpacity:"0"}),r.jsx("stop",{offset:"50%",stopColor:t,stopOpacity:"0.6"}),r.jsx("stop",{offset:"100%",stopColor:t,stopOpacity:"0"})]})}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"100",cy:"100",r:"95",fill:"none",stroke:t,strokeWidth:"3",strokeDasharray:"30 15",strokeLinecap:"round",className:"rotating-ring",style:{filter:`drop-shadow(0 0 8px ${t})`}}),r.jsx("line",{x1:"100",y1:"5",x2:"100",y2:"50",stroke:"url(#scanGradient)",strokeWidth:"2",className:"scan-line"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"8"}),r.jsx("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:a,strokeWidth:"8",strokeDasharray:`${n*5.02} 502`,strokeLinecap:"round",transform:"rotate(-90 100 100)",className:"storage-ring",style:{filter:`drop-shadow(0 0 6px ${a})`}}),r.jsx("circle",{cx:"100",cy:"100",r:"55",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"2",className:"pulse-core"}),r.jsx("circle",{cx:"100",cy:"100",r:"45",fill:"none",stroke:"rgba(0, 240, 255, 0.2)",strokeWidth:"1",strokeDasharray:"4 4",className:"inner-dots"}),r.jsx("circle",{r:"3",fill:t,className:"data-particle p1",children:r.jsx("animateMotion",{dur:"2s",repeatCount:"indefinite",path:"M100,5 A95,95 0 0,1 195,100"})}),r.jsx("circle",{r:"2",fill:t,className:"data-particle p2",children:r.jsx("animateMotion",{dur:"2.5s",repeatCount:"indefinite",path:"M195,100 A95,95 0 0,1 100,195",begin:"0.5s"})}),r.jsx("circle",{r:"2.5",fill:t,className:"data-particle p3",children:r.jsx("animateMotion",{dur:"3s",repeatCount:"indefinite",path:"M100,195 A95,95 0 0,1 5,100",begin:"1s"})}),r.jsx("text",{x:"100",y:"90",textAnchor:"middle",fill:t,className:"health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"100",y:"115",textAnchor:"middle",fill:"var(--text-secondary)",className:"storage-text",children:r.jsx(ax,{value:n,duration:1500,suffix:"%"})})]}),r.jsx("div",{className:"pulse-ring ring-1",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-2",style:{borderColor:t}}),r.jsx("div",{className:"pulse-ring ring-3",style:{borderColor:t}})]})}function ox({mons:e,mgrs:t,mds:n}){const{t:a}=Le();return r.jsxs("div",{className:"daemon-orbital",children:[r.jsx("div",{className:"orbital-title",children:a("ceph.cluster_daemons")}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mon",children:"MON"}),r.jsx("span",{className:"daemon-count",children:e.length})]}),r.jsx("div",{className:"daemon-nodes",children:e.map(s=>r.jsxs("div",{className:`daemon-node mon ${s.state}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="leader"?"L":"P"}),s.state==="leader"&&r.jsx("div",{className:"leader-glow"})]},s.name))})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mgr",children:"MGR"}),r.jsx("span",{className:"daemon-count",children:t.length})]}),r.jsx("div",{className:"daemon-nodes",children:t.map(s=>r.jsxs("div",{className:`daemon-node mgr ${s.active?"active":"standby"}`,title:`${s.name} - ${s.host}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.active?"A":"S"}),s.active&&r.jsx("div",{className:"active-glow"})]},s.name))})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsxs("div",{className:"daemon-label",children:[r.jsx("span",{className:"daemon-type mds",children:"MDS"}),r.jsx("span",{className:"daemon-count",children:n.length})]}),r.jsx("div",{className:"daemon-nodes",children:n.map(s=>r.jsxs("div",{className:`daemon-node mds ${s.state}`,title:`${s.name} rank:${s.rank}`,children:[r.jsx("span",{className:"node-name",children:s.name}),r.jsx("span",{className:"node-state",children:s.state==="active"?"A":"S"}),s.state==="active"&&r.jsx("div",{className:"mds-glow"})]},s.name))})]})]})}function ix({osds:e,onSelect:t}){const{t:n}=Le(),a=u.useMemo(()=>{const o={};return e.forEach(i=>{const c=i.host||"unknown";o[c]||(o[c]=[]),o[c].push(i)}),Object.entries(o).sort(([i],[c])=>i.localeCompare(c,void 0,{numeric:!0,sensitivity:"base"}))},[e]),s=e.filter(o=>o.status==="up").length;return r.jsxs("div",{className:"osd-grid-panel",children:[r.jsxs("div",{className:"panel-header",children:[r.jsx("span",{className:"panel-title",children:n("ceph.osd_array")}),r.jsxs("span",{className:`osd-status ${s===e.length?"all-up":""}`,children:[s,"/",e.length," UP"]})]}),r.jsx("div",{className:"osd-hosts",children:(()=>{let o=0;return a.map(([i,c])=>r.jsxs("div",{className:"osd-host-group",children:[r.jsx("div",{className:"host-label",children:i}),r.jsx("div",{className:"osd-hexgrid",children:c.sort((l,d)=>l.id-d.id).map(l=>{const d=l.total_bytes>0?l.used_bytes/l.total_bytes*100:0,m=l.status!=="up"||ze(d)==="danger"?"#ff0040":ze(d)==="warning"?"#ff6b00":"#00ff88",g=o*30;return o++,r.jsx("div",{className:`osd-hex ${l.status==="up"?"up":"down"}`,style:{"--osd-color":m,animationDelay:`${g}ms`},onClick:()=>t(l),title:`OSD.${l.id} - ${ot(d,0)}`,children:r.jsx("span",{className:"osd-id",children:l.id})},l.id)})})]},i))})()})]})}function lx({readBps:e,writeBps:t,readOps:n,writeOps:a,isPaused:s=!1}){const o=u.useRef(null),i=u.useRef({read:[],write:[],targetRead:0,targetWrite:0,currentRead:0,currentWrite:0}),c=u.useRef(0),l=u.useRef(0),d=100,m=g=>g===0?"0":g>=1073741824?`${(g/1073741824).toFixed(1)}G`:g>=1048576?`${(g/1048576).toFixed(1)}M`:g>=1024?`${(g/1024).toFixed(0)}K`:`${g.toFixed(0)}`;return u.useEffect(()=>{i.current.targetRead=e,i.current.targetWrite=t},[e,t]),u.useEffect(()=>{const g=o.current;if(!g)return;const p=g.getContext("2d");if(!p)return;const x=window.devicePixelRatio||1,b=()=>{const z=g.getBoundingClientRect();return g.width=z.width*x,g.height=z.height*x,p.setTransform(x,0,0,x,0,0),{width:z.width,height:z.height}};let{width:k,height:j}=b();const f=42,h=k-f;let v=0;const N=50;let w=0;const _=z=>{const $=z-v;v=z,w+=$;const P=.1;i.current.currentRead+=(i.current.targetRead-i.current.currentRead)*P,i.current.currentWrite+=(i.current.targetWrite-i.current.currentWrite)*P,w>=N&&(w=0,i.current.read.push(i.current.currentRead),i.current.write.push(i.current.currentWrite),i.current.read.length>d&&i.current.read.shift(),i.current.write.length>d&&i.current.write.shift()),l.current=(l.current+.5)%20,p.clearRect(0,0,k,j);const D=Math.max(...i.current.read,...i.current.write,1),I=8,A=4;p.font="9px monospace",p.fillStyle="rgba(0, 240, 255, 0.6)",p.textAlign="right",p.textBaseline="middle";for(let U=0;U<=A;U++){const R=I+U/A*(j-I*2),G=D*(1-U/A);p.fillText(m(G),f-4,R)}p.strokeStyle="rgba(0, 240, 255, 0.06)",p.lineWidth=1;for(let U=0;U<=A;U++){const R=I+U/A*(j-I*2);p.beginPath(),p.setLineDash([4,4]),p.lineDashOffset=-l.current,p.moveTo(f,R),p.lineTo(k,R),p.stroke()}p.setLineDash([]);const re=(U,R,G)=>{if(U.length<2)return;const L=U.map((B,K)=>({x:f+K/(d-1)*h,y:j-I-B/D*(j-I*2)}));p.strokeStyle=G,p.lineWidth=6,p.lineCap="round",p.lineJoin="round",p.globalAlpha=.3,p.beginPath(),p.moveTo(L[0].x,L[0].y);for(let B=1;B<L.length-1;B++){const K=(L[B].x+L[B+1].x)/2,Q=(L[B].y+L[B+1].y)/2;p.quadraticCurveTo(L[B].x,L[B].y,K,Q)}p.lineTo(L[L.length-1].x,L[L.length-1].y),p.stroke(),p.globalAlpha=1,p.strokeStyle=R,p.lineWidth=2,p.shadowColor=R,p.shadowBlur=8,p.beginPath(),p.moveTo(L[0].x,L[0].y);for(let B=1;B<L.length-1;B++){const K=(L[B].x+L[B+1].x)/2,Q=(L[B].y+L[B+1].y)/2;p.quadraticCurveTo(L[B].x,L[B].y,K,Q)}p.lineTo(L[L.length-1].x,L[L.length-1].y),p.stroke(),p.shadowBlur=0;const V=3;for(let B=0;B<V;B++){const K=(l.current/20+B/V)%1,Q=Math.floor(K*(L.length-1));Q<L.length&&(p.fillStyle=R,p.globalAlpha=.8,p.beginPath(),p.arc(L[Q].x,L[Q].y,3,0,Math.PI*2),p.fill())}p.globalAlpha=1};re(i.current.write,"#ff6b00","#ff6b00"),re(i.current.read,"#00ff88","#00ff88"),s||(c.current=requestAnimationFrame(_))};return c.current=requestAnimationFrame(_),()=>cancelAnimationFrame(c.current)},[s]),r.jsxs("div",{className:"io-wave-panel",children:[r.jsx("div",{className:"panel-header",children:r.jsx("span",{className:"panel-title",children:"I/O ACTIVITY"})}),r.jsx("canvas",{ref:o,className:"io-canvas",style:{width:"100%",height:"100px"}}),r.jsxs("div",{className:"io-stats",children:[r.jsxs("div",{className:"io-stat read",children:[r.jsx("span",{className:"io-icon",children:"▼"}),r.jsx("span",{className:"io-label",children:"READ"}),r.jsxs("span",{className:"io-value",children:[Re(e),"/s"]}),r.jsxs("span",{className:"io-ops",children:[n.toFixed(0)," IOPS"]})]}),r.jsxs("div",{className:"io-stat write",children:[r.jsx("span",{className:"io-icon",children:"▲"}),r.jsx("span",{className:"io-label",children:"WRITE"}),r.jsxs("span",{className:"io-value",children:[Re(t),"/s"]}),r.jsxs("span",{className:"io-ops",children:[a.toFixed(0)," IOPS"]})]})]})]})}function xu({pool:e,totalBytes:t}){const n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:e.used_bytes/t*100,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"pool-energy-bar visible",children:[r.jsxs("div",{className:"pool-info",children:[r.jsx("span",{className:"pool-name",children:e.name}),r.jsx("span",{className:"pool-size",children:Re(e.used_bytes)})]}),r.jsxs("div",{className:"energy-track",children:[r.jsx("div",{className:"energy-fill",style:{width:`${n}%`,background:`linear-gradient(90deg, ${a}88, ${a})`,boxShadow:`0 0 10px ${a}`}}),r.jsx("div",{className:"energy-glow",style:{width:`${n}%`,background:a}})]}),r.jsxs("span",{className:"pool-percent",style:{color:a},children:[n.toFixed(1),"%"]})]})}function cx({osd:e,onClose:t}){const{t:n}=Le(),a=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,s=ze(a);return r.jsx("div",{className:"osd-popup-overlay",onClick:t,children:r.jsxs("div",{className:"osd-popup",onClick:o=>o.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:`status-badge ${e.status==="up"?"up":"down"}`,children:e.status.toUpperCase()}),r.jsxs("span",{className:"osd-name",children:["OSD.",e.id]})]}),r.jsx("button",{className:"popup-close",onClick:t,children:"×"})]}),r.jsxs("div",{className:"popup-content",children:[r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:"Host"}),r.jsx("span",{className:"info-value",children:e.host||"N/A"})]}),r.jsxs("div",{className:"info-row",children:[r.jsx("span",{className:"info-label",children:n("ceph.in_cluster")}),r.jsx("span",{className:`info-value ${e.in_cluster?"text-success":"text-danger"}`,children:e.in_cluster?n("ceph.yes"):n("ceph.no")})]}),r.jsxs("div",{className:"storage-section",children:[r.jsx("div",{className:"storage-bar",children:r.jsx("div",{className:`storage-fill ${s}`,style:{width:`${a}%`}})}),r.jsxs("div",{className:"storage-stats",children:[r.jsxs("span",{children:[Re(e.used_bytes)," / ",Re(e.total_bytes)]}),r.jsx("span",{className:`text-${s}`,children:ot(a,1)})]})]}),e.status==="up"&&(e.apply_latency_ms||e.commit_latency_ms)&&r.jsxs("div",{className:"latency-section",children:[r.jsx("div",{className:"latency-title",children:n("ceph.latency")}),r.jsxs("div",{className:"latency-grid",children:[r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.apply")}),r.jsxs("span",{className:"latency-value",children:[(e.apply_latency_ms||0).toFixed(1)," ms"]})]}),r.jsxs("div",{className:"latency-item",children:[r.jsx("span",{className:"latency-label",children:n("ceph.commit")}),r.jsxs("span",{className:"latency-value",children:[(e.commit_latency_ms||0).toFixed(1)," ms"]})]})]})]})]})]})})}function dx({ceph:e}){const{t}=Le(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=100-n;return r.jsxs("div",{className:"storage-summary",children:[r.jsx("div",{className:"summary-header",children:t("ceph.cluster_storage")}),r.jsxs("div",{className:"summary-stats",children:[r.jsxs("div",{className:"stat-block used",children:[r.jsx("span",{className:"stat-value",children:Re(e.used_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.used")})]}),r.jsx("div",{className:"stat-divider",children:"/"}),r.jsxs("div",{className:"stat-block total",children:[r.jsx("span",{className:"stat-value",children:Re(e.total_bytes)}),r.jsx("span",{className:"stat-label",children:t("ceph.total")})]})]}),r.jsxs("div",{className:"summary-bar",children:[r.jsx("div",{className:"bar-used",style:{width:`${n}%`}}),r.jsx("div",{className:"bar-available",style:{width:`${a}%`}})]}),r.jsxs("div",{className:"summary-legend",children:[r.jsxs("span",{className:"legend-item used",children:[r.jsx("span",{className:"legend-dot"})," Used ",ot(n,1)]}),r.jsxs("span",{className:"legend-item available",children:[r.jsx("span",{className:"legend-dot"})," Available ",ot(a,1)]})]})]})}function ux({ceph:e}){const t=e.health==="HEALTH_OK"?"#00ff88":e.health==="HEALTH_WARN"?"#ff6b00":"#ff0040",n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0,a=n>=95?"#ff0040":n>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:"compact-core",children:r.jsxs("svg",{viewBox:"0 0 120 120",className:"compact-core-svg",children:[r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:"rgba(0, 240, 255, 0.1)",strokeWidth:"1"}),r.jsx("circle",{cx:"60",cy:"60",r:"55",fill:"none",stroke:t,strokeWidth:"2",strokeDasharray:"20 10",className:"rotating-ring",style:{filter:`drop-shadow(0 0 6px ${t})`}}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:"rgba(100, 100, 120, 0.2)",strokeWidth:"6"}),r.jsx("circle",{cx:"60",cy:"60",r:"45",fill:"none",stroke:a,strokeWidth:"6",strokeDasharray:`${n*2.83} 283`,strokeLinecap:"round",transform:"rotate(-90 60 60)",style:{filter:`drop-shadow(0 0 4px ${a})`,transition:"stroke-dasharray 0.5s ease"}}),r.jsx("circle",{cx:"60",cy:"60",r:"32",fill:"rgba(10, 20, 35, 0.9)",stroke:t,strokeWidth:"1.5"}),r.jsx("text",{x:"60",y:"55",textAnchor:"middle",fill:t,className:"compact-health-text",children:e.health.replace("HEALTH_","")}),r.jsx("text",{x:"60",y:"72",textAnchor:"middle",fill:"var(--text-secondary)",className:"compact-storage-text",children:ot(n,0)})]})})}function px({mons:e,mgrs:t,mds:n}){return r.jsxs("div",{className:"compact-daemons",children:[r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mon",children:"MON"}),r.jsx("div",{className:"daemon-dots",children:e.map(a=>r.jsx("span",{className:`daemon-dot mon ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:e.length})]}),r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mgr",children:"MGR"}),r.jsx("div",{className:"daemon-dots",children:t.map(a=>r.jsx("span",{className:`daemon-dot mgr ${a.active?"active":"standby"}`,title:`${a.name} - ${a.active?"Active":"Standby"}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:t.length})]}),n.length>0&&r.jsxs("div",{className:"daemon-row",children:[r.jsx("span",{className:"daemon-badge mds",children:"MDS"}),r.jsx("div",{className:"daemon-dots",children:n.map(a=>r.jsx("span",{className:`daemon-dot mds ${a.state}`,title:`${a.name} - ${a.state}`},a.name))}),r.jsx("span",{className:"daemon-count-small",children:n.length})]})]})}function mx({ceph:e}){const{t}=Le(),n=e.total_bytes>0?e.used_bytes/e.total_bytes*100:0;return r.jsxs("div",{className:"compact-storage",children:[r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.used")}),r.jsx("span",{className:"storage-value",children:r.jsx(Lo,{value:e.used_bytes})})]}),r.jsx("div",{className:"compact-bar",children:r.jsx("div",{className:"compact-bar-fill",style:{width:`${n}%`,transition:"width 0.8s ease-out"}})}),r.jsxs("div",{className:"storage-row",children:[r.jsx("span",{className:"storage-label",children:t("ceph.total")}),r.jsx("span",{className:"storage-value",children:r.jsx(Lo,{value:e.total_bytes})})]})]})}function fx({osds:e,onSelect:t}){const n=e.filter(a=>a.status==="up").length;return r.jsxs("div",{className:"compact-osd-panel",children:[r.jsxs("div",{className:"compact-osd-header",children:[r.jsx("span",{className:"compact-osd-title",children:"OSD"}),r.jsxs("span",{className:`compact-osd-status ${n===e.length?"all-up":""}`,children:[n,"/",e.length]})]}),r.jsx("div",{className:"compact-osd-grid",children:e.sort((a,s)=>a.id-s.id).map((a,s)=>{const o=a.total_bytes>0?a.used_bytes/a.total_bytes*100:0,i=a.status!=="up"||o>=95?"#ff0040":o>=80?"#ff6b00":"#00ff88";return r.jsx("div",{className:`compact-osd ${a.status==="up"?"up":"down"}`,style:{"--osd-color":i,animationDelay:`${s*20}ms`},onClick:()=>t(a),title:`OSD.${a.id}`,children:a.id},a.id)})})]})}function hx({readBps:e,writeBps:t}){return r.jsxs("div",{className:"compact-io",children:[r.jsxs("div",{className:"io-row read",children:[r.jsx("span",{className:"io-arrow",children:"▼"}),r.jsx("span",{className:"io-label",children:"R"}),r.jsxs("span",{className:"io-val",children:[r.jsx(Lo,{value:e,duration:500}),"/s"]})]}),r.jsxs("div",{className:"io-row write",children:[r.jsx("span",{className:"io-arrow",children:"▲"}),r.jsx("span",{className:"io-label",children:"W"}),r.jsxs("span",{className:"io-val",children:[r.jsx(Lo,{value:t,duration:500}),"/s"]})]})]})}function gx({pools:e,totalBytes:t}){const n=e.filter(a=>!a.name.startsWith(".")&&!a.name.endsWith("_metadata")).map(a=>({...a,name:a.name.endsWith("_data")?a.name.replace(/_data$/,""):a.name}));return n.length===0?null:r.jsxs("div",{className:"compact-pools",children:[n.slice(0,6).map(a=>{const s=a.total_bytes>0?a.used_bytes/a.total_bytes*100:a.used_bytes/t*100,o=s>=95?"#ff0040":s>=80?"#ff6b00":"#00ff88";return r.jsxs("div",{className:"compact-pool",children:[r.jsx("span",{className:"pool-label",children:a.name.substring(0,12)}),r.jsx("div",{className:"pool-mini-bar",children:r.jsx("div",{className:"pool-mini-fill",style:{width:`${Math.min(s,100)}%`,background:o}})}),r.jsx("span",{className:"pool-pct",style:{color:o},children:ot(s,0)})]},a.name)}),n.length>6&&r.jsxs("span",{className:"pool-more",children:["+",n.length-6," more"]})]})}function xx({ceph:e,clusterName:t,onOSDSelect:n,compact:a=!1,isPaused:s=!1}){const{t:o}=Le();if(a)return r.jsxs("div",{className:"ceph-cluster-compact",children:[r.jsx("div",{className:"compact-left",children:r.jsx(ux,{ceph:e})}),r.jsxs("div",{className:"compact-middle",children:[r.jsx(px,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsx(mx,{ceph:e}),r.jsx(hx,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec})]}),r.jsx("div",{className:"compact-right",children:r.jsx(fx,{osds:e.osds,onSelect:n})}),r.jsx("div",{className:"compact-pools-section",children:r.jsx(gx,{pools:e.pools,totalBytes:e.total_bytes})})]});const i=e.pools.filter(d=>!d.name.startsWith(".")&&!d.name.endsWith("_metadata")),c=i.filter(d=>d.name.toLowerCase().includes("cephfs")&&d.name.endsWith("_data")).map(d=>({...d,name:d.name.replace(/_data$/,"")})),l=i.filter(d=>!d.name.toLowerCase().includes("cephfs"));return r.jsx(r.Fragment,{children:r.jsxs("div",{className:"ceph-content-full",children:[r.jsxs("div",{className:"col-core",children:[r.jsx(sx,{ceph:e}),r.jsx(dx,{ceph:e})]}),r.jsxs("div",{className:"col-daemons",children:[r.jsx(ox,{mons:e.mons||[],mgrs:e.mgrs||[],mds:e.mds||[]}),r.jsxs("div",{className:"pools-inline",children:[l.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.ceph_pools")}),r.jsx("div",{className:"pools-list",children:l.map((d,m)=>r.jsx(xu,{pool:d,totalBytes:e.total_bytes},d.name))})]}),c.length>0&&r.jsxs("div",{className:"pool-group-inline",children:[r.jsx("div",{className:"pool-group-title",children:o("ceph.cephfs_pools")}),r.jsx("div",{className:"pools-list",children:c.map((d,m)=>r.jsx(xu,{pool:d,totalBytes:e.total_bytes},d.name))})]})]})]}),r.jsxs("div",{className:"col-osd",children:[r.jsx(lx,{readBps:e.read_bytes_sec,writeBps:e.write_bytes_sec,readOps:e.read_ops_sec,writeOps:e.write_ops_sec,isPaused:s}),r.jsx(ix,{osds:e.osds,onSelect:n})]})]})})}function vx({cluster:e,clusters:t,isPaused:n=!1}){const{t:a}=Le(),[s,o]=u.useState(null),i=!e&&t&&Object.keys(t).length>0,c=u.useMemo(()=>i?Object.entries(t).filter(([l,d])=>d.ceph).map(([l,d])=>({id:l,name:d.name||l,ceph:d.ceph})):e!=null&&e.ceph?[{id:e.id,name:e.name||e.id,ceph:e.ceph}]:[],[e,t,i]);return!e&&!i?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:a("cluster.select")})]}),r.jsx("style",{children:Ui})]}):c.length===0?r.jsxs("div",{className:"ceph-constellation empty",children:[r.jsxs("div",{className:"empty-message",children:[r.jsxs("svg",{width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 8v4M12 16h.01"})]}),r.jsx("span",{children:a("ceph.no_cluster")})]}),r.jsx("style",{children:Ui})]}):r.jsxs("div",{className:"ceph-constellation",children:[r.jsx("div",{className:"grid-floor"}),r.jsx("div",{className:"ceph-header",children:r.jsxs("h1",{className:"ceph-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"8",strokeDasharray:"4 2"}),r.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2"})]}),a("ceph.title")]})}),r.jsx("div",{className:"ceph-clusters-stack",children:c.map((l,d)=>{const m=l.ceph.health==="HEALTH_OK"?"success":l.ceph.health==="HEALTH_WARN"?"warning":"danger";return r.jsxs("div",{className:"ceph-cluster-section",children:[c.length>1&&r.jsxs("div",{className:"cluster-section-header",children:[r.jsx("span",{className:`section-health ${m}`}),r.jsx("span",{className:"section-name",children:l.name}),r.jsxs("span",{className:"section-osd",children:[l.ceph.osd_up,"/",l.ceph.osd_count," OSD"]}),r.jsx("div",{className:"section-line"})]}),r.jsx(xx,{ceph:l.ceph,clusterName:c.length===1?l.name:void 0,onOSDSelect:o,compact:c.length>1,isPaused:n})]},l.id)})}),s&&r.jsx(cx,{osd:s,onClose:()=>o(null)}),r.jsx("style",{children:Ui})]})}const Ui=`
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
`;var bx={value:()=>{}};function ff(){for(var e=0,t=arguments.length,n={},a;e<t;++e){if(!(a=arguments[e]+"")||a in n||/[\s.]/.test(a))throw new Error("illegal type: "+a);n[a]=[]}return new lo(n)}function lo(e){this._=e}function yx(e,t){return e.trim().split(/^|\s+/).map(function(n){var a="",s=n.indexOf(".");if(s>=0&&(a=n.slice(s+1),n=n.slice(0,s)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:a}})}lo.prototype=ff.prototype={constructor:lo,on:function(e,t){var n=this._,a=yx(e+"",n),s,o=-1,i=a.length;if(arguments.length<2){for(;++o<i;)if((s=(e=a[o]).type)&&(s=wx(n[s],e.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++o<i;)if(s=(e=a[o]).type)n[s]=vu(n[s],e.name,t);else if(t==null)for(s in n)n[s]=vu(n[s],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new lo(e)},call:function(e,t){if((s=arguments.length-2)>0)for(var n=new Array(s),a=0,s,o;a<s;++a)n[a]=arguments[a+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(o=this._[e],a=0,s=o.length;a<s;++a)o[a].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var a=this._[e],s=0,o=a.length;s<o;++s)a[s].value.apply(t,n)}};function wx(e,t){for(var n=0,a=e.length,s;n<a;++n)if((s=e[n]).name===t)return s.value}function vu(e,t,n){for(var a=0,s=e.length;a<s;++a)if(e[a].name===t){e[a]=bx,e=e.slice(0,a).concat(e.slice(a+1));break}return n!=null&&e.push({name:t,value:n}),e}var Vl="http://www.w3.org/1999/xhtml";const bu={svg:"http://www.w3.org/2000/svg",xhtml:Vl,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function li(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),bu.hasOwnProperty(t)?{space:bu[t],local:e}:e}function kx(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Vl&&t.documentElement.namespaceURI===Vl?t.createElement(e):t.createElementNS(n,e)}}function jx(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function hf(e){var t=li(e);return(t.local?jx:kx)(t)}function Nx(){}function Gc(e){return e==null?Nx:function(){return this.querySelector(e)}}function _x(e){typeof e!="function"&&(e=Gc(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=new Array(i),l,d,m=0;m<i;++m)(l=o[m])&&(d=e.call(l,l.__data__,m,o))&&("__data__"in l&&(d.__data__=l.__data__),c[m]=d);return new br(a,this._parents)}function Sx(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Cx(){return[]}function gf(e){return e==null?Cx:function(){return this.querySelectorAll(e)}}function Mx(e){return function(){return Sx(e.apply(this,arguments))}}function zx(e){typeof e=="function"?e=Mx(e):e=gf(e);for(var t=this._groups,n=t.length,a=[],s=[],o=0;o<n;++o)for(var i=t[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&(a.push(e.call(l,l.__data__,d,i)),s.push(l));return new br(a,s)}function xf(e){return function(){return this.matches(e)}}function vf(e){return function(t){return t.matches(e)}}var $x=Array.prototype.find;function Ex(e){return function(){return $x.call(this.children,e)}}function Tx(){return this.firstElementChild}function Px(e){return this.select(e==null?Tx:Ex(typeof e=="function"?e:vf(e)))}var Rx=Array.prototype.filter;function Ix(){return Array.from(this.children)}function Lx(e){return function(){return Rx.call(this.children,e)}}function Ax(e){return this.selectAll(e==null?Ix:Lx(typeof e=="function"?e:vf(e)))}function Ox(e){typeof e!="function"&&(e=xf(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new br(a,this._parents)}function bf(e){return new Array(e.length)}function Fx(){return new br(this._enter||this._groups.map(bf),this._parents)}function Ao(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Ao.prototype={constructor:Ao,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Dx(e){return function(){return e}}function Bx(e,t,n,a,s,o){for(var i=0,c,l=t.length,d=o.length;i<d;++i)(c=t[i])?(c.__data__=o[i],a[i]=c):n[i]=new Ao(e,o[i]);for(;i<l;++i)(c=t[i])&&(s[i]=c)}function Wx(e,t,n,a,s,o,i){var c,l,d=new Map,m=t.length,g=o.length,p=new Array(m),x;for(c=0;c<m;++c)(l=t[c])&&(p[c]=x=i.call(l,l.__data__,c,t)+"",d.has(x)?s[c]=l:d.set(x,l));for(c=0;c<g;++c)x=i.call(e,o[c],c,o)+"",(l=d.get(x))?(a[c]=l,l.__data__=o[c],d.delete(x)):n[c]=new Ao(e,o[c]);for(c=0;c<m;++c)(l=t[c])&&d.get(p[c])===l&&(s[c]=l)}function Ux(e){return e.__data__}function Vx(e,t){if(!arguments.length)return Array.from(this,Ux);var n=t?Wx:Bx,a=this._parents,s=this._groups;typeof e!="function"&&(e=Dx(e));for(var o=s.length,i=new Array(o),c=new Array(o),l=new Array(o),d=0;d<o;++d){var m=a[d],g=s[d],p=g.length,x=Hx(e.call(m,m&&m.__data__,d,a)),b=x.length,k=c[d]=new Array(b),j=i[d]=new Array(b),f=l[d]=new Array(p);n(m,g,k,j,f,x,t);for(var h=0,v=0,N,w;h<b;++h)if(N=k[h]){for(h>=v&&(v=h+1);!(w=j[v])&&++v<b;);N._next=w||null}}return i=new br(i,a),i._enter=c,i._exit=l,i}function Hx(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Yx(){return new br(this._exit||this._groups.map(bf),this._parents)}function Gx(e,t,n){var a=this.enter(),s=this,o=this.exit();return typeof e=="function"?(a=e(a),a&&(a=a.selection())):a=a.append(e+""),t!=null&&(s=t(s),s&&(s=s.selection())),n==null?o.remove():n(o),a&&s?a.merge(s).order():s}function Xx(e){for(var t=e.selection?e.selection():e,n=this._groups,a=t._groups,s=n.length,o=a.length,i=Math.min(s,o),c=new Array(s),l=0;l<i;++l)for(var d=n[l],m=a[l],g=d.length,p=c[l]=new Array(g),x,b=0;b<g;++b)(x=d[b]||m[b])&&(p[b]=x);for(;l<s;++l)c[l]=n[l];return new br(c,this._parents)}function Kx(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a=e[t],s=a.length-1,o=a[s],i;--s>=0;)(i=a[s])&&(o&&i.compareDocumentPosition(o)^4&&o.parentNode.insertBefore(i,o),o=i);return this}function qx(e){e||(e=Qx);function t(g,p){return g&&p?e(g.__data__,p.__data__):!g-!p}for(var n=this._groups,a=n.length,s=new Array(a),o=0;o<a;++o){for(var i=n[o],c=i.length,l=s[o]=new Array(c),d,m=0;m<c;++m)(d=i[m])&&(l[m]=d);l.sort(t)}return new br(s,this._parents).order()}function Qx(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Jx(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Zx(){return Array.from(this)}function ev(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length;s<o;++s){var i=a[s];if(i)return i}return null}function tv(){let e=0;for(const t of this)++e;return e}function rv(){return!this.node()}function nv(e){for(var t=this._groups,n=0,a=t.length;n<a;++n)for(var s=t[n],o=0,i=s.length,c;o<i;++o)(c=s[o])&&e.call(c,c.__data__,o,s);return this}function av(e){return function(){this.removeAttribute(e)}}function sv(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ov(e,t){return function(){this.setAttribute(e,t)}}function iv(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function lv(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function cv(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function dv(e,t){var n=li(e);if(arguments.length<2){var a=this.node();return n.local?a.getAttributeNS(n.space,n.local):a.getAttribute(n)}return this.each((t==null?n.local?sv:av:typeof t=="function"?n.local?cv:lv:n.local?iv:ov)(n,t))}function yf(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function uv(e){return function(){this.style.removeProperty(e)}}function pv(e,t,n){return function(){this.style.setProperty(e,t,n)}}function mv(e,t,n){return function(){var a=t.apply(this,arguments);a==null?this.style.removeProperty(e):this.style.setProperty(e,a,n)}}function fv(e,t,n){return arguments.length>1?this.each((t==null?uv:typeof t=="function"?mv:pv)(e,t,n??"")):va(this.node(),e)}function va(e,t){return e.style.getPropertyValue(t)||yf(e).getComputedStyle(e,null).getPropertyValue(t)}function hv(e){return function(){delete this[e]}}function gv(e,t){return function(){this[e]=t}}function xv(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function vv(e,t){return arguments.length>1?this.each((t==null?hv:typeof t=="function"?xv:gv)(e,t)):this.node()[e]}function wf(e){return e.trim().split(/^|\s+/)}function Xc(e){return e.classList||new kf(e)}function kf(e){this._node=e,this._names=wf(e.getAttribute("class")||"")}kf.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function jf(e,t){for(var n=Xc(e),a=-1,s=t.length;++a<s;)n.add(t[a])}function Nf(e,t){for(var n=Xc(e),a=-1,s=t.length;++a<s;)n.remove(t[a])}function bv(e){return function(){jf(this,e)}}function yv(e){return function(){Nf(this,e)}}function wv(e,t){return function(){(t.apply(this,arguments)?jf:Nf)(this,e)}}function kv(e,t){var n=wf(e+"");if(arguments.length<2){for(var a=Xc(this.node()),s=-1,o=n.length;++s<o;)if(!a.contains(n[s]))return!1;return!0}return this.each((typeof t=="function"?wv:t?bv:yv)(n,t))}function jv(){this.textContent=""}function Nv(e){return function(){this.textContent=e}}function _v(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function Sv(e){return arguments.length?this.each(e==null?jv:(typeof e=="function"?_v:Nv)(e)):this.node().textContent}function Cv(){this.innerHTML=""}function Mv(e){return function(){this.innerHTML=e}}function zv(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function $v(e){return arguments.length?this.each(e==null?Cv:(typeof e=="function"?zv:Mv)(e)):this.node().innerHTML}function Ev(){this.nextSibling&&this.parentNode.appendChild(this)}function Tv(){return this.each(Ev)}function Pv(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Rv(){return this.each(Pv)}function Iv(e){var t=typeof e=="function"?e:hf(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Lv(){return null}function Av(e,t){var n=typeof e=="function"?e:hf(e),a=t==null?Lv:typeof t=="function"?t:Gc(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),a.apply(this,arguments)||null)})}function Ov(){var e=this.parentNode;e&&e.removeChild(this)}function Fv(){return this.each(Ov)}function Dv(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Bv(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Wv(e){return this.select(e?Bv:Dv)}function Uv(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Vv(e){return function(t){e.call(this,t,this.__data__)}}function Hv(e){return e.trim().split(/^|\s+/).map(function(t){var n="",a=t.indexOf(".");return a>=0&&(n=t.slice(a+1),t=t.slice(0,a)),{type:t,name:n}})}function Yv(e){return function(){var t=this.__on;if(t){for(var n=0,a=-1,s=t.length,o;n<s;++n)o=t[n],(!e.type||o.type===e.type)&&o.name===e.name?this.removeEventListener(o.type,o.listener,o.options):t[++a]=o;++a?t.length=a:delete this.__on}}}function Gv(e,t,n){return function(){var a=this.__on,s,o=Vv(t);if(a){for(var i=0,c=a.length;i<c;++i)if((s=a[i]).type===e.type&&s.name===e.name){this.removeEventListener(s.type,s.listener,s.options),this.addEventListener(s.type,s.listener=o,s.options=n),s.value=t;return}}this.addEventListener(e.type,o,n),s={type:e.type,name:e.name,value:t,listener:o,options:n},a?a.push(s):this.__on=[s]}}function Xv(e,t,n){var a=Hv(e+""),s,o=a.length,i;if(arguments.length<2){var c=this.node().__on;if(c){for(var l=0,d=c.length,m;l<d;++l)for(s=0,m=c[l];s<o;++s)if((i=a[s]).type===m.type&&i.name===m.name)return m.value}return}for(c=t?Gv:Yv,s=0;s<o;++s)this.each(c(a[s],t,n));return this}function _f(e,t,n){var a=yf(e),s=a.CustomEvent;typeof s=="function"?s=new s(t,n):(s=a.document.createEvent("Event"),n?(s.initEvent(t,n.bubbles,n.cancelable),s.detail=n.detail):s.initEvent(t,!1,!1)),e.dispatchEvent(s)}function Kv(e,t){return function(){return _f(this,e,t)}}function qv(e,t){return function(){return _f(this,e,t.apply(this,arguments))}}function Qv(e,t){return this.each((typeof t=="function"?qv:Kv)(e,t))}function*Jv(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var a=e[t],s=0,o=a.length,i;s<o;++s)(i=a[s])&&(yield i)}var Zv=[null];function br(e,t){this._groups=e,this._parents=t}function Ns(){return new br([[document.documentElement]],Zv)}function eb(){return this}br.prototype=Ns.prototype={constructor:br,select:_x,selectAll:zx,selectChild:Px,selectChildren:Ax,filter:Ox,data:Vx,enter:Fx,exit:Yx,join:Gx,merge:Xx,selection:eb,order:Kx,sort:qx,call:Jx,nodes:Zx,node:ev,size:tv,empty:rv,each:nv,attr:dv,style:fv,property:vv,classed:kv,text:Sv,html:$v,raise:Tv,lower:Rv,append:Iv,insert:Av,remove:Fv,clone:Wv,datum:Uv,on:Xv,dispatch:Qv,[Symbol.iterator]:Jv};function Kc(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Sf(e,t){var n=Object.create(e.prototype);for(var a in t)n[a]=t[a];return n}function _s(){}var fs=.7,Oo=1/fs,da="\\s*([+-]?\\d+)\\s*",hs="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",$r="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",tb=/^#([0-9a-f]{3,8})$/,rb=new RegExp(`^rgb\\(${da},${da},${da}\\)$`),nb=new RegExp(`^rgb\\(${$r},${$r},${$r}\\)$`),ab=new RegExp(`^rgba\\(${da},${da},${da},${hs}\\)$`),sb=new RegExp(`^rgba\\(${$r},${$r},${$r},${hs}\\)$`),ob=new RegExp(`^hsl\\(${hs},${$r},${$r}\\)$`),ib=new RegExp(`^hsla\\(${hs},${$r},${$r},${hs}\\)$`),yu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Kc(_s,gs,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:wu,formatHex:wu,formatHex8:lb,formatHsl:cb,formatRgb:ku,toString:ku});function wu(){return this.rgb().formatHex()}function lb(){return this.rgb().formatHex8()}function cb(){return Cf(this).formatHsl()}function ku(){return this.rgb().formatRgb()}function gs(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=tb.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?ju(t):n===3?new Gt(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Gs(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Gs(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=rb.exec(e))?new Gt(t[1],t[2],t[3],1):(t=nb.exec(e))?new Gt(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=ab.exec(e))?Gs(t[1],t[2],t[3],t[4]):(t=sb.exec(e))?Gs(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=ob.exec(e))?Su(t[1],t[2]/100,t[3]/100,1):(t=ib.exec(e))?Su(t[1],t[2]/100,t[3]/100,t[4]):yu.hasOwnProperty(e)?ju(yu[e]):e==="transparent"?new Gt(NaN,NaN,NaN,0):null}function ju(e){return new Gt(e>>16&255,e>>8&255,e&255,1)}function Gs(e,t,n,a){return a<=0&&(e=t=n=NaN),new Gt(e,t,n,a)}function db(e){return e instanceof _s||(e=gs(e)),e?(e=e.rgb(),new Gt(e.r,e.g,e.b,e.opacity)):new Gt}function Hl(e,t,n,a){return arguments.length===1?db(e):new Gt(e,t,n,a??1)}function Gt(e,t,n,a){this.r=+e,this.g=+t,this.b=+n,this.opacity=+a}Kc(Gt,Hl,Sf(_s,{brighter(e){return e=e==null?Oo:Math.pow(Oo,e),new Gt(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?fs:Math.pow(fs,e),new Gt(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Gt(Tn(this.r),Tn(this.g),Tn(this.b),Fo(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Nu,formatHex:Nu,formatHex8:ub,formatRgb:_u,toString:_u}));function Nu(){return`#${zn(this.r)}${zn(this.g)}${zn(this.b)}`}function ub(){return`#${zn(this.r)}${zn(this.g)}${zn(this.b)}${zn((isNaN(this.opacity)?1:this.opacity)*255)}`}function _u(){const e=Fo(this.opacity);return`${e===1?"rgb(":"rgba("}${Tn(this.r)}, ${Tn(this.g)}, ${Tn(this.b)}${e===1?")":`, ${e})`}`}function Fo(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Tn(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function zn(e){return e=Tn(e),(e<16?"0":"")+e.toString(16)}function Su(e,t,n,a){return a<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new hr(e,t,n,a)}function Cf(e){if(e instanceof hr)return new hr(e.h,e.s,e.l,e.opacity);if(e instanceof _s||(e=gs(e)),!e)return new hr;if(e instanceof hr)return e;e=e.rgb();var t=e.r/255,n=e.g/255,a=e.b/255,s=Math.min(t,n,a),o=Math.max(t,n,a),i=NaN,c=o-s,l=(o+s)/2;return c?(t===o?i=(n-a)/c+(n<a)*6:n===o?i=(a-t)/c+2:i=(t-n)/c+4,c/=l<.5?o+s:2-o-s,i*=60):c=l>0&&l<1?0:i,new hr(i,c,l,e.opacity)}function pb(e,t,n,a){return arguments.length===1?Cf(e):new hr(e,t,n,a??1)}function hr(e,t,n,a){this.h=+e,this.s=+t,this.l=+n,this.opacity=+a}Kc(hr,pb,Sf(_s,{brighter(e){return e=e==null?Oo:Math.pow(Oo,e),new hr(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?fs:Math.pow(fs,e),new hr(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,a=n+(n<.5?n:1-n)*t,s=2*n-a;return new Gt(Vi(e>=240?e-240:e+120,s,a),Vi(e,s,a),Vi(e<120?e+240:e-120,s,a),this.opacity)},clamp(){return new hr(Cu(this.h),Xs(this.s),Xs(this.l),Fo(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Fo(this.opacity);return`${e===1?"hsl(":"hsla("}${Cu(this.h)}, ${Xs(this.s)*100}%, ${Xs(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Cu(e){return e=(e||0)%360,e<0?e+360:e}function Xs(e){return Math.max(0,Math.min(1,e||0))}function Vi(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const Mf=e=>()=>e;function mb(e,t){return function(n){return e+n*t}}function fb(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(a){return Math.pow(e+a*t,n)}}function hb(e){return(e=+e)==1?zf:function(t,n){return n-t?fb(t,n,e):Mf(isNaN(t)?n:t)}}function zf(e,t){var n=t-e;return n?mb(e,n):Mf(isNaN(e)?t:e)}const Mu=function e(t){var n=hb(t);function a(s,o){var i=n((s=Hl(s)).r,(o=Hl(o)).r),c=n(s.g,o.g),l=n(s.b,o.b),d=zf(s.opacity,o.opacity);return function(m){return s.r=i(m),s.g=c(m),s.b=l(m),s.opacity=d(m),s+""}}return a.gamma=e,a}(1);function en(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}var Yl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Hi=new RegExp(Yl.source,"g");function gb(e){return function(){return e}}function xb(e){return function(t){return e(t)+""}}function vb(e,t){var n=Yl.lastIndex=Hi.lastIndex=0,a,s,o,i=-1,c=[],l=[];for(e=e+"",t=t+"";(a=Yl.exec(e))&&(s=Hi.exec(t));)(o=s.index)>n&&(o=t.slice(n,o),c[i]?c[i]+=o:c[++i]=o),(a=a[0])===(s=s[0])?c[i]?c[i]+=s:c[++i]=s:(c[++i]=null,l.push({i,x:en(a,s)})),n=Hi.lastIndex;return n<t.length&&(o=t.slice(n),c[i]?c[i]+=o:c[++i]=o),c.length<2?l[0]?xb(l[0].x):gb(t):(t=l.length,function(d){for(var m=0,g;m<t;++m)c[(g=l[m]).i]=g.x(d);return c.join("")})}var zu=180/Math.PI,Gl={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function $f(e,t,n,a,s,o){var i,c,l;return(i=Math.sqrt(e*e+t*t))&&(e/=i,t/=i),(l=e*n+t*a)&&(n-=e*l,a-=t*l),(c=Math.sqrt(n*n+a*a))&&(n/=c,a/=c,l/=c),e*a<t*n&&(e=-e,t=-t,l=-l,i=-i),{translateX:s,translateY:o,rotate:Math.atan2(t,e)*zu,skewX:Math.atan(l)*zu,scaleX:i,scaleY:c}}var Ks;function bb(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?Gl:$f(t.a,t.b,t.c,t.d,t.e,t.f)}function yb(e){return e==null||(Ks||(Ks=document.createElementNS("http://www.w3.org/2000/svg","g")),Ks.setAttribute("transform",e),!(e=Ks.transform.baseVal.consolidate()))?Gl:(e=e.matrix,$f(e.a,e.b,e.c,e.d,e.e,e.f))}function Ef(e,t,n,a){function s(d){return d.length?d.pop()+" ":""}function o(d,m,g,p,x,b){if(d!==g||m!==p){var k=x.push("translate(",null,t,null,n);b.push({i:k-4,x:en(d,g)},{i:k-2,x:en(m,p)})}else(g||p)&&x.push("translate("+g+t+p+n)}function i(d,m,g,p){d!==m?(d-m>180?m+=360:m-d>180&&(d+=360),p.push({i:g.push(s(g)+"rotate(",null,a)-2,x:en(d,m)})):m&&g.push(s(g)+"rotate("+m+a)}function c(d,m,g,p){d!==m?p.push({i:g.push(s(g)+"skewX(",null,a)-2,x:en(d,m)}):m&&g.push(s(g)+"skewX("+m+a)}function l(d,m,g,p,x,b){if(d!==g||m!==p){var k=x.push(s(x)+"scale(",null,",",null,")");b.push({i:k-4,x:en(d,g)},{i:k-2,x:en(m,p)})}else(g!==1||p!==1)&&x.push(s(x)+"scale("+g+","+p+")")}return function(d,m){var g=[],p=[];return d=e(d),m=e(m),o(d.translateX,d.translateY,m.translateX,m.translateY,g,p),i(d.rotate,m.rotate,g,p),c(d.skewX,m.skewX,g,p),l(d.scaleX,d.scaleY,m.scaleX,m.scaleY,g,p),d=m=null,function(x){for(var b=-1,k=p.length,j;++b<k;)g[(j=p[b]).i]=j.x(x);return g.join("")}}}var wb=Ef(bb,"px, ","px)","deg)"),kb=Ef(yb,", ",")",")"),ba=0,Fa=0,Ea=0,Tf=1e3,Do,Da,Bo=0,On=0,ci=0,xs=typeof performance=="object"&&performance.now?performance:Date,Pf=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function qc(){return On||(Pf(jb),On=xs.now()+ci)}function jb(){On=0}function Wo(){this._call=this._time=this._next=null}Wo.prototype=Rf.prototype={constructor:Wo,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?qc():+n)+(t==null?0:+t),!this._next&&Da!==this&&(Da?Da._next=this:Do=this,Da=this),this._call=e,this._time=n,Xl()},stop:function(){this._call&&(this._call=null,this._time=1/0,Xl())}};function Rf(e,t,n){var a=new Wo;return a.restart(e,t,n),a}function Nb(){qc(),++ba;for(var e=Do,t;e;)(t=On-e._time)>=0&&e._call.call(void 0,t),e=e._next;--ba}function $u(){On=(Bo=xs.now())+ci,ba=Fa=0;try{Nb()}finally{ba=0,Sb(),On=0}}function _b(){var e=xs.now(),t=e-Bo;t>Tf&&(ci-=t,Bo=e)}function Sb(){for(var e,t=Do,n,a=1/0;t;)t._call?(a>t._time&&(a=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:Do=n);Da=e,Xl(a)}function Xl(e){if(!ba){Fa&&(Fa=clearTimeout(Fa));var t=e-On;t>24?(e<1/0&&(Fa=setTimeout($u,e-xs.now()-ci)),Ea&&(Ea=clearInterval(Ea))):(Ea||(Bo=xs.now(),Ea=setInterval(_b,Tf)),ba=1,Pf($u))}}function Eu(e,t,n){var a=new Wo;return t=t==null?0:+t,a.restart(s=>{a.stop(),e(s+t)},t,n),a}var Cb=ff("start","end","cancel","interrupt"),Mb=[],If=0,Tu=1,Kl=2,co=3,Pu=4,ql=5,uo=6;function di(e,t,n,a,s,o){var i=e.__transition;if(!i)e.__transition={};else if(n in i)return;zb(e,n,{name:t,index:a,group:s,on:Cb,tween:Mb,time:o.time,delay:o.delay,duration:o.duration,ease:o.ease,timer:null,state:If})}function Qc(e,t){var n=yr(e,t);if(n.state>If)throw new Error("too late; already scheduled");return n}function Er(e,t){var n=yr(e,t);if(n.state>co)throw new Error("too late; already running");return n}function yr(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function zb(e,t,n){var a=e.__transition,s;a[t]=n,n.timer=Rf(o,0,n.time);function o(d){n.state=Tu,n.timer.restart(i,n.delay,n.time),n.delay<=d&&i(d-n.delay)}function i(d){var m,g,p,x;if(n.state!==Tu)return l();for(m in a)if(x=a[m],x.name===n.name){if(x.state===co)return Eu(i);x.state===Pu?(x.state=uo,x.timer.stop(),x.on.call("interrupt",e,e.__data__,x.index,x.group),delete a[m]):+m<t&&(x.state=uo,x.timer.stop(),x.on.call("cancel",e,e.__data__,x.index,x.group),delete a[m])}if(Eu(function(){n.state===co&&(n.state=Pu,n.timer.restart(c,n.delay,n.time),c(d))}),n.state=Kl,n.on.call("start",e,e.__data__,n.index,n.group),n.state===Kl){for(n.state=co,s=new Array(p=n.tween.length),m=0,g=-1;m<p;++m)(x=n.tween[m].value.call(e,e.__data__,n.index,n.group))&&(s[++g]=x);s.length=g+1}}function c(d){for(var m=d<n.duration?n.ease.call(null,d/n.duration):(n.timer.restart(l),n.state=ql,1),g=-1,p=s.length;++g<p;)s[g].call(e,m);n.state===ql&&(n.on.call("end",e,e.__data__,n.index,n.group),l())}function l(){n.state=uo,n.timer.stop(),delete a[t];for(var d in a)return;delete e.__transition}}function $b(e,t){var n=e.__transition,a,s,o=!0,i;if(n){t=t==null?null:t+"";for(i in n){if((a=n[i]).name!==t){o=!1;continue}s=a.state>Kl&&a.state<ql,a.state=uo,a.timer.stop(),a.on.call(s?"interrupt":"cancel",e,e.__data__,a.index,a.group),delete n[i]}o&&delete e.__transition}}function Eb(e){return this.each(function(){$b(this,e)})}function Tb(e,t){var n,a;return function(){var s=Er(this,e),o=s.tween;if(o!==n){a=n=o;for(var i=0,c=a.length;i<c;++i)if(a[i].name===t){a=a.slice(),a.splice(i,1);break}}s.tween=a}}function Pb(e,t,n){var a,s;if(typeof n!="function")throw new Error;return function(){var o=Er(this,e),i=o.tween;if(i!==a){s=(a=i).slice();for(var c={name:t,value:n},l=0,d=s.length;l<d;++l)if(s[l].name===t){s[l]=c;break}l===d&&s.push(c)}o.tween=s}}function Rb(e,t){var n=this._id;if(e+="",arguments.length<2){for(var a=yr(this.node(),n).tween,s=0,o=a.length,i;s<o;++s)if((i=a[s]).name===e)return i.value;return null}return this.each((t==null?Tb:Pb)(n,e,t))}function Jc(e,t,n){var a=e._id;return e.each(function(){var s=Er(this,a);(s.value||(s.value={}))[t]=n.apply(this,arguments)}),function(s){return yr(s,a).value[t]}}function Lf(e,t){var n;return(typeof t=="number"?en:t instanceof gs?Mu:(n=gs(t))?(t=n,Mu):vb)(e,t)}function Ib(e){return function(){this.removeAttribute(e)}}function Lb(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Ab(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttribute(e);return i===s?null:i===a?o:o=t(a=i,n)}}function Ob(e,t,n){var a,s=n+"",o;return function(){var i=this.getAttributeNS(e.space,e.local);return i===s?null:i===a?o:o=t(a=i,n)}}function Fb(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttribute(e):(i=this.getAttribute(e),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function Db(e,t,n){var a,s,o;return function(){var i,c=n(this),l;return c==null?void this.removeAttributeNS(e.space,e.local):(i=this.getAttributeNS(e.space,e.local),l=c+"",i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c)))}}function Bb(e,t){var n=li(e),a=n==="transform"?kb:Lf;return this.attrTween(e,typeof t=="function"?(n.local?Db:Fb)(n,a,Jc(this,"attr."+e,t)):t==null?(n.local?Lb:Ib)(n):(n.local?Ob:Ab)(n,a,t))}function Wb(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Ub(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Vb(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&Ub(e,o)),n}return s._value=t,s}function Hb(e,t){var n,a;function s(){var o=t.apply(this,arguments);return o!==a&&(n=(a=o)&&Wb(e,o)),n}return s._value=t,s}function Yb(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var a=li(e);return this.tween(n,(a.local?Vb:Hb)(a,t))}function Gb(e,t){return function(){Qc(this,e).delay=+t.apply(this,arguments)}}function Xb(e,t){return t=+t,function(){Qc(this,e).delay=t}}function Kb(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?Gb:Xb)(t,e)):yr(this.node(),t).delay}function qb(e,t){return function(){Er(this,e).duration=+t.apply(this,arguments)}}function Qb(e,t){return t=+t,function(){Er(this,e).duration=t}}function Jb(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?qb:Qb)(t,e)):yr(this.node(),t).duration}function Zb(e,t){if(typeof t!="function")throw new Error;return function(){Er(this,e).ease=t}}function e1(e){var t=this._id;return arguments.length?this.each(Zb(t,e)):yr(this.node(),t).ease}function t1(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Er(this,e).ease=n}}function r1(e){if(typeof e!="function")throw new Error;return this.each(t1(this._id,e))}function n1(e){typeof e!="function"&&(e=xf(e));for(var t=this._groups,n=t.length,a=new Array(n),s=0;s<n;++s)for(var o=t[s],i=o.length,c=a[s]=[],l,d=0;d<i;++d)(l=o[d])&&e.call(l,l.__data__,d,o)&&c.push(l);return new Hr(a,this._parents,this._name,this._id)}function a1(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,a=t.length,s=n.length,o=Math.min(a,s),i=new Array(a),c=0;c<o;++c)for(var l=t[c],d=n[c],m=l.length,g=i[c]=new Array(m),p,x=0;x<m;++x)(p=l[x]||d[x])&&(g[x]=p);for(;c<a;++c)i[c]=t[c];return new Hr(i,this._parents,this._name,this._id)}function s1(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function o1(e,t,n){var a,s,o=s1(t)?Qc:Er;return function(){var i=o(this,e),c=i.on;c!==a&&(s=(a=c).copy()).on(t,n),i.on=s}}function i1(e,t){var n=this._id;return arguments.length<2?yr(this.node(),n).on.on(e):this.each(o1(n,e,t))}function l1(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function c1(){return this.on("end.remove",l1(this._id))}function d1(e){var t=this._name,n=this._id;typeof e!="function"&&(e=Gc(e));for(var a=this._groups,s=a.length,o=new Array(s),i=0;i<s;++i)for(var c=a[i],l=c.length,d=o[i]=new Array(l),m,g,p=0;p<l;++p)(m=c[p])&&(g=e.call(m,m.__data__,p,c))&&("__data__"in m&&(g.__data__=m.__data__),d[p]=g,di(d[p],t,n,p,d,yr(m,n)));return new Hr(o,this._parents,t,n)}function u1(e){var t=this._name,n=this._id;typeof e!="function"&&(e=gf(e));for(var a=this._groups,s=a.length,o=[],i=[],c=0;c<s;++c)for(var l=a[c],d=l.length,m,g=0;g<d;++g)if(m=l[g]){for(var p=e.call(m,m.__data__,g,l),x,b=yr(m,n),k=0,j=p.length;k<j;++k)(x=p[k])&&di(x,t,n,k,p,b);o.push(p),i.push(m)}return new Hr(o,i,t,n)}var p1=Ns.prototype.constructor;function m1(){return new p1(this._groups,this._parents)}function f1(e,t){var n,a,s;return function(){var o=va(this,e),i=(this.style.removeProperty(e),va(this,e));return o===i?null:o===n&&i===a?s:s=t(n=o,a=i)}}function Af(e){return function(){this.style.removeProperty(e)}}function h1(e,t,n){var a,s=n+"",o;return function(){var i=va(this,e);return i===s?null:i===a?o:o=t(a=i,n)}}function g1(e,t,n){var a,s,o;return function(){var i=va(this,e),c=n(this),l=c+"";return c==null&&(l=c=(this.style.removeProperty(e),va(this,e))),i===l?null:i===a&&l===s?o:(s=l,o=t(a=i,c))}}function x1(e,t){var n,a,s,o="style."+t,i="end."+o,c;return function(){var l=Er(this,e),d=l.on,m=l.value[o]==null?c||(c=Af(t)):void 0;(d!==n||s!==m)&&(a=(n=d).copy()).on(i,s=m),l.on=a}}function v1(e,t,n){var a=(e+="")=="transform"?wb:Lf;return t==null?this.styleTween(e,f1(e,a)).on("end.style."+e,Af(e)):typeof t=="function"?this.styleTween(e,g1(e,a,Jc(this,"style."+e,t))).each(x1(this._id,e)):this.styleTween(e,h1(e,a,t),n).on("end.style."+e,null)}function b1(e,t,n){return function(a){this.style.setProperty(e,t.call(this,a),n)}}function y1(e,t,n){var a,s;function o(){var i=t.apply(this,arguments);return i!==s&&(a=(s=i)&&b1(e,i,n)),a}return o._value=t,o}function w1(e,t,n){var a="style."+(e+="");if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;return this.tween(a,y1(e,t,n??""))}function k1(e){return function(){this.textContent=e}}function j1(e){return function(){var t=e(this);this.textContent=t??""}}function N1(e){return this.tween("text",typeof e=="function"?j1(Jc(this,"text",e)):k1(e==null?"":e+""))}function _1(e){return function(t){this.textContent=e.call(this,t)}}function S1(e){var t,n;function a(){var s=e.apply(this,arguments);return s!==n&&(t=(n=s)&&_1(s)),t}return a._value=e,a}function C1(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,S1(e))}function M1(){for(var e=this._name,t=this._id,n=Of(),a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)if(l=i[d]){var m=yr(l,t);di(l,e,n,d,i,{time:m.time+m.delay+m.duration,delay:0,duration:m.duration,ease:m.ease})}return new Hr(a,this._parents,e,n)}function z1(){var e,t,n=this,a=n._id,s=n.size();return new Promise(function(o,i){var c={value:i},l={value:function(){--s===0&&o()}};n.each(function(){var d=Er(this,a),m=d.on;m!==e&&(t=(e=m).copy(),t._.cancel.push(c),t._.interrupt.push(c),t._.end.push(l)),d.on=t}),s===0&&o()})}var $1=0;function Hr(e,t,n,a){this._groups=e,this._parents=t,this._name=n,this._id=a}function Of(){return++$1}var Ir=Ns.prototype;Hr.prototype={constructor:Hr,select:d1,selectAll:u1,selectChild:Ir.selectChild,selectChildren:Ir.selectChildren,filter:n1,merge:a1,selection:m1,transition:M1,call:Ir.call,nodes:Ir.nodes,node:Ir.node,size:Ir.size,empty:Ir.empty,each:Ir.each,on:i1,attr:Bb,attrTween:Yb,style:v1,styleTween:w1,text:N1,textTween:C1,remove:c1,tween:Rb,delay:Kb,duration:Jb,ease:e1,easeVarying:r1,end:z1,[Symbol.iterator]:Ir[Symbol.iterator]};function E1(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var T1={time:null,delay:0,duration:250,ease:E1};function P1(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function R1(e){var t,n;e instanceof Hr?(t=e._id,e=e._name):(t=Of(),(n=T1).time=qc(),e=e==null?null:e+"");for(var a=this._groups,s=a.length,o=0;o<s;++o)for(var i=a[o],c=i.length,l,d=0;d<c;++d)(l=i[d])&&di(l,e,t,d,i,n||P1(l,t));return new Hr(a,this._parents,e,t)}Ns.prototype.interrupt=Eb;Ns.prototype.transition=R1;function I1(e){var t=0,n=e.children,a=n&&n.length;if(!a)t=1;else for(;--a>=0;)t+=n[a].value;e.value=t}function L1(){return this.eachAfter(I1)}function A1(e,t){let n=-1;for(const a of this)e.call(t,a,++n,this);return this}function O1(e,t){for(var n=this,a=[n],s,o,i=-1;n=a.pop();)if(e.call(t,n,++i,this),s=n.children)for(o=s.length-1;o>=0;--o)a.push(s[o]);return this}function F1(e,t){for(var n=this,a=[n],s=[],o,i,c,l=-1;n=a.pop();)if(s.push(n),o=n.children)for(i=0,c=o.length;i<c;++i)a.push(o[i]);for(;n=s.pop();)e.call(t,n,++l,this);return this}function D1(e,t){let n=-1;for(const a of this)if(e.call(t,a,++n,this))return a}function B1(e){return this.eachAfter(function(t){for(var n=+e(t.data)||0,a=t.children,s=a&&a.length;--s>=0;)n+=a[s].value;t.value=n})}function W1(e){return this.eachBefore(function(t){t.children&&t.children.sort(e)})}function U1(e){for(var t=this,n=V1(t,e),a=[t];t!==n;)t=t.parent,a.push(t);for(var s=a.length;e!==n;)a.splice(s,0,e),e=e.parent;return a}function V1(e,t){if(e===t)return e;var n=e.ancestors(),a=t.ancestors(),s=null;for(e=n.pop(),t=a.pop();e===t;)s=e,e=n.pop(),t=a.pop();return s}function H1(){for(var e=this,t=[e];e=e.parent;)t.push(e);return t}function Y1(){return Array.from(this)}function G1(){var e=[];return this.eachBefore(function(t){t.children||e.push(t)}),e}function X1(){var e=this,t=[];return e.each(function(n){n!==e&&t.push({source:n.parent,target:n})}),t}function*K1(){var e=this,t,n=[e],a,s,o;do for(t=n.reverse(),n=[];e=t.pop();)if(yield e,a=e.children)for(s=0,o=a.length;s<o;++s)n.push(a[s]);while(n.length)}function Zc(e,t){e instanceof Map?(e=[void 0,e],t===void 0&&(t=J1)):t===void 0&&(t=Q1);for(var n=new Uo(e),a,s=[n],o,i,c,l;a=s.pop();)if((i=t(a.data))&&(l=(i=Array.from(i)).length))for(a.children=i,c=l-1;c>=0;--c)s.push(o=i[c]=new Uo(i[c])),o.parent=a,o.depth=a.depth+1;return n.eachBefore(ey)}function q1(){return Zc(this).eachBefore(Z1)}function Q1(e){return e.children}function J1(e){return Array.isArray(e)?e[1]:null}function Z1(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function ey(e){var t=0;do e.height=t;while((e=e.parent)&&e.height<++t)}function Uo(e){this.data=e,this.depth=this.height=0,this.parent=null}Uo.prototype=Zc.prototype={constructor:Uo,count:L1,each:A1,eachAfter:F1,eachBefore:O1,find:D1,sum:B1,sort:W1,path:U1,ancestors:H1,descendants:Y1,leaves:G1,links:X1,copy:q1,[Symbol.iterator]:K1};function ty(e){if(typeof e!="function")throw new Error;return e}function Ta(){return 0}function Pa(e){return function(){return e}}function ry(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function ny(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(a-t)/e.value;++c<l;)i=o[c],i.y0=n,i.y1=s,i.x0=t,i.x1=t+=i.value*d}function ay(e,t,n,a,s){for(var o=e.children,i,c=-1,l=o.length,d=e.value&&(s-n)/e.value;++c<l;)i=o[c],i.x0=t,i.x1=a,i.y0=n,i.y1=n+=i.value*d}var sy=(1+Math.sqrt(5))/2;function oy(e,t,n,a,s,o){for(var i=[],c=t.children,l,d,m=0,g=0,p=c.length,x,b,k=t.value,j,f,h,v,N,w,_;m<p;){x=s-n,b=o-a;do j=c[g++].value;while(!j&&g<p);for(f=h=j,w=Math.max(b/x,x/b)/(k*e),_=j*j*w,N=Math.max(h/_,_/f);g<p;++g){if(j+=d=c[g].value,d<f&&(f=d),d>h&&(h=d),_=j*j*w,v=Math.max(h/_,_/f),v>N){j-=d;break}N=v}i.push(l={value:j,dice:x<b,children:c.slice(m,g)}),l.dice?ny(l,n,a,s,k?a+=b*j/k:o):ay(l,n,a,k?n+=x*j/k:s,o),k-=j,m=g}return i}const Ff=function e(t){function n(a,s,o,i,c){oy(t,a,s,o,i,c)}return n.ratio=function(a){return e((a=+a)>1?a:1)},n}(sy);function iy(){var e=Ff,t=!1,n=1,a=1,s=[0],o=Ta,i=Ta,c=Ta,l=Ta,d=Ta;function m(p){return p.x0=p.y0=0,p.x1=n,p.y1=a,p.eachBefore(g),s=[0],t&&p.eachBefore(ry),p}function g(p){var x=s[p.depth],b=p.x0+x,k=p.y0+x,j=p.x1-x,f=p.y1-x;j<b&&(b=j=(b+j)/2),f<k&&(k=f=(k+f)/2),p.x0=b,p.y0=k,p.x1=j,p.y1=f,p.children&&(x=s[p.depth+1]=o(p)/2,b+=d(p)-x,k+=i(p)-x,j-=c(p)-x,f-=l(p)-x,j<b&&(b=j=(b+j)/2),f<k&&(k=f=(k+f)/2),e(p,b,k,j,f))}return m.round=function(p){return arguments.length?(t=!!p,m):t},m.size=function(p){return arguments.length?(n=+p[0],a=+p[1],m):[n,a]},m.tile=function(p){return arguments.length?(e=ty(p),m):e},m.padding=function(p){return arguments.length?m.paddingInner(p).paddingOuter(p):m.paddingInner()},m.paddingInner=function(p){return arguments.length?(o=typeof p=="function"?p:Pa(+p),m):o},m.paddingOuter=function(p){return arguments.length?m.paddingTop(p).paddingRight(p).paddingBottom(p).paddingLeft(p):m.paddingTop()},m.paddingTop=function(p){return arguments.length?(i=typeof p=="function"?p:Pa(+p),m):i},m.paddingRight=function(p){return arguments.length?(c=typeof p=="function"?p:Pa(+p),m):c},m.paddingBottom=function(p){return arguments.length?(l=typeof p=="function"?p:Pa(+p),m):l},m.paddingLeft=function(p){return arguments.length?(d=typeof p=="function"?p:Pa(+p),m):d},m}function Ba(e,t,n){this.k=e,this.x=t,this.y=n}Ba.prototype={constructor:Ba,scale:function(e){return e===1?this:new Ba(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Ba(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};Ba.prototype;const Ru={zfs:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},zfspool:{main:"#00BCD4",glow:"rgba(0, 188, 212, 0.3)",gradient:["#00BCD4","#00838F"]},nfs:{main:"#FF9800",glow:"rgba(255, 152, 0, 0.3)",gradient:["#FF9800","#E65100"]},pbs:{main:"#AB47BC",glow:"rgba(171, 71, 188, 0.3)",gradient:["#AB47BC","#7B1FA2"]},rbd:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},cephfs:{main:"#FFC107",glow:"rgba(255, 193, 7, 0.3)",gradient:["#FFC107","#FF8F00"]},lvm:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},lvmthin:{main:"#2196F3",glow:"rgba(33, 150, 243, 0.3)",gradient:["#2196F3","#1565C0"]},iscsi:{main:"#03A9F4",glow:"rgba(3, 169, 244, 0.3)",gradient:["#03A9F4","#0277BD"]},glusterfs:{main:"#FF5722",glow:"rgba(255, 87, 34, 0.3)",gradient:["#FF5722","#D84315"]},dir:{main:"#607D8B",glow:"rgba(96, 125, 139, 0.3)",gradient:["#607D8B","#37474F"]},default:{main:"#00E5FF",glow:"rgba(0, 229, 255, 0.3)",gradient:["#00E5FF","#00ADB5"]}};function ly(e,t){if(e>=95)return{main:"#FF4081",glow:"rgba(255, 64, 129, 0.4)",gradient:["#FF4081","#D32F2F"]};if(e>=85)return{main:"#FFB74D",glow:"rgba(255, 183, 77, 0.35)",gradient:["#FFB74D","#F57C00"]};const n=(t==null?void 0:t.toLowerCase())||"default";return Ru[n]||Ru.default}function Iu(e){if(e===0)return"0 B";const t=1024,n=["B","KB","MB","GB","TB","PB"],a=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,a)).toFixed(1))+" "+n[a]}function Lu({name:e,usedBytes:t,totalBytes:n,type:a,isShared:s=!1,connectedNodes:o=[],nodeName:i,isOffline:c=!1,width:l=120,height:d=180,animationDelay:m=0,onClick:g,onHover:p}){const x=u.useRef(null),b=u.useRef(0),k=u.useRef([]),j=u.useRef(0),[f,h]=u.useState(!1),v=n>0?t/n*100:0,[N,w]=u.useState(0),[_,z]=u.useState(!1),[$,P]=u.useState(!0),D=u.useRef(null),I=u.useRef(0),A=1200,re=500;u.useEffect(()=>{const Q=setTimeout(()=>{z(!0)},m);return()=>clearTimeout(Q)},[m]),u.useEffect(()=>{if(!_)return;I.current=N,D.current=null;const Q=I.current,S=v;if(Math.abs(Q-S)<.1){w(S);return}const Se=$?A:re,te=Me=>{D.current===null&&(D.current=Me);const X=Me-D.current,me=Math.min(X/Se,1),Z=(T=>1-Math.pow(1-T,3))(me),ae=Q+(S-Q)*Z;w(ae),me<1?requestAnimationFrame(te):$&&P(!1)};requestAnimationFrame(te)},[v,_]);const U=N,R=v>=85,G=v>=95,L=ly(v,a),V=u.useCallback(Q=>{const S=[];for(let Se=0;Se<Q;Se++)S.push({x:Math.random()*l*.6+l*.2,y:d+Math.random()*d,radius:Math.random()*4+2,speed:Math.random()*1.5+.5,wobbleOffset:Math.random()*Math.PI*2,wobbleSpeed:Math.random()*.05+.02});return S},[l,d]);u.useEffect(()=>{const Q=x.current;if(!Q)return;const S=Q.getContext("2d");if(!S)return;const Se=window.devicePixelRatio||1;Q.width=l*Se,Q.height=d*Se,S.scale(Se,Se);const te=R?15:5;k.current=V(te);const Me=X=>{X-j.current,j.current=X;const me=X*.001;S.clearRect(0,0,l,d);const Ce=8,Z=Ce,ae=Ce+20,T=l-Ce*2,C=d-Ce*2-40,J=8,oe=c?.05:U/100,be=C*oe,W=ae+C-be,le=S.createLinearGradient(Z,ae,Z,ae+C);le.addColorStop(0,"#0a0a12"),le.addColorStop(.5,"#050510"),le.addColorStop(1,"#0a0a12"),S.fillStyle=le,S.beginPath(),S.roundRect(Z,ae,T,C,J),S.fill(),S.save(),S.beginPath(),S.roundRect(Z,ae,T,C,J),S.clip();const he=12,ue=he*Math.sqrt(3);S.strokeStyle="rgba(0, 240, 255, 0.06)",S.lineWidth=.5;for(let se=0;se<C/ue+1;se++)for(let ce=0;ce<T/(he*1.5)+1;ce++){const je=se%2*he*.75,ye=Z+ce*he*1.5+je,Ee=ae+se*ue*.5;S.beginPath();for(let Ze=0;Ze<6;Ze++){const wt=Math.PI/3*Ze+Math.PI/6,pe=ye+he*.4*Math.cos(wt),He=Ee+he*.4*Math.sin(wt);Ze===0?S.moveTo(pe,He):S.lineTo(pe,He)}S.closePath(),S.stroke()}S.restore();const we=ae+me*30%C;S.save(),S.beginPath(),S.roundRect(Z,ae,T,C,J),S.clip();const Ae=S.createLinearGradient(Z,we-15,Z,we+5);Ae.addColorStop(0,"transparent"),Ae.addColorStop(.5,"rgba(0, 240, 255, 0.15)"),Ae.addColorStop(1,"transparent"),S.fillStyle=Ae,S.fillRect(Z,we-15,T,20),S.restore(),S.strokeStyle="rgba(0, 240, 255, 0.2)",S.lineWidth=1;for(let se=0;se<=10;se++){const ce=ae+C-C*se/10,je=se%5===0?12:6,ye=se%5===0?.4:.2;S.strokeStyle=`rgba(0, 240, 255, ${ye})`,S.beginPath(),S.moveTo(Z+2,ce),S.lineTo(Z+2+je,ce),S.stroke(),S.beginPath(),S.moveTo(Z+T-2,ce),S.lineTo(Z+T-2-je,ce),S.stroke()}const Ge=me*50%C;for(let se=0;se<3;se++){const ce=ae+(Ge+se*C/3)%C,je=.3+Math.sin(me*3+se)*.2;S.beginPath(),S.strokeStyle=`rgba(0, 240, 255, ${je})`,S.lineWidth=2,S.moveTo(Z,ce),S.lineTo(Z+4,ce),S.stroke(),S.beginPath(),S.moveTo(Z+T,ce),S.lineTo(Z+T-4,ce),S.stroke()}if(!c&&oe>0){const se=S.createLinearGradient(0,W,0,ae+C);se.addColorStop(0,L.gradient[0]),se.addColorStop(1,L.gradient[1]);const ce=R?6:3,je=.05,ye=R?.1:.05,Ee=Math.PI/3;S.save(),S.beginPath(),S.rect(Z,ae,T,C),S.clip(),S.fillStyle=se,S.beginPath(),S.moveTo(Z,ae+C);for(let pe=0;pe<=T;pe+=2){const He=Math.sin(pe*je+me*ye*60)*ce,Fe=Math.sin(pe*je*1.5+me*ye*40+Ee)*(ce*.5),qe=W+He+Fe;pe===0?S.moveTo(Z+pe,qe):S.lineTo(Z+pe,qe)}S.lineTo(Z+T,ae+C),S.lineTo(Z,ae+C),S.closePath(),S.fill(),S.strokeStyle=L.glow,S.lineWidth=2,S.shadowColor=L.main,S.shadowBlur=10,S.beginPath();for(let pe=0;pe<=T;pe+=2){const He=Math.sin(pe*je+me*ye*60)*ce,Fe=Math.sin(pe*je*1.5+me*ye*40+Ee)*(ce*.5),qe=W+He+Fe;pe===0?S.moveTo(Z+pe,qe):S.lineTo(Z+pe,qe)}S.stroke(),S.shadowBlur=0,k.current.forEach((pe,He)=>{if(pe.y>W&&pe.y<ae+C){const Fe=Math.sin(me*pe.wobbleSpeed*60+pe.wobbleOffset)*3;S.fillStyle=`rgba(255, 255, 255, ${.3+Math.random()*.2})`,S.beginPath(),S.arc(pe.x+Fe,pe.y,pe.radius,0,Math.PI*2),S.fill(),S.fillStyle="rgba(255, 255, 255, 0.5)",S.beginPath(),S.arc(pe.x+Fe-pe.radius*.3,pe.y-pe.radius*.3,pe.radius*.3,0,Math.PI*2),S.fill()}pe.y-=pe.speed*(R?2:1),pe.y<W-10&&(pe.y=ae+C+Math.random()*20,pe.x=Z+Math.random()*T*.6+T*.2)}),S.restore();const Ze=3;for(let pe=0;pe<Ze;pe++){const He=Z+T*(pe+.5)/Ze,Fe=me*2+pe*Math.PI*.7,qe=(Math.sin(Fe)*.5+.5)*.3;if(qe>.1){const $e=S.createLinearGradient(He-8,W,He+8,ae+C);$e.addColorStop(0,"rgba(255, 255, 255, 0)"),$e.addColorStop(.3,`rgba(255, 255, 255, ${qe})`),$e.addColorStop(.7,`rgba(255, 255, 255, ${qe*.5})`),$e.addColorStop(1,"rgba(255, 255, 255, 0)"),S.fillStyle=$e,S.fillRect(He-8,W,16,be)}}const wt=Math.floor(oe*8);for(let pe=0;pe<wt;pe++){const He=pe*137.5,Fe=Z+10+He*7%(T-20),$e=W+10+He*13%(be-20)+Math.sin(me*2+He)*5,Qt=.4+Math.sin(me*3+He)*.3;if(S.fillStyle=`rgba(255, 255, 255, ${Qt})`,S.beginPath(),S.arc(Fe,$e,1.5,0,Math.PI*2),S.fill(),pe>0&&pe%3===0){const _t=(pe-1)*137.5,Bt=Z+10+_t*7%(T-20),Jt=W+10+_t*13%(be-20)+Math.sin(me*2+_t)*5,wr=Math.sqrt((Fe-Bt)**2+($e-Jt)**2);wr<30&&(S.strokeStyle=`rgba(255, 255, 255, ${.1*(1-wr/30)})`,S.lineWidth=.5,S.beginPath(),S.moveTo(Fe,$e),S.lineTo(Bt,Jt),S.stroke())}}if(R){for(let pe=0;pe<8;pe++){const He=Z+T*.15+Math.random()*T*.7,Fe=W-Math.random()*25,qe=Math.random()*4+1;S.fillStyle=`rgba(255, 255, 255, ${.15+Math.random()*.15})`,S.beginPath(),S.arc(He,Fe,qe,0,Math.PI*2),S.fill()}Math.sin(me*10)>.7&&(S.fillStyle="rgba(255, 100, 0, 0.05)",S.fillRect(Z,ae,T,C))}}const Ve=c||G?"#ff0040":L.main,Ne=G?Math.sin(me*5)*.3+.7:1;S.strokeStyle=Ve,S.lineWidth=3,S.shadowColor=Ve,S.shadowBlur=f?20:12*Ne,S.beginPath(),S.roundRect(Z,ae,T,C,J),S.stroke(),S.shadowBlur=0,S.strokeStyle=`${Ve}60`,S.lineWidth=1,S.beginPath(),S.roundRect(Z+3,ae+3,T-6,C-6,J-2),S.stroke();const ge=16,ke=3;S.strokeStyle=Ve,S.lineWidth=ke,S.shadowColor=Ve,S.shadowBlur=8,S.beginPath(),S.moveTo(Z-2,ae+ge),S.lineTo(Z-2,ae-2),S.lineTo(Z+ge,ae-2),S.stroke(),S.beginPath(),S.moveTo(Z+T-ge,ae-2),S.lineTo(Z+T+2,ae-2),S.lineTo(Z+T+2,ae+ge),S.stroke(),S.beginPath(),S.moveTo(Z-2,ae+C-ge),S.lineTo(Z-2,ae+C+2),S.lineTo(Z+ge,ae+C+2),S.stroke(),S.beginPath(),S.moveTo(Z+T-ge,ae+C+2),S.lineTo(Z+T+2,ae+C+2),S.lineTo(Z+T+2,ae+C-ge),S.stroke(),S.shadowBlur=0;const Y=2+(Math.sin(me*4)*.5+.5);if(S.fillStyle=Ve,S.shadowColor=Ve,S.shadowBlur=6,[[Z-2,ae-2],[Z+T+2,ae-2],[Z-2,ae+C+2],[Z+T+2,ae+C+2]].forEach(([se,ce])=>{S.beginPath(),S.arc(se,ce,Y,0,Math.PI*2),S.fill()}),S.shadowBlur=0,!c){const ce=Z+T+6,je=C,ye=je*(U/100);S.fillStyle="rgba(0, 20, 40, 0.8)",S.fillRect(ce,ae,4,je);const Ee=S.createLinearGradient(0,ae+je-ye,0,ae+je);Ee.addColorStop(0,L.main),Ee.addColorStop(1,L.gradient[1]),S.fillStyle=Ee,S.fillRect(ce,ae+je-ye,4,ye),S.strokeStyle=`${Ve}40`,S.lineWidth=1,S.strokeRect(ce,ae,4,je)}if(c){S.strokeStyle="#ff0040",S.lineWidth=2,S.beginPath();const se=Z+T*.3,ce=ae+C*.3;S.moveTo(se,ce),S.lineTo(se+10,ce+15),S.lineTo(se+5,ce+25),S.lineTo(se+15,ce+40),S.stroke(),S.beginPath(),S.moveTo(se+10,ce+15),S.lineTo(se+20,ce+20),S.stroke()}b.current=requestAnimationFrame(Me)};return b.current=requestAnimationFrame(Me),()=>{cancelAnimationFrame(b.current)}},[l,d,U,R,G,c,L,f,V]);const B=()=>{h(!0),p==null||p(!0)},K=()=>{h(!1),p==null||p(!1)};return r.jsxs("div",{className:`liquid-tank ${s?"shared":"local"} ${G?"critical":""} ${c?"offline":""}`,onClick:g,onMouseEnter:B,onMouseLeave:K,children:[r.jsxs("div",{className:"tank-header",children:[r.jsx("div",{className:`tank-name-tag ${c?"offline":""}`,style:c?void 0:{color:L.main,background:`${L.main}15`,borderColor:`${L.main}50`},children:e}),r.jsx("div",{className:`tank-type-tag type-${a.toLowerCase()}`,children:a})]}),r.jsx("canvas",{ref:x,style:{width:l,height:d-50,display:"block"}}),r.jsxs("div",{className:"tank-stats",children:[r.jsx("div",{className:`tank-percent ${G?"critical":R?"warning":""}`,style:{color:c?"#FF4081":L.main,textShadow:c?"none":`0 0 10px ${L.glow}`},children:c?"OFFLINE":`${v.toFixed(1)}%`}),r.jsxs("div",{className:"tank-capacity",children:[Iu(t)," / ",Iu(n)]})]}),s&&o.length>0&&r.jsx("div",{className:"tank-nodes",children:o.map((Q,S)=>r.jsx("span",{className:"node-tag",children:Q},S))}),!s&&i&&r.jsx("div",{className:"tank-node-label",children:i}),r.jsx("style",{children:`
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

      `})]})}function cy({percent:e,usedBytes:t,totalBytes:n,duration:a=1200}){const[s,o]=u.useState(0),i=u.useRef(0),c=u.useRef(null),l=u.useRef(0);u.useEffect(()=>{l.current=s,c.current=null;const x=b=>{c.current===null&&(c.current=b);const k=b-c.current,j=Math.min(k/a,1),f=j===1?1:1-Math.pow(2,-10*j),h=l.current+(e-l.current)*f;o(h),j<1&&(i.current=requestAnimationFrame(x))};return i.current=requestAnimationFrame(x),()=>cancelAnimationFrame(i.current)},[e,a]);const m=s>=90?"#ff0040":s>=70?"#ff6b00":"#00f0ff",g=40,p=[];for(let x=0;x<g;x++){const b=x/g*100,k=b<s,j=x%4===0;p.push({index:x,isActive:k,isMajor:j,percent:b})}return r.jsxs("div",{className:"scifi-indicator",children:[r.jsx("div",{className:"indicator-left",children:r.jsxs("div",{className:"indicator-bytes",children:[r.jsx("span",{className:"used",style:{color:m},children:Re(t)}),r.jsx("span",{className:"separator",children:"/"}),r.jsx("span",{className:"total",children:Re(n)})]})}),r.jsxs("div",{className:"indicator-bar-container",children:[r.jsxs("div",{className:"indicator-bar",children:[r.jsx("div",{className:"segments-container",children:p.map(x=>r.jsx("div",{className:`segment ${x.isActive?"active":""} ${x.isMajor?"major":""}`,style:{"--segment-color":x.isActive?m:"rgba(60, 80, 100, 0.3)",animationDelay:x.isActive?`${x.index*20}ms`:"0ms"}},x.index))}),r.jsx("div",{className:"indicator-glow",style:{width:`${s}%`,background:`linear-gradient(90deg, transparent, ${m}40)`,boxShadow:`0 0 20px ${m}60, 0 0 40px ${m}30`}}),r.jsx("div",{className:"indicator-pointer",style:{left:`${s}%`,borderColor:`transparent transparent ${m} transparent`,filter:`drop-shadow(0 0 4px ${m})`}}),r.jsx("div",{className:"indicator-scanline"})]}),r.jsx("div",{className:"indicator-accent",style:{background:m}})]}),r.jsx("div",{className:"indicator-right",children:r.jsxs("div",{className:"indicator-percent",style:{color:m},children:[s.toFixed(1),r.jsx("span",{className:"percent-symbol",children:"%"})]})})]})}const dy=["rbd","cephfs","nfs","iscsi","glusterfs","zfs-over-iscsi","pbs"];function uy({vm:e,position:t,onClose:n}){var f,h,v,N,w;const{t:a,language:s}=Le(),o=u.useRef(null),[i,c]=u.useState(null),d=e.status==="running"?"#00ff88":"#ff6b00",m=e.type==="lxc",g=e.disks||[],p=s==="zh-TW",x=((f=e.disk)==null?void 0:f.total_bytes)>0?e.disk.used_bytes/e.disk.total_bytes*100:0,b=x>=90?"#ff0040":x>=70?"#ff6b00":"#00f0ff",k=p?e.status==="running"?"運作中":e.status==="stopped"?"已停止":e.status.toUpperCase():e.status.toUpperCase();u.useEffect(()=>{if(!o.current)return;const z=o.current.getBoundingClientRect(),$=z.width,P=z.height,D=window.innerWidth,I=window.innerHeight,A=15,{cellX:re,cellY:U,cellTop:R,cellBottom:G,cellLeft:L,cellRight:V}=t;let B=0,K=0,Q=re,S=U;V+A+$<D?(B=V+A,K=Math.max(A,Math.min(I-P-A,U-P/2)),Q=V,S=U):L-A-$>0?(B=L-A-$,K=Math.max(A,Math.min(I-P-A,U-P/2)),Q=L,S=U):R-A-P>0?(B=Math.max(A,Math.min(D-$-A,re-$/2)),K=R-A-P,Q=re,S=R):(B=Math.max(A,Math.min(D-$-A,re-$/2)),K=G+A,Q=re,S=G);let Se=B,te=K+P/2;B>V?(Se=B,te=Math.max(K,Math.min(K+P,S))):B+$<L?(Se=B+$,te=Math.max(K,Math.min(K+P,S))):K+P<R?(Se=Math.max(B,Math.min(B+$,Q)),te=K+P):(Se=Math.max(B,Math.min(B+$,Q)),te=K),c({x:B,y:K,lineStart:{x:Q,y:S},lineEnd:{x:Se,y:te}})},[t]);const j=i?(()=>{const _=i.lineEnd.x-i.lineStart.x,z=i.lineEnd.y-i.lineStart.y,$=Math.sqrt(_*_+z*z),P=Math.atan2(z,_)*(180/Math.PI);return{width:`${$}px`,transform:`rotate(${P}deg)`,left:`${i.lineStart.x}px`,top:`${i.lineStart.y}px`}})():null;return r.jsxs(r.Fragment,{children:[i&&j&&r.jsx("div",{className:"popup-connector-line",style:j}),r.jsxs("div",{ref:o,className:"vm-disk-popup",style:{left:(i==null?void 0:i.x)??-9999,top:(i==null?void 0:i.y)??-9999,opacity:i?1:0,transform:"none"},onClick:_=>_.stopPropagation(),children:[r.jsxs("div",{className:"popup-header",children:[r.jsxs("div",{className:"popup-title",children:[r.jsx("span",{className:"vm-icon",children:e.type==="qemu"?"VM":"CT"}),r.jsx("span",{className:"vm-name",children:e.name}),r.jsxs("span",{className:"vm-id",children:["#",e.vmid]})]}),r.jsx("button",{className:"popup-close",onClick:n,children:"×"})]}),r.jsxs("div",{className:"popup-status",children:[r.jsx("span",{className:"status-dot",style:{background:d}}),r.jsx("span",{className:"status-text",style:{color:d},children:k}),r.jsxs("span",{className:"node-info",children:["@ ",e.node]})]}),r.jsxs("div",{className:"popup-section",children:[r.jsxs("div",{className:"section-label",children:[p?"磁碟":"DISK",g.length>1?p?"":"S":""," (",g.length||1,")"]}),g.length>0?r.jsx("div",{className:"disk-list",children:g.map((_,z)=>r.jsxs("div",{className:"disk-item",children:[r.jsxs("div",{className:"disk-device",children:[r.jsx("span",{className:"device-name",children:_.device}),r.jsx("span",{className:"device-format",children:_.format})]}),r.jsxs("div",{className:"disk-info",children:[r.jsx("span",{className:"disk-storage",children:_.storage}),r.jsx("span",{className:"disk-size",children:Re(_.size)})]})]},z))}):r.jsx("div",{className:"disk-summary",children:r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:p?"配置容量":"Allocated"}),r.jsx("span",{className:"disk-value",children:Re(((h=e.disk)==null?void 0:h.total_bytes)||0)})]})}),m&&r.jsxs("div",{className:"disk-usage-section",children:[r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:p?"已使用":"Used"}),r.jsx("span",{className:"disk-value",children:Re(((v=e.disk)==null?void 0:v.used_bytes)||0)})]}),r.jsxs("div",{className:"disk-summary-row",children:[r.jsx("span",{className:"disk-label",children:p?"使用率":"Usage"}),r.jsxs("span",{className:"disk-value",style:{color:b},children:[x.toFixed(1),"%"]})]}),r.jsx("div",{className:"disk-bar",children:r.jsx("div",{className:"disk-bar-fill",style:{width:`${x}%`,background:b}})})]})]}),r.jsxs("div",{className:"popup-metrics",children:[r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:"CPU"}),r.jsxs("span",{className:"metric-value",children:[((N=e.cpu)==null?void 0:N.cores)||0," ",p?"核心":"cores"]})]}),r.jsxs("div",{className:"metric-item",children:[r.jsx("span",{className:"metric-label",children:p?"記憶體":"Memory"}),r.jsx("span",{className:"metric-value",children:Re(((w=e.memory)==null?void 0:w.total_bytes)||0)})]})]})]})]})}function py({data:e,width:t,height:n,isInitialLoad:a=!1,onVMClick:s}){const[o,i]=u.useState(null),c=u.useRef(null),l=u.useMemo(()=>{if(e.length===0||t===0||n===0)return[];const d={name:"root",children:e.map(x=>({name:x.vm.name,value:x.value,vm:x.vm}))},m=Zc(d).sum(x=>x.value||0).sort((x,b)=>(b.value||0)-(x.value||0));return iy().size([t,n]).paddingInner(3).paddingOuter(2).round(!0).tile(Ff.ratio(1))(m).leaves().map(x=>({x:x.x0,y:x.y0,width:x.x1-x.x0,height:x.y1-x.y0,vm:x.data.vm,value:x.value||0}))},[e,t,n]);return l.length===0?r.jsx("div",{className:"no-storage",children:"No VM disk data available"}):r.jsxs("svg",{ref:c,width:t,height:n,className:"d3-treemap",children:[r.jsxs("defs",{children:[r.jsx("pattern",{id:"scanlinePattern",width:"4",height:"4",patternUnits:"userSpaceOnUse",children:r.jsx("line",{x1:"0",y1:"0",x2:"4",y2:"0",stroke:"rgba(0, 255, 200, 0.5)",strokeWidth:"1"})}),r.jsxs("linearGradient",{id:"energyPulse",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(0, 255, 200, 0.8)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 255, 200, 0.8);rgba(0, 200, 255, 0.8);rgba(180, 100, 255, 0.8);rgba(0, 255, 200, 0.8)",dur:"3s",repeatCount:"indefinite"})}),r.jsx("stop",{offset:"100%",stopColor:"rgba(0, 200, 255, 0.4)",children:r.jsx("animate",{attributeName:"stop-color",values:"rgba(0, 200, 255, 0.4);rgba(180, 100, 255, 0.4);rgba(0, 255, 200, 0.4);rgba(0, 200, 255, 0.4)",dur:"3s",repeatCount:"indefinite"})})]}),r.jsxs("filter",{id:"nodeGlow",x:"-50%",y:"-50%",width:"200%",height:"200%",children:[r.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),l.map((d,m)=>{var P;const g=((P=d.vm.disk)==null?void 0:P.total_bytes)||1,p=d.vm.status==="running",x=o===`${d.vm.node}-${d.vm.vmid}`,b=d.width>15&&d.height>12,k=d.width>40&&d.height>25,j=d.width>50&&d.height>40,f=d.width>60&&d.height>55,h=Math.max(...l.map(D=>D.value)),v=d.value/h,N=()=>p?v>.7?"rgba(0, 255, 200, 0.15)":v>.4?"rgba(0, 200, 255, 0.12)":v>.2?"rgba(180, 0, 255, 0.1)":"rgba(255, 0, 180, 0.08)":"rgba(30, 35, 50, 0.6)",w=()=>p?v>.7?"rgba(0, 255, 200, 0.9)":v>.4?"rgba(0, 200, 255, 0.85)":v>.2?"rgba(180, 100, 255, 0.8)":"rgba(255, 80, 200, 0.75)":"rgba(60, 70, 90, 0.5)",_=()=>p?v>.7?"rgba(0, 255, 200, 0.4)":v>.4?"rgba(0, 200, 255, 0.35)":v>.2?"rgba(180, 100, 255, 0.3)":"rgba(255, 80, 200, 0.25)":"transparent",z=()=>p?v>.7?"rgba(0, 255, 220, 1)":v>.4?"rgba(100, 220, 255, 1)":v>.2?"rgba(200, 160, 255, 1)":"rgba(255, 150, 220, 1)":"rgba(100, 110, 130, 0.7)",$=a?m*30:0;return r.jsxs("g",{transform:`translate(${d.x}, ${d.y})`,onMouseEnter:()=>i(`${d.vm.node}-${d.vm.vmid}`),onMouseLeave:()=>i(null),onClick:D=>{if(D.stopPropagation(),s){const I=D.clientX,A=D.clientY,re=d.width/2,U=d.height/2;s(d.vm,{cellX:I,cellY:A,cellWidth:d.width,cellHeight:d.height,cellTop:A-U,cellBottom:A+U,cellLeft:I-re,cellRight:I+re})}},className:a?"treemap-node-enter":"",style:{cursor:"pointer","--anim-delay":`${$}ms`},children:[r.jsx("title",{children:`${d.vm.name} (#${d.vm.vmid})
Status: ${d.vm.status}
Allocated: ${Re(g)}`}),p&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:_(),strokeWidth:3,rx:4,ry:4,className:"glow-pulse",style:{filter:"blur(4px)",opacity:x?1:.6}}),p&&d.width>30&&d.height>25&&r.jsx("rect",{width:d.width,height:d.height,fill:"none",stroke:w(),strokeWidth:1,strokeDasharray:"8 4",rx:4,ry:4,className:"data-stream",style:{opacity:.5}}),r.jsx("rect",{className:"main-cell",width:d.width,height:d.height,fill:N(),stroke:w(),strokeWidth:x?2:1,rx:4,ry:4,style:{filter:x?`drop-shadow(0 0 12px ${_()}) drop-shadow(0 0 4px ${w()})`:`drop-shadow(0 0 3px ${_()})`,transition:"all 0.2s ease"}}),p&&d.width>20&&d.height>15&&r.jsx("line",{x1:2,y1:2,x2:Math.min(d.width*.4,30),y2:2,stroke:w(),strokeWidth:1,opacity:.6}),p&&d.width>50&&d.height>40&&r.jsxs(r.Fragment,{children:[r.jsx("path",{d:`M ${d.width-8} ${d.height-2} L ${d.width-2} ${d.height-2} L ${d.width-2} ${d.height-8}`,fill:"none",stroke:w(),strokeWidth:1,opacity:.4,className:"circuit-line"}),r.jsx("circle",{cx:d.width-5,cy:d.height-5,r:2,fill:w(),opacity:.8,className:"energy-dot"})]}),p&&r.jsx("rect",{x:0,y:0,width:d.width,height:d.height,fill:"url(#scanlinePattern)",opacity:.15,rx:4,ry:4,style:{pointerEvents:"none"}}),b&&!k&&r.jsx("text",{x:d.width/2,y:d.height/2,textAnchor:"middle",dominantBaseline:"middle",fill:z(),fontSize:Math.min(10,Math.max(7,d.width/6)),fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:p?`0 0 6px ${_()}`:"none"},children:d.vm.name.slice(0,Math.max(1,Math.min(3,Math.floor(d.width/10))))}),k&&(()=>{const D=d.width,I=d.height,A=Math.min(16,Math.max(9,Math.min(D/8,I/5))),re=Math.min(12,Math.max(8,Math.min(D/10,I/7))),U=Math.min(10,Math.max(7,Math.min(D/12,I/8))),R=Math.floor((D-8)/(A*.6)),G=d.vm.name.length>R?d.vm.name.slice(0,Math.max(1,R-1))+"…":d.vm.name,L=A+(j?re+2:0)+(f?U+2:0),V=(I-L)/2+A/2;return r.jsxs(r.Fragment,{children:[r.jsx("text",{x:D/2,y:V,textAnchor:"middle",dominantBaseline:"middle",fill:z(),fontSize:A,fontFamily:"var(--font-mono)",fontWeight:600,style:{textShadow:p?`0 0 8px ${_()}`:"none",filter:p?`drop-shadow(0 0 2px ${_()})`:"none"},children:G}),j&&r.jsx("text",{x:D/2,y:V+A*.8+2,textAnchor:"middle",dominantBaseline:"middle",fill:p?"rgba(180, 200, 220, 0.8)":"rgba(100, 110, 130, 0.6)",fontSize:re,fontFamily:"var(--font-mono)",children:Re(g)}),f&&r.jsxs("text",{x:D/2,y:V+A*.8+(j?re*.8+4:2),textAnchor:"middle",dominantBaseline:"middle",fill:z(),fontSize:U,fontFamily:"var(--font-mono)",fontWeight:700,style:{filter:p?`drop-shadow(0 0 3px ${_()})`:"none"},children:["#",d.vm.vmid]})]})})()]},`${d.vm.node}-${d.vm.vmid}`)})]})}function my({vmDiskData:e,totals:t,storages:n}){const{t:a,language:s}=Le(),o=u.useRef(null),[i,c]=u.useState({width:0,height:0}),[l,d]=u.useState(!0),[m,g]=u.useState(null);u.useEffect(()=>{const x=()=>{if(o.current){const k=o.current.getBoundingClientRect();c({width:k.width,height:k.height})}};x();const b=new ResizeObserver(x);return o.current&&b.observe(o.current),()=>b.disconnect()},[]),u.useEffect(()=>{if(l&&e.length>0){const x=setTimeout(()=>{d(!1)},e.length*30+500);return()=>clearTimeout(x)}},[l,e.length]);const p=u.useMemo(()=>e.map(x=>{var b;return{vm:x,value:((b=x.disk)==null?void 0:b.total_bytes)||0}}).filter(x=>x.value>0),[e]);return r.jsxs("div",{className:"treemap-container",children:[r.jsxs("div",{className:"treemap-header",children:[r.jsx("h3",{className:"treemap-title font-display",children:"VM DISK ALLOCATION TREEMAP"}),r.jsxs("div",{className:"treemap-stats",children:[r.jsxs("span",{children:[e.length," VMs"]}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{children:["Total Allocated: ",Re(e.reduce((x,b)=>{var k;return x+(((k=b.disk)==null?void 0:k.total_bytes)||0)},0))]})]})]}),r.jsx("div",{ref:o,className:"treemap-grid",onClick:()=>g(null),children:i.width>0&&i.height>0&&r.jsx(py,{data:p,width:i.width,height:i.height,isInitialLoad:l,onVMClick:(x,b)=>g({vm:x,position:b})})}),m&&r.jsx(uy,{vm:m.vm,position:m.position,onClose:()=>g(null)}),r.jsxs("div",{className:"treemap-legend",children:[r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color running"}),r.jsx("span",{children:a("vm.running")})]}),r.jsxs("div",{className:"legend-item",children:[r.jsx("span",{className:"legend-color stopped"}),r.jsx("span",{children:a("vm.stopped")})]}),r.jsx("div",{className:"legend-note",children:s==="zh-TW"?"方塊大小 = 磁碟配置容量":"Block size = Disk allocation"})]})]})}function fy({storage:e,position:t,sourcePos:n,onClose:a,onManage:s}){const{t:o}=Le();if(!e||!t)return null;const i=e.totalBytes>0?e.usedBytes/e.totalBytes*100:0,c=n||{x:t.x-20,y:t.y+50},l={x:t.x,y:t.y+50};return r.jsxs(r.Fragment,{children:[r.jsxs("svg",{className:"tooltip-connector",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:999},children:[r.jsx("defs",{children:r.jsxs("linearGradient",{id:"lineGradient",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[r.jsx("stop",{offset:"0%",stopColor:"rgba(80, 140, 180, 0)",stopOpacity:"0"}),r.jsx("stop",{offset:"30%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"}),r.jsx("stop",{offset:"100%",stopColor:"rgba(80, 160, 200, 0.6)",stopOpacity:"1"})]})}),r.jsx("line",{x1:c.x,y1:c.y,x2:l.x,y2:l.y,stroke:"url(#lineGradient)",strokeWidth:"1",className:"connector-line"}),r.jsx("circle",{cx:l.x,cy:l.y,r:"3",fill:"rgba(80, 180, 200, 0.7)",className:"connector-dot"})]}),r.jsxs("div",{className:"storage-tooltip",style:{left:t.x,top:t.y},children:[r.jsx("div",{className:"tooltip-grid"}),r.jsx("div",{className:"tooltip-scan-line"}),r.jsx("div",{className:"tooltip-corner tl"}),r.jsx("div",{className:"tooltip-corner tr"}),r.jsx("div",{className:"tooltip-corner bl"}),r.jsx("div",{className:"tooltip-corner br"}),r.jsxs("div",{className:"tooltip-header",children:[r.jsx("span",{className:"tooltip-name",children:e.name}),r.jsx("button",{className:"tooltip-close",onClick:a,children:"×"})]}),r.jsx("div",{className:"tooltip-type-row",children:r.jsx("span",{className:`tooltip-badge ${e.isShared?"shared":"local"}`,children:e.isShared?o("storage.filter_shared"):o("storage.filter_local")})}),r.jsxs("div",{className:"tooltip-content",children:[r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("table.type"),":"]}),r.jsx("span",{children:e.type.toUpperCase()})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("storage.content"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.content.map((d,m)=>r.jsx("span",{className:"tooltip-label",children:d},m))})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.used"),":"]}),r.jsx("span",{children:Re(e.usedBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.total"),":"]}),r.jsx("span",{children:Re(e.totalBytes)})]}),r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("metric.usage"),":"]}),r.jsx("span",{className:`text-${ze(i)}`,children:ot(i,1)})]}),e.isShared&&e.connectedNodes.length>0&&r.jsxs("div",{className:"tooltip-row",children:[r.jsxs("span",{children:[o("cluster.nodes"),":"]}),r.jsx("div",{className:"tooltip-labels",children:e.connectedNodes.map((d,m)=>r.jsx("span",{className:"tooltip-label node",children:d},m))})]})]}),s&&r.jsx("div",{className:"tooltip-actions",children:r.jsxs("button",{className:"tooltip-action-btn",onClick:d=>{d.stopPropagation(),s(e)},children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M3 6h18M3 12h18M3 18h12"})}),r.jsx("span",{children:o("storage.manage")})]})})]})]})}function hy({cluster:e,clusters:t}){const{t:n,language:a}=Le(),[s,o]=u.useState(()=>{if(typeof window>"u")return"tanks";const R=window.location.pathname.split("/").filter(Boolean)[1];return R==="treemap"||R==="tanks"?R:"tanks"});u.useEffect(()=>{if(typeof window>"u")return;const R=window.location.pathname.split("/").filter(Boolean);if(R[0]!=="storage"||R.length>=4)return;const G=`/storage/${s}`;window.location.pathname!==G&&window.history.replaceState(null,"",G)},[s]),u.useEffect(()=>{const R=()=>{const G=window.location.pathname.split("/").filter(Boolean);if(G[0]!=="storage"||G.length>=4)return;const L=G[1];(L==="tanks"||L==="treemap")&&o(L)};return window.addEventListener("popstate",R),()=>window.removeEventListener("popstate",R)},[]);const[i,c]=u.useState("all"),[l,d]=u.useState(""),[m,g]=u.useState(null),[p,x]=u.useState(null),[b,k]=u.useState(null),[j,f]=u.useState(null),[h,v]=u.useState(null),N=u.useCallback(R=>{let G=(e==null?void 0:e.id)||"",L="";if(R.isShared)L=R.connectedNodes[0]||"";else{const B=R.nodeInstances.find(K=>K.active)||R.nodeInstances[0];L=(B==null?void 0:B.node)||""}if(!G&&t){for(const[B,K]of Object.entries(t))if(K.nodes&&K.nodes[L]){G=B;break}}if(!G||!L)return;const V=`/storage/${encodeURIComponent(G)}/${encodeURIComponent(L)}/${encodeURIComponent(R.name)}`;window.history.pushState(null,"",V),window.dispatchEvent(new PopStateEvent("popstate")),x(null),k(null),f(null),v(null)},[e,t]),w=u.useCallback((R,G)=>{R.preventDefault(),R.stopPropagation();const L=Math.min(R.clientX,window.innerWidth-180),V=Math.min(R.clientY,window.innerHeight-80);v({x:L,y:V,storage:G})},[]),_=!e&&t&&Object.keys(t).length>0,z=u.useMemo(()=>{const R=[],G=(L,V)=>{Object.values(L.vms).forEach(B=>{var K;(K=B.disk)!=null&&K.total_bytes&&B.disk.total_bytes>0&&!B.template&&R.push({...B,clusterName:V})})};return _?Object.entries(t).forEach(([L,V])=>{G(V,V.name||L)}):e&&G(e,e.name||""),R.sort((L,V)=>{var B,K;return(((B=V.disk)==null?void 0:B.total_bytes)||0)-(((K=L.disk)==null?void 0:K.total_bytes)||0)})},[e,t,_]),{sharedStorages:$,localStoragesByNode:P,allNodes:D,totals:I,warnings:A}=u.useMemo(()=>{const R=new Map;let G=0,L=0,V=0;const B=new Set,K=X=>{Object.values(X.storages).forEach(me=>{B.add(me.node);const Ce=me.storage;R.has(Ce)||R.set(Ce,{name:me.storage,type:me.type,content:me.content,allowedNodes:me.allowed_nodes||[],nodes:[]}),R.get(Ce).nodes.push({node:me.node,totalBytes:me.disk.total_bytes,usedBytes:me.disk.used_bytes,active:me.enabled!==!1})})};_?Object.values(t).forEach(X=>K(X)):e&&K(e);const Q=[],S={};B.forEach(X=>{S[X]=[]}),R.forEach(X=>{const me=dy.includes(X.type),Ce=X.nodes[0].totalBytes,Z=X.nodes.length>1&&Ce>0&&X.nodes.every(ae=>Math.abs(ae.totalBytes-Ce)/Ce<.01);if(me||Z){const ae=X.nodes[0],T=X.allowedNodes.length>0?X.allowedNodes:X.nodes.map(C=>C.node);Q.push({name:X.name,type:X.type,content:X.content,isShared:!0,totalBytes:ae.totalBytes,usedBytes:ae.usedBytes,connectedNodes:T,nodeInstances:X.nodes})}else X.nodes.forEach(ae=>{S[ae.node]||(S[ae.node]=[]),S[ae.node].push({name:X.name,type:X.type,content:X.content,isShared:!1,totalBytes:ae.totalBytes,usedBytes:ae.usedBytes,connectedNodes:[],nodeInstances:[ae]})})});const Se=X=>{if(i==="local"&&X.isShared||i==="shared"&&!X.isShared)return!1;if(l){const me=l.toLowerCase();if(!X.name.toLowerCase().includes(me)&&!X.type.toLowerCase().includes(me))return!1}return!0},te=Q.filter(Se).sort((X,me)=>X.name.localeCompare(me.name)),Me={};return Object.entries(S).forEach(([X,me])=>{const Ce=me.filter(Se).sort((Z,ae)=>Z.name.localeCompare(ae.name));Ce.length>0&&(Me[X]=Ce)}),te.forEach(X=>{(X.totalBytes>0?X.usedBytes/X.totalBytes*100:0)>=85&&V++,G+=X.usedBytes,L+=X.totalBytes}),Object.values(Me).flat().forEach(X=>{(X.totalBytes>0?X.usedBytes/X.totalBytes*100:0)>=85&&V++,G+=X.usedBytes,L+=X.totalBytes}),{sharedStorages:te,localStoragesByNode:Me,allNodes:Array.from(B).sort(),totals:{totalUsed:G,totalCapacity:L},warnings:V}},[e,t,_,i,l]),re=(R,G)=>{if(p&&p.name===R.name&&p.isShared===R.isShared){x(null),k(null),f(null);return}const L=G.getBoundingClientRect(),V=240,B=200,K=L.top+L.height/2;let Q=L.right+30,S=!1;Q+V>window.innerWidth&&(Q=L.left-V-30,S=!0);let Se=L.top;Se+B>window.innerHeight&&(Se=window.innerHeight-B-10),Se<10&&(Se=10),x(R),k({x:Q,y:Se}),f({x:S?L.left:L.right,y:K})};if(!e&&!_)return r.jsx("div",{className:"storage-vault empty",children:r.jsxs("div",{className:"empty-message",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("cluster.select")})]})});const U=I.totalCapacity>0?I.totalUsed/I.totalCapacity*100:0;return r.jsxs("div",{className:"storage-vault",children:[r.jsx("div",{className:"grid-floor"}),r.jsxs("div",{className:"vault-header",children:[r.jsxs("div",{className:"header-title-section",children:[r.jsxs("h1",{className:"vault-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"}),r.jsx("path",{d:"M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"}),r.jsx("ellipse",{cx:"12",cy:"19",rx:"3",ry:"1",fill:"currentColor",opacity:"0.3"})]}),n("storage.title")]}),r.jsxs("div",{className:"vault-stats",children:[r.jsx("span",{className:"stat-item",children:n("storage.count",{n:$.length+Object.values(P).flat().length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.shared_count",{n:$.length})}),r.jsx("span",{className:"stat-divider",children:"|"}),r.jsx("span",{className:"stat-item",children:n("storage.local_count",{n:Object.values(P).flat().length})}),A>0&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"stat-divider",children:"|"}),r.jsxs("span",{className:"stat-warning",children:["⚠️ ",A," ",n("settings.warning")]})]})]})]}),r.jsxs("div",{className:"header-controls",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:n("storage.search"),value:l,onChange:R=>d(R.target.value)})]}),r.jsxs("div",{className:"filter-tabs",children:[r.jsx("button",{className:`filter-tab ${i==="all"?"active":""}`,onClick:()=>c("all"),children:n("storage.filter_all")}),r.jsx("button",{className:`filter-tab ${i==="shared"?"active":""}`,onClick:()=>c("shared"),children:n("storage.filter_shared")}),r.jsx("button",{className:`filter-tab ${i==="local"?"active":""}`,onClick:()=>c("local"),children:n("storage.filter_local")})]}),r.jsxs("div",{className:"view-toggle",children:[r.jsx("button",{className:`view-btn ${s==="tanks"?"active":""}`,onClick:()=>o("tanks"),title:a==="zh-TW"?"能量槽檢視":"Tank view",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"18",rx:"2"}),r.jsx("rect",{x:"14",y:"8",width:"7",height:"13",rx:"2"})]})}),r.jsx("button",{className:`view-btn ${s==="treemap"?"active":""}`,onClick:()=>o("treemap"),title:a==="zh-TW"?"VM 矩陣檢視":"VM Treemap",children:r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"10",height:"8"}),r.jsx("rect",{x:"15",y:"3",width:"6",height:"5"}),r.jsx("rect",{x:"15",y:"10",width:"6",height:"6"}),r.jsx("rect",{x:"3",y:"13",width:"10",height:"8"})]})})]})]})]}),r.jsxs("div",{className:"summary-indicator-container",children:[r.jsx("div",{className:"indicator-title",children:n("storage.total_capacity")}),r.jsx(cy,{percent:U,usedBytes:I.totalUsed,totalBytes:I.totalCapacity,duration:1500})]}),r.jsx("div",{className:"vault-content",children:s==="treemap"?r.jsx(my,{vmDiskData:z,totals:I,storages:[...$.map(R=>R.name),...Object.values(P).flat().map(R=>R.name)]}):r.jsxs("div",{className:"tanks-layout",children:[(i==="all"||i==="shared")&&$.length>0&&r.jsxs("div",{className:"storage-section shared-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title shared",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),r.jsx("span",{children:n("storage.section_shared")})]}),r.jsx("span",{className:"section-count shared",children:n($.length>1?"storage.storages_plural":"storage.storages_count",{n:$.length})})]}),r.jsx("div",{className:"tanks-grid shared-grid",children:$.map((R,G)=>r.jsx("div",{onClick:L=>re(R,L.currentTarget),onContextMenu:L=>w(L,R),style:{cursor:"pointer"},children:r.jsx(Lu,{name:R.name,usedBytes:R.usedBytes,totalBytes:R.totalBytes,type:R.type,isShared:!0,connectedNodes:R.connectedNodes,width:140,height:220,animationDelay:G*80})},R.name))})]}),(i==="all"||i==="local")&&Object.keys(P).length>0&&r.jsxs("div",{className:"storage-section local-section",children:[r.jsxs("div",{className:"section-header",children:[r.jsxs("div",{className:"section-title local",children:[r.jsxs("svg",{className:"section-icon",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),r.jsx("path",{d:"M6 8h.01M6 12h.01M6 16h.01M10 8h8M10 12h8M10 16h8"})]}),r.jsx("span",{children:n("storage.section_local")})]}),r.jsxs("span",{className:"section-count local",children:[n(Object.values(P).flat().length>1?"storage.storages_plural":"storage.storages_count",{n:Object.values(P).flat().length})," ",n(Object.keys(P).length>1?"storage.across_nodes_plural":"storage.across_nodes",{n:Object.keys(P).length})]})]}),r.jsx("div",{className:"tanks-grid local-grid",children:(()=>{let R=$.length;return Object.entries(P).sort(([G],[L])=>G.localeCompare(L)).flatMap(([G,L])=>L.map(V=>{const B=V.nodeInstances[0],K=R++;return r.jsx("div",{onClick:Q=>re(V,Q.currentTarget),onContextMenu:Q=>w(Q,V),style:{cursor:"pointer"},children:r.jsx(Lu,{name:V.name,usedBytes:B.usedBytes,totalBytes:B.totalBytes,type:V.type,isShared:!1,nodeName:G,isOffline:!B.active,width:120,height:200,animationDelay:K*80})},`${G}-${V.name}`)}))})()})]}),$.length===0&&Object.keys(P).length===0&&r.jsx("div",{className:"no-storage",children:l?r.jsxs("span",{children:[n("error.no_data"),': "',l,'"']}):r.jsx("span",{children:n("error.no_data")})})]})}),r.jsx(fy,{storage:p,position:b,sourcePos:j,onClose:()=>{x(null),k(null),f(null)},onManage:N}),h&&r.jsxs(r.Fragment,{children:[r.jsx("div",{className:"storage-ctx-shield",onClick:()=>v(null),onContextMenu:R=>{R.preventDefault(),v(null)}}),r.jsx("div",{className:"storage-ctx-menu",style:{left:h.x,top:h.y},onClick:R=>R.stopPropagation(),children:r.jsxs("button",{className:"storage-ctx-item",onClick:()=>{N(h.storage),v(null)},children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]}),r.jsx("span",{children:n("storage.content")})]})})]}),r.jsx("style",{children:`
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
          backdrop-filter: blur(6px);
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
          backdrop-filter: blur(6px);
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
          to   { opacity: 1; transform: translateY(0); }
        }
        .storage-ctx-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 13px;
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
      `})]})}const gy=["backup","iso","vztmpl","snippets","import","images","rootdir"],xy=new Set(["rbd","lvm","lvmthin","zfspool","zfs","iscsi","iscsidirect"]);function vy({clusterId:e,node:t,storageName:n,clusters:a}){var ke,Oe;const{t:s,language:o}=Le(),i=Gr(),c=js(),l=u.useMemo(()=>{var je,ye;const Y=a==null?void 0:a[e];if(!Y)return null;const se=Y.storages||{};let ce=se[`${t}/${n}`]||se[n];if(!ce){for(const Ee of Object.values(se))if(Ee&&Ee.storage===n){ce=Ee;break}}return ce?{clusterName:Y.name||e,type:ce.type||"",content:ce.content||[],total:((je=ce.disk)==null?void 0:je.total_bytes)||0,used:((ye=ce.disk)==null?void 0:ye.used_bytes)||0,shared:!!ce.shared}:null},[a,e,n,t]),d=l?xy.has(l.type):!1,m=((ke=c.user)==null?void 0:ke.role_global)==="operator"||((Oe=c.user)==null?void 0:Oe.role_global)==="admin"||!c.authEnforced,g=u.useMemo(()=>{if(!l)return[];const Y=new Set(l.content);return gy.filter(se=>Y.has(se))},[l]),[p,x]=u.useState(null);u.useEffect(()=>{p&&g.includes(p)||g.length>0&&x(g[0])},[g,p]);const[b,k]=u.useState([]),[j,f]=u.useState(!1),[h,v]=u.useState(null),[N,w]=u.useState(0),[_,z]=u.useState(!1),[$,P]=u.useState(null),[D,I]=u.useState(0),[A,re]=u.useState(!1),[U,R]=u.useState(null),[G,L]=u.useState(!1),[V,B]=u.useState(""),[K,Q]=u.useState(""),[S,Se]=u.useState(""),[te,Me]=u.useState(""),[X,me]=u.useState(!0),[Ce,Z]=u.useState(!1),[ae,T]=u.useState(null),[C,J]=u.useState(""),[oe,be]=u.useState("ctime"),[W,le]=u.useState("desc"),he=Y=>{oe===Y?le(se=>se==="asc"?"desc":"asc"):(be(Y),le(Y==="name"||Y==="format"||Y==="notes"?"asc":"desc")),we(!0),setTimeout(()=>we(!1),600)},[ue,we]=u.useState(!1);u.useEffect(()=>{if(!p)return;let Y=!1;f(!0),v(null);const se=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content?type=${p}`;return fetch(se,{credentials:"same-origin"}).then(async ce=>{if(!ce.ok){const ye=await ce.text().catch(()=>"");throw new Error(`HTTP ${ce.status}: ${ye.slice(0,200)}`)}const je=await ce.json();Y||k(Array.isArray(je.items)?je.items:[])}).catch(ce=>{Y||v(String((ce==null?void 0:ce.message)||ce))}).finally(()=>{Y||f(!1)}),()=>{Y=!0}},[p,N,e,t,n]);const Ae=()=>{window.history.pushState(null,"","/storage"),window.dispatchEvent(new PopStateEvent("popstate"))},Ge=async Y=>{if(!(!m||d||!await i.confirm(o==="zh-TW"?`確定要刪除「${Hn(Y.volid)}」？此操作無法復原。`:`Delete "${Hn(Y.volid)}"? This cannot be undone.`,{title:o==="zh-TW"?"刪除確認":"Delete confirmation",destructive:!0})))try{const ce=`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/content/`+encodeURIComponent(Y.volid),je=await fetch(ce,{method:"DELETE",credentials:"same-origin"});if(!je.ok){const ye=await je.text().catch(()=>"");throw new Error(`HTTP ${je.status}: ${ye.slice(0,200)}`)}k(ye=>ye.filter(Ee=>Ee.volid!==Y.volid)),w(ye=>ye+1)}catch(ce){await i.alert(o==="zh-TW"?`刪除失敗：${ce}`:`Delete failed: ${ce}`,{title:o==="zh-TW"?"錯誤":"Error"})}},Ve=u.useMemo(()=>{let Y=b;const se=C.trim().toLowerCase();return se&&(Y=b.filter(je=>Hn(je.volid).toLowerCase().includes(se)||(je.format||"").toLowerCase().includes(se)||(je.notes||"").toLowerCase().includes(se))),Y.slice().sort((je,ye)=>{let Ee=0;switch(oe){case"name":Ee=Hn(je.volid).localeCompare(Hn(ye.volid));break;case"ctime":Ee=(je.ctime||0)-(ye.ctime||0);break;case"format":Ee=(je.format||"").localeCompare(ye.format||"");break;case"size":Ee=(je.size||0)-(ye.size||0);break;case"vmid":Ee=(je.vmid??-1)-(ye.vmid??-1);break;case"notes":Ee=(je.notes||"").localeCompare(ye.notes||"");break}return W==="asc"?Ee:-Ee})},[b,C,oe,W]),Ne=Y=>oe===Y?W==="asc"?"▲":"▼":"";if(!l)return r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]});const ge=l.total>0?l.used/l.total*100:0;return r.jsxs("div",{className:"storage-detail",children:[r.jsxs("div",{className:"storage-detail-header",children:[r.jsxs("button",{className:"back-btn",onClick:Ae,title:o==="zh-TW"?"返回儲存清單":"Back to storage list",children:[r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M15 18l-6-6 6-6"})}),r.jsx("span",{children:o==="zh-TW"?"返回":"Back"})]}),r.jsxs("div",{className:"storage-detail-title",children:[r.jsx("span",{className:"breadcrumb",children:l.clusterName}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("span",{className:"breadcrumb",children:t}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("h1",{className:"storage-name font-display",children:n}),r.jsx("span",{className:`storage-type-badge ${d?"block":"file"}`,children:l.type.toUpperCase()}),l.shared&&r.jsx("span",{className:"storage-shared-badge",children:o==="zh-TW"?"共享":"SHARED"})]}),r.jsxs("div",{className:"storage-detail-stats",children:[r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.used")}),r.jsxs("span",{className:`stat-val text-${ze(ge)}`,children:[Re(l.used)," / ",Re(l.total)]})]}),r.jsxs("div",{className:"stat",children:[r.jsx("span",{className:"stat-label",children:s("metric.usage")}),r.jsx("span",{className:`stat-val text-${ze(ge)}`,children:ot(ge,1)})]})]})]}),r.jsx("div",{className:"storage-detail-tabs",children:g.length===0?r.jsx("span",{className:"no-tabs",children:o==="zh-TW"?"此儲存沒有可管理的內容類型":"No manageable content types on this storage"}):g.map(Y=>r.jsxs("button",{className:`storage-tab tab-${Y} ${p===Y?"active":""}`,onClick:()=>x(Y),children:[r.jsx("span",{className:"tab-icon","aria-hidden":!0,children:by(Y)}),r.jsx("span",{children:Yi(Y,o)})]},Y))}),r.jsxs("div",{className:"storage-detail-toolbar",children:[r.jsxs("div",{className:"search-box",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"11",cy:"11",r:"8"}),r.jsx("path",{d:"M21 21l-4.35-4.35"})]}),r.jsx("input",{type:"text",placeholder:o==="zh-TW"?"搜尋名稱 / 格式 / 備註":"Search name / format / notes",value:C,onChange:Y=>J(Y.target.value)})]}),!d&&m&&r.jsxs(r.Fragment,{children:[r.jsxs("button",{className:"action-btn",onClick:()=>z(!0),title:o==="zh-TW"?"從本機上傳檔案到此儲存":"Upload a local file to this storage",children:[r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M12 5v14M5 12l7-7 7 7"})}),r.jsx("span",{children:o==="zh-TW"?"上傳":"Upload"})]}),r.jsxs("button",{className:"action-btn",onClick:()=>L(!0),title:o==="zh-TW"?"伺服器端從 URL 下載到此儲存（PVE download-url）":"Server-side download to this storage (PVE download-url)",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"})]}),r.jsx("span",{children:o==="zh-TW"?"從網址下載":"From URL"})]})]}),d&&r.jsx("span",{className:"readonly-hint",children:o==="zh-TW"?"此儲存為區塊級（VM 磁碟），僅供瀏覽":"Block-level storage (VM disks) — list only"}),r.jsxs("button",{className:"action-btn ghost",onClick:()=>w(Y=>Y+1),title:o==="zh-TW"?"重新整理":"Refresh",children:[r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M23 4v6h-6"}),r.jsx("path",{d:"M20.49 15a9 9 0 11-2.12-9.36L23 10"})]}),r.jsx("span",{children:o==="zh-TW"?"重新整理":"Refresh"})]})]}),r.jsxs("div",{className:"storage-detail-list",children:[r.jsx("div",{className:"tab-scan-line"}),j&&b.length===0&&r.jsxs("div",{className:"storage-detail-loading",children:[r.jsx("div",{className:"vm-thumb-spinner"}),r.jsx("span",{children:o==="zh-TW"?"載入中…":"Loading…"})]}),h&&r.jsx("div",{className:"storage-detail-error",children:r.jsxs("span",{children:[o==="zh-TW"?"錯誤：":"Error: ",h]})}),!j&&!h&&Ve.length===0&&r.jsx("div",{className:"storage-detail-empty",children:r.jsx("span",{children:o==="zh-TW"?"此分類無內容":"No items in this category"})}),Ve.length>0&&r.jsxs("table",{className:"storage-content-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{className:`sortable ${oe==="name"?"sorted":""}`,onClick:()=>he("name"),children:r.jsxs("span",{children:[o==="zh-TW"?"名稱":"Name",Ne("name")&&r.jsx("span",{className:"sort-indicator",children:Ne("name")})]})}),r.jsx("th",{className:`sortable ${oe==="ctime"?"sorted":""}`,onClick:()=>he("ctime"),children:r.jsxs("span",{children:[o==="zh-TW"?"日期":"Date",Ne("ctime")&&r.jsx("span",{className:"sort-indicator",children:Ne("ctime")})]})}),r.jsx("th",{className:`sortable ${oe==="format"?"sorted":""}`,onClick:()=>he("format"),children:r.jsxs("span",{children:[o==="zh-TW"?"格式":"Format",Ne("format")&&r.jsx("span",{className:"sort-indicator",children:Ne("format")})]})}),r.jsx("th",{className:`num sortable ${oe==="size"?"sorted":""}`,onClick:()=>he("size"),children:r.jsxs("span",{children:[o==="zh-TW"?"大小":"Size",Ne("size")&&r.jsx("span",{className:"sort-indicator",children:Ne("size")})]})}),p==="backup"&&r.jsx("th",{className:`num sortable ${oe==="vmid"?"sorted":""}`,onClick:()=>he("vmid"),children:r.jsxs("span",{children:["VMID",Ne("vmid")&&r.jsx("span",{className:"sort-indicator",children:Ne("vmid")})]})}),p==="backup"&&r.jsx("th",{className:`sortable ${oe==="notes"?"sorted":""}`,onClick:()=>he("notes"),children:r.jsxs("span",{children:[o==="zh-TW"?"備註":"Notes",Ne("notes")&&r.jsx("span",{className:"sort-indicator",children:Ne("notes")})]})}),!d&&m&&r.jsx("th",{className:"actions",children:o==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:Ve.map(Y=>{const se=Df(Y.format),ce=yy(Y.size);return r.jsxs("tr",{className:ue?"sort-animating":"",children:[r.jsxs("td",{className:"name-cell",title:Y.volid,children:[r.jsx("span",{className:"file-icon","aria-hidden":!0,children:wy(Y.format)}),r.jsx("span",{className:"file-name",children:Hn(Y.volid)})]}),r.jsx("td",{className:"date-cell",children:Y.ctime?ky(Y.ctime):"—"}),r.jsx("td",{children:Y.format?r.jsx("span",{className:`format-badge ${se}`,children:Y.format}):r.jsx("span",{className:"muted",children:"—"})}),r.jsx("td",{className:`num size-${ce}`,children:Y.size?Re(Y.size):"—"}),p==="backup"&&r.jsx("td",{className:"num",children:Y.vmid!=null?r.jsxs("span",{className:"vmid-badge",children:["#",Y.vmid]}):r.jsx("span",{className:"muted",children:"—"})}),p==="backup"&&r.jsx("td",{className:"notes-cell",title:Y.notes||"",children:Y.notes||r.jsx("span",{className:"muted",children:"—"})}),!d&&r.jsxs("td",{className:"actions",children:[r.jsx("a",{className:"action-btn-row",href:`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download/`+encodeURIComponent(Y.volid),download:!0,title:o==="zh-TW"?"下載到本機（SSH 串流）":"Download to local (SSH stream)",onClick:je=>je.stopPropagation(),children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),m&&r.jsx("button",{className:"action-btn-row danger",onClick:()=>Ge(Y),title:o==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"}),r.jsx("path",{d:"M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2"})]})})]})]},Y.volid)})})]})]},p||"none"),_&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!A&&z(!1),onDragOver:Y=>Y.preventDefault(),onDrop:Y=>{var ce;if(Y.preventDefault(),A)return;const se=(ce=Y.dataTransfer.files)==null?void 0:ce[0];se&&P(se)},children:r.jsxs("div",{className:"url-dl-frame",onClick:Y=>Y.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsxs("span",{children:[o==="zh-TW"?"上傳到 ":"Upload to ",n]}),r.jsx("button",{className:"url-dl-close",onClick:()=>!A&&z(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`將檔案上傳到此儲存區的 ${Yi(p||"iso",o)} 分類。可拖曳檔案到此視窗。`:`Upload a file to this storage's ${Yi(p||"iso",o)} category. You can also drag-drop into this window.`}),r.jsx("label",{children:o==="zh-TW"?"檔案":"File"}),r.jsx("input",{type:"file",disabled:A,onChange:Y=>{var se;return P(((se=Y.target.files)==null?void 0:se[0])||null)},style:{width:"100%",padding:"8px",background:"#02050b",border:"1px solid var(--border)",borderRadius:4,color:"var(--text-primary)",fontFamily:"var(--font-mono)",fontSize:13}}),$&&r.jsxs("div",{className:"url-dl-lead",style:{marginTop:8},children:[r.jsx("code",{children:$.name})," · ",r.jsxs("span",{children:[($.size/(1024*1024)).toFixed(1)," MB"]})]}),A&&r.jsxs("div",{style:{marginTop:12},children:[r.jsx("div",{style:{height:6,background:"#02050b",borderRadius:3,border:"1px solid var(--border)",overflow:"hidden"},children:r.jsx("div",{style:{width:`${D}%`,height:"100%",background:"linear-gradient(90deg, var(--primary), #00b4ff)",transition:"width 0.2s ease",boxShadow:"0 0 8px rgba(0,240,255,0.5)"}})}),r.jsxs("div",{style:{marginTop:6,fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-secondary)"},children:[D.toFixed(1),"%"," ",o==="zh-TW"?"上傳中…":"Uploading…"]})]}),U&&r.jsx("div",{className:"url-dl-err",children:U})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!A&&z(!1),disabled:A,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:A||!$||!p,onClick:()=>{if(!$||!p)return;re(!0),R(null),I(0);const Y=new FormData;Y.append("content",p),Y.append("filename",$,$.name);const se=new XMLHttpRequest;se.upload.onprogress=ce=>{ce.lengthComputable&&I(ce.loaded/ce.total*100)},se.onload=()=>{re(!1),se.status>=200&&se.status<300?(z(!1),P(null),I(0),w(ce=>ce+1),i.alert(o==="zh-TW"?"上傳完成。檔案已派送到 PVE。":"Upload complete. File dispatched to PVE.",{title:o==="zh-TW"?"完成":"Done"})):R(`HTTP ${se.status}: ${se.responseText.slice(0,200)}`)},se.onerror=()=>{re(!1),R(o==="zh-TW"?"網路錯誤":"Network error")},se.open("POST",`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/upload`),se.withCredentials=!0,se.send(Y)},children:A?o==="zh-TW"?"上傳中…":"Uploading…":o==="zh-TW"?"開始上傳":"Upload"})]})]})}),G&&r.jsx("div",{className:"url-dl-overlay",onClick:()=>!Ce&&L(!1),children:r.jsxs("div",{className:"url-dl-frame",onClick:Y=>Y.stopPropagation(),children:[r.jsxs("div",{className:"url-dl-titlebar",children:[r.jsx("span",{children:o==="zh-TW"?"從網址下載":"Download from URL"}),r.jsx("button",{className:"url-dl-close",onClick:()=>!Ce&&L(!1),children:"×"})]}),r.jsxs("div",{className:"url-dl-body",children:[r.jsx("p",{className:"url-dl-lead",children:o==="zh-TW"?`PVE 端伺服器會直接從這個網址抓檔到 ${n}，你的網路頻寬不會經手。`:`The PVE host will pull the file directly into ${n}; your bandwidth never carries it.`}),r.jsx("label",{children:o==="zh-TW"?"網址 (URL)":"URL"}),r.jsx("input",{type:"text",value:V,onChange:Y=>B(Y.target.value),placeholder:"https://example.com/debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"檔名（儲存後）":"Filename (as stored)"}),r.jsx("input",{type:"text",value:K,onChange:Y=>Q(Y.target.value),placeholder:"debian-12.iso",spellCheck:!1,autoComplete:"off"}),r.jsx("label",{children:o==="zh-TW"?"校驗 (選填)":"Checksum (optional)"}),r.jsxs("div",{className:"url-dl-row",children:[r.jsxs("select",{value:te,onChange:Y=>Me(Y.target.value),className:"url-dl-algo",children:[r.jsx("option",{value:"",children:o==="zh-TW"?"— 演算法 —":"— algorithm —"}),r.jsx("option",{value:"sha256",children:"sha256"}),r.jsx("option",{value:"sha512",children:"sha512"}),r.jsx("option",{value:"md5",children:"md5"})]}),r.jsx("input",{type:"text",value:S,onChange:Y=>Se(Y.target.value),placeholder:o==="zh-TW"?"十六進位摘要":"hex digest",spellCheck:!1,autoComplete:"off"})]}),r.jsxs("label",{className:"url-dl-check",children:[r.jsx("input",{type:"checkbox",checked:X,onChange:Y=>me(Y.target.checked)}),r.jsx("span",{children:o==="zh-TW"?"驗證來源 TLS 憑證（建議開啟）":"Verify source TLS certificate (recommended)"})]}),ae&&r.jsx("div",{className:"url-dl-err",children:ae})]}),r.jsxs("div",{className:"url-dl-actions",children:[r.jsx("button",{className:"action-btn ghost",onClick:()=>!Ce&&L(!1),disabled:Ce,children:o==="zh-TW"?"取消":"Cancel"}),r.jsx("button",{className:"action-btn primary",disabled:Ce||!V||!K||!p,onClick:async()=>{if(p){Z(!0),T(null);try{const Y=await fetch(`/api/clusters/${encodeURIComponent(e)}/nodes/${encodeURIComponent(t)}/storage/${encodeURIComponent(n)}/download-url`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:V,filename:K,content:p,checksum:S||void 0,checksum_algorithm:te||void 0,verify_certificates:X})});if(!Y.ok){const se=await Y.text().catch(()=>"");throw new Error(`HTTP ${Y.status}: ${se.slice(0,200)}`)}L(!1),B(""),Q(""),Se(""),Me(""),setTimeout(()=>w(se=>se+1),1e3),await i.alert(o==="zh-TW"?"下載任務已派送。完成後檔案會出現在清單。":"Download task dispatched. The file will appear in the list when finished.",{title:o==="zh-TW"?"已派送":"Dispatched"})}catch(Y){T(String(Y instanceof Error?Y.message:Y))}finally{Z(!1)}}},children:Ce?o==="zh-TW"?"派送中…":"Dispatching…":o==="zh-TW"?"開始下載":"Start download"})]})]})}),r.jsx("style",{children:`
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
            transform: translateY(0);
            filter: blur(0);
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
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
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
        .storage-content-table th.actions,
        .storage-content-table td.actions {
          text-align: center;
          width: 96px;
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

        .action-btn-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 3px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
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
      `})]})}function Hn(e){const t=e.indexOf("/");if(t>=0)return e.slice(t+1);const n=e.indexOf(":");return n>=0?e.slice(n+1):e}function by(e){switch(e){case"backup":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2.2"})]});case"iso":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]});case"vztmpl":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]});case"snippets":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]});case"import":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]});case"images":return r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]});case"rootdir":return r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"})})}}function Yi(e,t){return t==="zh-TW"?{backup:"備份",iso:"ISO 映像",vztmpl:"CT 範本",snippets:"程式碼片段",import:"匯入",images:"磁碟映像",rootdir:"CT 根目錄"}[e]:{backup:"Backups",iso:"ISO Images",vztmpl:"CT Templates",snippets:"Snippets",import:"Import",images:"Disk Images",rootdir:"CT Root"}[e]}function Df(e){if(!e)return"fmt-other";const t=e.toLowerCase();return t==="iso"||t==="img"?"fmt-iso":t.startsWith("vma")||t==="pbs-vm"||t==="pbs-ct"?"fmt-backup":t.startsWith("tar")?"fmt-tmpl":t==="qcow2"||t==="raw"||t==="vmdk"||t==="subvol"?"fmt-disk":t==="snippet"||t==="yaml"||t==="yml"||t==="sh"?"fmt-snippet":t==="ovf"||t==="ova"||t==="vmx"?"fmt-import":"fmt-other"}function yy(e){if(!e)return"tiny";const t=e/(1024*1024);return t<50?"tiny":t<1024?"small":t<5120?"medium":t<20480?"large":"huge"}function wy(e,t){const n=Df(e),a=n==="fmt-iso"?"#00b4ff":n==="fmt-backup"?"#ffa500":n==="fmt-tmpl"?"#b464ff":n==="fmt-disk"?"#00f0c8":n==="fmt-snippet"?"#a0c864":n==="fmt-import"?"#ff64b4":"var(--text-muted)";return n==="fmt-iso"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"9"}),r.jsx("circle",{cx:"12",cy:"12",r:"3"})]}):n==="fmt-backup"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 12a9 9 0 11-9-9"}),r.jsx("path",{d:"M21 3v6h-6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"})]}):n==="fmt-tmpl"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M9 21V9"})]}):n==="fmt-disk"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"}),r.jsx("path",{d:"M3 12c0 1.66 4 3 9 3s9-1.34 9-3"})]}):n==="fmt-snippet"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("polyline",{points:"16 18 22 12 16 6"}),r.jsx("polyline",{points:"8 6 2 12 8 18"})]}):n==="fmt-import"?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:a,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"var(--text-muted)",strokeWidth:"2",children:[r.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),r.jsx("polyline",{points:"14 2 14 8 20 8"})]})}function ky(e,t){const n=new Date(e*1e3),a=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${a(n.getMonth()+1)}-${a(n.getDate())} ${a(n.getHours())}:${a(n.getMinutes())}`}function Au(){if(typeof window>"u")return null;const e=window.location.pathname.split("/").filter(Boolean);return e.length<4||e[0]!=="storage"?null:{clusterId:decodeURIComponent(e[1]),node:decodeURIComponent(e[2]),storage:decodeURIComponent(e[3])}}function jy({cluster:e,clusters:t}){const[n,a]=u.useState(()=>Au());if(u.useEffect(()=>{const s=()=>a(Au());return window.addEventListener("popstate",s),()=>window.removeEventListener("popstate",s)},[]),n){const s=t||(e?{[e.id]:e}:null);return r.jsx(vy,{clusterId:n.clusterId,node:n.node,storageName:n.storage,clusters:s})}return r.jsx(hy,{cluster:e,clusters:t})}function Ny(){var D;const{language:e}=Le(),t=Gr(),n=js(),[a,s]=u.useState([]),[o,i]=u.useState(!0),[c,l]=u.useState(null),[d,m]=u.useState(null),[g,p]=u.useState(""),[x,b]=u.useState(""),[k,j]=u.useState(!1),f=u.useCallback(async()=>{i(!0),l(null);try{const I=await fetch("/api/admin/users",{credentials:"same-origin"});if(!I.ok)throw new Error(`HTTP ${I.status}`);const A=await I.json();s(A.users||[])}catch(I){l(String(I instanceof Error?I.message:I))}finally{i(!1)}},[]);u.useEffect(()=>{f()},[f]);const h=((D=n.user)==null?void 0:D.role_global)==="admin"||!n.authEnforced,v=async()=>{if(!g.trim()||x.length<8){await t.alert(e==="zh-TW"?"使用者名稱必填，密碼至少 8 字元":"Username required, password ≥ 8 chars");return}j(!0);try{const I=await fetch("/api/admin/users",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:g,password:x})});if(!I.ok)throw new Error(`HTTP ${I.status}: ${await I.text()}`);p(""),b(""),await f()}catch(I){await t.alert(`${I}`)}finally{j(!1)}},N=async I=>{const A=await t.prompt(e==="zh-TW"?`為 ${I.username} 設定新密碼（至少 8 字元）：`:`New password for ${I.username} (≥8 chars):`,{inputType:"password"});if(!A||A.length<8)return;const re=await fetch(`/api/admin/users/${encodeURIComponent(I.username)}/password`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:A,must_change_pw:!0})});re.ok?await t.alert(e==="zh-TW"?"已重設並要求下次登入時變更":"Reset; user must change on next login"):await t.alert(`HTTP ${re.status}: ${await re.text()}`),f()},w=async I=>{if(!I.totp_enabled||!await t.confirm(e==="zh-TW"?`清除 ${I.username} 的 2FA 註冊？`:`Clear 2FA enrolment for ${I.username}?`,{destructive:!0}))return;const re=await fetch(`/api/admin/users/${encodeURIComponent(I.username)}/totp/disable`,{method:"POST",credentials:"same-origin"});re.ok||await t.alert(`HTTP ${re.status}`),f()},_=async I=>{const A=await fetch(`/api/admin/users/${encodeURIComponent(I.username)}/enabled`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({enabled:!I.enabled})});A.ok||await t.alert(`HTTP ${A.status}`),f()},z=async I=>{if(!await t.confirm(e==="zh-TW"?`永久刪除使用者 ${I.username}？`:`Permanently delete user ${I.username}?`,{destructive:!0}))return;const re=await fetch(`/api/admin/users/${encodeURIComponent(I.username)}`,{method:"DELETE",credentials:"same-origin"});re.ok||await t.alert(`HTTP ${re.status}`),f()},$=I=>{if(!I)return"—";const A=new Date(I),re=U=>String(U).padStart(2,"0");return`${A.getFullYear()}-${re(A.getMonth()+1)}-${re(A.getDate())} ${re(A.getHours())}:${re(A.getMinutes())}`};if(!h)return r.jsxs("div",{className:"user-admin-noauth",children:[r.jsx("h2",{children:e==="zh-TW"?"需要管理員權限":"Admin role required"}),r.jsx("p",{children:e==="zh-TW"?"此頁僅限 admin 角色檢視。":"Only users with the admin role can access this page."})]});const P=u.useMemo(()=>[...a].sort((I,A)=>I.username.localeCompare(A.username)),[a]);return r.jsxs("div",{className:"user-admin",children:[r.jsxs("div",{className:"ua-header",children:[r.jsxs("h1",{className:"ua-title font-display",children:[r.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"}),r.jsx("circle",{cx:"9",cy:"7",r:"4"}),r.jsx("path",{d:"M23 21v-2a4 4 0 00-3-3.87"}),r.jsx("path",{d:"M16 3.13a4 4 0 010 7.75"})]}),e==="zh-TW"?"使用者管理":"User management"]}),r.jsxs("span",{className:"ua-count",children:[a.length," ",e==="zh-TW"?"位使用者":"users"]})]}),r.jsxs("div",{className:"ua-newrow",children:[r.jsx("span",{className:"ua-newlabel",children:e==="zh-TW"?"新增本機帳號":"Create local user"}),r.jsx("input",{type:"text",value:g,onChange:I=>p(I.target.value),placeholder:e==="zh-TW"?"使用者名稱":"username",spellCheck:!1,autoComplete:"off"}),r.jsx("input",{type:"password",value:x,onChange:I=>b(I.target.value),placeholder:e==="zh-TW"?"密碼（≥8 字元）":"password (≥8 chars)",autoComplete:"new-password"}),r.jsx("button",{className:"ua-btn primary",disabled:k||!g||x.length<8,onClick:v,children:k?e==="zh-TW"?"建立中…":"Creating…":e==="zh-TW"?"建立":"Create"})]}),o&&r.jsx("div",{className:"ua-loading",children:e==="zh-TW"?"載入中…":"Loading…"}),c&&r.jsx("div",{className:"ua-err",children:c}),!o&&!c&&r.jsx("div",{className:"ua-table-wrap",children:r.jsxs("table",{className:"ua-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:e==="zh-TW"?"帳號":"Username"}),r.jsx("th",{children:e==="zh-TW"?"狀態":"Status"}),r.jsx("th",{children:"2FA"}),r.jsx("th",{children:e==="zh-TW"?"角色":"Roles"}),r.jsx("th",{children:e==="zh-TW"?"上次登入":"Last login"}),r.jsx("th",{className:"actions",children:e==="zh-TW"?"動作":"Actions"})]})}),r.jsx("tbody",{children:P.map(I=>r.jsxs("tr",{className:I.enabled?"":"is-disabled",children:[r.jsxs("td",{children:[r.jsx("code",{className:"ua-username",children:I.username}),I.must_change_pw&&r.jsx("span",{className:"ua-badge warn",title:e==="zh-TW"?"下次登入需變更密碼":"Must change password",children:"!"})]}),r.jsx("td",{children:r.jsx("span",{className:`ua-state-pill ${I.enabled?"on":"off"}`,children:I.enabled?e==="zh-TW"?"啟用":"Enabled":e==="zh-TW"?"停用":"Disabled"})}),r.jsx("td",{children:I.totp_enabled?r.jsx("span",{className:"ua-totp on",title:"2FA enrolled",children:"●"}):r.jsx("span",{className:"ua-totp off",title:"No 2FA",children:"○"})}),r.jsx("td",{children:r.jsx("div",{className:"ua-roles",children:I.roles.length===0?r.jsx("span",{className:"muted",children:"—"}):I.roles.map((A,re)=>r.jsxs("span",{className:`ua-role role-${A.role}`,children:[A.role,r.jsxs("span",{className:"ua-role-scope",children:["@",A.cluster_id==="*"?"all":A.cluster_id,A.vm_pattern!=="*"&&` :${A.vm_pattern}`]})]},re))})}),r.jsx("td",{className:"muted",children:$(I.last_login_at)}),r.jsxs("td",{className:"actions",children:[r.jsx("button",{className:"ua-icon-btn",onClick:()=>m(I),title:e==="zh-TW"?"管理角色":"Manage roles",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 20h9"}),r.jsx("path",{d:"M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4z"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>N(I),title:e==="zh-TW"?"重設密碼":"Reset password",children:r.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"})})}),r.jsx("button",{className:`ua-icon-btn ${I.totp_enabled?"":"is-faded"}`,onClick:()=>w(I),disabled:!I.totp_enabled,title:e==="zh-TW"?"清除 2FA":"Clear 2FA",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"}),r.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>_(I),title:I.enabled?e==="zh-TW"?"停用":"Disable":e==="zh-TW"?"啟用":"Enable",children:I.enabled?r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07"})]}):r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("polyline",{points:"9 12 11 14 15 10"})]})}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>z(I),title:e==="zh-TW"?"刪除":"Delete",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"}),r.jsx("path",{d:"M10 11v6M14 11v6"})]})})]})]},I.id))})]})}),d&&r.jsx(_y,{user:d,onClose:()=>{m(null),f()}}),r.jsx("style",{children:`
        .user-admin {
          padding: var(--spacing-lg);
          height: 100%;
          overflow: auto;
          display: flex; flex-direction: column;
          gap: var(--spacing-md);
        }
        .ua-header {
          display: flex; align-items: baseline; gap: 16px;
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--border);
        }
        .ua-title {
          margin: 0;
          font-size: 22px;
          letter-spacing: 0.06em;
          color: var(--primary);
          text-shadow: 0 0 8px rgba(0,240,255,0.4);
          display: inline-flex; align-items: center; gap: 10px;
        }
        .ua-count {
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 13px;
        }
        .ua-newrow {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .ua-newlabel {
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-primary);
        }
        .ua-newrow input {
          padding: 6px 10px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          outline: none;
          flex: 1;
          min-width: 0;
        }
        .ua-newrow input:focus { border-color: var(--primary); }
        .ua-newrow input::placeholder { color: var(--text-secondary); opacity: 1; }

        .ua-btn {
          padding: 6px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .ua-btn.primary {
          background: rgba(0,240,255,0.12);
          border-color: var(--primary);
          color: var(--primary);
        }
        .ua-btn.primary:hover:not(:disabled) {
          background: rgba(0,240,255,0.22);
          box-shadow: 0 0 12px rgba(0,240,255,0.3);
        }
        .ua-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .ua-loading, .ua-err {
          padding: 24px;
          text-align: center;
          color: var(--text-muted);
        }
        .ua-err { color: var(--danger, #ff4d6d); }

        .ua-table-wrap {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: auto;
        }
        .ua-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-mono);
          font-size: 13px;
        }
        .ua-table thead {
          position: sticky; top: 0;
          background: var(--bg-secondary);
          z-index: 1;
        }
        .ua-table th {
          padding: 10px 14px;
          text-align: left;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }
        .ua-table th.actions, .ua-table td.actions { text-align: right; }
        .ua-table td {
          padding: 8px 14px;
          border-bottom: 1px solid rgba(0,240,255,0.08);
          vertical-align: middle;
        }
        .ua-table tbody tr.is-disabled { opacity: 0.55; }
        .ua-table tbody tr:hover { background: rgba(0,240,255,0.04); }
        .ua-table .muted, .ua-table td.muted { color: var(--text-secondary); }

        .ua-username { color: var(--primary); font-weight: 600; }
        .ua-badge.warn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px; height: 16px;
          margin-left: 6px;
          background: rgba(255,165,0,0.2);
          border: 1px solid #ffa500;
          color: #ffa500;
          border-radius: 50%;
          font-weight: 700;
          font-size: 11px;
        }

        .ua-state-pill {
          display: inline-block;
          padding: 1px 8px;
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 999px;
          border: 1px solid currentColor;
        }
        .ua-state-pill.on  { color: var(--success, #00ff88); }
        .ua-state-pill.off { color: var(--text-muted); }

        .ua-totp { font-size: 16px; }
        .ua-totp.on  { color: #00ff88; text-shadow: 0 0 6px rgba(0,255,136,0.5); }
        .ua-totp.off { color: var(--text-muted); }

        .ua-roles { display: flex; flex-wrap: wrap; gap: 4px; }
        .ua-role {
          display: inline-flex; align-items: baseline; gap: 4px;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ua-role.role-admin    { color: #ffa500; background: rgba(255,165,0,0.12); border: 1px solid rgba(255,165,0,0.4); }
        .ua-role.role-operator { color: var(--primary); background: rgba(0,240,255,0.12); border: 1px solid rgba(0,240,255,0.4); }
        .ua-role.role-viewer   { color: #b464ff; background: rgba(180,100,255,0.12); border: 1px solid rgba(180,100,255,0.4); }
        .ua-role-scope { font-weight: 400; opacity: 0.75; font-size: 10px; }

        .ua-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          margin-left: 4px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .ua-icon-btn:hover:not(:disabled) {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0,240,255,0.08);
        }
        .ua-icon-btn.danger:hover:not(:disabled) {
          color: var(--danger, #ff4d6d);
          border-color: var(--danger, #ff4d6d);
          background: rgba(255,77,109,0.08);
        }
        .ua-icon-btn:disabled, .ua-icon-btn.is-faded { opacity: 0.35; cursor: not-allowed; }

        .user-admin-noauth {
          padding: 80px 24px;
          text-align: center;
          color: var(--text-secondary);
        }
        .user-admin-noauth h2 {
          color: var(--danger, #ff4d6d);
          font-family: var(--font-display);
          letter-spacing: 0.08em;
        }
      `})]})}function _y({user:e,onClose:t}){const{language:n}=Le(),a=Gr(),[s,o]=u.useState(!1),[i,c]=u.useState("*"),[l,d]=u.useState("viewer"),[m,g]=u.useState("*"),p=async()=>{o(!0);try{const b=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles`,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cluster_id:i,role:l,vm_pattern:m})});if(!b.ok)throw new Error(`HTTP ${b.status}: ${await b.text()}`);t()}catch(b){await a.alert(`${b}`)}finally{o(!1)}},x=async b=>{o(!0);try{const k=new URLSearchParams({cluster_id:b.cluster_id,vm_pattern:b.vm_pattern}).toString(),j=await fetch(`/api/admin/users/${encodeURIComponent(e.username)}/roles?${k}`,{method:"DELETE",credentials:"same-origin"});if(!j.ok)throw new Error(`HTTP ${j.status}`);t()}catch(k){await a.alert(`${k}`)}finally{o(!1)}};return r.jsxs("div",{className:"ua-drawer-overlay",onClick:()=>!s&&t(),children:[r.jsxs("div",{className:"ua-drawer",onClick:b=>b.stopPropagation(),children:[r.jsxs("div",{className:"ua-drawer-head",children:[r.jsxs("span",{children:[n==="zh-TW"?"管理角色":"Manage roles",": "]}),r.jsx("code",{children:e.username}),r.jsx("button",{className:"ua-icon-btn",onClick:()=>!s&&t(),children:"×"})]}),r.jsxs("div",{className:"ua-drawer-body",children:[r.jsxs("div",{className:"ua-existing",children:[r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"現有授權":"Current grants"}),e.roles.length===0?r.jsx("div",{className:"muted",children:n==="zh-TW"?"無":"None"}):e.roles.map((b,k)=>r.jsxs("div",{className:"ua-grant-row",children:[r.jsx("span",{className:`ua-role role-${b.role}`,children:b.role}),r.jsxs("code",{className:"ua-grant-scope",children:["@",b.cluster_id,b.vm_pattern!=="*"&&` :${b.vm_pattern}`]}),r.jsx("button",{className:"ua-icon-btn danger",onClick:()=>x(b),disabled:s,title:"Revoke",children:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"3 6 5 6 21 6"}),r.jsx("path",{d:"M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"})]})})]},k))]}),r.jsx("div",{className:"ua-section-h",children:n==="zh-TW"?"新增授權":"Add grant"}),r.jsxs("div",{className:"ua-grant-form",children:[r.jsx("label",{children:n==="zh-TW"?"叢集 ID（* = 全部）":"Cluster ID (* = all)"}),r.jsx("input",{type:"text",value:i,onChange:b=>c(b.target.value)}),r.jsx("label",{children:n==="zh-TW"?"角色":"Role"}),r.jsxs("select",{value:l,onChange:b=>d(b.target.value),children:[r.jsx("option",{value:"viewer",children:"viewer"}),r.jsx("option",{value:"operator",children:"operator"}),r.jsx("option",{value:"admin",children:"admin"})]}),r.jsx("label",{children:n==="zh-TW"?"VM pattern（* = 任何 VM、prod-* = 名稱比對、tag:prod = 標籤比對）":"VM pattern (* = any VM, prod-* = name glob, tag:prod = tag match)"}),r.jsx("input",{type:"text",value:m,onChange:b=>g(b.target.value)}),r.jsx("button",{className:"ua-btn primary",disabled:s,onClick:p,children:s?"…":n==="zh-TW"?"授權":"Grant"})]})]})]}),r.jsx("style",{children:`
        .ua-drawer-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          z-index: 600;
          display: flex; justify-content: flex-end;
        }
        .ua-drawer {
          width: 100%;
          max-width: 480px;
          background: linear-gradient(180deg, #0d1320, #050810);
          border-left: 1px solid var(--primary);
          box-shadow: -16px 0 60px rgba(0,0,0,0.6), -16px 0 80px -20px rgba(0,240,255,0.3);
          display: flex; flex-direction: column;
          animation: uaDrawerIn .18s ease-out;
        }
        @keyframes uaDrawerIn { from { transform: translateX(40px); opacity: 0 } to { transform: none; opacity: 1 } }
        .ua-drawer-head {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 16px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .ua-drawer-head code { color: var(--text-primary); margin-right: auto; }
        .ua-drawer-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; overflow: auto; }
        .ua-section-h {
          font-family: var(--font-display);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 4px;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--border);
        }
        .ua-existing { display: flex; flex-direction: column; gap: 6px; }
        .ua-grant-row {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 8px;
          background: rgba(0,240,255,0.04);
          border-radius: 4px;
        }
        .ua-grant-scope { font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); flex: 1; }
        .ua-grant-form { display: flex; flex-direction: column; gap: 6px; }
        .ua-grant-form label {
          font-family: var(--font-display);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .ua-grant-form input, .ua-grant-form select {
          padding: 7px 10px;
          background: #02050b;
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 13px;
          outline: none;
        }
        .ua-grant-form input:focus, .ua-grant-form select:focus { border-color: var(--primary); }
      `})]})}const Sy={running:"tasks.filter.running",ok:"tasks.filter.ok",error:"tasks.filter.error"},Bf=(e,t)=>{if(!e)return"—";const a=(t??Math.floor(Date.now()/1e3))-e;if(a<0)return"—";if(a<60)return`${a}s`;if(a<3600)return`${Math.floor(a/60)}m ${a%60}s`;const s=Math.floor(a/3600),o=Math.floor(a%3600/60);return`${s}h ${o}m`},Wf=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}:${n(t.getSeconds())}`},Cy=()=>{if(typeof window>"u")return{vmid:"",cluster:null};const e=new URLSearchParams(window.location.search);return{vmid:e.get("vmid")||"",cluster:e.get("cluster")}};function My({clusters:e,selectedCluster:t}){const{t:n,language:a}=Le(),s=Gr(),o=u.useRef(Cy()),i=u.useMemo(()=>Object.keys(e),[e]),[c,l]=u.useState(()=>o.current.cluster&&e[o.current.cluster]?o.current.cluster:t&&t!=="__all__"&&e[t]?t:i[0]||"");u.useEffect(()=>{!t||t==="__all__"||e[t]&&t!==c&&l(t)},[t]);const[d,m]=u.useState(""),[g,p]=u.useState("all"),[x,b]=u.useState(o.current.vmid),[k,j]=u.useState(""),[f,h]=u.useState([]),[v,N]=u.useState([]),[w,_]=u.useState([]),[z,$]=u.useState(!1),[P,D]=u.useState(null),[I,A]=u.useState(!0),[re,U]=u.useState(null),R=u.useRef(new Set),G=u.useRef(new Map),L=u.useRef(!0),[V,B]=u.useState(new Set),[K,Q]=u.useState(new Set),S=u.useCallback(async(te=!1)=>{if(!c)return;$(!0),D(null);const Me=new URLSearchParams;d&&Me.set("type",d),g!=="all"&&Me.set("status",g),x&&Me.set("vmid",x),k&&Me.set("user",k),Me.set("limit","300"),te&&Me.set("force","1");try{const X=await fetch(`/api/clusters/${encodeURIComponent(c)}/tasks?`+Me.toString(),{credentials:"same-origin"});if(!X.ok){const T=await X.json().catch(()=>({}));throw new Error(T.error||`HTTP ${X.status}`)}const me=await X.json(),Ce=me.tasks||[],Z=new Set,ae=new Set;if(!L.current)for(const T of Ce)if(!R.current.has(T.upid))Z.add(T.upid);else{const C=G.current.get(T.upid);C&&C!==T._status&&ae.add(T.upid)}for(const T of Ce)R.current.add(T.upid),G.current.set(T.upid,T._status);R.current.size>5e3&&(R.current=new Set(Ce.map(T=>T.upid)),G.current=new Map(Ce.map(T=>[T.upid,T._status]))),L.current=!1,h(Ce),N(me.types||[]),_(me.users||[]),Z.size>0&&(B(Z),setTimeout(()=>B(new Set),900)),ae.size>0&&(Q(ae),setTimeout(()=>Q(new Set),900))}catch(X){D(X.message||String(X))}finally{$(!1)}},[c,d,g,x,k]);u.useEffect(()=>{S(!1)},[S]),u.useEffect(()=>{if(!I)return;const te=setInterval(()=>S(!0),5e3);return()=>clearInterval(te)},[I,S]);const Se=u.useMemo(()=>f.filter(te=>te._status==="running").length,[f]);return r.jsxs("div",{className:"pt-page",children:[r.jsxs("div",{className:"pt-header",children:[r.jsxs("div",{className:"pt-title-section",children:[r.jsxs("h1",{className:"pt-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),n("tasks.title")]}),r.jsx("div",{className:"pt-sub",children:n("tasks.subtitle")})]}),r.jsxs("div",{className:"pt-actions",children:[r.jsxs("label",{className:"pt-auto",children:[r.jsx("input",{type:"checkbox",checked:I,onChange:te=>A(te.target.checked)}),n("tasks.auto_refresh")]}),r.jsxs("button",{className:"pt-btn",onClick:()=>{const te=["starttime","endtime","duration_s","type","id","node","user","status","upid"],Me=f.map(T=>[T.starttime?new Date(T.starttime*1e3).toISOString():"",T.endtime?new Date(T.endtime*1e3).toISOString():"",T.starttime&&T.endtime?String(T.endtime-T.starttime):"",T.type||"",T.id||"",T.node||"",T.user||"",T._status,T.upid]),X=T=>/[",\n]/.test(T)?'"'+T.replace(/"/g,'""')+'"':T,me=[te.join(","),...Me.map(T=>T.map(X).join(","))].join(`
`),Ce=new Blob([me],{type:"text/csv;charset=utf-8"}),Z=document.createElement("a");Z.href=URL.createObjectURL(Ce);const ae=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);Z.download=`pve-tasks-${c}-${ae}.csv`,document.body.appendChild(Z),Z.click(),Z.remove(),setTimeout(()=>URL.revokeObjectURL(Z.href),1e3)},disabled:f.length===0,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{children:"CSV"})]}),r.jsxs("button",{className:"pt-btn",onClick:()=>S(!0),disabled:z,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:n("tasks.refresh")})]})]})]}),r.jsxs("div",{className:"pt-filters",children:[r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.cluster")}),r.jsx("select",{value:c,onChange:te=>l(te.target.value),children:i.map(te=>{var Me;return r.jsx("option",{value:te,children:((Me=e[te])==null?void 0:Me.name)||te},te)})})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.type")}),r.jsxs("select",{value:d,onChange:te=>m(te.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),v.map(te=>r.jsx("option",{value:te,children:te},te))]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.status")}),r.jsxs("select",{value:g,onChange:te=>p(te.target.value),children:[r.jsx("option",{value:"all",children:n("tasks.filter.all")}),r.jsx("option",{value:"running",children:n("tasks.filter.running")}),r.jsx("option",{value:"ok",children:n("tasks.filter.ok")}),r.jsx("option",{value:"error",children:n("tasks.filter.error")})]})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.vmid")}),r.jsx("input",{type:"text",inputMode:"numeric",value:x,onChange:te=>b(te.target.value.replace(/[^\d]/g,"")),placeholder:"e.g. 102"})]}),r.jsxs("label",{className:"pt-f",children:[r.jsx("span",{children:n("tasks.filter.user")}),r.jsxs("select",{value:k,onChange:te=>j(te.target.value),children:[r.jsx("option",{value:"",children:n("tasks.filter.all")}),w.map(te=>r.jsx("option",{value:te,children:te},te))]})]}),r.jsxs("span",{className:"pt-count",children:[f.length," / ",Se?`${Se} ${n("tasks.filter.running").toLowerCase()}`:""]})]}),P&&r.jsx("div",{className:"pt-error",children:P}),r.jsx("div",{className:"pt-tablewrap",children:r.jsxs("table",{className:"vm-table pt-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:n("tasks.col.starttime")}),r.jsx("th",{children:n("tasks.col.duration")}),r.jsx("th",{children:n("tasks.col.type")}),r.jsx("th",{children:n("tasks.col.target")}),r.jsx("th",{children:n("tasks.col.node")}),r.jsx("th",{children:n("tasks.col.user")}),r.jsx("th",{children:n("tasks.col.status")})]})}),r.jsxs("tbody",{children:[f.length===0&&!z&&r.jsx("tr",{children:r.jsx("td",{colSpan:7,className:"pt-empty",children:n("tasks.empty")})}),f.map(te=>{const Me=[te===re?"pt-active":"",V.has(te.upid)?"pt-new":""].filter(Boolean).join(" "),X=["pt-st",`pt-st-${te._status}`,K.has(te.upid)?"pt-st-pulse":""].join(" ");return r.jsxs("tr",{className:Me,onClick:()=>U(te),children:[r.jsx("td",{className:"pt-mono",children:Wf(te.starttime)}),r.jsx("td",{className:"pt-mono",children:Bf(te.starttime,te.endtime)}),r.jsx("td",{children:r.jsx("span",{className:`pt-type pt-type-${te.type}`,children:te.type})}),r.jsx("td",{className:"pt-mono",children:te.id||"—"}),r.jsx("td",{className:"pt-mono",children:te.node}),r.jsx("td",{className:"pt-mono",children:te.user||"—"}),r.jsx("td",{children:r.jsx("span",{className:X,children:n(Sy[te._status]||"tasks.filter.all")})})]},te.upid)})]})]})}),re&&r.jsx(zy,{clusterId:c,task:re,onClose:()=>U(null),onCopyUpid:async()=>{try{await navigator.clipboard.writeText(re.upid),s.alert(a==="zh-TW"?"UPID 已複製":"UPID copied")}catch{}}}),r.jsx("style",{children:`
        .pt-page {
          padding: 24px 32px;
          height: 100%;
          display: flex; flex-direction: column;
          gap: 16px;
          color: var(--text-primary);
        }
        .pt-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 16px;
          margin-bottom: var(--spacing-lg);
          flex-wrap: wrap;
        }
        .pt-title-section {
          display: flex; flex-direction: column; gap: 2px;
        }
        /* Title visual matches HoloMatrix / RadarScan / Storage etc. —
           font-display 22 px, primary text colour, big letter-spacing,
           inline cyan icon with drop-shadow glow + pulse. */
        .pt-title {
          display: flex; align-items: center; gap: var(--spacing-sm);
          margin: 0;
          font-size: 22px; font-weight: 600;
          color: var(--text-primary);
          letter-spacing: 0.12em;
        }
        .pt-title .title-icon {
          stroke: var(--primary);
          filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
          animation: pt-title-pulse 2s ease-in-out infinite;
        }
        @keyframes pt-title-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.05); }
        }
        .pt-sub {
          font-size: 12px; color: var(--text-secondary);
          font-family: var(--font-mono);
          margin-top: 4px;
        }
        .pt-actions { display: flex; gap: 12px; align-items: center; }
        .pt-auto {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); font-family: var(--font-display);
          cursor: pointer;
        }
        .pt-auto input { accent-color: var(--primary); }
        .pt-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 4px;
          background: rgba(0, 240, 255, 0.06);
          border: 1px solid rgba(0, 240, 255, 0.4);
          color: var(--primary);
          font-family: var(--font-display);
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: background var(--transition-fast);
        }
        .pt-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
        .pt-btn:disabled { opacity: .5; cursor: not-allowed; }

        .pt-filters {
          display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: flex-end;
          padding: 12px 14px;
          background: rgba(0, 240, 255, 0.03);
          border: 1px solid rgba(0, 240, 255, 0.12);
          border-radius: 4px;
        }
        .pt-f {
          display: flex; flex-direction: column; gap: 4px;
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); font-family: var(--font-display);
        }
        .pt-f input, .pt-f select {
          padding: 5px 8px; min-width: 140px;
          font-family: var(--font-mono); font-size: 12px;
          background: rgba(0, 240, 255, 0.04);
          color: var(--text-primary);
          border: 1px solid rgba(0, 240, 255, 0.2);
          border-radius: 3px;
          outline: none;
        }
        .pt-f select { cursor: pointer; }
        .pt-f select option { background: var(--bg-secondary); color: var(--text-primary); }
        .pt-f input:focus, .pt-f select:focus {
          border-color: var(--primary);
        }
        .pt-count {
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-secondary); margin-left: auto;
        }
        .pt-error {
          padding: 8px 14px;
          border: 1px solid var(--danger, #ff4d6d);
          border-left-width: 3px;
          background: rgba(255, 77, 109, 0.08);
          color: var(--danger, #ff4d6d);
          font-family: var(--font-mono); font-size: 12px;
          border-radius: 2px;
        }

        .pt-tablewrap {
          flex: 1; overflow: auto;
          border: 1px solid rgba(0, 240, 255, 0.12);
          border-radius: 4px;
          background: rgba(13, 17, 23, 0.6);
        }
        .pt-table tbody tr { cursor: pointer; transition: background .12s; }
        .pt-table tbody tr:nth-child(odd) { background: rgba(0, 240, 255, 0.025); }
        .pt-table tbody tr:hover { background: rgba(0, 240, 255, 0.08); }
        .pt-table tbody tr.pt-active {
          background: rgba(0, 240, 255, 0.14);
          box-shadow: inset 3px 0 0 var(--primary);
        }
        .pt-table td {
          padding: 6px 12px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.06);
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .pt-mono { font-family: var(--font-mono); }
        .pt-empty {
          text-align: center; padding: 24px;
          color: var(--text-muted); font-style: italic;
        }
        .pt-type {
          display: inline-block; padding: 2px 8px; border-radius: 2px;
          font-size: 11px; font-family: var(--font-display);
          letter-spacing: 0.05em; text-transform: uppercase;
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.3);
          color: var(--primary);
        }
        /* Tint per-type so the eye picks them out at a glance. */
        .pt-type-qmstart, .pt-type-vzstart {
          color: var(--success); border-color: rgba(0, 255, 136, 0.4);
          background: rgba(0, 255, 136, 0.06);
        }
        .pt-type-qmshutdown, .pt-type-qmstop, .pt-type-vzstop {
          color: var(--warning); border-color: rgba(255, 107, 0, 0.4);
          background: rgba(255, 107, 0, 0.06);
        }
        .pt-type-vzdump, .pt-type-qmsnapshot {
          color: var(--accent); border-color: rgba(224, 102, 255, 0.4);
          background: rgba(224, 102, 255, 0.06);
        }
        .pt-type-qmigrate, .pt-type-relocate {
          color: #ffe066; border-color: rgba(255, 224, 102, 0.4);
          background: rgba(255, 224, 102, 0.06);
        }
        .pt-st {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 2px 8px; border-radius: 999px;
          font-size: 11px; font-family: var(--font-mono);
          border: 1px solid currentColor;
        }
        .pt-st::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 6px currentColor;
        }
        .pt-st-running { color: var(--warning); }
        .pt-st-ok { color: var(--success); }
        .pt-st-error { color: var(--danger, #ff4d6d); }

        /* Arrival animation for newly-seen UPIDs only — diffed in reload().
           Slide down from -8px while a cyan wash fades from inset 0 12px to
           transparent so the eye picks up the row entering, then settles. */
        @keyframes pt-row-in {
          0%   { opacity: 0; transform: translateY(-8px);
                 box-shadow: inset 0 0 0 1px rgba(0, 240, 255, 0.7),
                             inset 4px 0 0 var(--primary); }
          60%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0);
                 box-shadow: inset 0 0 0 1px transparent; }
        }
        .pt-table tbody tr.pt-new {
          animation: pt-row-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .pt-table tbody tr.pt-new td:first-child {
          /* Subtle cyan wash on the timestamp cell so the row's "newness"
             reads even after the slide settles. Decays via animation. */
          animation: pt-cell-flash 0.8s ease-out both;
        }
        @keyframes pt-cell-flash {
          0%   { background: rgba(0, 240, 255, 0.22); }
          100% { background: transparent; }
        }

        /* Status-pill pulse — fires when the SAME UPID's status changes
           (running → ok / error). Brief glow ring so the operator's eye
           catches the in-place transition without the row re-arriving. */
        @keyframes pt-st-pulse {
          0%   { box-shadow: 0 0 0 0 currentColor, 0 0 12px currentColor; transform: scale(1); }
          50%  { box-shadow: 0 0 0 6px transparent, 0 0 20px currentColor; transform: scale(1.1); }
          100% { box-shadow: 0 0 0 0 transparent, 0 0 0 transparent; transform: scale(1); }
        }
        .pt-st.pt-st-pulse {
          animation: pt-st-pulse 0.7s ease-out both;
        }
      `})]})}function zy({clusterId:e,task:t,onClose:n,onCopyUpid:a}){const{t:s,language:o}=Le(),[i,c]=u.useState([]),[l,d]=u.useState(!0),[m,g]=u.useState(null),[p,x]=u.useState(null),b=t._status==="running";return u.useEffect(()=>{let k=!0;const j=async()=>{try{d(!0);const h=encodeURIComponent(t.upid),v=encodeURIComponent(t.node),N=encodeURIComponent(e),[w,_]=await Promise.all([fetch(`/api/clusters/${N}/nodes/${v}/tasks/${h}/log?limit=2000`,{credentials:"same-origin"}),fetch(`/api/clusters/${N}/nodes/${v}/tasks/${h}/status`,{credentials:"same-origin"})]);if(!k)return;if(w.ok){const $=((await w.json()).lines||[]).map(P=>P.t||"").filter(Boolean);c($)}else{const z=await w.json().catch(()=>({}));throw new Error(z.error||`HTTP ${w.status}`)}_.ok&&x(await _.json())}catch(h){k&&g(h.message||String(h))}finally{k&&d(!1)}};j();const f=b?setInterval(j,2500):null;return()=>{k=!1,f&&clearInterval(f)}},[t.upid,t.node,e,b]),r.jsxs("div",{className:"pt-drawer-back",onClick:n,children:[r.jsxs("div",{className:"pt-drawer",onClick:k=>k.stopPropagation(),children:[r.jsxs("div",{className:"pt-drawer-head",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"pt-drawer-title",children:[r.jsx("span",{className:`pt-type pt-type-${t.type}`,children:t.type}),r.jsx("span",{className:"pt-mono",children:t.id||""}),r.jsx("span",{className:`pt-st pt-st-${t._status}`,children:t._status})]}),r.jsxs("div",{className:"pt-drawer-sub",children:[r.jsx("code",{className:"pt-upid",children:t.upid}),r.jsx("button",{className:"pt-btn",onClick:a,children:r.jsx("span",{children:s("tasks.copy_upid")})})]})]}),r.jsx("button",{className:"pt-drawer-close",onClick:n,"aria-label":"close",children:"×"})]}),r.jsxs("div",{className:"pt-drawer-meta",children:[r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.node")})," ",t.node]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.user")})," ",t.user||"—"]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.starttime")})," ",Wf(t.starttime)]}),r.jsxs("span",{children:[r.jsx("span",{className:"lbl",children:s("tasks.col.duration")})," ",Bf(t.starttime,t.endtime)]})]}),r.jsxs("div",{className:"pt-drawer-log",children:[l&&i.length===0&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_loading")}),m&&r.jsx("div",{className:"pt-error",children:m}),i.length===0&&!l&&!m&&r.jsx("div",{className:"pt-loading",children:s("tasks.log_empty")}),i.length>0&&r.jsx("pre",{children:i.join(`
`)})]})]}),r.jsx("style",{children:`
        .pt-drawer-back {
          position: fixed; inset: 0; z-index: 800;
          background: rgba(2, 4, 10, 0.5);
          display: flex; justify-content: flex-end;
          animation: ptFade .15s ease-out;
        }
        @keyframes ptFade { from { opacity: 0; } to { opacity: 1; } }
        .pt-drawer {
          width: min(720px, 90vw); height: 100%;
          background: linear-gradient(180deg, #0d1320, #050810);
          border-left: 1px solid var(--primary);
          box-shadow: -8px 0 32px rgba(0, 240, 255, 0.2);
          display: flex; flex-direction: column;
          animation: ptSlide .2s ease-out;
        }
        @keyframes ptSlide {
          from { transform: translateX(20px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        .pt-drawer-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 16px 20px; gap: 14px;
          border-bottom: 1px solid rgba(0, 240, 255, 0.16);
        }
        .pt-drawer-title {
          display: flex; gap: 10px; align-items: center;
          font-size: 14px;
        }
        .pt-drawer-sub {
          margin-top: 8px;
          display: flex; gap: 8px; align-items: center;
        }
        .pt-upid {
          font-family: var(--font-mono); font-size: 11px;
          color: var(--text-secondary);
          padding: 3px 8px; border: 1px solid rgba(0, 240, 255, 0.18);
          border-radius: 2px;
          max-width: 480px; overflow: hidden;
          text-overflow: ellipsis; white-space: nowrap;
        }
        .pt-drawer-close {
          background: transparent; border: none; color: var(--text-secondary);
          font-size: 24px; cursor: pointer; padding: 0 8px; line-height: 1;
        }
        .pt-drawer-close:hover { color: var(--primary); }
        .pt-drawer-meta {
          display: flex; flex-wrap: wrap; gap: 10px 24px;
          padding: 10px 20px;
          font-family: var(--font-mono); font-size: 12px;
          color: var(--text-primary);
          border-bottom: 1px solid rgba(0, 240, 255, 0.08);
        }
        .pt-drawer-meta .lbl {
          font-family: var(--font-display); font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-secondary); margin-right: 4px;
        }
        .pt-drawer-log {
          flex: 1; overflow: auto;
          padding: 14px 20px;
          font-family: var(--font-mono); font-size: 12px;
        }
        .pt-drawer-log pre {
          margin: 0; white-space: pre-wrap; word-break: break-all;
          color: var(--text-primary);
        }
        .pt-loading {
          color: var(--text-muted); font-style: italic;
          font-family: var(--font-mono); font-size: 12px;
        }
      `})]})}const Ou={critical:0,warning:1,info:2,ok:3};function $y({clusters:e,onNavigate:t}){const{t:n,language:a}=Le(),[s,o]=u.useState({}),[i,c]=u.useState([]),[l,d]=u.useState([]),[m,g]=u.useState(0),p=u.useCallback(async()=>{const j={},f=[],h=[],v=[];for(const[N,w]of Object.entries(e)){const _=w.name||N;v.push((async()=>{try{const z=await fetch(`/api/clusters/${encodeURIComponent(N)}/tasks?status=error&limit=200`,{credentials:"same-origin"});if(z.ok){const $=await z.json(),P=Math.floor(Date.now()/1e3)-86400;j[N]=($.tasks||[]).filter(D=>(D.starttime||0)>P).length}}catch{}})());for(const z of Object.keys(w.nodes||{}))v.push((async()=>{try{const $=await fetch(`/api/clusters/${encodeURIComponent(N)}/nodes/${encodeURIComponent(z)}/certificates`,{credentials:"same-origin"});if($.ok){const D=(await $.json()).certificates||[];let I=null;for(const A of D){const re=A.notafter||A["notafter-formatted"];if(!re)continue;const U=typeof re=="number"?re:Date.parse(String(re))/1e3;!U||isNaN(U)||(!I||U<I.ts)&&(I={ts:U,subj:A.subject||A.filename||"cert"})}if(I){const A=Math.floor((I.ts-Date.now()/1e3)/86400);A<90&&f.push({cluster:_,clusterId:N,node:z,days:A,subject:I.subj})}}}catch{}})()),v.push((async()=>{try{const $=await fetch(`/api/clusters/${encodeURIComponent(N)}/nodes/${encodeURIComponent(z)}/updates`,{credentials:"same-origin"});if($.ok){const P=await $.json();(P.count??0)>0&&h.push({cluster:_,clusterId:N,node:z,count:P.count})}}catch{}})())}await Promise.all(v),o(j),c(f),d(h),g(Date.now())},[e]);u.useEffect(()=>{p()},[p]),u.useEffect(()=>{const j=setInterval(p,6e4);return()=>clearInterval(j)},[p]);const x=u.useMemo(()=>{var f,h,v;const j=[];for(const[N,w]of Object.entries(e)){const _=w.name||N;for(const[P,D]of Object.entries(w.nodes||{})){const I=D;I.status&&I.status!=="online"&&j.push({sev:"critical",cluster:_,target:`node:${P}`,category:n("health.cat.node_down"),msg:a==="zh-TW"?`${P} 狀態 ${I.status}`:`${P} is ${I.status}`,navView:"cluster-core",navParams:{cluster:N}});const A=((f=I.cpu)==null?void 0:f.usage_percent)||0,re=((h=I.memory)==null?void 0:h.usage_percent)||0;A>92&&j.push({sev:"warning",cluster:_,target:`node:${P}`,category:n("health.cat.high_cpu"),msg:`${P} CPU ${A.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:N}}),re>92&&j.push({sev:"warning",cluster:_,target:`node:${P}`,category:n("health.cat.high_mem"),msg:`${P} ${a==="zh-TW"?"記憶體":"memory"} ${re.toFixed(0)}%`,navView:"cluster-core",navParams:{cluster:N}})}for(const[P,D]of Object.entries(w.storages||{})){const I=D,A=I.usage_percent??I.used_pct??0;A>=95?j.push({sev:"critical",cluster:_,target:`storage:${P}`,category:n("health.cat.storage_full"),msg:`${I.storage||P} ${A.toFixed(0)}% `+(a==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:N}}):A>=85&&j.push({sev:"warning",cluster:_,target:`storage:${P}`,category:n("health.cat.storage_high"),msg:`${I.storage||P} ${A.toFixed(0)}% `+(a==="zh-TW"?"已用":"used"),navView:"storage",navParams:{cluster:N}})}const z=w.ceph;if(z){const P=(z.status||((v=z.health)==null?void 0:v.status)||"").toUpperCase();P.includes("ERR")?j.push({sev:"critical",cluster:_,target:"ceph",category:n("health.cat.ceph_err"),msg:P,navView:"ceph-constellation",navParams:{cluster:N}}):P.includes("WARN")&&j.push({sev:"warning",cluster:_,target:"ceph",category:n("health.cat.ceph_warn"),msg:P,navView:"ceph-constellation",navParams:{cluster:N}})}const $=s[N]||0;$>0&&j.push({sev:$>=10?"warning":"info",cluster:_,target:"tasks",category:n("health.cat.task_failures"),msg:a==="zh-TW"?`過去 24h 共 ${$} 筆作業失敗`:`${$} task error(s) in the last 24h`,navView:"tasks",navParams:{cluster:N}})}for(const N of i){let w="info";if(N.days<0)w="critical";else if(N.days<14)w="critical";else if(N.days<30)w="warning";else if(N.days<60)w="info";else continue;j.push({sev:w,cluster:N.cluster,target:`cert:${N.node}`,category:N.days<0?n("health.cat.cert_expired"):n("health.cat.cert_expiring"),msg:a==="zh-TW"?`${N.node}: ${N.subject} (${N.days<0?`已過期 ${Math.abs(N.days)} 天`:`${N.days} 天`})`:`${N.node}: ${N.subject} (${N.days<0?`expired ${Math.abs(N.days)}d ago`:`${N.days}d`})`,navView:"cluster-core",navParams:{cluster:N.clusterId}})}for(const N of l)j.push({sev:N.count>=50?"warning":"info",cluster:N.cluster,target:`updates:${N.node}`,category:n("health.cat.updates"),msg:a==="zh-TW"?`${N.node}: ${N.count} 個套件待更新`:`${N.node}: ${N.count} package update(s) pending`,navView:"cluster-core",navParams:{cluster:N.clusterId}});return j.sort((N,w)=>Ou[N.sev]-Ou[w.sev]),j},[e,s,i,l,a,n]),b=u.useMemo(()=>{const j={critical:0,warning:0,info:0,ok:0};for(const f of x)j[f.sev]++;return j},[x]),k=u.useMemo(()=>{let j=0,f=0,h=0,v=0,N=0,w=0,_=0;for(const z of Object.values(e)){for(const $ of Object.values(z.nodes||{}))j++,$.status==="online"&&f++;for(const $ of Object.values(z.vms||{}))$.type==="lxc"?(N++,$.status==="running"&&w++):(h++,$.status==="running"&&v++);_+=Object.keys(z.storages||{}).length}return{nodes:j,online:f,vms:h,running:v,cts:N,ctsRunning:w,storages:_}},[e]);return r.jsxs("div",{className:"hm-page",children:[r.jsxs("div",{className:"hm-header",children:[r.jsxs("div",{className:"title-section",children:[r.jsxs("h1",{className:"hm-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),n("health.title")]}),r.jsxs("div",{className:"hm-sub",children:[n("health.subtitle"),m?` · ${n("health.updated")} ${new Date(m).toLocaleTimeString()}`:""]})]}),r.jsxs("div",{className:"hm-tally",children:[r.jsxs("span",{className:"hm-pill hm-pill-critical",children:[b.critical," ",n("health.sev.critical")]}),r.jsxs("span",{className:"hm-pill hm-pill-warning",children:[b.warning," ",n("health.sev.warning")]}),r.jsxs("span",{className:"hm-pill hm-pill-info",children:[b.info," ",n("health.sev.info")]})]})]}),r.jsxs("div",{className:"hm-stats",children:[r.jsxs("div",{className:"hm-stat",onClick:()=>t("cluster-core"),children:[r.jsxs("div",{className:"hm-stat-num",children:[k.online,r.jsxs("span",{className:"hm-stat-of",children:["/",k.nodes]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.nodes")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("holo-matrix"),children:[r.jsxs("div",{className:"hm-stat-num",children:[k.running,r.jsxs("span",{className:"hm-stat-of",children:["/",k.vms]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.vms")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("holo-matrix"),children:[r.jsxs("div",{className:"hm-stat-num",children:[k.ctsRunning,r.jsxs("span",{className:"hm-stat-of",children:["/",k.cts]})]}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.cts")})]}),r.jsxs("div",{className:"hm-stat",onClick:()=>t("storage"),children:[r.jsx("div",{className:"hm-stat-num",children:k.storages}),r.jsx("div",{className:"hm-stat-lbl",children:n("health.stat.storages")})]})]}),x.length===0?r.jsxs("div",{className:"hm-empty",children:[r.jsxs("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),r.jsx("div",{className:"hm-empty-title",children:n("health.empty.title")}),r.jsx("div",{className:"hm-empty-sub",children:n("health.empty.sub")})]}):r.jsx("div",{className:"hm-grid",children:x.map((j,f)=>r.jsxs("div",{className:`hm-card hm-card-${j.sev}`,onClick:()=>{var h;return j.navView&&t(j.navView,{cluster:(h=j.navParams)==null?void 0:h.cluster})},children:[r.jsxs("div",{className:"hm-card-head",children:[r.jsx("span",{className:"hm-card-sev",children:j.sev.toUpperCase()}),r.jsx("span",{className:"hm-card-cluster",children:j.cluster})]}),r.jsx("div",{className:"hm-card-cat",children:j.category}),r.jsx("div",{className:"hm-card-msg",children:j.msg})]},f))}),r.jsx("style",{children:`
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
          0%,100% { opacity: 0.85; transform: scale(1); }
          50%     { opacity: 1;    transform: scale(1.05); }
        }
        .hm-sub {
          font-size: 12px; color: var(--text-secondary);
          font-family: var(--font-mono); margin-top: 4px;
        }
        .hm-tally { display: flex; gap: 8px; flex-wrap: wrap; }
        .hm-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px;
          font-family: var(--font-mono); font-size: 12px;
          letter-spacing: .05em;
          border: 1px solid currentColor;
        }
        .hm-pill::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; box-shadow: 0 0 8px currentColor;
        }
        .hm-pill-critical { color: var(--danger, #ff4d6d); }
        .hm-pill-warning  { color: var(--warning); }
        .hm-pill-info     { color: var(--primary); }

        .hm-stats {
          display: grid; gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }
        .hm-stat {
          padding: 16px 20px;
          background: rgba(0, 240, 255, 0.04);
          border: 1px solid rgba(0, 240, 255, 0.15);
          border-radius: 4px;
          cursor: pointer;
          transition: all .15s;
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

        .hm-grid {
          display: grid; gap: 10px;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
        .hm-card {
          padding: 12px 16px;
          background: rgba(13, 17, 23, 0.7);
          border: 1px solid currentColor;
          border-left-width: 3px;
          border-radius: 3px;
          cursor: pointer;
          transition: background .15s, transform .15s;
        }
        .hm-card:hover { background: rgba(13, 17, 23, 0.95); transform: translateX(2px); }
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
        .hm-empty-title {
          font-family: var(--font-display); font-size: 18px;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--success);
        }
        .hm-empty-sub {
          font-family: var(--font-mono); font-size: 13px;
          color: var(--text-secondary);
        }
      `})]})}const Ey=e=>{if(!e)return"—";const t=new Date(e*1e3),n=a=>String(a).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`};function Ty({clusters:e,selectedCluster:t}){const{t:n,language:a}=Le(),s=u.useMemo(()=>Object.keys(e),[e]),[o,i]=u.useState(()=>t&&t!=="__all__"&&e[t]?t:s[0]||"");u.useEffect(()=>{!t||t==="__all__"||e[t]&&t!==o&&i(t)},[t]);const[c,l]=u.useState([]),[d,m]=u.useState(!1),[g,p]=u.useState(null),[x,b]=u.useState("all"),k=u.useCallback(async(f=!1)=>{if(o){m(!0),p(null);try{const h=await fetch(`/api/clusters/${encodeURIComponent(o)}/backup-jobs${f?"?force=1":""}`,{credentials:"same-origin"});if(!h.ok){const N=await h.json().catch(()=>({}));throw new Error(N.error||`HTTP ${h.status}`)}const v=await h.json();l(v.jobs||[])}catch(h){p(h.message||String(h))}finally{m(!1)}}},[o]);u.useEffect(()=>{k(!1)},[k]);const j=u.useMemo(()=>x==="all"?c:c.filter(f=>x==="enabled"?f.enabled:!f.enabled),[c,x]);return r.jsxs("div",{className:"bj-page",children:[r.jsxs("div",{className:"bj-header",children:[r.jsxs("div",{className:"title-section",children:[r.jsxs("h1",{className:"bj-title font-display",children:[r.jsxs("svg",{className:"title-icon",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),n("bjobs.title")]}),r.jsx("div",{className:"bj-sub",children:n("bjobs.subtitle")})]}),r.jsx("div",{className:"bj-actions",children:r.jsxs("button",{className:"bj-btn",onClick:()=>k(!0),disabled:d,children:[r.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("polyline",{points:"23 4 23 10 17 10"}),r.jsx("polyline",{points:"1 20 1 14 7 14"}),r.jsx("path",{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"})]}),r.jsx("span",{children:n("tasks.refresh")})]})})]}),r.jsxs("div",{className:"bj-filters",children:[r.jsxs("label",{className:"bj-f",children:[r.jsx("span",{children:n("tasks.filter.cluster")}),r.jsx("select",{value:o,onChange:f=>i(f.target.value),children:s.map(f=>{var h;return r.jsx("option",{value:f,children:((h=e[f])==null?void 0:h.name)||f},f)})})]}),r.jsxs("label",{className:"bj-f",children:[r.jsx("span",{children:n("bjobs.filter.enabled")}),r.jsxs("select",{value:x,onChange:f=>b(f.target.value),children:[r.jsx("option",{value:"all",children:n("tasks.filter.all")}),r.jsx("option",{value:"enabled",children:n("bjobs.enabled_yes")}),r.jsx("option",{value:"disabled",children:n("bjobs.enabled_no")})]})]}),r.jsxs("span",{className:"bj-count",children:[j.length," / ",c.length]})]}),g&&r.jsx("div",{className:"bj-error",children:g}),r.jsx("div",{className:"bj-tablewrap",children:r.jsxs("table",{className:"vm-table bj-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:n("bjobs.col.id")}),r.jsx("th",{children:n("bjobs.col.schedule")}),r.jsx("th",{children:n("bjobs.col.next_run")}),r.jsx("th",{children:n("bjobs.col.storage")}),r.jsx("th",{children:n("bjobs.col.scope")}),r.jsx("th",{children:n("bjobs.col.mode")}),r.jsx("th",{children:n("bjobs.col.enabled")}),r.jsx("th",{children:n("bjobs.col.comment")})]})}),r.jsxs("tbody",{children:[j.length===0&&!d&&r.jsx("tr",{children:r.jsx("td",{colSpan:8,className:"bj-empty",children:n("bjobs.empty")})}),j.map(f=>{const h=f.all?n("bjobs.scope_all"):f.pool?`${a==="zh-TW"?"池":"pool"}: ${f.pool}`:f.vmid?`vmid: ${f.vmid}`:"—",v=f.schedule||(f.dow&&f.starttime?`${f.dow} ${f.starttime}`:"—");return r.jsxs("tr",{children:[r.jsx("td",{className:"bj-mono",children:f.id}),r.jsx("td",{className:"bj-mono",children:v}),r.jsx("td",{className:"bj-mono",children:Ey(f.next_run)}),r.jsx("td",{className:"bj-mono",children:f.storage||"—"}),r.jsx("td",{className:"bj-mono",children:h}),r.jsx("td",{children:r.jsx("span",{className:"bj-mode",children:f.mode||"snapshot"})}),r.jsx("td",{children:r.jsx("span",{className:`bj-state ${f.enabled?"on":"off"}`,children:f.enabled?n("bjobs.enabled_yes"):n("bjobs.enabled_no")})}),r.jsx("td",{className:"bj-mono bj-comment",title:f.comment||"",children:f.comment||""})]},f.id)})]})]})}),r.jsx("style",{children:`
        .bj-page { padding: 24px 32px; height: 100%; display: flex; flex-direction: column; gap: 16px; color: var(--text-primary); }
        .bj-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: var(--spacing-md); }
        .title-section { display: flex; flex-direction: column; gap: 2px; }
        .bj-title { display: flex; align-items: center; gap: var(--spacing-sm); margin: 0; font-size: 22px; font-weight: 600; color: var(--text-primary); letter-spacing: 0.12em; }
        .bj-title .title-icon { stroke: var(--primary); filter: drop-shadow(0 0 6px rgba(0,240,255,0.6)); animation: bj-pulse 2s ease-in-out infinite; }
        @keyframes bj-pulse { 0%,100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        .bj-sub { font-size: 12px; color: var(--text-secondary); font-family: var(--font-mono); margin-top: 4px; }

        .bj-actions { display: flex; gap: 8px; }
        .bj-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 4px; background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.4); color: var(--primary); font-family: var(--font-display); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
        .bj-btn:hover:not(:disabled) { background: rgba(0, 240, 255, 0.16); }
        .bj-btn:disabled { opacity: .5; cursor: not-allowed; }

        .bj-filters { display: flex; gap: 16px; align-items: flex-end; padding: 12px 14px; background: rgba(0, 240, 255, 0.03); border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; flex-wrap: wrap; }
        .bj-f { display: flex; flex-direction: column; gap: 4px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); font-family: var(--font-display); }
        .bj-f select { padding: 5px 8px; min-width: 140px; font-family: var(--font-mono); font-size: 12px; background: rgba(0, 240, 255, 0.04); color: var(--text-primary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 3px; cursor: pointer; }
        .bj-f select option { background: var(--bg-secondary); color: var(--text-primary); }
        .bj-count { margin-left: auto; font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary); }

        .bj-error { padding: 8px 14px; border: 1px solid var(--danger, #ff4d6d); border-left-width: 3px; background: rgba(255, 77, 109, 0.08); color: var(--danger, #ff4d6d); font-family: var(--font-mono); font-size: 12px; border-radius: 2px; }

        .bj-tablewrap { flex: 1; overflow: auto; border: 1px solid rgba(0, 240, 255, 0.12); border-radius: 4px; background: rgba(13, 17, 23, 0.6); }
        .bj-table tbody tr:nth-child(odd) { background: rgba(0, 240, 255, 0.025); }
        .bj-table tbody tr:hover { background: rgba(0, 240, 255, 0.08); }
        .bj-table td { padding: 6px 12px; border-bottom: 1px solid rgba(0, 240, 255, 0.06); font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); white-space: nowrap; }
        .bj-mono { font-family: var(--font-mono); }
        .bj-empty { text-align: center; padding: 24px; color: var(--text-muted); font-style: italic; }
        .bj-mode { display: inline-block; padding: 2px 8px; border-radius: 2px; font-size: 11px; font-family: var(--font-display); letter-spacing: 0.05em; text-transform: uppercase; background: rgba(224, 102, 255, 0.08); border: 1px solid rgba(224, 102, 255, 0.4); color: var(--accent); }
        .bj-state { display: inline-flex; align-items: center; gap: 6px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-family: var(--font-mono); border: 1px solid currentColor; }
        .bj-state::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 6px currentColor; }
        .bj-state.on { color: var(--success); }
        .bj-state.off { color: var(--text-muted); }
        .bj-comment { max-width: 320px; overflow: hidden; text-overflow: ellipsis; }
      `})]})}function Py({open:e,cluster_id:t,kind:n,title:a,body:s,label:o,onClose:i,onSaved:c}){const{t:l}=Le(),[d,m]=u.useState(""),[g,p]=u.useState(!1),[x,b]=u.useState(""),k=u.useRef(null);if(u.useEffect(()=>{e&&(m(""),b(""),p(!1),setTimeout(()=>{var f;return(f=k.current)==null?void 0:f.focus()},50))},[e]),u.useEffect(()=>{if(!e)return;const f=h=>{h.key==="Escape"&&!g&&i()};return document.addEventListener("keydown",f),()=>document.removeEventListener("keydown",f)},[e,g,i]),!e)return null;const j=async()=>{if(d){p(!0),b("");try{await Be.setClusterSecret(t,n,d),c()}catch(f){b(f instanceof Error?f.message:String(f)),p(!1)}}};return r.jsxs("div",{onClick:()=>!g&&i(),style:Ry,children:[r.jsx("style",{children:Iy}),r.jsxs("div",{className:"ssm-modal",onClick:f=>f.stopPropagation(),children:[r.jsxs("div",{className:"ssm-eyebrow",children:["// secret · ",t]}),r.jsx("h3",{className:"ssm-title",children:a}),r.jsx("p",{className:"ssm-body",children:s}),r.jsx("label",{children:o}),r.jsx("input",{ref:k,type:"password",value:d,onChange:f=>m(f.target.value),onKeyDown:f=>{f.key==="Enter"&&j()},autoComplete:"new-password",spellCheck:!1}),x&&r.jsx("div",{className:"ssm-err",children:x}),r.jsxs("div",{className:"ssm-actions",children:[r.jsx("button",{className:"ghost",onClick:i,disabled:g,children:l("action.cancel")}),r.jsx("button",{className:"primary",onClick:j,disabled:g||!d,children:g?"…":l("action.save")})]})]})]})}const Ry={position:"fixed",inset:0,zIndex:400,background:"rgba(0,0,0,.78)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:24,animation:"ssmFade .18s ease"},Iy=`
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
`;function Ly({onClose:e,clusters:t}){const{t:n,language:a,setLanguage:s}=Le(),o=Gr(),[i,c]=u.useState(null),[l,d]=u.useState(!0),[m,g]=u.useState(!1),[p,x]=u.useState(null),[b,k]=u.useState(!1),[j,f]=u.useState("ui"),[h,v]=u.useState(!0),[N,w]=u.useState("cyberpunk"),[_,z]=u.useState("command-center"),[$,P]=u.useState(100),[D,I]=u.useState("all"),[A,re]=u.useState(85),[U,R]=u.useState("vmid"),[G,L]=u.useState("node"),[V,B]=u.useState("node"),[K,Q]=u.useState("asc"),[S,Se]=u.useState({}),[te,Me]=u.useState(!0),[X,me]=u.useState(80),[Ce,Z]=u.useState(95),[ae,T]=u.useState(85),[C,J]=u.useState(95),[oe,be]=u.useState(80),[W,le]=u.useState(95),[he,ue]=u.useState(50),[we,Ae]=u.useState(100),[Ge,Ve]=u.useState(5),[Ne,ge]=u.useState(10),[ke,Oe]=u.useState("0.0.0.0"),[Y,se]=u.useState(8098),[ce,je]=u.useState(!1),[ye,Ee]=u.useState(8086),[Ze,wt]=u.useState("disabled"),[pe,He]=u.useState(null),[Fe,qe]=u.useState({}),$e=()=>{k(!0),setTimeout(()=>e(),400)};u.useEffect(()=>{Qt()},[]);const Qt=async()=>{var H,Qe,nt,pt,vt,gt,bt,Xr,bn,Wt,Tr,Kr,kr,yn,qr,Bn,mt,Pr,wn,at,_e,Te,Xe,it,ft,Et,lt,et,Lt,Rr,kt,jr,kn,Wn,jn;try{d(!0);const y=await Be.getConfig();c(y),v(((H=y.ui)==null?void 0:H.animations_enabled)??!0),w(((Qe=y.ui)==null?void 0:Qe.theme)??"cyberpunk"),z(((nt=y.ui)==null?void 0:nt.default_view)??"command-center"),P(((pt=y.ui)==null?void 0:pt.particle_count)??100),I(((vt=y.ui)==null?void 0:vt.vm_matrix_default_filter)??"all"),re(((gt=y.ui)==null?void 0:gt.matrix_card_width)??85),R(((bt=y.ui)==null?void 0:bt.matrix_sort_by)??"vmid"),L(((Xr=y.ui)==null?void 0:Xr.matrix_group_by)??"node"),B(((bn=y.ui)==null?void 0:bn.matrix_group_sort_by)??"node"),Q(((Wt=y.ui)==null?void 0:Wt.matrix_group_sort_order)??"asc"),localStorage.setItem("vm_matrix_default_filter",((Tr=y.ui)==null?void 0:Tr.vm_matrix_default_filter)??"all"),localStorage.setItem("matrix_card_width",String(((Kr=y.ui)==null?void 0:Kr.matrix_card_width)??85)),localStorage.setItem("matrix_sort_by",((kr=y.ui)==null?void 0:kr.matrix_sort_by)??"vmid"),localStorage.setItem("matrix_group_by",((yn=y.ui)==null?void 0:yn.matrix_group_by)??"node"),localStorage.setItem("matrix_group_sort_by",((qr=y.ui)==null?void 0:qr.matrix_group_sort_by)??"node"),localStorage.setItem("matrix_group_sort_order",((Bn=y.ui)==null?void 0:Bn.matrix_group_sort_order)??"asc");const F={};(mt=y.clusters)==null||mt.forEach(M=>{F[M.id]={enabled:M.enabled!==!1,poll_interval:M.poll_interval||5,static_refresh_interval:M.static_refresh_interval||60}}),Se(F),Me(((Pr=y.alerts)==null?void 0:Pr.enabled)??!0),me(((wn=y.alerts)==null?void 0:wn.cpu_warning)??80),Z(((at=y.alerts)==null?void 0:at.cpu_critical)??95),T(((_e=y.alerts)==null?void 0:_e.memory_warning)??85),J(((Te=y.alerts)==null?void 0:Te.memory_critical)??95),be(((Xe=y.alerts)==null?void 0:Xe.disk_warning)??80),le(((it=y.alerts)==null?void 0:it.disk_critical)??95),ue(((ft=y.alerts)==null?void 0:ft.diskio_warning)??50),Ae(((Et=y.alerts)==null?void 0:Et.diskio_critical)??100),Ve(((lt=y.alerts)==null?void 0:lt.iowait_warning)??5),ge(((et=y.alerts)==null?void 0:et.iowait_critical)??10),localStorage.setItem("iowait_warning",String(((Lt=y.alerts)==null?void 0:Lt.iowait_warning)??5)),localStorage.setItem("iowait_critical",String(((Rr=y.alerts)==null?void 0:Rr.iowait_critical)??10)),Oe(((kt=y.server)==null?void 0:kt.host)??"0.0.0.0"),se(((jr=y.server)==null?void 0:jr.http_port)??8098),je(((kn=y.server)==null?void 0:kn.influx_enabled)??!1),Ee(((Wn=y.server)==null?void 0:Wn.influx_port)??8086),wt(((jn=y.console)==null?void 0:jn.mode)||"disabled");const E={};(y.clusters||[]).forEach(M=>{E[M.id]=!!(M.auth&&M.auth.password&&M.auth.password.length>0)}),qe(E)}catch(y){x(String(y))}finally{d(!1)}},_t=async()=>{var H;try{g(!0),localStorage.setItem("matrix_card_width",String(A)),localStorage.setItem("matrix_sort_by",U),localStorage.setItem("matrix_group_by",G),localStorage.setItem("vm_matrix_default_filter",D),localStorage.setItem("matrix_group_sort_by",V),localStorage.setItem("matrix_group_sort_order",K),localStorage.setItem("iowait_warning",String(Ge)),localStorage.setItem("iowait_critical",String(Ne));const Qe=(H=i==null?void 0:i.clusters)==null?void 0:H.map(nt=>{var pt,vt,gt;return{...nt,enabled:((pt=S[nt.id])==null?void 0:pt.enabled)!==!1,poll_interval:((vt=S[nt.id])==null?void 0:vt.poll_interval)||nt.poll_interval,static_refresh_interval:((gt=S[nt.id])==null?void 0:gt.static_refresh_interval)||nt.static_refresh_interval}});await Be.updateConfig({server:{host:ke,http_port:Y,influx_enabled:ce,influx_port:ye},console:{mode:Ze},ui:{default_view:_,theme:N,language:a,animations_enabled:h,particle_count:$,vm_matrix_default_filter:D,matrix_card_width:A,matrix_sort_by:U,matrix_group_by:G,matrix_group_sort_by:V,matrix_group_sort_order:K},alerts:{enabled:te,cpu_warning:X,cpu_critical:Ce,memory_warning:ae,memory_critical:C,disk_warning:oe,disk_critical:W,diskio_warning:he,diskio_critical:we,iowait_warning:Ge,iowait_critical:Ne},clusters:Qe}),e()}catch(Qe){x(String(Qe))}finally{g(!1)}},Bt=H=>{Se(Qe=>{var nt;return{...Qe,[H]:{...Qe[H],enabled:!((nt=Qe[H])!=null&&nt.enabled)}}})},Jt=(H,Qe,nt)=>{Se(pt=>({...pt,[H]:{...pt[H],[Qe]:nt}}))};u.useEffect(()=>{const H=Qe=>{Qe.key==="Escape"&&!b&&$e()};return window.addEventListener("keydown",H),()=>window.removeEventListener("keydown",H)},[b]);const wr=[{id:"ui",labelKey:"settings.tab_ui",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18"})]})},{id:"clusters",labelKey:"settings.tab_clusters",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),r.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),r.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},{id:"alerts",labelKey:"settings.tab_alerts",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),r.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),r.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]})},{id:"server",labelKey:"settings.tab_server",icon:r.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("line",{x1:"6",y1:"6",x2:"6.01",y2:"6"}),r.jsx("line",{x1:"6",y1:"18",x2:"6.01",y2:"18"})]})}];return r.jsxs("div",{className:`settings-overlay ${b?"exiting":""}`,onClick:H=>H.target===H.currentTarget&&!b&&$e(),children:[r.jsxs("div",{className:`settings-panel panel ${b?"exiting":""}`,children:[r.jsx("div",{className:"settings-scanline"}),r.jsxs("div",{className:"settings-header",children:[r.jsx("h2",{className:"settings-title font-display",children:n("settings.title")}),r.jsx("button",{className:"settings-close",onClick:$e,children:"×"})]}),r.jsx("div",{className:"settings-tabs",children:wr.map(H=>r.jsxs("button",{className:`settings-tab ${j===H.id?"active":""}`,onClick:()=>f(H.id),children:[H.icon,r.jsx("span",{children:n(H.labelKey)})]},H.id))}),r.jsx("div",{className:"settings-content",children:l?r.jsxs("div",{className:"settings-loading",children:[r.jsx("span",{className:"loading-spinner"}),r.jsx("span",{children:n("loading.data")})]}):p?r.jsx("div",{className:"settings-error",children:r.jsx("span",{children:p})}):r.jsxs(r.Fragment,{children:[j==="ui"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.default_view")}),r.jsx("div",{className:"radio-group",children:[{id:"command-center",labelKey:"nav.command_center"},{id:"cluster-core",labelKey:"nav.cluster_core"},{id:"holo-matrix",labelKey:"nav.holo_matrix"},{id:"radar-scan",labelKey:"nav.radar_scan"},{id:"storage",labelKey:"nav.storage"},{id:"ceph-constellation",labelKey:"nav.ceph"}].map(H=>r.jsxs("label",{className:`radio-option ${_===H.id?"active":""}`,children:[r.jsx("input",{type:"radio",name:"defaultView",value:H.id,checked:_===H.id,onChange:()=>z(H.id)}),r.jsx("span",{className:"radio-label",children:n(H.labelKey)})]},H.id))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.vm_matrix_filter")}),r.jsx("div",{className:"radio-group",children:["all","running","stopped"].map(H=>r.jsxs("label",{className:`radio-option ${D===H?"active":""}`,children:[r.jsx("input",{type:"radio",name:"vmFilter",value:H,checked:D===H,onChange:()=>I(H)}),r.jsx("span",{className:"radio-label",children:n(`settings.filter_${H}`)})]},H))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_card_width")}),r.jsxs("div",{className:"input-row",children:[r.jsx("input",{type:"number",className:"input-field",value:A,onChange:H=>re(Number(H.target.value)),min:60,max:200}),r.jsx("span",{className:"input-hint",children:"60-200 px"})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_sort_by")}),r.jsx("div",{className:"radio-group",children:["vmid","name","load"].map(H=>r.jsxs("label",{className:`radio-option ${U===H?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixSortBy",value:H,checked:U===H,onChange:()=>R(H)}),r.jsx("span",{className:"radio-label",children:n(`settings.sort_${H}`)})]},H))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_by")}),r.jsx("div",{className:"radio-group",children:["none","node","type","tag"].map(H=>r.jsxs("label",{className:`radio-option ${G===H?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupBy",value:H,checked:G===H,onChange:()=>L(H)}),r.jsx("span",{className:"radio-label",children:n(`matrix.group_${H}`)})]},H))})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.matrix_group_sort")}),r.jsxs("div",{className:"settings-row",children:[r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_by")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${V==="node"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"node",checked:V==="node",onChange:()=>B("node")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_node")})]}),r.jsxs("label",{className:`radio-option ${V==="cluster"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortBy",value:"cluster",checked:V==="cluster",onChange:()=>B("cluster")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_cluster")})]})]})]}),r.jsxs("div",{className:"settings-item",children:[r.jsx("label",{children:n("settings.sort_order")}),r.jsxs("div",{className:"radio-group inline",children:[r.jsxs("label",{className:`radio-option ${K==="asc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"asc",checked:K==="asc",onChange:()=>Q("asc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_asc")})]}),r.jsxs("label",{className:`radio-option ${K==="desc"?"active":""}`,children:[r.jsx("input",{type:"radio",name:"matrixGroupSortOrder",value:"desc",checked:K==="desc",onChange:()=>Q("desc")}),r.jsx("span",{className:"radio-label",children:n("settings.sort_desc")})]})]})]})]})]})]}),j==="clusters"&&i&&r.jsx("div",{className:"tab-content",children:r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cluster_management")}),r.jsx("p",{className:"section-hint",children:n("settings.cluster_hint")}),r.jsx("div",{className:"cluster-list-full",children:i.clusters.map(H=>{var vt,gt;const Qe=t==null?void 0:t[H.id],nt=(Qe==null?void 0:Qe.name)||H.name||H.id,pt=S[H.id]||{enabled:!0,poll_interval:5,static_refresh_interval:60};return r.jsxs("div",{className:`cluster-card ${pt.enabled?"":"disabled-cluster"}`,children:[r.jsxs("div",{className:"cluster-card-header",children:[r.jsxs("label",{className:"cluster-toggle",onClick:bt=>bt.stopPropagation(),children:[r.jsx("input",{type:"checkbox",checked:pt.enabled,onChange:()=>Bt(H.id)}),r.jsx("span",{className:"cluster-toggle-switch"})]}),r.jsx("span",{className:`cluster-status ${pt.enabled?"enabled":"disabled"}`}),r.jsx("span",{className:"cluster-name",children:nt}),r.jsxs("span",{className:"cluster-id",children:["(",H.id,")"]})]}),r.jsxs("div",{className:"cluster-card-body",children:[r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.poll_interval")}),r.jsx("input",{type:"number",className:"input-field-sm",value:pt.poll_interval,onChange:bt=>Jt(H.id,"poll_interval",Number(bt.target.value)),min:1,max:60})]}),r.jsxs("div",{className:"cluster-setting",children:[r.jsx("label",{children:n("settings.static_refresh")}),r.jsx("input",{type:"number",className:"input-field-sm",value:pt.static_refresh_interval,onChange:bt=>Jt(H.id,"static_refresh_interval",Number(bt.target.value)),min:30,max:600})]})]}),r.jsxs("div",{className:"cluster-card-info",children:[r.jsx("span",{children:n("settings.nodes_count",{n:((vt=H.nodes)==null?void 0:vt.length)||0})}),r.jsxs("span",{children:[n("settings.auth"),": ",((gt=H.auth)==null?void 0:gt.user)||"N/A"]})]}),r.jsxs("div",{className:"cluster-secret-row",children:[r.jsx("span",{className:"secret-label",children:n("settings.cluster_pve_password")}),r.jsx("span",{className:`secret-status ${Fe[H.id]?"set":"unset"}`,children:Fe[H.id]?n("settings.secret_set"):n("settings.secret_unset")}),r.jsx("button",{type:"button",className:"secret-btn primary",onClick:()=>He(H.id),children:Fe[H.id]?n("settings.secret_replace"):n("settings.secret_set_btn")}),Fe[H.id]&&r.jsx("button",{type:"button",className:"secret-btn ghost",onClick:async()=>{if(await o.confirm(n("settings.secret_confirm_clear",{id:H.id}),{destructive:!0}))try{await Be.deleteClusterSecret(H.id,"pve_password"),qe(bt=>({...bt,[H.id]:!1}))}catch(bt){await o.alert(String(bt))}},children:n("settings.secret_clear")})]})]},H.id)})})]})}),j==="alerts"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.cpu_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:X,onChange:H=>me(Number(H.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ce,onChange:H=>Z(Number(H.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.memory_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:ae,onChange:H=>T(Number(H.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:C,onChange:H=>J(Number(H.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.disk_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:oe,onChange:H=>be(Number(H.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:W,onChange:H=>le(Number(H.target.value)),min:0,max:100})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.diskio_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsx("label",{children:n("settings.warning")}),r.jsx("input",{type:"number",className:"input-field-sm",value:he,onChange:H=>ue(Number(H.target.value)),min:0,max:1e4})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsx("label",{children:n("settings.critical")}),r.jsx("input",{type:"number",className:"input-field-sm",value:we,onChange:H=>Ae(Number(H.target.value)),min:0,max:1e4})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.iowait_threshold")}),r.jsxs("div",{className:"threshold-row",children:[r.jsxs("div",{className:"threshold-item warning",children:[r.jsxs("label",{children:[n("settings.warning")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ge,onChange:H=>Ve(Number(H.target.value)),min:0,max:100})]}),r.jsxs("div",{className:"threshold-item danger",children:[r.jsxs("label",{children:[n("settings.critical")," (%)"]}),r.jsx("input",{type:"number",className:"input-field-sm",value:Ne,onChange:H=>ge(Number(H.target.value)),min:0,max:100})]})]})]})]}),j==="server"&&r.jsxs("div",{className:"tab-content",children:[r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.http_server")}),r.jsxs("div",{className:"input-group",children:[r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.host")}),r.jsx("input",{type:"text",className:"input-field",value:ke,onChange:H=>Oe(H.target.value)})]}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.port")}),r.jsx("input",{type:"number",className:"input-field",value:Y,onChange:H=>se(Number(H.target.value)),min:1,max:65535})]})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.influx_integration")}),r.jsxs("label",{className:"toggle-option",children:[r.jsx("input",{type:"checkbox",checked:ce,onChange:H=>je(H.target.checked)}),r.jsx("span",{className:"toggle-switch"}),r.jsx("span",{className:"toggle-label",children:n(ce?"settings.enabled":"settings.disabled")})]}),ce&&r.jsxs("div",{className:"input-row",style:{marginTop:"var(--spacing-sm)"},children:[r.jsx("label",{children:n("settings.influx_port")}),r.jsx("input",{type:"number",className:"input-field",value:ye,onChange:H=>Ee(Number(H.target.value)),min:1,max:65535})]})]}),r.jsxs("div",{className:"settings-section",children:[r.jsx("h3",{className:"section-title",children:n("settings.console_section")}),r.jsxs("div",{className:"input-row",children:[r.jsx("label",{children:n("settings.console_mode")}),r.jsx(Oa,{className:"full",value:Ze,onChange:wt,options:[{value:"disabled",label:n("settings.console_mode_disabled")},{value:"stored",label:n("settings.console_mode_stored")},{value:"prompt",label:n("settings.console_mode_prompt")}]})]}),r.jsxs("div",{className:"server-note",style:{marginTop:"var(--spacing-sm)"},children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.console_mode_hint")})]})]}),r.jsx("div",{className:"settings-section",children:r.jsxs("div",{className:"server-note",children:[r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 16v-4M12 8h.01"})]}),r.jsx("span",{children:n("settings.server_restart_note")})]})})]})]})}),r.jsxs("div",{className:"settings-footer",children:[r.jsxs("div",{className:"settings-footer-left",children:[r.jsxs("div",{className:"settings-version",children:[r.jsx("span",{className:"version-label",children:n("settings.version")}),r.jsxs("span",{className:"version-number",children:["v","0.3.8"]})]}),r.jsxs("div",{className:"settings-author",children:[r.jsx("span",{className:"author-label",children:"by"}),r.jsx("span",{className:"author-name",children:"Jason Cheng"}),r.jsx("span",{className:"author-org",children:"(Jason Tools)"})]})]}),r.jsxs("div",{className:"settings-actions",children:[r.jsx("button",{className:"btn",onClick:$e,children:n("action.cancel")}),r.jsx("button",{className:"btn btn-primary",onClick:_t,disabled:m||b,children:n(m?"action.saving":"action.save")})]})]}),r.jsx("div",{className:"corner-decoration top-left"}),r.jsx("div",{className:"corner-decoration top-right"}),r.jsx("div",{className:"corner-decoration bottom-left"}),r.jsx("div",{className:"corner-decoration bottom-right"})]}),r.jsx(Py,{open:pe!==null,cluster_id:pe||"",kind:"pve_password",title:n("settings.secret_pw_title",{id:pe||""}),body:n("settings.secret_pw_body"),label:n("settings.secret_pw_label"),onClose:()=>He(null),onSaved:()=>{pe&&qe(H=>({...H,[pe]:!0})),He(null)}}),r.jsx("style",{children:`
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
      `})]})}const Fu=["#00f0ff","#00ff88","#bf00ff","#ffffff"];function Ay({particleCount:e=18,enabled:t=!0,isPaused:n=!1}){const a=u.useRef(null),s=u.useRef([]),o=u.useRef(),i=u.useRef({x:0,y:0}),c=u.useRef(0),[l,d]=u.useState(()=>typeof document>"u"||document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()));u.useEffect(()=>{const p=()=>{d(document.visibilityState!=="hidden"&&(typeof document.hasFocus!="function"||document.hasFocus()))};return document.addEventListener("visibilitychange",p),window.addEventListener("focus",p),window.addEventListener("blur",p),()=>{document.removeEventListener("visibilitychange",p),window.removeEventListener("focus",p),window.removeEventListener("blur",p)}},[]);const m=u.useCallback((p,x)=>{s.current=Array.from({length:e},()=>({x:Math.random()*p,y:Math.random()*x,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,size:Math.random()*2+.5,alpha:Math.random()*.5+.2,color:Fu[Math.floor(Math.random()*Fu.length)]}))},[e]),g=u.useCallback(p=>{const x=a.current;if(!x)return;const b=p??performance.now();if(b-c.current<50){o.current=requestAnimationFrame(g);return}c.current=b;const k=x.getContext("2d");if(!k)return;const{width:j,height:f}=x;k.clearRect(0,0,j,f),s.current.forEach(h=>{const v=h.x-i.current.x,N=h.y-i.current.y,w=Math.sqrt(v*v+N*N);if(w<100){const _=(100-w)/100;h.vx+=v/w*_*.05,h.vy+=N/w*_*.05}h.x+=h.vx,h.y+=h.vy,h.vx*=.99,h.vy*=.99,h.x<0&&(h.x=j),h.x>j&&(h.x=0),h.y<0&&(h.y=f),h.y>f&&(h.y=0),h.alpha+=(Math.random()-.5)*.02,h.alpha=Math.max(.1,Math.min(.7,h.alpha)),k.beginPath(),k.arc(h.x,h.y,h.size,0,Math.PI*2),k.fillStyle=h.color,k.globalAlpha=h.alpha,k.fill()}),k.globalAlpha=1,o.current=requestAnimationFrame(g)},[]);return u.useEffect(()=>{if(!t)return;const p=a.current;if(!p)return;const x=()=>{p.width=window.innerWidth,p.height=window.innerHeight,m(p.width,p.height)},b=k=>{i.current={x:k.clientX,y:k.clientY}};return x(),window.addEventListener("resize",x),window.addEventListener("mousemove",b),()=>{window.removeEventListener("resize",x),window.removeEventListener("mousemove",b)}},[t,m]),u.useEffect(()=>{if(!t||n||!l){o.current&&(cancelAnimationFrame(o.current),o.current=void 0);return}return g(),()=>{o.current&&cancelAnimationFrame(o.current)}},[t,n,l,g]),t?r.jsx("canvas",{ref:a,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:-1,background:"radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 50%, #000000 100%)"}}):null}const Du={0:[!0,!0,!0,!0,!0,!0,!1],1:[!1,!0,!0,!1,!1,!1,!1],2:[!0,!0,!1,!0,!0,!1,!0],3:[!0,!0,!0,!0,!1,!1,!0],4:[!1,!0,!0,!1,!1,!0,!0],5:[!0,!1,!0,!0,!1,!0,!0],6:[!0,!1,!0,!0,!0,!0,!0],7:[!0,!0,!0,!1,!1,!1,!1],8:[!0,!0,!0,!0,!0,!0,!0],9:[!0,!0,!0,!0,!1,!0,!0],"-":[!1,!1,!1,!1,!1,!1,!0]," ":[!1,!1,!1,!1,!1,!1,!1]};function Gi({digit:e,size:t=16,color:n="#00f0ff",dimColor:a="rgba(0, 240, 255, 0.08)",glow:s=!1}){const o=Du[e]||Du[" "],i=t,c=t*1.8,l=t*.15,d=t*.05,m=s?t*.4:t*.15,g=[`M ${d+l} ${d} L ${i-d-l} ${d} L ${i-d-l*.3} ${l*.7+d} L ${d+l*.3} ${l*.7+d} Z`,`M ${i-d} ${d+l} L ${i-d} ${c/2-d} L ${i-d-l*.7} ${c/2-d-l*.3} L ${i-d-l*.7} ${d+l+l*.3} Z`,`M ${i-d} ${c/2+d} L ${i-d} ${c-d-l} L ${i-d-l*.7} ${c-d-l-l*.3} L ${i-d-l*.7} ${c/2+d+l*.3} Z`,`M ${d+l} ${c-d} L ${i-d-l} ${c-d} L ${i-d-l*.3} ${c-l*.7-d} L ${d+l*.3} ${c-l*.7-d} Z`,`M ${d} ${c/2+d} L ${d} ${c-d-l} L ${d+l*.7} ${c-d-l-l*.3} L ${d+l*.7} ${c/2+d+l*.3} Z`,`M ${d} ${d+l} L ${d} ${c/2-d} L ${d+l*.7} ${c/2-d-l*.3} L ${d+l*.7} ${d+l+l*.3} Z`,`M ${d+l*.5} ${c/2} L ${d+l} ${c/2-l*.4} L ${i-d-l} ${c/2-l*.4} L ${i-d-l*.5} ${c/2} L ${i-d-l} ${c/2+l*.4} L ${d+l} ${c/2+l*.4} Z`];return r.jsx("svg",{width:i,height:c,style:{display:"inline-block"},children:g.map((p,x)=>r.jsx("path",{d:p,fill:o[x]?n:a,style:{filter:o[x]?`drop-shadow(0 0 ${m}px ${n})`:"none",transition:"fill 0.03s ease-out"}},x))})}function Bu({size:e=16,color:t="#00f0ff",dim:n=!1}){const a=e*.4,s=e*1.8,o=e*.15,i=n?.15:1;return r.jsxs("svg",{width:a,height:s,style:{display:"inline-block"},children:[r.jsx("circle",{cx:a/2,cy:s*.3,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}}),r.jsx("circle",{cx:a/2,cy:s*.7,r:o,fill:t,opacity:i,style:{filter:n?"none":`drop-shadow(0 0 ${e*.1}px ${t})`}})]})}function Wu(e){const t=new Date(e*1e3);return{hours:t.getHours().toString().padStart(2,"0"),minutes:t.getMinutes().toString().padStart(2,"0"),seconds:t.getSeconds().toString().padStart(2,"0")}}function Oy(){return{hours:Math.floor(Math.random()*24).toString().padStart(2,"0"),minutes:Math.floor(Math.random()*60).toString().padStart(2,"0"),seconds:Math.floor(Math.random()*60).toString().padStart(2,"0")}}function Fy({timestamp:e,connected:t=!0}){const[n,a]=u.useState({hours:"  ",minutes:"  ",seconds:"  "}),[s,o]=u.useState(!1),[i,c]=u.useState(!1),l=u.useRef(!1),d=u.useRef(null),m=u.useRef(null),g=t?"#00f0ff":"#ff4444",p=t?"rgba(0, 240, 255, 0.08)":"rgba(255, 68, 68, 0.08)",x=n.hours==="  ",b=u.useCallback(h=>{const v=Wu(h);a(v),m.current=h},[]),k=u.useCallback(h=>{d.current&&clearInterval(d.current),c(!0),o(!0);let v=0;const N=20,w=50,_={current:h};return d.current=setInterval(()=>{if(v++,v<N)a(Oy());else{d.current&&(clearInterval(d.current),d.current=null);const z=Wu(_.current);a(z),m.current=_.current,c(!1),o(!1)}},w),z=>{_.current=z}},[]),j=u.useRef(null);u.useEffect(()=>{if(e===null){l.current||a({hours:"  ",minutes:"  ",seconds:"  "});return}if(!l.current){l.current=!0,j.current=k(e);return}if(d.current&&j.current){j.current(e);return}m.current!==e&&b(e)},[e,k,b]),u.useEffect(()=>()=>{d.current&&clearInterval(d.current)},[]);const f=14;return r.jsxs("div",{className:`seven-segment-clock ${s?"pulse":""} ${i?"first-spin":""} ${t?"":"disconnected"}`,children:[r.jsxs("div",{className:"clock-label",children:[r.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:g,strokeWidth:"2",children:[r.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),r.jsx("polyline",{points:"7 10 12 15 17 10"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]}),r.jsx("span",{style:{color:g},children:"LAST"})]}),r.jsxs("div",{className:"clock-display",children:[(n.hours||"  ").split("").map((h,v)=>r.jsx(Gi,{digit:h||" ",size:f,color:g,dimColor:p,glow:i},`h${v}`)),r.jsx(Bu,{size:f,color:g,dim:x}),(n.minutes||"  ").split("").map((h,v)=>r.jsx(Gi,{digit:h||" ",size:f,color:g,dimColor:p,glow:i},`m${v}`)),r.jsx(Bu,{size:f,color:g,dim:x}),(n.seconds||"  ").split("").map((h,v)=>r.jsx(Gi,{digit:h||" ",size:f,color:g,dimColor:p,glow:i},`s${v}`))]})]})}function Dy({clusters:e,value:t,onChange:n,disabled:a}){const[s,o]=u.useState(!1),i=u.useRef(null);u.useEffect(()=>{const d=m=>{i.current&&!i.current.contains(m.target)&&o(!1)};if(s)return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[s]),u.useEffect(()=>{const d=m=>{m.key==="Escape"&&o(!1)};if(s)return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[s]);const c=d=>{n(d),o(!1)},l=()=>{var g;if(t==="__all__")return"⊕ All";const d=e[t];return d?((g=d.summary)!=null&&g.is_standalone?"◉ ":"")+(d.name||t):t};return r.jsxs("div",{ref:i,className:`cluster-selector-wrapper ${a?"disabled":""}`,children:[r.jsxs("button",{className:`cluster-selector-button ${s?"open":""}`,onClick:()=>!a&&o(!s),disabled:a,title:l(),children:[r.jsxs("svg",{className:"selector-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"4",r:"2"}),r.jsx("circle",{cx:"12",cy:"20",r:"2"}),r.jsx("circle",{cx:"4",cy:"12",r:"2"}),r.jsx("circle",{cx:"20",cy:"12",r:"2"}),r.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"9"}),r.jsx("line",{x1:"12",y1:"15",x2:"12",y2:"18"}),r.jsx("line",{x1:"7",y1:"12",x2:"9",y2:"12"}),r.jsx("line",{x1:"15",y1:"12",x2:"18",y2:"12"})]}),r.jsx("span",{className:"selector-label",children:l()}),r.jsx("svg",{className:"selector-arrow",width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M6 9l6 6 6-6"})})]}),s&&!a&&r.jsxs("div",{className:"cluster-dropdown",children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsx("span",{className:"dropdown-title",children:"SELECT CLUSTER"}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("button",{className:`dropdown-option ${t==="__all__"?"selected":""}`,onClick:()=>c("__all__"),children:[r.jsx("span",{className:"option-icon",children:"⊕"}),r.jsx("span",{className:"option-label",children:"All Clusters"}),t==="__all__"&&r.jsx("span",{className:"option-check",children:"✓"})]}),r.jsx("div",{className:"dropdown-divider"}),Object.entries(e).map(([d,m])=>{var k,j;const g=(k=m.summary)==null?void 0:k.is_standalone,p=m.name||d,x=((j=m.summary)==null?void 0:j.nodes_online)??0,b=Object.keys(m.vms||{}).length;return r.jsxs("button",{className:`dropdown-option ${t===d?"selected":""}`,onClick:()=>c(d),children:[r.jsx("span",{className:"option-icon",children:g?"◉":"◇"}),r.jsxs("div",{className:"option-content",children:[r.jsx("span",{className:"option-label",children:p}),r.jsxs("span",{className:"option-meta",children:[x," nodes · ",b," VMs"]})]}),t===d&&r.jsx("span",{className:"option-check",children:"✓"})]},d)})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
          backdrop-filter: blur(6px);
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
      `})]})}const Uu={admin:"#ff8a3c",operator:"#00f0ff",viewer:"#95a8c4",guest:"#6b7c93"};function By({user:e,onLogout:t}){const{t:n}=Le(),[a,s]=u.useState(!1),o=u.useRef(null);if(u.useEffect(()=>{if(!a)return;const d=g=>{o.current&&!o.current.contains(g.target)&&s(!1)},m=g=>{g.key==="Escape"&&s(!1)};return document.addEventListener("mousedown",d),document.addEventListener("keydown",m),()=>{document.removeEventListener("mousedown",d),document.removeEventListener("keydown",m)}},[a]),!e)return null;const i=e.role_global||"guest",c=Uu[i]||Uu.guest,l=i==="admin";return r.jsxs("div",{className:"user-badge",ref:o,style:{position:"relative"},children:[r.jsxs("button",{className:"btn btn-icon user-badge-btn",onClick:()=>s(d=>!d),title:`${e.username} · ${i}`,"aria-label":`User menu: ${e.username} (${i})`,children:[r.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[r.jsx("circle",{cx:"12",cy:"8",r:"4"}),r.jsx("path",{d:"M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"})]}),r.jsx("span",{"aria-hidden":!0,className:"user-badge-role-dot",style:{background:c,boxShadow:`0 0 6px ${c}`}})]}),a&&r.jsxs("div",{className:"user-cluster-dropdown",onClick:d=>d.stopPropagation(),children:[r.jsxs("div",{className:"dropdown-header",children:[r.jsxs("div",{className:"user-meta-line",children:[r.jsx("span",{className:"user-meta-name",children:e.username}),r.jsxs("span",{className:"user-meta-role",style:{color:c,borderColor:c},children:[r.jsx("span",{"aria-hidden":!0,style:{display:"inline-block",width:6,height:6,borderRadius:"50%",background:c,boxShadow:`0 0 6px ${c}`,marginRight:6}}),i]})]}),r.jsx("div",{className:"dropdown-line"})]}),r.jsxs("div",{className:"dropdown-options",children:[r.jsxs("a",{href:"/account",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚙"}),r.jsx("span",{className:"option-label",children:n("user.account_password")})]}),r.jsxs("a",{href:"/totp",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⊞"}),r.jsx("span",{className:"option-label",children:n("user.totp")})]}),l&&r.jsxs("a",{href:"/users",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚇"}),r.jsx("span",{className:"option-label",children:n("user.user_admin")})]}),l&&r.jsxs("a",{href:"/audit",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"▤"}),r.jsx("span",{className:"option-label",children:n("user.audit")})]}),l&&r.jsxs("a",{href:"/sessions",className:"dropdown-option",children:[r.jsx("span",{className:"option-icon",children:"⚡"}),r.jsx("span",{className:"option-label",children:n("user.sessions")})]}),r.jsx("div",{className:"dropdown-divider"}),r.jsxs("button",{className:"dropdown-option danger",onClick:t,children:[r.jsx("span",{className:"option-icon",children:"⏻"}),r.jsx("span",{className:"option-label",children:n("user.sign_out")})]})]}),r.jsx("div",{className:"dropdown-corner tl"}),r.jsx("div",{className:"dropdown-corner tr"}),r.jsx("div",{className:"dropdown-corner bl"}),r.jsx("div",{className:"dropdown-corner br"})]}),r.jsx("style",{children:`
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
          backdrop-filter: blur(6px);
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
      `})]})}const Vt={Command:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M12 6v6l4 2"})]}),Server:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"2",y:"2",width:"20",height:"8",rx:"2"}),r.jsx("rect",{x:"2",y:"14",width:"20",height:"8",rx:"2"}),r.jsx("circle",{cx:"6",cy:"6",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"18",r:"1",fill:"currentColor"})]}),Matrix:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M3 9h18M3 15h18M9 3v18M15 3v18"})]}),Radar:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("circle",{cx:"12",cy:"12",r:"6"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("path",{d:"M12 2v4M12 18v4"})]}),Storage:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}),r.jsx("path",{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"}),r.jsx("path",{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"})]}),Ceph:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[r.jsx("circle",{cx:"12",cy:"12",r:"3"}),r.jsx("circle",{cx:"12",cy:"12",r:"9",strokeDasharray:"3 2"}),r.jsx("circle",{cx:"12",cy:"3",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"19.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"12",cy:"21",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"16",r:"1.5",fill:"currentColor"}),r.jsx("circle",{cx:"4.5",cy:"8",r:"1.5",fill:"currentColor"}),r.jsx("path",{d:"M12 6v3M12 15v3",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 10.5L17 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M14.5 13.5L17 15.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 10.5L7 8.5",strokeWidth:"1"}),r.jsx("path",{d:"M9.5 13.5L7 15.5",strokeWidth:"1"})]}),Tasks:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),r.jsx("path",{d:"M9 7h8M9 12h8M9 17h5"}),r.jsx("circle",{cx:"6",cy:"7",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"12",r:"1",fill:"currentColor"}),r.jsx("circle",{cx:"6",cy:"17",r:"1",fill:"currentColor"})]}),Health:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),r.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),Backup:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("ellipse",{cx:"12",cy:"6",rx:"8",ry:"3"}),r.jsx("path",{d:"M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"}),r.jsx("path",{d:"M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"})]}),Settings:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}),r.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]}),Pause:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),r.jsx("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}),Play:()=>r.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:r.jsx("polygon",{points:"6,4 20,12 6,20"})}),Language:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("circle",{cx:"12",cy:"12",r:"10"}),r.jsx("path",{d:"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"})]}),MoreHorizontal:()=>r.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none",children:[r.jsx("circle",{cx:"5",cy:"12",r:"2"}),r.jsx("circle",{cx:"12",cy:"12",r:"2"}),r.jsx("circle",{cx:"19",cy:"12",r:"2"})]})},Vu=[{view:"command-center",icon:Vt.Command,labelKey:"nav.command_center",shortcut:"D"},{view:"cluster-core",icon:Vt.Server,labelKey:"nav.cluster_core",shortcut:"N"},{view:"holo-matrix",icon:Vt.Matrix,labelKey:"nav.holo_matrix",shortcut:"M"},{view:"radar-scan",icon:Vt.Radar,labelKey:"nav.radar_scan",shortcut:"R"},{view:"storage",icon:Vt.Storage,labelKey:"nav.storage",shortcut:"S"},{view:"ceph-constellation",icon:Vt.Ceph,labelKey:"nav.ceph",shortcut:"C"},{view:"tasks",icon:Vt.Tasks,labelKey:"nav.tasks",shortcut:"T"},{view:"health",icon:Vt.Health,labelKey:"nav.health",shortcut:"H"},{view:"backups",icon:Vt.Backup,labelKey:"nav.backups",shortcut:"B"}],Wy={d:"command-center",n:"cluster-core",m:"holo-matrix",r:"radar-scan",s:"storage",c:"ceph-constellation",t:"tasks",h:"health",b:"backups"},Uy={"command-center":"/","cluster-core":"/nodes","holo-matrix":"/matrix","radar-scan":"/radar","ceph-constellation":"/ceph",storage:"/storage",tasks:"/tasks",health:"/health",backups:"/backups",settings:"/settings",users:"/users"},Xi={"/":"command-center","/overview":"command-center","/nodes":"cluster-core","/matrix":"holo-matrix","/radar":"radar-scan","/ceph":"ceph-constellation","/storage":"storage","/tasks":"tasks","/health":"health","/backups":"backups","/settings":"settings","/users":"users"};function Hu(){const e=(typeof window<"u"?window.location.pathname:"/")||"/",t=e!=="/"&&e.endsWith("/")?e.slice(0,-1):e;if(Xi[t])return Xi[t];const n="/"+(t.split("/").filter(Boolean)[0]||"");return Xi[n]||"command-center"}function Vy(){var re;const{t:e,language:t,setLanguage:n}=Le(),[a,s]=u.useState(()=>Hu());u.useEffect(()=>{const U=Uy[a];if(!U)return;const R=window.location.pathname||"/",G="/"+(R.split("/").filter(Boolean)[0]||""),L="/"+(U.split("/").filter(Boolean)[0]||"");R==="/"&&U==="/"||R!=="/"&&U!=="/"&&G===L||window.history.pushState(null,"",U)},[a]),u.useEffect(()=>{const U=()=>s(Hu());return window.addEventListener("popstate",U),()=>window.removeEventListener("popstate",U)},[]);const[o,i]=u.useState({}),[c,l]=u.useState(()=>{try{return localStorage.getItem("jt-proxense-selected-cluster")||"__all__"}catch{return"__all__"}}),[d,m]=u.useState(!1),g=js(),[p,x]=u.useState(0),[b,k]=u.useState(!1),[j,f]=u.useState(null),[h,v]=u.useState(!1),[N,w]=u.useState(!1),{connected:_,connecting:z,send:$}=bg({onMessage:u.useCallback(U=>{b||(i(U),x(Date.now()/1e3))},[b])});u.useEffect(()=>{let U=!0;const R=()=>document.visibilityState!=="hidden"&&document.hasFocus(),G=()=>{const L=R();if(L!==U){U=L,document.body.setAttribute("data-app-visible",L?"true":"false");try{L?($({type:"resume"}),$({type:"refresh"})):$({type:"pause"})}catch{}}};return document.body.setAttribute("data-app-visible",R()?"true":"false"),document.addEventListener("visibilitychange",G),window.addEventListener("focus",G),window.addEventListener("blur",G),()=>{document.removeEventListener("visibilitychange",G),window.removeEventListener("focus",G),window.removeEventListener("blur",G)}},[$]);const P=u.useCallback(()=>{f(b?"resuming":"pausing"),setTimeout(()=>{k(U=>!U),setTimeout(()=>f(null),500)},300)},[b]),D=c==="__all__"?null:o[c]||null,I=u.useMemo(()=>{const U=Object.values(o);return{total_clusters:U.length,total_nodes:U.reduce((R,G)=>{var L;return R+(((L=G.summary)==null?void 0:L.node_count)||0)},0),total_nodes_online:U.reduce((R,G)=>{var L;return R+(((L=G.summary)==null?void 0:L.nodes_online)||0)},0),total_vms:U.reduce((R,G)=>{var L;return R+(((L=G.summary)==null?void 0:L.vm_count)||0)},0),total_vms_running:U.reduce((R,G)=>{var L;return R+(((L=G.summary)==null?void 0:L.vms_running)||0)},0),total_cts:U.reduce((R,G)=>{var L;return R+(((L=G.summary)==null?void 0:L.ct_count)||0)},0),total_cts_running:U.reduce((R,G)=>{var L;return R+(((L=G.summary)==null?void 0:L.cts_running)||0)},0),clusters:U.map(R=>R.summary).filter(Boolean)}},[o]);u.useEffect(()=>{try{localStorage.setItem("jt-proxense-selected-cluster",c)}catch{}},[c]),u.useEffect(()=>{Object.keys(o).length>0&&c!=="__all__"&&(o[c]||l("__all__"))},[o,c]),u.useEffect(()=>{window.dispatchEvent(new Event("resize"))},[]),u.useEffect(()=>{Be.getConfig().then(U=>{U!=null&&U.ui&&(U.ui.vm_matrix_default_filter&&localStorage.setItem("vm_matrix_default_filter",U.ui.vm_matrix_default_filter),U.ui.matrix_card_width&&localStorage.setItem("matrix_card_width",String(U.ui.matrix_card_width)),U.ui.matrix_sort_by&&localStorage.setItem("matrix_sort_by",U.ui.matrix_sort_by))}).catch(()=>{})},[]),u.useEffect(()=>{if(!h)return;const U=()=>v(!1);return document.addEventListener("click",U),()=>document.removeEventListener("click",U)},[h]),u.useEffect(()=>{if(!N)return;const U=()=>w(!1);return document.addEventListener("click",U),()=>document.removeEventListener("click",U)},[N]),u.useEffect(()=>{const U=R=>{if(R.target instanceof HTMLInputElement||R.target instanceof HTMLTextAreaElement)return;const G=R.key.toLowerCase();if(G===" "||R.code==="Space"){R.preventDefault(),P();return}if(!R.ctrlKey&&!R.metaKey&&!R.altKey){const L=Wy[G];if(L){R.preventDefault(),s(L);return}}(R.ctrlKey||R.metaKey)&&G==="s"&&(R.preventDefault(),m(L=>!L))};return window.addEventListener("keydown",U),()=>window.removeEventListener("keydown",U)},[P]);const A=()=>{const U=c==="__all__";switch(a){case"command-center":return r.jsx(uu,{clusters:o,globalSummary:I,isPaused:b,onSelectCluster:R=>{l(R),s("cluster-core")}});case"cluster-core":return r.jsx(Tg,{cluster:D,clusters:U?o:void 0,onSelectVM:()=>s("holo-matrix"),onNavigateToVMMatrix:R=>{l(R),s("holo-matrix")},isPaused:b});case"holo-matrix":return r.jsx(Jg,{cluster:D,clusters:U?o:void 0});case"radar-scan":return r.jsx(nx,{cluster:D,clusters:U?o:void 0,isPaused:b});case"storage":return r.jsx(jy,{cluster:D,clusters:U?o:void 0});case"ceph-constellation":return r.jsx(vx,{cluster:D,clusters:U?o:void 0,isPaused:b});case"users":return r.jsx(Ny,{});case"tasks":return r.jsx(My,{clusters:o,selectedCluster:c});case"health":return r.jsx($y,{clusters:o,onNavigate:(R,G)=>{G!=null&&G.cluster&&l(G.cluster),s(R)}});case"backups":return r.jsx(Ty,{clusters:o,selectedCluster:c});default:return r.jsx(uu,{clusters:o,globalSummary:I,isPaused:b,onSelectCluster:R=>{l(R),s("cluster-core")}})}};return r.jsxs("div",{className:`app-container ${b?"animations-paused":""}`,children:[r.jsx(Ay,{isPaused:b}),r.jsxs("header",{className:"header-bar",children:[r.jsxs("div",{className:"header-logo",children:[r.jsx("img",{src:"/assets/logo.png",alt:"JT-PROXENSE",className:"header-logo-img"}),r.jsx("span",{className:`status-dot ${_?"connected":z?"connecting":"disconnected"}`,title:e(_?"status.connected":z?"status.connecting":"status.disconnected")}),r.jsx(Fy,{timestamp:p,connected:_})]}),r.jsxs("nav",{className:"header-center",children:[r.jsxs("div",{className:"nav-tabs",children:[Vu.map(({view:U,icon:R,labelKey:G,shortcut:L},V)=>r.jsxs("button",{className:`nav-tab nav-tab-${V} ${a===U?"active":""}`,onClick:()=>s(U),title:`${e(G)} [${L}]`,children:[r.jsx(R,{}),r.jsx("span",{children:e(G)}),r.jsx("span",{className:"nav-shortcut",children:L})]},U)),r.jsxs("div",{className:"nav-more-wrapper",children:[r.jsx("button",{className:"nav-tab nav-more-btn",onClick:U=>{U.stopPropagation(),w(!N)},title:e("nav.more"),children:r.jsx(Vt.MoreHorizontal,{})}),N&&r.jsx("div",{className:"nav-more-dropdown",onClick:U=>U.stopPropagation(),children:Vu.map(({view:U,icon:R,labelKey:G,shortcut:L},V)=>r.jsxs("button",{className:`nav-more-option nav-more-option-${V} ${a===U?"active":""}`,onClick:()=>{s(U),w(!1)},children:[r.jsx(R,{}),r.jsx("span",{children:e(G)}),r.jsx("span",{className:"nav-shortcut",children:L})]},U))})]})]}),Object.keys(o).length>0&&r.jsx(Dy,{clusters:o,value:c,onChange:l,disabled:a==="command-center"})]}),r.jsxs("div",{className:"header-right",children:[r.jsxs("button",{className:`btn btn-icon pause-btn ${b?"paused":""} ${j||""}`,onClick:P,title:`${e(b?"status.paused":"status.live")} [Space]`,children:[r.jsx("div",{className:"pause-btn-inner",children:b?r.jsx(Vt.Play,{}):r.jsx(Vt.Pause,{})}),r.jsx("div",{className:"pause-fx"})]}),r.jsxs("div",{className:"lang-menu-wrapper",children:[r.jsx("button",{className:"btn btn-icon",onClick:U=>{U.stopPropagation(),v(!h)},title:e("settings.language"),children:r.jsx(Vt.Language,{})}),h&&r.jsxs("div",{className:"lang-dropdown",onClick:U=>U.stopPropagation(),children:[r.jsxs("button",{className:`lang-option ${t==="en"?"active":""}`,onClick:()=>{n("en"),v(!1)},children:[r.jsx("span",{className:"lang-flag",children:"EN"}),r.jsx("span",{children:"English"})]}),r.jsxs("button",{className:`lang-option ${t==="zh-TW"?"active":""}`,onClick:()=>{n("zh-TW"),v(!1)},children:[r.jsx("span",{className:"lang-flag",children:"繁"}),r.jsx("span",{children:"繁體中文"})]})]})]}),r.jsx(By,{user:g.user,onLogout:g.logout}),(!g.authEnforced||((re=g.user)==null?void 0:re.role_global)==="admin")&&r.jsx("button",{className:"btn btn-icon",onClick:()=>m(!0),title:e("settings.title"),children:r.jsx(Vt.Settings,{})})]})]}),r.jsx("main",{className:"main-content",children:r.jsx("div",{className:"view-container",children:A()},a)}),d&&r.jsx(Ly,{onClose:()=>m(!1),clusters:o}),j&&r.jsxs("div",{className:`pause-overlay ${j}`,children:[r.jsx("div",{className:"pause-glitch-lines",children:[...Array(20)].map((U,R)=>r.jsx("div",{className:"glitch-line",style:{animationDelay:`${R*.05}s`}},R))}),r.jsx("div",{className:"pause-status-text",children:j==="pausing"?"FREEZING DATA STREAM":"RESUMING DATA STREAM"}),r.jsx("div",{className:"pause-scan-ring"})]})]})}function Hy(){return r.jsx(hg,{children:r.jsx(gg,{children:r.jsx(Vy,{})})})}Ki.createRoot(document.getElementById("root")).render(r.jsx(Ho.StrictMode,{children:r.jsx(Hy,{})}));
